# Ahmad Ahsan — Developer Portfolio

A single-page, cinematic developer portfolio built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.

## Run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (typically `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Contact info

Real contact details (email, phone, LinkedIn, GitHub) live in one place: `src/data/contact.ts`. `Contact.tsx`, `ContactExperience.tsx`, and `Footer.tsx` all import from there — update that one file if any of these ever change.

## Before you deploy

One placeholder still needs your input:

- **Spotify Album Finder live link** — `src/data/projects.ts` has `liveUrl: "#"` for this project since no deployed URL was given. Fill it in once you have one, or remove the field to hide the "Live" link on that card.
- **Streaming Platform tech stack** — deliberately left as `STACK — CONFIGURE` in `src/data/projects.ts` since the exact stack wasn't specified. Replace that single tech entry with your real stack (each item needs a `status` of `"built"`, `"planned"`, or `"configure"`).

## The "Initialize Project" contact flow — backend setup

`ContactExperience.tsx` is a 5-step wizard (name → project type → message → timeline → your contact info) with a live "project brief" summary panel. **TRANSMIT PROJECT** now actually sends the brief through [Web3Forms](https://web3forms.com) — a free service that forwards form submissions straight to your inbox with no server of your own required.

**To turn it on:**

1. Go to https://web3forms.com and enter your email — no account or password needed. They'll email you an access key.
2. Copy `.env.example` to `.env` and paste your key in:
   ```
   VITE_WEB3FORMS_ACCESS_KEY=your-real-key-here
   ```
3. Restart `npm run dev` (or rebuild) so Vite picks up the new env var.
4. `.env` is already git-ignored, so your key won't get committed.

**Until you do that**, the form still works end to end — it just falls back to opening the visitor's email client with everything pre-filled (a `mailto:` link) instead of sending directly, and the final screen's wording adjusts to say that honestly rather than claiming the message arrived. Same graceful fallback kicks in if the Web3Forms API call ever fails (network issue, key revoked, etc.) — the visitor never sees a silent failure, and the brief is never lost, just handed off a different way.

The actual submission logic lives in `src/lib/submitContact.ts` if you ever want to swap Web3Forms for something else (Formspree, a real backend, etc.) — it returns `"success" | "not_configured" | "error"` and `ContactExperience.tsx` branches the final screen on that.

## Flagship project (Luma) and screenshots

`src/data/projects.ts` entries with `flagship: true` render as a full-width showcase (`FlagshipProject.tsx`) above the featured grid instead of a card. It reads everything from the data entry: `description`, `highlights`, `engineering`, `tech`, `gallery`, `liveUrl` / `liveLabel`, and `links`.

- Images live in `public/assets/<project>/` and are referenced in data as `assets/<project>/<file>` (no leading slash).
- **Gallery placeholders:** a `gallery` item without an `image` renders as a labelled "SCREENSHOT SLOT". To fill one (e.g. "Cinematic lyrics" or "Visual presets"), drop a `.webp`/`.png` in `public/assets/luma/` and add `image: { src, alt, width, height }` to that item.
- Grid cards can show a `cover` image (used by Station Zero). The four story fields (`whatIsIt`, `whyBuilt`, `whatWasHard`, `whatLearned`) are optional; the detail modal skips any that are missing rather than showing filler.
- Luma's Instagram link is in its `links` array.

## Structure

```
src/
  components/   UI sections (Hero, Projects, SkillMatrix, etc.)
  data/         Content: projects.ts, skills.ts, timeline.ts — edit these to change copy
  hooks/        useMousePosition, useReducedMotion, useIsDesktopPointer
  App.tsx       Section composition and load sequence
  index.css     Design tokens, grid/noise backgrounds, glass panels
```

Project and skill content lives in `src/data/`, separate from the components that render it — edit those files to update copy without touching component code.

## Notes on accuracy

Per your instructions, the Projects section distinguishes **built** vs **planned/roadmap** technology (see `TechItem.status` in `src/data/projects.ts`) — this matters most for RETRACE, where the CLI (V0) is built and the FastAPI/Postgres/RAG architecture is roadmap only. No fabricated metrics, users, or benchmark numbers are included anywhere.

## Accessibility & performance

- Respects `prefers-reduced-motion` (disables the custom cursor's dependency on motion, hero canvas drift, and non-essential transitions).
- Custom cursor and dense particle effects are gated to fine-pointer/hover-capable devices (`useIsDesktopPointer`) — touch devices get the system cursor and a lighter hero animation.
- Semantic headings, visible focus rings, and alt text throughout.
