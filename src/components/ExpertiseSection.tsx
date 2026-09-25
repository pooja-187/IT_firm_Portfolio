'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap } from 'lucide-react';

interface ExpertisePillData {
  id: string;
  name: string;
  iconBg: string;
  rotation: number;
  offsetClass: string;
  side: 'left' | 'right';
}

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

  const pills: ExpertisePillData[] = [
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
          start: 'top 75%',
          once: true,
        },
      });

      // 1. Reveal Label ("Expertise")
      if (labelRef.current) {
        tl.fromTo(
          labelRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        );
      }

      // 2. Central Statement: 3 lines progressive arrival
      const lines = [line1Ref.current, line2Ref.current, line3Ref.current].filter(Boolean);
      tl.fromTo(
        lines,
        {
          opacity: 0,
          y: 35,
          filter: 'blur(8px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.18,
          ease: 'power3.out',
        },
        '-=0.2'
      );

      // 3. Strict 1-by-1 Sequential Pill Entrance:
      // Order: 1 (UI/UX) -> 2 (Software Dev) -> 3 (App Dev) -> 4 (Performance Mkt) -> 5 (Ethical Hacking)
      const pillDuration = 0.8;
      const sequenceGap = '-=0.56'; // Leaves ~0.24s between start of each consecutive pill for a clear flowing sequence

      // Pill 1: UI/UX Design (Left)
      if (pill1Ref.current) {
        tl.fromTo(
          pill1Ref.current,
          { opacity: 0, x: -120, scale: 0.96 },
          { opacity: 1, x: 0, scale: 1, duration: pillDuration, ease: 'power3.out' },
          '+=0.1'
        );
      }

      // Pill 2: Software Development (Left)
      if (pill2Ref.current) {
        tl.fromTo(
          pill2Ref.current,
          { opacity: 0, x: -120, scale: 0.96 },
          { opacity: 1, x: 0, scale: 1, duration: pillDuration, ease: 'power3.out' },
          sequenceGap
        );
      }

      // Pill 3: App Development (Left)
      if (pill3Ref.current) {
        tl.fromTo(
          pill3Ref.current,
          { opacity: 0, x: -120, scale: 0.96 },
          { opacity: 1, x: 0, scale: 1, duration: pillDuration, ease: 'power3.out' },
          sequenceGap
        );
      }

      // Pill 4: Performance Marketing (Right)
      if (pill4Ref.current) {
        tl.fromTo(
          pill4Ref.current,
          { opacity: 0, x: 120, scale: 0.96 },
          { opacity: 1, x: 0, scale: 1, duration: pillDuration, ease: 'power3.out' },
          sequenceGap
        );
      }

      // Pill 5: Ethical Hacking (Right)
      if (pill5Ref.current) {
        tl.fromTo(
          pill5Ref.current,
          { opacity: 0, x: 120, scale: 0.96 },
          { opacity: 1, x: 0, scale: 1, duration: pillDuration, ease: 'power3.out' },
          sequenceGap
        );
      }

      // Mobile Responsive Staggered Entrance (1-to-5 sequential)
      const validMobilePills = mobilePillsRef.current.filter(Boolean);
      if (validMobilePills.length > 0) {
        tl.fromTo(
          validMobilePills,
          { opacity: 0, y: 25, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.18, ease: 'power3.out' },
          '<0.15'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="expertise"
      aria-labelledby="expertise-heading"
      className="relative w-full bg-white py-24 sm:py-32 lg:py-40 overflow-hidden selection:bg-lime-200"
    >
      {/* Saturated Ambient Diffused Lime-Green Studio Light (Matching Hero & Selected Work) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(
              ellipse 75% 55% at 50% 50%,
              rgba(190, 235, 105, 0.32) 0%,
              rgba(190, 235, 105, 0.20) 25%,
              rgba(190, 235, 105, 0.10) 48%,
              rgba(190, 235, 105, 0.04) 65%,
              transparent 80%
            ),
            radial-gradient(
              ellipse 95% 70% at 50% 48%,
              rgba(215, 242, 165, 0.15) 0%,
              transparent 72%
            )
          `,
          maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
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

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Editorial Label */}
        <div ref={labelRef} className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-slate-200/80 shadow-sm backdrop-blur-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16] animate-pulse" />
            <span className="font-sans text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#64748B]">
              02 — EXPERTISE
            </span>
          </div>
        </div>

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

          {/* Central Statement Column (SEO-Structured H2) */}
          <div className="text-center px-2 sm:px-4">
            <h2
              id="expertise-heading"
              className="font-sans font-normal tracking-[-0.025em] text-[#111315] text-3xl sm:text-4xl md:text-[2.75rem] lg:text-[3.5rem] xl:text-[4rem] leading-[1.2] sm:leading-[1.22] lg:leading-[1.24]"
            >
              <span ref={line1Ref} className="block text-[#111315]">
                Design expertise.
              </span>
              <span ref={line2Ref} className="block text-[#181C20] mt-1 sm:mt-2">
                Marketing perspective.
              </span>
              <span ref={line3Ref} className="block text-[#717A84] mt-1 sm:mt-2">
                Founder-led execution.
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

        {/* Mobile Responsive Staggered Layout (Sequential 1-to-5 order) */}
        <div className="md:hidden mt-10 flex flex-wrap justify-center gap-3 px-2">
          {pills.map((pill, idx) => (
            <div
              key={`mobile-${pill.id}`}
              ref={(el) => {
                mobilePillsRef.current[idx] = el;
              }}
            >
              <div style={{ transform: `rotate(${pill.rotation * 0.75}deg)` }} className="relative group w-fit">
                {/* External Ambient Green Glow */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-3 rounded-full pointer-events-none opacity-0 group-active:opacity-100 scale-90 group-active:scale-105 transition-all duration-200 ease-out z-0 bg-[radial-gradient(ellipse_at_center,rgba(162,246,36,0.45)_0%,rgba(184,252,60,0.22)_48%,transparent_72%)] blur-lg"
                />
                <div className="relative z-10 inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white border border-slate-200/80 shadow-[0_6px_20px_rgba(0,0,0,0.05)] active:scale-95 transition-all duration-200 select-none">
                  <span
                    className={`flex items-center justify-center w-5 h-5 rounded-full ${pill.iconBg} shadow-sm shrink-0`}
                  >
                    <Zap className="w-3 h-3 text-white fill-white" />
                  </span>
                  <span className="font-sans text-xs sm:text-sm font-medium text-[#181C20]">
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
