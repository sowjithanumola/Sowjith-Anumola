import React, { useState } from "react";
import { motion } from "motion/react";
import { useTheme } from "../context/ThemeContext";

interface LampThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export default function LampThemeToggle({
  className = "",
  showLabel = false
}: LampThemeToggleProps) {
  const { theme, toggleTheme, isDark } = useTheme();
  const [isPulling, setIsPulling] = useState(false);

  // Synthesized mechanical switch click sound (safe, zero external dependencies)
  const playClickSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const now = ctx.currentTime;
      // High pitch snap followed by quick metallic decay
      osc.type = "sine";
      osc.frequency.setValueAtTime(isDark ? 800 : 650, now);
      osc.frequency.exponentialRampToValueAtTime(isDark ? 220 : 180, now + 0.04);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Audio not supported or blocked by browser policy
    }
  };

  const handleToggle = () => {
    setIsPulling(true);
    playClickSound();
    toggleTheme();
    setTimeout(() => setIsPulling(false), 400);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={!isDark}
      aria-label={isDark ? "Turn on the lamp (Switch to light mode)" : "Turn off the lamp (Switch to dark mode)"}
      title={isDark ? "Turn lights ON (Light Mode)" : "Turn lights OFF (Dark Mode)"}
      onClick={handleToggle}
      className={`group relative flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border transition-all duration-300 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
        isDark
          ? "bg-[#110726]/80 hover:bg-[#1b0d3d] border-purple-500/30 hover:border-amber-400/50 text-zinc-300 shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:shadow-[0_0_20px_rgba(251,191,36,0.25)]"
          : "bg-amber-50 hover:bg-amber-100/80 border-amber-300 text-amber-950 shadow-[0_2px_12px_rgba(245,158,11,0.2)] hover:shadow-[0_4px_16px_rgba(245,158,11,0.3)]"
      } ${className}`}
    >
      {/* Interactive Lamp Illustration Container */}
      <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
        {/* Luminous Light Cone when Lamp is ON (Light Mode) */}
        {!isDark && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute -bottom-2.5 inset-x-0 mx-auto w-10 h-7 bg-gradient-to-b from-amber-400/40 via-amber-300/20 to-transparent blur-[3px] rounded-b-full pointer-events-none"
            aria-hidden="true"
          />
        )}

        {/* Ambient Halo behind the lamp */}
        <div
          className={`absolute inset-0 rounded-full blur-md transition-opacity duration-300 pointer-events-none ${
            !isDark ? "bg-amber-400/30 opacity-100" : "bg-purple-500/20 opacity-0 group-hover:opacity-100"
          }`}
          aria-hidden="true"
        />

        {/* The Lamp SVG Graphic */}
        <svg
          viewBox="0 0 36 36"
          className="w-full h-full overflow-visible transition-transform duration-200 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Lampshade gradient ON */}
            <linearGradient id="shadeOnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#fde68a" />
            </linearGradient>

            {/* Lampshade gradient OFF */}
            <linearGradient id="shadeOffGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4c1d95" />
              <stop offset="60%" stopColor="#2e1065" />
              <stop offset="100%" stopColor="#1e1b4b" />
            </linearGradient>

            {/* Light beam gradient */}
            <linearGradient id="lightBeam" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#fde047" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Lamp Ceiling Mount & Top Cap */}
          <path
            d="M 18 2 L 18 7"
            stroke={!isDark ? "#d97706" : "#a855f7"}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <ellipse
            cx="18"
            cy="7"
            rx="3"
            ry="1.2"
            fill={!isDark ? "#b45309" : "#7e22ce"}
          />

          {/* Lampshade Hood */}
          <path
            d="M 14 8 L 22 8 L 26 19 C 26 21, 10 21, 10 19 Z"
            fill={!isDark ? "url(#shadeOnGrad)" : "url(#shadeOffGrad)"}
            stroke={!isDark ? "#b45309" : "#a855f7"}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />

          {/* Lampshade Rim */}
          <ellipse
            cx="18"
            cy="19"
            rx="8"
            ry="2.4"
            fill={!isDark ? "#fef3c7" : "#1e1b4b"}
            stroke={!isDark ? "#f59e0b" : "#9333ea"}
            strokeWidth="1"
          />

          {/* The Glowing Bulb */}
          <g>
            {!isDark ? (
              // Light ON: Radiant Bulb
              <>
                <ellipse cx="18" cy="19.5" rx="3.5" ry="3" fill="#ffffff" />
                <ellipse cx="18" cy="19.5" rx="4.5" ry="3.5" fill="#fde047" fillOpacity="0.75" />
                {/* Downward light beam cone */}
                <polygon
                  points="12,21 24,21 28,32 8,32"
                  fill="url(#lightBeam)"
                  opacity="0.45"
                />
                {/* Tiny warm spark rays */}
                <circle cx="18" cy="27" r="1" fill="#f59e0b" />
                <circle cx="12" cy="25" r="0.8" fill="#fbbf24" />
                <circle cx="24" cy="25" r="0.8" fill="#fbbf24" />
              </>
            ) : (
              // Light OFF: Dormant Bulb
              <>
                <ellipse cx="18" cy="19.2" rx="3" ry="2" fill="#0f0728" />
                {/* Subtle amber filament dot */}
                <circle cx="18" cy="19" r="1" fill="#f59e0b" fillOpacity="0.4" />
              </>
            )}
          </g>

          {/* Hanging Pull-Cord String with Bead - animates when clicked */}
          <motion.g
            animate={
              isPulling
                ? { y: [0, 5, -1, 0] }
                : { y: 0 }
            }
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {/* The thin pull string */}
            <line
              x1="22.5"
              y1="19.5"
              x2="22.5"
              y2={isPulling ? "29" : "26"}
              stroke={!isDark ? "#b45309" : "#cbd5e1"}
              strokeWidth="1.1"
              strokeDasharray="1.5 1"
            />
            {/* The pull bead handle at bottom */}
            <circle
              cx="22.5"
              cy={isPulling ? "29.5" : "26.5"}
              r="1.8"
              fill={!isDark ? "#d97706" : "#fbbf24"}
              stroke={!isDark ? "#78350f" : "#451a03"}
              strokeWidth="0.8"
              className={!isDark ? "shadow-sm" : ""}
            />
          </motion.g>
        </svg>
      </div>

      {/* Optional Mode Tag / Text */}
      <div className="flex flex-col text-left leading-none">
        <span className="text-[10px] font-mono uppercase tracking-wider font-bold">
          {!isDark ? (
            <span className="text-amber-800 flex items-center gap-1">
              <span>Day</span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-amber-200/80 text-amber-900 font-semibold">ON</span>
            </span>
          ) : (
            <span className="text-zinc-300 flex items-center gap-1">
              <span>Night</span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-purple-900/60 text-purple-300 font-semibold">OFF</span>
            </span>
          )}
        </span>
        {showLabel && (
          <span className="text-[9px] font-mono text-zinc-400 mt-0.5">
            {!isDark ? "Lights ON" : "Pull lamp"}
          </span>
        )}
      </div>
    </button>
  );
}
