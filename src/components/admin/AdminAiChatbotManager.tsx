"use client";

import React, { useState, useEffect } from "react";
import {
  Bot,
  Sparkles,
  Server,
  Activity,
  ThumbsUp,
  ThumbsDown,
  Clock,
  Search,
  Trash2,
  RefreshCw,
  Download,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  MessageSquare,
  Sliders,
  Database,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

interface AiSettings {
  ai_model: string;
  ai_fallback_model: string;
  ai_enabled: boolean;
  ai_api_url: string;
  ai_system_prompt: string;
}

interface ServerStatus {
  online: boolean;
  baseUrl: string;
  pingLatencyMs: number;
  availableModels: string[];
}

interface ChatLog {
  id: string;
  session_id: string;
  user_message: string;
  bot_response: string;
  model_used: string;
  latency_ms: number;
  user_feedback: "helpful" | "unhelpful" | null;
  detected_intent: string;
  page_url: string;
  user_language: string;
  created_at: string;
}

interface Analytics {
  totalLogs: number;
  totalSessions: number;
  avgLatency: number;
  satisfactionRate: number;
  ratedCount: number;
  intentBreakdown: Record<string, number>;
  modelBreakdown: Record<string, number>;
}

export default function AdminAiChatbotManager() {
  const [settings, setSettings] = useState<AiSettings>({
    ai_model: "qwen3:14b",
    ai_fallback_model: "qwen2.5:7b-instruct",
    ai_enabled: true,
    ai_api_url: "http://192.168.10.148:11434",
    ai_system_prompt: "",
  });

  const [serverStatus, setServerStatus] = useState<ServerStatus | null>(null);
  const [logs, setLogs] = useState<ChatLog[]>([]);
  const [analytics, setAnalytics] = useState<Analytics>({
    totalLogs: 0,
    totalSessions: 0,
    avgLatency: 0,
    satisfactionRate: 100,
    ratedCount: 0,
    intentBreakdown: {},
    modelBreakdown: {},
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filterIntent, setFilterIntent] = useState("all");
  const [filterModel, setFilterModel] = useState("all");
  const [filterFeedback, setFilterFeedback] = useState("all");

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [selectedLog, setSelectedLog] = useState<ChatLog | null>(null);

  useEffect(() => {
    loadSettingsAndStatus();
    loadLogs();
  }, []);

  const loadSettingsAndStatus = async () => {
    try {
      const res = await fetch("/api/admin/ai/settings");
      const data = await res.json();
      if (data.success) {
        setSettings(data.settings);
        setServerStatus(data.serverStatus);
      }
    } catch (err) {
      console.error("Failed to fetch AI settings:", err);
    }
  };

  const loadLogs = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set("q", searchQuery);
      if (filterIntent !== "all") params.set("intent", filterIntent);
      if (filterModel !== "all") params.set("model", filterModel);
      if (filterFeedback !== "all") params.set("feedback", filterFeedback);

      const res = await fetch(`/api/admin/ai/logs?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setLogs(data.logs || []);
        if (data.analytics) setAnalytics(data.analytics);
      }
    } catch (err) {
      console.error("Failed to load logs:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setFeedbackMsg(null);
    try {
      const res = await fetch("/api/admin/ai/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        setFeedbackMsg({ type: "success", text: "AI configuration and model routing updated successfully!" });
        loadSettingsAndStatus();
        setTimeout(() => setFeedbackMsg(null), 4000);
      } else {
        setFeedbackMsg({ type: "error", text: data.error || "Failed to save settings." });
      }
    } catch (err: any) {
      setFeedbackMsg({ type: "error", text: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteLog = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this interaction log?")) return;
    try {
      const res = await fetch(`/api/admin/ai/logs?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setLogs((prev) => prev.filter((l) => l.id !== id));
        if (selectedLog?.id === id) setSelectedLog(null);
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleClearAllLogs = async () => {
    if (!window.confirm("WARNING: This will delete ALL AI chat logs permanently. Proceed?")) return;
    try {
      const res = await fetch(`/api/admin/ai/logs?clear=true`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setLogs([]);
        setSelectedLog(null);
        loadLogs();
      }
    } catch (err) {
      console.error("Clear all failed:", err);
    }
  };

  const handleExportCsv = () => {
    if (logs.length === 0) return;
    const headers = [
      "ID",
      "Timestamp",
      "Session ID",
      "User Message",
      "Bot Response",
      "Model Used",
      "Latency (ms)",
      "Intent",
      "User Feedback",
      "Page URL",
      "Language",
    ];

    const rows = logs.map((l) => [
      l.id,
      new Date(l.created_at).toISOString(),
      `"${l.session_id}"`,
      `"${l.user_message.replace(/"/g, '""')}"`,
      `"${l.bot_response.replace(/"/g, '""')}"`,
      l.model_used,
      l.latency_ms,
      l.detected_intent,
      l.user_feedback || "none",
      l.page_url,
      l.user_language,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `studio_ai_chat_logs_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Top Header & Server Status Card */}
      <div className="bg-white p-6 sm:p-8 border border-[#E8DED0] space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#F3ECE1] pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#121212] text-[#BFA076] flex items-center justify-center shadow-md">
              <Bot className="w-6 h-6 stroke-[1.5]" />
            </div>
            <div>
              <h2 className="font-serif text-2xl text-[#121212] flex items-center gap-2">
                <span>AI Chatbot Hub & Analytics</span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-[#FAF7F2] text-[#7B6955] border border-[#D7C7B2] uppercase">
                  Internal Server
                </span>
              </h2>
              <p className="text-xs text-[#7B6955] mt-0.5">
                Powered by Ollama on <code className="font-mono text-[#121212] font-semibold">{settings.ai_api_url}</code>
              </p>
            </div>
          </div>

          {/* Server Connection Badge */}
          <div className="flex items-center gap-3">
            <div
              className={`px-3 py-2 border text-xs flex items-center gap-2.5 font-mono ${
                serverStatus?.online
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                  : "bg-red-50 border-red-200 text-red-800"
              }`}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  serverStatus?.online ? "bg-emerald-500 animate-pulse" : "bg-red-500"
                }`}
              />
              <span>
                {serverStatus?.online
                  ? `ONLINE (${serverStatus.pingLatencyMs}ms) • ${serverStatus.availableModels.length} models detected`
                  : "SERVER OFFLINE (Check 192.168.10.148:11434)"}
              </span>
            </div>

            <button
              onClick={() => {
                loadSettingsAndStatus();
                loadLogs();
              }}
              className="px-3 py-2 bg-[#FAF7F2] hover:bg-[#F0E8DC] text-[#121212] border border-[#D7C7B2] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
              <span>Ping Server</span>
            </button>
          </div>
        </div>

        {/* Analytics KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-[#FAF7F2] border border-[#E8DED0]">
            <p className="text-[10px] uppercase tracking-wider text-[#7B6955] font-semibold">
              Total Inquiries Handled
            </p>
            <p className="font-serif text-3xl text-[#121212] mt-1 font-normal">
              {analytics.totalLogs}
            </p>
            <p className="text-[10px] text-[#7B6955] mt-0.5 font-mono">
              Across {analytics.totalSessions} unique visitors
            </p>
          </div>

          <div className="p-4 bg-[#FAF7F2] border border-[#E8DED0]">
            <p className="text-[10px] uppercase tracking-wider text-[#7B6955] font-semibold">
              Average Response Time
            </p>
            <p className="font-serif text-3xl text-[#121212] mt-1 font-normal">
              {analytics.avgLatency} <span className="text-base text-[#7B6955]">ms</span>
            </p>
            <p className="text-[10px] text-[#7B6955] mt-0.5 font-mono">
              {analytics.avgLatency < 8000 ? "✓ Fast performance" : "Consider switching to 7B"}
            </p>
          </div>

          <div className="p-4 bg-[#FAF7F2] border border-[#E8DED0]">
            <p className="text-[10px] uppercase tracking-wider text-[#7B6955] font-semibold">
              User Satisfaction
            </p>
            <p className="font-serif text-3xl text-emerald-800 mt-1 font-normal">
              {analytics.satisfactionRate}%
            </p>
            <p className="text-[10px] text-[#7B6955] mt-0.5 font-mono">
              Based on {analytics.ratedCount} feedback votes
            </p>
          </div>

          <div className="p-4 bg-[#FAF7F2] border border-[#E8DED0]">
            <p className="text-[10px] uppercase tracking-wider text-[#7B6955] font-semibold">
              Active Routing
            </p>
            <p className="font-serif text-xl text-[#121212] mt-2 font-normal truncate">
              {settings.ai_model}
            </p>
            <p className="text-[10px] text-[#7B6955] mt-0.5 font-mono truncate">
              Fallback: {settings.ai_fallback_model}
            </p>
          </div>
        </div>
      </div>

      {/* Model & Routing Configuration Form */}
      <div className="bg-white p-6 sm:p-8 border border-[#E8DED0] space-y-6">
        <div className="flex items-center justify-between border-b border-[#F3ECE1] pb-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#BFA076]" />
            <h3 className="font-serif text-xl text-[#121212]">
              AI Model Routing & Engine Settings
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-[#7B6955] uppercase tracking-wider">
              Chatbot Widget:
            </label>
            <button
              type="button"
              onClick={() => setSettings({ ...settings, ai_enabled: !settings.ai_enabled })}
              className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer border ${
                settings.ai_enabled
                  ? "bg-emerald-600 text-white border-emerald-700"
                  : "bg-gray-200 text-gray-700 border-gray-300"
              }`}
            >
              {settings.ai_enabled ? "Enabled" : "Disabled"}
            </button>
          </div>
        </div>

        {feedbackMsg && (
          <div
            className={`p-4 border text-xs flex items-center gap-2 ${
              feedbackMsg.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            {feedbackMsg.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600" />
            )}
            <span>{feedbackMsg.text}</span>
          </div>
        )}

        <form onSubmit={handleSaveSettings} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#7B6955] font-semibold mb-2">
                Primary Model (Default: qwen3:14b)
              </label>
              <select
                value={settings.ai_model}
                onChange={(e) => setSettings({ ...settings, ai_model: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-[#FAF7F2] border border-[#D7C7B2] text-[#121212] focus:bg-white focus:border-[#121212] focus:outline-none"
              >
                <option value="qwen3:14b">qwen3:14b (Recommended - Full Knowledge & Thinking)</option>
                <option value="qwen2.5:7b-instruct">qwen2.5:7b-instruct (Ultra Fast & Lightweight)</option>
                <option value="qwen2.5-14b-64k:latest">qwen2.5-14b-64k:latest (Long Context)</option>
                <option value="llama3.2:latest">llama3.2:latest</option>
              </select>
              <p className="text-[11px] text-[#7B6955] mt-1.5 leading-relaxed">
                If <code className="font-mono text-[#121212]">qwen3:14b</code> runs slow or exceeds 14 seconds, the system automatically falls back to the rapid 7B model.
              </p>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#7B6955] font-semibold mb-2">
                Fast Fallback Model (For Slow / High-Load Spikes)
              </label>
              <select
                value={settings.ai_fallback_model}
                onChange={(e) => setSettings({ ...settings, ai_fallback_model: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-[#FAF7F2] border border-[#D7C7B2] text-[#121212] focus:bg-white focus:border-[#121212] focus:outline-none"
              >
                <option value="qwen2.5:7b-instruct">qwen2.5:7b-instruct (Recommended Instant Fallback)</option>
                <option value="llama3.2:latest">llama3.2:latest</option>
                <option value="qwen3:14b">qwen3:14b</option>
              </select>
              <p className="text-[11px] text-[#7B6955] mt-1.5 leading-relaxed">
                Executed instantly when the primary model is busy or cold-starting.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#7B6955] font-semibold mb-2">
              Internal Ollama API Endpoint URL
            </label>
            <input
              type="text"
              value={settings.ai_api_url}
              onChange={(e) => setSettings({ ...settings, ai_api_url: e.target.value })}
              className="w-full px-3.5 py-2 text-xs bg-[#FAF7F2] border border-[#D7C7B2] text-[#121212] focus:bg-white focus:border-[#121212] focus:outline-none font-mono"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs uppercase tracking-wider text-[#7B6955] font-semibold">
                Custom Persona Instructions / System Prompt Override (Optional)
              </label>
              <button
                type="button"
                onClick={() => setSettings({ ...settings, ai_system_prompt: "" })}
                className="text-[11px] text-[#7B6955] hover:text-[#121212] underline cursor-pointer"
              >
                Reset to Dynamic Ground-Truth Knowledge Base
              </button>
            </div>
            <textarea
              rows={4}
              value={settings.ai_system_prompt}
              onChange={(e) => setSettings({ ...settings, ai_system_prompt: e.target.value })}
              placeholder="Leave empty to use automatic ground-truth prompt built from studio services, live pricing, location addresses, working hours, and FAQs..."
              className="w-full px-3.5 py-2.5 text-xs bg-[#FAF7F2] border border-[#D7C7B2] text-[#121212] focus:bg-white focus:border-[#121212] focus:outline-none font-mono leading-relaxed"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-3 bg-[#121212] text-[#FAF7F2] hover:bg-[#2C2C2C] disabled:bg-gray-400 text-xs uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer shadow-sm"
            >
              {isSaving ? "Saving Configuration..." : "Save AI Routing & Settings"}
            </button>
          </div>
        </form>
      </div>

      {/* Chat Logs & Analytics Inspector */}
      <div className="bg-white p-6 sm:p-8 border border-[#E8DED0] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F3ECE1] pb-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#BFA076]" />
            <h3 className="font-serif text-xl text-[#121212]">
              Customer Interaction Logs & Quality Analysis
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCsv}
              disabled={logs.length === 0}
              className="px-3 py-1.5 bg-white border border-[#D7C7B2] hover:border-[#121212] text-[#121212] text-xs uppercase tracking-wider font-medium flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5 text-[#BFA076]" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={handleClearAllLogs}
              disabled={logs.length === 0}
              className="px-3 py-1.5 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 transition-colors cursor-pointer disabled:opacity-50"
            >
              Clear Logs
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="relative sm:col-span-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-[#7B6955]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && loadLogs()}
              placeholder="Search user query, reply, session..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF7F2] border border-[#D7C7B2] text-[#121212] focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <select
              value={filterIntent}
              onChange={(e) => {
                setFilterIntent(e.target.value);
              }}
              className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D7C7B2] text-[#121212] focus:bg-white focus:outline-none"
            >
              <option value="all">All Intents</option>
              <option value="Booking">Booking & Reservation</option>
              <option value="Pricing">Pricing & Rates</option>
              <option value="Gear">Camera Gear</option>
              <option value="Location">Studio & Location</option>
              <option value="Weddings">Weddings</option>
              <option value="Portraits">Portraits</option>
              <option value="Delivery">Delivery & Rights</option>
              <option value="General">General</option>
            </select>
          </div>

          <div>
            <select
              value={filterModel}
              onChange={(e) => {
                setFilterModel(e.target.value);
              }}
              className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D7C7B2] text-[#121212] focus:bg-white focus:outline-none"
            >
              <option value="all">All Models</option>
              <option value="qwen3:14b">qwen3:14b</option>
              <option value="qwen2.5:7b-instruct">qwen2.5:7b-instruct</option>
            </select>
          </div>

          <div className="flex gap-2">
            <select
              value={filterFeedback}
              onChange={(e) => {
                setFilterFeedback(e.target.value);
              }}
              className="flex-1 px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D7C7B2] text-[#121212] focus:bg-white focus:outline-none"
            >
              <option value="all">All Feedback</option>
              <option value="helpful">Helpful 👍</option>
              <option value="unhelpful">Needs Work 👎</option>
            </select>

            <button
              onClick={loadLogs}
              className="px-3 py-2 bg-[#121212] text-[#FAF7F2] hover:bg-[#2C2C2C] text-xs transition-colors cursor-pointer"
            >
              Filter
            </button>
          </div>
        </div>

        {/* Logs Table */}
        {logs.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-[#D7C7B2] bg-[#FAF7F2] space-y-2">
            <Bot className="w-8 h-8 text-[#7B6955] mx-auto opacity-50" />
            <p className="text-sm text-[#121212] font-medium">No interaction logs match your filter.</p>
            <p className="text-xs text-[#7B6955]">
              New visitor conversations through the website chatbot widget are automatically logged here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-[#E8DED0]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F2] border-b border-[#E8DED0] uppercase tracking-wider text-[10.5px] text-[#7B6955]">
                <tr>
                  <th className="py-3 px-4">Date / Time</th>
                  <th className="py-3 px-4">User Query</th>
                  <th className="py-3 px-4">AI Assistant Response</th>
                  <th className="py-3 px-4">Intent</th>
                  <th className="py-3 px-4">Model & Latency</th>
                  <th className="py-3 px-4">Feedback</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3ECE1]">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#FAF7F2]/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-[11px] text-[#7B6955] whitespace-nowrap">
                      {new Date(log.created_at).toLocaleString([], {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>

                    <td className="py-3.5 px-4 max-w-[200px] font-medium text-[#121212]">
                      <div className="truncate" title={log.user_message}>
                        {log.user_message}
                      </div>
                      <span className="text-[10px] text-[#7B6955] font-mono block">
                        {log.page_url} ({log.user_language})
                      </span>
                    </td>

                    <td className="py-3.5 px-4 max-w-[320px] text-[#554837]">
                      <div className="line-clamp-2" title={log.bot_response}>
                        {log.bot_response}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 bg-[#FAF7F2] text-[#7B6955] border border-[#D7C7B2] rounded-xs font-mono text-[10.5px]">
                        {log.detected_intent || "General"}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap font-mono text-[11px]">
                      <span className="text-[#121212] block font-medium">{log.model_used}</span>
                      <span className="text-[#7B6955] text-[10px]">{log.latency_ms}ms</span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {log.user_feedback === "helpful" && (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                          <ThumbsUp className="w-3 h-3" /> Helpful
                        </span>
                      )}
                      {log.user_feedback === "unhelpful" && (
                        <span className="inline-flex items-center gap-1 text-red-700 font-semibold text-[11px]">
                          <ThumbsDown className="w-3 h-3" /> Needs Work
                        </span>
                      )}
                      {!log.user_feedback && (
                        <span className="text-[#7B6955]/60 text-[11px]">Unrated</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => setSelectedLog(log)}
                        className="px-2.5 py-1 text-xs text-[#121212] hover:bg-black/5 border border-[#D7C7B2] mr-2 cursor-pointer"
                      >
                        Inspect
                      </button>
                      <button
                        onClick={() => handleDeleteLog(log.id)}
                        className="p-1 text-red-600 hover:text-red-800 cursor-pointer"
                        title="Delete log"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal: Full Log Inspector */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white border border-[#E8DED0] shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#F3ECE1] pb-4">
              <div>
                <h3 className="font-serif text-xl text-[#121212]">
                  Interaction Detail & Transcript
                </h3>
                <p className="text-xs text-[#7B6955] font-mono mt-0.5">
                  Session ID: {selectedLog.session_id} • {new Date(selectedLog.created_at).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-[#7B6955] hover:text-[#121212] p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-[#FAF7F2] border border-[#E8DED0] space-y-1">
                <span className="uppercase tracking-wider text-[10px] text-[#7B6955] font-semibold block">
                  User Inquiry ({selectedLog.user_language} • {selectedLog.page_url}):
                </span>
                <p className="text-sm font-medium text-[#121212] whitespace-pre-wrap">
                  {selectedLog.user_message}
                </p>
              </div>

              <div className="p-4 bg-white border border-[#E8DED0] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="uppercase tracking-wider text-[10px] text-[#7B6955] font-semibold block">
                    AI Response ({selectedLog.model_used} in {selectedLog.latency_ms}ms):
                  </span>
                  {selectedLog.user_feedback && (
                    <span className="text-[10px] font-bold text-emerald-800">
                      User Rating: {selectedLog.user_feedback}
                    </span>
                  )}
                </div>
                <div className="text-xs text-[#333] whitespace-pre-wrap leading-relaxed font-sans mt-2">
                  {selectedLog.bot_response}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-5 py-2 bg-[#121212] text-white text-xs uppercase tracking-wider cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
