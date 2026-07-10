import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronDown, Globe, Car, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const nav = [
  { to: "/", label: "Overenie VIN" },
  { to: "/guide", label: "Poradca kúpy" },
  { to: "/pzp", label: "PZP" },
  { to: "/havarijne", label: "Havarijné" },
  { to: "/financovanie", label: "Financovanie" },
  { to: "/partners", label: "Partneri" },
  { to: "/about", label: "O nCc" },
  { to: "/my-account", label: "Môj účet" },
] as const;

const countries = [
  { code: "SK", label: "Slovensko", flag: "🇸🇰" },
  { code: "CZ", label: "Česko", flag: "🇨🇿" },
  { code: "PL", label: "Polska", flag: "🇵🇱" },
  { code: "HU", label: "Maďarsko", flag: "🇭🇺" },
  { code: "AT", label: "Rakúsko", flag: "🇦🇹" },
  { code: "DE", label: "Nemecko", flag: "🇩🇪" },
  { code: "EN", label: "English", flag: "🌐" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState<(typeof countries)[number]>(countries[0]);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  /* Close language dropdown on outside click */
  useEffect(() => {
    if (!langOpen) return;
    const handle = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [langOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/85 backdrop-blur-lg supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-3 sm:px-4">
        {/* Left — Logo & Partner */}
        <div className="flex items-center gap-1 sm:gap-2 min-w-0">
          <Link to="/" className="flex shrink-0 items-center gap-1.5 py-3 sm:gap-2 sm:py-3">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-[oklch(0.28_0.07_250)] text-brand-foreground text-sm font-black shadow-sm">
              nCc
            </span>
            <span className="hidden text-[13px] font-semibold tracking-tight text-foreground sm:inline whitespace-nowrap">
              ncore car control
            </span>
          </Link>
          <span className="hidden h-5 w-px bg-border/60 sm:inline-block" />
          <a
            href="https://www.aaaauto.sk/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden shrink-0 items-center gap-1 rounded-md border border-border/50 bg-secondary/30 px-2 py-1 text-[10px] font-bold tracking-tight text-[oklch(0.55_0.22_35)] transition hover:bg-secondary sm:inline-flex"
          >
            <span className="text-muted-foreground/60 text-[8px] uppercase tracking-widest">Partner</span>
            AAA<span className="text-foreground">AUTO</span>
          </a>
        </div>

        {/* Center + Right — Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="whitespace-nowrap rounded-lg px-2.5 py-2 text-[13px] font-medium text-muted-foreground/80 transition-all hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "text-foreground bg-secondary/60 font-semibold" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}

          <div className="ml-1 h-5 w-px bg-border/40" />

          {/* Language Switcher */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="inline-flex items-center gap-1 rounded-lg border border-border/50 px-2 py-1.5 text-xs font-medium text-foreground/80 transition hover:bg-secondary"
            >
              <Globe className="h-3 w-3" />
              <span className="text-xs leading-none">{country.flag}</span>
              <span className="text-[10px] font-semibold">{country.code}</span>
              <ChevronDown className={`h-2.5 w-2.5 transition duration-200 ${langOpen ? "rotate-180" : ""}`} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-44 overflow-hidden rounded-xl border border-border/60 bg-popover shadow-[0_8px_30px_-8px_rgba(0,0,0,0.15)]">
                {countries.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => { setCountry(c); setLangOpen(false); }}
                    className={`flex w-full items-center gap-2 px-3 py-2 text-left text-xs transition hover:bg-secondary ${
                      c.code === country.code ? "bg-secondary/50 font-semibold" : ""
                    }`}
                  >
                    <span>{c.flag}</span>
                    <span>{c.label}</span>
                    {c.code === country.code && <ChevronRight className="ml-auto h-3 w-3 text-[oklch(0.78_0.19_145)]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/my-account"
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-brand to-[oklch(0.28_0.07_250)] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:brightness-110 hover:shadow-md"
          >
            <Car className="h-3 w-3" />
            Prihlásiť
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden rounded-lg border border-border/50 p-2 text-foreground/70 transition hover:bg-secondary hover:text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border/50 bg-background/95 backdrop-blur-lg md:hidden">
          <div className="mx-auto max-w-6xl flex flex-col gap-0.5 px-3 pb-4 pt-2">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 transition hover:bg-secondary"
              >
                {n.label}
                <ChevronRight className="ml-auto h-3.5 w-3.5 text-muted-foreground/40" />
              </Link>
            ))}
            <div className="mt-3 border-t border-border/40 pt-3">
              <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/60">
                Krajina
              </p>
              <div className="grid grid-cols-2 gap-1">
                {countries.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => { setCountry(c); setOpen(false); }}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition hover:bg-secondary ${
                      c.code === country.code ? "bg-secondary/60 font-semibold" : ""
                    }`}
                  >
                    <span>{c.flag}</span>
                    <span className="text-xs">{c.label}</span>
                  </button>
                ))}
              </div>
              <a
                href="https://www.aaaauto.sk/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-[oklch(0.55_0.22_35)] transition hover:bg-secondary"
              >
                Partner: AAA<span className="text-foreground">AUTO</span>
                <ChevronRight className="ml-auto h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
