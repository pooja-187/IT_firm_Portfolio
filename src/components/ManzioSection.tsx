"use client";

import React from "react";
import { motion } from "framer-motion";
import TeamShowcase from "@/components/ui/team-showcase";
import { EditorialGridLines, EditorialRule } from "@/components/ui/EditorialGrid";

export default function ManzioSection() {
  return (
    <section
      id="manzio"
      aria-labelledby="manzio-heading"
      className="relative w-full text-[#111111] pt-16 sm:pt-22 lg:pt-28 pb-16 sm:pb-24 lg:pb-28 overflow-hidden selection:bg-lime-200 scroll-mt-24 sm:scroll-mt-28"
      style={{
        backgroundColor: "#FFFFFF",
        backgroundImage: `
          radial-gradient(
            ellipse 80% 50% at 50% 25%,
            rgba(163, 230, 53, 0.16) 0%,
            rgba(190, 242, 100, 0.08) 38%,
            rgba(217, 249, 157, 0.02) 65%,
            transparent 78%
          ),
          radial-gradient(
            ellipse 85% 55% at 50% 65%,
            rgba(163, 230, 53, 0.08) 0%,
            transparent 70%
          )
        `,
      }}
    >
      {/* Ambient Soft Lime Glow behind Manzio Showcase */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-[1000px] h-[450px] rounded-full blur-[85px] opacity-70 z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(183, 227, 106, 0.18) 0%, rgba(183, 227, 106, 0.07) 45%, transparent 72%)",
        }}
      />

      {/* Level 3 Structural Editorial Grid Lines Foundation */}
      <EditorialGridLines level={3} maxWidth="max-w-7xl" className="z-0" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10 text-center max-w-2xl mx-auto">
          {/* Subtle Section Badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-black/[0.06] mb-3.5 sm:mb-4 shadow-2xs backdrop-blur-xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#8CC63F] animate-pulse" />
            <span className="font-sans text-[10.5px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-slate-600">
              08 — MANZIO CREATIVE STUDIO
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            id="manzio-heading"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] font-light text-[#111111] tracking-[-0.035em] leading-[1.14] mb-3.5"
          >
            Manzio Creative Studio
          </motion.h2>

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-sm sm:text-[15px] text-slate-600 font-normal leading-relaxed max-w-lg mx-auto"
          >
            A dedicated collective of designers, technical directors, and engineers building exceptional digital products under Nashim Nazar&apos;s creative leadership.
          </motion.p>
        </div>

        {/* Team Showcase Interactive Component */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <TeamShowcase />
        </motion.div>
      </div>
    </section>
  );
}
