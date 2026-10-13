import { Router, Request, Response } from "express";
import { portfolioService } from "../services/portfolio.service.js";

const router = Router();

// GET /api/enquiries - List all enquiries
router.get("/", (req: Request, res: Response) => {
  res.json({ success: true, data: portfolioService.getEnquiries() });
});

// POST /api/enquiries - Submit lead from public contact form
router.post("/", (req: Request, res: Response) => {
  const { name, email, service, message } = req.body;
  if (!name || !email || !service || !message) {
    return res.status(400).json({ success: false, message: "Missing required enquiry fields." });
  }
  const created = portfolioService.createEnquiry(req.body);
  res.status(201).json({ success: true, data: created, message: "Enquiry submitted successfully." });
});

// PATCH /api/enquiries/:id - Update status and admin notes
router.patch("/:id", (req: Request, res: Response) => {
  const { status, notes } = req.body;
  const updated = portfolioService.updateEnquiryStatus(req.params.id as string, status, notes);
  if (!updated) {
    return res.status(404).json({ success: false, message: "Enquiry not found." });
  }
  res.json({ success: true, data: updated });
});

// DELETE /api/enquiries/:id - Remove enquiry
router.delete("/:id", (req: Request, res: Response) => {
  const success = portfolioService.deleteEnquiry(req.params.id as string);
  if (!success) {
    return res.status(404).json({ success: false, message: "Enquiry not found." });
  }
  res.json({ success: true, message: "Enquiry deleted." });
});

export default router;
