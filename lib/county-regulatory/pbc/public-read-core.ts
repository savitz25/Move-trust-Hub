/**
 * Pure fail-closed Palm Beach county credential presentation helpers.
 * No feature flags. No INTERNAL_ONLY render path. PUBLISHED gate is real.
 *
 * Testable with fixtures without production DB or bypass switches.
 */
import { isAnonymousPublicProfileAllowed } from '@/lib/provider/publication';
import type { PublicationState } from '@/lib/provider/types';

export const PBC_PUBLIC_READ_GOOGLE_PLACES_REQUESTS = 0 as const;
export const PBC_SOURCE_KEY = 'pbc-consumer-affairs-moving-business-permit' as const;
export const PBC_REGULATOR =
  'Palm Beach County Public Safety — Consumer Affairs Division' as const;
/** Official public licensed-mover lookup (attribution link). */
export const PBC_SOURCE_LOOKUP_URL =
  'https://discover.pbc.gov/publicsafety/consumeraffairs/Pages/Moving_App.aspx' as const;

export type PalmBeachPublishedPermit = {
  credentialNumber: string;
  status: string;
  statusPublicLabel: string;
  regulator: string;
  sourceKey: string;
  retrievedAt: string | null;
  fdacsIm: string | null;
};

/** Raw row shape used by fixture DB / service-role query results. */
export type PalmBeachCredentialRow = {
  company_id: string;
  credential_number: string;
  normalized_status?: string | null;
  source_status?: string | null;
  regulator?: string | null;
  source?: string | null;
  retrieved_at?: string | null;
  fdacs_im?: string | null;
  evidence_publication_state?: string | null;
};

export function statusPublicLabel(status: string): string {
  if (/^LICENSED$/i.test(status) || /^ACTIVE$/i.test(status)) {
    return 'Active county moving-business permit';
  }
  return `Permit status reported by Palm Beach County: ${status}`;
}

/**
 * Filter + map credential rows for public presentation.
 * REAL PUBLISHED gate — INTERNAL_ONLY / WITHHELD / wrong program never pass.
 */
export function selectPublishedPalmBeachPermits(input: {
  companyId: string;
  publicationState?: PublicationState | null;
  rows: PalmBeachCredentialRow[] | null | undefined;
  /** Simulated fetch failure — omit evidence, do not throw. */
  fetchError?: boolean;
}): PalmBeachPublishedPermit[] {
  if (input.fetchError) return [];
  if (!isAnonymousPublicProfileAllowed(input)) return [];
  const rows = input.rows ?? [];
  return rows
    .filter(
      (row) =>
        row.company_id === input.companyId &&
        row.source === PBC_SOURCE_KEY &&
        row.evidence_publication_state === 'PUBLISHED' &&
        Boolean(row.credential_number)
    )
    .map((row) => {
      const status = String(row.normalized_status || row.source_status || 'UNKNOWN');
      return {
        credentialNumber: String(row.credential_number),
        status,
        statusPublicLabel: statusPublicLabel(status),
        regulator: String(row.regulator || PBC_REGULATOR),
        sourceKey: PBC_SOURCE_KEY,
        retrievedAt: row.retrieved_at ? String(row.retrieved_at) : null,
        fdacsIm: row.fdacs_im ? String(row.fdacs_im) : null,
      };
    })
    .sort((a, b) => a.credentialNumber.localeCompare(b.credentialNumber));
}
