"use client";

import React, { useState } from "react";
import { ServiceItemData } from "@/types/portfolio";
import { ImagePickerInput } from "./ImagePickerInput";
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  X,
  Save,
  ListPlus,
} from "lucide-react";

interface ServicesManagerProps {
  services: ServiceItemData[];
  onSaveService: (service: ServiceItemData) => boolean;
  onDeleteService: (id: string) => boolean;
  onReorderServices: (orderedIds: string[]) => boolean;
}

export default function ServicesManager({
  services,
  onSaveService,
  onDeleteService,
  onReorderServices,
}: ServicesManagerProps) {
  const [editingService, setEditingService] = useState<ServiceItemData | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [toastMsg, setToastMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Buffer for adding a new bullet item
  const [newBulletText, setNewBulletText] = useState("");

  const showToast = (type: "success" | "error", text: string) => {
    setToastMsg({ type, text });
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleOpenAdd = () => {
    setIsNew(true);
    const k = "new_service_" + Date.now();
    setEditingService({
      id: "service-" + Date.now(),
      serviceKey: k,
      key: k,
      name: "",
      category: "DESIGN & ENGINEERING",
      selectorLabel: "New Service",
      iconName: "layout",
      icon: "layout",
      description: "",
      image: "https://images.unsplash.com/photo-1581291518655-9523c9320984?q=80&w=800&auto=format&fit=crop",
      coverImage: "https://images.unsplash.com/photo-1581291518655-9523c9320984?q=80&w=800&auto=format&fit=crop",
      bullets: [],
      note: "Tailored to product stage, sprint requirements, and tech stack.",
      scopeNote: "Tailored to product stage, sprint requirements, and tech stack.",
      ctaText: "Discuss This Service",
      ctaHref: "#contact",
      ctaUrl: "#contact",
      displayOrder: services.length + 1,
      isPublished: true,
    });
  };

  const handleOpenEdit = (service: ServiceItemData) => {
    setIsNew(false);
    setEditingService({
      ...service,
      key: service.key || service.serviceKey,
      coverImage: service.coverImage || service.image,
      scopeNote: service.scopeNote || service.note,
      ctaUrl: service.ctaUrl || service.ctaHref,
      bullets: service.bullets ? [...service.bullets] : [],
    });
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    if (!editingService.name.trim()) {
      showToast("error", "Service name is required.");
      return;
    }
    const sKey = (editingService.key || editingService.serviceKey || "").trim();
    if (!sKey) {
      showToast("error", "Service key is required.");
      return;
    }

    const toSave: ServiceItemData = {
      ...editingService,
      serviceKey: sKey,
      key: sKey,
      iconName: editingService.icon || editingService.iconName || "layout",
      image: editingService.coverImage || editingService.image || "",
      coverImage: editingService.coverImage || editingService.image || "",
      note: editingService.scopeNote || editingService.note || "",
      scopeNote: editingService.scopeNote || editingService.note || "",
      ctaHref: editingService.ctaUrl || editingService.ctaHref || "#contact",
      ctaUrl: editingService.ctaUrl || editingService.ctaHref || "#contact",
    };

    const ok = onSaveService(toSave);
    if (ok) {
      showToast("success", `Service "${editingService.name}" saved successfully.`);
      setEditingService(null);
    } else {
      showToast("error", "Failed to save service.");
    }
  };

  const handleDelete = (id: string) => {
    const ok = onDeleteService(id);
    if (ok) {
      showToast("success", "Service deleted.");
      setDeleteConfirmId(null);
    } else {
      showToast("error", "Failed to delete service.");
    }
  };

  const handleTogglePublish = (service: ServiceItemData) => {
    const updated = { ...service, isPublished: !service.isPublished };
    const ok = onSaveService(updated);
    if (ok) {
      showToast("success", `Service "${service.name}" ${updated.isPublished ? "published" : "hidden"}.`);
    }
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= services.length) return;

    const newOrder = [...services];
    const [moved] = newOrder.splice(index, 1);
    newOrder.splice(targetIdx, 0, moved);

    const ok = onReorderServices(newOrder.map((s) => s.id));
    if (ok) {
      showToast("success", "Services order updated.");
    }
  };

  // Bullet items helpers
  const handleAddBullet = () => {
    if (!editingService || !newBulletText.trim()) return;
    const bullets = [...(editingService.bullets || [])];
    bullets.push(newBulletText.trim());
    setEditingService({ ...editingService, bullets });
    setNewBulletText("");
  };

  const handleRemoveBullet = (idx: number) => {
    if (!editingService || !editingService.bullets) return;
    const bullets = [...editingService.bullets];
    bullets.splice(idx, 1);
    setEditingService({ ...editingService, bullets });
  };

  const handleMoveBullet = (idx: number, direction: "up" | "down") => {
    if (!editingService || !editingService.bullets) return;
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= editingService.bullets.length) return;
    const bullets = [...editingService.bullets];
    const [moved] = bullets.splice(idx, 1);
    bullets.splice(targetIdx, 0, moved);
    setEditingService({ ...editingService, bullets });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-neutral-800" />
            <h1 className="text-xl font-bold text-neutral-900 tracking-tight">Services Offerings</h1>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Manage comprehensive service packages, scope deliverables, feature bullets, and CTAs.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold transition-all shadow-xs"
        >
          <Plus className="w-4 h-4 text-[#D9F99D]" />
          <span>Add Service</span>
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

      {/* Services Table */}
      <div className="bg-white border border-neutral-200/80 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/75 text-neutral-500 uppercase font-semibold text-[10px] tracking-wider">
                <th className="py-3 px-4 w-12 text-center">Order</th>
                <th className="py-3 px-4">Service</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Selector Label</th>
                <th className="py-3 px-4 text-center">Bullets</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {services.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-neutral-400">
                    No services found. Click &quot;Add Service&quot; to create one.
                  </td>
                </tr>
              ) : (
                services.map((service, idx) => (
                  <tr key={service.id} className="hover:bg-neutral-50/60 transition-colors">
                    {/* Reorder Buttons */}
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          disabled={idx === 0}
                          onClick={() => handleMove(idx, "up")}
                          className="p-1 text-neutral-400 hover:text-neutral-900 disabled:opacity-20"
                          title="Move up"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          disabled={idx === services.length - 1}
                          onClick={() => handleMove(idx, "down")}
                          className="p-1 text-neutral-400 hover:text-neutral-900 disabled:opacity-20"
                          title="Move down"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                    {/* Service Name + Key */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-neutral-900 text-sm">{service.name}</div>
                      <p className="text-[11px] text-neutral-400 font-mono">{service.key || service.serviceKey}</p>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4 text-neutral-500 font-mono text-[11px]">
                      {service.category}
                    </td>

                    {/* Selector Label */}
                    <td className="py-3 px-4 text-neutral-700">
                      <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-800 text-[11px] font-medium">
                        {service.selectorLabel}
                      </span>
                    </td>

                    {/* Bullets count */}
                    <td className="py-3 px-4 text-center text-neutral-600 font-semibold">
                      {service.bullets?.length || 0}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleTogglePublish(service)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                          service.isPublished !== false
                            ? "bg-[#84CC16]/20 text-[#365314] hover:bg-[#84CC16]/30 font-semibold"
                            : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                        }`}
                      >
                        {service.isPublished !== false ? (
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
                          onClick={() => handleOpenEdit(service)}
                          className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                          title="Edit Service"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(service.id)}
                          className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Service"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
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
            <h3 className="text-base font-bold text-neutral-900">Delete Service</h3>
            <p className="text-xs text-neutral-500">
              Are you sure you want to delete this service package? It will be removed from your interactive services browser.
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
                Delete Service
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Service Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-neutral-950/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 my-8 space-y-5 shadow-2xl border border-neutral-200 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 sticky top-0 bg-white z-10">
              <h3 className="text-base font-bold text-neutral-900">
                {isNew ? "Add New Service Package" : `Edit Service: ${editingService.name}`}
              </h3>
              <button
                onClick={() => setEditingService(null)}
                className="text-neutral-400 hover:text-neutral-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    value={editingService.name}
                    onChange={(e) =>
                      setEditingService({ ...editingService, name: e.target.value })
                    }
                    placeholder="UI/UX & Product Design"
                    required
                    className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#D9F99D] font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Service Key *
                  </label>
                  <input
                    type="text"
                    value={editingService.key}
                    onChange={(e) =>
                      setEditingService({ ...editingService, key: e.target.value })
                    }
                    placeholder="ui_ux_product_design"
                    required
                    className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#D9F99D] font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={editingService.category}
                    onChange={(e) =>
                      setEditingService({ ...editingService, category: e.target.value })
                    }
                    placeholder="PRODUCT ARCHITECTURE"
                    className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#D9F99D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Tab Selector Label *
                  </label>
                  <input
                    type="text"
                    value={editingService.selectorLabel}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        selectorLabel: e.target.value,
                      })
                    }
                    placeholder="UI/UX Design"
                    required
                    className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#D9F99D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Detailed Description
                </label>
                <textarea
                  rows={3}
                  value={editingService.description}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      description: e.target.value,
                    })
                  }
                  placeholder="Comprehensive description of the service delivery and business value..."
                  className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#D9F99D] leading-relaxed"
                />
              </div>

              {/* Cover Image */}
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/80">
                <ImagePickerInput
                  label="Cover Image"
                  value={editingService.coverImage || ""}
                  onChange={(val) =>
                    setEditingService({ ...editingService, coverImage: val })
                  }
                  description="Featured image displayed in the active service showcase panel."
                />
              </div>

              {/* Feature Bullets Editor */}
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/80 space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800">
                  Deliverable Bullet Points ({editingService.bullets?.length || 0})
                </label>
                <p className="text-xs text-neutral-500">
                  Key competencies, process milestones, or deliverables included in this offering.
                </p>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newBulletText}
                    onChange={(e) => setNewBulletText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddBullet();
                      }
                    }}
                    placeholder="e.g. End-to-end design systems with Figma tokens"
                    className="flex-1 px-3 py-2 text-xs border border-neutral-200 rounded-lg bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#D9F99D]"
                  />
                  <button
                    type="button"
                    onClick={handleAddBullet}
                    className="inline-flex items-center gap-1 px-3 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold"
                  >
                    <ListPlus className="w-3.5 h-3.5 text-[#D9F99D]" />
                    <span>Add Bullet</span>
                  </button>
                </div>

                {editingService.bullets && editingService.bullets.length > 0 && (
                  <div className="border border-neutral-200 rounded-lg overflow-hidden divide-y divide-neutral-100 bg-white">
                    {editingService.bullets.map((bullet, bIdx) => (
                      <div
                        key={bIdx}
                        className="flex items-center justify-between p-2.5 hover:bg-neutral-50 transition-colors text-xs"
                      >
                        <div className="flex items-center gap-2 flex-1 mr-2">
                          <span className="w-5 h-5 rounded-full bg-neutral-100 text-neutral-600 flex items-center justify-center font-mono text-[10px] shrink-0">
                            {bIdx + 1}
                          </span>
                          <span className="text-neutral-800 font-medium">{bullet}</span>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            disabled={bIdx === 0}
                            onClick={() => handleMoveBullet(bIdx, "up")}
                            className="p-1 text-neutral-400 hover:text-neutral-900 disabled:opacity-20"
                            title="Move up"
                          >
                            <ChevronUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={bIdx === (editingService.bullets?.length || 0) - 1}
                            onClick={() => handleMoveBullet(bIdx, "down")}
                            className="p-1 text-neutral-400 hover:text-neutral-900 disabled:opacity-20"
                            title="Move down"
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveBullet(bIdx)}
                            className="p-1 text-neutral-400 hover:text-red-600 rounded"
                            title="Remove bullet"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Scope note & CTAs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Scope Note
                  </label>
                  <input
                    type="text"
                    value={editingService.scopeNote || ""}
                    onChange={(e) =>
                      setEditingService({ ...editingService, scopeNote: e.target.value })
                    }
                    placeholder="Customized to sprint..."
                    className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#D9F99D] text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                    CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={editingService.ctaText || ""}
                    onChange={(e) =>
                      setEditingService({ ...editingService, ctaText: e.target.value })
                    }
                    placeholder="Discuss This Service"
                    className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#D9F99D] text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                    CTA URL
                  </label>
                  <input
                    type="text"
                    value={editingService.ctaUrl || ""}
                    onChange={(e) =>
                      setEditingService({ ...editingService, ctaUrl: e.target.value })
                    }
                    placeholder="#contact"
                    className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#D9F99D] font-mono text-xs"
                  />
                </div>
              </div>

              {/* Published checkbox */}
              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-neutral-700">
                  <input
                    type="checkbox"
                    checked={editingService.isPublished !== false}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        isPublished: e.target.checked,
                      })
                    }
                    className="rounded text-neutral-900 focus:ring-[#D9F99D] w-4 h-4"
                  />
                  <span>Published on Website</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold transition-all shadow-xs"
                >
                  <Save className="w-3.5 h-3.5 text-[#D9F99D]" />
                  <span>Save Service</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
