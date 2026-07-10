/* ------------------------------------------------------------------ */
/*  VIN lookup API client — talks to backend proxy                     */
/*  Falls back to mock when no server is available                     */
/* ------------------------------------------------------------------ */
import type { VinApiResponse, VinLookupRequest, VinValidation } from "./types";
import { mockLookup, validateVin } from "./mock";

const VIN_API_BASE = "/api/vin";

/** Check if the backend API is reachable (fast probe) */
async function isBackendAlive(): Promise<boolean> {
  try {
    const res = await fetch(`${VIN_API_BASE}/health`, {
      method: "HEAD",
      signal: AbortSignal.timeout(2000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

let backendAvailable: boolean | null = null;

async function detectBackend(): Promise<boolean> {
  if (backendAvailable !== null) return backendAvailable;
  backendAvailable = await isBackendAlive();
  if (!backendAvailable) {
    console.info("[vin-api] Backend unreachable — using mock data");
  }
  return backendAvailable;
}

/** Primary VIN lookup */
export async function lookupVin(req: VinLookupRequest): Promise<VinApiResponse> {
  const validation = validateVin(req.vin);
  if (!validation.valid) {
    return { success: false, error: validation.error };
  }

  const useBackend = await detectBackend();

  if (!useBackend) {
    return mockLookup({ ...req, vin: validation.vin });
  }

  try {
    const res = await fetch(`${VIN_API_BASE}/lookup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vin: validation.vin,
        full: req.full ?? false,
      }),
      signal: AbortSignal.timeout(30_000),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "Unknown error");
      return { success: false, error: `Server error (${res.status}): ${text}` };
    }

    const json: VinApiResponse = await res.json();
    return json;
  } catch (err) {
    // Network error — fall back to mock for resilience
    console.warn("[vin-api] Backend request failed, falling back to mock:", err);
    backendAvailable = false;
    return mockLookup({ ...req, vin: validation.vin });
  }
}

/** Force re-check backend availability */
export function resetBackendDetection(): void {
  backendAvailable = null;
}

export { validateVin };
export type { VinValidation };
