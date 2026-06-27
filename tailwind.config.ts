import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111315",
        paper: "#f7f7f4",
        line: "rgba(17, 19, 21, 0.12)",
        accent: "#2c6fbb",
        mint: "#63a890",
        gold: "#b59048"
      },
      boxShadow: {
        soft: "0 24px 70px rgba(17, 19, 21, 0.10)",
        glow: "0 24px 90px rgba(44, 111, 187, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
