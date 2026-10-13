import { Router, Request, Response } from "express";
import { portfolioService } from "../services/portfolio.service.js";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ success: true, data: portfolioService.getSettings() });
});

router.put("/", (req: Request, res: Response) => {
  const updated = portfolioService.updateSettings(req.body);
  res.json({ success: true, data: updated });
});

export default router;
