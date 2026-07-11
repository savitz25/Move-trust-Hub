import type { GooglePlacesData, PublicScrapeData } from '@/lib/verification/types';
import type { ProviderType } from '@/types/insurance/supabase';

export type ProviderEnrichmentSource = 'supabase' | 'hub' | 'fallback';

export type ProviderEnrichmentInput = {
  slug: string;
  name: string;
  city: string;
  state: string;
  phone?: string | null;
  website?: string | null;
  address?: string | null;
  providerType?: ProviderType;
  source: ProviderEnrichmentSource;
  /** Supabase row id when source is supabase */
  providerId?: string;
  /** Reuse cached Google place_id when refreshing */
  googlePlaceId?: string | null;
  yearsInBusiness?: number | null;
  isVerified?: boolean;
};

export type ProviderEnrichmentPayload = {
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
  trust_score: number;
  fetched_at: string;
  partial_failures: string[];
  needs_manual_review: boolean;
};

export type ProviderEnrichmentRecord = {
  slug: string;
  google_rating: number | null;
  google_review_count: number | null;
  google_place_id: string | null;
  google_review_snippets: GooglePlacesData['review_snippets'];
  bbb_rating: string | null;
  bbb_accredited: boolean | null;
  bbb_complaint_count: number | null;
  bbb_profile_url: string | null;
  trust_score: number | null;
  enriched_at: string;
  needs_manual_review: boolean;
  enrichment_json: ProviderEnrichmentPayload;
};

export type ProviderEnrichmentStore = Record<string, ProviderEnrichmentRecord>;