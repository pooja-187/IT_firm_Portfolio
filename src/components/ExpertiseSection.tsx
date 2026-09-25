'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Palette, Code, Smartphone, TrendingUp, ShieldCheck } from 'lucide-react';

interface ExpertisePillData {
  id: string;
  name: string;
  icon: React.ReactNode;
  iconBg: string;
  rotation: number;
  side: 'left' | 'right';
  desktopPos: string;
}

export default function ExpertiseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const leftPillsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rightPillsRef = useRef<(HTMLDivElement | null)[]>([]);

  const pills: ExpertisePillData[] = [
    {
      id: 'ui-ux',
      name: 'UI/UX Design',
      icon: <Palette className="w-4 h-4 text-white" />,
      iconBg: 'bg-[#F97316]', // Vibrant Coral Orange
      rotation: -5,
      side: 'left',
      desktopPos: 'top-[12%] left-[2%] lg:left-[6%]',
    },
    {
      id: 'software-dev',
      name: 'Software Development',
      icon: <Code className="w-4 h-4 text-white" />,
      iconBg: 'bg-[#0284C7]', // Electric Sky Blue
      rotation: 4,
      side: 'left',
      desktopPos: 'top-[44%] left-[0%] lg:left-[3%]',
    },
    {
      id: 'app-dev',
      name: 'App Development',
      icon: <Smartphone className="w-4 h-4 text-white" />,
      iconBg: 'bg-[#334155]', // Slate Graphite
      rotation: -4,
      side: 'left',
      desktopPos: 'top-[76%] left-[4%] lg:left-[8%]',
    },
    {
      id: 'performance-mkt',
      name: 'Performance Marketing',
      icon: <TrendingUp className="w-4 h-4 text-white" />,
      iconBg: 'bg-[#EAB308]', // Amber Gold
      rotation: 4,
      side: 'right',
      desktopPos: 'top-[22%] right-[2%] lg:right-[6%]',
    },
    {
      id: 'ethical-hacking',
      name: 'Ethical Hacking',
      icon: <ShieldCheck className="w-4 h-4 text-white" />,
      iconBg: 'bg-[#84CC16]', // Lime Emerald
      rotation: -5,
      side: 'right',
      desktopPos: 'top-[62%] right-[4%] lg:right-[8%]',
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

      // 1. Reveal Label
      if (labelRef.current) {
        tl.fromTo(
          labelRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        );
      }

      // 2. Central Statement progressive lines arrival
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
          duration: 0.85,
          stagger: 0.16,
          ease: 'power3.out',
        },
        '-=0.3'
      );

      // 3. Left Pills Arrival from Left (preserving tilt)
      const validLeftPills = leftPillsRef.current.filter(Boolean);
      tl.fromTo(
        validLeftPills,
        {
          opacity: 0,
          x: -120,
          scale: 0.94,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.14,
          ease: 'power3.out',
        },
        '-=0.6'
      );

      // 4. Right Pills Arrival from Right (preserving tilt)
      const validRightPills = rightPillsRef.current.filter(Boolean);
      tl.fromTo(
        validRightPills,
        {
          opacity: 0,
          x: 120,
          scale: 0.94,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.14,
          ease: 'power3.out',
        },
        '-=0.75'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="expertise"
      aria-labelledby="expertise-heading"
      className="relative w-full bg-[#FAFAF8] py-28 sm:py-36 lg:py-44 overflow-hidden border-t border-slate-200/50"
    >
      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Top Editorial Label inspired by the reference ("02 — Expertise") */}
        <div ref={labelRef} className="text-center mb-6 sm:mb-10">
          <span className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-[#1E242B] font-normal tracking-tight">
            Expertise
          </span>
        </div>

        {/* Central Dominant Statement & Floating Pills Stage */}
        <div className="relative min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] flex items-center justify-center">
          
          {/* Main Central Typography (SEO-Structured H2) */}
          <div className="relative z-10 text-center max-w-3xl lg:max-w-4xl mx-auto px-4">
            <h2
              id="expertise-heading"
              className="font-sans font-light tracking-[-0.03em] text-[#111315] text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] leading-[1.12] sm:leading-[1.14] lg:leading-[1.15]"
            >
              <span ref={line1Ref} className="block text-[#0E1113] font-medium">
                Design expertise.
              </span>
              <span ref={line2Ref} className="block text-[#1F2429] mt-1 sm:mt-2">
                Marketing perspective.
              </span>
              <span ref={line3Ref} className="block text-[#4B5563] mt-1 sm:mt-2">
                Founder-led execution.
              </span>
            </h2>
          </div>

          {/* Desktop Floating Pills Composition */}
          <div className="hidden md:block absolute inset-0 pointer-events-none">
            
            {/* Left Side Floating Pills */}
            {leftPills.map((pill, idx) => (
              <div
                key={pill.id}
                ref={(el) => {
                  leftPillsRef.current[idx] = el;
                }}
                className={`absolute ${pill.desktopPos} pointer-events-auto`}
              >
                <div
                  style={{ transform: `rotate(${pill.rotation}deg)` }}
                  className="group inline-flex items-center gap-3 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_36px_-4px_rgba(0,0,0,0.12)] hover:-translate-y-1 hover:scale-105 transition-all duration-300 cursor-default select-none"
                >
                  <span
                    className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full ${pill.iconBg} shadow-sm shrink-0`}
                  >
                    {pill.icon}
                  </span>
                  <span className="font-sans text-sm sm:text-[15px] font-medium text-[#111315] tracking-tight">
                    {pill.name}
                  </span>
                </div>
              </div>
            ))}

            {/* Right Side Floating Pills */}
            {rightPills.map((pill, idx) => (
              <div
                key={pill.id}
                ref={(el) => {
                  rightPillsRef.current[idx] = el;
                }}
                className={`absolute ${pill.desktopPos} pointer-events-auto`}
              >
                <div
                  style={{ transform: `rotate(${pill.rotation}deg)` }}
                  className="group inline-flex items-center gap-3 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_36px_-4px_rgba(0,0,0,0.12)] hover:-translate-y-1 hover:scale-105 transition-all duration-300 cursor-default select-none"
                >
                  <span
                    className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full ${pill.iconBg} shadow-sm shrink-0`}
                  >
                    {pill.icon}
                  </span>
                  <span className="font-sans text-sm sm:text-[15px] font-medium text-[#111315] tracking-tight">
                    {pill.name}
                  </span>
                </div>
              </div>
            ))}

          </div>

        </div>

        {/* Mobile Responsive Floating/Staggered Pills Layout */}
        <div className="md:hidden mt-12 flex flex-wrap justify-center gap-3.5 px-2">
          {pills.map((pill) => (
            <div
              key={`mobile-${pill.id}`}
              style={{ transform: `rotate(${pill.rotation * 0.75}deg)` }}
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/95 border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.05)] active:scale-95 transition-transform"
            >
              <span
                className={`flex items-center justify-center w-6 h-6 rounded-full ${pill.iconBg} shadow-sm shrink-0`}
              >
                {pill.icon}
              </span>
              <span className="font-sans text-xs sm:text-sm font-medium text-[#111315]">
                {pill.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
