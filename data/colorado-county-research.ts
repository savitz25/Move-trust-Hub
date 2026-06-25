import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Colorado county research — batch 1: 7/64 */
export const coloradoCountyResearch: Record<string, CuratedCountyResearch> = {
  'el-paso': {
    marketNotes:
      'El Paso County is Colorado’s second most populous county with strong military, suburban, and residential demand.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,000+',
      avgHourly: '$125–$190/hr for a 2-person crew',
      note: 'El Paso County pricing reflects Colorado Springs metro demand, military PCS turnover, Pikes Peak corridor traffic, and competition among full-service agents serving suburban communities.',
    },
    tips: [
      'Verify coverage for Colorado Springs, Fountain, and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  denver: {
    marketNotes:
      'Denver County is coterminous with the City of Denver, with dense urban and residential demand.',
    costs: {
      studioRange: '$950–$2,100',
      familyRange: '$4,000–$9,500+',
      avgHourly: '$135–$200/hr for a 2-person crew',
      note: 'Denver County pricing reflects dense urban demand, parking and elevator access fees, heavy I-25 and I-70 corridor traffic, and competition among full-service agents serving downtown and neighborhood moves.',
    },
    tips: [
      'Verify coverage for Denver and surrounding neighborhoods before booking.',
      'Heavy urban traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value urban properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  arapahoe: {
    marketNotes:
      'Arapahoe County is a large suburban county south of Denver with strong residential demand.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$125–$190/hr for a 2-person crew',
      note: 'Arapahoe County pricing reflects Aurora and Centennial suburban demand, Denver metro spillover, and competition among full-service agents serving south-metro communities.',
    },
    tips: [
      'Verify coverage for Aurora, Centennial, and surrounding cities before booking.',
      'Denver metro traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jefferson: {
    marketNotes:
      'Jefferson County is a large suburban county west of Denver with strong residential demand.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$125–$190/hr for a 2-person crew',
      note: 'Jefferson County pricing reflects Lakewood and Arvada suburban demand, foothills access, Denver metro spillover, and competition among full-service agents serving west-metro communities.',
    },
    tips: [
      'Verify coverage for Lakewood, Arvada, and surrounding cities before booking.',
      'Denver metro traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  adams: {
    marketNotes:
      'Adams County is a large suburban county northeast of Denver with strong residential demand.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$120–$185/hr for a 2-person crew',
      note: 'Adams County pricing reflects Thornton and Westminster suburban demand, Denver metro spillover, and competition among full-service agents serving north-metro communities.',
    },
    tips: [
      'Verify coverage for Thornton, Westminster, and surrounding cities before booking.',
      'Denver metro traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  douglas: {
    marketNotes:
      'Douglas County is a large and affluent suburban county south of Denver with strong residential demand.',
    costs: {
      studioRange: '$950–$2,000',
      familyRange: '$3,800–$9,000+',
      avgHourly: '$130–$195/hr for a 2-person crew',
      note: 'Douglas County pricing reflects Castle Rock and Highlands Ranch affluent suburban demand, Denver metro spillover, and competition among full-service agents serving south-suburban communities.',
    },
    tips: [
      'Verify coverage for Castle Rock, Highlands Ranch, and surrounding cities before booking.',
      'Denver metro traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  weld: {
    marketNotes:
      'Weld County is a rapidly growing northern Colorado county with strong residential and agricultural demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Weld County pricing reflects Greeley metro demand, northern front-range growth, agricultural corridor logistics, and competition among regional agents serving Weld communities.',
    },
    tips: [
      'Verify coverage for Greeley and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getColoradoCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return coloradoCountyResearch[countySlug];
}