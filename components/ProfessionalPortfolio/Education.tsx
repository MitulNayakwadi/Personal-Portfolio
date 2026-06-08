import { EDUCATION_DATA } from '../../data/portfolio';
import AnimateOnScroll from '../AnimateOnScroll';

export default function Education() {
  return (
    <section id="education" className="py-24 px-6 max-w-[900px] mx-auto border-b border-slate-100">
      <AnimateOnScroll direction="left">
        <div className="border-l-4 border-[#2563EB] pl-4 mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1A1A2E] tracking-tight">
            Education
          </h2>
        </div>
      </AnimateOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {EDUCATION_DATA.map((card, idx) => (
          <AnimateOnScroll key={idx} delay={idx * 0.12} direction="up">
            <div
              className={`h-full border p-6 rounded-xl flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 ${
                card.prominent
                  ? 'bg-white border-[#2563EB]/40 ring-1 ring-[#2563EB]/10 scale-[1.01] md:scale-[1.03] shadow-[0_4px_12px_rgba(37,99,235,0.06)]'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="space-y-3">
                <h3 className="font-body text-sm sm:text-base font-bold text-[#1A1A2E] leading-snug">
                  {card.institution}
                </h3>
                <p className="font-body text-[13px] sm:text-sm text-slate-600 font-medium">
                  {card.degree}
                </p>
                {card.score && (
                  <span className="inline-block font-mono text-[11px] sm:text-xs text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded font-semibold">
                    {card.score}
                  </span>
                )}
              </div>
              <span className="block font-mono text-[10px] sm:text-[11px] text-slate-450 font-bold mt-6">
                {card.period}
              </span>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
}
