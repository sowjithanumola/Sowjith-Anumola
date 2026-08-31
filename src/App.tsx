/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Github, Mail, Instagram } from "lucide-react";
import { PROJECTS } from "./constants";
import ProjectCard from "./components/ProjectCard";
import AudioPlayer from "./components/AudioPlayer";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans">
      <AudioPlayer src="https://fair-black-hwo6ylmg.edgeone.dev/Sowjith%20Anthem.mp3" />
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-bold text-lg">Sowjith Anumola</span>
          <div className="flex gap-6 text-sm text-zinc-600">
            <a href="#projects" className="hover:text-zinc-900">Projects</a>
            <a href="#about" className="hover:text-zinc-900">About</a>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-32 flex flex-col md:flex-row gap-12 items-center"
        >
          <img 
            src="https://i.ibb.co/KjHNMvhD/Screenshot-2026-03-23-142946.png"
            alt="Sowjith Anumola" 
            className="rounded-2xl w-64 h-64 object-cover shadow-lg flex-shrink-0"
            referrerPolicy="no-referrer"
          />
          <div>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter">
              Hi, I'm Sowjith Anumola
            </h1>
            <p className="text-2xl text-zinc-600 mb-8">
              Young Developer Creating AI Tools & Smart Web Apps
            </p>
          </div>
        </motion.section>

        <section id="projects" className="mb-32">
          <h2 className="text-4xl font-bold mb-12 tracking-tight">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project) => (
              <ProjectCard 
                key={project.name} 
                name={project.name} 
                url={project.url} 
                description={project.description} 
              />
            ))}
          </div>
        </section>

        <section id="about" className="mb-32 bg-zinc-50 p-12 rounded-3xl border border-zinc-100">
          <h2 className="text-4xl font-bold mb-6 tracking-tight">About Me</h2>
          <div className="text-lg text-zinc-700 max-w-3xl leading-relaxed space-y-4">
            <p>Hi, I'm Sowjith Anumola, a young developer who is passionate about building websites and AI-powered tools. I enjoy creating digital products that help people solve problems, improve productivity, and explore new ideas using technology. I am a 14-year-old boy passionate about technology.</p>
            <p>From a young age, I became interested in how websites and software work. That curiosity pushed me to start learning web development, AI tools, and modern technologies. Since then, I have built several projects that combine creativity with technology.</p>
            <p>I like experimenting with new ideas and turning them into real applications. My projects focus on areas like productivity tools, AI assistants, creative platforms, and smart web applications. Each project I build helps me learn something new and improve my skills.</p>
            <p>Some of the tools I have created include AI-powered applications for drawing, writing emails, generating content ideas, analyzing emotions, organizing notes, and improving focus while studying. These projects reflect my interest in using AI to build useful and practical tools.</p>
            <p>I believe that technology can make learning, creativity, and communication easier for everyone. My goal is to keep improving my skills, build more innovative projects, and continue exploring the possibilities of AI and web development.</p>
            <p>As I continue my journey, I aim to create tools that are not only powerful but also simple, helpful, and accessible for people around the world.</p>
          </div>
        </section>

        <section id="info" className="border-t border-zinc-100 pt-20">
          <h2 className="text-4xl font-bold mb-12 tracking-tight">Information</h2>
          <div className="flex flex-col gap-4 text-zinc-600">
            <p className="flex items-center gap-2"><Github size={20}/> github.com/sowjithanumola</p>
            <p className="flex items-center gap-2"><Instagram size={20}/> i.am.sowjith</p>
            <p className="flex items-center gap-2"><Mail size={20}/> sowjith.anumola@gmail.com</p>
          </div>
        </section>
      </main>
    </div>
  );
}

