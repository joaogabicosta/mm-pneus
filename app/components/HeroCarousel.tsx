"use client";

import { useEffect, useRef, useState } from "react";

const SLIDES = [
  { src: "/hero/slide1.png", alt: "Rodas e pneus montados em carro esportivo" },
  { src: "/hero/slide2.png", alt: "Geometria e alinhamento 3D" },
  { src: "/hero/slide3.png", alt: "Showroom de rodas com iluminação LED" },
];

const AUTOPLAY_MS = 3000;
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
    <div
      className="relative aspect-[16/10] touch-pan-y select-none overflow-hidden rounded-3xl border border-[#ff7a00]/20 shadow-2xl shadow-[#ff7a00]/10"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {SLIDES.map((slide, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          draggable={false}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-in-out ${
            i === active ? "scale-100 opacity-100" : "scale-105 opacity-0"
          }`}
        />
      ))}

      {/* Gradientes escuros sutis nas bordas */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f1319]/70 via-transparent to-[#0f1319]/20" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0f1319]/30 via-transparent to-[#0f1319]/30" />

      {/* Indicadores de paginação */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
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
