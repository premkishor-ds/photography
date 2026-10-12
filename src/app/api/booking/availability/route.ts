import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import {
  generateAvailableSlots,
  validateBookingDuration,
  calculateBlockedTimes,
  ExistingBooking,
  ServiceDurationConfig,
} from "@/lib/bookingAvailability";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");
    const serviceName = searchParams.get("service");
    const durationParam = searchParams.get("duration");

    if (!date) {
      return NextResponse.json(
        { success: false, error: "Date parameter is required (YYYY-MM-DD)." },
        { status: 400 }
      );
    }

    const durationMinutes = durationParam ? parseInt(durationParam, 10) : 60;

    // MANDATORY RULE 1: Backend strictly enforces minimum 60 minutes
    if (isNaN(durationMinutes) || durationMinutes < 60) {
      return NextResponse.json(
        {
          success: false,
          error: `Minimum booking duration is 60 minutes (1 hour). Requested duration of ${durationMinutes} minutes is not permitted.`,
        },
        { status: 400 }
      );
    }

    // 1. Fetch Service Configuration from Supabase if service specified
    let serviceConfig: ServiceDurationConfig | null = null;
    if (serviceName) {
      const { data: sData } = await supabase
        .from("services")
        .select("id, title, min_duration_minutes, duration_type, supported_durations")
        .or(`title.ilike.%${serviceName}%,id.ilike.%${serviceName}%`)
        .limit(1);

      if (sData && sData.length > 0) {
        const raw = sData[0];
        serviceConfig = {
          id: raw.id,
          title: raw.title,
          minDurationMinutes: Math.max(60, raw.min_duration_minutes || 60),
          durationType: (raw.duration_type as any) || "selectable",
          supportedDurations: Array.isArray(raw.supported_durations)
            ? raw.supported_durations.filter((d: number) => d >= 60)
            : [60, 120, 180, 240],
        };
      }
    }

    // Validate duration against service
    const durationValidation = validateBookingDuration(durationMinutes, serviceConfig);
    if (!durationValidation.valid) {
      return NextResponse.json(
        { success: false, error: durationValidation.error },
        { status: 400 }
      );
    }

    // 2. Fetch studio operating hours
    const { data: studioData } = await supabase
      .from("studio_settings")
      .select("working_hours")
      .eq("id", "default")
      .single();

    // Check operating hours for day of week
    const targetDateObj = new Date(date + "T00:00:00");
    const dayOfWeek = targetDateObj.getDay(); // 0 is Sunday, 6 is Saturday
    let openTime = "09:00";
    let closeTime = "19:00";
    let isOpen = true;

    if (dayOfWeek === 0) {
      // Sunday - By appointment (reduced hours or appointment only, default 10:00-16:00)
      openTime = "10:00";
      closeTime = "16:00";
    }

    // 3. Fetch existing bookings on that date from Supabase
    const { data: inqData, error: inqError } = await supabase
      .from("inquiries")
      .select("id, preferred_date, appointment_time, duration_minutes, status")
      .eq("preferred_date", date)
      .neq("status", "cancelled");

    if (inqError) {
      console.warn("Could not query existing inquiries, continuing gracefully:", inqError.message);
    }

    const existingBookings: ExistingBooking[] = (inqData || []).map((b: any) => ({
      id: b.id,
      date: b.preferred_date,
      appointmentTime: b.appointment_time || "10:00",
      durationMinutes: Math.max(60, b.duration_minutes || 60),
      status: b.status || "confirmed",
    }));

    // 4. Generate slots with travel buffers and conflict checks
    const slots = generateAvailableSlots({
      date,
      durationMinutes,
      existingBookings,
      operatingHours: { openTime, closeTime, isOpen },
      intervalMinutes: 60, // 60-minute appointment steps
    });

    const availableSlots = slots.filter((s) => s.available);

    // 5. If no slots available on this date, find next available appointment
    let nextAvailable: { date: string; time: string; displayTime: string } | null = null;
    if (availableSlots.length === 0) {
      // Look forward up to 14 days
      for (let dayOffset = 1; dayOffset <= 14; dayOffset++) {
        const nextD = new Date(targetDateObj);
        nextD.setDate(targetDateObj.getDate() + dayOffset);
        const nextDateStr = nextD.toISOString().split("T")[0];

        const { data: nextInqData } = await supabase
          .from("inquiries")
          .select("id, preferred_date, appointment_time, duration_minutes, status")
          .eq("preferred_date", nextDateStr)
          .neq("status", "cancelled");

        const nextExisting: ExistingBooking[] = (nextInqData || []).map((b: any) => ({
          id: b.id,
          date: b.preferred_date,
          appointmentTime: b.appointment_time || "10:00",
          durationMinutes: Math.max(60, b.duration_minutes || 60),
          status: b.status || "confirmed",
        }));

        const nextSlots = generateAvailableSlots({
          date: nextDateStr,
          durationMinutes,
          existingBookings: nextExisting,
          operatingHours: {
            openTime: nextD.getDay() === 0 ? "10:00" : "09:00",
            closeTime: nextD.getDay() === 0 ? "16:00" : "19:00",
            isOpen: true,
          },
          intervalMinutes: 60,
        });

        const firstAvailable = nextSlots.find((s) => s.available);
        if (firstAvailable) {
          nextAvailable = {
            date: nextDateStr,
            time: firstAvailable.time,
            displayTime: firstAvailable.displayTime,
          };
          break;
        }
      }
    }

    return NextResponse.json({
      success: true,
      date,
      durationMinutes,
      serviceConfig: serviceConfig || {
        minDurationMinutes: 60,
        durationType: "selectable",
        supportedDurations: [60, 120, 180, 240],
      },
      operatingHours: { openTime, closeTime, isOpen },
      slots,
      totalSlots: slots.length,
      availableCount: availableSlots.length,
      nextAvailable,
    });
  } catch (err: any) {
    console.error("Availability API error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to calculate booking availability" },
      { status: 500 }
    );
  }
}
