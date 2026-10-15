"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Calendar,
  AlertCircle,
  ShieldCheck,
  Sparkles,
  KeyRound,
  Check,
  X,
  RotateCw,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/Icons";
import { CONTACT_DETAILS, SERVICES, getLocalizedService } from "@/data/photographyData";
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

  // Email OTP Authentication & Verification State
  const [verificationToken, setVerificationToken] = useState<string | null>(null);
  const [verifiedEmail, setVerifiedEmail] = useState<string | null>(null);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [otpSuccess, setOtpSuccess] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [debugOtp, setDebugOtp] = useState<string | null>(null);
  const digitInputsRef = useRef<(HTMLInputElement | null)[]>([]);

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
      } catch {
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
      const durationParam = urlParams.get("duration");
      const addonsParam = urlParams.get("addons");
      const estimateParam = urlParams.get("estimate");

      if (serviceParam) {
        handleServiceChange(serviceParam);
      }

      if (estimateParam || durationParam || addonsParam) {
        setFormData((prev) => {
          if (prev.message) return prev;
          const summaryParts = [];
          if (estimateParam) summaryParts.push(`• Estimated Budget: ${estimateParam}`);
          if (durationParam) summaryParts.push(`• Requested Scope: ${durationParam}`);
          if (addonsParam) summaryParts.push(`• Selected Add-ons: ${addonsParam}`);
          const customMessage = `Bespoke Package Inquiry:\n${summaryParts.join("\n")}\n\nPlease share your calendar availability and complete proposal details.`;
          return {
            ...prev,
            message: customMessage,
          };
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      .catch(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.preferredDate, formData.service, formData.durationMinutes]);

  // Resend OTP countdown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const interval = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const trimmedName = formData.name.trim();

    const testNames = new Set([
      "test", "testing", "tester", "admin", "fake", "dummy", "user",
      "asdf", "qwerty", "none", "null", "undefined", "xyz", "abc"
    ]);

    if (!trimmedName) {
      newErrors.name = "Full name is required.";
    } else if (trimmedName.length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    } else if (trimmedName.length > 80) {
      newErrors.name = "Name cannot exceed 80 characters.";
    } else if (testNames.has(trimmedName.toLowerCase())) {
      newErrors.name = "Please enter your genuine full name (not a test placeholder).";
    } else if (!/^[\p{L}\s.'\-]+$/u.test(trimmedName)) {
      newErrors.name = "Name should contain letters, spaces, and standard punctuation only.";
    }

    const trimmedEmail = formData.email.trim().toLowerCase();
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!trimmedEmail) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(trimmedEmail)) {
      newErrors.email = "Please enter a valid, active email address.";
    }

    const digitsOnly = formData.phone.replace(/\D/g, "");
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (digitsOnly.length < 8 || digitsOnly.length > 15) {
      newErrors.phone = "Please enter a valid phone number (8–15 digits).";
    } else if (
      /^(\d)\1+$/.test(digitsOnly) ||
      digitsOnly === "12345678" ||
      digitsOnly === "123456789"
    ) {
      newErrors.phone = "Please enter a genuine contact phone number.";
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
    } else {
      const selDate = new Date(formData.preferredDate);
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      if (isNaN(selDate.getTime()) || selDate < now) {
        newErrors.preferredDate = "Please choose today or a future date.";
      }
    }

    if (!formData.appointmentTime) {
      newErrors.appointmentTime = "Please select an available appointment time slot.";
    }

    const trimmedMsg = formData.message.trim();
    if (!trimmedMsg) {
      newErrors.message = "Please include a project or session description.";
    } else if (trimmedMsg.length < 15) {
      newErrors.message = "Message must be at least 15 characters.";
    } else {
      // Anti-gibberish / spam check (e.g. "ef g ewrtg ery55rt3yt 35y4 353324235435t")
      const words = trimmedMsg.split(/\s+/).filter(Boolean);
      const lettersOnly = trimmedMsg.replace(/[^a-zA-Z]/g, "").toLowerCase();
      const vowels = lettersOnly.replace(/[^aeiou]/g, "").length;
      const vowelRatio = lettersOnly.length > 0 ? vowels / lettersOnly.length : 0;

      const hasAlphanumericMash = words.some((w) => /[a-zA-Z]\d|\d[a-zA-Z]/.test(w));
      const singleCharWordCount = words.filter((w) => w.length === 1).length;
      const hasUnnaturalConsonantCluster = /[bcdfghjklmnpqrstvwxyz]{5,}/i.test(lettersOnly);

      if (hasAlphanumericMash) {
        newErrors.message =
          "Please provide real project details rather than random test text or numbers.";
      } else if (singleCharWordCount >= 2 && words.length <= 6) {
        newErrors.message =
          "Please describe your session needs with complete words.";
      } else if (lettersOnly.length > 15 && vowelRatio < 0.2 && hasUnnaturalConsonantCluster) {
        newErrors.message =
          "Please share a meaningful description of your shoot rather than random characters.";
      } else if (words.length < 3 && trimmedMsg.length < 25) {
        newErrors.message =
          "Please provide a few more details (e.g., event type, venue, or creative vision).";
      }
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

    // If email changes after verification, invalidate verification so user must re-verify
    if (name === "email") {
      if (verifiedEmail && value.trim().toLowerCase() !== verifiedEmail) {
        setVerifiedEmail(null);
        setVerificationToken(null);
        setOtpSuccess(null);
      }
    }

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

  // Dispatch 6-digit OTP code to the client's email
  const sendOtp = async (targetEmail?: string) => {
    const emailToSend = (targetEmail || formData.email).trim().toLowerCase();
    if (!emailToSend) return;

    setIsSendingOtp(true);
    setOtpError(null);

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailToSend, name: formData.name.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOtpSuccess(`Verification code dispatched to ${emailToSend}`);
        setDebugOtp(data.debugOtp || null);
        setResendCooldown(45);
        setOtpDigits(["", "", "", "", "", ""]);
        setTimeout(() => {
          digitInputsRef.current[0]?.focus();
        }, 150);
      } else {
        setOtpError(data.error || "Failed to dispatch verification code. Please try again.");
      }
    } catch {
      setOtpError("Network error while sending verification code. Please check your connection.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleOtpDigitChange = (index: number, val: string) => {
    const cleaned = val.replace(/\D/g, "");
    if (!cleaned && val !== "") return;

    const char = cleaned.slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = char;
    setOtpDigits(newDigits);
    setOtpError(null);

    if (char && index < 5) {
      digitInputsRef.current[index + 1]?.focus();
    }

    // Auto verify if all 6 digits entered
    if (newDigits.every((d) => d.length === 1)) {
      const fullCode = newDigits.join("");
      verifyOtpCode(fullCode);
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      digitInputsRef.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;

    const newDigits = ["", "", "", "", "", ""];
    for (let i = 0; i < pasted.length; i++) {
      newDigits[i] = pasted[i];
    }
    setOtpDigits(newDigits);

    if (pasted.length === 6) {
      verifyOtpCode(pasted);
    } else {
      digitInputsRef.current[Math.min(5, pasted.length)]?.focus();
    }
  };

  const fillDebugCode = (code: string) => {
    const chars = code.split("").slice(0, 6);
    setOtpDigits(chars);
    verifyOtpCode(code);
  };

  const verifyOtpCode = async (codeToVerify?: string) => {
    const code = (codeToVerify || otpDigits.join("")).trim();
    if (code.length !== 6) {
      setOtpError("Please enter all 6 digits of your verification code.");
      return;
    }

    setIsVerifyingOtp(true);
    setOtpError(null);

    try {
      const email = formData.email.trim().toLowerCase();
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.verificationToken) {
        setVerificationToken(data.verificationToken);
        setVerifiedEmail(data.verifiedEmail || email);
        setIsOtpModalOpen(false);

        // Execute the booking reservation with verified token
        await executeBookingSubmission(data.verificationToken);
      } else {
        setOtpError(data.error || "Incorrect verification code. Please check and try again.");
      }
    } catch {
      setOtpError("Network error while validating code. Please try again.");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const executeBookingSubmission = async (token: string) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          durationMinutes: Math.max(60, formData.durationMinutes),
          verificationToken: token,
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
          verifiedEmail: true,
        });
      } else {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const normalizedEmail = formData.email.trim().toLowerCase();
    const isVerified =
      verifiedEmail === normalizedEmail && verificationToken !== null;

    if (!isVerified) {
      // Open OTP modal and dispatch verification code
      setIsOtpModalOpen(true);
      setOtpError(null);
      sendOtp(normalizedEmail);
      return;
    }

    // Already verified! Submit directly
    await executeBookingSubmission(verificationToken);
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
  const studioWorkingHours = language === "hi"
    ? (settings.hindi_working_hours || "सोमवार – शनिवार: प्रातः 9:30 – सायं 7:00 IST (रविवार केवल पूर्व अपॉइंटमेंट द्वारा)")
    : (settings.working_hours || CONTACT_DETAILS.workingHours);

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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Studio & Inquiries Card */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 border border-[#E8DED0] shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Studio Info Header */}
              <div className="border-b border-[#F3ECE1] pb-4">
                <h3 className="font-serif text-2xl text-[#121212]">
                  {t("contact.studioTitle", "Studio & Booking Inquiries")}
                </h3>
                <p className="text-xs text-[#7B6955] mt-1 font-sans leading-relaxed">
                  {t(
                    "contact.studioDesc",
                    "We accept a limited number of commissions each year to give every client our undivided artistic dedication. Reach out below or message us directly via WhatsApp."
                  )}
                </p>
              </div>

              {/* Cleaned Up Travel Buffer Policy Callout */}
              <div className="p-4 bg-[#FAF7F2] border border-[#E8DED0] space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#121212]">
                    <ShieldCheck className="w-4 h-4 text-[#BFA076]" />
                    <span>{language === "hi" ? "सुरक्षित यात्रा बफर" : "Protected Travel Buffers"}</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-[#7B6955] font-sans font-medium px-2 py-0.5 bg-white border border-[#E8DED0]">
                    {language === "hi" ? "शून्य-ओवरलैप नीति" : "Zero-Overlap Policy"}
                  </span>
                </div>
                <p className="text-xs text-[#554837] leading-relaxed font-light">
                  {language === "hi" ? (
                    <>
                      समय पर आगमन, उपकरण तैयारी और लोकेशन के बीच आवागमन सुनिश्चित करने के लिए, हमारा स्टूडियो प्रत्येक बुकिंग से पहले <strong>1 घंटा</strong> और बाद में <strong>1 घंटा</strong> स्वतः आरक्षित करता है। सत्र कम से कम <strong>60 मिनट</strong> का होना चाहिए।
                    </>
                  ) : (
                    <>
                      To ensure punctual arrival, equipment staging, and travel between locations, our studio automatically reserves <strong>1 hour before</strong> and <strong>1 hour after</strong> every booking. Appointments must be at least <strong>60 minutes</strong>.
                    </>
                  )}
                </p>
                {/* Visual Timeline Buffer Bar */}
                <div className="grid grid-cols-3 gap-2 pt-1 text-center text-[10px] font-sans">
                  <div className="py-1.5 px-2 bg-white border border-[#E8DED0] text-[#7B6955]">
                    <span className="block font-semibold text-[#121212]">{language === "hi" ? "-60 मिनट" : "-60 Min"}</span>
                    <span className="text-[9px]">{language === "hi" ? "आगमन एवं तैयारी" : "Arrival & Prep"}</span>
                  </div>
                  <div className="py-1.5 px-2 bg-[#121212] text-[#FAF7F2] border border-[#121212]">
                    <span className="block font-semibold text-white">{language === "hi" ? "आपका सत्र" : "Your Session"}</span>
                    <span className="text-[9px] text-[#D7C7B2]">{language === "hi" ? "60+ मिनट शूट" : "60+ Min Shoot"}</span>
                  </div>
                  <div className="py-1.5 px-2 bg-white border border-[#E8DED0] text-[#7B6955]">
                    <span className="block font-semibold text-[#121212]">{language === "hi" ? "+60 मिनट" : "+60 Min"}</span>
                    <span className="text-[9px]">{language === "hi" ? "समापन एवं बफर" : "Wrap & Buffer"}</span>
                  </div>
                </div>
              </div>

              {/* Direct Info 2x2 Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-0.5">
                {/* Email */}
                <div className="flex items-start gap-3 p-3 bg-[#FAF7F2] border border-[#E8DED0] transition-colors hover:border-[#121212]">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#E8DED0] flex items-center justify-center shrink-0 text-[#121212]">
                    <Mail className="w-3.5 h-3.5 stroke-[1.5]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wider text-[#7B6955] font-sans font-medium">
                      {t("contact.email", "Email Address")}
                    </p>
                    <a
                      href={`mailto:${studioEmail}`}
                      className="text-xs font-medium text-[#121212] hover:underline truncate block"
                      title={studioEmail}
                    >
                      {studioEmail}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3 p-3 bg-[#FAF7F2] border border-[#E8DED0] transition-colors hover:border-[#121212]">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#E8DED0] flex items-center justify-center shrink-0 text-[#121212]">
                    <Phone className="w-3.5 h-3.5 stroke-[1.5]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wider text-[#7B6955] font-sans font-medium">
                      {t("contact.phone", "Phone Number")}
                    </p>
                    <a
                      href={`tel:${studioPhone.replace(/[^0-9+]/g, "")}`}
                      className="text-xs font-medium text-[#121212] hover:underline truncate block"
                      title={studioPhone}
                    >
                      {studioPhone}
                    </a>
                  </div>
                </div>

                {/* Studio Location */}
                <div className="flex items-start gap-3 p-3 bg-[#FAF7F2] border border-[#E8DED0] transition-colors hover:border-[#121212]">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#E8DED0] flex items-center justify-center shrink-0 text-[#121212]">
                    <MapPin className="w-3.5 h-3.5 stroke-[1.5]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wider text-[#7B6955] font-sans font-medium">
                      {t("contact.location", "Studio Location")}
                    </p>
                    <p className="text-xs text-[#121212] font-medium line-clamp-2 leading-tight">
                      {language === "hi" && studioHindiAddress
                        ? studioHindiAddress
                        : studioAddress}
                    </p>
                  </div>
                </div>

                {/* Studio Hours */}
                <div className="flex items-start gap-3 p-3 bg-[#FAF7F2] border border-[#E8DED0] transition-colors hover:border-[#121212]">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#E8DED0] flex items-center justify-center shrink-0 text-[#121212]">
                    <Clock className="w-3.5 h-3.5 stroke-[1.5]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wider text-[#7B6955] font-sans font-medium">
                      {t("contact.hours", "Studio Hours")}
                    </p>
                    <p className="text-xs text-[#121212] line-clamp-2 leading-tight">
                      {studioWorkingHours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Prominent WhatsApp Button */}
              <div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-medium text-xs uppercase tracking-[0.18em] transition-all shadow-xs group"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                  <span>{t("contact.whatsappBtn", "Chat Directly on WhatsApp")}</span>
                </a>
                <p className="text-[11px] text-center text-[#7B6955] mt-1.5 font-sans">
                  {t("contact.whatsappResponse", "Quick responses typically within 1-2 hours during business hours.")}
                </p>
              </div>

              {/* Google Static Map */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="uppercase tracking-wider text-[#7B6955] font-sans font-medium flex items-center gap-1.5">
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
                  heightClass="h-[170px] sm:h-[190px]"
                  showOverlayCard={false}
                />
                <div className="flex items-center justify-between text-[11px] text-[#7B6955] pt-0.5">
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
          </div>

          {/* Right Column: Interactive Booking Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 border border-[#E8DED0] shadow-xs flex flex-col justify-between">
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
                    {language === "hi"
                      ? "आपकी अपॉइंटमेंट हमारे बुकिंग कैलेंडर में सफलतापूर्वक दर्ज कर ली गई है। हमारी पूर्ण उपलब्धता सुनिश्चित करने के लिए पहले और बाद के यात्रा बफर सुरक्षित कर लिए गए हैं।"
                      : "Your appointment has been successfully recorded in our booking calendar. Travel buffers before and after have been blocked to guarantee our full availability."}
                  </p>
                </div>

                {/* Booking Summary Box */}
                {submittedBooking && (
                  <div className="max-w-md mx-auto p-5 bg-[#FAF7F2] border border-[#E8DED0] text-left text-xs space-y-2.5">
                    <div className="flex justify-between border-b border-[#E8DED0] pb-2">
                      <span className="text-[#7B6955] uppercase tracking-wider">
                        {language === "hi" ? "सेवा:" : "Service:"}
                      </span>
                      <strong className="text-[#121212]">{submittedBooking.service || formData.service}</strong>
                    </div>
                    <div className="flex justify-between border-b border-[#E8DED0] pb-2">
                      <span className="text-[#7B6955] uppercase tracking-wider">
                        {language === "hi" ? "तिथि एवं समय:" : "Date & Time:"}
                      </span>
                      <strong className="text-[#121212]">
                        {submittedBooking.preferredDate || formData.preferredDate} {language === "hi" ? "को" : "at"} {submittedBooking.appointmentTime || formData.appointmentTime}
                      </strong>
                    </div>
                    <div className="flex justify-between border-b border-[#E8DED0] pb-2">
                      <span className="text-[#7B6955] uppercase tracking-wider">
                        {language === "hi" ? "अवधि:" : "Duration:"}
                      </span>
                      <strong className="text-[#121212]">
                        {(submittedBooking.durationMinutes || formData.durationMinutes) / 60} {language === "hi" ? "घंटा/घंटे" : "Hour(s)"} ({(submittedBooking.durationMinutes || formData.durationMinutes)} {language === "hi" ? "मिनट" : "min"})
                      </strong>
                    </div>
                    {submittedBooking.blockedStartTime && submittedBooking.blockedEndTime && (
                      <div className="flex justify-between pt-1 text-[11px] text-[#7B6955]">
                        <span>{language === "hi" ? "सुरक्षित यात्रा विंडो:" : "Protected Travel Window:"}</span>
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
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="email"
                        className="block text-xs uppercase tracking-wider text-[#121212] font-sans font-medium"
                      >
                        {t("contact.form.email", "Email Address")} <span className="text-red-500">*</span>
                      </label>
                      {verifiedEmail === formData.email.trim().toLowerCase() && verificationToken ? (
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 inline-flex items-center gap-1 font-sans">
                          <Check className="w-3 h-3 text-emerald-600" />
                          Verified
                        </span>
                      ) : (
                        <span className="text-[10px] text-[#7B6955] inline-flex items-center gap-1 font-sans">
                          <KeyRound className="w-2.5 h-2.5 text-[#BFA076]" />
                          OTP Required
                        </span>
                      )}
                    </div>
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
                          : verifiedEmail === formData.email.trim().toLowerCase() && verificationToken
                          ? "border-emerald-500 focus:border-emerald-600"
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
                      {availableServices.map((s) => {
                        const localized = getLocalizedService(s as any, language);
                        return (
                          <option key={s.id} value={s.title}>
                            {language === "hi" ? localized.title : s.title} {s.min_duration_minutes ? `(${language === "hi" ? "न्यूनतम " : "Min "}${s.min_duration_minutes / 60}${language === "hi" ? " घंटे" : "h"})` : ""}
                          </option>
                        );
                      })}
                      <option value="Custom Photography Project">
                        {language === "hi" ? "कस्टम फोटोग्राफी सत्र" : "Custom Photography Session"}
                      </option>
                    </select>
                    {errors.service && (
                      <p id="service-error" role="alert" className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-sans">
                        <AlertCircle className="w-3 h-3" />
                        {errors.service}
                      </p>
                    )}
                  </div>
                </div>

                {/* SECTION 2: BOOKING DURATION (Consolidated) */}
                <div className="p-4 bg-[#FAF7F2] border border-[#E8DED0] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <label className="text-xs uppercase tracking-wider text-[#121212] font-sans font-medium flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#BFA076]" />
                      <span>{language === "hi" ? "बुकिंग अवधि" : "Booking Duration"} ({language === "hi" ? "न्यूनतम: 60 मिनट" : "Min: 60 min"})</span>
                    </label>
                    <span className="text-[11px] text-[#7B6955] font-sans">
                      {language === "hi" ? "चयनित: " : "Selected: "}<strong className="text-[#121212]">{formData.durationMinutes / 60} {language === "hi" ? "घंटा/घंटे" : "Hour(s)"} ({formData.durationMinutes} {language === "hi" ? "मिनट" : "min"})</strong>
                    </span>
                  </div>

                  {isFixedDuration ? (
                    <div className="p-3 bg-white border border-[#D7C7B2] flex items-center justify-between text-xs">
                      <div>
                        <span className="font-medium text-[#121212]">{language === "hi" ? "निर्धारित सेवा अवधि:" : "Fixed Service Duration:"}</span>{" "}
                        <span className="text-[#554837]">{serviceMinMinutes / 60} {language === "hi" ? "घंटे" : "Hours"} ({serviceMinMinutes} {language === "hi" ? "मिनट" : "minutes"})</span>
                      </div>
                      <span className="px-2 py-0.5 bg-[#FAF7F2] border border-[#E8DED0] text-[10px] text-[#7B6955] uppercase tracking-wider">
                        {language === "hi" ? "अपरिवर्तनीय" : "Non-adjustable"}
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {/* Standard Duration Buttons */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {supportedDurations.map((dur) => {
                          const isSelected = formData.durationMinutes === dur;
                          const hours = dur / 60;
                          return (
                            <button
                              key={dur}
                              type="button"
                              onClick={() => handleDurationSelect(dur)}
                              className={`py-2 px-2 text-xs font-medium border text-center transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-[#121212] text-white border-[#121212] shadow-xs"
                                  : "bg-white text-[#554837] border-[#D7C7B2] hover:border-[#121212] hover:text-[#121212]"
                              }`}
                            >
                              <div className="font-sans font-semibold">
                                {hours === 1 ? (language === "hi" ? "1 घंटा" : "1 Hour") : `${hours} ${language === "hi" ? "घंटे" : "Hours"}`}
                              </div>
                              <div className={`text-[10px] ${isSelected ? "text-white/80" : "text-[#7B6955]"}`}>
                                {dur === 60 ? (language === "hi" ? "न्यूनतम" : "Minimum") : `${dur} ${language === "hi" ? "मिनट" : "min"}`}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Extended / Custom Duration Selector */}
                      <div className="flex items-center justify-between gap-2 pt-0.5 text-xs text-[#7B6955]">
                        <span className="text-[11px] font-sans">{language === "hi" ? "क्या आपको अतिरिक्त समय चाहिए?" : "Need extended coverage?"}</span>
                        <select
                          value={formData.durationMinutes > 240 ? formData.durationMinutes : ""}
                          onChange={(e) => {
                            if (e.target.value) {
                              handleDurationSelect(Number(e.target.value));
                            }
                          }}
                          className={`px-3 py-1.5 text-xs border cursor-pointer transition-colors ${
                            formData.durationMinutes > 240
                              ? "bg-[#121212] text-white border-[#121212] font-medium"
                              : "bg-white text-[#554837] border-[#D7C7B2] hover:border-[#121212]"
                          }`}
                        >
                          <option value="" disabled={formData.durationMinutes > 240}>
                            {formData.durationMinutes > 240
                              ? `${formData.durationMinutes / 60} ${language === "hi" ? "घंटे" : "Hours"} (${formData.durationMinutes} min)`
                              : (language === "hi" ? "कस्टम (5 से 8 घंटे)..." : "Custom (5h – 8h)...")}
                          </option>
                          <option value={300} className="bg-white text-[#121212]">{language === "hi" ? "5 घंटे (300 मिनट)" : "5 Hours (300 min)"}</option>
                          <option value={360} className="bg-white text-[#121212]">{language === "hi" ? "6 घंटे (360 मिनट)" : "6 Hours (360 min)"}</option>
                          <option value={480} className="bg-white text-[#121212]">{language === "hi" ? "8 घंटे (पूरा दिन)" : "8 Hours (Full Day)"}</option>
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
                        <span>{language === "hi" ? "उपलब्ध अपॉइंटमेंट समय स्लॉट" : "Available Appointment Time Slots"}</span>
                      </label>
                      <span className="text-[11px] text-[#7B6955]">
                        {language === "hi" ? "आने-जाने के लिए 1 घंटे का बफर समय शामिल है" : "Includes 1-hr travel buffers before & after"}
                      </span>
                    </div>

                    {isLoadingSlots ? (
                      <div className="py-8 text-center text-xs text-[#7B6955] flex flex-col items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-[#121212] border-t-transparent rounded-full animate-spin" />
                        <span>{language === "hi" ? "स्टूडियो कैलेंडर और समय की उपलब्धता जांची जा रही है..." : "Checking studio calendar & travel buffer availability..."}</span>
                      </div>
                    ) : slotsError ? (
                      <p className="text-xs text-red-600 p-2 bg-red-50">{slotsError}</p>
                    ) : slots.length === 0 ? (
                      <div className="py-6 text-center text-xs text-[#7B6955] space-y-2">
                        <p>{language === "hi" ? "चयनित तिथि के लिए कोई उपलब्ध स्लॉट नहीं मिला।" : "No available slots found for the selected date."}</p>
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
                              <span>{language === "hi" ? "अगले उपलब्ध स्लॉट पर जाएं:" : "Switch to Next Available:"} {nextAvailable.date} ({nextAvailable.displayTime})</span>
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
                                      {language === "hi" ? "आरक्षित" : "Conflict"}
                                    </span>
                                  )}
                                  {isSelected && (
                                    <span className="text-[9px] uppercase tracking-wider bg-white text-[#121212] px-1 py-0.2 font-bold rounded-xs">
                                      {language === "hi" ? "चयनित" : "Selected"}
                                    </span>
                                  )}
                                </div>
                                <div className={`text-[10px] mt-1 ${isSelected ? "text-white/80" : "text-[#7B6955]"}`}>
                                  {language === "hi" ? "सत्र: " : "Session: "}{slot.displayTime} – {slot.displayEndTime}
                                </div>
                                <div className={`text-[9px] font-mono mt-0.5 ${isSelected ? "text-[#BFA076]" : "text-[#9E8870]"}`}>
                                  {language === "hi" ? "बफर: " : "Buffer: "}{slot.travelBuffer.blockedStartTime} – {slot.travelBuffer.blockedEndTime}
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        {/* Notice about travel buffers */}
                        <div className="p-2.5 bg-[#FAF7F2] border border-[#E8DED0] text-[11px] text-[#554837] flex items-center justify-between">
                          <span>
                            {language === "hi" ? "चयनित स्लॉट: " : "Selected Slot: "}<strong>{formData.appointmentTime || (language === "hi" ? "कोई नहीं" : "None")}</strong> {language === "hi" ? "अवधि " : "for "}<strong>{formData.durationMinutes / 60} {language === "hi" ? "घंटा/घंटे" : "Hour(s)"}</strong>
                          </span>
                          <span className="text-[#7B6955]">
                            {language === "hi" ? "±1 घंटा यात्रा बफर आरक्षित" : "±1h Travel Buffer Reserved"}
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
                    disabled={isSubmitting || isSendingOtp}
                    className="w-full py-4 text-xs uppercase tracking-[0.22em] font-medium bg-[#121212] text-[#FAF7F2] hover:bg-[#2C2C2C] disabled:bg-gray-400 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    {isSubmitting ? (
                      <span>{t("contact.form.submitting", "Validating & Reserving Slot...")}</span>
                    ) : isSendingOtp ? (
                      <span className="inline-flex items-center gap-2">
                        <RotateCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending Verification Code...</span>
                      </span>
                    ) : verifiedEmail === formData.email.trim().toLowerCase() && verificationToken ? (
                      <>
                        <span>{t("contact.form.submitVerified", "Confirm Booking (Verified)")}</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    ) : (
                      <>
                        <span>{t("contact.form.submitWithOtp", "Verify Email & Submit Booking")}</span>
                        <KeyRound className="w-3.5 h-3.5 text-[#BFA076]" />
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-center text-[#7B6955] mt-3 font-sans">
                    {t(
                      "contact.form.privacyNote",
                      "We treat your details with absolute privacy. Email OTP verification ensures only authenticated clients reserve slots."
                    )}
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* OTP Verification Modal Dialog */}
      {isOtpModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="otp-modal-title"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="bg-white max-w-md w-full p-6 sm:p-8 border border-[#E8DED0] shadow-2xl relative space-y-6 animate-in fade-in zoom-in-95 duration-150">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsOtpModalOpen(false)}
              className="absolute top-4 right-4 text-[#7B6955] hover:text-[#121212] p-1 cursor-pointer transition-colors"
              aria-label="Close verification modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#E8DED0] flex items-center justify-center text-[#121212] mx-auto">
                <KeyRound className="w-6 h-6 text-[#BFA076]" />
              </div>
              <h3 id="otp-modal-title" className="font-serif text-2xl text-[#121212]">
                {language === "hi" ? "अपना ईमेल पता सत्यापित करें" : "Verify Your Email Address"}
              </h3>
              <p className="text-xs text-[#554837] leading-relaxed font-light">
                {language === "hi"
                  ? "वास्तविक अपॉइंटमेंट सुनिश्चित करने और स्पैम रोकने के लिए, कृपया निम्नलिखित पते पर भेजा गया 6-अंकीय कोड दर्ज करें:"
                  : "To guarantee genuine appointments and prevent spam reservations, please enter the 6-digit confirmation code dispatched to:"}
              </p>
              <p className="text-xs font-semibold text-[#121212] bg-[#FAF7F2] py-1.5 px-3 border border-[#E8DED0] inline-block font-mono">
                {formData.email}
              </p>
            </div>

            {/* Development Mode Helper Banner */}
            {debugOtp && (
              <div className="p-3 bg-[#FAF7F2] border border-[#E8DED0] text-xs flex items-center justify-between gap-2">
                <span className="text-[#7B6955]">
                  {language === "hi" ? "डेवलपमेंट कोड: " : "Development Code: "}<strong className="font-mono text-[#121212] tracking-wider">{debugOtp}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => fillDebugCode(debugOtp)}
                  className="text-[11px] uppercase tracking-wider font-semibold text-[#121212] hover:text-[#BFA076] underline cursor-pointer"
                >
                  {language === "hi" ? "स्वतः भरें" : "Auto-Fill"}
                </button>
              </div>
            )}

            {/* Status & Error Alerts */}
            {otpError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{otpError}</span>
              </div>
            )}
            {otpSuccess && !otpError && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{otpSuccess}</span>
              </div>
            )}

            {/* 6 Digit Inputs */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#7B6955] text-center mb-3 font-sans font-medium">
                {language === "hi" ? "6-अंकीय सत्यापन कोड दर्ज करें" : "Enter 6-Digit Verification Code"}
              </label>
              <div className="flex justify-center gap-2 sm:gap-3" onPaste={handleOtpPaste}>
                {otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      digitInputsRef.current[idx] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    disabled={isVerifyingOtp}
                    className="w-11 h-14 sm:w-12 sm:h-14 text-center text-xl font-mono font-bold bg-[#FAF7F2] border border-[#D7C7B2] focus:border-[#121212] focus:bg-white focus:outline-none transition-colors"
                  />
                ))}
              </div>
            </div>

            {/* Verification Actions */}
            <div className="space-y-3 pt-1">
              <button
                type="button"
                onClick={() => verifyOtpCode()}
                disabled={isVerifyingOtp || otpDigits.some((d) => !d)}
                className="w-full py-3.5 text-xs uppercase tracking-[0.2em] font-medium bg-[#121212] text-[#FAF7F2] hover:bg-[#2C2C2C] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                {isVerifyingOtp ? (
                  <span className="inline-flex items-center gap-2">
                    <RotateCw className="w-3.5 h-3.5 animate-spin" />
                    <span>{language === "hi" ? "कोड सत्यापित हो रहा है..." : "Verifying Code..."}</span>
                  </span>
                ) : (
                  <>
                    <span>{language === "hi" ? "सत्यापित करें एवं बुकिंग सुरक्षित करें" : "Verify & Confirm Booking"}</span>
                    <Check className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-xs text-[#7B6955] pt-1">
                <button
                  type="button"
                  disabled={resendCooldown > 0 || isSendingOtp}
                  onClick={() => sendOtp()}
                  className={`text-xs hover:underline cursor-pointer ${
                    resendCooldown > 0 ? "text-gray-400 cursor-not-allowed" : "text-[#121212] font-medium"
                  }`}
                >
                  {resendCooldown > 0
                    ? `${language === "hi" ? "कोड पुनः भेजें (" : "Resend code in "}${resendCooldown}s${language === "hi" ? ")" : ""}`
                    : isSendingOtp
                    ? (language === "hi" ? "कोड भेजा जा रहा है..." : "Dispatching code...")
                    : (language === "hi" ? "कोड पुनः भेजें" : "Resend Code")}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsOtpModalOpen(false);
                    const emailInput = document.getElementById("email");
                    emailInput?.focus();
                  }}
                  className="text-xs text-[#7B6955] hover:text-[#121212] hover:underline cursor-pointer"
                >
                  {language === "hi" ? "ईमेल बदलें" : "Change Email"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
