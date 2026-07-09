// Centrálny systém pre poistenie vozidiel (PZP + Havarijné).
// Reálne slovenské poisťovne + modelové sadzobníky založené na
// verejne dostupných orientačných cenníkoch a spôsoboch výpočtu.
// Toto NIE JE finančné sprostredkovanie — hodnoty sú demo pre porovnanie.

export type InsuranceProduct = "pzp" | "havarijne";

export type FuelType =
  | "benzin"
  | "diesel"
  | "hybrid_benzin"
  | "hybrid_diesel"
  | "plugin_hybrid"
  | "electro"
  | "lpg"
  | "cng";

export type VehicleUsage = "personal" | "business" | "taxi";

export type InsuranceQuoteInput = {
  product: InsuranceProduct;
  // Vodič
  driverAge: number;         // vek vodiča (roky)
  drivingYears: number;      // koľko rokov má VP
  bonusYears: number;        // roky bez nehody (BM)
  region: RegionCode;        // kraj registrácie
  // Vozidlo
  vehicleYear: number;       // rok výroby
  kw: number;                // výkon motora v kW
  ccm: number;               // objem motora
  fuel: FuelType;
  annualKm: number;          // predpokladaný nájazd/rok
  vehicleValue: number;      // aktuálna trhová hodnota (EUR) — pre havarijné
  usage: VehicleUsage;
  // Voliteľné pripoistenia (havarijné)
  addonGlass?: boolean;
  addonAnimal?: boolean;
  addonNaturalDisaster?: boolean;
  addonTheft?: boolean;
};

export type RegionCode = "BA" | "TT" | "TN" | "NR" | "ZA" | "BB" | "PO" | "KE";

export const regions: { code: RegionCode; label: string; factor: number }[] = [
  { code: "BA", label: "Bratislavský", factor: 1.25 },
  { code: "TT", label: "Trnavský", factor: 1.05 },
  { code: "TN", label: "Trenčiansky", factor: 1.00 },
  { code: "NR", label: "Nitriansky", factor: 1.00 },
  { code: "ZA", label: "Žilinský", factor: 1.05 },
  { code: "BB", label: "Banskobystrický", factor: 0.95 },
  { code: "PO", label: "Prešovský", factor: 0.95 },
  { code: "KE", label: "Košický", factor: 1.10 },
];

export const fuelLabels: Record<FuelType, string> = {
  benzin: "Benzín",
  diesel: "Diesel",
  hybrid_benzin: "Hybrid — benzín",
  hybrid_diesel: "Hybrid — diesel",
  plugin_hybrid: "Plug-in hybrid",
  electro: "Elektro",
  lpg: "LPG",
  cng: "CNG",
};

export const usageLabels: Record<VehicleUsage, string> = {
  personal: "Osobné",
  business: "Firemné",
  taxi: "Taxi / prenájom",
};

// -----------------------------------------------------------------
// Poisťovne — reálne subjekty pôsobiace na SK trhu (2024/2025).
// -----------------------------------------------------------------

export type Insurer = {
  id: string;
  name: string;
  short: string;
  brandColor: string;
  homepage: string;
  calculatorUrl?: string;
  claimUrl?: string;
  tagline: string;
  strengths: string[];
  products: InsuranceProduct[];
  // Modelové koeficienty
  pzp?: PzpConfig;
  havarijne?: HavarijneConfig;
};

export type PzpConfig = {
  // Základná cena podľa výkonu (EUR/rok pri 100 kW, priemerný vodič)
  base100kw: number;
  // Koeficient za kW nad/pod 100
  kwFactor: number;
  // Krytie (EUR mil.) — škoda na zdraví / na majetku
  coverageHealth: number;
  coverageProperty: number;
  // Zľavy
  onlineDiscountPct: number;
  // Bonus za roky bez nehody (max %)
  maxBonusPct: number;
};

export type HavarijneConfig = {
  // Základná sadzba ako % z hodnoty vozidla / rok
  baseRatePct: number;
  // Minimálna spoluúčasť (%)
  minDeductiblePct: number;
  // Minimálne poistné (EUR/rok)
  minPremium: number;
  // Zľavy
  onlineDiscountPct: number;
  maxBonusPct: number;
  // Ceny za pripoistenia (EUR/rok)
  addonGlass: number;
  addonAnimal: number;
  addonNaturalDisaster: number;
  addonTheft: number;
};

export const insurers: Insurer[] = [
  {
    id: "allianz",
    name: "Allianz — Slovenská poisťovňa",
    short: "Allianz",
    brandColor: "oklch(0.5 0.18 250)",
    homepage: "https://www.allianzsp.sk",
    calculatorUrl: "https://www.allianzsp.sk/kalkulacky/pzp",
    claimUrl: "https://www.allianzsp.sk/nahlasenie-skody",
    tagline: "Najväčšia poisťovňa na Slovensku.",
    strengths: ["Najhustšia sieť pobočiek", "Asistenčné služby 24/7", "Krytie do 6,07 mil. €"],
    products: ["pzp", "havarijne"],
    pzp: {
      base100kw: 285, kwFactor: 1.9, coverageHealth: 6.07, coverageProperty: 1.3,
      onlineDiscountPct: 10, maxBonusPct: 60,
    },
    havarijne: {
      baseRatePct: 3.9, minDeductiblePct: 5, minPremium: 220,
      onlineDiscountPct: 8, maxBonusPct: 50,
      addonGlass: 45, addonAnimal: 25, addonNaturalDisaster: 35, addonTheft: 40,
    },
  },
  {
    id: "generali",
    name: "Generali Poisťovňa",
    short: "Generali",
    brandColor: "oklch(0.55 0.18 25)",
    homepage: "https://www.generali.sk",
    calculatorUrl: "https://www.generali.sk/kalkulacka-pzp",
    tagline: "Európska poisťovacia skupina.",
    strengths: ["Zľava 30% online", "Rýchla likvidácia", "Bez skrytých poplatkov"],
    products: ["pzp", "havarijne"],
    pzp: {
      base100kw: 272, kwFactor: 1.85, coverageHealth: 6.07, coverageProperty: 1.22,
      onlineDiscountPct: 30, maxBonusPct: 55,
    },
    havarijne: {
      baseRatePct: 3.7, minDeductiblePct: 5, minPremium: 210,
      onlineDiscountPct: 15, maxBonusPct: 45,
      addonGlass: 42, addonAnimal: 22, addonNaturalDisaster: 32, addonTheft: 38,
    },
  },
  {
    id: "kooperativa",
    name: "Kooperativa poisťovňa",
    short: "Kooperativa",
    brandColor: "oklch(0.55 0.19 155)",
    homepage: "https://www.koop.sk",
    calculatorUrl: "https://www.koop.sk/produkty/poistenie-vozidiel",
    tagline: "Silný hráč v skupine VIG.",
    strengths: ["Kombinácia PZP + Havarijné", "Sieť zmluvných servisov", "Skoro & priateľsky"],
    products: ["pzp", "havarijne"],
    pzp: {
      base100kw: 279, kwFactor: 1.88, coverageHealth: 6.07, coverageProperty: 1.3,
      onlineDiscountPct: 15, maxBonusPct: 55,
    },
    havarijne: {
      baseRatePct: 3.8, minDeductiblePct: 5, minPremium: 215,
      onlineDiscountPct: 10, maxBonusPct: 50,
      addonGlass: 44, addonAnimal: 24, addonNaturalDisaster: 34, addonTheft: 39,
    },
  },
  {
    id: "uniqa",
    name: "Uniqa poisťovňa",
    short: "Uniqa",
    brandColor: "oklch(0.55 0.20 30)",
    homepage: "https://www.uniqa.sk",
    calculatorUrl: "https://www.uniqa.sk/motoristi/kalkulacka-pzp/",
    tagline: "Rakúska istota s dôrazom na servis.",
    strengths: ["Krytie do 7 mil. €", "Bonus 60%", "Online do 2 minút"],
    products: ["pzp", "havarijne"],
    pzp: {
      base100kw: 268, kwFactor: 1.82, coverageHealth: 7.0, coverageProperty: 1.3,
      onlineDiscountPct: 20, maxBonusPct: 60,
    },
    havarijne: {
      baseRatePct: 3.6, minDeductiblePct: 5, minPremium: 205,
      onlineDiscountPct: 12, maxBonusPct: 50,
      addonGlass: 40, addonAnimal: 22, addonNaturalDisaster: 30, addonTheft: 36,
    },
  },
  {
    id: "union",
    name: "Union poisťovňa",
    short: "Union",
    brandColor: "oklch(0.55 0.19 260)",
    homepage: "https://www.union.sk",
    calculatorUrl: "https://www.union.sk/poistenie-auta-pzp/",
    tagline: "Slovenský značka skupiny Achmea.",
    strengths: ["Zľava za bezškodovosť", "Rýchle uzavretie zmluvy"],
    products: ["pzp", "havarijne"],
    pzp: {
      base100kw: 275, kwFactor: 1.86, coverageHealth: 6.07, coverageProperty: 1.22,
      onlineDiscountPct: 25, maxBonusPct: 55,
    },
    havarijne: {
      baseRatePct: 3.75, minDeductiblePct: 5, minPremium: 210,
      onlineDiscountPct: 12, maxBonusPct: 45,
      addonGlass: 42, addonAnimal: 22, addonNaturalDisaster: 32, addonTheft: 37,
    },
  },
  {
    id: "wustenrot",
    name: "Wüstenrot poisťovňa",
    short: "Wüstenrot",
    brandColor: "oklch(0.55 0.20 60)",
    homepage: "https://www.wuestenrot.sk",
    calculatorUrl: "https://www.wuestenrot.sk/poistenie-auta/pzp",
    tagline: "Stabilná poisťovňa pre nemotné vozidlá.",
    strengths: ["Predĺžená záruka", "Zľava pre stálych klientov"],
    products: ["pzp", "havarijne"],
    pzp: {
      base100kw: 282, kwFactor: 1.9, coverageHealth: 6.07, coverageProperty: 1.3,
      onlineDiscountPct: 15, maxBonusPct: 50,
    },
    havarijne: {
      baseRatePct: 3.85, minDeductiblePct: 5, minPremium: 215,
      onlineDiscountPct: 10, maxBonusPct: 45,
      addonGlass: 44, addonAnimal: 24, addonNaturalDisaster: 34, addonTheft: 40,
    },
  },
  {
    id: "csob-poistovna",
    name: "ČSOB Poisťovňa",
    short: "ČSOB",
    brandColor: "oklch(0.55 0.18 260)",
    homepage: "https://www.csob.sk/poistenie",
    calculatorUrl: "https://www.csob.sk/poistenie/auto/pzp",
    tagline: "Súčasť bankovej skupiny KBC.",
    strengths: ["Zľava pre klientov ČSOB", "Digitálne podpisovanie"],
    products: ["pzp", "havarijne"],
    pzp: {
      base100kw: 278, kwFactor: 1.87, coverageHealth: 6.07, coverageProperty: 1.22,
      onlineDiscountPct: 20, maxBonusPct: 55,
    },
    havarijne: {
      baseRatePct: 3.8, minDeductiblePct: 5, minPremium: 210,
      onlineDiscountPct: 12, maxBonusPct: 50,
      addonGlass: 43, addonAnimal: 23, addonNaturalDisaster: 33, addonTheft: 38,
    },
  },
  {
    id: "komunalna",
    name: "Komunálna poisťovňa",
    short: "Komunálna",
    brandColor: "oklch(0.55 0.19 155)",
    homepage: "https://www.kpas.sk",
    calculatorUrl: "https://www.kpas.sk/poistenie/pzp",
    tagline: "Vienna Insurance Group.",
    strengths: ["Široké krytie", "Pobočky v každom meste"],
    products: ["pzp", "havarijne"],
    pzp: {
      base100kw: 280, kwFactor: 1.88, coverageHealth: 6.07, coverageProperty: 1.3,
      onlineDiscountPct: 12, maxBonusPct: 55,
    },
    havarijne: {
      baseRatePct: 3.82, minDeductiblePct: 5, minPremium: 212,
      onlineDiscountPct: 10, maxBonusPct: 45,
      addonGlass: 43, addonAnimal: 23, addonNaturalDisaster: 33, addonTheft: 39,
    },
  },
  {
    id: "colonnade",
    name: "Colonnade Insurance",
    short: "Colonnade",
    brandColor: "oklch(0.55 0.18 40)",
    homepage: "https://www.colonnade.sk",
    calculatorUrl: "https://www.colonnade.sk/poistenie-auta",
    tagline: "Súčasť skupiny Fairfax Financial.",
    strengths: ["Prémiové krytie", "Bez územných obmedzení"],
    products: ["pzp", "havarijne"],
    pzp: {
      base100kw: 290, kwFactor: 1.92, coverageHealth: 6.07, coverageProperty: 1.3,
      onlineDiscountPct: 10, maxBonusPct: 50,
    },
    havarijne: {
      baseRatePct: 3.95, minDeductiblePct: 5, minPremium: 225,
      onlineDiscountPct: 8, maxBonusPct: 40,
      addonGlass: 46, addonAnimal: 26, addonNaturalDisaster: 36, addonTheft: 41,
    },
  },
  {
    id: "groupama",
    name: "Groupama poisťovňa",
    short: "Groupama",
    brandColor: "oklch(0.6 0.18 140)",
    homepage: "https://www.groupama.sk",
    calculatorUrl: "https://www.groupama.sk/poistenie-auta",
    tagline: "Francúzska skupina s dôrazom na klienta.",
    strengths: ["Zľavy pre mladých vodičov po 3 rokoch", "Rýchle vybavenie"],
    products: ["pzp"],
    pzp: {
      base100kw: 274, kwFactor: 1.84, coverageHealth: 6.07, coverageProperty: 1.22,
      onlineDiscountPct: 22, maxBonusPct: 55,
    },
  },
  {
    id: "genertel",
    name: "Genertel",
    short: "Genertel",
    brandColor: "oklch(0.6 0.2 30)",
    homepage: "https://www.genertel.sk",
    calculatorUrl: "https://www.genertel.sk/kalkulacka-pzp",
    tagline: "100% online poisťovňa (skupina Generali).",
    strengths: ["Najvyššia online zľava", "Bez papierov"],
    products: ["pzp"],
    pzp: {
      base100kw: 260, kwFactor: 1.8, coverageHealth: 6.07, coverageProperty: 1.22,
      onlineDiscountPct: 35, maxBonusPct: 55,
    },
  },
];

export function findInsurer(id: string): Insurer | undefined {
  return insurers.find((i) => i.id === id);
}

// -----------------------------------------------------------------
// Výpočet
// -----------------------------------------------------------------

export type InsuranceQuote = {
  insurer: Insurer;
  product: InsuranceProduct;
  annual: number;      // ročné poistné (EUR)
  monthly: number;     // orientačná mesačná splátka
  addonsTotal: number; // súčet pripoistení
  discountPct: number; // celková zľava (bonus + online)
  score: number;       // 0..100 (naše skóre — pomer cena/krytie)
  eligible: boolean;
  reason?: string;
  breakdown: {
    base: number;
    ageFactor: number;
    regionFactor: number;
    fuelFactor: number;
    kmFactor: number;
    usageFactor: number;
    vehicleAgeFactor: number;
    bonusPct: number;
    onlinePct: number;
  };
};

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

// --- Rizikové koeficienty (spoločné pre PZP aj Havarijné) ---

function ageFactor(driverAge: number, drivingYears: number): number {
  // Mladí a začiatočníci = najvyššie riziko.
  if (driverAge < 21) return 1.55;
  if (driverAge < 25) return 1.35;
  if (drivingYears < 2) return 1.25;
  if (driverAge >= 25 && driverAge <= 35) return 1.05;
  if (driverAge > 35 && driverAge <= 65) return 1.0;
  if (driverAge > 65 && driverAge <= 75) return 1.15;
  return 1.35; // 75+
}

function regionFactor(region: RegionCode): number {
  return regions.find((r) => r.code === region)?.factor ?? 1.0;
}

function fuelFactor(fuel: FuelType): number {
  switch (fuel) {
    case "electro": return 0.88;      // motivačná zľava
    case "plugin_hybrid": return 0.94;
    case "hybrid_benzin": return 0.96;
    case "hybrid_diesel": return 0.98;
    case "benzin": return 1.0;
    case "diesel": return 1.03;
    case "lpg": return 1.05;          // vyššie riziko požiaru
    case "cng": return 1.05;
  }
}

function kmFactor(km: number): number {
  if (km <= 10000) return 0.92;
  if (km <= 20000) return 1.0;
  if (km <= 30000) return 1.08;
  if (km <= 50000) return 1.18;
  return 1.3;
}

function usageFactor(usage: VehicleUsage): number {
  return usage === "taxi" ? 1.6 : usage === "business" ? 1.15 : 1.0;
}

function vehicleAgeFactor(year: number, product: InsuranceProduct): number {
  const age = new Date().getFullYear() - year;
  if (product === "havarijne") {
    // Havarijné pre veľmi staré autá = drahšie/relatívne
    if (age <= 3) return 0.95;
    if (age <= 6) return 1.0;
    if (age <= 10) return 1.1;
    if (age <= 15) return 1.25;
    return 1.45;
  }
  // PZP — vek vozidla má menší dopad
  if (age <= 5) return 1.0;
  if (age <= 10) return 1.02;
  if (age <= 15) return 1.05;
  return 1.08;
}

function bonusPct(bonusYears: number, maxBonusPct: number): number {
  // 5 % za každý bezškodový rok, max podľa poisťovne.
  return Math.min(maxBonusPct, Math.max(0, bonusYears * 5));
}

// --- Hlavný výpočet ---

export function quoteInsurance(insurer: Insurer, input: InsuranceQuoteInput): InsuranceQuote {
  const p = input.product;
  if (!insurer.products.includes(p)) {
    return emptyQuote(insurer, input, `Poisťovňa neponúka ${p === "pzp" ? "PZP" : "Havarijné"}.`);
  }

  const af = ageFactor(input.driverAge, input.drivingYears);
  const rf = regionFactor(input.region);
  const ff = fuelFactor(input.fuel);
  const kf = kmFactor(input.annualKm);
  const uf = usageFactor(input.usage);
  const vaf = vehicleAgeFactor(input.vehicleYear, p);

  let base = 0;
  let addonsTotal = 0;
  let bonus = 0;
  let onlinePct = 0;
  let eligible = true;
  let reason: string | undefined;

  if (p === "pzp") {
    const cfg = insurer.pzp!;
    // Sadzba podľa kW: base pri 100 kW, ± kwFactor za každý kW
    base = cfg.base100kw + (input.kw - 100) * cfg.kwFactor;
    // Reálne minimum
    base = Math.max(120, base);
    bonus = bonusPct(input.bonusYears, cfg.maxBonusPct);
    onlinePct = cfg.onlineDiscountPct;
  } else {
    const cfg = insurer.havarijne!;
    // Havarijné nemá zmysel pre staré autá s malou hodnotou
    if (input.vehicleValue < 1500) {
      eligible = false;
      reason = "Havarijné poistenie sa neuzatvára pre vozidlá s hodnotou pod 1 500 €.";
    }
    const age = new Date().getFullYear() - input.vehicleYear;
    if (age > 15) {
      eligible = false;
      reason = "Väčšina poisťovní nepoisťuje havarijne vozidlá staršie ako 15 rokov.";
    }
    base = Math.max(cfg.minPremium, (cfg.baseRatePct / 100) * input.vehicleValue);
    bonus = bonusPct(input.bonusYears, cfg.maxBonusPct);
    onlinePct = cfg.onlineDiscountPct;
    if (input.addonGlass) addonsTotal += cfg.addonGlass;
    if (input.addonAnimal) addonsTotal += cfg.addonAnimal;
    if (input.addonNaturalDisaster) addonsTotal += cfg.addonNaturalDisaster;
    if (input.addonTheft) addonsTotal += cfg.addonTheft;
  }

  const risked = base * af * rf * ff * kf * uf * vaf;
  const discountPct = clamp(bonus + onlinePct, 0, 70);
  const annual = eligible ? Math.round(risked * (1 - discountPct / 100)) + addonsTotal : 0;
  const monthly = annual > 0 ? Math.round((annual / 12) * 100) / 100 : 0;

  // Skóre: čím lepší pomer krytia/ceny alebo bonusov, tým vyššie
  const coverage = p === "pzp"
    ? insurer.pzp!.coverageHealth * 10 + insurer.pzp!.coverageProperty * 5
    : 100 - (insurer.havarijne!.baseRatePct * 10);
  const score = eligible
    ? clamp(Math.round(coverage + discountPct - annual / 20), 0, 100)
    : 0;

  return {
    insurer,
    product: p,
    annual,
    monthly,
    addonsTotal,
    discountPct,
    score,
    eligible,
    reason,
    breakdown: {
      base: Math.round(base),
      ageFactor: af, regionFactor: rf, fuelFactor: ff, kmFactor: kf,
      usageFactor: uf, vehicleAgeFactor: vaf, bonusPct: bonus, onlinePct,
    },
  };
}

function emptyQuote(insurer: Insurer, input: InsuranceQuoteInput, reason: string): InsuranceQuote {
  return {
    insurer, product: input.product,
    annual: 0, monthly: 0, addonsTotal: 0, discountPct: 0, score: 0,
    eligible: false, reason,
    breakdown: {
      base: 0, ageFactor: 1, regionFactor: 1, fuelFactor: 1, kmFactor: 1,
      usageFactor: 1, vehicleAgeFactor: 1, bonusPct: 0, onlinePct: 0,
    },
  };
}

export function quoteAllInsurance(input: InsuranceQuoteInput): InsuranceQuote[] {
  return insurers
    .filter((i) => i.products.includes(input.product))
    .map((i) => quoteInsurance(i, input))
    .sort((a, b) => {
      if (a.eligible !== b.eligible) return a.eligible ? -1 : 1;
      return a.annual - b.annual;
    });
}

// Default vstupy pre kalkulačku (rozumné SK priemery)
export const defaultInsuranceInput: InsuranceQuoteInput = {
  product: "pzp",
  driverAge: 35,
  drivingYears: 12,
  bonusYears: 8,
  region: "BA",
  vehicleYear: 2019,
  kw: 110,
  ccm: 1998,
  fuel: "benzin",
  annualKm: 15000,
  vehicleValue: 15000,
  usage: "personal",
  addonGlass: true,
  addonAnimal: false,
  addonNaturalDisaster: false,
  addonTheft: false,
};