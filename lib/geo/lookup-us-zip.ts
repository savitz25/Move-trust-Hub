import 'server-only';

import { isValidUsZip } from '@/lib/auto-transport/distance';
import { getStateSlugFromCode } from '@/lib/local-movers/county-seo';
import { localStates } from '@/lib/local-movers/states';

export type UsZipPlace = {
  zip: string;
  lat: number;
  lng: number;
  city: string;
  stateCode: string;
  stateName: string;
  stateSlug: string;
};

type ZippopotamResponse = {
  places?: Array<{
    latitude: string;
    longitude: string;
    'place name'?: string;
    'state abbreviation'?: string;
    state?: string;
  }>;
};

const memoryCache = new Map<string, UsZipPlace>();

const STATE_BY_CODE = new Map(
  localStates.map((s) => [s.code.toUpperCase(), s])
);

/**
 * Resolve a US ZIP to city/state via Zippopotam (cached in-memory + fetch revalidate).
 */
export async function lookupUsZip(zipRaw: string): Promise<UsZipPlace | null> {
  const zip = zipRaw.trim().slice(0, 5);
  if (!isValidUsZip(zip)) return null;

  const cached = memoryCache.get(zip);
  if (cached) return cached;

  const response = await fetch(`https://api.zippopotam.us/us/${zip}`, {
    next: { revalidate: 60 * 60 * 24 * 30 },
  });

  if (!response.ok) return null;

  const data = (await response.json()) as ZippopotamResponse;
  const place = data.places?.[0];
  if (!place?.latitude || !place.longitude) return null;

  const stateCode = (place['state abbreviation'] || '').toUpperCase();
  const fromLocal = STATE_BY_CODE.get(stateCode);
  const stateSlug =
    fromLocal?.slug || getStateSlugFromCode(stateCode) || stateCode.toLowerCase();
  const stateName = fromLocal?.name || place.state || stateCode;
  const city = place['place name'] || 'Unknown';

  const result: UsZipPlace = {
    zip,
    lat: Number(place.latitude),
    lng: Number(place.longitude),
    city,
    stateCode,
    stateName,
    stateSlug,
  };

  memoryCache.set(zip, result);
  return result;
}

export { isValidUsZip };
