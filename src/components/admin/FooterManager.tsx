"use client";

import React, { useState } from "react";
import { SiteSettingsData } from "@/types/portfolio";
import { PanelBottom, Save, CheckCircle2, AlertCircle } from "lucide-react";

interface FooterManagerProps {
  settings: SiteSettingsData;
  onSaveSettings: (data: SiteSettingsData) => boolean;
}

export default function FooterManager({ settings, onSaveSettings }: FooterManagerProps) {
  const [formData, setFormData] = useState<SiteSettingsData>({ ...settings });
  const [toastMsg, setToastMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const showToast = (type: "success" | "error", text: string) => {
    setToastMsg({ type, text });
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = onSaveSettings(formData);
    if (ok) {
      showToast("success", "Footer details updated successfully.");
    } else {
      showToast("error", "Failed to save footer settings.");
    }
  };

  return (
    <div className="max-w-4xl space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <PanelBottom className="w-5 h-5 text-neutral-800" />
            <h1 className="text-xl font-bold text-neutral-900 tracking-tight">Footer Content</h1>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Manage your bottom branding message, contact prompt, and legal credits.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold transition-all shadow-xs"
        >
          <Save className="w-4 h-4 text-[#D9F99D]" />
          <span>Save Footer</span>
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

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 space-y-4 shadow-xs">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-800">
            Footer Bio & Narrative
          </h2>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
              Footer Introduction Paragraph
            </label>
            <textarea
              rows={4}
              value={formData.footerBio}
              onChange={(e) => setFormData({ ...formData, footerBio: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
              Copyright Notice
            </label>
            <input
              type="text"
              value={formData.copyrightText}
              onChange={(e) => setFormData({ ...formData, copyrightText: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 font-mono text-xs"
            />
          </div>

          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-600">
            <strong>Note:</strong> Footer social links are populated from the <em>Social Links</em> manager, and the animated interactive illustrations remain presentation code.
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold transition-all shadow-xs"
          >
            <Save className="w-4 h-4 text-[#D9F99D]" />
            <span>Save Footer</span>
          </button>
        </div>
      </form>
    </div>
  );
}
