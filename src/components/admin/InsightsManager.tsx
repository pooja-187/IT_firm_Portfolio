"use client";

import React, { useState, useEffect } from "react";
import { ArticleItemData } from "@/types/portfolio";
import { ImagePickerInput } from "./ImagePickerInput";
import {
  BookOpenText,
  Plus,
  Edit2,
  Trash2,
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  X,
  Save,
  Sparkles,
} from "lucide-react";

interface InsightsManagerProps {
  insights: ArticleItemData[];
  onSaveInsight: (item: ArticleItemData) => boolean;
  onDeleteInsight: (id: string) => boolean;
  onReorderInsights: (orderedIds: string[]) => boolean;
}

export default function InsightsManager({
  insights: initialInsights,
  onSaveInsight,
  onDeleteInsight,
  onReorderInsights,
}: InsightsManagerProps) {
  // Own local list — always stays up to date independently of parent re-renders
  const [list, setList] = useState<ArticleItemData[]>(initialInsights || []);
  const [editingItem, setEditingItem] = useState<ArticleItemData | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [toastMsg, setToastMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    setList(initialInsights || []);
  }, [initialInsights]);

  const showToast = (type: "success" | "error", text: string) => {
    setToastMsg({ type, text });
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleOpenAdd = () => {
    setIsNew(true);
    setEditingItem({
      id: "art-" + Date.now(),
      number: String(list.length + 1).padStart(2, "0"),
      title: "",
      slug: "insight-" + Date.now(),
      category: "DESIGN SYSTEMS",
      description: "",
      excerpt: "",
      body: "",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
      coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
      status: "PLANNED",
      publishedDate: "2026-10-15",
      readTime: "5 min read",
      displayOrder: list.length + 1,
    });
  };

  const handleOpenEdit = (item: ArticleItemData) => {
    setIsNew(false);
    setEditingItem({
      ...item,
      excerpt: item.excerpt || item.description,
      coverImage: item.coverImage || item.image,
    });
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (!editingItem.title.trim()) {
      showToast("error", "Article title is required.");
      return;
    }
    if (!editingItem.slug.trim()) {
      showToast("error", "Slug is required.");
      return;
    }

    const toSave: ArticleItemData = {
      ...editingItem,
      title: editingItem.title.trim(),
      slug: editingItem.slug.trim(),
      description: editingItem.excerpt || editingItem.description || "",
      excerpt: editingItem.excerpt || editingItem.description || "",
      image: editingItem.coverImage || editingItem.image || "",
      coverImage: editingItem.coverImage || editingItem.image || "",
    };

    const ok = onSaveInsight(toSave);
    if (ok) {
      // Update local state immediately
      setList((prev) => {
        const idx = prev.findIndex((i) => i.id === toSave.id);
        if (idx >= 0) {
          const updated = [...prev];
          updated[idx] = toSave;
          return updated;
        }
        return [...prev, toSave];
      });
      showToast("success", `Article "${toSave.title}" saved.`);
      setEditingItem(null);
    } else {
      showToast("error", "Failed to save insight.");
    }
  };

  const handleDelete = (id: string) => {
    const ok = onDeleteInsight(id);
    if (ok) {
      setList((prev) => prev.filter((i) => i.id !== id));
      showToast("success", "Article deleted.");
      setDeleteConfirmId(null);
    } else {
      showToast("error", "Failed to delete article.");
    }
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;

    const newOrder = [...list];
    const [moved] = newOrder.splice(index, 1);
    newOrder.splice(targetIdx, 0, moved);

    // Update local immediately
    setList(newOrder);

    const ok = onReorderInsights(newOrder.map((i) => i.id));
    if (ok) {
      showToast("success", "Insights order updated.");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <BookOpenText className="w-5 h-5 text-neutral-800" />
            <h1 className="text-xl font-bold text-neutral-900 tracking-tight">Insights & Thought Leadership</h1>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Manage editorial articles, essays, and upcoming publications with planned/draft/published workflows.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#D9F99D]" />
          <span>Add Insight</span>
        </button>
      </div>

      {toastMsg && (
        <div
          className={`p-3.5 rounded-xl border flex items-center gap-2.5 text-xs font-medium animate-in fade-in ${
            toastMsg.type === "success"
              ? "bg-[#84CC16]/15 border-[#84CC16]/30 text-[#365314]"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          {toastMsg.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-[#65a30d] shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          )}
          <span>{toastMsg.text}</span>
        </div>
      )}

      {/* Articles Table */}
      <div className="bg-white border border-neutral-200/80 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/75 text-neutral-500 uppercase font-semibold text-[10px] tracking-wider">
                <th className="py-3 px-4 w-12 text-center">Order</th>
                <th className="py-3 px-4">Title & Excerpt</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Release / Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {list.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-neutral-400">
                    No articles found.
                  </td>
                </tr>
              ) : (
                list.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-neutral-50/60 transition-colors">
                    {/* Reorder Buttons */}
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          disabled={idx === 0}
                          onClick={() => handleMove(idx, "up")}
                          className="p-1 text-neutral-400 hover:text-neutral-900 disabled:opacity-20 cursor-pointer"
                          title="Move up"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          disabled={idx === list.length - 1}
                          onClick={() => handleMove(idx, "down")}
                          className="p-1 text-neutral-400 hover:text-neutral-900 disabled:opacity-20 cursor-pointer"
                          title="Move down"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                    {/* Title */}
                    <td className="py-3 px-4 max-w-md">
                      <div className="font-semibold text-neutral-900 text-sm">{item.title}</div>
                      <p className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">{item.excerpt}</p>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4 text-neutral-500 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 font-mono text-[10px]">
                        {item.category}
                      </span>
                    </td>

                    {/* Status Pill */}
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider ${
                          item.status === "PUBLISHED"
                            ? "bg-[#84CC16]/20 text-[#365314]"
                            : item.status === "PLANNED"
                            ? "bg-[#D9F99D]/60 text-neutral-900"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-3 px-4 text-center font-mono text-[11px] text-neutral-600 whitespace-nowrap">
                      {item.publishedDate || "—"}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
                          title="Edit Insight"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(item.id)}
                          className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Insight"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-xl border border-neutral-200 animate-in zoom-in-95">
            <h3 className="text-base font-bold text-neutral-900">Delete Insight</h3>
            <p className="text-xs text-neutral-500">
              Are you sure you want to remove this publication?
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-3.5 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-3.5 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-xs cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-neutral-950/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl border border-neutral-200 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="text-base font-bold text-neutral-900">
                {isNew ? "Add New Publication" : `Edit Publication: ${editingItem.title}`}
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="text-neutral-400 hover:text-neutral-700 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={editingItem.title}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, title: e.target.value })
                    }
                    placeholder="e.g. Design Systems for Multi-Platform Scale"
                    required
                    className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Slug *
                  </label>
                  <input
                    type="text"
                    value={editingItem.slug}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, slug: e.target.value })
                    }
                    placeholder="design-systems-scale"
                    required
                    className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={editingItem.category}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, category: e.target.value })
                    }
                    placeholder="DESIGN SYSTEMS"
                    className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Status
                  </label>
                  <select
                    value={editingItem.status}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        status: e.target.value as "PLANNED" | "DRAFT" | "PUBLISHED",
                      })
                    }
                    className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 font-semibold"
                  >
                    <option value="PLANNED">PLANNED (Upcoming)</option>
                    <option value="DRAFT">DRAFT</option>
                    <option value="PUBLISHED">PUBLISHED</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Date / Release Milestone
                  </label>
                  <input
                    type="text"
                    value={editingItem.publishedDate || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, publishedDate: e.target.value })
                    }
                    placeholder="Q1 2025"
                    className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Estimated Read Time
                  </label>
                  <input
                    type="text"
                    value={editingItem.readTime || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, readTime: e.target.value })
                    }
                    placeholder="6 min read"
                    className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Excerpt / Teaser
                </label>
                <textarea
                  rows={2}
                  value={editingItem.excerpt}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, excerpt: e.target.value })
                  }
                  placeholder="Key thesis of the article..."
                  className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Full Content / Body Draft
                </label>
                <textarea
                  rows={5}
                  value={editingItem.body || ""}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, body: e.target.value })
                  }
                  placeholder="Article markdown or body content..."
                  className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 leading-relaxed font-mono text-xs"
                />
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80">
                <ImagePickerInput
                  label="Cover Image"
                  value={editingItem.coverImage || ""}
                  onChange={(val) =>
                    setEditingItem({ ...editingItem, coverImage: val })
                  }
                />
              </div>

              {/* SEO Roadmap Note as requested in section 19 & 37 */}
              <div className="p-3 rounded-lg bg-neutral-100 border border-neutral-200 text-xs text-neutral-600 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-neutral-500 shrink-0" />
                <span>SEO meta tags and canonical URLs for this insight will activate in Phase 2.</span>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold transition-all shadow-xs cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5 text-[#D9F99D]" />
                  <span>Save Publication</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
