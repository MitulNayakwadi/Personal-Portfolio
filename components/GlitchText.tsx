
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { motion } from 'framer-motion';

interface GradientTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isWhite?: boolean;
  variant?: 'cyan-flow' | 'red-flow' | 'white-red-glow' | 'red-mastery';
  isGlitchable?: boolean;
}

const GradientText: React.FC<GradientTextProps> = ({ 
  text, 
  as: Component = 'span', 
  className = '', 
  isWhite = false,
  variant = 'cyan-flow',
  isGlitchable = false
}) => {
  const [isGlitching, setIsGlitching] = React.useState(false);

  React.useEffect(() => {
    if (!isGlitchable) return;
    // Periodic auto-glitch effect every few seconds
    const interval = setInterval(() => {
      setIsGlitching(true);
      const timer = setTimeout(() => setIsGlitching(false), 250);
      return () => clearTimeout(timer);
    }, 3800);
    return () => clearInterval(interval);
  }, [isGlitchable]);

  // Setup tween & glitch keyframes for interactive/hover states
  const glitchTransition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.35,
  };

  const hoverGlitchKeyframes = {
    x: [0, -5, 4, -3, 5, -2, 0],
    y: [0, 2, -2, 1, -1, 1, 0],
    skewX: [0, -6, 6, -3, 3, 0],
    textShadow: [
      "none",
      "-3px 0 #ef4444, 3px 0 #991b1b",
      "3px -2px #ef4444, -3px 2px #7f1d1d",
      "-2px 3px #f43f5e, 2px -3px #990407",
      "none"
    ]
  };

  const autoGlitchKeyframes = {
    x: isGlitching ? [0, -3, 3, -1, 2, 0] : 0,
    y: isGlitching ? [0, 1, -2, 1, -1, 0] : 0,
    skewX: isGlitching ? [0, -4, 4, -2, 2, 0] : 0,
  };

  if (isGlitchable) {
    return (
      <motion.span
        className={`relative inline-block font-black tracking-tighter select-none cursor-pointer isolate ${className}`}
        initial={{ scale: 0.88, opacity: 0, y: 12 }}
        animate={{ 
          scale: 1, 
          opacity: 1, 
          y: 0,
          ...autoGlitchKeyframes
        }}
        whileHover={hoverGlitchKeyframes}
        whileTap={{ scale: 0.96 }}
        transition={{
          ...glitchTransition,
          scale: { type: "spring", stiffness: 380, damping: 13 }
        }}
      >
        {/* Red Accent Glow Behind */}
        <span className="absolute inset-0 -z-20 text-red-650/40 blur-xs pointer-events-none scale-105 select-none" aria-hidden="true">
          {text}
        </span>
        {/* Main sharp high-visibility white text */}
        <span className="relative z-10 block text-white drop-shadow-[0_2px_15px_rgba(239,68,68,0.4)]">
          {text}
        </span>
      </motion.span>
    );
  }

  if (isWhite || variant === 'white-red-glow') {
    return (
      <Component className={`relative inline-block font-black tracking-tighter text-white isolate ${className}`}>
        {/* Main white text */}
        <span className="relative z-10 block text-white drop-shadow-[0_2px_15px_rgba(255,255,255,0.2)]">
          {text}
        </span>
        {/* Red Blur Glow Effect behind */}
        <span
          className="absolute inset-0 -z-10 block bg-gradient-to-r from-red-600 via-rose-500 to-red-800 bg-[length:200%_auto] bg-clip-text text-transparent blur-xl md:blur-3xl opacity-65 select-none pointer-events-none"
          style={{ 
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            transform: 'translateZ(0)' 
          }}
          aria-hidden="true"
        >
          {text}
        </span>
      </Component>
    );
  }

  if (variant === 'red-mastery') {
    return (
      <Component className={`relative inline-block font-black tracking-tighter isolate ${className}`}>
        {/* Base layer/stroke to ensure maximum legibility */}
        <span className="absolute inset-0 -z-15 text-black font-black translate-y-[2px] opacity-90 select-none">
          {text}
        </span>
        
        {/* Main high-visibility white base to guarantee crisp visibility */}
        <span className="relative z-10 text-white select-none">
          {text}
        </span>

        {/* Floating animated flowing Red-to-Rose Gradient layering */}
        <motion.span
          className="absolute inset-0 z-20 block bg-gradient-to-r from-red-600 via-rose-500 via-red-600 to-red-800 bg-[length:200%_auto] bg-clip-text text-transparent select-none pointer-events-none"
          animate={{
            backgroundPosition: ['0% center', '200% center'],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ 
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            transform: 'translateZ(0)',
          }}
          aria-hidden="true"
        >
          {text}
        </motion.span>
        
        {/* Ambient Red glow layer */}
        <motion.span
          className="absolute inset-0 -z-10 block bg-gradient-to-r from-red-600 via-rose-500 to-red-800 bg-[length:200%_auto] bg-clip-text text-transparent blur-md opacity-85 select-none pointer-events-none"
          animate={{
            backgroundPosition: ['0% center', '200% center'],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ 
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            transform: 'translateZ(0)' 
          }}
          aria-hidden="true"
        >
          {text}
        </motion.span>
      </Component>
    );
  }

  // Default Cyan Flow
  return (
    <Component className={`relative inline-block font-black tracking-tighter isolate ${className}`}>
      {/* Main Gradient Text - Cyan -> Magenta -> Lime */}
      <motion.span
        className="absolute inset-0 z-10 block bg-gradient-to-r from-[#00F0FF] via-[#FF00AA] via-[#CCFF00] to-[#00F0FF] bg-[length:200%_auto] bg-clip-text text-transparent will-change-[background-position]"
        animate={{
          backgroundPosition: ['0% center', '200% center'],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
        aria-hidden="true"
        style={{ 
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        {text}
      </motion.span>
      
      {/* Base layer for solid white fallback */}
      <span 
        className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200 opacity-50"
        style={{ 
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent' 
        }}
      >
        {text}
      </span >
      
      {/* Blur Glow Effect */}
      <span
        className="absolute inset-0 -z-10 block bg-gradient-to-r from-[#00F0FF] via-[#FF00AA] to-[#CCFF00] bg-[length:200%_auto] bg-clip-text text-transparent blur-xl md:blur-2xl opacity-40"
        style={{ 
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          transform: 'translateZ(0)' 
        }}
      >
        {text}
      </span>
    </Component>
  );
};

export default GradientText;
