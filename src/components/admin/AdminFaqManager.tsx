"use client";

import React, { useState, useEffect } from "react";
import {
  HelpCircle,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  RefreshCw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export interface FaqItemRecord {
  id: string;
  category: string;
  question: string;
  answer: string;
  related_service_slug?: string;
  order_index?: number;
  created_at?: string;
}

export default function AdminFaqManager() {
  const [faqs, setFaqs] = useState<FaqItemRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form State
  const [formCategory, setFormCategory] = useState("General");
  const [formCustomCategory, setFormCustomCategory] = useState("");
  const [formQuestion, setFormQuestion] = useState("");
  const [formAnswer, setFormAnswer] = useState("");
  const [formRelatedService, setFormRelatedService] = useState("");
  const [formOrderIndex, setFormOrderIndex] = useState(0);

  // Accordion preview in admin
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/faqs");
      const data = await res.json();
      if (data.success && Array.isArray(data.faqs)) {
        setFaqs(data.faqs);
      }
    } catch (err) {
      console.error("Failed to load FAQs:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const openNewFaqModal = () => {
    setEditingFaqId(null);
    setFormCategory("General");
    setFormCustomCategory("");
    setFormQuestion("");
    setFormAnswer("");
    setFormRelatedService("");
    setFormOrderIndex(faqs.length);
    setIsEditorOpen(true);
  };

  const openEditFaqModal = (faq: FaqItemRecord) => {
    setEditingFaqId(faq.id);
    const standardCats = ["General", "Booking & Pricing", "Styles & Sessions", "Delivery & Rights"];
    if (standardCats.includes(faq.category)) {
      setFormCategory(faq.category);
      setFormCustomCategory("");
    } else {
      setFormCategory("Custom");
      setFormCustomCategory(faq.category);
    }
    setFormQuestion(faq.question);
    setFormAnswer(faq.answer);
    setFormRelatedService(faq.related_service_slug || "");
    setFormOrderIndex(faq.order_index ?? 0);
    setIsEditorOpen(true);
  };

  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formQuestion.trim() || !formAnswer.trim()) {
      alert("Please provide both a Question and an Answer.");
      return;
    }

    setIsSaving(true);
    setFeedback(null);

    const categoryFinal =
      formCategory === "Custom"
        ? (formCustomCategory.trim() || "General")
        : formCategory;

    const payload = {
      category: categoryFinal,
      question: formQuestion.trim(),
      answer: formAnswer.trim(),
      related_service_slug: formRelatedService.trim() || null,
      order_index: Number(formOrderIndex) || 0,
    };

    try {
      if (editingFaqId) {
        // PUT
        const res = await fetch("/api/admin/faqs", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingFaqId, ...payload }),
        });
        const data = await res.json();
        if (data.success) {
          setFeedback({ type: "success", message: "FAQ updated in Supabase!" });
          setIsEditorOpen(false);
          fetchFaqs();
        } else {
          setFeedback({ type: "error", message: data.error || "Failed to update FAQ." });
        }
      } else {
        // POST
        const res = await fetch("/api/admin/faqs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          setFeedback({ type: "success", message: "New FAQ created in Supabase!" });
          setIsEditorOpen(false);
          fetchFaqs();
        } else {
          setFeedback({ type: "error", message: data.error || "Failed to create FAQ." });
        }
      }
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Network error saving FAQ." });
    } finally {
      setIsSaving(false);
      setTimeout(() => setFeedback(null), 5000);
    }
  };

  const handleDeleteFaq = async (id: string, question: string) => {
    if (!window.confirm(`Delete question: "${question}"?`)) return;
    try {
      const res = await fetch(`/api/admin/faqs?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setFaqs((prev) => prev.filter((f) => f.id !== id));
        setFeedback({ type: "success", message: "FAQ item removed from Supabase." });
        setTimeout(() => setFeedback(null), 4000);
      } else {
        alert(data.error || "Failed to delete FAQ");
      }
    } catch (err: any) {
      alert("Delete failed: " + err.message);
    }
  };

  const filteredFaqs = faqs.filter((f) => {
    const matchesSearch =
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === "all" || f.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl text-[#121212] flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#BFA076]" />
            <span>Frequently Asked Questions Knowledge Base</span>
          </h3>
          <p className="text-xs text-[#7B6955]">
            Manage client inquiries, pricing clarifications, booking workflows, and rights policies live in Supabase.
          </p>
        </div>

        <button
          onClick={openNewFaqModal}
          className="px-5 py-2.5 bg-[#121212] text-white hover:bg-[#2C2C2C] uppercase tracking-widest text-xs font-medium cursor-pointer transition-colors flex items-center justify-center gap-2 shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 text-[#BFA076]" />
          <span>Add New FAQ</span>
        </button>
      </div>

      {feedback && (
        <div
          className={`p-4 border text-xs sm:text-sm flex items-center justify-between ${
            feedback.type === "success"
              ? "bg-emerald-50 border-emerald-300 text-emerald-900"
              : "bg-red-50 border-red-300 text-red-900"
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{feedback.message}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="text-xs font-bold px-2 cursor-pointer">
            ✕
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 border border-[#E8DED0] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7B6955]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs by question or answer..."
            className="w-full pl-9 pr-4 py-2 bg-[#FAF7F2] border border-[#D7C7B2] text-xs text-[#121212] focus:outline-none focus:border-[#BFA076]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto text-xs">
          {["all", "General", "Booking & Pricing", "Styles & Sessions", "Delivery & Rights"].map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 uppercase tracking-wider text-[11px] transition-colors cursor-pointer ${
                  categoryFilter === cat
                    ? "bg-[#121212] text-white"
                    : "bg-[#FAF7F2] text-[#7B6955] border border-[#E8DED0] hover:bg-white"
                }`}
              >
                {cat === "all" ? "All Categories" : cat}
              </button>
            )
          )}
        </div>
      </div>

      {/* FAQs List */}
      {isLoading ? (
        <div className="p-12 text-center bg-white border border-[#E8DED0]">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#BFA076]" />
          <p className="text-xs text-[#7B6955] mt-2">Loading FAQs from Supabase...</p>
        </div>
      ) : filteredFaqs.length === 0 ? (
        <div className="p-12 text-center bg-white border border-[#E8DED0] space-y-3">
          <p className="font-serif text-lg text-[#121212]">No FAQ items found</p>
          <p className="text-xs text-[#7B6955]">
            {searchQuery
              ? "Try adjusting your search query or category filter."
              : "Add frequently asked questions to help clients and optimize Google rich snippets."}
          </p>
          <button
            onClick={openNewFaqModal}
            className="mt-2 px-4 py-2 bg-[#121212] text-white text-xs uppercase tracking-wider cursor-pointer"
          >
            Create First FAQ
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white border border-[#E8DED0] overflow-hidden shadow-xs"
              >
                <div className="p-4 sm:p-5 flex items-start justify-between gap-4">
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="px-2 py-0.5 bg-[#FAF7F2] text-[#7B6955] border border-[#E8DED0] text-[10px] uppercase tracking-wider font-medium">
                        {faq.category}
                      </span>
                      {faq.order_index !== undefined && (
                        <span className="text-[10px] text-[#9A8874] font-mono">
                          Order: #{faq.order_index}
                        </span>
                      )}
                      {faq.related_service_slug && (
                        <span className="text-[10px] text-[#9A8874]">
                          Linked: {faq.related_service_slug}
                        </span>
                      )}
                    </div>

                    <h4 className="font-serif text-base sm:text-lg text-[#121212] font-normal flex items-center justify-between">
                      <span>{faq.question}</span>
                    </h4>

                    {isExpanded && (
                      <p className="text-xs sm:text-sm text-[#554837] font-light leading-relaxed mt-3 pt-3 border-t border-[#F3ECE1]">
                        {faq.answer}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0 pt-1">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                      className="p-1.5 text-[#7B6955] hover:text-[#121212] cursor-pointer"
                      title={isExpanded ? "Collapse" : "Expand"}
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => openEditFaqModal(faq)}
                      className="p-1.5 text-[#554837] hover:text-[#121212] hover:bg-[#FAF7F2] border border-transparent hover:border-[#D7C7B2] rounded-xs cursor-pointer"
                      title="Edit FAQ"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteFaq(faq.id, faq.question)}
                      className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 border border-transparent hover:border-red-200 rounded-xs cursor-pointer"
                      title="Delete FAQ"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* FAQ Editor Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white border border-[#E8DED0] max-w-2xl w-full shadow-2xl flex flex-col my-8">
            {/* Modal Header */}
            <div className="p-6 bg-[#121212] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#BFA076]" />
                <h4 className="font-serif text-xl">
                  {editingFaqId ? "Edit FAQ Item" : "Create New FAQ"}
                </h4>
              </div>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="text-white/60 hover:text-white text-lg font-bold px-2 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSaveFaq} className="p-6 sm:p-8 space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                    Category *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-xs text-[#121212] focus:outline-none focus:border-[#BFA076]"
                  >
                    <option value="General">General</option>
                    <option value="Booking & Pricing">Booking &amp; Pricing</option>
                    <option value="Styles & Sessions">Styles &amp; Sessions</option>
                    <option value="Delivery & Rights">Delivery &amp; Rights</option>
                    <option value="Custom">Custom Category...</option>
                  </select>
                </div>

                {formCategory === "Custom" ? (
                  <div>
                    <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                      Custom Category Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formCustomCategory}
                      onChange={(e) => setFormCustomCategory(e.target.value)}
                      placeholder="e.g. Travel Logistics"
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-xs text-[#121212] focus:outline-none focus:border-[#BFA076]"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                      Display Order Index
                    </label>
                    <input
                      type="number"
                      value={formOrderIndex}
                      onChange={(e) => setFormOrderIndex(Number(e.target.value))}
                      placeholder="0"
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-xs text-[#121212] focus:outline-none focus:border-[#BFA076]"
                    />
                  </div>
                )}

                <div className="sm:col-span-2">
                  <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                    Question *
                  </label>
                  <input
                    type="text"
                    required
                    value={formQuestion}
                    onChange={(e) => setFormQuestion(e.target.value)}
                    placeholder="e.g. How far in advance should we book our destination wedding?"
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] focus:outline-none focus:border-[#BFA076]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                    Comprehensive Answer *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formAnswer}
                    onChange={(e) => setFormAnswer(e.target.value)}
                    placeholder="Provide a clear, detailed, and polite answer for clients..."
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-xs text-[#121212] focus:outline-none focus:border-[#BFA076] leading-relaxed"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                    Related Service (Optional link to service)
                  </label>
                  <select
                    value={formRelatedService}
                    onChange={(e) => setFormRelatedService(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-xs text-[#121212] focus:outline-none focus:border-[#BFA076]"
                  >
                    <option value="">None (Applies to all services)</option>
                    <option value="portrait-photography">Portrait Photography</option>
                    <option value="wedding-photography">Wedding Photography</option>
                    <option value="event-photography">Event Photography</option>
                    <option value="sports-photography">Sports Photography</option>
                    <option value="commercial-photography">Commercial Photography</option>
                    <option value="travel-wildlife-photography">Travel &amp; Wildlife</option>
                  </select>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8DED0]">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-5 py-2.5 border border-[#D7C7B2] text-[#554837] hover:text-[#121212] text-xs uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-[#121212] text-white hover:bg-[#2C2C2C] disabled:bg-gray-400 text-xs uppercase tracking-widest font-medium cursor-pointer transition-colors flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving FAQ...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#BFA076]" />
                      <span>{editingFaqId ? "Save Changes" : "Create FAQ"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
