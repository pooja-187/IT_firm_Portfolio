"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Globe,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  ExternalLink,
  X,
  Eye,
  Tag,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  Link as LinkIcon,
  Image as ImageIcon,
  Check,
} from "lucide-react";
import { SEOEntry, SEOStatus, SITE_ORIGIN } from "@/types/seo";
import {
  seoService,
  validateSEOEntry,
  normalizeRoute,
} from "@/services/SEOService";
import { cn } from "@/lib/utils";

const EMPTY_FORM: Omit<SEOEntry, "id" | "updatedAt"> = {
  pageName: "",
  url: "/",
  metaTitle: "",
  metaDescription: "",
  canonicalUrl: `${SITE_ORIGIN}/`,
  socialImage: `${SITE_ORIGIN}/images/projects/ChatGPT%20Image%20Sep%2028,%202026,%2003_14_07%20PM.png`,
  keywords: [],
  robotsIndex: true,
  status: "active",
};

export default function SeoManager() {
  const [entries, setEntries] = useState<SEOEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<SEOEntry, "id" | "updatedAt">>(EMPTY_FORM);
  const [keywordInput, setKeywordInput] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formWarnings, setFormWarnings] = useState<Record<string, string>>({});
  const [deleteCandidate, setDeleteCandidate] = useState<SEOEntry | null>(null);
  const [toastMessage, setToastMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  // Load entries and subscribe to sync
  useEffect(() => {
    setEntries(seoService.getEntries());

    const unsubscribe = seoService.subscribe((updated) => {
      setEntries(updated);
    });

    return () => unsubscribe();
  }, []);

  function showToast(text: string, type: "success" | "error" = "success") {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage((prev) => (prev?.text === text ? null : prev));
    }, 4000);
  }

  // Filtered & searched entries
  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      const matchesSearch =
        entry.pageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.metaTitle.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || entry.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [entries, searchQuery, statusFilter]);

  // Open Add modal
  function handleOpenAdd() {
    setEditingId(null);
    setFormData({
      ...EMPTY_FORM,
      canonicalUrl: `${SITE_ORIGIN}/`,
    });
    setKeywordInput("");
    setFormErrors({});
    setFormWarnings({});
    setIsModalOpen(true);
  }

  // Open Edit modal
  function handleOpenEdit(entry: SEOEntry) {
    setEditingId(entry.id);
    setFormData({
      pageName: entry.pageName,
      url: entry.url,
      metaTitle: entry.metaTitle,
      metaDescription: entry.metaDescription,
      canonicalUrl: entry.canonicalUrl,
      socialImage: entry.socialImage,
      keywords: [...entry.keywords],
      robotsIndex: entry.robotsIndex,
      status: entry.status,
    });
    setKeywordInput("");
    setFormErrors({});
    setFormWarnings({});
    setIsModalOpen(true);
  }

  // Form field change with live validation
  function handleFieldChange<K extends keyof typeof formData>(
    field: K,
    value: (typeof formData)[K]
  ) {
    const nextData = { ...formData, [field]: value };
    setFormData(nextData);

    // Live validation
    const validation = validateSEOEntry(
      { ...nextData, id: editingId || undefined },
      entries
    );
    setFormErrors(validation.errors);
    setFormWarnings(validation.warnings);
  }

  // Add keyword
  function handleAddKeyword() {
    const trimmed = keywordInput.trim();
    if (!trimmed) return;
    if (formData.keywords.includes(trimmed)) {
      setKeywordInput("");
      return;
    }
    const updated = [...formData.keywords, trimmed];
    handleFieldChange("keywords", updated);
    setKeywordInput("");
  }

  // Remove keyword
  function handleRemoveKeyword(tag: string) {
    const updated = formData.keywords.filter((k) => k !== tag);
    handleFieldChange("keywords", updated);
  }

  // Handle Save
  async function handleSave() {
    const validation = validateSEOEntry(
      { ...formData, id: editingId || undefined },
      entries
    );

    if (!validation.isValid) {
      setFormErrors(validation.errors);
      setFormWarnings(validation.warnings);
      showToast("Please correct the errors in the form before saving.", "error");
      return;
    }

    const entryToSave: SEOEntry = {
      id: editingId || `seo-${Date.now()}`,
      pageName: formData.pageName.trim(),
      url: normalizeRoute(formData.url),
      metaTitle: formData.metaTitle.trim(),
      metaDescription: formData.metaDescription.trim(),
      canonicalUrl: formData.canonicalUrl.trim() || `${SITE_ORIGIN}${normalizeRoute(formData.url)}`,
      socialImage: formData.socialImage.trim(),
      keywords: formData.keywords,
      robotsIndex: formData.robotsIndex,
      status: formData.status,
      updatedAt: new Date().toISOString(),
    };

    const ok = await seoService.saveEntry(entryToSave);
    if (ok) {
      setIsModalOpen(false);
      showToast(
        editingId
          ? `Saved SEO settings for "${entryToSave.pageName}"`
          : `Created new SEO entry for "${entryToSave.pageName}"`
      );
    } else {
      showToast("Failed to save SEO entry.", "error");
    }
  }

  // Handle Quick Toggle Status
  async function handleToggleStatus(id: string) {
    const ok = await seoService.toggleStatus(id);
    if (ok) {
      const updated = seoService.getEntries().find((e) => e.id === id);
      showToast(
        `Entry "${updated?.pageName}" is now ${updated?.status === "active" ? "Active" : "Inactive"}.`
      );
    }
  }

  // Handle Delete Confirmation
  async function handleConfirmDelete() {
    if (!deleteCandidate) return;
    const ok = await seoService.deleteEntry(deleteCandidate.id);
    if (ok) {
      showToast(`Deleted SEO entry for "${deleteCandidate.pageName}".`);
      setDeleteCandidate(null);
    } else {
      showToast("Failed to delete entry.", "error");
    }
  }

  return (
    <div className="space-y-6">
      {/* ── Toast Notification ── */}
      {toastMessage && (
        <div
          className={cn(
            "fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl shadow-lg border text-sm font-semibold flex items-center gap-2.5 transition-all animate-in fade-in slide-in-from-bottom-2",
            toastMessage.type === "success"
              ? "bg-[#111] text-[#D9F99D] border-neutral-800"
              : "bg-red-900 text-white border-red-800"
          )}
        >
          {toastMessage.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-[#84CC16]" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* ── Header ── */}
      <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 sm:p-7 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#84CC16]/15 text-[#365314] text-xs font-bold uppercase tracking-wider mb-2">
            <Globe className="w-3.5 h-3.5 text-[#65a30d]" />
            Clean Page-by-Page SEO Engine
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
            SEO Settings
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Manage meta tags, canonical URLs, social share cards, and indexing directives applied to the public website.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#84CC16] hover:bg-[#72b312] text-[#111] text-xs sm:text-sm font-bold transition-all shadow-xs shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          Add SEO Entry
        </button>
      </div>

      {/* ── Search & Filter Controls ── */}
      <div className="bg-white border border-neutral-200/80 rounded-2xl p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by page name, route, or meta title..."
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-neutral-200 rounded-xl bg-neutral-50/50 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#84CC16]/40 focus:border-[#84CC16] transition-all"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 shrink-0">
          {(["all", "active", "inactive"] as const).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all",
                statusFilter === status
                  ? "bg-[#111] text-white shadow-xs"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200/70"
              )}
            >
              {status}
              <span className="ml-1.5 opacity-70 text-[10px]">
                {status === "all"
                  ? entries.length
                  : entries.filter((e) => e.status === status).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Table / List of SEO Entries ── */}
      <div className="bg-white border border-neutral-200/80 rounded-2xl shadow-2xs overflow-hidden">
        {filteredEntries.length === 0 ? (
          <div className="p-12 text-center">
            <Globe className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-neutral-800">
              No SEO entries found
            </h3>
            <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
              {searchQuery || statusFilter !== "all"
                ? "No page entries match your current search and filter criteria."
                : "Get started by adding your first page SEO configuration."}
            </p>
            {!searchQuery && statusFilter === "all" && (
              <button
                type="button"
                onClick={handleOpenAdd}
                className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#84CC16] hover:bg-[#72b312] text-[#111] text-xs font-bold transition-all shadow-xs"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                Add SEO Entry
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50/75 text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                  <th className="py-3 px-4 sm:px-6">Page &amp; Route</th>
                  <th className="py-3 px-4">Meta Title</th>
                  <th className="py-3 px-4 hidden lg:table-cell">Meta Description</th>
                  <th className="py-3 px-4">Indexing</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-xs sm:text-sm">
                {filteredEntries.map((entry) => {
                  const titleLen = entry.metaTitle.length;
                  const descLen = entry.metaDescription.length;

                  return (
                    <tr
                      key={entry.id}
                      className="hover:bg-neutral-50/60 transition-colors group"
                    >
                      {/* Page & URL */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="font-bold text-neutral-900 flex items-center gap-2">
                          <span>{entry.pageName}</span>
                          {entry.url === "/" && (
                            <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#84CC16]/20 text-[#365314]">
                              Root
                            </span>
                          )}
                        </div>
                        <div className="text-neutral-400 font-mono text-[11px] flex items-center gap-1 mt-0.5">
                          <span>{entry.url}</span>
                          <a
                            href={entry.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-400 hover:text-[#65a30d] transition-colors"
                            title="Open route in new tab"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </td>

                      {/* Meta Title */}
                      <td className="py-4 px-4 max-w-[240px]">
                        <p className="text-neutral-800 font-medium truncate" title={entry.metaTitle}>
                          {entry.metaTitle || <span className="text-neutral-300 italic">No title</span>}
                        </p>
                        <span
                          className={cn(
                            "inline-block mt-1 text-[10px] font-semibold px-1.5 py-0.2 rounded",
                            titleLen >= 50 && titleLen <= 60
                              ? "bg-emerald-100 text-emerald-800"
                              : titleLen > 60
                              ? "bg-amber-100 text-amber-800"
                              : "bg-neutral-100 text-neutral-600"
                          )}
                        >
                          {titleLen} chars
                        </span>
                      </td>

                      {/* Meta Description */}
                      <td className="py-4 px-4 max-w-[300px] hidden lg:table-cell">
                        <p className="text-neutral-600 text-xs line-clamp-2 leading-relaxed" title={entry.metaDescription}>
                          {entry.metaDescription || (
                            <span className="text-neutral-300 italic">No description</span>
                          )}
                        </p>
                        <span
                          className={cn(
                            "inline-block mt-1 text-[10px] font-semibold px-1.5 py-0.2 rounded",
                            descLen >= 150 && descLen <= 160
                              ? "bg-emerald-100 text-emerald-800"
                              : descLen > 160
                              ? "bg-amber-100 text-amber-800"
                              : "bg-neutral-100 text-neutral-600"
                          )}
                        >
                          {descLen} chars
                        </span>
                      </td>

                      {/* Robots Indexing */}
                      <td className="py-4 px-4">
                        {entry.robotsIndex ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200/60">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" />
                            Index
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-200/60">
                            <ShieldAlert className="w-3 h-3 text-rose-600" />
                            No Index
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(entry.id)}
                          className={cn(
                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer",
                            entry.status === "active"
                              ? "bg-[#84CC16]/20 text-[#365314] hover:bg-[#84CC16]/30"
                              : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                          )}
                          title="Click to toggle status"
                        >
                          <span
                            className={cn(
                              "w-1.5 h-1.5 rounded-full",
                              entry.status === "active" ? "bg-[#65a30d] animate-pulse" : "bg-neutral-400"
                            )}
                          />
                          <span className="capitalize">{entry.status}</span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 sm:px-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(entry)}
                            className="p-1.5 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                            title="Edit SEO Entry"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteCandidate(entry)}
                            className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete SEO Entry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Modal: Add / Edit SEO Entry ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-neutral-100 flex items-center justify-between shrink-0 bg-neutral-50/50">
              <div>
                <h3 className="text-lg font-bold text-neutral-900">
                  {editingId ? "Edit SEO Entry" : "Add SEO Entry"}
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Configure search engine metadata, Open Graph cards, and indexing directives.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Scroll Area */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
              {/* Validation Alert Banner */}
              {Object.keys(formErrors).length > 0 && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Please resolve the following before saving:</p>
                    <ul className="list-disc list-inside mt-1 space-y-0.5 text-red-700">
                      {Object.values(formErrors).map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Row 1: Page Name & URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Page Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.pageName}
                    onChange={(e) => handleFieldChange("pageName", e.target.value)}
                    placeholder="e.g. Home, Insights, Case Study"
                    className={cn(
                      "w-full px-3 py-2 text-sm border rounded-xl bg-white text-neutral-900 focus:outline-none focus:ring-2 transition-all",
                      formErrors.pageName
                        ? "border-red-400 focus:ring-red-200"
                        : "border-neutral-200 focus:ring-[#84CC16]/40 focus:border-[#84CC16]"
                    )}
                  />
                  {formErrors.pageName && (
                    <p className="text-[11px] text-red-600 mt-1">{formErrors.pageName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Route URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.url}
                    onChange={(e) => handleFieldChange("url", e.target.value)}
                    placeholder="e.g. / or /insights"
                    className={cn(
                      "w-full px-3 py-2 text-sm font-mono border rounded-xl bg-white text-neutral-900 focus:outline-none focus:ring-2 transition-all",
                      formErrors.url
                        ? "border-red-400 focus:ring-red-200"
                        : "border-neutral-200 focus:ring-[#84CC16]/40 focus:border-[#84CC16]"
                    )}
                  />
                  <p className="text-[11px] text-neutral-400 mt-1">
                    Normalized route belonging to this website.
                  </p>
                  {formErrors.url && (
                    <p className="text-[11px] text-red-600 mt-1">{formErrors.url}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Meta Title */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                    Meta Title {formData.status === "active" && <span className="text-red-500">*</span>}
                  </label>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={cn(
                        "text-[11px] font-bold px-1.5 py-0.5 rounded",
                        formData.metaTitle.length >= 50 && formData.metaTitle.length <= 60
                          ? "bg-emerald-100 text-emerald-800"
                          : formData.metaTitle.length > 60
                          ? "bg-amber-100 text-amber-800"
                          : "bg-neutral-100 text-neutral-600"
                      )}
                    >
                      {formData.metaTitle.length}/60 chars
                    </span>
                    <span className="text-[11px] text-neutral-400 hidden sm:inline">
                      (recommended: 50–60)
                    </span>
                  </div>
                </div>
                <input
                  type="text"
                  value={formData.metaTitle}
                  onChange={(e) => handleFieldChange("metaTitle", e.target.value)}
                  placeholder="e.g. Nashim Nazar — Best UI UX Designer in Kottayam, Kerala"
                  className={cn(
                    "w-full px-3 py-2 text-sm border rounded-xl bg-white text-neutral-900 focus:outline-none focus:ring-2 transition-all",
                    formErrors.metaTitle
                      ? "border-red-400 focus:ring-red-200"
                      : "border-neutral-200 focus:ring-[#84CC16]/40 focus:border-[#84CC16]"
                  )}
                />
                {formErrors.metaTitle && (
                  <p className="text-[11px] text-red-600 mt-1">{formErrors.metaTitle}</p>
                )}
                {formWarnings.metaTitle && !formErrors.metaTitle && (
                  <p className="text-[11px] text-amber-600 mt-1 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    {formWarnings.metaTitle}
                  </p>
                )}
              </div>

              {/* Row 3: Meta Description */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                    Meta Description {formData.status === "active" && <span className="text-red-500">*</span>}
                  </label>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={cn(
                        "text-[11px] font-bold px-1.5 py-0.5 rounded",
                        formData.metaDescription.length >= 150 && formData.metaDescription.length <= 160
                          ? "bg-emerald-100 text-emerald-800"
                          : formData.metaDescription.length > 160
                          ? "bg-amber-100 text-amber-800"
                          : "bg-neutral-100 text-neutral-600"
                      )}
                    >
                      {formData.metaDescription.length}/160 chars
                    </span>
                    <span className="text-[11px] text-neutral-400 hidden sm:inline">
                      (recommended: 150–160)
                    </span>
                  </div>
                </div>
                <textarea
                  rows={3}
                  value={formData.metaDescription}
                  onChange={(e) => handleFieldChange("metaDescription", e.target.value)}
                  placeholder="Write a concise, compelling summary for search result snippets..."
                  className={cn(
                    "w-full px-3 py-2 text-sm border rounded-xl bg-white text-neutral-900 focus:outline-none focus:ring-2 transition-all leading-relaxed resize-none",
                    formErrors.metaDescription
                      ? "border-red-400 focus:ring-red-200"
                      : "border-neutral-200 focus:ring-[#84CC16]/40 focus:border-[#84CC16]"
                  )}
                />
                {formErrors.metaDescription && (
                  <p className="text-[11px] text-red-600 mt-1">{formErrors.metaDescription}</p>
                )}
                {formWarnings.metaDescription && !formErrors.metaDescription && (
                  <p className="text-[11px] text-amber-600 mt-1 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    {formWarnings.metaDescription}
                  </p>
                )}
              </div>

              {/* Row 4: Canonical URL */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                    Canonical URL
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const norm = normalizeRoute(formData.url);
                      const target = norm === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${norm}`;
                      handleFieldChange("canonicalUrl", target);
                    }}
                    className="text-[11px] text-[#65a30d] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <LinkIcon className="w-3 h-3" />
                    Use Current Page URL
                  </button>
                </div>
                <input
                  type="text"
                  value={formData.canonicalUrl}
                  onChange={(e) => handleFieldChange("canonicalUrl", e.target.value)}
                  placeholder="https://nashimnazar.in/"
                  className={cn(
                    "w-full px-3 py-2 text-sm font-mono border rounded-xl bg-white text-neutral-900 focus:outline-none focus:ring-2 transition-all",
                    formErrors.canonicalUrl
                      ? "border-red-400 focus:ring-red-200"
                      : "border-neutral-200 focus:ring-[#84CC16]/40 focus:border-[#84CC16]"
                  )}
                />
                <p className="text-[11px] text-neutral-400 mt-1">
                  Must be an absolute HTTP/HTTPS URL representing the master version of this page.
                </p>
                {formErrors.canonicalUrl && (
                  <p className="text-[11px] text-red-600 mt-1">{formErrors.canonicalUrl}</p>
                )}
              </div>

              {/* Row 5: Social Image (Open Graph) */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                  Social Image (Open Graph &amp; Twitter Card)
                </label>
                <div className="flex gap-3 items-start">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={formData.socialImage}
                      onChange={(e) => handleFieldChange("socialImage", e.target.value)}
                      placeholder="https://nashimnazar.in/image.png"
                      className="w-full px-3 py-2 text-sm font-mono border border-neutral-200 rounded-xl bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#84CC16]/40 focus:border-[#84CC16] transition-all"
                    />
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[11px] text-neutral-400">Quick defaults:</span>
                      <button
                        type="button"
                        onClick={() =>
                          handleFieldChange(
                            "socialImage",
                            `${SITE_ORIGIN}/images/projects/ChatGPT%20Image%20Sep%2028,%202026,%2003_14_07%20PM.png`
                          )
                        }
                        className="text-[10px] font-semibold text-neutral-600 hover:text-neutral-900 px-2 py-0.5 bg-neutral-100 rounded hover:bg-neutral-200"
                      >
                        Founder Portrait
                      </button>
                      <button
                        type="button"
                        onClick={() => handleFieldChange("socialImage", `${SITE_ORIGIN}/image.png`)}
                        className="text-[10px] font-semibold text-neutral-600 hover:text-neutral-900 px-2 py-0.5 bg-neutral-100 rounded hover:bg-neutral-200"
                      >
                        Site Cover
                      </button>
                    </div>
                  </div>

                  {/* Image Preview Box */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl border border-neutral-200 bg-neutral-100 overflow-hidden shrink-0 flex items-center justify-center relative">
                    {formData.socialImage ? (
                      <img
                        src={formData.socialImage}
                        alt="Social preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-neutral-300" />
                    )}
                  </div>
                </div>
                {formErrors.socialImage && (
                  <p className="text-[11px] text-red-600 mt-1">{formErrors.socialImage}</p>
                )}
              </div>

              {/* Row 6: Keywords */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                  Keywords (Internal Editorial Metadata)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddKeyword();
                      }
                    }}
                    placeholder="Type a keyword and press Enter..."
                    className="flex-1 px-3 py-2 text-sm border border-neutral-200 rounded-xl bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#84CC16]/40 focus:border-[#84CC16] transition-all"
                  />
                  <button
                    type="button"
                    onClick={handleAddKeyword}
                    className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-all"
                  >
                    Add
                  </button>
                </div>

                {/* Keyword Pills */}
                {formData.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {formData.keywords.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#84CC16]/15 text-[#365314] border border-[#84CC16]/30"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveKeyword(tag)}
                          className="hover:text-red-700"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Row 7: Robots Indexing & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-neutral-100">
                {/* Robots Indexing */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Search Engine Indexing
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleFieldChange("robotsIndex", true)}
                      className={cn(
                        "flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer",
                        formData.robotsIndex
                          ? "bg-emerald-50 border-emerald-300 text-emerald-800 shadow-2xs"
                          : "bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                      )}
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      Index
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFieldChange("robotsIndex", false)}
                      className={cn(
                        "flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer",
                        !formData.robotsIndex
                          ? "bg-rose-50 border-rose-300 text-rose-800 shadow-2xs"
                          : "bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                      )}
                    >
                      <ShieldAlert className="w-4 h-4 text-rose-600" />
                      No Index
                    </button>
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-1">
                    Outputs standard `robots` meta tag (index vs noindex).
                  </p>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Module Status
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleFieldChange("status", "active")}
                      className={cn(
                        "flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer",
                        formData.status === "active"
                          ? "bg-[#84CC16]/20 border-[#84CC16] text-[#365314] shadow-2xs"
                          : "bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                      )}
                    >
                      <Check className="w-4 h-4 text-[#65a30d]" />
                      Active
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFieldChange("status", "inactive")}
                      className={cn(
                        "flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer",
                        formData.status === "inactive"
                          ? "bg-neutral-200 border-neutral-400 text-neutral-800 shadow-2xs"
                          : "bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                      )}
                    >
                      Inactive
                    </button>
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-1">
                    When inactive, the page uses default site metadata.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-neutral-100 flex items-center justify-end gap-3 bg-neutral-50/50 shrink-0">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl text-neutral-600 hover:bg-neutral-200/60 text-xs sm:text-sm font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2 rounded-xl bg-[#84CC16] hover:bg-[#72b312] text-[#111] text-xs sm:text-sm font-bold transition-all shadow-xs"
              >
                {editingId ? "Save Changes" : "Create Entry"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Delete Confirmation ── */}
      {deleteCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200 w-full max-w-md p-6 space-y-4">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900">
                Delete SEO Entry?
              </h3>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                Are you sure you want to permanently delete the SEO configuration for{" "}
                <span className="font-bold text-neutral-800">
                  {deleteCandidate.pageName}
                </span>{" "}
                (<code className="font-mono text-neutral-700">{deleteCandidate.url}</code>)?
                This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setDeleteCandidate(null)}
                className="px-4 py-2 rounded-xl text-neutral-600 hover:bg-neutral-100 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-xs"
              >
                Delete Entry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
