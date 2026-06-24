import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Oregon county research — 11/36 premium hubs (batch 1) */
export const oregonCountyResearch: Record<string, CuratedCountyResearch> = {
  multnomah: {
    marketNotes:
      'Multnomah County is Oregon’s most populous county, encompassing Portland with strong urban, suburban, and residential demand.',
    costs: {
      studioRange: '$950–$2,000',
      familyRange: '$3,800–$9,000+',
      avgHourly: '$140–$210/hr for a 2-person crew',
      note: 'Multnomah County pricing reflects Portland metro demand, I-5 and bridge-crossing traffic, elevator and parking constraints, and competition among full-service agents serving urban and Eastside suburban communities.',
    },
    tips: [
      'Verify coverage for Portland and surrounding cities before booking.',
      'Heavy urban traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value urban and suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  washington: {
    marketNotes:
      'Washington County is a large and affluent suburban county west of Portland with strong tech and residential demand.',
    costs: {
      studioRange: '$950–$2,000',
      familyRange: '$3,800–$9,000+',
      avgHourly: '$135–$200/hr for a 2-person crew',
      note: 'Washington County, Oregon pricing reflects Portland metro suburban growth, US-26 and I-5 corridor traffic, and competition among full-service agents serving Hillsboro, Beaverton, and Tualatin-area communities.',
    },
    tips: [
      'Verify coverage for Hillsboro, Beaverton, and surrounding cities before booking.',
      'Heavy Portland metro traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  clackamas: {
    marketNotes:
      'Clackamas County is a large suburban county southeast of Portland with strong residential demand.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$130–$195/hr for a 2-person crew',
      note: 'Clackamas County pricing reflects Portland metro spillover demand, I-205 corridor traffic, and competition among full-service agents serving Oregon City, Lake Oswego, and Happy Valley communities.',
    },
    tips: [
      'Verify coverage for Oregon City, Lake Oswego, and surrounding cities before booking.',
      'Portland metro traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lane: {
    marketNotes:
      'Lane County is a major southern Willamette Valley county with strong educational and residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Lane County pricing reflects Eugene–Springfield metro demand, I-5 corridor traffic, and competition among regional full-service agents serving university-area and suburban communities.',
    },
    tips: [
      'Verify coverage for Eugene, Springfield, and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  marion: {
    marketNotes:
      'Marion County is the state capital county with strong governmental and residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Marion County pricing reflects Salem metro and state-government corridor demand, I-5 traffic, and competition among regional full-service agents serving Salem, Keizer, and Woodburn communities.',
    },
    tips: [
      'Verify coverage for Salem and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jackson: {
    marketNotes:
      'Jackson County is a southern Oregon county with strong residential and tourism demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Jackson County pricing reflects Rogue Valley demand, I-5 corridor traffic, and competition among regional agents serving Medford, Ashland, and surrounding communities.',
    },
    tips: [
      'Verify coverage for Medford, Ashland, and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  deschutes: {
    marketNotes:
      'Deschutes County is a rapidly growing central Oregon county with strong residential and tourism demand.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,000+',
      avgHourly: '$125–$185/hr for a 2-person crew',
      note: 'Deschutes County pricing reflects Bend metro growth, US-97 corridor traffic, and competition among regional agents serving Bend, Redmond, and Sunriver-area communities.',
    },
    tips: [
      'Verify coverage for Bend and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  linn: {
    marketNotes:
      'Linn County is a Willamette Valley county with strong residential and industrial demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Linn County pricing reflects mid-Willamette Valley demand, I-5 corridor traffic, and competition among regional agents serving Albany, Lebanon, and Sweet Home communities.',
    },
    tips: [
      'Verify coverage for Albany and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  douglas: {
    marketNotes:
      'Douglas County is a southern Oregon county with residential demand across the Umpqua Valley.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Douglas County, Oregon pricing reflects Umpqua Valley demand, I-5 corridor traffic, and competition among regional agents serving Roseburg and surrounding rural-suburban communities.',
    },
    tips: [
      'Verify coverage for Roseburg and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  yamhill: {
    marketNotes:
      'Yamhill County is a Willamette Valley county with strong residential and wine country demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Yamhill County pricing reflects wine-country and Portland metro spillover demand, OR-99W corridor traffic, and competition among regional agents serving McMinnville, Newberg, and Dundee communities.',
    },
    tips: [
      'Verify coverage for McMinnville and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  benton: {
    marketNotes:
      'Benton County is home to Oregon State University with strong educational and residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Benton County, Oregon pricing reflects Corvallis university-area demand, OR-99W corridor traffic, and competition among regional agents serving student, faculty, and suburban residential moves.',
    },
    tips: [
      'Verify coverage for Corvallis and surrounding cities before booking.',
      'University traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and student-related moves.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getOregonCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return oregonCountyResearch[countySlug];
}