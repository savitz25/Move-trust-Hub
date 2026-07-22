import 'server-only';

import { unstable_cache } from 'next/cache';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import { companyToLocalMover } from '@/lib/local-movers/company-to-local-mover';
import type { LocalMover } from '@/lib/local-movers/types';
import { normalizeSelectedCounties } from '@/lib/suggestions/service-scope';
import { logger } from '@/lib/logging/logger';

import { APPROVED_COUNTY_MOVERS_TAG } from '@/lib/local-movers/approved-county-movers-tag';

export { APPROVED_COUNTY_MOVERS_TAG };

const COMPANY_MOVER_SELECT =
  'id, slug, name, short_description, headquarters, usdot_number, mc_number, fmcsa_safety_rating, bbb_rating, overall_rating, review_count, services, specialties, is_verified, service_scope, entity_type, coverage_counties, last_updated';

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
  service_scope?: string | null;
  entity_type?: string | null;
  coverage_counties?: unknown;
  last_updated?: string | null;
};

function countyKey(stateSlug: string, countySlug: string): string {
  return `${stateSlug}::${countySlug}`;
}

function sortMoversForCounty(movers: LocalMover[]): LocalMover[] {
  return [...movers].sort((a, b) => {
    // Recently added local/directory listings first
    if (Boolean(a.recentlyAdded) !== Boolean(b.recentlyAdded)) {
      return a.recentlyAdded ? -1 : 1;
    }
    if (Boolean(a.isLocalOnly) !== Boolean(b.isLocalOnly)) {
      return a.isLocalOnly ? -1 : 1;
    }
    const aTime = a.lastUpdated ? Date.parse(a.lastUpdated) : 0;
    const bTime = b.lastUpdated ? Date.parse(b.lastUpdated) : 0;
    if (aTime !== bTime) return bTime - aTime;
    return (b.rating || 0) - (a.rating || 0);
  });
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

async function loadCompaniesByIds(
  admin: ReturnType<typeof createAdminClient>,
  companyIds: string[]
): Promise<Map<string, CompanyMoverRow>> {
  const companiesById = new Map<string, CompanyMoverRow>();
  if (!companyIds.length) return companiesById;

  for (let i = 0; i < companyIds.length; i += IN_CHUNK) {
    const chunk = companyIds.slice(i, i + IN_CHUNK);
    // Prefer filter in query; fall back without service_scope if column missing.
    let companies: CompanyMoverRow[] | null = null;
    const withScope = await admin
      .from('companies')
      .select(COMPANY_MOVER_SELECT)
      .in('id', chunk)
      .or('is_verified.eq.true,service_scope.eq.intrastate');

    if (withScope.error) {
      const fallback = await admin
        .from('companies')
        .select(
          'id, slug, name, short_description, headquarters, usdot_number, mc_number, fmcsa_safety_rating, bbb_rating, overall_rating, review_count, services, specialties, is_verified, last_updated'
        )
        .in('id', chunk);
      if (fallback.error) {
        logger.error('approved_movers.companies_failed', {
          code: withScope.error.code,
          message: withScope.error.message,
          fallback: fallback.error.message,
        });
        continue;
      }
      // Without service_scope column, include all assigned companies (assignments already gate local).
      companies = (fallback.data ?? []) as CompanyMoverRow[];
    } else {
      companies = (withScope.data ?? []) as CompanyMoverRow[];
    }

    for (const company of companies) {
      companiesById.set(company.id, company);
    }
  }

  return companiesById;
}

/**
 * Intrastate companies store selected counties on the company row as well as assignments.
 * Merge both sources so counts update even if one path lagged.
 */
async function loadIntrastateCoverageCounties(
  admin: ReturnType<typeof createAdminClient>
): Promise<Array<{ company: CompanyMoverRow; stateSlug: string; countySlug: string }>> {
  const out: Array<{ company: CompanyMoverRow; stateSlug: string; countySlug: string }> = [];

  for (let from = 0; ; from += PAGE_SIZE) {
    const withScope = await admin
      .from('companies')
      .select(COMPANY_MOVER_SELECT)
      .eq('service_scope', 'intrastate')
      .eq('is_verified', true)
      .range(from, from + PAGE_SIZE - 1);

    let rows: CompanyMoverRow[] = [];
    if (withScope.error) {
      // Column may not exist yet — skip this path.
      if (
        withScope.error.code === 'PGRST204' ||
        /service_scope|coverage_counties|does not exist/i.test(withScope.error.message)
      ) {
        return out;
      }
      logger.warn('approved_movers.intrastate_scan_failed', {
        code: withScope.error.code,
        message: withScope.error.message,
      });
      return out;
    }

    rows = (withScope.data ?? []) as CompanyMoverRow[];
    if (!rows.length) break;

    for (const company of rows) {
      const counties = normalizeSelectedCounties(company.coverage_counties);
      for (const c of counties) {
        out.push({
          company,
          stateSlug: c.stateSlug,
          countySlug: c.countySlug,
        });
      }
    }

    if (rows.length < PAGE_SIZE) break;
  }

  return out;
}

async function loadAllApprovedMoversByCounty(): Promise<Record<string, LocalMover[]>> {
  try {
    const admin = createAdminClient();
    const assignments: AssignmentRow[] = [];

    for (let from = 0; ; from += PAGE_SIZE) {
      const { data, error } = await admin
        .from('company_destination_assignments')
        .select('company_id, company_slug, state_slug, county_slug')
        .not('county_slug', 'is', null)
        .range(from, from + PAGE_SIZE - 1);

      if (error) {
        logger.error('approved_movers.assignments_failed', {
          code: error.code,
          message: error.message,
        });
        return {};
      }

      if (!data?.length) break;
      assignments.push(
        ...(data as AssignmentRow[]).filter((r) => r.state_slug && r.county_slug)
      );
      if (data.length < PAGE_SIZE) break;
    }

    const companyIds = [...new Set(assignments.map((row) => row.company_id))];
    const companiesById = await loadCompaniesByIds(admin, companyIds);

    // Coverage-counties path for intrastate (may include companies not yet in assignments).
    const coverageLinks = await loadIntrastateCoverageCounties(admin);
    for (const link of coverageLinks) {
      if (!companiesById.has(link.company.id)) {
        companiesById.set(link.company.id, link.company);
      }
    }

    const byCountyIds = new Map<string, string[]>();

    function pushCountyCompany(stateSlug: string, countySlug: string, companyId: string) {
      const key = countyKey(stateSlug, countySlug);
      if (!byCountyIds.has(key)) byCountyIds.set(key, []);
      byCountyIds.get(key)!.push(companyId);
    }

    for (const row of assignments) {
      pushCountyCompany(row.state_slug, row.county_slug, row.company_id);
    }
    for (const link of coverageLinks) {
      pushCountyCompany(link.stateSlug, link.countySlug, link.company.id);
    }

    const byCounty: Record<string, LocalMover[]> = {};

    for (const [key, orderedIds] of byCountyIds) {
      const seen = new Set<string>();
      const movers: LocalMover[] = [];
      for (const id of orderedIds) {
        if (seen.has(id)) continue;
        seen.add(id);
        const company = companiesById.get(id);
        if (!company) continue;
        // Local listings must remain eligible even when is_verified was false historically.
        if (
          company.service_scope !== 'intrastate' &&
          company.is_verified === false
        ) {
          continue;
        }
        movers.push(companyToLocalMover(company));
      }
      if (movers.length) byCounty[key] = sortMoversForCounty(movers);
    }

    logger.info('approved_movers.loaded', {
      counties: Object.keys(byCounty).length,
      assignments: assignments.length,
      coverageLinks: coverageLinks.length,
      companies: companiesById.size,
    });

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
  // bump when entity_type is selected for county type badges
  ['approved-county-movers-all-v4-entity-type'],
  { tags: [APPROVED_COUNTY_MOVERS_TAG], revalidate: 60 }
);

export async function getApprovedMoversForCounty(
  stateSlug: string,
  countySlug: string
): Promise<LocalMover[]> {
  const all = await getAllApprovedMoversByCountyCached();
  return all[countyKey(stateSlug, countySlug)] ?? [];
}
