import { CERTIFICATIONS_DATA, ACHIEVEMENTS_DATA } from '../../data/portfolio';
import AnimateOnScroll from '../AnimateOnScroll';
import { Check, Trophy } from 'lucide-react';

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Certifications (Checkmark list) */}
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-slate-450 font-bold block mb-5">
            Certifications
          </span>
          <ul className="space-y-3.5">
            {CERTIFICATIONS_DATA.map((cert, idx) => (
              <AnimateOnScroll key={idx} delay={idx * 0.05} direction="up">
                <li className="flex items-start gap-3 text-slate-600 font-body text-[13px] sm:text-sm">
                  <Check className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                  {cert.href ? (
                    <a
                      href={cert.href}
                      target="_blank"
                      rel="noreferrer"
                      className="leading-snug font-medium hover:text-[#2563EB] hover:underline underline-offset-4 transition-colors"
                    >
                      {cert.title}
                    </a>
                  ) : (
                    <span className="leading-snug font-medium">{cert.title}</span>
                  )}
                </li>
              </AnimateOnScroll>
            ))}
          </ul>
        </div>

        {/* Achievements (Trophy list) */}
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-slate-450 font-bold block mb-5">
            Key Achievements
          </span>
          <ul className="space-y-4">
            {ACHIEVEMENTS_DATA.map((ach, idx) => (
              <AnimateOnScroll key={idx} delay={idx * 0.08} direction="up">
                <li className="flex items-start gap-3 text-slate-600 font-body text-[13px] sm:text-sm">
                  <Trophy className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5 animate-pulse" />
                  <span className="leading-relaxed font-semibold text-slate-850">{ach}</span>
                </li>
              </AnimateOnScroll>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
