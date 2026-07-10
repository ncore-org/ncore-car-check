import { Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Car,
  ChevronRight,
  Mail,
  Phone,
  Youtube,
  Facebook,
  Instagram,
} from "lucide-react";

const sections = [
  {
    title: "Služby",
    links: [
      { to: "/", label: "Overenie VIN" },
      { to: "/guide", label: "Poradca kúpy" },
      { to: "/financovanie", label: "Financovanie" },
      { to: "/pzp", label: "PZP poistenie" },
      { to: "/havarijne", label: "Havarijné poistenie" },
    ],
  },
  {
    title: "Spoločnosť",
    links: [
      { to: "/about", label: "O nCc" },
      { to: "/partners", label: "Partneri" },
      { to: "/my-account", label: "Môj účet" },
    ],
  },
  {
    title: "Zdroje",
    links: [
      { to: "/guide", label: "Sprievodca kúpou" },
      { href: "#", label: "Blog" },
      { href: "#", label: "VIN dekodér" },
      { href: "#", label: "API pre vývojárov" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/50 bg-gradient-to-b from-secondary/30 to-background">
      {/* Background decorative elements — multi-layer */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-80 w-80 opacity-20 [background:radial-gradient(circle,oklch(0.78_0.19_145/0.06),transparent_60%)]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-80 w-80 opacity-20 [background:radial-gradient(circle,oklch(0.22_0.05_255/0.06),transparent_60%)]" />
      <div className="pointer-events-none absolute -right-20 top-1/3 h-60 w-60 opacity-10 [background:radial-gradient(circle,oklch(0.78_0.19_145/0.04),transparent_60%)]" />

      {/* Grid pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.012] [background-image:linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:48px_48px]" />

      {/* Top gradient line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[oklch(0.78_0.19_145)]/15 to-transparent" />

      {/* Main footer content */}
      <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-8">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-5">
          {/* Brand column — spans wider */}
          <div className="md:col-span-2 md:pr-8">
            {/* Logo + tagline */}
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[oklch(0.22_0.05_255)] to-[oklch(0.28_0.07_250)] text-sm font-black text-white shadow-lg shadow-[oklch(0.22_0.05_255)]/10">
                nCc
              </span>
              <div>
                <span className="text-sm font-bold text-foreground">ncore car control</span>
                <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
                  Overenie VIN
                </p>
              </div>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Preverte históriu vozidla podľa VIN skôr, než zaplatíte prvé euro.
              Kombinujeme desiatky registrov a databáz v reálnom čase.
            </p>

            {/* Trust badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                { icon: ShieldCheck, text: "Bezpečné overenie" },
                { icon: Car, text: "40+ databáz" },
              ].map((b) => (
                <div
                  key={b.text}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 bg-background/60 px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground shadow-xs backdrop-blur transition-colors hover:border-[oklch(0.78_0.19_145)]/20"
                >
                  <b.icon className="h-3.5 w-3.5 text-[oklch(0.5_0.15_155)]" />
                  {b.text}
                </div>
              ))}
            </div>

            {/* Contact */}
            <div className="mt-6 space-y-2.5">
              <a
                href="mailto:podpora@ncc.sk"
                className="group inline-flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-secondary/80 border border-border/40 text-[oklch(0.5_0.15_155)] transition-colors group-hover:bg-secondary">
                  <Mail className="h-3.5 w-3.5" />
                </span>
                podpora@ncc.sk
              </a>
              <div className="inline-flex items-center gap-2.5 text-sm text-muted-foreground">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-secondary/80 border border-border/40 text-[oklch(0.5_0.15_155)]">
                  <Phone className="h-3.5 w-3.5" />
                </span>
                Po–Pi 9:00 – 18:00
              </div>
            </div>
          </div>

          {/* Link sections */}
          {sections.map((s) => (
            <div key={s.title}>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-foreground">
                {s.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {s.links.map((l) => {
                  const content = (
                    <span className="group/link inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
                      <span className="h-0.5 w-0.5 rounded-full bg-[oklch(0.78_0.19_145)]/0 transition-all duration-300 group-hover/link:w-2 group-hover/link:bg-[oklch(0.78_0.19_145)]/40" />
                      {l.label}
                      <ChevronRight className="h-3 w-3 text-[oklch(0.78_0.19_145)]/0 -translate-x-1 transition-all duration-300 group-hover/link:text-[oklch(0.78_0.19_145)]/40 group-hover/link:opacity-100 group-hover/link:translate-x-0" />
                    </span>
                  );
                  if ("to" in l) {
                    return (
                      <li key={l.label}>
                        <Link to={l.to}>{content}</Link>
                      </li>
                    );
                  }
                  return (
                    <li key={l.label}>
                      <a href={l.href} target="_blank" rel="noopener noreferrer">
                        {content}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Partner strip — enhanced */}
        <div className="relative mt-14 overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-background via-secondary/20 to-background p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
          {/* Subtle inner glow */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[oklch(0.78_0.19_145)]/5 blur-2xl" />
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[oklch(0.55_0.22_35)]/10 to-[oklch(0.55_0.22_35)]/5 shadow-sm ring-1 ring-[oklch(0.55_0.22_35)]/10">
                <span className="text-xl font-black tracking-tight text-[oklch(0.55_0.22_35)]">A</span>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">
                  Náš partner
                </p>
                <a
                  href="https://www.aaaauto.sk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-black tracking-tight text-[oklch(0.55_0.22_35)] transition-colors hover:text-[oklch(0.55_0.22_35)/80]"
                >
                  AAA<span className="text-foreground">AUTO</span>
                </a>
              </div>
              <span className="hidden h-8 w-px bg-border/40 sm:block" />
              <p className="hidden max-w-xs text-[11px] leading-relaxed text-muted-foreground/50 sm:block">
                Oficiálny partner pre overovanie histórie vozidiel
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground/40">
                Sledujte nás
              </span>
              <div className="flex gap-1.5">
                {[
                  { icon: Youtube, href: "#", label: "YouTube" },
                  { icon: Facebook, href: "#", label: "Facebook" },
                  { icon: Instagram, href: "#", label: "Instagram" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="grid h-8 w-8 place-items-center rounded-lg border border-border/50 text-muted-foreground/60 shadow-xs transition-all duration-200 hover:border-[oklch(0.78_0.19_145)]/20 hover:bg-[oklch(0.78_0.19_145)]/[0.04] hover:text-foreground active:scale-95"
                  >
                    <s.icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar — enhanced */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border/30 pt-6">
          <p className="text-[11px] font-medium text-muted-foreground/50">
            &copy; {new Date().getFullYear()} nCc — ncore car control. Všetky práva vyhradené.
          </p>
          <div className="flex gap-5 text-[11px] font-medium text-muted-foreground/50">
            {["Zásady ochrany", "Podmienky", "Cookies"].map((label) => (
              <a
                key={label}
                href="#"
                className="transition-colors hover:text-foreground/80"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Development badge */}
        <div className="mt-6 text-center">
          <span className="inline-flex items-center gap-1.5 text-[9px] font-mono text-muted-foreground/20 tracking-[0.2em] uppercase">
            <span className="h-1 w-1 rounded-full bg-muted-foreground/10" />
            VIN overenie v reálnom čase
            <span className="h-1 w-1 rounded-full bg-muted-foreground/10" />
          </span>
        </div>
      </div>
    </footer>
  );
}
