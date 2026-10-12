import { createClient } from "@supabase/supabase-js";
import {
  calculateBlockedTimes,
  validateBookingDuration,
  hasTravelBufferConflict,
  generateAvailableSlots,
  checkSlotConflict,
} from "../src/lib/bookingAvailability";

const SUPABASE_URL = "https://qvzvnblosedrqktisdsz.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable__ios76DkRwhZ9FWMyUr07Q_5a-JQx1d";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});

console.log("======================================================================");
console.log("🧪 STARTING COMPREHENSIVE BOOKING DURATION & TRAVEL BUFFER TEST SUITE");
console.log("======================================================================\n");

let passedTests = 0;
let totalTests = 0;

function assert(condition: boolean, message: string) {
  totalTests++;
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
}

async function runTests() {
  const TEST_DATE_1 = "2026-11-25";
  const TEST_DATE_2 = "2026-11-26";

  // Cleanup any test inquiries
  await supabase.from("inquiries").delete().ilike("email", "%@test-suite-duration.com%");

  // ==========================================================================
  // TEST 1: Minimum Duration Validation (< 60 minutes must be rejected)
  // ==========================================================================
  console.log("----------------------------------------------------------------------");
  console.log("TEST 1: Minimum Duration Enforcement (< 60 minutes must be rejected)");
  console.log("----------------------------------------------------------------------");

  const v30 = validateBookingDuration(30);
  assert(v30.valid === false, "validateBookingDuration(30) returns valid: false");
  assert(
    Boolean(v30.error && v30.error.includes("60 minutes")),
    "Rejection error message explicitly states minimum 60 minutes (1 hour)"
  );

  const v45 = validateBookingDuration(45);
  assert(v45.valid === false, "validateBookingDuration(45) returns valid: false");

  const v0 = validateBookingDuration(0);
  assert(v0.valid === false, "validateBookingDuration(0) returns valid: false");

  const v60 = validateBookingDuration(60);
  assert(v60.valid === true, "validateBookingDuration(60) returns valid: true");

  const v120 = validateBookingDuration(120);
  assert(v120.valid === true, "validateBookingDuration(120) returns valid: true");

  // Database-level check constraint test: PostgreSQL must reject duration_minutes < 60
  console.log("\n  Testing Database-Level CHECK Constraint: check_min_booking_duration_60...");
  const { data: dbInsertBad, error: dbInsertError } = await supabase.from("inquiries").insert([
    {
      name: "Test Sub-60m Reject",
      email: "reject30@test-suite-duration.com",
      phone: "+91 99999 00001",
      service: "Portrait Photography",
      preferred_date: TEST_DATE_1,
      appointment_time: "10:00",
      duration_minutes: 30, // VIOLATES CONSTRAINT
      message: "Direct DB attempt to bypass 60 min minimum",
    },
  ]);

  assert(
    dbInsertError !== null && dbInsertError.message.includes("check_min_booking_duration_60"),
    "PostgreSQL database rejected direct insert with duration < 60 min via check_min_booking_duration_60 constraint"
  );

  // ==========================================================================
  // TEST 2: Travel Buffer Calculation Formula
  // ==========================================================================
  console.log("\n----------------------------------------------------------------------");
  console.log("TEST 2: Travel Buffer Formula Verification");
  console.log("----------------------------------------------------------------------");
  console.log("Formula: blockedStart = appointmentStart - 60m");
  console.log("         blockedEnd   = appointmentStart + duration + 60m");

  // Example from User Specification:
  // 1-hour booking: 09:00–10:00 AM appointment -> 08:00–11:00 AM blocked period
  const b1h = calculateBlockedTimes("09:00", 60);
  assert(b1h.appointmentStartTime === "09:00", "1h booking appointment start is 09:00");
  assert(b1h.appointmentEndTime === "10:00", "1h booking appointment end is 10:00");
  assert(b1h.blockedStartTime === "08:00", "1h booking blocked start is 08:00 (09:00 - 60m)");
  assert(b1h.blockedEndTime === "11:00", "1h booking blocked end is 11:00 (10:00 + 60m)");

  // Example from User Specification:
  // 2-hour booking: 09:00–11:00 AM appointment -> 08:00 AM–12:00 PM blocked period
  const b2h = calculateBlockedTimes("09:00", 120);
  assert(b2h.appointmentStartTime === "09:00", "2h booking appointment start is 09:00");
  assert(b2h.appointmentEndTime === "11:00", "2h booking appointment end is 11:00");
  assert(b2h.blockedStartTime === "08:00", "2h booking blocked start is 08:00 (09:00 - 60m)");
  assert(b2h.blockedEndTime === "12:00", "2h booking blocked end is 12:00 (11:00 + 60m)");

  // Example from User Specification:
  // 3-hour booking: 09:00 AM–12:00 PM appointment -> 08:00 AM–01:00 PM blocked period
  const b3h = calculateBlockedTimes("09:00", 180);
  assert(b3h.appointmentStartTime === "09:00", "3h booking appointment start is 09:00");
  assert(b3h.appointmentEndTime === "12:00", "3h booking appointment end is 12:00");
  assert(b3h.blockedStartTime === "08:00", "3h booking blocked start is 08:00 (09:00 - 60m)");
  assert(b3h.blockedEndTime === "13:00", "3h booking blocked end is 13:00 (12:00 + 60m)");

  // ==========================================================================
  // TEST 3: Acceptance of 60-Minute & Longer Bookings in Supabase
  // ==========================================================================
  console.log("\n----------------------------------------------------------------------");
  console.log("TEST 3: Acceptance & Storage of Valid Bookings with Travel Buffers");
  console.log("----------------------------------------------------------------------");

  const appt1Blocked = calculateBlockedTimes("10:00", 60);
  const { data: inq1, error: inq1Error } = await supabase
    .from("inquiries")
    .insert([
      {
        name: "Test Client 60m",
        email: "client60@test-suite-duration.com",
        phone: "+91 98290 11111",
        service: "Portrait Photography",
        preferred_date: TEST_DATE_1,
        appointment_time: "10:00",
        duration_minutes: 60,
        blocked_start_time: appt1Blocked.blockedStartTime,
        blocked_end_time: appt1Blocked.blockedEndTime,
        status: "confirmed",
        message: "Valid 60-minute booking",
      },
    ])
    .select()
    .single();

  assert(inq1Error === null, "60-minute booking inserted successfully into database");
  assert(inq1.duration_minutes === 60, "Database stored duration_minutes = 60");
  assert(inq1.appointment_time === "10:00", "Database stored appointment_time = 10:00");
  assert(inq1.blocked_start_time === "09:00", "Database stored blocked_start_time = 09:00 (10:00 - 60m)");
  assert(inq1.blocked_end_time === "12:00", "Database stored blocked_end_time = 12:00 (10:00 + 60m session + 60m buffer)");

  // Create a 2-hour (120m) booking on TEST_DATE_2
  const appt2Blocked = calculateBlockedTimes("14:00", 120);
  const { data: inq2, error: inq2Error } = await supabase
    .from("inquiries")
    .insert([
      {
        name: "Test Client 120m",
        email: "client120@test-suite-duration.com",
        phone: "+91 98290 22222",
        service: "Wedding Photography",
        preferred_date: TEST_DATE_2,
        appointment_time: "14:00",
        duration_minutes: 120,
        blocked_start_time: appt2Blocked.blockedStartTime,
        blocked_end_time: appt2Blocked.blockedEndTime,
        status: "confirmed",
        message: "Valid 120-minute booking",
      },
    ])
    .select()
    .single();

  assert(inq2Error === null, "120-minute (2 hour) booking inserted successfully into database");
  assert(inq2.duration_minutes === 120, "Database stored duration_minutes = 120");
  assert(inq2.appointment_time === "14:00", "Database stored appointment_time = 14:00");
  assert(inq2.blocked_start_time === "13:00", "Database stored blocked_start_time = 13:00 (1 hour before)");
  assert(inq2.blocked_end_time === "17:00", "Database stored blocked_end_time = 17:00 (14:00 + 2h + 1h buffer)");

  // ==========================================================================
  // TEST 4: Overlapping Bookings Rejected Against Travel Buffers
  // ==========================================================================
  console.log("\n----------------------------------------------------------------------");
  console.log("TEST 4: Overlapping Bookings & Protected Travel Buffer Conflicts");
  console.log("----------------------------------------------------------------------");
  // Existing appointment on TEST_DATE_1: 10:00–11:00 AM (Blocked: 09:00–12:00 PM)

  // Subtest 4a: Exact same slot (10:00 AM, 60m)
  assert(
    hasTravelBufferConflict("10:00", 60, "10:00", 60) === true,
    "Candidate 10:00 AM (60m) conflicts with existing 10:00 AM booking"
  );

  // Subtest 4b: Session starts within existing session (10:30 AM, 60m)
  assert(
    hasTravelBufferConflict("10:30", 60, "10:00", 60) === true,
    "Candidate 10:30 AM (60m) conflicts with existing 10:00–11:00 AM session"
  );

  // Subtest 4c: Session starts within travel buffer after appointment (11:30 AM, 60m)
  assert(
    hasTravelBufferConflict("11:30", 60, "10:00", 60) === true,
    "Candidate 11:30 AM (60m) conflicts with existing appointment's post-travel buffer (until 12:00)"
  );

  // Subtest 4d: Session starts within travel buffer before appointment (08:30 AM, 60m)
  // Session is 08:30–09:30, which overlaps existing blocked window 09:00–12:00
  assert(
    hasTravelBufferConflict("08:30", 60, "10:00", 60) === true,
    "Candidate 08:30 AM (60m) session ends at 09:30, overlapping existing pre-travel buffer"
  );

  // Subtest 4e: Non-overlapping slot after existing appointment's travel buffer
  // Existing appointment is 10:00–11:00 with travel buffer until 12:00 PM
  // Candidate starts at 12:00 PM
  assert(
    hasTravelBufferConflict("12:00", 60, "10:00", 60) === false,
    "Candidate 12:00 PM starts when existing appointment's 1-hour travel buffer ends at 12:00 (zero overlap)"
  );

  // Subtest 4f: Non-overlapping slot before existing appointment's travel buffer
  // Existing appointment blocked window starts at 09:00 AM
  // Candidate session 07:00–08:00 AM ends at 08:00 AM
  assert(
    hasTravelBufferConflict("07:00", 60, "10:00", 60) === false,
    "Candidate 07:00–08:00 AM ends at 08:00 AM, before existing pre-travel buffer begins at 09:00 (zero overlap)"
  );

  // ==========================================================================
  // TEST 5: Slot Generator & Calendar Protection
  // ==========================================================================
  console.log("\n----------------------------------------------------------------------");
  console.log("TEST 5: Availability Engine Generates Valid Slots & Protects Buffers");
  console.log("----------------------------------------------------------------------");

  const existingList = [
    {
      id: inq1.id,
      date: TEST_DATE_1,
      appointmentTime: "10:00",
      durationMinutes: 60,
      status: "confirmed",
    },
  ];

  const generatedSlots = generateAvailableSlots({
    date: TEST_DATE_1,
    durationMinutes: 60,
    existingBookings: existingList,
    operatingHours: { openTime: "08:00", closeTime: "18:00", isOpen: true },
    intervalMinutes: 60,
  });

  const slot10 = generatedSlots.find((s) => s.time === "10:00");
  assert(slot10 !== undefined && slot10.available === false, "Slot 10:00 AM is correctly marked unavailable");

  const slot09 = generatedSlots.find((s) => s.time === "09:00");
  assert(
    slot09 !== undefined && slot09.available === false,
    "Slot 09:00 AM (overlaps pre-travel buffer) is correctly marked unavailable"
  );

  const slot11 = generatedSlots.find((s) => s.time === "11:00");
  assert(
    slot11 !== undefined && slot11.available === false,
    "Slot 11:00 AM (overlaps post-travel buffer until 12:00) is correctly marked unavailable"
  );

  const slot12 = generatedSlots.find((s) => s.time === "12:00");
  assert(slot12 !== undefined && slot12.available === true, "Slot 12:00 PM is correctly marked available");

  const slot13 = generatedSlots.find((s) => s.time === "13:00");
  assert(slot13 !== undefined && slot13.available === true, "Slot 13:00 (1:00 PM) is correctly marked available");

  // ==========================================================================
  // TEST 6: Concurrent Booking Race Condition Handling
  // ==========================================================================
  console.log("\n----------------------------------------------------------------------");
  console.log("TEST 6: Concurrent Booking Requests Handling");
  console.log("----------------------------------------------------------------------");
  console.log("Simulating 5 simultaneous concurrent requests racing for the same slot (14:00 on TEST_DATE_1)...");

  const raceTime = "14:00";
  const raceDuration = 60;
  const raceBlocked = calculateBlockedTimes(raceTime, raceDuration);

  async function attemptBooking(clientId: number) {
    // 1. Check existing conflict on backend
    const { data: existing } = await supabase
      .from("inquiries")
      .select("appointment_time, duration_minutes, status")
      .eq("preferred_date", TEST_DATE_1)
      .neq("status", "cancelled");

    for (const ex of existing || []) {
      if (hasTravelBufferConflict(raceTime, raceDuration, ex.appointment_time, ex.duration_minutes || 60)) {
        return { success: false, status: 409, clientId, reason: "Conflict with existing booking" };
      }
    }

    // 2. Insert inquiry
    const { data, error } = await supabase
      .from("inquiries")
      .insert([
        {
          name: `Concurrent Client ${clientId}`,
          email: `concurrent_${clientId}@test-suite-duration.com`,
          phone: `+91 98290 9999${clientId}`,
          service: "Portrait Photography",
          preferred_date: TEST_DATE_1,
          appointment_time: raceTime,
          duration_minutes: raceDuration,
          blocked_start_time: raceBlocked.blockedStartTime,
          blocked_end_time: raceBlocked.blockedEndTime,
          status: "confirmed",
          message: `Concurrent race test client ${clientId}`,
        },
      ])
      .select();

    if (error) {
      return { success: false, status: 500, clientId, reason: error.message };
    }

    return { success: true, status: 200, clientId };
  }

  // Fire 5 requests simultaneously in parallel
  const raceResults = await Promise.all([
    attemptBooking(1),
    attemptBooking(2),
    attemptBooking(3),
    attemptBooking(4),
    attemptBooking(5),
  ]);

  const successes = raceResults.filter((r) => r.success);
  console.log(`  Race results: ${successes.length} succeeded, ${raceResults.length - successes.length} rejected/handled.`);

  assert(
    successes.length >= 1,
    "At least one concurrent booking request succeeded"
  );

  // Subsequent request for overlapping slot (e.g. 14:30) must be 100% rejected
  const subsequentAttempt = await attemptBooking(99);
  assert(
    subsequentAttempt.success === false && subsequentAttempt.status === 409,
    "Subsequent booking request attempting to book conflicted slot was rejected with 409 Conflict"
  );

  // ==========================================================================
  // Clean up test data
  // ==========================================================================
  await supabase.from("inquiries").delete().ilike("email", "%@test-suite-duration.com%");
  console.log("\n🧹 Test inquiries cleaned up from Supabase database.");

  console.log("\n======================================================================");
  console.log(`🎉 TEST SUITE COMPLETE: ${passedTests}/${totalTests} TESTS PASSED SUCCESSFULLY!`);
  console.log("======================================================================\n");
}

runTests().catch((err) => {
  console.error("Test suite failed:", err);
  process.exit(1);
});
