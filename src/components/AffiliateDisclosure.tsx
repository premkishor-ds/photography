import React from "react";
import { Info } from "lucide-react";

interface AffiliateDisclosureProps {
  compact?: boolean;
}

export default function AffiliateDisclosure({ compact = false }: AffiliateDisclosureProps) {
  if (compact) {
    return (
      <p className="text-[11px] text-[#7B6955] font-sans flex items-center gap-1.5 leading-relaxed">
        <Info className="w-3.5 h-3.5 shrink-0 text-[#BFA076]" />
        <span>
          <strong>Transparency Notice:</strong> Some links may be affiliate links. We may earn a small referral commission at no added cost to you if you make a purchase.
        </span>
      </p>
    );
  }

  return (
    <aside
      aria-label="Affiliate Disclosure"
      className="p-5 sm:p-6 bg-[#F4EFE6] border border-[#E8DED0] text-[#121212] flex items-start gap-4"
    >
      <div className="w-8 h-8 rounded-full bg-[#EADCC8] text-[#554837] flex items-center justify-center shrink-0 mt-0.5">
        <Info className="w-4 h-4" />
      </div>
      <div className="space-y-1 text-xs sm:text-sm text-[#554837] leading-relaxed font-light">
        <h3 className="font-serif font-medium text-sm sm:text-base text-[#121212]">
          Affiliate & Transparency Disclosure
        </h3>
        <p>
          Some product links on this website may be affiliate links. If you choose to purchase equipment through these retailer links, we may receive a small referral commission from the retailer at zero additional cost to you.
        </p>
        <p className="text-[11px] text-[#7B6955] pt-1">
          Every piece of equipment highlighted in this guide is selected solely based on real-world utility, optical craftsmanship, and professional reliability. We never accept compensation to rank products favorably.
        </p>
      </div>
    </aside>
  );
}
