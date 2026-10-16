import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const DEFAULT_AI_BASE_URL = process.env.AI_API_BASE_URL || "http://192.168.10.148:11434";

export async function GET() {
  try {
    const { data: settings, error } = await supabase
      .from("studio_settings")
      .select("ai_model, ai_fallback_model, ai_enabled, ai_api_url, ai_system_prompt")
      .eq("id", "default")
      .single();

    const baseUrl = settings?.ai_api_url || DEFAULT_AI_BASE_URL;

    // Ping internal Ollama server to check live connectivity and discover models
    let serverOnline = false;
    let availableModels: string[] = [];
    let pingLatencyMs = 0;

    try {
      const pingStart = Date.now();
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const tagRes = await fetch(`${baseUrl}/api/tags`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (tagRes.ok) {
        const tagData = await tagRes.json();
        serverOnline = true;
        pingLatencyMs = Date.now() - pingStart;
        availableModels = (tagData.models || []).map((m: any) => m.name);
      }
    } catch (pingErr) {
      serverOnline = false;
    }

    return NextResponse.json({
      success: true,
      settings: {
        ai_model: settings?.ai_model || "qwen3:14b",
        ai_fallback_model: settings?.ai_fallback_model || "qwen2.5:7b-instruct",
        ai_enabled: settings?.ai_enabled !== undefined ? settings.ai_enabled : true,
        ai_api_url: baseUrl,
        ai_system_prompt: settings?.ai_system_prompt || "",
      },
      serverStatus: {
        online: serverOnline,
        baseUrl,
        pingLatencyMs,
        availableModels,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to load AI settings" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      ai_model = "qwen3:14b",
      ai_fallback_model = "qwen2.5:7b-instruct",
      ai_enabled = true,
      ai_api_url = DEFAULT_AI_BASE_URL,
      ai_system_prompt = "",
    } = body;

    const { data, error } = await supabase
      .from("studio_settings")
      .update({
        ai_model,
        ai_fallback_model,
        ai_enabled,
        ai_api_url,
        ai_system_prompt,
      })
      .eq("id", "default")
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "AI configuration saved successfully.",
      settings: data,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to update AI settings" },
      { status: 500 }
    );
  }
}
