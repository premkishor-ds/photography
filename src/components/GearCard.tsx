import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Layers, ShieldCheck, Camera, Sparkles } from "lucide-react";
import { GearItem } from "@/data/gearData";

interface GearCardProps {
  item: GearItem;
}

export default function GearCard({ item }: GearCardProps) {
  const shortDescription = item.description || item.overview || "";
  const primaryUses = (item.primaryUses && item.primaryUses.length > 0)
    ? item.primaryUses
    : (item.bestFor || []);
  const portfolioLinks = item.relatedPortfolioUrls || (
    item.relatedPortfolioSlug
      ? [{ label: item.relatedPortfolioCategory || "Portfolio", url: item.relatedPortfolioSlug }]
      : []
  );
  const reviewLink = item.reviewUrl || (item.slug ? `/photography-gear/${item.slug}` : null);

  return (
    <article
      id={item.slug}
      className="bg-white border border-[#E8DED0] flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:border-[#BFAB93] group"
    >
      <div>
        {/* Product Image Container */}
        {item.imageUrl ? (
          <div className="relative aspect-[16/10] w-full bg-[#121212] overflow-hidden border-b border-[#F3ECE1]">
            <Image
              src={item.imageUrl}
              alt={item.imageAlt || item.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
            
            {/* Category Badge & Verification Status */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
              <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 bg-[#121212]/90 text-[#FAF7F2] backdrop-blur-xs font-medium">
                {item.categoryLabel}
              </span>
              {item.ownershipStatus && (
                <span className="text-[10px] tracking-wider px-2 py-0.5 bg-[#FAF7F2]/95 text-[#554837] border border-[#E8DED0] backdrop-blur-xs font-mono font-medium">
                  {item.ownershipStatus}
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="relative aspect-[16/10] w-full bg-[#F4EFE6] border-b border-[#E8DED0] flex flex-col items-center justify-center p-6 text-center text-[#7B6955]">
            <Camera className="w-8 h-8 stroke-[1.2] opacity-60 mb-2" />
            <span className="text-xs uppercase tracking-widest font-sans font-medium">
              Image Pending Verification
            </span>
          </div>
        )}

        {/* Card Body */}
        <div className="p-6 sm:p-7 space-y-5">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between gap-2">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#7B6955] font-sans font-medium">
                {item.manufacturer}
              </p>
              {item.modelNumber && (
                <span className="text-[10px] font-mono text-[#9E8870] bg-[#FAF7F2] px-2 py-0.5 border border-[#E8DED0]">
                  {item.modelNumber}
                </span>
              )}
            </div>
            
            <h3 className="font-serif text-2xl text-[#121212] font-normal mt-1 leading-snug">
              {reviewLink ? (
                <Link href={reviewLink} className="hover:text-[#7B6955] transition-colors">
                  {item.name}
                </Link>
              ) : (
                <span>{item.name}</span>
              )}
            </h3>
            
            <p className="text-xs uppercase tracking-wider text-[#BFA076] font-sans font-medium mt-1">
              {item.categoryLabel}
            </p>
          </div>

          {/* Short Description */}
          {shortDescription && (
            <p className="text-xs sm:text-sm text-[#554837] leading-relaxed font-light">
              {shortDescription}
            </p>
          )}

          {/* Main Use Cases */}
          {primaryUses.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <p className="text-[10px] uppercase tracking-widest text-[#7B6955] font-sans font-medium">
                Primary Use Cases
              </p>
              <div className="flex flex-wrap gap-1.5">
                {primaryUses.map((use, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2.5 py-1 bg-[#F4EFE6] text-[#554837] border border-[#E8DED0] rounded-xs font-light"
                  >
                    {use}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Compatibility Information */}
          {item.compatibility && (
            <div className="p-3 bg-[#FAF7F2] border border-[#E8DED0] space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-[#7B6955] font-sans font-medium flex items-center gap-1.5">
                <Layers className="w-3 h-3 text-[#BFA076]" />
                <span>Compatibility & System</span>
              </p>
              <p className="text-xs text-[#3E3427] font-light leading-relaxed">
                {item.compatibility}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer: Detailed Review Link & Relevant Portfolio Projects */}
      <div className="px-6 pb-6 pt-3 border-t border-[#F3ECE1] space-y-3 bg-[#FCFAF6]/60">
        {/* Action Row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {reviewLink ? (
            <Link
              href={reviewLink}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-medium text-[#121212] hover:text-[#7B6955] transition-colors group/btn py-1.5"
            >
              <span>View Detailed Specs & Field Review</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <span className="text-[11px] text-[#9E8870] font-sans italic">
              Review undergoing field verification
            </span>
          )}
        </div>

        {/* Relevant Portfolio Links (Only when available) */}
        {portfolioLinks.length > 0 && (
          <div className="pt-2 border-t border-[#F0E8DC] flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider text-[#7B6955] font-sans">
              Relevant Work:
            </span>
            <div className="flex flex-wrap gap-2">
              {portfolioLinks.map((p, idx) => (
                <Link
                  key={idx}
                  href={p.url}
                  className="text-[11px] text-[#121212] hover:text-[#BFA076] underline underline-offset-2 transition-colors font-sans"
                >
                  {p.label} →
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
