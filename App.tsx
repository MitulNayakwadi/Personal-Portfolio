/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Globe, Zap, Menu, X, Calendar, Code, Layout, Brain, ChevronLeft, ChevronRight, Github, Linkedin, Mail, ExternalLink, GraduationCap, MapPin, Music, Tv, Palette, Trophy, Award, ArrowUpRight } from 'lucide-react';
import Lenis from 'lenis';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import ScrambleText from './components/ScrambleText';
import CustomCursor from './components/CustomCursor';
import ScrollHUD from './components/ScrollHUD';
import ProjectCard from './components/ArtistCard';
import AIChat from './components/AIChat';
import { Project } from './types';
import FrameImage from './Frame.png';

declare global {
  interface Window {
    lenisInstance?: Lenis;
  }
}

// Portfolio Data
const PROJECTS: Project[] = [
  { 
    id: '5', 
    name: 'Uppal Street Food Guide', 
    techStack: 'Next.js • React • Express • Gemini AI', 
    category: 'AI Food Discovery', 
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop',
    description: 'AI-powered local food discovery platform for Uppal Kalan, Hyderabad. Features smart search, location intelligence (Google Maps), and AI recommendations.',
    githubUrl: 'https://github.com/MitulNayakwadi/uppallocalguide.git',
    liveUrl: 'https://uppallocalfoodguide.vercel.app/'
  },
  { 
    id: '3', 
    name: 'Medico AI', 
    techStack: 'Python • Flask • TensorFlow', 
    category: 'AI Healthcare', 
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop',
    description: 'Built an AI-powered medical assistance platform delivering initial diagnostics & recommendations, with emphasis on UX and real-world scalability.',
    githubUrl: 'https://github.com/MitulNayakwadi/Medico-AI.git'
  },
  { 
    id: '4', 
    name: 'Collex Pay', 
    techStack: 'React • Node.js • Firebase', 
    category: 'Fintech', 
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1000&auto=format&fit=crop',
    description: 'Developed a campus-centric digital wallet where students transact using "Collex Coins" for food, events, and shops. Includes an admin-dashboard for merchants & analytics.'
  },
];

const projectsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const projectCardVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 14,
      duration: 0.8
    }
  }
};

const timelineContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const timelineItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const textEntranceVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const skillsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const skillCardVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
      duration: 0.8
    }
  }
};


const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [hireMeClicked, setHireMeClicked] = useState(false);
  const [introCompleted, setIntroCompleted] = useState(false);
  const [showNameOnImage, setShowNameOnImage] = useState(false);
  
  // Timer for the page-load glitch intro screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroCompleted(true);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  // Initialize Lenis for premium smooth momentum scrolling with visual animations
  useEffect(() => {
    if (!introCompleted) {
      // Prevent scrolling while intro plays
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      return;
    }

    // Restore standard scrolling container limits
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';

    const lenis = new Lenis({
      duration: 1.8, // Elegant, luxurious kinetic drag effect
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard easeOutExpo easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05, // fine-tuned kinetic acceleration
      touchMultiplier: 1.5,
      infinite: false,
    });

    window.lenisInstance = lenis;

    // Handle scroll event for state synchronization of coordinates
    const onScroll = () => {
      window.dispatchEvent(new Event('scroll'));
    };
    lenis.on('scroll', onScroll);

    // Dynamic animation frame coordination
    let rafId: number;
    const updateRaf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(updateRaf);
    };
    rafId = requestAnimationFrame(updateRaf);

    return () => {
      lenis.destroy();
      window.lenisInstance = undefined;
      cancelAnimationFrame(rafId);
    };
  }, [introCompleted]);
  
  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'experience', 'education', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 250; // detection offset

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run initial parse
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle keyboard navigation for project modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      if (e.key === 'ArrowLeft') navigateProject('prev');
      if (e.key === 'ArrowRight') navigateProject('next');
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      if (window.lenisInstance) {
        window.lenisInstance.scrollTo(element, { 
          offset: 0, 
          duration: 1.8,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) // Buttery easing for section jump
        });
      } else {
        const headerOffset = 0;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleHireMeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setHireMeClicked(true);
    // Visual timeout before email trigger
    setTimeout(() => {
      window.location.href = "mailto:mitulnayakwadi@gmail.com";
      // Grace period before reverting text
      setTimeout(() => {
        setHireMeClicked(false);
      }, 5000);
    }, 600);
  };

  const navigateProject = (direction: 'next' | 'prev') => {
    if (!selectedProject) return;
    const currentIndex = PROJECTS.findIndex(p => p.id === selectedProject.id);
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % PROJECTS.length;
    } else {
      nextIndex = (currentIndex - 1 + PROJECTS.length) % PROJECTS.length;
    }
    setSelectedProject(PROJECTS[nextIndex]);
  };
  
  return (
    <AnimatePresence mode="wait">
      {!introCompleted ? (
        <motion.div
          key="intro-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[2000] flex flex-col items-center justify-center bg-[#050505] text-white font-sans overflow-hidden select-none"
        >
          {/* Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none" />
          <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-red-650/10 rounded-full blur-[90px] pointer-events-none" />

          <div className="relative z-10 text-center px-4 w-full">
            <ScrambleText
              text="MITUL NAYAKWADI"
              className="text-[25px] sm:text-6xl md:text-7xl lg:text-8xl leading-none font-black font-heading tracking-tighter uppercase"
            />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.8, ease: "circOut", delay: 0.15 }}
              className="w-32 h-0.5 bg-gradient-to-r from-red-600 to-rose-500 mx-auto mt-6"
            />
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="app-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative min-h-screen text-white selection:bg-red-600 selection:text-white cursor-auto md:cursor-none overflow-x-hidden font-sans"
        >
          <CustomCursor />
          <ScrollHUD />
          <FluidBackground />
          <AIChat />
      
      {/* Navigation - Fixed at the top with premium glassmorphic background blur that prevents content interruption */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-5 bg-black/60 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
        <motion.div 
          onClick={() => scrollToSection('hero')}
          className="font-heading text-xl md:text-2xl font-bold tracking-tighter cursor-pointer z-50 font-black relative"
          animate={{
            color: ["#ef4444", "#ffffff", "#ef4444"],
            textShadow: [
              "0 0 10px rgba(239,68,68,0.7)",
              "0 0 15px rgba(255,255,255,0.4)",
              "0 0 10px rgba(239,68,68,0.7)"
            ]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          MN.
        </motion.div>
        
        {/* Desktop Menu - Highly interactive with active indicator & highlights */}
        <div className="hidden md:flex gap-6 lg:gap-8 text-sm font-bold tracking-widest uppercase">
          {['About', 'Experience', 'Education', 'Skills', 'Projects', 'Contact'].map((item) => {
            const isActive = activeSection === item.toLowerCase();
            return (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`relative py-2 px-1 transition-all duration-300 ${
                  isActive 
                    ? 'text-red-500 font-extrabold scale-105' 
                    : 'text-white/80 hover:text-white hover:scale-105'
                } cursor-pointer bg-transparent border-none`}
                data-hover="true"
              >
                <span>{item}</span>
                {isActive && (
                  <motion.span 
                    layoutId="navTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-red-500 shadow-[0_0_12px_#ef4444] rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
              </button>
            );
          })}
        </div>
        <button 
          onClick={handleHireMeClick}
          className={`hidden md:inline-block border px-8 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer bg-transparent shadow-[0_0_15px_rgba(255,255,255,0.03)] ${
            hireMeClicked
              ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.3)] scale-105'
              : 'border-white/25 hover:border-red-500 hover:bg-red-600/10 hover:text-red-500 text-white'
          }`}
          data-hover="true"
        >
          {hireMeClicked ? "Great!" : "Hire Me"}
        </button>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white z-50 relative w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
           {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-[#0a0a0a]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {['About', 'Experience', 'Education', 'Skills', 'Projects', 'Contact'].map((item) => {
              const isActive = activeSection === item.toLowerCase();
              return (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-3xl font-heading font-black transition-colors uppercase ${
                    isActive ? 'text-red-500' : 'text-white hover:text-red-500'
                  } bg-transparent border-none`}
                >
                  {item}
                </button>
              );
            })}
            
            <button
              onClick={handleHireMeClick}
              className={`mt-4 px-10 py-3 text-sm font-bold tracking-widest uppercase border transition-all duration-300 bg-transparent shrink-0 ${
                hireMeClicked
                  ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.3)] scale-105'
                  : 'border-white/20 text-white hover:border-red-500 hover:text-red-500'
              }`}
            >
              {hireMeClicked ? "Great!" : "Hire Me"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header id="hero" className="relative h-[95svh] min-h-[500px] md:min-h-[620px] flex flex-col items-center justify-center overflow-hidden px-4 pt-24 md:pt-28">
        <motion.div 
          style={{ y, opacity }}
          className="z-10 text-center flex flex-col items-center w-full max-w-6xl pb-10 md:pb-16"
        >
          {/* Main Title - Animated Popup */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.8,
              delay: 0.4
            }}
            className="relative w-full flex justify-center items-center mb-4"
          >
            <ScrambleText 
              text="MITUL NAYAKWADI" 
              className="text-[25px] sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1] font-heading tracking-tight text-white uppercase" 
            />
          </motion.div>
          
          <motion.div
             initial={{ scaleX: 0 }}
             animate={{ scaleX: 1 }}
             transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
             className="w-24 h-0.5 bg-gradient-to-r from-red-600 to-rose-500 mb-6"
          />

          {/* New Subtitles */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mb-6 px-4"
          >
            <h2 className="text-xl md:text-2xl font-bold font-heading text-red-500 tracking-wide mb-3 uppercase">
              Developer · Problem Solver · Builder
            </h2>
            <p className="text-base md:text-lg font-normal text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Turning ideas into intelligent real-world projects through code, & creativity
            </p>
          </motion.div>

          {/* Sleek Hero Social Icon Links */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex items-center gap-6"
          >
            <a
              href="https://github.com/MitulNayakwadi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open GitHub profile"
              title="GitHub — Mitul Nayakwadi"
              className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-red-500 hover:border-red-500/50 hover:bg-white/10 transition-all duration-300 hover:scale-110 shadow-lg"
              data-hover="true"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/mitul-nayakwadi-6a3218319"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open LinkedIn profile"
              title="LinkedIn — Mitul Nayakwadi"
              className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-red-500 hover:border-red-500/50 hover:bg-white/10 transition-all duration-300 hover:scale-110 shadow-lg"
              data-hover="true"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:mitulnayakwadi@gmail.com"
              aria-label="Send email to Mitul Nayakwadi"
              title="Email — mitulnayakwadi@gmail.com"
              className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-red-500 hover:border-red-500/50 hover:bg-white/10 transition-all duration-300 hover:scale-110 shadow-lg"
              data-hover="true"
            >
              <Mail className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>
      </header>

      {/* ABOUT ME SECTION (2nd section) */}
      <section id="about" className="relative z-10 min-h-[85svh] flex flex-col justify-center py-14 md:py-20 overflow-hidden bg-gradient-to-b from-transparent via-[#050505]/45 to-transparent font-sans">
        <div className="absolute top-1/2 left-[-15%] w-[50vw] h-[50vw] bg-red-900/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-start">
            {/* Left Column: Portrait Profile Image */}
            <div className="lg:col-span-5 flex justify-center pt-0">
              <div className="relative w-full max-w-[400px] lg:max-w-full flex flex-col items-center">
                
                {/* Grey Translucent Liquid Glass Speech Bubble Tooltip */}
                <AnimatePresence>
                  {showNameOnImage && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      className="absolute -top-16 z-20 pointer-events-none"
                    >
                      <div className="relative bg-[#2e2e30]/40 backdrop-blur-xl text-white px-6 py-2.5 rounded-2xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.2)] text-center text-xs md:text-sm font-heading font-extrabold uppercase tracking-widest whitespace-nowrap overflow-hidden">
                        {/* Soft glossy shine effect inside the glass bubble */}
                        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/15 via-white/5 to-transparent pointer-events-none" />
                        
                        <span className="relative z-10 [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]">
                          Mitul Nayakwadi
                        </span>
                        
                        {/* Downward triangle tail of speech bubble pointer matching the translucent liquid glass style */}
                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-[#2e2e30]/40 backdrop-blur-xl border-r border-b border-white/15" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div
                  onClick={() => setShowNameOnImage(!showNameOnImage)}
                  className="relative w-full aspect-[3/4] overflow-hidden group cursor-pointer transition-all duration-500 ease-in-out animate-fade-in select-none"
                >
                  <img
                    src={FrameImage}
                    alt="Decorative frame"
                    aria-hidden="true"
                    className="absolute inset-0 z-20 h-full w-full object-contain pointer-events-none opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 drop-shadow-[0_0_18px_rgba(239,68,68,0.18)]"
                  />

                  <div className="absolute inset-[13%_11%_16%_11%] z-10 overflow-hidden rounded-[18px] shadow-[0_0_30px_rgba(0,0,0,0.35)]">
                    <img
                      src="https://lh3.googleusercontent.com/d/183xxd7j9O2q4JyNhMnjGoHJy7C0yPeF6"
                      alt="Mitul Nayakwadi Profile Portrait"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-100 saturate-[1.05]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Bio, Interests, Details */}
            <div className="lg:col-span-7 flex flex-col justify-start">
              <h2 className="text-3xl md:text-5xl font-heading font-black uppercase leading-none tracking-tight text-white mb-4">
                ABOUT <span className="text-red-500 font-bold">ME</span>
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-red-600 to-rose-500 mb-6 rounded-full" />
              
              <p className="text-gray-100 text-lg md:text-xl font-light leading-relaxed mb-6">
                I am <strong className="text-white font-semibold">Mitul Nayakwadi</strong>, a B.E CSE student at Matrusri Engineering College passionate about AI, web development, and building innovative tech projects. I enjoy solving real-world problems through code, participating in hackathons, and exploring modern technologies where creativity meets logic and innovation.
              </p>

              {/* Interests block */}
              <div className="mb-6">
                <h3 className="text-lg font-bold font-heading text-red-500 uppercase tracking-wider mb-3">Interests</h3>
                <div className="flex flex-wrap gap-2 md:gap-2.5">
                  {[
                    { label: 'Movies & Series', icon: Tv },
                    { label: 'Table Tennis (Game)', icon: Trophy },
                    { label: 'Creative Drawing', icon: Palette },
                    { label: 'Music', icon: Music }
                  ].map((interest, idx) => (
                    <span 
                      key={idx} 
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-semibold text-white/90 bg-white/5 border border-white/10 hover:border-red-500/30 hover:bg-white/10 transition-colors cursor-default animate-fade-in"
                    >
                      <interest.icon className="w-4 h-4 text-red-500" />
                      <span>{interest.label}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Personal Details Card */}
              <div className="bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 rounded-2xl p-5 md:p-6 hover:border-red-500/25 transition-all duration-300 relative overflow-hidden mb-4">
                <h3 className="text-md uppercase font-mono font-bold text-white tracking-widest border-b border-white/10 pb-3 mb-6">
                  Personal Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                  <div>
                    <span className="text-xs font-mono text-gray-400 tracking-wider block mb-1">LEGAL NAME</span>
                    <span className="text-white font-semibold text-lg">Mitul Nayakwadi</span>
                  </div>
                  <div>
                    <span className="text-xs font-mono text-gray-400 tracking-wider block mb-1">DATE OF BIRTH</span>
                    <span className="text-white font-semibold text-lg">23/08/2006</span>
                  </div>
                  <div>
                    <span className="text-xs font-mono text-gray-400 tracking-wider block mb-1">BASED IN</span>
                    <span className="text-white font-semibold text-lg">Hyderabad, TS</span>
                  </div>
                  <div>
                    <span className="text-xs font-mono text-gray-400 tracking-wider block mb-1">LANGUAGES SPOKEN</span>
                    <span className="text-white font-semibold text-lg">English, Hindi, Telugu</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE & MEMBERSHIPS SECTION (Separated and Styled as a Timeline) */}
      <section id="experience" className="relative z-10 min-h-[75svh] flex flex-col justify-center py-14 md:py-20 overflow-hidden bg-gradient-to-b from-transparent via-[#050505]/55 to-transparent font-sans">
        <div className="absolute top-1/2 right-[-15%] w-[50vw] h-[50vw] bg-red-900/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 md:px-6 relative">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-heading font-black uppercase leading-none tracking-tight text-white animate-fade-in">
              Experience & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-500 font-bold">Memberships</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-red-600 to-rose-500 mx-auto mt-4 rounded-full" />
          </div>

          <div className="relative border-l border-red-950 md:border-l-0 md:before:absolute md:before:left-1/2 md:before:top-0 md:before:bottom-0 md:before:w-px md:before:bg-gradient-to-b md:before:from-red-900/45 md:before:via-red-600 md:before:to-red-950/45">
            {[
              {
                year: 'Internship (May 2026 - Present)',
                title: 'Google Student Ambassador',
                institution: 'Google Student Ambassadors (India)',
                points: [
                  'Represent student initiatives to showcase Google technologies.',
                  'Drive local student bootcamps and promote tech-centric logical training.'
                ],
                align: 'left',
                icon: Award
              },
              {
                year: 'Aug 2024 – Present',
                title: 'Big-Oh Club Member',
                institution: 'Matrusri Engineering College',
                points: [
                  'Engaged in algorithmic problem-solving and complexity analysis.',
                  'Collaborated with peers to design efficient computational solutions.'
                ],
                align: 'right',
                icon: Trophy
              }
            ].map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, delay: idx * 0.15 }}
                  className={`relative mb-8 md:mb-10 last:mb-0 flex flex-col md:flex-row items-stretch ${
                    item.align === 'left' ? 'md:justify-start' : 'md:justify-end'
                  }`}
                >
                  {/* Timeline Junction Icon */}
                  <div className="absolute -left-[20px] md:left-1/2 md:-translate-x-1/2 top-1 w-8 h-8 rounded-full border border-red-500/40 flex items-center justify-center bg-black hover:border-red-500 transition-all z-20 shadow-[0_0_15px_rgba(239,68,68,0.25)]">
                    <IconComponent className="w-4 h-4 text-red-500" />
                  </div>
   
                  {/* Content Card container with specific alignment */}
                  <div className={`w-full md:w-[45%] pl-8 md:pl-0 ${
                    item.align === 'left' ? 'md:text-left md:pr-10' : 'md:text-left md:pl-10'
                  }`}>
                    <div className="p-5 md:p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-red-500/45 transition-all duration-300 shadow-xl group cursor-default">
                      <span className="inline-block px-3 py-1 text-xs md:text-sm font-mono font-semibold tracking-wider text-red-400 bg-red-950/40 border border-red-800/40 rounded-full mb-3">
                        {item.year}
                      </span>
                      <h3 className="text-base md:text-lg font-bold font-heading text-white group-hover:text-red-400 transition-colors mb-1.5">
                        {item.title}
                      </h3>
                      <p className="text-xs md:text-sm text-red-500 font-semibold font-mono mb-3">
                        {item.institution}
                      </p>
                      <ul className="space-y-2 text-xs md:text-sm text-gray-300 list-disc list-inside">
                        {item.points.map((pt, pIdx) => (
                          <li key={pIdx}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="relative w-full py-4 bg-gradient-to-r from-red-700 via-red-600 to-red-800 text-white z-20 overflow-hidden shadow-[0_0_35px_rgba(239,68,68,0.3)] border-y border-white/5">
        <motion.div 
          className="flex w-fit will-change-transform"
          animate={{ x: "-50%" }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {[0, 1].map((key) => (
            <div key={key} className="flex whitespace-nowrap shrink-0">
              {[...Array(4)].map((_, i) => (
                <span key={i} className="text-lg md:text-2xl font-heading font-black px-6 md:px-12 flex items-center gap-4 uppercase tracking-wider">
                  AI INNOVATION <span className="text-white/20 font-light">●</span> 
                  WEB DEVELOPMENT <span className="text-white/20 font-light">●</span> 
                  CREATIVE TECH <span className="text-white/20 font-light">●</span> 
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* EDUCATION TIMELINE SECTION (3rd section) */}
      <section id="education" className="relative z-10 min-h-[75svh] flex flex-col justify-center py-14 md:py-20 bg-gradient-to-b from-transparent via-[#050505]/45 to-transparent overflow-hidden">
        <div className="absolute top-1/2 left-[-15%] w-[50vw] h-[50vw] bg-red-800/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-15%] right-[-15%] w-[40vw] h-[40vw] bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-4 md:px-6 relative">
          <div className="text-center mb-10">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-3xl md:text-5xl font-heading font-black uppercase leading-none tracking-tight text-white"
            >
              EDUCATION <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-500 font-bold">TIMELINE</span>
            </motion.h2>
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "circOut" }}
              className="w-16 h-1 bg-gradient-to-r from-red-600 to-rose-500 mx-auto mt-4 rounded-full origin-center" 
            />
          </div>
 
          <motion.div 
            variants={timelineContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="relative border-l border-red-950 md:border-l-0 md:before:absolute md:before:left-1/2 md:before:top-0 md:before:bottom-0 md:before:w-px md:before:bg-gradient-to-b md:before:from-red-900/45 md:before:via-red-600 md:before:to-red-950/45"
          >
            {[
              {
                year: '2024–2028',
                title: 'B.E (Computer Science and Engineering)',
                school: 'Matrusri Engineering College',
                align: 'left'
              },
              {
                year: '2022–2024',
                title: 'Intermediate',
                school: 'Excellencia Junior College',
                extra: 'Score: 92.4%',
                align: 'right'
              },
              {
                year: '2022',
                title: 'Secondary School',
                school: 'Sri Saraswathi Sisu Mandir, Saidabad',
                extra: 'Score: CGPA 9.3',
                align: 'left'
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                variants={timelineItemVariants}
                className={`relative mb-8 md:mb-10 last:mb-0 flex flex-col md:flex-row items-stretch ${
                  item.align === 'left' ? 'md:justify-start' : 'md:justify-end'
                }`}
              >
                {/* Timeline Junction Graduation Icon */}
                <div className="absolute -left-[20px] md:left-1/2 md:-translate-x-1/2 top-1 w-8 h-8 rounded-full border border-red-500/40 flex items-center justify-center bg-black hover:border-red-500 transition-all z-20 shadow-[0_0_15px_rgba(239,68,68,0.25)]">
                  <GraduationCap className="w-4 h-4 text-red-500" />
                </div>
 
                {/* Content Card container with specific alignment */}
                <div className={`w-full md:w-[45%] pl-8 md:pl-0 ${
                  item.align === 'left' ? 'md:text-left md:pr-10' : 'md:text-left md:pl-10'
                }`}>
                  <div className="p-5 md:p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-red-500/45 transition-all duration-300 shadow-xl group cursor-default">
                    <motion.span 
                      variants={textEntranceVariants}
                      className="inline-block px-3 py-1 text-xs md:text-sm font-mono font-semibold tracking-wider text-red-400 bg-red-950/40 border border-red-800/40 rounded-full mb-3"
                    >
                      {item.year}
                    </motion.span>
                    <motion.h3 
                      variants={textEntranceVariants}
                      className="text-base md:text-lg font-bold font-heading text-white group-hover:text-red-400 transition-colors mb-1.5"
                    >
                      {item.title}
                    </motion.h3>
                    <motion.p 
                      variants={textEntranceVariants}
                      className="text-xs md:text-sm text-gray-400 font-medium mb-1"
                    >
                      {item.school}
                    </motion.p>
                    {item.extra && (
                      <motion.p 
                        variants={textEntranceVariants}
                        className="text-xs md:text-sm text-red-400 font-mono mt-2.5 font-semibold tracking-wide bg-red-950/30 border border-red-900/30 py-1 px-3 rounded inline-block"
                      >
                        {item.extra}
                      </motion.p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="relative z-10 min-h-[85svh] flex flex-col justify-center py-14 md:py-20 bg-gradient-to-b from-transparent via-[#050505]/35 to-transparent overflow-hidden backdrop-blur-sm">
        <div className="absolute top-1/2 right-[-20%] w-[50vw] h-[50vw] bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center">
            <motion.div 
              variants={skillsContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="lg:col-span-5"
            >
              <motion.h2 
                variants={textEntranceVariants}
                className="text-2xl md:text-3xl font-heading font-black mb-4 leading-tight uppercase text-white"
              >
                Technical <br/> <GradientText text="MASTERY" variant="red-mastery" className="text-3xl md:text-4xl animate-none" />
              </motion.h2>
              <motion.p 
                variants={textEntranceVariants}
                className="text-xs md:text-sm text-gray-400 mb-4 font-light leading-relaxed max-w-sm"
              >
                Combining solid engineering foundations with modern tech stacks to build intelligent, responsive, and impactful solutions.
              </motion.p>
              
              <div className="space-y-4">
                {[
                  { icon: Code, title: 'Languages', desc: 'Python, C, Java' },
                  { icon: Brain, title: 'Core Areas', desc: 'Intelligent Cloud Systems, Artificial Intelligence, Machine Learning, Web Development' },
                  { icon: Globe, title: 'Frameworks & Tools', desc: 'OpenCV, Mediapipe, Flask, React, Node.js, Firebase' },
                ].map((feature, i) => (
                  <motion.div 
                    key={i} 
                    variants={textEntranceVariants}
                    className="flex items-start gap-4 group"
                  >
                     <div className="p-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 group-hover:border-red-500/50 transition-colors">
                      <feature.icon className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <h4 className="text-sm md:text-base font-bold mb-0.5 font-heading text-white">{feature.title}</h4>
                      <p className="text-xs text-gray-400">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              variants={skillsContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
               <motion.div 
                 variants={skillCardVariants}
                 className="bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] p-5 md:p-6 rounded-xl border border-white/10 flex flex-col justify-between min-h-[150px] md:min-h-[170px] shadow-lg shadow-red-500/5"
               >
                  <h3 className="text-lg font-bold text-white mb-2 font-heading">Focus Area</h3>
                  <div>
                    <p className="text-red-500 font-mono text-[10px] uppercase tracking-wider mb-1">Intelligent Cloud Systems</p>
                    <p className="text-xs md:text-sm text-gray-300">Bridging scalable cloud infrastructure with advanced machine learning capabilities.</p>
                  </div>
               </motion.div>
               
               <motion.div 
                 variants={skillCardVariants}
                 className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] p-5 md:p-6 rounded-xl border border-white/10 flex flex-col justify-between min-h-[150px] md:min-h-[170px] shadow-lg shadow-red-500/5 font-sans"
               >
                  <h3 className="text-lg font-bold text-white mb-4 font-heading">Future Pursuits</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Cloud Scaling', 'Deep Learning', 'System Design', 'AI Algorithms'].map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-white/10 rounded-full text-xs text-gray-300 border border-white/5">{tag}</span>
                    ))}
                  </div>
               </motion.div>

               {/* IN Technical Mastery: Summary of Certified Industry Strengths */}
               <motion.div 
                 variants={skillCardVariants}
                 className="bg-gradient-to-br from-[#0c0c0c] to-[#121212] p-5 md:p-6 rounded-xl border border-white/10 hover:border-red-500/35 transition-all duration-300 flex flex-col justify-between min-h-[130px] shadow-lg shadow-red-500/5 md:col-span-2 cursor-default group"
               >
                 <div className="flex justify-between items-start">
                   <div>
                     <p className="text-red-500 font-mono text-[10px] uppercase tracking-wider mb-1">LinkedIn Verified</p>
                     <h3 className="text-lg font-bold text-white mb-2 font-heading">Certified Industry Strengths</h3>
                   </div>
                   <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 group-hover:border-red-500/40 transition-colors">
                     <Award className="w-5 h-5 text-red-500" />
                   </div>
                 </div>
                 <div className="flex flex-wrap gap-x-6 gap-y-2.5 mt-4 text-xs md:text-sm text-gray-400 font-medium font-sans">
                   <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> Generative AI (Google Cloud)</span>
                   <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> Machine Learning (Kaggle)</span>
                   <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> AI Foundations (DeepLearning.AI)</span>
                   <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> Python Engineering (HackerRank)</span>
                   <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> Computer Vision (OpenCV & Mediapipe)</span>
                 </div>
               </motion.div>
            </motion.div>
          </div>

          {/* BELOW Technical Mastery: Detailed Certifications Showcase */}
          <div className="mt-10 pt-10 border-t border-white/10 relative z-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-red-500 font-mono text-xs uppercase tracking-widest block mb-1">Accredited Pedigree</span>
                <h3 className="text-2xl md:text-3xl font-black uppercase font-heading text-white">
                  PROFESSIONAL CERTIFICATIONS
                </h3>
              </div>
              <a 
                href="https://www.linkedin.com/in/mitul-nayakwadi-6a3218319" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group inline-flex items-center gap-2 text-xs text-gray-400 hover:text-white hover:border-red-500/50 transition-all bg-white/5 border border-white/10 px-4 py-2 rounded-full cursor-pointer hover:bg-white/10"
                data-hover="true"
              >
                <Linkedin className="w-4 h-4 text-[#0a66c2]" />
                <span>Verify on LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Generative AI Fundamentals',
                  issuer: 'Google Cloud Training',
                  date: 'Issued 2024',
                  skills: ['Large Language Models', 'Image Generation', 'Prompt Design'],
                  icon: Globe,
                  link: 'https://www.linkedin.com/in/mitul-nayakwadi-6a3218319/details/certifications/'
                },
                {
                  title: 'Intro to Machine Learning',
                  issuer: 'Kaggle',
                  date: 'Issued 2023',
                  skills: ['Supervised Learning', 'Model Evaluation', 'Random Forests'],
                  icon: Brain,
                  link: 'https://www.linkedin.com/in/mitul-nayakwadi-6a3218319/details/certifications/'
                },
                {
                  title: 'AI For Everyone',
                  issuer: 'DeepLearning.AI',
                  date: 'Issued 2024',
                  skills: ['AI Strategy', 'Ethics & Bias', 'Project Management'],
                  icon: Award,
                  link: 'https://www.linkedin.com/in/mitul-nayakwadi-6a3218319/details/certifications/'
                },
                {
                  title: 'Python (Basic) Certification',
                  issuer: 'HackerRank',
                  date: 'Issued 2023',
                  skills: ['OOP Principles', 'Data Structures', 'Algorithmic Scripting'],
                  icon: Code,
                  link: 'https://www.linkedin.com/in/mitul-nayakwadi-6a3218319/details/certifications/'
                },
                {
                  title: 'Programming in Java',
                  issuer: 'NPTEL (SWAYAM)',
                  date: 'Issued 2024',
                  skills: ['Core Java', 'Multi-Threading', 'Exception Handling'],
                  icon: Trophy,
                  link: 'https://www.linkedin.com/in/mitul-nayakwadi-6a3218319/details/certifications/'
                }
              ].map((cert, index) => (
                <motion.div
                  key={cert.title}
                  variants={skillCardVariants}
                  className="group relative bg-[#0a0a0a] hover:bg-[#121212] p-6 rounded-2xl border border-white/10 hover:border-red-500/40 hover:shadow-lg hover:shadow-red-500/5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4 font-sans">
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:border-red-500/30 group-hover:bg-red-500/5 transition-all">
                        <cert.icon className="w-5 h-5 text-red-500" />
                      </div>
                      <span className="text-[10px] font-mono text-gray-500 tracking-wider uppercase">{cert.date}</span>
                    </div>

                    <h4 className="text-base font-bold text-white group-hover:text-red-400 transition-colors mb-1 font-heading">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-red-400 font-mono font-semibold mb-3 tracking-wide">{cert.issuer}</p>
                    
                    <div className="flex flex-wrap gap-1.5 mb-6 font-sans">
                      {cert.skills.map(skill => (
                        <span key={skill} className="px-2 py-0.5 bg-white/5 rounded text-[10px] text-gray-400 border border-white/5">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-white/5 hover:bg-red-600/10 border border-white/10 hover:border-red-500/30 text-xs text-gray-300 hover:text-white transition-all cursor-pointer font-medium font-mono uppercase tracking-wider"
                    data-hover="true"
                  >
                    <span>View Certificate</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SELECTED WORKS SECTION (Timeline-Based for high visibility) */}
      <section id="projects" className="relative z-10 min-h-[80svh] flex flex-col justify-center py-14 md:py-20 bg-gradient-to-b from-transparent via-[#050505]/45 to-transparent overflow-hidden">
        <div className="absolute top-1/4 left-[-10%] w-[45vw] h-[45vw] bg-red-900/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-[-10%] w-[45vw] h-[45vw] bg-rose-900/5 rounded-full blur-[130px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-4 md:px-6 relative">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-heading font-black uppercase leading-none tracking-tight text-white animate-fade-in">
              Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-500 font-bold">Works</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-red-600 to-rose-500 mx-auto mt-4 rounded-full" />
          </div>

          <motion.div 
            variants={projectsContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="relative border-l border-red-950 md:border-l-0 md:before:absolute md:before:left-1/2 md:before:top-0 md:before:bottom-0 md:before:w-px md:before:bg-gradient-to-b md:before:from-red-900/45 md:before:via-red-600 md:before:to-red-950/45"
          >
            {PROJECTS.map((project, idx) => {
              const align = idx % 2 === 0 ? 'left' : 'right';
              return (
                <motion.div 
                  key={project.id}
                  variants={projectCardVariants}
                  className={`relative mb-8 md:mb-10 last:mb-0 flex flex-col md:flex-row items-stretch ${
                    align === 'left' ? 'md:justify-start' : 'md:justify-end'
                  }`}
                >
                  {/* Timeline Junction Project Code Icon */}
                  <div 
                    onClick={() => setSelectedProject(project)}
                    className="absolute -left-[20px] md:left-1/2 md:-translate-x-1/2 top-4 w-8 h-8 rounded-full border border-red-500/40 flex items-center justify-center bg-black hover:border-red-500 hover:scale-110 transition-all z-20 shadow-[0_0_15px_rgba(239,68,68,0.25)] cursor-pointer"
                    data-hover="true"
                  >
                    <Code className="w-4 h-4 text-red-500" />
                  </div>
   
                  {/* Content Card container with specific alignment */}
                  <div className={`w-full md:w-[45%] pl-8 md:pl-0 ${
                    align === 'left' ? 'md:text-left md:pr-10' : 'md:text-left md:pl-10'
                  }`}>
                    <div 
                      onClick={() => setSelectedProject(project)}
                      className="group relative rounded-2xl border border-white/10 hover:border-red-500/45 overflow-hidden bg-white/[0.02] hover:bg-white/[0.05] hover:scale-[1.025] hover-pulse-glow active:scale-[0.99] transition-all duration-300 transform-gpu p-4 md:p-5 cursor-pointer flex flex-col"
                      data-hover="true"
                    >
                      {/* Interactive Tooltip indicating demo & repo availability */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none z-30">
                        <div className="bg-black/95 backdrop-blur-md border border-red-500/40 text-white text-[9px] font-mono px-2.5 py-1.5 rounded-lg shadow-[0_4px_12px_rgba(239,68,68,0.3)] flex items-center gap-1.5 font-bold tracking-wider uppercase">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                          </span>
                          {project.liveUrl && project.githubUrl ? (
                            <span>Demo + GitHub Live</span>
                          ) : project.liveUrl ? (
                            <span>Demo Live</span>
                          ) : project.githubUrl ? (
                            <span>GitHub Repo</span>
                          ) : (
                            <span>Project Details</span>
                          )}
                        </div>
                      </div>

                      {/* Project Image Panel */}
                      <div className="relative h-44 w-full overflow-hidden rounded-xl mb-4 bg-black/40">
                        <img 
                          src={project.image} 
                          alt={project.name} 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 will-change-transform"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <span className="absolute bottom-3 left-3 text-[9px] font-mono border border-white/20 px-2 py-0.5 rounded-full backdrop-blur-md bg-black/60 text-red-400 font-bold uppercase tracking-wider">
                          {project.category}
                        </span>
                      </div>

                      {/* Title & arrow */}
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-base md:text-lg font-bold font-heading text-white group-hover:text-red-400 transition-colors">
                          {project.name}
                        </h3>
                        <ArrowUpRight className="w-4 h-4 text-red-500 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>

                      <p className="text-xs text-gray-300 mb-4 font-light leading-relaxed line-clamp-3">
                        {project.description}
                      </p>

                      <div className="mt-auto border-t border-white/5 pt-3">
                        <span className="text-[10px] font-semibold tracking-widest text-red-500 font-mono block">
                          {project.techStack}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="relative z-10 min-h-[75svh] flex flex-col justify-center py-14 md:py-20 px-4 md:px-6 bg-gradient-to-b from-transparent via-[#050505]/35 to-transparent backdrop-blur-lg">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-8">
             <h2 className="text-3xl md:text-5xl font-heading font-black text-white mb-3 uppercase tracking-tight">
               LET'S BUILD <span className="text-red-500">TOGETHER</span>
             </h2>
             <p className="text-red-500 font-mono uppercase tracking-widest text-xs md:text-sm mb-3">
               Ready to collaborate on the next big thing?
             </p>
             <div className="flex items-center justify-center gap-2 text-gray-300 font-mono text-xs tracking-wide bg-white/5 border border-white/10 px-3 py-1.5 mt-4 rounded-full w-fit mx-auto backdrop-blur-sm hover:border-red-500/30 transition-colors">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                <span>Hyderabad, Telangana</span>
             </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <a 
              href="mailto:mitulnayakwadi@gmail.com"
              className="group p-5 md:p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all flex flex-col items-center gap-4"
              data-hover="true"
            >
              <div className="w-14 h-14 rounded-full bg-red-600/20 flex items-center justify-center text-red-500 mb-2 group-hover:scale-110 transition-transform">
                <Mail className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold">Email Me</h3>
              <p className="text-xs text-gray-400">mitulnayakwadi@gmail.com</p>
            </a>

            <a 
              href="https://github.com/MitulNayakwadi"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 md:p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all flex flex-col items-center gap-4"
              data-hover="true"
            >
              <div className="w-14 h-14 rounded-full bg-red-600/10 flex items-center justify-center text-red-500 mb-2 group-hover:scale-110 transition-transform">
                <Github className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold">GitHub</h3>
              <p className="text-xs text-gray-400">@MitulNayakwadi</p>
            </a>

            <a 
              href="https://linkedin.com/in/mitul-nayakwadi-6a3218319"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 md:p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all flex flex-col items-center gap-4"
              data-hover="true"
            >
              <div className="w-14 h-14 rounded-full bg-[#0a66c2]/20 flex items-center justify-center text-[#0a66c2] mb-2 group-hover:scale-110 transition-transform">
                <Linkedin className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold">LinkedIn</h3>
              <p className="text-xs text-gray-400">Connect Professionally</p>
            </a>
          </div>
        </div>
      </section>

      <footer className="relative z-10 py-12 bg-gradient-to-b from-transparent to-[#0a0a0a] backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
             <div className="font-heading text-xl font-bold tracking-tighter text-white">MITUL NAYAKWADI</div>
          </div>
          
          <div className="text-xs text-gray-500 text-center md:text-right">
            <div>© {new Date().getFullYear()} All Rights Reserved.</div>
            <div className="mt-1">Made with ❤️ by Mitul Nayakwadi</div>
          </div>
        </div>
      </footer>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-red-500/20 rounded-2xl"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors border border-white/10"
                data-hover="true"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); navigateProject('prev'); }}
                aria-label="Previous project"
                className="absolute left-4 bottom-4 translate-y-0 md:top-1/2 md:bottom-auto md:-translate-y-1/2 z-20 p-3 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors border border-white/10 backdrop-blur-sm"
                data-hover="true"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); navigateProject('next'); }}
                aria-label="Next project"
                className="absolute right-4 bottom-4 translate-y-0 md:top-1/2 md:bottom-auto md:-translate-y-1/2 z-20 p-3 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors border border-white/10 backdrop-blur-sm md:right-8"
                data-hover="true"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Side */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={selectedProject.id}
                    src={selectedProject.image} 
                    alt={selectedProject.name} 
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent md:bg-gradient-to-r" />
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 pb-24 md:p-12 flex flex-col justify-center relative">
                <motion.div
                  key={selectedProject.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <div className="flex items-center gap-3 text-red-500 mb-4 font-semibold">
                     <Layout className="w-4 h-4" />
                     <span className="font-mono text-sm tracking-widest uppercase">{selectedProject.category}</span>
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-heading font-bold uppercase leading-none mb-2 text-white">
                    {selectedProject.name}
                  </h3>
                  
                  <p className="text-lg text-rose-500 font-medium tracking-widest uppercase mb-6 font-mono text-xs md:text-sm">
                    {selectedProject.techStack}
                  </p>
                  
                  <div className="h-px w-20 bg-white/20 mb-6" />
                  
                  <p className="text-gray-300 leading-relaxed text-lg font-light mb-8">
                    {selectedProject.description}
                  </p>

                  <div className="flex flex-wrap gap-4">
                     {selectedProject.liveUrl && (
                       <a 
                         href={selectedProject.liveUrl} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="px-6 py-3 bg-red-600 text-white font-bold uppercase tracking-wider text-sm hover:bg-red-700 transition-colors rounded-lg flex items-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.3)]" 
                         data-hover="true"
                       >
                          Live Demo <ExternalLink className="w-4 h-4"/>
                       </a>
                     )}
                     {selectedProject.githubUrl && (
                       <a 
                         href={selectedProject.githubUrl} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="px-6 py-3 bg-white/10 text-white font-bold uppercase tracking-wider text-sm hover:bg-white/20 transition-colors border border-white/20 rounded-lg flex items-center gap-2 backdrop-blur-sm" 
                         data-hover="true"
                       >
                          View Code <Github className="w-4 h-4"/>
                       </a>
                     )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default App;
