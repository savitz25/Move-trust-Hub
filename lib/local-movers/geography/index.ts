import type { LocalCounty } from '@/lib/local-movers/types';
import { generatedCounties } from '@/data/generated/index';
import { districtOfColumbiaCounties } from '@/lib/local-movers/geography/district-of-columbia';
import { connecticutCounties } from '@/lib/local-movers/geography/connecticut';
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
import { applyOklahomaCountyOverrides } from '@/lib/local-movers/geography/oklahoma-overrides';
import { applyArkansasCountyOverrides } from '@/lib/local-movers/geography/arkansas-overrides';
import { applyKansasCountyOverrides } from '@/lib/local-movers/geography/kansas-overrides';
import { applyMissouriCountyOverrides } from '@/lib/local-movers/geography/missouri-overrides';
import { applyIllinoisCountyOverrides } from '@/lib/local-movers/geography/illinois-overrides';
import { applyMichiganCountyOverrides } from '@/lib/local-movers/geography/michigan-overrides';
import { applyIndianaCountyOverrides } from '@/lib/local-movers/geography/indiana-overrides';
import { applyOhioCountyOverrides } from '@/lib/local-movers/geography/ohio-overrides';
import { applyKentuckyCountyOverrides } from '@/lib/local-movers/geography/kentucky-overrides';
import { applyWestVirginiaCountyOverrides } from '@/lib/local-movers/geography/west-virginia-overrides';
import { applyVirginiaCountyOverrides } from '@/lib/local-movers/geography/virginia-overrides';
import { applyDelawareCountyOverrides } from '@/lib/local-movers/geography/delaware-overrides';
import { applyMarylandCountyOverrides } from '@/lib/local-movers/geography/maryland-overrides';
import { applyPennsylvaniaCountyOverrides } from '@/lib/local-movers/geography/pennsylvania-overrides';
import { applyMassachusettsCountyOverrides } from '@/lib/local-movers/geography/massachusetts-overrides';
import { applyRhodeIslandCountyOverrides } from '@/lib/local-movers/geography/rhode-island-overrides';
import { applyVermontCountyOverrides } from '@/lib/local-movers/geography/vermont-overrides';
import { applyNewHampshireCountyOverrides } from '@/lib/local-movers/geography/new-hampshire-overrides';
import { applyMaineCountyOverrides } from '@/lib/local-movers/geography/maine-overrides';
import { applyHawaiiCountyOverrides } from '@/lib/local-movers/geography/hawaii-overrides';
import { applyAlaskaCountyOverrides } from '@/lib/local-movers/geography/alaska-overrides';
import { marylandSupplementalCounties } from '@/lib/local-movers/geography/maryland-supplemental';
import { applyTennesseeCountyOverrides } from '@/lib/local-movers/geography/tennessee-overrides';
import { applyTexasCountyOverrides } from '@/lib/local-movers/geography/texas-overrides';

const curatedStateSlugs = new Set(['california', 'florida', 'new-jersey', 'new-york']);

/** Generated MD data includes duplicate Baltimore County entries — keep one. */
function dedupeMarylandBaltimore(counties: typeof generatedCounties): typeof generatedCounties {
  let seenBaltimoreCounty = false;
  return counties.filter((county) => {
    if (county.stateSlug === 'maryland' && county.slug === 'baltimore') {
      if (seenBaltimoreCounty) return false;
      seenBaltimoreCounty = true;
    }
    return true;
  });
}

const generatedWithoutCurated = dedupeMarylandBaltimore(
  generatedCounties.filter(
    (county) =>
      !curatedStateSlugs.has(county.stateSlug) && county.stateSlug !== 'connecticut'
  )
);

const allCounties: LocalCounty[] = [
  ...districtOfColumbiaCounties,
  ...connecticutCounties,
  ...marylandSupplementalCounties,
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
    .map(applyLouisianaCountyOverrides)
    .map(applyOklahomaCountyOverrides)
    .map(applyArkansasCountyOverrides)
    .map(applyKansasCountyOverrides)
    .map(applyMissouriCountyOverrides)
    .map(applyIllinoisCountyOverrides)
    .map(applyMichiganCountyOverrides)
    .map(applyIndianaCountyOverrides)
    .map(applyOhioCountyOverrides)
    .map(applyKentuckyCountyOverrides)
    .map(applyWestVirginiaCountyOverrides)
    .map(applyVirginiaCountyOverrides)
    .map(applyDelawareCountyOverrides)
    .map(applyMarylandCountyOverrides)
    .map(applyPennsylvaniaCountyOverrides)
    .map(applyMassachusettsCountyOverrides)
    .map(applyRhodeIslandCountyOverrides)
    .map(applyVermontCountyOverrides)
    .map(applyNewHampshireCountyOverrides)
    .map(applyMaineCountyOverrides)
    .map(applyHawaiiCountyOverrides)
    .map(applyAlaskaCountyOverrides),
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