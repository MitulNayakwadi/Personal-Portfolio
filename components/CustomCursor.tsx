import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

// --- HAND-CRAFTED HIGH RESOLUTION FALLBACK ICON ---
// Glowing Crimson Runic Gemstone Crystal Core
const FallbackCrystalIcon: React.FC = () => (
  <svg 
    width="54" 
    height="54" 
    viewBox="0 0 64 64" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="drop-shadow-[0_0_15px_rgba(239,68,68,0.8)] filter contrast-125"
  >
    <defs>
      <linearGradient id="gCrystal" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f43f5e" />
        <stop offset="50%" stopColor="#e11d48" />
        <stop offset="100%" stopColor="#881337" />
      </linearGradient>
      <linearGradient id="gSlate" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#475569" />
        <stop offset="40%" stopColor="#1e293b" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
      <filter id="rGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2.5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <g transform="translate(1, 1)">
      {/* Silhouette Ring */}
      <path 
        d="M32,2 L52,18 L48,46 L32,60 L16,46 L12,18 Z" 
        fill="#020000" 
        stroke="#000000" 
        strokeWidth="5" 
        strokeLinejoin="round"
      />
      {/* Stone Frame */}
      <path 
        d="M32,4 L50,19 L46,44 L32,58 L18,44 L14,19 Z" 
        fill="url(#gSlate)" 
        stroke="#000000" 
        strokeWidth="2" 
        strokeLinejoin="round"
      />
      {/* Main Core Crystal */}
      <path 
        d="M32,10 L44,22 L40,40 L32,50 L24,40 L20,22 Z" 
        fill="url(#gCrystal)" 
        stroke="#f43f5e" 
        strokeWidth="1.5" 
        strokeLinejoin="round"
      />
      {/* Geometric Facets */}
      <line x1="32" y1="10" x2="32" y2="50" stroke="#fecdd3" strokeWidth="1.2" opacity="0.65" />
      <line x1="32" y1="28" x2="44" y2="22" stroke="#fda4af" strokeWidth="1" opacity="0.5" />
      <line x1="32" y1="28" x2="20" y2="22" stroke="#fda4af" strokeWidth="1" opacity="0.5" />
      {/* Mystic Glowing Runic Glyphs */}
      <g filter="url(#rGlow)">
        <path 
          d="M32,20 L30,28 L34,28 Z M32,28 L32,36 M29,33 L35,33" 
          stroke="#ffffff" 
          strokeWidth="2" 
          strokeLinecap="round" 
        />
      </g>
    </g>
  </svg>
);

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  // Fallback state if PNG is not in folders or fails loading
  const [imageErrorDefault, setImageErrorDefault] = useState(false);

  // Mouse screen coordinate state
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // High responsiveness physical spring configuration for real feedback tracking (60fps lerp feel)
  const springConfig = { damping: 32, stiffness: 850, mass: 0.05 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    // 1. Detect device form factor (disable custom cursor on touch/mobile)
    const checkFormFactor = () => {
      const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
      const isNarrow = window.matchMedia('(max-width: 768px)').matches;
      setIsMobile(isTouch || isNarrow);
    };

    checkFormFactor();
    window.addEventListener('resize', checkFormFactor);

    // 2. Hide default system browser cursor cleanly
    if (!isMobile) {
      document.documentElement.style.cursor = 'none';
      document.body.style.cursor = 'none';
    }

    // 3. Track mouse moves and detect hover elements dynamically
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      if (!target) return;

      const interactive = target.closest('a') || 
                          target.closest('button') || 
                          target.closest('input') || 
                          target.closest('textarea') || 
                          target.closest('select') || 
                          target.closest('summary') || 
                          target.closest('[role="button"]') || 
                          target.closest('[role="link"]') || 
                          target.closest('li') ||
                          target.closest('.cursor-pointer') || 
                          target.closest('[data-hover="true"]');
      setIsHovering(!!interactive);
    };

    // 4. Click animation triggers (Contract scale)
    const handleMouseDown = (e: MouseEvent) => {
      setIsClicked(true);
      // Generate instant interactive pulse ripple
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY
      };
      setRipples(prev => [...prev, newRipple]);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('resize', checkFormFactor);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.style.cursor = '';
      document.body.style.cursor = '';
    };
  }, [mouseX, mouseY, isMobile]);

  // Touch device safe guard
  if (isMobile) {
    return null;
  }

  return (
    <>
      {/* 1. SECURE BROWSER CURSOR ERADICATION INJECTOR */}
      {/* Insures the standard browser cursor (e.g. text cursors, click hand icons) is never shown under any state on desktop */}
      <style>{`
        *, *::before, *::after {
          cursor: none !important;
        }
      `}</style>

      {/* 2. 2D FIXED INTENSE RIPPLES LAYER */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="fixed rounded-full pointer-events-none z-[9998]"
            style={{
              left: ripple.x,
              top: ripple.y,
              x: '-50%',
              y: '-50%',
              width: 12,
              height: 12,
              border: '2px solid rgba(239, 68, 68, 0.75)',
              background: 'radial-gradient(circle, rgba(239,68,68,0.2) 0%, rgba(239,68,68,0) 70%)',
              boxShadow: '0 0 10px rgba(239, 68, 68, 0.4), inset 0 0 10px rgba(239, 68, 68, 0.3)',
            }}
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 6, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            onAnimationComplete={() => {
              setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
            }}
          />
        ))}
      </AnimatePresence>

      {/* 3. CORE MOUSE TRACKING MATRIX CONTAINER */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:flex items-center justify-center will-change-transform"
        style={{ 
          x, 
          y,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            scale: isClicked ? 0.8 : isHovering ? 1.2 : 0.95,
            // Base tilt of -30 degrees to lean in the classic backslash "\" pointing north-west style
            rotate: isHovering ? [-30, -34, -26, -30] : -30,
          }}
          transition={{
            type: 'spring',
            stiffness: 550,
            damping: 24,
            rotate: { duration: 0.3, ease: "easeInOut" }
          }}
          className={`flex items-center justify-center relative transition-all duration-300 ${
            isHovering 
              ? 'filter drop-shadow-[0_0_20px_rgba(239,68,68,0.85)] scale-110' 
              : 'filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.65)]'
          }`}
        >
          {/* Always show the Runic Ruby Crystal custom cursor */}
          {!imageErrorDefault ? (
            <img 
              src="/cursor.png" 
              alt="Custom Crystal Cursor"
              onError={() => setImageErrorDefault(true)}
              className="w-12 h-12 object-contain select-none pointer-events-none"
              referrerPolicy="no-referrer"
            />
          ) : (
            <FallbackCrystalIcon />
          )}
        </motion.div>
      </motion.div>
    </>
  );
};

export default CustomCursor;
