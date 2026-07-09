import { Link } from "@tanstack/react-router";
import { Landmark, ShieldCheck, ArrowRight } from "lucide-react";
import { providers } from "@/data/financing";

export function BanksIntro() {
  const banks = providers.filter((p) => p.kind === "bank").slice(0, 6);
  const leasings = providers.filter((p) => p.kind === "leasing" || p.kind === "nonbank");
  return (
    <section className="bg-secondary/40 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.5_0.15_155)]">
              Financovanie s dôveryhodnými partnermi
            </p>
            <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
              Overené banky a leasingové spoločnosti na Slovensku
            </h2>
            <p className="mt-3 text-muted-foreground">
              Spolupracujeme s licencovanými bankami a leasingovými spoločnosťami. Každá má svoju
              vlastnú detailnú stránku so sadzbami, kalkulačkou a linkami na oficiálne zdroje.
            </p>
          </div>
          <Link
            to="/financovanie"
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm transition hover:bg-secondary"
          >
            Zobraziť všetkých partnerov <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[...banks, ...leasings.slice(0, 3)].map((p) => (
            <Link
              key={p.id}
              to="/financovanie/$provider"
              params={{ provider: p.id }}
              className="group rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div
                  className="grid h-10 w-10 place-items-center rounded-xl text-xs font-black text-white"
                  style={{ background: p.brandColor }}
                >
                  {p.short.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{p.name}</p>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    {p.kind === "bank" ? "Banka" : p.kind === "leasing" ? "Leasing" : "Nebanková"}
                  </p>
                </div>
                <Landmark className="ml-auto h-4 w-4 text-muted-foreground transition group-hover:text-foreground" />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{p.tagline}</p>
            </Link>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-[oklch(0.5_0.15_155)]" />
          Všetci uvedení partneri majú platnú licenciu NBS alebo príslušného regulátora v EÚ.
        </div>
      </div>
    </section>
  );
}