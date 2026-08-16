import {
  digitsOnlyPhone,
  normalizeNameForMatch,
  scoreGooglePlaceMatch,
} from "@/lib/verification/google-places-name-queries";
import {
  GOOGLE_MATCH_RULE_VERSION,
  type GoogleCandidate,
  type GoogleMatchDecision,
  type RegulatoryIdentity,
} from "./types";

const norm = (v?: string | null) =>
  (v ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");
const street = (v?: string | null) =>
  (v ?? "")
    .toLowerCase()
    .replace(/\b(street|st|road|rd|avenue|ave|boulevard|blvd|suite|ste)\b/g, "")
    .replace(/[^a-z0-9]/g, "");
export function decideGoogleMatch(
  identity: RegulatoryIdentity,
  candidate: GoogleCandidate | null,
  options?: {
    existingPlaceId?: string | null;
    plausibleCandidates?: number;
    subscriptionState?: string;
  },
): GoogleMatchDecision {
  if (!candidate)
    return {
      status: "GOOGLE_NO_MATCH",
      score: 0,
      reasonCodes: [],
      conflictCodes: [],
      placeId: null,
      ruleVersion: GOOGLE_MATCH_RULE_VERSION,
    };
  const reasons: string[] = [];
  const conflicts: string[] = [];
  const expectedName = identity.dbaName?.trim() || identity.legalName;
  const googleName = normalizeNameForMatch(candidate.displayName);
  const dba = normalizeNameForMatch(identity.dbaName ?? "");
  const legal = normalizeNameForMatch(identity.legalName);
  if (dba && googleName === dba) reasons.push("DBA_EXACT");
  else if (googleName === legal) reasons.push("LEGAL_NAME_EXACT");
  else reasons.push("NAME_FUZZY");
  const ep = digitsOnlyPhone(identity.phone),
    gp = digitsOnlyPhone(candidate.phone);
  if (ep.length >= 10 && gp.length >= 10) {
    if (ep === gp) reasons.push("PHONE_EXACT");
    else conflicts.push("PHONE_CONFLICT");
  }
  const addr = norm(candidate.formattedAddress);
  if (
    identity.street &&
    street(candidate.formattedAddress).includes(street(identity.street))
  )
    reasons.push("STREET_EXACT");
  else if (identity.street && candidate.formattedAddress)
    conflicts.push("STREET_CONFLICT");
  if (identity.city && addr.includes(norm(identity.city)))
    reasons.push("CITY_EXACT");
  if (
    identity.state &&
    new RegExp(`\\b${identity.state}\\b`, "i").test(
      candidate.formattedAddress ?? "",
    )
  )
    reasons.push("STATE_EXACT");
  else if (identity.state && candidate.formattedAddress)
    conflicts.push("STATE_CONFLICT");
  let score = scoreGooglePlaceMatch(
    {
      displayName: candidate.displayName,
      formattedAddress: candidate.formattedAddress,
      phone: candidate.phone,
      websiteUri: candidate.websiteUri,
    },
    expectedName,
    identity.city ?? "",
    identity.state ?? "",
    identity.phone,
    identity.website,
    null,
  );
  if (reasons.includes("STREET_EXACT")) score = Math.min(100, score + 14);
  if (conflicts.length) score = Math.min(score, 65);
  if (candidate.businessStatus === "CLOSED_PERMANENTLY")
    return {
      status: "GOOGLE_CLOSED_BUSINESS",
      score,
      reasonCodes: reasons,
      conflictCodes: conflicts,
      placeId: candidate.placeId,
      ruleVersion: GOOGLE_MATCH_RULE_VERSION,
    };
  if ((options?.plausibleCandidates ?? 1) > 1 && score < 90)
    return {
      status: "GOOGLE_MULTIPLE_PLAUSIBLE_MATCHES",
      score,
      reasonCodes: reasons,
      conflictCodes: conflicts,
      placeId: candidate.placeId,
      ruleVersion: GOOGLE_MATCH_RULE_VERSION,
    };
  const corroborated =
    (reasons.includes("PHONE_EXACT") || reasons.includes("STREET_EXACT")) &&
    (reasons.includes("DBA_EXACT") ||
      reasons.includes("LEGAL_NAME_EXACT") ||
      score >= 76);
  if (
    options?.existingPlaceId === candidate.placeId &&
    corroborated &&
    conflicts.length === 0
  )
    return {
      status: "GOOGLE_EXISTING_MATCH_REUSED",
      score,
      reasonCodes: [...reasons, "EXISTING_PLACE_ID"],
      conflictCodes: conflicts,
      placeId: candidate.placeId,
      ruleVersion: GOOGLE_MATCH_RULE_VERSION,
    };
  return {
    status:
      corroborated && conflicts.length === 0
        ? "GOOGLE_MATCH_HIGH_CONFIDENCE"
        : "GOOGLE_MATCH_REVIEW",
    score,
    reasonCodes: reasons,
    conflictCodes: conflicts,
    placeId: candidate.placeId,
    ruleVersion: GOOGLE_MATCH_RULE_VERSION,
  };
}
