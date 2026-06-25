import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Wyoming county research — 23/23 */
export const wyomingCountyResearch: Record<string, CuratedCountyResearch> = {
  laramie: {
    marketNotes:
      'Laramie County is Wyoming’s most populous county and state capital region with strong government, commercial, suburban, and residential demand across the Cheyenne metro and Front Range corridor.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Laramie County pricing reflects Cheyenne capital-region demand, F.E. Warren AFB and government-sector relocations, I-25 Front Range corridor traffic, and competition among full-service agents serving Laramie County communities.',
    },
    tips: [
      'Verify coverage for Cheyenne and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  natrona: {
    marketNotes:
      'Natrona County is Wyoming’s second-largest county centered on Casper with strong energy-sector, commercial, and residential demand across the North Platte River basin.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Natrona County pricing reflects Casper metro demand, oil-and-gas workforce relocations, I-25 and US-20 corridor traffic, and competition among full-service agents serving Natrona County communities.',
    },
    tips: [
      'Verify coverage for Casper and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  campbell: {
    marketNotes:
      'Campbell County anchors northeastern Wyoming’s Powder River Basin with strong coal, energy-sector, and residential demand across Gillette and surrounding energy-corridor communities.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Campbell County pricing reflects Gillette energy-basin demand, mining-sector workforce relocations, I-90 corridor traffic, and competition among regional agents serving Campbell County communities.',
    },
    tips: [
      'Verify coverage for Gillette and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  sweetwater: {
    marketNotes:
      'Sweetwater County is southwestern Wyoming’s largest county with strong energy-sector, trona-mining, and residential demand across Rock Springs, Green River, and I-80 corridor communities.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Sweetwater County pricing reflects Rock Springs energy-basin demand, trona and natural-gas workforce relocations, I-80 high-desert corridor traffic, and competition among regional agents serving Sweetwater County communities.',
    },
    tips: [
      'Verify coverage for Rock Springs and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  fremont: {
    marketNotes:
      'Fremont County, WY is a central Wyoming county centered on Lander with residential demand across Wind River Country, outdoor-recreation gateway communities, and Wind River Reservation corridor towns — not to be confused with Fremont County, Idaho.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Fremont County pricing reflects Lander-area demand, Wind River corridor travel distances, outdoor-recreation seasonal traffic, and competition among regional agents serving central Wyoming communities.',
    },
    tips: [
      'Verify coverage for Lander and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  albany: {
    marketNotes:
      'Albany County, WY is a southeastern Wyoming county centered on Laramie with strong University of Wyoming, student-housing, and residential demand across the Laramie Plains — not to be confused with Albany County, New York.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Albany County pricing reflects Laramie university-area turnover, I-80 corridor traffic, student and faculty relocations, and competition among regional agents serving Albany County communities.',
    },
    tips: [
      'Verify coverage for Laramie and surrounding areas before booking.',
      'University-area turnover (semester start/end) may affect scheduling — confirm peak-season crew availability.',
      'Confirm coverage for student housing, off-campus apartments, and family homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  sheridan: {
    marketNotes:
      'Sheridan County, WY is a north-central Wyoming county centered on Sheridan with residential demand across Bighorn foothills corridor communities — not to be confused with Sheridan County, Montana.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Sheridan County pricing reflects Sheridan-area demand, I-90 northern Wyoming corridor traffic, ranch and foothills property logistics, and competition among regional agents serving Sheridan County communities.',
    },
    tips: [
      'Verify coverage for Sheridan and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  park: {
    marketNotes:
      'Park County, WY is a northwestern Wyoming county centered on Cody with strong tourism, Yellowstone gateway, and residential demand across Buffalo Bill corridor communities — not to be confused with Park County, Montana or Colorado.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$185/hr for a 2-person crew',
      note: 'Park County pricing reflects Cody tourism demand, Yellowstone National Park gateway traffic, seasonal vacation-rental turnover, and competition among regional agents serving Park County communities.',
    },
    tips: [
      'Verify coverage for Cody and surrounding areas before booking.',
      'Tourist-season congestion and vacation-rental turnover may affect scheduling — confirm peak-season crew availability.',
      'Confirm insurance for high-value gateway homes, seasonal properties, and vacation rentals before move day.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  teton: {
    marketNotes:
      'Teton County, WY anchors the Jackson Hole resort market with luxury homes, vacation properties, ski-town demand, and strong residential turnover across Grand Teton and Yellowstone gateway communities — not to be confused with Teton County, Idaho or Montana.',
    costs: {
      studioRange: '$1,100–$2,500',
      familyRange: '$5,000–$12,000+',
      avgHourly: '$150–$250/hr for a 2-person crew',
      note: 'Teton County pricing reflects Jackson Hole resort demand, ski-season and summer-tourism turnover, Teton Pass mountain-access logistics, and competition among full-service agents serving Teton County luxury and vacation-home communities.',
    },
    tips: [
      'Verify coverage for Jackson and surrounding areas before booking.',
      'Resort-season congestion and ski-town traffic significantly impact scheduling — confirm peak-season crew availability.',
      'Mountain-home and vacation-rental logistics require route planning — confirm parking permits, elevator reservations, and driveway access.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lincoln: {
    marketNotes:
      "Lincoln County, WY is a southwestern Wyoming county centered on Kemmerer with rural residential and fossil-fuel corridor demand across Ham's Fork valley communities — not to be confused with Lincoln County, Montana or Nebraska.",
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Lincoln County pricing reflects Kemmerer-area demand, remote southwestern Wyoming travel distances, energy-sector relocations, and competition among regional agents serving Lincoln County rural communities.',
    },
    tips: [
      'Verify coverage for Kemmerer and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  uinta: {
    marketNotes:
      'Uinta County, WY is a southwestern Wyoming border county centered on Evanston with residential demand across Bear River corridor and I-80 gateway communities — not to be confused with Uintah County, Utah.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Uinta County pricing reflects Evanston border-corridor demand, I-80 cross-state traffic, Utah metro spillover, and competition among regional agents serving Uinta County communities.',
    },
    tips: [
      'Verify coverage for Evanston and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  carbon: {
    marketNotes:
      'Carbon County, WY is a south-central Wyoming county centered on Rawlins with residential and energy-corridor demand across Great Divide Basin and I-80 corridor communities — not to be confused with Carbon County, Montana or Pennsylvania.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Carbon County pricing reflects Rawlins-area demand, I-80 and US-287 corridor traffic, wind-energy and railroad workforce relocations, and competition among regional agents serving Carbon County communities.',
    },
    tips: [
      'Verify coverage for Rawlins and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  converse: {
    marketNotes:
      'Converse County is a central Wyoming county centered on Douglas with residential and energy-corridor demand across North Platte River basin and I-25 corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Converse County pricing reflects Douglas-area demand, oil-and-gas and ranch property logistics, I-25 corridor traffic, and competition among regional agents serving Converse County communities.',
    },
    tips: [
      'Verify coverage for Douglas and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  goshen: {
    marketNotes:
      'Goshen County is a southeastern Wyoming county centered on Torrington with agricultural, residential, and Nebraska border-corridor demand across North Platte Valley communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Goshen County pricing reflects Torrington-area demand, agricultural property logistics, US-26 border-corridor traffic, and competition among regional agents serving Goshen County communities.',
    },
    tips: [
      'Verify coverage for Torrington and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'big-horn': {
    marketNotes:
      'Big Horn County, WY is a north-central Wyoming county centered on Basin with rural residential demand across Bighorn Canyon and northern basin corridor communities — not to be confused with Big Horn County, Montana.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Big Horn County pricing reflects Basin-area demand, remote Bighorn Basin travel distances, ranch property logistics, and competition among regional agents serving Big Horn County rural communities.',
    },
    tips: [
      'Verify coverage for Basin and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  johnson: {
    marketNotes:
      'Johnson County, WY is a north-central Wyoming county centered on Buffalo with ranch, residential, and Powder River Breaks corridor demand — not to be confused with Johnson County, Kansas or Tennessee.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Johnson County pricing reflects Buffalo-area demand, ranch and foothills property logistics, I-25 and I-90 corridor traffic, and competition among regional agents serving Johnson County communities.',
    },
    tips: [
      'Verify coverage for Buffalo and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  sublette: {
    marketNotes:
      'Sublette County is a western Wyoming county centered on Pinedale with energy-sector, ranch, and mountain-corridor residential demand across the Wyoming Range and Green River basin.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Sublette County pricing reflects Pinedale-area demand, natural-gas workforce relocations, mountain-road access logistics, and competition among regional agents serving Sublette County communities.',
    },
    tips: [
      'Verify coverage for Pinedale and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  platte: {
    marketNotes:
      'Platte County, WY is a southeastern Wyoming county centered on Wheatland with agricultural, residential, and Laramie Plains corridor demand — not to be confused with Platte County, Missouri or Nebraska.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Platte County pricing reflects Wheatland-area demand, agricultural and ranch property logistics, I-25 corridor traffic, and competition among regional agents serving Platte County communities.',
    },
    tips: [
      'Verify coverage for Wheatland and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  crook: {
    marketNotes:
      'Crook County is a northeastern Wyoming county centered on Sundance with rural residential demand across Black Hills foothills and northeast highlands corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Crook County pricing reflects Sundance-area demand, remote northeast Wyoming travel distances, ranch property logistics, and competition among regional agents serving Crook County rural communities.',
    },
    tips: [
      'Verify coverage for Sundance and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  washakie: {
    marketNotes:
      'Washakie County is a north-central Wyoming county centered on Worland with agricultural, residential, and Bighorn River corridor demand across the Bighorn Basin.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Washakie County pricing reflects Worland-area demand, sugar-beet and agricultural property logistics, US-16 Bighorn Basin corridor traffic, and competition among regional agents serving Washakie County communities.',
    },
    tips: [
      'Verify coverage for Worland and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  weston: {
    marketNotes:
      'Weston County is a northeastern Wyoming county centered on Newcastle with rural residential demand across Black Hills foothills and energy-corridor gateway communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Weston County pricing reflects Newcastle-area demand, remote northeast Wyoming travel distances, coal and ranch property logistics, and competition among regional agents serving Weston County rural communities.',
    },
    tips: [
      'Verify coverage for Newcastle and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'hot-springs': {
    marketNotes:
      'Hot Springs County is a north-central Wyoming county centered on Thermopolis with tourism, retirement, and residential demand across Bighorn River thermal-springs corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Hot Springs County pricing reflects Thermopolis tourism demand, seasonal visitor traffic, Bighorn Basin corridor logistics, and competition among regional agents serving Hot Springs County communities.',
    },
    tips: [
      'Verify coverage for Thermopolis and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  niobrara: {
    marketNotes:
      'Niobrara County is a southeastern Wyoming county centered on Lusk with rural residential demand across eastern Wyoming plains and Nebraska–South Dakota border corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: "Niobrara County pricing reflects Lusk-area demand, remote eastern Wyoming travel distances, ranch property logistics, and competition among regional agents serving one of Wyoming's least populous counties.",
    },
    tips: [
      'Verify coverage for Lusk and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getWyomingCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return wyomingCountyResearch[countySlug];
}
