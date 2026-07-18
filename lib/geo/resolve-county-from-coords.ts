import 'server-only';

/**
 * Resolve US county from lat/lng via the Census Bureau geocoder.
 * Used when ZIP place names (e.g. Boca Raton) don't match county names (Palm Beach).
 */

export type CensusCountyHit = {
  basename: string;
  name: string;
  stateFips: string;
  countyFips: string;
  geoid: string;
};

const memoryCache = new Map<string, CensusCountyHit | null>();

function cacheKey(lat: number, lng: number): string {
  // ~1.1km precision — enough for ZIP centroids, keeps cache hits high
  return `${lat.toFixed(3)},${lng.toFixed(3)}`;
}

type CensusResponse = {
  result?: {
    geographies?: {
      Counties?: Array<{
        BASENAME?: string;
        NAME?: string;
        STATE?: string;
        COUNTY?: string;
        GEOID?: string | number;
      }>;
    };
  };
};

/**
 * Reverse-geocode a coordinate to a US county (Census BASENAME, e.g. "Palm Beach").
 * Returns null on network/parse failure — callers must fall back.
 */
export async function resolveCountyFromCoords(
  lat: number,
  lng: number
): Promise<CensusCountyHit | null> {
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null;

  const key = cacheKey(lat, lng);
  if (memoryCache.has(key)) return memoryCache.get(key) ?? null;

  try {
    const url = new URL(
      'https://geocoding.geo.census.gov/geocoder/geographies/coordinates'
    );
    url.searchParams.set('x', String(lng));
    url.searchParams.set('y', String(lat));
    url.searchParams.set('benchmark', 'Public_AR_Current');
    url.searchParams.set('vintage', 'Current_Current');
    url.searchParams.set('format', 'json');

    const response = await fetch(url.toString(), {
      next: { revalidate: 60 * 60 * 24 * 30 },
      signal: AbortSignal.timeout(4_000),
    });

    if (!response.ok) {
      memoryCache.set(key, null);
      return null;
    }

    const data = (await response.json()) as CensusResponse;
    const county = data.result?.geographies?.Counties?.[0];
    if (!county?.BASENAME || !county.STATE) {
      memoryCache.set(key, null);
      return null;
    }

    const hit: CensusCountyHit = {
      basename: county.BASENAME,
      name: county.NAME || `${county.BASENAME} County`,
      stateFips: String(county.STATE).padStart(2, '0'),
      countyFips: String(county.COUNTY || '').padStart(3, '0'),
      geoid: String(county.GEOID ?? `${county.STATE}${county.COUNTY ?? ''}`),
    };

    memoryCache.set(key, hit);
    return hit;
  } catch {
    memoryCache.set(key, null);
    return null;
  }
}
