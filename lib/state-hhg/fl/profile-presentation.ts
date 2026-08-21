/**
 * Future Florida state-only profile copy (FL-005 design, finalized in FL-008).
 * Not wired to live /companies pages. Do not treat as endorsement.
 * Google Places requests: 0.
 */

export const FL_005_GOOGLE_PLACES_REQUESTS = 0 as const;

export const FL_FDACS_INTRASTATE_HEADLINE = 'Florida Intrastate Mover';

export const FL_FDACS_INTRASTATE_DETAIL =
  'Registered with the Florida Department of Agriculture and Consumer Services for intrastate household-goods moving activity in Florida. This is Florida state registration, not FMCSA interstate operating authority.';

export const FL_STATE_ONLY_REGISTRATION_COPY =
  'Registered with Florida FDACS as an intrastate household-goods mover for moves within Florida.';

export const FL_FDACS_SCOPE_EXPLANATION =
  'This Florida registration applies to household-goods moves within Florida. Interstate operating authority is regulated separately at the federal level.';

export const FL_NO_FEDERAL_ID_IN_MTH_DATA =
  "No federal mover identifier is currently linked in MoveTrustHub's data.";

export const FL_FDACS_VERIFICATION_WORDING =
  'Registration verified from Florida FDACS records';

export const FL_FDACS_CONTACT_SOURCE_LABEL =
  'Contact reported in Florida FDACS registration';

export const FL_FDACS_PHONE_SOURCE_LABEL =
  'Phone reported in Florida FDACS registration';

export const FL_FDACS_EMAIL_SOURCE_LABEL =
  'Email reported in Florida FDACS registration';

export const FL_FDACS_ADDRESS_SOURCE_LABEL =
  'Business address reported in Florida FDACS registration';

export const FL_FDACS_EVIDENCE_NOT_ENDORSEMENT =
  'Regulatory verification is evidence of registration, not a MoveTrustHub endorsement.';

const UNSAFE_ENDORSEMENT =
  /\b(approved|certified by trusthub|safe mover|recommended mover|verified mover)\b/i;

export function isUnsafeEndorsementCopy(text: string): boolean {
  return UNSAFE_ENDORSEMENT.test(text);
}

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
  scope: string;
  verificationWording: string;
  endorsement: false;
  federalIdClaim: 'NO_FEDERAL_ID_IN_CURRENT_MTH_DATA' | null;
} {
  const statusLabel =
    String(input.status).toLowerCase() === 'active' ? 'Registered / Active' : input.status;
  return {
    regulator: 'Florida Department of Agriculture and Consumer Services',
    registrationNumber: input.authorityNumber,
    registrationType: 'Intrastate Mover',
    status: statusLabel,
    source: input.source ?? 'Florida FDACS',
    freshness: input.retrievedAt ?? null,
    headline: FL_FDACS_INTRASTATE_HEADLINE,
    detail: FL_STATE_ONLY_REGISTRATION_COPY,
    scope: FL_FDACS_SCOPE_EXPLANATION,
    verificationWording: FL_FDACS_VERIFICATION_WORDING,
    endorsement: false,
    federalIdClaim: 'NO_FEDERAL_ID_IN_CURRENT_MTH_DATA',
  };
}

export function floridaFederalPlusStatePresentation(input: {
  fdacsNumber: string;
  fdacsStatus: string;
  usdot?: string | null;
  mcNumber?: string | null;
}): {
  federal: { usdot: string; mcNumber: string | null; label: string } | null;
  florida: ReturnType<typeof floridaFdacsEvidenceBlock>;
  floridaImpliesFederal: false;
  federalImpliesFlorida: false;
} {
  const usdot = String(input.usdot ?? '').replace(/\D/g, '');
  return {
    federal: usdot
      ? {
          usdot,
          mcNumber: input.mcNumber ?? null,
          label: 'Federal interstate authority (FMCSA / USDOT) is recorded separately from Florida FDACS registration.',
        }
      : null,
    florida: floridaFdacsEvidenceBlock({
      authorityNumber: input.fdacsNumber,
      status: input.fdacsStatus,
    }),
    floridaImpliesFederal: false,
    federalImpliesFlorida: false,
  };
}

export function isUnsafeFederalAbsenceClaim(text: string): boolean {
  return (
    /no usdot exists/i.test(text) ||
    /unlawful interstate/i.test(text) ||
    /not federally licensed/i.test(text) ||
    /cannot move interstate/i.test(text)
  );
}
