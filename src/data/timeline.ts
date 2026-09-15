export interface TimelineEntry {
  id: string;
  label: string;
  detail: string;
}

export const timeline: TimelineEntry[] = [
  { id: "cs", label: "COMPUTER SCIENCE", detail: "SZABIST Islamabad — 4th semester" },
  { id: "web", label: "WEB DEVELOPMENT", detail: "HTML, CSS, JavaScript fundamentals" },
  { id: "fullstack", label: "FULL-STACK DEVELOPMENT", detail: "Python, Flask, React, databases" },
  { id: "nimlyx", label: "NIMLYX", detail: "Steam analytics dashboard, in active development" },
  { id: "retrace", label: "RETRACE", detail: "Debugging memory system, currently building" },
  { id: "ai", label: "AI-ASSISTED DEVELOPMENT", detail: "Building faster without cutting corners" },
];

export const loop = ["IDEA", "BUILD", "BREAK", "DEBUG", "LEARN", "REBUILD"];

export const process = ["IDEA", "DESIGN", "ENGINEERING", "TEST", "SHIP"];

export const howIWork = [
  { id: "build", label: "Build" },
  { id: "break", label: "Break" },
  { id: "debug", label: "Debug" },
  { id: "learn", label: "Learn" },
  { id: "improve", label: "Improve" },
  { id: "ship", label: "Ship" },
];
