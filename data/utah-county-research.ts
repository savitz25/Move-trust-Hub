import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Utah county research — batch 1: 4/29 */
export const utahCountyResearch: Record<string, CuratedCountyResearch> = {
  'salt-lake': {
    marketNotes:
      'Salt Lake County is Utah’s most populous county with strong urban, suburban, and residential demand.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$130–$195/hr for a 2-person crew',
      note: 'Salt Lake County pricing reflects Salt Lake City metro demand, I-15 and I-80 corridor traffic, and competition among full-service agents serving urban and suburban communities.',
    },
    tips: [
      'Verify coverage for Salt Lake City, West Valley City, Sandy, and surrounding cities before booking.',
      'Heavy urban traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  utah: {
    marketNotes:
      'Utah County is a rapidly growing county with strong residential, educational, and tech demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Utah County pricing reflects Provo-Orem metro demand, BYU and UVU student turnover, tech-corridor growth, and competition among full-service agents serving Utah Valley communities.',
    },
    tips: [
      'Verify coverage for Provo, Orem, Lehi, and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  davis: {
    marketNotes:
      'Davis County is a large suburban county north of Salt Lake City with strong residential demand.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,000+',
      avgHourly: '$125–$190/hr for a 2-person crew',
      note: 'Davis County pricing reflects Layton and Bountiful suburban demand, Salt Lake metro spillover, and competition among full-service agents serving northern Wasatch Front communities.',
    },
    tips: [
      'Verify coverage for Layton, Bountiful, and surrounding cities before booking.',
      'Salt Lake metro traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  weber: {
    marketNotes:
      'Weber County is a northern Utah county with strong residential demand across the Ogden metro.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Weber County pricing reflects Ogden metro demand, I-15 corridor traffic, and competition among full-service agents serving northern Wasatch Front communities.',
    },
    tips: [
      'Verify coverage for Ogden and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getUtahCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return utahCountyResearch[countySlug];
}