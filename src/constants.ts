export type ComplexityLevel = "Advanced" | "Intermediate" | "Experimental";

export interface Project {
  name: string;
  url: string;
  description: string;
  category:
    | "AI & Agents"
    | "Developer Tools"
    | "Productivity & Writing"
    | "Creative & Media Tools"
    | "Social & Content Tools"
    | "Other Projects";
  tags: string[];
  featured?: boolean;
  complexity?: ComplexityLevel;
  lastUpdated?: string;
}

export const CATEGORIES = [
  "All Projects",
  "AI & Agents",
  "Developer Tools",
  "Productivity & Writing",
  "Creative & Media Tools",
  "Social & Content Tools",
  "Other Projects"
] as const;

export type Category = (typeof CATEGORIES)[number];

export const PROJECTS: Project[] = [
  {
    name: "TabVault",
    url: "https://tabvault-nu.vercel.app/",
    description: "Fast, offline-first personal bookmark manager to organize, tag, and search your web bookmarks into custom collections with local storage.",
    category: "Productivity & Writing",
    tags: ["Bookmark Manager", "Offline-First", "Collection Organizer", "Search & Tagging"],
    featured: true,
    complexity: "Advanced",
    lastUpdated: "Oct 2026"
  },
  {
    name: "Afterglow",
    url: "https://after-glow-ten.vercel.app/",
    description: "Private, distraction-free visual journal for capturing daily memories, mood reflection, photo keepsakes, and personal memory timelines.",
    category: "Productivity & Writing",
    tags: ["Visual Journal", "Mood Reflection", "Memory Keepsake", "Mindfulness"],
    featured: true,
    complexity: "Advanced",
    lastUpdated: "Oct 2026"
  },
  {
    name: "SnapColor",
    url: "https://snapcolours.vercel.app/",
    description: "Generate harmonious 5-color palettes with complementary, analogous, triadic, and monochromatic rules, featuring WCAG AA contrast analysis and gradient exports.",
    category: "Creative & Media Tools",
    tags: ["Palette Generator", "WCAG Contrast", "Color Harmonies", "Design Tool"],
    featured: true,
    complexity: "Advanced",
    lastUpdated: "Oct 2026"
  },
  {
    name: "IconMint",
    url: "https://icon-mint.vercel.app/",
    description: "Browser-based favicon creator and icon design studio with live multi-size previews, preset gallery, SVG customization, and instant web package exports.",
    category: "Developer Tools",
    tags: ["Favicon Generator", "Icon Studio", "SVG Vector", "Web Asset Exporter"],
    featured: true,
    complexity: "Advanced",
    lastUpdated: "Oct 2026"
  },
  {
    name: "EmoLens",
    url: "https://emo-lens.vercel.app/",
    description: "AI-powered facial expression analysis and real-time emotion recognition tool providing instant emotional insights, mood telemetry, and audible feedback.",
    category: "AI & Agents",
    tags: ["AI Vision", "Emotion AI", "Facial Analysis", "Webcam Stream"],
    featured: true,
    complexity: "Advanced",
    lastUpdated: "Oct 2026"
  },
  {
    name: "WebOS",
    url: "https://webos-green.vercel.app/",
    description: "A browser-based operating system featuring a desktop interface, window management, file exploration, code editing, and productivity apps.",
    category: "Developer Tools",
    tags: ["React", "TypeScript", "Virtual OS", "Window Manager"],
    featured: true,
    complexity: "Advanced",
    lastUpdated: "Oct 2026"
  },
  {
    name: "ECHOROOM Music Studio",
    url: "https://echoroom-nu.vercel.app/",
    description: "A full-featured browser-based digital audio workstation for creating, composing, recording, and editing tracks directly on the web.",
    category: "Creative & Media Tools",
    tags: ["Web Audio API", "Synthesizer", "DAW", "Audio Processing"],
    featured: true,
    complexity: "Advanced",
    lastUpdated: "Oct 2026"
  },
  {
    name: "OpenCut Studio",
    url: "https://opencut-video-editor-three.vercel.app/",
    description: "Free, browser-based video editor built for creators featuring multi-layer timeline editing, media tools, text overlays, and watermark-free exports.",
    category: "Creative & Media Tools",
    tags: ["Video Canvas", "Timeline Engine", "Media Stream", "Export API"],
    featured: true,
    complexity: "Advanced",
    lastUpdated: "Oct 2026"
  },
  {
    name: "Focus Mate",
    url: "https://focus-mate-rho.vercel.app/",
    description: "Productivity companion equipped with Pomodoro timers, task organization, study routine planners, and structured focus sessions.",
    category: "Productivity & Writing",
    tags: ["Pomodoro", "Task Management", "Productivity"],
    featured: true,
    complexity: "Intermediate",
    lastUpdated: "Oct 2026"
  },
  {
    name: "ProPhoto Studio",
    url: "https://pro-photo-studio-sepia.vercel.app/",
    description: "AI-powered photo editor for image enhancement, background removal, portrait retouching, color correction, and creative visual effects.",
    category: "Creative & Media Tools",
    tags: ["AI Imaging", "Canvas Filters", "Color Grading", "WebGL"],
    complexity: "Advanced",
    lastUpdated: "Sep 2026"
  },
  {
    name: "Link Sense AI",
    url: "https://link-sense-ai.vercel.app/",
    description: "Smart link analysis tool providing automated summaries, key takeaways, and structured insights from web content.",
    category: "AI & Agents",
    tags: ["AI", "Web Scraping", "Content Summarization"],
    complexity: "Intermediate",
    lastUpdated: "Sep 2026"
  },
  {
    name: "Mentor AI",
    url: "https://mentor-ai-murex.vercel.app/",
    description: "Interactive AI guidance assistant designed to deliver personalized suggestions, study support, and career problem-solving.",
    category: "AI & Agents",
    tags: ["AI Assistant", "Education", "Conversational AI"],
    complexity: "Intermediate",
    lastUpdated: "Aug 2026"
  },
  {
    name: "Viral Forge",
    url: "https://viral-forge-five.vercel.app/",
    description: "Content idea generator for creators, marketers, and social media managers looking to spark viral hooks and engaging campaign concepts.",
    category: "Social & Content Tools",
    tags: ["AI Ideation", "Social Media", "Copywriting"],
    complexity: "Intermediate",
    lastUpdated: "Aug 2026"
  },
  {
    name: "Mail Craft",
    url: "https://mail-craft-two.vercel.app/",
    description: "AI email writing assistant that generates professional, well-structured emails, replies, and follow-ups in seconds.",
    category: "Productivity & Writing",
    tags: ["AI Writing", "Email Automation", "Tone Adjustment"],
    complexity: "Intermediate",
    lastUpdated: "Jul 2026"
  },
  {
    name: "Note Snap",
    url: "https://note-snap-three.vercel.app/",
    description: "Smart, distraction-free note-taking tool for capturing, structuring, and organizing rapid thoughts and daily plans.",
    category: "Productivity & Writing",
    tags: ["Productivity", "Markdown", "Local Storage"],
    complexity: "Intermediate",
    lastUpdated: "Jul 2026"
  },
  {
    name: "Te-X Forge",
    url: "https://te-x-forge-two.vercel.app/",
    description: "A clean and focused environment for writing, testing, and rendering complex LaTeX equations and mathematical typography.",
    category: "Developer Tools",
    tags: ["LaTeX", "KaTeX", "Math Engine", "Developer Tool"],
    complexity: "Intermediate",
    lastUpdated: "Aug 2026"
  },
  {
    name: "Ink Whisper",
    url: "https://ink-whisper.vercel.app/",
    description: "AI-powered creative writing companion that helps draft letters, imaginative stories, blog posts, and long-form articles.",
    category: "Productivity & Writing",
    tags: ["Generative AI", "Storytelling", "Creative Writing"],
    complexity: "Intermediate",
    lastUpdated: "Jul 2026"
  },
  {
    name: "Neuro Draw",
    url: "https://neuro-draw.vercel.app/",
    description: "An AI-powered drawing studio for creating expressive digital sketches, freeform canvas illustrations, and creative artwork.",
    category: "Creative & Media Tools",
    tags: ["HTML5 Canvas", "AI Art", "Creative Tool"],
    complexity: "Advanced",
    lastUpdated: "Aug 2026"
  },
  {
    name: "ZoZo",
    url: "https://zozo-two-theta.vercel.app/",
    description: "An intelligent digital assistant designed to simplify everyday tasks, answer queries, and boost digital workflow efficiency.",
    category: "AI & Agents",
    tags: ["AI Assistant", "Task Automation", "Conversational AI"],
    complexity: "Intermediate",
    lastUpdated: "Jun 2026"
  },
  {
    name: "Career Advisor",
    url: "https://career-advisor-eight.vercel.app/",
    description: "Interactive AI platform that evaluates goals and interests to provide personalized career trajectories, learning paths, and skills advice.",
    category: "AI & Agents",
    tags: ["AI Consultation", "Career Guidance", "Interactive"],
    complexity: "Intermediate",
    lastUpdated: "Jun 2026"
  },
  {
    name: "Vorathi",
    url: "https://vorathi.vercel.app/",
    description: "An original constructed language and phonetic communication system designed and developed by Sowjith Anumola.",
    category: "Other Projects",
    tags: ["Constructed Language", "Linguistics", "Creative System"],
    complexity: "Experimental",
    lastUpdated: "May 2026"
  },
  {
    name: "Giddu",
    url: "https://giddu-phi.vercel.app/",
    description: "AI-powered digital helper that automates repetitive web chores, provides smart answers, and offers on-demand workflow support.",
    category: "AI & Agents",
    tags: ["AI Agent", "Workflow Automation", "Smart Helper"],
    complexity: "Intermediate",
    lastUpdated: "Jun 2026"
  },
  {
    name: "Nova Mind",
    url: "https://nova-mind-azure.vercel.app/",
    description: "A futuristic AI companion built for high-level idea exploration, philosophical conversation, and creative problem solving.",
    category: "AI & Agents",
    tags: ["AI Companion", "Creative Thinking", "NLP"],
    complexity: "Advanced",
    lastUpdated: "Jul 2026"
  },
  {
    name: "Score Arena",
    url: "https://scorearena-mu.vercel.app/",
    description: "Live sports hub offering real-time scores, league standings, match breakdowns, and statistical sport analytics.",
    category: "Social & Content Tools",
    tags: ["Live Data", "Sports Tracker", "Real-time Stats"],
    complexity: "Intermediate",
    lastUpdated: "Jul 2026"
  },
  {
    name: "Multiplayer Racing",
    url: "https://multiplayer-racing.vercel.app/",
    description: "Real-time multiplayer 2D racing game where players challenge friends across dynamic tracks with competitive physics.",
    category: "Other Projects",
    tags: ["Game Engine", "Multiplayer", "Canvas Physics"],
    complexity: "Advanced",
    lastUpdated: "Aug 2026"
  },
  {
    name: "TicMaster",
    url: "https://tictactoe-sandy-two-22.vercel.app/",
    description: "Classic Tic Tac Toe reimagined with two-player mode and an unbeatable AI opponent powered by the Minimax algorithm.",
    category: "Other Projects",
    tags: ["Minimax Algorithm", "Game AI", "Classic Game"],
    complexity: "Intermediate",
    lastUpdated: "Apr 2026"
  },
  {
    name: "Chess Game",
    url: "https://chess-game-tau-brown.vercel.app/",
    description: "Classic offline chess game built for two players on the same device with standard rules, smooth moves, and legal move validation.",
    category: "Other Projects",
    tags: ["Chess Rules Engine", "Board Game", "Two-Player"],
    complexity: "Intermediate",
    lastUpdated: "May 2026"
  },
  {
    name: "Luminance",
    url: "https://luminance-navy.vercel.app/",
    description: "Interactive web graphics experiment demonstrating ambient light physics, particle diffusion, and dynamic lighting shaders.",
    category: "Creative & Media Tools",
    tags: ["Shader FX", "Lighting Physics", "Creative Coding"],
    complexity: "Advanced",
    lastUpdated: "Sep 2026"
  },
  {
    name: "XRay Vision",
    url: "https://xray2-five.vercel.app/",
    description: "An experimental visual filter tool simulating biological scanner overlays and futuristic optical effects.",
    category: "Creative & Media Tools",
    tags: ["Visual Filters", "Camera FX", "Experimental"],
    complexity: "Experimental",
    lastUpdated: "May 2026"
  },
  {
    name: "XRay Hand",
    url: "https://xrayhand-rel4jry7.manus.space/",
    description: "Interactive machine-vision experiment combining real-time hand tracking with futuristic skeletal overlay effects.",
    category: "Creative & Media Tools",
    tags: ["Computer Vision", "Hand Tracking", "Futuristic UI"],
    complexity: "Advanced",
    lastUpdated: "Sep 2026"
  },
  {
    name: "Fonts Emoji Studio",
    url: "https://fonts-emoji-studio.vercel.app/",
    description: "Creative typographic styling tool for generating custom Unicode fonts, ASCII art, and expressive text decorators.",
    category: "Creative & Media Tools",
    tags: ["Typography", "Unicode Engine", "Emoji FX"],
    complexity: "Intermediate",
    lastUpdated: "Jun 2026"
  },
  {
    name: "QR Code Color Generator",
    url: "https://qr-code-color-generator.vercel.app/",
    description: "Custom SVG QR code generator with personalized gradient palettes, embeddable styles, and instant high-res downloads.",
    category: "Developer Tools",
    tags: ["QR Code Engine", "SVG Generator", "Color Palettes"],
    complexity: "Intermediate",
    lastUpdated: "Aug 2026"
  }
];

export const SKILLS_DATA = [
  {
    category: "Frontend Development",
    accent: "lime",
    technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "HTML5 Canvas", "Vite", "Motion/Animation"]
  },
  {
    category: "Backend & Systems",
    accent: "cyan",
    technologies: ["Node.js", "REST APIs", "Serverless Functions", "State Management", "LocalStorage / Web Storage"]
  },
  {
    category: "AI & Integrations",
    accent: "purple",
    technologies: ["LLM Prompt Engineering", "AI Chat & Assistant Logic", "NLP Emotion Analysis", "Computer Vision Overlays"]
  },
  {
    category: "Creative Tools & Deployment",
    accent: "pink",
    technologies: ["Web Audio API", "Vercel Deployment", "Git & GitHub", "Responsive Design", "WCAG Accessibility"]
  }
];
