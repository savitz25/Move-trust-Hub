import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Louisiana parish research — grows incrementally per batch */
export const louisianaCountyResearch: Record<string, CuratedCountyResearch> = {
  'east-baton-rouge': {
    marketNotes:
      'East Baton Rouge Parish is Louisiana’s most populous parish and the core of the Baton Rouge metropolitan area, with strong governmental, educational (LSU), petrochemical, and residential demand.',
    costs: {
      studioRange: '$750–$1,550',
      familyRange: '$2,700–$6,000',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'East Baton Rouge Parish pricing reflects Baton Rouge metro traffic, LSU and state-government relocation demand, and competition among full-service local and regional van-line agents.',
    },
    tips: [
      'Verify coverage for Baton Rouge, Zachary, Central, and surrounding areas before booking.',
      'Major highway and industrial traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and flood/hurricane-related coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getLouisianaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return louisianaCountyResearch[countySlug];
}