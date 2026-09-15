export type SkillCategory =
  | "LANGUAGES"
  | "BACKEND"
  | "FRONTEND"
  | "TOOLS"
  | "SPECIAL INTERESTS";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  blurb: string;
  usedIn: string[];
}

export const skills: Skill[] = [
  // Languages
  { id: "cpp", name: "C++", category: "LANGUAGES", blurb: "Systems-level logic and coursework projects.", usedIn: ["Coursework", "Automation experiments"] },
  { id: "python", name: "Python", category: "LANGUAGES", blurb: "Backend services, scraping, automation, data work.", usedIn: ["Nimlyx", "Automation experiments"] },
  { id: "csharp", name: "C#", category: "LANGUAGES", blurb: "Desktop and database-driven applications.", usedIn: ["Attendance Management System"] },
  { id: "javascript", name: "JavaScript", category: "LANGUAGES", blurb: "Client-side interactivity and API integrations.", usedIn: ["Nimlyx", "Spotify Album Finder"] },
  { id: "html", name: "HTML", category: "LANGUAGES", blurb: "Semantic structure for every interface shipped.", usedIn: ["Nimlyx", "Spotify Album Finder"] },
  { id: "css", name: "CSS", category: "LANGUAGES", blurb: "Layout systems and glassmorphism detailing.", usedIn: ["Nimlyx", "Spotify Album Finder"] },
  // Backend
  { id: "node", name: "Node.js", category: "BACKEND", blurb: "Runtime for API and tooling experiments.", usedIn: ["RETRACE"] },
  { id: "express", name: "Express", category: "BACKEND", blurb: "Lightweight routing for service prototypes.", usedIn: ["RETRACE"] },
  { id: "flask", name: "Flask", category: "BACKEND", blurb: "Blueprint-structured backend serving live data.", usedIn: ["Nimlyx"] },
  { id: "rest", name: "REST APIs", category: "BACKEND", blurb: "Designing and consuming JSON APIs end to end.", usedIn: ["Nimlyx", "RETRACE"] },
  { id: "mssql", name: "MSSQL", category: "BACKEND", blurb: "Relational schema design for academic systems.", usedIn: ["Attendance Management System"] },
  // Frontend
  { id: "react", name: "React", category: "FRONTEND", blurb: "Component-driven interfaces with real state.", usedIn: ["This portfolio"] },
  { id: "tailwind", name: "Tailwind CSS", category: "FRONTEND", blurb: "Utility-first styling for fast, consistent UI.", usedIn: ["This portfolio"] },
  // Tools
  { id: "git", name: "Git", category: "TOOLS", blurb: "Version control across every solo and team repo.", usedIn: ["All projects"] },
  { id: "github", name: "GitHub", category: "TOOLS", blurb: "Hosting, issues, and history for shipped work.", usedIn: ["All projects"] },
  { id: "vscode", name: "VS Code", category: "TOOLS", blurb: "Primary editor for daily development.", usedIn: ["All projects"] },
  { id: "netlify", name: "Netlify", category: "TOOLS", blurb: "Static hosting and deploys for frontend projects.", usedIn: ["Spotify Album Finder"] },
  { id: "render", name: "Render", category: "TOOLS", blurb: "Backend hosting for Flask services.", usedIn: ["Nimlyx"] },
  { id: "railway", name: "Railway", category: "TOOLS", blurb: "Deployment target for database-backed services.", usedIn: ["RETRACE"] },
  { id: "wordpress", name: "WordPress", category: "TOOLS", blurb: "Freelance client sites and CMS builds.", usedIn: ["Client work"] },
  // Special interests
  { id: "ai-dev", name: "AI-assisted development", category: "SPECIAL INTERESTS", blurb: "Using AI tooling to move faster without losing rigor.", usedIn: ["Nimlyx", "RETRACE"] },
  { id: "automation", name: "Automation", category: "SPECIAL INTERESTS", blurb: "Removing repetitive steps from real workflows.", usedIn: ["Automation experiments"] },
  { id: "devtools", name: "Developer tooling", category: "SPECIAL INTERESTS", blurb: "Building tools developers actually reach for.", usedIn: ["RETRACE"] },
  { id: "dataviz", name: "Data visualization", category: "SPECIAL INTERESTS", blurb: "Turning raw data into decisions people can read.", usedIn: ["Nimlyx"] },
  { id: "sysdesign", name: "System design", category: "SPECIAL INTERESTS", blurb: "Structuring services so they hold up under load.", usedIn: ["Nimlyx"] },
];

export const skillCategories: SkillCategory[] = [
  "LANGUAGES",
  "BACKEND",
  "FRONTEND",
  "TOOLS",
  "SPECIAL INTERESTS",
];
