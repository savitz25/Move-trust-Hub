/**
 * Phase 1 — published locality rules (distance / adjacency, not same-state alone).
 *
 * Local HQ / “Local Mover” requires true in-market presence.
 * Distant same-state operators are Regional — never Local.
 */

import { markets } from '@/lib/destinations/markets';
import {
  getCountyCentroid,
  haversineMiles,
  type LatLng,
} from '@/lib/destinations/hub-proximity';
import type { LocalCounty, LocalMover } from '@/lib/local-movers/types';

/** Published threshold: HQ beyond this distance from county seat/centroid is not Local. */
export const LOCAL_HQ_MAX_MILES = 50;

/** Rural counties (sparse centroids) may use adjacency via same-county name match only. */
export const LOCALITY_POLICY = {
  localMaxMiles: LOCAL_HQ_MAX_MILES,
  /**
   * Same-state HQ alone never qualifies as local.
   * City/seat match or distance ≤ localMaxMiles is required (or explicit intrastate scope in-state).
   */
  sameStateAloneIsLocal: false as const,
  labels: {
    local: 'Local / Intrastate',
    regional: 'Regional',
    national: 'National / Long-distance',
  },
  emptyLocalCopy:
    'No local-HQ movers identified in this county. Carriers below serve it regionally.',
} as const;

export type LocalityClass = 'local' | 'regional' | 'national';

export type LocalityVerdict = {
  class: LocalityClass;
  /** Consumer-facing badge */
  label: string;
  /** Miles from HQ point to county centroid when known */
  distanceMiles: number | null;
  reason: string;
};

function normalizeCity(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\bst\.\b/g, 'saint')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function countyKey(county: LocalCounty): string {
  return `${county.slug.trim().toLowerCase()}-${county.stateCode.trim().toLowerCase()}`;
}

/** HQ city ≈ county seat or county name (same state required when HQ state known). */
export function hasInCountyNameMatch(mover: LocalMover, county: LocalCounty): boolean {
  const city = normalizeCity(mover.city ?? '');
  if (!city) return false;

  const hq = (mover.headquartersState ?? '').toUpperCase();
  const pageState = (county.stateCode ?? '').toUpperCase();
  if (hq && pageState && hq !== pageState) return false;

  const seat = normalizeCity(county.seat ?? '');
  const countyName = normalizeCity(county.name);

  if (seat && (city === seat || city.includes(seat) || seat.includes(city))) {
    return true;
  }
  // e.g. city "Atlantic City" / county "Atlantic"
  if (countyName.length >= 3 && city.includes(countyName)) {
    return true;
  }
  // e.g. county "Los Angeles" / city "LA" is too weak — skip abbreviations
  if (countyName.length >= 5 && countyName.includes(city) && city.length >= 5) {
    return true;
  }
  return false;
}

/**
 * Resolve an approximate HQ point from directory city + state using destination hubs
 * (when the HQ city matches a known market). Not a full geocoder — honest scarcity when unknown.
 */
export function resolveMoverHqPoint(mover: LocalMover): LatLng | null {
  const city = normalizeCity(mover.city ?? '');
  if (!city) return null;
  const hqState = (mover.headquartersState ?? '').toUpperCase();

  for (const market of markets) {
    if (market.isClusterParent) continue;
    if (!Number.isFinite(market.lat) || !Number.isFinite(market.lng)) continue;
    const marketCity = normalizeCity(market.displayName.split(',')[0] ?? market.displayName);
    if (!marketCity) continue;
    const marketState = (market.stateCode ?? '').toUpperCase();
    if (hqState && marketState && marketState !== hqState) continue;

    if (city === marketCity || city.includes(marketCity) || marketCity.includes(city)) {
      return { lat: market.lat, lng: market.lng };
    }
  }
  return null;
}

export function distanceHqToCountyMiles(
  mover: LocalMover,
  county: LocalCounty
): number | null {
  const countyPt = getCountyCentroid(countyKey(county));
  if (!countyPt) return null;
  const hqPt = resolveMoverHqPoint(mover);
  if (!hqPt) return null;
  return haversineMiles(hqPt, countyPt);
}

/**
 * Classify a mover for a county page.
 * Local = intrastate in-state OR in-county name match OR distance ≤ LOCAL_HQ_MAX_MILES.
 * Regional = same-state but not local.
 * National = out-of-state HQ (or unknown out-of-market long-distance).
 */
export function classifyMoverLocality(
  mover: LocalMover,
  county: LocalCounty
): LocalityVerdict {
  const hq = (mover.headquartersState ?? '').toUpperCase();
  const pageState = (county.stateCode ?? '').toUpperCase();
  const miles = distanceHqToCountyMiles(mover, county);

  // Explicit out-of-state HQ → never local
  if (hq && pageState && hq !== pageState) {
    return {
      class: 'national',
      label: LOCALITY_POLICY.labels.national,
      distanceMiles: miles,
      reason: 'out_of_state_hq',
    };
  }

  // Explicit intrastate scope: still not Local if HQ is measurably far from this county
  if (mover.isLocalOnly) {
    if (hq && pageState && hq !== pageState) {
      return {
        class: 'national',
        label: LOCALITY_POLICY.labels.national,
        distanceMiles: miles,
        reason: 'local_scope_but_out_of_state_hq',
      };
    }
    if (hasInCountyNameMatch(mover, county)) {
      return {
        class: 'local',
        label: LOCALITY_POLICY.labels.local,
        distanceMiles: miles,
        reason: 'intrastate_scope_with_in_county_hq',
      };
    }
    if (miles != null && miles <= LOCAL_HQ_MAX_MILES) {
      return {
        class: 'local',
        label: LOCALITY_POLICY.labels.local,
        distanceMiles: miles,
        reason: 'intrastate_scope_within_radius',
      };
    }
    if (miles != null && miles > LOCAL_HQ_MAX_MILES) {
      return {
        class: 'regional',
        label: LOCALITY_POLICY.labels.regional,
        distanceMiles: miles,
        reason: 'intrastate_scope_but_distant_hq',
      };
    }
    // No distance: allow local only when same-state (or unknown) AND HQ city present
    // without inventing proximity — prefer regional when city is empty.
    if (mover.city?.trim()) {
      return {
        class: 'regional',
        label: LOCALITY_POLICY.labels.regional,
        distanceMiles: miles,
        reason: 'intrastate_scope_unverified_proximity',
      };
    }
    return {
      class: 'local',
      label: LOCALITY_POLICY.labels.local,
      distanceMiles: miles,
      reason: 'intrastate_scope_without_distant_hq_signal',
    };
  }

  if (hasInCountyNameMatch(mover, county)) {
    return {
      class: 'local',
      label: LOCALITY_POLICY.labels.local,
      distanceMiles: miles,
      reason: 'hq_city_matches_county_seat_or_name',
    };
  }

  if (miles != null && miles <= LOCAL_HQ_MAX_MILES) {
    return {
      class: 'local',
      label: LOCALITY_POLICY.labels.local,
      distanceMiles: miles,
      reason: `hq_within_${LOCAL_HQ_MAX_MILES}_miles`,
    };
  }

  // Same-state but not local → Regional (never Local)
  if (hq && pageState && hq === pageState) {
    return {
      class: 'regional',
      label: LOCALITY_POLICY.labels.regional,
      distanceMiles: miles,
      reason:
        miles != null
          ? `same_state_hq_${Math.round(miles)}_mi_over_threshold`
          : 'same_state_hq_without_local_proximity_signal',
    };
  }

  // Unknown HQ state: do not invent local — regional if listed, else national
  return {
    class: 'regional',
    label: LOCALITY_POLICY.labels.regional,
    distanceMiles: miles,
    reason: 'insufficient_local_signals',
  };
}

/** True only for Local class (Phase 1 gate for “local mover” labeling). */
export function isTrueLocalMover(mover: LocalMover, county: LocalCounty): boolean {
  return classifyMoverLocality(mover, county).class === 'local';
}

export function localityBadgeLabel(mover: LocalMover, county: LocalCounty): string {
  return classifyMoverLocality(mover, county).label;
}
