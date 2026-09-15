import { useState } from "react";
import { motion } from "framer-motion";
import { skillCategories, skills, type Skill } from "../data/skills";

export default function SkillMatrix() {
  const [active, setActive] = useState<Skill | null>(null);

  return (
    <section id="skills" className="relative py-28">
      <div className="mx-auto max-w-5xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl font-semibold tracking-tight text-graphite-bright sm:text-4xl"
        >
          Skill matrix
        </motion.h2>
        <p className="prose-measure mt-4 text-graphite">
          Grouped by where each tool actually gets used, not a percentage bar
          that means nothing. Hover a node for the detail.
        </p>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: catIndex * 0.06 }}
            >
              <p className="mono-label mb-4 text-xs text-graphite">
                {category}
              </p>
              <div className="flex flex-wrap gap-2.5">
                {skills
                  .filter((s) => s.category === category)
                  .map((skill) => (
                    <button
                      key={skill.id}
                      data-cursor="link"
                      onMouseEnter={() => setActive(skill)}
                      onFocus={() => setActive(skill)}
                      onClick={() =>
                        setActive((cur) => (cur?.id === skill.id ? null : skill))
                      }
                      className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                        active?.id === skill.id
                          ? "border-signal/60 bg-signal/10 text-signal-soft"
                          : "border-obsidian-line bg-obsidian-raised text-graphite-bright hover:border-signal/30"
                      }`}
                    >
                      {skill.name}
                    </button>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detail panel */}
        <div className="glass mt-10 min-h-[104px] rounded-2xl p-6">
          {active ? (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-center justify-between">
                <p className="font-display text-lg font-semibold text-signal-soft">
                  {active.name}
                </p>
                <span className="mono-label text-[11px] text-graphite">
                  {active.category}
                </span>
              </div>
              <p className="mt-2 text-sm text-graphite">{active.blurb}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="mono-label text-[11px] text-graphite-dim">
                  USED IN:
                </span>
                {active.usedIn.map((u) => (
                  <span
                    key={u}
                    className="mono-label rounded-full border border-obsidian-line px-2 py-0.5 text-[11px] text-graphite-bright"
                  >
                    {u}
                  </span>
                ))}
              </div>
            </motion.div>
          ) : (
            <p className="mono-label text-xs text-graphite-dim">
              HOVER OR TAP A SKILL TO EXPAND —
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
