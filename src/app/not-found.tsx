import Link from "next/link";
import { Home, Compass } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#121212]">
      <Header />
      <main className="flex-1 flex items-center justify-center py-32 px-6">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="w-16 h-16 rounded-full bg-[#F3ECE1] border border-[#E8DED0] flex items-center justify-center mx-auto text-[#121212]">
            <Compass className="w-8 h-8 stroke-[1.5]" />
          </div>

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-[#7B6955] font-sans font-medium">
              404 • Page Not Found
            </p>
            <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-tight text-[#121212]">
              Lost In The Frame
            </h1>
            <p className="text-sm sm:text-base text-[#554837] font-light max-w-md mx-auto leading-relaxed">
              The page you are looking for may have moved, been renamed, or does not exist. Explore our primary collections below.
            </p>
          </div>

          {/* Quick Helpful Discovery Links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto text-center">
            <Link
              href="/"
              className="p-3 bg-white border border-[#E8DED0] hover:border-[#121212] transition-colors text-xs uppercase tracking-wider text-[#121212]"
            >
              Home
            </Link>
            <Link
              href="/services"
              className="p-3 bg-white border border-[#E8DED0] hover:border-[#121212] transition-colors text-xs uppercase tracking-wider text-[#121212]"
            >
              Services
            </Link>
            <Link
              href="/portfolio"
              className="p-3 bg-white border border-[#E8DED0] hover:border-[#121212] transition-colors text-xs uppercase tracking-wider text-[#121212]"
            >
              Portfolio
            </Link>
            <Link
              href="/contact"
              className="p-3 bg-white border border-[#E8DED0] hover:border-[#121212] transition-colors text-xs uppercase tracking-wider text-[#121212]"
            >
              Contact
            </Link>
          </div>

          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#121212] text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#2C2C2C] transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Return to Homepage</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
