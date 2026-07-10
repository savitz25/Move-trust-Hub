import 'server-only';

import { revalidatePath } from 'next/cache';
import { resolveDestinationsFromHeadquarters } from '@/lib/destinations/resolve-from-headquarters';
import { getMarketBySlug } from '@/lib/destinations/markets';
import { parseHeadquarters } from '@/lib/fmcsa/refresh/parse-headquarters';
import { localStates } from '@/lib/local-movers/states';
import { logger } from '@/lib/logging/logger';

function stateSlugFromCode(stateCode: string | null): string | null {
  if (!stateCode) return null;
  return localStates.find((s) => s.code === stateCode)?.slug ?? null;
}

/**
 * Revalidate local-movers and moving-to pages tied to the company's office address.
 */
export function revalidateDestinationPaths(headquarters: string | null | undefined): void {
  const { state } = parseHeadquarters(headquarters);
  const stateSlug = stateSlugFromCode(state);
  if (!stateSlug) return;

  revalidatePath(`/local-movers/${stateSlug}`, 'page');
  revalidatePath(`/local-movers/${stateSlug}`, 'layout');

  const resolved = resolveDestinationsFromHeadquarters(headquarters);
  const destinationSlugs = new Set<string>();

  for (const entry of resolved) {
    revalidatePath(`/local-movers/${entry.stateSlug}/${entry.countySlug}`, 'page');
    revalidatePath(`/local-movers/${entry.stateSlug}/${entry.countySlug}`, 'layout');
    entry.marketSlugs.forEach((slug) => destinationSlugs.add(slug));
  }

  revalidatePath('/moving-to', 'page');

  if (stateSlug) {
    revalidatePath(`/moving-to/${stateSlug}`, 'page');
    revalidatePath(`/moving-to/${stateSlug}`, 'layout');
  }

  for (const destinationSlug of destinationSlugs) {
    const market = getMarketBySlug(destinationSlug);
    const cluster = market?.clusterParent ?? stateSlug;
    revalidatePath(`/moving-to/${cluster}/${destinationSlug}`, 'page');
    revalidatePath(`/moving-to/${cluster}/${destinationSlug}`, 'layout');
    if (!market?.clusterParent) {
      revalidatePath(`/moving-to/${destinationSlug}`, 'page');
    }
  }

  logger.info('onboarding.destination_revalidated', {
    stateSlug,
    headquarters,
    counties: resolved.map((entry) => `${entry.stateSlug}/${entry.countySlug}`),
    destinationSlugs: [...destinationSlugs],
  });
}