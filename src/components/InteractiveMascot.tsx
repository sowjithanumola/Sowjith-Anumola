import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useAnimation, useMotionValue, animate } from "framer-motion";
import { Sparkles, X, RotateCcw } from "lucide-react";

// Types of emotional expressions for the mascot
export type MascotExpression = "happy" | "wink" | "surprised" | "stars" | "dizzy" | "cool" | "curious";

interface FloatingEmoji {
  id: string;
  emoji: string;
  x: number;
  y: number;
}

export default function InteractiveMascot() {
  const [bounds, setBounds] = useState<{ top: number; left: number; right: number; bottom: number }>({
    top: -500,
    left: -800,
    right: 0,
    bottom: 0
  });
  const [isDragging, setIsDragging] = useState(false);
  const [speech, setSpeech] = useState<string | null>("Hey! Welcome to my corner of the internet. 👋");
  const [expression, setExpression] = useState<MascotExpression>("happy");
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentSection, setCurrentSection] = useState<string>("hero");
  const currentSectionRef = useRef<string>("hero");
  const sectionChangeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [dragAngle, setDragAngle] = useState(0);

  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const innerControls = useAnimation();
  const speechTimerRef = useRef<NodeJS.Timeout | null>(null);
  const blinkTimerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Dynamic viewport boundaries
  useEffect(() => {
    const updateBounds = () => {
      if (typeof window !== "undefined") {
        setBounds({
          top: -window.innerHeight + 140,
          left: -window.innerWidth + 140,
          right: 0,
          bottom: 0
        });
      }
    };
    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, []);

  // Helper to show speech bubble with auto-dismiss
  const showSpeech = useCallback((text: string, durationMs: number = 4200) => {
    if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
    setSpeech(text);
    if (durationMs > 0) {
      speechTimerRef.current = setTimeout(() => {
        setSpeech(null);
      }, durationMs);
    }
  }, []);

  // Spawn playful emoji reactions near the mascot
  const spawnEmojiBurst = useCallback((count = 3, specificEmoji?: string) => {
    const emojis = ["✨", "⭐", "💜", "⚡", "🚀", "🔥", "👀", "🤖", "💡", "💖"];
    const newEmojis: FloatingEmoji[] = [];
    for (let i = 0; i < count; i++) {
      const chosen = specificEmoji || emojis[Math.floor(Math.random() * emojis.length)];
      newEmojis.push({
        id: `${Date.now()}-${Math.random()}`,
        emoji: chosen,
        x: (Math.random() - 0.5) * 60,
        y: -10 - Math.random() * 30
      });
    }
    setFloatingEmojis((prev) => [...prev.slice(-12), ...newEmojis]);
  }, []);

  // Periodic subtle eye blinking & expression variation when idle
  useEffect(() => {
    const blinkCycle = () => {
      if (!isDragging) {
        blinkTimerRef.current = setTimeout(() => {
          // Temporarily switch expression or blink
          setExpression((prev) => {
            if (prev === "dizzy") return "happy";
            const variants: MascotExpression[] = ["happy", "happy", "happy", "wink", "stars", "curious"];
            return variants[Math.floor(Math.random() * variants.length)];
          });
          blinkCycle();
        }, 3500 + Math.random() * 3000);
      }
    };

    blinkCycle();
    return () => {
      if (blinkTimerRef.current) clearTimeout(blinkTimerRef.current);
    };
  }, [isDragging]);

  // Section observer: debounce scroll changes and select ONE active section.
  // This prevents overlapping sections from replacing each other's speech rapidly.
  useEffect(() => {
    const sectionMessages: Record<string, { quote: string; expression: MascotExpression; emoji: string }> = {
      hero: {
        quote: "Hey! Welcome to my corner of the internet. 👋",
        expression: "happy",
        emoji: "🚀"
      },
      projects: {
        quote: "Psst... check out these cool projects! 27+ shipped! 🛠️",
        expression: "stars",
        emoji: "✨"
      },
      skills: {
        quote: "These are my superpowers! Full-stack & AI wizardry. ⚡",
        expression: "cool",
        emoji: "⚡"
      },
      about: {
        quote: "A little about the human behind this website! Born March 12, 2013 🎂",
        expression: "happy",
        emoji: "⭐"
      },
      contact: {
        quote: "Thinking about saying hello? Let's connect! 📬",
        expression: "wink",
        emoji: "💜"
      }
    };

    const sectionIds = ["hero", "projects", "skills", "about", "contact"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const chooseActiveSection = () => {
      sectionChangeTimerRef.current = null;

      // Prefer the section crossing a stable focus line rather than reacting to
      // every intersecting entry in the same observer callback.
      const focusY = window.innerHeight * 0.42;
      const candidates = sections
        .map((el) => {
          const rect = el.getBoundingClientRect();
          const visibleHeight = Math.max(
            0,
            Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
          );
          const containsFocus = rect.top <= focusY && rect.bottom >= focusY;
          const centerDistance = Math.abs((rect.top + rect.bottom) / 2 - focusY);
          return { id: el.id, visibleHeight, containsFocus, centerDistance };
        })
        .filter((item) => item.visibleHeight > 0);

      if (candidates.length === 0) return;

      candidates.sort((a, b) => {
        if (a.containsFocus !== b.containsFocus) return a.containsFocus ? -1 : 1;
        if (a.containsFocus && b.containsFocus) return a.centerDistance - b.centerDistance;
        return b.visibleHeight - a.visibleHeight || a.centerDistance - b.centerDistance;
      });

      const id = candidates[0].id;
      if (!sectionMessages[id] || id === currentSectionRef.current) return;

      currentSectionRef.current = id;
      setCurrentSection(id);

      const config = sectionMessages[id];
      setExpression(config.expression);
      showSpeech(config.quote, 5000);
      spawnEmojiBurst(2, config.emoji);
    };

    const scheduleSectionCheck = () => {
      if (sectionChangeTimerRef.current) clearTimeout(sectionChangeTimerRef.current);
      // Wait for scroll/observer activity to settle before choosing a section.
      sectionChangeTimerRef.current = setTimeout(chooseActiveSection, 220);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          scheduleSectionCheck();
        }
      },
      {
        threshold: [0.15, 0.35, 0.6],
        rootMargin: "-10% 0px -20% 0px"
      }
    );

    sections.forEach((section) => observer.observe(section));
    window.addEventListener("scroll", scheduleSectionCheck, { passive: true });
    window.addEventListener("resize", scheduleSectionCheck);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleSectionCheck);
      window.removeEventListener("resize", scheduleSectionCheck);
      if (sectionChangeTimerRef.current) {
        clearTimeout(sectionChangeTimerRef.current);
        sectionChangeTimerRef.current = null;
      }
    };
  }, [showSpeech, spawnEmojiBurst]);

  // Click interaction: change expression, witty quip, and sparkle burst
  const handleClick = () => {
    if (isDragging) return;

    const randomExpressions: MascotExpression[] = ["happy", "wink", "surprised", "stars", "cool", "curious"];
    const nextExpr = randomExpressions[Math.floor(Math.random() * randomExpressions.length)];
    setExpression(nextExpr);

    const quips = [
      "Beep boop! Solo coder power activated! ⚡",
      "I run on pure caffeine, curiosity & clean TypeScript! ☕",
      "Sowjith built this whole universe 100% solo! 🚀",
      "Psst... Did you try dragging me across the screen? 🛸",
      "Born March 12, 2013 — building tomorrow's tech today! 🎂",
      "Check out the Category Distribution Chart above! 📊",
      "Did you know? There are 27 live shipped apps right here! ✨",
      "*happy robot purrs and glowing antenna dances* 🤖",
      "No corporate fluff, just pure creative code! 💻",
      "You found my secret tickle button! ⭐"
    ];

    const randomQuip = quips[Math.floor(Math.random() * quips.length)];
    showSpeech(randomQuip, 4000);
    spawnEmojiBurst(4);

    // Bounce animation
    innerControls.start({
      scale: [1, 1.2, 0.9, 1.1, 1],
      rotate: [0, -8, 8, -4, 0],
      transition: { duration: 0.45, ease: "easeOut" }
    });
  };

  // Drag interaction handlers
  const handleDragStart = (e: MouseEvent | TouchEvent | PointerEvent) => {
    setIsDragging(true);
    setExpression("dizzy");
    spawnEmojiBurst(2, "💨");

    const dragQuotes = [
      "Hey! Don't drag me out! 🚀",
      "Where are we flying to?! 🛸",
      "Wheeeeee! Hold onto your cables!",
      "Whoa, turbulence! Easy on the mouse!",
      "Look at me fly across the viewport! ✨",
      "Taking me on a sightseeing tour?! 🗺️"
    ];
    showSpeech(dragQuotes[Math.floor(Math.random() * dragQuotes.length)], 3000);
  };

  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: { delta: { x: number; y: number } }) => {
    // Calculate tilt angle based on drag velocity
    const angle = Math.max(-25, Math.min(25, info.delta.x * 2));
    setDragAngle(angle);

    // Check if dragging near edge of viewport
    if (typeof window !== "undefined") {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const isNearEdge =
          rect.left < 40 ||
          rect.right > window.innerWidth - 40 ||
          rect.top < 40 ||
          rect.bottom > window.innerHeight - 40;

        if (isNearEdge && Math.random() < 0.08) {
          showSpeech("Whoa, careful with the edge! Don't drop me! ⚠️", 2000);
          setExpression("surprised");
        }
      }
    }
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent) => {
    setIsDragging(false);
    setDragAngle(0);

    // Landing reaction
    const landingQuotes = [
      "Okay, that was a trip! 🤖",
      "Phew, solid landing! 🎯",
      "I like this vantage point!",
      "Reporting live from new coordinates! 📍",
      "Smooth flying, pilot! ⭐"
    ];
    showSpeech(landingQuotes[Math.floor(Math.random() * landingQuotes.length)], 3500);
    setExpression("happy");
    spawnEmojiBurst(3, "✨");

    // Settling bounce animation on character only, without resetting dragged coordinates
    innerControls.start({
      scale: [1.14, 0.92, 1.05, 1],
      transition: { duration: 0.38, ease: "easeOut" }
    });
  };

  // Reset to default bottom-right position
  const resetPosition = (e: React.MouseEvent) => {
    e.stopPropagation();
    animate(dragX, 0, { type: "spring", stiffness: 280, damping: 22 });
    animate(dragY, 0, { type: "spring", stiffness: 280, damping: 22 });
    innerControls.start({
      scale: [1, 1.25, 1],
      transition: { duration: 0.4 }
    });
    showSpeech("Reset to my favorite home spot! 🏠", 3000);
    setExpression("happy");
    spawnEmojiBurst(3);
  };

  return (
    <>
      {/* Floating Mascot Container - Fixed in Viewport */}
      <div
        className="fixed bottom-6 right-6 z-50 pointer-events-none select-none"
        style={{ touchAction: "none" }}
      >
        <motion.div
          ref={containerRef}
          drag
          dragConstraints={bounds}
          dragElastic={0}
          dragMomentum={false}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          style={{ x: dragX, y: dragY, rotate: dragAngle }}
          className="relative pointer-events-auto cursor-grab active:cursor-grabbing flex flex-col items-center"
        >
          {/* Floating Emoji Particles Layer */}
          <div className="absolute inset-0 pointer-events-none overflow-visible">
            <AnimatePresence>
              {floatingEmojis.map((item) => (
                <motion.span
                  key={item.id}
                  initial={{ opacity: 1, scale: 0.6, x: 0, y: 0 }}
                  animate={{
                    opacity: 0,
                    scale: 1.4,
                    x: item.x,
                    y: item.y - 45
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="absolute left-1/2 top-0 text-base sm:text-lg pointer-events-none drop-shadow-md"
                  onAnimationComplete={() => {
                    setFloatingEmojis((prev) => prev.filter((e) => e.id !== item.id));
                  }}
                >
                  {item.emoji}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>

          {/* Speech Bubble */}
          <AnimatePresence>
            {speech && !isMinimized && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.85 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute bottom-full mb-3.5 right-0 max-w-[230px] sm:max-w-[260px] w-max bg-[#0e0720]/95 backdrop-blur-xl border border-purple-500/40 text-white shadow-[0_8px_30px_rgba(168,85,247,0.35)] rounded-2xl p-3 text-xs font-mono leading-relaxed pointer-events-auto group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-lime-400 text-[10px] uppercase font-bold tracking-wider mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-ping" />
                    <span>SoloBot · Mascot</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSpeech(null);
                    }}
                    className="text-zinc-400 hover:text-white p-0.5 rounded transition-colors"
                    aria-label="Close speech bubble"
                  >
                    <X size={12} />
                  </button>
                </div>
                <p className="text-zinc-200 font-medium text-[11.5px] pr-1">{speech}</p>

                {/* Speech Bubble Arrow Notch */}
                <div className="absolute -bottom-1.5 right-8 w-3 h-3 bg-[#0e0720] border-r border-b border-purple-500/40 transform rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* The Mascot Body or Minimized Pill */}
          {!isMinimized ? (
            <div className="relative group">
              {/* Subtle ambient neon aura */}
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-500/30 via-purple-500/30 to-lime-500/30 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity pointer-events-none" />

              {/* Mascot Floating Character Card with Inner Animation Controls */}
              <motion.div
                onClick={handleClick}
                animate={innerControls}
                className="relative z-10 flex items-center justify-center filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
              >
                <motion.div
                  animate={{
                    y: isDragging ? 0 : [-3, 4, -3],
                  }}
                  transition={{
                    y: {
                      duration: 3.2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                  className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center"
                >
                {/* SVG Mascot Character */}
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full overflow-visible"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    {/* Chassis Gradient */}
                    <linearGradient id="chassisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2c1250" />
                      <stop offset="50%" stopColor="#170930" />
                      <stop offset="100%" stopColor="#0b0318" />
                    </linearGradient>

                    {/* Visor Screen Gradient */}
                    <linearGradient id="visorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#080210" />
                      <stop offset="100%" stopColor="#1a0b36" />
                    </linearGradient>

                    {/* Neon Orange Rim Accent */}
                    <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="50%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#22c55e" />
                    </linearGradient>

                    {/* Thruster Flame Gradient */}
                    <radialGradient id="thrusterGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                      <stop offset="50%" stopColor="#a855f7" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#000" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Pulsing Hover Thruster Flame */}
                  <g className="animate-pulse" style={{ transformOrigin: "50px 88px" }}>
                    <ellipse cx="50" cy="88" rx={isDragging ? 14 : 9} ry={isDragging ? 8 : 5} fill="url(#thrusterGlow)" />
                    <circle cx="50" cy="88" r={isDragging ? 5 : 3.5} fill="#38bdf8" />
                    <circle cx="50" cy="88" r="1.5" fill="#ffffff" />
                  </g>

                  {/* Antenna with Pulsing Beacon */}
                  <line x1="50" y1="22" x2="50" y2="12" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="50" cy="10" r="4.5" fill="#f97316" className="animate-ping" style={{ transformOrigin: "50px 10px", animationDuration: "2s" }} />
                  <circle cx="50" cy="10" r="4" fill="#f97316" />
                  <circle cx="50" cy="10" r="1.8" fill="#ffffff" />

                  {/* Ear Muffs / Side Wings */}
                  <rect x="14" y="38" width="7" height="18" rx="3.5" fill="#f97316" />
                  <rect x="79" y="38" width="7" height="18" rx="3.5" fill="#f97316" />
                  <circle cx="17.5" cy="47" r="1.5" fill="#ffffff" />
                  <circle cx="82.5" cy="47" r="1.5" fill="#ffffff" />

                  {/* Main Head Chassis */}
                  <rect
                    x="20"
                    y="22"
                    width="60"
                    height="54"
                    rx="22"
                    fill="url(#chassisGrad)"
                    stroke="url(#rimGrad)"
                    strokeWidth="2.2"
                  />

                  {/* Visor Screen */}
                  <rect
                    x="27"
                    y="32"
                    width="46"
                    height="32"
                    rx="12"
                    fill="url(#visorGrad)"
                    stroke="#a855f7"
                    strokeWidth="1.2"
                  />

                  {/* Visor Specular Reflection */}
                  <path
                    d="M 31 36 Q 42 34 65 36"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />

                  {/* Expressive Digital LED Eyes */}
                  {expression === "happy" && (
                    <g fill="#22c55e" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round">
                      {/* Smiling curved LED eyes ^ ^ */}
                      <path d="M 36 50 Q 40 43 44 50" />
                      <path d="M 56 50 Q 60 43 64 50" />
                    </g>
                  )}

                  {expression === "wink" && (
                    <g stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round">
                      {/* Left winking eye ^, Right closed line - */}
                      <path d="M 36 50 Q 40 43 44 50" />
                      <line x1="56" y1="47" x2="64" y2="47" />
                    </g>
                  )}

                  {expression === "surprised" && (
                    <g fill="#38bdf8">
                      {/* Big open circular eyes O O */}
                      <circle cx="40" cy="47" r="5" />
                      <circle cx="60" cy="47" r="5" />
                      <circle cx="41.5" cy="45.5" r="1.8" fill="#ffffff" />
                      <circle cx="61.5" cy="45.5" r="1.8" fill="#ffffff" />
                    </g>
                  )}

                  {expression === "stars" && (
                    <g fill="#facc15" stroke="#facc15" strokeWidth="1">
                      {/* Star eyes ★ ★ */}
                      <polygon points="40,42 41.5,45.5 45,45.5 42,48 43.5,51.5 40,49 36.5,51.5 38,48 35,45.5 38.5,45.5" />
                      <polygon points="60,42 61.5,45.5 65,45.5 62,48 63.5,51.5 60,49 56.5,51.5 58,48 55,45.5 58.5,45.5" />
                    </g>
                  )}

                  {expression === "cool" && (
                    <g>
                      {/* Cyber cool sunglasses */}
                      <polygon points="33,43 46,43 43,51 35,51" fill="#f97316" />
                      <polygon points="54,43 67,43 65,51 57,51" fill="#f97316" />
                      <line x1="46" y1="45" x2="54" y2="45" stroke="#f97316" strokeWidth="2" />
                      <line x1="35" y1="45" x2="44" y2="45" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
                    </g>
                  )}

                  {expression === "dizzy" && (
                    <g stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" fill="none">
                      {/* Spiral / dizzy eyes during dragging ~ ~ */}
                      <path d="M 36 47 Q 40 43 44 47 Q 40 51 36 47" />
                      <path d="M 56 47 Q 60 43 64 47 Q 60 51 56 47" />
                    </g>
                  )}

                  {expression === "curious" && (
                    <g fill="#a855f7">
                      {/* Curious glance to the side */}
                      <circle cx="43" cy="46" r="4.5" />
                      <circle cx="63" cy="46" r="4.5" />
                      <circle cx="44.5" cy="44.5" r="1.6" fill="#ffffff" />
                      <circle cx="64.5" cy="44.5" r="1.6" fill="#ffffff" />
                    </g>
                  )}

                  {/* Cute Cheek Blushes */}
                  <ellipse cx="33" cy="56" rx="2.5" ry="1.2" fill="#ec4899" opacity="0.6" />
                  <ellipse cx="67" cy="56" rx="2.5" ry="1.2" fill="#ec4899" opacity="0.6" />

                  {/* Subtle Smile indicator */}
                  <path
                    d="M 47 57 Q 50 60 53 57"
                    stroke="rgba(255,255,255,0.7)"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    fill="none"
                  />

                  {/* Floating Hand Appendages (reacting to drag) */}
                  <g>
                    <circle
                      cx={isDragging ? 18 : 22}
                      cy={isDragging ? 74 : 72}
                      r="4"
                      fill="#170930"
                      stroke="#f97316"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx={isDragging ? 82 : 78}
                      cy={isDragging ? 74 : 72}
                      r="4"
                      fill="#170930"
                      stroke="#22c55e"
                      strokeWidth="1.5"
                    />
                  </g>
                </svg>
              </motion.div>
            </motion.div>

              {/* Quick action buttons floating beneath mascot on hover */}
              <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/80 backdrop-blur-md border border-white/10 rounded-full px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg">
                <button
                  onClick={handleClick}
                  title="Poke bot"
                  className="text-zinc-400 hover:text-lime-400 p-0.5 transition-colors"
                >
                  <Sparkles size={11} />
                </button>
                <button
                  onClick={resetPosition}
                  title="Reset position"
                  className="text-zinc-400 hover:text-orange-400 p-0.5 transition-colors"
                >
                  <RotateCcw size={11} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMinimized(true);
                  }}
                  title="Minimize mascot"
                  className="text-zinc-400 hover:text-white p-0.5 transition-colors"
                >
                  <X size={11} />
                </button>
              </div>
            </div>
          ) : (
            /* Minimized Pill State */
            <button
              onClick={() => {
                setIsMinimized(false);
                showSpeech("I'm back! Ready for action! 🤖", 3000);
              }}
              className="group flex items-center gap-2 bg-[#0e0720]/90 backdrop-blur-md border border-purple-500/40 hover:border-lime-400/80 px-3 py-1.5 rounded-full text-xs font-mono text-zinc-300 hover:text-white shadow-[0_4px_20px_rgba(168,85,247,0.3)] transition-all"
              title="Click to awaken mascot"
            >
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
              <span>SoloBot</span>
              <span className="text-[10px] text-zinc-500 group-hover:text-lime-300">Wake</span>
            </button>
          )}
        </motion.div>
      </div>
    </>
  );
}
