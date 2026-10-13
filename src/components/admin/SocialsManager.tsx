"use client";

import React, { useState } from "react";
import { SocialLinkItem } from "@/types/portfolio";
import {
  Share2,
  Save,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

interface SocialsManagerProps {
  socials: SocialLinkItem[];
  onSaveSocials: (items: SocialLinkItem[]) => boolean;
}

export default function SocialsManager({ socials, onSaveSocials }: SocialsManagerProps) {
  const [items, setItems] = useState<SocialLinkItem[]>(socials.map((s) => ({ ...s })));
  const [toastMsg, setToastMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const showToast = (type: "success" | "error", text: string) => {
    setToastMsg({ type, text });
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleUrlChange = (id: string, url: string) => {
    setItems((prev) => prev.map((s) => (s.id === id ? { ...s, url } : s)));
  };

  const handleToggleActive = (id: string) => {
    setItems((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= items.length) return;

    const newOrder = [...items];
    const [moved] = newOrder.splice(index, 1);
    newOrder.splice(targetIdx, 0, moved);

    const reordered = newOrder.map((s, idx) => ({ ...s, displayOrder: idx + 1 }));
    setItems(reordered);
  };

  const handleSave = () => {
    const ok = onSaveSocials(items);
    if (ok) {
      showToast("success", "Social media channels updated successfully.");
    } else {
      showToast("error", "Failed to save social links.");
    }
  };

  return (
    <div className="max-w-4xl space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-neutral-800" />
            <h1 className="text-xl font-bold text-neutral-900 tracking-tight">Social Media Channels</h1>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Manage public links and profiles across LinkedIn, Instagram, X, WhatsApp, Behance, GitHub, and Facebook.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold transition-all shadow-xs"
        >
          <Save className="w-4 h-4 text-[#D9F99D]" />
          <span>Save Social Links</span>
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

      {/* Socials List */}
      <div className="bg-white border border-neutral-200/80 rounded-2xl overflow-hidden shadow-xs divide-y divide-neutral-100">
        {items.map((social, idx) => (
          <div
            key={social.id}
            className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-neutral-50/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <button
                  disabled={idx === 0}
                  onClick={() => handleMove(idx, "up")}
                  className="p-0.5 text-neutral-400 hover:text-neutral-900 disabled:opacity-20"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
                <button
                  disabled={idx === items.length - 1}
                  onClick={() => handleMove(idx, "down")}
                  className="p-0.5 text-neutral-400 hover:text-neutral-900 disabled:opacity-20"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="min-w-[120px]">
                <p className="text-sm font-bold text-neutral-900">{social.platform}</p>
                <span
                  className={`inline-block text-[10px] font-semibold uppercase mt-0.5 ${
                    social.isActive ? "text-[#365314] font-semibold" : "text-neutral-400"
                  }`}
                >
                  {social.isActive ? "Active in Footer/Hero" : "Hidden"}
                </span>
              </div>
            </div>

            <div className="flex-1 max-w-xl">
              <input
                type="text"
                value={social.url}
                onChange={(e) => handleUrlChange(social.id, e.target.value)}
                placeholder={`https://${social.platform.toLowerCase()}.com/...`}
                className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-lg bg-white text-neutral-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#D9F99D]"
              />
            </div>

            <div className="flex items-center gap-2 justify-end">
              <button
                type="button"
                onClick={() => handleToggleActive(social.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  social.isActive
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                }`}
              >
                {social.isActive ? "Enabled" : "Disabled"}
              </button>

              {social.url && (
                <a
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-neutral-400 hover:text-neutral-900 rounded-lg"
                  title="Open external profile"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
