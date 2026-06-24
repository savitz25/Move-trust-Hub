import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Delaware county research — complete state (3 counties) */
export const delawareCountyResearch: Record<string, CuratedCountyResearch> = {
  'new-castle': {
    marketNotes:
      "New Castle County is Delaware's most populous county and the state's economic engine, with strong corporate, financial, suburban, and residential demand across Wilmington, Newark, and the Philadelphia metro spillover along I-95 and the Brandywine Valley.",
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'New Castle County pricing reflects Wilmington metro corporate relocation volume, Philadelphia cross-border demand, I-95 corridor traffic, and competition among full-service Delaware agents.',
    },
    tips: [
      'Verify coverage for Wilmington, Newark, Claymont, and Philadelphia-metro spillover communities before booking.',
      'Corporate and executive relocations along the Wilmington financial corridor may require after-hours or weekend scheduling — confirm crew availability.',
      'I-95, Route 1, and Delaware Memorial Bridge traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes, townhome communities, and multi-floor loading zones.',
      'Book early for peak seasons (May–September), corporate transfer windows, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  sussex: {
    marketNotes:
      "Sussex County is Delaware's southernmost county with strong coastal, beach-second-home, retirement, and tourism demand across Georgetown, Rehoboth Beach, Lewes, and Bethany Beach.",
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Sussex County pricing reflects coastal tourism demand, seasonal beach-community volume, retirement relocation turnover, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Georgetown, Rehoboth Beach, Lewes, and Bethany Beach before booking.',
      'Beach-second-home and retirement moves often involve seasonal access windows — confirm off-season and peak-season availability.',
      'Tourist traffic and coastal bridge congestion significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value coastal homes, vacation properties, and elevated or flood-zone residences.',
      'Book early for peak tourist seasons (May–September) and summer lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  kent: {
    marketNotes:
      "Kent County is Central Delaware's core county anchored by Dover, the state capital, with strong residential, governmental, education, and military-adjacent demand.",
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Kent County pricing reflects state capital suburban demand, Dover Air Force Base corridor relocations, legislative session turnover, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Dover, Smyrna, Milford, and Central Delaware communities before booking.',
      'Government and education-related moves may require flexible scheduling around legislative sessions and school calendars.',
      'Route 1 and Dover metro traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and state-government corridor relocations.',
      'Book early for peak seasons (May–September) and legislative session turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getDelawareCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return delawareCountyResearch[countySlug];
}