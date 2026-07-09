import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ShieldCheck, Sparkles, ArrowUpRight, Info, Check, X, Car, Zap, User, MapPin, Gauge,
} from "lucide-react";
import {
  insurers,
  regions,
  fuelLabels,
  usageLabels,
  quoteAllInsurance,
  quoteInsurance,
  defaultInsuranceInput,
  type FuelType,
  type InsuranceProduct,
  type InsuranceQuote,
  type InsuranceQuoteInput,
  type RegionCode,
  type VehicleUsage,
} from "@/data/insurance";

const eur = (n: number) =>
  new Intl.NumberFormat("sk-SK", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
const eur2 = (n: number) =>
  new Intl.NumberFormat("sk-SK", { style: "currency", currency: "EUR", maximumFractionDigits: 2 }).format(n);

export function InsuranceCalculator({
  defaultProduct = "pzp",
  lockProduct = false,
  fixedInsurerId,
  compact = false,
}: {
  defaultProduct?: InsuranceProduct;
  lockProduct?: boolean;
  fixedInsurerId?: string;
  compact?: boolean;
}) {
  const [input, setInput] = useState<InsuranceQuoteInput>({
    ...defaultInsuranceInput,
    product: defaultProduct,
  });

  const update = <K extends keyof InsuranceQuoteInput>(k: K, v: InsuranceQuoteInput[K]) =>
    setInput((prev) => ({ ...prev, [k]: v }));

  const all = useMemo(() => quoteAllInsurance(input), [input]);
  const best = all.find((q) => q.eligible);
  const fixed = fixedInsurerId
    ? insurers.find((i) => i.id === fixedInsurerId)
    : undefined;
  const fixedQuote = fixed ? quoteInsurance(fixed, input) : undefined;

  const shown = fixedQuote ?? best;
  const cheapest = Math.min(...all.filter((q) => q.eligible).map((q) => q.annual), Infinity);
  const priciest = Math.max(...all.filter((q) => q.eligible).map((q) => q.annual), 0);

  return (
    <section id="poistenie-kalkulacka" className={compact ? "py-4" : "mx-auto max-w-6xl px-4 py-16"}>
      {!compact && (
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.5_0.15_155)]">
            Poistenie vozidla
          </p>
          <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
            Kalkulačka {input.product === "pzp" ? "povinného zmluvného poistenia" : "havarijného poistenia"}
          </h2>
          <p className="mt-3 text-muted-foreground">
            Zadajte parametre vozidla a vodiča. Porovnáme ponuky {insurers.filter(i => i.products.includes(input.product)).length}
            {" "}poisťovní naraz a odporúčame najvýhodnejšiu.
          </p>
        </div>
      )}

      {/* Prepínač produktu */}
      {!lockProduct && (
        <div className={compact ? "flex flex-wrap items-center gap-3" : "mt-8 flex flex-wrap items-center gap-3"}>
          <div className="grid grid-cols-2 rounded-xl border border-border bg-muted p-1">
            {(["pzp", "havarijne"] as const).map((k) => (
              <button
                key={k}
                onClick={() => update("product", k)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  input.product === k
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {k === "pzp" ? "PZP" : "Havarijné"}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={`${compact ? "" : "mt-6"} overflow-hidden rounded-3xl border border-border bg-card shadow-sm`}>
        <div className="grid gap-0 md:grid-cols-[1.4fr_1fr]">
          {/* Vstupy */}
          <div className="p-6 sm:p-8 space-y-6">
            <Group icon={User} label="Vodič">
              <Field label="Vek vodiča">
                <NumInput value={input.driverAge} min={18} max={90}
                  onChange={(v) => update("driverAge", v)} suffix="rokov" />
              </Field>
              <Field label="Roky s vodičákom">
                <NumInput value={input.drivingYears} min={0} max={70}
                  onChange={(v) => update("drivingYears", v)} suffix="r." />
              </Field>
              <Field label="Roky bez nehody (bonus)">
                <NumInput value={input.bonusYears} min={0} max={20}
                  onChange={(v) => update("bonusYears", v)} suffix="r." />
              </Field>
              <Field label={<><MapPin className="inline h-3 w-3" /> Kraj</>}>
                <select value={input.region}
                  onChange={(e) => update("region", e.target.value as RegionCode)}
                  className="w-full rounded-md border border-input bg-background px-2.5 py-2 text-sm">
                  {regions.map((r) => (<option key={r.code} value={r.code}>{r.label}</option>))}
                </select>
              </Field>
            </Group>

            <Group icon={Car} label="Vozidlo">
              <Field label="Rok výroby">
                <NumInput value={input.vehicleYear} min={1990} max={new Date().getFullYear() + 1}
                  onChange={(v) => update("vehicleYear", v)} />
              </Field>
              <Field label="Výkon (kW)">
                <NumInput value={input.kw} min={30} max={800}
                  onChange={(v) => update("kw", v)} suffix="kW" />
              </Field>
              <Field label="Objem (ccm)">
                <NumInput value={input.ccm} min={0} max={8000} step={50}
                  onChange={(v) => update("ccm", v)} suffix="cm³" />
              </Field>
              <Field label={<><Zap className="inline h-3 w-3" /> Pohon</>}>
                <select value={input.fuel}
                  onChange={(e) => update("fuel", e.target.value as FuelType)}
                  className="w-full rounded-md border border-input bg-background px-2.5 py-2 text-sm">
                  {Object.entries(fuelLabels).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
              </Field>
              <Field label={<><Gauge className="inline h-3 w-3" /> Nájazd / rok</>}>
                <NumInput value={input.annualKm} min={2000} max={100000} step={1000}
                  onChange={(v) => update("annualKm", v)} suffix="km" />
              </Field>
              <Field label="Použitie">
                <select value={input.usage}
                  onChange={(e) => update("usage", e.target.value as VehicleUsage)}
                  className="w-full rounded-md border border-input bg-background px-2.5 py-2 text-sm">
                  {Object.entries(usageLabels).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
              </Field>
            </Group>

            {input.product === "havarijne" && (
              <>
                <Group icon={ShieldCheck} label="Hodnota vozidla & pripoistenia">
                  <Field label="Aktuálna trhová hodnota">
                    <NumInput value={input.vehicleValue} min={0} max={300000} step={500}
                      onChange={(v) => update("vehicleValue", v)} suffix="€" />
                  </Field>
                </Group>
                <div className="grid grid-cols-2 gap-2">
                  <Toggle checked={!!input.addonGlass}
                    onChange={(v) => update("addonGlass", v)} label="Sklá" />
                  <Toggle checked={!!input.addonAnimal}
                    onChange={(v) => update("addonAnimal", v)} label="Zver na ceste" />
                  <Toggle checked={!!input.addonNaturalDisaster}
                    onChange={(v) => update("addonNaturalDisaster", v)} label="Živly (víchor, krupobitie)" />
                  <Toggle checked={!!input.addonTheft}
                    onChange={(v) => update("addonTheft", v)} label="Krádež & vandalizmus" />
                </div>
              </>
            )}
          </div>

          {/* Výsledok — dashboard */}
          <div className="border-t border-border bg-muted/60 p-6 sm:p-8 md:border-l md:border-t-0">
            {shown ? (
              <ResultDashboard q={shown} cheapest={cheapest} priciest={priciest} />
            ) : (
              <div className="text-sm text-muted-foreground">Upravte parametre pre ponuku.</div>
            )}
          </div>
        </div>
      </div>

      {/* Porovnanie všetkých poisťovní */}
      {!fixedInsurerId && (
        <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="inline-flex items-center gap-2 rounded-full bg-[oklch(0.94_0.06_150)] px-3 py-1 text-xs font-semibold text-[oklch(0.4_0.15_155)]">
            <Sparkles className="h-3.5 w-3.5" /> Porovnanie {all.length} poisťovní
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {all.map((q, i) => (
              <ResultRow key={q.insurer.id} q={q} rank={i + 1} cheapest={cheapest} priciest={priciest} />
            ))}
          </div>
        </div>
      )}

      <p className="mt-5 flex items-start gap-2 text-[11px] leading-relaxed text-muted-foreground">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        Výpočet je <strong>orientačný</strong> podľa modelového sadzobníka. Skutočné poistné určuje
        poisťovňa na základe posúdenia rizika (bonus/malus, škodovosť, technický stav vozidla).
        nCc nie je finančný sprostredkovateľ.
      </p>
    </section>
  );

  function eur0(n: number) { return eur(n); }
  void eur0;
}

/* ---------- UI atómy ---------- */

function Group({
  icon: Icon, label, children,
}: { icon: React.ComponentType<{ className?: string }>; label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3.5 w-3.5" /> {label}
      </p>
      <div className="grid grid-cols-2 gap-3">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function NumInput({
  value, onChange, min, max, step = 1, suffix,
}: {
  value: number; onChange: (v: number) => void;
  min: number; max: number; step?: number; suffix?: string;
}) {
  return (
    <div className="flex items-center gap-1 rounded-md border border-input bg-background px-2.5 py-1.5">
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (!Number.isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
        }}
        className="w-full bg-transparent text-sm font-semibold text-foreground outline-none"
      />
      {suffix && <span className="text-[11px] text-muted-foreground">{suffix}</span>}
    </div>
  );
}

function Toggle({
  checked, onChange, label,
}: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm transition ${
        checked
          ? "border-[oklch(0.6_0.15_155)] bg-[oklch(0.96_0.04_150)] text-foreground"
          : "border-border bg-background text-muted-foreground hover:border-muted-foreground/40"
      }`}
    >
      <span className="font-medium">{label}</span>
      <span
        className={`grid h-4 w-4 place-items-center rounded border ${
          checked ? "border-[oklch(0.5_0.15_155)] bg-[oklch(0.55_0.17_150)] text-white" : "border-muted-foreground/40"
        }`}
      >
        {checked && <Check className="h-3 w-3" />}
      </span>
    </button>
  );
}

/* ---------- Result dashboard ---------- */

function ResultDashboard({
  q, cheapest, priciest,
}: { q: InsuranceQuote; cheapest: number; priciest: number }) {
  const savings = q.eligible && priciest > 0 ? Math.max(0, priciest - q.annual) : 0;
  const pctOfMax = q.eligible && priciest > 0 ? Math.round((q.annual / priciest) * 100) : 0;

  return (
    <div>
      <div className="flex items-center gap-2">
        <span
          className="grid h-9 w-9 place-items-center rounded-lg text-xs font-black text-white"
          style={{ background: q.insurer.brandColor }}
        >
          {q.insurer.short.slice(0, 2).toUpperCase()}
        </span>
        <div>
          <p className="text-sm font-bold text-foreground">{q.insurer.name}</p>
          <p className="text-[11px] text-muted-foreground">
            {q.product === "pzp" ? "Povinné zmluvné poistenie" : "Havarijné poistenie"}
          </p>
        </div>
        {q.annual === cheapest && q.eligible && (
          <span className="ml-auto rounded-full bg-[oklch(0.7_0.15_150)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
            Najlepšie
          </span>
        )}
      </div>

      {q.eligible ? (
        <>
          <div className="mt-4 rounded-2xl bg-background p-4 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Ročné poistné
            </p>
            <p className="mt-1 text-4xl font-black tabular-nums text-foreground animate-fade-in">
              {eur(q.annual)}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              alebo ≈ <strong className="text-foreground">{eur2(q.monthly)}</strong> mesačne
            </p>

            {/* Bar */}
            <div className="mt-4">
              <div className="mb-1 flex items-center justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
                <span>Najlacnejšie</span><span>Najdrahšie</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[oklch(0.7_0.18_150)] via-[oklch(0.75_0.18_100)] to-[oklch(0.65_0.19_35)] transition-all duration-700"
                  style={{ width: `${Math.max(6, pctOfMax)}%` }}
                />
              </div>
              <div className="mt-1 flex justify-between text-[10px] tabular-nums text-muted-foreground">
                <span>{eur(cheapest)}</span><span>{eur(priciest)}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <MetricBox label="Zľava" value={`${q.discountPct}%`} accent />
            <MetricBox label="Skóre" value={`${q.score}/100`} />
            <MetricBox label="Ušetríte" value={savings > 0 ? eur(savings) : "—"} />
          </div>

          {q.product === "havarijne" && q.addonsTotal > 0 && (
            <div className="mt-3 flex items-center justify-between rounded-lg bg-background px-3 py-2 text-xs">
              <span className="text-muted-foreground">Pripoistenia</span>
              <span className="font-semibold text-foreground">+ {eur(q.addonsTotal)}</span>
            </div>
          )}

          <a
            href={q.insurer.calculatorUrl ?? q.insurer.homepage}
            target="_blank" rel="noopener noreferrer"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[oklch(0.55_0.17_150)] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:opacity-95"
          >
            Uzavrieť online <ArrowUpRight className="h-4 w-4" />
          </a>
        </>
      ) : (
        <div className="mt-4 rounded-xl border border-dashed border-border bg-background p-4 text-sm text-muted-foreground">
          {q.reason ?? "Ponuka nie je dostupná pre zadané parametre."}
        </div>
      )}
    </div>
  );
}

function MetricBox({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-lg bg-background px-2.5 py-2">
      <p className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className={`mt-0.5 text-sm font-black tabular-nums ${accent ? "text-[oklch(0.5_0.15_155)]" : "text-foreground"}`}>
        {value}
      </p>
    </div>
  );
}

function ResultRow({
  q, rank, cheapest, priciest,
}: { q: InsuranceQuote; rank: number; cheapest: number; priciest: number }) {
  const range = Math.max(1, priciest - cheapest);
  const barPct = q.eligible ? Math.max(6, 100 - ((q.annual - cheapest) / range) * 100) : 0;
  return (
    <div className={`rounded-2xl border p-4 transition ${
      q.eligible
        ? rank === 1
          ? "border-[oklch(0.7_0.15_150)] bg-[oklch(0.97_0.03_150)]"
          : "border-border bg-background"
        : "border-dashed border-border bg-muted/40 opacity-70"
    }`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl text-xs font-black text-white"
            style={{ background: q.insurer.brandColor }}>
            {q.insurer.short.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-foreground">{q.insurer.name}</p>
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
              Zľava {q.discountPct}% ·{" "}
              <Link
                to={q.product === "pzp" ? "/pzp/$insurer" : "/havarijne/$insurer"}
                params={{ insurer: q.insurer.id }}
                className="underline decoration-dotted underline-offset-2 hover:text-foreground"
              >
                detail
              </Link>
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Ročné poistné
          </p>
          <p className="text-lg font-black leading-none tabular-nums text-foreground">
            {q.eligible ? eur(q.annual) : "—"}
          </p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            {q.eligible ? `${eur2(q.monthly)} / mes.` : ""}
          </p>
        </div>
      </div>

      {q.eligible && (
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[oklch(0.7_0.18_150)] to-[oklch(0.5_0.15_155)] transition-all duration-500"
            style={{ width: `${barPct}%` }}
          />
        </div>
      )}

      <a
        href={q.insurer.calculatorUrl ?? q.insurer.homepage}
        target="_blank" rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[oklch(0.45_0.15_155)] hover:underline"
      >
        Otvoriť u poisťovne <ArrowUpRight className="h-3 w-3" />
      </a>
    </div>
  );
}