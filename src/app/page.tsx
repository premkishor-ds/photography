"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PortfolioGallery from "@/components/PortfolioGallery";
import Services from "@/components/Services";
import AboutMe from "@/components/AboutMe";
import ContactAndBooking from "@/components/ContactAndBooking";
import Footer from "@/components/Footer";

export default function Home() {
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState("");

  const handleSelectService = (serviceTitle: string) => {
    setSelectedServiceForBooking(serviceTitle);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PhotographyBusiness",
    name: "Your Photography",
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
    description:
      "Professional photography for life's most meaningful moments. Specializing in portrait, wedding, event, sports, commercial, travel, and wildlife photography.",
    telephone: "+1-555-234-5678",
    email: "hello@yourphotography.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Studio 18, 452 Artisan Way, Soho Arts District",
      addressLocality: "New York",
      addressRegion: "NY",
      postalCode: "10013",
      addressCountry: "US",
    },
    priceRange: "$$$",
    url: "https://yourphotography.com",
  };

  return (
    <>
      {/* Structured SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />
      <main className="min-h-screen">
        <Hero />
        <PortfolioGallery />
        <Services onSelectServiceForBooking={handleSelectService} />
        <AboutMe />
        <ContactAndBooking preselectedService={selectedServiceForBooking} />
      </main>
      <Footer />
    </>
  );
}
