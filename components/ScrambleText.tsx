import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ScrambleTextProps {
  text: string;
  className?: string;
  splitColors?: boolean;
}

interface CharStatus {
  char: string;
  isResolved: boolean;
  colorType?: 'white' | 'red';
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({ text, className, splitColors = true }) => {
  const spaceIndex = text.indexOf(' ');
  const [displayText, setDisplayText] = useState<CharStatus[]>(() =>
    text.split('').map((char, index) => ({
      char: index === 0 ? char : ' ',
      isResolved: index === 0,
    }))
  );
  const [trigger, setTrigger] = useState(0);

  // Cyberpunky high-contrast glyphs
  const glyphs = 'X/_[]{}|?@#$%=+*0101▲▼▰▱◆◇';

  // Periodic automatic trigger every 5.5 seconds
  useEffect(() => {
    const autoInterval = setInterval(() => {
      setTrigger(p => p + 1);
    }, 5500);

    return () => clearInterval(autoInterval);
  }, []);

  useEffect(() => {
    const chars = text.split('');
    
    // Start with only the first character visible (e.g. 'M'), and all other characters blank/empty
    const initialState = chars.map((char, index) => ({
      char: index === 0 ? char : ' ',
      isResolved: index === 0,
      colorType: 'white' as const,
    }));
    setDisplayText(initialState);

    const activeIntervals: NodeJS.Timeout[] = [];

    chars.forEach((char, index) => {
      if (index === 0) {
        let flickerCount = 0;
        const firstCharInterval = setInterval(() => {
          if (flickerCount < 3) {
            setDisplayText((prev) => {
              const next = [...prev];
              const isGlyph = Math.random() > 0.5;
              next[0] = {
                char: isGlyph ? glyphs[Math.floor(Math.random() * glyphs.length)] : chars[0],
                isResolved: !isGlyph,
                colorType: Math.random() > 0.5 ? 'red' : 'white',
              };
              return next;
            });
            flickerCount++;
          } else {
            setDisplayText((prev) => {
              const next = [...prev];
              next[0] = { char: chars[0], isResolved: true };
              return next;
            });
            clearInterval(firstCharInterval);
          }
        }, 60);
        activeIntervals.push(firstCharInterval);
        return;
      }

      if (char === ' ') {
        setTimeout(() => {
          setDisplayText((prev) => {
            const next = [...prev];
            next[index] = { char: ' ', isResolved: true };
            return next;
          });
        }, index * 40);
        return;
      }

      const delay = index * 45;
      const scrambleDuration = 180 + Math.random() * 150;
      const startTime = Date.now() + delay;

      const intervalId = setInterval(() => {
        const now = Date.now();
        if (now < startTime) {
          setDisplayText((prev) => {
            const next = [...prev];
            next[index] = { char: ' ', isResolved: false };
            return next;
          });
        } else if (now >= startTime && now < startTime + scrambleDuration) {
          setDisplayText((prev) => {
            const next = [...prev];
            next[index] = {
              char: glyphs[Math.floor(Math.random() * glyphs.length)],
              isResolved: false,
              colorType: Math.random() > 0.45 ? 'red' : 'white',
            };
            return next;
          });
        } else {
          setDisplayText((prev) => {
            const next = [...prev];
            next[index] = { char: char, isResolved: true };
            return next;
          });
          clearInterval(intervalId);
        }
      }, 25);

      activeIntervals.push(intervalId);
    });

    return () => {
      activeIntervals.forEach((id) => clearInterval(id));
    };
  }, [text, trigger]);

  return (
    <motion.span 
      className={`inline-block font-heading font-black select-none tracking-tighter cursor-pointer relative ${className}`}
      onClick={() => setTrigger(p => p + 1)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Absolute Shadow effect */}
      <span className="absolute inset-0 -z-10 text-transparent font-heading select-none pointer-events-none translate-y-[3px] opacity-10 flex justify-center">
        {displayText.map(item => item.char).join('')}
      </span>
      
      {/* Main text container with glitch & red/white split rendering */}
      <span className="relative z-10 flex flex-row items-center justify-center select-none whitespace-nowrap">
        {displayText.map((item, idx) => {
          let charColorClass = "";
          let shadowStyle: React.CSSProperties = {};

          if (!item.isResolved && item.char !== ' ') {
            if (item.colorType === 'red') {
              charColorClass = "text-red-500";
              shadowStyle = { textShadow: '0 0 10px rgba(239, 68, 68, 0.95), 0 0 20px rgba(239, 68, 68, 0.6)' };
            } else {
              charColorClass = "text-white";
              shadowStyle = { textShadow: '0 0 8px rgba(255, 255, 255, 0.9), 0 0 16px rgba(255, 255, 255, 0.5)' };
            }
          } else {
            // Settled state: MUST be solid pure white
            charColorClass = "text-white";
          }

          return (
            <span 
              key={idx} 
              className={`inline-block font-heading transition-colors duration-75 ${charColorClass}`}
              style={{
                ...shadowStyle,
                transform: !item.isResolved && item.char !== ' '
                  ? `skewX(${Math.random() > 0.5 ? '12' : '-12'}deg) scale(${0.85 + Math.random() * 0.3}) translateY(${Math.random() > 0.5 ? '2px' : '-2px'})`
                  : 'none',
              }}
            >
              {item.char === ' ' ? '\u00A0' : item.char}
            </span>
          );
        })}
      </span>
    </motion.span>
  );
};

export default ScrambleText;
