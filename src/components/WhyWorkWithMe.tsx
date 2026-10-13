"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ValueProposition {
  number: string;
  title: string;
  description: string;
}

export const VALUE_PROPOSITIONS: ValueProposition[] = [
  {
    number: "01",
    title: "A design and marketing perspective",
    description:
      "I consider how people discover your business, experience your website, and decide whether to contact you.",
  },
  {
    number: "02",
    title: "Direct collaboration",
    description:
      "You work with me to define priorities, review ideas, and make informed decisions throughout the project.",
  },
  {
    number: "03",
    title: "Support from a creative team",
    description:
      "When your project needs broader expertise, Manzio brings together design, development, branding, and marketing support.",
  },
  {
    number: "04",
    title: "Clear reasoning behind the work",
    description:
      "I explain the thinking behind key decisions so you understand how the design supports your users and goals.",
  },
];

import { contentService } from "@/services/ContentService";
import { STORAGE_KEYS } from "@/services/StorageService";

export default function WhyWorkWithMe() {
  const [propositions, setPropositions] = useState<ValueProposition[]>(VALUE_PROPOSITIONS);
  const [activeMobileIdx, setActiveMobileIdx] = useState<number | null>(null);

  React.useEffect(() => {
    const loadValues = () => {
      const managed = contentService.getValues(true);
      if (managed && managed.length > 0) {
        setPropositions(
          managed.map((v) => ({
            number: v.number,
            title: v.title,
            description: v.description,
          }))
        );
      }
    };
    loadValues();

    const unsubscribe = contentService.subscribe((key) => {
      if (key === STORAGE_KEYS.VALUES) {
        loadValues();
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <section
      id="why-work-with-me"
      aria-labelledby="why-work-heading"
      className="relative w-full text-[#111111] pt-14 sm:pt-20 lg:pt-28 pb-16 sm:pb-28 lg:pb-36 overflow-hidden selection:bg-lime-200 scroll-mt-24 sm:scroll-mt-28"
      style={{
        backgroundColor: "#FFFFFF",
        backgroundImage: `
          radial-gradient(
            ellipse 75% 55% at 30% 45%,
            rgba(163, 230, 53, 0.18) 0%,
            rgba(190, 242, 100, 0.08) 38%,
            rgba(217, 249, 157, 0.02) 65%,
            transparent 78%
          ),
          radial-gradient(
            ellipse 90% 65% at 65% 50%,
            rgba(163, 230, 53, 0.06) 0%,
            transparent 70%
          )
        `,
      }}
    >

      <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-8 xl:gap-14">
          {/* ===================================================
              LEFT SIDE: Editorial Section Anchor (~36%)
             =================================================== */}
          <div className="w-full lg:w-[36%] xl:w-[34%] flex flex-col items-start pr-0 lg:pr-6">
            {/* Section Badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/5 mb-5 sm:mb-6 shadow-xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16]" />
              <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#64748B]">
                06 / WHY WORK WITH ME
              </span>
            </motion.div>

            {/* Main Editorial Heading - unified size on mobile */}
            <motion.h2
              id="why-work-heading"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-3xl sm:text-4xl lg:text-5xl xl:text-[58px] 2xl:text-[64px] font-light text-[#111111] tracking-[-0.03em] leading-[1.12] sm:leading-[1.08] max-w-lg mb-2 sm:mb-0"
            >
              Design decisions with a business purpose.
            </motion.h2>
          </div>

          {/* ===================================================
              RIGHT SIDE: Columns (Desktop) / Horizontal Rows (Mobile)
             =================================================== */}
          <div className="w-full lg:w-[64%] xl:w-[66%]">
            {/* Desktop & Tablet Column Grid (100% preserved) */}
            <div className="hidden md:grid md:grid-cols-4 relative border-l border-black/[0.08]">
              {propositions.map((prop, idx) => (
                <motion.div
                  key={prop.number}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.6,
                    delay: 0.15 + idx * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group relative flex flex-col justify-between p-6 lg:p-7 xl:p-8 min-h-[400px] lg:min-h-[460px] xl:min-h-[480px] border-r border-black/[0.08] transition-all duration-500 hover:bg-white/80 hover:backdrop-blur-xs hover:shadow-[0_25px_50px_rgba(132,204,22,0.14)] cursor-default select-none overflow-hidden"
                >
                  {/* Rich Luminous Ambient Glow on Hover */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-b from-[#84CC16]/22 via-[#84CC16]/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  />

                  {/* Radial Spotlight Bloom */}
                  <div
                    aria-hidden="true"
                    className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#84CC16]/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  />

                  {/* Top Block: Number Badge & Title */}
                  <div className="relative z-10">
                    <div className="mb-5">
                      <span className="inline-flex items-center justify-center font-mono text-xs xl:text-[13px] font-semibold tracking-widest text-[#65a30d] group-hover:text-[#111111] bg-black/[0.03] group-hover:bg-[#84CC16] px-2.5 py-0.5 rounded-full transition-all duration-300 select-none shadow-xs group-hover:shadow-[0_0_14px_rgba(132,204,22,0.6)] group-hover:scale-105">
                        {prop.number}
                      </span>
                    </div>

                    <h3 className="font-sans text-xl lg:text-[22px] xl:text-2xl font-normal text-[#111111] group-hover:text-black tracking-tight leading-[1.25] transition-all duration-300 group-hover:-translate-y-0.5">
                      {prop.title}
                    </h3>
                  </div>

                  {/* Bottom Block: Description Positioned in Lower Portion */}
                  <div className="relative z-10 pt-12 lg:pt-16">
                    <p className="font-sans text-[13.5px] lg:text-[14px] xl:text-[15px] text-[#525B64] group-hover:text-[#0f172a] font-normal leading-[1.68] transition-colors duration-300">
                      {prop.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile Horizontal Rows (< 768px) with matching colors, design & dynamic hover effects */}
            <div
              className="md:hidden flex flex-col space-y-3.5 w-full"
              onPointerLeave={() => setActiveMobileIdx(null)}
              onMouseLeave={() => setActiveMobileIdx(null)}
            >
              {propositions.map((prop, idx) => {
                const isSelected = activeMobileIdx === idx;
                return (
                  <motion.div
                    key={`mobile-${prop.number}`}
                    onClick={() => setActiveMobileIdx((prev) => (prev === idx ? null : idx))}
                    onPointerEnter={() => setActiveMobileIdx(idx)}
                    onPointerMove={() => {
                      if (activeMobileIdx !== idx) setActiveMobileIdx(idx);
                    }}
                    onPointerOver={() => {
                      if (activeMobileIdx !== idx) setActiveMobileIdx(idx);
                    }}
                    onMouseEnter={() => setActiveMobileIdx(idx)}
                    onMouseMove={() => {
                      if (activeMobileIdx !== idx) setActiveMobileIdx(idx);
                    }}
                    onTouchStart={() => setActiveMobileIdx(idx)}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{
                      duration: 0.45,
                      delay: idx * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={cn(
                      "group relative flex flex-col p-5 xs:p-6 rounded-[22px] border transition-all duration-300 select-none overflow-hidden cursor-pointer",
                      isSelected
                        ? "bg-white/95 border-[#84CC16]/50 shadow-[0_16px_36px_rgba(132,204,22,0.18)] -translate-y-0.5"
                        : "bg-white/60 hover:bg-white/95 border-black/[0.08] hover:border-[#84CC16]/50 shadow-xs hover:shadow-[0_16px_36px_rgba(132,204,22,0.18)] hover:-translate-y-0.5"
                    )}
                  >
                    {/* Rich Luminous Ambient Glow (matching desktop) */}
                    <div
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-0 bg-gradient-to-r from-[#84CC16]/22 via-[#84CC16]/[0.08] to-transparent pointer-events-none transition-opacity duration-300",
                        isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      )}
                    />

                    {/* Radial Spotlight Bloom (matching desktop) */}
                    <div
                      aria-hidden="true"
                      className={cn(
                        "absolute -top-16 -left-10 w-48 h-48 bg-[#84CC16]/30 rounded-full blur-2xl pointer-events-none transition-opacity duration-300",
                        isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      )}
                    />

                    {/* Top Row: Number Badge & Title */}
                    <div className="relative z-10 flex items-start gap-3.5 mb-2.5">
                      <span
                        className={cn(
                          "inline-flex items-center justify-center font-mono text-xs font-semibold tracking-widest px-2.5 py-0.5 rounded-full transition-all duration-300 select-none shadow-xs shrink-0 mt-0.5",
                          isSelected
                            ? "bg-[#84CC16] text-[#111111] shadow-[0_0_14px_rgba(132,204,22,0.6)] scale-105"
                            : "bg-black/[0.04] text-[#65a30d] group-hover:bg-[#84CC16] group-hover:text-[#111111] group-hover:shadow-[0_0_14px_rgba(132,204,22,0.6)] group-hover:scale-105"
                        )}
                      >
                        {prop.number}
                      </span>

                      <h3
                        className={cn(
                          "font-sans text-lg xs:text-[19px] font-normal tracking-tight leading-snug transition-colors duration-300",
                          isSelected ? "text-black font-medium" : "text-[#111111] group-hover:text-black group-hover:font-medium"
                        )}
                      >
                        {prop.title}
                      </h3>
                    </div>

                    {/* Bottom Row: Description */}
                    <div className="relative z-10 pl-10 xs:pl-11">
                      <p
                        className={cn(
                          "font-sans text-[12.5px] xs:text-[13.5px] font-normal leading-relaxed transition-colors duration-300",
                          isSelected ? "text-[#0f172a]" : "text-[#525B64] group-hover:text-[#0f172a]"
                        )}
                      >
                        {prop.description}
                      </p>
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
