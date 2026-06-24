import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated District of Columbia research — premium capital-city market */
export const districtOfColumbiaCountyResearch: Record<string, CuratedCountyResearch> = {
  'district-of-columbia': {
    marketNotes:
      'Washington, DC is the nation\'s capital and a premium urban market with dense federal, diplomatic, corporate, and residential demand. Moves routinely involve high-rise condos, historic rowhouses, security checkpoints, parking permits, and tight loading zones across all four quadrants.',
    costs: {
      studioRange: '$950-$2,100',
      familyRange: '$4,000-$9,500+',
      avgHourly: '$140-$210/hr for a 2-person crew',
      note: 'Washington, DC pricing reflects capital-city urban demand, elevator and freight-access fees, parking permit requirements, rowhouse and historic-building constraints, and competition among full-service DC-metro agents experienced with government and diplomatic relocations.',
    },
    tips: [
      'Confirm movers are experienced with DC parking permits, loading zones, and building freight-elevator reservations before booking high-rise or Capitol Hill moves.',
      'Government and diplomatic relocations may require security clearances, ID checks, and restricted loading windows — verify crew credentials and scheduling with building management early.',
      'High-rise apartment moves in Navy Yard, NoMa, and downtown often need COI (certificate of insurance) and freight-elevator booking; request these documents from your mover upfront.',
      'Joint Base Anacostia-Bolling and federal PCS turnover drive peak demand May-September — book 4-6 weeks ahead for military and agency relocations.',
      'Rowhouse moves in Georgetown, Capitol Hill, and Adams Morgan require narrow-street logistics; confirm shuttle-truck or parking solutions and obtain multiple FMCSA-verified estimates.',
    ],
  },
};

export function getDistrictOfColumbiaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return districtOfColumbiaCountyResearch[countySlug];
}