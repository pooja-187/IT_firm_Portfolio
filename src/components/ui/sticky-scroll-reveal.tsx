"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface StickyScrollContent {
  title: string;
  description: string;
  tag?: string;
  content?: React.ReactNode | any;
}

export const StickyScroll = ({
  content,
  contentClassName,
  className,
  theme = "light",
  backgroundColors,
  linearGradients,
  panelHeight = "h-[26rem] sm:h-[28rem] lg:h-[30rem]",
}: {
  content: StickyScrollContent[];
  contentClassName?: string;
  className?: string;
  theme?: "light" | "dark";
  backgroundColors?: string[];
  linearGradients?: string[];
  panelHeight?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Classy, premium light-mode palettes with soft light-green / lime tints
  const defaultLightBg = [
    "rgba(255, 255, 255, 0.98)", // Pure crisp white with soft lime ambient
    "rgba(251, 254, 244, 0.98)", // Airy lime-tinted off-white
    "rgba(246, 253, 238, 0.98)", // Soft organic lime wash
    "rgba(252, 255, 247, 0.98)", // Pearlescent light green tint
  ];

  const defaultDarkBg = [
    "rgb(15 23 42)", // slate-900
    "rgb(0 0 0)", // black
    "rgb(23 23 23)", // neutral-900
  ];

  const defaultLightGradients = [
    "linear-gradient(to bottom right, rgba(163, 230, 53, 0.35), rgba(190, 242, 100, 0.15))",
    "linear-gradient(to bottom right, rgba(132, 204, 22, 0.30), rgba(163, 230, 53, 0.15))",
    "linear-gradient(to bottom right, rgba(163, 230, 53, 0.30), rgba(217, 249, 157, 0.18))",
    "linear-gradient(to bottom right, rgba(101, 163, 13, 0.25), rgba(163, 230, 53, 0.18))",
  ];

  const defaultDarkGradients = [
    "linear-gradient(to bottom right, rgb(6 182 212), rgb(16 185 129))",
    "linear-gradient(to bottom right, rgb(236 72 153), rgb(99 102 241))",
    "linear-gradient(to bottom right, rgb(249 115 22), rgb(234 179 8))",
  ];

  const activeBgColors =
    backgroundColors || (theme === "light" ? defaultLightBg : defaultDarkBg);
  const activeGradients =
    linearGradients || (theme === "light" ? defaultLightGradients : defaultDarkGradients);

  const [, setBackgroundGradient] = useState(
    activeGradients[0]
  );

  useEffect(() => {
    setBackgroundGradient(activeGradients[activeCard % activeGradients.length]);
  }, [activeCard, activeGradients]);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const containerRect = container.getBoundingClientRect();
    const triggerY = containerRect.top + containerRect.height * 0.35;

    let closestIndex = 0;
    let minDistance = Infinity;

    cardRefs.current.forEach((cardEl, idx) => {
      if (!cardEl) return;
      const cardRect = cardEl.getBoundingClientRect();
      const cardMid = cardRect.top + cardRect.height * 0.35;
      const distance = Math.abs(cardMid - triggerY);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    if (closestIndex !== activeCard) {
      setActiveCard(closestIndex);
    }
  };

  const scrollToCard = (index: number) => {
    const cardEl = cardRefs.current[index];
    if (cardEl && scrollContainerRef.current) {
      cardEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const isLight = theme === "light";

  return (
    <motion.div
      animate={{
        backgroundColor: activeBgColors[activeCard % activeBgColors.length],
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        panelHeight,
        "relative rounded-[26px] sm:rounded-[28px] overflow-hidden transition-colors duration-500",
        isLight
          ? "border border-lime-200/70 shadow-[0_18px_50px_rgba(163,230,53,0.07),0_3px_18px_rgba(0,0,0,0.03)] selection:bg-lime-200 selection:text-black"
          : "border border-white/10 shadow-2xl selection:bg-lime-400 selection:text-black",
        className
      )}
    >
      {/* Light-mode internal ambient lime glow orbs */}
      {isLight && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          {/* Top-left soft diffused lime tint */}
          <div className="absolute top-0 left-1/4 w-[420px] h-[300px] bg-[#A3E635]/14 rounded-full blur-[80px]" />
          {/* Bottom-left gentle radiant warmth */}
          <div className="absolute bottom-0 left-8 w-[380px] h-[260px] bg-[#BEF264]/10 rounded-full blur-[75px]" />
        </div>
      )}

      {/* Split Layout: Left Scrollable Narrative Column + Right Full-Bleed Sticky Visual */}
      <div className="relative z-10 flex flex-col lg:flex-row h-full w-full items-stretch">

        {/* Left Column: Scrollable Narrative Cards (Direct native scroll container) */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          tabIndex={0}
          className="w-full lg:w-[53%] xl:w-[50%] h-full overflow-y-auto overflow-x-hidden px-5 sm:px-8 lg:pl-9 lg:pr-6 py-6 sm:py-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden focus:outline-none"
        >
          {/* Interactive Progress Indicator Dots */}
          <div className="flex items-center gap-1.5 mb-5 sm:mb-6 sticky top-0 bg-inherit py-1.5 z-20">
            {content.map((_, i) => (
              <button
                key={`indicator-${i}`}
                type="button"
                onClick={() => scrollToCard(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 cursor-pointer focus:outline-none",
                  activeCard === i
                    ? "w-6 bg-[#84CC16]"
                    : "w-1.5 bg-neutral-300/80 hover:bg-neutral-400"
                )}
                aria-label={`Jump to slide ${i + 1}`}
              />
            ))}
            <span className="font-sans text-[10px] sm:text-[11px] font-medium text-[#64748B] ml-2 uppercase tracking-wider">
              {String(activeCard + 1).padStart(2, "0")} / {String(content.length).padStart(2, "0")}
            </span>
          </div>

          <div className="max-w-xl">
            {content.map((item, index) => (
              <div
                key={item.title + index}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="my-10 sm:my-14 first:mt-1 last:mb-24 cursor-pointer transition-opacity duration-300"
                onClick={() => scrollToCard(index)}
              >
                {/* Category Tag */}
                {item.tag && (
                  <div
                    className={cn(
                      "mb-2.5 inline-flex items-center gap-1.5 transition-opacity duration-300",
                      activeCard === index ? "opacity-100" : "opacity-40"
                    )}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16]" />
                    <span className="font-sans text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-[#65A30D]">
                      {item.tag}
                    </span>
                  </div>
                )}

                {/* Card Title */}
                <h2
                  className={cn(
                    "text-xl sm:text-2xl lg:text-[26px] tracking-[-0.025em] leading-[1.2] transition-opacity duration-300",
                    isLight ? "text-[#111315] font-light" : "text-slate-100 font-bold",
                    activeCard === index ? "opacity-100 font-normal" : "opacity-30"
                  )}
                >
                  {item.title}
                </h2>

                {/* Card Description */}
                <p
                  className={cn(
                    "text-xs sm:text-[14px] max-w-sm sm:max-w-md mt-3.5 sm:mt-4 leading-relaxed transition-opacity duration-300",
                    isLight ? "text-[#525B64] font-normal" : "text-slate-300 font-normal",
                    activeCard === index ? "opacity-100" : "opacity-30"
                  )}
                >
                  {item.description}
                </p>

                {/* Mobile Inline Visual Preview */}
                <div className="lg:hidden mt-5 rounded-2xl overflow-hidden h-52 w-full relative shadow-md border border-lime-200/50">
                  {item.content}
                </div>
              </div>
            ))}
            <div className="h-20" />
          </div>
        </div>

        {/* Right Column: Full-Bleed Visual Panel (Spans Top, Bottom, and Right Corner) */}
        <div
          onWheel={(e) => {
            if (scrollContainerRef.current) {
              scrollContainerRef.current.scrollTop += e.deltaY;
            }
          }}
          className={cn(
            "hidden lg:block lg:w-[47%] xl:w-[50%] h-full relative overflow-hidden",
            "border-l border-lime-200/40 shadow-[-10px_0_24px_rgba(0,0,0,0.025)] cursor-default select-none",
            contentClassName
          )}
        >
          <div className="w-full h-full relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCard}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full h-full absolute inset-0"
              >
                {content[activeCard]?.content ?? null}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default StickyScroll;
