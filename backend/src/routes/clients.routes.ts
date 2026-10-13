import { Router, Request, Response } from "express";
import { portfolioService } from "../services/portfolio.service.js";

const router = Router();

// GET /api/clients
router.get("/", (req: Request, res: Response) => {
  const clients = portfolioService.getClients();
  res.json({ success: true, data: clients });
});

// POST /api/clients
router.post("/", (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ success: false, message: "Client name is required." });
  }
  const created = portfolioService.createClient(req.body);
  res.status(201).json({ success: true, data: created });
});

// PUT /api/clients/reorder
router.put("/reorder", (req: Request, res: Response) => {
  const { orderedIds } = req.body;
  if (!Array.isArray(orderedIds)) {
    return res.status(400).json({ success: false, message: "orderedIds must be an array of IDs." });
  }
  const reordered = portfolioService.reorderClients(orderedIds);
  res.json({ success: true, data: reordered });
});

// PUT /api/clients/:id
router.put("/:id", (req: Request, res: Response) => {
  const updated = portfolioService.updateClient(req.params.id as string, req.body);
  if (!updated) {
    return res.status(404).json({ success: false, message: "Client not found." });
  }
  res.json({ success: true, data: updated });
});

// DELETE /api/clients/:id
router.delete("/:id", (req: Request, res: Response) => {
  const success = portfolioService.deleteClient(req.params.id as string);
  if (!success) {
    return res.status(404).json({ success: false, message: "Client not found." });
  }
  res.json({ success: true, message: "Client deleted." });
});

export default router;
