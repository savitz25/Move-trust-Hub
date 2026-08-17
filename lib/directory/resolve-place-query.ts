/**
 * Map /companies search text to a local-movers place (city → county / state).
 * Used to avoid dead-end empty states when a county guide already exists.
 */
import {
  getStateMeta,
  isHighConfidencePlaceMatch,
  parsePlaceQuery,
  searchUsPlaces,
} from '@/lib/geo/search-us-places';
import { normalizePlaceQuery } from '@/lib/geo/us-place-index';
import { lookupCityCountyAlias } from '@/lib/home/city-county-aliases';
import { getCountiesForState } from '@/lib/local-movers/geography/index';
import { getCountyPath, getStatePath } from '@/lib/local-movers/paths';
import { localStates } from '@/lib/local-movers/states';
import { parseCarrierNumber } from '@/lib/verify-dot/schema';

export type DirectoryPlaceMatch = {
  kind: 'city' | 'county' | 'state';
  queryLabel: string;
  placeLabel: string;
  stateCode: string;
  stateSlug: string;
  stateName: string;
  countySlug: string | null;
  countyName: string | null;
  countyHref: string | null;
  stateHref: string;
  headline: string;
  detail: string;
};

const COUNTY_SUFFIX = /\b(county|parish|borough|census area|municipality)\b/g;

function stripAdminSuffix(value: string): string {
  return normalizePlaceQuery(value.replace(COUNTY_SUFFIX, ' '));
}

function stateFromToken(token: string) {
  const t = normalizePlaceQuery(token);
  if (!t) return null;
  if (t.length === 2) {
    return localStates.find((s) => s.code.toLowerCase() === t) ?? null;
  }
  return (
    localStates.find((s) => normalizePlaceQuery(s.name) === t || s.slug === t.replace(/\s+/g, '-')) ??
    null
  );
}

function matchCountyInState(
  stateSlug: string,
  rawCounty: string
): { slug: string; name: string } | null {
  const needle = stripAdminSuffix(rawCounty);
  if (!needle) return null;
  const counties = getCountiesForState(stateSlug);
  const exact = counties.find(
    (c) => normalizePlaceQuery(c.slug.replace(/-/g, ' ')) === needle || normalizePlaceQuery(c.name) === needle
  );
  return exact ? { slug: exact.slug, name: exact.name } : null;
}

function toMatch(input: {
  kind: DirectoryPlaceMatch['kind'];
  queryLabel: string;
  stateCode: string;
  countySlug?: string | null;
  countyName?: string | null;
  cityLabel?: string | null;
}): DirectoryPlaceMatch | null {
  const state = getStateMeta(input.stateCode);
  if (!state) return null;
  const countyHref =
    input.countySlug ? getCountyPath(state.slug, input.countySlug) : null;
  const stateHref = getStatePath(state.slug);
  const countyLabel = input.countyName
    ? `${input.countyName} County, ${state.code}`
    : null;
  const placeLabel =
    input.kind === 'state'
      ? state.name
      : input.kind === 'county'
        ? countyLabel || state.name
        : input.cityLabel
          ? `${input.cityLabel}, ${state.code}`
          : countyLabel || state.name;

  const headline =
    input.kind === 'state'
      ? `Local movers in ${state.name}`
      : `Local movers in ${countyLabel || state.name}`;

  const detail =
    input.kind === 'state'
      ? `${state.name} has a local-movers guide. Interstate directory search is by company name or USDOT / MC — not a city listing.`
      : input.kind === 'city' && input.cityLabel && countyLabel
        ? `${input.cityLabel} is in ${countyLabel}. Browse verified local movers there instead of treating this as a missing interstate carrier.`
        : `Browse verified local movers for this market. This is not a dead-end — the county guide is the right path.`;

  return {
    kind: input.kind,
    queryLabel: input.queryLabel,
    placeLabel,
    stateCode: state.code,
    stateSlug: state.slug,
    stateName: state.name,
    countySlug: input.countySlug ?? null,
    countyName: input.countyName ?? null,
    countyHref,
    stateHref,
    headline,
    detail,
  };
}

/**
 * Resolve a /companies search box value to a local-movers place, or null.
 * Company-name queries (e.g. Allied) return null.
 */
export function resolveDirectoryPlaceQuery(raw: string): DirectoryPlaceMatch | null {
  const queryLabel = raw.trim();
  if (!queryLabel || queryLabel.length < 2) return null;
  if (parseCarrierNumber(queryLabel)) return null;

  const normalized = normalizePlaceQuery(queryLabel);
  const asState = stateFromToken(normalized);
  if (asState && (normalized === asState.code.toLowerCase() || normalized === normalizePlaceQuery(asState.name) || normalized === asState.slug)) {
    return toMatch({
      kind: 'state',
      queryLabel,
      stateCode: asState.code,
    });
  }

  const parsed = parsePlaceQuery(queryLabel);
  const cityPart = stripAdminSuffix(parsed.cityPart || normalized);
  const stateFromTail = parsed.stateCode ? getStateMeta(parsed.stateCode) : null;

  if (!cityPart && stateFromTail) {
    return toMatch({
      kind: 'state',
      queryLabel,
      stateCode: stateFromTail.code,
    });
  }

  if (stateFromTail && cityPart) {
    const county = matchCountyInState(stateFromTail.slug, cityPart);
    if (county) {
      return toMatch({
        kind: 'county',
        queryLabel,
        stateCode: stateFromTail.code,
        countySlug: county.slug,
        countyName: county.name,
      });
    }
    const aliasSlug = lookupCityCountyAlias(cityPart, stateFromTail.code);
    if (aliasSlug) {
      const countyMeta = getCountiesForState(stateFromTail.slug).find((c) => c.slug === aliasSlug);
      return toMatch({
        kind: 'city',
        queryLabel,
        stateCode: stateFromTail.code,
        countySlug: aliasSlug,
        countyName: countyMeta?.name ?? null,
        cityLabel: cityPart
          .split(' ')
          .map((w) => (w ? w[0]!.toUpperCase() + w.slice(1) : w))
          .join(' '),
      });
    }
  }

  if (cityPart && !stateFromTail) {
    for (const state of localStates) {
      const county = matchCountyInState(state.slug, cityPart);
      if (county) {
        return toMatch({
          kind: 'county',
          queryLabel,
          stateCode: state.code,
          countySlug: county.slug,
          countyName: county.name,
        });
      }
    }
  }

  const hits = searchUsPlaces(queryLabel, { limit: 5 });
  const top = hits[0];
  if (!top || top.score < 70) return null;
  if (!isHighConfidencePlaceMatch(hits) && top.score < 100) return null;

  return toMatch({
    kind: top.countySlug ? 'city' : 'state',
    queryLabel,
    stateCode: top.stateCode,
    countySlug: top.countySlug,
    countyName: top.countyName,
    cityLabel: top.city,
  });
}
