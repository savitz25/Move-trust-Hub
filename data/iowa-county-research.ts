import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Iowa county research — 47 counties */
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
  lee: {
    marketNotes:
      'Lee County, IA is a southeastern Iowa Mississippi River county centered on Fort Madison and Keokuk with rural residential, riverfront industrial, and Mississippi River southeast corridor demand across bluff-country communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Lee County pricing reflects Fort Madison and Keokuk-area demand, Mississippi River southeast corridor travel distances, cross-border Missouri logistics, and competition among regional agents serving Lee County communities.',
    },
    tips: [
      'Verify coverage for Fort Madison, Keokuk, and surrounding Lee County areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  boone: {
    marketNotes:
      'Boone County, IA is a central Iowa county centered on Boone with residential, manufacturing, and Des Moines River central corridor agricultural demand across I-35 gateway communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Boone County pricing reflects Boone-area demand, Des Moines River central corridor travel distances, agricultural property logistics, and competition among regional agents serving Boone County communities.',
    },
    tips: [
      'Verify coverage for Boone and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  benton: {
    marketNotes:
      'Benton County is an eastern Iowa county centered on Vinton with rural residential, manufacturing, and Cedar River east corridor agricultural demand across Linn County fringe communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Benton County pricing reflects Vinton-area demand, Cedar River east corridor travel distances, agricultural property logistics, and competition among regional agents serving Benton County communities.',
    },
    tips: [
      'Verify coverage for Vinton and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  plymouth: {
    marketNotes:
      'Plymouth County, IA is a northwest Iowa county centered on Le Mars with Dutch-heritage community, agricultural, and Floyd River valley corridor demand across Siouxland fringe communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Plymouth County pricing reflects Le Mars-area demand, Floyd River valley travel distances, cross-border South Dakota logistics, and competition among regional agents serving Plymouth County communities.',
    },
    tips: [
      'Verify coverage for Le Mars and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  bremer: {
    marketNotes:
      'Bremer County is a northeastern Iowa county centered on Waverly with rural residential, Wartburg College-adjacent, and northern Cedar River corridor agricultural demand across Waterloo fringe communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Bremer County pricing reflects Waverly-area demand, Cedar River north corridor travel distances, agricultural property logistics, and competition among regional agents serving Bremer County communities.',
    },
    tips: [
      'Verify coverage for Waverly and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  washington: {
    marketNotes:
      'Washington County, IA is an eastern Iowa county centered on Washington — not to be confused with Washington County in other states — with rural residential and eastern Skunk River corridor agricultural demand across Johnson County fringe communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Washington County pricing reflects Washington-area demand, Skunk River east corridor travel distances, agricultural property logistics, and competition among regional agents serving Washington County communities.',
    },
    tips: [
      'Verify coverage for Washington and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mahaska: {
    marketNotes:
      'Mahaska County is a south-central Iowa county centered on Oskaloosa with residential, manufacturing, and Des Moines River corridor agricultural demand across regional hub communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Mahaska County pricing reflects Oskaloosa-area demand, Des Moines River corridor travel distances, agricultural property logistics, and competition among regional agents serving Mahaska County communities.',
    },
    tips: [
      'Verify coverage for Oskaloosa and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jones: {
    marketNotes:
      'Jones County, IA is an eastern Iowa county centered on Anamosa with rural residential, state-penitentiary-adjacent, and Wapsipinicon River valley corridor demand — not to be confused with Jones County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Jones County pricing reflects Anamosa-area demand, Wapsipinicon valley corridor travel distances, agricultural property logistics, and competition among regional agents serving Jones County communities.',
    },
    tips: [
      'Verify coverage for Anamosa and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  buchanan: {
    marketNotes:
      'Buchanan County, IA is a northeastern Iowa county centered on Independence with rural residential and Wapsipinicon River north corridor agricultural demand — not to be confused with Buchanan County in Missouri or other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Buchanan County pricing reflects Independence-area demand, Wapsipinicon north corridor travel distances, agricultural property logistics, and competition among regional agents serving Buchanan County communities.',
    },
    tips: [
      'Verify coverage for Independence and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'buena-vista': {
    marketNotes:
      'Buena Vista County is a northwest Iowa county centered on Storm Lake with rural residential, college-town, and Little Sioux River valley agricultural demand across lake-country communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Buena Vista County pricing reflects Storm Lake-area demand, Little Sioux valley corridor travel distances, agricultural property logistics, and competition among regional agents serving Buena Vista County communities.',
    },
    tips: [
      'Verify coverage for Storm Lake and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  carroll: {
    marketNotes:
      'Carroll County, IA is a western Iowa county centered on Carroll with rural residential and Middle Raccoon River valley agricultural demand — not to be confused with Carroll County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Carroll County pricing reflects Carroll-area demand, Middle Raccoon valley corridor travel distances, agricultural property logistics, and competition among regional agents serving Carroll County communities.',
    },
    tips: [
      'Verify coverage for Carroll and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  winneshiek: {
    marketNotes:
      'Winneshiek County is a northeast Iowa county centered on Decorah with rural residential, Luther College-adjacent, tourism, and Upper Iowa River valley corridor demand across bluff-country communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Winneshiek County pricing reflects Decorah-area demand, Upper Iowa River valley corridor travel distances, agricultural and bluff-country property logistics, and competition among regional agents serving Winneshiek County communities.',
    },
    tips: [
      'Verify coverage for Decorah and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  henry: {
    marketNotes:
      'Henry County, IA is a southeastern Iowa county centered on Mount Pleasant with rural residential, Iowa Wesleyan-adjacent, and Skunk River southeast corridor agricultural demand — not to be confused with Henry County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Henry County pricing reflects Mount Pleasant-area demand, Skunk River southeast corridor travel distances, agricultural property logistics, and competition among regional agents serving Henry County communities.',
    },
    tips: [
      'Verify coverage for Mount Pleasant and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jackson: {
    marketNotes:
      'Jackson County, IA is an eastern Iowa county centered on Maquoketa with rural residential, state-park tourism, and Maquoketa River valley corridor demand — not to be confused with Jackson County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Jackson County pricing reflects Maquoketa-area demand, Maquoketa River valley corridor travel distances, cross-border Dubuque corridor logistics, and competition among regional agents serving Jackson County communities.',
    },
    tips: [
      'Verify coverage for Maquoketa and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  fayette: {
    marketNotes:
      'Fayette County, IA is a northeastern Iowa county centered on West Union with rural residential and Turkey River valley corridor agricultural demand — not to be confused with Fayette County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Fayette County pricing reflects West Union-area demand, Turkey River valley corridor travel distances, agricultural property logistics, and competition among regional agents serving Fayette County communities.',
    },
    tips: [
      'Verify coverage for West Union and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cedar: {
    marketNotes:
      'Cedar County, IA is an eastern Iowa county centered on Tipton — not to be confused with Cedar County in Nebraska or other states — with rural residential and southern Cedar River corridor agricultural demand across Quad Cities fringe communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Cedar County pricing reflects Tipton-area demand, Cedar River south corridor travel distances, agricultural property logistics, and competition among regional agents serving Cedar County communities.',
    },
    tips: [
      'Verify coverage for Tipton and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  poweshiek: {
    marketNotes:
      'Poweshiek County is a central Iowa county centered on Montezuma with rural residential, Grinnell-adjacent spillover, and North Skunk River valley corridor agricultural demand across regional hub communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Poweshiek County pricing reflects Montezuma-area demand, North Skunk valley corridor travel distances, agricultural property logistics, and competition among regional agents serving Poweshiek County communities.',
    },
    tips: [
      'Verify coverage for Montezuma and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  dickinson: {
    marketNotes:
      'Dickinson County, IA is a northwest Iowa lakes-country county centered on Spirit Lake and the Okoboji chain with strong resort, vacation-rental, seasonal-property, and cross-border Minnesota corridor demand — not to be confused with Dickinson County in Michigan or other states.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Dickinson County pricing reflects Spirit Lake and Okoboji lakes secondary-metro demand, resort-season corridor traffic, vacation-rental turnover logistics, and competition among regional agents serving Dickinson County communities.',
    },
    tips: [
      'Verify coverage for Spirit Lake and surrounding areas before booking.',
      'Tourist-season congestion and vacation-rental turnover may affect scheduling — confirm peak-season crew availability.',
      'Confirm insurance for high-value gateway homes, seasonal properties, and vacation rentals before move day.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  delaware: {
    marketNotes:
      'Delaware County, IA is an eastern Iowa county centered on Manchester with rural residential and Maquoketa River north corridor agricultural demand — not to be confused with Delaware County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Delaware County pricing reflects Manchester-area demand, Maquoketa River north corridor travel distances, agricultural property logistics, and competition among regional agents serving Delaware County communities.',
    },
    tips: [
      'Verify coverage for Manchester and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  iowa: {
    marketNotes:
      'Iowa County, IA is an eastern Iowa county centered on Marengo — not to be confused with the state of Iowa or Iowa County in Wisconsin — with rural residential and Iowa River corridor agricultural demand across Johnson and Linn County fringe communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Iowa County pricing reflects Marengo-area demand, Iowa River corridor travel distances, agricultural property logistics, and competition among regional agents serving Iowa County communities.',
    },
    tips: [
      'Verify coverage for Marengo and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hardin: {
    marketNotes:
      'Hardin County is a central Iowa county centered on Eldora with rural residential, Iowa River north corridor agricultural demand, and Story County fringe spillover across regional hub communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Hardin County pricing reflects Eldora-area demand, Iowa River north corridor travel distances, agricultural property logistics, and competition among regional agents serving Hardin County communities.',
    },
    tips: [
      'Verify coverage for Eldora and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  crawford: {
    marketNotes:
      'Crawford County, IA is a western Iowa county centered on Denison with rural residential, meatpacking-industry, and Boyer River valley corridor agricultural demand — not to be confused with Crawford County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Crawford County pricing reflects Denison-area demand, Boyer River valley corridor travel distances, agricultural property logistics, and competition among regional agents serving Crawford County communities.',
    },
    tips: [
      'Verify coverage for Denison and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  clay: {
    marketNotes:
      'Clay County, IA is a northwest Iowa county centered on Spencer with rural residential, regional retail-hub, and Little Sioux River north corridor agricultural demand — not to be confused with Clay County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Clay County pricing reflects Spencer-area demand, Little Sioux north corridor travel distances, cross-border South Dakota logistics, and competition among regional agents serving Clay County communities.',
    },
    tips: [
      'Verify coverage for Spencer and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jefferson: {
    marketNotes:
      'Jefferson County, IA is a southeastern Iowa county centered on Fairfield with rural residential, Maharishi University-adjacent, and Skunk River corridor agricultural demand — not to be confused with Jefferson County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Jefferson County pricing reflects Fairfield-area demand, Skunk River corridor travel distances, cross-border Illinois logistics, and competition among regional agents serving Jefferson County communities.',
    },
    tips: [
      'Verify coverage for Fairfield and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hamilton: {
    marketNotes:
      'Hamilton County, IA is a north-central Iowa county centered on Webster City with rural residential, manufacturing, and Boone River valley corridor agricultural demand — not to be confused with Hamilton County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Hamilton County pricing reflects Webster City-area demand, Boone River valley corridor travel distances, agricultural property logistics, and competition among regional agents serving Hamilton County communities.',
    },
    tips: [
      'Verify coverage for Webster City and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mills: {
    marketNotes:
      'Mills County, IA anchors southwest Iowa Omaha metro spillover centered on Glenwood with strong Missouri River cross-border, Council Bluffs-adjacent, and suburban residential demand across river-bluff corridor communities.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Mills County pricing reflects Glenwood secondary-metro demand, Omaha metro Missouri River corridor traffic, cross-border Nebraska logistics, and competition among regional agents serving Mills County communities.',
    },
    tips: [
      'Verify coverage for Glenwood and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
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
