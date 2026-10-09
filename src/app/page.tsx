import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PortfolioGallery from "@/components/PortfolioGallery";
import Services from "@/components/Services";
import AboutMe from "@/components/AboutMe";
import ContactAndBooking from "@/components/ContactAndBooking";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { constructMetadata } from "@/lib/metadata";
import {
  generatePhotographyBusinessSchema,
  generateWebSiteSchema,
} from "@/lib/schema";

export const metadata = constructMetadata({
  title: "Your Photography | Capturing Moments, Creating Memories",
  description:
    "Professional photography for life's most meaningful moments. Specializing in portrait, wedding, event, sports, commercial, travel, and wildlife photography.",
  path: "/",
});

export default function Home() {
  const businessSchema = generatePhotographyBusinessSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <>
      <JsonLd data={businessSchema} />
      <JsonLd data={websiteSchema} />

      <Header />
      <main className="min-h-screen">
        <Hero />
        <PortfolioGallery />
        <Services />
        <AboutMe />
        <ContactAndBooking />
      </main>
      <Footer />
    </>
  );
}
