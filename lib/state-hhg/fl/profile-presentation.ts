/**
 * Future Florida state-only profile copy (FL-005 design).
 * Not wired to live /companies pages. Do not treat as endorsement.
 * Google Places requests: 0.
 */

export const FL_005_GOOGLE_PLACES_REQUESTS = 0 as const;

export const FL_FDACS_INTRASTATE_HEADLINE = 'Florida Intrastate Mover';

export const FL_FDACS_INTRASTATE_DETAIL =
  'Registered with the Florida Department of Agriculture and Consumer Services for intrastate household-goods moving activity in Florida. This is Florida state registration, not FMCSA interstate operating authority.';

export const FL_FDACS_CONTACT_SOURCE_LABEL =
  'Contact reported in Florida FDACS registration';

export const FL_FDACS_EVIDENCE_NOT_ENDORSEMENT =
  'Regulatory verification is evidence of registration, not a MoveTrustHub endorsement.';

export function floridaFdacsEvidenceBlock(input: {
  authorityNumber: string;
  status: string;
  source?: string | null;
  retrievedAt?: string | null;
}): {
  regulator: string;
  registrationNumber: string;
  registrationType: string;
  status: string;
  source: string;
  freshness: string | null;
  headline: string;
  detail: string;
  endorsement: false;
  federalIdClaim: 'NO_FEDERAL_ID_IN_CURRENT_MTH_DATA' | null;
} {
  return {
    regulator: 'Florida Department of Agriculture and Consumer Services (FDACS)',
    registrationNumber: input.authorityNumber,
    registrationType: 'Intrastate Mover (IM)',
    status: input.status,
    source: input.source ?? 'FDACS Chapter 507 Business License Lookup',
    freshness: input.retrievedAt ?? null,
    headline: FL_FDACS_INTRASTATE_HEADLINE,
    detail: FL_FDACS_INTRASTATE_DETAIL,
    endorsement: false,
    federalIdClaim: 'NO_FEDERAL_ID_IN_CURRENT_MTH_DATA',
  };
}

export function isUnsafeFederalAbsenceClaim(text: string): boolean {
  return /no usdot exists/i.test(text) || /unlawful interstate/i.test(text);
}
