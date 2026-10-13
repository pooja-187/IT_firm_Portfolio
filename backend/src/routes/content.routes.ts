import { Router, Request, Response } from "express";
import { portfolioService } from "../services/portfolio.service.js";

const router = Router();

// GET /api/content - Bootstrap entire dataset
router.get("/", (req: Request, res: Response) => {
  res.json({ success: true, data: portfolioService.getBootstrap() });
});

// POST /api/content/reset - Restore initial seeded content
router.post("/reset", (req: Request, res: Response) => {
  portfolioService.resetAll();
  res.json({ success: true, message: "Dataset reset to seeded defaults.", data: portfolioService.getBootstrap() });
});

// GET /api/content/hero
router.get("/hero", (req: Request, res: Response) => {
  res.json({ success: true, data: portfolioService.getHero() });
});

// PUT /api/content/hero
router.put("/hero", (req: Request, res: Response) => {
  const updated = portfolioService.updateHero(req.body);
  res.json({ success: true, data: updated });
});

// GET /api/content/expertise
router.get("/expertise", (req: Request, res: Response) => {
  res.json({ success: true, data: portfolioService.getExpertise() });
});

// PUT /api/content/expertise
router.put("/expertise", (req: Request, res: Response) => {
  const updated = portfolioService.updateExpertise(req.body);
  res.json({ success: true, data: updated });
});

export default router;
