"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import BookingCtaBanner from "@/components/BookingCtaBanner";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/config/siteConfig";

export default function LocationsPageClient() {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8">
      <Breadcrumbs items={[{ name: isHindi ? "लोकेशन" : "Locations", url: "/locations" }]} />

      {/* Hero */}
      <div className="py-12 sm:py-16 text-center max-w-4xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-[0.3em] text-[#7B6955] font-sans font-medium">
          {isHindi ? "भौगोलिक कवरेज • Geographic Coverage" : "Geographic Coverage • भौगोलिक कवरेज"}
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-tight text-[#121212]">
          {isHindi ? "स्टूडियो बेस एवं सेवा क्षेत्र" : "Studio Base & Service Areas"}
        </h1>
        <p className="text-base sm:text-lg text-[#554837] font-light max-w-2xl mx-auto leading-relaxed">
          {isHindi
            ? "जयपुर, राजस्थान में हमारे मुख्य स्टूडियो से संचालित होते हुए, हम पूरे पिंक सिटी, राजस्थान के शाही महलों और अखिल भारतीय स्तर पर समर्पित फोटोग्राफी सेवाएँ प्रदान करते हैं।"
            : "Operating from our flagship studio in Jaipur, Rajasthan, we provide dedicated photography coverage across the Pink City, Rajasthan royal palace circuits, and Pan-India assignments."}
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
              {isHindi ? "मुख्य स्टूडियो • Flagship Studio" : "Flagship Studio • मुख्य स्टूडियो"}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#121212] mt-1">
              {isHindi ? "जयपुर एवं राजस्थान केंद्र" : "Jaipur & Rajasthan Hub"}
            </h2>
            <p className="text-xs sm:text-sm text-[#554837] leading-relaxed font-light mt-2">
              {isHindi
                ? "हमारा मुख्यालय और रचनात्मक प्रोडक्शन सुइट जो जयपुर (करोलां का बाड़, जगतपुरा, मालवीय नगर, सी-स्कीम), ऐतिहासिक किलों और शाही महलों को सेवा प्रदान करता है।"
                : "Our headquarters and creative production suite serving Jaipur (Karolan Ka Barh, Jagatpura, Malviya Nagar, C-Scheme), historic forts, and royal palaces."}
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
            <span>{isHindi ? "जयपुर स्टूडियो एवं कवरेज गाइड देखें" : "Explore Jaipur Studio & Coverage Guide"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Regional & Pan-India Reach Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="bg-white p-6 border border-[#E8DED0] space-y-3">
          <span className="text-[10px] uppercase tracking-wider text-[#7B6955] font-sans">
            {isHindi ? "पिंक सिटी क्षेत्र" : "Pink City Districts"}
          </span>
          <h3 className="font-serif text-xl text-[#121212]">
            {isHindi ? "जयपुर हेरिटेज एवं मेट्रो" : "Jaipur Heritage & Metro"}
          </h3>
          <p className="text-xs sm:text-sm text-[#554837] font-light leading-relaxed">
            {isHindi
              ? "आमेर किला, नाहरगढ़, पत्रिका गेट, सिटी पैलेस, जगतपुरा और टोंक रोड पर प्री-वेडिंग, पोर्ट्रेट और सम्मेलनों के लिए उपलब्ध।"
              : "Available for pre-weddings, portraits, and summits at Amer Fort, Nahargarh, Patrika Gate, City Palace, Jagatpura, and Tonk Road."}
          </p>
        </div>

        <div className="bg-white p-6 border border-[#E8DED0] space-y-3">
          <span className="text-[10px] uppercase tracking-wider text-[#7B6955] font-sans">
            {isHindi ? "रॉयल राजस्थान सर्किट" : "Royal Rajasthan Circuit"}
          </span>
          <h3 className="font-serif text-xl text-[#121212]">
            {isHindi ? "उदयपुर, जोधपुर एवं जैसलमेर" : "Udaipur, Jodhpur & Jaisalmer"}
          </h3>
          <p className="text-xs sm:text-sm text-[#554837] font-light leading-relaxed">
            {isHindi
              ? "पिछोला झील के महलों, मेहरानगढ़ किले, थार के रेगिस्तानी टीलों और रणथंभौर में शाही महल डेस्टिनेशन शादियाँ और अभियान फोटोग्राफी।"
              : "Royal palace destination weddings and expeditions across Lake Pichola palaces, Mehrangarh Fort, Thar Desert dunes, and Ranthambore."}
          </p>
        </div>

        <div className="bg-white p-6 border border-[#E8DED0] space-y-3">
          <span className="text-[10px] uppercase tracking-wider text-[#7B6955] font-sans">
            {isHindi ? "अखिल भारतीय एवं वैश्विक" : "Pan-India & Global Reach"}
          </span>
          <h3 className="font-serif text-xl text-[#121212]">
            {isHindi ? "दिल्ली एनसीआर, मुंबई एवं वैश्विक" : "Delhi NCR, Mumbai & Worldwide"}
          </h3>
          <p className="text-xs sm:text-sm text-[#554837] font-light leading-relaxed">
            {isHindi
              ? "दिल्ली एनसीआर, मुंबई, गोवा, बेंगलुरु और अंतर्राष्ट्रीय गंतव्यों में पारदर्शी यात्रा समन्वय के साथ नियमित यात्रा।"
              : "Regularly traveling across Delhi NCR, Mumbai, Goa, Bengaluru, and international destinations with transparent travel coordination in INR (₹)."}
          </p>
        </div>
      </div>

      {/* Booking CTA */}
      <BookingCtaBanner
        title={isHindi ? "राजस्थान में किसी सत्र या शादी की योजना बना रहे हैं?" : "Planning a Session or Wedding in Rajasthan?"}
        subtitle={
          isHindi
            ? "अपनी तारीखों और वेन्यू के साथ हमारी जयपुर स्टूडियो टीम से संपर्क करें। हम सभी व्यवस्थाएं सुगमता से संभालते हैं।"
            : "Connect with our Jaipur studio team with your dates and venue. We coordinate all logistics seamlessly."
        }
      />
    </div>
  );
}
