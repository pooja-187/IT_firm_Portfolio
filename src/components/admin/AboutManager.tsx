"use client";

import React, { useState } from "react";
import { AboutSectionData, AboutCardItem } from "@/types/portfolio";
import { ImagePickerInput } from "./ImagePickerInput";
import {
  UserCheck,
  Plus,
  Edit2,
  Trash2,
  Save,
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react";

interface AboutManagerProps {
  initialData: AboutSectionData;
  onSave: (data: AboutSectionData) => boolean;
}

export default function AboutManager({ initialData, onSave }: AboutManagerProps) {
  const [data, setData] = useState<AboutSectionData>({
    ...initialData,
    paragraphs: initialData.paragraphs ? [...initialData.paragraphs] : [],
    cards: initialData.cards ? [...initialData.cards] : [],
  });

  const [toastMsg, setToastMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [editingCard, setEditingCard] = useState<AboutCardItem | null>(null);
  const [isNewCard, setIsNewCard] = useState(false);

  const showToast = (type: "success" | "error", text: string) => {
    setToastMsg({ type, text });
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleSaveAll = (updated?: AboutSectionData) => {
    const toSave = updated || data;
    const ok = onSave(toSave);
    if (ok) {
      showToast("success", "About section updated successfully.");
    } else {
      showToast("error", "Unable to save about section.");
    }
  };

  const handleParagraphChange = (index: number, val: string) => {
    const p = [...(data.paragraphs || [])];
    p[index] = val;
    setData({ ...data, paragraphs: p });
  };

  const handleAddParagraph = () => {
    setData({ ...data, paragraphs: [...(data.paragraphs || []), ""] });
  };

  const handleRemoveParagraph = (index: number) => {
    const p = [...(data.paragraphs || [])];
    p.splice(index, 1);
    setData({ ...data, paragraphs: p });
  };

  const handleOpenAddCard = () => {
    setIsNewCard(true);
    setEditingCard({
      id: "card-" + Date.now(),
      title: "",
      subtitle: "",
      role: "",
      description: "",
      tag: "HIGHLIGHT",
      image: "",
      displayOrder: (data.cards?.length || 0) + 1,
    });
  };

  const handleOpenEditCard = (card: AboutCardItem) => {
    setIsNewCard(false);
    setEditingCard({ ...card });
  };

  const handleSaveCardModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCard || !editingCard.title.trim()) return;

    let cards = [...(data.cards || [])];
    if (isNewCard) {
      cards.push(editingCard);
    } else {
      cards = cards.map((c: AboutCardItem) => (c.id === editingCard.id ? editingCard : c));
    }

    const updated = { ...data, cards };
    setData(updated);
    setEditingCard(null);
    handleSaveAll(updated);
  };

  const handleDeleteCard = (id: string) => {
    const cards = (data.cards || []).filter((c: AboutCardItem) => c.id !== id);
    const updated = { ...data, cards };
    setData(updated);
    handleSaveAll(updated);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-neutral-800" />
            <h1 className="text-xl font-bold text-neutral-900 tracking-tight">About Nashim Nazar & Manzio</h1>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Manage your personal narrative, agency background (Manzio), leadership story, and highlight cards.
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

      {/* Narrative Section */}
      <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 space-y-4 shadow-xs">
        <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-800">
          Headlines & Story
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
              className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900"
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
              className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 font-semibold"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
            Subheading / Agency Tagline
          </label>
          <input
            type="text"
            value={data.subheading || ""}
            onChange={(e) => setData({ ...data, subheading: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900"
          />
        </div>

        {/* Paragraphs Editor */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700">
              Narrative Paragraphs
            </label>
            <button
              type="button"
              onClick={handleAddParagraph}
              className="text-xs font-semibold text-neutral-800 hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Paragraph
            </button>
          </div>

          {(data.paragraphs || []).map((p: string, idx: number) => (
            <div key={idx} className="flex gap-2 items-start">
              <textarea
                rows={3}
                value={p}
                onChange={(e) => handleParagraphChange(idx, e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 leading-relaxed"
              />
              <button
                type="button"
                onClick={() => handleRemoveParagraph(idx)}
                className="p-2 text-neutral-400 hover:text-red-600 rounded-lg"
                title="Remove paragraph"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Founder Quote & Image */}
        <div className="pt-2 border-t border-neutral-100 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
              Founder Statement / Quote
            </label>
            <textarea
              rows={3}
              value={data.founderQuote || ""}
              onChange={(e) => setData({ ...data, founderQuote: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
              Founder Role / Credentials
            </label>
            <input
              type="text"
              value={data.founderRole || ""}
              onChange={(e) => setData({ ...data, founderRole: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 mb-3"
            />

            <ImagePickerInput
              label="Feature Image"
              value={data.mainImage || ""}
              onChange={(val) => setData({ ...data, mainImage: val })}
            />
          </div>
        </div>
      </div>

      {/* Highlight Cards */}
      <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-800">
              Highlight Cards & Milestones ({data.cards.length})
            </h2>
            <p className="text-xs text-neutral-500">
              Cards summarizing key achievements, numbers, and agency values.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenAddCard}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold"
          >
            <Plus className="w-3.5 h-3.5 text-[#D9F99D]" />
            <span>Add Card</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(data.cards || []).map((card: AboutCardItem) => (
            <div
              key={card.id}
              className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-neutral-200/80 text-neutral-700">
                    {card.tag || "MILESTONE"}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleOpenEditCard(card)}
                      className="p-1 text-neutral-500 hover:text-neutral-900"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteCard(card.id)}
                      className="p-1 text-neutral-400 hover:text-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <h3 className="text-sm font-bold text-neutral-900 mt-2">{card.title}</h3>
                <p className="text-xs text-neutral-500 mt-1 line-clamp-2">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Card Modal */}
      {editingCard && (
        <div className="fixed inset-0 z-50 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-neutral-200">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <h3 className="text-sm font-bold text-neutral-900">
                {isNewCard ? "Add Highlight Card" : "Edit Highlight Card"}
              </h3>
              <button onClick={() => setEditingCard(null)} className="text-neutral-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCardModal} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Card Title *
                </label>
                <input
                  type="text"
                  value={editingCard.title}
                  onChange={(e) => setEditingCard({ ...editingCard, title: e.target.value })}
                  placeholder="e.g. 5+ Years Experience"
                  required
                  className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Badge / Tag
                </label>
                <input
                  type="text"
                  value={editingCard.tag || ""}
                  onChange={(e) => setEditingCard({ ...editingCard, tag: e.target.value })}
                  placeholder="METRIC"
                  className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={editingCard.description}
                  onChange={(e) => setEditingCard({ ...editingCard, description: e.target.value })}
                  placeholder="Details..."
                  className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingCard(null)}
                  className="px-3.5 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold"
                >
                  Save Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
