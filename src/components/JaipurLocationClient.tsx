"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  ArrowRight,
  ExternalLink,
  Compass,
  Navigation,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import BookingCtaBanner from "@/components/BookingCtaBanner";
import GoogleStaticMap from "@/components/GoogleStaticMap";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/config/siteConfig";

const JAIPUR_LOCATIONS_DATA = [
  {
    nameEn: "Amer Fort & Maota Lake",
    nameHi: "आमेर दुर्ग एवं मावठा सरोवर",
    descEn:
      "Iconic amber sandstone ramparts, majestic gateways, and royal courtyards for cinematic pre-wedding and editorial portraits.",
    descHi:
      "सिनेमैटिक प्री-वेडिंग और संपादकीय चित्रों के लिए प्रतिष्ठित अंबर बलुआ पत्थर के प्राचीर, राजसी प्रवेश द्वार और शाही प्रांगण।",
  },
  {
    nameEn: "Hawa Mahal & Pink City",
    nameHi: "हवा महल एवं गुलाबी नगरी",
    descEn:
      "Timeless 953 jharokhas facade and vibrant street scenes capturing the true soul and heritage colors of Jaipur.",
    descHi:
      "जयपुर की वास्तविक आत्मा और धरोहर रंगों को दर्शाती 953 झरोखों की कालजयी वास्तुकला और जीवंत दृश्य।",
  },
  {
    nameEn: "Patrika Gate & Jawahar Circle",
    nameHi: "पत्रिका गेट एवं जवाहर सर्किल",
    descEn:
      "Intricately hand-painted floral corridors and royal Rajasthani architecture ideal for vibrant couple and fashion portfolios.",
    descHi:
      "दंपतियों और फैशन पोर्टफोलियो के लिए आदर्श जटिल हाथ से चित्रित पुष्प गलियारे और शाही राजस्थानी वास्तुकला।",
  },
  {
    nameEn: "Nahargarh & Jaigarh Forts",
    nameHi: "नाहरगढ़ एवं जयगढ़ दुर्ग",
    descEn:
      "Panoramic sunset vistas overlooking the expanse of Jaipur city from ancient Aravalli ridge ramparts.",
    descHi:
      "प्राचीन अरावली पर्वतमाला से पूरे जयपुर शहर का विहंगम सूर्यास्त दृश्य।",
  },
  {
    nameEn: "Jal Mahal & Man Sagar Lake",
    nameHi: "जल महल एवं मान सागर झील",
    descEn:
      "Serene aquatic palace reflections bathed in early morning mist and gentle dawn illumination.",
    descHi:
      "सुबह के कोहरे और भोर की कोमल रोशनी में चमकते जलीय महल के शांत प्रतिबिंब।",
  },
  {
    nameEn: "Sawai Mansingh Stadium & Polo Club",
    nameHi: "सवाई मानसिंह स्टेडियम एवं पोलो क्लब",
    descEn:
      "Elite arenas for high-speed sports, cricket tournaments, marathon finishes, and equestrian polo matches.",
    descHi:
      "तीव्र गति खेल, क्रिकेट टूर्नामेंट, मैराथन और घुड़सवारी पोलो मैचों के लिए उत्कृष्ट खेल स्थल।",
  },
];

export default function JaipurLocationClient() {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  return (
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
            <span>
              {isHindi ? "फ्लैगशिप स्टूडियो • जयपुर" : "Flagship Studio • Jaipur"}
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-tight text-[#121212] leading-[1.1]">
            {isHindi
              ? "जयपुर फोटोग्राफी सेवाएं एवं मुख्य स्टूडियो"
              : "Jaipur Photography Services & Flagship Studio"}
          </h1>
          <p className="text-base sm:text-lg text-[#554837] font-light leading-relaxed">
            {isHindi
              ? "श्री किशनपुरा / कैरोलन का बाड़, जयपुर में हमारे मुख्य स्टूडियो से संचालित होकर, हम फाइन-आर्ट शिल्प कौशल के साथ संपादकीय पोर्ट्रेट, शाही राजस्थान महल विवाह, खेल कार्यक्रम और कमर्शियल अभियानों को कैद करते हैं।"
              : "Operating from our studio in Shri Kishanpura / Karolan Ka Barh, Jaipur, we capture editorial portraits, royal Rajasthan palace weddings, sports events, and commercial campaigns with fine-art craftsmanship."}
          </p>

          {/* Verified Location Badge */}
          <div className="bg-white p-5 border border-[#E8DED0] shadow-sm space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E8DED0] flex items-center justify-center shrink-0 mt-0.5 text-[#121212]">
                <MapPin className="w-4 h-4 text-[#BFA076]" />
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wider text-[#7B6955] font-sans font-semibold">
                  {isHindi ? "आधिकारिक स्टूडियो का पता" : "Official Studio Address"}
                </p>
                <p className="text-sm text-[#121212] font-medium leading-snug">
                  {isHindi
                    ? "कमरा नं. 215, द्वितीय तल, कैरोलन का बाड़, श्री किशनपुरा, जयपुर, राजस्थान 302017, भारत"
                    : `${siteConfig.business.address.streetAddress}, ${siteConfig.business.address.addressLocality}, ${siteConfig.business.address.addressRegion} ${siteConfig.business.address.postalCode}, India`}
                </p>
                {!isHindi && (
                  <p className="text-xs text-[#7B6955] font-sans">
                    {siteConfig.business.address.hindiAddress}
                  </p>
                )}
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
              {isHindi ? "जयपुर सत्र बुक करें (₹)" : "Book Jaipur Session (₹)"}
            </Link>
            <a
              href={`https://wa.me/${siteConfig.business.whatsappNumber}?text=${encodeURIComponent(
                isHindi
                  ? "नमस्ते! मैं जयपुर में फोटोग्राफी सत्र के बारे में पूछताछ करना चाहता हूँ।"
                  : "Hello! I would like to inquire about a photography session in Jaipur."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 bg-[#25D366] text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#20ba5a] transition-colors text-center"
            >
              {isHindi ? "व्हाट्सएप स्टूडियो (+91)" : "WhatsApp Studio (+91)"}
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
            <p className="font-serif text-lg">
              {isHindi ? "हवा महल • गुलाबी नगरी, जयपुर" : "Hawa Mahal • Pink City, Jaipur"}
            </p>
            <p className="text-white/80 text-[11px] font-sans">
              {isHindi
                ? "धरोहर सूर्योदय और प्री-वेडिंग शूट के लिए उपलब्ध"
                : "Available for heritage sunrise shoots & pre-weddings"}
            </p>
          </div>
        </div>
      </section>

      {/* Quick Studio Facts Grid */}
      <section className="py-12 border-t border-b border-[#E8DED0] grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-widest text-[#7B6955] font-sans">
            {isHindi ? "कार्य समय" : "Operating Hours"}
          </span>
          <p className="text-sm font-medium text-[#121212]">
            {isHindi ? "सोम – शनि: 9:30 AM – 7:00 PM" : "Mon – Sat: 9:30 AM – 7:00 PM"}
          </p>
          <p className="text-xs text-[#554837]">
            {isHindi ? "रविवार अपॉइंटमेंट द्वारा" : "Sunday by Appointment"}
          </p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-widest text-[#7B6955] font-sans">
            {isHindi ? "स्वीकृत मुद्राएं" : "Currencies Accepted"}
          </span>
          <p className="text-sm font-medium text-[#121212]">
            INR (भारतीय रुपया • ₹)
          </p>
          <p className="text-xs text-[#554837]">
            {isHindi ? "यूपीआई, नेटबैंकिंग, कार्ड" : "UPI, NetBanking, Cards"}
          </p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-widest text-[#7B6955] font-sans">
            {isHindi ? "मुख्य क्षेत्र" : "Primary District"}
          </span>
          <p className="text-sm font-medium text-[#121212]">
            {isHindi ? "कैरोलन का बाड़ / जगतपुरा" : "Karolan Ka Barh / Jagatpura"}
          </p>
          <p className="text-xs text-[#554837]">
            {isHindi ? "पिन: 302017, जयपुर" : "PIN: 302017, Jaipur"}
          </p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-widest text-[#7B6955] font-sans">
            {isHindi ? "समर्थित भाषाएं" : "Languages Supported"}
          </span>
          <p className="text-sm font-medium text-[#121212]">
            English & हिन्दी (Hindi)
          </p>
          <p className="text-xs text-[#554837]">
            {isHindi ? "द्विभाषी परामर्श" : "Bilingual Consultations"}
          </p>
        </div>
      </section>

      {/* Iconic Jaipur Locations Showcase */}
      <section className="py-16 space-y-10">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.25em] text-[#7B6955] font-sans font-medium">
            {isHindi ? "शूटिंग स्थल" : "Shooting Locations"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#121212] mt-1">
            {isHindi ? "जयपुर के प्रतिष्ठित स्थल" : "Iconic Backdrops Across Jaipur"}
          </h2>
          <p className="text-sm sm:text-base text-[#554837] font-light mt-2 leading-relaxed">
            {isHindi
              ? "चाहे आप हमारे कैरोलन का बाड़ स्टूडियो का नियंत्रित प्रकाश पसंद करें या राजसी ऐतिहासिक वास्तुकला, जयपुर अद्वितीय दृश्य अनुभव प्रदान करता है।"
              : "Whether you prefer the controlled lighting of our Karolan Ka Barh studio or monumental historic architecture, Jaipur offers unmatched visual drama."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {JAIPUR_LOCATIONS_DATA.map((loc, idx) => (
            <div
              key={idx}
              className="bg-white p-6 border border-[#E8DED0] space-y-2 hover:border-[#7B6955] transition-colors"
            >
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#BFA076]" />
                <h3 className="font-serif text-lg text-[#121212] font-medium">
                  {isHindi ? loc.nameHi : loc.nameEn}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#554837] font-light leading-relaxed">
                {isHindi ? loc.descHi : loc.descEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Flagship Studio Location & Google Static Map */}
      <section className="py-12 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#7B6955] font-sans font-medium">
              {isHindi ? "स्टूडियो लोकेशन एवं दिशा-निर्देश" : "Studio Location & Directions"}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#121212] mt-1">
              {isHindi ? "हमारा जयपुर मुख्य स्टूडियो खोजें" : "Find Our Jaipur Flagship Studio"}
            </h2>
            <p className="text-sm text-[#554837] font-light mt-2 max-w-xl leading-relaxed">
              {isHindi
                ? "दक्षिण-पूर्व जयपुर में कैरोलन का बाड़, श्री किशनपुरा में स्थित, जगतपुरा और जयपुर अंतर्राष्ट्रीय हवाई अड्डे (JAI) से कुछ ही मिनटों की दूरी पर।"
                : "Located at Karolan Ka Barh, Shri Kishanpura in south-east Jaipur, minutes away from Jagatpura and Jaipur International Airport (JAI)."}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=26.8285,75.8654"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#121212] text-white hover:bg-[#2C2C2C] uppercase tracking-widest text-xs font-medium transition-colors"
            >
              <Navigation className="w-3.5 h-3.5 text-[#BFA076]" />
              <span>{isHindi ? "नेविगेशन शुरू करें" : "Start Navigation"}</span>
              <ExternalLink className="w-3 h-3 text-white/60 ml-1" />
            </a>
          </div>
        </div>

        <GoogleStaticMap
          latitude={siteConfig.business.geo.latitude || 26.8285}
          longitude={siteConfig.business.geo.longitude || 75.8654}
          zoom={15}
          title={isHindi ? "योर फोटोग्राफी मुख्य स्टूडियो" : "Your Photography Flagship Studio"}
          address={
            siteConfig.business.address.streetAddress +
            ", " +
            siteConfig.business.address.addressLocality +
            " " +
            siteConfig.business.address.postalCode
          }
          plusCode={siteConfig.business.address.plusCode || "RV2J+5PQ"}
          showOverlayCard={true}
          heightClass="h-[380px] sm:h-[460px]"
        />
      </section>

      {/* Pricing Overview in INR */}
      <section className="py-14 bg-white border border-[#E8DED0] p-8 sm:p-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-[#7B6955] font-sans font-medium">
            {isHindi ? "पारदर्शी मूल्य निर्धारण" : "Transparent Pricing"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#121212]">
            {isHindi ? "जयपुर फोटोग्राफी पैकेज (INR • ₹)" : "Jaipur Photography Packages in INR (₹)"}
          </h2>
          <p className="text-sm text-[#554837] font-light">
            {isHindi
              ? "सभी मूल्य निर्धारण में स्पष्ट उद्धरण, शून्य छिपे शुल्क और जीएसटी चालान समर्थन शामिल है।"
              : "All pricing includes transparent quotes, zero hidden charges, and GST invoice support."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 bg-[#FAF7F2] border border-[#E8DED0] space-y-4 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#7B6955] font-sans font-semibold">
                {isHindi ? "स्टूडियो एवं धरोहर" : "Studio & Heritage"}
              </span>
              <h3 className="font-serif text-2xl text-[#121212] mt-1">
                {isHindi ? "पोर्ट्रेट एवं प्री-वेडिंग" : "Portraits & Pre-Wedding"}
              </h3>
              <p className="text-2xl font-serif text-[#121212] mt-2">
                {isHindi ? "₹25,000 से शुरू" : "Starting from ₹25,000"}
              </p>
              <p className="text-xs text-[#554837] mt-2 leading-relaxed">
                {isHindi
                  ? "हमारे कैरोलन का बाड़ स्टूडियो या पिंक सिटी धरोहर स्थानों पर 2 घंटे की कवरेज। 25+ क्यूरेटेड मास्टर रिटच छवियां शामिल।"
                  : "2 hours coverage at our Karolan Ka Barh studio or Pink City heritage locations. Includes 25+ curated master retouched images."}
              </p>
            </div>
            <Link
              href="/services/portrait-photography"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#121212] hover:text-[#7B6955] font-medium pt-2"
            >
              <span>{isHindi ? "पोर्ट्रेट विवरण" : "Portrait Details"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 bg-[#FAF7F2] border-2 border-[#121212] space-y-4 flex flex-col justify-between relative">
            <span className="absolute -top-3 right-4 bg-[#121212] text-[#FAF7F2] text-[10px] uppercase tracking-widest px-2.5 py-0.5">
              {isHindi ? "सर्वाधिक लोकप्रिय" : "Most Requested"}
            </span>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#7B6955] font-sans font-semibold">
                {isHindi ? "राजस्थान डेस्टिनेशन" : "Rajasthan Destination"}
              </span>
              <h3 className="font-serif text-2xl text-[#121212] mt-1">
                {isHindi ? "शाही महल विवाह" : "Royal Palace Weddings"}
              </h3>
              <p className="text-2xl font-serif text-[#121212] mt-2">
                {isHindi ? "₹1,50,000 से शुरू" : "Starting from ₹1,50,000"}
              </p>
              <p className="text-xs text-[#554837] mt-2 leading-relaxed">
                {isHindi
                  ? "पूर्ण बहु-दिवसीय कवरेज (मेहंदी, संगीत, फेरे)। दो प्रमुख फोटोग्राफर, 400+ कलर-ग्रेडेड छवियां, 48-घंटे का स्नीक पीक और हेरिटेज एल्बम।"
                  : "Full multi-day coverage (Mehendi, Sangeet, Pheras). Two lead photographers, 400+ color-graded images, 48-hour sneak peek, and heirloom album."}
              </p>
            </div>
            <Link
              href="/services/wedding-photography"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#121212] hover:text-[#7B6955] font-medium pt-2"
            >
              <span>{isHindi ? "विवाह विवरण" : "Wedding Details"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 bg-[#FAF7F2] border border-[#E8DED0] space-y-4 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#7B6955] font-sans font-semibold">
                {isHindi ? "कमर्शियल एवं खेल" : "Commercial & Action"}
              </span>
              <h3 className="font-serif text-2xl text-[#121212] mt-1">
                {isHindi ? "इवेंट्स, खेल एवं ब्रांड्स" : "Events, Sports & Brands"}
              </h3>
              <p className="text-2xl font-serif text-[#121212] mt-2">
                ₹20,000 – ₹50,000+
              </p>
              <p className="text-xs text-[#554837] mt-2 leading-relaxed">
                {isHindi
                  ? "जयपुर लिटरेचर फेस्टिवल गाला, सवाई मानसिंह क्रिकेट मैच, कुंदन आभूषण और हेरिटेज बुटीक रिसॉर्ट अभियान।"
                  : "Jaipur Literature Festival galas, Sawai Mansingh cricket matches, luxury Kundan jewellery, and heritage boutique resort campaigns."}
              </p>
            </div>
            <Link
              href="/services/commercial-photography"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#121212] hover:text-[#7B6955] font-medium pt-2"
            >
              <span>{isHindi ? "कमर्शियल विवरण" : "Commercial Details"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Booking CTA Banner */}
      <BookingCtaBanner
        title={isHindi ? "आज ही अपना जयपुर सत्र बुक करें" : "Book Your Jaipur Session Today"}
        subtitle={
          isHindi
            ? "कमरा नं. 215, कैरोलन का बाड़, श्री किशनपुरा में हमसे मिलें या प्रतिष्ठित पिंक सिटी स्मारकों पर आउटडोर शूट निर्धारित करें।"
            : "Meet us at Room 215, Karolan Ka Barh, Shri Kishanpura or schedule an outdoor shoot at iconic Pink City monuments."
        }
      />
    </div>
  );
}
