"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { SlidersHorizontal, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface BeforeAfterPreset {
  id: string;
  title: string;
  category: string;
  beforeLabel: string;
  afterLabel: string;
  description: string;
  image: string;
  beforeFilter: string;
}

const PRESETS: BeforeAfterPreset[] = [
  {
    id: "royal-portrait",
    title: "Editorial Heritage Portrait",
    category: "Portraits",
    beforeLabel: "RAW Flat Profile",
    afterLabel: "Fine-Art Color Science",
    description: "Balancing dynamic range in midday harsh sunlight, gentle micro-contrast contouring, and authentic warm Rajasthani skin tones.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=85",
    beforeFilter: "contrast(85%) brightness(102%) saturate(75%) sepia(12%)",
  },
  {
    id: "wedding-pheras",
    title: "City Palace Golden Hour Vows",
    category: "Weddings",
    beforeLabel: "Standard Camera JPEG",
    afterLabel: "Master Royal Grade",
    description: "Restoring highlight detail in embroidered gold zardozi, lifting subtle shadow nuances, and enhancing candlelight ambience.",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85",
    beforeFilter: "contrast(80%) brightness(95%) saturate(65%)",
  },
  {
    id: "monochrome-fineart",
    title: "High-Contrast Studio Monochrome",
    category: "Studio",
    beforeLabel: "RAW Sensor Capture",
    afterLabel: "Silver Halide Tone Curve",
    description: "Custom S-curve translation preserving rich deep shadow detail, sculpted catchlights, and textured highlight falloff.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1600&q=85",
    beforeFilter: "grayscale(100%) contrast(75%) brightness(105%)",
  },
];

export default function BeforeAfterSlider() {
  const { t, language } = useLanguage();
  const [activePresetIndex, setActivePresetIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // 0 to 100 percentage
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activePreset = PRESETS[activePresetIndex];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setSliderPos((prev) => Math.max(0, prev - 5));
    } else if (e.key === "ArrowRight") {
      setSliderPos((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-[#F4EFE6]/70 border-y border-[#E8DED0]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#7B6955] font-sans font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#BFA076]" />
              <span>{t("retouch.badge", "Artistic Mastery & Post-Processing")}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#121212] tracking-tight">
              {t("retouch.title", "The Craft Behind Every Frame")}
            </h2>
            <p className="text-sm sm:text-base text-[#554837] font-light leading-relaxed">
              {t(
                "retouch.desc",
                "Photography doesn't end with the shutter click. Explore the meticulous color grading, dynamic range balancing, and fine-art skin retouching applied to every delivered photograph."
              )}
            </p>
          </div>

          {/* Preset Selector Buttons */}
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((preset, idx) => {
              const isActive = idx === activePresetIndex;
              return (
                <button
                  key={preset.id}
                  onClick={() => {
                    setActivePresetIndex(idx);
                    setSliderPos(50);
                  }}
                  className={`px-3.5 sm:px-4 py-2 text-xs uppercase tracking-wider font-sans transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#121212] text-[#FAF7F2] shadow-sm font-medium"
                      : "bg-white/80 text-[#554837] hover:bg-white hover:text-[#121212] border border-[#E8DED0]"
                  }`}
                >
                  {preset.category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Comparison Stage */}
        <div className="relative max-w-5xl mx-auto bg-white border border-[#E8DED0] shadow-lg overflow-hidden">
          <div
            ref={containerRef}
            className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden select-none cursor-ew-resize focus:outline-none focus:ring-2 focus:ring-[#BFA076]"
            tabIndex={0}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onKeyDown={handleKeyDown}
            aria-label="Before and after retouching comparison slider. Use left and right arrow keys to adjust."
          >
            {/* Background: After (Final Edited Image) */}
            <div className="absolute inset-0">
              <Image
                src={activePreset.image}
                alt={activePreset.title}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover object-center"
                priority
              />
              {/* After Label */}
              <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-[#121212]/85 text-[#FAF7F2] backdrop-blur-md text-[10px] sm:text-xs uppercase tracking-widest font-sans font-medium pointer-events-none">
                {activePreset.afterLabel}
              </div>
            </div>

            {/* Foreground: Before (RAW Profile Image) clipped by sliderPos */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
              }}
            >
              <div className="relative w-full h-full" style={{ filter: activePreset.beforeFilter }}>
                <Image
                  src={activePreset.image}
                  alt={`${activePreset.title} Unedited`}
                  fill
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-cover object-center pointer-events-none"
                  priority
                />
              </div>

              {/* Before Label */}
              <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-white/90 text-[#121212] backdrop-blur-md text-[10px] sm:text-xs uppercase tracking-widest font-sans font-medium pointer-events-none border border-[#E8DED0]">
                {activePreset.beforeLabel}
              </div>
            </div>

            {/* Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.6)] pointer-events-none z-20"
              style={{ left: `${sliderPos}%` }}
            >
              {/* Center Grab Handle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#121212] border-2 border-white text-white shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95">
                <div className="flex items-center -space-x-1">
                  <ChevronLeft className="w-3.5 h-3.5 text-white/90 stroke-[2]" />
                  <ChevronRight className="w-3.5 h-3.5 text-white/90 stroke-[2]" />
                </div>
              </div>
            </div>
          </div>

          {/* Context Footer */}
          <div className="p-5 sm:p-7 bg-[#FCFAF6] border-t border-[#E8DED0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] uppercase tracking-wider text-[#BFA076] font-sans font-medium">
                  {activePreset.category}
                </span>
                <span className="text-[#9E8870]">•</span>
                <h4 className="font-serif text-lg sm:text-xl text-[#121212] font-normal">
                  {activePreset.title}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[#554837] font-light leading-relaxed max-w-2xl">
                {activePreset.description}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-2 text-xs text-[#7B6955] font-sans font-light">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#BFA076]" />
              <span>{language === "hi" ? "तुलना के लिए स्लाइडर खींचें" : "Drag slider or use arrow keys"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
