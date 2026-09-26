"use client";

import React from "react";
import { motion } from "framer-motion";

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

export default function WhyWorkWithMe() {
  return (
    <section
      id="why-work-with-me"
      aria-labelledby="why-work-heading"
      className="relative w-full text-[#111111] pt-16 sm:pt-20 lg:pt-28 pb-20 sm:pb-28 lg:pb-36 overflow-hidden selection:bg-lime-200"
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
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-8 xl:gap-14">
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
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/5 mb-6 shadow-xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16]" />
              <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#64748B]">
                06 / WHY WORK WITH ME
              </span>
            </motion.div>

            {/* Main Editorial Heading */}
            <motion.h2
              id="why-work-heading"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-4xl sm:text-5xl lg:text-5xl xl:text-[58px] 2xl:text-[64px] font-light text-[#111111] tracking-[-0.035em] leading-[1.08] max-w-lg"
            >
              Design decisions with a business purpose.
            </motion.h2>
          </div>

          {/* ===================================================
              RIGHT SIDE: 4 Vertical Editorial Columns (~64%)
             =================================================== */}
          <div className="w-full lg:w-[64%] xl:w-[66%]">
            {/* Desktop & Tablet Column Grid */}
            <div className="hidden md:grid md:grid-cols-4 relative border-l border-black/[0.08]">
              {VALUE_PROPOSITIONS.map((prop, idx) => (
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
                  {/* Top Animated Lime Accent Line */}
                  <div className="absolute top-0 inset-x-0 h-[2.5px] bg-[#84CC16] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out z-20 shadow-[0_0_14px_#84CC16]" />

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

            {/* Mobile Vertical Editorial Stack (< 768px) */}
            <div className="md:hidden flex flex-col divide-y divide-black/[0.08] border-y border-black/[0.08]">
              {VALUE_PROPOSITIONS.map((prop, idx) => (
                <motion.div
                  key={`mobile-${prop.number}`}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.08,
                    ease: "easeOut",
                  }}
                  className="py-8 px-2 flex flex-col relative group"
                >
                  <div className="mb-3">
                    <span className="inline-flex items-center font-mono text-xs font-semibold tracking-widest text-[#84CC16] bg-[#84CC16]/10 px-2 py-0.5 rounded-full">
                      {prop.number}
                    </span>
                  </div>
                  <h3 className="font-sans text-xl font-normal text-[#111111] tracking-tight leading-snug mb-3">
                    {prop.title}
                  </h3>
                  <p className="font-sans text-sm text-[#525B64] font-normal leading-relaxed">
                    {prop.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
