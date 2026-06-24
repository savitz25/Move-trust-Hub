import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Ohio county research — grows incrementally per batch */
export const ohioCountyResearch: Record<string, CuratedCountyResearch> = {
  franklin: {
    marketNotes:
      'Franklin County is the core of the Columbus metropolitan area with strong urban, corporate, educational, and residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Franklin County pricing reflects Columbus metro urban demand, I-70/I-71 corridor traffic, Ohio State University and corporate relocation volume, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Columbus and surrounding areas before booking.',
      'Heavy urban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value urban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cuyahoga: {
    marketNotes:
      'Cuyahoga County is the core of the Cleveland metropolitan area with strong urban, corporate, and residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Cuyahoga County pricing reflects Cleveland metro urban demand, I-77/I-90 corridor traffic, lakefront and corporate relocation volume, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Cleveland and surrounding areas before booking.',
      'Heavy urban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value urban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hamilton: {
    marketNotes:
      'Hamilton County is the core of the Cincinnati metropolitan area with strong urban, corporate, and residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Hamilton County pricing reflects Cincinnati metro urban demand, I-71/I-75 corridor traffic, Ohio River valley corporate relocation volume, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Cincinnati and surrounding areas before booking.',
      'Heavy urban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value urban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  montgomery: {
    marketNotes:
      'Montgomery County is the core of the Dayton metropolitan area with strong industrial, corporate, and residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Montgomery County pricing reflects Dayton metro industrial and residential demand, I-75/US-35 corridor traffic, Wright-Patterson AFB area volume, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Dayton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  summit: {
    marketNotes:
      'Summit County is the core of the Akron metropolitan area with strong industrial and residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Summit County pricing reflects Akron metro industrial and residential demand, I-77/US-224 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Akron and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lucas: {
    marketNotes:
      'Lucas County is the core of the Toledo metropolitan area with strong industrial and residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Lucas County pricing reflects Toledo metro industrial and residential demand, I-75/I-280 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Toledo and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  butler: {
    marketNotes:
      'Butler County is a major suburban county in the Cincinnati metropolitan area with strong residential and corporate demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Butler County pricing reflects Cincinnati north-metro suburban demand, I-75 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Hamilton, Fairfield, Middletown, and surrounding areas before booking.',
      'Cincinnati-area traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  stark: {
    marketNotes:
      'Stark County is the core of the Canton metropolitan area with strong industrial and residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Stark County pricing reflects Canton metro industrial and residential demand, I-77/US-30 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Canton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lorain: {
    marketNotes:
      'Lorain County is a major suburban county west of Cleveland with strong residential and industrial demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Lorain County pricing reflects Cleveland west-metro suburban demand, I-90/I-480 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Elyria, Lorain, and surrounding areas before booking.',
      'Cleveland-area traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  warren: {
    marketNotes:
      'Warren County is a rapidly growing suburban county in the Cincinnati metropolitan area with strong residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Warren County pricing reflects Cincinnati north-metro affluent suburban demand, I-71 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Lebanon and surrounding areas before booking.',
      'Cincinnati-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  delaware: {
    marketNotes:
      'Delaware County is one of Ohio’s fastest-growing suburban counties north of Columbus with strong residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Delaware County pricing reflects Columbus north-metro suburban growth, I-71/US-23 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Delaware and surrounding areas before booking.',
      'Columbus-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lake: {
    marketNotes:
      'Lake County is a suburban county east of Cleveland with strong residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Lake County pricing reflects Cleveland east-metro suburban demand, I-90 corridor traffic, lake-effect weather considerations, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Painesville, Mentor, and surrounding areas before booking.',
      'Cleveland-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and lake-effect weather considerations before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mahoning: {
    marketNotes:
      'Mahoning County is the core of the Youngstown metropolitan area with strong industrial and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Mahoning County pricing reflects Youngstown metro industrial and residential demand, I-80/US-422 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Youngstown and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  clermont: {
    marketNotes:
      'Clermont County is a growing suburban county east of Cincinnati with strong residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Clermont County pricing reflects Cincinnati east-metro suburban demand, I-275 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Batavia, Milford, and surrounding areas before booking.',
      'Cincinnati-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  trumbull: {
    marketNotes:
      'Trumbull County is a key county in the Youngstown metropolitan area with strong industrial and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Trumbull County pricing reflects Youngstown metro industrial and residential demand, US-422 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Warren and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  licking: {
    marketNotes:
      'Licking County is a growing suburban county east of Columbus with strong residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Licking County pricing reflects Columbus east-metro suburban demand, I-70/US-40 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Newark and surrounding areas before booking.',
      'Columbus-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  medina: {
    marketNotes:
      'Medina County is a growing suburban county south of Cleveland with strong residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Medina County pricing reflects Cleveland south-metro suburban demand, I-71 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Medina and surrounding areas before booking.',
      'Cleveland-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  greene: {
    marketNotes:
      'Greene County is a suburban county in the Dayton metropolitan area with strong educational and residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Greene County pricing reflects Dayton east-metro suburban demand, Wright-Patterson AFB area volume, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Xenia and surrounding areas before booking.',
      'Dayton-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  fairfield: {
    marketNotes:
      'Fairfield County is a growing suburban county southeast of Columbus with strong residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Fairfield County pricing reflects Columbus southeast-metro suburban demand, US-33 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Lancaster and surrounding areas before booking.',
      'Columbus-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  portage: {
    marketNotes:
      'Portage County is a suburban county in the Akron metropolitan area with strong residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Portage County pricing reflects Akron metro suburban demand, I-76/US-224 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Ravenna and surrounding areas before booking.',
      'Akron-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  wood: {
    marketNotes:
      'Wood County is a suburban county in the Toledo metropolitan area with strong educational (Bowling Green State University) and residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Wood County pricing reflects Toledo metro suburban and university-area demand, I-75 corridor traffic, seasonal student move volume, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Bowling Green and surrounding areas before booking.',
      'Toledo-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and student-related moves before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  clark: {
    marketNotes:
      'Clark County is a key county in the Springfield metropolitan area with strong industrial and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Clark County pricing reflects Springfield metro industrial and residential demand, I-70 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Springfield and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  richland: {
    marketNotes:
      'Richland County is the core of the Mansfield metropolitan area with strong industrial and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Richland County pricing reflects Mansfield metro industrial and residential demand, I-71/US-30 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Mansfield and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  wayne: {
    marketNotes:
      'Wayne County is a key Northeast Ohio county with strong agricultural and residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Wayne County pricing reflects Wooster metro agricultural and residential demand, US-30 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Wooster and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  miami: {
    marketNotes:
      'Miami County is a suburban county in the Dayton metropolitan area with strong residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Miami County pricing reflects Dayton north-metro suburban demand, I-75 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Troy and surrounding areas before booking.',
      'Dayton-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  allen: {
    marketNotes:
      'Allen County is the core of the Lima metropolitan area with strong industrial and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Allen County pricing reflects Lima metro industrial and residential demand, I-75/US-30 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Lima and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  columbiana: {
    marketNotes:
      'Columbiana County is a rural Northeast Ohio county with residential demand centered on Lisbon, Salem, and East Liverpool.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Columbiana County pricing reflects Northeast Ohio rural and residential demand, Ohio River valley corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Lisbon and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  ashtabula: {
    marketNotes:
      'Ashtabula County is a rural Northeast Ohio county with strong lakefront and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Ashtabula County pricing reflects Northeast Ohio lakefront and rural residential demand, I-90 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Jefferson and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getOhioCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return ohioCountyResearch[countySlug];
}