import 'server-only';

import {
  resolveLocalMoversHref,
  type ResolveLocalMoversResult,
} from '@/lib/home/resolve-local-movers-href';
import { getStateMeta } from '@/lib/geo/search-us-places';
import { getUsPlaceIndex, normalizePlaceQuery } from '@/lib/geo/us-place-index';
import type { PlaceResolveResult } from '@/lib/geo/us-place-types';
import { getCountyPath, getStatePath } from '@/lib/local-movers/paths';
import { getCountiesForState } from '@/lib/local-movers/geography/index';

type ZippopotamCityResponse = {
  places?: Array<{
    'place name'?: string;
    'post code'?: string;
    latitude?: string;
    longitude?: string;
    'state abbreviation'?: string;
  }>;
};

const zipByCityCache = new Map<
  string,
  { zip: string; lat: number; lng: number } | null
>();

/**
 * Look up a representative ZIP for a city via Zippopotam (best-effort).
 */
export async function lookupZipForCity(
  city: string,
  stateCode: string
): Promise<{ zip: string; lat: number; lng: number } | null> {
  const key = `${normalizePlaceQuery(city)}|${stateCode.toUpperCase()}`;
  if (zipByCityCache.has(key)) return zipByCityCache.get(key) ?? null;

  try {
    const pathCity = encodeURIComponent(city.trim());
    const url = `https://api.zippopotam.us/us/${stateCode.toLowerCase()}/${pathCity}`;
    const res = await fetch(url, {
      next: { revalidate: 60 * 60 * 24 * 30 },
      signal: AbortSignal.timeout(4_000),
    });
    if (!res.ok) {
      zipByCityCache.set(key, null);
      return null;
    }
    const data = (await res.json()) as ZippopotamCityResponse;
    const place = data.places?.[0];
    if (!place?.['post code'] || !place.latitude || !place.longitude) {
      zipByCityCache.set(key, null);
      return null;
    }
    const hit = {
      zip: place['post code'],
      lat: Number(place.latitude),
      lng: Number(place.longitude),
    };
    zipByCityCache.set(key, hit);
    return hit;
  } catch {
    zipByCityCache.set(key, null);
    return null;
  }
}

function indexedCounty(
  city: string,
  stateCode: string
): { countySlug: string; countyName: string | null } | null {
  const cityNorm = normalizePlaceQuery(city);
  const place = getUsPlaceIndex().find(
    (p) =>
      p.cityNorm === cityNorm && p.stateCode === stateCode.toUpperCase()
  );
  if (place?.countySlug) {
    return { countySlug: place.countySlug, countyName: place.countyName };
  }
  return null;
}

/**
 * Resolve confirmed City + State to a county movers page.
 */
export async function resolveCityToCounty(
  cityRaw: string,
  stateCodeRaw: string,
  options?: { zip?: string | null }
): Promise<PlaceResolveResult | null> {
  const state = getStateMeta(stateCodeRaw);
  if (!state) return null;

  const city = cityRaw.trim();
  if (!city) return null;

  const stateCode = state.code;
  let zip = options?.zip?.trim() || null;
  let lat: number | null = null;
  let lng: number | null = null;

  if (!zip) {
    const z = await lookupZipForCity(city, stateCode);
    if (z) {
      zip = z.zip;
      lat = z.lat;
      lng = z.lng;
    }
  }

  // Prefer pre-indexed county (aliases + seats)
  const indexed = indexedCounty(city, stateCode);
  if (indexed) {
    const counties = getCountiesForState(state.slug);
    const county = counties.find((c) => c.slug === indexed.countySlug);
    const moversHref = getCountyPath(state.slug, indexed.countySlug);
    return {
      city,
      stateCode,
      stateSlug: state.slug,
      stateName: state.name,
      label: `${city}, ${stateCode}`,
      countySlug: indexed.countySlug,
      countyName: county?.name ?? indexed.countyName,
      moversHref: zip ? `${moversHref}?fromZip=${zip}` : moversHref,
      zip,
      lat,
      lng,
      method: 'index',
    };
  }

  // Fall back to seat / alias / fuzzy matching used by ZIP routing
  const route: ResolveLocalMoversResult = resolveLocalMoversHref({
    zip: zip || '',
    city,
    stateCode,
    stateSlug: state.slug,
    stateName: state.name,
    lat: lat ?? undefined,
    lng: lng ?? undefined,
  });

  return {
    city,
    stateCode,
    stateSlug: state.slug,
    stateName: state.name,
    label: `${city}, ${stateCode}`,
    countySlug: route.county?.slug ?? null,
    countyName: route.county?.name ?? null,
    moversHref: zip
      ? `${route.href}${route.href.includes('?') ? '&' : '?'}fromZip=${zip}`
      : route.href,
    zip,
    lat,
    lng,
    method: route.method,
  };
}

export function stateOnlyHref(stateSlug: string): string {
  return getStatePath(stateSlug);
}
