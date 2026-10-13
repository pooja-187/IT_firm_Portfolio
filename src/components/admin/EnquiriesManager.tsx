"use client";

import React, { useState } from "react";
import { ContactEnquiry } from "@/types/portfolio";
import {
  Inbox,
  Mail,
  Building,
  Calendar,
  Clock,
  Trash2,
  Archive,
  CheckCircle2,
  AlertCircle,
  X,
  MessageSquare,
  FileText,
  Save,
} from "lucide-react";

interface EnquiriesManagerProps {
  enquiries: ContactEnquiry[];
  onUpdateStatus: (
    id: string,
    status: ContactEnquiry["status"],
    notes?: string
  ) => boolean;
  onDeleteEnquiry: (id: string) => boolean;
}

export default function EnquiriesManager({
  enquiries,
  onUpdateStatus,
  onDeleteEnquiry,
}: EnquiriesManagerProps) {
  const [selectedEnquiry, setSelectedEnquiry] = useState<ContactEnquiry | null>(null);
  const [activeTabFilter, setActiveTabFilter] = useState<"ALL" | "NEW" | "IN_PROGRESS" | "ARCHIVED">("ALL");
  const [adminNotesBuffer, setAdminNotesBuffer] = useState("");
  const [toastMsg, setToastMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const showToast = (type: "success" | "error", text: string) => {
    setToastMsg({ type, text });
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleOpenDetail = (item: ContactEnquiry) => {
    setSelectedEnquiry(item);
    setAdminNotesBuffer(item.notes || "");
  };

  const handleSaveNotes = () => {
    if (!selectedEnquiry) return;
    const ok = onUpdateStatus(selectedEnquiry.id, selectedEnquiry.status, adminNotesBuffer);
    if (ok) {
      showToast("success", "Admin notes saved.");
      setSelectedEnquiry({ ...selectedEnquiry, notes: adminNotesBuffer });
    }
  };

  const handleStatusChange = (newStatus: ContactEnquiry["status"]) => {
    if (!selectedEnquiry) return;
    const ok = onUpdateStatus(selectedEnquiry.id, newStatus, adminNotesBuffer);
    if (ok) {
      showToast("success", `Status updated to ${newStatus}.`);
      setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
    }
  };

  const handleDelete = (id: string) => {
    const ok = onDeleteEnquiry(id);
    if (ok) {
      showToast("success", "Enquiry deleted.");
      setDeleteConfirmId(null);
      if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
    }
  };

  const filteredList = enquiries.filter((item) => {
    if (activeTabFilter === "NEW") return item.status === "NEW";
    if (activeTabFilter === "IN_PROGRESS")
      return ["CONTACTED", "IN DISCUSSION", "QUALIFIED"].includes(item.status);
    if (activeTabFilter === "ARCHIVED") return item.status === "ARCHIVED";
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <Inbox className="w-5 h-5 text-neutral-800" />
            <h1 className="text-xl font-bold text-neutral-900 tracking-tight">Contact Enquiries & Leads</h1>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Proposals, client leads, and project briefs received via the public portfolio contact form.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-xl">
          {(["ALL", "NEW", "IN_PROGRESS", "ARCHIVED"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTabFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTabFilter === tab
                  ? "bg-white text-neutral-900 shadow-xs"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              {tab.replace("_", " ")}
            </button>
          ))}
        </div>
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

      {/* Leads Table */}
      <div className="bg-white border border-neutral-200/80 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/75 text-neutral-500 uppercase font-semibold text-[10px] tracking-wider">
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Service Required</th>
                <th className="py-3 px-4">Timeline</th>
                <th className="py-3 px-4">Received</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-neutral-400">
                    No enquiries match the selected filter.
                  </td>
                </tr>
              ) : (
                filteredList.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => handleOpenDetail(item)}
                    className="hover:bg-neutral-50/70 transition-colors cursor-pointer group"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {item.status === "NEW" && (
                          <span className="w-2 h-2 rounded-full bg-[#111] shrink-0" title="New enquiry" />
                        )}
                        <div>
                          <p className="font-semibold text-neutral-900 text-sm group-hover:underline">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-neutral-500 font-mono">
                            {item.email} {item.company && `• ${item.company}`}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-neutral-700 font-medium whitespace-nowrap">
                      {item.service}
                    </td>

                    <td className="py-3 px-4 text-neutral-500 font-mono text-[11px] whitespace-nowrap">
                      {item.timeline || "—"}
                    </td>

                    <td className="py-3 px-4 text-neutral-500 font-mono text-[11px] whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>

                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider ${
                          item.status === "NEW"
                            ? "bg-[#D9F99D] text-neutral-900 border border-neutral-900/10"
                            : item.status === "QUALIFIED"
                            ? "bg-[#84CC16]/20 text-[#365314] font-semibold"
                            : item.status === "IN_DISCUSSION" || (item.status as string) === "IN DISCUSSION"
                            ? "bg-blue-100 text-blue-800"
                            : item.status === "CONTACTED"
                            ? "bg-purple-100 text-purple-800"
                            : item.status === "ARCHIVED"
                            ? "bg-neutral-100 text-neutral-400"
                            : "bg-neutral-200 text-neutral-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteConfirmId(item.id);
                        }}
                        className="p-1.5 text-neutral-400 hover:text-red-600 rounded-lg"
                        title="Delete enquiry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-xl border border-neutral-200 animate-in zoom-in-95">
            <h3 className="text-base font-bold text-neutral-900">Delete Enquiry</h3>
            <p className="text-xs text-neutral-500">
              Are you sure you want to permanently delete this lead record?
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-3.5 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-3.5 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-xs"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enquiry Detail Drawer / Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-neutral-950/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-neutral-200 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Lead Details
                </span>
                <h3 className="text-base font-bold text-neutral-900">{selectedEnquiry.name}</h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="text-neutral-400 hover:text-neutral-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status Selector */}
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80 space-y-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600">
                Pipeline Status
              </label>
              <div className="flex flex-wrap gap-1.5">
                {(
                  [
                    "NEW",
                    "CONTACTED",
                    "IN_DISCUSSION",
                    "QUALIFIED",
                    "CLOSED",
                    "ARCHIVED",
                  ] as const
                ).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => handleStatusChange(st)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      selectedEnquiry.status === st || (st === "IN_DISCUSSION" && (selectedEnquiry.status as string) === "IN DISCUSSION")
                        ? "bg-neutral-900 text-white shadow-xs"
                        : "bg-white text-neutral-700 hover:bg-neutral-200 border border-neutral-200"
                    }`}
                  >
                    {st === "IN_DISCUSSION" ? "IN DISCUSSION" : st}
                  </button>
                ))}
              </div>
            </div>

            {/* Lead Metadata */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-100">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">
                  Email
                </span>
                <a
                  href={`mailto:${selectedEnquiry.email}`}
                  className="text-neutral-900 font-semibold hover:underline flex items-center gap-1.5 truncate"
                >
                  <Mail className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                  <span className="truncate">{selectedEnquiry.email}</span>
                </a>
              </div>

              <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-100">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">
                  Company / Organization
                </span>
                <p className="text-neutral-900 font-semibold flex items-center gap-1.5 truncate">
                  <Building className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                  <span>{selectedEnquiry.company || "Not specified"}</span>
                </p>
              </div>

              <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-100">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">
                  Service Inquired
                </span>
                <p className="text-neutral-900 font-semibold">{selectedEnquiry.service}</p>
              </div>

              <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-100">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">
                  Target Timeline
                </span>
                <p className="text-neutral-900 font-semibold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                  <span>{selectedEnquiry.timeline || "Flexible"}</span>
                </p>
              </div>
            </div>

            {/* Client Message */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700">
                Client Project Message
              </label>
              <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-800 leading-relaxed whitespace-pre-wrap">
                {selectedEnquiry.message}
              </div>
            </div>

            {/* Internal Admin Notes */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700">
                  Private Admin Notes
                </label>
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  className="text-xs font-semibold text-neutral-900 hover:underline flex items-center gap-1"
                >
                  <Save className="w-3 h-3 text-[#D9F99D]" />
                  Save Notes
                </button>
              </div>
              <textarea
                rows={3}
                value={adminNotesBuffer}
                onChange={(e) => setAdminNotesBuffer(e.target.value)}
                placeholder="Add meeting notes, agreed budget, or next steps..."
                className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-lg bg-white text-neutral-900 leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#D9F99D]"
              />
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(selectedEnquiry.id)}
                className="px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Enquiry</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="px-4 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
