/**
 * Resolve attributable operating locations for calibration cohort.
 * Priority: regulator physical → canonical operating → other.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { geocodeOneLineAddress } from '@/lib/state-hhg/calibration/census-geocoder';
import type {
  CalibrationCohortMember,
  OperatingLocationRecord,
} from '@/lib/state-hhg/calibration/types';
import { normalizeAddressLine } from '@/lib/state-hhg/normalize';

const CACHE_PATH = resolve(
  process.cwd(),
  'data/state-hhg/calibration/geocode-cache.json'
);

type GeocodeCache = Record<string, Awaited<ReturnType<typeof geocodeOneLineAddress>>>;

function loadCache(): GeocodeCache {
  if (!existsSync(CACHE_PATH)) return {};
  return JSON.parse(readFileSync(CACHE_PATH, 'utf8')) as GeocodeCache;
}

function saveCache(cache: GeocodeCache) {
  mkdirSync(resolve(process.cwd(), 'data/state-hhg/calibration'), {
    recursive: true,
  });
  writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
}

function buildAddress(m: CalibrationCohortMember): {
  address: string;
  addressType: OperatingLocationRecord['addressType'];
  source: string;
  city: string | null;
  postalCode: string | null;
} | null {
  if (m.stagingPhysicalAddress) {
    const parts = [
      m.stagingPhysicalAddress,
      m.stagingCity,
      m.stateCode,
      m.stagingPostalCode,
    ]
      .filter(Boolean)
      .join(', ');
    return {
      address: parts,
      addressType: 'regulator_physical',
      source:
        m.stateCode === 'FL' ? 'fdacs_registry_staging' : 'wa_utc_registry_staging',
      city: m.stagingCity,
      postalCode: m.stagingPostalCode,
    };
  }
  if (m.canonicalPhysicalAddress) {
    return {
      address: m.canonicalPhysicalAddress,
      addressType: 'canonical_operating',
      source: 'companies.physical_address',
      city: null,
      postalCode: null,
    };
  }
  return null;
}

export async function resolveOperatingLocations(
  members: readonly CalibrationCohortMember[],
  options?: { delayMs?: number }
): Promise<OperatingLocationRecord[]> {
  const cache = loadCache();
  const delayMs = options?.delayMs ?? 200;
  const out: OperatingLocationRecord[] = [];
  const retrievedAt = new Date().toISOString();

  for (const m of members) {
    const built = buildAddress(m);
    if (!built) {
      out.push({
        providerId: m.providerId,
        stateCode: m.stateCode,
        observedAddress: '',
        addressType: 'other_official',
        source: 'none',
        retrievedAt,
        normalizedAddress: null,
        city: null,
        postalCode: null,
        geocodeStatus: 'GEOCODE_UNRESOLVED',
        lat: null,
        lon: null,
        countyFips: null,
        geocodeSource: null,
        geocodeConfidence: null,
      });
      continue;
    }

    const key = built.address.toUpperCase();
    let geo = cache[key];
    if (!geo) {
      geo = await geocodeOneLineAddress(built.address, { delayMs });
      cache[key] = geo;
      saveCache(cache);
    }

    // Reject geocodes that land outside authority state FIPS
    const expectedState = m.stateCode === 'FL' ? '12' : '53';
    let status = geo.status;
    let lat = geo.lat;
    let lon = geo.lon;
    let countyFips = geo.countyFips;
    if (
      (status === 'MATCH' || status === 'TIE') &&
      geo.stateFips &&
      geo.stateFips !== expectedState
    ) {
      status = 'GEOCODE_UNRESOLVED';
      lat = null;
      lon = null;
      countyFips = null;
    }

    out.push({
      providerId: m.providerId,
      stateCode: m.stateCode,
      observedAddress: built.address,
      addressType: built.addressType,
      source: built.source,
      retrievedAt,
      normalizedAddress: normalizeAddressLine(built.address),
      city: built.city,
      postalCode: built.postalCode,
      geocodeStatus: status,
      lat,
      lon,
      countyFips,
      geocodeSource: geo.geocodeSource,
      geocodeConfidence: geo.confidence,
    });
  }
  return out;
}

export function summarizeOperatingLocations(
  rows: readonly OperatingLocationRecord[]
) {
  const valid = rows.filter(
    (r) =>
      (r.geocodeStatus === 'MATCH' || r.geocodeStatus === 'TIE') &&
      r.lat != null &&
      r.lon != null
  );
  return {
    total: rows.length,
    valid: valid.length,
    unresolved: rows.length - valid.length,
    geocodeSource: 'census_geocoder_onelineaddress',
  };
}
