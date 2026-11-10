import { getAlabamaNearbyCounties } from '@/lib/local-movers/alabama-nearby';
import { getAlaskaNearbyCounties } from '@/lib/local-movers/alaska-nearby';
import { getArizonaNearbyCounties } from '@/lib/local-movers/arizona-nearby';
import { getArkansasNearbyCounties } from '@/lib/local-movers/arkansas-nearby';
import { getCaliforniaNearbyCounties } from '@/lib/local-movers/california-nearby';
import { getColoradoNearbyCounties } from '@/lib/local-movers/colorado-nearby';
import { getConnecticutNearbyCounties } from '@/lib/local-movers/connecticut-nearby';
import { getDelawareNearbyCounties } from '@/lib/local-movers/delaware-nearby';
import { getDistrictOfColumbiaNearbyCounties } from '@/lib/local-movers/district-of-columbia-nearby';
import { getFloridaNearbyCounties } from '@/lib/local-movers/florida-nearby';
import { getGeorgiaNearbyCounties } from '@/lib/local-movers/georgia-nearby';
import { getHawaiiNearbyCounties } from '@/lib/local-movers/hawaii-nearby';
import { getIdahoNearbyCounties } from '@/lib/local-movers/idaho-nearby';
import { getIllinoisNearbyCounties } from '@/lib/local-movers/illinois-nearby';
import { getIndianaNearbyCounties } from '@/lib/local-movers/indiana-nearby';
import { getIowaNearbyCounties } from '@/lib/local-movers/iowa-nearby';
import { getKansasNearbyCounties } from '@/lib/local-movers/kansas-nearby';
import { getKentuckyNearbyCounties } from '@/lib/local-movers/kentucky-nearby';
import { getLouisianaNearbyCounties } from '@/lib/local-movers/louisiana-nearby';
import { getMaineNearbyCounties } from '@/lib/local-movers/maine-nearby';
import { getMarylandNearbyCounties } from '@/lib/local-movers/maryland-nearby';
import { getMassachusettsNearbyCounties } from '@/lib/local-movers/massachusetts-nearby';
import { getMichiganNearbyCounties } from '@/lib/local-movers/michigan-nearby';
import { getMinnesotaNearbyCounties } from '@/lib/local-movers/minnesota-nearby';
import { getMississippiNearbyCounties } from '@/lib/local-movers/mississippi-nearby';
import { getMissouriNearbyCounties } from '@/lib/local-movers/missouri-nearby';
import { getMontanaNearbyCounties } from '@/lib/local-movers/montana-nearby';
import { getNebraskaNearbyCounties } from '@/lib/local-movers/nebraska-nearby';
import { getNevadaNearbyCounties } from '@/lib/local-movers/nevada-nearby';
import { getNewHampshireNearbyCounties } from '@/lib/local-movers/new-hampshire-nearby';
import { getNewJerseyNearbyCounties } from '@/lib/local-movers/new-jersey-nearby';
import { getNewMexicoNearbyCounties } from '@/lib/local-movers/new-mexico-nearby';
import { getNewYorkNearbyCounties } from '@/lib/local-movers/new-york-nearby';
import { getNorthCarolinaNearbyCounties } from '@/lib/local-movers/north-carolina-nearby';
import { getNorthDakotaNearbyCounties } from '@/lib/local-movers/north-dakota-nearby';
import { getOhioNearbyCounties } from '@/lib/local-movers/ohio-nearby';
import { getOklahomaNearbyCounties } from '@/lib/local-movers/oklahoma-nearby';
import { getOregonNearbyCounties } from '@/lib/local-movers/oregon-nearby';
import { getPennsylvaniaNearbyCounties } from '@/lib/local-movers/pennsylvania-nearby';
import { getRhodeIslandNearbyCounties } from '@/lib/local-movers/rhode-island-nearby';
import { getSouthCarolinaNearbyCounties } from '@/lib/local-movers/south-carolina-nearby';
import { getSouthDakotaNearbyCounties } from '@/lib/local-movers/south-dakota-nearby';
import { getTennesseeNearbyCounties } from '@/lib/local-movers/tennessee-nearby';
import { getTexasNearbyCounties } from '@/lib/local-movers/texas-nearby';
import { getUtahNearbyCounties } from '@/lib/local-movers/utah-nearby';
import { getVermontNearbyCounties } from '@/lib/local-movers/vermont-nearby';
import { getVirginiaNearbyCounties } from '@/lib/local-movers/virginia-nearby';
import { getWashingtonNearbyCounties } from '@/lib/local-movers/washington-nearby';
import { getWestVirginiaNearbyCounties } from '@/lib/local-movers/west-virginia-nearby';
import { getWisconsinNearbyCounties } from '@/lib/local-movers/wisconsin-nearby';
import { getWyomingNearbyCounties } from '@/lib/local-movers/wyoming-nearby';
import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

type NearbyFn = (countySlug: string, limit?: number) => NearbyCountyLink[];

const NEARBY_BY_STATE: Record<string, NearbyFn> = {
  alabama: getAlabamaNearbyCounties as NearbyFn,
  alaska: getAlaskaNearbyCounties as NearbyFn,
  arizona: getArizonaNearbyCounties as NearbyFn,
  arkansas: getArkansasNearbyCounties as NearbyFn,
  california: getCaliforniaNearbyCounties as NearbyFn,
  colorado: getColoradoNearbyCounties as NearbyFn,
  connecticut: getConnecticutNearbyCounties as NearbyFn,
  delaware: getDelawareNearbyCounties as NearbyFn,
  'district-of-columbia': getDistrictOfColumbiaNearbyCounties as NearbyFn,
  florida: getFloridaNearbyCounties as NearbyFn,
  georgia: getGeorgiaNearbyCounties as NearbyFn,
  hawaii: getHawaiiNearbyCounties as NearbyFn,
  idaho: getIdahoNearbyCounties as NearbyFn,
  illinois: getIllinoisNearbyCounties as NearbyFn,
  indiana: getIndianaNearbyCounties as NearbyFn,
  iowa: getIowaNearbyCounties as NearbyFn,
  kansas: getKansasNearbyCounties as NearbyFn,
  kentucky: getKentuckyNearbyCounties as NearbyFn,
  louisiana: getLouisianaNearbyCounties as NearbyFn,
  maine: getMaineNearbyCounties as NearbyFn,
  maryland: getMarylandNearbyCounties as NearbyFn,
  massachusetts: getMassachusettsNearbyCounties as NearbyFn,
  michigan: getMichiganNearbyCounties as NearbyFn,
  minnesota: getMinnesotaNearbyCounties as NearbyFn,
  mississippi: getMississippiNearbyCounties as NearbyFn,
  missouri: getMissouriNearbyCounties as NearbyFn,
  montana: getMontanaNearbyCounties as NearbyFn,
  nebraska: getNebraskaNearbyCounties as NearbyFn,
  nevada: getNevadaNearbyCounties as NearbyFn,
  'new-hampshire': getNewHampshireNearbyCounties as NearbyFn,
  'new-jersey': getNewJerseyNearbyCounties as NearbyFn,
  'new-mexico': getNewMexicoNearbyCounties as NearbyFn,
  'new-york': getNewYorkNearbyCounties as NearbyFn,
  'north-carolina': getNorthCarolinaNearbyCounties as NearbyFn,
  'north-dakota': getNorthDakotaNearbyCounties as NearbyFn,
  ohio: getOhioNearbyCounties as NearbyFn,
  oklahoma: getOklahomaNearbyCounties as NearbyFn,
  oregon: getOregonNearbyCounties as NearbyFn,
  pennsylvania: getPennsylvaniaNearbyCounties as NearbyFn,
  'rhode-island': getRhodeIslandNearbyCounties as NearbyFn,
  'south-carolina': getSouthCarolinaNearbyCounties as NearbyFn,
  'south-dakota': getSouthDakotaNearbyCounties as NearbyFn,
  tennessee: getTennesseeNearbyCounties as NearbyFn,
  texas: getTexasNearbyCounties as NearbyFn,
  utah: getUtahNearbyCounties as NearbyFn,
  vermont: getVermontNearbyCounties as NearbyFn,
  virginia: getVirginiaNearbyCounties as NearbyFn,
  washington: getWashingtonNearbyCounties as NearbyFn,
  'west-virginia': getWestVirginiaNearbyCounties as NearbyFn,
  wisconsin: getWisconsinNearbyCounties as NearbyFn,
  wyoming: getWyomingNearbyCounties as NearbyFn,
};

const neighborCache = new Map<string, Set<string>>();

/** Full in-state neighbor set. Link lists default to a short slice; pass a high limit. */
export function neighboringCountySlugs(stateSlug: string, countySlug: string): ReadonlySet<string> {
  const key = `${stateSlug}::${countySlug}`;
  const cached = neighborCache.get(key);
  if (cached) return cached;
  const fn = NEARBY_BY_STATE[stateSlug];
  const slugs = new Set<string>();
  if (fn) {
    for (const link of fn(countySlug, 100)) {
      if (link.slug) slugs.add(link.slug);
    }
  }
  neighborCache.set(key, slugs);
  return slugs;
}

export function isCountyAdjacent(
  stateSlug: string,
  headquartersCountySlug: string,
  countySlug: string
): boolean {
  if (!headquartersCountySlug || !countySlug) return false;
  if (headquartersCountySlug === countySlug) return false;
  return neighboringCountySlugs(stateSlug, headquartersCountySlug).has(countySlug);
}
