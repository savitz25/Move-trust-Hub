import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Washington county research — premium hubs (expanding) */
export const washingtonCountyResearch: Record<string, CuratedCountyResearch> = {
  king: {
    marketNotes:
      'King County is Washington’s most populous county, encompassing Seattle and surrounding suburban areas with strong urban, tech, and residential demand.',
    costs: {
      studioRange: '$950–$2,100',
      familyRange: '$4,000–$9,500+',
      avgHourly: '$140–$210/hr for a 2-person crew',
      note: 'King County pricing reflects Seattle metro demand, I-5 and bridge-crossing traffic, elevator and parking constraints, and competition among full-service agents serving urban and Eastside suburban communities.',
    },
    tips: [
      'Verify coverage for Seattle, Bellevue, Redmond, and surrounding cities before booking.',
      'Heavy urban traffic and bridge crossings (520, I-90) significantly impact scheduling — confirm crew arrival windows.',
      'Tech-corridor and high-rise moves may require elevator reservations and loading-zone permits — confirm building coordination experience.',
      'Alaska-bound relocations often stage through Seattle-area ports — distinguish local King County movers from interstate van-line agents.',
      'Confirm insurance for high-value urban and suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getWashingtonCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return washingtonCountyResearch[countySlug];
}