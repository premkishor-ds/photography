"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import BookingCtaBanner from "@/components/BookingCtaBanner";
import { useLanguage } from "@/context/LanguageContext";
import { BlogPost, getLocalizedBlogPosts } from "@/data/blogData";

interface BlogPageClientProps {
  initialPosts: BlogPost[];
}

export default function BlogPageClient({ initialPosts }: BlogPageClientProps) {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  const posts = getLocalizedBlogPosts(initialPosts, language);

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8">
      <Breadcrumbs items={[{ name: isHindi ? "जर्नल" : "Journal", url: "/blog" }]} />

      {/* Hero Section */}
      <div className="py-12 sm:py-16 text-center max-w-4xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-[0.3em] text-[#7B6955] font-sans font-medium">
          {isHindi ? "जर्नल एवं गाइड्स" : "Journal & Guides"}
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-tight text-[#121212]">
          {isHindi ? "फोटोग्राफी विचार एवं क्लाइंट गाइड्स" : "Photography Insights & Client Guides"}
        </h1>
        <p className="text-base sm:text-lg text-[#554837] font-light max-w-2xl mx-auto leading-relaxed">
          {isHindi
            ? "आगामी सत्रों की तैयारी, कमर्शियल लाइसेंसिंग को समझने और सही फोटोग्राफी पार्टनर चुनने में आपकी सहायता के लिए तैयार किए गए लेख।"
            : "Curated articles designed to assist you in preparing for upcoming sessions, understanding commercial licensing, and choosing the perfect photography partner."}
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="bg-white border border-[#E8DED0] shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300"
          >
            <div>
              <div className="relative aspect-[16/10] w-full bg-[#121212] overflow-hidden">
                <Image
                  src={post.heroImage}
                  alt={post.heroAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 text-[10px] tracking-widest uppercase font-sans font-medium text-white bg-black/60 backdrop-blur-xs px-2.5 py-1">
                  {post.category}
                </span>
              </div>

              <div className="p-6 sm:p-8 space-y-3">
                <div className="flex items-center gap-4 text-[11px] text-[#7B6955] font-sans">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.publishedDate}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl text-[#121212] font-normal leading-snug group-hover:text-[#7B6955] transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <p className="text-xs sm:text-sm text-[#554837] leading-relaxed font-light">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 pt-0 flex items-center justify-between border-t border-[#F3ECE1] mt-4 pt-4">
              <span className="text-xs text-[#7B6955] font-sans">
                {isHindi ? `लेखक: ${post.author}` : `By ${post.author}`}
              </span>
              <Link
                href={`/blog/${post.slug}`}
                className="text-xs uppercase tracking-widest font-medium text-[#121212] hover:text-[#7B6955] transition-colors flex items-center gap-1.5 group/btn"
              >
                <span>{isHindi ? "गाइड पढ़ें" : "Read Guide"}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Booking CTA Banner */}
      <BookingCtaBanner
        title={isHindi ? "क्या आपका कोई प्रश्न है?" : "Have Questions About Your Vision?"}
        subtitle={
          isHindi
            ? "चाहे आपको कस्टम वार्डरोब मार्गदर्शन चाहिए या कमर्शियल लाइसेंसिंग प्रस्ताव, हमें सहायता करने में प्रसन्नता होगी।"
            : "Whether you need custom wardrobe guidance or a bespoke commercial licensing proposal, we are here to assist."
        }
      />
    </div>
  );
}
