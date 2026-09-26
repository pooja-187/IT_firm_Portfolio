"use client";

import React from "react";
import FeatureCarousel from "@/components/ui/feature-carousel";

export function FeatureCarouselDemo() {
  return (
    <section
      id="features"
      className="relative w-full overflow-hidden py-14 sm:py-20 lg:py-28 selection:bg-lime-200"
      style={{
        backgroundColor: '#FFFFFF',
        backgroundImage: `
          radial-gradient(
            ellipse 75% 55% at 50% 50%,
            rgba(163, 230, 53, 0.28) 0%,
            rgba(190, 242, 100, 0.14) 40%,
            rgba(217, 249, 157, 0.05) 65%,
            transparent 80%
          ),
          radial-gradient(
            ellipse 85% 65% at 50% 50%,
            rgba(163, 230, 53, 0.12) 0%,
            transparent 75%
          )
        `,
      }}
    >
      {/* Atmospheric lime glow orbs reaching to the edges */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 -left-24 w-[550px] h-[550px] bg-[#84CC16]/18 rounded-full blur-[130px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/3 -right-24 w-[550px] h-[550px] bg-[#A3E635]/20 rounded-full blur-[130px] pointer-events-none"
      />

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <FeatureCarousel />
      </div>
    </section>
  );
}

export default FeatureCarouselDemo;
