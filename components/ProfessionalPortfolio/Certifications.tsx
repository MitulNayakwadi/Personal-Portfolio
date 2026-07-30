import { CERTIFICATIONS_DATA, ACHIEVEMENTS_DATA } from '../../data/portfolio';
import AnimateOnScroll from '../AnimateOnScroll';
import { Trophy, ArrowUpRight } from 'lucide-react';

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 px-6 max-w-[900px] mx-auto border-b border-slate-100">
      <AnimateOnScroll direction="left">
        <div className="border-l-4 border-[#2563EB] pl-4 mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1A1A2E] tracking-tight">
            Certifications & Achievements
          </h2>
        </div>
      </AnimateOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CERTIFICATIONS_DATA.map((cert, idx) => (
          <AnimateOnScroll key={cert.title} delay={idx * 0.04} direction="up">
            <article className="h-full bg-white border border-slate-200 rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.12)] transition-all duration-300 flex flex-col">
              <p className="text-[10px] uppercase tracking-widest font-mono text-slate-400 font-bold mb-2">Certification</p>
              <h3 className="font-body text-[14px] sm:text-[15px] font-bold text-[#1A1A2E] leading-snug mb-4">{cert.title}</h3>

              <div className="mt-auto">
                {cert.href ? (
                  <a
                    href={cert.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-[#2563EB] border border-slate-200 hover:border-blue-200 text-[11px] font-mono uppercase tracking-widest font-semibold py-2.5 px-3 rounded-lg transition-colors"
                    data-hover="true"
                  >
                    <span>View</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <div className="inline-flex w-full items-center justify-center text-[11px] font-mono uppercase tracking-widest font-semibold py-2.5 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-500">
                    View
                  </div>
                )}
              </div>
            </article>
          </AnimateOnScroll>
        ))}
      </div>

      <div className="mt-10">
        <span className="text-xs uppercase font-mono tracking-widest text-slate-450 font-bold block mb-4">Key Achievements</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {ACHIEVEMENTS_DATA.map((ach, idx) => (
            <AnimateOnScroll key={idx} delay={idx * 0.06} direction="up">
              <div className="flex items-start gap-3 bg-white border border-slate-200 rounded-lg p-3.5 text-slate-700">
                <Trophy className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                <span className="font-body text-[13px] sm:text-sm font-medium leading-relaxed">{ach}</span>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
