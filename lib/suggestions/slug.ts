import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import { buildCompanySlugBase } from '@/lib/utils/company-slug';
import { slugifyCompanyName } from '@/lib/utils/slugify';

export { slugifyCompanyName } from '@/lib/utils/slugify';
export { buildCompanySlugBase, ensurePublishableCompanySlug } from '@/lib/utils/company-slug';

export async function resolveUniqueCompanySlug(params: {
  name: string;
  usdot?: string | null;
}): Promise<string> {
  const base = buildCompanySlugBase(params);

  if (!isSupabaseAdminConfigured()) return base;

  const admin = createAdminClient();
  let candidate = base;
  let suffix = 2;

  while (suffix < 50) {
    const { data: existing } = await admin
      .from('companies')
      .select('id')
      .eq('slug', candidate)
      .maybeSingle();

    if (!existing) return candidate;

    candidate = `${base}-${suffix}`;
    suffix++;
  }

  return `${base}-${Date.now()}`;
}