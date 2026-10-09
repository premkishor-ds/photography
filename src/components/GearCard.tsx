import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, AlertTriangle, ExternalLink, ShieldCheck } from "lucide-react";
import { GearItem } from "@/data/gearData";

interface GearCardProps {
  item: GearItem;
}

export default function GearCard({ item }: GearCardProps) {
  const primaryRetailer = item.retailerLinks?.[0];

  return (
    <article
      id={item.slug}
      className="bg-white border border-[#E8DED0] flex flex-col justify-between transition-shadow hover:shadow-md"
    >
      <div>
        {/* Product Image Container */}
        <div className="relative aspect-[16/10] w-full bg-[#F3ECE1] overflow-hidden border-b border-[#F3ECE1]">
          <Image
            src={item.imageUrl}
            alt={item.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 bg-[#121212]/90 text-[#FAF7F2] backdrop-blur-sm font-medium">
              {item.categoryLabel}
            </span>
            {item.isPersonallyVerified && (
              <span className="inline-flex items-center gap-1 text-[10px] tracking-wider px-2 py-1 bg-[#FAF7F2]/95 text-[#554837] border border-[#E8DED0] backdrop-blur-sm">
                <ShieldCheck className="w-3 h-3 text-[#2E7D32]" />
                Personally Used
              </span>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-7 space-y-5">
          {/* Header */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#7B6955] font-sans font-medium">
              {item.manufacturer}
            </p>
            <h3 className="font-serif text-2xl text-[#121212] font-normal mt-0.5">
              <Link href={`/photography-gear/${item.slug}`} className="hover:text-[#7B6955] transition-colors">
                {item.name}
              </Link>
            </h3>
            <p className="text-xs text-[#7B6955] font-light mt-1">
              {item.tagline}
            </p>
          </div>

          {/* Overview */}
          <p className="text-xs sm:text-sm text-[#554837] leading-relaxed font-light">
            {item.overview}
          </p>

          {/* Hands-on Usage Insight */}
          {item.personalUsage && (
            <div className="p-3.5 bg-[#FAF7F2] border-l-2 border-[#BFA076] text-xs text-[#3E3427] font-light italic leading-relaxed">
              &ldquo;{item.personalUsage}&rdquo;
            </div>
          )}

          {/* Situations where useful */}
          <div className="space-y-1.5 pt-1">
            <p className="text-[10px] uppercase tracking-widest text-[#7B6955] font-sans font-medium">
              Where It Excels
            </p>
            <div className="flex flex-wrap gap-1.5">
              {item.bestFor.slice(0, 2).map((use, i) => (
                <span
                  key={i}
                  className="text-[11px] px-2.5 py-1 bg-[#F4EFE6] text-[#554837] rounded-sm font-light"
                >
                  {use}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Pros / Cons Snippets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs border-t border-[#F3ECE1]">
            <div className="space-y-1.5">
              <p className="text-[10px] uppercase tracking-wider text-[#2E7D32] font-sans font-medium flex items-center gap-1">
                <Check className="w-3 h-3" /> Key Advantage
              </p>
              <p className="text-[11px] text-[#554837] leading-tight font-light">
                {item.pros[0]}
              </p>
            </div>
            <div className="space-y-1.5">
              <p className="text-[10px] uppercase tracking-wider text-[#C62828] font-sans font-medium flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Limitation
              </p>
              <p className="text-[11px] text-[#554837] leading-tight font-light">
                {item.cons[0]}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="px-6 pb-6 pt-2 border-t border-[#F3ECE1] space-y-3">
        <div className="flex items-center justify-between gap-3">
          <Link
            href={`/photography-gear/${item.slug}`}
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-medium text-[#121212] hover:text-[#7B6955] transition-colors group/btn py-2"
          >
            <span>Read My Review</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>

          {primaryRetailer && (
            <a
              href={primaryRetailer.url}
              target="_blank"
              rel={primaryRetailer.isAffiliate ? "sponsored nofollow noopener" : "nofollow noopener"}
              className="text-[11px] uppercase tracking-wider px-3 py-1.5 border border-[#121212] text-[#121212] hover:bg-[#121212] hover:text-[#FAF7F2] transition-colors flex items-center gap-1"
            >
              <span>Check Price</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        {primaryRetailer?.isAffiliate && (
          <p className="text-[10px] text-[#887766] font-sans">
            *Sponsored retailer link
          </p>
        )}
      </div>
    </article>
  );
}
