import { georgiaCountyResearch } from '@/data/georgia-county-research';
import { promoteStateResearchMap } from '@/data/deep-county-research/enrichment';
import type { DeepCountyResearch } from '@/data/deep-county-research/types';

/** Top Georgia metros and high-traffic counties for Phase 3 deep guides. */
const GA_WAVE3_SLUGS = [
  'fulton',
  'gwinnett',
  'cobb',
  'dekalb',
  'chatham',
  'richmond',
  'bibb',
  'muscogee',
  'hall',
  'cherokee',
  'henry',
  'forsyth',
  'clayton',
  'douglas',
  'fayette',
  'coweta',
  'paulding',
  'barrow',
  'walton',
  'newton',
  'rockdale',
  'bartow',
  'gordon',
  'whitfield',
  'clarke',
  'lowndes',
  'houston',
  'bulloch',
  'effingham',
  'glynn',
] as const;

const GA_METRO_SLUGS = new Set([
  'fulton',
  'gwinnett',
  'cobb',
  'dekalb',
  'chatham',
  'richmond',
  'bibb',
  'cherokee',
  'henry',
  'forsyth',
  'clayton',
]);

const gaSubset = Object.fromEntries(
  GA_WAVE3_SLUGS.filter((slug) => georgiaCountyResearch[slug]).map((slug) => [
    slug,
    georgiaCountyResearch[slug],
  ])
);

export const georgiaDeepCountyResearch: Record<string, DeepCountyResearch> =
  promoteStateResearchMap('georgia', gaSubset, GA_METRO_SLUGS);