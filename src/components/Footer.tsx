import { Mail, Phone, Linkedin } from "lucide-react";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL, LINKEDIN_URL } from "../data/contact";

export default function Footer() {
  return (
    <footer className="border-t border-obsidian-line py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-display text-sm font-medium text-graphite-bright">
            AHMAD AHSAN
          </p>
          <p className="mono-label mt-0.5 text-[11px] text-graphite-dim">
            Computer Science × Full-Stack Development
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-graphite-dim">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            data-cursor="link"
            className="flex items-center gap-1.5 transition-colors hover:text-signal-soft"
          >
            <Mail size={12} /> {CONTACT_EMAIL}
          </a>
          <a
            href={`tel:${CONTACT_PHONE_TEL}`}
            data-cursor="link"
            className="flex items-center gap-1.5 transition-colors hover:text-signal-soft"
          >
            <Phone size={12} /> {CONTACT_PHONE_DISPLAY}
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            data-cursor="link"
            className="flex items-center gap-1.5 transition-colors hover:text-signal-soft"
          >
            <Linkedin size={12} /> LinkedIn
          </a>
        </div>

        <p className="mono-label text-[11px] text-graphite-dim">
          BUILD · BREAK · LEARN · SHIP
        </p>
        <p className="text-xs text-graphite-dim">© 2026 Ahmad Ahsan</p>
      </div>
    </footer>
  );
}
