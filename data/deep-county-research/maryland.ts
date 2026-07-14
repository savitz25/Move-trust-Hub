import { marylandCountyResearch } from '@/data/maryland-county-research';
import { promoteStateResearchMap } from '@/data/deep-county-research/enrichment';
import type { DeepCountyResearch } from '@/data/deep-county-research/types';

const MD_WAVE3_SLUGS = [
  'montgomery',
  'prince-georges',
  'baltimore',
  'anne-arundel',
  'howard',
  'harford',
  'frederick',
  'charles',
  'calvert',
  'baltimore-city',
] as const;

const MD_METRO_SLUGS = new Set([
  'montgomery',
  'prince-georges',
  'baltimore',
  'anne-arundel',
  'howard',
  'baltimore-city',
]);

const mdSubset = Object.fromEntries(
  MD_WAVE3_SLUGS.filter((slug) => marylandCountyResearch[slug]).map((slug) => [
    slug,
    marylandCountyResearch[slug],
  ])
);

export const marylandDeepCountyResearch: Record<string, DeepCountyResearch> =
  promoteStateResearchMap('maryland', mdSubset, MD_METRO_SLUGS);