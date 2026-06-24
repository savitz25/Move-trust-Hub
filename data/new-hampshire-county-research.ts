import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated New Hampshire county research — complete state (10/10 counties) */
export const newHampshireCountyResearch: Record<string, CuratedCountyResearch> = {
  hillsborough: {
    marketNotes:
      'Hillsborough County is New Hampshire’s most populous county with strong urban, suburban, and residential demand.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,000+',
      avgHourly: '$130–$190/hr for a 2-person crew',
      note: 'Hillsborough County pricing reflects Manchester–Nashua metro demand, I-93 and Everett Turnpike corridor traffic, and competition among full-service agents serving southern New Hampshire.',
    },
    tips: [
      'Verify coverage for Manchester, Nashua, and surrounding towns before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  rockingham: {
    marketNotes:
      'Rockingham County is a large coastal and suburban county with strong residential and tourism demand.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,000+',
      avgHourly: '$130–$190/hr for a 2-person crew',
      note: 'Rockingham County pricing reflects Seacoast coastal demand, I-95 and Route 1 corridor traffic, and competition among regional full-service agents serving Portsmouth and Derry-area communities.',
    },
    tips: [
      'Verify coverage for Portsmouth, Derry, and surrounding towns before booking.',
      'Coastal and regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value waterfront and suburban homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and summer lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  merrimack: {
    marketNotes:
      'Merrimack County is the capital county with strong governmental and residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$125–$180/hr for a 2-person crew',
      note: 'Merrimack County pricing reflects Concord capital-region demand, I-93 corridor traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Concord and surrounding towns before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  strafford: {
    marketNotes:
      'Strafford County is a southeastern New Hampshire county with strong residential and educational demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Strafford County pricing reflects Dover and UNH corridor demand, Spaulding Turnpike traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Dover and surrounding towns before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and semester changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  grafton: {
    marketNotes:
      'Grafton County is a large western New Hampshire county with strong educational and residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Grafton County pricing reflects Upper Valley and Dartmouth–Hanover corridor demand, I-89 traffic, and competition among regional full-service agents serving Lebanon and Hanover.',
    },
    tips: [
      'Verify coverage for Lebanon, Hanover, and surrounding towns before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cheshire: {
    marketNotes:
      'Cheshire County is a southwestern New Hampshire county with residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Cheshire County pricing reflects southwestern New Hampshire demand, Route 9 and Route 12 corridor traffic, and competition among regional full-service agents serving Keene.',
    },
    tips: [
      'Verify coverage for Keene and surrounding towns before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  belknap: {
    marketNotes:
      'Belknap County is a Lakes Region county with strong residential and tourism demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Belknap County pricing reflects Lakes Region seasonal demand, Route 3 and Route 11 corridor traffic, and competition among regional full-service agents serving Laconia.',
    },
    tips: [
      'Verify coverage for Laconia and surrounding towns before booking.',
      'Tourist traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value lakeside homes and multi-floor loading zones.',
      'Book early for peak tourist seasons (June–August) and summer lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  carroll: {
    marketNotes:
      'Carroll County is a scenic northern New Hampshire county with strong tourism and residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Carroll County pricing reflects White Mountains tourism demand, Route 16 corridor traffic, and competition among regional full-service agents serving Ossipee and Conway-area communities.',
    },
    tips: [
      'Verify coverage for Ossipee and surrounding towns before booking.',
      'Tourist traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and seasonal properties.',
      'Book early for peak tourist seasons (June–October) and summer lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  sullivan: {
    marketNotes:
      'Sullivan County is a rural western New Hampshire county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Sullivan County pricing reflects rural western New Hampshire demand, Route 12 corridor traffic, and competition among regional full-service agents serving Newport and Claremont-area communities.',
    },
    tips: [
      'Verify coverage for Newport and surrounding towns before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  coos: {
    marketNotes:
      'Coos County is New Hampshire’s northernmost county with rural and tourism demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Coos County pricing reflects North Country rural demand, Route 2 and Route 3 corridor traffic, and competition among regional full-service agents serving Lancaster and White Mountains gateway communities.',
    },
    tips: [
      'Verify coverage for Lancaster and surrounding towns before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and seasonal properties.',
      'Book early for peak tourist seasons (June–October) and summer lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getNewHampshireCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return newHampshireCountyResearch[countySlug];
}