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
  User,
  Building,
  Sliders,
  Globe,
  Share2,
  FileText,
  Award,
  Info,
  ChevronDown,
  ChevronRight,
  Check,
  HelpCircle,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/Icons";
import { siteConfig } from "@/config/siteConfig";
import AdminBlogManager from "@/components/admin/AdminBlogManager";
import AdminFaqManager from "@/components/admin/AdminFaqManager";

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
  deliverables?: string[];
  ideal_for?: string;
}

interface StudioSettingsData {
  studio_name: string;
  tagline: string;
  subtagline: string;
  hero_image_url: string;
  email: string;
  phone: string;
  whatsapp_number: string;
  address: string;
  hindi_address: string;
  working_hours: string;
  photographer_name: string;
  photographer_role: string;
  photographer_bio_1: string;
  photographer_bio_2: string;
  photographer_quote: string;
  photographer_portrait_url: string;
  stats_experience: string;
  stats_sessions: string;
  stats_weddings: string;
  stats_features: string;
  instagram_url: string;
  facebook_url: string;
  pinterest_url: string;
  five_hundred_px_url: string;
  youtube_url: string;
}

interface DayScheduleRow {
  key: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
  name: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

interface Stats {
  totalInquiries: number;
  newInquiries: number;
  confirmedBookings: number;
  totalPortfolio: number;
  totalServices: number;
  totalBlogPosts?: number;
  totalFaqs?: number;
  dbStatus: string;
  projectRef: string;
  region: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passkeyInput, setPasskeyInput] = useState("");
  const [authError, setAuthError] = useState("");

  const [activeTab, setActiveTab] = useState<
    "inquiries" | "portfolio" | "services" | "studio" | "photographer" | "blog" | "faq" | "db"
  >("inquiries");
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

  // Image Upload states for Portfolio
  const [uploadModeNew, setUploadModeNew] = useState<"file" | "url">("file");
  const [isUploadingNew, setIsUploadingNew] = useState(false);
  const [uploadErrorNew, setUploadErrorNew] = useState<string | null>(null);

  const [uploadModeEdit, setUploadModeEdit] = useState<"file" | "url">("file");
  const [isUploadingEdit, setIsUploadingEdit] = useState(false);
  const [uploadErrorEdit, setUploadErrorEdit] = useState<string | null>(null);

  // Services
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [isSavingService, setIsSavingService] = useState(false);
  const [serviceFeedback, setServiceFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [newService, setNewService] = useState({
    title: "",
    tagline: "",
    description: "",
    starting_price_inr: 25000,
    duration: "2-3 Hours",
    delivery_time: "7-10 Business Days",
    image_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    deliverablesText: "High-resolution edited digital photographs\nOnline private gallery delivery with download access\nFull personal printing rights and social sharing permissions",
    ideal_for: "",
  });
  const [uploadModeServiceNew, setUploadModeServiceNew] = useState<"file" | "url">("file");
  const [isUploadingServiceNew, setIsUploadingServiceNew] = useState(false);
  const [uploadErrorServiceNew, setUploadErrorServiceNew] = useState<string | null>(null);

  const [uploadModeServiceEdit, setUploadModeServiceEdit] = useState<"file" | "url">("file");
  const [isUploadingServiceEdit, setIsUploadingServiceEdit] = useState(false);
  const [uploadErrorServiceEdit, setUploadErrorServiceEdit] = useState<string | null>(null);

  // Studio Settings
  const [studioSettings, setStudioSettings] = useState<StudioSettingsData>({
    studio_name: "Your Photography",
    tagline: "Capturing Moments, Creating Memories",
    subtagline: "Fine Art & Editorial Studio • Jaipur, Rajasthan",
    hero_image_url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2000&q=85",
    email: siteConfig.business.email || "hello@yourphotography.com",
    phone: siteConfig.business.phone || "+91 98290 12345",
    whatsapp_number: siteConfig.business.whatsappNumber || "919829012345",
    address: "Room 215, 2nd Floor, RV2J+5PQ, Karolan Ka Barh, Shri Kishanpura, Jaipur, Rajasthan 302017",
    hindi_address: "कमरा नं. 215, द्वितीय तल, RV2J+5PQ, करोलां का बाड़, श्री किशनपुरा, जयपुर, राजस्थान 302017",
    working_hours: "Monday – Saturday: 9:30 AM – 7:00 PM IST (Sunday by Appointment)",
    photographer_name: "Kishor Prem",
    photographer_role: "Principal Photographer & Visual Artist",
    photographer_bio_1:
      "For over twelve years, I have dedicated my life to the delicate art of seeing. Photography, to me, is not merely capturing what is before the lens, but feeling the heartbeat of a fleeting moment and preserving it before it disappears into memory.",
    photographer_bio_2:
      "Trained in classical fine-art, documentary, and dynamic action photography, my style blends soft, warm natural light with subtle editorial composition. I look for the unscripted pauses: the quiet touch of hands before vows, the fleeting glint in an eye, or the explosive energy of an athlete in mid-air.",
    photographer_quote: "“Light reveals what exists; emotion reveals what truly matters.”",
    photographer_portrait_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80",
    stats_experience: "12+ Years",
    stats_sessions: "650+",
    stats_weddings: "180+",
    stats_features: "24+",
    instagram_url: "https://instagram.com/yourphotography",
    facebook_url: "https://facebook.com/yourphotography",
    pinterest_url: "https://pinterest.com/yourphotography",
    five_hundred_px_url: "https://500px.com/yourphotography",
    youtube_url: "https://youtube.com/@yourphotography",
  });
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [settingsFeedback, setSettingsFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Business Hours Management State (Google Business Profile Style)
  const [isHoursExpanded, setIsHoursExpanded] = useState(true);
  const [hoursHeading, setHoursHeading] = useState("Regular Studio Operating Hours");
  const [specifyHours, setSpecifyHours] = useState(true);
  const [daysSchedule, setDaysSchedule] = useState<DayScheduleRow[]>([
    { key: "Mon", name: "Monday", isOpen: true, openTime: "08:00", closeTime: "18:00" },
    { key: "Tue", name: "Tuesday", isOpen: true, openTime: "08:00", closeTime: "18:00" },
    { key: "Wed", name: "Wednesday", isOpen: true, openTime: "08:00", closeTime: "18:00" },
    { key: "Thu", name: "Thursday", isOpen: true, openTime: "08:00", closeTime: "18:00" },
    { key: "Fri", name: "Friday", isOpen: true, openTime: "08:00", closeTime: "17:00" },
    { key: "Sat", name: "Saturday", isOpen: false, openTime: "08:00", closeTime: "18:00" },
    { key: "Sun", name: "Sunday", isOpen: false, openTime: "08:00", closeTime: "18:00" },
  ]);
  const [holidayHours, setHolidayHours] = useState("");
  const [isTemporarilyClosed, setIsTemporarilyClosed] = useState(false);
  const [tempClosedReason, setTempClosedReason] = useState("");
  const [additionalHoursText, setAdditionalHoursText] = useState("Sunday by Appointment");
  const [isSavingHours, setIsSavingHours] = useState(false);
  const [hoursSavedFeedback, setHoursSavedFeedback] = useState<string | null>(null);
  const [showManualHoursOverride, setShowManualHoursOverride] = useState(false);

  // Hero Image Upload
  const [uploadModeHero, setUploadModeHero] = useState<"file" | "url">("file");
  const [isUploadingHero, setIsUploadingHero] = useState(false);
  const [uploadErrorHero, setUploadErrorHero] = useState<string | null>(null);

  // Portrait Image Upload
  const [uploadModePortrait, setUploadModePortrait] = useState<"file" | "url">("file");
  const [isUploadingPortrait, setIsUploadingPortrait] = useState(false);
  const [uploadErrorPortrait, setUploadErrorPortrait] = useState<string | null>(null);

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
      await Promise.all([
        fetchStats(),
        fetchInquiries(),
        fetchPortfolio(),
        fetchServices(),
        fetchStudioSettings(),
      ]);
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

  // Studio Settings actions
  const fetchStudioSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (data.success && data.settings) {
        setStudioSettings((prev) => ({
          ...prev,
          ...data.settings,
        }));

        // Hydrate business hours from localStorage or database string
        try {
          const cached = localStorage.getItem("studio_business_hours_config");
          if (cached) {
            const parsed = JSON.parse(cached);
            if (parsed.daysSchedule) setDaysSchedule(parsed.daysSchedule);
            if (parsed.hoursHeading) setHoursHeading(parsed.hoursHeading);
            if (parsed.specifyHours !== undefined) setSpecifyHours(parsed.specifyHours);
            if (parsed.holidayHours !== undefined) setHolidayHours(parsed.holidayHours);
            if (parsed.isTemporarilyClosed !== undefined) setIsTemporarilyClosed(parsed.isTemporarilyClosed);
            if (parsed.tempClosedReason !== undefined) setTempClosedReason(parsed.tempClosedReason);
            if (parsed.additionalHoursText !== undefined) setAdditionalHoursText(parsed.additionalHoursText);
          } else if (data.settings.working_hours) {
            const str = data.settings.working_hours;
            if (str.includes("08:00") && str.includes("18:00")) {
              applyHoursPreset("mockup");
            } else if (/mon(?:day)?\s*–\s*sat(?:urday)?/i.test(str)) {
              applyHoursPreset("jaipur");
            }
          }
        } catch (e) {}
      }
    } catch (err) {
      console.error("Studio settings load failed:", err);
    }
  };

  const handleSaveStudioSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    setSettingsFeedback(null);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studioSettings),
      });
      const data = await res.json();
      if (data.success) {
        setSettingsFeedback({
          type: "success",
          message: "All studio & photographer details saved to Supabase! Changes are live across the website.",
        });
        setTimeout(() => setSettingsFeedback(null), 5000);
      } else {
        setSettingsFeedback({
          type: "error",
          message: `Failed to save: ${data.error || "Unknown error"}`,
        });
      }
    } catch (err: any) {
      setSettingsFeedback({
        type: "error",
        message: `Network error: ${err.message}`,
      });
    } finally {
      setIsSavingSettings(false);
    }
  };

  // Business Hours computation & handlers (matching Google Business Profile style)
  const computeWorkingHoursSummary = (config: {
    specifyHours: boolean;
    daysSchedule: DayScheduleRow[];
    holidayHours: string;
    isTemporarilyClosed: boolean;
    tempClosedReason: string;
    additionalHoursText: string;
  }): string => {
    if (config.isTemporarilyClosed) {
      return config.tempClosedReason?.trim()
        ? `Temporarily Closed (${config.tempClosedReason.trim()})`
        : "Temporarily Closed";
    }

    if (!config.specifyHours) {
      return "Open 24 Hours / Available by Appointment";
    }

    const groups: {
      startDay: string;
      endDay: string;
      isOpen: boolean;
      openTime: string;
      closeTime: string;
    }[] = [];

    for (const day of config.daysSchedule) {
      const lastGroup = groups[groups.length - 1];
      const isSame =
        lastGroup &&
        lastGroup.isOpen === day.isOpen &&
        (!day.isOpen || (lastGroup.openTime === day.openTime && lastGroup.closeTime === day.closeTime));

      if (isSame) {
        lastGroup.endDay = day.name;
      } else {
        groups.push({
          startDay: day.name,
          endDay: day.name,
          isOpen: day.isOpen,
          openTime: day.openTime,
          closeTime: day.closeTime,
        });
      }
    }

    const parts = groups.map((g) => {
      const dayLabel = g.startDay === g.endDay ? g.startDay : `${g.startDay} – ${g.endDay}`;
      if (!g.isOpen) {
        return `${dayLabel}: Closed`;
      }
      return `${dayLabel}: ${g.openTime} – ${g.closeTime}`;
    });

    let result = parts.join(", ");
    if (config.additionalHoursText && config.additionalHoursText.trim()) {
      result += ` (${config.additionalHoursText.trim()})`;
    }
    if (config.holidayHours && config.holidayHours.trim()) {
      result += ` [Holiday: ${config.holidayHours.trim()}]`;
    }
    return result;
  };

  const syncWorkingHours = (
    newSchedule: DayScheduleRow[],
    overrides?: Partial<{
      specifyHours: boolean;
      holidayHours: string;
      isTemporarilyClosed: boolean;
      tempClosedReason: string;
      additionalHoursText: string;
    }>
  ) => {
    const formatted = computeWorkingHoursSummary({
      specifyHours: overrides?.specifyHours ?? specifyHours,
      daysSchedule: newSchedule,
      holidayHours: overrides?.holidayHours ?? holidayHours,
      isTemporarilyClosed: overrides?.isTemporarilyClosed ?? isTemporarilyClosed,
      tempClosedReason: overrides?.tempClosedReason ?? tempClosedReason,
      additionalHoursText: overrides?.additionalHoursText ?? additionalHoursText,
    });
    setStudioSettings((prev) => ({ ...prev, working_hours: formatted }));
  };

  const handleDayOpenChange = (index: number, isOpen: boolean) => {
    const updated = [...daysSchedule];
    updated[index] = { ...updated[index], isOpen };
    setDaysSchedule(updated);
    syncWorkingHours(updated);
  };

  const handleDayTimeChange = (index: number, field: "openTime" | "closeTime", val: string) => {
    const updated = [...daysSchedule];
    updated[index] = { ...updated[index], [field]: val };
    setDaysSchedule(updated);
    syncWorkingHours(updated);
  };

  const handleApplyMondayToAll = () => {
    const mon = daysSchedule[0];
    const updated = daysSchedule.map((d) => ({
      ...d,
      isOpen: mon.isOpen,
      openTime: mon.openTime,
      closeTime: mon.closeTime,
    }));
    setDaysSchedule(updated);
    syncWorkingHours(updated);
  };

  const applyHoursPreset = (type: "mockup" | "jaipur" | "corporate" | "allweek") => {
    let updatedSchedule: DayScheduleRow[] = [];
    let newAddText = additionalHoursText;
    if (type === "mockup") {
      updatedSchedule = [
        { key: "Mon", name: "Monday", isOpen: true, openTime: "08:00", closeTime: "18:00" },
        { key: "Tue", name: "Tuesday", isOpen: true, openTime: "08:00", closeTime: "18:00" },
        { key: "Wed", name: "Wednesday", isOpen: true, openTime: "08:00", closeTime: "18:00" },
        { key: "Thu", name: "Thursday", isOpen: true, openTime: "08:00", closeTime: "18:00" },
        { key: "Fri", name: "Friday", isOpen: true, openTime: "08:00", closeTime: "17:00" },
        { key: "Sat", name: "Saturday", isOpen: false, openTime: "08:00", closeTime: "18:00" },
        { key: "Sun", name: "Sunday", isOpen: false, openTime: "08:00", closeTime: "18:00" },
      ];
    } else if (type === "jaipur") {
      newAddText = "Sunday by Appointment";
      updatedSchedule = [
        { key: "Mon", name: "Monday", isOpen: true, openTime: "09:30", closeTime: "19:00" },
        { key: "Tue", name: "Tuesday", isOpen: true, openTime: "09:30", closeTime: "19:00" },
        { key: "Wed", name: "Wednesday", isOpen: true, openTime: "09:30", closeTime: "19:00" },
        { key: "Thu", name: "Thursday", isOpen: true, openTime: "09:30", closeTime: "19:00" },
        { key: "Fri", name: "Friday", isOpen: true, openTime: "09:30", closeTime: "19:00" },
        { key: "Sat", name: "Saturday", isOpen: true, openTime: "09:30", closeTime: "19:00" },
        { key: "Sun", name: "Sunday", isOpen: false, openTime: "09:30", closeTime: "19:00" },
      ];
    } else if (type === "corporate") {
      newAddText = "Weekend by Appointment";
      updatedSchedule = [
        { key: "Mon", name: "Monday", isOpen: true, openTime: "09:00", closeTime: "18:00" },
        { key: "Tue", name: "Tuesday", isOpen: true, openTime: "09:00", closeTime: "18:00" },
        { key: "Wed", name: "Wednesday", isOpen: true, openTime: "09:00", closeTime: "18:00" },
        { key: "Thu", name: "Thursday", isOpen: true, openTime: "09:00", closeTime: "18:00" },
        { key: "Fri", name: "Friday", isOpen: true, openTime: "09:00", closeTime: "18:00" },
        { key: "Sat", name: "Saturday", isOpen: false, openTime: "09:00", closeTime: "18:00" },
        { key: "Sun", name: "Sunday", isOpen: false, openTime: "09:00", closeTime: "18:00" },
      ];
    } else if (type === "allweek") {
      newAddText = "";
      updatedSchedule = [
        { key: "Mon", name: "Monday", isOpen: true, openTime: "08:00", closeTime: "20:00" },
        { key: "Tue", name: "Tuesday", isOpen: true, openTime: "08:00", closeTime: "20:00" },
        { key: "Wed", name: "Wednesday", isOpen: true, openTime: "08:00", closeTime: "20:00" },
        { key: "Thu", name: "Thursday", isOpen: true, openTime: "08:00", closeTime: "20:00" },
        { key: "Fri", name: "Friday", isOpen: true, openTime: "08:00", closeTime: "20:00" },
        { key: "Sat", name: "Saturday", isOpen: true, openTime: "08:00", closeTime: "20:00" },
        { key: "Sun", name: "Sunday", isOpen: true, openTime: "08:00", closeTime: "20:00" },
      ];
    }
    setDaysSchedule(updatedSchedule);
    setAdditionalHoursText(newAddText);
    syncWorkingHours(updatedSchedule, { additionalHoursText: newAddText });
  };

  const handleSaveBusinessHours = async () => {
    setIsSavingHours(true);
    setHoursSavedFeedback(null);
    try {
      const formatted = computeWorkingHoursSummary({
        specifyHours,
        daysSchedule,
        holidayHours,
        isTemporarilyClosed,
        tempClosedReason,
        additionalHoursText,
      });
      const updated = { ...studioSettings, working_hours: formatted };
      setStudioSettings(updated);

      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      const data = await res.json();
      if (data.success) {
        setHoursSavedFeedback("Saved for 1 profile! Synchronized with Supabase.");
        try {
          localStorage.setItem(
            "studio_business_hours_config",
            JSON.stringify({
              hoursHeading,
              specifyHours,
              daysSchedule,
              holidayHours,
              isTemporarilyClosed,
              tempClosedReason,
              additionalHoursText,
            })
          );
        } catch (e) {}
        setTimeout(() => setHoursSavedFeedback(null), 5000);
      } else {
        alert(`Save failed: ${data.error || "Unknown error"}`);
      }
    } catch (err: any) {
      alert(`Save failed: ${err.message}`);
    } finally {
      setIsSavingHours(false);
    }
  };

  const handleCancelHours = () => {
    try {
      const cached = localStorage.getItem("studio_business_hours_config");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.daysSchedule) setDaysSchedule(parsed.daysSchedule);
        if (parsed.hoursHeading) setHoursHeading(parsed.hoursHeading);
        if (parsed.specifyHours !== undefined) setSpecifyHours(parsed.specifyHours);
        if (parsed.holidayHours !== undefined) setHolidayHours(parsed.holidayHours);
        if (parsed.isTemporarilyClosed !== undefined) setIsTemporarilyClosed(parsed.isTemporarilyClosed);
        if (parsed.tempClosedReason !== undefined) setTempClosedReason(parsed.tempClosedReason);
        if (parsed.additionalHoursText !== undefined) setAdditionalHoursText(parsed.additionalHoursText);
        syncWorkingHours(parsed.daysSchedule, parsed);
        return;
      }
    } catch (e) {}
    applyHoursPreset("jaipur");
  };

  const handleHeroUpload = async (file: File) => {
    if (!file) return;
    setIsUploadingHero(true);
    setUploadErrorHero(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.success && data.url) {
        setStudioSettings((prev) => ({ ...prev, hero_image_url: data.url }));
      } else {
        setUploadErrorHero(data.error || "Upload failed");
      }
    } catch (err: any) {
      setUploadErrorHero(err.message || "Upload request failed");
    } finally {
      setIsUploadingHero(false);
    }
  };

  const handlePortraitUpload = async (file: File) => {
    if (!file) return;
    setIsUploadingPortrait(true);
    setUploadErrorPortrait(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.success && data.url) {
        setStudioSettings((prev) => ({ ...prev, photographer_portrait_url: data.url }));
      } else {
        setUploadErrorPortrait(data.error || "Upload failed");
      }
    } catch (err: any) {
      setUploadErrorPortrait(err.message || "Upload request failed");
    } finally {
      setIsUploadingPortrait(false);
    }
  };

  const handleServiceNewUpload = async (file: File) => {
    if (!file) return;
    setIsUploadingServiceNew(true);
    setUploadErrorServiceNew(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.success && data.url) {
        setNewService((prev) => ({ ...prev, image_url: data.url }));
      } else {
        setUploadErrorServiceNew(data.error || "Upload failed");
      }
    } catch (err: any) {
      setUploadErrorServiceNew(err.message || "Upload request failed");
    } finally {
      setIsUploadingServiceNew(false);
    }
  };

  const handleServiceEditUpload = async (file: File) => {
    if (!file || !editingService) return;
    setIsUploadingServiceEdit(true);
    setUploadErrorServiceEdit(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.success && data.url) {
        setEditingService((prev) => (prev ? { ...prev, image_url: data.url } : null));
      } else {
        setUploadErrorServiceEdit(data.error || "Upload failed");
      }
    } catch (err: any) {
      setUploadErrorServiceEdit(err.message || "Upload request failed");
    } finally {
      setIsUploadingServiceEdit(false);
    }
  };

  // Service actions
  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.title) return;
    setIsSavingService(true);
    try {
      const deliverablesArr = newService.deliverablesText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);

      const res = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newService.title,
          tagline: newService.tagline,
          description: newService.description,
          starting_price_inr: newService.starting_price_inr,
          duration: newService.duration,
          delivery_time: newService.delivery_time,
          image_url: newService.image_url,
          deliverables: deliverablesArr,
          ideal_for: newService.ideal_for,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAddServiceOpen(false);
        setNewService({
          title: "",
          tagline: "",
          description: "",
          starting_price_inr: 25000,
          duration: "2-3 Hours",
          delivery_time: "7-10 Business Days",
          image_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
          deliverablesText: "High-resolution edited digital photographs\nOnline private gallery delivery with download access\nFull personal printing rights and social sharing permissions",
          ideal_for: "",
        });
        fetchServices();
        fetchStats();
        setServiceFeedback({
          type: "success",
          message: `Service "${data.service?.title || "New Service"}" added successfully!`,
        });
        setTimeout(() => setServiceFeedback(null), 4000);
      } else {
        setServiceFeedback({
          type: "error",
          message: `Failed to create service: ${data.error || "Unknown error"}`,
        });
      }
    } catch (err: any) {
      setServiceFeedback({
        type: "error",
        message: `Error creating service: ${err.message}`,
      });
    } finally {
      setIsSavingService(false);
    }
  };

  const handleUpdateService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    setIsSavingService(true);
    try {
      const res = await fetch("/api/admin/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingService),
      });
      const data = await res.json();
      if (data.success) {
        setServices((prev) =>
          prev.map((s) => (s.id === editingService.id ? (data.service || editingService) : s))
        );
        const savedTitle = editingService.title;
        setEditingService(null);
        setServiceFeedback({
          type: "success",
          message: `Service "${savedTitle}" updated successfully!`,
        });
        setTimeout(() => setServiceFeedback(null), 4000);
      } else {
        setServiceFeedback({
          type: "error",
          message: `Failed to update service: ${data.error || "Unknown error"}`,
        });
      }
    } catch (err: any) {
      setServiceFeedback({
        type: "error",
        message: `Error updating service: ${err.message}`,
      });
    } finally {
      setIsSavingService(false);
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      const res = await fetch(`/api/admin/services?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setServices((prev) => prev.filter((s) => s.id !== id));
        fetchStats();
        setServiceFeedback({
          type: "success",
          message: "Service deleted successfully.",
        });
        setTimeout(() => setServiceFeedback(null), 4000);
      }
    } catch (err) {
      console.error("Delete service failed:", err);
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
              onClick={() => setActiveTab("studio")}
              className={`px-4 py-2.5 text-xs uppercase tracking-widest transition-all cursor-pointer border-b-2 font-medium flex items-center gap-2 ${
                activeTab === "studio"
                  ? "border-[#121212] text-[#121212]"
                  : "border-transparent text-[#7B6955] hover:text-[#121212]"
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              <span>Studio & Contact</span>
            </button>

            <button
              onClick={() => setActiveTab("photographer")}
              className={`px-4 py-2.5 text-xs uppercase tracking-widest transition-all cursor-pointer border-b-2 font-medium flex items-center gap-2 ${
                activeTab === "photographer"
                  ? "border-[#121212] text-[#121212]"
                  : "border-transparent text-[#7B6955] hover:text-[#121212]"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Photographer Profile</span>
            </button>

            <button
              onClick={() => setActiveTab("blog")}
              className={`px-4 py-2.5 text-xs uppercase tracking-widest transition-all cursor-pointer border-b-2 font-medium flex items-center gap-2 ${
                activeTab === "blog"
                  ? "border-[#121212] text-[#121212]"
                  : "border-transparent text-[#7B6955] hover:text-[#121212]"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Blog & Guides</span>
            </button>

            <button
              onClick={() => setActiveTab("faq")}
              className={`px-4 py-2.5 text-xs uppercase tracking-widest transition-all cursor-pointer border-b-2 font-medium flex items-center gap-2 ${
                activeTab === "faq"
                  ? "border-[#121212] text-[#121212]"
                  : "border-transparent text-[#7B6955] hover:text-[#121212]"
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>FAQ Knowledge</span>
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl text-[#121212]">
                  Photography Services & Pricing
                </h3>
                <p className="text-xs text-[#7B6955]">
                  Manage services, starting prices in Indian Rupees (₹), deliverables, and session photography details.
                </p>
              </div>

              <button
                onClick={() => setIsAddServiceOpen(true)}
                className="px-4 py-2.5 bg-[#121212] text-white hover:bg-[#2C2C2C] uppercase tracking-widest text-xs font-medium cursor-pointer transition-colors flex items-center gap-2 self-start sm:self-auto"
              >
                <Plus className="w-4 h-4 text-[#BFA076]" />
                <span>Add New Service</span>
              </button>
            </div>

            {serviceFeedback && (
              <div
                className={`p-4 border text-xs sm:text-sm flex items-center justify-between rounded-xs ${
                  serviceFeedback.type === "success"
                    ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                    : "bg-red-50 border-red-300 text-red-900"
                }`}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{serviceFeedback.message}</span>
                </div>
                <button
                  onClick={() => setServiceFeedback(null)}
                  className="text-xs font-bold px-2 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((svc) => (
                <div
                  key={svc.id}
                  className="bg-white border border-[#E8DED0] overflow-hidden flex flex-col justify-between shadow-xs hover:border-[#BFA076] transition-all group"
                >
                  {/* Service Cover Thumbnail */}
                  <div className="relative aspect-[16/10] w-full bg-[#121212] overflow-hidden">
                    <Image
                      src={svc.image_url}
                      alt={svc.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute top-2 right-2 px-2.5 py-1 text-xs font-semibold bg-[#121212]/85 text-[#BFA076] border border-[#BFA076]/40 backdrop-blur-xs">
                      ₹{(svc.starting_price_inr || 25000).toLocaleString("en-IN")}
                    </div>
                  </div>

                  <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h4 className="font-serif text-xl text-[#121212]">{svc.title}</h4>
                      {svc.tagline && (
                        <p className="text-[11px] uppercase tracking-wider text-[#BFA076] font-medium font-sans">
                          {svc.tagline}
                        </p>
                      )}
                      <p className="text-xs text-[#554837] leading-relaxed line-clamp-2">
                        {svc.description}
                      </p>

                      <div className="text-[11px] text-[#7B6955] space-y-1 pt-2 border-t border-[#F3ECE1]">
                        <p>
                          <strong>Duration:</strong> {svc.duration || "2 Hours"}
                        </p>
                        <p>
                          <strong>Delivery:</strong> {svc.delivery_time || "7 business days"}
                        </p>
                      </div>

                      {/* Deliverables snippet */}
                      {svc.deliverables && svc.deliverables.length > 0 && (
                        <div className="pt-2">
                          <p className="text-[10px] uppercase tracking-wider text-[#7B6955] font-semibold mb-1">
                            Included Deliverables:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {svc.deliverables.slice(0, 2).map((d, i) => (
                              <span
                                key={i}
                                className="px-1.5 py-0.5 bg-[#FAF7F2] border border-[#E8DED0] text-[10px] text-[#554837] truncate max-w-full"
                              >
                                ✓ {d}
                              </span>
                            ))}
                            {svc.deliverables.length > 2 && (
                              <span className="text-[10px] text-[#7B6955] self-center">
                                +{svc.deliverables.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-[#F3ECE1] flex items-center gap-2">
                      <button
                        onClick={() => setEditingService(svc)}
                        className="flex-1 py-2 bg-[#FAF7F2] hover:bg-[#121212] hover:text-white border border-[#D7C7B2] text-[#121212] text-xs uppercase tracking-wider transition-colors cursor-pointer font-medium flex items-center justify-center gap-1.5"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit Service</span>
                      </button>
                      <button
                        onClick={() => handleDeleteService(svc.id)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 border border-[#D7C7B2] transition-colors cursor-pointer"
                        title="Delete service"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ADD SERVICE MODAL */}
            {isAddServiceOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
                <div className="bg-white border border-[#E8DED0] max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl my-8">
                  <div className="flex items-center justify-between border-b border-[#F3ECE1] pb-3">
                    <h4 className="font-serif text-2xl text-[#121212] flex items-center gap-2">
                      <Plus className="w-5 h-5 text-[#BFA076]" />
                      <span>Add New Photography Service</span>
                    </h4>
                    <button
                      onClick={() => setIsAddServiceOpen(false)}
                      className="text-xs text-[#7B6955] hover:text-[#121212] px-2 py-1 font-bold"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleCreateService} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                          Service Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={newService.title}
                          onChange={(e) =>
                            setNewService({ ...newService, title: e.target.value })
                          }
                          placeholder="e.g. Royal Wedding Collection"
                          className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] focus:outline-none focus:border-[#BFA076]"
                        />
                      </div>

                      <div>
                        <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                          Starting Price (INR ₹) *
                        </label>
                        <input
                          type="number"
                          required
                          value={newService.starting_price_inr}
                          onChange={(e) =>
                            setNewService({
                              ...newService,
                              starting_price_inr: Number(e.target.value),
                            })
                          }
                          placeholder="e.g. 75000"
                          className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] focus:outline-none focus:border-[#BFA076]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                        Tagline / Subtitle
                      </label>
                      <input
                        type="text"
                        value={newService.tagline}
                        onChange={(e) =>
                          setNewService({ ...newService, tagline: e.target.value })
                        }
                        placeholder="e.g. Majestic Palace & Destination Weddings Across Rajasthan"
                        className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] focus:outline-none focus:border-[#BFA076]"
                      />
                    </div>

                    <div>
                      <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                        Service Overview & Description *
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={newService.description}
                        onChange={(e) =>
                          setNewService({ ...newService, description: e.target.value })
                        }
                        placeholder="Detailed description of what the client experiences..."
                        className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] resize-none focus:outline-none focus:border-[#BFA076]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                          Typical Duration
                        </label>
                        <input
                          type="text"
                          value={newService.duration}
                          onChange={(e) =>
                            setNewService({ ...newService, duration: e.target.value })
                          }
                          placeholder="e.g. 2-3 Days or 3 Hours"
                          className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] focus:outline-none focus:border-[#BFA076]"
                        />
                      </div>

                      <div>
                        <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                          Turnaround Delivery Time
                        </label>
                        <input
                          type="text"
                          value={newService.delivery_time}
                          onChange={(e) =>
                            setNewService({ ...newService, delivery_time: e.target.value })
                          }
                          placeholder="e.g. 2-3 Weeks"
                          className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] focus:outline-none focus:border-[#BFA076]"
                        />
                      </div>
                    </div>

                    {/* Image Asset Picker */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="block uppercase tracking-wider text-[#7B6955] font-medium">
                          Cover Photograph Asset *
                        </label>
                        <div className="flex items-center gap-1 bg-[#FAF7F2] p-0.5 border border-[#D7C7B2] rounded-xs text-[11px]">
                          <button
                            type="button"
                            onClick={() => setUploadModeServiceNew("file")}
                            className={`px-2.5 py-1 transition-all cursor-pointer flex items-center gap-1.5 ${
                              uploadModeServiceNew === "file"
                                ? "bg-[#121212] text-white font-medium"
                                : "text-[#7B6955] hover:text-[#121212]"
                            }`}
                          >
                            <Upload className="w-3 h-3" />
                            <span>Upload File</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setUploadModeServiceNew("url")}
                            className={`px-2.5 py-1 transition-all cursor-pointer flex items-center gap-1.5 ${
                              uploadModeServiceNew === "url"
                                ? "bg-[#121212] text-white font-medium"
                                : "text-[#7B6955] hover:text-[#121212]"
                            }`}
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Paste URL</span>
                          </button>
                        </div>
                      </div>

                      {uploadModeServiceNew === "file" ? (
                        <div className="space-y-2">
                          <label className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-[#D7C7B2] hover:border-[#BFA076] bg-[#FAF7F2] hover:bg-[#F3ECE1] cursor-pointer transition-colors text-center group rounded-xs">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) handleServiceNewUpload(f);
                              }}
                            />
                            {isUploadingServiceNew ? (
                              <div className="flex flex-col items-center gap-2 text-[#7B6955] py-2">
                                <RefreshCw className="w-5 h-5 animate-spin text-[#BFA076]" />
                                <span className="font-medium text-xs">Uploading cover to Supabase Storage...</span>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center gap-1.5">
                                <FileUp className="w-5 h-5 text-[#BFA076]" />
                                <p className="text-xs font-medium text-[#121212]">
                                  Click to upload service cover image
                                </p>
                              </div>
                            )}
                          </label>

                          {uploadErrorServiceNew && (
                            <p className="text-[11px] text-red-600 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3 shrink-0" />
                              {uploadErrorServiceNew}
                            </p>
                          )}
                        </div>
                      ) : (
                        <input
                          type="url"
                          required
                          value={newService.image_url}
                          onChange={(e) =>
                            setNewService({ ...newService, image_url: e.target.value })
                          }
                          placeholder="https://..."
                          className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-xs text-[#121212] focus:outline-none focus:border-[#BFA076]"
                        />
                      )}
                    </div>

                    <div>
                      <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                        Deliverables (One per line)
                      </label>
                      <textarea
                        rows={3}
                        value={newService.deliverablesText}
                        onChange={(e) =>
                          setNewService({ ...newService, deliverablesText: e.target.value })
                        }
                        placeholder="50+ Edited high-resolution images&#10;Private cloud gallery&#10;Full personal print rights"
                        className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] font-mono resize-none focus:outline-none focus:border-[#BFA076]"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#F3ECE1]">
                      <button
                        type="button"
                        onClick={() => setIsAddServiceOpen(false)}
                        className="px-4 py-2 border border-[#D7C7B2] text-[#554837] hover:bg-gray-100 uppercase tracking-widest text-xs cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSavingService}
                        className="px-6 py-2.5 bg-[#121212] text-white hover:bg-[#2C2C2C] disabled:bg-gray-400 uppercase tracking-widest text-xs font-medium cursor-pointer transition-colors flex items-center gap-2"
                      >
                        {isSavingService ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Creating Service...</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#BFA076]" />
                            <span>Create Service</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* EDIT SERVICE MODAL */}
            {editingService && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
                <div className="bg-white border border-[#E8DED0] max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl my-8">
                  <div className="flex items-center justify-between border-b border-[#F3ECE1] pb-3">
                    <h4 className="font-serif text-2xl text-[#121212] flex items-center gap-2">
                      <Edit2 className="w-5 h-5 text-[#BFA076]" />
                      <span>Edit {editingService.title}</span>
                    </h4>
                    <button
                      onClick={() => setEditingService(null)}
                      className="text-xs text-[#7B6955] hover:text-[#121212] px-2 py-1 font-bold"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleUpdateService} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                          Service Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={editingService.title}
                          onChange={(e) =>
                            setEditingService({ ...editingService, title: e.target.value })
                          }
                          className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] focus:outline-none focus:border-[#BFA076]"
                        />
                      </div>

                      <div>
                        <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                          Starting Price (INR ₹) *
                        </label>
                        <input
                          type="number"
                          required
                          value={editingService.starting_price_inr || 25000}
                          onChange={(e) =>
                            setEditingService({
                              ...editingService,
                              starting_price_inr: Number(e.target.value),
                            })
                          }
                          className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] focus:outline-none focus:border-[#BFA076]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                        Tagline / Subtitle
                      </label>
                      <input
                        type="text"
                        value={editingService.tagline || ""}
                        onChange={(e) =>
                          setEditingService({ ...editingService, tagline: e.target.value })
                        }
                        className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] focus:outline-none focus:border-[#BFA076]"
                      />
                    </div>

                    <div>
                      <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                        Description *
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={editingService.description || ""}
                        onChange={(e) =>
                          setEditingService({ ...editingService, description: e.target.value })
                        }
                        className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] resize-none focus:outline-none focus:border-[#BFA076]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                          Duration
                        </label>
                        <input
                          type="text"
                          value={editingService.duration || ""}
                          onChange={(e) =>
                            setEditingService({ ...editingService, duration: e.target.value })
                          }
                          className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] focus:outline-none focus:border-[#BFA076]"
                        />
                      </div>

                      <div>
                        <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                          Turnaround Delivery Time
                        </label>
                        <input
                          type="text"
                          value={editingService.delivery_time || ""}
                          onChange={(e) =>
                            setEditingService({ ...editingService, delivery_time: e.target.value })
                          }
                          className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] focus:outline-none focus:border-[#BFA076]"
                        />
                      </div>
                    </div>

                    {/* Image Asset Picker */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="block uppercase tracking-wider text-[#7B6955] font-medium">
                          Service Cover Image *
                        </label>
                        <div className="flex items-center gap-1 bg-[#FAF7F2] p-0.5 border border-[#D7C7B2] rounded-xs text-[11px]">
                          <button
                            type="button"
                            onClick={() => setUploadModeServiceEdit("file")}
                            className={`px-2.5 py-1 transition-all cursor-pointer flex items-center gap-1.5 ${
                              uploadModeServiceEdit === "file"
                                ? "bg-[#121212] text-white font-medium"
                                : "text-[#7B6955] hover:text-[#121212]"
                            }`}
                          >
                            <Upload className="w-3 h-3" />
                            <span>Upload File</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setUploadModeServiceEdit("url")}
                            className={`px-2.5 py-1 transition-all cursor-pointer flex items-center gap-1.5 ${
                              uploadModeServiceEdit === "url"
                                ? "bg-[#121212] text-white font-medium"
                                : "text-[#7B6955] hover:text-[#121212]"
                            }`}
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Paste URL</span>
                          </button>
                        </div>
                      </div>

                      {uploadModeServiceEdit === "file" ? (
                        <div className="space-y-2">
                          <label className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-[#D7C7B2] hover:border-[#BFA076] bg-[#FAF7F2] hover:bg-[#F3ECE1] cursor-pointer transition-colors text-center group rounded-xs">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) handleServiceEditUpload(f);
                              }}
                            />
                            {isUploadingServiceEdit ? (
                              <div className="flex flex-col items-center gap-2 text-[#7B6955] py-2">
                                <RefreshCw className="w-5 h-5 animate-spin text-[#BFA076]" />
                                <span className="font-medium text-xs">Uploading cover to Supabase Storage...</span>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center gap-1.5">
                                <FileUp className="w-5 h-5 text-[#BFA076]" />
                                <p className="text-xs font-medium text-[#121212]">
                                  Click to upload new service cover image
                                </p>
                              </div>
                            )}
                          </label>

                          {uploadErrorServiceEdit && (
                            <p className="text-[11px] text-red-600 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3 shrink-0" />
                              {uploadErrorServiceEdit}
                            </p>
                          )}
                        </div>
                      ) : (
                        <input
                          type="url"
                          required
                          value={editingService.image_url}
                          onChange={(e) =>
                            setEditingService({ ...editingService, image_url: e.target.value })
                          }
                          placeholder="https://..."
                          className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-xs text-[#121212] focus:outline-none focus:border-[#BFA076]"
                        />
                      )}
                    </div>

                    <div>
                      <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                        Deliverables (One per line)
                      </label>
                      <textarea
                        rows={3}
                        value={(editingService.deliverables || []).join("\n")}
                        onChange={(e) =>
                          setEditingService({
                            ...editingService,
                            deliverables: e.target.value
                              .split("\n")
                              .map((s) => s.trim())
                              .filter(Boolean),
                          })
                        }
                        className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] font-mono resize-none focus:outline-none focus:border-[#BFA076]"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#F3ECE1]">
                      <button
                        type="button"
                        onClick={() => {
                          const id = editingService.id;
                          setEditingService(null);
                          handleDeleteService(id);
                        }}
                        className="px-3 py-2 text-red-600 hover:text-red-800 uppercase tracking-wider text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete Service</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingService(null)}
                          className="px-4 py-2 border border-[#D7C7B2] text-[#554837] hover:bg-gray-100 uppercase tracking-widest text-xs cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isSavingService}
                          className="px-6 py-2 bg-[#121212] text-white hover:bg-[#2C2C2C] disabled:bg-gray-400 uppercase tracking-widest text-xs font-medium cursor-pointer transition-colors flex items-center gap-2"
                        >
                          {isSavingService ? (
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
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: Studio & Contact Settings */}
        {activeTab === "studio" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl text-[#121212]">
                  Studio & Brand Settings
                </h3>
                <p className="text-xs text-[#7B6955]">
                  Manage studio name, taglines, hero background image, contact info, working hours, and social profiles.
                </p>
              </div>

              <button
                onClick={handleSaveStudioSettings}
                disabled={isSavingSettings}
                className="px-6 py-2.5 bg-[#121212] text-white hover:bg-[#2C2C2C] disabled:bg-gray-400 uppercase tracking-widest text-xs font-medium cursor-pointer transition-colors flex items-center justify-center gap-2 self-start sm:self-auto"
              >
                {isSavingSettings ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#BFA076]" />
                    <span>Save Studio Settings</span>
                  </>
                )}
              </button>
            </div>

            {settingsFeedback && (
              <div
                className={`p-4 border text-xs sm:text-sm flex items-center justify-between rounded-xs ${
                  settingsFeedback.type === "success"
                    ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                    : "bg-red-50 border-red-300 text-red-900"
                }`}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{settingsFeedback.message}</span>
                </div>
                <button
                  onClick={() => setSettingsFeedback(null)}
                  className="text-xs font-bold px-2 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}

            <form onSubmit={handleSaveStudioSettings} className="space-y-8">
              {/* Card 1: Brand & Hero Identity */}
              <div className="bg-white p-6 sm:p-8 border border-[#E8DED0] space-y-6 shadow-xs">
                <div className="border-b border-[#F3ECE1] pb-3">
                  <h4 className="font-serif text-lg text-[#121212] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#BFA076]" />
                    <span>Brand & Hero Identity</span>
                  </h4>
                  <p className="text-xs text-[#7B6955]">
                    Public business name, main headlines displayed on the homepage hero, and background imagery.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                  <div>
                    <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                      Studio / Brand Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={studioSettings.studio_name}
                      onChange={(e) =>
                        setStudioSettings({ ...studioSettings, studio_name: e.target.value })
                      }
                      placeholder="e.g. Your Photography"
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] focus:outline-none focus:border-[#BFA076]"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                      Primary Tagline (Hero H1) *
                    </label>
                    <input
                      type="text"
                      required
                      value={studioSettings.tagline}
                      onChange={(e) =>
                        setStudioSettings({ ...studioSettings, tagline: e.target.value })
                      }
                      placeholder="e.g. Capturing Moments, Creating Memories"
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] focus:outline-none focus:border-[#BFA076]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                      Subtagline / Editorial Subtitle
                    </label>
                    <input
                      type="text"
                      value={studioSettings.subtagline}
                      onChange={(e) =>
                        setStudioSettings({ ...studioSettings, subtagline: e.target.value })
                      }
                      placeholder="e.g. Fine Art & Editorial Studio • Jaipur, Rajasthan"
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] focus:outline-none focus:border-[#BFA076]"
                    />
                  </div>
                </div>

                {/* Hero Background Image Picker with Upload */}
                <div className="space-y-3 pt-2 border-t border-[#F3ECE1]">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="block uppercase tracking-wider text-[#7B6955] font-medium text-xs">
                        Hero Background Image
                      </label>
                      <p className="text-[11px] text-[#7B6955]">
                        High-resolution photo displayed across the hero banner on the homepage.
                      </p>
                    </div>

                    <div className="flex items-center gap-1 bg-[#FAF7F2] p-0.5 border border-[#D7C7B2] rounded-xs text-[11px]">
                      <button
                        type="button"
                        onClick={() => setUploadModeHero("file")}
                        className={`px-2.5 py-1 transition-all cursor-pointer flex items-center gap-1.5 ${
                          uploadModeHero === "file"
                            ? "bg-[#121212] text-white font-medium"
                            : "text-[#7B6955] hover:text-[#121212]"
                        }`}
                      >
                        <Upload className="w-3 h-3" />
                        <span>Upload File</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setUploadModeHero("url")}
                        className={`px-2.5 py-1 transition-all cursor-pointer flex items-center gap-1.5 ${
                          uploadModeHero === "url"
                            ? "bg-[#121212] text-white font-medium"
                            : "text-[#7B6955] hover:text-[#121212]"
                        }`}
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Paste URL</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
                    <div className="relative aspect-[16/9] w-full bg-[#121212] rounded-xs overflow-hidden border border-[#D7C7B2]">
                      {studioSettings.hero_image_url ? (
                        <Image
                          src={studioSettings.hero_image_url}
                          alt="Hero banner preview"
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-xs text-[#FAF7F2]/60">
                          No hero image set
                        </div>
                      )}
                    </div>

                    <div className="sm:col-span-3">
                      {uploadModeHero === "file" ? (
                        <div className="space-y-2">
                          <label className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-[#D7C7B2] hover:border-[#BFA076] bg-[#FAF7F2] hover:bg-[#F3ECE1] cursor-pointer transition-colors text-center group rounded-xs">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) handleHeroUpload(f);
                              }}
                            />
                            {isUploadingHero ? (
                              <div className="flex flex-col items-center gap-2 text-[#7B6955] py-2">
                                <RefreshCw className="w-5 h-5 animate-spin text-[#BFA076]" />
                                <span className="font-medium text-xs">Uploading Hero banner to Supabase Cloud...</span>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center gap-1.5">
                                <FileUp className="w-5 h-5 text-[#BFA076]" />
                                <p className="text-xs font-medium text-[#121212]">
                                  Click to upload new hero banner image
                                </p>
                                <p className="text-[10px] text-[#7B6955]">
                                  Recommended: 2000×1200 or larger landscape JPG/WebP
                                </p>
                              </div>
                            )}
                          </label>

                          {uploadErrorHero && (
                            <p className="text-[11px] text-red-600 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3 shrink-0" />
                              {uploadErrorHero}
                            </p>
                          )}
                        </div>
                      ) : (
                        <input
                          type="url"
                          value={studioSettings.hero_image_url}
                          onChange={(e) =>
                            setStudioSettings({ ...studioSettings, hero_image_url: e.target.value })
                          }
                          placeholder="https://..."
                          className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-xs text-[#121212] focus:outline-none focus:border-[#BFA076]"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Contact Numbers & WhatsApp */}
              <div className="bg-white p-6 sm:p-8 border border-[#E8DED0] space-y-6 shadow-xs">
                <div className="border-b border-[#F3ECE1] pb-3">
                  <h4 className="font-serif text-lg text-[#121212] flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#BFA076]" />
                    <span>Direct Communication & WhatsApp</span>
                  </h4>
                  <p className="text-xs text-[#7B6955]">
                    Phone number for direct calls, email for inquiries, and WhatsApp business number for 1-click chat.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
                  <div>
                    <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                      Studio Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={studioSettings.email}
                      onChange={(e) =>
                        setStudioSettings({ ...studioSettings, email: e.target.value })
                      }
                      placeholder="contact@yourphotography.com"
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] focus:outline-none focus:border-[#BFA076]"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                      Studio Phone Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={studioSettings.phone}
                      onChange={(e) =>
                        setStudioSettings({ ...studioSettings, phone: e.target.value })
                      }
                      placeholder="+91 98290 12345"
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] focus:outline-none focus:border-[#BFA076]"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                      WhatsApp Number (With Country Code) *
                    </label>
                    <input
                      type="text"
                      required
                      value={studioSettings.whatsapp_number}
                      onChange={(e) =>
                        setStudioSettings({ ...studioSettings, whatsapp_number: e.target.value })
                      }
                      placeholder="919829012345"
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] focus:outline-none focus:border-[#BFA076]"
                    />
                    <p className="text-[10px] text-[#7B6955] mt-1 font-sans">
                      Used for wa.me links (digits only, e.g. 919829012345)
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3: Studio Physical Address */}
              <div className="bg-white p-6 sm:p-8 border border-[#E8DED0] space-y-6 shadow-xs">
                <div className="border-b border-[#F3ECE1] pb-3">
                  <h4 className="font-serif text-lg text-[#121212] flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#BFA076]" />
                    <span>Physical Studio Location</span>
                  </h4>
                  <p className="text-xs text-[#7B6955]">
                    Official addresses in English and Hindi for local SEO in Jaipur, Rajasthan.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                      Full Address (English) *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={studioSettings.address}
                      onChange={(e) =>
                        setStudioSettings({ ...studioSettings, address: e.target.value })
                      }
                      placeholder="Room 215, 2nd Floor, RV2J+5PQ, Karolan Ka Barh, Shri Kishanpura, Jaipur, Rajasthan 302017"
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] focus:outline-none focus:border-[#BFA076] resize-none"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                      Full Address (Hindi / हिंदी पता) *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={studioSettings.hindi_address}
                      onChange={(e) =>
                        setStudioSettings({ ...studioSettings, hindi_address: e.target.value })
                      }
                      placeholder="कमरा नं. 215, द्वितीय तल, RV2J+5PQ, करोलां का बाड़, श्री किशनपुरा, जयपुर, राजस्थान 302017"
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] focus:outline-none focus:border-[#BFA076] resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Card 4: Business Hours Management (Google Business Profile Style) */}
              <div className="bg-white border border-[#E8DED0] shadow-xs overflow-hidden">
                {/* Accordion Card Header */}
                <div
                  onClick={() => setIsHoursExpanded(!isHoursExpanded)}
                  className="bg-[#FAF7F2]/60 px-6 py-4 border-b border-[#E8DED0] flex items-center justify-between cursor-pointer hover:bg-[#FAF7F2] transition-colors select-none"
                >
                  <div className="flex items-center gap-2.5">
                    {isHoursExpanded ? (
                      <ChevronDown className="w-4 h-4 text-[#7B6955]" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-[#7B6955]" />
                    )}
                    <h4 className="font-serif text-lg text-[#121212] flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#BFA076]" />
                      <span>Business Hours</span>
                    </h4>
                  </div>
                  <span className="text-xs text-[#7B6955] font-sans">
                    {isHoursExpanded ? "Collapse" : "Expand"}
                  </span>
                </div>

                {isHoursExpanded && (
                  <div>
                    {/* Row 1: Hours Heading */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 items-start">
                      <div className="md:col-span-3 space-y-0.5">
                        <label className="text-xs font-semibold text-gray-800 block">
                          Hours Heading
                        </label>
                        <span className="text-[11px] text-gray-400 font-mono block">
                          c_hoursHeading
                        </span>
                      </div>
                      <div className="md:col-span-9">
                        <input
                          type="text"
                          value={hoursHeading}
                          onChange={(e) => setHoursHeading(e.target.value)}
                          placeholder="Click to add"
                          className="w-full max-w-md p-2 bg-[#FAF7F2] border border-[#D7C7B2] rounded text-xs text-[#121212] placeholder-gray-400 focus:outline-none focus:border-[#BFA076]"
                        />
                      </div>
                    </div>

                    {/* Row 2: Hours (Day-by-Day Schedule) */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-5 border-b border-gray-100 items-start">
                      <div className="md:col-span-3 space-y-0.5">
                        <label className="text-xs font-semibold text-gray-800 block">
                          Hours
                        </label>
                        <span className="text-[11px] text-gray-400 font-mono block">
                          hours
                        </span>
                      </div>

                      <div className="md:col-span-9 space-y-4">
                        {/* Specify hours Checkbox & Presets */}
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <label className="inline-flex items-center gap-2 text-xs font-medium text-gray-800 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={specifyHours}
                              onChange={(e) => {
                                setSpecifyHours(e.target.checked);
                                syncWorkingHours(daysSchedule, { specifyHours: e.target.checked });
                              }}
                              className="rounded text-[#BFA076] focus:ring-[#BFA076] w-4 h-4 cursor-pointer"
                            />
                            <span>Specify hours</span>
                          </label>

                          {/* Quick Presets */}
                          <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                            <span className="text-gray-400 font-sans mr-1">Presets:</span>
                            <button
                              type="button"
                              onClick={() => applyHoursPreset("mockup")}
                              className="px-2 py-0.5 bg-gray-100 hover:bg-[#E8DED0] text-gray-700 rounded text-[11px] transition-colors cursor-pointer"
                            >
                              Mockup (Mon–Thu 8–18, Fri 8–17)
                            </button>
                            <button
                              type="button"
                              onClick={() => applyHoursPreset("jaipur")}
                              className="px-2 py-0.5 bg-gray-100 hover:bg-[#E8DED0] text-gray-700 rounded text-[11px] transition-colors cursor-pointer"
                            >
                              Jaipur Standard (Mon–Sat 9:30–19:00)
                            </button>
                            <button
                              type="button"
                              onClick={() => applyHoursPreset("corporate")}
                              className="px-2 py-0.5 bg-gray-100 hover:bg-[#E8DED0] text-gray-700 rounded text-[11px] transition-colors cursor-pointer"
                            >
                              Corporate (Mon–Fri)
                            </button>
                            <button
                              type="button"
                              onClick={() => applyHoursPreset("allweek")}
                              className="px-2 py-0.5 bg-gray-100 hover:bg-[#E8DED0] text-gray-700 rounded text-[11px] transition-colors cursor-pointer"
                            >
                              7 Days Open
                            </button>
                          </div>
                        </div>

                        {/* Days Table (Mon-Sun) */}
                        {specifyHours && (
                          <div className="space-y-2.5 pt-1">
                            {daysSchedule.map((day, idx) => (
                              <div
                                key={day.key}
                                className="flex flex-wrap items-center gap-3 text-xs"
                              >
                                {/* Day Name */}
                                <span className="w-10 font-medium text-gray-800">
                                  {day.key}
                                </span>

                                {/* Open / Closed Dropdown Pill */}
                                <div className="relative">
                                  <select
                                    value={day.isOpen ? "open" : "closed"}
                                    onChange={(e) =>
                                      handleDayOpenChange(idx, e.target.value === "open")
                                    }
                                    className={`appearance-none pl-3.5 pr-7 py-1 rounded-full text-xs font-medium border cursor-pointer focus:outline-none transition-colors ${
                                      day.isOpen
                                        ? "bg-white text-gray-800 border-gray-300 shadow-2xs hover:border-gray-400"
                                        : "bg-gray-100 text-gray-500 border-gray-200"
                                    }`}
                                  >
                                    <option value="open">Open</option>
                                    <option value="closed">Closed</option>
                                  </select>
                                  <ChevronDown className="w-3 h-3 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>

                                {/* Start & End Time Inputs */}
                                {day.isOpen ? (
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="time"
                                      value={day.openTime}
                                      onChange={(e) =>
                                        handleDayTimeChange(idx, "openTime", e.target.value)
                                      }
                                      className="px-2.5 py-1 bg-white border border-gray-300 rounded-md font-mono text-xs text-center text-gray-800 focus:outline-none focus:border-[#BFA076] shadow-2xs"
                                    />
                                    <span className="text-gray-500 font-sans text-xs">to</span>
                                    <input
                                      type="time"
                                      value={day.closeTime}
                                      onChange={(e) =>
                                        handleDayTimeChange(idx, "closeTime", e.target.value)
                                      }
                                      className="px-2.5 py-1 bg-white border border-gray-300 rounded-md font-mono text-xs text-center text-gray-800 focus:outline-none focus:border-[#BFA076] shadow-2xs"
                                    />
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2">
                                    <div className="px-3.5 py-1 bg-gray-100/90 border border-gray-200 rounded-md font-mono text-xs text-gray-400 select-none">
                                      — : —
                                    </div>
                                    <span className="text-gray-400 font-sans text-xs">to</span>
                                    <div className="px-3.5 py-1 bg-gray-100/90 border border-gray-200 rounded-md font-mono text-xs text-gray-400 select-none">
                                      — : —
                                    </div>
                                  </div>
                                )}

                                {/* Apply to All link on Monday */}
                                {day.key === "Mon" && (
                                  <button
                                    type="button"
                                    onClick={handleApplyMondayToAll}
                                    className="text-xs text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-0.5 ml-2 cursor-pointer font-medium"
                                  >
                                    ↓ Apply to All
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Action buttons below table */}
                        <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                          <button
                            type="button"
                            onClick={handleSaveBusinessHours}
                            disabled={isSavingHours}
                            className="px-4 py-1.5 rounded-full text-xs font-medium bg-[#E8DED0] hover:bg-[#BFA076] hover:text-white text-gray-800 transition-all cursor-pointer shadow-2xs disabled:opacity-50 flex items-center gap-1.5"
                          >
                            {isSavingHours ? (
                              "Saving to Supabase..."
                            ) : hoursSavedFeedback ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span>{hoursSavedFeedback}</span>
                              </>
                            ) : (
                              "Save for 1 profile"
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={handleCancelHours}
                            className="text-xs text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Row 3: Holiday Hours */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 items-start">
                      <div className="md:col-span-3 space-y-0.5">
                        <label className="text-xs font-semibold text-gray-800 block">
                          Hours (Holiday Hours)
                        </label>
                        <span className="text-[11px] text-gray-400 font-mono block">
                          hours
                        </span>
                      </div>
                      <div className="md:col-span-9">
                        <input
                          type="text"
                          value={holidayHours}
                          onChange={(e) => {
                            setHolidayHours(e.target.value);
                            syncWorkingHours(daysSchedule, { holidayHours: e.target.value });
                          }}
                          placeholder="Click to add (e.g. Closed on Diwali, Holi & National Holidays)"
                          className="w-full max-w-md p-2 bg-[#FAF7F2] border border-[#D7C7B2] rounded text-xs text-[#121212] placeholder-gray-400 focus:outline-none focus:border-[#BFA076]"
                        />
                      </div>
                    </div>

                    {/* Row 4: Temporarily Closed */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 items-start">
                      <div className="md:col-span-3 space-y-0.5">
                        <label className="text-xs font-semibold text-gray-800 block">
                          Hours (Temporarily Closed)
                        </label>
                        <span className="text-[11px] text-gray-400 font-mono block">
                          hours
                        </span>
                      </div>
                      <div className="md:col-span-9 space-y-2">
                        <label className="inline-flex items-center gap-2 text-xs font-medium text-gray-800 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={isTemporarilyClosed}
                            onChange={(e) => {
                              setIsTemporarilyClosed(e.target.checked);
                              syncWorkingHours(daysSchedule, { isTemporarilyClosed: e.target.checked });
                            }}
                            className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4 cursor-pointer"
                          />
                          <span className={isTemporarilyClosed ? "font-semibold text-amber-800" : "text-gray-600"}>
                            {isTemporarilyClosed ? "Studio marked as Temporarily Closed" : "Click to mark as Temporarily Closed"}
                          </span>
                        </label>
                        {isTemporarilyClosed && (
                          <input
                            type="text"
                            value={tempClosedReason}
                            onChange={(e) => {
                              setTempClosedReason(e.target.value);
                              syncWorkingHours(daysSchedule, { tempClosedReason: e.target.value });
                            }}
                            placeholder="Reason (e.g. On-location royal wedding assignment in Udaipur)"
                            className="w-full max-w-md p-2 bg-[#FAF7F2] border border-amber-300 rounded text-xs text-[#121212] focus:outline-none"
                          />
                        )}
                      </div>
                    </div>

                    {/* Row 5: Additional Hours Text */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 items-start">
                      <div className="md:col-span-3 space-y-0.5">
                        <label className="text-xs font-semibold text-gray-800 block">
                          Additional Hours Text
                        </label>
                        <span className="text-[11px] text-gray-400 font-mono block">
                          additionalHoursText
                        </span>
                      </div>
                      <div className="md:col-span-9">
                        <input
                          type="text"
                          value={additionalHoursText}
                          onChange={(e) => {
                            setAdditionalHoursText(e.target.value);
                            syncWorkingHours(daysSchedule, { additionalHoursText: e.target.value });
                          }}
                          placeholder="Click to add (e.g. Sunday by Appointment • 24/7 on call for destination shoots)"
                          className="w-full max-w-md p-2 bg-[#FAF7F2] border border-[#D7C7B2] rounded text-xs text-[#121212] placeholder-gray-400 focus:outline-none focus:border-[#BFA076]"
                        />
                      </div>
                    </div>

                    {/* Live Preview & Direct Override Footer */}
                    <div className="bg-[#FAF7F2]/80 px-6 py-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-[#7B6955] font-semibold flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#BFA076]" />
                            <span>Live Working Hours String (Public Facing & Schema)</span>
                          </p>
                          <p className="text-xs text-[#121212] font-medium font-sans mt-0.5">
                            {studioSettings.working_hours}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowManualHoursOverride(!showManualHoursOverride)}
                          className="text-[11px] text-[#7B6955] hover:text-[#121212] underline cursor-pointer text-left sm:text-right"
                        >
                          {showManualHoursOverride ? "Hide raw text edit" : "Edit raw string directly"}
                        </button>
                      </div>

                      {showManualHoursOverride && (
                        <div className="mt-3 pt-3 border-t border-[#E8DED0]">
                          <label className="block text-[11px] text-[#7B6955] mb-1 font-medium">
                            Manual Raw Override:
                          </label>
                          <input
                            type="text"
                            value={studioSettings.working_hours}
                            onChange={(e) =>
                              setStudioSettings({ ...studioSettings, working_hours: e.target.value })
                            }
                            className="w-full p-2 bg-white border border-[#D7C7B2] text-xs font-mono text-[#121212] focus:outline-none focus:border-[#BFA076]"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Card 5: Social Media Profiles */}
              <div className="bg-white p-6 sm:p-8 border border-[#E8DED0] space-y-6 shadow-xs">
                <div className="border-b border-[#F3ECE1] pb-3">
                  <h4 className="font-serif text-lg text-[#121212] flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-[#BFA076]" />
                    <span>Social Media Channels</span>
                  </h4>
                  <p className="text-xs text-[#7B6955]">
                    Links embedded across the header, footer, and schema structured data.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                      Instagram Profile URL
                    </label>
                    <input
                      type="url"
                      value={studioSettings.instagram_url}
                      onChange={(e) =>
                        setStudioSettings({ ...studioSettings, instagram_url: e.target.value })
                      }
                      placeholder="https://instagram.com/..."
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-xs text-[#121212] focus:outline-none focus:border-[#BFA076]"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                      Facebook Page URL
                    </label>
                    <input
                      type="url"
                      value={studioSettings.facebook_url}
                      onChange={(e) =>
                        setStudioSettings({ ...studioSettings, facebook_url: e.target.value })
                      }
                      placeholder="https://facebook.com/..."
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-xs text-[#121212] focus:outline-none focus:border-[#BFA076]"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                      Pinterest Board URL
                    </label>
                    <input
                      type="url"
                      value={studioSettings.pinterest_url}
                      onChange={(e) =>
                        setStudioSettings({ ...studioSettings, pinterest_url: e.target.value })
                      }
                      placeholder="https://pinterest.com/..."
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-xs text-[#121212] focus:outline-none focus:border-[#BFA076]"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                      500px Portfolio URL
                    </label>
                    <input
                      type="url"
                      value={studioSettings.five_hundred_px_url}
                      onChange={(e) =>
                        setStudioSettings({ ...studioSettings, five_hundred_px_url: e.target.value })
                      }
                      placeholder="https://500px.com/..."
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-xs text-[#121212] focus:outline-none focus:border-[#BFA076]"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                      YouTube Channel URL
                    </label>
                    <input
                      type="url"
                      value={studioSettings.youtube_url}
                      onChange={(e) =>
                        setStudioSettings({ ...studioSettings, youtube_url: e.target.value })
                      }
                      placeholder="https://youtube.com/..."
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-xs text-[#121212] focus:outline-none focus:border-[#BFA076]"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="flex items-center justify-end gap-4 pt-4 border-t border-[#E8DED0]">
                <button
                  type="submit"
                  disabled={isSavingSettings}
                  className="px-8 py-3 bg-[#121212] text-white hover:bg-[#2C2C2C] disabled:bg-gray-400 uppercase tracking-widest text-xs font-medium cursor-pointer transition-colors flex items-center gap-2 shadow-sm"
                >
                  {isSavingSettings ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Saving to Supabase...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-[#BFA076]" />
                      <span>Save All Studio Settings</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 5: Photographer Profile & About Me */}
        {activeTab === "photographer" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl text-[#121212]">
                  Photographer Profile & Biography
                </h3>
                <p className="text-xs text-[#7B6955]">
                  Update your artist biography, quotes, portrait photograph, and experience milestones.
                </p>
              </div>

              <button
                onClick={handleSaveStudioSettings}
                disabled={isSavingSettings}
                className="px-6 py-2.5 bg-[#121212] text-white hover:bg-[#2C2C2C] disabled:bg-gray-400 uppercase tracking-widest text-xs font-medium cursor-pointer transition-colors flex items-center justify-center gap-2 self-start sm:self-auto"
              >
                {isSavingSettings ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#BFA076]" />
                    <span>Save Photographer Profile</span>
                  </>
                )}
              </button>
            </div>

            {settingsFeedback && (
              <div
                className={`p-4 border text-xs sm:text-sm flex items-center justify-between rounded-xs ${
                  settingsFeedback.type === "success"
                    ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                    : "bg-red-50 border-red-300 text-red-900"
                }`}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{settingsFeedback.message}</span>
                </div>
                <button
                  onClick={() => setSettingsFeedback(null)}
                  className="text-xs font-bold px-2 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}

            <form onSubmit={handleSaveStudioSettings} className="space-y-8">
              {/* Card 1: Artist Identity & Quote */}
              <div className="bg-white p-6 sm:p-8 border border-[#E8DED0] space-y-6 shadow-xs">
                <div className="border-b border-[#F3ECE1] pb-3">
                  <h4 className="font-serif text-lg text-[#121212] flex items-center gap-2">
                    <User className="w-4 h-4 text-[#BFA076]" />
                    <span>Artist Identity & Signature Quote</span>
                  </h4>
                  <p className="text-xs text-[#7B6955]">
                    Artist credentials featured across the &quot;Meet the Photographer&quot; section.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                  <div>
                    <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                      Photographer Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={studioSettings.photographer_name}
                      onChange={(e) =>
                        setStudioSettings({ ...studioSettings, photographer_name: e.target.value })
                      }
                      placeholder="e.g. Kishor Prem"
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] focus:outline-none focus:border-[#BFA076]"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                      Professional Role / Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={studioSettings.photographer_role}
                      onChange={(e) =>
                        setStudioSettings({ ...studioSettings, photographer_role: e.target.value })
                      }
                      placeholder="e.g. Principal Photographer & Visual Artist"
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] focus:outline-none focus:border-[#BFA076]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                      Artist Quote / Guiding Philosophy
                    </label>
                    <input
                      type="text"
                      value={studioSettings.photographer_quote}
                      onChange={(e) =>
                        setStudioSettings({ ...studioSettings, photographer_quote: e.target.value })
                      }
                      placeholder="“Light reveals what exists; emotion reveals what truly matters.”"
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] focus:outline-none focus:border-[#BFA076]"
                    />
                  </div>
                </div>

                {/* Portrait Photo Picker with Upload */}
                <div className="space-y-3 pt-2 border-t border-[#F3ECE1]">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="block uppercase tracking-wider text-[#7B6955] font-medium text-xs">
                        Photographer Portrait Photo
                      </label>
                      <p className="text-[11px] text-[#7B6955]">
                        The featured vertical portrait shown in the &quot;About Me&quot; biography module.
                      </p>
                    </div>

                    <div className="flex items-center gap-1 bg-[#FAF7F2] p-0.5 border border-[#D7C7B2] rounded-xs text-[11px]">
                      <button
                        type="button"
                        onClick={() => setUploadModePortrait("file")}
                        className={`px-2.5 py-1 transition-all cursor-pointer flex items-center gap-1.5 ${
                          uploadModePortrait === "file"
                            ? "bg-[#121212] text-white font-medium"
                            : "text-[#7B6955] hover:text-[#121212]"
                        }`}
                      >
                        <Upload className="w-3 h-3" />
                        <span>Upload File</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setUploadModePortrait("url")}
                        className={`px-2.5 py-1 transition-all cursor-pointer flex items-center gap-1.5 ${
                          uploadModePortrait === "url"
                            ? "bg-[#121212] text-white font-medium"
                            : "text-[#7B6955] hover:text-[#121212]"
                        }`}
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Paste URL</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
                    <div className="relative aspect-[3/4] w-36 bg-[#121212] rounded-xs overflow-hidden border border-[#D7C7B2]">
                      {studioSettings.photographer_portrait_url ? (
                        <Image
                          src={studioSettings.photographer_portrait_url}
                          alt="Photographer Portrait Preview"
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-xs text-[#FAF7F2]/60">
                          No portrait
                        </div>
                      )}
                    </div>

                    <div className="sm:col-span-3">
                      {uploadModePortrait === "file" ? (
                        <div className="space-y-2">
                          <label className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-[#D7C7B2] hover:border-[#BFA076] bg-[#FAF7F2] hover:bg-[#F3ECE1] cursor-pointer transition-colors text-center group rounded-xs">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) handlePortraitUpload(f);
                              }}
                            />
                            {isUploadingPortrait ? (
                              <div className="flex flex-col items-center gap-2 text-[#7B6955] py-2">
                                <RefreshCw className="w-5 h-5 animate-spin text-[#BFA076]" />
                                <span className="font-medium text-xs">Uploading portrait to Supabase Storage...</span>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center gap-1.5">
                                <FileUp className="w-5 h-5 text-[#BFA076]" />
                                <p className="text-xs font-medium text-[#121212]">
                                  Click to upload portrait photo
                                </p>
                                <p className="text-[10px] text-[#7B6955]">
                                  Recommended: 3:4 aspect ratio portrait, high resolution
                                </p>
                              </div>
                            )}
                          </label>

                          {uploadErrorPortrait && (
                            <p className="text-[11px] text-red-600 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3 shrink-0" />
                              {uploadErrorPortrait}
                            </p>
                          )}
                        </div>
                      ) : (
                        <input
                          type="url"
                          value={studioSettings.photographer_portrait_url}
                          onChange={(e) =>
                            setStudioSettings({ ...studioSettings, photographer_portrait_url: e.target.value })
                          }
                          placeholder="https://..."
                          className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-xs text-[#121212] focus:outline-none focus:border-[#BFA076]"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Biography Paragraphs */}
              <div className="bg-white p-6 sm:p-8 border border-[#E8DED0] space-y-6 shadow-xs">
                <div className="border-b border-[#F3ECE1] pb-3">
                  <h4 className="font-serif text-lg text-[#121212] flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#BFA076]" />
                    <span>Biography Content</span>
                  </h4>
                  <p className="text-xs text-[#7B6955]">
                    Tell your story, artistic journey, and photographic methodology.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                      Biography Paragraph 1 *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={studioSettings.photographer_bio_1}
                      onChange={(e) =>
                        setStudioSettings({ ...studioSettings, photographer_bio_1: e.target.value })
                      }
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] focus:outline-none focus:border-[#BFA076] resize-none"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                      Biography Paragraph 2 *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={studioSettings.photographer_bio_2}
                      onChange={(e) =>
                        setStudioSettings({ ...studioSettings, photographer_bio_2: e.target.value })
                      }
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] focus:outline-none focus:border-[#BFA076] resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Card 3: Experience & Trust Stats */}
              <div className="bg-white p-6 sm:p-8 border border-[#E8DED0] space-y-6 shadow-xs">
                <div className="border-b border-[#F3ECE1] pb-3">
                  <h4 className="font-serif text-lg text-[#121212] flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#BFA076]" />
                    <span>Experience & Trust Statistics</span>
                  </h4>
                  <p className="text-xs text-[#7B6955]">
                    Key proof metrics displayed on both the hero trust bar and the about section.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                      Years of Craft
                    </label>
                    <input
                      type="text"
                      value={studioSettings.stats_experience}
                      onChange={(e) =>
                        setStudioSettings({ ...studioSettings, stats_experience: e.target.value })
                      }
                      placeholder="12+ Years"
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] focus:outline-none focus:border-[#BFA076]"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                      Sessions Completed
                    </label>
                    <input
                      type="text"
                      value={studioSettings.stats_sessions}
                      onChange={(e) =>
                        setStudioSettings({ ...studioSettings, stats_sessions: e.target.value })
                      }
                      placeholder="650+"
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] focus:outline-none focus:border-[#BFA076]"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                      Weddings Documented
                    </label>
                    <input
                      type="text"
                      value={studioSettings.stats_weddings}
                      onChange={(e) =>
                        setStudioSettings({ ...studioSettings, stats_weddings: e.target.value })
                      }
                      placeholder="180+"
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] focus:outline-none focus:border-[#BFA076]"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                      Editorial Features / Awards
                    </label>
                    <input
                      type="text"
                      value={studioSettings.stats_features}
                      onChange={(e) =>
                        setStudioSettings({ ...studioSettings, stats_features: e.target.value })
                      }
                      placeholder="24+"
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] focus:outline-none focus:border-[#BFA076]"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="flex items-center justify-end gap-4 pt-4 border-t border-[#E8DED0]">
                <button
                  type="submit"
                  disabled={isSavingSettings}
                  className="px-8 py-3 bg-[#121212] text-white hover:bg-[#2C2C2C] disabled:bg-gray-400 uppercase tracking-widest text-xs font-medium cursor-pointer transition-colors flex items-center gap-2 shadow-sm"
                >
                  {isSavingSettings ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Saving to Supabase...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-[#BFA076]" />
                      <span>Save Photographer Profile</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB: Blog Manager */}
        {activeTab === "blog" && <AdminBlogManager />}

        {/* TAB: FAQ Manager */}
        {activeTab === "faq" && <AdminFaqManager />}

        {/* TAB: Supabase Details */}
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
                    Connected cloud database powering live inquiries, gallery, services, blog, and FAQs.
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
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono">
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
                  <div className="p-2 bg-white border border-[#E8DED0]">
                    ✓ public.blog_posts
                  </div>
                  <div className="p-2 bg-white border border-[#E8DED0]">
                    ✓ public.faqs
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
