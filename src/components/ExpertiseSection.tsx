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
  side: 'left' | 'right';
  className: string;
}

export default function ExpertiseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const leftPillsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rightPillsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Exact 5 approved expertise areas matching reference pill styling (circular badge with lightning spark)
  const pills: ExpertisePillData[] = [
    {
      id: 'ui-ux',
      name: 'UI/UX Design',
      iconBg: 'bg-[#FF6B00]', // Reference Vibrant Orange
      rotation: -4.5,
      side: 'left',
      className: 'top-2 sm:top-4 -left-12 sm:-left-28 lg:-left-36',
    },
    {
      id: 'software-dev',
      name: 'Software Development',
      iconBg: 'bg-[#00A3FF]', // Reference Cyan/Electric Blue
      rotation: 3.5,
      side: 'left',
      className: 'top-1/2 -translate-y-1/2 -left-6 sm:-left-16 lg:-left-24',
    },
    {
      id: 'app-dev',
      name: 'App Development',
      iconBg: 'bg-[#262626]', // Reference Charcoal/Black
      rotation: -3.5,
      side: 'left',
      className: 'bottom-2 sm:bottom-4 -left-14 sm:-left-32 lg:-left-40',
    },
    {
      id: 'performance-mkt',
      name: 'Performance Marketing',
      iconBg: 'bg-[#FFD600]', // Reference Bright Yellow
      rotation: 4,
      side: 'right',
      className: 'top-4 sm:top-8 -right-12 sm:-right-28 lg:-right-36',
    },
    {
      id: 'ethical-hacking',
      name: 'Ethical Hacking',
      iconBg: 'bg-[#00E676]', // Reference Vivid Green
      rotation: -4,
      side: 'right',
      className: 'bottom-4 sm:bottom-8 -right-10 sm:-right-24 lg:-right-32',
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

      // 2. Central Statement progressive line arrival
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
      className="relative w-full bg-[#FFFFFF] py-24 sm:py-32 lg:py-40 overflow-hidden border-t border-slate-100"
    >
      <div className="relative w-full max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Top Editorial Label inspired by the reference ("Hallo!" -> "Expertise") */}
        <div ref={labelRef} className="text-center mb-8 sm:mb-12">
          <span className="font-serif italic text-3xl sm:text-4xl text-[#1E242B] font-normal tracking-tight">
            Expertise
          </span>
        </div>

        {/* Central Stage: Central Statement tightly framed by floating tilted pills */}
        <div className="relative max-w-3xl lg:max-w-4xl mx-auto py-8 sm:py-12 flex items-center justify-center">
          
          {/* Main Central Typography (SEO-Structured H2 matching reference line breaks) */}
          <div className="relative z-10 text-center px-4">
            <h2
              id="expertise-heading"
              className="font-sans font-normal tracking-[-0.025em] text-[#111315] text-3xl sm:text-5xl md:text-[3.6rem] lg:text-[4.2rem] leading-[1.2] sm:leading-[1.22] lg:leading-[1.24]"
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

          {/* Desktop Floating Pills Stage (Flanking the central text) */}
          <div className="hidden md:block absolute inset-0 pointer-events-none">
            
            {/* Left Side Floating Pills */}
            {leftPills.map((pill, idx) => (
              <div
                key={pill.id}
                ref={(el) => {
                  leftPillsRef.current[idx] = el;
                }}
                className={`absolute ${pill.className} pointer-events-auto`}
              >
                <div
                  style={{ transform: `rotate(${pill.rotation}deg)` }}
                  className="group inline-flex items-center gap-3 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-white border border-slate-100 shadow-[0_10px_28px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.12)] hover:-translate-y-1 hover:scale-105 transition-all duration-300 cursor-default select-none"
                >
                  <span
                    className={`flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full ${pill.iconBg} shadow-sm shrink-0`}
                  >
                    <Zap className="w-3.5 h-3.5 text-white fill-white" />
                  </span>
                  <span className="font-sans text-sm sm:text-base font-medium text-[#181C20] tracking-tight whitespace-nowrap">
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
                className={`absolute ${pill.className} pointer-events-auto`}
              >
                <div
                  style={{ transform: `rotate(${pill.rotation}deg)` }}
                  className="group inline-flex items-center gap-3 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-white border border-slate-100 shadow-[0_10px_28px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.12)] hover:-translate-y-1 hover:scale-105 transition-all duration-300 cursor-default select-none"
                >
                  <span
                    className={`flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full ${pill.iconBg} shadow-sm shrink-0`}
                  >
                    <Zap className="w-3.5 h-3.5 text-white fill-white" />
                  </span>
                  <span className="font-sans text-sm sm:text-base font-medium text-[#181C20] tracking-tight whitespace-nowrap">
                    {pill.name}
                  </span>
                </div>
              </div>
            ))}

          </div>

        </div>

        {/* Mobile Responsive Floating/Staggered Pills Layout */}
        <div className="md:hidden mt-8 flex flex-wrap justify-center gap-3 px-2">
          {pills.map((pill) => (
            <div
              key={`mobile-${pill.id}`}
              style={{ transform: `rotate(${pill.rotation * 0.75}deg)` }}
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white border border-slate-100 shadow-[0_6px_20px_rgba(0,0,0,0.05)] active:scale-95 transition-transform"
            >
              <span
                className={`flex items-center justify-center w-5 h-5 rounded-full ${pill.iconBg} shadow-sm shrink-0`}
              >
                <Zap className="w-3 h-3 text-white fill-white" />
              </span>
              <span className="font-sans text-xs sm:text-sm font-medium text-[#181C20]">
                {pill.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
