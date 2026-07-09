import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { useState } from "react";

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
  { code: "HU", label: "Magyarország", flag: "🇭🇺" },
  { code: "AT", label: "Österreich", flag: "🇦🇹" },
  { code: "DE", label: "Deutschland", flag: "🇩🇪" },
  { code: "EN", label: "English", flag: "🌐" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState<(typeof countries)[number]>(countries[0]);
  const [langOpen, setLangOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand text-brand-foreground font-black">
              nCc
            </span>
            <span className="hidden text-sm font-semibold tracking-wide text-foreground sm:inline">
              ncore car control
            </span>
          </Link>
          <span className="hidden h-6 w-px bg-border sm:inline-block" />
          <a
            href="https://www.aaaauto.sk/"
            target="_blank"
            rel="noopener noreferrer"
            title="Partner: AAA AUTO"
            className="hidden items-center gap-1 rounded-md border border-border bg-secondary/40 px-2 py-1 text-[11px] font-black tracking-tight text-[oklch(0.55_0.22_35)] transition hover:bg-secondary sm:inline-flex"
          >
            AAA<span className="text-foreground">AUTO</span>
          </a>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-sm font-medium text-foreground transition hover:bg-secondary"
              aria-label="Zmeniť krajinu"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{country.flag}</span>
              <span className="text-xs">{country.code}</span>
              <ChevronDown className="h-3 w-3" />
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-md border border-border bg-popover shadow-lg">
                {countries.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      setCountry(c);
                      setLangOpen(false);
                    }}
                    className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition hover:bg-secondary ${
                      c.code === country.code ? "bg-secondary/60 font-semibold" : ""
                    }`}
                  >
                    <span>{c.flag}</span>
                    <span>{c.label}</span>
                    <span className="ml-auto text-xs text-muted-foreground">{c.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <Link
            to="/my-account"
            className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground shadow-sm transition hover:opacity-90"
          >
            Prihlásiť
          </Link>
        </nav>
        <button
          className="md:hidden rounded-md border border-border p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
              >
                {n.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-border pt-2">
              <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Krajina / Jazyk
              </p>
              <div className="grid grid-cols-2 gap-1">
                {countries.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      setCountry(c);
                      setOpen(false);
                    }}
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm hover:bg-muted ${
                      c.code === country.code ? "bg-secondary font-semibold" : ""
                    }`}
                  >
                    <span>{c.flag}</span>
                    <span>{c.code}</span>
                  </button>
                ))}
              </div>
              <a
                href="https://www.aaaauto.sk/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-[oklch(0.55_0.22_35)] hover:bg-muted"
              >
                Partner: AAA<span className="text-foreground">AUTO</span> ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
