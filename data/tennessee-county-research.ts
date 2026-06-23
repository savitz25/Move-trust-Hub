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
};

export function getTennesseeCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return tennesseeCountyResearch[countySlug];
}