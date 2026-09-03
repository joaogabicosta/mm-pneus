"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

/**
 * Dois efeitos de scroll, ambos só em tela grande com mouse:
 *
 * 1. Galerias horizontais — cada seção marcada com [data-gallery] é fixada na
 *    tela e a trilha interna ([data-track]) anda para a esquerda conforme o
 *    scroll.
 *
 * 2. Paginador — a roda do mouse não rola a página livremente: cada toque
 *    avança exatamente uma parada e a página viaja até lá numa animação longa.
 *    As paradas são o topo de cada [data-panel] mais, dentro das galerias, um
 *    ponto a cada "página" de cards. Assim um único toque já leva da capa para
 *    Serviços, e dentro de Serviços cada toque mostra o próximo grupo de cards
 *    até acabar a trilha, quando o toque seguinte pula para Avaliações.
 *
 * Em celular e para quem pede menos animação nada disso roda: as seções voltam
 * a ser blocos normais, com o snap nativo do CSS, e as galerias viram
 * carrosséis de arrastar com o dedo.
 */

// Quanto dura a viagem. Trocar de seção é um movimento longo e proposital;
// avançar os cards é um passo curto, e esticá-lo até 3s daria sensação de
// travamento.
const DURACAO_SECAO = 3.4;
const DURACAO_CARDS = 1.4;
// Depois que a viagem termina, ignora a roda por um instante: trackpads e
// mouses com rolagem por inércia continuam disparando eventos e sem isso a
// página emendaria duas paradas de uma vez.
const DESCANSO_MS = 260;

type Parada = { y: number; tipo: "secao" | "cards" };

export default function ScrollFX() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
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

        // ---- 2. paradas do paginador -------------------------------------
        const paineis = gsap.utils.toArray<HTMLElement>("[data-panel]");
        const painelSTs = paineis.map((p) =>
          ScrollTrigger.create({ trigger: p, start: "top top" })
        );

        let paradas: Parada[] = [];

        const recalcular = () => {
          const lista: Parada[] = painelSTs.map((st, i) => ({
            // o primeiro painel descansa no topo da página, não 81px abaixo
            // dele (o cabeçalho é sticky e empurra o início da capa)
            y: i === 0 ? 0 : st.start,
            tipo: "secao",
          }));

          // dentro de cada galeria, uma parada por "página" de cards
          galeriaSTs.forEach((st) => {
            const passo = Math.max(320, window.innerWidth * 0.8);
            const total = st.end - st.start;
            for (let d = passo; d < total - 8; d += passo) {
              lista.push({ y: st.start + d, tipo: "cards" });
            }
            // o fim da trilha também é uma parada: é lá que o último card
            // termina de entrar, e só o toque seguinte muda de seção
            if (total > 8) lista.push({ y: st.end, tipo: "cards" });
          });

          const maximo = ScrollTrigger.maxScroll(window);
          paradas = lista
            .map((p) => ({ ...p, y: Math.round(Math.min(Math.max(p.y, 0), maximo)) }))
            .sort((a, b) => a.y - b.y)
            // remove paradas coladas umas nas outras (o topo de uma galeria e
            // o topo do painel dela caem no mesmo lugar)
            .filter((p, i, arr) => i === 0 || p.y - arr[i - 1].y > 8);
        };

        recalcular();
        ScrollTrigger.addEventListener("refresh", recalcular);

        // ---- 3. a roda do mouse ------------------------------------------
        let viajando = false;
        let liberadoEm = 0;

        const proxima = (direcao: 1 | -1): Parada | null => {
          const y = window.scrollY;
          const perto = paradas.reduce(
            (melhor, p, i) =>
              Math.abs(p.y - y) < Math.abs(paradas[melhor].y - y) ? i : melhor,
            0
          );

          // fora de uma parada (redimensionou, usou o teclado, âncora): a
          // próxima é a vizinha no sentido da rolagem, não a de índice +1
          if (Math.abs(paradas[perto]?.y - y) > 6) {
            return direcao > 0
              ? paradas.find((p) => p.y > y + 6) ?? null
              : [...paradas].reverse().find((p) => p.y < y - 6) ?? null;
          }

          return paradas[perto + direcao] ?? null;
        };

        const naRoda = (e: WheelEvent) => {
          // a página inteira é paginada: nunca rola livre no desktop
          e.preventDefault();

          if (viajando || performance.now() < liberadoEm) return;
          if (Math.abs(e.deltaY) < 2) return;

          const destino = proxima(e.deltaY > 0 ? 1 : -1);
          if (!destino) return;

          viajando = true;
          gsap.to(window, {
            scrollTo: { y: destino.y, autoKill: false },
            duration: destino.tipo === "secao" ? DURACAO_SECAO : DURACAO_CARDS,
            ease: "power2.inOut",
            onComplete: () => {
              viajando = false;
              liberadoEm = performance.now() + DESCANSO_MS;
            },
          });
        };

        window.addEventListener("wheel", naRoda, { passive: false });

        return () => {
          window.removeEventListener("wheel", naRoda);
          gsap.killTweensOf(window);
          ScrollTrigger.removeEventListener("refresh", recalcular);
          painelSTs.forEach((st) => st.kill());
        };
      }
    );

    return () => mm.revert();
  }, []);

  return null;
}
