import 'server-only';

import { unstable_cache } from 'next/cache';
import { createClient } from '@supabase/supabase-js';
import { COMPANIES_DIRECTORY_TAG } from '@/lib/directory/revalidate-company';
import {
  getSupabaseAnonKey,
  getSupabaseUrl,
  isSupabaseConfigured,
} from '@/lib/supabase/config';
import {
  countAttributableReviews,
  getAttributableReviewsForCompany,
} from '@/lib/trust/verified-reviews';
import type { Company } from '@/types';
import type { GooglePlacesData } from '@/lib/verification/types';

/**
 * Count named Google review snippets published on a company profile
 * (from Google Places enrichment — typically up to ~3 per company).
 */
export function countGoogleAttributedSnippets(company: Company): number {
  return countSnippetsInGoogleData(company.googleData);
}

function countSnippetsInGoogleData(data: GooglePlacesData | null | undefined): number {
  if (!data || data.status !== 'ok') return 0;
  return (data.review_snippets ?? []).filter((snippet) => {
    const text = snippet.text?.trim() ?? '';
    if (text.length < 8) return false;
    // Prefer named reviewers; still count substantive snippets shown on the profile.
    return Boolean(snippet.author?.trim()) || text.length >= 40;
  }).length;
}

/**
 * Per-company attributed count: prefer live Google snippets when present,
 * otherwise fall back to on-site curated seed reviews for that company.
 * Never sums both for the same company (avoids double-counting).
 */
export function countAttributedReviewsForCompany(company: Company): number {
  const fromGoogle = countGoogleAttributedSnippets(company);
  if (fromGoogle > 0) return fromGoogle;
  return getAttributableReviewsForCompany(company.id, 100).length;
}

/** Sum attributed reviews across a company list (when googleData is hydrated). */
export function countAttributedReviewsAcrossCompanies(companies: Company[]): number {
  return companies.reduce((sum, company) => sum + countAttributedReviewsForCompany(company), 0);
}

type GoogleDataRow = {
  id: string;
  google_data: GooglePlacesData | null;
};

/**
 * Lightweight Supabase projection — directory list queries omit google_data for payload size,
 * so site-wide badge counts must fetch snippets separately.
 */
async function fetchGoogleSnippetTotalUncached(): Promise<number> {
  if (!isSupabaseConfigured()) return 0;

  const url = getSupabaseUrl();
  const anonKey = getSupabaseAnonKey();
  if (!url || !anonKey) return 0;

  const supabase = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  let total = 0;
  const pageSize = 1000;

  for (let from = 0; ; from += pageSize) {
    // Prefer verified listings; fall back to all rows if the filter is unsupported.
    let query = supabase
      .from('companies')
      .select('id, google_data')
      .range(from, from + pageSize - 1);

    const { data, error } = await query;

    if (error) {
      // Column may be missing in lagging schemas — caller falls back to seed.
      if (
        error.code === '42703' ||
        error.message?.toLowerCase().includes('google_data') ||
        error.message?.toLowerCase().includes('does not exist')
      ) {
        return 0;
      }
      return 0;
    }

    if (!data?.length) break;

    for (const row of data as GoogleDataRow[]) {
      total += countSnippetsInGoogleData(row.google_data);
    }

    if (data.length < pageSize) break;
  }

  return total;
}

const getCachedGoogleSnippetTotal = unstable_cache(
  fetchGoogleSnippetTotalUncached,
  ['attributed-google-snippets-total-v1'],
  { tags: [COMPANIES_DIRECTORY_TAG], revalidate: 300 }
);

/**
 * Live site-wide total for trust badges.
 * Uses Google review_snippets on companies (auto-updates when enrichment runs)
 * plus seed attributed reviews when DB has no snippets yet.
 */
export async function getLiveAttributedReviewCount(): Promise<number> {
  try {
    const googleTotal = await getCachedGoogleSnippetTotal();
    const seedTotal = countAttributableReviews();
    // Prefer the larger honest source: production Google enrichment OR seed curated set.
    // Do not sum both (would double-count seed companies that also have snippets).
    if (googleTotal > 0) return Math.max(googleTotal, seedTotal);
    return seedTotal;
  } catch {
    return countAttributableReviews();
  }
}
