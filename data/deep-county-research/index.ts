import { illinoisDeepCountyResearch } from '@/data/deep-county-research/illinois';
import { indianaDeepCountyResearch } from '@/data/deep-county-research/indiana';
import { iowaDeepCountyResearch } from '@/data/deep-county-research/iowa';
import { kansasDeepCountyResearch } from '@/data/deep-county-research/kansas';
import { kentuckyDeepCountyResearch } from '@/data/deep-county-research/kentucky';
import { missouriDeepCountyResearch } from '@/data/deep-county-research/missouri';
import { nebraskaDeepCountyResearch } from '@/data/deep-county-research/nebraska';
import { northCarolinaDeepCountyResearch } from '@/data/deep-county-research/north-carolina';
import { ohioDeepCountyResearch } from '@/data/deep-county-research/ohio';
import { pennsylvaniaDeepCountyResearch } from '@/data/deep-county-research/pennsylvania';
import type { DeepCountyFaqItem, DeepCountyResearch } from '@/data/deep-county-research/types';
import { texasDeepCountyResearch } from '@/data/deep-county-research/texas';
import { virginiaDeepCountyResearch } from '@/data/deep-county-research/virginia';

const WAVE_1_BY_STATE: Record<string, Record<string, DeepCountyResearch>> = {
  virginia: virginiaDeepCountyResearch,
  illinois: illinoisDeepCountyResearch,
  missouri: missouriDeepCountyResearch,
  indiana: indianaDeepCountyResearch,
  kentucky: kentuckyDeepCountyResearch,
  kansas: kansasDeepCountyResearch,
  iowa: iowaDeepCountyResearch,
  nebraska: nebraskaDeepCountyResearch,
};

const WAVE_2_BY_STATE: Record<string, Record<string, DeepCountyResearch>> = {
  texas: texasDeepCountyResearch,
  pennsylvania: pennsylvaniaDeepCountyResearch,
  ohio: ohioDeepCountyResearch,
  'north-carolina': northCarolinaDeepCountyResearch,
};

const DEEP_BY_STATE: Record<string, Record<string, DeepCountyResearch>> = {
  ...WAVE_1_BY_STATE,
  ...WAVE_2_BY_STATE,
};

function flattenWave(
  byState: Record<string, Record<string, DeepCountyResearch>>
): ReadonlyArray<{ stateSlug: string; countySlug: string }> {
  return Object.entries(byState).flatMap(([stateSlug, counties]) =>
    Object.keys(counties).map((countySlug) => ({ stateSlug, countySlug }))
  );
}

/** Wave 1 priority metros (VA, IL, MO, IN, KY, KS, IA, NE). */
export const DEEP_COUNTY_UPGRADE_WAVE_1 = flattenWave(WAVE_1_BY_STATE);

/** Wave 2 premium metros (TX, PA, OH, NC). */
export const DEEP_COUNTY_UPGRADE_WAVE_2 = flattenWave(WAVE_2_BY_STATE);

export const DEEP_COUNTY_UPGRADE_ALL = flattenWave(DEEP_BY_STATE);

export function getDeepCountyResearch(
  stateSlug: string,
  countySlug: string
): DeepCountyResearch | undefined {
  return DEEP_BY_STATE[stateSlug]?.[countySlug];
}

export function hasDeepCountyResearch(stateSlug: string, countySlug: string): boolean {
  return Boolean(getDeepCountyResearch(stateSlug, countySlug));
}

export function getDeepCountyFaqExtras(
  stateSlug: string,
  countySlug: string
): DeepCountyFaqItem[] | undefined {
  return getDeepCountyResearch(stateSlug, countySlug)?.faqExtras;
}

export function withDeepCountyResearch<T extends DeepCountyResearch>(
  stateSlug: string,
  countySlug: string,
  base: T | undefined
): T | undefined {
  const deep = getDeepCountyResearch(stateSlug, countySlug);
  return (deep as T | undefined) ?? base;
}