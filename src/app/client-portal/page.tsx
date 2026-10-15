import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ClientProofingClient from "@/components/ClientProofingClient";
import JsonLd from "@/components/JsonLd";
import { constructMetadata } from "@/lib/metadata";
import { generateWebPageSchema } from "@/lib/schema";

export const metadata = constructMetadata({
  title: "Private Client Proofing & Selection Gallery",
  description:
    "Secure online proofing portal for studio clients to review shoot photos, mark album selections, and submit retouching notes.",
  path: "/client-portal",
  noIndex: true, // Safeguard client privacy from search engine indexes
});

export default function ClientPortalPage() {
  const webPageSchema = generateWebPageSchema(
    "/client-portal",
    "Private Client Proofing Gallery",
    "Secure studio gallery for client photo review and album selection."
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#121212]">
      <JsonLd data={webPageSchema} />
      <Header />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-4">
          <Breadcrumbs items={[{ name: "Client Portal", url: "/client-portal" }]} />
        </div>
        <ClientProofingClient />
      </main>

      <Footer />
    </div>
  );
}
