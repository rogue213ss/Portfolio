import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Instagram } from "lucide-react";
import type { Project } from "../data/projects";
import { assetUrl } from "../lib/assetUrl";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface FlagshipProjectProps {
  project: Project;
}

/**
 * Full-width showcase for a single flagship project. Everything it renders is
 * read from the project's data entry (description, highlights, engineering
 * areas, gallery, links) so nothing here is hard-coded to one product.
 *
 * Gallery items without an `image` render as clean, labelled placeholder
 * slots — add the image in src/data/projects.ts to fill one.
 */
export default function FlagshipProject({ project }: FlagshipProjectProps) {
  const reduced = useReducedMotion();
  const gallery = project.gallery ?? [];
  const firstReal = gallery.findIndex((g) => g.image);
  const [active, setActive] = useState(Math.max(firstReal, 0));
  const current = gallery[active];

  const fade = { duration: reduced ? 0 : 0.45, ease: "easeOut" as const };

  return (
    <article
      aria-labelledby={`${project.id}-title`}
      className="relative overflow-hidden rounded-2xl border border-obsidian-line bg-obsidian-soft"
    >
      {/* Top rail */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-obsidian-line px-6 py-4 sm:px-10">
        <p className="mono-label flex items-center gap-2.5 text-[11px] text-graphite-bright">
          <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
          FLAGSHIP PROJECT
          <span className="text-graphite-dim">/ {project.number}</span>
        </p>
        <span className="mono-label text-[11px] text-graphite-dim">
          {project.statusLabel}
        </span>
      </div>

      <div className="px-6 pb-10 pt-10 sm:px-10 sm:pb-12 sm:pt-14">
        {/* Title block */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <motion.h3
              id={`${project.id}-title`}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={fade}
              className="font-display text-5xl font-semibold tracking-tight text-graphite-bright sm:text-7xl"
            >
              {project.name}
            </motion.h3>
            <p className="mono-label mt-3 text-xs text-signal-soft">
              {project.tagline.toUpperCase()}
            </p>
            <p className="prose-measure mt-6 text-base leading-relaxed text-graphite">
              {project.description}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:flex-col lg:items-stretch">
            {project.liveUrl && project.liveUrl !== "#" && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="magnetic"
                className="group inline-flex items-center justify-between gap-6 rounded-xl bg-signal px-5 py-3.5 text-sm font-medium text-obsidian transition-colors hover:bg-signal-soft"
              >
                {project.liveLabel ?? "Visit website"}
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            )}
            {project.links?.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                data-cursor="magnetic"
                className="group inline-flex items-center justify-between gap-6 rounded-xl border border-obsidian-line px-5 py-3.5 text-sm text-graphite-bright transition-colors hover:border-signal/50 hover:text-signal-soft"
              >
                <span className="flex items-center gap-2.5">
                  <Instagram size={16} aria-hidden="true" />
                  {link.label}
                </span>
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Gallery */}
        {gallery.length > 0 && (
          <div className="mt-12 sm:mt-14">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ ...fade, duration: reduced ? 0 : 0.7 }}
              className="relative aspect-[1437/842] w-full overflow-hidden rounded-xl border border-obsidian-line bg-obsidian"
            >
              <AnimatePresence initial={false}>
                {current?.image && (
                  <motion.img
                    key={current.image.src}
                    src={assetUrl(current.image.src)}
                    alt={current.image.alt}
                    width={current.image.width}
                    height={current.image.height}
                    decoding="async"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={fade}
                    className="absolute inset-0 h-full w-full object-contain"
                  />
                )}
              </AnimatePresence>
            </motion.div>

            <p
              className="mono-label mt-3 text-[11px] text-graphite-dim"
              aria-live="polite"
            >
              FIG. {String(active + 1).padStart(2, "0")} —{" "}
              {current?.caption.toUpperCase()}
            </p>

            <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {gallery.map((item, i) => {
                const selected = i === active;
                return (
                  <li key={item.caption}>
                    {item.image ? (
                      <button
                        type="button"
                        onClick={() => setActive(i)}
                        aria-pressed={selected}
                        aria-label={`Show screenshot: ${item.caption}`}
                        data-cursor="link"
                        className={`relative block aspect-[16/10] w-full overflow-hidden rounded-lg border transition-[border-color,opacity] duration-200 ${
                          selected
                            ? "border-signal/70 opacity-100"
                            : "border-obsidian-line opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={assetUrl(item.image.src)}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ) : (
                      <div
                        className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-obsidian-line px-2 text-center"
                        role="img"
                        aria-label={`${item.caption}: screenshot coming soon`}
                      >
                        <span className="mono-label text-[10px] text-graphite-dim">
                          {item.caption.toUpperCase()}
                        </span>
                        <span className="mono-label text-[9px] text-graphite-dim/70">
                          SCREENSHOT SLOT
                        </span>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Features + engineering */}
        <div className="mt-14 grid gap-12 border-t border-obsidian-line pt-12 lg:grid-cols-12">
          {project.highlights && (
            <div className="lg:col-span-7">
              <p className="mono-label text-xs text-graphite-dim">WHAT IT DOES</p>
              <ol className="mt-5 grid gap-x-10 gap-y-4 sm:grid-cols-2">
                {project.highlights.map((h, i) => (
                  <motion.li
                    key={h}
                    initial={reduced ? false : { opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : (i % 2) * 0.06 }}
                    className="flex gap-3 text-sm leading-relaxed text-graphite-bright"
                  >
                    <span className="mono-label pt-0.5 text-[10px] text-graphite-dim">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{h}</span>
                  </motion.li>
                ))}
              </ol>
            </div>
          )}

          <div className="lg:col-span-5">
            {project.engineering && (
              <>
                <p className="mono-label text-xs text-graphite-dim">
                  WHAT IT DEMONSTRATES
                </p>
                <dl className="mt-5 divide-y divide-obsidian-line border-y border-obsidian-line">
                  {project.engineering.map((e) => (
                    <div
                      key={e.label}
                      className="grid grid-cols-[7.5rem_1fr] gap-4 py-3 text-sm sm:grid-cols-[8.5rem_1fr]"
                    >
                      <dt className="mono-label pt-0.5 text-[10px] text-signal-soft">
                        {e.label}
                      </dt>
                      <dd className="text-graphite-bright">{e.detail}</dd>
                    </div>
                  ))}
                </dl>
              </>
            )}

            <p className="mono-label mt-8 text-xs text-graphite-dim">STACK</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t.name}
                  className="rounded-md border border-obsidian-line px-2.5 py-1 text-xs text-graphite-bright"
                >
                  {t.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
