/* ------------------------------------------------------------------ */
/*  VIN Library — barrel export                                        */
/* ------------------------------------------------------------------ */
export { lookupVin, validateVin, resetBackendDetection } from "./api";
export { mockLookup } from "./mock";
export type {
  VinReport,
  VinApiResponse,
  VinLookupRequest,
  VinValidation,
  AccidentRecord,
  KmRecord,
  ServiceRecord,
  LeasingInfo,
  StatusBadge,
  PhotoRecord,
  AccidentSeverity,
} from "./types";
