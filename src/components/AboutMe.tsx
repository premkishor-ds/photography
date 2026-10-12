"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Award, Camera, Heart, Sparkles } from "lucide-react";
import { PHOTOGRAPHER_INFO } from "@/data/photographyData";
import { useLanguage } from "@/context/LanguageContext";
import { useStudioSettings } from "@/context/StudioContext";

export default function AboutMe() {
  const { t } = useLanguage();
  const { settings } = useStudioSettings();

  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const photographerName = settings.photographer_name || PHOTOGRAPHER_INFO.name;
  const photographerRole = settings.photographer_role || PHOTOGRAPHER_INFO.role;
  const portraitUrl = settings.photographer_portrait_url || PHOTOGRAPHER_INFO.portraitUrl;
  const quote = settings.photographer_quote || PHOTOGRAPHER_INFO.quote;
  const bio1 = settings.photographer_bio_1 || PHOTOGRAPHER_INFO.bioParagraph1;
  const bio2 = settings.photographer_bio_2 || PHOTOGRAPHER_INFO.bioParagraph2;

  const dynamicStats = [
    { label: "Years of Craft", value: settings.stats_experience || "12+" },
    { label: "Sessions Completed", value: settings.stats_sessions || "650+" },
    { label: "Weddings Documented", value: settings.stats_weddings || "180+" },
    { label: "Editorial Features", value: settings.stats_features || "24+" },
  ];

  return (
    <section id="about" className="py-24 sm:py-32 bg-[#FAF7F2] text-[#121212]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Portrait Image Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:max-w-none bg-[#E8DED0] shadow-xl overflow-hidden border border-[#E8DED0]">
              <Image
                src={portraitUrl}
                alt={photographerName}
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover object-center filter contrast-[1.03]"
                priority
                unoptimized
              />

              {/* Subtle Film Stamp Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#FAF7F2]/90 backdrop-blur-sm p-4 border border-[#E8DED0] flex items-center justify-between">
                <div>
                  <p className="font-serif text-sm font-medium text-[#121212]">
                    {photographerName}
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-[#7B6955] font-sans">
                    {photographerRole}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#121212] text-white flex items-center justify-center">
                  <Camera className="w-4 h-4 stroke-[1.5]" />
                </div>
              </div>
            </div>

            {/* Decorative Offset Frame */}
            <div className="hidden sm:block absolute -top-4 -left-4 w-full h-full border border-[#D7C7B2] -z-10 pointer-events-none" />
          </div>

          {/* Text & Biography Column */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#7B6955] font-sans font-medium mb-3">
                {t("about.badge", "Behind The Lens")}
              </p>
              <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-[#121212]">
                {t("about.title", "Meet The Photographer")}
              </h2>
            </div>

            {/* Quote */}
            <blockquote className="font-serif text-xl sm:text-2xl italic text-[#554837] border-l-2 border-[#121212] pl-6 py-1 leading-relaxed">
              {quote}
            </blockquote>

            {/* Paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-[#554837] font-light leading-relaxed">
              <p>{bio1}</p>
              <p>{bio2}</p>
            </div>

            {/* Experience & Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#E8DED0]">
              {dynamicStats.map((stat, idx) => (
                <div key={idx} className="bg-white/70 p-4 border border-[#F3ECE1]">
                  <p className="font-serif text-2xl sm:text-3xl text-[#121212] font-normal">
                    {stat.value}
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-[#7B6955] font-sans mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Action CTA */}
            <div className="pt-2">
              <a
                href="#contact"
                onClick={handleScrollToContact}
                className="inline-flex items-center gap-3 px-8 py-4 text-xs uppercase tracking-[0.22em] font-medium bg-[#121212] text-[#FAF7F2] border border-[#121212] hover:bg-transparent hover:text-[#121212] transition-all duration-300 group"
              >
                <span>{t("about.cta", "Let's Work Together")}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
