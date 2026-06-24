import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Kentucky county research — grows incrementally per batch */
export const kentuckyCountyResearch: Record<string, CuratedCountyResearch> = {
  jefferson: {
    marketNotes:
      'Jefferson County is the core of the Louisville metropolitan area with strong urban, corporate, and residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Jefferson County pricing reflects Louisville metro urban demand, I-64/I-65 corridor traffic, Ohio River flood-zone considerations, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Louisville and surrounding areas before booking.',
      'Heavy urban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value urban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  fayette: {
    marketNotes:
      'Fayette County is the core of the Lexington metropolitan area with strong educational, corporate, and residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Fayette County pricing reflects Lexington metro demand, university and thoroughbred-country relocation volume, Bluegrass Parkway traffic patterns, and competition among full-service local agents.',
    },
    tips: [
      'Verify coverage for Lexington and surrounding areas before booking.',
      'University and urban traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  kenton: {
    marketNotes:
      'Kenton County is a major suburban county in the Cincinnati metropolitan area with strong residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Kenton County pricing reflects Cincinnati-metro suburban demand, I-71/I-75 corridor traffic, Ohio River valley relocation volume, and competition among Kentucky-side and cross-river agents.',
    },
    tips: [
      'Verify coverage for Covington, Erlanger, and surrounding areas before booking.',
      'Cincinnati-area traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  warren: {
    marketNotes:
      'Warren County is the core of the Bowling Green metropolitan area with strong educational and residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Warren County pricing reflects Bowling Green regional demand, I-65 corridor traffic, Western Kentucky University area volume, and competition among local and regional full-service agents.',
    },
    tips: [
      'Verify coverage for Bowling Green and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  boone: {
    marketNotes:
      'Boone County is a major suburban county in the Cincinnati metropolitan area with strong residential and commercial demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Boone County pricing reflects Cincinnati-metro suburban demand, I-71/I-75 corridor traffic, Florence commercial growth, and competition among Northern Kentucky and cross-river agents.',
    },
    tips: [
      'Verify coverage for Burlington, Florence, and surrounding areas before booking.',
      'Cincinnati-area traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hardin: {
    marketNotes:
      'Hardin County is a key county in Central Kentucky with strong military (Fort Knox) and residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Hardin County pricing reflects Elizabethtown regional demand, I-65 corridor traffic, Fort Knox relocation volume, and competition among local and regional full-service agents.',
    },
    tips: [
      'Verify coverage for Elizabethtown and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  daviess: {
    marketNotes:
      'Daviess County is the core of the Owensboro metropolitan area with strong industrial and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Daviess County pricing reflects Owensboro regional demand, Ohio River industrial corridor traffic, and competition among Western Kentucky full-service local agents.',
    },
    tips: [
      'Verify coverage for Owensboro and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  madison: {
    marketNotes:
      'Madison County is anchored by Eastern Kentucky University with strong educational and residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Madison County pricing reflects Richmond regional demand, university and student relocation volume, I-75 corridor traffic, and competition among Bluegrass-area local agents.',
    },
    tips: [
      'Verify coverage for Richmond and surrounding areas before booking.',
      'University traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  campbell: {
    marketNotes:
      'Campbell County is a suburban county in the Cincinnati metropolitan area with strong residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Campbell County pricing reflects Cincinnati-metro suburban demand, Ohio River valley relocation volume, Newport and Alexandria residential growth, and competition among Northern Kentucky agents.',
    },
    tips: [
      'Verify coverage for Alexandria, Newport, and surrounding areas before booking.',
      'Cincinnati-area traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  bullitt: {
    marketNotes:
      'Bullitt County is a suburban county south of Louisville with strong residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Bullitt County pricing reflects Louisville-metro south suburban demand, I-65 corridor commuter traffic, Shepherdsville residential growth, and competition among Louisville-area agents.',
    },
    tips: [
      'Verify coverage for Shepherdsville and surrounding areas before booking.',
      'Louisville-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  oldham: {
    marketNotes:
      'Oldham County is one of Kentucky’s most affluent suburban counties northeast of Louisville with strong residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Oldham County pricing reflects Louisville-metro northeast suburban demand, high-value home relocation volume, La Grange and Crestwood residential growth, and competition among Louisville-area agents.',
    },
    tips: [
      'Verify coverage for La Grange and surrounding areas before booking.',
      'Louisville-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  christian: {
    marketNotes:
      'Christian County is a key Southwest Kentucky county with strong military (Fort Campbell) and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Christian County pricing reflects Hopkinsville regional demand, Fort Campbell military relocation volume, Pennyrile Parkway traffic, and competition among Southwest Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Hopkinsville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  pulaski: {
    marketNotes:
      'Pulaski County is a key South Central Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Pulaski County pricing reflects Somerset regional demand, Lake Cumberland area relocation volume, and competition among South Central Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Somerset and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mccracken: {
    marketNotes:
      'McCracken County is the core of the Paducah metropolitan area with strong industrial and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'McCracken County pricing reflects Paducah regional demand, Tennessee and Ohio River industrial corridor traffic, and competition among Western Kentucky full-service local agents.',
    },
    tips: [
      'Verify coverage for Paducah and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  laurel: {
    marketNotes:
      'Laurel County is a key Southeast Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Laurel County pricing reflects London regional demand, I-75 corridor traffic, and competition among Southeast Kentucky full-service local agents.',
    },
    tips: [
      'Verify coverage for London and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  scott: {
    marketNotes:
      'Scott County is a growing suburban county north of Lexington with strong residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Scott County pricing reflects Lexington-metro north suburban demand, Georgetown growth corridor traffic, and competition among Bluegrass-area local agents.',
    },
    tips: [
      'Verify coverage for Georgetown and surrounding areas before booking.',
      'Lexington-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jessamine: {
    marketNotes:
      'Jessamine County is a suburban county south of Lexington with strong residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Jessamine County pricing reflects Lexington-metro south suburban demand, Nicholasville residential growth, and competition among Bluegrass-area local agents.',
    },
    tips: [
      'Verify coverage for Nicholasville and surrounding areas before booking.',
      'Lexington-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  pike: {
    marketNotes:
      'Pike County is a key Eastern Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Pike County pricing reflects Pikeville regional demand, Big Sandy corridor traffic, and competition among Eastern Kentucky full-service local agents.',
    },
    tips: [
      'Verify coverage for Pikeville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  franklin: {
    marketNotes:
      'Franklin County is the state capital county with strong governmental and residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Franklin County pricing reflects Frankfort capital-area demand, governmental relocation volume, and competition among Central Kentucky full-service local agents.',
    },
    tips: [
      'Verify coverage for Frankfort and surrounding areas before booking.',
      'Governmental traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  shelby: {
    marketNotes:
      'Shelby County is a suburban county east of Louisville with strong residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Shelby County pricing reflects Louisville-metro east suburban demand, Shelbyville residential growth, and competition among Louisville-area local agents.',
    },
    tips: [
      'Verify coverage for Shelbyville and surrounding areas before booking.',
      'Louisville-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  nelson: {
    marketNotes:
      'Nelson County is a key Central Kentucky county with strong tourism and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Nelson County pricing reflects Bardstown regional demand, Bourbon Trail tourism traffic, and competition among Central Kentucky full-service local agents.',
    },
    tips: [
      'Verify coverage for Bardstown and surrounding areas before booking.',
      'Tourist traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak tourist seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  boyd: {
    marketNotes:
      'Boyd County is a key Northeast Kentucky county with strong industrial and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Boyd County pricing reflects Ashland regional demand, tri-state industrial corridor traffic, and competition among Northeast Kentucky full-service local agents.',
    },
    tips: [
      'Verify coverage for Ashland and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  barren: {
    marketNotes:
      'Barren County is a key South Central Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Barren County pricing reflects Glasgow regional demand, cave country relocation volume, and competition among South Central Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Glasgow and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hopkins: {
    marketNotes:
      'Hopkins County is a key Western Kentucky county with strong industrial and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Hopkins County pricing reflects Madisonville regional demand, Pennyrile industrial corridor traffic, and competition among Western Kentucky full-service local agents.',
    },
    tips: [
      'Verify coverage for Madisonville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  henderson: {
    marketNotes:
      'Henderson County is a key Western Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Henderson County pricing reflects Henderson regional demand, Ohio River valley relocation volume, and competition among Western Kentucky full-service local agents.',
    },
    tips: [
      'Verify coverage for Henderson and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  calloway: {
    marketNotes:
      'Calloway County is anchored by Murray State University with strong educational and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Calloway County pricing reflects Murray regional demand, university and student relocation volume, and competition among Western Kentucky lakes-region local agents.',
    },
    tips: [
      'Verify coverage for Murray and surrounding areas before booking.',
      'University traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  clark: {
    marketNotes:
      'Clark County is a suburban county east of Lexington with strong residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Clark County pricing reflects Lexington-metro east suburban demand, Winchester residential growth, and competition among Bluegrass-area local agents.',
    },
    tips: [
      'Verify coverage for Winchester and surrounding areas before booking.',
      'Lexington-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  whitley: {
    marketNotes:
      'Whitley County is a rural Southeast Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Whitley County pricing reflects Williamsburg regional demand, Cumberland Gap corridor traffic, and competition among rural Southeast Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Williamsburg and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getKentuckyCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return kentuckyCountyResearch[countySlug];
}