import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import {
  SEOEntry,
  SITE_ORIGIN,
  DEFAULT_FALLBACK_SEO,
} from "@/types/seo";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "seo-entries.json");

/**
 * Normalize route string:
 * - Trims whitespace
 * - Extracts pathname if an absolute URL belonging to this website is passed
 * - Ensures leading slash
 * - Strips trailing slash unless the route is strictly "/"
 */
export function normalizeRoute(raw: string): string {
  if (!raw) return "/";
  let trimmed = raw.trim();

  // If passed an absolute URL belonging to this site, extract pathname
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    try {
      const parsed = new URL(trimmed);
      trimmed = parsed.pathname;
    } catch {
      // Keep as-is to be flagged by validator
    }
  }

  // Ensure leading slash
  if (!trimmed.startsWith("/")) {
    trimmed = `/${trimmed}`;
  }

  // Strip trailing slash unless root
  if (trimmed.length > 1 && trimmed.endsWith("/")) {
    trimmed = trimmed.replace(/\/+$/, "");
  }

  return trimmed;
}

export class SEOServerService {
  /**
   * Safe read of persistent JSON store
   */
  public static readEntries(): SEOEntry[] {
    try {
      if (fs.existsSync(DATA_FILE_PATH)) {
        const raw = fs.readFileSync(DATA_FILE_PATH, "utf-8");
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (err) {
      console.error("[SEOServerService] Failed to read seo-entries.json:", err);
    }

    // Default fallback seed
    return [
      {
        id: "seo-home",
        ...DEFAULT_FALLBACK_SEO,
        updatedAt: new Date().toISOString(),
      },
    ];
  }

  /**
   * Safe write to persistent JSON store
   */
  public static writeEntries(entries: SEOEntry[]): boolean {
    try {
      const dir = path.dirname(DATA_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(entries, null, 2), "utf-8");
      return true;
    } catch (err) {
      console.error("[SEOServerService] Failed to write seo-entries.json:", err);
      return false;
    }
  }

  /**
   * Retrieve active SEO entry for a route
   */
  public static getEntryForRoute(route: string): SEOEntry | null {
    const normalized = normalizeRoute(route);
    const entries = this.readEntries();
    const match = entries.find(
      (e) => normalizeRoute(e.url) === normalized && e.status === "active"
    );
    return match || null;
  }

  /**
   * Build complete Next.js Metadata object for a route
   */
  public static resolveMetadataForRoute(route: string): Metadata {
    const active = this.getEntryForRoute(route);

    const title = active?.metaTitle?.trim() || DEFAULT_FALLBACK_SEO.metaTitle;
    const description = active?.metaDescription?.trim() || DEFAULT_FALLBACK_SEO.metaDescription;

    // Canonical
    let canonical = active?.canonicalUrl?.trim();
    if (!canonical || (!canonical.startsWith("http://") && !canonical.startsWith("https://"))) {
      const normalized = normalizeRoute(route);
      canonical = normalized === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${normalized}`;
    }

    // Robots indexing
    const shouldIndex = active ? active.robotsIndex : DEFAULT_FALLBACK_SEO.robotsIndex;

    // Social image
    let ogImage = active?.socialImage?.trim() || DEFAULT_FALLBACK_SEO.socialImage;
    if (ogImage && !ogImage.startsWith("http://") && !ogImage.startsWith("https://")) {
      ogImage = ogImage.startsWith("/")
        ? `${SITE_ORIGIN}${ogImage}`
        : `${SITE_ORIGIN}/${ogImage}`;
    }

    const keywords =
      active?.keywords && active.keywords.length > 0
        ? active.keywords
        : DEFAULT_FALLBACK_SEO.keywords;

    const currentUrl =
      normalizeRoute(route) === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${normalizeRoute(route)}`;

    return {
      metadataBase: new URL(SITE_ORIGIN),
      title,
      description,
      keywords,
      alternates: {
        canonical,
      },
      robots: {
        index: shouldIndex,
        follow: true,
        googleBot: {
          index: shouldIndex,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      openGraph: {
        type: "website",
        locale: "en_US",
        url: currentUrl,
        siteName: "Nashim Nazar — Portfolio & Personal Brand",
        title,
        description,
        images: ogImage ? [{ url: ogImage, alt: title }] : [],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ogImage ? [ogImage] : [],
      },
    };
  }

  /**
   * Get valid public routes for sitemap generation
   */
  public static getSitemapEntries(): { url: string; lastModified: Date }[] {
    const entries = this.readEntries();
    const publicEntries = entries.filter((e) => e.status === "active" && e.robotsIndex);

    return publicEntries.map((e) => {
      const norm = normalizeRoute(e.url);
      const loc = norm === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${norm}`;
      return {
        url: loc,
        lastModified: e.updatedAt ? new Date(e.updatedAt) : new Date(),
      };
    });
  }
}
