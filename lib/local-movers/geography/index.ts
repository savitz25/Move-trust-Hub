import type { LocalCounty } from '@/lib/local-movers/types';
import { generatedCounties } from '@/data/generated/index';
import { californiaCounties } from '@/lib/local-movers/geography/california';
import { floridaCounties } from '@/lib/local-movers/geography/florida';
import { newJerseyCounties } from '@/lib/local-movers/geography/new-jersey';
import { newYorkCounties } from '@/lib/local-movers/geography/new-york';
import { applyGeorgiaCountyOverrides } from '@/lib/local-movers/geography/georgia-overrides';
import { applySouthCarolinaCountyOverrides } from '@/lib/local-movers/geography/south-carolina-overrides';
import { applyNorthCarolinaCountyOverrides } from '@/lib/local-movers/geography/north-carolina-overrides';
import { applyAlabamaCountyOverrides } from '@/lib/local-movers/geography/alabama-overrides';
import { applyMississippiCountyOverrides } from '@/lib/local-movers/geography/mississippi-overrides';
import { applyLouisianaCountyOverrides } from '@/lib/local-movers/geography/louisiana-overrides';
import { applyTennesseeCountyOverrides } from '@/lib/local-movers/geography/tennessee-overrides';
import { applyTexasCountyOverrides } from '@/lib/local-movers/geography/texas-overrides';

const curatedStateSlugs = new Set(['california', 'florida', 'new-jersey', 'new-york']);
const generatedWithoutCurated = generatedCounties.filter(
  (county) => !curatedStateSlugs.has(county.stateSlug)
);

const allCounties: LocalCounty[] = [
  ...californiaCounties,
  ...floridaCounties,
  ...newJerseyCounties,
  ...newYorkCounties,
  ...generatedWithoutCurated
    .map(applyTexasCountyOverrides)
    .map(applyGeorgiaCountyOverrides)
    .map(applySouthCarolinaCountyOverrides)
    .map(applyNorthCarolinaCountyOverrides)
    .map(applyTennesseeCountyOverrides)
    .map(applyAlabamaCountyOverrides)
    .map(applyMississippiCountyOverrides)
    .map(applyLouisianaCountyOverrides),
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