"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  ExternalLink,
  ChevronDown,
  Minimize2,
  Calendar,
  Camera,
  Check,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/Icons";
import { useLanguage } from "@/context/LanguageContext";
import { useStudioSettings } from "@/context/StudioContext";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  model?: string;
  latencyMs?: number;
  logId?: string;
  feedback?: "helpful" | "unhelpful" | null;
}

const QUICK_SUGGESTIONS_EN = [
  "What packages do you offer for weddings?",
  "Where is your studio located in Jaipur?",
  "How long does photo delivery take?",
  "What cameras and gear do you shoot with?",
  "How do I reserve a date?",
];

const QUICK_SUGGESTIONS_HI = [
  "विवाह फोटोग्राफी के पैकेज और दरें क्या हैं?",
  "जयपुर में आपका स्टूडियो कहाँ स्थित है?",
  "फोटो डिलीवरी में कितना समय लगता है?",
  "आप कौन से कैमरे और लेंस इस्तेमाल करते हैं?",
  "सत्र कैसे बुक करें?",
];

export default function StudioChatbot() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const { settings } = useStudioSettings();

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [hasUnread, setHasUnread] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize or restore session
  useEffect(() => {
    let sid = "";
    try {
      sid = sessionStorage.getItem("studio_ai_session_id") || "";
      if (!sid) {
        sid = `client-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
        sessionStorage.setItem("studio_ai_session_id", sid);
      }
    } catch {
      sid = `client-${Date.now()}`;
    }
    setSessionId(sid);

    // Initial warm greeting
    const studioName = settings?.studio_name || "Your Photography";
    const initialGreeting =
      language === "hi"
        ? `नमस्ते! मैं ${studioName} का आधिकारिक एआई स्टूडियो सहायक हूँ। मैं शाही विवाह फोटोग्राफी, फाइन-आर्ट पोर्ट्रेट, उपकरण विनिर्देश, मूल्य निर्धारण या सत्र बुकिंग में आपकी सहायता कर सकता हूँ। मैं आपकी क्या मदद कर सकता हूँ?`
        : `Welcome! I am the official AI Concierge for ${studioName}. How may I assist you today with wedding packages, editorial portraits, our Jaipur flagship studio, camera gear, or reserving your preferred session date?`;

    setMessages([
      {
        id: "msg-init",
        role: "assistant",
        content: initialGreeting,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        feedback: null,
      },
    ]);
  }, [language, settings?.studio_name]);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 150);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Build past history payload
      const historyPayload = messages
        .filter((m) => m.id !== "msg-init")
        .concat(userMsg)
        .slice(-8)
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: historyPayload,
          session_id: sessionId,
          page_url: pathname,
          language,
        }),
      });

      const data = await res.json();

      if (data.success && data.message) {
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          role: "assistant",
          content: data.message.content,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          model: data.model_used,
          latencyMs: data.latency_ms,
          logId: data.log_id,
          feedback: null,
        };
        setMessages((prev) => [...prev, botMsg]);
        if (!isOpen) setHasUnread(true);
      } else {
        const errorContent =
          data.error ||
          (language === "hi"
            ? "क्षमा करें, वर्तमान में कनेक्शन में समस्या आ रही है। कृपया सीधे व्हाट्सएप पर संपर्क करें।"
            : "I apologize, but our internal server is temporarily resting. Please reach out to our studio concierge directly via WhatsApp or our booking page.");
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            role: "assistant",
            content: errorContent,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            feedback: null,
          },
        ]);
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: "assistant",
          content:
            language === "hi"
              ? "नेटवर्क त्रुटि के कारण संदेश नहीं भेजा जा सका। कृपया पुनः प्रयास करें या व्हाट्सएप पर संपर्क करें।"
              : "Unable to reach the studio AI engine. Please verify your connection or chat directly on WhatsApp.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          feedback: null,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = async (msgId: string, logId: string | undefined, feedback: "helpful" | "unhelpful") => {
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, feedback } : m))
    );

    try {
      await fetch("/api/ai/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          log_id: logId,
          session_id: sessionId,
          feedback,
        }),
      });
    } catch {}
  };

  const suggestions = language === "hi" ? QUICK_SUGGESTIONS_HI : QUICK_SUGGESTIONS_EN;

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans print:hidden">
      {/* Floating Concierge Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 pl-4 pr-5 py-3.5 bg-[#121212] text-[#FAF7F2] border border-[#BFA076]/40 shadow-2xl hover:border-[#BFA076] hover:scale-102 transition-all duration-300 cursor-pointer"
          aria-label="Open Studio AI Assistant"
        >
          {/* Animated Gold Aura Indicator */}
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#BFA076] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#BFA076]" />
          </span>

          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#BFA076] to-[#7B6955] text-[#121212] flex items-center justify-center font-bold shadow-sm">
            <Sparkles className="w-4 h-4 fill-current" />
          </div>

          <div className="text-left flex flex-col">
            <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#FAF7F2]">
              {language === "hi" ? "स्टूडियो एआई सहायक" : "Studio AI Concierge"}
            </span>
            <span className="text-[9.5px] text-[#BFA076] tracking-wider font-mono">
              Qwen3 Online • 24/7
            </span>
          </div>

          {hasUnread && (
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
          )}
        </button>
      )}

      {/* Chat Window Modal */}
      {isOpen && (
        <div
          className={`w-[92vw] sm:w-[420px] bg-[#FAF7F2] text-[#121212] border border-[#D7C7B2] shadow-2xl transition-all duration-300 flex flex-col overflow-hidden ${
            isMinimized ? "h-14" : "h-[620px] max-h-[88vh]"
          }`}
        >
          {/* Header */}
          <div className="bg-[#121212] text-[#FAF7F2] px-4 py-3 border-b border-[#2A2A2A] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#BFA076]/20 border border-[#BFA076]/50 text-[#BFA076] flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-sm tracking-wider font-medium text-white">
                    {language === "hi" ? "स्टूडियो एआई सहायक" : "Studio AI Concierge"}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[9px] px-1.5 py-0.5 bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 font-mono tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE
                  </span>
                </div>
                <p className="text-[10px] text-[#FAF7F2]/60 font-mono">
                  {settings?.studio_name || "Your Photography"} • Jaipur
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="w-7 h-7 flex items-center justify-center text-[#FAF7F2]/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
              >
                {isMinimized ? <ChevronDown className="w-4 h-4 rotate-180" /> : <Minimize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 flex items-center justify-center text-[#FAF7F2]/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          {!isMinimized && (
            <>
              {/* Message Scrollable Area */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs bg-[#FAF7F2]">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[85%] p-3.5 leading-relaxed shadow-xs ${
                        m.role === "user"
                          ? "bg-[#121212] text-[#FAF7F2] border border-[#2E2E2E]"
                          : "bg-white text-[#121212] border border-[#E8DED0]"
                      }`}
                    >
                      {/* Message Content with line breaks */}
                      <div className="whitespace-pre-wrap font-sans text-[12.5px]">
                        {m.content}
                      </div>

                      {/* Bot Message Footer: Thumbs up/down & Latency */}
                      {m.role === "assistant" && m.id !== "msg-init" && (
                        <div className="mt-2.5 pt-2 border-t border-[#F0E8DC] flex items-center justify-between text-[10px] text-[#7B6955]">
                          <span className="font-mono opacity-70">
                            {m.model ? `${m.model} • ${m.latencyMs || 0}ms` : m.timestamp}
                          </span>

                          <div className="flex items-center gap-2">
                            <span className="text-[9.5px]">Helpful?</span>
                            <button
                              onClick={() => handleFeedback(m.id, m.logId, "helpful")}
                              className={`p-1 hover:text-[#121212] transition-colors cursor-pointer ${
                                m.feedback === "helpful" ? "text-emerald-700 font-bold" : "opacity-60"
                              }`}
                              title="Helpful"
                            >
                              <ThumbsUp className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleFeedback(m.id, m.logId, "unhelpful")}
                              className={`p-1 hover:text-[#121212] transition-colors cursor-pointer ${
                                m.feedback === "unhelpful" ? "text-red-700 font-bold" : "opacity-60"
                              }`}
                              title="Needs Improvement"
                            >
                              <ThumbsDown className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <span className="text-[9px] text-[#7B6955]/70 font-mono mt-1 px-1">
                      {m.timestamp}
                    </span>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-start gap-2">
                    <div className="p-3 bg-white border border-[#E8DED0] text-[#7B6955] inline-flex items-center gap-2 shadow-xs">
                      <Sparkles className="w-3.5 h-3.5 text-[#BFA076] animate-spin" />
                      <span className="text-xs font-sans">
                        {language === "hi" ? "एआई उत्तर तैयार कर रहा है..." : "Consulting studio knowledge base..."}
                      </span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Inquiry Suggestions */}
              {messages.length <= 3 && (
                <div className="px-4 py-2 border-t border-[#E8DED0] bg-[#F4EFE6]/70">
                  <p className="text-[10px] uppercase tracking-wider text-[#7B6955] font-semibold mb-1.5">
                    {language === "hi" ? "त्वरित प्रश्न सुझाव:" : "Suggested Questions:"}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {suggestions.slice(0, 3).map((sug, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(sug)}
                        disabled={isLoading}
                        className="text-[11px] text-left px-2.5 py-1 bg-white border border-[#D7C7B2] hover:border-[#121212] text-[#554837] hover:text-[#121212] transition-colors cursor-pointer"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Direct Booking & WhatsApp Quick Bar */}
              <div className="px-4 py-2 bg-[#FAF7F2] border-t border-[#E8DED0] flex items-center justify-between text-[11px]">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-1.5 text-[#121212] font-semibold hover:text-[#BFA076] transition-colors"
                >
                  <Calendar className="w-3 h-3 text-[#BFA076]" />
                  <span>{language === "hi" ? "बुकिंग फॉर्म खोलें" : "Book a Session"}</span>
                </Link>

                <a
                  href={`https://wa.me/${(settings?.whatsapp_number || "919829012345").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                    "Hello! I am chatting with your AI assistant and would like to speak directly with the studio manager."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-800 hover:text-emerald-900 font-semibold"
                >
                  <WhatsAppIcon className="w-3 h-3 fill-emerald-700" />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>

              {/* Input Footer */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-3 bg-white border-t border-[#E8DED0] flex items-center gap-2 shrink-0"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={
                    language === "hi"
                      ? "स्टूडियो, पैकेज या तारीखों के बारे में पूछें..."
                      : "Ask about packages, dates, camera gear, or location..."
                  }
                  disabled={isLoading}
                  className="flex-1 px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D7C7B2] focus:border-[#121212] focus:bg-white focus:outline-none transition-colors"
                />

                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="w-9 h-9 bg-[#121212] text-[#FAF7F2] hover:bg-[#2C2C2C] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center cursor-pointer shadow-xs shrink-0"
                  aria-label="Send Message"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}
