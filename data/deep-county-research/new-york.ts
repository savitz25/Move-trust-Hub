import { newYorkCountyResearch } from '@/data/new-york-county-research';
import { promoteStateResearchMap } from '@/data/deep-county-research/enrichment';
import type { DeepCountyResearch } from '@/data/deep-county-research/types';

const NY_WAVE3_SLUGS = [
  'kings',
  'new-york',
  'queens',
  'bronx',
  'richmond',
  'nassau',
  'suffolk',
  'westchester',
  'erie',
  'monroe',
  'onondaga',
  'albany',
  'dutchess',
  'orange',
  'rockland',
  'putnam',
  'saratoga',
  'schenectady',
  'rensselaer',
  'niagara',
] as const;

const NY_METRO_SLUGS = new Set([
  'kings',
  'new-york',
  'queens',
  'bronx',
  'richmond',
  'nassau',
  'suffolk',
  'westchester',
]);

const nySubset = Object.fromEntries(
  NY_WAVE3_SLUGS.filter((slug) => newYorkCountyResearch[slug]).map((slug) => [
    slug,
    newYorkCountyResearch[slug],
  ])
);

export const newYorkDeepCountyResearch: Record<string, DeepCountyResearch> =
  promoteStateResearchMap('new-york', nySubset, NY_METRO_SLUGS);