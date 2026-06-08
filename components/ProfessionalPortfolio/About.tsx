import { ABOUT_DATA } from '../../data/portfolio';
import AnimateOnScroll from '../AnimateOnScroll';
import { MapPin, GraduationCap, Mail, Linkedin, Github } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 px-6 max-w-[900px] mx-auto border-b border-slate-100">
      <AnimateOnScroll direction="left">
        <div className="border-l-4 border-[#2563EB] pl-4 mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1A1A2E] tracking-tight">
            {ABOUT_DATA.title}
          </h2>
        </div>
      </AnimateOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-10 gap-10 items-start">
        {/* Left Column: Bio Paragraphs */}
        <div className="md:col-span-6 space-y-6">
          <AnimateOnScroll delay={0.1}>
            <div className="space-y-5">
              {ABOUT_DATA.paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  className="font-body text-slate-600 leading-relaxed text-[15px] sm:text-[16px] font-normal"
                >
                  {p}
                </p>
              ))}
            </div>
          </AnimateOnScroll>
        </div>

        {/* Right Column: Info Card */}
        <div className="md:col-span-4 w-full">
          <AnimateOnScroll delay={0.2} direction="right">
            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-4">
              <div className="flex items-start gap-3 text-slate-600">
                <MapPin className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                <span className="font-body text-[13px] sm:text-sm font-medium">{ABOUT_DATA.info.location}</span>
              </div>
              <div className="flex items-start gap-3 text-slate-600">
                <GraduationCap className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                <span className="font-body text-[13px] sm:text-sm font-medium leading-relaxed">{ABOUT_DATA.info.education}</span>
              </div>
              <div className="flex items-start gap-3 text-slate-600">
                <Mail className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                <a
                  href={`mailto:${ABOUT_DATA.info.email}`}
                  className="font-body text-[13px] sm:text-sm font-medium hover:text-[#2563EB] transition-colors break-all underline decoration-slate-200 hover:decoration-blue-500"
                >
                  {ABOUT_DATA.info.email}
                </a>
              </div>
              
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <a
                  href={ABOUT_DATA.info.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-500 hover:text-[#2563EB] transition-colors shadow-sm"
                  aria-label="LinkedIn Profile"
                  data-hover="true"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={ABOUT_DATA.info.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-[#1A1A2E] transition-colors shadow-sm"
                  aria-label="GitHub Profile"
                  data-hover="true"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
