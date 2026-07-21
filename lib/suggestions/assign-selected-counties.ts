import 'server-only';

import { revalidateLocalMoverCountyPages } from '@/lib/local-movers/revalidate-county-pages';
import { logger } from '@/lib/logging/logger';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import type { SelectedCounty } from '@/lib/suggestions/service-scope';
import type { Database } from '@/types/supabase';

type DestinationAssignmentInsert =
  Database['public']['Tables']['company_destination_assignments']['Insert'];

/**
 * Publish a local/intrastate mover only to the user-selected counties.
 */
export async function assignSelectedCounties(params: {
  companyId: string;
  companySlug: string;
  headquarters?: string | null;
  counties: SelectedCounty[];
}): Promise<{ assignedCounties: SelectedCounty[] }> {
  const counties = params.counties.filter((c) => c.stateSlug && c.countySlug);
  if (!counties.length) {
    logger.warn('onboarding.local_counties_empty', {
      companySlug: params.companySlug,
    });
    return { assignedCounties: [] };
  }

  if (!isSupabaseAdminConfigured()) {
    return { assignedCounties: counties };
  }

  const admin = createAdminClient();
  const now = new Date().toISOString();
  const assignedCounties: SelectedCounty[] = [];

  // Replace prior assignments for this company so local coverage stays accurate
  await admin
    .from('company_destination_assignments')
    .delete()
    .eq('company_id', params.companyId);

  for (const county of counties) {
    const row: DestinationAssignmentInsert = {
      company_id: params.companyId,
      company_slug: params.companySlug,
      state_slug: county.stateSlug,
      county_slug: county.countySlug,
      destination_slug: null,
      headquarters: params.headquarters ?? null,
      source: 'local_intrastate_selection',
      updated_at: now,
    };
    const { error } = await admin
      .from('company_destination_assignments')
      .upsert([row] as DestinationAssignmentInsert[], {
        onConflict: 'company_id,state_slug,county_slug',
      });

    if (error) {
      logger.error('onboarding.local_county_assign_failed', {
        companySlug: params.companySlug,
        stateSlug: county.stateSlug,
        countySlug: county.countySlug,
        message: error.message,
      });
      continue;
    }
    assignedCounties.push(county);
  }

  revalidateLocalMoverCountyPages(assignedCounties, {
    companySlug: params.companySlug,
    reason: 'assign_selected_counties',
  });

  // Hub pages commonly linked from county placement
  try {
    const { revalidatePath } = await import('next/cache');
    const stateSlugs = new Set(assignedCounties.map((c) => c.stateSlug));
    if (stateSlugs.has('oregon')) {
      revalidatePath('/moving-to/oregon/eugene-or', 'page');
      revalidatePath('/moving-to/oregon', 'page');
    }
    if (stateSlugs.has('california')) {
      revalidatePath('/moving-to/california', 'page');
    }
  } catch {
    // CLI / non-Next runtime
  }

  logger.info('onboarding.local_counties_assigned', {
    companySlug: params.companySlug,
    count: assignedCounties.length,
    counties: assignedCounties.map((c) => `${c.stateSlug}/${c.countySlug}`),
  });

  return { assignedCounties };
}
