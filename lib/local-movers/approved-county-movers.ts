import 'server-only';

import { unstable_cache } from 'next/cache';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { resolvePublicCompanyNameFromSources } from '@/lib/companies/public-display-name';
import { createAdminClient } from '@/lib/supabase/admin';
import {
  getSupabaseAnonKey,
  getSupabaseUrl,
  isSupabaseAdminConfigured,
  isSupabaseConfigured,
} from '@/lib/supabase/config';
import { companyToLocalMover } from '@/lib/local-movers/company-to-local-mover';
import type { LocalMover } from '@/lib/local-movers/types';
import { normalizeSelectedCounties } from '@/lib/suggestions/service-scope';
import { logger } from '@/lib/logging/logger';
import type { Database } from '@/types/supabase';

import { APPROVED_COUNTY_MOVERS_TAG } from '@/lib/local-movers/approved-county-movers-tag';

export { APPROVED_COUNTY_MOVERS_TAG };

const COMPANY_MOVER_SELECT_FULL =
  'id, slug, name, short_description, headquarters, usdot_number, mc_number, fmcsa_safety_rating, bbb_rating, overall_rating, review_count, services, specialties, is_verified, service_scope, entity_type, coverage_counties, last_updated, fmcsa_legal_name, fmcsa_raw';

const COMPANY_MOVER_SELECT_CORE =
  'id, slug, name, short_description, headquarters, usdot_number, mc_number, fmcsa_safety_rating, bbb_rating, overall_rating, review_count, services, specialties, is_verified, last_updated, fmcsa_legal_name, fmcsa_raw';

const PAGE_SIZE = 1000;
const IN_CHUNK = 100;
/** Hard cap so a stuck Supabase call cannot blow the 60s static page timeout. */
const FETCH_TIMEOUT_MS = 18_000;

/** Assignment sources that mark a company as true local for the county. */
const LOCAL_ASSIGNMENT_SOURCES = new Set([
  'local_intrastate_selection',
  'local_intrastate',
  'intrastate',
  'repair_local_county_placement',
]);

type AssignmentRow = {
  company_id: string;
  company_slug: string;
  state_slug: string;
  county_slug: string;
  source?: string | null;
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
  fmcsa_legal_name?: string | null;
  fmcsa_raw?: unknown;
};

/** Prefer service-role when available; otherwise public anon (assignments are public-readable). */
function createPublicOrAdminClient(): SupabaseClient<Database> | null {
  if (isSupabaseAdminConfigured()) {
    try {
      return createAdminClient() as SupabaseClient<Database>;
    } catch (err) {
      logger.warn('approved_movers.admin_client_failed', {
        message: err instanceof Error ? err.message : String(err),
      });
    }
  }
  if (!isSupabaseConfigured()) return null;
  const url = getSupabaseUrl();
  const anon = getSupabaseAnonKey();
  if (!url || !anon) return null;
  return createClient<Database>(url, anon, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** Apply DBA preference so county cards match full profiles and the main directory. */
function withPublicDisplayName(company: CompanyMoverRow): CompanyMoverRow {
  const resolved = resolvePublicCompanyNameFromSources({
    storedName: company.name,
    fmcsaLegalName: company.fmcsa_legal_name,
    fmcsaRaw: company.fmcsa_raw,
  });
  if (!resolved.publicName || resolved.publicName === company.name) return company;
  return { ...company, name: resolved.publicName };
}

function countyKey(stateSlug: string, countySlug: string): string {
  return `${stateSlug}::${countySlug}`;
}

function isLocalAssignmentSource(source: string | null | undefined): boolean {
  if (!source) return false;
  return LOCAL_ASSIGNMENT_SOURCES.has(source) || source.includes('local_intrastate');
}

function sortMoversForCounty(movers: LocalMover[]): LocalMover[] {
  return [...movers].sort((a, b) => {
    if (Boolean(a.isLocalOnly) !== Boolean(b.isLocalOnly)) {
      return a.isLocalOnly ? -1 : 1;
    }
    if (Boolean(a.recentlyAdded) !== Boolean(b.recentlyAdded)) {
      return a.recentlyAdded ? -1 : 1;
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
  const client = createPublicOrAdminClient();
  if (!client) {
    logger.warn('approved_movers.no_supabase_client', {
      admin: isSupabaseAdminConfigured(),
      anon: isSupabaseConfigured(),
    });
    return {};
  }

  const loaded = await withTimeout(loadAllApprovedMoversByCounty(client), FETCH_TIMEOUT_MS, 'all');
  return loaded ?? {};
}

async function loadCompaniesByIds(
  client: SupabaseClient<Database>,
  companyIds: string[]
): Promise<Map<string, CompanyMoverRow>> {
  const companiesById = new Map<string, CompanyMoverRow>();
  if (!companyIds.length) return companiesById;

  for (let i = 0; i < companyIds.length; i += IN_CHUNK) {
    const chunk = companyIds.slice(i, i + IN_CHUNK);

    // Progressive select: full scope columns → core (prod may lack service_scope).
    let companies: CompanyMoverRow[] | null = null;

    const withScope = await client
      .from('companies')
      .select(COMPANY_MOVER_SELECT_FULL)
      .in('id', chunk);

    if (!withScope.error) {
      companies = (withScope.data ?? []) as CompanyMoverRow[];
    } else {
      // Also try matching by slug when assignment company_id stores slug (common in this DB).
      const bySlug = await client
        .from('companies')
        .select(COMPANY_MOVER_SELECT_CORE)
        .in('slug', chunk);

      const byId = await client
        .from('companies')
        .select(COMPANY_MOVER_SELECT_CORE)
        .in('id', chunk);

      if (byId.error && bySlug.error) {
        logger.error('approved_movers.companies_failed', {
          code: withScope.error.code,
          message: withScope.error.message,
          byId: byId.error?.message,
          bySlug: bySlug.error?.message,
        });
        continue;
      }

      const map = new Map<string, CompanyMoverRow>();
      for (const row of (byId.data ?? []) as CompanyMoverRow[]) {
        map.set(row.id, row);
        if (row.slug) map.set(row.slug, row);
      }
      for (const row of (bySlug.data ?? []) as CompanyMoverRow[]) {
        map.set(row.id, row);
        if (row.slug) map.set(row.slug, row);
      }
      companies = [...new Map([...map.values()].map((c) => [c.id, c])).values()];
    }

    // Ensure slug-keyed lookups work when assignment.company_id is a slug.
    for (const company of companies ?? []) {
      const named = withPublicDisplayName(company);
      companiesById.set(named.id, named);
      if (named.slug && named.slug !== named.id) {
        companiesById.set(named.slug, named);
      }
    }

    // Fill any ids still missing via per-id or per-slug lookup (handles mixed keys).
    for (const key of chunk) {
      if (companiesById.has(key)) continue;
      const { data } = await client
        .from('companies')
        .select(COMPANY_MOVER_SELECT_CORE)
        .or(`id.eq.${key},slug.eq.${key}`)
        .maybeSingle();
      if (data) {
        const named = withPublicDisplayName(data as CompanyMoverRow);
        companiesById.set(named.id, named);
        companiesById.set(key, named);
        if (named.slug) companiesById.set(named.slug, named);
      }
    }
  }

  return companiesById;
}

/**
 * Intrastate companies store selected counties on the company row as well as assignments.
 * Merge both sources so counts update even if one path lagged.
 * When service_scope column is missing, this path no-ops (assignments still work).
 */
async function loadIntrastateCoverageCounties(
  client: SupabaseClient<Database>
): Promise<Array<{ company: CompanyMoverRow; stateSlug: string; countySlug: string }>> {
  const out: Array<{ company: CompanyMoverRow; stateSlug: string; countySlug: string }> = [];

  for (let from = 0; ; from += PAGE_SIZE) {
    const withScope = await client
      .from('companies')
      .select(COMPANY_MOVER_SELECT_FULL)
      .eq('service_scope', 'intrastate')
      .range(from, from + PAGE_SIZE - 1);

    if (withScope.error) {
      if (
        withScope.error.code === 'PGRST204' ||
        withScope.error.code === '42703' ||
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

    const rows = (withScope.data ?? []) as CompanyMoverRow[];
    if (!rows.length) break;

    for (const company of rows) {
      // Prefer verified, but still surface assigned locals (is_verified may lag).
      const named = withPublicDisplayName(company);
      const counties = normalizeSelectedCounties(named.coverage_counties);
      for (const c of counties) {
        out.push({
          company: named,
          stateSlug: c.stateSlug,
          countySlug: c.countySlug,
        });
      }
    }

    if (rows.length < PAGE_SIZE) break;
  }

  return out;
}

async function loadAllApprovedMoversByCounty(
  client: SupabaseClient<Database>
): Promise<Record<string, LocalMover[]>> {
  try {
    const assignments: AssignmentRow[] = [];

    for (let from = 0; ; from += PAGE_SIZE) {
      const { data, error } = await client
        .from('company_destination_assignments')
        .select('company_id, company_slug, state_slug, county_slug, source')
        .not('county_slug', 'is', null)
        .range(from, from + PAGE_SIZE - 1);

      if (error) {
        // Older schemas may lack source column
        if (/source|does not exist|PGRST204|42703/i.test(error.message + (error.code || ''))) {
          const bare = await client
            .from('company_destination_assignments')
            .select('company_id, company_slug, state_slug, county_slug')
            .not('county_slug', 'is', null)
            .range(from, from + PAGE_SIZE - 1);
          if (bare.error) {
            logger.error('approved_movers.assignments_failed', {
              code: bare.error.code,
              message: bare.error.message,
            });
            return {};
          }
          if (!bare.data?.length) break;
          assignments.push(
            ...(bare.data as AssignmentRow[]).filter((r) => r.state_slug && r.county_slug)
          );
          if (bare.data.length < PAGE_SIZE) break;
          continue;
        }
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

    const companyIds = [
      ...new Set(
        assignments.flatMap((row) =>
          [row.company_id, row.company_slug].filter(Boolean) as string[]
        )
      ),
    ];
    const companiesById = await loadCompaniesByIds(client, companyIds);

    // Track which company keys are true locals via assignment source
    const localKeys = new Set<string>();
    for (const row of assignments) {
      if (isLocalAssignmentSource(row.source)) {
        if (row.company_id) localKeys.add(row.company_id);
        if (row.company_slug) localKeys.add(row.company_slug);
      }
    }

    // Coverage-counties path for intrastate (when columns exist).
    const coverageLinks = await loadIntrastateCoverageCounties(client);
    for (const link of coverageLinks) {
      if (!companiesById.has(link.company.id)) {
        companiesById.set(link.company.id, link.company);
      }
      localKeys.add(link.company.id);
      if (link.company.slug) localKeys.add(link.company.slug);
    }

    const byCountyIds = new Map<string, string[]>();

    function pushCountyCompany(stateSlug: string, countySlug: string, companyKey: string) {
      const key = countyKey(stateSlug, countySlug);
      if (!byCountyIds.has(key)) byCountyIds.set(key, []);
      byCountyIds.get(key)!.push(companyKey);
    }

    for (const row of assignments) {
      pushCountyCompany(row.state_slug, row.county_slug, row.company_id || row.company_slug);
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

        // Never drop assigned locals. Only skip unverified *interstate* shells.
        const isIntrastate =
          company.service_scope === 'intrastate' ||
          localKeys.has(company.id) ||
          localKeys.has(company.slug) ||
          localKeys.has(id);
        if (!isIntrastate && company.is_verified === false) {
          continue;
        }

        const mover = companyToLocalMover(company);
        // Force local badge when assignment/coverage path marks them local.
        if (isIntrastate && !mover.isLocalOnly) {
          mover.isLocalOnly = true;
        }
        movers.push(mover);
      }
      if (movers.length) byCounty[key] = sortMoversForCounty(movers);
    }

    logger.info('approved_movers.loaded', {
      counties: Object.keys(byCounty).length,
      assignments: assignments.length,
      coverageLinks: coverageLinks.length,
      companies: companiesById.size,
      localKeys: localKeys.size,
      admin: isSupabaseAdminConfigured(),
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
  // v6: anon fallback + assignment-source local flags + no service_scope column required
  ['approved-county-movers-all-v6-anon-local-source'],
  { tags: [APPROVED_COUNTY_MOVERS_TAG], revalidate: 60 }
);

export async function getApprovedMoversForCounty(
  stateSlug: string,
  countySlug: string
): Promise<LocalMover[]> {
  const all = await getAllApprovedMoversByCountyCached();
  return all[countyKey(stateSlug, countySlug)] ?? [];
}
