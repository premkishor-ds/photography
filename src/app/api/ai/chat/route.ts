import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { buildSystemPrompt, detectMessageIntent } from "@/lib/aiKnowledgeBase";

export const dynamic = "force-dynamic";

const DEFAULT_AI_BASE_URL = process.env.AI_API_BASE_URL || "http://192.168.10.148:11434";
const PRIMARY_MODEL = "qwen2.5:7b-instruct";
const FALLBACK_MODEL = "qwen3:14b";
const PRIMARY_TIMEOUT_MS = 28000;
const SECONDARY_TIMEOUT_MS = 35000;

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

async function callOllamaChat(
  baseUrl: string,
  model: string,
  messages: ChatMessage[],
  timeoutMs: number
): Promise<{ content: string; durationMs: number }> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  const startTime = Date.now();

  try {
    const res = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        messages,
        stream: false,
        options: {
          temperature: 0.7,
          top_p: 0.9,
        },
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Ollama HTTP ${res.status}: ${errText}`);
    }

    const data = await res.json();
    const durationMs = Date.now() - startTime;
    const content = data.message?.content || "";

    return { content, durationMs };
  } catch (err: any) {
    clearTimeout(timeoutId);
    throw err;
  }
}

export async function POST(req: NextRequest) {
  const requestStartTime = Date.now();

  try {
    const body = await req.json();
    const {
      messages = [],
      session_id = `sess-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      page_url = "/",
      language = "en",
      model: requestedModel,
    } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { success: false, error: "Messages array is required." },
        { status: 400 }
      );
    }

    // Find latest user message
    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user")?.content || "";

    // 1. Fetch live studio settings to customize persona & model choices
    let studioContext = {};
    let configuredModel = PRIMARY_MODEL;
    let configuredFallback = FALLBACK_MODEL;
    let customSystemPrompt = "";
    let aiEnabled = true;
    let aiBaseUrl = DEFAULT_AI_BASE_URL;

    try {
      const { data: settings } = await supabase
        .from("studio_settings")
        .select("*")
        .eq("id", "default")
        .single();

      if (settings) {
        studioContext = {
          studioName: settings.studio_name,
          tagline: settings.tagline,
          phone: settings.phone,
          email: settings.email,
          address: settings.address,
          hindiAddress: settings.hindi_address,
          hours: settings.working_hours,
          photographerName: settings.photographer_name,
        };
        if (settings.ai_model) configuredModel = settings.ai_model;
        if (settings.ai_fallback_model) configuredFallback = settings.ai_fallback_model;
        if (settings.ai_enabled !== undefined) aiEnabled = settings.ai_enabled;
        if (settings.ai_api_url) aiBaseUrl = settings.ai_api_url;
        if (settings.ai_system_prompt) customSystemPrompt = settings.ai_system_prompt;
      }
    } catch (e) {
      // Graceful fallback to default values
    }

    if (!aiEnabled) {
      return NextResponse.json(
        {
          success: false,
          error: "AI Concierge is currently disabled by studio administration.",
        },
        { status: 503 }
      );
    }

    // 2. Build system instructions
    const systemPrompt = customSystemPrompt || buildSystemPrompt(studioContext);
    const fullConversation: ChatMessage[] = [
      { role: "system", content: systemPrompt },
      ...messages.slice(-10), // Keep last 10 messages for context window efficiency
    ];

    const activeModel = requestedModel || configuredModel;
    let modelUsed = activeModel;
    let botResponse = "";
    let latencyMs = 0;

    try {
      const primaryTimeout = activeModel.includes("14b") ? SECONDARY_TIMEOUT_MS : PRIMARY_TIMEOUT_MS;
      const result = await callOllamaChat(
        aiBaseUrl,
        activeModel,
        fullConversation,
        primaryTimeout
      );
      botResponse = result.content;
      latencyMs = result.durationMs;
      modelUsed = activeModel;
    } catch (primaryErr: any) {
      console.warn(
        `Primary model ${activeModel} timed out or failed (${primaryErr.message}). Falling back to ${configuredFallback}...`
      );

      // Fast fallback to secondary model
      try {
        const fallbackTimeout = configuredFallback.includes("14b") ? SECONDARY_TIMEOUT_MS : PRIMARY_TIMEOUT_MS;
        const fallbackResult = await callOllamaChat(
          aiBaseUrl,
          configuredFallback,
          fullConversation,
          fallbackTimeout
        );
        botResponse = fallbackResult.content;
        latencyMs = Date.now() - requestStartTime;
        modelUsed = configuredFallback;
      } catch (fallbackErr: any) {
        console.error("All AI models failed:", fallbackErr);
        return NextResponse.json(
          {
            success: false,
            error: "Our studio AI assistant is currently recharging. Please reach out directly on WhatsApp or book via /contact.",
          },
          { status: 502 }
        );
      }
    }

    // Guarantee 100% strict generic naming adherence across English & Hindi
    botResponse = botResponse
      .replace(/kishor\s*prem/gi, "Lead Photographer")
      .replace(/prem\s*kishor/gi, "Lead Photographer")
      .replace(/किशोर\s*प्रेम/g, "मुख्य फोटोग्राफर")
      .replace(/प्रेम\s*किशोर/g, "मुख्य फोटोग्राफर")
      .trim();

    const detectedIntent = detectMessageIntent(lastUserMessage);

    // 4. Save conversation log to Supabase for admin analysis
    let logId: string | null = null;
    try {
      const { data: logData, error: logError } = await supabase
        .from("ai_chat_logs")
        .insert([
          {
            session_id,
            user_message: lastUserMessage,
            bot_response: botResponse,
            model_used: modelUsed,
            latency_ms: latencyMs,
            detected_intent: detectedIntent,
            page_url,
            user_language: language,
          },
        ])
        .select("id")
        .single();

      if (!logError && logData) {
        logId = logData.id;
      }
    } catch (logErr) {
      console.error("Failed to log chat interaction:", logErr);
    }

    return NextResponse.json({
      success: true,
      message: {
        role: "assistant",
        content: botResponse,
      },
      model_used: modelUsed,
      latency_ms: latencyMs,
      log_id: logId,
      session_id,
    });
  } catch (err: any) {
    console.error("AI Chat API Error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
