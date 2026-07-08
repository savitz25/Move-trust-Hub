import type { BbbPublicReview, PublicScrapeData } from '@/lib/verification/types';

export type NormalizedBbbPublicDisplay = {
  accreditationStatus: string | null;
  rating: string | null;
  accreditedSince: string | null;
  fileOpened: string | null;
  profileUrl: string | null;
  reviewCount: number | null;
  recentReviews: BbbPublicReview[];
  lastScrapedAt: string | null;
};

export function normalizeBbbPublicDisplay(
  data: PublicScrapeData
): NormalizedBbbPublicDisplay {
  const details = data.bbb_details;

  const accreditationStatus =
    data.bbb_accreditation_status ??
    details?.accreditation_status ??
    (data.bbb_accredited === true
      ? 'BBB Accredited Business'
      : data.bbb_accredited === false
        ? 'Not BBB Accredited'
        : null);

  const recentReviews: BbbPublicReview[] =
    data.bbb_recent_reviews?.length
      ? data.bbb_recent_reviews
      : (details?.review_snippets ?? []).map((snippet) => ({
          text: snippet.text,
          date: snippet.date,
          author: snippet.author,
        }));

  return {
    accreditationStatus,
    rating: data.bbb_rating,
    accreditedSince: data.bbb_accredited_since ?? details?.accredited_since ?? null,
    fileOpened: data.bbb_file_opened ?? details?.file_opened_date ?? null,
    profileUrl: data.bbb_profile_url ?? details?.profile_url ?? null,
    reviewCount: data.bbb_review_count,
    recentReviews,
    lastScrapedAt: data.last_scraped_at ?? null,
  };
}

/**
 * Show the BBB profile section only when we have a confirmed BBB listing.
 *
 * Rules (all must pass):
 * 1. sources.bbb.status === 'ok' (scrape or API found a real profile)
 * 2. A bbb.org profile URL exists (proves listing, not search-page noise)
 * 3. At least one substantive field from the profile (rating, accreditation, or file opened)
 *
 * When false, profiles must hide the entire BBB block — no "Unverified" fallback.
 */
export function hasBbbPublicScrapeData(data: PublicScrapeData | null | undefined): boolean {
  if (!data) return false;

  const bbbSource = data.sources?.bbb;
  if (bbbSource?.status !== 'ok') return false;

  const normalized = normalizeBbbPublicDisplay(data);
  const profileUrl = normalized.profileUrl?.trim() ?? '';
  const hasProfileUrl =
    profileUrl.includes('bbb.org') && profileUrl.includes('/profile/');
  const isOfficialApi = bbbSource.method === 'bbb_api';

  // Public scrape must include a profile URL; official BBB API may omit it but still counts.
  if (!hasProfileUrl && !isOfficialApi) return false;

  return Boolean(
    normalized.rating ||
      normalized.accreditationStatus ||
      normalized.fileOpened ||
      normalized.accreditedSince ||
      (normalized.reviewCount != null && normalized.reviewCount > 0) ||
      normalized.recentReviews.length > 0
  );
}