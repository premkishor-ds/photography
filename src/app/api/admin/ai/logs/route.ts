import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("q") || "";
    const intent = searchParams.get("intent") || "";
    const model = searchParams.get("model") || "";
    const feedback = searchParams.get("feedback") || "";
    const limit = Math.min(100, parseInt(searchParams.get("limit") || "50", 10));

    let query = supabase
      .from("ai_chat_logs")
      .select("*")
      .order("created_at", { ascending: false });

    if (intent && intent !== "all") {
      query = query.eq("detected_intent", intent);
    }
    if (model && model !== "all") {
      query = query.eq("model_used", model);
    }
    if (feedback && feedback !== "all") {
      query = query.eq("user_feedback", feedback);
    }
    if (search) {
      query = query.or(
        `user_message.ilike.%${search}%,bot_response.ilike.%${search}%,session_id.ilike.%${search}%`
      );
    }

    const { data: logs, error } = await query.limit(limit);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    // Compute aggregated analytics
    const allLogs = logs || [];
    const totalLogs = allLogs.length;

    const uniqueSessions = new Set(allLogs.map((l) => l.session_id));
    const totalSessions = uniqueSessions.size;

    const totalLatency = allLogs.reduce((acc, l) => acc + (l.latency_ms || 0), 0);
    const avgLatency = totalLogs > 0 ? Math.round(totalLatency / totalLogs) : 0;

    const ratedLogs = allLogs.filter((l) => l.user_feedback === "helpful" || l.user_feedback === "unhelpful");
    const positiveLogs = ratedLogs.filter((l) => l.user_feedback === "helpful").length;
    const satisfactionRate = ratedLogs.length > 0 ? Math.round((positiveLogs / ratedLogs.length) * 100) : 100;

    const intentBreakdown: Record<string, number> = {};
    const modelBreakdown: Record<string, number> = {};

    allLogs.forEach((l) => {
      const it = l.detected_intent || "General";
      intentBreakdown[it] = (intentBreakdown[it] || 0) + 1;

      const md = l.model_used || "Unknown";
      modelBreakdown[md] = (modelBreakdown[md] || 0) + 1;
    });

    return NextResponse.json({
      success: true,
      logs: allLogs,
      analytics: {
        totalLogs,
        totalSessions,
        avgLatency,
        satisfactionRate,
        ratedCount: ratedLogs.length,
        intentBreakdown,
        modelBreakdown,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to load chat logs" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const clearAll = searchParams.get("clear") === "true";

    if (clearAll) {
      await supabase.from("ai_chat_logs").delete().neq("id", "00000000-0000-0000-0000-000000000000");
      return NextResponse.json({ success: true, message: "All logs cleared successfully." });
    }

    if (!id) {
      return NextResponse.json({ success: false, error: "Log ID is required." }, { status: 400 });
    }

    const { error } = await supabase.from("ai_chat_logs").delete().eq("id", id);
    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Log deleted." });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to delete log" },
      { status: 500 }
    );
  }
}
