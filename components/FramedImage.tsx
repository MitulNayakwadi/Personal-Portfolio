/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface FramedImageProps {
  frame: string;
  image: string;
  alt: string;
  className?: string;
}

const FramedImage: React.FC<FramedImageProps> = ({
  frame,
  image,
  alt,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={containerRef}
      className={`relative inline-block cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Image Background Layer - Positioned absolutely behind everything */}
      <motion.img
        src={image}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: -1 }}
        animate={{
          scale: isHovered ? 1.15 : 1,
          filter: isHovered
            ? 'brightness(1.1) saturate(1.2)'
            : 'brightness(0.9) saturate(0.8)'
        }}
        transition={{
          duration: 0.5,
          ease: [0.33, 1, 0.68, 1]
        }}
      />

      {/* Frame Overlay - On Top (Front Layer) */}
      <img
        src={frame}
        alt="Decorative frame"
        className="relative w-full h-full object-contain pointer-events-none block"
        style={{ zIndex: 10, position: 'relative' }}
      />
    </motion.div>
  );
};

export default FramedImage;
