"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { EditorialGridLines } from "@/components/ui/EditorialGrid";

export interface ClientItem {
  name: string;
  href?: string;
  isFeatured?: boolean;
  category?: string;
}

export const CLIENTS_DATA: ClientItem[] = [
  {
    name: "TRAVINNO",
    href: "#selected-work",
    isFeatured: true,
    category: "AI Travel Platform",
  },
  {
    name: "MANGALAM TRAVEL AND TOURS",
    category: "Travel & Hospitality",
  },
  {
    name: "MANGALAM HOLIDAYS",
    category: "Holiday Experiences",
  },
  {
    name: "OPEN VISAS",
    category: "Visa & Immigration",
  },
  {
    name: "LAUNDREMAISON",
    category: "Premium Care",
  },
  {
    name: "HOTEL PASSION",
    category: "Boutique Hospitality",
  },
  {
    name: "OPEN NURSES",
    category: "Healthcare Staffing",
  },
  {
    name: "FAZO",
    href: "#selected-work",
    isFeatured: false,
    category: "Logistics & Delivery",
  },
  {
    name: "FORTUNE DENTALS",
    category: "Dental Healthcare",
  },
  {
    name: "UKNOWTRIP",
    category: "Travel Discovery",
  },
  {
    name: "HACK THE SKILL",
    category: "EdTech Platform",
  },
  {
    name: "EUCALIA GLAMPS",
    category: "Luxury Glamping",
  },
];

import { contentService } from "@/services/ContentService";
import { STORAGE_KEYS } from "@/services/StorageService";

export default function ClientsSection() {
  const [clients, setClients] = React.useState<ClientItem[]>(CLIENTS_DATA);

  React.useEffect(() => {
    const loadClients = () => {
      const managed = contentService.getClients(true);
      if (managed && managed.length > 0) {
        setClients(
          managed.map((c) => ({
            name: c.name,
            href: (c.link && c.link !== "#") ? c.link : ((c.href && c.href !== "#") ? c.href : undefined),
            isFeatured: c.isFeatured,
            category: c.category,
          }))
        );
      } else if (managed) {
        setClients([]);
      }
    };

    loadClients();

    const unsubscribe = contentService.subscribe((key) => {
      if (key === STORAGE_KEYS.CLIENTS || key === "ALL") {
        loadClients();
      }
    });

    return () => unsubscribe();
  }, []);

  const leftClients = clients.filter((_, idx) => idx % 2 === 0);
  const rightClients = clients.filter((_, idx) => idx % 2 === 1);

  const renderCard = (client: ClientItem, isDuplicate = false, key?: string) => {
    const cardClassName = cn(
      "group relative flex flex-col items-center justify-center text-center",
      "w-full h-full min-h-[115px] xs:min-h-[125px] sm:min-h-[135px] lg:min-h-[145px] xl:min-h-[150px]",
      "p-4 sm:p-5 lg:p-6 rounded-[20px] sm:rounded-[22px]",
      "border transition-all duration-300 ease-out select-none",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#84CC16] focus-visible:ring-offset-2",
      client.isFeatured
        ? "bg-white/95 border-[#84CC16]/40 shadow-[0_2px_14px_rgba(132,204,22,0.08)] hover:border-[#84CC16]/60 hover:bg-[#84CC16]/[0.035] hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(132,204,22,0.12)]"
        : "bg-white/90 hover:bg-white border-black/[0.08] hover:border-[#84CC16]/45 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.04)]",
      client.href ? "cursor-pointer" : "cursor-default"
    );

    const cardInner = (
      <>
        {/* Featured Subtle Indicator Dot */}
        {client.isFeatured && (
          <span
            aria-label="Featured client"
            title="Featured client"
            className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 flex items-center justify-center"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16] ring-4 ring-[#84CC16]/15" />
          </span>
        )}

        {/* Optional tiny link arrow (Only for cards with destinations) */}
        {client.href && !client.isFeatured && (
          <span
            aria-hidden="true"
            className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 text-[#65a30d] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
          >
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.2]" />
          </span>
        )}

        {/* Client Name Typography */}
        <span className="font-sans font-semibold text-[12.5px] xs:text-[13px] sm:text-[13.5px] lg:text-[14px] xl:text-[14.5px] tracking-[0.14em] uppercase text-[#111111] group-hover:text-black leading-snug max-w-[210px] transition-colors duration-200">
          {client.name}
        </span>
      </>
    );

    if (client.href) {
      return (
        <Link
          key={key}
          href={client.href}
          tabIndex={isDuplicate ? -1 : 0}
          aria-hidden={isDuplicate}
          aria-label={`View ${client.name} in Selected Work`}
          className={cardClassName}
        >
          {cardInner}
        </Link>
      );
    }

    return (
      <div
        key={key}
        role="article"
        tabIndex={isDuplicate ? -1 : 0}
        aria-hidden={isDuplicate}
        aria-label={client.name}
        className={cardClassName}
      >
        {cardInner}
      </div>
    );
  };

  return (
    <section
      id="clients"
      aria-labelledby="clients-heading"
      className="relative w-full bg-[#FCFDF9] text-[#111111] pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-24 lg:pb-28 overflow-hidden selection:bg-lime-200 scroll-mt-24 sm:scroll-mt-28"
    >
      {/* ===================================================
          MOBILE CONTINUOUS OPPOSITE-STREAM KEYFRAMES (< 768px)
          - Left column: continuously moves UP (0 -> -50%)
          - Right column: continuously moves DOWN (-50% -> 0)
          - Speed: 22s linear infinite
          - Reduced motion: static layout with no continuous movement
         =================================================== */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (max-width: 767px) {
              @keyframes clientStreamUp {
                0% {
                  transform: translate3d(0, 0, 0);
                }
                100% {
                  transform: translate3d(0, -50%, 0);
                }
              }

              @keyframes clientStreamDown {
                0% {
                  transform: translate3d(0, -50%, 0);
                }
                100% {
                  transform: translate3d(0, 0, 0);
                }
              }

              .client-stream-up {
                animation: clientStreamUp 22s linear infinite;
                will-change: transform;
              }

              .client-stream-down {
                animation: clientStreamDown 22s linear infinite;
                will-change: transform;
              }

              .client-stream-mask {
                mask-image: linear-gradient(
                  to bottom,
                  transparent 0%,
                  black 6%,
                  black 94%,
                  transparent 100%
                );
                -webkit-mask-image: linear-gradient(
                  to bottom,
                  transparent 0%,
                  black 6%,
                  black 94%,
                  transparent 100%
                );
              }

              @media (prefers-reduced-motion: reduce) {
                .mobile-clients-container {
                  height: auto !important;
                  overflow: visible !important;
                }
                .client-stream-mask {
                  mask-image: none !important;
                  -webkit-mask-image: none !important;
                }
                .client-stream-up,
                .client-stream-down {
                  animation: none !important;
                  transform: none !important;
                }
                .mobile-stream-duplicate {
                  display: none !important;
                }
              }
            }
          `,
        }}
      />

      {/* ===================================================
          1. SOFT, DIFFUSED LIME ATMOSPHERIC WASH
          (Predominantly white with delicate ambient glow)
         =================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        style={{
          backgroundImage: `
            radial-gradient(
              ellipse 75% 55% at 50% 45%,
              rgba(163, 230, 53, 0.08) 0%,
              rgba(190, 242, 100, 0.03) 45%,
              transparent 70%
            )
          `,
        }}
      />

      {/* Subtle Level 1 Editorial Grid Lines */}
      <EditorialGridLines level={1} className="z-0" />

      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===================================================
            2. SECTION HEADER (REMAINS STATIC)
           =================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 lg:mb-14"
        >
          {/* Section Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-black/[0.08] shadow-xs backdrop-blur-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16]" />
            <span className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-[#64748B]">
              04 — CLIENTS
            </span>
          </div>

          {/* Main Title */}
          <h2
            id="clients-heading"
            className="font-sans text-3xl sm:text-4xl lg:text-5xl font-light text-[#111111] tracking-[-0.03em] leading-[1.15] mb-3"
          >
            Clients I&apos;ve Worked With
          </h2>

          {/* Supporting Text */}
          <p className="font-sans text-sm sm:text-[15px] md:text-base text-[#525B64] max-w-lg mx-auto leading-relaxed font-normal">
            Businesses and teams I&apos;ve had the opportunity to design, build, and grow with.
          </p>
        </motion.div>

        {/* ===================================================
            3. MOBILE CONTINUOUS INFINITE MOTION GRID (< 768px)
            - Two columns moving simultaneously in opposite directions
            - Left column moves UP continuously
            - Right column moves DOWN continuously
            - Seamless zero-jump loop with duplicated sets
           =================================================== */}
        <div className="block md:hidden relative w-full overflow-hidden">
          <div className="mobile-clients-container client-stream-mask relative grid grid-cols-2 gap-3 sm:gap-4 h-[490px] xs:h-[530px] overflow-hidden">
            {/* LEFT COLUMN TRACK CONTAINER (Moves UP) */}
            <div className="relative overflow-hidden w-full h-full">
              <div className="client-stream-up flex flex-col will-change-transform">
                {/* Primary Left Set */}
                <div className="flex flex-col gap-3 pb-3">
                  {leftClients.map((client, idx) =>
                    renderCard(client, false, `mob-l1-${idx}-${client.name}`)
                  )}
                </div>
                {/* Duplicated Left Set for Seamless Infinite Loop */}
                <div
                  className="mobile-stream-duplicate flex flex-col gap-3 pb-3"
                  aria-hidden="true"
                >
                  {leftClients.map((client, idx) =>
                    renderCard(client, true, `mob-l2-${idx}-${client.name}`)
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN TRACK CONTAINER (Moves DOWN) */}
            <div className="relative overflow-hidden w-full h-full">
              <div className="client-stream-down flex flex-col will-change-transform">
                {/* Primary Right Set */}
                <div className="flex flex-col gap-3 pb-3">
                  {rightClients.map((client, idx) =>
                    renderCard(client, false, `mob-r1-${idx}-${client.name}`)
                  )}
                </div>
                {/* Duplicated Right Set for Seamless Infinite Loop */}
                <div
                  className="mobile-stream-duplicate flex flex-col gap-3 pb-3"
                  aria-hidden="true"
                >
                  {rightClients.map((client, idx) =>
                    renderCard(client, true, `mob-r2-${idx}-${client.name}`)
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            4. DESKTOP EDITORIAL CLIENT GRID (>= 768px)
            - 100% untouched desktop layout and animations
            - Desktop: 4 columns | Tablet: 2 columns
           =================================================== */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {clients.map((client, idx) => {
            return (
              <motion.div
                key={`desktop-${client.name}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.05,
                  ease: [0.16, 1, 0.3, 1] as const,
                }}
                className="h-full"
              >
                {renderCard(client, false, `desktop-${client.name}-${idx}`)}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
