import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin } from "lucide-react";
import ContactExperience from "./ContactExperience";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
  LINKEDIN_URL,
  GITHUB_URL,
} from "../data/contact";

export default function Contact() {
  const [open, setOpen] = useState(false);

  return (
    <section id="contact" className="relative py-32">
      <div className="bg-grid absolute inset-0 opacity-20" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mono-label text-xs text-graphite-dim"
        >
          SO... WHAT ARE WE BUILDING?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-display mt-4 text-4xl font-semibold tracking-tight text-graphite-bright sm:text-5xl"
        >
          START SOMETHING.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="prose-measure mx-auto mt-5 text-graphite"
        >
          Ideas are cheap. Systems are interesting.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onClick={() => setOpen(true)}
          data-cursor="magnetic"
          className="group relative mt-12 inline-flex items-center gap-3 overflow-hidden rounded-2xl border border-signal/40 bg-signal/5 px-10 py-5 text-lg font-medium text-signal-soft transition-all hover:scale-[1.02] hover:border-signal hover:bg-signal/10"
        >
          Initialize project
          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </motion.button>

        {/* Real, clickable contact details */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-graphite">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            data-cursor="link"
            className="flex items-center gap-2 transition-colors hover:text-signal-soft"
          >
            <Mail size={14} /> {CONTACT_EMAIL}
          </a>
          <a
            href={`tel:${CONTACT_PHONE_TEL}`}
            data-cursor="link"
            className="flex items-center gap-2 transition-colors hover:text-signal-soft"
          >
            <Phone size={14} /> {CONTACT_PHONE_DISPLAY}
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            data-cursor="link"
            className="flex items-center gap-2 transition-colors hover:text-signal-soft"
          >
            <Linkedin size={14} /> LinkedIn
          </a>
        </div>

        <div className="mt-6">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            data-cursor="link"
            className="text-sm text-graphite transition-colors hover:text-signal-soft"
          >
            GitHub ↗
          </a>
        </div>
      </div>

      <ContactExperience open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
