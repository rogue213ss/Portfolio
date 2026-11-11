import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Project } from "../data/projects";
import TerminalTicker from "./TerminalTicker";
import MediaRail from "./MediaRail";
import { assetUrl } from "../lib/assetUrl";

const TECH_STYLES: Record<Project["tech"][number]["status"], string> = {
  built: "border-obsidian-line text-graphite-bright",
  planned: "border-dashed border-obsidian-line text-graphite-dim",
  configure: "border-dotted border-amber-300/40 text-amber-200/80",
};

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
  large?: boolean;
}

export default function ProjectCard({ project, onOpen, large }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={() => onOpen(project)}
      data-cursor="project"
      data-cursor-label="VIEW"
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="glass group relative cursor-pointer overflow-hidden rounded-2xl p-6 transition-colors hover:border-signal/40 sm:p-8"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-signal/10 blur-3xl transition-opacity duration-300 group-hover:opacity-100 opacity-0" />

      {project.cover && (
        <div className="relative -mx-6 -mt-6 mb-6 overflow-hidden border-b border-obsidian-line sm:-mx-8 sm:-mt-8 sm:mb-8">
          <img
            src={assetUrl(project.cover.src)}
            alt={project.cover.alt}
            width={project.cover.width}
            height={project.cover.height}
            loading="lazy"
            decoding="async"
            className="aspect-[16/9] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
      )}

      <div className="relative flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="mono-label text-xs text-graphite-dim">
            {project.number}
          </span>
          {project.category === "client" && (
            <span className="mono-label rounded-full border border-graphite/30 bg-graphite/10 px-2 py-0.5 text-[9px] text-graphite-bright">
              CLIENT WORK
            </span>
          )}
        </div>
        <span className="mono-label rounded-full border border-obsidian-line px-2.5 py-1 text-[10px] text-signal-soft">
          {project.statusLabel}
        </span>
      </div>

      <h3
        className={`font-display mt-4 font-semibold tracking-tight text-graphite-bright ${
          large ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
        }`}
      >
        {project.name}
      </h3>
      <p className="mt-1 text-sm text-signal-soft">{project.tagline}</p>

      <p className="prose-measure mt-4 text-sm text-graphite">
        {project.description}
      </p>

      {/* Mini pipeline label */}
      <div className="mono-label mt-5 flex items-center gap-2 text-[11px] text-graphite-dim">
        {project.pipeline.map((step, i) => (
          <span key={step} className="flex items-center gap-2">
            {step}
            {i < project.pipeline.length - 1 && (
              <span className="text-signal/50">→</span>
            )}
          </span>
        ))}
      </div>

      {project.terminalEvents && <TerminalTicker events={project.terminalEvents} />}
      {project.mediaRail && <MediaRail />}

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tech.slice(0, 5).map((t) => (
          <span
            key={t.name}
            className={`rounded-md border px-2 py-1 text-xs ${TECH_STYLES[t.status]}`}
          >
            {t.name}
          </span>
        ))}
        {project.tech.length > 5 && (
          <span className="rounded-md px-2 py-1 text-xs text-graphite-dim">
            +{project.tech.length - 5} more
          </span>
        )}
      </div>

      {project.liveUrl && project.liveUrl !== "#" && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          data-cursor="magnetic"
          onClick={(e) => e.stopPropagation()}
          className="mt-5 flex items-center justify-between rounded-xl border border-signal/40 bg-signal/10 px-4 py-3 text-sm font-medium text-signal-soft transition-colors hover:bg-signal/20"
        >
          <span>{project.liveLabel ?? "Live project →"}</span>
        </a>
      )}

      <div className="mt-6 flex items-center gap-2 text-sm font-medium text-signal-soft">
        View project <span aria-hidden="true">→</span>
      </div>
    </motion.div>
  );
}
