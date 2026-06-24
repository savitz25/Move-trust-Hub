import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Pennsylvania county research — batch 1 */
export const pennsylvaniaCountyResearch: Record<string, CuratedCountyResearch> = {
  philadelphia: {
    marketNotes:
      'Philadelphia County is coterminous with the City of Philadelphia, with dense urban, historic, and residential demand across Center City, University City, and neighborhood corridors throughout the metro.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Philadelphia pricing reflects dense urban rowhome demand, parking permit requirements, historic-property handling, and competition among city-focused full-service agents.',
    },
    tips: [
      'Verify coverage for all Philadelphia neighborhoods before booking.',
      'Heavy urban traffic, narrow streets, and parking restrictions significantly impact scheduling — confirm permits and loading zones.',
      'Historic rowhomes and walk-up buildings may require tight stairwell coordination — confirm crew equipment fit.',
      'Confirm insurance for high-value urban and historic properties, condos, and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  allegheny: {
    marketNotes:
      'Allegheny County is coterminous with the Pittsburgh metropolitan core, with strong urban, suburban, and industrial demand across Pittsburgh, Mount Lebanon, and the three-rivers corridor.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,500+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Allegheny County pricing reflects Pittsburgh urban hillside access, bridge crossings, university corridor volume, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Pittsburgh and surrounding areas before booking.',
      'Urban traffic and bridge crossings on the Fort Pitt and Liberty tunnels significantly impacts scheduling — confirm crew arrival windows.',
      'Hillside neighborhoods and tight street parking may require shuttle truck coordination — confirm building access.',
      'Confirm insurance for high-value urban and suburban homes, townhome communities, and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  montgomery: {
    marketNotes:
      'Montgomery County is a large and affluent suburban county north of Philadelphia with strong residential demand across Norristown, King of Prussia, and the Main Line corridor.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$125–$185/hr for a 2-person crew',
      note: 'Montgomery County pricing reflects affluent Main Line demand, King of Prussia corporate corridor volume, I-76 and Route 202 traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Norristown, King of Prussia, and surrounding areas before booking.',
      'Heavy Philadelphia metro traffic on I-76, Route 202, and the Schuylkill Expressway significantly impacts scheduling — confirm crew arrival windows.',
      'Main Line townhome and estate communities may require HOA or loading-zone coordination — confirm building access.',
      'Confirm insurance for high-value suburban homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getPennsylvaniaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return pennsylvaniaCountyResearch[countySlug];
}