import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Camera, Car, FileText, Wrench, Gauge, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: "Poradca kúpy auta — nCc" },
      { name: "description", content: "Na čo si dať pozor pri kúpe ojazdeného auta: obhliadka, doklady, testovacia jazda, VIN." },
      { property: "og:title", content: "Poradca kúpy auta — nCc" },
      { property: "og:description", content: "Kompletný checklist a názorné ukážky pred kúpou ojazdeného vozidla." },
    ],
  }),
  component: Guide,
});

const sections = [
  {
    icon: FileText,
    title: "1. Doklady a VIN",
    tip: "Skontrolujte, či VIN v technickom preukaze presne sedí s VIN na karosérii a na štítku pod čelným sklom.",
    watchouts: [
      "Prelepené alebo prevŕtané VIN štítky",
      "Neúplný servisný záznam v knihe",
      "Rozdiel medzi menom majiteľa a predajcu",
      "Chýbajúca STK/EK alebo blízka platnosť",
    ],
  },
  {
    icon: Gauge,
    title: "2. Stočený tachometer",
    tip: "Porovnajte km z posledných STK, servisných záznamov a inzerátov predchádzajúcich predajov.",
    watchouts: [
      "Opotrebovaný volant/pedále vs. nízke km",
      "Nové čalúnenie u auta bez najazdených km",
      "Rozdielne km medzi STK a servisom",
    ],
  },
  {
    icon: Car,
    title: "3. Karoséria a lak",
    tip: "Meranie hrúbky laku odhaľuje tmelenie a prelakovanie. Prezrite škáry medzi dielmi.",
    watchouts: [
      "Nerovnaké škáry (kapota, blatníky, dvere)",
      "Rozdielne odtiene farby",
      "Stopy po tmelení, vlnky pod lakom",
      "Hrdza pri prahoch a lemoch",
    ],
  },
  {
    icon: Wrench,
    title: "4. Motor a podvozok",
    tip: "Za studena naštartujte a počúvajte prvé sekundy behu. Pozrite pod auto a do motora s baterkou.",
    watchouts: [
      "Únik oleja z tesnení a prevodovky",
      "Modrý/biely dym pri štarte",
      "Vôle v riadení a nápravách",
      "Známky nehody na pozdĺžnikoch",
    ],
  },
  {
    icon: Camera,
    title: "5. Elektronika a výbava",
    tip: "Pripojte OBD skener a vyčítajte chyby. Vyskúšajte klimatizáciu, okná, sedadlá, multimédiá.",
    watchouts: [
      "Zmazané chyby tesne pred obhliadkou",
      "Nefunkčné senzory parkovania",
      "Nefunkčná klíma / slabé chladenie",
    ],
  },
  {
    icon: ShieldCheck,
    title: "6. Testovacia jazda",
    tip: "Aspoň 20 minút — mesto aj rýchlostná cesta. Vypnite rádio a počúvajte.",
    watchouts: [
      "Ťahanie do strany pri brzdení",
      "Vibrácie vo volante nad 100 km/h",
      "Trhanie/kopanie prevodovky",
      "Vôle v spojke",
    ],
  },
];

function Guide() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="border-b border-border" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto max-w-5xl px-4 py-14 text-white">
          <p className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.85_0.18_145)]">
            Poradca kúpy
          </p>
          <h1 className="mt-2 text-4xl font-black leading-tight sm:text-5xl">
            Na čo si dať pozor pri kúpe auta
          </h1>
          <p className="mt-3 max-w-2xl text-white/80">
            Praktický sprievodca s checklistom. Prejdite si šesť oblastí, ktoré rozhodnú, či auto stojí za svoje peniaze.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14">
        <div className="grid gap-5 md:grid-cols-2">
          {sections.map(({ icon: Icon, title, tip, watchouts }) => (
            <article key={title} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-start gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[oklch(0.94_0.06_150)] text-[oklch(0.4_0.15_155)]">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg font-bold">{title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{tip}</p>
                </div>
              </div>
              <div className="mt-4 rounded-xl bg-muted p-4">
                <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-destructive">
                  <AlertTriangle className="h-3.5 w-3.5" /> Na čo si dať pozor
                </p>
                <ul className="space-y-1.5 text-sm">
                  {watchouts.map((w) => (
                    <li key={w} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.5_0.15_155)]" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-secondary/50 p-6 sm:p-8">
          <h3 className="text-xl font-bold">Rýchly checklist pred obhliadkou</h3>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {[
              "Overiť VIN v nCc pred cestou",
              "Vziať si baterku a magnet",
              "Zobrať OBD skener alebo mechanika",
              "Skontrolovať STK/EK a zelenú kartu",
              "Fotiť VIN a stav km",
              "Nikdy neplatiť hotovosťou pri urgentnom predaji",
            ].map((t) => (
              <label key={t} className="flex items-center gap-3 rounded-lg bg-card p-3 text-sm">
                <input type="checkbox" className="h-4 w-4 accent-[oklch(0.5_0.15_155)]" />
                {t}
              </label>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}