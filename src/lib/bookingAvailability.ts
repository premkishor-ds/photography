/**
 * Booking Availability & Travel Buffer Logic
 * Mandatory Rules:
 * 1. Minimum appointment duration is strictly 60 minutes (1 hour).
 * 2. Every appointment reserves:
 *    - 1 hour before: blockedStart = appointmentStart - 60 minutes
 *    - Appointment duration
 *    - 1 hour after: blockedEnd = appointmentStart + bookingDuration + 60 minutes
 * 3. Never offer or accept an appointment shorter than 60 minutes.
 * 4. Never offer or accept a slot that overlaps another appointment's protected travel period.
 */

export interface BookingSlot {
  time: string; // "HH:MM" 24h
  displayTime: string; // e.g. "09:00 AM"
  durationMinutes: number;
  endTime: string;
  displayEndTime: string;
  blockedStartTime: string;
  blockedEndTime: string;
  travelBuffer: {
    blockedStartTime: string;
    blockedEndTime: string;
  };
  available: boolean;
  reason?: string;
}

export interface ExistingBooking {
  id: string;
  date: string; // "YYYY-MM-DD"
  appointmentTime: string; // "HH:MM"
  durationMinutes: number;
  status: string; // "new" | "confirmed" | "contacted" | "completed" | "cancelled"
}

export interface ServiceDurationConfig {
  id: string;
  title: string;
  minDurationMinutes: number; // Enforced >= 60
  durationType: "fixed" | "selectable";
  supportedDurations: number[]; // e.g. [60, 120, 180, 240]
}

/**
 * Converts "HH:MM" to minutes from midnight
 */
export function timeToMinutes(timeStr: string): number {
  if (!timeStr || typeof timeStr !== "string") return 0;
  const parts = timeStr.trim().split(":");
  const h = parseInt(parts[0], 10) || 0;
  const m = parseInt(parts[1], 10) || 0;
  return h * 60 + m;
}

/**
 * Converts minutes from midnight to "HH:MM" (24-hour)
 */
export function minutesToTime(totalMins: number): string {
  const normalized = Math.max(0, Math.min(24 * 60 - 1, totalMins));
  const h = Math.floor(normalized / 60);
  const m = normalized % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

/**
 * Formats "HH:MM" to 12-hour display string with AM/PM
 */
export function formatDisplayTime(timeStr: string): string {
  const mins = timeToMinutes(timeStr);
  const h24 = Math.floor(mins / 60);
  const m = mins % 60;
  const period = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")} ${period}`;
}

/**
 * Formula:
 * blockedStart = appointmentStart - 60 minutes
 * blockedEnd = appointmentStart + bookingDuration + 60 minutes
 */
export function calculateBlockedTimes(appointmentTime: string, durationMinutes: number) {
  const startMins = timeToMinutes(appointmentTime);
  const endMins = startMins + durationMinutes;
  const blockedStartMins = Math.max(0, startMins - 60);
  const blockedEndMins = Math.min(24 * 60, endMins + 60);

  return {
    appointmentStartTime: minutesToTime(startMins),
    appointmentEndTime: minutesToTime(endMins),
    blockedStartTime: minutesToTime(blockedStartMins),
    blockedEndTime: minutesToTime(blockedEndMins),
    startMins,
    endMins,
    blockedStartMins,
    blockedEndMins,
  };
}

/**
 * Validates that an appointment duration meets the mandatory >= 60 min rule
 * and matches the service's supported durations.
 */
export function validateBookingDuration(
  durationMinutes: number,
  serviceConfig?: ServiceDurationConfig | null
): { valid: boolean; error?: string } {
  if (typeof durationMinutes !== "number" || isNaN(durationMinutes)) {
    return { valid: false, error: "Duration must be a valid number of minutes." };
  }

  // MANDATORY RULE 1: Minimum duration is strictly 60 minutes
  if (durationMinutes < 60) {
    return {
      valid: false,
      error: `Minimum booking duration is 60 minutes (1 hour). Appointments shorter than 60 minutes (${durationMinutes}m) are not permitted.`,
    };
  }

  if (serviceConfig) {
    const minRequired = Math.max(60, serviceConfig.minDurationMinutes || 60);
    if (durationMinutes < minRequired) {
      return {
        valid: false,
        error: `Selected service (${serviceConfig.title}) requires a minimum duration of ${minRequired} minutes (${minRequired / 60} hours).`,
      };
    }

    if (
      serviceConfig.supportedDurations &&
      serviceConfig.supportedDurations.length > 0 &&
      !serviceConfig.supportedDurations.includes(durationMinutes)
    ) {
      const allowedStr = serviceConfig.supportedDurations.map((d) => `${d / 60}h`).join(", ");
      return {
        valid: false,
        error: `Selected service only supports the following durations: ${allowedStr}.`,
      };
    }
  }

  return { valid: true };
}

/**
 * Determines whether candidate appointment overlaps with an existing appointment's
 * appointment period or protected travel buffers.
 *
 * An appointment from A_start to A_end blocks [A_start - 60, A_end + 60].
 * Any candidate appointment from B_start to B_end requires [B_start - 60, B_end + 60].
 * Conflict occurs if:
 * candidateStart < existingBlockedEnd AND candidateEnd > existingBlockedStart
 * (meaning there is not at least 60 minutes of travel buffer between the two appointments).
 */
export function hasTravelBufferConflict(
  candidateTime: string,
  candidateDuration: number,
  existingAppointmentTime: string,
  existingDuration: number
): boolean {
  const candidate = calculateBlockedTimes(candidateTime, candidateDuration);
  const existing = calculateBlockedTimes(existingAppointmentTime, existingDuration);

  // Overlap occurs if candidate appointment overlaps existing blocked period OR vice versa
  const candidateOverlapsExistingBlocked =
    candidate.startMins < existing.blockedEndMins && candidate.endMins > existing.blockedStartMins;

  return candidateOverlapsExistingBlocked;
}

/**
 * Evaluates candidate slot against a list of existing bookings.
 */
export function checkSlotConflict(
  candidateTime: string,
  candidateDuration: number,
  existingBookings: ExistingBooking[]
): { conflict: boolean; conflictingBooking?: ExistingBooking; reason?: string } {
  // Only active bookings (ignore cancelled ones)
  const activeBookings = existingBookings.filter(
    (b) => b.status !== "cancelled" && b.appointmentTime
  );

  for (const existing of activeBookings) {
    const isConflict = hasTravelBufferConflict(
      candidateTime,
      candidateDuration,
      existing.appointmentTime,
      existing.durationMinutes || 60
    );

    if (isConflict) {
      const exBlocked = calculateBlockedTimes(existing.appointmentTime, existing.durationMinutes || 60);
      return {
        conflict: true,
        conflictingBooking: existing,
        reason: `Overlaps protected travel buffer of appointment at ${formatDisplayTime(
          existing.appointmentTime
        )} (blocked ${formatDisplayTime(exBlocked.blockedStartTime)}–${formatDisplayTime(
          exBlocked.blockedEndTime
        )})`,
      };
    }
  }

  return { conflict: false };
}

/**
 * Generates all available slots on a given day within operating hours,
 * validating against existing bookings and travel buffers.
 */
export function generateAvailableSlots(params: {
  date: string; // "YYYY-MM-DD"
  durationMinutes: number; // >= 60
  existingBookings: ExistingBooking[];
  operatingHours?: {
    openTime: string; // default "09:00"
    closeTime: string; // default "19:00"
    isOpen: boolean;
  };
  intervalMinutes?: number; // default 60 (or 30)
}): BookingSlot[] {
  const {
    date,
    durationMinutes,
    existingBookings,
    operatingHours = { openTime: "09:00", closeTime: "19:00", isOpen: true },
    intervalMinutes = 60,
  } = params;

  if (!operatingHours.isOpen) {
    return [];
  }

  // Strict minimum validation
  if (durationMinutes < 60) {
    return [];
  }

  const openMins = timeToMinutes(operatingHours.openTime || "09:00");
  const closeMins = timeToMinutes(operatingHours.closeTime || "19:00");

  const slots: BookingSlot[] = [];

  // Don't generate slots in the past for today's date
  const now = new Date();
  const todayStr = now.toISOString().split("T")[0];
  const isToday = date === todayStr;
  const currentMins = now.getHours() * 60 + now.getMinutes();

  for (let m = openMins; m + durationMinutes <= closeMins; m += intervalMinutes) {
    const timeStr = minutesToTime(m);
    const blocked = calculateBlockedTimes(timeStr, durationMinutes);

    // If today and time has passed (give 30 min buffer)
    if (isToday && m <= currentMins + 30) {
      slots.push({
        time: timeStr,
        displayTime: formatDisplayTime(timeStr),
        durationMinutes,
        endTime: blocked.appointmentEndTime,
        displayEndTime: formatDisplayTime(blocked.appointmentEndTime),
        blockedStartTime: blocked.blockedStartTime,
        blockedEndTime: blocked.blockedEndTime,
        travelBuffer: {
          blockedStartTime: blocked.blockedStartTime,
          blockedEndTime: blocked.blockedEndTime,
        },
        available: false,
        reason: "Time has passed today",
      });
      continue;
    }

    const conflictRes = checkSlotConflict(timeStr, durationMinutes, existingBookings);

    slots.push({
      time: timeStr,
      displayTime: formatDisplayTime(timeStr),
      durationMinutes,
      endTime: blocked.appointmentEndTime,
      displayEndTime: formatDisplayTime(blocked.appointmentEndTime),
      blockedStartTime: blocked.blockedStartTime,
      blockedEndTime: blocked.blockedEndTime,
      travelBuffer: {
        blockedStartTime: blocked.blockedStartTime,
        blockedEndTime: blocked.blockedEndTime,
      },
      available: !conflictRes.conflict,
      reason: conflictRes.reason,
    });
  }

  return slots;
}
