"use client";

import React, { useState } from "react";
import { MediaService } from "@/services/MediaService";
import { Image as ImageIcon, Upload, Check, ExternalLink, X } from "lucide-react";

interface ImagePickerInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  description?: string;
  placeholder?: string;
}

export function ImagePickerInput({
  label,
  value,
  onChange,
  description,
  placeholder = "https://... or /path/to/image.png",
}: ImagePickerInputProps) {
  const [showPresets, setShowPresets] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setErrorMsg(null);
      const res = await MediaService.processUploadedFile(file);
      onChange(res.url);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowPresets(!showPresets)}
          className="text-xs font-medium text-[#111] hover:underline flex items-center gap-1"
        >
          <ImageIcon className="w-3.5 h-3.5" />
          {showPresets ? "Hide Presets" : "Choose from Presets"}
        </button>
      </div>

      {description && <p className="text-xs text-neutral-500">{description}</p>}

      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#D9F99D] focus:border-neutral-900 transition-all font-mono text-xs"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <label className="inline-flex items-center gap-1.5 px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-xs font-medium cursor-pointer border border-neutral-300 transition-colors whitespace-nowrap">
          <Upload className="w-3.5 h-3.5" />
          <span>{isUploading ? "Reading..." : "Upload Local"}</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            disabled={isUploading}
          />
        </label>
      </div>

      {errorMsg && <p className="text-xs text-red-600 font-medium">{errorMsg}</p>}

      {/* Preset selector drawer / grid */}
      {showPresets && (
        <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl space-y-3 mt-2 animate-in fade-in duration-150">
          <p className="text-xs font-semibold text-neutral-600">Select from Portfolio Presets:</p>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {MediaService.PRESET_ASSETS.map((group) => (
              <div key={group.category} className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                  {group.category}
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {group.items.map((item) => (
                    <button
                      key={item.url}
                      type="button"
                      onClick={() => {
                        onChange(item.url);
                        setShowPresets(false);
                      }}
                      className={`flex items-center gap-2 p-1.5 rounded-lg text-left text-xs border transition-all ${
                        value === item.url
                          ? "border-neutral-900 bg-white font-medium shadow-xs"
                          : "border-neutral-200 bg-white/70 hover:bg-white text-neutral-700"
                      }`}
                    >
                      <div className="w-7 h-7 rounded bg-neutral-100 overflow-hidden shrink-0 border border-neutral-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.url} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="truncate flex-1 text-[11px]">{item.label}</span>
                      {value === item.url && <Check className="w-3.5 h-3.5 text-neutral-900 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Live Preview Thumbnail */}
      {value && (
        <div className="flex items-center gap-3 pt-1">
          <div className="w-14 h-14 rounded-lg border border-neutral-200 overflow-hidden bg-neutral-100 shrink-0 shadow-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          </div>
          <div className="text-xs text-neutral-500 overflow-hidden">
            <span className="font-medium text-neutral-700">Preview active</span>
            <p className="truncate font-mono text-[11px] text-neutral-400">{value}</p>
          </div>
        </div>
      )}
    </div>
  );
}
