"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FileText,
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Upload,
  Calendar,
  Clock,
  User,
  Image as ImageIcon,
  Sparkles,
} from "lucide-react";

export interface BlogPostRecord {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  author_role: string;
  read_time: string;
  hero_image: string;
  hero_alt: string;
  content: {
    sectionTitle?: string;
    paragraphs: string[];
    bulletPoints?: string[];
  }[];
  related_service_slug: string;
  published_date: string;
  modified_date: string;
  created_at?: string;
}

interface SectionFormItem {
  sectionTitle: string;
  paragraphsText: string;
  bulletPointsText: string;
}

export default function AdminBlogManager() {
  const [posts, setPosts] = useState<BlogPostRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formCategory, setFormCategory] = useState("Portrait Tips");
  const [formExcerpt, setFormExcerpt] = useState("");
  const [formAuthor, setFormAuthor] = useState("Prem Kishor");
  const [formAuthorRole, setFormAuthorRole] = useState("Principal Photographer");
  const [formReadTime, setFormReadTime] = useState("5 min read");
  const [formHeroImage, setFormHeroImage] = useState(
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=80"
  );
  const [formHeroAlt, setFormHeroAlt] = useState("");
  const [formRelatedService, setFormRelatedService] = useState("portrait-photography");
  const [formPublishedDate, setFormPublishedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // Sections
  const [sections, setSections] = useState<SectionFormItem[]>([
    {
      sectionTitle: "Key Planning Considerations",
      paragraphsText: "Write the in-depth guide paragraphs here. Press enter twice for a new paragraph.",
      bulletPointsText: "Bullet point 1\nBullet point 2",
    },
  ]);

  // Upload state
  const [uploadMode, setUploadMode] = useState<"file" | "url">("file");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/blog");
      const data = await res.json();
      if (data.success && Array.isArray(data.posts)) {
        setPosts(data.posts);
      }
    } catch (err) {
      console.error("Failed to load blog posts:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const openNewArticleModal = () => {
    setEditingPostId(null);
    setFormTitle("");
    setFormSlug("");
    setFormCategory("Portrait Tips");
    setFormExcerpt("");
    setFormAuthor("Prem Kishor");
    setFormAuthorRole("Principal Photographer");
    setFormReadTime("5 min read");
    setFormHeroImage(
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=80"
    );
    setFormHeroAlt("");
    setFormRelatedService("portrait-photography");
    setFormPublishedDate(new Date().toISOString().split("T")[0]);
    setSections([
      {
        sectionTitle: "Overview & Essential Advice",
        paragraphsText: "Introduce your photography insights with depth and authentic expertise.",
        bulletPointsText: "",
      },
    ]);
    setIsEditorOpen(true);
  };

  const openEditArticleModal = (post: BlogPostRecord) => {
    setEditingPostId(post.id);
    setFormTitle(post.title);
    setFormSlug(post.slug);
    setFormCategory(post.category);
    setFormExcerpt(post.excerpt || "");
    setFormAuthor(post.author || "Prem Kishor");
    setFormAuthorRole(post.author_role || "Principal Photographer");
    setFormReadTime(post.read_time || "5 min read");
    setFormHeroImage(post.hero_image || "");
    setFormHeroAlt(post.hero_alt || "");
    setFormRelatedService(post.related_service_slug || "portrait-photography");
    setFormPublishedDate(post.published_date || new Date().toISOString().split("T")[0]);

    // parse content into sections
    let parsedContent = post.content;
    if (typeof parsedContent === "string") {
      try {
        parsedContent = JSON.parse(parsedContent);
      } catch (e) {
        parsedContent = [];
      }
    }

    if (Array.isArray(parsedContent) && parsedContent.length > 0) {
      setSections(
        parsedContent.map((sec) => ({
          sectionTitle: sec.sectionTitle || "",
          paragraphsText: Array.isArray(sec.paragraphs) ? sec.paragraphs.join("\n\n") : "",
          bulletPointsText: Array.isArray(sec.bulletPoints) ? sec.bulletPoints.join("\n") : "",
        }))
      );
    } else {
      setSections([
        {
          sectionTitle: "Overview",
          paragraphsText: "",
          bulletPointsText: "",
        },
      ]);
    }

    setIsEditorOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setFormTitle(val);
    if (!editingPostId) {
      const derived = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormSlug(derived);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    setIsUploading(true);
    setUploadError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.success && data.url) {
        setFormHeroImage(data.url);
      } else {
        setUploadError(data.error || "Upload failed");
      }
    } catch (err: any) {
      setUploadError(err.message || "Upload request error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddSection = () => {
    setSections((prev) => [
      ...prev,
      {
        sectionTitle: "",
        paragraphsText: "",
        bulletPointsText: "",
      },
    ]);
  };

  const handleRemoveSection = (idx: number) => {
    if (sections.length <= 1) return;
    setSections((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSectionChange = (idx: number, field: keyof SectionFormItem, val: string) => {
    setSections((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: val };
      return updated;
    });
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      alert("Please provide a title for the article.");
      return;
    }

    setIsSaving(true);
    setFeedback(null);

    // Build structured content
    const structuredContent = sections
      .map((s) => ({
        sectionTitle: s.sectionTitle.trim() || undefined,
        paragraphs: s.paragraphsText
          .split("\n\n")
          .map((p) => p.trim())
          .filter(Boolean),
        bulletPoints: s.bulletPointsText
          .split("\n")
          .map((b) => b.trim())
          .filter(Boolean),
      }))
      .filter((s) => s.paragraphs.length > 0 || (s.bulletPoints && s.bulletPoints.length > 0));

    const payload = {
      title: formTitle.trim(),
      slug: formSlug.trim() || formTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category: formCategory,
      excerpt: formExcerpt.trim(),
      author: formAuthor.trim(),
      author_role: formAuthorRole.trim(),
      read_time: formReadTime.trim(),
      hero_image: formHeroImage.trim(),
      hero_alt: formHeroAlt.trim() || formTitle.trim(),
      content: structuredContent,
      related_service_slug: formRelatedService,
      published_date: formPublishedDate,
      modified_date: new Date().toISOString().split("T")[0],
    };

    try {
      if (editingPostId) {
        // PUT
        const res = await fetch("/api/admin/blog", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingPostId, ...payload }),
        });
        const data = await res.json();
        if (data.success) {
          setFeedback({ type: "success", message: "Blog article updated in Supabase!" });
          setIsEditorOpen(false);
          fetchPosts();
        } else {
          setFeedback({ type: "error", message: data.error || "Failed to update article." });
        }
      } else {
        // POST
        const res = await fetch("/api/admin/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          setFeedback({ type: "success", message: "New blog article published to Supabase!" });
          setIsEditorOpen(false);
          fetchPosts();
        } else {
          setFeedback({ type: "error", message: data.error || "Failed to publish article." });
        }
      }
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Network error saving article." });
    } finally {
      setIsSaving(false);
      setTimeout(() => setFeedback(null), 5000);
    }
  };

  const handleDeleteArticle = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/blog?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
        setFeedback({ type: "success", message: "Article removed successfully from Supabase." });
        setTimeout(() => setFeedback(null), 4000);
      } else {
        alert(data.error || "Failed to delete article");
      }
    } catch (err: any) {
      alert("Delete failed: " + err.message);
    }
  };

  const filteredPosts = posts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === "all" || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl text-[#121212] flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#BFA076]" />
            <span>Blog &amp; Client Planning Guides</span>
          </h3>
          <p className="text-xs text-[#7B6955]">
            Manage all educational articles, wedding guides, stylist advice, and technical essays stored in Supabase.
          </p>
        </div>

        <button
          onClick={openNewArticleModal}
          className="px-5 py-2.5 bg-[#121212] text-white hover:bg-[#2C2C2C] uppercase tracking-widest text-xs font-medium cursor-pointer transition-colors flex items-center justify-center gap-2 shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 text-[#BFA076]" />
          <span>Write New Article</span>
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
            placeholder="Search articles by title or keyword..."
            className="w-full pl-9 pr-4 py-2 bg-[#FAF7F2] border border-[#D7C7B2] text-xs text-[#121212] focus:outline-none focus:border-[#BFA076]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto text-xs">
          {["all", "Portrait Tips", "Wedding Guides", "Commercial & Brand", "Action & Technique"].map(
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

      {/* Articles Grid */}
      {isLoading ? (
        <div className="p-12 text-center bg-white border border-[#E8DED0]">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#BFA076]" />
          <p className="text-xs text-[#7B6955] mt-2">Loading articles from Supabase...</p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="p-12 text-center bg-white border border-[#E8DED0] space-y-3">
          <p className="font-serif text-lg text-[#121212]">No articles found</p>
          <p className="text-xs text-[#7B6955]">
            {searchQuery
              ? "Try adjusting your search query or category filter."
              : "Create your first photography guide to engage potential clients and boost SEO!"}
          </p>
          <button
            onClick={openNewArticleModal}
            className="mt-2 px-4 py-2 bg-[#121212] text-white text-xs uppercase tracking-wider cursor-pointer"
          >
            Create Article
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white border border-[#E8DED0] overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
            >
              <div>
                <div className="relative aspect-[16/10] w-full bg-[#121212] overflow-hidden">
                  {post.hero_image ? (
                    <Image
                      src={post.hero_image}
                      alt={post.hero_alt || post.title}
                      fill
                      className="object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#FAF7F2]/40">
                      <ImageIcon className="w-8 h-8" />
                    </div>
                  )}
                  <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-black/75 text-white backdrop-blur-xs">
                    {post.category}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-3 text-[11px] text-[#7B6955]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.published_date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.read_time}
                    </span>
                  </div>

                  <h4 className="font-serif text-lg text-[#121212] font-normal leading-snug line-clamp-2">
                    {post.title}
                  </h4>

                  <p className="text-xs text-[#554837] font-light line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="pt-2 text-[11px] text-[#7B6955]">
                    <span>By {post.author}</span>
                    <span className="block text-[10px] text-[#9A8874]">Slug: /blog/{post.slug}</span>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-4 bg-[#FAF7F2] border-t border-[#F3ECE1] flex items-center justify-between text-xs">
                <Link
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  className="text-[#7B6955] hover:text-[#121212] flex items-center gap-1"
                >
                  <span>Preview</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditArticleModal(post)}
                    className="p-1.5 text-[#554837] hover:text-[#121212] hover:bg-white border border-transparent hover:border-[#D7C7B2] rounded-xs cursor-pointer"
                    title="Edit Article"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteArticle(post.id, post.title)}
                    className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 border border-transparent hover:border-red-200 rounded-xs cursor-pointer"
                    title="Delete Article"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white border border-[#E8DED0] max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col my-8">
            {/* Modal Header */}
            <div className="p-6 bg-[#121212] text-white flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#BFA076]" />
                <h4 className="font-serif text-xl">
                  {editingPostId ? "Edit Blog Article" : "Write New Blog Article"}
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
            <form onSubmit={handleSaveArticle} className="p-6 sm:p-8 space-y-6 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. What to Wear for a Portrait Photoshoot: Stylist Guide"
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-sm text-[#121212] focus:outline-none focus:border-[#BFA076]"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    placeholder="e.g. what-to-wear-for-a-portrait-photoshoot"
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] font-mono text-xs text-[#121212] focus:outline-none focus:border-[#BFA076]"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                    Category *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-xs text-[#121212] focus:outline-none focus:border-[#BFA076]"
                  >
                    <option value="Portrait Tips">Portrait Tips</option>
                    <option value="Wedding Guides">Wedding Guides</option>
                    <option value="Commercial & Brand">Commercial &amp; Brand</option>
                    <option value="Action & Technique">Action &amp; Technique</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                    Excerpt / SEO Description *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formExcerpt}
                    onChange={(e) => setFormExcerpt(e.target.value)}
                    placeholder="Brief 1-2 sentence overview shown on index cards and meta descriptions."
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-xs text-[#121212] focus:outline-none focus:border-[#BFA076]"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    placeholder="Prem Kishor"
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-xs text-[#121212] focus:outline-none focus:border-[#BFA076]"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                    Author Role
                  </label>
                  <input
                    type="text"
                    value={formAuthorRole}
                    onChange={(e) => setFormAuthorRole(e.target.value)}
                    placeholder="Principal Editorial Photographer"
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-xs text-[#121212] focus:outline-none focus:border-[#BFA076]"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                    Estimated Read Time
                  </label>
                  <input
                    type="text"
                    value={formReadTime}
                    onChange={(e) => setFormReadTime(e.target.value)}
                    placeholder="5 min read"
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-xs text-[#121212] focus:outline-none focus:border-[#BFA076]"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                    Related Service Slug
                  </label>
                  <select
                    value={formRelatedService}
                    onChange={(e) => setFormRelatedService(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-xs text-[#121212] focus:outline-none focus:border-[#BFA076]"
                  >
                    <option value="portrait-photography">Portrait Photography</option>
                    <option value="wedding-photography">Wedding Photography</option>
                    <option value="event-photography">Event Photography</option>
                    <option value="sports-photography">Sports Photography</option>
                    <option value="commercial-photography">Commercial Photography</option>
                    <option value="travel-wildlife-photography">Travel &amp; Wildlife</option>
                  </select>
                </div>
              </div>

              {/* Hero Image Section */}
              <div className="p-4 bg-[#FAF7F2] border border-[#E8DED0] space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block uppercase tracking-wider text-[#7B6955] font-medium text-xs">
                    Hero Cover Photograph *
                  </label>
                  <div className="flex items-center gap-1 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setUploadMode("file")}
                      className={`px-2.5 py-1 uppercase tracking-wider cursor-pointer ${
                        uploadMode === "file" ? "bg-[#121212] text-white" : "bg-white text-[#7B6955] border border-[#D7C7B2]"
                      }`}
                    >
                      Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => setUploadMode("url")}
                      className={`px-2.5 py-1 uppercase tracking-wider cursor-pointer ${
                        uploadMode === "url" ? "bg-[#121212] text-white" : "bg-white text-[#7B6955] border border-[#D7C7B2]"
                      }`}
                    >
                      Image URL
                    </button>
                  </div>
                </div>

                {uploadMode === "file" ? (
                  <div className="space-y-2">
                    <label className="border-2 border-dashed border-[#D7C7B2] hover:border-[#BFA076] p-6 text-center block cursor-pointer bg-white transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) handleFileUpload(f);
                        }}
                      />
                      <Upload className="w-6 h-6 mx-auto text-[#BFA076] mb-1" />
                      <p className="text-xs text-[#121212] font-medium">
                        Click or drag hero photo to upload
                      </p>
                      <p className="text-[10px] text-[#7B6955]">
                        Supported: JPG, PNG, WebP (Max 20MB)
                      </p>
                    </label>
                    {isUploading && (
                      <p className="text-xs text-[#BFA076] flex items-center gap-1.5">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        Uploading to Supabase storage...
                      </p>
                    )}
                    {uploadError && (
                      <p className="text-xs text-red-600 font-sans">{uploadError}</p>
                    )}
                  </div>
                ) : (
                  <div>
                    <input
                      type="url"
                      value={formHeroImage}
                      onChange={(e) => setFormHeroImage(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full p-2.5 bg-white border border-[#D7C7B2] text-xs text-[#121212] focus:outline-none focus:border-[#BFA076]"
                    />
                  </div>
                )}

                <div>
                  <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium text-[11px]">
                    Hero Image Alt Text
                  </label>
                  <input
                    type="text"
                    value={formHeroAlt}
                    onChange={(e) => setFormHeroAlt(e.target.value)}
                    placeholder="Descriptive caption for accessibility and SEO"
                    className="w-full p-2 bg-white border border-[#D7C7B2] text-xs text-[#121212] focus:outline-none focus:border-[#BFA076]"
                  />
                </div>

                {formHeroImage && (
                  <div className="flex items-center gap-3 pt-2">
                    <div className="relative w-20 h-14 bg-black overflow-hidden border border-[#D7C7B2]">
                      <Image
                        src={formHeroImage}
                        alt="Hero preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-[11px] text-[#7B6955] truncate max-w-sm">
                      {formHeroImage}
                    </span>
                  </div>
                )}
              </div>

              {/* Dynamic Content Sections */}
              <div className="space-y-4 pt-2 border-t border-[#E8DED0]">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-serif text-lg text-[#121212]">
                      Article Content Sections
                    </h5>
                    <p className="text-xs text-[#7B6955]">
                      Organize your guide into readable sections with headings, paragraphs, and optional bullet points.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddSection}
                    className="px-3 py-1.5 bg-[#FAF7F2] text-[#121212] border border-[#D7C7B2] hover:bg-white text-xs uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Section</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {sections.map((sec, idx) => (
                    <div
                      key={idx}
                      className="p-5 bg-white border border-[#E8DED0] space-y-3 relative group"
                    >
                      <div className="flex items-center justify-between border-b border-[#F3ECE1] pb-2">
                        <span className="text-xs font-semibold text-[#BFA076] uppercase tracking-wider">
                          Section {idx + 1}
                        </span>
                        {sections.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveSection(idx)}
                            className="text-xs text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            Remove Section
                          </button>
                        )}
                      </div>

                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                            Section Subtitle (H2)
                          </label>
                          <input
                            type="text"
                            value={sec.sectionTitle}
                            onChange={(e) =>
                              handleSectionChange(idx, "sectionTitle", e.target.value)
                            }
                            placeholder="e.g. Prioritize Timeless Neutral Palettes"
                            className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-xs text-[#121212] focus:outline-none focus:border-[#BFA076]"
                          />
                        </div>

                        <div>
                          <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                            Paragraphs (Separate paragraphs with double Enter / blank line)
                          </label>
                          <textarea
                            rows={4}
                            value={sec.paragraphsText}
                            onChange={(e) =>
                              handleSectionChange(idx, "paragraphsText", e.target.value)
                            }
                            placeholder="Write paragraphs here. Use an empty line to start a new paragraph."
                            className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-xs text-[#121212] focus:outline-none focus:border-[#BFA076]"
                          />
                        </div>

                        <div>
                          <label className="block uppercase tracking-wider text-[#7B6955] mb-1 font-medium">
                            Key Bullet Points (Optional, 1 point per line)
                          </label>
                          <textarea
                            rows={3}
                            value={sec.bulletPointsText}
                            onChange={(e) =>
                              handleSectionChange(idx, "bulletPointsText", e.target.value)
                            }
                            placeholder="Avoid small dense patterns&#10;Choose solid earth tones&#10;Bring 2-3 outfit choices"
                            className="w-full p-2.5 bg-[#FAF7F2] border border-[#D7C7B2] text-xs text-[#121212] focus:outline-none focus:border-[#BFA076]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
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
                      <span>Saving Article...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#BFA076]" />
                      <span>{editingPostId ? "Save Changes" : "Publish Article"}</span>
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
