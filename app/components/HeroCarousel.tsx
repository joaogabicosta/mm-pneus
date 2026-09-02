"use client";

import { useEffect, useRef, useState } from "react";

const SLIDES = [
  { src: "/hero/slide1.png", alt: "Rodas e pneus montados em carro esportivo" },
  { src: "/hero/slide2.png", alt: "Geometria e alinhamento 3D" },
  { src: "/hero/slide3.png", alt: "Showroom de rodas com iluminação LED" },
];

const AUTOPLAY_MS = 5000;
const SWIPE_THRESHOLD = 40;

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, []);

  const goTo = (index: number) => {
    setActive((index + SLIDES.length) % SLIDES.length);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null) return;
    if (touchDeltaX.current > SWIPE_THRESHOLD) {
      goTo(active - 1);
    } else if (touchDeltaX.current < -SWIPE_THRESHOLD) {
      goTo(active + 1);
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  return (
    // Mobile: card 16/10 dentro da coluna do grid (igual ao que já era).
    // Desktop (lg+): sai do fluxo e vira o fundo full-bleed da <section> do hero.
    <div
      className="relative aspect-[16/10] touch-pan-y select-none overflow-hidden rounded-3xl border border-[#ff7a00]/20 shadow-2xl shadow-[#ff7a00]/10 lg:absolute lg:inset-0 lg:z-0 lg:aspect-auto lg:h-full lg:w-full lg:rounded-none lg:border-0 lg:shadow-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 overflow-hidden transition-opacity duration-1000 ease-in-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.src}
            alt={slide.alt}
            draggable={false}
            className={`h-full w-full object-cover object-center lg:object-[68%_center] ${
              i === active ? "hero-kenburns-active" : "hero-kenburns-idle"
            }`}
          />
        </div>
      ))}

      {/* --- Overlays MOBILE (mantidos como estavam) --- */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f1319]/70 via-transparent to-[#0f1319]/20 lg:hidden" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0f1319]/30 via-transparent to-[#0f1319]/30 lg:hidden" />

      {/* --- Overlays DESKTOP --- */}
      {/* Bloco preto sólido à esquerda -> fade para transparente à direita */}
      <div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{
          background:
            "linear-gradient(90deg, #0f1319 0%, #0f1319 40%, rgba(15,19,25,0.92) 52%, rgba(15,19,25,0.60) 66%, rgba(15,19,25,0.22) 82%, rgba(15,19,25,0) 100%)",
        }}
      />
      {/* Emendas de topo e base para a section colar no resto da página */}
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
