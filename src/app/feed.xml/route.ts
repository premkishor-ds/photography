import { NextResponse } from "next/server";
import { siteConfig } from "@/config/siteConfig";
import { fetchBlogPosts } from "@/lib/supabase";
import { getAbsoluteUrl } from "@/lib/schema";

export const revalidate = 3600;

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = await fetchBlogPosts();
  const siteUrl = siteConfig.baseUrl;

  const itemsXml = posts
    .map((post) => {
      const postUrl = getAbsoluteUrl(`/blog/${post.slug}`);
      const pubDate = new Date(post.publishedDate).toUTCString();
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <category>${escapeXml(post.category)}</category>
      <pubDate>${pubDate}</pubDate>
      <author>${escapeXml(siteConfig.business.email)} (${escapeXml(post.author || siteConfig.photographer.name)})</author>
    </item>`;
    })
    .join("\n");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.siteName)} - Journal &amp; Guides</title>
    <link>${siteUrl}/blog</link>
    <description>${escapeXml(siteConfig.brandSubtitle)}</description>
    <language>${siteConfig.defaultLocale}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssFeed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
