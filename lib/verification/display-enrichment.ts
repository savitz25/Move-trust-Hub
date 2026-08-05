/**
 * Single source of truth for displaying Google Places + confirmed BBB on
 * profiles, compare, and directory surfaces.
 *
 * Prefer verification_sources (production) over legacy google_data /
 * public_scrape_data columns when both exist.
 */
import {
  googleFromVerificationSources,
  parseGoogleData,
  parsePublicScrapeData,
  parseVerificationSources,
  publicScrapeFromVerificationSources,
} from '@/lib/verification/backfill-helpers';
import { hasBbbPublicScrapeData } from '@/lib/verification/bbb-public-display';
import { isUsableGoogleSnapshot, mergeGoogleSnapshots } from '@/lib/verification/google-places';
import type { GooglePlacesData, PublicScrapeData } from '@/lib/verification/types';
import type { Company } from '@/types';

/** Drop bulky raw API payloads before sending Google data to the client. */
export function sanitizeGooglePlacesForDisplay(
  data: GooglePlacesData | null | undefined
): GooglePlacesData | null {
  const parsed = parseGoogleData(data);
  if (!parsed) return null;
  const { raw_response: _raw, ...rest } = parsed as GooglePlacesData & {
    raw_response?: unknown;
  };
  return rest;
}

/**
 * Resolve Google Places from a DB row (snake_case) or already-mapped company.
 * Prefer usable (ok + rating/count) snapshots over failed/empty ones.
 */
export function resolveGoogleDataFromRow(
  row: Record<string, unknown>
): GooglePlacesData | null {
  const direct = parseGoogleData(row.google_data);
  const fromSources = googleFromVerificationSources(
    parseVerificationSources(row.verification_sources)
  );
  const merged = mergeGoogleSnapshots(fromSources, direct);
  if (isUsableGoogleSnapshot(direct) && !isUsableGoogleSnapshot(fromSources)) {
    return sanitizeGooglePlacesForDisplay(direct);
  }
  if (isUsableGoogleSnapshot(fromSources) && !isUsableGoogleSnapshot(direct)) {
    return sanitizeGooglePlacesForDisplay(fromSources);
  }
  return sanitizeGooglePlacesForDisplay(merged);
}

export function resolvePublicScrapeFromRow(
  row: Record<string, unknown>
): PublicScrapeData | null {
  const direct = parsePublicScrapeData(row.public_scrape_data);
  if (direct) return direct;
  return publicScrapeFromVerificationSources(
    parseVerificationSources(row.verification_sources)
  );
}

/** True when the Google panel should show live stars/count. */
export function isDisplayableGoogleForUi(
  data: GooglePlacesData | null | undefined
): boolean {
  if (!data) return false;
  const status = data.status ?? 'ok';
  if (status !== 'ok') return false;
  return (
    (data.rating != null && data.rating > 0) ||
    (data.review_count != null && data.review_count > 0)
  );
}

/**
 * Resolve display Google from a mapped Company (after mapRow / merge).
 * Re-parses nested verification if a thin client payload dropped googleData.
 */
export function resolveGooglePlacesForCompany(
  company: Pick<Company, 'googleData' | 'overallRating' | 'reviewCount'> & {
    verificationSources?: unknown;
  }
): GooglePlacesData | null {
  const direct = sanitizeGooglePlacesForDisplay(company.googleData);
  if (isDisplayableGoogleForUi(direct)) return direct;

  if (company.verificationSources) {
    const fromVs = sanitizeGooglePlacesForDisplay(
      googleFromVerificationSources(parseVerificationSources(company.verificationSources))
    );
    if (isDisplayableGoogleForUi(fromVs)) return fromVs;
  }

  // Do NOT synthesize a Places snapshot from overallRating alone —
  // industry-reported volume can differ from Places and would be dishonest.
  return direct;
}

/**
 * Confirmed BBB scrape only — never promote bare companies.bbb_rating letter
 * grades without a matched bbb.org profile (strict accuracy rules).
 */
export function resolveConfirmedPublicScrapeForCompany(
  company: Pick<Company, 'publicScrapeData'>
): PublicScrapeData | null {
  const scrape = company.publicScrapeData ?? null;
  return hasBbbPublicScrapeData(scrape) ? scrape : null;
}

/**
 * BBB letter for directory/cards: only when scrape confirms a listing.
 * Otherwise NR (never show stale column grades from failed search scrapes).
 */
export function resolveDisplayBbbRating(
  publicScrapeData: PublicScrapeData | null | undefined,
  _columnBbbRating?: string | null
): Company['bbbRating'] {
  if (hasBbbPublicScrapeData(publicScrapeData) && publicScrapeData?.bbb_rating) {
    return publicScrapeData.bbb_rating as Company['bbbRating'];
  }
  return 'NR';
}

export function resolveDisplayBbbAccredited(
  publicScrapeData: PublicScrapeData | null | undefined,
  _columnAccredited?: boolean | null
): boolean {
  if (!hasBbbPublicScrapeData(publicScrapeData)) return false;
  return Boolean(publicScrapeData?.bbb_accredited);
}

/** Lightweight summary for directory cards (no snippets / raw). */
export type GooglePlacesSummary = {
  status: 'ok' | 'not_found' | 'error' | 'skipped';
  rating: number | null;
  reviewCount: number | null;
  placeId: string | null;
  mapsUrl: string | null;
};

export function toGooglePlacesSummary(
  data: GooglePlacesData | null | undefined
): GooglePlacesSummary | null {
  const g = sanitizeGooglePlacesForDisplay(data);
  if (!g || !isDisplayableGoogleForUi(g)) return null;
  const placeId = g.place_id?.trim() || null;
  return {
    status: 'ok',
    rating: g.rating ?? null,
    reviewCount: g.review_count ?? null,
    placeId,
    mapsUrl: placeId
      ? `https://www.google.com/maps/search/?api=1&query_place_id=${encodeURIComponent(placeId)}`
      : null,
  };
}
