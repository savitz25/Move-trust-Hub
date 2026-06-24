import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Rhode Island county research — complete state (5/5 counties) */
export const rhodeIslandCountyResearch: Record<string, CuratedCountyResearch> = {
  providence: {
    marketNotes:
      'Providence County is Rhode Island’s most populous county with strong urban, suburban, and residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$125–$180/hr for a 2-person crew',
      note: 'Providence County pricing reflects urban and suburban Rhode Island demand, I-95 and Route 6 corridor traffic, and competition among full-service agents serving Providence and surrounding communities.',
    },
    tips: [
      'Verify coverage for Providence and surrounding towns before booking.',
      'Urban traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value urban and suburban homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  kent: {
    marketNotes:
      'Kent County is a suburban county in central Rhode Island with strong residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Kent County pricing reflects Providence-metro suburban demand, I-95 and Route 2 corridor traffic, and competition among regional full-service agents serving Warwick and Coventry.',
    },
    tips: [
      'Verify coverage for Warwick, Coventry, and surrounding towns before booking.',
      'Providence-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  washington: {
    marketNotes:
      'Washington County is a coastal county in southern Rhode Island with strong residential and tourism demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Washington County pricing reflects southern Rhode Island coastal demand, Route 1 and tourist-corridor traffic, and competition among regional full-service agents serving South Kingstown and Narragansett.',
    },
    tips: [
      'Verify coverage for South Kingstown, Narragansett, and surrounding towns before booking.',
      'Tourist traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value coastal homes and multi-floor loading zones.',
      'Book early for peak tourist seasons (June–August) and summer lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  newport: {
    marketNotes:
      'Newport County includes the historic city of Newport with strong tourism, waterfront, and residential demand.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$130–$190/hr for a 2-person crew',
      note: 'Newport County pricing reflects historic waterfront and tourism demand, Aquidneck Island corridor traffic, and competition among regional full-service agents serving Newport and Middletown-area communities.',
    },
    tips: [
      'Verify coverage for Newport and surrounding towns before booking.',
      'Tourist traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value waterfront homes and multi-floor loading zones.',
      'Book early for peak tourist seasons (June–August) and summer lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  bristol: {
    marketNotes:
      'Bristol County is Rhode Island’s smallest county with strong waterfront and residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Bristol County pricing reflects East Bay waterfront demand, Route 114 and I-195 corridor traffic, and competition among regional full-service agents serving Bristol and Barrington-area communities.',
    },
    tips: [
      'Verify coverage for Bristol and surrounding towns before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value waterfront homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getRhodeIslandCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return rhodeIslandCountyResearch[countySlug];
}