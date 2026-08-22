/**
 * Fail-closed public read path for Palm Beach county credentials.
 * Direct anon/authenticated table access remains DENIED (RLS).
 * Server uses service-role only and never returns INTERNAL_ONLY rows.
 *
 * No query-param bypass. No production flag to render non-published rows.
 * PUBLISHED gate is real.
 */
import 'server-only';

import { createClient } from '@supabase/supabase-js';
import { isAnonymousPublicProfileAllowed } from '@/lib/provider/publication';
import type { PublicationState } from '@/lib/provider/types';
import {
  getSupabaseServiceRoleKey,
  getSupabaseUrl,
  isSupabaseAdminConfigured,
} from '@/lib/supabase/config';
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
  type PalmBeachPublishedPermit,
  type PalmBeachCredentialRow,
} from '@/lib/county-regulatory/pbc/public-read-core';

function serviceClient() {
  if (!isSupabaseAdminConfigured()) return null;
  return createClient(getSupabaseUrl()!, getSupabaseServiceRoleKey()!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

/**
 * Returns published Palm Beach county permits for a public company profile.
 * Fail-closed: empty when company not anonymously public or credentials not PUBLISHED.
 */
export async function getPublishedPalmBeachCountyPermitsForPublicProfile(input: {
  companyId: string;
  publicationState?: PublicationState | null;
}): Promise<PalmBeachPublishedPermit[]> {
  if (!isAnonymousPublicProfileAllowed(input)) return [];

  const sb = serviceClient();
  if (!sb) return [];

  try {
    const { data, error } = await sb
      .from('provider_county_credential')
      .select(
        'credential_number, normalized_status, source_status, regulator, source, retrieved_at, fdacs_im, evidence_publication_state, company_id'
      )
      .eq('company_id', input.companyId)
      .eq('source', PBC_SOURCE_KEY)
      .eq('evidence_publication_state', 'PUBLISHED')
      .order('credential_number', { ascending: true });

    if (error) return [];
    return selectPublishedPalmBeachPermits({
      companyId: input.companyId,
      publicationState: input.publicationState,
      rows: data ?? [],
    });
  } catch {
    // Profile remains usable; county evidence omitted.
    return [];
  }
}
