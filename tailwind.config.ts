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
    },
  },
  plugins: [],
} satisfies Config;
