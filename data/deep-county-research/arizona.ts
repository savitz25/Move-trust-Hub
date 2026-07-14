import { arizonaCountyResearch } from '@/data/arizona-county-research';
import { promoteStateResearchMap } from '@/data/deep-county-research/enrichment';
import type { DeepCountyResearch } from '@/data/deep-county-research/types';

const AZ_WAVE3_SLUGS = ['maricopa', 'pima', 'pinal', 'yavapai', 'mohave'] as const;

const AZ_METRO_SLUGS = new Set(['maricopa', 'pima']);

const azSubset = Object.fromEntries(
  AZ_WAVE3_SLUGS.filter((slug) => arizonaCountyResearch[slug]).map((slug) => [
    slug,
    arizonaCountyResearch[slug],
  ])
);

export const arizonaDeepCountyResearch: Record<string, DeepCountyResearch> =
  promoteStateResearchMap('arizona', azSubset, AZ_METRO_SLUGS);