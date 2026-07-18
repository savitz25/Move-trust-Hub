/**
 * Single source of truth for directory-wide trust metrics.
 * All homepage, hub, directory, and badge surfaces must import from here.
 */
import 'server-only';

import { countAttributedReviewsAcrossCompanies } from '@/lib/trust/attributed-review-count';
import { isPubliclyDisplayableCompany } from '@/lib/trust/company-display-policy';
import { getUnifiedDirectoryCompanies } from '@/lib/directory/unified-directory';
import { countAttributableReviews } from '@/lib/trust/verified-reviews';
import { getLiveAttributedReviewCount } from '@/lib/trust/attributed-review-count';
import { getVerifiedDirectoryCompaniesSeed } from '@/lib/trust/verified-directory-seed';

export {
  METHODOLOGY_PAGE_PATH,
  METHODOLOGY_ANCHORS,
  methodologyHref,
  badgeLegendHref,
  type MethodologyReturnContext,
} from '@/lib/trust/methodology-paths';

const seedVerifiedDirectoryCompanies = getVerifiedDirectoryCompaniesSeed();

/**
 * Seed-only count — used by offline scripts and as a fallback.
 * Prefer {@link getSiteAttributableReviewCountLive} in UI.
 */
export function getSiteAttributableReviewCount(): number {
  return countAttributableReviews();
}

/** Live count from directory companies + Google snippets (auto-updates with ISR). */
export async function getSiteAttributableReviewCountLive(): Promise<number> {
  return getLiveAttributedReviewCount();
}

export function getVerifiedDirectoryCompanies() {
  return seedVerifiedDirectoryCompanies;
}

export type DirectoryTrustStats = {
  verifiedMovers: number;
  attributableReviews: number;
  averageRating: number;
  fmcsaLicensed: number;
};

function buildStatsFromCompanies(
  companies: { overallRating: number; isVerified?: boolean }[],
  attributableReviews: number
): DirectoryTrustStats {
  const verifiedMovers = companies.length;
  const averageRating =
    verifiedMovers > 0
      ? Math.round(
          (companies.reduce((sum, c) => sum + (c.overallRating || 0), 0) / verifiedMovers) * 10
        ) / 10
      : 0;

  return {
    verifiedMovers,
    attributableReviews,
    averageRating,
    fmcsaLicensed: verifiedMovers,
  };
}

/** Seed-only metrics (scripts / offline). Prefer {@link getDirectoryTrustStatsAsync} in UI. */
export function getDirectoryTrustStats(): DirectoryTrustStats {
  return buildStatsFromCompanies(
    seedVerifiedDirectoryCompanies,
    getSiteAttributableReviewCount()
  );
}

/**
 * Live directory metrics for trust badges, methodology, homepage.
 * Revalidated with the companies directory cache (~5 min + tag on publish).
 */
export async function getDirectoryTrustStatsAsync(): Promise<DirectoryTrustStats> {
  try {
    const companies = (await getUnifiedDirectoryCompanies()).filter(isPubliclyDisplayableCompany);
    if (companies.length > 0) {
      const attributableReviews = countAttributedReviewsAcrossCompanies(companies);
      return buildStatsFromCompanies(companies, attributableReviews);
    }
  } catch {
    // fall through
  }
  return getDirectoryTrustStats();
}

export const ATTRIBUTED_REVIEWS_EXPLANATION =
  'Named Google customer review excerpts we publish on Move Trust Hub with reviewer attribution — not industry-wide totals and not written by the movers.';

/**
 * Secondary / methodology copy. Pass the live count from getDirectoryTrustStatsAsync.
 */
export function formatAttributedReviewsLabel(count?: number): string {
  const n = count ?? getSiteAttributableReviewCount();
  if (n === 0) return 'Attributed Google reviews on-site';
  if (n === 1) return '1 attributed Google review we published';
  return `${n.toLocaleString()} attributed Google reviews we published`;
}

export function formatDirectoryAvgRating(rating?: number): string {
  const n = rating ?? getDirectoryTrustStats().averageRating;
  return `${n}★ Directory Avg`;
}
