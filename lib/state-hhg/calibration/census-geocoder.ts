/**
 * US Census Geocoder client — NO Google.
 * Docs: https://geocoding.geo.census.gov/geocoder/Geocoding_Services_API.html
 */
import type { GeocodeStatus } from '@/lib/state-hhg/calibration/types';

export type CensusGeocodeResult = {
  status: GeocodeStatus;
  lat: number | null;
  lon: number | null;
  countyFips: string | null;
  stateFips: string | null;
  matchedAddress: string | null;
  geocodeSource: 'census_geocoder_onelineaddress';
  confidence: number | null;
  rawMatchType: string | null;
};

const CENSUS_URL =
  'https://geocoding.geo.census.gov/geocoder/geographies/onelineaddress';

const UA = 'MoveTrustHub-Task011C1/1.0 (census-geocoder; no Google Places)';

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function geocodeOneLineAddress(
  address: string,
  options?: { benchmark?: string; vintage?: string; delayMs?: number }
): Promise<CensusGeocodeResult> {
  const cleaned = address.replace(/\s+/g, ' ').trim();
  if (!cleaned) {
    return {
      status: 'GEOCODE_UNRESOLVED',
      lat: null,
      lon: null,
      countyFips: null,
      stateFips: null,
      matchedAddress: null,
      geocodeSource: 'census_geocoder_onelineaddress',
      confidence: null,
      rawMatchType: null,
    };
  }

  const params = new URLSearchParams({
    address: cleaned,
    benchmark: options?.benchmark ?? 'Public_AR_Current',
    vintage: options?.vintage ?? 'Current_Current',
    format: 'json',
  });

  if (options?.delayMs) await sleep(options.delayMs);

  const res = await fetch(`${CENSUS_URL}?${params.toString()}`, {
    headers: { 'User-Agent': UA, Accept: 'application/json' },
  });
  if (!res.ok) {
    return {
      status: 'GEOCODE_UNRESOLVED',
      lat: null,
      lon: null,
      countyFips: null,
      stateFips: null,
      matchedAddress: null,
      geocodeSource: 'census_geocoder_onelineaddress',
      confidence: null,
      rawMatchType: `http_${res.status}`,
    };
  }

  const body = (await res.json()) as {
    result?: {
      addressMatches?: Array<{
        matchedAddress?: string;
        coordinates?: { x?: number; y?: number };
        tigerLine?: { side?: string };
        addressComponents?: Record<string, string>;
        geographies?: {
          Counties?: Array<{
            GEOID?: string;
            COUNTY?: string;
            STATE?: string;
            NAME?: string;
          }>;
          'Census Tracts'?: Array<{ GEOID?: string; STATE?: string; COUNTY?: string }>;
        };
      }>;
    };
  };

  const matches = body.result?.addressMatches ?? [];
  if (!matches.length) {
    return {
      status: 'NO_MATCH',
      lat: null,
      lon: null,
      countyFips: null,
      stateFips: null,
      matchedAddress: null,
      geocodeSource: 'census_geocoder_onelineaddress',
      confidence: 0,
      rawMatchType: 'no_match',
    };
  }

  if (matches.length > 1) {
    // Prefer first but mark TIE when multiple
  }

  const hit = matches[0];
  const lon = hit.coordinates?.x ?? null;
  const lat = hit.coordinates?.y ?? null;
  const county =
    hit.geographies?.Counties?.[0] ??
    (hit.geographies?.['Census Tracts']?.[0]
      ? {
          GEOID:
            `${hit.geographies['Census Tracts'][0].STATE ?? ''}${hit.geographies['Census Tracts'][0].COUNTY ?? ''}` ||
            undefined,
          STATE: hit.geographies['Census Tracts'][0].STATE,
          COUNTY: hit.geographies['Census Tracts'][0].COUNTY,
        }
      : undefined);

  const stateFips = county?.STATE ?? null;
  const countyFips =
    county?.GEOID && String(county.GEOID).length >= 5
      ? String(county.GEOID).slice(0, 5)
      : stateFips && county?.COUNTY
        ? `${stateFips}${String(county.COUNTY).padStart(3, '0')}`
        : null;

  return {
    status: matches.length > 1 ? 'TIE' : 'MATCH',
    lat,
    lon,
    countyFips,
    stateFips,
    matchedAddress: hit.matchedAddress ?? null,
    geocodeSource: 'census_geocoder_onelineaddress',
    confidence: matches.length > 1 ? 0.7 : 0.95,
    rawMatchType: matches.length > 1 ? 'tie' : 'match',
  };
}
