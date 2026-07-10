/* ------------------------------------------------------------------ */
/*  Mock VIN data — returns realistic responses for development        */
/* ------------------------------------------------------------------ */
import type { VinReport, VinApiResponse, VinLookupRequest } from "./types";

const MOCK_REPORT: VinReport = {
  vin: "WBAXB51050C589952",
  plate: "SK 123AB",
  brand: "BMW",
  model: "X5 (E70)",
  year: 2010,
  engine: "3.0d (245 PS)",
  fuel: "Diesel",
  color: "Carbon Black",
  score: 82,
  km: 185_000,
  kmHistory: [
    { year: 2012, km: 28_000, source: "STK" },
    { year: 2015, km: 72_000, source: "Servis" },
    { year: 2017, km: 98_000, source: "STK" },
    { year: 2019, km: 131_000, source: "Servis" },
    { year: 2021, km: 157_000, source: "Aukcia" },
    { year: 2023, km: 174_000, source: "STK" },
  ],
  accidents: [
    { date: "2016-03-12", type: "Ľahká nehoda", damage: "Predný nárazník, ľavý svetlomet", severity: "low" },
    { date: "2019-08-24", type: "Poistná udalosť", damage: "Pravé zadné dvere, blatník", severity: "medium" },
  ],
  serviceHistory: [
    { date: "2012-05", task: "Výmena oleja + filter", km: 28_000, shop: "BMW Servis BA" },
    { date: "2015-09", task: "Veľký servis (rozvody, brzdy)", km: 72_000, shop: "AutoMoto Nitra" },
    { date: "2017-11", task: "Výmena batérie, pneumatiky", km: 98_000, shop: "PneuCentrum" },
    { date: "2019-03", task: "Kontrola podvozku, tlmiče", km: 131_000, shop: "BMW Servis BA" },
    { date: "2021-07", task: "Výmena spojky, DPF filter", km: 157_000, shop: "DieselExpert" },
    { date: "2023-01", task: "Ročný servis, STK+EK", km: 174_000, shop: "BMW Servis BA" },
  ],
  leasing: { active: false, note: "Bez záložného práva" },
  equipment: [
    "Tempomat", "Parkovacie senzory", "Vyhrievané sedadlá", "Navi Pro",
    "Bluetooth", "Xenóny", "Asistent jazdných pruhov", "Dotykový displej",
  ],
  photos: [],
};

const VIN_REGISTRY = new Map<string, VinReport>([
  ["WBAXB51050C589952", MOCK_REPORT],
  ["VF1DC2B0H12345678", {
    vin: "VF1DC2B0H12345678",
    plate: "SK 456CD",
    brand: "Renault",
    model: "Megane III",
    year: 2015,
    engine: "1.5 dCi (110 PS)",
    fuel: "Diesel",
    color: "Modrá metalíza",
    score: 45,
    km: 210_000,
    kmHistory: [
      { year: 2015, km: 0, source: "Prvý zápis" },
      { year: 2017, km: 45_000, source: "STK" },
      { year: 2019, km: 88_000, source: "Servis" },
      { year: 2020, km: 190_000, source: "Aukcia" },
      { year: 2023, km: 210_000, source: "STK" },
    ],
    accidents: [
      { date: "2018-06-20", type: "Poistná udalosť", damage: "Ľavý bok, zadné dvere", severity: "high" },
      { date: "2021-11-03", type: "Totálna škoda", damage: "Čelný náraz, airbagy", severity: "critical" },
    ],
    serviceHistory: [
      { date: "2015-10", task: "Prvý servis", km: 12_000, shop: "Renault BA" },
      { date: "2017-03", task: "Výmena oleja", km: 45_000, shop: "AutoOprava KE" },
    ],
    leasing: { active: true, note: "Aktívny leasing do 2026 — Volkswagen Financial" },
    equipment: ["Tempomat", "Bluetooth", "Manuálna klimatizácia"],
    photos: [],
  }],
  ["TMBZZZ3T9L1234567", {
    vin: "TMBZZZ3T9L1234567",
    plate: "SK 789EF",
    brand: "Škoda",
    model: "Octavia III (5E)",
    year: 2020,
    engine: "2.0 TDI (150 PS)",
    fuel: "Diesel",
    color: "Biela",
    score: 94,
    km: 62_000,
    kmHistory: [
      { year: 2020, km: 0, source: "Prvý zápis" },
      { year: 2021, km: 14_500, source: "STK" },
      { year: 2022, km: 31_000, source: "Servis" },
      { year: 2023, km: 48_000, source: "STK" },
      { year: 2024, km: 62_000, source: "Servis" },
    ],
    accidents: [],
    serviceHistory: [
      { date: "2021-04", task: "Olej + filter", km: 14_500, shop: "Škoda Servis BA" },
      { date: "2022-09", task: "Veľký servis", km: 31_000, shop: "Škoda Servis BA" },
      { date: "2024-01", task: "Brzdy + klimatizácia", km: 62_000, shop: "AutoServis NR" },
    ],
    leasing: { active: false, note: "Bez záložného práva" },
    equipment: [
      "Tempomat", "Parkovacie senzory", "Vyhrievané sedadlá", "Apple CarPlay",
      "Adaptívny tempomat", "Kamera", "Bezkľúčový štart", "Dvojzónová klíma",
      "LED svetlá", "Navigácia Columbus",
    ],
    photos: [],
  }],
]);

/* Simulate network + processing delay */
function delay(ms = 800 + Math.random() * 1200): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

/* Validate and normalize VIN */
function normalizeVin(raw: string): { valid: boolean; vin: string; error?: string } {
  const v = raw.trim().toUpperCase();
  if (v.length < 11) return { valid: false, vin: v, error: "VIN má zvyčajne 17 znakov. Skontrolujte zadanie." };
  if (!/^[A-HJ-NPR-Z0-9]{11,17}$/.test(v)) return { valid: false, vin: v, error: "VIN obsahuje nepovolené znaky." };
  return { valid: true, vin: v };
}

export async function mockLookup(req: VinLookupRequest): Promise<VinApiResponse> {
  const { vin, full } = req;
  const normalized = normalizeVin(vin);
  if (!normalized.valid) {
    return { success: false, error: normalized.error! };
  }

  await delay(full ? 1500 : 800);

  const report = VIN_REGISTRY.get(normalized.vin);
  if (!report) {
    return {
      success: false,
      error: `VIN ${normalized.vin} nebol nájdený v žiadnej z pripojených databáz.`,
    };
  }

  return {
    success: true,
    data: report,
    elapsedMs: 800,
  };
}

export function validateVin(raw: string) {
  return normalizeVin(raw);
}
