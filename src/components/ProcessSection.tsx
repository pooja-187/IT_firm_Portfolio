'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { EditorialGridLines, EditorialRule } from '@/components/ui/EditorialGrid';
import { contentService } from "@/services/ContentService";
import { STORAGE_KEYS } from "@/services/StorageService";

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

// Sequential timeline orchestration (seconds) with refined brisk pacing
const TIMING = {
  card1: 0.00,
  conn1: 0.45,
  card2: 0.85,
  conn2: 1.30,
  card3: 1.70,
  conn3: 2.15,
  card4: 2.55,
  conn4: 3.00,
  card5: 3.40,
};

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [steps, setSteps] = useState<ProcessStep[]>(processSteps);

  useEffect(() => {
    const loadSteps = () => {
      const managed = contentService.getProcess(true);
      if (managed && managed.length > 0) {
        setSteps(
          managed.map((m, idx) => ({
            number: m.stepNumber || m.number || String(idx + 1).padStart(2, "0"),
            title: m.title,
            description: m.description,
            rotation: processSteps[idx]?.rotation ?? (idx % 2 === 0 ? -1 : 1),
          }))
        );
      }
    };

    loadSteps();

    const unsubscribe = contentService.subscribe((key) => {
      if (key === STORAGE_KEYS.PROCESS) {
        loadSteps();
      }
    });

    return () => unsubscribe();
  }, []);

  // Triggers once when 20% of section enters viewport (15–25% requested range)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-labelledby="process-heading"
      className="relative w-full text-[#111111] pt-2 sm:pt-4 lg:pt-6 pb-16 sm:pb-24 lg:pb-32 overflow-hidden selection:bg-lime-200 scroll-mt-24 sm:scroll-mt-28"
      style={{
        backgroundColor: '#FFFFFF',
        backgroundImage: `
          radial-gradient(
            ellipse 75% 50% at 50% 35%,
            rgba(163, 230, 53, 0.20) 0%,
            rgba(190, 242, 100, 0.09) 38%,
            rgba(217, 249, 157, 0.02) 65%,
            transparent 78%
          ),
          radial-gradient(
            ellipse 85% 55% at 52% 60%,
            rgba(163, 230, 53, 0.08) 0%,
            transparent 70%
          )
        `,
      }}
    >
      {/* Centered ambient lime glow orb (safe from boundary clipping) */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-[#A3E635]/12 rounded-full blur-[130px] pointer-events-none"
      />

      {/* Level 3 Structural Editorial Grid Lines Foundation */}
      <EditorialGridLines level={3} maxWidth="max-w-[1240px]" className="z-0" />

      <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ===================================================
            SECTION HEADER
           =================================================== */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 lg:mb-12">
          {/* Small Section Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white border border-black/5 mb-4 sm:mb-5 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A3E635]" />
            <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#64748B]">
              07 — PROCESS
            </span>
          </div>

          {/* Large Centered Clean Minimal Heading */}
          <h2
            id="process-heading"
            className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#111111] tracking-[-0.03em] leading-[1.15]"
          >
            Here&apos;s how it works
          </h2>
        </div>

        {/* Subtle Horizontal Rule framing the process map */}
        <div className="max-w-4xl mx-auto mb-10 sm:mb-14">
          <EditorialRule level={3} withCorners={true} />
        </div>

        {/* ===================================================
            DESKTOP FLOATING EDITORIAL CARD COMPOSITION (>= 1024px)
           =================================================== */}
        <div className="hidden lg:block relative w-full max-w-[1180px] mx-auto">

          {/* Subtle Ambient Soft Green Tint Behind Cards */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-8 -inset-y-10 rounded-[60px] blur-[90px] opacity-75 z-0"
            style={{
              background: `
                radial-gradient(
                  ellipse 80% 60% at 50% 48%,
                  rgba(163, 230, 53, 0.18) 0%,
                  rgba(190, 242, 100, 0.09) 42%,
                  rgba(217, 249, 157, 0.03) 68%,
                  transparent 85%
                ),
                radial-gradient(
                  ellipse 55% 45% at 30% 30%,
                  rgba(163, 230, 53, 0.12) 0%,
                  transparent 70%
                ),
                radial-gradient(
                  ellipse 55% 45% at 70% 65%,
                  rgba(163, 230, 53, 0.10) 0%,
                  transparent 70%
                )
              `,
            }}
          />

          {/* SVG Lime Connector Lines Layer (Sequential Path Drawing) */}
          <svg
            aria-hidden="true"
            className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
            viewBox="0 0 1180 820"
            fill="none"
          >
            {/* 1. Connector: 01 (Understand) -> 02 (Define) */}
            <motion.path
              d="M 310 160 C 360 110, 420 100, 480 120"
              stroke="#A3E635"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              initial={shouldReduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              animate={
                shouldReduceMotion
                  ? { pathLength: 1, opacity: 1 }
                  : isInView
                    ? { pathLength: 1, opacity: 1 }
                    : { pathLength: 0, opacity: 0 }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      pathLength: { duration: 0.42, delay: TIMING.conn1, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 0.1, delay: TIMING.conn1 },
                    }
              }
            />
            {/* Start circle at Card 01 */}
            <motion.circle
              cx="310"
              cy="160"
              r="4.5"
              fill="#FFFFFF"
              stroke="#A3E635"
              strokeWidth="2"
              initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              animate={
                shouldReduceMotion
                  ? { scale: 1, opacity: 1 }
                  : isInView
                    ? { scale: 1, opacity: 1 }
                    : { scale: 0, opacity: 0 }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.20, delay: TIMING.conn1, ease: 'easeOut' }
              }
            />
            {/* End circle at Card 02 (pops as line arrives) */}
            <motion.circle
              cx="480"
              cy="120"
              r="4.5"
              fill="#FFFFFF"
              stroke="#A3E635"
              strokeWidth="2"
              initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              animate={
                shouldReduceMotion
                  ? { scale: 1, opacity: 1 }
                  : isInView
                    ? { scale: 1, opacity: 1 }
                    : { scale: 0, opacity: 0 }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.20, delay: TIMING.card2, ease: 'easeOut' }
              }
            />

            {/* 2. Connector: 02 (Define) -> 03 (Create) with Organic Loop */}
            <motion.path
              d="M 700 120 C 750 140, 780 190, 755 195 C 730 200, 760 145, 835 160"
              stroke="#A3E635"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              initial={shouldReduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              animate={
                shouldReduceMotion
                  ? { pathLength: 1, opacity: 1 }
                  : isInView
                    ? { pathLength: 1, opacity: 1 }
                    : { pathLength: 0, opacity: 0 }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      pathLength: { duration: 0.42, delay: TIMING.conn2, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 0.1, delay: TIMING.conn2 },
                    }
              }
            />
            {/* Start circle at Card 02 */}
            <motion.circle
              cx="700"
              cy="120"
              r="4.5"
              fill="#FFFFFF"
              stroke="#A3E635"
              strokeWidth="2"
              initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              animate={
                shouldReduceMotion
                  ? { scale: 1, opacity: 1 }
                  : isInView
                    ? { scale: 1, opacity: 1 }
                    : { scale: 0, opacity: 0 }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.20, delay: TIMING.conn2, ease: 'easeOut' }
              }
            />
            {/* End circle at Card 03 */}
            <motion.circle
              cx="835"
              cy="160"
              r="4.5"
              fill="#FFFFFF"
              stroke="#A3E635"
              strokeWidth="2"
              initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              animate={
                shouldReduceMotion
                  ? { scale: 1, opacity: 1 }
                  : isInView
                    ? { scale: 1, opacity: 1 }
                    : { scale: 0, opacity: 0 }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.20, delay: TIMING.card3, ease: 'easeOut' }
              }
            />

            {/* 3. Connector: 03 (Create) -> 04 (Deliver) */}
            <motion.path
              d="M 940 370 C 960 460, 810 490, 710 430 C 630 380, 560 390, 510 440"
              stroke="#A3E635"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              initial={shouldReduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              animate={
                shouldReduceMotion
                  ? { pathLength: 1, opacity: 1 }
                  : isInView
                    ? { pathLength: 1, opacity: 1 }
                    : { pathLength: 0, opacity: 0 }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      pathLength: { duration: 0.42, delay: TIMING.conn3, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 0.1, delay: TIMING.conn3 },
                    }
              }
            />
            {/* Start circle at Card 03 */}
            <motion.circle
              cx="940"
              cy="370"
              r="4.5"
              fill="#FFFFFF"
              stroke="#A3E635"
              strokeWidth="2"
              initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              animate={
                shouldReduceMotion
                  ? { scale: 1, opacity: 1 }
                  : isInView
                    ? { scale: 1, opacity: 1 }
                    : { scale: 0, opacity: 0 }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.20, delay: TIMING.conn3, ease: 'easeOut' }
              }
            />
            {/* End circle at Card 04 */}
            <motion.circle
              cx="510"
              cy="440"
              r="4.5"
              fill="#FFFFFF"
              stroke="#A3E635"
              strokeWidth="2"
              initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              animate={
                shouldReduceMotion
                  ? { scale: 1, opacity: 1 }
                  : isInView
                    ? { scale: 1, opacity: 1 }
                    : { scale: 0, opacity: 0 }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.20, delay: TIMING.card4, ease: 'easeOut' }
              }
            />

            {/* 4. Connector: 04 (Deliver) -> 05 (Review) with Loop */}
            <motion.path
              d="M 540 580 C 580 545, 615 545, 605 585 C 595 615, 615 620, 645 605"
              stroke="#A3E635"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              initial={shouldReduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              animate={
                shouldReduceMotion
                  ? { pathLength: 1, opacity: 1 }
                  : isInView
                    ? { pathLength: 1, opacity: 1 }
                    : { pathLength: 0, opacity: 0 }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      pathLength: { duration: 0.42, delay: TIMING.conn4, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 0.1, delay: TIMING.conn4 },
                    }
              }
            />
            {/* Start circle at Card 04 */}
            <motion.circle
              cx="540"
              cy="580"
              r="4.5"
              fill="#FFFFFF"
              stroke="#A3E635"
              strokeWidth="2"
              initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              animate={
                shouldReduceMotion
                  ? { scale: 1, opacity: 1 }
                  : isInView
                    ? { scale: 1, opacity: 1 }
                    : { scale: 0, opacity: 0 }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.20, delay: TIMING.conn4, ease: 'easeOut' }
              }
            />
            {/* End circle at Card 05 */}
            <motion.circle
              cx="645"
              cy="605"
              r="4.5"
              fill="#FFFFFF"
              stroke="#A3E635"
              strokeWidth="2"
              initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              animate={
                shouldReduceMotion
                  ? { scale: 1, opacity: 1 }
                  : isInView
                    ? { scale: 1, opacity: 1 }
                    : { scale: 0, opacity: 0 }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.20, delay: TIMING.card5, ease: 'easeOut' }
              }
            />
          </svg>

          {/* Tier 1 Floating Cards (01, 02, 03) */}
          <div className="relative z-10 grid grid-cols-3 gap-8 xl:gap-12 mb-10">

            {/* 01 — UNDERSTAND (Left Tier 1) */}
            <div className="pt-10 flex justify-center">
              <ProcessCard
                step={steps[0] || processSteps[0]}
                entranceDelay={TIMING.card1}
                isInView={isInView}
                shouldReduceMotion={shouldReduceMotion}
              />
            </div>

            {/* 02 — DEFINE (Center Tier 1 - Elevated) */}
            <div className="-mt-4 flex justify-center">
              <ProcessCard
                step={steps[1] || processSteps[1]}
                entranceDelay={TIMING.card2}
                isInView={isInView}
                shouldReduceMotion={shouldReduceMotion}
              />
            </div>

            {/* 03 — CREATE (Right Tier 1) */}
            <div className="pt-8 flex justify-center">
              <ProcessCard
                step={steps[2] || processSteps[2]}
                entranceDelay={TIMING.card3}
                isInView={isInView}
                shouldReduceMotion={shouldReduceMotion}
              />
            </div>

          </div>

          {/* Tier 2 Floating Cards (04, 05) */}
          <div className="relative z-10 grid grid-cols-2 max-w-3xl mx-auto gap-12 xl:gap-16">

            {/* 04 — DELIVER (Center-Left Tier 2) */}
            <div className="flex justify-end pr-2">
              <ProcessCard
                step={steps[3] || processSteps[3]}
                entranceDelay={TIMING.card4}
                isInView={isInView}
                shouldReduceMotion={shouldReduceMotion}
              />
            </div>

            {/* 05 — REVIEW (Center-Right Tier 2) */}
            <div className="pt-6 flex justify-start pl-2">
              <ProcessCard
                step={steps[4] || processSteps[4]}
                entranceDelay={TIMING.card5}
                isInView={isInView}
                shouldReduceMotion={shouldReduceMotion}
              />
            </div>

          </div>

        </div>

        {/* ===================================================
            MOBILE & TABLET STAGGERED WINDING PATH (< 1024px)
            Matches Desktop View Composition with Compact Sized Cards
           =================================================== */}
        <div className="lg:hidden relative max-w-sm xs:max-w-md mx-auto px-2">

          {/* Subtle Ambient Soft Green Tint Behind Mobile Cards */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-6 -inset-y-8 rounded-full blur-[80px] opacity-70 z-0"
            style={{
              background: `
                radial-gradient(
                  ellipse 85% 70% at 50% 50%,
                  rgba(163, 230, 53, 0.16) 0%,
                  rgba(190, 242, 100, 0.08) 50%,
                  transparent 80%
                )
              `,
            }}
          />

          <div className="flex flex-col items-center relative z-10 w-full">
            {/* Step 01 — UNDERSTAND (Shifted Left) */}
            <div className="w-full flex justify-start pl-1 xs:pl-3">
              <MobileProcessCard
                step={steps[0] || processSteps[0]}
                entranceDelay={0.0}
                isInView={isInView}
                shouldReduceMotion={shouldReduceMotion}
              />
            </div>

            {/* Connector 1: 01 (left) -> 02 (right) with curved loop */}
            <div className="w-full h-16 relative -my-2.5 z-0 pointer-events-none">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 340 64" fill="none">
                <motion.path
                  d="M 180 0 C 240 10, 265 26, 240 40 C 215 52, 175 32, 150 64"
                  stroke="#A3E635"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  initial={shouldReduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                  animate={
                    shouldReduceMotion
                      ? { pathLength: 1, opacity: 1 }
                      : isInView
                        ? { pathLength: 1, opacity: 1 }
                        : { pathLength: 0, opacity: 0 }
                  }
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : {
                          pathLength: { duration: 0.42, delay: 0.35, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.1, delay: 0.35 },
                        }
                  }
                />
                <motion.circle
                  cx="180"
                  cy="0"
                  r="4"
                  fill="#FFFFFF"
                  stroke="#A3E635"
                  strokeWidth="2"
                  initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  animate={
                    shouldReduceMotion
                      ? { scale: 1, opacity: 1 }
                      : isInView
                        ? { scale: 1, opacity: 1 }
                        : { scale: 0, opacity: 0 }
                  }
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2, delay: 0.35, ease: 'easeOut' }}
                />
                <motion.circle
                  cx="150"
                  cy="64"
                  r="4"
                  fill="#FFFFFF"
                  stroke="#A3E635"
                  strokeWidth="2"
                  initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  animate={
                    shouldReduceMotion
                      ? { scale: 1, opacity: 1 }
                      : isInView
                        ? { scale: 1, opacity: 1 }
                        : { scale: 0, opacity: 0 }
                  }
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2, delay: 0.7, ease: 'easeOut' }}
                />
              </svg>
            </div>

            {/* Step 02 — DEFINE (Shifted Right) */}
            <div className="w-full flex justify-end pr-1 xs:pr-3">
              <MobileProcessCard
                step={steps[1] || processSteps[1]}
                entranceDelay={0.7}
                isInView={isInView}
                shouldReduceMotion={shouldReduceMotion}
              />
            </div>

            {/* Connector 2: 02 (right) -> 03 (left) with curved loop */}
            <div className="w-full h-16 relative -my-2.5 z-0 pointer-events-none">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 340 64" fill="none">
                <motion.path
                  d="M 160 0 C 100 10, 75 26, 100 40 C 125 52, 165 32, 190 64"
                  stroke="#A3E635"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  initial={shouldReduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                  animate={
                    shouldReduceMotion
                      ? { pathLength: 1, opacity: 1 }
                      : isInView
                        ? { pathLength: 1, opacity: 1 }
                        : { pathLength: 0, opacity: 0 }
                  }
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : {
                          pathLength: { duration: 0.42, delay: 1.05, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.1, delay: 1.05 },
                        }
                  }
                />
                <motion.circle
                  cx="160"
                  cy="0"
                  r="4"
                  fill="#FFFFFF"
                  stroke="#A3E635"
                  strokeWidth="2"
                  initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  animate={
                    shouldReduceMotion
                      ? { scale: 1, opacity: 1 }
                      : isInView
                        ? { scale: 1, opacity: 1 }
                        : { scale: 0, opacity: 0 }
                  }
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2, delay: 1.05, ease: 'easeOut' }}
                />
                <motion.circle
                  cx="190"
                  cy="64"
                  r="4"
                  fill="#FFFFFF"
                  stroke="#A3E635"
                  strokeWidth="2"
                  initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  animate={
                    shouldReduceMotion
                      ? { scale: 1, opacity: 1 }
                      : isInView
                        ? { scale: 1, opacity: 1 }
                        : { scale: 0, opacity: 0 }
                  }
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2, delay: 1.4, ease: 'easeOut' }}
                />
              </svg>
            </div>

            {/* Step 03 — CREATE (Shifted Left) */}
            <div className="w-full flex justify-start pl-1 xs:pl-3">
              <MobileProcessCard
                step={steps[2] || processSteps[2]}
                entranceDelay={1.4}
                isInView={isInView}
                shouldReduceMotion={shouldReduceMotion}
              />
            </div>

            {/* Connector 3: 03 (left) -> 04 (right) with curved loop */}
            <div className="w-full h-16 relative -my-2.5 z-0 pointer-events-none">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 340 64" fill="none">
                <motion.path
                  d="M 180 0 C 240 10, 265 26, 240 40 C 215 52, 175 32, 150 64"
                  stroke="#A3E635"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  initial={shouldReduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                  animate={
                    shouldReduceMotion
                      ? { pathLength: 1, opacity: 1 }
                      : isInView
                        ? { pathLength: 1, opacity: 1 }
                        : { pathLength: 0, opacity: 0 }
                  }
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : {
                          pathLength: { duration: 0.42, delay: 1.75, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.1, delay: 1.75 },
                        }
                  }
                />
                <motion.circle
                  cx="180"
                  cy="0"
                  r="4"
                  fill="#FFFFFF"
                  stroke="#A3E635"
                  strokeWidth="2"
                  initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  animate={
                    shouldReduceMotion
                      ? { scale: 1, opacity: 1 }
                      : isInView
                        ? { scale: 1, opacity: 1 }
                        : { scale: 0, opacity: 0 }
                  }
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2, delay: 1.75, ease: 'easeOut' }}
                />
                <motion.circle
                  cx="150"
                  cy="64"
                  r="4"
                  fill="#FFFFFF"
                  stroke="#A3E635"
                  strokeWidth="2"
                  initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  animate={
                    shouldReduceMotion
                      ? { scale: 1, opacity: 1 }
                      : isInView
                        ? { scale: 1, opacity: 1 }
                        : { scale: 0, opacity: 0 }
                  }
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2, delay: 2.1, ease: 'easeOut' }}
                />
              </svg>
            </div>

            {/* Step 04 — DELIVER (Shifted Right) */}
            <div className="w-full flex justify-end pr-1 xs:pr-3">
              <MobileProcessCard
                step={steps[3] || processSteps[3]}
                entranceDelay={2.1}
                isInView={isInView}
                shouldReduceMotion={shouldReduceMotion}
              />
            </div>

            {/* Connector 4: 04 (right) -> 05 (center) with soft curve */}
            <div className="w-full h-16 relative -my-2.5 z-0 pointer-events-none">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 340 64" fill="none">
                <motion.path
                  d="M 160 0 C 130 15, 140 40, 170 64"
                  stroke="#A3E635"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  initial={shouldReduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                  animate={
                    shouldReduceMotion
                      ? { pathLength: 1, opacity: 1 }
                      : isInView
                        ? { pathLength: 1, opacity: 1 }
                        : { pathLength: 0, opacity: 0 }
                  }
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : {
                          pathLength: { duration: 0.42, delay: 2.45, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.1, delay: 2.45 },
                        }
                  }
                />
                <motion.circle
                  cx="160"
                  cy="0"
                  r="4"
                  fill="#FFFFFF"
                  stroke="#A3E635"
                  strokeWidth="2"
                  initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  animate={
                    shouldReduceMotion
                      ? { scale: 1, opacity: 1 }
                      : isInView
                        ? { scale: 1, opacity: 1 }
                        : { scale: 0, opacity: 0 }
                  }
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2, delay: 2.45, ease: 'easeOut' }}
                />
                <motion.circle
                  cx="170"
                  cy="64"
                  r="4"
                  fill="#FFFFFF"
                  stroke="#A3E635"
                  strokeWidth="2"
                  initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  animate={
                    shouldReduceMotion
                      ? { scale: 1, opacity: 1 }
                      : isInView
                        ? { scale: 1, opacity: 1 }
                        : { scale: 0, opacity: 0 }
                  }
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2, delay: 2.8, ease: 'easeOut' }}
                />
              </svg>
            </div>

            {/* Step 05 — REVIEW (Centered) */}
            <div className="w-full flex justify-center">
              <MobileProcessCard
                step={steps[4] || processSteps[4]}
                entranceDelay={2.8}
                isInView={isInView}
                shouldReduceMotion={shouldReduceMotion}
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

// =========================================================================
// Individual Process Card (Noticeable Dynamic Jump & Controlled Landing)
// =========================================================================
function ProcessCard({
  step,
  entranceDelay,
  isInView,
  shouldReduceMotion,
}: {
  step: ProcessStep;
  entranceDelay: number;
  isInView: boolean;
  shouldReduceMotion: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Subtle 3D tilt (max ~3deg)
    const rotateX = ((y / rect.height) - 0.5) * -6;
    const rotateY = ((x / rect.width) - 0.5) * 6;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 130, scale: 0.965 }
      }
      animate={
        shouldReduceMotion
          ? { opacity: 1, y: 0, scale: 1 }
          : isInView
            ? {
                opacity: [0, 1, 1, 1, 1],
                y: [130, -22, 7, -4, 0],
                scale: [0.965, 1.02, 0.995, 1.005, 1],
              }
            : { opacity: 0, y: 130, scale: 0.965 }
      }
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : {
              duration: 0.62,
              delay: entranceDelay,
              times: [0, 0.38, 0.62, 0.82, 1],
              ease: ['easeOut', 'easeInOut', 'easeInOut', 'easeOut'],
            }
      }
      className="will-change-transform"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotate(${step.rotation}deg) ${
            isHovered
              ? `translateY(-8px) scale(1.025) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
              : 'translateY(0px) scale(1)'
          }`,
        }}
        className="relative w-[300px] xl:w-[325px] h-[360px] xl:h-[390px] rounded-[30px] p-7 xl:p-8 bg-[#FFFFFF] hover:bg-[#FFFFFF] border border-black/[0.05] shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.12)] transition-all duration-400 ease-out flex flex-col justify-between select-none cursor-default will-change-transform"
      >
        {/* Top: Very Large Lightweight Step Number */}
        <div>
          <span className="font-sans text-5xl xl:text-6xl font-light text-[#111111] tracking-tight leading-none block">
            {step.number}
          </span>
        </div>

        {/* Bottom: Title & Approved Process Description */}
        <div>
          <h3 className="font-sans text-xl xl:text-2xl font-normal text-[#111111] tracking-tight mb-2">
            {step.title}
          </h3>
          <p className="font-sans text-xs xl:text-[13px] text-[#71717A] font-normal leading-relaxed">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// =========================================================================
// Mobile Process Card (Compact, Minimized Size, Matches Desktop Style)
// =========================================================================
function MobileProcessCard({
  step,
  entranceDelay,
  isInView,
  shouldReduceMotion,
}: {
  step: ProcessStep;
  entranceDelay: number;
  isInView: boolean;
  shouldReduceMotion: boolean;
}) {
  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 50, scale: 0.96 }
      }
      animate={
        shouldReduceMotion
          ? { opacity: 1, y: 0, scale: 1 }
          : isInView
            ? {
                opacity: [0, 1, 1, 1, 1],
                y: [50, -10, 3, -1, 0],
                scale: [0.96, 1.015, 0.995, 1.002, 1],
              }
            : { opacity: 0, y: 50, scale: 0.96 }
      }
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : {
              duration: 0.55,
              delay: entranceDelay,
              times: [0, 0.38, 0.62, 0.82, 1],
              ease: ['easeOut', 'easeInOut', 'easeInOut', 'easeOut'],
            }
      }
      className="will-change-transform"
    >
      <div
        style={{
          transform: `perspective(800px) rotate(${step.rotation}deg)`,
        }}
        className="relative w-[235px] xs:w-[255px] h-[210px] xs:h-[220px] rounded-[24px] p-5 xs:p-5.5 bg-[#FFFFFF] border border-black/[0.05] shadow-[0_14px_36px_rgba(0,0,0,0.06)] flex flex-col justify-between select-none will-change-transform"
      >
        {/* Top: Step Number */}
        <div>
          <span className="font-sans text-4xl xs:text-5xl font-light text-[#111111] tracking-tight leading-none block">
            {step.number}
          </span>
        </div>

        {/* Bottom: Title & Description */}
        <div>
          <h3 className="font-sans text-base xs:text-lg font-normal text-[#111111] tracking-tight mb-1">
            {step.title}
          </h3>
          <p className="font-sans text-[11px] xs:text-[11.5px] text-[#71717A] font-normal leading-relaxed line-clamp-3">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
