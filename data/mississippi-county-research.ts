import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Mississippi county research — grows incrementally per batch */
export const mississippiCountyResearch: Record<string, CuratedCountyResearch> = {
  harrison: {
    marketNotes:
      "Harrison County is one of Mississippi's largest and most populous counties, with strong coastal, tourism, and military-driven residential demand along the Gulfport-Biloxi corridor.",
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Harrison County pricing reflects Gulf Coast access constraints, Keesler AFB and tourism-season volume, and cross-border crews from Mobile and Baldwin County providers.',
    },
    tips: [
      'Verify coverage for Gulfport, Biloxi, Long Beach, and Pass Christian areas before booking.',
      'Coastal access and hurricane-season considerations are critical — confirm scheduling buffers.',
      'Confirm insurance for high-value waterfront and coastal properties before booking.',
      'Book early for peak tourist seasons and military PCS windows.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hinds: {
    marketNotes:
      "Hinds County is Mississippi's most populous county and the core of the Jackson metropolitan area, with strong government, educational, and residential demand.",
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Hinds County pricing reflects Jackson metro urban traffic, state-government relocation demand, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Jackson, Ridgeland, Clinton, and Byram areas before booking.',
      'Urban and government traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value urban and suburban properties before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  desoto: {
    marketNotes:
      "DeSoto County is Mississippi's fastest-growing county and a major suburban extension of the Memphis metropolitan area.",
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'DeSoto County pricing reflects Memphis-metro suburban growth in Southaven, Olive Branch, and Horn Lake, plus I-55 corridor traffic from Tennessee-based crews.',
    },
    tips: [
      'Verify coverage for Southaven, Olive Branch, and Horn Lake areas before booking.',
      'Memphis-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  rankin: {
    marketNotes:
      "Rankin County is one of Mississippi's fastest-growing counties with strong suburban residential demand east of Jackson.",
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Rankin County pricing reflects suburban demand in Brandon, Flowood, and Pearl, plus Jackson-metro traffic and shared crews from Hinds and Madison County providers.',
    },
    tips: [
      'Verify coverage for Brandon, Flowood, and Pearl areas before booking.',
      'Jackson-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jackson: {
    marketNotes:
      'Jackson County is a coastal county in Southeast Mississippi with strong shipbuilding, industrial, and residential demand along the Pascagoula-Gautier corridor.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,700',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Jackson County pricing reflects coastal industrial demand, Ingalls Shipbuilding relocations, and regional crews from Gulfport-Biloxi and Mobile metro providers.',
    },
    tips: [
      'Verify coverage for Pascagoula, Gautier, and Ocean Springs areas before booking.',
      'Coastal access and hurricane-season considerations are critical — confirm scheduling buffers.',
      'Confirm insurance for high-value waterfront properties before booking.',
      'Book early for peak seasons and industrial relocation windows.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getMississippiCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return mississippiCountyResearch[countySlug];
}