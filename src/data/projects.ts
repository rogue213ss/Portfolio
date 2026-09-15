export type TechStatus = "built" | "planned" | "configure";

export interface TechItem {
  name: string;
  status: TechStatus;
}

export interface Project {
  id: string;
  number: string;
  name: string;
  tagline: string;
  pipeline: string[]; // short step label for the card, e.g. ["DATA", "ANALYSIS", "COMPATIBILITY"]
  statusLabel: string; // e.g. "IN ACTIVE DEVELOPMENT", "CLI V0 LIVE"
  featured: boolean;
  description: string;
  whatIsIt: string;
  whyBuilt: string;
  whatWasHard: string;
  whatLearned: string;
  architecture?: string[]; // full pipeline diagram steps, shown in the expanded modal
  tech: TechItem[];
  routes?: string[]; // real API routes, technical annotation detail
  githubUrl: string;
  liveUrl?: string;
  liveLabel?: string; // custom label for the live-project button, defaults to "Live demo ↗"
  terminalEvents?: string[]; // cycling terminal-style status lines for pipeline-style projects
  mediaRail?: boolean; // renders a mini content-rail mockup instead of a tech-tag preview
  accent: "primary" | "secondary";
}

export const projects: Project[] = [
  {
    id: "nimlyx",
    number: "01",
    name: "NIMLYX",
    tagline: "Discover. Analyze. Decide.",
    pipeline: ["DATA", "ANALYSIS", "COMPATIBILITY"],
    statusLabel: "IN ACTIVE DEVELOPMENT",
    featured: true,
    description:
      "A Steam analytics and game-discovery platform — search, analysis, hardware compatibility, and a custom low-end-PC classification system, not just a game-search page.",
    whatIsIt:
      "Nimlyx combines Steam data, search, and discovery with a real analysis layer: a hardware compatibility engine and a custom classification system (the 'Potato' tiers) that tells a player whether a game will actually run well on their machine — something Steam's own store page doesn't do.",
    whyBuilt:
      "Steam's store page doesn't tell you if a game will run on your hardware, or give you honest analysis beyond the review percentage. Nimlyx exists to answer 'will this actually run on my PC, and is it actually good' in one place.",
    whatWasHard:
      "Steam doesn't expose structured hardware requirements, so Nimlyx scrapes and parses them from the Steam store page and PCGamingWiki's MediaWiki API, then normalizes messy CPU/GPU text into internal hardware IDs with fuzzy matching and confidence scoring. Separately, hammering Steam's API with concurrent requests caused 429 rate-limit responses — solved with a request-deduplication layer so simultaneous requests for the same resource share one call, plus temporary caching of failures so a bad response doesn't get retried immediately.",
    whatLearned:
      "How to design a caching strategy with multiple layers (server-side, client-side memoization, request dedup, failure caching) instead of one blunt cache; and how to normalize unreliable, unstructured third-party data into something a compatibility engine can actually reason about.",
    architecture: [
      "STEAM DATA",
      "SCRAPING / APIS",
      "PARSING",
      "HARDWARE NORMALIZATION",
      "COMPATIBILITY ENGINE",
      "CLASSIFICATION",
      "NIMLYX UI",
    ],
    tech: [
      { name: "Python", status: "built" },
      { name: "Flask", status: "built" },
      { name: "REST APIs", status: "built" },
      { name: "HTML / CSS / JS", status: "built" },
      { name: "Chart.js", status: "built" },
      { name: "Fuzzy hardware matching", status: "built" },
      { name: "Render", status: "built" },
      { name: "Railway", status: "built" },
    ],
    routes: [
      "/api/find/<game_name>",
      "/api/featured",
      "/api/game-detail/<app_id>",
      "/api/search-results/<query>",
    ],
    githubUrl: "https://github.com/rogue213ss",
    liveUrl: "https://nimlyx-1.onrender.com/",
    liveLabel: "LIVE PROJECT →",
    accent: "primary",
  },
  {
    id: "retrace",
    number: "02",
    name: "RETRACE",
    tagline: "Your debugging memory.",
    pipeline: ["EVENTS", "MEMORY", "DEBUGGING"],
    statusLabel: "CLI V0 LIVE — FULL ARCHITECTURE PLANNED",
    featured: true,
    description:
      "A developer-focused debugging memory system: it passively logs commands, errors, and commits, then reconstructs what actually happened during a debugging session — not just what the final fix was.",
    whatIsIt:
      "REtrace is a Python CLI package (retrace init / log / log-commit / sessions / review) that captures development events — command, exit code, working directory, repo, branch, stdout/stderr, duration — and git commits, then groups them into debugging sessions a developer can search and review later.",
    whyBuilt:
      "Developers forget what they already tried while debugging. REtrace exists to passively remember the process — the failed attempts and dead ends, not just the eventual commit — so that context isn't lost the next time the same bug shows up.",
    whatWasHard:
      "Session reconstruction: deciding whether a new event belongs to an existing debugging session or starts a new one. The logic reuses a session based on last_event_at rather than when the session originally started, with an idle-window of roughly 20 minutes, and sessions carry a state — OPEN, RESOLVED, or ABANDONED — so a stream of terminal events becomes a meaningful timeline instead of noise.",
    whatLearned:
      "How to design event-sourced session logic around a fuzzy real-world signal (idle time) instead of a hard boundary, and how to structure a CLI as a properly installable Python package that stays useful on its own before any frontend exists.",
    architecture: [
      "COMMAND",
      "ERROR",
      "ATTEMPT",
      "CODE CHANGE",
      "COMMIT",
      "RESOLUTION",
    ],
    tech: [
      { name: "Python (CLI, installable package)", status: "built" },
      { name: "Local event/session database", status: "built" },
      { name: "Git commit integration", status: "built" },
      { name: "React + TypeScript frontend", status: "planned" },
      { name: "FastAPI", status: "planned" },
      { name: "PostgreSQL + pgvector", status: "planned" },
      { name: "SQLAlchemy + Alembic", status: "planned" },
      { name: "Redis + Celery + Docker", status: "planned" },
      { name: "Embeddings / RAG / hybrid search", status: "planned" },
      { name: "JWT auth", status: "planned" },
    ],
    githubUrl: "https://github.com/rogue213ss",
    accent: "secondary",
  },
  {
    id: "nimlyx-forge",
    number: "03",
    name: "NIMLYX FORGE",
    tagline: "The interesting part isn't generating text. It's making the pipeline survive reality.",
    pipeline: ["GENERATE", "VALIDATE", "PUBLISH"],
    statusLabel: "ACTIVE / EXPERIMENTAL",
    featured: true,
    description:
      "An experimental AI-powered YouTube automation pipeline that turns a content idea into structured, validated content — engineered around API failures, rate limits, and bad generations, not just an API call.",
    whatIsIt:
      "An experimental AI-powered YouTube automation pipeline.",
    whyBuilt:
      "To explore how AI generation can be turned into a repeatable automated workflow rather than a one-off prompt.",
    whatWasHard:
      "AI APIs fail. Outputs vary. Rate limits happen. Validation can reject generations. A useful automation pipeline needs to handle those conditions instead of assuming everything works.",
    whatLearned:
      "Reliable automation requires validation, recovery paths, and explicit failure handling.",
    architecture: [
      "IDEA",
      "RESEARCH",
      "AI GENERATION",
      "VALIDATION",
      "CONTENT",
      "AUTOMATION",
      "PUBLISH",
    ],
    tech: [
      { name: "AI generation API (Gemini)", status: "built" },
      { name: "Automated multi-stage pipeline", status: "built" },
      { name: "Validation logic", status: "built" },
      { name: "Retry / recovery handling", status: "built" },
      { name: "Rate-limit awareness", status: "built" },
    ],
    terminalEvents: [
      "GENERATION COMPLETE",
      "VALIDATING OUTPUT...",
      "VALIDATION FAILED",
      "RETRYING...",
      "RECOVERED",
      "PIPELINE CONTINUING",
    ],
    githubUrl: "https://github.com/rogue213ss",
    accent: "primary",
  },
  {
    id: "streaming-platform",
    number: "04",
    name: "STREAMING PLATFORM",
    tagline: "Content, discovery, and playback as one system.",
    pipeline: ["DISCOVER", "SEARCH", "PLAY"],
    statusLabel: "BUILT / DEVELOPMENT PROJECT",
    featured: true,
    description:
      "A full-stack media platform focused on making browsing, discovery, search, and playback feel like one coherent product instead of disconnected pages.",
    whatIsIt:
      "A streaming-platform project focused on building a complete media browsing and playback experience.",
    whyBuilt:
      "To explore content discovery, search, categorization, media presentation, playback workflows, and API-driven frontend/backend integration as one connected system.",
    whatWasHard:
      "Designing an experience where browsing, discovery, content metadata, and playback feel like one coherent system rather than disconnected pages.",
    whatLearned:
      "How to keep a multi-part media experience — catalog, search, detail pages, and a player — coherent as a single application rather than a set of separate screens.",
    architecture: [
      "CONTENT CATALOG",
      "DISCOVERY",
      "SEARCH",
      "CONTENT DETAILS",
      "PLAYBACK",
    ],
    tech: [{ name: "STACK — CONFIGURE", status: "configure" }],
    mediaRail: true,
    githubUrl: "https://github.com/rogue213ss",
    accent: "secondary",
  },
  {
    id: "spotify-finder",
    number: "05",
    name: "SPOTIFY ALBUM FINDER",
    tagline: "Search, browse, listen.",
    pipeline: ["SEARCH", "API", "DISCOVERY"],
    statusLabel: "BUILT",
    featured: false,
    description:
      "An album search and discovery app built on the Spotify API — practical API integration with a focused, artwork-first frontend.",
    whatIsIt:
      "A frontend app that searches Spotify's catalog for albums and presents results as a browsable, artwork-first grid with metadata on hover — deployed live on Netlify.",
    whyBuilt:
      "A focused project to get real, hands-on practice consuming a production third-party API and turning its JSON responses into a clean, responsive interface.",
    whatWasHard:
      "Handling Spotify API auth and search responses cleanly, and keeping the artwork-heavy grid responsive and fast without a framework.",
    whatLearned: "Practical third-party API integration end to end, from auth to a polished frontend result.",
    tech: [
      { name: "JavaScript", status: "built" },
      { name: "HTML / CSS", status: "built" },
      { name: "Spotify API", status: "built" },
      { name: "Netlify", status: "built" },
    ],
    githubUrl: "https://github.com/rogue213ss",
    liveUrl: "#",
    accent: "primary",
  },
  {
    id: "attendance",
    number: "06",
    name: "ATTENDANCE MANAGEMENT SYSTEM",
    tagline: "Records, without the spreadsheet.",
    pipeline: ["DATA", "DATABASE", "MANAGEMENT"],
    statusLabel: "BUILT",
    featured: false,
    description:
      "A database-driven desktop application for managing student attendance and academic records.",
    whatIsIt:
      "A structured C# application backed by a SQL database for recording and managing student attendance and associated academic records.",
    whyBuilt:
      "A coursework project focused on applying relational database design to a real, structured record-keeping problem instead of a toy dataset.",
    whatWasHard:
      "Designing a schema and queries that hold up for real attendance/record workflows rather than a single flat table.",
    whatLearned: "Database-driven application design end to end: schema, queries, and a UI that reads from both.",
    tech: [
      { name: "C#", status: "built" },
      { name: "SQL", status: "built" },
      { name: "Database design", status: "built" },
    ],
    githubUrl: "https://github.com/rogue213ss",
    accent: "secondary",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
