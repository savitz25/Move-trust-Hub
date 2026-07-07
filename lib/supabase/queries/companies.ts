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
import type { Company } from '@/types';

function createAnonSupabaseClient() {
  const url = getSupabaseUrl();
  const anonKey = getSupabaseAnonKey();
  if (!url || !anonKey) return null;
  return createSupabaseClient<Database>(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
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

function mapRow(row: Record<string, unknown>): Company {
  return normalizeCompanyForDisplay({
    id: row.id as string,
    slug: row.slug as string,
    name: row.name as string,
    logo: (row.logo as string) || undefined,
    shortDescription: (row.short_description as string) || '',
    description: (row.description as string) || '',
    foundedYear: (row.founded_year as number) || 0,
    headquarters: (row.headquarters as string) || '',
    website: (row.website as string) || '',
    usdotNumber: (row.usdot_number as string) || '',
    mcNumber: (row.mc_number as string) || '',
    fmcsaSafetyRating:
      (row.fmcsa_safety_rating as Company['fmcsaSafetyRating']) || 'Not Rated',
    fmcsaComplaints: (row.fmcsa_complaints as number) || 0,
    fmcsaShipments: (row.fmcsa_shipments as number) || 0,
    fmcsaLastChecked: (row.fmcsa_last_checked as string) || null,
    authorityActive: row.authority_active as boolean | null | undefined,
    outOfService: Boolean(row.out_of_service),
    complaintsLast12m: (row.complaints_last_12m as number) ?? (row.fmcsa_complaints as number) ?? 0,
    revocationDate: (row.revocation_date as string) || null,
    fmcsaDataHash: (row.data_hash as string) || null,
    bbbRating: (row.bbb_rating as Company['bbbRating']) || 'NR',
    bbbAccredited: Boolean(row.bbb_accredited),
    bbbLastChecked: (row.bbb_last_checked as string) || null,
    complaintsLast36m: (row.complaints_last_36m as number) ?? 0,
    bbbCustomerReviews: (row.bbb_customer_reviews as number) ?? 0,
    bbbDataHash: (row.bbb_data_hash as string) || null,
    bbbBusinessId: (row.bbb_business_id as string) || null,
    bbbAlertCount: (row.bbb_alert_count as number) ?? 0,
    overallRating: Number(row.overall_rating) || 0,
    reviewCount: (row.review_count as number) || 0,
    reputationScore: (row.reputation_score as number) || 0,
    yearsInBusiness: (row.years_in_business as number) || 0,
    avgPricePerMove: (row.avg_price_per_move as number) || 0,
    priceRange: (row.price_range as string) || '',
    coverage: (row.coverage as Company['coverage']) || 'Continental US',
    services: (row.services as Company['services']) || [],
    specialties: (row.specialties as string[]) || [],
    ratingBreakdown:
      (row.rating_breakdown as Company['ratingBreakdown']) ?? EMPTY_RATING_BREAKDOWN,
    isVerified: Boolean(row.is_verified),
    lastUpdated: (row.last_updated as string)?.slice?.(0, 10) || '',
    googleData: (row.google_data as Company['googleData']) ?? null,
    publicScrapeData: (row.public_scrape_data as Company['publicScrapeData']) ?? null,
  });
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

  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .order('reputation_score', { ascending: false });

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
    return [...seedCompanies];
  }

  if (!data?.length) {
    logger.warn('companies.fetch_empty', {
      hint: 'public.companies has no rows; serving seed fallback until movers are published',
    });
    return [...seedCompanies];
  }

  return data.map((row) => mapRow(row as Record<string, unknown>));
}

const getCompaniesDataCached = unstable_cache(
  fetchCompaniesFromDatabase,
  ['companies-directory-v1'],
  { tags: [COMPANIES_DIRECTORY_TAG], revalidate: 60 }
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

  const { data: bySlugOrId, error: slugError } = await supabase
    .from('companies')
    .select('*')
    .or(`slug.eq.${input},id.eq.${input}`)
    .maybeSingle();

  if (!slugError && bySlugOrId) {
    return mapRow(bySlugOrId as Record<string, unknown>);
  }

  if (slugError && isCompaniesTableUnavailableError(slugError.message, slugError.code)) {
    const viaRpc = await getDirectoryCompanyViaRpc(supabase, input);
    if (viaRpc) {
      return mapRow(viaRpc);
    }
  }

  const usdot = parseUsdotFromSlugInput(input) ?? normalizeCompanyUsdot(input);
  if (usdot) {
    const { data: byUsdot, error: usdotError } = await supabase
      .from('companies')
      .select('*')
      .eq('usdot_number', usdot)
      .maybeSingle();

    if (!usdotError && byUsdot) {
      return mapRow(byUsdot as Record<string, unknown>);
    }
  }

  const nameFromSlug = input.includes('-') ? input.replace(/-/g, ' ') : input;
  const { data: byName, error: nameError } = await supabase
    .from('companies')
    .select('*')
    .ilike('name', nameFromSlug)
    .limit(1)
    .maybeSingle();

  if (!nameError && byName) {
    return mapRow(byName as Record<string, unknown>);
  }

  const predictedSlug = buildCompanySlugBase({ name: nameFromSlug, usdot: null });
  if (predictedSlug && predictedSlug !== input) {
    const { data: byPredicted, error: predictedError } = await supabase
      .from('companies')
      .select('*')
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
      .select('*')
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

    if (!nameError && byNameRows?.length) {
      const exactName = byNameRows.find(
        (row) => String(row.name).trim().toLowerCase() === hint.toLowerCase()
      );
      if (exactName) return mapRow(exactName as Record<string, unknown>);

      const fuzzy = byNameRows.find((row) => {
        const company = mapRow(row as Record<string, unknown>);
        return companyMatchesCarrier(parsed, company);
      });
      if (fuzzy) return mapRow(fuzzy as Record<string, unknown>);
    }
  }

  return undefined;
}