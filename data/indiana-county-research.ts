import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Indiana county research — grows incrementally per batch */
export const indianaCountyResearch: Record<string, CuratedCountyResearch> = {
  marion: {
    marketNotes:
      'Marion County is the core of the Indianapolis metropolitan area with strong urban, corporate, and residential demand across Indianapolis, Speedway, and Lawrence.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Marion County pricing reflects Indianapolis metro urban demand, I-65/I-70 corridor traffic, corporate relocation volume, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Indianapolis and surrounding areas before booking.',
      'Heavy urban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value urban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lake: {
    marketNotes:
      'Lake County is a major suburban county in Northwest Indiana with strong industrial and residential demand across Gary, Hammond, Merrillville, and Crown Point near the Chicago metro.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Lake County pricing reflects Chicago-metro spillover demand, I-80/I-94 corridor traffic, industrial relocation volume, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Gary, Hammond, Merrillville, and Crown Point areas before booking.',
      'Chicago-area traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  allen: {
    marketNotes:
      'Allen County is the core of the Fort Wayne metropolitan area with strong industrial, healthcare, and residential demand across Fort Wayne and New Haven.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Allen County pricing reflects Northeast Indiana industrial and residential demand, I-69/US-30 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Fort Wayne and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hamilton: {
    marketNotes:
      'Hamilton County is one of Indiana’s fastest-growing and most affluent suburban counties with strong residential demand across Carmel, Fishers, Noblesville, and Westfield.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Hamilton County pricing reflects affluent Indianapolis north-suburb demand, I-69/US-31 corridor traffic, corporate relocation volume, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Carmel, Fishers, Noblesville, and Westfield areas before booking.',
      'Indianapolis-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'st-joseph': {
    marketNotes:
      'St. Joseph County is the core of the South Bend metropolitan area with strong educational (University of Notre Dame), healthcare, and residential demand across South Bend and Mishawaka.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'St. Joseph County pricing reflects university-area and residential demand, US-31/US-20 corridor traffic, seasonal student move volume, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for South Bend and surrounding areas before booking.',
      'University traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  elkhart: {
    marketNotes:
      'Elkhart County is a key Northern Indiana county with strong manufacturing (RV industry) and residential demand across Elkhart, Goshen, and Nappanee.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Elkhart County pricing reflects RV-industry corridor demand, US-33/US-20 traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Elkhart, Goshen, and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hendricks: {
    marketNotes:
      'Hendricks County is one of Indiana’s fastest-growing suburban counties west of Indianapolis with strong residential demand across Avon, Brownsburg, Plainfield, and Danville.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Hendricks County pricing reflects Indianapolis west-suburb growth, I-70/I-74 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Avon, Brownsburg, Plainfield, and Danville areas before booking.',
      'Indianapolis-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  tippecanoe: {
    marketNotes:
      'Tippecanoe County is anchored by Purdue University with strong educational and residential demand across Lafayette and West Lafayette.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Tippecanoe County pricing reflects university-area demand, I-65/US-52 corridor traffic, seasonal student move volume, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Lafayette and West Lafayette areas before booking.',
      'University traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  vanderburgh: {
    marketNotes:
      'Vanderburgh County is the core of the Evansville metropolitan area with strong industrial, healthcare, and residential demand across Evansville and surrounding tri-state communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Vanderburgh County pricing reflects Southwest Indiana industrial and residential demand, I-64/US-41 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Evansville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  johnson: {
    marketNotes:
      'Johnson County is a rapidly growing suburban county south of Indianapolis with strong residential demand across Franklin, Greenwood, and Whiteland.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Johnson County pricing reflects Indianapolis south-suburb growth, I-65/US-31 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Franklin, Greenwood, and surrounding areas before booking.',
      'Indianapolis-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  porter: {
    marketNotes:
      'Porter County is a suburban county in Northwest Indiana with strong residential demand across Valparaiso, Portage, and Chesterton near the Chicago metro.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Porter County pricing reflects Chicago-metro spillover demand, I-80/I-94 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Valparaiso, Portage, and Chesterton areas before booking.',
      'Chicago-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  monroe: {
    marketNotes:
      'Monroe County is anchored by Indiana University with strong educational and residential demand across Bloomington and surrounding communities.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Monroe County pricing reflects university-area demand, I-69/IN-37 corridor traffic, seasonal student move volume, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Bloomington and surrounding areas before booking.',
      'University traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getIndianaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return indianaCountyResearch[countySlug];
}