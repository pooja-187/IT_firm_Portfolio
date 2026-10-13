"use client";

import { INITIAL_PORTFOLIO_DATA } from "./seedData";
import { PortfolioDataset } from "@/types/portfolio";

export const STORAGE_KEYS = {
  HERO: "portfolio_hero",
  EXPERTISE: "portfolio_expertise",
  PROJECTS: "portfolio_projects",
  CLIENTS: "portfolio_clients",
  SERVICES: "portfolio_services",
  PROCESS: "portfolio_process",
  ABOUT: "portfolio_about",
  VALUES: "portfolio_values",
  TESTIMONIALS: "portfolio_testimonials",
  INSIGHTS: "portfolio_insights",
  FAQ: "portfolio_faq",
  SOCIALS: "portfolio_socials",
  SETTINGS: "portfolio_settings",
  ENQUIRIES: "portfolio_contact_enquiries",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

class StorageService {
  private broadcastChannel: BroadcastChannel | null = null;
  private isClient: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.isClient = true;
      try {
        if ("BroadcastChannel" in window) {
          this.broadcastChannel = new BroadcastChannel("portfolio_content_sync");
        }
      } catch (err) {
        console.warn("BroadcastChannel not available:", err);
      }
    }
  }

  /**
   * Broadcast change event across tabs and to local listeners
   */
  private notifyChange(key: string, data: any) {
    if (!this.isClient) return;

    try {
      // 1. BroadcastChannel (cross-tab real-time sync)
      if (this.broadcastChannel) {
        this.broadcastChannel.postMessage({ key, data, timestamp: Date.now() });
      }

      // 2. Custom DOM event (same-tab immediate sync)
      window.dispatchEvent(
        new CustomEvent("portfolio:content-change", {
          detail: { key, data },
        })
      );
    } catch (e) {
      console.warn("Storage sync notification error:", e);
    }
  }

  /**
   * Safe getter with fallback to initial seed dataset
   */
  public get<T>(key: string, fallback: T): T {
    if (!this.isClient) return fallback;

    try {
      const raw = localStorage.getItem(key);
      if (raw === null || raw === undefined) {
        return fallback;
      }
      return JSON.parse(raw) as T;
    } catch (error) {
      console.error(`Failed to parse localStorage key "${key}":`, error);
      return fallback;
    }
  }

  /**
   * Safe setter with sync broadcasting
   */
  public set<T>(key: string, value: T): boolean {
    if (!this.isClient) return false;

    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
      this.notifyChange(key, value);
      return true;
    } catch (error) {
      console.error(`Failed to set localStorage key "${key}":`, error);
      return false;
    }
  }

  /**
   * Update item via transformer callback
   */
  public update<T>(key: string, updater: (current: T) => T, fallback: T): boolean {
    const current = this.get<T>(key, fallback);
    const updated = updater(current);
    return this.set(key, updated);
  }

  /**
   * Remove a single key
   */
  public remove(key: string): boolean {
    if (!this.isClient) return false;

    try {
      localStorage.removeItem(key);
      this.notifyChange(key, null);
      return true;
    } catch (error) {
      console.error(`Failed to remove key "${key}":`, error);
      return false;
    }
  }

  /**
   * Subscribe to content changes (from admin panel or other tabs)
   */
  public subscribe(callback: (key: string, data: any) => void): () => void {
    if (!this.isClient) return () => {};

    // Same-tab listener
    const handleCustom = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        callback(customEvent.detail.key, customEvent.detail.data);
      }
    };

    // Cross-tab broadcast listener
    const handleBroadcast = (event: MessageEvent) => {
      if (event.data?.key) {
        callback(event.data.key, event.data.data);
      }
    };

    // Standard storage listener for cross-window fallback
    const handleStorage = (e: StorageEvent) => {
      if (e.key) {
        try {
          const parsed = e.newValue ? JSON.parse(e.newValue) : null;
          callback(e.key, parsed);
        } catch {
          // ignore parse errors
        }
      }
    };

    window.addEventListener("portfolio:content-change", handleCustom);
    window.addEventListener("storage", handleStorage);
    if (this.broadcastChannel) {
      this.broadcastChannel.addEventListener("message", handleBroadcast);
    }

    return () => {
      window.removeEventListener("portfolio:content-change", handleCustom);
      window.removeEventListener("storage", handleStorage);
      if (this.broadcastChannel) {
        this.broadcastChannel.removeEventListener("message", handleBroadcast);
      }
    };
  }

  /**
   * Reset all data back to the original seeded dataset with notification
   */
  public resetToInitial(): boolean {
    if (!this.isClient) return false;

    try {
      this.set(STORAGE_KEYS.HERO, INITIAL_PORTFOLIO_DATA.hero);
      this.set(STORAGE_KEYS.EXPERTISE, INITIAL_PORTFOLIO_DATA.expertise);
      this.set(STORAGE_KEYS.PROJECTS, INITIAL_PORTFOLIO_DATA.projects);
      this.set(STORAGE_KEYS.CLIENTS, INITIAL_PORTFOLIO_DATA.clients);
      this.set(STORAGE_KEYS.SERVICES, INITIAL_PORTFOLIO_DATA.services);
      this.set(STORAGE_KEYS.PROCESS, INITIAL_PORTFOLIO_DATA.process);
      this.set(STORAGE_KEYS.ABOUT, INITIAL_PORTFOLIO_DATA.about);
      this.set(STORAGE_KEYS.VALUES, INITIAL_PORTFOLIO_DATA.values);
      this.set(STORAGE_KEYS.TESTIMONIALS, INITIAL_PORTFOLIO_DATA.testimonials);
      this.set(STORAGE_KEYS.INSIGHTS, INITIAL_PORTFOLIO_DATA.insights);
      this.set(STORAGE_KEYS.FAQ, INITIAL_PORTFOLIO_DATA.faq);
      this.set(STORAGE_KEYS.SOCIALS, INITIAL_PORTFOLIO_DATA.socialLinks);
      this.set(STORAGE_KEYS.SETTINGS, INITIAL_PORTFOLIO_DATA.settings);
      this.set(STORAGE_KEYS.ENQUIRIES, INITIAL_PORTFOLIO_DATA.enquiries);

      // Global reset broadcast
      this.notifyChange("ALL", INITIAL_PORTFOLIO_DATA);
      return true;
    } catch (err) {
      console.error("Failed to reset portfolio data:", err);
      return false;
    }
  }

  /**
   * Get entire aggregated dataset
   */
  public getAll(): PortfolioDataset {
    return {
      hero: this.get(STORAGE_KEYS.HERO, INITIAL_PORTFOLIO_DATA.hero),
      expertise: this.get(STORAGE_KEYS.EXPERTISE, INITIAL_PORTFOLIO_DATA.expertise),
      projects: this.get(STORAGE_KEYS.PROJECTS, INITIAL_PORTFOLIO_DATA.projects),
      clients: this.get(STORAGE_KEYS.CLIENTS, INITIAL_PORTFOLIO_DATA.clients),
      services: this.get(STORAGE_KEYS.SERVICES, INITIAL_PORTFOLIO_DATA.services),
      process: this.get(STORAGE_KEYS.PROCESS, INITIAL_PORTFOLIO_DATA.process),
      about: this.get(STORAGE_KEYS.ABOUT, INITIAL_PORTFOLIO_DATA.about),
      values: this.get(STORAGE_KEYS.VALUES, INITIAL_PORTFOLIO_DATA.values),
      testimonials: this.get(STORAGE_KEYS.TESTIMONIALS, INITIAL_PORTFOLIO_DATA.testimonials),
      insights: this.get(STORAGE_KEYS.INSIGHTS, INITIAL_PORTFOLIO_DATA.insights),
      faq: this.get(STORAGE_KEYS.FAQ, INITIAL_PORTFOLIO_DATA.faq),
      socialLinks: this.get(STORAGE_KEYS.SOCIALS, INITIAL_PORTFOLIO_DATA.socialLinks),
      settings: this.get(STORAGE_KEYS.SETTINGS, INITIAL_PORTFOLIO_DATA.settings),
      enquiries: this.get(STORAGE_KEYS.ENQUIRIES, INITIAL_PORTFOLIO_DATA.enquiries),
    };
  }
}

export const storageService = new StorageService();
