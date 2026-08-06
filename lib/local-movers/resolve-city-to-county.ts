import { getCountiesForState, getCounty } from '@/lib/local-movers/geography/index';
import { lookupCityCountyAlias } from '@/lib/home/city-county-aliases';
import { localStates } from '@/lib/local-movers/states';
import { slugifyCompanyName } from '@/lib/utils/slugify';
import type { SelectedCounty } from '@/lib/suggestions/service-scope';

function normalizeCity(value: string): string {
  return value
    .toLowerCase()
    .replace(/\bst\.?\s+/g, 'saint ')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function stateSlugFromCode(code: string): string | null {
  const upper = code.trim().toUpperCase();
  return localStates.find((s) => s.code === upper)?.slug ?? null;
}

/**
 * Map a free-text city + state to a county slug for onboard coverage.
 * Nationwide ΓÇö uses offline cityΓåÆcounty aliases, then county seat / name match.
 */
export function resolveCityToCounty(input: {
  city?: string | null;
  stateSlug?: string | null;
  stateCode?: string | null;
  headquarters?: string | null;
}): SelectedCounty | null {
  let stateSlug = (input.stateSlug || '').trim().toLowerCase();
  let stateCode = (input.stateCode || '').trim().toUpperCase();

  let city = (input.city || '').trim();
  if (!city && input.headquarters) {
    const parts = input.headquarters.split(',').map((p) => p.trim());
    if (parts[0]) city = parts[0];
    if (!stateCode && parts.length > 1) {
      const maybeCode = parts[parts.length - 1]
        ?.replace(/[^A-Za-z]/g, '')
        .trim()
        .toUpperCase();
      if (maybeCode?.length === 2) stateCode = maybeCode;
    }
  }

  if (!stateSlug && stateCode) {
    stateSlug = stateSlugFromCode(stateCode) || '';
  }
  if (!stateCode && stateSlug) {
    stateCode = localStates.find((s) => s.slug === stateSlug)?.code || '';
  }

  if (!stateSlug || !city) return null;

  // Offline alias (authoritative for major metros)
  if (stateCode) {
    const aliasSlug = lookupCityCountyAlias(city, stateCode);
    if (aliasSlug) {
      const county = getCounty(stateSlug, aliasSlug);
      if (county) {
        return {
          stateSlug,
          countySlug: county.slug,
          name: county.name,
        };
      }
    }
  }

  const cityNorm = normalizeCity(city);
  const citySlug = slugifyCompanyName(city);
  const counties = getCountiesForState(stateSlug);
  let best: { county: (typeof counties)[0]; score: number } | null = null;

  for (const county of counties) {
    let score = 0;
    const seat = county.seat ? normalizeCity(county.seat) : '';
    const name = normalizeCity(county.name);
    if (seat && seat === cityNorm) score = 100;
    else if (seat && (seat.includes(cityNorm) || cityNorm.includes(seat))) score = 80;
    else if (name === cityNorm || name === `${cityNorm} county`) score = 70;
    else if (county.slug === citySlug || county.slug.startsWith(citySlug)) score = 60;
    else if (name.includes(cityNorm) || cityNorm.includes(name.replace(/ county$/, ''))) {
      score = 40;
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { county, score };
    }
  }

  if (!best || best.score < 40) return null;
  return {
    stateSlug,
    countySlug: best.county.slug,
    name: best.county.name,
  };
}
