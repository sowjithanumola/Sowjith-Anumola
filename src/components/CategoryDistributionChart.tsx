import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";
import { Project, Category, CATEGORIES } from "../constants";
import { BarChart3 } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface CategoryDistributionChartProps {
  projects: Project[];
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

interface CategoryDataPoint {
  name: Category;
  shortName: string;
  count: number;
  percentage: number;
  color: string;
  glow: string;
}

const CATEGORY_COLORS: Record<string, { color: string; glow: string; short: string }> = {
  "AI & Agents": {
    color: "#a3e635", // lime-400
    glow: "rgba(163, 230, 53, 0.4)",
    short: "AI & Agents"
  },
  "Developer Tools": {
    color: "#22d3ee", // cyan-400
    glow: "rgba(34, 211, 238, 0.4)",
    short: "Dev Tools"
  },
  "Productivity & Writing": {
    color: "#c084fc", // purple-400
    glow: "rgba(192, 132, 252, 0.4)",
    short: "Productivity"
  },
  "Creative & Media Tools": {
    color: "#f43f5e", // rose-500 / hot pink
    glow: "rgba(244, 63, 94, 0.4)",
    short: "Media & Audio"
  },
  "Social & Content Tools": {
    color: "#fbbf24", // amber-400
    glow: "rgba(251, 191, 36, 0.4)",
    short: "Social Tools"
  },
  "Other Projects": {
    color: "#38bdf8", // sky-400
    glow: "rgba(56, 189, 248, 0.4)",
    short: "Other"
  }
};

export default function CategoryDistributionChart({
  projects,
  selectedCategory,
  onSelectCategory
}: CategoryDistributionChartProps) {
  const { isDark } = useTheme();

  // Aggregate category counts
  const data: CategoryDataPoint[] = useMemo(() => {
    const rawCategories = CATEGORIES.filter((c) => c !== "All Projects") as Category[];
    const total = projects.length;

    return rawCategories.map((cat) => {
      const count = projects.filter((p) => p.category === cat).length;
      const meta = CATEGORY_COLORS[cat] || {
        color: "#a3e635",
        glow: "rgba(163, 230, 53, 0.4)",
        short: cat
      };

      return {
        name: cat,
        shortName: meta.short,
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0,
        color: meta.color,
        glow: meta.glow
      };
    });
  }, [projects]);

  const maxCategory = useMemo(() => {
    return [...data].sort((a, b) => b.count - a.count)[0];
  }, [data]);

  return (
    <div
      className={`w-full rounded-3xl border backdrop-blur-xl p-5 sm:p-7 shadow-2xl relative overflow-hidden mb-12 transition-colors duration-300 ${
        isDark
          ? "border-white/10 bg-[#0c061a]/80"
          : "border-zinc-200/90 bg-white/95 shadow-md"
      }`}
    >
      {/* Ambient background glows */}
      <div
        className={`pointer-events-none absolute -top-12 -right-12 w-64 h-64 blur-[90px] rounded-full ${
          isDark ? "bg-cyan-500/10" : "bg-cyan-500/5"
        }`}
        aria-hidden="true"
      />
      <div
        className={`pointer-events-none absolute -bottom-12 -left-12 w-64 h-64 blur-[90px] rounded-full ${
          isDark ? "bg-purple-500/10" : "bg-purple-500/5"
        }`}
        aria-hidden="true"
      />

      {/* Header and Summary stats */}
      <div
        className={`flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b relative z-10 ${
          isDark ? "border-white/10" : "border-zinc-200/80"
        }`}
      >
        <div>
          <div
            className={`inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider uppercase mb-1.5 ${
              isDark ? "text-lime-400" : "text-lime-700 font-bold"
            }`}
          >
            <BarChart3 size={15} aria-hidden="true" />
            <span>Technical Breadth & Distribution</span>
          </div>
          <h3
            className={`text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2 ${
              isDark ? "text-white" : "text-zinc-900"
            }`}
          >
            Project Architecture Across Domains
          </h3>
          <p
            className={`text-xs sm:text-sm mt-1 max-w-xl ${
              isDark ? "text-zinc-400" : "text-zinc-600"
            }`}
          >
            Breakdown of {projects.length} shipped solo projects across AI, systems, creative tooling, and productivity. Click any bar to instantly filter the gallery.
          </p>
        </div>

        {/* Quick summary badges */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs font-mono">
          <div
            className={`px-3 py-1.5 rounded-xl border ${
              isDark
                ? "bg-white/[0.04] border-white/10 text-zinc-300"
                : "bg-zinc-100 border-zinc-200 text-zinc-800"
            }`}
          >
            <span className={isDark ? "text-zinc-500 mr-1.5" : "text-zinc-500 mr-1.5"}>Total:</span>
            <span className={`font-bold ${isDark ? "text-white" : "text-zinc-950"}`}>
              {projects.length} Shipped
            </span>
          </div>
          <div
            className={`px-3 py-1.5 rounded-xl border ${
              isDark
                ? "bg-white/[0.04] border-white/10 text-zinc-300"
                : "bg-zinc-100 border-zinc-200 text-zinc-800"
            }`}
          >
            <span className={isDark ? "text-zinc-500 mr-1.5" : "text-zinc-500 mr-1.5"}>Domains:</span>
            <span className={`font-bold ${isDark ? "text-cyan-300" : "text-cyan-700"}`}>
              {data.length} Categories
            </span>
          </div>
          {maxCategory && (
            <div
              className={`px-3 py-1.5 rounded-xl border ${
                isDark
                  ? "bg-lime-950/60 border-lime-500/30 text-lime-300"
                  : "bg-lime-100 border-lime-300 text-lime-900"
              }`}
            >
              <span className={isDark ? "text-lime-500/80 mr-1.5" : "text-lime-700 mr-1.5"}>Top Domain:</span>
              <span className="font-bold">{maxCategory.shortName} ({maxCategory.count})</span>
            </div>
          )}
        </div>
      </div>

      {/* Recharts Bar Chart Container */}
      <div className="pt-6 pb-2 relative z-10">
        <div className="h-64 sm:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 15, right: 10, left: -20, bottom: 25 }}
              onClick={(state: any) => {
                if (state && state.activePayload && state.activePayload.length > 0) {
                  const clickedCat = state.activePayload[0].payload.name as Category;
                  onSelectCategory(clickedCat);
                }
              }}
            >
              <XAxis
                dataKey="shortName"
                stroke={isDark ? "#71717a" : "#94a3b8"}
                tick={{ fill: isDark ? "#a1a1aa" : "#475569", fontSize: 11, fontFamily: "monospace" }}
                interval={0}
                tickLine={false}
                axisLine={{ stroke: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }}
                dy={8}
              />
              <YAxis
                allowDecimals={false}
                stroke={isDark ? "#71717a" : "#94a3b8"}
                tick={{ fill: isDark ? "#71717a" : "#64748b", fontSize: 11, fontFamily: "monospace" }}
                tickLine={false}
                axisLine={{ stroke: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }}
              />
              <Tooltip
                cursor={{ fill: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)", radius: 8 }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload as CategoryDataPoint;
                    const isSelected = selectedCategory === item.name;
                    return (
                      <div
                        className={`border backdrop-blur-xl p-3.5 rounded-2xl shadow-2xl font-mono text-xs max-w-xs pointer-events-none ${
                          isDark
                            ? "bg-[#0b0517]/95 border-white/20 text-white"
                            : "bg-white/95 border-zinc-200 text-zinc-900 shadow-xl"
                        }`}
                      >
                        <div
                          className={`flex items-center justify-between gap-3 mb-1.5 pb-1.5 border-b ${
                            isDark ? "border-white/10" : "border-zinc-200"
                          }`}
                        >
                          <span className={`font-bold text-sm ${isDark ? "text-white" : "text-zinc-950"}`}>
                            {item.name}
                          </span>
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                        </div>
                        <div
                          className={`flex items-center justify-between gap-4 ${
                            isDark ? "text-zinc-300" : "text-zinc-700"
                          }`}
                        >
                          <span>Projects:</span>
                          <span className={`font-bold ${isDark ? "text-white" : "text-zinc-950"}`}>
                            {item.count} ({item.percentage}%)
                          </span>
                        </div>
                        <div
                          className={`text-[10px] mt-2 pt-1.5 border-t flex items-center justify-between ${
                            isDark ? "border-white/5 text-zinc-400" : "border-zinc-100 text-zinc-500"
                          }`}
                        >
                          <span>{isSelected ? "Currently Active Filter" : "Click bar to view all"}</span>
                          <span className="text-lime-500 font-semibold">Filter →</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="count"
                radius={[8, 8, 0, 0]}
                className="cursor-pointer transition-all duration-300"
              >
                {data.map((entry) => {
                  const isSelected = selectedCategory === entry.name;
                  const isAll = selectedCategory === "All Projects";
                  const opacity = isAll || isSelected ? 1 : 0.45;

                  return (
                    <Cell
                      key={`cell-${entry.name}`}
                      fill={entry.color}
                      fillOpacity={opacity}
                      stroke={isSelected ? (isDark ? "#ffffff" : "#0f172a") : entry.color}
                      strokeWidth={isSelected ? 2 : 0}
                      style={{
                        filter: isSelected
                          ? `drop-shadow(0 0 12px ${entry.glow})`
                          : undefined
                      }}
                    />
                  );
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend / Interactive Filter Pills */}
        <div
          className={`flex flex-wrap items-center justify-center gap-2 pt-2 border-t text-[11px] font-mono ${
            isDark ? "border-white/5" : "border-zinc-200/80"
          }`}
        >
          <span className="text-zinc-500 text-[10px] uppercase tracking-wider mr-1">Quick Select:</span>
          {data.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => onSelectCategory(cat.name)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all ${
                  isSelected
                    ? isDark
                      ? "bg-white/15 text-white border-white/30 shadow-sm"
                      : "bg-zinc-900 text-white border-zinc-900 shadow-sm"
                    : isDark
                      ? "bg-white/[0.02] text-zinc-400 border-white/5 hover:border-white/15 hover:text-zinc-200"
                      : "bg-zinc-100 text-zinc-600 border-zinc-200 hover:border-zinc-300 hover:text-zinc-900"
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: cat.color }}
                />
                <span>{cat.shortName}</span>
                <span className={isDark ? "text-zinc-500 font-bold" : "text-zinc-500 font-bold"}>
                  ({cat.count})
                </span>
              </button>
            );
          })}
          {selectedCategory !== "All Projects" && (
            <button
              onClick={() => onSelectCategory("All Projects")}
              className={`font-semibold underline underline-offset-2 ml-1 ${
                isDark ? "text-lime-400 hover:text-lime-300" : "text-lime-700 hover:text-lime-800"
              }`}
            >
              Reset to All
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
