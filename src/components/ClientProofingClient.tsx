"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  Lock,
  Unlock,
  Heart,
  CheckCircle2,
  Download,
  Send,
  Eye,
  Sliders,
  Sparkles,
  ShieldCheck,
  Calendar,
  MapPin,
  Camera,
  Layers,
  ArrowRight,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Lightbox from "@/components/Lightbox";
import { PortfolioItem } from "@/data/photographyData";

interface ProofPhoto {
  id: string;
  filename: string;
  title: string;
  url: string;
  aspectRatio: "portrait" | "landscape" | "square";
  rating?: number;
  notes?: string;
  selected: boolean;
}

interface ProofAlbum {
  code: string;
  clientName: string;
  eventTitle: string;
  shootDate: string;
  location: string;
  photographer: string;
  maxSelections: number;
  deliveryDate: string;
  photos: ProofPhoto[];
}

const DEMO_ALBUMS: Record<string, ProofAlbum> = {
  ROYAL2026: {
    code: "ROYAL2026",
    clientName: "Aanya & Devraj Rathore",
    eventTitle: "Royal Palace Wedding & Pheras",
    shootDate: "February 18, 2026",
    location: "City Palace & Rambagh Palace, Jaipur",
    photographer: "Kishor Prem",
    maxSelections: 40,
    deliveryDate: "March 15, 2026",
    photos: [
      {
        id: "rp-1",
        filename: "DSC_8902_RAW.JPG",
        title: "Sunset Pheras at Sunset Pavilion",
        url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
        aspectRatio: "landscape",
        selected: true,
      },
      {
        id: "rp-2",
        filename: "DSC_8945_RAW.JPG",
        title: "Bridal Portrait with Zardozi Veil",
        url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80",
        aspectRatio: "portrait",
        selected: true,
      },
      {
        id: "rp-3",
        filename: "DSC_9012_RAW.JPG",
        title: "Groom Royal Procession",
        url: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1200&q=80",
        aspectRatio: "portrait",
        selected: false,
      },
      {
        id: "rp-4",
        filename: "DSC_9088_RAW.JPG",
        title: "Palace Courtyard Ambient Candlelight",
        url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
        aspectRatio: "landscape",
        selected: true,
      },
      {
        id: "rp-5",
        filename: "DSC_9140_RAW.JPG",
        title: "Lake Terrace Evening Romance",
        url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
        aspectRatio: "portrait",
        selected: false,
      },
      {
        id: "rp-6",
        filename: "DSC_9204_RAW.JPG",
        title: "Family Blessing & Joyful Tears",
        url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
        aspectRatio: "landscape",
        selected: true,
      },
      {
        id: "rp-7",
        filename: "DSC_9288_RAW.JPG",
        title: "Palace Fireworks Grand Finale",
        url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
        aspectRatio: "landscape",
        selected: false,
      },
      {
        id: "rp-8",
        filename: "DSC_9350_RAW.JPG",
        title: "Candid Laughter Post-Rituals",
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
        aspectRatio: "portrait",
        selected: true,
      },
    ],
  },
  JAIPUR101: {
    code: "JAIPUR101",
    clientName: "Dr. Vikram Singhania",
    eventTitle: "Keynote Editorial & Studio Portraits",
    shootDate: "January 24, 2026",
    location: "Studio 215, Shri Kishanpura, Jaipur",
    photographer: "Kishor Prem",
    maxSelections: 10,
    deliveryDate: "February 05, 2026",
    photos: [
      {
        id: "js-1",
        filename: "VKR_0142_MASTER.JPG",
        title: "Monochrome Studio Contour Keynote",
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
        aspectRatio: "portrait",
        selected: true,
      },
      {
        id: "js-2",
        filename: "VKR_0188_MASTER.JPG",
        title: "Editorial Lighting with Book Manuscript",
        url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
        aspectRatio: "portrait",
        selected: true,
      },
      {
        id: "js-3",
        filename: "VKR_0224_MASTER.JPG",
        title: "Thoughtful Rim Lighting Profile",
        url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
        aspectRatio: "landscape",
        selected: false,
      },
    ],
  },
};

export default function ClientProofingClient() {
  const { t, language } = useLanguage();
  const [accessCode, setAccessCode] = useState("");
  const [currentAlbum, setCurrentAlbum] = useState<ProofAlbum | null>(null);
  const [photos, setPhotos] = useState<ProofPhoto[]>([]);
  const [filterView, setFilterView] = useState<"all" | "selected">("all");
  const [errorMessage, setErrorMessage] = useState("");
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [activeNotesPhotoId, setActiveNotesPhotoId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");

  // Lightbox view
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const handleUnlock = (codeToTest?: string) => {
    const code = (codeToTest || accessCode).toUpperCase().trim();
    const found = DEMO_ALBUMS[code];
    if (found) {
      setCurrentAlbum(found);
      setPhotos(found.photos);
      setErrorMessage("");
      setSubmissionSuccess(false);
    } else {
      setErrorMessage(
        language === "hi"
          ? "अमान्य कोड। कृपया डेमो कोड आज़माएं: ROYAL2026 या JAIPUR101"
          : "Invalid access code. Please try demo code: ROYAL2026 or JAIPUR101"
      );
    }
  };

  const toggleSelect = (photoId: string) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === photoId ? { ...p, selected: !p.selected } : p))
    );
  };

  const selectedCount = useMemo(() => {
    return photos.filter((p) => p.selected).length;
  }, [photos]);

  const displayedPhotos = useMemo(() => {
    if (filterView === "selected") {
      return photos.filter((p) => p.selected);
    }
    return photos;
  }, [photos, filterView]);

  const handleSaveNote = (photoId: string) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === photoId ? { ...p, notes: noteText } : p))
    );
    setActiveNotesPhotoId(null);
    setNoteText("");
  };

  const handleSubmitSelections = () => {
    setSubmissionSuccess(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Convert to Lightbox items format
  const lightboxItems: PortfolioItem[] = useMemo(() => {
    return displayedPhotos.map((p) => ({
      id: p.id,
      title: p.title,
      category: "Wedding Photography",
      imageUrl: p.url,
      location: currentAlbum?.location || "Jaipur, India",
      year: "2026",
      description: p.filename,
    }));
  }, [displayedPhotos, currentAlbum]);

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8">
      {/* If no album is currently unlocked */}
      {!currentAlbum ? (
        <div className="max-w-xl mx-auto my-12 p-8 sm:p-12 bg-white border border-[#E8DED0] shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#121212] text-[#FAF7F2] mx-auto flex items-center justify-center shadow-md">
            <Lock className="w-8 h-8 stroke-[1.5]" />
          </div>

          <div className="space-y-2">
            <h1 className="font-serif text-3xl sm:text-4xl text-[#121212] font-normal tracking-tight">
              {t("proofing.title", "Private Client Proofing Gallery")}
            </h1>
            <p className="text-sm text-[#554837] font-light leading-relaxed">
              {t(
                "proofing.desc",
                "Enter your studio access key to view your private shoot proofs, mark favorite selects for luxury album print design, and leave retouching notes."
              )}
            </p>
          </div>

          {/* Key Access Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUnlock();
            }}
            className="space-y-4 pt-2"
          >
            <div className="relative">
              <input
                type="text"
                value={accessCode}
                onChange={(e) => {
                  setAccessCode(e.target.value);
                  setErrorMessage("");
                }}
                placeholder="ENTER ACCESS CODE (e.g. ROYAL2026)"
                className="w-full text-center tracking-[0.25em] font-mono text-sm sm:text-base uppercase px-4 py-3.5 bg-[#FCFAF6] border border-[#E8DED0] text-[#121212] placeholder-[#9E8870] focus:outline-none focus:ring-1 focus:ring-[#BFA076]"
                required
              />
            </div>

            {errorMessage && (
              <p className="text-xs text-rose-600 font-sans flex items-center justify-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errorMessage}</span>
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-[#121212] hover:bg-[#2C2C2C] text-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-sm cursor-pointer"
            >
              {language === "hi" ? "गैलरी अनलॉक करें" : "Unlock Private Collection"}
            </button>
          </form>

          {/* Demo access shortcuts for preview */}
          <div className="pt-4 border-t border-[#F3ECE1] space-y-2">
            <p className="text-[11px] text-[#7B6955] uppercase tracking-wider font-sans font-medium">
              Demo Client Access Keys:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => handleUnlock("ROYAL2026")}
                className="px-3 py-1 bg-[#F4EFE6] hover:bg-[#E8DED0] text-xs font-mono text-[#121212] border border-[#E8DED0] transition-colors rounded-xs cursor-pointer"
              >
                ROYAL2026 (Palace Wedding)
              </button>
              <button
                type="button"
                onClick={() => handleUnlock("JAIPUR101")}
                className="px-3 py-1 bg-[#F4EFE6] hover:bg-[#E8DED0] text-xs font-mono text-[#121212] border border-[#E8DED0] transition-colors rounded-xs cursor-pointer"
              >
                JAIPUR101 (Executive Portrait)
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Unlocked Album View */
        <div className="space-y-10 my-8">
          {/* Success Banner if submitted */}
          {submissionSuccess && (
            <div className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xs space-y-2 animate-in fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h3 className="font-serif text-lg font-medium">
                  {language === "hi"
                    ? "एल्बम चयन सफलतापूर्वक भेजा गया!"
                    : "Album Selections Successfully Submitted!"}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-emerald-800 font-light">
                Thank you, {currentAlbum.clientName}! Your {selectedCount} selected frames have
                been received by Kishor Prem Studio. We are now preparing your fine-art layout and
                will send your digital album proofing PDF by {currentAlbum.deliveryDate}.
              </p>
            </div>
          )}

          {/* Album Overview Banner */}
          <div className="bg-white border border-[#E8DED0] p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono tracking-widest px-2.5 py-0.5 bg-[#FAF7F2] border border-[#E8DED0] text-[#7B6955]">
                  Private Gallery #{currentAlbum.code}
                </span>
                <span className="text-xs text-emerald-700 font-sans flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Authenticated Client</span>
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl text-[#121212] font-normal">
                {currentAlbum.clientName}
              </h1>

              <p className="text-xs sm:text-sm text-[#7B6955] font-light">
                {currentAlbum.eventTitle}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#9E8870] font-sans pt-1">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#BFA076]" />
                  {currentAlbum.shootDate}
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#BFA076]" />
                  {currentAlbum.location}
                </span>
              </div>
            </div>

            {/* Selection Counter Pill & Submission CTA */}
            <div className="p-4 sm:p-5 bg-[#FCFAF6] border border-[#E8DED0] flex flex-col items-center sm:items-end justify-center gap-3 shrink-0">
              <div className="text-center sm:text-right">
                <div className="text-xs uppercase tracking-wider text-[#7B6955] font-sans">
                  Album Selection Tracker
                </div>
                <div className="font-serif text-2xl sm:text-3xl text-[#121212]">
                  <span className="text-[#BFA076] font-semibold">{selectedCount}</span> /{" "}
                  {currentAlbum.maxSelections}
                </div>
                <p className="text-[11px] text-[#9E8870] font-light">
                  Frames marked with ❤️ for master retouching
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleSubmitSelections}
                  disabled={selectedCount === 0 || submissionSuccess}
                  className={`w-full sm:w-auto px-5 py-2.5 text-xs uppercase tracking-widest font-medium transition-all rounded-xs flex items-center justify-center gap-2 ${
                    selectedCount > 0 && !submissionSuccess
                      ? "bg-[#121212] text-[#FAF7F2] hover:bg-[#2C2C2C] cursor-pointer shadow-sm"
                      : "bg-[#E8DED0] text-[#9E8870] cursor-not-allowed"
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submissionSuccess ? "Selections Submitted" : "Submit Album Selects"}</span>
                </button>

                <button
                  onClick={() => setCurrentAlbum(null)}
                  className="px-3 py-2.5 text-xs text-[#7B6955] hover:text-[#121212] border border-[#E8DED0] bg-white cursor-pointer"
                  title="Lock & Exit Gallery"
                >
                  <Lock className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center justify-between gap-4 border-b border-[#E8DED0] pb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterView("all")}
                className={`px-4 py-1.5 text-xs uppercase tracking-wider font-sans transition-colors cursor-pointer ${
                  filterView === "all"
                    ? "bg-[#121212] text-[#FAF7F2] font-medium"
                    : "bg-white text-[#554837] border border-[#E8DED0] hover:bg-[#F4EFE6]"
                }`}
              >
                All Proofs ({photos.length})
              </button>
              <button
                onClick={() => setFilterView("selected")}
                className={`px-4 py-1.5 text-xs uppercase tracking-wider font-sans transition-colors cursor-pointer flex items-center gap-1.5 ${
                  filterView === "selected"
                    ? "bg-[#121212] text-[#FAF7F2] font-medium"
                    : "bg-white text-[#554837] border border-[#E8DED0] hover:bg-[#F4EFE6]"
                }`}
              >
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                <span>Favorites ({selectedCount})</span>
              </button>
            </div>

            <p className="text-xs text-[#7B6955] font-light hidden sm:block">
              Click ❤️ on any photo to add to your album selection
            </p>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedPhotos.map((photo, index) => (
              <div
                key={photo.id}
                className={`group relative bg-white border transition-all duration-300 overflow-hidden ${
                  photo.selected
                    ? "border-[#BFA076] ring-2 ring-[#BFA076]/40 shadow-md"
                    : "border-[#E8DED0] hover:border-[#BFAB93] shadow-sm"
                }`}
              >
                {/* Photo Stage */}
                <div
                  className="relative aspect-[3/4] w-full bg-[#E8DED0] cursor-pointer overflow-hidden"
                  onClick={() => {
                    setActivePhotoIndex(index);
                    setLightboxOpen(true);
                  }}
                >
                  <Image
                    src={photo.url}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Gradient bottom overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Top Bar Action: Heart Selection */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSelect(photo.id);
                    }}
                    className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-md ${
                      photo.selected
                        ? "bg-rose-500 text-white scale-105"
                        : "bg-black/40 text-white/80 hover:bg-black/70 hover:text-white"
                    }`}
                    title={photo.selected ? "Remove from Album Selects" : "Add to Album Selects"}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        photo.selected ? "fill-white text-white" : "stroke-[2]"
                      }`}
                    />
                  </button>

                  {/* Filename watermark badge */}
                  <span className="absolute bottom-3 left-3 text-[10px] font-mono tracking-wider text-white/90 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-xs">
                    {photo.filename}
                  </span>
                </div>

                {/* Card Controls */}
                <div className="p-3 bg-[#FCFAF6] border-t border-[#F3ECE1] space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-medium text-[#121212] truncate">
                      {photo.title}
                    </h4>
                    <button
                      onClick={() => {
                        setActiveNotesPhotoId(
                          activeNotesPhotoId === photo.id ? null : photo.id
                        );
                        setNoteText(photo.notes || "");
                      }}
                      className="text-[#7B6955] hover:text-[#121212] p-1 cursor-pointer"
                      title="Add retouching notes"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Display existing notes if present */}
                  {photo.notes && (
                    <p className="text-[11px] text-[#554837] bg-white p-2 border border-[#E8DED0] italic font-light">
                      Note: "{photo.notes}"
                    </p>
                  )}

                  {/* Note input field if opened */}
                  {activeNotesPhotoId === photo.id && (
                    <div className="space-y-1.5 pt-1">
                      <input
                        type="text"
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="e.g. Skin retouching, crop tighter..."
                        className="w-full text-xs p-1.5 bg-white border border-[#E8DED0] focus:outline-none font-sans"
                      />
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => handleSaveNote(photo.id)}
                          className="px-2 py-0.5 text-[10px] uppercase bg-[#121212] text-white cursor-pointer"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setActiveNotesPhotoId(null)}
                          className="px-2 py-0.5 text-[10px] text-[#7B6955] cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox inspection */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={lightboxItems}
        currentIndex={activePhotoIndex}
        onNavigate={(newIndex) => setActivePhotoIndex(newIndex)}
      />
    </div>
  );
}
