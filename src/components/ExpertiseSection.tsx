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
}

export default function ExpertiseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const leftPillsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rightPillsRef = useRef<(HTMLDivElement | null)[]>([]);

  const leftPills: ExpertisePillData[] = [
    {
      id: 'ui-ux',
      name: 'UI/UX Design',
      iconBg: 'bg-[#FF6B00]', // Reference Vibrant Orange
      rotation: -4.5,
      offsetClass: 'self-start',
    },
    {
      id: 'software-dev',
      name: 'Software Development',
      iconBg: 'bg-[#00A3FF]', // Reference Cyan/Electric Blue
      rotation: 3.5,
      offsetClass: 'self-end translate-x-2 xl:translate-x-6',
    },
    {
      id: 'app-dev',
      name: 'App Development',
      iconBg: 'bg-[#262626]', // Reference Charcoal/Black
      rotation: -3.5,
      offsetClass: 'self-start -translate-x-2',
    },
  ];

  const rightPills: ExpertisePillData[] = [
    {
      id: 'performance-mkt',
      name: 'Performance Marketing',
      iconBg: 'bg-[#FFD600]', // Reference Bright Yellow
      rotation: 4,
      offsetClass: 'self-end translate-x-2',
    },
    {
      id: 'ethical-hacking',
      name: 'Ethical Hacking',
      iconBg: 'bg-[#00E676]', // Reference Vivid Green
      rotation: -4,
      offsetClass: 'self-start -translate-x-2 xl:-translate-x-6',
    },
  ];

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
          x: -100,
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
          x: 100,
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

  const allPills = [...leftPills, ...rightPills];

  return (
    <section
      ref={sectionRef}
      id="expertise"
      aria-labelledby="expertise-heading"
      className="relative w-full bg-[#FFFFFF] py-24 sm:py-32 lg:py-40 overflow-hidden border-t border-slate-100"
    >
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Editorial Label inspired by the reference ("Hallo!" -> "Expertise") */}
        <div ref={labelRef} className="text-center mb-10 sm:mb-14">
          <span className="font-serif italic text-3xl sm:text-4xl text-[#1E242B] font-normal tracking-tight">
            Expertise
          </span>
        </div>

        {/* 3-Column Flanking Stage: Zero Collision, Zero Overlap, Perfect Organic Alignment */}
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr_220px] lg:grid-cols-[260px_1fr_260px] xl:grid-cols-[290px_1fr_290px] items-center gap-6 lg:gap-8 min-h-[380px] sm:min-h-[440px]">
          
          {/* Left Flanking Column (3 Staggered Pills) */}
          <div className="hidden md:flex flex-col justify-center gap-10 lg:gap-14">
            {leftPills.map((pill, idx) => (
              <div
                key={pill.id}
                ref={(el) => {
                  leftPillsRef.current[idx] = el;
                }}
                className={`w-fit ${pill.offsetClass}`}
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
                  <span className="font-sans text-sm sm:text-[15px] xl:text-base font-medium text-[#181C20] tracking-tight whitespace-nowrap">
                    {pill.name}
                  </span>
                </div>
              </div>
            ))}
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

          {/* Right Flanking Column (2 Staggered Pills) */}
          <div className="hidden md:flex flex-col justify-center gap-14 lg:gap-20">
            {rightPills.map((pill, idx) => (
              <div
                key={pill.id}
                ref={(el) => {
                  rightPillsRef.current[idx] = el;
                }}
                className={`w-fit ${pill.offsetClass}`}
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
                  <span className="font-sans text-sm sm:text-[15px] xl:text-base font-medium text-[#181C20] tracking-tight whitespace-nowrap">
                    {pill.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Mobile Responsive Staggered Layout */}
        <div className="md:hidden mt-10 flex flex-wrap justify-center gap-3 px-2">
          {allPills.map((pill) => (
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
