/**
 * Single source of truth for attaching Google + BBB enrichment to Company
 * for profile, compare, and directory display.
 *
 * Resolve order for Google:
 * 1. Existing usable googleData (verification_sources.google / google_data via mapRow)
 * 2. Synthesize from denormalized overall_rating + review_count when both > 0
 *    (common when Places was written to columns but snapshot JSON was lost)
 * 3. null — UI shows empty Google panel (honest)
 *
 * BBB: never invent grades; only pass through publicScrapeData / bbbRating as mapped.
 */
import type { Company } from '@/types';
import type { GooglePlacesData } from '@/lib/verification/types';
import { isDisplayableGooglePlacesRating } from '@/lib/verification/google-places';
import { hasBbbPublicScrapeData } from '@/lib/verification/bbb-public-display';

export type GoogleDisplayMeta = {
  available: boolean;
  rating: number | null;
  reviewCount: number | null;
  placeId: string | null;
  /** True when snapshot was rebuilt from rating columns (no place_id from Places API) */
  derivedFromColumns: boolean;
  mapsUrl: string | null;
};

/** Build a Maps search URL (place_id preferred). */
export function googleMapsSearchUrl(
  company: Pick<Company, 'name' | 'headquarters' | 'physicalAddress' | 'googleData'>
): string | null {
  const g = company.googleData;
  if (g?.place_id) {
    const q = encodeURIComponent(g.name?.trim() || company.name || 'moving company');
    return `https://www.google.com/maps/search/?api=1&query=${q}&query_place_id=${encodeURIComponent(g.place_id)}`;
  }
  const name = g?.name?.trim() || company.name?.trim();
  const addr =
    g?.formatted_address?.trim() ||
    company.physicalAddress?.trim() ||
    company.headquarters?.trim() ||
    '';
  if (name && addr) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name} ${addr}`)}`;
  }
  if (name) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ' moving company')}`;
  }
  return null;
}

export function synthesizeGoogleFromRatingColumns(
  company: Pick<Company, 'name' | 'overallRating' | 'reviewCount' | 'lastUpdated' | 'googleData'>
): GooglePlacesData | null {
  const rating = Number(company.overallRating);
  const reviewCount = Number(company.reviewCount);
  if (!(rating > 0 && reviewCount > 0)) return null;

  const existing = company.googleData;
  return {
    source: 'google_places_api',
    place_id: existing?.place_id ?? null,
    name: existing?.name ?? company.name ?? null,
    rating,
    review_count: reviewCount,
    formatted_address: existing?.formatted_address ?? null,
    website_url: existing?.website_url ?? null,
    phone: existing?.phone ?? null,
    review_snippets: existing?.review_snippets ?? [],
    last_fetched: existing?.last_fetched || company.lastUpdated || new Date().toISOString(),
    status: 'ok',
  };
}

/**
 * Ensure company.googleData is displayable whenever we have stored ratings.
 * Always returns plain serializable fields (never throws).
 */
export function finalizeCompanyEnrichmentForDisplay(company: Company): Company {
  try {
    let googleData = company.googleData ?? null;

    if (!isDisplayableGooglePlacesRating(googleData)) {
      const synth = synthesizeGoogleFromRatingColumns({
        ...company,
        googleData,
      });
      if (synth) googleData = synth;
    }

    // Normalize status for legacy snapshots missing status but having rating
    if (
      googleData &&
      !googleData.status &&
      ((googleData.rating != null && googleData.rating > 0) ||
        (googleData.review_count != null && googleData.review_count > 0))
    ) {
      googleData = {
        ...googleData,
        status: 'ok',
        source: googleData.source ?? 'google_places_api',
      };
    }

    return {
      ...company,
      googleData,
      publicScrapeData: company.publicScrapeData ?? null,
    };
  } catch {
    return {
      ...company,
      googleData: company.googleData ?? null,
      publicScrapeData: company.publicScrapeData ?? null,
    };
  }
}

export function getGoogleDisplayMeta(company: Company): GoogleDisplayMeta & {
  status: string | null;
} {
  const finalized = finalizeCompanyEnrichmentForDisplay(company);
  const g = finalized.googleData;
  const available = isDisplayableGooglePlacesRating(g);
  const derivedFromColumns = Boolean(
    available && g && !g.place_id && (company.overallRating > 0 || company.reviewCount > 0)
  );
  return {
    available,
    status: g?.status ?? null,
    rating: available && g?.rating != null ? g.rating : null,
    reviewCount: available ? g?.review_count ?? null : null,
    placeId: g?.place_id ?? null,
    derivedFromColumns,
    mapsUrl: googleMapsSearchUrl(finalized),
  };
}

export function getBbbDisplaySafe(company: Company): {
  confirmed: boolean;
  rating: string | null;
  accredited: boolean;
} {
  const confirmed = hasBbbPublicScrapeData(company.publicScrapeData);
  const col = company.bbbRating && company.bbbRating !== 'NR' ? company.bbbRating : null;
  return {
    confirmed: confirmed || Boolean(col),
    rating: confirmed
      ? company.publicScrapeData?.bbb_rating ?? col
      : col,
    accredited: company.bbbAccredited || Boolean(company.publicScrapeData?.bbb_accredited),
  };
}
