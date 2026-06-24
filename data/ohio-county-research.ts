import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Ohio county research — grows incrementally per batch */
export const ohioCountyResearch: Record<string, CuratedCountyResearch> = {
  franklin: {
    marketNotes:
      'Franklin County is the core of the Columbus metropolitan area with strong urban, corporate, educational, and residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Franklin County pricing reflects Columbus metro urban demand, I-70/I-71 corridor traffic, Ohio State University and corporate relocation volume, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Columbus and surrounding areas before booking.',
      'Heavy urban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value urban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getOhioCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return ohioCountyResearch[countySlug];
}