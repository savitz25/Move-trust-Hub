/**
 * Pure fail-closed Miami-Dade county MR presentation helpers.
 * No feature flags. No INTERNAL_ONLY render path. PUBLISHED gate is real.
 *
 * Testable with fixtures without production DB or bypass switches.
 */
import type { PublicationState } from '@/lib/provider/types';
import {
  filterPublishedCountyCredentialRows,
  type CountyCredentialRow,
} from '@/lib/county-regulatory/shared/public-read-gate';

export const MDC_PUBLIC_READ_GOOGLE_PLACES_REQUESTS = 0 as const;
export const MDC_SOURCE_KEY = 'mdc-moving-business-registration' as const;
export const MDC_REGULATOR =
  'Miami-Dade Department of Regulatory and Economic Resources (RER) — Consumer and Neighborhood Protection Division' as const;
/** Official EnerGov self-service (attribution link). */
export const MDC_SOURCE_LOOKUP_URL =
  'https://energov.miamidade.gov/EnerGov_Prod/SelfService' as const;
export const MDC_SOURCE_NAME = 'Miami-Dade County official records' as const;
export const MDC_JURISDICTION = 'Miami-Dade County, Florida' as const;
export const MDC_CREDENTIAL_TYPE_PUBLIC =
  'Miami-Dade Moving Business Registration' as const;
export const MDC_DISCLAIMER =
  'Regulatory record verification is not a MoveTrustHub endorsement.' as const;
export const MDC_VERIFICATION_COPY =
  'Credential information verified against Miami-Dade County records.' as const;

export type MiamiDadePublishedRegistration = {
  jurisdiction: string;
  regulator: string;
  credentialType: string;
  credentialNumber: string;
  status: string;
  statusPublicLabel: string;
  sourceName: string;
  sourceReferenceUrl: string;
  sourceKey: string;
  retrievedAt: string | null;
  fdacsIm: string | null;
  disclaimer: string;
};

/** Raw row shape used by fixture DB / service-role query results. */
export type MiamiDadeCredentialRow = CountyCredentialRow;

export function statusPublicLabel(status: string): string {
  if (/^ISSUED$/i.test(status) || /^Issued$/i.test(status)) {
    return 'Issued county moving-business registration';
  }
  return `Registration status reported by Miami-Dade County: ${status}`;
}

/**
 * Singular vs plural card heading for one or more published registrations.
 */
export function miamiDadeRegistrationBlockHeading(
  regs: ReadonlyArray<{ credentialNumber: string }>
): string {
  return regs.length > 1
    ? 'Miami-Dade Moving Business Registrations'
    : 'Miami-Dade Moving Business Registration';
}

/**
 * Filter + map credential rows for public presentation.
 * REAL PUBLISHED gate — INTERNAL_ONLY / WITHHELD / wrong program never pass.
 */
export function selectPublishedMiamiDadeRegistrations(input: {
  companyId: string;
  publicationState?: PublicationState | null;
  rows: MiamiDadeCredentialRow[] | null | undefined;
  /** Simulated fetch failure — omit evidence, do not throw. */
  fetchError?: boolean;
}): MiamiDadePublishedRegistration[] {
  const filtered = filterPublishedCountyCredentialRows({
    companyId: input.companyId,
    publicationState: input.publicationState,
    sourceKey: MDC_SOURCE_KEY,
    rows: input.rows,
    fetchError: input.fetchError,
  });
  return filtered.map((row) => {
    const status = String(row.normalized_status || row.source_status || 'UNKNOWN');
    return {
      jurisdiction: MDC_JURISDICTION,
      regulator: String(row.regulator || MDC_REGULATOR),
      credentialType: MDC_CREDENTIAL_TYPE_PUBLIC,
      credentialNumber: String(row.credential_number),
      status,
      statusPublicLabel: statusPublicLabel(status),
      sourceName: MDC_SOURCE_NAME,
      sourceReferenceUrl: MDC_SOURCE_LOOKUP_URL,
      sourceKey: MDC_SOURCE_KEY,
      retrievedAt: row.retrieved_at ? String(row.retrieved_at) : null,
      fdacsIm: row.fdacs_im ? String(row.fdacs_im) : null,
      disclaimer: MDC_DISCLAIMER,
    };
  });
}
