import { resolveDestinationsFromHeadquarters } from '@/lib/destinations/resolve-from-headquarters';
import { APPROVED_COUNTY_MOVERS_TAG } from '@/lib/local-movers/approved-county-movers-tag';
import { logger } from '@/lib/logging/logger';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import { revalidateTag } from 'next/cache';

export type DestinationAssignmentResult = {
  assignedCounties: Array<{ stateSlug: string; countySlug: string }>;
  destinationSlugs: string[];
};

export async function assignApprovedCompanyToDestinations(params: {
  companyId: string;
  companySlug: string;
  headquarters: string | null | undefined;
}): Promise<DestinationAssignmentResult> {
  const resolved = resolveDestinationsFromHeadquarters(params.headquarters);

  if (!resolved.length) {
    logger.warn('onboarding.destination_unresolved', {
      companySlug: params.companySlug,
      headquarters: params.headquarters,
    });
    return { assignedCounties: [], destinationSlugs: [] };
  }

  if (!isSupabaseAdminConfigured()) {
    logger.warn('onboarding.destination_assign_skipped', {
      reason: 'supabase_admin_not_configured',
      companySlug: params.companySlug,
    });
    return {
      assignedCounties: resolved.map((entry) => ({
        stateSlug: entry.stateSlug,
        countySlug: entry.countySlug,
      })),
      destinationSlugs: [...new Set(resolved.flatMap((entry) => entry.marketSlugs))],
    };
  }

  const admin = createAdminClient();
  const now = new Date().toISOString();
  const destinationSlugs = new Set<string>();
  const assignedCounties: Array<{ stateSlug: string; countySlug: string }> = [];

  for (const entry of resolved) {
    assignedCounties.push({ stateSlug: entry.stateSlug, countySlug: entry.countySlug });
    entry.marketSlugs.forEach((slug) => destinationSlugs.add(slug));

    const primaryDestination = entry.marketSlugs[0] ?? null;
    const { error } = await admin.from('company_destination_assignments').upsert(
      {
        company_id: params.companyId,
        company_slug: params.companySlug,
        state_slug: entry.stateSlug,
        county_slug: entry.countySlug,
        destination_slug: primaryDestination,
        headquarters: params.headquarters ?? null,
        source: 'onboarding_approval',
        updated_at: now,
      },
      { onConflict: 'company_id,state_slug,county_slug' }
    );

    if (error) {
      logger.error('onboarding.destination_assign_failed', {
        companySlug: params.companySlug,
        stateSlug: entry.stateSlug,
        countySlug: entry.countySlug,
        message: error.message,
      });
    }
  }

  revalidateTag(APPROVED_COUNTY_MOVERS_TAG);

  logger.info('onboarding.destination_assigned', {
    companySlug: params.companySlug,
    headquarters: params.headquarters,
    counties: assignedCounties,
    destinationSlugs: [...destinationSlugs],
  });

  return {
    assignedCounties,
    destinationSlugs: [...destinationSlugs],
  };
}