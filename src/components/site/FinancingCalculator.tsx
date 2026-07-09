import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Sparkles, Info, ArrowUpRight, Check, X, Minus, Plus } from "lucide-react";
import {
  providers,
  quote,
  quoteAll,
  type FinancingProduct,
  type Quote,
} from "@/data/financing";

const eur = (n: number) =>
  new Intl.NumberFormat("sk-SK", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
const eur2 = (n: number) =>
  new Intl.NumberFormat("sk-SK", { style: "currency", currency: "EUR", maximumFractionDigits: 2 }).format(n);

// Vypočíta počet mesiacov z požadovanej mesačnej splátky.
function monthsFromMonthly(amount: number, monthly: number, aprPct: number): number | null {
  const r = aprPct / 100 / 12;
  if (r === 0) return amount / monthly;
  const denom = 1 - (r * amount) / monthly;
  if (denom <= 0) return null; // splátka nižšia ako mesačný úrok
  const n = -Math.log(denom) / Math.log(1 + r);
  if (!isFinite(n) || n <= 0) return null;
  return n;
}

// Minimálna splátka pre max. dobu daného produktu — pekná referencia „od“.
function minMonthlyFor(amount: number, aprPct: number, maxMonths: number): number {
  const r = aprPct / 100 / 12;
  if (r === 0) return amount / maxMonths;
  return (amount * r) / (1 - Math.pow(1 + r, -maxMonths));
}

export function FinancingCalculator() {
  const [product, setProduct] = useState<FinancingProduct>("loan");
  const [amount, setAmount] = useState(12000);
  const [monthly, setMonthly] = useState(280);
  const [providerId, setProviderId] = useState<string>("all");

  const supported = useMemo(
    () => providers.filter((p) => p.products.includes(product)),
    [product]
  );

  // „Aktívny“ poskytovateľ, z ktorého beriem APR / limity pre výpočet mesiacov.
  const activeProvider = useMemo(() => {
    if (providerId !== "all") return supported.find((p) => p.id === providerId) ?? supported[0];
    // v režime „všetci“ zvolíme najvýhodnejšieho (najnižšie APR, ktorý sumu zvláda)
    const eligible = supported.filter((p) => {
      const cfg = product === "loan" ? p.loan : p.leasing;
      return cfg && amount >= cfg.minAmount && amount <= cfg.maxAmount;
    });
    const pool = eligible.length ? eligible : supported;
    return [...pool].sort((a, b) => {
      const ca = product === "loan" ? a.loan! : a.leasing!;
      const cb = product === "loan" ? b.loan! : b.leasing!;
      return ca.aprPct - cb.aprPct;
    })[0];
  }, [providerId, supported, product, amount]);

  const activeCfg = activeProvider
    ? product === "loan"
      ? activeProvider.loan
      : activeProvider.leasing
    : undefined;

  // Rozsahy sumy a splátky reflektujú produkt a aktívneho poskytovateľa.
  const amountMin = activeCfg?.minAmount ?? (product === "loan" ? 500 : 3000);
  const amountMax = activeCfg?.maxAmount ?? (product === "loan" ? 80000 : 200000);
  const monthlyMin = activeCfg ? Math.round(minMonthlyFor(amount, activeCfg.aprPct, activeCfg.maxMonths)) : 50;
  const monthlyMax = Math.max(monthlyMin + 20, Math.round(amount / 6));

  // Vypočítaný počet mesiacov z požadovanej splátky.
  const monthsCalc =
    activeCfg ? monthsFromMonthly(amount, monthly, activeCfg.aprPct) : null;
  const months = monthsCalc ? Math.min(Math.max(6, Math.round(monthsCalc)), activeCfg!.maxMonths) : 0;

  // Prepočet celkovej splátky pre zaokrúhlené mesiace + poplatok.
  const activeQuote: Quote | null = useMemo(() => {
    if (!activeProvider || !months) return null;
    return quote(activeProvider, product, amount, months);
  }, [activeProvider, product, amount, months]);

  const allResults = useMemo(
    () => (providerId === "all" ? quoteAll(product, amount, months || 12) : []),
    [providerId, product, amount, months]
  );
  const bestApr = Math.min(...allResults.filter((r) => r.eligible).map((r) => r.apr), 99);
  const worstApr = Math.max(...allResults.filter((r) => r.eligible).map((r) => r.apr), 0);

  return (
    <section id="kalkulacka" className="mx-auto max-w-6xl px-4 py-16">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.5_0.15_155)]">
          Kalkulačka splátok
        </p>
        <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
          Vypočítajte si splátku úveru alebo leasingu
        </h2>
        <p className="mt-3 text-muted-foreground">
          Zadajte sumu a koľko chcete mesačne splácať. Predvolene porovnávame ponuky všetkých
          {" "}{supported.length} partnerov a odporúčame najvýhodnejšieho.
        </p>
      </div>

      {/* Ovládače: produkt + poskytovateľ */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <div className="grid grid-cols-2 rounded-xl border border-border bg-muted p-1">
          {(["loan", "leasing"] as const).map((k) => (
            <button
              key={k}
              onClick={() => setProduct(k)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                product === k
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {k === "loan" ? "Úver" : "Leasing"}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Poskytovateľ
          </label>
          <select
            value={providerId}
            onChange={(e) => setProviderId(e.target.value)}
            className="rounded-xl border border-input bg-background px-3 py-2 text-sm font-medium text-foreground"
          >
            <option value="all">✨ Všetky (najlepšia ponuka)</option>
            {supported.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Hlavná karta kalkulačky — 2 stĺpce */}
      <div className="mt-6 overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
        <div className="grid gap-0 md:grid-cols-[1.4fr_1fr]">
          {/* Ľavá časť: inputy */}
          <div className="p-6 sm:p-8">
            <SliderField
              label={<>Vyberte <strong>výšku {product === "loan" ? "pôžičky" : "financovania"}</strong></>}
              value={amount}
              min={amountMin}
              max={amountMax}
              step={100}
              format={eur}
              onChange={setAmount}
            />

            <div className="mt-8">
              <SliderField
                label={<>Vyberte <strong>koľko chcete splácať</strong></>}
                value={Math.min(Math.max(monthly, monthlyMin), monthlyMax)}
                min={monthlyMin}
                max={monthlyMax}
                step={5}
                format={(n) => eur(n)}
                onChange={setMonthly}
              />
            </div>
          </div>

          {/* Pravá časť: sumár */}
          <div className="border-t border-border bg-muted/60 p-6 sm:p-8 md:border-l md:border-t-0">
            <SummaryRow
              label={product === "loan" ? "Pôžička" : "Leasing"}
              value={eur(amount)}
            />
            <SummaryRow
              label="Splátka"
              value={activeQuote ? eur2(activeQuote.monthly) : "—"}
              strong
            />
            <SummaryRow
              label="Minimálna splátka"
              hint="Pri maximálnej dobe splácania u vybraného poskytovateľa."
              value={activeCfg ? eur2(minMonthlyFor(amount, activeCfg.aprPct, activeCfg.maxMonths)) : "—"}
              accent
            />
            <SummaryRow
              label="Doba splácania"
              value={months ? `${months} mesiacov` : "—"}
            />
            <SummaryRow
              label="Celkom zaplatíte"
              hint="Súčet všetkých splátok a poplatku za spracovanie."
              value={activeQuote ? eur2(activeQuote.total) : "—"}
              strong
            />

            {activeProvider && activeQuote?.eligible ? (
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 rounded-xl bg-background/80 p-3 text-xs text-muted-foreground">
                  <span
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-[10px] font-black text-white"
                    style={{ background: activeProvider.brandColor }}
                  >
                    {activeProvider.short.slice(0, 2).toUpperCase()}
                  </span>
                  <span>
                    Ponuka <strong className="text-foreground">{activeProvider.name}</strong> · APR{" "}
                    <strong className="text-foreground">{activeQuote.apr}%</strong>
                  </span>
                </div>
                <a
                  href={activeProvider.calculatorUrl ?? activeProvider.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[oklch(0.55_0.17_150)] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:opacity-95"
                >
                  Požiadať online <ArrowUpRight className="h-4 w-4" />
                </a>
                <p className="text-center text-xs text-muted-foreground">Výpočet je orientačný.</p>
              </div>
            ) : (
              <div className="mt-6 rounded-xl border border-dashed border-border bg-background/60 p-3 text-xs text-muted-foreground">
                {activeQuote?.reason ?? "Upravte sumu alebo splátku pre platnú ponuku."}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Porovnanie všetkých poskytovateľov (režim „Všetky“) */}
      {providerId === "all" && (
        <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[oklch(0.94_0.06_150)] px-3 py-1 text-xs font-semibold text-[oklch(0.4_0.15_155)]">
                <Sparkles className="h-3.5 w-3.5" /> Porovnanie {allResults.length} partnerov
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Pri dobe <strong className="text-foreground">{months || "—"} mes.</strong> a sume{" "}
                <strong className="text-foreground">{eur(amount)}</strong>. Zoradené od najvýhodnejšej ponuky.
              </p>
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {allResults.map((r, i) => (
              <ResultRow key={r.provider.id} q={r} rank={i + 1} bestApr={bestApr} worstApr={worstApr} />
            ))}
          </div>
        </div>
      )}

      <p className="mt-5 flex items-start gap-2 text-[11px] leading-relaxed text-muted-foreground">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        Uvedené hodnoty sú <strong>orientačné</strong> a slúžia len na porovnanie. Nejde o záväznú
        ponuku ani schválenie financovania. Skutočné podmienky určuje konkrétny poskytovateľ na
        základe posúdenia bonity, príjmu, veku a ďalších kritérií. nCc nie je finančný sprostredkovateľ.
      </p>
    </section>
  );
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: {
  label: React.ReactNode;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (n: number) => string;
  onChange: (n: number) => void;
}) {
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-foreground">{label}</p>
        <div className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-1 py-1">
          <button
            type="button"
            onClick={() => onChange(clamp(value - step))}
            className="grid h-7 w-7 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Znížiť"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="min-w-[84px] text-center text-sm font-bold text-foreground">
            {format(value)}
          </span>
          <button
            type="button"
            onClick={() => onChange(clamp(value + step))}
            className="grid h-7 w-7 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Zvýšiť"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-[oklch(0.55_0.17_150)]"
      />
      <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  hint,
  strong,
  accent,
}: {
  label: string;
  value: string;
  hint?: string;
  strong?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-border/60 py-3 last:border-b-0">
      <div className="flex items-center gap-1.5">
        <span className="text-sm text-foreground">{label}</span>
        {hint && (
          <span title={hint} className="cursor-help text-muted-foreground">
            <Info className="h-3.5 w-3.5" />
          </span>
        )}
      </div>
      <span
        className={`text-right ${strong ? "text-lg font-black" : "text-sm font-semibold"} ${
          accent ? "text-[oklch(0.55_0.17_150)]" : "text-foreground"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function ResultRow({
  q,
  rank,
  bestApr,
  worstApr,
}: {
  q: Quote;
  rank: number;
  bestApr: number;
  worstApr: number;
}) {
  const range = Math.max(1, worstApr - bestApr);
  const barPct = q.eligible ? Math.max(6, 100 - ((q.apr - bestApr) / range) * 100) : 0;
  return (
    <div
      className={`rounded-2xl border p-4 transition ${
        q.eligible
          ? rank === 1
            ? "border-[oklch(0.7_0.15_150)] bg-[oklch(0.97_0.03_150)]"
            : "border-border bg-background"
          : "border-dashed border-border bg-muted/40 opacity-70"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="grid h-10 w-10 place-items-center rounded-xl text-xs font-black text-white"
            style={{ background: q.provider.brandColor }}
          >
            {q.provider.short.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-foreground">{q.provider.name}</p>
              {rank === 1 && q.eligible && (
                <span className="rounded-full bg-[oklch(0.7_0.15_150)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  Najlepšie
                </span>
              )}
              {!q.eligible && (
                <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <X className="h-3 w-3" /> Nedostupné
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              APR {q.apr}% ·{" "}
              <Link
                to="/financovanie/$provider"
                params={{ provider: q.provider.id }}
                className="underline decoration-dotted underline-offset-2 hover:text-foreground"
              >
                detail
              </Link>
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Splátka
          </p>
          <p className="text-lg font-black leading-none text-foreground">
            {q.eligible ? eur2(q.monthly) : "—"}
          </p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">/ mesiac</p>
        </div>
      </div>

      {q.eligible ? (
        <>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[oklch(0.7_0.18_150)] to-[oklch(0.5_0.15_155)] transition-all duration-500"
              style={{ width: `${barPct}%` }}
            />
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2 text-[11px]">
            <Info2 label="Celkom" value={eur2(q.total)} />
            <Info2 label="Preplatok" value={eur2(q.totalInterest)} />
            <Info2 label="Naše skóre" value={`${q.score}/100`} />
          </div>
        </>
      ) : (
        <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <Check className="h-3.5 w-3.5" /> {q.reason}
        </p>
      )}

      <a
        href={q.provider.calculatorUrl ?? q.provider.homepage}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[oklch(0.45_0.15_155)] hover:underline"
      >
        Otvoriť u poskytovateľa <ArrowUpRight className="h-3 w-3" />
      </a>
    </div>
  );
}

function Info2({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-muted/60 px-2.5 py-1.5">
      <p className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p className="text-xs font-bold text-foreground">{value}</p>
    </div>
  );
}