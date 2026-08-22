/**
 * Internal match-precision for Ask-preloaded listings.
 * Tokens are for ranking/data attributes — not consumer-facing copy.
 */

import type { LocalMover } from '@/lib/local-movers/types';
import type { MoveAskSearchContext } from './allowlist';
import type { GeographyMatchClass, ResolvedGeography } from './geography';

export const LISTING_PRECISION_ORDER = [
  'exact_physical_zip',
  'exact_physical_city',
  'county_service_area',
  'physical_state',
  'state_service_area',
  'entity_type_match',
  'category_match',
] as const;

export type ListingPrecisionReason = (typeof LISTING_PRECISION_ORDER)[number];

export type ListingPrecision = {
  reasons: ListingPrecisionReason[];
  best: ListingPrecisionReason;
};

function norm(s: string | undefined): string {
  return (s || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '');
}

/**
 * Classify one listing against Ask context.
 * County-page presence is county_service_area, never exact city, unless HQ city actually matches.
 */
export function classifyListingAgainstHandoff(
  mover: Pick<LocalMover, 'city' | 'headquartersState' | 'isLocalOnly' | 'services' | 'entityType'>,
  ctx: MoveAskSearchContext,
  geo?: ResolvedGeography | null
): ListingPrecision {
  const reasons: ListingPrecisionReason[] = [];
  const hqState = (mover.headquartersState || '').toUpperCase();
  const queryState = (ctx.state || geo?.stateCode || '').toUpperCase();
  const queryCity = ctx.city || geo?.city;

  if (queryCity && norm(mover.city) === norm(queryCity) && (!queryState || hqState === queryState || !hqState)) {
    reasons.push('exact_physical_city');
  }

  if (geo?.countySlug || ctx.county) {
    reasons.push('county_service_area');
  } else if (queryState) {
    reasons.push('state_service_area');
  }

  if (queryState && hqState === queryState) {
    reasons.push('physical_state');
  }

  if (ctx.entityType) {
    reasons.push('entity_type_match');
  }
  if (ctx.category && (mover.services || []).some((s) => s.toLowerCase().includes(ctx.category!.replace(/_/g, ' ')))) {
    reasons.push('category_match');
  }

  const unique = [...new Set(reasons)];
  const best =
    LISTING_PRECISION_ORDER.find((r) => unique.includes(r)) ||
    (unique[0] as ListingPrecisionReason) ||
    'county_service_area';

  return { reasons: unique, best };
}

export function queryMatchClassIsCountyOnly(matchClass?: GeographyMatchClass): boolean {
  return (
    matchClass === 'county_service_area_match' ||
    matchClass === 'county_service_area_via_zip_resolution' ||
    matchClass === 'county_service_area'
  );
}
