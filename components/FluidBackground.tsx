
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface FluidBackgroundProps {
  reducedMotion?: boolean;
}

const StarField: React.FC<{ reducedMotion?: boolean }> = ({ reducedMotion }) => {
  // Reduced star count for performance
  const stars = useMemo(() => {
    const starCount = reducedMotion ? 16 : 40;

    return Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 0.5,
      x: Math.random() * 100,
      y: Math.random() * 100,
      moveX: (Math.random() - 0.5) * (reducedMotion ? 8 : 15),
      moveY: (Math.random() - 0.5) * (reducedMotion ? 8 : 15),
      duration: Math.random() * (reducedMotion ? 10 : 15) + (reducedMotion ? 10 : 15),
      delay: Math.random() * (reducedMotion ? -8 : -20),
      opacity: Math.random() * (reducedMotion ? 0.25 : 0.4) + 0.1
    }));
  }, [reducedMotion]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white will-change-transform"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            x: [0, star.moveX, -star.moveX, 0],
            y: [0, star.moveY, star.moveY * 1.2, 0],
            opacity: [star.opacity, star.opacity * 2, star.opacity],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "linear",
            delay: star.delay,
          }}
        />
      ))}
    </div>
  );
};

const FluidBackground: React.FC<FluidBackgroundProps> = ({ reducedMotion = false }) => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-[#020000] via-[#0d0101] to-[#000000]">
      
      <StarField reducedMotion={reducedMotion} />

      {/* Blob 1: Deep Crimson Red */}
      <motion.div
        className={`absolute top-[-10%] left-[-10%] rounded-full mix-blend-screen filter will-change-transform ${reducedMotion ? 'w-[70vw] h-[70vw] bg-[#bd0306] blur-[72px] opacity-22' : 'w-[90vw] h-[90vw] bg-[#bd0306] blur-[100px] opacity-35'}`}
        animate={{
          x: reducedMotion ? [0, 20, -10, 0] : [0, 50, -25, 0],
          y: reducedMotion ? [0, -10, 10, 0] : [0, -25, 25, 0],
        }}
        transition={{
          duration: reducedMotion ? 36 : 25,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Blob 2: Dark Wine Burgundy */}
      <motion.div
        className={`absolute top-[20%] right-[-20%] rounded-full mix-blend-screen filter will-change-transform ${reducedMotion ? 'w-[80vw] h-[64vw] bg-[#610103] blur-[72px] opacity-20' : 'w-[100vw] h-[80vw] bg-[#610103] blur-[100px] opacity-35'}`}
        animate={{
          x: reducedMotion ? [0, -20, 10, 0] : [0, -50, 25, 0],
          y: reducedMotion ? [0, 20, -10, 0] : [0, 50, -25, 0],
        }}
        transition={{
          duration: reducedMotion ? 42 : 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Blob 3: Vivid Fire Red */}
      <motion.div
        className={`absolute bottom-[-20%] left-[20%] rounded-full mix-blend-screen filter will-change-transform ${reducedMotion ? 'w-[64vw] h-[64vw] bg-[#990407] blur-[72px] opacity-18' : 'w-[80vw] h-[80vw] bg-[#990407] blur-[100px] opacity-30'}`}
        animate={{
          x: reducedMotion ? [0, 25, -25, 0] : [0, 75, -75, 0],
          y: reducedMotion ? [0, -20, 20, 0] : [0, -50, 50, 0],
        }}
        transition={{
          duration: reducedMotion ? 48 : 35,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Static Grain Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black/95 pointer-events-none" />
    </div>
  );
};

export default FluidBackground;
