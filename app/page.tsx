import Image from "next/image";
import {
  MessageCircle,
  MapPin,
  Instagram,
  Phone,
  Scale,
  Wrench,
  Droplet,
  Clock,
  Zap,
  ScanLine,
  BadgeCheck,
Crown,
  ArrowRight,
} from "lucide-react";
import HeroCarousel from "./components/HeroCarousel";

const WHATSAPP_NUMBER = "5547933005070";
const WHATSAPP_MSG = encodeURIComponent("Olá, gostaria de um orçamento");
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;
const whatsappFor = (servico: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Olá! Gostaria de um orçamento para: ${servico}`
  )}`;
const MAPS_LINK =
  "https://maps.google.com/?q=MM+Pneus+Rua+Lauro+Muller+2060+Vila+Moema+Tubarao+SC";
const MAPS_ROUTE_LINK =
  "https://www.google.com/maps/dir/?api=1&destination=MM+Pneus+Rua+Lauro+Muller+2060+Vila+Moema+Tubarao+SC";
const INSTAGRAM_LINK = "https://instagram.com/mm_pneus";
const TEL_LINK = `tel:+${WHATSAPP_NUMBER}`;

function TireIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9.93 4.27L10.71 2.79L13.29 2.79L14.07 4.27A8 8 0 0 1 16 5.07L17.6 4.57L19.43 6.4L18.93 8A8 8 0 0 1 19.73 9.93L21.21 10.71L21.21 13.29L19.73 14.07A8 8 0 0 1 18.93 16L19.43 17.6L17.6 19.43L16 18.93A8 8 0 0 1 14.07 19.73L13.29 21.21L10.71 21.21L9.93 19.73A8 8 0 0 1 8 18.93L6.4 19.43L4.57 17.6L5.07 16A8 8 0 0 1 4.27 14.07L2.79 13.29L2.79 10.71L4.27 9.93A8 8 0 0 1 5.07 8L4.57 6.4L6.4 4.57L8 5.07A8 8 0 0 1 9.93 4.27Z" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

function WheelIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" />
      <line x1="14.12" y1="14.12" x2="18.36" y2="18.36" />
      <line x1="9.88" y1="14.12" x2="5.64" y2="18.36" />
      <line x1="9.88" y1="9.88" x2="5.64" y2="5.64" />
      <line x1="14.12" y1="9.88" x2="18.36" y2="5.64" />
    </svg>
  );
}

const SERVICOS = [
  { icon: TireIcon, titulo: "Pneus Novos", desc: "As melhores marcas e medidas ideais para carros de passeio, SUVs e utilitários, garantindo máxima aderência e durabilidade." },
  { icon: WheelIcon, titulo: "Rodas e Personalização", desc: "Modelos esportivos e originais, além de serviços especializados de reforma, restauração e pintura de rodas." },
  { icon: Scale, titulo: "Geometria e Balanceamento 3D", desc: "Tecnologia a laser de alta precisão para estabilidade total ao dirigir e menor desgaste dos pneus." },
  { icon: Droplet, titulo: "Troca de Óleo e Filtros", desc: "Manutenção preventiva com lubrificantes e filtros homologados pelas principais montadoras." },
  { icon: Wrench, titulo: "Suspensão e Freios", desc: "Revisão completa e diagnóstico avançado para assegurar frenagens seguras e conforto ao rodar." },
  { icon: Crown, titulo: "Linha Premium Sob Encomenda", desc: "Atendimento exclusivo para veículos importados e de alta performance, com encomenda de pneus e rodas de especificações especiais." },
];

const BADGES = [
  { icon: Zap, label: "Atendimento Rápido" },
  { icon: ScanLine, label: "Tecnologia 3D" },
  { icon: BadgeCheck, label: "Orçamento sem compromisso" },
];

function Logo({ className = "h-9 md:h-12 lg:h-14" }: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="MM Pneus"
      width={220}
      height={122}
      className={`w-auto object-contain ${className}`}
      priority
    />
  );
}

export default function Home() {
  return (
    <main className="min-h-screen text-[#e2e8f0] antialiased">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0f1319]/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <Logo className="h-9 md:h-12 lg:h-14" />

          <div className="flex items-center gap-2">
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-[#94a3b8] transition hover:border-[#ff7a00]/40 hover:text-[#e2e8f0] sm:flex"
            >
              <MapPin className="h-3.5 w-3.5" />
              Tubarão - SC
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full bg-[#25D366] px-3.5 py-2 text-xs font-bold uppercase tracking-wide text-[#0f1319] shadow-[0_0_18px_rgba(37,211,102,0.35)] transition hover:brightness-110 active:scale-[0.97]"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Orçamento no WhatsApp
            </a>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(255,122,0,0.35) 0%, rgba(255,85,0,0) 70%)" }}
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-14 sm:pt-20 lg:grid-cols-2">
          <div>
            <div className="mb-6 flex flex-wrap gap-2">
              {BADGES.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#ff7a00]/25 bg-[#ff7a00]/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#ffb37a]"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </span>
              ))}
            </div>

            <h1 className="max-w-2xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              <span className="bg-gradient-to-b from-[#f1f5f9] to-[#94a3b8] bg-clip-text text-transparent">
                Seu carro pede
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#ffb37a] via-[#ff7a00] to-[#ff5500] bg-clip-text text-transparent">
                pneu novo, alinhamento
              </span>
              <br />
              <span className="bg-gradient-to-b from-[#f1f5f9] to-[#94a3b8] bg-clip-text text-transparent">
                ou revisão?
              </span>
            </h1>

            <p className="mt-5 max-w-md text-base text-[#94a3b8]">
              Fala direto com a gente pelo WhatsApp e recebe orçamento rápido, sem precisar sair de casa.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-4 text-base font-bold uppercase tracking-wide text-[#0f1319] shadow-[0_0_24px_rgba(37,211,102,0.35)] transition hover:brightness-110 hover:shadow-[0_0_32px_rgba(37,211,102,0.5)] active:scale-[0.98]"
              >
                <MessageCircle className="h-5 w-5" />
                Falar no WhatsApp / Orçamento rápido
              </a>

              <a
                href={MAPS_ROUTE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#1e2633] px-5 py-3.5 text-sm font-semibold uppercase tracking-wide text-[#e2e8f0] transition hover:border-[#ff7a00]/40 hover:shadow-[0_0_20px_rgba(255,122,0,0.15)]"
              >
                <MapPin className="h-4 w-4 text-[#ff7a00]" />
                Como chegar
              </a>

              <a
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#1e2633] px-5 py-3.5 text-sm font-semibold uppercase tracking-wide text-[#e2e8f0] transition hover:border-[#ff7a00]/40 hover:shadow-[0_0_20px_rgba(255,122,0,0.15)]"
              >
                <Instagram className="h-4 w-4 text-[#ff7a00]" />
                Instagram
              </a>

              <a
                href={TEL_LINK}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#1e2633] px-5 py-3.5 text-sm font-semibold uppercase tracking-wide text-[#e2e8f0] transition hover:border-[#ff7a00]/40 hover:shadow-[0_0_20px_rgba(255,122,0,0.15)]"
              >
                <Phone className="h-4 w-4 text-[#ff7a00]" />
                Ligar agora
              </a>
            </div>
          </div>

          <HeroCarousel />
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-5 py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ff7a00]">O que fazemos</p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#f1f5f9] sm:text-4xl">Serviços</h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICOS.map(({ icon: Icon, titulo, desc }) => (
            <a
              key={titulo}
              href={whatsappFor(titulo)}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col rounded-2xl border border-white/10 bg-[#1e2633] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#ff7a00]/50 hover:shadow-[0_10px_40px_rgba(255,122,0,0.15)]"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff7a00]/10 ring-1 ring-[#ff7a00]/20 transition group-hover:bg-[#ff7a00]/15 group-hover:ring-[#ff7a00]/40">
                <Icon className="h-6 w-6 text-[#ff7a00]" />
              </div>
              <h3 className="font-display text-lg font-bold tracking-tight text-[#f1f5f9]">{titulo}</h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-[#94a3b8]">{desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#ff7a00] transition group-hover:gap-2">
                Pedir orçamento deste serviço
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-white/10">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #161c24 0%, #1e2633 45%, #201812 100%)" }}
        />
        <div
          className="pointer-events-none absolute right-0 top-1/2 h-[300px] w-[300px] -translate-y-1/2 translate-x-1/3 rounded-full opacity-50 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(255,85,0,0.35) 0%, rgba(255,85,0,0) 70%)" }}
        />

        <div className="relative mx-auto max-w-6xl px-5 py-16 text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="bg-gradient-to-r from-[#ffb37a] via-[#ff7a00] to-[#ff5500] bg-clip-text text-transparent">
              Bora resolver o pneu?
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm text-[#94a3b8]">
            Manda a placa, a medida do pneu ou o serviço que precisa. A gente responde rapidinho.
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-8 py-4 text-base font-bold uppercase tracking-wide text-[#0f1319] shadow-[0_0_28px_rgba(37,211,102,0.4)] transition hover:brightness-110 hover:shadow-[0_0_36px_rgba(37,211,102,0.55)] active:scale-[0.98]"
          >
            <MessageCircle className="h-5 w-5" />
            Chamar no WhatsApp
          </a>
        </div>
      </section>

      <footer className="relative overflow-hidden bg-[#0b0e13]">
        <Image
          src="/logo.png"
          alt=""
          width={220}
          height={122}
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 top-1/2 z-0 w-[500px] max-w-none -translate-y-1/2 select-none object-contain opacity-10 mix-blend-screen md:w-[680px]"
        />

        <div className="relative z-10 mx-auto max-w-6xl px-5 py-10">
          <div className="space-y-2 text-sm text-[#94a3b8]">
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#ff7a00]" />
              Rua Lauro Müller, 2060 — Vila Moema, Tubarão - SC
            </p>
            <p className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#ff7a00]" />
              Seg a Sex, 8h às 18h · Sáb, 8h às 12h
            </p>
          </div>

          <div className="mt-6 flex gap-3">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full bg-[#25D366]/10 px-3 py-1.5 text-xs font-semibold text-[#25D366] ring-1 ring-[#25D366]/25 transition hover:bg-[#25D366]/15"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              WhatsApp
            </a>
            <a
              href={INSTAGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full bg-[#ff7a00]/10 px-3 py-1.5 text-xs font-semibold text-[#ff7a00] ring-1 ring-[#ff7a00]/25 transition hover:bg-[#ff7a00]/15"
            >
              <Instagram className="h-3.5 w-3.5" />
              Instagram
            </a>
          </div>

          <p className="mt-8 border-t border-white/5 pt-6 text-xs text-[#64748b]">
            © {new Date().getFullYear()} MM Pneus. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}
