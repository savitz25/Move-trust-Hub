import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Grok Heavy–researched county content overrides templated SEO sections */
export const newJerseyCountyResearch: Record<string, CuratedCountyResearch> = {
  atlantic: {
    marketNotes:
      'Atlantic County centers on Atlantic City tourism, coastal properties, and suburban/rural areas. Moves often involve condos, seasonal properties, and residential relocations with casino/hospitality considerations.',
    costs: {
      studioRange: '$450–$950',
      familyRange: '$1,800–$4,000',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Atlantic City, Egg Harbor, and shore-area moves often reflect condo elevator fees, summer tourism-season demand, and parking restrictions near the boardwalk.',
    },
    tips: [
      'Coastal/boardwalk properties require sand protection and elevator coordination.',
      'Summer tourism peaks demand; book early.',
      'Condos/HOAs have strict rules—obtain approvals early.',
      'Verify coverage for Atlantic City, Egg Harbor, and outlying areas.',
      'Confirm insurance for waterfront/high-value items.',
    ],
  },
};

export function getNewJerseyCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return newJerseyCountyResearch[countySlug];
}