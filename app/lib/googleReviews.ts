// Integração com a Google Places API (New) para trazer as avaliações do
// perfil da MM Pneus no Google em tempo real.
//
// COMO FUNCIONA
// 1. Resolve o Place ID do perfil (por env var, ou via Text Search e cache).
// 2. Pede o Place Details com os campos rating, userRatingCount e reviews.
// 3. Fica só com as notas 4 e 5 que têm comentário escrito, ordena da mais
//    recente para a mais antiga e devolve até 10.
// 4. Se a API não responder (ou não houver chave), cai na lista curada de
//    app/avaliacoes.ts — o site nunca fica sem avaliações.
//
// LIMITE DO GOOGLE: a Places API devolve no máximo 5 avaliações por perfil.
// Por isso a lista ao vivo é completada com a curada até fechar 10 cartões.
// A única forma de passar disso é a Google Business Profile API (OAuth do
// dono do perfil) — ver README.
//
// CACHE: 6 horas (dentro do limite de 30 dias permitido pelos termos da API).

import {
  AVALIACOES,
  GOOGLE_NOTA,
  GOOGLE_PERFIL,
  GOOGLE_TOTAL,
  type Avaliacao,
} from "../avaliacoes";

const API_KEY =
  process.env.GOOGLE_MAPS_API_KEY ?? process.env.GOOGLE_PLACES_API_KEY ?? "";
const PLACE_ID = process.env.GOOGLE_PLACE_ID ?? "";
const PLACE_QUERY =
  process.env.GOOGLE_PLACE_QUERY ??
  "MM Pneus, Rua Lauro Müller 2060, Vila Moema, Tubarão - SC";

const REVALIDATE_SEGUNDOS = 60 * 60 * 6;
const NOTA_MINIMA = 4;
const QUANTIDADE = 10;

export type Avaliacoes = {
  nota: string;
  total: number;
  perfil: string;
  itens: Avaliacao[];
  /** true quando pelo menos uma avaliação veio da API do Google agora. */
  aoVivo: boolean;
};

type GoogleReview = {
  rating?: number;
  publishTime?: string;
  relativePublishTimeDescription?: string;
  googleMapsUri?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: {
    displayName?: string;
    photoUri?: string;
    uri?: string;
  };
};

type GooglePlace = {
  id?: string;
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: GoogleReview[];
};

const RESERVA: Avaliacoes = {
  nota: GOOGLE_NOTA,
  total: GOOGLE_TOTAL,
  perfil: GOOGLE_PERFIL,
  itens: AVALIACOES.slice(0, QUANTIDADE),
  aoVivo: false,
};

/** Descobre o Place ID quando ele não foi fixado por variável de ambiente. */
async function resolverPlaceId(): Promise<string | null> {
  if (PLACE_ID) return PLACE_ID;

  const resposta = await fetch(
    "https://places.googleapis.com/v1/places:searchText",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask": "places.id",
      },
      body: JSON.stringify({
        textQuery: PLACE_QUERY,
        languageCode: "pt-BR",
        regionCode: "BR",
        pageSize: 1,
      }),
      next: { revalidate: 60 * 60 * 24 * 30 },
    }
  );

  if (!resposta.ok) {
    console.warn(
      `[avaliacoes] Text Search falhou: HTTP ${resposta.status} — ${await resposta
        .text()
        .catch(() => "sem corpo")}`
    );
    return null;
  }
  const dados = (await resposta.json()) as { places?: { id?: string }[] };
  const encontrado = dados.places?.[0]?.id ?? null;
  if (!encontrado) console.warn("[avaliacoes] Text Search nao encontrou o perfil.");
  return encontrado;
}

function paraAvaliacao(review: GoogleReview): Avaliacao | null {
  const texto = (review.text?.text ?? review.originalText?.text ?? "").trim();
  const nome = review.authorAttribution?.displayName?.trim() ?? "";
  const nota = Math.round(review.rating ?? 0);

  if (!texto || !nome || nota < NOTA_MINIMA) return null;

  return {
    nome,
    nota,
    quando: review.relativePublishTimeDescription?.trim() || "recentemente",
    texto,
    foto: review.authorAttribution?.photoUri,
    link: review.googleMapsUri,
    publicadoEm: review.publishTime,
  };
}

/** Evita repetir no fallback alguém que já veio ao vivo. */
function chave(a: Avaliacao) {
  return `${a.nome.toLowerCase()}|${a.texto.slice(0, 40).toLowerCase()}`;
}

export async function getAvaliacoes(): Promise<Avaliacoes> {
  if (!API_KEY) {
    console.warn("[avaliacoes] Sem GOOGLE_MAPS_API_KEY — usando a lista de reserva.");
    return RESERVA;
  }

  try {
    const placeId = await resolverPlaceId();
    if (!placeId) return RESERVA;

    const resposta = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?languageCode=pt-BR&regionCode=BR`,
      {
        headers: {
          "X-Goog-Api-Key": API_KEY,
          "X-Goog-FieldMask":
            "id,rating,userRatingCount,googleMapsUri,reviews",
        },
        next: { revalidate: REVALIDATE_SEGUNDOS },
      }
    );

    if (!resposta.ok) {
      console.warn(
        `[avaliacoes] Place Details falhou: HTTP ${resposta.status} — ${await resposta
          .text()
          .catch(() => "sem corpo")}`
      );
      return RESERVA;
    }

    const lugar = (await resposta.json()) as GooglePlace;

    const aoVivo = (lugar.reviews ?? [])
      .map(paraAvaliacao)
      .filter((a): a is Avaliacao => a !== null)
      .sort((a, b) =>
        (b.publicadoEm ?? "").localeCompare(a.publicadoEm ?? "")
      );

    const vistos = new Set(aoVivo.map(chave));
    const completadas = [...aoVivo];
    for (const curada of AVALIACOES) {
      if (completadas.length >= QUANTIDADE) break;
      if (vistos.has(chave(curada))) continue;
      completadas.push(curada);
      vistos.add(chave(curada));
    }

    return {
      nota:
        typeof lugar.rating === "number"
          ? lugar.rating.toFixed(1).replace(".", ",")
          : GOOGLE_NOTA,
      total: lugar.userRatingCount ?? GOOGLE_TOTAL,
      perfil: lugar.googleMapsUri || GOOGLE_PERFIL,
      itens: completadas.slice(0, QUANTIDADE),
      aoVivo: aoVivo.length > 0,
    };
  } catch (erro) {
    console.warn("[avaliacoes] Erro inesperado ao consultar o Google:", erro);
    return RESERVA;
  }
}
