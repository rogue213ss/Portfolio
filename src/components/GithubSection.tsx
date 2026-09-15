import { motion } from "framer-motion";

const GITHUB_URL = "https://github.com/rogue213ss";
const GRID_LABELS = ["CODE", "BUILD", "COMMIT", "REPEAT"];

/** Deterministic pseudo-activity pattern — visual only, not real contribution data. */
function generateGrid(rows: number, cols: number) {
  let seed = 7;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  return Array.from({ length: rows * cols }, () => Math.floor(rand() * 4));
}

const GRID = generateGrid(7, 24);
const LEVEL_OPACITY = ["opacity-[0.12]", "opacity-30", "opacity-60", "opacity-100"];

export default function GithubSection() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-5xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl font-semibold tracking-tight text-graphite-bright sm:text-4xl"
        >
          Open source / experiments
        </motion.h2>
        <p className="mono-label mt-3 text-sm text-graphite">
          github.com/rogue213ss
        </p>

        <div className="glass mt-10 overflow-x-auto rounded-2xl p-6 sm:p-8">
          <div className="grid w-max grid-flow-col grid-rows-7 gap-1">
            {GRID.map((level, i) => (
              <div key={i} className="group relative">
                <div
                  className={`h-3 w-3 rounded-[3px] bg-signal transition-transform group-hover:scale-125 ${LEVEL_OPACITY[level]}`}
                />
                <div className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md border border-obsidian-line bg-obsidian-raised px-2 py-1 text-[10px] text-graphite-bright opacity-0 transition-opacity group-hover:opacity-100">
                  {GRID_LABELS[i % GRID_LABELS.length]}
                </div>
              </div>
            ))}
          </div>
        </div>

        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          data-cursor="magnetic"
          className="mt-8 inline-flex items-center gap-2 rounded-xl border border-obsidian-line px-6 py-3 text-sm font-medium text-graphite-bright transition-colors hover:border-signal/50 hover:text-signal-soft"
        >
          Visit GitHub <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
