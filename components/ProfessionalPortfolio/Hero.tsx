import { motion } from 'framer-motion';
import { ArrowDown, Briefcase, Download } from 'lucide-react';
import { HERO_DATA } from '../../data/portfolio';

interface Props {
  scrollToSection: (id: string) => void;
}

export default function Hero({ scrollToSection }: Props) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center px-6 bg-[radial-gradient(#e2e8f0_1.2px,transparent_1.2px)] [background-size:24px_24px] overflow-hidden"
    >
      {/* Dynamic ambient backgrounds */}
      <div className="absolute top-[20%] left-[15%] w-[450px] h-[450px] bg-blue-100/40 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[15%] w-[450px] h-[450px] bg-amber-50/50 rounded-full blur-[140px] pointer-events-none -z-10" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-[780px] text-center flex flex-col items-center z-10"
      >
        {/* Monospace tag */}
        <motion.span
          variants={item}
          className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#2563EB] uppercase mb-4"
        >
          {HERO_DATA.greeting}
        </motion.span>

        {/* Display Header */}
        <motion.h1
          variants={item}
          className="font-display text-5xl sm:text-7xl lg:text-8xl font-black text-[#1A1A2E] tracking-tight leading-[1.05] mb-6"
        >
          {HERO_DATA.name}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={item}
          className="font-body text-xl sm:text-2xl font-medium text-slate-800 leading-normal mb-3 max-w-2xl"
        >
          {HERO_DATA.title}
        </motion.p>

        {/* Tagline */}
        <motion.p
          variants={item}
          className="font-body text-sm sm:text-base text-slate-500 max-w-lg mb-10 leading-relaxed"
        >
          {HERO_DATA.tagline}
        </motion.p>

        {/* Action buttons */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={() => scrollToSection('projects')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-body font-semibold text-sm py-3.5 px-8 rounded-lg transition-all duration-300 shadow-[0_4px_14px_rgba(37,99,235,0.18)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.28)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer border-none"
            data-hover="true"
          >
            <Briefcase size={16} />
            <span>View Projects</span>
          </button>
          <a
            href={HERO_DATA.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-body font-semibold text-sm py-3.5 px-8 rounded-lg transition-all duration-300 border border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-decoration-none"
            data-hover="true"
          >
            <Download size={16} />
            <span>Download Resume</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Bounce Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none text-slate-400">
        <span className="text-[10px] font-mono tracking-widest uppercase opacity-70">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </div>
    </section>
  );
}
