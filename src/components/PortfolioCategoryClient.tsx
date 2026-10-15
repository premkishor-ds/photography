"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Camera } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import BookingCtaBanner from "@/components/BookingCtaBanner";
import { useLanguage } from "@/context/LanguageContext";
import {
  PortfolioCategoryMeta,
  DetailedPortfolioItem,
  getLocalizedPortfolioCategory,
  getLocalizedDetailedPortfolioItems,
} from "@/data/portfolioData";

interface PortfolioCategoryClientProps {
  initialCategory: PortfolioCategoryMeta;
  initialItems: DetailedPortfolioItem[];
  allCategories: PortfolioCategoryMeta[];
}

export default function PortfolioCategoryClient({
  initialCategory,
  initialItems,
  allCategories,
}: PortfolioCategoryClientProps) {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  const category = getLocalizedPortfolioCategory(initialCategory, language);
  const items = getLocalizedDetailedPortfolioItems(initialItems, language);
  const otherCategories = allCategories
    .filter((c) => c.slug !== initialCategory.slug)
    .map((c) => getLocalizedPortfolioCategory(c, language));

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8">
      <Breadcrumbs
        items={[
          { name: isHindi ? "पोर्टफोलियो" : "Portfolio", url: "/portfolio" },
          { name: category.name, url: `/portfolio/${category.slug}` },
        ]}
      />

      {/* Category Banner */}
      <div className="py-12 sm:py-16 text-center max-w-4xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-[0.3em] text-[#7B6955] font-sans font-medium">
          {isHindi ? "क्यूरेटेड सीरीज" : "Curated Series"}
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-tight text-[#121212]">
          {category.title}
        </h1>
        <p className="text-base sm:text-lg text-[#554837] font-light max-w-2xl mx-auto leading-relaxed">
          {category.description}
        </p>
      </div>

      {/* Category Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, index) => (
          <article
            key={item.id}
            className="bg-white border border-[#E8DED0] shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-300"
          >
            <div className="relative aspect-[4/5] w-full bg-[#121212] overflow-hidden">
              <Image
                src={item.imageUrl}
                alt={item.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                loading={index < 3 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-white" />
            </div>

            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#7B6955] font-sans">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#BFA076]" />
                  {item.location}
                </span>
                <span>{item.year}</span>
              </div>

              <h2 className="font-serif text-xl sm:text-2xl text-[#121212] font-medium">
                {item.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#554837] leading-relaxed font-light">
                {item.description}
              </p>

              {item.technicalDetails && (
                <div className="pt-3 border-t border-[#F3ECE1] text-[11px] font-mono text-[#7B6955] flex items-center gap-2">
                  <Camera className="w-3 h-3" />
                  <span>{item.technicalDetails}</span>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Other Categories Nav */}
      <div className="my-16 p-8 bg-white border border-[#E8DED0] space-y-4">
        <h3 className="font-serif text-xl text-[#121212]">
          {isHindi ? "अन्य फोटोग्राफी विशेषज्ञताएं देखें" : "Explore Other Photography Specializations"}
        </h3>
        <div className="flex flex-wrap gap-2 pt-2">
          {otherCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/portfolio/${c.slug}`}
              className="px-4 py-2 text-xs uppercase tracking-wider bg-[#FAF7F2] border border-[#E8DED0] hover:border-[#121212] transition-colors"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Booking CTA */}
      <BookingCtaBanner
        title={isHindi ? `${category.name} कमीशन करें` : `Commission ${category.name}`}
        subtitle={
          isHindi
            ? "आइए आपके आगामी अभियान या उत्सव के लिए आकर्षक, कलात्मक विजुअल कहानियाँ तैयार करें।"
            : "Let's create striking, museum-grade visual stories for your upcoming campaign or celebration."
        }
        serviceName={category.name}
      />
    </div>
  );
}
