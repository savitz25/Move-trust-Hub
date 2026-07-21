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

export type GooglePlacesQueryVariant = {
  /** Debug label for logs */
  strategy: string;
  /** Name used for similarity scoring */
  searchName: string;
  /** Full Places textQuery */
  textQuery: string;
};

export type PlaceMatchCandidate = {
  displayName?: string | null;
  formattedAddress?: string | null;
};

/** Minimum score to accept a Places result (0–100). */
export const GOOGLE_PLACES_MIN_ACCEPT_SCORE = 48;
/** Stop trying more queries once we hit this score. */
export const GOOGLE_PLACES_HIGH_CONFIDENCE_SCORE = 72;
/** Cap sequential Places searchText calls per company. */
export const GOOGLE_PLACES_MAX_QUERY_ATTEMPTS = 8;

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

function nameTokens(value: string): string[] {
  return normalizeNameForMatch(value)
    .split(' ')
    .filter((t) => t.length > 1 && t !== 'the' && t !== 'and');
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

export function parseCityStateFromHeadquarters(
  headquarters?: string | null
): { city: string; state: string } {
  if (!headquarters) return { city: '', state: '' };
  const parts = headquarters.split(',').map((p) => p.trim()).filter(Boolean);
  if (parts.length >= 2) {
    const statePart = parts[parts.length - 1].replace(/\d{5}(-\d{4})?/, '').trim();
    const state = statePart.slice(0, 2).toUpperCase();
    const city = parts[parts.length - 2] || parts[0];
    return { city, state: /^[A-Z]{2}$/.test(state) ? state : statePart };
  }
  return { city: parts[0] ?? '', state: '' };
}

/**
 * Score a Places candidate against the search name + expected location.
 * Higher is better (0–100).
 */
export function scoreGooglePlaceMatch(
  place: PlaceMatchCandidate,
  searchName: string,
  city: string,
  state: string
): number {
  const placeName = place.displayName?.trim() || '';
  if (!placeName || !searchName.trim()) return 0;

  const pNorm = normalizeNameForMatch(placeName);
  const tNorm = normalizeNameForMatch(searchName);
  const pStrip = normalizeNameForMatch(stripLegalEntitySuffixes(placeName));
  const tStrip = normalizeNameForMatch(stripLegalEntitySuffixes(searchName));

  let score = 0;
  if (pStrip && tStrip && pStrip === tStrip) {
    score = 88;
  } else if (pNorm === tNorm) {
    score = 85;
  } else if (pStrip.includes(tStrip) || tStrip.includes(pStrip)) {
    score = 72;
  } else {
    const j = jaccard(nameTokens(pStrip || pNorm), nameTokens(tStrip || tNorm));
    score = Math.round(j * 78);
  }

  const addr = (place.formattedAddress || '').toUpperCase();
  const stateU = state.trim().toUpperCase();
  const cityU = city.trim().toUpperCase();

  if (stateU.length === 2) {
    // Match ", TX" / " TX " / trailing state
    if (
      addr.includes(`, ${stateU}`) ||
      addr.includes(` ${stateU} `) ||
      addr.endsWith(` ${stateU}`) ||
      new RegExp(`\\b${stateU}\\b`).test(addr)
    ) {
      score += 14;
    }
  }
  if (cityU.length >= 2 && addr.includes(cityU)) {
    score += 12;
  }

  // Soft bonus when place name looks like a mover (reduces random business matches)
  if (/\b(mov|mover|moving|relocation|transfer)\b/i.test(placeName)) {
    score += 4;
  }

  return Math.min(100, score);
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
 * Ordered name/query variants: DBA and suffix-stripped forms first, legal last.
 */
export function buildGooglePlacesQueryVariants(
  input: CompanyEnrichmentInput
): GooglePlacesQueryVariant[] {
  const geo = parseCityStateFromHeadquarters(input.headquarters);
  const city = (input.city ?? geo.city ?? '').trim();
  const state = (input.state ?? geo.state ?? '').trim().toUpperCase().slice(0, 2);
  const category = (input.businessCategory?.trim() || 'moving company').trim();

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
  if (dba) {
    pushUniqueName(names, 'dba_stripped', stripLegalEntitySuffixes(dba));
    pushUniqueName(names, 'dba', dba);
  }
  pushUniqueName(names, 'preferred_stripped', stripLegalEntitySuffixes(preferred));
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

  const pushQuery = (strategy: string, searchName: string, textQuery: string) => {
    const q = textQuery.trim().replace(/\s+/g, ' ');
    if (q.length < 3) return;
    const key = q.toLowerCase();
    if (seenQuery.has(key)) return;
    seenQuery.add(key);
    variants.push({ strategy, searchName, textQuery: q });
  };

  for (const { strategy, name } of names) {
    // Primary shape: name + category + geo (matches existing mover enrichment)
    pushQuery(
      `${strategy}+cat+geo`,
      name,
      [name, category, city, state].filter(Boolean).join(' ')
    );
    // Fallback: name + location only (when category confuses Places)
    pushQuery(
      `${strategy}+geo`,
      name,
      [name, city, state].filter(Boolean).join(' ')
    );
  }

  return variants;
}
