import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#1A1A1A", soft: "#3A3A3A", faint: "#6B6B6B" },
        acid: { DEFAULT: "#13EB66", dim: "#0FBF52" },
        amber: "#F59E0B",
        canvas: "#F9FAFB",
        paper: "#FFFFFF",
        line: "rgba(26,26,26,0.10)",
      },
      fontFamily: {
        display: ['Figtree', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: { brutal: "0.18em" },
      boxShadow: { brutal: "3px 3px 0 0 #1A1A1A", "brutal-sm": "2px 2px 0 0 #1A1A1A" },
      maxWidth: { edge: "1200px" },
    },
  },
  plugins: [],
};
export default config;
