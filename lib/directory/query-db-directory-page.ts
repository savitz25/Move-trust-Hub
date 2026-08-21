import 'server-only';

import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import {
  normalizeCoverageFilter,
  companyMatchesCoverageFilter,
} from '@/lib/directory/coverage-filter';
import { prepareCompaniesForDirectoryClient } from '@/lib/directory/directory-client-payload';
import type { DirectoryFilterInput } from '@/lib/directory/filter-companies';
import { filterCompanies } from '@/lib/directory/filter-companies';
import {
  DIRECTORY_MAX_PAGE_LIMIT,
  DIRECTORY_PAGE_SIZE,
} from '@/lib/directory/page-size';
import { scoreCompanySearch } from '@/lib/directory/search-scoring';
import { companyMatchesServiceFilter } from '@/lib/directory/service-filter';
import { logger } from '@/lib/logging/logger';
import { getSupabaseAnonKey, getSupabaseUrl, isSupabaseConfigured } from '@/lib/supabase/config';
import {
  companyListProjectionCandidates,
  mapCompanyRow,
} from '@/lib/supabase/queries/companies';
import { parseCarrierNumber } from '@/lib/verify-dot/schema';
import type { Company, ServiceType } from '@/types';
import type { Database } from '@/types/supabase';

export type DbDirectoryPageResult = {
  companies: Company[];
  total: number;
  offset: number;
  limit: number;
  hasMore: boolean;
};

/** Instrumentation attached for benchmarks / parity harness (not part of public API). */
export type DbDirectoryQueryDiagnostics = {
  engine: 'db';
  path: 'rpc' | 'pg' | 'postgrest' | 'hybrid-local' | 'search-rerank';
  dbMs: number;
  mapMs: number;
  rowsFetched: number;
  total: number;
  materializedIntoNode: number;
};

let lastDiagnostics: DbDirectoryQueryDiagnostics | null = null;

export function getLastDbDirectoryDiagnostics(): DbDirectoryQueryDiagnostics | null {
  return lastDiagnostics;
}

function createAnonClient() {
  const url = getSupabaseUrl();
  const anonKey = getSupabaseAnonKey();
  if (!url || !anonKey) return null;
  return createSupabaseClient<Database>(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

const ROLE_SERVICES = new Set<ServiceType>([
  'Carrier',
  'Broker',
  'Carrier / Broker',
  'Local Mover',
]);

function pickRoleFilter(services: ServiceType[] | undefined): string | null {
  if (!services?.length) return null;
  const role = services.find((s) => ROLE_SERVICES.has(s));
  return role ?? null;
}

function nonRoleServices(services: ServiceType[] | undefined): ServiceType[] {
  if (!services?.length) return [];
  return services.filter((s) => !ROLE_SERVICES.has(s));
}

function wantsLocalOrCounty(filters: DirectoryFilterInput): boolean {
  const coverage = normalizeCoverageFilter({
    coverage: filters.coverage,
    coverageFilter: filters.coverageFilter,
    state: filters.state,
    counties: filters.counties,
  });
  return (
    Boolean(filters.services?.includes('Local Mover')) ||
    coverage.mode === 'state' ||
    (filters.search?.trim().length ?? 0) > 0
  );
}

function needsHybridCoverage(filters: DirectoryFilterInput): boolean {
  const coverage = normalizeCoverageFilter({
    coverage: filters.coverage,
    coverageFilter: filters.coverageFilter,
    state: filters.state,
    counties: filters.counties,
  });
  return coverage.mode === 'state' && (Boolean(coverage.stateCode) || (coverage.countySlugs?.length ?? 0) > 0);
}

async function fetchCompaniesByIds(
  ids: string[]
): Promise<Company[]> {
  if (!ids.length) return [];
  const supabase = createAnonClient();
  if (!supabase) return [];

  const projections = companyListProjectionCandidates(false);
  let rows: Record<string, unknown>[] | null = null;

  for (const columns of projections) {
    const { data, error } = await supabase
      .from('companies')
      .select(columns)
      .in('id', ids);
    if (error) {
      if (
        error.code === '42703' ||
        error.code === 'PGRST204' ||
        /column/i.test(error.message)
      ) {
        continue;
      }
      logger.warn('directory.db_engine.fetch_by_ids_failed', {
        message: error.message,
        code: error.code,
      });
      return [];
    }
    rows = (data ?? []) as unknown as Record<string, unknown>[];
    break;
  }

  if (!rows?.length) return [];

  const byId = new Map<string, Company>();
  for (const row of rows) {
    try {
      const company = mapCompanyRow(row);
      byId.set(company.id, company);
    } catch (err) {
      logger.warn('directory.db_engine.map_failed', {
        id: row.id,
        message: err instanceof Error ? err.message : String(err),
      });
    }
  }

  // Preserve RPC/page order
  return ids.map((id) => byId.get(id)).filter((c): c is Company => Boolean(c));
}

type RpcRow = {
  total_count: number | string;
  company_id: string;
  row_offset: number;
};

function resolveOptionalDatabaseUrl(): string | null {
  const direct =
    process.env.SUPABASE_DB_URL?.trim() ||
    process.env.DATABASE_URL?.trim() ||
    process.env.POSTGRES_URL?.trim() ||
    null;
  return direct;
}

type DirectoryIdPage = {
  total: number;
  ids: string[];
  path: 'rpc' | 'search-rerank' | 'postgrest' | 'pg';
};

async function queryViaPg(options: {
  offset: number;
  limit: number;
  filters: DirectoryFilterInput;
  excludeLocal: boolean;
  usdot: string | null;
  mc: string | null;
}): Promise<DirectoryIdPage | null> {
  const connectionString = resolveOptionalDatabaseUrl();
  if (!connectionString) return null;

  const { filters, offset, limit, excludeLocal, usdot, mc } = options;
  const role = pickRoleFilter(filters.services);
  const search = filters.search?.trim() || null;
  const isTextSearch = Boolean(search) && !usdot && !mc;

  try {
    const pg = await import('pg');
    const client = new pg.Client({
      connectionString,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 15_000,
      query_timeout: 30_000,
    });
    await client.connect();
    try {
      const result = await client.query<RpcRow>(
        `SELECT total_count, company_id, row_offset
           FROM public.directory_query_page(
             $1::int, $2::int, $3::text, $4::text, $5::numeric, $6::numeric,
             $7::boolean, $8::boolean, $9::boolean, $10::text, $11::text, $12::text,
             $13::text, $14::text, $15::int
           )`,
        [
          isTextSearch ? 0 : offset,
          isTextSearch ? Math.max(limit, 250) : limit,
          isTextSearch ? search : null,
          filters.sort || 'reputation',
          filters.minRating && filters.minRating > 0 ? filters.minRating : null,
          filters.maxPrice && filters.maxPrice < 12000 ? filters.maxPrice : null,
          excludeLocal,
          Boolean(filters.onlyFullService),
          Boolean(filters.onlyVerified),
          filters.bbbMin || null,
          role,
          filters.state || null,
          usdot,
          mc,
          250,
        ]
      );
      const rows = result.rows;
      const total = rows.length ? Number(rows[0]!.total_count) : 0;
      const ids = rows.map((r) => r.company_id).filter(Boolean);
      return {
        total,
        ids,
        path: isTextSearch ? 'search-rerank' : 'pg',
      };
    } finally {
      await client.end().catch(() => undefined);
    }
  } catch (err) {
    logger.warn('directory.db_engine.pg_failed', {
      message: err instanceof Error ? err.message : String(err),
    });
    return null;
  }
}

async function queryViaRpc(options: {
  offset: number;
  limit: number;
  filters: DirectoryFilterInput;
  excludeLocal: boolean;
  usdot: string | null;
  mc: string | null;
}): Promise<DirectoryIdPage | null> {
  // Prefer direct SQL when available (scripts / local / Preview with DATABASE_URL).
  const viaPg = await queryViaPg(options);
  if (viaPg) return viaPg;

  const supabase = createAnonClient();
  if (!supabase) return null;

  const { filters, offset, limit, excludeLocal, usdot, mc } = options;
  const role = pickRoleFilter(filters.services);
  const search = filters.search?.trim() || null;
  const isTextSearch = Boolean(search) && !usdot && !mc;

  const { data, error } = await supabase.rpc('directory_query_page' as never, {
    p_offset: isTextSearch ? 0 : offset,
    p_limit: isTextSearch ? Math.max(limit, 250) : limit,
    p_search: isTextSearch ? search : null,
    p_sort: filters.sort || 'reputation',
    p_min_rating: filters.minRating && filters.minRating > 0 ? filters.minRating : null,
    p_max_price:
      filters.maxPrice && filters.maxPrice < 12000 ? filters.maxPrice : null,
    p_exclude_local: excludeLocal,
    p_only_full_service: Boolean(filters.onlyFullService),
    p_only_verified: Boolean(filters.onlyVerified),
    p_bbb_min: filters.bbbMin || null,
    p_role: role,
    p_state: filters.state || null,
    p_usdot: usdot,
    p_mc: mc,
    p_candidate_limit: 250,
  } as never);

  if (error) {
    logger.warn('directory.db_engine.rpc_failed', {
      message: error.message,
      code: error.code,
    });
    return null;
  }

  const rows = (data ?? []) as RpcRow[];
  const total = rows.length ? Number(rows[0]!.total_count) : 0;
  const ids = rows.map((r) => r.company_id).filter(Boolean);
  return {
    total,
    ids,
    path: isTextSearch ? 'search-rerank' : 'rpc',
  };
}

/**
 * PostgREST fallback when RPC is not yet migrated.
 * Handles default browse + simple filters; price/complaint sparse sorts are best-effort.
 */
async function queryViaPostgrest(options: {
  offset: number;
  limit: number;
  filters: DirectoryFilterInput;
  excludeLocal: boolean;
  usdot: string | null;
  mc: string | null;
}): Promise<{ total: number; ids: string[]; path: 'postgrest' } | null> {
  const supabase = createAnonClient();
  if (!supabase) return null;

  const { filters, offset, limit, excludeLocal, usdot, mc } = options;
  const columns = 'id';
  let query = supabase
    .from('companies')
    .select(columns, { count: 'exact' })
    .or(
      'publication_state.is.null,publication_state.in.(PUBLISHABLE,INDEXABLE,VERIFIED)'
    );

  if (excludeLocal) {
    query = query.or('service_scope.is.null,service_scope.eq.interstate');
  }

  if (usdot) {
    query = query.eq('usdot_number', usdot);
  } else if (mc) {
    query = query.eq('mc_number', mc);
  } else if (filters.search?.trim()) {
    const q = filters.search.trim();
    query = query.or(
      `name.ilike.%${q}%,fmcsa_legal_name.ilike.%${q}%,slug.ilike.%${q.replace(/\s+/g, '-')}%`
    );
  }

  if (filters.minRating && filters.minRating > 0) {
    query = query.gte('overall_rating', filters.minRating);
  }
  if (filters.maxPrice && filters.maxPrice < 12000) {
    query = query.gt('avg_price_per_move', 0).lte('avg_price_per_move', filters.maxPrice);
  }
  if (filters.onlyFullService) {
    query = query.contains('services', ['Full Service']);
  }
  if (filters.onlyVerified) {
    query = query
      .not('usdot_number', 'is', null)
      .neq('usdot_number', '')
      .or('out_of_service.is.null,out_of_service.eq.false')
      .or('authority_active.is.null,authority_active.eq.true');
  }

  const sort = filters.sort || 'reputation';
  switch (sort) {
    case 'rating':
      query = query.order('overall_rating', { ascending: false }).order('id', { ascending: true });
      break;
    case 'reviews':
      query = query.order('review_count', { ascending: false }).order('id', { ascending: true });
      break;
    case 'price-low':
      query = query.order('avg_price_per_move', { ascending: true }).order('id', { ascending: true });
      break;
    case 'price-high':
      query = query.order('avg_price_per_move', { ascending: false }).order('id', { ascending: true });
      break;
    case 'years':
      query = query.order('years_in_business', { ascending: false }).order('id', { ascending: true });
      break;
    case 'complaints':
      query = query.order('fmcsa_complaints', { ascending: true }).order('id', { ascending: true });
      break;
    default:
      query = query.order('reputation_score', { ascending: false }).order('id', { ascending: true });
  }

  const isTextSearch = Boolean(filters.search?.trim()) && !usdot && !mc;
  const rangeFrom = isTextSearch ? 0 : offset;
  const rangeTo = isTextSearch
    ? Math.min(249, DIRECTORY_MAX_PAGE_LIMIT - 1)
    : offset + limit - 1;

  const { data, error, count } = await query.range(rangeFrom, rangeTo);
  if (error) {
    logger.warn('directory.db_engine.postgrest_failed', {
      message: error.message,
      code: error.code,
    });
    return null;
  }

  const ids = ((data ?? []) as { id: string }[]).map((r) => r.id).filter(Boolean);
  return {
    total: count ?? ids.length,
    ids,
    path: 'postgrest',
  };
}

function applySearchRerank(
  companies: Company[],
  filters: DirectoryFilterInput,
  offset: number,
  limit: number
): DbDirectoryPageResult {
  const search = filters.search?.trim() ?? '';
  const scored = companies
    .map((company) => ({
      company,
      score: scoreCompanySearch(company, search, filters.scope),
    }))
    .filter((row) => row.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.company.reputationScore - a.company.reputationScore || a.company.id.localeCompare(b.company.id);
    });

  const filtered = scored.map((s) => s.company);
  // Also apply remaining non-DB filters (coverage, non-role services, specialties)
  const refined = refineClientFilters(filtered, filters);
  const page = refined.slice(offset, offset + limit);
  return {
    companies: prepareCompaniesForDirectoryClient(page),
    total: refined.length,
    offset,
    limit,
    hasMore: offset + page.length < refined.length,
  };
}

function refineClientFilters(
  companies: Company[],
  filters: DirectoryFilterInput
): Company[] {
  let result = companies;
  const extras = nonRoleServices(filters.services);
  if (extras.length) {
    result = result.filter((c) =>
      extras.some((svc) => companyMatchesServiceFilter(c, svc))
    );
  }

  const coverage = normalizeCoverageFilter({
    coverage: filters.coverage,
    coverageFilter: filters.coverageFilter,
    state: filters.state,
    counties: filters.counties,
  });
  if (coverage.mode !== 'any') {
    result = result.filter((c) => companyMatchesCoverageFilter(c, coverage));
  }

  if (filters.specialties?.length) {
    result = result.filter((c) => {
      const specialties = Array.isArray(c.specialties) ? c.specialties : [];
      return filters.specialties!.some((sp) =>
        specialties.some((cs) => String(cs).toLowerCase().includes(sp.toLowerCase()))
      );
    });
  }

  return result;
}

/**
 * DB-backed directory page query.
 * Materializes only the bounded result set (or bounded search candidates) into Node.
 * Does not call getUnifiedDirectoryCompanies() for the default interstate path.
 */
export async function queryDbDirectoryPage(options: {
  offset?: number;
  limit?: number;
  filters?: DirectoryFilterInput;
}): Promise<DbDirectoryPageResult> {
  const limit = Math.min(
    Math.max(options.limit ?? DIRECTORY_PAGE_SIZE, 1),
    DIRECTORY_MAX_PAGE_LIMIT
  );
  const offset = Math.max(options.offset ?? 0, 0);
  const filters = options.filters ?? {};

  if (!isSupabaseConfigured()) {
    lastDiagnostics = {
      engine: 'db',
      path: 'postgrest',
      dbMs: 0,
      mapMs: 0,
      rowsFetched: 0,
      total: 0,
      materializedIntoNode: 0,
    };
    return { companies: [], total: 0, offset, limit, hasMore: false };
  }

  const search = filters.search?.trim() ?? '';
  const parsed = search ? parseCarrierNumber(search) : null;
  const usdot =
    parsed?.type === 'DOT'
      ? parsed.value
      : /^\d{3,8}$/.test(search)
        ? search
        : null;
  const mc = parsed?.type === 'MC' ? parsed.value : null;

  const excludeLocal = !wantsLocalOrCounty(filters);
  const hybrid = needsHybridCoverage(filters);

  // Hybrid local/county: bounded DB candidates + client coverage filter.
  // Still must NOT hydrate the full ~4k universe.
  if (hybrid) {
    const t0 = Date.now();
    const rpc = await queryViaRpc({
      offset: 0,
      limit: Math.min(500, DIRECTORY_MAX_PAGE_LIMIT),
      filters: { ...filters, search: search || undefined },
      excludeLocal: false,
      usdot,
      mc,
    });
    const post =
      rpc ??
      (await queryViaPostgrest({
        offset: 0,
        limit: Math.min(500, DIRECTORY_MAX_PAGE_LIMIT),
        filters: { ...filters, search: search || undefined },
        excludeLocal: false,
        usdot,
        mc,
      }));
    const dbMs = Date.now() - t0;
    if (!post) {
      return { companies: [], total: 0, offset, limit, hasMore: false };
    }
    const tMap = Date.now();
    const mapped = await fetchCompaniesByIds(post.ids);
    const mapMs = Date.now() - tMap;
    const prepared = prepareCompaniesForDirectoryClient(mapped);
    // Use existing filterCompanies for coverage/county/role parity on the bounded set only.
    const filtered = filterCompanies(prepared, filters);
    const page = filtered.slice(offset, offset + limit);
    lastDiagnostics = {
      engine: 'db',
      path: 'hybrid-local',
      dbMs,
      mapMs,
      rowsFetched: post.ids.length,
      total: filtered.length,
      materializedIntoNode: mapped.length,
    };
    return {
      companies: page,
      total: filtered.length,
      offset,
      limit,
      hasMore: offset + page.length < filtered.length,
    };
  }

  // Exact DB pagination — do not over-fetch (over-fetch overlaps adjacent pages).
  const t0 = Date.now();
  const rpc = await queryViaRpc({
    offset,
    limit,
    filters,
    excludeLocal,
    usdot,
    mc,
  });
  const result =
    rpc ??
    (await queryViaPostgrest({
      offset,
      limit,
      filters,
      excludeLocal,
      usdot,
      mc,
    }));
  const dbMs = Date.now() - t0;

  if (!result) {
    lastDiagnostics = {
      engine: 'db',
      path: 'postgrest',
      dbMs,
      mapMs: 0,
      rowsFetched: 0,
      total: 0,
      materializedIntoNode: 0,
    };
    return { companies: [], total: 0, offset, limit, hasMore: false };
  }

  const tMap = Date.now();
  const mapped = await fetchCompaniesByIds(result.ids);
  const mapMs = Date.now() - tMap;

  // Text search: Node reranks bounded candidates with scoreCompanySearch.
  if (result.path === 'search-rerank' || (search && !usdot && !mc)) {
    const page = applySearchRerank(mapped, filters, offset, limit);
    lastDiagnostics = {
      engine: 'db',
      path: 'search-rerank',
      dbMs,
      mapMs,
      rowsFetched: result.ids.length,
      total: page.total,
      materializedIntoNode: mapped.length,
    };
    return page;
  }

  // SQL already applied publication / scope / role / sort. Only light refine remains
  // (non-role services, specialties). Avoid dropping rows that would break pagination.
  let companies = refineClientFilters(mapped, filters);
  const prepared = prepareCompaniesForDirectoryClient(companies).slice(0, limit);

  lastDiagnostics = {
    engine: 'db',
    path:
      result.path === 'postgrest'
        ? 'postgrest'
        : result.path === 'pg'
          ? 'pg'
          : 'rpc',
    dbMs,
    mapMs,
    rowsFetched: result.ids.length,
    total: result.total,
    materializedIntoNode: mapped.length,
  };

  // When we filtered out rows client-side, prefer DB total for pagination continuity
  // unless we dropped enough that page is short — then use prepared length for this page.
  const total = Math.max(result.total, prepared.length);
  return {
    companies: prepared,
    total,
    offset,
    limit,
    hasMore: offset + prepared.length < total,
  };
}
