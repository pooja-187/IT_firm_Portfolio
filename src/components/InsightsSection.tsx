"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export interface InsightArticle {
  number: string;
  title: string;
  status: string;
}

export const INSIGHTS_DATA: InsightArticle[] = [
  {
    number: "01",
    title: "What to Prepare Before Hiring a UI/UX Designer",
    status: "Planned article",
  },
  {
    number: "02",
    title: "How I Approach a Business Website Redesign",
    status: "Planned article",
  },
  {
    number: "03",
    title: "Behind the Design: A Recent Client Project",
    status: "Planned article",
  },
];

export default function InsightsSection() {
  return (
    <section
      id="insights"
      aria-labelledby="insights-heading"
      className="relative w-full text-[#111111] pt-16 sm:pt-24 lg:pt-32 pb-24 sm:pb-32 lg:pb-40 overflow-hidden selection:bg-lime-200"
      style={{
        backgroundColor: "#FFFFFF",
        backgroundImage: `
          radial-gradient(
            ellipse 80% 55% at 50% 30%,
            rgba(163, 230, 53, 0.18) 0%,
            rgba(190, 242, 100, 0.08) 38%,
            rgba(217, 249, 157, 0.02) 65%,
            transparent 78%
          ),
          radial-gradient(
            ellipse 90% 65% at 55% 70%,
            rgba(163, 230, 53, 0.07) 0%,
            transparent 72%
          )
        `,
      }}
    >
      <div className="w-full max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* ===================================================
            SECTION HEADER
           =================================================== */}
        <div className="max-w-3xl mb-14 sm:mb-20 lg:mb-24">
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
              10 / INSIGHTS
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            id="insights-heading"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#111111] tracking-[-0.035em] leading-[1.10] mb-5"
          >
            Design &amp; Growth Insights
          </motion.h2>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-base sm:text-lg text-[#525B64] font-normal leading-relaxed max-w-xl"
          >
            Practical ideas from working on websites, digital products, and marketing.
          </motion.p>
        </div>

        {/* ===================================================
            EDITORIAL HORIZONTAL ARTICLE ROWS
           =================================================== */}
        <div className="w-full border-t border-black/[0.08]">
          {INSIGHTS_DATA.map((article, idx) => (
            <motion.div
              key={article.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: 0.15 + idx * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative border-b border-black/[0.08] transition-colors duration-500 hover:bg-white/60"
            >
              {/* Subtle Atmospheric Lime Glow on Row Hover */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-[#84CC16]/[0.08] via-[#84CC16]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
              />

              <div className="relative z-10 py-10 sm:py-14 lg:py-16 px-2 sm:px-4 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-10 select-none cursor-default">
                {/* Left: Article Number */}
                <div className="w-12 sm:w-16 flex-shrink-0">
                  <span className="font-mono text-sm sm:text-base font-semibold tracking-wider text-[#84CC16] group-hover:text-[#65a30d] transition-colors duration-300 block">
                    {article.number}
                  </span>
                </div>

                {/* Main: Title & Planned Article Status */}
                <div className="flex-1 flex flex-col items-start">
                  <h3 className="font-sans text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-normal text-[#111111] group-hover:text-black tracking-tight leading-[1.22] transition-all duration-300 group-hover:translate-x-1.5 sm:group-hover:translate-x-2">
                    {article.title}
                  </h3>

                  <div className="mt-3.5 sm:mt-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16] opacity-80" />
                    <span className="font-mono text-xs sm:text-[13px] tracking-wide text-[#64748B] group-hover:text-[#334155] font-medium transition-colors duration-300 uppercase">
                      {article.status}
                    </span>
                  </div>
                </div>

                {/* Right: Sleek Arrow */}
                <div className="flex items-center justify-end flex-shrink-0 pt-2 md:pt-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-black/[0.08] group-hover:border-[#84CC16] bg-white/80 group-hover:bg-[#84CC16] text-[#64748B] group-hover:text-[#111111] flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_16px_rgba(132,204,22,0.4)] group-hover:scale-105">
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
