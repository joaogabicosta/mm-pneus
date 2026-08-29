import type { Config } from "tailwindcss";

export default {
    content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
          extend: {
                  fontFamily: {
                            display: ["var(--font-display)", "sans-serif"],
                            sans: ["var(--font-sans)", "sans-serif"],
                  },
          },
    },
    plugins: [],
} satisfies Config;
