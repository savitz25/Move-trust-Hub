import 'server-only';
import { createClient } from '@supabase/supabase-js';
import { getSupabaseAnonKey, getSupabaseUrl } from '@/lib/supabase/config';
import { mapCompanyRow } from '@/lib/supabase/queries/companies';
import { classifyProvider } from '@/lib/provider/classification';
import type { CompaniesPort, CompanyRecord } from './publication-source';

/** Only what the publication judgement and the profile classifier read. */
const COLUMNS = 'id, slug, name, usdot_number, mc_number, entity_type, services, specialties, coverage, service_scope, fmcsa_raw, publication_state, indexable, out_of_service, authority_active, is_verified';

/** Narrow read adapter over the production publication source: the anonymous
 * `public.companies` read the profile page itself uses (public RLS, anon key,
 * no service role). Two exact-equality lookups, at most three rows each. The
 * project is pinned: any other Supabase project is refused. */
export function companiesPublicationPort(project: string): CompaniesPort | null {
  let url: string | undefined, key: string | undefined;
  try { url = getSupabaseUrl(); key = getSupabaseAnonKey(); } catch { return null; }
  if (!url || !key || url.replace(/\/+$/, '') !== `https://${project}.supabase.co`) return null;
  const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const read = async (column: 'slug' | 'usdot_number', value: string): Promise<CompanyRecord[]> => {
    const result = await client.from('companies').select(COLUMNS).eq(column, value).limit(3).abortSignal(AbortSignal.timeout(5000));
    if (result.error) throw new Error('publication_source_unavailable');
    return (result.data ?? []) as unknown as CompanyRecord[];
  };
  return {
    bySlug: slug => read('slug', slug),
    byUsdot: usdot => read('usdot_number', usdot),
    capabilities: row => classifyProvider(mapCompanyRow(row)).capabilities,
  };
}
