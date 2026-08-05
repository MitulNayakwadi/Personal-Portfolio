import React from 'react';
import { motion } from 'framer-motion';
import GlitterWrap from './GlitterWrap';

interface FluidBackgroundProps {
  reducedMotion?: boolean;
  isDarkMode?: boolean;
}

const AmbientBlobs: React.FC<{ reducedMotion?: boolean; isDarkMode?: boolean }> = ({ reducedMotion, isDarkMode }) => {
  return (
    <>
      {/* Blob 1: Deep Crimson Red */}
      <motion.div
        className={`absolute top-[-10%] left-[-10%] rounded-full mix-blend-screen filter will-change-transform transition-opacity duration-1000 pointer-events-none ${reducedMotion ? 'w-[70vw] h-[70vw] bg-[#bd0306] blur-[72px] opacity-22' : 'w-[90vw] h-[90vw] bg-[#bd0306] blur-[110px] opacity-35'}`}
        animate={{
          x: reducedMotion ? [0, 20, -10, 0] : [0, 50, -25, 0],
          y: reducedMotion ? [0, -10, 10, 0] : [0, -25, 25, 0],
        }}
        transition={{
          duration: reducedMotion ? 36 : 25,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ transform: 'translateZ(0)', opacity: isDarkMode ? 0.2 : 0.4 }}
      />

      {/* Blob 2: Dark Wine Burgundy */}
      <motion.div
        className={`absolute top-[30%] right-[-20%] rounded-full mix-blend-screen filter will-change-transform transition-opacity duration-1000 pointer-events-none ${reducedMotion ? 'w-[80vw] h-[64vw] bg-[#610103] blur-[72px] opacity-20' : 'w-[100vw] h-[80vw] bg-[#610103] blur-[120px] opacity-35'}`}
        animate={{
          x: reducedMotion ? [0, -20, 10, 0] : [0, -50, 25, 0],
          y: reducedMotion ? [0, 20, -10, 0] : [0, 50, -25, 0],
        }}
        transition={{
          duration: reducedMotion ? 42 : 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transform: 'translateZ(0)', opacity: isDarkMode ? 0.15 : 0.35 }}
      />

      {/* Blob 3: Vivid Fire Red */}
      <motion.div
        className={`absolute bottom-[-20%] left-[20%] rounded-full mix-blend-screen filter will-change-transform transition-opacity duration-1000 pointer-events-none ${reducedMotion ? 'w-[64vw] h-[64vw] bg-[#990407] blur-[72px] opacity-18' : 'w-[80vw] h-[80vw] bg-[#990407] blur-[110px] opacity-30'}`}
        animate={{
          x: reducedMotion ? [0, 25, -25, 0] : [0, 75, -75, 0],
          y: reducedMotion ? [0, -20, 20, 0] : [0, -50, 50, 0],
        }}
        transition={{
          duration: reducedMotion ? 48 : 35,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transform: 'translateZ(0)', opacity: isDarkMode ? 0.2 : 0.3 }}
      />
    </>
  );
};

const FluidBackground: React.FC<FluidBackgroundProps> = ({ reducedMotion = false, isDarkMode = false }) => {
  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden transition-colors duration-1000 ${isDarkMode ? 'bg-[#020204]' : 'bg-[#050507]'}`}>
      
      {/* Ambient Red Glow Blobs */}
      <AmbientBlobs reducedMotion={reducedMotion} isDarkMode={isDarkMode} />

      {/* GlitterWrap Starfield Warp Tunnel Canvas */}
      {!reducedMotion && (
        <div className="absolute inset-0 pointer-events-none z-0">
          <GlitterWrap
            particleCount={reducedMotion ? 250 : 550}
            color1="#ff1e27"
            color2="#e60026"
            color3="#ffffff"
            speed={4}
            starSize={16}
            glitterIntensity={4}
            turbulence={1.2}
            trailAmount={90}
            reverse={false}
            density={100}
            focalDepth={13}
            brightness={100}
          />
        </div>
      )}

      {/* Grain & Noise Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.08] mix-blend-overlay pointer-events-none z-10" />

      {/* Dark Vignette Frame */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.85)_100%)] pointer-events-none z-20" />
    </div>
  );
};

export default FluidBackground;
