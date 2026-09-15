import { useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

const ORBIT_TECH = ["React", "Python", "Node.js", "Express", "Flask", "C++", "C#", "SQL", "Git", "GitHub"];

/**
 * A ring of core technologies orbiting a center label. Auto-rotates slowly
 * and can be dragged to spin manually — drag offset and the ambient
 * animation compose additively via two nested rotating layers.
 */
export default function TechOrbit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotation = useMotionValue(0);
  const [dragging, setDragging] = useState(false);
  const lastAngle = useRef(0);
  const reducedMotion = useReducedMotion();

  useAnimationFrame((_, delta) => {
    if (dragging || reducedMotion) return;
    rotation.set(rotation.get() + delta * 0.006);
  });

  const angleFromEvent = (clientX: number, clientY: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return 0;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return (Math.atan2(clientY - cy, clientX - cx) * 180) / Math.PI;
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    lastAngle.current = angleFromEvent(e.clientX, e.clientY);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const angle = angleFromEvent(e.clientX, e.clientY);
    const delta = angle - lastAngle.current;
    rotation.set(rotation.get() + delta);
    lastAngle.current = angle;
  };

  const handlePointerUp = () => setDragging(false);

  return (
    <div className="mt-16 flex justify-center">
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        data-cursor="magnetic"
        className="relative flex h-72 w-72 select-none items-center justify-center rounded-full border border-dashed border-obsidian-line sm:h-80 sm:w-80"
      >
        <div className="glass flex h-20 w-20 flex-col items-center justify-center rounded-full text-center">
          <span className="mono-label text-[9px] text-graphite">AHMAD'S</span>
          <span className="mono-label text-[9px] text-signal-soft">STACK</span>
        </div>

        <motion.div className="absolute inset-0" style={{ rotate: rotation }}>
          {ORBIT_TECH.map((tech, i) => {
            const angle = (360 / ORBIT_TECH.length) * i;
            return (
              <div
                key={tech}
                className="absolute left-1/2 top-1/2 h-0 w-0"
                style={{ transform: `rotate(${angle}deg) translate(140px)` }}
              >
                <span
                  className="mono-label -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-obsidian-line bg-obsidian-raised px-2.5 py-1 text-[10px] text-graphite-bright"
                  style={{ transform: `rotate(${-angle}deg)`, display: "inline-block" }}
                >
                  {tech}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
