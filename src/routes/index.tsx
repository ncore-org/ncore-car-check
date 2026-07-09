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
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_10%,white,transparent_40%),radial-gradient(circle_at_80%_60%,oklch(0.78_0.19_145),transparent_50%)]" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.82_0.19_145)]" />
          Nová generácia overenia vozidla — nCc
        </span>
        <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl">
          Nekupujte mačku vo vreci. <span className="text-[oklch(0.85_0.18_145)]">Preverte VIN</span> za pár sekúnd.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-white/80 sm:text-lg">
          nCc — <strong className="text-white">ncore car control</strong> — kombinuje desiatky
          registrov a odhalí stočený tachometer, poškodenia, krádež či nezaplatené leasingy.
        </p>
        <div className="mt-8 max-w-2xl">
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
    </section>
  );
}

function TrustBar() {
  const items = ["Polícia SR/EU", "STK / EK", "Servisné knihy", "Poisťovne", "Aukčné portály", "Leasingy"];
  return (
    <div className="border-b border-border bg-secondary/40">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 py-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        <span className="text-foreground">Dáta z:</span>
        {items.map((i) => (
          <span key={i}>{i}</span>
        ))}
      </div>
    </div>
  );
}

function WhatYouGet() {
  const items = [
    { icon: Gauge, title: "Stočený tachometer", body: "Časová os záznamov km z STK, servisov a aukcií." },
    { icon: ShieldCheck, title: "Škody a nehody", body: "Poistné udalosti, totálky, záznamy z EU databáz." },
    { icon: FileSearch, title: "Pôvod a krádež", body: "Overenie v Interpol/SIS a v evidenciách EU." },
    { icon: Wrench, title: "Servisná história", body: "Zaznamenané opravy, výmeny a odporúčania." },
    { icon: Database, title: "Leasing a záložné právo", body: "Skryté finančné bremená auta." },
    { icon: CheckCircle2, title: "Ekvivalent výbavy", body: "Overenie originálnej výbavy podľa VIN." },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.5_0.15_155)]">Čo zistíte</p>
        <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">Kompletný obraz o aute pred kúpou</h2>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon: Icon, title, body }) => (
          <div key={title} className="rounded-2xl border border-border bg-card p-6 transition hover:shadow-md">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-[oklch(0.94_0.06_150)] text-[oklch(0.4_0.15_155)]">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-semibold text-foreground">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "Zadajte VIN", d: "17-znakový kód nájdete v technickom preukaze alebo na karosérii." },
    { n: "02", t: "Spustíme prehľadávanie", d: "Spájame záznamy z desiatok registrov v reálnom čase." },
    { n: "03", t: "Získate report", d: "Prehľadné zhrnutie s upozorneniami a odporúčaniami." },
  ];
  return (
    <section className="bg-secondary/40 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Ako to funguje</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="relative rounded-2xl border border-border bg-card p-6">
              <span className="text-4xl font-black text-[oklch(0.85_0.15_150)]">{s.n}</span>
              <h3 className="mt-2 font-semibold">{s.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BuyingCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="overflow-hidden rounded-3xl border border-border bg-card p-8 sm:p-12">
        <div className="grid items-center gap-6 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.5_0.15_155)]">
              Poradca kúpy
            </p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Na čo si dať pozor pri kúpe ojazdeného auta</h2>
            <p className="mt-3 text-muted-foreground">
              Sprievodca s obrázkami a checklistom: obhliadka karosérie, motora, elektroniky,
              papierov a testovacej jazdy. Bez servisu a bez skúseností? Máme ťa pokryté.
            </p>
            <Link
              to="/guide"
              className="mt-6 inline-flex rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground hover:opacity-95"
            >
              Otvoriť poradcu →
            </Link>
          </div>
          <ul className="space-y-2 rounded-2xl bg-muted p-5 text-sm">
            {[
              "Kontrola VIN na karosérii a v dokladoch",
              "Známky prelakovania a tmelu",
              "Únikov oleja a stav podvozku",
              "Elektroniky a chybových hlásení",
              "Testovacia jazda — na čo počúvať",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.5_0.15_155)]" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
