import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000",
        secondary: "#B67D08",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        "primary-btn-gradient":
          "linear-gradient(91.58deg, #B51E0D 12.93%, rgba(214, 109, 22, 0.07) 114.46%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
