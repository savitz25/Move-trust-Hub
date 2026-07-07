import 'server-only';

import { fetchGooglePlacesData } from '@/lib/verification/google-places';
import { fetchPublicScrapeData } from '@/lib/verification/public-scrape';
import type { CompanyEnrichmentInput, CompanyEnrichmentResult } from '@/lib/verification/types';

/**
 * Run Google Places + public scrape enrichment in parallel.
 * FMCSA is handled separately in the suggestion flow (already implemented).
 */
export async function enrichCompanySources(
  input: CompanyEnrichmentInput
): Promise<CompanyEnrichmentResult> {
  const [google, publicScrape] = await Promise.all([
    fetchGooglePlacesData(input),
    fetchPublicScrapeData(input),
  ]);

  return {
    google: google.status === 'skipped' ? null : google,
    publicScrape,
    fetchedAt: new Date().toISOString(),
  };
}