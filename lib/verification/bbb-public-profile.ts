import type { BbbPublicReview, PublicSourceMeta } from '@/lib/verification/types';
import { fetchBbbPublicScrape } from '@/lib/verification/bbb-public-scrape';

export type BbbPublicProfileResult = {
  bbb_rating: string | null;
  bbb_review_count: number | null;
  bbb_accredited: boolean | null;
  bbb_accreditation_status: string | null;
  bbb_file_opened: string | null;
  bbb_accredited_since: string | null;
  bbb_profile_url: string | null;
  bbb_recent_reviews: BbbPublicReview[];
  meta: PublicSourceMeta;
};

/**
 * Deep BBB public scrape — delegates to fetchBbbPublicScrape (search → match → profile).
 * Used for one-off tests and enrichment scripts.
 */
export async function fetchBbbPublicProfile(params: {
  companyName: string;
  city?: string;
  state?: string;
  headquarters?: string | null;
  usdotNumber?: string | null;
}): Promise<BbbPublicProfileResult> {
  const result = await fetchBbbPublicScrape({
    companyName: params.companyName,
    city: params.city,
    state: params.state,
    headquarters: params.headquarters,
    usdotNumber: params.usdotNumber,
  });

  if (!result.listed) {
    return {
      bbb_rating: null,
      bbb_review_count: null,
      bbb_accredited: null,
      bbb_accreditation_status: null,
      bbb_file_opened: null,
      bbb_accredited_since: null,
      bbb_profile_url: null,
      bbb_recent_reviews: [],
      meta: result.meta,
    };
  }

  return {
    bbb_rating: result.bbb_rating,
    bbb_review_count: result.bbb_review_count,
    bbb_accredited: result.bbb_accredited,
    bbb_accreditation_status: result.bbb_accreditation_status,
    bbb_file_opened: result.bbb_file_opened,
    bbb_accredited_since: result.bbb_accredited_since,
    bbb_profile_url: result.bbb_profile_url,
    bbb_recent_reviews: result.bbb_recent_reviews,
    meta: result.meta,
  };
}