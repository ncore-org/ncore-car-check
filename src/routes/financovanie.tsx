import { createFileRoute, Link } from "@tanstack/react-router";
import { Landmark, ArrowRight, ShieldCheck } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { providers } from "@/data/financing";

export const Route = createFileRoute("/financovanie")({
  head: () => ({
    meta: [
      { title: "Financovanie auta — banky a leasingovky | nCc" },
      {
        name: "description",
        content:
          "Prehľad bánk a leasingových spoločností pôsobiacich na Slovensku. Sadzby, kalkulačky a oficiálne zdroje na jednom mieste.",
      },
      { property: "og:title", content: "Financovanie auta — banky a leasingovky | nCc" },
      {
        property: "og:description",
        content: "Sadzby, kalkulačky a oficiálne zdroje bánk a leasingoviek na jednom mieste.",
      },
    ],
  }),
  component: FinancovanieIndexPage,
});

function FinancovanieIndexPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <FinancovanieIndex />
      <Footer />
    </div>
  );
}

function FinancovanieIndex() {
  const banks = providers.filter((p) => p.kind === "bank");
  const leasings = providers.filter((p) => p.kind === "leasing");
  const nonbanks = providers.filter((p) => p.kind === "nonbank");

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_10%,white,transparent_40%),radial-gradient(circle_at_80%_60%,oklch(0.78_0.19_145),transparent_50%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            <Landmark className="h-3.5 w-3.5" /> Financovanie
          </span>
          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl">
            Banky a leasingovky na Slovensku, ktorým rozumieme.
          </h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Prehľad {providers.length} overených partnerov. Každý má svoj profil so sadzbami,
            kalkulačkou a linkami na oficiálne dokumenty.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs text-white/80">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1">
              <ShieldCheck className="h-3.5 w-3.5" /> Licencia NBS / EÚ
            </span>
            <Link
              to="/"
              hash="kalkulacka"
              className="rounded-full bg-white px-3 py-1 font-semibold text-foreground hover:bg-white/90"
            >
              Otvoriť kalkulačku
            </Link>
          </div>
        </div>
      </section>

      <Group title="Banky" items={banks} />
      <Group title="Leasingové spoločnosti" items={leasings} />
      <Group title="Nebankoví poskytovatelia" items={nonbanks} />
    </main>
  );
}

function Group({ title, items }: { title: string; items: typeof providers }) {
  if (items.length === 0) return null;
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="text-2xl font-bold text-foreground sm:text-3xl">{title}</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <Link
            key={p.id}
            to="/financovanie/$provider"
            params={{ provider: p.id }}
            className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div
                className="grid h-11 w-11 place-items-center rounded-xl text-sm font-black text-white"
                style={{ background: p.brandColor }}
              >
                {p.short.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-foreground">{p.name}</p>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  {p.products.map((x) => (x === "loan" ? "Úver" : "Leasing")).join(" · ")}
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{p.tagline}</p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-[oklch(0.45_0.15_155)] group-hover:underline">
              Otvoriť profil <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}