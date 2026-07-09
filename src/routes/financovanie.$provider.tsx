import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Check, BookOpen, Calculator, ExternalLink } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { findProvider, providers, type Provider } from "@/data/financing";

export const Route = createFileRoute("/financovanie/$provider")({
  loader: ({ params }) => {
    const p = findProvider(params.provider);
    if (!p) throw notFound();
    return { provider: p };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Poskytovateľ nenájdený | nCc" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const p = loaderData.provider;
    return {
      meta: [
        { title: `${p.name} — financovanie auta | nCc` },
        { name: "description", content: `${p.tagline} Sadzby, kalkulačka a oficiálne linky.` },
        { property: "og:title", content: `${p.name} — financovanie auta | nCc` },
        { property: "og:description", content: p.tagline },
      ],
    };
  },
  component: ProviderDetail,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold">Poskytovateľ nenájdený</h1>
        <Link to="/financovanie" className="mt-4 inline-block text-[oklch(0.45_0.15_155)] hover:underline">
          ← Späť na financovanie
        </Link>
      </div>
      <Footer />
    </div>
  ),
});

function ProviderDetail() {
  const { provider } = Route.useLoaderData() as { provider: Provider };
  const others = providers.filter((x) => x.id !== provider.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${provider.brandColor}, oklch(0.25 0.05 260))`,
        }}
      >
        <div className="mx-auto max-w-6xl px-4 py-14">
          <Link
            to="/financovanie"
            className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Všetci partneri
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/15 text-xl font-black text-white backdrop-blur">
              {provider.short.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                {provider.name}
              </h1>
              <p className="mt-1 text-sm text-white/80">{provider.tagline}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {provider.products.map((p) => (
              <span
                key={p}
                className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur"
              >
                {p === "loan" ? "Úver" : "Leasing"}
              </span>
            ))}
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
              {provider.kind === "bank" ? "Banka" : provider.kind === "leasing" ? "Leasingová spoločnosť" : "Nebankový poskytovateľ"}
            </span>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-xl font-bold text-foreground">Prečo {provider.short}</h2>
            <ul className="mt-4 space-y-2">
              {provider.strengths.map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm text-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.5_0.15_155)]" />
                  {s}
                </li>
              ))}
            </ul>

            <h2 className="mt-10 text-xl font-bold text-foreground">Parametre produktov</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {(["loan", "leasing"] as const).map((k) => {
                const cfg = k === "loan" ? provider.loan : provider.leasing;
                if (!cfg) return null;
                return (
                  <div key={k} className="rounded-2xl border border-border bg-card p-5">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[oklch(0.5_0.15_155)]">
                      {k === "loan" ? "Úver" : "Leasing"}
                    </p>
                    <p className="mt-1 text-2xl font-black text-foreground">{cfg.aprPct}% <span className="text-xs font-medium text-muted-foreground">APR (od)</span></p>
                    <dl className="mt-3 space-y-1.5 text-sm">
                      <Row label="Výška" value={`${cfg.minAmount} – ${cfg.maxAmount} €`} />
                      <Row label="Doba" value={`${cfg.minMonths} – ${cfg.maxMonths} mes.`} />
                      {cfg.processingFeePct !== undefined && (
                        <Row label="Poplatok" value={`${cfg.processingFeePct}%`} />
                      )}
                    </dl>
                  </div>
                );
              })}
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              Uvedené parametre sú demonštračné a slúžia na porovnanie v kalkulačke nCc. Záväzné
              informácie nájdete priamo na stránke poskytovateľa.
            </p>
          </div>

          <aside className="space-y-3">
            <ExtLink icon={ExternalLink} label="Hlavná stránka" url={provider.homepage} />
            {provider.calculatorUrl && (
              <ExtLink icon={Calculator} label="Oficiálna kalkulačka" url={provider.calculatorUrl} />
            )}
            {provider.devDocsUrl && (
              <ExtLink icon={BookOpen} label="Developer / API dokumentácia" url={provider.devDocsUrl} />
            )}
            <Link
              to="/"
              hash="kalkulacka"
              className="mt-4 block rounded-2xl bg-brand px-5 py-4 text-center text-sm font-semibold text-brand-foreground hover:opacity-95"
            >
              Porovnať v kalkulačke nCc
            </Link>
          </aside>
        </div>

        <div className="mt-16">
          <h2 className="text-xl font-bold text-foreground">Ďalší partneri</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <Link
                key={o.id}
                to="/financovanie/$provider"
                params={{ provider: o.id }}
                className="rounded-xl border border-border bg-card p-4 transition hover:shadow-md"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="grid h-8 w-8 place-items-center rounded-md text-[10px] font-black text-white"
                    style={{ background: o.brandColor }}
                  >
                    {o.short.slice(0, 2).toUpperCase()}
                  </div>
                  <p className="text-sm font-semibold">{o.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 py-1 last:border-0">
      <dt className="text-xs uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="font-semibold text-foreground">{value}</dd>
    </div>
  );
}

function ExtLink({
  icon: Icon,
  label,
  url,
}: {
  icon: typeof ArrowUpRight;
  label: string;
  url: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between rounded-2xl border border-border bg-card p-4 transition hover:border-[oklch(0.7_0.1_150)] hover:shadow-sm"
    >
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-[oklch(0.94_0.06_150)] text-[oklch(0.4_0.15_155)]">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{label}</p>
          <p className="truncate text-[11px] text-muted-foreground">{url.replace(/^https?:\/\//, "")}</p>
        </div>
      </div>
      <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:text-foreground" />
    </a>
  );
}