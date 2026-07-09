import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Partneri — nCc" },
      { name: "description", content: "Naši partneri: AAA AUTO a ďalšie spoľahlivé značky v oblasti predaja a overovania vozidiel." },
      { property: "og:title", content: "Partneri — nCc" },
      { property: "og:description", content: "Naši partneri v oblasti predaja a overovania vozidiel." },
    ],
  }),
  component: Partners,
});

function Partners() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="mx-auto max-w-4xl px-4 py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.5_0.15_155)]">
          Spolupráca
        </p>
        <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
          Naši partneri
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Spolupracujeme so značkami, ktoré zdieľajú našu víziu bezpečného a transparentného
          nákupu ojazdených vozidiel.
        </p>

        <article className="mt-10 rounded-2xl border border-border bg-card p-8 shadow-sm">
          <div className="flex flex-wrap items-center gap-4">
            <span className="grid h-14 items-center rounded-lg bg-[oklch(0.98_0.02_60)] px-4 text-2xl font-black tracking-tight text-[oklch(0.55_0.22_35)]">
              AAA<span className="text-[oklch(0.2_0.05_255)]">AUTO</span>
            </span>
            <div>
              <h2 className="text-2xl font-bold">AAA AUTO</h2>
              <p className="text-sm text-muted-foreground">Najväčší predajca ojazdených áut v strednej Európe</p>
            </div>
          </div>
          <p className="mt-6 text-muted-foreground">
            AAA AUTO patrí medzi najdôveryhodnejších predajcov ojazdených vozidiel na Slovensku
            aj v okolitých krajinách. Ponúka tisíce preverených áut s garanciou pôvodu,
            kilometrov a technického stavu. V spolupráci s nCc si tak môžete overiť VIN
            vozidla ešte pred jeho kúpou a získať kompletný obraz o histórii auta.
          </p>
          <ul className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
            <li>• Tisíce vozidiel na sklade</li>
            <li>• Garancia kilometrov</li>
            <li>• Financovanie a odkup</li>
            <li>• Pobočky po celom Slovensku</li>
          </ul>
          <div className="mt-6">
            <a
              href="https://www.aaaauto.sk/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-sm transition hover:opacity-90"
            >
              Navštíviť aaaauto.sk →
            </a>
          </div>
        </article>

        <div className="mt-10 rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground">
          Chcete sa stať partnerom nCc? Napíšte nám na <strong className="text-foreground">podpora@ncc.sk</strong>.
        </div>
      </section>
      <Footer />
    </div>
  );
}