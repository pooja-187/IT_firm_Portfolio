"use client";

import React from "react";
import DotMatrixText from "@/components/ui/dot-text";

export default function DotMatrixDemo() {
  return (
    <section
      aria-label="Interactive Typography Showcase"
      className="relative w-full min-h-[460px] md:min-h-[560px] flex items-center justify-center overflow-hidden select-none border-t border-lime-400/25"
      style={{
        backgroundColor: "#142304",
        backgroundImage: `
          radial-gradient(
            ellipse 88% 68% at 50% 50%,
            #84cc16 0%,
            #65a30d 30%,
            #4d7c0f 58%,
            #365314 80%,
            #142304 100%
          ),
          linear-gradient(
            135deg,
            #365314 0%,
            #4d7c0f 25%,
            #65a30d 50%,
            #84cc16 80%,
            #a3e635 100%
          )
        `,
      }}
    >
      {/* Signature Brand Lime Ambient Glow Orbs */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-[#A3E635]/35 rounded-full blur-[140px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -top-20 left-1/4 w-[480px] h-[360px] bg-[#BEF264]/25 rounded-full blur-[120px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-20 right-1/4 w-[480px] h-[360px] bg-[#84CC16]/30 rounded-full blur-[120px] pointer-events-none"
      />

      {/* Pure Dot Matrix Typography Stage with Glowing White Text */}
      <div className="relative z-10 w-full max-w-5xl px-6 h-56 md:h-80 flex items-center justify-center">
        <DotMatrixText
          text={["EaseMize", "Design", "Develop"]}
          transition="fade"
          cycleInterval={3000}
          dotSize={4}
          gap={2.5}
          activeColor="#ffffff"
          inactiveColor="rgba(255, 255, 255, 0.20)"
          showInactive={true}
          className="w-full h-full drop-shadow-[0_4px_18px_rgba(0,0,0,0.32)] drop-shadow-[0_0_28px_rgba(255,255,255,0.75)]"
        />
      </div>
    </section>
  );
}
