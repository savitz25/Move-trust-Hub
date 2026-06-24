import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Illinois county research — grows incrementally per batch */
export const illinoisCountyResearch: Record<string, CuratedCountyResearch> = {
  cook: {
    marketNotes:
      'Cook County is Illinois’s most populous county and the core of the Chicago metropolitan area, with strong urban, corporate, and residential demand across Chicago, Evanston, Schaumburg, and surrounding suburbs.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,200–$7,200+',
      avgHourly: '$130–$190/hr for a 2-person crew',
      note: 'Cook County pricing reflects Chicago traffic windows, elevator reservations, high-rise move rules, lakefront flood zones, and premium labor demand in core urban neighborhoods.',
    },
    tips: [
      'Verify coverage for Chicago, Evanston, Schaumburg, and surrounding suburbs before booking.',
      'Heavy urban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value urban/suburban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      'Reserve loading zones, freight elevators, and building move-in/out windows early in dense Chicago neighborhoods.',
    ],
  },
  dupage: {
    marketNotes:
      'DuPage County is one of Illinois’s wealthiest and fastest-growing suburban counties with strong corporate, educational, and residential demand across Naperville, Aurora, Downers Grove, Wheaton, and surrounding western suburbs.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,200–$7,200+',
      avgHourly: '$125–$185/hr for a 2-person crew',
      note: 'DuPage County pricing reflects I-88/I-355 corridor traffic, HOA suburban communities, high-value homes, and strong demand near corporate campuses and Metra commuter towns.',
    },
    tips: [
      'Verify coverage for Naperville, Aurora, Downers Grove, Wheaton, and surrounding suburbs before booking.',
      'Heavy suburban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      'Check HOA move rules, gate access, and parking in newer DuPage subdivisions and townhome communities.',
    ],
  },
  lake: {
    marketNotes:
      'Lake County is a major affluent suburban county north of Chicago with strong corporate, residential, and lakeshore demand across Waukegan, Libertyville, Gurnee, Highland Park, and surrounding communities.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,200–$7,200+',
      avgHourly: '$125–$185/hr for a 2-person crew',
      note: 'Lake County pricing reflects I-94/I-294 corridor traffic, lakeshore properties, high-value suburban homes, and strong demand near Gurnee retail corridors and North Shore commuter towns.',
    },
    tips: [
      'Verify coverage for Waukegan, Libertyville, Gurnee, Highland Park, and surrounding areas before booking.',
      'Heavy suburban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      'Ask about specialty handling for lakeshore homes, long driveways, and narrow North Shore streets.',
    ],
  },
  will: {
    marketNotes:
      'Will County is one of Illinois’s fastest-growing counties with strong suburban residential and logistics demand across Joliet, Bolingbrook, Plainfield, and New Lenox.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,200–$7,200+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Will County pricing reflects I-55/I-80 corridor growth, new-construction subdivisions, logistics-adjacent traffic, and rising demand in Plainfield and New Lenox.',
    },
    tips: [
      'Verify coverage for Joliet, Bolingbrook, Plainfield, and New Lenox areas before booking.',
      'Heavy suburban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      'Check HOA move rules and gate access in fast-growing Plainfield and New Lenox subdivisions.',
    ],
  },
  kane: {
    marketNotes:
      'Kane County is a rapidly growing suburban county west of Chicago with strong residential and corporate demand across Aurora, Elgin, Geneva, and St. Charles.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,200–$7,200+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Kane County pricing reflects I-88/I-90 corridor traffic, Fox River valley communities, corporate campus relocations, and competition among western suburban full-service movers.',
    },
    tips: [
      'Verify coverage for Aurora, Elgin, Geneva, and St. Charles areas before booking.',
      'Heavy suburban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      'Confirm travel fees and crew routing for moves between Aurora, Elgin, and Geneva corridor towns.',
    ],
  },
};

export function getIllinoisCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return illinoisCountyResearch[countySlug];
}