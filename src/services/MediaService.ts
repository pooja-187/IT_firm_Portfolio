"use client";

/**
 * Media Service Abstraction (Phase 1: Local / Base64 / Preset References)
 * Structured with interfaces ready for Cloudflare R2 / AWS S3 in Phase 2.
 */

export interface MediaUploadResult {
  url: string;
  filename: string;
  sizeBytes?: number;
  mimeType?: string;
}

export class MediaService {
  /**
   * Available preset assets from the existing Nashim Nazar portfolio
   */
  public static readonly PRESET_ASSETS = [
    {
      category: "Projects",
      items: [
        { label: "Fintech Mobile Banking App", url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop" },
        { label: "SaaS Analytics & Operations Dashboard", url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop" },
        { label: "Aura AI Content Platform", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop" },
        { label: "Luxe E-Commerce Architecture", url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop" },
        { label: "HealthTech Telemedicine System", url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop" },
        { label: "DevScale Design System & UI Kit", url: "https://images.unsplash.com/photo-1581291518655-9523c9320984?q=80&w=1200&auto=format&fit=crop" },
        { label: "NextGen Logistics & Fleet Tracking", url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop" },
        { label: "Web3 NFT Marketplace & Smart Wallet", url: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop" },
      ],
    },
    {
      category: "Portraits & Avatars",
      items: [
        { label: "Nashim Nazar Portrait", url: "/hero/portrait.png" },
        { label: "Avatar 1 (Male Tech)", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" },
        { label: "Avatar 2 (Female Exec)", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" },
        { label: "Avatar 3 (Male Founder)", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" },
        { label: "Avatar 4 (Female Product)", url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" },
      ],
    },
    {
      category: "Services & Covers",
      items: [
        { label: "UI/UX & Product Design", url: "https://images.unsplash.com/photo-1581291518655-9523c9320984?q=80&w=800&auto=format&fit=crop" },
        { label: "Web & Mobile Development", url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop" },
        { label: "Brand Identity & Design Systems", url: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=800&auto=format&fit=crop" },
        { label: "Digital Growth & Product Strategy", url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop" },
        { label: "Custom Software & Enterprise Solutions", url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop" },
      ],
    },
  ];

  /**
   * Read file as data URL (Base64) for Phase 1 local development
   */
  public static async processUploadedFile(file: File): Promise<MediaUploadResult> {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith("image/")) {
        return reject(new Error("File must be an image format (JPEG, PNG, WebP, SVG)."));
      }

      // 5MB limit for local preview
      if (file.size > 5 * 1024 * 1024) {
        return reject(new Error("Image size must be smaller than 5MB."));
      }

      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          url: reader.result as string,
          filename: file.name,
          sizeBytes: file.size,
          mimeType: file.type,
        });
      };
      reader.onerror = () => {
        reject(new Error("Failed to read image file."));
      };
      reader.readAsDataURL(file);
    });
  }

  /**
   * Future Cloudflare R2 / AWS S3 Integration hook
   */
  public static async uploadToCloud(file: File): Promise<MediaUploadResult> {
    // In Phase 2, this will send a multipart/form-data POST to /api/media/upload
    // or request a presigned S3/R2 PUT URL.
    return this.processUploadedFile(file);
  }
}
