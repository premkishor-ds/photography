import { NextRequest, NextResponse } from "next/server";
import { requestOtp } from "@/lib/otpVerification";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const result = await requestOtp(email, name);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 429 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `A 6-digit verification code has been dispatched to ${email.trim().toLowerCase()}.`,
        expiresInSeconds: result.expiresInSeconds,
        debugOtp: result.debugOtp, // Present in development mode for easy evaluation
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error in /api/auth/send-otp:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate verification code. Please try again.",
      },
      { status: 500 }
    );
  }
}
