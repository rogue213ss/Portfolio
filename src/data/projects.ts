export type TechStatus = "built" | "planned" | "configure";

export interface TechItem {
  name: string;
  status: TechStatus;
}

export interface ProjectImage {
  /** Path relative to /public, e.g. "assets/luma/luma-app-home.webp" */
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface GalleryItem {
  caption: string;
  /** Omit `image` to render a clean placeholder slot until a screenshot exists. */
  image?: ProjectImage;
}

export interface EngineeringArea {
  label: string;
  detail: string;
}

export interface Project {
  id: string;
  number: string;
  name: string;
  tagline: string;
  pipeline: string[]; // short step label for the card, e.g. ["DATA", "ANALYSIS", "COMPATIBILITY"]
  statusLabel: string; // e.g. "IN ACTIVE DEVELOPMENT", "CLI V0 LIVE"
  featured: boolean;
  // "product" (default) = one of Ahmad's own products, rendered in Featured/Other.
  // "client" = client work, rendered in its own distinct Client Work section.
  category?: "product" | "client";
  description: string;
  whatIsIt?: string;
  whyBuilt?: string;
  whatWasHard?: string;
  whatLearned?: string;
  architecture?: string[]; // full pipeline diagram steps, shown in the expanded modal
  tech: TechItem[];
  routes?: string[]; // real API routes, technical annotation detail
  // Optional: some projects (e.g. client work with no public repo) have
  // no GitHub link to show at all — omit rather than pointing somewhere misleading.
  githubUrl?: string;
  liveUrl?: string;
  liveLabel?: string; // custom label for the live-project button, defaults to "Live demo ↗"
  terminalEvents?: string[]; // cycling terminal-style status lines for pipeline-style projects
  mediaRail?: boolean; // renders a mini content-rail mockup instead of a tech-tag preview
  accent: "primary" | "secondary";
  // Optional presentation extras (all additive — existing projects don't use them).
  /** Rendered as the full-width flagship showcase instead of a grid card. */
  flagship?: boolean;
  /** Cover image shown at the top of a grid card and in the detail modal. */
  cover?: ProjectImage;
  /** Extra outbound links beyond GitHub / live (e.g. Instagram). */
  links?: ProjectLink[];
  /** Short feature list for the flagship showcase. */
  highlights?: string[];
  /** Screenshot gallery for the flagship showcase. */
  gallery?: GalleryItem[];
  /** "What it demonstrates" breakdown for the flagship showcase. */
  engineering?: EngineeringArea[];
}

const GITHUB_PROFILE = "https://github.com/rogue213ss";

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
      "\"Steam tells you what games exist. Nimlyx tells you what games are worth your time, money, and hardware.\" Nimlyx combines Steam data, search, and discovery with a real analysis layer: a hardware compatibility engine and a custom classification system (the 'Potato' tiers) that tells a player whether a game will actually run well on their machine — something Steam's own store page doesn't do.",
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
      { name: "BeautifulSoup", status: "built" },
      { name: "Jinja2", status: "built" },
      { name: "SQLAlchemy", status: "built" },
      { name: "JavaScript", status: "built" },
      { name: "HTML / CSS", status: "built" },
      { name: "REST APIs", status: "built" },
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
    githubUrl: GITHUB_PROFILE,
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
      "REtrace is a Python CLI package (retrace init / log / log-commit / sessions / review) that passively captures shell and Git activity into a local SQLite event log, deterministically correlates it into debugging sessions, and turns each session into a reviewable memory a developer can search later — no LLM required to prove the core idea.",
    whyBuilt:
      "Developers forget what they already tried while debugging. REtrace exists to passively remember the process — the failed attempts and dead ends, not just the eventual commit — so that context isn't lost the next time the same bug shows up.",
    whatWasHard:
      "Session reconstruction: deciding whether a new event belongs to an existing debugging session or starts a new one, deterministically. The logic reuses a session based on last_event_at rather than when the session originally started, with an idle-window of roughly 20 minutes, and sessions carry a state — OPEN, RESOLVED, or ABANDONED — so a stream of terminal events becomes a meaningful, reviewable timeline instead of noise.",
    whatLearned:
      "How to design event-sourced session logic around a fuzzy real-world signal (idle time) instead of a hard boundary, and how to structure a CLI as a properly installable Python package that stays useful — and provable — on its own, before any frontend or LLM layer exists.",
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
      { name: "SQLite (local event/session database)", status: "built" },
      { name: "Git commit integration", status: "built" },
      { name: "React + TypeScript frontend", status: "planned" },
      { name: "FastAPI", status: "planned" },
      { name: "PostgreSQL + pgvector", status: "planned" },
      { name: "SQLAlchemy + Alembic", status: "planned" },
      { name: "Redis + Celery + Docker", status: "planned" },
      { name: "Embeddings / RAG / hybrid search", status: "planned" },
      { name: "JWT auth", status: "planned" },
    ],
    githubUrl: GITHUB_PROFILE,
    accent: "secondary",
  },
  {
    id: "nimlyx-forge",
    number: "03",
    name: "NIMLYX FORGE",
    tagline: "Turning raw footage into a structured, searchable dataset.",
    pipeline: ["SCENES", "INTENTS", "DISCOVERY"],
    statusLabel: "ACTIVE — RESEARCH / DATA PROJECT",
    featured: true,
    description:
      "A gaming-documentary footage research and data project — game footage broken into structured scenes and tagged with visual intents, powering an automated YouTube footage-discovery system. 19 No Man's Sky scenes and 38 visual intents catalogued so far, with a V4 discovery system passing all 36 of its tests.",
    whatIsIt:
      "A gaming-documentary footage research and data project. Raw footage is broken into structured scenes and tagged with visual intents, building a dataset (currently 19 No Man's Sky scenes, 38 visual intents) that a YouTube footage-discovery system searches against — V4 of that discovery system passes all 36 of its tests.",
    whyBuilt:
      "To explore whether gaming footage can become a structured, queryable dataset — scenes and visual intents — instead of raw video that has to be scrubbed through by hand.",
    whatWasHard:
      "Modeling footage consistently: breaking documentary/gameplay footage into scenes and assigning visual intents in a way that's actually queryable, backed by SQLAlchemy models and Alembic migrations rather than an ad-hoc file structure — then validating that the discovery layer built on top of it works with a real automated test suite instead of eyeballing results.",
    whatLearned:
      "How to model unstructured video as structured, queryable data (scenes + visual intents) on SQLite with SQLAlchemy/Alembic, and how to validate an automated discovery pipeline with a real test suite rather than trusting it by inspection.",
    architecture: [
      "FOOTAGE SOURCES",
      "SCENE STRUCTURING",
      "VISUAL INTENT TAGGING",
      "DATASET (NO MAN'S SKY)",
      "YOUTUBE DISCOVERY (V4)",
      "AUTOMATED TESTING",
    ],
    tech: [
      { name: "SQLite", status: "built" },
      { name: "SQLAlchemy", status: "built" },
      { name: "Alembic", status: "built" },
      { name: "Structured scene & visual-intent modeling", status: "built" },
      { name: "YouTube footage discovery (V4)", status: "built" },
    ],
    terminalEvents: [
      "SCENE INDEXED",
      "VISUAL INTENT TAGGED",
      "DATASET UPDATED",
      "DISCOVERY TEST: 36/36 PASSED",
      "FOOTAGE MATCHED",
      "INDEX SYNCED",
    ],
    githubUrl: GITHUB_PROFILE,
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
    githubUrl: GITHUB_PROFILE,
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
    githubUrl: GITHUB_PROFILE,
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
    githubUrl: GITHUB_PROFILE,
    accent: "secondary",
  },
  {
    id: "client-hunter",
    number: "07",
    name: "CLIENT HUNTER",
    tagline: "Freelance client hunting, as a technical discovery problem.",
    pipeline: ["DISCOVER", "ANALYZE", "SCORE"],
    statusLabel: "V0.7 — ACTIVE",
    featured: false,
    description:
      "A freelance client-discovery tool that turns lead-hunting into a structured technical-opportunity problem — not a generic scraper, a system that evaluates commercial and technical signals before a lead is worth pursuing.",
    whatIsIt:
      "A freelance client-discovery and opportunity-analysis tool. It discovers potential business leads from the web using DuckDuckGo Lite, stores them in SQLite, and evaluates whether each one represents a genuine commercial or technical opportunity — analyzing signals rather than just collecting URLs. The latest milestone, V0.7, added a Commercial Intent + Technical Opportunity Layer (hunter.discovery.commercial_intent, CommercialIntentEvidence, commercial-intent synthesis, and technical opportunity signals).",
    whyBuilt:
      "To turn freelance client hunting into a structured technical-discovery problem instead of manual, unstructured lead searching.",
    whatWasHard:
      "Evaluating commercial/technical intent from analyzed signals rather than simple keyword matching, while staying deterministic and avoiding arbitrary country-based scoring bias — tested with a strong emphasis on that determinism.",
    whatLearned:
      "How to turn 'is this a real opportunity' into a structured, deterministic signal-evaluation problem instead of a scraped list of URLs.",
    tech: [
      { name: "SQLite", status: "built" },
      { name: "DuckDuckGo Lite discovery", status: "built" },
      { name: "Commercial Intent + Technical Opportunity Layer (V0.7)", status: "built" },
    ],
    githubUrl: GITHUB_PROFILE,
    accent: "primary",
  },
  {
    id: "nimlyx-do",
    number: "08",
    name: "NIMLYX DO",
    tagline: "Tools that actually do something.",
    pipeline: ["COMPRESS", "CONVERT", "DOWNLOAD"],
    statusLabel: "IN ACTIVE DEVELOPMENT",
    featured: false,
    description:
      "A utility site built around tools that actually do something — image, PDF, and developer utilities with real progress states, privacy-first client-side processing where practical. Not a generic calculator collection.",
    whatIsIt:
      "A utility/tools website — Image Compressor, Image Resizer, JSON Formatter, PDF Merger, and PDF Compressor are live, with more tools in progress — built with Next.js 14 (App Router), TypeScript, and Tailwind CSS, doing client-side processing wherever practical. No backend/database in the current architecture.",
    whyBuilt:
      "To build tools people actually reach for — practical file, image, PDF, and developer utilities — instead of another generic calculator site.",
    whatWasHard:
      "Making file-processing tools feel trustworthy: showing meaningful progress stages (compressing / progress, preparing download, downloading) instead of a generic spinner, so the user always understands what the tool is doing — while keeping processing client-side wherever practical for privacy.",
    whatLearned:
      "How to design client-side file tools that communicate real progress and stay privacy-first, without leaning on a backend.",
    tech: [
      { name: "Next.js 14 (App Router)", status: "built" },
      { name: "TypeScript", status: "built" },
      { name: "Tailwind CSS", status: "built" },
      { name: "Vitest", status: "built" },
      { name: "Client-side processing", status: "built" },
    ],
    githubUrl: GITHUB_PROFILE,
    accent: "secondary",
  },
  {
    id: "ocean-collapse",
    number: "09",
    name: "THE OCEAN COLLAPSE",
    tagline: "A domed coral town, and the disaster coming for it.",
    pipeline: ["SURVIVE", "STEALTH", "EVACUATE"],
    statusLabel: "GAME PROJECT — ACTIVE DEVELOPMENT",
    featured: false,
    description:
      "A 2-player underwater survival/stealth game: a domed coral town of fish-people, a seismic disaster, and the evacuation that follows. In active development, not a finished release.",
    whatIsIt:
      "A 2-player underwater survival/stealth game built in Godot. Players navigate a domed coral town of fish-people, dealing with survival, stealth, and exploration while a seismic/lava disaster forces an evacuation — including a faction called the Bubbling Buccaneers. Currently in active development, with Git and Git LFS set up for the project.",
    whyBuilt:
      "To build a complete 2-player game experience around a specific disaster-and-evacuation scenario, and get real, hands-on practice with Godot game development.",
    whatWasHard:
      "Designing a 2-player stealth/survival loop around one shared catastrophic event — the seismic/lava disaster and evacuation — so it has to work for both players at once, not just as independent solo survival mechanics.",
    whatLearned:
      "Godot fundamentals for a co-op game built around a shared world event rather than independent player states.",
    tech: [
      { name: "Godot", status: "built" },
      { name: "Git + Git LFS", status: "built" },
    ],
    githubUrl: GITHUB_PROFILE,
    accent: "primary",
  },
  {
    id: "photography-site",
    number: "01",
    name: "AHSAN BIN RAUF PHOTOGRAPHY",
    tagline: "Custom WordPress build, now a local-SEO architecture project.",
    pipeline: ["BUILD", "STRUCTURE", "RANK"],
    statusLabel: "CLIENT SITE — LIVE / SEO IN PROGRESS",
    featured: false,
    category: "client",
    description:
      "A custom WordPress photography website, now extended into a local-SEO architecture project targeting real search intent — photography, wedding photography, wedding shoots, photoshoots — not just the photographer's name.",
    whatIsIt:
      "A custom WordPress photography website (ahsanbinrauf.com) built on a custom-converted theme. The project has since moved beyond the build itself into an SEO architecture effort targeting real local searches — photography, wedding photography, wedding shoots, photoshoots — based on the live site's existing structure (the / page, /book-a-session/, the abr_portfolio custom post type and its taxonomy) and actual Google Search Console data.",
    whyBuilt:
      "The client needed a real, custom-themed WordPress site — and once it was live, the next real problem was getting it found for the searches that actually bring business, not just brand-name searches.",
    whatWasHard:
      "Building an SEO architecture around a real site's existing structure — the live pages, the abr_portfolio CPT and its taxonomy — and real Google Search Console data, instead of following a generic SEO checklist.",
    whatLearned:
      "How to plan technical SEO from real Search Console data and existing site architecture (custom post types and taxonomies) rather than guessing at keywords.",
    tech: [
      { name: "WordPress", status: "built" },
      { name: "Custom theme (converted from original design)", status: "built" },
      { name: "Custom post type: abr_portfolio", status: "built" },
      { name: "Technical SEO (Search Console-driven)", status: "built" },
    ],
    liveUrl: "https://ahsanbinrauf.com/",
    liveLabel: "Visit site ↗",
    accent: "secondary",
  },
  {
    id: "luma",
    number: "10",
    name: "LUMA",
    tagline: "Windows Music Companion",
    pipeline: ["CAPTURE", "ANALYZE", "VISUALIZE"],
    statusLabel: "WINDOWS DESKTOP PRODUCT",
    featured: true,
    flagship: true,
    description:
      "A Windows desktop music companion and ambient visualizer that reacts to whatever is playing in real time, turning the current track into a cinematic, immersive visual experience. Independently designed, built and shipped as a real product.",
    whatIsIt:
      "Luma is a Windows desktop music companion and ambient music visualizer built to make listening to music more immersive. It reacts to music in real time, creating cinematic visual experiences around the currently playing track — with synchronized lyrics, album-art-driven color palettes and multiple visual presets.",
    whyBuilt:
      "To make listening to music on a PC more immersive — and to build and ship a complete, independently developed desktop product: native audio and media integration, a polished interface, a public website and licensing tiers.",
    highlights: [
      "Real-time audio-reactive visualizations",
      "Spotify and Windows media playback integration",
      "Dynamic color palettes drawn from album art",
      "Synchronized lyrics with cinematic presentation modes",
      "Multiple visual presets and customization controls",
      "Immersive desktop listening experience",
      "Audio processed locally — no cloud audio streaming",
      "Lifetime and Exclusive licensing tiers",
    ],
    engineering: [
      { label: "FRONTEND", detail: "React 18 + TypeScript interface" },
      { label: "NATIVE / SYSTEMS", detail: "Tauri 2 shell, Rust, Windows GSMTC media integration" },
      { label: "AUDIO", detail: "WASAPI loopback capture and FFT-based analysis" },
      { label: "PRODUCT", detail: "Public website and Lifetime / Exclusive licensing tiers" },
    ],
    tech: [
      { name: "Tauri 2", status: "built" },
      { name: "React 18", status: "built" },
      { name: "TypeScript", status: "built" },
      { name: "Rust", status: "built" },
      { name: "Windows GSMTC", status: "built" },
      { name: "WASAPI loopback", status: "built" },
      { name: "FFT audio analysis", status: "built" },
    ],
    gallery: [
      {
        caption: "Home — now playing",
        image: {
          src: "assets/luma/luma-app-home.webp",
          alt: "Luma's home screen: a now-playing Spotify track with album art and playback controls over a full-window cinematic wallpaper, with a slim icon rail on the left.",
          width: 1437,
          height: 842,
        },
      },
      {
        caption: "Product website",
        image: {
          src: "assets/luma/luma-website.webp",
          alt: "The Luma website hero: 'Don't just listen. Feel it.' with a Lifetime License call to action and Windows 10 and 11 support noted.",
          width: 1395,
          height: 733,
        },
      },
      // Placeholder slots — add an `image` to any of these to turn it into a real screenshot.
      { caption: "Cinematic lyrics" },
      { caption: "Visual presets" },
    ],
    liveUrl: "https://lumaplayer.vercel.app/",
    liveLabel: "Visit website",
    links: [{ label: "Instagram — product demos", url: "https://www.instagram.com/luma.player/" }],
    accent: "primary",
  },
  {
    id: "station-zero",
    number: "11",
    name: "STATION ZERO",
    tagline: "Learn C++. Save the station.",
    pipeline: ["EXPLORE", "CODE", "RESTORE"],
    statusLabel: "PLAYABLE IN BROWSER",
    featured: false,
    description:
      "A 2D pixel-art sci-fi action-adventure that teaches C++. You wake on a damaged station whose AI, NOVA, answers to one language — every system comes back online when you write a working program in an in-game terminal.",
    whatIsIt:
      "A 2D pixel-art sci-fi action-adventure where the puzzles are C++ lessons. Players explore a dark station, write C++ at in-game terminals (with three levels of hints), and bring systems back online one task at a time — across a 20-task campaign with a codex, a log, a station map and boss fights.",
    whyBuilt:
      "To make learning C++ feel like playing a game instead of reading a textbook. It was also played by students during an introductory C++ session run as part of a university community-service project.",
    whatWasHard:
      "Shipping a full game as one self-contained HTML file — Canvas, JavaScript and CSS with sprites and audio embedded, no frameworks and no external requests.",
    tech: [
      { name: "HTML5 Canvas", status: "built" },
      { name: "JavaScript", status: "built" },
      { name: "CSS", status: "built" },
      { name: "Single-file build, embedded assets", status: "built" },
      { name: "Vercel", status: "built" },
    ],
    cover: {
      src: "assets/station-zero/station-zero-gameplay.webp",
      alt: "Station Zero gameplay: an astronaut engineer standing beside a glowing terminal in the COM-1 Operations Cabin, with the NOVA AI drone, a minimap and a dialogue box giving the first task.",
      width: 1439,
      height: 899,
    },
    liveUrl: "https://stationzerofin.vercel.app/",
    liveLabel: "PLAY STATION ZERO →",
    accent: "secondary",
  },
];

export const featuredProjects = projects.filter((p) => p.featured && !p.flagship);
export const flagshipProjects = projects.filter((p) => p.flagship);
export const otherProjects = projects.filter((p) => !p.featured && p.category !== "client");
export const clientWorkProjects = projects.filter((p) => p.category === "client");
