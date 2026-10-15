"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { siteConfig } from "@/config/siteConfig";

export interface StudioSettings {
  studio_name: string;
  email: string;
  phone: string;
  whatsapp_number: string;
  address: string;
  hindi_address: string;
  working_hours: string;
  hindi_working_hours?: string;
  tagline: string;
  hindi_tagline?: string;
  subtagline: string;
  hindi_subtagline?: string;
  hero_image_url: string;
  photographer_name: string;
  photographer_role: string;
  photographer_bio_1: string;
  photographer_bio_2: string;
  photographer_quote: string;
  photographer_portrait_url: string;
  stats_experience: string;
  stats_sessions: string;
  stats_weddings: string;
  stats_features: string;
  instagram_url: string;
  facebook_url: string;
  pinterest_url: string;
  five_hundred_px_url: string;
  youtube_url: string;
  favicon_url?: string;
  map_latitude?: number;
  map_longitude?: number;
  map_zoom?: number;
  google_maps_api_key?: string;
}

const defaultSettings: StudioSettings = {
  studio_name: siteConfig.siteName || "Your Photography",
  tagline: siteConfig.brandTagline || "Capturing Moments, Creating Memories",
  subtagline: siteConfig.brandSubtitle || "Professional photography for life's most meaningful moments.",
  hero_image_url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2000&q=85",
  favicon_url: "camera",
  map_latitude: siteConfig.business.geo.latitude || 26.8285,
  map_longitude: siteConfig.business.geo.longitude || 75.8654,
  map_zoom: 15,
  google_maps_api_key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  email: siteConfig.business.email || "contact@yourphotography.com",
  phone: siteConfig.business.phone || "+91 98290 12345",
  whatsapp_number: siteConfig.business.whatsappNumber || "919829012345",
  address: `${siteConfig.business.address.streetAddress}, ${siteConfig.business.address.addressLocality}, ${siteConfig.business.address.addressRegion} ${siteConfig.business.address.postalCode}`,
  hindi_address: siteConfig.business.address.hindiAddress || "कमरा नं. 215, द्वितीय तल, RV2J+5PQ, करोलां का बाड़, श्री किशनपुरा, जयपुर, राजस्थान 302017",
  working_hours: "Monday – Saturday: 9:30 AM – 7:00 PM IST (Sunday by Appointment)",
  photographer_name: siteConfig.photographer.name || "Lead Photographer",
  photographer_role: siteConfig.photographer.role || "Principal Photographer & Visual Artist",
  photographer_bio_1:
    "For over twelve years, I have dedicated my life to the delicate art of seeing. Photography, to me, is not merely capturing what is before the lens, but feeling the heartbeat of a fleeting moment and preserving it before it disappears into memory.",
  photographer_bio_2:
    "Trained in classical fine-art, documentary, and dynamic action photography, my style blends soft, warm natural light with subtle editorial composition. I look for the unscripted pauses: the quiet touch of hands before vows, the fleeting glint in an eye, or the explosive energy of an athlete in mid-air.",
  photographer_quote: "“Light reveals what exists; emotion reveals what truly matters.”",
  photographer_portrait_url: siteConfig.photographer.portraitUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80",
  stats_experience: "12+ Years",
  stats_sessions: "650+",
  stats_weddings: "180+",
  stats_features: "24+",
  instagram_url: siteConfig.socialProfiles.instagram || "https://instagram.com/yourphotography",
  facebook_url: siteConfig.socialProfiles.facebook || "https://facebook.com/yourphotography",
  pinterest_url: siteConfig.socialProfiles.pinterest || "https://pinterest.com/yourphotography",
  five_hundred_px_url: siteConfig.socialProfiles.fiveHundredPx || "https://500px.com/yourphotography",
  youtube_url: "https://youtube.com/@yourphotography",
};

interface StudioContextType {
  settings: StudioSettings;
  refreshSettings: () => Promise<void>;
  isLoading: boolean;
}

const StudioContext = createContext<StudioContextType>({
  settings: defaultSettings,
  refreshSettings: async () => {},
  isLoading: false,
});

export function StudioProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<StudioSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (data.success && data.settings) {
        setSettings((prev) => ({
          ...prev,
          ...data.settings,
        }));
      }
    } catch {
      // Graceful fallback to defaultSettings
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // Dynamically synchronize the browser tab favicon with Studio Settings in real-time
  useEffect(() => {
    if (typeof document === "undefined") return;
    const faviconHref = settings.favicon_url?.trim()
      ? settings.favicon_url.startsWith("http")
        ? settings.favicon_url
        : `/api/favicon?v=${encodeURIComponent(settings.favicon_url)}`
      : "/api/favicon";

    let iconLink = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (!iconLink) {
      iconLink = document.createElement("link");
      iconLink.rel = "icon";
      document.head.appendChild(iconLink);
    }
    iconLink.href = faviconHref;

    let appleLink = document.querySelector<HTMLLinkElement>("link[rel='apple-touch-icon']");
    if (!appleLink) {
      appleLink = document.createElement("link");
      appleLink.rel = "apple-touch-icon";
      document.head.appendChild(appleLink);
    }
    appleLink.href = faviconHref;
  }, [settings.favicon_url]);

  return (
    <StudioContext.Provider
      value={{
        settings,
        refreshSettings: fetchSettings,
        isLoading,
      }}
    >
      {children}
    </StudioContext.Provider>
  );
}

export function useStudioSettings() {
  return useContext(StudioContext);
}
