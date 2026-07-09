import { useEffect, useState } from "react";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
};

const AD_DURATION = 6; // seconds per ad
const AD_COUNT = 3;

const ads = [
  {
    tag: "Reklama · Partner",
    title: "AutoPoistka Plus",
    body: "Zmluva do 3 minút, bonusy pre overené vozidlá cez nCc.",
    cta: "Získať cenovú ponuku",
    palette: "from-[oklch(0.35_0.14_255)] to-[oklch(0.55_0.18_220)]",
  },
  {
    tag: "Reklama · Sponzor",
    title: "TÜV DiagCheck",
    body: "Kompletná diagnostika 120 bodov u vás v meste za 39 €.",
    cta: "Nájsť najbližší servis",
    palette: "from-[oklch(0.3_0.1_160)] to-[oklch(0.55_0.19_140)]",
  },
  {
    tag: "Reklama · Partner",
    title: "Financovanie do 24 hodín",
    body: "Overený VIN = nižšia sadzba. Kalkulačka splátok zadarmo.",
    cta: "Prepočítať splátky",
    palette: "from-[oklch(0.32_0.12_30)] to-[oklch(0.58_0.2_50)]",
  },
];

export function AdBreakModal({ open, onClose, onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [seconds, setSeconds] = useState(AD_DURATION);

  useEffect(() => {
    if (!open) {
      setIndex(0);
      setSeconds(AD_DURATION);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const id = setInterval(() => {
      setSeconds((s) => {
        if (s > 1) return s - 1;
        // advance
        if (index < AD_COUNT - 1) {
          setIndex((i) => i + 1);
          return AD_DURATION;
        }
        clearInterval(id);
        setTimeout(onComplete, 200);
        return 0;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [open, index, onComplete]);

  if (!open) return null;
  const ad = ads[index];
  const progress = ((AD_DURATION - seconds) / AD_DURATION) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[oklch(0.14_0.04_255)] shadow-2xl">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-4 py-2 text-xs text-white/80">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[oklch(0.78_0.19_145)]" />
            Reklamná prestávka · {index + 1} / {AD_COUNT}
          </div>
          <div className="flex items-center gap-3">
            <span className="tabular-nums">Ďalej za {seconds}s</span>
            <button
              onClick={onClose}
              className="rounded-md p-1 text-white/60 transition hover:bg-white/10 hover:text-white"
              aria-label="Zavrieť"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Ad content */}
        <div className={`relative bg-gradient-to-br ${ad.palette} p-8 sm:p-14`}>
          <span className="inline-block rounded-full bg-black/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white/90">
            {ad.tag}
          </span>
          <h3 className="mt-4 text-3xl font-black leading-tight text-white sm:text-5xl">
            {ad.title}
          </h3>
          <p className="mt-3 max-w-lg text-base text-white/90 sm:text-lg">{ad.body}</p>
          <button
            type="button"
            className="mt-6 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[oklch(0.2_0.05_255)] shadow-lg transition hover:scale-[1.02]"
          >
            {ad.cta}
          </button>
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        </div>

        {/* Progress + steps */}
        <div className="space-y-2 bg-black/50 px-4 py-3">
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full bg-[oklch(0.78_0.19_145)] transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex gap-1">
            {Array.from({ length: AD_COUNT }).map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full ${
                  i < index
                    ? "bg-[oklch(0.78_0.19_145)]"
                    : i === index
                      ? "bg-white/40"
                      : "bg-white/10"
                }`}
              />
            ))}
          </div>
          <p className="text-[11px] text-white/50">
            Váš výsledok overenia sa pripravuje. Reklamu nemôžete preskočiť — reklamy udržiavajú nCc bezplatné.
          </p>
        </div>
      </div>
    </div>
  );
}