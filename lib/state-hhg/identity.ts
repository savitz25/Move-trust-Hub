/**
 * Task 011B — fail-closed identity matching for state registry records.
 * Hierarchy: USDOT → prior authority → legal+address → legal+phone → DBA+corroboration.
 * Never auto-match on similar name / city / phone / address fragment / brand alone.
 * Google Places requests: 0.
 */
import {
  isFranchiseOrNetworkBrandName,
  normalizeAddressLine,
  normalizeLegalName,
  normalizePhone,
  normalizeUsdot,
} from '@/lib/state-hhg/normalize';

export const STATE_IDENTITY_DISPOSITIONS = [
  'MATCHED_EXISTING',
  'NEW_PROVIDER_CANDIDATE',
  'REVIEW_REQUIRED',
  'HISTORICAL',
  'OUT_OF_SCOPE',
] as const;
export type StateIdentityDisposition = (typeof STATE_IDENTITY_DISPOSITIONS)[number];

export const STATE_MATCH_METHODS = [
  'exact_usdot',
  'exact_prior_state_authority',
  'exact_legal_name_and_address',
  'exact_legal_name_and_phone',
  'exact_dba_and_corroboration',
  'none',
] as const;
export type StateMatchMethod = (typeof STATE_MATCH_METHODS)[number];

export type CanonicalProviderIdentity = {
  companyId: string;
  legalName: string | null;
  dbaName: string | null;
  publicName: string | null;
  usdot: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  publicationState?: string | null;
  indexable?: boolean | null;
};

export type StateIdentitySubject = {
  legalName: string | null;
  dba: string | null;
  usdot: string | null;
  phone: string | null;
  physicalAddress: string | null;
  city: string | null;
  postalCode: string | null;
  statusNormalized: 'active' | 'inactive' | 'expired' | 'suspended' | 'revoked' | 'unknown';
  roleClass: 'mover' | 'broker' | 'warehouse' | 'other';
  authorityNumber: string | null;
  /** Prior exact authority number → company_id map for this state. */
  priorAuthorityCompanyId?: string | null;
};

export type StateIdentityMatchResult = {
  disposition: StateIdentityDisposition;
  matchedCompanyId: string | null;
  matchMethod: StateMatchMethod;
  matchConfidence: number;
  reviewReason: string | null;
  evidence: Record<string, unknown>;
  franchiseSafetyHold: boolean;
};

function nameExact(a: string | null, b: string | null): boolean {
  const na = normalizeLegalName(a);
  const nb = normalizeLegalName(b);
  return Boolean(na && nb && na === nb);
}

function addressExact(a: string | null, b: string | null): boolean {
  const na = normalizeAddressLine(a);
  const nb = normalizeAddressLine(b);
  return Boolean(na && nb && na === nb);
}

function phoneExact(a: string | null, b: string | null): boolean {
  const na = normalizePhone(a);
  const nb = normalizePhone(b);
  return Boolean(na && nb && na === nb);
}

function providerNames(p: CanonicalProviderIdentity): string[] {
  return [p.legalName, p.dbaName, p.publicName].filter(Boolean) as string[];
}

/**
 * Match a state registry subject against a candidate universe.
 * Fail closed for franchise/network brand collisions.
 */
export function matchStateRegistryIdentity(
  subject: StateIdentitySubject,
  candidates: readonly CanonicalProviderIdentity[]
): StateIdentityMatchResult {
  if (
    subject.statusNormalized === 'inactive' ||
    subject.statusNormalized === 'revoked' ||
    subject.statusNormalized === 'expired'
  ) {
    return {
      disposition: 'HISTORICAL',
      matchedCompanyId: null,
      matchMethod: 'none',
      matchConfidence: 0,
      reviewReason: `status_${subject.statusNormalized}`,
      evidence: { status: subject.statusNormalized },
      franchiseSafetyHold: false,
    };
  }

  if (subject.roleClass === 'warehouse') {
    return {
      disposition: 'OUT_OF_SCOPE',
      matchedCompanyId: null,
      matchMethod: 'none',
      matchConfidence: 0,
      reviewReason: 'warehouse_role',
      evidence: { roleClass: subject.roleClass },
      franchiseSafetyHold: false,
    };
  }

  const brandHold =
    isFranchiseOrNetworkBrandName(subject.legalName) ||
    isFranchiseOrNetworkBrandName(subject.dba);

  // 1. Exact USDOT
  const usdot = normalizeUsdot(subject.usdot);
  if (usdot) {
    const byUsdot = candidates.filter((c) => normalizeUsdot(c.usdot) === usdot);
    if (byUsdot.length === 1) {
      const hit = byUsdot[0];
      // Franchise: still allow USDOT exact match (authority belongs to that entity),
      // but never merge into a different parent solely by brand.
      return {
        disposition: 'MATCHED_EXISTING',
        matchedCompanyId: hit.companyId,
        matchMethod: 'exact_usdot',
        matchConfidence: 1,
        reviewReason: null,
        evidence: { usdot, companyId: hit.companyId },
        franchiseSafetyHold: brandHold,
      };
    }
    if (byUsdot.length > 1) {
      return {
        disposition: 'REVIEW_REQUIRED',
        matchedCompanyId: null,
        matchMethod: 'none',
        matchConfidence: 0,
        reviewReason: 'usdot_collision_multiple_companies',
        evidence: { usdot, companyIds: byUsdot.map((c) => c.companyId) },
        franchiseSafetyHold: brandHold,
      };
    }
  }

  // 2. Exact prior state authority attachment
  if (subject.priorAuthorityCompanyId) {
    const hit = candidates.find((c) => c.companyId === subject.priorAuthorityCompanyId);
    if (hit) {
      return {
        disposition: 'MATCHED_EXISTING',
        matchedCompanyId: hit.companyId,
        matchMethod: 'exact_prior_state_authority',
        matchConfidence: 0.98,
        reviewReason: null,
        evidence: {
          authorityNumber: subject.authorityNumber,
          companyId: hit.companyId,
        },
        franchiseSafetyHold: brandHold,
      };
    }
  }

  // Brand/franchise without USDOT → never auto-match by name
  if (brandHold) {
    return {
      disposition: 'REVIEW_REQUIRED',
      matchedCompanyId: null,
      matchMethod: 'none',
      matchConfidence: 0,
      reviewReason: 'franchise_or_network_brand_fail_closed',
      evidence: {
        legalName: subject.legalName,
        dba: subject.dba,
      },
      franchiseSafetyHold: true,
    };
  }

  // 3. Exact legal name + exact address
  const legalAddrHits = candidates.filter(
    (c) =>
      providerNames(c).some((n) => nameExact(n, subject.legalName)) &&
      addressExact(c.address, subject.physicalAddress)
  );
  if (legalAddrHits.length === 1) {
    return {
      disposition: 'MATCHED_EXISTING',
      matchedCompanyId: legalAddrHits[0].companyId,
      matchMethod: 'exact_legal_name_and_address',
      matchConfidence: 0.95,
      reviewReason: null,
      evidence: {
        legalName: subject.legalName,
        address: subject.physicalAddress,
        companyId: legalAddrHits[0].companyId,
      },
      franchiseSafetyHold: false,
    };
  }
  if (legalAddrHits.length > 1) {
    return {
      disposition: 'REVIEW_REQUIRED',
      matchedCompanyId: null,
      matchMethod: 'none',
      matchConfidence: 0,
      reviewReason: 'legal_name_address_collision',
      evidence: { companyIds: legalAddrHits.map((c) => c.companyId) },
      franchiseSafetyHold: false,
    };
  }

  // 4. Exact legal name + exact phone
  const legalPhoneHits = candidates.filter(
    (c) =>
      providerNames(c).some((n) => nameExact(n, subject.legalName)) &&
      phoneExact(c.phone, subject.phone)
  );
  if (legalPhoneHits.length === 1) {
    return {
      disposition: 'MATCHED_EXISTING',
      matchedCompanyId: legalPhoneHits[0].companyId,
      matchMethod: 'exact_legal_name_and_phone',
      matchConfidence: 0.93,
      reviewReason: null,
      evidence: {
        legalName: subject.legalName,
        phone: normalizePhone(subject.phone),
        companyId: legalPhoneHits[0].companyId,
      },
      franchiseSafetyHold: false,
    };
  }
  if (legalPhoneHits.length > 1) {
    return {
      disposition: 'REVIEW_REQUIRED',
      matchedCompanyId: null,
      matchMethod: 'none',
      matchConfidence: 0,
      reviewReason: 'legal_name_phone_collision',
      evidence: { companyIds: legalPhoneHits.map((c) => c.companyId) },
      franchiseSafetyHold: false,
    };
  }

  // 5. Exact DBA + strong independent corroboration (phone OR address)
  if (subject.dba) {
    const dbaHits = candidates.filter((c) =>
      providerNames(c).some((n) => nameExact(n, subject.dba))
    );
    const corroborated = dbaHits.filter(
      (c) =>
        addressExact(c.address, subject.physicalAddress) ||
        phoneExact(c.phone, subject.phone)
    );
    if (corroborated.length === 1) {
      return {
        disposition: 'MATCHED_EXISTING',
        matchedCompanyId: corroborated[0].companyId,
        matchMethod: 'exact_dba_and_corroboration',
        matchConfidence: 0.9,
        reviewReason: null,
        evidence: {
          dba: subject.dba,
          companyId: corroborated[0].companyId,
        },
        franchiseSafetyHold: false,
      };
    }
    if (dbaHits.length >= 1 && corroborated.length !== 1) {
      return {
        disposition: 'REVIEW_REQUIRED',
        matchedCompanyId: null,
        matchMethod: 'none',
        matchConfidence: 0,
        reviewReason: 'dba_without_unique_corroboration',
        evidence: {
          dba: subject.dba,
          dbaHitCount: dbaHits.length,
          corroboratedCount: corroborated.length,
        },
        franchiseSafetyHold: false,
      };
    }
  }

  // Name-only / city-only / phone-only / fragment → never auto-match
  const nameOnly = candidates.filter((c) =>
    providerNames(c).some(
      (n) => nameExact(n, subject.legalName) || nameExact(n, subject.dba)
    )
  );
  if (nameOnly.length > 0) {
    return {
      disposition: 'REVIEW_REQUIRED',
      matchedCompanyId: null,
      matchMethod: 'none',
      matchConfidence: 0,
      reviewReason: 'name_similarity_insufficient_without_corroboration',
      evidence: { companyIds: nameOnly.map((c) => c.companyId).slice(0, 10) },
      franchiseSafetyHold: false,
    };
  }

  return {
    disposition: 'NEW_PROVIDER_CANDIDATE',
    matchedCompanyId: null,
    matchMethod: 'none',
    matchConfidence: 0,
    reviewReason: null,
    evidence: {},
    franchiseSafetyHold: false,
  };
}

/**
 * VERIFIED requires: current official status + understood authority + strong identity.
 * Active license with uncertain identity → REVIEW_REQUIRED.
 */
export function resolveVerificationState(input: {
  disposition: StateIdentityDisposition;
  statusNormalized: StateIdentitySubject['statusNormalized'];
  roleClass: StateIdentitySubject['roleClass'];
  matchMethod: StateMatchMethod;
  franchiseSafetyHold: boolean;
}): 'VERIFIED' | 'REVIEW_REQUIRED' | 'UNRESOLVED' | 'HISTORICAL' {
  if (
    input.disposition === 'HISTORICAL' ||
    input.statusNormalized === 'inactive' ||
    input.statusNormalized === 'expired' ||
    input.statusNormalized === 'revoked' ||
    input.statusNormalized === 'suspended'
  ) {
    return 'HISTORICAL';
  }
  if (input.disposition === 'OUT_OF_SCOPE') return 'UNRESOLVED';
  if (input.disposition === 'REVIEW_REQUIRED' || input.franchiseSafetyHold) {
    return 'REVIEW_REQUIRED';
  }
  if (input.disposition === 'MATCHED_EXISTING') {
    if (
      input.statusNormalized === 'active' &&
      (input.roleClass === 'mover' || input.roleClass === 'broker') &&
      (input.matchMethod === 'exact_usdot' ||
        input.matchMethod === 'exact_prior_state_authority' ||
        input.matchMethod === 'exact_legal_name_and_address' ||
        input.matchMethod === 'exact_legal_name_and_phone' ||
        input.matchMethod === 'exact_dba_and_corroboration')
    ) {
      return 'VERIFIED';
    }
    return 'REVIEW_REQUIRED';
  }
  // NEW_PROVIDER_CANDIDATE: authority observed, identity not in canonical set
  if (input.disposition === 'NEW_PROVIDER_CANDIDATE' && input.statusNormalized === 'active') {
    return 'UNRESOLVED';
  }
  return 'UNRESOLVED';
}
