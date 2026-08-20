import 'server-only';

import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { getSupabaseAnonKey, getSupabaseUrl, isSupabaseConfigured } from '@/lib/supabase/config';
import type { Database } from '@/types/supabase';
import { COMPANIES_DIRECTORY_TAG } from '@/lib/directory/revalidate-company';
import { logger } from '@/lib/logging/logger';
import { seedCompanies } from '@/data/seed-companies';
import { normalizeCompanyForDisplay } from '@/lib/directory/normalize-company';
import { isCompaniesTableUnavailableError } from '@/lib/suggestions/companies-table-error';
import { getDirectoryCompanyViaRpc } from '@/lib/suggestions/publish-company-rpc';
import { buildCompanySlugBase, normalizeCompanyUsdot } from '@/lib/utils/company-slug';
import { slugifyCompanyName } from '@/lib/utils/slugify';
import { normalizeMc, normalizeUsdot } from '@/lib/trust/license-verification';
import type { ParsedCarrierNumber } from '@/lib/verify-dot/schema';
import {
  resolveDisplayBbbAccredited,
  resolveDisplayBbbRating,
  resolveGoogleDataFromRow,
  resolvePublicScrapeFromRow,
} from '@/lib/verification/display-enrichment';
import { extractFmcsaFieldsFromRow } from '@/lib/fmcsa/company-from-row';
import { resolvePublicCompanyNameFromSources } from '@/lib/companies/public-display-name';
import { normalizeCompanyWebsiteUrl } from '@/lib/verification/normalize-website-url';
import type { Company } from '@/types';
import { isMissingEnrichmentColumnError } from '@/lib/suggestions/jsonb-payload';
import { finalizeCompanyEnrichmentForDisplay } from '@/lib/verification/company-display-enrichment';

function createAnonSupabaseClient() {
  const url = getSupabaseUrl();
  const anonKey = getSupabaseAnonKey();
  if (!url || !anonKey) return null;
  try {
    return createSupabaseClient<Database>(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  } catch (err) {
    logger.warn('companies.supabase_client_init_failed', {
      message: err instanceof Error ? err.message : String(err),
    });
    return null;
  }
}

function parseUsdotFromSlugInput(input: string): string | null {
  const dotPrefix = input.match(/^dot-(\d{3,8})$/i);
  if (dotPrefix) return dotPrefix[1]!;
  if (/^\d{3,8}$/.test(input)) return input;
  return null;
}

const EMPTY_RATING_BREAKDOWN: Company['ratingBreakdown'] = {
  fiveStar: 0,
  fourStar: 0,
  threeStar: 0,
  twoStar: 0,
  oneStar: 0,
};

/**
 * Safe directory/profile projection for production Supabase.
 *
 * IMPORTANT: Production packs Google Places enrichment into `verification_sources.google`
 * (legacy `google_data` / `public_scrape_data` columns often do not exist).
 * Those optional columns must NOT be in the default select — a missing column makes
 * PostgREST reject the whole query, and the previous core fallback dropped
 * verification_sources, so profiles always showed “Google Places data is not loaded”.
 */
/**
 * Safe projection that must succeed even when optional contact columns lag migrations.
 * Google Places snapshots live in verification_sources (always selected).
 * phone / email / physical_address are optional extras appended when available.
 */
const COMPANY_LIST_BASE_COLUMNS = [
  'id',
  'slug',
  'name',
  'logo',
  'short_description',
  'founded_year',
  'headquarters',
  'website',
  'usdot_number',
  'mc_number',
  'fmcsa_legal_name',
  'fmcsa_safety_rating',
  'fmcsa_complaints',
  'fmcsa_shipments',
  'fmcsa_last_checked',
  'authority_active',
  'out_of_service',
  'complaints_last_12m',
  'revocation_date',
  'data_hash',
  'entity_type',
  'fmcsa_raw',
  'bbb_rating',
  'bbb_accredited',
  'bbb_last_checked',
  'complaints_last_36m',
  'bbb_customer_reviews',
  'bbb_data_hash',
  'bbb_business_id',
  'bbb_alert_count',
  'overall_rating',
  'review_count',
  'reputation_score',
  'years_in_business',
  'avg_price_per_move',
  'price_range',
  'coverage',
  'services',
  'specialties',
  'rating_breakdown',
  'is_verified',
  'last_updated',
  // Google Places + BBB scrape snapshots live here in production.
  'verification_sources',
].join(', ');

/** Intrastate / local coverage — may lag behind contact columns on older DBs. */
const COMPANY_SCOPE_COLUMNS = 'service_scope, coverage_counties';

/**
 * Progressive projections. Missing optional columns must NOT drop the whole list.
 * Order: richest (scope + contacts) → scope only → contacts only → base.
 */
const COMPANY_PUBLICATION_COLUMNS = 'publication_state, indexable, legacy_directory_row';

const COMPANY_LIST_PROJECTIONS = [
  `${COMPANY_LIST_BASE_COLUMNS}, ${COMPANY_SCOPE_COLUMNS}, phone, email, physical_address, ${COMPANY_PUBLICATION_COLUMNS}`,
  `${COMPANY_LIST_BASE_COLUMNS}, ${COMPANY_SCOPE_COLUMNS}, phone, email, physical_address`,
  `${COMPANY_LIST_BASE_COLUMNS}, ${COMPANY_SCOPE_COLUMNS}, phone, physical_address`,
  `${COMPANY_LIST_BASE_COLUMNS}, ${COMPANY_SCOPE_COLUMNS}, phone`,
  `${COMPANY_LIST_BASE_COLUMNS}, ${COMPANY_SCOPE_COLUMNS}`,
  `${COMPANY_LIST_BASE_COLUMNS}, phone, email, physical_address`,
  `${COMPANY_LIST_BASE_COLUMNS}, phone, physical_address`,
  `${COMPANY_LIST_BASE_COLUMNS}, phone`,
  `${COMPANY_LIST_BASE_COLUMNS}, physical_address`,
  COMPANY_LIST_BASE_COLUMNS,
] as const;

const COMPANY_LIST_CORE_COLUMNS = COMPANY_LIST_PROJECTIONS[0];

/**
 * Optional legacy enrichment columns.
 * Production currently packs Places/BBB into verification_sources (google_data
 * often does not exist). We still try legacy columns once, then cache the result.
 *
 * COMPANY_LIST_ENRICHMENT=1 → always try legacy columns first
 * COMPANY_LIST_ENRICHMENT=0 → never try legacy columns
 * unset → auto-detect (try once per process)
 */
type EnrichmentColumnState = 'unknown' | 'available' | 'missing';

let enrichmentColumnState: EnrichmentColumnState =
  process.env.COMPANY_LIST_ENRICHMENT === '1'
    ? 'available'
    : process.env.COMPANY_LIST_ENRICHMENT === '0'
      ? 'missing'
      : 'unknown';

export function markEnrichmentColumnsMissing(): void {
  enrichmentColumnState = 'missing';
}

export function markEnrichmentColumnsAvailable(): void {
  enrichmentColumnState = 'available';
}

export const COMPANY_LIST_COLUMNS =
  enrichmentColumnState === 'available'
    ? [COMPANY_LIST_CORE_COLUMNS, 'google_data', 'public_scrape_data'].join(', ')
    : COMPANY_LIST_CORE_COLUMNS;

/** Try projections until PostgREST accepts the select (handles lagging migrations). */
export function companyListProjectionCandidates(
  includeLegacyEnrichment?: boolean
): string[] {
  const wantLegacy =
    includeLegacyEnrichment === true ||
    (includeLegacyEnrichment !== false && enrichmentColumnState !== 'missing');

  if (wantLegacy) {
    return [
      `${COMPANY_LIST_PROJECTIONS[0]}, google_data, public_scrape_data`,
      ...COMPANY_LIST_PROJECTIONS,
    ];
  }
  return [...COMPANY_LIST_PROJECTIONS];
}

function noteProjectionOutcome(columns: string, error: { message?: string; code?: string } | null) {
  const triedLegacy =
    columns.includes('google_data') || columns.includes('public_scrape_data');
  if (!error && triedLegacy) {
    markEnrichmentColumnsAvailable();
    return;
  }
  if (
    error &&
    triedLegacy &&
    (error.code === '42703' ||
      error.code === 'PGRST204' ||
      isMissingEnrichmentColumnError(error.message) ||
      /google_data|public_scrape_data/i.test(error.message ?? ''))
  ) {
    markEnrichmentColumnsMissing();
  }
}

function mapRow(row: Record<string, unknown>): Company {
  const baseServices = (row.services as Company['services']) || [];
  const fmcsaFields = extractFmcsaFieldsFromRow(row, baseServices);
  // Prefer FMCSA DBA over legal entity name for all public list/profile surfaces.
  const publicNames = resolvePublicCompanyNameFromSources({
    storedName: row.name as string,
    fmcsaLegalName: row.fmcsa_legal_name as string | null | undefined,
    fmcsaRaw: row.fmcsa_raw,
    canonicalUsdot: row.usdot_number as string | null | undefined,
  });

  const vs =
    row.verification_sources && typeof row.verification_sources === 'object'
      ? (row.verification_sources as Record<string, unknown>)
      : null;
  const googleFromSources =
    vs?.google && typeof vs.google === 'object'
      ? (vs.google as { website_url?: string | null; phone?: string | null })
      : null;

  const phoneResolved =
    fmcsaFields.phone ||
    (typeof row.phone === 'string' ? row.phone.trim() : '') ||
    googleFromSources?.phone ||
    null;
  const websiteRaw =
    (typeof row.website === 'string' ? row.website.trim() : '') ||
    googleFromSources?.website_url?.trim() ||
    '';
  const websiteResolved = normalizeCompanyWebsiteUrl(websiteRaw) || websiteRaw;

  // Prefer explicit overall_rating; fall back to Google Places snapshot when
  // onboard wrote google_data / verification_sources.google but left ratings at 0.
  let googleData = resolveGoogleDataFromRow(row);
  const publicScrapeData = resolvePublicScrapeFromRow(row);
  const dbRating = Number(row.overall_rating) || 0;
  const dbReviews = Number(row.review_count) || 0;
  let googleOk =
    (googleData?.status === 'ok' || googleData?.status == null) &&
    googleData != null &&
    ((googleData.rating != null && googleData.rating > 0) ||
      (googleData.review_count != null && googleData.review_count > 0));

  // Columns may hold Places-derived ratings while verification_sources.google was
  // never written. Synthesize a minimal ok snapshot only when denormalized numbers
  // exist so profile/compare Google panels are not empty (finalize also labels derived).
  if (!googleOk && dbRating > 0 && dbReviews > 0) {
    googleData = {
      source: 'google_places_api',
      place_id: googleData?.place_id ?? null,
      name: (row.name as string) || null,
      rating: dbRating,
      review_count: dbReviews,
      formatted_address: googleData?.formatted_address ?? null,
      website_url: googleData?.website_url ?? null,
      phone: googleData?.phone ?? null,
      review_snippets: googleData?.review_snippets ?? [],
      last_fetched:
        googleData?.last_fetched ??
        (typeof row.last_updated === 'string' && row.last_updated
          ? row.last_updated
          : new Date().toISOString()),
      status: 'ok',
    };
    googleOk = true;
  }

  const overallRating =
    dbRating > 0
      ? dbRating
      : googleOk && googleData!.rating != null && googleData!.rating > 0
        ? googleData!.rating
        : 0;
  const reviewCount =
    dbReviews > 0
      ? dbReviews
      : googleOk && googleData!.review_count != null
        ? googleData!.review_count
        : 0;
  // Strict BBB: never surface letter grades from companies.bbb_rating alone
  // when public scrape did not confirm a real bbb.org profile match.
  const bbbRating = resolveDisplayBbbRating(
    publicScrapeData,
    row.bbb_rating as string | null | undefined
  );
  const bbbAccredited = resolveDisplayBbbAccredited(
    publicScrapeData,
    row.bbb_accredited as boolean | null | undefined
  );

  // FMCSA safety: column first, then fmcsa_raw aliases (QCMobile often nests rating)
  const safetyFromCol = (row.fmcsa_safety_rating as string | null | undefined)?.trim();
  const raw = row.fmcsa_raw && typeof row.fmcsa_raw === 'object'
    ? (row.fmcsa_raw as Record<string, unknown>)
    : null;
  const nestedCarrier =
    raw && typeof raw.carrier === 'object'
      ? (raw.carrier as Record<string, unknown>)
      : raw && typeof (raw as { content?: { carrier?: unknown } }).content === 'object'
        ? (((raw as { content?: { carrier?: unknown } }).content?.carrier as Record<string, unknown>) ?? null)
        : null;
  const safetyFromRaw = (
    (raw?.safetyRating as string) ||
    (raw?.safety_rating as string) ||
    (nestedCarrier?.safetyRating as string) ||
    (nestedCarrier?.safety_rating as string) ||
    ''
  ).trim();
  const fmcsaSafetyRating = ((): Company['fmcsaSafetyRating'] => {
    const cand = safetyFromCol && safetyFromCol !== 'Not Rated' ? safetyFromCol : safetyFromRaw || safetyFromCol || 'Not Rated';
    if (/satisfactory/i.test(cand)) return 'Satisfactory';
    if (/conditional/i.test(cand)) return 'Conditional';
    if (/unsatisfactory/i.test(cand)) return 'Unsatisfactory';
    return 'Not Rated';
  })();

  // Prefer street-level Places address when FMCSA/physical is empty or city-only.
  const fmcsaAddr = (fmcsaFields.physicalAddress || '').trim();
  const googleAddr =
    googleOk && googleData?.formatted_address?.trim()
      ? googleData.formatted_address.trim()
      : '';
  const physicalAddressResolved =
    (fmcsaAddr.length > 12 && /\d/.test(fmcsaAddr) ? fmcsaAddr : '') ||
    googleAddr ||
    fmcsaAddr ||
    null;

  const mapped = normalizeCompanyForDisplay({
    id: row.id as string,
    slug: row.slug as string,
    // Prefer DBA over legal entity name for all public directory surfaces.
    name: publicNames.publicName,
    logo: (row.logo as string) || undefined,
    shortDescription: (row.short_description as string) || '',
    description: (row.description as string) || '',
    foundedYear: (row.founded_year as number) || 0,
    headquarters: (row.headquarters as string) || '',
    website: websiteResolved,
    physicalAddress: physicalAddressResolved,
    phone: phoneResolved || null,
    email: (typeof row.email === 'string' ? row.email.trim() : null) || null,
    serviceScope:
      row.service_scope === 'intrastate'
        ? 'intrastate'
        : row.service_scope === 'interstate'
          ? 'interstate'
          : // Column missing / null — leave unset so type badges can infer Local vs Carrier
            null,
    coverageCounties: Array.isArray(row.coverage_counties)
      ? (row.coverage_counties as Company['coverageCounties'])
      : [],
    usdotNumber: (row.usdot_number as string) || '',
    mcNumber: (row.mc_number as string) || '',
    fmcsaLegalName: publicNames.legalName,
    fmcsaSafetyRating,
    fmcsaComplaints: (row.fmcsa_complaints as number) || 0,
    fmcsaShipments: (row.fmcsa_shipments as number) || 0,
    fmcsaLastChecked: (row.fmcsa_last_checked as string) || null,
    authorityActive: row.authority_active as boolean | null | undefined,
    outOfService: Boolean(row.out_of_service),
    complaintsLast12m: (row.complaints_last_12m as number) ?? (row.fmcsa_complaints as number) ?? 0,
    revocationDate: (row.revocation_date as string) || null,
    fmcsaDataHash: (row.data_hash as string) || null,
    bbbRating,
    bbbAccredited,
    bbbLastChecked: (row.bbb_last_checked as string) || null,
    complaintsLast36m: (row.complaints_last_36m as number) ?? 0,
    bbbCustomerReviews: (row.bbb_customer_reviews as number) ?? 0,
    bbbDataHash: (row.bbb_data_hash as string) || null,
    bbbBusinessId: (row.bbb_business_id as string) || null,
    bbbAlertCount: (row.bbb_alert_count as number) ?? 0,
    overallRating,
    reviewCount,
    reputationScore: (row.reputation_score as number) || 0,
    yearsInBusiness: (row.years_in_business as number) || 0,
    avgPricePerMove: (row.avg_price_per_move as number) || 0,
    priceRange: (row.price_range as string) || '',
    coverage: (row.coverage as Company['coverage']) || 'Continental US',
    services: fmcsaFields.services,
    entityType: fmcsaFields.entityType,
    usdotStatus: fmcsaFields.usdotStatus,
    powerUnits: fmcsaFields.powerUnits,
    specialties: (row.specialties as string[]) || [],
    ratingBreakdown:
      (row.rating_breakdown as Company['ratingBreakdown']) ?? EMPTY_RATING_BREAKDOWN,
    isVerified: Boolean(row.is_verified),
    lastUpdated: (row.last_updated as string)?.slice?.(0, 10) || '',
    publicationState:
      typeof row.publication_state === 'string'
        ? (row.publication_state as Company['publicationState'])
        : null,
    indexable: typeof row.indexable === 'boolean' ? row.indexable : null,
    googleData,
    publicScrapeData,
  });
  // Final pass: attach displayable Google snapshot when columns have ratings
  return finalizeCompanyEnrichmentForDisplay(mapped);
}

const COMPANIES_FETCH_TIMEOUT_MS = 20_000;
const COMPANIES_LIST_PAGE_SIZE = 1000;

async function selectCompanyList(
  supabase: NonNullable<ReturnType<typeof createAnonSupabaseClient>>,
  columns: string
) {
  const rows: unknown[] = [];
  let from = 0;
  while (from < 20_000) {
    const to = from + COMPANIES_LIST_PAGE_SIZE - 1;
    const page = await supabase
      .from('companies')
      .select(columns)
      .order('reputation_score', { ascending: false })
      .order('id', { ascending: true })
      .range(from, to);
    if (page.error) return page;
    const data = page.data ?? [];
    rows.push(...data);
    if (data.length < COMPANIES_LIST_PAGE_SIZE) {
      return { ...page, data: rows };
    }
    from += COMPANIES_LIST_PAGE_SIZE;
  }
  return {
    data: rows,
    error: null,
    count: null,
    status: 200,
    statusText: 'OK',
  };
}

async function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  label: string
): Promise<T | null> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      promise,
      new Promise<null>((resolve) => {
        timer = setTimeout(() => {
          logger.warn('companies.fetch_timeout', { label, ms });
          resolve(null);
        }, ms);
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

function isSchemaColumnError(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false;
  return (
    error.code === '42703' ||
    error.code === 'PGRST204' ||
    isMissingEnrichmentColumnError(error.message)
  );
}

async function fetchCompaniesFromDatabase(): Promise<Company[]> {
  if (!isSupabaseConfigured()) {
    return [...seedCompanies];
  }

  const url = getSupabaseUrl();
  const anonKey = getSupabaseAnonKey();
  if (!url || !anonKey) {
    return [...seedCompanies];
  }

  const supabase = createAnonSupabaseClient();
  if (!supabase) {
    return [...seedCompanies];
  }

  const projections = companyListProjectionCandidates();

  let data: unknown[] | null = null;
  let error: { code?: string; message?: string } | null = null;

  for (let i = 0; i < projections.length; i++) {
    const cols = projections[i]!;
    const result = await withTimeout(
      selectCompanyList(supabase, cols),
      COMPANIES_FETCH_TIMEOUT_MS,
      `proj-${i}`
    );
    if (!result) {
      // Timeout — try next projection only if first timed out under load
      if (i === 0) return [...seedCompanies];
      continue;
    }
    noteProjectionOutcome(cols, result.error);
    if (result.error && isSchemaColumnError(result.error)) {
      logger.warn('companies.fetch_projection_retry', {
        projection: i,
        code: result.error.code,
        message: result.error.message,
      });
      error = result.error;
      continue;
    }
    data = result.data;
    error = result.error;
    break;
  }

  if (error) {
    const msg = error.message ?? '';
    const missingTable =
      msg.includes('does not exist') ||
      msg.includes('schema cache') ||
      error.code === '42P01';
    logger.error('companies.fetch_failed', {
      code: error.code,
      message: error.message,
      missingTable,
      hint: missingTable
        ? 'Run supabase/migrations/20260708140000_ensure_companies_directory.sql'
        : undefined,
    });
    if (isSchemaColumnError(error)) {
      markEnrichmentColumnsMissing();
    }
    return [...seedCompanies];
  }

  if (!data?.length) {
    logger.warn('companies.fetch_empty', {
      hint: 'public.companies has no rows; serving seed fallback until movers are published',
    });
    return [...seedCompanies];
  }

  return data
    .map((row) => {
      try {
        return mapRow(row as Record<string, unknown>);
      } catch (err) {
        logger.warn('companies.map_row_failed', {
          id: (row as Record<string, unknown>).id,
          message: err instanceof Error ? err.message : String(err),
        });
        return null;
      }
    })
    .filter((company): company is Company => company !== null);
}

const getCompaniesDataCached = unstable_cache(
  fetchCompaniesFromDatabase,
  // v11: display-enrichment resolver + strict BBB grades + progressive legacy columns
  ['companies-directory-v17-wave1'],
  { tags: [COMPANIES_DIRECTORY_TAG], revalidate: 300 }
);

/** Cached server-side company fetch — use in Server Components and generateMetadata. */
export const getCompaniesCached = cache(async (): Promise<Company[]> => {
  return getCompaniesDataCached();
});

/**
 * Direct DB lookup for a company profile — bypasses directory list cache.
 * Resolves by canonical slug, id alias, or USDOT (raw digits / dot-{n}).
 */
export async function getCompanyBySlugOrUsdotFromDb(
  slugOrAlias: string
): Promise<Company | undefined> {
  if (!isSupabaseConfigured()) return undefined;

  const input = slugOrAlias.trim();
  if (!input) return undefined;

  const supabase = createAnonSupabaseClient();
  if (!supabase) return undefined;

  // Cap total lookup time so city-hub SSG (many featured slugs) cannot stack timeouts.
  const overall = await withTimeout(
    resolveCompanyBySlugOrUsdotInner(supabase, input),
    COMPANIES_FETCH_TIMEOUT_MS,
    'slug-or-usdot-total'
  );
  return overall ?? undefined;
}

async function resolveCompanyBySlugOrUsdotInner(
  supabase: NonNullable<ReturnType<typeof createAnonSupabaseClient>>,
  input: string
): Promise<Company | undefined> {
  // Progressive projection so a missing `email` column never drops `phone`.
  const projections = companyListProjectionCandidates();

  let bySlugOrId: Record<string, unknown> | null = null;
  let slugError: { code?: string; message?: string } | null = null;

  for (let i = 0; i < projections.length; i++) {
    const cols = projections[i]!;
    const result = await supabase
      .from('companies')
      .select(cols)
      .or(`slug.eq.${input},id.eq.${input}`)
      .maybeSingle();
    noteProjectionOutcome(cols, result.error);
    if (result.error && isSchemaColumnError(result.error)) {
      slugError = result.error;
      logger.warn('companies.profile_projection_retry', {
        projection: i,
        code: result.error.code,
        message: result.error.message,
      });
      continue;
    }
    bySlugOrId = result.data as Record<string, unknown> | null;
    slugError = result.error;
    break;
  }

  if (!slugError && bySlugOrId) {
    const mapped = mapRow(bySlugOrId as Record<string, unknown>);
    // Phase 2: collision suffixes (-2) → prefer canonical USDOT peer without numeric suffix
    return (await preferCanonicalUsdotPeer(supabase, mapped, projections)) ?? mapped;
  }

  if (slugError && isCompaniesTableUnavailableError(slugError.message, slugError.code)) {
    const viaRpc = await getDirectoryCompanyViaRpc(supabase, input);
    if (viaRpc) {
      return mapRow(viaRpc);
    }
  }

  async function selectOne(
    apply: (cols: string) => PromiseLike<{
      data: unknown;
      error: { code?: string; message?: string } | null;
    }>
  ): Promise<Record<string, unknown> | null> {
    for (const cols of projections) {
      const result = await apply(cols);
      noteProjectionOutcome(cols, result.error);
      if (result.error && isSchemaColumnError(result.error)) continue;
      if (!result.error && result.data) {
        return result.data as Record<string, unknown>;
      }
    }
    return null;
  }

  const usdot = parseUsdotFromSlugInput(input) ?? normalizeCompanyUsdot(input);
  if (usdot) {
    const byUsdot = await selectOne((cols) =>
      supabase.from('companies').select(cols).eq('usdot_number', usdot).maybeSingle()
    );
    if (byUsdot) return mapRow(byUsdot);
  }

  const nameFromSlug = input.includes('-') ? input.replace(/-/g, ' ') : input;
  const byName = await selectOne((cols) =>
    supabase.from('companies').select(cols).ilike('name', nameFromSlug).limit(1).maybeSingle()
  );
  if (byName) return mapRow(byName);

  const predictedSlug = buildCompanySlugBase({ name: nameFromSlug, usdot: null });
  if (predictedSlug && predictedSlug !== input) {
    const byPredicted = await selectOne((cols) =>
      supabase.from('companies').select(cols).eq('slug', predictedSlug).maybeSingle()
    );
    if (byPredicted) return mapRow(byPredicted);
  }

  const collapsedSlug = slugifyCompanyName(nameFromSlug);
  if (collapsedSlug && collapsedSlug !== input && collapsedSlug !== predictedSlug) {
    const byCollapsed = await selectOne((cols) =>
      supabase.from('companies').select(cols).eq('slug', collapsedSlug).maybeSingle()
    );
    if (byCollapsed) return mapRow(byCollapsed);
  }

  const viaRpc = await getDirectoryCompanyViaRpc(supabase, input);
  if (viaRpc) {
    return mapRow(viaRpc);
  }

  return undefined;
}

/**
 * Phase 2: if this row has a USDOT and a sibling slug without -N suffix exists,
 * return the sibling so profile routes 301 to the canonical URL.
 */
async function preferCanonicalUsdotPeer(
  supabase: NonNullable<ReturnType<typeof createAnonSupabaseClient>>,
  company: Company,
  projections: string[]
): Promise<Company | undefined> {
  const usdot = normalizeCompanyUsdot(company.usdotNumber);
  if (!usdot) return undefined;
  if (!/-\d+$/.test(company.slug || '')) return undefined;

  for (const cols of projections) {
    const { data, error } = await supabase
      .from('companies')
      .select(cols)
      .eq('usdot_number', usdot)
      .limit(20);
    if (error && isSchemaColumnError(error)) continue;
    if (error || !data?.length) return undefined;

    const peers = (data as Record<string, unknown>[]).map((row) => mapRow(row));
    const preferred =
      peers.find((p) => p.slug && !/-\d+$/.test(p.slug)) ??
      peers.sort((a, b) => a.slug.length - b.slug.length)[0];
    if (preferred && preferred.slug && preferred.slug !== company.slug) {
      return preferred;
    }
    return undefined;
  }
  return undefined;
}

function usdotStorageVariants(digits: string): string[] {
  return [...new Set([digits, `DOT ${digits}`, `DOT-${digits}`, `USDOT ${digits}`])];
}

function mcStorageVariants(digits: string): string[] {
  return [...new Set([digits, `MC ${digits}`, `MC-${digits}`, `MC${digits}`])];
}

function carrierLookupKeys(parsed: ParsedCarrierNumber): string[] {
  const keys = new Set<string>([parsed.value]);
  if (parsed.type === 'DOT') {
    keys.add(`dot-${parsed.value}`);
  } else {
    keys.add(`mc-${parsed.value}`);
  }
  return [...keys];
}

function companyMatchesCarrier(parsed: ParsedCarrierNumber, company: Company): boolean {
  if (parsed.type === 'DOT') {
    const usdot = normalizeUsdot(company.usdotNumber);
    return Boolean(usdot) && usdot === parsed.value;
  }
  const mc = normalizeMc(company.mcNumber);
  return Boolean(mc) && mc === parsed.value;
}

async function queryCompanyByColumnVariants(
  supabase: NonNullable<ReturnType<typeof createAnonSupabaseClient>>,
  column: 'usdot_number' | 'mc_number',
  variants: string[]
): Promise<Company | undefined> {
  for (const variant of variants) {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq(column, variant)
      .maybeSingle();

    if (!error && data) {
      return mapRow(data as Record<string, unknown>);
    }
  }
  return undefined;
}

/**
 * Resolve a directory company from a USDOT/MC search — same strategies as profile pages.
 * Bypasses the directory list cache for accurate verify-dot duplicate detection.
 */
export async function getCompanyByCarrierFromDb(
  parsed: ParsedCarrierNumber,
  legalNameHint?: string
): Promise<Company | undefined> {
  if (!isSupabaseConfigured()) return undefined;

  const supabase = createAnonSupabaseClient();
  if (!supabase) return undefined;

  for (const key of carrierLookupKeys(parsed)) {
    const bySlugOrUsdot = await getCompanyBySlugOrUsdotFromDb(key);
    if (bySlugOrUsdot) return bySlugOrUsdot;
  }

  if (parsed.type === 'DOT') {
    const byUsdot = await queryCompanyByColumnVariants(
      supabase,
      'usdot_number',
      usdotStorageVariants(parsed.value)
    );
    if (byUsdot) return byUsdot;
  } else {
    const byMc = await queryCompanyByColumnVariants(
      supabase,
      'mc_number',
      mcStorageVariants(parsed.value)
    );
    if (byMc) return byMc;
  }

  const hint = legalNameHint?.trim();
  if (hint) {
    const slugGuess = slugifyCompanyName(hint);
    if (slugGuess) {
      const bySlugGuess = await getCompanyBySlugOrUsdotFromDb(slugGuess);
      if (bySlugGuess) return bySlugGuess;

      const predictedSlug = buildCompanySlugBase({ name: hint, usdot: parsed.type === 'DOT' ? parsed.value : null });
      if (predictedSlug && predictedSlug !== slugGuess) {
        const byPredicted = await getCompanyBySlugOrUsdotFromDb(predictedSlug);
        if (byPredicted) return byPredicted;
      }
    }

    const { data: byNameRows, error: nameError } = await supabase
      .from('companies')
      .select('*')
      .ilike('name', hint)
      .limit(5);

    const nameRows = (byNameRows ?? []) as Record<string, unknown>[];
    if (!nameError && nameRows.length) {
      const exactName = nameRows.find(
        (row) => String(row.name ?? '').trim().toLowerCase() === hint.toLowerCase()
      );
      if (exactName) return mapRow(exactName);

      const fuzzy = nameRows.find((row) => {
        const company = mapRow(row);
        return companyMatchesCarrier(parsed, company);
      });
      if (fuzzy) return mapRow(fuzzy);
    }
  }

  return undefined;
}
