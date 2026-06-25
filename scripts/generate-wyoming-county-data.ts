/**
 * Generates Wyoming county curation files (23/23 counties).
 * Run: npx tsx scripts/generate-wyoming-county-data.ts
 */
import { writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(__dirname, '..');
const EXPECTED_COUNT = 23;

type CostTier = 'metro' | 'western_slope' | 'rural' | 'resort';

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
  western_slope: {
    studioRange: '$800–$1,600',
    familyRange: '$2,900–$6,500+',
    avgHourly: '$110–$170/hr for a 2-person crew',
  },
  metro: {
    studioRange: '$850–$1,700',
    familyRange: '$3,000–$7,000+',
    avgHourly: '$120–$185/hr for a 2-person crew',
  },
  resort: {
    studioRange: '$1,100–$2,500',
    familyRange: '$5,000–$12,000+',
    avgHourly: '$150–$250/hr for a 2-person crew',
  },
  rural: {
    studioRange: '$750–$1,500',
    familyRange: '$2,600–$5,800+',
    avgHourly: '$100–$155/hr for a 2-person crew',
  },
};

const DISPLAY_LABELS: Partial<Record<string, string>> = {
  laramie: 'Laramie County, WY',
  park: 'Park County, WY',
  lincoln: 'Lincoln County, WY',
  carbon: 'Carbon County, WY',
  sheridan: 'Sheridan County, WY',
  fremont: 'Fremont County, WY',
  albany: 'Albany County, WY',
  teton: 'Teton County, WY',
  johnson: 'Johnson County, WY',
  platte: 'Platte County, WY',
  'big-horn': 'Big Horn County, WY',
};

const WY_NEIGHBORS: Record<string, string[]> = {
  albany: ['carbon', 'converse', 'laramie', 'platte'],
  'big-horn': ['johnson', 'park', 'sheridan', 'washakie'],
  campbell: ['converse', 'crook', 'johnson', 'sheridan', 'weston'],
  carbon: ['albany', 'converse', 'fremont', 'natrona', 'sweetwater'],
  converse: [
    'albany',
    'campbell',
    'carbon',
    'johnson',
    'natrona',
    'niobrara',
    'platte',
    'weston',
  ],
  crook: ['campbell', 'weston'],
  fremont: [
    'carbon',
    'hot-springs',
    'natrona',
    'park',
    'sublette',
    'sweetwater',
    'teton',
    'washakie',
  ],
  goshen: ['laramie', 'niobrara', 'platte'],
  'hot-springs': ['fremont', 'park', 'washakie'],
  johnson: ['big-horn', 'campbell', 'converse', 'natrona', 'sheridan', 'washakie'],
  laramie: ['albany', 'goshen', 'platte'],
  lincoln: ['sublette', 'sweetwater', 'teton', 'uinta'],
  natrona: ['carbon', 'converse', 'fremont', 'johnson', 'washakie'],
  niobrara: ['converse', 'goshen', 'platte', 'weston'],
  park: ['big-horn', 'fremont', 'hot-springs', 'teton', 'washakie'],
  platte: ['albany', 'converse', 'goshen', 'laramie', 'niobrara'],
  sheridan: ['big-horn', 'campbell', 'johnson'],
  sublette: ['fremont', 'lincoln', 'sweetwater', 'teton'],
  sweetwater: ['carbon', 'fremont', 'lincoln', 'sublette', 'uinta'],
  teton: ['fremont', 'lincoln', 'park', 'sublette'],
  uinta: ['lincoln', 'sweetwater'],
  washakie: ['big-horn', 'fremont', 'hot-springs', 'johnson', 'natrona', 'park'],
  weston: ['campbell', 'converse', 'crook', 'niobrara'],
};

type CrossBorder = {
  slug: string;
  stateSlug: string;
  name: string;
  seat: string;
  displayLabel: string;
};

const CROSS_BORDER: Partial<Record<string, CrossBorder[]>> = {
  laramie: [
    {
      slug: 'larimer',
      stateSlug: 'colorado',
      name: 'Larimer',
      seat: 'Fort Collins',
      displayLabel: 'Larimer County, CO',
    },
    {
      slug: 'weld',
      stateSlug: 'colorado',
      name: 'Weld',
      seat: 'Greeley',
      displayLabel: 'Weld County, CO',
    },
  ],
  albany: [
    {
      slug: 'larimer',
      stateSlug: 'colorado',
      name: 'Larimer',
      seat: 'Fort Collins',
      displayLabel: 'Larimer County, CO',
    },
  ],
  campbell: [
    {
      slug: 'powder-river',
      stateSlug: 'montana',
      name: 'Powder River',
      seat: 'Broadus',
      displayLabel: 'Powder River County, MT',
    },
  ],
  sheridan: [
    {
      slug: 'powder-river',
      stateSlug: 'montana',
      name: 'Powder River',
      seat: 'Broadus',
      displayLabel: 'Powder River County, MT',
    },
    {
      slug: 'big-horn',
      stateSlug: 'montana',
      name: 'Big Horn',
      seat: 'Hardin',
      displayLabel: 'Big Horn County, MT',
    },
  ],
  park: [
    {
      slug: 'park',
      stateSlug: 'montana',
      name: 'Park',
      seat: 'Livingston',
      displayLabel: 'Park County, MT',
    },
    {
      slug: 'yellowstone',
      stateSlug: 'montana',
      name: 'Yellowstone',
      seat: 'Billings',
      displayLabel: 'Yellowstone County, MT',
    },
  ],
  teton: [
    {
      slug: 'teton',
      stateSlug: 'idaho',
      name: 'Teton',
      seat: 'Driggs',
      displayLabel: 'Teton County, ID',
    },
    {
      slug: 'fremont',
      stateSlug: 'idaho',
      name: 'Fremont',
      seat: 'St. Anthony',
      displayLabel: 'Fremont County, ID',
    },
  ],
  uinta: [
    {
      slug: 'summit',
      stateSlug: 'utah',
      name: 'Summit',
      seat: 'Coalville',
      displayLabel: 'Summit County, UT',
    },
  ],
  sweetwater: [
    {
      slug: 'summit',
      stateSlug: 'utah',
      name: 'Summit',
      seat: 'Coalville',
      displayLabel: 'Summit County, UT',
    },
  ],
  carbon: [
    {
      slug: 'moffat',
      stateSlug: 'colorado',
      name: 'Moffat',
      seat: 'Craig',
      displayLabel: 'Moffat County, CO',
    },
  ],
  goshen: [
    {
      slug: 'scotts-bluff',
      stateSlug: 'nebraska',
      name: 'Scotts Bluff',
      seat: 'Gering',
      displayLabel: 'Scotts Bluff County, NE',
    },
  ],
  crook: [
    {
      slug: 'lawrence',
      stateSlug: 'south-dakota',
      name: 'Lawrence',
      seat: 'Deadwood',
      displayLabel: 'Lawrence County, SD',
    },
  ],
  weston: [
    {
      slug: 'lawrence',
      stateSlug: 'south-dakota',
      name: 'Lawrence',
      seat: 'Deadwood',
      displayLabel: 'Lawrence County, SD',
    },
  ],
};

const COUNTIES: CountyDef[] = [
  {
    slug: 'laramie',
    name: 'Laramie',
    seat: 'Cheyenne',
    city: 'Cheyenne',
    metro: 'laramie-metro-wy',
    costTier: 'western_slope',
    citySlug: 'cheyenne',
    regional1: 'cheyenne-corridor',
    regional2: 'capital-region',
    topId: 'twomenandatruck-laramie-wy',
    topName: 'Two Men and a Truck Cheyenne',
    regional1Name: 'Cheyenne Corridor Moving',
    regional2Name: 'Capital Region Moving',
    franchise: true,
    marketNotes:
      'Laramie County is Wyoming’s most populous county and state capital region with strong government, commercial, suburban, and residential demand across the Cheyenne metro and Front Range corridor.',
    costNote:
      'Laramie County pricing reflects Cheyenne capital-region demand, F.E. Warren AFB and government-sector relocations, I-25 Front Range corridor traffic, and competition among full-service agents serving Laramie County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'natrona',
    name: 'Natrona',
    seat: 'Casper',
    city: 'Casper',
    metro: 'natrona-metro-wy',
    costTier: 'western_slope',
    citySlug: 'casper',
    regional1: 'casper-corridor',
    regional2: 'energy-basin',
    topId: 'twomenandatruck-natrona-wy',
    topName: 'Two Men and a Truck Casper',
    regional1Name: 'Casper Corridor Moving',
    regional2Name: 'Energy Basin Moving',
    franchise: true,
    marketNotes:
      'Natrona County is Wyoming’s second-largest county centered on Casper with strong energy-sector, commercial, and residential demand across the North Platte River basin.',
    costNote:
      'Natrona County pricing reflects Casper metro demand, oil-and-gas workforce relocations, I-25 and US-20 corridor traffic, and competition among full-service agents serving Natrona County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'campbell',
    name: 'Campbell',
    seat: 'Gillette',
    city: 'Gillette',
    metro: 'campbell-metro-wy',
    costTier: 'western_slope',
    citySlug: 'gillette',
    regional1: 'gillette-corridor',
    regional2: 'powder-river-basin',
    topId: 'regional-campbell-wy-movers',
    topName: 'Regional Gillette / Campbell Providers',
    regional1Name: 'Gillette Corridor Moving',
    regional2Name: 'Powder River Basin Moving',
    marketNotes:
      'Campbell County anchors northeastern Wyoming’s Powder River Basin with strong coal, energy-sector, and residential demand across Gillette and surrounding energy-corridor communities.',
    costNote:
      'Campbell County pricing reflects Gillette energy-basin demand, mining-sector workforce relocations, I-90 corridor traffic, and competition among regional agents serving Campbell County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'sweetwater',
    name: 'Sweetwater',
    seat: 'Green River',
    city: 'Rock Springs',
    metro: 'sweetwater-metro-wy',
    costTier: 'western_slope',
    citySlug: 'rock-springs',
    regional1: 'rock-springs-corridor',
    regional2: 'green-river-basin',
    topId: 'regional-sweetwater-wy-movers',
    topName: 'Regional Rock Springs / Sweetwater Providers',
    regional1Name: 'Rock Springs Corridor Moving',
    regional2Name: 'Green River Basin Moving',
    marketNotes:
      'Sweetwater County is southwestern Wyoming’s largest county with strong energy-sector, trona-mining, and residential demand across Rock Springs, Green River, and I-80 corridor communities.',
    costNote:
      'Sweetwater County pricing reflects Rock Springs energy-basin demand, trona and natural-gas workforce relocations, I-80 high-desert corridor traffic, and competition among regional agents serving Sweetwater County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'fremont',
    name: 'Fremont',
    seat: 'Lander',
    city: 'Lander',
    metro: 'fremont-metro-wy',
    costTier: 'rural',
    citySlug: 'lander',
    regional1: 'lander-corridor',
    regional2: 'wind-river-country',
    topId: 'regional-fremont-wy-movers',
    topName: 'Regional Lander / Fremont Providers',
    regional1Name: 'Lander Corridor Moving',
    regional2Name: 'Wind River Country Moving',
    marketNotes:
      'Fremont County, WY is a central Wyoming county centered on Lander with residential demand across Wind River Country, outdoor-recreation gateway communities, and Wind River Reservation corridor towns — not to be confused with Fremont County, Idaho.',
    costNote:
      'Fremont County pricing reflects Lander-area demand, Wind River corridor travel distances, outdoor-recreation seasonal traffic, and competition among regional agents serving central Wyoming communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'albany',
    name: 'Albany',
    seat: 'Laramie',
    city: 'Laramie',
    metro: 'albany-metro-wy',
    costTier: 'western_slope',
    citySlug: 'laramie',
    regional1: 'laramie-corridor',
    regional2: 'university-plains',
    topId: 'regional-albany-wy-movers',
    topName: 'Regional Laramie / Albany Providers',
    regional1Name: 'Laramie Corridor Moving',
    regional2Name: 'University Plains Moving',
    marketNotes:
      'Albany County, WY is a southeastern Wyoming county centered on Laramie with strong University of Wyoming, student-housing, and residential demand across the Laramie Plains — not to be confused with Albany County, New York.',
    costNote:
      'Albany County pricing reflects Laramie university-area turnover, I-80 corridor traffic, student and faculty relocations, and competition among regional agents serving Albany County communities.',
    tipVariant: 'university',
  },
  {
    slug: 'sheridan',
    name: 'Sheridan',
    seat: 'Sheridan',
    city: 'Sheridan',
    metro: 'sheridan-metro-wy',
    costTier: 'rural',
    citySlug: 'sheridan',
    regional1: 'sheridan-corridor',
    regional2: 'bighorn-foothills',
    topId: 'regional-sheridan-wy-movers',
    topName: 'Regional Sheridan / Sheridan County Providers',
    regional1Name: 'Sheridan Corridor Moving',
    regional2Name: 'Bighorn Foothills Moving',
    marketNotes:
      'Sheridan County, WY is a north-central Wyoming county centered on Sheridan with residential demand across Bighorn foothills corridor communities — not to be confused with Sheridan County, Montana.',
    costNote:
      'Sheridan County pricing reflects Sheridan-area demand, I-90 northern Wyoming corridor traffic, ranch and foothills property logistics, and competition among regional agents serving Sheridan County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'park',
    name: 'Park',
    seat: 'Cody',
    city: 'Cody',
    metro: 'park-metro-wy',
    costTier: 'metro',
    citySlug: 'cody',
    regional1: 'cody-corridor',
    regional2: 'yellowstone-gateway',
    topId: 'regional-park-wy-movers',
    topName: 'Regional Cody / Park Providers',
    regional1Name: 'Cody Corridor Moving',
    regional2Name: 'Yellowstone Gateway Moving',
    marketNotes:
      'Park County, WY is a northwestern Wyoming county centered on Cody with strong tourism, Yellowstone gateway, and residential demand across Buffalo Bill corridor communities — not to be confused with Park County, Montana or Colorado.',
    costNote:
      'Park County pricing reflects Cody tourism demand, Yellowstone National Park gateway traffic, seasonal vacation-rental turnover, and competition among regional agents serving Park County communities.',
    tipVariant: 'tourist',
  },
  {
    slug: 'teton',
    name: 'Teton',
    seat: 'Jackson',
    city: 'Jackson',
    metro: 'teton-metro-wy',
    costTier: 'resort',
    citySlug: 'jackson',
    regional1: 'jackson-corridor',
    regional2: 'jackson-hole',
    topId: 'regional-teton-wy-movers',
    topName: 'Regional Jackson / Teton Providers',
    regional1Name: 'Jackson Corridor Moving',
    regional2Name: 'Jackson Hole Moving',
    marketNotes:
      'Teton County, WY anchors the Jackson Hole resort market with luxury homes, vacation properties, ski-town demand, and strong residential turnover across Grand Teton and Yellowstone gateway communities — not to be confused with Teton County, Idaho or Montana.',
    costNote:
      'Teton County pricing reflects Jackson Hole resort demand, ski-season and summer-tourism turnover, Teton Pass mountain-access logistics, and competition among full-service agents serving Teton County luxury and vacation-home communities.',
    tipVariant: 'tourist_mountain',
  },
  {
    slug: 'lincoln',
    name: 'Lincoln',
    seat: 'Kemmerer',
    city: 'Kemmerer',
    metro: 'lincoln-metro-wy',
    costTier: 'rural',
    citySlug: 'kemmerer',
    regional1: 'kemmerer-corridor',
    regional2: 'hams-fork',
    topId: 'regional-lincoln-wy-movers',
    topName: 'Regional Kemmerer / Lincoln Providers',
    regional1Name: 'Kemmerer Corridor Moving',
    regional2Name: "Ham's Fork Moving",
    marketNotes:
      'Lincoln County, WY is a southwestern Wyoming county centered on Kemmerer with rural residential and fossil-fuel corridor demand across Ham\'s Fork valley communities — not to be confused with Lincoln County, Montana or Nebraska.',
    costNote:
      'Lincoln County pricing reflects Kemmerer-area demand, remote southwestern Wyoming travel distances, energy-sector relocations, and competition among regional agents serving Lincoln County rural communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'uinta',
    name: 'Uinta',
    seat: 'Evanston',
    city: 'Evanston',
    metro: 'uinta-metro-wy',
    costTier: 'rural',
    citySlug: 'evanston',
    regional1: 'evanston-corridor',
    regional2: 'bear-river',
    topId: 'regional-uinta-wy-movers',
    topName: 'Regional Evanston / Uinta Providers',
    regional1Name: 'Evanston Corridor Moving',
    regional2Name: 'Bear River Moving',
    marketNotes:
      'Uinta County, WY is a southwestern Wyoming border county centered on Evanston with residential demand across Bear River corridor and I-80 gateway communities — not to be confused with Uintah County, Utah.',
    costNote:
      'Uinta County pricing reflects Evanston border-corridor demand, I-80 cross-state traffic, Utah metro spillover, and competition among regional agents serving Uinta County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'carbon',
    name: 'Carbon',
    seat: 'Rawlins',
    city: 'Rawlins',
    metro: 'carbon-metro-wy',
    costTier: 'rural',
    citySlug: 'rawlins',
    regional1: 'rawlins-corridor',
    regional2: 'great-divide',
    topId: 'regional-carbon-wy-movers',
    topName: 'Regional Rawlins / Carbon Providers',
    regional1Name: 'Rawlins Corridor Moving',
    regional2Name: 'Great Divide Basin Moving',
    marketNotes:
      'Carbon County, WY is a south-central Wyoming county centered on Rawlins with residential and energy-corridor demand across Great Divide Basin and I-80 corridor communities — not to be confused with Carbon County, Montana or Pennsylvania.',
    costNote:
      'Carbon County pricing reflects Rawlins-area demand, I-80 and US-287 corridor traffic, wind-energy and railroad workforce relocations, and competition among regional agents serving Carbon County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'converse',
    name: 'Converse',
    seat: 'Douglas',
    city: 'Douglas',
    metro: 'converse-metro-wy',
    costTier: 'rural',
    citySlug: 'douglas',
    regional1: 'douglas-corridor',
    regional2: 'north-platte-river',
    topId: 'regional-converse-wy-movers',
    topName: 'Regional Douglas / Converse Providers',
    regional1Name: 'Douglas Corridor Moving',
    regional2Name: 'North Platte River Moving',
    marketNotes:
      'Converse County is a central Wyoming county centered on Douglas with residential and energy-corridor demand across North Platte River basin and I-25 corridor communities.',
    costNote:
      'Converse County pricing reflects Douglas-area demand, oil-and-gas and ranch property logistics, I-25 corridor traffic, and competition among regional agents serving Converse County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'goshen',
    name: 'Goshen',
    seat: 'Torrington',
    city: 'Torrington',
    metro: 'goshen-metro-wy',
    costTier: 'rural',
    citySlug: 'torrington',
    regional1: 'torrington-corridor',
    regional2: 'north-platte-valley',
    topId: 'regional-goshen-wy-movers',
    topName: 'Regional Torrington / Goshen Providers',
    regional1Name: 'Torrington Corridor Moving',
    regional2Name: 'North Platte Valley Moving',
    marketNotes:
      'Goshen County is a southeastern Wyoming county centered on Torrington with agricultural, residential, and Nebraska border-corridor demand across North Platte Valley communities.',
    costNote:
      'Goshen County pricing reflects Torrington-area demand, agricultural property logistics, US-26 border-corridor traffic, and competition among regional agents serving Goshen County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'big-horn',
    name: 'Big Horn',
    seat: 'Basin',
    city: 'Basin',
    metro: 'big-horn-metro-wy',
    costTier: 'rural',
    citySlug: 'basin',
    regional1: 'basin-corridor',
    regional2: 'bighorn-canyon',
    topId: 'regional-bighorn-wy-movers',
    topName: 'Regional Basin / Big Horn Providers',
    regional1Name: 'Basin Corridor Moving',
    regional2Name: 'Bighorn Canyon Moving',
    marketNotes:
      'Big Horn County, WY is a north-central Wyoming county centered on Basin with rural residential demand across Bighorn Canyon and northern basin corridor communities — not to be confused with Big Horn County, Montana.',
    costNote:
      'Big Horn County pricing reflects Basin-area demand, remote Bighorn Basin travel distances, ranch property logistics, and competition among regional agents serving Big Horn County rural communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'johnson',
    name: 'Johnson',
    seat: 'Buffalo',
    city: 'Buffalo',
    metro: 'johnson-metro-wy',
    costTier: 'rural',
    citySlug: 'buffalo',
    regional1: 'buffalo-corridor',
    regional2: 'powder-river-breaks',
    topId: 'regional-johnson-wy-movers',
    topName: 'Regional Buffalo / Johnson Providers',
    regional1Name: 'Buffalo Corridor Moving',
    regional2Name: 'Powder River Breaks Moving',
    marketNotes:
      'Johnson County, WY is a north-central Wyoming county centered on Buffalo with ranch, residential, and Powder River Breaks corridor demand — not to be confused with Johnson County, Kansas or Tennessee.',
    costNote:
      'Johnson County pricing reflects Buffalo-area demand, ranch and foothills property logistics, I-25 and I-90 corridor traffic, and competition among regional agents serving Johnson County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'sublette',
    name: 'Sublette',
    seat: 'Pinedale',
    city: 'Pinedale',
    metro: 'sublette-metro-wy',
    costTier: 'rural',
    citySlug: 'pinedale',
    regional1: 'pinedale-corridor',
    regional2: 'wyoming-range',
    topId: 'regional-sublette-wy-movers',
    topName: 'Regional Pinedale / Sublette Providers',
    regional1Name: 'Pinedale Corridor Moving',
    regional2Name: 'Wyoming Range Moving',
    marketNotes:
      'Sublette County is a western Wyoming county centered on Pinedale with energy-sector, ranch, and mountain-corridor residential demand across the Wyoming Range and Green River basin.',
    costNote:
      'Sublette County pricing reflects Pinedale-area demand, natural-gas workforce relocations, mountain-road access logistics, and competition among regional agents serving Sublette County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'platte',
    name: 'Platte',
    seat: 'Wheatland',
    city: 'Wheatland',
    metro: 'platte-metro-wy',
    costTier: 'rural',
    citySlug: 'wheatland',
    regional1: 'wheatland-corridor',
    regional2: 'laramie-plains',
    topId: 'regional-platte-wy-movers',
    topName: 'Regional Wheatland / Platte Providers',
    regional1Name: 'Wheatland Corridor Moving',
    regional2Name: 'Laramie Plains Moving',
    marketNotes:
      'Platte County, WY is a southeastern Wyoming county centered on Wheatland with agricultural, residential, and Laramie Plains corridor demand — not to be confused with Platte County, Missouri or Nebraska.',
    costNote:
      'Platte County pricing reflects Wheatland-area demand, agricultural and ranch property logistics, I-25 corridor traffic, and competition among regional agents serving Platte County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'crook',
    name: 'Crook',
    seat: 'Sundance',
    city: 'Sundance',
    metro: 'crook-metro-wy',
    costTier: 'rural',
    citySlug: 'sundance',
    regional1: 'sundance-corridor',
    regional2: 'northeast-highlands',
    topId: 'regional-crook-wy-movers',
    topName: 'Regional Sundance / Crook Providers',
    regional1Name: 'Sundance Corridor Moving',
    regional2Name: 'Northeast Highlands Moving',
    marketNotes:
      'Crook County is a northeastern Wyoming county centered on Sundance with rural residential demand across Black Hills foothills and northeast highlands corridor communities.',
    costNote:
      'Crook County pricing reflects Sundance-area demand, remote northeast Wyoming travel distances, ranch property logistics, and competition among regional agents serving Crook County rural communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'washakie',
    name: 'Washakie',
    seat: 'Worland',
    city: 'Worland',
    metro: 'washakie-metro-wy',
    costTier: 'rural',
    citySlug: 'worland',
    regional1: 'worland-corridor',
    regional2: 'bighorn-river',
    topId: 'regional-washakie-wy-movers',
    topName: 'Regional Worland / Washakie Providers',
    regional1Name: 'Worland Corridor Moving',
    regional2Name: 'Bighorn River Moving',
    marketNotes:
      'Washakie County is a north-central Wyoming county centered on Worland with agricultural, residential, and Bighorn River corridor demand across the Bighorn Basin.',
    costNote:
      'Washakie County pricing reflects Worland-area demand, sugar-beet and agricultural property logistics, US-16 Bighorn Basin corridor traffic, and competition among regional agents serving Washakie County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'weston',
    name: 'Weston',
    seat: 'Newcastle',
    city: 'Newcastle',
    metro: 'weston-metro-wy',
    costTier: 'rural',
    citySlug: 'newcastle',
    regional1: 'newcastle-corridor',
    regional2: 'black-hills-foothills',
    topId: 'regional-weston-wy-movers',
    topName: 'Regional Newcastle / Weston Providers',
    regional1Name: 'Newcastle Corridor Moving',
    regional2Name: 'Black Hills Foothills Moving',
    marketNotes:
      'Weston County is a northeastern Wyoming county centered on Newcastle with rural residential demand across Black Hills foothills and energy-corridor gateway communities.',
    costNote:
      'Weston County pricing reflects Newcastle-area demand, remote northeast Wyoming travel distances, coal and ranch property logistics, and competition among regional agents serving Weston County rural communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'hot-springs',
    name: 'Hot Springs',
    seat: 'Thermopolis',
    city: 'Thermopolis',
    metro: 'hot-springs-metro-wy',
    costTier: 'rural',
    citySlug: 'thermopolis',
    regional1: 'thermopolis-corridor',
    regional2: 'bighorn-thermal',
    topId: 'regional-hotsprings-wy-movers',
    topName: 'Regional Thermopolis / Hot Springs Providers',
    regional1Name: 'Thermopolis Corridor Moving',
    regional2Name: 'Bighorn Thermal Springs Moving',
    marketNotes:
      'Hot Springs County is a north-central Wyoming county centered on Thermopolis with tourism, retirement, and residential demand across Bighorn River thermal-springs corridor communities.',
    costNote:
      'Hot Springs County pricing reflects Thermopolis tourism demand, seasonal visitor traffic, Bighorn Basin corridor logistics, and competition among regional agents serving Hot Springs County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'niobrara',
    name: 'Niobrara',
    seat: 'Lusk',
    city: 'Lusk',
    metro: 'niobrara-metro-wy',
    costTier: 'rural',
    citySlug: 'lusk',
    regional1: 'lusk-corridor',
    regional2: 'eastern-wyoming-plains',
    topId: 'regional-niobrara-wy-movers',
    topName: 'Regional Lusk / Niobrara Providers',
    regional1Name: 'Lusk Corridor Moving',
    regional2Name: 'Eastern Wyoming Plains Moving',
    marketNotes:
      'Niobrara County is a southeastern Wyoming county centered on Lusk with rural residential demand across eastern Wyoming plains and Nebraska–South Dakota border corridor communities.',
    costNote:
      'Niobrara County pricing reflects Lusk-area demand, remote eastern Wyoming travel distances, ranch property logistics, and competition among regional agents serving one of Wyoming\'s least populous counties.',
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
  return DISPLAY_LABELS[slug] ?? `${name} County, WY`;
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
      'Confirm insurance for high-value gateway homes, seasonal properties, and vacation rentals before move day.',
      base[3],
      base[4],
    ];
  }
  if (c.tipVariant === 'tourist_mountain') {
    return [
      base[0],
      'Resort-season congestion and ski-town traffic significantly impact scheduling — confirm peak-season crew availability.',
      'Mountain-home and vacation-rental logistics require route planning — confirm parking permits, elevator reservations, and driveway access.',
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
    `all-my-sons-${citySlug}-wy`,
    `${citySlug}-moving-${slug}-wy`,
    `${slug}-county-moving-${slug}-wy`,
    `college-hunks-moving-${citySlug}-wy`,
    `budd-van-lines-${citySlug}-wy`,
    `${c.regional1}-moving-${slug}-wy`,
    `${c.regional2}-moving-${slug}-wy`,
    `hercules-movers-${citySlug}-wy`,
    `krupp-moving-${citySlug}-wy`,
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
  laramie: [
    {
      quote:
        'Two Men and a Truck Cheyenne handled our capital-region move professionally — on time and extremely careful with our home.',
      name: 'Alex M.',
      location: 'Cheyenne, WY',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Cheyenne navigated our south Cheyenne relocation with fair pricing through Front Range corridor traffic.',
      name: 'Beth N.',
      location: 'Cheyenne, WY',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Capital Region Moving served our government-sector relocation efficiently with steady communication and professional crew coordination.',
      name: 'Carl O.',
      location: 'Cheyenne, WY',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
  natrona: [
    {
      quote:
        'Two Men and a Truck Casper handled our energy-basin move professionally — on time and extremely careful with our home.',
      name: 'Dana P.',
      location: 'Casper, WY',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Casper navigated our Mills relocation with fair pricing and excellent North Platte corridor scheduling.',
      name: 'Evan Q.',
      location: 'Mills, WY',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Energy Basin Moving served our move efficiently with punctual arrival and professional crew coordination.',
      name: 'Faye R.',
      location: 'Casper, WY',
      rating: 5,
      moveType: 'Single-family',
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
  const altLoc = c.seat !== c.city ? `${c.seat}, WY` : `${city}, WY`;
  return `  ${slugKey(c.slug)}: [
    { quote: ${q(`${c.topName} handled our ${city} move professionally — on time and extremely careful with our home.`)}, name: ${q(n1)}, location: ${q(`${city}, WY`)}, rating: 5, moveType: 'Single-family' },
    { quote: ${q(`All My Sons ${city} navigated our relocation with fair pricing and excellent regional scheduling.`)}, name: ${q(n2)}, location: ${q(altLoc)}, rating: 5, moveType: 'Townhome' },
    { quote: ${q(`${c.regional2Name} served our move efficiently with punctual arrival and professional crew coordination.`)}, name: ${q(n3)}, location: ${q(`${city}, WY`)}, rating: 5, moveType: 'Apartment' },
  ],`;
}

function buildNearbyLinks(slug: string): string {
  const wyNeighbors = WY_NEIGHBORS[slug] ?? [];
  const cross = CROSS_BORDER[slug] ?? [];
  const maxWy = Math.min(wyNeighbors.length, Math.max(3, 5 - cross.length));
  const links: string[] = [];

  for (const n of wyNeighbors.slice(0, maxWy)) {
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
      `href: ${q(`/local-movers/wyoming/${n}`)}`,
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

/** Hand-curated Wyoming county research — 23/23 */
export const wyomingCountyResearch: Record<string, CuratedCountyResearch> = {
${entries.join('\n')}
};

export function getWyomingCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return wyomingCountyResearch[countySlug];
}
`;
}

function genTestimonials(): string {
  const entries = COUNTIES.map((c, i) => buildTestimonials(c, i + 3));
  return `import type { CountyTestimonialEntry } from '@/lib/local-movers/county-seo';

/** Hand-curated Wyoming county testimonials — 23/23 */
export const wyomingCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
${entries.join('\n')}
};

export function getWyomingCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return wyomingCountyTestimonials[countySlug] ?? [];
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

/** Hand-curated Wyoming county mover lists — 23/23 */
const CURATED_WY_COUNTIES: Record<string, string[]> = {
${entries.join('\n')}
};

export const wyomingCountyMoverAssignments: CountyMoverAssignment[] =
  Object.entries(CURATED_WY_COUNTIES).map(([countySlug, moverIds]) => ({
    stateSlug: 'wyoming',
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

/** Seat and metro overrides for hand-curated Wyoming counties (23/23) */
export const wyomingCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
${entries.join('\n')}
};

export function applyWyomingCountyOverrides(county: LocalCounty): LocalCounty {
  const override = wyomingCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}
`;
}

function genNearby(): string {
  const entries = COUNTIES.map((c) => buildNearbyLinks(c.slug));
  return `import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Wyoming curated county corridor links — 23/23 */
const WY_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
${entries.join('\n')}
};

export function getWyomingNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return WY_COUNTY_NEIGHBORS[countySlug] ?? [];
}
`;
}

const OUTPUTS: { path: string; content: string }[] = [
  { path: 'data/wyoming-county-research.ts', content: genResearch() },
  { path: 'data/wyoming-county-testimonials.ts', content: genTestimonials() },
  { path: 'data/wyoming-county-assignments.ts', content: genAssignments() },
  { path: 'lib/local-movers/geography/wyoming-overrides.ts', content: genOverrides() },
  { path: 'lib/local-movers/wyoming-nearby.ts', content: genNearby() },
];

for (const { path, content } of OUTPUTS) {
  const full = join(ROOT, path);
  writeFileSync(full, content, 'utf8');
  console.log(`Wrote ${path}`);
}

console.log(
  `\nGenerated ${COUNTIES.length}/${EXPECTED_COUNT} Wyoming counties across ${OUTPUTS.length} files.`
);