import type { Provider } from '@/types/insurance/provider';
import type { ProviderEnrichmentRecord } from '@/lib/insurance/enrichment/types';
import { computeProviderTrustScore } from '@/lib/insurance/enrichment/trust-score';

export type EnrichedProvider = Provider & {
  enrichment?: ProviderEnrichmentRecord;
  is_enriched: boolean;
  google_rating?: number | null;
  google_review_count?: number | null;
  google_place_id?: string | null;
  bbb_accredited?: boolean | null;
  bbb_complaint_count?: number | null;
  google_review_snippets: ProviderEnrichmentRecord['google_review_snippets'];
  enriched_at?: string;
  needs_manual_review?: boolean;
};

export function mergeProviderWithEnrichment(
  provider: Provider,
  enrichment?: ProviderEnrichmentRecord | null
): EnrichedProvider {
  if (!enrichment) {
    return {
      ...provider,
      is_enriched: false,
      google_review_snippets: [],
    };
  }

  const rating = enrichment.google_rating ?? provider.rating;
  const reviewCount = enrichment.google_review_count ?? provider.review_count;
  const trustScore =
    enrichment.trust_score ??
    computeProviderTrustScore({
      googleRating: enrichment.google_rating,
      googleReviewCount: enrichment.google_review_count,
      bbbRating: enrichment.bbb_rating ?? provider.bbb_rating,
      bbbAccredited: enrichment.bbb_accredited,
      isVerified: provider.is_verified,
      yearsInBusiness: provider.years_in_business,
    });

  return {
    ...provider,
    rating,
    review_count: reviewCount,
    trust_score: trustScore,
    bbb_rating: enrichment.bbb_rating ?? provider.bbb_rating,
    google_rating: enrichment.google_rating,
    google_review_count: enrichment.google_review_count,
    google_place_id: enrichment.google_place_id,
    bbb_accredited: enrichment.bbb_accredited,
    bbb_complaint_count: enrichment.bbb_complaint_count,
    enrichment,
    is_enriched: true,
    google_review_snippets: enrichment.google_review_snippets,
    enriched_at: enrichment.enriched_at,
    needs_manual_review: enrichment.needs_manual_review,
  };
}