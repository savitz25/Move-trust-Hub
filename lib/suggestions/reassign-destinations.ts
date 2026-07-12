import { assignApprovedCompanyToDestinations } from '@/lib/suggestions/assign-company-destination';

import { revalidateDestinationPaths } from '@/lib/suggestions/revalidate-destination';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import { logger } from '@/lib/logging/logger';
import type { Database } from '@/types/supabase';

type VerifiedCompanyRow = Pick<
  Database['public']['Tables']['companies']['Row'],
  'id' | 'slug' | 'name' | 'headquarters' | 'fmcsa_raw' | 'is_verified'
>;

export type ReassignDestinationsResult = {
  processed: number;
  assigned: number;
  unresolved: number;
  errors: number;
};

export async function reassignDestinationsForVerifiedCompanies(options?: {
  slug?: string;
  dryRun?: boolean;
}): Promise<ReassignDestinationsResult> {
  if (!isSupabaseAdminConfigured()) {
    throw new Error('Supabase admin not configured');
  }

  const admin = createAdminClient();
  let query = admin
    .from('companies')
    .select('id, slug, name, headquarters, fmcsa_raw, is_verified')
    .eq('is_verified', true);

  if (options?.slug) {
    query = query.eq('slug', options.slug);
  }

  const { data, error } = await query.order('name');
  if (error) throw new Error(error.message);
  const companies = (data ?? []) as VerifiedCompanyRow[];

  const result: ReassignDestinationsResult = {
    processed: 0,
    assigned: 0,
    unresolved: 0,
    errors: 0,
  };

  for (const company of companies) {
    result.processed += 1;

    if (options?.dryRun) {
      const { resolveDestinationsWithDebug } = await import(
        '@/lib/destinations/resolve-from-headquarters'
      );
      const debug = resolveDestinationsWithDebug({
        headquarters: company.headquarters,
        fmcsaRaw:
          company.fmcsa_raw && typeof company.fmcsa_raw === 'object'
            ? (company.fmcsa_raw as Record<string, unknown>)
            : null,
        legalName: company.name,
      });

      console.log(
        JSON.stringify({
          slug: company.slug,
          headquarters: company.headquarters,
          effectiveAddress: debug.effectiveAddress,
          primaryCity: debug.primaryCity,
          counties: debug.assignments.map((a) => `${a.stateSlug}/${a.countySlug}`),
          destinations: debug.assignments.flatMap((a) => a.marketSlugs),
        })
      );

      if (debug.assignments.length) result.assigned += 1;
      else result.unresolved += 1;
      continue;
    }

    try {
      const assignment = await assignApprovedCompanyToDestinations({
        companyId: company.id,
        companySlug: company.slug,
        headquarters: company.headquarters,
        fmcsaRaw:
          company.fmcsa_raw && typeof company.fmcsa_raw === 'object'
            ? (company.fmcsa_raw as Record<string, unknown>)
            : null,
        legalName: company.name,
      });

      try {
        revalidateDestinationPaths(assignment.debug.effectiveAddress ?? company.headquarters);
      } catch {
        // next/cache is unavailable outside the Next.js runtime (CLI repair scripts).
      }

      if (assignment.assignedCounties.length) result.assigned += 1;
      else result.unresolved += 1;
    } catch (err) {
      result.errors += 1;
      logger.error('reassign.destination_failed', {
        slug: company.slug,
        message: err instanceof Error ? err.message : String(err),
      });
    }
  }

  return result;
}