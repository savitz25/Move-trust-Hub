import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Virginia county research — batches 1–2 large markets */
export const virginiaCountyResearch: Record<string, CuratedCountyResearch> = {
  fairfax: {
    marketNotes:
      'Fairfax County is one of Virginia’s largest and wealthiest counties with strong suburban, corporate, and residential demand across Northern Virginia and the Washington DC metro.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$130–$200/hr for a 2-person crew',
      note: 'Fairfax County pricing reflects Northern Virginia suburban demand, I-66/I-495 corridor traffic, high-value home relocations, and competition among full-service DC-metro agents.',
    },
    tips: [
      'Verify coverage for Fairfax, Vienna, Reston, and surrounding areas before booking.',
      'Heavy urban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and townhome communities.',
      'Book early for peak seasons (May–September), federal PCS turnover, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'prince-william': {
    marketNotes:
      'Prince William County is a large and rapidly growing suburban county with strong residential and commercial demand across Manassas, Woodbridge, and the Northern Virginia corridor.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$130–$200/hr for a 2-person crew',
      note: 'Prince William County pricing reflects Northern Virginia suburban growth, I-95 corridor traffic, Manassas and Woodbridge relocation volume, and competition among full-service DC-metro agents.',
    },
    tips: [
      'Verify coverage for Manassas, Woodbridge, and surrounding areas before booking.',
      'Heavy Northern Virginia traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and townhome communities.',
      'Book early for peak seasons (May–September), federal PCS turnover, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  loudoun: {
    marketNotes:
      'Loudoun County is one of the fastest-growing and most affluent counties in the United States with strong suburban residential demand across Leesburg, Ashburn, and Sterling.',
    costs: {
      studioRange: '$950–$2,000',
      familyRange: '$3,800–$9,000+',
      avgHourly: '$135–$210/hr for a 2-person crew',
      note: 'Loudoun County pricing reflects Dulles corridor affluence, data-center and tech-sector relocation volume, Route 7 and Route 28 traffic, and competition among premium full-service NOVA agents.',
    },
    tips: [
      'Verify coverage for Leesburg, Ashburn, Sterling, and surrounding areas before booking.',
      'Heavy Northern Virginia traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and new-construction communities.',
      'Book early for peak seasons (May–September), corporate relocations, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'virginia-beach': {
    marketNotes:
      'Virginia Beach is an independent city and one of the largest in Virginia with strong residential, military, and tourism-related demand across Hampton Roads.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,500+',
      avgHourly: '$120–$185/hr for a 2-person crew',
      note: 'Virginia Beach pricing reflects Hampton Roads coastal demand, military PCS turnover, summer tourist-season volume, and competition among full-service Tidewater agents.',
    },
    tips: [
      'Verify coverage for Virginia Beach and surrounding Hampton Roads areas before booking.',
      'Coastal traffic and tourist seasons impact scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value coastal homes and oceanfront properties.',
      'Book early for peak tourist seasons (June–August), military PCS windows, and summer relocations.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  chesterfield: {
    marketNotes:
      'Chesterfield County is a large suburban county south of Richmond with strong residential and commercial demand across Midlothian and the Jefferson Davis corridor.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Chesterfield County pricing reflects Richmond-metro suburban growth, I-95 and Route 288 corridor traffic, and competition among full-service Central Virginia agents.',
    },
    tips: [
      'Verify coverage for Chesterfield, Midlothian, and surrounding areas before booking.',
      'Richmond-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and townhome communities.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getVirginiaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return virginiaCountyResearch[countySlug];
}