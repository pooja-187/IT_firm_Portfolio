"use client";

import React, { useState } from "react";
import { FaqItemData } from "@/types/portfolio";
import {
  HelpCircle,
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
} from "lucide-react";

interface FaqManagerProps {
  faqs: FaqItemData[];
  onSaveFaq: (item: FaqItemData) => boolean;
  onDeleteFaq: (id: string) => boolean;
  onReorderFaqs: (orderedIds: string[]) => boolean;
}

export default function FaqManager({
  faqs,
  onSaveFaq,
  onDeleteFaq,
  onReorderFaqs,
}: FaqManagerProps) {
  const [editingItem, setEditingItem] = useState<FaqItemData | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [toastMsg, setToastMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const showToast = (type: "success" | "error", text: string) => {
    setToastMsg({ type, text });
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleOpenAdd = () => {
    setIsNew(true);
    setEditingItem({
      id: "faq-" + Date.now(),
      question: "",
      answer: "",
      displayOrder: faqs.length + 1,
      isPublished: true,
    });
  };

  const handleOpenEdit = (item: FaqItemData) => {
    setIsNew(false);
    setEditingItem({ ...item });
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (!editingItem.question.trim()) {
      showToast("error", "Question is required.");
      return;
    }
    if (!editingItem.answer.trim()) {
      showToast("error", "Answer is required.");
      return;
    }

    const ok = onSaveFaq(editingItem);
    if (ok) {
      showToast("success", "FAQ entry saved successfully.");
      setEditingItem(null);
    } else {
      showToast("error", "Failed to save FAQ.");
    }
  };

  const handleDelete = (id: string) => {
    const ok = onDeleteFaq(id);
    if (ok) {
      showToast("success", "FAQ removed.");
      setDeleteConfirmId(null);
    } else {
      showToast("error", "Failed to delete FAQ.");
    }
  };

  const handleTogglePublish = (item: FaqItemData) => {
    const updated = { ...item, isPublished: !item.isPublished };
    const ok = onSaveFaq(updated);
    if (ok) {
      showToast("success", `FAQ ${updated.isPublished ? "published" : "hidden"}.`);
    }
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= faqs.length) return;

    const newOrder = [...faqs];
    const [moved] = newOrder.splice(index, 1);
    newOrder.splice(targetIdx, 0, moved);

    const ok = onReorderFaqs(newOrder.map((f) => f.id));
    if (ok) {
      showToast("success", "FAQ order updated.");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-neutral-800" />
            <h1 className="text-xl font-bold text-neutral-900 tracking-tight">Frequently Asked Questions</h1>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Manage accordion FAQs answering client questions about pricing, turnaround, IP ownership, and process.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold transition-all shadow-xs"
        >
          <Plus className="w-4 h-4 text-[#D9F99D]" />
          <span>Add FAQ</span>
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

      {/* FAQs List */}
      <div className="bg-white border border-neutral-200/80 rounded-2xl overflow-hidden shadow-xs divide-y divide-neutral-100">
        {faqs.length === 0 ? (
          <div className="p-8 text-center text-xs text-neutral-400">
            No FAQs recorded yet.
          </div>
        ) : (
          faqs.map((faq, idx) => (
            <div
              key={faq.id}
              className="p-4 hover:bg-neutral-50/70 transition-colors flex items-start justify-between gap-4"
            >
              <div className="flex items-start gap-3 flex-1">
                <div className="flex flex-col items-center pt-0.5">
                  <button
                    disabled={idx === 0}
                    onClick={() => handleMove(idx, "up")}
                    className="p-1 text-neutral-400 hover:text-neutral-900 disabled:opacity-20"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    disabled={idx === faqs.length - 1}
                    onClick={() => handleMove(idx, "down")}
                    className="p-1 text-neutral-400 hover:text-neutral-900 disabled:opacity-20"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-neutral-900">{faq.question}</h3>
                  <p className="text-xs text-neutral-600 leading-relaxed max-w-3xl">
                    {faq.answer}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => handleTogglePublish(faq)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                    faq.isPublished !== false
                      ? "bg-[#84CC16]/20 text-[#365314] hover:bg-[#84CC16]/30 font-semibold"
                      : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                  }`}
                >
                  {faq.isPublished !== false ? (
                    <>
                      <Eye className="w-3 h-3" />
                      <span>Published</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3 h-3" />
                      <span>Draft</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(faq)}
                    className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(faq.id)}
                    className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
            <h3 className="text-base font-bold text-neutral-900">Delete FAQ</h3>
            <p className="text-xs text-neutral-500">
              Are you sure you want to remove this FAQ question?
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
        <div className="fixed inset-0 z-50 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-neutral-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="text-base font-bold text-neutral-900">
                {isNew ? "Add FAQ Entry" : "Edit FAQ Entry"}
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="text-neutral-400 hover:text-neutral-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Question *
                </label>
                <input
                  type="text"
                  value={editingItem.question}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, question: e.target.value })
                  }
                  placeholder="e.g. What is your typical project turnaround?"
                  required
                  className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Answer *
                </label>
                <textarea
                  rows={4}
                  value={editingItem.answer}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, answer: e.target.value })
                  }
                  placeholder="Comprehensive response..."
                  required
                  className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 leading-relaxed"
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
                  <span>Save FAQ</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
