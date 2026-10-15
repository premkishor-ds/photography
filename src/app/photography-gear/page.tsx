import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import PhotographyGearClient from "@/components/PhotographyGearClient";
import { constructMetadata } from "@/lib/metadata";
import { generateWebPageSchema } from "@/lib/schema";
import { fetchGearItems } from "@/lib/supabase";

export const metadata = constructMetadata({
  title: "Studio Equipment & Gear Inventory",
  description:
    "Explore the cameras, lenses, audio equipment, and accessories I use for wildlife, sports, portraits, travel, and video creation.",
  path: "/photography-gear",
});

export const revalidate = 3600;

export default async function PhotographyGearHubPage() {
  const gearItems = await fetchGearItems();

  const webPageSchema = generateWebPageSchema(
    "/photography-gear",
    "My Photography Gear",
    "Explore the cameras, lenses, audio equipment, and accessories I use for wildlife, sports, portraits, travel, and video creation."
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#121212]">
      <JsonLd data={webPageSchema} />
      <Header />

      <main className="flex-1 pt-28 pb-20">
        <PhotographyGearClient gearItems={gearItems} />
      </main>

      <Footer />
    </div>
  );
}
