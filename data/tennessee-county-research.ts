import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Tennessee county research — grows incrementally per batch */
export const tennesseeCountyResearch: Record<string, CuratedCountyResearch> = {
  shelby: {
    marketNotes:
      'Shelby County is the most populous county in Tennessee and a major economic, logistics, and cultural hub centered on Memphis.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Shelby County pricing reflects Memphis metro logistics demand, suburban growth in Bartlett and Collierville, and heavy I-40 and I-55 corridor traffic.',
    },
    tips: [
      'Verify coverage for Memphis, Bartlett, Collierville, and Germantown areas before booking.',
      'Major logistics and urban traffic significantly impact scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value urban, suburban, and commercial properties before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  davidson: {
    marketNotes:
      'Davidson County is the core of the Nashville metropolitan area, a major economic, entertainment, and healthcare hub with very high moving volume.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,800–$6,200',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Davidson County pricing reflects Nashville metro growth, downtown and Midtown turnover, Music Row corridor access, and heavy I-40 and I-65 traffic.',
    },
    tips: [
      'Verify coverage for Nashville, Franklin (adjacent), and surrounding urban/suburban areas before booking.',
      'Heavy urban and tourist traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value urban, entertainment, and corporate properties before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  knox: {
    marketNotes:
      'Knox County is a major East Tennessee hub with strong educational (University of Tennessee), corporate, and residential demand centered on Knoxville.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,700',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Knox County pricing reflects UT student turnover, Farragut suburban demand, downtown Knoxville access, and I-40 and I-75 corridor traffic.',
    },
    tips: [
      'Verify coverage for Knoxville, Farragut, and surrounding areas before booking.',
      'University and urban traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and corporate relocations before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hamilton: {
    marketNotes:
      'Hamilton County is a major southeastern Tennessee hub with strong industrial, tourism, and residential demand centered on Chattanooga.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Hamilton County pricing reflects Chattanooga river-valley access, Signal Mountain and East Ridge suburban demand, and I-24 and I-75 corridor traffic.',
    },
    tips: [
      'Verify coverage for Chattanooga, East Ridge, and Signal Mountain areas before booking.',
      'River valley and urban traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and commercial properties before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  rutherford: {
    marketNotes:
      'Rutherford County is one of the fastest-growing counties in Tennessee with strong suburban, educational (Middle Tennessee State University), and corporate relocation demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,700',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Rutherford County pricing reflects Murfreesboro and Smyrna suburban growth, MTSU student turnover, La Vergne corridor demand, and Nashville-metro I-24 traffic.',
    },
    tips: [
      'Verify coverage for Murfreesboro, Smyrna, and La Vergne areas before booking.',
      'Nashville-area traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban and corporate properties before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  williamson: {
    marketNotes:
      'Williamson County is one of the wealthiest and fastest-growing counties in the United States with affluent suburban residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$6,500',
      avgHourly: '$125–$180/hr for a 2-person crew',
      note: 'Williamson County pricing reflects Franklin and Brentwood luxury-home demand, Nolensville new construction turnover, and Nashville-metro I-65 corridor traffic.',
    },
    tips: [
      'Verify coverage for Franklin, Brentwood, and Nolensville areas before booking.',
      'Nashville-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban properties before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  montgomery: {
    marketNotes:
      'Montgomery County is a rapidly growing county with strong military (Fort Campbell) and residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Montgomery County pricing reflects Fort Campbell PCS seasonality, Clarksville suburban growth, and I-24 corridor crew travel from Nashville bases.',
    },
    tips: [
      'Verify coverage for Clarksville and surrounding Montgomery County areas before booking.',
      'Military moves require specific experience and documentation — confirm PCS and base-access credentials.',
      'Confirm insurance for high-value and military relocations before booking.',
      'Book early for peak seasons and deployment windows.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  sumner: {
    marketNotes:
      'Sumner County is a rapidly growing suburban county northeast of Nashville with strong residential and corporate relocation demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,700',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Sumner County pricing reflects Gallatin and Hendersonville suburban growth, Portland corridor demand, and Nashville-metro I-65 traffic.',
    },
    tips: [
      'Verify coverage for Gallatin, Hendersonville, and Portland areas before booking.',
      'Nashville-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  wilson: {
    marketNotes:
      'Wilson County is a fast-growing suburban county east of Nashville with strong residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,700',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Wilson County pricing reflects Lebanon and Mount Juliet suburban turnover, Watertown rural access, and Nashville-metro I-40 corridor traffic.',
    },
    tips: [
      'Verify coverage for Lebanon, Mount Juliet, and Watertown areas before booking.',
      'Nashville-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  sullivan: {
    marketNotes:
      'Sullivan County is a key Tri-Cities hub with strong industrial, healthcare, and residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Sullivan County pricing reflects Kingsport and Bristol corridor demand, healthcare-sector relocations, and regional Tri-Cities crew travel.',
    },
    tips: [
      'Verify coverage for Kingsport, Bristol, and Blountville areas before booking.',
      'Regional Tri-Cities traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  blount: {
    marketNotes:
      'Blount County is a growing county south of Knoxville with strong residential, tourism (Great Smoky Mountains), and industrial demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Blount County pricing reflects Maryville and Alcoa suburban demand, Smokies tourism seasonality, and Knoxville-metro I-140 corridor traffic.',
    },
    tips: [
      'Verify coverage for Maryville, Alcoa, and Townsend areas before booking.',
      'Knoxville-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes near the mountains before booking.',
      'Book early for peak tourist seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  washington: {
    marketNotes:
      'Washington County is a key Tri-Cities county with strong educational (East Tennessee State University), healthcare, and residential demand centered on Johnson City.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Washington County pricing reflects Johnson City and Jonesborough demand, ETSU student turnover, and regional Tri-Cities corridor traffic.',
    },
    tips: [
      'Verify coverage for Johnson City, Jonesborough, and Gray areas before booking.',
      'Tri-Cities traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  maury: {
    marketNotes:
      'Maury County is a fast-growing county south of Nashville with strong residential and historic demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Maury County pricing reflects Columbia and Spring Hill suburban growth, Mount Pleasant rural access, and Nashville-metro I-65 corridor traffic.',
    },
    tips: [
      'Verify coverage for Columbia, Spring Hill, and Mount Pleasant areas before booking.',
      'Nashville-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  bradley: {
    marketNotes:
      'Bradley County is a growing county in southeastern Tennessee with strong industrial and residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Bradley County pricing reflects Cleveland industrial corridor demand, Chattanooga-metro crew travel, and regional I-75 traffic.',
    },
    tips: [
      'Verify coverage for Cleveland and surrounding Bradley County areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  sevier: {
    marketNotes:
      'Sevier County is a premier tourism county with heavy demand from the Great Smoky Mountains and resort areas.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Sevier County pricing reflects Sevierville, Pigeon Forge, and Gatlinburg tourism seasonality, mountain driveway access, and peak vacation-property turnover.',
    },
    tips: [
      'Verify coverage for Sevierville, Pigeon Forge, and Gatlinburg areas before booking.',
      'Tourist traffic and mountain access require advance planning — confirm crew arrival windows.',
      'Confirm insurance for high-value vacation and mountain properties before booking.',
      'Book early for peak tourist seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  madison: {
    marketNotes:
      'Madison County is a key West Tennessee hub with strong educational, healthcare, and industrial demand centered on Jackson.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Madison County pricing reflects Jackson hub demand, healthcare-sector relocations, and West Tennessee crew travel distances.',
    },
    tips: [
      'Verify coverage for Jackson and surrounding Madison County areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  putnam: {
    marketNotes:
      'Putnam County is a growing Upper Cumberland hub with strong educational (Tennessee Tech) and residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Putnam County pricing reflects Cookeville and Tennessee Tech student turnover, Upper Cumberland rural access, and regional I-40 corridor traffic.',
    },
    tips: [
      'Verify coverage for Cookeville and surrounding Putnam County areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  anderson: {
    marketNotes:
      'Anderson County is a key county in the Oak Ridge National Laboratory corridor with strong residential, scientific, and industrial demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Anderson County pricing reflects Oak Ridge lab-corridor relocations, Clinton and Norris suburban demand, and Knoxville-metro I-75 and I-40 corridor traffic.',
    },
    tips: [
      'Verify coverage for Clinton, Oak Ridge, and Norris areas before booking.',
      'Knoxville-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and lab-related relocations before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  robertson: {
    marketNotes:
      'Robertson County is a fast-growing suburban county north of Nashville with strong residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,700',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Robertson County pricing reflects Springfield and White House suburban growth, Nashville-metro commuter demand, and I-65 and I-24 corridor traffic.',
    },
    tips: [
      'Verify coverage for Springfield, White House, and Greenbrier areas before booking.',
      'Nashville-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  greene: {
    marketNotes:
      'Greene County is a historic and growing county in East Tennessee with strong residential demand centered on Greeneville.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Greene County pricing reflects Greeneville historic-town demand, Tri-Cities regional crew travel, and I-81 corridor traffic.',
    },
    tips: [
      'Verify coverage for Greeneville and surrounding Greene County areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hamblen: {
    marketNotes:
      'Hamblen County is a key county in the Tri-Cities region with strong industrial and residential demand centered on Morristown.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Hamblen County pricing reflects Morristown industrial corridor demand, regional Tri-Cities crew travel, and I-40 and I-81 corridor traffic.',
    },
    tips: [
      'Verify coverage for Morristown and surrounding Hamblen County areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cumberland: {
    marketNotes:
      'Cumberland County is a growing plateau county with strong retirement and residential demand centered on Crossville.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Cumberland County pricing reflects Crossville retirement-community demand, plateau access considerations, and Upper Cumberland regional crew travel.',
    },
    tips: [
      'Verify coverage for Crossville and surrounding Cumberland County areas before booking.',
      'Plateau access considerations apply — confirm crew arrival windows and route planning.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  loudon: {
    marketNotes:
      'Loudon County is a growing county south of Knoxville with strong residential and lake-area demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Loudon County pricing reflects Lenoir City and Tellico Village lakeside demand, Knoxville-metro suburban growth, and I-75 corridor traffic.',
    },
    tips: [
      'Verify coverage for Loudon and Lenoir City areas before booking.',
      'Knoxville-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value lakeside homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  coffee: {
    marketNotes:
      'Coffee County is a growing county in Middle Tennessee with strong industrial and residential demand centered on Manchester and Tullahoma.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Coffee County pricing reflects Manchester and Tullahoma industrial corridor demand, regional I-24 traffic, and Nashville-metro crew travel.',
    },
    tips: [
      'Verify coverage for Manchester and Tullahoma areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  tipton: {
    marketNotes:
      'Tipton County is a fast-growing suburban county north of Memphis with strong residential demand centered on Covington.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Tipton County pricing reflects Covington suburban growth, Memphis-metro commuter demand, and I-40 corridor traffic.',
    },
    tips: [
      'Verify coverage for Covington and surrounding Tipton County areas before booking.',
      'Memphis-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jefferson: {
    marketNotes:
      'Jefferson County is a growing county in East Tennessee with strong residential and lake-area demand centered on Dandridge.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Jefferson County pricing reflects Dandridge and Douglas Lake waterfront demand, Smokies tourism seasonality, and regional Morristown-Knoxville crew travel.',
    },
    tips: [
      'Verify coverage for Dandridge and Jefferson City areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value lakeside homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hawkins: {
    marketNotes:
      'Hawkins County is a growing county in the Tri-Cities region with strong residential demand centered on Rogersville.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Hawkins County pricing reflects Rogersville historic-town demand, Tri-Cities regional crew travel, and I-81 corridor traffic.',
    },
    tips: [
      'Verify coverage for Rogersville and surrounding Hawkins County areas before booking.',
      'Tri-Cities traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getTennesseeCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return tennesseeCountyResearch[countySlug];
}