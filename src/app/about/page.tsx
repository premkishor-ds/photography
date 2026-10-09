import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Camera, Award, ShieldCheck, Heart, Sparkles, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import BookingCtaBanner from "@/components/BookingCtaBanner";
import JsonLd from "@/components/JsonLd";
import { constructMetadata } from "@/lib/metadata";
import { generateWebPageSchema, generatePersonSchema } from "@/lib/schema";
import { siteConfig } from "@/config/siteConfig";

export const metadata = constructMetadata({
  title: "About Julian Rivera | Lead Photographer",
  description:
    "Learn about lead photographer Julian Rivera, our 12+ years of fine-art experience, documentary philosophy, and technical dedication to capturing life's most meaningful moments.",
  path: "/about",
});

export default function AboutPage() {
  const webPageSchema = generateWebPageSchema(
    "/about",
    "About Julian Rivera & Your Photography Studio",
    "Biographical overview, artistic philosophy, and technical qualifications of lead photographer Julian Rivera."
  );

  const personSchema = generatePersonSchema();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#121212]">
      <JsonLd data={webPageSchema} />
      <JsonLd data={personSchema} />
      <Header />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <Breadcrumbs items={[{ name: "About", url: "/about" }]} />

          {/* Hero Section */}
          <section className="py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:max-w-none bg-[#121212] shadow-2xl overflow-hidden border border-[#E8DED0]">
                <Image
                  src={siteConfig.photographer.portraitUrl}
                  alt="Julian Rivera, Lead Photographer holding camera in natural light studio"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="hidden sm:block absolute -top-4 -left-4 w-full h-full border border-[#D7C7B2] -z-10 pointer-events-none" />
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-[0.3em] text-[#7B6955] font-sans font-medium">
                The Artist Behind The Lens
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-tight text-[#121212]">
                Julian Rivera
              </h1>
              <p className="font-serif text-xl sm:text-2xl italic text-[#554837] border-l-2 border-[#121212] pl-6 py-1 leading-relaxed">
                “Light reveals what exists; emotion reveals what truly matters.”
              </p>
              <div className="space-y-4 text-sm sm:text-base text-[#554837] font-light leading-relaxed">
                <p>
                  For over twelve years, I have dedicated my life to the delicate art of visual observation. Photography, to me, is not merely capturing an image before the sensor—it is perceiving the heartbeat of a fleeting gesture and preserving it before it disappears into memory.
                </p>
                <p>
                  Trained in classical fine-art, photojournalism, and dynamic sports optics, my style merges warm natural illumination with precise editorial composition. I look for the unscripted pauses: the quiet touch of hands before vows, the focused resolve in an athlete&apos;s breath, or mist settling over sunrise mountains.
                </p>
              </div>

              {/* Verified Career Milestones */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#E8DED0]">
                <div className="bg-white p-4 border border-[#F3ECE1]">
                  <p className="font-serif text-2xl sm:text-3xl text-[#121212]">12+</p>
                  <p className="text-[10px] uppercase tracking-widest text-[#7B6955] font-sans mt-1">
                    Years of Craft
                  </p>
                </div>
                <div className="bg-white p-4 border border-[#F3ECE1]">
                  <p className="font-serif text-2xl sm:text-3xl text-[#121212]">650+</p>
                  <p className="text-[10px] uppercase tracking-widest text-[#7B6955] font-sans mt-1">
                    Commissions
                  </p>
                </div>
                <div className="bg-white p-4 border border-[#F3ECE1]">
                  <p className="font-serif text-2xl sm:text-3xl text-[#121212]">180+</p>
                  <p className="text-[10px] uppercase tracking-widest text-[#7B6955] font-sans mt-1">
                    Weddings
                  </p>
                </div>
                <div className="bg-white p-4 border border-[#F3ECE1]">
                  <p className="font-serif text-2xl sm:text-3xl text-[#121212]">Global</p>
                  <p className="text-[10px] uppercase tracking-widest text-[#7B6955] font-sans mt-1">
                    Assignments
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Core Values & Pillars */}
          <section className="py-16 border-t border-[#E8DED0] space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-[#7B6955] font-sans">
                Our Foundation
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#121212]">
                Guiding Principles of Our Work
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 border border-[#E8DED0] space-y-4">
                <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E8DED0] flex items-center justify-center text-[#121212]">
                  <Camera className="w-5 h-5 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-xl text-[#121212]">
                  Authenticity Above Staging
                </h3>
                <p className="text-xs sm:text-sm text-[#554837] leading-relaxed font-light">
                  We believe authentic emotion cannot be fabricated through rigid poses. We create an atmosphere where clients feel relaxed, allowing true expression to emerge naturally.
                </p>
              </div>

              <div className="bg-white p-8 border border-[#E8DED0] space-y-4">
                <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E8DED0] flex items-center justify-center text-[#121212]">
                  <Sparkles className="w-5 h-5 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-xl text-[#121212]">
                  Timeless Aesthetic Permanence
                </h3>
                <p className="text-xs sm:text-sm text-[#554837] leading-relaxed font-light">
                  We deliberately reject trendy, temporary digital filters and unnatural color tints. Our color science is calibrated to look as captivating fifty years from now as it does today.
                </p>
              </div>

              <div className="bg-white p-8 border border-[#E8DED0] space-y-4">
                <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E8DED0] flex items-center justify-center text-[#121212]">
                  <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-xl text-[#121212]">
                  Technical Rigor & Redundancy
                </h3>
                <p className="text-xs sm:text-sm text-[#554837] leading-relaxed font-light">
                  Every wedding and milestone event is captured with dual in-camera card recording and immediate offsite cloud backups, guaranteeing that irreplaceable moments remain safe.
                </p>
              </div>
            </div>
          </section>

          {/* Booking CTA */}
          <BookingCtaBanner
            title="Let's Work Together"
            subtitle="I would be honored to document your story. Reach out to schedule a consultation or check studio availability."
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
