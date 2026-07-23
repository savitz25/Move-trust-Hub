import { newJerseyCountyResearch } from '@/data/new-jersey-county-research';
import { promoteStateResearchMap } from '@/data/deep-county-research/enrichment';
import type { DeepCountyResearch } from '@/data/deep-county-research/types';

const NJ_WAVE3_SLUGS = [
  'hudson',
  'essex',
  'bergen',
  'middlesex',
  'monmouth',
  'union',
  'passaic',
  'morris',
  'camden',
  'burlington',
] as const;

/** Tier-1 upgrade wave — shore, capital, affluent suburban, South Jersey, rural NW. */
const NJ_WAVE4_SLUGS = [
  'ocean',
  'mercer',
  'somerset',
  'atlantic',
  'gloucester',
  'hunterdon',
  'sussex',
  'warren',
] as const;

const NJ_DEEP_SLUGS = [...NJ_WAVE3_SLUGS, ...NJ_WAVE4_SLUGS] as const;

const NJ_METRO_SLUGS = new Set([
  'hudson',
  'essex',
  'bergen',
  'middlesex',
  'monmouth',
  'union',
  'ocean',
  'mercer',
  'somerset',
  'atlantic',
  'gloucester',
]);

const njSubset = Object.fromEntries(
  NJ_DEEP_SLUGS.filter((slug) => newJerseyCountyResearch[slug]).map((slug) => [
    slug,
    newJerseyCountyResearch[slug],
  ])
);

export const newJerseyDeepCountyResearch: Record<string, DeepCountyResearch> =
  promoteStateResearchMap('new-jersey', njSubset, NJ_METRO_SLUGS);