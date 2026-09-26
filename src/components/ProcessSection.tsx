'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  rotation: number;
}

const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Understand',
    description:
      'Deeply analyzing your core business goals, target audience, and market context to establish clear direction.',
    rotation: -2,
  },
  {
    number: '02',
    title: 'Define',
    description:
      'Structuring user journeys, information architecture, and strategic scope into an actionable roadmap.',
    rotation: 1,
  },
  {
    number: '03',
    title: 'Create',
    description:
      'Crafting high-fidelity UI/UX, refined design systems, and responsive digital interfaces with meticulous attention.',
    rotation: -1,
  },
  {
    number: '04',
    title: 'Deliver',
    description:
      'Translating designs into clean, production-ready code with seamless responsiveness and peak performance.',
    rotation: 1,
  },
  {
    number: '05',
    title: 'Review',
    description:
      'Continuously testing, optimizing, and polishing every interaction for measurable conversion and growth.',
    rotation: -2,
  },
];

export default function ProcessSection() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="relative w-full text-[#111111] pt-2 sm:pt-4 lg:pt-6 pb-8 sm:pb-10 lg:pb-12 overflow-hidden selection:bg-lime-200"
      style={{
        backgroundColor: '#FFFFFF',
        backgroundImage: `
          radial-gradient(
            ellipse 65% 42% at 50% 32%,
            rgba(163, 230, 53, 0.26) 0%,
            rgba(190, 242, 100, 0.12) 40%,
            rgba(217, 249, 157, 0.04) 65%,
            transparent 78%
          ),
          radial-gradient(
            ellipse 85% 55% at 52% 38%,
            rgba(163, 230, 53, 0.10) 0%,
            transparent 70%
          ),
          radial-gradient(
            ellipse 75% 50% at 50% 100%,
            rgba(163, 230, 53, 0.36) 0%,
            rgba(190, 242, 100, 0.22) 38%,
            rgba(217, 249, 157, 0.08) 65%,
            transparent 82%
          )
        `,
      }}
    >
      <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ===================================================
            SECTION HEADER
           =================================================== */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 lg:mb-16">
          {/* Small Section Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/5 mb-5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A3E635]" />
            <span className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[#64748B]">
              07 — PROCESS
            </span>
          </div>

          {/* Large Centered Clean Minimal Heading */}
          <h2
            id="process-heading"
            className="font-sans text-4xl sm:text-5xl md:text-6xl font-light text-[#111111] tracking-[-0.03em] leading-[1.12]"
          >
            Here&apos;s how it works
          </h2>
        </div>

        {/* ===================================================
            DESKTOP FLOATING EDITORIAL CARD COMPOSITION (>= 1024px)
           =================================================== */}
        <div className="hidden lg:block relative w-full max-w-[1180px] mx-auto">
          
          {/* SVG Lime Connector Lines Layer (Matching Reference) */}
          <svg
            aria-hidden="true"
            className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
            viewBox="0 0 1180 820"
            fill="none"
          >
            {/* 1. Connector: 01 (Understand) -> 02 (Define) */}
            <motion.path
              d="M 330 150 C 420 150, 480 320, 600 320"
              stroke="#A3E635"
              strokeWidth="2"
              strokeDasharray="4 4"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.8 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeInOut" }}
            />

            {/* 2. Connector: 02 (Define) -> 03 (Create) */}
            <motion.path
              d="M 870 340 C 950 340, 400 480, 290 540"
              stroke="#A3E635"
              strokeWidth="2"
              strokeDasharray="4 4"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.8 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.4, delay: 0.4, ease: "easeInOut" }}
            />

            {/* 3. Connector: 03 (Create) -> 04 (Deliver) */}
            <motion.path
              d="M 320 620 C 440 640, 520 700, 640 700"
              stroke="#A3E635"
              strokeWidth="2"
              strokeDasharray="4 4"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.8 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }}
            />

            {/* 4. Connector: 04 (Deliver) -> 05 (Review) */}
            <motion.path
              d="M 890 680 C 950 670, 960 480, 940 220"
              stroke="#A3E635"
              strokeWidth="2"
              strokeDasharray="4 4"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.8 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.4, delay: 0.8, ease: "easeInOut" }}
            />
          </svg>

          {/* Container with fixed min-height for layout accuracy */}
          <div className="relative min-h-[820px]">
            {/* Card 01: Understand (Top Left) */}
            <div className="absolute top-[40px] left-[60px] w-[310px]">
              <ProcessCard step={processSteps[0]} index={0} />
            </div>

            {/* Card 02: Define (Upper Center-Right) */}
            <div className="absolute top-[240px] left-[600px] w-[310px]">
              <ProcessCard step={processSteps[1]} index={1} />
            </div>

            {/* Card 03: Create (Mid Left-Lower) */}
            <div className="absolute top-[460px] left-[40px] w-[320px]">
              <ProcessCard step={processSteps[2]} index={2} />
            </div>

            {/* Card 04: Deliver (Lower Center) */}
            <div className="absolute top-[580px] left-[620px] w-[320px]">
              <ProcessCard step={processSteps[3]} index={3} />
            </div>

            {/* Card 05: Review (Top Right - Closing the Loop) */}
            <div className="absolute top-[80px] right-[40px] w-[300px]">
              <ProcessCard step={processSteps[4]} index={4} />
            </div>
          </div>
        </div>

        {/* ===================================================
            MOBILE & TABLET VERTICAL STACK (< 1024px)
           =================================================== */}
        <div className="lg:hidden flex flex-col gap-6 max-w-md mx-auto">
          {processSteps.map((step, index) => (
            <ProcessCard key={step.number} step={step} index={index} isMobile />
          ))}
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// Interactive Process Card Component
// -------------------------------------------------------------
interface ProcessCardProps {
  step: ProcessStep;
  index: number;
  isMobile?: boolean;
}

function ProcessCard({ step, index, isMobile = false }: ProcessCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      whileHover={{
        y: -6,
        scale: 1.02,
        transition: { duration: 0.25, ease: 'easeOut' },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        rotate: isMobile ? 0 : `${step.rotation}deg`,
      }}
      className={`
        relative z-10 p-6 sm:p-7 rounded-2xl sm:rounded-3xl
        bg-white/90 backdrop-blur-md
        border border-black/[0.07]
        shadow-[0_8px_30px_rgb(0,0,0,0.04)]
        hover:shadow-[0_20px_45px_rgba(163,230,53,0.18)]
        hover:border-[#A3E635]/60
        transition-shadow duration-300
        cursor-default
      `}
    >
      {/* Top Row: Number Badge and Decorative Arrow/Icon */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FAFAF9] border border-black/5 text-[#64748B]">
          {step.number}
        </span>
        <span
          className={`
            w-6 h-6 rounded-full flex items-center justify-center text-xs
            transition-colors duration-300
            ${isHovered ? 'bg-[#A3E635] text-black' : 'bg-black/5 text-[#64748B]'}
          `}
        >
          ↗
        </span>
      </div>

      {/* Title */}
      <h3 className="font-sans text-xl sm:text-2xl font-normal text-[#111111] tracking-tight mb-2">
        {step.title}
      </h3>

      {/* Description */}
      <p className="font-sans text-sm text-[#525B64] leading-relaxed font-normal">
        {step.description}
      </p>

      {/* Bottom subtle indicator line */}
      <div
        className={`
          mt-4 h-[2px] rounded-full transition-all duration-300
          ${isHovered ? 'w-full bg-[#A3E635]' : 'w-6 bg-black/10'}
        `}
      />
    </motion.div>
  );
}
