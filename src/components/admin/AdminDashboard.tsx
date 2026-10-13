"use client";

import React from "react";
import { AdminTab } from "./AdminLayout";
import {
  FolderKanban,
  Building2,
  Briefcase,
  MessageSquareQuote,
  BookOpenText,
  HelpCircle,
  Inbox,
  ArrowUpRight,
  PlusCircle,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

interface AdminDashboardProps {
  stats: {
    totalProjects: number;
    totalClients: number;
    totalServices: number;
    totalTestimonials: number;
    totalInsights: number;
    totalFaqs: number;
    unreadEnquiries: number;
    totalEnquiries: number;
  };
  onNavigate: (tab: AdminTab) => void;
  onOpenCreateModal?: (tab: AdminTab) => void;
  recentActivity?: { title: string; time: string; tab: AdminTab }[];
}

export default function AdminDashboard({
  stats,
  onNavigate,
  onOpenCreateModal,
}: AdminDashboardProps) {
  const cards = [
    {
      label: "Total Projects",
      value: stats.totalProjects,
      tab: "projects" as AdminTab,
      icon: FolderKanban,
      action: "+ Add Project",
    },
    {
      label: "Total Clients",
      value: stats.totalClients,
      tab: "clients" as AdminTab,
      icon: Building2,
      action: "+ Add Client",
    },
    {
      label: "Total Services",
      value: stats.totalServices,
      tab: "services" as AdminTab,
      icon: Briefcase,
      action: "+ Add Service",
    },
    {
      label: "Total Testimonials",
      value: stats.totalTestimonials,
      tab: "testimonials" as AdminTab,
      icon: MessageSquareQuote,
      action: "+ Add Testimonial",
    },
    {
      label: "Total Insights",
      value: stats.totalInsights,
      tab: "insights" as AdminTab,
      icon: BookOpenText,
      action: "+ Add Insight",
    },
    {
      label: "Total FAQs",
      value: stats.totalFaqs,
      tab: "faq" as AdminTab,
      icon: HelpCircle,
      action: "+ Add FAQ",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Welcome Banner */}
      <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-[#D9F99D]/20 via-transparent to-transparent pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#111] text-[#D9F99D] text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D9F99D] animate-pulse" />
              Content Engine Live
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
              Welcome, Nashim Nazar
            </h1>
            <p className="text-sm text-neutral-500 mt-1 max-w-xl">
              Manage your portfolio content in real-time. Changes saved here reflect instantly on your live website.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-sm font-semibold transition-all shadow-xs"
            >
              <span>View Live Portfolio</span>
              <ArrowUpRight className="w-4 h-4 text-[#D9F99D]" />
            </a>
          </div>
        </div>
      </div>

      {/* Leads / Enquiries Priority Card */}
      {stats.unreadEnquiries > 0 && (
        <div className="bg-[#111] text-white rounded-2xl p-5 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D9F99D] text-black flex items-center justify-center font-bold">
              <Inbox className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">
                You have {stats.unreadEnquiries} new contact {stats.unreadEnquiries === 1 ? "enquiry" : "enquiries"}
              </p>
              <p className="text-xs text-neutral-400">
                Potential clients submitted proposals via your public contact form.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate("enquiries")}
            className="px-4 py-2 bg-white text-neutral-900 text-xs font-bold rounded-lg hover:bg-neutral-100 transition-colors shrink-0"
          >
            Review Enquiries →
          </button>
        </div>
      )}

      {/* Metrics Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-neutral-900 tracking-tight">Content Overview</h2>
          <span className="text-xs text-neutral-400">Phase 1 • LocalStorage & Node API Service</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.label}
                onClick={() => onNavigate(c.tab)}
                className="group bg-white p-4 rounded-xl border border-neutral-200/80 hover:border-neutral-900 transition-all cursor-pointer shadow-xs flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-700 group-hover:bg-[#111] group-hover:text-[#D9F99D] transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xl font-bold text-neutral-900">{c.value}</span>
                </div>
                <div>
                  <p className="text-xs font-medium text-neutral-600 truncate">{c.label}</p>
                  <p className="text-[11px] text-neutral-400 group-hover:text-neutral-900 font-medium transition-colors mt-1">
                    Manage →
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions Panel */}
      <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 shadow-xs">
        <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-4 flex items-center gap-2">
          <PlusCircle className="w-4 h-4 text-neutral-600" />
          Quick Actions
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {cards.map((c) => (
            <button
              key={c.action}
              onClick={() => onNavigate(c.tab)}
              className="px-3 py-2.5 text-xs font-semibold text-neutral-700 bg-neutral-50 hover:bg-neutral-900 hover:text-white rounded-xl border border-neutral-200 hover:border-neutral-900 transition-all text-left flex items-center justify-between"
            >
              <span>{c.action}</span>
              <span className="text-neutral-400 text-xs">→</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Tips & System Architecture Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#FAF8F5] border border-neutral-200/80 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-neutral-900 font-semibold text-sm mb-2">
            <CheckCircle2 className="w-4 h-4 text-[#65a30d]" />
            Live Sync Workflow Active
          </div>
          <p className="text-xs text-neutral-600 leading-relaxed">
            When you edit and save any item in this admin panel, changes are automatically broadcast via 
            <code className="mx-1 px-1.5 py-0.5 bg-neutral-200/80 rounded text-[11px] font-mono">BroadcastChannel</code> 
            and updated in localStorage. Refresh or view the public portfolio tab to see updates immediately!
          </p>
        </div>

        <div className="bg-[#FAF8F5] border border-neutral-200/80 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-neutral-900 font-semibold text-sm mb-2">
            <Clock className="w-4 h-4 text-amber-600" />
            Node.js REST API Architecture
          </div>
          <p className="text-xs text-neutral-600 leading-relaxed">
            The Node.js Express API is running on 
            <code className="mx-1 px-1.5 py-0.5 bg-neutral-200/80 rounded text-[11px] font-mono">http://localhost:5000/api</code>. 
            All CRUD endpoints are prepared to connect to PostgreSQL in Phase 2 without rewriting the admin UI.
          </p>
        </div>
      </div>
    </div>
  );
}
