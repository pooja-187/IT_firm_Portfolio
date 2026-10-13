"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  MessageSquareQuote,
  BookOpenText,
  Inbox,
  Globe,
  RotateCcw,
  ExternalLink,
  Menu,
  X,
  Check,
  AlertCircle,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type AdminTab =
  | "clients"
  | "testimonials"
  | "insights"
  | "enquiries"
  | "seo";

interface AdminLayoutProps {
  currentTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  onResetData: () => void;
  unreadEnquiriesCount: number;
  children: React.ReactNode;
}

const CONTENT_ITEMS: {
  id: AdminTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "clients", label: "Clients", icon: Building2 },
  { id: "testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { id: "insights", label: "Insights", icon: BookOpenText },
  { id: "enquiries", label: "Contact Enquiries", icon: Inbox },
];

const SEO_ITEMS: {
  id: AdminTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [{ id: "seo", label: "SEO Settings", icon: Globe }];

export default function AdminLayout({
  currentTab,
  onTabChange,
  onResetData,
  unreadEnquiriesCount,
  children,
}: AdminLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  function NavButton({
    id,
    label,
    icon: Icon,
    badge,
    mobile = false,
  }: {
    id: AdminTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
    mobile?: boolean;
  }) {
    const isActive = currentTab === id;
    return (
      <button
        type="button"
        onClick={() => {
          onTabChange(id);
          if (mobile) setMobileMenuOpen(false);
        }}
        className={cn(
          "w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-[13px] transition-all text-left group",
          isActive
            ? "bg-[#84CC16]/18 text-[#365314] font-bold border-l-2 border-[#84CC16]"
            : "text-neutral-600 hover:text-[#365314] hover:bg-[#84CC16]/10"
        )}
      >
        <span className="truncate">{label}</span>
        <div className="flex items-center gap-2">
          {badge !== undefined && badge > 0 && (
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#84CC16] text-[#111]">
              {badge}
            </span>
          )}
          <Icon
            className={cn(
              "w-4 h-4 shrink-0 transition-colors",
              isActive ? "text-[#65a30d]" : "text-neutral-400 group-hover:text-[#65a30d]"
            )}
          />
        </div>
      </button>
    );
  }

  function SidebarContent({ mobile = false }: { mobile?: boolean }) {
    return (
      <>
        {/* Profile Card */}
        <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-11 h-11 shrink-0 rounded-full overflow-hidden border border-neutral-200 shadow-2xs">
              <img
                src="/images/projects/ChatGPT Image Sep 28, 2026, 03_14_07 PM.png"
                alt="Nashim Nazar"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#84CC16] border-2 border-white rounded-full" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-xs sm:text-sm text-neutral-900 truncate">
                Nashim Nazar
              </h3>
              <p className="text-[11px] text-neutral-400 truncate font-normal">CEO &amp; Founder</p>
            </div>
          </div>
          <div
            className="shrink-0 w-5 h-5 rounded-md bg-[#84CC16] text-[#111111] flex items-center justify-center shadow-xs"
            title="Verified Administrator"
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
          {/* CONTENT */}
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400 mb-1.5">
              Content
            </p>
            {CONTENT_ITEMS.map((item) => (
              <NavButton
                key={item.id}
                id={item.id}
                label={item.label}
                icon={item.icon}
                badge={item.id === "enquiries" ? unreadEnquiriesCount : undefined}
                mobile={mobile}
              />
            ))}
          </div>

          {/* SEO */}
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400 mb-1.5">
              SEO
            </p>
            {SEO_ITEMS.map((item) => (
              <NavButton
                key={item.id}
                id={item.id}
                label={item.label}
                icon={item.icon}
                mobile={mobile}
              />
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-neutral-100 space-y-2 bg-neutral-50/50">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-[#111] bg-[#84CC16] hover:bg-[#72b312] transition-colors shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
            Live Site
          </Link>
          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-neutral-600 hover:text-red-600 hover:bg-red-50 border border-neutral-200 bg-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Data
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F6F4] text-[#111827] flex flex-col antialiased selection:bg-[#84CC16]/30 selection:text-black">
      {/* ── Top Header ── */}
      <header className="sticky top-0 z-40 bg-white border-b border-neutral-200/80 px-4 sm:px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-[#84CC16] text-[#111] flex items-center justify-center font-black shadow-xs">
              <Layers className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="font-bold text-base tracking-tight text-neutral-900 hidden sm:inline">
              Nashim<span className="text-[#84CC16]">.</span>
            </span>
          </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
            aria-label="Toggle navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Enquiries badge */}
          <button
            type="button"
            onClick={() => onTabChange("enquiries")}
            className="relative p-2 rounded-full text-neutral-600 hover:text-[#65a30d] hover:bg-neutral-100 transition-colors"
            title="Contact Enquiries"
          >
            <Inbox className="w-4 h-4" />
            {unreadEnquiriesCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#84CC16] ring-2 ring-white" />
            )}
          </button>

          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#111111] bg-[#84CC16] hover:bg-[#72b312] shadow-xs active:scale-95 transition-all"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
          </Link>

          <div className="flex items-center gap-2 pl-1 sm:pl-2 border-l border-neutral-200">
            <div className="w-7 h-7 rounded-full overflow-hidden border border-neutral-200 shrink-0">
              <img
                src="/images/projects/ChatGPT Image Sep 28, 2026, 03_14_07 PM.png"
                alt="Nashim Nazar"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs font-semibold text-neutral-800 hidden md:inline truncate max-w-[100px]">
              Nashim Nazar
            </span>
          </div>
        </div>
      </header>

      {/* ── Main Layout ── */}
      <div className="flex-1 flex w-full">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-white border-r border-neutral-200/80 shrink-0 sticky top-[53px] h-[calc(100vh-53px)]">
          <SidebarContent />
        </aside>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-xs"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative z-10 w-72 bg-white h-full shadow-2xl flex flex-col overflow-y-auto">
              <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100">
                <span className="font-bold text-sm text-neutral-900">
                  Nashim<span className="text-[#84CC16]">.</span> Admin
                </span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-neutral-500 hover:bg-neutral-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <SidebarContent mobile />
            </div>
          </div>
        )}

        {/* Content */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-6xl w-full mx-auto">{children}</div>
        </main>
      </div>

      {/* Reset Confirm Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-neutral-200 space-y-4">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-neutral-900">Reset All Data?</h3>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                This will reset all clients, testimonials, insights, contact enquiries, and SEO settings back to the original seeded content.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-600 hover:bg-neutral-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onResetData();
                  setShowResetConfirm(false);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-xs"
              >
                Yes, Reset Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
