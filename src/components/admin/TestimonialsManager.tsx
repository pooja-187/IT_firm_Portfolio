"use client";

import React, { useState, useEffect } from "react";
import { TestimonialItemData } from "@/types/portfolio";
import { ImagePickerInput } from "./ImagePickerInput";
import {
  MessageSquareQuote,
  Plus,
  Edit2,
  Trash2,
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  X,
  Save,
  Star,
} from "lucide-react";

interface TestimonialsManagerProps {
  testimonials: TestimonialItemData[];
  onSaveTestimonial: (item: TestimonialItemData) => boolean;
  onDeleteTestimonial: (id: string) => boolean;
  onReorderTestimonials: (orderedIds: string[]) => boolean;
}

export default function TestimonialsManager({
  testimonials: initialTestimonials,
  onSaveTestimonial,
  onDeleteTestimonial,
  onReorderTestimonials,
}: TestimonialsManagerProps) {
  // Own local list — always stays up to date independently of parent re-renders
  const [list, setList] = useState<TestimonialItemData[]>(initialTestimonials || []);
  const [editingItem, setEditingItem] = useState<TestimonialItemData | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [toastMsg, setToastMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    setList(initialTestimonials || []);
  }, [initialTestimonials]);

  const showToast = (type: "success" | "error", text: string) => {
    setToastMsg({ type, text });
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleOpenAdd = () => {
    setIsNew(true);
    setEditingItem({
      id: "test-" + Date.now(),
      name: "",
      role: "Founder & CEO",
      company: "",
      text: "",
      quote: "",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      rating: 5,
      displayOrder: list.length + 1,
      isPublished: true,
    });
  };

  const handleOpenEdit = (item: TestimonialItemData) => {
    setIsNew(false);
    setEditingItem({
      ...item,
      quote: item.quote || item.text,
      avatar: item.avatar || item.image,
    });
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (!editingItem.name.trim()) {
      showToast("error", "Client name is required.");
      return;
    }
    const quoteText = (editingItem.quote || editingItem.text || "").trim();
    if (!quoteText) {
      showToast("error", "Testimonial quote is required.");
      return;
    }

    const toSave: TestimonialItemData = {
      ...editingItem,
      name: editingItem.name.trim(),
      text: quoteText,
      quote: quoteText,
      image: editingItem.avatar || editingItem.image || "",
      avatar: editingItem.avatar || editingItem.image || "",
    };

    const ok = onSaveTestimonial(toSave);
    if (ok) {
      // Update local state immediately
      setList((prev) => {
        const idx = prev.findIndex((t) => t.id === toSave.id);
        if (idx >= 0) {
          const updated = [...prev];
          updated[idx] = toSave;
          return updated;
        }
        return [...prev, toSave];
      });
      showToast("success", `Testimonial from "${toSave.name}" saved.`);
      setEditingItem(null);
    } else {
      showToast("error", "Failed to save testimonial.");
    }
  };

  const handleDelete = (id: string) => {
    const ok = onDeleteTestimonial(id);
    if (ok) {
      setList((prev) => prev.filter((t) => t.id !== id));
      showToast("success", "Testimonial removed.");
      setDeleteConfirmId(null);
    } else {
      showToast("error", "Failed to delete testimonial.");
    }
  };

  const handleTogglePublish = (item: TestimonialItemData) => {
    const updated = { ...item, isPublished: !item.isPublished };
    const ok = onSaveTestimonial(updated);
    if (ok) {
      setList((prev) => prev.map((t) => (t.id === item.id ? updated : t)));
      showToast("success", `Testimonial ${updated.isPublished ? "published" : "hidden"}.`);
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

    const ok = onReorderTestimonials(newOrder.map((t) => t.id));
    if (ok) {
      showToast("success", "Testimonials order updated.");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquareQuote className="w-5 h-5 text-neutral-800" />
            <h1 className="text-xl font-bold text-neutral-900 tracking-tight">Client Testimonials</h1>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Manage genuine client reviews and founder endorsements with ratings and avatars.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold transition-all shadow-xs"
        >
          <Plus className="w-4 h-4 text-[#D9F99D]" />
          <span>Add Testimonial</span>
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

      {/* Grid of Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.length === 0 ? (
          <div className="col-span-full bg-white p-8 rounded-2xl border border-neutral-200 text-center text-xs text-neutral-400">
            No testimonials recorded yet.
          </div>
        ) : (
          list.map((item, idx) => (
            <div
              key={item.id}
              className="bg-white border border-neutral-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-neutral-900 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.avatar || item.image}
                        alt=""
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-neutral-900 leading-tight">
                        {item.name}
                      </h3>
                      <p className="text-[11px] text-neutral-500 truncate">
                        {item.role} • {item.company}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
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
                </div>

                <div className="flex items-center gap-1 mb-2 text-amber-500">
                  {Array.from({ length: item.rating || 5 }).map((_, rIdx) => (
                    <Star key={rIdx} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs text-neutral-600 line-clamp-4 leading-relaxed italic">
                  &ldquo;{item.quote || item.text}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-neutral-100">
                <button
                  onClick={() => handleTogglePublish(item)}
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium transition-all ${
                    item.isPublished !== false
                      ? "bg-[#84CC16]/20 text-[#365314] font-semibold"
                      : "bg-neutral-100 text-neutral-500"
                  }`}
                >
                  {item.isPublished !== false ? (
                    <>
                      <Eye className="w-2.5 h-2.5" />
                      <span>Live</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-2.5 h-2.5" />
                      <span>Hidden</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(item.id)}
                    className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-xl border border-neutral-200 animate-in zoom-in-95">
            <h3 className="text-base font-bold text-neutral-900">Delete Testimonial</h3>
            <p className="text-xs text-neutral-500">
              Are you sure you want to remove this client testimonial?
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-3.5 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-3.5 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-xs"
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
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-neutral-200 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="text-base font-bold text-neutral-900">
                {isNew ? "Add Client Testimonial" : `Edit Testimonial: ${editingItem.name}`}
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="text-neutral-400 hover:text-neutral-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    value={editingItem.name}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, name: e.target.value })
                    }
                    placeholder="e.g. Liam Vance"
                    required
                    className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Role / Position
                  </label>
                  <input
                    type="text"
                    value={editingItem.role}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, role: e.target.value })
                    }
                    placeholder="Founder & CEO"
                    className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={editingItem.company}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, company: e.target.value })
                    }
                    placeholder="Apex Group"
                    className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Star Rating (1 - 5)
                  </label>
                  <select
                    value={editingItem.rating || 5}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        rating: parseInt(e.target.value, 10),
                      })
                    }
                    className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900"
                  >
                    <option value={5}>5 Stars ★★★★★</option>
                    <option value={4}>4 Stars ★★★★</option>
                    <option value={3}>3 Stars ★★★</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Client Quote / Review *
                </label>
                <textarea
                  rows={4}
                  value={editingItem.quote || editingItem.text || ""}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, quote: e.target.value, text: e.target.value })
                  }
                  placeholder="Enter endorsement..."
                  required
                  className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 leading-relaxed"
                />
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80">
                <ImagePickerInput
                  label="Client Avatar"
                  value={editingItem.avatar || editingItem.image || ""}
                  onChange={(val) =>
                    setEditingItem({ ...editingItem, avatar: val, image: val })
                  }
                />
              </div>

              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-neutral-700">
                  <input
                    type="checkbox"
                    checked={editingItem.isPublished !== false}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        isPublished: e.target.checked,
                      })
                    }
                    className="rounded text-neutral-900 focus:ring-[#D9F99D] w-4 h-4"
                  />
                  <span>Published on Website</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold transition-all shadow-xs"
                >
                  <Save className="w-3.5 h-3.5 text-[#D9F99D]" />
                  <span>Save Testimonial</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
