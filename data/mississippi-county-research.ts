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
};

export function getMississippiCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return mississippiCountyResearch[countySlug];
}