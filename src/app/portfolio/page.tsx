import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, ZoomIn } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import BookingCtaBanner from "@/components/BookingCtaBanner";
import PortfolioGallery from "@/components/PortfolioGallery";
import JsonLd from "@/components/JsonLd";
import { constructMetadata } from "@/lib/metadata";
import {
  generateWebPageSchema,
  generateImageGallerySchema,
} from "@/lib/schema";
import {
  PORTFOLIO_CATEGORIES_META,
  ALL_PORTFOLIO_ITEMS,
} from "@/data/portfolioData";

export const metadata = constructMetadata({
  title: "Photography Portfolio & Works",
  description:
    "Curated collection of editorial portraiture, candid wedding vows, corporate events, high-speed sports, and natural landscapes captured worldwide.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  const webPageSchema = generateWebPageSchema(
    "/portfolio",
    "Photography Portfolio Gallery",
    "Selected photographic works spanning portraits, weddings, events, sports, and natural landscapes."
  );

  const gallerySchema = generateImageGallerySchema(ALL_PORTFOLIO_ITEMS);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#121212]">
      <JsonLd data={webPageSchema} />
      <JsonLd data={gallerySchema} />
      <Header />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <Breadcrumbs items={[{ name: "Portfolio", url: "/portfolio" }]} />

          {/* Portfolio Hero */}
          <div className="py-12 sm:py-16 text-center max-w-4xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] text-[#7B6955] font-sans font-medium">
              Curated Collections
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-tight text-[#121212]">
              Photography Portfolio Gallery
            </h1>
            <p className="text-base sm:text-lg text-[#554837] font-light max-w-2xl mx-auto leading-relaxed">
              Explore our comprehensive collections below, organized by specialization. Click any category to view dedicated project series, camera specifications, and high-resolution galleries.
            </p>
          </div>

          {/* Crawlable Category Navigation Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-16">
            {PORTFOLIO_CATEGORIES_META.map((cat) => (
              <Link
                key={cat.slug}
                href={`/portfolio/${cat.slug}`}
                className="group relative aspect-[3/4] overflow-hidden bg-[#121212] border border-[#E8DED0] block"
              >
                <Image
                  src={cat.heroImage}
                  alt={cat.heroAlt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover object-center filter brightness-[0.75] transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-3.5 text-white">
                  <h2 className="font-serif text-sm sm:text-base font-normal leading-tight group-hover:text-[#E8DED0] transition-colors">
                    {cat.name}
                  </h2>
                  <span className="text-[10px] uppercase tracking-wider text-white/70 font-sans mt-1">
                    Explore →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Interactive Filterable Gallery Component */}
          <PortfolioGallery />

          {/* Booking CTA */}
          <BookingCtaBanner
            title="Inspired by Our Visual Direction?"
            subtitle="Let's discuss how we can create timeless, high-impact imagery for your project or celebration."
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
