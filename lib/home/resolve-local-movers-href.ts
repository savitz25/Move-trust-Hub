import { lookupCityCountyAlias } from '@/lib/home/city-county-aliases';
import { getCountiesForState } from '@/lib/local-movers/geography/index';
import { getCountyPath, getStatePath } from '@/lib/local-movers/paths';
import type { LocalCounty } from '@/lib/local-movers/types';

/** Minimal place shape needed for routing (matches UsZipPlace fields used). */
export type RoutePlace = {
  zip: string;
  city: string;
  stateCode: string;
  stateSlug: string;
  stateName: string;
  lat?: number;
  lng?: number;
};

/** Census reverse-geocode hit (subset used for matching). */
export type CensusCountyBasename = {
  basename: string;
};

export type CountyMatchMethod =
  | 'census'
  | 'seat'
  | 'county-name'
  | 'alias'
  | 'fuzzy'
  | 'none';

export type ResolveLocalMoversResult = {
  href: string;
  label: string;
  county: LocalCounty | null;
  method: CountyMatchMethod;
};

function normalizeName(value: string): string {
  return value
    .toLowerCase()
    .replace(/\bst\.\b/g, 'saint')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function slugifyCountyName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function scoreCountyMatch(city: string, county: LocalCounty): number {
  const c = normalizeName(city);
  const name = normalizeName(county.name.replace(/ county$/i, ''));
  const seat = county.seat ? normalizeName(county.seat) : '';
  const slugAsWords = normalizeName(county.slug.replace(/-/g, ' '));

  // Prefer seat/city match over bare county-name match (Austin → Travis, not Austin County).
  if (seat && c === seat) return 120;
  if (c === name || c === slugAsWords) return 100;
  if (seat && (seat.includes(c) || c.includes(seat))) return 80;
  if (name.includes(c) || c.includes(name)) return 50;
  if (slugAsWords.includes(c) || c.includes(slugAsWords)) return 40;

  const cityTokens = new Set(c.split(' ').filter((t) => t.length > 2));
  let overlap = 0;
  for (const t of name.split(' ').filter((x) => x.length > 2)) {
    if (cityTokens.has(t)) overlap += 1;
  }
  if (seat) {
    for (const t of seat.split(' ').filter((x) => x.length > 2)) {
      if (cityTokens.has(t)) overlap += 2;
    }
  }
  return overlap * 12;
}

/**
 * Match Census reverse-geocode result to a county in our local-movers catalog.
 */
export function matchCensusToLocalCounty(
  census: CensusCountyBasename,
  stateSlug: string
): LocalCounty | null {
  const counties = getCountiesForState(stateSlug);
  if (!counties.length) return null;

  const base = normalizeName(census.basename);
  const baseSlug = slugifyCountyName(census.basename);

  const bySlug = counties.find((c) => c.slug === baseSlug);
  if (bySlug) return bySlug;

  const byName = counties.find(
    (c) => normalizeName(c.name.replace(/ county$/i, '')) === base
  );
  if (byName) return byName;

  let best: LocalCounty | null = null;
  let bestScore = 0;
  for (const county of counties) {
    const s = scoreCountyMatch(census.basename, county);
    if (s > bestScore) {
      bestScore = s;
      best = county;
    }
  }
  return bestScore >= 40 ? best : null;
}

/**
 * Resolve local-movers href for a pickup place.
 * Priority: Census coords → seat/name score → offline city alias → fuzzy → state.
 */
export function resolveLocalMoversHref(
  place: RoutePlace,
  censusCounty?: CensusCountyBasename | null
): ResolveLocalMoversResult {
  const statePath = getStatePath(place.stateSlug);
  const counties = getCountiesForState(place.stateSlug);

  if (!counties.length) {
    return {
      href: statePath,
      label: `${place.city}, ${place.stateCode}`,
      county: null,
      method: 'none',
    };
  }

  // 1) Official county from lat/lng (Boca Raton → Palm Beach, etc.)
  if (censusCounty) {
    const matched = matchCensusToLocalCounty(censusCounty, place.stateSlug);
    if (matched) {
      return {
        href: getCountyPath(place.stateSlug, matched.slug),
        label: `${matched.name}, ${place.stateCode}`,
        county: matched,
        method: 'census',
      };
    }
  }

  // 2) Best seat / name score among catalog counties
  let best: LocalCounty | null = null;
  let bestScore = 0;
  for (const county of counties) {
    const s = scoreCountyMatch(place.city, county);
    if (s > bestScore) {
      bestScore = s;
      best = county;
    }
  }

  if (best && bestScore >= 80) {
    return {
      href: getCountyPath(place.stateSlug, best.slug),
      label: `${best.name}, ${place.stateCode}`,
      county: best,
      method: bestScore >= 120 ? 'seat' : 'county-name',
    };
  }

  // 3) Offline city → county alias (major metros where city ≠ county)
  const aliasSlug = lookupCityCountyAlias(place.city, place.stateCode);
  if (aliasSlug) {
    const aliasCounty = counties.find((c) => c.slug === aliasSlug);
    if (aliasCounty) {
      return {
        href: getCountyPath(place.stateSlug, aliasCounty.slug),
        label: `${aliasCounty.name}, ${place.stateCode}`,
        county: aliasCounty,
        method: 'alias',
      };
    }
  }

  // 4) Weaker fuzzy match (legacy threshold)
  if (best && bestScore >= 40) {
    return {
      href: getCountyPath(place.stateSlug, best.slug),
      label: `${best.name}, ${place.stateCode}`,
      county: best,
      method: 'fuzzy',
    };
  }

  return {
    href: statePath,
    label: `${place.stateName} local movers`,
    county: null,
    method: 'none',
  };
}

/** Append from/to ZIP query params for future destination filtering. */
export function appendZipQuery(
  href: string,
  fromZip: string,
  toZip?: string | null
): string {
  const params = new URLSearchParams();
  params.set('fromZip', fromZip);
  if (toZip) params.set('toZip', toZip);
  const q = params.toString();
  return q ? `${href}?${q}` : href;
}
