import type { StateAuthorityRecord } from "./types";

export const NJ_AUTHORITY_MEANINGS = {
  NJ_PM: "PUBLIC_MOVER",
  NJ_PW: "WAREHOUSE_ONLY",
  NJ_PC: "PUBLIC_MOVER_AND_WAREHOUSE",
} as const;

export function normalizeNewJerseyRecord(input: Omit<StateAuthorityRecord, "state" | "authorityType"> & { licenseType: "PM" | "PW" | "PC" }): StateAuthorityRecord {
  return { ...input, state: "NJ", authorityType: `NJ_${input.licenseType}` } as StateAuthorityRecord;
}
