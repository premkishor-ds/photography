"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Check } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import BookingCtaBanner from "@/components/BookingCtaBanner";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/config/siteConfig";

export default function NewYorkLocationClient() {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  return (
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
            {isHindi ? "डेस्टिनेशन असाइनमेंट्स • अंतरराष्ट्रीय कवरेज" : "Destination Commissions • International Coverage"}
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-tight text-[#121212]">
            {isHindi ? "न्यूयॉर्क डेस्टिनेशन फोटोग्राफी एवं असाइनमेंट्स" : "New York Destination Photography & Commissions"}
          </h1>
          <p className="text-base sm:text-lg text-[#554837] font-light leading-relaxed">
            {isHindi
              ? "जयपुर, राजस्थान में हमारे मुख्य स्टूडियो से संचालित होकर, हम न्यूयॉर्क शहर में लक्जरी डेस्टिनेशन शादियों, संपादकीय पोर्ट्रेट और वाणिज्यिक ब्रांड अभियानों के लिए वैश्विक यात्रा करते हैं।"
              : "Operating from our flagship studio in Jaipur, Rajasthan, we travel globally for luxury destination weddings, editorial portraits, and commercial brand campaigns across New York City."}
          </p>

          {/* Studio Details Card */}
          <div className="bg-white p-6 border border-[#E8DED0] space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#BFA076] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs uppercase tracking-wider text-[#7B6955] font-sans font-medium">
                  {isHindi ? "मुख्य स्टूडियो मुख्यालय" : "Flagship Studio Headquarters"}
                </p>
                <p className="text-sm font-medium text-[#121212] mt-0.5">
                  {isHindi
                    ? "कमरा नं. 215, कैरोलन का बाड़, श्री किशनपुरा, जयपुर"
                    : siteConfig.business.address.streetAddress}
                </p>
                <p className="text-xs text-[#554837]">
                  {isHindi
                    ? "जयपुर, राजस्थान 302017, भारत • न्यूयॉर्क सत्र पूर्व अपॉइंटमेंट द्वारा"
                    : `${siteConfig.business.address.addressLocality}, ${siteConfig.business.address.addressRegion} ${siteConfig.business.address.postalCode}, India • On-Location NYC Sessions by Appointment`}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#F3ECE1] grid grid-cols-2 gap-4 text-xs text-[#2C2C2C]">
              <div>
                <span className="text-[#7B6955] block">{isHindi ? "पूछताछ" : "Inquiries"}</span>
                <a href={`mailto:${siteConfig.business.email}`} className="font-medium hover:underline">
                  {siteConfig.business.email}
                </a>
              </div>
              <div>
                <span className="text-[#7B6955] block">{isHindi ? "सीधा फ़ोन" : "Direct Telephone"}</span>
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
              {isHindi ? "डेस्टिनेशन सत्र बुक करें" : "Book Destination Session"}
            </Link>
            <Link
              href="/portfolio"
              className="w-full sm:w-auto px-8 py-4 border border-[#121212] text-[#121212] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#121212] hover:text-white transition-colors text-center"
            >
              {isHindi ? "पोर्टफोलियो देखें" : "View Portfolio"}
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
            {isHindi ? "स्थानीय अनुभव" : "Local Experience"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#121212] mt-2">
            {isHindi ? "प्रतिष्ठित न्यूयॉर्क फोटोग्राफी वातावरण" : "Iconic New York Photography Environments"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 border border-[#E8DED0] space-y-3">
            <h3 className="font-serif text-xl text-[#121212]">
              {isHindi ? "सोहो कास्ट-आयरन वास्तुकला" : "Soho Cast-Iron Architecture"}
            </h3>
            <p className="text-xs sm:text-sm text-[#554837] font-light leading-relaxed">
              {isHindi
                ? "पत्थर की गलियां, ऐतिहासिक फायर एस्केप्स और गर्म ईंटों की पृष्ठभूमि जो उच्च संपादकीय फैशन ऊर्जा प्रदान करती हैं।"
                : "Cobblestone alleys, historic fire escapes, and warm reflective brick backdrops offering editorial fashion energy within steps of our daylight studio."}
            </p>
          </div>

          <div className="bg-white p-6 border border-[#E8DED0] space-y-3">
            <h3 className="font-serif text-xl text-[#121212]">
              {isHindi ? "सेंट्रल पार्क एवं कंजर्वेटरी वॉटर" : "Central Park & Conservatory Water"}
            </h3>
            <p className="text-xs sm:text-sm text-[#554837] font-light leading-relaxed">
              {isHindi
                ? "सार्वजनिक भीड़ आने से पहले बो ब्रिज, बेथेस्डा टेरेस और रैम्बल के रास्तों पर सुबह की शांत और छन कर आती प्राकृतिक रोशनी।"
                : "Classic early-morning sessions utilizing soft filtered canopy light across Bow Bridge, Bethesda Terrace, and Ramble pathways before public crowds arrive."}
            </p>
          </div>

          <div className="bg-white p-6 border border-[#E8DED0] space-y-3">
            <h3 className="font-serif text-xl text-[#121212]">
              {isHindi ? "डंबो एवं ब्रुकलिन वाटरफ्रंट" : "DUMBO & Brooklyn Waterfront"}
            </h3>
            <p className="text-xs sm:text-sm text-[#554837] font-light leading-relaxed">
              {isHindi
                ? "नाटकीय गोधूलि क्षितिज और ऐतिहासिक ईंट गोदाम मेहराब जो सगाई और कमर्शियल ब्रांडिंग को भव्य स्वरूप देते हैं।"
                : "Dramatic twilight skylines and historic brick warehouse arches providing monumental scale for engagement portraits and commercial branding."}
            </p>
          </div>
        </div>
      </section>

      {/* Permitting & Logistical Guidance */}
      <section className="py-14 border-t border-[#E8DED0] grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#121212]">
            {isHindi ? "न्यूयॉर्क परमिट एवं उत्पादन लॉजिस्टिक्स" : "NYC Permits & Production Logistics"}
          </h2>
          <p className="text-sm text-[#554837] font-light leading-relaxed">
            {isHindi
              ? "न्यूयॉर्क शहर में शूटिंग के लिए सख्त लॉजिस्टिक विशेषज्ञता की आवश्यकता होती है। हम हैंडहेल्ड फोटोग्राफी छूट बनाम कमर्शियल उपकरण परमिट की जटिलताओं को पूर्ण रूप से संभालते हैं।"
              : "Shooting in New York City requires strict logistical expertise. We manage the intricacies of handheld photography exemptions versus commercial equipment permits (Mayor's Office of Media and Entertainment and NYC Parks)."}
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-[#2C2C2C]">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#BFA076]" />
              <span>
                {isHindi
                  ? "सभी वेन्यू के लिए बीमा प्रमाण पत्र (COI) के साथ पूर्णतः बीमाकृत"
                  : "Fully insured with certificate of insurance (COI) available for all venues"}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#BFA076]" />
              <span>
                {isHindi
                  ? "शांत और भीड़-मुक्त सुबह के समय स्लॉट्स की गहरी जानकारी"
                  : "Familiarity with quiet, crowd-free morning time slots"}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#BFA076]" />
              <span>
                {isHindi
                  ? "खराब मौसम के लिए निजी इनडोर लॉफ्ट स्टूडियो तक पहुंच"
                  : "Access to private indoor loft rentals for inclement weather"}
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-8 border border-[#E8DED0] space-y-4 text-center">
          <h3 className="font-serif text-xl text-[#121212]">
            {isHindi ? "अपना डेस्टिनेशन सत्र आरक्षित करें" : "Reserve Your Destination Session"}
          </h3>
          <p className="text-xs text-[#554837] leading-relaxed">
            {isHindi
              ? "आगामी यात्रा तिथियों, पोर्टफोलियो असाइनमेंट्स और डेस्टिनेशन उपलब्धता की पुष्टि के लिए हमारी जयपुर स्टूडियो टीम से संपर्क करें।"
              : "Contact our Jaipur studio team to confirm upcoming travel dates, portfolio commissions, and destination availability."}
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3.5 bg-[#121212] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#2C2C2C] transition-colors"
          >
            {isHindi ? "स्टूडियो टीम से पूछताछ करें" : "Inquire With Studio Team"}
          </Link>
        </div>
      </section>

      {/* Booking CTA */}
      <BookingCtaBanner
        title={isHindi ? "क्या आप अंतरराष्ट्रीय असाइनमेंट की योजना बना रहे हैं?" : "Planning an International Commission?"}
        subtitle={
          isHindi
            ? "अपनी तिथियों और विदेश यात्रा कार्यक्रम के साथ हमारी स्टूडियो टीम से जुड़ें। हम सभी यात्रा लॉजिस्टिक्स को सहजता से समन्वित करते हैं।"
            : "Connect with our studio team with your dates and overseas itinerary. We coordinate travel logistics seamlessly."
        }
      />
    </div>
  );
}
