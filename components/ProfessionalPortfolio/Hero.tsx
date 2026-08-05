import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Briefcase, Download, Copy, Check, Sparkles, Award, Code, Globe, GraduationCap } from 'lucide-react';
import { HERO_DATA } from '../../data/portfolio';
import ProfileImg from '../../mee.jpeg';

interface Props {
  scrollToSection: (id: string) => void;
}

export default function Hero({ scrollToSection }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('mitulnayakwadi@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
  };

  const STATS = [
    { label: 'Certifications', value: '10+', icon: Award, desc: 'Google Cloud, Cisco, IBM' },
    { label: 'Projects', value: '4+', icon: Code, desc: 'AI, GovTech, Web Apps' },
    { label: 'Domain', value: 'AI & Web', icon: Sparkles, desc: 'Intelligent App Systems' },
    { label: 'Education', value: 'B.E. CSE', icon: GraduationCap, desc: 'Matrusri Eng. College' },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-center items-center px-6 py-20 bg-[radial-gradient(#e2e8f0_1.2px,transparent_1.2px)] [background-size:24px_24px] overflow-hidden"
    >
      {/* Dynamic ambient background glows */}
      <div className="absolute top-[15%] left-[10%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-[15%] right-[10%] w-[450px] h-[450px] bg-indigo-100/40 rounded-full blur-[140px] pointer-events-none -z-10" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-[850px] text-center flex flex-col items-center z-10"
      >
        {/* Profile Avatar & Status Badge */}
        <motion.div variants={item} className="relative mb-6 group">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-blue-600 via-blue-400 to-indigo-500 shadow-xl transition-all duration-300 group-hover:scale-105">
            <img
              src={ProfileImg}
              alt="Mitul Nayakwadi"
              className="w-full h-full object-cover rounded-full border-2 border-white shadow-inner"
            />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-md text-[11px] font-mono font-semibold text-slate-700 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 absolute"></span>
            <span className="ml-2">Available for Opportunities</span>
          </div>
        </motion.div>

        {/* Monospace Greeting Tag */}
        <motion.div
          variants={item}
          className="inline-flex items-center font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#2563EB] uppercase mb-3 bg-blue-50/80 border border-blue-200/60 px-4 py-1.5 rounded-full shadow-xs"
        >
          <span>{HERO_DATA.greeting}</span>
        </motion.div>

        {/* Main Display Header */}
        <motion.h1
          variants={item}
          className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-[#1A1A2E] tracking-tight leading-[1.08] mb-4"
        >
          {HERO_DATA.name}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={item}
          className="font-body text-lg sm:text-2xl font-semibold text-slate-800 leading-snug mb-3 max-w-2xl"
        >
          {HERO_DATA.title}
        </motion.p>

        {/* Tagline */}
        <motion.p
          variants={item}
          className="font-body text-sm sm:text-base text-slate-600 max-w-xl mb-8 leading-relaxed"
        >
          {HERO_DATA.tagline}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mb-12"
        >
          <button
            onClick={() => scrollToSection('projects')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-body font-semibold text-sm py-3.5 px-7 rounded-xl transition-all duration-300 shadow-[0_4px_14px_rgba(37,99,235,0.22)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.32)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer border-none"
            data-hover="true"
          >
            <Briefcase size={16} />
            <span>View Featured Works</span>
          </button>

          <a
            href={HERO_DATA.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-[#2563EB] font-body font-semibold text-sm py-3.5 px-7 rounded-xl transition-all duration-300 border border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:border-blue-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-decoration-none"
            data-hover="true"
          >
            <Download size={16} />
            <span>Download Resume</span>
          </a>

          <button
            onClick={handleCopyEmail}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-body font-semibold text-sm py-3.5 px-5 rounded-xl transition-all duration-300 border border-slate-200 cursor-pointer"
            title="Copy Email to Clipboard"
            data-hover="true"
          >
            {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
            <span className="text-xs font-mono">{copied ? 'Email Copied!' : 'Copy Email'}</span>
          </button>
        </motion.div>

        {/* Quick Stats Grid */}
        <motion.div
          variants={item}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 w-full max-w-2xl"
        >
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white/80 backdrop-blur-xs border border-slate-200/90 hover:border-blue-300 p-4 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_rgba(37,99,235,0.08)] transition-all duration-300 flex flex-col items-center text-center group cursor-default"
              >
                <div className="p-2 rounded-lg bg-blue-50 text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors mb-2">
                  <Icon size={16} />
                </div>
                <span className="font-display text-xl sm:text-2xl font-extrabold text-[#1A1A2E]">
                  {stat.value}
                </span>
                <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                  {stat.label}
                </span>
                <span className="text-[11px] text-slate-400 font-body">
                  {stat.desc}
                </span>
              </div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator Button */}
      <button
        onClick={() => scrollToSection('about')}
        className="mt-12 flex flex-col items-center gap-1.5 text-slate-400 hover:text-[#2563EB] transition-colors cursor-pointer bg-transparent border-none group"
        title="Scroll to About section"
        data-hover="true"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase opacity-70 group-hover:opacity-100 transition-opacity">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </button>
    </section>
  );
}

