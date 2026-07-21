import {
  googleFromVerificationSources,
  parseGoogleData,
  parsePublicScrapeData,
  parseVerificationSources,
  publicScrapeFromVerificationSources,
} from '@/lib/verification/backfill-helpers';
import { isUsableGoogleSnapshot, mergeGoogleSnapshots } from '@/lib/verification/google-places';
import type { GooglePlacesData, PublicScrapeData } from '@/lib/verification/types';

/**
 * Prefer legacy google_data column, then verification_sources.google.
 * Always prefer a usable (ok) snapshot over a failed/empty one.
 */
export function resolveGoogleDataFromRow(
  row: Record<string, unknown>
): GooglePlacesData | null {
  const direct = parseGoogleData(row.google_data);
  const fromSources = googleFromVerificationSources(
    parseVerificationSources(row.verification_sources)
  );
  const merged = mergeGoogleSnapshots(fromSources, direct);
  // Prefer the richer usable source if merge kept a non-ok
  if (isUsableGoogleSnapshot(direct) && !isUsableGoogleSnapshot(fromSources)) return direct;
  if (isUsableGoogleSnapshot(fromSources) && !isUsableGoogleSnapshot(direct)) return fromSources;
  return merged;
}

export function resolvePublicScrapeFromRow(
  row: Record<string, unknown>
): PublicScrapeData | null {
  const direct = parsePublicScrapeData(row.public_scrape_data);
  if (direct) return direct;
  return publicScrapeFromVerificationSources(parseVerificationSources(row.verification_sources));
}