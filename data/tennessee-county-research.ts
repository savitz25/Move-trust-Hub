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
};

export function getTennesseeCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return tennesseeCountyResearch[countySlug];
}