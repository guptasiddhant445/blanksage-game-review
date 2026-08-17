import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        review: {
          best: "#96bc4b",
          great: "#5c8bb0",
          good: "#96bc4b",
          book: "#a88b60",
          inaccuracy: "#f0c15c",
          mistake: "#e58f2a",
          blunder: "#ca3431",
        }
      },
    },
  },
  plugins: [],
};
export default config;
