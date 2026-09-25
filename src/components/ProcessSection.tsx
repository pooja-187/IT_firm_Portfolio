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
      'Continuous feedback loops, iterative quality assurance, and ongoing optimization for measurable results.',
    rotation: -1,
  },
];

export default function ProcessSection() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="relative w-full bg-white text-[#111111] py-24 sm:py-32 lg:py-40 overflow-hidden selection:bg-lime-300"
    >
      {/* Diffused Ambient Lime Glow Behind the Composition */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[700px] bg-[radial-gradient(circle_at_center,rgba(183,227,106,0.12)_0%,rgba(183,227,106,0.03)_48%,transparent_72%)] blur-3xl -z-10"
      />

      <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ===================================================
            SECTION HEADER
           =================================================== */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20 lg:mb-24">
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
            className="font-sans text-4xl sm:text-5xl md:text-6xl font-light text-[#111111] tracking-[-0.03em] leading-[1.12]"
          >
            Here&apos;s how it works
          </h2>
        </div>

        {/* ===================================================
            DESKTOP FLOATING EDITORIAL CARD COMPOSITION (>= 1024px)
           =================================================== */}
        <div className="hidden lg:block relative w-full max-w-[1180px] mx-auto">
          
          {/* SVG Organic Connector Lines Layer */}
          <svg
            aria-hidden="true"
            className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
            viewBox="0 0 1180 820"
            fill="none"
          >
            {/* 1. Connector: 01 (Understand) -> 02 (Define) */}
            <motion.path
              d="M 310 160 C 360 110, 420 100, 480 120"
              stroke="#B7E36A"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeInOut' }}
            />
            <circle cx="310" cy="160" r="4" fill="#FFFFFF" stroke="#B7E36A" strokeWidth="2" />
            <circle cx="480" cy="120" r="4" fill="#FFFFFF" stroke="#B7E36A" strokeWidth="2" />

            {/* 2. Connector: 02 (Define) -> 03 (Create) with Organic Loop */}
            <motion.path
              d="M 700 120 C 750 140, 780 190, 755 195 C 730 200, 760 145, 835 160"
              stroke="#B7E36A"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.0, delay: 0.4, ease: 'easeInOut' }}
            />
            <circle cx="700" cy="120" r="4" fill="#FFFFFF" stroke="#B7E36A" strokeWidth="2" />
            <circle cx="835" cy="160" r="4" fill="#FFFFFF" stroke="#B7E36A" strokeWidth="2" />

            {/* 3. Connector: 03 (Create) -> 04 (Deliver) — CRUCIAL CONNECTION */}
            <motion.path
              d="M 940 370 C 960 460, 810 490, 710 430 C 630 380, 560 390, 510 440"
              stroke="#B7E36A"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.1, delay: 0.6, ease: 'easeInOut' }}
            />
            <circle cx="940" cy="370" r="4" fill="#FFFFFF" stroke="#B7E36A" strokeWidth="2" />
            <circle cx="510" cy="440" r="4" fill="#FFFFFF" stroke="#B7E36A" strokeWidth="2" />

            {/* 4. Connector: 04 (Deliver) -> 05 (Review) with Loop */}
            <motion.path
              d="M 540 580 C 580 545, 615 545, 605 585 C 595 615, 615 620, 645 605"
              stroke="#B7E36A"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, delay: 0.8, ease: 'easeInOut' }}
            />
            <circle cx="540" cy="580" r="4" fill="#FFFFFF" stroke="#B7E36A" strokeWidth="2" />
            <circle cx="645" cy="605" r="4" fill="#FFFFFF" stroke="#B7E36A" strokeWidth="2" />
          </svg>

          {/* Tier 1 Floating Cards (01, 02, 03) */}
          <div className="relative z-10 grid grid-cols-3 gap-8 xl:gap-12 mb-10">
            
            {/* 01 — UNDERSTAND (Left Tier 1) */}
            <div className="pt-10 flex justify-center">
              <ProcessCard step={processSteps[0]} delay={0.1} />
            </div>

            {/* 02 — DEFINE (Center Tier 1 - Elevated) */}
            <div className="-mt-4 flex justify-center">
              <ProcessCard step={processSteps[1]} delay={0.25} />
            </div>

            {/* 03 — CREATE (Right Tier 1) */}
            <div className="pt-8 flex justify-center">
              <ProcessCard step={processSteps[2]} delay={0.4} />
            </div>

          </div>

          {/* Tier 2 Floating Cards (04, 05) */}
          <div className="relative z-10 grid grid-cols-2 max-w-3xl mx-auto gap-12 xl:gap-16">
            
            {/* 04 — DELIVER (Center-Left Tier 2) */}
            <div className="flex justify-end pr-2">
              <ProcessCard step={processSteps[3]} delay={0.55} />
            </div>

            {/* 05 — REVIEW (Center-Right Tier 2) */}
            <div className="pt-6 flex justify-start pl-2">
              <ProcessCard step={processSteps[4]} delay={0.7} />
            </div>

          </div>

        </div>

        {/* ===================================================
            MOBILE & TABLET VERTICAL TIMELINE (< 1024px)
           =================================================== */}
        <div className="lg:hidden relative max-w-md mx-auto">
          
          {/* Vertical Lime Timeline */}
          <div
            aria-hidden="true"
            className="absolute top-8 bottom-8 left-6 sm:left-7 w-0.5 bg-gradient-to-b from-[#B7E36A] via-[#B7E36A] to-slate-200"
          />

          <div className="space-y-6 relative z-10 pl-14 sm:pl-16">
            {processSteps.map((step, idx) => (
              <motion.div
                key={`mobile-step-${step.number}`}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="relative"
              >
                {/* Timeline Node */}
                <div className="absolute -left-14 sm:-left-16 top-7 w-4 h-4 rounded-full bg-white border-2 border-[#B7E36A] shadow-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#B7E36A]" />
                </div>

                {/* Mobile Glass Card */}
                <div className="bg-[rgba(244,252,238,0.76)] backdrop-blur-xl border border-[rgba(183,227,106,0.24)] rounded-[26px] p-6 sm:p-7 shadow-[0_14px_35px_rgba(20,30,20,0.05)]">
                  <span className="font-sans text-4xl sm:text-5xl font-light text-[#111111] tracking-tight block mb-6 leading-none">
                    {step.number}
                  </span>
                  <h3 className="font-sans text-xl sm:text-2xl font-normal text-[#111111] tracking-tight mb-2">
                    {step.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#64748B] font-normal leading-relaxed">
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
// Individual Process Card (3D Tilt, Subtle Green Frosted Glass & Reflection)
// =========================================================================
function ProcessCard({ step, delay }: { step: ProcessStep; delay: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    // Subtle 3D tilt (max ~3.5deg)
    const rotateX = ((y / rect.height) - 0.5) * -7;
    const rotateY = ((x / rect.width) - 0.5) * 7;

    setTilt({ x: rotateX, y: rotateY });
    setMousePos({ x: xPercent, y: yPercent });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        transform: `perspective(1000px) rotate(${step.rotation}deg) ${
          isHovered
            ? `translateY(-8px) scale(1.025) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
            : 'translateY(0px) scale(1)'
        }`,
      }}
      className="relative w-[300px] xl:w-[325px] h-[360px] xl:h-[390px] rounded-[30px] p-7 xl:p-8 bg-[rgba(244,252,238,0.74)] hover:bg-[rgba(248,254,244,0.90)] backdrop-blur-[20px] border border-[rgba(183,227,106,0.22)] hover:border-[rgba(183,227,106,0.36)] shadow-[0_15px_45px_rgba(20,30,20,0.05)] hover:shadow-[0_25px_60px_rgba(20,30,20,0.12),0_10px_25px_rgba(183,227,106,0.09)] transition-all duration-400 ease-out flex flex-col justify-between select-none cursor-default overflow-hidden will-change-transform"
    >
      {/* 3D Glass Light Reflection Highlight */}
      <div
        aria-hidden="true"
        style={{
          background: `radial-gradient(circle 160px at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.45), transparent 70%)`,
        }}
        className={`pointer-events-none absolute inset-0 rounded-[30px] transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Top: Very Large Lightweight Step Number */}
      <div className="relative z-10">
        <span className="font-sans text-5xl xl:text-6xl font-light text-[#111111] tracking-tight leading-none block">
          {step.number}
        </span>
      </div>

      {/* Bottom: Title & Approved Process Description */}
      <div className="relative z-10">
        <h3 className="font-sans text-xl xl:text-2xl font-normal text-[#111111] tracking-tight mb-2">
          {step.title}
        </h3>
        <p className="font-sans text-xs xl:text-[13px] text-[#64748B] font-normal leading-relaxed">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}
