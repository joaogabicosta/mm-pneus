import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      screens: {
        // "desk" = layout de computador. Vale para telas largas E para o
        // celular deitado: em paisagem a tela é baixa e larga, exatamente o
        // formato para o qual a versão de computador foi desenhada. Sem isso,
        // o celular na horizontal mostrava só o título do hero.
        desk: {
          raw: "(min-width: 1024px), (orientation: landscape) and (min-width: 600px) and (max-height: 700px)",
        },
        // "curto" = pouca altura disponível (celular deitado, notebook baixo).
        // Usado só para encolher tipografia e respiros, nunca para trocar de
        // layout — quem troca o layout é o "desk".
        curto: { raw: "(orientation: landscape) and (max-height: 700px)" },
      },
    },
  },
  plugins: [],
} satisfies Config;
