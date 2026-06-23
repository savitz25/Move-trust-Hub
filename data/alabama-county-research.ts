import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Alabama county research — grows incrementally per batch */
export const alabamaCountyResearch: Record<string, CuratedCountyResearch> = {
  jefferson: {
    marketNotes:
      "Jefferson County is Alabama's most populous county and the economic core of the Birmingham metropolitan area, with high demand for residential, corporate, and healthcare-related moves.",
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Jefferson County pricing reflects Birmingham metro urban and suburban demand, I-20/I-65 corridor traffic, and strong competition among full-service local providers.',
    },
    tips: [
      'Verify coverage for Birmingham, Hoover, Vestavia Hills, and Bessemer areas before booking.',
      'Major urban and highway traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value urban, suburban, and commercial properties before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  baldwin: {
    marketNotes:
      "Baldwin County is Alabama's fastest-growing county with strong coastal, retirement, and tourism-driven residential demand along the Eastern Shore and Gulf Coast.",
    costs: {
      studioRange: '$750–$1,550',
      familyRange: '$2,700–$6,000',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Baldwin County pricing reflects coastal access constraints, peak tourist-season volume, and higher demand for waterfront and retirement relocations.',
    },
    tips: [
      'Verify coverage for Daphne, Fairhope, Foley, Gulf Shores, and Orange Beach areas before booking.',
      'Coastal access and hurricane-season considerations are critical — confirm scheduling buffers.',
      'Confirm insurance for high-value waterfront and retirement properties before booking.',
      'Book early for peak tourist seasons and snowbird turnover windows.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  tuscaloosa: {
    marketNotes:
      'Tuscaloosa County is a major West Alabama hub with strong educational (University of Alabama), industrial, and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Tuscaloosa County pricing reflects university-season demand, Northport suburban growth, and regional crews traveling from Birmingham metro providers.',
    },
    tips: [
      'Verify coverage for Tuscaloosa and Northport areas before booking.',
      'University and urban traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons and semester turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  shelby: {
    marketNotes:
      "Shelby County is one of Alabama's fastest-growing and most affluent suburban counties with high residential demand south of Birmingham.",
    costs: {
      studioRange: '$750–$1,550',
      familyRange: '$2,700–$6,000',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Shelby County pricing reflects affluent suburban demand in Alabaster, Pelham, Helena, and Calera, plus I-65 corridor traffic from Birmingham metro crews.',
    },
    tips: [
      'Verify coverage for Alabaster, Pelham, Helena, and Calera areas before booking.',
      'Birmingham-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  montgomery: {
    marketNotes:
      "Montgomery County is Alabama's capital county with strong government, military, and residential moving demand.",
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Montgomery County pricing reflects capital-city government relocations, Maxwell-Gunter military corridor demand, and competition among established local full-service providers.',
    },
    tips: [
      'Verify coverage for Montgomery and surrounding areas before booking.',
      'Government and urban traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and military relocations before booking.',
      'Book early for peak seasons and PCS windows.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lee: {
    marketNotes:
      'Lee County is a fast-growing county with strong educational (Auburn University) and residential demand across the Auburn–Opelika corridor.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Lee County pricing reflects university-season demand, Auburn–Opelika suburban growth, and crews traveling from Montgomery and Columbus metro providers.',
    },
    tips: [
      'Verify coverage for Auburn, Opelika, and surrounding areas before booking.',
      'University and regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons and semester turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  limestone: {
    marketNotes:
      "Limestone County is one of Alabama's fastest-growing counties with strong suburban residential demand south of Huntsville.",
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Limestone County pricing reflects Huntsville-metro crew travel, I-65 corridor traffic, and strong competition among North Alabama full-service providers.',
    },
    tips: [
      'Verify coverage for Athens and surrounding areas before booking.',
      'Huntsville-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  morgan: {
    marketNotes:
      'Morgan County is a key North Alabama county with strong industrial, aerospace, and residential demand centered on Decatur.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Morgan County pricing reflects Tennessee River industrial corridor demand, Hartselle and Priceville suburban growth, and Huntsville-metro regional crews.',
    },
    tips: [
      'Verify coverage for Decatur, Hartselle, and Priceville areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  calhoun: {
    marketNotes:
      'Calhoun County is a major East Alabama hub with strong military, industrial, and residential demand in Anniston and Oxford.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,300',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Calhoun County pricing reflects Anniston-Oxford metro demand, Fort McClellan corridor relocations, and Birmingham-metro regional crew travel.',
    },
    tips: [
      'Verify coverage for Anniston, Oxford, and Jacksonville areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and military relocations before booking.',
      'Book early for peak seasons.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  houston: {
    marketNotes:
      'Houston County is the economic center of the Wiregrass region with strong residential and commercial demand centered on Dothan.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Houston County pricing reflects Wiregrass regional demand, limited local provider competition, and travel from Panama City and Montgomery metro crews.',
    },
    tips: [
      'Verify coverage for Dothan and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  etowah: {
    marketNotes:
      'Etowah County is a key Northeast Alabama county with strong industrial and residential demand in Gadsden and Rainbow City.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Etowah County pricing reflects Gadsden industrial corridor demand and crews traveling from Huntsville and Birmingham metro providers.',
    },
    tips: [
      'Verify coverage for Gadsden and Rainbow City areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  marshall: {
    marketNotes:
      'Marshall County is a growing North Alabama county with strong residential and lake-area demand in Albertville, Guntersville, and Boaz.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Marshall County pricing reflects Guntersville lake-area access, Albertville suburban growth, and Huntsville-metro regional crew travel.',
    },
    tips: [
      'Verify coverage for Albertville, Guntersville, and Boaz areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value lakeside homes before booking.',
      'Book early for peak seasons.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'st-clair': {
    marketNotes:
      'St. Clair County is a growing suburban county east of Birmingham with strong residential demand in Pell City, Moody, and Springville.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'St. Clair County pricing reflects Birmingham-metro east suburban growth, I-20 corridor traffic, and Shelby County regional crew travel.',
    },
    tips: [
      'Verify coverage for Pell City, Moody, and Springville areas before booking.',
      'Birmingham-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lauderdale: {
    marketNotes:
      'Lauderdale County is a key North Alabama county with strong industrial, educational, and residential demand centered on Florence.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Lauderdale County pricing reflects Florence-Muscle Shoals metro demand, UNA student turnover, and Huntsville-metro regional crew travel.',
    },
    tips: [
      'Verify coverage for Florence and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cullman: {
    marketNotes:
      'Cullman County is a growing county in North Alabama with strong residential and industrial demand centered on Cullman.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Cullman County pricing reflects regional industrial growth, I-65 corridor access, and Huntsville-metro crew travel for full-service moves.',
    },
    tips: [
      'Verify coverage for Cullman and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  elmore: {
    marketNotes:
      'Elmore County is a growing suburban county north of Montgomery with strong residential demand in Wetumpka and Millbrook.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Elmore County pricing reflects Montgomery-metro north suburban growth, Coosa River corridor access, and regional crew travel from the capital.',
    },
    tips: [
      'Verify coverage for Wetumpka and Millbrook areas before booking.',
      'Montgomery-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  talladega: {
    marketNotes:
      'Talladega County is a growing county in East Alabama with strong industrial and residential demand in Talladega and Sylacauga.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,300',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Talladega County pricing reflects East Alabama industrial corridor demand and Birmingham-metro regional crew travel.',
    },
    tips: [
      'Verify coverage for Talladega and Sylacauga areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  dekalb: {
    marketNotes:
      'DeKalb County is a growing county in Northeast Alabama with strong industrial and residential demand centered on Fort Payne.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'DeKalb County pricing reflects Lookout Mountain foothill access, regional industrial demand, and Huntsville-metro crew travel.',
    },
    tips: [
      'Verify coverage for Fort Payne and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  walker: {
    marketNotes:
      'Walker County is a growing county northwest of Birmingham with strong residential demand centered on Jasper.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Walker County pricing reflects northwest Alabama regional demand and Birmingham-metro crew travel along the I-22 corridor.',
    },
    tips: [
      'Verify coverage for Jasper and surrounding areas before booking.',
      'Birmingham-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  autauga: {
    marketNotes:
      'Autauga County is a growing suburban county north of Montgomery with strong residential demand centered on Prattville.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Autauga County pricing reflects Prattville suburban growth, Maxwell-Gunter corridor proximity, and Montgomery-metro crew travel.',
    },
    tips: [
      'Verify coverage for Prattville and surrounding areas before booking.',
      'Montgomery-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  blount: {
    marketNotes:
      'Blount County is a growing county north of Birmingham with strong rural-suburban residential demand in Oneonta and surrounding communities.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Blount County pricing reflects rural-suburban access north of Birmingham and regional crew travel from Huntsville and Jefferson County providers.',
    },
    tips: [
      'Verify coverage for Oneonta and surrounding areas before booking.',
      'Birmingham-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  colbert: {
    marketNotes:
      'Colbert County is a key North Alabama county with strong industrial and residential demand in Tuscumbia, Muscle Shoals, and Sheffield.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Colbert County pricing reflects Florence-Muscle Shoals metro demand, Tennessee River corridor access, and Huntsville-metro regional crew travel.',
    },
    tips: [
      'Verify coverage for Tuscumbia, Muscle Shoals, and Sheffield areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getAlabamaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return alabamaCountyResearch[countySlug];
}