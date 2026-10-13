"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected client-side runtime errors
    console.error("Runtime Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#121212]">
      <Header />
      <main className="flex-1 flex items-center justify-center py-32 px-6">
        <div className="max-w-xl mx-auto text-center space-y-8">
          <div className="w-16 h-16 rounded-full bg-[#F3ECE1] border border-[#E8DED0] flex items-center justify-center mx-auto text-[#7B6955]">
            <AlertCircle className="w-8 h-8 stroke-[1.5]" />
          </div>

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-[#7B6955] font-sans font-medium">
              500 • Application Error
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-light tracking-tight text-[#121212]">
              Moment Temporarily Unavailable
            </h1>
            <p className="text-sm sm:text-base text-[#554837] font-light max-w-md mx-auto leading-relaxed">
              An unexpected issue occurred while rendering this page. Our system has logged the event and our team has been notified.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => reset()}
              type="button"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#121212] text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#2C2C2C] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Try Again</span>
            </button>
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white border border-[#E8DED0] text-[#121212] text-xs uppercase tracking-[0.2em] font-medium hover:border-[#121212] transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Return Home</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
