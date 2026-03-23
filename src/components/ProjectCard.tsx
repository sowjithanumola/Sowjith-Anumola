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
      whileHover={{ y: -5 }}
      className="bg-white border border-zinc-200 p-6 rounded-2xl flex flex-col gap-4 shadow-sm"
    >
      <h3 className="text-xl font-semibold text-zinc-900">{name}</h3>
      <p className="text-zinc-600 text-sm flex-grow">{description}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-500 transition-colors text-sm font-medium"
      >
        View Project <ExternalLink size={16} />
      </a>
    </motion.div>
  );
}
