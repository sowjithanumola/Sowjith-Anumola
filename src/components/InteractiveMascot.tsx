import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useAnimation, useMotionValue, animate } from "motion/react";
import {
  Sparkles,
  X,
  RotateCcw,
  Compass,
  ChevronRight,
  SkipForward,
  Volume2,
  VolumeX
} from "lucide-react";

// Types of emotional expressions for the mascot
export type MascotExpression = "happy" | "wink" | "surprised" | "stars" | "dizzy" | "cool" | "curious";

export interface MascotMessage {
  id: string;
  text: string;
  expression: MascotExpression;
  emoji?: string;
  durationMs?: number;
  sectionId?: string;
  priority?: "high" | "normal";
}

interface FloatingEmoji {
  id: string;
  emoji: string;
  x: number;
  y: number;
}

// Section-aware explanations & commentary
const SECTION_CONFIGS: Record<string, { quote: string; expression: MascotExpression; emoji: string; title: string; guideDesc: string }> = {
  hero: {
    title: "Home",
    quote: "Hey! Welcome to my corner of the internet. 👋",
    expression: "happy",
    emoji: "🚀",
    guideDesc: "Sowjith's solo workspace, identity & live stats."
  },
  featured: {
    title: "Flagship",
    quote: "These are flagship creations: EmoLens AI, WebOS, ECHOROOM & OpenCut! 🌟",
    expression: "cool",
    emoji: "⭐",
    guideDesc: "Top software: AI vision analyst, browser OS, Web DAW & video editor."
  },
  projects: {
    title: "Projects",
    quote: "Psst... check out these cool projects! 28+ shipped live! 🛠️",
    expression: "stars",
    emoji: "✨",
    guideDesc: "28 live shipped apps with category distribution analytics."
  },
  about: {
    title: "About",
    quote: "A little about the human behind this website! Born March 12, 2013 🎂",
    expression: "happy",
    emoji: "⭐",
    guideDesc: "Solo builder story, coding since age 10, born March 12, 2013."
  },
  skills: {
    title: "Skills",
    quote: "These are my superpowers! Full-stack, modern UI & AI wizardry. ⚡",
    expression: "cool",
    emoji: "⚡",
    guideDesc: "Technical superpowers across React, TypeScript, AI APIs & Audio."
  },
  contact: {
    title: "Contact",
    quote: "Thinking about saying hello? Let's connect! 📬",
    expression: "wink",
    emoji: "💜",
    guideDesc: "Direct lines to Sowjith — Twitter @iamsowjith, GitHub & Discord."
  }
};

export default function InteractiveMascot() {
  const [bounds, setBounds] = useState<{ top: number; left: number; right: number; bottom: number }>({
    top: -500,
    left: -800,
    right: 0,
    bottom: 0
  });

  const [isDragging, setIsDragging] = useState(false);
  const [dragAngle, setDragAngle] = useState(0);
  const [expression, setExpression] = useState<MascotExpression>("happy");
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentSection, setCurrentSection] = useState<string>("hero");

  // State Machine for speech & typing
  const [currentMessage, setCurrentMessage] = useState<MascotMessage | null>({
    id: "welcome-1",
    text: "Hey! Welcome to my corner of the internet. 👋",
    expression: "happy",
    emoji: "🚀",
    durationMs: 4500,
    sectionId: "hero"
  });
  const [displayedText, setDisplayedText] = useState("Hey! Welcome to my corner of the internet. 👋");
  const [isTyping, setIsTyping] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [isAutoPaused, setIsAutoPaused] = useState(false); // Pauses automatic section interruptions when user dismissed

  // Refs for state machine & timer cleanup
  const currentMsgRef = useRef<MascotMessage | null>(null);
  const queuedMessageRef = useRef<MascotMessage | null>(null);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const displayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const blinkTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastAnnouncedSectionRef = useRef<string>("hero");
  const isTypingRef = useRef<boolean>(false);
  const isDisplayingRef = useRef<boolean>(false);
  const isAutoPausedRef = useRef<boolean>(false);

  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const innerControls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync ref
  useEffect(() => {
    isAutoPausedRef.current = isAutoPaused;
  }, [isAutoPaused]);

  // Clean all message timers
  const clearAllMessageTimers = useCallback(() => {
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
      typingTimerRef.current = null;
    }
    if (displayTimerRef.current) {
      clearTimeout(displayTimerRef.current);
      displayTimerRef.current = null;
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
    setFloatingEmojis((prev) => [...prev.slice(-10), ...newEmojis]);
  }, []);

  // Start holding completed message visible for 3–5 seconds
  const startDisplayTimer = useCallback((msg: MascotMessage) => {
    clearAllMessageTimers();
    isTypingRef.current = false;
    setIsTyping(false);
    isDisplayingRef.current = true;

    // Display duration strictly 3.5 to 4.5 seconds
    const duration = msg.durationMs || 4000;
    displayTimerRef.current = setTimeout(() => {
      isDisplayingRef.current = false;

      // Check if a section announcement was queued while this message was playing
      if (queuedMessageRef.current) {
        const next = queuedMessageRef.current;
        queuedMessageRef.current = null;
        startTypingMessage(next);
      } else {
        // Naturally fade out speech bubble
        setCurrentMessage(null);
        currentMsgRef.current = null;
      }
    }, duration);
  }, [clearAllMessageTimers]);

  // Typewriter animation engine: guarantees typing only happens on message change & cancels prior runs
  const startTypingMessage = useCallback((msg: MascotMessage) => {
    clearAllMessageTimers();
    currentMsgRef.current = msg;
    setCurrentMessage(msg);
    setExpression(msg.expression);
    if (msg.emoji) spawnEmojiBurst(2, msg.emoji);

    const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setDisplayedText(msg.text);
      startDisplayTimer(msg);
      return;
    }

    setDisplayedText("");
    setIsTyping(true);
    isTypingRef.current = true;
    isDisplayingRef.current = false;

    let charIndex = 0;
    const fullText = msg.text;
    const speed = 26; // ms per character (~35 chars/sec for brisk, readable typing)

    const typeStep = () => {
      charIndex++;
      setDisplayedText(fullText.slice(0, charIndex));

      if (charIndex < fullText.length) {
        typingTimerRef.current = setTimeout(typeStep, speed);
      } else {
        // Typing complete! Hold message for 3–5 seconds
        startDisplayTimer(msg);
      }
    };

    typingTimerRef.current = setTimeout(typeStep, speed);
  }, [clearAllMessageTimers, spawnEmojiBurst, startDisplayTimer]);

  // Message dispatcher with queue & deduplication
  const enqueueOrPlay = useCallback((msg: MascotMessage, isSectionChange = false) => {
    // If auto messages are paused by user dismissal, ignore background section triggers
    if (isSectionChange && isAutoPausedRef.current) {
      return;
    }

    // High priority (user clicks, guide interactions) unpauses auto
    if (msg.priority === "high") {
      setIsAutoPaused(false);
      isAutoPausedRef.current = false;
    }

    // Prevent repeated messages for the exact same section
    if (isSectionChange && msg.sectionId && msg.sectionId === lastAnnouncedSectionRef.current) {
      return;
    }

    if (isSectionChange && msg.sectionId) {
      lastAnnouncedSectionRef.current = msg.sectionId;
    }

    // High priority triggers immediately abort and start new message
    if (msg.priority === "high") {
      queuedMessageRef.current = null;
      startTypingMessage(msg);
      return;
    }

    // If completely idle, start typing immediately
    if (!isTypingRef.current && !isDisplayingRef.current) {
      startTypingMessage(msg);
    } else {
      // If a message is actively typing or displaying, queue the section change without rapid switching
      queuedMessageRef.current = msg;
    }
  }, [startTypingMessage]);

  // Skip typing immediately to view full text
  const skipTyping = useCallback(() => {
    if (!currentMsgRef.current) return;
    clearAllMessageTimers();
    setDisplayedText(currentMsgRef.current.text);
    startDisplayTimer(currentMsgRef.current);
  }, [clearAllMessageTimers, startDisplayTimer]);

  // Replay current message from start
  const replayCurrentMessage = useCallback(() => {
    if (!currentMsgRef.current) {
      // If no message is active, replay current section's message
      const config = SECTION_CONFIGS[currentSection] || SECTION_CONFIGS.hero;
      enqueueOrPlay({
        id: `replay-${Date.now()}`,
        text: config.quote,
        expression: config.expression,
        emoji: config.emoji,
        priority: "high"
      });
      return;
    }
    startTypingMessage({ ...currentMsgRef.current, priority: "high" });
  }, [currentSection, enqueueOrPlay, startTypingMessage]);

  // Dismiss / close speech bubble and pause automatic section alerts
  const dismissSpeech = useCallback(() => {
    clearAllMessageTimers();
    queuedMessageRef.current = null;
    currentMsgRef.current = null;
    setCurrentMessage(null);
    setIsTyping(false);
    isTypingRef.current = false;
    isDisplayingRef.current = false;
    setIsAutoPaused(true);
  }, [clearAllMessageTimers]);

  // Resume automatic section announcements
  const resumeAutoAnnouncements = useCallback(() => {
    setIsAutoPaused(false);
    const config = SECTION_CONFIGS[currentSection] || SECTION_CONFIGS.hero;
    enqueueOrPlay({
      id: `resume-${Date.now()}`,
      text: config.quote,
      expression: config.expression,
      emoji: config.emoji,
      priority: "high"
    });
  }, [currentSection, enqueueOrPlay]);

  // Dynamic viewport boundaries on resize
  useEffect(() => {
    const updateBounds = () => {
      if (typeof window !== "undefined") {
        setBounds({
          top: -window.innerHeight + 130,
          left: -window.innerWidth + 130,
          right: 0,
          bottom: 0
        });
      }
    };
    updateBounds();
    window.addEventListener("resize", updateBounds, { passive: true });
    return () => window.removeEventListener("resize", updateBounds);
  }, []);

  // Section Tracking with IntersectionObserver & Dwell Hysteresis
  useEffect(() => {
    const sectionIds = ["hero", "featured", "projects", "about", "skills", "contact"];
    const sectionRatios = new Map<string, number>();
    let dwellTimer: NodeJS.Timeout | null = null;
    let candidateSection = "";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          sectionRatios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        // Find dominant section with highest intersection ratio above 0.22 threshold
        let bestSection = "";
        let maxRatio = 0.22;

        sectionRatios.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            bestSection = id;
          }
        });

        if (bestSection && bestSection !== candidateSection) {
          candidateSection = bestSection;
          if (dwellTimer) clearTimeout(dwellTimer);

          // Dwell hysteresis (260ms): user must settle on section before triggering announcement
          dwellTimer = setTimeout(() => {
            const config = SECTION_CONFIGS[bestSection];
            if (config && bestSection !== lastAnnouncedSectionRef.current) {
              setCurrentSection(bestSection);
              enqueueOrPlay(
                {
                  id: `section-${bestSection}-${Date.now()}`,
                  text: config.quote,
                  expression: config.expression,
                  emoji: config.emoji,
                  sectionId: bestSection,
                  durationMs: 4200
                },
                true
              );
            }
          }, 260);
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75],
        rootMargin: "-15% 0px -25% 0px"
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      if (dwellTimer) clearTimeout(dwellTimer);
      observer.disconnect();
    };
  }, [enqueueOrPlay]);

  // Subtle idle eye blinking & expression variation when inactive
  useEffect(() => {
    const scheduleNextBlink = () => {
      if (!isDragging && !isTypingRef.current) {
        blinkTimerRef.current = setTimeout(() => {
          setExpression((prev) => {
            if (prev === "dizzy") return "happy";
            const variants: MascotExpression[] = ["happy", "happy", "wink", "stars", "curious", "cool"];
            return variants[Math.floor(Math.random() * variants.length)];
          });
          scheduleNextBlink();
        }, 4000 + Math.random() * 3000);
      }
    };

    scheduleNextBlink();
    return () => {
      if (blinkTimerRef.current) clearTimeout(blinkTimerRef.current);
    };
  }, [isDragging]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearAllMessageTimers();
      if (blinkTimerRef.current) clearTimeout(blinkTimerRef.current);
    };
  }, [clearAllMessageTimers]);

  // Mascot Click handler (pokes bot or opens guide)
  const handleClick = () => {
    if (isDragging) return;

    const quips = [
      "Beep boop! Solo coder power activated! ⚡",
      "I run on pure curiosity, clean code & zero corporate fluff! 🚀",
      "Sowjith built this whole digital universe 100% independently! 💡",
      "Psst... Did you try dragging me across the screen? 🛸",
      "Born March 12, 2013 — building tomorrow's tech today! 🎂",
      "Check out the interactive Category Chart above! 📊",
      "Did you know? 28 live apps are shipped right here! ✨",
      "*happy robot antenna dances with neon sparks* 🤖",
      "SoloBot online and ready to guide you anytime! ⭐"
    ];

    const randomQuip = quips[Math.floor(Math.random() * quips.length)];
    const randomExprs: MascotExpression[] = ["happy", "wink", "surprised", "stars", "cool", "curious"];
    const chosenExpr = randomExprs[Math.floor(Math.random() * randomExprs.length)];

    enqueueOrPlay({
      id: `poke-${Date.now()}`,
      text: randomQuip,
      expression: chosenExpr,
      priority: "high",
      durationMs: 4000
    });

    spawnEmojiBurst(3);

    innerControls.start({
      scale: [1, 1.18, 0.94, 1.08, 1],
      rotate: [0, -6, 6, -3, 0],
      transition: { duration: 0.42, ease: "easeOut" }
    });
  };

  // Drag interaction handlers
  const handleDragStart = () => {
    setIsDragging(true);
    setExpression("dizzy");
    spawnEmojiBurst(2, "💨");

    const dragQuotes = [
      "Hey! Don't drag me out! 🚀",
      "Where are we flying to?! 🛸",
      "Wheeeeee! Hold onto your cables!",
      "Whoa, turbulence! Easy on the mouse!",
      "Look at me fly across the viewport! ✨"
    ];
    enqueueOrPlay({
      id: `drag-${Date.now()}`,
      text: dragQuotes[Math.floor(Math.random() * dragQuotes.length)],
      expression: "dizzy",
      priority: "high",
      durationMs: 3000
    });
  };

  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: { delta: { x: number; y: number } }) => {
    const angle = Math.max(-25, Math.min(25, info.delta.x * 2));
    setDragAngle(angle);

    if (typeof window !== "undefined") {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const isNearEdge =
          rect.left < 40 ||
          rect.right > window.innerWidth - 40 ||
          rect.top < 40 ||
          rect.bottom > window.innerHeight - 40;

        if (isNearEdge && Math.random() < 0.05) {
          enqueueOrPlay({
            id: `edge-${Date.now()}`,
            text: "Whoa, careful with the edge! Don't drop me! ⚠️",
            expression: "surprised",
            priority: "high",
            durationMs: 2500
          });
        }
      }
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDragAngle(0);

    const landingQuotes = [
      "Okay, that was a trip! 🤖",
      "Phew, solid landing! 🎯",
      "I like this vantage point!",
      "Reporting live from new coordinates! 📍",
      "Smooth flying, pilot! ⭐"
    ];
    enqueueOrPlay({
      id: `land-${Date.now()}`,
      text: landingQuotes[Math.floor(Math.random() * landingQuotes.length)],
      expression: "happy",
      priority: "high",
      durationMs: 3500
    });
    spawnEmojiBurst(3, "✨");

    innerControls.start({
      scale: [1.14, 0.92, 1.05, 1],
      transition: { duration: 0.35, ease: "easeOut" }
    });
  };

  // Reset to default bottom-right position
  const resetPosition = (e: React.MouseEvent) => {
    e.stopPropagation();
    animate(dragX, 0, { type: "spring", stiffness: 280, damping: 22 });
    animate(dragY, 0, { type: "spring", stiffness: 280, damping: 22 });
    enqueueOrPlay({
      id: `reset-${Date.now()}`,
      text: "Reset to my favorite home spot! 🏠",
      expression: "happy",
      priority: "high",
      durationMs: 3000
    });
    spawnEmojiBurst(3);
  };

  // Jump to section via guide panel
  const navigateToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      const config = SECTION_CONFIGS[sectionId];
      if (config) {
        setCurrentSection(sectionId);
        lastAnnouncedSectionRef.current = sectionId;
        enqueueOrPlay({
          id: `guide-jump-${sectionId}-${Date.now()}`,
          text: `${config.title}: ${config.quote}`,
          expression: config.expression,
          emoji: config.emoji,
          priority: "high",
          durationMs: 4200
        });
      }
    }
    setShowGuide(false);
  };

  return (
    <>
      {/* Floating Mascot Container - Clamped to Viewport */}
      <div
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 pointer-events-none select-none"
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

          {/* Clickable Guide Panel */}
          <AnimatePresence>
            {showGuide && !isMinimized && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.92 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="absolute bottom-full mb-4 right-0 w-[280px] sm:w-[320px] bg-[#0c051a]/95 backdrop-blur-2xl border border-purple-500/40 text-white shadow-[0_16px_45px_rgba(168,85,247,0.35)] rounded-3xl p-4 text-xs font-mono pointer-events-auto z-30"
              >
                {/* Guide Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-lime-950/70 border border-lime-500/30 text-lime-400">
                      <Compass size={14} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-xs">SoloBot Guide</h4>
                      <p className="text-[10px] text-zinc-400">Portfolio companion</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowGuide(false)}
                    className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                    aria-label="Close guide panel"
                  >
                    <X size={14} />
                  </button>
                </div>

                {/* Section Explorer Buttons */}
                <div className="space-y-1.5 mb-3.5 max-h-[220px] overflow-y-auto pr-1">
                  {(["hero", "featured", "projects", "about", "skills", "contact"] as const).map((secId) => {
                    const info = SECTION_CONFIGS[secId];
                    const isCurrent = currentSection === secId;
                    return (
                      <button
                        key={secId}
                        onClick={() => navigateToSection(secId)}
                        className={`w-full text-left p-2 rounded-xl border transition-all flex items-center justify-between group ${
                          isCurrent
                            ? "bg-purple-900/40 border-lime-400/60 shadow-[0_0_12px_rgba(163,230,53,0.15)]"
                            : "bg-white/5 border-white/5 hover:border-purple-400/40 hover:bg-white/10"
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <div className="flex items-center gap-1.5 font-bold text-[11px] text-zinc-200 group-hover:text-white">
                            <span>{info.title}</span>
                            {isCurrent && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-lime-400/20 text-lime-300 font-semibold">
                                active
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-zinc-400 truncate leading-tight mt-0.5">
                            {info.guideDesc}
                          </p>
                        </div>
                        <ChevronRight size={13} className="text-zinc-500 group-hover:text-lime-300 shrink-0" />
                      </button>
                    );
                  })}
                </div>

                {/* Guide Footer Controls */}
                <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px]">
                  <button
                    onClick={replayCurrentMessage}
                    className="flex items-center gap-1 text-zinc-400 hover:text-lime-300 transition-colors py-1"
                  >
                    <RotateCcw size={11} />
                    <span>Replay Voice</span>
                  </button>
                  <button
                    onClick={isAutoPaused ? resumeAutoAnnouncements : dismissSpeech}
                    className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors py-1"
                  >
                    {isAutoPaused ? <VolumeX size={11} className="text-orange-400" /> : <Volume2 size={11} className="text-lime-400" />}
                    <span>{isAutoPaused ? "Auto Muted" : "Auto Tour"}</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Speech Bubble with Stable Typing State & Controls */}
          <AnimatePresence>
            {currentMessage && !isMinimized && !showGuide && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.88 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.88 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                onClick={isTyping ? skipTyping : undefined}
                className="absolute bottom-full mb-3.5 right-0 max-w-[240px] sm:max-w-[280px] w-max bg-[#0e0720]/95 backdrop-blur-xl border border-purple-500/40 text-white shadow-[0_10px_35px_rgba(168,85,247,0.35)] rounded-2xl p-3 text-xs font-mono leading-relaxed pointer-events-auto group cursor-default"
              >
                {/* Speech Header with State Indicators & Action Controls */}
                <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-1.5 mb-2">
                  <div className="flex items-center gap-1.5 text-lime-400 text-[10px] uppercase font-bold tracking-wider">
                    <span className={`w-1.5 h-1.5 rounded-full bg-lime-400 ${isTyping ? "animate-ping" : ""}`} />
                    <span>SoloBot · {isTyping ? "Typing..." : "Guide"}</span>
                  </div>

                  <div className="flex items-center gap-1 text-zinc-400">
                    {/* Skip button while typing */}
                    {isTyping && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          skipTyping();
                        }}
                        title="Skip typing animation"
                        className="p-0.5 rounded hover:text-lime-300 hover:bg-white/10 transition-colors"
                        aria-label="Skip typing"
                      >
                        <SkipForward size={11} />
                      </button>
                    )}

                    {/* Replay voice button */}
                    {!isTyping && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          replayCurrentMessage();
                        }}
                        title="Replay message"
                        className="p-0.5 rounded hover:text-lime-300 hover:bg-white/10 transition-colors"
                        aria-label="Replay message"
                      >
                        <RotateCcw size={11} />
                      </button>
                    )}

                    {/* Guide open button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowGuide(true);
                      }}
                      title="Open tour guide"
                      className="p-0.5 rounded hover:text-purple-300 hover:bg-white/10 transition-colors"
                      aria-label="Open tour guide"
                    >
                      <Compass size={11} />
                    </button>

                    {/* Close speech bubble */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        dismissSpeech();
                      }}
                      title="Dismiss message & mute auto"
                      className="p-0.5 rounded hover:text-white hover:bg-white/10 transition-colors"
                      aria-label="Close speech bubble"
                    >
                      <X size={11} />
                    </button>
                  </div>
                </div>

                {/* Typed Content with Monospace Blinking Cursor */}
                <p className="text-zinc-200 font-medium text-[11.5px] pr-1 leading-snug">
                  {displayedText}
                  {isTyping && (
                    <span className="inline-block w-1.5 h-3 ml-0.5 bg-lime-400 animate-pulse align-middle" />
                  )}
                </p>

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
                className="relative z-10 flex items-center justify-center filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label="SoloBot mascot companion. Click to talk or open guide."
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleClick();
                  }
                }}
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
                  {/* SVG Mascot Character (Preserving Robot-Head Identity) */}
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
                        <path d="M 36 50 Q 40 43 44 50" />
                        <path d="M 56 50 Q 60 43 64 50" />
                      </g>
                    )}

                    {expression === "wink" && (
                      <g stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M 36 50 Q 40 43 44 50" />
                        <line x1="56" y1="47" x2="64" y2="47" />
                      </g>
                    )}

                    {expression === "surprised" && (
                      <g fill="#38bdf8">
                        <circle cx="40" cy="47" r="5" />
                        <circle cx="60" cy="47" r="5" />
                        <circle cx="41.5" cy="45.5" r="1.8" fill="#ffffff" />
                        <circle cx="61.5" cy="45.5" r="1.8" fill="#ffffff" />
                      </g>
                    )}

                    {expression === "stars" && (
                      <g fill="#facc15" stroke="#facc15" strokeWidth="1">
                        <polygon points="40,42 41.5,45.5 45,45.5 42,48 43.5,51.5 40,49 36.5,51.5 38,48 35,45.5 38.5,45.5" />
                        <polygon points="60,42 61.5,45.5 65,45.5 62,48 63.5,51.5 60,49 56.5,51.5 58,48 55,45.5 58.5,45.5" />
                      </g>
                    )}

                    {expression === "cool" && (
                      <g>
                        <polygon points="33,43 46,43 43,51 35,51" fill="#f97316" />
                        <polygon points="54,43 67,43 65,51 57,51" fill="#f97316" />
                        <line x1="46" y1="45" x2="54" y2="45" stroke="#f97316" strokeWidth="2" />
                        <line x1="35" y1="45" x2="44" y2="45" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
                      </g>
                    )}

                    {expression === "dizzy" && (
                      <g stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" fill="none">
                        <path d="M 36 47 Q 40 43 44 47 Q 40 51 36 47" />
                        <path d="M 56 47 Q 60 43 64 47 Q 60 51 56 47" />
                      </g>
                    )}

                    {expression === "curious" && (
                      <g fill="#a855f7">
                        <circle cx="43" cy="46" r="4.5" />
                        <circle cx="63" cy="46" r="4.5" />
                        <circle cx="44.5" cy="44.5" r="1.6" fill="#ffffff" />
                        <circle cx="64.5" cy="44.5" r="1.6" fill="#ffffff" />
                      </g>
                    )}

                    {/* Cute Cheek Blushes */}
                    <ellipse cx="33" cy="56" rx="2.5" ry="1.2" fill="#ec4899" opacity="0.6" />
                    <ellipse cx="67" cy="56" rx="2.5" ry="1.2" fill="#ec4899" opacity="0.6" />

                    {/* Smile Arc */}
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

              {/* Quick action toolbar beneath mascot */}
              <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/85 backdrop-blur-md border border-white/10 rounded-full px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-xl z-20">
                <button
                  onClick={handleClick}
                  title="Poke bot"
                  className="text-zinc-400 hover:text-lime-400 p-0.5 transition-colors"
                  aria-label="Poke bot"
                >
                  <Sparkles size={11} />
                </button>
                <button
                  onClick={() => setShowGuide((prev) => !prev)}
                  title="Open tour guide"
                  className="text-zinc-400 hover:text-purple-400 p-0.5 transition-colors"
                  aria-label="Open tour guide"
                >
                  <Compass size={11} />
                </button>
                <button
                  onClick={resetPosition}
                  title="Reset position"
                  className="text-zinc-400 hover:text-orange-400 p-0.5 transition-colors"
                  aria-label="Reset position"
                >
                  <RotateCcw size={11} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMinimized(true);
                    dismissSpeech();
                  }}
                  title="Minimize mascot"
                  className="text-zinc-400 hover:text-white p-0.5 transition-colors"
                  aria-label="Minimize mascot"
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
                setIsAutoPaused(false);
                enqueueOrPlay({
                  id: `unminimize-${Date.now()}`,
                  text: "I'm back! Ready for action! 🤖",
                  expression: "happy",
                  priority: "high",
                  durationMs: 3500
                });
              }}
              className="group flex items-center gap-2 bg-[#0e0720]/90 backdrop-blur-md border border-purple-500/40 hover:border-lime-400/80 px-3 py-1.5 rounded-full text-xs font-mono text-zinc-300 hover:text-white shadow-[0_4px_20px_rgba(168,85,247,0.3)] transition-all cursor-pointer"
              title="Click to awaken SoloBot"
              aria-label="Awaken SoloBot mascot"
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
