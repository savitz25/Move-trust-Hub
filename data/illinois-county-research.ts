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
};

export function getIllinoisCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return illinoisCountyResearch[countySlug];
}