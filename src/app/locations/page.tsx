import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import BookingCtaBanner from "@/components/BookingCtaBanner";
import JsonLd from "@/components/JsonLd";
import { constructMetadata } from "@/lib/metadata";
import { generateWebPageSchema } from "@/lib/schema";
import { siteConfig } from "@/config/siteConfig";

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
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <Breadcrumbs items={[{ name: "Locations", url: "/locations" }]} />

          {/* Hero */}
          <div className="py-12 sm:py-16 text-center max-w-4xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] text-[#7B6955] font-sans font-medium">
              Geographic Coverage • भौगोलिक कवरेज
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-tight text-[#121212]">
              Studio Base & Service Areas
            </h1>
            <p className="text-base sm:text-lg text-[#554837] font-light max-w-2xl mx-auto leading-relaxed">
              Operating from our flagship studio in Jaipur, Rajasthan, we provide dedicated photography coverage across the Pink City, Rajasthan royal palace circuits, and Pan-India assignments.
            </p>
          </div>

          {/* Primary Base Card: Jaipur */}
          <div className="max-w-4xl mx-auto bg-white border border-[#E8DED0] shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 mb-14">
            <div className="md:col-span-6 relative min-h-[300px]">
              <Image
                src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
                alt="Hawa Mahal and Pink City Jaipur photography base"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
            <div className="md:col-span-6 p-8 sm:p-10 space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#7B6955] font-sans">
                  Flagship Studio • मुख्य स्टूडियो
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#121212] mt-1">
                  Jaipur & Rajasthan Hub
                </h2>
                <p className="text-xs sm:text-sm text-[#554837] leading-relaxed font-light mt-2">
                  Our headquarters and creative production suite serving Jaipur (Karolan Ka Barh, Jagatpura, Malviya Nagar, C-Scheme), historic forts, and royal palaces.
                </p>
                <div className="mt-4 pt-4 border-t border-[#F3ECE1] text-xs text-[#2C2C2C] space-y-1.5">
                  <p className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#BFA076] shrink-0 mt-0.5" />
                    <span>{siteConfig.business.address.streetAddress}</span>
                  </p>
                  <p className="text-[#7B6955] pl-5.5 font-sans">
                    {siteConfig.business.address.addressLocality}, {siteConfig.business.address.addressRegion} {siteConfig.business.address.postalCode} (Plus Code: {siteConfig.business.address.plusCode})
                  </p>
                  <p className="text-[#9E8870] pl-5.5 text-[11px] font-sans">
                    {siteConfig.business.address.hindiAddress}
                  </p>
                </div>
              </div>

              <Link
                href="/locations/jaipur"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-[#121212] hover:text-[#7B6955] pt-2"
              >
                <span>Explore Jaipur Studio & Coverage Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Regional & Pan-India Reach Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white p-6 border border-[#E8DED0] space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-[#7B6955] font-sans">
                Pink City Districts
              </span>
              <h3 className="font-serif text-xl text-[#121212]">
                Jaipur Heritage & Metro
              </h3>
              <p className="text-xs sm:text-sm text-[#554837] font-light leading-relaxed">
                Available for pre-weddings, portraits, and summits at Amer Fort, Nahargarh, Patrika Gate, City Palace, Jagatpura, and Tonk Road.
              </p>
            </div>

            <div className="bg-white p-6 border border-[#E8DED0] space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-[#7B6955] font-sans">
                Royal Rajasthan Circuit
              </span>
              <h3 className="font-serif text-xl text-[#121212]">
                Udaipur, Jodhpur & Jaisalmer
              </h3>
              <p className="text-xs sm:text-sm text-[#554837] font-light leading-relaxed">
                Royal palace destination weddings and expeditions across Lake Pichola palaces, Mehrangarh Fort, Thar Desert dunes, and Ranthambore.
              </p>
            </div>

            <div className="bg-white p-6 border border-[#E8DED0] space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-[#7B6955] font-sans">
                Pan-India & Global Reach
              </span>
              <h3 className="font-serif text-xl text-[#121212]">
                Delhi NCR, Mumbai & Worldwide
              </h3>
              <p className="text-xs sm:text-sm text-[#554837] font-light leading-relaxed">
                Regularly traveling across Delhi NCR, Mumbai, Goa, Bengaluru, and international destinations with transparent travel coordination in INR (₹).
              </p>
            </div>
          </div>

          {/* Booking CTA */}
          <BookingCtaBanner
            title="Planning a Session or Wedding in Rajasthan?"
            subtitle="Connect with our Jaipur studio team with your dates and venue. We coordinate all logistics seamlessly."
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
