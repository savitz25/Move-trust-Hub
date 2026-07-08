import {
  googleFromVerificationSources,
  parseGoogleData,
  parsePublicScrapeData,
  parseVerificationSources,
  publicScrapeFromVerificationSources,
} from '@/lib/verification/backfill-helpers';
import type { GooglePlacesData, PublicScrapeData } from '@/lib/verification/types';

/** Prefer legacy columns; fall back to verification_sources from backfill. */
export function resolveGoogleDataFromRow(
  row: Record<string, unknown>
): GooglePlacesData | null {
  const direct = parseGoogleData(row.google_data);
  if (direct) return direct;
  return googleFromVerificationSources(parseVerificationSources(row.verification_sources));
}

export function resolvePublicScrapeFromRow(
  row: Record<string, unknown>
): PublicScrapeData | null {
  const direct = parsePublicScrapeData(row.public_scrape_data);
  if (direct) return direct;
  return publicScrapeFromVerificationSources(parseVerificationSources(row.verification_sources));
}