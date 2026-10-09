"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, Check, Clock, Calendar, ArrowRight, ShieldCheck } from "lucide-react";
import { ServiceItem } from "@/data/photographyData";

interface ServiceModalProps {
  service: ServiceItem | null;
  isOpen: boolean;
  onClose: () => void;
  onBookService: (serviceTitle: string) => void;
}

export default function ServiceModal({
  service,
  isOpen,
  onClose,
  onBookService,
}: ServiceModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !service) return null;

  const handleBook = () => {
    onClose();
    onBookService(service.title);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${service.title} details`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-all duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#FAF7F2] text-[#121212] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col my-auto border border-[#E8DED0]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 bg-black/40 hover:bg-black text-white rounded-full transition-colors focus:outline-none"
          aria-label="Close details"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        {/* Modal Scrollable Container */}
        <div className="overflow-y-auto">
          {/* Header Image Banner */}
          <div className="relative h-60 sm:h-72 w-full bg-[#121212]">
            <Image
              src={service.imageUrl}
              alt={service.title}
              fill
              className="object-cover object-center filter brightness-[0.85]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#E8DED0] font-sans">
                Service Package
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-normal mt-1">
                {service.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 font-sans mt-1 max-w-xl">
                {service.tagline}
              </p>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Quick Meta Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pb-6 border-b border-[#E8DED0]">
              <div className="bg-white p-3.5 border border-[#F3ECE1]">
                <div className="flex items-center gap-1.5 text-xs text-[#7B6955] uppercase tracking-wider font-sans">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Duration</span>
                </div>
                <p className="font-medium text-sm text-[#121212] mt-1">
                  {service.duration}
                </p>
              </div>

              <div className="bg-white p-3.5 border border-[#F3ECE1]">
                <div className="flex items-center gap-1.5 text-xs text-[#7B6955] uppercase tracking-wider font-sans">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Turnaround</span>
                </div>
                <p className="font-medium text-sm text-[#121212] mt-1">
                  {service.deliveryTime}
                </p>
              </div>

              <div className="col-span-2 sm:col-span-1 bg-white p-3.5 border border-[#F3ECE1]">
                <div className="flex items-center gap-1.5 text-xs text-[#7B6955] uppercase tracking-wider font-sans">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Rights</span>
                </div>
                <p className="font-medium text-sm text-[#121212] mt-1">
                  Full High-Res Rights
                </p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="font-serif text-lg text-[#121212] mb-2">About This Experience</h4>
              <p className="text-sm text-[#554837] leading-relaxed font-light">
                {service.detailedDescription}
              </p>
            </div>

            {/* Inclusions */}
            <div>
              <h4 className="font-serif text-lg text-[#121212] mb-3">What&apos;s Included</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {service.deliverables.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2C2C2C] font-sans"
                  >
                    <div className="w-4 h-4 rounded-full bg-[#121212] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ideal For */}
            <div className="bg-[#F3ECE1]/70 p-4 border-l-2 border-[#121212]">
              <p className="text-xs uppercase tracking-widest text-[#7B6955] font-sans font-medium">
                Ideal For
              </p>
              <p className="text-xs sm:text-sm text-[#121212] mt-1">
                {service.idealFor}
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E8DED0]">
              <p className="text-xs text-[#7B6955] font-sans">
                Custom requirements? Let&apos;s build a bespoke session.
              </p>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/2 sm:w-auto px-5 py-3 text-xs uppercase tracking-widest border border-[#D7C7B2] text-[#554837] hover:bg-white transition-colors"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleBook}
                  className="w-1/2 sm:w-auto px-6 py-3 text-xs uppercase tracking-widest bg-[#121212] text-white hover:bg-[#2C2C2C] transition-colors flex items-center justify-center gap-2 group font-medium"
                >
                  <span>Book This Service</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
