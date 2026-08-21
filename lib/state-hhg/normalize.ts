/**
 * Task 011B — deterministic normalization for state registry fields.
 * Preserves observed values separately from normalized values.
 * Google Places requests: 0.
 */

const FRANCHISE_BRAND_PATTERNS: readonly RegExp[] = [
  /\btwo\s*men\s*and\s*a\s*truck\b/i,
  /\ballied\b/i,
  /\bmayflower\b/i,
  /\batlas\b(?:\s+van)?/i,
  /\bcolonial\b(?:\s+van)?/i,
  /\bcollege\s*hunks\b/i,
  /\bpods\b/i,
  /\bu[- ]?haul\b/i,
  /\bnorthamerican\b/i,
  /\bunited\s+van\s+lines\b/i,
  /\bbek\s*ins\b/i,
  /\bwheaton\b/i,
  /\bnational\s+van\s+lines\b/i,
  /\ball\s+my\s+sons\b/i,
  /\bbellhop\b/i,
];

export function normalizeUsdot(value: string | null | undefined): string | null {
  if (!value) return null;
  const digits = String(value).replace(/\D/g, '');
  if (!digits || digits.length < 5 || digits.length > 8) return null;
  return digits.replace(/^0+/, '') || null;
}

export function normalizePhone(value: string | null | undefined): string | null {
  if (!value) return null;
  const digits = String(value).replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('1')) return digits.slice(1);
  if (digits.length === 10) return digits;
  return null;
}

export function normalizeEmail(value: string | null | undefined): string | null {
  if (!value) return null;
  const v = String(value).trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return null;
  return v;
}

export function normalizePostalCode(value: string | null | undefined): string | null {
  if (!value) return null;
  const m = String(value).match(/\b(\d{5})(?:-\d{4})?\b/);
  return m ? m[1] : null;
}

export function normalizeStateCode(value: string | null | undefined): string | null {
  if (!value) return null;
  const v = String(value).trim().toUpperCase();
  return /^[A-Z]{2}$/.test(v) ? v : null;
}

/** Irreversible-safe name key for exact matching only (not fuzzy). */
export function normalizeLegalName(value: string | null | undefined): string | null {
  if (!value) return null;
  let s = String(value).toUpperCase();
  s = s.replace(/&/g, ' AND ');
  s = s.replace(/[^A-Z0-9\s]/g, ' ');
  s = s.replace(
    /\b(INCORPORATED|INC|LLC|L\.?L\.?C\.?|CORPORATION|CORP|CO|LTD|LIMITED|LP|LLP|PLC|PC|PLLC|DBA|THE)\b/g,
    ' '
  );
  s = s.replace(/\s+/g, ' ').trim();
  return s.length ? s : null;
}

export function normalizeAddressLine(value: string | null | undefined): string | null {
  if (!value) return null;
  let s = String(value).toUpperCase();
  s = s.replace(/[.,#]/g, ' ');
  s = s.replace(/\b(STREET|STR)\b/g, 'ST');
  s = s.replace(/\b(AVENUE|AVE\.?)\b/g, 'AVE');
  s = s.replace(/\b(BOULEVARD|BLVD\.?)\b/g, 'BLVD');
  s = s.replace(/\b(ROAD|RD\.?)\b/g, 'RD');
  s = s.replace(/\b(DRIVE|DR\.?)\b/g, 'DR');
  s = s.replace(/\b(SUITE|STE\.?|UNIT|APT\.?|APARTMENT)\b/g, 'STE');
  s = s.replace(/\s+/g, ' ').trim();
  return s.length ? s : null;
}

export function parseCityStateZipFromLocation(location: string | null | undefined): {
  city: string | null;
  state: string | null;
  postalCode: string | null;
  addressLine: string | null;
} {
  if (!location) {
    return { city: null, state: null, postalCode: null, addressLine: null };
  }
  const cleaned = location.replace(/\s+/g, ' ').trim();
  const m = cleaned.match(/^(.*?),\s*([^,]+),\s*([A-Z]{2})\s+(\d{5})(?:-\d{4})?\s*$/i);
  if (m) {
    return {
      addressLine: m[1].trim(),
      city: m[2].trim(),
      state: m[3].toUpperCase(),
      postalCode: m[4],
    };
  }
  const loose = cleaned.match(/,\s*([A-Z]{2})\s+(\d{5})(?:-\d{4})?\s*$/i);
  if (loose) {
    const before = cleaned.slice(0, loose.index).trim();
    const parts = before.split(',').map((p) => p.trim());
    const city = parts.length >= 2 ? parts[parts.length - 1] : null;
    const addressLine = parts.length >= 2 ? parts.slice(0, -1).join(', ') : before;
    return {
      addressLine,
      city,
      state: loose[1].toUpperCase(),
      postalCode: loose[2],
    };
  }
  return { city: null, state: null, postalCode: null, addressLine: cleaned };
}

export function isFranchiseOrNetworkBrandName(name: string | null | undefined): boolean {
  if (!name) return false;
  return FRANCHISE_BRAND_PATTERNS.some((re) => re.test(name));
}

export function parseFdacsDate(value: string | null | undefined): string | null {
  if (!value) return null;
  const m = String(value).trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return null;
  const mm = m[1].padStart(2, '0');
  const dd = m[2].padStart(2, '0');
  return `${m[3]}-${mm}-${dd}`;
}

export function hashEvidence(parts: Record<string, unknown>): string {
  const payload = JSON.stringify(parts, Object.keys(parts).sort());
  // FNV-1a 32-bit — stable, dependency-free
  let h = 0x811c9dc5;
  for (let i = 0; i < payload.length; i++) {
    h ^= payload.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (`00000000` + (h >>> 0).toString(16)).slice(-8);
}
