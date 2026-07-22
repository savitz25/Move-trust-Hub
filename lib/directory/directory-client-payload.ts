import type { PublicScrapeData, PublicSourceMeta } from '@/lib/verification/types';
import { normalizeCompanyForDisplay } from '@/lib/directory/normalize-company';
import type { Company } from '@/types';

const EMPTY_RATING_BREAKDOWN: Company['ratingBreakdown'] = {
  fiveStar: 0,
  fourStar: 0,
  threeStar: 0,
  twoStar: 0,
  oneStar: 0,
};

/**
 * Minimal BBB scrape for directory badges only.
 * Drops review snippets, Trustpilot, Yelp, and unused scrape noise.
 */
function trimPublicScrapeForDirectory(
  data: PublicScrapeData | null | undefined
): PublicScrapeData | undefined {
  if (!data) return undefined;

  const bbbSource = data.sources?.bbb;
  if (!bbbSource) return undefined;

  const bbbMeta: PublicSourceMeta = {
    status: bbbSource.status,
    method: bbbSource.method,
    ...(bbbSource.url ? { url: bbbSource.url } : {}),
  };

  return {
    confidence: 'public',
    sources: { bbb: bbbMeta },
    bbb_rating: data.bbb_rating ?? null,
    bbb_review_count: data.bbb_review_count ?? null,
    bbb_accredited: data.bbb_accredited ?? null,
    bbb_accreditation_status: data.bbb_accreditation_status ?? null,
    bbb_accredited_since: data.bbb_accredited_since ?? null,
    bbb_file_opened: data.bbb_file_opened ?? data.bbb_details?.file_opened_date ?? null,
    bbb_profile_url: data.bbb_profile_url ?? data.bbb_details?.profile_url ?? null,
    bbb_details: data.bbb_details
      ? {
          accreditation_status: data.bbb_details.accreditation_status ?? null,
          accredited_since: data.bbb_details.accredited_since ?? null,
          file_opened_date: data.bbb_details.file_opened_date ?? null,
          profile_url: data.bbb_details.profile_url ?? null,
          review_snippets: [],
        }
      : undefined,
    bbb_recent_reviews: [],
    trustpilot_rating: null,
    trustpilot_review_count: null,
    yelp_rating: null,
    yelp_review_count: null,
    last_scraped_at: data.last_scraped_at ?? '',
  };
}

/**
 * Explicit directory DTO — do not spread full Company (avoids multi‑MB RSC hydration).
 * Keeps filter/sort/badge/search fields only.
 */
export function prepareCompaniesForDirectoryClient(companies: Company[]): Company[] {
  if (!Array.isArray(companies)) return [];

  return companies
    .map((raw) => {
      try {
        const c = normalizeCompanyForDisplay(raw);
        return {
          id: c.id,
          slug: c.slug,
          name: c.name,
          shortDescription: c.shortDescription,
          description: '',
          foundedYear: c.foundedYear,
          headquarters: c.headquarters,
          website: '',
          usdotNumber: c.usdotNumber,
          mcNumber: c.mcNumber,
          fmcsaSafetyRating: c.fmcsaSafetyRating,
          fmcsaComplaints: c.fmcsaComplaints,
          fmcsaShipments: c.fmcsaShipments,
          fmcsaLastChecked: c.fmcsaLastChecked ?? null,
          authorityActive: c.authorityActive,
          outOfService: c.outOfService,
          usdotStatus: c.usdotStatus,
          entityType: c.entityType ?? null,
          /** Required for Local Mover vs Carrier type badges on directory cards */
          serviceScope: c.serviceScope ?? null,
          powerUnits: c.powerUnits,
          bbbRating: c.bbbRating,
          bbbAccredited: c.bbbAccredited,
          overallRating: c.overallRating,
          reviewCount: c.reviewCount,
          reputationScore: c.reputationScore,
          yearsInBusiness: c.yearsInBusiness,
          avgPricePerMove: c.avgPricePerMove,
          priceRange: c.priceRange,
          coverage: c.coverage,
          services: c.services,
          specialties: (c.specialties ?? []).slice(0, 3),
          ratingBreakdown: EMPTY_RATING_BREAKDOWN,
          isVerified: c.isVerified,
          lastUpdated: c.lastUpdated,
          googleData: undefined,
          publicScrapeData: trimPublicScrapeForDirectory(c.publicScrapeData),
        } satisfies Company;
      } catch {
        return null;
      }
    })
    .filter((row): row is Company => row !== null);
}
