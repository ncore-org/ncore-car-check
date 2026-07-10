/* ------------------------------------------------------------------ */
/*  VIN Report — domain types                                         */
/* ------------------------------------------------------------------ */

/** Severity of a recorded accident */
export type AccidentSeverity = "low" | "medium" | "high" | "critical";

/** A single accident / insurance event */
export interface AccidentRecord {
  date: string;       // "2016-03-12"
  type: string;       // "Ľahká nehoda"
  damage: string;     // "Predný nárazník, ľavý svetlomet"
  severity: AccidentSeverity;
}

/** A KM reading at a point in time */
export interface KmRecord {
  year: number;
  km: number;
  source: string;     // "STK" | "Servis" | "Aukcia" | ...
}

/** A service / maintenance event */
export interface ServiceRecord {
  date: string;       // "2012-05"
  task: string;       // "Výmena oleja + filter"
  km: number;
  shop: string;       // "BMW Servis BA"
}

/** Leasing / liens status */
export interface LeasingInfo {
  active: boolean;
  note: string;
}

/** Status badge shown in the result header */
export interface StatusBadge {
  label: string;
  type: "positive" | "warning" | "negative" | "info";
  icon: string;       // lucide icon name
}

/** Photo gallery image */
export interface PhotoRecord {
  url: string;
  thumb?: string;
  caption?: string;
}

/** Full VIN report */
export interface VinReport {
  vin: string;
  plate: string;
  brand: string;
  model: string;
  year: number;
  engine: string;
  fuel: string;
  color: string;

  /** Overall score 0-100 */
  score: number;
  /** Current odometer reading */
  km: number;

  kmHistory: KmRecord[];
  accidents: AccidentRecord[];
  serviceHistory: ServiceRecord[];
  leasing: LeasingInfo;
  equipment: string[];
  photos: PhotoRecord[];

  /** Computed badges (can be derived server-side or client-side) */
  badges?: StatusBadge[];
}

/** API response envelope */
export interface VinApiResponse {
  success: boolean;
  data?: VinReport;
  error?: string;
  /** Time in ms the lookup took */
  elapsedMs?: number;
}

/** Lookup request parameters */
export interface VinLookupRequest {
  vin: string;
  /** Extended report (paid) */
  full?: boolean;
}

/** VIN validation result */
export interface VinValidation {
  valid: boolean;
  normalizedVin: string;
  error?: string;
}
