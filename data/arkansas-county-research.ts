import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Arkansas county research — grows incrementally per batch */
export const arkansasCountyResearch: Record<string, CuratedCountyResearch> = {
  pulaski: {
    marketNotes:
      'Pulaski County is Arkansas’s most populous county and the core of the Little Rock metropolitan area, with strong governmental, educational, and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Pulaski County pricing reflects Little Rock metro urban and interstate traffic, state-government relocation demand, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Little Rock, North Little Rock, Sherwood, and Maumelle areas before booking.',
      'Major urban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and flood/tornado coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getArkansasCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return arkansasCountyResearch[countySlug];
}