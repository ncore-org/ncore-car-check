import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ShieldCheck, Activity, TrendingDown, ChevronRight, Zap } from "lucide-react";
import {
  quoteAllInsurance,
  defaultInsuranceInput,
  type InsuranceQuoteInput,
  type InsuranceProduct,
} from "@/data/insurance";

const eur = (n: number) =>
  new Intl.NumberFormat("sk-SK", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

/**
 * Marketingová „dashboard“ sekcia na homepage — animovaný náhľad
 * porovnania cien PZP + havarijného poistenia, s CTA na plné kalkulačky.
 */
export function InsuranceHomeSection() {
  const [product, setProduct] = useState<InsuranceProduct>("pzp");

  const input: InsuranceQuoteInput = useMemo(
    () => ({ ...defaultInsuranceInput, product }),
    [product]
  );
  const quotes = useMemo(() => quoteAllInsurance(input).filter((q) => q.eligible), [input]);
  const cheapest = quotes[0]?.annual ?? 0;
  const priciest = quotes[quotes.length - 1]?.annual ?? 0;
  const savings = Math.max(0, priciest - cheapest);
  const avg = quotes.length ? Math.round(quotes.reduce((s, q) => s + q.annual, 0) / quotes.length) : 0;

  const bestCount = quotes.length;

  return (
    <section id="poistenie" className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-[oklch(0.98_0.02_150)] to-background" />
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_15%_20%,oklch(0.9_0.1_150),transparent_40%),radial-gradient(circle_at_85%_80%,oklch(0.9_0.05_260),transparent_50%)]" />
      <div className="pointer-events-none absolute -right-40 top-20 h-80 w-80 opacity-20 [background:radial-gradient(circle,oklch(0.78_0.19_145/0.05),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.78_0.19_145)]/20 bg-[oklch(0.78_0.19_145)]/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[oklch(0.5_0.15_155)]">
              <Zap className="h-3.5 w-3.5" /> Nové v nCc
            </span>
            <h2 className="mt-4 text-3xl font-black leading-tight text-foreground sm:text-4xl">
              Poistenie auta.<br />
              <span className="text-[oklch(0.5_0.15_155)]">Porovnanie 11 poisťovní</span> za pár sekúnd.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
              PZP aj havarijné poistenie. Zadáte vek, výkon, rok výroby, kraj a pohon —
              spočítame vám ročné poistné podľa reálnych sadzobných pravidiel a povieme,
              kde ušetríte najviac.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:max-w-md">
              <StatCard
                icon={ShieldCheck}
                label="Overené poisťovne"
                value={<Count target={bestCount} suffix="" />}
              />
              <StatCard
                icon={TrendingDown}
                label="Priem. úspora / rok"
                value={<Count target={savings} suffix=" €" />}
                accent
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/pzp"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[oklch(0.22_0.05_255)] to-[oklch(0.28_0.07_250)] px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-black/10 transition-all hover:shadow-lg hover:shadow-black/15 hover:brightness-110"
              >
                Kalkulačka PZP <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                to="/havarijne"
                className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-background/80 px-6 py-3.5 text-sm font-bold text-foreground shadow-[var(--shadow-elegant)] transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                Havarijné poistenie <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Live dashboard */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card to-muted/30 p-5 shadow-[0_20px_60px_-20px_oklch(0.22_0.05_255/0.15)]">
              <div className="pointer-events-none absolute -right-20 -top-20 h-32 w-32 rounded-full bg-[oklch(0.78_0.19_145)]/5 blur-2xl" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 rounded-lg border border-border/40 bg-background/50 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground backdrop-blur">
                    <Activity className="h-3 w-3 animate-pulse text-[oklch(0.55_0.17_150)]" />
                    LIVE porovnanie
                  </div>
                  <div className="grid grid-cols-2 rounded-lg border border-border bg-muted p-0.5 text-[11px]">
                    {(["pzp", "havarijne"] as const).map((k) => (
                      <button
                        key={k}
                        onClick={() => setProduct(k)}
                        className={`rounded-md px-3 py-1.5 font-bold transition ${
                          product === k
                            ? "bg-background text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {k === "pzp" ? "PZP" : "Havarijné"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <MiniStat label="Najlacnejšie" value={cheapest} highlight />
                  <MiniStat label="Priemer" value={avg} />
                  <MiniStat label="Najdrahšie" value={priciest} />
                </div>

                <div className="mt-5">
                  <p className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                    Ročné poistné — {product === "pzp" ? "PZP" : "Havarijné"}
                    <span className="h-1 w-1 rounded-full bg-[oklch(0.55_0.17_150)]" />
                  </p>
                  <div className="space-y-2">
                    {quotes.slice(0, 6).map((q) => {
                      const w = priciest > cheapest
                        ? Math.max(10, 100 - ((q.annual - cheapest) / (priciest - cheapest)) * 90)
                        : 100;
                      return (
                        <div key={q.insurer.id} className="group flex items-center gap-2.5">
                          <span className="w-24 shrink-0 text-[11px] font-semibold text-foreground/80 group-hover:text-foreground transition-colors">
                            {q.insurer.short}
                          </span>
                          <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-[oklch(0.7_0.18_150)] via-[oklch(0.72_0.15_120)] to-[oklch(0.55_0.17_150)] transition-all duration-700 ease-out"
                              style={{ width: `${w}%` }}
                            />
                          </div>
                          <span className="w-16 shrink-0 text-right text-[11px] font-black tabular-nums text-foreground">
                            {eur(q.annual)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <p className="mt-4 text-[10px] leading-snug text-muted-foreground/70">
                  Modelový výpočet pre 35-ročného vodiča, 110 kW benzín, Bratislavský kraj, 15 000 km/rok.
                  Pre presnú ponuku otvorte kalkulačku.
                </p>
              </div>
            </div>

            {/* Floating badge */}
            <div className="pointer-events-none absolute -right-3 -top-3 hidden rounded-full bg-gradient-to-r from-[oklch(0.55_0.17_150)] to-[oklch(0.45_0.15_160)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg sm:block">
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                Aktualizované
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  icon: Icon, label, value, accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string; value: React.ReactNode; accent?: boolean;
}) {
  return (
    <div className={`rounded-xl border border-border bg-background/80 p-3 backdrop-blur ${accent ? "ring-1 ring-[oklch(0.7_0.15_150)]" : ""}`}>
      <Icon className={`h-4 w-4 ${accent ? "text-[oklch(0.5_0.15_155)]" : "text-muted-foreground"}`} />
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={`mt-0.5 text-xl font-black tabular-nums ${accent ? "text-[oklch(0.5_0.15_155)]" : "text-foreground"}`}>
        {value}
      </p>
    </div>
  );
}

function MiniStat({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className={`rounded-lg px-2.5 py-2 ${highlight ? "bg-[oklch(0.96_0.04_150)]" : "bg-muted/50"}`}>
      <p className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className={`mt-0.5 text-sm font-black tabular-nums ${highlight ? "text-[oklch(0.4_0.15_155)]" : "text-foreground"}`}>
        <Count target={value} suffix=" €" />
      </p>
    </div>
  );
}

/** Jednoduchý animovaný počítač, ktorý plynule prejde od 0 (alebo predch. hodnoty) k cieľu. */
function Count({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [v, setV] = useState(target);
  const prev = useRef(target);
  useEffect(() => {
    const start = prev.current;
    const delta = target - start;
    const duration = 600;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(start + delta * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
      else prev.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return <>{v.toLocaleString("sk-SK")}{suffix}</>;
}