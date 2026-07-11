import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';

/** Distinct state slugs from county/destination assignments (onboarded movers). */
export async function getCompanyAssignmentStateSlugs(companySlug: string): Promise<string[]> {
  if (!isSupabaseAdminConfigured()) return [];

  const admin = createAdminClient();
  const { data, error } = await admin
    .from('company_destination_assignments')
    .select('state_slug')
    .eq('company_slug', companySlug);

  if (error || !data?.length) return [];

  return [...new Set(data.map((row) => row.state_slug).filter(Boolean))];
}