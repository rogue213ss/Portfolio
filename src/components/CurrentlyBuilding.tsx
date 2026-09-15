import { motion } from "framer-motion";

const INTERESTS = ["AI", "AUTOMATION", "WEB APPS", "DEVELOPER TOOLS"];

export default function CurrentlyBuilding() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-5xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mono-label text-xs text-graphite-dim"
        >
          CURRENTLY BUILDING
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass mt-4 flex flex-col justify-between gap-6 rounded-2xl p-6 sm:flex-row sm:items-center sm:p-8"
        >
          <div>
            <h3 className="font-display text-2xl font-semibold text-graphite-bright">
              RETRACE
            </h3>
            <p className="mt-1 text-sm text-graphite">
              Developer debugging memory system
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
            </span>
            <span className="mono-label text-xs text-signal-soft">
              STATUS: ACTIVE
            </span>
          </div>
        </motion.div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {INTERESTS.map((interest, i) => (
            <motion.div
              key={interest}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="glass mono-label rounded-xl px-4 py-4 text-center text-xs text-graphite-bright"
            >
              {interest}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
