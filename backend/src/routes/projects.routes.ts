import { Router, Request, Response } from "express";
import { portfolioService } from "../services/portfolio.service.js";

const router = Router();

// GET /api/projects
router.get("/", (req: Request, res: Response) => {
  const projects = portfolioService.getProjects();
  res.json({ success: true, data: projects });
});

// GET /api/projects/:id
router.get("/:id", (req: Request, res: Response) => {
  const project = portfolioService.getProjectById(req.params.id as string);
  if (!project) {
    return res.status(404).json({ success: false, message: "Project not found." });
  }
  res.json({ success: true, data: project });
});

// POST /api/projects
router.post("/", (req: Request, res: Response) => {
  const { title, slug, category, coverImage } = req.body;
  if (!title || !slug || !category || !coverImage) {
    return res.status(400).json({ success: false, message: "Missing required project fields." });
  }
  const created = portfolioService.createProject(req.body);
  res.status(201).json({ success: true, data: created });
});

// PUT /api/projects/reorder
router.put("/reorder", (req: Request, res: Response) => {
  const { orderedIds } = req.body;
  if (!Array.isArray(orderedIds)) {
    return res.status(400).json({ success: false, message: "orderedIds must be an array of IDs." });
  }
  const reordered = portfolioService.reorderProjects(orderedIds);
  res.json({ success: true, data: reordered });
});

// PUT /api/projects/:id
router.put("/:id", (req: Request, res: Response) => {
  const updated = portfolioService.updateProject(req.params.id as string, req.body);
  if (!updated) {
    return res.status(404).json({ success: false, message: "Project not found." });
  }
  res.json({ success: true, data: updated });
});

// DELETE /api/projects/:id
router.delete("/:id", (req: Request, res: Response) => {
  const success = portfolioService.deleteProject(req.params.id as string);
  if (!success) {
    return res.status(404).json({ success: false, message: "Project not found." });
  }
  res.json({ success: true, message: "Project deleted." });
});

export default router;
