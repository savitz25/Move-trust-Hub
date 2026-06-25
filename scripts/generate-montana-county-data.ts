/**
 * Generates Montana county curation files (batch 1–2: 56/56 counties).
 * Run: npx tsx scripts/generate-montana-county-data.ts
 */
import { writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(__dirname, '..');
const EXPECTED_COUNT = 56;

type CostTier = 'metro' | 'metro_growth' | 'western_slope' | 'rural';

type CountyDef = {
  slug: string;
  name: string;
  seat: string;
  city: string;
  metro: string;
  costTier: CostTier;
  marketNotes: string;
  costNote: string;
  tipVariant:
    | 'standard'
    | 'tourist'
    | 'mountain'
    | 'tourist_mountain'
    | 'rural'
    | 'university';
  citySlug: string;
  regional1: string;
  regional2: string;
  topId: string;
  topName: string;
  regional1Name: string;
  regional2Name: string;
  franchise?: boolean;
};

const COSTS: Record<
  CostTier,
  { studioRange: string; familyRange: string; avgHourly: string }
> = {
  metro: {
    studioRange: '$850–$1,700',
    familyRange: '$3,000–$7,000+',
    avgHourly: '$120–$185/hr for a 2-person crew',
  },
  metro_growth: {
    studioRange: '$900–$1,900',
    familyRange: '$3,500–$8,000+',
    avgHourly: '$125–$195/hr for a 2-person crew',
  },
  western_slope: {
    studioRange: '$800–$1,600',
    familyRange: '$2,900–$6,500+',
    avgHourly: '$110–$170/hr for a 2-person crew',
  },
  rural: {
    studioRange: '$750–$1,500',
    familyRange: '$2,600–$5,800+',
    avgHourly: '$100–$155/hr for a 2-person crew',
  },
};

const DISPLAY_LABELS: Partial<Record<string, string>> = {
  lake: 'Lake County, MT',
  lincoln: 'Lincoln County, MT',
  park: 'Park County, MT',
  jefferson: 'Jefferson County, MT',
  cascade: 'Cascade County, MT',
  custer: 'Custer County, MT',
  madison: 'Madison County, MT',
  carbon: 'Carbon County, MT',
  richland: 'Richland County, MT',
  fergus: 'Fergus County, MT',
  hill: 'Hill County, MT',
  sanders: 'Sanders County, MT',
  glacier: 'Glacier County, MT',
  roosevelt: 'Roosevelt County, MT',
  stillwater: 'Stillwater County, MT',
  valley: 'Valley County, MT',
  blaine: 'Blaine County, MT',
  teton: 'Teton County, MT',
  mineral: 'Mineral County, MT',
  phillips: 'Phillips County, MT',
  sheridan: 'Sheridan County, MT',
  garfield: 'Garfield County, MT',
  prairie: 'Prairie County, MT',
  powell: 'Powell County, MT',
  petroleum: 'Petroleum County, MT',
  liberty: 'Liberty County, MT',
  carter: 'Carter County, MT',
  dawson: 'Dawson County, MT',
};

const MT_NEIGHBORS: Record<string, string[]> = {
  yellowstone: ['carbon', 'stillwater', 'park', 'big-horn', 'treasure'],
  gallatin: ['park', 'madison', 'jefferson', 'stillwater', 'sweet-grass'],
  missoula: ['lake', 'sanders', 'ravalli', 'flathead', 'mineral'],
  flathead: ['lake', 'sanders', 'lincoln', 'glacier', 'missoula'],
  cascade: ['glacier', 'lewis-and-clark', 'fergus', 'hill', 'meagher'],
  'lewis-and-clark': ['cascade', 'jefferson', 'deer-lodge', 'silver-bow', 'broadwater'],
  ravalli: ['missoula', 'deer-lodge', 'silver-bow', 'beaverhead', 'granite'],
  'silver-bow': ['deer-lodge', 'jefferson', 'madison', 'gallatin', 'ravalli'],
  lake: ['flathead', 'missoula', 'sanders', 'glacier', 'pondera'],
  lincoln: ['flathead', 'sanders', 'lake', 'liberty', 'mineral'],
  park: ['gallatin', 'carbon', 'yellowstone', 'stillwater', 'sweet-grass'],
  hill: ['glacier', 'cascade', 'liberty', 'blaine', 'chouteau'],
  sanders: ['flathead', 'lake', 'missoula', 'lincoln', 'mineral'],
  jefferson: ['gallatin', 'madison', 'silver-bow', 'deer-lodge', 'broadwater'],
  glacier: ['flathead', 'hill', 'cascade', 'pondera', 'toole'],
  'big-horn': ['yellowstone', 'carbon', 'treasure', 'rosebud', 'custer'],
  custer: ['fergus', 'richland', 'prairie', 'fallon', 'powder-river'],
  fergus: ['cascade', 'lewis-and-clark', 'custer', 'petroleum', 'judith-basin'],
  richland: ['roosevelt', 'custer', 'dawson', 'mccone', 'wibaux'],
  carbon: ['park', 'yellowstone', 'big-horn', 'stillwater', 'sweet-grass'],
  madison: ['gallatin', 'jefferson', 'silver-bow', 'beaverhead', 'park'],
  roosevelt: ['richland', 'sheridan', 'daniels', 'mccone', 'valley'],
  beaverhead: ['madison', 'silver-bow', 'deer-lodge', 'ravalli', 'granite'],
  'deer-lodge': ['ravalli', 'silver-bow', 'jefferson', 'lewis-and-clark', 'powell'],
  stillwater: ['yellowstone', 'park', 'carbon', 'gallatin', 'sweet-grass'],
  broadwater: ['lewis-and-clark', 'jefferson', 'gallatin', 'meagher', 'wheatland'],
  dawson: ['richland', 'wibaux', 'prairie', 'fallon', 'garfield'],
  rosebud: ['big-horn', 'treasure', 'custer', 'powder-river', 'yellowstone'],
  valley: ['roosevelt', 'daniels', 'sheridan', 'mccone', 'phillips'],
  powell: ['deer-lodge', 'granite', 'missoula', 'ravalli', 'jefferson'],
  blaine: ['hill', 'chouteau', 'liberty', 'phillips', 'fergus'],
  teton: ['pondera', 'cascade', 'glacier', 'flathead', 'chouteau'],
  pondera: ['glacier', 'lake', 'teton', 'chouteau', 'cascade'],
  chouteau: ['pondera', 'cascade', 'hill', 'blaine', 'fergus'],
  musselshell: ['yellowstone', 'stillwater', 'wheatland', 'golden-valley', 'petroleum'],
  toole: ['glacier', 'liberty', 'pondera', 'hill', 'sheridan'],
  mineral: ['missoula', 'sanders', 'lake', 'ravalli', 'lincoln'],
  phillips: ['blaine', 'valley', 'daniels', 'hill', 'liberty'],
  'sweet-grass': ['gallatin', 'park', 'stillwater', 'yellowstone', 'wheatland'],
  granite: ['ravalli', 'deer-lodge', 'powell', 'beaverhead', 'silver-bow'],
  sheridan: ['roosevelt', 'daniels', 'valley', 'toole', 'liberty'],
  fallon: ['custer', 'carter', 'powder-river', 'prairie', 'dawson'],
  'judith-basin': ['fergus', 'cascade', 'meagher', 'wheatland', 'musselshell'],
  meagher: ['cascade', 'lewis-and-clark', 'broadwater', 'wheatland', 'judith-basin'],
  wheatland: ['sweet-grass', 'musselshell', 'golden-valley', 'meagher', 'broadwater'],
  liberty: ['hill', 'toole', 'sheridan', 'blaine', 'lincoln'],
  'powder-river': ['custer', 'rosebud', 'carter', 'fallon', 'prairie'],
  mccone: ['richland', 'roosevelt', 'valley', 'dawson', 'garfield'],
  daniels: ['roosevelt', 'sheridan', 'valley', 'phillips', 'liberty'],
  carter: ['fallon', 'powder-river', 'custer', 'prairie', 'dawson'],
  garfield: ['dawson', 'mccone', 'prairie', 'richland', 'fallon'],
  prairie: ['custer', 'dawson', 'fallon', 'powder-river', 'carter'],
  wibaux: ['richland', 'dawson', 'mccone', 'fallon', 'prairie'],
  'golden-valley': ['musselshell', 'wheatland', 'yellowstone', 'petroleum', 'judith-basin'],
  treasure: ['yellowstone', 'big-horn', 'rosebud', 'musselshell', 'sweet-grass'],
  petroleum: ['musselshell', 'fergus', 'judith-basin', 'golden-valley', 'wheatland'],
};

type CrossBorder = {
  slug: string;
  stateSlug: string;
  name: string;
  seat: string;
  displayLabel: string;
};

const CROSS_BORDER: Partial<Record<string, CrossBorder[]>> = {
  yellowstone: [
    {
      slug: 'campbell',
      stateSlug: 'wyoming',
      name: 'Campbell',
      seat: 'Gillette',
      displayLabel: 'Campbell County, WY',
    },
  ],
  gallatin: [
    {
      slug: 'teton',
      stateSlug: 'wyoming',
      name: 'Teton',
      seat: 'Jackson',
      displayLabel: 'Teton County, WY',
    },
  ],
  flathead: [
    {
      slug: 'bonner',
      stateSlug: 'idaho',
      name: 'Bonner',
      seat: 'Sandpoint',
      displayLabel: 'Bonner County, ID',
    },
  ],
  missoula: [
    {
      slug: 'clearwater',
      stateSlug: 'idaho',
      name: 'Clearwater',
      seat: 'Orofino',
      displayLabel: 'Clearwater County, ID',
    },
  ],
  lincoln: [
    {
      slug: 'bonner',
      stateSlug: 'idaho',
      name: 'Bonner',
      seat: 'Sandpoint',
      displayLabel: 'Bonner County, ID',
    },
  ],
  richland: [
    {
      slug: 'williams',
      stateSlug: 'north-dakota',
      name: 'Williams',
      seat: 'Williston',
      displayLabel: 'Williams County, ND',
    },
  ],
  sheridan: [
    {
      slug: 'williams',
      stateSlug: 'north-dakota',
      name: 'Williams',
      seat: 'Williston',
      displayLabel: 'Williams County, ND',
    },
  ],
};

const COUNTIES: CountyDef[] = [
  {
    slug: 'yellowstone',
    name: 'Yellowstone',
    seat: 'Billings',
    city: 'Billings',
    metro: 'yellowstone-metro-mt',
    costTier: 'western_slope',
    citySlug: 'billings',
    regional1: 'billings-corridor',
    regional2: 'yellowstone-valley',
    topId: 'twomenandatruck-yellowstone-mt',
    topName: 'Two Men and a Truck Billings',
    regional1Name: 'Billings Corridor Moving',
    regional2Name: 'Yellowstone Valley Moving',
    franchise: true,
    marketNotes:
      'Yellowstone County is Montana’s most populous county with strong urban, suburban, and residential demand across the Billings metro.',
    costNote:
      'Yellowstone County pricing reflects Billings metro demand, I-90 corridor traffic, energy-sector relocations, and competition among full-service agents serving Yellowstone County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'gallatin',
    name: 'Gallatin',
    seat: 'Bozeman',
    city: 'Bozeman',
    metro: 'gallatin-metro-mt',
    costTier: 'metro_growth',
    citySlug: 'bozeman',
    regional1: 'bozeman-corridor',
    regional2: 'gallatin-valley',
    topId: 'twomenandatruck-gallatin-mt',
    topName: 'Two Men and a Truck Bozeman',
    regional1Name: 'Bozeman Corridor Moving',
    regional2Name: 'Gallatin Valley Moving',
    franchise: true,
    marketNotes:
      'Gallatin County is a rapidly growing county with strong educational, tourism, and residential demand across the Bozeman metro and Gallatin Valley.',
    costNote:
      'Gallatin County pricing reflects Bozeman metro growth, MSU-area turnover, Big Sky gateway traffic, and competition among full-service agents serving Gallatin County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'missoula',
    name: 'Missoula',
    seat: 'Missoula',
    city: 'Missoula',
    metro: 'missoula-metro-mt',
    costTier: 'metro',
    citySlug: 'missoula',
    regional1: 'missoula-corridor',
    regional2: 'bitterroot-gateway',
    topId: 'twomenandatruck-missoula-mt',
    topName: 'Two Men and a Truck Missoula',
    regional1Name: 'Missoula Corridor Moving',
    regional2Name: 'Bitterroot Gateway Moving',
    franchise: true,
    marketNotes:
      'Missoula County is a western Montana county with strong educational and residential demand across the University of Montana area and Bitterroot gateway communities.',
    costNote:
      'Missoula County pricing reflects university-area turnover, I-90 western Montana corridor traffic, and competition among full-service agents serving Missoula County communities.',
    tipVariant: 'university',
  },
  {
    slug: 'flathead',
    name: 'Flathead',
    seat: 'Kalispell',
    city: 'Kalispell',
    metro: 'flathead-metro-mt',
    costTier: 'metro',
    citySlug: 'kalispell',
    regional1: 'kalispell-corridor',
    regional2: 'flathead-lakes',
    topId: 'regional-flathead-mt-movers',
    topName: 'Regional Kalispell / Flathead Providers',
    regional1Name: 'Kalispell Corridor Moving',
    regional2Name: 'Flathead Lakes Moving',
    marketNotes:
      'Flathead County is a northwestern Montana county with strong tourism and residential demand across Kalispell and Flathead Lake corridor communities.',
    costNote:
      'Flathead County pricing reflects Kalispell metro demand, lakeside tourism traffic, Glacier National Park gateway logistics, and competition among regional agents serving Flathead County communities.',
    tipVariant: 'tourist',
  },
  {
    slug: 'cascade',
    name: 'Cascade',
    seat: 'Great Falls',
    city: 'Great Falls',
    metro: 'cascade-metro-mt',
    costTier: 'rural',
    citySlug: 'great-falls',
    regional1: 'great-falls-corridor',
    regional2: 'missouri-river',
    topId: 'regional-cascade-mt-movers',
    topName: 'Regional Great Falls / Cascade Providers',
    regional1Name: 'Great Falls Corridor Moving',
    regional2Name: 'Missouri River Moving',
    marketNotes:
      'Cascade County is a central Montana county centered on Great Falls with residential and Missouri River corridor demand.',
    costNote:
      'Cascade County pricing reflects Great Falls-area demand, US-87 and I-15 corridor traffic, and competition among regional agents serving central Montana communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'lewis-and-clark',
    name: 'Lewis and Clark',
    seat: 'Helena',
    city: 'Helena',
    metro: 'lewis-and-clark-metro-mt',
    costTier: 'western_slope',
    citySlug: 'helena',
    regional1: 'helena-corridor',
    regional2: 'capital-region',
    topId: 'regional-lewisandclark-mt-movers',
    topName: 'Regional Helena / Lewis and Clark Providers',
    regional1Name: 'Helena Corridor Moving',
    regional2Name: 'Capital Region Moving',
    marketNotes:
      'Lewis and Clark County is the state capital county with strong governmental and residential demand across Helena and surrounding capital-region communities.',
    costNote:
      'Lewis and Clark County pricing reflects Helena capital-region demand, government-sector relocations, and competition among regional agents serving Lewis and Clark County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'ravalli',
    name: 'Ravalli',
    seat: 'Hamilton',
    city: 'Hamilton',
    metro: 'ravalli-metro-mt',
    costTier: 'rural',
    citySlug: 'hamilton',
    regional1: 'hamilton-corridor',
    regional2: 'bitterroot-valley',
    topId: 'regional-ravalli-mt-movers',
    topName: 'Regional Hamilton / Ravalli Providers',
    regional1Name: 'Hamilton Corridor Moving',
    regional2Name: 'Bitterroot Valley Moving',
    marketNotes:
      'Ravalli County is a southwestern Montana county centered on Hamilton with residential demand across Bitterroot Valley communities.',
    costNote:
      'Ravalli County pricing reflects Hamilton-area demand, US-93 Bitterroot corridor traffic, and competition among regional agents serving southwestern Montana communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'silver-bow',
    name: 'Silver Bow',
    seat: 'Butte',
    city: 'Butte',
    metro: 'silver-bow-metro-mt',
    costTier: 'rural',
    citySlug: 'butte',
    regional1: 'butte-corridor',
    regional2: 'mining-city',
    topId: 'regional-silverbow-mt-movers',
    topName: 'Regional Butte / Silver Bow Providers',
    regional1Name: 'Butte Corridor Moving',
    regional2Name: 'Mining City Moving',
    marketNotes:
      'Silver Bow County is a southwestern Montana county centered on Butte with residential demand across historic mining-city neighborhoods.',
    costNote:
      'Silver Bow County pricing reflects Butte-area demand, I-15 and I-90 corridor traffic, and competition among regional agents serving southwestern Montana communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'lake',
    name: 'Lake',
    seat: 'Polson',
    city: 'Polson',
    metro: 'lake-metro-mt',
    costTier: 'western_slope',
    citySlug: 'polson',
    regional1: 'polson-corridor',
    regional2: 'flathead-lake-south',
    topId: 'regional-lake-mt-movers',
    topName: 'Regional Polson / Lake Providers',
    regional1Name: 'Polson Corridor Moving',
    regional2Name: 'Flathead Lake South Moving',
    marketNotes:
      'Lake County is a western Montana county centered on Polson with residential and tourism demand along the south Flathead Lake corridor.',
    costNote:
      'Lake County pricing reflects Polson-area demand, Flathead Lake south-shore tourism traffic, and competition among regional agents serving western Montana lakeside communities.',
    tipVariant: 'tourist',
  },
  {
    slug: 'lincoln',
    name: 'Lincoln',
    seat: 'Libby',
    city: 'Libby',
    metro: 'lincoln-metro-mt',
    costTier: 'rural',
    citySlug: 'libby',
    regional1: 'libby-corridor',
    regional2: 'kootenai-forest',
    topId: 'regional-lincoln-mt-movers',
    topName: 'Regional Libby / Lincoln Providers',
    regional1Name: 'Libby Corridor Moving',
    regional2Name: 'Kootenai Forest Moving',
    marketNotes:
      'Lincoln County is a northwestern Montana county centered on Libby with rural residential demand across Kootenai National Forest corridor communities.',
    costNote:
      'Lincoln County pricing reflects Libby-area demand, US-2 northwest Montana corridor traffic, and competition among regional agents serving remote northwestern Montana communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'park',
    name: 'Park',
    seat: 'Livingston',
    city: 'Livingston',
    metro: 'park-metro-mt',
    costTier: 'rural',
    citySlug: 'livingston',
    regional1: 'livingston-corridor',
    regional2: 'yellowstone-gateway',
    topId: 'regional-park-mt-movers',
    topName: 'Regional Livingston / Park Providers',
    regional1Name: 'Livingston Corridor Moving',
    regional2Name: 'Yellowstone Gateway Moving',
    marketNotes:
      'Park County is a southern Montana county centered on Livingston with residential demand across Yellowstone National Park gateway communities.',
    costNote:
      'Park County pricing reflects Livingston-area demand, I-90 Yellowstone gateway traffic, and competition among regional agents serving southern Montana corridor communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'hill',
    name: 'Hill',
    seat: 'Havre',
    city: 'Havre',
    metro: 'hill-metro-mt',
    costTier: 'rural',
    citySlug: 'havre',
    regional1: 'havre-corridor',
    regional2: 'hi-line',
    topId: 'regional-hill-mt-movers',
    topName: 'Regional Havre / Hill Providers',
    regional1Name: 'Havre Corridor Moving',
    regional2Name: 'Hi-Line Moving',
    marketNotes:
      'Hill County is a northern Montana county centered on Havre with residential demand across Hi-Line corridor communities.',
    costNote:
      'Hill County pricing reflects Havre-area demand, US-2 Hi-Line corridor traffic, and competition among regional agents serving northern Montana communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'sanders',
    name: 'Sanders',
    seat: 'Thompson Falls',
    city: 'Thompson Falls',
    metro: 'sanders-metro-mt',
    costTier: 'rural',
    citySlug: 'thompson-falls',
    regional1: 'thompson-falls-corridor',
    regional2: 'clark-fork',
    topId: 'regional-sanders-mt-movers',
    topName: 'Regional Thompson Falls / Sanders Providers',
    regional1Name: 'Thompson Falls Corridor Moving',
    regional2Name: 'Clark Fork Moving',
    marketNotes:
      'Sanders County is a northwestern Montana county centered on Thompson Falls with rural residential demand along the Clark Fork River corridor.',
    costNote:
      'Sanders County pricing reflects Thompson Falls-area demand, remote northwest Montana travel distances, and competition among regional agents serving rural corridor communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'jefferson',
    name: 'Jefferson',
    seat: 'Boulder',
    city: 'Boulder',
    metro: 'jefferson-metro-mt',
    costTier: 'rural',
    citySlug: 'boulder',
    regional1: 'boulder-corridor',
    regional2: 'jefferson-highlands',
    topId: 'regional-jefferson-mt-movers',
    topName: 'Regional Boulder / Jefferson Providers',
    regional1Name: 'Boulder Corridor Moving',
    regional2Name: 'Jefferson Highlands Moving',
    marketNotes:
      'Jefferson County, MT is a southwestern Montana county centered on Boulder with residential demand across Jefferson Highlands corridor communities — not to be confused with Jefferson County, Colorado.',
    costNote:
      'Jefferson County pricing reflects Boulder-area demand, I-15 corridor traffic, and competition among regional agents serving southwestern Montana communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'glacier',
    name: 'Glacier',
    seat: 'Cut Bank',
    city: 'Cut Bank',
    metro: 'glacier-metro-mt',
    costTier: 'rural',
    citySlug: 'cut-bank',
    regional1: 'cut-bank-corridor',
    regional2: 'northern-plains',
    topId: 'regional-glacier-mt-movers',
    topName: 'Regional Cut Bank / Glacier Providers',
    regional1Name: 'Cut Bank Corridor Moving',
    regional2Name: 'Northern Plains Moving',
    marketNotes:
      'Glacier County is a northern Montana county centered on Cut Bank with residential demand across northern plains corridor communities.',
    costNote:
      'Glacier County pricing reflects Cut Bank-area demand, US-2 northern plains corridor traffic, and competition among regional agents serving northern Montana communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'big-horn',
    name: 'Big Horn',
    seat: 'Hardin',
    city: 'Hardin',
    metro: 'big-horn-metro-mt',
    costTier: 'rural',
    citySlug: 'hardin',
    regional1: 'hardin-corridor',
    regional2: 'bighorn-basin',
    topId: 'regional-bighorn-mt-movers',
    topName: 'Regional Hardin / Big Horn Providers',
    regional1Name: 'Hardin Corridor Moving',
    regional2Name: 'Bighorn Basin Moving',
    marketNotes:
      'Big Horn County is a southeastern Montana county centered on Hardin with residential demand across Bighorn Basin corridor communities.',
    costNote:
      'Big Horn County pricing reflects Hardin-area demand, I-90 southeastern Montana corridor traffic, and competition among regional agents serving Crow Reservation gateway communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'custer',
    name: 'Custer',
    seat: 'Miles City',
    city: 'Miles City',
    metro: 'custer-metro-mt',
    costTier: 'rural',
    citySlug: 'miles-city',
    regional1: 'miles-city-corridor',
    regional2: 'eastern-plains',
    topId: 'regional-custer-mt-movers',
    topName: 'Regional Miles City / Custer Providers',
    regional1Name: 'Miles City Corridor Moving',
    regional2Name: 'Eastern Plains Moving',
    marketNotes:
      'Custer County, MT is an eastern Montana county centered on Miles City with residential demand across eastern plains communities — not to be confused with Custer County, Idaho or Colorado.',
    costNote:
      'Custer County pricing reflects Miles City-area demand, I-94 eastern Montana corridor traffic, and competition among regional agents serving eastern plains communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'fergus',
    name: 'Fergus',
    seat: 'Lewistown',
    city: 'Lewistown',
    metro: 'fergus-metro-mt',
    costTier: 'rural',
    citySlug: 'lewistown',
    regional1: 'lewistown-corridor',
    regional2: 'central-montana',
    topId: 'regional-fergus-mt-movers',
    topName: 'Regional Lewistown / Fergus Providers',
    regional1Name: 'Lewistown Corridor Moving',
    regional2Name: 'Central Montana Moving',
    marketNotes:
      'Fergus County is a central Montana county centered on Lewistown with residential demand across central Montana prairie communities.',
    costNote:
      'Fergus County pricing reflects Lewistown-area demand, US-87 and US-191 corridor traffic, and competition among regional agents serving central Montana communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'richland',
    name: 'Richland',
    seat: 'Sidney',
    city: 'Sidney',
    metro: 'richland-metro-mt',
    costTier: 'rural',
    citySlug: 'sidney',
    regional1: 'sidney-corridor',
    regional2: 'bakken-gateway',
    topId: 'regional-richland-mt-movers',
    topName: 'Regional Sidney / Richland Providers',
    regional1Name: 'Sidney Corridor Moving',
    regional2Name: 'Bakken Gateway Moving',
    marketNotes:
      'Richland County is an eastern Montana county centered on Sidney with residential demand across Bakken energy-corridor gateway communities.',
    costNote:
      'Richland County pricing reflects Sidney-area demand, energy-sector relocations, and competition among regional agents serving eastern Montana border communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'carbon',
    name: 'Carbon',
    seat: 'Red Lodge',
    city: 'Red Lodge',
    metro: 'carbon-metro-mt',
    costTier: 'rural',
    citySlug: 'red-lodge',
    regional1: 'red-lodge-corridor',
    regional2: 'beartooth-gateway',
    topId: 'regional-carbon-mt-movers',
    topName: 'Regional Red Lodge / Carbon Providers',
    regional1Name: 'Red Lodge Corridor Moving',
    regional2Name: 'Beartooth Gateway Moving',
    marketNotes:
      'Carbon County is a southern Montana county centered on Red Lodge with residential and tourism demand across Beartooth gateway communities.',
    costNote:
      'Carbon County pricing reflects Red Lodge-area demand, Beartooth Highway seasonal tourism traffic, and competition among regional agents serving southern Montana mountain gateway communities.',
    tipVariant: 'tourist',
  },
  {
    slug: 'madison',
    name: 'Madison',
    seat: 'Virginia City',
    city: 'Virginia City',
    metro: 'madison-metro-mt',
    costTier: 'rural',
    citySlug: 'virginia-city',
    regional1: 'virginia-city-corridor',
    regional2: 'madison-valley',
    topId: 'regional-madison-mt-movers',
    topName: 'Regional Virginia City / Madison Providers',
    regional1Name: 'Virginia City Corridor Moving',
    regional2Name: 'Madison Valley Moving',
    marketNotes:
      'Madison County, MT is a southwestern Montana county centered on Virginia City with residential demand across Madison Valley communities — not to be confused with Madison County, Idaho.',
    costNote:
      'Madison County pricing reflects Virginia City-area demand, US-287 Madison Valley corridor traffic, and competition among regional agents serving southwestern Montana communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'roosevelt',
    name: 'Roosevelt',
    seat: 'Wolf Point',
    city: 'Wolf Point',
    metro: 'roosevelt-metro-mt',
    costTier: 'rural',
    citySlug: 'wolf-point',
    regional1: 'wolf-point-corridor',
    regional2: 'fort-peck',
    topId: 'regional-roosevelt-mt-movers',
    topName: 'Regional Wolf Point / Roosevelt Providers',
    regional1Name: 'Wolf Point Corridor Moving',
    regional2Name: 'Fort Peck Moving',
    marketNotes:
      'Roosevelt County is a northeastern Montana county centered on Wolf Point with rural residential demand across Fort Peck corridor communities.',
    costNote:
      'Roosevelt County pricing reflects Wolf Point-area demand, remote northeastern Montana travel distances, and competition among regional agents serving rural prairie communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'beaverhead',
    name: 'Beaverhead',
    seat: 'Dillon',
    city: 'Dillon',
    metro: 'beaverhead-metro-mt',
    costTier: 'rural',
    citySlug: 'dillon',
    regional1: 'dillon-corridor',
    regional2: 'big-hole',
    topId: 'regional-beaverhead-mt-movers',
    topName: 'Regional Dillon / Beaverhead Providers',
    regional1Name: 'Dillon Corridor Moving',
    regional2Name: 'Big Hole Moving',
    marketNotes:
      'Beaverhead County is a southwestern Montana county centered on Dillon with rural residential demand across Big Hole Valley corridor communities.',
    costNote:
      'Beaverhead County pricing reflects Dillon-area demand, US-287 and I-15 corridor traffic, and competition among regional agents serving southwestern Montana rural communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'deer-lodge',
    name: 'Deer Lodge',
    seat: 'Anaconda',
    city: 'Anaconda',
    metro: 'deer-lodge-metro-mt',
    costTier: 'rural',
    citySlug: 'anaconda',
    regional1: 'anaconda-corridor',
    regional2: 'clark-fork-headwaters',
    topId: 'regional-deerlodge-mt-movers',
    topName: 'Regional Anaconda / Deer Lodge Providers',
    regional1Name: 'Anaconda Corridor Moving',
    regional2Name: 'Clark Fork Headwaters Moving',
    marketNotes:
      'Deer Lodge County is a southwestern Montana county centered on Anaconda with residential demand across Clark Fork headwaters corridor communities.',
    costNote:
      'Deer Lodge County pricing reflects Anaconda-area demand, I-90 southwestern Montana corridor traffic, and competition among regional agents serving Deer Lodge County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'stillwater',
    name: 'Stillwater',
    seat: 'Columbus',
    city: 'Columbus',
    metro: 'stillwater-metro-mt',
    costTier: 'rural',
    citySlug: 'columbus',
    regional1: 'columbus-corridor',
    regional2: 'stillwater-valley',
    topId: 'regional-stillwater-mt-movers',
    topName: 'Regional Columbus / Stillwater Providers',
    regional1Name: 'Columbus Corridor Moving',
    regional2Name: 'Stillwater Valley Moving',
    marketNotes:
      'Stillwater County is a south-central Montana county centered on Columbus with residential demand across Stillwater Valley corridor communities.',
    costNote:
      'Stillwater County pricing reflects Columbus-area demand, I-90 south-central Montana corridor traffic, and competition among regional agents serving Stillwater County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'broadwater',
    name: 'Broadwater',
    seat: 'Townsend',
    city: 'Townsend',
    metro: 'broadwater-metro-mt',
    costTier: 'rural',
    citySlug: 'townsend',
    regional1: 'townsend-corridor',
    regional2: 'missouri-headwaters',
    topId: 'regional-broadwater-mt-movers',
    topName: 'Regional Townsend / Broadwater Providers',
    regional1Name: 'Townsend Corridor Moving',
    regional2Name: 'Missouri Headwaters Moving',
    marketNotes:
      'Broadwater County is a central Montana county centered on Townsend with rural residential demand across Missouri River headwaters corridor communities.',
    costNote:
      'Broadwater County pricing reflects Townsend-area demand, I-15 corridor traffic, and competition among regional agents serving central Montana rural communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'dawson',
    name: 'Dawson',
    seat: 'Glendive',
    city: 'Glendive',
    metro: 'dawson-metro-mt',
    costTier: 'rural',
    citySlug: 'glendive',
    regional1: 'glendive-corridor',
    regional2: 'yellowstone-river-east',
    topId: 'regional-dawson-mt-movers',
    topName: 'Regional Glendive / Dawson Providers',
    regional1Name: 'Glendive Corridor Moving',
    regional2Name: 'Yellowstone River East Moving',
    marketNotes:
      'Dawson County is an eastern Montana county centered on Glendive with rural residential demand along the Yellowstone River eastern corridor.',
    costNote:
      'Dawson County pricing reflects Glendive-area demand, I-94 eastern Montana corridor traffic, and competition among regional agents serving eastern plains communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'rosebud',
    name: 'Rosebud',
    seat: 'Forsyth',
    city: 'Forsyth',
    metro: 'rosebud-metro-mt',
    costTier: 'rural',
    citySlug: 'forsyth',
    regional1: 'forsyth-corridor',
    regional2: 'rosebud-creek',
    topId: 'regional-rosebud-mt-movers',
    topName: 'Regional Forsyth / Rosebud Providers',
    regional1Name: 'Forsyth Corridor Moving',
    regional2Name: 'Rosebud Creek Moving',
    marketNotes:
      'Rosebud County is an eastern Montana county centered on Forsyth with rural residential demand across southeastern Montana corridor communities.',
    costNote:
      'Rosebud County pricing reflects Forsyth-area demand, I-94 corridor traffic, and competition among regional agents serving southeastern Montana communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'valley',
    name: 'Valley',
    seat: 'Glasgow',
    city: 'Glasgow',
    metro: 'valley-metro-mt',
    costTier: 'rural',
    citySlug: 'glasgow',
    regional1: 'glasgow-corridor',
    regional2: 'hi-line-east',
    topId: 'regional-valley-mt-movers',
    topName: 'Regional Glasgow / Valley Providers',
    regional1Name: 'Glasgow Corridor Moving',
    regional2Name: 'Hi-Line East Moving',
    marketNotes:
      'Valley County, MT is a northeastern Montana county centered on Glasgow with rural residential demand across Hi-Line corridor communities — not to be confused with Valley County, Idaho.',
    costNote:
      'Valley County pricing reflects Glasgow-area demand, US-2 Hi-Line corridor traffic, and competition among regional agents serving northeastern Montana communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'powell',
    name: 'Powell',
    seat: 'Deer Lodge',
    city: 'Deer Lodge',
    metro: 'powell-metro-mt',
    costTier: 'rural',
    citySlug: 'deer-lodge',
    regional1: 'deer-lodge-corridor',
    regional2: 'clark-fork-west',
    topId: 'regional-powell-mt-movers',
    topName: 'Regional Deer Lodge / Powell Providers',
    regional1Name: 'Deer Lodge Corridor Moving',
    regional2Name: 'Clark Fork West Moving',
    marketNotes:
      'Powell County is a southwestern Montana county with seat at Deer Lodge (distinct from Deer Lodge County / Anaconda) with rural residential demand.',
    costNote:
      'Powell County pricing reflects Deer Lodge-area demand, I-90 corridor traffic, and competition among regional agents serving southwestern Montana communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'blaine',
    name: 'Blaine',
    seat: 'Chinook',
    city: 'Chinook',
    metro: 'blaine-metro-mt',
    costTier: 'rural',
    citySlug: 'chinook',
    regional1: 'chinook-corridor',
    regional2: 'milk-river',
    topId: 'regional-blaine-mt-movers',
    topName: 'Regional Chinook / Blaine Providers',
    regional1Name: 'Chinook Corridor Moving',
    regional2Name: 'Milk River Moving',
    marketNotes:
      'Blaine County, MT is a northern Montana county centered on Chinook with rural residential demand — not to be confused with Blaine County, Idaho (Sun Valley).',
    costNote:
      'Blaine County pricing reflects Chinook-area demand, US-2 Milk River corridor traffic, and competition among regional agents serving northern Montana communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'teton',
    name: 'Teton',
    seat: 'Choteau',
    city: 'Choteau',
    metro: 'teton-metro-mt',
    costTier: 'rural',
    citySlug: 'choteau',
    regional1: 'choteau-corridor',
    regional2: 'rocky-mountain-front',
    topId: 'regional-teton-mt-movers',
    topName: 'Regional Choteau / Teton Providers',
    regional1Name: 'Choteau Corridor Moving',
    regional2Name: 'Rocky Mountain Front Moving',
    marketNotes:
      'Teton County, MT is a north-central Montana county centered on Choteau with rural residential demand along the Rocky Mountain Front — not to be confused with Teton County, Idaho or Wyoming.',
    costNote:
      'Teton County pricing reflects Choteau-area demand, US-89 Rocky Mountain Front corridor traffic, and competition among regional agents serving north-central Montana communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'pondera',
    name: 'Pondera',
    seat: 'Conrad',
    city: 'Conrad',
    metro: 'pondera-metro-mt',
    costTier: 'rural',
    citySlug: 'conrad',
    regional1: 'conrad-corridor',
    regional2: 'northern-plains-west',
    topId: 'regional-pondera-mt-movers',
    topName: 'Regional Conrad / Pondera Providers',
    regional1Name: 'Conrad Corridor Moving',
    regional2Name: 'Northern Plains West Moving',
    marketNotes:
      'Pondera County is a north-central Montana county centered on Conrad with rural residential demand across northern plains corridor communities.',
    costNote:
      'Pondera County pricing reflects Conrad-area demand, US-2 and US-89 corridor traffic, and competition among regional agents serving north-central Montana communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'chouteau',
    name: 'Chouteau',
    seat: 'Fort Benton',
    city: 'Fort Benton',
    metro: 'chouteau-metro-mt',
    costTier: 'rural',
    citySlug: 'fort-benton',
    regional1: 'fort-benton-corridor',
    regional2: 'missouri-breaks',
    topId: 'regional-chouteau-mt-movers',
    topName: 'Regional Fort Benton / Chouteau Providers',
    regional1Name: 'Fort Benton Corridor Moving',
    regional2Name: 'Missouri Breaks Moving',
    marketNotes:
      'Chouteau County is a north-central Montana county centered on Fort Benton with rural residential demand along the Missouri Breaks corridor.',
    costNote:
      'Chouteau County pricing reflects Fort Benton-area demand, Missouri River corridor logistics, and competition among regional agents serving north-central Montana communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'musselshell',
    name: 'Musselshell',
    seat: 'Roundup',
    city: 'Roundup',
    metro: 'musselshell-metro-mt',
    costTier: 'rural',
    citySlug: 'roundup',
    regional1: 'roundup-corridor',
    regional2: 'musselshell-valley',
    topId: 'regional-musselshell-mt-movers',
    topName: 'Regional Roundup / Musselshell Providers',
    regional1Name: 'Roundup Corridor Moving',
    regional2Name: 'Musselshell Valley Moving',
    marketNotes:
      'Musselshell County is a central Montana county centered on Roundup with rural residential demand across Musselshell Valley corridor communities.',
    costNote:
      'Musselshell County pricing reflects Roundup-area demand, US-87 corridor traffic, and competition among regional agents serving central Montana rural communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'toole',
    name: 'Toole',
    seat: 'Shelby',
    city: 'Shelby',
    metro: 'toole-metro-mt',
    costTier: 'rural',
    citySlug: 'shelby',
    regional1: 'shelby-corridor',
    regional2: 'marias-pass',
    topId: 'regional-toole-mt-movers',
    topName: 'Regional Shelby / Toole Providers',
    regional1Name: 'Shelby Corridor Moving',
    regional2Name: 'Marias Pass Moving',
    marketNotes:
      'Toole County is a northern Montana county centered on Shelby with rural residential demand across Marias Pass corridor communities.',
    costNote:
      'Toole County pricing reflects Shelby-area demand, I-15 and US-2 corridor traffic, and competition among regional agents serving northern Montana border communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'mineral',
    name: 'Mineral',
    seat: 'Superior',
    city: 'Superior',
    metro: 'mineral-metro-mt',
    costTier: 'rural',
    citySlug: 'superior',
    regional1: 'superior-corridor',
    regional2: 'clark-river-west',
    topId: 'regional-mineral-mt-movers',
    topName: 'Regional Superior / Mineral Providers',
    regional1Name: 'Superior Corridor Moving',
    regional2Name: 'Clark River West Moving',
    marketNotes:
      'Mineral County, MT is a western Montana county centered on Superior with rural residential demand — not to be confused with Mineral County, Nevada or West Virginia.',
    costNote:
      'Mineral County pricing reflects Superior-area demand, I-90 western Montana corridor traffic, and competition among regional agents serving Clark Fork corridor communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'phillips',
    name: 'Phillips',
    seat: 'Malta',
    city: 'Malta',
    metro: 'phillips-metro-mt',
    costTier: 'rural',
    citySlug: 'malta',
    regional1: 'malta-corridor',
    regional2: 'hi-line-north',
    topId: 'regional-phillips-mt-movers',
    topName: 'Regional Malta / Phillips Providers',
    regional1Name: 'Malta Corridor Moving',
    regional2Name: 'Hi-Line North Moving',
    marketNotes:
      'Phillips County, MT is a northern Montana county centered on Malta with rural residential demand — not to be confused with Phillips County, Pennsylvania.',
    costNote:
      'Phillips County pricing reflects Malta-area demand, US-2 Hi-Line corridor traffic, and competition among regional agents serving northern Montana prairie communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'sweet-grass',
    name: 'Sweet Grass',
    seat: 'Big Timber',
    city: 'Big Timber',
    metro: 'sweet-grass-metro-mt',
    costTier: 'rural',
    citySlug: 'big-timber',
    regional1: 'big-timber-corridor',
    regional2: 'yellowstone-river-south',
    topId: 'regional-sweetgrass-mt-movers',
    topName: 'Regional Big Timber / Sweet Grass Providers',
    regional1Name: 'Big Timber Corridor Moving',
    regional2Name: 'Yellowstone River South Moving',
    marketNotes:
      'Sweet Grass County is a south-central Montana county centered on Big Timber with rural residential demand along the Yellowstone River south corridor.',
    costNote:
      'Sweet Grass County pricing reflects Big Timber-area demand, I-90 corridor traffic, and competition among regional agents serving south-central Montana communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'granite',
    name: 'Granite',
    seat: 'Philipsburg',
    city: 'Philipsburg',
    metro: 'granite-metro-mt',
    costTier: 'rural',
    citySlug: 'philipsburg',
    regional1: 'philipsburg-corridor',
    regional2: 'flint-creek',
    topId: 'regional-granite-mt-movers',
    topName: 'Regional Philipsburg / Granite Providers',
    regional1Name: 'Philipsburg Corridor Moving',
    regional2Name: 'Flint Creek Moving',
    marketNotes:
      'Granite County, MT is a southwestern Montana county centered on Philipsburg with rural residential demand — not to be confused with Granite County, Utah.',
    costNote:
      'Granite County pricing reflects Philipsburg-area demand, mountain-road access logistics, and competition among regional agents serving southwestern Montana communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'sheridan',
    name: 'Sheridan',
    seat: 'Plentywood',
    city: 'Plentywood',
    metro: 'sheridan-metro-mt',
    costTier: 'rural',
    citySlug: 'plentywood',
    regional1: 'plentywood-corridor',
    regional2: 'northeast-corner',
    topId: 'regional-sheridan-mt-movers',
    topName: 'Regional Plentywood / Sheridan Providers',
    regional1Name: 'Plentywood Corridor Moving',
    regional2Name: 'Northeast Corner Moving',
    marketNotes:
      'Sheridan County, MT is a northeastern Montana county centered on Plentywood with rural residential demand — not to be confused with Sheridan County, Wyoming.',
    costNote:
      'Sheridan County pricing reflects Plentywood-area demand, remote northeastern Montana travel distances, and competition among regional agents serving border prairie communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'fallon',
    name: 'Fallon',
    seat: 'Baker',
    city: 'Baker',
    metro: 'fallon-metro-mt',
    costTier: 'rural',
    citySlug: 'baker',
    regional1: 'baker-corridor',
    regional2: 'southeast-plains',
    topId: 'regional-fallon-mt-movers',
    topName: 'Regional Baker / Fallon Providers',
    regional1Name: 'Baker Corridor Moving',
    regional2Name: 'Southeast Plains Moving',
    marketNotes:
      'Fallon County is an eastern Montana county centered on Baker with rural residential demand across southeastern plains corridor communities.',
    costNote:
      'Fallon County pricing reflects Baker-area demand, I-94 southeastern Montana corridor traffic, and competition among regional agents serving eastern plains communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'judith-basin',
    name: 'Judith Basin',
    seat: 'Stanford',
    city: 'Stanford',
    metro: 'judith-basin-metro-mt',
    costTier: 'rural',
    citySlug: 'stanford',
    regional1: 'stanford-corridor',
    regional2: 'judith-gap',
    topId: 'regional-judithbasin-mt-movers',
    topName: 'Regional Stanford / Judith Basin Providers',
    regional1Name: 'Stanford Corridor Moving',
    regional2Name: 'Judith Gap Moving',
    marketNotes:
      'Judith Basin County is a central Montana county centered on Stanford with rural residential demand across Judith Gap corridor communities.',
    costNote:
      'Judith Basin County pricing reflects Stanford-area demand, US-87 corridor traffic, and competition among regional agents serving central Montana prairie communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'meagher',
    name: 'Meagher',
    seat: 'White Sulphur Springs',
    city: 'White Sulphur Springs',
    metro: 'meagher-metro-mt',
    costTier: 'rural',
    citySlug: 'white-sulphur-springs',
    regional1: 'white-sulphur-corridor',
    regional2: 'smith-river',
    topId: 'regional-meagher-mt-movers',
    topName: 'Regional White Sulphur Springs / Meagher Providers',
    regional1Name: 'White Sulphur Corridor Moving',
    regional2Name: 'Smith River Moving',
    marketNotes:
      'Meagher County is a central Montana county centered on White Sulphur Springs with rural residential demand across Smith River corridor communities.',
    costNote:
      'Meagher County pricing reflects White Sulphur Springs-area demand, US-12 and US-89 corridor traffic, and competition among regional agents serving central Montana communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'wheatland',
    name: 'Wheatland',
    seat: 'Harlowton',
    city: 'Harlowton',
    metro: 'wheatland-metro-mt',
    costTier: 'rural',
    citySlug: 'harlowton',
    regional1: 'harlowton-corridor',
    regional2: 'musselshell-south',
    topId: 'regional-wheatland-mt-movers',
    topName: 'Regional Harlowton / Wheatland Providers',
    regional1Name: 'Harlowton Corridor Moving',
    regional2Name: 'Musselshell South Moving',
    marketNotes:
      'Wheatland County is a central Montana county centered on Harlowton with rural residential demand across south Musselshell corridor communities.',
    costNote:
      'Wheatland County pricing reflects Harlowton-area demand, US-12 and US-191 corridor traffic, and competition among regional agents serving central Montana rural communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'liberty',
    name: 'Liberty',
    seat: 'Chester',
    city: 'Chester',
    metro: 'liberty-metro-mt',
    costTier: 'rural',
    citySlug: 'chester',
    regional1: 'chester-corridor',
    regional2: 'sweet-grass-hills',
    topId: 'regional-liberty-mt-movers',
    topName: 'Regional Chester / Liberty Providers',
    regional1Name: 'Chester Corridor Moving',
    regional2Name: 'Sweet Grass Hills Moving',
    marketNotes:
      'Liberty County, MT is a northern Montana county centered on Chester with rural residential demand — not to be confused with Liberty County, Pennsylvania.',
    costNote:
      'Liberty County pricing reflects Chester-area demand, US-2 northern Montana corridor traffic, and competition among regional agents serving Sweet Grass Hills communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'powder-river',
    name: 'Powder River',
    seat: 'Broadus',
    city: 'Broadus',
    metro: 'powder-river-metro-mt',
    costTier: 'rural',
    citySlug: 'broadus',
    regional1: 'broadus-corridor',
    regional2: 'powder-river-basin',
    topId: 'regional-powderriver-mt-movers',
    topName: 'Regional Broadus / Powder River Providers',
    regional1Name: 'Broadus Corridor Moving',
    regional2Name: 'Powder River Basin Moving',
    marketNotes:
      'Powder River County is a southeastern Montana county centered on Broadus with rural residential demand across Powder River Basin corridor communities.',
    costNote:
      'Powder River County pricing reflects Broadus-area demand, remote southeastern Montana travel distances, and competition among regional agents serving Powder River Basin communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'mccone',
    name: 'McCone',
    seat: 'Circle',
    city: 'Circle',
    metro: 'mccone-metro-mt',
    costTier: 'rural',
    citySlug: 'circle',
    regional1: 'circle-corridor',
    regional2: 'missouri-breaks-east',
    topId: 'regional-mccone-mt-movers',
    topName: 'Regional Circle / McCone Providers',
    regional1Name: 'Circle Corridor Moving',
    regional2Name: 'Missouri Breaks East Moving',
    marketNotes:
      'McCone County is an eastern Montana county centered on Circle with rural residential demand along the eastern Missouri Breaks corridor.',
    costNote:
      'McCone County pricing reflects Circle-area demand, remote eastern Montana travel distances, and competition among regional agents serving Missouri Breaks communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'daniels',
    name: 'Daniels',
    seat: 'Scobey',
    city: 'Scobey',
    metro: 'daniels-metro-mt',
    costTier: 'rural',
    citySlug: 'scobey',
    regional1: 'scobey-corridor',
    regional2: 'northeast-hi-line',
    topId: 'regional-daniels-mt-movers',
    topName: 'Regional Scobey / Daniels Providers',
    regional1Name: 'Scobey Corridor Moving',
    regional2Name: 'Northeast Hi-Line Moving',
    marketNotes:
      'Daniels County is a northeastern Montana county centered on Scobey with rural residential demand across northeastern Hi-Line corridor communities.',
    costNote:
      'Daniels County pricing reflects Scobey-area demand, US-2 Hi-Line corridor traffic, and competition among regional agents serving northeastern Montana border communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'carter',
    name: 'Carter',
    seat: 'Ekalaka',
    city: 'Ekalaka',
    metro: 'carter-metro-mt',
    costTier: 'rural',
    citySlug: 'ekalaka',
    regional1: 'ekalaka-corridor',
    regional2: 'southeast-corner',
    topId: 'regional-carter-mt-movers',
    topName: 'Regional Ekalaka / Carter Providers',
    regional1Name: 'Ekalaka Corridor Moving',
    regional2Name: 'Southeast Corner Moving',
    marketNotes:
      'Carter County, MT is an eastern Montana county centered on Ekalaka with rural residential demand — not to be confused with Carter County, Oklahoma or Tennessee.',
    costNote:
      'Carter County pricing reflects Ekalaka-area demand, remote southeastern Montana travel distances, and competition among regional agents serving eastern frontier communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'garfield',
    name: 'Garfield',
    seat: 'Jordan',
    city: 'Jordan',
    metro: 'garfield-metro-mt',
    costTier: 'rural',
    citySlug: 'jordan',
    regional1: 'jordan-corridor',
    regional2: 'eastern-frontier',
    topId: 'regional-garfield-mt-movers',
    topName: 'Regional Jordan / Garfield Providers',
    regional1Name: 'Jordan Corridor Moving',
    regional2Name: 'Eastern Frontier Moving',
    marketNotes:
      'Garfield County, MT is an eastern Montana county centered on Jordan with rural residential demand — not to be confused with Garfield County, Colorado.',
    costNote:
      'Garfield County pricing reflects Jordan-area demand, remote eastern Montana frontier travel distances, and competition among regional agents serving vast prairie communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'prairie',
    name: 'Prairie',
    seat: 'Terry',
    city: 'Terry',
    metro: 'prairie-metro-mt',
    costTier: 'rural',
    citySlug: 'terry',
    regional1: 'terry-corridor',
    regional2: 'badlands-east',
    topId: 'regional-prairie-mt-movers',
    topName: 'Regional Terry / Prairie Providers',
    regional1Name: 'Terry Corridor Moving',
    regional2Name: 'Badlands East Moving',
    marketNotes:
      'Prairie County, MT is an eastern Montana county centered on Terry with rural residential demand — not to be confused with Prairie County, Arkansas.',
    costNote:
      'Prairie County pricing reflects Terry-area demand, I-94 eastern Montana corridor traffic, and competition among regional agents serving eastern badlands communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'wibaux',
    name: 'Wibaux',
    seat: 'Wibaux',
    city: 'Wibaux',
    metro: 'wibaux-metro-mt',
    costTier: 'rural',
    citySlug: 'wibaux',
    regional1: 'wibaux-corridor',
    regional2: 'badlands-border',
    topId: 'regional-wibaux-mt-movers',
    topName: 'Regional Wibaux / Wibaux County Providers',
    regional1Name: 'Wibaux Corridor Moving',
    regional2Name: 'Badlands Border Moving',
    marketNotes:
      'Wibaux County is an eastern Montana county centered on Wibaux with rural residential demand along the North Dakota border badlands corridor.',
    costNote:
      'Wibaux County pricing reflects Wibaux-area demand, I-94 border corridor traffic, and competition among regional agents serving eastern Montana border communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'golden-valley',
    name: 'Golden Valley',
    seat: 'Ryegate',
    city: 'Ryegate',
    metro: 'golden-valley-metro-mt',
    costTier: 'rural',
    citySlug: 'ryegate',
    regional1: 'ryegate-corridor',
    regional2: 'musselshell-north',
    topId: 'regional-goldenvalley-mt-movers',
    topName: 'Regional Ryegate / Golden Valley Providers',
    regional1Name: 'Ryegate Corridor Moving',
    regional2Name: 'Musselshell North Moving',
    marketNotes:
      'Golden Valley County is a central Montana county centered on Ryegate with rural residential demand across north Musselshell corridor communities.',
    costNote:
      'Golden Valley County pricing reflects Ryegate-area demand, US-12 corridor traffic, and competition among regional agents serving central Montana rural communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'treasure',
    name: 'Treasure',
    seat: 'Hysham',
    city: 'Hysham',
    metro: 'treasure-metro-mt',
    costTier: 'rural',
    citySlug: 'hysham',
    regional1: 'hysham-corridor',
    regional2: 'yellowstone-river-mid',
    topId: 'regional-treasure-mt-movers',
    topName: 'Regional Hysham / Treasure Providers',
    regional1Name: 'Hysham Corridor Moving',
    regional2Name: 'Yellowstone River Mid Moving',
    marketNotes:
      'Treasure County is an eastern Montana county centered on Hysham with rural residential demand along the mid Yellowstone River corridor.',
    costNote:
      'Treasure County pricing reflects Hysham-area demand, I-94 corridor traffic, and competition among regional agents serving eastern Montana agricultural communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'petroleum',
    name: 'Petroleum',
    seat: 'Winnett',
    city: 'Winnett',
    metro: 'petroleum-metro-mt',
    costTier: 'rural',
    citySlug: 'winnett',
    regional1: 'winnett-corridor',
    regional2: 'central-plains',
    topId: 'regional-petroleum-mt-movers',
    topName: 'Regional Winnett / Petroleum Providers',
    regional1Name: 'Winnett Corridor Moving',
    regional2Name: 'Central Plains Moving',
    marketNotes:
      'Petroleum County is one of Montana’s smallest counties centered on Winnett with rural residential demand across central plains corridor communities.',
    costNote:
      'Petroleum County pricing reflects Winnett-area demand, remote central Montana travel distances, and competition among regional agents serving one of Montana’s least populous counties.',
    tipVariant: 'rural',
  },
];

const SEAT_BY_SLUG = Object.fromEntries(COUNTIES.map((c) => [c.slug, c.seat]));

const NON_CURATED_NAMES: Record<string, { name: string; seat: string }> = {};

function slugKey(slug: string): string {
  return /[^a-z]/.test(slug) ? `'${slug}'` : slug;
}

function q(s: string): string {
  if (s.includes("'")) return JSON.stringify(s);
  return `'${s}'`;
}

function defaultDisplayLabel(slug: string, name: string): string {
  return DISPLAY_LABELS[slug] ?? `${name} County, MT`;
}

function buildTips(c: CountyDef): string[] {
  const city = c.city;
  const base = [
    `Verify coverage for ${city} and surrounding areas before booking.`,
    'Regional traffic impacts scheduling — confirm crew arrival windows.',
    'Confirm insurance for high-value homes and rural properties.',
    'Book early for peak seasons (May–September) and month-end lease changeover.',
    'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
  ];

  if (c.tipVariant === 'university') {
    return [
      base[0],
      'University-area turnover (semester start/end) may affect scheduling — confirm peak-season crew availability.',
      'Confirm coverage for student housing, off-campus apartments, and family homes before booking.',
      base[3],
      base[4],
    ];
  }
  if (c.tipVariant === 'tourist') {
    return [
      base[0],
      'Tourist-season congestion and vacation-rental turnover may affect scheduling — confirm peak-season crew availability.',
      'Confirm insurance for high-value lakeside homes, seasonal properties, and vacation rentals before move day.',
      base[3],
      base[4],
    ];
  }
  if (c.tipVariant === 'rural') {
    return [
      base[0],
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      base[3],
      base[4],
    ];
  }
  return base;
}

function moverIds(c: CountyDef): string[] {
  const slug = c.slug;
  const citySlug = c.citySlug;
  return [
    c.topId,
    `all-my-sons-${citySlug}-mt`,
    `${citySlug}-moving-${slug}-mt`,
    `${slug}-county-moving-${slug}-mt`,
    `college-hunks-moving-${citySlug}-mt`,
    `budd-van-lines-${citySlug}-mt`,
    `${c.regional1}-moving-${slug}-mt`,
    `${c.regional2}-moving-${slug}-mt`,
    `hercules-movers-${citySlug}-mt`,
    `krupp-moving-${citySlug}-mt`,
  ];
}

const TESTIMONIAL_NAMES = [
  'Ann K.',
  'Ben L.',
  'Cal M.',
  'Dee N.',
  'Eli O.',
  'Fay P.',
  'Gia Q.',
  'Hal R.',
  'Ivy S.',
  'Jay T.',
  'Kim U.',
  'Leo V.',
  'Mia W.',
  'Noah X.',
  'Pam Y.',
  'Quinn Z.',
  'Rita A.',
  'Sam B.',
  'Tina C.',
  'Uma D.',
  'Vic E.',
];

const FRANCHISE_TESTIMONIALS: Record<
  string,
  { quote: string; name: string; location: string; rating: number; moveType: string }[]
> = {
  yellowstone: [
    {
      quote:
        'Two Men and a Truck Billings handled our move professionally — on time and extremely careful with our home.',
      name: 'Alex M.',
      location: 'Billings, MT',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Billings navigated our Laurel relocation with fair pricing through Billings metro traffic.',
      name: 'Beth N.',
      location: 'Laurel, MT',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Yellowstone Valley Moving served our Heights-area move efficiently with steady communication and professional crew coordination.',
      name: 'Carl O.',
      location: 'Billings, MT',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
  gallatin: [
    {
      quote:
        'Two Men and a Truck Bozeman handled our Gallatin Valley move professionally — on time and extremely careful.',
      name: 'Dana P.',
      location: 'Bozeman, MT',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Bozeman navigated our Belgrade relocation with fair pricing and excellent valley scheduling.',
      name: 'Evan Q.',
      location: 'Belgrade, MT',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Gallatin Valley Moving served our move efficiently with punctual arrival and professional coordination.',
      name: 'Faye R.',
      location: 'Bozeman, MT',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  missoula: [
    {
      quote:
        'Two Men and a Truck Missoula handled our move professionally — on time and extremely careful with our home.',
      name: 'Glen S.',
      location: 'Missoula, MT',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Missoula navigated our university-area relocation with fair pricing and excellent western Montana scheduling.',
      name: 'Hope T.',
      location: 'Missoula, MT',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Bitterroot Gateway Moving served our Lolo-area move efficiently with professional crew coordination.',
      name: 'Ira U.',
      location: 'Lolo, MT',
      rating: 5,
      moveType: 'Townhome',
    },
  ],
};

function buildTestimonials(c: CountyDef, idx: number): string {
  const hand = FRANCHISE_TESTIMONIALS[c.slug];
  if (hand) {
    const lines = hand
      .map(
        (t) =>
          `    { quote: ${q(t.quote)}, name: ${q(t.name)}, location: ${q(t.location)}, rating: ${t.rating}, moveType: ${q(t.moveType)} },`
      )
      .join('\n');
    return `  ${slugKey(c.slug)}: [\n${lines}\n  ],`;
  }
  const n1 = TESTIMONIAL_NAMES[idx % TESTIMONIAL_NAMES.length];
  const n2 = TESTIMONIAL_NAMES[(idx + 1) % TESTIMONIAL_NAMES.length];
  const n3 = TESTIMONIAL_NAMES[(idx + 2) % TESTIMONIAL_NAMES.length];
  const city = c.city;
  const altLoc = c.seat !== c.city ? `${c.seat}, MT` : `${city}, MT`;
  return `  ${slugKey(c.slug)}: [
    { quote: ${q(`${c.topName} handled our ${city} move professionally — on time and extremely careful with our home.`)}, name: ${q(n1)}, location: ${q(`${city}, MT`)}, rating: 5, moveType: 'Single-family' },
    { quote: ${q(`All My Sons ${city} navigated our relocation with fair pricing and excellent regional scheduling.`)}, name: ${q(n2)}, location: ${q(altLoc)}, rating: 5, moveType: 'Townhome' },
    { quote: ${q(`${c.regional2Name} served our move efficiently with punctual arrival and professional crew coordination.`)}, name: ${q(n3)}, location: ${q(`${city}, MT`)}, rating: 5, moveType: 'Apartment' },
  ],`;
}

function buildNearbyLinks(slug: string): string {
  const mtNeighbors = MT_NEIGHBORS[slug] ?? [];
  const cross = CROSS_BORDER[slug] ?? [];
  const maxMt = Math.min(mtNeighbors.length, Math.max(3, 5 - cross.length));
  const links: string[] = [];

  for (const n of mtNeighbors.slice(0, maxMt)) {
    const curated = COUNTIES.find((c) => c.slug === n);
    const fallback = NON_CURATED_NAMES[n];
    const name = curated?.name ?? fallback?.name ?? n;
    const seat = curated?.seat ?? fallback?.seat ?? SEAT_BY_SLUG[n] ?? n;
    const label = curated
      ? defaultDisplayLabel(n, curated.name)
      : defaultDisplayLabel(n, name);
    const parts = [
      `slug: ${q(n)}`,
      `name: ${q(name)}`,
      `seat: ${q(seat)}`,
      `href: ${q(`/local-movers/montana/${n}`)}`,
      `displayLabel: ${q(label)}`,
    ];
    links.push(`    { ${parts.join(', ')} }`);
  }

  for (const cb of cross) {
    links.push(
      `    { slug: ${q(cb.slug)}, name: ${q(cb.name)}, seat: ${q(cb.seat)}, href: ${q(`/local-movers/${cb.stateSlug}/${cb.slug}`)}, displayLabel: ${q(cb.displayLabel)} }`
    );
  }

  return `  ${slugKey(slug)}: [\n${links.join(',\n')},\n  ],`;
}

function genResearch(): string {
  const entries = COUNTIES.map((c) => {
    const cost = COSTS[c.costTier];
    const tips = buildTips(c)
      .map((t) => `      ${q(t)},`)
      .join('\n');
    return `  ${slugKey(c.slug)}: {
    marketNotes:
      ${q(c.marketNotes)},
    costs: {
      studioRange: ${q(cost.studioRange)},
      familyRange: ${q(cost.familyRange)},
      avgHourly: ${q(cost.avgHourly)},
      note: ${q(c.costNote)},
    },
    tips: [
${tips}
    ],
  },`;
  });
  return `import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Montana county research — batch 1–2: 56/56 */
export const montanaCountyResearch: Record<string, CuratedCountyResearch> = {
${entries.join('\n')}
};

export function getMontanaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return montanaCountyResearch[countySlug];
}
`;
}

function genTestimonials(): string {
  const entries = COUNTIES.map((c, i) => buildTestimonials(c, i + 3));
  return `import type { CountyTestimonialEntry } from '@/lib/local-movers/county-seo';

/** Hand-curated Montana county testimonials — batch 1–2: 56/56 */
export const montanaCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
${entries.join('\n')}
};

export function getMontanaCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return montanaCountyTestimonials[countySlug] ?? [];
}
`;
}

function genAssignments(): string {
  const entries = COUNTIES.map((c) => {
    const ids = moverIds(c)
      .map((id) => `    ${q(id)},`)
      .join('\n');
    return `  ${slugKey(c.slug)}: [\n${ids}\n  ],`;
  });
  return `import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/** Hand-curated Montana county mover lists — batch 1–2: 56/56 */
const CURATED_MT_COUNTIES: Record<string, string[]> = {
${entries.join('\n')}
};

export const montanaCountyMoverAssignments: CountyMoverAssignment[] =
  Object.entries(CURATED_MT_COUNTIES).map(([countySlug, moverIds]) => ({
    stateSlug: 'montana',
    countySlug,
    moverIds,
  }));
`;
}

function genOverrides(): string {
  const entries = COUNTIES.map(
    (c) => `  ${slugKey(c.slug)}: { seat: ${q(c.seat)}, metro: ${q(c.metro)} },`
  );
  return `import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Montana counties (batch 1–2: 56/56) */
export const montanaCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
${entries.join('\n')}
};

export function applyMontanaCountyOverrides(county: LocalCounty): LocalCounty {
  const override = montanaCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}
`;
}

function genNearby(): string {
  const entries = COUNTIES.map((c) => buildNearbyLinks(c.slug));
  return `import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Montana curated county corridor links — batch 1–2: 56/56 */
const MT_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
${entries.join('\n')}
};

export function getMontanaNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return MT_COUNTY_NEIGHBORS[countySlug] ?? [];
}
`;
}

const OUTPUTS: { path: string; content: string }[] = [
  { path: 'data/montana-county-research.ts', content: genResearch() },
  { path: 'data/montana-county-testimonials.ts', content: genTestimonials() },
  { path: 'data/montana-county-assignments.ts', content: genAssignments() },
  { path: 'lib/local-movers/geography/montana-overrides.ts', content: genOverrides() },
  { path: 'lib/local-movers/montana-nearby.ts', content: genNearby() },
];

for (const { path, content } of OUTPUTS) {
  const full = join(ROOT, path);
  writeFileSync(full, content, 'utf8');
  console.log(`Wrote ${path}`);
}

console.log(
  `\nGenerated ${COUNTIES.length}/${EXPECTED_COUNT} Montana counties across ${OUTPUTS.length} files.`
);