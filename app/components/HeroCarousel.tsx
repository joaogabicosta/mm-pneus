"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { BADGES } from "../badges";

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

// --- Trilha de miniaturas do celular ---------------------------------------
// A rolagem lateral é infinita: as mesmas fotos são repetidas em vários blocos
// e, sempre que o visitante se afasta do bloco do meio, a trilha salta de volta
// para a cópia equivalente no centro da fita — sem animação, então o salto é
// invisível. Assim nunca existe começo nem fim para bater.
const BLOCOS = 7;
const BLOCO_MEIO = Math.floor(BLOCOS / 2);
const MINIATURAS = Array.from({ length: BLOCOS * SLIDES.length }, (_, i) => i);
// mesma largura declarada na classe do botão (w-[100px]); a conta de
// centralização usa o DOM, este valor serve só para o tamanho fixo do item.

export default function HeroCarousel() {
  const [{ active, prev }, setSlide] = useState({ active: 0, prev: 0 });
  // muda a cada assentamento da trilha só para rearmar o autoplay
  const [reinicio, setReinicio] = useState(0);

  const entrandoRef = useRef<HTMLImageElement | null>(null);
  const escurecerRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  const trilhaRef = useRef<HTMLDivElement | null>(null);
  const itensRef = useRef<(HTMLButtonElement | null)[]>([]);
  const arrastando = useRef(false);
  const primeiraVez = useRef(true);

  const goTo = (index: number) => {
    setSlide((s) => {
      const proximo = (index + SLIDES.length) % SLIDES.length;
      return proximo === s.active ? s : { active: proximo, prev: s.active };
    });
  };

  // autoplay: reinicia a cada troca, inclusive nas manuais
  useEffect(() => {
    const id = setTimeout(() => {
      // enquanto o dedo está na trilha quem manda é ele
      if (arrastando.current) return;
      setSlide((s) => ({ active: (s.active + 1) % SLIDES.length, prev: s.active }));
    }, PARADA_MS + TRANSICAO_S * 1000);
    return () => clearTimeout(id);
  }, [active, reinicio]);

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

  // ---- trilha de miniaturas ------------------------------------------------
  // posição de scroll que deixa um item exatamente no centro da trilha
  const centroDe = (i: number) => {
    const trilha = trilhaRef.current;
    const el = itensRef.current[i];
    if (!trilha || !el) return null;
    return el.offsetLeft + el.offsetWidth / 2 - trilha.clientWidth / 2;
  };

  const itemMaisProximoDoCentro = (filtro?: number) => {
    const trilha = trilhaRef.current;
    if (!trilha) return -1;
    const centro = trilha.scrollLeft + trilha.clientWidth / 2;
    let melhor = -1;
    let menor = Infinity;
    itensRef.current.forEach((el, i) => {
      if (!el) return;
      if (filtro !== undefined && i % SLIDES.length !== filtro) return;
      const d = Math.abs(el.offsetLeft + el.offsetWidth / 2 - centro);
      if (d < menor) {
        menor = d;
        melhor = i;
      }
    });
    return melhor;
  };

  // chamado quando a rolagem da trilha para: a foto do meio vira a foto grande
  // e, se o visitante saiu do bloco central, a fita volta para ele sem animação
  const assentar = () => {
    const trilha = trilhaRef.current;
    if (!trilha || trilha.clientWidth === 0) return;

    arrastando.current = false;
    const i = itemMaisProximoDoCentro();
    if (i < 0) return;

    const slide = i % SLIDES.length;
    goTo(slide);
    setReinicio((n) => n + 1);

    const total = MINIATURAS.length;
    if (i < SLIDES.length * 2 || i >= total - SLIDES.length * 2) {
      const alvo = centroDe(BLOCO_MEIO * SLIDES.length + slide);
      if (alvo !== null) trilha.scrollTo({ left: alvo, behavior: "auto" });
    }
  };

  useEffect(() => {
    const trilha = trilhaRef.current;
    if (!trilha) return;
    let timer: number | undefined;
    const aoRolar = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(assentar, 140);
    };
    trilha.addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      trilha.removeEventListener("scroll", aoRolar);
      window.clearTimeout(timer);
    };
    // assentar só mexe em refs e em setters de estado: a closure da primeira
    // renderização continua válida
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // mantém a miniatura do centro em sincronia com a foto grande quando a troca
  // vem do autoplay, do clique numa miniatura ou do deslize sobre a foto
  useEffect(() => {
    const trilha = trilhaRef.current;
    if (!trilha || trilha.clientWidth === 0) return; // no computador está oculta
    if (arrastando.current) return;

    const inicial = primeiraVez.current;
    const alvo = centroDe(
      inicial ? BLOCO_MEIO * SLIDES.length + active : itemMaisProximoDoCentro(active)
    );
    if (alvo === null) return;
    primeiraVez.current = false;
    if (Math.abs(alvo - trilha.scrollLeft) < 2) return;
    trilha.scrollTo({ left: alvo, behavior: inicial ? "auto" : "smooth" });
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
    // Mobile: bloco no fluxo — foto em faixa full-bleed e, embaixo dela, a fita
    // de miniaturas. Desktop (lg+): sai do fluxo e vira o fundo full-bleed da
    // <section> do hero, e a fita some.
    <div className="min-w-0 desk:absolute desk:inset-0 desk:-z-10 desk:h-full desk:w-full">
      <div
        className="relative -mx-5 mt-5 aspect-[16/9] touch-pan-y select-none overflow-hidden border-y border-[#ff7a00]/20 desk:mx-0 desk:mt-0 desk:aspect-auto desk:h-full desk:w-full desk:border-0"
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
            className="absolute inset-0 h-full w-full object-cover object-center desk:object-[68%_center]"
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
            className="hero-sweep absolute inset-0 h-full w-full object-cover object-center desk:object-[68%_center]"
          />
        </div>

        {/* --- Overlays MOBILE ---
            Mesma ideia do computador: a foto escurece do lado esquerdo para a
            legenda ficar legível por cima dela, e clareia à direita para a
            imagem ainda aparecer. */}
        <div
          className="pointer-events-none absolute inset-0 desk:hidden"
          style={{
            background:
              "linear-gradient(90deg, #0f1319 0%, rgba(15,19,25,0.92) 26%, rgba(15,19,25,0.66) 48%, rgba(15,19,25,0.24) 74%, rgba(15,19,25,0) 100%)",
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0f1319]/80 to-transparent desk:hidden" />

        {/* Legenda do slide: uma promessa por foto, só no celular. No computador
            as três aparecem juntas como selos acima do título. */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex w-[64%] items-center pl-5 desk:hidden">
          <span
            key={active}
            className="legenda-hero inline-flex items-center gap-2 text-[13px] font-semibold uppercase leading-tight tracking-wide text-[#ffb37a]"
          >
            {(() => {
              const Icone = BADGES[active % BADGES.length].icon;
              return <Icone className="h-4 w-4 shrink-0 text-[#ff7a00]" />;
            })()}
            {BADGES[active % BADGES.length].label}
          </span>
        </div>

        {/* --- Overlays DESKTOP --- */}
        <div
          className="pointer-events-none absolute inset-0 hidden desk:block"
          style={{
            background:
              "linear-gradient(90deg, #0f1319 0%, #0f1319 44%, rgba(15,19,25,0.90) 57%, rgba(15,19,25,0.55) 71%, rgba(15,19,25,0.18) 86%, rgba(15,19,25,0) 100%)",
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-24 bg-gradient-to-b from-[#0f1319]/85 to-transparent desk:block" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-40 bg-gradient-to-t from-[#0f1319] via-[#0f1319]/55 to-transparent desk:block" />

        {/* Barrinha de pontos: computador e celular deitado, onde a foto é o
            fundo da tela inteira e uma fita de miniaturas competiria com o
            título. */}
        <div className="absolute bottom-4 left-1/2 z-20 hidden -translate-x-1/2 gap-2 desk:flex desk:bottom-10 desk:left-auto desk:right-10 desk:translate-x-0">
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

      {/* --- Fita de miniaturas (tela em pé) ---
          Fica embaixo da foto, não por cima dela. Rola de lado sem fim e a
          miniatura que estiver no meio é sempre a foto grande logo acima. Nas
          pontas a fita se dissolve no fundo escuro do site, então a fita não
          tem borda: parece continuar para fora da tela — que é o que ela faz. */}
      <div className="-mx-5 mb-5 mt-3 desk:hidden">
        <div
          ref={trilhaRef}
          className="trilha-miniaturas relative flex gap-2 overflow-x-auto py-1"
          onTouchStart={() => {
            arrastando.current = true;
          }}
        >
          {MINIATURAS.map((i) => {
            const slide = SLIDES[i % SLIDES.length];
            const ativa = i % SLIDES.length === active;
            return (
              <button
                key={i}
                ref={(el) => {
                  itensRef.current[i] = el;
                }}
                data-mini
                type="button"
                aria-label={`Ver foto ${(i % SLIDES.length) + 1}`}
                aria-current={ativa}
                onClick={() => goTo(i % SLIDES.length)}
                className={`h-[58px] w-[100px] shrink-0 overflow-hidden rounded-lg border transition-all duration-500 ${
                  ativa
                    ? "border-[#ff7a00] opacity-100 shadow-[0_0_12px_rgba(255,122,0,0.4)]"
                    : "border-white/15 opacity-45"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.src}
                  alt=""
                  aria-hidden
                  draggable={false}
                  className="h-full w-full object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
