import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Alabama county research — grows incrementally per batch */
export const alabamaCountyResearch: Record<string, CuratedCountyResearch> = {
  jefferson: {
    marketNotes:
      "Jefferson County is Alabama's most populous county and the economic core of the Birmingham metropolitan area, with high demand for residential, corporate, and healthcare-related moves.",
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Jefferson County pricing reflects Birmingham metro urban and suburban demand, I-20/I-65 corridor traffic, and strong competition among full-service local providers.',
    },
    tips: [
      'Verify coverage for Birmingham, Hoover, Vestavia Hills, and Bessemer areas before booking.',
      'Major urban and highway traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value urban, suburban, and commercial properties before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getAlabamaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return alabamaCountyResearch[countySlug];
}