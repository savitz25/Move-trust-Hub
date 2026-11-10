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
import { isCountyAdjacent } from '@/lib/local-movers/county-adjacency';
import {
  BLANKET_SELF_SELECTED_COUNTY_THRESHOLD,
  countyAssignmentCountsAsCoverage,
  isOwnerSelectedAssignmentSource,
} from '@/lib/local-movers/county-coverage-evidence';
import { isPublishableCountyCompany } from '@/lib/local-movers/county-publication';
import { companyToLocalMover } from '@/lib/local-movers/company-to-local-mover';
import { canonicalEvidenceCompanyIds } from '@/lib/local-movers/evidence-company-ids';
import { parseHeadquarters } from '@/lib/local-movers/parse-headquarters';
import { resolveHeadquartersCounty } from '@/lib/local-movers/resolve-headquarters-county';
import { resolveCityToCounty } from '@/lib/local-movers/resolve-city-to-county';
import { localStates } from '@/lib/local-movers/states';
import type { LocalMover } from '@/lib/local-movers/types';
import { normalizeSelectedCounties } from '@/lib/suggestions/service-scope';
import { logger } from '@/lib/logging/logger';
import type { Database } from '@/types/supabase';

import { APPROVED_COUNTY_MOVERS_TAG } from '@/lib/local-movers/approved-county-movers-tag';

export { APPROVED_COUNTY_MOVERS_TAG };

// public.companies has no usdot_status column (Postgres 42703). Do not select it.
// USDOT registration is read from fmcsa_raw.statusCode. For-hire authority and
// out-of-service stay on their own columns.
const COMPANY_MOVER_SELECT_FULL =
  'id, slug, name, short_description, headquarters, usdot_number, mc_number, fmcsa_safety_rating, bbb_rating, overall_rating, review_count, services, specialties, is_verified, service_scope, entity_type, coverage_counties, last_updated, fmcsa_legal_name, fmcsa_raw, out_of_service, authority_active, publication_state';

const COMPANY_MOVER_SELECT_CORE =
  'id, slug, name, short_description, headquarters, usdot_number, mc_number, fmcsa_safety_rating, bbb_rating, overall_rating, review_count, services, specialties, is_verified, last_updated, fmcsa_legal_name, fmcsa_raw, out_of_service, authority_active, publication_state';

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
  publication_state?: string | null;
};

type CoverageEvidence = {
  serviceArea: Set<string>;
  discovery: Set<string>;
  stateEvidence: Set<string>;
  ownerCounts: Map<string, number>;
};

function evidenceKey(companyKey: string, stateSlug: string, countySlug?: string): string {
  return countySlug ? `${companyKey}|${stateSlug}|${countySlug}` : `${companyKey}|${stateSlug}`;
}

function slugifyPlace(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-county$/, '');
}

function headquartersPlacement(headquarters: string | null | undefined): {
  known: boolean;
  stateSlug: string | null;
  countySlug: string | null;
  inState: (selectionState: string) => boolean | null;
} {
  const resolved = resolveHeadquartersCounty(headquarters);
  return {
    known: resolved.countyResolved,
    stateSlug: resolved.stateSlug,
    countySlug: resolved.countySlug,
    inState: (selectionState: string) => {
      if (!resolved.stateKnown || !resolved.stateSlug) return null;
      return resolved.stateSlug === selectionState;
    },
  };
}

function companyKeys(company: CompanyMoverRow): string[] {
  return [...new Set([company.id, company.slug].filter(Boolean))] as string[];
}

function ownerSelectedCount(
  evidence: CoverageEvidence,
  company: CompanyMoverRow,
  stateSlug: string
): number {
  let count = 0;
  for (const key of companyKeys(company)) {
    count = Math.max(count, evidence.ownerCounts.get(evidenceKey(key, stateSlug)) ?? 0);
  }
  return count;
}

function hasStateEvidence(
  evidence: CoverageEvidence,
  company: CompanyMoverRow,
  stateSlug: string
): boolean {
  return companyKeys(company).some((key) => evidence.stateEvidence.has(evidenceKey(key, stateSlug)));
}

/** Publication plus coverage. Used everywhere a county mover row is accepted. */
function countyCompanyCounts(
  company: CompanyMoverRow,
  source: string | null | undefined,
  stateSlug: string,
  countySlug: string,
  evidence: CoverageEvidence
): boolean {
  if (!isPublishableCountyCompany(company.publication_state)) return false;
  const hq = headquartersPlacement(company.headquarters);
  const inState = hq.inState(stateSlug);
  const sameState = inState !== false && Boolean(hq.known && hq.countySlug);
  return countyAssignmentCountsAsCoverage({
    source,
    ownerSelectedCountyCountInState: ownerSelectedCount(evidence, company, stateSlug),
    headquartersKnown: Boolean(hq.known && inState !== false),
    headquartersInState: inState,
    headquartersCounty: Boolean(sameState && hq.countySlug === countySlug),
    adjacentToHeadquarters: Boolean(
      sameState && hq.countySlug && isCountyAdjacent(stateSlug, hq.countySlug, countySlug)
    ),
    serviceAreaForCounty: hasMarkedCounty(evidence.serviceArea, company, stateSlug, countySlug),
    discoveryForCounty: hasMarkedCounty(evidence.discovery, company, stateSlug, countySlug),
    stateLevelEvidence: hasStateEvidence(evidence, company, stateSlug),
  }).counts;
}

function addOwnerCounty(
  counts: Map<string, Set<string>>,
  companyKey: string,
  stateSlug: string,
  countySlug: string
) {
  if (!companyKey || !stateSlug || !countySlug) return;
  const key = evidenceKey(companyKey, stateSlug);
  const set = counts.get(key) ?? new Set<string>();
  set.add(countySlug);
  counts.set(key, set);
}

function emptyEvidence(): CoverageEvidence {
  return {
    serviceArea: new Set(),
    discovery: new Set(),
    stateEvidence: new Set(),
    ownerCounts: new Map(),
  };
}

type LooseRow = Record<string, unknown>;

async function selectEvidenceRows(
  client: SupabaseClient<Database>,
  table: string,
  columns: string,
  companyIds: string[]
): Promise<LooseRow[]> {
  const rows: LooseRow[] = [];
  const loose = client as unknown as {
    from: (name: string) => {
      select: (cols: string) => {
        in: (
          column: string,
          values: string[]
        ) => Promise<{ data: LooseRow[] | null; error: { message: string } | null }>;
      };
    };
  };
  for (let i = 0; i < companyIds.length; i += IN_CHUNK) {
    const chunk = companyIds.slice(i, i + IN_CHUNK);
    const { data, error } = await loose.from(table).select(columns).in('company_id', chunk);
    if (error) {
      logger.warn('approved_movers.evidence_unavailable', { table, message: error.message });
      return rows;
    }
    rows.push(...(data ?? []));
  }
  return rows;
}

function markCompanyCounty(
  set: Set<string>,
  companyId: string,
  stateSlug: string,
  countySlug: string
) {
  set.add(evidenceKey(companyId, stateSlug, countySlug));
}

function stateSlugFromCode(code: string): string | null {
  return localStates.find((state) => state.code === code.trim().toUpperCase())?.slug ?? null;
}

async function loadExternalEvidence(
  client: SupabaseClient<Database>,
  companyIds: string[]
): Promise<Pick<CoverageEvidence, 'serviceArea' | 'discovery' | 'stateEvidence'>> {
  const serviceArea = new Set<string>();
  const discovery = new Set<string>();
  const stateEvidence = new Set<string>();
  if (!companyIds.length) return { serviceArea, discovery, stateEvidence };

  const [areas, discoveries, authorities] = await Promise.all([
    selectEvidenceRows(client, 'provider_service_area', 'company_id, level, value', companyIds),
    selectEvidenceRows(
      client,
      'provider_local_discovery_evidence',
      'company_id, state_code, county_name, basis, verification_state',
      companyIds
    ),
    selectEvidenceRows(
      client,
      'provider_state_authority',
      'company_id, state_code, status, verification_state',
      companyIds
    ),
  ]);

  for (const row of areas) {
    const companyId = String(row.company_id ?? '');
    const level = String(row.level ?? '').toLowerCase();
    const value = String(row.value ?? '');
    if (!companyId || !value) continue;
    if (level === 'state') {
      const stateSlug = stateSlugFromCode(value) ?? (value.includes('-') ? value.toLowerCase() : null);
      const fromName = localStates.find((state) => state.name.toLowerCase() === value.toLowerCase());
      const slug = stateSlug ?? fromName?.slug ?? null;
      if (slug) stateEvidence.add(evidenceKey(companyId, slug));
      continue;
    }
    if (level === 'county') {
      const countySlug = slugifyPlace(value);
      // State is not on the row. Match later by county slug within the page state
      // by storing a wildcard state marker and checking both forms in the gate.
      serviceArea.add(evidenceKey(companyId, '*', countySlug));
      continue;
    }
    if (level === 'city') {
      const parsed = parseHeadquarters(value);
      const stateCode = parsed.stateCode ?? value.split(',').pop()?.trim();
      const city = parsed.city || value.split(',')[0]?.trim();
      if (!city || !stateCode || stateCode.length !== 2) continue;
      const county = resolveCityToCounty({ city, stateCode });
      if (!county) continue;
      markCompanyCounty(serviceArea, companyId, county.stateSlug, county.countySlug);
    }
  }

  for (const row of discoveries) {
    if (String(row.verification_state ?? '') !== 'VERIFIED') continue;
    if (String(row.basis ?? '') === 'DERIVED_EXPERIMENTAL') continue;
    const companyId = String(row.company_id ?? '');
    const stateSlug = stateSlugFromCode(String(row.state_code ?? ''));
    const countySlug = slugifyPlace(String(row.county_name ?? ''));
    if (!companyId || !stateSlug || !countySlug) continue;
    markCompanyCounty(discovery, companyId, stateSlug, countySlug);
  }

  for (const row of authorities) {
    if (String(row.verification_state ?? '').toUpperCase() !== 'VERIFIED') continue;
    if (String(row.status ?? '').toLowerCase() !== 'active') continue;
    const companyId = String(row.company_id ?? '');
    const stateSlug = stateSlugFromCode(String(row.state_code ?? ''));
    if (!companyId || !stateSlug) continue;
    stateEvidence.add(evidenceKey(companyId, stateSlug));
  }

  return { serviceArea, discovery, stateEvidence };
}

function hasMarkedCounty(
  set: Set<string>,
  company: CompanyMoverRow,
  stateSlug: string,
  countySlug: string
): boolean {
  return companyKeys(company).some(
    (key) =>
      set.has(evidenceKey(key, stateSlug, countySlug)) ||
      set.has(evidenceKey(key, '*', countySlug))
  );
}

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
    // publication_state is stripped only when that column is the error.
    // Do not add usdot_status — public.companies has no such column.
    let select = COMPANY_MOVER_SELECT_FULL;
    let byId = await client.from('companies').select(select).in('id', chunk);
    if (byId.error && /publication_state/i.test(byId.error.message)) {
      select = select.replace(', publication_state', '');
      byId = await client.from('companies').select(select).in('id', chunk);
    }
    if (
      byId.error &&
      (byId.error.code === 'PGRST204' ||
        byId.error.code === '42703' ||
        /service_scope|coverage_counties|does not exist/i.test(byId.error.message))
    ) {
      select = COMPANY_MOVER_SELECT_CORE;
      byId = await client.from('companies').select(select).in('id', chunk);
      if (byId.error && /publication_state/i.test(byId.error.message)) {
        select = select.replace(', publication_state', '');
        byId = await client.from('companies').select(select).in('id', chunk);
      }
    }

    const bySlug = await client.from('companies').select(select).in('slug', chunk);

    if (byId.error && bySlug.error) {
      logger.error('approved_movers.companies_failed', {
        byId: byId.error?.message,
        bySlug: bySlug.error?.message,
      });
      continue;
    }

    for (const row of (byId.data ?? []) as unknown as CompanyMoverRow[]) indexCompany(row);
    for (const row of (bySlug.data ?? []) as unknown as CompanyMoverRow[]) indexCompany(row);

    for (const key of chunk) {
      if (companiesById.has(key)) continue;
      const { data } = await client
        .from('companies')
        .select(select)
        .or(`id.eq.${key},slug.eq.${key}`)
        .maybeSingle();
      if (data) indexCompany(data as unknown as CompanyMoverRow);
    }
  }

  return companiesById;
}

async function pageAssignmentRows(
  client: SupabaseClient<Database>,
  stateSlug: string,
  column: 'company_id' | 'company_slug',
  ids: string[]
): Promise<{ rows: AssignmentRow[]; failed: boolean }> {
  const rows: AssignmentRow[] = [];
  for (let i = 0; i < ids.length; i += IN_CHUNK) {
    const chunk = ids.slice(i, i + IN_CHUNK);
    for (let from = 0; ; from += PAGE_SIZE) {
      const { data, error } = await client
        .from('company_destination_assignments')
        .select('company_id, company_slug, county_slug, source')
        .eq('state_slug', stateSlug)
        .in(column, chunk)
        .range(from, from + PAGE_SIZE - 1);
      if (error) return { rows, failed: true };
      const page = (data ?? []) as AssignmentRow[];
      rows.push(...page);
      if (page.length < PAGE_SIZE) break;
    }
  }
  return { rows, failed: false };
}

function countsFromSets(sets: Map<string, Set<string>>): Map<string, number> {
  const counts = new Map<string, number>();
  for (const [key, counties] of sets) counts.set(key, counties.size);
  return counts;
}

function addCoverageJsonCounties(
  sets: Map<string, Set<string>>,
  companies: Iterable<CompanyMoverRow>,
  stateSlug?: string
) {
  const seen = new Set<string>();
  for (const company of companies) {
    if (seen.has(company.id)) continue;
    seen.add(company.id);
    for (const county of normalizeSelectedCounties(company.coverage_counties)) {
      if (stateSlug && county.stateSlug !== stateSlug) continue;
      addOwnerCounty(sets, company.id, county.stateSlug, county.countySlug);
      if (company.slug) addOwnerCounty(sets, company.slug, county.stateSlug, county.countySlug);
    }
  }
}

async function evidenceForCounty(
  client: SupabaseClient<Database>,
  stateSlug: string,
  companyIds: string[],
  companiesById: Map<string, CompanyMoverRow>
): Promise<CoverageEvidence> {
  const evidenceCompanies = [...companiesById.values()];
  const external = await loadExternalEvidence(
    client,
    canonicalEvidenceCompanyIds(evidenceCompanies)
  );
  const sets = new Map<string, Set<string>>();
  const byId = await pageAssignmentRows(client, stateSlug, 'company_id', companyIds);
  const bySlug = await pageAssignmentRows(client, stateSlug, 'company_slug', companyIds);
  if (byId.failed || bySlug.failed) {
    logger.warn('approved_movers.owner_count_failed', { stateSlug });
    for (const id of companyIds) {
      addOwnerCounty(sets, id, stateSlug, 'blanket-fail-closed');
      for (let n = 1; n < BLANKET_SELF_SELECTED_COUNTY_THRESHOLD; n += 1) {
        addOwnerCounty(sets, id, stateSlug, `blanket-fail-closed-${n}`);
      }
    }
  } else {
    for (const row of [...byId.rows, ...bySlug.rows]) {
      if (!isOwnerSelectedAssignmentSource(row.source)) continue;
      if (row.company_id) addOwnerCounty(sets, row.company_id, stateSlug, row.county_slug);
      if (row.company_slug) addOwnerCounty(sets, row.company_slug, stateSlug, row.county_slug);
    }
  }
  addCoverageJsonCounties(sets, companiesById.values(), stateSlug);
  return { ...external, ownerCounts: countsFromSets(sets) };
}

function moversFromAssignments(
  assignments: AssignmentRow[],
  companiesById: Map<string, CompanyMoverRow>,
  evidence: CoverageEvidence,
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
    // Publication gate: moversFromAssignments.
    if (!countyCompanyCounts(company, row.source, row.state_slug, row.county_slug, evidence)) {
      continue;
    }

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

  const evidence = await evidenceForCounty(client, stateSlug, companyIds, companiesById);
  const movers = moversFromAssignments(assignments, companiesById, evidence);
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

  for (const company of (withScope.data ?? []) as unknown as CompanyMoverRow[]) {
    const named = withPublicDisplayName(company);
    // Publication gate: loadIntrastateCoverageForCounty.
    if (!isPublishableCountyCompany(named.publication_state)) continue;
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

    const rows = (withScope.data ?? []) as unknown as CompanyMoverRow[];
    if (!rows.length) break;

    for (const company of rows) {
      // Prefer verified, but still surface assigned locals (is_verified may lag).
      const named = withPublicDisplayName(company);
      // Publication gate: loadIntrastateCoverageCounties.
      if (!isPublishableCountyCompany(named.publication_state)) continue;
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

    const sourceByPlacement = new Map<string, string | null>();
    function notePlacement(
      stateSlug: string,
      countySlug: string,
      companyKey: string,
      source: string | null | undefined
    ) {
      if (!companyKey) return;
      const key = `${countyKey(stateSlug, countySlug)}::${companyKey}`;
      const prev = sourceByPlacement.get(key);
      if (
        prev === undefined ||
        (isOwnerSelectedAssignmentSource(prev) && !isOwnerSelectedAssignmentSource(source))
      ) {
        sourceByPlacement.set(key, source ?? null);
      }
    }

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
      const companyKey = row.company_id || row.company_slug;
      pushCountyCompany(row.state_slug, row.county_slug, companyKey);
      if (row.company_id) notePlacement(row.state_slug, row.county_slug, row.company_id, row.source);
      if (row.company_slug) notePlacement(row.state_slug, row.county_slug, row.company_slug, row.source);
    }
    for (const link of coverageLinks) {
      pushCountyCompany(link.stateSlug, link.countySlug, link.company.id);
      notePlacement(link.stateSlug, link.countySlug, link.company.id, 'local_intrastate');
      if (link.company.slug) {
        notePlacement(link.stateSlug, link.countySlug, link.company.slug, 'local_intrastate');
      }
    }

    const ownerSets = new Map<string, Set<string>>();
    for (const row of assignments) {
      if (!isOwnerSelectedAssignmentSource(row.source)) continue;
      if (row.company_id) addOwnerCounty(ownerSets, row.company_id, row.state_slug, row.county_slug);
      if (row.company_slug) addOwnerCounty(ownerSets, row.company_slug, row.state_slug, row.county_slug);
    }
    for (const link of coverageLinks) {
      addOwnerCounty(ownerSets, link.company.id, link.stateSlug, link.countySlug);
      if (link.company.slug) addOwnerCounty(ownerSets, link.company.slug, link.stateSlug, link.countySlug);
    }
    addCoverageJsonCounties(ownerSets, companiesById.values());
    const evidenceIds = [...new Set([...companiesById.values()].map((company) => company.id))];
    const external = await loadExternalEvidence(client, evidenceIds);
    const evidence: CoverageEvidence = {
      ...external,
      ownerCounts: countsFromSets(ownerSets),
    };

    const byCounty: Record<string, LocalMover[]> = {};

    for (const [key, orderedIds] of byCountyIds) {
      const seen = new Set<string>();
      const movers: LocalMover[] = [];
      for (const id of orderedIds) {
        if (seen.has(id)) continue;
        seen.add(id);
        const company = companiesById.get(id);
        if (!company) continue;

        const [stateSlug, countySlug] = key.split('::');
        const source =
          sourceByPlacement.get(`${key}::${id}`) ??
          sourceByPlacement.get(`${key}::${company.id}`) ??
          (company.slug ? sourceByPlacement.get(`${key}::${company.slug}`) : undefined);
        // Publication and coverage gate: loadAllApprovedMoversByCounty.
        if (!stateSlug || !countySlug || !countyCompanyCounts(company, source, stateSlug, countySlug, evidence)) {
          continue;
        }

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
  // v10: publication gate and county-coverage evidence
  ['approved-county-movers-all-v11-canonical-evidence'],
  { tags: [APPROVED_COUNTY_MOVERS_TAG], revalidate: 60 }
);

export async function getCachedApprovedMoversByCounty(): Promise<Record<string, LocalMover[]>> {
  return getAllApprovedMoversByCountyCached();
}

/** Drop seed cards whose profile would 404, and mark confirmed public profiles. */
export type ProfileFacts = {
  publicationState: string | null;
  headquarters: string | null;
};

export async function loadProfileFacts(slugs: string[]): Promise<Map<string, ProfileFacts>> {
  const facts = new Map<string, ProfileFacts>();
  const unique = [...new Set(slugs.map((slug) => slug.trim()).filter(Boolean))];
  if (!unique.length) return facts;
  const client = createPublicOrAdminClient();
  if (!client) return facts;
  for (let i = 0; i < unique.length; i += IN_CHUNK) {
    const chunk = unique.slice(i, i + IN_CHUNK);
    const { data, error } = await client
      .from('companies')
      .select('slug, publication_state, headquarters')
      .in('slug', chunk);
    if (error) {
      logger.warn('approved_movers.profile_publication_unavailable', { message: error.message });
      continue;
    }
    for (const row of data ?? []) {
      const slug = String((row as { slug?: string }).slug ?? '');
      if (!slug) continue;
      facts.set(slug, {
        publicationState: (row as { publication_state?: string | null }).publication_state ?? null,
        headquarters: (row as { headquarters?: string | null }).headquarters ?? null,
      });
    }
  }
  return facts;
}

export async function loadProfilePublication(
  slugs: string[]
): Promise<Map<string, string | null>> {
  const facts = await loadProfileFacts(slugs);
  return new Map([...facts].map(([slug, row]) => [slug, row.publicationState]));
}

/** Drop seed cards whose profile would 404. Directory rows are already gated. */
export function applyProfilePublicationMap(
  movers: LocalMover[],
  publication: Map<string, string | null> | Map<string, ProfileFacts>
): LocalMover[] {
  const stateFor = (slug: string): string | null | undefined => {
    if (!publication.has(slug)) return undefined;
    const value = publication.get(slug);
    if (value && typeof value === 'object') return value.publicationState;
    return value ?? null;
  };
  return movers.flatMap((mover) => {
    if (mover.listingSource === 'directory') return [mover];
    const slug = mover.profileSlug?.trim();
    const state = slug ? stateFor(slug) : undefined;
    if (!slug || state === undefined) return [{ ...mover, profilePublished: false }];
    if (!isPublishableCountyCompany(state)) return [];
    return [{ ...mover, profilePublished: true }];
  });
}

export async function applyProfilePublication(
  movers: LocalMover[]
): Promise<LocalMover[]> {
  const slugs = movers.map((mover) => mover.profileSlug?.trim() ?? '').filter(Boolean);
  return applyProfilePublicationMap(movers, await loadProfilePublication(slugs));
}

/**
 * Per-county cache — primary path for county pages and state hub badges.
 * Isolated so one bulk timeout cannot zero-out every county for 60s.
 */
function getApprovedMoversForCountyCached(stateSlug: string, countySlug: string) {
  return unstable_cache(
    () => fetchApprovedMoversForCountyUncached(stateSlug, countySlug),
    // v10 per-county: publication gate and county-coverage evidence
    ['approved-county-movers-one-v11', stateSlug, countySlug],
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
