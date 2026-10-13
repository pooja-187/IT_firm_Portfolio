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

import { contentService } from "@/services/ContentService";
import { STORAGE_KEYS } from "@/services/StorageService";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  design: Palette,
  development: Code2,
  mobile: Smartphone,
  growth: TrendingUp,
  security: ShieldCheck,
  ui_ux_product_design: Palette,
  custom_software_development: Code2,
  mobile_app_development: Smartphone,
  performance_marketing_growth: TrendingUp,
  cybersecurity_ethical_hacking: ShieldCheck,
};

export default function ServicesSection() {
  const [services, setServices] = useState<ServiceItem[]>(SERVICES_DATA);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const loadServices = () => {
      const managed = contentService.getServices(true);
      if (managed && managed.length > 0) {
        setServices(
          managed.map((s) => {
            const serviceKey = s.key || s.serviceKey || s.id;
            const iconComp = (serviceKey && ICON_MAP[serviceKey]) || ICON_MAP[s.id] || Palette;
            return {
              id: serviceKey,
              category: s.category,
              selectorLabel: s.selectorLabel,
              name: s.name,
              icon: iconComp,
              image: s.coverImage || s.image || "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=800&auto=format&fit=crop",
              description: s.description,
              bullets: s.bullets || [],
              note: s.scopeNote || s.note,
              ctaText: s.ctaText || "Discuss This Service",
              ctaHref: s.ctaUrl || s.ctaHref || "#contact",
            };
          })
        );
      }
    };

    loadServices();

    const unsubscribe = contentService.subscribe((key) => {
      if (key === STORAGE_KEYS.SERVICES) {
        loadServices();
      }
    });

    return () => unsubscribe();
  }, []);

  const nextStep = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  }, [services.length]);

  const prevStep = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + services.length) % services.length
    );
  }, [services.length]);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isHovered]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = services.length;
    let normalizedDiff = diff;

    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src =
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='1000' viewBox='0 0 800 1000'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%231e293b'/%3E%3Cstop offset='50%25' stop-color='%230f172a'/%3E%3Cstop offset='100%25' stop-color='%23020617'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)'/%3E%3C/svg%3E";
  };

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative w-full text-[#111111] pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-24 lg:pb-28 overflow-hidden selection:bg-lime-200 scroll-mt-24 sm:scroll-mt-28"
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
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 lg:mb-12">
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
        {/* ===================================================
            1. DESKTOP INTERACTIVE 3D CAPABILITY SHOWCASE (>= 1024px)
            100% UNCHANGED, preserved exactly as before
           =================================================== */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="hidden lg:flex relative flex-row items-center justify-between min-h-[520px] w-full gap-12 max-w-5xl mx-auto"
        >
          {/* Left column: Stable, cleanly ordered service selector pills (01 to 05) */}
          <div className="w-[46%] h-[480px] relative z-20 flex flex-col items-start justify-center px-6">
            <div className="flex flex-col gap-3.5 items-start justify-center w-full">
              {services.map((service, index) => {
                const isActive = index === currentIndex;
                const Icon = service.icon;

                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    onMouseEnter={() => setCurrentIndex(index)}
                    className={cn(
                      "relative flex items-center gap-3 px-5 py-2.5 rounded-full transition-all duration-300 text-left group border w-fit cursor-pointer select-none",
                      isActive
                        ? "bg-[#84CC16] text-[#111111] font-semibold border-[#84CC16] z-10 shadow-[0_8px_24px_rgba(132,204,22,0.35)] scale-[1.02] translate-x-2"
                        : "bg-transparent text-[#475569] border-black/[0.12] hover:border-[#84CC16] hover:text-[#111111] hover:bg-[#84CC16]/10 opacity-75 hover:opacity-100"
                    )}
                  >
                    <div
                      className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-300 shrink-0",
                        isActive
                          ? "bg-white/95 text-[#111111]"
                          : "bg-black/5 text-[#84CC16]"
                      )}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[12.5px] font-semibold tracking-wide whitespace-nowrap uppercase font-sans">
                      {service.selectorLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right column / 3D floating layered cards */}
          <div className="flex-1 w-full h-[480px] relative flex items-center justify-center py-4 px-2 overflow-visible">
            <div className="relative w-full max-w-[380px] aspect-[4/5.2] flex items-center justify-center">
              {services.map((service, index) => {
                const status = getCardStatus(index);
                const isActive = status === "active";
                const isPrev = status === "prev";
                const isNext = status === "next";

                return (
                  <motion.div
                    key={service.id}
                    initial={false}
                    onClick={() => {
                      if (isPrev) prevStep();
                      if (isNext) nextStep();
                    }}
                    animate={{
                      x: isActive ? 0 : isPrev ? -80 : isNext ? 80 : 0,
                      scale: isActive ? 1 : isPrev || isNext ? 0.88 : 0.72,
                      opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                      rotate: isPrev ? -3 : isNext ? 3 : 0,
                      zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    }}
                    whileHover={
                      isPrev || isNext ? { scale: 0.91, opacity: 0.6 } : {}
                    }
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 25,
                      mass: 0.8,
                    }}
                    className={cn(
                      "absolute inset-0 rounded-[2.2rem] overflow-hidden border-[6px] border-white bg-neutral-900 origin-center shadow-[0_20px_50px_rgba(0,0,0,0.16)] transition-shadow duration-300",
                      (isPrev || isNext) && "cursor-pointer hover:shadow-xl",
                      !isActive && !isPrev && !isNext && "pointer-events-none"
                    )}
                  >
                    {/* Card Background Photo */}
                    <img
                      src={service.image}
                      alt={service.name}
                      onError={handleImageError}
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
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
                          className="absolute inset-x-0 bottom-0 p-6 pb-8 pt-32 bg-gradient-to-t from-black/95 via-black/80 to-transparent flex flex-col justify-end pointer-events-auto"
                        >
                          {/* Category Badge */}
                          <div className="bg-white text-[#111111] px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] w-fit shadow-md mb-2 border border-black/5 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16]" />
                            <span>{service.category}</span>
                          </div>

                          {/* Service Name */}
                          <h3 className="text-white font-light text-2xl leading-tight tracking-tight mb-1.5">
                            {service.name}
                          </h3>

                          {/* Description */}
                          <p className="text-white/85 text-[12.5px] leading-relaxed mb-2.5 line-clamp-2">
                            {service.description}
                          </p>

                          {/* Bullet Points */}
                          <div className="space-y-1 mb-3">
                            {service.bullets.slice(0, 3).map((b, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-2 text-white/90 text-xs"
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
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#84CC16] text-[#111111] text-xs font-semibold hover:bg-[#A3E635] transition-all w-fit shadow-md group/cta mt-0.5"
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
                        "absolute top-4 left-4 flex items-center gap-2 transition-opacity duration-300 pointer-events-none",
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

        {/* ===================================================
            2. DEDICATED MOBILE SERVICES SHOWCASE (< 1024px)
            Core Requirement: Exactly ONE Active Card (with 3D layered peeking cards) + ONE Corresponding Button directly below it
           =================================================== */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="lg:hidden relative w-full flex flex-col items-center justify-center max-w-md mx-auto px-4"
        >
          {/* 3D Layered Card Deck - scaled slightly smaller for compact mobile view */}
          <div className="relative w-full max-w-[275px] xs:max-w-[295px] aspect-[4/5.2] flex items-center justify-center my-1.5">
            {services.map((service, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";

              return (
                <motion.div
                  key={service.id}
                  initial={false}
                  drag={isActive ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -35) {
                      nextStep();
                    } else if (info.offset.x > 35) {
                      prevStep();
                    }
                  }}
                  onClick={() => {
                    if (isPrev) prevStep();
                    if (isNext) nextStep();
                  }}
                  animate={{
                    x: isActive ? 0 : isPrev ? -40 : isNext ? 40 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.88 : 0.72,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.45 : 0,
                    rotate: isPrev ? -3.5 : isNext ? 3.5 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 25,
                    mass: 0.8,
                  }}
                  className={cn(
                    "absolute inset-0 rounded-[1.85rem] xs:rounded-[2.1rem] overflow-hidden border-[5px] xs:border-[6px] border-white bg-neutral-900 origin-center shadow-[0_16px_45px_rgba(0,0,0,0.18)] select-none transition-shadow duration-300",
                    (isPrev || isNext) && "cursor-pointer hover:shadow-xl",
                    !isActive && !isPrev && !isNext && "pointer-events-none"
                  )}
                >
                  {/* Card Background Photo */}
                  <img
                    src={service.image}
                    alt={service.name}
                    onError={handleImageError}
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    className={cn(
                      "w-full h-full object-cover transition-all duration-700 pointer-events-none",
                      isActive
                        ? "grayscale-0 blur-0 brightness-95"
                        : "grayscale blur-[1.5px] brightness-75"
                    )}
                  />

                  {/* Dark Editorial Info Overlay */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.25 }}
                        className="absolute inset-x-0 bottom-0 p-4 xs:p-4.5 pb-4 xs:pb-5 pt-20 bg-gradient-to-t from-black/95 via-black/80 to-transparent flex flex-col justify-end pointer-events-auto"
                      >
                        {/* Category Badge */}
                        <div className="bg-white text-[#111111] px-2.5 py-0.5 rounded-full text-[9.5px] xs:text-[10px] font-semibold uppercase tracking-[0.18em] w-fit shadow-md mb-1.5 border border-black/5 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16]" />
                          <span>{service.category}</span>
                        </div>

                        {/* Service Name */}
                        <h3 className="text-white font-normal text-lg xs:text-xl leading-tight tracking-tight mb-1">
                          {service.name}
                        </h3>

                        {/* Description */}
                        <p className="text-white/85 text-[11px] xs:text-[12px] leading-relaxed mb-2 line-clamp-2">
                          {service.description}
                        </p>

                        {/* Bullet Points */}
                        <div className="space-y-1 mb-2">
                          {service.bullets.slice(0, 3).map((b, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2 text-white/90 text-[10.5px] xs:text-[11px]"
                            >
                              <div className="w-3 h-3 rounded-full bg-[#84CC16]/25 text-[#84CC16] flex items-center justify-center shrink-0">
                                <Check className="w-2 h-2 stroke-[3]" />
                              </div>
                              <span className="line-clamp-1">{b}</span>
                            </div>
                          ))}
                        </div>

                        {/* Optional Scope Note for Security */}
                        {service.note && (
                          <p className="text-[9.5px] text-white/70 italic mb-2 line-clamp-1">
                            * {service.note}
                          </p>
                        )}

                        {/* CTA Button */}
                        <a
                          href={service.ctaHref}
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#84CC16] text-[#111111] text-[11px] xs:text-xs font-semibold hover:bg-[#A3E635] transition-all w-fit shadow-md group/cta mt-0.5"
                        >
                          <span>{service.ctaText}</span>
                          <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover/cta:translate-x-1" />
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Top Status Badge */}
                  <div
                    className={cn(
                      "absolute top-3.5 left-3.5 flex items-center gap-1.5 transition-opacity duration-300 pointer-events-none",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#84CC16] shadow-[0_0_8px_#84CC16]" />
                    <span className="text-white/90 text-[8.5px] font-semibold uppercase tracking-[0.22em] font-mono">
                      Available Service
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Exactly ONE Corresponding Service Button directly below it - sized to fit text */}
          <div className="w-full flex justify-center mt-3 xs:mt-3.5">
            {(() => {
              const currentItem = services[currentIndex] || services[0];
              if (!currentItem) return null;
              const CurrentIcon = currentItem.icon;
              return (
                <button
                  type="button"
                  onClick={nextStep}
                  aria-label={`Current service: ${currentItem.name}. Tap to view next service.`}
                  className="w-fit inline-flex items-center gap-2.5 xs:gap-3 px-4.5 xs:px-5.5 py-3 xs:py-3.5 rounded-full bg-[#84CC16] text-[#111111] font-semibold border border-[#84CC16] shadow-[0_6px_20px_rgba(132,204,22,0.28)] active:scale-[0.98] transition-all cursor-pointer select-none group"
                >
                  <div className="w-6 h-6 xs:w-6.5 xs:h-6.5 rounded-full bg-white text-[#111111] flex items-center justify-center shrink-0 shadow-2xs">
                    <CurrentIcon className="w-3.5 h-3.5 text-[#111111]" />
                  </div>
                  <span className="text-[11.5px] xs:text-[12.5px] font-bold tracking-wider uppercase font-sans whitespace-nowrap">
                    {currentItem.selectorLabel}
                  </span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5] text-[#111111] group-hover:translate-x-0.5 transition-transform shrink-0" />
                </button>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
}
