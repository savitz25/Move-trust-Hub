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
  graves: {
    marketNotes:
      'Graves County is a key Western Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Graves County pricing reflects Mayfield regional demand, Purchase area relocation volume, and competition among Western Kentucky full-service local agents.',
    },
    tips: [
      'Verify coverage for Mayfield and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  greenup: {
    marketNotes:
      'Greenup County is a key Northeast Kentucky county with industrial and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Greenup County pricing reflects tri-state industrial corridor demand, Ohio River valley traffic, and competition among Northeast Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Greenup and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  floyd: {
    marketNotes:
      'Floyd County is a key Eastern Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Floyd County pricing reflects Prestonsburg regional demand, Big Sandy corridor traffic, and competition among Eastern Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Prestonsburg and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  boyle: {
    marketNotes:
      'Boyle County is a key Central Kentucky county with strong educational and residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Boyle County pricing reflects Danville regional demand, Centre College area relocation volume, and competition among Central Kentucky full-service local agents.',
    },
    tips: [
      'Verify coverage for Danville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  marshall: {
    marketNotes:
      'Marshall County is a key Western Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Marshall County pricing reflects Benton regional demand, Kentucky lakes area relocation volume, and competition among Western Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Benton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  meade: {
    marketNotes:
      'Meade County is a suburban county in the Louisville metropolitan area with residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Meade County pricing reflects Louisville-metro west suburban demand, Ohio River corridor traffic, and competition among Louisville-area local agents.',
    },
    tips: [
      'Verify coverage for Brandenburg and surrounding areas before booking.',
      'Louisville-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  muhlenberg: {
    marketNotes:
      'Muhlenberg County is a rural Western Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Muhlenberg County pricing reflects Greenville regional demand, Pennyrile Parkway corridor traffic, and competition among rural Western Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Greenville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  knox: {
    marketNotes:
      'Knox County is a rural Southeast Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Knox County pricing reflects Barbourville regional demand, Cumberland Valley corridor traffic, and competition among rural Southeast Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Barbourville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  logan: {
    marketNotes:
      'Logan County is a rural South Central Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Logan County pricing reflects Russellville regional demand, Pennyrile south corridor traffic, and competition among South Central Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Russellville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  montgomery: {
    marketNotes:
      'Montgomery County is a key Eastern Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Montgomery County pricing reflects Mount Sterling regional demand, I-64 corridor traffic, and competition among Eastern Bluegrass local agents.',
    },
    tips: [
      'Verify coverage for Mount Sterling and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  woodford: {
    marketNotes:
      'Woodford County is an affluent suburban county west of Lexington with strong residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Woodford County pricing reflects Lexington-metro west suburban demand, Versailles thoroughbred country relocation volume, and competition among Bluegrass-area local agents.',
    },
    tips: [
      'Verify coverage for Versailles and surrounding areas before booking.',
      'Lexington-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  grayson: {
    marketNotes:
      'Grayson County is a rural Western Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Grayson County pricing reflects Leitchfield regional demand, cave country corridor traffic, and competition among rural Western Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Leitchfield and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  taylor: {
    marketNotes:
      'Taylor County is a rural Central Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Taylor County pricing reflects Campbellsville regional demand, Green River corridor traffic, and competition among South Central Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Campbellsville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  grant: {
    marketNotes:
      'Grant County is a suburban/rural county in Northern Kentucky with residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Grant County pricing reflects Williamstown regional demand, I-71 corridor traffic, and competition among Northern Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Williamstown and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  perry: {
    marketNotes:
      'Perry County is a key Eastern Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Perry County pricing reflects Hazard regional demand, mountain corridor traffic, and competition among Eastern Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Hazard and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  carter: {
    marketNotes:
      'Carter County is a rural Northeast Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Carter County pricing reflects Grayson regional demand, Little Sandy corridor traffic, and competition among rural Northeast Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Grayson and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lincoln: {
    marketNotes:
      'Lincoln County is a rural Central Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Lincoln County pricing reflects Stanford regional demand and competition among rural Central Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Stanford and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  anderson: {
    marketNotes:
      'Anderson County is a suburban county in Central Kentucky with residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Anderson County pricing reflects Lawrenceburg regional demand, Kentucky River corridor traffic, and competition among Central Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Lawrenceburg and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  rowan: {
    marketNotes:
      'Rowan County is anchored by Morehead State University with strong educational and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Rowan County pricing reflects Morehead regional demand, university and student relocation volume, and competition among Eastern Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Morehead and surrounding areas before booking.',
      'University traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  harlan: {
    marketNotes:
      'Harlan County is a rural Southeast Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Harlan County pricing reflects Harlan regional demand, Black Mountain corridor traffic, and competition among rural Southeast Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Harlan and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  ohio: {
    marketNotes:
      'Ohio County is a rural Western Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Ohio County pricing reflects Hartford regional demand, Green River east corridor traffic, and competition among rural Western Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Hartford and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mercer: {
    marketNotes:
      'Mercer County is a rural Central Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Mercer County pricing reflects Harrodsburg regional demand, oldest-town heritage tourism traffic, and competition among Central Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Harrodsburg and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  allen: {
    marketNotes:
      'Allen County is a rural South Central Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Allen County pricing reflects Scottsville regional demand, Pennyrile east corridor traffic, and competition among South Central Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Scottsville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  bell: {
    marketNotes:
      'Bell County is a rural Southeast Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Bell County pricing reflects Pineville regional demand, Cumberland Gap corridor traffic, and competition among rural Southeast Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Pineville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  johnson: {
    marketNotes:
      'Johnson County is a rural Eastern Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Johnson County pricing reflects Paintsville regional demand, Big Sandy valley corridor traffic, and competition among Eastern Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Paintsville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  breckinridge: {
    marketNotes:
      'Breckinridge County is a rural Western Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Breckinridge County pricing reflects Hardinsburg regional demand, Rough River corridor traffic, and competition among rural Western Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Hardinsburg and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  spencer: {
    marketNotes:
      'Spencer County is a suburban county in the Louisville metropolitan area with residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Spencer County pricing reflects Taylorsville regional demand, Louisville-metro suburban traffic, and competition among Louisville-area local agents.',
    },
    tips: [
      'Verify coverage for Taylorsville and surrounding areas before booking.',
      'Louisville-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  simpson: {
    marketNotes:
      'Simpson County is a rural South Central Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Simpson County pricing reflects Franklin regional demand, Pennyrile south corridor traffic, and competition among South Central Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Franklin and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hart: {
    marketNotes:
      'Hart County is a rural South Central Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Hart County pricing reflects Munfordville regional demand, cave river corridor traffic, and competition among South Central Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Munfordville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  marion: {
    marketNotes:
      'Marion County is a rural Central Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Marion County pricing reflects Lebanon regional demand, Central Kentucky corridor traffic, and competition among rural Central Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Lebanon and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  bourbon: {
    marketNotes:
      'Bourbon County is a rural Central Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Bourbon County pricing reflects Paris regional demand, Bluegrass corridor traffic, and competition among rural Central Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Paris and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  harrison: {
    marketNotes:
      'Harrison County is a rural North Central Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Harrison County pricing reflects Cynthiana regional demand, North Central Kentucky corridor traffic, and competition among Bluegrass fringe local agents.',
    },
    tips: [
      'Verify coverage for Cynthiana and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  letcher: {
    marketNotes:
      'Letcher County is a rural Southeast Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Letcher County pricing reflects Whitesburg regional demand, mountain corridor traffic, and competition among Eastern Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Whitesburg and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  wayne: {
    marketNotes:
      'Wayne County is a rural South Central Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Wayne County pricing reflects Monticello regional demand, Lake Cumberland corridor traffic, and competition among South Central Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Monticello and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  adair: {
    marketNotes:
      'Adair County is a rural South Central Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Adair County pricing reflects Columbia regional demand, Green River corridor traffic, and competition among South Central Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Columbia and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  clay: {
    marketNotes:
      'Clay County is a rural Southeast Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Clay County pricing reflects Manchester regional demand, mountain corridor traffic, and competition among Eastern Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Manchester and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  russell: {
    marketNotes:
      'Russell County is a rural South Central Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Russell County pricing reflects Jamestown regional demand, Lake Cumberland corridor traffic, and competition among South Central Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Jamestown and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  garrard: {
    marketNotes:
      'Garrard County is a rural Central Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Garrard County pricing reflects Lancaster regional demand, Central Kentucky corridor traffic, and competition among Bluegrass local agents.',
    },
    tips: [
      'Verify coverage for Lancaster and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mccreary: {
    marketNotes:
      'McCreary County is a rural Southeast Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'McCreary County pricing reflects Whitley City regional demand, Daniel Boone corridor traffic, and competition among Eastern Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Whitley City and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mason: {
    marketNotes:
      'Mason County is a key Northeast Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Mason County pricing reflects Maysville regional demand, Ohio River valley traffic, and competition among Northeast Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Maysville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  henry: {
    marketNotes:
      'Henry County is a rural North Central Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Henry County pricing reflects New Castle regional demand, Louisville-fringe corridor traffic, and competition among North Central Kentucky local agents.',
    },
    tips: [
      'Verify coverage for New Castle and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  casey: {
    marketNotes:
      'Casey County is a rural Central Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Casey County pricing reflects Liberty regional demand, Green River foothills corridor traffic, and competition among rural Central Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Liberty and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  rockcastle: {
    marketNotes:
      'Rockcastle County is a rural South Central Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Rockcastle County pricing reflects Mount Vernon regional demand, Daniel Boone corridor traffic, and competition among South Central Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Mount Vernon and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  fleming: {
    marketNotes:
      'Fleming County is a rural Northeast Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Fleming County pricing reflects Flemingsburg regional demand, Northeast Kentucky corridor traffic, and competition among Bluegrass fringe local agents.',
    },
    tips: [
      'Verify coverage for Flemingsburg and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lawrence: {
    marketNotes:
      'Lawrence County is a rural Eastern Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Lawrence County pricing reflects Louisa regional demand, Big Sandy River valley traffic, and competition among Eastern Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Louisa and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  larue: {
    marketNotes:
      'Larue County is a rural Central Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Larue County pricing reflects Hodgenville regional demand, Lincoln birthplace corridor traffic, and competition among rural Central Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Hodgenville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  pendleton: {
    marketNotes:
      'Pendleton County is a rural Northern Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Pendleton County pricing reflects Falmouth regional demand, Licking River valley traffic, and competition among Northern Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Falmouth and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  morgan: {
    marketNotes:
      'Morgan County is a rural Eastern Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Morgan County pricing reflects West Liberty regional demand, Appalachian foothills corridor traffic, and competition among Eastern Kentucky local agents.',
    },
    tips: [
      'Verify coverage for West Liberty and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  trigg: {
    marketNotes:
      'Trigg County is a rural Western Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Trigg County pricing reflects Cadiz regional demand, Land Between the Lakes corridor traffic, and competition among Western Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Cadiz and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  estill: {
    marketNotes:
      'Estill County is a rural Eastern Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Estill County pricing reflects Irvine regional demand, Kentucky River valley traffic, and competition among Eastern Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Irvine and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  bath: {
    marketNotes:
      'Bath County is a rural Eastern Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Bath County pricing reflects Owingsville regional demand, Northeast Bluegrass fringe traffic, and competition among Eastern Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Owingsville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jackson: {
    marketNotes:
      'Jackson County is a rural Southeast Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Jackson County pricing reflects McKee regional demand, Daniel Boone corridor traffic, and competition among Southeast Kentucky local agents.',
    },
    tips: [
      'Verify coverage for McKee and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  knott: {
    marketNotes:
      'Knott County is a rural Eastern Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Knott County pricing reflects Hindman regional demand, Appalachian craft country corridor traffic, and competition among Eastern Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Hindman and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  todd: {
    marketNotes:
      'Todd County is a rural South Central Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Todd County pricing reflects Elkton regional demand, Pennyrile corridor traffic, and competition among South Central Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Elkton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  webster: {
    marketNotes:
      'Webster County is a rural Western Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Webster County pricing reflects Dixon regional demand, Pennyrile west corridor traffic, and competition among Western Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Dixon and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lewis: {
    marketNotes:
      'Lewis County is a rural Northeast Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Lewis County pricing reflects Vanceburg regional demand, Ohio River valley traffic, and competition among Northeast Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Vanceburg and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  edmonson: {
    marketNotes:
      'Edmonson County is a rural South Central Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Edmonson County pricing reflects Brownsville regional demand, Mammoth Cave corridor traffic, and competition among South Central Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Brownsville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  powell: {
    marketNotes:
      'Powell County is a rural Eastern Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Powell County pricing reflects Stanton regional demand, Red River Gorge corridor traffic, and competition among Eastern Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Stanton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  caldwell: {
    marketNotes:
      'Caldwell County is a rural Western Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Caldwell County pricing reflects Princeton regional demand, Pennyrile west corridor traffic, and competition among Western Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Princeton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  butler: {
    marketNotes:
      'Butler County is a rural Western Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Butler County pricing reflects Morgantown regional demand, Green River valley traffic, and competition among Western Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Morgantown and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  union: {
    marketNotes:
      'Union County is a rural Western Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Union County pricing reflects Morganfield regional demand, Ohio River valley traffic, and competition among Western Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Morganfield and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  washington: {
    marketNotes:
      'Washington County is a rural Central Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Washington County pricing reflects Springfield regional demand, Central Kentucky corridor traffic, and competition among Bluegrass local agents.',
    },
    tips: [
      'Verify coverage for Springfield and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  breathitt: {
    marketNotes:
      'Breathitt County is a rural Eastern Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Breathitt County pricing reflects Jackson regional demand, Kentucky River mountain corridor traffic, and competition among Eastern Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Jackson and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  green: {
    marketNotes:
      'Green County is a rural South Central Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Green County pricing reflects Greensburg regional demand, Pennyrile corridor traffic, and competition among South Central Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Greensburg and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  owen: {
    marketNotes:
      'Owen County is a rural North Central Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Owen County pricing reflects Owenton regional demand, Kentucky River valley traffic, and competition among North Central Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Owenton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  monroe: {
    marketNotes:
      'Monroe County is a rural South Central Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Monroe County pricing reflects Tompkinsville regional demand, Tennessee border corridor traffic, and competition among South Central Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Tompkinsville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  carroll: {
    marketNotes:
      'Carroll County is a rural Northern Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Carroll County pricing reflects Carrollton regional demand, Ohio River valley traffic, and competition among Northern Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Carrollton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  magoffin: {
    marketNotes:
      'Magoffin County is a rural Eastern Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Magoffin County pricing reflects Salyersville regional demand, Appalachian mountain corridor traffic, and competition among Eastern Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Salyersville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  martin: {
    marketNotes:
      'Martin County is a rural Eastern Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Martin County pricing reflects Inez regional demand, Big Sandy River valley traffic, and competition among Eastern Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Inez and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  metcalfe: {
    marketNotes:
      'Metcalfe County is a rural South Central Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Metcalfe County pricing reflects Edmonton regional demand, Green River corridor traffic, and competition among South Central Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Edmonton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  leslie: {
    marketNotes:
      'Leslie County is a rural Southeast Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Leslie County pricing reflects Hyden regional demand, Appalachian mountain corridor traffic, and competition among Southeast Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Hyden and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lyon: {
    marketNotes:
      'Lyon County is a rural Western Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Lyon County pricing reflects Eddyville regional demand, Land Between the Lakes corridor traffic, and competition among Western Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Eddyville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  clinton: {
    marketNotes:
      'Clinton County is a rural South Central Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Clinton County pricing reflects Albany regional demand, Lake Cumberland corridor traffic, and competition among South Central Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Albany and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hancock: {
    marketNotes:
      'Hancock County is a rural Western Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Hancock County pricing reflects Hawesville regional demand, Ohio River valley traffic, and competition among Western Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Hawesville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mclean: {
    marketNotes:
      'McLean County is a rural Western Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'McLean County pricing reflects Calhoun regional demand, Green River valley traffic, and competition among Western Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Calhoun and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  gallatin: {
    marketNotes:
      'Gallatin County is a small rural Northern Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Gallatin County pricing reflects Warsaw regional demand, Ohio River valley traffic, and competition among Northern Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Warsaw and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  livingston: {
    marketNotes:
      'Livingston County is a rural Western Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Livingston County pricing reflects Smithland regional demand, Cumberland River corridor traffic, and competition among Western Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Smithland and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  trimble: {
    marketNotes:
      'Trimble County is a small rural Northern Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Trimble County pricing reflects Bedford regional demand, Ohio River fringe traffic, and competition among Northern Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Bedford and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  crittenden: {
    marketNotes:
      'Crittenden County is a rural Western Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Crittenden County pricing reflects Marion regional demand, Pennyrile west corridor traffic, and competition among Western Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Marion and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  bracken: {
    marketNotes:
      'Bracken County is a small rural Northern Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Bracken County pricing reflects Brooksville regional demand, Ohio River valley traffic, and competition among Northern Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Brooksville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  nicholas: {
    marketNotes:
      'Nicholas County is a rural North Central Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Nicholas County pricing reflects Carlisle regional demand, Bluegrass fringe corridor traffic, and competition among North Central Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Carlisle and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  ballard: {
    marketNotes:
      'Ballard County is a rural Western Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Ballard County pricing reflects Wickliffe regional demand, Purchase region traffic, and competition among Western Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Wickliffe and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lee: {
    marketNotes:
      'Lee County is a rural Eastern Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Lee County pricing reflects Beattyville regional demand, Kentucky River valley traffic, and competition among Eastern Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Beattyville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  elliott: {
    marketNotes:
      'Elliott County is a rural Eastern Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Elliott County pricing reflects Sandy Hook regional demand, Appalachian foothills corridor traffic, and competition among Eastern Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Sandy Hook and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  menifee: {
    marketNotes:
      'Menifee County is a rural Eastern Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Menifee County pricing reflects Frenchburg regional demand, Daniel Boone foothills corridor traffic, and competition among Eastern Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Frenchburg and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  wolfe: {
    marketNotes:
      'Wolfe County is a rural Eastern Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Wolfe County pricing reflects Campton regional demand, Red River Gorge foothills corridor traffic, and competition among Eastern Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Campton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  fulton: {
    marketNotes:
      'Fulton County is a rural Western Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Fulton County pricing reflects Hickman regional demand, Mississippi River valley traffic, and competition among Western Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Hickman and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cumberland: {
    marketNotes:
      'Cumberland County is a rural South Central Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Cumberland County pricing reflects Burkesville regional demand, Lake Cumberland corridor traffic, and competition among South Central Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Burkesville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  carlisle: {
    marketNotes:
      'Carlisle County is a small rural Western Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Carlisle County pricing reflects Bardwell regional demand, Purchase region traffic, and competition among Western Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Bardwell and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hickman: {
    marketNotes:
      'Hickman County is a rural Western Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Hickman County pricing reflects Clinton regional demand, Mississippi River valley traffic, and competition among Western Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Clinton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  owsley: {
    marketNotes:
      'Owsley County is a rural Eastern Kentucky county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Owsley County pricing reflects Booneville regional demand, Appalachian mountain corridor traffic, and competition among Eastern Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Booneville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  robertson: {
    marketNotes:
      'Robertson County is one of Kentucky’s smallest counties with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Robertson County pricing reflects Mount Olivet regional demand, Northern Kentucky fringe traffic, and competition among rural Northern Kentucky local agents.',
    },
    tips: [
      'Verify coverage for Mount Olivet and surrounding areas before booking.',
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