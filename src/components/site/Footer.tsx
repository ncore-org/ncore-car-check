import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand text-brand-foreground font-black">
              nCc
            </span>
            <span className="text-sm font-semibold">ncore car control</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Preverte históriu vozidla podľa VIN skôr, než zaplatíte prvé euro.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-foreground">Služby</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">Overenie VIN</Link></li>
            <li><Link to="/guide" className="hover:text-foreground">Poradca kúpy</Link></li>
            <li><Link to="/financovanie" className="hover:text-foreground">Financovanie</Link></li>
            <li><Link to="/pzp" className="hover:text-foreground">PZP poistenie</Link></li>
            <li><Link to="/havarijne" className="hover:text-foreground">Havarijné poistenie</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-foreground">Spoločnosť</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">O nCc</Link></li>
            <li><Link to="/partners" className="hover:text-foreground">Partneri</Link></li>
            <li><Link to="/my-account" className="hover:text-foreground">Môj účet</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-foreground">Kontakt</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>podpora@ncc.sk</li>
            <li>Po–Pi 9:00 – 18:00</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-5">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Náš partner</p>
          <a
            href="https://www.aaaauto.sk/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm font-black tracking-tight text-[oklch(0.55_0.22_35)] transition hover:bg-secondary"
          >
            AAA<span className="text-foreground">AUTO</span>
            <span className="text-xs font-medium text-muted-foreground">aaaauto.sk ↗</span>
          </a>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} nCc — ncore car control. Všetky práva vyhradené.
      </div>
    </footer>
  );
}