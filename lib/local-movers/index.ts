import { generatedCountyAssignments } from '@/data/generated/index';
import { californiaCountyMoverAssignments } from '@/data/california-county-assignments';
import { floridaCountyMoverAssignments } from '@/data/florida-county-assignments';
import { newJerseyCountyMoverAssignments } from '@/data/new-jersey-county-assignments';
import { newYorkCountyMoverAssignments } from '@/data/new-york-county-assignments';
import { georgiaCountyMoverAssignments } from '@/data/georgia-county-assignments';
import { southCarolinaCountyMoverAssignments } from '@/data/south-carolina-county-assignments';
import { northCarolinaCountyMoverAssignments } from '@/data/north-carolina-county-assignments';
import { alabamaCountyMoverAssignments } from '@/data/alabama-county-assignments';
import { mississippiCountyMoverAssignments } from '@/data/mississippi-county-assignments';
import { louisianaCountyMoverAssignments } from '@/data/louisiana-county-assignments';
import { oklahomaCountyMoverAssignments } from '@/data/oklahoma-county-assignments';
import { arkansasCountyMoverAssignments } from '@/data/arkansas-county-assignments';
import { kansasCountyMoverAssignments } from '@/data/kansas-county-assignments';
import { missouriCountyMoverAssignments } from '@/data/missouri-county-assignments';
import { illinoisCountyMoverAssignments } from '@/data/illinois-county-assignments';
import { michiganCountyMoverAssignments } from '@/data/michigan-county-assignments';
import { indianaCountyMoverAssignments } from '@/data/indiana-county-assignments';
import { ohioCountyMoverAssignments } from '@/data/ohio-county-assignments';
import { kentuckyCountyMoverAssignments } from '@/data/kentucky-county-assignments';
import { westVirginiaCountyMoverAssignments } from '@/data/west-virginia-county-assignments';
import { virginiaCountyMoverAssignments } from '@/data/virginia-county-assignments';
import { districtOfColumbiaCountyMoverAssignments } from '@/data/district-of-columbia-county-assignments';
import { delawareCountyMoverAssignments } from '@/data/delaware-county-assignments';
import { marylandCountyMoverAssignments } from '@/data/maryland-county-assignments';
import { pennsylvaniaCountyMoverAssignments } from '@/data/pennsylvania-county-assignments';
import { connecticutCountyMoverAssignments } from '@/data/connecticut-county-assignments';
import { massachusettsCountyMoverAssignments } from '@/data/massachusetts-county-assignments';
import { rhodeIslandCountyMoverAssignments } from '@/data/rhode-island-county-assignments';
import { vermontCountyMoverAssignments } from '@/data/vermont-county-assignments';
import { newHampshireCountyMoverAssignments } from '@/data/new-hampshire-county-assignments';
import { maineCountyMoverAssignments } from '@/data/maine-county-assignments';
import { hawaiiCountyMoverAssignments } from '@/data/hawaii-county-assignments';
import { alaskaCountyMoverAssignments } from '@/data/alaska-county-assignments';
import { washingtonCountyMoverAssignments } from '@/data/washington-county-assignments';
import { oregonCountyMoverAssignments } from '@/data/oregon-county-assignments';
import { nevadaCountyMoverAssignments } from '@/data/nevada-county-assignments';
import { arizonaCountyMoverAssignments } from '@/data/arizona-county-assignments';
import { newMexicoCountyMoverAssignments } from '@/data/new-mexico-county-assignments';
import { utahCountyMoverAssignments } from '@/data/utah-county-assignments';
import { coloradoCountyMoverAssignments } from '@/data/colorado-county-assignments';
import { idahoCountyMoverAssignments } from '@/data/idaho-county-assignments';
import { montanaCountyMoverAssignments } from '@/data/montana-county-assignments';
import { wyomingCountyMoverAssignments } from '@/data/wyoming-county-assignments';
import { northDakotaCountyMoverAssignments } from '@/data/north-dakota-county-assignments';
import { southDakotaCountyMoverAssignments } from '@/data/south-dakota-county-assignments';
import { nebraskaCountyMoverAssignments } from '@/data/nebraska-county-assignments';
import { iowaCountyMoverAssignments } from '@/data/iowa-county-assignments';
import { minnesotaCountyMoverAssignments } from '@/data/minnesota-county-assignments';
import { wisconsinCountyMoverAssignments } from '@/data/wisconsin-county-assignments';
import { tennesseeCountyMoverAssignments } from '@/data/tennessee-county-assignments';
import { texasCountyMoverAssignments } from '@/data/texas-county-assignments';
import { countyMoverAssignments } from '@/data/local-movers-seed';
import { fullMetroPools, fullMoversCatalog } from '@/lib/local-movers/catalog';
import type { LocalCounty, LocalMover } from '@/lib/local-movers/types';
import { CURATED_STATE_SLUGS } from '@/lib/local-movers/curated-states';
import { getCounty } from '@/lib/local-movers/geography/index';
import { getLocalState } from '@/lib/local-movers/states';

const MAX_MOVERS_PER_COUNTY = 10;
const LARGE_MARKET_MAX_MOVERS = 20;

const curatedAssignmentStateSlugs = CURATED_STATE_SLUGS;
const generatedAssignmentsWithoutCurated = generatedCountyAssignments.filter(
  (entry) => !curatedAssignmentStateSlugs.has(entry.stateSlug)
);

const allCountyAssignments = [
  ...alabamaCountyMoverAssignments,
  ...mississippiCountyMoverAssignments,
  ...louisianaCountyMoverAssignments,
  ...oklahomaCountyMoverAssignments,
  ...arkansasCountyMoverAssignments,
  ...kansasCountyMoverAssignments,
  ...missouriCountyMoverAssignments,
  ...illinoisCountyMoverAssignments,
  ...michiganCountyMoverAssignments,
  ...indianaCountyMoverAssignments,
  ...ohioCountyMoverAssignments,
  ...kentuckyCountyMoverAssignments,
  ...westVirginiaCountyMoverAssignments,
  ...virginiaCountyMoverAssignments,
  ...districtOfColumbiaCountyMoverAssignments,
  ...delawareCountyMoverAssignments,
  ...marylandCountyMoverAssignments,
  ...pennsylvaniaCountyMoverAssignments,
  ...connecticutCountyMoverAssignments,
  ...massachusettsCountyMoverAssignments,
  ...rhodeIslandCountyMoverAssignments,
  ...vermontCountyMoverAssignments,
  ...newHampshireCountyMoverAssignments,
  ...maineCountyMoverAssignments,
  ...hawaiiCountyMoverAssignments,
  ...alaskaCountyMoverAssignments,
  ...washingtonCountyMoverAssignments,
  ...oregonCountyMoverAssignments,
  ...nevadaCountyMoverAssignments,
  ...arizonaCountyMoverAssignments,
  ...newMexicoCountyMoverAssignments,
  ...utahCountyMoverAssignments,
  ...coloradoCountyMoverAssignments,
  ...idahoCountyMoverAssignments,
  ...montanaCountyMoverAssignments,
  ...wyomingCountyMoverAssignments,
  ...northDakotaCountyMoverAssignments,
  ...southDakotaCountyMoverAssignments,
  ...nebraskaCountyMoverAssignments,
  ...iowaCountyMoverAssignments,
  ...minnesotaCountyMoverAssignments,
  ...wisconsinCountyMoverAssignments,
  ...californiaCountyMoverAssignments,
  ...floridaCountyMoverAssignments,
  ...newJerseyCountyMoverAssignments,
  ...newYorkCountyMoverAssignments,
  ...texasCountyMoverAssignments,
  ...georgiaCountyMoverAssignments,
  ...southCarolinaCountyMoverAssignments,
  ...northCarolinaCountyMoverAssignments,
  ...tennesseeCountyMoverAssignments,
  ...generatedAssignmentsWithoutCurated,
  ...countyMoverAssignments,
];

function resolveMoverIds(county: LocalCounty): string[] {
  const assignment = allCountyAssignments.find(
    (entry) =>
      entry.stateSlug === county.stateSlug && entry.countySlug === county.slug
  );

  if (assignment?.moverIds.length) {
    return assignment.moverIds;
  }

  if (county.metro && fullMetroPools[county.metro]) {
    return fullMetroPools[county.metro];
  }

  return [];
}

export function hasExplicitCountyAssignment(
  stateSlug: string,
  countySlug: string
): boolean {
  return allCountyAssignments.some(
    (entry) =>
      entry.stateSlug === stateSlug &&
      entry.countySlug === countySlug &&
      entry.moverIds.length > 0
  );
}

export function getMoversForCounty(
  stateSlug: string,
  countySlug: string
): { county: LocalCounty; movers: LocalMover[]; isRegionalFallback: boolean } | null {
  const county = getCounty(stateSlug, countySlug);
  if (!county) return null;

  const moverIds = resolveMoverIds(county);
  const hasExplicitAssignment = hasExplicitCountyAssignment(stateSlug, countySlug);

  const resolved = moverIds
    .map((id) => fullMoversCatalog[id])
    .filter((mover): mover is LocalMover => Boolean(mover));

  const displayLimit = hasExplicitAssignment
    ? Math.min(moverIds.length, LARGE_MARKET_MAX_MOVERS)
    : MAX_MOVERS_PER_COUNTY;

  const movers = (hasExplicitAssignment
    ? resolved
    : resolved.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
  ).slice(0, displayLimit);

  return {
    county,
    movers,
    isRegionalFallback: !hasExplicitAssignment && Boolean(county.metro),
  };
}

export function getLocalMoverById(id: string): LocalMover | undefined {
  return fullMoversCatalog[id];
}

export { buildCountyLabel } from '@/lib/local-movers/schema-helpers';
export {
  buildCountyTitle,
  buildCountyDescription,
  buildStateTitle,
  buildStateDescription,
  buildCountyFaqItems,
  buildCountyCostGuide,
  buildCountyTips,
  buildCountyTestimonial,
  buildCountyTestimonials,
  buildCountyMarketNotes,
  getSeoYear,
  getStateSlugFromCode,
} from '@/lib/local-movers/county-seo';
export {
  buildCountyPageMetadata,
  buildCountyKeywords,
  buildCountyH1,
  buildStatePageMetadata,
  buildStateKeywords,
  buildHubPageMetadata,
  buildHubKeywords,
} from '@/lib/local-movers/seo-metadata';

export function getCountyPath(stateSlug: string, countySlug: string): string {
  return `/local-movers/${stateSlug}/${countySlug}`;
}

export function getStatePath(stateSlug: string): string {
  return `/local-movers/${stateSlug}`;
}

export { getLocalState, localStates } from '@/lib/local-movers/states';
export {
  getAllCountyParams,
  getCountiesForState,
  getCounty,
  stateHasCounties,
} from '@/lib/local-movers/geography/index';