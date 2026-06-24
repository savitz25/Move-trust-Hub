import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Washington county research — 8 premium hubs */
export const washingtonCountyResearch: Record<string, CuratedCountyResearch> = {
  king: {
    marketNotes:
      'King County is Washington’s most populous county, encompassing Seattle and surrounding suburban areas with strong urban, tech, and residential demand.',
    costs: {
      studioRange: '$950–$2,100',
      familyRange: '$4,000–$9,500+',
      avgHourly: '$140–$210/hr for a 2-person crew',
      note: 'King County pricing reflects Seattle metro demand, I-5 and bridge-crossing traffic, elevator and parking constraints, and competition among full-service agents serving urban and Eastside suburban communities.',
    },
    tips: [
      'Verify coverage for Seattle, Bellevue, Redmond, and surrounding cities before booking.',
      'Heavy urban traffic and bridge crossings (520, I-90) significantly impact scheduling — confirm crew arrival windows.',
      'Tech-corridor and high-rise moves may require elevator reservations and loading-zone permits — confirm building coordination experience.',
      'Alaska-bound relocations often stage through Seattle-area ports — distinguish local King County movers from interstate van-line agents.',
      'Confirm insurance for high-value urban and suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  pierce: {
    marketNotes:
      'Pierce County is a large and growing county with strong urban, suburban, military, and residential demand.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$130–$195/hr for a 2-person crew',
      note: 'Pierce County pricing reflects Seattle-Tacoma metro demand, I-5 corridor traffic, Joint Base Lewis-McChord spillover, and competition among full-service agents serving Tacoma and South Sound suburban communities.',
    },
    tips: [
      'Verify coverage for Tacoma, Lakewood, and surrounding cities before booking.',
      'Heavy Seattle-Tacoma metro traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Military PCS moves near JBLM require base access coordination — confirm mover credentials and clearance experience.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  snohomish: {
    marketNotes:
      'Snohomish County is a large and rapidly growing suburban county north of Seattle with strong residential demand.',
    costs: {
      studioRange: '$950–$2,000',
      familyRange: '$3,800–$9,000+',
      avgHourly: '$135–$200/hr for a 2-person crew',
      note: 'Snohomish County pricing reflects North Sound suburban growth, I-5 and US-2 corridor traffic, and competition among full-service agents serving Everett and Lynnwood-area communities.',
    },
    tips: [
      'Verify coverage for Everett, Lynnwood, and surrounding cities before booking.',
      'Heavy Seattle metro traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  spokane: {
    marketNotes:
      'Spokane County is the core of Eastern Washington with strong urban and suburban residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Spokane County pricing reflects Inland Northwest demand, I-90 corridor traffic, and competition among regional full-service agents serving Spokane and surrounding suburban communities.',
    },
    tips: [
      'Verify coverage for Spokane and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  clark: {
    marketNotes:
      'Clark County is a rapidly growing county across the Columbia River from Portland with strong suburban residential demand.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,000+',
      avgHourly: '$125–$185/hr for a 2-person crew',
      note: 'Clark County pricing reflects Portland metro spillover demand, I-5 and I-205 bridge-crossing traffic, and competition among full-service agents serving Vancouver and suburban Clark County communities.',
    },
    tips: [
      'Verify coverage for Vancouver and surrounding cities before booking.',
      'Portland metro traffic and Columbia River bridge crossings impact scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  thurston: {
    marketNotes:
      'Thurston County is the state capital county with strong governmental and residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Thurston County pricing reflects capital-region demand, I-5 South Sound corridor traffic, and competition among regional full-service agents serving Olympia and surrounding communities.',
    },
    tips: [
      'Verify coverage for Olympia and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Government and legislative session moves create seasonal demand spikes — book early around session changeover.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  kitsap: {
    marketNotes:
      'Kitsap County is a peninsula county with strong naval, suburban, and residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Kitsap County pricing reflects peninsula and naval-base demand, ferry-dependent logistics, and competition among regional full-service agents serving Bremerton and Port Orchard-area communities.',
    },
    tips: [
      'Verify coverage for Bremerton and surrounding cities before booking.',
      'Ferry and regional traffic impacts scheduling — confirm crew arrival windows and peninsula access.',
      'Naval base and military moves near Naval Base Kitsap require coordination — confirm credentials.',
      'Confirm insurance for high-value waterfront homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  yakima: {
    marketNotes:
      'Yakima County is a major agricultural county in Central Washington with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Yakima County pricing reflects Central Washington regional demand, agricultural-season traffic patterns, and competition among regional full-service agents serving Yakima and valley communities.',
    },
    tips: [
      'Verify coverage for Yakima and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and harvest-season changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getWashingtonCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return washingtonCountyResearch[countySlug];
}