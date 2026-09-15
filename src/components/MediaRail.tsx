import { motion } from "framer-motion";
import { Play } from "lucide-react";

const RAIL_WIDTHS = [1, 1.4, 1, 1.2, 1, 1.3];

/**
 * A lightweight stand-in for a streaming UI: a row of gradient "thumbnails"
 * with a play affordance on hover. No real thumbnails/content are implied —
 * this is a visual metaphor for the catalog, not a screenshot of the app.
 */
export default function MediaRail() {
  return (
    <div className="mt-5 overflow-hidden">
      <div className="flex gap-2">
        {RAIL_WIDTHS.map((w, i) => (
          <motion.div
            key={i}
            className="group/rail relative h-14 shrink-0 overflow-hidden rounded-md border border-obsidian-line bg-gradient-to-br from-signal/20 via-obsidian-raised to-obsidian-soft"
            style={{ width: `${w * 40}px` }}
            whileHover={{ scale: 1.06 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover/rail:opacity-100">
              <Play size={12} className="fill-signal-soft text-signal-soft" />
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-1.5 h-1 w-2/3 overflow-hidden rounded-full bg-obsidian-line">
        <div className="h-full w-1/3 rounded-full bg-signal/70" />
      </div>
    </div>
  );
}
