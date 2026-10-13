"use client";

import React, { useState } from "react";
import { ProjectItem } from "@/types/portfolio";
import { ImagePickerInput } from "./ImagePickerInput";
import {
  FolderKanban,
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
  Image as ImageIcon,
  Star,
} from "lucide-react";

interface ProjectsManagerProps {
  projects: ProjectItem[];
  onSaveProject: (project: ProjectItem) => boolean;
  onDeleteProject: (id: string) => boolean;
  onReorderProjects: (orderedIds: string[]) => boolean;
}

export default function ProjectsManager({
  projects,
  onSaveProject,
  onDeleteProject,
  onReorderProjects,
}: ProjectsManagerProps) {
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [toastMsg, setToastMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // New gallery image input buffer
  const [newGalleryUrl, setNewGalleryUrl] = useState("");

  const showToast = (type: "success" | "error", text: string) => {
    setToastMsg({ type, text });
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleOpenAdd = () => {
    setIsNew(true);
    const initialSlug = "project-" + Date.now();
    setEditingProject({
      id: "proj-" + Date.now(),
      title: "",
      slug: initialSlug,
      client: "",
      category: "Fintech & Web3",
      year: new Date().getFullYear().toString(),
      shortDescription: "",
      coverImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop",
      projectUrl: "#",
      isFeatured: false,
      isPublished: true,
      displayOrder: projects.length + 1,
      galleryImages: [],
      tags: [],
    });
  };

  const handleOpenEdit = (project: ProjectItem) => {
    setIsNew(false);
    setEditingProject({
      ...project,
      galleryImages: project.galleryImages ? [...project.galleryImages] : [],
      tags: project.tags ? [...project.tags] : [],
    });
  };

  const handleTitleChange = (title: string) => {
    if (!editingProject) return;
    const updates: Partial<ProjectItem> = { title };
    if (isNew) {
      // Auto slugify on title change for new projects
      updates.slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }
    setEditingProject({ ...editingProject, ...updates });
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    if (!editingProject.title.trim()) {
      showToast("error", "Project title is required.");
      return;
    }
    if (!editingProject.slug.trim()) {
      showToast("error", "Project slug is required.");
      return;
    }
    if (!editingProject.coverImage.trim()) {
      showToast("error", "Cover image is required.");
      return;
    }

    const ok = onSaveProject(editingProject);
    if (ok) {
      showToast("success", `Project "${editingProject.title}" saved successfully.`);
      setEditingProject(null);
    } else {
      showToast("error", "Failed to save project.");
    }
  };

  const handleDelete = (id: string) => {
    const ok = onDeleteProject(id);
    if (ok) {
      showToast("success", "Project deleted.");
      setDeleteConfirmId(null);
    } else {
      showToast("error", "Failed to delete project.");
    }
  };

  const handleTogglePublish = (project: ProjectItem) => {
    const updated = { ...project, isPublished: !project.isPublished };
    const ok = onSaveProject(updated);
    if (ok) {
      showToast("success", `Project "${project.title}" ${updated.isPublished ? "published" : "hidden"}.`);
    }
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= projects.length) return;

    const newOrder = [...projects];
    const [moved] = newOrder.splice(index, 1);
    newOrder.splice(targetIdx, 0, moved);

    const ok = onReorderProjects(newOrder.map((p) => p.id));
    if (ok) {
      showToast("success", "Project order updated.");
    }
  };

  // Gallery Helpers
  const handleAddGalleryImage = () => {
    if (!editingProject || !newGalleryUrl.trim()) return;
    const gallery = editingProject.galleryImages ? [...editingProject.galleryImages] : [];
    gallery.push(newGalleryUrl.trim());
    setEditingProject({ ...editingProject, galleryImages: gallery });
    setNewGalleryUrl("");
  };

  const handleRemoveGalleryImage = (idx: number) => {
    if (!editingProject || !editingProject.galleryImages) return;
    const gallery = [...editingProject.galleryImages];
    gallery.splice(idx, 1);
    setEditingProject({ ...editingProject, galleryImages: gallery });
  };

  const handleMoveGalleryImage = (idx: number, direction: "left" | "right") => {
    if (!editingProject || !editingProject.galleryImages) return;
    const targetIdx = direction === "left" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= editingProject.galleryImages.length) return;
    const gallery = [...editingProject.galleryImages];
    const [moved] = gallery.splice(idx, 1);
    gallery.splice(targetIdx, 0, moved);
    setEditingProject({ ...editingProject, galleryImages: gallery });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-neutral-800" />
            <h1 className="text-xl font-bold text-neutral-900 tracking-tight">Selected Work (Projects)</h1>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Manage projects displayed in the 3D rotating carousel and Selected Work portfolio showcases.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold transition-all shadow-xs"
        >
          <Plus className="w-4 h-4 text-[#D9F99D]" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Feedback Toast */}
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

      {/* Projects Table */}
      <div className="bg-white border border-neutral-200/80 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/75 text-neutral-500 uppercase font-semibold text-[10px] tracking-wider">
                <th className="py-3 px-4 w-12 text-center">Order</th>
                <th className="py-3 px-4">Project</th>
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-center">Year</th>
                <th className="py-3 px-4 text-center">Featured</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-neutral-400">
                    No projects found. Click &quot;Add Project&quot; to create one.
                  </td>
                </tr>
              ) : (
                projects.map((project, idx) => (
                  <tr key={project.id} className="hover:bg-neutral-50/60 transition-colors">
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
                          disabled={idx === projects.length - 1}
                          onClick={() => handleMove(idx, "down")}
                          className="p-1 text-neutral-400 hover:text-neutral-900 disabled:opacity-20"
                          title="Move down"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                    {/* Project Title + Thumbnail */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={project.coverImage}
                            alt=""
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-neutral-900 text-sm truncate">{project.title}</p>
                          <p className="text-[11px] text-neutral-400 font-mono truncate">{project.slug}</p>
                        </div>
                      </div>
                    </td>

                    {/* Client */}
                    <td className="py-3 px-4 text-neutral-700 font-medium whitespace-nowrap">
                      {project.client || "—"}
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4 text-neutral-500 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 text-[10px] font-medium">
                        {project.category}
                      </span>
                    </td>

                    {/* Year */}
                    <td className="py-3 px-4 text-center text-neutral-500 font-mono text-xs">
                      {project.year}
                    </td>

                    {/* Featured */}
                    <td className="py-3 px-4 text-center">
                      {project.isFeatured ? (
                        <span className="inline-flex items-center gap-1 text-amber-600 font-semibold text-[11px]">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          Yes
                        </span>
                      ) : (
                        <span className="text-neutral-300">—</span>
                      )}
                    </td>

                    {/* Published Status Toggle */}
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleTogglePublish(project)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                          project.isPublished !== false
                            ? "bg-[#84CC16]/20 text-[#365314] hover:bg-[#84CC16]/30 font-semibold"
                            : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                        }`}
                      >
                        {project.isPublished !== false ? (
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
                          onClick={() => handleOpenEdit(project)}
                          className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                          title="Edit Project"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(project.id)}
                          className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Project"
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
            <h3 className="text-base font-bold text-neutral-900">Delete Project</h3>
            <p className="text-xs text-neutral-500">
              Are you sure you want to delete this project? It will be removed from your Selected Work portfolio.
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
                Delete Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Project Full Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-neutral-950/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 my-8 space-y-5 shadow-2xl border border-neutral-200 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 sticky top-0 bg-white z-10">
              <h3 className="text-base font-bold text-neutral-900">
                {isNew ? "Add New Project" : `Edit Project: ${editingProject.title}`}
              </h3>
              <button
                onClick={() => setEditingProject(null)}
                className="text-neutral-400 hover:text-neutral-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={editingProject.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Fintech Mobile Banking App"
                    required
                    className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#D9F99D] focus:border-neutral-900 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    value={editingProject.slug}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, slug: e.target.value })
                    }
                    placeholder="fintech-mobile-banking"
                    required
                    className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#D9F99D] focus:border-neutral-900 font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={editingProject.client}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, client: e.target.value })
                    }
                    placeholder="e.g. Apex Financial"
                    className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#D9F99D] focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Category
                  </label>
                  <input
                    type="text"
                    value={editingProject.category}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, category: e.target.value })
                    }
                    placeholder="e.g. Fintech & Web3"
                    className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#D9F99D] focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Release Year
                  </label>
                  <input
                    type="text"
                    value={editingProject.year}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, year: e.target.value })
                    }
                    placeholder="2025"
                    className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#D9F99D] focus:border-neutral-900 font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                    External / Case Study URL
                  </label>
                  <input
                    type="text"
                    value={editingProject.projectUrl}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, projectUrl: e.target.value })
                    }
                    placeholder="https://..."
                    className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#D9F99D] focus:border-neutral-900 font-mono text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Short Description
                </label>
                <textarea
                  rows={3}
                  value={editingProject.shortDescription}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      shortDescription: e.target.value,
                    })
                  }
                  placeholder="Overview of scope, impact, and deliverables..."
                  className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#D9F99D] focus:border-neutral-900"
                />
              </div>

              {/* Cover Image */}
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/80">
                <ImagePickerInput
                  label="Cover Image *"
                  value={editingProject.coverImage}
                  onChange={(val) =>
                    setEditingProject({ ...editingProject, coverImage: val })
                  }
                  description="Primary thumbnail displayed in 3D carousel and card showcases."
                />
              </div>

              {/* Project Gallery */}
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800">
                    Project Gallery Images ({editingProject.galleryImages?.length || 0})
                  </label>
                </div>
                <p className="text-xs text-neutral-500">
                  Add additional product mockups, screens, or architecture diagrams for this project.
                </p>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newGalleryUrl}
                    onChange={(e) => setNewGalleryUrl(e.target.value)}
                    placeholder="Paste image URL..."
                    className="flex-1 px-3 py-2 text-xs border border-neutral-200 rounded-lg bg-white text-neutral-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#D9F99D]"
                  />
                  <button
                    type="button"
                    onClick={handleAddGalleryImage}
                    className="px-3 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    Add Image
                  </button>
                </div>

                {editingProject.galleryImages && editingProject.galleryImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-2.5 pt-2">
                    {editingProject.galleryImages.map((img, gIdx) => (
                      <div
                        key={gIdx}
                        className="relative group rounded-lg border border-neutral-200 overflow-hidden bg-white shadow-xs aspect-video"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-neutral-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                          {gIdx > 0 && (
                            <button
                              type="button"
                              onClick={() => handleMoveGalleryImage(gIdx, "left")}
                              className="p-1 bg-white/90 text-neutral-900 rounded hover:bg-white text-xs font-bold"
                              title="Move left"
                            >
                              ←
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveGalleryImage(gIdx)}
                            className="p-1 bg-red-600 text-white rounded hover:bg-red-700"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          {gIdx < (editingProject.galleryImages?.length || 0) - 1 && (
                            <button
                              type="button"
                              onClick={() => handleMoveGalleryImage(gIdx, "right")}
                              className="p-1 bg-white/90 text-neutral-900 rounded hover:bg-white text-xs font-bold"
                              title="Move right"
                            >
                              →
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-neutral-700">
                  <input
                    type="checkbox"
                    checked={editingProject.isPublished !== false}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        isPublished: e.target.checked,
                      })
                    }
                    className="rounded text-neutral-900 focus:ring-[#D9F99D] w-4 h-4"
                  />
                  <span>Published on Website</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-neutral-700">
                  <input
                    type="checkbox"
                    checked={editingProject.isFeatured || false}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        isFeatured: e.target.checked,
                      })
                    }
                    className="rounded text-neutral-900 focus:ring-[#D9F99D] w-4 h-4"
                  />
                  <span>Featured in Carousel</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold transition-all shadow-xs"
                >
                  <Save className="w-3.5 h-3.5 text-[#D9F99D]" />
                  <span>Save Project</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
