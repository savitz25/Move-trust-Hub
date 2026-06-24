import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Kentucky county research — grows incrementally per batch */
export const kentuckyCountyResearch: Record<string, CuratedCountyResearch> = {
  jefferson: {
    marketNotes:
      'Jefferson County is the core of the Louisville metropolitan area with strong urban, corporate, and residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Jefferson County pricing reflects Louisville metro urban demand, I-64/I-65 corridor traffic, Ohio River flood-zone considerations, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Louisville and surrounding areas before booking.',
      'Heavy urban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value urban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  fayette: {
    marketNotes:
      'Fayette County is the core of the Lexington metropolitan area with strong educational, corporate, and residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Fayette County pricing reflects Lexington metro demand, university and thoroughbred-country relocation volume, Bluegrass Parkway traffic patterns, and competition among full-service local agents.',
    },
    tips: [
      'Verify coverage for Lexington and surrounding areas before booking.',
      'University and urban traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  kenton: {
    marketNotes:
      'Kenton County is a major suburban county in the Cincinnati metropolitan area with strong residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Kenton County pricing reflects Cincinnati-metro suburban demand, I-71/I-75 corridor traffic, Ohio River valley relocation volume, and competition among Kentucky-side and cross-river agents.',
    },
    tips: [
      'Verify coverage for Covington, Erlanger, and surrounding areas before booking.',
      'Cincinnati-area traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  warren: {
    marketNotes:
      'Warren County is the core of the Bowling Green metropolitan area with strong educational and residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Warren County pricing reflects Bowling Green regional demand, I-65 corridor traffic, Western Kentucky University area volume, and competition among local and regional full-service agents.',
    },
    tips: [
      'Verify coverage for Bowling Green and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getKentuckyCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return kentuckyCountyResearch[countySlug];
}