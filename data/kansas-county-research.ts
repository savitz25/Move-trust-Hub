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
  harvey: {
    marketNotes:
      'Harvey County is a growing suburban county north of Wichita with strong residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Harvey County pricing reflects Wichita metro northward suburban growth, Newton corridor traffic, and competition among full-service local and regional agents serving Harvey County.',
    },
    tips: [
      'Verify coverage for Newton and surrounding areas before booking.',
      'Wichita-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lyon: {
    marketNotes:
      'Lyon County is anchored by Emporia State University with strong educational and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Lyon County pricing reflects Emporia State University student-move cycles, Flint Hills residential turnover, and competition among full-service local and regional agents serving Emporia.',
    },
    tips: [
      'Verify coverage for Emporia and surrounding areas before booking.',
      'University traffic impacts scheduling — confirm crew arrival windows, especially during move-in/move-out periods.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons and semester turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mcpherson: {
    marketNotes:
      'McPherson County is a key Central Kansas county with strong manufacturing and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'McPherson County pricing reflects central Kansas manufacturing-industry relocations, regional traffic patterns, and competition among full-service local and regional agents serving McPherson.',
    },
    tips: [
      'Verify coverage for McPherson and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  montgomery: {
    marketNotes:
      'Montgomery County is a key Southeast Kansas county with strong industrial and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$150/hr for a 2-person crew',
      note: 'Montgomery County pricing reflects Independence and Coffeyville industrial corridors, southeast Kansas regional traffic, and competition among full-service local and regional agents serving Montgomery County.',
    },
    tips: [
      'Verify coverage for Independence and Coffeyville areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  ellis: {
    marketNotes:
      'Ellis County is a major hub in Northwest Kansas with strong educational (Fort Hays State University) and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$150/hr for a 2-person crew',
      note: 'Ellis County pricing reflects Fort Hays State University area demand, northwest Kansas regional traffic, and competition among full-service local and regional agents serving Hays.',
    },
    tips: [
      'Verify coverage for Hays and surrounding areas before booking.',
      'University traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  pottawatomie: {
    marketNotes:
      'Pottawatomie County is a growing suburban county near Manhattan with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Pottawatomie County pricing reflects Manhattan metro spillover demand, Wamego corridor growth, and competition among full-service local and regional agents serving Pottawatomie County.',
    },
    tips: [
      'Verify coverage for Wamego and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  franklin: {
    marketNotes:
      'Franklin County is a growing county south of Kansas City with strong residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Franklin County pricing reflects Kansas City metro southward suburban growth, Ottawa corridor traffic, and competition among full-service local and regional agents serving Franklin County.',
    },
    tips: [
      'Verify coverage for Ottawa and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  barton: {
    marketNotes:
      'Barton County is a key Central Kansas county with strong energy and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$150/hr for a 2-person crew',
      note: 'Barton County pricing reflects Great Bend energy-industry relocations, central Kansas regional traffic, and competition among full-service local and regional agents serving Barton County.',
    },
    tips: [
      'Verify coverage for Great Bend and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  sumner: {
    marketNotes:
      'Sumner County is a rural South Central Kansas county with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Sumner County pricing reflects south central Kansas rural residential turnover, Wellington corridor traffic, and competition among full-service local and regional agents serving Sumner County.',
    },
    tips: [
      'Verify coverage for Wellington and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  seward: {
    marketNotes:
      'Seward County is a key Southwest Kansas county with strong energy and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Seward County pricing reflects Liberal energy-industry relocations, southwest Kansas regional traffic, and competition among full-service local and regional agents serving Seward County.',
    },
    tips: [
      'Verify coverage for Liberal and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  labette: {
    marketNotes:
      'Labette County is a key Southeast Kansas county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$150/hr for a 2-person crew',
      note: 'Labette County pricing reflects Parsons area residential turnover, southeast Kansas regional traffic, and competition among full-service local and regional agents serving Labette County.',
    },
    tips: [
      'Verify coverage for Parsons and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cherokee: {
    marketNotes:
      'Cherokee County is a rural Southeast Kansas county with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Cherokee County pricing reflects southeast Kansas rural residential turnover, Columbus corridor traffic, and competition among full-service local and regional agents serving Cherokee County.',
    },
    tips: [
      'Verify coverage for Columbus and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  dickinson: {
    marketNotes:
      'Dickinson County is a rural Central Kansas county with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Dickinson County pricing reflects central Kansas rural residential turnover, Abilene corridor traffic, and competition among full-service local and regional agents serving Dickinson County.',
    },
    tips: [
      'Verify coverage for Abilene and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jefferson: {
    marketNotes:
      'Jefferson County is a suburban county northeast of Topeka with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Jefferson County pricing reflects Topeka metro northeast suburban growth, Oskaloosa corridor traffic, and competition among full-service local and regional agents serving Jefferson County.',
    },
    tips: [
      'Verify coverage for Oskaloosa and surrounding areas before booking.',
      'Topeka-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  atchison: {
    marketNotes:
      'Atchison County is a key Northeast Kansas county with historical and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Atchison County pricing reflects northeast Kansas residential turnover, Missouri River corridor traffic, and competition among full-service local and regional agents serving Atchison County.',
    },
    tips: [
      'Verify coverage for Atchison and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  neosho: {
    marketNotes:
      'Neosho County is a rural Southeast Kansas county with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Neosho County pricing reflects southeast Kansas rural residential turnover, Chanute corridor traffic, and competition among full-service local and regional agents serving Neosho County.',
    },
    tips: [
      'Verify coverage for Chanute and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  osage: {
    marketNotes:
      'Osage County is a rural East Central Kansas county with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Osage County pricing reflects east central Kansas rural residential turnover, Lyndon corridor traffic, and competition among full-service local and regional agents serving Osage County.',
    },
    tips: [
      'Verify coverage for Lyndon and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  bourbon: {
    marketNotes:
      'Bourbon County is a rural Southeast Kansas county with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Bourbon County pricing reflects southeast Kansas rural residential turnover, Fort Scott corridor traffic, and competition among full-service local and regional agents serving Bourbon County.',
    },
    tips: [
      'Verify coverage for Fort Scott and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  jackson: {
    marketNotes:
      'Jackson County is a rural Northeast Kansas county with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Jackson County pricing reflects northeast Kansas rural residential turnover, Holton corridor traffic, and competition among full-service local and regional agents serving Jackson County.',
    },
    tips: [
      'Verify coverage for Holton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  allen: {
    marketNotes:
      'Allen County is a rural Southeast Kansas county with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Allen County pricing reflects southeast Kansas rural residential turnover, Iola corridor traffic, and competition among full-service local and regional agents serving Allen County.',
    },
    tips: [
      'Verify coverage for Iola and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  marion: {
    marketNotes:
      'Marion County is a rural Central Kansas county with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Marion County pricing reflects central Kansas rural residential turnover, Marion corridor traffic, and competition among full-service local and regional agents serving Marion County.',
    },
    tips: [
      'Verify coverage for Marion and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  linn: {
    marketNotes:
      'Linn County is a rural East Kansas county with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Linn County pricing reflects east Kansas rural residential turnover, Mound City corridor traffic, and competition among full-service local and regional agents serving Linn County.',
    },
    tips: [
      'Verify coverage for Mound City and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  nemaha: {
    marketNotes:
      'Nemaha County is a rural Northeast Kansas county with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Nemaha County pricing reflects northeast Kansas rural residential turnover, Seneca corridor traffic, and competition among full-service local and regional agents serving Nemaha County.',
    },
    tips: [
      'Verify coverage for Seneca and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  marshall: {
    marketNotes:
      'Marshall County is a rural Northeast Kansas county with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Marshall County pricing reflects northeast Kansas rural residential turnover, Marysville corridor traffic, and competition among full-service local and regional agents serving Marshall County.',
    },
    tips: [
      'Verify coverage for Marysville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  rice: {
    marketNotes:
      'Rice County is a rural Central Kansas county with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Rice County pricing reflects central Kansas rural residential turnover, Lyons corridor traffic, and competition among full-service local and regional agents serving Rice County.',
    },
    tips: [
      'Verify coverage for Lyons and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  pratt: {
    marketNotes:
      'Pratt County is a rural South Central Kansas county with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Pratt County pricing reflects south central Kansas rural residential turnover, Pratt corridor traffic, and competition among full-service local and regional agents serving Pratt County.',
    },
    tips: [
      'Verify coverage for Pratt and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  brown: {
    marketNotes:
      'Brown County is a rural Northeast Kansas county with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Brown County pricing reflects northeast Kansas rural residential turnover, Hiawatha corridor traffic, and competition among full-service local and regional agents serving Brown County.',
    },
    tips: [
      'Verify coverage for Hiawatha and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  cloud: {
    marketNotes:
      'Cloud County is a rural North Central Kansas county with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Cloud County pricing reflects north central Kansas rural residential turnover, Concordia corridor traffic, and competition among full-service local and regional agents serving Cloud County.',
    },
    tips: [
      'Verify coverage for Concordia and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  coffey: {
    marketNotes:
      'Coffey County is a rural East Central Kansas county with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Coffey County pricing reflects east central Kansas rural residential turnover, Burlington corridor traffic, and competition among full-service local and regional agents serving Coffey County.',
    },
    tips: [
      'Verify coverage for Burlington and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  wilson: {
    marketNotes:
      'Wilson County is a rural Southeast Kansas county with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Wilson County pricing reflects southeast Kansas rural residential turnover, Fredonia corridor traffic, and competition among full-service local and regional agents serving Wilson County.',
    },
    tips: [
      'Verify coverage for Fredonia and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  anderson: {
    marketNotes:
      'Anderson County is a rural East Kansas county with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Anderson County pricing reflects east Kansas rural residential turnover, Garnett corridor traffic, and competition among full-service local and regional agents serving Anderson County.',
    },
    tips: [
      'Verify coverage for Garnett and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
};

export function getKansasCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return kansasCountyResearch[countySlug];
}