import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { log_id, feedback, session_id } = await req.json();

    if (!feedback || (!log_id && !session_id)) {
      return NextResponse.json(
        { success: false, error: "log_id or session_id and feedback are required." },
        { status: 400 }
      );
    }

    if (log_id) {
      await supabase
        .from("ai_chat_logs")
        .update({ user_feedback: feedback })
        .eq("id", log_id);
    } else if (session_id) {
      await supabase
        .from("ai_chat_logs")
        .update({ user_feedback: feedback })
        .eq("session_id", session_id);
    }

    return NextResponse.json({ success: true, message: "Feedback recorded. Thank you!" });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to record feedback" },
      { status: 500 }
    );
  }
}
