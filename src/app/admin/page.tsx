"use client";

import React, { useState, useEffect } from "react";
import AdminLayout, { AdminTab } from "@/components/admin/AdminLayout";
import ClientsManager from "@/components/admin/ClientsManager";
import TestimonialsManager from "@/components/admin/TestimonialsManager";
import InsightsManager from "@/components/admin/InsightsManager";
import EnquiriesManager from "@/components/admin/EnquiriesManager";
import SeoManager from "@/components/admin/SeoManager";

import { contentService } from "@/services/ContentService";
import { seoService } from "@/services/SEOService";
import {
  ClientItem,
  TestimonialItemData,
  ArticleItemData,
  ContactEnquiry,
} from "@/types/portfolio";

interface AdminDataset {
  clients: ClientItem[];
  testimonials: TestimonialItemData[];
  insights: ArticleItemData[];
  enquiries: ContactEnquiry[];
}

function loadDataset(): AdminDataset {
  return {
    clients: contentService.getClients(),
    testimonials: contentService.getTestimonials(),
    insights: contentService.getInsights(),
    enquiries: contentService.getEnquiries(),
  };
}

export default function AdminPage() {
  const [currentTab, setCurrentTab] = useState<AdminTab>("clients");
  const [dataset, setDataset] = useState<AdminDataset | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDataset(loadDataset());

    // Subscribe to storage changes (cross-tab / broadcast sync)
    const unsubscribe = contentService.subscribe(() => {
      setTimeout(() => {
        setDataset(loadDataset());
      }, 0);
    });

    return () => unsubscribe();
  }, []);

  if (!mounted || !dataset) {
    return (
      <div className="min-h-screen bg-[#F4F6F4] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#84CC16] border-t-transparent animate-spin" />
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Loading Admin...
          </p>
        </div>
      </div>
    );
  }

  const unreadEnquiries = dataset.enquiries.filter((e) => e.status === "NEW").length;

  const handleResetData = () => {
    contentService.resetToInitial();
    seoService.resetToInitial();
    setDataset(loadDataset());
  };

  // ── Clients handlers ──────────────────────────────────────────────────────
  const handleSaveClient = (client: ClientItem): boolean => {
    const ok = contentService.saveClient(client);
    if (ok) setDataset((prev) => prev ? { ...prev, clients: contentService.getClients() } : prev);
    return ok;
  };

  const handleDeleteClient = (id: string): boolean => {
    const ok = contentService.deleteClient(id);
    if (ok) setDataset((prev) => prev ? { ...prev, clients: contentService.getClients() } : prev);
    return ok;
  };

  const handleReorderClients = (ids: string[]): boolean => {
    const ok = contentService.reorderClients(ids);
    if (ok) setDataset((prev) => prev ? { ...prev, clients: contentService.getClients() } : prev);
    return ok;
  };

  // ── Testimonials handlers ─────────────────────────────────────────────────
  const handleSaveTestimonial = (t: TestimonialItemData): boolean => {
    const ok = contentService.saveTestimonial(t);
    if (ok) setDataset((prev) => prev ? { ...prev, testimonials: contentService.getTestimonials() } : prev);
    return ok;
  };

  const handleDeleteTestimonial = (id: string): boolean => {
    const ok = contentService.deleteTestimonial(id);
    if (ok) setDataset((prev) => prev ? { ...prev, testimonials: contentService.getTestimonials() } : prev);
    return ok;
  };

  const handleReorderTestimonials = (ids: string[]): boolean => {
    const ok = contentService.reorderTestimonials(ids);
    if (ok) setDataset((prev) => prev ? { ...prev, testimonials: contentService.getTestimonials() } : prev);
    return ok;
  };

  // ── Insights handlers ─────────────────────────────────────────────────────
  const handleSaveInsight = (a: ArticleItemData): boolean => {
    const ok = contentService.saveInsight(a);
    if (ok) setDataset((prev) => prev ? { ...prev, insights: contentService.getInsights() } : prev);
    return ok;
  };

  const handleDeleteInsight = (id: string): boolean => {
    const ok = contentService.deleteInsight(id);
    if (ok) setDataset((prev) => prev ? { ...prev, insights: contentService.getInsights() } : prev);
    return ok;
  };

  const handleReorderInsights = (ids: string[]): boolean => {
    const ok = contentService.reorderInsights(ids);
    if (ok) setDataset((prev) => prev ? { ...prev, insights: contentService.getInsights() } : prev);
    return ok;
  };

  // ── Enquiries handlers ────────────────────────────────────────────────────
  const handleUpdateEnquiryStatus = (id: string, status: ContactEnquiry["status"], notes?: string): boolean => {
    const ok = contentService.updateEnquiryStatus(id, status, notes);
    if (ok) setDataset((prev) => prev ? { ...prev, enquiries: contentService.getEnquiries() } : prev);
    return ok;
  };

  const handleDeleteEnquiry = (id: string): boolean => {
    const ok = contentService.deleteEnquiry(id);
    if (ok) setDataset((prev) => prev ? { ...prev, enquiries: contentService.getEnquiries() } : prev);
    return ok;
  };

  return (
    <AdminLayout
      currentTab={currentTab}
      onTabChange={setCurrentTab}
      onResetData={handleResetData}
      unreadEnquiriesCount={unreadEnquiries}
    >
      {/* ── CLIENTS ── */}
      {currentTab === "clients" && (
        <ClientsManager
          clients={dataset.clients}
          onSaveClient={handleSaveClient}
          onDeleteClient={handleDeleteClient}
          onReorderClients={handleReorderClients}
        />
      )}

      {/* ── TESTIMONIALS ── */}
      {currentTab === "testimonials" && (
        <TestimonialsManager
          testimonials={dataset.testimonials}
          onSaveTestimonial={handleSaveTestimonial}
          onDeleteTestimonial={handleDeleteTestimonial}
          onReorderTestimonials={handleReorderTestimonials}
        />
      )}

      {/* ── INSIGHTS ── */}
      {currentTab === "insights" && (
        <InsightsManager
          insights={dataset.insights}
          onSaveInsight={handleSaveInsight}
          onDeleteInsight={handleDeleteInsight}
          onReorderInsights={handleReorderInsights}
        />
      )}

      {/* ── ENQUIRIES ── */}
      {currentTab === "enquiries" && (
        <EnquiriesManager
          enquiries={dataset.enquiries}
          onUpdateStatus={handleUpdateEnquiryStatus}
          onDeleteEnquiry={handleDeleteEnquiry}
        />
      )}

      {/* ── SEO ── */}
      {currentTab === "seo" && <SeoManager />}
    </AdminLayout>
  );
}
