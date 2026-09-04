/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { MapPin, Phone, Github, Mail, Instagram, AtSign, MessageSquare, Link } from "lucide-react";
import { PROJECTS } from "./constants";
import ProjectCard from "./components/ProjectCard";
import AudioPlayer from "./components/AudioPlayer";

export default function App() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]), { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="min-h-screen mesh-gradient bg-[#030712] text-white font-sans selection:bg-white selection:text-zinc-900 overflow-x-hidden">
      {/* Background Effects */}
      <div className="aurora overflow-hidden">
        <div className="aurora-blob bg-aurora-1 w-[80vw] h-[80vw] opacity-15"></div>
        <div className="aurora-blob bg-aurora-2 w-[70vw] h-[70vw] opacity-15"></div>
        <div className="aurora-blob bg-aurora-3 w-[60vw] h-[60vw] opacity-15"></div>
        
        {/* Minimal Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: Math.random() * 100 + "%",
                scale: Math.random() * 0.5 + 0.5,
                opacity: Math.random() * 0.3
              }}
              animate={{ 
                y: [null, (Math.random() - 0.5) * 100 + "px"],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{ 
                duration: Math.random() * 5 + 5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="particle w-1 h-1 text-blue-400"
            />
          ))}
        </div>
      </div>
      <div className="fixed inset-0 grid-bg pointer-events-none z-0 opacity-20"></div>

      <AudioPlayer src="https://fair-black-hwo6ylmg.edgeone.dev/Sowjith%20Anthem.mp3" />
      
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-xl border-b border-white/5 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-zinc-900 font-bold text-xs">S</div>
            <span className="font-bold text-xl tracking-tighter">SOWJITH</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-semibold text-zinc-400 uppercase tracking-widest">
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#about" className="hover:text-white transition-colors">About Us</a>
            <a href="#info" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-48 pb-20 px-6 max-w-7xl mx-auto">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-48 flex flex-col items-center text-center relative"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div 
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            style={{ 
              rotateX,
              rotateY,
              transformStyle: "preserve-3d"
            }}
            className="mb-12 relative perspective-1000 cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/40 to-purple-500/40 rounded-full blur-[60px] opacity-40 -z-10 animate-pulse-slow"></div>
            <motion.div
              style={{ translateZ: 60 }}
              className="relative"
            >
              <img 
                src="https://low-teal-ovs4rw0k.edgeone.dev/file.png"
                alt="Sowjith Anumola" 
                className="rounded-full w-48 h-48 md:w-56 md:h-56 object-cover shadow-[0_30px_60px_rgba(0,0,0,0.25)] border-4 border-white/60"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
          
          <h1 className="text-7xl md:text-9xl font-bold mb-8 tracking-tighter leading-none text-white">
            WELCOME
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl font-medium mb-4 leading-relaxed">
            I'm Sowjith Anumola, a 13-year-old developer creating AI tools and smart web applications that simplify your digital life.
          </p>
          <div className="flex items-center gap-2 text-zinc-400 font-medium mb-12 text-sm md:text-base">
            <MapPin size={18} className="text-zinc-500" />
            <span>📍 Hastinapuram, ZP Road, Hyderabad, Telangana, India</span>
          </div>
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#projects"
            className="bg-white text-zinc-900 px-10 py-4 rounded-full text-sm font-bold tracking-[0.2em] transition-all shadow-xl uppercase"
          >
            Learn More
          </motion.a>
        </motion.section>

        <section id="projects" className="mb-48">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col items-center text-center mb-20"
          >
            <h2 className="text-5xl font-bold tracking-tighter mb-4 text-white">MY PROJECTS</h2>
            <div className="w-20 h-1 bg-white rounded-full"></div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, idx) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1 }}
              >
                <ProjectCard 
                  name={project.name} 
                  url={project.url} 
                  description={project.description} 
                />
              </motion.div>
            ))}
          </div>
        </section>

        <motion.section 
          id="about" 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-48 bg-white/5 backdrop-blur-md p-16 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden transition-colors duration-500"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[100px] rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full -ml-32 -mb-32"></div>
          
          <h2 className="text-5xl font-bold mb-10 tracking-tighter text-center text-white">ABOUT ME</h2>
          <div className="text-xl text-zinc-300 max-w-4xl mx-auto leading-relaxed space-y-8 text-center font-medium">
            <p>Hi, I'm Sowjith Anumola, a young developer who is passionate about building websites and AI-powered tools. I enjoy creating digital products that help people solve problems, improve productivity, and explore new ideas using technology. I am a 13-year-old boy passionate about technology.</p>
            <p>From a young age, I became interested in how websites and software work. That curiosity pushed me to start learning web development, AI tools, and modern technologies. Since then, I have built several projects that combine creativity with technology.</p>
            <p>I like experimenting with new ideas and turning them into real applications. My projects focus on areas like productivity tools, AI assistants, creative platforms, and smart web applications. Each project I build helps me learn something new and improve my skills.</p>
          </div>
        </motion.section>

        <section id="info" className="border-t border-white/10 pt-24 pb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-5xl font-bold mb-20 tracking-tighter text-center text-white"
          >
            STAY CONNECTED
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Phone, label: "Phone", user: "+91 93812 59371", href: "tel:+919381259371" },
              { icon: Mail, label: "Email", user: "sowjith.anumola@gmail.com", href: "mailto:sowjith.anumola@gmail.com" },
              { icon: Github, label: "GitHub", user: "@sowjithanumola", href: "https://github.com/sowjithanumola" },
              { icon: AtSign, label: "Threads", user: "@i.am.sowjith", href: "https://www.threads.com/@i.am.sowjith" },
              { icon: Link, label: "Reddit", user: "@i-am-sowjith", href: "https://www.reddit.com/user/i-am-sowjith/" },
              { icon: Instagram, label: "Instagram", user: "@i.am.sowjith", href: "https://www.instagram.com/i.am.sowjith" }
            ].map((item, idx) => (
              <motion.a 
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1 }}
                href={item.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl flex items-center gap-4 hover:bg-white hover:text-zinc-900 transition-all shadow-lg"
              >
                <item.icon size={24} className="group-hover:scale-110 transition-transform"/>
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-widest opacity-60">{item.label}</span>
                  <span className="font-bold">{item.user}</span>
                </div>
              </motion.a>
            ))}

            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.5 }}
              onClick={() => {
                navigator.clipboard.writeText('i.am.sowjith');
                alert('Discord username "i.am.sowjith" copied to clipboard!');
              }}
              className="group bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl flex items-center gap-4 hover:bg-white hover:text-zinc-900 transition-all shadow-lg text-left"
            >
              <MessageSquare size={24} className="group-hover:scale-110 transition-transform"/>
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-widest opacity-60">Discord</span>
                <span className="font-bold">i.am.sowjith</span>
              </div>
            </motion.button>
          </div>
        </section>
      </main>
      
      <footer className="text-center py-10 transition-colors duration-500">
      </footer>
    </div>
  );
}

