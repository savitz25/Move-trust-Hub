/**
 * Geography helpers for discovery projection.
 * No geocoding / Places / external enrichment.
 */

import { getCounty } from '@/lib/local-movers/geography';
import { US_STATES } from '@/lib/verify-dot/us-states';
import type { CoverageCountyRef, DiscoveryServiceArea } from './types';

export type ParsedHeadquarters = {
  city?: string;
  state?: string;
  zip?: string;
  raw: string;
  complete: boolean;
};

/**
 * Best-effort parse of existing headquarters text.
 * Does NOT invent state from city-only strings (ambiguous).
 */
export function parseHeadquarters(hq: string | null | undefined): ParsedHeadquarters | null {
  if (!hq) return null;
  let s = String(hq).replace(/\s+/g, ' ').trim();
  if (!s) return null;

  const zipM = s.match(/\b(\d{5})(?:-\d{4})?\s*$/);
  const zip = zipM ? zipM[1] : undefined;
  if (zipM) s = s.slice(0, zipM.index).replace(/[,\s]+$/, '').trim();

  let m = s.match(/^(.*),\s*([A-Za-z]{2})\s*$/);
  if (m) {
    const city = m[1].split(',').pop()!.trim();
    return { city, state: m[2].toUpperCase(), zip, raw: hq, complete: true };
  }

  m = s.match(/,\s*([A-Za-z]{2})\s*,/);
  if (m) {
    const state = m[1].toUpperCase();
    const city = s.slice(0, m.index).split(',').pop()!.trim();
    return { city, state, zip, raw: hq, complete: true };
  }

  return { city: s, raw: hq, complete: false };
}

const STATE_SLUG_TO_CODE: Record<string, string> = Object.fromEntries(
  US_STATES.map((s) => [
    s.label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, ''),
    s.value,
  ])
);
// Explicit overrides
STATE_SLUG_TO_CODE['district-of-columbia'] = 'DC';

export function stateSlugToCode(stateSlug: string): string | undefined {
  return STATE_SLUG_TO_CODE[stateSlug.trim().toLowerCase()];
}

export function stateCodeToSlug(code: string): string {
  const c = code.toUpperCase();
  const hit = US_STATES.find((s) => s.value === c);
  if (!hit) return code.toLowerCase();
  return hit.label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Normalize county slug → stable display label (e.g. "Monmouth County"). */
export function formatCountyLabel(stateSlug: string, countySlug: string): string {
  const meta = getCounty(stateSlug, countySlug);
  const base = meta?.name?.trim() || titleCaseSlug(countySlug);
  if (/county$/i.test(base) || /parish$/i.test(base) || /^district of columbia$/i.test(base)) {
    return base;
  }
  // Alaska boroughs / census areas keep raw name when known
  if (meta?.name && /(borough|census area|municipality|city and borough)$/i.test(meta.name)) {
    return meta.name;
  }
  return `${base} County`;
}

function titleCaseSlug(slug: string): string {
  return slug
    .split('-')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/**
 * Build service_areas from structured coverage counties only.
 * Does NOT invent city/ZIP from county membership.
 */
export function serviceAreasFromCoverage(
  counties: CoverageCountyRef[] | undefined
): DiscoveryServiceArea[] {
  if (!counties?.length) return [];
  const areas: DiscoveryServiceArea[] = [];
  const seenCounty = new Set<string>();
  const seenState = new Set<string>();

  // Sort for deterministic output
  const sorted = [...counties].sort((a, b) =>
    `${a.stateSlug}/${a.countySlug}`.localeCompare(`${b.stateSlug}/${b.countySlug}`)
  );

  for (const c of sorted) {
    const state = stateSlugToCode(c.stateSlug);
    if (!state) continue;
    const countyLabel = c.name?.trim() || formatCountyLabel(c.stateSlug, c.countySlug);
    const ck = `${state}:${countyLabel.toLowerCase()}`;
    if (!seenCounty.has(ck)) {
      seenCounty.add(ck);
      areas.push({ kind: 'county', county: countyLabel, state });
    }
    if (!seenState.has(state)) {
      seenState.add(state);
      areas.push({ kind: 'state', state });
    }
  }

  return areas;
}
