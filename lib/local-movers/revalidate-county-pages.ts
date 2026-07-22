import 'server-only';

import { revalidatePath, revalidateTag } from 'next/cache';
import { COMPANIES_DIRECTORY_TAG } from '@/lib/directory/revalidate-company';
import { APPROVED_COUNTY_MOVERS_TAG } from '@/lib/local-movers/approved-county-movers-tag';
import { logger } from '@/lib/logging/logger';

export type CountyPathRef = {
  stateSlug: string;
  countySlug: string;
};

/**
 * Bust approved-mover data cache + static county/state routes after local publish.
 * Also busts /companies directory so state/county filters pick up new assignments.
 * Safe to call from server actions and assign-selected-counties.
 */
export function revalidateLocalMoverCountyPages(
  counties: CountyPathRef[],
  options?: { companySlug?: string; reason?: string }
): void {
  try {
    revalidateTag(APPROVED_COUNTY_MOVERS_TAG);
    revalidateTag(COMPANIES_DIRECTORY_TAG);
  } catch (err) {
    logger.warn('local_movers.revalidate_tag_failed', {
      message: err instanceof Error ? err.message : String(err),
      reason: options?.reason,
    });
  }

  try {
    revalidatePath('/local-movers', 'page');
    revalidatePath('/local-movers', 'layout');
    revalidatePath('/companies', 'page');

    const stateSlugs = new Set<string>();
    for (const county of counties) {
      const stateSlug = county.stateSlug?.trim();
      const countySlug = county.countySlug?.trim();
      if (!stateSlug || !countySlug) continue;
      stateSlugs.add(stateSlug);
      const path = `/local-movers/${stateSlug}/${countySlug}`;
      revalidatePath(path, 'page');
      revalidatePath(path, 'layout');
    }

    for (const stateSlug of stateSlugs) {
      revalidatePath(`/local-movers/${stateSlug}`, 'page');
      revalidatePath(`/local-movers/${stateSlug}`, 'layout');
    }

    if (options?.companySlug) {
      revalidatePath(`/companies/${options.companySlug}`, 'page');
    }

    logger.info('local_movers.revalidated', {
      countyCount: counties.length,
      states: [...stateSlugs],
      companySlug: options?.companySlug ?? null,
      reason: options?.reason ?? 'local_publish',
    });
  } catch (err) {
    logger.warn('local_movers.revalidate_paths_failed', {
      message: err instanceof Error ? err.message : String(err),
      reason: options?.reason,
    });
  }
}
