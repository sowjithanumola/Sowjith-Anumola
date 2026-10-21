import React from "react";
import { motion } from "motion/react";
import {
  ExternalLink,
  Sparkles,
  Terminal,
  Cpu,
  FileText,
  Palette,
  Share2,
  Layers,
  Clock
} from "lucide-react";
import { Project } from "../constants";
import { useTheme } from "../context/ThemeContext";

interface ProjectCardProps {
  project: Project;
  idx?: number;
  key?: React.Key;
}

const CATEGORY_THEMES: Record<
  Project["category"],
  {
    accentBorderDark: string;
    accentBorderLight: string;
    glowColor: string;
    badgeColorDark: string;
    badgeColorLight: string;
    icon: typeof Cpu;
  }
> = {
  "AI & Agents": {
    accentBorderDark: "group-hover:border-purple-400/60",
    accentBorderLight: "group-hover:border-purple-500",
    glowColor: "rgba(168, 85, 247, 0.25)",
    badgeColorDark: "text-purple-300",
    badgeColorLight: "text-purple-700",
    icon: Cpu
  },
  "Developer Tools": {
    accentBorderDark: "group-hover:border-lime-400/60",
    accentBorderLight: "group-hover:border-lime-600",
    glowColor: "rgba(163, 230, 53, 0.25)",
    badgeColorDark: "text-lime-300",
    badgeColorLight: "text-lime-700",
    icon: Terminal
  },
  "Productivity & Writing": {
    accentBorderDark: "group-hover:border-cyan-400/60",
    accentBorderLight: "group-hover:border-cyan-600",
    glowColor: "rgba(34, 211, 238, 0.25)",
    badgeColorDark: "text-cyan-300",
    badgeColorLight: "text-cyan-700",
    icon: FileText
  },
  "Creative & Media Tools": {
    accentBorderDark: "group-hover:border-pink-400/60",
    accentBorderLight: "group-hover:border-pink-600",
    glowColor: "rgba(244, 63, 94, 0.25)",
    badgeColorDark: "text-pink-300",
    badgeColorLight: "text-pink-700",
    icon: Palette
  },
  "Social & Content Tools": {
    accentBorderDark: "group-hover:border-amber-400/60",
    accentBorderLight: "group-hover:border-amber-600",
    glowColor: "rgba(251, 191, 36, 0.25)",
    badgeColorDark: "text-amber-300",
    badgeColorLight: "text-amber-700",
    icon: Share2
  },
  "Other Projects": {
    accentBorderDark: "group-hover:border-indigo-400/60",
    accentBorderLight: "group-hover:border-indigo-600",
    glowColor: "rgba(129, 140, 248, 0.25)",
    badgeColorDark: "text-indigo-300",
    badgeColorLight: "text-indigo-700",
    icon: Layers
  }
};

const COMPLEXITY_CONFIG: Record<
  string,
  { label: string; badgeClassDark: string; badgeClassLight: string; dotClass: string }
> = {
  Advanced: {
    label: "Advanced",
    badgeClassDark: "text-purple-300 bg-purple-950/70 border-purple-500/40",
    badgeClassLight: "text-purple-800 bg-purple-100 border-purple-300",
    dotClass: "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"
  },
  Intermediate: {
    label: "Intermediate",
    badgeClassDark: "text-cyan-300 bg-cyan-950/70 border-cyan-500/40",
    badgeClassLight: "text-cyan-800 bg-cyan-100 border-cyan-300",
    dotClass: "bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
  },
  Experimental: {
    label: "Experimental",
    badgeClassDark: "text-pink-300 bg-pink-950/70 border-pink-500/40",
    badgeClassLight: "text-pink-800 bg-pink-100 border-pink-300",
    dotClass: "bg-pink-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]"
  }
};

export default function ProjectCard({ project, idx = 0 }: ProjectCardProps) {
  const { isDark } = useTheme();
  const theme = CATEGORY_THEMES[project.category] || CATEGORY_THEMES["Other Projects"];
  const CategoryIcon = theme.icon;
  const complexityConfig = project.complexity ? COMPLEXITY_CONFIG[project.complexity] : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.3) }}
      whileHover={{ y: -6 }}
      className={`group relative flex flex-col justify-between h-full rounded-2xl border backdrop-blur-md p-6 sm:p-7 transition-all duration-300 focus-within:ring-2 focus-within:ring-lime-400 ${
        isDark
          ? `border-white/10 bg-[#0d071b]/80 hover:shadow-xl ${theme.accentBorderDark}`
          : `border-zinc-200/90 bg-white/95 shadow-md hover:shadow-xl ${theme.accentBorderLight}`
      }`}
      style={{
        boxShadow: isDark
          ? "0 10px 30px -15px rgba(0,0,0,0.7)"
          : "0 10px 25px -10px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.03)"
      }}
    >
      {/* Subtle corner accent glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at top right, ${theme.glowColor}, transparent 60%)`
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col gap-3.5">
        {/* Category & Status / Complexity Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div
            className={`flex items-center gap-1.5 font-mono font-semibold tracking-wide ${
              isDark ? theme.badgeColorDark : theme.badgeColorLight
            }`}
          >
            <CategoryIcon size={14} aria-hidden="true" />
            <span>{project.category}</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Complexity Level Badge */}
            {project.complexity && (
              <span
                className={`inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full border ${
                  isDark
                    ? complexityConfig?.badgeClassDark || "text-zinc-300 bg-zinc-900 border-zinc-700"
                    : complexityConfig?.badgeClassLight || "text-zinc-700 bg-zinc-100 border-zinc-300"
                }`}
                title={`Complexity: ${project.complexity}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    complexityConfig?.dotClass || "bg-zinc-400"
                  }`}
                  aria-hidden="true"
                />
                <span>{project.complexity}</span>
              </span>
            )}

            {/* Featured Badge */}
            {project.featured && (
              <span
                className={`flex items-center gap-1 text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full border ${
                  isDark
                    ? "text-lime-300 bg-lime-950/60 border-lime-500/30"
                    : "text-lime-900 bg-lime-100 border-lime-300"
                }`}
              >
                <Sparkles size={11} aria-hidden="true" /> Featured
              </span>
            )}
          </div>
        </div>

        {/* Project Name */}
        <h3
          className={`text-xl sm:text-2xl font-bold tracking-tight transition-colors ${
            isDark ? "text-white group-hover:text-white" : "text-zinc-900 group-hover:text-black"
          }`}
        >
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="focus:outline-none focus-visible:underline"
          >
            {project.name}
          </a>
        </h3>

        {/* Description */}
        <p
          className={`text-sm leading-relaxed ${
            isDark ? "text-zinc-300/90" : "text-zinc-600"
          }`}
        >
          {project.description}
        </p>

        {/* Verified Technology Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1" aria-label="Technologies used">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`font-mono text-[11px] px-2 py-0.5 rounded-md border ${
                  isDark
                    ? "text-zinc-400 bg-white/[0.04] border-white/5"
                    : "text-zinc-700 bg-zinc-100 border-zinc-200/80"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Row & Activity Metadata */}
      <div
        className={`relative z-10 pt-4 mt-4 border-t flex items-center justify-between gap-3 ${
          isDark ? "border-white/5" : "border-zinc-200/80"
        }`}
      >
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider uppercase px-4 py-2 rounded-xl transition-all duration-200 group/btn shadow-sm focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:outline-none ${
            isDark
              ? "text-white bg-white/10 hover:bg-lime-400 hover:text-black"
              : "text-zinc-900 bg-zinc-100 hover:bg-lime-400 hover:text-black border border-zinc-300/80"
          }`}
        >
          <span>Live Demo</span>
          <ExternalLink
            size={14}
            className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
            aria-hidden="true"
          />
        </a>

        {/* Last Updated Timestamp or Dev Origin */}
        {project.lastUpdated ? (
          <div
            className={`inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-lg border ${
              isDark
                ? "text-zinc-400 bg-white/[0.03] border-white/5"
                : "text-zinc-600 bg-zinc-100 border-zinc-200"
            }`}
            title={`Last updated: ${project.lastUpdated}`}
          >
            <Clock
              size={12}
              className={isDark ? "text-zinc-500" : "text-zinc-400"}
              aria-hidden="true"
            />
            <span>Updated {project.lastUpdated}</span>
          </div>
        ) : (
          <span
            className={`text-[11px] font-mono ${
              isDark ? "text-zinc-500" : "text-zinc-400"
            }`}
          >
            sowjith.dev
          </span>
        )}
      </div>
    </motion.article>
  );
}
