import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Oklahoma county research — grows incrementally per batch */
export const oklahomaCountyResearch: Record<string, CuratedCountyResearch> = {
  oklahoma: {
    marketNotes:
      'Oklahoma County is the most populous county in Oklahoma and the core of the Oklahoma City metropolitan area, with strong governmental, educational, and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Oklahoma County pricing reflects Oklahoma City metro traffic, state-government and university relocation demand, and competition among full-service local and regional van-line agents.',
    },
    tips: [
      'Verify coverage for Oklahoma City, Edmond, Midwest City, and surrounding areas before booking.',
      'Major urban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getOklahomaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return oklahomaCountyResearch[countySlug];
}