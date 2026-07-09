import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, ShieldCheck, Check } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { InsuranceCalculator } from "@/components/site/InsuranceCalculator";
import { findInsurer } from "@/data/insurance";

export const Route = createFileRoute("/pzp/$insurer")({
  loader: ({ params }) => {
    const insurer = findInsurer(params.insurer);
    if (!insurer || !insurer.products.includes("pzp")) throw notFound();
    return { insurer };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.insurer.name ?? "Poisťovňa";
    return {
      meta: [
        { title: `${name} — PZP kalkulačka | nCc` },
        { name: "description", content: `Povinné zmluvné poistenie ${name}. Porovnajte cenu s ostatnými poisťovňami.` },
      ],
    };
  },
  component: PzpInsurerPage,
  errorComponent: () => <PzpNotFound />,
  notFoundComponent: () => <PzpNotFound />,
});

function PzpNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">404</p>
        <h1 className="mt-2 text-3xl font-bold">Poisťovňa nenájdená</h1>
        <p className="mt-3 text-muted-foreground">Skontrolujte URL alebo sa vráťte na zoznam.</p>
        <Link to="/pzp" className="mt-6 inline-flex items-center gap-1 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground">
          <ArrowLeft className="h-4 w-4" /> Späť na PZP
        </Link>
      </div>
      <Footer />
    </div>
  );
}

function PzpInsurerPage() {
  const { insurer } = Route.useLoaderData();
  const cfg = insurer.pzp!;
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <Link to="/pzp" className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3 w-3" /> Späť na PZP
          </Link>
          <div className="mt-4 flex items-start gap-5">
            <div
              className="grid h-16 w-16 place-items-center rounded-2xl text-lg font-black text-white shadow-sm"
              style={{ background: insurer.brandColor }}
            >
              {insurer.short.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-black text-foreground sm:text-4xl">{insurer.name}</h1>
              <p className="mt-1 text-muted-foreground">{insurer.tagline}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                {insurer.strengths.map((s: string) => (
                  <span key={s} className="inline-flex items-center gap-1 rounded-full bg-[oklch(0.94_0.06_150)] px-2.5 py-1 font-semibold text-[oklch(0.4_0.15_155)]">
                    <Check className="h-3 w-3" /> {s}
                  </span>
                ))}
              </div>
            </div>
            <a
              href={insurer.calculatorUrl ?? insurer.homepage}
              target="_blank" rel="noopener noreferrer"
              className="hidden shrink-0 items-center gap-1 rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-brand-foreground shadow-sm hover:opacity-95 sm:inline-flex"
            >
              Uzavrieť online <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="mb-4 text-xl font-bold">Parametre poistenia</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Krytie zdravie" value={`${cfg.coverageHealth} mil. €`} />
          <Stat label="Krytie majetok" value={`${cfg.coverageProperty} mil. €`} />
          <Stat label="Online zľava" value={`${cfg.onlineDiscountPct}%`} accent />
          <Stat label="Max bonus" value={`${cfg.maxBonusPct}%`} accent />
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-card p-6">
          <h3 className="flex items-center gap-2 text-lg font-bold"><ShieldCheck className="h-5 w-5 text-[oklch(0.5_0.15_155)]" /> Ako sa cena počíta</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>• Základná sadzba pri 100 kW: <strong className="text-foreground">{cfg.base100kw} €</strong> / rok</li>
            <li>• Za každý kW nad 100: <strong className="text-foreground">+{cfg.kwFactor} €</strong></li>
            <li>• Rizikové koeficienty: vek vodiča, kraj, pohon, nájazd, vek vozidla</li>
            <li>• Zľavy: bonus za bezškodovosť + online uzavretie</li>
          </ul>
        </div>
      </section>

      <InsuranceCalculator defaultProduct="pzp" lockProduct fixedInsurerId={insurer.id} />
      <Footer />
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className={`mt-1 text-2xl font-black tabular-nums ${accent ? "text-[oklch(0.5_0.15_155)]" : "text-foreground"}`}>
        {value}
      </p>
    </div>
  );
}