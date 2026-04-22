import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-dm-sans)"],
        serif: ["var(--font-fraunces)"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        forest: { 
          900: '#1B4332', 
          700: '#2D6A4F', 
          500: '#52B788', 
          300: '#95D5B2', 
          100: '#D8F3DC' 
        },
        ocean: { 
          700: '#0077B6', 
          400: '#48CAE4', 
          200: '#90E0EF' 
        },
        sand: { 
          100: '#FEFAE0', 
          300: '#DDA15E', 
          500: '#BC6C25' 
        },
        coral: { 
          500: '#E76F51', 
          300: '#F4A261', 
          100: '#E9C46A' 
        },
        dark: '#2B2D42'
      },
    },
  },
  plugins: [],
};
export default config;
