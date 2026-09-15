import { motion } from "framer-motion";
import { timeline } from "../data/timeline";

export default function Timeline() {
  return (
    <section id="experience" className="relative py-28">
      <div className="mx-auto max-w-5xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl font-semibold tracking-tight text-graphite-bright sm:text-4xl"
        >
          Journey
        </motion.h2>

        <div className="relative mt-14 border-l border-obsidian-line pl-8">
          {timeline.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="relative pb-10 last:pb-0"
            >
              <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-signal bg-obsidian" />
              <p className="mono-label text-xs text-graphite-dim">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="font-display mt-1 text-lg font-medium text-graphite-bright">
                {entry.label}
              </p>
              <p className="mt-1 text-sm text-graphite">{entry.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
