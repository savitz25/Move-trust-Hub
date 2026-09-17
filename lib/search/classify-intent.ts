import { resolveDirectoryPlaceQuery } from '@/lib/directory/resolve-place-query';
import {
  isHighConfidencePlaceMatch,
  parsePlaceQuery,
  searchUsPlaces,
} from '@/lib/geo/search-us-places';
import { boundSearchQuery, digitsOnly, normalizeSearchText, searchTokens } from '@/lib/search/normalize';
import type { ClassifiedSearchQuery, IdentifierNamespace } from '@/lib/search/types';

const MOVER_HINT =
  /\b(truck|trucks|moving|movers?|van|vans|hunks|hauling|logistics|transit|lines|freight|carrier|relocation)\b/i;

// TH-DISCOVERY-PARITY-001A: pure generic-category vocabulary. If EVERY token in the
// (post-location-split) query text is one of these, the query names a provider
// CATEGORY, not a specific company -- see splitCompanyLocation/classifySearchQuery's
// `categoryOnly` field. Deliberately covers the doctrine's required synonym set (mover,
// moving company, long-distance mover, relocation company, moving service, auto
// transport carrier, vehicle/car shipping) plus common connector words, not just the
// audit's own example strings.
const GENERIC_CATEGORY_TOKENS = new Set([
  'mover', 'movers', 'moving', 'move', 'moves',
  'company', 'companies', 'co', 'corp', 'inc', 'llc',
  'service', 'services', 'help',
  'long', 'distance', 'interstate', 'local',
  'relocation', 'relocations', 'relocate',
  'auto', 'transport', 'transportation', 'carrier', 'carriers',
  'car', 'cars', 'vehicle', 'vehicles', 'shipping', 'ship',
  'piano', 'furniture', 'household', 'goods',
  'find', 'me', 'a', 'an', 'the', 'for', 'and', 'or', 'of', 'to', 'in', 'near', 'around',
]);

function isGenericCategoryText(text: string): boolean {
  const tokens = searchTokens(text);
  if (!tokens.length) return false;
  return tokens.every((token) => GENERIC_CATEGORY_TOKENS.has(token));
}

function parseIdentifier(raw: string): ClassifiedSearchQuery['identifier'] {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const upper = trimmed.toUpperCase();

  const mc = upper.match(/^MC[-\s]?(\d{3,8})$/);
  if (mc) {
    return { namespace: 'MC', digits: mc[1]!, display: `MC-${mc[1]}` };
  }
  const dot = upper.match(/^(?:USDOT|DOT)[-\s]?(\d{3,8})$/);
  if (dot) {
    return { namespace: 'DOT', digits: dot[1]!, display: `USDOT ${dot[1]}` };
  }
  const digits = digitsOnly(trimmed);
  if (digits.length >= 3 && digits.length <= 8 && /^\d{3,8}$/.test(trimmed.replace(/\s/g, ''))) {
    return { namespace: 'BARE', digits, display: digits };
  }
  return null;
}

function looksLikeMoverBrand(value: string): boolean {
  return MOVER_HINT.test(value) || searchTokens(value).length >= 3;
}

function splitCompanyLocation(raw: string): {
  companyQuery: string;
  locationHint: ClassifiedSearchQuery['locationHint'];
  categoryOnly: boolean;
} {
  const parsed = parsePlaceQuery(raw);
  if (!parsed.stateCode) {
    return { companyQuery: raw, locationHint: null, categoryOnly: false };
  }

  // TH-DISCOVERY-PARITY-001A: previously re-derived "the text before the state" here by
  // stripping only a trailing 2-LETTER state CODE, so a full state name ("relocation
  // company Newark New Jersey") was never stripped -- "New" leaked into the place
  // lookup alongside "Jersey" and matched the wrong city (Jersey City instead of
  // recognizing New Jersey as the state). parsePlaceQuery(raw).cityPart already
  // correctly strips BOTH a 2-letter code and a full state name; reuse it instead of a
  // second, narrower reimplementation.
  const withoutState = parsed.cityPart;
  const tokens = searchTokens(withoutState);
  if (tokens.length < 3) {
    return { companyQuery: raw, locationHint: null, categoryOnly: false };
  }

  for (let i = 1; i < tokens.length; i += 1) {
    const prefix = tokens.slice(0, i).join(' ');
    const suffix = tokens.slice(i).join(' ');
    if (prefix.length < 4) continue;
    const hits = searchUsPlaces(`${suffix}, ${parsed.stateCode}`, { limit: 2 });
    const top = hits[0];
    if (!top || top.stateCode !== parsed.stateCode || top.score < 85) continue;
    if (!looksLikeMoverBrand(prefix) && searchTokens(prefix).length < 2) continue;
    return {
      companyQuery: prefix,
      locationHint: {
        city: top.city,
        stateCode: top.stateCode,
        label: `${top.city}, ${top.stateCode}`,
      },
      categoryOnly: isGenericCategoryText(prefix),
    };
  }

  return { companyQuery: raw, locationHint: null, categoryOnly: false };
}

// TH-DISCOVERY-PARITY-001A: "mover near Fort Lauderdale" / "relocation company Bergen
// County NJ" / "movers Orange County California" mix a generic category phrase with a
// city OR county name -- but splitCompanyLocation's suffix search only recognizes
// CITIES via the place gazetteer, so a county name (or a bare city with no state code
// in the text at all) is never resolved, and the whole phrase falls through to an
// ungeocoded, noisy company-NAME search instead of a place-scoped discovery query.
// This strips known generic-category/connector tokens from the query and, if a
// distinct remainder is left, resolves THAT against resolveDirectoryPlaceQuery (the
// same city/county/state resolver the directory pages already use) instead of a
// second, narrower gazetteer lookup.
function resolveCategoryPlace(raw: string): {
  companyQuery: string;
  locationHint: ClassifiedSearchQuery['locationHint'];
} | null {
  const tokens = searchTokens(raw);
  if (tokens.length < 2) return null;
  const categoryTokens = tokens.filter((t) => GENERIC_CATEGORY_TOKENS.has(t));
  const remainderTokens = tokens.filter((t) => !GENERIC_CATEGORY_TOKENS.has(t));
  // Require at least one real category signal AND a remainder to look up --
  // otherwise this isn't a "category + place" phrase at all.
  if (!categoryTokens.length || !remainderTokens.length) return null;
  const remainder = remainderTokens.join(' ');
  if (remainder.length < 3) return null;

  const place = resolveDirectoryPlaceQuery(remainder);
  if (!place || place.kind === 'state') return null;
  // NOTE: `city` here is really "the place name to headquarters-text-match against" --
  // for a county-kind result (no separate city field on DirectoryPlaceMatch) that's the
  // bare county name (e.g. "Denver", "Orange"), not the "<name> County, ST" placeLabel,
  // so a headquarters string like "Denver, CO" still matches on substring.
  const placeName = place.kind === 'city' ? place.placeLabel.split(',')[0]!.trim() : place.countyName;
  if (!placeName) return null;
  return {
    companyQuery: raw,
    locationHint: { city: placeName, stateCode: place.stateCode, label: place.placeLabel },
  };
}

export function classifySearchQuery(rawInput: string): ClassifiedSearchQuery {
  const raw = boundSearchQuery(rawInput);
  const normalized = normalizeSearchText(raw);
  const identifier = parseIdentifier(raw);

  if (identifier) {
    return {
      raw,
      normalized,
      intent: 'REGULATORY_IDENTIFIER',
      identifier,
      companyQuery: raw,
      locationHint: null,
      categoryOnly: false,
    };
  }

  if (!normalized) {
    return {
      raw,
      normalized,
      intent: 'UNKNOWN',
      identifier: null,
      companyQuery: raw,
      locationHint: null,
      categoryOnly: false,
    };
  }

  const split = splitCompanyLocation(raw);
  if (split.locationHint && split.companyQuery && split.companyQuery !== raw) {
    return {
      raw,
      normalized,
      intent: 'COMPANY_IDENTITY',
      identifier: null,
      companyQuery: split.companyQuery,
      locationHint: split.locationHint,
      categoryOnly: split.categoryOnly,
    };
  }

  const place = resolveDirectoryPlaceQuery(raw);
  const hits = searchUsPlaces(raw, { limit: 3 });
  const placeOnly = Boolean(place) && !looksLikeMoverBrand(raw);
  const highConfidenceCity = isHighConfidencePlaceMatch(hits) && searchTokens(raw).length <= 4 && !looksLikeMoverBrand(raw);

  if (placeOnly || (place && highConfidenceCity)) {
    return {
      raw,
      normalized,
      intent: 'PLACE',
      identifier: null,
      companyQuery: raw,
      locationHint: place
        ? {
            city: place.kind === 'city' ? place.placeLabel : null,
            stateCode: place.stateCode,
            label: place.placeLabel,
          }
        : null,
      categoryOnly: false,
    };
  }

  // TH-DISCOVERY-PARITY-001A: a bare city with no state in the text at all
  // ("mover near Fort Lauderdale") -- resolve the city via the place gazetteer
  // instead of falling through to an ungeocoded, noisy company-name search.
  if (!split.locationHint) {
    const categoryPlace = resolveCategoryPlace(raw);
    if (categoryPlace) {
      return {
        raw,
        normalized,
        intent: 'COMPANY_IDENTITY',
        identifier: null,
        companyQuery: categoryPlace.companyQuery,
        locationHint: categoryPlace.locationHint,
        categoryOnly: true,
      };
    }
  }

  if (/[a-z]/i.test(raw)) {
    return {
      raw,
      normalized,
      intent: 'COMPANY_IDENTITY',
      identifier: null,
      companyQuery: split.companyQuery || raw,
      locationHint: split.locationHint,
      categoryOnly: split.categoryOnly,
    };
  }

  return {
    raw,
    normalized,
    intent: 'UNKNOWN',
    identifier: null,
    companyQuery: raw,
    locationHint: null,
    categoryOnly: false,
  };
}

export function identifierNamespaceLabel(namespace: IdentifierNamespace): string {
  if (namespace === 'MC') return 'MC';
  if (namespace === 'DOT') return 'USDOT';
  return 'USDOT or MC';
}
