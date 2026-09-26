"use client";

import React from "react";
import FeatureCarousel from "@/components/ui/feature-carousel";

export function FeatureCarouselDemo() {
  return (
    <section id="features" className="w-full bg-white relative py-12 sm:py-16 lg:py-20 selection:bg-sky-200">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <FeatureCarousel />
      </div>
    </section>
  );
}

export default FeatureCarouselDemo;
