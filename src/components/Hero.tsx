import { motion } from "framer-motion";
import HeroCanvas from "./HeroCanvas";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function Hero() {
  const reducedMotion = useReducedMotion();

  const scrollToProjects = () =>
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      <div className="bg-grid absolute inset-0 opacity-30" />
      <HeroCanvas reducedMotion={reducedMotion} />
      <div className="bg-grid-fade pointer-events-none absolute inset-x-0 bottom-0 h-40" />

      {/* Corner technical labels */}
      <div className="mono-label pointer-events-none absolute left-4 top-24 hidden flex-col gap-1 text-[11px] text-graphite sm:flex md:left-8">
        <span>BUILDING: 01</span>
        <span>LOCATION: PK</span>
        <span>STACK: FULL_STACK</span>
      </div>
      <div className="mono-label pointer-events-none absolute right-4 top-24 hidden flex-col items-end gap-1 text-[11px] text-graphite sm:flex md:right-8">
        <span>33.6844° N</span>
        <span>73.0479° E</span>
        <span>MODE: CREATE</span>
      </div>

      <div className="relative mx-auto w-full max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="mono-label mb-6 inline-flex items-center gap-2 rounded-full border border-obsidian-line bg-obsidian-raised/60 px-3 py-1.5 text-[11px] text-signal-soft"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
          </span>
          AVAILABLE FOR OPPORTUNITIES
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
          className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-graphite-bright sm:text-6xl md:text-7xl"
        >
          I build digital systems
          <br />
          that actually{" "}
          <span className="text-glow text-signal-soft">do something.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="prose-measure mt-6 text-base text-graphite sm:text-lg"
        >
          Computer Science student and full-stack developer building web
          applications, developer tools, dashboards, and automation systems —
          with AI-assisted development as part of how I move fast without
          cutting corners.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <button
            onClick={scrollToProjects}
            data-cursor="magnetic"
            className="group relative overflow-hidden rounded-xl bg-signal px-6 py-3 text-sm font-medium text-obsidian transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Explore my work
          </button>
          <a
            href="https://github.com/rogue213ss"
            target="_blank"
            rel="noreferrer"
            data-cursor="magnetic"
            className="rounded-xl border border-obsidian-line px-6 py-3 text-sm font-medium text-graphite-bright transition-colors hover:border-signal/50 hover:text-signal-soft"
          >
            GitHub ↗
          </a>
        </motion.div>
      </div>
    </section>
  );
}
