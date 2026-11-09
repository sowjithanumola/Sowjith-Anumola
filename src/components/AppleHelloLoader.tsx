/**
 * @file AppleHelloLoader.tsx
 * Authentic Apple device "hello" waiting screen.
 * Replicates the iconic Apple setup experience (Mac, iPad, iPhone, macOS Monterey/Sonoma Hello screensaver):
 * - Deep pitch-black (#000000) backdrop
 * - Fluid cursive handwriting vector stroke drawing "hello"
 * - Multilingual greeting cycle ("hello", "hola", "bonjour", "ciao", "olá", "hallo", "नमस्ते", "こんにちは")
 * - Sleek Apple device setup loading bar with real-time asset & font pre-caching
 * - Apple-style spring zoom & fade exit
 * - Ensures all DOM, fonts, and assets are fully loaded for butter-smooth 60fps scrolling
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface AppleHelloLoaderProps {
  onComplete?: () => void;
  minDurationMs?: number; // Minimum aesthetic duration (default 2600ms)
}

// Multilingual greetings modeled after the Apple "Hello" screensaver
const GREETINGS = [
  { text: "hello", lang: "English", fontClass: "font-['Homemade_Apple',cursive]" },
  { text: "hola", lang: "Spanish", fontClass: "font-['Caveat',cursive]" },
  { text: "bonjour", lang: "French", fontClass: "font-['Alex_Brush',cursive]" },
  { text: "ciao", lang: "Italian", fontClass: "font-['Caveat',cursive]" },
  { text: "hallo", lang: "German", fontClass: "font-['Caveat',cursive]" },
  { text: "olá", lang: "Portuguese", fontClass: "font-['Alex_Brush',cursive]" },
  { text: "नमस्ते", lang: "Hindi", fontClass: "font-sans font-medium" },
  { text: "こんにちは", lang: "Japanese", fontClass: "font-sans font-light" },
  { text: "你好", lang: "Chinese", fontClass: "font-sans font-light" }
];

export default function AppleHelloLoader({
  onComplete,
  minDurationMs = 2800
}: AppleHelloLoaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [isHandwritingDrawn, setIsHandwritingDrawn] = useState(false);
  const [statusText, setStatusText] = useState("Initializing KeyFlow...");
  const startTimeRef = useRef<number>(Date.now());
  const animationFrameRef = useRef<number | null>(null);

  // Pre-load assets, fonts, and synchronize progress
  useEffect(() => {
    let isCancelled = false;
    let targetProgress = 0;

    // Preload critical images into browser cache
    const preloadImage = (src: string) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });

    const initPreloader = async () => {
      // 1. Initial burst
      targetProgress = 25;
      setStatusText("Priming graphics engine...");

      // 2. Preload fonts
      try {
        if (document.fonts) {
          await document.fonts.ready;
        }
      } catch {
        // Fallback gracefully
      }

      if (isCancelled) return;
      targetProgress = 55;
      setStatusText("Caching studio assets & sound...");

      // 3. Preload avatar & critical assets
      await Promise.allSettled([
        preloadImage("/sowjith-avatar.jpg"),
        preloadImage("/favicon.svg")
      ]);

      if (isCancelled) return;
      targetProgress = 85;
      setStatusText("Optimizing 60fps scrolling pipeline...");

      // 4. Ensure window/DOM fully ready
      if (document.readyState !== "complete") {
        await new Promise<void>((res) => {
          const handler = () => {
            window.removeEventListener("load", handler);
            res();
          };
          window.addEventListener("load", handler);
        });
      }

      if (isCancelled) return;
      targetProgress = 100;
      setStatusText("Ready");
    };

    initPreloader();

    // Smooth progress ticker
    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const timeRatio = Math.min(1, elapsed / minDurationMs);

      // Current progress is bounded by both real readiness and smooth animation time
      setProgress((prev) => {
        const calculated = Math.min(100, Math.max(prev, Math.round(timeRatio * targetProgress)));
        if (calculated >= 99 && timeRatio >= 1 && targetProgress >= 100) {
          return 100;
        }
        return calculated;
      });

      if (elapsed < minDurationMs || targetProgress < 100) {
        animationFrameRef.current = requestAnimationFrame(tick);
      } else {
        // Final finish settle
        setProgress(100);
        setTimeout(() => {
          if (!isCancelled) {
            handleDismiss();
          }
        }, 550);
      }
    };

    animationFrameRef.current = requestAnimationFrame(tick);

    return () => {
      isCancelled = true;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [minDurationMs]);

  // Multilingual greeting cycler after handwriting finishes
  useEffect(() => {
    if (!isHandwritingDrawn) {
      const timer = setTimeout(() => {
        setIsHandwritingDrawn(true);
      }, 1600);
      return () => clearTimeout(timer);
    }

    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 1800);

    return () => clearInterval(interval);
  }, [isHandwritingDrawn]);

  // Dismiss loader with Apple-smooth exit
  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 800);
  };

  // Keyboard shortcut (Escape or Space to skip)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        handleDismiss();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: "blur(12px)",
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 z-[99999] bg-[#000000] text-white flex flex-col items-center justify-center select-none overflow-hidden cursor-default"
          onClick={() => {
            // Dismiss on user tap after minimum half second
            if (Date.now() - startTimeRef.current > 600) {
              handleDismiss();
            }
          }}
          role="dialog"
          aria-label="Loading KeyFlow"
          aria-live="polite"
        >
          {/* Subtle Ambient Vignette & Apple Device Glow */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_50%_48%,rgba(255,255,255,0.06)_0%,transparent_70%)]"
            aria-hidden="true"
          />

          {/* Center Stage: The Iconic Apple "hello" */}
          <div className="relative flex flex-col items-center justify-center min-h-[220px] w-full px-6 max-w-2xl text-center">
            {/* 1. First Phase: Pure Apple Cursive Handwriting Stroke */}
            {!isHandwritingDrawn ? (
              <div className="relative flex items-center justify-center">
                <svg
                  viewBox="0 0 520 220"
                  className="w-[280px] sm:w-[380px] md:w-[460px] h-auto overflow-visible drop-shadow-[0_0_18px_rgba(255,255,255,0.45)]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Apple Cursive "hello" vector stroke */}
                  {/* Letter 'h' */}
                  <motion.path
                    d="M 50 148 C 60 140, 80 82, 94 42 C 99 26, 107 18, 114 24 C 119 29, 115 50, 109 78 L 92 154 C 90 162, 88 168, 88 168 C 93 150, 106 122, 124 104 C 137 92, 149 93, 151 102 C 153 113, 146 132, 142 148 C 140 156, 142 160, 148 157 C 154 154, 164 140, 170 132"
                    stroke="#ffffff"
                    strokeWidth="3.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.65, ease: [0.45, 0, 0.2, 1] }}
                  />

                  {/* Letter 'e' */}
                  <motion.path
                    d="M 170 132 C 176 124, 183 112, 193 105 C 201 100, 208 104, 207 116 C 205 130, 190 146, 178 155 C 183 158, 194 159, 203 153 C 211 147, 219 137, 227 124"
                    stroke="#ffffff"
                    strokeWidth="3.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.35, delay: 0.5, ease: [0.45, 0, 0.2, 1] }}
                  />

                  {/* First 'l' */}
                  <motion.path
                    d="M 227 124 C 235 110, 248 62, 260 34 C 265 21, 273 16, 278 21 C 283 26, 279 44, 272 72 L 255 146 C 253 154, 256 158, 263 156 C 270 153, 279 143, 287 130"
                    stroke="#ffffff"
                    strokeWidth="3.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.45, delay: 0.75, ease: [0.45, 0, 0.2, 1] }}
                  />

                  {/* Second 'l' */}
                  <motion.path
                    d="M 287 130 C 295 116, 308 62, 320 34 C 325 21, 333 16, 338 21 C 343 26, 339 44, 332 72 L 315 146 C 313 154, 316 158, 323 156 C 330 153, 340 141, 348 130"
                    stroke="#ffffff"
                    strokeWidth="3.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.45, delay: 1.05, ease: [0.45, 0, 0.2, 1] }}
                  />

                  {/* Letter 'o' and flourish */}
                  <motion.path
                    d="M 348 130 C 356 120, 366 108, 378 104 C 391 100, 399 108, 398 122 C 396 142, 378 159, 364 158 C 353 157, 350 146, 353 133 C 357 118, 370 106, 385 106 C 396 106, 403 111, 407 116 C 413 124, 423 123, 436 118"
                    stroke="#ffffff"
                    strokeWidth="3.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.45, delay: 1.35, ease: [0.45, 0, 0.2, 1] }}
                  />
                </svg>
              </div>
            ) : (
              /* 2. Second Phase: Apple Multilingual Greetings Crossfade */
              <AnimatePresence mode="wait">
                <motion.div
                  key={greetingIndex}
                  initial={{ opacity: 0, y: 8, scale: 0.98, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -8, scale: 1.02, filter: "blur(6px)" }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center justify-center min-h-[140px]"
                >
                  <span
                    className={`text-5xl sm:text-7xl md:text-8xl tracking-tight text-white ${GREETINGS[greetingIndex].fontClass} drop-shadow-[0_0_24px_rgba(255,255,255,0.4)]`}
                  >
                    {GREETINGS[greetingIndex].text}
                  </span>
                </motion.div>
              </AnimatePresence>
            )}

            {/* Apple Device Minimalist Loading Bar */}
            <div className="mt-12 sm:mt-14 flex flex-col items-center gap-3.5 w-full max-w-[210px]">
              {/* Rounded Capsule Progress Bar */}
              <div className="w-full h-[3.5px] rounded-full bg-white/15 overflow-hidden backdrop-blur-md relative">
                <motion.div
                  className="h-full bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.2 }}
                />
              </div>

              {/* Status & Percentage in Apple SF Pro style */}
              <div className="w-full flex items-center justify-between text-[11px] font-mono tracking-wider text-zinc-400">
                <span className="truncate pr-2">{statusText}</span>
                <span className="text-zinc-200 font-semibold">{progress}%</span>
              </div>
            </div>
          </div>

          {/* Minimalist Apple Footer / Skip Prompt */}
          <div className="absolute bottom-8 sm:bottom-10 inset-x-0 px-8 flex items-center justify-between text-xs text-zinc-500 font-mono">
            <span className="hidden sm:inline-block tracking-widest uppercase text-[10px] text-zinc-600">
              KeyFlow by Sowjith · Solo Creator
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDismiss();
              }}
              className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-all text-[11px] font-mono group"
            >
              <span>Skip</span>
              <span className="text-zinc-500 group-hover:text-zinc-300">⇥</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
