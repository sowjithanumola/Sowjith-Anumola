import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
  name: string;
  url: string;
  description: string;
  key?: string;
}

export default function ProjectCard({ name, url, description }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ 
        y: -12, 
        scale: 1.05,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 20px 2px rgba(59, 130, 246, 0.3)"
      }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] flex flex-col gap-5 transition-all h-full relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">{name}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed flex-grow">{description}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-white bg-white/10 hover:bg-white hover:text-zinc-900 px-6 py-3 rounded-full border border-white/10 transition-all text-sm font-bold w-fit shadow-sm mt-2"
      >
        Explore <ExternalLink size={18} />
      </a>
    </motion.div>
  );
}
