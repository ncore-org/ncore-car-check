import { useState, useEffect, useCallback } from "react";
import { Cookie, X, ChevronRight, Shield, Settings, Check, SlidersHorizontal } from "lucide-react";

const COOKIE_KEY = "ncc-cookie-consent";

type ConsentLevel = "all" | "necessary" | "declined";

/* ------------------------------------------------------------------ */
/*  Cookie category config                                             */
/* ------------------------------------------------------------------ */
interface CookieCategory {
  key: string;
  label: string;
  desc: string;
  locked: boolean;
}

const CATEGORIES: CookieCategory[] = [
  { key: "necessary", label: "Nevyhnutné", desc: "Zabezpečujú základné funkcie stránky", locked: true },
  { key: "functional", label: "Funkčné", desc: "Umožňujú personalizáciu a zapamätanie preferencií", locked: false },
  { key: "analytics", label: "Analytické", desc: "Pomáhajú nám zlepšovať stránku", locked: false },
  { key: "marketing", label: "Marketingové", desc: "Cielená reklama a remarketing", locked: false },
];

/* ------------------------------------------------------------------ */
/*  CookieConsent Component — bottom-center, professional design      */
/* ------------------------------------------------------------------ */
export function CookieConsent() {
  const [phase, setPhase] = useState<"hidden" | "enter" | "visible" | "exit">("hidden");
  const [showDetails, setShowDetails] = useState(false);
  const [prefs, setPrefs] = useState<Record<string, boolean>>({
    functional: true,
    analytics: true,
    marketing: true,
  });

  useEffect(() => {
    const saved = localStorage.getItem(COOKIE_KEY);
    if (!saved) {
      const t1 = setTimeout(() => setPhase("enter"), 600);
      const t2 = setTimeout(() => setPhase("visible"), 900);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, []);

  const accept = useCallback((level: ConsentLevel) => {
    setPhase("exit");
    setTimeout(() => {
      localStorage.setItem(COOKIE_KEY, level);
      setPhase("hidden");
      console.debug(`[CookieConsent] Consent saved: ${level}`);
    }, 400);
  }, []);

  const getActivePrefs = () => {
    switch (true) {
      case showDetails: return { necessary: true, ...prefs };
      default: return { necessary: true, functional: false, analytics: false, marketing: false };
    }
  };

  if (phase === "hidden") return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[90] transition-all duration-500 ${
          phase === "exit"
            ? "bg-black/0 backdrop-blur-0"
            : "bg-black/10 backdrop-blur-[1px]"
        }`}
        onClick={() => accept("necessary")}
      />

      {/* Banner — centered bottom card */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[100] px-3 pb-3 pt-2 sm:px-4 sm:pb-4 ${
          phase === "enter" || phase === "visible"
            ? "animate-cookie-enter"
            : "animate-cookie-exit"
        }`}
        role="dialog"
        aria-label="Cookie consent"
      >
        <div className="mx-auto max-w-2xl">
          <div className="relative overflow-hidden rounded-2xl border border-border/30 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_20px_60px_-20px_rgba(0,0,0,0.25)]">
            {/* Decorative top line */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[oklch(0.78_0.19_145)] to-transparent opacity-60" />

            <div className="px-5 py-4 sm:px-6 sm:py-5">
              {/* Header row */}
              <div className="flex items-start gap-3">
                {/* Cookie icon */}
                <div className="hidden shrink-0 sm:block">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[oklch(0.94_0.06_150)] to-[oklch(0.88_0.08_160)] shadow-inner">
                    <Cookie className="h-5 w-5 text-[oklch(0.35_0.14_155)]" />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-foreground sm:text-base">
                        Táto stránka používa cookies
                      </h3>
                      <p className="mt-1 max-w-xl text-xs leading-relaxed text-muted-foreground sm:text-sm">
                        Používame cookies na zabezpečenie funkcií, analýzu a personalizáciu.{" "}
                        <button
                          onClick={() => setShowDetails((v) => !v)}
                          className="font-medium text-[oklch(0.45_0.14_155)] underline underline-offset-2 hover:text-[oklch(0.35_0.14_155)] transition-colors"
                        >
                          Spravovať nastavenia
                        </button>
                      </p>
                    </div>
                    <button
                      onClick={() => accept("necessary")}
                      className="shrink-0 rounded-lg border border-border/50 p-1.5 text-muted-foreground/60 transition hover:bg-secondary hover:text-foreground"
                      aria-label="Zatvoriť"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Detail settings panel */}
                  {showDetails && (
                    <div className="mt-3 animate-cookie-details space-y-1.5 rounded-xl border border-border/40 bg-secondary/20 p-3">
                      <div className="mb-2 flex items-center gap-2 border-b border-border/20 pb-2">
                        <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                          Detailné nastavenia
                        </span>
                      </div>
                      {CATEGORIES.map((c) => (
                        <label
                          key={c.key}
                          className="group flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 transition hover:bg-secondary/40"
                        >
                          {/* Custom toggle */}
                          <div className="relative flex items-center">
                            <input
                              type="checkbox"
                              checked={c.locked ? true : (prefs[c.key] ?? false)}
                              disabled={c.locked}
                              onChange={() =>
                                setPrefs((p) => ({ ...p, [c.key]: !p[c.key] }))
                              }
                              className="peer sr-only"
                            />
                            <div
                              className={`h-4.5 w-8 rounded-full border-2 transition-all duration-200 ${
                                c.locked || prefs[c.key]
                                  ? "border-[oklch(0.78_0.19_145)] bg-[oklch(0.78_0.19_145)]"
                                  : "border-border bg-background"
                              } ${c.locked ? "opacity-60" : ""}`}
                            />
                            <div
                              className={`pointer-events-none absolute left-0.5 top-0.5 h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-all duration-200 ${
                                c.locked || prefs[c.key] ? "translate-x-[14px]" : "translate-x-0"
                              }`}
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium text-foreground">
                              {c.label}
                              {c.locked && (
                                <span className="ml-1.5 rounded bg-border/50 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                                  Vždy
                                </span>
                              )}
                            </p>
                            <p className="text-[11px] text-muted-foreground/80">{c.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className={`flex flex-wrap items-center gap-2 ${showDetails ? "mt-3" : "mt-3"}`}>
                    <button
                      onClick={() => accept("all")}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[oklch(0.22_0.05_255)] to-[oklch(0.28_0.07_250)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_12px_-4px_oklch(0.22_0.05_255/0.4)] transition-all hover:shadow-[0_6px_20px_-4px_oklch(0.22_0.05_255/0.5)] hover:brightness-110 active:scale-[0.97]"
                    >
                      <Check className="h-4 w-4" />
                      Prijať všetko
                    </button>
                    <button
                      onClick={() => accept("necessary")}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition hover:bg-secondary active:scale-[0.97]"
                    >
                      <Shield className="h-3.5 w-3.5" />
                      Len nevyhnutné
                    </button>
                    <button
                      onClick={() => accept("declined")}
                      className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground/70 transition hover:bg-secondary hover:text-foreground active:scale-[0.97]"
                    >
                      Odmietnuť
                    </button>
                    <button
                      onClick={() => setShowDetails((v) => !v)}
                      className={`ml-auto inline-flex items-center gap-1 rounded-lg px-2.5 py-2 text-[11px] font-medium text-muted-foreground/60 transition hover:bg-secondary hover:text-foreground ${
                        showDetails ? "bg-secondary/40 text-foreground" : ""
                      }`}
                    >
                      <Settings
                        className={`h-3 w-3 transition duration-300 ${showDetails ? "rotate-90" : ""}`}
                      />
                      {showDetails ? "Skryť" : "Nastavenia"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
