import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Montana county research — 56/56 complete */
export const montanaCountyResearch: Record<string, CuratedCountyResearch> = {
  yellowstone: {
    marketNotes:
      'Yellowstone County anchors Montana’s highest-value market — the Billings regional hub. Corporate and energy-sector relocations, agricultural corridor logistics, and I-90 east-west transfers distinguish Yellowstone from western university counties and remote Hi-Line communities.',
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
      'Gallatin County is Montana’s fastest-growing market — the Bozeman metro and Gallatin Valley. MSU university turnover, Big Sky tourism gateway logistics, outdoor-lifestyle family relocations, and Yellowstone National Park corridor moves distinguish Gallatin from Billings hub demand.',
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
      'Missoula County is western Montana’s primary population center — university-area turnover, Bitterroot gateway communities, outdoor-lifestyle relocations, and Glacier corridor spillover distinguish Missoula from eastern plains counties and Bozeman growth corridors.',
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
      'Cascade County anchors central Montana around Great Falls — Malmstrom AFB military PCS moves, agricultural corridor logistics, and Missouri River regional hub transfers distinguish Cascade from western tourism counties and eastern energy-belt communities.',
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
  broadwater: {
    marketNotes:
      'Broadwater County is a central Montana county centered on Townsend with rural residential demand across Missouri River headwaters corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Broadwater County pricing reflects Townsend-area demand, I-15 corridor traffic, and competition among regional agents serving central Montana rural communities.',
    },
    tips: [
      'Verify coverage for Townsend and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  dawson: {
    marketNotes:
      'Dawson County is an eastern Montana county centered on Glendive with rural residential demand along the Yellowstone River eastern corridor.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Dawson County pricing reflects Glendive-area demand, I-94 eastern Montana corridor traffic, and competition among regional agents serving eastern plains communities.',
    },
    tips: [
      'Verify coverage for Glendive and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  rosebud: {
    marketNotes:
      'Rosebud County is an eastern Montana county centered on Forsyth with rural residential demand across southeastern Montana corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Rosebud County pricing reflects Forsyth-area demand, I-94 corridor traffic, and competition among regional agents serving southeastern Montana communities.',
    },
    tips: [
      'Verify coverage for Forsyth and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  valley: {
    marketNotes:
      'Valley County, MT is a northeastern Montana county centered on Glasgow with rural residential demand across Hi-Line corridor communities — not to be confused with Valley County, Idaho.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Valley County pricing reflects Glasgow-area demand, US-2 Hi-Line corridor traffic, and competition among regional agents serving northeastern Montana communities.',
    },
    tips: [
      'Verify coverage for Glasgow and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  powell: {
    marketNotes:
      'Powell County is a southwestern Montana county with seat at Deer Lodge (distinct from Deer Lodge County / Anaconda) with rural residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Powell County pricing reflects Deer Lodge-area demand, I-90 corridor traffic, and competition among regional agents serving southwestern Montana communities.',
    },
    tips: [
      'Verify coverage for Deer Lodge and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  blaine: {
    marketNotes:
      'Blaine County, MT is a northern Montana county centered on Chinook with rural residential demand — not to be confused with Blaine County, Idaho (Sun Valley).',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Blaine County pricing reflects Chinook-area demand, US-2 Milk River corridor traffic, and competition among regional agents serving northern Montana communities.',
    },
    tips: [
      'Verify coverage for Chinook and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  teton: {
    marketNotes:
      'Teton County, MT is a north-central Montana county centered on Choteau with rural residential demand along the Rocky Mountain Front — not to be confused with Teton County, Idaho or Wyoming.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Teton County pricing reflects Choteau-area demand, US-89 Rocky Mountain Front corridor traffic, and competition among regional agents serving north-central Montana communities.',
    },
    tips: [
      'Verify coverage for Choteau and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  pondera: {
    marketNotes:
      'Pondera County is a north-central Montana county centered on Conrad with rural residential demand across northern plains corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Pondera County pricing reflects Conrad-area demand, US-2 and US-89 corridor traffic, and competition among regional agents serving north-central Montana communities.',
    },
    tips: [
      'Verify coverage for Conrad and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  chouteau: {
    marketNotes:
      'Chouteau County is a north-central Montana county centered on Fort Benton with rural residential demand along the Missouri Breaks corridor.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Chouteau County pricing reflects Fort Benton-area demand, Missouri River corridor logistics, and competition among regional agents serving north-central Montana communities.',
    },
    tips: [
      'Verify coverage for Fort Benton and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  musselshell: {
    marketNotes:
      'Musselshell County is a central Montana county centered on Roundup with rural residential demand across Musselshell Valley corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Musselshell County pricing reflects Roundup-area demand, US-87 corridor traffic, and competition among regional agents serving central Montana rural communities.',
    },
    tips: [
      'Verify coverage for Roundup and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  toole: {
    marketNotes:
      'Toole County is a northern Montana county centered on Shelby with rural residential demand across Marias Pass corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Toole County pricing reflects Shelby-area demand, I-15 and US-2 corridor traffic, and competition among regional agents serving northern Montana border communities.',
    },
    tips: [
      'Verify coverage for Shelby and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mineral: {
    marketNotes:
      'Mineral County, MT is a western Montana county centered on Superior with rural residential demand — not to be confused with Mineral County, Nevada or West Virginia.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Mineral County pricing reflects Superior-area demand, I-90 western Montana corridor traffic, and competition among regional agents serving Clark Fork corridor communities.',
    },
    tips: [
      'Verify coverage for Superior and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  phillips: {
    marketNotes:
      'Phillips County, MT is a northern Montana county centered on Malta with rural residential demand — not to be confused with Phillips County, Pennsylvania.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Phillips County pricing reflects Malta-area demand, US-2 Hi-Line corridor traffic, and competition among regional agents serving northern Montana prairie communities.',
    },
    tips: [
      'Verify coverage for Malta and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'sweet-grass': {
    marketNotes:
      'Sweet Grass County is a south-central Montana county centered on Big Timber with rural residential demand along the Yellowstone River south corridor.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Sweet Grass County pricing reflects Big Timber-area demand, I-90 corridor traffic, and competition among regional agents serving south-central Montana communities.',
    },
    tips: [
      'Verify coverage for Big Timber and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  granite: {
    marketNotes:
      'Granite County, MT is a southwestern Montana county centered on Philipsburg with rural residential demand — not to be confused with Granite County, Utah.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Granite County pricing reflects Philipsburg-area demand, mountain-road access logistics, and competition among regional agents serving southwestern Montana communities.',
    },
    tips: [
      'Verify coverage for Philipsburg and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  sheridan: {
    marketNotes:
      'Sheridan County, MT is a northeastern Montana county centered on Plentywood with rural residential demand — not to be confused with Sheridan County, Wyoming.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Sheridan County pricing reflects Plentywood-area demand, remote northeastern Montana travel distances, and competition among regional agents serving border prairie communities.',
    },
    tips: [
      'Verify coverage for Plentywood and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  fallon: {
    marketNotes:
      'Fallon County is an eastern Montana county centered on Baker with rural residential demand across southeastern plains corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Fallon County pricing reflects Baker-area demand, I-94 southeastern Montana corridor traffic, and competition among regional agents serving eastern plains communities.',
    },
    tips: [
      'Verify coverage for Baker and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'judith-basin': {
    marketNotes:
      'Judith Basin County is a central Montana county centered on Stanford with rural residential demand across Judith Gap corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Judith Basin County pricing reflects Stanford-area demand, US-87 corridor traffic, and competition among regional agents serving central Montana prairie communities.',
    },
    tips: [
      'Verify coverage for Stanford and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  meagher: {
    marketNotes:
      'Meagher County is a central Montana county centered on White Sulphur Springs with rural residential demand across Smith River corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Meagher County pricing reflects White Sulphur Springs-area demand, US-12 and US-89 corridor traffic, and competition among regional agents serving central Montana communities.',
    },
    tips: [
      'Verify coverage for White Sulphur Springs and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  wheatland: {
    marketNotes:
      'Wheatland County is a central Montana county centered on Harlowton with rural residential demand across south Musselshell corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Wheatland County pricing reflects Harlowton-area demand, US-12 and US-191 corridor traffic, and competition among regional agents serving central Montana rural communities.',
    },
    tips: [
      'Verify coverage for Harlowton and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  liberty: {
    marketNotes:
      'Liberty County, MT is a northern Montana county centered on Chester with rural residential demand — not to be confused with Liberty County, Pennsylvania.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Liberty County pricing reflects Chester-area demand, US-2 northern Montana corridor traffic, and competition among regional agents serving Sweet Grass Hills communities.',
    },
    tips: [
      'Verify coverage for Chester and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'powder-river': {
    marketNotes:
      'Powder River County is a southeastern Montana county centered on Broadus with rural residential demand across Powder River Basin corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Powder River County pricing reflects Broadus-area demand, remote southeastern Montana travel distances, and competition among regional agents serving Powder River Basin communities.',
    },
    tips: [
      'Verify coverage for Broadus and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mccone: {
    marketNotes:
      'McCone County is an eastern Montana county centered on Circle with rural residential demand along the eastern Missouri Breaks corridor.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'McCone County pricing reflects Circle-area demand, remote eastern Montana travel distances, and competition among regional agents serving Missouri Breaks communities.',
    },
    tips: [
      'Verify coverage for Circle and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  daniels: {
    marketNotes:
      'Daniels County is a northeastern Montana county centered on Scobey with rural residential demand across northeastern Hi-Line corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Daniels County pricing reflects Scobey-area demand, US-2 Hi-Line corridor traffic, and competition among regional agents serving northeastern Montana border communities.',
    },
    tips: [
      'Verify coverage for Scobey and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  carter: {
    marketNotes:
      'Carter County, MT is an eastern Montana county centered on Ekalaka with rural residential demand — not to be confused with Carter County, Oklahoma or Tennessee.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Carter County pricing reflects Ekalaka-area demand, remote southeastern Montana travel distances, and competition among regional agents serving eastern frontier communities.',
    },
    tips: [
      'Verify coverage for Ekalaka and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  garfield: {
    marketNotes:
      'Garfield County, MT is an eastern Montana county centered on Jordan with rural residential demand — not to be confused with Garfield County, Colorado.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Garfield County pricing reflects Jordan-area demand, remote eastern Montana frontier travel distances, and competition among regional agents serving vast prairie communities.',
    },
    tips: [
      'Verify coverage for Jordan and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  prairie: {
    marketNotes:
      'Prairie County, MT is an eastern Montana county centered on Terry with rural residential demand — not to be confused with Prairie County, Arkansas.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Prairie County pricing reflects Terry-area demand, I-94 eastern Montana corridor traffic, and competition among regional agents serving eastern badlands communities.',
    },
    tips: [
      'Verify coverage for Terry and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  wibaux: {
    marketNotes:
      'Wibaux County is an eastern Montana county centered on Wibaux with rural residential demand along the North Dakota border badlands corridor.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Wibaux County pricing reflects Wibaux-area demand, I-94 border corridor traffic, and competition among regional agents serving eastern Montana border communities.',
    },
    tips: [
      'Verify coverage for Wibaux and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'golden-valley': {
    marketNotes:
      'Golden Valley County is a central Montana county centered on Ryegate with rural residential demand across north Musselshell corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Golden Valley County pricing reflects Ryegate-area demand, US-12 corridor traffic, and competition among regional agents serving central Montana rural communities.',
    },
    tips: [
      'Verify coverage for Ryegate and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  treasure: {
    marketNotes:
      'Treasure County is an eastern Montana county centered on Hysham with rural residential demand along the mid Yellowstone River corridor.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Treasure County pricing reflects Hysham-area demand, I-94 corridor traffic, and competition among regional agents serving eastern Montana agricultural communities.',
    },
    tips: [
      'Verify coverage for Hysham and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  petroleum: {
    marketNotes:
      'Petroleum County is one of Montana’s smallest counties centered on Winnett with rural residential demand across central plains corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Petroleum County pricing reflects Winnett-area demand, remote central Montana travel distances, and competition among regional agents serving one of Montana’s least populous counties.',
    },
    tips: [
      'Verify coverage for Winnett and surrounding areas before booking.',
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
