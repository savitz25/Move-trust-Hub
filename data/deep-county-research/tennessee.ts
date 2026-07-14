import { tennesseeCountyResearch } from '@/data/tennessee-county-research';
import { promoteStateResearchMap } from '@/data/deep-county-research/enrichment';
import type { DeepCountyResearch } from '@/data/deep-county-research/types';

const TN_WAVE3_SLUGS = [
  'davidson',
  'shelby',
  'knox',
  'hamilton',
  'williamson',
  'rutherford',
  'sumner',
  'wilson',
  'montgomery',
  'maury',
] as const;

const TN_METRO_SLUGS = new Set([
  'davidson',
  'shelby',
  'knox',
  'hamilton',
  'williamson',
  'rutherford',
]);

const tnSubset = Object.fromEntries(
  TN_WAVE3_SLUGS.filter((slug) => tennesseeCountyResearch[slug]).map((slug) => [
    slug,
    tennesseeCountyResearch[slug],
  ])
);

export const tennesseeDeepCountyResearch: Record<string, DeepCountyResearch> =
  promoteStateResearchMap('tennessee', tnSubset, TN_METRO_SLUGS);