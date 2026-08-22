/** Parse Move headquarters strings already present in offline snapshot (no geocoding). */

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

  // "... CITY, ST"
  let m = s.match(/^(.*),\s*([A-Za-z]{2})\s*$/);
  if (m) {
    const city = m[1].split(',').pop()!.trim();
    return { city, state: m[2].toUpperCase(), zip, raw: hq, complete: true };
  }

  // "... CITY, ST," embedded before trailing noise already stripped
  m = s.match(/,\s*([A-Za-z]{2})\s*,/);
  if (m) {
    const state = m[1].toUpperCase();
    const city = s.slice(0, m.index).split(',').pop()!.trim();
    return { city, state, zip, raw: hq, complete: true };
  }

  return { city: s, raw: hq, complete: false };
}
