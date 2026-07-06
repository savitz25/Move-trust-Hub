import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import { slugifyCompanyName } from '@/lib/utils/slugify';

export { slugifyCompanyName } from '@/lib/utils/slugify';

function normalizeUsdot(value: string | null | undefined): string | null {
  if (!value) return null;
  const digits = value.replace(/\D/g, '');
  return digits.length >= 3 ? digits : null;
}

export async function resolveUniqueCompanySlug(params: {
  name: string;
  usdot?: string | null;
}): Promise<string> {
  const dot = normalizeUsdot(params.usdot);
  const nameSlug = slugifyCompanyName(params.name);
  const base = nameSlug && nameSlug !== 'company' ? nameSlug : dot ? `dot-${dot}` : 'company';

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