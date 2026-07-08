import 'server-only';

import { revalidatePath } from 'next/cache';
import { parseHeadquarters, normalizePlace } from '@/lib/fmcsa/refresh/parse-headquarters';
import { getCountiesForState } from '@/lib/local-movers/geography/index';
import { localStates } from '@/lib/local-movers/states';
import { logger } from '@/lib/logging/logger';

function stateSlugFromCode(stateCode: string | null): string | null {
  if (!stateCode) return null;
  return localStates.find((s) => s.code === stateCode)?.slug ?? null;
}

function countiesForCity(stateSlug: string, city: string | null): string[] {
  if (!city) return [];
  const normalizedCity = normalizePlace(city);
  if (!normalizedCity) return [];

  return getCountiesForState(stateSlug)
    .filter((county) => {
      const seat = county.seat ? normalizePlace(county.seat) : '';
      const countyName = normalizePlace(county.name);
      return (
        seat === normalizedCity ||
        seat.includes(normalizedCity) ||
        normalizedCity.includes(seat) ||
        countyName.includes(normalizedCity)
      );
    })
    .map((county) => county.slug);
}

/**
 * Revalidate local-movers pages tied to the company's office address.
 */
export function revalidateDestinationPaths(headquarters: string | null | undefined): void {
  const { city, state } = parseHeadquarters(headquarters);
  const stateSlug = stateSlugFromCode(state);
  if (!stateSlug) return;

  revalidatePath(`/local-movers/${stateSlug}`, 'page');
  revalidatePath(`/local-movers/${stateSlug}`, 'layout');

  const countySlugs = countiesForCity(stateSlug, city);
  for (const countySlug of countySlugs) {
    revalidatePath(`/local-movers/${stateSlug}/${countySlug}`, 'page');
    revalidatePath(`/local-movers/${stateSlug}/${countySlug}`, 'layout');
  }

  logger.info('onboarding.destination_revalidated', {
    stateSlug,
    city,
    countySlugs,
  });
}