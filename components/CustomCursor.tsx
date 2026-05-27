import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    // Hotspot offset: where the "active point" of the cursor image is, relative to top-left
    const defaultHotspot = { x: 20, y: 20 }; // centered hotspot for default cursor image
    const pointerHotspot = { x: 6, y: 2 }; // tip of the finger for pointer image (tweak as needed)

    const move = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const pointer =
        window.getComputedStyle(target).cursor === "pointer" ||
        ["A", "BUTTON"].includes(target.tagName);

      setIsPointer(pointer);

      if (!cursorRef.current) return;

      const hotspot = pointer ? pointerHotspot : defaultHotspot;
      // Position the cursor so the image hotspot aligns with the actual pointer
      cursorRef.current.style.left = `${e.clientX - hotspot.x}px`;
      cursorRef.current.style.top = `${e.clientY - hotspot.y}px`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isPointer ? "pointer" : "default"}`}
    />
  );
}