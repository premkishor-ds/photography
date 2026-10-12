import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Calendar,
  Clock,
  Phone,
  Mail,
  Check,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Compass,
} from "lucide-react";
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

  const JAIPUR_LOCATIONS = [
    {
      name: "Amer Fort & Maota Lake",
      description: "Iconic amber sandstone ramparts, majestic gateways, and royal courtyards for cinematic pre-wedding and editorial portraits.",
    },
    {
      name: "Hawa Mahal & Pink City",
      description: "Timeless 953 jharokhas facade and vibrant street scenes capturing the true soul and heritage colors of Jaipur.",
    },
    {
      name: "Patrika Gate & Jawahar Circle",
      description: "Intricately hand-painted floral corridors and royal Rajasthani architecture ideal for vibrant couple and fashion portfolios.",
    },
    {
      name: "Nahargarh & Jaigarh Forts",
      description: "Panoramic sunset vistas overlooking the expanse of Jaipur city from ancient Aravalli ridge ramparts.",
    },
    {
      name: "Jal Mahal & Man Sagar Lake",
      description: "Serene aquatic palace reflections bathed in early morning mist and gentle dawn illumination.",
    },
    {
      name: "Sawai Mansingh Stadium & Polo Club",
      description: "Elite arenas for high-speed sports, cricket tournaments, marathon finishes, and equestrian polo matches.",
    },
  ];

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
              { name: "Jaipur", url: "/locations/jaipur" },
            ]}
          />

          {/* Hero Section */}
          <section className="py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F3ECE1] border border-[#E8DED0] text-xs text-[#7B6955] uppercase tracking-wider font-sans">
                <MapPin className="w-3.5 h-3.5 text-[#BFA076]" />
                <span>Flagship Studio • मुख्य स्टूडियो जयपुर</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-tight text-[#121212] leading-[1.1]">
                Jaipur Photography Services & Flagship Studio
              </h1>
              <p className="text-base sm:text-lg text-[#554837] font-light leading-relaxed">
                Operating from our studio in Shri Kishanpura / Karolan Ka Barh, Jaipur, we capture editorial portraits, royal Rajasthan palace weddings, sports events, and commercial campaigns with fine-art craftsmanship.
              </p>

              {/* Verified Location Badge */}
              <div className="bg-white p-5 border border-[#E8DED0] shadow-sm space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E8DED0] flex items-center justify-center shrink-0 mt-0.5 text-[#121212]">
                    <MapPin className="w-4 h-4 text-[#BFA076]" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-wider text-[#7B6955] font-sans font-semibold">
                      Official Studio Address • आधिकारिक पता
                    </p>
                    <p className="text-sm text-[#121212] font-medium leading-snug">
                      {siteConfig.business.address.streetAddress}, {siteConfig.business.address.addressLocality}, {siteConfig.business.address.addressRegion} {siteConfig.business.address.postalCode}, India
                    </p>
                    <p className="text-xs text-[#7B6955] font-sans">
                      {siteConfig.business.address.hindiAddress}
                    </p>
                    <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-[#554837]">
                      <span className="bg-[#FAF7F2] px-2 py-0.5 border border-[#E8DED0]">
                        Google Plus Code: {siteConfig.business.address.plusCode}
                      </span>
                      <span>GPS: 26.8285° N, 75.8654° E</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-7 py-3.5 bg-[#121212] text-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#2C2C2C] transition-colors text-center"
                >
                  Book Jaipur Session (₹)
                </Link>
                <a
                  href={`https://wa.me/${siteConfig.business.whatsappNumber}?text=Hello!%20I%20would%20like%20to%20inquire%20about%20a%20photography%20session%20in%20Jaipur.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-7 py-3.5 bg-[#25D366] text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#20ba5a] transition-colors text-center"
                >
                  WhatsApp Studio (+91)
                </a>
              </div>
            </div>

            {/* Hero Image */}
            <div className="lg:col-span-5 relative min-h-[460px] bg-[#E8DED0] border border-[#E8DED0] overflow-hidden shadow-sm">
              <Image
                src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=85"
                alt="Hawa Mahal Palace of Winds in Jaipur Rajasthan in golden sunlight"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                <p className="font-serif text-lg">Hawa Mahal • Pink City, Jaipur</p>
                <p className="text-white/80 text-[11px] font-sans">
                  Available for heritage sunrise shoots & pre-weddings
                </p>
              </div>
            </div>
          </section>

          {/* Quick Studio Facts Grid */}
          <section className="py-12 border-t border-b border-[#E8DED0] grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-[#7B6955] font-sans">
                Operating Hours
              </span>
              <p className="text-sm font-medium text-[#121212]">
                Mon – Sat: 9:30 AM – 7:00 PM
              </p>
              <p className="text-xs text-[#554837]">Sunday by Appointment</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-[#7B6955] font-sans">
                Currencies Accepted
              </span>
              <p className="text-sm font-medium text-[#121212]">
                INR (Indian Rupee • ₹)
              </p>
              <p className="text-xs text-[#554837]">UPI, NetBanking, Cards</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-[#7B6955] font-sans">
                Primary District
              </span>
              <p className="text-sm font-medium text-[#121212]">
                Karolan Ka Barh / Jagatpura
              </p>
              <p className="text-xs text-[#554837]">PIN: 302017, Jaipur</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-[#7B6955] font-sans">
                Languages Supported
              </span>
              <p className="text-sm font-medium text-[#121212]">
                English & हिन्दी (Hindi)
              </p>
              <p className="text-xs text-[#554837]">Bilingual Consultations</p>
            </div>
          </section>

          {/* Iconic Jaipur Locations Showcase */}
          <section className="py-16 space-y-10">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-[0.25em] text-[#7B6955] font-sans font-medium">
                Shooting Locations
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#121212] mt-1">
                Iconic Backdrops Across Jaipur
              </h2>
              <p className="text-sm sm:text-base text-[#554837] font-light mt-2 leading-relaxed">
                Whether you prefer the controlled lighting of our Karolan Ka Barh studio or monumental historic architecture, Jaipur offers unmatched visual drama.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {JAIPUR_LOCATIONS.map((loc, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 border border-[#E8DED0] space-y-2 hover:border-[#7B6955] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#BFA076]" />
                    <h3 className="font-serif text-lg text-[#121212] font-medium">
                      {loc.name}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#554837] font-light leading-relaxed">
                    {loc.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing Overview in INR */}
          <section className="py-14 bg-white border border-[#E8DED0] p-8 sm:p-12 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#7B6955] font-sans font-medium">
                Transparent Pricing • पारदर्शी मूल्य
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#121212]">
                Jaipur Photography Packages in INR (₹)
              </h2>
              <p className="text-sm text-[#554837] font-light">
                All pricing includes transparent quotes, zero hidden charges, and GST invoice support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="p-6 bg-[#FAF7F2] border border-[#E8DED0] space-y-4 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#7B6955] font-sans font-semibold">
                    Studio & Heritage
                  </span>
                  <h3 className="font-serif text-2xl text-[#121212] mt-1">
                    Portraits & Pre-Wedding
                  </h3>
                  <p className="text-2xl font-serif text-[#121212] mt-2">
                    Starting from ₹25,000
                  </p>
                  <p className="text-xs text-[#554837] mt-2 leading-relaxed">
                    2 hours coverage at our Karolan Ka Barh studio or Pink City heritage locations. Includes 25+ curated master retouched images.
                  </p>
                </div>
                <Link
                  href="/services/portrait-photography"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#121212] hover:text-[#7B6955] font-medium pt-2"
                >
                  <span>Portrait Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="p-6 bg-[#FAF7F2] border-2 border-[#121212] space-y-4 flex flex-col justify-between relative">
                <span className="absolute -top-3 right-4 bg-[#121212] text-[#FAF7F2] text-[10px] uppercase tracking-widest px-2.5 py-0.5">
                  Most Requested
                </span>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#7B6955] font-sans font-semibold">
                    Rajasthan Destination
                  </span>
                  <h3 className="font-serif text-2xl text-[#121212] mt-1">
                    Royal Palace Weddings
                  </h3>
                  <p className="text-2xl font-serif text-[#121212] mt-2">
                    Starting from ₹1,50,000
                  </p>
                  <p className="text-xs text-[#554837] mt-2 leading-relaxed">
                    Full multi-day coverage (Mehendi, Sangeet, Pheras). Two lead photographers, 400+ color-graded images, 48-hour sneak peek, and heirloom album.
                  </p>
                </div>
                <Link
                  href="/services/wedding-photography"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#121212] hover:text-[#7B6955] font-medium pt-2"
                >
                  <span>Wedding Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="p-6 bg-[#FAF7F2] border border-[#E8DED0] space-y-4 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#7B6955] font-sans font-semibold">
                    Commercial & Action
                  </span>
                  <h3 className="font-serif text-2xl text-[#121212] mt-1">
                    Events, Sports & Brands
                  </h3>
                  <p className="text-2xl font-serif text-[#121212] mt-2">
                    ₹20,000 – ₹50,000+
                  </p>
                  <p className="text-xs text-[#554837] mt-2 leading-relaxed">
                    Jaipur Literature Festival galas, Sawai Mansingh cricket matches, luxury Kundan jewellery, and heritage boutique resort campaigns.
                  </p>
                </div>
                <Link
                  href="/services/commercial-photography"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#121212] hover:text-[#7B6955] font-medium pt-2"
                >
                  <span>Commercial Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </section>

          {/* Booking CTA Banner */}
          <BookingCtaBanner
            title="Book Your Jaipur Session Today"
            subtitle="Meet us at Room 215, Karolan Ka Barh, Shri Kishanpura or schedule an outdoor shoot at iconic Pink City monuments."
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
