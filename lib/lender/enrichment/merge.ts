import type { Lender } from '@/lib/lender/mockData';
import type { LenderEnrichmentRecord } from '@/lib/lender/enrichment/types';

export type EnrichedLender = Lender & {
  enrichment?: LenderEnrichmentRecord;
  /** True when live enrichment data overlays static seed values. */
  isEnriched: boolean;
  bbbAccredited: boolean;
  googleReviewSnippets: LenderEnrichmentRecord['google_review_snippets'];
  cfpbRecentIssues: string[];
  enrichedAt?: string;
};

function gradeToTrustBoost(rating: string | null | undefined): number {
  if (!rating) return 0;
  const map: Record<string, number> = {
    'A+': 8,
    A: 6,
    'A-': 4,
    'B+': 2,
    B: 0,
    'B-': -2,
  };
  return map[rating] ?? 0;
}

function computeTrustScore(base: Lender, enrichment?: LenderEnrichmentRecord): number {
  if (!enrichment) return base.trustScore;

  let score = 70;
  const googleRating = enrichment.google_rating ?? base.googleRating;
  const reviewCount = enrichment.google_review_count ?? base.reviewCount;
  const bbbRating = enrichment.bbb_rating ?? base.bbbRating;
  const cfpb = enrichment.cfpb_complaints_count ?? base.cfpbComplaints;

  if (googleRating) score += (googleRating - 3.5) * 6;
  if (reviewCount > 100) score += 3;
  if (reviewCount > 500) score += 2;
  score += gradeToTrustBoost(bbbRating);
  if (enrichment.bbb_accredited) score += 4;
  if (cfpb <= 5) score += 3;
  else if (cfpb > 50) score -= 4;

  return Math.max(0, Math.min(100, Math.round(score)));
}

export function mergeLenderWithEnrichment(
  lender: Lender,
  enrichment?: LenderEnrichmentRecord | null
): EnrichedLender {
  if (!enrichment) {
    return {
      ...lender,
      isEnriched: false,
      bbbAccredited: false,
      googleReviewSnippets: [],
      cfpbRecentIssues: [],
    };
  }

  const rating = enrichment.google_rating ?? lender.rating;
  const reviewCount = enrichment.google_review_count ?? lender.reviewCount;
  const countyScore = enrichment.county_experience_score ?? lender.countyExperienceScore;

  return {
    ...lender,
    rating,
    reviewCount,
    googleRating: enrichment.google_rating ?? lender.googleRating,
    bbbRating: (enrichment.bbb_rating as Lender['bbbRating']) ?? lender.bbbRating,
    cfpbComplaints: enrichment.cfpb_complaints_count ?? lender.cfpbComplaints,
    countyExperienceScore: countyScore,
    trustScore: computeTrustScore(lender, enrichment),
    enrichment,
    isEnriched: true,
    bbbAccredited: Boolean(enrichment.bbb_accredited),
    googleReviewSnippets: enrichment.google_review_snippets,
    cfpbRecentIssues: enrichment.cfpb_recent_issues,
    enrichedAt: enrichment.enriched_at,
  };
}