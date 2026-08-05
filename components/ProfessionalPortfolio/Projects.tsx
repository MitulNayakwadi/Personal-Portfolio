import { useState } from 'react';
import { PROJECTS_DATA, ProjectData } from '../../data/portfolio';
import AnimateOnScroll from '../AnimateOnScroll';
import { Github, ExternalLink, Filter, Layers, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedProject, setExpandedProject] = useState<ProjectData | null>(null);

  const CATEGORIES = ['All', 'AI Healthcare', 'Cybersecurity', 'GovTech / Environment', 'Local Discovery'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 px-6 max-w-[900px] mx-auto border-b border-slate-100">
      <AnimateOnScroll direction="left">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div className="border-l-4 border-[#2563EB] pl-4">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1A1A2E] tracking-tight">
              Key Projects & Systems
            </h2>
            <p className="font-body text-xs sm:text-sm text-slate-500 mt-1">
              Production-ready applications built with AI, Web Technologies, & Scalable Databases
            </p>
          </div>
        </div>
      </AnimateOnScroll>

      {/* Category Filter Tabs */}
      <AnimateOnScroll delay={0.1}>
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          <div className="flex items-center gap-1 text-slate-400 font-mono text-xs uppercase font-bold pr-2 border-r border-slate-200">
            <Filter size={13} />
            <span>Filter</span>
          </div>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 cursor-pointer whitespace-nowrap border ${
                  isSelected
                    ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-sm font-semibold'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                }`}
                data-hover="true"
              >
                {cat}
              </button>
            );
          })}
        </div>
      </AnimateOnScroll>

      {/* Projects List Grid */}
      <div className="space-y-6">
        <AnimatePresence mode="wait">
          {filteredProjects.map((project, idx) => (
            <AnimateOnScroll key={project.id} delay={idx * 0.08} direction="up">
              <div
                onClick={() => setExpandedProject(expandedProject?.id === project.id ? null : project)}
                className="group bg-white border-l-[4px] border-l-[#2563EB] border border-slate-200 p-6 rounded-r-xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(37,99,235,0.1)] hover:border-blue-300 transition-all duration-300 cursor-pointer relative"
              >
                {/* Top Bar: Category badge & links */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#2563EB] bg-blue-50 border border-blue-100 font-bold px-2.5 py-0.5 rounded-md">
                    {project.category}
                  </span>

                  <div className="flex items-center gap-2.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-[#2563EB] transition-colors"
                        aria-label="View Github Repository"
                        title="GitHub Repository"
                        data-hover="true"
                      >
                        <Github size={16} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-50 text-[#2563EB] hover:bg-[#2563EB] hover:text-white font-mono text-[11px] font-bold tracking-wide transition-colors border border-blue-200"
                        aria-label="View Live Website"
                        data-hover="true"
                      >
                        <span>Live Demo</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Name */}
                <h3 className="font-body text-lg sm:text-xl font-bold text-[#1A1A2E] leading-snug mb-3 group-hover:text-[#2563EB] transition-colors flex items-center gap-2">
                  <span>{project.name}</span>
                </h3>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] sm:text-xs text-slate-700 bg-slate-100 border border-slate-200/80 px-2.5 py-0.5 rounded font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Bullets */}
                <ul className="space-y-2 text-slate-600 text-[13px] sm:text-sm font-body">
                  {project.bullets.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="flex items-start gap-2 leading-relaxed">
                      <CheckCircle2 size={15} className="text-[#2563EB] shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>
          ))}
        </AnimatePresence>
      </div>

      {/* Project Detail Modal / Expanded Inspection */}
      <AnimatePresence>
        {expandedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedProject(null)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border border-slate-200 max-w-lg w-full rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <span className="font-mono text-xs font-bold text-[#2563EB] bg-blue-50 border border-blue-100 px-3 py-1 rounded-md uppercase">
                  {expandedProject.category}
                </span>
                <button
                  onClick={() => setExpandedProject(null)}
                  className="text-slate-400 hover:text-slate-700 font-mono text-xs font-bold uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-md cursor-pointer border-none"
                >
                  Close ✕
                </button>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-[#1A1A2E] mb-2">
                  {expandedProject.name}
                </h3>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {expandedProject.techStack.map((tech) => (
                    <span key={tech} className="font-mono text-xs text-[#2563EB] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2 bg-slate-50 border border-slate-200 p-4 rounded-xl">
                <h4 className="font-mono text-xs font-bold uppercase text-slate-500 tracking-wider">Key Highlights</h4>
                <ul className="space-y-2 text-slate-700 text-xs sm:text-sm">
                  {expandedProject.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-[#2563EB] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3 pt-2">
                {expandedProject.githubUrl && (
                  <a
                    href={expandedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 text-white font-mono text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors text-decoration-none"
                  >
                    <Github size={15} />
                    <span>GitHub Code</span>
                  </a>
                )}
                {expandedProject.liveUrl && (
                  <a
                    href={expandedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-[#2563EB] text-white font-mono text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors text-decoration-none"
                  >
                    <ExternalLink size={15} />
                    <span>Live Website</span>
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

