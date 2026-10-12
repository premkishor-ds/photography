"use client";

import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Calendar,
  User,
  Camera,
  AlertCircle,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/Icons";
import { CONTACT_DETAILS, SERVICES } from "@/data/photographyData";
import { useLanguage } from "@/context/LanguageContext";
import { useStudioSettings } from "@/context/StudioContext";
import GoogleStaticMap from "@/components/GoogleStaticMap";

interface ContactAndBookingProps {
  preselectedService?: string;
  headingLevel?: "h1" | "h2";
}

interface ServiceItemData {
  id: string;
  title: string;
  min_duration_minutes?: number;
  duration_type?: "fixed" | "selectable";
  supported_durations?: number[];
  starting_price_inr?: number;
  duration?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  durationMinutes: number;
  appointmentTime: string;
  preferredDate: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  durationMinutes?: string;
  appointmentTime?: string;
  preferredDate?: string;
  message?: string;
}

interface SlotItem {
  time: string;
  displayTime: string;
  endTime: string;
  displayEndTime: string;
  available: boolean;
  reason?: string;
  travelBuffer: {
    blockedStartTime: string;
    blockedEndTime: string;
  };
}

export default function ContactAndBooking({
  preselectedService = "",
  headingLevel = "h2",
}: ContactAndBookingProps) {
  const { t, language } = useLanguage();
  const { settings } = useStudioSettings();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    durationMinutes: 60, // Mandatory minimum: 60 minutes
    appointmentTime: "10:00",
    preferredDate: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<any>(null);

  const [serverError, setServerError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [availableServices, setAvailableServices] = useState<ServiceItemData[]>(
    SERVICES.map((s) => ({
      id: s.id,
      title: s.title,
      min_duration_minutes: 60,
      duration_type: "selectable",
      supported_durations: [60, 120, 180, 240],
      duration: s.duration,
    }))
  );

  // Time slots & availability state
  const [slots, setSlots] = useState<SlotItem[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [nextAvailable, setNextAvailable] = useState<{
    date: string;
    time: string;
    displayTime: string;
  } | null>(null);

  // Today's date string YYYY-MM-DD
  const todayStr = new Date().toISOString().split("T")[0];

  // Dynamically load services with their duration settings from Supabase
  useEffect(() => {
    let isMounted = true;
    async function loadDynamicServices() {
      try {
        const res = await fetch("/api/admin/services");
        const data = await res.json();
        if (isMounted && data.success && Array.isArray(data.services) && data.services.length > 0) {
          setAvailableServices(
            data.services.map((s: any) => ({
              id: s.id,
              title: s.title,
              min_duration_minutes: Math.max(60, s.min_duration_minutes || 60),
              duration_type: s.duration_type || "selectable",
              supported_durations: Array.isArray(s.supported_durations) && s.supported_durations.length > 0
                ? s.supported_durations.filter((d: number) => d >= 60)
                : [60, 120, 180, 240],
              starting_price_inr: s.starting_price_inr,
              duration: s.duration,
            }))
          );
        }
      } catch (err) {
        // Fallback to default photography services
      }
    }
    loadDynamicServices();
    return () => {
      isMounted = false;
    };
  }, []);

  // Update selected service if parent triggers it or from URL param
  useEffect(() => {
    if (preselectedService) {
      handleServiceChange(preselectedService);
    } else if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const serviceParam = urlParams.get("service");
      if (serviceParam) {
        handleServiceChange(serviceParam);
      }
    }
  }, [preselectedService, availableServices]);

  // Match selected service configuration
  const currentServiceMeta = availableServices.find(
    (s) =>
      s.title.toLowerCase() === formData.service.toLowerCase() ||
      s.id.toLowerCase() === formData.service.toLowerCase()
  );

  const isFixedDuration = currentServiceMeta?.duration_type === "fixed";
  const serviceMinMinutes = Math.max(60, currentServiceMeta?.min_duration_minutes || 60);

  // Supported duration options (at least 60 minutes)
  const supportedDurations: number[] = isFixedDuration
    ? [serviceMinMinutes]
    : (currentServiceMeta?.supported_durations && currentServiceMeta.supported_durations.length > 0
        ? currentServiceMeta.supported_durations.filter((d) => d >= serviceMinMinutes)
        : [60, 120, 180, 240].filter((d) => d >= serviceMinMinutes));

  // Handler when service changes
  const handleServiceChange = (serviceTitle: string) => {
    const matched = availableServices.find(
      (s) =>
        s.title.toLowerCase() === serviceTitle.toLowerCase() ||
        s.id.toLowerCase() === serviceTitle.toLowerCase()
    );

    const minDur = Math.max(60, matched?.min_duration_minutes || 60);

    setFormData((prev) => {
      let targetDur = prev.durationMinutes;
      if (matched?.duration_type === "fixed") {
        targetDur = minDur;
      } else if (targetDur < minDur) {
        targetDur = minDur;
      }
      return {
        ...prev,
        service: serviceTitle,
        durationMinutes: targetDur,
      };
    });

    if (errors.service) {
      setErrors((prev) => ({ ...prev, service: undefined }));
    }
  };

  // Fetch available slots whenever date, service, or duration changes
  useEffect(() => {
    if (!formData.preferredDate) {
      setSlots([]);
      setNextAvailable(null);
      return;
    }

    let isSubscribed = true;
    setIsLoadingSlots(true);
    setSlotsError(null);

    const params = new URLSearchParams({
      date: formData.preferredDate,
      service: formData.service || "General Photography",
      duration: String(Math.max(60, formData.durationMinutes || 60)),
    });

    fetch(`/api/booking/availability?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (!isSubscribed) return;
        if (data.success) {
          setSlots(data.slots || []);
          setNextAvailable(data.nextAvailable || null);

          // If current appointment time is not among available slots, auto-select first available
          const availableList = (data.slots || []).filter((s: SlotItem) => s.available);
          if (availableList.length > 0) {
            const hasCurrent = availableList.some((s: SlotItem) => s.time === formData.appointmentTime);
            if (!hasCurrent) {
              setFormData((prev) => ({ ...prev, appointmentTime: availableList[0].time }));
            }
          }
        } else {
          setSlotsError(data.error || "Failed to load available times.");
          setSlots([]);
        }
      })
      .catch((err) => {
        if (isSubscribed) {
          setSlotsError("Could not retrieve availability. Please try again.");
          setSlots([]);
        }
      })
      .finally(() => {
        if (isSubscribed) setIsLoadingSlots(false);
      });

    return () => {
      isSubscribed = false;
    };
  }, [formData.preferredDate, formData.service, formData.durationMinutes]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (formData.phone.trim().length < 7) {
      newErrors.phone = "Please enter a valid contact phone number.";
    }

    if (!formData.service) {
      newErrors.service = "Please select a photography service.";
    }

    // MANDATORY RULE: Duration must be >= 60 minutes
    if (!formData.durationMinutes || formData.durationMinutes < 60) {
      newErrors.durationMinutes = "Minimum booking duration is 60 minutes (1 hour).";
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = "Please choose a preferred date.";
    }

    if (!formData.appointmentTime) {
      newErrors.appointmentTime = "Please select an available appointment time slot.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please include a short message or project notes.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleDurationSelect = (minutes: number) => {
    if (minutes < 60) return; // Strict frontend safeguard
    setFormData((prev) => ({ ...prev, durationMinutes: minutes }));
    if (errors.durationMinutes) {
      setErrors((prev) => ({ ...prev, durationMinutes: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setServerError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          durationMinutes: Math.max(60, formData.durationMinutes),
          website_url: honeypot,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSubmitted(true);
        setSubmittedBooking(result.data || {
          service: formData.service,
          preferredDate: formData.preferredDate,
          appointmentTime: formData.appointmentTime,
          durationMinutes: formData.durationMinutes,
        });
      } else {
        // Overlap or validation error from backend
        setServerError(
          result.error ||
          result.message ||
          "Failed to reserve appointment. Please pick an alternative time slot or contact us directly."
        );
      }
    } catch (err: any) {
      console.error("Submission error:", err);
      setServerError("Network error while reserving slot. Please try again or WhatsApp our studio.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      durationMinutes: 60,
      appointmentTime: "10:00",
      preferredDate: "",
      message: "",
    });
    setErrors({});
    setIsSubmitted(false);
    setSubmittedBooking(null);
  };

  const studioEmail = settings.email || CONTACT_DETAILS.email;
  const studioPhone = settings.phone || CONTACT_DETAILS.phone;
  const studioWhatsapp = settings.whatsapp_number || CONTACT_DETAILS.whatsappNumber;
  const studioAddress = settings.address || CONTACT_DETAILS.address;
  const studioHindiAddress = settings.hindi_address || CONTACT_DETAILS.hindiAddress;
  const studioWorkingHours = settings.working_hours || CONTACT_DETAILS.workingHours;

  const whatsappMessage = encodeURIComponent(
    `Hello! I'd like to inquire about booking a ${formData.durationMinutes / 60}-hour photography session with ${
      settings.studio_name || "Your Photography"
    }.${formData.service ? ` Service: ${formData.service}` : ""}${
      formData.preferredDate ? ` Date: ${formData.preferredDate}` : ""
    }`
  );
  const whatsappUrl = `https://wa.me/${studioWhatsapp.replace(/[^0-9]/g, "")}?text=${whatsappMessage}`;

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#FAF7F2] text-[#121212] border-t border-[#E8DED0]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-[#7B6955] font-sans font-medium mb-3">
            {t("contact.badge", "Inquire & Reserve")}
          </p>
          {headingLevel === "h1" ? (
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#121212]">
              {t("contact.title", "Let's Capture Your Story.")}
            </h1>
          ) : (
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#121212]">
              {t("contact.title", "Let's Capture Your Story.")}
            </h2>
          )}
          <p className="mt-4 text-sm sm:text-base text-[#554837] font-light max-w-xl mx-auto leading-relaxed">
            {t(
              "contact.desc",
              "Select your desired photography service and booking duration. Every appointment includes a dedicated 1-hour travel buffer before and after your session."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Contact Info & Policies */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="font-serif text-2xl text-[#121212]">
                {t("contact.studioTitle", "Studio & Booking Inquiries")}
              </h3>
              <p className="text-sm text-[#554837] leading-relaxed font-light">
                {t(
                  "contact.studioDesc",
                  "We accept a limited number of commissions each year to give every client our undivided artistic dedication. Reserve your slot online or message us directly via WhatsApp."
                )}
              </p>

              {/* Travel Buffer Policy Callout */}
              <div className="p-4 bg-[#F4EDE2] border border-[#DFCBB5] space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#121212]">
                  <ShieldCheck className="w-4 h-4 text-[#BFA076]" />
                  <span>Protected Travel Buffers</span>
                </div>
                <p className="text-xs text-[#554837] leading-relaxed font-light">
                  To ensure punctual arrival, equipment staging, and travel between locations, our studio automatically reserves <strong>1 hour before</strong> and <strong>1 hour after</strong> every booking. Appointments must be at least <strong>60 minutes</strong>.
                </p>
                <div className="pt-1.5 text-[11px] font-mono text-[#7B6955] bg-white/70 p-2 border border-[#E3D4C1]">
                  Blocked Window = Start Time - 60m ➔ Start Time + Duration + 60m
                </div>
              </div>

              {/* Direct Info List */}
              <div className="space-y-4 pt-1">
                <div className="flex items-start gap-4 p-4 bg-white border border-[#F3ECE1]">
                  <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E8DED0] flex items-center justify-center shrink-0 text-[#121212]">
                    <Mail className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-[#7B6955] font-sans">
                      {t("contact.email", "Email Address")}
                    </p>
                    <a
                      href={`mailto:${studioEmail}`}
                      className="text-sm font-medium text-[#121212] hover:underline"
                    >
                      {studioEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white border border-[#F3ECE1]">
                  <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E8DED0] flex items-center justify-center shrink-0 text-[#121212]">
                    <Phone className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-[#7B6955] font-sans">
                      {t("contact.phone", "Phone Number")}
                    </p>
                    <a
                      href={`tel:${studioPhone.replace(/[^0-9+]/g, "")}`}
                      className="text-sm font-medium text-[#121212] hover:underline"
                    >
                      {studioPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white border border-[#F3ECE1]">
                  <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E8DED0] flex items-center justify-center shrink-0 text-[#121212]">
                    <MapPin className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-[#7B6955] font-sans">
                      {t("contact.location", "Studio Location")}
                    </p>
                    <p className="text-xs sm:text-sm text-[#121212] font-medium">
                      {language === "hi" && studioHindiAddress
                        ? studioHindiAddress
                        : studioAddress}
                    </p>
                    {language !== "hi" && studioHindiAddress && (
                      <p className="text-xs text-[#7B6955] font-sans mt-1">
                        {studioHindiAddress}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white border border-[#F3ECE1]">
                  <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E8DED0] flex items-center justify-center shrink-0 text-[#121212]">
                    <Clock className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-[#7B6955] font-sans">
                      {t("contact.hours", "Studio Hours")}
                    </p>
                    <p className="text-xs sm:text-sm text-[#121212]">
                      {studioWorkingHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Prominent WhatsApp Button */}
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-medium text-xs sm:text-sm uppercase tracking-[0.18em] transition-all shadow-md group"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>{t("contact.whatsappBtn", "Chat Directly on WhatsApp")}</span>
              </a>
              <p className="text-[11px] text-center text-[#7B6955] mt-2 font-sans">
                {t("contact.whatsappResponse", "Quick responses typically within 1-2 hours during business hours.")}
              </p>
            </div>

            {/* Google Static Map */}
            <div className="pt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider text-[#7B6955] font-sans font-medium flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#BFA076]" />
                  <span>{t("contact.mapHeader", "Studio Google Map & Location")}</span>
                </span>
                <span className="text-[10px] text-[#BFA076] font-mono">
                  {settings.map_latitude || 26.8285}° N, {settings.map_longitude || 75.8654}° E
                </span>
              </div>
              <GoogleStaticMap
                latitude={settings.map_latitude || 26.8285}
                longitude={settings.map_longitude || 75.8654}
                zoom={settings.map_zoom || 15}
                apiKey={settings.google_maps_api_key}
                title={settings.studio_name || "Your Photography Flagship Studio"}
                address={language === "hi" && studioHindiAddress ? studioHindiAddress : studioAddress}
                plusCode="RV2J+5PQ"
                heightClass="h-[260px] sm:h-[300px]"
                showOverlayCard={false}
              />
              <div className="pt-1 flex items-center justify-between text-[11px] text-[#7B6955]">
                <span>Plus Code: <strong className="text-[#121212]">RV2J+5PQ</strong></span>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${settings.map_latitude || 26.8285},${settings.map_longitude || 75.8654}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-wider text-[#121212] hover:text-[#BFA076] font-medium inline-flex items-center gap-1 hover:underline"
                >
                  <span>Open in Google Maps →</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Booking Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 border border-[#E8DED0] shadow-sm">
            {isSubmitted ? (
              <div className="py-10 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 stroke-[1.5]" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-serif text-2xl sm:text-3xl text-[#121212]">
                    {t("contact.form.thankYou", "Booking Request Reserved")}, {formData.name}!
                  </h4>
                  <p className="text-sm text-[#554837] max-w-md mx-auto leading-relaxed">
                    Your appointment has been successfully recorded in our booking calendar. Travel buffers before and after have been blocked to guarantee our full availability.
                  </p>
                </div>

                {/* Booking Summary Box */}
                {submittedBooking && (
                  <div className="max-w-md mx-auto p-5 bg-[#FAF7F2] border border-[#E8DED0] text-left text-xs space-y-2.5">
                    <div className="flex justify-between border-b border-[#E8DED0] pb-2">
                      <span className="text-[#7B6955] uppercase tracking-wider">Service:</span>
                      <strong className="text-[#121212]">{submittedBooking.service || formData.service}</strong>
                    </div>
                    <div className="flex justify-between border-b border-[#E8DED0] pb-2">
                      <span className="text-[#7B6955] uppercase tracking-wider">Date & Time:</span>
                      <strong className="text-[#121212]">
                        {submittedBooking.preferredDate || formData.preferredDate} at {submittedBooking.appointmentTime || formData.appointmentTime}
                      </strong>
                    </div>
                    <div className="flex justify-between border-b border-[#E8DED0] pb-2">
                      <span className="text-[#7B6955] uppercase tracking-wider">Duration:</span>
                      <strong className="text-[#121212]">
                        {(submittedBooking.durationMinutes || formData.durationMinutes) / 60} Hour(s) ({submittedBooking.durationMinutes || formData.durationMinutes} min)
                      </strong>
                    </div>
                    {submittedBooking.blockedStartTime && submittedBooking.blockedEndTime && (
                      <div className="flex justify-between pt-1 text-[11px] text-[#7B6955]">
                        <span>Protected Travel Window:</span>
                        <span className="font-mono font-medium text-[#121212]">
                          {submittedBooking.blockedStartTime} – {submittedBooking.blockedEndTime}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 text-xs uppercase tracking-widest bg-[#25D366] text-white hover:bg-[#20ba5a] transition-colors"
                  >
                    {t("contact.form.followUp", "Confirm on WhatsApp")}
                  </a>
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 text-xs uppercase tracking-widest border border-[#121212] text-[#121212] hover:bg-[#121212] hover:text-white transition-colors cursor-pointer"
                  >
                    {t("contact.form.sendAnother", "Book Another Session")}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Honeypot field for bot protection */}
                <input
                  type="text"
                  name="website_url"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                {serverError && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Booking Conflict or Validation Error</p>
                      <p className="mt-0.5 text-xs text-red-700">{serverError}</p>
                    </div>
                  </div>
                )}

                <div className="border-b border-[#F3ECE1] pb-4 mb-2">
                  <h4 className="font-serif text-2xl text-[#121212]">
                    {t("contact.formTitle", "Photography Booking & Reservation")}
                  </h4>
                  <p className="text-xs text-[#7B6955] mt-1 font-sans">
                    {t("contact.formSubtitle", "Choose your service, duration (minimum 60 minutes), and verified open time slot.")}
                  </p>
                </div>

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs uppercase tracking-wider text-[#121212] font-sans font-medium mb-2"
                    >
                      {t("contact.form.name", "Your Name")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={language === "hi" ? "उदा. राज कुमार" : "e.g. Raj Kumar"}
                      aria-invalid={errors.name ? true : false}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={`w-full px-4 py-3 bg-[#FAF7F2] border text-sm text-[#121212] placeholder-[#9E8870] focus:outline-none focus:bg-white transition-colors ${
                        errors.name
                          ? "border-red-500"
                          : "border-[#D7C7B2] focus:border-[#121212]"
                      }`}
                    />
                    {errors.name && (
                      <p id="name-error" role="alert" className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-sans">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs uppercase tracking-wider text-[#121212] font-sans font-medium mb-2"
                    >
                      {t("contact.form.email", "Email Address")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="rajkumar@example.com"
                      aria-invalid={errors.email ? true : false}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className={`w-full px-4 py-3 bg-[#FAF7F2] border text-sm text-[#121212] placeholder-[#9E8870] focus:outline-none focus:bg-white transition-colors ${
                        errors.email
                          ? "border-red-500"
                          : "border-[#D7C7B2] focus:border-[#121212]"
                      }`}
                    />
                    {errors.email && (
                      <p id="email-error" role="alert" className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-sans">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone & Service Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs uppercase tracking-wider text-[#121212] font-sans font-medium mb-2"
                    >
                      {t("contact.form.phone", "Phone Number")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98290 12345"
                      aria-invalid={errors.phone ? true : false}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                      className={`w-full px-4 py-3 bg-[#FAF7F2] border text-sm text-[#121212] placeholder-[#9E8870] focus:outline-none focus:bg-white transition-colors ${
                        errors.phone
                          ? "border-red-500"
                          : "border-[#D7C7B2] focus:border-[#121212]"
                      }`}
                    />
                    {errors.phone && (
                      <p id="phone-error" role="alert" className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-sans">
                        <AlertCircle className="w-3 h-3" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Photography Service */}
                  <div>
                    <label
                      htmlFor="service"
                      className="block text-xs uppercase tracking-wider text-[#121212] font-sans font-medium mb-2"
                    >
                      {t("contact.form.service", "Photography Service")} <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={(e) => handleServiceChange(e.target.value)}
                      aria-invalid={errors.service ? true : false}
                      aria-describedby={errors.service ? "service-error" : undefined}
                      className={`w-full px-4 py-3 bg-[#FAF7F2] border text-sm text-[#121212] focus:outline-none focus:bg-white transition-colors ${
                        errors.service
                          ? "border-red-500"
                          : "border-[#D7C7B2] focus:border-[#121212]"
                      }`}
                    >
                      <option value="">{t("contact.form.selectService", "Select a service category")}</option>
                      {availableServices.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title} {s.min_duration_minutes ? `(Min ${s.min_duration_minutes / 60}h)` : ""}
                        </option>
                      ))}
                      <option value="Custom Photography Project">Custom Photography Session</option>
                    </select>
                    {errors.service && (
                      <p id="service-error" role="alert" className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-sans">
                        <AlertCircle className="w-3 h-3" />
                        {errors.service}
                      </p>
                    )}
                  </div>
                </div>

                {/* SECTION 2: BOOKING DURATION (Mandatory Minimum 60 min) */}
                <div className="p-4 bg-[#FAF7F2] border border-[#E8DED0] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <label className="text-xs uppercase tracking-wider text-[#121212] font-sans font-medium flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#BFA076]" />
                      <span>Booking Duration (Mandatory Minimum: 60 min)</span>
                    </label>
                    <span className="text-[11px] text-[#7B6955] font-sans">
                      Selected: <strong className="text-[#121212]">{formData.durationMinutes / 60} Hour(s) ({formData.durationMinutes} min)</strong>
                    </span>
                  </div>

                  {isFixedDuration ? (
                    <div className="p-3 bg-white border border-[#D7C7B2] flex items-center justify-between text-xs">
                      <div>
                        <span className="font-medium text-[#121212]">Fixed Service Duration:</span>{" "}
                        <span className="text-[#554837]">{serviceMinMinutes / 60} Hours ({serviceMinMinutes} minutes)</span>
                      </div>
                      <span className="px-2 py-0.5 bg-[#FAF7F2] border border-[#E8DED0] text-[10px] text-[#7B6955] uppercase tracking-wider">
                        Non-adjustable
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {supportedDurations.map((dur) => {
                          const isSelected = formData.durationMinutes === dur;
                          const hours = dur / 60;
                          return (
                            <button
                              key={dur}
                              type="button"
                              onClick={() => handleDurationSelect(dur)}
                              className={`py-2.5 px-3 text-xs font-medium border text-center transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-[#121212] text-white border-[#121212] shadow-xs"
                                  : "bg-white text-[#554837] border-[#D7C7B2] hover:border-[#121212] hover:text-[#121212]"
                              }`}
                            >
                              <div className="font-sans font-semibold">
                                {hours === 1 ? "1 Hour" : `${hours} Hours`}
                              </div>
                              <div className={`text-[10px] ${isSelected ? "text-white/80" : "text-[#7B6955]"}`}>
                                {dur === 60 ? "Minimum" : `${dur} min`}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Custom duration option if supported */}
                      <div className="flex items-center gap-2 pt-1 text-xs text-[#7B6955]">
                        <span>Need a custom duration?</span>
                        <select
                          value={formData.durationMinutes}
                          onChange={(e) => handleDurationSelect(Number(e.target.value))}
                          className="px-2 py-1 bg-white border border-[#D7C7B2] text-xs text-[#121212] cursor-pointer"
                        >
                          <option value={60}>60 minutes (1 Hour - Minimum)</option>
                          <option value={120}>120 minutes (2 Hours)</option>
                          <option value={180}>180 minutes (3 Hours)</option>
                          <option value={240}>240 minutes (4 Hours)</option>
                          <option value={300}>300 minutes (5 Hours)</option>
                          <option value={360}>360 minutes (6 Hours)</option>
                          <option value={480}>480 minutes (8 Hours Full Day)</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {errors.durationMinutes && (
                    <p role="alert" className="text-xs text-red-600 mt-1 flex items-center gap-1 font-sans">
                      <AlertCircle className="w-3 h-3" />
                      {errors.durationMinutes}
                    </p>
                  )}
                </div>

                {/* Preferred Date */}
                <div>
                  <label
                    htmlFor="preferredDate"
                    className="block text-xs uppercase tracking-wider text-[#121212] font-sans font-medium mb-2"
                  >
                    {t("contact.form.date", "Preferred Session Date")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    min={todayStr}
                    aria-invalid={errors.preferredDate ? true : false}
                    aria-describedby={errors.preferredDate ? "date-error" : undefined}
                    className={`w-full px-4 py-3 bg-[#FAF7F2] border text-sm text-[#121212] focus:outline-none focus:bg-white transition-colors ${
                      errors.preferredDate
                        ? "border-red-500"
                        : "border-[#D7C7B2] focus:border-[#121212]"
                    }`}
                  />
                  {errors.preferredDate && (
                    <p id="date-error" role="alert" className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-sans">
                      <AlertCircle className="w-3 h-3" />
                      {errors.preferredDate}
                    </p>
                  )}
                </div>

                {/* SECTION 4: TIME SLOT PICKER WITH TRAVEL BUFFER DISPLAY */}
                {formData.preferredDate && (
                  <div className="p-4 bg-white border border-[#E8DED0] space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-[#F3ECE1] pb-2">
                      <label className="text-xs uppercase tracking-wider text-[#121212] font-sans font-medium flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#BFA076]" />
                        <span>Available Appointment Time Slots</span>
                      </label>
                      <span className="text-[11px] text-[#7B6955]">
                        Includes 1-hr travel buffers before & after
                      </span>
                    </div>

                    {isLoadingSlots ? (
                      <div className="py-8 text-center text-xs text-[#7B6955] flex flex-col items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-[#121212] border-t-transparent rounded-full animate-spin" />
                        <span>Checking studio calendar & travel buffer availability...</span>
                      </div>
                    ) : slotsError ? (
                      <p className="text-xs text-red-600 p-2 bg-red-50">{slotsError}</p>
                    ) : slots.length === 0 ? (
                      <div className="py-6 text-center text-xs text-[#7B6955] space-y-2">
                        <p>No available slots found for the selected date.</p>
                        {nextAvailable && (
                          <div className="pt-2">
                            <button
                              type="button"
                              onClick={() => {
                                setFormData((prev) => ({
                                  ...prev,
                                  preferredDate: nextAvailable.date,
                                  appointmentTime: nextAvailable.time,
                                }));
                              }}
                              className="px-4 py-2 bg-[#121212] text-[#FAF7F2] hover:bg-[#2C2C2C] text-xs uppercase tracking-wider cursor-pointer inline-flex items-center gap-1.5"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-[#BFA076]" />
                              <span>Switch to Next Available: {nextAvailable.date} ({nextAvailable.displayTime})</span>
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                          {slots.map((slot) => {
                            const isSelected = formData.appointmentTime === slot.time && slot.available;
                            return (
                              <button
                                key={slot.time}
                                type="button"
                                disabled={!slot.available}
                                onClick={() => {
                                  if (slot.available) {
                                    setFormData((prev) => ({ ...prev, appointmentTime: slot.time }));
                                    if (errors.appointmentTime) {
                                      setErrors((prev) => ({ ...prev, appointmentTime: undefined }));
                                    }
                                  }
                                }}
                                className={`p-2.5 text-left border rounded-xs transition-all flex flex-col justify-between ${
                                  !slot.available
                                    ? "bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed text-gray-500"
                                    : isSelected
                                    ? "bg-[#121212] text-white border-[#121212] ring-1 ring-[#121212]"
                                    : "bg-[#FAF7F2] text-[#121212] border-[#D7C7B2] hover:border-[#121212] hover:bg-white cursor-pointer"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-sans font-semibold text-xs">
                                    {slot.displayTime}
                                  </span>
                                  {!slot.available && (
                                    <span className="text-[9px] uppercase tracking-wider bg-red-100 text-red-700 px-1 py-0.2 rounded-xs">
                                      Conflict
                                    </span>
                                  )}
                                  {isSelected && (
                                    <span className="text-[9px] uppercase tracking-wider bg-white text-[#121212] px-1 py-0.2 font-bold rounded-xs">
                                      Selected
                                    </span>
                                  )}
                                </div>
                                <div className={`text-[10px] mt-1 ${isSelected ? "text-white/80" : "text-[#7B6955]"}`}>
                                  Session: {slot.displayTime} – {slot.displayEndTime}
                                </div>
                                <div className={`text-[9px] font-mono mt-0.5 ${isSelected ? "text-[#BFA076]" : "text-[#9E8870]"}`}>
                                  Buffer: {slot.travelBuffer.blockedStartTime} – {slot.travelBuffer.blockedEndTime}
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        {/* Notice about travel buffers */}
                        <div className="p-2.5 bg-[#FAF7F2] border border-[#E8DED0] text-[11px] text-[#554837] flex items-center justify-between">
                          <span>
                            Selected Slot: <strong>{formData.appointmentTime || "None"}</strong> for <strong>{formData.durationMinutes / 60} Hour(s)</strong>
                          </span>
                          <span className="text-[#7B6955]">
                            ±1h Travel Buffer Reserved
                          </span>
                        </div>
                      </div>
                    )}

                    {errors.appointmentTime && (
                      <p role="alert" className="text-xs text-red-600 mt-1 flex items-center gap-1 font-sans">
                        <AlertCircle className="w-3 h-3" />
                        {errors.appointmentTime}
                      </p>
                    )}
                  </div>
                )}

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs uppercase tracking-wider text-[#121212] font-sans font-medium mb-2"
                  >
                    {t("contact.form.message", "Message / Project Details")} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t(
                      "contact.form.messagePlaceholder",
                      "Tell us about your event, location, creative vision, or any special requests..."
                    )}
                    aria-invalid={errors.message ? true : false}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={`w-full px-4 py-3 bg-[#FAF7F2] border text-sm text-[#121212] placeholder-[#9E8870] focus:outline-none focus:bg-white transition-colors resize-none ${
                      errors.message
                        ? "border-red-500"
                        : "border-[#D7C7B2] focus:border-[#121212]"
                    }`}
                  />
                  {errors.message && (
                    <p id="message-error" role="alert" className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-sans">
                      <AlertCircle className="w-3 h-3" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 text-xs uppercase tracking-[0.22em] font-medium bg-[#121212] text-[#FAF7F2] hover:bg-[#2C2C2C] disabled:bg-gray-400 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    {isSubmitting ? (
                      <span>{t("contact.form.submitting", "Validating & Reserving Slot...")}</span>
                    ) : (
                      <>
                        <span>{t("contact.form.submit", "Confirm Booking (Min 60 min)")}</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-center text-[#7B6955] mt-3 font-sans">
                    {t(
                      "contact.form.privacyNote",
                      "We treat your details with absolute privacy. Every confirmed booking blocks the calendar with required travel buffers."
                    )}
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
