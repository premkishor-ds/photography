function timeToMinutes(timeStr) {
  const parts = timeStr.trim().split(":");
  return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
}

function minutesToTime(totalMins) {
  const normalized = Math.max(0, Math.min(24 * 60 - 1, totalMins));
  const h = Math.floor(normalized / 60);
  const m = normalized % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

function calculateBlockedTimes(appointmentTime, durationMinutes) {
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

function hasTravelBufferConflict(
  candidateTime,
  candidateDuration,
  existingAppointmentTime,
  existingDuration
) {
  const candidate = calculateBlockedTimes(candidateTime, candidateDuration);
  const existing = calculateBlockedTimes(existingAppointmentTime, existingDuration);

  // Overlap occurs if candidate appointment overlaps existing blocked period OR vice versa
  return candidate.startMins < existing.blockedEndMins && candidate.endMins > existing.blockedStartMins;
}

console.log("1-hour:", calculateBlockedTimes("09:00", 60));
console.log("2-hour:", calculateBlockedTimes("09:00", 120));
console.log("3-hour:", calculateBlockedTimes("09:00", 180));

console.log("Conflict (10:30 with 09:00 1h):", hasTravelBufferConflict("10:30", 60, "09:00", 60)); // true
console.log("No conflict (11:00 with 09:00 1h):", hasTravelBufferConflict("11:00", 60, "09:00", 60)); // false
console.log("Conflict (07:30 with 09:00 1h):", hasTravelBufferConflict("07:30", 60, "09:00", 60)); // true
console.log("No conflict (07:00 with 09:00 1h):", hasTravelBufferConflict("07:00", 60, "09:00", 60)); // false
console.log("Conflict (08:30 with 09:00 1h):", hasTravelBufferConflict("08:30", 60, "09:00", 60)); // true
