/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#07090d",
          soft: "#0c0f16",
          raised: "#11151d",
          line: "#1c222d",
        },
        graphite: {
          DEFAULT: "#7c8798",
          dim: "#4b5563",
          bright: "#c4cbd6",
        },
        signal: {
          DEFAULT: "#3ea6ff",
          soft: "#8fd3ff",
          deep: "#1668c7",
          dim: "#1b3a5c",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, rgba(7,9,13,0) 0%, rgba(7,9,13,1) 85%)",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "spin-slow-reverse": {
          from: { transform: "rotate(360deg)" },
          to: { transform: "rotate(0deg)" },
        },
      },
      animation: {
        blink: "blink 1.1s step-end infinite",
        marquee: "marquee 28s linear infinite",
        "spin-slow": "spin-slow 40s linear infinite",
        "spin-slow-reverse": "spin-slow-reverse 55s linear infinite",
      },
    },
  },
  plugins: [],
};
