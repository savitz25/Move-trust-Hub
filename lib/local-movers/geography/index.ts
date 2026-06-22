import type { LocalCounty } from '@/lib/local-movers/types';
import { generatedCounties } from '@/data/generated/index';
import { californiaCounties } from '@/lib/local-movers/geography/california';
import { floridaCounties } from '@/lib/local-movers/geography/florida';
import { newJerseyCounties } from '@/lib/local-movers/geography/new-jersey';
import { newYorkCounties } from '@/lib/local-movers/geography/new-york';

const curatedStateSlugs = new Set(['california', 'florida', 'new-jersey', 'new-york']);
const generatedWithoutCurated = generatedCounties.filter(
  (county) => !curatedStateSlugs.has(county.stateSlug)
);

const allCounties: LocalCounty[] = [
  ...californiaCounties,
  ...floridaCounties,
  ...newJerseyCounties,
  ...newYorkCounties,
  ...generatedWithoutCurated,
];

export function getCountiesForState(stateSlug: string): LocalCounty[] {
  return allCounties
    .filter((county) => county.stateSlug === stateSlug)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getCounty(
  stateSlug: string,
  countySlug: string
): LocalCounty | undefined {
  return allCounties.find(
    (county) => county.stateSlug === stateSlug && county.slug === countySlug
  );
}

export function getAllCountyParams(): Array<{ stateSlug: string; countySlug: string }> {
  return allCounties.map((county) => ({
    stateSlug: county.stateSlug,
    countySlug: county.slug,
  }));
}

export function stateHasCounties(stateSlug: string): boolean {
  return allCounties.some((county) => county.stateSlug === stateSlug);
}