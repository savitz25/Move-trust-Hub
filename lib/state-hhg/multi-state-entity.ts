/**
 * MULTI_STATE_REGULATED_ENTITY_V1
 *
 * Regulatory authority identity ≠ canonical business identity.
 * One legal entity may hold FL + WA (+ federal) authorities.
 * One brand / corporate family may contain many distinct legal entities.
 * Google Places requests: 0.
 */
import {
  isFranchiseOrNetworkBrandName,
  normalizeAddressLine,
  normalizeEmail,
  normalizeLegalName,
  normalizePhone,
  normalizeUsdot,
} from '@/lib/state-hhg/normalize';

export const MULTI_STATE_RULESET_VERSION = 'MULTI_STATE_REGULATED_ENTITY_V1';
export const MULTI_STATE_GOOGLE_PLACES_REQUESTS = 0 as const;

export const MULTI_STATE_RESOLUTION_STATES = [
  'SAME_CANONICAL_ENTITY',
  'DISTINCT_LEGAL_ENTITIES',
  'BRANCH_OR_LOCATION_REVIEW',
  'CORPORATE_FAMILY_RELATED',
  'REVIEW_REQUIRED',
  'REJECTED_MATCH',
] as const;
export type MultiStateResolutionState = (typeof MULTI_STATE_RESOLUTION_STATES)[number];

const GENERIC_LOCAL_PARTS = new Set([
  'legal',
  'info',
  'office',
  'admin',
  'contact',
  'hello',
  'support',
  'sales',
  'webmaster',
]);

export function isGenericEnterpriseEmail(email: string | null | undefined): boolean {
  const n = normalizeEmail(email);
  if (!n) return false;
  const local = n.split('@')[0] ?? '';
  return GENERIC_LOCAL_PARTS.has(local);
}

export type MultiStateSubject = {
  legalName: string | null;
  dba?: string | null;
  usdot?: string | null;
  phone?: string | null;
  email?: string | null;
  physicalAddress?: string | null;
  stateCode?: string | null;
};

export type MultiStateClassifyInput = {
  subject: MultiStateSubject;
  candidate: MultiStateSubject;
  /** Official filing/regulator evidence that the two authorities belong to the same legal entity. */
  officialSameEntityTie?: boolean;
  conflictingUsdot?: boolean;
};

export type MultiStateClassifyResult = {
  rulesetVersion: typeof MULTI_STATE_RULESET_VERSION;
  state: MultiStateResolutionState;
  reasons: string[];
  strongEvidence: string[];
  corroboratingEvidence: string[];
  weakEvidence: string[];
  googlePlacesRequests: 0;
};

function legalExact(a: string | null | undefined, b: string | null | undefined): boolean {
  const na = normalizeLegalName(a);
  const nb = normalizeLegalName(b);
  return Boolean(na && nb && na === nb);
}

export function classifyMultiStateEntity(input: MultiStateClassifyInput): MultiStateClassifyResult {
  const { subject, candidate } = input;
  const reasons: string[] = [];
  const strong: string[] = [];
  const corroborating: string[] = [];
  const weak: string[] = [];

  const franchise =
    isFranchiseOrNetworkBrandName(subject.legalName) ||
    isFranchiseOrNetworkBrandName(subject.dba) ||
    isFranchiseOrNetworkBrandName(candidate.legalName) ||
    isFranchiseOrNetworkBrandName(candidate.dba);

  const usdotS = normalizeUsdot(subject.usdot);
  const usdotC = normalizeUsdot(candidate.usdot);
  const legalMatch = legalExact(subject.legalName, candidate.legalName);
  const dbaMatch = legalExact(subject.dba, candidate.dba) || legalExact(subject.dba, candidate.legalName);
  const phoneMatch = Boolean(normalizePhone(subject.phone) && normalizePhone(subject.phone) === normalizePhone(candidate.phone));
  const emailMatch = Boolean(normalizeEmail(subject.email) && normalizeEmail(subject.email) === normalizeEmail(candidate.email));
  const genericEmail = isGenericEnterpriseEmail(subject.email) || isGenericEnterpriseEmail(candidate.email);
  const addrMatch = Boolean(
    normalizeAddressLine(subject.physicalAddress) &&
      normalizeAddressLine(subject.physicalAddress) === normalizeAddressLine(candidate.physicalAddress)
  );
  const sameUsdot = Boolean(usdotS && usdotC && usdotS === usdotC);
  const conflictingUsdot = Boolean(input.conflictingUsdot || (usdotS && usdotC && usdotS !== usdotC));

  if (sameUsdot) strong.push('exact_usdot');
  if (legalMatch && sameUsdot) strong.push('exact_legal_name_and_usdot');
  if (input.officialSameEntityTie) strong.push('official_filing_or_regulator_tie');
  if (legalMatch && (phoneMatch || addrMatch) && !conflictingUsdot) {
    corroborating.push(phoneMatch ? 'exact_legal_name_and_phone' : 'exact_legal_name_and_address');
  }
  if (emailMatch && !genericEmail) corroborating.push('exact_named_email');
  if (emailMatch && genericEmail) weak.push('generic_enterprise_email');
  if (dbaMatch) corroborating.push('exact_dba');
  if (!legalMatch && (emailMatch || dbaMatch)) weak.push('brand_or_mailbox_without_legal_name_match');

  if (franchise && !sameUsdot && !input.officialSameEntityTie) {
    reasons.push('franchise_or_network_brand_without_federal_id');
    return finish('REVIEW_REQUIRED', reasons, strong, corroborating, weak);
  }

  if (conflictingUsdot && !legalMatch) {
    reasons.push('different_legal_name_and_different_usdot');
    return finish('DISTINCT_LEGAL_ENTITIES', reasons, strong, corroborating, weak);
  }

  if (conflictingUsdot && legalMatch) {
    reasons.push('same_normalized_legal_name_but_conflicting_usdot');
    return finish('REVIEW_REQUIRED', reasons, strong, corroborating, weak);
  }

  if (
    (sameUsdot && legalMatch) ||
    (sameUsdot && input.officialSameEntityTie) ||
    (legalMatch && input.officialSameEntityTie)
  ) {
    reasons.push('strong_same_legal_entity_evidence');
    return finish('SAME_CANONICAL_ENTITY', reasons, strong, corroborating, weak);
  }

  if (!legalMatch && (genericEmail || dbaMatch || emailMatch)) {
    reasons.push('shared_brand_or_enterprise_mailbox_with_different_legal_names');
    return finish('CORPORATE_FAMILY_RELATED', reasons, strong, corroborating, weak);
  }

  if (!legalMatch) {
    reasons.push('legal_names_differ');
    return finish('DISTINCT_LEGAL_ENTITIES', reasons, strong, corroborating, weak);
  }

  // Same legal name, no USDOT tie, only weak/corroborating contacts
  if (genericEmail && emailMatch && !phoneMatch && !addrMatch && !sameUsdot) {
    reasons.push('same_legal_name_but_only_generic_email_corroboration');
    return finish('REVIEW_REQUIRED', reasons, strong, corroborating, weak);
  }

  if (phoneMatch || addrMatch) {
    reasons.push('same_legal_name_with_contact_or_address_corroboration_but_no_federal_id');
    return finish('BRANCH_OR_LOCATION_REVIEW', reasons, strong, corroborating, weak);
  }

  reasons.push('insufficient_deterministic_evidence');
  return finish('REVIEW_REQUIRED', reasons, strong, corroborating, weak);
}

function finish(
  state: MultiStateResolutionState,
  reasons: string[],
  strong: string[],
  corroborating: string[],
  weak: string[]
): MultiStateClassifyResult {
  return {
    rulesetVersion: MULTI_STATE_RULESET_VERSION,
    state,
    reasons,
    strongEvidence: strong,
    corroboratingEvidence: corroborating,
    weakEvidence: weak,
    googlePlacesRequests: 0,
  };
}

export type MultiStateAction = 'ATTACH_TO_EXISTING' | 'CREATE_DISTINCT_COMPANY' | 'KEEP_HOLD' | 'REJECT_CANDIDATE_MATCH';

export function actionForResolution(state: MultiStateResolutionState): MultiStateAction {
  if (state === 'SAME_CANONICAL_ENTITY') return 'ATTACH_TO_EXISTING';
  if (state === 'DISTINCT_LEGAL_ENTITIES') return 'CREATE_DISTINCT_COMPANY';
  if (state === 'REJECTED_MATCH') return 'REJECT_CANDIDATE_MATCH';
  return 'KEEP_HOLD';
}
