import { getAlabamaCountyResearch } from '@/data/alabama-county-research';
import { getAlaskaCountyResearch } from '@/data/alaska-county-research';
import { getArizonaCountyResearch } from '@/data/arizona-county-research';
import { getArkansasCountyResearch } from '@/data/arkansas-county-research';
import { getCaliforniaCountyResearch } from '@/data/california-county-research';
import { getColoradoCountyResearch } from '@/data/colorado-county-research';
import { getConnecticutCountyResearch } from '@/data/connecticut-county-research';
import { getDelawareCountyResearch } from '@/data/delaware-county-research';
import { getDistrictOfColumbiaCountyResearch } from '@/data/district-of-columbia-county-research';
import { getFloridaCountyResearch } from '@/data/florida-county-research';
import { getGeorgiaCountyResearch } from '@/data/georgia-county-research';
import { getHawaiiCountyResearch } from '@/data/hawaii-county-research';
import { getIdahoCountyResearch } from '@/data/idaho-county-research';
import { getIllinoisCountyResearch } from '@/data/illinois-county-research';
import { getIndianaCountyResearch } from '@/data/indiana-county-research';
import { getIowaCountyResearch } from '@/data/iowa-county-research';
import { getKansasCountyResearch } from '@/data/kansas-county-research';
import { getKentuckyCountyResearch } from '@/data/kentucky-county-research';
import { getLouisianaCountyResearch } from '@/data/louisiana-county-research';
import { getMaineCountyResearch } from '@/data/maine-county-research';
import { getMarylandCountyResearch } from '@/data/maryland-county-research';
import { getMassachusettsCountyResearch } from '@/data/massachusetts-county-research';
import { getMichiganCountyResearch } from '@/data/michigan-county-research';
import { getMinnesotaCountyResearch } from '@/data/minnesota-county-research';
import { getMississippiCountyResearch } from '@/data/mississippi-county-research';
import { getMissouriCountyResearch } from '@/data/missouri-county-research';
import { getMontanaCountyResearch } from '@/data/montana-county-research';
import { getNebraskaCountyResearch } from '@/data/nebraska-county-research';
import { getNevadaCountyResearch } from '@/data/nevada-county-research';
import { getNewHampshireCountyResearch } from '@/data/new-hampshire-county-research';
import { getNewJerseyCountyResearch } from '@/data/new-jersey-county-research';
import { getNewMexicoCountyResearch } from '@/data/new-mexico-county-research';
import { getNewYorkCountyResearch } from '@/data/new-york-county-research';
import { getNorthCarolinaCountyResearch } from '@/data/north-carolina-county-research';
import { getNorthDakotaCountyResearch } from '@/data/north-dakota-county-research';
import { getOhioCountyResearch } from '@/data/ohio-county-research';
import { getOklahomaCountyResearch } from '@/data/oklahoma-county-research';
import { getOregonCountyResearch } from '@/data/oregon-county-research';
import { getPennsylvaniaCountyResearch } from '@/data/pennsylvania-county-research';
import { getRhodeIslandCountyResearch } from '@/data/rhode-island-county-research';
import { getSouthCarolinaCountyResearch } from '@/data/south-carolina-county-research';
import { getSouthDakotaCountyResearch } from '@/data/south-dakota-county-research';
import { getTennesseeCountyResearch } from '@/data/tennessee-county-research';
import { getTexasCountyResearch } from '@/data/texas-county-research';
import { getUtahCountyResearch } from '@/data/utah-county-research';
import { getVermontCountyResearch } from '@/data/vermont-county-research';
import { getVirginiaCountyResearch } from '@/data/virginia-county-research';
import { getWashingtonCountyResearch } from '@/data/washington-county-research';
import { getWestVirginiaCountyResearch } from '@/data/west-virginia-county-research';
import { getWisconsinCountyResearch } from '@/data/wisconsin-county-research';
import { getWyomingCountyResearch } from '@/data/wyoming-county-research';
import {
  getDeepCountyResearch,
} from '@/data/deep-county-research';
import { applyCountyResearchCitations } from '@/lib/local-movers/county-research-citations';
import { getMoversForCounty } from '@/lib/local-movers/index';
import { hasAttributableCountyReviews } from '@/lib/trust/verified-reviews';

type CountyResearch = {
  marketNotes: string;
  tips?: string[];
  costs?: {
    studioRange: string;
    familyRange: string;
    avgHourly: string;
    note: string;
  };
};

const GENERIC_TIP_PREFIX =
  'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews';

const RESEARCH_GETTERS: Record<
  string,
  (countySlug: string) => CountyResearch | undefined
> = {
  alabama: getAlabamaCountyResearch,
  alaska: getAlaskaCountyResearch,
  arizona: getArizonaCountyResearch,
  arkansas: getArkansasCountyResearch,
  california: getCaliforniaCountyResearch,
  colorado: getColoradoCountyResearch,
  connecticut: getConnecticutCountyResearch,
  delaware: getDelawareCountyResearch,
  'district-of-columbia': getDistrictOfColumbiaCountyResearch,
  florida: getFloridaCountyResearch,
  georgia: getGeorgiaCountyResearch,
  hawaii: getHawaiiCountyResearch,
  idaho: getIdahoCountyResearch,
  illinois: getIllinoisCountyResearch,
  indiana: getIndianaCountyResearch,
  iowa: getIowaCountyResearch,
  kansas: getKansasCountyResearch,
  kentucky: getKentuckyCountyResearch,
  louisiana: getLouisianaCountyResearch,
  maine: getMaineCountyResearch,
  maryland: getMarylandCountyResearch,
  massachusetts: getMassachusettsCountyResearch,
  michigan: getMichiganCountyResearch,
  minnesota: getMinnesotaCountyResearch,
  mississippi: getMississippiCountyResearch,
  missouri: getMissouriCountyResearch,
  montana: getMontanaCountyResearch,
  nebraska: getNebraskaCountyResearch,
  nevada: getNevadaCountyResearch,
  'new-hampshire': getNewHampshireCountyResearch,
  'new-jersey': getNewJerseyCountyResearch,
  'new-mexico': getNewMexicoCountyResearch,
  'new-york': getNewYorkCountyResearch,
  'north-carolina': getNorthCarolinaCountyResearch,
  'north-dakota': getNorthDakotaCountyResearch,
  ohio: getOhioCountyResearch,
  oklahoma: getOklahomaCountyResearch,
  oregon: getOregonCountyResearch,
  pennsylvania: getPennsylvaniaCountyResearch,
  'rhode-island': getRhodeIslandCountyResearch,
  'south-carolina': getSouthCarolinaCountyResearch,
  'south-dakota': getSouthDakotaCountyResearch,
  tennessee: getTennesseeCountyResearch,
  texas: getTexasCountyResearch,
  utah: getUtahCountyResearch,
  vermont: getVermontCountyResearch,
  virginia: getVirginiaCountyResearch,
  washington: getWashingtonCountyResearch,
  'west-virginia': getWestVirginiaCountyResearch,
  wisconsin: getWisconsinCountyResearch,
  wyoming: getWyomingCountyResearch,
};

export function getRawCountyResearch(
  stateSlug: string,
  countySlug: string
): CountyResearch | undefined {
  return getDeepCountyResearch(stateSlug, countySlug) ?? RESEARCH_GETTERS[stateSlug]?.(countySlug);
}

export function getCountyResearch(
  stateSlug: string,
  countySlug: string
): CountyResearch | undefined {
  const raw = getRawCountyResearch(stateSlug, countySlug);
  if (!raw?.marketNotes) return undefined;
  return applyCountyResearchCitations(raw);
}

export function hasCountyResearch(stateSlug: string, countySlug: string): boolean {
  return Boolean(getCountyResearch(stateSlug, countySlug));
}

/** True only when attributable on-site reviews exist for directory-linked movers on this county page. */
export function hasCuratedCountyTestimonials(
  stateSlug: string,
  countySlug: string
): boolean {
  const result = getMoversForCounty(stateSlug, countySlug);
  if (!result) return false;
  return hasAttributableCountyReviews(result.movers);
}

export function parseCountyPopulationFromNotes(marketNotes?: string): number | null {
  if (!marketNotes) return null;

  const explicit = marketNotes.match(
    /population\s*(?:of\s*)?(?:~|≈|about|under|around)?\s*([\d,]+)/i
  );
  if (explicit) {
    return Number.parseInt(explicit[1].replace(/,/g, ''), 10);
  }

  return null;
}

export function marketNotesDescribeThinMarket(marketNotes?: string): boolean {
  if (!marketNotes) return false;
  return /thin market|very thin|market is thin|thin;/i.test(marketNotes);
}

/** Detect templated county research (generic tips repeated across many counties). */
export function isGenericTemplateCountyResearch(
  stateSlug: string,
  countySlug: string
): boolean {
  const research = getRawCountyResearch(stateSlug, countySlug);
  if (!research) return true;

  const tips = research.tips ?? [];
  if (tips.length === 0) return true;

  const genericCount = tips.filter((tip) =>
    tip.startsWith(GENERIC_TIP_PREFIX)
  ).length;

  return genericCount >= Math.ceil(tips.length * 0.5);
}

export function getCountyResearchCosts(
  stateSlug: string,
  countySlug: string
): CountyResearch['costs'] | undefined {
  return getCountyResearch(stateSlug, countySlug)?.costs;
}

export function extractSeasonalAdviceFromResearch(
  stateSlug: string,
  countySlug: string
): string | undefined {
  const research = getCountyResearch(stateSlug, countySlug);
  if (!research?.costs?.note) return undefined;
  return research.costs.note;
}

export function extractParkingHoaNotes(
  stateSlug: string,
  countySlug: string
): string[] {
  const research = getCountyResearch(stateSlug, countySlug);
  if (!research?.tips?.length) return [];

  return research.tips.filter((tip) =>
    /elevator|COI|certificate of insurance|HOA|condo|parking|permit|gated|shuttle|building management/i.test(
      tip
    )
  ).slice(0, 2);
}
