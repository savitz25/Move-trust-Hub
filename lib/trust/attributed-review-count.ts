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

type SnippetLike = {
  text?: string;
  author?: string;
  rating?: number;
};

function countSnippets(snippets: SnippetLike[] | null | undefined): number {
  if (!Array.isArray(snippets)) return 0;
  return snippets.filter((snippet) => {
    const text = snippet.text?.trim() ?? '';
    if (text.length < 8) return false;
    return Boolean(snippet.author?.trim()) || text.length >= 40;
  }).length;
}

function googleDataFromVerificationSources(
  sources: unknown
): GooglePlacesData | null {
  if (!sources || typeof sources !== 'object') return null;
  const google = (sources as Record<string, unknown>).google;
  if (!google || typeof google !== 'object') return null;
  return google as GooglePlacesData;
}

/**
 * Count named Google review snippets published on a company profile
 * (from Google Places enrichment — typically up to ~3 per company).
 */
export function countGoogleAttributedSnippets(company: Company): number {
  const direct = countSnippets(company.googleData?.review_snippets);
  if (direct > 0) return direct;
  // Production packs Google enrichment into verification_sources when legacy columns lag.
  return 0;
}

/**
 * Per-company attributed count: prefer live Google snippets when present,
 * otherwise fall back to on-site curated seed reviews for that company.
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

/**
 * Lightweight Supabase projection — directory list omits enrichment blobs for payload size.
 * Production stores Google snippets under verification_sources.google.review_snippets
 * (legacy google_data column may not exist yet).
 */
async function fetchAttributedSnippetTotalUncached(): Promise<number> {
  if (!isSupabaseConfigured()) return 0;

  const url = getSupabaseUrl();
  const anonKey = getSupabaseAnonKey();
  if (!url || !anonKey) return 0;

  const supabase = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  let total = 0;
  const pageSize = 500;

  // Prefer verification_sources (present in production). Fall back to google_data if available.
  for (const column of ['verification_sources', 'google_data'] as const) {
    total = 0;
    let ok = true;

    for (let from = 0; ; from += pageSize) {
      const { data, error } = await supabase
        .from('companies')
        .select(`id, ${column}`)
        .range(from, from + pageSize - 1);

      if (error) {
        ok = false;
        break;
      }
      if (!data?.length) break;

      for (const row of data as Record<string, unknown>[]) {
        if (column === 'verification_sources') {
          const google = googleDataFromVerificationSources(row.verification_sources);
          total += countSnippets(google?.review_snippets);
        } else {
          const google = row.google_data as GooglePlacesData | null;
          total += countSnippets(google?.review_snippets);
        }
      }

      if (data.length < pageSize) break;
    }

    if (ok && total > 0) return total;
    if (ok && total === 0 && column === 'verification_sources') {
      // Column exists but empty — try google_data next.
      continue;
    }
    if (!ok) continue;
  }

  return total;
}

const getCachedAttributedSnippetTotal = unstable_cache(
  fetchAttributedSnippetTotalUncached,
  ['attributed-review-snippets-total-v2-verification-sources'],
  { tags: [COMPANIES_DIRECTORY_TAG], revalidate: 300 }
);

/**
 * Live site-wide total for trust badges.
 * Auto-updates when companies are published/enriched (directory cache tag + 5m revalidate).
 */
export async function getLiveAttributedReviewCount(): Promise<number> {
  try {
    const liveTotal = await getCachedAttributedSnippetTotal();
    const seedTotal = countAttributableReviews();
    // Prefer live enrichment when present; never sum both (avoids double-count).
    if (liveTotal > 0) return liveTotal;
    return seedTotal;
  } catch {
    return countAttributableReviews();
  }
}
