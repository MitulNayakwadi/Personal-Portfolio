import { EXPERIENCE_DATA } from '../../data/portfolio';
import AnimateOnScroll from '../AnimateOnScroll';

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 max-w-[900px] mx-auto border-b border-slate-100">
      <AnimateOnScroll direction="left">
        <div className="border-l-4 border-[#2563EB] pl-4 mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1A1A2E] tracking-tight">
            Experience & Leadership
          </h2>
        </div>
      </AnimateOnScroll>

      <div className="relative border-l border-slate-200 ml-2.5 space-y-10 pl-6 py-2">
        {EXPERIENCE_DATA.map((item, idx) => (
          <div key={idx} className="relative">
            {/* Timeline dot */}
            <span className="absolute -left-[31.5px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#2563EB] border-[3px] border-[#FAFAF8] shadow-sm z-10" />

            <AnimateOnScroll delay={idx * 0.12} direction="left">
              <div className="space-y-3">
                {/* Heading info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h3 className="font-body text-base sm:text-lg font-bold text-[#1A1A2E] leading-snug">
                      {item.role}
                    </h3>
                    <p className="font-body text-[13px] sm:text-sm text-slate-500 font-medium">
                      {item.company}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-slate-450 font-bold sm:text-right shrink-0 mt-1 sm:mt-0">
                    {item.period}
                  </span>
                </div>

                {/* Bullets */}
                <ul className="list-disc pl-4 space-y-2 text-slate-605 text-[13px] sm:text-sm font-body">
                  {item.points.map((point, ptIdx) => (
                    <li key={ptIdx} className="leading-relaxed">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>
          </div>
        ))}
      </div>
    </section>
  );
}
