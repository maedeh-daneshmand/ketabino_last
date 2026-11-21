import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
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
        pine: {
          50: "#f2f7f3",
          100: "#e2ede4",
          200: "#c7dbcb",
          300: "#9fc2a6",
          400: "#6fa179",
          500: "#488255",
          600: "#366842",
          700: "#2c5436",
          800: "#1e3f20", // Farngrün from color palette
          900: "#18331a",
          950: "#0d1c0e",
        },
        sage: {
          50: "#f6f8f6",
          100: "#eaf0eb",
          200: "#d5e1d7",
          300: "#b5ccbb",
          400: "#8fa893",
          500: "#7c9082", // Salbeigrün from color palette
          600: "#617667",
          700: "#4d5d51",
          800: "#404c43",
          900: "#373f39",
        },
        honey: {
          50: "#fbf8f0",
          100: "#f6eedb",
          200: "#eedbb7",
          300: "#e4c489",
          400: "#dcaf62",
          500: "#d4a359", // Honiggelb from color palette
          600: "#bd8341",
          700: "#976233",
          800: "#7c4e2e",
          900: "#674129",
        },
        terracotta: {
          50: "#faf4f2",
          100: "#f4e6e2",
          200: "#ebd0c8",
          300: "#ddb0a4",
          400: "#d08c7a",
          500: "#c76d55", // Terrakotta from color palette
          600: "#b3543d",
          700: "#944331",
          800: "#7b392c",
          900: "#663329",
        },
        parchment: {
          50: "#fdfbf8",
          100: "#faf6f0", // Beige from color palette
          200: "#f3ece0",
          300: "#e8dcce",
          400: "#dac6b1",
          500: "#c8ad95",
          600: "#b5947a",
          700: "#997860",
          800: "#7e624f",
          900: "#675143",
        },
      },
      fontFamily: {
        sans: ["var(--font-vazirmatn)", "sans-serif"],
        serif: ["Georgia", "Cambria", "serif"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(30, 63, 32, 0.08)",
        "glass-lg": "0 12px 40px 0 rgba(30, 63, 32, 0.15)",
        "book-3d": "-8px 12px 24px -4px rgba(30, 40, 30, 0.3), -2px 4px 8px -2px rgba(30, 40, 30, 0.2)",
        "shelf-shadow": "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
};
export default config;
