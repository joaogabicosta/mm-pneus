import Image from "next/image";
import {
  MapPin,
  Phone,
  Scale,
  Wrench,
  Droplet,
  Clock,
  Zap,
  Award,
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
      fill="currentColor"
      className={className}
    >
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2.2" />
      <rect x="10.9" y="3.6" width="2.2" height="5.2" rx="1.1" />
      <rect x="10.9" y="3.6" width="2.2" height="5.2" rx="1.1" transform="rotate(60 12 12)" />
      <rect x="10.9" y="3.6" width="2.2" height="5.2" rx="1.1" transform="rotate(120 12 12)" />
      <rect x="10.9" y="3.6" width="2.2" height="5.2" rx="1.1" transform="rotate(180 12 12)" />
      <rect x="10.9" y="3.6" width="2.2" height="5.2" rx="1.1" transform="rotate(240 12 12)" />
      <rect x="10.9" y="3.6" width="2.2" height="5.2" rx="1.1" transform="rotate(300 12 12)" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 448 512" fill="currentColor" className={className}>
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
  );
}

function InstagramIcon({ className, gradientId }: { className?: string; gradientId: string }) {
  return (
    <svg viewBox="0 0 448 512" className={className}>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FEDA75" />
          <stop offset="25%" stopColor="#FA7E1E" />
          <stop offset="50%" stopColor="#D62976" />
          <stop offset="75%" stopColor="#962FBF" />
          <stop offset="100%" stopColor="#4F5BD5" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradientId})`}
        d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
      />
    </svg>
  );
}

const SERVICOS = [
  { icon: TireIcon, titulo: "Pneus Novos", desc: "As melhores marcas e medidas ideais para carros de passeio, SUVs e utilitários, garantindo máxima aderência e durabilidade." },
  { icon: WheelIcon, titulo: "Rodas e Personalizações", desc: "Modelos esportivos e originais, além de serviços especializados de reforma, restauração e pintura de rodas." },
  { icon: Scale, titulo: "Geometria e Balanceamento 3D", desc: "Tecnologia a laser de alta precisão para estabilidade total ao dirigir e menor desgaste dos pneus." },
  { icon: Droplet, titulo: "Troca de Óleo e Filtros", desc: "Manutenção preventiva com lubrificantes e filtros homologados pelas principais montadoras." },
  { icon: Wrench, titulo: "Suspensão e Freios", desc: "Revisão completa e diagnóstico avançado para assegurar frenagens seguras e conforto ao rodar." },
  { icon: Crown, titulo: "Linha Premium Sob Encomenda", desc: "Atendimento exclusivo para veículos importados e de alta performance, com encomenda de pneus e rodas de especificações especiais." },
];

const BADGES = [
  { icon: Zap, label: "Atendimento Rápido" },
  { icon: Award, label: "Serviço Especializado" },
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
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 lg:max-w-none lg:px-12">
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
              <WhatsAppIcon className="h-3.5 w-3.5" />
              Faça seu Orçamento
            </a>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden lg:min-h-[calc(100vh-81px)]">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(255,122,0,0.35) 0%, rgba(255,85,0,0) 70%)" }}
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pb-8 pt-14 sm:pt-20 lg:static lg:max-w-none lg:min-h-[calc(100vh-81px)] lg:px-12 lg:py-8">
          <div className="relative z-10 lg:static lg:max-w-[46rem]">
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

            <h1 className="max-w-2xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:max-w-none lg:text-[2.9rem] xl:text-[3.4rem]">
              <span className="bg-gradient-to-b from-[#f1f5f9] to-[#94a3b8] bg-clip-text text-transparent">
                Centro automotivo completo em
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#ffb37a] via-[#ff7a00] to-[#ff5500] bg-clip-text text-transparent">
                Tubarão.
              </span>
              <br />
              <span className="bg-gradient-to-b from-[#f1f5f9] to-[#94a3b8] bg-clip-text text-transparent">
                Serviço de qualidade que seu carro{" "}
              </span>
              <span className="bg-gradient-to-r from-[#ffb37a] via-[#ff7a00] to-[#ff5500] bg-clip-text text-transparent">
                EXIGE.
              </span>
            </h1>

            <p className="mt-5 max-w-md text-base text-[#94a3b8] lg:max-w-xl">
              Fale direto com a gente pelo WhatsApp e receba seu orçamento rápido, sem precisar sair de casa.
            </p>

            <HeroCarousel />

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-4 text-base font-bold uppercase tracking-wide text-[#0f1319] shadow-[0_0_24px_rgba(37,211,102,0.35)] transition hover:brightness-110 hover:shadow-[0_0_32px_rgba(37,211,102,0.5)] active:scale-[0.98] sm:col-span-3"
              >
                <WhatsAppIcon className="h-5 w-5" />
                WhatsApp
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
                <InstagramIcon className="h-4 w-4" gradientId="instagram-gradient-hero" />
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
              Vamos cuidar do seu veículo ainda hoje?
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm text-[#94a3b8]">
            Nos chame no Whatsapp. Temos a melhor equipe aguardando o seu contato.
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-8 py-4 text-base font-bold uppercase tracking-wide text-[#0f1319] shadow-[0_0_28px_rgba(37,211,102,0.4)] transition hover:brightness-110 hover:shadow-[0_0_36px_rgba(37,211,102,0.55)] active:scale-[0.98]"
          >
            <WhatsAppIcon className="h-5 w-5" />
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
              <WhatsAppIcon className="h-3.5 w-3.5" />
              WhatsApp
            </a>
            <a
              href={INSTAGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full bg-[#ff7a00]/10 px-3 py-1.5 text-xs font-semibold text-[#ff7a00] ring-1 ring-[#ff7a00]/25 transition hover:bg-[#ff7a00]/15"
            >
              <InstagramIcon className="h-3.5 w-3.5" gradientId="instagram-gradient-footer" />
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
