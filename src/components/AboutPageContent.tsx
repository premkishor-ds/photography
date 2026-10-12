"use client";

import React from "react";
import Image from "next/image";
import { Camera, Sparkles, ShieldCheck } from "lucide-react";
import BookingCtaBanner from "@/components/BookingCtaBanner";
import { useStudioSettings } from "@/context/StudioContext";
import { siteConfig } from "@/config/siteConfig";

export default function AboutPageContent() {
  const { settings } = useStudioSettings();

  const photographerName = settings.photographer_name || siteConfig.photographer.name || "Kishor Prem";
  const photographerRole = settings.photographer_role || siteConfig.photographer.role || "Principal Photographer & Creative Director";
  const portraitUrl = settings.photographer_portrait_url || siteConfig.photographer.portraitUrl;
  const quote = settings.photographer_quote || "“Light reveals what exists; emotion reveals what truly matters.”";
  const bio1 =
    settings.photographer_bio_1 ||
    "For over twelve years, I have dedicated my life to the delicate art of visual observation. Photography, to me, is not merely capturing an image before the sensor—it is perceiving the heartbeat of a fleeting gesture and preserving it before it disappears into memory.";
  const bio2 =
    settings.photographer_bio_2 ||
    "Trained in classical fine-art, photojournalism, and dynamic sports optics, my style merges warm natural illumination with precise editorial composition. I look for the unscripted pauses: the quiet touch of hands before vows, the focused resolve in an athlete's breath, or mist settling over sunrise mountains.";

  const stats = [
    { value: settings.stats_experience || "12+", label: "Years of Craft" },
    { value: settings.stats_sessions || "650+", label: "Sessions Completed" },
    { value: settings.stats_weddings || "180+", label: "Weddings Documented" },
    { value: settings.stats_features || "24+", label: "Editorial Features" },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:max-w-none bg-[#121212] shadow-2xl overflow-hidden border border-[#E8DED0]">
            <Image
              src={portraitUrl}
              alt={`${photographerName}, ${photographerRole}`}
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="object-cover object-center"
              unoptimized
            />
          </div>
          <div className="hidden sm:block absolute -top-4 -left-4 w-full h-full border border-[#D7C7B2] -z-10 pointer-events-none" />
        </div>

        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-[#7B6955] font-sans font-medium">
            The Artist Behind The Lens
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-tight text-[#121212]">
            {photographerName}
          </h1>
          <p className="text-xs uppercase tracking-[0.2em] text-[#BFA076] font-sans font-medium">
            {photographerRole}
          </p>
          <p className="font-serif text-xl sm:text-2xl italic text-[#554837] border-l-2 border-[#121212] pl-6 py-1 leading-relaxed">
            {quote}
          </p>
          <div className="space-y-4 text-sm sm:text-base text-[#554837] font-light leading-relaxed">
            <p>{bio1}</p>
            <p>{bio2}</p>
          </div>

          {/* Verified Career Milestones */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#E8DED0]">
            {stats.map((s, idx) => (
              <div key={idx} className="bg-white p-4 border border-[#F3ECE1]">
                <p className="font-serif text-2xl sm:text-3xl text-[#121212]">{s.value}</p>
                <p className="text-[10px] uppercase tracking-widest text-[#7B6955] font-sans mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values & Pillars */}
      <section className="py-16 border-t border-[#E8DED0] space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#7B6955] font-sans">
            Our Foundation
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#121212]">
            Guiding Principles of Our Work
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 border border-[#E8DED0] space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E8DED0] flex items-center justify-center text-[#121212]">
              <Camera className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-xl text-[#121212]">
              Authenticity Above Staging
            </h3>
            <p className="text-xs sm:text-sm text-[#554837] leading-relaxed font-light">
              We believe authentic emotion cannot be fabricated through rigid poses. We create an atmosphere where clients feel relaxed, allowing true expression to emerge naturally.
            </p>
          </div>

          <div className="bg-white p-8 border border-[#E8DED0] space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E8DED0] flex items-center justify-center text-[#121212]">
              <Sparkles className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-xl text-[#121212]">
              Timeless Aesthetic Permanence
            </h3>
            <p className="text-xs sm:text-sm text-[#554837] leading-relaxed font-light">
              We deliberately reject trendy, temporary digital filters and unnatural color tints. Our color science is calibrated to look as captivating fifty years from now as it does today.
            </p>
          </div>

          <div className="bg-white p-8 border border-[#E8DED0] space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E8DED0] flex items-center justify-center text-[#121212]">
              <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-xl text-[#121212]">
              Technical Rigor & Redundancy
            </h3>
            <p className="text-xs sm:text-sm text-[#554837] leading-relaxed font-light">
              Every wedding and milestone event is captured with dual in-camera card recording and immediate offsite cloud backups, guaranteeing that irreplaceable moments remain safe.
            </p>
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <BookingCtaBanner
        title="Let's Work Together"
        subtitle="We would be honored to document your story. Reach out to schedule a consultation or check studio availability."
      />
    </>
  );
}
