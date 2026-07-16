import type { PublicScrapeData } from '@/lib/verification/types';
import { normalizeCompanyForDisplay } from '@/lib/directory/normalize-company';
import type { Company } from '@/types';

/** BBB badge fields only — omit review snippets and bulky scrape payloads. */
function trimPublicScrapeForDirectory(
  data: PublicScrapeData | null | undefined
): PublicScrapeData | undefined {
  if (!data) return undefined;

  const bbbSource = data.sources?.bbb;
  if (!bbbSource) return undefined;

  return {
    confidence: 'public' as const,
    sources: { bbb: bbbSource },
    bbb_rating: data.bbb_rating ?? null,
    bbb_review_count: data.bbb_review_count ?? null,
    bbb_accredited: data.bbb_accredited ?? null,
    bbb_accreditation_status: data.bbb_accreditation_status ?? null,
    bbb_accredited_since: data.bbb_accredited_since ?? null,
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
 * Strip enrichment blobs before serializing companies into the client directory island.
 * Keeps verification badge fields while avoiding multi‑MB RSC payloads.
 */
export function prepareCompaniesForDirectoryClient(companies: Company[]): Company[] {
  if (!Array.isArray(companies)) return [];

  return companies
    .map((raw) => {
      try {
        const company = normalizeCompanyForDisplay(raw);
        return {
          ...company,
          description: '',
          googleData: undefined,
          publicScrapeData: trimPublicScrapeForDirectory(company.publicScrapeData),
        };
      } catch {
        return null;
      }
    })
    .filter((row): row is Company => row !== null);
}