"use client";

import React, { useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { WhatsAppIcon } from "@/components/Icons";
import { siteConfig } from "@/config/siteConfig";
import { useLanguage } from "@/context/LanguageContext";
import { useStudioSettings } from "@/context/StudioContext";

export default function WhatsAppConcierge() {
  const { t, language } = useLanguage();
  const { settings } = useStudioSettings();
  const [isOpen, setIsOpen] = useState(false);

  const phone = (settings.phone || siteConfig.business.phone || "+919876543210").replace(/[^0-9]/g, "");

  const quickPrompts = [
    {
      label: language === "hi" ? "तारीख की उपलब्धता जांचें" : "Check Date Availability",
      text: "Hello, I would like to check availability for an upcoming photoshoot.",
    },
    {
      label: language === "hi" ? "शाही शादी पैकेज विवरण" : "Wedding Package Inquiry",
      text: "Hello! I am planning a wedding celebration and would love to review your royal wedding packages and availability.",
    },
    {
      label: language === "hi" ? "पोर्ट्रेट स्टूडियो सत्र" : "Portrait Session Booking",
      text: "Hi, I am interested in booking an editorial portrait session at your studio.",
    },
  ];

  const handleOpenWhatsApp = (customText?: string) => {
    const message = encodeURIComponent(
      customText ||
        "Hello, I am visiting your website and would love to discuss a photography session."
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-22 right-6 z-40 select-none">
      {/* Expanded Quick Concierge Card */}
      {isOpen && (
        <div className="mb-3 w-[320px] sm:w-[350px] bg-white border border-[#E8DED0] shadow-2xl rounded-xs overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Card Header */}
          <div className="bg-[#121212] p-4 text-[#FAF7F2] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-sm">
                  <WhatsAppIcon className="w-5 h-5 fill-white" />
                </div>
                {/* Active green status indicator */}
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#121212] rounded-full" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-medium tracking-wide">
                  {settings.studio_name || "Your Photography"} Concierge
                </h4>
                <p className="text-[10px] text-[#FAF7F2]/70 font-sans flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online • Typically replies in 15m</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-white/70 hover:text-white rounded-full transition-colors cursor-pointer"
              aria-label="Close concierge"
            >
              <X className="w-4 h-4 stroke-[1.8]" />
            </button>
          </div>

          {/* Card Body */}
          <div className="p-4 bg-[#FCFAF6] space-y-3">
            <p className="text-xs text-[#554837] font-light leading-relaxed">
              {language === "hi"
                ? "नमस्ते! क्या आपके पास शादी, पोर्ट्रेट या किसी प्रोजेक्ट को लेकर कोई प्रश्न है? नीचे से कोई त्वरित विकल्प चुनें या सीधे चैट करें:"
                : "Welcome! Have questions regarding shoot dates, bespoke wedding packages, or studio bookings? Select a topic below to chat instantly:"}
            </p>

            {/* Quick action buttons */}
            <div className="space-y-1.5">
              {quickPrompts.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOpenWhatsApp(q.text)}
                  className="w-full text-left px-3 py-2 text-xs bg-white hover:bg-[#F4EFE6] text-[#121212] border border-[#E8DED0] transition-colors rounded-xs flex items-center justify-between group cursor-pointer"
                >
                  <span className="font-light">{q.label}</span>
                  <Send className="w-3 h-3 text-[#BFA076] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>

            {/* Direct Send Button */}
            <button
              onClick={() => handleOpenWhatsApp()}
              className="w-full mt-2 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-medium uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>{language === "hi" ? "सीधे व्हाट्सएप पर चैट करें" : "Start WhatsApp Chat"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Trigger Bubble */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#121212] hover:bg-[#25D366] text-white border-2 border-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#BFA076]"
        aria-label="Direct WhatsApp Studio Concierge"
      >
        {isOpen ? (
          <X className="w-6 h-6 stroke-[2] transition-transform group-hover:rotate-90" />
        ) : (
          <>
            <WhatsAppIcon className="w-7 h-7 fill-white transition-transform group-hover:scale-110" />
            {/* Live Green Online Badge */}
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full animate-pulse" />
          </>
        )}
      </button>
    </div>
  );
}
