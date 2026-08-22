/**
 * Fail-closed public read path for Palm Beach county credentials.
 * Direct anon/authenticated table access remains DENIED (RLS).
 * Server uses service-role only and never returns INTERNAL_ONLY rows.
 *
 * No query-param bypass. No production flag to render non-published rows.
 * PUBLISHED gate is real.
 *
 * Uses generalized county server reader (MDC-PROD-003).
 */
import 'server-only';

import type { PublicationState } from '@/lib/provider/types';
import { fetchPublishedCountyCredentialsForPublicProfile } from '@/lib/county-regulatory/shared/fetch-published-county-credentials';
import {
  PBC_SOURCE_KEY,
  selectPublishedPalmBeachPermits,
  type PalmBeachPublishedPermit,
} from '@/lib/county-regulatory/pbc/public-read-core';

export {
  PBC_PUBLIC_READ_GOOGLE_PLACES_REQUESTS,
  PBC_SOURCE_KEY,
  PBC_SOURCE_LOOKUP_URL,
  PBC_REGULATOR,
  selectPublishedPalmBeachPermits,
  statusPublicLabel,
  palmBeachPermitBlockHeading,
  type PalmBeachPublishedPermit,
  type PalmBeachCredentialRow,
} from '@/lib/county-regulatory/pbc/public-read-core';

/**
 * Returns published Palm Beach county permits for a public company profile.
 * Fail-closed: empty when company not anonymously public or credentials not PUBLISHED.
 */
export async function getPublishedPalmBeachCountyPermitsForPublicProfile(input: {
  companyId: string;
  publicationState?: PublicationState | null;
}): Promise<PalmBeachPublishedPermit[]> {
  try {
    const rows = await fetchPublishedCountyCredentialsForPublicProfile({
      companyId: input.companyId,
      publicationState: input.publicationState,
      sourceKey: PBC_SOURCE_KEY,
    });
    return selectPublishedPalmBeachPermits({
      companyId: input.companyId,
      publicationState: input.publicationState,
      rows,
    });
  } catch {
    return [];
  }
}
