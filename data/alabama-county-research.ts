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
  russell: {
    marketNotes:
      'Russell County is a growing county in East Alabama with strong military and residential demand adjacent to Fort Moore in Phenix City.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,300',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Russell County pricing reflects Columbus–Phenix City cross-border metro demand, Fort Moore military relocations, and Auburn–Montgomery regional crew travel.',
    },
    tips: [
      'Verify coverage for Phenix City and surrounding areas before booking.',
      'Military-related traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and military relocations before booking.',
      'Book early for peak seasons.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  coffee: {
    marketNotes:
      'Coffee County is a key Wiregrass county with strong military (Fort Rucker) and residential demand centered on Enterprise.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Coffee County pricing reflects Fort Rucker military demand, Wiregrass regional competition, and Dothan-metro crew travel.',
    },
    tips: [
      'Verify coverage for Enterprise and surrounding areas before booking.',
      'Military moves require specific experience — confirm PCS and on-base access credentials.',
      'Confirm insurance for high-value homes and military relocations before booking.',
      'Book early for peak seasons.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jackson: {
    marketNotes:
      'Jackson County is a scenic county in Northeast Alabama with strong residential and lake-area demand centered on Scottsboro.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Jackson County pricing reflects Guntersville lake-area access, Scottsboro suburban growth, and Huntsville-metro regional crew travel.',
    },
    tips: [
      'Verify coverage for Scottsboro and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value lakeside homes before booking.',
      'Book early for peak seasons.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  dale: {
    marketNotes:
      'Dale County is a key Wiregrass county with strong military and residential demand centered on Ozark.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Dale County pricing reflects Fort Rucker corridor military demand, Wiregrass regional access, and Dothan-metro crew travel.',
    },
    tips: [
      'Verify coverage for Ozark and surrounding areas before booking.',
      'Military moves require specific experience — confirm PCS and on-base access credentials.',
      'Confirm insurance for high-value homes and military relocations before booking.',
      'Book early for peak seasons.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  chilton: {
    marketNotes:
      'Chilton County is a growing county in Central Alabama with strong residential demand centered on Clanton.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Chilton County pricing reflects I-65 corridor central Alabama demand and regional crew travel from Birmingham and Montgomery metro providers.',
    },
    tips: [
      'Verify coverage for Clanton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  tallapoosa: {
    marketNotes:
      'Tallapoosa County is a growing county in East Alabama with strong lake-area residential demand in Alexander City and Dadeville.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Tallapoosa County pricing reflects Lake Martin waterfront access, Alexander City suburban growth, and Montgomery–Auburn regional crew travel.',
    },
    tips: [
      'Verify coverage for Alexander City and Dadeville areas before booking.',
      'Lake access and seasonal traffic considerations apply — confirm scheduling buffers.',
      'Confirm insurance for high-value lakeside homes before booking.',
      'Book early for peak seasons.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  covington: {
    marketNotes:
      'Covington County is a key South Alabama county with strong residential and industrial demand centered on Andalusia.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Covington County pricing reflects South Alabama regional demand, limited local provider competition, and Wiregrass–Gulf Coast crew travel.',
    },
    tips: [
      'Verify coverage for Andalusia and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  escambia: {
    marketNotes:
      'Escambia County is a county in South Alabama with strong residential and industrial demand centered on Brewton.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Escambia County pricing reflects South Alabama regional demand and crew travel from Baldwin County coastal and Dothan Wiregrass providers.',
    },
    tips: [
      'Verify coverage for Brewton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  dallas: {
    marketNotes:
      'Dallas County is a historic county in Central Alabama with strong residential demand centered on Selma.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Dallas County pricing reflects central Alabama Black Belt regional demand and Montgomery-metro crew travel.',
    },
    tips: [
      'Verify coverage for Selma and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  chambers: {
    marketNotes:
      'Chambers County is a growing county in East Alabama with strong industrial and residential demand in Valley and LaFayette.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Chambers County pricing reflects West Georgia border industrial corridor demand and Auburn–Columbus regional crew travel.',
    },
    tips: [
      'Verify coverage for Valley and LaFayette areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  pike: {
    marketNotes:
      'Pike County is a key Wiregrass county with strong educational (Troy University) and residential demand centered on Troy.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Pike County pricing reflects university-season demand, Wiregrass regional access, and Dothan–Montgomery crew travel.',
    },
    tips: [
      'Verify coverage for Troy and surrounding areas before booking.',
      'University and regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and semester turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lawrence: {
    marketNotes:
      'Lawrence County is a rural North Alabama county with strong residential demand centered on Moulton.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Lawrence County pricing reflects rural North Alabama demand and Huntsville–Florence regional crew travel.',
    },
    tips: [
      'Verify coverage for Moulton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  franklin: {
    marketNotes:
      'Franklin County is a growing county in Northwest Alabama with strong residential demand centered on Russellville.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Franklin County pricing reflects northwest Alabama regional demand and Florence–Huntsville metro crew travel.',
    },
    tips: [
      'Verify coverage for Russellville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  marion: {
    marketNotes:
      'Marion County is a rural county in Northwest Alabama with residential demand centered on Hamilton.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Marion County pricing reflects rural northwest Alabama access, limited local provider competition, and Birmingham–Jasper regional crew travel.',
    },
    tips: [
      'Verify coverage for Hamilton and surrounding areas before booking.',
      'Rural access challenges are common — confirm driveway and road constraints.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  geneva: {
    marketNotes:
      'Geneva County is a rural county in Southeast Alabama with residential demand centered on Geneva.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Geneva County pricing reflects rural Wiregrass regional demand and Dothan–Mobile metro crew travel.',
    },
    tips: [
      'Verify coverage for Geneva and surrounding areas before booking.',
      'Rural access challenges are common — confirm driveway and road constraints.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cherokee: {
    marketNotes:
      'Cherokee County is a rural county in Northeast Alabama with lake-area residential demand centered on Centre.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Cherokee County pricing reflects Weiss Lake waterfront access, rural Northeast Alabama demand, and Huntsville–Gadsden regional crew travel.',
    },
    tips: [
      'Verify coverage for Centre and surrounding areas before booking.',
      'Lake access considerations apply — confirm scheduling buffers for waterfront routes.',
      'Confirm insurance for high-value lakeside homes before booking.',
      'Book early for peak seasons.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  barbour: {
    marketNotes:
      'Barbour County is a rural county in Southeast Alabama with residential demand in Eufaula and Clayton.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Barbour County pricing reflects Lake Eufaula corridor demand, rural Southeast Alabama access, and Auburn–Columbus regional crew travel.',
    },
    tips: [
      'Verify coverage for Eufaula and surrounding areas before booking.',
      'Rural access challenges are common — confirm driveway and road constraints.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  winston: {
    marketNotes:
      'Winston County is a rural mountain county in Northwest Alabama with scenic residential demand centered on Double Springs.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Winston County pricing reflects Bankhead National Forest mountain access, rural northwest Alabama demand, and Birmingham–Huntsville regional crew travel.',
    },
    tips: [
      'Verify coverage for Double Springs and surrounding areas before booking.',
      'Mountain roads and weather conditions require specialized experience — confirm crew equipment.',
      'Confirm insurance for high-value mountain homes before booking.',
      'Book early for peak seasons.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  randolph: {
    marketNotes:
      'Randolph County is a rural county in East Alabama with residential demand centered on Wedowee.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Randolph County pricing reflects rural East Alabama access, Lake Wedowee corridor demand, and Auburn–Birmingham regional crew travel.',
    },
    tips: [
      'Rural access challenges are common — confirm driveway and road constraints.',
      'Verify explicit regional service to Wedowee before booking.',
      'Storage is very limited — confirm timing and holding options early.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      'Confirm credentials for rural moves before booking.',
    ],
  },
  bibb: {
    marketNotes:
      'Bibb County is a rural county in Central Alabama with residential demand centered on Centreville.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Bibb County pricing reflects rural central Alabama access and Birmingham–Tuscaloosa regional crew travel.',
    },
    tips: [
      'Rural access challenges are common — confirm driveway and road constraints.',
      'Verify explicit regional service to Centreville before booking.',
      'Storage is very limited — confirm timing and holding options early.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      'Confirm credentials for rural moves before booking.',
    ],
  },
  clarke: {
    marketNotes:
      'Clarke County is a rural county in Southwest Alabama with residential demand centered on Grove Hill.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Clarke County pricing reflects rural Southwest Alabama access and Mobile–Dothan regional crew travel.',
    },
    tips: [
      'Rural access challenges are common — confirm driveway and road constraints.',
      'Verify explicit regional service to Grove Hill before booking.',
      'Storage is very limited — confirm timing and holding options early.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      'Confirm credentials for rural moves before booking.',
    ],
  },
  monroe: {
    marketNotes:
      'Monroe County is a rural county in Southwest Alabama with residential demand centered on Monroeville.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Monroe County pricing reflects rural Southwest Alabama access and Mobile–Gulf Coast regional crew travel.',
    },
    tips: [
      'Rural access challenges are common — confirm driveway and road constraints.',
      'Verify explicit regional service to Monroeville before booking.',
      'Storage is very limited — confirm timing and holding options early.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      'Confirm credentials for rural moves before booking.',
    ],
  },
  henry: {
    marketNotes:
      'Henry County is a rural county in Southeast Alabama with residential demand centered on Abbeville.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Henry County pricing reflects rural Wiregrass regional demand and Dothan-metro crew travel.',
    },
    tips: [
      'Rural access challenges are common — confirm driveway and road constraints.',
      'Verify explicit regional service to Abbeville before booking.',
      'Storage is very limited — confirm timing and holding options early.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      'Confirm credentials for rural moves before booking.',
    ],
  },
  marengo: {
    marketNotes:
      'Marengo County is a rural county in West Alabama with residential demand centered on Linden.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Marengo County pricing reflects rural Black Belt access and Tuscaloosa–Montgomery regional crew travel.',
    },
    tips: [
      'Rural access challenges are common — confirm driveway and road constraints.',
      'Verify explicit regional service to Linden before booking.',
      'Storage is very limited — confirm timing and holding options early.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      'Confirm credentials for rural moves before booking.',
    ],
  },
  madison: {
    marketNotes:
      "Madison County is Alabama's third-largest county and the core of the Huntsville metropolitan area, with exceptional growth driven by aerospace, defense (Redstone Arsenal), tech, and suburban residential expansion across Madison and Huntsville.",
    costs: {
      studioRange: '$750–$1,550',
      familyRange: '$2,700–$6,000',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Madison County pricing reflects Huntsville-metro crew demand, Research Park and Redstone Arsenal PCS relocations, and strong competition among North Alabama full-service providers.',
    },
    tips: [
      'Verify coverage for Huntsville, Madison, and Research Park corridor areas before booking.',
      'Defense and tech-corridor traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and military relocations before booking.',
      'Book early for peak seasons, month-end lease turnover, and PCS windows.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mobile: {
    marketNotes:
      "Mobile County is Alabama's only major coastal port county with strong military, maritime, and residential demand across Mobile, Prichard, and Saraland, plus frequent cross-county moves to Baldwin's Eastern Shore.",
    costs: {
      studioRange: '$750–$1,550',
      familyRange: '$2,700–$6,100',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Mobile County pricing reflects Gulf Coast humidity handling, port and military relocation demand, hurricane-season scheduling constraints, and competition among established coastal full-service providers.',
    },
    tips: [
      'Verify coverage for Mobile, Prichard, Saraland, and Theodore areas before booking.',
      'Coastal humidity and hurricane-season windows affect scheduling — confirm buffers.',
      'Confirm insurance for high-value homes and military relocations before booking.',
      'Book early for peak summer and PCS turnover windows.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  macon: {
    marketNotes:
      'Macon County is a historic county in East Alabama with strong educational (Tuskegee University) and residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Macon County pricing reflects university-season demand, Auburn–Montgomery corridor access, and regional crew travel.',
    },
    tips: [
      'Verify coverage for Tuskegee and surrounding areas before booking.',
      'University and regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and semester turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  pickens: {
    marketNotes:
      'Pickens County is a rural county in West Alabama with residential demand centered on Carrollton.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Pickens County pricing reflects rural West Alabama access and Tuscaloosa–Birmingham regional crew travel.',
    },
    tips: [
      'Rural access challenges are common — confirm driveway and road constraints.',
      'Verify explicit regional service to Carrollton before booking.',
      'Storage is very limited — confirm timing and holding options early.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      'Confirm credentials for rural moves before booking.',
    ],
  },
  butler: {
    marketNotes:
      'Butler County is a rural county in South Alabama with residential demand centered on Greenville.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Butler County pricing reflects rural South Alabama access and Montgomery–Dothan regional crew travel.',
    },
    tips: [
      'Verify coverage for Greenville and surrounding areas before booking.',
      'Rural access challenges are common — confirm driveway and road constraints.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cleburne: {
    marketNotes:
      'Cleburne County is a rural mountain county in East Alabama with scenic residential demand centered on Heflin.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Cleburne County pricing reflects Cheaha Mountain corridor access, rural East Alabama demand, and Anniston–Huntsville regional crew travel.',
    },
    tips: [
      'Verify coverage for Heflin and surrounding areas before booking.',
      'Mountain roads and weather conditions require specialized experience — confirm crew equipment.',
      'Confirm insurance for high-value mountain homes before booking.',
      'Book early for peak seasons.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  fayette: {
    marketNotes:
      'Fayette County is a rural county in West Alabama with residential demand centered on Fayette.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Fayette County pricing reflects rural northwest Alabama access and Birmingham–Tuscaloosa regional crew travel.',
    },
    tips: [
      'Verify coverage for Fayette and surrounding areas before booking.',
      'Rural access challenges are common — confirm driveway and road constraints.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hale: {
    marketNotes:
      'Hale County is a rural county in West Alabama with residential demand centered on Greensboro.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Hale County pricing reflects rural Black Belt access and Tuscaloosa–Montgomery regional crew travel.',
    },
    tips: [
      'Rural access challenges are common — confirm driveway and road constraints.',
      'Verify explicit regional service to Greensboro before booking.',
      'Storage is very limited — confirm timing and holding options early.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      'Confirm credentials for rural moves before booking.',
    ],
  },
  washington: {
    marketNotes:
      'Washington County is a rural county in Southwest Alabama with residential demand centered on Chatom.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Washington County pricing reflects rural Southwest Alabama access and Mobile–Dothan regional crew travel.',
    },
    tips: [
      'Rural access challenges are common — confirm driveway and road constraints.',
      'Verify explicit regional service to Chatom before booking.',
      'Storage is very limited — confirm timing and holding options early.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      'Confirm credentials for rural moves before booking.',
    ],
  },
  clay: {
    marketNotes:
      'Clay County is a rural mountain county in East Alabama with residential demand centered on Ashland.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Clay County pricing reflects Talladega National Forest mountain access and Anniston–Huntsville regional crew travel.',
    },
    tips: [
      'Verify coverage for Ashland and surrounding areas before booking.',
      'Mountain roads and weather conditions require specialized experience — confirm crew equipment.',
      'Confirm insurance for high-value mountain homes before booking.',
      'Book early for peak seasons.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lamar: {
    marketNotes:
      'Lamar County is a rural county in West Alabama with residential demand centered on Vernon.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Lamar County pricing reflects rural West Alabama access and Tuscaloosa–Birmingham regional crew travel.',
    },
    tips: [
      'Rural access challenges are common — confirm driveway and road constraints.',
      'Verify explicit regional service to Vernon before booking.',
      'Storage is very limited — confirm timing and holding options early.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      'Confirm credentials for rural moves before booking.',
    ],
  },
  crenshaw: {
    marketNotes:
      'Crenshaw County is a rural county in South Alabama with residential demand centered on Luverne.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Crenshaw County pricing reflects rural South Alabama access and Montgomery–Dothan regional crew travel.',
    },
    tips: [
      'Rural access challenges are common — confirm driveway and road constraints.',
      'Verify explicit regional service to Luverne before booking.',
      'Storage is very limited — confirm timing and holding options early.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      'Confirm credentials for rural moves before booking.',
    ],
  },
  choctaw: {
    marketNotes:
      'Choctaw County is a rural county in Southwest Alabama with residential demand centered on Butler.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Choctaw County pricing reflects rural Southwest Alabama access and Mobile–Dothan regional crew travel.',
    },
    tips: [
      'Rural access challenges are common — confirm driveway and road constraints.',
      'Verify explicit regional service to Butler before booking.',
      'Storage is very limited — confirm timing and holding options early.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      'Confirm credentials for rural moves before booking.',
    ],
  },
  sumter: {
    marketNotes:
      'Sumter County is a rural county in West Alabama with residential demand centered on Livingston.',
    costs: {
      studioRange: '$550–$1,150',
      familyRange: '$1,900–$4,400',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Sumter County pricing reflects remote West Alabama access, very limited local competition, and Tuscaloosa–Birmingham regional crew travel.',
    },
    tips: [
      'Rural access challenges are common — confirm driveway and road constraints.',
      'Verify explicit regional service to Livingston before booking.',
      'Storage is very limited — confirm timing and holding options early.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      'Confirm credentials for rural moves before booking.',
    ],
  },
  conecuh: {
    marketNotes:
      'Conecuh County is a rural county in South Alabama with residential demand centered on Evergreen.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Conecuh County pricing reflects rural South Alabama access and Mobile–Dothan regional crew travel.',
    },
    tips: [
      'Rural access challenges are common — confirm driveway and road constraints.',
      'Verify explicit regional service to Evergreen before booking.',
      'Storage is very limited — confirm timing and holding options early.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      'Confirm credentials for rural moves before booking.',
    ],
  },
  coosa: {
    marketNotes:
      'Coosa County is a rural county in Central Alabama with residential demand centered on Rockford.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$145/hr for a 2-person crew',
      note: 'Coosa County pricing reflects rural central Alabama access and Birmingham–Montgomery regional crew travel.',
    },
    tips: [
      'Rural access challenges are common — confirm driveway and road constraints.',
      'Verify explicit regional service to Rockford before booking.',
      'Storage is very limited — confirm timing and holding options early.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      'Confirm credentials for rural moves before booking.',
    ],
  },
  bullock: {
    marketNotes:
      'Bullock County is a rural county in East Alabama with residential demand centered on Union Springs.',
    costs: {
      studioRange: '$550–$1,150',
      familyRange: '$1,900–$4,400',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Bullock County pricing reflects remote East Alabama access and Montgomery–Auburn regional crew travel.',
    },
    tips: [
      'Rural access challenges are common — confirm driveway and road constraints.',
      'Verify explicit regional service to Union Springs before booking.',
      'Storage is very limited — confirm timing and holding options early.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      'Confirm credentials for rural moves before booking.',
    ],
  },
  wilcox: {
    marketNotes:
      'Wilcox County is a rural county in West Alabama with residential demand centered on Camden.',
    costs: {
      studioRange: '$550–$1,150',
      familyRange: '$1,900–$4,400',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Wilcox County pricing reflects remote Black Belt access and Montgomery–Mobile regional crew travel.',
    },
    tips: [
      'Rural access challenges are common — confirm driveway and road constraints.',
      'Verify explicit regional service to Camden before booking.',
      'Storage is very limited — confirm timing and holding options early.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      'Confirm credentials for rural moves before booking.',
    ],
  },
  lowndes: {
    marketNotes:
      'Lowndes County is a rural county in Central Alabama with residential demand centered on Hayneville.',
    costs: {
      studioRange: '$550–$1,150',
      familyRange: '$1,900–$4,400',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Lowndes County pricing reflects remote Black Belt access and Montgomery-metro regional crew travel.',
    },
    tips: [
      'Rural access challenges are common — confirm driveway and road constraints.',
      'Verify explicit regional service to Hayneville before booking.',
      'Storage is very limited — confirm timing and holding options early.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      'Confirm credentials for rural moves before booking.',
    ],
  },
  perry: {
    marketNotes:
      'Perry County is a rural county in Central Alabama with residential demand centered on Marion.',
    costs: {
      studioRange: '$550–$1,150',
      familyRange: '$1,900–$4,400',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Perry County pricing reflects remote Black Belt access and Tuscaloosa–Montgomery regional crew travel.',
    },
    tips: [
      'Rural access challenges are common — confirm driveway and road constraints.',
      'Verify explicit regional service to Marion before booking.',
      'Storage is very limited — confirm timing and holding options early.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      'Confirm credentials for rural moves before booking.',
    ],
  },
  greene: {
    marketNotes:
      'Greene County is a rural county in West Alabama with residential demand centered on Eutaw.',
    costs: {
      studioRange: '$550–$1,150',
      familyRange: '$1,900–$4,400',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Greene County pricing reflects remote West Alabama access and Tuscaloosa–Birmingham regional crew travel.',
    },
    tips: [
      'Rural access challenges are common — confirm driveway and road constraints.',
      'Verify explicit regional service to Eutaw before booking.',
      'Storage is very limited — confirm timing and holding options early.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      'Confirm credentials for rural moves before booking.',
    ],
  },
};

export function getAlabamaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return alabamaCountyResearch[countySlug];
}