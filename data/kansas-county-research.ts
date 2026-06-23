import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Kansas county research — grows incrementally per batch */
export const kansasCountyResearch: Record<string, CuratedCountyResearch> = {
  johnson: {
    marketNotes:
      'Johnson County is Kansas’s most populous county and a major suburban hub in the Kansas City metropolitan area, with strong corporate, educational, and residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Johnson County pricing reflects Kansas City metro suburban growth, I-35/I-435 corridor traffic, corporate relocation demand, and competition among full-service local and regional agents serving Overland Park and Olathe.',
    },
    tips: [
      'Verify coverage for Overland Park, Olathe, Lenexa, Shawnee, and Leawood areas before booking.',
      'Heavy urban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  sedgwick: {
    marketNotes:
      'Sedgwick County is Kansas’s most populous county and the core of the Wichita metropolitan area, with strong aviation, manufacturing, and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Sedgwick County pricing reflects Wichita metro aviation-industry relocations, I-35 and Kellogg corridor traffic, and competition among full-service local and regional agents serving the greater Wichita area.',
    },
    tips: [
      'Verify coverage for Wichita and surrounding areas before booking.',
      'Major urban and industrial traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  shawnee: {
    marketNotes:
      'Shawnee County is the core of the Topeka metropolitan area with strong governmental and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Shawnee County pricing reflects state-government relocation cycles, Topeka urban traffic patterns, and competition among full-service local and regional agents serving the capital metro.',
    },
    tips: [
      'Verify coverage for Topeka and surrounding areas before booking.',
      'Governmental and urban traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  wyandotte: {
    marketNotes:
      'Wyandotte County forms the Kansas side of the Kansas City metropolitan area with strong industrial, logistics, and urban residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Wyandotte County pricing reflects Kansas City metro industrial corridors, I-70 and I-435 traffic, cross-state (MO/KS) relocation demand, and competition among full-service local and regional agents serving Kansas City, KS.',
    },
    tips: [
      'Verify coverage for Kansas City, KS, and surrounding areas before booking.',
      'Heavy urban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  douglas: {
    marketNotes:
      'Douglas County is anchored by the University of Kansas with strong educational and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Douglas County pricing reflects University of Kansas student-move cycles, Lawrence residential turnover, and competition among full-service local and regional agents serving the Lawrence metro and greater Kansas City corridor.',
    },
    tips: [
      'Verify coverage for Lawrence and surrounding areas before booking.',
      'University traffic impacts scheduling — confirm crew arrival windows, especially during move-in/move-out periods.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons and semester turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getKansasCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return kansasCountyResearch[countySlug];
}