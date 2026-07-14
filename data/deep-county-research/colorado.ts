import { coloradoCountyResearch } from '@/data/colorado-county-research';
import { promoteStateResearchMap } from '@/data/deep-county-research/enrichment';
import type { DeepCountyResearch } from '@/data/deep-county-research/types';

const CO_WAVE3_SLUGS = [
  'denver',
  'jefferson',
  'arapahoe',
  'adams',
  'douglas',
  'el-paso',
  'boulder',
  'larimer',
  'weld',
  'mesa',
] as const;

const CO_METRO_SLUGS = new Set([
  'denver',
  'jefferson',
  'arapahoe',
  'adams',
  'douglas',
  'el-paso',
  'boulder',
]);

const coSubset = Object.fromEntries(
  CO_WAVE3_SLUGS.filter((slug) => coloradoCountyResearch[slug]).map((slug) => [
    slug,
    coloradoCountyResearch[slug],
  ])
);

export const coloradoDeepCountyResearch: Record<string, DeepCountyResearch> =
  promoteStateResearchMap('colorado', coSubset, CO_METRO_SLUGS);