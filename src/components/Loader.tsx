import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoaderProps {
  onComplete: () => void;
}

const DIAGNOSTICS = [
  { label: "SYSTEM", status: "ONLINE" },
  { label: "PROJECTS", status: "LOADED" },
  { label: "SKILLS", status: "LOADED" },
  { label: "CREATIVE", status: "ACTIVE" },
];

/**
 * Runs a short, fixed-length boot sequence on first paint, then unmounts
 * itself via onComplete. Kept short (under ~1.8s) so it reads as a flourish
 * rather than an obstacle — and reduced-motion users skip straight through.
 */
export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      setDone(true);
      const t = setTimeout(onComplete, 150);
      return () => clearTimeout(t);
    }

    const lineInterval = setInterval(() => {
      setVisibleLines((n) => (n < DIAGNOSTICS.length ? n + 1 : n));
    }, 220);

    const progressInterval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.random() * 18 + 6);
        if (next >= 100) {
          clearInterval(progressInterval);
          clearInterval(lineInterval);
          setVisibleLines(DIAGNOSTICS.length);
          setTimeout(() => setDone(true), 350);
          setTimeout(onComplete, 950);
        }
        return next;
      });
    }, 180);

    return () => {
      clearInterval(lineInterval);
      clearInterval(progressInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-obsidian"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="bg-grid absolute inset-0 opacity-40" />
          <div className="relative w-[280px] font-mono text-xs sm:w-80">
            <p className="mono-label mb-6 text-graphite-bright">
              INITIALIZING PORTFOLIO<span className="animate-blink">_</span>
            </p>
            <div className="space-y-2">
              {DIAGNOSTICS.map((d, i) => (
                <div
                  key={d.label}
                  className={`flex items-center justify-between transition-opacity duration-300 ${
                    i < visibleLines ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <span className="text-graphite">{d.label}</span>
                  <span className="text-signal">{d.status}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 h-[2px] w-full overflow-hidden bg-obsidian-line">
              <motion.div
                className="h-full bg-signal"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-right text-graphite">
              {Math.floor(progress)}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
