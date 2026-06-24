import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated District of Columbia research */
export const districtOfColumbiaCountyResearch: Record<string, CuratedCountyResearch> = {
  'district-of-columbia': {
    marketNotes:
      "Washington, DC is the nation's capital with dense urban, governmental, diplomatic, and residential demand. Moves often involve tight city streets, historic buildings, and high security considerations.",
    costs: {
      studioRange: '$950–$2,100',
      familyRange: '$4,000–$9,500+',
      avgHourly: '$140–$210/hr for a 2-person crew',
      note: 'Washington, DC pricing reflects capital-city urban demand, parking permit requirements, rowhouse and historic-building access challenges, and competition among full-service DC-metro agents.',
    },
    tips: [
      'Verify coverage for all DC quadrants and surrounding areas before booking.',
      'Heavy urban traffic, street parking restrictions, and permit requirements significantly impact scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value urban and historic properties.',
      'Book early for peak seasons (May–September), federal PCS turnover, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getDistrictOfColumbiaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return districtOfColumbiaCountyResearch[countySlug];
}