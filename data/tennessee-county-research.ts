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
  dickson: {
    marketNotes:
      'Dickson County is a growing county west of Nashville with strong residential and industrial demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Dickson County pricing reflects west-Nashville suburban growth, I-40 corridor traffic, and Clarksville-Nashville metro crew travel.',
    },
    tips: [
      'Verify coverage for Dickson and surrounding areas before booking.',
      'Nashville-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mcminn: {
    marketNotes:
      'McMinn County is a growing county in Southeast Tennessee with strong industrial and residential demand centered on Athens.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'McMinn County pricing reflects Athens industrial corridor demand, Cleveland-Chattanooga regional crew travel, and I-75 corridor traffic.',
    },
    tips: [
      'Verify coverage for Athens and surrounding McMinn County areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  roane: {
    marketNotes:
      'Roane County is a growing county west of Knoxville with strong residential and lake-area demand centered on Kingston and Harriman.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Roane County pricing reflects Watts Bar Lake waterfront demand, Oak Ridge corridor access, and Knoxville-metro I-40 and I-75 traffic.',
    },
    tips: [
      'Verify coverage for Kingston and Harriman areas before booking.',
      'Knoxville-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value lakeside homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  carter: {
    marketNotes:
      'Carter County is a growing county in the Tri-Cities region with strong residential demand centered on Elizabethton.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Carter County pricing reflects Elizabethton suburban demand, Johnson City-Kingsport regional crew travel, and Tri-Cities corridor traffic.',
    },
    tips: [
      'Verify coverage for Elizabethton and surrounding Carter County areas before booking.',
      'Tri-Cities traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  bedford: {
    marketNotes:
      'Bedford County is a growing county in Middle Tennessee with strong residential and industrial demand centered on Shelbyville.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Bedford County pricing reflects Shelbyville industrial and equestrian-community demand, Nashville-metro crew travel, and I-24 corridor traffic.',
    },
    tips: [
      'Verify coverage for Shelbyville and surrounding Bedford County areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  gibson: {
    marketNotes:
      'Gibson County is a rural West Tennessee county with agricultural and residential demand centered on Trenton, Humboldt, and Milan.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Gibson County pricing reflects rural West Tennessee access, Jackson-metro crew travel, and agricultural property move considerations.',
    },
    tips: [
      'Verify coverage for Trenton, Humboldt, and Milan areas before booking.',
      'Rural access challenges are common — confirm crew arrival windows and route planning.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  monroe: {
    marketNotes:
      'Monroe County is a growing county in Southeast Tennessee with residential and industrial demand centered on Madisonville and Sweetwater.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Monroe County pricing reflects Sweetwater and Tellico Plains access, Knoxville-Chattanooga regional crew travel, and I-75 corridor traffic.',
    },
    tips: [
      'Verify coverage for Madisonville and Sweetwater areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lawrence: {
    marketNotes:
      'Lawrence County is a growing county in Middle Tennessee with strong residential demand centered on Lawrenceburg.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Lawrence County pricing reflects Lawrenceburg suburban demand, south-Nashville regional crew travel, and rural Middle Tennessee access.',
    },
    tips: [
      'Verify coverage for Lawrenceburg and surrounding Lawrence County areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  franklin: {
    marketNotes:
      'Franklin County is a growing county in southern Middle Tennessee with strong residential demand centered on Winchester.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Franklin County pricing reflects Winchester and Sewanee-area demand, Tullahoma-Manchester regional crew travel, and I-24 corridor traffic.',
    },
    tips: [
      'Verify coverage for Winchester and surrounding Franklin County areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  fayette: {
    marketNotes:
      'Fayette County is a growing suburban and rural county east of Memphis with strong residential demand centered on Somerville.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Fayette County pricing reflects Somerville suburban growth, Memphis-metro crew travel, and I-40 corridor traffic.',
    },
    tips: [
      'Verify coverage for Somerville and surrounding Fayette County areas before booking.',
      'Memphis-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  warren: {
    marketNotes:
      'Warren County is a growing county in Middle Tennessee with strong industrial and residential demand centered on McMinnville.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Warren County pricing reflects McMinnville industrial corridor demand, Upper Cumberland regional crew travel, and I-24 corridor traffic.',
    },
    tips: [
      'Verify coverage for McMinnville and surrounding Warren County areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cheatham: {
    marketNotes:
      'Cheatham County is a growing suburban county northwest of Nashville with strong residential demand centered on Ashland City.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Cheatham County pricing reflects Ashland City suburban growth, Nashville-metro crew travel, and Cumberland River corridor access.',
    },
    tips: [
      'Verify coverage for Ashland City and surrounding Cheatham County areas before booking.',
      'Nashville-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  campbell: {
    marketNotes:
      'Campbell County is a growing county in East Tennessee with strong residential and industrial demand centered on Jacksboro and La Follette.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Campbell County pricing reflects La Follette industrial demand, Knoxville-metro regional crew travel, and mountain corridor access.',
    },
    tips: [
      'Verify coverage for Jacksboro, La Follette, and surrounding Campbell County areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  marshall: {
    marketNotes:
      'Marshall County is a growing county in Middle Tennessee with strong residential demand centered on Lewisburg.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Marshall County pricing reflects Lewisburg suburban demand, Nashville-Murfreesboro regional crew travel, and I-65 corridor traffic.',
    },
    tips: [
      'Verify coverage for Lewisburg and surrounding Marshall County areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cocke: {
    marketNotes:
      'Cocke County is a scenic mountain county with strong tourism and residential demand centered on Newport.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Cocke County pricing reflects Newport mountain-community demand, Smokies tourism seasonality, and regional Morristown-Knoxville crew travel.',
    },
    tips: [
      'Verify coverage for Newport and surrounding mountain areas before booking.',
      'Mountain roads and weather conditions require specialized experience — confirm crew arrival windows.',
      'Confirm insurance for high-value mountain homes before booking.',
      'Book early for peak tourist seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lincoln: {
    marketNotes:
      'Lincoln County is a growing county in southern Middle Tennessee with strong residential demand centered on Fayetteville.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Lincoln County pricing reflects Fayetteville suburban demand, Shelbyville-Murfreesboro regional crew travel, and rural Middle Tennessee access.',
    },
    tips: [
      'Verify coverage for Fayetteville and surrounding Lincoln County areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  dyer: {
    marketNotes:
      'Dyer County is a key West Tennessee county with strong industrial and residential demand centered on Dyersburg.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Dyer County pricing reflects Dyersburg industrial corridor demand, Jackson-metro regional crew travel, and I-155 corridor traffic.',
    },
    tips: [
      'Verify coverage for Dyersburg and surrounding Dyer County areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  rhea: {
    marketNotes:
      'Rhea County is a growing county in Southeast Tennessee with strong residential demand centered on Dayton.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Rhea County pricing reflects Dayton suburban demand, Cleveland-Chattanooga regional crew travel, and I-75 corridor traffic.',
    },
    tips: [
      'Verify coverage for Dayton and surrounding Rhea County areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  claiborne: {
    marketNotes:
      'Claiborne County is a mountain county in East Tennessee with strong residential demand centered on Tazewell.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Claiborne County pricing reflects Tazewell mountain-community demand, Knoxville-Tri-Cities regional crew travel, and rural East Tennessee access.',
    },
    tips: [
      'Verify coverage for Tazewell and surrounding Claiborne County areas before booking.',
      'Mountain roads and weather conditions require specialized experience — confirm crew arrival windows.',
      'Confirm insurance for high-value mountain homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  weakley: {
    marketNotes:
      'Weakley County is a rural West Tennessee county with strong educational (University of Tennessee at Martin) and residential demand centered on Dresden and Martin.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Weakley County pricing reflects UT Martin student turnover, rural West Tennessee access, and Jackson-metro regional crew travel.',
    },
    tips: [
      'Verify coverage for Martin and Dresden areas before booking.',
      'Rural access challenges are common — confirm crew arrival windows and route planning.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  henry: {
    marketNotes:
      'Henry County is a growing county in Northwest Tennessee with strong residential and lake-area demand centered on Paris and Kentucky Lake.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Henry County pricing reflects Paris and Kentucky Lake waterfront demand, rural Northwest Tennessee access, and Jackson-Dyersburg regional crew travel.',
    },
    tips: [
      'Verify coverage for Paris and surrounding Henry County areas before booking.',
      'Lake-area access considerations apply — confirm crew arrival windows and route planning.',
      'Confirm insurance for high-value lakeside homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  giles: {
    marketNotes:
      'Giles County is a growing county in southern Middle Tennessee with strong residential demand centered on Pulaski.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Giles County pricing reflects Pulaski suburban demand, Columbia-Murfreesboro regional crew travel, and rural Middle Tennessee access.',
    },
    tips: [
      'Verify coverage for Pulaski and surrounding Giles County areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  white: {
    marketNotes:
      'White County is a growing county in Middle Tennessee with strong residential and plateau demand centered on Sparta.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'White County pricing reflects Sparta plateau-community demand, Upper Cumberland regional crew travel, and rural access considerations.',
    },
    tips: [
      'Verify coverage for Sparta and surrounding White County areas before booking.',
      'Plateau access considerations apply — confirm crew arrival windows and route planning.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  obion: {
    marketNotes:
      'Obion County is a key Northwest Tennessee county with strong industrial and residential demand centered on Union City.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Obion County pricing reflects Union City industrial corridor demand, rural Northwest Tennessee access, and Jackson-Dyersburg regional crew travel.',
    },
    tips: [
      'Verify coverage for Union City and surrounding Obion County areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  marion: {
    marketNotes:
      'Marion County is a growing county in Southeast Tennessee with strong residential demand centered on Jasper and South Pittsburg.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Marion County pricing reflects Jasper and South Pittsburg demand, Chattanooga-Cleveland regional crew travel, and I-24 corridor traffic.',
    },
    tips: [
      'Verify coverage for Jasper and South Pittsburg areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  carroll: {
    marketNotes:
      'Carroll County is a rural West Tennessee county with strong agricultural and residential demand centered on Huntingdon.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Carroll County pricing reflects rural West Tennessee access, agricultural property move considerations, and Jackson-metro regional crew travel.',
    },
    tips: [
      'Verify coverage for Huntingdon and surrounding Carroll County areas before booking.',
      'Rural access challenges are common — confirm crew arrival windows and route planning.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  henderson: {
    marketNotes:
      'Henderson County is a growing county in West Tennessee with strong residential demand centered on Lexington.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Henderson County pricing reflects Lexington suburban demand, rural West Tennessee access, and Jackson-Paris regional crew travel.',
    },
    tips: [
      'Verify coverage for Lexington and surrounding Henderson County areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hardin: {
    marketNotes:
      'Hardin County is a growing county in West Tennessee with strong residential and tourism demand centered on Savannah along the Tennessee River.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Hardin County pricing reflects Savannah river-community demand, Pickwick Lake access, and Jackson-metro regional crew travel.',
    },
    tips: [
      'Verify coverage for Savannah and surrounding Hardin County areas before booking.',
      'River access considerations apply — confirm crew arrival windows and route planning.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  macon: {
    marketNotes:
      'Macon County is a growing county in northern Middle Tennessee with strong residential demand centered on Lafayette.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Macon County pricing reflects Lafayette suburban demand, Clarksville-Springfield regional crew travel, and rural northern Middle Tennessee access.',
    },
    tips: [
      'Verify coverage for Lafayette and surrounding Macon County areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hickman: {
    marketNotes:
      'Hickman County is a rural county in Middle Tennessee with strong residential demand centered on Centerville.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Hickman County pricing reflects Centerville rural-community demand, Nashville-Columbia regional crew travel, and rural access considerations.',
    },
    tips: [
      'Verify coverage for Centerville and surrounding Hickman County areas before booking.',
      'Rural access challenges are common — confirm crew arrival windows and route planning.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  grainger: {
    marketNotes:
      'Grainger County is a rural mountain county in East Tennessee with strong residential demand centered on Rutledge.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Grainger County pricing reflects Rutledge mountain-community demand, Morristown-Knoxville regional crew travel, and rural East Tennessee access.',
    },
    tips: [
      'Verify coverage for Rutledge and surrounding Grainger County areas before booking.',
      'Mountain roads and weather conditions require specialized experience — confirm crew arrival windows.',
      'Confirm insurance for high-value mountain homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mcnairy: {
    marketNotes:
      'McNairy County is a rural West Tennessee county with strong residential demand centered on Selmer.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'McNairy County pricing reflects rural West Tennessee access, agricultural property considerations, and Jackson-metro regional crew travel.',
    },
    tips: [
      'Verify coverage for Selmer and surrounding McNairy County areas before booking.',
      'Rural access challenges are common — confirm crew arrival windows and route planning.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hardeman: {
    marketNotes:
      'Hardeman County is a rural West Tennessee county with agricultural and residential demand centered on Bolivar.',
    costs: {
      studioRange: '$550–$1,150',
      familyRange: '$1,900–$4,400',
      avgHourly: '$95–$150/hr for a 2-person crew',
      note: 'Hardeman County pricing reflects Bolivar rural-community demand, limited local storage options, and Memphis-Jackson regional crew travel.',
    },
    tips: [
      'Rural access challenges are common — confirm crew arrival windows and route planning.',
      'Verify explicit regional service to Bolivar before booking.',
      'Storage is very limited — confirm insurance for high-value homes before booking.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      'Confirm credentials for rural moves before booking.',
    ],
  },
  lauderdale: {
    marketNotes:
      'Lauderdale County is a rural West Tennessee county with agricultural and residential demand centered on Ripley.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Lauderdale County pricing reflects Ripley rural-community demand, limited local storage options, and Memphis-Dyersburg regional crew travel.',
    },
    tips: [
      'Rural access challenges are common — confirm crew arrival windows and route planning.',
      'Verify explicit regional service to Ripley before booking.',
      'Storage is very limited — confirm insurance for high-value homes before booking.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      'Confirm credentials for rural moves before booking.',
    ],
  },
  overton: {
    marketNotes:
      'Overton County is a rural Upper Cumberland county with strong residential demand centered on Livingston.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Overton County pricing reflects Livingston rural-community demand, Upper Cumberland access, and Cookeville regional crew travel.',
    },
    tips: [
      'Rural access challenges are common — confirm crew arrival windows and route planning.',
      'Verify explicit regional service to Livingston before booking.',
      'Storage is very limited — confirm insurance for high-value homes before booking.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      'Confirm credentials for rural moves before booking.',
    ],
  },
  scott: {
    marketNotes:
      'Scott County is a rural mountain county in East Tennessee with strong residential demand centered on Huntsville and Oneida.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Scott County pricing reflects Huntsville and Oneida mountain-community demand, Knoxville-metro regional crew travel, and rural East Tennessee access.',
    },
    tips: [
      'Verify coverage for Huntsville and Oneida areas before booking.',
      'Mountain roads and weather conditions require specialized experience — confirm crew arrival windows.',
      'Confirm insurance for high-value mountain homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  morgan: {
    marketNotes:
      'Morgan County is a rural mountain county in East Tennessee with residential demand centered on Wartburg.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Morgan County pricing reflects Wartburg mountain-community demand, Knoxville-Oak Ridge regional crew travel, and rural East Tennessee access.',
    },
    tips: [
      'Verify coverage for Wartburg and surrounding Morgan County areas before booking.',
      'Mountain roads and weather conditions require specialized experience — confirm crew arrival windows.',
      'Confirm insurance for high-value mountain homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  dekalb: {
    marketNotes:
      'DeKalb County is a growing county in Middle Tennessee with strong residential demand centered on Smithville.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'DeKalb County pricing reflects Smithville suburban demand, Nashville-Lebanon regional crew travel, and rural Middle Tennessee access.',
    },
    tips: [
      'Verify coverage for Smithville and surrounding DeKalb County areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  union: {
    marketNotes:
      'Union County is a growing county in East Tennessee with strong residential demand centered on Maynardville.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Union County pricing reflects Maynardville suburban demand, Knoxville-metro regional crew travel, and rural East Tennessee access.',
    },
    tips: [
      'Verify coverage for Maynardville and surrounding Union County areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  smith: {
    marketNotes:
      'Smith County is a rural county in Middle Tennessee with strong residential demand centered on Carthage.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Smith County pricing reflects Carthage rural-community demand, Nashville-Lebanon regional crew travel, and Cumberland River corridor access.',
    },
    tips: [
      'Verify coverage for Carthage and surrounding Smith County areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  fentress: {
    marketNotes:
      'Fentress County is a rural mountain county with scenic residential demand centered on Jamestown.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Fentress County pricing reflects Jamestown mountain-community demand, Upper Cumberland regional crew travel, and limited local mover availability.',
    },
    tips: [
      'Verify coverage for Jamestown and surrounding Fentress County areas before booking.',
      'Mountain roads and weather conditions require specialized experience — confirm crew arrival windows.',
      'Confirm insurance for high-value mountain homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  humphreys: {
    marketNotes:
      'Humphreys County is a growing county in Middle Tennessee with strong residential demand centered on Waverly.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Humphreys County pricing reflects Waverly suburban demand, Clarksville-Nashville regional crew travel, and Tennessee River corridor access.',
    },
    tips: [
      'Verify coverage for Waverly and surrounding Humphreys County areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  johnson: {
    marketNotes:
      'Johnson County is a remote mountain county in Northeast Tennessee with scenic residential demand centered on Mountain City.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Johnson County pricing reflects Mountain City remote mountain-community demand, Tri-Cities regional crew travel, and limited local mover availability.',
    },
    tips: [
      'Verify coverage for Mountain City and surrounding Johnson County areas before booking.',
      'Mountain roads and weather conditions require specialized experience — confirm crew arrival windows.',
      'Confirm insurance for high-value mountain homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  polk: {
    marketNotes:
      'Polk County is a scenic mountain county in Southeast Tennessee with strong residential demand centered on Benton.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Polk County pricing reflects Benton mountain-community demand, Chattanooga-Cleveland regional crew travel, and Ocoee River corridor access.',
    },
    tips: [
      'Verify coverage for Benton and surrounding Polk County areas before booking.',
      'Mountain roads and weather conditions require specialized experience — confirm crew arrival windows.',
      'Confirm insurance for high-value mountain homes before booking.',
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