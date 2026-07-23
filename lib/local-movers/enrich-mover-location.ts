import { getCompanyBySlug } from '@/data/seed-companies';
import { parseHeadquarters } from '@/lib/local-movers/parse-headquarters';
import type { LocalMover } from '@/lib/local-movers/types';

/**
 * Attach true HQ city + state from directory headquarters when available.
 * Never stamps the page's state onto an out-of-state carrier.
 */
export function enrichMoverLocation(mover: LocalMover): LocalMover {
  if (mover.headquartersState && mover.city && !looksLikeStreetAddress(mover.city)) {
    return mover;
  }

  if (mover.profileSlug) {
    const company = getCompanyBySlug(mover.profileSlug);
    if (company?.headquarters) {
      const parsed = parseHeadquarters(company.headquarters);
      if (parsed.city || parsed.stateCode) {
        return {
          ...mover,
          city: preferReadableCity(parsed.city, mover.city),
          headquartersState: parsed.stateCode ?? mover.headquartersState,
        };
      }
    }
  }

  // City field sometimes already contains "City, ST"
  const fromCity = parseHeadquarters(mover.city);
  if (fromCity.stateCode) {
    return {
      ...mover,
      city: fromCity.city,
      headquartersState: fromCity.stateCode,
    };
  }

  return mover;
}

export function enrichMoversLocations(movers: LocalMover[]): LocalMover[] {
  return movers.map(enrichMoverLocation);
}

function looksLikeStreetAddress(city: string): boolean {
  return /^\d+\s/.test(city.trim()) || /\b(st|ave|blvd|rd|hwy|suite|ste)\b/i.test(city);
}

function preferReadableCity(parsed: string, fallback: string): string {
  if (parsed && !looksLikeStreetAddress(parsed)) return parsed;
  if (fallback && !looksLikeStreetAddress(fallback)) return fallback;
  return parsed || fallback || '';
}
