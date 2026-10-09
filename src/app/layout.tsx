import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

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
  title: "Your Photography | Capturing Moments, Creating Memories",
  description:
    "Professional photography for life's most meaningful moments. Specializing in portrait, wedding, event, sports, commercial, travel, and wildlife photography.",
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
  authors: [{ name: "Your Photography" }],
  creator: "Your Photography",
  metadataBase: new URL("https://yourphotography.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourphotography.com",
    title: "Your Photography | Capturing Moments, Creating Memories",
    description:
      "Professional photography for life's most meaningful moments. Specializing in portrait, wedding, event, and commercial photography.",
    siteName: "Your Photography",
    images: [
      {
        url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 800,
        alt: "Your Photography - Capturing Moments, Creating Memories",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Photography | Capturing Moments, Creating Memories",
    description: "Professional photography for life's most meaningful moments.",
    images: ["https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#FAF7F2] text-[#121212] font-sans antialiased selection:bg-[#121212] selection:text-[#FAF7F2]">
        {children}
      </body>
    </html>
  );
}
