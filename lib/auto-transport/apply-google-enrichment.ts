import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import type { Company } from '@/types';
import type { GooglePlacesData } from '@/lib/verification/types';
import { isDisplayableGooglePlacesRating } from '@/lib/verification/google-places';

type EnrichmentFileRow = {
  slug: string;
  name?: string;
  /** Legacy mistaken field — industry volume only; never used as Places source of truth */
  overallRating?: number | null;
  reviewCount?: number | null;
  google?: GooglePlacesData | null;
  updatedAt?: string;
};

let cache: Record<string, EnrichmentFileRow> | null = null;

function loadEnrichment(): Record<string, EnrichmentFileRow> {
  if (cache) return cache;
  const file = resolve(process.cwd(), 'data/auto-transport-google-enrichment.json');
  if (!existsSync(file)) {
    cache = {};
    return cache;
  }
  try {
    cache = JSON.parse(readFileSync(file, 'utf8')) as Record<string, EnrichmentFileRow>;
  } catch {
    cache = {};
  }
  return cache;
}

/**
 * Attach a committed Google Places snapshot from data/auto-transport-google-enrichment.json
 * when the company has no displayable Places data yet.
 *
 * Policy:
 *  - NEVER overwrite industry-reported overallRating / reviewCount with Places numbers
 *  - Places live only on company.googleData
 *  - Prefer live DB googleData when already displayable
 */
export function applyAutoTransportGoogleEnrichment(company: Company): Company {
  if (isDisplayableGooglePlacesRating(company.googleData)) {
    return company;
  }

  const row = loadEnrichment()[company.slug];
  const google = row?.google;
  if (!isDisplayableGooglePlacesRating(google)) {
    return company;
  }

  return {
    ...company,
    googleData: google,
    // Keep editorial industry fields untouched
    overallRating: company.overallRating,
    reviewCount: company.reviewCount,
  };
}

/** Snapshot for enrich scripts (place_id bootstrap). */
export function getAutoTransportGoogleFileSnapshot(
  slug: string
): GooglePlacesData | null {
  const row = loadEnrichment()[slug];
  return isDisplayableGooglePlacesRating(row?.google) ? (row!.google as GooglePlacesData) : null;
}
