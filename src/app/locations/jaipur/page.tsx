import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import JaipurLocationClient from "@/components/JaipurLocationClient";
import { constructMetadata } from "@/lib/metadata";
import {
  generateWebPageSchema,
  generatePhotographyBusinessSchema,
} from "@/lib/schema";

export const metadata = constructMetadata({
  title: "Jaipur Photography Studio & Services",
  description:
    "Flagship photography studio in Jaipur, Rajasthan (Room 215, Karolan Ka Barh, 302017). Royal palace weddings, portraits, sports, and commercial shoots.",
  path: "/locations/jaipur",
});

export default function JaipurLocationPage() {
  const webPageSchema = generateWebPageSchema(
    "/locations/jaipur",
    "Jaipur Photography Services & Flagship Studio",
    "Studio base and on-location photography across Jaipur, Karolan Ka Barh, Shri Kishanpura, Pink City heritage sites, and Rajasthan royal destinations."
  );

  const businessSchema = generatePhotographyBusinessSchema();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#121212]">
      <JsonLd data={webPageSchema} />
      <JsonLd data={businessSchema} />
      <Header />

      <main className="flex-1 pt-28 pb-20">
        <JaipurLocationClient />
      </main>

      <Footer />
    </div>
  );
}
