import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/siteConfig";
import Analytics from "@/components/Analytics";
import { LanguageProvider } from "@/context/LanguageContext";
import { StudioProvider } from "@/context/StudioContext";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  themeColor: "#0D0D0D",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: `${siteConfig.siteName} | ${siteConfig.brandTagline}`,
    template: `%s | ${siteConfig.siteName}`,
  },
  description: siteConfig.brandSubtitle,
  keywords: [
    "photography",
    "wedding photography",
    "portrait photography",
    "sports photography",
    "event photographer",
    "commercial photography",
    "travel photography",
    "wildlife photography",
    "professional photographer",
  ],
  authors: [{ name: siteConfig.photographer.name }],
  creator: siteConfig.siteName,
  publisher: siteConfig.business.legalName,
  openGraph: {
    type: "website",
    locale: siteConfig.defaultLocale,
    url: siteConfig.baseUrl,
    title: `${siteConfig.siteName} | ${siteConfig.brandTagline}`,
    description: siteConfig.brandSubtitle,
    siteName: siteConfig.siteName,
    images: [
      {
        url: siteConfig.defaultOgImage,
        width: 1200,
        height: 630,
        alt: siteConfig.brandTagline,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.siteName} | ${siteConfig.brandTagline}`,
    description: siteConfig.brandSubtitle,
    images: [siteConfig.defaultOgImage],
  },
  ...(siteConfig.verification.google && {
    verification: {
      google: siteConfig.verification.google,
    },
  }),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#FAF7F2] text-[#121212] font-sans antialiased selection:bg-[#121212] selection:text-[#FAF7F2]">
        <LanguageProvider>
          <StudioProvider>
            {children}
            <Analytics />
          </StudioProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
