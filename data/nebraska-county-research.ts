import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Nebraska county research — batch 1 (21 counties) */
export const nebraskaCountyResearch: Record<string, CuratedCountyResearch> = {
  douglas: {
    marketNotes:
      'Douglas County anchors Nebraska’s largest metro centered on Omaha with strong suburban, commercial, healthcare, and Missouri River cross-border demand across Bellevue-adjacent, West Omaha, and Council Bluffs corridor communities.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$185/hr for a 2-person crew',
      note: 'Douglas County pricing reflects Omaha metro demand, suburban new-construction turnover, I-80 and I-29 corridor traffic, and competition among full-service agents serving Douglas County communities.',
    },
    tips: [
      'Verify coverage for Omaha and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lancaster: {
    marketNotes:
      'Lancaster County is Nebraska’s capital and university county centered on Lincoln with strong state-government, University of Nebraska–Lincoln, student-housing, and Salt Creek Valley residential demand across downtown, south Lincoln, and suburban growth corridors.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Lancaster County pricing reflects Lincoln secondary-metro demand, state-government and university relocations, Salt Creek Valley corridor traffic, and competition among full-service agents serving Lancaster County communities.',
    },
    tips: [
      'Verify coverage for Lincoln and surrounding areas before booking.',
      'University-area turnover (semester start/end) may affect scheduling — confirm peak-season crew availability.',
      'Confirm coverage for student housing, off-campus apartments, and family homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  sarpy: {
    marketNotes:
      'Sarpy County is Nebraska’s fastest-growing suburban county centered on Papillion with strong Omaha metro south-bank demand across Bellevue, La Vista, Gretna, and Offutt Air Force Base corridor communities.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$185/hr for a 2-person crew',
      note: 'Sarpy County pricing reflects Omaha metro suburban growth demand, Papillion and Bellevue corridor traffic, new-construction turnover, and competition among regional agents serving Sarpy County communities.',
    },
    tips: [
      'Verify coverage for Papillion and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hall: {
    marketNotes:
      'Hall County is a central Nebraska hub county centered on Grand Island with residential, manufacturing, agricultural, and I-80 Platte Valley corridor demand across central Nebraska gateway communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Hall County pricing reflects Grand Island-area demand, Platte Valley central corridor travel distances, agricultural property logistics, and competition among regional agents serving Hall County communities.',
    },
    tips: [
      'Verify coverage for Grand Island and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  buffalo: {
    marketNotes:
      'Buffalo County, NE is a central Nebraska county centered on Kearney with strong University of Nebraska at Kearney, student-housing, and I-80 Platte Valley mid-corridor demand — not to be confused with Buffalo County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Buffalo County pricing reflects Kearney-area demand, I-80 Platte Valley mid-corridor traffic, university and agricultural property logistics, and competition among regional agents serving Buffalo County communities.',
    },
    tips: [
      'Verify coverage for Kearney and surrounding areas before booking.',
      'University-area turnover (semester start/end) may affect scheduling — confirm peak-season crew availability.',
      'Confirm coverage for student housing, off-campus apartments, and family homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  dodge: {
    marketNotes:
      'Dodge County is an eastern Nebraska county centered on Fremont with residential, manufacturing, and Elkhorn River east corridor demand across Omaha metro fringe and agricultural communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Dodge County pricing reflects Fremont-area demand, Elkhorn River east corridor travel distances, agricultural and industrial property logistics, and competition among regional agents serving Dodge County communities.',
    },
    tips: [
      'Verify coverage for Fremont and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  madison: {
    marketNotes:
      'Madison County, NE is a northeastern Nebraska county with seat at Norfolk — not Madison town — with residential, healthcare, and Elkhorn Valley north agricultural demand across US-275 corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Madison County pricing reflects Norfolk-area demand, Elkhorn Valley north corridor travel distances, agricultural property logistics, and competition among regional agents serving Madison County communities.',
    },
    tips: [
      'Verify coverage for Norfolk and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  platte: {
    marketNotes:
      'Platte County, NE is an eastern Nebraska county centered on Columbus with residential, manufacturing, and Loup River valley corridor demand — not to be confused with Platte County in Wyoming or other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Platte County pricing reflects Columbus-area demand, Loup River valley corridor travel distances, agricultural and industrial property logistics, and competition among regional agents serving Platte County communities.',
    },
    tips: [
      'Verify coverage for Columbus and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'scotts-bluff': {
    marketNotes:
      'Scotts Bluff County is a western Nebraska Panhandle county with seat at Gering and strong residential, agricultural, and North Platte Valley west corridor demand across Scottsbluff, Mitchell, and I-80 Panhandle gateway communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Scotts Bluff County pricing reflects Scottsbluff and Gering-area demand, Panhandle travel distances, agricultural property logistics, and competition among regional agents serving Scotts Bluff County communities.',
    },
    tips: [
      'Verify coverage for Scottsbluff and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lincoln: {
    marketNotes:
      'Lincoln County, NE is a western Nebraska county centered on North Platte with residential, railroad-logistics, and Platte Valley west corridor demand — not to be confused with Lancaster County (Lincoln city) or Lincoln County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Lincoln County pricing reflects North Platte-area demand, Platte Valley west travel distances, ranch and agricultural property logistics, and competition among regional agents serving Lincoln County communities.',
    },
    tips: [
      'Verify coverage for North Platte and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  adams: {
    marketNotes:
      'Adams County, NE is a south-central Nebraska county centered on Hastings with residential, manufacturing, and Republican River valley agricultural demand — not to be confused with Adams County in Colorado or other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Adams County pricing reflects Hastings-area demand, Republican River valley corridor travel distances, agricultural property logistics, and competition among regional agents serving Adams County communities.',
    },
    tips: [
      'Verify coverage for Hastings and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cass: {
    marketNotes:
      'Cass County, NE is a southeastern Omaha metro county centered on Plattsmouth with residential spillover, Missouri River south-bank, and cross-border Iowa corridor demand — not to be confused with Cass County in other states.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Cass County pricing reflects Plattsmouth secondary-metro demand, Missouri River south corridor traffic, Omaha metro fringe logistics, and competition among regional agents serving Cass County communities.',
    },
    tips: [
      'Verify coverage for Plattsmouth and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  dawson: {
    marketNotes:
      'Dawson County is a central Nebraska county centered on Lexington with residential, food-processing, and Platte Valley midwest agricultural demand across I-80 corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Dawson County pricing reflects Lexington-area demand, Platte Valley midwest travel distances, agricultural property logistics, and competition among regional agents serving Dawson County communities.',
    },
    tips: [
      'Verify coverage for Lexington and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  saunders: {
    marketNotes:
      'Saunders County is an eastern Nebraska county centered on Wahoo with rural residential, agricultural, and Platte River mid-corridor demand bridging Omaha and Lincoln metro fringe communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Saunders County pricing reflects Wahoo-area demand, Platte River mid-corridor travel distances, agricultural property logistics, and competition among regional agents serving Saunders County communities.',
    },
    tips: [
      'Verify coverage for Wahoo and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  dakota: {
    marketNotes:
      'Dakota County, NE is a northeastern Nebraska county centered on Dakota City with residential, industrial, and Sioux City metro spillover demand across Missouri River north corridor communities — not to be confused with Dakota County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Dakota County pricing reflects Dakota City and South Sioux City-area demand, Missouri River north corridor traffic, cross-border Iowa logistics, and competition among regional agents serving Dakota County communities.',
    },
    tips: [
      'Verify coverage for Dakota City and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  gage: {
    marketNotes:
      'Gage County is a southeastern Nebraska county centered on Beatrice with rural residential, agricultural, and Big Blue River valley corridor demand across Lincoln metro south fringe communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Gage County pricing reflects Beatrice-area demand, Big Blue Valley travel distances, agricultural property logistics, and competition among regional agents serving Gage County communities.',
    },
    tips: [
      'Verify coverage for Beatrice and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  washington: {
    marketNotes:
      'Washington County, NE is an eastern Omaha metro county centered on Blair with residential spillover, Elkhorn River north corridor, and suburban growth demand — not to be confused with Washington County in other states.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Washington County pricing reflects Blair secondary-metro demand, Elkhorn River north corridor traffic, Omaha metro north-bank logistics, and competition among regional agents serving Washington County communities.',
    },
    tips: [
      'Verify coverage for Blair and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  seward: {
    marketNotes:
      'Seward County, NE is a southeastern Nebraska county centered on Seward with rural residential, agricultural, and Big Blue River north corridor demand across Lincoln metro fringe communities — not to be confused with Seward County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Seward County pricing reflects Seward-area demand, Big Blue north corridor travel distances, agricultural property logistics, and competition among regional agents serving Seward County communities.',
    },
    tips: [
      'Verify coverage for Seward and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  otoe: {
    marketNotes:
      'Otoe County is a southeastern Nebraska county centered on Nebraska City with rural residential, orchard-country, and Missouri River bluff corridor demand across historic river-town communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Otoe County pricing reflects Nebraska City-area demand, Missouri River bluff corridor travel distances, agricultural property logistics, and competition among regional agents serving Otoe County communities.',
    },
    tips: [
      'Verify coverage for Nebraska City and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  saline: {
    marketNotes:
      'Saline County, NE is a southeastern Nebraska county centered on Wilber with rural residential, Czech-heritage community, and Big Blue River south corridor agricultural demand — not to be confused with Saline County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Saline County pricing reflects Wilber-area demand, Big Blue south corridor travel distances, agricultural property logistics, and competition among regional agents serving Saline County communities.',
    },
    tips: [
      'Verify coverage for Wilber and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  york: {
    marketNotes:
      'York County, NE is a east-central Nebraska county centered on York with rural residential, agricultural, and Blue River valley corridor demand across I-80 and US-81 corridor communities — not to be confused with York County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'York County pricing reflects York-area demand, Blue River valley travel distances, agricultural property logistics, and competition among regional agents serving York County communities.',
    },
    tips: [
      'Verify coverage for York and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getNebraskaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return nebraskaCountyResearch[countySlug];
}
