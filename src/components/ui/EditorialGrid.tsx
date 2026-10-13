"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface EditorialGridLinesProps {
  /**
   * Visibility rhythm level:
   * Level 1: Very subtle (Hero, Selected Work, Testimonials, FAQ) ~0.04-0.05
   * Level 2: Subtle / Visible (Expertise, Services, About, Insights, Contact) ~0.06-0.075
   * Level 3: Structural (Process, Why Work With Me, Manzio, Footer) ~0.08-0.11
   */
  level?: 1 | 2 | 3;
  variant?: "light" | "dark";
  maxWidth?: string;
  padding?: string;
  fadeEdges?: boolean;
  className?: string;
}

export function EditorialGridLines({
  level = 2,
  variant = "light",
  maxWidth = "max-w-7xl",
  padding = "px-4 sm:px-6 lg:px-8",
  fadeEdges = true,
  className,
}: EditorialGridLinesProps) {
  // Line color mapping based on level & variant
  const getLineColor = () => {
    if (variant === "dark") {
      switch (level) {
        case 1:
          return "rgba(255, 255, 255, 0.045)";
        case 3:
          return "rgba(255, 255, 255, 0.09)";
        case 2:
        default:
          return "rgba(255, 255, 255, 0.065)";
      }
    }

    switch (level) {
      case 1:
        return "rgba(17, 17, 17, 0.045)";
      case 3:
        return "rgba(17, 17, 17, 0.095)";
      case 2:
      default:
        return "rgba(17, 17, 17, 0.065)";
    }
  };

  const lineColor = getLineColor();

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-0 overflow-hidden select-none",
        fadeEdges && "editorial-grid-mask",
        className
      )}
    >
      <div
        className={cn(
          "w-full h-full mx-auto relative",
          maxWidth,
          padding
        )}
      >
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 h-full w-full">
          {/* Columns 0..3: Mobile, Tablet & Desktop (4 cols) */}
          {[0, 1, 2, 3].map((col) => (
            <div
              key={`col-${col}`}
              style={{
                borderRight: `1px solid ${lineColor}`,
                borderLeft: col === 0 ? `1px solid ${lineColor}` : undefined,
              }}
              className="h-full w-full"
            />
          ))}

          {/* Columns 4..7: Tablet & Desktop (extends to 8 cols on >=768px) */}
          {[4, 5, 6, 7].map((col) => (
            <div
              key={`col-${col}`}
              style={{
                borderRight: `1px solid ${lineColor}`,
              }}
              className="h-full w-full hidden md:block"
            />
          ))}

          {/* Columns 8..11: Desktop only (extends to 12 cols on >=1024px) */}
          {[8, 9, 10, 11].map((col) => (
            <div
              key={`col-${col}`}
              style={{
                borderRight: `1px solid ${lineColor}`,
              }}
              className="h-full w-full hidden lg:block"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export interface EditorialRuleProps {
  level?: 1 | 2 | 3;
  variant?: "light" | "dark";
  maxWidth?: string;
  className?: string;
  withCorners?: boolean;
}

export function EditorialRule({
  level = 2,
  variant = "light",
  maxWidth = "max-w-7xl",
  className,
  withCorners = false,
}: EditorialRuleProps) {
  const getRuleColor = () => {
    if (variant === "dark") {
      return level === 3
        ? "rgba(255, 255, 255, 0.12)"
        : "rgba(255, 255, 255, 0.08)";
    }
    return level === 3
      ? "rgba(17, 17, 17, 0.10)"
      : level === 1
      ? "rgba(17, 17, 17, 0.05)"
      : "rgba(17, 17, 17, 0.075)";
  };

  const ruleColor = getRuleColor();

  return (
    <div
      aria-hidden="true"
      className={cn("w-full mx-auto relative select-none pointer-events-none", maxWidth, className)}
    >
      <div
        className="w-full h-px"
        style={{ backgroundColor: ruleColor }}
      />
      {withCorners && (
        <>
          <span
            className="absolute left-0 -top-1.5 font-mono text-[9px] select-none"
            style={{ color: ruleColor }}
          >
            +
          </span>
          <span
            className="absolute right-0 -top-1.5 font-mono text-[9px] select-none"
            style={{ color: ruleColor }}
          >
            +
          </span>
        </>
      )}
    </div>
  );
}

export default EditorialGridLines;
