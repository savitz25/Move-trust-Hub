import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Virginia county research — batch 1 large markets */
export const virginiaCountyResearch: Record<string, CuratedCountyResearch> = {
  fairfax: {
    marketNotes:
      'Fairfax County is one of Virginia’s largest and wealthiest counties with strong suburban, corporate, and residential demand across Northern Virginia and the Washington DC metro.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$130–$200/hr for a 2-person crew',
      note: 'Fairfax County pricing reflects Northern Virginia suburban demand, I-66/I-495 corridor traffic, high-value home relocations, and competition among full-service DC-metro agents.',
    },
    tips: [
      'Verify coverage for Fairfax, Vienna, Reston, and surrounding areas before booking.',
      'Heavy urban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and townhome communities.',
      'Book early for peak seasons (May–September), federal PCS turnover, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getVirginiaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return virginiaCountyResearch[countySlug];
}