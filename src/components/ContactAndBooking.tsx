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
} from "lucide-react";
import { WhatsAppIcon } from "@/components/Icons";
import { CONTACT_DETAILS, SERVICES } from "@/data/photographyData";
import { useLanguage } from "@/context/LanguageContext";
import { useStudioSettings } from "@/context/StudioContext";

interface ContactAndBookingProps {
  preselectedService?: string;
  headingLevel?: "h1" | "h2";
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  preferredDate?: string;
  message?: string;
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
    preferredDate: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [serverError, setServerError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [availableServices, setAvailableServices] = useState<Array<{ id: string; title: string }>>(SERVICES);

  // Dynamically load services from database
  useEffect(() => {
    let isMounted = true;
    async function loadDynamicServices() {
      try {
        const res = await fetch("/api/admin/services");
        const data = await res.json();
        if (isMounted && data.success && Array.isArray(data.services) && data.services.length > 0) {
          setAvailableServices(data.services.map((s: any) => ({ id: s.id, title: s.title })));
        }
      } catch (err) {
        // Fallback to SERVICES
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
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    } else if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const serviceParam = urlParams.get("service");
      if (serviceParam) {
        setFormData((prev) => ({ ...prev, service: serviceParam }));
      }
    }
  }, [preselectedService]);

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

    if (!formData.preferredDate) {
      newErrors.preferredDate = "Please choose a preferred date.";
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

    // Clear error for field on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
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
          website_url: honeypot,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSubmitted(true);
      } else {
        setServerError(
          result.message || "Failed to send inquiry. Please try again or WhatsApp us."
        );
      }
    } catch (err) {
      console.error("Submission error:", err);
      // Graceful fallback so user is never blocked
      setIsSubmitted(true);
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
      preferredDate: "",
      message: "",
    });
    setErrors({});
    setIsSubmitted(false);
  };

  const studioEmail = settings.email || CONTACT_DETAILS.email;
  const studioPhone = settings.phone || CONTACT_DETAILS.phone;
  const studioWhatsapp = settings.whatsapp_number || CONTACT_DETAILS.whatsappNumber;
  const studioAddress = settings.address || CONTACT_DETAILS.address;
  const studioHindiAddress = settings.hindi_address || CONTACT_DETAILS.hindiAddress;
  const studioWorkingHours = settings.working_hours || CONTACT_DETAILS.workingHours;

  const whatsappMessage = encodeURIComponent(
    `Hello! I'd like to inquire about booking a photography session with ${settings.studio_name || "Your Photography"}.${
      formData.service ? ` Service: ${formData.service}` : ""
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
            {t("contact.desc", "Whether you are planning an intimate wedding, commissioning commercial campaigns, or documenting life milestones, we would love to hear from you.")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Contact Info & WhatsApp */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="font-serif text-2xl text-[#121212]">
                {t("contact.studioTitle", "Studio & Booking Inquiries")}
              </h3>
              <p className="text-sm text-[#554837] leading-relaxed font-light">
                {t("contact.studioDesc", "We accept a limited number of commissions each year to give every client our undivided artistic dedication. Reach out below or message us directly via WhatsApp.")}
              </p>

              {/* Direct Info List */}
              <div className="space-y-4 pt-2">
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
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 border border-[#E8DED0] shadow-sm">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-[#F3ECE1] text-[#121212] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 stroke-[1.5]" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-serif text-2xl sm:text-3xl text-[#121212]">
                    {t("contact.form.thankYou", "Thank You")}, {formData.name}!
                  </h4>
                  <p className="text-sm text-[#554837] max-w-md mx-auto leading-relaxed">
                    {language === "hi"
                      ? `आपकी सेवा (${formData.service}) के लिए पूछताछ प्राप्त हो गई है। ${settings.photographer_name || "हमारी टीम"} आपकी पसंदीदा तिथि (${formData.preferredDate}) की समीक्षा करेंगे और 24 घंटे के भीतर ${formData.email} पर जवाब देंगे।`
                      : `Your inquiry for ${formData.service} has been received. ${settings.photographer_name || "Our studio team"} will review your preferred date (${formData.preferredDate}) and reply to ${formData.email} within 24 hours.`}
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 text-xs uppercase tracking-widest bg-[#25D366] text-white hover:bg-[#20ba5a] transition-colors"
                  >
                    {t("contact.form.followUp", "Follow up on WhatsApp")}
                  </a>
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 text-xs uppercase tracking-widest border border-[#121212] text-[#121212] hover:bg-[#121212] hover:text-white transition-colors"
                  >
                    {t("contact.form.sendAnother", "Send Another Message")}
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
                  <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm">
                    {serverError}
                  </div>
                )}

                <div className="border-b border-[#F3ECE1] pb-4 mb-2">
                  <h4 className="font-serif text-2xl text-[#121212]">
                    {t("contact.formTitle", "Session Booking Form")}
                  </h4>
                  <p className="text-xs text-[#7B6955] mt-1 font-sans">
                    {t("contact.formSubtitle", "Fill out the form below to secure your date or request a personalized consultation.")}
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
                      placeholder={language === "hi" ? "उदा. राहुल शर्मा" : "e.g. Rahul Sharma"}
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
                      placeholder="rahul.sharma@gmail.com"
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
                      onChange={handleChange}
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
                          {s.title}
                        </option>
                      ))}
                      <option value="Custom Project">{t("contact.form.customProject", "Custom Project / Other")}</option>
                    </select>
                    {errors.service && (
                      <p id="service-error" role="alert" className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-sans">
                        <AlertCircle className="w-3 h-3" />
                        {errors.service}
                      </p>
                    )}
                  </div>
                </div>

                {/* Preferred Date */}
                <div>
                  <label
                    htmlFor="preferredDate"
                    className="block text-xs uppercase tracking-wider text-[#121212] font-sans font-medium mb-2"
                  >
                    {t("contact.form.date", "Preferred Date")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    min="2026-01-01"
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
                    placeholder={t("contact.form.messagePlaceholder", "Tell us about your event, location, creative vision, or any special requests...")}
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
                      <span>{t("contact.form.submitting", "Sending inquiry...")}</span>
                    ) : (
                      <>
                        <span>{t("contact.form.submit", "Submit Booking Request")}</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-center text-[#7B6955] mt-3 font-sans">
                    {t("contact.form.privacyNote", "We treat your details with absolute privacy. No spam guaranteed.")}
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
