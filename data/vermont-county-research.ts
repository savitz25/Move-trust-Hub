import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Vermont county research — complete state (14/14 counties) */
export const vermontCountyResearch: Record<string, CuratedCountyResearch> = {
  chittenden: {
    marketNotes:
      'Chittenden County is Vermont’s most populous county, anchored by Burlington with strong urban, suburban, and educational demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$125–$180/hr for a 2-person crew',
      note: 'Chittenden County pricing reflects Burlington metro urban and suburban demand, UVM and Champlain College turnover, I-89 corridor traffic, and competition among full-service agents serving Lake Champlain communities.',
    },
    tips: [
      'Verify coverage for Burlington, South Burlington, Essex, and surrounding Champlain Valley towns before booking.',
      'I-89 and downtown Burlington traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value urban and suburban homes, college housing, and multi-floor loading zones.',
      'Book early for UVM semester changeover (August and May), peak seasons (May–September), and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  washington: {
    marketNotes:
      'Washington County is Vermont’s capital county, anchored by Montpelier with strong governmental, residential, and regional demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Washington County pricing reflects state-capital and central Vermont demand, I-89 and Route 2 corridor traffic, legislative session turnover, and competition among regional full-service agents serving Montpelier and Barre.',
    },
    tips: [
      'Verify coverage for Montpelier, Barre, Waterbury, and surrounding central Vermont communities before booking.',
      'I-89 and state-capital corridor traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for hillside homes, historic properties, and multi-floor loading zones.',
      'Book early for legislative session turnover, peak seasons (May–September), and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  rutland: {
    marketNotes:
      'Rutland County is a key southern Vermont county with strong residential, recreational, and regional demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Rutland County pricing reflects southern Green Mountains regional demand, Route 4 and Route 7 corridor traffic, ski-season spillover, and competition among local full-service agents.',
    },
    tips: [
      'Verify coverage for Rutland, Killington, Brandon, and surrounding southern Vermont towns before booking.',
      'Route 4 and mountain corridor traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for hillside homes, seasonal properties, and long rural driveway access.',
      'Book early for ski-season turnover, peak seasons (May–September), and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  windsor: {
    marketNotes:
      'Windsor County is a scenic central Vermont county anchored by Woodstock with strong residential, tourism, and regional demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Windsor County pricing reflects Woodstock scenic and tourism demand, Route 4 and Connecticut River corridor traffic, and competition among regional full-service agents serving White River Junction and surrounding communities.',
    },
    tips: [
      'Verify coverage for Woodstock, White River Junction, Hartford, and surrounding scenic corridor towns before booking.',
      'Tourist and Route 4 corridor traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for historic homes, seasonal properties, and multi-floor loading zones.',
      'Book early for fall foliage season, peak tourist seasons (June–October), and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  franklin: {
    marketNotes:
      'Franklin County is a northern Vermont county anchored by St. Albans with strong agricultural, residential, and regional demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Franklin County pricing reflects northern Champlain Valley and agricultural corridor demand, I-89 and Route 7 traffic, and competition among regional full-service agents serving St. Albans and Swanton-area communities.',
    },
    tips: [
      'Verify coverage for St. Albans, Swanton, Fairfax, and surrounding northern Vermont towns before booking.',
      'I-89 and Route 7 corridor traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for rural properties, farmstead relocations, and long driveway access.',
      'Book early for peak seasons (May–September), agricultural season turnover, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  windham: {
    marketNotes:
      'Windham County is a southern Vermont county anchored by Brattleboro with strong residential, arts-community, and regional demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Windham County pricing reflects Brattleboro and Connecticut River valley demand, Route 91 and Route 9 corridor traffic, and competition among regional full-service agents serving southern Vermont and tri-state spillover.',
    },
    tips: [
      'Verify coverage for Brattleboro, Bellows Falls, Wilmington, and surrounding Connecticut River valley towns before booking.',
      'Route 91 and Connecticut River corridor traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for hillside homes, historic downtown properties, and multi-floor loading zones.',
      'Book early for peak seasons (May–September), arts-festival weekends, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  addison: {
    marketNotes:
      'Addison County is a rural western Vermont county anchored by Middlebury with strong educational, agricultural, and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Addison County pricing reflects Middlebury college-town and Champlain Valley west-side demand, Route 7 and Route 30 corridor traffic, and competition among regional full-service agents serving rural western Vermont communities.',
    },
    tips: [
      'Verify coverage for Middlebury, Vergennes, Bristol, and surrounding Champlain Valley west-side towns before booking.',
      'Route 7 and rural western Vermont road conditions impact scheduling — confirm crew arrival windows.',
      'Confirm insurance for college housing, farmstead properties, and long rural driveway access.',
      'Book early for Middlebury College semester changeover (August and May), peak seasons (May–September), and lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  bennington: {
    marketNotes:
      'Bennington County is a southwestern Vermont county with strong residential, recreational, and regional demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Bennington County pricing reflects southwestern Vermont and Taconic corridor demand, Route 7 and Route 9 traffic, ski-season spillover, and competition among regional full-service local agents.',
    },
    tips: [
      'Verify coverage for Bennington, Manchester, Dorset, and surrounding southwestern Vermont towns before booking.',
      'Route 7 mountain corridor and ski-season traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for hillside homes, seasonal properties, and historic downtown loading zones.',
      'Book early for ski-season turnover, peak seasons (May–September), and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  caledonia: {
    marketNotes:
      'Caledonia County is a northeastern Vermont county anchored by St. Johnsbury with strong residential and Northeast Kingdom regional demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Caledonia County pricing reflects Northeast Kingdom regional demand, I-91 and Route 2 corridor traffic, and competition among local full-service agents serving St. Johnsbury and Lyndonville-area communities.',
    },
    tips: [
      'Verify coverage for St. Johnsbury, Lyndonville, Danville, and surrounding Northeast Kingdom towns before booking.',
      'I-91 and rural northeastern Vermont road conditions impact scheduling — confirm crew arrival windows.',
      'Confirm insurance for hillside homes, long rural driveway access, and seasonal properties.',
      'Book early for peak seasons (May–September), fall foliage season, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  orange: {
    marketNotes:
      'Orange County is a central Vermont county anchored by Chelsea with strong rural residential and regional demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Orange County pricing reflects central Vermont rural demand, Route 2 and Route 110 corridor traffic, and competition among regional full-service agents serving Chelsea and Randolph-area communities.',
    },
    tips: [
      'Verify coverage for Chelsea, Randolph, Tunbridge, and surrounding central Vermont towns before booking.',
      'Rural central Vermont road conditions and corridor traffic impact scheduling — confirm crew arrival windows.',
      'Confirm insurance for farmstead properties, hillside homes, and long driveway access.',
      'Book early for peak seasons (May–September), fall foliage season, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  orleans: {
    marketNotes:
      'Orleans County is a northeastern Vermont county anchored by Newport with strong lakes-region residential and regional demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Orleans County pricing reflects Northeast Kingdom lakes-region demand, I-91 and Route 5 corridor traffic, and competition among regional full-service agents serving Newport and Barton-area communities.',
    },
    tips: [
      'Verify coverage for Newport, Barton, Orleans, and surrounding lakes-region towns before booking.',
      'I-91 and rural northeastern Vermont road conditions impact scheduling — confirm crew arrival windows.',
      'Confirm insurance for lakeside properties, hillside homes, and long rural driveway access.',
      'Book early for peak seasons (May–September), summer lake-season turnover, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lamoille: {
    marketNotes:
      'Lamoille County is a north-central Vermont county anchored by Hyde Park with strong scenic, residential, and regional demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Lamoille County pricing reflects north-central Vermont scenic corridor demand, Route 100 and Route 15 traffic, ski-season spillover, and competition among regional full-service agents serving Morrisville and Johnson-area communities.',
    },
    tips: [
      'Verify coverage for Hyde Park, Morrisville, Johnson, and surrounding north-central Vermont towns before booking.',
      'Route 100 scenic corridor and mountain road conditions impact scheduling — confirm crew arrival windows.',
      'Confirm insurance for hillside homes, seasonal properties, and long rural driveway access.',
      'Book early for ski-season turnover, peak seasons (May–September), and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'grand-isle': {
    marketNotes:
      'Grand Isle County is Vermont’s island county anchored by North Hero with strong lakeside residential and seasonal demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Grand Isle County pricing reflects Lake Champlain island-chain demand, ferry-dependent logistics, seasonal turnover, and competition among regional full-service agents serving North Hero and Grand Isle communities.',
    },
    tips: [
      'Verify coverage for North Hero, Grand Isle, South Hero, and surrounding island communities before booking.',
      'Confirm ferry schedules, bridge access, and island road restrictions — crews may need advance coordination for Champlain island moves.',
      'Confirm insurance for lakeside and seasonal properties with proper valuation coverage.',
      'Book early for summer lake-season turnover, peak seasons (May–September), and ferry-schedule windows.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  essex: {
    marketNotes:
      'Essex County is Vermont’s northeasternmost rural county anchored by Guildhall with strong frontier residential and regional demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Essex County pricing reflects northeastern frontier rural demand, Route 2 and I-91 corridor traffic, long-distance access from regional hubs, and competition among local full-service agents serving Guildhall and Island Pond-area communities.',
    },
    tips: [
      'Verify coverage for Guildhall, Island Pond, Concord, and surrounding northeastern frontier towns before booking.',
      'Remote rural access roads and long travel distances significantly impact scheduling — confirm crew arrival windows.',
      'Confirm insurance for remote properties, long driveway access, and seasonal homes.',
      'Book early for peak seasons (May–September), fall foliage season, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getVermontCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return vermontCountyResearch[countySlug];
}