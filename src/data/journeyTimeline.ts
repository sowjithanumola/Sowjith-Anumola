/**
 * @file journeyTimeline.ts
 * Editable dataset for Sowjith's "My Journey" timeline.
 * All milestone texts, tags, badges, and headline copy can be edited here.
 */

export interface JourneyMilestone {
  id: string;
  stepNumber: number;
  stageTitle: string; // e.g. "AGE 9 — THE BEGINNING"
  subtitle: string;
  ageHighlight?: string; // e.g. "Age 9"
  description: string;
  keyTakeaway: string;
  iconType: "sparkles" | "compass" | "code" | "cpu" | "layers" | "music";
  accentGlow: "violet" | "cyan" | "electric-blue" | "purple";
  tags: string[];
  isSpecialHighlight?: boolean;
}

export interface JourneyMeta {
  headline: string;
  supportingText: string;
  ageCounterHighlight: {
    startAge: number;
    currentAge: number;
    yearsOfCuriosity: number;
    projectsCount: number;
    philosophy: string;
  };
  conclusion: {
    title: string;
    description: string;
    quote: string;
  };
}

export const JOURNEY_META: JourneyMeta = {
  headline: "Every creation has a beginning.",
  supportingText: "My journey started at 9. The curiosity never stopped.",
  ageCounterHighlight: {
    startAge: 9,
    currentAge: 13,
    yearsOfCuriosity: 4,
    projectsCount: 33,
    philosophy: "Learning by building · 100% solo coded"
  },
  conclusion: {
    title: "This is only the beginning.",
    description:
      "From writing my very first line of code at age 9 to architecting 33+ live applications and music-infused experiences like KeyFlow, every project has been a stepping stone. The curiosity is stronger than ever.",
    quote: "Code is my instrument. The web is the stage."
  }
};

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    id: "milestone-age-9",
    stepNumber: 1,
    stageTitle: "AGE 9 — THE BEGINNING",
    subtitle: "Ignition of Curiosity",
    ageHighlight: "Age 9",
    description:
      "Started my coding journey at age 9. My curiosity about technology and computers inspired me to explore programming and experiment with creating things.",
    keyTakeaway: "Discovered the magic of instructing a machine to turn imagination into interactive pixels.",
    iconType: "sparkles",
    accentGlow: "electric-blue",
    tags: ["First Steps", "Curiosity", "Logic & Basics", "Discovery"],
    isSpecialHighlight: true
  },
  {
    id: "milestone-exploration",
    stepNumber: 2,
    stageTitle: "EXPLORATION — LEARNING BY BUILDING",
    subtitle: "Hands-on Experimentation",
    ageHighlight: "Exploration",
    description:
      "Started exploring different technologies, experimenting with ideas, learning through mistakes and developing my coding skills.",
    keyTakeaway: "Embraced trial and error as the fastest mentor. Every bug solved unlocked a deeper skill.",
    iconType: "compass",
    accentGlow: "violet",
    tags: ["Experimentation", "HTML & CSS", "JavaScript", "Problem Solving"]
  },
  {
    id: "milestone-first-projects",
    stepNumber: 3,
    stageTitle: "FIRST PROJECTS — TURNING IDEAS INTO REALITY",
    subtitle: "From Theory to Utility",
    ageHighlight: "First Tools",
    description:
      "Began creating my own websites and digital tools. Learned how to turn ideas into functional projects.",
    keyTakeaway: "Building software that people can actually click, test, and find useful changed everything.",
    iconType: "code",
    accentGlow: "cyan",
    tags: ["Web Tools", "Interactive UI", "DOM Manipulation", "Self-Made Utility"]
  },
  {
    id: "milestone-ai-era",
    stepNumber: 4,
    stageTitle: "AI ERA — EXPLORING ARTIFICIAL INTELLIGENCE",
    subtitle: "Intelligent Interfaces",
    ageHighlight: "Next Horizon",
    description:
      "Started experimenting with AI-powered tools, creative applications and intelligent experiences.",
    keyTakeaway: "Integrated LLM prompts, real-time emotion recognition, vision models, and cognitive assistants.",
    iconType: "cpu",
    accentGlow: "purple",
    tags: ["Generative AI", "NLP Engines", "Intelligent UX", "Prompt Engineering"]
  },
  {
    id: "milestone-solo-coder",
    stepNumber: 5,
    stageTitle: "SOLO CODER — BUILDING MY OWN PROJECTS",
    subtitle: "Full Lifecycle Independence",
    ageHighlight: "Solo Builder",
    description:
      "Started developing a growing collection of independent projects, using technologies such as React, TypeScript, GitHub and Vercel.",
    keyTakeaway: "Mastered end-to-end shipping: UI design, state management, modern toolchains, and CI/CD pipelines.",
    iconType: "layers",
    accentGlow: "electric-blue",
    tags: ["React & Vite", "TypeScript", "Vercel Deployments", "Git Workflow"]
  },
  {
    id: "milestone-today",
    stepNumber: 6,
    stageTitle: "TODAY — STILL CREATING",
    subtitle: "Intersection of Sound & Code",
    ageHighlight: "KeyFlow & Beyond",
    description:
      "Continuing to explore, experiment and build. KeyFlow represents my interest in combining technology, creativity and music.",
    keyTakeaway: "Blending audio synthesis, studio aesthetics, and creative engineering into memorable digital crafts.",
    iconType: "music",
    accentGlow: "violet",
    tags: ["KeyFlow", "Creative Coding", "Web Audio", "Continuous Growth"]
  }
];
