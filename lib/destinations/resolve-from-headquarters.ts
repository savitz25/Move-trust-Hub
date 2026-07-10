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
};

function stateSlugFromCode(stateCode: string | null): string | null {
  if (!stateCode) return null;
  return localStates.find((s) => s.code === stateCode)?.slug ?? null;
}

function countiesForCity(stateSlug: string, city: string | null): string[] {
  if (!city) return [];
  const normalizedCity = normalizePlace(city);
  if (!normalizedCity) return [];

  return getCountiesForState(stateSlug)
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
              market.stateCode === stateCode && normalizePlace(market.displayName) === cityNorm
          )
          .map((market) => market.slug)
      : [];

  return [...new Set([...fromCity, ...fromCounty])];
}

/**
 * Resolve local-movers county + moving-to market targets from a headquarters string
 * (e.g. "Honolulu, HI" → hawaii/honolulu + honolulu-hi).
 */
export function resolveDestinationsFromHeadquarters(
  headquarters: string | null | undefined
): ResolvedDestinationAssignment[] {
  const { city, state } = parseHeadquarters(headquarters);
  const stateSlug = stateSlugFromCode(state);
  if (!stateSlug || !state) return [];

  const countySlugs = countiesForCity(stateSlug, city);
  const assignments: ResolvedDestinationAssignment[] = [];

  for (const countySlug of countySlugs) {
    const countyKey = `${countySlug}-${state.toLowerCase()}`;
    assignments.push({
      stateSlug,
      countySlug,
      countyKey,
      marketSlugs: marketSlugsForCountyKey(countyKey, city, state),
    });
  }

  if (assignments.length === 0 && city) {
    const cityNorm = normalizePlace(city);
    const cityMarkets = markets.filter(
      (market) =>
        market.stateCode === state && normalizePlace(market.displayName) === cityNorm
    );

    for (const market of cityMarkets) {
      const parsed = parseCountyKey(market.primaryCounties[0] ?? '');
      if (!parsed) continue;
      assignments.push({
        stateSlug: parsed.stateSlug,
        countySlug: parsed.countySlug,
        countyKey: market.primaryCounties[0]!,
        marketSlugs: [market.slug],
      });
    }
  }

  const seen = new Set<string>();
  return assignments.filter((entry) => {
    const key = `${entry.stateSlug}/${entry.countySlug}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}