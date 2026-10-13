import { Router, Request, Response } from "express";
import { portfolioService } from "../services/portfolio.service.js";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ success: true, data: portfolioService.getProcess() });
});

router.post("/", (req: Request, res: Response) => {
  const created = portfolioService.createProcessStep(req.body);
  res.status(201).json({ success: true, data: created });
});

router.put("/:id", (req: Request, res: Response) => {
  const updated = portfolioService.updateProcessStep(req.params.id as string, req.body);
  if (!updated) {
    return res.status(404).json({ success: false, message: "Process step not found." });
  }
  res.json({ success: true, data: updated });
});

router.delete("/:id", (req: Request, res: Response) => {
  const success = portfolioService.deleteProcessStep(req.params.id as string);
  if (!success) {
    return res.status(404).json({ success: false, message: "Process step not found." });
  }
  res.json({ success: true, message: "Process step deleted." });
});

export default router;
