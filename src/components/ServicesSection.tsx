'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Code2, Smartphone, TrendingUp, ShieldCheck, Check, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ServiceItem {
  id: string;
  category: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  bullets: string[];
  note?: string;
  ctaText: string;
  ctaHref: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'design',
    category: '01 / Design',
    name: 'UI/UX Design',
    icon: Palette,
    description:
      'Create websites and applications that are clear, engaging, and easy to use. I turn your business requirements into thoughtful user journeys and interfaces.',
    bullets: [
      'User research and user flows',
      'Wireframing and interactive prototyping',
      'Website and mobile app UI design',
      'Dashboard and SaaS product design',
      'Design systems and usability reviews',
    ],
    ctaText: 'Discuss Your Design Project →',
    ctaHref: '#contact',
  },
  {
    id: 'development',
    category: '02 / Development',
    name: 'Software Development',
    icon: Code2,
    description:
      'Build custom software around the way your business works. Through Manzio, we develop solutions that simplify workflows, connect information, and support daily operations.',
    bullets: [
      'Custom business software',
      'CRM and management systems',
      'SaaS product development',
      'Admin dashboards and customer portals',
      'API integrations and workflow automation',
    ],
    ctaText: 'Discuss Your Software Idea →',
    ctaHref: '#contact',
  },
  {
    id: 'mobile',
    category: '03 / Mobile',
    name: 'App Development',
    icon: Smartphone,
    description:
      "Bring your idea to life with a mobile application built around your users' needs. Our team supports the journey from planning and interface design to development and launch.",
    bullets: [
      'Android and iOS applications',
      'Cross-platform app development',
      'Backend development and API integration',
      'App testing and launch support',
      'App maintenance and improvements',
    ],
    ctaText: 'Discuss Your App Idea →',
    ctaHref: '#contact',
  },
  {
    id: 'growth',
    category: '04 / Growth',
    name: 'Performance Marketing',
    icon: TrendingUp,
    description:
      'Reach relevant audiences through measurable advertising campaigns. I combine campaign strategy, creative direction, and landing-page insights to help businesses generate leads and sales.',
    bullets: [
      'Meta Ads and Google Ads',
      'Lead-generation and sales campaigns',
      'Remarketing campaigns',
      'Conversion tracking and reporting',
      'Campaign testing and optimization',
    ],
    ctaText: 'Discuss Your Marketing Goals →',
    ctaHref: '#contact',
  },
  {
    id: 'security',
    category: '05 / Security',
    name: 'Ethical Hacking',
    icon: ShieldCheck,
    description:
      'Identify security weaknesses through authorized testing of your digital systems. Get clear findings and practical recommendations to help your team address vulnerabilities.',
    bullets: [
      'Website and web application security assessments',
      'Vulnerability assessment and penetration testing',
      'Authentication and access-control testing',
      'Security findings and remediation guidance',
      'Retesting after fixes',
    ],
    note: "All testing is conducted within an agreed scope and with the system owner's authorization.",
    ctaText: 'Discuss a Security Assessment →',
    ctaHref: '#contact',
  },
];

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeService = SERVICES_DATA[activeIndex];

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative w-full text-[#111111] pt-14 sm:pt-20 lg:pt-28 pb-20 sm:pb-28 lg:pb-36 overflow-hidden selection:bg-lime-200"
      style={{
        backgroundColor: '#FFFFFF',
        backgroundImage: `
          radial-gradient(
            ellipse 70% 50% at 50% 35%,
            rgba(163, 230, 53, 0.24) 0%,
            rgba(190, 242, 100, 0.12) 38%,
            rgba(217, 249, 157, 0.04) 65%,
            transparent 78%
          ),
          radial-gradient(
            ellipse 85% 60% at 52% 40%,
            rgba(163, 230, 53, 0.10) 0%,
            transparent 72%
          )
        `,
      }}
    >
      <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ===================================================
            SECTION HEADER
           =================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          {/* Section Badge Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/5 mb-5 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16]" />
            <span className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[#64748B]">
              05 — SERVICES
            </span>
          </div>

          {/* Main Title */}
          <h2
            id="services-heading"
            className="font-sans text-4xl sm:text-5xl lg:text-6xl font-light text-[#111111] tracking-[-0.03em] leading-[1.12] mb-4"
          >
            What I Can Do for You
          </h2>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl font-medium text-[#111111] mb-4 tracking-tight">
            Design, Development &amp; Digital Growth
          </p>

          {/* Introductory Text */}
          <p className="text-[15px] sm:text-[16.5px] text-[#525B64] leading-relaxed font-normal">
            From intuitive interfaces to custom software, mobile applications, targeted campaigns, and security assessments—I work with the Manzio Creative Studio team to help businesses build, grow, and protect their digital presence.
          </p>
        </div>

        {/* ===================================================
            TWO-COLUMN CAPABILITY SHOWCASE
           =================================================== */}
        <div className="max-w-[1180px] mx-auto flex flex-col lg:flex-row items-stretch justify-between gap-8 lg:gap-12">
          
          {/* -------------------------------------------------
              LEFT COLUMN: Interactive Vertical Service Selector (40–42%)
             ------------------------------------------------- */}
          <div className="w-full lg:w-[42%] flex flex-col justify-center gap-3">
            {SERVICES_DATA.map((service, index) => {
              const isActive = index === activeIndex;
              const Icon = service.icon;

              return (
                <button
                  key={service.id}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "w-full flex items-center justify-between p-4 sm:p-5 rounded-2xl sm:rounded-3xl transition-all duration-300 text-left group border",
                    isActive
                      ? "bg-[#84CC16] text-[#111111] border-[#84CC16] shadow-[0_10px_30px_rgba(132,204,22,0.35)] scale-[1.02]"
                      : "bg-white/80 backdrop-blur-xs text-[#525B64] border-black/[0.08] hover:border-[#84CC16]/60 hover:text-[#111111] hover:bg-white shadow-xs"
                  )}
                >
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <div
                      className={cn(
                        "w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-colors duration-300",
                        isActive
                          ? "bg-white/90 text-[#111111]"
                          : "bg-black/5 text-[#84CC16] group-hover:bg-[#84CC16]/15"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span
                        className={cn(
                          "block font-mono text-xs uppercase tracking-wider mb-0.5",
                          isActive ? "text-[#111111]/80 font-medium" : "text-[#64748B]"
                        )}
                      >
                        {service.category}
                      </span>
                      <span
                        className={cn(
                          "block font-sans text-base sm:text-lg tracking-tight font-medium",
                          isActive ? "text-[#111111] font-semibold" : "text-[#111111] group-hover:text-black"
                        )}
                      >
                        {service.name}
                      </span>
                    </div>
                  </div>

                  <ArrowRight
                    className={cn(
                      "w-5 h-5 transition-transform duration-300",
                      isActive
                        ? "text-[#111111] translate-x-1"
                        : "text-[#94A3B8] opacity-60 group-hover:opacity-100 group-hover:translate-x-1"
                    )}
                  />
                </button>
              );
            })}
          </div>

          {/* -------------------------------------------------
              RIGHT COLUMN: Layered 3D Editorial Service Card (58–60%)
             ------------------------------------------------- */}
          <div className="flex-1 w-full relative min-h-[460px] sm:min-h-[500px] flex items-center justify-center">
            
            {/* Ambient Background Glow Orb */}
            <div
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#84CC16]/15 rounded-full blur-3xl pointer-events-none"
            />

            {/* Layered Card Deck Animation */}
            <div className="relative w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="relative z-10 w-full rounded-3xl bg-white border border-black/[0.08] p-7 sm:p-9 lg:p-11 shadow-[0_20px_50px_rgba(0,0,0,0.05),0_4px_20px_rgba(132,204,22,0.06)]"
                >
                  {/* Card Header Row */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAFAF9] border border-black/5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16]" />
                      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                        {activeService.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-medium text-[#64748B]">
                      <span className="w-2 h-2 rounded-full bg-[#84CC16] animate-pulse" />
                      <span>Specialized Service</span>
                    </div>
                  </div>

                  {/* Service Title */}
                  <h3 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-light text-[#111111] tracking-tight mb-4">
                    {activeService.name}
                  </h3>

                  {/* Service Description */}
                  <p className="text-[15px] sm:text-[16px] text-[#525B64] leading-relaxed mb-7 font-normal">
                    {activeService.description}
                  </p>

                  {/* Bullet Points */}
                  <div className="space-y-3 mb-8">
                    {activeService.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="mt-1 w-4 h-4 rounded-full bg-[#84CC16]/20 text-[#65A30D] flex items-center justify-center flex-shrink-0">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className="text-[14.5px] sm:text-[15.5px] text-[#334155] leading-snug">
                          {bullet}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Optional Manager Note (for Security) */}
                  {activeService.note && (
                    <div className="mb-7 p-3.5 sm:p-4 rounded-2xl bg-[#FAFAF9] border border-black/5 text-xs sm:text-[13px] text-[#64748B] leading-relaxed">
                      <span className="font-semibold text-[#111111]">Scope Note: </span>
                      {activeService.note}
                    </div>
                  )}

                  {/* Bottom CTA Button */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href={activeService.ctaHref}
                      className="inline-flex items-center gap-2.5 text-sm sm:text-base font-semibold text-[#111111] hover:text-[#65A30D] transition-colors duration-300 group"
                    >
                      <span className="underline-offset-4 group-hover:underline">
                        {activeService.ctaText}
                      </span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>

                    <span className="font-mono text-xs text-[#94A3B8]">
                      0{activeIndex + 1} / 05
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
