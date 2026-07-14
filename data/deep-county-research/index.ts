import { arizonaDeepCountyResearch } from '@/data/deep-county-research/arizona';
import { californiaDeepCountyResearch } from '@/data/deep-county-research/california';
import { coloradoDeepCountyResearch } from '@/data/deep-county-research/colorado';
import { floridaDeepCountyResearch } from '@/data/deep-county-research/florida';
import { georgiaDeepCountyResearch } from '@/data/deep-county-research/georgia';
import { illinoisDeepCountyResearch } from '@/data/deep-county-research/illinois';
import { indianaDeepCountyResearch } from '@/data/deep-county-research/indiana';
import { iowaDeepCountyResearch } from '@/data/deep-county-research/iowa';
import { kansasDeepCountyResearch } from '@/data/deep-county-research/kansas';
import { kentuckyDeepCountyResearch } from '@/data/deep-county-research/kentucky';
import { marylandDeepCountyResearch } from '@/data/deep-county-research/maryland';
import { michiganDeepCountyResearch } from '@/data/deep-county-research/michigan';
import { missouriDeepCountyResearch } from '@/data/deep-county-research/missouri';
import { nebraskaDeepCountyResearch } from '@/data/deep-county-research/nebraska';
import { newJerseyDeepCountyResearch } from '@/data/deep-county-research/new-jersey';
import { newYorkDeepCountyResearch } from '@/data/deep-county-research/new-york';
import { northCarolinaDeepCountyResearch } from '@/data/deep-county-research/north-carolina';
import { ohioDeepCountyResearch } from '@/data/deep-county-research/ohio';
import { pennsylvaniaDeepCountyResearch } from '@/data/deep-county-research/pennsylvania';
import type { DeepCountyFaqItem, DeepCountyResearch } from '@/data/deep-county-research/types';
import { tennesseeDeepCountyResearch } from '@/data/deep-county-research/tennessee';
import { texasDeepCountyResearch } from '@/data/deep-county-research/texas';
import { virginiaDeepCountyResearch } from '@/data/deep-county-research/virginia';
import { washingtonDeepCountyResearch } from '@/data/deep-county-research/washington';

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

/** Wave 3 — FL priority, major metros (CA, GA, NY, NJ, MD, TN, WA, AZ, CO, MI). */
const WAVE_3_BY_STATE: Record<string, Record<string, DeepCountyResearch>> = {
  florida: floridaDeepCountyResearch,
  california: californiaDeepCountyResearch,
  georgia: georgiaDeepCountyResearch,
  'new-york': newYorkDeepCountyResearch,
  'new-jersey': newJerseyDeepCountyResearch,
  maryland: marylandDeepCountyResearch,
  tennessee: tennesseeDeepCountyResearch,
  washington: washingtonDeepCountyResearch,
  arizona: arizonaDeepCountyResearch,
  colorado: coloradoDeepCountyResearch,
  michigan: michiganDeepCountyResearch,
};

const DEEP_BY_STATE: Record<string, Record<string, DeepCountyResearch>> = {
  ...WAVE_1_BY_STATE,
  ...WAVE_2_BY_STATE,
  ...WAVE_3_BY_STATE,
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

/** Wave 3 — Florida + major metro expansion (Phase 3). */
export const DEEP_COUNTY_UPGRADE_WAVE_3 = flattenWave(WAVE_3_BY_STATE);

export const DEEP_COUNTY_UPGRADE_ALL = flattenWave(DEEP_BY_STATE);

export const DEEP_COUNTY_TOTAL = DEEP_COUNTY_UPGRADE_ALL.length;

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