import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Georgia county research — grows incrementally per batch */
export const georgiaCountyResearch: Record<string, CuratedCountyResearch> = {
  fulton: {
    marketNotes:
      'Fulton County is the core of the Atlanta metro with high residential, commercial, and urban moving demand across Atlanta, Sandy Springs, Roswell, and Alpharetta. Dense high-rises, Buckhead estates, and I-285 corridor traffic create complex scheduling, parking, and building-access logistics for local crews.',
    costs: {
      studioRange: '$650–$1,300',
      familyRange: '$2,500–$5,500+',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Fulton County pricing reflects Atlanta traffic windows, elevator reservations, concierge move rules, and premium labor demand in core urban neighborhoods.',
    },
    tips: [
      'Heavy Atlanta traffic on I-75, I-85, and I-285 significantly impacts scheduling — book morning slots and confirm crew arrival windows.',
      'Verify coverage for all parts of Fulton County including South Fulton, Buckhead, Midtown, and perimeter suburbs.',
      'Confirm insurance and valuation options for high-value urban homes and condo high-rises.',
      'Book early for peak seasons (May–September) and month-end lease turnover in Atlanta.',
      'Obtain multiple written estimates and compare hourly vs. flat-rate pricing before signing.',
      'Consider parking restrictions and loading-zone permits in dense Atlanta neighborhoods and downtown high-rises.',
      'Check HOA rules, elevator reservations, and move-in/out windows in newer Fulton County developments.',
    ],
  },
  gwinnett: {
    marketNotes:
      'Gwinnett County is one of the fastest-growing counties in the Atlanta metro, anchored by Lawrenceville, Duluth, Suwanee, and Buford. Suburban single-family homes, townhome communities, and school-district-driven relocations create steady demand for full-service local movers with strong highway corridor coverage.',
    costs: {
      studioRange: '$600–$1,200',
      familyRange: '$2,200–$5,000+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Gwinnett moves often reflect suburban driveway access, HOA communities, and Atlanta metro traffic on I-85 and GA-316.',
    },
    tips: [
      'Heavy Atlanta metro traffic on I-85 and GA-316 impacts scheduling — confirm crew routes and arrival windows.',
      'Verify coverage for Lawrenceville, Duluth, Suwanee, Buford, and surrounding Gwinnett communities.',
      'Confirm insurance for high-value homes and ask about specialty handling for large suburban furniture.',
      'Book early for peak seasons and end-of-month apartment and home closings.',
      'Obtain multiple written estimates and ask about travel fees for outer Gwinnett addresses.',
      'Check HOA move rules, parking, and gate access in newer Lawrenceville-area subdivisions.',
      'Ask whether a smaller truck is needed for townhome courts or narrow community streets.',
    ],
  },
};

export function getGeorgiaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return georgiaCountyResearch[countySlug];
}