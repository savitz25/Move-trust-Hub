import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated North Carolina county research — grows incrementally per batch */
export const northCarolinaCountyResearch: Record<string, CuratedCountyResearch> =
  {
    wake: {
      marketNotes:
        'Wake County is one of the fastest-growing counties in the United States, with strong demand driven by technology, education, and corporate relocations centered on Raleigh, Cary, and Apex.',
      costs: {
        studioRange: '$750–$1,500',
        familyRange: '$2,600–$5,800',
        avgHourly: '$115–$170/hr for a 2-person crew',
        note: 'Wake County pricing reflects Research Triangle metro growth, corporate relocation volume, Cary and Apex suburban turnover, and peak summer moving season demand.',
      },
      tips: [
        'Verify explicit coverage for Raleigh, Cary, Apex, and surrounding Wake County addresses before booking.',
        'Research Triangle traffic on I-40, I-440, and US-1 significantly impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value tech and corporate relocations before booking.',
        'Book early for peak seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
  };

export function getNorthCarolinaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return northCarolinaCountyResearch[countySlug];
}