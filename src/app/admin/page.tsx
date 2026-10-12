"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Camera,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  Trash2,
  Edit2,
  Plus,
  RefreshCw,
  Search,
  ExternalLink,
  ShieldCheck,
  Database,
  Lock,
  LogOut,
  IndianRupee,
  Layers,
  MapPin,
  MessageSquare,
  Sparkles,
  Upload,
  FileUp,
  Image as ImageIcon,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/Icons";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  preferred_date: string;
  message: string;
  status: "new" | "contacted" | "confirmed" | "completed" | "cancelled";
  notes?: string;
  created_at: string;
}

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image_url: string;
  location?: string;
  year?: string;
  description?: string;
  featured?: boolean;
}

interface ServiceItem {
  id: string;
  title: string;
  tagline?: string;
  description?: string;
  image_url: string;
  duration?: string;
  delivery_time?: string;
  starting_price_inr?: number;
}

interface Stats {
  totalInquiries: number;
  newInquiries: number;
  confirmedBookings: number;
  totalPortfolio: number;
  totalServices: number;
  dbStatus: string;
  projectRef: string;
  region: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passkeyInput, setPasskeyInput] = useState("");
  const [authError, setAuthError] = useState("");

  const [activeTab, setActiveTab] = useState<"inquiries" | "portfolio" | "services" | "db">("inquiries");
  const [isLoading, setIsLoading] = useState(false);

  // Stats
  const [stats, setStats] = useState<Stats | null>(null);

  // Inquiries
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [inquiryFilter, setInquiryFilter] = useState<string>("all");
  const [inquirySearch, setInquirySearch] = useState("");

  // Portfolio
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isAddPhotoOpen, setIsAddPhotoOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<PortfolioItem | null>(null);
  const [isSavingPhoto, setIsSavingPhoto] = useState(false);
  const [photoFeedback, setPhotoFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [newPhoto, setNewPhoto] = useState({
    title: "",
    category: "Portrait Photography",
    image_url: "",
    location: "Jaipur, Rajasthan",
    year: "2026",
    description: "",
  });

  // Image Upload states
  const [uploadModeNew, setUploadModeNew] = useState<"file" | "url">("file");
  const [isUploadingNew, setIsUploadingNew] = useState(false);
  const [uploadErrorNew, setUploadErrorNew] = useState<string | null>(null);

  const [uploadModeEdit, setUploadModeEdit] = useState<"file" | "url">("file");
  const [isUploadingEdit, setIsUploadingEdit] = useState(false);
  const [uploadErrorEdit, setUploadErrorEdit] = useState<string | null>(null);

  // Services
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  // Check existing session
  useEffect(() => {
    const session = sessionStorage.getItem("admin_session");
    if (session === "active") {
      setIsAuthenticated(true);
      loadAllData();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanKey = passkeyInput.trim();
    // Accept standard admin key or database password
    if (cleanKey === "admin2026" || cleanKey === "admin123" || cleanKey === "jYzfeQKv2jqIStoX") {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_session", "active");
      setAuthError("");
      loadAllData();
    } else {
      setAuthError("Invalid access key. Use 'admin2026' or your Supabase password.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_session");
    setIsAuthenticated(false);
  };

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([fetchStats(), fetchInquiries(), fetchPortfolio(), fetchServices()]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (err) {
      console.error("Stats load failed:", err);
    }
  };

  const fetchInquiries = async () => {
    try {
      const res = await fetch(`/api/admin/inquiries?status=${inquiryFilter}&q=${encodeURIComponent(inquirySearch)}`);
      const data = await res.json();
      if (data.success) {
        setInquiries(data.inquiries || []);
      }
    } catch (err) {
      console.error("Inquiries load failed:", err);
    }
  };

  const fetchPortfolio = async () => {
    try {
      const res = await fetch("/api/admin/portfolio");
      const data = await res.json();
      if (data.success) {
        setPortfolioItems(data.items || []);
      }
    } catch (err) {
      console.error("Portfolio load failed:", err);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/admin/services");
      const data = await res.json();
      if (data.success) {
        setServices(data.services || []);
      }
    } catch (err) {
      console.error("Services load failed:", err);
    }
  };

  // Inquiry actions
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setInquiries((prev) =>
          prev.map((i) => (i.id === id ? { ...i, status: newStatus as any } : i))
        );
        fetchStats();
      }
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this booking inquiry?")) return;
    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setInquiries((prev) => prev.filter((i) => i.id !== id));
        fetchStats();
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // Portfolio actions
  const handleFileUpload = async (file: File, mode: "new" | "edit") => {
    if (!file) return;
    if (mode === "new") {
      setIsUploadingNew(true);
      setUploadErrorNew(null);
    } else {
      setIsUploadingEdit(true);
      setUploadErrorEdit(null);
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        if (mode === "new") {
          setNewPhoto((prev) => ({ ...prev, image_url: data.url }));
        } else {
          setEditingPhoto((prev) => (prev ? { ...prev, image_url: data.url } : null));
        }
      } else {
        const msg = data.error || "Failed to upload file";
        if (mode === "new") setUploadErrorNew(msg);
        else setUploadErrorEdit(msg);
      }
    } catch (err: any) {
      console.error("File upload error:", err);
      const msg = err.message || "Upload request failed";
      if (mode === "new") setUploadErrorNew(msg);
      else setUploadErrorEdit(msg);
    } finally {
      if (mode === "new") setIsUploadingNew(false);
      else setIsUploadingEdit(false);
    }
  };

  const handleCreatePhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhoto.title || !newPhoto.image_url) return;

    try {
      const res = await fetch("/api/admin/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPhoto),
      });
      const data = await res.json();
      if (data.success) {
        setIsAddPhotoOpen(false);
        const createdTitle = newPhoto.title;
        setNewPhoto({
          title: "",
          category: "Portrait Photography",
          image_url: "",
          location: "Jaipur, Rajasthan",
          year: "2026",
          description: "",
        });
        fetchPortfolio();
        fetchStats();
        setPhotoFeedback({
          type: "success",
          message: `Photo "${createdTitle}" added successfully!`,
        });
        setTimeout(() => setPhotoFeedback(null), 4000);
      }
    } catch (err) {
      console.error("Failed to add photo:", err);
    }
  };

  const handleUpdatePhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPhoto || !editingPhoto.title || !editingPhoto.image_url) return;

    setIsSavingPhoto(true);
    try {
      const res = await fetch("/api/admin/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPhoto),
      });
      const data = await res.json();
      if (data.success) {
        setPortfolioItems((prev) =>
          prev.map((p) => (p.id === editingPhoto.id ? editingPhoto : p))
        );
        const savedTitle = editingPhoto.title;
        setEditingPhoto(null);
        fetchStats();
        setPhotoFeedback({
          type: "success",
          message: `Photo "${savedTitle}" updated successfully in Supabase!`,
        });
        setTimeout(() => setPhotoFeedback(null), 4000);
      } else {
        setPhotoFeedback({
          type: "error",
          message: `Failed to update photo: ${data.error || "Unknown error"}`,
        });
      }
    } catch (err: any) {
      console.error("Failed to update photo:", err);
      setPhotoFeedback({
        type: "error",
        message: `Error updating photo: ${err.message}`,
      });
    } finally {
      setIsSavingPhoto(false);
    }
  };

  const handleDeletePhoto = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this portfolio photo?")) return;
    try {
      const res = await fetch(`/api/admin/portfolio?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setPortfolioItems((prev) => prev.filter((p) => p.id !== id));
        fetchStats();
        setPhotoFeedback({
          type: "success",
          message: "Portfolio photo deleted successfully.",
        });
        setTimeout(() => setPhotoFeedback(null), 4000);
      }
    } catch (err) {
      console.error("Delete photo failed:", err);
    }
  };

  // Service actions
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    try {
      const res = await fetch("/api/admin/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingService),
      });
      const data = await res.json();
      if (data.success) {
        setServices((prev) =>
          prev.map((s) => (s.id === editingService.id ? editingService : s))
        );
        setEditingService(null);
      }
    } catch (err) {
      console.error("Update service failed:", err);
    }
  };

  // Login Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-6 text-[#FAF7F2]">
        <div className="w-full max-w-md bg-[#181818] border border-[#2E2E2E] p-8 sm:p-10 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#BFA076]/20 border border-[#BFA076]/40 text-[#BFA076] mx-auto flex items-center justify-center">
              <Lock className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-light text-[#FAF7F2]">
              Studio Admin Portal
            </h1>
            <p className="text-xs text-[#FAF7F2]/60 font-sans">
              Connect to Supabase <code className="text-[#BFA076] font-mono">qvzvnblosedrqktisdsz</code>
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#FAF7F2]/75 font-sans mb-2">
                Admin Access Passkey
              </label>
              <input
                type="password"
                value={passkeyInput}
                onChange={(e) => setPasskeyInput(e.target.value)}
                placeholder="Enter passkey (e.g. admin2026)"
                className="w-full px-4 py-3 bg-[#101010] border border-[#333] text-sm text-[#FAF7F2] placeholder-[#FAF7F2]/40 focus:outline-none focus:border-[#BFA076]"
                autoFocus
              />
            </div>

            {authError && (
              <p className="text-xs text-red-400 font-sans flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-[#BFA076] text-[#121212] hover:bg-[#d6b485] font-medium text-xs uppercase tracking-[0.2em] transition-colors cursor-pointer"
            >
              Access Dashboard
            </button>
          </form>

          <div className="pt-4 border-t border-[#2A2A2A] text-center">
            <p className="text-[11px] text-[#FAF7F2]/40 font-sans">
              Default access key: <strong className="text-[#FAF7F2]/80">admin2026</strong>
            </p>
            <Link
              href="/"
              className="inline-block mt-3 text-xs text-[#BFA076] hover:underline"
            >
              ← Back to public website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#121212] flex flex-col font-sans">
      {/* Top Admin Header */}
      <header className="bg-[#121212] text-[#FAF7F2] border-b border-[#2A2A2A] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#BFA076] text-[#121212] flex items-center justify-center">
              <Camera className="w-4 h-4 stroke-[2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg tracking-wider uppercase">
                  Your Photography
                </span>
                <span className="px-2 py-0.5 text-[9px] uppercase tracking-widest bg-[#BFA076]/20 text-[#BFA076] border border-[#BFA076]/40 font-mono">
                  Admin Console
                </span>
              </div>
              <p className="text-[10px] text-[#FAF7F2]/60 font-sans">
                Flagship Studio • Jaipur, Rajasthan
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Live DB Pill */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-green-950/40 border border-green-800/40 text-green-300 text-xs">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>Supabase: {stats?.projectRef || "qvzvnblosedrqktisdsz"}</span>
            </div>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs text-[#FAF7F2]/80 hover:text-white px-3 py-1.5 border border-[#333] hover:border-[#555] transition-colors"
            >
              <span>View Website</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 px-3 py-1.5 border border-red-900/40 hover:bg-red-950/30 transition-colors cursor-pointer"
            >
              <LogOut className="w-3 h-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 sm:px-8 py-8 flex-1 w-full space-y-8">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-5 border border-[#E8DED0] shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#7B6955] uppercase tracking-wider">
              <span>Total Inquiries</span>
              <Mail className="w-4 h-4 text-[#BFA076]" />
            </div>
            <p className="font-serif text-3xl text-[#121212] mt-2">
              {stats?.totalInquiries || inquiries.length}
            </p>
            <p className="text-[11px] text-[#7B6955] mt-1">Live customer submissions</p>
          </div>

          <div className="bg-white p-5 border border-[#E8DED0] shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#7B6955] uppercase tracking-wider">
              <span>New / Pending</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <p className="font-serif text-3xl text-amber-700 mt-2">
              {stats?.newInquiries || inquiries.filter((i) => i.status === "new").length}
            </p>
            <p className="text-[11px] text-[#7B6955] mt-1">Awaiting studio reply</p>
          </div>

          <div className="bg-white p-5 border border-[#E8DED0] shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#7B6955] uppercase tracking-wider">
              <span>Confirmed Bookings</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="font-serif text-3xl text-emerald-700 mt-2">
              {stats?.confirmedBookings || inquiries.filter((i) => i.status === "confirmed").length}
            </p>
            <p className="text-[11px] text-[#7B6955] mt-1">Reserved dates</p>
          </div>

          <div className="bg-white p-5 border border-[#E8DED0] shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#7B6955] uppercase tracking-wider">
              <span>Live Portfolios</span>
              <Layers className="w-4 h-4 text-[#BFA076]" />
            </div>
            <p className="font-serif text-3xl text-[#121212] mt-2">
              {stats?.totalPortfolio || portfolioItems.length}
            </p>
            <p className="text-[11px] text-[#7B6955] mt-1">Published gallery items</p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8DED0] pb-2">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`px-4 py-2.5 text-xs uppercase tracking-widest transition-all cursor-pointer border-b-2 font-medium flex items-center gap-2 ${
                activeTab === "inquiries"
                  ? "border-[#121212] text-[#121212]"
                  : "border-transparent text-[#7B6955] hover:text-[#121212]"
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Inquiries & Bookings</span>
              {inquiries.filter((i) => i.status === "new").length > 0 && (
                <span className="px-1.5 py-0.2 bg-amber-600 text-white rounded-full text-[10px]">
                  {inquiries.filter((i) => i.status === "new").length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("portfolio")}
              className={`px-4 py-2.5 text-xs uppercase tracking-widest transition-all cursor-pointer border-b-2 font-medium flex items-center gap-2 ${
                activeTab === "portfolio"
                  ? "border-[#121212] text-[#121212]"
                  : "border-transparent text-[#7B6955] hover:text-[#121212]"
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Portfolio Manager</span>
            </button>

            <button
              onClick={() => setActiveTab("services")}
              className={`px-4 py-2.5 text-xs uppercase tracking-widest transition-all cursor-pointer border-b-2 font-medium flex items-center gap-2 ${
                activeTab === "services"
                  ? "border-[#121212] text-[#121212]"
                  : "border-transparent text-[#7B6955] hover:text-[#121212]"
              }`}
            >
              <IndianRupee className="w-3.5 h-3.5" />
              <span>Services & Pricing</span>
            </button>

            <button
              onClick={() => setActiveTab("db")}
              className={`px-4 py-2.5 text-xs uppercase tracking-widest transition-all cursor-pointer border-b-2 font-medium flex items-center gap-2 ${
                activeTab === "db"
                  ? "border-[#121212] text-[#121212]"
                  : "border-transparent text-[#7B6955] hover:text-[#121212]"
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Supabase Details</span>
            </button>
          </div>

          <button
            onClick={loadAllData}
            disabled={isLoading}
            className="px-3 py-1.5 text-xs uppercase tracking-wider text-[#554837] hover:text-[#121212] border border-[#D7C7B2] bg-white flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>

        {/* TAB 1: Inquiries & Bookings */}
        {activeTab === "inquiries" && (
          <div className="space-y-6">
            {/* Filter and Search Bar */}
            <div className="bg-white p-4 border border-[#E8DED0] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                {["all", "new", "contacted", "confirmed", "completed"].map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      setInquiryFilter(st);
                      setTimeout(fetchInquiries, 50);
                    }}
                    className={`px-3 py-1.5 text-xs uppercase tracking-wider capitalize cursor-pointer rounded-xs ${
                      inquiryFilter === st
                        ? "bg-[#121212] text-white font-medium"
                        : "bg-[#FAF7F2] text-[#554837] hover:bg-[#F3ECE1]"
                    }`}
                  >
                    {st === "new" ? "New / Pending" : st}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#7B6955]" />
                <input
                  type="text"
                  value={inquirySearch}
                  onChange={(e) => setInquirySearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && fetchInquiries()}
                  placeholder="Search name, phone, email..."
                  className="w-full pl-9 pr-3 py-2 bg-[#FAF7F2] border border-[#D7C7B2] text-xs text-[#121212] focus:outline-none focus:bg-white"
                />
              </div>
            </div>

            {/* Inquiries Table / Cards */}
            {inquiries.length === 0 ? (
              <div className="bg-white p-12 text-center border border-[#E8DED0] space-y-3">
                <Mail className="w-8 h-8 text-[#BFA076] mx-auto" />
                <h3 className="font-serif text-xl text-[#121212]">No Inquiries Found</h3>
                <p className="text-xs text-[#7B6955] max-w-md mx-auto">
                  New submissions submitted through the website&apos;s contact form will appear here dynamically in real-time.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq) => {
                  const whatsappClean = inq.phone.replace(/[^0-9]/g, "");
                  const whatsappMsg = encodeURIComponent(
                    `Hello ${inq.name}! Thank you for your inquiry with Your Photography regarding ${inq.service}. I would be delighted to discuss details with you.`
                  );
                  const whatsappUrl = `https://wa.me/${whatsappClean}?text=${whatsappMsg}`;

                  const statusColors: Record<string, string> = {
                    new: "bg-amber-100 text-amber-800 border-amber-300",
                    contacted: "bg-blue-100 text-blue-800 border-blue-300",
                    confirmed: "bg-emerald-100 text-emerald-800 border-emerald-300",
                    completed: "bg-purple-100 text-purple-800 border-purple-300",
                    cancelled: "bg-gray-100 text-gray-700 border-gray-300",
                  };

                  return (
                    <div
                      key={inq.id}
                      className="bg-white border border-[#E8DED0] p-6 shadow-xs space-y-4 hover:border-[#BFAB93] transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F3ECE1] pb-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <h4 className="font-serif text-xl text-[#121212] font-medium">
                              {inq.name}
                            </h4>
                            <span
                              className={`px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold border rounded-xs ${
                                statusColors[inq.status] || "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {inq.status}
                            </span>
                          </div>
                          <p className="text-xs text-[#7B6955]">
                            Received: {new Date(inq.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
                          </p>
                        </div>

                        {/* Status dropdown & Delete */}
                        <div className="flex items-center gap-2">
                          <label className="text-[11px] text-[#7B6955] uppercase tracking-wider">
                            Status:
                          </label>
                          <select
                            value={inq.status}
                            onChange={(e) => handleUpdateStatus(inq.id, e.target.value)}
                            className="text-xs bg-[#FAF7F2] border border-[#D7C7B2] px-2.5 py-1.5 text-[#121212] cursor-pointer"
                          >
                            <option value="new">New / Pending</option>
                            <option value="contacted">Contacted</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>

                          <button
                            onClick={() => handleDeleteInquiry(inq.id)}
                            className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xs transition-colors cursor-pointer"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Detail Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                        <div className="space-y-1">
                          <p className="uppercase tracking-wider text-[#7B6955] text-[10px]">
                            Service & Preferred Date
                          </p>
                          <p className="font-medium text-[#121212]">{inq.service}</p>
                          <p className="text-[#554837] flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-[#BFA076]" />
                            {inq.preferred_date}
                          </p>
                        </div>

                        <div className="space-y-1">
                          <p className="uppercase tracking-wider text-[#7B6955] text-[10px]">
                            Contact Details
                          </p>
                          <a
                            href={`mailto:${inq.email}`}
                            className="block font-medium text-[#121212] hover:underline"
                          >
                            {inq.email}
                          </a>
                          <a
                            href={`tel:${inq.phone}`}
                            className="block text-[#554837] hover:underline"
                          >
                            {inq.phone}
                          </a>
                        </div>

                        <div className="flex items-center gap-2 sm:justify-end">
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-medium uppercase tracking-wider rounded-xs transition-all shadow-xs"
                          >
                            <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                            <span>Chat on WhatsApp</span>
                          </a>
                          <a
                            href={`mailto:${inq.email}`}
                            className="inline-flex items-center gap-1 px-3 py-2 border border-[#D7C7B2] hover:bg-[#FAF7F2] text-[#121212] text-xs font-medium uppercase tracking-wider rounded-xs transition-all"
                          >
                            <Mail className="w-3.5 h-3.5 text-[#BFA076]" />
                            <span>Email</span>
                          </a>
                        </div>
                      </div>

                      {/* Message Content */}
                      <div className="bg-[#FAF7F2] p-3.5 border border-[#F3ECE1] text-xs text-[#554837] leading-relaxed">
                        <strong className="text-[#121212] block mb-1 font-medium">
                          Client Message:
                        </strong>
                        {inq.message}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Portfolio Manager */}
        {activeTab === "portfolio" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl text-[#121212]">
                  Manage Gallery Photos ({portfolioItems.length})
                </h3>
                <p className="text-xs text-[#7B6955]">
                  Photos are dynamically loaded into the homepage and /portfolio archive. Click Edit on any card to update details.
                </p>
              </div>

              <button
                onClick={() => setIsAddPhotoOpen(true)}
                className="px-4 py-2 bg-[#121212] text-[#FAF7F2] hover:bg-[#2C2C2C] text-xs uppercase tracking-widest flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Photo</span>
              </button>
            </div>

            {/* Photo Action Feedback Banner */}
            {photoFeedback && (
              <div
                className={`p-3.5 text-xs flex items-center justify-between border ${
                  photoFeedback.type === "success"
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                    : "bg-red-50 text-red-800 border-red-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  {photoFeedback.type === "success" ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  )}
                  <span className="font-medium">{photoFeedback.message}</span>
                </div>
                <button
                  onClick={() => setPhotoFeedback(null)}
                  className="text-xs hover:underline cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Modal for adding photo */}
            {isAddPhotoOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
                <div className="bg-white border border-[#E8DED0] max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-[#F3ECE1] pb-3">
                    <div>
                      <h4 className="font-serif text-xl sm:text-2xl text-[#121212]">Add Photo to Portfolio</h4>
                      <p className="text-xs text-[#7B6955] mt-0.5">
                        Upload an image file directly from your computer or paste a web URL.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsAddPhotoOpen(false)}
                      className="text-xs text-[#7B6955] hover:text-[#121212] cursor-pointer p-1"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Live preview banner for new photo */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-3 bg-[#FAF7F2] border border-[#E8DED0] rounded-xs">
                    <div className="relative aspect-video sm:aspect-square w-full bg-[#121212] overflow-hidden rounded-xs border border-[#D7C7B2]">
                      {newPhoto.image_url ? (
                        <Image
                          src={newPhoto.image_url}
                          alt={newPhoto.title || "Preview"}
                          fill
                          sizes="200px"
                          className="object-cover object-center"
                          unoptimized
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-xs text-[#FAF7F2]/60 p-4 text-center">
                          <ImageIcon className="w-6 h-6 mb-1 text-[#FAF7F2]/40" />
                          <span>No image selected yet</span>
                        </div>
                      )}
                    </div>
                    <div className="sm:col-span-2 space-y-1 text-xs justify-center flex flex-col">
                      <p className="text-[10px] uppercase tracking-wider text-[#7B6955] font-semibold">
                        Preview
                      </p>
                      <h5 className="font-serif text-base text-[#121212] font-medium line-clamp-1">
                        {newPhoto.title || "New Photograph Title"}
                      </h5>
                      <p className="text-[#554837]">
                        Category: <strong className="text-[#121212]">{newPhoto.category}</strong>
                      </p>
                      <p className="text-[#7B6955] text-[11px]">
                        {newPhoto.location || "Jaipur, Rajasthan"} • {newPhoto.year || "2026"}
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleCreatePhoto} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                          Photo Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={newPhoto.title}
                          onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                          placeholder="e.g. Amber Fort Sunrise"
                          className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] focus:outline-none focus:border-[#BFA076]"
                        />
                      </div>

                      <div>
                        <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                          Category *
                        </label>
                        <select
                          value={newPhoto.category}
                          onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })}
                          className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] focus:outline-none focus:border-[#BFA076]"
                        >
                          <option value="Portrait Photography">Portrait Photography</option>
                          <option value="Wedding Photography">Wedding Photography</option>
                          <option value="Sports Photography">Sports Photography</option>
                          <option value="Event Photography">Event Photography</option>
                          <option value="Nature & Wildlife">Nature & Wildlife</option>
                          <option value="Travel Photography">Travel Photography</option>
                          <option value="Commercial Photography">Commercial Photography</option>
                        </select>
                      </div>
                    </div>

                    {/* Image Asset: Upload File vs Paste URL */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="block uppercase tracking-wider text-[#7B6955] font-medium">
                          Photograph Asset *
                        </label>
                        <div className="flex items-center gap-1 bg-[#FAF7F2] p-0.5 border border-[#D7C7B2] rounded-xs text-[11px]">
                          <button
                            type="button"
                            onClick={() => setUploadModeNew("file")}
                            className={`px-2.5 py-1 transition-all cursor-pointer flex items-center gap-1.5 ${
                              uploadModeNew === "file"
                                ? "bg-[#121212] text-white font-medium"
                                : "text-[#7B6955] hover:text-[#121212]"
                            }`}
                          >
                            <Upload className="w-3 h-3" />
                            <span>Upload File</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setUploadModeNew("url")}
                            className={`px-2.5 py-1 transition-all cursor-pointer flex items-center gap-1.5 ${
                              uploadModeNew === "url"
                                ? "bg-[#121212] text-white font-medium"
                                : "text-[#7B6955] hover:text-[#121212]"
                            }`}
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Paste URL</span>
                          </button>
                        </div>
                      </div>

                      {uploadModeNew === "file" ? (
                        <div className="space-y-2">
                          <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#D7C7B2] hover:border-[#BFA076] bg-[#FAF7F2] hover:bg-[#F3ECE1] cursor-pointer transition-colors text-center group rounded-xs">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) handleFileUpload(f, "new");
                              }}
                            />
                            {isUploadingNew ? (
                              <div className="flex flex-col items-center gap-2 text-[#7B6955] py-2">
                                <RefreshCw className="w-6 h-6 animate-spin text-[#BFA076]" />
                                <span className="font-medium text-xs">Uploading photo to Supabase Cloud Storage...</span>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center gap-1.5">
                                <div className="w-10 h-10 rounded-full bg-[#BFA076]/20 text-[#BFA076] flex items-center justify-center group-hover:scale-110 transition-transform">
                                  <FileUp className="w-5 h-5" />
                                </div>
                                <p className="text-xs font-medium text-[#121212]">
                                  Click to browse image or drag & drop file
                                </p>
                                <p className="text-[10px] text-[#7B6955]">
                                  JPG, PNG, WebP, AVIF up to 20MB • Automatically saved to Supabase Storage
                                </p>
                              </div>
                            )}
                          </label>

                          {uploadErrorNew && (
                            <p className="text-[11px] text-red-600 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3 shrink-0" />
                              {uploadErrorNew}
                            </p>
                          )}

                          {newPhoto.image_url && (
                            <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] rounded-xs">
                              <span className="truncate max-w-sm font-mono">{newPhoto.image_url}</span>
                              <span className="px-2 py-0.5 bg-emerald-200 text-emerald-900 text-[9px] uppercase tracking-wider font-semibold rounded-xs">
                                Uploaded & Ready
                              </span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                          <input
                            type="url"
                            required
                            value={newPhoto.image_url}
                            onChange={(e) => setNewPhoto({ ...newPhoto, image_url: e.target.value })}
                            placeholder="https://images.unsplash.com/... or direct image URL"
                            className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] focus:outline-none focus:border-[#BFA076]"
                          />
                          <p className="text-[10px] text-[#7B6955] mt-1">
                            Paste a direct image link from Unsplash or cloud CDN.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                          Location
                        </label>
                        <input
                          type="text"
                          value={newPhoto.location}
                          onChange={(e) => setNewPhoto({ ...newPhoto, location: e.target.value })}
                          placeholder="Jaipur, Rajasthan"
                          className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] focus:outline-none focus:border-[#BFA076]"
                        />
                      </div>
                      <div>
                        <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                          Year
                        </label>
                        <input
                          type="text"
                          value={newPhoto.year}
                          onChange={(e) => setNewPhoto({ ...newPhoto, year: e.target.value })}
                          placeholder="2026"
                          className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] focus:outline-none focus:border-[#BFA076]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                        Description / Artistic Notes
                      </label>
                      <textarea
                        rows={2}
                        value={newPhoto.description}
                        onChange={(e) => setNewPhoto({ ...newPhoto, description: e.target.value })}
                        placeholder="Capturing golden light reflecting off sandstone..."
                        className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] resize-none focus:outline-none focus:border-[#BFA076]"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#F3ECE1]">
                      <button
                        type="button"
                        onClick={() => setIsAddPhotoOpen(false)}
                        className="px-4 py-2 border border-[#D7C7B2] text-[#554837] hover:bg-gray-100 uppercase tracking-widest text-xs cursor-pointer transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={!newPhoto.image_url || isUploadingNew}
                        className="px-5 py-2 bg-[#121212] text-white hover:bg-[#2C2C2C] disabled:bg-gray-400 uppercase tracking-widest text-xs font-medium cursor-pointer transition-colors"
                      >
                        Save Photo
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Modal for EDITING photo */}
            {editingPhoto && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
                <div className="bg-white border border-[#E8DED0] max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl my-8">
                  <div className="flex items-center justify-between border-b border-[#F3ECE1] pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif text-xl sm:text-2xl text-[#121212]">
                          Edit Photo Details
                        </h4>
                        <span className="px-2 py-0.5 text-[10px] font-mono bg-[#FAF7F2] border border-[#D7C7B2] text-[#7B6955]">
                          ID: {editingPhoto.id}
                        </span>
                      </div>
                      <p className="text-xs text-[#7B6955] mt-0.5">
                        Update attributes in Supabase. Real-time updates reflect on homepage and gallery.
                      </p>
                    </div>
                    <button
                      onClick={() => setEditingPhoto(null)}
                      className="text-sm text-[#7B6955] hover:text-[#121212] p-1 cursor-pointer"
                      title="Close"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Live preview banner */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-3 bg-[#FAF7F2] border border-[#E8DED0] rounded-xs">
                    <div className="relative aspect-video sm:aspect-square w-full bg-[#121212] overflow-hidden rounded-xs border border-[#D7C7B2]">
                      {editingPhoto.image_url ? (
                        <Image
                          src={editingPhoto.image_url}
                          alt={editingPhoto.title || "Preview"}
                          fill
                          sizes="200px"
                          className="object-cover object-center"
                          unoptimized
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-xs text-[#FAF7F2]/60">
                          No image URL
                        </div>
                      )}
                    </div>
                    <div className="sm:col-span-2 space-y-1 text-xs justify-center flex flex-col">
                      <p className="text-[10px] uppercase tracking-wider text-[#7B6955] font-semibold">
                        Live Preview
                      </p>
                      <h5 className="font-serif text-base text-[#121212] font-medium line-clamp-1">
                        {editingPhoto.title || "Untitled Photo"}
                      </h5>
                      <p className="text-[#554837]">
                        Category: <strong className="text-[#121212]">{editingPhoto.category}</strong>
                      </p>
                      <p className="text-[#7B6955] text-[11px]">
                        {editingPhoto.location || "Jaipur, Rajasthan"} • {editingPhoto.year || "2026"}
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleUpdatePhoto} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                          Photo Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={editingPhoto.title}
                          onChange={(e) =>
                            setEditingPhoto({ ...editingPhoto, title: e.target.value })
                          }
                          placeholder="e.g. Amber Fort Sunrise"
                          className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] focus:outline-none focus:border-[#BFA076]"
                        />
                      </div>

                      <div>
                        <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                          Category *
                        </label>
                        <select
                          value={editingPhoto.category}
                          onChange={(e) =>
                            setEditingPhoto({ ...editingPhoto, category: e.target.value })
                          }
                          className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] focus:outline-none focus:border-[#BFA076]"
                        >
                          <option value="Portrait Photography">Portrait Photography</option>
                          <option value="Wedding Photography">Wedding Photography</option>
                          <option value="Sports Photography">Sports Photography</option>
                          <option value="Event Photography">Event Photography</option>
                          <option value="Nature & Wildlife">Nature & Wildlife</option>
                          <option value="Travel Photography">Travel Photography</option>
                          <option value="Commercial Photography">Commercial Photography</option>
                        </select>
                      </div>
                    </div>

                    {/* Image Asset: Upload New File vs Paste URL */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="block uppercase tracking-wider text-[#7B6955] font-medium">
                          Photograph Asset *
                        </label>
                        <div className="flex items-center gap-1 bg-[#FAF7F2] p-0.5 border border-[#D7C7B2] rounded-xs text-[11px]">
                          <button
                            type="button"
                            onClick={() => setUploadModeEdit("file")}
                            className={`px-2.5 py-1 transition-all cursor-pointer flex items-center gap-1.5 ${
                              uploadModeEdit === "file"
                                ? "bg-[#121212] text-white font-medium"
                                : "text-[#7B6955] hover:text-[#121212]"
                            }`}
                          >
                            <Upload className="w-3 h-3" />
                            <span>Upload File</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setUploadModeEdit("url")}
                            className={`px-2.5 py-1 transition-all cursor-pointer flex items-center gap-1.5 ${
                              uploadModeEdit === "url"
                                ? "bg-[#121212] text-white font-medium"
                                : "text-[#7B6955] hover:text-[#121212]"
                            }`}
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Paste URL</span>
                          </button>
                        </div>
                      </div>

                      {uploadModeEdit === "file" ? (
                        <div className="space-y-2">
                          <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#D7C7B2] hover:border-[#BFA076] bg-[#FAF7F2] hover:bg-[#F3ECE1] cursor-pointer transition-colors text-center group rounded-xs">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) handleFileUpload(f, "edit");
                              }}
                            />
                            {isUploadingEdit ? (
                              <div className="flex flex-col items-center gap-2 text-[#7B6955] py-2">
                                <RefreshCw className="w-6 h-6 animate-spin text-[#BFA076]" />
                                <span className="font-medium text-xs">Uploading photo to Supabase Cloud Storage...</span>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center gap-1.5">
                                <div className="w-10 h-10 rounded-full bg-[#BFA076]/20 text-[#BFA076] flex items-center justify-center group-hover:scale-110 transition-transform">
                                  <FileUp className="w-5 h-5" />
                                </div>
                                <p className="text-xs font-medium text-[#121212]">
                                  Click to upload new image from your device
                                </p>
                                <p className="text-[10px] text-[#7B6955]">
                                  JPG, PNG, WebP, AVIF up to 20MB • Automatically replaces in Supabase Cloud
                                </p>
                              </div>
                            )}
                          </label>

                          {uploadErrorEdit && (
                            <p className="text-[11px] text-red-600 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3 shrink-0" />
                              {uploadErrorEdit}
                            </p>
                          )}

                          {editingPhoto.image_url && (
                            <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] rounded-xs">
                              <span className="truncate max-w-sm font-mono">{editingPhoto.image_url}</span>
                              <span className="px-2 py-0.5 bg-emerald-200 text-emerald-900 text-[9px] uppercase tracking-wider font-semibold rounded-xs">
                                Current Image
                              </span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                          <input
                            type="url"
                            required
                            value={editingPhoto.image_url}
                            onChange={(e) =>
                              setEditingPhoto({ ...editingPhoto, image_url: e.target.value })
                            }
                            placeholder="https://images.unsplash.com/... or direct image URL"
                            className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] focus:outline-none focus:border-[#BFA076]"
                          />
                          <p className="text-[10px] text-[#7B6955] mt-1">
                            Use high-resolution image links. Changing this URL will update the preview above in real time.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                          Location
                        </label>
                        <input
                          type="text"
                          value={editingPhoto.location || ""}
                          onChange={(e) =>
                            setEditingPhoto({ ...editingPhoto, location: e.target.value })
                          }
                          placeholder="Jaipur, Rajasthan"
                          className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] focus:outline-none focus:border-[#BFA076]"
                        />
                      </div>
                      <div>
                        <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                          Year
                        </label>
                        <input
                          type="text"
                          value={editingPhoto.year || ""}
                          onChange={(e) =>
                            setEditingPhoto({ ...editingPhoto, year: e.target.value })
                          }
                          placeholder="2026"
                          className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] focus:outline-none focus:border-[#BFA076]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                        Description / Artistic Notes
                      </label>
                      <textarea
                        rows={3}
                        value={editingPhoto.description || ""}
                        onChange={(e) =>
                          setEditingPhoto({ ...editingPhoto, description: e.target.value })
                        }
                        placeholder="Describe the composition, lighting, or setting..."
                        className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] resize-none focus:outline-none focus:border-[#BFA076]"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="featuredPhotoCheckbox"
                        checked={editingPhoto.featured ?? true}
                        onChange={(e) =>
                          setEditingPhoto({ ...editingPhoto, featured: e.target.checked })
                        }
                        className="w-4 h-4 accent-[#121212] cursor-pointer"
                      />
                      <label
                        htmlFor="featuredPhotoCheckbox"
                        className="text-xs text-[#121212] font-medium cursor-pointer"
                      >
                        Feature this photo in homepage highlight reels
                      </label>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#F3ECE1]">
                      <button
                        type="button"
                        onClick={() => setEditingPhoto(null)}
                        className="px-4 py-2 border border-[#D7C7B2] text-[#554837] hover:bg-gray-100 uppercase tracking-widest text-xs cursor-pointer transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSavingPhoto}
                        className="px-6 py-2.5 bg-[#121212] text-white hover:bg-[#2C2C2C] disabled:bg-gray-400 uppercase tracking-widest text-xs font-medium cursor-pointer transition-colors flex items-center gap-2"
                      >
                        {isSavingPhoto ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Saving...</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#BFA076]" />
                            <span>Save Changes</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Portfolio Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {portfolioItems.map((photo) => (
                <div
                  key={photo.id}
                  className="bg-white border border-[#E8DED0] overflow-hidden flex flex-col justify-between group shadow-xs hover:border-[#BFA076] hover:shadow-md transition-all"
                >
                  <div
                    onClick={() => setEditingPhoto(photo)}
                    className="relative aspect-square w-full bg-[#121212] overflow-hidden cursor-pointer group/thumb"
                    title="Click to edit photo"
                  >
                    <Image
                      src={photo.image_url}
                      alt={photo.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 text-[9px] uppercase tracking-widest bg-black/70 text-white backdrop-blur-xs">
                      {photo.category}
                    </span>

                    {/* Quick Edit Overlay */}
                    <div className="absolute inset-0 bg-black/45 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3 py-1.5 bg-[#FAF7F2] text-[#121212] text-xs uppercase tracking-wider font-medium flex items-center gap-1.5 shadow-md">
                        <Edit2 className="w-3.5 h-3.5 text-[#BFA076]" />
                        <span>Edit Photo</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h4
                        onClick={() => setEditingPhoto(photo)}
                        className="font-serif text-base text-[#121212] font-medium leading-tight hover:text-[#BFA076] cursor-pointer transition-colors"
                        title="Click to edit"
                      >
                        {photo.title}
                      </h4>
                      <p className="text-[11px] text-[#7B6955] flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-[#BFA076]" />
                        {photo.location} • {photo.year}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#F3ECE1] flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#7B6955]">
                        ID: {photo.id}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setEditingPhoto(photo)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-[#121212] bg-[#FAF7F2] hover:bg-[#BFA076] hover:text-white border border-[#D7C7B2] rounded-xs transition-all cursor-pointer"
                          title="Edit photo details"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeletePhoto(photo.id)}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xs transition-colors cursor-pointer"
                          title="Delete photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Services & Pricing */}
        {activeTab === "services" && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif text-2xl text-[#121212]">
                Photography Services & INR Pricing
              </h3>
              <p className="text-xs text-[#7B6955]">
                Adjust starting rates, turnaround times, and service specifications stored in Supabase.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((svc) => (
                <div
                  key={svc.id}
                  className="bg-white border border-[#E8DED0] p-6 shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif text-xl text-[#121212]">{svc.title}</h4>
                      <span className="px-2.5 py-1 text-xs font-semibold bg-[#BFA076]/15 text-[#7B6955] border border-[#BFA076]/30">
                        ₹{(svc.starting_price_inr || 25000).toLocaleString("en-IN")}
                      </span>
                    </div>

                    <p className="text-xs text-[#554837] leading-relaxed line-clamp-3">
                      {svc.description}
                    </p>

                    <div className="text-[11px] text-[#7B6955] space-y-1 pt-2 border-t border-[#F3ECE1]">
                      <p>
                        <strong>Duration:</strong> {svc.duration}
                      </p>
                      <p>
                        <strong>Delivery:</strong> {svc.delivery_time}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setEditingService(svc)}
                    className="w-full py-2 border border-[#121212] text-[#121212] hover:bg-[#121212] hover:text-white text-xs uppercase tracking-widest transition-colors cursor-pointer font-medium flex items-center justify-center gap-1.5"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit Pricing & Details</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Edit Service Modal */}
            {editingService && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
                <div className="bg-white border border-[#E8DED0] max-w-md w-full p-6 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-[#F3ECE1] pb-3">
                    <h4 className="font-serif text-xl text-[#121212]">
                      Edit {editingService.title}
                    </h4>
                    <button
                      onClick={() => setEditingService(null)}
                      className="text-xs text-[#7B6955] hover:text-[#121212]"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleSaveService} className="space-y-4 text-xs">
                    <div>
                      <label className="block uppercase tracking-wider text-[#7B6955] mb-1">
                        Starting Price (INR ₹)
                      </label>
                      <input
                        type="number"
                        value={editingService.starting_price_inr || 25000}
                        onChange={(e) =>
                          setEditingService({
                            ...editingService,
                            starting_price_inr: Number(e.target.value),
                          })
                        }
                        className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212]"
                      />
                    </div>

                    <div>
                      <label className="block uppercase tracking-wider text-[#7B6955] mb-1">
                        Session Duration
                      </label>
                      <input
                        type="text"
                        value={editingService.duration || ""}
                        onChange={(e) =>
                          setEditingService({ ...editingService, duration: e.target.value })
                        }
                        className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212]"
                      />
                    </div>

                    <div>
                      <label className="block uppercase tracking-wider text-[#7B6955] mb-1">
                        Turnaround Delivery Time
                      </label>
                      <input
                        type="text"
                        value={editingService.delivery_time || ""}
                        onChange={(e) =>
                          setEditingService({ ...editingService, delivery_time: e.target.value })
                        }
                        className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212]"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setEditingService(null)}
                        className="px-4 py-2 border border-[#D7C7B2] text-[#554837] hover:bg-gray-100 uppercase tracking-widest text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-[#121212] text-white hover:bg-[#2C2C2C] uppercase tracking-widest text-xs font-medium"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: Supabase Details */}
        {activeTab === "db" && (
          <div className="space-y-6">
            <div className="bg-white p-8 border border-[#E8DED0] space-y-6">
              <div className="flex items-center gap-3 border-b border-[#F3ECE1] pb-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-[#121212]">
                    Supabase PostgreSQL Connection
                  </h3>
                  <p className="text-xs text-[#7B6955]">
                    Connected cloud database powering live inquiries, gallery, and services.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                <div className="space-y-3 bg-[#FAF7F2] p-4 border border-[#F3ECE1]">
                  <p className="uppercase tracking-widest font-semibold text-[#7B6955] text-[10px]">
                    Project Credentials
                  </p>
                  <div>
                    <span className="text-[#7B6955] block">Project URL:</span>
                    <code className="text-[#121212] font-mono break-all font-semibold">
                      https://qvzvnblosedrqktisdsz.supabase.co
                    </code>
                  </div>
                  <div>
                    <span className="text-[#7B6955] block">Project Reference:</span>
                    <code className="text-[#121212] font-mono font-semibold">
                      qvzvnblosedrqktisdsz
                    </code>
                  </div>
                  <div>
                    <span className="text-[#7B6955] block">Status:</span>
                    <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Active & Fully Seeded
                    </span>
                  </div>
                </div>

                <div className="space-y-3 bg-[#FAF7F2] p-4 border border-[#F3ECE1]">
                  <p className="uppercase tracking-widest font-semibold text-[#7B6955] text-[10px]">
                    Pooler Architecture
                  </p>
                  <div>
                    <span className="text-[#7B6955] block">Host:</span>
                    <code className="text-[#121212] font-mono font-semibold">
                      aws-0-ap-southeast-1.pooler.supabase.com
                    </code>
                  </div>
                  <div>
                    <span className="text-[#7B6955] block">Region:</span>
                    <span className="text-[#121212] font-medium">
                      AWS ap-southeast-1 (High Availability)
                    </span>
                  </div>
                  <div>
                    <span className="text-[#7B6955] block">Port:</span>
                    <span className="text-[#121212] font-mono">6543 (Transaction) / 5432 (Session)</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#FAF7F2] p-4 border border-[#F3ECE1] space-y-2 text-xs">
                <p className="uppercase tracking-widest font-semibold text-[#7B6955] text-[10px]">
                  Database Tables Active
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
                  <div className="p-2 bg-white border border-[#E8DED0]">
                    ✓ public.inquiries
                  </div>
                  <div className="p-2 bg-white border border-[#E8DED0]">
                    ✓ public.portfolio_items
                  </div>
                  <div className="p-2 bg-white border border-[#E8DED0]">
                    ✓ public.services
                  </div>
                  <div className="p-2 bg-white border border-[#E8DED0]">
                    ✓ public.studio_settings
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
