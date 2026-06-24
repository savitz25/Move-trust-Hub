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
      'Maricopa County anchors Arizona’s Phoenix metro — by far the state’s highest-value moving market. Rapid population growth, corporate and tech-sector relocations, retirement and snowbird seasonal moves, and extreme summer heat logistics distinguish Maricopa from Tucson and rural Arizona.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$130–$195/hr for a 2-person crew',
      note: 'Maricopa County pricing reflects Phoenix metro demand, I-10 and Loop 101/202 corridor traffic, extreme desert heat affecting crew scheduling, and competition among full-service agents serving Scottsdale, Mesa, Chandler, and East Valley suburban communities.',
    },
    tips: [
      'Verify coverage for Phoenix, Scottsdale, Mesa, Chandler, and surrounding cities before booking.',
      'Heavy urban traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Summer heat (110°F+) may affect loading times — confirm early-morning scheduling when possible.',
      'Corporate and executive relocations may require building access coordination — confirm commercial move experience.',
      'Snowbird and retirement downsizing moves often need storage and seasonal scheduling — confirm flexible timing.',
      'Confirm insurance for high-value suburban and golf-community homes.',
      'Book early for peak seasons (October–April snowbird influx, May–September heat) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  pima: {
    marketNotes:
      'Pima County anchors southern Arizona’s Tucson metro — a university, military, and retirement market distinct from Phoenix corporate growth. University of Arizona student moves, Davis-Monthan AFB military PCS relocations, and Oro Valley retirement communities distinguish Pima from the fast-growing Valley.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Pima County pricing reflects Tucson metro demand, I-10 corridor traffic, Davis-Monthan AFB-area military PCS volume, and competition among full-service agents serving Tucson, Oro Valley, and Marana communities.',
    },
    tips: [
      'Verify coverage for Tucson, Oro Valley, Marana, and surrounding cities before booking.',
      'Military PCS moves near Davis-Monthan AFB require base access coordination — confirm mover credentials and clearance experience.',
      'University of Arizona semester changeover (August and December) creates peak demand — book early.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value retirement-community and foothills homes.',
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
      'Mohave County spans northwestern Arizona’s Colorado River corridor — a long-distance and cross-border market linking Kingman, Lake Havasu City, and Bullhead City to Las Vegas (Clark County, NV) and California’s Inland Empire. Retirement and tourism moves along the river distinguish Mohave from Phoenix metro demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Mohave County pricing reflects Kingman and Colorado River corridor demand, cross-border long-distance hauls to NV and CA, and regional travel affecting crew availability.',
    },
    tips: [
      'Verify coverage for Kingman, Lake Havasu City, and Bullhead City before booking.',
      'Long-distance moves to Las Vegas or California may require interstate FMCSA authority — confirm licensing.',
      'Extreme summer heat affects loading schedules — confirm early-morning crew windows.',
      'Confirm insurance for high-value riverfront and retirement-community homes.',
      'Book early for peak snowbird seasons (October–April) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  yuma: {
    marketNotes:
      'Yuma County anchors southwestern Arizona’s border and agricultural corridor — extreme summer heat, Imperial Valley cross-border logistics, and long-distance moves to San Diego and Phoenix distinguish Yuma from northern high-country markets.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Yuma County pricing reflects border-region and agricultural-community demand, Imperial Valley cross-border traffic, and extreme summer heat (often the nation’s hottest) affecting scheduling.',
    },
    tips: [
      'Verify coverage for Yuma, San Luis, and surrounding communities before booking.',
      'Cross-border moves to Imperial County, CA may require additional customs and timing coordination.',
      'Extreme summer heat severely limits outdoor loading — confirm early-morning scheduling.',
      'Agricultural and military (MCAS Yuma) relocations may need specialized scheduling — confirm experience.',
      'Book early for winter snowbird influx (October–March) and month-end lease changeover.',
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
      'Cochise County is southeastern Arizona’s military and border corridor — Fort Huachuca PCS moves, Sierra Vista suburban growth, and Douglas border-region logistics distinguish Cochise from Tucson metro density.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Cochise County pricing reflects Sierra Vista and Fort Huachuca military PCS demand, I-10 corridor traffic, and regional travel affecting crew scheduling.',
    },
    tips: [
      'Verify coverage for Sierra Vista, Bisbee, and Douglas before booking.',
      'Military PCS moves near Fort Huachuca require base access coordination — confirm mover credentials.',
      'Border-region long-distance hauls may need interstate FMCSA authority — confirm licensing.',
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
      'Greenlee County is Arizona’s smallest county and a rural mining corridor — copper-industry relocations, remote mountain-road access, and long-distance regional hauls to Tucson or Phoenix distinguish Greenlee from metro Arizona markets.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$95–$145/hr for a 2-person crew',
      note: 'Greenlee County pricing reflects Clifton–Morenci copper-corridor and mining-community demand with remote travel and limited local crew availability.',
    },
    tips: [
      'Verify coverage for Clifton, Morenci, and surrounding areas before booking.',
      'Mining-industry relocations may require industrial-site coordination — confirm commercial move experience.',
      'Remote mountain roads affect truck access and scheduling — confirm vehicle size and route planning.',
      'Long-distance hauls to Tucson or Phoenix are common — confirm interstate FMCSA authority.',
      'Book early — limited local crew availability in rural Greenlee County.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getArizonaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return arizonaCountyResearch[countySlug];
}