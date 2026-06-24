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
import { tennesseeCountyMoverAssignments } from '@/data/tennessee-county-assignments';
import { texasCountyMoverAssignments } from '@/data/texas-county-assignments';
import { countyMoverAssignments } from '@/data/local-movers-seed';
import { fullMetroPools, fullMoversCatalog } from '@/lib/local-movers/catalog';
import type { LocalCounty, LocalMover } from '@/lib/local-movers/types';
import { getCounty } from '@/lib/local-movers/geography/index';
import { getLocalState } from '@/lib/local-movers/states';

const MAX_MOVERS_PER_COUNTY = 10;
const LARGE_MARKET_MAX_MOVERS = 20;

const curatedAssignmentStateSlugs = new Set([
  'alabama',
  'mississippi',
  'louisiana',
  'oklahoma',
  'arkansas',
  'kansas',
  'missouri',
  'illinois',
  'michigan',
  'indiana',
  'ohio',
  'kentucky',
  'west-virginia',
  'california',
  'florida',
  'new-jersey',
  'new-york',
  'texas',
  'georgia',
  'south-carolina',
  'north-carolina',
  'tennessee',
]);
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

export function getMoversForCounty(
  stateSlug: string,
  countySlug: string
): { county: LocalCounty; movers: LocalMover[]; isRegionalFallback: boolean } | null {
  const county = getCounty(stateSlug, countySlug);
  if (!county) return null;

  const moverIds = resolveMoverIds(county);
  const hasExplicitAssignment = allCountyAssignments.some(
    (entry) =>
      entry.stateSlug === county.stateSlug && entry.countySlug === county.slug
  );

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