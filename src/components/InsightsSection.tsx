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
      className="relative w-full text-[#111111] pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-24 overflow-hidden selection:bg-lime-200"
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
      <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ===================================================
            SECTION HEADER
           =================================================== */}
        <div className="max-w-2xl mb-10 sm:mb-12 lg:mb-14">
          {/* Section Badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/5 mb-4 shadow-xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16]" />
            <span className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-[#64748B]">
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
            className="font-sans text-3xl sm:text-4xl lg:text-5xl font-light text-[#111111] tracking-[-0.035em] leading-[1.12] mb-3"
          >
            Design &amp; Growth Insights
          </motion.h2>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-sm sm:text-[15px] text-[#525B64] font-normal leading-relaxed max-w-lg"
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.55,
                delay: 0.1 + idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative border-b border-black/[0.08] transition-colors duration-400 hover:bg-white/70"
            >
              {/* Subtle Atmospheric Lime Glow on Row Hover */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-[#84CC16]/[0.10] via-[#84CC16]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-lg"
              />

              <div className="relative z-10 py-5 sm:py-6 lg:py-7 px-2 sm:px-3 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 select-none cursor-default">
                {/* Left: Article Number */}
                <div className="w-10 sm:w-12 flex-shrink-0">
                  <span className="font-mono text-xs sm:text-[13px] font-semibold tracking-wider text-[#84CC16] group-hover:text-[#65a30d] transition-colors duration-300 block">
                    {article.number}
                  </span>
                </div>

                {/* Main: Title & Planned Article Status */}
                <div className="flex-1 flex flex-col items-start">
                  <h3 className="font-sans text-lg sm:text-xl md:text-[22px] lg:text-2xl font-normal text-[#111111] group-hover:text-black tracking-tight leading-[1.28] transition-all duration-300 group-hover:translate-x-1 sm:group-hover:translate-x-1.5">
                    {article.title}
                  </h3>

                  <div className="mt-1.5 sm:mt-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16] opacity-80" />
                    <span className="font-mono text-[10px] sm:text-[11px] tracking-wider text-[#64748B] group-hover:text-[#334155] font-medium transition-colors duration-300 uppercase">
                      {article.status}
                    </span>
                  </div>
                </div>

                {/* Right: Sleek Arrow */}
                <div className="flex items-center justify-end flex-shrink-0 pt-1 md:pt-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-black/[0.08] group-hover:border-[#84CC16] bg-white/80 group-hover:bg-[#84CC16] text-[#64748B] group-hover:text-[#111111] flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_12px_rgba(132,204,22,0.35)] group-hover:scale-105">
                    <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
