/**
 * @file MyJourneyTimeline.tsx
 * Interactive vertical timeline component for the "About / My Journey" section.
 * Tells Sowjith's authentic personal journey starting at age 9 through KeyFlow today.
 * Features a dark music-studio aesthetic with violet & electric-blue glows,
 * harmonic particle effects, sound-wave animations, and accessible responsive layouts.
 */

import React, { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  Sparkles,
  Compass,
  Code2,
  Cpu,
  Layers,
  Music,
  ArrowRight,
  Flame,
  Radio,
  Zap
} from "lucide-react";
import {
  JOURNEY_MILESTONES,
  JOURNEY_META,
  JourneyMilestone
} from "../data/journeyTimeline";

interface MyJourneyTimelineProps {
  onExploreProjects?: () => void;
  onContactClick?: () => void;
}

export default function MyJourneyTimeline({
  onExploreProjects,
  onContactClick
}: MyJourneyTimelineProps) {
  const [activeMilestoneId, setActiveMilestoneId] = useState<string>(
    JOURNEY_MILESTONES[0].id
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.15 });

  const getMilestoneIcon = (
    iconType: JourneyMilestone["iconType"],
    accent: JourneyMilestone["accentGlow"]
  ) => {
    const iconClass =
      accent === "electric-blue"
        ? "text-cyan-400"
        : accent === "violet"
        ? "text-violet-400"
        : accent === "purple"
        ? "text-fuchsia-400"
        : "text-sky-400";

    switch (iconType) {
      case "sparkles":
        return <Sparkles size={20} className={iconClass} aria-hidden="true" />;
      case "compass":
        return <Compass size={20} className={iconClass} aria-hidden="true" />;
      case "code":
        return <Code2 size={20} className={iconClass} aria-hidden="true" />;
      case "cpu":
        return <Cpu size={20} className={iconClass} aria-hidden="true" />;
      case "layers":
        return <Layers size={20} className={iconClass} aria-hidden="true" />;
      case "music":
        return <Music size={20} className={iconClass} aria-hidden="true" />;
      default:
        return <Sparkles size={20} className={iconClass} aria-hidden="true" />;
    }
  };

  const getGlowStyles = (accent: JourneyMilestone["accentGlow"]) => {
    switch (accent) {
      case "electric-blue":
        return {
          border: "border-cyan-500/40 hover:border-cyan-400",
          nodeBg: "bg-cyan-500",
          nodeRing: "ring-cyan-400/30",
          glowShadow: "shadow-[0_0_30px_rgba(6,182,212,0.25)]",
          badgeText: "text-cyan-300"
        };
      case "violet":
        return {
          border: "border-violet-500/40 hover:border-violet-400",
          nodeBg: "bg-violet-500",
          nodeRing: "ring-violet-400/30",
          glowShadow: "shadow-[0_0_30px_rgba(139,92,246,0.25)]",
          badgeText: "text-violet-300"
        };
      case "purple":
        return {
          border: "border-fuchsia-500/40 hover:border-fuchsia-400",
          nodeBg: "bg-fuchsia-500",
          nodeRing: "ring-fuchsia-400/30",
          glowShadow: "shadow-[0_0_30px_rgba(217,70,239,0.25)]",
          badgeText: "text-fuchsia-300"
        };
      default:
        return {
          border: "border-sky-500/40 hover:border-sky-400",
          nodeBg: "bg-sky-500",
          nodeRing: "ring-sky-400/30",
          glowShadow: "shadow-[0_0_30px_rgba(56,189,248,0.25)]",
          badgeText: "text-sky-300"
        };
    }
  };

  return (
    <section
      id="journey"
      ref={containerRef}
      className="my-28 sm:my-36 relative scroll-mt-24 content-auto gpu-layer"
      aria-label="My Journey Timeline"
    >
      {/* Background Studio Ambience & Sound Wave Particle Canvas */}
      <div
        className="absolute inset-0 -inset-x-4 sm:-inset-x-8 rounded-[2.5rem] bg-[#070311]/90 border border-white/10 backdrop-blur-2xl overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        {/* Glow Spheres */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-600/15 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-cyan-600/15 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-900/10 blur-[140px] rounded-full" />

        {/* Subtle Horizontal Music Studio Frequency Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60" />

        {/* Ambient floating music particles */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-cyan-400/40 animate-pulse"
              style={{
                top: `${(i * 19) % 95}%`,
                left: `${(i * 29 + 13) % 92}%`,
                animationDuration: `${3 + (i % 4)}s`,
                animationDelay: `${i * 0.4}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 px-5 sm:px-10 lg:px-14 py-12 sm:py-20 max-w-5xl mx-auto">
        {/* SECTION HEADER: Deep Black + Electric Accents */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          {/* Studio Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-300">
              KeyFlow Journey Archive
            </span>
            <span className="text-zinc-600">·</span>
            <span className="text-xs font-mono text-cyan-400 font-semibold">
              Solo Coder
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4 text-balance">
            {JOURNEY_META.headline}
          </h2>

          <p className="text-base sm:text-xl text-zinc-300 font-normal leading-relaxed text-balance">
            {JOURNEY_META.supportingText}
          </p>
        </div>

        {/* AGE 9 HIGHLIGHT COUNTER CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 rounded-2xl bg-gradient-to-r from-violet-950/40 via-[#0e071e]/90 to-cyan-950/40 border border-violet-500/30 p-6 sm:p-8 relative overflow-hidden shadow-[0_0_40px_rgba(139,92,246,0.15)]"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Radio size={140} className="text-white" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 p-[2px] shrink-0 shadow-[0_0_25px_rgba(6,182,212,0.4)]">
                <div className="w-full h-full bg-[#080212] rounded-[14px] flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400">
                    Started
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-white font-mono leading-none mt-0.5">
                    9
                  </span>
                  <span className="text-[9px] font-mono text-violet-300">
                    Years Old
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                    <Flame size={14} className="text-amber-400" />
                    <span>Highlighted Milestone</span>
                  </span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-xs font-mono text-zinc-400">
                    Born March 12, 2013
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  The Journey of a 13-Year-Old Solo Coder
                </h3>
                <p className="text-sm text-zinc-300 mt-1 max-w-xl">
                  Coding became my creative superpower. From simple logic to building
                  full-scale developer suites and musical instruments like KeyFlow.
                </p>
              </div>
            </div>

            {/* Quick Metrics Strip */}
            <div className="flex items-center gap-3 sm:gap-6 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-white/10 md:pl-8 shrink-0 w-full md:w-auto justify-between md:justify-start">
              <div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-400">
                  4+
                </div>
                <div className="text-xs font-mono text-zinc-400">Years Active</div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-violet-400">
                  33
                </div>
                <div className="text-xs font-mono text-zinc-400">Shipped Apps</div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">
                  100%
                </div>
                <div className="text-xs font-mono text-zinc-400">Solo Coded</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* MOBILE COMPACT TIMELINE JUMP SELECTOR */}
        <div className="lg:hidden mb-8 overflow-x-auto pb-2 scrollbar-none flex gap-2">
          {JOURNEY_MILESTONES.map((m) => {
            const isSelected = activeMilestoneId === m.id;
            return (
              <button
                key={m.id}
                onClick={() => {
                  setActiveMilestoneId(m.id);
                  const el = document.getElementById(`card-${m.id}`);
                  el?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className={`whitespace-nowrap shrink-0 px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                  isSelected
                    ? "bg-violet-600/30 border-violet-400 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                    : "bg-white/[0.03] border-white/10 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <span className="mr-1.5 opacity-60">0{m.stepNumber}.</span>
                <span>{m.ageHighlight || m.stageTitle.split(" — ")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* VERTICAL TIMELINE CONTAINER */}
        <div className="relative">
          {/* The Glowing Central Timeline Cable */}
          <div
            className="absolute left-6 lg:left-1/2 top-4 bottom-8 -translate-x-1/2 w-[2px] bg-gradient-to-b from-cyan-400 via-violet-500 to-fuchsia-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
            aria-hidden="true"
          />

          {/* Timeline Milestones List */}
          <div className="space-y-12 sm:space-y-16">
            {JOURNEY_MILESTONES.map((milestone, idx) => {
              const isEven = idx % 2 === 0;
              const styles = getGlowStyles(milestone.accentGlow);
              const isActive = activeMilestoneId === milestone.id;

              return (
                <div
                  key={milestone.id}
                  id={`card-${milestone.id}`}
                  onMouseEnter={() => setActiveMilestoneId(milestone.id)}
                  className={`relative flex flex-col lg:flex-row items-start ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  } gap-8 group`}
                >
                  {/* Glowing Milestone Indicator Node */}
                  <div
                    className="absolute left-6 lg:left-1/2 -translate-x-1/2 top-6 z-20 flex items-center justify-center cursor-pointer"
                    onClick={() => setActiveMilestoneId(milestone.id)}
                  >
                    <div
                      className={`w-10 h-10 rounded-full bg-[#090314] border-2 flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? `${styles.border} ring-4 ${styles.nodeRing} ${styles.glowShadow} scale-110`
                          : "border-white/20 group-hover:border-white/60"
                      }`}
                    >
                      <div
                        className={`w-3 h-3 rounded-full transition-transform duration-300 ${
                          styles.nodeBg
                        } ${isActive ? "scale-125" : "scale-90"}`}
                      />
                    </div>
                  </div>

                  {/* Left or Right Content Card */}
                  <div
                    className={`pl-16 lg:pl-0 w-full lg:w-[calc(50%-3rem)] ${
                      isEven ? "lg:text-right" : "lg:text-left"
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.5, delay: idx * 0.08 }}
                      className={`rounded-2xl bg-[#0c051a]/85 backdrop-blur-xl border transition-all duration-300 p-6 sm:p-7 relative ${
                        isActive
                          ? `${styles.border} ${styles.glowShadow} bg-[#0e071f]`
                          : "border-white/10 hover:border-white/25"
                      }`}
                    >
                      {/* Top Header with Step Number & Icon */}
                      <div
                        className={`flex items-center gap-3 mb-3 ${
                          isEven ? "lg:justify-end" : "lg:justify-start"
                        }`}
                      >
                        <span className="text-xs font-mono font-bold tracking-widest uppercase text-zinc-400">
                          Milestone 0{milestone.stepNumber}
                        </span>
                        <span className="text-zinc-600">·</span>
                        <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10">
                          {getMilestoneIcon(milestone.iconType, milestone.accentGlow)}
                        </div>
                      </div>

                      {/* Stage Title */}
                      <h3 className="text-lg sm:text-xl font-black tracking-tight text-white mb-2">
                        {milestone.stageTitle}
                      </h3>

                      {/* Primary Description */}
                      <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal mb-4">
                        {milestone.description}
                      </p>

                      {/* Key Insight / Takeaway */}
                      <div
                        className={`p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-zinc-400 font-mono mb-4 ${
                          isEven ? "lg:text-right" : "lg:text-left"
                        }`}
                      >
                        <span className="text-zinc-500 mr-1.5 uppercase tracking-wider text-[10px] block">
                          Insight:
                        </span>
                        <span>"{milestone.keyTakeaway}"</span>
                      </div>

                      {/* Unboxed Metadata Discipline */}
                      <div
                        className={`flex flex-wrap items-center gap-2 text-xs text-zinc-400 ${
                          isEven ? "lg:justify-end" : "lg:justify-start"
                        }`}
                      >
                        {milestone.tags.map((tag, tIdx) => (
                          <React.Fragment key={tag}>
                            <span className="hover:text-zinc-200 transition-colors">
                              {tag}
                            </span>
                            {tIdx < milestone.tags.length - 1 && (
                              <span className="text-zinc-600" aria-hidden="true">
                                ·
                              </span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Empty side for desktop balance */}
                  <div className="hidden lg:block lg:w-[calc(50%-3rem)]" />
                </div>
              );
            })}
          </div>
        </div>

        {/* FINAL CLOSING SECTION: "This is only the beginning." */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 sm:mt-28 rounded-3xl bg-gradient-to-b from-[#100724] to-[#080212] border border-violet-500/30 p-8 sm:p-12 text-center relative overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.18)]"
        >
          {/* Subtle Ambient Radial Ray */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-cyan-500/10 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 text-xs font-mono mb-4">
              <Zap size={14} className="text-cyan-400" />
              <span>Looking Ahead</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
              {JOURNEY_META.conclusion.title}
            </h3>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6 font-normal">
              {JOURNEY_META.conclusion.description}
            </p>

            <blockquote className="font-mono text-xs sm:text-sm text-cyan-300 italic mb-8 py-2 border-y border-white/10">
              "{JOURNEY_META.conclusion.quote}"
            </blockquote>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#projects"
                onClick={onExploreProjects}
                className="px-6 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 transition-all shadow-[0_0_25px_rgba(6,182,212,0.35)] flex items-center gap-2"
              >
                <span>Explore Shipped Projects</span>
                <ArrowRight size={14} />
              </a>

              <a
                href="#contact"
                onClick={onContactClick}
                className="px-6 py-3 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-violet-400/50 transition-colors"
              >
                Connect With Me
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
