import { Router, Request, Response } from "express";
import { portfolioService } from "../services/portfolio.service.js";

const router = Router();

// GET /api/services
router.get("/", (req: Request, res: Response) => {
  const services = portfolioService.getServices();
  res.json({ success: true, data: services });
});

// POST /api/services
router.post("/", (req: Request, res: Response) => {
  const { name, category, selectorLabel } = req.body;
  if (!name || !category || !selectorLabel) {
    return res.status(400).json({ success: false, message: "Missing required service fields." });
  }
  const created = portfolioService.createService(req.body);
  res.status(201).json({ success: true, data: created });
});

// PUT /api/services/:id
router.put("/:id", (req: Request, res: Response) => {
  const updated = portfolioService.updateService(req.params.id as string, req.body);
  if (!updated) {
    return res.status(404).json({ success: false, message: "Service not found." });
  }
  res.json({ success: true, data: updated });
});

// DELETE /api/services/:id
router.delete("/:id", (req: Request, res: Response) => {
  const success = portfolioService.deleteService(req.params.id as string);
  if (!success) {
    return res.status(404).json({ success: false, message: "Service not found." });
  }
  res.json({ success: true, message: "Service deleted." });
});

export default router;
