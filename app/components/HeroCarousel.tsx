"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const SLIDES = [
  { src: "/hero/slide1.png", alt: "Rodas e pneus montados em carro esportivo" },
  { src: "/hero/slide2.png", alt: "Geometria e alinhamento 3D" },
  { src: "/hero/slide3.png", alt: "Showroom de rodas com iluminação LED" },
];

// --- Transição: varredura em gradiente, da esquerda para a direita ----------
// A foto que entra é revelada por uma máscara de gradiente bem larga
// (mask-size 400%), então a borda é um degradê de mais de uma tela de largura
// em vez de uma linha — daí a sensação contínua. Uma camada preta com a mesma
// máquina, porém adiantada, escurece a foto que sai logo à frente da que chega.
// Anima-se mask-position (reposiciona uma máscara já rasterizada), não o
// gradiente em si, que teria de ser regerado a cada frame.
const TRANSICAO_S = 2.5;
const PARADA_MS = 3200;
const SWIPE_THRESHOLD = 40;

export default function HeroCarousel() {
  const [{ active, prev }, setSlide] = useState({ active: 0, prev: 0 });
  const entrandoRef = useRef<HTMLImageElement | null>(null);
  const escurecerRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  const goTo = (index: number) => {
    setSlide((s) => {
      const proximo = (index + SLIDES.length) % SLIDES.length;
      return proximo === s.active ? s : { active: proximo, prev: s.active };
    });
  };

  // autoplay: reinicia a cada troca, inclusive nas manuais
  useEffect(() => {
    const id = setTimeout(
      () => setSlide((s) => ({ active: (s.active + 1) % SLIDES.length, prev: s.active })),
      PARADA_MS + TRANSICAO_S * 1000
    );
    return () => clearTimeout(id);
  }, [active]);

  // a varredura em si
  useEffect(() => {
    const entrando = entrandoRef.current;
    const escurecer = escurecerRef.current;
    if (!entrando) return;

    const semAnimacao =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const aplicar = (p: number) => {
      const pos = `${(1 - p) * 100}% 0`;
      entrando.style.maskPosition = pos;
      entrando.style.webkitMaskPosition = pos;
      // A borda da varredura já clareia sozinha: ali a foto nova está
      // semitransparente sobre a antiga escurecida. Este brilho global só
      // suaviza a entrada e termina cedo, para não escurecer o que já passou.
      entrando.style.filter = `brightness(${(0.45 + 0.55 * Math.min(1, p / 0.4)).toFixed(3)})`;
      if (escurecer) {
        escurecer.style.maskPosition = pos;
        escurecer.style.webkitMaskPosition = pos;
      }
    };

    if (semAnimacao) {
      aplicar(1);
      return;
    }

    const estado = { p: 0 };
    aplicar(0);
    const tween = gsap.to(estado, {
      p: 1,
      duration: TRANSICAO_S,
      ease: "power1.inOut",
      onUpdate: () => aplicar(estado.p),
    });
    return () => {
      tween.kill();
    };
  }, [active]);

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
    if (touchDeltaX.current > SWIPE_THRESHOLD) goTo(active - 1);
    else if (touchDeltaX.current < -SWIPE_THRESHOLD) goTo(active + 1);
    touchStartX.current = null;
    touchDeltaX.current = 0;
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
          mesmo transform, então as fotos nunca saem de registro. */}
      <div className="hero-drift absolute inset-0">
        {/* Plano de baixo: foto anterior, inteira e parada */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SLIDES[prev].src}
          alt=""
          aria-hidden
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover object-center lg:object-[68%_center]"
        />

        {/* Camada preta que vai à frente, escurecendo a foto que sai */}
        <div ref={escurecerRef} aria-hidden className="hero-dim absolute inset-0" />

        {/* Plano de cima: foto que entra, revelada pela varredura */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={active}
          ref={entrandoRef}
          src={SLIDES[active].src}
          alt={SLIDES[active].alt}
          draggable={false}
          className="hero-sweep absolute inset-0 h-full w-full object-cover object-center lg:object-[68%_center]"
        />
      </div>

      {/* --- Overlays MOBILE --- */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f1319]/70 via-transparent to-[#0f1319]/20 lg:hidden" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0f1319]/30 via-transparent to-[#0f1319]/30 lg:hidden" />

      {/* --- Overlays DESKTOP --- */}
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
