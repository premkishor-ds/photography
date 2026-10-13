"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Camera,
  Layers,
  Plus,
  Edit2,
  Trash2,
  Search,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  Save,
  X,
} from "lucide-react";
import { GEAR_CATEGORIES, GearCategory } from "@/data/gearData";

interface GearItemData {
  id: string;
  slug: string;
  name: string;
  manufacturer: string;
  category: GearCategory;
  categoryLabel: string;
  modelNumber: string | null;
  description: string;
  primaryUses: string[];
  compatibility: string;
  imageUrl: string;
  imageAlt: string;
  specifications: { label: string; value: string | null }[];
  reviewUrl: string | null;
  relatedPortfolioUrls: { label: string; url: string }[];
  ownershipStatus: string;
  published: boolean;
}

export default function AdminGearManager() {
  const [items, setItems] = useState<GearItemData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GearItemData | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState<{
    name: string;
    slug: string;
    manufacturer: string;
    category: GearCategory;
    categoryLabel: string;
    modelNumber: string;
    description: string;
    primaryUses: string;
    compatibility: string;
    imageUrl: string;
    imageAlt: string;
    specs: { label: string; value: string }[];
    ownershipStatus: string;
    published: boolean;
  }>({
    name: "",
    slug: "",
    manufacturer: "Sony",
    category: "camera-bodies",
    categoryLabel: "Camera Bodies",
    modelNumber: "",
    description: "",
    primaryUses: "",
    compatibility: "",
    imageUrl: "",
    imageAlt: "",
    specs: [{ label: "", value: "" }],
    ownershipStatus: "Active Kit",
    published: true,
  });

  const loadGear = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/gear");
      const data = await res.json();
      if (data.success && Array.isArray(data.items)) {
        setItems(data.items);
      }
    } catch (err: any) {
      setFeedback({ type: "error", message: `Failed to load equipment: ${err.message}` });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadGear();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      slug: "",
      manufacturer: "Sony",
      category: "camera-bodies",
      categoryLabel: "Full-frame mirrorless camera",
      modelNumber: "",
      description: "",
      primaryUses: "Wildlife Photography, Sports Photography",
      compatibility: "Sony E-mount full-frame cameras",
      imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Photography equipment preview",
      specs: [
        { label: "Lens Mount / Format", value: "Sony E-mount" },
        { label: "Weight", value: "Approx. 500g" },
      ],
      ownershipStatus: "Active Kit",
      published: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: GearItemData) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      slug: item.slug,
      manufacturer: item.manufacturer || "",
      category: item.category,
      categoryLabel: item.categoryLabel || "",
      modelNumber: item.modelNumber || "",
      description: item.description || "",
      primaryUses: Array.isArray(item.primaryUses) ? item.primaryUses.join(", ") : "",
      compatibility: item.compatibility || "",
      imageUrl: item.imageUrl || "",
      imageAlt: item.imageAlt || "",
      specs:
        Array.isArray(item.specifications) && item.specifications.length > 0
          ? item.specifications.map((s) => ({ label: s.label, value: s.value || "" }))
          : [{ label: "", value: "" }],
      ownershipStatus: item.ownershipStatus || "Active Kit",
      published: item.published !== false,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setFeedback(null);

    const primaryUsesArray = formData.primaryUses
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const cleanSpecs = formData.specs.filter(
      (s) => s.label.trim().length > 0
    );

    const payload = {
      id: editingItem ? editingItem.id : undefined,
      name: formData.name,
      slug: formData.slug || undefined,
      manufacturer: formData.manufacturer,
      category: formData.category,
      categoryLabel: formData.categoryLabel,
      modelNumber: formData.modelNumber || null,
      description: formData.description,
      primaryUses: primaryUsesArray,
      compatibility: formData.compatibility,
      imageUrl: formData.imageUrl,
      imageAlt: formData.imageAlt,
      specifications: cleanSpecs,
      ownershipStatus: formData.ownershipStatus,
      published: formData.published,
    };

    try {
      const url = "/api/admin/gear";
      const method = editingItem ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();
      if (resData.success) {
        setFeedback({
          type: "success",
          message: editingItem
            ? `Successfully updated "${formData.name}"`
            : `Successfully created "${formData.name}"`,
        });
        setIsModalOpen(false);
        loadGear();
      } else {
        setFeedback({ type: "error", message: resData.error || "Failed to save equipment" });
      }
    } catch (err: any) {
      setFeedback({ type: "error", message: `Save error: ${err.message}` });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove "${name}" from equipment inventory?`)) return;

    try {
      const res = await fetch(`/api/admin/gear?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setFeedback({ type: "success", message: `Removed "${name}" from inventory.` });
        loadGear();
      } else {
        setFeedback({ type: "error", message: data.error || "Delete failed." });
      }
    } catch (err: any) {
      setFeedback({ type: "error", message: `Delete error: ${err.message}` });
    }
  };

  const handleAddSpecRow = () => {
    setFormData((prev) => ({
      ...prev,
      specs: [...prev.specs, { label: "", value: "" }],
    }));
  };

  const handleRemoveSpecRow = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      specs: prev.specs.filter((_, i) => i !== index),
    }));
  };

  const handleSpecChange = (index: number, field: "label" | "value", val: string) => {
    setFormData((prev) => {
      const copy = [...prev.specs];
      copy[index] = { ...copy[index], [field]: val };
      return { ...prev, specs: copy };
    });
  };

  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.modelNumber && item.modelNumber.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white border border-[#E8DED0]">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#7B6955] font-sans font-medium flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#BFA076]" />
            Equipment Inventory & CMS
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#121212] font-normal mt-1">
            Photography Gear Management
          </h2>
          <p className="text-xs text-[#554837] font-light mt-1 max-w-xl">
            Manage camera bodies, lenses, action cameras, audio equipment, tripods, storage & memory media, and accessories/filters. Modify configurations, compatibility notes, and verified technical specifications in real time.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-5 py-3 bg-[#121212] text-[#FAF7F2] hover:bg-[#2C2C2C] transition-colors text-xs uppercase tracking-widest font-medium inline-flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Equipment</span>
        </button>
      </div>

      {feedback && (
        <div
          className={`p-4 text-xs sm:text-sm border flex items-center gap-2.5 ${
            feedback.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 bg-white border border-[#E8DED0]">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 text-xs uppercase tracking-wider transition-colors cursor-pointer ${
              selectedCategory === "all"
                ? "bg-[#121212] text-[#FAF7F2]"
                : "bg-[#FAF7F2] text-[#554837] hover:bg-[#E8DED0]"
            }`}
          >
            All Categories ({items.length})
          </button>
          {GEAR_CATEGORIES.map((cat) => {
            const count = items.filter((i) => i.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-[#121212] text-[#FAF7F2]"
                    : "bg-[#FAF7F2] text-[#554837] hover:bg-[#E8DED0]"
                }`}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>

        <div className="relative shrink-0 w-full md:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#7B6955]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search gear by name or model..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF7F2] border border-[#D7C7B2] text-[#121212] placeholder-[#9E8870] focus:outline-none focus:bg-white"
          />
        </div>
      </div>

      {/* Equipment Records Grid */}
      {isLoading ? (
        <div className="p-12 text-center text-xs text-[#7B6955] bg-white border border-[#E8DED0]">
          Loading equipment inventory...
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="p-12 text-center text-xs text-[#7B6955] bg-white border border-[#E8DED0]">
          No equipment records matching current filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#E8DED0] flex flex-col justify-between hover:border-[#BFAB93] transition-all"
            >
              <div>
                {/* Header Thumbnail */}
                <div className="relative aspect-[16/10] w-full bg-[#121212] overflow-hidden border-b border-[#F3ECE1]">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.imageAlt || item.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/40">
                      <Camera className="w-8 h-8" />
                    </div>
                  )}
                  <span className="absolute top-2.5 left-2.5 text-[9px] uppercase tracking-wider px-2 py-0.5 bg-[#121212]/90 text-white font-medium">
                    {item.categoryLabel}
                  </span>
                  <span className="absolute top-2.5 right-2.5 text-[9px] uppercase tracking-wider px-2 py-0.5 bg-[#FAF7F2] text-[#121212] border border-[#E8DED0] font-mono">
                    {item.ownershipStatus || "Active"}
                  </span>
                </div>

                {/* Body Details */}
                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#7B6955] font-sans font-medium">
                      {item.manufacturer}
                    </span>
                    <h3 className="font-serif text-xl text-[#121212] font-normal mt-0.5">
                      {item.name}
                    </h3>
                    {item.modelNumber && (
                      <p className="text-[11px] font-mono text-[#9E8870] mt-0.5">
                        Model: {item.modelNumber}
                      </p>
                    )}
                  </div>

                  <p className="text-xs text-[#554837] font-light line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Compatibility Snippet */}
                  {item.compatibility && (
                    <div className="p-2.5 bg-[#FAF7F2] border border-[#E8DED0] text-[11px] text-[#3E3427] font-light">
                      <strong className="font-medium text-[#121212]">Compatibility:</strong>{" "}
                      {item.compatibility}
                    </div>
                  )}

                  {/* Specs Count */}
                  <div className="text-[10px] text-[#7B6955] flex items-center gap-2 pt-1">
                    <span>
                      {Array.isArray(item.specifications) ? item.specifications.length : 0} Verified Specs
                    </span>
                    <span>•</span>
                    <span>
                      {Array.isArray(item.primaryUses) ? item.primaryUses.length : 0} Use Cases
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 border-t border-[#F3ECE1] bg-[#FCFAF6] flex items-center justify-between gap-2">
                <a
                  href={`/photography-gear/${item.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] uppercase tracking-wider text-[#554837] hover:text-[#121212] inline-flex items-center gap-1 font-medium"
                >
                  <span>Preview Page</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-1.5 text-[#554837] hover:text-[#121212] hover:bg-[#FAF7F2] border border-[#D7C7B2] transition-colors cursor-pointer"
                    title="Edit Equipment Record"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.name)}
                    className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 border border-red-200 transition-colors cursor-pointer"
                    title="Delete Equipment Record"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Equipment Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xs"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl bg-[#FAF7F2] text-[#121212] shadow-2xl border border-[#E8DED0] max-h-[92vh] flex flex-col my-auto overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 bg-white border-b border-[#E8DED0] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#7B6955] font-sans font-medium">
                  {editingItem ? "Update Record" : "New Inventory Entry"}
                </span>
                <h3 className="font-serif text-2xl text-[#121212]">
                  {editingItem ? `Edit: ${editingItem.name}` : "Add Equipment Item"}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-[#554837] hover:text-[#121212] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Form Body */}
            <form onSubmit={handleSave} className="overflow-y-auto p-6 space-y-6">
              {/* Row 1: Name & Manufacturer */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#121212] font-medium mb-1.5">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sony A7 V, Dijitek 520BH Tripod"
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#D7C7B2] text-[#121212] focus:outline-none focus:border-[#121212]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#121212] font-medium mb-1.5">
                    Manufacturer / Brand *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.manufacturer}
                    onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                    placeholder="e.g. Sony, DJI, Dijitek"
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#D7C7B2] text-[#121212] focus:outline-none focus:border-[#121212]"
                  />
                </div>
              </div>

              {/* Row 2: Category & Category Label */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#121212] font-medium mb-1.5">
                    Category (Equipment Category) *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as GearCategory,
                        categoryLabel:
                          GEAR_CATEGORIES.find((c) => c.id === e.target.value)?.label ||
                          formData.categoryLabel,
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#D7C7B2] text-[#121212] focus:outline-none focus:border-[#121212]"
                  >
                    {GEAR_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#121212] font-medium mb-1.5">
                    Category Label / Badge
                  </label>
                  <input
                    type="text"
                    value={formData.categoryLabel}
                    onChange={(e) => setFormData({ ...formData, categoryLabel: e.target.value })}
                    placeholder="e.g. Full-frame prime lens, Action camera"
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#D7C7B2] text-[#121212] focus:outline-none focus:border-[#121212]"
                  />
                </div>
              </div>

              {/* Row 3: Model Number & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#121212] font-medium mb-1.5">
                    Model Number (Keep null if unverified)
                  </label>
                  <input
                    type="text"
                    value={formData.modelNumber}
                    onChange={(e) => setFormData({ ...formData, modelNumber: e.target.value })}
                    placeholder="e.g. ILCE-7M5, SEL50F18F, 130 Video Head"
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#D7C7B2] text-[#121212] focus:outline-none focus:border-[#121212]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#121212] font-medium mb-1.5">
                    Ownership / Kit Status
                  </label>
                  <input
                    type="text"
                    value={formData.ownershipStatus}
                    onChange={(e) => setFormData({ ...formData, ownershipStatus: e.target.value })}
                    placeholder="e.g. Active Kit, Studio Support Rig, In Rotation"
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#D7C7B2] text-[#121212] focus:outline-none focus:border-[#121212]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#121212] font-medium mb-1.5">
                  Short Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Accurate description of the equipment, purpose, and key attributes..."
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#D7C7B2] text-[#121212] focus:outline-none focus:border-[#121212]"
                />
              </div>

              {/* Primary Uses */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#121212] font-medium mb-1.5">
                  Primary Uses (Comma separated)
                </label>
                <input
                  type="text"
                  value={formData.primaryUses}
                  onChange={(e) => setFormData({ ...formData, primaryUses: e.target.value })}
                  placeholder="Wildlife Photography, Sports Photography, Travel Videos, Behind-the-Scenes"
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#D7C7B2] text-[#121212] focus:outline-none focus:border-[#121212]"
                />
              </div>

              {/* Compatibility Information */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#121212] font-medium mb-1.5">
                  Compatibility & Head / Mount Configuration
                </label>
                <textarea
                  rows={2}
                  value={formData.compatibility}
                  onChange={(e) => setFormData({ ...formData, compatibility: e.target.value })}
                  placeholder="Detail lens mounts, tripod heads (e.g. 130 video head, ball head), connection cables, or supported camera systems..."
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#D7C7B2] text-[#121212] focus:outline-none focus:border-[#121212]"
                />
              </div>

              {/* Image URL & Alt */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#121212] font-medium mb-1.5">
                    Product Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#D7C7B2] text-[#121212] focus:outline-none focus:border-[#121212]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#121212] font-medium mb-1.5">
                    Image Alt Text
                  </label>
                  <input
                    type="text"
                    value={formData.imageAlt}
                    onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })}
                    placeholder="Accurate descriptive alt text..."
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#D7C7B2] text-[#121212] focus:outline-none focus:border-[#121212]"
                  />
                </div>
              </div>

              {/* Verified Technical Specifications Table */}
              <div className="space-y-3 pt-2 border-t border-[#E8DED0]">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-[#121212] font-medium">
                      Verified Technical Specifications
                    </h4>
                    <p className="text-[11px] text-[#7B6955]">
                      Only include verified manufacturer specifications. Leave values blank or omitted if unverified.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddSpecRow}
                    className="px-3 py-1 bg-[#FAF7F2] border border-[#D7C7B2] hover:bg-white text-xs text-[#121212] cursor-pointer"
                  >
                    + Add Spec Row
                  </button>
                </div>

                <div className="space-y-2">
                  {formData.specs.map((row, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={row.label}
                        onChange={(e) => handleSpecChange(idx, "label", e.target.value)}
                        placeholder="Spec Label (e.g. Lens Mount)"
                        className="w-1/2 px-3 py-2 text-xs bg-white border border-[#D7C7B2] text-[#121212]"
                      />
                      <input
                        type="text"
                        value={row.value}
                        onChange={(e) => handleSpecChange(idx, "value", e.target.value)}
                        placeholder="Spec Value (e.g. Sony E-Mount)"
                        className="w-1/2 px-3 py-2 text-xs bg-white border border-[#D7C7B2] text-[#121212]"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveSpecRow(idx)}
                        className="p-2 text-red-500 hover:text-red-700 cursor-pointer"
                        title="Remove row"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-[#E8DED0] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-xs uppercase tracking-wider border border-[#D7C7B2] text-[#554837] hover:bg-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 text-xs uppercase tracking-wider bg-[#121212] text-[#FAF7F2] hover:bg-[#2C2C2C] disabled:bg-gray-400 font-medium cursor-pointer inline-flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? "Saving..." : "Save Equipment"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
