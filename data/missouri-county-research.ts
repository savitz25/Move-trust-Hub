import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Missouri county research — grows incrementally per batch */
export const missouriCountyResearch: Record<string, CuratedCountyResearch> = {
  'st-louis': {
    marketNotes:
      'St. Louis County is Missouri’s most populous county and forms the core of the St. Louis metropolitan area, with strong corporate, healthcare, and suburban residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'St. Louis County pricing reflects metro suburban growth, I-64/I-270 corridor traffic, corporate relocation demand, and competition among full-service local and regional agents serving Chesterfield, Kirkwood, and Florissant.',
    },
    tips: [
      'Verify coverage for Chesterfield, Creve Coeur, Kirkwood, Florissant, and surrounding areas before booking.',
      'Heavy urban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood/tornado coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jackson: {
    marketNotes:
      'Jackson County is Missouri’s most populous county and forms the core of the Kansas City metropolitan area, with strong urban, governmental, and residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Jackson County pricing reflects Kansas City metro urban growth, I-70/I-435 corridor traffic, governmental relocation demand, and competition among full-service local and regional agents serving Independence, Lee’s Summit, and Blue Springs.',
    },
    tips: [
      'Verify coverage for Kansas City, Independence, Lee’s Summit, and Blue Springs areas before booking.',
      'Heavy urban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'st-charles': {
    marketNotes:
      'St. Charles County is one of Missouri’s fastest-growing counties with strong suburban residential and corporate demand west of St. Louis.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'St. Charles County pricing reflects west St. Louis metro suburban growth, I-70 and Highway 364 corridor traffic, corporate relocation demand, and competition among full-service local and regional agents serving St. Charles, O’Fallon, and Wentzville.',
    },
    tips: [
      'Verify coverage for St. Charles, O’Fallon, St. Peters, and Wentzville areas before booking.',
      'St. Louis-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  greene: {
    marketNotes:
      'Greene County is Missouri’s third-most populous county and the core of the Springfield metropolitan area, with strong educational, healthcare, and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Greene County pricing reflects Springfield metro Ozarks regional demand, I-44 corridor traffic, and competition among full-service local and regional agents serving the greater Springfield area.',
    },
    tips: [
      'Verify coverage for Springfield and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'st-louis-city': {
    marketNotes:
      'St. Louis City is an independent city and the core of the St. Louis metropolitan area with strong urban, cultural, and residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'St. Louis City pricing reflects dense urban relocation demand, I-64/I-55 corridor traffic, historic neighborhood access challenges, and competition among full-service local and regional agents serving city neighborhoods.',
    },
    tips: [
      'Verify coverage for city neighborhoods and surrounding areas before booking.',
      'Heavy urban traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value urban homes and flood/tornado coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  clay: {
    marketNotes:
      'Clay County is a major suburban county north of Kansas City with strong residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Clay County pricing reflects north Kansas City metro suburban growth, I-35 and Highway 152 corridor traffic, and competition among full-service local and regional agents serving Liberty, Gladstone, and Kearney.',
    },
    tips: [
      'Verify coverage for Liberty, Gladstone, Kearney, and surrounding areas before booking.',
      'Kansas City-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jefferson: {
    marketNotes:
      'Jefferson County is a rapidly growing suburban county south of St. Louis with strong residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Jefferson County pricing reflects south St. Louis metro suburban growth, I-55 corridor traffic, and competition among full-service local and regional agents serving Arnold, Festus, and Crystal City.',
    },
    tips: [
      'Verify coverage for Arnold, Festus, Crystal City, and surrounding areas before booking.',
      'St. Louis-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood/tornado coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  boone: {
    marketNotes:
      'Boone County is anchored by the University of Missouri with strong educational, healthcare, and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Boone County pricing reflects Columbia university-town turnover, I-70 corridor traffic, student move seasons, and competition among full-service local and regional agents serving the greater Columbia area.',
    },
    tips: [
      'Verify coverage for Columbia and surrounding areas before booking.',
      'University traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getMissouriCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return missouriCountyResearch[countySlug];
}