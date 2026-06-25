import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Montana county research — batch 1: 25/56 */
export const montanaCountyResearch: Record<string, CuratedCountyResearch> = {
  yellowstone: {
    marketNotes:
      'Yellowstone County is Montana’s most populous county with strong urban, suburban, and residential demand across the Billings metro.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Yellowstone County pricing reflects Billings metro demand, I-90 corridor traffic, energy-sector relocations, and competition among full-service agents serving Yellowstone County communities.',
    },
    tips: [
      'Verify coverage for Billings and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  gallatin: {
    marketNotes:
      'Gallatin County is a rapidly growing county with strong educational, tourism, and residential demand across the Bozeman metro and Gallatin Valley.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,000+',
      avgHourly: '$125–$195/hr for a 2-person crew',
      note: 'Gallatin County pricing reflects Bozeman metro growth, MSU-area turnover, Big Sky gateway traffic, and competition among full-service agents serving Gallatin County communities.',
    },
    tips: [
      'Verify coverage for Bozeman and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  missoula: {
    marketNotes:
      'Missoula County is a western Montana county with strong educational and residential demand across the University of Montana area and Bitterroot gateway communities.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$185/hr for a 2-person crew',
      note: 'Missoula County pricing reflects university-area turnover, I-90 western Montana corridor traffic, and competition among full-service agents serving Missoula County communities.',
    },
    tips: [
      'Verify coverage for Missoula and surrounding areas before booking.',
      'University-area turnover (semester start/end) may affect scheduling — confirm peak-season crew availability.',
      'Confirm coverage for student housing, off-campus apartments, and family homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  flathead: {
    marketNotes:
      'Flathead County is a northwestern Montana county with strong tourism and residential demand across Kalispell and Flathead Lake corridor communities.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$185/hr for a 2-person crew',
      note: 'Flathead County pricing reflects Kalispell metro demand, lakeside tourism traffic, Glacier National Park gateway logistics, and competition among regional agents serving Flathead County communities.',
    },
    tips: [
      'Verify coverage for Kalispell and surrounding areas before booking.',
      'Tourist-season congestion and vacation-rental turnover may affect scheduling — confirm peak-season crew availability.',
      'Confirm insurance for high-value lakeside homes, seasonal properties, and vacation rentals before move day.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cascade: {
    marketNotes:
      'Cascade County is a central Montana county centered on Great Falls with residential and Missouri River corridor demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Cascade County pricing reflects Great Falls-area demand, US-87 and I-15 corridor traffic, and competition among regional agents serving central Montana communities.',
    },
    tips: [
      'Verify coverage for Great Falls and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'lewis-and-clark': {
    marketNotes:
      'Lewis and Clark County is the state capital county with strong governmental and residential demand across Helena and surrounding capital-region communities.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Lewis and Clark County pricing reflects Helena capital-region demand, government-sector relocations, and competition among regional agents serving Lewis and Clark County communities.',
    },
    tips: [
      'Verify coverage for Helena and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  ravalli: {
    marketNotes:
      'Ravalli County is a southwestern Montana county centered on Hamilton with residential demand across Bitterroot Valley communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Ravalli County pricing reflects Hamilton-area demand, US-93 Bitterroot corridor traffic, and competition among regional agents serving southwestern Montana communities.',
    },
    tips: [
      'Verify coverage for Hamilton and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'silver-bow': {
    marketNotes:
      'Silver Bow County is a southwestern Montana county centered on Butte with residential demand across historic mining-city neighborhoods.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Silver Bow County pricing reflects Butte-area demand, I-15 and I-90 corridor traffic, and competition among regional agents serving southwestern Montana communities.',
    },
    tips: [
      'Verify coverage for Butte and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lake: {
    marketNotes:
      'Lake County is a western Montana county centered on Polson with residential and tourism demand along the south Flathead Lake corridor.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Lake County pricing reflects Polson-area demand, Flathead Lake south-shore tourism traffic, and competition among regional agents serving western Montana lakeside communities.',
    },
    tips: [
      'Verify coverage for Polson and surrounding areas before booking.',
      'Tourist-season congestion and vacation-rental turnover may affect scheduling — confirm peak-season crew availability.',
      'Confirm insurance for high-value lakeside homes, seasonal properties, and vacation rentals before move day.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lincoln: {
    marketNotes:
      'Lincoln County is a northwestern Montana county centered on Libby with rural residential demand across Kootenai National Forest corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Lincoln County pricing reflects Libby-area demand, US-2 northwest Montana corridor traffic, and competition among regional agents serving remote northwestern Montana communities.',
    },
    tips: [
      'Verify coverage for Libby and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  park: {
    marketNotes:
      'Park County is a southern Montana county centered on Livingston with residential demand across Yellowstone National Park gateway communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Park County pricing reflects Livingston-area demand, I-90 Yellowstone gateway traffic, and competition among regional agents serving southern Montana corridor communities.',
    },
    tips: [
      'Verify coverage for Livingston and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hill: {
    marketNotes:
      'Hill County is a northern Montana county centered on Havre with residential demand across Hi-Line corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Hill County pricing reflects Havre-area demand, US-2 Hi-Line corridor traffic, and competition among regional agents serving northern Montana communities.',
    },
    tips: [
      'Verify coverage for Havre and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  sanders: {
    marketNotes:
      'Sanders County is a northwestern Montana county centered on Thompson Falls with rural residential demand along the Clark Fork River corridor.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Sanders County pricing reflects Thompson Falls-area demand, remote northwest Montana travel distances, and competition among regional agents serving rural corridor communities.',
    },
    tips: [
      'Verify coverage for Thompson Falls and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jefferson: {
    marketNotes:
      'Jefferson County, MT is a southwestern Montana county centered on Boulder with residential demand across Jefferson Highlands corridor communities — not to be confused with Jefferson County, Colorado.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Jefferson County pricing reflects Boulder-area demand, I-15 corridor traffic, and competition among regional agents serving southwestern Montana communities.',
    },
    tips: [
      'Verify coverage for Boulder and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  glacier: {
    marketNotes:
      'Glacier County is a northern Montana county centered on Cut Bank with residential demand across northern plains corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Glacier County pricing reflects Cut Bank-area demand, US-2 northern plains corridor traffic, and competition among regional agents serving northern Montana communities.',
    },
    tips: [
      'Verify coverage for Cut Bank and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'big-horn': {
    marketNotes:
      'Big Horn County is a southeastern Montana county centered on Hardin with residential demand across Bighorn Basin corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Big Horn County pricing reflects Hardin-area demand, I-90 southeastern Montana corridor traffic, and competition among regional agents serving Crow Reservation gateway communities.',
    },
    tips: [
      'Verify coverage for Hardin and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  custer: {
    marketNotes:
      'Custer County, MT is an eastern Montana county centered on Miles City with residential demand across eastern plains communities — not to be confused with Custer County, Idaho or Colorado.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Custer County pricing reflects Miles City-area demand, I-94 eastern Montana corridor traffic, and competition among regional agents serving eastern plains communities.',
    },
    tips: [
      'Verify coverage for Miles City and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  fergus: {
    marketNotes:
      'Fergus County is a central Montana county centered on Lewistown with residential demand across central Montana prairie communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Fergus County pricing reflects Lewistown-area demand, US-87 and US-191 corridor traffic, and competition among regional agents serving central Montana communities.',
    },
    tips: [
      'Verify coverage for Lewistown and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  richland: {
    marketNotes:
      'Richland County is an eastern Montana county centered on Sidney with residential demand across Bakken energy-corridor gateway communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Richland County pricing reflects Sidney-area demand, energy-sector relocations, and competition among regional agents serving eastern Montana border communities.',
    },
    tips: [
      'Verify coverage for Sidney and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  carbon: {
    marketNotes:
      'Carbon County is a southern Montana county centered on Red Lodge with residential and tourism demand across Beartooth gateway communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Carbon County pricing reflects Red Lodge-area demand, Beartooth Highway seasonal tourism traffic, and competition among regional agents serving southern Montana mountain gateway communities.',
    },
    tips: [
      'Verify coverage for Red Lodge and surrounding areas before booking.',
      'Tourist-season congestion and vacation-rental turnover may affect scheduling — confirm peak-season crew availability.',
      'Confirm insurance for high-value lakeside homes, seasonal properties, and vacation rentals before move day.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  madison: {
    marketNotes:
      'Madison County, MT is a southwestern Montana county centered on Virginia City with residential demand across Madison Valley communities — not to be confused with Madison County, Idaho.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Madison County pricing reflects Virginia City-area demand, US-287 Madison Valley corridor traffic, and competition among regional agents serving southwestern Montana communities.',
    },
    tips: [
      'Verify coverage for Virginia City and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  roosevelt: {
    marketNotes:
      'Roosevelt County is a northeastern Montana county centered on Wolf Point with rural residential demand across Fort Peck corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Roosevelt County pricing reflects Wolf Point-area demand, remote northeastern Montana travel distances, and competition among regional agents serving rural prairie communities.',
    },
    tips: [
      'Verify coverage for Wolf Point and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  beaverhead: {
    marketNotes:
      'Beaverhead County is a southwestern Montana county centered on Dillon with rural residential demand across Big Hole Valley corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Beaverhead County pricing reflects Dillon-area demand, US-287 and I-15 corridor traffic, and competition among regional agents serving southwestern Montana rural communities.',
    },
    tips: [
      'Verify coverage for Dillon and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'deer-lodge': {
    marketNotes:
      'Deer Lodge County is a southwestern Montana county centered on Anaconda with residential demand across Clark Fork headwaters corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Deer Lodge County pricing reflects Anaconda-area demand, I-90 southwestern Montana corridor traffic, and competition among regional agents serving Deer Lodge County communities.',
    },
    tips: [
      'Verify coverage for Anaconda and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  stillwater: {
    marketNotes:
      'Stillwater County is a south-central Montana county centered on Columbus with residential demand across Stillwater Valley corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Stillwater County pricing reflects Columbus-area demand, I-90 south-central Montana corridor traffic, and competition among regional agents serving Stillwater County communities.',
    },
    tips: [
      'Verify coverage for Columbus and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getMontanaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return montanaCountyResearch[countySlug];
}
