// Avaliações REAIS publicadas no perfil da MM Pneus no Google Maps.
// Coletadas em 02/09/2026, da mais recente para a mais antiga,
// mantendo apenas notas 4 e 5 que tem comentário escrito.
//
// Observação: entre as 4-5 estrelas mais recentes há várias sem texto
// (só a nota). Como o carrossel mostra comentários, a lista desce um pouco
// mais no histórico até completar 10 com texto.
//
// Para atualizar: abrir o perfil no Google, ordenar por "Mais recentes" e
// substituir a lista abaixo. Nada aqui deve ser inventado ou reescrito.

export type Avaliacao = {
  nome: string;
  nota: number;
  quando: string;
  texto: string;
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
