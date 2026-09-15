import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  label?: string;
}

const LABELS = ["React", "Python", "Node", "C++", "JavaScript", "SQL", "APIs", "AI"];

/**
 * Renders a slowly drifting, mouse-reactive node network on a 2D canvas.
 * Chosen over a full WebGL/Three.js scene for the hero: it delivers the same
 * "digital network" read at a fraction of the bundle size and with no risk
 * of GPU context issues on low-end hardware, while still giving depth and
 * responsiveness to cursor movement.
 */
export default function HeroCanvas({ reducedMotion }: { reducedMotion: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let raf = 0;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const nodeCount = isMobile ? 18 : 42;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    const initNodes = () => {
      nodes = Array.from({ length: nodeCount }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        label: i < LABELS.length ? LABELS[i] : undefined,
      }));
    };

    resize();
    initNodes();

    const handleResize = () => {
      resize();
      initNodes();
    };
    window.addEventListener("resize", handleResize);

    const handlePointer = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener("mousemove", handlePointer, { passive: true });

    const linkDist = isMobile ? 110 : 150;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        if (!reducedMotion) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;

          const dx = mouse.current.x - n.x;
          const dy = mouse.current.y - n.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 140) {
            n.x -= (dx / dist) * 0.6;
            n.y -= (dy / dist) * 0.6;
          }
        }
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < linkDist) {
            const opacity = (1 - dist / linkDist) * 0.35;
            ctx.strokeStyle = `rgba(62, 166, 255, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.label ? 2.5 : 1.6, 0, Math.PI * 2);
        ctx.fillStyle = n.label ? "rgba(143, 211, 255, 0.9)" : "rgba(124, 135, 152, 0.7)";
        ctx.fill();

        if (n.label) {
          ctx.font = "500 11px 'JetBrains Mono', monospace";
          ctx.fillStyle = "rgba(143, 211, 255, 0.55)";
          ctx.fillText(n.label, n.x + 8, n.y - 8);
        }
      }

      if (!reducedMotion) {
        raf = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handlePointer);
    };
  }, [reducedMotion]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
