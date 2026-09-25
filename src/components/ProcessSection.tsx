'use client';

import React from 'react';
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
    rotation: 1.5,
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
    rotation: 1.5,
  },
  {
    number: '05',
    title: 'Review',
    description:
      'Continuous feedback loops, iterative quality assurance, and ongoing optimization for measurable results.',
    rotation: -1.5,
  },
];

export default function ProcessSection() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="relative w-full bg-white text-[#111111] py-24 sm:py-32 lg:py-44 overflow-hidden selection:bg-lime-300"
    >
      {/* Soft Lime Ambient Glow (Behind Card Composition) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[750px] bg-[radial-gradient(circle_at_center,rgba(183,227,106,0.16)_0%,rgba(183,227,106,0.04)_45%,transparent_75%)] blur-3xl -z-10"
      />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* ===================================================
            SECTION HEADER
           =================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24 lg:mb-28">
          {/* Small Section Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200/80 mb-5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B7E36A] animate-pulse" />
            <span className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[#64748B]">
              07 — PROCESS
            </span>
          </div>

          {/* Large Centered Clean Minimal Heading */}
          <h2
            id="process-heading"
            className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-light text-[#111111] tracking-[-0.03em] leading-[1.12]"
          >
            Here&apos;s how it works
          </h2>
        </div>

        {/* ===================================================
            DESKTOP FLOATING EDITORIAL CARD COMPOSITION (>= 1024px)
           =================================================== */}
        <div className="hidden lg:block relative w-full">
          
          {/* SVG Organic Connector Lines Layer */}
          <svg
            aria-hidden="true"
            className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
            viewBox="0 0 1200 860"
            fill="none"
          >
            {/* Step 01 -> Step 02 Connector */}
            <motion.path
              d="M 280 180 C 330 90, 420 80, 480 120"
              stroke="#B7E36A"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, delay: 0.2, ease: 'easeInOut' }}
            />
            <circle cx="280" cy="180" r="4.5" fill="#FFFFFF" stroke="#B7E36A" strokeWidth="2" />
            <circle cx="480" cy="120" r="4.5" fill="#FFFFFF" stroke="#B7E36A" strokeWidth="2" />

            {/* Step 02 -> Step 03 Connector with Organic Loop */}
            <motion.path
              d="M 720 120 C 780 160, 810 240, 770 240 C 740 240, 770 170, 840 200"
              stroke="#B7E36A"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.1, delay: 0.4, ease: 'easeInOut' }}
            />
            <circle cx="720" cy="120" r="4.5" fill="#FFFFFF" stroke="#B7E36A" strokeWidth="2" />
            <circle cx="840" cy="200" r="4.5" fill="#FFFFFF" stroke="#B7E36A" strokeWidth="2" />

            {/* Step 03 -> Step 04 Serpentine Connector */}
            <motion.path
              d="M 940 520 C 890 600, 560 540, 480 620"
              stroke="#B7E36A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="4 4"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.0, delay: 0.6, ease: 'easeInOut' }}
            />
            <circle cx="940" cy="520" r="4.5" fill="#FFFFFF" stroke="#B7E36A" strokeWidth="2" />
            <circle cx="480" cy="620" r="4.5" fill="#FFFFFF" stroke="#B7E36A" strokeWidth="2" />

            {/* Step 04 -> Step 05 Connector with Loop */}
            <motion.path
              d="M 580 650 C 650 630, 690 700, 660 720 C 630 730, 670 780, 750 760"
              stroke="#B7E36A"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, delay: 0.8, ease: 'easeInOut' }}
            />
            <circle cx="580" cy="650" r="4.5" fill="#FFFFFF" stroke="#B7E36A" strokeWidth="2" />
            <circle cx="750" cy="760" r="4.5" fill="#FFFFFF" stroke="#B7E36A" strokeWidth="2" />
          </svg>

          {/* Floating Cards Grid Hierarchy */}
          <div className="relative z-10 grid grid-cols-3 gap-8 xl:gap-12 mb-12">
            
            {/* 01 — UNDERSTAND (Left Tier 1) */}
            <div className="pt-12 flex justify-center">
              <ProcessCard step={processSteps[0]} delay={0.1} />
            </div>

            {/* 02 — DEFINE (Center Tier 1 - Elevated) */}
            <div className="-mt-6 flex justify-center">
              <ProcessCard step={processSteps[1]} delay={0.25} />
            </div>

            {/* 03 — CREATE (Right Tier 1) */}
            <div className="pt-10 flex justify-center">
              <ProcessCard step={processSteps[2]} delay={0.4} />
            </div>

          </div>

          {/* Tier 2 Floating Cards */}
          <div className="relative z-10 grid grid-cols-2 max-w-4xl mx-auto gap-12 xl:gap-16">
            
            {/* 04 — DELIVER (Center-Left Tier 2) */}
            <div className="flex justify-end pr-4">
              <ProcessCard step={processSteps[3]} delay={0.55} />
            </div>

            {/* 05 — REVIEW (Center-Right Tier 2) */}
            <div className="pt-8 flex justify-start pl-4">
              <ProcessCard step={processSteps[4]} delay={0.7} />
            </div>

          </div>

        </div>

        {/* ===================================================
            MOBILE & TABLET VERTICAL TIMELINE (< 1024px)
           =================================================== */}
        <div className="lg:hidden relative max-w-lg mx-auto">
          
          {/* Vertical Lime Line */}
          <div
            aria-hidden="true"
            className="absolute top-8 bottom-8 left-6 sm:left-8 w-0.5 bg-gradient-to-b from-[#B7E36A] via-[#B7E36A] to-slate-200"
          />

          <div className="space-y-8 relative z-10 pl-14 sm:pl-16">
            {processSteps.map((step, idx) => (
              <motion.div
                key={`mobile-step-${step.number}`}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="relative"
              >
                {/* Timeline Node */}
                <div className="absolute -left-14 sm:-left-16 top-8 w-4 h-4 rounded-full bg-white border-2 border-[#B7E36A] shadow-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#B7E36A]" />
                </div>

                {/* Mobile Card */}
                <div className="bg-[#FAFAF8] border border-[#F0F0ED] rounded-[28px] p-6 sm:p-8 shadow-[0_16px_40px_rgba(20,20,20,0.05)]">
                  <span className="font-sans text-5xl font-light text-[#111111] tracking-tight block mb-8">
                    {step.number}
                  </span>
                  <h3 className="font-sans text-2xl font-normal text-[#111111] tracking-tight mb-2">
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm text-[#64748B] font-normal leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

// =========================================================================
// Individual Process Card Matching Reference Visual Language
// =========================================================================
function ProcessCard({ step, delay }: { step: ProcessStep; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotate: `${step.rotation}deg` }}
      className="group w-full max-w-[340px] xl:max-w-[360px] h-[380px] xl:h-[420px] bg-[#FAFAF8] border border-[#F0F0ED] rounded-[32px] p-8 xl:p-10 shadow-[0_20px_60px_rgba(20,20,20,0.06)] hover:shadow-[0_25px_70px_rgba(20,20,20,0.11)] hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 ease-out flex flex-col justify-between select-none cursor-default"
    >
      {/* Top: Very Large Lightweight Step Number */}
      <div>
        <span className="font-sans text-6xl xl:text-7xl font-light text-[#111111] tracking-tight leading-none block">
          {step.number}
        </span>
      </div>

      {/* Bottom: Title and Approved Process Description */}
      <div>
        <h3 className="font-sans text-2xl xl:text-3xl font-normal text-[#111111] tracking-tight mb-3">
          {step.title}
        </h3>
        <p className="font-sans text-xs xl:text-sm text-[#64748B] font-normal leading-relaxed">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}
