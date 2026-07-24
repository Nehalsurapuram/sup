"use client";

import { useRef, useState } from "react";

// Interactive 3D-ish takeaway cup.
// Tilts toward the cursor (perspective rotate) and idly floats.
export function HeroCup() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -py * 16, y: px * 20 });
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className="[perspective:1000px]"
    >
      <div
        className="transition-transform duration-200 ease-out will-change-transform"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div style={{ animation: "float 6s ease-in-out infinite" }}>
          <CupSvg />
        </div>
      </div>
    </div>
  );
}

function CupSvg() {
  return (
    <svg
      viewBox="0 0 360 540"
      className="h-auto w-[min(80vw,420px)] drop-shadow-[0_40px_60px_rgba(0,0,0,0.45)]"
      role="img"
      aria-label="Caffora takeaway coffee cup"
    >
      <defs>
        <linearGradient id="cupBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#15381f" />
          <stop offset="0.28" stopColor="#3c8548" />
          <stop offset="0.5" stopColor="#4a9a57" />
          <stop offset="0.72" stopColor="#347a41" />
          <stop offset="1" stopColor="#123219" />
        </linearGradient>
        <linearGradient id="lidDome" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1c4526" />
          <stop offset="0.5" stopColor="#3f8b4b" />
          <stop offset="1" stopColor="#173c20" />
        </linearGradient>
        <linearGradient id="lidRim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#123219" />
          <stop offset="0.5" stopColor="#357a41" />
          <stop offset="1" stopColor="#0f2c17" />
        </linearGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="180" cy="512" rx="120" ry="16" fill="#0d2413" opacity="0.55" />

      {/* Steam */}
      <g fill="none" stroke="#efe9d8" strokeWidth="6" strokeLinecap="round">
        <path
          d="M150 96 q-14 -20 0 -40 q14 -20 0 -40"
          opacity="0"
          style={{
            animation: "steam 3.2s ease-in-out infinite",
            transformOrigin: "150px 96px",
          }}
        />
        <path
          d="M180 92 q16 -22 0 -44 q-16 -22 0 -44"
          opacity="0"
          style={{
            animation: "steam 3.6s ease-in-out infinite 0.6s",
            transformOrigin: "180px 92px",
          }}
        />
        <path
          d="M210 96 q-14 -20 0 -40 q14 -20 0 -40"
          opacity="0"
          style={{
            animation: "steam 3.4s ease-in-out infinite 1.2s",
            transformOrigin: "210px 96px",
          }}
        />
      </g>

      {/* Cup body */}
      <path
        d="M70 158 L290 158 L258 456 Q255 474 237 474 L123 474 Q105 474 102 456 Z"
        fill="url(#cupBody)"
      />
      {/* Soft highlight */}
      <path
        d="M120 165 L150 165 L138 468 L112 468 Z"
        fill="#ffffff"
        opacity="0.12"
      />

      {/* Printed brand */}
      <text
        x="180"
        y="240"
        textAnchor="middle"
        fill="#efe9d8"
        fontSize="12"
        letterSpacing="1.5"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        YOUR COZY CORNER,
      </text>
      <text
        x="180"
        y="256"
        textAnchor="middle"
        fill="#efe9d8"
        fontSize="12"
        letterSpacing="1.5"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        EVERY DAY.
      </text>
      <text
        x="180"
        y="332"
        textAnchor="middle"
        fill="#efe9d8"
        fontSize="52"
        fontWeight="700"
        letterSpacing="1"
        style={{ fontFamily: "var(--font-display)" }}
      >
        CAF
      </text>
      <text
        x="180"
        y="382"
        textAnchor="middle"
        fill="#efe9d8"
        fontSize="52"
        fontWeight="700"
        letterSpacing="1"
        style={{ fontFamily: "var(--font-display)" }}
      >
        FORA
      </text>
      <text
        x="180"
        y="440"
        textAnchor="middle"
        fill="#efe9d8"
        fontSize="10"
        letterSpacing="2"
        opacity="0.8"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        WWW.CAFFORA.COM
      </text>

      {/* Lid rim */}
      <rect x="60" y="130" width="240" height="32" rx="12" fill="url(#lidRim)" />
      {/* Lid dome */}
      <path
        d="M80 132 L280 132 L256 104 Q252 96 240 96 L120 96 Q108 96 104 104 Z"
        fill="url(#lidDome)"
      />
      {/* Sip hole */}
      <ellipse cx="180" cy="112" rx="26" ry="7" fill="#0e2a16" />
    </svg>
  );
}
