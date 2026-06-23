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
};

export function getTennesseeCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return tennesseeCountyResearch[countySlug];
}