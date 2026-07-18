/**
 * Single source of truth for directory-wide trust metrics.
 * All homepage, hub, directory, and badge surfaces must import from here.
 */
import { seedCompanies } from '@/data/seed-companies';
import { assessLicense } from '@/lib/trust/license-verification';
import { countAttributableReviews } from '@/lib/trust/verified-reviews';

/** Canonical methodology page — link every reputation score and review count here. */
export const METHODOLOGY_PAGE_PATH = '/about/how-we-score-movers';

export const METHODOLOGY_ANCHORS = {
  reputationScore: 'reputation-score',
  reviewAttribution: 'review-attribution',
  dataSources: 'data-sources',
  badges: 'badges',
} as const;

export type MethodologyReturnContext = {
  /** Internal path only, e.g. `/companies/amerisafe-van-lines` */
  returnPath?: string;
  /** Short label for back button, e.g. company name */
  returnLabel?: string;
};

/**
 * Canonical methodology URL with optional return context for back-navigation.
 * Query params sit before the hash: `/about/how-we-score-movers?from=...#section`
 */
export function methodologyHref(
  anchor?: keyof typeof METHODOLOGY_ANCHORS,
  opts?: MethodologyReturnContext
): string {
  const hash = anchor ? `#${METHODOLOGY_ANCHORS[anchor]}` : '';
  const path = METHODOLOGY_PAGE_PATH;

  if (!opts?.returnPath || !opts.returnPath.startsWith('/') || opts.returnPath.startsWith('//')) {
    return `${path}${hash}`;
  }

  const params = new URLSearchParams();
  params.set('from', opts.returnPath);
  if (opts.returnLabel?.trim()) {
    params.set('fromLabel', opts.returnLabel.trim().slice(0, 80));
  }
  return `${path}?${params.toString()}${hash}`;
}

export function badgeLegendHref(badgeId: string, onProfile = false): string {
  if (onProfile) return `#badge-${badgeId}`;
  return `${methodologyHref('badges')}#badge-${badgeId}`;
}

const verifiedDirectoryCompanies = seedCompanies.filter(
  (c) => c.isVerified && assessLicense(c.usdotNumber, c.mcNumber).isDisplayable
);

let cachedAttributableCount: number | null = null;

/** Count of named, attributable Google reviews published on Move Trust Hub. */
export function getSiteAttributableReviewCount(): number {
  if (cachedAttributableCount === null) {
    cachedAttributableCount = countAttributableReviews();
  }
  return cachedAttributableCount;
}

export function getVerifiedDirectoryCompanies() {
  return verifiedDirectoryCompanies;
}

export type DirectoryTrustStats = {
  verifiedMovers: number;
  attributableReviews: number;
  averageRating: number;
  fmcsaLicensed: number;
};

/** Canonical directory metrics — use everywhere instead of ad-hoc counts. */
export function getDirectoryTrustStats(): DirectoryTrustStats {
  const attributableReviews = getSiteAttributableReviewCount();
  const verifiedMovers = verifiedDirectoryCompanies.length;
  const averageRating =
    verifiedMovers > 0
      ? Math.round(
          (verifiedDirectoryCompanies.reduce((sum, c) => sum + c.overallRating, 0) /
            verifiedMovers) *
            10
        ) / 10
      : 0;

  return {
    verifiedMovers,
    attributableReviews,
    averageRating,
    fmcsaLicensed: verifiedMovers,
  };
}

export const ATTRIBUTED_REVIEWS_EXPLANATION =
  'Named Google reviews published on Move Trust Hub for verified movers — not industry-wide or inflated totals.';

/** User-facing label for the verified on-site review count (footers, trust bars, badges). */
export function formatAttributedReviewsLabel(count?: number): string {
  const n = count ?? getSiteAttributableReviewCount();
  if (n === 0) return '0 Attributed Reviews from Verified Movers';
  if (n === 1) return '1 Attributed Review from Verified Movers';
  return `${n} Attributed Reviews from Verified Movers`;
}

export function formatDirectoryAvgRating(rating?: number): string {
  const n = rating ?? getDirectoryTrustStats().averageRating;
  return `${n}★ Directory Avg`;
}