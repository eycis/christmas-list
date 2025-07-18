import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily :{
        title: ["Dancing Script", "serif"],
        text: ["Inter", "serif"]
      },
      letterSpacing: {
        wideTitle: '0.01em',
      },
      animation: {
        "fade-in" : "fadeIn 0.6s ease-out"
      },
      keyframes: {
        fadeIn: {
          "0%": {opacity: "0"},
          "1000%": {opacity: "100"},
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
