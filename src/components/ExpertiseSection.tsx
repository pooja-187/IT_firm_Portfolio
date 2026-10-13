'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap } from 'lucide-react';
import { EditorialGridLines, EditorialRule } from '@/components/ui/EditorialGrid';
import { contentService } from '@/services/ContentService';
import { STORAGE_KEYS } from '@/services/StorageService';
import { ExpertiseSectionData } from '@/types/portfolio';

interface ExpertisePillData {
  id: string;
  name: string;
  iconBg: string;
  rotation: number;
  offsetClass: string;
  side: 'left' | 'right';
}

const defaultPills: ExpertisePillData[] = [
  {
    id: 'ui-ux',
    name: 'UI/UX Design',
    iconBg: 'bg-[#FF6B00]',
    rotation: -4.5,
    offsetClass: 'self-start',
    side: 'left',
  },
  {
    id: 'software-dev',
    name: 'Software Development',
    iconBg: 'bg-[#00A3FF]',
    rotation: 3.5,
    offsetClass: 'self-end translate-x-2 xl:translate-x-6',
    side: 'left',
  },
  {
    id: 'app-dev',
    name: 'App Development',
    iconBg: 'bg-[#262626]',
    rotation: -3.5,
    offsetClass: 'self-start -translate-x-2',
    side: 'left',
  },
  {
    id: 'performance-mkt',
    name: 'Performance Marketing',
    iconBg: 'bg-[#FFD600]',
    rotation: 4,
    offsetClass: 'self-end translate-x-2',
    side: 'right',
  },
  {
    id: 'ethical-hacking',
    name: 'Ethical Hacking',
    iconBg: 'bg-[#00E676]',
    rotation: -4,
    offsetClass: 'self-start -translate-x-2 xl:-translate-x-6',
    side: 'right',
  },
];

const defaultExpertiseData: ExpertiseSectionData = {
  statementLine1: 'Design expertise.',
  statementLine2: 'Marketing perspective.',
  statementLine3: 'Founder-led execution.',
  pills: defaultPills.map((p, idx) => ({
    id: p.id,
    name: p.name,
    iconBg: p.iconBg,
    rotation: p.rotation,
    side: p.side,
    displayOrder: idx + 1,
    isActive: true,
  })),
};

export default function ExpertiseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);

  // Individual refs for strictly ordered 1-to-5 sequential entrance
  const pill1Ref = useRef<HTMLDivElement>(null); // 1. UI/UX Design (Left)
  const pill2Ref = useRef<HTMLDivElement>(null); // 2. Software Development (Left)
  const pill3Ref = useRef<HTMLDivElement>(null); // 3. App Development (Left)
  const pill4Ref = useRef<HTMLDivElement>(null); // 4. Performance Marketing (Right)
  const pill5Ref = useRef<HTMLDivElement>(null); // 5. Ethical Hacking (Right)

  // Mobile pills ref
  const mobilePillsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [expertise, setExpertise] = useState<ExpertiseSectionData>(defaultExpertiseData);

  useEffect(() => {
    const loaded = contentService.getExpertise();
    if (loaded) setExpertise(loaded);

    const unsubscribe = contentService.subscribe(STORAGE_KEYS.EXPERTISE, (updated: ExpertiseSectionData) => {
      if (updated) setExpertise(updated);
    });

    return () => unsubscribe();
  }, []);

  const pills: ExpertisePillData[] = defaultPills.map((dp, idx) => {
    const matched = expertise.pills?.[idx];
    return {
      ...dp,
      name: matched?.name || dp.name,
      iconBg: matched?.iconBg || dp.iconBg,
      rotation: matched?.rotation ?? dp.rotation,
    };
  });

  const leftPills = pills.filter((p) => p.side === 'left');
  const rightPills = pills.filter((p) => p.side === 'right');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      // 1. Reveal Label ("Expertise")
      if (labelRef.current) {
        tl.fromTo(
          labelRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
        );
      }

      // 2. Central Statement: 3 lines progressive arrival
      const lines = [line1Ref.current, line2Ref.current, line3Ref.current].filter(Boolean);
      tl.fromTo(
        lines,
        {
          opacity: 0,
          y: 30,
          filter: 'blur(6px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.55,
          stagger: 0.10,
          ease: 'power3.out',
        },
        '-=0.15'
      );

      // 3. Fast Sequential Pill Entrance (Starts promptly alongside central statement):
      // Order: 1 (UI/UX) -> 2 (Software Dev) -> 3 (App Dev) -> 4 (Performance Mkt) -> 5 (Ethical Hacking)
      const pillDuration = 0.42;
      const sequenceGap = '-=0.30'; // Fast ~0.12s cadence between each consecutive pill

      // Pill 1: UI/UX Design (Left)
      if (pill1Ref.current) {
        tl.fromTo(
          pill1Ref.current,
          { opacity: 0, x: -65, scale: 0.96 },
          { opacity: 1, x: 0, scale: 1, duration: pillDuration, ease: 'power3.out' },
          '-=0.35'
        );
      }

      // Pill 2: Software Development (Left)
      if (pill2Ref.current) {
        tl.fromTo(
          pill2Ref.current,
          { opacity: 0, x: -65, scale: 0.96 },
          { opacity: 1, x: 0, scale: 1, duration: pillDuration, ease: 'power3.out' },
          sequenceGap
        );
      }

      // Pill 3: App Development (Left)
      if (pill3Ref.current) {
        tl.fromTo(
          pill3Ref.current,
          { opacity: 0, x: -65, scale: 0.96 },
          { opacity: 1, x: 0, scale: 1, duration: pillDuration, ease: 'power3.out' },
          sequenceGap
        );
      }

      // Pill 4: Performance Marketing (Right)
      if (pill4Ref.current) {
        tl.fromTo(
          pill4Ref.current,
          { opacity: 0, x: 65, scale: 0.96 },
          { opacity: 1, x: 0, scale: 1, duration: pillDuration, ease: 'power3.out' },
          sequenceGap
        );
      }

      // Pill 5: Ethical Hacking (Right)
      if (pill5Ref.current) {
        tl.fromTo(
          pill5Ref.current,
          { opacity: 0, x: 65, scale: 0.96 },
          { opacity: 1, x: 0, scale: 1, duration: pillDuration, ease: 'power3.out' },
          sequenceGap
        );
      }

      // Mobile Responsive Alternating Entrance (Left -> Right -> Left -> Right -> Left)
      const validMobilePills = mobilePillsRef.current.filter(Boolean);
      if (validMobilePills.length > 0) {
        validMobilePills.forEach((pillEl, idx) => {
          if (!pillEl) return;
          const fromLeft = idx % 2 === 0; // 0, 2, 4 from Left; 1, 3 from Right
          const startX = fromLeft ? -140 : 140;

          tl.fromTo(
            pillEl,
            {
              opacity: 0,
              x: startX,
              scale: 0.9,
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.58,
              ease: 'power3.out',
              onComplete: () => {
                // Continuous smooth organic floating motion for each mobile button
                gsap.to(pillEl, {
                  y: idx % 2 === 0 ? -5 : 5,
                  rotation: `+=${idx % 2 === 0 ? 1.6 : -1.6}`,
                  duration: 2.2 + idx * 0.35,
                  repeat: -1,
                  yoyo: true,
                  ease: 'sine.inOut',
                });
              },
            },
            idx === 0 ? '<0.1' : '-=0.42'
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="expertise"
      aria-labelledby="expertise-heading"
      className="relative w-full bg-white pt-10 sm:pt-32 pb-20 sm:pb-32 lg:py-40 overflow-hidden selection:bg-lime-200"
    >
      {/* Continuous Soft Ambient Seam Blend — Top of Expertise (Mirroring Hero Bottom) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 right-0 h-64 sm:h-72 z-0 overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 110% 100% at 50% 0%, rgba(162, 246, 36, 0.22) 0%, rgba(184, 252, 60, 0.14) 35%, rgba(214, 255, 115, 0.05) 65%, transparent 85%),
            radial-gradient(circle 280px at 20% 10%, rgba(150, 245, 30, 0.10) 0%, transparent 70%),
            radial-gradient(circle 280px at 80% 10%, rgba(150, 245, 30, 0.08) 0%, transparent 70%)
          `,
        }}
      />

      {/* Saturated Ambient Diffused Lime-Green Studio Light (Matching Hero & Selected Work) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(
              ellipse 90% 70% at 50% 35%,
              rgba(162, 246, 36, 0.38) 0%,
              rgba(184, 252, 60, 0.24) 30%,
              rgba(214, 255, 115, 0.10) 58%,
              transparent 82%
            ),
            radial-gradient(
              circle 500px at 50% 38%,
              rgba(150, 245, 30, 0.20) 0%,
              transparent 72%
            )
          `,
          maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.4) 6%, black 16%, black 85%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.4) 6%, black 16%, black 85%, transparent 100%)",
        }}
      >
        {/* Soft Blurred Depth Glow Behind Heading */}
        <div
          className="absolute"
          style={{
            width: "60%",
            height: "50%",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(190, 235, 105, 0.14)",
            filter: "blur(100px)",
            borderRadius: "50%",
          }}
        />
      </div>

      {/* Level 2 Editorial Grid Lines Foundation */}
      <EditorialGridLines level={2} className="z-0" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Editorial Label */}
        <div ref={labelRef} className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-slate-200/80 shadow-sm backdrop-blur-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16] animate-pulse" />
            <span className="font-sans text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#64748B]">
              02 — EXPERTISE
            </span>
          </div>
        </div>

        {/* Subtle Editorial Rule framing the 3-column flanking stage */}
        <EditorialRule level={2} className="mb-8 sm:mb-12" withCorners={true} />

        {/* 3-Column Flanking Stage: Zero Collision, Zero Overlap, Perfect Organic Alignment */}
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr_220px] lg:grid-cols-[260px_1fr_260px] xl:grid-cols-[290px_1fr_290px] items-center gap-6 lg:gap-8 min-h-[380px] sm:min-h-[440px]">
          
          {/* Left Flanking Column (Pills 1, 2, 3) */}
          <div className="hidden md:flex flex-col justify-center gap-10 lg:gap-14">
            
            {/* Pill 1: UI/UX Design */}
            <div ref={pill1Ref} className={`w-fit ${leftPills[0].offsetClass}`}>
              <div style={{ transform: `rotate(${leftPills[0].rotation}deg)` }} className="relative group w-fit">
                {/* External Ambient Green Glow (Behind Pill) */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-3.5 sm:-inset-5 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-105 transition-all duration-300 ease-out z-0 bg-[radial-gradient(ellipse_at_center,rgba(162,246,36,0.45)_0%,rgba(184,252,60,0.22)_48%,transparent_72%)] blur-xl"
                />
                {/* Clean White Pill (Above Glow) */}
                <div className="relative z-10 inline-flex items-center gap-3 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-white border border-slate-200/80 shadow-[0_8px_24px_rgba(0,0,0,0.05)] group-hover:scale-[1.08] group-hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out cursor-default select-none will-change-transform">
                  <span
                    className={`flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full ${leftPills[0].iconBg} shadow-sm shrink-0 transition-transform duration-300 ease-out group-hover:scale-105`}
                  >
                    <Zap className="w-3.5 h-3.5 text-white fill-white" />
                  </span>
                  <span className="font-sans text-sm sm:text-[15px] xl:text-base font-medium text-[#181C20] tracking-tight whitespace-nowrap">
                    {leftPills[0].name}
                  </span>
                </div>
              </div>
            </div>

            {/* Pill 2: Software Development */}
            <div ref={pill2Ref} className={`w-fit ${leftPills[1].offsetClass}`}>
              <div style={{ transform: `rotate(${leftPills[1].rotation}deg)` }} className="relative group w-fit">
                {/* External Ambient Green Glow (Behind Pill) */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-3.5 sm:-inset-5 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-105 transition-all duration-300 ease-out z-0 bg-[radial-gradient(ellipse_at_center,rgba(162,246,36,0.45)_0%,rgba(184,252,60,0.22)_48%,transparent_72%)] blur-xl"
                />
                {/* Clean White Pill (Above Glow) */}
                <div className="relative z-10 inline-flex items-center gap-3 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-white border border-slate-200/80 shadow-[0_8px_24px_rgba(0,0,0,0.05)] group-hover:scale-[1.08] group-hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out cursor-default select-none will-change-transform">
                  <span
                    className={`flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full ${leftPills[1].iconBg} shadow-sm shrink-0 transition-transform duration-300 ease-out group-hover:scale-105`}
                  >
                    <Zap className="w-3.5 h-3.5 text-white fill-white" />
                  </span>
                  <span className="font-sans text-sm sm:text-[15px] xl:text-base font-medium text-[#181C20] tracking-tight whitespace-nowrap">
                    {leftPills[1].name}
                  </span>
                </div>
              </div>
            </div>

            {/* Pill 3: App Development */}
            <div ref={pill3Ref} className={`w-fit ${leftPills[2].offsetClass}`}>
              <div style={{ transform: `rotate(${leftPills[2].rotation}deg)` }} className="relative group w-fit">
                {/* External Ambient Green Glow (Behind Pill) */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-3.5 sm:-inset-5 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-105 transition-all duration-300 ease-out z-0 bg-[radial-gradient(ellipse_at_center,rgba(162,246,36,0.45)_0%,rgba(184,252,60,0.22)_48%,transparent_72%)] blur-xl"
                />
                {/* Clean White Pill (Above Glow) */}
                <div className="relative z-10 inline-flex items-center gap-3 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-white border border-slate-200/80 shadow-[0_8px_24px_rgba(0,0,0,0.05)] group-hover:scale-[1.08] group-hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out cursor-default select-none will-change-transform">
                  <span
                    className={`flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full ${leftPills[2].iconBg} shadow-sm shrink-0`}
                  >
                    <Zap className="w-3.5 h-3.5 text-white fill-white" />
                  </span>
                  <span className="font-sans text-sm sm:text-[15px] xl:text-base font-medium text-[#181C20] tracking-tight whitespace-nowrap">
                    {leftPills[2].name}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Central Statement Column (SEO-Structured H2) with Dedicated Green Tint */}
          <div className="relative text-center px-2 sm:px-4">
            {/* Luminous Green Tint Glow directly behind the heading */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] xs:w-[380px] sm:w-[500px] md:w-[620px] h-[300px] xs:h-[360px] sm:h-[440px] rounded-full -z-10"
              style={{
                background:
                  'radial-gradient(ellipse 75% 65% at 50% 50%, rgba(162, 246, 36, 0.44) 0%, rgba(184, 252, 60, 0.28) 36%, rgba(214, 255, 115, 0.12) 65%, transparent 82%)',
                filter: 'blur(45px)',
              }}
            />

            <h2
              id="expertise-heading"
              className="font-sans font-normal tracking-[-0.025em] text-[#111315] text-3xl sm:text-4xl md:text-[2.75rem] lg:text-[3.5rem] xl:text-[4rem] leading-[1.2] sm:leading-[1.22] lg:leading-[1.24]"
            >
              <span ref={line1Ref} className="block text-[#111315]">
                {expertise.statementLine1 || "Design expertise."}
              </span>
              <span ref={line2Ref} className="block text-[#181C20] mt-1 sm:mt-2">
                {expertise.statementLine2 || "Marketing perspective."}
              </span>
              <span ref={line3Ref} className="block text-[#717A84] mt-1 sm:mt-2">
                {expertise.statementLine3 || "Founder-led execution."}
              </span>
            </h2>
          </div>

          {/* Right Flanking Column (Pills 4, 5) */}
          <div className="hidden md:flex flex-col justify-center gap-14 lg:gap-20">
            
            {/* Pill 4: Performance Marketing */}
            <div ref={pill4Ref} className={`w-fit ${rightPills[0].offsetClass}`}>
              <div style={{ transform: `rotate(${rightPills[0].rotation}deg)` }} className="relative group w-fit">
                {/* External Ambient Green Glow (Behind Pill) */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-3.5 sm:-inset-5 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-105 transition-all duration-300 ease-out z-0 bg-[radial-gradient(ellipse_at_center,rgba(162,246,36,0.45)_0%,rgba(184,252,60,0.22)_48%,transparent_72%)] blur-xl"
                />
                {/* Clean White Pill (Above Glow) */}
                <div className="relative z-10 inline-flex items-center gap-3 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-white border border-slate-200/80 shadow-[0_8px_24px_rgba(0,0,0,0.05)] group-hover:scale-[1.08] group-hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out cursor-default select-none will-change-transform">
                  <span
                    className={`flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full ${rightPills[0].iconBg} shadow-sm shrink-0 transition-transform duration-300 ease-out group-hover:scale-105`}
                  >
                    <Zap className="w-3.5 h-3.5 text-white fill-white" />
                  </span>
                  <span className="font-sans text-sm sm:text-[15px] xl:text-base font-medium text-[#181C20] tracking-tight whitespace-nowrap">
                    {rightPills[0].name}
                  </span>
                </div>
              </div>
            </div>

            {/* Pill 5: Ethical Hacking */}
            <div ref={pill5Ref} className={`w-fit ${rightPills[1].offsetClass}`}>
              <div style={{ transform: `rotate(${rightPills[1].rotation}deg)` }} className="relative group w-fit">
                {/* External Ambient Green Glow (Behind Pill) */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-3.5 sm:-inset-5 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-105 transition-all duration-300 ease-out z-0 bg-[radial-gradient(ellipse_at_center,rgba(162,246,36,0.45)_0%,rgba(184,252,60,0.22)_48%,transparent_72%)] blur-xl"
                />
                {/* Clean White Pill (Above Glow) */}
                <div className="relative z-10 inline-flex items-center gap-3 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-white border border-slate-200/80 shadow-[0_8px_24px_rgba(0,0,0,0.05)] group-hover:scale-[1.08] group-hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out cursor-default select-none will-change-transform">
                  <span
                    className={`flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full ${rightPills[1].iconBg} shadow-sm shrink-0 transition-transform duration-300 ease-out group-hover:scale-105`}
                  >
                    <Zap className="w-3.5 h-3.5 text-white fill-white" />
                  </span>
                  <span className="font-sans text-sm sm:text-[15px] xl:text-base font-medium text-[#181C20] tracking-tight whitespace-nowrap">
                    {rightPills[1].name}
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Mobile Responsive Staggered Layout (Sequential 1-to-5 order with increased sizing & motion) */}
        <div className="md:hidden mt-8 flex flex-col items-center gap-3.5 px-3 w-full">
          {pills.map((pill, idx) => (
            <div
              key={`mobile-${pill.id}`}
              ref={(el) => {
                mobilePillsRef.current[idx] = el;
              }}
              className="will-change-transform"
            >
              <div
                style={{ transform: `rotate(${pill.rotation * 0.7}deg)` }}
                className="relative group w-fit cursor-pointer"
              >
                {/* External Ambient Green Glow */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-4 rounded-full pointer-events-none opacity-0 group-active:opacity-100 scale-90 group-active:scale-105 transition-all duration-300 ease-out z-0 bg-[radial-gradient(ellipse_at_center,rgba(162,246,36,0.50)_0%,rgba(184,252,60,0.25)_48%,transparent_72%)] blur-xl"
                />
                <div className="relative z-10 inline-flex items-center gap-3.5 px-6 py-3.5 rounded-full bg-white/95 border border-slate-200/90 shadow-[0_8px_24px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.04)] active:scale-95 transition-all duration-200 select-none">
                  <span
                    className={`flex items-center justify-center w-7 h-7 rounded-full ${pill.iconBg} shadow-sm shrink-0`}
                  >
                    <Zap className="w-4 h-4 text-white fill-white" />
                  </span>
                  <span className="font-sans text-[15px] font-semibold text-[#181C20] tracking-tight whitespace-nowrap">
                    {pill.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
