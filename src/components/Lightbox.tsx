"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, MapPin, Calendar } from "lucide-react";
import { PortfolioItem } from "@/data/photographyData";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  items: PortfolioItem[];
  currentIndex: number;
  onNavigate: (newIndex: number) => void;
}

export default function Lightbox({
  isOpen,
  onClose,
  items,
  currentIndex,
  onNavigate,
}: LightboxProps) {
  const currentItem = items[currentIndex];

  const handleNext = useCallback(() => {
    if (items.length > 0) {
      onNavigate((currentIndex + 1) % items.length);
    }
  }, [currentIndex, items.length, onNavigate]);

  const handlePrev = useCallback(() => {
    if (items.length > 0) {
      onNavigate((currentIndex - 1 + items.length) % items.length);
    }
  }, [currentIndex, items.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    // Lock body scroll
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, handleNext, handlePrev]);

  if (!isOpen || !currentItem) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image preview lightbox"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl transition-all duration-300"
      onClick={onClose}
    >
      {/* Top Bar */}
      <div
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/80 to-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#E8DED0]/80 font-sans">
            {currentItem.category}
          </span>
          <span className="text-white/30">•</span>
          <span className="text-xs font-mono text-white/60">
            {currentIndex + 1} / {items.length}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors focus:outline-none focus:ring-1 focus:ring-white/40"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6 stroke-[1.5]" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div
        className="relative w-full h-[78vh] sm:h-[82vh] max-w-6xl mx-auto px-4 sm:px-12 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={currentItem.imageUrl}
            alt={currentItem.title}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-contain select-none transition-opacity duration-300"
            priority
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 text-white/70 hover:text-white bg-black/40 hover:bg-black/80 border border-white/10 rounded-full backdrop-blur-md transition-all focus:outline-none"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 text-white/70 hover:text-white bg-black/40 hover:bg-black/80 border border-white/10 rounded-full backdrop-blur-md transition-all focus:outline-none"
        aria-label="Next image"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
      </button>

      {/* Bottom Information Bar */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 px-6 py-5 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-2xl mx-auto space-y-1.5">
          <h3 className="text-xl sm:text-2xl font-serif text-[#FAF7F2] font-light">
            {currentItem.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#FAF7F2]/80 font-sans font-light">
            {currentItem.description}
          </p>
          <div className="flex items-center justify-center gap-4 text-[11px] text-[#FAF7F2]/60 uppercase tracking-widest pt-1">
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#E8DED0]" />
              {currentItem.location}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#E8DED0]" />
              {currentItem.year}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
