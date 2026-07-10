import { useState, useCallback } from "react";
import { ShieldCheck, Loader2, AlertCircle, SearchX } from "lucide-react";
import { VinResultView } from "./VinResultView";
import { AdBreakModal } from "./AdBreakModal";
import { lookupVin } from "@/lib/vin";
import type { VinReport } from "@/lib/vin";

export function VinCheckForm() {
  const [vin, setVin] = useState("");
  const [adOpen, setAdOpen] = useState(false);
  const [report, setReport] = useState<VinReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = vin.trim().toUpperCase();
    if (v.length < 11) {
      setError("VIN má zvyčajne 17 znakov. Skontrolujte zadanie.");
      return;
    }
    setError(null);
    setApiError(null);
    setReport(null);
    setAdOpen(true);
  };

  const handleAdComplete = useCallback(async () => {
    setAdOpen(false);
    setLoading(true);

    const result = await lookupVin({ vin: vin.trim().toUpperCase() });

    if (result.success && result.data) {
      setReport(result.data);
      setApiError(null);
    } else {
      setReport(null);
      setApiError(result.error ?? "Neznáma chyba pri overovaní VIN.");
    }
    setLoading(false);
  }, [vin]);

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
          disabled={loading}
          className="inline-flex items-center justify-center rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-md transition hover:opacity-95 disabled:opacity-50 sm:min-w-[160px]"
        >
          {loading ? "Vyhľadávam..." : "Overiť VIN"}
        </button>
      </form>
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
      <p className="mt-3 text-xs text-white/80">
        VIN nájdete v technickom preukaze v položke E alebo na karosérii pri čelnom skle.
      </p>

      <AdBreakModal
        open={adOpen}
        onClose={() => setAdOpen(false)}
        onComplete={handleAdComplete}
      />

      {/* Loading state */}
      {loading && (
        <div className="mt-8">
          <div className="mb-4 flex items-center gap-3 rounded-2xl border border-[oklch(0.78_0.19_145)]/20 bg-[oklch(0.78_0.19_145)]/5 p-4">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.94_0.06_150)] to-[oklch(0.88_0.08_160)]">
              <Loader2 className="h-5 w-5 animate-spin text-[oklch(0.35_0.14_155)]" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Vyhľadávam {vin}…</p>
              <p className="text-xs text-muted-foreground">
                Prehľadávam databázy STK, servisov, poisťovní a EU registrov.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* API error */}
      {apiError && !loading && (
        <div className="mt-8">
          <div className="flex items-start gap-3 rounded-2xl border border-[oklch(0.6_0.24_27)]/20 bg-[oklch(0.6_0.24_27)]/5 p-4">
            <div className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[oklch(0.6_0.24_27)]/10">
              {apiError.includes("nenájdené") || apiError.includes("nebol nájdený") ? (
                <SearchX className="h-5 w-5 text-[oklch(0.6_0.24_27)]" />
              ) : (
                <AlertCircle className="h-5 w-5 text-[oklch(0.6_0.24_27)]" />
              )}
            </div>
            <div>
              <p className="font-semibold text-foreground">Overenie zlyhalo</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{apiError}</p>
            </div>
          </div>
        </div>
      )}

      {/* Result */}
      {report && !loading && (
        <div className="mt-8">
          <VinResultView data={report} />
        </div>
      )}
    </div>
  );
}