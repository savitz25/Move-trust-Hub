import { californiaCountyResearch } from '@/data/california-county-research';
import { promoteStateResearchMap } from '@/data/deep-county-research/enrichment';
import type { DeepCountyResearch } from '@/data/deep-county-research/types';

const CA_METRO_SLUGS = new Set([
  'los-angeles',
  'orange',
  'san-diego',
  'riverside',
  'san-bernardino',
  'santa-clara',
  'alameda',
  'sacramento',
  'contra-costa',
  'san-francisco',
  'ventura',
  'kern',
  'fresno',
  'san-mateo',
]);

export const californiaDeepCountyResearch: Record<string, DeepCountyResearch> =
  promoteStateResearchMap('california', californiaCountyResearch, CA_METRO_SLUGS);