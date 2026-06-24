import { getCountiesForState } from '@/lib/local-movers/geography/index';
import { getCountyPath, getStatePath } from '@/lib/local-movers/index';
import { isCuratedState } from '@/lib/local-movers/curated-states';
import { localStates } from '@/lib/local-movers/states';
import type { MapSearchResult, MapStateMeta } from '@/lib/map/types';

export function buildStatesMeta(): MapStateMeta[] {
  return localStates.map((state) => ({
    slug: state.slug,
    name: state.name,
    code: state.code,
    curated: isCuratedState(state.slug),
    countyCount: getCountiesForState(state.slug).length,
    href: getStatePath(state.slug),
  }));
}

export function buildMapSearchIndex(): MapSearchResult[] {
  const results: MapSearchResult[] = [];

  for (const state of localStates) {
    results.push({
      type: 'state',
      label: state.name,
      sublabel: state.code,
      href: getStatePath(state.slug),
      stateSlug: state.slug,
    });

    for (const county of getCountiesForState(state.slug)) {
      results.push({
        type: 'county',
        label: county.name,
        sublabel: `${state.name} (${state.code})`,
        href: getCountyPath(state.slug, county.slug),
        stateSlug: state.slug,
      });
    }
  }

  return results;
}