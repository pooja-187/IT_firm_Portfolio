import { Router, Request, Response } from "express";
import { portfolioService } from "../services/portfolio.service.js";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ success: true, data: portfolioService.getAbout() });
});

router.put("/", (req: Request, res: Response) => {
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ success: false, message: "Expected array of about cards." });
  }
  const updated = portfolioService.updateAbout(req.body);
  res.json({ success: true, data: updated });
});

export default router;
