"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { WhatsAppIcon } from "@/components/Icons";
import { useLanguage } from "@/context/LanguageContext";
import { useStudioSettings } from "@/context/StudioContext";

interface BookingCtaBannerProps {
  title?: string;
  subtitle?: string;
  serviceName?: string;
}

export default function BookingCtaBanner({
  title = "Ready to Capture Your Moments?",
  subtitle = "Whether you are planning a destination wedding, leadership portraits, or sports coverage, let's bring your creative vision to life.",
  serviceName,
}: BookingCtaBannerProps) {
  const { t, language } = useLanguage();
  const { settings } = useStudioSettings();

  const whatsappNumber = settings.whatsapp_number || siteConfig.business.whatsappNumber;
  const email = settings.email || siteConfig.business.email;
  const phone = settings.phone || siteConfig.business.phone;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hello! I'd like to check availability for ${serviceName || "a photography session"}.`
  )}`;

  const isHindi = language === "hi";

  return (
    <section className="my-16 sm:my-24 bg-[#121212] text-[#FAF7F2] p-8 sm:p-14 relative overflow-hidden border border-[#2A2A2A]">
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#BFA076] font-sans">
          {t("cta.badge", "Inquire & Reserve")}
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-[#FAF7F2]">
          {isHindi && title === "Ready to Capture Your Moments?"
            ? "क्या आप अपने अनमोल पलों को संजोने के लिए तैयार हैं?"
            : title}
        </h2>
        <p className="text-sm sm:text-base text-[#FAF7F2]/80 font-light max-w-2xl mx-auto leading-relaxed">
          {isHindi && subtitle.startsWith("Whether you are planning")
            ? "चाहे आप डेस्टिनेशन वेडिंग की योजना बना रहे हों, कॉर्पोरेट पोर्ट्रेट्स या खेल कवरेज, आइए आपके रचनात्मक दृष्टिकोण को साकार करें।"
            : subtitle}
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-4 bg-[#FAF7F2] text-[#121212] text-xs uppercase tracking-[0.2em] font-medium hover:bg-white transition-colors flex items-center justify-center gap-2 group"
          >
            <Calendar className="w-4 h-4" />
            <span>{t("cta.book", "Book a Consultation")}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2"
          >
            <WhatsAppIcon className="w-4 h-4 fill-white" />
            <span>{t("cta.whatsapp", "Chat on WhatsApp")}</span>
          </a>
        </div>

        <p className="text-[11px] text-[#FAF7F2]/60 font-sans pt-2">
          Direct email:{" "}
          <a
            href={`mailto:${email}`}
            className="text-[#FAF7F2] underline hover:text-[#BFA076]"
          >
            {email}
          </a>{" "}
          • Phone: {phone}
        </p>
      </div>

      {/* Subtle Background Radial Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(191,160,118,0.15)_0%,transparent_70%)] pointer-events-none" />
    </section>
  );
}
