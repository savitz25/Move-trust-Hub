import {
  getUsPlaceIndex,
  normalizePlaceQuery,
  type IndexedPlace,
} from '@/lib/geo/us-place-index';
import type { PlaceSearchHit } from '@/lib/geo/us-place-types';
import { localStates } from '@/lib/local-movers/states';

const STATE_CODE_SET = new Set(localStates.map((s) => s.code.toUpperCase()));
const STATE_BY_CODE = new Map(
  localStates.map((s) => [s.code.toUpperCase(), s])
);
const STATE_BY_NAME = new Map(
  localStates.map((s) => [normalizePlaceQuery(s.name), s])
);
const STATE_BY_SLUG = new Map(localStates.map((s) => [s.slug, s]));

export type ParsedPlaceQuery = {
  cityPart: string;
  stateCode: string | null;
};

/**
 * Parse free text like "boca raton", "boca raton fl", "Boca Raton, FL".
 */
export function parsePlaceQuery(raw: string): ParsedPlaceQuery {
  let q = normalizePlaceQuery(raw);
  if (!q) return { cityPart: '', stateCode: null };

  // "city, st" or "city, state"
  const comma = q.match(/^(.+?),\s*([a-z\s]{2,})$/);
  if (comma) {
    const cityPart = comma[1]!.trim();
    const tail = comma[2]!.trim();
    const code = resolveStateToken(tail);
    if (code) return { cityPart, stateCode: code };
  }

  // trailing 2-letter state code
  const codeTail = q.match(/^(.+?)\s+([a-z]{2})$/);
  if (codeTail) {
    const maybe = codeTail[2]!.toUpperCase();
    if (STATE_CODE_SET.has(maybe)) {
      return { cityPart: codeTail[1]!.trim(), stateCode: maybe };
    }
  }

  // trailing full state name (longest first)
  const tokens = q.split(' ');
  for (let n = Math.min(3, tokens.length - 1); n >= 1; n--) {
    const tail = tokens.slice(-n).join(' ');
    const code = resolveStateToken(tail);
    if (code) {
      return {
        cityPart: tokens.slice(0, -n).join(' ').trim(),
        stateCode: code,
      };
    }
  }

  return { cityPart: q, stateCode: null };
}

function resolveStateToken(token: string): string | null {
  const t = normalizePlaceQuery(token);
  if (t.length === 2 && STATE_CODE_SET.has(t.toUpperCase())) {
    return t.toUpperCase();
  }
  const byName = STATE_BY_NAME.get(t);
  if (byName) return byName.code;
  const bySlug = STATE_BY_SLUG.get(t.replace(/\s+/g, '-'));
  if (bySlug) return bySlug.code;
  return null;
}

function scoreMatch(cityNorm: string, query: string): number {
  if (!query) return 0;
  if (cityNorm === query) return 100;
  if (cityNorm.startsWith(query)) return 85;
  if (cityNorm.includes(` ${query}`) || cityNorm.includes(query)) return 70;

  const qTokens = query.split(' ').filter(Boolean);
  const cTokens = cityNorm.split(' ').filter(Boolean);
  if (!qTokens.length) return 0;

  let hit = 0;
  for (const qt of qTokens) {
    if (cTokens.some((ct) => ct.startsWith(qt) || ct === qt)) hit += 1;
  }
  if (hit === qTokens.length) return 55 + hit * 5;
  if (hit > 0) return 25 + hit * 10;
  return 0;
}

function toHit(place: IndexedPlace, score: number): PlaceSearchHit {
  return {
    city: place.city,
    stateCode: place.stateCode,
    stateSlug: place.stateSlug,
    stateName: place.stateName,
    label: `${place.city}, ${place.stateCode}`,
    countySlug: place.countySlug,
    countyName: place.countyName,
    priority: place.priority,
    score,
  };
}

/**
 * Search the offline US place index for City, State matches.
 * Prefer high priority (population / coverage) when names collide.
 */
export function searchUsPlaces(
  rawQuery: string,
  options?: { limit?: number }
): PlaceSearchHit[] {
  const limit = options?.limit ?? 8;
  const { cityPart, stateCode } = parsePlaceQuery(rawQuery);
  if (!cityPart || cityPart.length < 2) return [];

  const index = getUsPlaceIndex();
  const hits: PlaceSearchHit[] = [];

  for (const place of index) {
    if (stateCode && place.stateCode !== stateCode) continue;
    const matchScore = scoreMatch(place.cityNorm, cityPart);
    if (matchScore < 25) continue;
    hits.push(toHit(place, matchScore));
  }

  hits.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.priority !== a.priority) return b.priority - a.priority;
    return a.label.localeCompare(b.label);
  });

  // Deduplicate exact city|state
  const seen = new Set<string>();
  const unique: PlaceSearchHit[] = [];
  for (const h of hits) {
    const key = `${h.city.toLowerCase()}|${h.stateCode}`;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(h);
    if (unique.length >= limit) break;
  }

  return unique;
}

/**
 * True when the top hit is clearly preferred over alternatives
 * (single match, or score/priority gap is large).
 */
export function isHighConfidencePlaceMatch(hits: PlaceSearchHit[]): boolean {
  if (hits.length === 0) return false;
  if (hits.length === 1) return hits[0]!.score >= 55;
  const [a, b] = hits;
  if (!a || !b) return false;
  if (a.score >= 100 && a.score > b.score) return true;
  if (a.score >= 85 && a.score - b.score >= 15) return true;
  if (a.score >= 70 && a.priority - b.priority >= 100 && a.score >= b.score) {
    return true;
  }
  return false;
}

export function getStateMeta(stateCode: string) {
  return STATE_BY_CODE.get(stateCode.toUpperCase()) ?? null;
}
