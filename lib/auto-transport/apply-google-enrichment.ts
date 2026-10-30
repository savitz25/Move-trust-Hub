import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import type { Company } from '@/types';
import type { GooglePlacesData } from '@/lib/verification/types';
import { isDisplayableGooglePlacesRating } from '@/lib/verification/google-places';
import { selectRatingProvenance } from '@/lib/verification/rating-provenance';

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

  const selected = selectRatingProvenance({
    provider: {
      id: company.id,
      name: company.name,
      legalName: company.fmcsaLegalName,
      usdotNumber: company.usdotNumber,
      website: company.website,
      phone: company.phone,
      headquarters: company.headquarters,
    },
    google,
    storedRating: company.overallRating,
    storedReviewCount: company.reviewCount,
    realBusiness: Boolean(company.id),
  });
  if (google.name?.trim() && selected.provenance.withheldReason) {
    return company;
  }
  if (selected.provenance.applicable && selected.displayGoogle) {
    return {
      ...company,
      googleData: selected.displayGoogle,
      overallRating: selected.provenance.rating ?? 0,
      reviewCount: selected.provenance.reviewCount ?? 0,
      ratingProvenance: selected.provenance,
    };
  }

  return {
    ...company,
    googleData: google,
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
