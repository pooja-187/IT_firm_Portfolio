"use client";

import {
  SEOEntry,
  SEOValidationResult,
  SITE_ORIGIN,
  DEFAULT_FALLBACK_SEO,
} from "@/types/seo";

const SEO_STORAGE_KEY = "portfolio_seo_v2";

export function normalizeRoute(raw: string): string {
  if (!raw) return "/";
  let trimmed = raw.trim();

  // If passed an absolute URL belonging to this site, extract pathname
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    try {
      const parsed = new URL(trimmed);
      if (
        parsed.origin === SITE_ORIGIN ||
        parsed.hostname === "localhost" ||
        parsed.hostname.includes("nashimnazar")
      ) {
        trimmed = parsed.pathname;
      }
    } catch {
      // Keep as-is to be caught by validation
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

export function validateSEOEntry(
  entry: Partial<SEOEntry>,
  existingEntries: SEOEntry[] = []
): SEOValidationResult {
  const errors: Record<string, string> = {};
  const warnings: Record<string, string> = {};

  // 1. Page Name
  if (!entry.pageName || !entry.pageName.trim()) {
    errors.pageName = "Page Name is required.";
  }

  // 2. URL
  if (!entry.url || !entry.url.trim()) {
    errors.url = "URL is required.";
  } else {
    const rawUrl = entry.url.trim();

    // Check if user entered an external URL that doesn't belong to this website
    if (
      (rawUrl.startsWith("http://") || rawUrl.startsWith("https://")) &&
      !rawUrl.includes("nashimnazar.in") &&
      !rawUrl.includes("localhost")
    ) {
      errors.url = "URL must belong to this website (e.g. '/' or '/insights').";
    } else {
      const normalized = normalizeRoute(rawUrl);

      // Check duplicate URL
      const duplicate = existingEntries.find(
        (e) => e.id !== entry.id && normalizeRoute(e.url) === normalized
      );
      if (duplicate) {
        errors.url = `An SEO entry already exists for the route "${normalized}" (${duplicate.pageName}).`;
      }
    }
  }

  // 3. Meta Title (Required if active)
  const isEntryActive = entry.status === "active";
  const title = (entry.metaTitle || "").trim();

  if (isEntryActive && !title) {
    errors.metaTitle = "Meta Title is required for an active entry.";
  } else if (title) {
    if (title.length > 60) {
      warnings.metaTitle = `Title is ${title.length} characters (recommended: 50–60 chars). It may be truncated in search results.`;
    } else if (title.length < 30) {
      warnings.metaTitle = `Title is quite short (${title.length} chars). Consider using 50–60 characters.`;
    }
  }

  // 4. Meta Description (Required if active)
  const description = (entry.metaDescription || "").trim();

  if (isEntryActive && !description) {
    errors.metaDescription = "Meta Description is required for an active entry.";
  } else if (description) {
    if (description.length > 160) {
      warnings.metaDescription = `Description is ${description.length} characters (recommended: 150–160 chars). Search engines may clip it.`;
    } else if (description.length < 70) {
      warnings.metaDescription = `Description is quite short (${description.length} chars). Recommended range is 150–160 characters.`;
    }
  }

  // 5. Canonical URL
  const canonical = (entry.canonicalUrl || "").trim();
  if (canonical) {
    if (!canonical.startsWith("http://") && !canonical.startsWith("https://")) {
      errors.canonicalUrl = "Canonical URL must be a valid absolute URL (starting with https://).";
    } else {
      try {
        new URL(canonical);
      } catch {
        errors.canonicalUrl = "Canonical URL is not a well-formed absolute URL.";
      }
    }
  }

  // 6. Social Image
  const img = (entry.socialImage || "").trim();
  if (img) {
    if (img.startsWith("blob:") || img.startsWith("data:")) {
      errors.socialImage = "Temporary local preview URLs cannot be used as production social images.";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    warnings,
  };
}

class SEOService {
  private broadcastChannel: BroadcastChannel | null = null;
  private isClient = false;
  private entries: SEOEntry[] = [];

  constructor() {
    if (typeof window !== "undefined") {
      this.isClient = true;
      try {
        if ("BroadcastChannel" in window) {
          this.broadcastChannel = new BroadcastChannel("portfolio_seo_sync");
        }
      } catch (err) {
        console.warn("BroadcastChannel not available:", err);
      }
      this.initClientData();
    }
  }

  private initClientData() {
    // 1. Load from localStorage first (instant)
    const cached = this.getFromLocalStorage();
    if (cached && cached.length > 0) {
      this.entries = cached;
    } else {
      this.entries = [
        {
          id: "seo-home",
          ...DEFAULT_FALLBACK_SEO,
          updatedAt: new Date().toISOString(),
        },
      ];
      this.saveToLocalStorage(this.entries);
    }

    // 2. Hydrate from server API in background
    this.fetchFromServer().catch((err) => {
      console.warn("Background SEO fetch from /api/seo failed:", err);
    });
  }

  private getFromLocalStorage(): SEOEntry[] | null {
    if (!this.isClient) return null;
    try {
      const raw = localStorage.getItem(SEO_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error("Failed to read SEO from localStorage:", e);
    }
    return null;
  }

  private saveToLocalStorage(entries: SEOEntry[]): void {
    if (!this.isClient) return;
    try {
      localStorage.setItem(SEO_STORAGE_KEY, JSON.stringify(entries));
    } catch (e) {
      console.error("Failed to save SEO to localStorage:", e);
    }
  }

  private notify(entries: SEOEntry[]) {
    if (!this.isClient) return;
    try {
      if (this.broadcastChannel) {
        this.broadcastChannel.postMessage({ entries, timestamp: Date.now() });
      }
      window.dispatchEvent(
        new CustomEvent("portfolio:seo-change", { detail: { entries } })
      );
    } catch (e) {
      console.warn("SEO notify error:", e);
    }
  }

  public async fetchFromServer(): Promise<SEOEntry[]> {
    if (!this.isClient) return this.entries;
    try {
      const res = await fetch("/api/seo", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          this.entries = json.data;
          this.saveToLocalStorage(json.data);
          this.notify(json.data);
          return json.data;
        }
      }
    } catch (err) {
      console.warn("Could not fetch SEO from server API:", err);
    }
    return this.entries;
  }

  private async persistToServer(entries: SEOEntry[]): Promise<boolean> {
    try {
      const res = await fetch("/api/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entries }),
      });
      return res.ok;
    } catch (err) {
      console.error("Failed to persist SEO to server:", err);
      return false;
    }
  }

  public getEntries(): SEOEntry[] {
    if (this.entries.length === 0 && this.isClient) {
      const cached = this.getFromLocalStorage();
      if (cached) this.entries = cached;
    }
    return this.entries;
  }

  public getEntryByRoute(route: string): SEOEntry | undefined {
    const normalized = normalizeRoute(route);
    return this.getEntries().find((e) => normalizeRoute(e.url) === normalized);
  }

  public async saveEntry(entry: SEOEntry): Promise<boolean> {
    const current = [...this.getEntries()];
    const normalizedUrl = normalizeRoute(entry.url);
    const updatedEntry: SEOEntry = {
      ...entry,
      url: normalizedUrl,
      metaTitle: entry.metaTitle?.trim() || "",
      metaDescription: entry.metaDescription?.trim() || "",
      updatedAt: new Date().toISOString(),
    };

    const index = current.findIndex((e) => e.id === entry.id);
    if (index >= 0) {
      current[index] = updatedEntry;
    } else {
      current.push(updatedEntry);
    }

    this.entries = current;
    this.saveToLocalStorage(current);
    this.notify(current);

    // Save to server
    await this.persistToServer(current);
    return true;
  }

  public async deleteEntry(id: string): Promise<boolean> {
    const current = this.getEntries().filter((e) => e.id !== id);
    this.entries = current;
    this.saveToLocalStorage(current);
    this.notify(current);

    await this.persistToServer(current);
    return true;
  }

  public async toggleStatus(id: string): Promise<boolean> {
    const current = [...this.getEntries()];
    const entry = current.find((e) => e.id === id);
    if (!entry) return false;

    entry.status = entry.status === "active" ? "inactive" : "active";
    entry.updatedAt = new Date().toISOString();

    this.entries = current;
    this.saveToLocalStorage(current);
    this.notify(current);

    await this.persistToServer(current);
    return true;
  }

  public async resetToInitial(): Promise<boolean> {
    const initial: SEOEntry[] = [
      {
        id: "seo-home",
        ...DEFAULT_FALLBACK_SEO,
        updatedAt: new Date().toISOString(),
      },
    ];

    this.entries = initial;
    this.saveToLocalStorage(initial);
    this.notify(initial);

    await this.persistToServer(initial);
    return true;
  }

  public subscribe(callback: (entries: SEOEntry[]) => void): () => void {
    if (!this.isClient) return () => {};

    const handleCustom = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.entries) {
        callback(customEvent.detail.entries);
      }
    };

    const handleBroadcast = (event: MessageEvent) => {
      if (event.data?.entries) {
        callback(event.data.entries);
      }
    };

    window.addEventListener("portfolio:seo-change", handleCustom);
    if (this.broadcastChannel) {
      this.broadcastChannel.addEventListener("message", handleBroadcast);
    }

    return () => {
      window.removeEventListener("portfolio:seo-change", handleCustom);
      if (this.broadcastChannel) {
        this.broadcastChannel.removeEventListener("message", handleBroadcast);
      }
    };
  }
}

export const seoService = new SEOService();
