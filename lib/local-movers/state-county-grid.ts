import { hasDeepCountyResearch } from '@/data/deep-county-research/index';
import { classifyCountyContentTier } from '@/lib/local-movers/county-content-quality';
import { evaluateCountyIndexability } from '@/lib/local-movers/county-indexability';
import { getCountyMarketMoverCount } from '@/lib/local-movers/county-market-mover-counts';
import { hasCountyResearch } from '@/lib/local-movers/county-research';
import { getCountiesForState } from '@/lib/local-movers/geography/index';
import { getMoversForCounty } from '@/lib/local-movers/index';
import type { LocalCounty } from '@/lib/local-movers/types';

export type CountyGridEntry = {
  county: LocalCounty;
  moverCount: number;
  isDeepGuide: boolean;
  indexTier: 'index' | 'noindex';
  sortPriority: number;
};

function resolveMoverCount(stateSlug: string, countySlug: string): number {
  const listed = getMoversForCounty(stateSlug, countySlug)?.movers.length ?? 0;
  if (listed > 0) return listed;
  return getCountyMarketMoverCount(stateSlug, countySlug) ?? 0;
}

function computeSortPriority(entry: Omit<CountyGridEntry, 'sortPriority'>): number {
  if (entry.isDeepGuide && entry.indexTier === 'index') return 400;
  if (entry.indexTier === 'index' && entry.moverCount >= 8) return 300;
  if (entry.indexTier === 'index') return 200;
  if (entry.moverCount > 0) return 100;
  return 0;
}

export function buildStateCountyGridEntries(stateSlug: string): CountyGridEntry[] {
  return getCountiesForState(stateSlug).map((county) => {
    const moverCount = resolveMoverCount(stateSlug, county.slug);
    const indexTier = evaluateCountyIndexability(stateSlug, county.slug).tier;
    const contentTier = classifyCountyContentTier(
      stateSlug,
      county.slug,
      hasCountyResearch(stateSlug, county.slug)
    );
    const isDeepGuide =
      hasDeepCountyResearch(stateSlug, county.slug) ||
      contentTier === 'grok_heavy_original';

    const base = { county, moverCount, isDeepGuide, indexTier };
    return { ...base, sortPriority: computeSortPriority(base) };
  });
}

export function sortCountyGridEntries(entries: CountyGridEntry[]): CountyGridEntry[] {
  return [...entries].sort((a, b) => {
    if (b.sortPriority !== a.sortPriority) return b.sortPriority - a.sortPriority;
    if (b.moverCount !== a.moverCount) return b.moverCount - a.moverCount;
    return a.county.name.localeCompare(b.county.name);
  });
}

export function summarizeStateCountyGrid(entries: CountyGridEntry[]) {
  return {
    deepGuides: entries.filter((e) => e.isDeepGuide && e.indexTier === 'index').length,
    indexed: entries.filter((e) => e.indexTier === 'index').length,
    total: entries.length,
  };
}