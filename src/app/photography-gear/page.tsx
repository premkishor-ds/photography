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
import {
  GEAR_CATEGORIES,
  GEAR_ITEMS,
  GEAR_COMPARISONS,
  GearCategory,
} from "@/data/gearData";
import { ArrowRight, SlidersHorizontal, Scale } from "lucide-react";

export const metadata = constructMetadata({
  title: "My Photography Gear | Cameras, Lenses & Audio",
  description:
    "Discover the cameras, lenses, audio equipment, and photography accessories I use for capturing portraits, wildlife, sports, landscapes, and travel moments.",
  path: "/photography-gear",
});

export default function PhotographyGearHubPage() {
  const webPageSchema = generateWebPageSchema(
    "/photography-gear",
    "My Photography Gear",
    "Discover the cameras, lenses, audio equipment, and photography accessories used for capturing portraits, wildlife, sports, landscapes, and travel moments."
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

          {/* Hero Section */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-[#7B6955] font-sans font-medium mb-3">
              Equipment & Optics
            </p>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#121212]">
              My Photography Gear
            </h1>
            <p className="mt-5 text-base sm:text-lg text-[#554837] font-light leading-relaxed">
              Discover the cameras, lenses, audio equipment, and photography accessories I use for capturing portraits, wildlife, sports, landscapes, and travel moments.
            </p>
            <p className="mt-3 text-xs sm:text-sm text-[#7B6955] font-light">
              We only highlight equipment based on genuine utility and craftsmanship. Every observation distinguishes verified hands-on field experience from manufacturer specifications.
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

          {/* Categorized Equipment Showcase */}
          <div className="space-y-24">
            {GEAR_CATEGORIES.map((cat) => {
              const categoryItems = GEAR_ITEMS.filter((item) => item.category === cat.id);
              if (categoryItems.length === 0) return null;

              return (
                <section key={cat.id} id={cat.id} className="scroll-mt-32">
                  <div className="max-w-2xl mb-8">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-[#7B6955] font-sans font-medium">
                      Category
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
              <h2 className="font-serif text-2xl sm:text-4xl font-light text-[#121212] mt-1">
                Equipment Comparisons
              </h2>
              <p className="text-xs sm:text-sm text-[#554837] font-light mt-2 leading-relaxed">
                Detailed head-to-head technical breakdowns exploring optical specifications, ergonomic trade-offs, and practical field recommendations without bias.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {GEAR_COMPARISONS.map((comp) => (
                <article
                  key={comp.slug}
                  className="bg-white border border-[#E8DED0] p-7 sm:p-8 flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-[#7B6955]">
                      <span className="uppercase tracking-wider font-sans font-medium">
                        Head-to-Head Comparison
                      </span>
                      <span>{comp.specComparison.length} Specs Analyzed</span>
                    </div>

                    <h3 className="font-serif text-2xl text-[#121212] font-normal leading-snug">
                      <Link
                        href={`/photography-gear/comparisons/${comp.slug}`}
                        className="hover:text-[#7B6955] transition-colors"
                      >
                        {comp.title}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-[#554837] font-light leading-relaxed">
                      {comp.description}
                    </p>

                    {/* Quick Highlight Points */}
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#F3ECE1] text-xs">
                      <div className="p-3 bg-[#FAF7F2]">
                        <p className="font-medium text-[#121212] truncate">{comp.itemA.name}</p>
                        <p className="text-[11px] text-[#7B6955] font-light mt-1">{comp.itemA.highlight}</p>
                      </div>
                      <div className="p-3 bg-[#FAF7F2]">
                        <p className="font-medium text-[#121212] truncate">{comp.itemB.name}</p>
                        <p className="text-[11px] text-[#7B6955] font-light mt-1">{comp.itemB.highlight}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#F3ECE1]">
                    <Link
                      href={`/photography-gear/comparisons/${comp.slug}`}
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-[#121212] hover:text-[#7B6955] transition-colors group/comp"
                    >
                      <span>Read Full Comparison & Trade-Offs</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/comp:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Portfolio & Field Connection Callout */}
          <div className="mt-24 p-8 sm:p-12 bg-[#F4EFE6] border border-[#E8DED0] flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left max-w-xl">
              <h3 className="font-serif text-2xl sm:text-3xl text-[#121212]">
                See This Gear in Action
              </h3>
              <p className="text-xs sm:text-sm text-[#554837] font-light leading-relaxed">
                Explore our portfolio collections to see full-resolution photographs captured with these exact camera bodies and telephoto lenses across wildlife, track sports, and studio portraits.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href="/portfolio/sports"
                className="px-5 py-3 text-xs uppercase tracking-widest bg-[#121212] text-[#FAF7F2] hover:bg-[#2C2C2C] transition-colors"
              >
                Sports Gallery
              </Link>
              <Link
                href="/portfolio/nature-wildlife"
                className="px-5 py-3 text-xs uppercase tracking-widest border border-[#121212] text-[#121212] hover:bg-[#121212] hover:text-[#FAF7F2] transition-colors"
              >
                Wildlife Gallery
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
