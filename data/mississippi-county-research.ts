import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Mississippi county research — grows incrementally per batch */
export const mississippiCountyResearch: Record<string, CuratedCountyResearch> = {
  harrison: {
    marketNotes:
      "Harrison County is one of Mississippi's largest and most populous counties, with strong coastal, tourism, and military-driven residential demand along the Gulfport-Biloxi corridor.",
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Harrison County pricing reflects Gulf Coast access constraints, Keesler AFB and tourism-season volume, and cross-border crews from Mobile and Baldwin County providers.',
    },
    tips: [
      'Verify coverage for Gulfport, Biloxi, Long Beach, and Pass Christian areas before booking.',
      'Coastal access and hurricane-season considerations are critical — confirm scheduling buffers.',
      'Confirm insurance for high-value waterfront and coastal properties before booking.',
      'Book early for peak tourist seasons and military PCS windows.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hinds: {
    marketNotes:
      "Hinds County is Mississippi's most populous county and the core of the Jackson metropolitan area, with strong government, educational, and residential demand.",
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Hinds County pricing reflects Jackson metro urban traffic, state-government relocation demand, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Jackson, Ridgeland, Clinton, and Byram areas before booking.',
      'Urban and government traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value urban and suburban properties before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  desoto: {
    marketNotes:
      "DeSoto County is Mississippi's fastest-growing county and a major suburban extension of the Memphis metropolitan area.",
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'DeSoto County pricing reflects Memphis-metro suburban growth in Southaven, Olive Branch, and Horn Lake, plus I-55 corridor traffic from Tennessee-based crews.',
    },
    tips: [
      'Verify coverage for Southaven, Olive Branch, and Horn Lake areas before booking.',
      'Memphis-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  rankin: {
    marketNotes:
      "Rankin County is one of Mississippi's fastest-growing counties with strong suburban residential demand east of Jackson.",
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Rankin County pricing reflects suburban demand in Brandon, Flowood, and Pearl, plus Jackson-metro traffic and shared crews from Hinds and Madison County providers.',
    },
    tips: [
      'Verify coverage for Brandon, Flowood, and Pearl areas before booking.',
      'Jackson-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jackson: {
    marketNotes:
      'Jackson County is a coastal county in Southeast Mississippi with strong shipbuilding, industrial, and residential demand along the Pascagoula-Gautier corridor.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,700',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Jackson County pricing reflects coastal industrial demand, Ingalls Shipbuilding relocations, and regional crews from Gulfport-Biloxi and Mobile metro providers.',
    },
    tips: [
      'Verify coverage for Pascagoula, Gautier, and Ocean Springs areas before booking.',
      'Coastal access and hurricane-season considerations are critical — confirm scheduling buffers.',
      'Confirm insurance for high-value waterfront properties before booking.',
      'Book early for peak seasons and industrial relocation windows.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  madison: {
    marketNotes:
      "Madison County is Mississippi's wealthiest and one of its fastest-growing counties, with strong suburban residential demand north of Jackson.",
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,800–$6,200',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Madison County pricing reflects affluent suburban demand in Ridgeland, Madison, and Canton, plus Jackson-metro traffic and premium handling for upscale homes.',
    },
    tips: [
      'Verify coverage for Ridgeland, Madison, and Canton areas before booking.',
      'Jackson-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lee: {
    marketNotes:
      'Lee County is the economic center of Northeast Mississippi with strong industrial, medical, and residential demand centered on Tupelo.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Lee County pricing reflects Tupelo metro industrial and healthcare demand, plus regional crews from Memphis and Central Mississippi providers.',
    },
    tips: [
      'Verify coverage for Tupelo and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  forrest: {
    marketNotes:
      'Forrest County is the core of the Hattiesburg metropolitan area with strong educational (University of Southern Mississippi) and healthcare demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Forrest County pricing reflects university-season demand, Hattiesburg urban traffic, and regional crews from Gulf Coast and Central Mississippi providers.',
    },
    tips: [
      'Verify coverage for Hattiesburg and surrounding areas before booking.',
      'University and urban traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons and semester turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lauderdale: {
    marketNotes:
      'Lauderdale County is the economic center of East Mississippi with strong industrial, medical, and residential demand centered on Meridian.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,300',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Lauderdale County pricing reflects Meridian metro industrial and healthcare demand, plus regional crews from Tupelo and Jackson metro providers.',
    },
    tips: [
      'Verify coverage for Meridian and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lamar: {
    marketNotes:
      "Lamar County is one of Mississippi's fastest-growing counties with strong suburban residential demand south of Hattiesburg.",
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Lamar County pricing reflects suburban growth in Purvis and Lumberton, plus Hattiesburg-metro traffic and shared crews from Forrest County providers.',
    },
    tips: [
      'Verify coverage for Purvis, Lumberton, and surrounding areas before booking.',
      'Hattiesburg-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jones: {
    marketNotes:
      'Jones County is a key South Mississippi county with strong industrial and residential demand centered on Laurel.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,300',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Jones County pricing reflects Laurel industrial demand and regional crews from Hattiesburg, Meridian, and Gulf Coast metro providers.',
    },
    tips: [
      'Verify coverage for Laurel and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'pearl-river': {
    marketNotes:
      'Pearl River County is a growing county in South Mississippi with strong residential and cross-border demand near Picayune and the Louisiana line.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Pearl River County pricing reflects cross-border Gulf Coast and New Orleans-metro demand, plus regional crews from Harrison County and Mobile providers.',
    },
    tips: [
      'Verify coverage for Picayune and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and hurricane-season windows.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lafayette: {
    marketNotes:
      'Lafayette County is a key North Mississippi county anchored by the University of Mississippi with strong educational and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,700',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Lafayette County pricing reflects Oxford university-season demand, upscale residential growth, and regional crews from Tupelo and Memphis metro providers.',
    },
    tips: [
      'Verify coverage for Oxford and surrounding areas before booking.',
      'University traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons and semester turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lowndes: {
    marketNotes:
      'Lowndes County is a major East Mississippi hub with strong military, industrial, and educational demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,300',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Lowndes County pricing reflects Columbus metro industrial and military demand, plus regional crews from Meridian, Tupelo, and Jackson metro providers.',
    },
    tips: [
      'Verify coverage for Columbus and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  oktibbeha: {
    marketNotes:
      'Oktibbeha County is anchored by Mississippi State University with strong educational and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Oktibbeha County pricing reflects Starkville university-season demand, suburban growth, and regional crews from Columbus, Meridian, and Tupelo providers.',
    },
    tips: [
      'Verify coverage for Starkville and surrounding areas before booking.',
      'University traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons and semester turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hancock: {
    marketNotes:
      'Hancock County is a coastal county with strong tourism, retirement, and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Hancock County pricing reflects coastal access constraints, hurricane-season volume, and shared crews from Gulfport-Biloxi and Mobile metro providers.',
    },
    tips: [
      'Verify coverage for Bay St. Louis, Waveland, and Diamondhead areas before booking.',
      'Coastal access and hurricane-season considerations are critical — confirm scheduling buffers.',
      'Confirm insurance for high-value waterfront properties before booking.',
      'Book early for peak tourist seasons and hurricane-season windows.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  warren: {
    marketNotes:
      'Warren County is a historic county along the Mississippi River with strong residential and tourism demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,300',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Warren County pricing reflects Vicksburg river-corridor traffic, historic-home handling, and Jackson metro regional crews.',
    },
    tips: [
      'Verify coverage for Vicksburg and surrounding areas before booking.',
      'River and regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  washington: {
    marketNotes:
      'Washington County is the largest county in the Mississippi Delta with strong agricultural and residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Washington County pricing reflects Delta regional demand in Greenville, plus Jackson metro and East Mississippi crews serving long-distance local routes.',
    },
    tips: [
      'Verify coverage for Greenville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  pike: {
    marketNotes:
      'Pike County is a key Southwest Mississippi county with strong residential and industrial demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Pike County pricing reflects McComb industrial and residential demand, plus regional crews from Hattiesburg, Jackson, and Gulf Coast providers.',
    },
    tips: [
      'Verify coverage for McComb and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lincoln: {
    marketNotes:
      'Lincoln County is a growing county in Southwest Mississippi with strong residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Lincoln County pricing reflects Brookhaven suburban growth, plus regional crews from Hattiesburg, McComb, and Jackson metro providers.',
    },
    tips: [
      'Verify coverage for Brookhaven and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  marshall: {
    marketNotes:
      'Marshall County is a historic county in North Mississippi with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Marshall County pricing reflects Holly Springs residential demand and Memphis-metro suburban crews from DeSoto County and North Mississippi providers.',
    },
    tips: [
      'Verify coverage for Holly Springs and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  alcorn: {
    marketNotes:
      'Alcorn County is a key Northeast Mississippi county with strong industrial and residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Alcorn County pricing reflects Corinth industrial demand and regional crews from Tupelo, Memphis, and Northeast Mississippi providers.',
    },
    tips: [
      'Verify coverage for Corinth and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  monroe: {
    marketNotes:
      'Monroe County is a rural county in Northeast Mississippi with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Monroe County pricing reflects Aberdeen and Amory residential demand, plus regional crews from Columbus, Tupelo, and East Mississippi providers.',
    },
    tips: [
      'Verify coverage for Aberdeen and Amory areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  panola: {
    marketNotes:
      'Panola County is a growing county in Northwest Mississippi with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Panola County pricing reflects Batesville residential growth and Memphis-metro crews from DeSoto County and Tupelo regional providers.',
    },
    tips: [
      'Verify coverage for Batesville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  pontotoc: {
    marketNotes:
      'Pontotoc County is a growing county in Northeast Mississippi with strong residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Pontotoc County pricing reflects suburban growth near Tupelo and Oxford, plus regional crews from Northeast Mississippi and Memphis metro providers.',
    },
    tips: [
      'Verify coverage for Pontotoc and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  adams: {
    marketNotes:
      'Adams County is a historic county in Southwest Mississippi with strong tourism and residential demand centered on Natchez.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Adams County pricing reflects Natchez tourism-season demand, historic-home handling, and regional crews from Jackson and Hattiesburg metro providers.',
    },
    tips: [
      'Verify coverage for Natchez and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value historic homes before booking.',
      'Book early for peak tourist seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  tate: {
    marketNotes:
      'Tate County is a growing suburban county in Northwest Mississippi with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Tate County pricing reflects Senatobia suburban growth and Memphis-metro crews from DeSoto County and North Mississippi providers.',
    },
    tips: [
      'Verify coverage for Senatobia and surrounding areas before booking.',
      'Memphis-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  neshoba: {
    marketNotes:
      'Neshoba County is a key Central Mississippi county with strong residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Neshoba County pricing reflects Philadelphia residential demand and regional crews from Meridian, Jackson, and Tupelo metro providers.',
    },
    tips: [
      'Verify coverage for Philadelphia and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  union: {
    marketNotes:
      'Union County is a growing county in Northeast Mississippi with strong residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Union County pricing reflects New Albany residential growth and regional crews from Tupelo, Memphis, and Northeast Mississippi providers.',
    },
    tips: [
      'Verify coverage for New Albany and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  scott: {
    marketNotes:
      'Scott County is a growing county in Central Mississippi with strong industrial and residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Scott County pricing reflects Forest industrial and residential demand, plus Jackson metro and East Mississippi regional crews.',
    },
    tips: [
      'Verify coverage for Forest and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  bolivar: {
    marketNotes:
      'Bolivar County is a key Delta county with strong educational (Delta State University) and residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Bolivar County pricing reflects Cleveland university-season demand and Jackson metro regional crews serving Delta local routes.',
    },
    tips: [
      'Verify coverage for Cleveland and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and semester turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  copiah: {
    marketNotes:
      'Copiah County is a growing county in Central Mississippi with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Copiah County pricing reflects Hazlehurst residential demand and shared crews from Jackson, Hattiesburg, and Southwest Mississippi providers.',
    },
    tips: [
      'Verify coverage for Hazlehurst and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  george: {
    marketNotes:
      'George County is a growing county in Southeast Mississippi with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'George County pricing reflects Lucedale residential growth and regional crews from Gulfport-Biloxi, Pascagoula, and Mobile metro providers.',
    },
    tips: [
      'Verify coverage for Lucedale and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  simpson: {
    marketNotes:
      'Simpson County is a growing county in Central Mississippi with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Simpson County pricing reflects Mendenhall residential demand and Jackson metro crews from Rankin and Hinds County providers.',
    },
    tips: [
      'Verify coverage for Mendenhall and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  prentiss: {
    marketNotes:
      'Prentiss County is a growing county in Northeast Mississippi with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Prentiss County pricing reflects Booneville residential demand and regional crews from Tupelo, Corinth, and Memphis metro providers.',
    },
    tips: [
      'Verify coverage for Booneville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  leflore: {
    marketNotes:
      'Leflore County is a key Delta county with strong agricultural and residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Leflore County pricing reflects Greenwood Delta regional demand and Jackson metro crews serving long-distance local routes.',
    },
    tips: [
      'Verify coverage for Greenwood and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  itawamba: {
    marketNotes:
      'Itawamba County is a growing county in Northeast Mississippi with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Itawamba County pricing reflects Fulton residential demand and regional crews from Tupelo, Corinth, and Memphis metro providers.',
    },
    tips: [
      'Verify coverage for Fulton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  marion: {
    marketNotes:
      'Marion County is a growing county in South Mississippi with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Marion County pricing reflects Columbia residential demand and regional crews from Hattiesburg, Gulf Coast, and Central Mississippi providers.',
    },
    tips: [
      'Verify coverage for Columbia and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  yazoo: {
    marketNotes:
      'Yazoo County is a key Delta county with strong agricultural and residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Yazoo County pricing reflects Delta regional demand in Yazoo City and Jackson metro crews serving long-distance local routes.',
    },
    tips: [
      'Verify coverage for Yazoo City and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  sunflower: {
    marketNotes:
      'Sunflower County is a key Delta county with strong agricultural and residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Sunflower County pricing reflects Indianola Delta regional demand and Jackson metro crews serving long-distance local routes.',
    },
    tips: [
      'Verify coverage for Indianola and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  leake: {
    marketNotes:
      'Leake County is a rural county in Central Mississippi with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Leake County pricing reflects Carthage residential demand and Jackson metro crews from Madison and Rankin County providers.',
    },
    tips: [
      'Verify coverage for Carthage and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  tippah: {
    marketNotes:
      'Tippah County is a rural county in Northeast Mississippi with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Tippah County pricing reflects Ripley residential demand and regional crews from Corinth, Tupelo, and Memphis metro providers.',
    },
    tips: [
      'Verify coverage for Ripley and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  newton: {
    marketNotes:
      'Newton County is a rural county in Central Mississippi with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Newton County pricing reflects rural residential demand and regional crews from Meridian, Jackson, and Tupelo metro providers.',
    },
    tips: [
      'Verify coverage for Newton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  grenada: {
    marketNotes:
      'Grenada County is a growing county in North Mississippi with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Grenada County pricing reflects North Mississippi residential demand and regional crews from Meridian, Tupelo, and Jackson metro providers.',
    },
    tips: [
      'Verify coverage for Grenada and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  stone: {
    marketNotes:
      'Stone County is a growing county in South Mississippi with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Stone County pricing reflects Wiggins residential growth and regional crews from Gulfport-Biloxi, Hattiesburg, and Mobile metro providers.',
    },
    tips: [
      'Verify coverage for Wiggins and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  wayne: {
    marketNotes:
      'Wayne County is a rural county in Southeast Mississippi with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Wayne County pricing reflects Waynesboro residential demand and regional crews from Hattiesburg, Meridian, and Gulf Coast providers.',
    },
    tips: [
      'Verify coverage for Waynesboro and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  coahoma: {
    marketNotes:
      'Coahoma County is a key Delta county with strong agricultural and residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Coahoma County pricing reflects Clarksdale Delta regional demand and Jackson metro crews serving long-distance local routes.',
    },
    tips: [
      'Verify coverage for Clarksdale and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  tishomingo: {
    marketNotes:
      'Tishomingo County is a scenic county in Northeast Mississippi with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Tishomingo County pricing reflects Iuka residential demand and regional crews from Corinth, Tupelo, and Memphis metro providers.',
    },
    tips: [
      'Verify coverage for Iuka and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  clay: {
    marketNotes:
      'Clay County is a key Northeast Mississippi county with strong industrial and residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Clay County pricing reflects West Point industrial and residential demand and regional crews from Columbus, Meridian, and Tupelo providers.',
    },
    tips: [
      'Verify coverage for West Point and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  covington: {
    marketNotes:
      'Covington County is a rural county in South Mississippi with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Covington County pricing reflects Collins residential demand and regional crews from Hattiesburg, Gulf Coast, and Central Mississippi providers.',
    },
    tips: [
      'Verify coverage for Collins and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  winston: {
    marketNotes:
      'Winston County is a rural county in Central Mississippi with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Winston County pricing reflects Louisville residential demand and regional crews from Meridian, Jackson, and Tupelo metro providers.',
    },
    tips: [
      'Verify coverage for Louisville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  attala: {
    marketNotes:
      'Attala County is a rural county in Central Mississippi with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Attala County pricing reflects Kosciusko residential demand and Jackson metro crews from Madison and Rankin County providers.',
    },
    tips: [
      'Verify coverage for Kosciusko and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  chickasaw: {
    marketNotes:
      'Chickasaw County is a rural county in Northeast Mississippi with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Chickasaw County pricing reflects Houston and Okolona residential demand and regional crews from Tupelo, Columbus, and Meridian providers.',
    },
    tips: [
      'Verify coverage for Houston and Okolona areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jasper: {
    marketNotes:
      'Jasper County is a rural county in Central Mississippi with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Jasper County pricing reflects Bay Springs residential demand and regional crews from Meridian, Hattiesburg, and Jackson metro providers.',
    },
    tips: [
      'Verify coverage for Bay Springs and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  holmes: {
    marketNotes:
      'Holmes County is a rural Delta county with residential demand.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Holmes County pricing reflects rural Delta demand in Lexington and Jackson metro crews serving long-distance local routes with limited local competition.',
    },
    tips: [
      'Rural access challenges are common — confirm crew can reach Lexington and surrounding areas.',
      'Verify explicit regional service to Lexington before booking.',
      'Storage options are very limited — plan ahead for timing and overflow.',
      'Obtain multiple estimates and confirm credentials for rural moves.',
      'Re-verify FMCSA authority, BBB rating, and current reviews before booking.',
    ],
  },
  clarke: {
    marketNotes:
      'Clarke County is a rural county in East Mississippi with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Clarke County pricing reflects Quitman residential demand and regional crews from Meridian, Hattiesburg, and Tupelo metro providers.',
    },
    tips: [
      'Verify coverage for Quitman and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  walthall: {
    marketNotes:
      'Walthall County is a rural county in South Mississippi with residential demand.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Walthall County pricing reflects rural South Mississippi demand in Tylertown and regional crews from Hattiesburg and Gulf Coast providers.',
    },
    tips: [
      'Rural access challenges are common — confirm crew can reach Tylertown and surrounding areas.',
      'Verify explicit regional service to Tylertown before booking.',
      'Storage options are very limited — plan ahead for timing and overflow.',
      'Obtain multiple estimates and confirm credentials for rural moves.',
      'Re-verify FMCSA authority, BBB rating, and current reviews before booking.',
    ],
  },
  smith: {
    marketNotes:
      'Smith County is a rural county in Central Mississippi with residential demand.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Smith County pricing reflects rural Central Mississippi demand in Raleigh and Jackson metro regional crews.',
    },
    tips: [
      'Rural access challenges are common — confirm crew can reach Raleigh and surrounding areas.',
      'Verify explicit regional service to Raleigh before booking.',
      'Storage options are very limited — plan ahead for timing and overflow.',
      'Obtain multiple estimates and confirm credentials for rural moves.',
      'Re-verify FMCSA authority, BBB rating, and current reviews before booking.',
    ],
  },
  greene: {
    marketNotes:
      'Greene County is a rural county in Southeast Mississippi with residential demand.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Greene County pricing reflects rural Southeast Mississippi demand in Leakesville and regional crews from Gulf Coast and Hattiesburg providers.',
    },
    tips: [
      'Rural access challenges are common — confirm crew can reach Leakesville and surrounding areas.',
      'Verify explicit regional service to Leakesville before booking.',
      'Storage options are very limited — plan ahead for timing and overflow.',
      'Obtain multiple estimates and confirm credentials for rural moves.',
      'Re-verify FMCSA authority, BBB rating, and current reviews before booking.',
    ],
  },
  calhoun: {
    marketNotes:
      'Calhoun County is a rural county in North Mississippi with residential demand.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Calhoun County pricing reflects rural North Mississippi demand near Calhoun City and regional crews from Tupelo and Meridian providers.',
    },
    tips: [
      'Rural access challenges are common — confirm crew can reach Calhoun City and surrounding areas.',
      'Verify explicit regional service to Calhoun City before booking.',
      'Storage options are very limited — plan ahead for timing and overflow.',
      'Obtain multiple estimates and confirm credentials for rural moves.',
      'Re-verify FMCSA authority, BBB rating, and current reviews before booking.',
    ],
  },
  amite: {
    marketNotes:
      'Amite County is a rural county in Southwest Mississippi with residential demand.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Amite County pricing reflects rural Southwest Mississippi demand in Liberty and regional crews from Hattiesburg and Central Mississippi providers.',
    },
    tips: [
      'Rural access challenges are common — confirm crew can reach Liberty and surrounding areas.',
      'Verify explicit regional service to Liberty before booking.',
      'Storage options are very limited — plan ahead for timing and overflow.',
      'Obtain multiple estimates and confirm credentials for rural moves.',
      'Re-verify FMCSA authority, BBB rating, and current reviews before booking.',
    ],
  },
  yalobusha: {
    marketNotes:
      'Yalobusha County is a rural county in North Mississippi with residential demand.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Yalobusha County pricing reflects rural North Mississippi demand in Water Valley and regional crews from Oxford and Tupelo metro providers.',
    },
    tips: [
      'Rural access challenges are common — confirm crew can reach Water Valley and surrounding areas.',
      'Verify explicit regional service to Water Valley before booking.',
      'Storage options are very limited — plan ahead for timing and overflow.',
      'Obtain multiple estimates and confirm credentials for rural moves.',
      'Re-verify FMCSA authority, BBB rating, and current reviews before booking.',
    ],
  },
  lawrence: {
    marketNotes:
      'Lawrence County is a rural county in South Mississippi with residential demand.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Lawrence County pricing reflects rural South Mississippi demand in Monticello and regional crews from Hattiesburg and Gulf Coast providers.',
    },
    tips: [
      'Rural access challenges are common — confirm crew can reach Monticello and surrounding areas.',
      'Verify explicit regional service to Monticello before booking.',
      'Storage options are very limited — plan ahead for timing and overflow.',
      'Obtain multiple estimates and confirm credentials for rural moves.',
      'Re-verify FMCSA authority, BBB rating, and current reviews before booking.',
    ],
  },
  perry: {
    marketNotes:
      'Perry County is a rural county in South Mississippi with residential demand.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Perry County pricing reflects rural South Mississippi demand in New Augusta and regional crews from Hattiesburg and Gulf Coast providers.',
    },
    tips: [
      'Rural access challenges are common — confirm crew can reach New Augusta and surrounding areas.',
      'Verify explicit regional service to New Augusta before booking.',
      'Storage options are very limited — plan ahead for timing and overflow.',
      'Obtain multiple estimates and confirm credentials for rural moves.',
      'Re-verify FMCSA authority, BBB rating, and current reviews before booking.',
    ],
  },
  'jefferson-davis': {
    marketNotes:
      'Jefferson Davis County is a rural county in South Mississippi with residential demand.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Jefferson Davis County pricing reflects rural South Mississippi demand in Prentiss and regional crews from Hattiesburg and Meridian providers.',
    },
    tips: [
      'Rural access challenges are common — confirm crew can reach Prentiss and surrounding areas.',
      'Verify explicit regional service to Prentiss before booking.',
      'Storage options are very limited — plan ahead for timing and overflow.',
      'Obtain multiple estimates and confirm credentials for rural moves.',
      'Re-verify FMCSA authority, BBB rating, and current reviews before booking.',
    ],
  },
  tallahatchie: {
    marketNotes:
      'Tallahatchie County is a rural Delta county with residential demand.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Tallahatchie County pricing reflects rural Delta demand in Charleston and Jackson metro crews serving long-distance local routes with limited local competition.',
    },
    tips: [
      'Rural access challenges are common — confirm crew can reach Charleston and surrounding areas.',
      'Verify explicit regional service to Charleston before booking.',
      'Storage options are very limited — plan ahead for timing and overflow.',
      'Obtain multiple estimates and confirm credentials for rural moves.',
      'Re-verify FMCSA authority, BBB rating, and current reviews before booking.',
    ],
  },
  webster: {
    marketNotes:
      'Webster County is a rural county in Central Mississippi with residential demand.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Webster County pricing reflects rural Central Mississippi demand in Walthall and regional crews from Columbus, Meridian, and Tupelo providers.',
    },
    tips: [
      'Rural access challenges are common — confirm crew can reach Walthall and surrounding areas.',
      'Verify explicit regional service to Walthall before booking.',
      'Storage options are very limited — plan ahead for timing and overflow.',
      'Obtain multiple estimates and confirm credentials for rural moves.',
      'Re-verify FMCSA authority, BBB rating, and current reviews before booking.',
    ],
  },
  noxubee: {
    marketNotes:
      'Noxubee County is a rural county in East Mississippi with residential demand.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Noxubee County pricing reflects rural East Mississippi demand in Macon and regional crews from Columbus and Meridian providers.',
    },
    tips: [
      'Rural access challenges are common — confirm crew can reach Macon and surrounding areas.',
      'Verify explicit regional service to Macon before booking.',
      'Storage options are very limited — plan ahead for timing and overflow.',
      'Obtain multiple estimates and confirm credentials for rural moves.',
      'Re-verify FMCSA authority, BBB rating, and current reviews before booking.',
    ],
  },
  montgomery: {
    marketNotes:
      'Montgomery County is a rural county in Central Mississippi with residential demand.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Montgomery County pricing reflects rural Central Mississippi demand in Winona and regional crews from Jackson metro and Meridian providers.',
    },
    tips: [
      'Rural access challenges are common — confirm crew can reach Winona and surrounding areas.',
      'Verify explicit regional service to Winona before booking.',
      'Storage options are very limited — plan ahead for timing and overflow.',
      'Obtain multiple estimates and confirm credentials for rural moves.',
      'Re-verify FMCSA authority, BBB rating, and current reviews before booking.',
    ],
  },
  carroll: {
    marketNotes:
      'Carroll County is a rural county in Central Mississippi with residential demand.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Carroll County pricing reflects rural Central Mississippi demand in Carrollton and Jackson metro regional crews.',
    },
    tips: [
      'Rural access challenges are common — confirm crew can reach Carrollton and surrounding areas.',
      'Verify explicit regional service to Carrollton before booking.',
      'Storage options are very limited — plan ahead for timing and overflow.',
      'Obtain multiple estimates and confirm credentials for rural moves.',
      'Re-verify FMCSA authority, BBB rating, and current reviews before booking.',
    ],
  },
  kemper: {
    marketNotes:
      'Kemper County is a rural county in East Mississippi with residential demand.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Kemper County pricing reflects rural East Mississippi demand in De Kalb and regional crews from Meridian and Tupelo providers.',
    },
    tips: [
      'Rural access challenges are common — confirm crew can reach De Kalb and surrounding areas.',
      'Verify explicit regional service to De Kalb before booking.',
      'Storage options are very limited — plan ahead for timing and overflow.',
      'Obtain multiple estimates and confirm credentials for rural moves.',
      'Re-verify FMCSA authority, BBB rating, and current reviews before booking.',
    ],
  },
  tunica: {
    marketNotes:
      'Tunica County is a Delta county known for casino tourism with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Tunica County pricing reflects casino-corridor residential demand and Memphis metro crews from DeSoto and Tate County providers.',
    },
    tips: [
      'Verify coverage for Tunica and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  claiborne: {
    marketNotes:
      'Claiborne County is a rural county in Southwest Mississippi with residential demand.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Claiborne County pricing reflects rural Southwest Mississippi demand in Port Gibson and Jackson metro regional crews.',
    },
    tips: [
      'Rural access challenges are common — confirm crew can reach Port Gibson and surrounding areas.',
      'Verify explicit regional service to Port Gibson before booking.',
      'Storage options are very limited — plan ahead for timing and overflow.',
      'Obtain multiple estimates and confirm credentials for rural moves.',
      'Re-verify FMCSA authority, BBB rating, and current reviews before booking.',
    ],
  },
  choctaw: {
    marketNotes:
      'Choctaw County is a rural county in Central Mississippi with residential demand.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Choctaw County pricing reflects rural Central Mississippi demand in Ackerman and Jackson metro regional crews.',
    },
    tips: [
      'Rural access challenges are common — confirm crew can reach Ackerman and surrounding areas.',
      'Verify explicit regional service to Ackerman before booking.',
      'Storage options are very limited — plan ahead for timing and overflow.',
      'Obtain multiple estimates and confirm credentials for rural moves.',
      'Re-verify FMCSA authority, BBB rating, and current reviews before booking.',
    ],
  },
  franklin: {
    marketNotes:
      'Franklin County is a rural county in Southwest Mississippi with residential demand.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Franklin County pricing reflects rural Southwest Mississippi demand in Meadville and regional crews from Hattiesburg and Central Mississippi providers.',
    },
    tips: [
      'Rural access challenges are common — confirm crew can reach Meadville and surrounding areas.',
      'Verify explicit regional service to Meadville before booking.',
      'Storage options are very limited — plan ahead for timing and overflow.',
      'Obtain multiple estimates and confirm credentials for rural moves.',
      'Re-verify FMCSA authority, BBB rating, and current reviews before booking.',
    ],
  },
  humphreys: {
    marketNotes:
      'Humphreys County is a rural Delta county with residential demand.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Humphreys County pricing reflects rural Delta demand in Belzoni and Jackson metro crews serving long-distance local routes with limited local competition.',
    },
    tips: [
      'Rural access challenges are common — confirm crew can reach Belzoni and surrounding areas.',
      'Verify explicit regional service to Belzoni before booking.',
      'Storage options are very limited — plan ahead for timing and overflow.',
      'Obtain multiple estimates and confirm credentials for rural moves.',
      'Re-verify FMCSA authority, BBB rating, and current reviews before booking.',
    ],
  },
  benton: {
    marketNotes:
      'Benton County is a small rural county in North Mississippi with residential demand.',
    costs: {
      studioRange: '$550–$1,150',
      familyRange: '$1,900–$4,400',
      avgHourly: '$95–$135/hr for a 2-person crew',
      note: 'Benton County pricing reflects limited local competition in Ashland and regional crews from Memphis and Tupelo metro providers.',
    },
    tips: [
      'Rural access challenges are common — confirm crew can reach Ashland and surrounding areas.',
      'Verify explicit regional service to Ashland before booking.',
      'Storage options are very limited — plan ahead for timing and overflow.',
      'Obtain multiple estimates and confirm credentials for rural moves.',
      'Re-verify FMCSA authority, BBB rating, and current reviews before booking.',
    ],
  },
  wilkinson: {
    marketNotes:
      'Wilkinson County is a rural county in Southwest Mississippi with residential demand.',
    costs: {
      studioRange: '$550–$1,150',
      familyRange: '$1,900–$4,400',
      avgHourly: '$95–$135/hr for a 2-person crew',
      note: 'Wilkinson County pricing reflects limited local competition in Woodville and regional crews from Hattiesburg and Central Mississippi providers.',
    },
    tips: [
      'Rural access challenges are common — confirm crew can reach Woodville and surrounding areas.',
      'Verify explicit regional service to Woodville before booking.',
      'Storage options are very limited — plan ahead for timing and overflow.',
      'Obtain multiple estimates and confirm credentials for rural moves.',
      'Re-verify FMCSA authority, BBB rating, and current reviews before booking.',
    ],
  },
  jefferson: {
    marketNotes:
      'Jefferson County is a rural county in Southwest Mississippi with residential demand.',
    costs: {
      studioRange: '$550–$1,150',
      familyRange: '$1,900–$4,400',
      avgHourly: '$95–$135/hr for a 2-person crew',
      note: 'Jefferson County pricing reflects limited local competition in Fayette and Jackson metro regional crews serving Southwest Mississippi routes.',
    },
    tips: [
      'Rural access challenges are common — confirm crew can reach Fayette and surrounding areas.',
      'Verify explicit regional service to Fayette before booking.',
      'Storage options are very limited — plan ahead for timing and overflow.',
      'Obtain multiple estimates and confirm credentials for rural moves.',
      'Re-verify FMCSA authority, BBB rating, and current reviews before booking.',
    ],
  },
  quitman: {
    marketNotes:
      'Quitman County is a rural Delta county with residential demand.',
    costs: {
      studioRange: '$550–$1,150',
      familyRange: '$1,900–$4,400',
      avgHourly: '$95–$135/hr for a 2-person crew',
      note: 'Quitman County pricing reflects limited local competition in Marks and regional crews from Memphis and Jackson metro providers.',
    },
    tips: [
      'Rural access challenges are common — confirm crew can reach Marks and surrounding areas.',
      'Verify explicit regional service to Marks before booking.',
      'Storage options are very limited — plan ahead for timing and overflow.',
      'Obtain multiple estimates and confirm credentials for rural moves.',
      'Re-verify FMCSA authority, BBB rating, and current reviews before booking.',
    ],
  },
  sharkey: {
    marketNotes:
      'Sharkey County is one of Mississippi’s smallest counties with rural residential demand.',
    costs: {
      studioRange: '$550–$1,150',
      familyRange: '$1,900–$4,400',
      avgHourly: '$95–$135/hr for a 2-person crew',
      note: 'Sharkey County pricing reflects limited local competition in Rolling Fork and Jackson metro Delta crews.',
    },
    tips: [
      'Rural access challenges are common — confirm crew can reach Rolling Fork and surrounding areas.',
      'Verify explicit regional service to Rolling Fork before booking.',
      'Storage options are very limited — plan ahead for timing and overflow.',
      'Obtain multiple estimates and confirm credentials for rural moves.',
      'Re-verify FMCSA authority, BBB rating, and current reviews before booking.',
    ],
  },
  issaquena: {
    marketNotes:
      'Issaquena County is Mississippi’s smallest county with rural residential demand.',
    costs: {
      studioRange: '$550–$1,150',
      familyRange: '$1,900–$4,400',
      avgHourly: '$95–$135/hr for a 2-person crew',
      note: 'Issaquena County pricing reflects Mississippi’s smallest county footprint in Mayersville and Jackson metro Delta crews with very limited local competition.',
    },
    tips: [
      'Rural access challenges are common — confirm crew can reach Mayersville and surrounding areas.',
      'Verify explicit regional service to Mayersville before booking.',
      'Storage options are very limited — plan ahead for timing and overflow.',
      'Obtain multiple estimates and confirm credentials for rural moves.',
      'Re-verify FMCSA authority, BBB rating, and current reviews before booking.',
    ],
  },
};

export function getMississippiCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return mississippiCountyResearch[countySlug];
}