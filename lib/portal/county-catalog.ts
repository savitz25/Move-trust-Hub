import 'server-only';

import { getCountiesForState } from '@/lib/local-movers/geography/index';
import { localStates } from '@/lib/local-movers/states';
import type { CatalogCounty, CountyCatalog } from '@/lib/portal/county-catalog-types';

export type { CatalogCounty, CountyCatalog };

/**
 * Build a client-safe county catalog keyed by USPS state code.
 * Keeps full geography modules out of the browser bundle.
 */
export function buildCountyCatalog(): CountyCatalog {
  const catalog: CountyCatalog = {};
  for (const state of localStates) {
    catalog[state.code] = getCountiesForState(state.slug).map((c) => ({
      slug: c.slug,
      name: c.name,
    }));
  }
  return catalog;
}

export function stateCodeToSlug(code: string): string | null {
  const upper = code.trim().toUpperCase();
  return localStates.find((s) => s.code === upper)?.slug ?? null;
}

export function stateSlugToCode(slug: string): string | null {
  return localStates.find((s) => s.slug === slug)?.code ?? null;
}

/** Canonical storage key: `{stateSlug}/{countySlug}` */
export function countyStorageKey(stateSlug: string, countySlug: string): string {
  return `${stateSlug}/${countySlug}`;
}

export function parseCountyStorageKey(
  key: string
): { stateSlug: string; countySlug: string } | null {
  const trimmed = key.trim().toLowerCase();
  const slash = trimmed.indexOf('/');
  if (slash <= 0) return null;
  const stateSlug = trimmed.slice(0, slash);
  const countySlug = trimmed.slice(slash + 1);
  if (!stateSlug || !countySlug) return null;
  return { stateSlug, countySlug };
}
