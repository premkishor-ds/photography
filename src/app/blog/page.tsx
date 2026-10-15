import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import BlogPageClient from "@/components/BlogPageClient";
import { constructMetadata } from "@/lib/metadata";
import { generateWebPageSchema } from "@/lib/schema";
import { fetchBlogPosts } from "@/lib/supabase";
import { siteConfig } from "@/config/siteConfig";

export const metadata = constructMetadata({
  title: "Photography Journal & Guides",
  description:
    `Expert photography advice, photoshoot preparation guides, wardrobe recommendations, and technical insights from principal photographer ${siteConfig.photographer.name}.`,
  path: "/blog",
});

export default async function BlogIndexPage() {
  const posts = await fetchBlogPosts();
  const webPageSchema = generateWebPageSchema(
    "/blog",
    "Photography Journal & Client Planning Guides",
    "Educational guides covering photoshoot preparation, wedding planning, commercial licensing, and sports techniques."
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#121212]">
      <JsonLd data={webPageSchema} />
      <Header />

      <main className="flex-1 pt-28 pb-20">
        <BlogPageClient initialPosts={posts} />
      </main>

      <Footer />
    </div>
  );
}
