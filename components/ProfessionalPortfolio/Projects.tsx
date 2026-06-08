import { PROJECTS_DATA } from '../../data/portfolio';
import AnimateOnScroll from '../AnimateOnScroll';
import { Github, ExternalLink } from 'lucide-react';

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 max-w-[900px] mx-auto border-b border-slate-100">
      <AnimateOnScroll direction="left">
        <div className="border-l-4 border-[#2563EB] pl-4 mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1A1A2E] tracking-tight">
            Key Projects
          </h2>
        </div>
      </AnimateOnScroll>

      <div className="space-y-8">
        {PROJECTS_DATA.map((project, idx) => (
          <AnimateOnScroll key={project.id} delay={idx * 0.12} direction="up">
            <div className="bg-white border-l-[3px] border-l-[#2563EB] border border-slate-200 p-6 rounded-r-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)] transition-all duration-300">
              {/* Top Row: Name + Links */}
              <div className="flex items-center justify-between gap-4 mb-2.5">
                <h3 className="font-body text-base sm:text-lg font-bold text-[#1A1A2E] leading-snug">
                  {project.name}
                </h3>
                <div className="flex items-center gap-3 shrink-0">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-[#2563EB] transition-colors"
                      aria-label="View Github Repository"
                      data-hover="true"
                    >
                      <Github size={18} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-[#2563EB] transition-colors"
                      aria-label="View Live Website"
                      data-hover="true"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>

              {/* Second Row: Tech Stack tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[10px] sm:text-xs text-slate-550 bg-slate-100 px-2 py-0.5 rounded font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Body Bullet Points */}
              <ul className="list-disc pl-4 space-y-2 text-slate-605 text-[13px] sm:text-sm font-body">
                {project.bullets.map((bullet, bulletIdx) => (
                  <li key={bulletIdx} className="leading-relaxed">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
}
