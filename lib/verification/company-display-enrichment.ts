import { projectCompanyAssociation } from '@/lib/fmcsa/association-integrity';
/**
 * Single source of truth for attaching Google + BBB enrichment to Company
 * for profile, compare, and directory display.
 *
 * Resolve order for Google:
 * 1. Existing usable googleData (verification_sources.google / google_data via mapRow)
 * 2. null — do not invent a Places snapshot from overall_rating
 *
 * Card and profile scalars go through rating-provenance so a stored column
 * cannot outrank a different location listing.
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

/** Retired. Column numbers are not a Google Places observation. */
export function synthesizeGoogleFromRatingColumns(
  _company: Pick<Company, 'name' | 'overallRating' | 'reviewCount' | 'lastUpdated' | 'googleData'>
): GooglePlacesData | null {
  return null;
}

/**
 * Ensure company.googleData is displayable whenever we have stored ratings.
 * Always returns plain serializable fields (never throws).
 */
export function finalizeCompanyEnrichmentForDisplay(company: Company): Company {
  company = projectCompanyAssociation(company);
  try {
    let googleData = company.googleData ?? null;

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
  // Strict: only confirmed bbb.org profile matches (never bare column letter grades).
  const confirmed = hasBbbPublicScrapeData(company.publicScrapeData);
  return {
    confirmed,
    rating: confirmed ? company.publicScrapeData?.bbb_rating ?? null : null,
    accredited: confirmed
      ? Boolean(company.bbbAccredited || company.publicScrapeData?.bbb_accredited)
      : false,
  };
}
