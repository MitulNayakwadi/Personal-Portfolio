import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const { theme } = useTheme();
  const [isClicking, setIsClicking] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Motion coordinates for smooth spring trail animations
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { stiffness: 450, damping: 28 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const clickEffectRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null); // For legacy dark mode absolute pointer image positioning

  useEffect(() => {
    const checkTouchDevice = () => {
      const hasTouch = () => {
        return (
          (typeof window !== 'undefined' &&
            ('ontouchstart' in window ||
              navigator.maxTouchPoints > 0 ||
              (navigator as any).msMaxTouchPoints > 0)) ||
          window.matchMedia('(hover: none) and (pointer: coarse)').matches
        );
      };
      setIsTouchDevice(hasTouch());
    };

    checkTouchDevice();
    
    if (isTouchDevice) {
      document.body.classList.remove('has-custom-cursor');
      return;
    }

    // Add CSS class to hide browser cursor since custom cursor is active
    document.body.classList.add('has-custom-cursor');

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Dark mode legacy absolute coordinate mapping
      if (theme === 'dark' && cursorRef.current) {
        const pointerHotspot = { x: 6, y: 2 };
        cursorRef.current.style.left = `${e.clientX - pointerHotspot.x}px`;
        cursorRef.current.style.top = `${e.clientY - pointerHotspot.y}px`;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      
      // Click ripple wave generator
      if (clickEffectRef.current) {
        const clickDiv = document.createElement('div');
        clickDiv.className = theme === 'light' ? 'cursor-click-effect-light' : 'cursor-click-effect';
        clickDiv.style.left = `${e.clientX}px`;
        clickDiv.style.top = `${e.clientY}px`;
        clickEffectRef.current.appendChild(clickDiv);
        setTimeout(() => clickDiv.remove(), 600);
      }
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    // Listen to hovering state on interactive nodes
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const hoverElement = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.getAttribute('data-hover') === 'true' ||
        target.closest('[data-hover="true"]');

      setIsHoveringLink(!!hoverElement);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);
    
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.classList.remove('has-custom-cursor');
    };
  }, [isTouchDevice, theme, cursorX, cursorY]);

  if (isTouchDevice) return null;

  if (theme === 'light') {
    // Professional Light Mode: Blue dot (2 concentric circles, inside one filled)
    return (
      <>
        {/* Outer concentric trailing circle */}
        <motion.div
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: '-50%',
            translateY: '-50%',
            pointerEvents: 'none',
            zIndex: 9999,
          }}
          animate={{
            width: isHoveringLink ? 38 : isClicking ? 18 : 26,
            height: isHoveringLink ? 38 : isClicking ? 18 : 26,
            backgroundColor: isHoveringLink ? 'rgba(37, 99, 235, 0.08)' : 'rgba(37, 99, 235, 0)',
            borderColor: isClicking ? '#1d4ed8' : '#2563EB',
          }}
          transition={{ type: 'spring', stiffness: 450, damping: 30 }}
          className="border border-[#2563EB] rounded-full"
        />

        {/* Inner concentric filled dot */}
        <motion.div
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
            pointerEvents: 'none',
            zIndex: 9999,
          }}
          animate={{
            width: isHoveringLink ? 8 : isClicking ? 4 : 6,
            height: isHoveringLink ? 8 : isClicking ? 4 : 6,
          }}
          className="bg-[#2563EB] rounded-full"
        />

        <div ref={clickEffectRef} className="cursor-click-effects" />
      </>
    );
  }

  // Gamified Dark Mode: Original red crystal pointer
  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor pointer transition-transform ${
          isClicking ? "scale-75" : "scale-100"
        }`}
      />
      <div ref={clickEffectRef} className="cursor-click-effects" />
    </>
  );
}