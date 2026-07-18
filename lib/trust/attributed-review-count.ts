import 'server-only';

import { getUnifiedDirectoryCompanies } from '@/lib/directory/unified-directory';
import { isPubliclyDisplayableCompany } from '@/lib/trust/company-display-policy';
import {
  countAttributableReviews,
  getAttributableReviewsForCompany,
} from '@/lib/trust/verified-reviews';
import type { Company } from '@/types';

/**
 * Count named Google review snippets published on a company profile
 * (from Google Places enrichment — typically up to ~3 per company).
 */
export function countGoogleAttributedSnippets(company: Company): number {
  const data = company.googleData;
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

/** Sum attributed reviews across a company list. */
export function countAttributedReviewsAcrossCompanies(companies: Company[]): number {
  return companies.reduce((sum, company) => sum + countAttributedReviewsForCompany(company), 0);
}

/**
 * Live site-wide total for trust badges.
 * Uses the unified directory (DB + active catalog) so the number grows as
 * companies and Google snippets are ingested. Falls back to seed-only if empty.
 */
export async function getLiveAttributedReviewCount(): Promise<number> {
  try {
    const companies = (await getUnifiedDirectoryCompanies()).filter(isPubliclyDisplayableCompany);
    const live = countAttributedReviewsAcrossCompanies(companies);
    if (live > 0) return live;
  } catch {
    // fall through to seed
  }
  return countAttributableReviews();
}
