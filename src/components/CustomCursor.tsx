import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsDesktopPointer } from "../hooks/useIsDesktopPointer";

type CursorMode = "default" | "link" | "magnetic" | "project";

/**
 * Replaces the system cursor on fine-pointer devices only. Reads
 * data-cursor attributes on hovered elements to decide how to morph:
 * data-cursor="link" | "magnetic" | "project".
 */
export default function CustomCursor() {
  const isDesktop = useIsDesktopPointer();
  const [mode, setMode] = useState<CursorMode>("default");
  const [label, setLabel] = useState<string | null>(null);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const x = useSpring(rawX, { stiffness: 500, damping: 40, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (!isDesktop) return;
    document.body.classList.add("custom-cursor-active");

    const handleMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);

      const el = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-cursor]"
      );
      if (el) {
        const cursorMode = (el.dataset.cursor as CursorMode) || "default";
        setMode(cursorMode);
        setLabel(el.dataset.cursorLabel ?? null);
      } else {
        setMode("default");
        setLabel(null);
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [isDesktop, rawX, rawY]);

  if (!isDesktop) return null;

  const size = mode === "project" ? 96 : mode === "link" ? 48 : mode === "magnetic" ? 56 : 12;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[110] flex items-center justify-center rounded-full border border-signal/60 bg-signal/10 mix-blend-difference"
      style={{
        x,
        y,
        width: size,
        height: size,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{ width: size, height: size }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {mode === "default" && (
        <div className="h-full w-full rounded-full bg-signal" />
      )}
      {mode === "project" && (
        <span className="mono-label text-center text-[10px] leading-tight text-signal-soft">
          {label ?? "VIEW"} →
        </span>
      )}
    </motion.div>
  );
}
