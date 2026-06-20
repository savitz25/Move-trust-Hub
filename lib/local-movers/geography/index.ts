import type { LocalCounty } from '@/lib/local-movers/types';
import { generatedCounties } from '@/data/generated/index';
import { floridaCounties } from '@/lib/local-movers/geography/florida';

const allCounties: LocalCounty[] = [...floridaCounties, ...generatedCounties];

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