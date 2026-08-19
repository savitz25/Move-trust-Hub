import {
  STATE_MATCH_RULE_VERSION,
  type ProviderIdentityInput,
  type StateAuthorityRecord,
  type StateMatchStatus,
} from "./types";

const normalizeText = (value?: string) =>
  (value ?? "").toUpperCase().replace(/\b(LLC|INC|CORP|CORPORATION|COMPANY|CO)\b/g, "").replace(/[^A-Z0-9]/g, "");
const normalizePhone = (value?: string) => (value ?? "").replace(/\D/g, "").slice(-10);
const normalizePostal = (value?: string) => (value ?? "").replace(/\D/g, "").slice(0, 5);

export function matchStateAuthority(provider: ProviderIdentityInput, record: StateAuthorityRecord): {
  status: StateMatchStatus;
  score: number;
  reasonCodes: string[];
  ruleVersion: typeof STATE_MATCH_RULE_VERSION;
} {
  const reasons: string[] = [];
  let score = 0;
  const providerNames = [provider.dbaName, provider.legalName].map(normalizeText).filter(Boolean);
  const stateNames = [record.dbaName, record.legalName].map(normalizeText).filter(Boolean);
  if (providerNames.some((name) => stateNames.includes(name))) { score += 45; reasons.push("NAME_EXACT"); }
  if (normalizePhone(provider.phone) && normalizePhone(provider.phone) === normalizePhone(record.phone)) { score += 30; reasons.push("PHONE_EXACT"); }
  if (normalizePostal(provider.postalCode) && normalizePostal(provider.postalCode) === normalizePostal(record.postalCode)) { score += 10; reasons.push("POSTAL_EXACT"); }
  if (normalizeText(provider.city) && normalizeText(provider.city) === normalizeText(record.city)) { score += 5; reasons.push("CITY_EXACT"); }
  if (normalizeText(provider.address) && normalizeText(provider.address) === normalizeText(record.address)) { score += 25; reasons.push("ADDRESS_EXACT"); }

  // A name alone is never sufficient. Require an exact name plus a second identity signal.
  const corroborated = reasons.includes("NAME_EXACT") && reasons.some((r) => r !== "NAME_EXACT");
  return {
    status: corroborated && score >= 55 ? "STATE_MATCH_HIGH_CONFIDENCE" : "STATE_MATCH_REVIEW",
    score,
    reasonCodes: reasons.length ? reasons : ["NO_DETERMINISTIC_MATCH"],
    ruleVersion: STATE_MATCH_RULE_VERSION,
  };
}
