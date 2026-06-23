import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Kansas county research — grows incrementally per batch */
export const kansasCountyResearch: Record<string, CuratedCountyResearch> = {
  johnson: {
    marketNotes:
      'Johnson County is Kansas’s most populous county and the core of the Kansas City metropolitan area on the Kansas side, with strong suburban residential, corporate, and cross-state (MO/KS) relocation demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Johnson County pricing reflects Kansas City metro suburban growth, I-35/I-435 corridor traffic, corporate relocation demand, and competition among full-service local and regional agents serving Overland Park and Olathe.',
    },
    tips: [
      'Verify coverage for Overland Park, Olathe, Shawnee, and Lenexa areas before booking.',
      'Major urban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and tornado/hail coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getKansasCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return kansasCountyResearch[countySlug];
}