/**
 * Generalized server-only county credential reader.
 * Direct anon/authenticated table access remains DENIED (RLS).
 * Service-role only; never returns INTERNAL_ONLY rows (query + gate).
 */
import 'server-only';

import { createClient } from '@supabase/supabase-js';
import { isAnonymousPublicProfileAllowed } from '@/lib/provider/publication';
import type { PublicationState } from '@/lib/provider/types';
import {
  getServiceRoleSupabaseTarget,
  isIsolatedMoveBrowserAuthAdmitted,
} from '@/lib/supabase/config';
import type { CountyCredentialRow } from '@/lib/county-regulatory/shared/public-read-gate';

const SELECT_COLS =
  'credential_number, normalized_status, source_status, regulator, source, retrieved_at, fdacs_im, evidence_publication_state, company_id';

/** Null during isolated browser auth: no service-role client and no production fallback. */
export function countyServiceRoleTarget(): { url: string; key: string } | null {
  if (isIsolatedMoveBrowserAuthAdmitted()) return null;
  return getServiceRoleSupabaseTarget();
}

export const countyServiceClientBuilds = { count: 0 };

export function buildCountyServiceClient() {
  const target = countyServiceRoleTarget();
  if (!target) return null;
  countyServiceClientBuilds.count += 1;
  return createClient(target.url, target.key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

function serviceClient() {
  return buildCountyServiceClient();
}

/**
 * Fetch PUBLISHED county credentials for a public company profile (program-scoped).
 * Fail-closed: empty when company not anonymously public, admin missing, or DB error.
 */
export async function fetchPublishedCountyCredentialsForPublicProfile(input: {
  companyId: string;
  publicationState?: PublicationState | null;
  sourceKey: string;
}): Promise<CountyCredentialRow[]> {
  if (!isAnonymousPublicProfileAllowed(input)) return [];

  const sb = serviceClient();
  if (!sb) return [];

  try {
    const { data, error } = await sb
      .from('provider_county_credential')
      .select(SELECT_COLS)
      .eq('company_id', input.companyId)
      .eq('source', input.sourceKey)
      .eq('evidence_publication_state', 'PUBLISHED')
      .order('credential_number', { ascending: true });

    if (error) return [];
    return (data ?? []) as CountyCredentialRow[];
  } catch {
    // Profile remains usable; county evidence omitted.
    return [];
  }
}
