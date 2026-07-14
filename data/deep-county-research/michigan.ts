import { michiganCountyResearch } from '@/data/michigan-county-research';
import { promoteStateResearchMap } from '@/data/deep-county-research/enrichment';
import type { DeepCountyResearch } from '@/data/deep-county-research/types';

const MI_WAVE3_SLUGS = [
  'wayne',
  'oakland',
  'macomb',
  'kent',
  'washtenaw',
  'ingham',
  'genesee',
  'kalamazoo',
  'ottawa',
  'saginaw',
] as const;

const MI_METRO_SLUGS = new Set([
  'wayne',
  'oakland',
  'macomb',
  'kent',
  'washtenaw',
  'ingham',
  'genesee',
]);

const miSubset = Object.fromEntries(
  MI_WAVE3_SLUGS.filter((slug) => michiganCountyResearch[slug]).map((slug) => [
    slug,
    michiganCountyResearch[slug],
  ])
);

export const michiganDeepCountyResearch: Record<string, DeepCountyResearch> =
  promoteStateResearchMap('michigan', miSubset, MI_METRO_SLUGS);