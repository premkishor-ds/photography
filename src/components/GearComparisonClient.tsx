"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";
import { GearComparison, getLocalizedGearComparison } from "@/data/gearData";
import { useLanguage } from "@/context/LanguageContext";
import { Scale, ArrowRight, Compass } from "lucide-react";

interface GearComparisonClientProps {
  comp: GearComparison;
}

export default function GearComparisonClient({ comp }: GearComparisonClientProps) {
  const { t, language } = useLanguage();
  const isHindi = language === "hi";
  const c = getLocalizedGearComparison(comp, language);

  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-8">
      <Breadcrumbs
        items={[
          {
            name: t("gear.title", "Photography Gear"),
            url: "/photography-gear",
          },
          {
            name: isHindi ? "उपकरण तुलना" : "Comparison",
            url: `/photography-gear/comparisons/${c.slug}`,
          },
        ]}
      />

      {/* Article Header */}
      <header className="mb-10 sm:mb-12">
        <span className="text-xs uppercase tracking-[0.25em] text-[#7B6955] font-sans font-medium flex items-center gap-1.5 mb-2">
          <Scale className="w-3.5 h-3.5 text-[#BFA076]" />{" "}
          {isHindi ? "उपकरण तुलनात्मक गाइड" : "Equipment Comparison Guide"}
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#121212] leading-tight">
          {c.title}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-[#554837] font-light leading-relaxed max-w-3xl">
          {c.description}
        </p>
      </header>

      {/* Hero Image */}
      <div className="relative aspect-[16/9] w-full bg-[#F3ECE1] overflow-hidden border border-[#E8DED0] mb-12 shadow-sm">
        <Image
          src={comp.heroImage}
          alt={comp.heroAlt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-cover"
        />
      </div>

      {/* Affiliate Disclosure */}
      <div className="mb-12">
        <AffiliateDisclosure />
      </div>

      {/* Side-by-Side Contenders Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
        {/* Contender A */}
        <div className="p-7 bg-white border border-[#E8DED0] space-y-3">
          <span className="text-[10px] uppercase tracking-wider text-[#7B6955] font-sans font-medium">
            {isHindi ? "विकल्प ए" : "Option A"} ({c.itemA.category})
          </span>
          <h2 className="font-serif text-2xl text-[#121212] font-normal">
            {c.itemA.slug ? (
              <Link
                href={`/photography-gear/${c.itemA.slug}`}
                prefetch={false}
                className="hover:text-[#7B6955] transition-colors"
              >
                {c.itemA.name}
              </Link>
            ) : (
              c.itemA.name
            )}
          </h2>
          <p className="text-xs sm:text-sm text-[#554837] font-light leading-relaxed">
            {c.itemA.highlight}
          </p>
        </div>

        {/* Contender B */}
        <div className="p-7 bg-white border border-[#E8DED0] space-y-3">
          <span className="text-[10px] uppercase tracking-wider text-[#7B6955] font-sans font-medium">
            {isHindi ? "विकल्प बी" : "Option B"} ({c.itemB.category})
          </span>
          <h2 className="font-serif text-2xl text-[#121212] font-normal">
            {c.itemB.slug ? (
              <Link
                href={`/photography-gear/${c.itemB.slug}`}
                prefetch={false}
                className="hover:text-[#7B6955] transition-colors"
              >
                {c.itemB.name}
              </Link>
            ) : (
              c.itemB.name
            )}
          </h2>
          <p className="text-xs sm:text-sm text-[#554837] font-light leading-relaxed">
            {c.itemB.highlight}
          </p>
        </div>
      </div>

      {/* 1. Technical Summary */}
      <section className="mb-14 space-y-4">
        <h2 className="font-serif text-2xl sm:text-3xl text-[#121212] font-normal">
          {isHindi ? "संक्षिप्त तकनीकी सारांश" : "Executive Technical Summary"}
        </h2>
        <div className="p-6 bg-white border border-[#E8DED0]">
          <p className="text-sm sm:text-base text-[#3E3427] font-light leading-relaxed">
            {c.summary}
          </p>
        </div>
      </section>

      {/* 2. Side-by-Side Specs Table */}
      <section className="mb-14 space-y-4">
        <h2 className="font-serif text-2xl sm:text-3xl text-[#121212] font-normal">
          {isHindi ? "विशेषताओं की प्रत्यक्ष तुलना" : "Side-by-Side Feature Comparison"}
        </h2>
        <div className="overflow-x-auto border border-[#E8DED0] bg-white">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#FAF7F2] border-b border-[#E8DED0] text-[#121212] uppercase tracking-wider text-[11px] font-sans font-medium">
              <tr>
                <th className="p-4">{isHindi ? "विशेषता" : "Technical Feature"}</th>
                <th className="p-4 border-l border-[#E8DED0]">{c.itemA.name}</th>
                <th className="p-4 border-l border-[#E8DED0]">{c.itemB.name}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3ECE1]">
              {c.specComparison.map((row, i) => (
                <tr key={i} className="hover:bg-[#FCFAF6] transition-colors">
                  <td className="p-4 font-medium text-[#121212]">{row.feature}</td>
                  <td className="p-4 border-l border-[#E8DED0] text-[#554837] font-light">
                    {row.itemAValue}
                  </td>
                  <td className="p-4 border-l border-[#E8DED0] text-[#554837] font-light">
                    {row.itemBValue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Trade-off Analysis & Operational Recommendation */}
      <section className="mb-14 space-y-4">
        <h2 className="font-serif text-2xl sm:text-3xl text-[#121212] font-normal flex items-center gap-2">
          <Compass className="w-5 h-5 text-[#BFA076]" />{" "}
          {isHindi ? "व्यावहारिक सुझाव एवं निर्णय" : "Practical Recommendation & Verdict"}
        </h2>
        <div className="p-6 bg-white border border-[#E8DED0] space-y-4">
          <p className="text-sm sm:text-base text-[#3E3427] font-light leading-relaxed">
            {c.tradeOffAnalysis}
          </p>
          <div className="p-4 bg-[#FAF7F2] border-l-2 border-[#BFA076]">
            <p className="text-xs uppercase tracking-wider text-[#7B6955] font-sans font-medium mb-1">
              {isHindi ? "अंतिम निष्कर्ष:" : "Studio Verdict:"}
            </p>
            <p className="text-xs sm:text-sm text-[#121212] font-medium leading-relaxed">
              {c.practicalRecommendation}
            </p>
          </div>
        </div>
      </section>

      {/* Back to Gear Hub */}
      <div className="pt-10 border-t border-[#E8DED0] text-center">
        <Link
          href="/photography-gear"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#121212] text-[#FAF7F2] hover:bg-[#2C2C2C] text-xs uppercase tracking-[0.2em] font-medium transition-colors"
        >
          <span>{isHindi ? "सभी फोटोग्राफी उपकरण देखें" : "Return to Photography Gear Hub"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
