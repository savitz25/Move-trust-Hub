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
  bergen: {
    marketNotes:
      'Bergen County is one of New Jersey’s most populous and affluent counties with dense suburban communities, proximity to NYC, and diverse residential moves. Moves often involve high-rises, family homes, and cross-river logistics.',
    costs: {
      studioRange: '$500–$1,100',
      familyRange: '$2,000–$4,500+',
      avgHourly: '$125–$185/hr for a 2-person crew',
      note: 'Hackensack, Paramus, and Ridgewood moves often reflect parking permits, elevator reservations, and George Washington Bridge traffic windows.',
    },
    tips: [
      'Many communities have tight parking and HOA rules; confirm building requirements early.',
      'Proximity to NYC and George Washington Bridge affects traffic and timing.',
      'High-value suburban homes common; verify insurance coverage.',
      'Obtain multiple estimates due to competitive market.',
      'Confirm service for specific towns (Hackensack, Paramus, Ridgewood, etc.).',
    ],
  },
};

export function getNewJerseyCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return newJerseyCountyResearch[countySlug];
}