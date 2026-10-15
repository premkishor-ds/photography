import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import LocationsPageClient from "@/components/LocationsPageClient";
import { constructMetadata } from "@/lib/metadata";
import { generateWebPageSchema } from "@/lib/schema";

export const metadata = constructMetadata({
  title: "Studio Locations & Service Areas | Jaipur",
  description:
    "Flagship photography studio in Jaipur, Rajasthan (Room 215, Karolan Ka Barh, 302017) with coverage across Pink City, Rajasthan, and Pan-India.",
  path: "/locations",
});

export default function LocationsHubPage() {
  const webPageSchema = generateWebPageSchema(
    "/locations",
    "Photography Studio Locations & Service Areas",
    "Studio base in Jaipur, Rajasthan, regional coverage across Udaipur, Jodhpur, Jaisalmer, and Pan-India destination booking."
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#121212]">
      <JsonLd data={webPageSchema} />
      <Header />

      <main className="flex-1 pt-28 pb-20">
        <LocationsPageClient />
      </main>

      <Footer />
    </div>
  );
}
