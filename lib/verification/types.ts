/**
 * Multi-source company verification data shapes.
 *
 * Reliability tiers (highest → lowest):
 * 1. FMCSA / DOT — official federal licensing (already implemented)
 * 2. Google Places API — licensed Google business data
 * 3. BBB API — official BBB partner API when BBB_API_KEY is set
 * 4. Public scrape — HTML parsing of public pages; always labeled low-confidence
 */

export type SourceFetchStatus = 'ok' | 'not_found' | 'error' | 'skipped';

export type GooglePlacesData = {
  source: 'google_places_api';
  place_id: string | null;
  name: string | null;
  rating: number | null;
  review_count: number | null;
  formatted_address: string | null;
  review_snippets: Array<{
    text: string;
    rating: number;
    relative_time?: string;
    author?: string;
  }>;
  last_fetched: string;
  status: SourceFetchStatus;
  error?: string;
  /** Trimmed API payload for audit — not shown raw to users */
  raw_response?: Record<string, unknown>;
};

export type PublicSourceMeta = {
  status: SourceFetchStatus;
  /** public_scrape = zero-cost HTML parse; bbb_api = official BBB API */
  method: 'public_scrape' | 'bbb_api';
  url?: string;
  error?: string;
};

export type BbbPublicReview = {
  text: string;
  date?: string;
  author?: string;
};

export type BbbReviewSnippet = {
  text: string;
  author?: string;
  date?: string;
  rating?: number;
};

/** Extended BBB fields from API or public profile scrape. */
export type BbbScrapeDetails = {
  accreditation_status: string | null;
  file_opened_date: string | null;
  accredited_since: string | null;
  profile_url: string | null;
  review_snippets: BbbReviewSnippet[];
};

export type PublicScrapeData = {
  /** Always "public" — never treat scrape data as authoritative */
  confidence: 'public';
  bbb_rating: string | null;
  bbb_review_count: number | null;
  bbb_accredited: boolean | null;
  /** Nested BBB profile scrape (backfill storage). */
  bbb_details?: BbbScrapeDetails | null;
  /** Flat fields for profile UI (derived from bbb_details when present). */
  bbb_accreditation_status?: string | null;
  bbb_file_opened?: string | null;
  bbb_accredited_since?: string | null;
  bbb_profile_url?: string | null;
  bbb_recent_reviews?: BbbPublicReview[];
  trustpilot_rating: number | null;
  trustpilot_review_count: number | null;
  yelp_rating: number | null;
  yelp_review_count: number | null;
  sources: {
    bbb?: PublicSourceMeta;
    trustpilot?: PublicSourceMeta;
    yelp?: PublicSourceMeta;
  };
  last_scraped_at: string;
};

export type CompanyEnrichmentInput = {
  legalName: string;
  headquarters?: string | null;
  city?: string | null;
  state?: string | null;
  phone?: string | null;
  usdotNumber?: string | null;
};

export type CompanyEnrichmentResult = {
  google: GooglePlacesData | null;
  publicScrape: PublicScrapeData | null;
  fetchedAt: string;
};