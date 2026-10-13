import { NextRequest, NextResponse } from "next/server";
import { verifyOtp } from "@/lib/otpVerification";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, code } = body;

    if (!email || !code) {
      return NextResponse.json(
        {
          success: false,
          error: "Email address and 6-digit code are required.",
        },
        { status: 400 }
      );
    }

    const result = await verifyOtp(email, code);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || "Invalid verification code.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Email successfully verified.",
        verificationToken: result.verificationToken,
        verifiedEmail: result.verifiedEmail,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error in /api/auth/verify-otp:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Verification failed due to an unexpected error. Please try again.",
      },
      { status: 500 }
    );
  }
}
