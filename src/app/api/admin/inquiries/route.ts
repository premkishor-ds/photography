import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { calculateBlockedTimes, hasTravelBufferConflict } from "@/lib/bookingAvailability";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const query = searchParams.get("q");

    let dbQuery = supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (status && status !== "all") {
      dbQuery = dbQuery.eq("status", status);
    }

    if (query && query.trim() !== "") {
      const q = query.trim();
      dbQuery = dbQuery.or(`name.ilike.%${q}%,email.ilike.%${q}%,phone.ilike.%${q}%,service.ilike.%${q}%`);
    }

    const { data, error } = await dbQuery;

    if (error) {
      console.error("Error fetching inquiries:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, inquiries: data || [] });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// POST: Admin creates new booking/appointment
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      service,
      preferredDate,
      appointmentTime,
      durationMinutes,
      message,
      status,
      notes,
    } = body;

    if (!name || !email || !service || !preferredDate) {
      return NextResponse.json(
        { success: false, error: "Name, email, service, and date are required." },
        { status: 400 }
      );
    }

    const duration = Number(durationMinutes) || 60;

    // MANDATORY RULE: Every appointment must be at least 60 minutes
    if (duration < 60) {
      return NextResponse.json(
        {
          success: false,
          error: `Minimum booking duration is 60 minutes (1 hour). Appointments shorter than 60 minutes (${duration}m) are not permitted.`,
        },
        { status: 400 }
      );
    }

    const appTime = appointmentTime || "10:00";
    const blocked = calculateBlockedTimes(appTime, duration);

    // Overlap and Travel Buffer Validation
    const { data: existingInqs } = await supabase
      .from("inquiries")
      .select("id, preferred_date, appointment_time, duration_minutes, status")
      .eq("preferred_date", preferredDate)
      .neq("status", "cancelled");

    if (existingInqs && existingInqs.length > 0) {
      for (const ex of existingInqs) {
        const exTime = ex.appointment_time || "10:00";
        const exDur = Math.max(60, ex.duration_minutes || 60);

        if (hasTravelBufferConflict(appTime, duration, exTime, exDur)) {
          const exBlocked = calculateBlockedTimes(exTime, exDur);
          return NextResponse.json(
            {
              success: false,
              conflict: true,
              error: `Overlaps protected travel buffer of existing appointment at ${exTime} (blocked ${exBlocked.blockedStartTime}–${exBlocked.blockedEndTime}).`,
            },
            { status: 409 }
          );
        }
      }
    }

    const { data, error } = await supabase
      .from("inquiries")
      .insert([
        {
          name: name.trim(),
          email: email.trim(),
          phone: phone ? phone.trim() : "+91 98290 12345",
          service: service.trim(),
          preferred_date: preferredDate.trim(),
          appointment_time: appTime,
          duration_minutes: duration,
          blocked_start_time: blocked.blockedStartTime,
          blocked_end_time: blocked.blockedEndTime,
          message: message ? message.trim() : "Appointment booked by Administrator.",
          status: status || "confirmed",
          notes: notes ? notes.trim() : "Created via Admin Console.",
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, inquiry: data }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      id,
      status,
      notes,
      preferredDate,
      appointmentTime,
      durationMinutes,
    } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Inquiry ID is required" }, { status: 400 });
    }

    const updates: Record<string, any> = {};
    if (status) updates.status = status;
    if (notes !== undefined) updates.notes = notes;

    // If duration or time is being updated
    if (durationMinutes !== undefined) {
      const dur = Number(durationMinutes);
      if (dur < 60) {
        return NextResponse.json(
          {
            success: false,
            error: `Minimum booking duration is 60 minutes (1 hour). Duration of ${dur}m is rejected.`,
          },
          { status: 400 }
        );
      }
      updates.duration_minutes = dur;
    }

    if (preferredDate !== undefined) updates.preferred_date = preferredDate;
    if (appointmentTime !== undefined) updates.appointment_time = appointmentTime;

    // Recalculate blocked times if time or duration is updated
    if (appointmentTime || durationMinutes || preferredDate) {
      // Get current booking values if only partial was supplied
      const { data: current } = await supabase.from("inquiries").select("*").eq("id", id).single();
      const activeDate = preferredDate || current?.preferred_date;
      const activeTime = appointmentTime || current?.appointment_time || "10:00";
      const activeDur = updates.duration_minutes || current?.duration_minutes || 60;

      const blocked = calculateBlockedTimes(activeTime, activeDur);
      updates.blocked_start_time = blocked.blockedStartTime;
      updates.blocked_end_time = blocked.blockedEndTime;

      // Verify no conflict with other appointments
      const { data: others } = await supabase
        .from("inquiries")
        .select("id, preferred_date, appointment_time, duration_minutes, status")
        .eq("preferred_date", activeDate)
        .neq("id", id)
        .neq("status", "cancelled");

      if (others && others.length > 0) {
        for (const ex of others) {
          const exTime = ex.appointment_time || "10:00";
          const exDur = Math.max(60, ex.duration_minutes || 60);

          if (hasTravelBufferConflict(activeTime, activeDur, exTime, exDur)) {
            const exBlocked = calculateBlockedTimes(exTime, exDur);
            return NextResponse.json(
              {
                success: false,
                conflict: true,
                error: `Appointment update overlaps protected travel buffer of appointment at ${exTime} (blocked ${exBlocked.blockedStartTime}–${exBlocked.blockedEndTime}).`,
              },
              { status: 409 }
            );
          }
        }
      }
    }

    const { data, error } = await supabase
      .from("inquiries")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, inquiry: data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Inquiry ID is required" }, { status: 400 });
    }

    const { error } = await supabase.from("inquiries").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Inquiry deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
