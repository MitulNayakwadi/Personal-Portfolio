import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isClicking, setIsClicking] = useState(false);
  const clickEffectRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect if device is touch-based (mobile/tablet)
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

    // If touch device, don't set up cursor listeners
    if (isTouchDevice) return;

    // Hotspot offset: tip of the finger for the pointer image.
    const pointerHotspot = { x: 6, y: 2 };

    const move = (e: MouseEvent) => {
      if (!cursorRef.current) return;

      // Position the cursor so the image hotspot aligns with the actual pointer
      cursorRef.current.style.left = `${e.clientX - pointerHotspot.x}px`;
      cursorRef.current.style.top = `${e.clientY - pointerHotspot.y}px`;
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      
      // Create click effect at cursor position
      if (clickEffectRef.current) {
        const clickDiv = document.createElement('div');
        clickDiv.className = 'cursor-click-effect';
        clickDiv.style.left = `${e.clientX}px`;
        clickDiv.style.top = `${e.clientY}px`;
        clickEffectRef.current.appendChild(clickDiv);
        
        // Remove after animation
        setTimeout(() => clickDiv.remove(), 600);
      }
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isTouchDevice]);

  // Don't render cursor on touch devices
  if (isTouchDevice) return null;

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