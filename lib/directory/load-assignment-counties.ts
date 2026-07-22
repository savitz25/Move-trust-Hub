import 'server-only';

import { unstable_cache } from 'next/cache';
import { COMPANIES_DIRECTORY_TAG } from '@/lib/directory/revalidate-company';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import { logger } from '@/lib/logging/logger';

export type AssignmentCounty = {
  stateSlug: string;
  countySlug: string;
};

const PAGE_SIZE = 1000;

/**
 * Load all company_destination_assignments as slug → counties.
 * Used so /companies state+county filters mirror local-mover county pages.
 */
async function fetchAssignmentCountiesByCompanyKey(): Promise<
  Map<string, AssignmentCounty[]>
> {
  const byKey = new Map<string, AssignmentCounty[]>();
  if (!isSupabaseAdminConfigured()) return byKey;

  try {
    const admin = createAdminClient();
    for (let from = 0; ; from += PAGE_SIZE) {
      const { data, error } = await admin
        .from('company_destination_assignments')
        .select('company_id, company_slug, state_slug, county_slug')
        .not('county_slug', 'is', null)
        .range(from, from + PAGE_SIZE - 1);

      if (error) {
        logger.warn('directory.assignments_load_failed', {
          code: error.code,
          message: error.message,
        });
        break;
      }
      if (!data?.length) break;

      for (const row of data) {
        const stateSlug = String(row.state_slug || '')
          .trim()
          .toLowerCase();
        const countySlug = String(row.county_slug || '')
          .trim()
          .toLowerCase();
        if (!stateSlug || !countySlug) continue;
        const entry: AssignmentCounty = { stateSlug, countySlug };
        const keys = [row.company_slug, row.company_id].filter(Boolean) as string[];
        for (const key of keys) {
          const k = key.trim().toLowerCase();
          if (!k) continue;
          const list = byKey.get(k) ?? [];
          if (!list.some((c) => c.stateSlug === stateSlug && c.countySlug === countySlug)) {
            list.push(entry);
          }
          byKey.set(k, list);
        }
      }

      if (data.length < PAGE_SIZE) break;
    }

    logger.info('directory.assignments_loaded', { companies: byKey.size });
  } catch (err) {
    logger.warn('directory.assignments_load_error', {
      message: err instanceof Error ? err.message : String(err),
    });
  }

  return byKey;
}

export const getAssignmentCountiesByCompanyKey = unstable_cache(
  fetchAssignmentCountiesByCompanyKey,
  ['directory-assignment-counties-v1'],
  { tags: [COMPANIES_DIRECTORY_TAG], revalidate: 120 }
);

/** Merge assignment counties into company.coverageCounties (deduped). */
export function mergeCoverageWithAssignments(
  existing: Array<{ stateSlug: string; countySlug: string; name?: string }> | null | undefined,
  assigned: AssignmentCounty[] | undefined
): Array<{ stateSlug: string; countySlug: string; name?: string }> {
  const out: Array<{ stateSlug: string; countySlug: string; name?: string }> = [];
  const seen = new Set<string>();

  for (const c of existing ?? []) {
    const stateSlug = String(c.stateSlug || '')
      .trim()
      .toLowerCase();
    const countySlug = String(c.countySlug || '')
      .trim()
      .toLowerCase();
    if (!stateSlug || !countySlug) continue;
    const key = `${stateSlug}/${countySlug}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ stateSlug, countySlug, name: c.name });
  }

  for (const c of assigned ?? []) {
    const key = `${c.stateSlug}/${c.countySlug}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ stateSlug: c.stateSlug, countySlug: c.countySlug });
  }

  return out;
}
