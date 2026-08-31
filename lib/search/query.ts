import 'server-only';

import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { resolveDirectoryPlaceQuery } from '@/lib/directory/resolve-place-query';
import { buildVerifyDotHref } from '@/lib/directory/verify-dot-link';
import { logger } from '@/lib/logging/logger';
import { classifySearchQuery } from '@/lib/search/classify-intent';
import {
  authorityStatusLabel,
  compareIdentityCompanies,
  matchCompanyIdentity,
  roleLabel,
  uniqueExactIdentity,
  type IdentityMatch,
} from '@/lib/search/match';
import { digitsOnly, normalizeSearchText } from '@/lib/search/normalize';
import { placeResultsForQuery } from '@/lib/search/place-results';
import {
  SEARCH_ALL_CANDIDATE_LIMIT,
  SEARCH_SUGGESTION_COMPANY_LIMIT,
  type MoverSearchResponse,
  type SearchCompanyHit,
} from '@/lib/search/types';
import { getSupabaseAnonKey, getSupabaseUrl } from '@/lib/supabase/config';
import { companyListProjectionCandidates, mapCompanyRow } from '@/lib/supabase/queries/companies';
import { isConsumerVisibleCompany } from '@/lib/provider/publication';
import type { Company } from '@/types';
import type { Database } from '@/types/supabase';

const VISIBLE_SQL = `(publication_state IS NULL OR publication_state IN ('PUBLISHABLE','INDEXABLE','VERIFIED'))`;

type RpcSuggestion = {
  company_id: string;
  slug: string;
  display_name: string;
  legal_name: string | null;
  headquarters: string | null;
  usdot: string | null;
  mc: string | null;
  role: string | null;
  authority_active: boolean | null;
  match_tier: number;
  exact_name_group_size?: number | null;
};

function anonClient() {
  const url = getSupabaseUrl();
  const key = getSupabaseAnonKey();
  if (!url || !key) return null;
  return createSupabaseClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function dbUrl(): string | null {
  return (
    process.env.SUPABASE_DB_URL?.trim() ||
    process.env.DATABASE_URL?.trim() ||
    process.env.POSTGRES_URL?.trim() ||
    null
  );
}

function toHit(company: Company, match: IdentityMatch): SearchCompanyHit {
  const legal = (company.fmcsaLegalName ?? '').trim();
  const display = company.name.trim();
  return {
    companyId: company.id,
    slug: company.slug,
    displayName: display,
    legalName: legal && normalizeSearchText(legal) !== normalizeSearchText(display) ? legal : null,
    headquarters: company.headquarters ?? '',
    usdot: company.usdotNumber ?? '',
    mc: company.mcNumber ?? '',
    role: roleLabel(company),
    authorityStatus: authorityStatusLabel(company),
    matchType: match.type,
    matchTier: match.tier,
    matchExplanation: match.explanation,
    sourceLastChecked: company.fmcsaLastChecked ?? null,
  };
}

async function fetchByIds(ids: string[]): Promise<Company[]> {
  if (!ids.length) return [];
  const supabase = anonClient();
  if (!supabase) return [];
  for (const columns of companyListProjectionCandidates(false)) {
    const { data, error } = await supabase.from('companies').select(columns).in('id', ids);
    if (error) {
      if (error.code === '42703' || error.code === 'PGRST204' || /column/i.test(error.message)) continue;
      logger.warn('search.fetch_by_ids_failed', { message: error.message, code: error.code });
      return [];
    }
    const byId = new Map<string, Company>();
    for (const row of data ?? []) {
      try {
        const company = mapCompanyRow(row as Record<string, unknown>);
        if (isConsumerVisibleCompany(company)) byId.set(company.id, company);
      } catch {
        /* skip unmappable */
      }
    }
    return ids.map((id) => byId.get(id)).filter((c): c is Company => Boolean(c));
  }
  return [];
}

async function querySuggestionsRpc(query: string, limit: number): Promise<{ ids: string[]; path: string } | null> {
  const supabase = anonClient();
  if (!supabase) return null;
  const { data, error } = await supabase.rpc('directory_search_suggestions' as never, {
    p_query: query,
    p_limit: limit,
  } as never);
  if (error) {
    logger.warn('search.rpc_unavailable', { message: error.message, code: error.code });
    return null;
  }
  const ids = ((data ?? []) as RpcSuggestion[]).map((row) => row.company_id).filter(Boolean);
  return { ids, path: 'rpc:directory_search_suggestions' };
}

export async function countExactPublicDisplayName(rawName: string): Promise<number> {
  const norm = normalizeSearchText(rawName);
  if (!norm) return 0;

  const supabase = anonClient();
  if (supabase) {
    const { data, error } = await supabase.rpc('directory_exact_display_name_count' as never, {
      p_query: rawName,
    } as never);
    if (!error && typeof data === 'number' && Number.isFinite(data)) {
      return data;
    }
    if (error) {
      logger.warn('search.exact_name_count_rpc', { message: error.message, code: error.code });
    }
  }

  const connectionString = dbUrl();
  if (!connectionString) return 0;
  const pg = await import('pg');
  const client = new pg.Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 8_000,
    query_timeout: 8_000,
  });
  await client.connect();
  try {
    const result = await client.query<{ n: number }>(
      `SELECT count(*)::int AS n
         FROM public.companies c
        WHERE ${VISIBLE_SQL}
          AND btrim(regexp_replace(lower(c.name), '[^a-z0-9]+', ' ', 'g')) = $1`,
      [norm]
    );
    return result.rows[0]?.n ?? 0;
  } catch (err) {
    logger.warn('search.exact_name_count_sql', {
      message: err instanceof Error ? err.message : String(err),
    });
    return 0;
  } finally {
    await client.end().catch(() => undefined);
  }
}

export async function loadIdentityCandidates(
  classified: ReturnType<typeof classifySearchQuery>,
  limit: number
): Promise<{ companies: Company[]; path: string; dbMs: number }> {
  const tDb = Date.now();
  const rpc = await querySuggestionsRpc(classified.raw, limit);
  const sql = rpc ?? (await queryViaSql(classified, limit));
  const companies = sql ? await fetchByIds(sql.ids) : [];
  return { companies, path: sql?.path ?? 'none', dbMs: Date.now() - tDb };
}

async function queryViaSql(classified: ReturnType<typeof classifySearchQuery>, limit: number): Promise<{ ids: string[]; path: string } | null> {
  const connectionString = dbUrl();
  if (!connectionString) return null;
  const pg = await import('pg');
  const client = new pg.Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 8_000,
    query_timeout: 12_000,
  });
  await client.connect();
  try {
    const q = classified.companyQuery;
    const digits = classified.identifier?.digits ?? null;
    const namespace = classified.identifier?.namespace ?? null;
    const result = await client.query<{ id: string }>(
      `
      SELECT c.id
        FROM public.companies c
       WHERE ${VISIBLE_SQL}
         AND (
           ($2::text IS NOT NULL AND $3::text = 'DOT' AND regexp_replace(coalesce(c.usdot_number,''), '\\D', '', 'g') = $2)
           OR ($2::text IS NOT NULL AND $3::text = 'MC' AND regexp_replace(coalesce(c.mc_number,''), '\\D', '', 'g') = $2)
           OR ($2::text IS NOT NULL AND $3::text = 'BARE' AND (
                 regexp_replace(coalesce(c.usdot_number,''), '\\D', '', 'g') = $2
              OR regexp_replace(coalesce(c.mc_number,''), '\\D', '', 'g') = $2
           ))
           OR (
             $2 IS NULL AND (
               lower(c.name) = lower($1)
               OR lower(coalesce(c.fmcsa_legal_name,'')) = lower($1)
               OR lower(c.name) LIKE lower($1) || '%'
               OR lower(coalesce(c.fmcsa_legal_name,'')) LIKE lower($1) || '%'
               OR lower(c.name) LIKE '%' || lower($1) || '%'
               OR lower(coalesce(c.fmcsa_legal_name,'')) LIKE '%' || lower($1) || '%'
               OR EXISTS (
                    SELECT 1
                      FROM unnest(string_to_array(lower(regexp_replace($1, '[^a-z0-9]+', ' ', 'g')), ' ')) t(token)
                     WHERE length(t.token) >= 3
                       AND (
                         lower(c.name) LIKE '%' || t.token || '%'
                         OR lower(coalesce(c.fmcsa_legal_name,'')) LIKE '%' || t.token || '%'
                       )
               )
               OR (
                 EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_trgm')
                 AND (
                   word_similarity(lower($1), lower(c.name)) >= 0.35
                   OR word_similarity(lower($1), lower(coalesce(c.fmcsa_legal_name,''))) >= 0.35
                 )
               )
             )
           )
         )
       ORDER BY
         CASE
           WHEN $2 IS NOT NULL AND regexp_replace(coalesce(c.usdot_number,''), '\\D', '', 'g') = $2 THEN 1
           WHEN $2 IS NOT NULL AND regexp_replace(coalesce(c.mc_number,''), '\\D', '', 'g') = $2 THEN 2
           WHEN lower(c.name) = lower($1) THEN 4
           WHEN lower(coalesce(c.fmcsa_legal_name,'')) = lower($1) THEN 5
           ELSE 8
         END,
         lower(c.name),
         regexp_replace(coalesce(c.usdot_number,''), '\\D', '', 'g'),
         c.id
       LIMIT $4
      `,
      [q, digits, namespace, limit]
    );
    return { ids: result.rows.map((row) => row.id), path: 'pg:identity-sql' };
  } catch (err) {
    logger.warn('search.sql_failed', {
      message: err instanceof Error ? err.message : String(err),
    });
    return null;
  } finally {
    await client.end().catch(() => undefined);
  }
}

export async function searchMovers(rawQuery: string, options?: { limit?: number }): Promise<MoverSearchResponse> {
  const started = Date.now();
  const classified = classifySearchQuery(rawQuery);
  const limit = Math.min(Math.max(options?.limit ?? SEARCH_SUGGESTION_COMPANY_LIMIT, 1), SEARCH_SUGGESTION_COMPANY_LIMIT);
  const placeResults =
    classified.intent === 'PLACE' || classified.intent === 'COMPANY_IDENTITY'
      ? placeResultsForQuery(classified.intent === 'PLACE' ? classified.raw : classified.raw)
      : [];

  if (classified.intent === 'PLACE') {
    return {
      query: classified.raw,
      intent: classified.intent,
      results: [],
      placeResults: placeResults.length ? placeResults : placeResultsForQuery(classified.raw),
      verificationAction: null,
      exactNameGroupSize: 0,
      directJumpSlug: null,
      ambiguity: false,
      resultCount: 0,
      latencyMs: Date.now() - started,
      dbMs: 0,
      candidateCount: 0,
      searchPath: 'place-intent',
    };
  }

  if (!classified.raw) {
    return {
      query: '',
      intent: 'UNKNOWN',
      results: [],
      placeResults: [],
      verificationAction: null,
      exactNameGroupSize: 0,
      directJumpSlug: null,
      ambiguity: false,
      resultCount: 0,
      latencyMs: Date.now() - started,
      dbMs: 0,
      candidateCount: 0,
      searchPath: 'empty',
    };
  }

  const candidateLimit =
    classified.intent === 'COMPANY_IDENTITY' ? SEARCH_ALL_CANDIDATE_LIMIT : Math.max(limit * 4, 24);
  const [loaded, exactNameCensus] = await Promise.all([
    loadIdentityCandidates(classified, candidateLimit),
    classified.intent === 'COMPANY_IDENTITY'
      ? countExactPublicDisplayName(classified.companyQuery)
      : Promise.resolve(0),
  ]);
  const { companies, dbMs } = loaded;

  const locationHint = classified.locationHint?.label ?? classified.locationHint?.city ?? null;
  const matched = companies
    .map((company) => {
      const match = matchCompanyIdentity(company, classified.companyQuery, {
        identifierDigits: classified.identifier?.digits,
        namespace: classified.identifier?.namespace ?? null,
        locationHint,
      });
      if (!match) return null;
      if (classified.locationHint?.city) {
        const hq = normalizeSearchText(company.headquarters ?? '');
        const city = normalizeSearchText(classified.locationHint.city);
        const st = normalizeSearchText(classified.locationHint.stateCode ?? '');
        if (city && hq.includes(city)) {
          return { company, match: { ...match, type: match.type, explanation: `${match.explanation}; headquarters identity hint` } };
        }
        if (st && hq.endsWith(st) && match.tier > 5) {
          return { company, match };
        }
        if (match.tier > 5 && city && !hq.includes(city)) {
          return { company, match };
        }
      }
      return { company, match };
    })
    .filter((row): row is { company: Company; match: IdentityMatch } => Boolean(row))
    .sort((a, b) => compareIdentityCompanies(a.company, b.company, a.match, b.match, locationHint));

  const exactNameGroupSize = exactNameCensus;

  const unique = uniqueExactIdentity(matched);
  const ambiguity = exactNameGroupSize > 1 || (Boolean(unique) === false && matched.filter((row) => row.match.tier <= 5).length > 1);

  let verificationAction: MoverSearchResponse['verificationAction'] = null;
  if (classified.identifier && matched.length === 0) {
    const parsed =
      classified.identifier.namespace === 'MC'
        ? { type: 'MC' as const, value: classified.identifier.digits, display: classified.identifier.display }
        : { type: 'DOT' as const, value: classified.identifier.digits, display: classified.identifier.display };
    verificationAction = {
      href: buildVerifyDotHref(classified.identifier.display, parsed),
      label: 'Verify this number',
      identifierDisplay: classified.identifier.display,
    };
  }

  const results = matched.slice(0, limit).map((row) => toHit(row.company, row.match));

  return {
    query: classified.raw,
    intent: classified.intent,
    results,
    placeResults: classified.intent === 'COMPANY_IDENTITY' ? [] : placeResults,
    verificationAction,
    exactNameGroupSize,
    directJumpSlug: unique && !ambiguity ? unique.slug : null,
    ambiguity,
    resultCount: matched.length,
    latencyMs: Date.now() - started,
    dbMs,
    candidateCount: companies.length,
    searchPath: loaded.path,
  };
}

export function resolvePlaceOnly(raw: string) {
  return resolveDirectoryPlaceQuery(raw);
}

export { digitsOnly };
