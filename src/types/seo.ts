// ── NEW SEO MODULE TYPES ───────────────────────────────────────────────────

export type SEOStatus = "active" | "inactive";

export interface SEOEntry {
  id: string;
  pageName: string;
  url: string; // Normalized route, e.g. "/" or "/insights"
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string; // Absolute URL, e.g. "https://nashimnazar.in/"
  socialImage: string; // Absolute or public relative path, e.g. "https://..."
  keywords: string[];
  robotsIndex: boolean; // true = index, false = noindex
  status: SEOStatus; // active = applies to route, inactive = uses default fallback
  updatedAt: string; // ISO date string
}

export interface SEOValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  warnings: Record<string, string>;
}

export const SITE_ORIGIN = "https://nashimnazar.in";

export const DEFAULT_FALLBACK_SEO: Omit<SEOEntry, "id" | "updatedAt"> = {
  pageName: "Default Safe Fallback",
  url: "/",
  metaTitle: "Nashim Nazar — Best UI UX Designer in Kottayam, Kerala | CEO & Founder, Manzio",
  metaDescription:
    "Nashim Nazar is the Best UI UX Designer in Kottayam, Kerala and CEO & Founder of Manzio Creative Studio. Turning complex business ideas into intuitive websites and digital products through UI/UX design and performance marketing.",
  canonicalUrl: "https://nashimnazar.in/",
  socialImage: "https://nashimnazar.in/images/projects/ChatGPT%20Image%20Sep%2028,%202026,%2003_14_07%20PM.png",
  keywords: [
    "Best UI UX Designer in Kottayam",
    "UI UX Designer Kerala",
    "Nashim Nazar",
    "Manzio Creative Studio",
    "Product Designer Kerala",
    "Performance Marketing Kerala",
  ],
  robotsIndex: true,
  status: "active",
};
