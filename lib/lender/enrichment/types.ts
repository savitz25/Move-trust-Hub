import type { GooglePlacesData, PublicScrapeData } from '@/lib/verification/types';

export type CfpbComplaintSummary = {
  source: 'cfpb_public_api';
  company_query: string;
  complaints_count: number | null;
  recent_issues: string[];
  recent_products: string[];
  last_fetched: string;
  status: 'ok' | 'not_found' | 'error' | 'skipped';
  error?: string;
};

export type CountyExperienceResult = {
  score: number;
  factors: {
    primary_county: number;
    zip_coverage: number;
    google_local_match: number;
    bbb_presence: number;
    tenure: number;
  };
  computed_at: string;
};

export type LenderEnrichmentInput = {
  slug: string;
  name: string;
  nmlsId: string;
  city: string;
  state: string;
  stateSlug: string;
  county: string;
  countySlug: string;
  zipCodes: string[];
  website?: string;
  phone?: string;
  /** Reuse cached Google place_id when refreshing. */
  googlePlaceId?: string | null;
};

export type LenderEnrichmentPayload = {
  google: GooglePlacesData | null;
  bbb: Pick<
    PublicScrapeData,
    | 'bbb_rating'
    | 'bbb_review_count'
    | 'bbb_accredited'
    | 'bbb_accreditation_status'
    | 'bbb_profile_url'
    | 'bbb_recent_reviews'
    | 'bbb_file_opened'
    | 'bbb_accredited_since'
  > & { listed: boolean; complaint_count: number | null };
  cfpb: CfpbComplaintSummary;
  county: CountyExperienceResult;
  years_in_business: number | null;
  fetched_at: string;
  partial_failures: string[];
};

export type LenderEnrichmentRecord = {
  slug: string;
  google_rating: number | null;
  google_review_count: number | null;
  google_place_id: string | null;
  google_review_snippets: GooglePlacesData['review_snippets'];
  bbb_rating: string | null;
  bbb_accredited: boolean | null;
  bbb_complaint_count: number | null;
  bbb_score: string | null;
  bbb_profile_url: string | null;
  cfpb_complaints_count: number | null;
  cfpb_recent_issues: string[];
  county_experience_score: number | null;
  enriched_at: string;
  enrichment_json: LenderEnrichmentPayload;
};

export type LenderEnrichmentStore = Record<string, LenderEnrichmentRecord>;