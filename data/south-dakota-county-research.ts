import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated South Dakota county research — 66/66 counties (full set) */
export const southDakotaCountyResearch: Record<string, CuratedCountyResearch> = {
  minnehaha: {
    marketNotes:
      'Minnehaha County is South Dakota’s most populous county centered on Sioux Falls with strong suburban, commercial, healthcare, and Big Sioux Valley residential demand across Tea, Brandon, and Harrisburg communities.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Minnehaha County pricing reflects Sioux Falls metro demand, suburban new-construction turnover, I-29 Big Sioux corridor traffic, and competition among full-service agents serving Minnehaha County communities.',
    },
    tips: [
      'Verify coverage for Sioux Falls and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  pennington: {
    marketNotes:
      'Pennington County anchors western South Dakota’s Black Hills gateway with strong tourism, healthcare, military-adjacent, and residential demand across Rapid City, Box Elder, and eastern hills corridor communities.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$185/hr for a 2-person crew',
      note: 'Pennington County pricing reflects Rapid City metro demand, Black Hills gateway traffic, I-90 corridor logistics, and competition among full-service agents serving Pennington County communities.',
    },
    tips: [
      'Verify coverage for Rapid City and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lincoln: {
    marketNotes:
      'Lincoln County, SD is a southeastern Sioux Falls metro county centered on Canton with strong suburban spillover, residential, and commercial demand across Tea, Harrisburg, and Big Sioux south-bank communities — not to be confused with Lincoln County in other states.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$185/hr for a 2-person crew',
      note: 'Lincoln County pricing reflects Sioux Falls metro south-bank demand, suburban growth-corridor traffic, I-29 spillover logistics, and competition among regional agents serving Lincoln County communities.',
    },
    tips: [
      'Verify coverage for Canton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  brookings: {
    marketNotes:
      'Brookings County is an eastern South Dakota county centered on Brookings with strong South Dakota State University, student-housing, and residential demand across Big Sioux east corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Brookings County pricing reflects university-area turnover, I-29 Big Sioux east corridor traffic, student and faculty relocations, and competition among regional agents serving Brookings County communities.',
    },
    tips: [
      'Verify coverage for Brookings and surrounding areas before booking.',
      'University-area turnover (semester start/end) may affect scheduling — confirm peak-season crew availability.',
      'Confirm coverage for student housing, off-campus apartments, and family homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  brown: {
    marketNotes:
      'Brown County, SD is a northeastern South Dakota county centered on Aberdeen with residential, healthcare, and James River north-basin agricultural demand — not to be confused with Brown County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Brown County pricing reflects Aberdeen-area demand, James River north-basin travel distances, US-12 corridor traffic, and competition among regional agents serving Brown County communities.',
    },
    tips: [
      'Verify coverage for Aberdeen and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  meade: {
    marketNotes:
      'Meade County, SD is a western South Dakota county centered on Sturgis with residential, tourism, and Ellsworth Air Force Base corridor demand across northern Black Hills communities — not to be confused with Meade County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Meade County pricing reflects Sturgis-area demand, northern Black Hills corridor traffic, motorcycle-rally seasonal surges, and competition among regional agents serving Meade County communities.',
    },
    tips: [
      'Verify coverage for Sturgis and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lawrence: {
    marketNotes:
      'Lawrence County, SD is a northern Black Hills county with seat at Deadwood and strong tourism, university, and residential demand across Spearfish, Lead, and northern hills gateway communities — not to be confused with Lawrence County in other states.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$185/hr for a 2-person crew',
      note: 'Lawrence County pricing reflects Spearfish and Deadwood tourism demand, Black Hills gateway traffic, seasonal vacation-rental turnover, and competition among regional agents serving Lawrence County communities.',
    },
    tips: [
      'Verify coverage for Spearfish and surrounding areas before booking.',
      'Tourist-season congestion and vacation-rental turnover may affect scheduling — confirm peak-season crew availability.',
      'Confirm insurance for high-value gateway homes, seasonal properties, and vacation rentals before move day.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  codington: {
    marketNotes:
      'Codington County is an eastern South Dakota county centered on Watertown with residential, manufacturing, and glacial lakes corridor demand across US-212 and I-29 corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Codington County pricing reflects Watertown-area demand, glacial lakes corridor traffic, agricultural and lake-region property logistics, and competition among regional agents serving Codington County communities.',
    },
    tips: [
      'Verify coverage for Watertown and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  yankton: {
    marketNotes:
      'Yankton County is a southeastern South Dakota county centered on Yankton with residential, healthcare, and Missouri River southeast corridor demand across Gavins Point Dam and border-adjacent communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Yankton County pricing reflects Yankton-area demand, Missouri River southeast corridor traffic, agricultural property logistics, and competition among regional agents serving Yankton County communities.',
    },
    tips: [
      'Verify coverage for Yankton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  davison: {
    marketNotes:
      'Davison County is a southeastern South Dakota county centered on Mitchell with residential, agricultural, and James River south corridor demand across I-90 corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Davison County pricing reflects Mitchell-area demand, James River south-basin travel distances, I-90 corridor traffic, and competition among regional agents serving Davison County communities.',
    },
    tips: [
      'Verify coverage for Mitchell and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  beadle: {
    marketNotes:
      'Beadle County is a central South Dakota county centered on Huron with residential, agricultural, and James River central-basin demand across US-14 and state-fair corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Beadle County pricing reflects Huron-area demand, James River central-basin travel distances, agricultural property logistics, and competition among regional agents serving Beadle County communities.',
    },
    tips: [
      'Verify coverage for Huron and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hughes: {
    marketNotes:
      'Hughes County, SD anchors South Dakota’s capital region with strong government-sector, healthcare, and Missouri River residential demand across Pierre and Fort Pierre-adjacent communities — not to be confused with Hughes County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Hughes County pricing reflects Pierre capital-region demand, state-government relocations, Missouri River corridor traffic, and competition among regional agents serving Hughes County communities.',
    },
    tips: [
      'Verify coverage for Pierre and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  union: {
    marketNotes:
      'Union County, SD is a southeastern South Dakota county centered on Elk Point with residential and Sioux City metro spillover demand across I-29 border-corridor communities — not to be confused with Union County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Union County pricing reflects Elk Point-area demand, Sioux City metro spillover traffic, I-29 border-corridor logistics, and competition among regional agents serving Union County communities.',
    },
    tips: [
      'Verify coverage for Elk Point and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  clay: {
    marketNotes:
      'Clay County, SD is a southeastern South Dakota county centered on Vermillion with strong University of South Dakota, student-housing, and Missouri River south-bank demand — not to be confused with Clay County in Iowa or other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Clay County pricing reflects university-area turnover, Missouri River south-bank corridor traffic, student and faculty relocations, and competition among regional agents serving Clay County communities.',
    },
    tips: [
      'Verify coverage for Vermillion and surrounding areas before booking.',
      'University-area turnover (semester start/end) may affect scheduling — confirm peak-season crew availability.',
      'Confirm coverage for student housing, off-campus apartments, and family homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  shannon: {
    marketNotes:
      'Oglala Lakota County (historically Shannon County) is a southwestern South Dakota county centered on Pine Ridge with rural residential and southern plains corridor demand across remote tribal and ranch communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Oglala Lakota County pricing reflects Pine Ridge-area demand, remote southern plains travel distances, rural and tribal property logistics, and competition among regional agents serving Oglala Lakota County communities.',
    },
    tips: [
      'Verify coverage for Pine Ridge and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lake: {
    marketNotes:
      'Lake County, SD is an eastern South Dakota county centered on Madison with residential, agricultural, and Big Sioux north corridor demand — not to be confused with Lake County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Lake County pricing reflects Madison-area demand, Big Sioux north corridor travel distances, agricultural property logistics, and competition among regional agents serving Lake County communities.',
    },
    tips: [
      'Verify coverage for Madison and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  butte: {
    marketNotes:
      'Butte County, SD is a northwestern South Dakota county centered on Belle Fourche with ranch, energy-adjacent, and northern plains residential demand — not to be confused with Butte County in Idaho or California.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Butte County pricing reflects Belle Fourche-area demand, northern plains travel distances, ranch property logistics, and competition among regional agents serving Butte County communities.',
    },
    tips: [
      'Verify coverage for Belle Fourche and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  roberts: {
    marketNotes:
      'Roberts County, SD is a northeastern South Dakota county centered on Sisseton with residential, tribal-adjacent, and Lake Traverse corridor demand — not to be confused with Roberts County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Roberts County pricing reflects Sisseton-area demand, Lake Traverse border-corridor traffic, agricultural property logistics, and competition among regional agents serving Roberts County communities.',
    },
    tips: [
      'Verify coverage for Sisseton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  custer: {
    marketNotes:
      'Custer County, SD is a southwestern Black Hills county centered on Custer with strong tourism, vacation-rental, and residential demand across Crazy Horse and Wind Cave gateway communities — not to be confused with Custer County in other states.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$185/hr for a 2-person crew',
      note: 'Custer County pricing reflects Custer tourism demand, southern Black Hills gateway traffic, seasonal vacation-rental turnover, and competition among regional agents serving Custer County communities.',
    },
    tips: [
      'Verify coverage for Custer and surrounding areas before booking.',
      'Tourist-season congestion and vacation-rental turnover may affect scheduling — confirm peak-season crew availability.',
      'Confirm insurance for high-value gateway homes, seasonal properties, and vacation rentals before move day.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  turner: {
    marketNotes:
      'Turner County, SD is a southeastern South Dakota county centered on Parker with rural residential and Big Sioux mid-corridor agricultural demand — not to be confused with Turner County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Turner County pricing reflects Parker-area demand, Big Sioux mid-corridor travel distances, agricultural property logistics, and competition among regional agents serving Turner County communities.',
    },
    tips: [
      'Verify coverage for Parker and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'charles-mix': {
    marketNotes:
      'Charles Mix County is a south-central South Dakota county centered on Lake Andes with rural residential and Missouri plateau agricultural demand across remote ranch and tribal-adjacent corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Charles Mix County pricing reflects Lake Andes-area demand, Missouri plateau travel distances, ranch and rural property logistics, and competition among regional agents serving Charles Mix County communities.',
    },
    tips: [
      'Verify coverage for Lake Andes and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  todd: {
    marketNotes:
      'Todd County, SD is a south-central South Dakota county centered on Mission with rural residential and Rosebud country corridor demand across remote tribal and ranch communities — not to be confused with Todd County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Todd County pricing reflects Mission-area demand, Rosebud country travel distances, rural and tribal property logistics, and competition among regional agents serving Todd County communities.',
    },
    tips: [
      'Verify coverage for Mission and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'fall-river': {
    marketNotes:
      'Fall River County is a southwestern South Dakota county centered on Hot Springs with residential, tourism, and southern hills corridor demand across Wind Cave and Mammoth Site gateway communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Fall River County pricing reflects Hot Springs-area demand, southern hills corridor traffic, tourism and ranch property logistics, and competition among regional agents serving Fall River County communities.',
    },
    tips: [
      'Verify coverage for Hot Springs and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  grant: {
    marketNotes:
      'Grant County, SD is a northeastern South Dakota county centered on Milbank with residential, agricultural, and glacial lakes east corridor demand — not to be confused with Grant County in North Dakota or other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Grant County pricing reflects Milbank-area demand, glacial lakes east corridor traffic, Minnesota border logistics, and competition among regional agents serving Grant County communities.',
    },
    tips: [
      'Verify coverage for Milbank and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hutchinson: {
    marketNotes:
      'Hutchinson County, SD is a southeastern South Dakota county centered on Olivet with rural residential and James River southeast agricultural demand — not to be confused with Hutchinson County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Hutchinson County pricing reflects Olivet-area demand, James River southeast travel distances, agricultural property logistics, and competition among regional agents serving Hutchinson County communities.',
    },
    tips: [
      'Verify coverage for Olivet and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'bon-homme': {
    marketNotes:
      'Bon Homme County is a southeastern South Dakota county centered on Tyndall with rural residential and Missouri bottomlands agricultural demand across remote river-bluff corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Bon Homme County pricing reflects Tyndall-area demand, Missouri bottomlands travel distances, agricultural property logistics, and competition among regional agents serving Bon Homme County communities.',
    },
    tips: [
      'Verify coverage for Tyndall and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hamlin: {
    marketNotes:
      'Hamlin County is an eastern South Dakota county centered on Hayti with rural residential and Big Sioux west agricultural demand across remote glacial-lakes corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Hamlin County pricing reflects Hayti-area demand, Big Sioux west travel distances, agricultural property logistics, and competition among regional agents serving Hamlin County communities.',
    },
    tips: [
      'Verify coverage for Hayti and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  moody: {
    marketNotes:
      'Moody County is an eastern South Dakota county centered on Flandreau with rural residential and Big Sioux central agricultural demand across I-29 corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Moody County pricing reflects Flandreau-area demand, Big Sioux central corridor traffic, agricultural property logistics, and competition among regional agents serving Moody County communities.',
    },
    tips: [
      'Verify coverage for Flandreau and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  spink: {
    marketNotes:
      'Spink County is a northeastern South Dakota county centered on Redfield with rural residential and James River upper-basin agricultural demand across US-281 corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Spink County pricing reflects Redfield-area demand, James River upper-basin travel distances, agricultural property logistics, and competition among regional agents serving Spink County communities.',
    },
    tips: [
      'Verify coverage for Redfield and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mccook: {
    marketNotes:
      'McCook County is a southeastern South Dakota county centered on Salem with rural residential and Big Sioux southwest agricultural demand across remote prairie corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'McCook County pricing reflects Salem-area demand, Big Sioux southwest travel distances, agricultural property logistics, and competition among regional agents serving McCook County communities.',
    },
    tips: [
      'Verify coverage for Salem and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  tripp: {
    marketNotes:
      'Tripp County is a south-central South Dakota county centered on Winner with rural residential and Rosebud plateau ranch demand across remote Missouri River bluff corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Tripp County pricing reflects Winner-area demand, Rosebud plateau travel distances, ranch property logistics, and competition among regional agents serving Tripp County communities.',
    },
    tips: [
      'Verify coverage for Winner and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  day: {
    marketNotes:
      'Day County is a northeastern South Dakota county centered on Webster with rural residential and glacial lakes west agricultural demand across remote lake-country corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Day County pricing reflects Webster-area demand, glacial lakes west travel distances, agricultural property logistics, and competition among regional agents serving Day County communities.',
    },
    tips: [
      'Verify coverage for Webster and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  dewey: {
    marketNotes:
      'Dewey County, SD is a northwestern South Dakota county centered on Timber Lake with rural residential and Cheyenne River ranch demand across remote reservation-adjacent corridor communities — not to be confused with Dewey County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Dewey County pricing reflects Timber Lake-area demand, Cheyenne River travel distances, ranch and tribal property logistics, and competition among regional agents serving Dewey County communities.',
    },
    tips: [
      'Verify coverage for Timber Lake and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  kingsbury: {
    marketNotes:
      'Kingsbury County is an eastern South Dakota county centered on De Smet with rural residential and Big Sioux upper agricultural demand across historic prairie corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Kingsbury County pricing reflects De Smet-area demand, Big Sioux upper travel distances, agricultural property logistics, and competition among regional agents serving Kingsbury County communities.',
    },
    tips: [
      'Verify coverage for De Smet and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  brule: {
    marketNotes:
      'Brule County is a central South Dakota county centered on Chamberlain with rural residential and Missouri River central corridor demand across I-90 bridge gateway communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Brule County pricing reflects Chamberlain-area demand, Missouri River central corridor traffic, agricultural property logistics, and competition among regional agents serving Brule County communities.',
    },
    tips: [
      'Verify coverage for Chamberlain and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  walworth: {
    marketNotes:
      'Walworth County, SD is a north-central South Dakota county centered on Selby with rural residential and Missouri coteau agricultural demand across remote border-adjacent corridor communities — not to be confused with Walworth County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Walworth County pricing reflects Selby-area demand, Missouri coteau travel distances, North Dakota border logistics, and competition among regional agents serving Walworth County communities.',
    },
    tips: [
      'Verify coverage for Selby and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  deuel: {
    marketNotes:
      'Deuel County, SD is an eastern South Dakota county centered on Clear Lake with rural residential and glacial lakes north agricultural demand across remote lake-country corridor communities — not to be confused with Deuel County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Deuel County pricing reflects Clear Lake-area demand, glacial lakes north travel distances, agricultural property logistics, and competition among regional agents serving Deuel County communities.',
    },
    tips: [
      'Verify coverage for Clear Lake and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  marshall: {
    marketNotes:
      'Marshall County, SD is a northeastern South Dakota county centered on Britton with rural residential and Coteau des Prairies agricultural demand across remote border corridor communities — not to be confused with Marshall County in Minnesota, North Dakota, or other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Marshall County pricing reflects Britton-area demand, Coteau des Prairies travel distances, North Dakota border logistics, and competition among regional agents serving Marshall County communities.',
    },
    tips: [
      'Verify coverage for Britton and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  clark: {
    marketNotes:
      'Clark County, SD is an eastern South Dakota county centered on Clark with rural residential and glacial lakes central agricultural demand across remote lake-country corridor communities — not to be confused with Clark County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Clark County pricing reflects Clark-area demand, glacial lakes central travel distances, agricultural property logistics, and competition among regional agents serving Clark County communities.',
    },
    tips: [
      'Verify coverage for Clark and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  edmunds: {
    marketNotes:
      'Edmunds County, SD is a northeastern South Dakota county centered on Ipswich with rural residential and James River northeast agricultural demand across remote border-adjacent corridor communities — not to be confused with Edmunds County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Edmunds County pricing reflects Ipswich-area demand, James River northeast travel distances, North Dakota border logistics, and competition among regional agents serving Edmunds County communities.',
    },
    tips: [
      'Verify coverage for Ipswich and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  gregory: {
    marketNotes:
      'Gregory County, SD is a south-central South Dakota county centered on Gregory with rural residential and Missouri River south agricultural demand across remote ranch corridor communities — not to be confused with Gregory County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Gregory County pricing reflects Gregory-area demand, Missouri River south travel distances, ranch property logistics, and competition among regional agents serving Gregory County communities.',
    },
    tips: [
      'Verify coverage for Gregory and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  corson: {
    marketNotes:
      'Corson County, SD is a north-central South Dakota county centered on McIntosh with rural residential and Standing Rock corridor ranch demand across remote reservation-adjacent communities — not to be confused with Corson County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Corson County pricing reflects McIntosh-area demand, Standing Rock corridor travel distances, ranch and tribal property logistics, and competition among regional agents serving Corson County communities.',
    },
    tips: [
      'Verify coverage for McIntosh and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lyman: {
    marketNotes:
      'Lyman County, SD is a central South Dakota county centered on Kennebec with rural residential and White River plateau ranch demand across remote Missouri River terrace corridor communities — not to be confused with Lyman County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Lyman County pricing reflects Kennebec-area demand, White River plateau travel distances, ranch property logistics, and competition among regional agents serving Lyman County communities.',
    },
    tips: [
      'Verify coverage for Kennebec and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hanson: {
    marketNotes:
      'Hanson County, SD is a southeastern South Dakota county centered on Alexandria with rural residential and James River southeast agricultural demand across remote prairie corridor communities — not to be confused with Hanson County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Hanson County pricing reflects Alexandria-area demand, James River southeast travel distances, agricultural property logistics, and competition among regional agents serving Hanson County communities.',
    },
    tips: [
      'Verify coverage for Alexandria and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  bennett: {
    marketNotes:
      'Bennett County, SD is a southwestern South Dakota county centered on Martin with rural residential and Pine Ridge east corridor demand across remote tribal and ranch communities — not to be confused with Bennett County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Bennett County pricing reflects Martin-area demand, Pine Ridge east travel distances, ranch and tribal property logistics, and competition among regional agents serving Bennett County communities.',
    },
    tips: [
      'Verify coverage for Martin and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hand: {
    marketNotes:
      'Hand County, SD is a central South Dakota county centered on Miller with rural residential and James River hand-basin agricultural demand across remote prairie corridor communities — not to be confused with Hand County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Hand County pricing reflects Miller-area demand, James River hand-basin travel distances, agricultural property logistics, and competition among regional agents serving Hand County communities.',
    },
    tips: [
      'Verify coverage for Miller and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  stanley: {
    marketNotes:
      'Stanley County, SD is a central South Dakota county centered on Fort Pierre with rural residential and capital Missouri west corridor demand across Missouri River bluff gateway communities — not to be confused with Stanley County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Stanley County pricing reflects Fort Pierre-area demand, capital Missouri west corridor traffic, ranch property logistics, and competition among regional agents serving Stanley County communities.',
    },
    tips: [
      'Verify coverage for Fort Pierre and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  douglas: {
    marketNotes:
      'Douglas County, SD is a southeastern South Dakota county centered on Armour with rural residential and James River Douglas agricultural demand across remote Missouri plateau corridor communities — not to be confused with Douglas County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Douglas County pricing reflects Armour-area demand, James River Douglas travel distances, agricultural property logistics, and competition among regional agents serving Douglas County communities.',
    },
    tips: [
      'Verify coverage for Armour and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  perkins: {
    marketNotes:
      'Perkins County, SD is a northwestern South Dakota county centered on Bison with rural residential and northwest plains ranch demand across remote border-adjacent corridor communities — not to be confused with Perkins County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Perkins County pricing reflects Bison-area demand, northwest plains travel distances, North Dakota and Wyoming border logistics, and competition among regional agents serving Perkins County communities.',
    },
    tips: [
      'Verify coverage for Bison and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  aurora: {
    marketNotes:
      'Aurora County, SD is a southeastern South Dakota county centered on Plankinton with rural residential and James River Aurora agricultural demand across remote prairie corridor communities — not to be confused with Aurora County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Aurora County pricing reflects Plankinton-area demand, James River Aurora travel distances, agricultural property logistics, and competition among regional agents serving Aurora County communities.',
    },
    tips: [
      'Verify coverage for Plankinton and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jackson: {
    marketNotes:
      'Jackson County, SD is a southwestern South Dakota county centered on Kadoka with rural residential and badlands east corridor demand across remote ranch and tourism gateway communities — not to be confused with Jackson County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Jackson County pricing reflects Kadoka-area demand, badlands east travel distances, ranch property logistics, and competition among regional agents serving Jackson County communities.',
    },
    tips: [
      'Verify coverage for Kadoka and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  sanborn: {
    marketNotes:
      'Sanborn County, SD is a southeastern South Dakota county centered on Woonsocket with rural residential and James River Sanborn agricultural demand across remote prairie corridor communities — not to be confused with Sanborn County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Sanborn County pricing reflects Woonsocket-area demand, James River Sanborn travel distances, agricultural property logistics, and competition among regional agents serving Sanborn County communities.',
    },
    tips: [
      'Verify coverage for Woonsocket and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  ziebach: {
    marketNotes:
      'Ziebach County, SD is a northwestern South Dakota county centered on Dupree with rural residential and Cheyenne River breaks corridor demand across remote tribal and ranch communities — not to be confused with Ziebach County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Ziebach County pricing reflects Dupree-area demand, Cheyenne River breaks travel distances, ranch and tribal property logistics, and competition among regional agents serving Ziebach County communities.',
    },
    tips: [
      'Verify coverage for Dupree and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mcpherson: {
    marketNotes:
      'McPherson County, SD is a north-central South Dakota county centered on Leola with rural residential and James River McPherson agricultural demand across remote border-adjacent corridor communities — not to be confused with McPherson County in Kansas or North Dakota.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'McPherson County pricing reflects Leola-area demand, James River McPherson travel distances, North Dakota border logistics, and competition among regional agents serving McPherson County communities.',
    },
    tips: [
      'Verify coverage for Leola and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  potter: {
    marketNotes:
      'Potter County, SD is a central South Dakota county centered on Gettysburg with rural residential and capital Missouri east agricultural demand across remote prairie corridor communities — not to be confused with Potter County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Potter County pricing reflects Gettysburg-area demand, capital Missouri east travel distances, agricultural property logistics, and competition among regional agents serving Potter County communities.',
    },
    tips: [
      'Verify coverage for Gettysburg and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  miner: {
    marketNotes:
      'Miner County, SD is an eastern South Dakota county centered on Howard with rural residential and Big Sioux Miner agricultural demand across remote prairie corridor communities — not to be confused with Miner County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Miner County pricing reflects Howard-area demand, Big Sioux Miner travel distances, agricultural property logistics, and competition among regional agents serving Miner County communities.',
    },
    tips: [
      'Verify coverage for Howard and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mellette: {
    marketNotes:
      'Mellette County, SD is a south-central South Dakota county centered on White River with rural residential and Rosebud south corridor demand across remote tribal and ranch communities — not to be confused with Mellette County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Mellette County pricing reflects White River-area demand, Rosebud south travel distances, ranch and tribal property logistics, and competition among regional agents serving Mellette County communities.',
    },
    tips: [
      'Verify coverage for White River and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  faulk: {
    marketNotes:
      'Faulk County, SD is a north-central South Dakota county centered on Faulkton with rural residential and James River Faulk agricultural demand across remote prairie corridor communities — not to be confused with Faulk County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Faulk County pricing reflects Faulkton-area demand, James River Faulk travel distances, agricultural property logistics, and competition among regional agents serving Faulk County communities.',
    },
    tips: [
      'Verify coverage for Faulkton and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  buffalo: {
    marketNotes:
      'Buffalo County, SD is a central South Dakota county centered on Gann Valley with rural residential and James River Buffalo agricultural demand across remote prairie corridor communities — not to be confused with Buffalo County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Buffalo County pricing reflects Gann Valley-area demand, James River Buffalo travel distances, agricultural property logistics, and competition among regional agents serving Buffalo County communities.',
    },
    tips: [
      'Verify coverage for Gann Valley and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  haakon: {
    marketNotes:
      'Haakon County, SD is a western South Dakota county centered on Philip with rural residential and western plains ranch demand across remote badlands-adjacent corridor communities — not to be confused with Haakon County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Haakon County pricing reflects Philip-area demand, western plains travel distances, ranch property logistics, and competition among regional agents serving Haakon County communities.',
    },
    tips: [
      'Verify coverage for Philip and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jerauld: {
    marketNotes:
      'Jerauld County, SD is a southeastern South Dakota county centered on Wessington Springs with rural residential and James River Jerauld agricultural demand across remote prairie corridor communities — not to be confused with Jerauld County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Jerauld County pricing reflects Wessington Springs-area demand, James River Jerauld travel distances, agricultural property logistics, and competition among regional agents serving Jerauld County communities.',
    },
    tips: [
      'Verify coverage for Wessington Springs and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  sully: {
    marketNotes:
      'Sully County, SD is a central South Dakota county centered on Onida with rural residential and Missouri River Sully agricultural demand across remote river-bluff corridor communities — not to be confused with Sully County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Sully County pricing reflects Onida-area demand, Missouri River Sully travel distances, agricultural property logistics, and competition among regional agents serving Sully County communities.',
    },
    tips: [
      'Verify coverage for Onida and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  campbell: {
    marketNotes:
      'Campbell County, SD is a north-central South Dakota county centered on Mound City with rural residential and Missouri coteau north agricultural demand across remote North Dakota border corridor communities — not to be confused with Campbell County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Campbell County pricing reflects Mound City-area demand, Missouri coteau north travel distances, North Dakota border logistics, and competition among regional agents serving Campbell County communities.',
    },
    tips: [
      'Verify coverage for Mound City and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  harding: {
    marketNotes:
      'Harding County, SD is a northwestern South Dakota county centered on Buffalo with rural residential and Powder River breaks ranch demand across remote Wyoming and Montana border corridor communities — not to be confused with Harding County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Harding County pricing reflects Buffalo-area demand, Powder River breaks travel distances, Wyoming and Montana border logistics, and competition among regional agents serving Harding County communities.',
    },
    tips: [
      'Verify coverage for Buffalo and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hyde: {
    marketNotes:
      'Hyde County, SD is a central South Dakota county centered on Highmore with rural residential and James River Hyde agricultural demand across remote prairie corridor communities — not to be confused with Hyde County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Hyde County pricing reflects Highmore-area demand, James River Hyde travel distances, agricultural property logistics, and competition among regional agents serving Hyde County communities.',
    },
    tips: [
      'Verify coverage for Highmore and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jones: {
    marketNotes:
      'Jones County, SD is a central South Dakota county centered on Murdo with rural residential and White River badlands corridor demand across remote ranch and tourism gateway communities — not to be confused with Jones County in other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Jones County pricing reflects Murdo-area demand, White River badlands travel distances, ranch property logistics, and competition among regional agents serving Jones County communities.',
    },
    tips: [
      'Verify coverage for Murdo and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getSouthDakotaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return southDakotaCountyResearch[countySlug];
}
