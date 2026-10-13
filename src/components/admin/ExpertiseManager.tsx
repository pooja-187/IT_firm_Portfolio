"use client";

import React, { useState } from "react";
import { ExpertiseSectionData, ExpertiseItem } from "@/types/portfolio";
import {
  Zap,
  Plus,
  Edit2,
  Trash2,
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Save,
  X,
  Check,
} from "lucide-react";

interface ExpertiseManagerProps {
  initialData: ExpertiseSectionData;
  onSave: (data: ExpertiseSectionData) => boolean;
}

export default function ExpertiseManager({
  initialData,
  onSave,
}: ExpertiseManagerProps) {
  const pillList = initialData.items || initialData.pills || [];
  const [data, setData] = useState<ExpertiseSectionData>({
    statementLine1: initialData.statementLine1 || "Design expertise.",
    statementLine2: initialData.statementLine2 || "Marketing perspective.",
    statementLine3: initialData.statementLine3 || "Founder-led execution.",
    badge: initialData.badge || "02 — EXPERTISE",
    heading: initialData.heading || "Design expertise. Marketing perspective. Founder-led execution.",
    statement: initialData.statement || "Turning vision into reality through design, engineering & marketing.",
    pills: [...pillList],
    items: [...pillList],
  });

  const [editingItem, setEditingItem] = useState<ExpertiseItem | null>(null);
  const [isNewItem, setIsNewItem] = useState(false);
  const [toastMsg, setToastMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const showToast = (type: "success" | "error", text: string) => {
    setToastMsg({ type, text });
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleSaveAll = (updatedData?: ExpertiseSectionData) => {
    const toSave = updatedData || data;
    const ok = onSave(toSave);
    if (ok) {
      showToast("success", "Expertise section saved successfully.");
    } else {
      showToast("error", "Unable to save expertise section.");
    }
  };

  const handleOpenAddItem = () => {
    setIsNewItem(true);
    const curItems = data.items || data.pills || [];
    setEditingItem({
      id: "exp-" + Date.now(),
      name: "",
      icon: "zap",
      iconBg: "bg-[#84CC16]",
      rotation: 0,
      side: "left",
      isActive: true,
      displayOrder: curItems.length + 1,
    });
  };

  const handleOpenEditItem = (item: ExpertiseItem) => {
    setIsNewItem(false);
    setEditingItem({ ...item });
  };

  const handleSaveItemModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.name.trim()) return;

    let items = [...(data.items || data.pills || [])];
    if (isNewItem) {
      items.push(editingItem);
    } else {
      items = items.map((it: ExpertiseItem) => (it.id === editingItem.id ? editingItem : it));
    }

    const updated: ExpertiseSectionData = {
      ...data,
      items,
      pills: items,
    };
    setData(updated);
    setEditingItem(null);
    handleSaveAll(updated);
  };

  const handleDeleteItem = (id: string) => {
    const items = (data.items || data.pills || []).filter((it: ExpertiseItem) => it.id !== id);
    const updated: ExpertiseSectionData = {
      ...data,
      items,
      pills: items,
    };
    setData(updated);
    handleSaveAll(updated);
  };

  const handleMoveItem = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    const items = [...(data.items || data.pills || [])];
    if (targetIdx < 0 || targetIdx >= items.length) return;

    const [moved] = items.splice(index, 1);
    items.splice(targetIdx, 0, moved);

    const reordered = items.map((it: ExpertiseItem, idx: number) => ({ ...it, displayOrder: idx + 1 }));
    const updated: ExpertiseSectionData = {
      ...data,
      items: reordered,
      pills: reordered,
    };
    setData(updated);
    handleSaveAll(updated);
  };

  const handleToggleItemActive = (item: ExpertiseItem) => {
    const items = (data.items || data.pills || []).map((it: ExpertiseItem) =>
      it.id === item.id ? { ...it, isActive: it.isActive === false } : it
    );
    const updated: ExpertiseSectionData = {
      ...data,
      items,
      pills: items,
    };
    setData(updated);
    handleSaveAll(updated);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-neutral-800" />
            <h1 className="text-xl font-bold text-neutral-900 tracking-tight">Expertise Section</h1>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Manage your core competencies, technologies, and editorial capability statements.
          </p>
        </div>

        <button
          onClick={() => handleSaveAll()}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold transition-all shadow-xs"
        >
          <Save className="w-4 h-4 text-[#D9F99D]" />
          <span>Save Changes</span>
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

      {/* Copy & Statement Card */}
      <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 space-y-4 shadow-xs">
        <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-800">
          Section Headlines & Statement
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
              Section Badge
            </label>
            <input
              type="text"
              value={data.badge}
              onChange={(e) => setData({ ...data, badge: e.target.value })}
              placeholder="EXPERTISE"
              className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#D9F99D] focus:border-neutral-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
              Main Section Heading
            </label>
            <input
              type="text"
              value={data.heading}
              onChange={(e) => setData({ ...data, heading: e.target.value })}
              placeholder="Core Technical & Design Capabilities"
              className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#D9F99D] focus:border-neutral-900 font-semibold"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
            Editorial Statement / Value Paragraph
          </label>
          <textarea
            rows={3}
            value={data.statement}
            onChange={(e) => setData({ ...data, statement: e.target.value })}
            placeholder="Statement on design methodology..."
            className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#D9F99D] focus:border-neutral-900 leading-relaxed"
          />
        </div>
      </div>

      {/* Capabilities Items List */}
      <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-800">
              Expertise Items ({(data.items || data.pills || []).length})
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Skills, methodologies, and technical competencies highlighted in the section.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenAddItem}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold"
          >
            <Plus className="w-3.5 h-3.5 text-[#D9F99D]" />
            <span>Add Item</span>
          </button>
        </div>

        <div className="border border-neutral-200 rounded-xl overflow-hidden divide-y divide-neutral-100">
          {(data.items || data.pills || []).map((item: ExpertiseItem, idx: number) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3.5 hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <button
                    disabled={idx === 0}
                    onClick={() => handleMoveItem(idx, "up")}
                    className="p-0.5 text-neutral-400 hover:text-neutral-900 disabled:opacity-20"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    disabled={idx === (data.items || data.pills || []).length - 1}
                    onClick={() => handleMoveItem(idx, "down")}
                    className="p-0.5 text-neutral-400 hover:text-neutral-900 disabled:opacity-20"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div>
                  <p className="text-sm font-semibold text-neutral-900">{item.name}</p>
                  <p className="text-[11px] text-neutral-400 font-mono">Icon: {item.icon || "default"}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleItemActive(item)}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                    item.isActive !== false
                      ? "bg-[#84CC16]/20 text-[#365314] font-semibold"
                      : "bg-neutral-100 text-neutral-400"
                  }`}
                >
                  {item.isActive !== false ? "Active" : "Inactive"}
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenEditItem(item)}
                  className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteItem(item.id)}
                  className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit Item Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-neutral-200">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <h3 className="text-sm font-bold text-neutral-900">
                {isNewItem ? "Add Expertise Item" : "Edit Expertise Item"}
              </h3>
              <button onClick={() => setEditingItem(null)} className="text-neutral-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveItemModal} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Capability / Skill Name *
                </label>
                <input
                  type="text"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  placeholder="e.g. Design Systems"
                  required
                  className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#D9F99D] font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Icon Identifier
                </label>
                <input
                  type="text"
                  value={editingItem.icon || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, icon: e.target.value })}
                  placeholder="e.g. zap, layout, layers"
                  className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#D9F99D] font-mono text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-3.5 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
