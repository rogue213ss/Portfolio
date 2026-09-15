import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function Navigation() {
  const [compact, setCompact] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4"
    >
      <nav
        className={`glass mt-4 flex w-full max-w-5xl items-center justify-between rounded-2xl transition-all duration-300 ${
          compact ? "px-4 py-2" : "px-6 py-3"
        }`}
      >
        <button
          onClick={() => scrollTo("home")}
          data-cursor="link"
          className="font-display text-sm font-semibold tracking-tight text-graphite-bright"
        >
          AHMAD<span className="text-signal">/</span>DEV
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => scrollTo(s.id)}
                data-cursor="link"
                className={`relative rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  active === s.id
                    ? "text-signal-soft"
                    : "text-graphite hover:text-graphite-bright"
                }`}
              >
                {s.label}
                {active === s.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-2 -bottom-0.5 h-px bg-signal"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        <a
          href="https://github.com/rogue213ss"
          target="_blank"
          rel="noreferrer"
          data-cursor="magnetic"
          className="hidden items-center gap-1 rounded-lg border border-obsidian-line px-3 py-1.5 text-sm text-graphite-bright transition-colors hover:border-signal/50 hover:text-signal-soft md:flex"
        >
          GitHub <span aria-hidden="true">↗</span>
        </a>

        <button
          className="text-graphite-bright md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          <div className="flex flex-col gap-1.5">
            <span
              className={`h-px w-5 bg-current transition-transform ${
                menuOpen ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-5 bg-current transition-transform ${
                menuOpen ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass absolute left-4 right-4 top-[68px] rounded-2xl p-3 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => scrollTo(s.id)}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm ${
                    active === s.id
                      ? "bg-signal/10 text-signal-soft"
                      : "text-graphite-bright"
                  }`}
                >
                  {s.label}
                </button>
              </li>
            ))}
            <li>
              <a
                href="https://github.com/rogue213ss"
                target="_blank"
                rel="noreferrer"
                className="block rounded-lg px-3 py-2 text-sm text-graphite-bright"
              >
                GitHub ↗
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
}
