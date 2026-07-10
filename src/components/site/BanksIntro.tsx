import { Link } from "@tanstack/react-router";
import { Landmark, ShieldCheck, ArrowRight } from "lucide-react";
import { providers } from "@/data/financing";

export function BanksIntro() {
  const banks = providers.filter((p) => p.kind === "bank").slice(0, 6);
  const leasings = providers.filter((p) => p.kind === "leasing" || p.kind === "nonbank");
  return (
    <section className="relative overflow-hidden py-20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-64 w-64 opacity-20 [background:radial-gradient(circle,oklch(0.22_0.05_255/0.06),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.78_0.19_145)]/20 bg-[oklch(0.78_0.19_145)]/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[oklch(0.5_0.15_155)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.19_145)]" />
              Financovanie s dôveryhodnými partnermi
            </p>
            <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
              Overené banky a leasingové spoločnosti na Slovensku
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
              Spolupracujeme s licencovanými bankami a leasingovými spoločnosťami. Každá má svoju
              vlastnú detailnú stránku so sadzbami, kalkulačkou a linkami na oficiálne zdroje.
            </p>
          </div>
          <Link
            to="/financovanie"
            className="inline-flex items-center gap-1.5 rounded-xl border border-border/60 bg-gradient-to-r from-card to-card/80 px-5 py-3 text-sm font-semibold text-foreground shadow-[var(--shadow-elegant)] transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Zobraziť všetkých partnerov <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...banks, ...leasings.slice(0, 3)].map((p) => (
            <Link
              key={p.id}
              to="/financovanie/$provider"
              params={{ provider: p.id }}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_oklch(0.22_0.05_255/0.25)]"
            >
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[oklch(0.78_0.19_145)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="flex items-center gap-3">
                <div
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-xs font-black text-white shadow-sm"
                  style={{ background: p.brandColor }}
                >
                  {p.short.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-foreground truncate">{p.name}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {p.kind === "bank" ? "Banka" : p.kind === "leasing" ? "Leasing" : "Nebanková"}
                  </p>
                </div>
                <span className="ml-auto grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-border/60 text-muted-foreground transition-all group-hover:border-[oklch(0.78_0.19_145)]/30 group-hover:text-foreground">
                  <Landmark className="h-3.5 w-3.5" />
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-2">{p.tagline}</p>

              <div className="mt-3 flex gap-0.5">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="h-0.5 flex-1 rounded-full bg-muted transition-colors group-hover:bg-[oklch(0.78_0.19_145)]/20"
                  />
                ))}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 inline-flex items-center gap-2.5 rounded-xl border border-border/50 bg-background/60 px-4 py-2.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
          <ShieldCheck className="h-4 w-4 text-[oklch(0.5_0.15_155)]" />
          Všetci uvedení partneri majú platnú licenciu NBS alebo príslušného regulátora v EÚ.
        </div>
      </div>
    </section>
  );
}