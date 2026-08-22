/**
 * ASK-SEARCH-006A.2 — locked geography precision + match-reason contract.
 *
 * Query-readiness / ranking signals only. Does not mutate NetworkDiscoveryEntity
 * records and must not change the entity content fingerprint.
 *
 * No geocoding, Places, or invented city/ZIP service rows.
 */

import type { DiscoveryServiceArea, NetworkDiscoveryEntity } from './types';

/** Ordered precision for Ask ranking (highest first). */
export const GEOGRAPHY_PRECISION_ORDER = [
  'explicit_service_zip',
  'explicit_service_city',
  'physical_locality',
  'county_service_area',
  'state_service_area',
  'physical_state',
] as const;

export type GeographyPrecisionLevel = (typeof GEOGRAPHY_PRECISION_ORDER)[number];

export const MATCH_REASON = {
  exact_physical_city: 'exact_physical_city',
  exact_physical_zip: 'exact_physical_zip',
  explicit_service_city: 'explicit_service_city',
  explicit_service_zip: 'explicit_service_zip',
  county_service_area: 'county_service_area',
  state_service_area: 'state_service_area',
  physical_state: 'physical_state',
  entity_type_match: 'entity_type_match',
  category_match: 'category_match',
  /** City query satisfied by source-backed county coverage (not exact city). */
  county_service_area_match: 'county_service_area_match',
  /** ZIP query resolved to county coverage (not explicit service ZIP). */
  county_service_area_via_zip_resolution: 'county_service_area_via_zip_resolution',
} as const;

export type MatchReason = (typeof MATCH_REASON)[keyof typeof MATCH_REASON];

export type QueryMatch = {
  network_entity_id: string;
  display_name: string;
  entity_type: string;
  reasons: MatchReason[];
  match_class: MatchReason;
};

export const CITY_IN_COUNTY = {
  keansburg_nj: {
    city: 'Keansburg',
    state: 'NJ',
    countyNeedle: 'Monmouth',
    zip: '07734',
  },
} as const;

function norm(s: string | undefined): string {
  return (s || '').trim().toLowerCase();
}

function cityAreas(e: NetworkDiscoveryEntity): Extract<DiscoveryServiceArea, { kind: 'city' }>[] {
  return (e.service_areas || []).filter((a): a is Extract<DiscoveryServiceArea, { kind: 'city' }> => a.kind === 'city');
}

function zipAreas(e: NetworkDiscoveryEntity): Extract<DiscoveryServiceArea, { kind: 'zip' }>[] {
  return (e.service_areas || []).filter((a): a is Extract<DiscoveryServiceArea, { kind: 'zip' }> => a.kind === 'zip');
}

/** HQ city copied onto service_areas as a locality hint is NOT explicit service-city coverage. */
export function isExplicitServiceCityArea(
  e: NetworkDiscoveryEntity,
  area: Extract<DiscoveryServiceArea, { kind: 'city' }>
): boolean {
  const hqCity = norm(e.city);
  const hqState = (e.state || '').toUpperCase();
  if (hqCity && hqState && norm(area.city) === hqCity && area.state === hqState) {
    return false;
  }
  return true;
}

export function hasExactPhysicalCity(e: NetworkDiscoveryEntity, city: string, state: string): boolean {
  return norm(e.city) === norm(city) && (e.state || '').toUpperCase() === state.toUpperCase();
}

export function hasExactPhysicalZip(e: NetworkDiscoveryEntity, zip: string): boolean {
  return (e.zip || '') === zip;
}

export function hasExplicitServiceCity(e: NetworkDiscoveryEntity, city: string, state: string): boolean {
  return cityAreas(e).some(
    (a) =>
      isExplicitServiceCityArea(e, a) &&
      norm(a.city) === norm(city) &&
      a.state === state.toUpperCase()
  );
}

export function hasExplicitServiceZip(e: NetworkDiscoveryEntity, zip: string): boolean {
  return zipAreas(e).some((a) => a.zip === zip);
}

export function hasCountyServiceArea(e: NetworkDiscoveryEntity, state: string, countyNeedle: string): boolean {
  const needle = countyNeedle.toLowerCase();
  return (e.service_areas || []).some(
    (a) =>
      a.kind === 'county' &&
      a.state === state.toUpperCase() &&
      (needle === '' || a.county.toLowerCase().includes(needle))
  );
}

export function hasStateServiceArea(e: NetworkDiscoveryEntity, state: string): boolean {
  return (e.service_areas || []).some((a) => a.kind === 'state' && a.state === state.toUpperCase());
}

export function hasPhysicalState(e: NetworkDiscoveryEntity, state: string): boolean {
  return (e.state || '').toUpperCase() === state.toUpperCase();
}

export function hasPhysicalLocalityInState(e: NetworkDiscoveryEntity, state: string): boolean {
  return hasPhysicalState(e, state) && Boolean(e.city);
}

export function matchRow(
  e: NetworkDiscoveryEntity,
  reasons: MatchReason[],
  match_class: MatchReason
): QueryMatch {
  return {
    network_entity_id: e.network_entity_id,
    display_name: e.display_name,
    entity_type: e.entity_type,
    reasons: [...new Set(reasons)],
    match_class,
  };
}

export function buildGeographyPrecisionContract(entities: NetworkDiscoveryEntity[]) {
  let explicit_service_zip = 0;
  let explicit_service_city = 0;
  let exact_physical_city = 0;
  let exact_physical_zip = 0;
  let county_service_area = 0;
  let state_service_area = 0;
  let physical_state = 0;
  let nationwide = 0;
  let interstate = 0;

  for (const e of entities) {
    if (e.city && e.state) exact_physical_city++;
    if (e.zip) exact_physical_zip++;
    if (e.state) physical_state++;
    if ((e.service_areas || []).some((a) => a.kind === 'county')) county_service_area++;
    if ((e.service_areas || []).some((a) => a.kind === 'state')) state_service_area++;
    if (zipAreas(e).length) explicit_service_zip++;
    if (cityAreas(e).some((a) => isExplicitServiceCityArea(e, a))) explicit_service_city++;
    if ((e.service_areas || []).some((a) => a.kind === 'nationwide')) nationwide++;
    if ((e.service_areas || []).some((a) => a.kind === 'interstate')) interstate++;
  }

  const unavailable: Record<string, string> = {};
  if (explicit_service_zip === 0) {
    unavailable.explicit_service_zip =
      'Move offline catalog has no ZIP-level service graph. HQ ZIP is never copied to service ZIP.';
  }
  if (explicit_service_city === 0) {
    unavailable.explicit_service_city =
      'No structured destination/service-city assignments distinct from physical HQ. Optional kind=city rows are HQ locality hints, not verified service-city coverage.';
  }

  return {
    ordered_levels: GEOGRAPHY_PRECISION_ORDER.map((id, i) => ({
      rank: i + 1,
      id,
      available_in_pilot:
        id === 'explicit_service_zip'
          ? explicit_service_zip > 0
          : id === 'explicit_service_city'
            ? explicit_service_city > 0
            : id === 'physical_locality'
              ? exact_physical_city + exact_physical_zip > 0
              : id === 'county_service_area'
                ? county_service_area > 0
                : id === 'state_service_area'
                  ? state_service_area > 0
                  : physical_state > 0,
    })),
    match_reasons: Object.values(MATCH_REASON),
    ranking_hint:
      'Ask should rank exact/precise local coverage above county coverage above broad state/national coverage. Source-backed broad van-line county assignments remain discovery-eligible.',
    county_to_city_rule:
      'A provider with source-backed county service coverage MAY participate in a search for a city known to be inside that county. Classify as county_service_area_match, never exact_city_match. Do not emit fabricated city service rows.',
    zip_to_county_rule:
      'Ask may resolve a ZIP to city/county (e.g. 07734 → Keansburg → Monmouth County, NJ) and use source-backed county coverage. Classify as county_service_area_via_zip_resolution. Do not publish a fake service ZIP.',
    broad_coverage_rule:
      'Nationwide / interstate / multi-state county assignments stay eligible. Downstream Ask ranking must treat them as lower precision than exact local or single-county evidence.',
    available_counts: {
      explicit_service_zip,
      explicit_service_city,
      exact_physical_city,
      exact_physical_zip,
      county_service_area,
      state_service_area,
      physical_state,
      nationwide,
      interstate,
    },
    unavailable,
  };
}
