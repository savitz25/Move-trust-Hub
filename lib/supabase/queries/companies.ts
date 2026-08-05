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
  resolveGoogleDataFromRow,
  resolvePublicScrapeFromRow,
} from '@/lib/verification/resolve-company-row';
import { extractFmcsaFieldsFromRow } from '@/lib/fmcsa/company-from-row';
import { resolvePublicCompanyNameFromSources } from '@/lib/companies/public-display-name';
import { normalizeCompanyWebsiteUrl } from '@/lib/verification/normalize-website-url';
import type { Company } from '@/types';
import { isMissingEnrichmentColumnError } from '@/lib/suggestions/jsonb-payload';

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
const COMPANY_LIST_PROJECTIONS = [
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
 * Optional legacy enrichment columns — only when COMPANY_LIST_ENRICHMENT=1
 * and migrations that add google_data / public_scrape_data have been applied.
 */
export const COMPANY_LIST_COLUMNS =
  process.env.COMPANY_LIST_ENRICHMENT === '1'
    ? [COMPANY_LIST_CORE_COLUMNS, 'google_data', 'public_scrape_data'].join(', ')
    : COMPANY_LIST_CORE_COLUMNS;

/** Try projections until PostgREST accepts the select (handles lagging migrations). */
export function companyListProjectionCandidates(includeLegacyEnrichment: boolean): string[] {
  if (includeLegacyEnrichment) {
    return [
      `${COMPANY_LIST_PROJECTIONS[0]}, google_data, public_scrape_data`,
      ...COMPANY_LIST_PROJECTIONS,
    ];
  }
  return [...COMPANY_LIST_PROJECTIONS];
}

function mapRow(row: Record<string, unknown>): Company {
  const baseServices = (row.services as Company['services']) || [];
  const fmcsaFields = extractFmcsaFieldsFromRow(row, baseServices);
  // Prefer FMCSA DBA over legal entity name for all public list/profile surfaces.
  const publicNames = resolvePublicCompanyNameFromSources({
    storedName: row.name as string,
    fmcsaLegalName: row.fmcsa_legal_name as string | null | undefined,
    fmcsaRaw: row.fmcsa_raw,
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
    googleData?.status === 'ok' &&
    googleData.rating != null &&
    googleData.rating > 0;

  // Columns may hold Places-derived ratings while verification_sources.google was
  // never written or was wiped. Synthesize a minimal ok snapshot for profile/compare
  // UI so Google panels are not empty when the denormalized numbers exist.
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

  const overallRating = dbRating > 0 ? dbRating : googleOk ? googleData!.rating! : 0;
  const reviewCount =
    dbReviews > 0
      ? dbReviews
      : googleOk && googleData!.review_count != null
        ? googleData!.review_count
        : 0;
  const bbbFromScrape = publicScrapeData?.bbb_rating;
  // Strict: column NR is not a real grade — only use scrape when column empty/NR
  const colBbb = (row.bbb_rating as string | null | undefined)?.trim();
  const bbbRating =
    (colBbb && colBbb !== 'NR'
      ? (colBbb as Company['bbbRating'])
      : (bbbFromScrape as Company['bbbRating'] | undefined)) || 'NR';
  const bbbAccredited =
    Boolean(row.bbb_accredited) || Boolean(publicScrapeData?.bbb_accredited);

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

  return normalizeCompanyForDisplay({
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
    googleData,
    publicScrapeData,
  });
}

/**
 * Default select already includes verification_sources (Google snapshots).
 * COMPANY_LIST_ENRICHMENT=1 adds legacy google_data / public_scrape_data only after migrations.
 */
let companyListSelectMode: 'full' | 'core' =
  process.env.COMPANY_LIST_ENRICHMENT === '1' ? 'full' : 'core';

const COMPANIES_FETCH_TIMEOUT_MS = 12_000;

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

async function selectCompanyList(
  supabase: NonNullable<ReturnType<typeof createAnonSupabaseClient>>,
  columns: string
) {
  return supabase
    .from('companies')
    .select(columns)
    .order('reputation_score', { ascending: false });
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

  const projections = companyListProjectionCandidates(
    companyListSelectMode === 'full'
  );

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
    const missingTable =
      error.message.includes('does not exist') ||
      error.message.includes('schema cache') ||
      error.code === '42P01';
    logger.error('companies.fetch_failed', {
      code: error.code,
      message: error.message,
      missingTable,
      hint: missingTable
        ? 'Run supabase/migrations/20260708140000_ensure_companies_directory.sql'
        : undefined,
    });
    // Remember schema lag so concurrent SSG pages skip the failing full projection.
    if (isSchemaColumnError(error)) {
      companyListSelectMode = 'core';
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
  // v10: include service_scope + coverage_counties when present (Local Mover / geo filters)
  ['companies-directory-v10-scope-coverage'],
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
  const projections = companyListProjectionCandidates(
    companyListSelectMode === 'full'
  );

  let bySlugOrId: Record<string, unknown> | null = null;
  let slugError: { code?: string; message?: string } | null = null;

  for (let i = 0; i < projections.length; i++) {
    const cols = projections[i]!;
    const result = await supabase
      .from('companies')
      .select(cols)
      .or(`slug.eq.${input},id.eq.${input}`)
      .maybeSingle();
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
    return mapRow(bySlugOrId as Record<string, unknown>);
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
    const { data: byPredicted, error: predictedError } = await supabase
      .from('companies')
      .select(listCols)
      .eq('slug', predictedSlug)
      .maybeSingle();
    if (!predictedError && byPredicted) {
      return mapRow(byPredicted as Record<string, unknown>);
    }
  }

  const collapsedSlug = slugifyCompanyName(nameFromSlug);
  if (collapsedSlug && collapsedSlug !== input && collapsedSlug !== predictedSlug) {
    const { data: byCollapsed, error: collapsedError } = await supabase
      .from('companies')
      .select(listCols)
      .eq('slug', collapsedSlug)
      .maybeSingle();
    if (!collapsedError && byCollapsed) {
      return mapRow(byCollapsed as Record<string, unknown>);
    }
  }

  const viaRpc = await getDirectoryCompanyViaRpc(supabase, input);
  if (viaRpc) {
    return mapRow(viaRpc);
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
