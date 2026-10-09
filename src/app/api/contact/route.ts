import { NextRequest, NextResponse } from "next/server";

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

    // 3. Sanitized payload simulation
    const sanitizedInquiry = {
      name: clientName.slice(0, 100),
      email: email.trim().toLowerCase().slice(0, 100),
      phone: phone.trim().slice(0, 30),
      service: service.trim().slice(0, 100),
      preferredDate: preferredDate.trim(),
      message: message.trim().slice(0, 2000),
      receivedAt: new Date().toISOString(),
    };

    // In a production environment with email provider configured (e.g. Resend / SendGrid / Postmark):
    // await sendNotificationEmail(sanitizedInquiry);
    console.log("Inquiry received successfully:", sanitizedInquiry);

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been received. Julian will contact you within 24 hours.",
        data: {
          name: sanitizedInquiry.name,
          service: sanitizedInquiry.service,
          preferredDate: sanitizedInquiry.preferredDate,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact submission:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
}
