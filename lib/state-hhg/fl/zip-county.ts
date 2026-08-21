/**
 * Florida ZIP / address → county resolution for FL-003.
 *
 * Uses the existing Census geocode cache and FL/WA county centroids.
 * No Google. No Zippopotam. City-only guesses are never COUNTY_VERIFIED.
 */

import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadFlWaCountyCentroids } from '@/lib/state-hhg/calibration/counties';
import { normalizeAddressLine } from '@/lib/state-hhg/normalize';

export type CountyConfidence =
  | 'COUNTY_VERIFIED'
  | 'COUNTY_REVIEW_REQUIRED'
  | 'COUNTY_UNRESOLVED';

export type CountyResolution = {
  county: string | null;
  countyFips: string | null;
  confidence: CountyConfidence;
  zip: string | null;
  evidence: string;
};

export type ZipCountyIndex = {
  builtFromCacheEntries: number;
  uniqueZips: number;
  uniqueCountyZips: number;
  multiCountyZips: number;
  addressHits: number;
  byZip: Record<string, { counties: string[]; fips: string[] }>;
  byNormalizedAddress: Record<string, { county: string; fips: string }>;
};

type CensusCacheHit = {
  status?: string;
  countyFips?: string | null;
  stateFips?: string | null;
  matchedAddress?: string | null;
};

type CensusCache = Record<string, CensusCacheHit>;

let cachedIndex: ZipCountyIndex | null = null;

function geocodeCachePath(): string {
  return resolve(process.cwd(), 'data/state-hhg/calibration/geocode-cache.json');
}

export function normalizeZip(raw: string | null | undefined): string | null {
  const digits = String(raw ?? '').replace(/\D/g, '');
  if (digits.length < 5) return null;
  return digits.slice(0, 5);
}

function zipFromText(value: string | null | undefined): string | null {
  const m = String(value ?? '').match(/\b(\d{5})(?:-\d{4})?\s*$/);
  return m ? m[1] : null;
}

function titleCounty(raw: string): string {
  return raw
    .replace(/\s+County$/i, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function fipsForFloridaCounty(county: string | null): string | null {
  if (!county) return null;
  const needle = titleCounty(county).toLowerCase();
  const hit = loadFlWaCountyCentroids().find(
    (row) =>
      row.stateFips === '12' && titleCounty(row.name).toLowerCase() === needle
  );
  return hit?.countyFips ?? null;
}

export function countyNameForFloridaFips(fips: string | null): string | null {
  if (!fips) return null;
  const hit = loadFlWaCountyCentroids().find((row) => row.countyFips === fips);
  return hit ? titleCounty(hit.name) : null;
}

function isFloridaHit(hit: CensusCacheHit | undefined): hit is CensusCacheHit {
  if (!hit) return false;
  const status = String(hit.status ?? '').toUpperCase();
  if (status !== 'MATCH' && status !== 'TIE') return false;
  const fips = String(hit.countyFips ?? '');
  const state = String(hit.stateFips ?? '');
  return fips.startsWith('12') || state === '12';
}

export function buildFloridaZipCountyIndex(cache?: CensusCache): ZipCountyIndex {
  const file =
    cache ??
    (existsSync(geocodeCachePath())
      ? (JSON.parse(readFileSync(geocodeCachePath(), 'utf8')) as CensusCache)
      : {});

  const zipBuckets = new Map<string, { counties: Set<string>; fips: Set<string> }>();
  const byNormalizedAddress: ZipCountyIndex['byNormalizedAddress'] = {};
  let used = 0;
  let addressHits = 0;

  for (const [key, hit] of Object.entries(file)) {
    if (!isFloridaHit(hit) || !hit.countyFips) continue;
    const county = countyNameForFloridaFips(hit.countyFips);
    if (!county) continue;
    used += 1;
    const zip = zipFromText(hit.matchedAddress) ?? zipFromText(key);
    if (zip) {
      const bucket = zipBuckets.get(zip) ?? {
        counties: new Set<string>(),
        fips: new Set<string>(),
      };
      bucket.counties.add(county);
      bucket.fips.add(hit.countyFips);
      zipBuckets.set(zip, bucket);
    }
    const addrKey = normalizeAddressLine(key);
    if (addrKey) {
      byNormalizedAddress[addrKey] = { county, fips: hit.countyFips };
      addressHits += 1;
    }
    if (hit.matchedAddress) {
      const matchedKey = normalizeAddressLine(hit.matchedAddress);
      if (matchedKey) {
        byNormalizedAddress[matchedKey] = { county, fips: hit.countyFips };
      }
    }
  }

  const byZip: ZipCountyIndex['byZip'] = {};
  let unique = 0;
  let multi = 0;
  for (const [zip, bucket] of zipBuckets.entries()) {
    const counties = [...bucket.counties].sort();
    const fips = [...bucket.fips].sort();
    byZip[zip] = { counties, fips };
    if (counties.length === 1) unique += 1;
    else multi += 1;
  }

  return {
    builtFromCacheEntries: used,
    uniqueZips: zipBuckets.size,
    uniqueCountyZips: unique,
    multiCountyZips: multi,
    addressHits,
    byZip,
    byNormalizedAddress,
  };
}

export function getFloridaZipCountyIndex(): ZipCountyIndex {
  if (!cachedIndex) cachedIndex = buildFloridaZipCountyIndex();
  return cachedIndex;
}

export function resolveFloridaCounty(input: {
  zip?: string | null;
  city?: string | null;
  street?: string | null;
  fullAddress?: string | null;
  index?: ZipCountyIndex;
}): CountyResolution {
  const index = input.index ?? getFloridaZipCountyIndex();
  const zip = normalizeZip(input.zip) ?? zipFromText(input.fullAddress ?? '');

  const addressCandidates = [
    input.fullAddress,
    [input.street, input.city, 'FL', zip].filter(Boolean).join(', '),
  ].filter((value): value is string => Boolean(value && value.trim()));

  for (const raw of addressCandidates) {
    const key = normalizeAddressLine(raw);
    if (!key) continue;
    const hit = index.byNormalizedAddress[key];
    if (hit) {
      return {
        county: hit.county,
        countyFips: hit.fips,
        confidence: 'COUNTY_VERIFIED',
        zip,
        evidence: `Census geocode cache MATCH for this Florida operating address → ${hit.county} County (${hit.fips}).`,
      };
    }
  }

  if (zip) {
    const mapped = index.byZip[zip];
    if (mapped && mapped.counties.length === 1) {
      const county = mapped.counties[0]!;
      return {
        county,
        countyFips: mapped.fips[0] ?? fipsForFloridaCounty(county),
        confidence: 'COUNTY_VERIFIED',
        zip,
        evidence: `Unique Florida ZIP ${zip} → ${county} County in Census geocode cache.`,
      };
    }
    if (mapped && mapped.counties.length > 1) {
      return {
        county: null,
        countyFips: null,
        confidence: 'COUNTY_REVIEW_REQUIRED',
        zip,
        evidence: `ZIP ${zip} spans ${mapped.counties.join(', ')} in Census geocode cache; no unique county.`,
      };
    }
    return {
      county: null,
      countyFips: null,
      confidence: 'COUNTY_UNRESOLVED',
      zip,
      evidence: `ZIP ${zip} is not present as a unique Florida mapping in the Census geocode cache.`,
    };
  }

  const city = String(input.city ?? '').trim();
  if (city) {
    return {
      county: null,
      countyFips: null,
      confidence: 'COUNTY_REVIEW_REQUIRED',
      zip: null,
      evidence: `City "${city}" without a unique ZIP is not enough to assign a Florida county.`,
    };
  }

  return {
    county: null,
    countyFips: null,
    confidence: 'COUNTY_UNRESOLVED',
    zip: null,
    evidence: 'No Florida ZIP or city available for county assignment.',
  };
}
