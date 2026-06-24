import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Oregon county research — 36/36 complete */
export const oregonCountyResearch: Record<string, CuratedCountyResearch> = {
  multnomah: {
    marketNotes:
      'Multnomah County is Oregon’s most populous county, encompassing Portland’s high-density urban core with strong tech-sector, corporate-relocation, and residential demand across downtown, Eastside, and inner-suburban neighborhoods.',
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
      'Washington County, Oregon is a large and affluent Portland metro county west of the Willamette with strong tech-corridor, corporate-campus, and high-growth suburban residential demand in Hillsboro, Beaverton, and Tigard.',
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
      'Clackamas County is a large Portland metro county southeast of the urban core with strong corporate-park, suburban, and increasingly high-density residential demand across Oregon City, Lake Oswego, and Happy Valley.',
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
  wasco: {
    marketNotes:
      'Wasco County is a Columbia River Gorge county with residential and tourism demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Wasco County pricing reflects Columbia Gorge demand, I-84 corridor traffic, and competition among regional agents serving The Dalles and surrounding communities.',
    },
    tips: [
      'Verify coverage for The Dalles and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  union: {
    marketNotes:
      'Union County is an eastern Oregon county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Union County, Oregon pricing reflects La Grande metro and Grande Ronde Valley demand with regional travel affecting crew scheduling.',
    },
    tips: [
      'Verify coverage for La Grande and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jefferson: {
    marketNotes:
      'Jefferson County is a central Oregon county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Jefferson County, Oregon pricing reflects Madras-area demand, US-97 corridor traffic, and competition among regional agents serving central Oregon communities.',
    },
    tips: [
      'Verify coverage for Madras and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'hood-river': {
    marketNotes:
      'Hood River County is a Columbia River Gorge county with strong tourism and residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Hood River County pricing reflects Gorge tourism demand, seasonal traffic, and competition among regional agents serving Hood River and waterfront communities.',
    },
    tips: [
      'Verify coverage for Hood River and surrounding areas before booking.',
      'Tourist traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak tourist seasons (May–September).',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  curry: {
    marketNotes:
      'Curry County is a southern coastal county with residential and tourism demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Curry County pricing reflects southern Oregon coastal demand, US-101 corridor traffic, and competition among regional agents serving Gold Beach and Brookings-area communities.',
    },
    tips: [
      'Verify coverage for Gold Beach and surrounding cities before booking.',
      'Coastal traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value waterfront homes.',
      'Book early for peak tourist seasons (May–September).',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  baker: {
    marketNotes:
      'Baker County is an eastern Oregon county with rural residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Baker County pricing reflects Baker City and Powder River Valley demand with extended travel distances affecting regional mover scheduling.',
    },
    tips: [
      'Verify coverage for Baker City and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  morrow: {
    marketNotes:
      'Morrow County is a rural eastern Oregon county with agricultural and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Morrow County pricing reflects Heppner-area agricultural community demand with regional travel affecting crew availability.',
    },
    tips: [
      'Verify coverage for Heppner and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lake: {
    marketNotes:
      'Lake County is a large rural southeastern Oregon county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Lake County, Oregon pricing reflects Lakeview high-desert demand with extended travel distances affecting regional mover scheduling.',
    },
    tips: [
      'Verify coverage for Lakeview and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  wallowa: {
    marketNotes:
      'Wallowa County is a remote northeastern Oregon county with rural residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Wallowa County pricing reflects Enterprise and Wallowa Valley demand with mountain-road travel affecting crew scheduling.',
    },
    tips: [
      'Verify coverage for Enterprise and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  harney: {
    marketNotes:
      'Harney County is one of Oregon’s largest and most remote counties with rural residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$95–$145/hr for a 2-person crew',
      note: 'Harney County pricing reflects Burns-area high-desert demand with very long travel distances affecting regional mover availability.',
    },
    tips: [
      'Verify coverage for Burns and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  grant: {
    marketNotes:
      'Grant County is a rural eastern Oregon county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Grant County, Oregon pricing reflects Canyon City and John Day Valley demand with extended travel distances affecting regional mover scheduling.',
    },
    tips: [
      'Verify coverage for Canyon City and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  sherman: {
    marketNotes:
      'Sherman County is one of Oregon’s smallest counties with rural residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Sherman County, Oregon pricing reflects Moro wheat-country demand with regional travel affecting crew availability.',
    },
    tips: [
      'Verify coverage for Moro and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  gilliam: {
    marketNotes:
      'Gilliam County is one of Oregon’s smallest counties with rural residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Gilliam County pricing reflects Condon plateau demand with regional travel affecting crew scheduling.',
    },
    tips: [
      'Verify coverage for Condon and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  wheeler: {
    marketNotes:
      'Wheeler County is one of Oregon’s smallest and most rural counties with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$95–$145/hr for a 2-person crew',
      note: 'Wheeler County pricing reflects Fossil and John Day Fossil Beds area demand with remote travel affecting regional mover availability.',
    },
    tips: [
      'Verify coverage for Fossil and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  clatsop: {
    marketNotes:
      'Clatsop County is a northern Oregon coastal county with strong fishing, tourism, and residential demand across Astoria and US-101 corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Clatsop County pricing reflects northern Oregon coastal demand, US-101 and Columbia River bridge traffic, and competition among regional agents serving Astoria, Seaside, and Cannon Beach-area communities.',
    },
    tips: [
      'Verify coverage for Astoria, Seaside, and surrounding coastal cities before booking.',
      'US-101 and bridge-crossing traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value waterfront and hillside coastal homes.',
      'Book early for peak tourist seasons (May–September) and storm-season scheduling constraints.',
      'Ask about experience with narrow coastal driveways, stairs, and limited truck access.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  columbia: {
    marketNotes:
      'Columbia County, Oregon is a lower Columbia River county north of Portland with residential and commuter demand centered on St. Helens — not to be confused with Columbia County in Washington or other states.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Columbia County, Oregon pricing reflects Portland metro fringe and lower Columbia River corridor demand, US-30 and I-5 access traffic, and competition among regional agents serving St. Helens, Scappoose, and Rainier-area communities.',
    },
    tips: [
      'Verify coverage for St. Helens, Scappoose, and surrounding cities before booking.',
      'Portland metro and Columbia River corridor traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban and riverfront homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Ask about bridge-crossing routes when moving between Columbia County and Clark County, WA.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  coos: {
    marketNotes:
      'Coos County is a southern Oregon coastal county with residential, port, and tourism demand across Coquille, North Bend, and Coos Bay.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Coos County pricing reflects southern Oregon coastal demand, US-101 corridor traffic, and competition among regional agents serving Coquille, North Bend, and Bandon-area communities.',
    },
    tips: [
      'Verify coverage for Coquille, North Bend, and surrounding coastal cities before booking.',
      'US-101 coastal traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value waterfront and port-area homes.',
      'Book early for peak tourist seasons (May–September) and winter storm-season constraints.',
      'Ask about experience with coastal humidity and long regional crew travel from Eugene or Medford.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  crook: {
    marketNotes:
      'Crook County is a rural central Oregon high-desert county with residential and growth demand centered on Prineville.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Crook County pricing reflects Prineville-area high-desert demand, US-26 corridor traffic, and competition among regional agents serving central Oregon communities with extended travel from Bend.',
    },
    tips: [
      'Verify coverage for Prineville and surrounding areas before booking.',
      'Regional and high-desert road travel impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and acreage properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Ask about equipment fit for rural driveways and unpaved access roads.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  josephine: {
    marketNotes:
      'Josephine County is a southern Oregon county with residential demand across Grants Pass and the Rogue Valley.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Josephine County pricing reflects Grants Pass and Rogue Valley demand, I-5 corridor traffic, and competition among regional agents serving southern Oregon communities near the California border.',
    },
    tips: [
      'Verify coverage for Grants Pass and surrounding cities before booking.',
      'I-5 and Rogue Valley traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value hillside and valley homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Ask about cross-border scheduling if your move involves Siskiyou County, CA.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  klamath: {
    marketNotes:
      'Klamath County is a rural southern Oregon basin county with residential demand centered on Klamath Falls.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Klamath County pricing reflects Klamath Falls basin demand, US-97 corridor traffic, and competition among regional agents serving southern Oregon and northern California border communities.',
    },
    tips: [
      'Verify coverage for Klamath Falls and surrounding areas before booking.',
      'Basin and mountain-road travel impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and lakefront properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Ask about cross-border routes if your move involves Siskiyou County, CA.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lincoln: {
    marketNotes:
      'Lincoln County, Oregon is a central Oregon coastal county with fishing, tourism, and residential demand across Newport and the central coast — not to be confused with Lincoln County in Maine, Nebraska, or other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Lincoln County, Oregon pricing reflects central coast tourism demand, US-101 corridor traffic, and competition among regional agents serving Newport, Lincoln City, and Depoe Bay-area communities.',
    },
    tips: [
      'Verify coverage for Newport, Lincoln City, and surrounding coastal cities before booking.',
      'US-101 coastal traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value waterfront and vacation homes.',
      'Book early for peak tourist seasons (May–September) and storm-season scheduling constraints.',
      'Ask about experience with coastal stairs, dunes access, and limited parking zones.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  malheur: {
    marketNotes:
      'Malheur County is an eastern Oregon county with agricultural and residential demand across Ontario and the Treasure Valley near the Idaho border.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Malheur County pricing reflects Ontario Treasure Valley demand, I-84 corridor traffic, and competition among regional agents serving eastern Oregon and cross-border Idaho communities.',
    },
    tips: [
      'Verify coverage for Ontario and surrounding areas before booking.',
      'I-84 and long regional travel impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and agricultural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Ask about cross-border scheduling if your move involves Ada County, ID.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  polk: {
    marketNotes:
      'Polk County is a western Willamette Valley county with residential demand across Dallas, Monmouth, and Salem metro fringe communities.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Polk County pricing reflects western Willamette Valley and Salem metro spillover demand, OR-99W corridor traffic, and competition among regional agents serving Dallas, Monmouth, and Independence communities.',
    },
    tips: [
      'Verify coverage for Dallas, Monmouth, and surrounding cities before booking.',
      'Willamette Valley and Salem metro traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban and rural-residential homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Ask about university-area scheduling if moving near Western Oregon University.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  tillamook: {
    marketNotes:
      'Tillamook County is a northern Oregon coastal county with dairy, fishing, tourism, and residential demand across Tillamook and US-101 communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Tillamook County pricing reflects north-coast dairy-country demand, US-101 corridor traffic, and competition among regional agents serving Tillamook, Pacific City, and Manzanita-area communities.',
    },
    tips: [
      'Verify coverage for Tillamook and surrounding coastal cities before booking.',
      'US-101 coastal traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value coastal and farm-residential properties.',
      'Book early for peak tourist seasons (May–September) and storm-season constraints.',
      'Ask about experience with beach-access roads and limited coastal parking.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  umatilla: {
    marketNotes:
      'Umatilla County is an eastern Oregon plateau county with agricultural, industrial, and residential demand across Pendleton and Hermiston.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Umatilla County pricing reflects Pendleton and Hermiston plateau demand, I-84 corridor traffic, and competition among regional agents serving eastern Oregon agricultural and industrial communities.',
    },
    tips: [
      'Verify coverage for Pendleton, Hermiston, and surrounding cities before booking.',
      'I-84 and plateau travel impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and agricultural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Ask about long-distance crew travel from Tri-Cities or Portland metro providers.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getOregonCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return oregonCountyResearch[countySlug];
}