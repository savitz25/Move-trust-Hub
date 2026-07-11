import {
  resolveCompanyDestinationsWithDebug,
  type CompanyDestinationInput,
} from '@/lib/destinations/resolve-company-destinations';
import type { WebsiteCoverageData } from '@/lib/verification/coverage-scrape-types';
import { APPROVED_COUNTY_MOVERS_TAG } from '@/lib/local-movers/approved-county-movers-tag';
import { logger } from '@/lib/logging/logger';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import type { Database } from '@/types/supabase';
import { revalidateTag } from 'next/cache';

type DestinationAssignmentInsert =
  Database['public']['Tables']['company_destination_assignments']['Insert'];

export type DestinationAssignmentResult = {
  assignedCounties: Array<{ stateSlug: string; countySlug: string }>;
  destinationSlugs: string[];
  debug: ReturnType<typeof resolveCompanyDestinationsWithDebug>;
};

export async function assignApprovedCompanyToDestinations(params: {
  companyId: string;
  companySlug: string;
  headquarters?: string | null;
  fmcsaRaw?: Record<string, unknown> | null;
  legalName?: string | null;
  coverage?: WebsiteCoverageData | null;
}): Promise<DestinationAssignmentResult> {
  const resolutionInput: CompanyDestinationInput = {
    headquarters: params.headquarters,
    fmcsaRaw: params.fmcsaRaw,
    legalName: params.legalName,
    coverage: params.coverage ?? null,
  };

  const debug = resolveCompanyDestinationsWithDebug(resolutionInput);
  const resolved = debug.assignments;

  logger.info('onboarding.destination_resolve', {
    companySlug: params.companySlug,
    headquarters: params.headquarters,
    effectiveAddress: debug.effectiveAddress,
    addressSource: debug.source,
    parsedCity: debug.parsedCity,
    parsedState: debug.parsedState,
    primaryCity: debug.primaryCity,
    detectedCities: debug.detectedCities,
    coverageApplied: debug.coverageApplied,
    coverageSummary: debug.coverageSummary,
    coverageNationalOnly: debug.coverageNationalOnly,
    assignmentCount: resolved.length,
    counties: resolved.map((entry) => `${entry.stateSlug}/${entry.countySlug}`),
    destinationSlugs: resolved.flatMap((entry) => entry.marketSlugs),
  });

  if (!resolved.length) {
    logger.warn('onboarding.destination_unresolved', {
      companySlug: params.companySlug,
      headquarters: params.headquarters,
      effectiveAddress: debug.effectiveAddress,
      parsedCity: debug.parsedCity,
      parsedState: debug.parsedState,
    });
    return { assignedCounties: [], destinationSlugs: [], debug };
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
      debug,
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
    const row: DestinationAssignmentInsert = {
      company_id: params.companyId,
      company_slug: params.companySlug,
      state_slug: entry.stateSlug,
      county_slug: entry.countySlug,
      destination_slug: primaryDestination,
      headquarters: debug.effectiveAddress ?? params.headquarters ?? null,
        source: debug.coverageApplied ? 'onboarding_coverage' : 'onboarding_approval',
      updated_at: now,
    };
    const { error } = await admin
      .from('company_destination_assignments')
      .upsert([row] as DestinationAssignmentInsert[], {
        onConflict: 'company_id,state_slug,county_slug',
      });

    if (error) {
      logger.error('onboarding.destination_assign_failed', {
        companySlug: params.companySlug,
        stateSlug: entry.stateSlug,
        countySlug: entry.countySlug,
        matchedCity: entry.matchedCity,
        message: error.message,
      });
    }
  }

  try {
    revalidateTag(APPROVED_COUNTY_MOVERS_TAG);
  } catch {
    // next/cache is unavailable outside the Next.js runtime (CLI repair scripts).
  }

  logger.info('onboarding.destination_assigned', {
    companySlug: params.companySlug,
    headquarters: params.headquarters,
    effectiveAddress: debug.effectiveAddress,
    primaryCity: debug.primaryCity,
    counties: assignedCounties,
    destinationSlugs: [...destinationSlugs],
  });

  return {
    assignedCounties,
    destinationSlugs: [...destinationSlugs],
    debug,
  };
}