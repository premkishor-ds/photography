import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/siteConfig";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/private/"],
      },
      // Explicitly encourage helpful search & AI indexing agents
      {
        userAgent: [
          "Googlebot",
          "Bingbot",
          "Applebot",
          "DuckDuckBot",
          "PerplexityBot",
          "ClaudeBot",
          "ChatGPT-User",
          "GPTBot",
        ],
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${siteConfig.baseUrl}/sitemap.xml`,
    host: siteConfig.baseUrl,
  };
}
