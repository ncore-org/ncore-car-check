import {
  AlertTriangle,
  Battery,
  Car as CarIcon,
  CheckCircle2,
  ChevronDown,
  Clock,
  Gauge,
  History,
  Image,
  MapPin,
  Shield,
  ShieldCheck,
  Thermometer,
  Wrench,
  HelpCircle,
} from "lucide-react";
import { useState } from "react";
import type { VinReport, PhotoRecord } from "@/lib/vin";

/* ------------------------------------------------------------------ */
/*  Score ring                                                         */
/* ------------------------------------------------------------------ */
function ScoreRing({ score, size = 96 }: { score: number; size?: number }) {
  const r = (size - 8) / 2;
  const circumference = 2 * Math.PI * r;
  const color = score >= 80 ? "oklch(0.78_0.19_145)" : score >= 60 ? "oklch(0.75_0.18_85)" : "oklch(0.6_0.24_27)";
  return (
    <svg width={size} height={size} className="drop-shadow-sm shrink-0">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="oklch(0.22_0.05_255 / 0.08)" strokeWidth="4" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - score / 100)}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        className="transition-all duration-1000"
      />
      <text x={size / 2} y={size / 2 - 4} textAnchor="middle" fill="white" fontSize={size * 0.22} fontWeight="900" fontFamily="system-ui">
        {score}
      </text>
      <text x={size / 2} y={size / 2 + 14} textAnchor="middle" fill="oklch(0.7_0.02_255)" fontSize={size * 0.075} fontWeight="600" letterSpacing="1">
        /100
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data cell                                                          */
/* ------------------------------------------------------------------ */
function DataCell({ label, value, icon: Icon }: { label: string; value: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/60 p-3.5 shadow-xs transition-colors hover:bg-card/80">
      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-[oklch(0.94_0.06_150)] to-[oklch(0.88_0.08_160)] text-[oklch(0.35_0.14_155)]">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60">{label}</p>
        <p className="truncate text-sm font-bold text-foreground">{value}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Timeline entry                                                     */
/* ------------------------------------------------------------------ */
function TimelineEntry({ date, task, km, shop, isLast }: { date: string; task: string; km: number; shop: string; isLast: boolean }) {
  return (
    <div className="group relative flex gap-4 pb-6 last:pb-0">
      {!isLast && <div className="pointer-events-none absolute left-[13px] top-5 h-full w-px bg-gradient-to-b from-[oklch(0.78_0.19_145)]/20 to-transparent" />}
      <div className="relative z-10 mt-0.5 flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border border-[oklch(0.78_0.19_145)]/20 bg-gradient-to-br from-[oklch(0.94_0.06_150)] to-[oklch(0.88_0.08_160)] text-[9px] font-bold text-[oklch(0.35_0.14_155)] shadow-xs transition-all group-hover:scale-110">
        <Wrench className="h-2.5 w-2.5" />
      </div>
      <div className="min-w-0 flex-1 rounded-xl border border-border/40 bg-card/40 p-3.5 shadow-xs transition-all group-hover:border-[oklch(0.78_0.19_145)]/10 group-hover:bg-card/60">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm font-bold text-foreground">{task}</span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/40 bg-background/60 px-2 py-0.5 text-[10px] font-mono font-medium text-muted-foreground shadow-xs">
            <Clock className="h-2.5 w-2.5" />
            {km.toLocaleString()} km
          </span>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground/70">
          <span>{date}</span>
          <span className="h-3 w-px bg-border/40" />
          <span>{shop}</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
export function VinResultView({ data, loading }: { data: VinReport; loading?: boolean }) {
  const [showAllHistory, setShowAllHistory] = useState(false);
  const displayedHistory = showAllHistory ? data.serviceHistory : data.serviceHistory.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* =============== HEADER: Score + Basic info =============== */}
      <div className="overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-card to-secondary/20 p-6 shadow-[0_8px_32px_-12px_oklch(0.22_0.05_255/0.2)] sm:p-8">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-foreground sm:text-3xl">{data.brand} {data.model}</h1>
              <span className="rounded-full border border-[oklch(0.78_0.19_145)]/20 bg-[oklch(0.78_0.19_145)]/5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[oklch(0.5_0.15_155)]">
                {data.year}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="font-mono tracking-wider">{data.vin}</span>
              <span className="h-3 w-px bg-border/40" />
              <span>{data.plate}</span>
              <span className="h-3 w-px bg-border/40" />
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Slovensko
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ScoreRing score={data.score} />
            <div className="hidden space-y-1 sm:block">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">Stav vozidla</p>
              <p className="text-lg font-bold text-foreground">Dobrý</p>
              <p className="text-[10px] text-muted-foreground/50">Nižšie riziko</p>
            </div>
          </div>
        </div>

        {/* Status badges */}
        <div className="mt-6 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-[oklch(0.78_0.19_145)]/20 bg-[oklch(0.78_0.19_145)]/5 px-2.5 py-1 text-[11px] font-semibold text-[oklch(0.5_0.15_155)]">
            <CheckCircle2 className="h-3 w-3" />
            Čistý Interpol
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-[oklch(0.78_0.19_145)]/20 bg-[oklch(0.78_0.19_145)]/5 px-2.5 py-1 text-[11px] font-semibold text-[oklch(0.5_0.15_155)]">
            <CheckCircle2 className="h-3 w-3" />
            Bez záložného práva
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-[oklch(0.75_0.18_85)]/20 bg-[oklch(0.75_0.18_85)]/5 px-2.5 py-1 text-[11px] font-semibold text-[oklch(0.55_0.18_85)]">
            <AlertTriangle className="h-3 w-3" />
            2 nehody v histórii
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-[oklch(0.75_0.18_85)]/20 bg-[oklch(0.75_0.18_85)]/5 px-2.5 py-1 text-[11px] font-semibold text-[oklch(0.55_0.18_85)]">
            <Gauge className="h-3 w-3" />
            Stočenie nepotvrdené
          </span>
        </div>
      </div>

      {/* =============== CAR OUTLINE + DAMAGE MAP =============== */}
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        {/* Car SVG silhouette */}
        <div className="rounded-2xl border border-border/40 bg-gradient-to-br from-card to-secondary/10 p-5 shadow-sm">
          <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground/70">
            <CarIcon className="h-3.5 w-3.5" />
            Mapovanie poškodení
          </p>
          <svg viewBox="0 0 280 160" fill="none" className="mx-auto w-full max-w-[280px]">
            {/* Body */}
            <path
              d="M 30 120 L 45 100 L 75 90 L 95 75 L 185 75 L 215 90 L 245 90 L 260 105 L 270 120 L 270 140 L 30 140 Z"
              stroke="oklch(0.7_0.02_255 / 0.3)" strokeWidth="1.5" fill="oklch(0.7_0.02_255 / 0.04)"
            />
            {/* Roof */}
            <path d="M 95 75 L 110 55 L 185 55 L 215 90" stroke="oklch(0.7_0.02_255 / 0.2)" strokeWidth="1.5" fill="none" />
            {/* Windows */}
            <path d="M 110 75 L 120 60 L 145 60 L 145 90 L 110 90 Z" stroke="oklch(0.7_0.02_255 / 0.1)" strokeWidth="0.8" fill="white" fillOpacity="0.03" />
            <path d="M 150 60 L 175 60 L 185 80 L 185 90 L 150 90 Z" stroke="oklch(0.7_0.02_255 / 0.1)" strokeWidth="0.8" fill="white" fillOpacity="0.03" />
            {/* Wheels */}
            <circle cx="85" cy="140" r="16" stroke="oklch(0.7_0.02_255 / 0.25)" strokeWidth="1.5" fill="none" />
            <circle cx="215" cy="140" r="16" stroke="oklch(0.7_0.02_255 / 0.25)" strokeWidth="1.5" fill="none" />
            {/* Damage: front 2016 */}
            <circle cx="34" cy="110" r="5" fill="oklch(0.75_0.18_85 / 0.25)" stroke="oklch(0.75_0.18_85 / 0.4)" strokeWidth="1" />
            <text x="34" y="108" textAnchor="middle" fill="oklch(0.75_0.18_85 / 0.6)" fontSize="5" fontWeight="bold">★</text>
            <text x="34" y="126" textAnchor="middle" fill="oklch(0.7_0.02_255 / 0.3)" fontSize="4" fontFamily="monospace">2016</text>
            {/* Damage: rear right 2019 */}
            <circle cx="250" cy="118" r="5" fill="oklch(0.75_0.18_85 / 0.25)" stroke="oklch(0.75_0.18_85 / 0.4)" strokeWidth="1" />
            <text x="250" y="116" textAnchor="middle" fill="oklch(0.75_0.18_85 / 0.6)" fontSize="5" fontWeight="bold">★</text>
            <text x="250" y="134" textAnchor="middle" fill="oklch(0.7_0.02_255 / 0.3)" fontSize="4" fontFamily="monospace">2019</text>
            {/* Legend */}
            <rect x="10" y="150" width="4" height="4" rx="1" fill="oklch(0.75_0.18_85 / 0.3)" />
            <text x="18" y="153" fill="oklch(0.7_0.02_255 / 0.4)" fontSize="4.5" fontFamily="monospace">Poškodenie</text>
          </svg>
        </div>

        {/* Accident detail cards */}
        <div className="space-y-3">
          {data.accidents.map((a, i) => (
            <div key={i} className="rounded-2xl border border-border/40 bg-card/60 p-4 shadow-xs transition-colors hover:bg-card/80">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg text-white text-xs font-bold shadow-xs ${
                    a.severity === "low" ? "bg-[oklch(0.75_0.18_85)]" : "bg-[oklch(0.6_0.24_27)]"
                  }`}>
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{a.type}</p>
                    <p className="text-xs text-muted-foreground">{a.damage}</p>
                  </div>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground/60">{a.date}</span>
              </div>
            </div>
          ))}
          {/* Theft check */}
          <div className="rounded-2xl border border-border/30 bg-gradient-to-br from-[oklch(0.78_0.19_145)]/[0.03] to-transparent p-4 shadow-xs">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-[oklch(0.78_0.19_145)]/50" />
              <div>
                <p className="text-sm font-bold text-foreground">Overenie krádeže</p>
                <p className="text-xs text-muted-foreground">Vozidlo nie je evidované ako kradnuté v Interpol ani SIS.</p>
              </div>
              <CheckCircle2 className="ml-auto h-5 w-5 shrink-0 text-[oklch(0.78_0.19_145)]" />
            </div>
          </div>
        </div>
      </div>

      {/* =============== PHOTO GALLERY =============== */}
      <div>
        <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground/70">
          <Image className="h-3.5 w-3.5" />
          Fotografie ({data.photos.length})
        </p>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {data.photos.length > 0 ? (
            data.photos.map((p, i) => (
              <div
                key={i}
                className="group relative aspect-square overflow-hidden rounded-xl border border-border/40 bg-card/40 shadow-xs"
              >
                <img
                  src={p.thumb ?? p.url}
                  alt={p.caption ?? `Foto ${i + 1}`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                {p.caption && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="text-[9px] font-medium text-white/90">{p.caption}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center gap-2 rounded-xl border border-dashed border-border/30 bg-card/20 p-8">
              <Image className="h-5 w-5 text-muted-foreground/30" />
              <p className="text-xs text-muted-foreground/40">
                Fotografie budú dostupné po zakúpení plnej správy.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* =============== TECH DATA GRID =============== */}
      <div>
        <p className="mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground/70">Technické údaje</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <DataCell label="Motor" value={data.engine} icon={Battery} />
          <DataCell label="Palivo" value={data.fuel} icon={Thermometer} />
          <DataCell label="Farba" value={data.color} icon={HelpCircle} />
          <DataCell label="Najazdené" value={`${data.km.toLocaleString()} km`} icon={Gauge} />
        </div>
      </div>

      {/* =============== KM HISTORY CHART =============== */}
      <div className="rounded-2xl border border-border/40 bg-card/40 p-5 shadow-sm">
        <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground/70">
          <Gauge className="h-3.5 w-3.5" />
          História km — Stočený tachometer?
        </p>
        <div className="relative h-32">
          <span className="absolute -left-1 -top-2 text-[9px] font-mono text-muted-foreground/30">km</span>
          <div className="flex h-full items-end gap-3 pl-4">
            {data.kmHistory.map((h) => {
              const maxKm = Math.max(...data.kmHistory.map((x) => x.km));
              const hPct = (h.km / maxKm) * 100;
              return (
                <div key={h.year} className="group relative flex flex-1 flex-col items-center gap-1">
                  <div className="relative flex w-full items-end justify-center">
                    <div
                      className="w-full max-w-[40px] rounded-t-md bg-gradient-to-t from-[oklch(0.78_0.19_145)]/30 to-[oklch(0.88_0.12_150)]/40 transition-all duration-500 hover:to-[oklch(0.88_0.12_150)]/60"
                      style={{ height: `${hPct}%`, minHeight: "8px" }}
                    />
                    <div className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-[9px] font-mono text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                      {h.km.toLocaleString()} km
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] font-mono font-medium text-muted-foreground/50">{h.year}</span>
                    <span className="text-[7px] font-mono text-muted-foreground/30">{h.source}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground/60">
          {data.score >= 80
            ? "Záznamy km vykazujú konzistentný rast bez anomálií. Stočenie sa nejaví ako pravdepodobné."
            : "Záznamy vykazujú nezrovnalosti. Odporúčame ďalšie preverenie."}
        </p>
      </div>

      {/* =============== SERVICE HISTORY TIMELINE =============== */}
      <div>
        <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground/70">
          <History className="h-3.5 w-3.5" />
          Servisná história
        </p>
        <div className="rounded-2xl border border-border/40 bg-card/30 p-5 shadow-sm">
          {displayedHistory.map((h, i) => (
            <TimelineEntry
              key={`${h.date}-${h.task}`}
              date={h.date}
              task={h.task}
              km={h.km}
              shop={h.shop}
              isLast={i === displayedHistory.length - 1}
            />
          ))}
          {data.serviceHistory.length > 3 && (
            <button
              type="button"
              onClick={() => setShowAllHistory(!showAllHistory)}
              className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-border/30 bg-background/50 px-4 py-2.5 text-xs font-semibold text-muted-foreground transition-all hover:border-[oklch(0.78_0.19_145)]/15 hover:bg-[oklch(0.78_0.19_145)]/[0.02] hover:text-foreground"
            >
              {showAllHistory ? "Skryť" : `Zobraziť všetkých ${data.serviceHistory.length} záznamov`}
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showAllHistory ? "rotate-180" : ""}`} />
            </button>
          )}
        </div>
      </div>

      {/* =============== LEASING + EQUIPMENT =============== */}
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Leasing / liens */}
        <div className="rounded-2xl border border-border/40 bg-card/40 p-5 shadow-sm">
          <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground/70">
            <ShieldCheck className="h-3.5 w-3.5" />
            Leasing a záložné práva
          </p>
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[oklch(0.78_0.19_145)]/10">
              <CheckCircle2 className="h-5 w-5 text-[oklch(0.78_0.19_145)]" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Bez zaťaženia</p>
              <p className="text-xs text-muted-foreground">{data.leasing.note}</p>
            </div>
          </div>
        </div>
        {/* Equipment */}
        <div className="rounded-2xl border border-border/40 bg-card/40 p-5 shadow-sm">
          <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground/70">
            <CarIcon className="h-3.5 w-3.5" />
            Originálna výbava
          </p>
          <div className="flex flex-wrap gap-1.5">
            {data.equipment.map((e) => (
              <span
                key={e}
                className="inline-flex items-center gap-1 rounded-lg border border-border/40 bg-background/60 px-2 py-1 text-[10px] font-medium text-muted-foreground shadow-xs"
              >
                <CheckCircle2 className="h-2.5 w-2.5 text-[oklch(0.78_0.19_145)]/40" />
                {e}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* =============== FULL REPORT CTA =============== */}
      <div className="rounded-2xl border border-border/30 bg-gradient-to-br from-[oklch(0.78_0.19_145)]/[0.03] to-secondary/20 p-6 text-center shadow-sm">
        <p className="text-lg font-bold text-foreground">Chcete viac detailov?</p>
        <p className="mt-1 text-sm text-muted-foreground">Kúpte si plnú správu s 200+ kontrolnými bodmi a fotografiami.</p>
        <button
          type="button"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[oklch(0.22_0.05_255)] to-[oklch(0.28_0.07_250)] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:brightness-110 active:scale-[0.98]"
        >
          Kúpiť plnú správu — 9.90 €
        </button>
      </div>
    </div>
  );
}
