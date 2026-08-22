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
  getSupabaseServiceRoleKey,
  getSupabaseUrl,
  isSupabaseAdminConfigured,
} from '@/lib/supabase/config';
import type { CountyCredentialRow } from '@/lib/county-regulatory/shared/public-read-gate';

const SELECT_COLS =
  'credential_number, normalized_status, source_status, regulator, source, retrieved_at, fdacs_im, evidence_publication_state, company_id';

function serviceClient() {
  if (!isSupabaseAdminConfigured()) return null;
  return createClient(getSupabaseUrl()!, getSupabaseServiceRoleKey()!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
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
