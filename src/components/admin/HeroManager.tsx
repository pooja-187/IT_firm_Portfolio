"use client";

import React, { useState } from "react";
import { HeroData } from "@/types/portfolio";
import { ImagePickerInput } from "./ImagePickerInput";
import { Sparkles, Save, CheckCircle2, AlertCircle } from "lucide-react";

interface HeroManagerProps {
  initialData: HeroData;
  onSave: (data: HeroData) => boolean;
}

export default function HeroManager({ initialData, onSave }: HeroManagerProps) {
  const [formData, setFormData] = useState<HeroData>(() => ({
    ...initialData,
    bio: initialData.bio || initialData.mainText || "",
    portraitImage: initialData.portraitImage || initialData.imageSrc || "",
    location: initialData.location || initialData.locationText || "Kottayam, Kerala",
    availability: initialData.availability || initialData.availabilityText || "AVAILABLE WORLDWIDE",
  }));
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (field: keyof HeroData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (saveStatus !== "idle") setSaveStatus("idle");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      setSaveStatus("error");
      setStatusMessage("Name is required.");
      return;
    }
    if (!formData.headlineLine1.trim() && !formData.headlineLine2.trim()) {
      setSaveStatus("error");
      setStatusMessage("At least one headline line is required.");
      return;
    }

    const toSave: HeroData = {
      ...formData,
      mainText: formData.bio || formData.mainText || "",
      imageSrc: formData.portraitImage || formData.imageSrc || "",
      locationText: formData.location || formData.locationText || "Kottayam, Kerala",
      availabilityText: formData.availability || formData.availabilityText || "AVAILABLE WORLDWIDE",
    };

    const ok = onSave(toSave);
    if (ok) {
      setSaveStatus("success");
      setStatusMessage("Hero updated successfully.");
      setTimeout(() => setSaveStatus("idle"), 4000);
    } else {
      setSaveStatus("error");
      setStatusMessage("Unable to save changes to localStorage.");
    }
  };

  return (
    <div className="max-w-4xl space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-neutral-800" />
            <h1 className="text-xl font-bold text-neutral-900 tracking-tight">Hero Section</h1>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Manage your main banner headline, introduction, status indicators, and portrait image.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-sm font-semibold transition-all shadow-xs"
        >
          <Save className="w-4 h-4 text-[#D9F99D]" />
          <span>Save Changes</span>
        </button>
      </div>

      {saveStatus === "success" && (
        <div className="p-3.5 bg-[#84CC16]/15 border border-[#84CC16]/30 rounded-xl flex items-center gap-2.5 text-xs text-[#365314] font-medium animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#65a30d] shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {saveStatus === "error" && (
        <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2.5 text-xs text-red-800 font-medium animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core Identity */}
        <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 space-y-4 shadow-xs">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-800">
            Identity & Status
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#D9F99D] focus:border-neutral-900 font-medium"
                placeholder="Nashim Nazar"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                Badge / Tagline Pill
              </label>
              <input
                type="text"
                value={formData.badge}
                onChange={(e) => handleChange("badge", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#D9F99D] focus:border-neutral-900"
                placeholder="Product Designer & Tech Lead"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#D9F99D] focus:border-neutral-900"
                placeholder="Kottayam, Kerala, India"
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
                className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#D9F99D] focus:border-neutral-900"
                placeholder="Available for Q1/Q2 Projects"
              />
            </div>
          </div>
        </div>

        {/* Headlines */}
        <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 space-y-4 shadow-xs">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-800">
            Headlines & Copy
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                Headline Line 1
              </label>
              <input
                type="text"
                value={formData.headlineLine1}
                onChange={(e) => handleChange("headlineLine1", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#D9F99D] focus:border-neutral-900 font-medium"
                placeholder="Kerala's Best"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                Headline Highlight / Accent Text (Italic Serif)
              </label>
              <input
                type="text"
                value={formData.headlineHighlight}
                onChange={(e) => handleChange("headlineHighlight", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#D9F99D] focus:border-neutral-900 font-medium text-[#365314]"
                placeholder="UI/UX"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                Headline Line 2 (Suffix)
              </label>
              <input
                type="text"
                value={formData.headlineLine2}
                onChange={(e) => handleChange("headlineLine2", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#D9F99D] focus:border-neutral-900 font-medium"
                placeholder="Designer"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                Bio / Subtitle Paragraph
              </label>
              <textarea
                rows={4}
                value={formData.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#D9F99D] focus:border-neutral-900 leading-relaxed"
                placeholder="Enter introduction text..."
              />
            </div>
          </div>
        </div>

        {/* Call to Actions & Media */}
        <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 space-y-4 shadow-xs">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-800">
            Call to Action & Media
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                Primary CTA Text
              </label>
              <input
                type="text"
                value={formData.ctaText}
                onChange={(e) => handleChange("ctaText", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#D9F99D] focus:border-neutral-900"
                placeholder="Start a Project"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                Primary CTA URL / Anchor
              </label>
              <input
                type="text"
                value={formData.ctaUrl}
                onChange={(e) => handleChange("ctaUrl", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#D9F99D] focus:border-neutral-900 font-mono text-xs"
                placeholder="#contact"
              />
            </div>
          </div>

          <div className="pt-2">
            <ImagePickerInput
              label="Portrait Image Reference"
              value={formData.portraitImage || formData.imageSrc || ""}
              onChange={(val) => {
                handleChange("portraitImage", val);
                handleChange("imageSrc", val);
              }}
              description="Supports local asset path (/hero/portrait.png) or remote URL."
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-sm font-semibold transition-all shadow-xs"
          >
            <Save className="w-4 h-4 text-[#D9F99D]" />
            <span>Save Hero Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
}
