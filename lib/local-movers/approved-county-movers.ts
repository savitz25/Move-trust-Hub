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
  'id, slug, name, short_description, headquarters, usdot_number, mc_number, fmcsa_safety_rating, bbb_rating, overall_rating, review_count, services, specialties, is_verified, service_scope, entity_type, coverage_counties, last_updated, fmcsa_legal_name, fmcsa_raw, out_of_service, authority_active, usdot_status';

const COMPANY_MOVER_SELECT_CORE =
  'id, slug, name, short_description, headquarters, usdot_number, mc_number, fmcsa_safety_rating, bbb_rating, overall_rating, review_count, services, specialties, is_verified, last_updated, fmcsa_legal_name, fmcsa_raw, out_of_service, authority_active, usdot_status';

const PAGE_SIZE = 1000;
const IN_CHUNK = 100;
/** Bulk all-county load (state hubs / warm path). */
const BULK_FETCH_TIMEOUT_MS = 45_000;
/** Per-county path — must stay well under page generation budget. */
const COUNTY_FETCH_TIMEOUT_MS = 12_000;

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
  out_of_service?: boolean | null;
  authority_active?: boolean | null;
  usdot_status?: string | null;
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
 * Load companies by id OR slug. Assignment rows often store slug in company_id.
 * Always dual-query — a successful empty `.in('id', slugs)` must not skip slug lookup.
 */
async function loadCompaniesByIds(
  client: SupabaseClient<Database>,
  companyIds: string[]
): Promise<Map<string, CompanyMoverRow>> {
  const companiesById = new Map<string, CompanyMoverRow>();
  if (!companyIds.length) return companiesById;

  function indexCompany(company: CompanyMoverRow) {
    const named = withPublicDisplayName(company);
    companiesById.set(named.id, named);
    if (named.slug) companiesById.set(named.slug, named);
  }

  for (let i = 0; i < companyIds.length; i += IN_CHUNK) {
    const chunk = companyIds.slice(i, i + IN_CHUNK);

    // Prefer full columns (service_scope / coverage). Fall back to core if schema lags.
    let select = COMPANY_MOVER_SELECT_FULL;
    let byId = await client.from('companies').select(select).in('id', chunk);
    if (
      byId.error &&
      (byId.error.code === 'PGRST204' ||
        byId.error.code === '42703' ||
        /service_scope|coverage_counties|does not exist/i.test(byId.error.message))
    ) {
      select = COMPANY_MOVER_SELECT_CORE;
      byId = await client.from('companies').select(select).in('id', chunk);
    }

    const bySlug = await client.from('companies').select(select).in('slug', chunk);

    if (byId.error && bySlug.error) {
      logger.error('approved_movers.companies_failed', {
        byId: byId.error?.message,
        bySlug: bySlug.error?.message,
      });
      continue;
    }

    for (const row of (byId.data ?? []) as CompanyMoverRow[]) indexCompany(row);
    for (const row of (bySlug.data ?? []) as CompanyMoverRow[]) indexCompany(row);

    for (const key of chunk) {
      if (companiesById.has(key)) continue;
      const { data } = await client
        .from('companies')
        .select(select)
        .or(`id.eq.${key},slug.eq.${key}`)
        .maybeSingle();
      if (data) indexCompany(data as CompanyMoverRow);
    }
  }

  return companiesById;
}

function moversFromAssignments(
  assignments: AssignmentRow[],
  companiesById: Map<string, CompanyMoverRow>,
  extraLocalKeys?: Set<string>
): LocalMover[] {
  const localKeys = new Set<string>(extraLocalKeys);
  for (const row of assignments) {
    if (isLocalAssignmentSource(row.source)) {
      if (row.company_id) localKeys.add(row.company_id);
      if (row.company_slug) localKeys.add(row.company_slug);
    }
  }

  const seen = new Set<string>();
  const movers: LocalMover[] = [];
  for (const row of assignments) {
    const key = row.company_id || row.company_slug;
    if (!key || seen.has(key)) continue;
    seen.add(key);
    const company =
      companiesById.get(row.company_id) ||
      companiesById.get(row.company_slug) ||
      companiesById.get(key);
    if (!company) continue;

    const isIntrastate =
      company.service_scope === 'intrastate' ||
      localKeys.has(company.id) ||
      localKeys.has(company.slug) ||
      localKeys.has(key);
    if (!isIntrastate && company.is_verified === false) continue;

    const mover = companyToLocalMover(company);
    if (isIntrastate && !mover.isLocalOnly) mover.isLocalOnly = true;
    movers.push(mover);
  }
  return sortMoversForCounty(movers);
}

/**
 * Fast path: one county's assignments + company rows.
 * Used for live county pages so a bulk timeout cannot blank the whole directory.
 */
async function loadApprovedMoversForSingleCounty(
  client: SupabaseClient<Database>,
  stateSlug: string,
  countySlug: string
): Promise<LocalMover[]> {
  const { data, error } = await client
    .from('company_destination_assignments')
    .select('company_id, company_slug, state_slug, county_slug, source')
    .eq('state_slug', stateSlug)
    .eq('county_slug', countySlug);

  let assignments: AssignmentRow[] = [];
  if (error) {
    if (/source|does not exist|PGRST204|42703/i.test(error.message + (error.code || ''))) {
      const bare = await client
        .from('company_destination_assignments')
        .select('company_id, company_slug, state_slug, county_slug')
        .eq('state_slug', stateSlug)
        .eq('county_slug', countySlug);
      if (bare.error) {
        logger.error('approved_movers.county_assignments_failed', {
          stateSlug,
          countySlug,
          message: bare.error.message,
        });
        throw new Error(`approved_movers_county_assignments:${bare.error.message}`);
      }
      assignments = (bare.data ?? []) as AssignmentRow[];
    } else {
      logger.error('approved_movers.county_assignments_failed', {
        stateSlug,
        countySlug,
        message: error.message,
      });
      throw new Error(`approved_movers_county_assignments:${error.message}`);
    }
  } else {
    assignments = (data ?? []) as AssignmentRow[];
  }

  // Coverage-counties path for verified intrastate companies that list this county.
  const coverageLinks = await loadIntrastateCoverageForCounty(client, stateSlug, countySlug);
  for (const link of coverageLinks) {
    assignments.push({
      company_id: link.company.id,
      company_slug: link.company.slug,
      state_slug: stateSlug,
      county_slug: countySlug,
      source: 'local_intrastate',
    });
  }

  if (!assignments.length) return [];

  const companyIds = [
    ...new Set(
      assignments.flatMap((row) =>
        [row.company_id, row.company_slug].filter(Boolean) as string[]
      )
    ),
  ];
  const companiesById = await loadCompaniesByIds(client, companyIds);
  for (const link of coverageLinks) {
    companiesById.set(link.company.id, link.company);
    if (link.company.slug) companiesById.set(link.company.slug, link.company);
  }

  const movers = moversFromAssignments(assignments, companiesById);
  logger.info('approved_movers.county_loaded', {
    stateSlug,
    countySlug,
    assignments: assignments.length,
    movers: movers.length,
  });
  return movers;
}

async function loadIntrastateCoverageForCounty(
  client: SupabaseClient<Database>,
  stateSlug: string,
  countySlug: string
): Promise<Array<{ company: CompanyMoverRow }>> {
  const out: Array<{ company: CompanyMoverRow }> = [];
  const withScope = await client
    .from('companies')
    .select(COMPANY_MOVER_SELECT_FULL)
    .eq('service_scope', 'intrastate')
    .limit(500);

  if (withScope.error) {
    if (
      withScope.error.code === 'PGRST204' ||
      withScope.error.code === '42703' ||
      /service_scope|coverage_counties|does not exist/i.test(withScope.error.message)
    ) {
      return out;
    }
    logger.warn('approved_movers.intrastate_county_scan_failed', {
      message: withScope.error.message,
    });
    return out;
  }

  for (const company of (withScope.data ?? []) as CompanyMoverRow[]) {
    const named = withPublicDisplayName(company);
    const counties = normalizeSelectedCounties(named.coverage_counties);
    if (counties.some((c) => c.stateSlug === stateSlug && c.countySlug === countySlug)) {
      out.push({ company: named });
    }
  }
  return out;
}

/**
 * One batched load of all county → approved mover mappings.
 * Prefer per-county path for pages; bulk is for warm/debug.
 */
async function fetchAllApprovedMoversByCounty(): Promise<Record<string, LocalMover[]>> {
  const client = createPublicOrAdminClient();
  if (!client) {
    logger.error('approved_movers.no_supabase_client', {
      admin: isSupabaseAdminConfigured(),
      anon: isSupabaseConfigured(),
    });
    // Throw so unstable_cache does NOT cache an empty map as success.
    throw new Error('approved_movers_no_supabase_client');
  }

  const loaded = await withTimeout(
    loadAllApprovedMoversByCounty(client),
    BULK_FETCH_TIMEOUT_MS,
    'all'
  );
  if (loaded == null) {
    throw new Error('approved_movers_bulk_timeout');
  }
  return loaded;
}

async function fetchApprovedMoversForCountyUncached(
  stateSlug: string,
  countySlug: string
): Promise<LocalMover[]> {
  const client = createPublicOrAdminClient();
  if (!client) {
    logger.error('approved_movers.no_supabase_client', {
      stateSlug,
      countySlug,
      admin: isSupabaseAdminConfigured(),
      anon: isSupabaseConfigured(),
    });
    throw new Error('approved_movers_no_supabase_client');
  }

  const loaded = await withTimeout(
    loadApprovedMoversForSingleCounty(client, stateSlug, countySlug),
    COUNTY_FETCH_TIMEOUT_MS,
    `${stateSlug}/${countySlug}`
  );
  if (loaded == null) {
    throw new Error(`approved_movers_county_timeout:${stateSlug}/${countySlug}`);
  }
  return loaded;
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
        // Phase 1: assignment controls presence on the page, not the Local badge.
        // Local vs Regional is decided by locality-rules (distance / seat match).
        // Only honor explicit intrastate service_scope from the company row.
        if (isIntrastate && company.service_scope === 'intrastate' && !mover.isLocalOnly) {
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
  // v7: dual id/slug company resolve + throw on timeout (do not cache empty failure)
  ['approved-county-movers-all-v7-dual-slug'],
  { tags: [APPROVED_COUNTY_MOVERS_TAG], revalidate: 60 }
);

/**
 * Per-county cache — primary path for county pages and state hub badges.
 * Isolated so one bulk timeout cannot zero-out every county for 60s.
 */
function getApprovedMoversForCountyCached(stateSlug: string, countySlug: string) {
  return unstable_cache(
    () => fetchApprovedMoversForCountyUncached(stateSlug, countySlug),
    // v7 per-county
    ['approved-county-movers-one-v7', stateSlug, countySlug],
    { tags: [APPROVED_COUNTY_MOVERS_TAG], revalidate: 60 }
  )();
}

/**
 * Approved / onboarded movers for a county from Supabase (are).
 * Never silently returns empty on infra failure — throws so callers can degrade visibly.
 * Empty array only means “DB has no assignments for this county”.
 */
export async function getApprovedMoversForCounty(
  stateSlug: string,
  countySlug: string
): Promise<LocalMover[]> {
  try {
    return await getApprovedMoversForCountyCached(stateSlug, countySlug);
  } catch (err) {
    logger.warn('approved_movers.county_cache_failed_try_bulk', {
      stateSlug,
      countySlug,
      message: err instanceof Error ? err.message : String(err),
    });
    try {
      const all = await getAllApprovedMoversByCountyCached();
      return all[countyKey(stateSlug, countySlug)] ?? [];
    } catch (bulkErr) {
      logger.error('approved_movers.county_and_bulk_failed', {
        stateSlug,
        countySlug,
        county: err instanceof Error ? err.message : String(err),
        bulk: bulkErr instanceof Error ? bulkErr.message : String(bulkErr),
      });
      // Propagate so getMoversForCountyAsync can set sourceMode=degraded.
      throw bulkErr instanceof Error
        ? bulkErr
        : new Error(String(bulkErr ?? err));
    }
  }
}

/** Debug / health: force a fresh bulk load (bypasses per-county). */
export async function getAllApprovedMoversByCountyForHealth(): Promise<{
  countyCount: number;
  sample: Record<string, number>;
  error?: string;
}> {
  try {
    const all = await fetchAllApprovedMoversByCounty();
    const sample: Record<string, number> = {};
    for (const key of [
      'florida::broward',
      'florida::miami-dade',
      'texas::harris',
      'california::los-angeles',
      'illinois::cook',
      'new-york::kings',
    ]) {
      sample[key] = all[key]?.length ?? 0;
    }
    return { countyCount: Object.keys(all).length, sample };
  } catch (err) {
    return {
      countyCount: 0,
      sample: {},
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
