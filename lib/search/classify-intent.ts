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
} {
  const parsed = parsePlaceQuery(raw);
  if (!parsed.stateCode) {
    return { companyQuery: raw, locationHint: null };
  }

  const withoutState = raw
    .replace(/,/g, ' ')
    .replace(new RegExp(`\\s+${parsed.stateCode}\\s*$`, 'i'), '')
    .trim();
  const tokens = searchTokens(withoutState);
  if (tokens.length < 3) {
    return { companyQuery: raw, locationHint: null };
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
    };
  }

  return { companyQuery: raw, locationHint: null };
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
    };
  }

  if (/[a-z]/i.test(raw)) {
    return {
      raw,
      normalized,
      intent: 'COMPANY_IDENTITY',
      identifier: null,
      companyQuery: split.companyQuery || raw,
      locationHint: split.locationHint,
    };
  }

  return {
    raw,
    normalized,
    intent: 'UNKNOWN',
    identifier: null,
    companyQuery: raw,
    locationHint: null,
  };
}

export function identifierNamespaceLabel(namespace: IdentifierNamespace): string {
  if (namespace === 'MC') return 'MC';
  if (namespace === 'DOT') return 'USDOT';
  return 'USDOT or MC';
}
