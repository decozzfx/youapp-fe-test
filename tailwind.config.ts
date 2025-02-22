import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "background-auth":
          "radial-gradient(121.73% 121.49% at 100% -3.39%, #1F4247 0%, #0D1D23 56.18%, #09141A 100%)",
        "gradient-button":
          "linear-gradient(108.32deg, #62CDCB 24.88%, #4599DB 78.49%)",
      },
      colors: {
        gold: "#94783E",
        transparent: "transparent",
        "deep-teal": "#1F4247",
        "dark-charcoal": "#0D1D23",
        "midnight-blue": "#09141A",
        "default-dark-Blue": "#162329",
        customDarkBlue: "#0E191F",
        "input-gray": "#D9D9D90F",
      },
    },
  },
  plugins: [],
};
export default config;
