"use client";

import React, { useState } from "react";
import { SiteSettingsData } from "@/types/portfolio";
import { Settings, Save, CheckCircle2, AlertCircle } from "lucide-react";

interface SettingsManagerProps {
  initialData: SiteSettingsData;
  onSave: (data: SiteSettingsData) => boolean;
}

export default function SettingsManager({
  initialData,
  onSave,
}: SettingsManagerProps) {
  const [formData, setFormData] = useState<SiteSettingsData>({ ...initialData });
  const [toastMsg, setToastMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const showToast = (type: "success" | "error", text: string) => {
    setToastMsg({ type, text });
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleChange = (field: keyof SiteSettingsData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.brandName.trim()) {
      showToast("error", "Brand name is required.");
      return;
    }
    if (!formData.contactEmail.trim()) {
      showToast("error", "Contact email is required.");
      return;
    }

    const ok = onSave(formData);
    if (ok) {
      showToast("success", "Site settings updated successfully.");
    } else {
      showToast("error", "Failed to save settings.");
    }
  };

  return (
    <div className="max-w-4xl space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-neutral-800" />
            <h1 className="text-xl font-bold text-neutral-900 tracking-tight">Site Settings</h1>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Global business identifiers, direct communication channels, and legal copyright notices.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold transition-all shadow-xs"
        >
          <Save className="w-4 h-4 text-[#D9F99D]" />
          <span>Save Settings</span>
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

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Brand & Direct Contact */}
        <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 space-y-4 shadow-xs">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-800">
            Brand Identity & Direct Contact
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                Brand Name *
              </label>
              <input
                type="text"
                value={formData.brandName}
                onChange={(e) => handleChange("brandName", e.target.value)}
                required
                className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                Primary Contact Email *
              </label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => handleChange("contactEmail", e.target.value)}
                required
                className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                Phone Number
              </label>
              <input
                type="text"
                value={formData.contactPhone || formData.phone || ""}
                onChange={(e) => {
                  handleChange("contactPhone", e.target.value);
                  handleChange("phone", e.target.value);
                }}
                placeholder="+91 98765 43210"
                className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                WhatsApp Direct Link / Number
              </label>
              <input
                type="text"
                value={formData.whatsappNumber || formData.whatsapp || ""}
                onChange={(e) => {
                  handleChange("whatsappNumber", e.target.value);
                  handleChange("whatsapp", e.target.value);
                }}
                placeholder="+91 99999 99999 or https://wa.me/..."
                className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                Office / Regional Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                Availability Status
              </label>
              <input
                type="text"
                value={formData.availability}
                onChange={(e) => handleChange("availability", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900"
              />
            </div>
          </div>
        </div>

        {/* Footer & Legal */}
        <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 space-y-4 shadow-xs">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-800">
            Footer Bio & Legal
          </h2>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
              Footer Mini Bio
            </label>
            <textarea
              rows={3}
              value={formData.footerBio}
              onChange={(e) => handleChange("footerBio", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
              Copyright Notice Text
            </label>
            <input
              type="text"
              value={formData.copyrightText}
              onChange={(e) => handleChange("copyrightText", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 font-mono text-xs"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold transition-all shadow-xs"
          >
            <Save className="w-4 h-4 text-[#D9F99D]" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
