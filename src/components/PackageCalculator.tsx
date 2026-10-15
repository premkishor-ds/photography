"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Calculator,
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  Camera,
  MessageCircle,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useStudioSettings } from "@/context/StudioContext";

interface ShootTypeOption {
  id: string;
  title: string;
  titleHindi: string;
  description: string;
  descriptionHindi: string;
  basePriceInr: number;
  basePriceUsd: number;
  iconName: string;
}

interface DurationOption {
  id: string;
  label: string;
  labelHindi: string;
  sublabel: string;
  sublabelHindi: string;
  multiplier: number;
}

interface AddonOption {
  id: string;
  title: string;
  titleHindi: string;
  description: string;
  descriptionHindi: string;
  priceInr: number;
  priceUsd: number;
}

const SHOOT_TYPES: ShootTypeOption[] = [
  {
    id: "wedding",
    title: "Royal Destination Wedding",
    titleHindi: "रॉयल डेस्टिनेशन वेडिंग",
    description: "Multi-ceremony coverage, cinematic rituals, and editorial bridal portraits.",
    descriptionHindi: "विवाह समारोह, फेरे, संगीत और भव्य वैवाहिक पोर्ट्रेट्स का संपूर्ण कवरेज।",
    basePriceInr: 150000,
    basePriceUsd: 1800,
    iconName: "wedding",
  },
  {
    id: "portrait",
    title: "Fine-Art Editorial Portrait",
    titleHindi: "फाइन-आर्ट एडिटोरियल पोर्ट्रेट",
    description: "Creative direction, natural & studio lighting for artists and leaders.",
    descriptionHindi: "कलाकारों, संस्थापकों और रचनात्मक व्यक्तित्वों के लिए विशेष पोर्ट्रेट सत्र।",
    basePriceInr: 35000,
    basePriceUsd: 420,
    iconName: "portrait",
  },
  {
    id: "pre-wedding",
    title: "Heritage Pre-Wedding & Candid",
    titleHindi: "हेरिटेज प्री-वेडिंग एवं कैंडिड",
    description: "Romantic Pink City monuments, golden-hour styling, and natural storytelling.",
    descriptionHindi: "जयपुर के ऐतिहासिक महलों और किलों में रोमांटिक सुनहरी रोशनी में प्री-वेडिंग शूट।",
    basePriceInr: 60000,
    basePriceUsd: 720,
    iconName: "pre-wedding",
  },
  {
    id: "commercial",
    title: "Architecture & Commercial Brand",
    titleHindi: "आर्किटेक्चर एवं कमर्शियल ब्रांड",
    description: "Heritage luxury hotels, lookbooks, jewelry, and high-end ad campaigns.",
    descriptionHindi: "लक्ज़री होटल, ज्वेलरी, फैशन कैम्पेन और हेरिटेज प्रॉपर्टीज के लिए ब्रांडिंग शूट।",
    basePriceInr: 75000,
    basePriceUsd: 900,
    iconName: "commercial",
  },
];

const DURATION_OPTIONS: DurationOption[] = [
  {
    id: "half-day",
    label: "Half-Day Session",
    labelHindi: "हाफ-डे सत्र (4 घंटे)",
    sublabel: "4 Hours of Dedicated Coverage",
    sublabelHindi: "4 घंटे का समर्पित फोटोग्राफी कवरेज",
    multiplier: 1.0,
  },
  {
    id: "full-day",
    label: "Full-Day Immersive",
    labelHindi: "फुल-डे सत्र (8 घंटे)",
    sublabel: "8 Hours Comprehensive Story",
    sublabelHindi: "8 घंटे का संपूर्ण कवरेज (सुबह से शाम)",
    multiplier: 1.65,
  },
  {
    id: "multi-day",
    label: "Multi-Day Grand Celebration",
    labelHindi: "मल्टी-डे भव्य उत्सव (2 दिन)",
    sublabel: "2 Consecutive Days (16 Hours Total)",
    sublabelHindi: "लगातार 2 दिन का गहन शाही कवरेज",
    multiplier: 2.8,
  },
];

const ADDONS_LIST: AddonOption[] = [
  {
    id: "drone",
    title: "4K Aerial Drone Cinematography",
    titleHindi: "4K एरियल ड्रोन सिनेमैटोग्राफी",
    description: "Licensed drone pilot capturing cinematic royal landscape perspectives.",
    descriptionHindi: "हवाई दृष्टिकोण से भव्य वास्तुशिल्प और समारोह का 4K एरियल कवरेज।",
    priceInr: 15000,
    priceUsd: 180,
  },
  {
    id: "second-shooter",
    title: "Second Master Shooter / Cinematographer",
    titleHindi: "द्वितीय मास्टर फोटोग्राफर",
    description: "Dual-angle synchronized coverage ensuring no candid moment is missed.",
    descriptionHindi: "दोहरे कोण से कवरेज ताकि कोई भी अप्रत्याशित पल छूट न जाए।",
    priceInr: 22000,
    priceUsd: 265,
  },
  {
    id: "album",
    title: "Handcrafted Italian Leather Album",
    titleHindi: "हस्तनिर्मित इटैलियन लेदर एल्बम",
    description: "30 museum-grade panoramic spreads on archival cotton rag paper.",
    descriptionHindi: "30 प्रीमियम पैनोरमिक स्प्रेड, आर्काइवल कॉटन पेपर पर ले-फ्लैट बाइंडिंग।",
    priceInr: 25000,
    priceUsd: 300,
  },
  {
    id: "rush",
    title: "48-Hour Priority Rush Delivery",
    titleHindi: "48-घंटे प्राथमिकता रश डिलीवरी",
    description: "Curated highlight gallery ready for social announcements within 48 hours.",
    descriptionHindi: "समारोह के 48 घंटे के भीतर सोशल मीडिया और घोषणाओं के लिए मुख्य तस्वीरें।",
    priceInr: 12000,
    priceUsd: 145,
  },
];

export default function PackageCalculator() {
  const { language } = useLanguage();
  const { settings } = useStudioSettings();
  const isHindi = language === "hi";

  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [selectedShootId, setSelectedShootId] = useState<string>("wedding");
  const [selectedDurationId, setSelectedDurationId] = useState<string>("full-day");
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>(["drone"]);

  const selectedShoot = useMemo(
    () => SHOOT_TYPES.find((s) => s.id === selectedShootId) || SHOOT_TYPES[0],
    [selectedShootId]
  );

  const selectedDuration = useMemo(
    () => DURATION_OPTIONS.find((d) => d.id === selectedDurationId) || DURATION_OPTIONS[1],
    [selectedDurationId]
  );

  const toggleAddon = (id: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculate total price
  const calculation = useMemo(() => {
    const isUsd = currency === "USD";
    const base = isUsd ? selectedShoot.basePriceUsd : selectedShoot.basePriceInr;
    const shootWithDuration = Math.round(base * selectedDuration.multiplier);

    const addonsCost = selectedAddonIds.reduce((sum, addonId) => {
      const addon = ADDONS_LIST.find((a) => a.id === addonId);
      if (!addon) return sum;
      return sum + (isUsd ? addon.priceUsd : addon.priceInr);
    }, 0);

    const grandTotal = shootWithDuration + addonsCost;
    return {
      shootWithDuration,
      addonsCost,
      grandTotal,
      symbol: isUsd ? "$" : "₹",
    };
  }, [currency, selectedShoot, selectedDuration, selectedAddonIds]);

  const formattedTotal = useMemo(() => {
    if (currency === "USD") {
      return `$${calculation.grandTotal.toLocaleString("en-US")}`;
    }
    return `₹${calculation.grandTotal.toLocaleString("en-IN")}`;
  }, [calculation.grandTotal, currency]);

  // Query parameter string for contact page
  const inquiryUrl = useMemo(() => {
    const params = new URLSearchParams({
      service: selectedShoot.title,
      duration: selectedDuration.label,
      addons: selectedAddonIds.join(", "),
      estimate: formattedTotal,
    });
    return `/contact?${params.toString()}`;
  }, [selectedShoot, selectedDuration, selectedAddonIds, formattedTotal]);

  // WhatsApp concierge prefilled message
  const whatsappUrl = useMemo(() => {
    const rawPhone = settings.whatsapp_number || settings.phone || "+91 94140 00000";
    const phone = rawPhone.replace(/[^0-9]/g, "");
    const text = isHindi
      ? `नमस्ते प्रेम! मैंने आपकी वेबसाइट पर एक कस्टम पैकेज तैयार किया है:\n• सेवा: ${selectedShoot.titleHindi}\n• अवधि: ${selectedDuration.labelHindi}\n• अतिरिक्त: ${selectedAddonIds.join(", ") || "कोई नहीं"}\n• अनुमानित बजट: ${formattedTotal}\nकृपया आगामी उपलब्धता बताएं।`
      : `Hello Prem! I crafted a bespoke estimate on your studio calculator:\n• Service: ${selectedShoot.title}\n• Duration: ${selectedDuration.label}\n• Add-ons: ${selectedAddonIds.join(", ") || "None"}\n• Estimated Total: ${formattedTotal}\nCould you share your calendar availability?`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  }, [settings.whatsapp_number, settings.phone, isHindi, selectedShoot, selectedDuration, selectedAddonIds, formattedTotal]);

  return (
    <section className="my-16 sm:my-24 bg-white border border-[#E8DED0] shadow-sm p-6 sm:p-10 lg:p-12 relative overflow-hidden">
      {/* Decorative luxury watermark */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FAF7F2] rounded-full blur-3xl -z-10 pointer-events-none opacity-70" />

      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF7F2] border border-[#E8DED0] text-[#7B6955] text-xs uppercase tracking-[0.2em] font-sans font-medium mb-3">
          <Calculator className="w-3.5 h-3.5 text-[#BFA076]" />
          <span>{isHindi ? "इंटरएक्टिव पैकेज कैलकुलेटर" : "Bespoke Package Estimator"}</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#121212] tracking-tight">
          {isHindi ? "अपनी आवश्यकता अनुसार पैकेज बनाएं" : "Customize Your Photography Commission"}
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#554837] font-light max-w-xl mx-auto">
          {isHindi
            ? "सटीक और पारदर्शी अनुमान प्राप्त करें। अपनी सेवा का प्रकार, अवधि और विशिष्ट आवश्यकताएं चुनें।"
            : "Transparent, tailor-made investment planning. Select your commission scope, timeline, and artisanal inclusions."}
        </p>

        {/* Currency Switcher */}
        <div className="mt-6 inline-flex items-center p-1 bg-[#FAF7F2] border border-[#E8DED0] rounded-xs">
          <button
            onClick={() => setCurrency("INR")}
            className={`px-4 py-1 text-xs uppercase tracking-wider font-mono transition-colors cursor-pointer ${
              currency === "INR"
                ? "bg-[#121212] text-[#FAF7F2] font-semibold"
                : "text-[#7B6955] hover:text-[#121212]"
            }`}
          >
            INR (₹)
          </button>
          <button
            onClick={() => setCurrency("USD")}
            className={`px-4 py-1 text-xs uppercase tracking-wider font-mono transition-colors cursor-pointer ${
              currency === "USD"
                ? "bg-[#121212] text-[#FAF7F2] font-semibold"
                : "text-[#7B6955] hover:text-[#121212]"
            }`}
          >
            USD ($)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Left Column: Interactive Selectors */}
        <div className="lg:col-span-7 space-y-8">
          {/* Step 1: Shoot Type */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-[0.2em] font-sans font-medium text-[#7B6955]">
                {isHindi ? "चरण 01 • सेवा का प्रकार चुनें" : "Step 01 • Select Commission Type"}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SHOOT_TYPES.map((st) => {
                const isSelected = selectedShootId === st.id;
                return (
                  <button
                    key={st.id}
                    onClick={() => setSelectedShootId(st.id)}
                    className={`p-4 text-left border rounded-xs transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-[#FAF7F2] border-[#121212] ring-1 ring-[#121212]"
                        : "bg-white border-[#E8DED0] hover:border-[#BFAB93] hover:bg-[#FCFAF6]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif text-base font-medium text-[#121212]">
                          {isHindi ? st.titleHindi : st.title}
                        </h4>
                        {isSelected && <Check className="w-4 h-4 text-[#BFA076] shrink-0" />}
                      </div>
                      <p className="mt-1 text-xs text-[#554837] font-light leading-relaxed">
                        {isHindi ? st.descriptionHindi : st.description}
                      </p>
                    </div>
                    <span className="mt-3 text-[11px] font-mono font-medium text-[#7B6955]">
                      {currency === "USD"
                        ? `From $${st.basePriceUsd.toLocaleString()}`
                        : `From ₹${st.basePriceInr.toLocaleString("en-IN")}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Duration */}
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-sans font-medium text-[#7B6955] block mb-3">
              {isHindi ? "चरण 02 • कवरेज अवधि" : "Step 02 • Coverage Duration"}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {DURATION_OPTIONS.map((dur) => {
                const isSelected = selectedDurationId === dur.id;
                return (
                  <button
                    key={dur.id}
                    onClick={() => setSelectedDurationId(dur.id)}
                    className={`p-3.5 text-left border rounded-xs transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-[#FAF7F2] border-[#121212] ring-1 ring-[#121212]"
                        : "bg-white border-[#E8DED0] hover:border-[#BFAB93]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#121212]">
                        {isHindi ? dur.labelHindi : dur.label}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#BFA076]" />}
                    </div>
                    <p className="mt-1 text-[11px] text-[#7B6955] font-light">
                      {isHindi ? dur.sublabelHindi : dur.sublabel}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Artisanal Add-ons */}
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-sans font-medium text-[#7B6955] block mb-3">
              {isHindi ? "चरण 03 • विशिष्ट ऐनक एवं संवर्धन (वैकल्पिक)" : "Step 03 • Bespoke Add-Ons (Optional)"}
            </span>
            <div className="space-y-2.5">
              {ADDONS_LIST.map((addon) => {
                const isChecked = selectedAddonIds.includes(addon.id);
                const addonPriceFormatted =
                  currency === "USD"
                    ? `+$${addon.priceUsd.toLocaleString()}`
                    : `+₹${addon.priceInr.toLocaleString("en-IN")}`;

                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-3.5 border rounded-xs flex items-center justify-between gap-4 cursor-pointer transition-all duration-200 ${
                      isChecked
                        ? "bg-[#FAF7F2] border-[#121212]"
                        : "bg-white border-[#E8DED0] hover:border-[#BFAB93]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-xs mt-0.5 border flex items-center justify-center transition-colors ${
                          isChecked ? "bg-[#121212] border-[#121212] text-white" : "border-[#C8BCAB] bg-white"
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-medium text-[#121212]">
                          {isHindi ? addon.titleHindi : addon.title}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-[#7B6955] font-light">
                          {isHindi ? addon.descriptionHindi : addon.description}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-semibold text-[#121212] whitespace-nowrap">
                      {addonPriceFormatted}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Live Estimate Summary Card */}
        <div className="lg:col-span-5">
          <div className="bg-[#FAF7F2] border border-[#E8DED0] p-6 sm:p-8 rounded-xs sticky top-28 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DED0]">
              <span className="text-xs uppercase tracking-[0.2em] font-sans font-medium text-[#7B6955]">
                {isHindi ? "अनुमानित निवेश विवरण" : "Investment Summary"}
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 bg-white border border-[#E8DED0] text-[#7B6955]">
                Live Estimate
              </span>
            </div>

            {/* Itemized Line Items */}
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between items-start gap-2">
                <span className="text-[#554837]">
                  {isHindi ? selectedShoot.titleHindi : selectedShoot.title} (
                  {isHindi ? selectedDuration.labelHindi : selectedDuration.label})
                </span>
                <span className="font-mono font-medium text-[#121212] whitespace-nowrap">
                  {currency === "USD"
                    ? `$${calculation.shootWithDuration.toLocaleString()}`
                    : `₹${calculation.shootWithDuration.toLocaleString("en-IN")}`}
                </span>
              </div>

              {selectedAddonIds.length > 0 && (
                <div className="pt-2 border-t border-dashed border-[#E8DED0] space-y-1.5">
                  <span className="text-[11px] uppercase tracking-wider text-[#7B6955] font-medium block">
                    {isHindi ? "शामिल ऐड-ऑन:" : "Included Add-ons:"}
                  </span>
                  {selectedAddonIds.map((id) => {
                    const a = ADDONS_LIST.find((item) => item.id === id);
                    if (!a) return null;
                    return (
                      <div key={id} className="flex justify-between text-xs text-[#554837]">
                        <span className="truncate pr-2">{isHindi ? a.titleHindi : a.title}</span>
                        <span className="font-mono whitespace-nowrap">
                          {currency === "USD"
                            ? `$${a.priceUsd.toLocaleString()}`
                            : `₹${a.priceInr.toLocaleString("en-IN")}`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Grand Total */}
            <div className="pt-4 border-t border-[#121212] flex items-baseline justify-between">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#121212] block">
                  {isHindi ? "कुल अनुमानित निवेश" : "Total Estimated Investment"}
                </span>
                <span className="text-[10px] text-[#7B6955] font-light">
                  {isHindi ? "स्थानिक कर एवं यात्रा लागत अतिरिक्त" : "Taxes & outstation travel quoted separately"}
                </span>
              </div>
              <span className="font-serif text-3xl sm:text-4xl font-normal text-[#121212] tracking-tight">
                {formattedTotal}
              </span>
            </div>

            {/* Standard Inclusions Checklist */}
            <div className="p-4 bg-white border border-[#E8DED0] rounded-xs space-y-2">
              <span className="text-[11px] uppercase tracking-wider text-[#7B6955] font-medium block flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#BFA076]" />
                <span>{isHindi ? "सभी पैकेजों में शामिल:" : "Always Included with Studio Commissions:"}</span>
              </span>
              <ul className="text-xs text-[#554837] space-y-1 font-light">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#BFA076]" />
                  <span>Master color grading & fine-art frequency retouching</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#BFA076]" />
                  <span>Private Client Proofing Portal with password access</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#BFA076]" />
                  <span>High-resolution 300DPI print & web-optimized delivery</span>
                </li>
              </ul>
            </div>

            {/* Actions */}
            <div className="space-y-2.5 pt-2">
              <Link
                href={inquiryUrl}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-[#121212] text-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#2C2C2C] transition-colors"
              >
                <span>{isHindi ? "इस अनुमान के साथ संपर्क करें" : "Book With This Estimate"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-[#25D366] text-white text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#20BA5A] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isHindi ? "व्हाट्सएप पर चर्चा करें" : "Direct WhatsApp Inquiry"}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
