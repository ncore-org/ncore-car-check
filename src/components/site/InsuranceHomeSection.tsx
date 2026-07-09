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
    <section id="poistenie" className="relative overflow-hidden bg-[oklch(0.98_0.02_150)] py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_15%_20%,oklch(0.9_0.1_150),transparent_40%),radial-gradient(circle_at_85%_80%,oklch(0.9_0.05_260),transparent_50%)]" />
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="grid gap-10 md:grid-cols-[1.05fr_1fr] md:items-center">
          {/* Copy */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[oklch(0.94_0.06_150)] px-3 py-1 text-xs font-semibold text-[oklch(0.4_0.15_155)]">
              <Zap className="h-3.5 w-3.5" /> Nové v nCc
            </span>
            <h2 className="mt-4 text-3xl font-black leading-tight text-foreground sm:text-4xl">
              Poistenie auta.<br />
              <span className="text-[oklch(0.5_0.15_155)]">Porovnanie 11 poisťovní</span> za pár sekúnd.
            </h2>
            <p className="mt-4 max-w-lg text-muted-foreground">
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
                className="inline-flex items-center gap-1 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-brand-foreground shadow-sm hover:opacity-95"
              >
                Kalkulačka PZP <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                to="/havarijne"
                className="inline-flex items-center gap-1 rounded-xl border border-border bg-background px-5 py-3 text-sm font-bold text-foreground shadow-sm hover:bg-muted"
              >
                Havarijné poistenie <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Live dashboard */}
          <div className="relative">
            <div className="rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-elegant)]">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                  <Activity className="h-3.5 w-3.5 animate-pulse text-[oklch(0.55_0.17_150)]" />
                  LIVE porovnanie
                </div>
                <div className="grid grid-cols-2 rounded-lg border border-border bg-muted p-0.5 text-[11px]">
                  {(["pzp", "havarijne"] as const).map((k) => (
                    <button
                      key={k}
                      onClick={() => setProduct(k)}
                      className={`rounded px-3 py-1 font-bold transition ${
                        product === k ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
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

              {/* Sparkline / bar chart */}
              <div className="mt-5">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Ročné poistné (modelové) — {product === "pzp" ? "PZP" : "Havarijné"}
                </p>
                <div className="space-y-2">
                  {quotes.slice(0, 6).map((q) => {
                    const w = priciest > cheapest
                      ? Math.max(10, 100 - ((q.annual - cheapest) / (priciest - cheapest)) * 90)
                      : 100;
                    return (
                      <div key={q.insurer.id} className="flex items-center gap-2">
                        <span className="w-24 shrink-0 text-[11px] font-semibold text-foreground">
                          {q.insurer.short}
                        </span>
                        <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
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

              <p className="mt-4 text-[10px] leading-snug text-muted-foreground">
                Modelový výpočet pre 35-ročného vodiča, 110 kW benzín, Bratislavský kraj, 15 000 km/rok.
                Pre presnú ponuku otvorte kalkulačku.
              </p>
            </div>

            {/* Floating badge */}
            <div className="pointer-events-none absolute -right-3 -top-3 hidden rounded-full bg-[oklch(0.55_0.17_150)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg sm:block">
              Aktualizované
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