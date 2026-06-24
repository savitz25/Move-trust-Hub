import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Alaska borough research — major population centers (5/5) */
export const alaskaCountyResearch: Record<string, CuratedCountyResearch> = {
  anchorage: {
    marketNotes:
      'Anchorage Municipality is Alaska’s largest population center with strong urban, suburban, and military residential demand.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$130–$195/hr for a 2-person crew',
      note: 'Anchorage Municipality pricing reflects Southcentral Alaska metro demand, Glenn Highway and Seward Highway corridor traffic, and competition among full-service agents serving urban and suburban communities.',
    },
    tips: [
      'Verify coverage for Anchorage and surrounding areas before booking.',
      'Seasonal weather and traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and military PCS windows.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'matanuska-susitna': {
    marketNotes:
      'Matanuska-Susitna Borough is a rapidly growing area north of Anchorage with strong suburban and rural residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Mat-Su Borough pricing reflects valley suburban growth, Parks Highway corridor traffic, and competition among regional full-service agents serving Palmer and Wasilla-area communities.',
    },
    tips: [
      'Verify coverage for Palmer, Wasilla, and surrounding communities before booking.',
      'Seasonal weather and traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'fairbanks-north-star': {
    marketNotes:
      'Fairbanks North Star Borough is Alaska’s second-largest population center with strong military and residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Fairbanks North Star Borough pricing reflects interior Alaska demand, extreme seasonal conditions, and competition among regional full-service agents serving Eielson and Fort Wainwright corridor communities.',
    },
    tips: [
      'Verify coverage for Fairbanks and surrounding areas before booking.',
      'Extreme seasonal weather impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and cold-climate relocations.',
      'Book early for peak seasons (May–September) and military PCS windows.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'kenai-peninsula': {
    marketNotes:
      'Kenai Peninsula Borough is a large southern borough with strong coastal, tourism, and residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Kenai Peninsula Borough pricing reflects coastal Southcentral demand, Sterling Highway corridor traffic, and competition among regional full-service agents serving Soldotna and Kenai-area communities.',
    },
    tips: [
      'Verify coverage for Soldotna, Kenai, and surrounding communities before booking.',
      'Seasonal weather and tourist traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value coastal homes and seasonal properties.',
      'Book early for peak tourist seasons (June–August) and summer lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  juneau: {
    marketNotes:
      'Juneau City and Borough is Alaska’s capital with strong governmental and coastal residential demand.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$130–$195/hr for a 2-person crew',
      note: 'Juneau Borough pricing reflects capital-region and coastal Southeast Alaska demand, limited road access, ferry logistics, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Juneau and surrounding areas before booking.',
      'Limited road access and ferry traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value coastal homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and legislative session changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getAlaskaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return alaskaCountyResearch[countySlug];
}