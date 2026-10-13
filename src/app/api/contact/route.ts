import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/config/siteConfig";
import { supabase } from "@/lib/supabase";
import {
  calculateBlockedTimes,
  hasTravelBufferConflict,
} from "@/lib/bookingAvailability";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Honeypot check for bots (supports website_url and website_hp)
    const honeypotVal = body.website_url || body.website_hp;
    if (honeypotVal && typeof honeypotVal === "string" && honeypotVal.trim() !== "") {
      // Quietly accept automated bot submissions with success status code
      return NextResponse.json(
        { success: true, message: "Inquiry received." },
        { status: 200 }
      );
    }

    const clientName = (body.name || body.fullName || "").trim();
    const { email, phone, service, preferredDate, message } = body;
    const appointmentTime = body.appointmentTime || body.time || "10:00";
    const rawDuration = body.durationMinutes ?? body.duration;

    // MANDATORY RULE 1: Duration validation
    // If duration is explicitly passed, it must be >= 60.
    // If not passed, default to 60.
    const durationMinutes = rawDuration !== undefined ? Number(rawDuration) : 60;

    if (isNaN(durationMinutes) || durationMinutes < 60) {
      return NextResponse.json(
        {
          success: false,
          error: "Minimum booking duration is 60 minutes (1 hour). Appointments shorter than 60 minutes are not permitted.",
          message: "Minimum booking duration is 60 minutes (1 hour). Appointments shorter than 60 minutes are not permitted.",
        },
        { status: 400 }
      );
    }

    // 2. Server-side Validation
    const errors: Record<string, string> = {};

    if (!clientName || clientName.length < 2) {
      errors.name = "Full name must be at least 2 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      errors.email = "A valid email address is required.";
    }

    if (!phone || typeof phone !== "string" || phone.trim().length < 7) {
      errors.phone = "A valid phone number is required.";
    }

    if (!service || typeof service !== "string") {
      errors.service = "A photography service category must be selected.";
    }

    if (!preferredDate || typeof preferredDate !== "string") {
      errors.preferredDate = "A preferred session date is required.";
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    // 3. Service-specific duration validation against database
    let serviceId: string | undefined;
    try {
      const { data: sData } = await supabase
        .from("services")
        .select("id, title, min_duration_minutes, duration_type, supported_durations")
        .or(`title.ilike.%${service}%,id.ilike.%${service}%`)
        .limit(1);

      if (sData && sData.length > 0) {
        const s = sData[0];
        serviceId = s.id;
        const sMin = Math.max(60, s.min_duration_minutes || 60);
        if (durationMinutes < sMin) {
          return NextResponse.json(
            {
              success: false,
              message: `${s.title} requires a minimum duration of ${sMin} minutes (${sMin / 60} hours).`,
              error: `${s.title} requires a minimum duration of ${sMin} minutes (${sMin / 60} hours).`,
            },
            { status: 400 }
          );
        }
      }
    } catch {
      // Continue gracefully
    }

    // 4. Travel buffer & Overlap recalculation on the backend
    const blockedTimes = calculateBlockedTimes(appointmentTime, durationMinutes);

    // Query active appointments on that date to ensure no travel buffer overlap
    try {
      const { data: existingInqs } = await supabase
        .from("inquiries")
        .select("id, preferred_date, appointment_time, duration_minutes, status")
        .eq("preferred_date", preferredDate.trim())
        .neq("status", "cancelled");

      if (existingInqs && existingInqs.length > 0) {
        for (const ex of existingInqs) {
          const exTime = ex.appointment_time || "10:00";
          const exDur = Math.max(60, ex.duration_minutes || 60);

          if (hasTravelBufferConflict(appointmentTime, durationMinutes, exTime, exDur)) {
            const exBlocked = calculateBlockedTimes(exTime, exDur);
            return NextResponse.json(
              {
                success: false,
                conflict: true,
                error: `Requested slot (${appointmentTime}) overlaps with another appointment's protected 1-hour travel buffer (appointment at ${exTime}, reserved ${exBlocked.blockedStartTime}–${exBlocked.blockedEndTime}). Please select an alternative time.`,
                message: `Requested slot (${appointmentTime}) overlaps with another appointment's protected 1-hour travel buffer. Please select an alternative time.`,
              },
              { status: 409 }
            );
          }
        }
      }
    } catch (checkErr) {
      console.warn("Could not check appointment overlap:", checkErr);
    }

    // 5. Store appointment with duration and calculated travel buffers in Supabase
    const sanitizedInquiry = {
      name: clientName.slice(0, 100),
      email: email.trim().toLowerCase().slice(0, 100),
      phone: phone.trim().slice(0, 30),
      service: service.trim().slice(0, 100),
      preferredDate: preferredDate.trim(),
      appointmentTime,
      durationMinutes,
      blockedStartTime: blockedTimes.blockedStartTime,
      blockedEndTime: blockedTimes.blockedEndTime,
      serviceId,
      message: message.trim().slice(0, 2000),
      receivedAt: new Date().toISOString(),
    };

    let dbId: string | undefined;
    try {
      const { insertInquiry } = await import("@/lib/supabase");
      const res = await insertInquiry(sanitizedInquiry);
      if (res.success) {
        dbId = res.id;
        console.log("Appointment saved to Supabase with ID:", dbId);
      }
    } catch (dbErr) {
      console.warn("Failed to save to Supabase (continuing gracefully):", dbErr);
    }

    return NextResponse.json(
      {
        success: true,
        message: `Your appointment request has been reserved (${durationMinutes / 60}h session at ${appointmentTime}). Travel buffers (${blockedTimes.blockedStartTime}–${blockedTimes.blockedEndTime}) are protected. ${siteConfig.photographer.name || "Our studio team"} will confirm shortly.`,
        data: {
          id: dbId,
          name: sanitizedInquiry.name,
          service: sanitizedInquiry.service,
          preferredDate: sanitizedInquiry.preferredDate,
          appointmentTime: sanitizedInquiry.appointmentTime,
          durationMinutes: sanitizedInquiry.durationMinutes,
          blockedStartTime: sanitizedInquiry.blockedStartTime,
          blockedEndTime: sanitizedInquiry.blockedEndTime,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error processing contact submission:", error);
    return NextResponse.json(
      { success: false, message: error.message || "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
}
