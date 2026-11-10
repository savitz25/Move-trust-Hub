import zipToCounty from '@/data/zip-to-county.json';
import { parseHeadquarters } from '@/lib/local-movers/parse-headquarters';
import { resolveCityToCounty } from '@/lib/local-movers/resolve-city-to-county';
import { localStates } from '@/lib/local-movers/states';

const ZIP_TO_COUNTY = zipToCounty as Record<string, string>;

export type HeadquartersCounty = {
  stateSlug: string | null;
  countySlug: string | null;
  /** True when ZIP or city resolved a county. */
  countyResolved: boolean;
  stateKnown: boolean;
};

const PLACE_SUFFIX = /\s+(township|borough|city|town|village|parish|cdp)$/i;

/** Last 5-digit ZIP in a headquarters string, including ZIP+4. */
export function zipFromHeadquarters(raw: string | null | undefined): string | null {
  const matches = String(raw ?? '').match(/\b(\d{5})(?:-\d{4})?\b/g);
  if (!matches?.length) return null;
  return matches[matches.length - 1]!.slice(0, 5);
}

function stateSlugFromCode(code: string | undefined): string | null {
  if (!code) return null;
  return localStates.find((state) => state.code === code)?.slug ?? null;
}

/**
 * Resolve a headquarters county from the ZIP first, then the city.
 * ZIP coverage is the Census ZCTA primary county (largest land overlap).
 * City lookup still strips township/borough/city suffixes before the seat list.
 */
export function resolveHeadquartersCounty(
  headquarters: string | null | undefined
): HeadquartersCounty {
  const parsed = parseHeadquarters(headquarters);
  const stateSlug = stateSlugFromCode(parsed.stateCode);
  const zip = zipFromHeadquarters(headquarters);
  if (zip && ZIP_TO_COUNTY[zip]) {
    const [zipState, zipCounty] = ZIP_TO_COUNTY[zip]!.split('/');
    if (zipState && zipCounty && (!stateSlug || zipState === stateSlug)) {
      return {
        stateSlug: zipState,
        countySlug: zipCounty,
        countyResolved: true,
        stateKnown: true,
      };
    }
  }

  if (stateSlug && parsed.city) {
    const direct = resolveCityToCounty({
      city: parsed.city,
      stateCode: parsed.stateCode,
      stateSlug,
    });
    if (direct) {
      return {
        stateSlug: direct.stateSlug,
        countySlug: direct.countySlug,
        countyResolved: true,
        stateKnown: true,
      };
    }
    const stripped = parsed.city.replace(PLACE_SUFFIX, '').trim();
    if (stripped && stripped !== parsed.city) {
      const again = resolveCityToCounty({
        city: stripped,
        stateCode: parsed.stateCode,
        stateSlug,
      });
      if (again) {
        return {
          stateSlug: again.stateSlug,
          countySlug: again.countySlug,
          countyResolved: true,
          stateKnown: true,
        };
      }
    }
  }

  return {
    stateSlug,
    countySlug: null,
    countyResolved: false,
    stateKnown: Boolean(stateSlug),
  };
}
