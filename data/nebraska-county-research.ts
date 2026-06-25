import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Nebraska county research — 93/93 (rural/specialized market) */
export const nebraskaCountyResearch: Record<string, CuratedCountyResearch> = {
  douglas: {
    marketNotes:
      'Douglas County anchors Nebraska’s largest metro centered on Omaha with strong corporate, suburban family, healthcare, Offutt AFB military-adjacent, and Missouri River cross-border demand across West Omaha, Midtown, and Council Bluffs corridor communities.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$185/hr for a 2-person crew',
      note: 'Douglas County pricing reflects Omaha metro demand, suburban new-construction turnover, I-80 and I-29 corridor traffic, and competition among full-service agents serving Douglas County communities.',
    },
    tips: [
      'Verify coverage for Omaha, corporate relocations, and West Omaha suburban communities before booking.',
      'I-80 and I-29 corridor traffic and winter weather impact scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September), military PCS windows, and month-end lease changeover.',
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
      'Verify coverage for Papillion, Bellevue, Offutt AFB PCS moves, and La Vista communities before booking.',
      'Omaha metro south-bank suburban growth and I-80 corridor traffic impact scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September), military PCS windows, and month-end lease changeover.',
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
  colfax: {
    marketNotes:
      'Colfax County is a rural Nebraska county centered on Schuyler with residential, agricultural, and platte river upper corridor demand across surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Colfax County pricing reflects Schuyler-area demand, platte river upper travel distances, agricultural property logistics, and competition among regional agents serving Colfax County communities.',
    },
    tips: [
      'Verify coverage for Schuyler and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  custer: {
    marketNotes:
      'Custer County, NE is a rural Nebraska county centered on Broken Bow with residential, agricultural, and sandhills central corridor demand across surrounding communities — not to be confused with Custer County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Custer County pricing reflects Broken Bow-area demand, sandhills central travel distances, agricultural property logistics, and competition among regional agents serving Custer County communities.',
    },
    tips: [
      'Verify coverage for Broken Bow and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'box-butte': {
    marketNotes:
      'Box Butte County, NE is a rural Nebraska county centered on Alliance with residential, agricultural, and panhandle north corridor demand across surrounding communities — not to be confused with Box Butte County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Box Butte County pricing reflects Alliance-area demand, panhandle north travel distances, agricultural property logistics, and competition among regional agents serving Box Butte County communities.',
    },
    tips: [
      'Verify coverage for Alliance and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'red-willow': {
    marketNotes:
      'Red Willow County, NE is a rural Nebraska county centered on McCook with residential, agricultural, and republican river southwest corridor demand across surrounding communities — not to be confused with Red Willow County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Red Willow County pricing reflects McCook-area demand, republican river southwest travel distances, agricultural property logistics, and competition among regional agents serving Red Willow County communities.',
    },
    tips: [
      'Verify coverage for McCook and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  wayne: {
    marketNotes:
      'Wayne County, NE is a rural Nebraska county centered on Wayne with residential, agricultural, and elkhorn valley east corridor demand across surrounding communities — not to be confused with Wayne County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Wayne County pricing reflects Wayne-area demand, elkhorn valley east travel distances, agricultural property logistics, and competition among regional agents serving Wayne County communities.',
    },
    tips: [
      'Verify coverage for Wayne and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  holt: {
    marketNotes:
      "Holt County is a rural Nebraska county centered on O'Neill with residential, agricultural, and niobrara plateau corridor demand across surrounding communities.",
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: "Holt County pricing reflects O'Neill-area demand, niobrara plateau travel distances, agricultural property logistics, and competition among regional agents serving Holt County communities.",
    },
    tips: [
      "Verify coverage for O'Neill and surrounding areas before booking.",
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hamilton: {
    marketNotes:
      'Hamilton County, NE is a rural Nebraska county centered on Aurora with residential, agricultural, and platte valley east corridor demand across surrounding communities — not to be confused with Hamilton County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Hamilton County pricing reflects Aurora-area demand, platte valley east travel distances, agricultural property logistics, and competition among regional agents serving Hamilton County communities.',
    },
    tips: [
      'Verify coverage for Aurora and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cheyenne: {
    marketNotes:
      'Cheyenne County, NE is a rural Nebraska county centered on Sidney with residential, agricultural, and high plains east corridor demand across surrounding communities — not to be confused with Cheyenne County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Cheyenne County pricing reflects Sidney-area demand, high plains east travel distances, agricultural property logistics, and competition among regional agents serving Cheyenne County communities.',
    },
    tips: [
      'Verify coverage for Sidney and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  phelps: {
    marketNotes:
      'Phelps County is a rural Nebraska county centered on Holdrege with residential, agricultural, and platte valley south corridor demand across surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Phelps County pricing reflects Holdrege-area demand, platte valley south travel distances, agricultural property logistics, and competition among regional agents serving Phelps County communities.',
    },
    tips: [
      'Verify coverage for Holdrege and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cuming: {
    marketNotes:
      'Cuming County is a rural Nebraska county centered on West Point with residential, agricultural, and elkhorn river mid corridor demand across surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Cuming County pricing reflects West Point-area demand, elkhorn river mid travel distances, agricultural property logistics, and competition among regional agents serving Cuming County communities.',
    },
    tips: [
      'Verify coverage for West Point and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  butler: {
    marketNotes:
      'Butler County, NE is a rural Nebraska county centered on David City with residential, agricultural, and platte river mid corridor demand across surrounding communities — not to be confused with Butler County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Butler County pricing reflects David City-area demand, platte river mid travel distances, agricultural property logistics, and competition among regional agents serving Butler County communities.',
    },
    tips: [
      'Verify coverage for David City and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cedar: {
    marketNotes:
      'Cedar County is a rural Nebraska county centered on Hartington with residential, agricultural, and missouri bluff north corridor demand across surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Cedar County pricing reflects Hartington-area demand, missouri bluff north travel distances, agricultural property logistics, and competition among regional agents serving Cedar County communities.',
    },
    tips: [
      'Verify coverage for Hartington and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  knox: {
    marketNotes:
      'Knox County is a rural Nebraska county centered on Center with residential, agricultural, and missouri plateau corridor demand across surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Knox County pricing reflects Center-area demand, missouri plateau travel distances, agricultural property logistics, and competition among regional agents serving Knox County communities.',
    },
    tips: [
      'Verify coverage for Center and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  keith: {
    marketNotes:
      'Keith County is a rural Nebraska county centered on Ogallala with residential, agricultural, and north platte valley mid corridor demand across surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Keith County pricing reflects Ogallala-area demand, north platte valley mid travel distances, agricultural property logistics, and competition among regional agents serving Keith County communities.',
    },
    tips: [
      'Verify coverage for Ogallala and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  merrick: {
    marketNotes:
      'Merrick County is a rural Nebraska county centered on Central City with residential, agricultural, and loup river upper corridor demand across surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Merrick County pricing reflects Central City-area demand, loup river upper travel distances, agricultural property logistics, and competition among regional agents serving Merrick County communities.',
    },
    tips: [
      'Verify coverage for Central City and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  dawes: {
    marketNotes:
      'Dawes County is a rural Nebraska county centered on Chadron with residential, agricultural, and pine ridge foothills corridor demand across surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Dawes County pricing reflects Chadron-area demand, pine ridge foothills travel distances, agricultural property logistics, and competition among regional agents serving Dawes County communities.',
    },
    tips: [
      'Verify coverage for Chadron and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  richardson: {
    marketNotes:
      'Richardson County is a rural Nebraska county centered on Falls City with residential, agricultural, and nemaha river valley corridor demand across surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Richardson County pricing reflects Falls City-area demand, nemaha river valley travel distances, agricultural property logistics, and competition among regional agents serving Richardson County communities.',
    },
    tips: [
      'Verify coverage for Falls City and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  pierce: {
    marketNotes:
      'Pierce County, NE is a rural Nebraska county centered on Pierce with residential, agricultural, and elkhorn valley central corridor demand across surrounding communities — not to be confused with Pierce County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Pierce County pricing reflects Pierce-area demand, elkhorn valley central travel distances, agricultural property logistics, and competition among regional agents serving Pierce County communities.',
    },
    tips: [
      'Verify coverage for Pierce and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  nemaha: {
    marketNotes:
      'Nemaha County, NE is a rural Nebraska county centered on Auburn with residential, agricultural, and nemaha river basin corridor demand across surrounding communities — not to be confused with Nemaha County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Nemaha County pricing reflects Auburn-area demand, nemaha river basin travel distances, agricultural property logistics, and competition among regional agents serving Nemaha County communities.',
    },
    tips: [
      'Verify coverage for Auburn and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jefferson: {
    marketNotes:
      'Jefferson County, NE is a rural Nebraska county centered on Fairbury with residential, agricultural, and little blue valley corridor demand across surrounding communities — not to be confused with Jefferson County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Jefferson County pricing reflects Fairbury-area demand, little blue valley travel distances, agricultural property logistics, and competition among regional agents serving Jefferson County communities.',
    },
    tips: [
      'Verify coverage for Fairbury and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  thurston: {
    marketNotes:
      'Thurston County is a rural Nebraska county centered on Pender with residential, agricultural, and omaha nation corridor corridor demand across surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Thurston County pricing reflects Pender-area demand, omaha nation corridor travel distances, agricultural property logistics, and competition among regional agents serving Thurston County communities.',
    },
    tips: [
      'Verify coverage for Pender and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  kearney: {
    marketNotes:
      'Kearney County, NE is a rural Nebraska county centered on Minden with residential, agricultural, and platte valley lower corridor demand across surrounding communities — not to be confused with Kearney County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Kearney County pricing reflects Minden-area demand, platte valley lower travel distances, agricultural property logistics, and competition among regional agents serving Kearney County communities.',
    },
    tips: [
      'Verify coverage for Minden and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  burt: {
    marketNotes:
      'Burt County is a rural Nebraska county centered on Tekamah with residential, agricultural, and missouri bluff west corridor demand across surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Burt County pricing reflects Tekamah-area demand, missouri bluff west travel distances, agricultural property logistics, and competition among regional agents serving Burt County communities.',
    },
    tips: [
      'Verify coverage for Tekamah and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  howard: {
    marketNotes:
      'Howard County is a rural Nebraska county centered on St. Paul with residential, agricultural, and loup river mid corridor demand across surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Howard County pricing reflects St. Paul-area demand, loup river mid travel distances, agricultural property logistics, and competition among regional agents serving Howard County communities.',
    },
    tips: [
      'Verify coverage for St. Paul and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  antelope: {
    marketNotes:
      'Antelope County is a rural Nebraska county centered on Neligh with residential, agricultural, and elkhorn valley south corridor demand across surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Antelope County pricing reflects Neligh-area demand, elkhorn valley south travel distances, agricultural property logistics, and competition among regional agents serving Antelope County communities.',
    },
    tips: [
      'Verify coverage for Neligh and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  clay: {
    marketNotes:
      'Clay County, NE is a rural Nebraska county centered on Clay Center with residential, agricultural, and republican river upper corridor demand across surrounding communities — not to be confused with Clay County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Clay County pricing reflects Clay Center-area demand, republican river upper travel distances, agricultural property logistics, and competition among regional agents serving Clay County communities.',
    },
    tips: [
      'Verify coverage for Clay Center and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  stanton: {
    marketNotes:
      'Stanton County, NE is a rural Nebraska county centered on Stanton with residential, agricultural, and elkhorn river south corridor demand across surrounding communities — not to be confused with Stanton County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Stanton County pricing reflects Stanton-area demand, elkhorn river south travel distances, agricultural property logistics, and competition among regional agents serving Stanton County communities.',
    },
    tips: [
      'Verify coverage for Stanton and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  dixon: {
    marketNotes:
      'Dixon County is a rural Nebraska county centered on Ponca with residential, agricultural, and missouri river northwest corridor demand across surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Dixon County pricing reflects Ponca-area demand, missouri river northwest travel distances, agricultural property logistics, and competition among regional agents serving Dixon County communities.',
    },
    tips: [
      'Verify coverage for Ponca and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cherry: {
    marketNotes:
      'Cherry County is a rural Nebraska county centered on Valentine with residential, agricultural, and sandhills north corridor demand across surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Cherry County pricing reflects Valentine-area demand, sandhills north travel distances, agricultural property logistics, and competition among regional agents serving Cherry County communities.',
    },
    tips: [
      'Verify coverage for Valentine and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  fillmore: {
    marketNotes:
      'Fillmore County is a rural Nebraska county centered on Geneva with residential, agricultural, and big blue west corridor demand across surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Fillmore County pricing reflects Geneva-area demand, big blue west travel distances, agricultural property logistics, and competition among regional agents serving Fillmore County communities.',
    },
    tips: [
      'Verify coverage for Geneva and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  boone: {
    marketNotes:
      'Boone County, NE is a rural Nebraska county centered on Albion with residential, agricultural, and elkhorn river basin corridor demand across surrounding communities — not to be confused with Boone County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Boone County pricing reflects Albion-area demand, elkhorn river basin travel distances, agricultural property logistics, and competition among regional agents serving Boone County communities.',
    },
    tips: [
      'Verify coverage for Albion and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  polk: {
    marketNotes:
      'Polk County, NE is a rural Nebraska county centered on Osceola with residential, agricultural, and platte river looped corridor demand across surrounding communities — not to be confused with Polk County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Polk County pricing reflects Osceola-area demand, platte river looped travel distances, agricultural property logistics, and competition among regional agents serving Polk County communities.',
    },
    tips: [
      'Verify coverage for Osceola and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  johnson: {
    marketNotes:
      'Johnson County, NE is a rural Nebraska county centered on Tecumseh with residential, agricultural, and indian creek valley corridor demand across surrounding communities — not to be confused with Johnson County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Johnson County pricing reflects Tecumseh-area demand, indian creek valley travel distances, agricultural property logistics, and competition among regional agents serving Johnson County communities.',
    },
    tips: [
      'Verify coverage for Tecumseh and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  thayer: {
    marketNotes:
      'Thayer County is a rural Nebraska county centered on Hebron with residential, agricultural, and little blue south corridor demand across surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Thayer County pricing reflects Hebron-area demand, little blue south travel distances, agricultural property logistics, and competition among regional agents serving Thayer County communities.',
    },
    tips: [
      'Verify coverage for Hebron and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  arthur: {
    marketNotes:
      'Arthur County is a rural Nebraska county centered on Arthur with residential, agricultural, and sandhills east corridor demand across surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Arthur County pricing reflects Arthur-area demand, sandhills east travel distances, agricultural property logistics, and competition among regional agents serving Arthur County communities.',
    },
    tips: [
      'Verify coverage for Arthur and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  banner: {
    marketNotes:
      'Banner County is a rural Nebraska county centered on Harrisburg with residential, agricultural, and panhandle gateway corridor demand across surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Banner County pricing reflects Harrisburg-area demand, panhandle gateway travel distances, agricultural property logistics, and competition among regional agents serving Banner County communities.',
    },
    tips: [
      'Verify coverage for Harrisburg and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  blaine: {
    marketNotes:
      'Blaine County is a rural Nebraska county centered on Brewster with residential, agricultural, and sandhills northeast corridor demand across surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Blaine County pricing reflects Brewster-area demand, sandhills northeast travel distances, agricultural property logistics, and competition among regional agents serving Blaine County communities.',
    },
    tips: [
      'Verify coverage for Brewster and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  boyd: {
    marketNotes:
      'Boyd County is a rural Nebraska county centered on Butte with residential, agricultural, and missouri niobrara corridor demand across surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Boyd County pricing reflects Butte-area demand, missouri niobrara travel distances, agricultural property logistics, and competition among regional agents serving Boyd County communities.',
    },
    tips: [
      'Verify coverage for Butte and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  brown: {
    marketNotes:
      'Brown County, NE is a rural Nebraska county centered on Ainsworth with residential, agricultural, and niobrara valley corridor demand across surrounding communities — not to be confused with Brown County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Brown County pricing reflects Ainsworth-area demand, niobrara valley travel distances, agricultural property logistics, and competition among regional agents serving Brown County communities.',
    },
    tips: [
      'Verify coverage for Ainsworth and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  chase: {
    marketNotes:
      'Chase County is a rural Nebraska county centered on Imperial with residential, agricultural, and republican river mid corridor demand across surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Chase County pricing reflects Imperial-area demand, republican river mid travel distances, agricultural property logistics, and competition among regional agents serving Chase County communities.',
    },
    tips: [
      'Verify coverage for Imperial and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  deuel: {
    marketNotes:
      'Deuel County, NE is a rural Nebraska county centered on Chappell with residential, agricultural, and high plains southwest corridor demand across surrounding communities — not to be confused with Deuel County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Deuel County pricing reflects Chappell-area demand, high plains southwest travel distances, agricultural property logistics, and competition among regional agents serving Deuel County communities.',
    },
    tips: [
      'Verify coverage for Chappell and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  dundy: {
    marketNotes:
      'Dundy County is a rural Nebraska county centered on Benkelman with residential, agricultural, and republican river far west corridor demand across surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Dundy County pricing reflects Benkelman-area demand, republican river far west travel distances, agricultural property logistics, and competition among regional agents serving Dundy County communities.',
    },
    tips: [
      'Verify coverage for Benkelman and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  franklin: {
    marketNotes:
      'Franklin County, NE is a rural Nebraska county centered on Franklin with residential, agricultural, and republican river lower corridor demand across surrounding communities — not to be confused with Franklin County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Franklin County pricing reflects Franklin-area demand, republican river lower travel distances, agricultural property logistics, and competition among regional agents serving Franklin County communities.',
    },
    tips: [
      'Verify coverage for Franklin and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  frontier: {
    marketNotes:
      'Frontier County is a rural Nebraska county centered on Stockville with residential, agricultural, and republican river upper mid corridor demand across surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Frontier County pricing reflects Stockville-area demand, republican river upper mid travel distances, agricultural property logistics, and competition among regional agents serving Frontier County communities.',
    },
    tips: [
      'Verify coverage for Stockville and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  furnas: {
    marketNotes:
      'Furnas County is a rural Nebraska county centered on Beaver City with residential, agricultural, and republican river central corridor demand across surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Furnas County pricing reflects Beaver City-area demand, republican river central travel distances, agricultural property logistics, and competition among regional agents serving Furnas County communities.',
    },
    tips: [
      'Verify coverage for Beaver City and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  garden: {
    marketNotes:
      'Garden County is a rural Nebraska county centered on Oshkosh with residential, agricultural, and north platte valley north corridor demand across surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Garden County pricing reflects Oshkosh-area demand, north platte valley north travel distances, agricultural property logistics, and competition among regional agents serving Garden County communities.',
    },
    tips: [
      'Verify coverage for Oshkosh and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  garfield: {
    marketNotes:
      'Garfield County, NE is a rural Nebraska county centered on Burwell with residential, agricultural, and sandhills loup corridor demand across surrounding communities — not to be confused with Garfield County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Garfield County pricing reflects Burwell-area demand, sandhills loup travel distances, agricultural property logistics, and competition among regional agents serving Garfield County communities.',
    },
    tips: [
      'Verify coverage for Burwell and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  gosper: {
    marketNotes:
      'Gosper County is a rural Nebraska county centered on Elwood with residential, agricultural, and platte valley southwest corridor demand across surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Gosper County pricing reflects Elwood-area demand, platte valley southwest travel distances, agricultural property logistics, and competition among regional agents serving Gosper County communities.',
    },
    tips: [
      'Verify coverage for Elwood and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  grant: {
    marketNotes:
      'Grant County, NE is a rural Nebraska county centered on Hyannis with residential, agricultural, and sandhills grant corridor demand across surrounding communities — not to be confused with Grant County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Grant County pricing reflects Hyannis-area demand, sandhills grant travel distances, agricultural property logistics, and competition among regional agents serving Grant County communities.',
    },
    tips: [
      'Verify coverage for Hyannis and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  greeley: {
    marketNotes:
      'Greeley County, NE is a rural Nebraska county centered on Greeley with residential, agricultural, and sandhills central north corridor demand across surrounding communities — not to be confused with Greeley County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Greeley County pricing reflects Greeley-area demand, sandhills central north travel distances, agricultural property logistics, and competition among regional agents serving Greeley County communities.',
    },
    tips: [
      'Verify coverage for Greeley and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  harlan: {
    marketNotes:
      'Harlan County, NE is a rural Nebraska county centered on Alma with residential, agricultural, and republican river harlan corridor demand across surrounding communities — not to be confused with Harlan County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Harlan County pricing reflects Alma-area demand, republican river harlan travel distances, agricultural property logistics, and competition among regional agents serving Harlan County communities.',
    },
    tips: [
      'Verify coverage for Alma and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hayes: {
    marketNotes:
      'Hayes County is a rural Nebraska county centered on Hayes Center with residential, agricultural, and platte valley hayes corridor demand across surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Hayes County pricing reflects Hayes Center-area demand, platte valley hayes travel distances, agricultural property logistics, and competition among regional agents serving Hayes County communities.',
    },
    tips: [
      'Verify coverage for Hayes Center and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hitchcock: {
    marketNotes:
      'Hitchcock County is a rural Nebraska county centered on Trenton with residential, agricultural, and republican river hitchcock corridor demand across surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Hitchcock County pricing reflects Trenton-area demand, republican river hitchcock travel distances, agricultural property logistics, and competition among regional agents serving Hitchcock County communities.',
    },
    tips: [
      'Verify coverage for Trenton and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hooker: {
    marketNotes:
      'Hooker County is a rural Nebraska county centered on Mullen with residential, agricultural, and sandhills hooker corridor demand across surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Hooker County pricing reflects Mullen-area demand, sandhills hooker travel distances, agricultural property logistics, and competition among regional agents serving Hooker County communities.',
    },
    tips: [
      'Verify coverage for Mullen and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'keya-paha': {
    marketNotes:
      'Keya Paha County is a rural Nebraska county centered on Springview with residential, agricultural, and niobrara keya paha corridor demand across surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Keya Paha County pricing reflects Springview-area demand, niobrara keya paha travel distances, agricultural property logistics, and competition among regional agents serving Keya Paha County communities.',
    },
    tips: [
      'Verify coverage for Springview and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  kimball: {
    marketNotes:
      'Kimball County, NE is a rural Nebraska county centered on Kimball with residential, agricultural, and high plains kimball corridor demand across surrounding communities — not to be confused with Kimball County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Kimball County pricing reflects Kimball-area demand, high plains kimball travel distances, agricultural property logistics, and competition among regional agents serving Kimball County communities.',
    },
    tips: [
      'Verify coverage for Kimball and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  logan: {
    marketNotes:
      'Logan County, NE is a rural Nebraska county centered on Stapleton with residential, agricultural, and sandhills logan corridor demand across surrounding communities — not to be confused with Logan County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Logan County pricing reflects Stapleton-area demand, sandhills logan travel distances, agricultural property logistics, and competition among regional agents serving Logan County communities.',
    },
    tips: [
      'Verify coverage for Stapleton and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  loup: {
    marketNotes:
      'Loup County is a rural Nebraska county centered on Taylor with residential, agricultural, and loup river lower corridor demand across surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Loup County pricing reflects Taylor-area demand, loup river lower travel distances, agricultural property logistics, and competition among regional agents serving Loup County communities.',
    },
    tips: [
      'Verify coverage for Taylor and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mcpherson: {
    marketNotes:
      'McPherson County is a rural Nebraska county centered on Tryon with residential, agricultural, and sandhills mcpherson corridor demand across surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'McPherson County pricing reflects Tryon-area demand, sandhills mcpherson travel distances, agricultural property logistics, and competition among regional agents serving McPherson County communities.',
    },
    tips: [
      'Verify coverage for Tryon and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  morrill: {
    marketNotes:
      'Morrill County is a rural Nebraska county centered on Bridgeport with residential, agricultural, and north platte scottsbluff east corridor demand across surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Morrill County pricing reflects Bridgeport-area demand, north platte scottsbluff east travel distances, agricultural property logistics, and competition among regional agents serving Morrill County communities.',
    },
    tips: [
      'Verify coverage for Bridgeport and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  nance: {
    marketNotes:
      'Nance County is a rural Nebraska county centered on Fullerton with residential, agricultural, and loup river nance corridor demand across surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Nance County pricing reflects Fullerton-area demand, loup river nance travel distances, agricultural property logistics, and competition among regional agents serving Nance County communities.',
    },
    tips: [
      'Verify coverage for Fullerton and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  nuckolls: {
    marketNotes:
      'Nuckolls County, NE is a rural Nebraska county centered on Nelson with residential, agricultural, and republican river nuckolls corridor demand across surrounding communities — not to be confused with Nuckolls County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Nuckolls County pricing reflects Nelson-area demand, republican river nuckolls travel distances, agricultural property logistics, and competition among regional agents serving Nuckolls County communities.',
    },
    tips: [
      'Verify coverage for Nelson and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  pawnee: {
    marketNotes:
      'Pawnee County, NE is a rural Nebraska county centered on Pawnee City with residential, agricultural, and nemaha river pawnee corridor demand across surrounding communities — not to be confused with Pawnee County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Pawnee County pricing reflects Pawnee City-area demand, nemaha river pawnee travel distances, agricultural property logistics, and competition among regional agents serving Pawnee County communities.',
    },
    tips: [
      'Verify coverage for Pawnee City and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  perkins: {
    marketNotes:
      'Perkins County, NE is a rural Nebraska county centered on Grant with residential, agricultural, and platte valley perkins corridor demand across surrounding communities — not to be confused with Perkins County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Perkins County pricing reflects Grant-area demand, platte valley perkins travel distances, agricultural property logistics, and competition among regional agents serving Perkins County communities.',
    },
    tips: [
      'Verify coverage for Grant and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  rock: {
    marketNotes:
      'Rock County is a rural Nebraska county centered on Bassett with residential, agricultural, and niobrara rock corridor demand across surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Rock County pricing reflects Bassett-area demand, niobrara rock travel distances, agricultural property logistics, and competition among regional agents serving Rock County communities.',
    },
    tips: [
      'Verify coverage for Bassett and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  sheridan: {
    marketNotes:
      'Sheridan County, NE is a rural Nebraska county centered on Rushville with residential, agricultural, and sandhills sheridan corridor demand across surrounding communities — not to be confused with Sheridan County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Sheridan County pricing reflects Rushville-area demand, sandhills sheridan travel distances, agricultural property logistics, and competition among regional agents serving Sheridan County communities.',
    },
    tips: [
      'Verify coverage for Rushville and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  sherman: {
    marketNotes:
      'Sherman County is a rural Nebraska county centered on Loup City with residential, agricultural, and loup river sherman corridor demand across surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Sherman County pricing reflects Loup City-area demand, loup river sherman travel distances, agricultural property logistics, and competition among regional agents serving Sherman County communities.',
    },
    tips: [
      'Verify coverage for Loup City and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  sioux: {
    marketNotes:
      'Sioux County, NE is a rural Nebraska county centered on Harrison with residential, agricultural, and high plains sioux corridor demand across surrounding communities — not to be confused with Sioux County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Sioux County pricing reflects Harrison-area demand, high plains sioux travel distances, agricultural property logistics, and competition among regional agents serving Sioux County communities.',
    },
    tips: [
      'Verify coverage for Harrison and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  thomas: {
    marketNotes:
      'Thomas County is a rural Nebraska county centered on Thedford with residential, agricultural, and sandhills thomas corridor demand across surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Thomas County pricing reflects Thedford-area demand, sandhills thomas travel distances, agricultural property logistics, and competition among regional agents serving Thomas County communities.',
    },
    tips: [
      'Verify coverage for Thedford and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  valley: {
    marketNotes:
      'Valley County is a rural Nebraska county centered on Ord with residential, agricultural, and loup valley ord corridor demand across surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Valley County pricing reflects Ord-area demand, loup valley ord travel distances, agricultural property logistics, and competition among regional agents serving Valley County communities.',
    },
    tips: [
      'Verify coverage for Ord and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  webster: {
    marketNotes:
      'Webster County, NE is a rural Nebraska county centered on Red Cloud with residential, agricultural, and republican river webster corridor demand across surrounding communities — not to be confused with Webster County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Webster County pricing reflects Red Cloud-area demand, republican river webster travel distances, agricultural property logistics, and competition among regional agents serving Webster County communities.',
    },
    tips: [
      'Verify coverage for Red Cloud and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  wheeler: {
    marketNotes:
      'Wheeler County, NE is a rural Nebraska county centered on Bartlett with residential, agricultural, and elkhorn river wheeler corridor demand across surrounding communities — not to be confused with Wheeler County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Wheeler County pricing reflects Bartlett-area demand, elkhorn river wheeler travel distances, agricultural property logistics, and competition among regional agents serving Wheeler County communities.',
    },
    tips: [
      'Verify coverage for Bartlett and surrounding areas before booking.',
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
