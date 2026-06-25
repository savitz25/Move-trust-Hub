import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated North Dakota county research — 53/53 (rural/specialized market) */
export const northDakotaCountyResearch: Record<string, CuratedCountyResearch> = {
  cass: {
    marketNotes:
      'Cass County is North Dakota’s most populous county centered on Fargo with strong corporate, university (NDSU), suburban new-construction, and Red River Valley residential demand across West Fargo, Horace, and Moorhead-adjacent communities.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Cass County pricing reflects Fargo metro demand, suburban new-construction turnover, I-29 Red River corridor traffic, and competition among full-service agents serving Cass County communities.',
    },
    tips: [
      'Verify coverage for Fargo, West Fargo, corporate relocations, and NDSU-area moves before booking.',
      'I-29 Red River Valley corridor traffic and winter weather impact scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September), university semester turnover, and month-end lease changeover.',
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
      'Verify coverage for Bismarck, state government transfers, and Missouri River corridor communities before booking.',
      'I-94 Missouri Plateau corridor traffic and winter weather impact scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September), legislative session turnover, and month-end lease changeover.',
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
      'Verify coverage for Williston, Bakken oilfield rotations, and surrounding energy-corridor communities before booking.',
      'Energy-sector rotation windows and US-2/US-85 corridor traffic impact scheduling — confirm crew arrival dates.',
      'Confirm insurance for high-value homes, man-camp housing, and rural properties.',
      'Book early for peak seasons (May–September), energy hiring cycles, and month-end lease changeover.',
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
      'Stark County is a southwestern North Dakota county centered on Dickinson with residential, Bakken-adjacent energy-sector, and agricultural demand across the southwest plains and I-94 corridor communities.',
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
  sargent: {
    marketNotes:
      'Sargent County is a southeastern North Dakota county centered on Forman with rural residential and Red River south-basin agricultural demand across southeastern plains corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Sargent County pricing reflects Forman-area demand, southeastern plains travel distances, agricultural property logistics, and competition among regional agents serving Sargent County communities.',
    },
    tips: [
      'Verify coverage for Forman and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  wells: {
    marketNotes:
      'Wells County, ND is a central North Dakota county centered on Fessenden with rural residential and central plains agricultural demand — not to be confused with Wells County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Wells County pricing reflects Fessenden-area demand, central plains travel distances, agricultural property logistics, and competition among regional agents serving Wells County communities.',
    },
    tips: [
      'Verify coverage for Fessenden and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  sioux: {
    marketNotes:
      'Sioux County, ND is a southern North Dakota county centered on Fort Yates with rural residential and Standing Rock Missouri River corridor demand — not to be confused with Sioux County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Sioux County pricing reflects Fort Yates-area demand, Missouri River corridor travel distances, tribal and rural property logistics, and competition among regional agents serving Sioux County communities.',
    },
    tips: [
      'Verify coverage for Fort Yates and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cavalier: {
    marketNotes:
      'Cavalier County, ND is a northern North Dakota county centered on Langdon with rural residential and northern valley agricultural demand — distinct from Pembina County seat Cavalier — not to be confused with Cavalier County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Cavalier County pricing reflects Langdon-area demand, northern valley travel distances, agricultural property logistics, and competition among regional agents serving Cavalier County communities.',
    },
    tips: [
      'Verify coverage for Langdon and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  emmons: {
    marketNotes:
      'Emmons County is a southern North Dakota county centered on Linton with rural residential and southern plains agricultural demand across Missouri River south-bank corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Emmons County pricing reflects Linton-area demand, southern plains travel distances, agricultural property logistics, and competition among regional agents serving Emmons County communities.',
    },
    tips: [
      'Verify coverage for Linton and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  foster: {
    marketNotes:
      'Foster County is a central North Dakota county centered on Carrington with rural residential and James River central-basin agricultural demand across US-281 corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Foster County pricing reflects Carrington-area demand, James River central-basin travel distances, agricultural property logistics, and competition among regional agents serving Foster County communities.',
    },
    tips: [
      'Verify coverage for Carrington and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  nelson: {
    marketNotes:
      'Nelson County, ND is a northeastern North Dakota county centered on Lakota with rural residential and northern lake-region agricultural demand — not to be confused with Nelson County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Nelson County pricing reflects Lakota-area demand, northern lake-region travel distances, agricultural property logistics, and competition among regional agents serving Nelson County communities.',
    },
    tips: [
      'Verify coverage for Lakota and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  bowman: {
    marketNotes:
      'Bowman County, ND is a southwestern North Dakota county centered on Bowman with rural residential and southwest-corner ranch demand — not to be confused with Bowman County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Bowman County pricing reflects Bowman-area demand, southwest-corner travel distances, ranch property logistics, and competition among regional agents serving Bowman County communities.',
    },
    tips: [
      'Verify coverage for Bowman and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hettinger: {
    marketNotes:
      'Hettinger County, ND is a southwestern North Dakota county serving Hettinger-area communities with rural residential and southwest plateau ranch demand — not to be confused with Hettinger County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Hettinger County pricing reflects Hettinger-area demand, southwest plateau travel distances, ranch property logistics, and competition among regional agents serving Hettinger County communities.',
    },
    tips: [
      'Verify coverage for Hettinger and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mcintosh: {
    marketNotes:
      'McIntosh County, ND is a southeastern North Dakota county centered on Ashley with rural residential and James River south-basin agricultural demand — not to be confused with McIntosh County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'McIntosh County pricing reflects Ashley-area demand, James River south-basin travel distances, agricultural property logistics, and competition among regional agents serving McIntosh County communities.',
    },
    tips: [
      'Verify coverage for Ashley and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  kidder: {
    marketNotes:
      'Kidder County, ND is a central North Dakota county centered on Steele with rural residential and central coteau agricultural demand — not to be confused with Kidder County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Kidder County pricing reflects Steele-area demand, central coteau travel distances, agricultural property logistics, and competition among regional agents serving Kidder County communities.',
    },
    tips: [
      'Verify coverage for Steele and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  renville: {
    marketNotes:
      'Renville County, ND is a northwestern North Dakota county centered on Mohall with rural residential and northwest plains agricultural demand — not to be confused with Renville County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Renville County pricing reflects Mohall-area demand, northwest plains travel distances, agricultural property logistics, and competition among regional agents serving Renville County communities.',
    },
    tips: [
      'Verify coverage for Mohall and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  adams: {
    marketNotes:
      'Adams County, ND is a southwestern North Dakota county centered on Hettinger with rural residential and southwest border ranch demand — not to be confused with Adams County in Colorado or other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Adams County pricing reflects Hettinger-area demand, southwest border travel distances, ranch property logistics, and competition among regional agents serving Adams County communities.',
    },
    tips: [
      'Verify coverage for Hettinger and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  eddy: {
    marketNotes:
      'Eddy County, ND is a central North Dakota county centered on New Rockford with rural residential and central lake-basin agricultural demand — not to be confused with Eddy County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Eddy County pricing reflects New Rockford-area demand, central lake-basin travel distances, agricultural property logistics, and competition among regional agents serving Eddy County communities.',
    },
    tips: [
      'Verify coverage for New Rockford and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  griggs: {
    marketNotes:
      'Griggs County is a central North Dakota county centered on Cooperstown with rural residential and central Red River corridor agricultural demand across US-281 corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Griggs County pricing reflects Cooperstown-area demand, central Red River corridor travel distances, agricultural property logistics, and competition among regional agents serving Griggs County communities.',
    },
    tips: [
      'Verify coverage for Cooperstown and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  grant: {
    marketNotes:
      'Grant County, ND is a southwestern North Dakota county centered on Carson with rural residential and Missouri River southwest-bank ranch demand — not to be confused with Grant County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Grant County pricing reflects Carson-area demand, Missouri southwest corridor travel distances, ranch property logistics, and competition among regional agents serving Grant County communities.',
    },
    tips: [
      'Verify coverage for Carson and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  burke: {
    marketNotes:
      'Burke County, ND is a northwestern North Dakota county centered on Bowbells with rural residential and northwest border agricultural demand — not to be confused with Burke County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Burke County pricing reflects Bowbells-area demand, northwest border travel distances, agricultural property logistics, and competition among regional agents serving Burke County communities.',
    },
    tips: [
      'Verify coverage for Bowbells and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  divide: {
    marketNotes:
      'Divide County, ND is a northwestern North Dakota county centered on Crosby with rural residential and northwest corner agricultural demand — not to be confused with Divide County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Divide County pricing reflects Crosby-area demand, northwest corner travel distances, agricultural property logistics, and competition among regional agents serving Divide County communities.',
    },
    tips: [
      'Verify coverage for Crosby and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  towner: {
    marketNotes:
      'Towner County, ND is a northern North Dakota county centered on Cando with rural residential and northern plains agricultural demand — not to be confused with Towner County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Towner County pricing reflects Cando-area demand, northern plains travel distances, agricultural property logistics, and competition among regional agents serving Towner County communities.',
    },
    tips: [
      'Verify coverage for Cando and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  oliver: {
    marketNotes:
      'Oliver County, ND is a central North Dakota county centered on Center with rural residential and Missouri Slope coal-creek ranch demand — not to be confused with Oliver County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Oliver County pricing reflects Center-area demand, Missouri Slope travel distances, ranch and energy property logistics, and competition among regional agents serving Oliver County communities.',
    },
    tips: [
      'Verify coverage for Center and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'golden-valley': {
    marketNotes:
      'Golden Valley County, ND is a southwestern North Dakota county centered on Beach with rural residential and badlands south ranch demand — not to be confused with Golden Valley County in Montana or other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Golden Valley County pricing reflects Beach-area demand, badlands south travel distances, ranch property logistics, and competition among regional agents serving Golden Valley County communities.',
    },
    tips: [
      'Verify coverage for Beach and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  logan: {
    marketNotes:
      'Logan County, ND is a central North Dakota county centered on Napoleon with rural residential and James River mid-basin agricultural demand — not to be confused with Logan County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Logan County pricing reflects Napoleon-area demand, James River mid-basin travel distances, agricultural property logistics, and competition among regional agents serving Logan County communities.',
    },
    tips: [
      'Verify coverage for Napoleon and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  steele: {
    marketNotes:
      'Steele County, ND is a southeastern North Dakota county centered on Finley with rural residential and central Red River corridor agricultural demand — not to be confused with Steele County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Steele County pricing reflects Finley-area demand, central Red River corridor travel distances, agricultural property logistics, and competition among regional agents serving Steele County communities.',
    },
    tips: [
      'Verify coverage for Finley and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  sheridan: {
    marketNotes:
      'Sheridan County, ND is a central North Dakota county centered on McClusky with rural residential and Missouri Coteau agricultural demand — not to be confused with Sheridan County in Montana or Wyoming.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Sheridan County pricing reflects McClusky-area demand, Missouri Coteau travel distances, agricultural property logistics, and competition among regional agents serving Sheridan County communities.',
    },
    tips: [
      'Verify coverage for McClusky and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  billings: {
    marketNotes:
      'Billings County, ND is a southwestern North Dakota county centered on Medora with rural residential, tourism, and Theodore Roosevelt badlands gateway demand — not to be confused with Billings County in Montana or other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Billings County pricing reflects Medora-area demand, badlands gateway travel distances, tourism and ranch property logistics, and competition among regional agents serving Billings County communities.',
    },
    tips: [
      'Verify coverage for Medora and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  slope: {
    marketNotes:
      'Slope County is one of North Dakota’s smallest counties centered on Amidon with rural residential and southwest frontier ranch demand across remote badlands corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Slope County pricing reflects Amidon-area demand, remote southwest frontier travel distances, ranch property logistics, and competition among regional agents serving Slope County communities.',
    },
    tips: [
      'Verify coverage for Amidon and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  dickey: {
    marketNotes:
      'Dickey County is a southeastern North Dakota county centered on Ellendale with rural residential and southeast coteau agricultural demand across I-94 corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Dickey County pricing reflects Ellendale-area demand, southeast coteau travel distances, agricultural property logistics, and competition among regional agents serving Dickey County communities.',
    },
    tips: [
      'Verify coverage for Ellendale and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mchenry: {
    marketNotes:
      'McHenry County, ND is a north-central North Dakota county centered on Towner with rural residential and northern Souris River agricultural demand — not to be confused with McHenry County in Illinois or other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'McHenry County pricing reflects Towner-area demand, northern Souris River travel distances, agricultural property logistics, and competition among regional agents serving McHenry County communities.',
    },
    tips: [
      'Verify coverage for Towner and surrounding areas before booking.',
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
