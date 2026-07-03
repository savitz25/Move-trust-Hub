import type { Review } from '@/types';
import {
  countAttributableReviews,
  getAttributableReviewsForCompany,
  isAttributableReview,
} from '@/lib/trust/verified-reviews';

export const NATIVE_REVIEW_VERIFIED_LABEL = 'Verified by Move Trust Hub';

export const REVIEW_TRANSPARENCY_DISCLAIMER =
  'Move Trust Hub hosts a small set of attributed Google reviews and moderated community submissions. Industry-reported review volumes on company profiles reflect third-party platforms — not reviews collected or verified on this site.';

export const EDITORIAL_REVIEW_VOLUME_NOTE =
  'Industry-reported volume from third-party platforms — not verified on Move Trust Hub.';

export const EXTERNAL_REVIEW_ATTRIBUTION_NOTE =
  'Attributed excerpts sourced from public Google reviews with named reviewers. We do not republish full third-party review feeds.';

export type ReviewSourceDisplay = {
  label: string;
  shortLabel: string;
  isAttributable: boolean;
  isNative: boolean;
  disclaimer?: string;
};

const GOOGLE_SEARCH_URL = 'https://www.google.com/search?q=';

export function getSiteAttributableReviewCount(): number {
  return countAttributableReviews();
}

export function getCompanyAttributableReviewCount(companyId: string): number {
  return getAttributableReviewsForCompany(companyId, 100).length;
}

export function formatEditorialReviewVolume(count: number): string {
  if (count <= 0) return 'Not reported';
  return `${count.toLocaleString()} industry-reported`;
}

export function formatAttributableReviewCount(count: number): string {
  if (count === 0) return 'No attributed reviews on-site yet';
  if (count === 1) return '1 attributed Google review on-site';
  return `${count} attributed Google reviews on-site`;
}

export function getReviewSourceDisplay(review: Review): ReviewSourceDisplay {
  if (isAttributableReview(review)) {
    return {
      label: `Attributed ${review.source} Review — ${review.author}, ${review.rating}★`,
      shortLabel: `Attributed ${review.source}`,
      isAttributable: true,
      isNative: false,
    };
  }

  if (review.source === 'Verified Customer') {
    return {
      label: 'Editorial research sample',
      shortLabel: 'Editorial sample',
      isAttributable: false,
      isNative: false,
      disclaimer: 'Internal research note — not emitted as structured review schema.',
    };
  }

  return {
    label: `${review.source} reference (unverified on-site)`,
    shortLabel: review.source,
    isAttributable: false,
    isNative: false,
    disclaimer: 'Third-party reference — not attributed or verified on Move Trust Hub.',
  };
}

export function buildGoogleAttributionSearchUrl(companyName: string): string {
  return `${GOOGLE_SEARCH_URL}${encodeURIComponent(`${companyName} moving company reviews`)}`;
}

export function companyProfileReviewMeta(params: {
  companyId: string;
  editorialReviewCount: number;
  editorialRating: number;
}): { headline: string; detail: string } {
  const attributable = getCompanyAttributableReviewCount(params.companyId);
  if (attributable > 0) {
    return {
      headline: formatAttributableReviewCount(attributable),
      detail: `${params.editorialRating}★ editorial rating · ${formatEditorialReviewVolume(params.editorialReviewCount)}`,
    };
  }
  return {
    headline: `${params.editorialRating}★ editorial rating`,
    detail: formatEditorialReviewVolume(params.editorialReviewCount),
  };
}