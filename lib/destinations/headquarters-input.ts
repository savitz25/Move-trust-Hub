import { normalizePlace, parseHeadquarters, type ParsedHeadquarters } from '@/lib/fmcsa/refresh/parse-headquarters';

export type HeadquartersResolutionInput = {
  headquarters?: string | null;
  fmcsaRaw?: Record<string, unknown> | null;
  legalName?: string | null;
};

export type NormalizedHeadquarters = {
  effectiveAddress: string | null;
  parsed: ParsedHeadquarters;
  source: 'fmcsa_phy' | 'headquarters_field' | 'none';
};

type FmcsaPhyFields = {
  phyStreet?: string;
  phyCity?: string;
  phyState?: string;
  phyZipcode?: string;
};

function readFmcsaPhy(raw: Record<string, unknown> | null | undefined): FmcsaPhyFields | null {
  if (!raw || typeof raw !== 'object') return null;
  const phyCity = typeof raw.phyCity === 'string' ? raw.phyCity.trim() : '';
  const phyState = typeof raw.phyState === 'string' ? raw.phyState.trim() : '';
  if (!phyCity || !phyState) return null;
  return {
    phyStreet: typeof raw.phyStreet === 'string' ? raw.phyStreet.trim() : undefined,
    phyCity,
    phyState,
    phyZipcode: typeof raw.phyZipcode === 'string' ? raw.phyZipcode.trim() : undefined,
  };
}

export function formatFmcsaPhyAddress(phy: FmcsaPhyFields): string {
  return [phy.phyStreet, phy.phyCity, phy.phyState, phy.phyZipcode].filter(Boolean).join(', ');
}

/** Prefer FMCSA physical city/state over a generic headquarters string. */
export function normalizeHeadquartersInput(
  input: HeadquartersResolutionInput
): NormalizedHeadquarters {
  const phy = readFmcsaPhy(input.fmcsaRaw ?? null);
  if (phy) {
    const effectiveAddress = formatFmcsaPhyAddress(phy);
    return {
      effectiveAddress,
      parsed: parseHeadquarters(effectiveAddress),
      source: 'fmcsa_phy',
    };
  }

  const hq = input.headquarters?.trim() ?? '';
  if (hq) {
    return {
      effectiveAddress: hq,
      parsed: parseHeadquarters(hq),
      source: 'headquarters_field',
    };
  }

  return {
    effectiveAddress: null,
    parsed: { city: null, state: null },
    source: 'none',
  };
}

/** Collect city-like tokens from comma-separated address segments (skips street + zip-only parts). */
export function extractAddressCityCandidates(address: string | null | undefined): string[] {
  if (!address?.trim()) return [];

  const parts = address
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);

  const candidates: string[] = [];
  for (const part of parts) {
    if (/^\d{5}(-\d{4})?$/.test(part)) continue;
    if (/^[A-Z]{2}(\s+\d{5}(-\d{4})?)?$/i.test(part)) continue;
    if (/\d{3,}/.test(part) && /(st|street|ave|avenue|rd|road|blvd|boulevard|dr|drive|ln|lane|way|suite|ste|unit|#)/i.test(part)) {
      continue;
    }
    const cleaned = part.replace(/\s+[A-Z]{2}(\s+\d{5}(-\d{4})?)?$/i, '').trim();
    if (cleaned.length >= 3) candidates.push(cleaned);
  }

  return [...new Set(candidates)];
}

export function pickPrimaryCity(
  parsedCity: string | null,
  detectedCities: string[]
): string | null {
  if (!detectedCities.length) return parsedCity;

  const unique = [...new Set(detectedCities.map((c) => c.trim()).filter(Boolean))];
  const hasAtlanta = unique.some((c) => normalizePlace(c) === 'atlanta');
  const suburbs = unique.filter((c) => normalizePlace(c) !== 'atlanta');

  if (hasAtlanta && suburbs.length > 0) {
    const parsedNorm = parsedCity ? normalizePlace(parsedCity) : '';
    if (!parsedNorm || parsedNorm === 'atlanta') {
      return suburbs[0] ?? parsedCity;
    }
  }

  return parsedCity ?? unique[0] ?? null;
}