import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Grok Heavy–researched county content overrides templated SEO sections */
export const californiaCountyResearch: Record<string, CuratedCountyResearch> = {
  alameda: {
    marketNotes:
      'Alameda County is a major Bay Area county with dense urban (Oakland, Berkeley) and suburban areas. Moves often involve high-rises, apartments, and family homes with strong local options.',
    costs: {
      studioRange: '$550–$1,200',
      familyRange: '$2,200–$5,000+',
      avgHourly: '$140–$210/hr for a 2-person crew',
      note: 'Oakland, Berkeley, and Fremont moves often reflect elevator reservations, Bay Bridge traffic, and high-value urban handling.',
    },
    tips: [
      'Many buildings require elevator reservations and certificates of insurance.',
      'Heavy traffic on I-880, I-580, and Bay Bridge approaches.',
      'Verify coverage for Oakland, Berkeley, Fremont, and Hayward.',
      'Confirm insurance for high-value urban items.',
      'Book early for peak seasons.',
    ],
  },
  alpine: {
    marketNotes:
      "Alpine County is California's least populous and most rural county in the Sierra Nevada. Moves are extremely limited and primarily residential/seasonal with regional support from Carson City, NV or South Lake Tahoe.",
    costs: {
      studioRange: '$500–$1,000+',
      familyRange: '$1,800–$4,000+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Markleeville and remote Alpine County moves often reflect mountain access roads, winter weather, and travel from Tahoe or Sacramento crews.',
    },
    tips: [
      'Mountain and remote properties have severe access challenges, especially in winter.',
      'Verify explicit regional service to Markleeville.',
      'Storage is extremely limited; use regional facilities.',
      'Book well in advance.',
      'Confirm credentials for high-altitude/rural moves.',
    ],
  },
  amador: {
    marketNotes:
      'Amador County is rural Gold Country with Jackson and Sutter Creek. Moves are primarily residential with regional support from Sacramento.',
    costs: {
      studioRange: '$450–$900',
      familyRange: '$1,600–$3,400',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Jackson and Sutter Creek moves often reflect historic-property handling, foothill access, and travel from Sacramento metro crews.',
    },
    tips: [
      'Historic Gold Country properties require preservation-sensitive handling.',
      'Rural and foothill areas have access challenges.',
      'Verify regional service to Jackson.',
      'Obtain multiple estimates.',
      'Confirm credentials.',
    ],
  },
};

export function getCaliforniaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return californiaCountyResearch[countySlug];
}