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
  jasper: {
    marketNotes:
      'Jasper County is the core of the Joplin metropolitan area with strong industrial, healthcare, and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Jasper County pricing reflects Joplin metro Ozarks regional demand, I-44 corridor traffic, and competition among full-service local and regional agents serving Carthage and the greater Joplin area.',
    },
    tips: [
      'Verify coverage for Joplin and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cass: {
    marketNotes:
      'Cass County is a rapidly growing suburban county south of Kansas City with strong residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Cass County pricing reflects south Kansas City metro suburban growth, I-49 corridor traffic, and competition among full-service local and regional agents serving Harrisonville, Raymore, and Belton.',
    },
    tips: [
      'Verify coverage for Harrisonville, Raymore, and Belton areas before booking.',
      'Kansas City-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  platte: {
    marketNotes:
      'Platte County is a growing suburban county northwest of Kansas City with strong residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Platte County pricing reflects northwest Kansas City metro suburban growth, I-29 and Highway 152 corridor traffic, and competition among full-service local and regional agents serving Platte City, Parkville, and Riverside.',
    },
    tips: [
      'Verify coverage for Platte City, Parkville, and Riverside areas before booking.',
      'Kansas City-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  franklin: {
    marketNotes:
      'Franklin County is a growing suburban county west of St. Louis with strong residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Franklin County pricing reflects west St. Louis metro suburban growth, I-44 corridor traffic, and competition among full-service local and regional agents serving Union, Washington, and Pacific.',
    },
    tips: [
      'Verify coverage for Union, Washington, and Pacific areas before booking.',
      'St. Louis-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood/tornado coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  christian: {
    marketNotes:
      'Christian County is one of Missouri’s fastest-growing counties south of Springfield with strong suburban residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Christian County pricing reflects south Springfield metro suburban growth, Highway 65 corridor traffic, and competition among full-service local and regional agents serving Ozark, Nixa, and Clever.',
    },
    tips: [
      'Verify coverage for Ozark, Nixa, and Clever areas before booking.',
      'Springfield-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'cape-girardeau': {
    marketNotes:
      'Cape Girardeau County is the economic center of Southeast Missouri with strong healthcare, education, and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Cape Girardeau County pricing reflects southeast Missouri regional demand, Mississippi River corridor access, and competition among full-service local and regional agents serving Cape Girardeau and Jackson.',
    },
    tips: [
      'Verify coverage for Cape Girardeau and Jackson areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and flood/tornado coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  buchanan: {
    marketNotes:
      'Buchanan County is the core of the St. Joseph metropolitan area with strong industrial and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Buchanan County pricing reflects northwest Missouri regional demand, I-29 corridor traffic, and competition among full-service local and regional agents serving the greater St. Joseph area.',
    },
    tips: [
      'Verify coverage for St. Joseph and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cole: {
    marketNotes:
      'Cole County is the core of the Jefferson City metropolitan area with strong governmental and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Cole County pricing reflects state-government relocation cycles, Jefferson City urban traffic patterns, and competition among full-service local and regional agents serving the capital metro.',
    },
    tips: [
      'Verify coverage for Jefferson City and surrounding areas before booking.',
      'Governmental traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
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