import { countyAliasesForCity } from '@/lib/destinations/city-county-aliases';
import {
  extractAddressCityCandidates,
  normalizeHeadquartersInput,
  pickPrimaryCity,
  type HeadquartersResolutionInput,
} from '@/lib/destinations/headquarters-input';
import { markets } from '@/lib/destinations/markets';
import { parseCountyKey } from '@/lib/destinations/county-keys';
import { normalizePlace, parseHeadquarters } from '@/lib/fmcsa/refresh/parse-headquarters';
import { getCountiesForState } from '@/lib/local-movers/geography/index';
import { localStates } from '@/lib/local-movers/states';

export type ResolvedDestinationAssignment = {
  stateSlug: string;
  countySlug: string;
  countyKey: string;
  marketSlugs: string[];
  matchedCity: string;
};

export type DestinationResolutionDebug = {
  effectiveAddress: string | null;
  source: string;
  parsedCity: string | null;
  parsedState: string | null;
  primaryCity: string | null;
  detectedCities: string[];
  assignments: ResolvedDestinationAssignment[];
};

function stateSlugFromCode(stateCode: string | null): string | null {
  if (!stateCode) return null;
  return localStates.find((s) => s.code === stateCode)?.slug ?? null;
}

function marketCitiesForState(stateCode: string): Array<{ displayName: string; norm: string }> {
  return markets
    .filter((market) => market.stateCode === stateCode && !market.isClusterParent)
    .map((market) => ({
      displayName: market.displayName,
      norm: normalizePlace(market.displayName),
    }));
}

function detectMarketCitiesInText(stateCode: string, text: string): string[] {
  const haystack = normalizePlace(text);
  if (!haystack) return [];

  const found: string[] = [];
  for (const entry of marketCitiesForState(stateCode)) {
    if (entry.norm.length < 4) continue;
    if (haystack.includes(entry.norm)) found.push(entry.displayName);
  }

  return [...new Set(found)];
}

function countiesForCity(stateSlug: string, city: string | null): string[] {
  if (!city) return [];
  const normalizedCity = normalizePlace(city);
  if (!normalizedCity) return [];

  const fromSeatOrName = getCountiesForState(stateSlug)
    .filter((county) => {
      const seat = county.seat ? normalizePlace(county.seat) : '';
      const countyName = normalizePlace(county.name);
      return (
        seat === normalizedCity ||
        seat.includes(normalizedCity) ||
        normalizedCity.includes(seat) ||
        countyName.includes(normalizedCity) ||
        normalizedCity.includes(countyName)
      );
    })
    .map((county) => county.slug);

  const fromAliases = countyAliasesForCity(stateSlug, city);
  return [...new Set([...fromSeatOrName, ...fromAliases])];
}

function marketSlugsForCountyKey(countyKey: string, city: string | null, stateCode: string): string[] {
  const fromCounty = markets
    .filter((market) => market.primaryCounties.includes(countyKey))
    .map((market) => market.slug);

  const cityNorm = city ? normalizePlace(city) : '';
  const fromCity =
    cityNorm.length > 0
      ? markets
          .filter(
            (market) =>
              market.stateCode === stateCode &&
              !market.isClusterParent &&
              normalizePlace(market.displayName) === cityNorm
          )
          .map((market) => market.slug)
      : [];

  return [...new Set([...fromCity, ...fromCounty])];
}

function assignmentForCity(
  stateSlug: string,
  stateCode: string,
  city: string
): ResolvedDestinationAssignment[] {
  const assignments: ResolvedDestinationAssignment[] = [];
  const countySlugs = countiesForCity(stateSlug, city);

  for (const countySlug of countySlugs) {
    const countyKey = `${countySlug}-${stateCode.toLowerCase()}`;
    assignments.push({
      stateSlug,
      countySlug,
      countyKey,
      marketSlugs: marketSlugsForCountyKey(countyKey, city, stateCode),
      matchedCity: city,
    });
  }

  if (assignments.length === 0) {
    const cityNorm = normalizePlace(city);
    const cityMarkets = markets.filter(
      (market) =>
        market.stateCode === stateCode &&
        !market.isClusterParent &&
        normalizePlace(market.displayName) === cityNorm
    );

    for (const market of cityMarkets) {
      const parsed = parseCountyKey(market.primaryCounties[0] ?? '');
      if (!parsed) continue;
      assignments.push({
        stateSlug: parsed.stateSlug,
        countySlug: parsed.countySlug,
        countyKey: market.primaryCounties[0]!,
        marketSlugs: [market.slug],
        matchedCity: city,
      });
    }
  }

  return assignments;
}

/**
 * Resolve local-movers county + moving-to market targets from headquarters / FMCSA address.
 */
export function resolveDestinationsFromHeadquarters(
  input: string | HeadquartersResolutionInput | null | undefined
): ResolvedDestinationAssignment[] {
  return resolveDestinationsWithDebug(input).assignments;
}

export function resolveDestinationsWithDebug(
  input: string | HeadquartersResolutionInput | null | undefined
): DestinationResolutionDebug {
  const resolutionInput: HeadquartersResolutionInput =
    typeof input === 'string' ? { headquarters: input } : input ?? {};

  const normalized = normalizeHeadquartersInput(resolutionInput);
  const { city: parsedCity, state } = normalized.parsed;
  const stateSlug = stateSlugFromCode(state);

  if (!stateSlug || !state) {
    return {
      effectiveAddress: normalized.effectiveAddress,
      source: normalized.source,
      parsedCity,
      parsedState: state,
      primaryCity: null,
      detectedCities: [],
      assignments: [],
    };
  }

  const addressCandidates = extractAddressCityCandidates(normalized.effectiveAddress);
  const marketDetected = detectMarketCitiesInText(state, normalized.effectiveAddress ?? '');
  const detectedCities = [...new Set([...addressCandidates, ...marketDetected])];
  const primaryCity = pickPrimaryCity(parsedCity, detectedCities);

  const citiesToResolve = [
    primaryCity,
    ...detectedCities.filter((c) => normalizePlace(c) !== normalizePlace(primaryCity ?? '')),
  ].filter((c): c is string => Boolean(c?.trim()));

  const uniqueCities = [...new Set(citiesToResolve.map((c) => c.trim()))];
  const assignments: ResolvedDestinationAssignment[] = [];

  for (const city of uniqueCities) {
    assignments.push(...assignmentForCity(stateSlug, state, city));
  }

  const seen = new Set<string>();
  const deduped = assignments.filter((entry) => {
    const key = `${entry.stateSlug}/${entry.countySlug}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return {
    effectiveAddress: normalized.effectiveAddress,
    source: normalized.source,
    parsedCity,
    parsedState: state,
    primaryCity,
    detectedCities: uniqueCities,
    assignments: deduped,
  };
}