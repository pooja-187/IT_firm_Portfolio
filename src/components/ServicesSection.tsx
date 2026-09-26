"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette,
  Code2,
  Smartphone,
  TrendingUp,
  ShieldCheck,
  Check,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface ServiceItem {
  id: string;
  category: string;
  selectorLabel: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  description: string;
  bullets: string[];
  note?: string;
  ctaText: string;
  ctaHref: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "design",
    category: "01 / Design",
    selectorLabel: "01 / UI/UX DESIGN",
    name: "UI/UX Design",
    icon: Palette,
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=800&auto=format&fit=crop",
    description:
      "Create websites and applications that are clear, engaging, and easy to use. I turn your business requirements into thoughtful user journeys and interfaces.",
    bullets: [
      "User research and user flows",
      "Wireframing and interactive prototyping",
      "Website and mobile app UI design",
      "Dashboard and SaaS product design",
      "Design systems and usability reviews",
    ],
    ctaText: "Discuss Your Design Project",
    ctaHref: "#contact",
  },
  {
    id: "development",
    category: "02 / Development",
    selectorLabel: "02 / SOFTWARE DEVELOPMENT",
    name: "Software Development",
    icon: Code2,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    description:
      "Build custom software around the way your business works. Through Manzio, we develop solutions that simplify workflows, connect information, and support daily operations.",
    bullets: [
      "Custom business software",
      "CRM and management systems",
      "SaaS product development",
      "Admin dashboards and customer portals",
      "API integrations and workflow automation",
    ],
    ctaText: "Discuss Your Software Idea",
    ctaHref: "#contact",
  },
  {
    id: "mobile",
    category: "03 / Mobile",
    selectorLabel: "03 / APP DEVELOPMENT",
    name: "App Development",
    icon: Smartphone,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
    description:
      "Bring your idea to life with a mobile application built around your users' needs. Our team supports the journey from planning and interface design to development and launch.",
    bullets: [
      "Android and iOS applications",
      "Cross-platform app development",
      "Backend development and API integration",
      "App testing and launch support",
      "App maintenance and improvements",
    ],
    ctaText: "Discuss Your App Idea",
    ctaHref: "#contact",
  },
  {
    id: "growth",
    category: "04 / Growth",
    selectorLabel: "04 / PERFORMANCE MARKETING",
    name: "Performance Marketing",
    icon: TrendingUp,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    description:
      "Reach relevant audiences through measurable advertising campaigns. I combine campaign strategy, creative direction, and landing-page insights to help businesses generate leads and sales.",
    bullets: [
      "Meta Ads and Google Ads",
      "Lead-generation and sales campaigns",
      "Remarketing campaigns",
      "Conversion tracking and reporting",
      "Campaign testing and optimization",
    ],
    ctaText: "Discuss Your Marketing Goals",
    ctaHref: "#contact",
  },
  {
    id: "security",
    category: "05 / Security",
    selectorLabel: "05 / ETHICAL HACKING",
    name: "Ethical Hacking",
    icon: ShieldCheck,
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop",
    description:
      "Identify security weaknesses through authorized testing of your digital systems. Get clear findings and practical recommendations to help your team address vulnerabilities.",
    bullets: [
      "Website and web application security assessments",
      "Vulnerability assessment and penetration testing",
      "Authentication and access-control testing",
      "Security findings and remediation guidance",
      "Retesting after fixes",
    ],
    note: "All testing is conducted within an agreed scope and with the system owner's authorization.",
    ctaText: "Discuss a Security Assessment",
    ctaHref: "#contact",
  },
];

const AUTO_PLAY_INTERVAL = 4000;
const ITEM_HEIGHT = 56;

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export default function ServicesSection() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex =
    ((step % SERVICES_DATA.length) + SERVICES_DATA.length) %
    SERVICES_DATA.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff =
      (index - currentIndex + SERVICES_DATA.length) % SERVICES_DATA.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = SERVICES_DATA.length;
    let normalizedDiff = diff;

    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative w-full text-[#111111] pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-24 lg:pb-28 overflow-hidden selection:bg-lime-200"
      style={{
        backgroundColor: "#FFFFFF",
        backgroundImage: `
          radial-gradient(
            ellipse 70% 50% at 50% 35%,
            rgba(163, 230, 53, 0.22) 0%,
            rgba(190, 242, 100, 0.10) 38%,
            rgba(217, 249, 157, 0.03) 65%,
            transparent 78%
          ),
          radial-gradient(
            ellipse 85% 60% at 52% 40%,
            rgba(163, 230, 53, 0.08) 0%,
            transparent 72%
          )
        `,
      }}
    >
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ===================================================
            SECTION HEADER
           =================================================== */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 lg:mb-14">
          {/* Section Badge Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/5 mb-4 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16]" />
            <span className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-[#64748B]">
              05 — SERVICES
            </span>
          </div>

          {/* Main Title */}
          <h2
            id="services-heading"
            className="font-sans text-3xl sm:text-4xl lg:text-5xl font-light text-[#111111] tracking-[-0.03em] leading-[1.15] mb-3"
          >
            What I Can Do for You
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg font-medium text-[#111111] mb-3 tracking-tight">
            Design, Development &amp; Digital Growth
          </p>

          {/* Introductory Text */}
          <p className="text-sm sm:text-[15px] text-[#525B64] leading-relaxed font-normal">
            From intuitive interfaces to custom software, mobile applications,
            targeted campaigns, and security assessments—I work with the Manzio
            Creative Studio team to help businesses build, grow, and protect
            their digital presence.
          </p>
        </div>

        {/* ===================================================
            INTERACTIVE 3D CAPABILITY SHOWCASE
           =================================================== */}
        <div className="relative flex flex-col lg:flex-row items-center justify-between min-h-[460px] lg:min-h-[500px] w-full gap-6 lg:gap-10 max-w-5xl mx-auto">
          {/* Left column / vertical track with alpha transparency mask */}
          <div
            className="w-full lg:w-[44%] min-h-[320px] md:min-h-[380px] lg:h-[460px] relative z-20 flex flex-col items-start justify-center px-2 sm:px-6"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
            }}
          >
            <div className="relative w-full h-full flex items-center justify-center lg:justify-start z-20">
              {SERVICES_DATA.map((service, index) => {
                const isActive = index === currentIndex;
                const distance = index - currentIndex;
                const wrappedDistance = wrap(
                  -(SERVICES_DATA.length / 2),
                  SERVICES_DATA.length / 2,
                  distance
                );
                const Icon = service.icon;

                return (
                  <motion.div
                    key={service.id}
                    style={{
                      height: ITEM_HEIGHT,
                      width: "fit-content",
                    }}
                    animate={{
                      y: wrappedDistance * ITEM_HEIGHT,
                      opacity: 1 - Math.abs(wrappedDistance) * 0.28,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 90,
                      damping: 22,
                      mass: 1,
                    }}
                    className="absolute flex items-center justify-start max-w-full"
                  >
                    <button
                      onClick={() => handleChipClick(index)}
                      onMouseEnter={() => setIsPaused(true)}
                      onMouseLeave={() => setIsPaused(false)}
                      className={cn(
                        "relative flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-500 text-left group border max-w-full",
                        isActive
                          ? "bg-[#84CC16] text-[#111111] font-semibold border-[#84CC16] z-10 shadow-[0_8px_24px_rgba(132,204,22,0.35)] scale-[1.02]"
                          : "bg-transparent text-[#475569] border-black/[0.12] hover:border-[#84CC16] hover:text-[#111111] hover:bg-[#84CC16]/10"
                      )}
                    >
                      <div
                        className={cn(
                          "w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-colors duration-500 shrink-0",
                          isActive
                            ? "bg-white/95 text-[#111111]"
                            : "bg-black/5 text-[#84CC16]"
                        )}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[11px] sm:text-xs md:text-[12.5px] font-semibold tracking-wide whitespace-nowrap uppercase font-sans">
                        {service.selectorLabel}
                      </span>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right column / 3D floating layered cards */}
          <div className="flex-1 w-full min-h-[440px] md:min-h-[480px] lg:h-[480px] relative flex items-center justify-center py-4 px-2 overflow-visible">
            <div className="relative w-full max-w-[360px] sm:max-w-[380px] aspect-[4/5.2] flex items-center justify-center">
              {SERVICES_DATA.map((service, index) => {
                const status = getCardStatus(index);
                const isActive = status === "active";
                const isPrev = status === "prev";
                const isNext = status === "next";

                return (
                  <motion.div
                    key={service.id}
                    initial={false}
                    animate={{
                      x: isActive ? 0 : isPrev ? -80 : isNext ? 80 : 0,
                      scale: isActive ? 1 : isPrev || isNext ? 0.88 : 0.72,
                      opacity: isActive ? 1 : isPrev || isNext ? 0.35 : 0,
                      rotate: isPrev ? -3 : isNext ? 3 : 0,
                      zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 25,
                      mass: 0.8,
                    }}
                    className="absolute inset-0 rounded-[1.8rem] sm:rounded-[2.2rem] overflow-hidden border-4 sm:border-[6px] border-white bg-neutral-900 origin-center shadow-[0_20px_50px_rgba(0,0,0,0.16)]"
                  >
                    {/* Card Background Photo */}
                    <img
                      src={service.image}
                      alt={service.name}
                      className={cn(
                        "w-full h-full object-cover transition-all duration-700",
                        isActive
                          ? "grayscale-0 blur-0 brightness-95"
                          : "grayscale blur-[2px] brightness-75"
                      )}
                    />

                    {/* Dark Editorial Info Overlay */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute inset-x-0 bottom-0 p-5 sm:p-6 pt-24 bg-gradient-to-t from-black/95 via-black/80 to-transparent flex flex-col justify-end pointer-events-auto"
                        >
                          {/* Category Badge */}
                          <div className="bg-white text-[#111111] px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] w-fit shadow-md mb-2 border border-black/5 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16]" />
                            <span>{service.category}</span>
                          </div>

                          {/* Service Name */}
                          <h3 className="text-white font-light text-xl sm:text-2xl leading-tight tracking-tight mb-1.5">
                            {service.name}
                          </h3>

                          {/* Description */}
                          <p className="text-white/85 text-xs sm:text-[12.5px] leading-relaxed mb-2.5 line-clamp-2">
                            {service.description}
                          </p>

                          {/* Bullet Points */}
                          <div className="space-y-1 mb-3">
                            {service.bullets.slice(0, 3).map((b, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-2 text-white/90 text-[11.5px] sm:text-xs"
                              >
                                <div className="w-3 h-3 rounded-full bg-[#84CC16]/25 text-[#84CC16] flex items-center justify-center flex-shrink-0">
                                  <Check className="w-2 h-2 stroke-[3]" />
                                </div>
                                <span className="line-clamp-1">{b}</span>
                              </div>
                            ))}
                          </div>

                          {/* Optional Scope Note for Security */}
                          {service.note && (
                            <p className="text-[10px] text-white/70 italic mb-2.5 line-clamp-1">
                              * {service.note}
                            </p>
                          )}

                          {/* CTA Button */}
                          <a
                            href={service.ctaHref}
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#84CC16] text-[#111111] text-xs font-semibold hover:bg-[#A3E635] transition-all w-fit shadow-md group/cta"
                          >
                            <span>{service.ctaText}</span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/cta:translate-x-1" />
                          </a>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Top Status Badge */}
                    <div
                      className={cn(
                        "absolute top-4 left-4 flex items-center gap-2 transition-opacity duration-300",
                        isActive ? "opacity-100" : "opacity-0"
                      )}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#84CC16] shadow-[0_0_8px_#84CC16]" />
                      <span className="text-white/90 text-[9px] font-semibold uppercase tracking-[0.25em] font-mono">
                        Available Service
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

