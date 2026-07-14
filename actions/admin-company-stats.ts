'use server';

import { assertAdminSession } from '@/lib/admin/auth';
import { fullMoversCatalog } from '@/lib/local-movers/catalog';
import { evaluateCuratedListing } from '@/lib/trust/curated-listing-policy';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';

export type AdminCompanyStats = {
  supabaseDirectory: number;
  pendingSuggestions: number;
  movingCompanies: number;
  localMoversTotal: number;
  localMoversDisplayable: number;
  localMoversDirectoryLinked: number;
};

export async function getAdminCompanyStats(): Promise<AdminCompanyStats> {
  await assertAdminSession();

  let supabaseDirectory = 0;
  let pendingSuggestions = 0;
  let movingCompanies = 0;

  if (isSupabaseAdminConfigured()) {
    try {
      const supabase = createAdminClient();
      const [companies, suggestions, reviewCompanies] = await Promise.all([
        supabase.from('companies').select('id', { count: 'exact', head: true }),
        supabase.from('company_suggestions').select('id', { count: 'exact', head: true }),
        supabase.from('moving_companies').select('id', { count: 'exact', head: true }),
      ]);

      supabaseDirectory = companies.count ?? 0;
      pendingSuggestions = suggestions.count ?? 0;
      movingCompanies = reviewCompanies.count ?? 0;
    } catch {
      /* Stats are optional — dashboard still loads without counts */
    }
  }

  const movers = Object.values(fullMoversCatalog);
  let localMoversDisplayable = 0;
  let localMoversDirectoryLinked = 0;

  for (const mover of movers) {
    const verdict = evaluateCuratedListing(mover);
    if (verdict.isDisplayable) {
      localMoversDisplayable += 1;
      if (verdict.tier === 'directory_linked') {
        localMoversDirectoryLinked += 1;
      }
    }
  }

  return {
    supabaseDirectory,
    pendingSuggestions,
    movingCompanies,
    localMoversTotal: movers.length,
    localMoversDisplayable,
    localMoversDirectoryLinked,
  };
}