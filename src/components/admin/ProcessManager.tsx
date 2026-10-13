"use client";

import React, { useState } from "react";
import { ProcessStepItem } from "@/types/portfolio";
import {
  GitMerge,
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
} from "lucide-react";

interface ProcessManagerProps {
  steps: ProcessStepItem[];
  onSaveStep: (step: ProcessStepItem) => boolean;
  onDeleteStep: (id: string) => boolean;
  onReorderSteps: (orderedIds: string[]) => boolean;
}

export default function ProcessManager({
  steps,
  onSaveStep,
  onDeleteStep,
  onReorderSteps,
}: ProcessManagerProps) {
  const [editingStep, setEditingStep] = useState<ProcessStepItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [toastMsg, setToastMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const showToast = (type: "success" | "error", text: string) => {
    setToastMsg({ type, text });
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleOpenAdd = () => {
    setIsNew(true);
    const nextNum = (steps.length + 1).toString().padStart(2, "0");
    setEditingStep({
      id: "step-" + Date.now(),
      number: nextNum,
      stepNumber: nextNum,
      title: "",
      description: "",
      displayOrder: steps.length + 1,
      isPublished: true,
    });
  };

  const handleOpenEdit = (step: ProcessStepItem) => {
    setIsNew(false);
    setEditingStep({
      ...step,
      stepNumber: step.stepNumber || step.number,
    });
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStep || !editingStep.title.trim()) {
      showToast("error", "Step title is required.");
      return;
    }

    const toSave: ProcessStepItem = {
      ...editingStep,
      number: editingStep.stepNumber || editingStep.number,
    };

    const ok = onSaveStep(toSave);
    if (ok) {
      showToast("success", `Step "${editingStep.title}" saved successfully.`);
      setEditingStep(null);
    } else {
      showToast("error", "Failed to save process step.");
    }
  };

  const handleDelete = (id: string) => {
    const ok = onDeleteStep(id);
    if (ok) {
      showToast("success", "Process step deleted.");
      setDeleteConfirmId(null);
    } else {
      showToast("error", "Failed to delete process step.");
    }
  };

  const handleTogglePublish = (step: ProcessStepItem) => {
    const updated = { ...step, isPublished: !step.isPublished };
    const ok = onSaveStep(updated);
    if (ok) {
      showToast("success", `Step ${updated.isPublished ? "published" : "hidden"}.`);
    }
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= steps.length) return;

    const newOrder = [...steps];
    const [moved] = newOrder.splice(index, 1);
    newOrder.splice(targetIdx, 0, moved);

    const ok = onReorderSteps(newOrder.map((s) => s.id));
    if (ok) {
      showToast("success", "Process steps reordered.");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <GitMerge className="w-5 h-5 text-neutral-800" />
            <h1 className="text-xl font-bold text-neutral-900 tracking-tight">Process Methodology</h1>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Manage your phased delivery process (Discovery, Strategy, Architecture, Execution, Handover).
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold transition-all shadow-xs"
        >
          <Plus className="w-4 h-4 text-[#D9F99D]" />
          <span>Add Step</span>
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

      {/* Steps List */}
      <div className="bg-white border border-neutral-200/80 rounded-2xl overflow-hidden shadow-xs">
        <div className="divide-y divide-neutral-100">
          {steps.length === 0 ? (
            <div className="p-8 text-center text-xs text-neutral-400">
              No process steps configured.
            </div>
          ) : (
            steps.map((step, idx) => (
              <div
                key={step.id}
                className="flex items-center justify-between p-4 hover:bg-neutral-50/70 transition-colors gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center">
                    <button
                      disabled={idx === 0}
                      onClick={() => handleMove(idx, "up")}
                      className="p-1 text-neutral-400 hover:text-neutral-900 disabled:opacity-20"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      disabled={idx === steps.length - 1}
                      onClick={() => handleMove(idx, "down")}
                      className="p-1 text-neutral-400 hover:text-neutral-900 disabled:opacity-20"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="w-9 h-9 rounded-xl bg-neutral-900 text-[#D9F99D] flex items-center justify-center font-mono font-bold text-xs shrink-0">
                    {step.stepNumber || step.number}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-neutral-900">{step.title}</h3>
                    <p className="text-xs text-neutral-500 line-clamp-1 max-w-lg mt-0.5">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => handleTogglePublish(step)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                      step.isPublished !== false
                        ? "bg-[#84CC16]/20 text-[#365314] hover:bg-[#84CC16]/30 font-semibold"
                        : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                    }`}
                  >
                    {step.isPublished !== false ? (
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

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(step)}
                      className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                      title="Edit Step"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(step.id)}
                      className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Step"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-xl border border-neutral-200 animate-in zoom-in-95">
            <h3 className="text-base font-bold text-neutral-900">Delete Process Step</h3>
            <p className="text-xs text-neutral-500">
              Are you sure you want to remove this process step?
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
                Delete Step
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Step Modal */}
      {editingStep && (
        <div className="fixed inset-0 z-50 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-neutral-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="text-base font-bold text-neutral-900">
                {isNew ? "Add Process Step" : `Edit Step ${editingStep.stepNumber || editingStep.number}`}
              </h3>
              <button
                onClick={() => setEditingStep(null)}
                className="text-neutral-400 hover:text-neutral-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Step Number (e.g. 01, 02)
                </label>
                <input
                  type="text"
                  value={editingStep.stepNumber || editingStep.number || ""}
                  onChange={(e) =>
                    setEditingStep({ ...editingStep, stepNumber: e.target.value, number: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Step Title *
                </label>
                <input
                  type="text"
                  value={editingStep.title}
                  onChange={(e) =>
                    setEditingStep({ ...editingStep, title: e.target.value })
                  }
                  placeholder="e.g. Discovery & User Research"
                  required
                  className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Step Description
                </label>
                <textarea
                  rows={3}
                  value={editingStep.description}
                  onChange={(e) =>
                    setEditingStep({ ...editingStep, description: e.target.value })
                  }
                  placeholder="Detailed breakdown of activities..."
                  className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 leading-relaxed"
                />
              </div>

              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-neutral-700">
                  <input
                    type="checkbox"
                    checked={editingStep.isPublished !== false}
                    onChange={(e) =>
                      setEditingStep({
                        ...editingStep,
                        isPublished: e.target.checked,
                      })
                    }
                    className="rounded text-neutral-900 focus:ring-[#D9F99D] w-4 h-4"
                  />
                  <span>Published on Website</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setEditingStep(null)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold transition-all shadow-xs"
                >
                  <Save className="w-3.5 h-3.5 text-[#D9F99D]" />
                  <span>Save Step</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
