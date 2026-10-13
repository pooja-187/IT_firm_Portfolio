import { MetadataRoute } from "next";
import { SEOServerService } from "@/services/SEOServerService";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = SEOServerService.getSitemapEntries();

  return entries.map((entry) => ({
    url: entry.url,
    lastModified: entry.lastModified,
    changeFrequency: "weekly" as const,
    priority: entry.url.endsWith("/") ? 1.0 : 0.8,
  }));
}
