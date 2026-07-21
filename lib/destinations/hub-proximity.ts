/**
 * Proximity helpers for local-mover placement on destination hubs.
 * Uses market lat/lng + county centroids (derived from hub primaries + overrides).
 */

import { markets } from '@/lib/destinations/markets';
import type { Market } from '@/lib/destinations/types';
import type { SelectedCounty } from '@/lib/suggestions/service-scope';

/** Default driving-distance radius for secondary hub exposure. */
export const NEARBY_HUB_MAX_MILES = 150;

/** Cap proximity counties per hub so lists stay focused. */
export const MAX_PROXIMITY_COUNTIES_PER_HUB = 12;

/** Cap secondary hubs per local onboarding. */
export const MAX_NEARBY_HUBS_PER_COMPANY = 8;

export type LatLng = { lat: number; lng: number };

/**
 * High-traffic counties not always listed as a market primaryCounties entry
 * (e.g. Orange County has no dedicated city hub yet).
 */
const COUNTY_CENTROID_OVERRIDES: Record<string, LatLng> = {
  // California
  'orange-ca': { lat: 33.7175, lng: -117.8311 },
  'los-angeles-ca': { lat: 34.0522, lng: -118.2437 },
  'riverside-ca': { lat: 33.9533, lng: -117.3962 },
  'san-bernardino-ca': { lat: 34.1083, lng: -117.2898 },
  'san-diego-ca': { lat: 32.7157, lng: -117.1611 },
  'ventura-ca': { lat: 34.3705, lng: -119.1391 },
  'santa-barbara-ca': { lat: 34.4208, lng: -119.6982 },
  'san-francisco-ca': { lat: 37.7749, lng: -122.4194 },
  'alameda-ca': { lat: 37.6017, lng: -121.7195 },
  'santa-clara-ca': { lat: 37.3541, lng: -121.9552 },
  'sacramento-ca': { lat: 38.5816, lng: -121.4944 },
  // Oregon
  'lane-or': { lat: 44.0505, lng: -123.0943 },
  'douglas-or': { lat: 43.2124, lng: -123.3417 },
  'multnomah-or': { lat: 45.5143, lng: -122.5863 },
  'washington-or': { lat: 45.547, lng: -123.09 },
  'clackamas-or': { lat: 45.1879, lng: -122.256 },
  'marion-or': { lat: 44.9034, lng: -122.781 },
  'linn-or': { lat: 44.4888, lng: -122.537 },
  // Washington
  'king-wa': { lat: 47.548, lng: -121.9836 },
  'pierce-wa': { lat: 47.0379, lng: -122.1015 },
  'snohomish-wa': { lat: 48.033, lng: -121.8339 },
  'clark-wa': { lat: 45.7466, lng: -122.5194 },
  // Texas
  'harris-tx': { lat: 29.7604, lng: -95.3698 },
  'dallas-tx': { lat: 32.7767, lng: -96.797 },
  'tarrant-tx': { lat: 32.7555, lng: -97.3308 },
  'travis-tx': { lat: 30.2672, lng: -97.7431 },
  'bexar-tx': { lat: 29.4241, lng: -98.4936 },
  // Florida
  'miami-dade-fl': { lat: 25.7617, lng: -80.1918 },
  'broward-fl': { lat: 26.1901, lng: -80.3659 },
  'orange-fl': { lat: 28.5383, lng: -81.3792 },
  'hillsborough-fl': { lat: 27.9904, lng: -82.3018 },
  // New York
  'new-york-ny': { lat: 40.7128, lng: -74.006 },
  'kings-ny': { lat: 40.6782, lng: -73.9442 },
  'queens-ny': { lat: 40.7282, lng: -73.7949 },
};

function cityHubs(): Market[] {
  return markets.filter((m) => !m.isClusterParent && Number.isFinite(m.lat) && Number.isFinite(m.lng));
}

/** Great-circle distance in miles (good enough for ~150mi hub radius). */
export function haversineMiles(a: LatLng, b: LatLng): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const R = 3958.8;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

function countyKeyFromParts(countySlug: string, stateCode: string): string {
  return `${countySlug.trim().toLowerCase()}-${stateCode.trim().toLowerCase()}`;
}

function selectedToCountyKey(c: SelectedCounty): string | null {
  // SelectedCounty uses stateSlug (e.g. california) not state code.
  // Find state code from markets / localStates.
  const stateSlug = c.stateSlug.trim().toLowerCase();
  const countySlug = c.countySlug.trim().toLowerCase();
  if (!stateSlug || !countySlug) return null;

  const market = markets.find(
    (m) =>
      !m.isClusterParent &&
      m.primaryCounties.some((k) => {
        const last = k.lastIndexOf('-');
        if (last <= 0) return false;
        return (
          k.slice(0, last) === countySlug &&
          // state slug match via cluster or state name
          true
        );
      })
  );
  // Prefer key format county-stateCode from primaryCounties
  for (const m of markets) {
    for (const key of m.primaryCounties) {
      const last = key.lastIndexOf('-');
      if (last <= 0) continue;
      if (key.slice(0, last) === countySlug) {
        // Verify state: market stateName slugify-ish
        const code = key.slice(last + 1);
        const stateFromCode = stateCodeToSlug(code);
        if (stateFromCode === stateSlug) return key;
      }
    }
  }

  // Fallback: map known state slugs to codes
  const code = stateSlugToCode(stateSlug);
  return code ? countyKeyFromParts(countySlug, code) : null;
}

function stateSlugToCode(stateSlug: string): string | null {
  const map: Record<string, string> = {
    alabama: 'al',
    alaska: 'ak',
    arizona: 'az',
    arkansas: 'ar',
    california: 'ca',
    colorado: 'co',
    connecticut: 'ct',
    delaware: 'de',
    florida: 'fl',
    georgia: 'ga',
    hawaii: 'hi',
    idaho: 'id',
    illinois: 'il',
    indiana: 'in',
    iowa: 'ia',
    kansas: 'ks',
    kentucky: 'ky',
    louisiana: 'la',
    maine: 'me',
    maryland: 'md',
    massachusetts: 'ma',
    michigan: 'mi',
    minnesota: 'mn',
    mississippi: 'ms',
    missouri: 'mo',
    montana: 'mt',
    nebraska: 'ne',
    nevada: 'nv',
    'new-hampshire': 'nh',
    'new-jersey': 'nj',
    'new-mexico': 'nm',
    'new-york': 'ny',
    'north-carolina': 'nc',
    'north-dakota': 'nd',
    ohio: 'oh',
    oklahoma: 'ok',
    oregon: 'or',
    pennsylvania: 'pa',
    'rhode-island': 'ri',
    'south-carolina': 'sc',
    'south-dakota': 'sd',
    tennessee: 'tn',
    texas: 'tx',
    utah: 'ut',
    vermont: 'vt',
    virginia: 'va',
    washington: 'wa',
    'west-virginia': 'wv',
    wisconsin: 'wi',
    wyoming: 'wy',
    'district-of-columbia': 'dc',
  };
  return map[stateSlug] ?? null;
}

function stateCodeToSlug(code: string): string | null {
  const c = code.toLowerCase();
  for (const [slug, sc] of Object.entries({
    alabama: 'al',
    alaska: 'ak',
    arizona: 'az',
    arkansas: 'ar',
    california: 'ca',
    colorado: 'co',
    connecticut: 'ct',
    delaware: 'de',
    florida: 'fl',
    georgia: 'ga',
    hawaii: 'hi',
    idaho: 'id',
    illinois: 'il',
    indiana: 'in',
    iowa: 'ia',
    kansas: 'ks',
    kentucky: 'ky',
    louisiana: 'la',
    maine: 'me',
    maryland: 'md',
    massachusetts: 'ma',
    michigan: 'mi',
    minnesota: 'mn',
    mississippi: 'ms',
    missouri: 'mo',
    montana: 'mt',
    nebraska: 'ne',
    nevada: 'nv',
    'new-hampshire': 'nh',
    'new-jersey': 'nj',
    'new-mexico': 'nm',
    'new-york': 'ny',
    'north-carolina': 'nc',
    'north-dakota': 'nd',
    ohio: 'oh',
    oklahoma: 'ok',
    oregon: 'or',
    pennsylvania: 'pa',
    'rhode-island': 'ri',
    'south-carolina': 'sc',
    'south-dakota': 'sd',
    tennessee: 'tn',
    texas: 'tx',
    utah: 'ut',
    vermont: 'vt',
    virginia: 'va',
    washington: 'wa',
    'west-virginia': 'wv',
    wisconsin: 'wi',
    wyoming: 'wy',
  })) {
    if (sc === c) return slug;
  }
  return null;
}

type Accum = { lat: number; lng: number; n: number };

let cachedCentroids: Map<string, LatLng> | null = null;

/** County key (e.g. orange-ca) → approximate centroid. */
export function getCountyCentroids(): Map<string, LatLng> {
  if (cachedCentroids) return cachedCentroids;

  const acc = new Map<string, Accum>();
  for (const market of cityHubs()) {
    for (const key of market.primaryCounties) {
      const k = key.trim().toLowerCase();
      if (!k) continue;
      const cur = acc.get(k) ?? { lat: 0, lng: 0, n: 0 };
      cur.lat += market.lat;
      cur.lng += market.lng;
      cur.n += 1;
      acc.set(k, cur);
    }
  }

  const out = new Map<string, LatLng>();
  for (const [key, v] of acc) {
    if (v.n > 0) out.set(key, { lat: v.lat / v.n, lng: v.lng / v.n });
  }
  // Overrides win (more accurate seats / metro centers).
  for (const [key, pt] of Object.entries(COUNTY_CENTROID_OVERRIDES)) {
    out.set(key, pt);
  }

  cachedCentroids = out;
  return out;
}

export function getCountyCentroid(countyKey: string): LatLng | null {
  return getCountyCentroids().get(countyKey.trim().toLowerCase()) ?? null;
}

/**
 * Counties within maxMiles of a hub (excluding the hub's own primary counties).
 * Same-state preferred; cross-border allowed when within range (e.g. Portland ↔ Clark WA).
 */
export function getProximityCountiesForHub(
  market: Market,
  maxMiles: number = NEARBY_HUB_MAX_MILES
): string[] {
  if (market.isClusterParent) return [];
  const hubPt = { lat: market.lat, lng: market.lng };
  const primary = new Set(market.primaryCounties.map((k) => k.toLowerCase()));
  const centroids = getCountyCentroids();

  const scored: Array<{ key: string; miles: number }> = [];
  for (const [key, pt] of centroids) {
    if (primary.has(key)) continue;
    const miles = haversineMiles(hubPt, pt);
    if (miles <= maxMiles) scored.push({ key, miles });
  }

  scored.sort((a, b) => a.miles - b.miles);
  return scored.slice(0, MAX_PROXIMITY_COUNTIES_PER_HUB).map((s) => s.key);
}

export type NearbyHubMatch = {
  market: Market;
  miles: number;
  /** True when hub already lists one of the selected counties as primary. */
  alreadyPrimary: boolean;
};

/**
 * Destination hubs within maxMiles of any selected county centroid.
 * Used after local onboarding to revalidate / soft-place on regional hubs.
 */
export function findNearbyHubsForCounties(
  counties: SelectedCounty[],
  maxMiles: number = NEARBY_HUB_MAX_MILES
): NearbyHubMatch[] {
  const countyKeys = counties
    .map((c) => selectedToCountyKey(c))
    .filter((k): k is string => Boolean(k));

  if (!countyKeys.length) return [];

  const points: LatLng[] = [];
  for (const key of countyKeys) {
    const pt = getCountyCentroid(key);
    if (pt) points.push(pt);
  }
  if (!points.length) return [];

  const selectedKeySet = new Set(countyKeys.map((k) => k.toLowerCase()));
  const bySlug = new Map<string, NearbyHubMatch>();

  for (const market of cityHubs()) {
    const hubPt = { lat: market.lat, lng: market.lng };
    let minMiles = Infinity;
    for (const pt of points) {
      const d = haversineMiles(pt, hubPt);
      if (d < minMiles) minMiles = d;
    }
    if (minMiles > maxMiles) continue;

    const alreadyPrimary = market.primaryCounties.some((k) =>
      selectedKeySet.has(k.toLowerCase())
    );

    const existing = bySlug.get(market.slug);
    if (!existing || minMiles < existing.miles) {
      bySlug.set(market.slug, {
        market,
        miles: minMiles,
        alreadyPrimary,
      });
    }
  }

  return [...bySlug.values()]
    .sort((a, b) => a.miles - b.miles)
    .slice(0, MAX_NEARBY_HUBS_PER_COMPANY);
}

/** Hubs that are secondary exposure (nearby but not already primary coverage). */
export function findSecondaryNearbyHubs(
  counties: SelectedCounty[],
  maxMiles: number = NEARBY_HUB_MAX_MILES
): NearbyHubMatch[] {
  return findNearbyHubsForCounties(counties, maxMiles).filter((h) => !h.alreadyPrimary);
}
