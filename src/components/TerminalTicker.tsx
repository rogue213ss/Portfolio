import { useEffect, useState } from "react";

interface TerminalTickerProps {
  events: string[];
}

/**
 * Cycles through a fixed list of terminal-style status lines to suggest a
 * live automation pipeline. Purely decorative — no real process runs here —
 * so it never claims a specific run count or outcome, only the same
 * illustrative event names the project actually surfaces in its own CLI.
 */
export default function TerminalTicker({ events }: TerminalTickerProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % events.length);
    }, 1600);
    return () => clearInterval(id);
  }, [events.length]);

  const current = events[index];
  const isFailure = current.includes("FAILED");
  const isRetry = current.includes("RETRY");
  const isRecovered = current.includes("RECOVERED");

  const color = isFailure
    ? "text-red-400/80"
    : isRetry
    ? "text-amber-300/80"
    : isRecovered
    ? "text-emerald-300/80"
    : "text-signal-soft";

  return (
    <div className="mono-label mt-5 flex items-center gap-2 rounded-lg border border-obsidian-line bg-obsidian/60 px-3 py-2 text-[11px]">
      <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-signal" />
      <span className={`transition-colors duration-300 ${color}`}>
        {current}
      </span>
    </div>
  );
}
