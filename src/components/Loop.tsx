import { motion } from "framer-motion";
import { loop } from "../data/timeline";

export default function Loop() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl font-semibold tracking-tight text-graphite-bright sm:text-4xl"
        >
          The loop
        </motion.h2>
        <p className="prose-measure mx-auto mt-4 text-graphite">
          Development isn't linear. It's a cycle — and the fastest way
          through a hard problem is going around it enough times.
        </p>

        <div className="mx-auto mt-14 flex max-w-xl flex-wrap items-center justify-center gap-x-3 gap-y-4">
          {loop.map((stage, i) => (
            <motion.div
              key={stage}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="flex items-center gap-3"
            >
              <span className="glass rounded-full px-4 py-2 text-sm font-medium text-graphite-bright">
                {stage}
              </span>
              {i < loop.length - 1 && (
                <span className="text-signal/60" aria-hidden="true">
                  →
                </span>
              )}
            </motion.div>
          ))}
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: loop.length * 0.07 + 0.1 }}
            className="text-xl text-signal"
            aria-hidden="true"
          >
            ↺
          </motion.span>
        </div>
      </div>
    </section>
  );
}
