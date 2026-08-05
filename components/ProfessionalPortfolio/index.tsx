import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Experience from './Experience';
import Education from './Education';
import Certifications from './Certifications';
import Contact from './Contact';
import Footer from './Footer';

declare global {
  interface Window {
    lenisInstance?: Lenis;
  }
}

export default function ProfessionalPortfolio() {
  const [activeSection, setActiveSection] = useState('hero');

  // Sync active section based on scroll position
  const syncActiveSection = () => {
    const sections = ['hero', 'about', 'experience', 'education', 'skills', 'certifications', 'projects', 'contact'];
    const scrollPosition = window.scrollY + 220; // Trigger threshold

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

  useEffect(() => {
    window.addEventListener('scroll', syncActiveSection, { passive: true });
    // Run initial parse
    syncActiveSection();
    return () => window.removeEventListener('scroll', syncActiveSection);
  }, []);

  // Initialize Lenis for premium smooth momentum scrolling
  useEffect(() => {
    const query = window.matchMedia('(hover: none) and (pointer: coarse)');
    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isTouchLike = query.matches || navigator.maxTouchPoints > 0;

    // Use native scrolling for touch/mobile and reduced-motion users
    if (isTouchLike || reduceMotionQuery.matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.4, // Kinetic slide friction duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard easeOutExpo easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    window.lenisInstance = lenis;

    lenis.on('scroll', () => {
      syncActiveSection();
    });

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
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const elementHeight = element.offsetHeight;
      const navbarHeight = 80;
      const centerScroll = elementPosition + (elementHeight / 2) - (window.innerHeight / 2);
      const minScroll = elementPosition - navbarHeight;
      const targetScroll = id === 'hero' ? 0 : Math.min(minScroll, centerScroll);

      if (window.lenisInstance) {
        window.lenisInstance.scrollTo(targetScroll, {
          duration: 1.3,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({
          top: targetScroll,
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      }
    }
  };

  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen text-slate-800 selection:bg-blue-100 selection:text-blue-900 bg-[#FAFAF8] font-body overflow-x-hidden antialiased">
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />
      <main className="pt-16">
        <Hero scrollToSection={scrollToSection} />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Certifications />
        <Projects />
        <Contact />
      </main>

      {/* Floating Back to Top Action */}
      {showBackToTop && (
        <button
          onClick={() => scrollToSection('hero')}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#2563EB] hover:bg-blue-700 text-white shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border-none cursor-pointer flex items-center justify-center"
          title="Back to Top"
          aria-label="Back to Top"
          data-hover="true"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      <Footer />
    </div>
  );
}
