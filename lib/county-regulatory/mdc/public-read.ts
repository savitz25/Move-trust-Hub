/**
 * Fail-closed public read path for Miami-Dade county MR credentials.
 * Direct anon/authenticated table access remains DENIED (RLS).
 * Server uses service-role only and never returns INTERNAL_ONLY rows.
 *
 * No query-param bypass. No production flag to render non-published rows.
 * PUBLISHED gate is real.
 *
 * HOLD_FROM_STRUCTURED_DATA_V1 — callers must not inject into JSON-LD / OG.
 */
import 'server-only';

import type { PublicationState } from '@/lib/provider/types';
import { fetchPublishedCountyCredentialsForPublicProfile } from '@/lib/county-regulatory/shared/fetch-published-county-credentials';
import {
  MDC_SOURCE_KEY,
  selectPublishedMiamiDadeRegistrations,
  type MiamiDadePublishedRegistration,
} from '@/lib/county-regulatory/mdc/public-read-core';

export {
  MDC_PUBLIC_READ_GOOGLE_PLACES_REQUESTS,
  MDC_SOURCE_KEY,
  MDC_SOURCE_LOOKUP_URL,
  MDC_SOURCE_NAME,
  MDC_REGULATOR,
  MDC_JURISDICTION,
  MDC_CREDENTIAL_TYPE_PUBLIC,
  MDC_DISCLAIMER,
  MDC_VERIFICATION_COPY,
  selectPublishedMiamiDadeRegistrations,
  statusPublicLabel,
  miamiDadeRegistrationBlockHeading,
  type MiamiDadePublishedRegistration,
  type MiamiDadeCredentialRow,
} from '@/lib/county-regulatory/mdc/public-read-core';

/**
 * Returns published Miami-Dade MR registrations for a public company profile.
 * Fail-closed: empty when company not anonymously public or credentials not PUBLISHED.
 */
export async function getPublishedMiamiDadeRegistrationsForPublicProfile(input: {
  companyId: string;
  publicationState?: PublicationState | null;
}): Promise<MiamiDadePublishedRegistration[]> {
  try {
    const rows = await fetchPublishedCountyCredentialsForPublicProfile({
      companyId: input.companyId,
      publicationState: input.publicationState,
      sourceKey: MDC_SOURCE_KEY,
    });
    return selectPublishedMiamiDadeRegistrations({
      companyId: input.companyId,
      publicationState: input.publicationState,
      rows,
    });
  } catch {
    return [];
  }
}
