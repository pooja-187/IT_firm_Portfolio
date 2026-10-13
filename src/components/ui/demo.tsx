"use client"

import React, { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { ThreeDPhotoCarousel } from "@/components/ui/3d-carousel"
import { EditorialGridLines, EditorialRule } from "@/components/ui/EditorialGrid"
import { contentService } from "@/services/ContentService"
import { STORAGE_KEYS } from "@/services/StorageService"
import { INITIAL_PORTFOLIO_DATA } from "@/services/seedData"

export const DemoVariant1 = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [projectImages, setProjectImages] = useState<string[]>(() =>
    INITIAL_PORTFOLIO_DATA.projects.map((p) => p.coverImage).filter(Boolean) as string[]
  )

  useEffect(() => {
    const loadProjects = () => {
      const list = contentService.getProjects(true)
      if (list && list.length > 0) {
        setProjectImages(list.map((p) => p.coverImage).filter(Boolean))
      }
    }
    loadProjects()

    const unsubscribe = contentService.subscribe((key) => {
      if (key === STORAGE_KEYS.PROJECTS) {
        loadProjects()
      }
    })

    return () => unsubscribe()
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1.12, 0.92])
  const smoothGlowScale = useSpring(glowScale, { stiffness: 75, damping: 25 })
  const glowOpacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.5, 1, 1, 0.5])
  const headerY = useTransform(scrollYProgress, [0, 0.4], [24, 0])
  const smoothHeaderY = useSpring(headerY, { stiffness: 85, damping: 26 })

  return (
    <section
      ref={sectionRef}
      id="selected-work"
      className="relative bg-white pt-20 xs:pt-24 sm:pt-28 pb-12 sm:pb-20 overflow-hidden scroll-mt-24 sm:scroll-mt-28"
    >
      {/* ===================================================
          ATMOSPHERIC SOFT LIME-GREEN STUDIO LIGHT (SEAMLESSLY BLENDED)
         =================================================== */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 right-0 h-[650px] sm:h-[750px] z-0 overflow-hidden origin-top"
        style={{
          scale: smoothGlowScale,
          opacity: glowOpacity,
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
      </motion.div>

      {/* Level 1 Subtle Editorial Grid Lines Foundation */}
      <EditorialGridLines level={1} className="z-0" />

      <motion.div
        style={{ y: smoothHeaderY }}
        className="relative z-20 max-w-4xl mx-auto px-6 xs:px-8 text-center mb-5 sm:mb-6"
      >
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-4 xs:mb-5"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-slate-200/80 shadow-sm backdrop-blur-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16] animate-pulse" />
            <span className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[#64748B]">
              03 — SELECTED WORK
            </span>
          </div>
        </motion.div>

        {/* Main Heading with relaxed line height and generous spacing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="font-sans font-normal tracking-[-0.015em] sm:tracking-[-0.03em] text-[#111111] text-[1.45rem] xs:text-[1.7rem] sm:text-5xl md:text-6xl lg:text-[4rem] leading-[1.34] xs:leading-[1.30] sm:leading-[1.2]">
            Selected work where{" "}
            <span className="font-serif italic font-normal text-[#84CC16]">
              design
            </span>
            , technology and{" "}
            <span className="text-[#64748B]">business come together.</span>
          </h2>
        </motion.div>

        {/* Supporting Text with relaxed line-height */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-3.5 xs:mt-4 max-w-md xs:max-w-lg mx-auto"
        >
          <p className="font-sans text-[13px] xs:text-sm sm:text-base text-[#64748B] font-normal leading-[1.6]">
            Drag horizontally to explore projects in 3D.
          </p>
        </motion.div>

        {/* Subtle Horizontal Rule framing the carousel stage */}
        <div className="mt-5 xs:mt-6 sm:mt-8 max-w-lg mx-auto">
          <EditorialRule level={1} />
        </div>
      </motion.div>

      {/* 3D Cylindrical Interactive Photo Carousel with balanced breathing room */}
      <div className="relative z-10 w-full overflow-hidden mt-2 xs:mt-4 sm:mt-6 md:-mt-6">
        <ThreeDPhotoCarousel items={projectImages} />
      </div>
    </section>
  )
}

export function ThreeDPhotoCarouselDemo() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="min-h-[500px] flex flex-col justify-center border border-dashed rounded-lg space-y-4">
        <div className="p-2">
          <ThreeDPhotoCarousel />
        </div>
      </div>
    </div>
  )
}

export { default as DemoOne } from "./cascade-text-demo";
export { StickyScrollRevealDemo } from "./sticky-scroll-reveal-demo";

