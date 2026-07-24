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
      'Anchorage Municipality is Alaska’s largest population center and primary logistics hub — with strong urban, suburban, military (JBER), oil & gas industry, and Lower 48 long-distance relocation demand.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$130–$195/hr for a 2-person crew',
      note: 'Anchorage Municipality pricing reflects Southcentral Alaska metro demand, Glenn Highway and Seward Highway corridor traffic, and competition among full-service agents serving urban and suburban communities.',
    },
    tips: [
      'Treat Anchorage as municipal Southcentral core (hillside, Midtown, JBER-adjacent) — not Fairbanks Interior or Juneau ferry defaults.',
      'Price Glenn Highway · Seward Highway · Minnesota Dr portal time honestly for city cross-zone pairs.',
      'Winter freeze-up and ice reshape outdoor labor — prefer early starts and cold-weather contingency.',
      'Outside/Lower 48 legs need FMCSA; pure in-state jobs need written estimates, Alaska business license details, and insurance certificates.',
      'Military PCS near JBER may need base access coordination — confirm credentials and report dates early.',
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
      'Treat Mat-Su as Wasilla/Palmer valley growth toward Anchorage — not Anchorage city multi-unit defaults.',
      'Price Parks Highway · Glenn Highway links portal time honestly for valley ↔ Anchorage pairs.',
      'Long rural driveways and gravel approaches dominate estimate risk more than packing skill alone.',
      'Outside legs need FMCSA; pure in-state jobs need written estimates, business license details, and insurance.',
      'Winter ice and long empty miles to Anchorage rewrite local hours at peak.',
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
      'Treat Fairbanks North Star as Interior product with extreme cold logistics — not Anchorage Southcentral density.',
      'Price Parks Highway · Richardson Highway · Steese Highway portal time honestly; multi-day Anchorage pairs are common.',
      'Extreme cold (-20°F and below) is a real labor and equipment input — confirm cold-weather readiness.',
      'Outside legs need FMCSA; pure in-state jobs need written estimates, business license details, and insurance.',
      'UAF and military calendars can cluster multi-unit curb demand — book around semester and PCS windows.',
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
      'Treat Juneau as capital city with constrained road network and ferry/air reliance — not Anchorage highway defaults; do not invent interstate corridor strings.',
      'Price Egan Drive · Glacier Highway honestly for valley pairs; ferry and air schedules often matter more than road miles.',
      'Capital workforce mid-month calendars often matter more than Saturday peaks.',
      'Outside legs need FMCSA; pure in-state jobs need written estimates, business license details, and insurance.',
      'Survey multi-unit stairs and scarce staging downtown separately from Mendenhall Valley product.',
    ],
  },
};

export function getAlaskaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return alaskaCountyResearch[countySlug];
}