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
    const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
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
    const isTouchLike = query.matches || navigator.maxTouchPoints > 0;

    // Use native momentum scrolling on touch/mobile devices
    if (isTouchLike) {
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
        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <div className="relative min-h-screen text-slate-800 selection:bg-blue-100 selection:text-blue-900 bg-[#FAFAF8] font-body overflow-x-hidden antialiased">
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />
      <main className="pt-16">
        <Hero scrollToSection={scrollToSection} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
