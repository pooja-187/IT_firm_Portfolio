"use client";

import React, { useState } from "react";
import { ValuePropositionItem } from "@/types/portfolio";
import {
  HeartHandshake,
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

interface ValuesManagerProps {
  values: ValuePropositionItem[];
  onSaveValue: (val: ValuePropositionItem) => boolean;
  onDeleteValue: (id: string) => boolean;
  onReorderValues: (orderedIds: string[]) => boolean;
}

export default function ValuesManager({
  values,
  onSaveValue,
  onDeleteValue,
  onReorderValues,
}: ValuesManagerProps) {
  const [editingValue, setEditingValue] = useState<ValuePropositionItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [toastMsg, setToastMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const showToast = (type: "success" | "error", text: string) => {
    setToastMsg({ type, text });
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleOpenAdd = () => {
    setIsNew(true);
    const nextNum = (values.length + 1).toString().padStart(2, "0");
    setEditingValue({
      id: "val-" + Date.now(),
      number: nextNum,
      title: "",
      description: "",
      displayOrder: values.length + 1,
      isPublished: true,
    });
  };

  const handleOpenEdit = (val: ValuePropositionItem) => {
    setIsNew(false);
    setEditingValue({ ...val });
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingValue || !editingValue.title.trim()) {
      showToast("error", "Title is required.");
      return;
    }

    const ok = onSaveValue(editingValue);
    if (ok) {
      showToast("success", `Value "${editingValue.title}" saved successfully.`);
      setEditingValue(null);
    } else {
      showToast("error", "Failed to save value proposition.");
    }
  };

  const handleDelete = (id: string) => {
    const ok = onDeleteValue(id);
    if (ok) {
      showToast("success", "Value proposition deleted.");
      setDeleteConfirmId(null);
    } else {
      showToast("error", "Failed to delete value proposition.");
    }
  };

  const handleTogglePublish = (val: ValuePropositionItem) => {
    const updated = { ...val, isPublished: !val.isPublished };
    const ok = onSaveValue(updated);
    if (ok) {
      showToast("success", `Item ${updated.isPublished ? "published" : "hidden"}.`);
    }
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= values.length) return;

    const newOrder = [...values];
    const [moved] = newOrder.splice(index, 1);
    newOrder.splice(targetIdx, 0, moved);

    const ok = onReorderValues(newOrder.map((v) => v.id));
    if (ok) {
      showToast("success", "Order updated.");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-neutral-800" />
            <h1 className="text-xl font-bold text-neutral-900 tracking-tight">Why Work With Me</h1>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Manage your value propositions, key differentiators, and founder guarantees.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold transition-all shadow-xs"
        >
          <Plus className="w-4 h-4 text-[#D9F99D]" />
          <span>Add Value Point</span>
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

      {/* Values List */}
      <div className="bg-white border border-neutral-200/80 rounded-2xl overflow-hidden shadow-xs">
        <div className="divide-y divide-neutral-100">
          {values.length === 0 ? (
            <div className="p-8 text-center text-xs text-neutral-400">
              No value propositions configured.
            </div>
          ) : (
            values.map((val, idx) => (
              <div
                key={val.id}
                className="flex items-center justify-between p-4 hover:bg-neutral-50/70 transition-colors gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center">
                    <button
                      disabled={idx === 0}
                      onClick={() => handleMove(idx, "up")}
                      className="p-1 text-neutral-400 hover:text-neutral-900 disabled:opacity-20"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      disabled={idx === values.length - 1}
                      onClick={() => handleMove(idx, "down")}
                      className="p-1 text-neutral-400 hover:text-neutral-900 disabled:opacity-20"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="w-9 h-9 rounded-xl bg-neutral-900 text-[#D9F99D] flex items-center justify-center font-mono font-bold text-xs shrink-0">
                    {val.number}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-neutral-900">{val.title}</h3>
                    <p className="text-xs text-neutral-500 line-clamp-1 max-w-lg mt-0.5">
                      {val.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => handleTogglePublish(val)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                      val.isPublished !== false
                        ? "bg-[#84CC16]/20 text-[#365314] hover:bg-[#84CC16]/30 font-semibold"
                        : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                    }`}
                  >
                    {val.isPublished !== false ? (
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
                      onClick={() => handleOpenEdit(val)}
                      className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                      title="Edit Item"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(val.id)}
                      className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-xl border border-neutral-200 animate-in zoom-in-95">
            <h3 className="text-base font-bold text-neutral-900">Delete Value Point</h3>
            <p className="text-xs text-neutral-500">
              Are you sure you want to remove this value proposition?
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

      {/* Modal */}
      {editingValue && (
        <div className="fixed inset-0 z-50 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-neutral-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="text-base font-bold text-neutral-900">
                {isNew ? "Add Value Point" : `Edit Point ${editingValue.number}`}
              </h3>
              <button
                onClick={() => setEditingValue(null)}
                className="text-neutral-400 hover:text-neutral-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Point Number (e.g. 01, 02)
                </label>
                <input
                  type="text"
                  value={editingValue.number}
                  onChange={(e) =>
                    setEditingValue({ ...editingValue, number: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Title *
                </label>
                <input
                  type="text"
                  value={editingValue.title}
                  onChange={(e) =>
                    setEditingValue({ ...editingValue, title: e.target.value })
                  }
                  placeholder="e.g. Design + Code Mastery"
                  required
                  className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingValue.description}
                  onChange={(e) =>
                    setEditingValue({ ...editingValue, description: e.target.value })
                  }
                  placeholder="Explanation of the value delivered..."
                  className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 leading-relaxed"
                />
              </div>

              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-neutral-700">
                  <input
                    type="checkbox"
                    checked={editingValue.isPublished !== false}
                    onChange={(e) =>
                      setEditingValue({
                        ...editingValue,
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
                  onClick={() => setEditingValue(null)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold transition-all shadow-xs"
                >
                  <Save className="w-3.5 h-3.5 text-[#D9F99D]" />
                  <span>Save Value Point</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
