import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import { buildCompanySlugBase } from '@/lib/utils/company-slug';
import { normalizeCompanyUsdot } from '@/lib/utils/company-slug';
import { slugifyCompanyName } from '@/lib/utils/slugify';

export { slugifyCompanyName } from '@/lib/utils/slugify';
export { buildCompanySlugBase, ensurePublishableCompanySlug } from '@/lib/utils/company-slug';

/**
 * Resolve a publishable slug without creating -2 collision duplicates.
 *
 * Phase 2: when a company with the same USDOT already exists, reuse its slug
 * (merge on collision). When the base slug exists for a different entity without
 * shared USDOT, prefer usdot-based slug over numeric suffixes.
 */
export async function resolveUniqueCompanySlug(params: {
  name: string;
  usdot?: string | null;
}): Promise<string> {
  const base = buildCompanySlugBase(params);
  const usdot = normalizeCompanyUsdot(params.usdot);

  if (!isSupabaseAdminConfigured()) return base;

  const admin = createAdminClient();

  // Primary: existing entity with same USDOT → reuse canonical slug (merge)
  if (usdot) {
    const { data: byDot } = await admin
      .from('companies')
      .select('id, slug, usdot_number')
      .eq('usdot_number', usdot)
      .limit(5);

    if (byDot?.length) {
      // Prefer non -N suffix slug
      const preferred =
        byDot.find((r) => r.slug && !/-\d+$/.test(r.slug)) ?? byDot[0];
      if (preferred?.slug) return preferred.slug;
    }
  }

  const { data: existingBase } = await admin
    .from('companies')
    .select('id, slug, usdot_number')
    .eq('slug', base)
    .maybeSingle();

  if (!existingBase) return base;

  // Same USDOT (or both missing) → reuse
  const existingDot = normalizeCompanyUsdot(existingBase.usdot_number as string | null);
  if (usdot && existingDot && usdot === existingDot) {
    return existingBase.slug as string;
  }
  if (!usdot && !existingDot) {
    return existingBase.slug as string;
  }

  // Different entity: use DOT-qualified slug instead of -2
  if (usdot) {
    const dotSlug = `dot-${usdot}`;
    const { data: existingDotSlug } = await admin
      .from('companies')
      .select('id')
      .eq('slug', dotSlug)
      .maybeSingle();
    if (!existingDotSlug) return dotSlug;
    // Extreme collision: name + usdot fragment
    return `${base}-u${usdot.slice(-4)}`;
  }

  // No USDOT and base taken — last resort timestamp (not -2 serial)
  return `${base}-${Date.now().toString(36)}`;
}
