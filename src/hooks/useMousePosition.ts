import { useEffect, useRef, useState } from "react";

export interface MousePosition {
  x: number;
  y: number;
}

/**
 * Tracks the raw viewport mouse position. Kept in a ref-backed state update
 * so consumers can subscribe without each one attaching its own listener.
 */
export function useMousePosition() {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
  const frame = useRef<number>();

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        setPosition({ x: event.clientX, y: event.clientY });
      });
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return position;
}
