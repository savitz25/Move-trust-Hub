import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated North Dakota county research — 25/53 */
export const northDakotaCountyResearch: Record<string, CuratedCountyResearch> = {
  cass: {
    marketNotes:
      'Cass County is North Dakota’s most populous county centered on Fargo with strong suburban, commercial, university-spillover, and Red River Valley residential demand across West Fargo, Horace, and Moorhead-adjacent communities.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Cass County pricing reflects Fargo metro demand, suburban new-construction turnover, I-29 Red River corridor traffic, and competition among full-service agents serving Cass County communities.',
    },
    tips: [
      'Verify coverage for Fargo and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  burleigh: {
    marketNotes:
      'Burleigh County anchors North Dakota’s capital region with strong government-sector, healthcare, commercial, and residential demand across Bismarck, Lincoln, and Missouri River corridor communities.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Burleigh County pricing reflects Bismarck capital-region demand, state-government and healthcare relocations, I-94 Missouri Plateau corridor traffic, and competition among regional agents serving Burleigh County communities.',
    },
    tips: [
      'Verify coverage for Bismarck and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'grand-forks': {
    marketNotes:
      'Grand Forks County, ND is a northeastern Red River Valley county centered on Grand Forks with strong University of North Dakota, student-housing, and residential demand — not to be confused with Grand Forks County in other states.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Grand Forks County pricing reflects university-area turnover, I-29 Red River corridor traffic, student and faculty relocations, and competition among regional agents serving Grand Forks County communities.',
    },
    tips: [
      'Verify coverage for Grand Forks and surrounding areas before booking.',
      'University-area turnover (semester start/end) may affect scheduling — confirm peak-season crew availability.',
      'Confirm coverage for student housing, off-campus apartments, and family homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  ward: {
    marketNotes:
      'Ward County is a north-central North Dakota county centered on Minot with strong Minot Air Force Base, commercial, and residential demand across the Souris River basin and north-central plains corridor.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Ward County pricing reflects Minot metro demand, military and energy-sector relocations, US-83 and US-2 corridor traffic, and competition among regional agents serving Ward County communities.',
    },
    tips: [
      'Verify coverage for Minot and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  williams: {
    marketNotes:
      'Williams County anchors northwestern North Dakota’s Bakken energy basin with strong oilfield, commercial, and residential demand across Williston, Tioga, and US-2 energy-corridor communities.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Williams County pricing reflects Williston Bakken-basin demand, energy-sector workforce relocations, US-2 and US-85 corridor traffic, and competition among regional agents serving Williams County communities.',
    },
    tips: [
      'Verify coverage for Williston and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  morton: {
    marketNotes:
      'Morton County is a south-central North Dakota county centered on Mandan with residential and Bismarck-metro spillover demand across the Missouri River plateau and Standing Rock corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Morton County pricing reflects Mandan-area demand, Bismarck-metro cross-river traffic, I-94 Missouri Plateau corridor logistics, and competition among regional agents serving Morton County communities.',
    },
    tips: [
      'Verify coverage for Mandan and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  stark: {
    marketNotes:
      'Stark County is a southwestern North Dakota county centered on Dickinson with residential, energy-sector, and agricultural demand across the southwest plains and I-94 corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Stark County pricing reflects Dickinson-area demand, energy and agricultural property logistics, I-94 southwest corridor traffic, and competition among regional agents serving Stark County communities.',
    },
    tips: [
      'Verify coverage for Dickinson and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  stutsman: {
    marketNotes:
      'Stutsman County is a central North Dakota county centered on Jamestown with residential, manufacturing, and James River Valley agricultural demand across I-94 corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Stutsman County pricing reflects Jamestown-area demand, James River Valley travel distances, I-94 central corridor traffic, and competition among regional agents serving Stutsman County communities.',
    },
    tips: [
      'Verify coverage for Jamestown and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  richland: {
    marketNotes:
      'Richland County, ND is a southeastern Red River Valley county centered on Wahpeton with residential and agricultural demand across Breckenridge-adjacent border communities — not to be confused with Richland County, Montana or other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Richland County pricing reflects Wahpeton-area demand, Red River border-corridor traffic, agricultural property logistics, and competition among regional agents serving Richland County communities.',
    },
    tips: [
      'Verify coverage for Wahpeton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mckenzie: {
    marketNotes:
      'McKenzie County is a northwestern North Dakota Bakken energy county centered on Watford City with strong oilfield, commercial, and residential demand across Theodore Roosevelt area corridor communities.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'McKenzie County pricing reflects Watford City Bakken-basin demand, energy-sector workforce relocations, remote Badlands corridor travel distances, and competition among regional agents serving McKenzie County communities.',
    },
    tips: [
      'Verify coverage for Watford City and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  rolette: {
    marketNotes:
      'Rolette County is a north-central North Dakota county centered on Rolla with rural residential and Turtle Mountains corridor demand across US-281 and tribal-adjacent communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Rolette County pricing reflects Rolla-area demand, remote north-central travel distances, rural property logistics, and competition among regional agents serving Rolette County communities.',
    },
    tips: [
      'Verify coverage for Rolla and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  ramsey: {
    marketNotes:
      'Ramsey County is a northeastern North Dakota county centered on Devils Lake with residential, tourism, and lake-region demand across Devils Lake basin corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Ramsey County pricing reflects Devils Lake-area demand, lake-region seasonal traffic, US-2 corridor logistics, and competition among regional agents serving Ramsey County communities.',
    },
    tips: [
      'Verify coverage for Devils Lake and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  barnes: {
    marketNotes:
      'Barnes County is a southeastern North Dakota county centered on Valley City with residential and Sheyenne River Valley agricultural demand across I-94 corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Barnes County pricing reflects Valley City-area demand, Sheyenne River Valley travel distances, I-94 corridor traffic, and competition among regional agents serving Barnes County communities.',
    },
    tips: [
      'Verify coverage for Valley City and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  walsh: {
    marketNotes:
      'Walsh County, ND is a northeastern Red River Valley county centered on Grafton with agricultural, residential, and Minnesota border-corridor demand — not to be confused with Walsh County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Walsh County pricing reflects Grafton-area demand, Red River north-valley corridor traffic, agricultural property logistics, and competition among regional agents serving Walsh County communities.',
    },
    tips: [
      'Verify coverage for Grafton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mclean: {
    marketNotes:
      'McLean County, ND is a central North Dakota county centered on Washburn with residential and Missouri River slope demand across Garrison Dam corridor communities — not to be confused with McLean County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'McLean County pricing reflects Washburn-area demand, Missouri Slope travel distances, lake-and-reservoir corridor logistics, and competition among regional agents serving McLean County communities.',
    },
    tips: [
      'Verify coverage for Washburn and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mountrail: {
    marketNotes:
      'Mountrail County, ND is a northwestern North Dakota energy county centered on Stanley with oilfield, ranch, and residential demand across Bakken plateau corridor communities — not to be confused with Mountrail County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Mountrail County pricing reflects Stanley-area Bakken demand, energy-sector workforce relocations, remote plateau travel distances, and competition among regional agents serving Mountrail County communities.',
    },
    tips: [
      'Verify coverage for Stanley and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mercer: {
    marketNotes:
      'Mercer County, ND is a west-central North Dakota county centered on Stanton with residential and coal-country energy demand across Knife River corridor communities — not to be confused with Mercer County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Mercer County pricing reflects Stanton-area demand, coal-country energy logistics, Missouri River slope travel distances, and competition among regional agents serving Mercer County communities.',
    },
    tips: [
      'Verify coverage for Stanton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  traill: {
    marketNotes:
      'Traill County is an eastern North Dakota county centered on Hillsboro with agricultural, residential, and Red River east-valley demand across I-29 corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Traill County pricing reflects Hillsboro-area demand, Red River east-valley corridor traffic, agricultural property logistics, and competition among regional agents serving Traill County communities.',
    },
    tips: [
      'Verify coverage for Hillsboro and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  pembina: {
    marketNotes:
      'Pembina County is North Dakota’s northeasternmost county with seat at Cavalier — distinct from neighboring Cavalier County — and residential demand across Pembina Valley and Canada-border corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Pembina County pricing reflects Cavalier-area demand, Pembina Valley border-corridor traffic, agricultural property logistics, and competition among regional agents serving Pembina County communities.',
    },
    tips: [
      'Verify coverage for Cavalier and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  bottineau: {
    marketNotes:
      'Bottineau County is a north-central North Dakota county centered on Bottineau with residential, tourism, and Turtle Mountains corridor demand across US-281 and Lake Metigoshe gateway communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Bottineau County pricing reflects Bottineau-area demand, Turtle Mountains seasonal traffic, remote north-central travel distances, and competition among regional agents serving Bottineau County communities.',
    },
    tips: [
      'Verify coverage for Bottineau and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  benson: {
    marketNotes:
      'Benson County, ND is a northeastern North Dakota county centered on Minnewaukan with rural residential and Devils Lake basin demand across tribal and lake-region corridor communities — not to be confused with Benson County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Benson County pricing reflects Minnewaukan-area demand, Devils Lake basin travel distances, rural property logistics, and competition among regional agents serving Benson County communities.',
    },
    tips: [
      'Verify coverage for Minnewaukan and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  ransom: {
    marketNotes:
      'Ransom County, ND is a southeastern North Dakota county centered on Lisbon with rural residential and Sheyenne Coteau agricultural demand — not to be confused with Ransom County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Ransom County pricing reflects Lisbon-area demand, Sheyenne Coteau travel distances, agricultural property logistics, and competition among regional agents serving Ransom County communities.',
    },
    tips: [
      'Verify coverage for Lisbon and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lamoure: {
    marketNotes:
      'LaMoure County, ND is a southeastern North Dakota county centered on LaMoure with rural residential and James River south-basin agricultural demand — not to be confused with LaMoure County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'LaMoure County pricing reflects LaMoure-area demand, James River south-basin travel distances, agricultural property logistics, and competition among regional agents serving LaMoure County communities.',
    },
    tips: [
      'Verify coverage for LaMoure and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  dunn: {
    marketNotes:
      'Dunn County, ND is a western North Dakota county centered on Killdeer with energy-sector, ranch, and Badlands plateau residential demand — not to be confused with Dunn County in Wisconsin or other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Dunn County pricing reflects Killdeer-area demand, Badlands plateau travel distances, energy and ranch property logistics, and competition among regional agents serving Dunn County communities.',
    },
    tips: [
      'Verify coverage for Killdeer and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  pierce: {
    marketNotes:
      'Pierce County, ND is a north-central North Dakota county centered on Rugby — the geographic center of North America — with rural residential and agricultural demand across US-2 corridor communities — not to be confused with Pierce County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Pierce County pricing reflects Rugby-area demand, remote north-central travel distances, agricultural property logistics, and competition among regional agents serving Pierce County communities.',
    },
    tips: [
      'Verify coverage for Rugby and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getNorthDakotaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return northDakotaCountyResearch[countySlug];
}
