import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Pennsylvania county research — batches 1–2 */
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
  bucks: {
    marketNotes:
      'Bucks County is a large and affluent suburban county northeast of Philadelphia with strong residential demand across Doylestown, Levittown, and the Delaware River corridor.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Bucks County pricing reflects affluent suburban demand, I-95 and Route 1 corridor traffic, and competition among Philadelphia-metro full-service agents.',
    },
    tips: [
      'Verify coverage for Doylestown, Levittown, and surrounding areas before booking.',
      'Heavy Philadelphia metro traffic on I-95 and Route 1 significantly impacts scheduling — confirm crew arrival windows.',
      'Delaware River waterfront and historic townhome communities may require loading-zone coordination — confirm building access.',
      'Confirm insurance for high-value suburban homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  delaware: {
    marketNotes:
      'Delaware County is a large suburban county southwest of Philadelphia with strong residential demand across Media, Chester, and the I-95 corridor.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Delaware County pricing reflects Philadelphia-metro suburban demand, I-95 and Blue Route traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Media, Chester, and surrounding areas before booking.',
      'Heavy Philadelphia metro traffic on I-95 and the Blue Route significantly impacts scheduling — confirm crew arrival windows.',
      'Rowhome and townhome communities near the city line may require tight stairwell coordination — confirm crew equipment fit.',
      'Confirm insurance for high-value suburban homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lancaster: {
    marketNotes:
      'Lancaster County is a large and growing county with strong agricultural, Amish, and residential demand across Lancaster City and surrounding townships.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Lancaster County pricing reflects growing residential demand, Route 30 corridor traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Lancaster and surrounding areas before booking.',
      'Regional traffic on Route 30 and US-222 impacts scheduling — confirm crew arrival windows.',
      'Rural and farmhouse properties may require longer drive times and equipment coordination — confirm access roads.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  chester: {
    marketNotes:
      'Chester County is an affluent suburban county west of Philadelphia with strong residential demand across West Chester, Exton, and the Main Line western corridor.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$125–$185/hr for a 2-person crew',
      note: 'Chester County pricing reflects affluent Main Line demand, Route 202 and US-30 corridor traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for West Chester and surrounding areas before booking.',
      'Philadelphia metro traffic on Route 202 and US-30 impacts scheduling — confirm crew arrival windows.',
      'Estate and townhome communities may require HOA or loading-zone coordination — confirm building access.',
      'Confirm insurance for high-value suburban homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  york: {
    marketNotes:
      'York County is a large and growing county with strong residential and industrial demand across York City and the Susquehanna River corridor.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'York County pricing reflects growing residential demand, I-83 corridor traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for York and surrounding areas before booking.',
      'Regional traffic on I-83 and US-30 impacts scheduling — confirm crew arrival windows.',
      'Industrial and suburban communities may require longer drive times — confirm crew coverage radius.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  berks: {
    marketNotes:
      'Berks County is a large county with strong residential and industrial demand centered around Reading and the I-78 corridor.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Berks County pricing reflects Reading metro demand, I-78 and Route 422 corridor traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Reading and surrounding areas before booking.',
      'Regional traffic on I-78 and Route 422 impacts scheduling — confirm crew arrival windows.',
      'Industrial and suburban communities may require longer drive times — confirm crew coverage radius.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lehigh: {
    marketNotes:
      'Lehigh County is a key county in the Lehigh Valley with strong residential and industrial demand across Allentown, Bethlehem, and the I-78 corridor.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Lehigh County pricing reflects Lehigh Valley metro demand, I-78 and Route 22 corridor traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Allentown and surrounding areas before booking.',
      'Regional traffic on I-78 and Route 22 impacts scheduling — confirm crew arrival windows.',
      'Industrial and suburban communities may require longer drive times — confirm crew coverage radius.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  westmoreland: {
    marketNotes:
      'Westmoreland County is a large suburban county east of Pittsburgh with strong residential demand across Greensburg, Murrysville, and the Laurel Highlands corridor.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Westmoreland County pricing reflects Pittsburgh-metro suburban demand, Route 30 and Turnpike corridor traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Greensburg and surrounding areas before booking.',
      'Pittsburgh-area traffic on Route 30 and the Turnpike impacts scheduling — confirm crew arrival windows.',
      'Hillside and suburban communities may require shuttle truck coordination — confirm building access.',
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