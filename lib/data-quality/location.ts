/**
 * Phase 2 — HQ locality parsing integrity.
 * City fields must be locality only (no street / suite fragments).
 */

const STREET_TYPE =
  /\b(st|street|ave|avenue|rd|road|blvd|boulevard|dr|drive|ln|lane|ct|court|cir|circle|way|hwy|highway|pkwy|parkway|pl|place|ter|terrace|trl|trail|aly|alley)\b/i;

const UNIT_TOKEN =
  /\b(suite|ste|unit|apt|apartment|bldg|building|floor|fl|#|rm|room)\b/i;

const PO_BOX = /\b(p\.?\s*o\.?\s*box|post\s*office\s*box)\b/i;

export type LocalityParseResult = {
  city: string;
  stateCode?: string;
  /** True when city looks like street/address and was rejected or cleaned */
  quarantined: boolean;
  reason?: string;
};

/** True if a string looks like a street line rather than a city name. */
export function looksLikeStreetAddress(value: string): boolean {
  const t = value.trim();
  if (!t) return false;
  if (/^\d{1,6}\s/.test(t)) return true;
  if (STREET_TYPE.test(t) && /\d/.test(t)) return true;
  if (UNIT_TOKEN.test(t) && (/\d/.test(t) || /#/.test(t))) return true;
  if (PO_BOX.test(t)) return true;
  // "1234 Main" style without street suffix
  if (/^\d{2,6}\s+[A-Za-z]/.test(t)) return true;
  return false;
}

/**
 * Clean a candidate city token: strip leading street segments when multi-part address
 * already extracted a city, or quarantine if the whole value is a street.
 */
export function sanitizeCityLocality(city: string): LocalityParseResult {
  const raw = (city ?? '').trim();
  if (!raw) return { city: '', quarantined: false };

  // Strip suite tails from otherwise OK city names: "Miami Suite 100" → quarantine
  if (looksLikeStreetAddress(raw)) {
    return {
      city: '',
      quarantined: true,
      reason: 'street_or_suite_in_locality_field',
    };
  }

  // "North Miami Beach" OK; "Main St" not OK even without digits if pure street type
  if (STREET_TYPE.test(raw) && raw.split(/\s+/).length <= 3 && !/[a-z]{4,}/i.test(raw.replace(STREET_TYPE, ''))) {
    return { city: '', quarantined: true, reason: 'street_type_only' };
  }

  // Collapse whitespace / drop trailing unit noise without digits
  const cleaned = raw
    .replace(/\s+/g, ' ')
    .replace(/,+$/, '')
    .trim();

  return { city: cleaned, quarantined: false };
}

export function normalizeLocationLabel(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
