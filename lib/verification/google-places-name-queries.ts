/**
 * Multi-attempt Google Places name queries.
 *
 * Legal entity suffixes (LLC, Inc, …) often prevent a match even when a strong
 * Google Business Profile exists under the trade name.
 */

import { preferPublicCompanyName } from '@/lib/companies/public-display-name';
import type { CompanyEnrichmentInput } from '@/lib/verification/types';

/** Longer forms first so "L.L.C." / "Incorporated" win over short tokens. */
const TRAILING_ENTITY_SUFFIX_RE =
  /(?:,\s*|\s+)(?:L\.?\s*L\.?\s*C\.?|L\.?\s*L\.?\s*P\.?|P\.?\s*L\.?\s*L\.?\s*C\.?|INCORPORATED|CORPORATION|COMPANY|LIMITED|INC\.?|CORP\.?|LTD\.?|PLC|LLP|LP|PC|P\.?A\.?|CO\.?)\s*$/i;

/** Tokens that do not identify a specific brand (must not alone justify a match). */
const GENERIC_NAME_TOKENS = new Set([
  'mover',
  'movers',
  'moving',
  'move',
  'company',
  'companies',
  'service',
  'services',
  'storage',
  'relocation',
  'relocations',
  'transport',
  'transportation',
  'trucking',
  'van',
  'vans',
  'lines',
  'express',
  'logistics',
  'hauling',
  'labor',
  'packing',
  'local',
  'national',
  'professional',
  'pros',
  'pro',
  'the',
  'and',
  'of',
  'a',
  'for',
  'llc',
  'inc',
  'corp',
  'ltd',
  'co',
  'usa',
  'us',
]);

/** US state centers for Places locationBias (radius max 50km). */
export const US_STATE_LOCATION_BIAS: Record<
  string,
  { latitude: number; longitude: number; label: string }
> = {
  AL: { latitude: 32.806671, longitude: -86.79113, label: 'AL' },
  AK: { latitude: 61.370716, longitude: -152.404419, label: 'AK' },
  AZ: { latitude: 33.729759, longitude: -111.431221, label: 'AZ' },
  AR: { latitude: 34.969704, longitude: -92.373123, label: 'AR' },
  CA: { latitude: 36.116203, longitude: -119.681564, label: 'CA' },
  CO: { latitude: 39.059811, longitude: -105.311104, label: 'CO' },
  CT: { latitude: 41.597782, longitude: -72.755371, label: 'CT' },
  DE: { latitude: 39.318523, longitude: -75.507141, label: 'DE' },
  FL: { latitude: 27.766279, longitude: -81.686783, label: 'FL' },
  GA: { latitude: 33.040619, longitude: -83.643074, label: 'GA' },
  HI: { latitude: 21.094318, longitude: -157.498337, label: 'HI' },
  ID: { latitude: 44.240459, longitude: -114.478828, label: 'ID' },
  IL: { latitude: 40.349457, longitude: -88.986137, label: 'IL' },
  IN: { latitude: 39.849426, longitude: -86.258278, label: 'IN' },
  IA: { latitude: 42.011539, longitude: -93.210526, label: 'IA' },
  KS: { latitude: 38.5266, longitude: -96.726486, label: 'KS' },
  KY: { latitude: 37.66814, longitude: -84.670067, label: 'KY' },
  LA: { latitude: 31.169546, longitude: -91.867805, label: 'LA' },
  ME: { latitude: 44.693947, longitude: -69.381927, label: 'ME' },
  MD: { latitude: 39.063946, longitude: -76.802101, label: 'MD' },
  MA: { latitude: 42.230171, longitude: -71.530106, label: 'MA' },
  MI: { latitude: 43.326618, longitude: -84.536095, label: 'MI' },
  MN: { latitude: 45.694454, longitude: -93.900192, label: 'MN' },
  MS: { latitude: 32.741646, longitude: -89.678696, label: 'MS' },
  MO: { latitude: 38.456085, longitude: -92.288368, label: 'MO' },
  MT: { latitude: 46.921925, longitude: -110.454353, label: 'MT' },
  NE: { latitude: 41.12537, longitude: -98.268082, label: 'NE' },
  NV: { latitude: 38.313515, longitude: -117.055374, label: 'NV' },
  NH: { latitude: 43.452492, longitude: -71.563896, label: 'NH' },
  NJ: { latitude: 40.298904, longitude: -74.521011, label: 'NJ' },
  NM: { latitude: 34.840515, longitude: -106.248482, label: 'NM' },
  NY: { latitude: 42.165726, longitude: -74.948051, label: 'NY' },
  NC: { latitude: 35.630066, longitude: -79.806419, label: 'NC' },
  ND: { latitude: 47.528912, longitude: -99.784012, label: 'ND' },
  OH: { latitude: 40.388783, longitude: -82.764915, label: 'OH' },
  OK: { latitude: 35.565342, longitude: -96.928917, label: 'OK' },
  OR: { latitude: 44.572021, longitude: -122.070938, label: 'OR' },
  PA: { latitude: 40.590752, longitude: -77.209755, label: 'PA' },
  RI: { latitude: 41.680893, longitude: -71.51178, label: 'RI' },
  SC: { latitude: 33.856892, longitude: -80.945007, label: 'SC' },
  SD: { latitude: 44.299782, longitude: -99.438828, label: 'SD' },
  TN: { latitude: 35.747845, longitude: -86.692345, label: 'TN' },
  TX: { latitude: 31.054487, longitude: -97.563461, label: 'TX' },
  UT: { latitude: 40.150032, longitude: -111.862434, label: 'UT' },
  VT: { latitude: 44.045876, longitude: -72.710686, label: 'VT' },
  VA: { latitude: 37.769337, longitude: -78.169968, label: 'VA' },
  WA: { latitude: 47.400902, longitude: -121.490494, label: 'WA' },
  WV: { latitude: 38.491226, longitude: -80.954453, label: 'WV' },
  WI: { latitude: 44.268543, longitude: -89.616508, label: 'WI' },
  WY: { latitude: 42.755966, longitude: -107.30249, label: 'WY' },
  DC: { latitude: 38.9072, longitude: -77.0369, label: 'DC' },
};

const STATE_FULL_NAMES: Record<string, string> = {
  AL: 'Alabama',
  AK: 'Alaska',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  FL: 'Florida',
  GA: 'Georgia',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
  DC: 'District of Columbia',
};

export type GooglePlacesQueryVariant = {
  /** Debug label for logs */
  strategy: string;
  /** Name used for similarity scoring */
  searchName: string;
  /** Full Places textQuery */
  textQuery: string;
  /** Optional location bias for this attempt */
  locationBias?: { latitude: number; longitude: number; radiusMeters: number };
};

export type PlaceMatchCandidate = {
  displayName?: string | null;
  formattedAddress?: string | null;
  phone?: string | null;
  websiteUri?: string | null;
};

/** Minimum score to accept a Places result (0–100). */
export const GOOGLE_PLACES_MIN_ACCEPT_SCORE = 52;
/** Stop trying more queries once we hit this score. */
export const GOOGLE_PLACES_HIGH_CONFIDENCE_SCORE = 76;
/** Cap sequential Places searchText calls per company. */
export const GOOGLE_PLACES_MAX_QUERY_ATTEMPTS = 14;

/**
 * Strip common legal-entity suffixes while preserving the trade name.
 * "Otterly Elite Movers LLC" → "Otterly Elite Movers"
 */
export function stripLegalEntitySuffixes(name: string): string {
  let s = name.trim().replace(/\s+/g, ' ');
  if (!s) return '';

  let prev = '';
  while (s !== prev) {
    prev = s;
    s = s.replace(TRAILING_ENTITY_SUFFIX_RE, '').trim();
    s = s.replace(/[,.\s]+$/, '').trim();
  }
  return s;
}

/** Collapse for equality / token work. */
export function normalizeNameForMatch(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function nameTokens(value: string): string[] {
  return normalizeNameForMatch(value)
    .split(' ')
    .filter((t) => t.length > 1);
}

/** Collapse mover synonyms so "Mighty Moving" ≈ "Mighty Movers". */
export function canonicalizeNameTokens(tokens: string[]): string[] {
  return tokens.map((t) => {
    if (t === 'movers' || t === 'moving' || t === 'mover' || t === 'move') {
      return 'movsvc';
    }
    if (t === 'relocations' || t === 'relocation') return 'reloc';
    if (t === 'services' || t === 'service') return 'svc';
    return t;
  });
}

export function distinctiveNameTokens(value: string): string[] {
  return nameTokens(value).filter(
    (t) => t.length >= 3 && !GENERIC_NAME_TOKENS.has(t)
  );
}

export function digitsOnlyPhone(value: string | null | undefined): string {
  if (!value) return '';
  const d = value.replace(/\D/g, '');
  // US: compare last 10 digits
  return d.length >= 10 ? d.slice(-10) : d;
}

function jaccard(a: string[], b: string[]): number {
  if (!a.length || !b.length) return 0;
  const setA = new Set(a);
  const setB = new Set(b);
  let inter = 0;
  for (const t of setA) {
    if (setB.has(t)) inter++;
  }
  const union = setA.size + setB.size - inter;
  return union === 0 ? 0 : inter / union;
}

function looksLikeBusinessNameNotCity(value: string): boolean {
  const s = value.trim();
  if (!s) return false;
  if (
    /\b(llc|l\.l\.c|inc|incorporated|corp|corporation|ltd|movers|moving|transport|trucking|company)\b/i.test(
      s
    )
  ) {
    return true;
  }
  // Multi-word company-ish strings used as fake "city" from "Name, ST" headquarters
  if (s.split(/\s+/).length >= 3) return true;
  return false;
}

/**
 * Parse city/state from a headquarters string without treating
 * "Otterly Elite Movers LLC, OR" as city=company name.
 */
export function parseCityStateFromHeadquarters(
  headquarters?: string | null
): { city: string; state: string } {
  if (!headquarters) return { city: '', state: '' };
  const parts = headquarters.split(',').map((p) => p.trim()).filter(Boolean);
  if (parts.length >= 2) {
    const statePart = parts[parts.length - 1].replace(/\d{5}(-\d{4})?/, '').trim();
    const stateMatch = statePart.match(/\b([A-Za-z]{2})\b/);
    const state = (stateMatch?.[1] ?? statePart.slice(0, 2)).toUpperCase();
    const cityCandidate = parts[parts.length - 2] || parts[0];
    if (/^[A-Z]{2}$/.test(state) && looksLikeBusinessNameNotCity(cityCandidate)) {
      return { city: '', state };
    }
    // If only two parts and first is a long business-like string, no city
    if (
      parts.length === 2 &&
      /^[A-Z]{2}$/.test(state) &&
      looksLikeBusinessNameNotCity(parts[0])
    ) {
      return { city: '', state };
    }
    return {
      city: looksLikeBusinessNameNotCity(cityCandidate) ? '' : cityCandidate,
      state: /^[A-Z]{2}$/.test(state) ? state : '',
    };
  }
  // Single token state code
  if (/^[A-Za-z]{2}$/.test(parts[0] ?? '')) {
    return { city: '', state: parts[0]!.toUpperCase() };
  }
  return { city: parts[0] ?? '', state: '' };
}

function addressHasState(addr: string, state: string): boolean {
  const a = addr.toUpperCase();
  const s = state.toUpperCase();
  if (s.length !== 2) return false;
  return (
    a.includes(`, ${s}`) ||
    a.includes(` ${s} `) ||
    a.endsWith(` ${s}`) ||
    new RegExp(`\\b${s}\\b`).test(a) ||
    a.includes(`, ${s} `) ||
    a.includes(`${s} `)
  );
}

/**
 * Score a Places candidate against the search name + expected location.
 * Higher is better (0–100). Hard-rejects brand mismatches (e.g. Otterly → Elite Movers).
 */
export function scoreGooglePlaceMatch(
  place: PlaceMatchCandidate,
  searchName: string,
  city: string,
  state: string,
  expectedPhone?: string | null
): number {
  const placeName = place.displayName?.trim() || '';
  if (!placeName || !searchName.trim()) return 0;

  const pNorm = normalizeNameForMatch(placeName);
  const tNorm = normalizeNameForMatch(searchName);
  const pStrip = normalizeNameForMatch(stripLegalEntitySuffixes(placeName));
  const tStrip = normalizeNameForMatch(stripLegalEntitySuffixes(searchName));

  const placeTokens = canonicalizeNameTokens(nameTokens(pStrip || pNorm));
  const targetTokens = canonicalizeNameTokens(nameTokens(tStrip || tNorm));
  const placeTokenSet = new Set(placeTokens);
  const distinctive = distinctiveNameTokens(searchName);

  // Brand tokens from the query MUST appear in the Google place name.
  // Prevents "Otterly Elite Movers" matching "Elite Movers LLC".
  if (distinctive.length > 0) {
    const missing = distinctive.filter((t) => !placeTokenSet.has(t));
    if (missing.length > 0) {
      return 0;
    }
  }

  let score = 0;
  if (pStrip && tStrip && pStrip === tStrip) {
    score = 88;
  } else if (pNorm === tNorm) {
    score = 85;
  } else {
    const shorter = pStrip.length <= tStrip.length ? pStrip : tStrip;
    const longer = pStrip.length <= tStrip.length ? tStrip : pStrip;
    const containmentRatio =
      shorter.length > 0 && longer.includes(shorter)
        ? shorter.length / longer.length
        : 0;
    if (containmentRatio >= 0.8) {
      score = 76;
    } else {
      const j = jaccard(placeTokens, targetTokens);
      score = Math.round(j * 82);
    }
  }

  // All distinctive brand tokens present → solid floor (handles Moving vs Movers).
  if (distinctive.length > 0) {
    score = Math.max(score, 54 + Math.min(distinctive.length, 3) * 6);
  }

  const addr = place.formattedAddress || '';
  const stateU = state.trim().toUpperCase();
  const cityU = city.trim().toUpperCase();

  if (stateU.length === 2) {
    if (addressHasState(addr, stateU)) {
      score += 14;
    } else if (addr.trim()) {
      // Known state but place is elsewhere — strongly demote
      score -= 35;
    }
  }
  if (cityU.length >= 2 && addr.toUpperCase().includes(cityU)) {
    score += 12;
  }

  if (/\b(mov|mover|moving|relocation|transfer)\b/i.test(placeName)) {
    score += 3;
  }

  const expectedDigits = digitsOnlyPhone(expectedPhone);
  const placeDigits = digitsOnlyPhone(place.phone);
  if (expectedDigits.length >= 10 && placeDigits.length >= 10) {
    if (expectedDigits === placeDigits) {
      score += 22;
    }
  }

  return Math.max(0, Math.min(100, score));
}

function pushUniqueName(
  bag: Array<{ strategy: string; name: string }>,
  strategy: string,
  name: string | null | undefined
): void {
  const n = (name ?? '').trim().replace(/\s+/g, ' ');
  if (n.length < 2) return;
  const key = normalizeNameForMatch(n);
  if (!key) return;
  if (bag.some((x) => normalizeNameForMatch(x.name) === key)) return;
  bag.push({ strategy, name: n });
}

/**
 * Ordered name/query variants: stripped trade names first, then DBA, then legal.
 */
export function buildGooglePlacesQueryVariants(
  input: CompanyEnrichmentInput
): GooglePlacesQueryVariant[] {
  const geo = parseCityStateFromHeadquarters(input.headquarters);
  const city = (input.city ?? geo.city ?? '').trim();
  const state = (input.state ?? geo.state ?? '').trim().toUpperCase().slice(0, 2);
  const category = (input.businessCategory?.trim() || 'moving company').trim();
  const stateFull = state ? STATE_FULL_NAMES[state] ?? '' : '';
  const biasCenter = state ? US_STATE_LOCATION_BIAS[state] : undefined;
  const bias = biasCenter
    ? {
        latitude: biasCenter.latitude,
        longitude: biasCenter.longitude,
        radiusMeters: 50_000,
      }
    : undefined;

  const legal = input.legalName?.trim() || '';
  const dba = input.dbaName?.trim() || '';
  const preferred =
    preferPublicCompanyName({
      legalName: legal,
      dbaName: dba || null,
      fallback: legal,
    }) || legal;

  const names: Array<{ strategy: string; name: string }> = [];

  // Prefer cleaner trade names before full legal entity strings.
  pushUniqueName(names, 'preferred_stripped', stripLegalEntitySuffixes(preferred));
  if (dba) {
    pushUniqueName(names, 'dba_stripped', stripLegalEntitySuffixes(dba));
    pushUniqueName(names, 'dba', dba);
  }
  pushUniqueName(names, 'preferred', preferred);
  if (legal) {
    pushUniqueName(names, 'legal_stripped', stripLegalEntitySuffixes(legal));
    pushUniqueName(names, 'legal', legal);
  }

  // Light punctuation/spacing variants
  for (const entry of [...names]) {
    const noPunct = entry.name
      .replace(/[^\w\s&]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (noPunct && normalizeNameForMatch(noPunct) !== normalizeNameForMatch(entry.name)) {
      pushUniqueName(names, `${entry.strategy}_nopunct`, noPunct);
    }
  }

  const variants: GooglePlacesQueryVariant[] = [];
  const seenQuery = new Set<string>();

  const pushQuery = (
    strategy: string,
    searchName: string,
    textQuery: string,
    withBias = true
  ) => {
    const q = textQuery.trim().replace(/\s+/g, ' ');
    if (q.length < 3) return;
    const key = `${q.toLowerCase()}|${withBias && bias ? 'b' : 'n'}`;
    if (seenQuery.has(key)) return;
    seenQuery.add(key);
    variants.push({
      strategy,
      searchName,
      textQuery: q,
      locationBias: withBias ? bias : undefined,
    });
  };

  // High-value first: cleaned bare name, then geo, then category (LLC last).
  const orderedNames = names;

  for (const { strategy, name } of orderedNames) {
    // Bare trade name first — "Otterly Elite Movers" without LLC noise
    pushQuery(`${strategy}+bare`, name, name, true);
    // Name + city/state
    pushQuery(`${strategy}+geo`, name, [name, city, state].filter(Boolean).join(' '));
    if (stateFull) {
      pushQuery(`${strategy}+statefull_bare`, name, [name, stateFull].filter(Boolean).join(' '));
    }
    // Category helps mover-specific ranking when brand is indexed
    pushQuery(
      `${strategy}+cat+geo`,
      name,
      [name, category, city, state].filter(Boolean).join(' ')
    );
    if (stateFull) {
      pushQuery(
        `${strategy}+statefull`,
        name,
        [name, category, city, stateFull].filter(Boolean).join(' ')
      );
    }
  }

  // Phone as high-value text signal when FMCSA/user provided it
  const phoneDigits = digitsOnlyPhone(input.phone);
  const nameHint = stripLegalEntitySuffixes(preferred || legal) || preferred || legal;
  if (phoneDigits.length >= 10) {
    const pretty = `(${phoneDigits.slice(0, 3)}) ${phoneDigits.slice(3, 6)}-${phoneDigits.slice(6)}`;
    pushQuery(
      'phone+name',
      nameHint,
      [nameHint, pretty, state || stateFull].filter(Boolean).join(' ')
    );
    pushQuery('phone_only', nameHint, pretty);
  }

  // Physical address text (FMCSA HQ) — helps service-area / thinly indexed GBPs
  const hq = (input.headquarters ?? '').trim();
  if (hq.length >= 12 && /\d/.test(hq)) {
    const firstSeg = hq.split(',')[0]?.trim() ?? '';
    if (!looksLikeBusinessNameNotCity(firstSeg) || /\d/.test(firstSeg)) {
      pushQuery('name+address', nameHint, `${nameHint} ${hq}`);
      pushQuery('address_only', nameHint, hq);
    }
  }

  return variants;
}
