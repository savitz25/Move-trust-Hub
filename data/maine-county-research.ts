import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Maine county research — complete state (16/16 counties) */
export const maineCountyResearch: Record<string, CuratedCountyResearch> = {
  cumberland: {
    marketNotes:
      'Cumberland County is Maine’s most populous county with strong urban, suburban, and coastal residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$125–$180/hr for a 2-person crew',
      note: 'Cumberland County pricing reflects Portland metro demand, I-295 corridor traffic, and competition among full-service agents serving southern Maine coastal communities.',
    },
    tips: [
      'Verify coverage for Portland, South Portland, and surrounding towns before booking.',
      'Coastal and regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value coastal homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  york: {
    marketNotes:
      'York County is a southern Maine county with strong suburban and coastal residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'York County pricing reflects Seacoast demand, I-95 and Route 1 corridor traffic, and competition among regional full-service agents serving Biddeford and Saco-area communities.',
    },
    tips: [
      'Verify coverage for Biddeford, Saco, and surrounding towns before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value coastal homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and summer lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  penobscot: {
    marketNotes:
      'Penobscot County is a key central Maine county with strong residential and commercial demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Penobscot County pricing reflects Bangor metro demand, I-95 corridor traffic, and competition among regional full-service agents serving central Maine.',
    },
    tips: [
      'Verify coverage for Bangor and surrounding towns before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  kennebec: {
    marketNotes:
      'Kennebec County is the capital county with strong governmental and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Kennebec County pricing reflects Augusta capital-region demand, I-95 corridor traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Augusta and surrounding towns before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  androscoggin: {
    marketNotes:
      'Androscoggin County is a central Maine county with strong residential and industrial demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Androscoggin County pricing reflects Lewiston–Auburn twin-city demand, Route 4 corridor traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Lewiston and Auburn before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  aroostook: {
    marketNotes:
      'Aroostook County is Maine’s largest and northernmost county with rural residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Aroostook County pricing reflects northern Maine rural demand, Route 1 and Route 2 corridor traffic, and competition among regional full-service agents serving Houlton and Presque Isle.',
    },
    tips: [
      'Verify coverage for Houlton, Presque Isle, and surrounding towns before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  oxford: {
    marketNotes:
      'Oxford County is a rural western Maine county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Oxford County pricing reflects western Maine demand, Route 26 and Route 2 corridor traffic, and competition among regional full-service agents serving South Paris and Bethel-area communities.',
    },
    tips: [
      'Verify coverage for South Paris and surrounding towns before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hancock: {
    marketNotes:
      'Hancock County is a coastal county with strong tourism and residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Hancock County pricing reflects Downeast coastal and Acadia gateway demand, Route 1 corridor traffic, and competition among regional full-service agents serving Ellsworth.',
    },
    tips: [
      'Verify coverage for Ellsworth and surrounding towns before booking.',
      'Tourist traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value coastal homes and seasonal properties.',
      'Book early for peak tourist seasons (June–October) and summer lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  somerset: {
    marketNotes:
      'Somerset County is a rural central Maine county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Somerset County pricing reflects rural central Maine demand, Route 201 corridor traffic, and competition among regional full-service agents serving Skowhegan.',
    },
    tips: [
      'Verify coverage for Skowhegan and surrounding towns before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  knox: {
    marketNotes:
      'Knox County is a coastal county with strong tourism and residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Knox County pricing reflects Midcoast tourism demand, Route 1 corridor traffic, and competition among regional full-service agents serving Rockland and Camden-area communities.',
    },
    tips: [
      'Verify coverage for Rockland and surrounding towns before booking.',
      'Tourist traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value coastal homes and seasonal properties.',
      'Book early for peak tourist seasons (June–October) and summer lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  waldo: {
    marketNotes:
      'Waldo County is a coastal county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Waldo County pricing reflects Penobscot Bay coastal demand, Route 1 corridor traffic, and competition among regional full-service agents serving Belfast.',
    },
    tips: [
      'Verify coverage for Belfast and surrounding towns before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and coastal properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  sagadahoc: {
    marketNotes:
      'Sagadahoc County is a coastal county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Sagadahoc County pricing reflects Bath shipyard coast demand, Route 1 corridor traffic, and competition among regional full-service agents serving Brunswick-area communities.',
    },
    tips: [
      'Verify coverage for Bath and surrounding towns before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and coastal properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lincoln: {
    marketNotes:
      'Lincoln County is a coastal county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Lincoln County pricing reflects southern Midcoast demand, Route 1 corridor traffic, and competition among regional full-service agents serving Wiscasset and Boothbay-area communities.',
    },
    tips: [
      'Verify coverage for Wiscasset and surrounding towns before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and coastal properties.',
      'Book early for peak seasons (May–September) and summer lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  washington: {
    marketNotes:
      'Washington County is Maine’s easternmost county with rural residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Washington County pricing reflects Downeast rural demand, Route 1 corridor traffic, and competition among regional full-service agents serving Machias and Calais-area communities.',
    },
    tips: [
      'Verify coverage for Machias and surrounding towns before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  franklin: {
    marketNotes:
      'Franklin County is a rural western Maine county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Franklin County pricing reflects western Maine demand, Route 2 and Route 4 corridor traffic, and competition among regional full-service agents serving Farmington and Rangeley-area communities.',
    },
    tips: [
      'Verify coverage for Farmington and surrounding towns before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  piscataquis: {
    marketNotes:
      'Piscataquis County is a rural central Maine county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Piscataquis County pricing reflects Moosehead Region rural demand, Route 15 corridor traffic, and competition among regional full-service agents serving Dover-Foxcroft and Greenville-area communities.',
    },
    tips: [
      'Verify coverage for Dover-Foxcroft and surrounding towns before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and seasonal properties.',
      'Book early for peak tourist seasons (June–October) and summer lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getMaineCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return maineCountyResearch[countySlug];
}