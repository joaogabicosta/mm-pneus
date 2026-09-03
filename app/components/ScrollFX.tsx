"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Dois efeitos de scroll, ambos só no desktop:
 *
 * 1. Galerias horizontais — cada seção marcada com [data-gallery] é fixada na
 *    tela e a trilha interna ([data-track]) anda para a esquerda conforme o
 *    scroll, como no demo "Horizontal scrolling gallery" do GSAP.
 *
 * 2. Painéis com snap — o scroll encaixa no topo de cada [data-panel], como no
 *    demo "Infinite looped panels", mas sem o loop: o último painel é o fim da
 *    página. Dentro das galerias o snap é desligado, senão ele brigaria com o
 *    scroll horizontal e puxaria o visitante para fora do meio da trilha.
 *
 * No mobile e para quem pede menos animação nada disso roda: as seções voltam a
 * ser blocos normais e as galerias viram carrosséis de arrastar com o dedo.
 */
export default function ScrollFX() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        // ---- 1. galerias horizontais -------------------------------------
        const galerias = gsap.utils.toArray<HTMLElement>("[data-gallery]");
        const galeriaSTs: ScrollTrigger[] = [];

        galerias.forEach((secao) => {
          const trilha = secao.querySelector<HTMLElement>("[data-track]");
          if (!trilha) return;

          // quanto falta da trilha para além da largura da tela
          const percurso = () => Math.max(0, trilha.scrollWidth - secao.clientWidth);

          const tween = gsap.to(trilha, {
            x: () => -percurso(),
            ease: "none",
            scrollTrigger: {
              trigger: secao,
              start: "top top",
              end: () => "+=" + percurso(),
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          if (tween.scrollTrigger) galeriaSTs.push(tween.scrollTrigger);
        });

        // ---- 2. snap entre painéis ---------------------------------------
        const paineis = gsap.utils.toArray<HTMLElement>("[data-panel]");
        const painelSTs = paineis.map((p) =>
          ScrollTrigger.create({ trigger: p, start: "top top" })
        );

        let pontos: number[] = [];
        let livres: [number, number][] = [];

        const recalcular = () => {
          const max = ScrollTrigger.maxScroll(window) || 1;
          pontos = painelSTs.map((st) => st.start / max);
          // o primeiro painel descansa no topo da página, não 81px abaixo dele
          // (o cabeçalho é sticky e empurra o início da capa para baixo)
          if (pontos.length) pontos[0] = 0;
          livres = galeriaSTs.map((st) => [st.start / max, st.end / max]);
        };

        recalcular();
        ScrollTrigger.addEventListener("refresh", recalcular);

        const snapST = ScrollTrigger.create({
          snap: {
            snapTo(valor) {
              // dentro de uma galeria o scroll é livre — o snap só atrapalharia
              const dentro = livres.some(
                ([inicio, fim]) => valor > inicio + 0.004 && valor < fim - 0.004
              );
              if (dentro) return valor;

              return pontos.reduce(
                (melhor, atual) =>
                  Math.abs(atual - valor) < Math.abs(melhor - valor) ? atual : melhor,
                pontos[0] ?? valor
              );
            },
            // valores de "paginação": curto e com pouca espera. Delay alto
            // dá sensação de bug; duração acima de 1s dá sensação de travado.
            duration: { min: 0.25, max: 0.6 },
            delay: 0.05,
            ease: "power2.inOut",
            directional: true,
            inertia: true,
          },
        });

        return () => {
          ScrollTrigger.removeEventListener("refresh", recalcular);
          snapST.kill();
          painelSTs.forEach((st) => st.kill());
        };
      }
    );

    return () => mm.revert();
  }, []);

  return null;
}
