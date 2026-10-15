"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, Quote, CheckCircle, MapPin, Calendar, ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/config/siteConfig";

interface Testimonial {
  id: string;
  clientName: string;
  eventTitle: string;
  category: "Weddings" | "Portraits" | "Events" | "All";
  location: string;
  year: string;
  rating: number;
  reviewText: string;
  verified: boolean;
  avatarUrl?: string;
  imagePreview?: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "rev-1",
    clientName: "Aanya & Devraj Rathore",
    eventTitle: "3-Day Royal Wedding Celebration",
    category: "Weddings",
    location: "City Palace & Rambagh Palace, Jaipur",
    year: "2026",
    rating: 5,
    reviewText:
      "Kishor and his team captured our palace wedding with the sensitivity of documentary filmmakers and the aesthetic precision of high-fashion editorialists. Looking through our albums brings back every teardrop, royal pheras, and midnight celebration in vivid emotion.",
    verified: true,
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    imagePreview: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "rev-2",
    clientName: "Dr. Vikram Singhania",
    eventTitle: "Fine-Art Executive & Literary Portrait",
    category: "Portraits",
    location: "Flagship Studio, Jaipur",
    year: "2026",
    rating: 5,
    reviewText:
      "I am notoriously uncomfortable in front of cameras, but Kishor's thoughtful conversation, gentle direction, and subtle studio lighting made the session completely effortless. The resulting portraits have redefined my international keynote presence.",
    verified: true,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    imagePreview: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "rev-3",
    clientName: "Sonia & Kabir Merchant",
    eventTitle: "Sunset Lake Destination Wedding",
    category: "Weddings",
    location: "Jagmandir Island Palace, Udaipur",
    year: "2026",
    rating: 5,
    reviewText:
      "From our pre-wedding boat session on Lake Pichola to the final palace fireworks, every frame feels timeless. The speed of photo delivery and color science on our silk lehengas was beyond breathtaking.",
    verified: true,
    avatarUrl: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=200&q=80",
    imagePreview: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "rev-4",
    clientName: "Jaipur Literature & Cultural Summit",
    eventTitle: "Annual Keynote & Heritage Gala",
    category: "Events",
    location: "Diggi Palace, Jaipur",
    year: "2026",
    rating: 5,
    reviewText:
      "Reliability under dynamic stage lights and discretion around dignitaries is essential for our summits. Kishor's documentation delivered breathtaking press selects within hours and an unforgettable archival collection.",
    verified: true,
    avatarUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=200&q=80",
    imagePreview: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
  },
];

export default function TestimonialsSection() {
  const { t, language } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<"All" | "Weddings" | "Portraits" | "Events">("All");

  const filteredTestimonials =
    selectedFilter === "All"
      ? TESTIMONIALS
      : TESTIMONIALS.filter((t) => t.category === selectedFilter);

  return (
    <section className="py-20 sm:py-28 bg-[#FAF7F2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header with Aggregate Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#121212] text-[#FAF7F2] text-[11px] uppercase tracking-[0.2em] font-sans font-medium">
              <Star className="w-3 h-3 fill-[#BFA076] text-[#BFA076]" />
              <span>{t("testimonials.badge", "Client Words & Recognition")}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#121212] tracking-tight">
              {t("testimonials.title", "Stories Entrusted to Our Lens")}
            </h2>

            <p className="text-sm sm:text-base text-[#554837] font-light leading-relaxed">
              {t(
                "testimonials.desc",
                "Over a decade of documenting royal celebrations, artistic milestones, and intimate family legacies across Rajasthan and worldwide."
              )}
            </p>
          </div>

          {/* Social Proof Aggregate Pill */}
          <div className="p-4 sm:p-5 bg-white border border-[#E8DED0] shadow-sm flex items-center gap-4 shrink-0">
            <div className="flex flex-col items-center justify-center pr-4 border-r border-[#E8DED0]">
              <span className="font-serif text-3xl font-normal text-[#121212]">4.98</span>
              <div className="flex text-[#BFA076]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider font-sans font-semibold text-[#121212]">
                100% 5-Star Reviews
              </p>
              <p className="text-[11px] text-[#7B6955] font-light">
                140+ Verified Royal Weddings & Shoots
              </p>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {(["All", "Weddings", "Portraits", "Events"] as const).map((cat) => {
            const isActive = selectedFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-1.5 text-xs uppercase tracking-widest font-sans transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#121212] text-[#FAF7F2] font-medium"
                    : "bg-white text-[#554837] hover:bg-[#F3ECE1] border border-[#E8DED0]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#E8DED0] p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-shadow relative"
            >
              {/* Quote icon watermark */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-[#F3ECE1] stroke-[1] pointer-events-none" />

              <div className="space-y-4 relative z-10">
                {/* Rating stars & verified badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex text-[#BFA076]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  {item.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#7B6955] font-sans font-medium">
                      <CheckCircle className="w-3 h-3 text-[#BFA076]" />
                      <span>Verified Client</span>
                    </span>
                  )}
                </div>

                {/* Review Text */}
                <p className="font-serif text-base sm:text-lg text-[#121212] font-light leading-relaxed italic">
                  "{item.reviewText}"
                </p>
              </div>

              {/* Client Info & Location */}
              <div className="pt-4 border-t border-[#F3ECE1] flex items-center justify-between gap-3 relative z-10">
                <div>
                  <h4 className="font-sans text-sm font-semibold text-[#121212]">
                    {item.clientName}
                  </h4>
                  <p className="text-xs text-[#7B6955] font-light mt-0.5">
                    {item.eventTitle}
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-[#9E8870] font-sans mt-1">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#BFA076]" />
                      {item.location}
                    </span>
                    <span>•</span>
                    <span>{item.year}</span>
                  </div>
                </div>

                {/* Optional shoot thumbnail */}
                {item.imagePreview && (
                  <div className="relative w-14 h-14 rounded-xs overflow-hidden border border-[#E8DED0] shrink-0">
                    <Image
                      src={item.imagePreview}
                      alt={item.eventTitle}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
