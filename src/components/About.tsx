import { motion } from "framer-motion";
import { process, howIWork } from "../data/timeline";

const HOVER_ANIMATIONS: Record<string, string> = {
  build: "Component nodes assemble on screen.",
  break: "A stress test finds the edge case.",
  debug: "Terminal steps through the stack trace.",
  learn: "Docs open, a pattern clicks.",
  improve: "The same feature, cleaner the second time.",
  ship: "Build passes, it goes live.",
};

export default function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-5xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl font-semibold tracking-tight text-graphite-bright sm:text-4xl"
        >
          Not just code.
          <br />I like building things.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="prose-measure mt-6 text-graphite"
        >
          I'm a Computer Science student at SZABIST Islamabad and a
          full-stack developer focused on turning ideas into working
          software. I work across frontend, backend, APIs, databases,
          automation, and system design — and I enjoy the whole path from a
          rough idea to something people can actually use.
        </motion.p>

        {/* Process timeline */}
        <div className="mt-16 flex flex-col gap-0 sm:flex-row sm:items-stretch sm:gap-4">
          {process.map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-1 items-center gap-3 sm:flex-col sm:items-start sm:gap-0"
            >
              <div className="glass flex w-full items-center justify-between rounded-xl px-4 py-3 sm:py-4">
                <span className="mono-label text-xs text-signal-soft">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-sm font-medium text-graphite-bright sm:text-base">
                  {step}
                </span>
              </div>
              {i < process.length - 1 && (
                <div className="hidden h-px flex-1 bg-obsidian-line sm:mt-0 sm:block" />
              )}
            </motion.div>
          ))}
        </div>

        {/* How I work panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="glass mt-16 rounded-2xl p-6 sm:p-8"
        >
          <p className="mono-label mb-5 text-xs text-graphite">HOW I WORK</p>
          <div className="flex flex-wrap gap-3">
            {howIWork.map((item) => (
              <div key={item.id} className="group relative">
                <button
                  data-cursor="link"
                  className="rounded-full border border-obsidian-line bg-obsidian-raised px-4 py-2 text-sm text-graphite-bright transition-colors hover:border-signal/50 hover:text-signal-soft"
                >
                  {item.label}
                </button>
                <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-48 -translate-x-1/2 rounded-lg border border-obsidian-line bg-obsidian-raised px-3 py-2 text-xs text-graphite opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                  {HOVER_ANIMATIONS[item.id]}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
