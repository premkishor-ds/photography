import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/siteConfig";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.siteName} | ${siteConfig.brandTagline}`,
    short_name: siteConfig.siteName,
    description: siteConfig.brandSubtitle,
    start_url: "/",
    display: "standalone",
    background_color: "#FAF7F2",
    theme_color: "#0D0D0D",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/api/favicon",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  };
}
