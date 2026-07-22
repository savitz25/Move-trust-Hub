/**
 * Invert curated county → mover assignments into mover-key → counties.
 * Used so /companies State/County filter matches local-movers county pages.
 *
 * Keep assignment composition in sync with lib/local-movers/index.ts.
 */

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
import { CURATED_STATE_SLUGS } from '@/lib/local-movers/curated-states';
import type { CountyMoverAssignment } from '@/lib/local-movers/types';
import { filterAssignmentMoverIds } from '@/lib/trust/fabricated-mover-id';
import type { AssignmentCounty } from '@/lib/directory/coverage-counties-merge';

const curatedAssignmentStateSlugs = CURATED_STATE_SLUGS;
const generatedAssignmentsWithoutCurated = generatedCountyAssignments.filter(
  (entry) => !curatedAssignmentStateSlugs.has(entry.stateSlug)
);

/** Same composition as lib/local-movers/index.ts allCountyAssignments. */
export const allCountyMoverAssignments: CountyMoverAssignment[] = [
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

export type StaticMoverCountyIndex = {
  /** Lookup by slug / id / directory- variants */
  byKey: Map<string, AssignmentCounty[]>;
  /** Canonical assignment mover ids (for injecting missing catalog rows) */
  primaryMoverIds: string[];
};

function pushCounty(
  map: Map<string, AssignmentCounty[]>,
  key: string,
  county: AssignmentCounty
) {
  const k = key.trim().toLowerCase();
  if (!k) return;
  const list = map.get(k) ?? [];
  if (!list.some((c) => c.stateSlug === county.stateSlug && c.countySlug === county.countySlug)) {
    list.push(county);
  }
  map.set(k, list);
}

function aliasKeys(moverId: string): string[] {
  const id = moverId.trim().toLowerCase();
  if (!id) return [];
  const bare = id.replace(/^directory-/, '');
  const keys = new Set<string>([id, bare]);
  if (!id.startsWith('directory-') && bare) keys.add(`directory-${bare}`);
  return [...keys];
}

let cached: StaticMoverCountyIndex | null = null;

/** Build once per process — inverted county catalog for directory geo filters. */
export function getStaticMoverCountyIndex(): StaticMoverCountyIndex {
  if (cached) return cached;

  const byKey = new Map<string, AssignmentCounty[]>();
  const primary = new Set<string>();

  for (const entry of allCountyMoverAssignments) {
    const stateSlug = entry.stateSlug.trim().toLowerCase();
    const countySlug = entry.countySlug.trim().toLowerCase();
    if (!stateSlug || !countySlug) continue;
    const county: AssignmentCounty = { stateSlug, countySlug };

    for (const moverId of filterAssignmentMoverIds(entry.moverIds)) {
      primary.add(moverId);
      for (const key of aliasKeys(moverId)) {
        pushCounty(byKey, key, county);
      }
    }
  }

  cached = { byKey, primaryMoverIds: [...primary] };
  return cached;
}
