import { washingtonCountyResearch } from '@/data/washington-county-research';
import { promoteStateResearchMap } from '@/data/deep-county-research/enrichment';
import type { DeepCountyResearch } from '@/data/deep-county-research/types';

const WA_WAVE3_SLUGS = ['king', 'pierce', 'snohomish', 'spokane', 'clark', 'thurston'] as const;

const WA_METRO_SLUGS = new Set(['king', 'pierce', 'snohomish', 'spokane']);

const waSubset = Object.fromEntries(
  WA_WAVE3_SLUGS.filter((slug) => washingtonCountyResearch[slug]).map((slug) => [
    slug,
    washingtonCountyResearch[slug],
  ])
);

export const washingtonDeepCountyResearch: Record<string, DeepCountyResearch> =
  promoteStateResearchMap('washington', waSubset, WA_METRO_SLUGS);