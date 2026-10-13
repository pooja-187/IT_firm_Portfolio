"use client";

import React from "react";

export function FooterIllustration() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
    >
      {/* ========================================================
          SUBTLE ARCHITECTURAL AMBIENCE (MONOCHROME / NEUTRAL)
          Zero neon halos or saturated green blur.
         ======================================================== */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(255,255,255,0.015),transparent_70%)] pointer-events-none" />

      {/* ========================================================
          EDITORIAL CREATIVE TECHNOLOGY BLUEPRINT SVG
          Architectural line-art across the full 1440px footer width
         ======================================================== */}
      <svg
        viewBox="0 0 1440 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full object-cover"
      >
        <defs>
          {/* Extremely Slow Subtle Breathing Animation (Opacity Only - No Glow/Neon) */}
          <style>{`
            @keyframes blueprintBreathe {
              0%, 100% { opacity: 0.35; }
              50% { opacity: 0.65; }
            }
            @keyframes flowDash {
              to { stroke-dashoffset: -120; }
            }
            .node-breathe {
              animation: blueprintBreathe 5s ease-in-out infinite;
            }
            .flow-dash-anim {
              animation: flowDash 38s linear infinite;
            }
          `}</style>
        </defs>

        {/* ========================================================
            LAYER 1: ARCHITECTURAL BLUEPRINT GRID & CROSSHAIRS
           ======================================================== */}
        <g stroke="rgba(255, 255, 255, 0.028)" strokeWidth="0.7">
          {/* Vertical Grid Lines */}
          <line x1="80" y1="0" x2="80" y2="440" />
          <line x1="200" y1="0" x2="200" y2="440" />
          <line x1="320" y1="0" x2="320" y2="440" />
          <line x1="440" y1="0" x2="440" y2="440" />
          <line x1="560" y1="0" x2="560" y2="440" />
          <line x1="680" y1="0" x2="680" y2="440" />
          <line x1="800" y1="0" x2="800" y2="440" />
          <line x1="920" y1="0" x2="920" y2="440" />
          <line x1="1040" y1="0" x2="1040" y2="440" />
          <line x1="1160" y1="0" x2="1160" y2="440" />
          <line x1="1280" y1="0" x2="1280" y2="440" />
          <line x1="1400" y1="0" x2="1400" y2="440" />

          {/* Horizontal Grid Lines */}
          <line x1="0" y1="65" x2="1440" y2="65" />
          <line x1="0" y1="135" x2="1440" y2="135" />
          <line x1="0" y1="205" x2="1440" y2="205" />
          <line x1="0" y1="275" x2="1440" y2="275" />
          <line x1="0" y1="345" x2="1440" y2="345" />

          {/* Grid Intersect Micro Crosshairs (+) */}
          <path d="M 197 135 H 203 M 200 132 V 138" stroke="rgba(255, 255, 255, 0.05)" />
          <path d="M 437 205 H 443 M 440 202 V 208" stroke="rgba(255, 255, 255, 0.05)" />
          <path d="M 677 135 H 683 M 680 132 V 138" stroke="rgba(255, 255, 255, 0.05)" />
          <path d="M 917 275 H 923 M 920 272 V 278" stroke="rgba(255, 255, 255, 0.05)" />
          <path d="M 1157 135 H 1163 M 1160 132 V 138" stroke="rgba(255, 255, 255, 0.05)" />
          <path d="M 1277 205 H 1283 M 1280 202 V 208" stroke="rgba(255, 255, 255, 0.05)" />
        </g>

        {/* ========================================================
            LAYER 2: LEFT - UI/UX DESIGN & MOBILE WIREFRAME
            Neutral monochrome wireframe with single muted lime point
           ======================================================== */}
        <g id="ui-design-cluster">
          {/* Desktop Monitor / Browser Wireframe Frame */}
          <rect
            x="36"
            y="95"
            width="174"
            height="150"
            rx="6"
            stroke="rgba(255, 255, 255, 0.07)"
            strokeWidth="0.85"
            fill="none"
          />
          {/* Window Header Bar */}
          <line x1="36" y1="117" x2="210" y2="117" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.75" />
          {/* Window Control Dots - Soft Gray */}
          <circle cx="48" cy="106" r="1.8" fill="rgba(255, 255, 255, 0.12)" />
          <circle cx="55" cy="106" r="1.8" fill="rgba(255, 255, 255, 0.08)" />
          <circle cx="62" cy="106" r="1.8" fill="rgba(255, 255, 255, 0.08)" />

          {/* Wireframe Hero Image Placeholder with Crossed Diagonal Guides */}
          <rect
            x="48"
            y="127"
            width="64"
            height="50"
            rx="2.5"
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth="0.7"
            fill="none"
          />
          <line x1="48" y1="127" x2="112" y2="177" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.7" />
          <line x1="112" y1="127" x2="48" y2="177" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.7" />

          {/* Right Wireframe Content Lines */}
          <line x1="122" y1="131" x2="198" y2="131" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" strokeLinecap="round" />
          <line x1="122" y1="140" x2="185" y2="140" stroke="rgba(255, 255, 255, 0.045)" strokeWidth="0.9" strokeLinecap="round" />
          <line x1="122" y1="148" x2="192" y2="148" stroke="rgba(255, 255, 255, 0.045)" strokeWidth="0.9" strokeLinecap="round" />
          <line x1="122" y1="156" x2="170" y2="156" stroke="rgba(255, 255, 255, 0.045)" strokeWidth="0.9" strokeLinecap="round" />

          {/* Lower Interface Card Row */}
          <rect x="48" y="186" width="46" height="24" rx="2" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.7" fill="none" />
          <rect x="100" y="186" width="46" height="24" rx="2" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.7" fill="none" />
          <rect x="152" y="186" width="46" height="24" rx="2" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.7" fill="none" />

          {/* Desktop Monitor Stand Base */}
          <path d="M 115 245 L 115 264 M 129 245 L 129 264" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.7" />
          <path d="M 96 264 H 148" stroke="rgba(255, 255, 255, 0.065)" strokeWidth="1" strokeLinecap="round" />

          {/* Mobile Product Phone Wireframe (Foreground Accent) */}
          <g id="mobile-wireframe">
            {/* Phone Outer Chassis */}
            <rect
              x="122"
              y="205"
              width="68"
              height="126"
              rx="10"
              stroke="rgba(255, 255, 255, 0.09)"
              strokeWidth="0.9"
              fill="rgba(8, 11, 16, 0.7)"
            />
            {/* Speaker Notch */}
            <rect x="146" y="212" width="20" height="2" rx="1" fill="rgba(255, 255, 255, 0.10)" />

            {/* Circular Donut/Pie Chart inside Phone (Monochrome + 1 Muted Lime Slice) */}
            <circle cx="156" cy="242" r="13" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1.2" fill="none" />
            <path
              d="M 156 229 A 13 13 0 0 1 169 242 L 156 242 Z"
              fill="#B7E36A"
              fillOpacity="0.32"
              stroke="rgba(183, 227, 106, 0.45)"
              strokeWidth="0.75"
            />
            {/* Tiny Chart Center Hub */}
            <circle cx="156" cy="242" r="1.5" fill="rgba(255, 255, 255, 0.25)" />

            {/* UI Content Bars inside Phone */}
            <line x1="134" y1="268" x2="178" y2="268" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" strokeLinecap="round" />
            <line x1="134" y1="277" x2="168" y2="277" stroke="rgba(255, 255, 255, 0.045)" strokeWidth="0.8" strokeLinecap="round" />
            <line x1="134" y1="285" x2="174" y2="285" stroke="rgba(255, 255, 255, 0.045)" strokeWidth="0.8" strokeLinecap="round" />
            <line x1="134" y1="293" x2="160" y2="293" stroke="rgba(255, 255, 255, 0.045)" strokeWidth="0.8" strokeLinecap="round" />

            {/* Home Indicator */}
            <rect x="146" y="322" width="20" height="1.5" rx="0.75" fill="rgba(255, 255, 255, 0.12)" />
          </g>

          {/* Designer Cursor Arrow */}
          <g transform="translate(208, 224)">
            <path
              d="M 0 0 L 14 11 L 8.5 12 L 13 21 L 10.5 22 L 6 13 L 2 17 Z"
              stroke="rgba(255, 255, 255, 0.16)"
              strokeWidth="0.85"
              fill="rgba(255, 255, 255, 0.02)"
              strokeLinejoin="round"
            />
          </g>

          {/* Guide Projection Line */}
          <line x1="222" y1="246" x2="270" y2="280" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="0.75" strokeDasharray="2 3" />
        </g>

        {/* ========================================================
            LAYER 3: CENTER-LEFT - CODE & DEVELOPMENT WINDOW
            Monochrome wireframe - no green text/symbols
           ======================================================== */}
        <g id="code-window-cluster">
          {/* Technical Code Editor Window Frame */}
          <rect
            x="482"
            y="152"
            width="142"
            height="145"
            rx="6"
            stroke="rgba(255, 255, 255, 0.075)"
            strokeWidth="0.85"
            fill="none"
          />
          {/* Header Bar */}
          <line x1="482" y1="172" x2="624" y2="172" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.7" />
          {/* Window Controls */}
          <circle cx="493" cy="162" r="1.6" fill="rgba(255, 255, 255, 0.10)" />
          <circle cx="500" cy="162" r="1.6" fill="rgba(255, 255, 255, 0.08)" />
          <circle cx="507" cy="162" r="1.6" fill="rgba(255, 255, 255, 0.08)" />

          {/* Clean Muted Gray Code Symbol: </> (No green neon) */}
          <path
            d="M 522 204 L 512 214 L 522 224"
            stroke="rgba(255, 255, 255, 0.18)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="528"
            y1="227"
            x2="538"
            y2="201"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
          <path
            d="M 544 204 L 554 214 L 544 224"
            stroke="rgba(255, 255, 255, 0.18)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Syntax Code Hierarchy Lines */}
          <line x1="562" y1="208" x2="608" y2="208" stroke="rgba(255, 255, 255, 0.09)" strokeWidth="1" strokeLinecap="round" />
          <line x1="562" y1="216" x2="598" y2="216" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.85" strokeLinecap="round" />
          <line x1="500" y1="240" x2="570" y2="240" stroke="rgba(255, 255, 255, 0.07)" strokeWidth="0.85" strokeLinecap="round" />
          <line x1="514" y1="248" x2="588" y2="248" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.8" strokeLinecap="round" />
          <line x1="528" y1="256" x2="612" y2="256" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.8" strokeLinecap="round" />
          <line x1="500" y1="264" x2="540" y2="264" stroke="rgba(255, 255, 255, 0.07)" strokeWidth="0.8" strokeLinecap="round" />

          {/* Connected Data Stem going Up to Architectural Node */}
          <line x1="550" y1="152" x2="550" y2="108" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="0.75" strokeDasharray="3 3" />
          <circle cx="550" cy="108" r="6" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="0.75" fill="none" />
          {/* Muted Lime Micro Accent Node #1 */}
          <circle cx="550" cy="108" r="1.8" fill="#B7E36A" fillOpacity="0.45" />

          {/* Small Branching System Chip Nodes */}
          <rect x="438" y="278" width="18" height="18" rx="2.5" stroke="rgba(255, 255, 255, 0.07)" strokeWidth="0.75" fill="none" />
          <circle cx="447" cy="287" r="1.4" fill="rgba(255, 255, 255, 0.15)" />
          <path d="M 456 287 H 482" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="0.75" />
        </g>

        {/* ========================================================
            LAYER 4: CENTER - DATABASE & SYSTEM ARCHITECTURE
           ======================================================== */}
        <g id="database-cluster">
          {/* Cylinder Layer 1 (Top) */}
          <ellipse
            cx="642"
            y="238"
            rx="27"
            ry="8.5"
            stroke="rgba(255, 255, 255, 0.09)"
            strokeWidth="0.85"
            fill="none"
          />
          {/* Cylinder Layer 2 (Middle) */}
          <path
            d="M 615 238 V 254 C 615 258.7 627 262.5 642 262.5 C 657 262.5 669 258.7 669 254 V 238"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="0.85"
            fill="none"
          />
          {/* Cylinder Layer 3 (Bottom) */}
          <path
            d="M 615 254 V 270 C 615 274.7 627 278.5 642 278.5 C 657 278.5 669 274.7 669 270 V 254"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="0.85"
            fill="none"
          />
          <path
            d="M 615 270 V 286 C 615 290.7 627 294.5 642 294.5 C 657 294.5 669 290.7 669 286 V 270"
            stroke="rgba(255, 255, 255, 0.07)"
            strokeWidth="0.85"
            fill="none"
          />

          {/* Vertical Bus Line */}
          <line x1="642" y1="246" x2="642" y2="294" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.7" strokeDasharray="2 3" />

          {/* Connected Data Bus Tracks */}
          <path
            d="M 669 254 H 702 V 228 H 720"
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth="0.75"
            fill="none"
          />
          <path
            d="M 669 286 H 712 V 305 H 734"
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth="0.75"
            fill="none"
          />

          {/* Muted Lime Micro Accent Node #2 on DB Bus */}
          <circle cx="720" cy="228" r="1.8" fill="#B7E36A" fillOpacity="0.45" />
          <circle cx="734" cy="305" r="1.5" fill="rgba(255, 255, 255, 0.14)" />
          <rect x="710" y="246" width="14" height="24" rx="2" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.7" fill="none" />
        </g>

        {/* ========================================================
            LAYER 5: CENTER-RIGHT - ANALYTICS & PERFORMANCE MARKETING
            Monochrome chart + single muted lime endpoint
           ======================================================== */}
        <g id="analytics-cluster">
          {/* Analytics Dashboard Card Window */}
          <rect
            x="866"
            y="174"
            width="158"
            height="115"
            rx="6"
            stroke="rgba(255, 255, 255, 0.07)"
            strokeWidth="0.85"
            fill="none"
          />
          {/* Card Header Line */}
          <line x1="866" y1="192" x2="1024" y2="192" stroke="rgba(255, 255, 255, 0.045)" strokeWidth="0.7" />
          <circle cx="876" cy="183" r="1.4" fill="rgba(255, 255, 255, 0.10)" />
          <circle cx="882" cy="183" r="1.4" fill="rgba(255, 255, 255, 0.07)" />

          {/* Stepping Vertical Bar Chart Columns (Muted Monochrome) */}
          <rect x="884" y="248" width="8" height="24" rx="1" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="0.7" fill="none" />
          <rect x="898" y="238" width="8" height="34" rx="1" stroke="rgba(255, 255, 255, 0.07)" strokeWidth="0.7" fill="none" />
          <rect x="912" y="244" width="8" height="28" rx="1" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="0.7" fill="none" />
          <rect x="926" y="224" width="8" height="48" rx="1" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="0.7" fill="none" />
          <rect x="940" y="210" width="8" height="62" rx="1" stroke="rgba(255, 255, 255, 0.09)" strokeWidth="0.7" fill="none" />
          <rect x="954" y="222" width="8" height="50" rx="1" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="0.7" fill="none" />
          <rect x="968" y="200" width="8" height="72" rx="1" stroke="rgba(255, 255, 255, 0.09)" strokeWidth="0.7" fill="none" />

          {/* Thin Technical Muted Gray Growth Curve (No Green Neon Stroke) */}
          <path
            d="M 878 262 C 905 258 928 245 950 220 C 972 195 994 186 1008 178"
            stroke="rgba(255, 255, 255, 0.16)"
            strokeWidth="1.1"
            strokeLinecap="round"
            fill="none"
          />

          {/* Gray Data Points on Curve */}
          <circle cx="896" cy="257" r="1.8" fill="rgba(255, 255, 255, 0.18)" />
          <circle cx="948" cy="222" r="1.8" fill="rgba(255, 255, 255, 0.18)" />

          {/* Technical Peak Arrow Badge (Soft Gray Outline + Single Muted Lime Node) */}
          <g id="growth-arrow-badge" transform="translate(1008, 178)">
            <circle cx="0" cy="0" r="8.5" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="0.9" fill="rgba(8, 11, 16, 0.6)" />
            {/* Arrow Up in Crisp Soft Gray */}
            <path
              d="M 0 4 V -3.5 M -2.5 -1 L 0 -3.5 L 2.5 -1"
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Muted Lime Micro Accent Node #3 */}
            <circle cx="0" cy="-5" r="1.2" fill="#B7E36A" fillOpacity="0.45" />
          </g>
        </g>

        {/* ========================================================
            LAYER 6: RIGHT - CYBERSECURITY & CLOUD INFRASTRUCTURE
            Subtle gray line-art, no green fill or luminous border
           ======================================================== */}
        <g id="security-infrastructure-cluster">
          {/* Architectural Security Shield (Subtle Gray Outline, No Green Glow/Fill) */}
          <path
            d="M 1256 122 C 1286 116 1312 98 1312 98 C 1312 98 1338 116 1368 122 C 1368 184 1338 234 1312 254 C 1286 234 1256 184 1256 122 Z"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="0.9"
            fill="none"
          />
          {/* Inner Inset Shield Contour */}
          <path
            d="M 1264 128 C 1290 123 1312 108 1312 108 C 1312 108 1334 123 1360 128 C 1360 180 1334 224 1312 242 C 1290 224 1264 180 1264 128 Z"
            stroke="rgba(255, 255, 255, 0.035)"
            strokeWidth="0.75"
            fill="none"
          />

          {/* Secure Padlock Icon inside Shield */}
          <g id="padlock-icon" transform="translate(1312, 168)">
            {/* Shackle */}
            <path
              d="M -8 0 V -9 C -8 -13.5 -4 -17 0 -17 C 4 -17 8 -13.5 8 -9 V 0"
              stroke="rgba(255, 255, 255, 0.16)"
              strokeWidth="1"
              strokeLinecap="round"
              fill="none"
            />
            {/* Lock Body */}
            <rect
              x="-13"
              y="0"
              width="26"
              height="22"
              rx="3"
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="0.9"
              fill="none"
            />
            {/* Keyhole: Muted Lime Micro Accent #4 */}
            <circle cx="0" cy="8" r="1.6" fill="#B7E36A" fillOpacity="0.38" />
            <path d="M -0.6 10 L -1 15 H 1 L 0.6 10 Z" fill="#B7E36A" fillOpacity="0.38" />
          </g>

          {/* Server Tower Stack */}
          <g id="server-stack" transform="translate(1368, 222)">
            {/* Server Chassis */}
            <rect x="0" y="0" width="46" height="52" rx="3" stroke="rgba(255, 255, 255, 0.065)" strokeWidth="0.75" fill="none" />
            {/* Blade 1 */}
            <line x1="0" y1="17" x2="46" y2="17" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.7" />
            <circle cx="8" cy="8.5" r="1.2" fill="rgba(255, 255, 255, 0.10)" />
            <circle cx="14" cy="8.5" r="1.2" fill="rgba(255, 255, 255, 0.07)" />
            <circle cx="20" cy="8.5" r="1.2" fill="rgba(255, 255, 255, 0.07)" />
            {/* Blade 2 */}
            <line x1="0" y1="34" x2="46" y2="34" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.7" />
            <circle cx="8" cy="25.5" r="1.2" fill="#B7E36A" fillOpacity="0.35" />
            <circle cx="14" cy="25.5" r="1.2" fill="rgba(255, 255, 255, 0.07)" />
            <circle cx="20" cy="25.5" r="1.2" fill="rgba(255, 255, 255, 0.07)" />
            {/* Blade 3 */}
            <circle cx="8" cy="42.5" r="1.2" fill="rgba(255, 255, 255, 0.10)" />
            <circle cx="14" cy="42.5" r="1.2" fill="rgba(255, 255, 255, 0.07)" />
            <circle cx="20" cy="42.5" r="1.2" fill="rgba(255, 255, 255, 0.07)" />
          </g>

          {/* Verification Target Node Crosshair */}
          <g transform="translate(1430, 238)">
            <circle cx="0" cy="0" r="7" stroke="rgba(255, 255, 255, 0.07)" strokeWidth="0.75" fill="none" />
            <circle cx="0" cy="0" r="12" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.6" strokeDasharray="3 3" fill="none" />
            <circle cx="0" cy="0" r="1.6" fill="rgba(255, 255, 255, 0.22)" />
          </g>
        </g>

        {/* ========================================================
            LAYER 7: FLOWING TECHNICAL WAVES & BLUEPRINT NODES
            95% monochrome etched lines - zero neon green dotted lines
           ======================================================== */}
        <g id="connecting-flow-waves">
          {/* Primary Main Technical Wave (Continuous Soft Gray Line) */}
          <path
            d="M -20 295 C 120 325 210 265 310 278 C 420 292 510 338 630 305 C 750 272 850 315 970 282 C 1090 248 1190 296 1300 272 C 1370 256 1420 274 1460 262"
            stroke="rgba(255, 255, 255, 0.09)"
            strokeWidth="0.9"
            fill="none"
          />

          {/* Secondary Soft Gray Dotted Data Wave (Etched Blueprint Look) */}
          <path
            d="M -20 270 C 100 252 230 298 340 262 C 460 224 590 282 710 252 C 830 222 960 278 1080 246 C 1200 216 1310 254 1460 236"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="0.8"
            strokeDasharray="3 4"
            fill="none"
            className="flow-dash-anim"
          />

          {/* Tertiary Faint Ambient Wave */}
          <path
            d="M -20 325 C 180 348 380 312 580 332 C 780 352 980 312 1180 334 C 1310 346 1400 326 1460 334"
            stroke="rgba(255, 255, 255, 0.025)"
            strokeWidth="0.75"
            fill="none"
          />

          {/* Branching Technical Connector Lines */}
          <path d="M 218 290 L 260 290 L 310 278" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.7" strokeDasharray="2 3" />
          <path d="M 630 305 L 682 305 L 710 295" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.7" />
          <path d="M 970 282 L 1020 282 L 1060 268" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.7" strokeDasharray="2 3" />
          <path d="M 1256 242 L 1285 260 L 1310 272" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.7" />

          {/* Connected Blueprint Nodes: Muted Gray Rings with 3 Rare Lime Micro-Points */}
          {/* Node 1: Left UI Alignment */}
          <circle cx="96" cy="264" r="2.2" fill="rgba(255, 255, 255, 0.16)" />

          {/* Node 2: Mobile Interface Transition */}
          <circle cx="270" cy="280" r="5" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="0.7" fill="none" />
          <circle cx="270" cy="280" r="1.8" fill="#B7E36A" fillOpacity="0.40" className="node-breathe" />

          {/* Node 3: Center Code Ingress */}
          <circle cx="438" cy="287" r="1.8" fill="rgba(255, 255, 255, 0.14)" />

          {/* Node 4: Database Bus Node */}
          <circle cx="702" cy="228" r="5" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="0.7" fill="none" />
          <circle cx="702" cy="228" r="1.8" fill="#B7E36A" fillOpacity="0.40" />

          {/* Node 5: Pre-Analytics Ingress */}
          <circle cx="848" cy="298" r="1.8" fill="rgba(255, 255, 255, 0.14)" />

          {/* Node 6: Post-Analytics Egress */}
          <circle cx="1060" cy="268" r="2" fill="rgba(255, 255, 255, 0.16)" />

          {/* Node 7: Security Ingress Point */}
          <circle cx="1215" cy="255" r="5" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="0.7" fill="none" />
          <circle cx="1215" cy="255" r="1.8" fill="#B7E36A" fillOpacity="0.38" className="node-breathe" />

          {/* Node 8: Server Bus Terminal */}
          <circle cx="1335" cy="282" r="1.8" fill="rgba(255, 255, 255, 0.14)" />
        </g>
      </svg>
    </div>
  );
}

export default FooterIllustration;
