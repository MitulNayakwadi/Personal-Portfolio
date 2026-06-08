import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ProfessionalPortfolio from './components/ProfessionalPortfolio';
import GamifiedPortfolio from './components/GamifiedPortfolio';
import ScrambleText from './components/ScrambleText';

function MainAppContent() {
  const { theme } = useTheme();
  const [introCompleted, setIntroCompleted] = useState(false);

  // Timer for the page-load glitch intro screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroCompleted(true);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  // Reset scroll position to top when theme changes
  useEffect(() => {
    if (introCompleted) {
      window.scrollTo(0, 0);
      const lenis = (window as any).lenisInstance;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
    }
  }, [theme, introCompleted]);

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
              className="text-[25px] sm:text-5xl md:text-6xl lg:text-8xl leading-none font-black font-heading tracking-tighter uppercase"
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
          key={theme}
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
        >
          {theme === 'light' ? (
            <ProfessionalPortfolio />
          ) : (
            <GamifiedPortfolio />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainAppContent />
    </ThemeProvider>
  );
}
