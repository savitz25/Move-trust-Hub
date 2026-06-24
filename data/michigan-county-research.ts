import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Michigan county research — grows incrementally per batch */
export const michiganCountyResearch: Record<string, CuratedCountyResearch> = {
  wayne: {
    marketNotes:
      'Wayne County is Michigan’s most populous county and the core of the Detroit metropolitan area, with strong urban, corporate, and residential demand across Detroit, Dearborn, Livonia, and Westland.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Wayne County pricing reflects Detroit metro urban demand, I-75/I-94 corridor traffic, corporate relocation volume, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Detroit, Dearborn, Livonia, Westland, and surrounding areas before booking.',
      'Heavy urban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value urban/suburban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  oakland: {
    marketNotes:
      'Oakland County is one of Michigan’s wealthiest and most populous suburban counties with strong corporate, healthcare, and residential demand across Troy, Rochester Hills, Pontiac, and Royal Oak.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Oakland County pricing reflects affluent suburban Detroit demand, I-75/I-696 corridor traffic, corporate relocation volume, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Troy, Rochester Hills, Pontiac, Royal Oak, and surrounding areas before booking.',
      'Heavy suburban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  macomb: {
    marketNotes:
      'Macomb County is a major suburban county northeast of Detroit with strong residential and industrial demand across Warren, Sterling Heights, Clinton Township, and Roseville.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Macomb County pricing reflects northeast Detroit suburban growth, I-94/I-696 corridor traffic, and competition among full-service local and regional agents serving Warren and Sterling Heights.',
    },
    tips: [
      'Verify coverage for Warren, Sterling Heights, Clinton Township, and Roseville areas before booking.',
      'Heavy suburban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getMichiganCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return michiganCountyResearch[countySlug];
}