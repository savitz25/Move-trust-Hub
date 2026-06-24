import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Arizona county research — 15/15 complete */
export const arizonaCountyResearch: Record<string, CuratedCountyResearch> = {
  maricopa: {
    marketNotes:
      'Maricopa County is Arizona’s most populous county with strong urban, suburban, and residential demand.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$130–$195/hr for a 2-person crew',
      note: 'Maricopa County pricing reflects Phoenix metro demand, I-10 and Loop 101/202 corridor traffic, desert heat, and competition among full-service agents serving urban and East Valley suburban communities.',
    },
    tips: [
      'Verify coverage for Phoenix, Mesa, Scottsdale, and surrounding cities before booking.',
      'Heavy urban traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Summer heat may affect loading times — confirm early-morning scheduling when possible.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  pima: {
    marketNotes:
      'Pima County is Arizona’s second most populous county with strong urban and residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Pima County pricing reflects Tucson metro demand, I-10 corridor traffic, and competition among full-service agents serving Tucson and surrounding communities.',
    },
    tips: [
      'Verify coverage for Tucson and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  pinal: {
    marketNotes:
      'Pinal County is a rapidly growing county between Phoenix and Tucson with strong suburban residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Pinal County pricing reflects Phoenix metro spillover demand, I-10 corridor traffic through Casa Grande, and competition among regional agents serving Florence and fast-growing suburban communities.',
    },
    tips: [
      'Verify coverage for Casa Grande, Florence, and surrounding cities before booking.',
      'Phoenix metro traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  yavapai: {
    marketNotes:
      'Yavapai County is a central Arizona county with strong residential and retirement demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Yavapai County pricing reflects Prescott-area retirement and Verde Valley demand with regional travel affecting crew scheduling.',
    },
    tips: [
      'Verify coverage for Prescott and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mohave: {
    marketNotes:
      'Mohave County is a northwestern Arizona county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Mohave County pricing reflects Kingman and Colorado River corridor demand with regional travel affecting crew availability.',
    },
    tips: [
      'Verify coverage for Kingman and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  yuma: {
    marketNotes:
      'Yuma County is a southwestern Arizona county with residential and agricultural demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Yuma County pricing reflects border-region and agricultural-community demand with extreme summer heat affecting scheduling.',
    },
    tips: [
      'Verify coverage for Yuma and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  coconino: {
    marketNotes:
      'Coconino County is a northern Arizona county with strong tourism and residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Coconino County pricing reflects Flagstaff high-country and tourism demand, I-40 and US-180 corridor traffic, and seasonal visitor traffic.',
    },
    tips: [
      'Verify coverage for Flagstaff and surrounding areas before booking.',
      'Tourist traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak tourist seasons (May–September).',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cochise: {
    marketNotes:
      'Cochise County is a southeastern Arizona county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Cochise County pricing reflects Sierra Vista and Fort Huachuca-area demand with regional travel affecting crew scheduling.',
    },
    tips: [
      'Verify coverage for Sierra Vista and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  navajo: {
    marketNotes:
      'Navajo County, Arizona is a large northeastern county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Navajo County, Arizona pricing reflects Holbrook and northeastern Arizona demand with extended travel distances affecting regional mover scheduling.',
    },
    tips: [
      'Verify coverage for Holbrook and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  apache: {
    marketNotes:
      'Apache County, Arizona is a large northeastern county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Apache County, Arizona pricing reflects St. Johns and White Mountains-area demand with remote travel affecting crew availability.',
    },
    tips: [
      'Verify coverage for St. Johns and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  gila: {
    marketNotes:
      'Gila County, Arizona is a central Arizona county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Gila County, Arizona pricing reflects Globe and Tonto Basin demand with mountain-road travel affecting regional mover scheduling.',
    },
    tips: [
      'Verify coverage for Globe and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'santa-cruz': {
    marketNotes:
      'Santa Cruz County, Arizona is a southern Arizona county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Santa Cruz County, Arizona pricing reflects Nogales border-region demand with cross-border traffic affecting scheduling.',
    },
    tips: [
      'Verify coverage for Nogales and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  graham: {
    marketNotes:
      'Graham County is a southeastern Arizona county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Graham County pricing reflects Safford and Gila Valley demand with regional travel affecting crew scheduling.',
    },
    tips: [
      'Verify coverage for Safford and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'la-paz': {
    marketNotes:
      'La Paz County, Arizona is a western Arizona county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'La Paz County, Arizona pricing reflects Parker and Colorado River west-bank demand with regional travel affecting crew availability.',
    },
    tips: [
      'Verify coverage for Parker and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  greenlee: {
    marketNotes:
      'Greenlee County is one of Arizona’s smallest counties with rural residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$95–$145/hr for a 2-person crew',
      note: 'Greenlee County pricing reflects Clifton copper-corridor demand with remote travel affecting regional mover availability.',
    },
    tips: [
      'Verify coverage for Clifton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getArizonaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return arizonaCountyResearch[countySlug];
}