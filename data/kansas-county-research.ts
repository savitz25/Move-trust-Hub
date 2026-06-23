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
  leavenworth: {
    marketNotes:
      'Leavenworth County is a key suburban county in the Kansas City metropolitan area with strong military (Fort Leavenworth) and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Leavenworth County pricing reflects Kansas City metro suburban growth, Fort Leavenworth military relocation cycles, and competition among full-service local and regional agents serving Leavenworth and Lansing.',
    },
    tips: [
      'Verify coverage for Leavenworth and Lansing areas before booking.',
      'Kansas City-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and military relocations before booking.',
      'Book early for peak seasons and PCS/move-out periods.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  riley: {
    marketNotes:
      'Riley County is anchored by Kansas State University with strong educational and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Riley County pricing reflects Kansas State University student-move cycles, Manhattan residential turnover, and competition among full-service local and regional agents serving the Manhattan metro.',
    },
    tips: [
      'Verify coverage for Manhattan and surrounding areas before booking.',
      'University traffic impacts scheduling — confirm crew arrival windows, especially during move-in/move-out periods.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons and semester turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  butler: {
    marketNotes:
      'Butler County is a rapidly growing suburban county east of Wichita with strong residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Butler County pricing reflects Wichita metro eastward suburban growth, El Dorado corridor traffic, and competition among full-service local and regional agents serving Butler County communities.',
    },
    tips: [
      'Verify coverage for El Dorado and surrounding areas before booking.',
      'Wichita-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  reno: {
    marketNotes:
      'Reno County is a key Central Kansas county with strong manufacturing and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Reno County pricing reflects Hutchinson manufacturing-industry relocations, central Kansas regional traffic, and competition among full-service local and regional agents serving the Hutchinson metro.',
    },
    tips: [
      'Verify coverage for Hutchinson and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  saline: {
    marketNotes:
      'Saline County is a major hub in Central Kansas with strong aviation and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Saline County pricing reflects Salina aviation-industry relocations, I-70 corridor traffic, and competition among full-service local and regional agents serving central Kansas.',
    },
    tips: [
      'Verify coverage for Salina and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  crawford: {
    marketNotes:
      'Crawford County is a key Southeast Kansas county with strong educational and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$150/hr for a 2-person crew',
      note: 'Crawford County pricing reflects Pittsburg State University area demand, southeast Kansas regional traffic, and competition among full-service local and regional agents serving Pittsburg and Girard.',
    },
    tips: [
      'Verify coverage for Pittsburg and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  finney: {
    marketNotes:
      'Finney County is a major hub in Southwest Kansas with strong agricultural and energy-industry demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Finney County pricing reflects Garden City agricultural and energy-industry relocations, southwest Kansas regional traffic, and competition among full-service local and regional agents serving Finney County.',
    },
    tips: [
      'Verify coverage for Garden City and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  geary: {
    marketNotes:
      'Geary County is anchored by Fort Riley with strong military and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Geary County pricing reflects Fort Riley military relocation cycles, Junction City residential turnover, and competition among full-service local and regional agents serving the Junction City metro.',
    },
    tips: [
      'Verify coverage for Junction City and surrounding areas before booking.',
      'Military base traffic impacts scheduling — confirm crew arrival windows, especially during PCS periods.',
      'Confirm insurance for high-value homes and military relocations before booking.',
      'Book early for peak seasons and PCS/move-out periods.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  miami: {
    marketNotes:
      'Miami County is a growing suburban county south of Kansas City with strong residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Miami County pricing reflects Kansas City metro southward suburban growth, Paola corridor traffic, and competition among full-service local and regional agents serving Miami County.',
    },
    tips: [
      'Verify coverage for Paola and surrounding areas before booking.',
      'Kansas City-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cowley: {
    marketNotes:
      'Cowley County is a key South Central Kansas county with strong educational and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$150/hr for a 2-person crew',
      note: 'Cowley County pricing reflects Winfield and Arkansas City residential turnover, south central Kansas regional traffic, and competition among full-service local and regional agents serving Cowley County.',
    },
    tips: [
      'Verify coverage for Winfield and Arkansas City areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  ford: {
    marketNotes:
      'Ford County is a major hub in Southwest Kansas with strong agricultural and energy-industry demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Ford County pricing reflects Dodge City agricultural and energy-industry relocations, southwest Kansas regional traffic, and competition among full-service local and regional agents serving Ford County.',
    },
    tips: [
      'Verify coverage for Dodge City and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getKansasCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return kansasCountyResearch[countySlug];
}