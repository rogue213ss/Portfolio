import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Project } from "../data/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const TECH_STYLES: Record<Project["tech"][number]["status"], string> = {
  built: "border-obsidian-line text-graphite-bright",
  planned: "border-dashed border-obsidian-line text-graphite-dim",
  configure: "border-dotted border-amber-300/40 text-amber-200/80",
};

const QUESTIONS: { key: keyof Project; label: string }[] = [
  { key: "whatIsIt", label: "01 — WHAT IS IT?" },
  { key: "whyBuilt", label: "02 — WHY DID I BUILD IT?" },
  { key: "whatWasHard", label: "03 — WHAT WAS HARD?" },
  { key: "whatLearned", label: "04 — WHAT DID I LEARN?" },
];

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-obsidian/80 px-4 py-10 backdrop-blur-sm sm:py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="glass relative w-full max-w-2xl rounded-2xl p-6 sm:p-10"
          >
            <button
              onClick={onClose}
              data-cursor="link"
              aria-label="Close project details"
              className="absolute right-5 top-5 rounded-full border border-obsidian-line p-2 text-graphite-bright transition-colors hover:border-signal/50 hover:text-signal-soft"
            >
              <X size={16} />
            </button>

            <span className="mono-label text-xs text-graphite-dim">
              {project.number}
            </span>
            <h3 className="font-display mt-2 text-3xl font-semibold tracking-tight text-graphite-bright">
              {project.name}
            </h3>
            <p className="mt-1 text-signal-soft">{project.tagline}</p>
            <span className="mono-label mt-3 inline-block rounded-full border border-obsidian-line px-2.5 py-1 text-[10px] text-signal-soft">
              {project.statusLabel}
            </span>

            {/* Four-question storytelling */}
            <div className="mt-8 space-y-6">
              {QUESTIONS.map((q) => (
                <div key={q.label}>
                  <p className="mono-label text-xs text-graphite-dim">
                    {q.label}
                  </p>
                  <p className="prose-measure mt-1.5 text-sm leading-relaxed text-graphite-bright">
                    {project[q.key] as string}
                  </p>
                </div>
              ))}
            </div>

            {/* Architecture diagram */}
            {project.architecture && (
              <div className="mt-8">
                <p className="mono-label mb-3 text-xs text-graphite-dim">
                  ARCHITECTURE
                </p>
                <div className="flex flex-col gap-1.5">
                  {project.architecture.map((step, i) => (
                    <div key={step} className="flex items-center gap-3">
                      <span className="mono-label w-5 text-[10px] text-graphite-dim">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="mono-label rounded-md border border-obsidian-line bg-obsidian-raised px-3 py-1.5 text-xs text-graphite-bright">
                        {step}
                      </span>
                      {i < project.architecture!.length - 1 && (
                        <span className="text-graphite-dim">↓</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Routes */}
            {project.routes && (
              <div className="mt-8">
                <p className="mono-label mb-2 text-xs text-graphite-dim">
                  KEY ROUTES
                </p>
                <div className="space-y-1">
                  {project.routes.map((r) => (
                    <p key={r} className="mono-label text-xs text-signal-soft">
                      {r}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Tech */}
            <div className="mt-8">
              <p className="mono-label mb-2 text-xs text-graphite-dim">
                TECHNOLOGY
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t.name}
                    className={`rounded-md border px-2.5 py-1 text-xs ${TECH_STYLES[t.status]}`}
                    title={
                      t.status === "planned"
                        ? "Planned / roadmap"
                        : t.status === "configure"
                        ? "Exact stack not finalized — configure before deploying"
                        : "Built"
                    }
                  >
                    {t.name}
                    {t.status === "planned" && (
                      <span className="ml-1 text-graphite-dim">· planned</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="magnetic"
                  className="rounded-lg border border-obsidian-line px-4 py-2 text-sm text-graphite-bright transition-colors hover:border-signal/50 hover:text-signal-soft"
                >
                  View on GitHub ↗
                </a>
              )}
              {project.liveUrl && project.liveUrl !== "#" && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="magnetic"
                  className="rounded-lg bg-signal px-4 py-2 text-sm font-medium text-obsidian"
                >
                  {project.liveLabel ?? "Live demo ↗"}
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
