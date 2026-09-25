"use client"

import React from "react"
import { motion } from "motion/react"
import { CircularGallery, GalleryItem } from "@/components/ui/circular-gallery"

export const galleryItems: GalleryItem[] = [
  {
    image: "https://cdn.21st.dev/assets/mirror/e9/e9f40fde089106509f8f0618d109f54f6d684390f843e8d1a6b5059e81453caf.jpg",
    text: "Bridge",
  },
  {
    image: "https://cdn.21st.dev/assets/mirror/07/07b4e801248a3aea53329b56e50ff0bf4500ee0e603742000db362557ccd609f.jpg",
    text: "Desk Setup",
  },
  {
    image: "https://cdn.21st.dev/assets/mirror/ef/ef490a9710d011911f365ff14eaa1ba7cca5d8f327c67df6e2d8796abdd0afb0.jpg",
    text: "Waterfall",
  },
  {
    image: "https://cdn.21st.dev/assets/mirror/98/980d919a5154a9d98a355748381dc20fd4a5df9feb5d36ce01f6bc561e8cda1b.jpg",
    text: "Strawberries",
  },
  {
    image: "https://cdn.21st.dev/assets/mirror/01/01d0cba6c7a56afeef2040d5d2a1dfd6a1c86fafa703e0f498f6f8794c11ef66.jpg",
    text: "Deep Diving",
  },
  {
    image: "https://cdn.21st.dev/assets/mirror/28/28b5936e7c76019c46d2b22ac3abbd18b1a3aaa0c3962ff723e25973f59763ba.jpg",
    text: "Train Track",
  },
  {
    image: "https://cdn.21st.dev/assets/mirror/3a/3a7a5e345bc71cb788e0a8538006dec703983b3f32412623d5a64d5b1e4cd00e.jpg",
    text: "Santorini",
  },
  {
    image: "https://cdn.21st.dev/assets/mirror/06/065c0afc39b065e339dee3d1bbda6787882dbe81a676f54f0847cfb1c8493d7d.jpg",
    text: "Blurry Lights",
  },
  {
    image: "https://cdn.21st.dev/assets/mirror/46/46065f54c2e5b2f6b9f178227e0383cf0a8b12daab1556be26dbfcfb1de1de82.jpg",
    text: "New York",
  },
  {
    image: "https://cdn.21st.dev/assets/mirror/99/99bc6663facf0eb98396f8b78d274cd58d78817db2ff9c89d3c16729bf9ae5fd.jpg",
    text: "Good Boy",
  },
  {
    image: "https://cdn.21st.dev/assets/mirror/40/4020b7c8c9171f12a7747c0850d854cbd16aab16b4d17d8bfce841dc7fdacd8e.jpg",
    text: "Coastline",
  },
  {
    image: "https://cdn.21st.dev/assets/mirror/99/99321a58b63bf661e414cde2a66ae72d10f7af24d5b25c248a63b10106c43d13.jpg",
    text: "Palm Trees",
  },
]

export const DemoVariant1 = () => {
  return (
    <div id="work" className="relative bg-white pt-16 sm:pt-20 pb-16 sm:pb-24 overflow-hidden">
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
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center mb-8 sm:mb-12">
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
          className="mt-4 sm:mt-5 max-w-2xl mx-auto"
        >
          <p className="font-sans text-sm sm:text-base text-[#64748B] font-normal leading-relaxed">
            A selection of projects shaped through thoughtful design, technology and business-focused thinking.
          </p>
        </motion.div>
      </div>

      {/* 3D WebGL Circular Gallery Showcase */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-2 sm:px-4">
        <div className="relative h-[550px] sm:h-[620px] md:h-[680px] w-full rounded-2xl overflow-hidden">
          <CircularGallery
            items={galleryItems}
            bend={3}
            borderRadius={0.05}
            scrollEase={0.02}
          />
        </div>
      </div>
    </div>
  )
}
