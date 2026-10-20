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

interface ProjectCardProps {
  project: Project;
  idx?: number;
  key?: React.Key;
}

const CATEGORY_THEMES: Record<
  Project["category"],
  {
    accentBorder: string;
    glowColor: string;
    badgeColor: string;
    icon: typeof Cpu;
    tagBg: string;
  }
> = {
  "AI & Agents": {
    accentBorder: "group-hover:border-purple-400/60",
    glowColor: "rgba(168, 85, 247, 0.25)",
    badgeColor: "text-purple-300",
    icon: Cpu,
    tagBg: "text-purple-200/80 bg-purple-950/40 border-purple-800/40"
  },
  "Developer Tools": {
    accentBorder: "group-hover:border-lime-400/60",
    glowColor: "rgba(163, 230, 53, 0.25)",
    badgeColor: "text-lime-300",
    icon: Terminal,
    tagBg: "text-lime-200/80 bg-lime-950/40 border-lime-800/40"
  },
  "Productivity & Writing": {
    accentBorder: "group-hover:border-cyan-400/60",
    glowColor: "rgba(34, 211, 238, 0.25)",
    badgeColor: "text-cyan-300",
    icon: FileText,
    tagBg: "text-cyan-200/80 bg-cyan-950/40 border-cyan-800/40"
  },
  "Creative & Media Tools": {
    accentBorder: "group-hover:border-pink-400/60",
    glowColor: "rgba(244, 63, 94, 0.25)",
    badgeColor: "text-pink-300",
    icon: Palette,
    tagBg: "text-pink-200/80 bg-pink-950/40 border-pink-800/40"
  },
  "Social & Content Tools": {
    accentBorder: "group-hover:border-amber-400/60",
    glowColor: "rgba(251, 191, 36, 0.25)",
    badgeColor: "text-amber-300",
    icon: Share2,
    tagBg: "text-amber-200/80 bg-amber-950/40 border-amber-800/40"
  },
  "Other Projects": {
    accentBorder: "group-hover:border-indigo-400/60",
    glowColor: "rgba(129, 140, 248, 0.25)",
    badgeColor: "text-indigo-300",
    icon: Layers,
    tagBg: "text-indigo-200/80 bg-indigo-950/40 border-indigo-800/40"
  }
};

const COMPLEXITY_CONFIG: Record<
  string,
  { label: string; badgeClass: string; dotClass: string }
> = {
  Advanced: {
    label: "Advanced",
    badgeClass: "text-purple-300 bg-purple-950/70 border-purple-500/40",
    dotClass: "bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]"
  },
  Intermediate: {
    label: "Intermediate",
    badgeClass: "text-cyan-300 bg-cyan-950/70 border-cyan-500/40",
    dotClass: "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
  },
  Experimental: {
    label: "Experimental",
    badgeClass: "text-pink-300 bg-pink-950/70 border-pink-500/40",
    dotClass: "bg-pink-400 shadow-[0_0_8px_rgba(244,63,94,0.8)]"
  }
};

export default function ProjectCard({ project, idx = 0 }: ProjectCardProps) {
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
      className={`group relative flex flex-col justify-between h-full rounded-2xl border border-white/10 bg-[#0d071b]/80 backdrop-blur-md p-6 sm:p-7 transition-all duration-300 hover:shadow-xl ${theme.accentBorder} focus-within:ring-2 focus-within:ring-lime-400`}
      style={{
        boxShadow: "0 10px 30px -15px rgba(0,0,0,0.7)"
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
          <div className={`flex items-center gap-1.5 font-mono font-medium tracking-wide ${theme.badgeColor}`}>
            <CategoryIcon size={14} aria-hidden="true" />
            <span>{project.category}</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Complexity Level Badge */}
            {project.complexity && (
              <span
                className={`inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full border ${
                  complexityConfig?.badgeClass || "text-zinc-300 bg-zinc-900 border-zinc-700"
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
              <span className="flex items-center gap-1 text-[11px] font-mono font-semibold text-lime-300 px-2 py-0.5 rounded-full bg-lime-950/60 border border-lime-500/30">
                <Sparkles size={11} aria-hidden="true" /> Featured
              </span>
            )}
          </div>
        </div>

        {/* Project Name */}
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-white transition-colors">
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
        <p className="text-sm text-zinc-300/90 leading-relaxed">
          {project.description}
        </p>

        {/* Verified Technology Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1" aria-label="Technologies used">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[11px] text-zinc-400 bg-white/[0.04] border border-white/5 px-2 py-0.5 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Row & Activity Metadata */}
      <div className="relative z-10 pt-4 mt-4 border-t border-white/5 flex items-center justify-between gap-3">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider uppercase text-white bg-white/10 hover:bg-lime-400 hover:text-black px-4 py-2 rounded-xl transition-all duration-200 group/btn shadow-sm focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:outline-none"
        >
          <span>Live Demo</span>
          <ExternalLink size={14} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" aria-hidden="true" />
        </a>

        {/* Last Updated Timestamp or Dev Origin */}
        {project.lastUpdated ? (
          <div
            className="inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 bg-white/[0.03] border border-white/5 px-2.5 py-1 rounded-lg"
            title={`Last updated: ${project.lastUpdated}`}
          >
            <Clock size={12} className="text-zinc-500" aria-hidden="true" />
            <span>Updated {project.lastUpdated}</span>
          </div>
        ) : (
          <span className="text-[11px] font-mono text-zinc-500">
            sowjith.dev
          </span>
        )}
      </div>
    </motion.article>
  );
}
