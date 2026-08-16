import type { StateAuthorityRecord, StateEligibility, StateMatchStatus } from "./types";

const active = (status: string) => ["ACTIVE", "REGISTERED", "CURRENT"].includes(status.trim().toUpperCase());
const inactive = (status: string) => ["INACTIVE", "EXPIRED", "REVOKED", "SUSPENDED", "CLOSED"].includes(status.trim().toUpperCase());

export function deriveStateEligibility(record: StateAuthorityRecord | undefined, matchStatus: StateMatchStatus): StateEligibility {
  if (!record || matchStatus === "STATE_NOT_FOUND") return "STATE_AUTHORITY_NOT_FOUND";
  if (matchStatus !== "STATE_MATCH_HIGH_CONFIDENCE") return "STATE_AUTHORITY_REVIEW";
  if (inactive(record.status)) return "STATE_INACTIVE_LOCAL_MOVER";
  if (!active(record.status)) return "STATE_AUTHORITY_REVIEW";
  if (record.authorityType === "NJ_PW") return "STATE_AUTHORITY_REVIEW";
  if (record.authorityType === "FL_MB") return "STATE_VERIFIED_MOVING_BROKER";
  return "STATE_VERIFIED_LOCAL_MOVER";
}

export function mayRequireDerivedPlacement(input: {
  eligibility: StateEligibility;
  googleOnboardingAttempted: boolean;
  identityResolved: boolean;
  websiteDiscoveryAttempted: boolean;
  usefulExplicitGeography: boolean;
}): boolean {
  return input.eligibility === "STATE_VERIFIED_LOCAL_MOVER" && input.googleOnboardingAttempted &&
    input.identityResolved && input.websiteDiscoveryAttempted && !input.usefulExplicitGeography;
}
