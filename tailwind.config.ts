import { Cinzel, Cormorant_Garamond, Exo, Montserrat, Roboto, Tangerine } from "next/font/google";
import type { Config } from "tailwindcss";

export default {
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
      },
      fontFamily:{
        anton: ['Anton', 'sans-serif'],
        Montserrat: ['Montserrat', 'sans-serif'],
        Roboto: ['Roboto', 'sans-serif'],
        Exo: ['Exo', 'sans-serif'],
        Tangerine : ['Tangerine','sans-serif'],
        Cinzel : ['Cinzel', 'sans-serif'],
        Cormorant :['Cormorant Garamond','sans-serif']
      }
    },
  },
  plugins: [],
} satisfies Config;
