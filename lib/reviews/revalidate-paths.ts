import 'server-only';

import { revalidatePath } from 'next/cache';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import { getAllCompanies } from '@/lib/data-server';

function normalizeDigits(value: string | null | undefined) {
  return (value || '').replace(/\D/g, '');
}

/**
 * Revalidate every public surface that can show moderated community reviews
 * for a moving_companies row (native /company profile + directory /companies).
 */
export async function revalidatePathsForMovingCompany(movingCompanyId: string): Promise<void> {
  if (!isSupabaseAdminConfigured()) return;

  const admin = createAdminClient();
  const { data: moving } = await admin
    .from('moving_companies')
    .select('id, slug, legacy_company_id, dot_number, mc_number')
    .eq('id', movingCompanyId)
    .maybeSingle();

  if (!moving) return;

  if (moving.slug) {
    revalidatePath(`/company/${moving.slug}`);
    // Legacy mistaken path used moving slug under /companies — still purge if it exists
    revalidatePath(`/companies/${moving.slug}`);
  }

  const directorySlugs = new Set<string>();

  if (moving.legacy_company_id) {
    const { data: byId } = await admin
      .from('companies')
      .select('slug')
      .eq('id', moving.legacy_company_id)
      .maybeSingle();
    if (byId?.slug) directorySlugs.add(byId.slug);
  }

  const dot = normalizeDigits(moving.dot_number);
  const mc = normalizeDigits(moving.mc_number);

  if (dot) {
    const { data: byDot } = await admin
      .from('companies')
      .select('slug')
      .eq('usdot_number', dot)
      .maybeSingle();
    if (byDot?.slug) directorySlugs.add(byDot.slug);
  }

  // Fallback: seed/unified directory (when companies table row missing or slug differs)
  if (directorySlugs.size === 0 && (dot || mc)) {
    try {
      const all = await getAllCompanies();
      for (const c of all) {
        if (dot && normalizeDigits(c.usdotNumber) === dot) {
          directorySlugs.add(c.slug);
        }
        if (mc && normalizeDigits(c.mcNumber) === mc) {
          directorySlugs.add(c.slug);
        }
      }
    } catch {
      // ignore directory load failures
    }
  }

  for (const slug of directorySlugs) {
    revalidatePath(`/companies/${slug}`);
  }

  revalidatePath('/review');
  revalidatePath('/admin/reviews');
}
