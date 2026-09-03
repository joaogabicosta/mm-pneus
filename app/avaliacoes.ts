// Lista de RESERVA das avaliações da MM Pneus no Google.
//
// O site busca as avaliações ao vivo pela Google Places API
// (app/lib/googleReviews.ts). Esta lista entra em dois casos:
//   1. a API não está configurada ou não respondeu — o site usa só ela;
//   2. a API respondeu, mas devolveu menos de 10 avaliações (o Google
//      limita a 5 por perfil) — ela completa os cartões que faltam.
//
// São avaliações REAIS publicadas no perfil da MM Pneus no Google Maps,
// coletadas em 02/09/2026, da mais recente para a mais antiga, mantendo
// apenas notas 4 e 5 com comentário escrito. Nada aqui deve ser inventado
// ou reescrito.
//
// Para atualizar à mão: abrir o perfil no Google, ordenar por "Mais
// recentes" e substituir a lista abaixo.

export type Avaliacao = {
  nome: string;
  nota: number;
  /** Data relativa ("9 meses atrás"), como o Google mostra. */
  quando: string;
  texto: string;
  /** Foto do autor — só vem quando a avaliação chega ao vivo pela API. */
  foto?: string;
  /** Link direto para a avaliação no Google — idem. */
  link?: string;
  /** Timestamp ISO da publicação, usado para ordenar da mais recente. */
  publicadoEm?: string;
};

export const GOOGLE_NOTA = "4,5";
export const GOOGLE_TOTAL = 52;
export const GOOGLE_PERFIL =
  "https://www.google.com/maps/place/MM+Pneus/@-28.4705758,-48.9916019,17z/data=!4m6!3m5!1s0x952142fd7bb4f02b:0xd3b32a56b352ec3!8m2!3d-28.4705758!4d-48.9916019";

export const AVALIACOES: Avaliacao[] = [
  { nome: "Christian Gomes", nota: 5, quando: "9 meses atrás", texto: "Atendimento rápido e preço acessível" },
  { nome: "Ricardo Tamosaitis", nota: 5, quando: "10 meses atrás", texto: "Sempre bem atendido e com bom serviços eu nunca deixo de levar meu carro no MM pneus." },
  { nome: "Vanderlei Tristao da rocha", nota: 5, quando: "3 anos atrás", texto: "Muito bom." },
  { nome: "Dori Edson Medeiros", nota: 5, quando: "3 anos atrás", texto: "Atendimento de amigos. Serviços top" },
  { nome: "Eduardo Zeleniakas", nota: 5, quando: "4 anos atrás", texto: "Mão de Obra Bem Qualificada, Serviço Correto a um Preço Justo, e um Atendimento de 1°. Recomendo." },
  { nome: "Aline Mendes", nota: 5, quando: "4 anos atrás", texto: "Ótimo 👍" },
  { nome: "juliano Medeiros dos santos", nota: 5, quando: "5 anos atrás", texto: "Bem atendido" },
  { nome: "Carlos Alberto", nota: 5, quando: "5 anos atrás", texto: "Ótimo atendimento ótimo preços e muita qualidade nós serviços." },
  { nome: "Cristina Etchatz Farto", nota: 5, quando: "5 anos atrás", texto: "Bom atendimento e conserto rápido. Ótima estrutura." },
  { nome: "Ester Machado", nota: 5, quando: "6 anos atrás", texto: "Foi top. Atendimento muito bom" },
];
