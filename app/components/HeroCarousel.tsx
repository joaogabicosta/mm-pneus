"use client";

import { useEffect, useState } from "react";

const SLIDES = [
  { src: "/hero/slide-1.jpg", alt: "Rodas e pneus montados em carro esportivo" },
  { src: "/hero/slide-2.jpg", alt: "Geometria e alinhamento 3D" },
  { src: "/hero/slide-3.jpg", alt: "Showroom de rodas com iluminação LED" },
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-[#ff7a00]/20 shadow-2xl shadow-[#ff7a00]/10">
      {SLIDES.map((slide, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
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
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === active ? "w-6 bg-[#ff7a00]" : "w-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
