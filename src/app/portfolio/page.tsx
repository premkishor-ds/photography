import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import PortfolioPageClient from "@/components/PortfolioPageClient";
import { constructMetadata } from "@/lib/metadata";
import {
  generateWebPageSchema,
  generateImageGallerySchema,
} from "@/lib/schema";
import { ALL_PORTFOLIO_ITEMS } from "@/data/portfolioData";

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
        <PortfolioPageClient />
      </main>

      <Footer />
    </div>
  );
}
