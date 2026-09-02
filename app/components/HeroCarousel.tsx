"use client";

import { useEffect, useState } from "react";

const SLIDES = [
  { src: "/hero/slide1.png", alt: "Rodas e pneus montados em carro esportivo" },
  { src: "/hero/slide2.png", alt: "Geometria e alinhamento 3D" },
  { src: "/hero/slide3.png", alt: "Showroom de rodas com iluminação LED" },
];

// --- Transição estilo "dissolve de pixels" ---------------------------------
// A imagem que entra é montada como um mosaico: cada bloco nasce em uma ordem
// pseudo-aleatória sobre a imagem anterior, que vai "morrendo" conforme é
// coberta. HOLD = tempo parado, TRANSITION = duração do dissolve.
const COLS = 16;
const ROWS = 10;
const TILE_COUNT = COLS * ROWS;

const HOLD_MS = 3000;
const TRANSITION_MS = 2000;
const TILE_FADE_MS = 450;
const CYCLE_MS = HOLD_MS + TRANSITION_MS;

const SWIPE_THRESHOLD = 40;

// Ordem embaralhada de forma determinística (LCG com seed fixa), para que o
// HTML do servidor e o do cliente batam — Math.random() quebraria a hidratação.
const TILE_DELAYS: number[] = (() => {
  const order = Array.from({ length: TILE_COUNT }, (_, i) => i);
  let seed = 20260902;
  for (let i = order.length - 1; i > 0; i--) {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    const j = seed % (i + 1);
    [order[i], order[j]] = [order[j], order[i]];
  }
  const span = TRANSITION_MS - TILE_FADE_MS;
  const delays = new Array<number>(TILE_COUNT);
  order.forEach((tile, rank) => {
    delays[tile] = Math.round((rank / (TILE_COUNT - 1)) * span);
  });
  return delays;
})();

export default function HeroCarousel() {
  // prev = slide que fica embaixo, inteiro, enquanto o novo nasce por cima.
  const [{ active, prev }, setSlide] = useState({ active: 0, prev: 0 });
  const [born, setBorn] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchDeltaX, setTouchDeltaX] = useState(0);

  const goTo = (index: number) => {
    setSlide((s) => {
      const next = (index + SLIDES.length) % SLIDES.length;
      return next === s.active ? s : { active: next, prev: s.active };
    });
  };

  // Autoplay: reinicia a cada troca, inclusive nas manuais.
  useEffect(() => {
    const id = setTimeout(() => {
      setSlide((s) => ({ active: (s.active + 1) % SLIDES.length, prev: s.active }));
    }, CYCLE_MS);
    return () => clearTimeout(id);
  }, [active]);

  // Dois rAF: garante que o mosaico seja pintado em opacity 0 antes de subir
  // para 1, senão o browser agrupa as duas mudanças e não há transição.
  useEffect(() => {
    setBorn(false);
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setBorn(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [active]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchDeltaX(0);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return;
    setTouchDeltaX(e.touches[0].clientX - touchStartX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null) return;
    if (touchDeltaX > SWIPE_THRESHOLD) goTo(active - 1);
    else if (touchDeltaX < -SWIPE_THRESHOLD) goTo(active + 1);
    setTouchStartX(null);
    setTouchDeltaX(0);
  };

  return (
    // Mobile: faixa full-bleed (sangra o px-5 do container), altura por aspect-ratio.
    // Desktop (lg+): sai do fluxo e vira o fundo full-bleed da <section> do hero.
    <div
      className="relative -mx-5 my-8 aspect-[16/10] touch-pan-y select-none overflow-hidden border-y border-[#ff7a00]/20 lg:absolute lg:inset-0 lg:-z-10 lg:mx-0 lg:my-0 lg:aspect-auto lg:h-full lg:w-full lg:border-0"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* O drift lento fica num wrapper único: os dois planos compartilham o
          mesmo transform, então os blocos nunca saem de registro. */}
      <div className="hero-drift absolute inset-0">
        {/* Plano de baixo: imagem anterior, inteira e estática */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SLIDES[prev].src}
          alt=""
          aria-hidden
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover object-center lg:object-[68%_center]"
        />

        {/* Plano de cima: mosaico da imagem nova nascendo bloco a bloco */}
        <div
          key={active}
          role="img"
          aria-label={SLIDES[active].alt}
          className="absolute inset-0"
        >
          {Array.from({ length: TILE_COUNT }, (_, t) => {
            const col = t % COLS;
            const row = Math.floor(t / COLS);
            return (
              <div
                key={t}
                aria-hidden
                className="hero-tile absolute overflow-hidden"
                style={{
                  left: `${(col / COLS) * 100}%`,
                  top: `${(row / ROWS) * 100}%`,
                  width: `calc(${100 / COLS}% + 1px)`,
                  height: `calc(${100 / ROWS}% + 1px)`,
                  opacity: born ? 1 : 0,
                  transitionDuration: `${TILE_FADE_MS}ms`,
                  transitionDelay: `${TILE_DELAYS[t]}ms`,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={SLIDES[active].src}
                  alt=""
                  draggable={false}
                  className="absolute max-w-none object-cover object-center lg:object-[68%_center]"
                  style={{
                    left: `${-col * 100}%`,
                    top: `${-row * 100}%`,
                    width: `${COLS * 100}%`,
                    height: `${ROWS * 100}%`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* --- Overlays MOBILE --- */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f1319]/70 via-transparent to-[#0f1319]/20 lg:hidden" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0f1319]/30 via-transparent to-[#0f1319]/30 lg:hidden" />

      {/* --- Overlays DESKTOP --- */}
      {/* Bloco preto sólido à esquerda -> fade para transparente à direita */}
      <div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{
          background:
            "linear-gradient(90deg, #0f1319 0%, #0f1319 44%, rgba(15,19,25,0.90) 57%, rgba(15,19,25,0.55) 71%, rgba(15,19,25,0.18) 86%, rgba(15,19,25,0) 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-24 bg-gradient-to-b from-[#0f1319]/85 to-transparent lg:block" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-40 bg-gradient-to-t from-[#0f1319] via-[#0f1319]/55 to-transparent lg:block" />

      {/* Indicadores de paginação */}
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2 lg:bottom-10 lg:left-auto lg:right-10 lg:translate-x-0">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Ver slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === active ? "w-6 bg-[#ff7a00]" : "w-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
