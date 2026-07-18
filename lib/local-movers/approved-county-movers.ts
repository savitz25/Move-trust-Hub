import 'server-only';

import { unstable_cache } from 'next/cache';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import { companyToLocalMover } from '@/lib/local-movers/company-to-local-mover';
import type { LocalMover } from '@/lib/local-movers/types';
import { logger } from '@/lib/logging/logger';

import { APPROVED_COUNTY_MOVERS_TAG } from '@/lib/local-movers/approved-county-movers-tag';

export { APPROVED_COUNTY_MOVERS_TAG };

const COMPANY_MOVER_SELECT =
  'id, slug, name, short_description, headquarters, usdot_number, mc_number, fmcsa_safety_rating, bbb_rating, overall_rating, review_count, services, specialties, is_verified';

const PAGE_SIZE = 1000;
const IN_CHUNK = 100;
/** Hard cap so a stuck Supabase call cannot blow the 60s static page timeout. */
const FETCH_TIMEOUT_MS = 12_000;

type AssignmentRow = {
  company_id: string;
  company_slug: string;
  state_slug: string;
  county_slug: string;
};

type CompanyMoverRow = {
  id: string;
  slug: string;
  name: string;
  short_description?: string | null;
  headquarters?: string | null;
  usdot_number?: string | null;
  mc_number?: string | null;
  fmcsa_safety_rating?: string | null;
  bbb_rating?: string | null;
  overall_rating?: number | null;
  review_count?: number | null;
  services?: unknown;
  specialties?: unknown;
  is_verified?: boolean | null;
};

function countyKey(stateSlug: string, countySlug: string): string {
  return `${stateSlug}::${countySlug}`;
}

async function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T | null> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      promise,
      new Promise<null>((resolve) => {
        timer = setTimeout(() => {
          logger.warn('approved_movers.fetch_timeout', { label, ms });
          resolve(null);
        }, ms);
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

/**
 * One batched load of all county → approved mover mappings.
 * Avoids N×2 Supabase round-trips during SSG of ~5k destination/county pages.
 */
async function fetchAllApprovedMoversByCounty(): Promise<Record<string, LocalMover[]>> {
  if (!isSupabaseAdminConfigured()) return {};

  const loaded = await withTimeout(loadAllApprovedMoversByCounty(), FETCH_TIMEOUT_MS, 'all');
  return loaded ?? {};
}

async function loadAllApprovedMoversByCounty(): Promise<Record<string, LocalMover[]>> {
  try {
    const admin = createAdminClient();
    const assignments: AssignmentRow[] = [];

    for (let from = 0; ; from += PAGE_SIZE) {
      const { data, error } = await admin
        .from('company_destination_assignments')
        .select('company_id, company_slug, state_slug, county_slug')
        .range(from, from + PAGE_SIZE - 1);

      if (error) {
        logger.error('approved_movers.assignments_failed', {
          code: error.code,
          message: error.message,
        });
        return {};
      }

      if (!data?.length) break;
      assignments.push(...(data as AssignmentRow[]));
      if (data.length < PAGE_SIZE) break;
    }

    if (!assignments.length) return {};

    const companyIds = [...new Set(assignments.map((row) => row.company_id))];
    const companiesById = new Map<string, CompanyMoverRow>();

    for (let i = 0; i < companyIds.length; i += IN_CHUNK) {
      const chunk = companyIds.slice(i, i + IN_CHUNK);
      const { data: companies, error: companyError } = await admin
        .from('companies')
        .select(COMPANY_MOVER_SELECT)
        .in('id', chunk)
        .eq('is_verified', true);

      if (companyError) {
        logger.error('approved_movers.companies_failed', {
          code: companyError.code,
          message: companyError.message,
        });
        return {};
      }

      for (const company of (companies ?? []) as CompanyMoverRow[]) {
        companiesById.set(company.id, company);
      }
    }

    const byCounty: Record<string, LocalMover[]> = {};
    const orderWithinCounty = new Map<string, string[]>();

    for (const row of assignments) {
      const key = countyKey(row.state_slug, row.county_slug);
      if (!orderWithinCounty.has(key)) orderWithinCounty.set(key, []);
      orderWithinCounty.get(key)!.push(row.company_id);
    }

    for (const [key, orderedIds] of orderWithinCounty) {
      const seen = new Set<string>();
      const movers: LocalMover[] = [];
      for (const id of orderedIds) {
        if (seen.has(id)) continue;
        seen.add(id);
        const company = companiesById.get(id);
        if (!company) continue;
        movers.push(companyToLocalMover(company));
      }
      if (movers.length) byCounty[key] = movers;
    }

    return byCounty;
  } catch (err) {
    logger.error('approved_movers.load_failed', {
      message: err instanceof Error ? err.message : String(err),
    });
    return {};
  }
}

const getAllApprovedMoversByCountyCached = unstable_cache(
  fetchAllApprovedMoversByCounty,
  ['approved-county-movers-all-v1'],
  { tags: [APPROVED_COUNTY_MOVERS_TAG], revalidate: 300 }
);

export async function getApprovedMoversForCounty(
  stateSlug: string,
  countySlug: string
): Promise<LocalMover[]> {
  const all = await getAllApprovedMoversByCountyCached();
  return all[countyKey(stateSlug, countySlug)] ?? [];
}
