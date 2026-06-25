import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Iowa county research — batch 1: 21 counties */
export const iowaCountyResearch: Record<string, CuratedCountyResearch> = {
  polk: {
    marketNotes:
      'Polk County anchors Iowa’s largest metro centered on Des Moines with strong suburban, commercial, insurance-sector, and state-government demand across West Des Moines, Ankeny, Urbandale, and Raccoon River valley corridor communities.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$185/hr for a 2-person crew',
      note: 'Polk County pricing reflects Des Moines metro demand, suburban new-construction turnover, I-35 and I-80 corridor traffic, and competition among full-service agents serving Polk County communities.',
    },
    tips: [
      'Verify coverage for Des Moines and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  linn: {
    marketNotes:
      'Linn County is eastern Iowa’s second-largest metro county centered on Cedar Rapids with strong manufacturing, healthcare, suburban, and Cedar River valley residential demand across Marion-adjacent and corridor communities.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Linn County pricing reflects Cedar Rapids secondary-metro demand, Cedar River valley corridor traffic, manufacturing-sector relocations, and competition among full-service agents serving Linn County communities.',
    },
    tips: [
      'Verify coverage for Cedar Rapids and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  scott: {
    marketNotes:
      'Scott County anchors the Iowa side of the Quad Cities metro centered on Davenport with strong Mississippi River east-bank, Bettendorf-adjacent, and cross-border Illinois corridor demand across riverfront and suburban communities.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Scott County pricing reflects Quad Cities secondary-metro demand, Mississippi River east corridor traffic, cross-border Illinois logistics, and competition among regional agents serving Scott County communities.',
    },
    tips: [
      'Verify coverage for Davenport and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  johnson: {
    marketNotes:
      'Johnson County, IA is a university and healthcare county centered on Iowa City with strong University of Iowa, student-housing, Coralville-adjacent, and Iowa River valley residential demand — not to be confused with Johnson County in other states.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$185/hr for a 2-person crew',
      note: 'Johnson County pricing reflects Iowa City metro demand, university and healthcare relocations, Iowa River valley corridor traffic, and competition among full-service agents serving Johnson County communities.',
    },
    tips: [
      'Verify coverage for Iowa City and surrounding areas before booking.',
      'University-area turnover (semester start/end) may affect scheduling — confirm peak-season crew availability.',
      'Confirm coverage for student housing, off-campus apartments, and family homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'black-hawk': {
    marketNotes:
      'Black Hawk County is a northeastern Iowa metro county centered on Waterloo and Cedar Falls with strong manufacturing, healthcare, and Cedar Valley corridor residential demand across UNI-adjacent and river-valley communities.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Black Hawk County pricing reflects Waterloo–Cedar Falls secondary-metro demand, Cedar Valley corridor traffic, manufacturing-sector relocations, and competition among regional agents serving Black Hawk County communities.',
    },
    tips: [
      'Verify coverage for Waterloo and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  dallas: {
    marketNotes:
      'Dallas County, IA is Iowa’s fastest-growing Des Moines metro west suburban county centered on Waukee and Adel with strong new-construction, corporate spillover, and Raccoon River west corridor demand — not to be confused with Dallas County in Texas or other states.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$185/hr for a 2-person crew',
      note: 'Dallas County pricing reflects Waukee and Adel metro suburban growth demand, Raccoon River west corridor traffic, new-construction turnover, and competition among regional agents serving Dallas County communities.',
    },
    tips: [
      'Verify coverage for Waukee and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  woodbury: {
    marketNotes:
      'Woodbury County anchors northwest Iowa’s Sioux City metro with strong Missouri River northwest corridor, cross-border Nebraska and South Dakota, and industrial riverfront residential demand across Sergeant Bluff-adjacent communities.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Woodbury County pricing reflects Sioux City secondary-metro demand, Missouri River northwest corridor traffic, tri-state cross-border logistics, and competition among regional agents serving Woodbury County communities.',
    },
    tips: [
      'Verify coverage for Sioux City and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  story: {
    marketNotes:
      'Story County, IA is a central Iowa county with seat at Nevada and strong Ames and Iowa State University corridor demand across student-housing, research-campus, and Skunk River valley residential communities.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Story County pricing reflects Ames secondary-metro demand, Iowa State University relocations, Skunk River valley corridor traffic, and competition among regional agents serving Story County communities.',
    },
    tips: [
      'Verify coverage for Ames and surrounding areas before booking.',
      'University-area turnover (semester start/end) may affect scheduling — confirm peak-season crew availability.',
      'Confirm coverage for student housing, off-campus apartments, and family homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  dubuque: {
    marketNotes:
      'Dubuque County is a northeastern Iowa Mississippi River bluff county centered on Dubuque with strong riverfront, tourism, manufacturing, and cross-border Wisconsin and Illinois corridor residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Dubuque County pricing reflects Dubuque secondary-metro demand, Mississippi bluff corridor traffic, cross-border tri-state logistics, and competition among regional agents serving Dubuque County communities.',
    },
    tips: [
      'Verify coverage for Dubuque and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  pottawattamie: {
    marketNotes:
      'Pottawattamie County anchors the Iowa side of the Omaha–Council Bluffs metro with strong Missouri River cross-border, casino-corridor, and suburban spillover demand across Council Bluffs and riverfront communities.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Pottawattamie County pricing reflects Council Bluffs secondary-metro demand, Missouri River Omaha corridor traffic, cross-border Nebraska logistics, and competition among regional agents serving Pottawattamie County communities.',
    },
    tips: [
      'Verify coverage for Council Bluffs and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  warren: {
    marketNotes:
      'Warren County, IA is a Des Moines metro south suburban county centered on Indianola with strong residential spillover, Simpson College-adjacent, and Des Moines south corridor demand — not to be confused with Warren County in other states.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Warren County pricing reflects Indianola secondary-metro demand, Des Moines south corridor traffic, suburban growth logistics, and competition among regional agents serving Warren County communities.',
    },
    tips: [
      'Verify coverage for Indianola and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  clinton: {
    marketNotes:
      'Clinton County, IA is a Mississippi River east corridor county centered on Clinton with rural residential, riverfront industrial, and Quad Cities fringe demand — not to be confused with Clinton County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Clinton County pricing reflects Clinton-area demand, Mississippi River east corridor travel distances, cross-border Illinois logistics, and competition among regional agents serving Clinton County communities.',
    },
    tips: [
      'Verify coverage for Clinton and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'cerro-gordo': {
    marketNotes:
      'Cerro Gordo County is a north-central Iowa county centered on Mason City with residential, manufacturing, and Winnebago River valley agricultural demand across I-35 corridor gateway communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Cerro Gordo County pricing reflects Mason City-area demand, Winnebago River valley travel distances, agricultural property logistics, and competition among regional agents serving Cerro Gordo County communities.',
    },
    tips: [
      'Verify coverage for Mason City and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  muscatine: {
    marketNotes:
      'Muscatine County is a Mississippi River corridor county centered on Muscatine with residential, pearl-button heritage tourism, and riverfront manufacturing demand across eastern Iowa bluff communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Muscatine County pricing reflects Muscatine-area demand, Mississippi River corridor travel distances, riverfront property logistics, and competition among regional agents serving Muscatine County communities.',
    },
    tips: [
      'Verify coverage for Muscatine and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  marshall: {
    marketNotes:
      'Marshall County, IA is a central Iowa county centered on Marshalltown with residential, manufacturing, and Iowa River central corridor agricultural demand — not to be confused with Marshall County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Marshall County pricing reflects Marshalltown-area demand, Iowa River central corridor travel distances, agricultural property logistics, and competition among regional agents serving Marshall County communities.',
    },
    tips: [
      'Verify coverage for Marshalltown and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jasper: {
    marketNotes:
      'Jasper County, IA is a central Iowa county centered on Newton with residential, wind-energy manufacturing, and Skunk River south corridor demand — not to be confused with Jasper County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Jasper County pricing reflects Newton-area demand, Skunk River south corridor travel distances, agricultural property logistics, and competition among regional agents serving Jasper County communities.',
    },
    tips: [
      'Verify coverage for Newton and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'des-moines': {
    marketNotes:
      'Des Moines County, IA is a southeastern Iowa Mississippi River county centered on Burlington — not to be confused with Polk County (Des Moines city) or Des Moines County in other states — with riverfront, manufacturing, and bluff-country residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Des Moines County pricing reflects Burlington-area demand, Mississippi River southeast corridor travel distances, cross-border Illinois logistics, and competition among regional agents serving Des Moines County communities.',
    },
    tips: [
      'Verify coverage for Burlington and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  webster: {
    marketNotes:
      'Webster County, IA is a north-central Iowa county centered on Fort Dodge with residential, gypsum-industry, and Des Moines River north corridor agricultural demand — not to be confused with Webster County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Webster County pricing reflects Fort Dodge-area demand, Des Moines River north corridor travel distances, agricultural property logistics, and competition among regional agents serving Webster County communities.',
    },
    tips: [
      'Verify coverage for Fort Dodge and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  sioux: {
    marketNotes:
      'Sioux County, IA is a northwest Iowa county centered on Orange City — not to be confused with Sioux City (Woodbury County) or Sioux County in other states — with Dutch-heritage community, agricultural, and Big Sioux Valley corridor demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Sioux County pricing reflects Orange City-area demand, Big Sioux Valley travel distances, agricultural property logistics, and competition among regional agents serving Sioux County communities.',
    },
    tips: [
      'Verify coverage for Orange City and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  wapello: {
    marketNotes:
      'Wapello County is a southeastern Iowa county centered on Ottumwa with residential, manufacturing, and Des Moines River south corridor agricultural demand across regional hub communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Wapello County pricing reflects Ottumwa-area demand, Des Moines River south corridor travel distances, agricultural property logistics, and competition among regional agents serving Wapello County communities.',
    },
    tips: [
      'Verify coverage for Ottumwa and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  marion: {
    marketNotes:
      'Marion County, IA is a south-central Iowa county with seat at Knoxville — not to be confused with Marion suburb (Linn County) or Marion County in other states — with rural residential and Des Moines River corridor agricultural demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Marion County pricing reflects Knoxville-area demand, Des Moines River corridor travel distances, agricultural property logistics, and competition among regional agents serving Marion County communities.',
    },
    tips: [
      'Verify coverage for Knoxville and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getIowaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return iowaCountyResearch[countySlug];
}
