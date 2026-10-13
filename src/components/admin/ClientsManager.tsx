"use client";

import React, { useState, useEffect } from "react";
import { ClientItem } from "@/types/portfolio";
import {
  Building2,
  Plus,
  Edit2,
  Trash2,
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Eye,
  EyeOff,
  X,
  Save,
} from "lucide-react";

interface ClientsManagerProps {
  clients: ClientItem[];
  onSaveClient: (client: ClientItem) => boolean;
  onDeleteClient: (id: string) => boolean;
  onReorderClients: (orderedIds: string[]) => boolean;
}

export default function ClientsManager({
  clients: initialClients,
  onSaveClient,
  onDeleteClient,
  onReorderClients,
}: ClientsManagerProps) {
  // Own local list — always stays up to date independently of parent re-renders
  const [list, setList] = useState<ClientItem[]>(initialClients);
  const [editingClient, setEditingClient] = useState<ClientItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [toastMsg, setToastMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Sync when parent sends fresh data (e.g. after reset)
  useEffect(() => {
    setList(initialClients);
  }, [initialClients]);

  const showToast = (type: "success" | "error", text: string) => {
    setToastMsg({ type, text });
    setTimeout(() => setToastMsg(null), 3500);
  };

  const getLink = (c: ClientItem) => c.link || c.href || "";

  const handleOpenAdd = () => {
    setIsNew(true);
    setEditingClient({
      id: "client-" + Date.now(),
      name: "",
      category: "ENTERPRISE & TECH",
      href: "",
      link: "",
      isFeatured: false,
      isPublished: true,
      displayOrder: list.length + 1,
    });
  };

  const handleOpenEdit = (client: ClientItem) => {
    setIsNew(false);
    setEditingClient({
      ...client,
      link: getLink(client),
      href: getLink(client),
    });
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClient || !editingClient.name.trim()) {
      showToast("error", "Client name is required.");
      return;
    }

    const toSave: ClientItem = {
      ...editingClient,
      name: editingClient.name.trim(),
      href: editingClient.link || editingClient.href || "",
      link: editingClient.link || editingClient.href || "",
    };

    const ok = onSaveClient(toSave);
    if (ok) {
      // Update local list immediately — don't wait for parent prop refresh
      setList((prev) => {
        const idx = prev.findIndex((c) => c.id === toSave.id);
        if (idx >= 0) {
          const updated = [...prev];
          updated[idx] = toSave;
          return updated;
        }
        return [...prev, toSave];
      });
      showToast("success", `Client "${toSave.name}" saved.`);
      setEditingClient(null);
    } else {
      showToast("error", "Unable to save client. Please try again.");
    }
  };

  const handleDelete = (id: string) => {
    const ok = onDeleteClient(id);
    if (ok) {
      setList((prev) => prev.filter((c) => c.id !== id));
      showToast("success", "Client deleted.");
      setDeleteConfirmId(null);
    } else {
      showToast("error", "Failed to delete client.");
    }
  };

  const handleTogglePublish = (client: ClientItem) => {
    const updated = { ...client, isPublished: !client.isPublished };
    const ok = onSaveClient(updated);
    if (ok) {
      setList((prev) => prev.map((c) => (c.id === client.id ? updated : c)));
      showToast("success", `Client ${updated.isPublished ? "published" : "hidden"}.`);
    }
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;

    const newOrder = [...list];
    const [moved] = newOrder.splice(index, 1);
    newOrder.splice(targetIdx, 0, moved);

    // Assign new display orders
    const withOrders = newOrder.map((c, i) => ({ ...c, displayOrder: i + 1 }));

    const ok = onReorderClients(withOrders.map((c) => c.id));
    if (ok) {
      setList(withOrders);
      showToast("success", "Order updated.");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-neutral-800" />
            <h1 className="text-xl font-bold text-neutral-900 tracking-tight">Clients Directory</h1>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Manage corporate partners and clients displayed in the Selected Clients grid &amp; animated stream.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold transition-all shadow-xs"
        >
          <Plus className="w-4 h-4 text-[#D9F99D]" />
          <span>Add Client</span>
        </button>
      </div>

      {/* Toast */}
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

      {/* Table */}
      <div className="bg-white border border-neutral-200/80 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/75 text-neutral-500 uppercase font-semibold text-[10px] tracking-wider">
                <th className="py-3 px-4 w-12 text-center">Order</th>
                <th className="py-3 px-4">Client Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Link</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {list.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-neutral-400">
                    <Building2 className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    <p>No clients yet. Click &quot;Add Client&quot; to create one.</p>
                  </td>
                </tr>
              ) : (
                list.map((client, idx) => {
                  const link = getLink(client);
                  return (
                    <tr key={client.id} className="hover:bg-neutral-50/60 transition-colors">
                      {/* Reorder */}
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => handleMove(idx, "up")}
                            className="p-1 text-neutral-400 hover:text-neutral-900 disabled:opacity-20"
                            title="Move up"
                          >
                            <ChevronUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === list.length - 1}
                            onClick={() => handleMove(idx, "down")}
                            className="p-1 text-neutral-400 hover:text-neutral-900 disabled:opacity-20"
                            title="Move down"
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                      {/* Name */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-neutral-900 text-sm">{client.name}</div>
                        {client.isFeatured && (
                          <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[9px] font-bold uppercase">
                            Featured
                          </span>
                        )}
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4 text-neutral-500 font-mono text-[11px]">
                        {client.category || "GENERAL"}
                      </td>

                      {/* Link */}
                      <td className="py-3 px-4 text-neutral-500 font-mono text-[11px] truncate max-w-[150px]">
                        {link && link !== "#" && link !== "" ? (
                          <a
                            href={link}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:underline hover:text-neutral-900 inline-flex items-center gap-1"
                          >
                            <span className="truncate max-w-[120px]">{link}</span>
                            <ExternalLink className="w-2.5 h-2.5 opacity-60 shrink-0" />
                          </a>
                        ) : (
                          <span className="text-neutral-300">—</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleTogglePublish(client)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                            client.isPublished !== false
                              ? "bg-[#84CC16]/20 text-[#365314] hover:bg-[#84CC16]/30 font-semibold"
                              : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                          }`}
                        >
                          {client.isPublished !== false ? (
                            <>
                              <Eye className="w-3 h-3" />
                              <span>Published</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3 h-3" />
                              <span>Draft</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(client)}
                            className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                            title="Edit Client"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(client.id)}
                            className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Client"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirm Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-xl border border-neutral-200 animate-in zoom-in-95">
            <h3 className="text-base font-bold text-neutral-900">Delete Client?</h3>
            <p className="text-xs text-neutral-500">
              This client will be removed from your portfolio immediately.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-3.5 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-3.5 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-xs"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {editingClient && (
        <div className="fixed inset-0 z-50 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-neutral-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="text-base font-bold text-neutral-900">
                {isNew ? "Add New Client" : `Edit: ${editingClient.name}`}
              </h3>
              <button
                type="button"
                onClick={() => setEditingClient(null)}
                className="text-neutral-400 hover:text-neutral-700 p-1 rounded-lg hover:bg-neutral-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Client Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editingClient.name}
                  onChange={(e) => setEditingClient({ ...editingClient, name: e.target.value })}
                  placeholder="e.g. TRAVINNO, MANZIO..."
                  required
                  autoFocus
                  className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#84CC16]/40 focus:border-[#84CC16] font-semibold transition-all"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Category
                </label>
                <input
                  type="text"
                  value={editingClient.category || ""}
                  onChange={(e) => setEditingClient({ ...editingClient, category: e.target.value })}
                  placeholder="e.g. AI Travel Platform, Healthcare..."
                  className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#84CC16]/40 focus:border-[#84CC16] transition-all"
                />
              </div>

              {/* Link */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Website / Link
                </label>
                <input
                  type="text"
                  value={editingClient.link || ""}
                  onChange={(e) => setEditingClient({ ...editingClient, link: e.target.value, href: e.target.value })}
                  placeholder="https://client-website.com"
                  className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#84CC16]/40 focus:border-[#84CC16] font-mono text-xs transition-all"
                />
              </div>

              {/* Checkboxes */}
              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-neutral-700 select-none">
                  <input
                    type="checkbox"
                    checked={editingClient.isPublished !== false}
                    onChange={(e) => setEditingClient({ ...editingClient, isPublished: e.target.checked })}
                    className="w-4 h-4 rounded accent-[#84CC16]"
                  />
                  <span>Published</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-neutral-700 select-none">
                  <input
                    type="checkbox"
                    checked={editingClient.isFeatured || false}
                    onChange={(e) => setEditingClient({ ...editingClient, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded accent-[#84CC16]"
                  />
                  <span>Featured</span>
                </label>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setEditingClient(null)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold transition-all shadow-xs"
                >
                  <Save className="w-3.5 h-3.5 text-[#D9F99D]" />
                  <span>Save Client</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
