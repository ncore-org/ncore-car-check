import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, Database, FileSearch, Gauge, ShieldCheck, Wrench } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { VinCheckForm } from "@/components/site/VinCheckForm";
import { FinancingCalculator } from "@/components/site/FinancingCalculator";
import { BanksIntro } from "@/components/site/BanksIntro";
import { InsuranceHomeSection } from "@/components/site/InsuranceHomeSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "nCc — Overenie histórie vozidla podľa VIN" },
      {
        name: "description",
        content:
          "nCc (ncore car control) — overte stočené kilometre, škodovú udalosť, servisnú históriu a pôvod auta podľa VIN. Rýchlo a jednoducho.",
      },
      { property: "og:title", content: "nCc — Overenie VIN" },
      { property: "og:description", content: "Preverte auto podľa VIN skôr, než zaplatíte prvé euro." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <TrustBar />
      <WhatYouGet />
      <HowItWorks />
      <InsuranceHomeSection />
      <BanksIntro />
      <FinancingCalculator />
      <BuyingCta />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      {/* Ambient glow layers */}
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_10%,white,transparent_40%),radial-gradient(circle_at_80%_60%,oklch(0.78_0.19_145),transparent_50%)]" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 opacity-20 [background:radial-gradient(circle,oklch(0.78_0.19_145),transparent_60%)] blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="grid items-center gap-8 lg:grid-cols-[1.3fr_1fr]">
          {/* Left column — content */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.82_0.19_145)]" />
              Nová generácia overenia vozidla — nCc
            </span>
            <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl">
              Nekupujte mačku vo vreci.{" "}
              <span className="text-[oklch(0.85_0.18_145)]">Preverte VIN</span> za pár sekúnd.
            </h1>
            <p className="mt-4 max-w-2xl text-base text-white/80 sm:text-lg">
              nCc — <strong className="text-white">ncore car control</strong> — kombinuje desiatky
              registrov a odhalí stočený tachometer, poškodenia, krádež či nezaplatené leasingy.
            </p>
            <div className="mt-8">
              <VinCheckForm />
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
              {[
                "40+ dátových zdrojov",
                "Výsledok do 60 sekúnd",
                "Overili sme 3,2 mil. áut",
              ].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[oklch(0.85_0.18_145)]" />
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Right column — custom animated visualization */}
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  HeroVisual — hand-crafted layered animation, zero libraries       */
/*  Multi-plane SVG: 3D car, particle system, scan radar, data flow   */
/* ------------------------------------------------------------------ */
function useParticleCount() {
  const [count, setCount] = useState(18);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const handler = (e: MediaQueryListEvent | MediaQueryList) => setCount(e.matches ? 28 : 18);
    handler(mq);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return count;
}

function HeroVisual() {
  const particles = useParticleCount();
  const particleData = Array.from({ length: particles }, (_, i) => ({
    id: i,
    cx: 20 + Math.random() * 360,
    cy: 20 + Math.random() * 260,
    r: 1 + Math.random() * 2,
    delay: Math.random() * 4,
    dur: 3 + Math.random() * 4,
    driftX: (Math.random() - 0.5) * 40,
    driftY: (Math.random() - 0.5) * 30,
  }));

  return (
    <div className="relative hidden h-full min-h-[420px] lg:block">
      {/* Ambient glow layers */}
      <div className="absolute inset-0 opacity-30 [background:radial-gradient(ellipse_at_50%_30%,oklch(0.78_0.19_145/0.12),transparent_60%),radial-gradient(ellipse_at_80%_80%,oklch(0.22_0.05_255/0.08),transparent_50%)]" />

      {/* Floating decorative elements */}
      <div className="animate-float-1 absolute left-[12%] top-[8%] h-20 w-20 rounded-full border border-white/8 bg-white/[0.03] backdrop-blur-sm" />
      <div className="animate-float-2 absolute bottom-[15%] right-[8%] h-14 w-14 rounded-full border border-white/8 bg-white/[0.03] backdrop-blur-sm" />
      <div className="animate-float-3 absolute right-[22%] top-[30%] h-8 w-8 rounded-full border border-[oklch(0.78_0.19_145)]/15 bg-[oklch(0.78_0.19_145)]/5 backdrop-blur-sm" />

      {/* Main SVG Canvas */}
      <div className="flex h-full items-center justify-center">
        <svg
          viewBox="0 0 400 360"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full max-h-[380px] drop-shadow-2xl"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="carBodyGrad" x1="0" y1="0" x2="0.3" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0.18" />
              <stop offset="60%" stopColor="white" stopOpacity="0.06" />
              <stop offset="100%" stopColor="white" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="groundGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.78 0.19 145)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="oklch(0.78 0.19 145)" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="scanGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="oklch(0.85 0.18 145)" stopOpacity="0.08" />
              <stop offset="100%" stopColor="oklch(0.85 0.18 145)" stopOpacity="0" />
            </radialGradient>
            <filter id="carGlow">
              <feDropShadow dx="0" dy="4" stdDeviation="12" floodColor="oklch(0.78 0.19 145)" floodOpacity="0.15" />
            </filter>
            {/* Scan gradient mask */}
            <linearGradient id="scanMask" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="40%" stopColor="white" stopOpacity="1" />
              <stop offset="60%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* ===== BACKGROUND: Data grid ===== */}
          {[30, 70, 110, 150, 190, 230, 270, 310].map((y) => (
            <line key={`hg-${y}`} x1="15" y1={y} x2="385" y2={y} stroke="white" strokeOpacity={0.04} strokeWidth="1" strokeDasharray="3 8" />
          ))}
          {[50, 140, 230, 320].map((x) => (
            <line key={`vg-${x}`} x1={x} y1="15" x2={x} y2="345" stroke="white" strokeOpacity={0.04} strokeWidth="1" strokeDasharray="3 8" />
          ))}

          {/* ===== SCAN RADAR: Rotating arc ===== */}
          <g>
            <circle cx="200" cy="180" r="140" stroke="oklch(0.85 0.18 145 / 0.04)" strokeWidth="1" fill="none" strokeDasharray="4 8" />
            <circle cx="200" cy="180" r="100" stroke="oklch(0.85 0.18 145 / 0.06)" strokeWidth="1" fill="none" strokeDasharray="3 10" />
            <circle cx="200" cy="180" r="60" stroke="oklch(0.85 0.18 145 / 0.08)" strokeWidth="1" fill="none" strokeDasharray="2 12" />
            {/* Animated arc */}
            <path d="M 200 180 L 340 180 A 140 140 0 0 0 60 180" stroke="oklch(0.85 0.18 145 / 0.08)" strokeWidth="1.5" fill="url(#scanGlow)" opacity="0.4">
              <animateTransform attributeName="transform" type="rotate" from="0 200 180" to="360 200 180" dur="12s" repeatCount="indefinite" />
            </path>
            {/* Sweep line */}
            <line x1="200" y1="180" x2="340" y2="180" stroke="oklch(0.85 0.18 145 / 0.15)" strokeWidth="1.5" strokeLinecap="round">
              <animateTransform attributeName="transform" type="rotate" from="0 200 180" to="360 200 180" dur="12s" repeatCount="indefinite" />
            </line>
          </g>

          {/* ===== SCAN LINE: Vertical sweep ===== */}
          <g>
            <rect x="60" y="100" width="280" height="180" rx="8" fill="none" stroke="oklch(0.85 0.18 145 / 0.04)" strokeWidth="1" strokeDasharray="6 6" />
            <line x1="60" y1="100" x2="340" y2="100" stroke="oklch(0.85 0.18 145 / 0.12)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6">
              <animate attributeName="y1" values="100;260;100" dur="6s" repeatCount="indefinite" />
              <animate attributeName="y2" values="100;260;100" dur="6s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0.15;0.6" dur="6s" repeatCount="indefinite" />
            </line>
          </g>

          {/* ===== PARTICLE SYSTEM ===== */}
          {particleData.map((p) => (
            <g key={p.id}>
              <circle cx={p.cx} cy={p.cy} r={p.r} fill="white" opacity={0.3}>
                <animate attributeName="opacity" values="0.1;0.6;0.1" dur={`${p.dur}s`} repeatCount="indefinite" begin={`${p.delay}s`} />
              </circle>
              <circle cx={p.cx} cy={p.cy} r={p.r + 3} fill="oklch(0.85 0.18 145)" opacity={0.08}>
                <animate attributeName="opacity" values="0.03;0.15;0.03" dur={`${p.dur}s`} repeatCount="indefinite" begin={`${p.delay}s`} />
              </circle>
            </g>
          ))}

          {/* ===== CAR SILHOUETTE — perspective side view ===== */}
          <g filter="url(#carGlow)">
            {/* Ground reflection */}
            <ellipse cx="200" cy="275" rx="150" ry="14" fill="url(#groundGlow)" opacity={0.5}>
              <animate attributeName="rx" values="150;160;150" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0.3;0.5" dur="3s" repeatCount="indefinite" />
            </ellipse>

            {/* Main body */}
            <path
              d="M 55 220 L 75 195 L 115 185 L 135 165 L 225 165 L 265 185 L 315 185 L 335 205 L 345 220 L 345 250 L 55 250 Z"
              stroke="white"
              strokeWidth="1.8"
              strokeOpacity={0.85}
              fill="url(#carBodyGrad)"
              strokeLinejoin="round"
            />
            {/* Roof line — sporty coupe profile */}
            <path
              d="M 115 185 L 135 140 L 215 140 L 260 175 L 265 185"
              stroke="white"
              strokeWidth="2.2"
              strokeOpacity={0.85}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Front window */}
            <path
              d="M 140 165 L 158 145 L 202 145 L 202 185 L 140 185 Z"
              stroke="white"
              strokeWidth="0.8"
              strokeOpacity={0.25}
              fill="white"
              fillOpacity={0.06}
            />
            {/* Rear window */}
            <path
              d="M 210 145 L 252 145 L 262 170 L 262 185 L 210 185 Z"
              stroke="white"
              strokeWidth="0.8"
              strokeOpacity={0.25}
              fill="white"
              fillOpacity={0.04}
            />
            {/* Door line */}
            <line x1="205" y1="185" x2="205" y2="248" stroke="white" strokeOpacity={0.08} strokeWidth="0.8" />
            {/* Side sill */}
            <line x1="75" y1="230" x2="335" y2="230" stroke="white" strokeOpacity={0.06} strokeWidth="1" />

            {/* Wheels — with rotation animation */}
            <g>
              <circle cx="120" cy="250" r="22" stroke="white" strokeWidth="1.8" strokeOpacity={0.6} fill="none" />
              <circle cx="120" cy="250" r="16" stroke="white" strokeWidth="0.8" strokeOpacity={0.15} fill="none" />
              <circle cx="120" cy="250" r="5" fill="white" fillOpacity={0.35} />
              {/* Rotating spokes */}
              <g opacity={0.2}>
                <line x1="120" y1="234" x2="120" y2="266" stroke="white" strokeWidth="1" strokeLinecap="round">
                  <animateTransform attributeName="transform" type="rotate" from="0 120 250" to="360 120 250" dur="2s" repeatCount="indefinite" />
                </line>
                <line x1="104" y1="250" x2="136" y2="250" stroke="white" strokeWidth="1" strokeLinecap="round">
                  <animateTransform attributeName="transform" type="rotate" from="0 120 250" to="360 120 250" dur="2s" repeatCount="indefinite" />
                </line>
              </g>
            </g>
            <g>
              <circle cx="285" cy="250" r="22" stroke="white" strokeWidth="1.8" strokeOpacity={0.6} fill="none" />
              <circle cx="285" cy="250" r="16" stroke="white" strokeWidth="0.8" strokeOpacity={0.15} fill="none" />
              <circle cx="285" cy="250" r="5" fill="white" fillOpacity={0.35} />
              <g opacity={0.2}>
                <line x1="285" y1="234" x2="285" y2="266" stroke="white" strokeWidth="1" strokeLinecap="round">
                  <animateTransform attributeName="transform" type="rotate" from="0 285 250" to="360 285 250" dur="2s" repeatCount="indefinite" />
                </line>
                <line x1="269" y1="250" x2="301" y2="250" stroke="white" strokeWidth="1" strokeLinecap="round">
                  <animateTransform attributeName="transform" type="rotate" from="0 285 250" to="360 285 250" dur="2s" repeatCount="indefinite" />
                </line>
              </g>
            </g>

            {/* Headlight glow */}
            <circle cx="53" cy="220" r="4" fill="oklch(0.85 0.18 145)" opacity={0.6}>
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />
            </circle>
            <ellipse cx="50" cy="220" rx="12" ry="6" fill="oklch(0.85 0.18 145)" opacity={0.08}>
              <animate attributeName="opacity" values="0.04;0.12;0.04" dur="2s" repeatCount="indefinite" />
            </ellipse>

            {/* Taillight */}
            <rect x="340" y="218" width="6" height="10" rx="2" fill="oklch(0.6 0.24 27)" opacity={0.5}>
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur="1.5s" repeatCount="indefinite" />
            </rect>
          </g>

          {/* ===== DATA FLOW: Animated beams from car ===== */}
          {[
            { x1: 345, y1: 235, x2: 390, y2: 220 },
            { x1: 345, y1: 228, x2: 380, y2: 150 },
            { x1: 55, y1: 215, x2: 15, y2: 170 },
            { x1: 55, y1: 235, x2: 10, y2: 270 },
            { x1: 345, y1: 245, x2: 395, y2: 300 },
          ].map((l, i) => (
            <line
              key={`flow-${i}`}
              x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
              stroke="oklch(0.85 0.18 145 / 0.3)"
              strokeWidth="1.2"
              strokeDasharray="4 6"
              strokeLinecap="round"
            >
              <animate attributeName="stroke-dashoffset" from="20" to="0" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
            </line>
          ))}

          {/* ===== DATA NODES ===== */}
          {[
            { x: 390, y: 220, label: "EUROPD" },
            { x: 380, y: 150, label: "INTERPOL" },
            { x: 15, y: 170, label: "CEBIA" },
            { x: 10, y: 270, label: "STK" },
            { x: 395, y: 300, label: "POIST" },
          ].map((n, i) => (
            <g key={`node-${i}`}>
              <circle cx={n.x} cy={n.y} r="3.5" fill="oklch(0.85 0.18 145)" opacity={0.5}>
                <animate attributeName="opacity" values="0.2;0.7;0.2" dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
              </circle>
              <circle cx={n.x} cy={n.y} r="6" fill="none" stroke="oklch(0.85 0.18 145)" strokeWidth="0.5" opacity={0.15}>
                <animate attributeName="r" values="6;14;6" dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.15;0;0.15" dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
              </circle>
              <text x={n.x} y={n.y + 14} textAnchor="middle" fill="white" fillOpacity={0.3} fontSize="7" fontFamily="monospace" fontWeight="bold" letterSpacing="1">
                {n.label}
              </text>
            </g>
          ))}

          {/* ===== VIN DATA STREAM overlay ===== */}
          <g opacity={0.15}>
            {[0, 1, 2, 3].map((i) => {
              const x = 30 + i * 88;
              return (
                <text key={`vin-${i}`} x={x} y="330" fill="oklch(0.85 0.18 145)" fontSize="6" fontFamily="monospace" fontWeight="bold" letterSpacing="3">
                  <animate attributeName="opacity" values="0;0.8;0" dur={`${2 + i * 0.8}s`} repeatCount="indefinite" begin={`${i * 0.4}s`} />
                  {["WBAXB5", "WDBUF3", "VF1DC1", "WAUZZZ"][i]}
                </text>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Bottom status bar */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 backdrop-blur-sm">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.82_0.19_145)]">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[oklch(0.82_0.19_145)] opacity-30" />
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/50">
              Live VIN skenovanie
            </span>
          </span>
          <span className="h-3 w-px bg-white/10" />
          <span className="text-[9px] font-mono text-white/30">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
            ██ DATA STREAM
          </span>
        </div>
      </div>
    </div>
  );
}

function TrustBar() {
  const items = [
    { label: "Polícia SR/EU", icon: ShieldCheck },
    { label: "STK / EK", icon: Gauge },
    { label: "Servisné knihy", icon: Wrench },
    { label: "Poisťovne", icon: Database },
    { label: "Aukčné portály", icon: FileSearch },
    { label: "Leasingové spoločnosti", icon: Database },
    { label: "Interpol", icon: ShieldCheck },
    { label: "Cebia databáza", icon: FileSearch },
    { label: "EU registre", icon: Database },
    { label: "Pôvodné servisy", icon: Wrench },
  ];
  // Duplicate for seamless scrolling
  const all = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-b border-border/40 bg-gradient-to-r from-secondary/50 via-secondary/20 to-secondary/50">
      {/* Edge fade overlays — wider on desktop */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-secondary/50 to-transparent md:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-r from-transparent to-secondary/50 md:w-20" />

      {/* Top decorative line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[oklch(0.78_0.19_145)]/20 to-transparent" />
      {/* Bottom subtle line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 py-2.5 md:py-3">
        <div className="flex items-center gap-2 md:gap-4">
          {/* "Dáta z:" badge */}
          <span className="shrink-0 rounded-md border border-border/50 bg-background/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-foreground shadow-xs backdrop-blur md:px-3 md:py-1 md:text-[11px] md:tracking-[0.15em]">
            Dáta z:
          </span>

          {/* Scrolling container */}
          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="animate-trust-scroll flex w-max items-center gap-5 md:gap-8">
              {all.map((item, idx) => (
                <span
                  key={`${item.label}-${idx}`}
                  className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/[0.04] bg-white/[0.02] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground/70 shadow-xs transition-all duration-300 hover:border-[oklch(0.78_0.19_145)]/15 hover:bg-[oklch(0.78_0.19_145)]/[0.03] hover:text-foreground/90 md:gap-2 md:px-3 md:py-1 md:text-[11px] md:tracking-[0.15em]"
                >
                  <item.icon className="h-2.5 w-2.5 text-[oklch(0.78_0.19_145)]/50 md:h-3 md:w-3" />
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WhatYouGet() {
  const items = [
    { icon: Gauge, title: "Stočený tachometer", body: "Časová os záznamov km z STK, servisov a aukcií. Odhalíme aj manipulácie spred 15+ rokov." },
    { icon: ShieldCheck, title: "Škody a nehody", body: "Poistné udalosti, totálky, záznamy z EU databáz. Vieme aj to, čo predajca zamlčal." },
    { icon: FileSearch, title: "Pôvod a krádež", body: "Overenie v Interpol/SIS a v evidenciách EU. Uistite sa, že nekupujete cudzie auto." },
    { icon: Wrench, title: "Servisná história", body: "Zaznamenané opravy, výmeny oleja, rozvodov a odporúčania mechanikov." },
    { icon: Database, title: "Leasing a záložné právo", body: "Skryté finančné bremená auta — exekúcie, leasingy a záložné práva." },
    { icon: CheckCircle2, title: "Ekvivalent výbavy", body: "Overenie originálnej výbavy podľa VIN kódu. Zistíte čo malo auto naozaj." },
  ];
  return (
    <section className="relative overflow-hidden py-20">
      {/* Background accents — multi-layer glow */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 opacity-20 [background:radial-gradient(circle,oklch(0.78_0.19_145/0.06),transparent_60%)]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 opacity-10 [background:radial-gradient(circle,oklch(0.22_0.05_255/0.04),transparent_60%)]" />

      {/* Grid pattern overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.015] [background-image:linear-gradient(rgba(255,255,255,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.3)_1px,transparent_1px)] [background-size:40px_40px]" />

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.5_0.15_155)]">
              Čo zistíte
            </p>
            <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
              Kompletný obraz o aute pred kúpou
            </h2>
          </div>
          <p className="text-sm text-muted-foreground sm:text-right">
            Všetky dostupné dáta na jednom mieste
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, body }, idx) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 shadow-[0_4px_20px_-6px_oklch(0.22_0.05_255/0.1),0_1px_3px_0_oklch(0.22_0.05_255/0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[oklch(0.78_0.19_145)]/10 hover:shadow-[0_20px_48px_-12px_oklch(0.22_0.05_255/0.25),0_0_0_1px_oklch(0.78_0.19_145/0.04)]"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              {/* Hover accent bar with animated shimmer */}
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[oklch(0.78_0.19_145)]/60 via-[oklch(0.78_0.19_145)] to-[oklch(0.22_0.05_255)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Background radial on hover */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[oklch(0.78_0.19_145)]/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

              {/* Icon with enhanced container */}
              <div className="relative inline-flex">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-[oklch(0.94_0.06_150)] to-[oklch(0.86_0.08_160)] text-[oklch(0.35_0.14_155)] shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_8px_24px_-6px_oklch(0.78_0.19_145/0.3)]">
                  <Icon className="h-5.5 w-5.5 transition-transform duration-300 group-hover:rotate-[-4deg]" />
                </div>
              </div>

              <h3 className="mt-4 text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-[oklch(0.22_0.05_255)]">
                {title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>

              {/* Bottom decorative line with animated dots */}
              <div className="mt-4 flex items-center gap-1.5">
                <div className="h-px flex-1 bg-gradient-to-r from-[oklch(0.78_0.19_145)]/20 to-transparent" />
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="h-1 w-1 rounded-full bg-[oklch(0.78_0.19_145)]/15 transition-all duration-300 group-hover:bg-[oklch(0.78_0.19_145)]/40"
                    style={{ transitionDelay: `${d * 100}ms` }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stats row — enhanced */}
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border/40 bg-border/30 sm:grid-cols-3">
          {[
            { v: "40+", l: "Dátových zdrojov", desc: "Štátne aj súkromné registre" },
            { v: "32", l: "Krajín", desc: "EU + Švajčiarsko, Nórsko, UK" },
            { v: "< 60s", l: "Rýchlosť výsledku", desc: "Väčšina reportov do minúty" },
          ].map((s) => (
            <div key={s.l} className="relative bg-gradient-to-b from-secondary/40 to-background p-6 text-center transition-colors duration-200 hover:from-secondary/60">
              <p className="text-3xl font-black text-foreground sm:text-4xl">{s.v}</p>
              <p className="mt-0.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">{s.l}</p>
              <p className="mt-1 text-[10px] text-muted-foreground/50">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      t: "Zadajte VIN",
      d: "17-znakový kód nájdete v technickom preukaze alebo na karosérii pri čelnom skle.",
      svg: (
        <svg viewBox="0 0 140 90" fill="none" className="h-24 w-full">
          {/* Car silhouette in background */}
          <g opacity={0.06}>
            <path d="M 10 75 L 20 60 L 45 55 L 55 40 L 95 40 L 110 55 L 125 55 L 135 65 L 140 75 Z" fill="white" />
            <circle cx="45" cy="75" r="12" fill="white" />
            <circle cx="110" cy="75" r="12" fill="white" />
          </g>
          {/* VIN input card */}
          <rect x="15" y="22" width="110" height="38" rx="8" stroke="oklch(0.85 0.15 150 / 0.25)" strokeWidth="1.5" fill="oklch(0.85 0.15 150 / 0.06)" />
          {/* Scan line on the card */}
          <line x1="20" y1="41" x2="120" y2="41" stroke="oklch(0.85 0.15 150 / 0.08)" strokeWidth="0.5" />
          {/* VIN text */}
          <text x="70" y="46" textAnchor="middle" fill="oklch(0.85 0.15 150 / 0.7)" fontSize="9" fontFamily="monospace" fontWeight="bold" letterSpacing="3">WBAXB51050C589952</text>
          {/* Cursor blink */}
          <rect x="118" y="35" width="2" height="12" rx="0.5" fill="oklch(0.85 0.15 150 / 0.5)">
            <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
          </rect>
          {/* Corner brackets */}
          <rect x="17" y="24" width="5" height="5" rx="1" stroke="oklch(0.85 0.15 150 / 0.2)" strokeWidth="1" fill="none" />
          <rect x="118" y="24" width="5" height="5" rx="1" stroke="oklch(0.85 0.15 150 / 0.2)" strokeWidth="1" fill="none" />
          <rect x="17" y="53" width="5" height="5" rx="1" stroke="oklch(0.85 0.15 150 / 0.2)" strokeWidth="1" fill="none" />
          <rect x="118" y="53" width="5" height="5" rx="1" stroke="oklch(0.85 0.15 150 / 0.2)" strokeWidth="1" fill="none" />
          {/* Magnifying glass */}
          <g opacity={0.4}>
            <circle cx="122" cy="16" r="7" stroke="oklch(0.85 0.15 150 / 0.3)" strokeWidth="1.2" fill="none" />
            <line x1="127" y1="21" x2="132" y2="26" stroke="oklch(0.85 0.15 150 / 0.2)" strokeWidth="1.5" strokeLinecap="round" />
          </g>
          {/* Small document icon beside */}
          <g opacity={0.25}>
            <rect x="8" y="12" width="10" height="13" rx="1.5" stroke="white" strokeWidth="0.8" fill="none" opacity={0.3} />
            <line x1="10" y1="16" x2="16" y2="16" stroke="white" strokeWidth="0.6" opacity={0.2} />
            <line x1="10" y1="19" x2="15" y2="19" stroke="white" strokeWidth="0.6" opacity={0.2} />
          </g>
          {/* Bottom glow */}
          <rect x="35" y="65" width="70" height="2" rx="1" fill="oklch(0.85 0.15 150 / 0.08)" />
        </svg>
      ),
    },
    {
      n: "02",
      t: "Spustíme prehľadávanie",
      d: "Spájame záznamy z desiatok registrov a databáz v reálnom čase.",
      svg: (
        <svg viewBox="0 0 140 90" fill="none" className="h-24 w-full">
          {/* Central database server icon */}
          <rect x="50" y="28" width="40" height="28" rx="4" stroke="oklch(0.85 0.15 150 / 0.3)" strokeWidth="1.5" fill="oklch(0.85 0.15 150 / 0.06)" />
          <rect x="52" y="30" width="36" height="4" rx="1" fill="oklch(0.85 0.15 150 / 0.1)" />
          <rect x="52" y="40" width="36" height="4" rx="1" fill="oklch(0.85 0.15 150 / 0.08)" />
          <rect x="52" y="50" width="36" height="4" rx="1" fill="oklch(0.85 0.15 150 / 0.06)" />
          {/* Server circle indicator */}
          <circle cx="86" cy="40" r="2" fill="oklch(0.78 0.19 145 / 0.5)">
            <animate attributeName="opacity" values="0.2;0.8;0.2" dur="1.5s" repeatCount="indefinite" />
          </circle>

          {/* Satellite data sources — left side */}
          {[
            { x: 12, y: 18, label: "STK" },
            { x: 16, y: 68, label: "EU" },
            { x: 66, y: 8, label: "POL" },
          ].map((n, i) => (
            <g key={`left-${i}`}>
              <rect x={n.x} y={n.y} width="26" height="16" rx="3" stroke="oklch(0.85 0.15 150 / 0.15)" strokeWidth="1" fill="oklch(0.85 0.15 150 / 0.04)" />
              <text x={n.x + 13} y={n.y + 11} textAnchor="middle" fill="oklch(0.85 0.15 150 / 0.35)" fontSize="6" fontFamily="monospace" fontWeight="bold">{n.label}</text>
              {/* Connection line to server */}
              <line x1={n.x + 26} y1={n.y + 8} x2="50" y2="42" stroke="oklch(0.85 0.15 150 / 0.12)" strokeWidth="0.8" strokeDasharray="2 3">
                <animate attributeName="stroke-dashoffset" from="10" to="0" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
              </line>
            </g>
          ))}

          {/* Satellite data sources — right side */}
          {[
            { x: 100, y: 14, label: "CEBIA" },
            { x: 104, y: 62, label: "AUKCIA" },
          ].map((n, i) => (
            <g key={`right-${i}`}>
              <rect x={n.x} y={n.y} width="30" height="16" rx="3" stroke="oklch(0.85 0.15 150 / 0.15)" strokeWidth="1" fill="oklch(0.85 0.15 150 / 0.04)" />
              <text x={n.x + 15} y={n.y + 11} textAnchor="middle" fill="oklch(0.85 0.15 150 / 0.35)" fontSize="6" fontFamily="monospace" fontWeight="bold">{n.label}</text>
              <line x1={n.x} y1={n.y + 8} x2="90" y2="42" stroke="oklch(0.85 0.15 150 / 0.12)" strokeWidth="0.8" strokeDasharray="2 3">
                <animate attributeName="stroke-dashoffset" from="10" to="0" dur={`${1.2 + i * 0.3}s`} repeatCount="indefinite" />
              </line>
            </g>
          ))}

          {/* Animated pulse ring around server */}
          <circle cx="70" cy="42" r="22" stroke="oklch(0.85 0.15 150 / 0.12)" strokeWidth="1" fill="none">
            <animate attributeName="r" values="22;34;22" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="70" cy="42" r="30" stroke="oklch(0.85 0.15 150 / 0.06)" strokeWidth="1" fill="none">
            <animate attributeName="r" values="30;44;30" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2;0;0.2" dur="3s" repeatCount="indefinite" />
          </circle>
        </svg>
      ),
    },
    {
      n: "03",
      t: "Získate report",
      d: "Prehľadné zhrnutie s farebným hodnotením, detailami a odporúčaniami.",
      svg: (
        <svg viewBox="0 0 140 90" fill="none" className="h-24 w-full">
          {/* Phone/device mockup */}
          <rect x="45" y="8" width="50" height="72" rx="6" stroke="oklch(0.85 0.15 150 / 0.2)" strokeWidth="1.2" fill="oklch(0.85 0.15 150 / 0.04)" />
          {/* Screen content */}
          {/* Header score bar */}
          <rect x="51" y="14" width="38" height="14" rx="3" fill="oklch(0.78 0.19 145 / 0.15)" />
          <text x="70" y="24" textAnchor="middle" fill="oklch(0.78 0.19 145 / 0.7)" fontSize="7" fontFamily="monospace" fontWeight="bold">A - 96/100</text>
          {/* Data lines */}
          {[32, 38, 44, 50, 56, 62].map((y, i) => (
            <rect key={i} x="53" y={y} width={36 - i * 3} height="3" rx="1.5" fill="oklch(0.85 0.15 150 / 0.12)" />
          ))}
          {/* Checkmark badge */}
          <circle cx="100" cy="14" r="8" fill="oklch(0.78 0.19 145 / 0.1)" stroke="oklch(0.78 0.19 145 / 0.3)" strokeWidth="1" />
          <path d="M 96 14 L 99 17 L 104 11" stroke="oklch(0.78 0.19 145 / 0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {/* Floating data sheets around device */}
          {[
            { x: 8, y: 10, deg: -12 },
            { x: 108, y: 20, deg: 8 },
            { x: 14, y: 52, deg: 6 },
            { x: 106, y: 58, deg: -5 },
          ].map((sheet, i) => (
            <g key={`sheet-${i}`} opacity={0.2}>
              <rect x={sheet.x} y={sheet.y} width="22" height="16" rx="2" stroke="oklch(0.85 0.15 150 / 0.15)" strokeWidth="0.8" fill="oklch(0.85 0.15 150 / 0.04)" transform={`rotate(${sheet.deg} ${sheet.x + 11} ${sheet.y + 8})`} />
              <line x1={sheet.x + 3} y1={sheet.y + 5} x2={sheet.x + 18} y2={sheet.y + 5} stroke="oklch(0.85 0.15 150 / 0.1)" strokeWidth="0.6" transform={`rotate(${sheet.deg} ${sheet.x + 11} ${sheet.y + 8})`} />
              <line x1={sheet.x + 3} y1={sheet.y + 9} x2={sheet.x + 14} y2={sheet.y + 9} stroke="oklch(0.85 0.15 150 / 0.08)" strokeWidth="0.6" transform={`rotate(${sheet.deg} ${sheet.x + 11} ${sheet.y + 8})`} />
            </g>
          ))}
        </svg>
      ),
    },
  ];
  return (
    <section className="relative overflow-hidden py-20">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-secondary/20" />
      <div className="pointer-events-none absolute inset-y-0 left-1/3 w-96 opacity-30 [background:radial-gradient(ellipse,oklch(0.78_0.19_145/0.08),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.5_0.15_155)]">
            Jednoduchý proces
          </p>
          <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">Ako to funguje</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Stačia tri kroky a máte kompletný prehľad o histórii vozidla.
          </p>
        </div>

        {/* Desktop: 3-column grid with animated connector */}
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {steps.map((s, idx) => (
            <div key={s.n} className="group relative">
              {/* Animated connector line between cards (desktop) */}
              {idx < steps.length - 1 && (
                <div className="pointer-events-none absolute -right-3 top-16 z-10 hidden w-6 sm:block">
                  <div className="relative flex items-center justify-center">
                    {/* Base line */}
                    <div className="h-px w-full bg-gradient-to-r from-[oklch(0.85_0.15_150)]/30 via-[oklch(0.85_0.15_150)]/15 to-transparent" />
                    {/* Animated dot traveling along */}
                    <div className="absolute left-0 h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.19_145)]/40">
                      <div className="animate-trust-scroll absolute h-full w-full rounded-full bg-[oklch(0.78_0.19_145)]/20" />
                    </div>
                  </div>
                </div>
              )}

              <div className="relative rounded-2xl border border-border/50 bg-card p-6 shadow-[0_4px_20px_-6px_oklch(0.22_0.05_255/0.12),0_1px_3px_0_oklch(0.22_0.05_255/0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[oklch(0.78_0.19_145)]/10 hover:shadow-[0_16px_48px_-12px_oklch(0.22_0.05_255/0.3),0_0_0_1px_oklch(0.78_0.19_145/0.04)]">
                {/* Step number with glow */}
                <div className="mb-4 inline-flex items-center gap-2">
                  <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[oklch(0.85_0.15_150)] to-[oklch(0.75_0.15_160)] text-sm font-bold text-white shadow-sm">
                    <span className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-40 [background:radial-gradient(circle_at_50%_0%,white,transparent_60%)]" />
                    {s.n}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
                    Krok {idx + 1}
                  </span>
                </div>

                {/* SVG illustration */}
                <div className="mb-4 flex justify-center">{s.svg}</div>

                <h3 className="text-lg font-bold text-foreground">{s.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: connected vertical steps */}
        <div className="mt-10 space-y-6 sm:hidden">
          <div className="relative">
            {/* Vertical connector line */}
            <div className="pointer-events-none absolute left-[19px] top-0 h-full w-px bg-gradient-to-b from-[oklch(0.85_0.15_150)]/20 via-[oklch(0.85_0.15_150)]/10 to-transparent" />
            {steps.map((s, idx) => (
              <div key={s.n} className="relative flex gap-4 pb-8 last:pb-0">
                <div className="relative z-10 flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[oklch(0.85_0.15_150)] to-[oklch(0.75_0.15_160)] text-sm font-bold text-white shadow-sm">
                  {s.n}
                </div>
                <div className="min-w-0 flex-1 rounded-2xl border border-border/50 bg-card p-4 shadow-sm">
                  <div className="mb-2 flex justify-center">{s.svg}</div>
                  <h3 className="text-base font-bold text-foreground">{s.t}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BuyingCta() {
  const checklist = [
    "Kontrola VIN na karosérii a v dokladoch",
    "Známky prelakovania a tmelu",
    "Únikov oleja a stav podvozku",
    "Elektroniky a chybových hlásení",
    "Testovacia jazda — na čo počúvať",
  ];
  return (
    <section className="relative overflow-hidden py-20">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 opacity-30 [background:radial-gradient(circle,oklch(0.78_0.19_145/0.06),transparent_60%)]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 opacity-20 [background:radial-gradient(circle,oklch(0.22_0.05_255/0.04),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-card via-card to-secondary/20 p-8 shadow-[0_20px_60px_-20px_oklch(0.22_0.05_255/0.2)] sm:p-12">
          {/* Decorative corner accents */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[oklch(0.78_0.19_145)]/5 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-[oklch(0.22_0.05_255)]/5 blur-3xl" />
          {/* Top-right decorative line */}
          <div className="pointer-events-none absolute right-0 top-0 h-px w-48 bg-gradient-to-l from-[oklch(0.78_0.19_145)]/10 to-transparent" />

          <div className="relative grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
            {/* Left: copy */}
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.78_0.19_145)]/20 bg-[oklch(0.78_0.19_145)]/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[oklch(0.5_0.15_155)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.19_145)]">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[oklch(0.78_0.19_145)] opacity-30" />
                </span>
                Poradca kúpy
              </p>
              <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
                Na čo si dať pozor pri kúpe ojazdeného auta
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
                Sprievodca s obrázkami a checklistom: obhliadka karosérie, motora, elektroniky,
                papierov a testovacej jazdy. Bez servisu a bez skúseností? Máme ťa pokryté.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/guide"
                  className="group inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[oklch(0.22_0.05_255)] to-[oklch(0.28_0.07_250)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/10 transition-all duration-300 hover:shadow-xl hover:shadow-black/15 hover:brightness-110 active:scale-[0.98]"
                >
                  <span>Otvoriť poradcu</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-all duration-300 group-hover:translate-x-1">
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-background/80 px-5 py-3.5 text-sm font-semibold text-foreground shadow-xs backdrop-blur transition-all duration-300 hover:border-[oklch(0.78_0.19_145)]/20 hover:bg-background hover:shadow-sm active:scale-[0.98]"
                >
                  Overiť VIN
                </Link>
              </div>
            </div>

            {/* Right: checklist panel */}
            <div className="relative">
              <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-muted/80 via-muted/50 to-muted/30 p-5 shadow-[inset_0_1px_2px_oklch(0.22_0.05_255/0.04),0_4px_20px_-8px_oklch(0.22_0.05_255/0.15)] backdrop-blur-sm">
                {/* Header with icon */}
                <div className="mb-4 flex items-center gap-2.5">
                  <div className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-[oklch(0.94_0.06_150)] to-[oklch(0.88_0.08_160)] text-[10px] font-bold text-[oklch(0.35_0.14_155)] shadow-xs">
                    ✓
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                    Predkupný checklist
                  </p>
                </div>

                {/* Checklist items */}
                <ul className="space-y-2">
                  {checklist.map((t, i) => (
                    <li key={t} className="group flex items-start gap-3 rounded-lg px-2 py-1.5 transition-colors duration-200 hover:bg-white/[0.03]">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-[oklch(0.78_0.19_145)]/25 bg-[oklch(0.78_0.19_145)]/5 text-[10px] font-bold text-[oklch(0.5_0.15_155)] transition-all duration-200 group-hover:border-[oklch(0.78_0.19_145)]/50 group-hover:bg-[oklch(0.78_0.19_145)]/10">
                        {i + 1}
                      </span>
                      <span className="text-sm text-muted-foreground transition-colors duration-200 group-hover:text-foreground">{t}</span>
                    </li>
                  ))}
                </ul>

                {/* Bottom note with gradient */}
                <div className="mt-4 flex items-center gap-2 rounded-lg border border-white/[0.04] bg-white/[0.02] px-3 py-2">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0 text-[oklch(0.78_0.19_145)]/40">
                    <circle cx="6" cy="6" r="5.5" stroke="currentColor" strokeWidth="1" />
                    <path d="M6 3.5V6M6 8V8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <span className="text-[10px] leading-relaxed text-muted-foreground/60">
                    overené partnermi AAA AUTO a CEBIA
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
