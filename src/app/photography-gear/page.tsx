import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import GearCard from "@/components/GearCard";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";
import JsonLd from "@/components/JsonLd";
import { constructMetadata } from "@/lib/metadata";
import { generateWebPageSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { fetchGearItems } from "@/lib/supabase";
import {
  GEAR_CATEGORIES,
  GEAR_COMPARISONS,
  GearCategory,
} from "@/data/gearData";
import { ArrowRight, SlidersHorizontal, Scale, ShieldCheck } from "lucide-react";

export const metadata = constructMetadata({
  title: "My Photography Gear | Cameras, Lenses & Audio Equipment",
  description:
    "Explore the cameras, lenses, audio equipment, and accessories I use for wildlife, sports, portraits, travel, and video creation.",
  path: "/photography-gear",
});

export default async function PhotographyGearHubPage() {
  const gearItems = await fetchGearItems();

  const webPageSchema = generateWebPageSchema(
    "/photography-gear",
    "My Photography Gear",
    "Explore the cameras, lenses, audio equipment, and accessories I use for wildlife, sports, portraits, travel, and video creation."
  );

  const breadcrumbsSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Photography Gear", url: "/photography-gear" },
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#121212]">
      <JsonLd data={webPageSchema} />
      <JsonLd data={breadcrumbsSchema} />
      <Header />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", url: "/" },
              { name: "Photography Gear", url: "/photography-gear" },
            ]}
          />

          {/* Hero Section with Exact Requested Title & Introduction */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-[#7B6955] font-sans font-medium mb-3">
              Equipment & Optics Inventory
            </p>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#121212]">
              My Photography Gear
            </h1>
            <p className="mt-5 text-base sm:text-xl text-[#3E3427] font-light leading-relaxed">
              Explore the cameras, lenses, audio equipment, and accessories I use for wildlife, sports, portraits, travel, and video creation.
            </p>
            <p className="mt-3 text-xs sm:text-sm text-[#7B6955] font-light leading-relaxed">
              Every equipment record clearly distinguishes verified manufacturer specifications from personal field applications. Unknown or unverified technical parameters are intentionally preserved as unconfirmed without fabrication.
            </p>
          </div>

          {/* Affiliate Disclosure Notice */}
          <div className="mb-14">
            <AffiliateDisclosure />
          </div>

          {/* Category Jump Anchor Bar */}
          <div className="mb-16 pb-4 border-b border-[#E8DED0] flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-xs uppercase tracking-wider text-[#7B6955] font-sans font-medium flex items-center gap-1.5 mr-2 shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Jump to:
            </span>
            {GEAR_CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="text-xs uppercase tracking-wider px-3.5 py-1.5 bg-white border border-[#E8DED0] text-[#121212] hover:bg-[#121212] hover:text-[#FAF7F2] transition-colors shrink-0"
              >
                {cat.label}
              </a>
            ))}
            <a
              href="#comparisons"
              className="text-xs uppercase tracking-wider px-3.5 py-1.5 bg-[#F4EFE6] border border-[#D7C7B2] text-[#554837] hover:bg-[#121212] hover:text-[#FAF7F2] transition-colors shrink-0 flex items-center gap-1"
            >
              <Scale className="w-3 h-3" /> Comparisons
            </a>
          </div>

          {/* Categorized Equipment Showcase (7 Organized Categories) */}
          <div className="space-y-24">
            {GEAR_CATEGORIES.map((cat, idx) => {
              const categoryItems = gearItems.filter((item) => item.category === cat.id && item.published);
              if (categoryItems.length === 0) return null;

              return (
                <section key={cat.id} id={cat.id} className="scroll-mt-32">
                  <div className="max-w-2xl mb-8">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-[#7B6955] font-sans font-medium">
                      Category 0{idx + 1}
                    </span>
                    <h2 className="font-serif text-2xl sm:text-4xl font-light text-[#121212] mt-1">
                      {cat.label}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#554837] font-light mt-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categoryItems.map((item) => (
                      <GearCard key={item.id} item={item} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          {/* Equipment Comparisons Section */}
          <section id="comparisons" className="mt-28 pt-16 border-t border-[#E8DED0] scroll-mt-32">
            <div className="max-w-2xl mb-10">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#7B6955] font-sans font-medium flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-[#BFA076]" /> Side-by-Side Analysis
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#121212] mt-1">
                Equipment Comparisons
              </h2>
              <p className="text-xs sm:text-sm text-[#554837] font-light mt-2 leading-relaxed">
                Objective technical comparisons exploring real-world trade-offs, weight profiles, and optics decisions in the field.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {GEAR_COMPARISONS.map((comp) => (
                <article
                  key={comp.slug}
                  className="bg-white border border-[#E8DED0] p-6 sm:p-8 flex flex-col justify-between hover:border-[#BFAB93] transition-colors group"
                >
                  <div className="space-y-4">
                    <span className="text-[10px] uppercase tracking-widest text-[#7B6955] font-sans font-medium">
                      Technical Face-Off
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#121212] group-hover:text-[#7B6955] transition-colors leading-snug">
                      <Link href={`/photography-gear/comparisons/${comp.slug}`}>
                        {comp.title}
                      </Link>
                    </h3>
                    <p className="text-xs sm:text-sm text-[#554837] leading-relaxed font-light">
                      {comp.description}
                    </p>
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-2 text-xs text-[#2C2C2C] font-mono">
                      <span className="px-2.5 py-1 bg-[#FAF7F2] border border-[#E8DED0]">
                        {comp.itemA.name}
                      </span>
                      <span className="text-[#9E8870] font-sans">vs.</span>
                      <span className="px-2.5 py-1 bg-[#FAF7F2] border border-[#E8DED0]">
                        {comp.itemB.name}
                      </span>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#F3ECE1]">
                    <Link
                      href={`/photography-gear/comparisons/${comp.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-medium text-[#121212] hover:text-[#7B6955] transition-colors group/link"
                    >
                      <span>Read Field Comparison</span>
                      <ArrowRight className="w-3.5 h-3.5 group-link-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
