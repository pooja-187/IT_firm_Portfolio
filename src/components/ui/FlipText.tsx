"use client";

import React, { useState, useEffect, useMemo } from "react";

interface CascadeLineProps {
  text: string;
  className?: string;
  isSerif?: boolean;
  baseDelay?: number;
  staggerDelay?: number;
  style?: React.CSSProperties;
}

export function FlipLine({
  text,
  className = "",
  isSerif = false,
  baseDelay = 0,
  staggerDelay = 35,
  style,
}: CascadeLineProps) {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    // Initial entrance cascade roll
    const t0 = setTimeout(() => setFlipped(true), baseDelay + 150);
    const t1 = setTimeout(() => setFlipped(false), baseDelay + 1150);

    // Periodic subtle wave roll
    const interval = setInterval(() => {
      setFlipped(true);
      setTimeout(() => setFlipped(false), 1150);
    }, 5500 + baseDelay * 300);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearInterval(interval);
    };
  }, [baseDelay]);

  const chars = useMemo(() => Array.from(text), [text]);
  const isCurrentlyFlipped = hovered || flipped;
  const shiftMultiplier = 1.25;

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`inline-flex overflow-hidden relative cursor-default select-none whitespace-nowrap ${className} ${
        isSerif ? "font-serif italic font-normal tracking-normal text-[#111315]" : ""
      }`}
      style={{ height: `${shiftMultiplier}em`, lineHeight: 1.15, ...style }}
      aria-label={text}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          className="inline-block relative will-change-transform"
          style={{
            textShadow: `0 ${shiftMultiplier}em currentColor`,
            transition: `transform 420ms cubic-bezier(0.16, 1, 0.3, 1)`,
            transitionDelay: `${i * staggerDelay}ms`,
            transform: isCurrentlyFlipped
              ? `translateY(-${shiftMultiplier}em)`
              : "translateY(0)",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
