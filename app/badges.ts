// As três promessas do topo do site. Ficam num módulo à parte porque são
// usadas em dois lugares com apresentações diferentes:
//   - no computador, como uma fileira de selos acima do título (app/page.tsx);
//   - no celular, uma por vez sobre a foto do carrossel (HeroCarousel), já que
//     ali a altura da tela é curta e a fileira empurrava os botões para baixo
//     da dobra.
// São três selos e três fotos, então a legenda acompanha o slide ativo.
import { Zap, Award, BadgeCheck } from "lucide-react";

export const BADGES = [
  { icon: Zap, label: "Atendimento Rápido" },
  { icon: Award, label: "Serviço Especializado" },
  { icon: BadgeCheck, label: "Orçamento sem compromisso" },
];
