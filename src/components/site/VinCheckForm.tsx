import { useState } from "react";
import { ShieldCheck, Loader2 } from "lucide-react";
import { AdBreakModal } from "./AdBreakModal";

export function VinCheckForm() {
  const [vin, setVin] = useState("");
  const [adOpen, setAdOpen] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = vin.trim().toUpperCase();
    if (v.length < 11) {
      setError("VIN má zvyčajne 17 znakov. Skontrolujte zadanie.");
      return;
    }
    setError(null);
    setShowResult(false);
    setAdOpen(true);
  };

  return (
    <div className="w-full">
      <form
        onSubmit={submit}
        className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/95 p-3 shadow-[var(--shadow-elegant)] sm:flex-row sm:items-center sm:p-2"
      >
        <div className="flex flex-1 items-center gap-2 px-2">
          <ShieldCheck className="h-5 w-5 shrink-0 text-[oklch(0.5_0.15_155)]" />
          <input
            value={vin}
            onChange={(e) => setVin(e.target.value.toUpperCase())}
            placeholder="Zadajte VIN vozidla (17 znakov)"
            maxLength={17}
            className="w-full min-w-0 bg-transparent py-3 font-mono text-base tracking-wider text-foreground outline-none placeholder:text-muted-foreground"
            aria-label="VIN"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-md transition hover:opacity-95 sm:min-w-[160px]"
        >
          Overiť VIN
        </button>
      </form>
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
      <p className="mt-3 text-xs text-white/80">
        VIN nájdete v technickom preukaze v položke E alebo na karosérii pri čelnom skle.
      </p>

      <AdBreakModal
        open={adOpen}
        onClose={() => setAdOpen(false)}
        onComplete={() => {
          setAdOpen(false);
          setShowResult(true);
        }}
      />

      {showResult && (
        <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-[oklch(0.9_0.1_150)]">
              <Loader2 className="h-5 w-5 animate-spin text-[oklch(0.4_0.15_155)]" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Ukážka výsledku pre {vin}</p>
              <p className="text-sm text-muted-foreground">
                Toto je dizajnový náhľad. Reálne dáta budú dostupné po napojení zdrojov.
              </p>
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              { k: "Značka", v: "—" },
              { k: "Rok výroby", v: "—" },
              { k: "Stočenie km", v: "Neznáme" },
            ].map((c) => (
              <div key={c.k} className="rounded-lg bg-muted p-3">
                <p className="text-xs text-muted-foreground">{c.k}</p>
                <p className="font-semibold">{c.v}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}