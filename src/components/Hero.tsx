"use client";

import React from "react";
import Image from "next/image";
import { ArrowDown, Camera, Sparkles } from "lucide-react";

export default function Hero() {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0D0D0D]"
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=2000&q=85"
          alt="Atmospheric landscape and editorial portraiture"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.78] contrast-[1.05] transition-transform duration-1000 scale-100 hover:scale-102"
        />
        {/* Editorial Gradients & Warm Tint Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/95 via-black/40 to-black/50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center text-white pt-24 pb-20">
        {/* Subtle Pill Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md mb-8">
          <Sparkles className="w-3.5 h-3.5 text-[#E8DED0]" />
          <span className="text-[11px] uppercase tracking-[0.25em] font-sans text-[#FAF7F2]/90">
            Fine Art • Portraiture • Weddings • Sports • Expeditions
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.08] text-[#FAF7F2] max-w-4xl mx-auto drop-shadow-sm">
          Capturing Moments, <br className="hidden sm:inline" />
          <span className="italic font-normal text-[#F3ECE1]">Creating Memories</span>
        </h1>

        {/* Short Description */}
        <p className="mt-6 text-base sm:text-xl md:text-2xl text-[#E8DED0]/90 font-light max-w-2xl mx-auto font-sans tracking-wide leading-relaxed">
          Professional photography for life&apos;s most meaningful moments.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <a
            href="#portfolio"
            onClick={(e) => handleScrollTo(e, "portfolio")}
            className="w-full sm:w-auto px-8 py-4 text-xs uppercase tracking-[0.22em] font-medium bg-[#FAF7F2] text-[#121212] border border-[#FAF7F2] hover:bg-transparent hover:text-white transition-all duration-300 text-center"
          >
            View Portfolio
          </a>
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, "contact")}
            className="w-full sm:w-auto px-8 py-4 text-xs uppercase tracking-[0.22em] font-medium bg-transparent text-white border border-white/80 hover:bg-white hover:text-[#121212] transition-all duration-300 text-center backdrop-blur-sm"
          >
            Book a Session
          </a>
        </div>

        {/* Trust Points / Highlights */}
        <div className="mt-16 pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto text-left">
          <div className="border-l border-white/20 pl-4">
            <p className="text-xl sm:text-2xl font-serif text-[#FAF7F2]">10+ Years</p>
            <p className="text-[11px] tracking-widest uppercase text-[#FAF7F2]/70 font-sans mt-0.5">
              Experience
            </p>
          </div>
          <div className="border-l border-white/20 pl-4">
            <p className="text-xl sm:text-2xl font-serif text-[#FAF7F2]">600+ Sessions</p>
            <p className="text-[11px] tracking-widest uppercase text-[#FAF7F2]/70 font-sans mt-0.5">
              Completed
            </p>
          </div>
          <div className="border-l border-white/20 pl-4">
            <p className="text-xl sm:text-2xl font-serif text-[#FAF7F2]">Worldwide</p>
            <p className="text-[11px] tracking-widest uppercase text-[#FAF7F2]/70 font-sans mt-0.5">
              Available
            </p>
          </div>
          <div className="border-l border-white/20 pl-4">
            <p className="text-xl sm:text-2xl font-serif text-[#FAF7F2]">100% Curated</p>
            <p className="text-[11px] tracking-widest uppercase text-[#FAF7F2]/70 font-sans mt-0.5">
              Artistic Vision
            </p>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <a
        href="#portfolio"
        onClick={(e) => handleScrollTo(e, "portfolio")}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors duration-200"
        aria-label="Scroll down to portfolio"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-sans">Scroll</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce stroke-[1.5]" />
      </a>
    </section>
  );
}
