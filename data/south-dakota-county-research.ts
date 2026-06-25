import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated South Dakota county research — batch 1: 26/66 */
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
};

export function getSouthDakotaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return southDakotaCountyResearch[countySlug];
}
