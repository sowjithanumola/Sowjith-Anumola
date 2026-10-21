/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from "motion/react";
import {
  Github,
  Mail,
  Phone,
  Instagram,
  AtSign,
  MessageSquare,
  Link as LinkIcon,
  ExternalLink,
  Sparkles,
  Terminal,
  Code2,
  Cpu,
  Layers,
  Search,
  X,
  Menu,
  ArrowUpRight,
  ChevronRight,
  Calendar,
  Cake,
  Twitter,
  ChevronDown,
  UserCheck
} from "lucide-react";
const avatarImg = "/sowjith-avatar.jpg";
import { PROJECTS, CATEGORIES, Category, SKILLS_DATA, Project } from "./constants";
import ProjectCard from "./components/ProjectCard";
import AudioPlayer from "./components/AudioPlayer";
import CategoryDistributionChart from "./components/CategoryDistributionChart";
import InteractiveMascot from "./components/InteractiveMascot";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All Projects");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedDiscord, setCopiedDiscord] = useState(false);
  // Navbar brand name reveal on scroll
  const { scrollY } = useScroll();
  const headerNameOpacity = useTransform(scrollY, [140, 260], [0, 1]);

  // Big animated photo scroll transforms:
  // Initial state: photo is big and prominent ("make the inamge to bigh")
  // Scroll down: photo smoothly scales down and fades away ("image goies")
  const bigImageOpacity = useTransform(scrollY, [0, 140, 240], [1, 0.35, 0]);
  const bigImageScale = useTransform(scrollY, [0, 240], [1, 0.72]);
  const bigImageY = useTransform(scrollY, [0, 240], [0, -35]);

  // Name and identity reveal as user scrolls down ("my name comes")
  const nameOpacity = useTransform(scrollY, [0, 80, 200], [0.35, 0.75, 1]);
  const nameY = useTransform(scrollY, [0, 200], [25, 0]);


  // Filtered projects
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      const matchesCategory =
        selectedCategory === "All Projects" || project.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        project.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tags.some((t) => t.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Featured flagship projects
  const featuredProjects = useMemo(() => {
    return PROJECTS.filter((p) => p.featured);
  }, []);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { "All Projects": PROJECTS.length };
    PROJECTS.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  const copyDiscordUsername = async () => {
    try {
      await navigator.clipboard.writeText("i.am.sowjith");
      setCopiedDiscord(true);
      setTimeout(() => setCopiedDiscord(false), 2500);
    } catch {
      alert("My Discord username is: i.am.sowjith");
    }
  };

  return (
    <div className="min-h-screen funky-canvas text-zinc-100 font-sans relative selection:bg-lime-400 selection:text-black">
      {/* Subtle Grain & Ambient Glow Blobs */}
      <div className="grain-overlay" aria-hidden="true" />
      <div className="fixed inset-0 funky-grid pointer-events-none z-0 opacity-40" aria-hidden="true" />

      {/* Floating Ambient Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="ambient-blob bg-purple-600 w-[55vw] h-[55vw] -top-20 -left-20" />
        <div className="ambient-blob bg-pink-600 w-[45vw] h-[45vw] top-1/3 -right-20" style={{ animationDelay: "-8s" }} />
        <div className="ambient-blob bg-cyan-600 w-[40vw] h-[40vw] bottom-10 left-1/4" style={{ animationDelay: "-16s" }} />
        <div className="ambient-blob bg-lime-500 w-[30vw] h-[30vw] bottom-0 -right-10 opacity-10" />
      </div>

      {/* Persistent Audio Player */}
      <AudioPlayer src="https://fair-black-hwo6ylmg.edgeone.dev/Sowjith%20Anthem.mp3" />

      {/* Top Bar Navigation (Strict 3-zone contract) */}
      <header className="fixed top-0 left-0 w-full z-40 bg-[#07020e]/80 backdrop-blur-xl border-b border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark & Scroll Revealed Name */}
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded-lg p-1"
            >
              <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-lime-400 p-[1.5px] inline-flex items-center justify-center">
                <span className="w-full h-full bg-[#0a0314] rounded-[6.5px] flex items-center justify-center text-xs font-mono font-bold text-lime-400 group-hover:bg-lime-400 group-hover:text-black transition-colors">
                  S
                </span>
              </span>
              <span className="font-mono tracking-tighter text-white group-hover:text-lime-300 transition-colors">
                SOWJITH<span className="text-lime-400">.</span>
              </span>
            </a>

            {/* Revealed full identity badge on scroll */}
            <motion.div
              style={{ opacity: headerNameOpacity }}
              className="hidden lg:flex items-center gap-2 pl-3 border-l border-white/10 text-xs font-mono"
            >
              <span className="text-lime-300 font-bold tracking-tight">SOWJITH ANUMOLA</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-400">Solo Coder</span>
            </motion.div>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-mono font-semibold uppercase tracking-widest text-zinc-400">
            <a
              href="#featured"
              className="hover:text-white hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded px-1"
            >
              Featured
            </a>
            <a
              href="#projects"
              className="hover:text-white hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded px-1"
            >
              Projects ({PROJECTS.length})
            </a>
            <a
              href="#about"
              className="hover:text-white hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded px-1"
            >
              About
            </a>
            <a
              href="#skills"
              className="hover:text-white hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded px-1"
            >
              Skills
            </a>
            <a
              href="#contact"
              className="hover:text-white hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded px-1"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: Primary Action & Mobile Menu Toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider text-black bg-lime-400 hover:bg-lime-300 rounded-xl transition-all shadow-[0_0_20px_rgba(163,230,53,0.3)] hover:shadow-[0_0_25px_rgba(163,230,53,0.5)] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Let's Connect</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-300 hover:text-white rounded-lg border border-white/10 hover:border-lime-400/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/10 bg-[#0a0316]/95 backdrop-blur-2xl px-6 py-6 flex flex-col gap-4 overflow-hidden"
            >
              <a
                href="#featured"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-mono font-medium text-zinc-300 hover:text-lime-300 py-1.5"
              >
                Featured Work
              </a>
              <a
                href="#projects"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-mono font-medium text-zinc-300 hover:text-lime-300 py-1.5"
              >
                All Projects ({PROJECTS.length})
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-mono font-medium text-zinc-300 hover:text-lime-300 py-1.5"
              >
                About Sowjith
              </a>
              <a
                href="#skills"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-mono font-medium text-zinc-300 hover:text-lime-300 py-1.5"
              >
                Skills & Tech
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-mono font-medium text-zinc-300 hover:text-lime-300 py-1.5"
              >
                Contact & Links
              </a>
              <div className="pt-2">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-black bg-lime-400 rounded-xl block"
                >
                  Get in Touch
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-32 sm:pt-40 pb-24 px-6 max-w-7xl mx-auto">
        {/* HERO SECTION */}
        <section
          id="hero"
          className="mb-24 sm:mb-32 pt-2 sm:pt-6 flex flex-col items-center text-center relative"
        >
          {/* Big Animated Photo Stage */}
          {/* "make the inamge to bigh and when the user scrool down the image goies and my name comes" */}
          {/* "add the animated photo but dont keep anything" */}
          <motion.div
            style={{
              opacity: bigImageOpacity,
              scale: bigImageScale,
              y: bigImageY,
            }}
            className="flex flex-col items-center justify-center mb-10 relative z-20"
          >
            <div
              className="relative group cursor-pointer"
              onClick={() => window.scrollTo({ top: 340, behavior: "smooth" })}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  window.scrollTo({ top: 340, behavior: "smooth" });
                }
              }}
              aria-label="Scroll to portfolio details"
            >
              {/* Subtle ambient lighting halo */}
              <div
                className="absolute -inset-4 sm:-inset-6 rounded-[2.8rem] bg-gradient-to-tr from-orange-600/35 via-amber-500/25 to-purple-600/30 blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                aria-hidden="true"
              />

              {/* The clean animated photo container - SRH Sunrisers Hyderabad Jacket */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-[2.2rem] overflow-hidden border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)] bg-zinc-900/80 transition-transform duration-300 group-hover:scale-[1.02]">
                <img
                  src={avatarImg}
                  alt="Sowjith Anumola - 3D Avatar in SRH Sunrisers Hyderabad Jacket"
                  className="w-full h-full object-cover object-center select-none"
                  loading="eager"
                  draggable={false}
                />
              </div>
            </div>

            {/* Subtle scroll-to-explore indicator */}
            <button
              onClick={() => window.scrollTo({ top: 340, behavior: "smooth" })}
              className="mt-5 flex flex-col items-center gap-1 text-zinc-400 hover:text-white transition-colors cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded-full py-1.5 px-3"
              aria-label="Scroll down to reveal profile"
            >
              <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-400 group-hover:text-lime-300 transition-colors">
                Scroll to explore ↓
              </span>
              <ChevronDown size={14} className="text-lime-400 animate-bounce" />
            </button>
          </motion.div>

          {/* Name & Identity Section - reveals smoothly as user scrolls ("my name comes") */}
          <motion.div
            style={{
              opacity: nameOpacity,
              y: nameY,
            }}
            className="flex flex-col items-center text-center w-full"
          >
            {/* Identity Kicker Badge */}
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/40 bg-purple-950/40 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.2)] text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-ping" aria-hidden="true" />
              <span className="text-zinc-300">Identity:</span>
              <span className="text-lime-300 font-bold">"Sowjith, solo coder."</span>
              <span className="text-zinc-500 hidden sm:inline" aria-hidden="true">·</span>
              <span className="text-zinc-400 hidden sm:inline">Age 13 · India</span>
            </div>

            {/* Main Oversized Typography Heading: SOWJITH ANUMOLA */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.92] text-white mb-6">
              SOWJITH <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-lime-300 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                ANUMOLA
              </span>
            </h1>

            {/* Concise Headline */}
            <p className="text-lg sm:text-xl md:text-2xl text-zinc-300 max-w-3xl font-medium leading-relaxed mb-8">
              A young developer building AI tools, smart web applications, productivity software, and creative digital products that simplify your digital life.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 bg-lime-400 hover:bg-lime-300 text-black px-8 py-4 rounded-2xl text-xs sm:text-sm font-mono font-bold tracking-wider uppercase transition-all shadow-[0_0_30px_rgba(163,230,53,0.35)] hover:shadow-[0_0_40px_rgba(163,230,53,0.55)] hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Explore Projects ({PROJECTS.length})</span>
                <ChevronRight size={16} aria-hidden="true" />
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/15 px-8 py-4 rounded-2xl text-xs sm:text-sm font-mono font-semibold tracking-wider uppercase transition-all hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
              >
                <span>About Me</span>
              </a>
              <a
                href="https://github.com/sowjithanumola"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/15 px-5 py-4 rounded-2xl text-xs font-mono transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
                aria-label="GitHub Profile"
              >
                <Github size={18} aria-hidden="true" />
                <span>@sowjithanumola</span>
              </a>
            </div>

            {/* Developer Terminal Card Column */}
            <div className="w-full max-w-3xl mx-auto rounded-3xl border border-white/15 bg-[#0e0720]/90 backdrop-blur-xl p-5 sm:p-7 text-left shadow-2xl relative overflow-hidden">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-orange-500/20 blur-xl opacity-40 pointer-events-none" aria-hidden="true" />
              
              <div className="relative z-10 flex flex-col justify-between h-full">
                {/* Terminal Window Header */}
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                      <span className="ml-2 font-mono text-xs text-zinc-400">sowjith@solo-coder: ~</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-[11px] text-lime-400 bg-lime-950/60 border border-lime-500/30 px-2.5 py-0.5 rounded-full">
                      <Sparkles size={11} aria-hidden="true" />
                      <span>{PROJECTS.length} Shipped Live</span>
                    </div>
                  </div>

                  {/* Code / Command Prompt Snippet */}
                  <div className="font-mono text-xs sm:text-sm space-y-2 leading-relaxed">
                    <p className="text-zinc-400">
                      <span className="text-purple-400">$</span> cat profile.json
                    </p>
                    <div className="text-zinc-300 pl-3.5 border-l border-purple-500/40 py-1.5 space-y-1.5 text-xs">
                      <p>
                        <span className="text-cyan-300">"developer"</span>: <span className="text-lime-300">"Sowjith Anumola"</span>,
                      </p>
                      <p>
                        <span className="text-cyan-300">"dateOfBirth"</span>: <span className="text-amber-300">"March 12, 2013"</span>,
                      </p>
                      <p>
                        <span className="text-cyan-300">"age"</span>: <span className="text-orange-300">13</span>,
                      </p>
                      <p>
                        <span className="text-cyan-300">"role"</span>: <span className="text-pink-300">"Solo Coder & Builder"</span>,
                      </p>
                      <p>
                        <span className="text-cyan-300">"startedCoding"</span>: <span className="text-emerald-300">"Age 10 (2023)"</span>,
                      </p>
                      <p>
                        <span className="text-cyan-300">"focus"</span>: [<span className="text-amber-300">"AI Agents"</span>, <span className="text-amber-300">"WebOS"</span>, <span className="text-amber-300">"DAWs"</span>],
                      </p>
                      <p>
                        <span className="text-cyan-300">"mission"</span>: <span className="text-zinc-400">"Building clean digital tools independently."</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 mt-4 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                    <span className="flex items-center gap-1.5 text-lime-400">
                      <Cake size={13} aria-hidden="true" />
                      <span>Born: March 12, 2013</span>
                    </span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-ping" />
                      Online & Active
                    </span>
                  </div>
                  <p className="text-zinc-500 text-[11px] font-mono leading-tight">
                    // Explore {PROJECTS.length} live projects below categorized with interactive distribution analytics.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* FEATURED FLAGSHIP SPOTLIGHT (WebOS, ECHOROOM, OpenCut, Focus Mate) */}
        <section id="featured" className="mb-32">
          <div className="flex flex-col items-center text-center mb-14">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-widest text-lime-400 uppercase mb-3">
              <Sparkles size={14} aria-hidden="true" />
              <span>Flagship Creations</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
              FEATURED PROJECTS
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-xl">
              Highlights of ambitious software: a browser OS, web audio DAW, multi-layer video studio, and productivity focus companion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {featuredProjects.map((project, idx) => (
              <ProjectCard key={project.name} project={project} idx={idx} />
            ))}
          </div>
        </section>

        {/* MAIN ALL PROJECTS SECTION WITH INTERACTIVE FILTERS */}
        <section id="projects" className="mb-36">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-widest text-cyan-400 uppercase mb-3">
              <Code2 size={14} aria-hidden="true" />
              <span>Complete Directory</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-4">
              PROJECT GALLERY
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl">
              All {PROJECTS.length} web applications, AI utilities, games, and creative experiments built by Sowjith Anumola.
            </p>
          </div>

          {/* Recharts Bar Chart: Distribution Across Categories */}
          <CategoryDistributionChart
            projects={PROJECTS}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* Interactive Category Filter Bar */}
          <div className="mb-8 space-y-4">
            {/* Search + Clear Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" aria-hidden="true" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${PROJECTS.length} projects...`}
                  className="w-full bg-[#0d071d]/90 border border-white/10 rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors"
                  aria-label="Search projects by keyword"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1"
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Dynamic Live Counter */}
              <div className="text-xs font-mono text-zinc-400 whitespace-nowrap self-end sm:self-center">
                Showing <span className="font-bold text-lime-300">{filteredProjects.length}</span> of {PROJECTS.length} projects
              </div>
            </div>

            {/* Filter Buttons Segmented Strip */}
            <div
              role="tablist"
              aria-label="Project categories"
              className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-1"
            >
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                const count = categoryCounts[cat] || 0;

                return (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedCategory(cat)}
                    className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 ${
                      isSelected
                        ? "bg-lime-400 text-black font-bold shadow-[0_0_18px_rgba(163,230,53,0.35)]"
                        : "bg-white/[0.04] text-zinc-300 hover:bg-white/[0.09] hover:text-white border border-white/10"
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`ml-1.5 text-[10px] px-1.5 py-0.2 rounded-full ${
                        isSelected ? "bg-black/20 text-black font-bold" : "bg-white/10 text-zinc-400"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Project Cards Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProjects.map((project, idx) => (
                <ProjectCard key={project.name} project={project} idx={idx} />
              ))}
            </div>
          ) : (
            /* Friendly Empty State */
            <div className="rounded-2xl border border-white/10 bg-[#0d071c]/60 p-12 text-center">
              <p className="text-lg font-bold text-white mb-2">No projects found</p>
              <p className="text-sm text-zinc-400 mb-6 max-w-md mx-auto">
                No projects matched "{searchQuery}" in category "{selectedCategory}".
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Projects");
                }}
                className="px-5 py-2 text-xs font-mono font-semibold uppercase text-black bg-lime-400 hover:bg-lime-300 rounded-xl transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>

        {/* ABOUT SECTION (Authentic, no exaggeration, young developer from India) */}
        <section
          id="about"
          className="mb-32 rounded-3xl border border-white/10 bg-[#0e071e]/70 backdrop-blur-xl p-8 sm:p-14 relative overflow-hidden"
        >
          {/* Subtle Accent Glows */}
          <div className="pointer-events-none absolute top-0 right-0 w-80 h-80 bg-purple-600/10 blur-[100px] rounded-full" aria-hidden="true" />
          <div className="pointer-events-none absolute bottom-0 left-0 w-80 h-80 bg-lime-500/10 blur-[100px] rounded-full" aria-hidden="true" />

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="text-center mb-10">
              <span className="text-xs font-mono uppercase tracking-widest text-lime-400 font-semibold mb-2 block">
                The Solo Coder
              </span>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                ABOUT SOWJITH
              </h2>
            </div>

            <div className="space-y-6 text-zinc-300 text-base sm:text-lg leading-relaxed font-normal">
              <p>
                Hi, I'm <strong className="text-white font-semibold">Sowjith Anumola</strong>. I was born on <strong className="text-amber-300 font-semibold">March 12, 2013</strong>, and I'm a 13-year-old solo developer from India who started coding at age 10. I am passionate about building modern web applications, AI-powered tools, productivity software, and experimental digital products.
              </p>
              <p>
                From an early age, I was endlessly curious about how software and interactive systems operate under the hood. Since starting my journey in 2023 at age 10, that curiosity led me to explore frontend architectures, artificial intelligence APIs, audio processing, and creative coding. Over the past three years, I've designed, built, and shipped over {PROJECTS.length} live web applications.
              </p>
              <p>
                I operate under the philosophy of <strong className="text-lime-300 font-mono font-semibold">"Sowjith, solo coder"</strong>—taking projects from inception, UI design, and TypeScript implementation all the way to cloud deployment on Vercel. Every application teaches me something new and pushes my technical abilities forward.
              </p>
            </div>

            {/* Quick Biographical Snapshot Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-white/10 font-mono text-left">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center gap-1.5 text-xs text-amber-400 mb-1">
                  <Cake size={14} aria-hidden="true" />
                  <span>Date of Birth</span>
                </div>
                <div className="text-base font-bold text-white">March 12, 2013</div>
                <div className="text-[11px] text-zinc-400 mt-0.5">13 Years Old</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center gap-1.5 text-xs text-lime-400 mb-1">
                  <Code2 size={14} aria-hidden="true" />
                  <span>Coding Since</span>
                </div>
                <div className="text-base font-bold text-white">Age 10</div>
                <div className="text-[11px] text-zinc-400 mt-0.5">Started in 2023</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center gap-1.5 text-xs text-cyan-400 mb-1">
                  <Sparkles size={14} aria-hidden="true" />
                  <span>Applications</span>
                </div>
                <div className="text-base font-bold text-white">{PROJECTS.length} Shipped</div>
                <div className="text-[11px] text-zinc-400 mt-0.5">100% Solo Built</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center gap-1.5 text-xs text-pink-400 mb-1">
                  <UserCheck size={14} aria-hidden="true" />
                  <span>Identity</span>
                </div>
                <div className="text-base font-bold text-white">Solo Coder</div>
                <div className="text-[11px] text-zinc-400 mt-0.5">Builder & Maker</div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION (Grouped as requested) */}
        <section id="skills" className="mb-36">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-widest text-pink-400 uppercase mb-3">
              <Terminal size={14} aria-hidden="true" />
              <span>Technical Stack</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
              SKILLS & CAPABILITIES
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto">
              Verified technologies and modern tools used across my applications.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SKILLS_DATA.map((skillGroup) => (
              <div
                key={skillGroup.category}
                className="rounded-2xl border border-white/10 bg-[#0d071c]/70 backdrop-blur-md p-6 flex flex-col justify-between hover:border-white/20 transition-all"
              >
                <div>
                  <h3 className="text-base font-bold text-white mb-4 pb-2 border-b border-white/10">
                    {skillGroup.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono text-zinc-300 bg-white/[0.04] border border-white/5 px-2.5 py-1 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT & STAY CONNECTED (No physical address displayed) */}
        <section id="contact" className="border-t border-white/10 pt-24 pb-12">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-widest text-lime-400 uppercase mb-3">
              <Sparkles size={14} aria-hidden="true" />
              <span>Get In Touch</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-4">
              STAY CONNECTED
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-lg mx-auto">
              Have a project inquiry, collaboration idea, or want to say hello? Reach out directly.
            </p>
          </div>

          {/* Contact Cards Grid (Direct links, verified info, NO address) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto mb-16">
            {/* Email */}
            <a
              href="mailto:sowjith.anumola@gmail.com"
              className="group bg-[#0d071c]/80 border border-white/10 hover:border-lime-400/60 p-6 rounded-2xl flex items-center gap-4 transition-all duration-300 hover:shadow-[0_0_25px_rgba(163,230,53,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
            >
              <div className="p-3 rounded-xl bg-lime-950/60 border border-lime-500/30 text-lime-400 group-hover:scale-110 transition-transform">
                <Mail size={22} aria-hidden="true" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Email Directly</span>
                <span className="font-semibold text-white text-sm truncate group-hover:text-lime-300 transition-colors">
                  sowjith.anumola@gmail.com
                </span>
              </div>
            </a>

            {/* Phone */}
            <a
              href="tel:+919381259371"
              className="group bg-[#0d071c]/80 border border-white/10 hover:border-cyan-400/60 p-6 rounded-2xl flex items-center gap-4 transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 group-hover:scale-110 transition-transform">
                <Phone size={22} aria-hidden="true" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Phone Call</span>
                <span className="font-semibold text-white text-sm truncate group-hover:text-cyan-300 transition-colors">
                  +91 93812 59371
                </span>
              </div>
            </a>

            {/* Twitter / X */}
            <a
              href="https://x.com/iamsowjith"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#0d071c]/80 border border-white/10 hover:border-sky-400/60 p-6 rounded-2xl flex items-center gap-4 transition-all duration-300 hover:shadow-[0_0_25px_rgba(56,189,248,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <div className="p-3 rounded-xl bg-sky-950/60 border border-sky-500/30 text-sky-400 group-hover:scale-110 transition-transform">
                <Twitter size={22} aria-hidden="true" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Twitter / X</span>
                <span className="font-semibold text-white text-sm truncate group-hover:text-sky-300 transition-colors">
                  @iamsowjith
                </span>
              </div>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/sowjithanumola"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#0d071c]/80 border border-white/10 hover:border-purple-400/60 p-6 rounded-2xl flex items-center gap-4 transition-all duration-300 hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            >
              <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-400 group-hover:scale-110 transition-transform">
                <Github size={22} aria-hidden="true" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Open Source</span>
                <span className="font-semibold text-white text-sm truncate group-hover:text-purple-300 transition-colors">
                  @sowjithanumola
                </span>
              </div>
            </a>

            {/* Discord Click-to-Copy */}
            <button
              onClick={copyDiscordUsername}
              className="group bg-[#0d071c]/80 border border-white/10 hover:border-pink-400/60 p-6 rounded-2xl flex items-center gap-4 transition-all duration-300 hover:shadow-[0_0_25px_rgba(244,63,94,0.15)] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
              aria-label="Copy Discord username"
            >
              <div className="p-3 rounded-xl bg-pink-950/60 border border-pink-500/30 text-pink-400 group-hover:scale-110 transition-transform">
                <MessageSquare size={22} aria-hidden="true" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
                  {copiedDiscord ? "Copied to clipboard!" : "Discord (Click to copy)"}
                </span>
                <span className="font-semibold text-white text-sm truncate group-hover:text-pink-300 transition-colors">
                  i.am.sowjith
                </span>
              </div>
            </button>

            {/* Threads */}
            <a
              href="https://www.threads.com/@i.am.sowjith"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#0d071c]/80 border border-white/10 hover:border-lime-400/60 p-6 rounded-2xl flex items-center gap-4 transition-all duration-300 hover:shadow-[0_0_25px_rgba(163,230,53,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
            >
              <div className="p-3 rounded-xl bg-lime-950/60 border border-lime-500/30 text-lime-400 group-hover:scale-110 transition-transform">
                <AtSign size={22} aria-hidden="true" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Threads</span>
                <span className="font-semibold text-white text-sm truncate group-hover:text-lime-300 transition-colors">
                  @i.am.sowjith
                </span>
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/i.am.sowjith"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#0d071c]/80 border border-white/10 hover:border-pink-400/60 p-6 rounded-2xl flex items-center gap-4 transition-all duration-300 hover:shadow-[0_0_25px_rgba(244,63,94,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
            >
              <div className="p-3 rounded-xl bg-pink-950/60 border border-pink-500/30 text-pink-400 group-hover:scale-110 transition-transform">
                <Instagram size={22} aria-hidden="true" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Instagram</span>
                <span className="font-semibold text-white text-sm truncate group-hover:text-pink-300 transition-colors">
                  @i.am.sowjith
                </span>
              </div>
            </a>

            {/* Reddit */}
            <a
              href="https://www.reddit.com/user/i-am-sowjith/"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#0d071c]/80 border border-white/10 hover:border-amber-400/60 p-6 rounded-2xl flex items-center gap-4 transition-all duration-300 hover:shadow-[0_0_25px_rgba(251,191,36,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-400 group-hover:scale-110 transition-transform">
                <LinkIcon size={22} aria-hidden="true" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Reddit</span>
                <span className="font-semibold text-white text-sm truncate group-hover:text-amber-300 transition-colors">
                  @i-am-sowjith
                </span>
              </div>
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 px-6 text-center text-xs font-mono text-zinc-500 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">Sowjith Anumola</span>
            <span>·</span>
            <span className="text-lime-400">"Sowjith, solo coder."</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-400">
            <a
              href="https://x.com/iamsowjith"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition-colors flex items-center gap-1.5"
            >
              <Twitter size={13} className="text-sky-400" />
              <span>Twitter</span>
            </a>
            <a
              href="https://github.com/sowjithanumola"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Github size={13} />
              <span>GitHub</span>
            </a>
            <span className="text-zinc-600">·</span>
            <a href="#hero" className="hover:text-white transition-colors">Back to top ↑</a>
          </div>
        </div>
      </footer>

      {/* Interactive Draggable Mascot Bot */}
      <InteractiveMascot />
    </div>
  );
}


