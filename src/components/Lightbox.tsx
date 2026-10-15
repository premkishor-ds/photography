"use client";

import React, { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Camera,
  Aperture,
  Sliders,
  Info,
} from "lucide-react";
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
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchDeltaX, setTouchDeltaX] = useState<number>(0);
  const [showExif, setShowExif] = useState<boolean>(true);

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
      if (e.key === "i" || e.key === "I") setShowExif((prev) => !prev);
    };

    // Lock body scroll
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, handleNext, handlePrev]);

  // Touch Swipe Handlers for mobile gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchDeltaX(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX !== null) {
      setTouchDeltaX(e.touches[0].clientX - touchStartX);
    }
  };

  const handleTouchEnd = () => {
    if (touchStartX !== null) {
      if (touchDeltaX > 45) {
        handlePrev();
      } else if (touchDeltaX < -45) {
        handleNext();
      }
    }
    setTouchStartX(null);
    setTouchDeltaX(0);
  };

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
        className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-5 sm:px-8 py-4 bg-gradient-to-b from-black/90 to-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#E8DED0]/90 font-sans font-medium">
            {currentItem.category}
          </span>
          <span className="text-white/30">•</span>
          <span className="text-xs font-mono text-white/60 bg-white/10 px-2 py-0.5 rounded-full">
            {currentIndex + 1} / {items.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {currentItem.exif && (
            <button
              onClick={() => setShowExif((prev) => !prev)}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                showExif
                  ? "bg-[#FAF7F2] text-[#121212]"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
              title="Toggle Camera EXIF Settings (Shortcut: I)"
              aria-label="Toggle camera settings"
            >
              <Info className="w-5 h-5 stroke-[1.8]" />
            </button>
          )}

          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors focus:outline-none focus:ring-1 focus:ring-white/40 cursor-pointer"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6 stroke-[1.5]" />
          </button>
        </div>
      </div>

      {/* Main Image Stage with Touch Drag Support */}
      <div
        className="relative w-full h-[74vh] sm:h-[78vh] max-w-6xl mx-auto px-2 sm:px-12 flex items-center justify-center select-none"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="relative w-full h-full flex items-center justify-center transition-transform duration-150"
          style={{
            transform: touchDeltaX ? `translateX(${touchDeltaX * 0.4}px)` : undefined,
          }}
        >
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

      {/* Navigation Buttons (Desktop & Tablet) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        className="hidden sm:flex absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 text-white/80 hover:text-white bg-black/50 hover:bg-black/90 border border-white/15 rounded-full backdrop-blur-md transition-all cursor-pointer focus:outline-none hover:scale-105"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="hidden sm:flex absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 text-white/80 hover:text-white bg-black/50 hover:bg-black/90 border border-white/15 rounded-full backdrop-blur-md transition-all cursor-pointer focus:outline-none hover:scale-105"
        aria-label="Next image"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
      </button>

      {/* Bottom Information & EXIF Details Bar */}
      <div
        className="absolute bottom-0 left-0 right-0 z-30 px-5 sm:px-8 py-5 bg-gradient-to-t from-black via-black/80 to-transparent text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-2xl mx-auto space-y-2">
          <h3 className="text-lg sm:text-2xl font-serif text-[#FAF7F2] font-normal leading-snug">
            {currentItem.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#FAF7F2]/80 font-sans font-light line-clamp-2">
            {currentItem.description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-[#FAF7F2]/70 uppercase tracking-widest pt-0.5">
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#BFA076]" />
              {currentItem.location}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#BFA076]" />
              {currentItem.year}
            </span>
          </div>

          {/* Camera EXIF Metadata Strip */}
          {currentItem.exif && showExif && (
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2 transition-all duration-300">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/15 rounded-full text-[11px] text-[#FAF7F2] font-mono backdrop-blur-md">
                <Camera className="w-3 h-3 text-[#BFA076]" />
                <span>{currentItem.exif.camera}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/15 rounded-full text-[11px] text-[#FAF7F2] font-mono backdrop-blur-md">
                <Aperture className="w-3 h-3 text-[#BFA076]" />
                <span>{currentItem.exif.lens}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#BFA076]/20 border border-[#BFA076]/40 rounded-full text-[11px] text-[#FAF7F2] font-mono backdrop-blur-md">
                <Sliders className="w-3 h-3 text-[#BFA076]" />
                <span>{currentItem.exif.shutterSpeed}</span>
                <span>•</span>
                <span>{currentItem.exif.aperture}</span>
                <span>•</span>
                <span>{currentItem.exif.iso}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
