import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/siteConfig";
import Analytics from "@/components/Analytics";
import { LanguageProvider } from "@/context/LanguageContext";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
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
          {/* Off-screen container for Google Translate element */}
          <div
            id="google_translate_element"
            style={{
              position: "absolute",
              left: "-9999px",
              top: "-9999px",
              width: "1px",
              height: "1px",
              overflow: "hidden",
              opacity: 0,
              pointerEvents: "none",
            }}
            aria-hidden="true"
          />
          <Script
            id="google-translate-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                function googleTranslateElementInit() {
                  if (window.google && window.google.translate) {
                    new window.google.translate.TranslateElement({
                      pageLanguage: 'en',
                      includedLanguages: 'en,hi',
                      autoDisplay: false
                    }, 'google_translate_element');
                  }
                }
              `,
            }}
          />
          <Script
            id="google-translate-script"
            src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
            strategy="afterInteractive"
          />
          {children}
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}
