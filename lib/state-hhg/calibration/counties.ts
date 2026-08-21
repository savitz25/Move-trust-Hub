/**
 * Census county geometry helpers for FL/WA calibration.
 * Uses local Census TIGER-derived FeatureCollection (data/us-counties-fips.json).
 * No Google. Does not write provider_county_coverage edges.
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';

export type CountyCentroid = {
  countyFips: string;
  stateFips: string;
  name: string;
  lat: number;
  lon: number;
  /** Approximate bounding-box diagonal miles for sliver detection */
  bboxSpanMiles: number;
};

type Ring = number[][];

function ringCentroid(ring: Ring): { lat: number; lon: number; area: number } {
  // Shoelace centroid on lon/lat (adequate for county-scale)
  let area = 0;
  let cx = 0;
  let cy = 0;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [x0, y0] = ring[j];
    const [x1, y1] = ring[i];
    const f = x0 * y1 - x1 * y0;
    area += f;
    cx += (x0 + x1) * f;
    cy += (y0 + y1) * f;
  }
  area *= 0.5;
  if (Math.abs(area) < 1e-12) {
    const lon = ring.reduce((s, p) => s + p[0], 0) / ring.length;
    const lat = ring.reduce((s, p) => s + p[1], 0) / ring.length;
    return { lat, lon, area: 0 };
  }
  return { lon: cx / (6 * area), lat: cy / (6 * area), area: Math.abs(area) };
}

function haversineMiles(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3958.7613;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(a)));
}

function extractRings(geometry: {
  type: string;
  coordinates: unknown;
}): Ring[] {
  if (geometry.type === 'Polygon') {
    return (geometry.coordinates as Ring[]).slice(0, 1);
  }
  if (geometry.type === 'MultiPolygon') {
    return (geometry.coordinates as Ring[][]).map((p) => p[0]);
  }
  return [];
}

const STATE_FIPS: Record<string, string> = { FL: '12', WA: '53' };

const CACHE = resolve(
  process.cwd(),
  'data/state-hhg/calibration/county-centroids-fl-wa.json'
);

export function loadFlWaCountyCentroids(force = false): CountyCentroid[] {
  if (!force && existsSync(CACHE)) {
    return JSON.parse(readFileSync(CACHE, 'utf8')) as CountyCentroid[];
  }
  const rawPath = resolve(process.cwd(), 'data/us-counties-fips.json');
  const fc = JSON.parse(readFileSync(rawPath, 'utf8')) as {
    features: Array<{
      properties: { STATE: string; COUNTY: string; NAME: string };
      geometry: { type: string; coordinates: unknown };
    }>;
  };
  const wanted = new Set(Object.values(STATE_FIPS));
  const out: CountyCentroid[] = [];
  for (const f of fc.features) {
    if (!wanted.has(f.properties.STATE)) continue;
    const rings = extractRings(f.geometry);
    if (!rings.length) continue;
    // Pick largest ring by area
    let best = ringCentroid(rings[0]);
    for (let i = 1; i < rings.length; i++) {
      const c = ringCentroid(rings[i]);
      if (c.area > best.area) best = c;
    }
    let minLon = Infinity,
      minLat = Infinity,
      maxLon = -Infinity,
      maxLat = -Infinity;
    for (const ring of rings) {
      for (const [lon, lat] of ring) {
        minLon = Math.min(minLon, lon);
        maxLon = Math.max(maxLon, lon);
        minLat = Math.min(minLat, lat);
        maxLat = Math.max(maxLat, lat);
      }
    }
    const countyFips = `${f.properties.STATE}${f.properties.COUNTY}`;
    out.push({
      countyFips,
      stateFips: f.properties.STATE,
      name: f.properties.NAME,
      lat: best.lat,
      lon: best.lon,
      bboxSpanMiles: haversineMiles(minLat, minLon, maxLat, maxLon),
    });
  }
  mkdirSync(resolve(process.cwd(), 'data/state-hhg/calibration'), {
    recursive: true,
  });
  writeFileSync(CACHE, JSON.stringify(out));
  return out;
}

export function countiesForState(
  centroids: readonly CountyCentroid[],
  stateCode: 'FL' | 'WA'
): CountyCentroid[] {
  const fips = STATE_FIPS[stateCode];
  return centroids.filter((c) => c.stateFips === fips);
}

export { haversineMiles };

/** County centroid inside radius (primary intersection rule). */
export function countiesWithinRadius(
  originLat: number,
  originLon: number,
  radiusMiles: number,
  counties: readonly CountyCentroid[]
): string[] {
  return counties
    .filter(
      (c) => haversineMiles(originLat, originLon, c.lat, c.lon) <= radiusMiles
    )
    .map((c) => c.countyFips)
    .sort();
}

/** Slug → FIPS map for FL/WA using geography names. */
export function buildCountySlugToFips(
  centroids: readonly CountyCentroid[]
): Map<string, string> {
  const map = new Map<string, string>();
  for (const c of centroids) {
    const slug = c.name
      .toLowerCase()
      .replace(/\./g, '')
      .replace(/'/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    const state = c.stateFips === '12' ? 'florida' : 'washington';
    map.set(`${state}:${slug}`, c.countyFips);
    // common aliases
    if (slug === 'de-soto') map.set(`${state}:desoto`, c.countyFips);
    if (slug === 'st-johns') map.set(`${state}:saint-johns`, c.countyFips);
    if (slug === 'st-lucie') map.set(`${state}:saint-lucie`, c.countyFips);
  }
  return map;
}
