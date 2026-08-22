/**
 * Shared fail-closed county credential public-read gate.
 * No feature flags. No INTERNAL_ONLY render path. PUBLISHED gate is real.
 *
 * Program adapters (PBC, MDC, …) supply sourceKey + DTO mapping.
 */
import { isAnonymousPublicProfileAllowed } from '@/lib/provider/publication';
import type { PublicationState } from '@/lib/provider/types';

/** Raw row shape used by fixture DB / service-role query results. */
export type CountyCredentialRow = {
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

/**
 * Filter credential rows for public presentation.
 * REAL PUBLISHED gate — INTERNAL_ONLY / WITHHELD / wrong program / wrong company never pass.
 */
export function filterPublishedCountyCredentialRows(input: {
  companyId: string;
  publicationState?: PublicationState | null;
  sourceKey: string;
  rows: CountyCredentialRow[] | null | undefined;
  /** Simulated fetch failure — omit evidence, do not throw. */
  fetchError?: boolean;
}): CountyCredentialRow[] {
  if (input.fetchError) return [];
  if (!isAnonymousPublicProfileAllowed(input)) return [];
  const rows = input.rows ?? [];
  return rows
    .filter(
      (row) =>
        row.company_id === input.companyId &&
        row.source === input.sourceKey &&
        row.evidence_publication_state === 'PUBLISHED' &&
        Boolean(row.credential_number)
    )
    .sort((a, b) =>
      String(a.credential_number).localeCompare(String(b.credential_number))
    );
}
