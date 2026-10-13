"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

import { contentService } from "@/services/ContentService";
import { STORAGE_KEYS } from "@/services/StorageService";
import { ArticleItemData } from "@/types/portfolio";

export type ArticleItem = ArticleItemData;

const fallbackArticles: ArticleItemData[] = [
  {
    id: "art-1",
    number: "01",
    category: "INSIGHTS",
    title: "What to Prepare Before Hiring a UI/UX Designer",
    slug: "what-to-prepare-before-hiring-ui-ux-designer",
    description: "Planned article.",
    status: "PLANNED",
    image:
      "https://cdn.21st.dev/assets/mirror/b1/b1177c0755f746a3864277b0a089b7c6a89cf374ed1fe36666e4adf5c473cc1e.jpg",
    displayOrder: 1,
  },
  {
    id: "art-2",
    number: "02",
    category: "INSIGHTS",
    title: "How I Approach a Business Website Redesign",
    slug: "how-i-approach-business-website-redesign",
    description: "Planned article.",
    status: "PLANNED",
    image:
      "https://cdn.21st.dev/assets/mirror/56/56eec2c41db77472758692502d75accb6c923ecec986bce58bafe1fb9f233b4f.jpg",
    displayOrder: 2,
  },
  {
    id: "art-3",
    number: "03",
    category: "INSIGHTS",
    title: "Behind the Design: A Recent Client Project",
    slug: "behind-the-design-recent-client-project",
    description: "Planned article.",
    status: "PLANNED",
    image:
      "https://cdn.21st.dev/assets/mirror/c1/c1f7a98c5bf068254308b7dca62217f47a7c852fe792d6e37dbc81f5b262b6e8.jpg",
    displayOrder: 3,
  },
];

function InsightCard({ article, index }: { article: ArticleItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Elegant, restrained tilt: rotateX max ±1.8deg, rotateY max ±2.2deg
    const rotX = ((y - centerY) / centerY) * -1.8;
    const rotY = ((x - centerX) / centerX) * 2.2;

    setRotate({ x: rotX, y: rotY });
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.65,
        delay: 0.15 + index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="w-full flex justify-center"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative w-full max-w-[360px] md:max-w-none flex flex-col rounded-[22px] sm:rounded-[24px] bg-white border overflow-hidden select-none cursor-default transition-all duration-450 ease-out"
        style={{
          borderColor: isHovered ? "rgba(183, 227, 106, 0.55)" : "rgba(17, 17, 17, 0.065)",
          transform: isHovered
            ? `perspective(1100px) translateY(-8px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(1.012)`
            : "perspective(1100px) translateY(0px) rotateX(0deg) rotateY(0deg) scale(1)",
          boxShadow: isHovered
            ? "0 22px 50px rgba(17, 17, 17, 0.09), 0 8px 25px rgba(183, 227, 106, 0.14)"
            : "0 10px 30px rgba(17, 17, 17, 0.04), 0 2px 8px rgba(17, 17, 17, 0.025)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Interactive Mouse-Following Soft Lime Light Spot */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle 240px at ${mousePos.x}px ${mousePos.y}px, rgba(183, 227, 106, 0.15), transparent 65%)`,
          }}
        />

        {/* 3:2 Aspect Ratio Article Image Container */}
        <div className="relative w-full aspect-[3/2] overflow-hidden bg-slate-100 rounded-t-[22px] sm:rounded-t-[24px]">
          <Image
            alt={article.title}
            src={article.image || "/placeholder.svg"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
          />

          {/* Subtle Translucent Lime/Atmosphere Overlay on Hover */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/[0.08] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-450 pointer-events-none"
            style={{
              backgroundColor: isHovered ? "rgba(183, 227, 106, 0.04)" : "transparent",
            }}
          />

          {/* Premium Diagonal Light Sheen on Hover */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"
            style={{
              background:
                "linear-gradient(110deg, transparent 35%, rgba(255, 255, 255, 0.22) 50%, transparent 65%)",
            }}
          />
        </div>

        {/* Card Content Area */}
        <div className="p-5 sm:p-5.5 flex-1 flex flex-col justify-between bg-white relative z-10">
          <div>
            {/* Top Row: Article Number & Planned Indicator */}
            <div className="flex items-center justify-between mb-2.5">
              <span className="font-mono text-xs font-semibold text-[#78B82A] group-hover:text-[#5E9F16] transition-all duration-300 group-hover:-translate-y-0.5 inline-block tracking-wider">
                {article.number}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10.5px] font-medium text-slate-400 tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16]/70 transition-transform duration-300 group-hover:scale-125 group-hover:bg-[#84CC16]" />
                Planned
              </span>
            </div>

            {/* Article Title */}
            <h3 className="font-sans text-[16.5px] sm:text-[18px] lg:text-[19px] font-medium text-[#111111] leading-[1.28] tracking-tight group-hover:text-black transition-colors duration-300 mb-2">
              {article.title}
            </h3>

            {/* Description */}
            <p className="font-sans text-xs sm:text-[12.5px] text-slate-500 leading-relaxed font-normal mb-4 sm:mb-5">
              {article.description}
            </p>
          </div>

          {/* Bottom Action Row */}
          <div className="mt-auto pt-3.5 border-t border-black/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Arrow Button with Subtle Lime Glow on Hover */}
              <div className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-xl border border-black/[0.08] bg-[#FAFAFA] flex items-center justify-center transition-all duration-300 group-hover:border-[#B7E36A]/75 group-hover:bg-[#B7E36A]/18 group-hover:shadow-[0_0_14px_rgba(183,227,106,0.32)] text-[#111111]">
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-rotate-6" />
              </div>

              {/* Action Label */}
              <span className="font-sans text-xs sm:text-[12.5px] font-medium text-[#111111] group-hover:text-black transition-colors duration-300">
                Planned article
              </span>
            </div>

            {/* Elegant Thin Divider Accent with Lime Hover Reveal */}
            <div className="w-7 sm:w-10 h-px bg-slate-200 group-hover:bg-[#B7E36A] group-hover:w-12 transition-all duration-300" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Component() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeBlogIdx, setActiveBlogIdx] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [articles, setArticles] = useState<ArticleItemData[]>(fallbackArticles);

  useEffect(() => {
    const loadArticles = () => {
      const loaded = contentService.getInsights(true);
      if (loaded && loaded.length > 0) {
        setArticles(loaded);
      } else if (loaded) {
        setArticles([]);
      }
    };

    loadArticles();

    const unsubscribe = contentService.subscribe((key) => {
      if (key === STORAGE_KEYS.INSIGHTS || key === "ALL") {
        loadArticles();
      }
    });

    return () => unsubscribe();
  }, []);

  // Auto-scroll to left one by one on mobile view
  useEffect(() => {
    if (isInteracting || articles.length === 0) return;
    const interval = setInterval(() => {
      if (!scrollRef.current) return;
      const nextIdx = (activeBlogIdx + 1) % articles.length;
      const container = scrollRef.current;
      const card = container.children[nextIdx] as HTMLElement | undefined;
      if (card) {
        container.scrollTo({
          left: card.offsetLeft - container.offsetLeft,
          behavior: "smooth",
        });
        setActiveBlogIdx(nextIdx);
      }
    }, 3800);

    return () => clearInterval(interval);
  }, [activeBlogIdx, isInteracting, articles.length]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const card = container.firstElementChild as HTMLElement | null;
    const cardWidth = card ? card.offsetWidth + 16 : 300;
    const index = Math.round(scrollLeft / cardWidth);
    if (index >= 0 && index < articles.length && index !== activeBlogIdx) {
      setActiveBlogIdx(index);
    }
  };

  const scrollToCard = (index: number) => {
    setActiveBlogIdx(index);
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const card = container.children[index] as HTMLElement | undefined;
    if (card) {
      container.scrollTo({
        left: card.offsetLeft - container.offsetLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="insights"
      aria-labelledby="insights-heading"
      className="relative w-full text-[#111111] pt-14 sm:pt-20 lg:pt-24 pb-16 sm:pb-24 lg:pb-28 overflow-hidden selection:bg-lime-200 scroll-mt-24 sm:scroll-mt-28"
      style={{
        backgroundColor: "#FFFFFF",
        backgroundImage: `
          radial-gradient(
            ellipse 80% 50% at 50% 30%,
            rgba(163, 230, 53, 0.18) 0%,
            rgba(190, 242, 100, 0.08) 38%,
            rgba(217, 249, 157, 0.02) 65%,
            transparent 78%
          ),
          radial-gradient(
            ellipse 85% 60% at 50% 65%,
            rgba(163, 230, 53, 0.08) 0%,
            transparent 72%
          )
        `,
      }}
    >
      {/* ===================================================
          LARGE SOFT AMBIENT LIME GLOW BEHIND CARDS
         =================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-[1050px] h-[450px] rounded-full blur-[85px] opacity-75 z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(183, 227, 106, 0.20) 0%, rgba(183, 227, 106, 0.08) 45%, transparent 72%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===================================================
            SECTION HEADER
           =================================================== */}
        <div className="mb-10 sm:mb-14 text-center max-w-2xl mx-auto">
          {/* Subtle Centered Section Badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-black/[0.06] mb-3.5 sm:mb-4 shadow-2xs backdrop-blur-xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#8CC63F] animate-pulse" />
            <span className="font-sans text-[10.5px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-slate-600">
              09 / INSIGHTS
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            id="insights-heading"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] font-light text-[#111111] tracking-[-0.035em] leading-[1.14] mb-3.5"
          >
            Design &amp; Growth Insights
          </motion.h2>

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-sm sm:text-[15px] text-slate-600 font-normal leading-relaxed max-w-lg mx-auto"
          >
            Practical ideas from working on websites, digital products, and marketing.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-xs sm:text-[13px] text-slate-400 font-normal leading-relaxed max-w-md mx-auto mt-1.5"
          >
            Explore observations, project lessons, and straightforward advice to help you make better decisions about your digital presence.
          </motion.p>
        </div>

        {/* ===================================================
            1. DESKTOP 3-COLUMN GRID (>= 768px)
            100% UNCHANGED
           =================================================== */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch justify-items-center md:justify-items-stretch">
          {articles.map((article, idx) => (
            <InsightCard key={article.id || article.number} article={article} index={idx} />
          ))}
        </div>

        {/* ===================================================
            2. MOBILE AUTO-SCROLLING HORIZONTAL CAROUSEL (< 768px)
            Automatically scrolls to left one by one
           =================================================== */}
        <div className="md:hidden relative w-full overflow-hidden">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            onTouchStart={() => setIsInteracting(true)}
            onTouchEnd={() => {
              setTimeout(() => setIsInteracting(false), 2500);
            }}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-3 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {articles.map((article, idx) => (
              <div
                key={`mobile-${article.id || article.number}`}
                className="w-[84vw] max-w-[325px] shrink-0 snap-center"
              >
                <InsightCard article={article} index={idx} />
              </div>
            ))}
          </div>

          {/* Sleek Pagination indicator dots */}
          <div className="flex justify-center items-center gap-2 mt-4">
            {articles.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToCard(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                  activeBlogIdx === idx
                    ? "w-7 bg-[#84CC16]"
                    : "w-2 bg-black/15 hover:bg-black/30"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
