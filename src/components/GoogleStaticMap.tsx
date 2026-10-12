"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  MapPin,
  ExternalLink,
  Navigation,
  Copy,
  Check,
  ZoomIn,
  ZoomOut,
  Layers,
  Compass,
} from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export interface GoogleStaticMapProps {
  latitude?: number;
  longitude?: number;
  zoom?: number;
  apiKey?: string;
  mapType?: "roadmap" | "satellite" | "hybrid" | "terrain";
  title?: string;
  address?: string;
  plusCode?: string;
  className?: string;
  heightClass?: string;
  showOverlayCard?: boolean;
  showControls?: boolean;
}

export default function GoogleStaticMap({
  latitude = 26.8285,
  longitude = 75.8654,
  zoom: initialZoom = 15,
  apiKey,
  mapType: initialMapType = "roadmap",
  title = "Your Photography Flagship Studio",
  address = "Room 215, 2nd Floor, RV2J+5PQ, Karolan Ka Barh, Shri Kishanpura, Jaipur, Rajasthan 302017",
  plusCode = "RV2J+5PQ",
  className = "",
  heightClass = "h-[360px] sm:h-[420px]",
  showOverlayCard = true,
  showControls = true,
}: GoogleStaticMapProps) {
  const [zoom, setZoom] = useState(initialZoom);
  const [mapType, setMapType] = useState<"roadmap" | "satellite" | "hybrid" | "terrain">(initialMapType);
  const [copiedPlusCode, setCopiedPlusCode] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [viewMode, setViewMode] = useState<"static" | "interactive">("static");

  // Effective Google API Key from props or environment
  const effectiveApiKey =
    apiKey ||
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
    "";

  // Google Static Maps API URL
  const staticMapUrl = useMemo(() => {
    if (!effectiveApiKey) return "";

    const baseUrl = "https://maps.googleapis.com/maps/api/staticmap";
    const params = new URLSearchParams({
      center: `${latitude},${longitude}`,
      zoom: zoom.toString(),
      size: "800x450",
      scale: "2",
      maptype: mapType,
      markers: `color:0xBFA076|label:P|${latitude},${longitude}`,
      key: effectiveApiKey,
    });

    // Custom luxury styling (only for roadmap/terrain)
    if (mapType === "roadmap" || mapType === "terrain") {
      params.append("style", "feature:landscape|color:0xfaf7f2");
      params.append("style", "feature:water|color:0xd7c7b2");
      params.append("style", "feature:road|element:geometry|color:0xffffff");
      params.append("style", "feature:road|element:geometry.stroke|color:0xe8ded0");
      params.append("style", "feature:poi|visibility:simplified");
    }

    return `${baseUrl}?${params.toString()}`;
  }, [latitude, longitude, zoom, mapType, effectiveApiKey]);

  // Google Maps Direct Navigation Link
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  const handleCopyPlusCode = () => {
    navigator.clipboard.writeText(plusCode);
    setCopiedPlusCode(true);
    setTimeout(() => setCopiedPlusCode(false), 2000);
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 1, 20));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 1, 10));

  return (
    <div
      className={`relative w-full rounded-none border border-[#E8DED0] bg-[#FAF7F2] overflow-hidden shadow-xs group ${className}`}
    >
      {/* Map Display Viewport */}
      <div className={`relative w-full ${heightClass} overflow-hidden select-none`}>
        {viewMode === "interactive" ? (
          /* Interactive Embed fallback */
          <iframe
            title="Google Maps Studio Location"
            src={`https://maps.google.com/maps?q=${latitude},${longitude}&t=${mapType === "satellite" ? "k" : "m"}&z=${zoom}&output=embed`}
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
          />
        ) : effectiveApiKey && !imageError ? (
          /* Official Google Static Maps Image */
          <div className="relative w-full h-full bg-[#F3ECE1]">
            <img
              src={staticMapUrl}
              alt={`${title} - Google Static Map at ${address}`}
              className="w-full h-full object-cover object-center transition-all duration-300"
              onError={() => setImageError(true)}
            />
            {/* Custom Luxury Marker Overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center">
              <div className="relative">
                <span className="w-4 h-4 bg-[#BFA076]/30 rounded-full animate-ping absolute inset-0 -m-1" />
                <div className="w-7 h-7 rounded-full bg-[#121212] border-2 border-[#BFA076] text-[#BFA076] flex items-center justify-center shadow-lg relative z-10">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Luxury High-Res Vector Static Map Preview (Used when no API key is configured or offline) */
          <div className="relative w-full h-full bg-[#F8F5F0] overflow-hidden flex items-center justify-center">
            {/* Stylized Jaipur Road Grid Illustration */}
            <svg
              className="absolute inset-0 w-full h-full opacity-40"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid slice"
              viewBox="0 0 800 450"
            >
              {/* Land / District Polygons */}
              <rect width="800" height="450" fill="#FAF7F2" />
              <polygon points="0,0 280,0 350,150 150,220 0,180" fill="#F3ECE1" opacity="0.6" />
              <polygon points="450,0 800,0 800,280 550,250 480,140" fill="#F3ECE1" opacity="0.5" />
              <polygon points="120,290 380,260 480,450 60,450" fill="#EDE4D6" opacity="0.5" />
              
              {/* Secondary Roads */}
              <g stroke="#E8DED0" strokeWidth="2.5" fill="none">
                <line x1="0" y1="90" x2="800" y2="120" />
                <line x1="0" y1="210" x2="800" y2="230" />
                <line x1="0" y1="360" x2="800" y2="340" />
                <line x1="180" y1="0" x2="160" y2="450" />
                <line x1="340" y1="0" x2="380" y2="450" />
                <line x1="580" y1="0" x2="560" y2="450" />
                <line x1="720" y1="0" x2="740" y2="450" />
                <path d="M 50,450 C 200,300 300,350 450,200 C 600,50 680,100 800,80" />
                <path d="M 0,320 C 150,280 280,310 400,225 C 520,140 680,180 800,200" />
              </g>

              {/* Major Arterial Roads / Highways (Tonk Road / Jagatpura Arterials) */}
              <g stroke="#D7C7B2" strokeWidth="6" strokeLinecap="round" fill="none">
                <line x1="0" y1="260" x2="800" y2="190" />
                <line x1="400" y1="0" x2="400" y2="450" />
                <path d="M 100,0 C 250,150 350,200 500,300 C 650,400 700,450 780,450" />
              </g>

              {/* Highway White Inner */}
              <g stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none">
                <line x1="0" y1="260" x2="800" y2="190" />
                <line x1="400" y1="0" x2="400" y2="450" />
                <path d="M 100,0 C 250,150 350,200 500,300 C 650,400 700,450 780,450" />
              </g>

              {/* District Labels */}
              <text x="70" y="70" fill="#9E8870" fontSize="11" fontFamily="sans-serif" letterSpacing="2">
                PINK CITY HERITAGE
              </text>
              <text x="560" y="80" fill="#9E8870" fontSize="11" fontFamily="sans-serif" letterSpacing="2">
                MALVIYA NAGAR
              </text>
              <text x="180" y="420" fill="#9E8870" fontSize="11" fontFamily="sans-serif" letterSpacing="2">
                TONK ROAD HIGHWAY
              </text>
              <text x="540" y="390" fill="#9E8870" fontSize="11" fontFamily="sans-serif" letterSpacing="2">
                JAGATPURA DISTRICT
              </text>
              <text x="430" y="245" fill="#121212" fontSize="12" fontWeight="600" fontFamily="sans-serif" letterSpacing="1">
                KAROLAN KA BARH
              </text>
            </svg>

            {/* Pulsating Luxury Gold Pin at Studio Coordinates */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative flex items-center justify-center">
                <span className="w-14 h-14 bg-[#BFA076]/20 rounded-full animate-ping absolute" />
                <span className="w-9 h-9 bg-[#BFA076]/40 rounded-full animate-pulse absolute" />
                <div className="w-10 h-10 rounded-full bg-[#121212] border-2 border-[#BFA076] text-[#BFA076] flex items-center justify-center shadow-xl relative z-20">
                  <MapPin className="w-5 h-5 stroke-[2]" />
                </div>
              </div>
              <div className="mt-2 bg-[#121212] text-white px-3 py-1 text-[11px] font-sans uppercase tracking-widest border border-[#BFA076]/50 shadow-md">
                <span>Room 215 • Flagship Studio</span>
              </div>
            </div>

            {/* Google Watermark / Badge */}
            <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 bg-white/90 backdrop-blur-xs border border-[#E8DED0] text-[10px] text-[#7B6955]">
              <span className="font-semibold text-[#121212]">Google Maps</span>
              <span>•</span>
              <span>Jaipur 302017</span>
            </div>
          </div>
        )}

        {/* Map Controls (Top Right) */}
        {showControls && (
          <div className="absolute top-3 right-3 z-20 flex flex-col gap-1.5 shadow-sm">
            <button
              onClick={handleZoomIn}
              title="Zoom In"
              className="w-8 h-8 bg-white hover:bg-[#FAF7F2] text-[#121212] border border-[#D7C7B2] flex items-center justify-center cursor-pointer transition-colors shadow-xs"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleZoomOut}
              title="Zoom Out"
              className="w-8 h-8 bg-white hover:bg-[#FAF7F2] text-[#121212] border border-[#D7C7B2] flex items-center justify-center cursor-pointer transition-colors shadow-xs"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() =>
                setMapType((prev) =>
                  prev === "roadmap" ? "satellite" : "roadmap"
                )
              }
              title={`Switch to ${mapType === "roadmap" ? "Satellite" : "Roadmap"}`}
              className={`w-8 h-8 border border-[#D7C7B2] flex items-center justify-center cursor-pointer transition-colors shadow-xs ${
                mapType === "satellite"
                  ? "bg-[#121212] text-[#FAF7F2]"
                  : "bg-white text-[#121212] hover:bg-[#FAF7F2]"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() =>
                setViewMode((prev) => (prev === "static" ? "interactive" : "static"))
              }
              title={`Switch to ${viewMode === "static" ? "Interactive Map" : "Static Map"}`}
              className={`w-8 h-8 border border-[#D7C7B2] flex items-center justify-center cursor-pointer transition-colors shadow-xs ${
                viewMode === "interactive"
                  ? "bg-[#BFA076] text-[#121212]"
                  : "bg-white text-[#121212] hover:bg-[#FAF7F2]"
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Floating or Bottom Studio Info Overlay */}
      {showOverlayCard && (
        <div className="p-4 sm:p-5 bg-white border-t border-[#E8DED0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h4 className="font-serif text-base sm:text-lg text-[#121212] font-medium">
                {title}
              </h4>
            </div>
            <p className="text-xs text-[#554837] leading-relaxed max-w-xl">
              {address}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-[#7B6955] font-sans">
              <span className="inline-flex items-center gap-1 font-mono">
                <span>Plus Code:</span>
                <strong className="text-[#121212]">{plusCode}</strong>
              </span>
              <span>•</span>
              <span className="font-mono">
                {latitude.toFixed(4)}° N, {longitude.toFixed(4)}° E
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyPlusCode}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs uppercase tracking-wider text-[#554837] hover:text-[#121212] bg-[#FAF7F2] hover:bg-[#F3ECE1] border border-[#D7C7B2] cursor-pointer transition-colors"
            >
              {copiedPlusCode ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>

            <a
              href={googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-widest text-[#FAF7F2] bg-[#121212] hover:bg-[#2C2C2C] border border-[#121212] cursor-pointer transition-colors shadow-xs"
            >
              <Navigation className="w-3.5 h-3.5 text-[#BFA076]" />
              <span>Get Directions</span>
              <ExternalLink className="w-3 h-3 text-white/60 ml-0.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
