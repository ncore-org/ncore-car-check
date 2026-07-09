import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "O nCc — ncore car control" },
      { name: "description", content: "Čo znamená skratka nCc a prečo sme postavili službu na overenie histórie vozidla." },
      { property: "og:title", content: "O nCc — ncore car control" },
      { property: "og:description", content: "Význam skratky nCc a naša misia." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.5_0.15_155)]">
          Kto sme
        </p>
        <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
          nCc — ncore car control
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Skratka <strong className="text-foreground">nCc</strong> pochádza z názvu
          <strong className="text-foreground"> ncore car control</strong>. Vyjadruje jadro
          („core") toho, čo robíme: nezávislú kontrolu vozidla postavenú na dátach.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Letter big="n" label="ncore" meaning="Jadro systému — dátová platforma spájajúca desiatky registrov." />
          <Letter big="C" label="car" meaning="Vozidlo je stred toho, čo overujeme — VIN, história, dokumenty." />
          <Letter big="c" label="control" meaning="Kontrola — objektívny report bez záujmu predajcu." />
        </div>

        <h2 className="mt-14 text-2xl font-bold">Naša misia</h2>
        <p className="mt-3 text-muted-foreground">
          Trh ojazdených áut je plný informačnej nerovnováhy — predávajúci vie všetko, kupujúci
          takmer nič. nCc má vyrovnať šance: nezávislý report, ktorý vám ukáže, čo predajca možno
          zamlčal.
        </p>

        <h2 className="mt-10 text-2xl font-bold">Ako sa čítať názov</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-muted-foreground">
          <li>Vyslovuje sa „en-cé-cé".</li>
          <li>Prvé písmeno je malé <strong>n</strong> — symbolizuje „ncore" ako jadro.</li>
          <li>Prostredné písmeno <strong>C</strong> je veľké — hlavné slovo „Car".</li>
          <li>Posledné písmeno je malé <strong>c</strong> — kontrola je nekonečný proces.</li>
        </ul>
      </section>
      <Footer />
    </div>
  );
}

function Letter({ big, label, meaning }: { big: string; label: string; meaning: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="text-5xl font-black leading-none text-brand">{big}</div>
      <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-foreground">{label}</p>
      <p className="mt-1 text-sm text-muted-foreground">{meaning}</p>
    </div>
  );
}