/**
 * Generates Idaho county curation files (batch 1–2: 44/44 counties).
 * Run: npx tsx scripts/generate-idaho-county-data.ts
 */
import { writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(__dirname, '..');
const EXPECTED_COUNT = 44;

type CostTier = 'metro' | 'metro_boulder' | 'western_slope' | 'rural';

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
  batch1?: boolean;
  citySlug?: string;
  regional1?: string;
  regional2?: string;
  topId?: string;
  topName?: string;
  regional1Name?: string;
  regional2Name?: string;
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
  metro_boulder: {
    studioRange: '$950–$2,000',
    familyRange: '$3,800–$9,000+',
    avgHourly: '$125–$190/hr for a 2-person crew',
  },
};

const BATCH1_ASSIGNMENTS: Record<string, string[]> = {
  ada: [
    'twomenandatruck-ada-id',
    'all-my-sons-boise-id',
    'boise-moving-ada-id',
    'ada-county-moving-ada-id',
    'college-hunks-moving-boise-id',
    'budd-van-lines-boise-id',
    'boise-corridor-moving-ada-id',
    'treasure-valley-moving-ada-id',
    'hercules-movers-boise-id',
    'krupp-moving-boise-id',
  ],
  canyon: [
    'twomenandatruck-canyon-id',
    'all-my-sons-nampa-id',
    'nampa-moving-canyon-id',
    'canyon-county-moving-canyon-id',
    'college-hunks-moving-nampa-id',
    'budd-van-lines-nampa-id',
    'nampa-corridor-moving-canyon-id',
    'treasure-valley-west-moving-canyon-id',
    'hercules-movers-nampa-id',
    'krupp-moving-nampa-id',
  ],
  kootenai: [
    'twomenandatruck-kootenai-id',
    'all-my-sons-coeur-d-alene-id',
    'coeur-d-alene-moving-kootenai-id',
    'kootenai-county-moving-kootenai-id',
    'college-hunks-moving-coeur-d-alene-id',
    'budd-van-lines-coeur-d-alene-id',
    'coeur-dalene-corridor-moving-kootenai-id',
    'north-idaho-lakes-moving-kootenai-id',
    'hercules-movers-coeur-d-alene-id',
    'krupp-moving-coeur-d-alene-id',
  ],
};

const BATCH1_RESEARCH: Record<
  string,
  { marketNotes: string; costs: typeof COSTS.metro & { note: string }; tips: string[] }
> = {
  ada: {
    marketNotes:
      'Ada County is Idaho’s most populous county and the heart of the Boise metro with strong tech, suburban, and residential demand across the Treasure Valley.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$185/hr for a 2-person crew',
      note: 'Ada County pricing reflects Boise metro demand, I-84 Treasure Valley corridor traffic, tech-sector growth, and competition among full-service agents serving Ada County communities.',
    },
    tips: [
      'Verify coverage for Boise, Meridian, Eagle, and surrounding cities before booking.',
      'Treasure Valley traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  canyon: {
    marketNotes:
      'Canyon County is a rapidly growing Treasure Valley county west of Boise centered on Nampa with strong suburban and residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Canyon County pricing reflects Nampa and Caldwell suburban demand, Boise metro spillover, I-84 corridor traffic, and competition among full-service agents serving western Treasure Valley communities.',
    },
    tips: [
      'Verify coverage for Nampa, Caldwell, and surrounding cities before booking.',
      'Treasure Valley traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  kootenai: {
    marketNotes:
      'Kootenai County anchors northern Idaho’s Coeur d’Alene metro with lakeside residential, tourism, retirement, and outdoor-recreation demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$185/hr for a 2-person crew',
      note: 'Kootenai County pricing reflects Coeur d’Alene metro demand, north Idaho lakeside communities, Spokane metro spillover, and competition among full-service agents serving Kootenai County.',
    },
    tips: [
      'Verify coverage for Coeur d’Alene, Post Falls, Hayden, and surrounding cities before booking.',
      'North Idaho corridor traffic and seasonal tourism may impact scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value lakeside and vacation homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

const BATCH1_TESTIMONIALS: Record<
  string,
  { quote: string; name: string; location: string; rating: number; moveType: string }[]
> = {
  ada: [
    {
      quote:
        'Two Men and a Truck Boise handled our move professionally — on time and extremely careful with our home.',
      name: 'Alex M.',
      location: 'Boise, ID',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Boise navigated our Meridian relocation with fair pricing through Treasure Valley traffic.',
      name: 'Beth N.',
      location: 'Meridian, ID',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Treasure Valley Moving served our Eagle-area move efficiently with steady communication and professional crew coordination.',
      name: 'Carl O.',
      location: 'Eagle, ID',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
  canyon: [
    {
      quote:
        'Two Men and a Truck Nampa handled our suburban move professionally — on time and extremely careful.',
      name: 'Dana P.',
      location: 'Nampa, ID',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Nampa navigated our Caldwell relocation with fair pricing and excellent Treasure Valley scheduling.',
      name: 'Evan Q.',
      location: 'Caldwell, ID',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Treasure Valley West Moving served our move efficiently with punctual arrival and professional coordination.',
      name: 'Faye R.',
      location: 'Nampa, ID',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  kootenai: [
    {
      quote:
        'Two Men and a Truck Coeur d’Alene handled our lakeside move professionally — on time and extremely careful with our home.',
      name: 'Glen S.',
      location: "Coeur d'Alene, ID",
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Coeur d’Alene navigated our Post Falls relocation with fair pricing and excellent north Idaho scheduling.',
      name: 'Hope T.',
      location: 'Post Falls, ID',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'North Idaho Lakes Moving served our Hayden-area move efficiently with professional crew coordination.',
      name: 'Ira U.',
      location: 'Hayden, ID',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
};

/** Slug collisions with other states — always use explicit ID displayLabel */
const DISPLAY_LABELS: Partial<Record<string, string>> = {
  jefferson: 'Jefferson County, ID',
  idaho: 'Idaho County, ID',
  washington: 'Washington County, ID',
  lincoln: 'Lincoln County, ID',
  adams: 'Adams County, ID',
  custer: 'Custer County, ID',
  franklin: 'Franklin County, ID',
  fremont: 'Fremont County, ID',
  'bear-lake': 'Bear Lake County, ID',
  oneida: 'Oneida County, ID',
  owyhee: 'Owyhee County, ID',
  valley: 'Valley County, ID',
  lemhi: 'Lemhi County, ID',
  clearwater: 'Clearwater County, ID',
  boise: 'Boise County, ID',
  camas: 'Camas County, ID',
  power: 'Power County, ID',
  clark: 'Clark County, ID',
  teton: 'Teton County, ID',
  caribou: 'Caribou County, ID',
  benewah: 'Benewah County, ID',
  boundary: 'Boundary County, ID',
  shoshone: 'Shoshone County, ID',
  lewis: 'Lewis County, ID',
  elmore: 'Elmore County, ID',
  butte: 'Butte County, ID',
};

const ID_NEIGHBORS: Record<string, string[]> = {
  ada: ['canyon', 'gem', 'elmore', 'boise', 'owyhee'],
  canyon: ['ada', 'payette', 'gem', 'owyhee', 'washington'],
  kootenai: ['bonner', 'benewah', 'shoshone', 'boundary', 'latah'],
  bonneville: ['bingham', 'madison', 'jefferson', 'caribou', 'teton'],
  'twin-falls': ['jerome', 'cassia', 'minidoka', 'gooding', 'camas'],
  bannock: ['bingham', 'power', 'caribou', 'bear-lake', 'oneida'],
  madison: ['jefferson', 'bonneville', 'fremont', 'teton', 'bingham'],
  bonner: ['kootenai', 'boundary', 'benewah', 'shoshone', 'clearwater'],
  bingham: ['bonneville', 'bannock', 'jefferson', 'madison', 'power'],
  'nez-perce': ['latah', 'clearwater', 'lewis', 'idaho', 'adams'],
  latah: ['nez-perce', 'clearwater', 'benewah', 'kootenai', 'lewis'],
  jefferson: ['madison', 'bonneville', 'bingham', 'fremont', 'clark'],
  elmore: ['ada', 'boise', 'camas', 'owyhee', 'blaine'],
  payette: ['canyon', 'washington', 'gem', 'ada', 'owyhee'],
  cassia: ['twin-falls', 'minidoka', 'power', 'oneida', 'blaine'],
  jerome: ['twin-falls', 'gooding', 'minidoka', 'lincoln', 'camas'],
  blaine: ['camas', 'custer', 'elmore', 'cassia', 'butte'],
  minidoka: ['cassia', 'jerome', 'twin-falls', 'power', 'blaine'],
  gem: ['ada', 'canyon', 'payette', 'boise', 'elmore'],
  idaho: ['clearwater', 'lewis', 'adams', 'valley', 'lemhi'],
  gooding: ['jerome', 'lincoln', 'camas', 'twin-falls', 'minidoka'],
  franklin: ['oneida', 'bannock', 'bear-lake'],
  shoshone: ['benewah', 'kootenai', 'bonner', 'clearwater'],
  boundary: ['bonner', 'kootenai', 'benewah', 'shoshone'],
  fremont: ['clark', 'jefferson', 'madison', 'teton'],
  teton: ['fremont', 'madison', 'bonneville'],
  valley: ['adams', 'boise', 'custer', 'idaho', 'lemhi'],
  owyhee: ['ada', 'canyon', 'elmore', 'twin-falls', 'cassia'],
  washington: ['adams', 'canyon', 'payette'],
  benewah: ['bonner', 'kootenai', 'shoshone'],
  clearwater: ['idaho', 'lewis', 'nez-perce', 'shoshone'],
  boise: ['ada', 'custer', 'elmore', 'gem', 'valley'],
  lemhi: ['blaine', 'butte', 'custer', 'idaho', 'valley'],
  power: ['bannock', 'bingham', 'caribou', 'cassia', 'minidoka'],
  caribou: ['bannock', 'bear-lake', 'bingham', 'bonneville', 'franklin'],
  'bear-lake': ['bannock', 'caribou', 'franklin', 'oneida'],
  lincoln: ['blaine', 'camas', 'gooding', 'jerome', 'minidoka'],
  oneida: ['bannock', 'bear-lake', 'cassia', 'franklin', 'power'],
  adams: ['idaho', 'valley', 'washington'],
  custer: ['blaine', 'boise', 'butte', 'lemhi', 'valley'],
  lewis: ['clearwater', 'idaho', 'latah', 'nez-perce'],
  butte: ['blaine', 'custer', 'lemhi'],
  camas: ['blaine', 'elmore', 'gooding', 'jerome', 'twin-falls'],
  clark: ['fremont', 'jefferson', 'lemhi', 'madison'],
};

type CrossBorder = {
  slug: string;
  stateSlug: string;
  name: string;
  seat: string;
  displayLabel: string;
};

const CROSS_BORDER: Partial<Record<string, CrossBorder[]>> = {
  kootenai: [
    {
      slug: 'spokane',
      stateSlug: 'washington',
      name: 'Spokane',
      seat: 'Spokane',
      displayLabel: 'Spokane County, WA',
    },
  ],
  latah: [
    {
      slug: 'whitman',
      stateSlug: 'washington',
      name: 'Whitman',
      seat: 'Colfax',
      displayLabel: 'Whitman County, WA',
    },
  ],
  payette: [
    {
      slug: 'malheur',
      stateSlug: 'oregon',
      name: 'Malheur',
      seat: 'Vale',
      displayLabel: 'Malheur County, OR',
    },
  ],
  bonneville: [
    {
      slug: 'salt-lake',
      stateSlug: 'utah',
      name: 'Salt Lake',
      seat: 'Salt Lake City',
      displayLabel: 'Salt Lake County, UT',
    },
  ],
  bannock: [
    {
      slug: 'box-elder',
      stateSlug: 'utah',
      name: 'Box Elder',
      seat: 'Brigham City',
      displayLabel: 'Box Elder County, UT',
    },
  ],
};

const COUNTIES: CountyDef[] = [
  {
    slug: 'ada',
    name: 'Ada',
    seat: 'Boise',
    city: 'Boise',
    metro: 'ada-metro-id',
    costTier: 'metro',
    marketNotes: '',
    costNote: '',
    tipVariant: 'standard',
    batch1: true,
  },
  {
    slug: 'canyon',
    name: 'Canyon',
    seat: 'Caldwell',
    city: 'Nampa',
    metro: 'canyon-metro-id',
    costTier: 'western_slope',
    marketNotes: '',
    costNote: '',
    tipVariant: 'standard',
    batch1: true,
  },
  {
    slug: 'kootenai',
    name: 'Kootenai',
    seat: "Coeur d'Alene",
    city: "Coeur d'Alene",
    metro: 'kootenai-metro-id',
    costTier: 'metro',
    marketNotes: '',
    costNote: '',
    tipVariant: 'standard',
    batch1: true,
  },
  {
    slug: 'bonneville',
    name: 'Bonneville',
    seat: 'Idaho Falls',
    city: 'Idaho Falls',
    metro: 'bonneville-metro-id',
    costTier: 'western_slope',
    citySlug: 'idaho-falls',
    regional1: 'idaho-falls-corridor',
    regional2: 'eastern-snake-river',
    topId: 'regional-bonneville-id-movers',
    topName: 'Regional Idaho Falls / Bonneville Providers',
    regional1Name: 'Idaho Falls Corridor Moving',
    regional2Name: 'Eastern Snake River Moving',
    marketNotes:
      'Bonneville County anchors eastern Idaho’s Idaho Falls metro with residential, agricultural, and energy-corridor demand across the upper Snake River plain.',
    costNote:
      'Bonneville County pricing reflects Idaho Falls metro demand, I-15 and US-20 corridor traffic, and competition among regional agents serving eastern Idaho communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'twin-falls',
    name: 'Twin Falls',
    seat: 'Twin Falls',
    city: 'Twin Falls',
    metro: 'twin-falls-metro-id',
    costTier: 'rural',
    citySlug: 'twin-falls',
    regional1: 'twin-falls-corridor',
    regional2: 'magic-valley',
    topId: 'regional-twinfalls-id-movers',
    topName: 'Regional Twin Falls / Twin Falls County Providers',
    regional1Name: 'Twin Falls Corridor Moving',
    regional2Name: 'Magic Valley Moving',
    marketNotes:
      'Twin Falls County is the commercial hub of Idaho’s Magic Valley with residential and agricultural demand across Twin Falls and surrounding valley communities.',
    costNote:
      'Twin Falls County pricing reflects Magic Valley demand, I-84 corridor traffic, agricultural logistics, and competition among regional agents serving southern Idaho communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'bannock',
    name: 'Bannock',
    seat: 'Pocatello',
    city: 'Pocatello',
    metro: 'bannock-metro-id',
    costTier: 'rural',
    citySlug: 'pocatello',
    regional1: 'pocatello-corridor',
    regional2: 'portneuf-valley',
    topId: 'regional-bannock-id-movers',
    topName: 'Regional Pocatello / Bannock Providers',
    regional1Name: 'Pocatello Corridor Moving',
    regional2Name: 'Portneuf Valley Moving',
    marketNotes:
      'Bannock County is an eastern Idaho county centered on Pocatello with residential, university, and Portneuf Valley corridor demand.',
    costNote:
      'Bannock County pricing reflects Pocatello-area demand, I-15 and I-86 corridor traffic, and competition among regional agents serving southeastern Idaho communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'madison',
    name: 'Madison',
    seat: 'Rexburg',
    city: 'Rexburg',
    metro: 'madison-metro-id',
    costTier: 'rural',
    citySlug: 'rexburg',
    regional1: 'rexburg-corridor',
    regional2: 'upper-valley',
    topId: 'regional-madison-id-movers',
    topName: 'Regional Rexburg / Madison Providers',
    regional1Name: 'Rexburg Corridor Moving',
    regional2Name: 'Upper Valley Moving',
    marketNotes:
      'Madison County is an eastern Idaho county centered on Rexburg with strong BYU-Idaho university turnover and upper valley residential demand.',
    costNote:
      'Madison County pricing reflects Rexburg university-area turnover, upper valley corridor logistics, and competition among regional agents serving eastern Idaho communities.',
    tipVariant: 'university',
  },
  {
    slug: 'bonner',
    name: 'Bonner',
    seat: 'Sandpoint',
    city: 'Sandpoint',
    metro: 'bonner-metro-id',
    costTier: 'metro',
    citySlug: 'sandpoint',
    regional1: 'sandpoint-corridor',
    regional2: 'pend-oreille',
    topId: 'regional-bonner-id-movers',
    topName: 'Regional Sandpoint / Bonner Providers',
    regional1Name: 'Sandpoint Corridor Moving',
    regional2Name: 'Pend Oreille Moving',
    marketNotes:
      'Bonner County is a northern Idaho county centered on Sandpoint with lakeside residential, tourism, and outdoor-recreation demand across Pend Oreille corridor communities.',
    costNote:
      'Bonner County pricing reflects Sandpoint-area demand, north Idaho lakeside logistics, seasonal tourism traffic, and competition among full-service agents serving Bonner County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'bingham',
    name: 'Bingham',
    seat: 'Blackfoot',
    city: 'Blackfoot',
    metro: 'bingham-metro-id',
    costTier: 'rural',
    citySlug: 'blackfoot',
    regional1: 'blackfoot-corridor',
    regional2: 'snake-river-plain',
    topId: 'regional-bingham-id-movers',
    topName: 'Regional Blackfoot / Bingham Providers',
    regional1Name: 'Blackfoot Corridor Moving',
    regional2Name: 'Snake River Plain Moving',
    marketNotes:
      'Bingham County is an eastern Idaho county centered on Blackfoot with residential and agricultural demand across Snake River plain communities.',
    costNote:
      'Bingham County pricing reflects Blackfoot-area demand, US-20 and I-15 corridor traffic, and competition among regional agents serving eastern Idaho agricultural communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'nez-perce',
    name: 'Nez Perce',
    seat: 'Lewiston',
    city: 'Lewiston',
    metro: 'nez-perce-metro-id',
    costTier: 'rural',
    citySlug: 'lewiston',
    regional1: 'lewiston-corridor',
    regional2: 'clearwater-confluence',
    topId: 'regional-nezperce-id-movers',
    topName: 'Regional Lewiston / Nez Perce Providers',
    regional1Name: 'Lewiston Corridor Moving',
    regional2Name: 'Clearwater Confluence Moving',
    marketNotes:
      'Nez Perce County anchors north-central Idaho’s Lewiston metro with residential, port, and Clearwater River confluence corridor demand.',
    costNote:
      'Nez Perce County pricing reflects Lewiston-area demand, Snake and Clearwater river corridor logistics, and competition among regional agents serving north-central Idaho communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'latah',
    name: 'Latah',
    seat: 'Moscow',
    city: 'Moscow',
    metro: 'latah-metro-id',
    costTier: 'rural',
    citySlug: 'moscow',
    regional1: 'moscow-corridor',
    regional2: 'palouse',
    topId: 'regional-latah-id-movers',
    topName: 'Regional Moscow / Latah Providers',
    regional1Name: 'Moscow Corridor Moving',
    regional2Name: 'Palouse Moving',
    marketNotes:
      'Latah County is a north-central Idaho county centered on Moscow with University of Idaho turnover and Palouse agricultural-residential demand.',
    costNote:
      'Latah County pricing reflects Moscow university-area turnover, Palouse corridor logistics, and competition among regional agents serving north-central Idaho communities.',
    tipVariant: 'university',
  },
  {
    slug: 'jefferson',
    name: 'Jefferson',
    seat: 'Rigby',
    city: 'Rigby',
    metro: 'jefferson-metro-id',
    costTier: 'rural',
    citySlug: 'rigby',
    regional1: 'rigby-corridor',
    regional2: 'eastern-upper-valley',
    topId: 'regional-jefferson-id-movers',
    topName: 'Regional Rigby / Jefferson Providers',
    regional1Name: 'Rigby Corridor Moving',
    regional2Name: 'Eastern Upper Valley Moving',
    marketNotes:
      'Jefferson County, ID is an eastern Idaho county centered on Rigby with residential demand across the eastern upper valley between Idaho Falls and Rexburg.',
    costNote:
      'Jefferson County pricing reflects Rigby-area demand, upper valley corridor logistics, and competition among regional agents serving eastern Idaho communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'elmore',
    name: 'Elmore',
    seat: 'Mountain Home',
    city: 'Mountain Home',
    metro: 'elmore-metro-id',
    costTier: 'rural',
    citySlug: 'mountain-home',
    regional1: 'mountain-home-corridor',
    regional2: 'southwest-idaho',
    topId: 'regional-elmore-id-movers',
    topName: 'Regional Mountain Home / Elmore Providers',
    regional1Name: 'Mountain Home Corridor Moving',
    regional2Name: 'Southwest Idaho Moving',
    marketNotes:
      'Elmore County is a southwestern Idaho county centered on Mountain Home with residential and Mountain Home Air Force Base PCS demand across high-desert corridor communities.',
    costNote:
      'Elmore County pricing reflects Mountain Home-area demand, I-84 and US-20 corridor traffic, military PCS turnover, and competition among regional agents serving southwestern Idaho communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'payette',
    name: 'Payette',
    seat: 'Payette',
    city: 'Payette',
    metro: 'payette-metro-id',
    costTier: 'rural',
    citySlug: 'payette',
    regional1: 'payette-corridor',
    regional2: 'treasure-valley-north',
    topId: 'regional-payette-id-movers',
    topName: 'Regional Payette / Payette County Providers',
    regional1Name: 'Payette Corridor Moving',
    regional2Name: 'Treasure Valley North Moving',
    marketNotes:
      'Payette County is a southwestern Idaho county with residential and agricultural demand across Payette and northern Treasure Valley communities.',
    costNote:
      'Payette County pricing reflects Payette-area demand, US-95 corridor traffic, and competition among regional agents serving southwestern Idaho communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'cassia',
    name: 'Cassia',
    seat: 'Burley',
    city: 'Burley',
    metro: 'cassia-metro-id',
    costTier: 'rural',
    citySlug: 'burley',
    regional1: 'burley-corridor',
    regional2: 'magic-valley-east',
    topId: 'regional-cassia-id-movers',
    topName: 'Regional Burley / Cassia Providers',
    regional1Name: 'Burley Corridor Moving',
    regional2Name: 'Magic Valley East Moving',
    marketNotes:
      'Cassia County is a southern Magic Valley county centered on Burley with residential and agricultural demand across eastern valley communities.',
    costNote:
      'Cassia County pricing reflects Burley-area demand, US-30 corridor traffic, and competition among regional agents serving southern Magic Valley communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'jerome',
    name: 'Jerome',
    seat: 'Jerome',
    city: 'Jerome',
    metro: 'jerome-metro-id',
    costTier: 'rural',
    citySlug: 'jerome',
    regional1: 'jerome-corridor',
    regional2: 'magic-valley-central',
    topId: 'regional-jerome-id-movers',
    topName: 'Regional Jerome / Jerome County Providers',
    regional1Name: 'Jerome Corridor Moving',
    regional2Name: 'Magic Valley Central Moving',
    marketNotes:
      'Jerome County is a central Magic Valley county with residential and agricultural demand across Jerome and I-84 corridor communities.',
    costNote:
      'Jerome County pricing reflects Jerome-area demand, Magic Valley corridor traffic, and competition among regional agents serving central southern Idaho communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'blaine',
    name: 'Blaine',
    seat: 'Hailey',
    city: 'Hailey',
    metro: 'blaine-metro-id',
    costTier: 'metro_boulder',
    citySlug: 'hailey',
    regional1: 'hailey-corridor',
    regional2: 'sun-valley-resort',
    topId: 'regional-blaine-id-movers',
    topName: 'Regional Hailey / Blaine Providers',
    regional1Name: 'Hailey Corridor Moving',
    regional2Name: 'Sun Valley Resort Moving',
    marketNotes:
      'Blaine County anchors Idaho’s Sun Valley resort market with luxury homes, vacation properties, and strong demand across Hailey, Ketchum, and mountain resort communities.',
    costNote:
      'Blaine County pricing reflects Sun Valley resort demand, ski-season turnover, mountain-access logistics, and competition among full-service agents serving Blaine County resort communities.',
    tipVariant: 'tourist_mountain',
  },
  {
    slug: 'minidoka',
    name: 'Minidoka',
    seat: 'Rupert',
    city: 'Rupert',
    metro: 'minidoka-metro-id',
    costTier: 'rural',
    citySlug: 'rupert',
    regional1: 'rupert-corridor',
    regional2: 'magic-valley-south',
    topId: 'regional-minidoka-id-movers',
    topName: 'Regional Rupert / Minidoka Providers',
    regional1Name: 'Rupert Corridor Moving',
    regional2Name: 'Magic Valley South Moving',
    marketNotes:
      'Minidoka County is a southern Magic Valley county centered on Rupert with residential and agricultural demand across southern valley communities.',
    costNote:
      'Minidoka County pricing reflects Rupert-area demand, US-30 corridor traffic, and competition among regional agents serving southern Magic Valley communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'gem',
    name: 'Gem',
    seat: 'Emmett',
    city: 'Emmett',
    metro: 'gem-metro-id',
    costTier: 'rural',
    citySlug: 'emmett',
    regional1: 'emmett-corridor',
    regional2: 'payette-river',
    topId: 'regional-gem-id-movers',
    topName: 'Regional Emmett / Gem Providers',
    regional1Name: 'Emmett Corridor Moving',
    regional2Name: 'Payette River Moving',
    marketNotes:
      'Gem County is a southwestern Idaho county centered on Emmett with residential demand across Payette River valley communities north of the Treasure Valley.',
    costNote:
      'Gem County pricing reflects Emmett-area demand, Payette River corridor logistics, Boise metro spillover, and competition among regional agents serving southwestern Idaho communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'idaho',
    name: 'Idaho',
    seat: 'Grangeville',
    city: 'Grangeville',
    metro: 'idaho-metro-id',
    costTier: 'rural',
    citySlug: 'grangeville',
    regional1: 'grangeville-corridor',
    regional2: 'central-idaho',
    topId: 'regional-idaho-id-movers',
    topName: 'Regional Grangeville / Idaho County Providers',
    regional1Name: 'Grangeville Corridor Moving',
    regional2Name: 'Central Idaho Moving',
    marketNotes:
      'Idaho County, ID spans Grangeville and vast central Idaho rural communities with ranch, timber, and outdoor-recreation demand — not to be confused with the State of Idaho.',
    costNote:
      'Idaho County pricing reflects Grangeville-area demand, remote central Idaho travel distances, and competition among regional agents serving rural mountain corridor communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'gooding',
    name: 'Gooding',
    seat: 'Gooding',
    city: 'Gooding',
    metro: 'gooding-metro-id',
    costTier: 'rural',
    citySlug: 'gooding',
    regional1: 'gooding-corridor',
    regional2: 'magic-valley-west',
    topId: 'regional-gooding-id-movers',
    topName: 'Regional Gooding / Gooding County Providers',
    regional1Name: 'Gooding Corridor Moving',
    regional2Name: 'Magic Valley West Moving',
    marketNotes:
      'Gooding County is a southern Idaho county with residential and agricultural demand across Gooding and western Magic Valley communities.',
    costNote:
      'Gooding County pricing reflects Gooding-area demand, US-26 corridor traffic, and competition among regional agents serving southern Idaho communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'franklin',
    name: 'Franklin',
    seat: 'Preston',
    city: 'Preston',
    metro: 'franklin-metro-id',
    costTier: 'rural',
    citySlug: 'preston',
    regional1: 'preston-corridor',
    regional2: 'cache-valley',
    topId: 'regional-franklin-id-movers',
    topName: 'Regional Preston / Franklin Providers',
    regional1Name: 'Preston Corridor Moving',
    regional2Name: 'Cache Valley Moving',
    marketNotes:
      'Franklin County is a southeastern Idaho county centered on Preston with residential and agricultural demand across Cache Valley corridor communities.',
    costNote:
      'Franklin County pricing reflects Preston-area demand, US-91 corridor traffic, and competition among regional agents serving southeastern Idaho communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'shoshone',
    name: 'Shoshone',
    seat: 'Wallace',
    city: 'Wallace',
    metro: 'shoshone-metro-id',
    costTier: 'rural',
    citySlug: 'wallace',
    regional1: 'wallace-corridor',
    regional2: 'silver-valley',
    topId: 'regional-shoshone-id-movers',
    topName: 'Regional Wallace / Shoshone County, ID Providers',
    regional1Name: 'Wallace Corridor Moving',
    regional2Name: 'Silver Valley Moving',
    marketNotes:
      'Shoshone County, ID is a northern Idaho mining and timber county centered on Wallace with residential demand across Silver Valley corridor communities — not to be confused with the city of Shoshone in Lincoln County.',
    costNote:
      'Shoshone County pricing reflects Wallace-area demand, I-90 corridor traffic, mountain-access logistics, and competition among regional agents serving northern Idaho Silver Valley communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'boundary',
    name: 'Boundary',
    seat: 'Bonners Ferry',
    city: 'Bonners Ferry',
    metro: 'boundary-metro-id',
    costTier: 'rural',
    citySlug: 'bonners-ferry',
    regional1: 'bonners-ferry-corridor',
    regional2: 'kootenai-north',
    topId: 'regional-boundary-id-movers',
    topName: 'Regional Bonners Ferry / Boundary Providers',
    regional1Name: 'Bonners Ferry Corridor Moving',
    regional2Name: 'Kootenai North Moving',
    marketNotes:
      'Boundary County is Idaho’s northern panhandle county centered on Bonners Ferry with residential, timber, and cross-border corridor demand.',
    costNote:
      'Boundary County pricing reflects Bonners Ferry-area demand, US-95 corridor traffic, and competition among regional agents serving Idaho panhandle communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'fremont',
    name: 'Fremont',
    seat: 'St. Anthony',
    city: 'St. Anthony',
    metro: 'fremont-metro-id',
    costTier: 'rural',
    citySlug: 'st-anthony',
    regional1: 'st-anthony-corridor',
    regional2: 'henrys-fork',
    topId: 'regional-fremont-id-movers',
    topName: 'Regional St. Anthony / Fremont County, ID Providers',
    regional1Name: 'St. Anthony Corridor Moving',
    regional2Name: "Henry's Fork Moving",
    marketNotes:
      'Fremont County, ID is an eastern Idaho county centered on St. Anthony with residential and agricultural demand across Henry’s Fork and Island Park corridor communities.',
    costNote:
      'Fremont County pricing reflects St. Anthony-area demand, US-20 corridor traffic, and competition among regional agents serving eastern upper valley communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'teton',
    name: 'Teton',
    seat: 'Driggs',
    city: 'Driggs',
    metro: 'teton-metro-id',
    costTier: 'metro',
    citySlug: 'driggs',
    regional1: 'driggs-corridor',
    regional2: 'teton-valley',
    topId: 'regional-teton-id-movers',
    topName: 'Regional Driggs / Teton Providers',
    regional1Name: 'Driggs Corridor Moving',
    regional2Name: 'Teton Valley Moving',
    marketNotes:
      'Teton County anchors Idaho’s Teton Valley resort gateway with strong residential, tourism, and second-home demand across Driggs, Victor, and mountain corridor communities.',
    costNote:
      'Teton County pricing reflects Driggs-area resort demand, Teton Pass corridor traffic, ski-season turnover, and competition among full-service agents serving Teton Valley communities.',
    tipVariant: 'tourist_mountain',
  },
  {
    slug: 'valley',
    name: 'Valley',
    seat: 'Cascade',
    city: 'Cascade',
    metro: 'valley-metro-id',
    costTier: 'metro',
    citySlug: 'cascade',
    regional1: 'cascade-corridor',
    regional2: 'mccall-area',
    topId: 'regional-valley-id-movers',
    topName: 'Regional Cascade / Valley Providers',
    regional1Name: 'Cascade Corridor Moving',
    regional2Name: 'McCall Area Moving',
    marketNotes:
      'Valley County is a central Idaho lakes and mountain county centered on Cascade with tourism, vacation-home, and residential demand across Payette Lakes corridor communities.',
    costNote:
      'Valley County pricing reflects Cascade-area demand, Payette Lakes tourism-season traffic, mountain-access logistics, and competition among full-service agents serving central Idaho resort communities.',
    tipVariant: 'tourist_mountain',
  },
  {
    slug: 'owyhee',
    name: 'Owyhee',
    seat: 'Murphy',
    city: 'Murphy',
    metro: 'owyhee-metro-id',
    costTier: 'rural',
    citySlug: 'murphy',
    regional1: 'murphy-corridor',
    regional2: 'owyhee-desert',
    topId: 'regional-owyhee-id-movers',
    topName: 'Regional Murphy / Owyhee Providers',
    regional1Name: 'Murphy Corridor Moving',
    regional2Name: 'Owyhee Desert Moving',
    marketNotes:
      'Owyhee County is Idaho’s vast southwestern high-desert county with ranch, agricultural, and remote residential demand across Murphy and Owyhee Mountains corridor communities.',
    costNote:
      'Owyhee County pricing reflects Murphy-area demand, long rural travel distances, and competition among regional agents serving southwestern Idaho high-desert communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'washington',
    name: 'Washington',
    seat: 'Weiser',
    city: 'Weiser',
    metro: 'washington-metro-id',
    costTier: 'rural',
    citySlug: 'weiser',
    regional1: 'weiser-corridor',
    regional2: 'treasure-valley-west-border',
    topId: 'regional-washington-id-movers',
    topName: 'Regional Weiser / Washington Providers',
    regional1Name: 'Weiser Corridor Moving',
    regional2Name: 'Treasure Valley West Border Moving',
    marketNotes:
      'Washington County, ID is a southwestern Idaho county centered on Weiser with residential and agricultural demand across US-95 corridor communities — not to be confused with Washington State.',
    costNote:
      'Washington County pricing reflects Weiser-area demand, US-95 corridor traffic, and competition among regional agents serving southwestern Idaho border communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'benewah',
    name: 'Benewah',
    seat: 'St. Maries',
    city: 'St. Maries',
    metro: 'benewah-metro-id',
    costTier: 'rural',
    citySlug: 'st-maries',
    regional1: 'st-maries-corridor',
    regional2: 'st-joe-river',
    topId: 'regional-benewah-id-movers',
    topName: 'Regional St. Maries / Benewah Providers',
    regional1Name: 'St. Maries Corridor Moving',
    regional2Name: 'St. Joe River Moving',
    marketNotes:
      'Benewah County is a northern Idaho county centered on St. Maries with residential and timber demand across St. Joe River corridor communities.',
    costNote:
      'Benewah County pricing reflects St. Maries-area demand, US-95 corridor traffic, and competition among regional agents serving northern Idaho panhandle communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'clearwater',
    name: 'Clearwater',
    seat: 'Orofino',
    city: 'Orofino',
    metro: 'clearwater-metro-id',
    costTier: 'rural',
    citySlug: 'orofino',
    regional1: 'orofino-corridor',
    regional2: 'clearwater-river',
    topId: 'regional-clearwater-id-movers',
    topName: 'Regional Orofino / Clearwater Providers',
    regional1Name: 'Orofino Corridor Moving',
    regional2Name: 'Clearwater River Moving',
    marketNotes:
      'Clearwater County is a north-central Idaho county centered on Orofino with residential, timber, and Clearwater River corridor demand.',
    costNote:
      'Clearwater County pricing reflects Orofino-area demand, US-12 corridor traffic, and competition among regional agents serving north-central Idaho river communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'boise',
    name: 'Boise',
    seat: 'Idaho City',
    city: 'Idaho City',
    metro: 'boise-metro-id',
    costTier: 'rural',
    citySlug: 'idaho-city',
    regional1: 'idaho-city-corridor',
    regional2: 'boise-basin',
    topId: 'regional-boise-id-movers',
    topName: 'Regional Idaho City / Boise County, ID Providers',
    regional1Name: 'Idaho City Corridor Moving',
    regional2Name: 'Boise Basin Moving',
    marketNotes:
      'Boise County, ID spans Idaho City and mountain basin communities north of the Treasure Valley — not to be confused with Ada County or the City of Boise.',
    costNote:
      'Boise County pricing reflects Idaho City-area demand, mountain-access logistics, Boise metro spillover, and competition among regional agents serving Treasure Valley fringe communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'lemhi',
    name: 'Lemhi',
    seat: 'Salmon',
    city: 'Salmon',
    metro: 'lemhi-metro-id',
    costTier: 'rural',
    citySlug: 'salmon',
    regional1: 'salmon-corridor',
    regional2: 'salmon-river',
    topId: 'regional-lemhi-id-movers',
    topName: 'Regional Salmon / Lemhi Providers',
    regional1Name: 'Salmon Corridor Moving',
    regional2Name: 'Salmon River Moving',
    marketNotes:
      'Lemhi County is a central Idaho county centered on Salmon with ranch, timber, and Salmon River corridor demand across vast rural mountain communities.',
    costNote:
      'Lemhi County pricing reflects Salmon-area demand, US-93 corridor traffic, remote travel distances, and competition among regional agents serving central Idaho river communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'power',
    name: 'Power',
    seat: 'American Falls',
    city: 'American Falls',
    metro: 'power-metro-id',
    costTier: 'rural',
    citySlug: 'american-falls',
    regional1: 'american-falls-corridor',
    regional2: 'snake-river-southeast',
    topId: 'regional-power-id-movers',
    topName: 'Regional American Falls / Power Providers',
    regional1Name: 'American Falls Corridor Moving',
    regional2Name: 'Snake River Southeast Moving',
    marketNotes:
      'Power County is an eastern Idaho county centered on American Falls with residential and agricultural demand across Snake River plain communities.',
    costNote:
      'Power County pricing reflects American Falls-area demand, I-86 corridor traffic, and competition among regional agents serving southeastern Idaho agricultural communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'caribou',
    name: 'Caribou',
    seat: 'Soda Springs',
    city: 'Soda Springs',
    metro: 'caribou-metro-id',
    costTier: 'rural',
    citySlug: 'soda-springs',
    regional1: 'soda-springs-corridor',
    regional2: 'caribou-highlands',
    topId: 'regional-caribou-id-movers',
    topName: 'Regional Soda Springs / Caribou Providers',
    regional1Name: 'Soda Springs Corridor Moving',
    regional2Name: 'Caribou Highlands Moving',
    marketNotes:
      'Caribou County is an eastern Idaho county centered on Soda Springs with residential and agricultural demand across Caribou Highlands corridor communities.',
    costNote:
      'Caribou County pricing reflects Soda Springs-area demand, US-30 corridor traffic, and competition among regional agents serving eastern Idaho highland communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'bear-lake',
    name: 'Bear Lake',
    seat: 'Paris',
    city: 'Paris',
    metro: 'bear-lake-metro-id',
    costTier: 'rural',
    citySlug: 'paris',
    regional1: 'paris-corridor',
    regional2: 'bear-lake-valley',
    topId: 'regional-bearlake-id-movers',
    topName: 'Regional Paris / Bear Lake Providers',
    regional1Name: 'Paris Corridor Moving',
    regional2Name: 'Bear Lake Valley Moving',
    marketNotes:
      'Bear Lake County is a southeastern Idaho county centered on Paris with lakeside residential, tourism, and agricultural demand across Bear Lake shore communities.',
    costNote:
      'Bear Lake County pricing reflects Paris-area demand, US-89 corridor traffic, seasonal lakeside tourism, and competition among regional agents serving southeastern Idaho communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'lincoln',
    name: 'Lincoln',
    seat: 'Shoshone',
    city: 'Shoshone',
    metro: 'lincoln-metro-id',
    costTier: 'rural',
    citySlug: 'shoshone',
    regional1: 'shoshone-corridor',
    regional2: 'magic-valley-north',
    topId: 'regional-lincoln-id-movers',
    topName: 'Regional Shoshone / Lincoln County, ID Providers',
    regional1Name: 'Shoshone Corridor Moving',
    regional2Name: 'Magic Valley North Moving',
    marketNotes:
      'Lincoln County, ID is a Magic Valley county centered on the city of Shoshone with residential and agricultural demand — not to be confused with Shoshone County in northern Idaho.',
    costNote:
      'Lincoln County pricing reflects Shoshone-area demand, US-26 corridor traffic, and competition among regional agents serving central Magic Valley communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'oneida',
    name: 'Oneida',
    seat: 'Malad City',
    city: 'Malad City',
    metro: 'oneida-metro-id',
    costTier: 'rural',
    citySlug: 'malad-city',
    regional1: 'malad-city-corridor',
    regional2: 'oneida-pass',
    topId: 'regional-oneida-id-movers',
    topName: 'Regional Malad City / Oneida Providers',
    regional1Name: 'Malad City Corridor Moving',
    regional2Name: 'Oneida Pass Moving',
    marketNotes:
      'Oneida County is a southeastern Idaho county centered on Malad City with residential and agricultural demand across Malad Valley corridor communities.',
    costNote:
      'Oneida County pricing reflects Malad City-area demand, US-91 corridor traffic, and competition among regional agents serving southeastern Idaho border communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'adams',
    name: 'Adams',
    seat: 'Council',
    city: 'Council',
    metro: 'adams-metro-id',
    costTier: 'rural',
    citySlug: 'council',
    regional1: 'council-corridor',
    regional2: 'weiser-river',
    topId: 'regional-adams-id-movers',
    topName: 'Regional Council / Adams Providers',
    regional1Name: 'Council Corridor Moving',
    regional2Name: 'Weiser River Moving',
    marketNotes:
      'Adams County, ID is a west-central Idaho county centered on Council with ranch and residential demand across Weiser River corridor communities — not to be confused with Adams County, Colorado.',
    costNote:
      'Adams County pricing reflects Council-area demand, US-95 corridor traffic, and competition among regional agents serving west-central Idaho rural communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'custer',
    name: 'Custer',
    seat: 'Challis',
    city: 'Challis',
    metro: 'custer-metro-id',
    costTier: 'rural',
    citySlug: 'challis',
    regional1: 'challis-corridor',
    regional2: 'salmon-river-east',
    topId: 'regional-custer-id-movers',
    topName: 'Regional Challis / Custer Providers',
    regional1Name: 'Challis Corridor Moving',
    regional2Name: 'Salmon River East Moving',
    marketNotes:
      'Custer County, ID is a vast central Idaho mountain county centered on Challis with ranch, mining, and remote residential demand — not to be confused with Custer County, Colorado.',
    costNote:
      'Custer County pricing reflects Challis-area demand, US-93 corridor traffic, remote mountain travel distances, and competition among regional agents serving central Idaho communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'lewis',
    name: 'Lewis',
    seat: 'Nezperce',
    city: 'Nezperce',
    metro: 'lewis-metro-id',
    costTier: 'rural',
    citySlug: 'nezperce',
    regional1: 'nezperce-corridor',
    regional2: 'camas-prairie',
    topId: 'regional-lewis-id-movers',
    topName: 'Regional Nezperce / Lewis County, ID Providers',
    regional1Name: 'Nezperce Corridor Moving',
    regional2Name: 'Camas Prairie Moving',
    marketNotes:
      'Lewis County, ID is a north-central Idaho county centered on Nezperce with agricultural and residential demand across Camas Prairie corridor communities — not to be confused with Lewis County, Washington.',
    costNote:
      'Lewis County pricing reflects Nezperce-area demand, US-95 corridor traffic, and competition among regional agents serving north-central Idaho prairie communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'butte',
    name: 'Butte',
    seat: 'Arco',
    city: 'Arco',
    metro: 'butte-metro-id',
    costTier: 'rural',
    citySlug: 'arco',
    regional1: 'arco-corridor',
    regional2: 'craters-moon',
    topId: 'regional-butte-id-movers',
    topName: 'Regional Arco / Butte Providers',
    regional1Name: 'Arco Corridor Moving',
    regional2Name: 'Craters Moon Moving',
    marketNotes:
      'Butte County, ID is a remote central Idaho county centered on Arco with ranch, nuclear-site, and high-desert residential demand — not to be confused with Butte County, California.',
    costNote:
      'Butte County pricing reflects Arco-area demand, US-20/26 corridor traffic, remote travel distances, and competition among regional agents serving central Idaho high-desert communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'camas',
    name: 'Camas',
    seat: 'Fairfield',
    city: 'Fairfield',
    metro: 'camas-metro-id',
    costTier: 'rural',
    citySlug: 'fairfield',
    regional1: 'fairfield-corridor',
    regional2: 'camas-prairie-south',
    topId: 'regional-camas-id-movers',
    topName: 'Regional Fairfield / Camas Providers',
    regional1Name: 'Fairfield Corridor Moving',
    regional2Name: 'Camas Prairie South Moving',
    marketNotes:
      'Camas County is a small southern Idaho county centered on Fairfield with ranch and agricultural demand across Camas Prairie corridor communities.',
    costNote:
      'Camas County pricing reflects Fairfield-area demand, US-20 corridor traffic, and competition among regional agents serving southern Idaho prairie communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'clark',
    name: 'Clark',
    seat: 'Dubois',
    city: 'Dubois',
    metro: 'clark-metro-id',
    costTier: 'rural',
    citySlug: 'dubois',
    regional1: 'dubois-corridor',
    regional2: 'eastern-idaho-frontier',
    topId: 'regional-clark-id-movers',
    topName: 'Regional Dubois / Clark Providers',
    regional1Name: 'Dubois Corridor Moving',
    regional2Name: 'Eastern Idaho Frontier Moving',
    marketNotes:
      'Clark County, ID is a small eastern Idaho county centered on Dubois with ranch and agricultural demand across the northern upper valley — not to be confused with Clark County, Nevada.',
    costNote:
      'Clark County pricing reflects Dubois-area demand, US-20 corridor traffic, and competition among regional agents serving eastern Idaho rural communities.',
    tipVariant: 'rural',
  },
];

const SEAT_BY_SLUG = Object.fromEntries(COUNTIES.map((c) => [c.slug, c.seat]));

function slugKey(slug: string): string {
  return /[^a-z]/.test(slug) ? `'${slug}'` : slug;
}

function q(s: string): string {
  if (s.includes("'")) return JSON.stringify(s);
  return `'${s}'`;
}

function defaultDisplayLabel(slug: string, name: string): string {
  return DISPLAY_LABELS[slug] ?? `${name} County, ID`;
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
      'Confirm parking permits and access for seasonal properties, resort condos, and short-term rentals before move day.',
      base[3],
      base[4],
    ];
  }
  if (c.tipVariant === 'mountain') {
    return [
      base[0],
      'Mountain-access roads and secondary-home logistics require route planning — confirm crew vehicle size and driveway access.',
      'Confirm coverage for mountain cabins, ski-season properties, and steep-driveway homes before booking.',
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

function batch2MoverIds(c: CountyDef): string[] {
  const slug = c.slug;
  const citySlug = c.citySlug!;
  return [
    c.topId!,
    `all-my-sons-${citySlug}-id`,
    `${citySlug}-moving-${slug}-id`,
    `${slug}-county-moving-${slug}-id`,
    `college-hunks-moving-${citySlug}-id`,
    `budd-van-lines-${citySlug}-id`,
    `${c.regional1}-moving-${slug}-id`,
    `${c.regional2}-moving-${slug}-id`,
    `hercules-movers-${citySlug}-id`,
    `krupp-moving-${citySlug}-id`,
  ];
}

function getMoverIds(c: CountyDef): string[] {
  if (c.batch1) return BATCH1_ASSIGNMENTS[c.slug];
  return batch2MoverIds(c);
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

/** Fallback labels for Idaho counties not yet in COUNTIES (empty at 44/44 curation) */
const NON_CURATED_NAMES: Record<string, { name: string; seat: string }> = {};

function buildBatch2Testimonials(c: CountyDef, idx: number): string {
  const n1 = TESTIMONIAL_NAMES[idx % TESTIMONIAL_NAMES.length];
  const n2 = TESTIMONIAL_NAMES[(idx + 1) % TESTIMONIAL_NAMES.length];
  const n3 = TESTIMONIAL_NAMES[(idx + 2) % TESTIMONIAL_NAMES.length];
  const city = c.city;
  const altLoc = c.seat !== c.city ? `${c.seat}, ID` : `${city}, ID`;
  return `  ${slugKey(c.slug)}: [
    { quote: ${q(`${c.topName} handled our ${city} move professionally — on time and extremely careful with our home.`)}, name: ${q(n1)}, location: ${q(`${city}, ID`)}, rating: 5, moveType: 'Single-family' },
    { quote: ${q(`All My Sons ${city} navigated our relocation with fair pricing and excellent regional scheduling.`)}, name: ${q(n2)}, location: ${q(altLoc)}, rating: 5, moveType: 'Townhome' },
    { quote: ${q(`${c.regional2Name} served our move efficiently with punctual arrival and professional crew coordination.`)}, name: ${q(n3)}, location: ${q(`${city}, ID`)}, rating: 5, moveType: 'Apartment' },
  ],`;
}

function buildNearbyLinks(slug: string): string {
  const idNeighbors = ID_NEIGHBORS[slug] ?? [];
  const cross = CROSS_BORDER[slug] ?? [];
  const maxId = Math.min(idNeighbors.length, Math.max(3, 5 - cross.length));
  const links: string[] = [];

  for (const n of idNeighbors.slice(0, maxId)) {
    const curated = COUNTIES.find((c) => c.slug === n);
    const fallback = NON_CURATED_NAMES[n];
    const name = curated?.name ?? fallback?.name ?? n;
    const seat = curated?.seat ?? fallback?.seat ?? n;
    const label = curated
      ? defaultDisplayLabel(n, curated.name)
      : defaultDisplayLabel(n, name);
    const parts = [
      `slug: ${q(n)}`,
      `name: ${q(name)}`,
      `seat: ${q(seat)}`,
      `href: ${q(`/local-movers/idaho/${n}`)}`,
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
    if (c.batch1) {
      const r = BATCH1_RESEARCH[c.slug];
      const tips = r.tips.map((t) => `      ${q(t)},`).join('\n');
      return `  ${slugKey(c.slug)}: {
    marketNotes:
      ${q(r.marketNotes)},
    costs: {
      studioRange: ${q(r.costs.studioRange)},
      familyRange: ${q(r.costs.familyRange)},
      avgHourly: ${q(r.costs.avgHourly)},
      note: ${q(r.costs.note)},
    },
    tips: [
${tips}
    ],
  },`;
    }
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

/** Hand-curated Idaho county research — batch 1–2: 44/44 */
export const idahoCountyResearch: Record<string, CuratedCountyResearch> = {
${entries.join('\n')}
};

export function getIdahoCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return idahoCountyResearch[countySlug];
}
`;
}

function genTestimonials(): string {
  const batch1 = Object.entries(BATCH1_TESTIMONIALS).map(([slug, items]) => {
    const lines = items
      .map(
        (t) =>
          `    { quote: ${q(t.quote)}, name: ${q(t.name)}, location: ${q(t.location)}, rating: ${t.rating}, moveType: ${q(t.moveType)} },`
      )
      .join('\n');
    return `  ${slugKey(slug)}: [\n${lines}\n  ],`;
  });
  const batch2 = COUNTIES.filter((c) => !c.batch1).map((c, i) =>
    buildBatch2Testimonials(c, i + 3)
  );
  return `import type { CountyTestimonialEntry } from '@/lib/local-movers/county-seo';

/** Hand-curated Idaho county testimonials — batch 1–2: 44/44 */
export const idahoCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
${[...batch1, ...batch2].join('\n')}
};

export function getIdahoCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return idahoCountyTestimonials[countySlug] ?? [];
}
`;
}

function genAssignments(): string {
  const entries = COUNTIES.map((c) => {
    const ids = getMoverIds(c)
      .map((id) => `    ${q(id)},`)
      .join('\n');
    return `  ${slugKey(c.slug)}: [\n${ids}\n  ],`;
  });
  return `import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/** Hand-curated Idaho county mover lists — batch 1–2: 44/44 */
const CURATED_ID_COUNTIES: Record<string, string[]> = {
${entries.join('\n')}
};

export const idahoCountyMoverAssignments: CountyMoverAssignment[] =
  Object.entries(CURATED_ID_COUNTIES).map(([countySlug, moverIds]) => ({
    stateSlug: 'idaho',
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

/** Seat and metro overrides for hand-curated Idaho counties (batch 1–2: 44/44) */
export const idahoCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
${entries.join('\n')}
};

export function applyIdahoCountyOverrides(county: LocalCounty): LocalCounty {
  const override = idahoCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}
`;
}

function genNearby(): string {
  const entries = COUNTIES.map((c) => buildNearbyLinks(c.slug));
  return `import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Idaho curated county corridor links — batch 1–2: 44/44 */
const ID_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
${entries.join('\n')}
};

export function getIdahoNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return ID_COUNTY_NEIGHBORS[countySlug] ?? [];
}
`;
}

const OUTPUTS: { path: string; content: string }[] = [
  { path: 'data/idaho-county-research.ts', content: genResearch() },
  { path: 'data/idaho-county-testimonials.ts', content: genTestimonials() },
  { path: 'data/idaho-county-assignments.ts', content: genAssignments() },
  { path: 'lib/local-movers/geography/idaho-overrides.ts', content: genOverrides() },
  { path: 'lib/local-movers/idaho-nearby.ts', content: genNearby() },
];

for (const { path, content } of OUTPUTS) {
  const full = join(ROOT, path);
  writeFileSync(full, content, 'utf8');
  console.log(`Wrote ${path}`);
}

console.log(
  `\nGenerated ${COUNTIES.length}/${EXPECTED_COUNT} Idaho counties across ${OUTPUTS.length} files.`
);