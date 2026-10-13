import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";

import contentRoutes from "./routes/content.routes.js";
import projectsRoutes from "./routes/projects.routes.js";
import clientsRoutes from "./routes/clients.routes.js";
import servicesRoutes from "./routes/services.routes.js";
import processRoutes from "./routes/process.routes.js";
import aboutRoutes from "./routes/about.routes.js";
import valuesRoutes from "./routes/values.routes.js";
import testimonialsRoutes from "./routes/testimonials.routes.js";
import insightsRoutes from "./routes/insights.routes.js";
import faqRoutes from "./routes/faq.routes.js";
import settingsRoutes from "./routes/settings.routes.js";
import socialsRoutes from "./routes/socials.routes.js";
import enquiriesRoutes from "./routes/enquiries.routes.js";

export function createApp(): Application {
  const app = express();

  // Middleware
  app.use(cors({ origin: "*" }));
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true }));

  // Root healthcheck
  app.get(["/", "/api/health"], (req: Request, res: Response) => {
    res.json({
      status: "online",
      message: "Nashim Nazar Portfolio REST API",
      version: "1.0.0",
      timestamp: new Date().toISOString(),
    });
  });

  // REST API Routes
  app.use("/api/content", contentRoutes);
  app.use("/api/projects", projectsRoutes);
  app.use("/api/clients", clientsRoutes);
  app.use("/api/services", servicesRoutes);
  app.use("/api/process", processRoutes);
  app.use("/api/about", aboutRoutes);
  app.use("/api/values", valuesRoutes);
  app.use("/api/testimonials", testimonialsRoutes);
  app.use("/api/insights", insightsRoutes);
  app.use("/api/faq", faqRoutes);
  app.use("/api/settings", settingsRoutes);
  app.use("/api/socials", socialsRoutes);
  app.use("/api/enquiries", enquiriesRoutes);

  // Global error handler
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Unhandled API Error:", err);
    res.status(500).json({
      success: false,
      message: err?.message || "Internal server error.",
    });
  });

  return app;
}
