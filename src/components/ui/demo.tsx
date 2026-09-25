"use client"

import React from "react"
import { motion } from "motion/react"
import { CircularGallery, GalleryItem } from "@/components/ui/circular-gallery-2"

export const galleryItems: GalleryItem[] = [
  {
    image: "/images/projects/travinno.jpg",
    text: "Travinno · AI Travel Companion",
  },
  {
    image: "/images/projects/manzio.jpg",
    text: "Manzio · Creative Agency",
  },
  {
    image: "/images/projects/faazo.jpg",
    text: "Faazo · Fleet & Logistics SaaS",
  },
  {
    image: "/images/projects/careva.jpg",
    text: "Careva · Healthcare Ecosystem",
  },
  {
    image: "/images/projects/mangalam.jpg",
    text: "Mangalam · Real Estate Portal",
  },
  {
    image: "/images/projects/auraluxe.jpg",
    text: "Auraluxe · Spatial Audio App",
  },
]

export const DemoVariant1 = () => {
  return (
    <div id="work" className="relative bg-white pt-12 sm:pt-16 pb-4 sm:pb-6 overflow-hidden">
      {/* ===================================================
          ATMOSPHERIC SOFT LIME-GREEN STUDIO LIGHT (SEAMLESSLY BLENDED)
         =================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 right-0 h-[650px] sm:h-[750px] z-0 overflow-hidden"
        style={{
          background: `
            radial-gradient(
              ellipse 70% 55% at 50% 48%,
              rgba(190, 235, 105, 0.32) 0%,
              rgba(190, 235, 105, 0.22) 22%,
              rgba(190, 235, 105, 0.12) 42%,
              rgba(190, 235, 105, 0.05) 58%,
              transparent 78%
            ),
            radial-gradient(
              ellipse 100% 65% at 50% 50%,
              rgba(215, 242, 165, 0.14) 0%,
              transparent 72%
            )
          `,
          maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
        }}
      >
        {/* Soft Blurred Depth Glow Behind Heading */}
        <div
          className="absolute"
          style={{
            width: "65%",
            height: "55%",
            left: "50%",
            top: "48%",
            transform: "translate(-50%, -50%)",
            background: "rgba(190, 235, 105, 0.14)",
            filter: "blur(100px)",
            borderRadius: "50%",
          }}
        />
      </div>

      {/* Section Header */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center mb-6 sm:mb-8">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-slate-200/80 shadow-sm backdrop-blur-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16] animate-pulse" />
            <span className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[#64748B]">
              03 — SELECTED WORK
            </span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="font-sans font-normal tracking-[-0.03em] text-[#111111] text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] leading-[1.12]">
            Selected work where{" "}
            <span className="font-serif italic font-normal text-[#84CC16]">
              design
            </span>
            , technology and{" "}
            <span className="text-[#64748B]">business come together.</span>
          </h2>
        </motion.div>

        {/* Supporting Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-3 sm:mt-4 max-w-2xl mx-auto"
        >
          <p className="font-sans text-sm sm:text-base text-[#64748B] font-normal leading-relaxed">
            A selection of projects shaped through thoughtful design, technology and business-focused thinking.
          </p>
        </motion.div>
      </div>

      {/* 3D WebGL Circular Gallery Showcase (Full Screen Width Edge-to-Edge) */}
      <div className="relative z-10 w-full overflow-hidden">
        <div className="relative h-[480px] sm:h-[540px] md:h-[600px] lg:h-[640px] w-full">
          <CircularGallery
            items={galleryItems}
            bend={2.0}
            borderRadius={0.06}
            scrollSpeed={2}
            scrollEase={0.05}
          />
        </div>
      </div>
    </div>
  )
}

