import 'server-only';

import { getMarketPath } from '@/lib/destinations/markets';
import {
  findNearbyHubsForCounties,
  NEARBY_HUB_MAX_MILES,
} from '@/lib/destinations/hub-proximity';
import { revalidateLocalMoverCountyPages } from '@/lib/local-movers/revalidate-county-pages';
import { logger } from '@/lib/logging/logger';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import type { SelectedCounty } from '@/lib/suggestions/service-scope';
import type { Database } from '@/types/supabase';

type DestinationAssignmentInsert =
  Database['public']['Tables']['company_destination_assignments']['Insert'];

/**
 * Publish a local/intrastate mover to user-selected counties.
 * Nearby destination hubs (~150 miles) automatically surface these movers via
 * proximity county loading on hub pages — we revalidate those hubs after assign.
 */
export async function assignSelectedCounties(params: {
  companyId: string;
  companySlug: string;
  headquarters?: string | null;
  counties: SelectedCounty[];
}): Promise<{
  assignedCounties: SelectedCounty[];
  nearbyHubs: Array<{ slug: string; miles: number; alreadyPrimary: boolean }>;
}> {
  const counties = params.counties.filter((c) => c.stateSlug && c.countySlug);
  if (!counties.length) {
    logger.warn('onboarding.local_counties_empty', {
      companySlug: params.companySlug,
    });
    return { assignedCounties: [], nearbyHubs: [] };
  }

  if (!isSupabaseAdminConfigured()) {
    return { assignedCounties: counties, nearbyHubs: [] };
  }

  const admin = createAdminClient();
  const now = new Date().toISOString();
  const assignedCounties: SelectedCounty[] = [];

  // Nearby destination hubs (~150 mi) for tagging + cache revalidation.
  // Hub pages pull movers via primary + adjacent + proximity counties (read path),
  // so we do NOT copy the company onto other counties (avoids county-page spam).
  const nearbyAll = findNearbyHubsForCounties(counties, NEARBY_HUB_MAX_MILES);
  const nearestHubSlug = nearbyAll[0]?.market.slug ?? null;

  // Replace prior assignments for this company so local coverage stays accurate
  await admin
    .from('company_destination_assignments')
    .delete()
    .eq('company_id', params.companyId);

  // Primary: user-selected counties only (source local_intrastate_selection).
  for (const county of counties) {
    const row: DestinationAssignmentInsert = {
      company_id: params.companyId,
      company_slug: params.companySlug,
      state_slug: county.stateSlug,
      county_slug: county.countySlug,
      destination_slug: nearestHubSlug,
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

  // Bust nearby hub pages so local movers appear there via proximity county lists.
  try {
    const { revalidatePath } = await import('next/cache');
    for (const hub of nearbyAll) {
      const path = getMarketPath(hub.market);
      revalidatePath(path, 'page');
      revalidatePath(path, 'layout');
    }
    const stateSlugs = new Set(assignedCounties.map((c) => c.stateSlug));
    for (const stateSlug of stateSlugs) {
      revalidatePath(`/moving-to/${stateSlug}`, 'page');
    }
  } catch {
    // CLI / non-Next runtime
  }

  const nearbyHubs = nearbyAll.map((h) => ({
    slug: h.market.slug,
    miles: Math.round(h.miles),
    alreadyPrimary: h.alreadyPrimary,
  }));

  logger.info('onboarding.local_counties_assigned', {
    companySlug: params.companySlug,
    count: assignedCounties.length,
    counties: assignedCounties.map((c) => `${c.stateSlug}/${c.countySlug}`),
    nearbyHubs,
    maxMiles: NEARBY_HUB_MAX_MILES,
  });

  return { assignedCounties, nearbyHubs };
}
