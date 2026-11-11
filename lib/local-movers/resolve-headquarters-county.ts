import 'server-only';

import zipToCounty from '@/data/zip-to-county.json';
import { parseHeadquarters, zipAfterStateCode } from '@/lib/local-movers/parse-headquarters';
import { resolveCityToCounty } from '@/lib/local-movers/resolve-city-to-county';
import { localStates } from '@/lib/local-movers/states';

/**
 * ZIP to county lookup.
 * Source: Census 2020 ZCTA-county relationship file. The county is the
 * ZCTA's primary county, the one with the largest land-area overlap.
 * FIPS codes are mapped through this repo's county list. Territories and
 * ZCTAs with no county match are omitted. A ZIP is used only after a
 * parsed state code, and only when that ZIP's county is in the same state.
 * An unknown state is left unknown.
 */

const ZIP_TO_COUNTY = zipToCounty as Record<string, string>;

export type HeadquartersCounty = {
  stateSlug: string | null;
  countySlug: string | null;
  /** True when ZIP or city resolved a county. */
  countyResolved: boolean;
  stateKnown: boolean;
};

const PLACE_SUFFIX = /\s+(township|borough|city|town|village|parish|cdp)$/i;

/** ZIP immediately after the state code. Street and suite numbers are ignored. */
export function zipFromHeadquarters(raw: string | null | undefined): string | null {
  return zipAfterStateCode(raw);
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
  if (stateSlug && zip && ZIP_TO_COUNTY[zip]) {
    const [zipState, zipCounty] = ZIP_TO_COUNTY[zip]!.split('/');
    if (zipState && zipCounty && zipState === stateSlug) {
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
