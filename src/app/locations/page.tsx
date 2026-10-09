import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Navigation, ArrowRight, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import BookingCtaBanner from "@/components/BookingCtaBanner";
import JsonLd from "@/components/JsonLd";
import { constructMetadata } from "@/lib/metadata";
import { generateWebPageSchema } from "@/lib/schema";
import { siteConfig } from "@/config/siteConfig";

export const metadata = constructMetadata({
  title: "Studio Locations & Service Areas",
  description:
    "Based in Soho, New York with specialized coverage across the NYC Metropolitan Area, Hudson Valley, The Hamptons, and worldwide destination assignments.",
  path: "/locations",
});

export default function LocationsHubPage() {
  const webPageSchema = generateWebPageSchema(
    "/locations",
    "Photography Studio Locations & Service Areas",
    "Studio base locations, regional coverage across New York, and international destination booking."
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#121212]">
      <JsonLd data={webPageSchema} />
      <Header />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <Breadcrumbs items={[{ name: "Locations", url: "/locations" }]} />

          {/* Hero */}
          <div className="py-12 sm:py-16 text-center max-w-4xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] text-[#7B6955] font-sans font-medium">
              Geographic Coverage
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-tight text-[#121212]">
              Studio Base & Service Areas
            </h1>
            <p className="text-base sm:text-lg text-[#554837] font-light max-w-2xl mx-auto leading-relaxed">
              Based in our Soho, Manhattan natural-light studio, we provide dedicated coverage across the New York Metropolitan area and accept destination commissions worldwide.
            </p>
          </div>

          {/* Primary Base Card */}
          <div className="max-w-4xl mx-auto bg-white border border-[#E8DED0] shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 mb-14">
            <div className="md:col-span-6 relative min-h-[300px]">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80"
                alt="New York photography studio setting"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
            <div className="md:col-span-6 p-8 sm:p-10 space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#7B6955] font-sans">
                  Flagship Studio
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#121212] mt-1">
                  New York City & Metro Area
                </h2>
                <p className="text-xs sm:text-sm text-[#554837] leading-relaxed font-light mt-2">
                  Our core production hub serving Manhattan, Brooklyn, Hudson Valley, and Long Island with comprehensive studio and on-location coverage.
                </p>
                <div className="mt-4 pt-4 border-t border-[#F3ECE1] text-xs text-[#2C2C2C] space-y-1">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#BFA076]" />
                    <span>{siteConfig.business.address.streetAddress}</span>
                  </p>
                  <p className="text-[#7B6955] pl-5.5">
                    {siteConfig.business.address.addressLocality}, {siteConfig.business.address.addressRegion} {siteConfig.business.address.postalCode}
                  </p>
                </div>
              </div>

              <Link
                href="/locations/new-york"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-[#121212] hover:text-[#7B6955] pt-2"
              >
                <span>Explore New York Coverage Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Regional & Worldwide Reach Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white p-6 border border-[#E8DED0] space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-[#7B6955] font-sans">
                Regional Coverage
              </span>
              <h3 className="font-serif text-xl text-[#121212]">
                Hudson Valley & Upstate
              </h3>
              <p className="text-xs sm:text-sm text-[#554837] font-light leading-relaxed">
                Available for estate weddings, private retreats, and fine-art portraiture in Beacon, Rhinebeck, and the Catskills.
              </p>
            </div>

            <div className="bg-white p-6 border border-[#E8DED0] space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-[#7B6955] font-sans">
                Coastal Coverage
              </span>
              <h3 className="font-serif text-xl text-[#121212]">
                The Hamptons & Long Island
              </h3>
              <p className="text-xs sm:text-sm text-[#554837] font-light leading-relaxed">
                Summer editorial campaigns, seaside vows, and architectural commissions across Montauk and Southampton.
              </p>
            </div>

            <div className="bg-white p-6 border border-[#E8DED0] space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-[#7B6955] font-sans">
                Global Commissions
              </span>
              <h3 className="font-serif text-xl text-[#121212]">
                Worldwide Destinations
              </h3>
              <p className="text-xs sm:text-sm text-[#554837] font-light leading-relaxed">
                Regularly traveling across Europe and international destinations with transparent travel coordination.
              </p>
            </div>
          </div>

          {/* Booking CTA */}
          <BookingCtaBanner
            title="Planning a Session in Your City?"
            subtitle="Contact us with your proposed venue and dates. We coordinate all logistics seamlessly."
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
