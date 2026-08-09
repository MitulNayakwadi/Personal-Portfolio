import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '../ThemeToggle';
import MagneticButton from '../MagneticButton';

interface Props {
  activeSection: string;
  scrollToSection: (id: string) => void;
}

const NAV_ITEMS = [
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Education', id: 'education' },
  { label: 'Skills', id: 'skills' },
  { label: 'Certifications', id: 'certifications' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
];

export default function Navbar({ activeSection, scrollToSection }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 85);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileClick = (id: string) => {
    setMobileMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled
        ? 'bg-[#FAFAF8]/95 backdrop-blur-md border-slate-200/80 py-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]'
        : 'bg-transparent border-transparent py-5'
        }`}
    >
      {/* Top Reading Scroll Progress Bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2.5px] bg-[#2563EB] origin-left z-50 shadow-[0_0_8px_rgba(37,99,235,0.6)]"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="max-w-[900px] mx-auto px-6 flex items-center justify-between">
        {/* Logo / Name */}
        <button
          onClick={() => scrollToSection('hero')}
          className="font-display text-lg font-extrabold text-[#1A1A2E] tracking-tight hover:text-[#2563EB] transition-colors bg-transparent border-none cursor-pointer flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]"></span>
          <span>Mitul Nayakwadi</span>
        </button>

        {/* Right side: Nav + Toggle + Hamburger */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-6 text-sm font-body font-medium text-slate-650">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative py-1 hover:text-[#1A1A2E] transition-colors bg-transparent border-none cursor-pointer ${isActive ? 'text-[#1A1A2E] font-bold' : ''
                    }`}
                  data-hover="true"
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#2563EB] rounded-full shadow-[0_0_6px_rgba(37,99,235,0.4)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <ThemeToggle />

          <div className="hidden sm:block">
            <MagneticButton
              label="CONNECT"
              link="https://www.linkedin.com/in/mitul-nayakwadi/"
              newTab={true}
              paddingX={18}
              paddingY={7}
              font={{
                fontFamily: "Inter, sans-serif",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "-0.01em",
              }}
              fill="#2563EB"
              textColor="#FFFFFF"
              sweepColor="#AB0101"
              sweepTextColor="#FFFFFF"
              border={false}
            />
          </div>

          {/* Hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:text-navy cursor-pointer flex items-center justify-center shadow-sm"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="sm:hidden bg-[#FAFAF8] border-b border-slate-200 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMobileClick(item.id)}
                  className={`text-left py-2 text-md font-body font-medium transition-colors bg-transparent border-none cursor-pointer ${activeSection === item.id ? 'text-[#2563EB] font-bold' : 'text-slate-650'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

