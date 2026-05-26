import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ScrollHUD: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  // Smooth out scroll value for highly responsive animations (60fps lerp feel)
  const smoothProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 200 });

  // Map scrolling to telemetry values
  const indicatorWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const gearRotation = useTransform(smoothProgress, [0, 1], [0, 360]);
  const counterVal = useTransform(smoothProgress, [0, 1], [0, 100]);
  const coordY = useTransform(smoothProgress, [0, 1], [1024, 8432]);

  // Dynamic state tracked via motion values to prevent React re-render overheads
  const [percent, setPercent] = React.useState(0);
  const [coord, setCoord] = React.useState(1024);

  React.useEffect(() => {
    const unsubPercent = counterVal.on("change", (latest) => {
      setPercent(Math.floor(latest));
    });
    const unsubCoord = coordY.on("change", (latest) => {
      setCoord(Math.floor(latest));
    });
    return () => {
      unsubPercent();
      unsubCoord();
    };
  }, [counterVal, coordY]);

  // Dynamic status rail height
  const sideLineHeight = useTransform(smoothProgress, [0, 1], ["10vh", "80vh"]);

  return (
    <>
      {/* 1. SCROLL HUD GRADIENT TOP LASER LINE */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-white/5 z-[52] pointer-events-none">
        <motion.div 
          className="h-full bg-gradient-to-r from-red-650 via-rose-500 to-red-650 shadow-[0_0_12px_#ef4444]"
          style={{ width: indicatorWidth, originX: 0 }}
        />
      </div>
    </>
  );
};

export default ScrollHUD;
