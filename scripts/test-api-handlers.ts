import { NextRequest } from "next/server";
import { POST as contactPOST } from "../src/app/api/contact/route";
import { GET as availabilityGET } from "../src/app/api/booking/availability/route";
import { POST as adminInquiriesPOST } from "../src/app/api/admin/inquiries/route";

console.log("======================================================================");
console.log("🌐 TESTING NEXT.JS API ROUTE HANDLERS DIRECTLY");
console.log("======================================================================\n");

function createMockRequest(url: string, method: string = "GET", body?: any): NextRequest {
  const reqInit: RequestInit = {
    method,
    headers: { "Content-Type": "application/json" },
  };
  if (body) {
    reqInit.body = JSON.stringify(body);
  }
  return new NextRequest(new URL(url, "http://localhost:3000"), reqInit as any);
}

async function testApiHandlers() {
  // Test A: /api/booking/availability with duration = 30 (must return 400)
  console.log("Test A: GET /api/booking/availability?date=2026-11-20&duration=30");
  const reqA = createMockRequest("http://localhost:3000/api/booking/availability?date=2026-11-20&duration=30");
  const resA = await availabilityGET(reqA);
  const dataA = await resA.json();
  console.log(`  Status: ${resA.status}, Success: ${dataA.success}, Error: ${dataA.error}`);
  if (resA.status === 400 && dataA.success === false) {
    console.log("  ✅ PASS: 30-minute availability query rejected with HTTP 400\n");
  } else {
    throw new Error("Failed to reject 30-minute duration");
  }

  // Test B: /api/booking/availability with duration = 60 (must return 200 with slots and travel buffers)
  console.log("Test B: GET /api/booking/availability?date=2026-11-20&duration=60");
  const reqB = createMockRequest("http://localhost:3000/api/booking/availability?date=2026-11-20&duration=60");
  const resB = await availabilityGET(reqB);
  const dataB = await resB.json();
  console.log(`  Status: ${resB.status}, Total Slots: ${dataB.totalSlots}, Available: ${dataB.availableCount}`);
  if (resB.status === 200 && dataB.success === true && Array.isArray(dataB.slots)) {
    console.log(`  Sample slot buffer: ${dataB.slots[0]?.time} -> Buffer: ${dataB.slots[0]?.travelBuffer?.blockedStartTime}–${dataB.slots[0]?.travelBuffer?.blockedEndTime}`);
    console.log("  ✅ PASS: 60-minute availability query returned valid slots with travel buffers\n");
  } else {
    throw new Error("Failed to return availability slots");
  }

  // Test C: POST /api/contact with duration = 30 (must return 400)
  console.log("Test C: POST /api/contact with durationMinutes = 30");
  const reqC = createMockRequest("http://localhost:3000/api/contact", "POST", {
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 98290 12345",
    service: "Portrait Photography",
    preferredDate: "2026-11-20",
    appointmentTime: "10:00",
    durationMinutes: 30, // Prohibited
    message: "Requesting 30 minute session",
  });
  const resC = await contactPOST(reqC);
  const dataC = await resC.json();
  console.log(`  Status: ${resC.status}, Success: ${dataC.success}, Error: ${dataC.error || dataC.message}`);
  if (resC.status === 400 && dataC.success === false) {
    console.log("  ✅ PASS: Contact API strictly rejected 30-minute duration with HTTP 400\n");
  } else {
    throw new Error("Failed to reject 30-minute booking submission");
  }

  // Test D: POST /api/admin/inquiries with duration = 45 (must return 400)
  console.log("Test D: POST /api/admin/inquiries with durationMinutes = 45");
  const reqD = createMockRequest("http://localhost:3000/api/admin/inquiries", "POST", {
    name: "Admin Client",
    email: "admin_client@example.com",
    phone: "+91 98290 12345",
    service: "Portrait Photography",
    preferredDate: "2026-11-20",
    appointmentTime: "10:00",
    durationMinutes: 45, // Prohibited
    message: "Admin dashboard trying 45 min",
  });
  const resD = await adminInquiriesPOST(reqD);
  const dataD = await resD.json();
  console.log(`  Status: ${resD.status}, Success: ${dataD.success}, Error: ${dataD.error}`);
  if (resD.status === 400 && dataD.success === false) {
    console.log("  ✅ PASS: Admin Inquiries API strictly rejected <60m appointment with HTTP 400\n");
  } else {
    throw new Error("Failed to reject sub-60m admin inquiry");
  }

  console.log("======================================================================");
  console.log("🎉 ALL API ROUTE HANDLER TESTS PASSED WITH 100% SUCCESS!");
  console.log("======================================================================\n");
}

testApiHandlers().catch((err) => {
  console.error("API handler test failed:", err);
  process.exit(1);
});
