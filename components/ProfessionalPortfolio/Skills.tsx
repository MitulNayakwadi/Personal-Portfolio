import { SKILLS_DATA } from '../../data/portfolio';
import AnimateOnScroll from '../AnimateOnScroll';
import { motion } from 'framer-motion';

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 max-w-[900px] mx-auto border-b border-slate-100">
      <AnimateOnScroll direction="left">
        <div className="border-l-4 border-[#2563EB] pl-4 mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1A1A2E] tracking-tight">
            Technical Skills
          </h2>
        </div>
      </AnimateOnScroll>

      <div className="space-y-8">
        {SKILLS_DATA.map((group, groupIdx) => (
          <div key={group.category} className="space-y-3">
            {/* Category label */}
            <span className="text-xs uppercase font-mono tracking-widest text-slate-450 font-bold block">
              {group.category}
            </span>

            {/* Pills */}
            <div className="flex flex-wrap gap-2.5">
              {group.skills.map((skill, pillIdx) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.35,
                    delay: groupIdx * 0.06 + pillIdx * 0.03,
                    ease: 'easeOut',
                  }}
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-800 text-xs sm:text-sm font-mono font-medium shadow-[0_1px_2px_rgba(37,99,235,0.05)] cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
