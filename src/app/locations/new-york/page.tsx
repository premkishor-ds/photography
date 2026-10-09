import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Calendar, Clock, Phone, Mail, Check, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import BookingCtaBanner from "@/components/BookingCtaBanner";
import JsonLd from "@/components/JsonLd";
import { constructMetadata } from "@/lib/metadata";
import {
  generateWebPageSchema,
  generatePhotographyBusinessSchema,
} from "@/lib/schema";
import { siteConfig } from "@/config/siteConfig";

export const metadata = constructMetadata({
  title: "New York Photography Studio",
  description:
    "Professional photography based in Soho, New York. Specializing in Manhattan and Brooklyn portraits, documentary weddings, galas, and athletic campaigns.",
  path: "/locations/new-york",
});

export default function NewYorkLocationPage() {
  const webPageSchema = generateWebPageSchema(
    "/locations/new-york",
    "New York Photography Services & Soho Studio",
    "On-location and studio photography across New York City, Brooklyn, and Manhattan."
  );

  const businessSchema = generatePhotographyBusinessSchema();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#121212]">
      <JsonLd data={webPageSchema} />
      <JsonLd data={businessSchema} />
      <Header />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <Breadcrumbs
            items={[
              { name: "Locations", url: "/locations" },
              { name: "New York", url: "/locations/new-york" },
            ]}
          />

          {/* Hero Section */}
          <section className="py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-[0.3em] text-[#7B6955] font-sans font-medium">
                Verified Studio Base
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-tight text-[#121212]">
                New York Photography Services & Studio
              </h1>
              <p className="text-base sm:text-lg text-[#554837] font-light leading-relaxed">
                Operating from our natural daylight studio in Soho, we create editorial portraits, candid wedding narratives, and commercial imagery across all five boroughs.
              </p>

              {/* Studio Details Card */}
              <div className="bg-white p-6 border border-[#E8DED0] space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#BFA076] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#7B6955] font-sans font-medium">
                      Studio Address
                    </p>
                    <p className="text-sm font-medium text-[#121212] mt-0.5">
                      {siteConfig.business.address.streetAddress}
                    </p>
                    <p className="text-xs text-[#554837]">
                      {siteConfig.business.address.addressLocality}, {siteConfig.business.address.addressRegion} {siteConfig.business.address.postalCode}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F3ECE1] grid grid-cols-2 gap-4 text-xs text-[#2C2C2C]">
                  <div>
                    <span className="text-[#7B6955] block">Inquiries</span>
                    <a href={`mailto:${siteConfig.business.email}`} className="font-medium hover:underline">
                      {siteConfig.business.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-[#7B6955] block">Direct Telephone</span>
                    <a href={`tel:${siteConfig.business.phoneRaw}`} className="font-medium hover:underline">
                      {siteConfig.business.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-8 py-4 bg-[#121212] text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#2C2C2C] transition-colors text-center"
                >
                  Book a New York Session
                </Link>
                <Link
                  href="/portfolio"
                  className="w-full sm:w-auto px-8 py-4 border border-[#121212] text-[#121212] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#121212] hover:text-white transition-colors text-center"
                >
                  View NYC Portfolio
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] w-full bg-[#121212] shadow-2xl overflow-hidden border border-[#E8DED0]">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80"
                  alt="New York portrait photography session in Soho loft"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </section>

          {/* Localized Knowledge & Venue Highlights */}
          <section className="py-14 border-t border-[#E8DED0] space-y-8">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-[0.25em] text-[#7B6955] font-sans">
                Local Experience
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#121212] mt-2">
                Iconic New York Photography Environments
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 border border-[#E8DED0] space-y-3">
                <h3 className="font-serif text-xl text-[#121212]">
                  Soho Cast-Iron Architecture
                </h3>
                <p className="text-xs sm:text-sm text-[#554837] font-light leading-relaxed">
                  Cobblestone alleys, historic fire escapes, and warm reflective brick backdrops offering editorial fashion energy within steps of our daylight studio.
                </p>
              </div>

              <div className="bg-white p-6 border border-[#E8DED0] space-y-3">
                <h3 className="font-serif text-xl text-[#121212]">
                  Central Park & Conservatory Water
                </h3>
                <p className="text-xs sm:text-sm text-[#554837] font-light leading-relaxed">
                  Classic early-morning sessions utilizing soft filtered canopy light across Bow Bridge, Bethesda Terrace, and Ramble pathways before public crowds arrive.
                </p>
              </div>

              <div className="bg-white p-6 border border-[#E8DED0] space-y-3">
                <h3 className="font-serif text-xl text-[#121212]">
                  DUMBO & Brooklyn Waterfront
                </h3>
                <p className="text-xs sm:text-sm text-[#554837] font-light leading-relaxed">
                  Dramatic twilight skylines and historic brick warehouse arches providing monumental scale for engagement portraits and commercial branding.
                </p>
              </div>
            </div>
          </section>

          {/* Permitting & Logistical Guidance */}
          <section className="py-14 border-t border-[#E8DED0] grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#121212]">
                NYC Permits & Production Logistics
              </h2>
              <p className="text-sm text-[#554837] font-light leading-relaxed">
                Shooting in New York City requires strict logistical expertise. We manage the intricacies of handheld photography exemptions versus commercial equipment permits (Mayor&apos;s Office of Media and Entertainment and NYC Parks).
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-[#2C2C2C]">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#BFA076]" />
                  <span>Fully insured with certificate of insurance (COI) available for all venues</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#BFA076]" />
                  <span>Familiarity with quiet, crowd-free morning time slots</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#BFA076]" />
                  <span>Access to private indoor loft rentals for inclement weather</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 border border-[#E8DED0] space-y-4 text-center">
              <h3 className="font-serif text-xl text-[#121212]">
                Reserve Your New York Session
              </h3>
              <p className="text-xs text-[#554837] leading-relaxed">
                Contact our studio team to confirm local calendar availability or schedule an in-person consultation in Soho.
              </p>
              <Link
                href="/contact"
                className="inline-block px-8 py-3.5 bg-[#121212] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#2C2C2C] transition-colors"
              >
                Inquire With NYC Studio
              </Link>
            </div>
          </section>

          {/* Booking CTA */}
          <BookingCtaBanner
            title="Capturing New York Stories"
            subtitle="Let's create timeless photographs against the most captivating architectural backdrop in the world."
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
