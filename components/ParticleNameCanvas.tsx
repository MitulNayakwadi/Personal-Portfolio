import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  size: number;
  color: 'white' | 'red';
  alpha: number;
  angle: number;
  speed: number;
  delay: number;
}

interface ParticleNameCanvasProps {
  className?: string;
}

export const ParticleNameCanvas: React.FC<ParticleNameCanvasProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [assembled, setAssembled] = useState(false);
  const [triggerState, setTriggerState] = useState<'combining' | 'scattered'>('combining');
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  // Scan text to find point targets
  const scanTextPoints = (width: number, height: number, isMobile: boolean) => {
    const offCanvas = document.createElement('canvas');
    offCanvas.width = width;
    offCanvas.height = height;
    const offCtx = offCanvas.getContext('2d');
    if (!offCtx) return [];

    // Dark clear background for accurate text scanning contrasts
    offCtx.fillStyle = '#000000';
    offCtx.fillRect(0, 0, width, height);

    // Text configuration
    let fontSize = 0;
    let lines: string[] = [];

    fontSize = Math.floor(width * 0.082);
    if (isMobile) {
      fontSize = Math.floor(width * 0.08);
      if (fontSize > 40) fontSize = 40;
      if (fontSize < 18) fontSize = 18;
    } else {
      if (fontSize > 72) fontSize = 72;
      if (fontSize < 36) fontSize = 36;
    }
    
    offCtx.font = `900 ${fontSize}px "Inter", "Space Grotesk", sans-serif`;
    lines = ["MITUL NAYAKWADI"];

    offCtx.textAlign = 'center';
    offCtx.textBaseline = 'middle';
    offCtx.fillStyle = '#ffffff';

    // Draw lines (always a crisp unified single line)
    offCtx.fillText(lines[0], width / 2, height / 2);

    // Scan pixels
    const imgData = offCtx.getImageData(0, 0, width, height).data;
    const targets: { x: number; y: number }[] = [];
    const step = isMobile ? 3 : 3.5; // spaced step to prevent bulky overlapping points

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const idx = (Math.floor(y) * width + Math.floor(x)) * 4;
        const r = imgData[idx];
        if (r > 120) { // bright text pixel
          targets.push({
            x: x,
            y: y,
          });
        }
      }
    }
    return targets;
  };

  // The particle state remains in 'combining' to stay assembled forever while allowing mouse interaction.

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let animFrameId: number;
    let isMobile = window.innerWidth < 640;

    const initCanvas = () => {
      isMobile = window.innerWidth < 640;
      const width = container.clientWidth || 800;
      const height = isMobile ? 100 : 140;

      // Fit to high density retina display
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);

      // Scan letters
      const scannedPoints = scanTextPoints(width, height, isMobile);

      // Map scanned points into particles (combine red & white)
      const particleList: Particle[] = scannedPoints.map((pt, index) => {
        // Red vs. White allocation (50/50 balance)
        const color: 'white' | 'red' = index % 2 === 0 ? 'white' : 'red';

        // White particles spawn on the LEFT, Red spawn on the RIGHT
        let initialX = 0;
        let initialY = Math.random() * height;

        if (color === 'white') {
          initialX = Math.random() * (width * 0.3) - 100;
        } else {
          initialX = Math.random() * (width * 0.3) + (width * 0.7) + 100;
        }

        return {
          x: initialX,
          y: initialY,
          targetX: pt.x,
          targetY: pt.y,
          vx: (Math.random() - 0.5) * 2.0,
          vy: (Math.random() - 0.5) * 2.0,
          size: Math.random() * 1.8 + 1.6, // larger size for crisp bold appearance
          color,
          alpha: 0.1, // starts partially visible for visual guidance
          angle: Math.random() * Math.PI * 2,
          speed: 0.15 + Math.random() * 0.35,
          delay: Math.random() * 30, // shorter delays for quicker action
        };
      });

      particlesRef.current = particleList;
    };

    initCanvas();

    // Resize handling
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        initCanvas();
      }, 250);
    };
    window.addEventListener('resize', handleResize);

    // Mouse movement interaction tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
          active: true
        };
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current.active = false;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd);

    // Main Canvas Render Loop
    const ctx = canvas.getContext('2d');
    
    const render = () => {
      if (!ctx || particlesRef.current.length === 0) {
        animFrameId = requestAnimationFrame(render);
        return;
      }

      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      
      // PERFECTLY TRANSPARENT CANVAS: clear absolute background (remove secondary fills)
      ctx.clearRect(0, 0, w, h);

      const mouse = mouseRef.current;
      let allSettled = true;

      // Update and draw particles
      particlesRef.current.forEach((p) => {
        if (p.delay > 0) {
          p.delay -= 1;
          return;
        }

        let forceX = 0;
        let forceY = 0;

        if (triggerState === 'combining') {
          if (p.alpha < 1) {
            p.alpha += 0.08;
          }

          const dxToTarget = p.targetX - p.x;
          const dyToTarget = p.targetY - p.y;
          const distToTarget = Math.sqrt(dxToTarget * dxToTarget + dyToTarget * dyToTarget);

          if (distToTarget > 1.2) {
            allSettled = false;
            
            // Vortex swirl pull when far from target coordinates
            if (distToTarget > 80) {
              const swirlAngle = Math.atan2(dyToTarget, dxToTarget) + 0.35;
              const swirlSpeed = 1.3 * p.speed;
              forceX += Math.cos(swirlAngle) * swirlSpeed;
              forceY += Math.sin(swirlAngle) * swirlSpeed;
            }

            const targetSpeed = 0.045 + (1 - p.speed) * 0.055;
            forceX += dxToTarget * targetSpeed;
            forceY += dyToTarget * targetSpeed;
          } else {
            p.x = p.targetX;
            p.y = p.targetY;
            p.vx = 0;
            p.vy = 0;
          }
        } else {
          p.angle += 0.012 * p.speed;
          forceX += Math.cos(p.angle) * 0.12;
          forceY += Math.sin(p.angle) * 0.12;
          allSettled = false;
        }

        // Mouse Repulsion
        if (mouse.active) {
          const dxToMouse = p.x - mouse.x;
          const dyToMouse = p.y - mouse.y;
          const distToMouse = Math.sqrt(dxToMouse * dxToMouse + dyToMouse * dyToMouse);
          const repelRadius = isMobile ? 55 : 85;

          if (distToMouse < repelRadius) {
            const forcePercent = (repelRadius - distToMouse) / repelRadius;
            const repelAngle = Math.atan2(dyToMouse, dxToMouse);
            const repelStrength = isMobile ? 3.5 : 5.5;
            const pushX = Math.cos(repelAngle) * forcePercent * repelStrength;
            const pushY = Math.sin(repelAngle) * forcePercent * repelStrength;
            
            p.vx += pushX;
            p.vy += pushY;
          }
        }

        p.vx += forceX;
        p.vy += forceY;

        const drag = triggerState === 'combining' ? 0.82 : 0.94;
        p.vx *= drag;
        p.vy *= drag;

        p.x += p.vx;
        p.y += p.vy;

        // Particle Colors logic
        // Red particles start fully red and blend completely into white as they settle
        let fillStyle = '#ffffff';

        if (p.color === 'red') {
          if (triggerState === 'combining') {
            const dx = p.targetX - p.x;
            const dy = p.targetY - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const maxDist = 75; // outer distance boundary (fully red)
            const minDist = 12; // inner distance boundary (fully white)
            let redRatio = 0;

            if (dist > maxDist) {
              redRatio = 1;
            } else if (dist < minDist) {
              redRatio = 0;
            } else {
              redRatio = (dist - minDist) / (maxDist - minDist);
            }

            // Interpolating RGB values from Scarlet/Red to pure white as it converges
            const r = Math.round(255 - (255 - 239) * redRatio);
            const g = Math.round(255 - (255 - 68) * redRatio);
            const b = Math.round(255 - (255 - 68) * redRatio);
            fillStyle = `rgb(${r}, ${g}, ${b})`;
          } else {
            fillStyle = '#ef4444'; // Red particles are purely red during scattered phase
          }
        }

        ctx.fillStyle = fillStyle;
        ctx.globalAlpha = p.alpha;

        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
      });

      ctx.globalAlpha = 1.0;
      setAsassembled(allSettled && triggerState === 'combining');

      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      cancelAnimationFrame(animFrameId);
    };
  }, [triggerState]);

  return (
    <div 
      ref={containerRef} 
      className={`relative select-none flex flex-col items-center justify-center cursor-pointer overflow-visible ${className}`}
    >
      <canvas ref={canvasRef} className="block relative z-10" />
    </div>
  );
};

export default ParticleNameCanvas;
