// Centrálny "systém" pre financovanie: každá banka / leasingovka má
// svoju vlastnú "cestu" (konfiguráciu) — sadzba, min/max suma a doba,
// podporované produkty (úver/leasing), URL na hlavnú stránku, kalkulačku
// a developer dokumentáciu. Kalkulačka na homepage tento zoznam
// prehľadáva a vie počítať jednotlivo aj v režime "all".

export type FinancingProduct = "loan" | "leasing";

export type Provider = {
  id: string;
  name: string;
  short: string;
  kind: "bank" | "leasing" | "nonbank";
  brandColor: string; // oklch
  homepage: string;
  calculatorUrl?: string;
  devDocsUrl?: string;
  products: FinancingProduct[];
  // Modelové parametre (demo — nie oficiálne):
  loan?: ProductConfig;
  leasing?: ProductConfig;
  tagline: string;
  strengths: string[];
};

export type ProductConfig = {
  aprPct: number; // ročná %-sadzba (demo)
  minAmount: number;
  maxAmount: number;
  minMonths: number;
  maxMonths: number;
  processingFeePct?: number; // jednorazový poplatok z istiny
};

export const providers: Provider[] = [
  {
    id: "home-credit",
    name: "Home Credit Slovakia",
    short: "Home Credit",
    kind: "nonbank",
    brandColor: "oklch(0.62 0.19 25)",
    homepage: "https://www.homecredit.sk",
    calculatorUrl: "https://www.homecredit.sk/online-pozicka",
    products: ["loan"],
    loan: { aprPct: 10.9, minAmount: 300, maxAmount: 15000, minMonths: 6, maxMonths: 96, processingFeePct: 0 },
    tagline: "Rýchla online pôžička bez ručiteľa.",
    strengths: ["Online schválenie", "Bez ručiteľa", "Peniaze do 24h"],
  },
  {
    id: "slsp",
    name: "Slovenská sporiteľňa",
    short: "SLSP",
    kind: "bank",
    brandColor: "oklch(0.58 0.20 25)",
    homepage: "https://www.slsp.sk",
    calculatorUrl: "https://www.slsp.sk/sk/kalkulacky",
    devDocsUrl: "https://developers.erstegroup.com/",
    products: ["loan", "leasing"],
    loan: { aprPct: 7.9, minAmount: 500, maxAmount: 40000, minMonths: 6, maxMonths: 96, processingFeePct: 1 },
    leasing: { aprPct: 6.4, minAmount: 3000, maxAmount: 120000, minMonths: 24, maxMonths: 96 },
    tagline: "Najväčšia banka na Slovensku.",
    strengths: ["Široká sieť pobočiek", "Zľava pre klientov", "PSD2 API"],
  },
  {
    id: "vub",
    name: "VÚB banka",
    short: "VÚB",
    kind: "bank",
    brandColor: "oklch(0.55 0.20 260)",
    homepage: "https://www.vub.sk",
    calculatorUrl: "https://www.vub.sk/ludia/kalkulacky.html",
    devDocsUrl: "https://developers.vub.sk",
    products: ["loan", "leasing"],
    loan: { aprPct: 7.5, minAmount: 500, maxAmount: 50000, minMonths: 12, maxMonths: 96, processingFeePct: 0.8 },
    leasing: { aprPct: 6.2, minAmount: 3000, maxAmount: 150000, minMonths: 24, maxMonths: 96 },
    tagline: "Skúsená banková skupina Intesa Sanpaolo.",
    strengths: ["Poistenie schopnosti splácať", "Online žiadosť"],
  },
  {
    id: "tatra",
    name: "Tatra banka",
    short: "Tatra banka",
    kind: "bank",
    brandColor: "oklch(0.55 0.19 250)",
    homepage: "https://www.tatrabanka.sk",
    calculatorUrl: "https://www.tatrabanka.sk/en/personal/loans/consumer-loan-calculator/",
    devDocsUrl: "https://developer.tatrabanka.sk/pages/devportal/sk/",
    products: ["loan", "leasing"],
    loan: { aprPct: 6.9, minAmount: 500, maxAmount: 60000, minMonths: 12, maxMonths: 96, processingFeePct: 0 },
    leasing: { aprPct: 5.9, minAmount: 3000, maxAmount: 200000, minMonths: 24, maxMonths: 96 },
    tagline: "Prémiové bankovníctvo s otvoreným API.",
    strengths: ["Najnižšia sadzba pre bonitných klientov", "Developer portál"],
  },
  {
    id: "raiffeisen",
    name: "Raiffeisen banka",
    short: "Raiffeisen",
    kind: "bank",
    brandColor: "oklch(0.55 0.22 30)",
    homepage: "https://www.raiffeisen.sk",
    calculatorUrl: "https://www.raiffeisen.sk/sk/pozicka/kalkulacka/",
    devDocsUrl: "https://developer.tatrabanka.sk/pages/devportal/sk/",
    products: ["loan"],
    loan: { aprPct: 8.4, minAmount: 500, maxAmount: 35000, minMonths: 12, maxMonths: 84, processingFeePct: 0 },
    tagline: "Priateľská banka pre bežné potreby.",
    strengths: ["Bez poplatku za spracovanie", "Rýchle vybavenie"],
  },
  {
    id: "csob",
    name: "ČSOB",
    short: "ČSOB",
    kind: "bank",
    brandColor: "oklch(0.55 0.18 260)",
    homepage: "https://www.csob.sk",
    calculatorUrl: "https://www.csob.sk/spotrebny-uver",
    devDocsUrl: "https://devportal.csob.sk",
    products: ["loan", "leasing"],
    loan: { aprPct: 7.7, minAmount: 500, maxAmount: 50000, minMonths: 12, maxMonths: 96, processingFeePct: 0.5 },
    leasing: { aprPct: 6.3, minAmount: 3000, maxAmount: 150000, minMonths: 24, maxMonths: 96 },
    tagline: "Súčasť skupiny KBC.",
    strengths: ["Digitálne podpisovanie", "Zľavy pre klientov skupiny"],
  },
  {
    id: "prima",
    name: "Prima banka Slovensko",
    short: "Prima banka",
    kind: "bank",
    brandColor: "oklch(0.60 0.20 35)",
    homepage: "https://www.primabanka.sk",
    calculatorUrl: "https://www.primabanka.sk/pozicka-kalkulacka",
    products: ["loan"],
    loan: { aprPct: 8.9, minAmount: 500, maxAmount: 30000, minMonths: 12, maxMonths: 96, processingFeePct: 0 },
    tagline: "Banka pre všedný deň.",
    strengths: ["Nízka splátka", "Bez skrytých poplatkov"],
  },
  {
    id: "unicredit",
    name: "UniCredit Bank",
    short: "UniCredit",
    kind: "bank",
    brandColor: "oklch(0.55 0.20 25)",
    homepage: "https://www.unicreditbank.sk",
    calculatorUrl: "https://www.unicreditbank.sk/en/obcane/formulare/calculator-form-presto-loan.html",
    devDocsUrl: "https://developer.unicredit.eu",
    products: ["loan", "leasing"],
    loan: { aprPct: 7.2, minAmount: 1000, maxAmount: 50000, minMonths: 12, maxMonths: 96, processingFeePct: 0.9 },
    leasing: { aprPct: 6.1, minAmount: 5000, maxAmount: 200000, minMonths: 24, maxMonths: 96 },
    tagline: "Európska banková skupina s globálnym API.",
    strengths: ["PRESTO úver", "Globálne API"],
  },
  {
    id: "b365",
    name: "365.bank",
    short: "365.bank",
    kind: "bank",
    brandColor: "oklch(0.65 0.20 55)",
    homepage: "https://365.bank",
    calculatorUrl: "https://365.bank/kalkulacky/uverova-kalkulacka",
    devDocsUrl: "https://www.postovabanka.sk/psd2_tpp/",
    products: ["loan"],
    loan: { aprPct: 8.1, minAmount: 500, maxAmount: 35000, minMonths: 12, maxMonths: 96, processingFeePct: 0 },
    tagline: "Digitálna banka pre novú generáciu.",
    strengths: ["Kompletne online", "Rýchle schválenie"],
  },
  {
    id: "mbank",
    name: "mBank",
    short: "mBank",
    kind: "bank",
    brandColor: "oklch(0.55 0.22 30)",
    homepage: "https://www.mbank.sk",
    calculatorUrl: "https://www.mbank.sk/kalkulacky/sk_mpujcka.html",
    products: ["loan"],
    loan: { aprPct: 8.6, minAmount: 500, maxAmount: 30000, minMonths: 12, maxMonths: 96, processingFeePct: 0 },
    tagline: "mPôžička s výhodnými podmienkami.",
    strengths: ["Bez poplatkov", "Online žiadosť"],
  },
  {
    id: "otp",
    name: "OTP Banka Slovensko",
    short: "OTP",
    kind: "bank",
    brandColor: "oklch(0.55 0.19 155)",
    homepage: "https://www.otpbanka.sk",
    calculatorUrl: "https://www.otpbanka.sk/produktove-kalkulacky-1",
    products: ["loan"],
    loan: { aprPct: 8.3, minAmount: 500, maxAmount: 30000, minMonths: 12, maxMonths: 96, processingFeePct: 0.5 },
    tagline: "Stabilná banka s tradíciou.",
    strengths: ["Predikovateľné splátky", "Individuálny prístup"],
  },
  {
    id: "csob-leasing",
    name: "ČSOB Leasing",
    short: "ČSOB Leasing",
    kind: "leasing",
    brandColor: "oklch(0.55 0.18 260)",
    homepage: "https://www.csobleasing.sk",
    calculatorUrl: "https://www.csobleasing.sk/leasingova-kalkulacka/",
    products: ["leasing"],
    leasing: { aprPct: 6.0, minAmount: 3000, maxAmount: 200000, minMonths: 24, maxMonths: 96 },
    tagline: "Špecialista na financovanie vozidiel.",
    strengths: ["Leasing na nové aj ojazdené", "Poistenie v splátke"],
  },
  {
    id: "tatra-leasing",
    name: "Tatra-Leasing",
    short: "Tatra-Leasing",
    kind: "leasing",
    brandColor: "oklch(0.55 0.19 250)",
    homepage: "https://www.tatraleasing.sk",
    calculatorUrl: "https://www.tatraleasing.sk/leasingovy-asistent/nove-financovanie",
    products: ["leasing"],
    leasing: { aprPct: 5.8, minAmount: 3000, maxAmount: 250000, minMonths: 24, maxMonths: 96 },
    tagline: "Súčasť skupiny Tatra banka.",
    strengths: ["Rýchly leasing", "Leasingový asistent online"],
  },
];

export function findProvider(id: string): Provider | undefined {
  return providers.find((p) => p.id === id);
}

export type Quote = {
  provider: Provider;
  product: FinancingProduct;
  monthly: number;
  total: number;
  totalInterest: number;
  processingFee: number;
  apr: number;
  months: number;
  amount: number;
  score: number; // 0..100 (naše ohodnotenie — vyššie = lepšie)
  eligible: boolean;
  reason?: string;
};

export function quote(
  provider: Provider,
  product: FinancingProduct,
  amount: number,
  months: number
): Quote {
  const cfg = product === "loan" ? provider.loan : provider.leasing;
  if (!cfg) {
    return {
      provider,
      product,
      monthly: 0,
      total: 0,
      totalInterest: 0,
      processingFee: 0,
      apr: 0,
      months,
      amount,
      score: 0,
      eligible: false,
      reason: `Neponúka ${product === "loan" ? "úver" : "leasing"}.`,
    };
  }
  const inRange =
    amount >= cfg.minAmount &&
    amount <= cfg.maxAmount &&
    months >= cfg.minMonths &&
    months <= cfg.maxMonths;
  const r = cfg.aprPct / 100 / 12;
  const monthly = r === 0 ? amount / months : (amount * r) / (1 - Math.pow(1 + r, -months));
  const processingFee = ((cfg.processingFeePct ?? 0) / 100) * amount;
  const total = monthly * months + processingFee;
  const totalInterest = total - amount;
  // Skóre: nižšia APR + nižší poplatok = vyššie skóre
  const score = Math.max(
    0,
    Math.round(100 - cfg.aprPct * 6 - (cfg.processingFeePct ?? 0) * 3)
  );
  return {
    provider,
    product,
    monthly,
    total,
    totalInterest,
    processingFee,
    apr: cfg.aprPct,
    months,
    amount,
    score,
    eligible: inRange,
    reason: inRange
      ? undefined
      : `Mimo rozsahu ${cfg.minAmount}–${cfg.maxAmount} € / ${cfg.minMonths}–${cfg.maxMonths} mes.`,
  };
}

export function quoteAll(product: FinancingProduct, amount: number, months: number): Quote[] {
  return providers
    .filter((p) => p.products.includes(product))
    .map((p) => quote(p, product, amount, months))
    .sort((a, b) => {
      if (a.eligible !== b.eligible) return a.eligible ? -1 : 1;
      return a.monthly - b.monthly;
    });
}