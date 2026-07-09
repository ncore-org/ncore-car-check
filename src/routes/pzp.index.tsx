import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { InsuranceCalculator } from "@/components/site/InsuranceCalculator";
import { insurers } from "@/data/insurance";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/pzp/")({
  head: () => ({
    meta: [
      { title: "PZP kalkulačka — Povinné zmluvné poistenie auta | nCc" },
      {
        name: "description",
        content:
          "Porovnajte PZP od 11 slovenských poisťovní. Zadajte vek, výkon, rok výroby a kraj — vypočítame ročné poistné podľa reálnych sadzobných pravidiel.",
      },
      { property: "og:title", content: "PZP kalkulačka | nCc" },
      { property: "og:description", content: "Povinné zmluvné poistenie — 11 poisťovní na jeden klik." },
    ],
  }),
  component: PzpIndexPage,
});

function PzpIndexPage() {
  const pzpInsurers = insurers.filter((i) => i.products.includes("pzp"));
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_10%,white,transparent_40%),radial-gradient(circle_at_80%_60%,oklch(0.78_0.19_145),transparent_50%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            <ShieldCheck className="h-3.5 w-3.5" /> PZP kalkulačka
          </span>
          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl">
            Povinné zmluvné poistenie <span className="text-[oklch(0.85_0.18_145)]">na 60 sekúnd</span>.
          </h1>
          <p className="mt-4 max-w-2xl text-white/85">
            Zákonná povinnosť pre každé vozidlo. Porovnajte {pzpInsurers.length} poisťovní naraz
            a uzavrite zmluvu online s najnižším ročným poistným.
          </p>
        </div>
      </section>

      <InsuranceCalculator defaultProduct="pzp" lockProduct />

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold sm:text-3xl">Poisťovne ponúkajúce PZP</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pzpInsurers.map((i) => (
            <Link
              key={i.id}
              to="/pzp/$insurer"
              params={{ insurer: i.id }}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div
                  className="grid h-11 w-11 place-items-center rounded-xl text-sm font-black text-white"
                  style={{ background: i.brandColor }}
                >
                  {i.short.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{i.name}</p>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    Krytie {i.pzp?.coverageHealth} mil. €
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{i.tagline}</p>
              <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-[oklch(0.45_0.15_155)] group-hover:underline">
                Otvoriť profil <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}