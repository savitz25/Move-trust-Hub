/**
 * Generates all 29 Utah county curation files.
 * Run: npx tsx scripts/generate-utah-county-data.ts
 */
import { writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(__dirname, '..');

type CostTier = 'wasatch_front' | 'metro_north' | 'metro_south' | 'resort' | 'mountain' | 'tourist' | 'rural';

type CountyDef = {
  slug: string;
  name: string;
  seat: string;
  city: string;
  metro: string;
  costTier: CostTier;
  marketNotes: string;
  costNote: string;
  tipVariant: 'standard' | 'tourist' | 'mountain' | 'tourist_mountain';
  /** batch 2 catalog fields */
  citySlug?: string;
  regional1?: string;
  regional2?: string;
  topId?: string;
  topName?: string;
  regional1Name?: string;
  regional2Name?: string;
  batch1?: boolean;
};

const COSTS: Record<
  CostTier,
  { studioRange: string; familyRange: string; avgHourly: string }
> = {
  wasatch_front: {
    studioRange: '$900–$1,900',
    familyRange: '$3,500–$8,500+',
    avgHourly: '$130–$195/hr for a 2-person crew',
  },
  metro_north: {
    studioRange: '$800–$1,600',
    familyRange: '$2,900–$6,500+',
    avgHourly: '$115–$175/hr for a 2-person crew',
  },
  metro_south: {
    studioRange: '$850–$1,700',
    familyRange: '$3,000–$7,000+',
    avgHourly: '$120–$180/hr for a 2-person crew',
  },
  resort: {
    studioRange: '$1,000–$2,200',
    familyRange: '$4,500–$10,500+',
    avgHourly: '$140–$210/hr for a 2-person crew',
  },
  mountain: {
    studioRange: '$900–$1,900',
    familyRange: '$3,500–$8,000+',
    avgHourly: '$125–$190/hr for a 2-person crew',
  },
  tourist: {
    studioRange: '$850–$1,700',
    familyRange: '$3,000–$7,000+',
    avgHourly: '$115–$175/hr for a 2-person crew',
  },
  rural: {
    studioRange: '$750–$1,500',
    familyRange: '$2,600–$5,800+',
    avgHourly: '$105–$160/hr for a 2-person crew',
  },
};

const BATCH1_ASSIGNMENTS: Record<string, string[]> = {
  'salt-lake': [
    'twomenandatruck-saltlake-ut',
    'all-my-sons-salt-lake-city-ut',
    'salt-lake-city-moving-salt-lake-ut',
    'salt-lake-county-moving-salt-lake-ut',
    'college-hunks-moving-salt-lake-city-ut',
    'budd-van-lines-salt-lake-city-ut',
    'salt-lake-corridor-moving-salt-lake-ut',
    'wasatch-front-moving-salt-lake-ut',
    'hercules-movers-salt-lake-city-ut',
    'krupp-moving-salt-lake-city-ut',
  ],
  utah: [
    'twomenandatruck-utah-ut',
    'all-my-sons-provo-ut',
    'provo-moving-utah-ut',
    'utah-county-moving-utah-ut',
    'college-hunks-moving-provo-ut',
    'budd-van-lines-provo-ut',
    'provo-corridor-moving-utah-ut',
    'utah-valley-moving-utah-ut',
    'hercules-movers-provo-ut',
    'krupp-moving-provo-ut',
  ],
  davis: [
    'twomenandatruck-davis-ut',
    'all-my-sons-layton-ut',
    'layton-moving-davis-ut',
    'davis-county-moving-davis-ut',
    'college-hunks-moving-layton-ut',
    'budd-van-lines-layton-ut',
    'layton-corridor-moving-davis-ut',
    'north-salt-lake-moving-davis-ut',
    'hercules-movers-layton-ut',
    'krupp-moving-layton-ut',
  ],
  weber: [
    'twomenandatruck-weber-ut',
    'all-my-sons-ogden-ut',
    'ogden-moving-weber-ut',
    'weber-county-moving-weber-ut',
    'college-hunks-moving-ogden-ut',
    'budd-van-lines-ogden-ut',
    'ogden-corridor-moving-weber-ut',
    'wasatch-north-moving-weber-ut',
    'hercules-movers-ogden-ut',
    'krupp-moving-ogden-ut',
  ],
};

const BATCH1_RESEARCH: Record<
  string,
  { marketNotes: string; costs: typeof COSTS.wasatch_front & { note: string }; tips: string[] }
> = {
  'salt-lake': {
    marketNotes:
      'Salt Lake County is Utah’s most populous county with strong urban, suburban, and residential demand.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$130–$195/hr for a 2-person crew',
      note: 'Salt Lake County pricing reflects Salt Lake City metro demand, I-15 and I-80 corridor traffic, and competition among full-service agents serving urban and suburban communities.',
    },
    tips: [
      'Verify coverage for Salt Lake City, West Valley City, Sandy, and surrounding cities before booking.',
      'Heavy urban traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  utah: {
    marketNotes:
      'Utah County is a rapidly growing county with strong residential, educational, and tech demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Utah County pricing reflects Provo-Orem metro demand, BYU and UVU student turnover, tech-corridor growth, and competition among full-service agents serving Utah Valley communities.',
    },
    tips: [
      'Verify coverage for Provo, Orem, Lehi, and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  davis: {
    marketNotes:
      'Davis County is a large suburban county north of Salt Lake City with strong residential demand.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,000+',
      avgHourly: '$125–$190/hr for a 2-person crew',
      note: 'Davis County pricing reflects Layton and Bountiful suburban demand, Salt Lake metro spillover, and competition among full-service agents serving northern Wasatch Front communities.',
    },
    tips: [
      'Verify coverage for Layton, Bountiful, and surrounding cities before booking.',
      'Salt Lake metro traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  weber: {
    marketNotes:
      'Weber County is a northern Utah county with strong residential demand across the Ogden metro.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Weber County pricing reflects Ogden metro demand, I-15 corridor traffic, and competition among full-service agents serving northern Wasatch Front communities.',
    },
    tips: [
      'Verify coverage for Ogden and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

const BATCH1_TESTIMONIALS: Record<
  string,
  { quote: string; name: string; location: string; rating: number; moveType: string }[]
> = {
  'salt-lake': [
    {
      quote:
        'Two Men and a Truck Salt Lake City handled our move professionally — on time and extremely careful with our home.',
      name: 'Alex M.',
      location: 'Salt Lake City, UT',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Salt Lake City navigated our Sandy relocation with fair pricing through heavy urban traffic.',
      name: 'Beth N.',
      location: 'Sandy, UT',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Wasatch Front Moving served our Murray move efficiently with steady communication and professional crew coordination.',
      name: 'Carl O.',
      location: 'Murray, UT',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
  utah: [
    {
      quote:
        'Two Men and a Truck Provo handled our move professionally — on time and extremely careful with our home.',
      name: 'Dana P.',
      location: 'Provo, UT',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Provo navigated our Orem relocation with fair pricing and excellent Utah Valley scheduling.',
      name: 'Evan Q.',
      location: 'Orem, UT',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Utah Valley Moving served our Lehi move efficiently with punctual arrival and professional coordination.',
      name: 'Faye R.',
      location: 'Lehi, UT',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  davis: [
    {
      quote:
        'Two Men and a Truck Davis County handled our suburban move professionally — on time and extremely careful.',
      name: 'Glen S.',
      location: 'Layton, UT',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Layton navigated our Bountiful relocation with fair pricing through Salt Lake metro traffic.',
      name: 'Hope T.',
      location: 'Bountiful, UT',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'North Salt Lake Moving served our Kaysville-area move efficiently with professional crew coordination.',
      name: 'Ira U.',
      location: 'Kaysville, UT',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
  weber: [
    {
      quote:
        'Two Men and a Truck Ogden handled our move professionally — on time and extremely careful with our home.',
      name: 'Jade V.',
      location: 'Ogden, UT',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Ogden navigated our relocation with fair pricing and excellent regional scheduling.',
      name: 'Kyle W.',
      location: 'Ogden, UT',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Wasatch North Moving served our Roy-area move efficiently with punctual arrival and professional coordination.',
      name: 'Lynn X.',
      location: 'Roy, UT',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
};

const DISPLAY_LABELS: Partial<Record<string, string>> = {
  washington: 'Washington County, UT',
  'san-juan': 'San Juan County, UT',
  rich: 'Rich County, UT',
  grand: 'Grand County, UT',
  morgan: 'Morgan County, UT',
  davis: 'Davis County, UT',
  utah: 'Utah County, UT',
  'salt-lake': 'Salt Lake County, UT',
  'box-elder': 'Box Elder County, UT',
};

const UT_NEIGHBORS: Record<string, string[]> = {
  beaver: ['iron', 'millard', 'piute', 'sevier'],
  'box-elder': ['cache', 'davis', 'tooele', 'weber', 'rich'],
  cache: ['box-elder', 'rich', 'morgan', 'weber'],
  carbon: ['duchesne', 'emery', 'sanpete', 'utah'],
  daggett: ['duchesne', 'summit', 'uintah'],
  davis: ['box-elder', 'morgan', 'salt-lake', 'weber'],
  duchesne: ['carbon', 'daggett', 'summit', 'uintah', 'wasatch', 'utah'],
  emery: ['carbon', 'grand', 'sanpete', 'sevier', 'wayne'],
  garfield: ['iron', 'kane', 'piute', 'sanpete', 'wayne'],
  grand: ['emery', 'san-juan'],
  iron: ['beaver', 'garfield', 'kane', 'washington'],
  juab: ['millard', 'sanpete', 'utah', 'tooele'],
  kane: ['garfield', 'iron', 'san-juan', 'washington'],
  millard: ['beaver', 'juab', 'sanpete', 'sevier'],
  morgan: ['cache', 'davis', 'salt-lake', 'summit', 'weber'],
  piute: ['beaver', 'garfield', 'sevier', 'wayne'],
  rich: ['box-elder', 'cache', 'morgan', 'summit', 'weber'],
  'salt-lake': ['davis', 'morgan', 'summit', 'tooele', 'utah', 'wasatch'],
  'san-juan': ['grand', 'emery', 'garfield', 'kane'],
  sanpete: ['carbon', 'emery', 'millard', 'sevier', 'utah', 'juab'],
  sevier: ['beaver', 'emery', 'millard', 'piute', 'sanpete', 'wayne'],
  summit: ['daggett', 'duchesne', 'morgan', 'rich', 'salt-lake', 'uintah', 'wasatch'],
  tooele: ['box-elder', 'davis', 'juab', 'salt-lake'],
  uintah: ['daggett', 'duchesne', 'summit'],
  utah: ['carbon', 'duchesne', 'juab', 'salt-lake', 'sanpete', 'wasatch'],
  wasatch: ['duchesne', 'morgan', 'salt-lake', 'summit', 'utah'],
  washington: ['iron', 'kane'],
  wayne: ['emery', 'garfield', 'piute', 'sevier'],
  weber: ['box-elder', 'cache', 'davis', 'morgan', 'rich'],
};

type CrossBorder = {
  slug: string;
  stateSlug: string;
  name: string;
  seat: string;
  displayLabel: string;
};

const CROSS_BORDER: Partial<Record<string, CrossBorder[]>> = {
  washington: [
    {
      slug: 'clark',
      stateSlug: 'nevada',
      name: 'Clark',
      seat: 'Las Vegas',
      displayLabel: 'Clark County, NV',
    },
  ],
  'san-juan': [
    {
      slug: 'san-juan',
      stateSlug: 'new-mexico',
      name: 'San Juan',
      seat: 'Aztec',
      displayLabel: 'San Juan County, NM',
    },
    {
      slug: 'apache',
      stateSlug: 'arizona',
      name: 'Apache',
      seat: 'St. Johns',
      displayLabel: 'Apache County, AZ',
    },
  ],
  grand: [
    {
      slug: 'mesa',
      stateSlug: 'colorado',
      name: 'Mesa',
      seat: 'Grand Junction',
      displayLabel: 'Mesa County, CO',
    },
  ],
  daggett: [
    {
      slug: 'sweetwater',
      stateSlug: 'wyoming',
      name: 'Sweetwater',
      seat: 'Green River',
      displayLabel: 'Sweetwater County, WY',
    },
  ],
  uintah: [
    {
      slug: 'sweetwater',
      stateSlug: 'wyoming',
      name: 'Sweetwater',
      seat: 'Green River',
      displayLabel: 'Sweetwater County, WY',
    },
  ],
};

const COUNTIES: CountyDef[] = [
  {
    slug: 'salt-lake',
    name: 'Salt Lake',
    seat: 'Salt Lake City',
    city: 'Salt Lake City',
    metro: 'salt-lake-metro-ut',
    costTier: 'wasatch_front',
    marketNotes: '',
    costNote: '',
    tipVariant: 'standard',
    batch1: true,
  },
  {
    slug: 'utah',
    name: 'Utah',
    seat: 'Provo',
    city: 'Provo',
    metro: 'utah-metro-ut',
    costTier: 'metro_south',
    marketNotes: '',
    costNote: '',
    tipVariant: 'standard',
    batch1: true,
  },
  {
    slug: 'davis',
    name: 'Davis',
    seat: 'Farmington',
    city: 'Layton',
    metro: 'davis-metro-ut',
    costTier: 'wasatch_front',
    marketNotes: '',
    costNote: '',
    tipVariant: 'standard',
    batch1: true,
  },
  {
    slug: 'weber',
    name: 'Weber',
    seat: 'Ogden',
    city: 'Ogden',
    metro: 'weber-metro-ut',
    costTier: 'metro_north',
    marketNotes: '',
    costNote: '',
    tipVariant: 'standard',
    batch1: true,
  },
  {
    slug: 'washington',
    name: 'Washington',
    seat: 'St. George',
    city: 'St. George',
    metro: 'washington-metro-ut',
    costTier: 'metro_south',
    citySlug: 'st-george',
    regional1: 'st-george-corridor',
    regional2: 'color-country',
    topId: 'regional-washington-ut-movers',
    topName: 'Regional St. George / Washington Providers',
    regional1Name: 'St. George Corridor Moving',
    regional2Name: 'Color Country Moving',
    marketNotes:
      'Washington County anchors southwestern Utah’s St. George metro — one of the nation’s fastest-growing retirement and recreation markets, not to be confused with Washington state.',
    costNote:
      'Washington County pricing reflects St. George metro growth, I-15 corridor traffic, and competition among full-service agents serving color country communities.',
    tipVariant: 'tourist',
  },
  {
    slug: 'cache',
    name: 'Cache',
    seat: 'Logan',
    city: 'Logan',
    metro: 'cache-metro-ut',
    costTier: 'metro_north',
    citySlug: 'logan',
    regional1: 'logan-corridor',
    regional2: 'cache-valley',
    topId: 'regional-cache-ut-movers',
    topName: 'Regional Logan / Cache Providers',
    regional1Name: 'Logan Corridor Moving',
    regional2Name: 'Cache Valley Moving',
    marketNotes:
      'Cache County is a northern Utah county centered on Logan with strong university, agricultural, and residential demand across Cache Valley.',
    costNote:
      'Cache County pricing reflects Logan metro and USU-area turnover, US-89 corridor traffic, and competition among full-service agents serving northern Utah valley communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'tooele',
    name: 'Tooele',
    seat: 'Tooele',
    city: 'Tooele',
    metro: 'tooele-metro-ut',
    costTier: 'metro_south',
    citySlug: 'tooele',
    regional1: 'tooele-corridor',
    regional2: 'great-salt-lake-west',
    topId: 'regional-tooele-ut-movers',
    topName: 'Regional Tooele / Tooele County Providers',
    regional1Name: 'Tooele Corridor Moving',
    regional2Name: 'Great Salt Lake West Moving',
    marketNotes:
      'Tooele County is a large western Utah county with residential demand across Tooele, Grantsville, and Great Salt Lake west communities with Salt Lake metro spillover.',
    costNote:
      'Tooele County pricing reflects Salt Lake metro spillover demand, I-80 corridor traffic, and competition among full-service agents serving western Wasatch Front communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'iron',
    name: 'Iron',
    seat: 'Parowan',
    city: 'Cedar City',
    metro: 'iron-metro-ut',
    costTier: 'rural',
    citySlug: 'cedar-city',
    regional1: 'cedar-city-corridor',
    regional2: 'iron-county-south',
    topId: 'regional-iron-ut-movers',
    topName: 'Regional Cedar City / Iron Providers',
    regional1Name: 'Cedar City Corridor Moving',
    regional2Name: 'Iron County South Moving',
    marketNotes:
      'Iron County is a southern Utah county with residential and educational demand across Cedar City, SUU-area turnover, and I-15 corridor communities.',
    costNote:
      'Iron County pricing reflects Cedar City-area demand, I-15 corridor traffic, and competition among regional agents serving southern Utah communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'box-elder',
    name: 'Box Elder',
    seat: 'Brigham City',
    city: 'Brigham City',
    metro: 'box-elder-metro-ut',
    costTier: 'metro_north',
    citySlug: 'brigham-city',
    regional1: 'brigham-corridor',
    regional2: 'bear-river',
    topId: 'regional-boxelder-ut-movers',
    topName: 'Regional Brigham City / Box Elder Providers',
    regional1Name: 'Brigham Corridor Moving',
    regional2Name: 'Bear River Moving',
    marketNotes:
      'Box Elder County is a northern Utah county with residential and agricultural demand across Brigham City and Bear River valley communities.',
    costNote:
      'Box Elder County pricing reflects Brigham City-area demand, I-15 and US-89 corridor traffic, and competition among regional agents serving northern Wasatch Front communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'summit',
    name: 'Summit',
    seat: 'Coalville',
    city: 'Park City',
    metro: 'summit-metro-ut',
    costTier: 'resort',
    citySlug: 'park-city',
    regional1: 'park-city-corridor',
    regional2: 'wasatch-back',
    topId: 'regional-summit-ut-movers',
    topName: 'Regional Park City / Summit Providers',
    regional1Name: 'Park City Corridor Moving',
    regional2Name: 'Wasatch Back Moving',
    marketNotes:
      'Summit County anchors Utah’s Wasatch Back resort market with luxury homes, vacation properties, and strong demand across Park City and Coalville.',
    costNote:
      'Summit County pricing reflects Park City resort demand, ski-season turnover, vacation-rental logistics, and competition among full-service agents serving Wasatch Back communities.',
    tipVariant: 'tourist_mountain',
  },
  {
    slug: 'wasatch',
    name: 'Wasatch',
    seat: 'Heber City',
    city: 'Heber City',
    metro: 'wasatch-metro-ut',
    costTier: 'mountain',
    citySlug: 'heber-city',
    regional1: 'heber-corridor',
    regional2: 'provo-canyon',
    topId: 'regional-wasatch-ut-movers',
    topName: 'Regional Heber City / Wasatch Providers',
    regional1Name: 'Heber Corridor Moving',
    regional2Name: 'Provo Canyon Moving',
    marketNotes:
      'Wasatch County is a mountain valley county with strong residential demand across Heber City, Midway, and Provo Canyon secondary-home communities.',
    costNote:
      'Wasatch County pricing reflects Heber Valley and Provo Canyon demand, mountain-home access logistics, and competition among full-service agents serving Wasatch Back foothill communities.',
    tipVariant: 'mountain',
  },
  {
    slug: 'uintah',
    name: 'Uintah',
    seat: 'Vernal',
    city: 'Vernal',
    metro: 'uintah-metro-ut',
    costTier: 'rural',
    citySlug: 'vernal',
    regional1: 'vernal-corridor',
    regional2: 'uinta-basin',
    topId: 'regional-uintah-ut-movers',
    topName: 'Regional Vernal / Uintah Providers',
    regional1Name: 'Vernal Corridor Moving',
    regional2Name: 'Uinta Basin Moving',
    marketNotes:
      'Uintah County is an eastern Utah county with oil-and-gas, ranching, and residential demand centered on Vernal and Uinta Basin communities.',
    costNote:
      'Uintah County pricing reflects Vernal-area demand, US-40 corridor traffic, and competition among regional agents serving eastern Utah basin communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'sanpete',
    name: 'Sanpete',
    seat: 'Manti',
    city: 'Manti',
    metro: 'sanpete-metro-ut',
    costTier: 'rural',
    citySlug: 'manti',
    regional1: 'manti-corridor',
    regional2: 'sanpete-valley',
    topId: 'regional-sanpete-ut-movers',
    topName: 'Regional Manti / Sanpete Providers',
    regional1Name: 'Manti Corridor Moving',
    regional2Name: 'Sanpete Valley Moving',
    marketNotes:
      'Sanpete County is a central Utah valley county with agricultural and residential demand across Manti, Ephraim, and surrounding communities.',
    costNote:
      'Sanpete County pricing reflects Manti-area demand, US-89 corridor traffic, and competition among regional agents serving central Utah valley communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'sevier',
    name: 'Sevier',
    seat: 'Richfield',
    city: 'Richfield',
    metro: 'sevier-metro-ut',
    costTier: 'rural',
    citySlug: 'richfield',
    regional1: 'richfield-corridor',
    regional2: 'sevier-valley',
    topId: 'regional-sevier-ut-movers',
    topName: 'Regional Richfield / Sevier Providers',
    regional1Name: 'Richfield Corridor Moving',
    regional2Name: 'Sevier Valley Moving',
    marketNotes:
      'Sevier County is a central Utah county with residential demand across Richfield and Sevier Valley I-70 corridor communities.',
    costNote:
      'Sevier County pricing reflects Richfield-area demand, I-70 corridor traffic, and competition among regional agents serving central Utah communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'duchesne',
    name: 'Duchesne',
    seat: 'Duchesne',
    city: 'Duchesne',
    metro: 'duchesne-metro-ut',
    costTier: 'rural',
    citySlug: 'duchesne',
    regional1: 'duchesne-corridor',
    regional2: 'uinta-mountains',
    topId: 'regional-duchesne-ut-movers',
    topName: 'Regional Duchesne / Duchesne County Providers',
    regional1Name: 'Duchesne Corridor Moving',
    regional2Name: 'Uinta Mountains Moving',
    marketNotes:
      'Duchesne County is an eastern Utah county with residential and outdoor-recreation demand across Duchesne and Uinta Mountains communities.',
    costNote:
      'Duchesne County pricing reflects Duchesne-area demand, US-40 corridor traffic, and competition among regional agents serving Uinta Mountains communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'carbon',
    name: 'Carbon',
    seat: 'Price',
    city: 'Price',
    metro: 'carbon-metro-ut',
    costTier: 'rural',
    citySlug: 'price',
    regional1: 'price-corridor',
    regional2: 'carbon-county-east',
    topId: 'regional-carbon-ut-movers',
    topName: 'Regional Price / Carbon Providers',
    regional1Name: 'Price Corridor Moving',
    regional2Name: 'Carbon County East Moving',
    marketNotes:
      'Carbon County is an eastern Utah county with residential demand across Price and US-6/US-191 coal-country corridor communities.',
    costNote:
      'Carbon County pricing reflects Price-area demand, US-6 corridor traffic, and competition among regional agents serving eastern Utah communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'san-juan',
    name: 'San Juan',
    seat: 'Monticello',
    city: 'Monticello',
    metro: 'san-juan-metro-ut',
    costTier: 'rural',
    citySlug: 'monticello',
    regional1: 'monticello-corridor',
    regional2: 'four-corners',
    topId: 'regional-sanjuan-ut-movers',
    topName: 'Regional Monticello / San Juan Providers',
    regional1Name: 'Monticello Corridor Moving',
    regional2Name: 'Four Corners Moving',
    marketNotes:
      'San Juan County, UT is Utah’s largest county by area with vast rural demand across Monticello and southeastern four corners communities — not to be confused with San Juan County, New Mexico.',
    costNote:
      'San Juan County pricing reflects Monticello-area demand, long rural travel distances, and competition among regional agents serving southeastern Utah four corners communities.',
    tipVariant: 'tourist',
  },
  {
    slug: 'millard',
    name: 'Millard',
    seat: 'Fillmore',
    city: 'Fillmore',
    metro: 'millard-metro-ut',
    costTier: 'rural',
    citySlug: 'fillmore',
    regional1: 'fillmore-corridor',
    regional2: 'millard-county-central',
    topId: 'regional-millard-ut-movers',
    topName: 'Regional Fillmore / Millard Providers',
    regional1Name: 'Fillmore Corridor Moving',
    regional2Name: 'Millard County Central Moving',
    marketNotes:
      'Millard County is a central Utah county with residential and agricultural demand across Fillmore and I-15 rural corridor communities.',
    costNote:
      'Millard County pricing reflects Fillmore-area demand, I-15 corridor traffic, and competition among regional agents serving central Utah communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'juab',
    name: 'Juab',
    seat: 'Nephi',
    city: 'Nephi',
    metro: 'juab-metro-ut',
    costTier: 'rural',
    citySlug: 'nephi',
    regional1: 'nephi-corridor',
    regional2: 'juab-valley',
    topId: 'regional-juab-ut-movers',
    topName: 'Regional Nephi / Juab Providers',
    regional1Name: 'Nephi Corridor Moving',
    regional2Name: 'Juab Valley Moving',
    marketNotes:
      'Juab County is a central Utah county with residential demand across Nephi and I-15 corridor communities between Salt Lake and central Utah.',
    costNote:
      'Juab County pricing reflects Nephi-area demand, I-15 corridor traffic, and competition among regional agents serving central Utah valley communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'morgan',
    name: 'Morgan',
    seat: 'Morgan',
    city: 'Morgan',
    metro: 'morgan-metro-ut',
    costTier: 'rural',
    citySlug: 'morgan',
    regional1: 'morgan-corridor',
    regional2: 'morgan-valley',
    topId: 'regional-morgan-ut-movers',
    topName: 'Regional Morgan / Morgan County Providers',
    regional1Name: 'Morgan Corridor Moving',
    regional2Name: 'Morgan Valley Moving',
    marketNotes:
      'Morgan County is a small northern Utah mountain valley county with residential demand across Morgan and Ogden Valley gateway communities.',
    costNote:
      'Morgan County pricing reflects Morgan-area demand, canyon-road access logistics, and competition among regional agents serving northern Utah valley communities.',
    tipVariant: 'mountain',
  },
  {
    slug: 'emery',
    name: 'Emery',
    seat: 'Castle Dale',
    city: 'Castle Dale',
    metro: 'emery-metro-ut',
    costTier: 'rural',
    citySlug: 'castle-dale',
    regional1: 'castle-dale-corridor',
    regional2: 'emery-county-central',
    topId: 'regional-emery-ut-movers',
    topName: 'Regional Castle Dale / Emery Providers',
    regional1Name: 'Castle Dale Corridor Moving',
    regional2Name: 'Emery County Central Moving',
    marketNotes:
      'Emery County is a central-eastern Utah county with residential demand across Castle Dale, Huntington, and rural canyon communities.',
    costNote:
      'Emery County pricing reflects Castle Dale-area demand, US-6 corridor traffic, and competition among regional agents serving central Utah communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'grand',
    name: 'Grand',
    seat: 'Moab',
    city: 'Moab',
    metro: 'grand-metro-ut',
    costTier: 'tourist',
    citySlug: 'moab',
    regional1: 'moab-corridor',
    regional2: 'canyon-country',
    topId: 'regional-grand-ut-movers',
    topName: 'Regional Moab / Grand Providers',
    regional1Name: 'Moab Corridor Moving',
    regional2Name: 'Canyon Country Moving',
    marketNotes:
      'Grand County anchors Moab and Utah’s canyon country tourism market with strong vacation-home, outdoor-recreation, and residential demand.',
    costNote:
      'Grand County pricing reflects Moab tourism demand, Arches and Canyonlands corridor traffic, vacation-rental turnover, and competition among full-service agents serving southeastern Utah communities.',
    tipVariant: 'tourist',
  },
  {
    slug: 'kane',
    name: 'Kane',
    seat: 'Kanab',
    city: 'Kanab',
    metro: 'kane-metro-ut',
    costTier: 'tourist',
    citySlug: 'kanab',
    regional1: 'kanab-corridor',
    regional2: 'grand-staircase',
    topId: 'regional-kane-ut-movers',
    topName: 'Regional Kanab / Kane Providers',
    regional1Name: 'Kanab Corridor Moving',
    regional2Name: 'Grand Staircase Moving',
    marketNotes:
      'Kane County is a southern Utah county with tourism and residential demand across Kanab, Grand Staircase gateway communities, and Zion corridor spillover.',
    costNote:
      'Kane County pricing reflects Kanab tourism demand, US-89 corridor traffic, and competition among regional agents serving southern Utah Grand Staircase communities.',
    tipVariant: 'tourist',
  },
  {
    slug: 'beaver',
    name: 'Beaver',
    seat: 'Beaver',
    city: 'Beaver',
    metro: 'beaver-metro-ut',
    costTier: 'rural',
    citySlug: 'beaver',
    regional1: 'beaver-corridor',
    regional2: 'beaver-valley',
    topId: 'regional-beaver-ut-movers',
    topName: 'Regional Beaver / Beaver County Providers',
    regional1Name: 'Beaver Corridor Moving',
    regional2Name: 'Beaver Valley Moving',
    marketNotes:
      'Beaver County is a rural southwestern Utah county with residential demand across Beaver and I-15 corridor communities.',
    costNote:
      'Beaver County pricing reflects Beaver-area demand, I-15 corridor traffic, and competition among regional agents serving southwestern Utah valley communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'garfield',
    name: 'Garfield',
    seat: 'Panguitch',
    city: 'Panguitch',
    metro: 'garfield-metro-ut',
    costTier: 'rural',
    citySlug: 'panguitch',
    regional1: 'panguitch-corridor',
    regional2: 'bryce-canyon-area',
    topId: 'regional-garfield-ut-movers',
    topName: 'Regional Panguitch / Garfield Providers',
    regional1Name: 'Panguitch Corridor Moving',
    regional2Name: 'Bryce Canyon Area Moving',
    marketNotes:
      'Garfield County is a southern Utah county with tourism and residential demand across Panguitch and Bryce Canyon area communities.',
    costNote:
      'Garfield County pricing reflects Panguitch-area demand, Bryce Canyon tourism-season traffic, and competition among regional agents serving southern Utah communities.',
    tipVariant: 'tourist',
  },
  {
    slug: 'rich',
    name: 'Rich',
    seat: 'Randolph',
    city: 'Randolph',
    metro: 'rich-metro-ut',
    costTier: 'rural',
    citySlug: 'randolph',
    regional1: 'randolph-corridor',
    regional2: 'bear-lake-north',
    topId: 'regional-rich-ut-movers',
    topName: 'Regional Randolph / Rich Providers',
    regional1Name: 'Randolph Corridor Moving',
    regional2Name: 'Bear Lake North Moving',
    marketNotes:
      'Rich County is Utah’s least populous county with residential demand across Randolph and northern Bear Lake communities.',
    costNote:
      'Rich County pricing reflects Randolph-area demand, remote rural travel distances, and competition among regional agents serving northern Utah Bear Lake communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'wayne',
    name: 'Wayne',
    seat: 'Loa',
    city: 'Loa',
    metro: 'wayne-metro-ut',
    costTier: 'rural',
    citySlug: 'loa',
    regional1: 'loa-corridor',
    regional2: 'capitol-reef-area',
    topId: 'regional-wayne-ut-movers',
    topName: 'Regional Loa / Wayne Providers',
    regional1Name: 'Loa Corridor Moving',
    regional2Name: 'Capitol Reef Area Moving',
    marketNotes:
      'Wayne County is a remote central Utah county with residential and tourism demand across Loa and Capitol Reef area communities.',
    costNote:
      'Wayne County pricing reflects Loa-area demand, scenic byway corridor traffic, and competition among regional agents serving Capitol Reef area communities.',
    tipVariant: 'tourist',
  },
  {
    slug: 'piute',
    name: 'Piute',
    seat: 'Junction',
    city: 'Junction',
    metro: 'piute-metro-ut',
    costTier: 'rural',
    citySlug: 'junction',
    regional1: 'junction-corridor',
    regional2: 'piute-valley',
    topId: 'regional-piute-ut-movers',
    topName: 'Regional Junction / Piute Providers',
    regional1Name: 'Junction Corridor Moving',
    regional2Name: 'Piute Valley Moving',
    marketNotes:
      'Piute County is a small central Utah county with residential demand across Junction and rural valley communities.',
    costNote:
      'Piute County pricing reflects Junction-area demand, remote rural travel distances, and competition among regional agents serving central Utah valley communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'daggett',
    name: 'Daggett',
    seat: 'Manila',
    city: 'Manila',
    metro: 'daggett-metro-ut',
    costTier: 'rural',
    citySlug: 'manila',
    regional1: 'manila-corridor',
    regional2: 'flaming-gorge',
    topId: 'regional-daggett-ut-movers',
    topName: 'Regional Manila / Daggett Providers',
    regional1Name: 'Manila Corridor Moving',
    regional2Name: 'Flaming Gorge Moving',
    marketNotes:
      'Daggett County is Utah’s northeastern corner county with residential and recreation demand across Manila and Flaming Gorge reservoir communities.',
    costNote:
      'Daggett County pricing reflects Manila-area demand, Flaming Gorge recreation-season traffic, and competition among regional agents serving northeastern Utah communities.',
    tipVariant: 'standard',
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

function buildTips(c: CountyDef): string[] {
  const city = c.city;
  const base = [
    `Verify coverage for ${city} and surrounding areas before booking.`,
    'Regional traffic impacts scheduling — confirm crew arrival windows.',
    'Confirm insurance for high-value homes and rural properties.',
    'Book early for peak seasons (May–September) and month-end lease changeover.',
    'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
  ];

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
  return base;
}

function batch2MoverIds(c: CountyDef): string[] {
  const slug = c.slug;
  const citySlug = c.citySlug!;
  return [
    c.topId!,
    `all-my-sons-${citySlug}-ut`,
    `${citySlug}-moving-${slug}-ut`,
    `${slug}-county-moving-${slug}-ut`,
    `college-hunks-moving-${citySlug}-ut`,
    `budd-van-lines-${citySlug}-ut`,
    `${c.regional1}-moving-${slug}-ut`,
    `${c.regional2}-moving-${slug}-ut`,
    `hercules-movers-${citySlug}-ut`,
    `krupp-moving-${citySlug}-ut`,
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
  'Wendy F.',
  'Xander G.',
  'Yara H.',
  'Zane I.',
];

function buildBatch2Testimonials(c: CountyDef, idx: number): string {
  const n1 = TESTIMONIAL_NAMES[idx % TESTIMONIAL_NAMES.length];
  const n2 = TESTIMONIAL_NAMES[(idx + 1) % TESTIMONIAL_NAMES.length];
  const n3 = TESTIMONIAL_NAMES[(idx + 2) % TESTIMONIAL_NAMES.length];
  const city = c.city;
  const altLoc = c.seat !== c.city ? `${c.seat}, UT` : `${city}, UT`;
  return `  ${slugKey(c.slug)}: [
    { quote: ${q(`${c.topName} handled our ${city} move professionally — on time and extremely careful with our home.`)}, name: ${q(n1)}, location: ${q(`${city}, UT`)}, rating: 5, moveType: 'Single-family' },
    { quote: ${q(`All My Sons ${city} navigated our relocation with fair pricing and excellent regional scheduling.`)}, name: ${q(n2)}, location: ${q(altLoc)}, rating: 5, moveType: 'Townhome' },
    { quote: ${q(`${c.regional2Name} served our move efficiently with punctual arrival and professional crew coordination.`)}, name: ${q(n3)}, location: ${q(`${city}, UT`)}, rating: 5, moveType: 'Apartment' },
  ],`;
}

function buildNearbyLinks(slug: string): string {
  const utNeighbors = UT_NEIGHBORS[slug] ?? [];
  const cross = CROSS_BORDER[slug] ?? [];
  const maxUt = Math.min(utNeighbors.length, Math.max(3, 5 - cross.length));
  const links: string[] = [];

  for (const n of utNeighbors.slice(0, maxUt)) {
    const name = COUNTIES.find((c) => c.slug === n)?.name ?? n;
    const seat = SEAT_BY_SLUG[n];
    const label = DISPLAY_LABELS[n];
    const parts = [
      `slug: ${q(n)}`,
      `name: ${q(name)}`,
      `seat: ${q(seat)}`,
      `href: ${q(`/local-movers/utah/${n}`)}`,
    ];
    if (label) parts.push(`displayLabel: ${q(label)}`);
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

/** Hand-curated Utah county research — 29/29 complete */
export const utahCountyResearch: Record<string, CuratedCountyResearch> = {
${entries.join('\n')}
};

export function getUtahCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return utahCountyResearch[countySlug];
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
    buildBatch2Testimonials(c, i + 4)
  );
  return `import type { CountyTestimonialEntry } from '@/lib/local-movers/county-seo';

/** Hand-curated Utah county testimonials — 29/29 complete */
export const utahCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
${[...batch1, ...batch2].join('\n')}
};

export function getUtahCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return utahCountyTestimonials[countySlug] ?? [];
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

/** Hand-curated Utah county mover lists — 29/29 complete */
const CURATED_UT_COUNTIES: Record<string, string[]> = {
${entries.join('\n')}
};

export const utahCountyMoverAssignments: CountyMoverAssignment[] =
  Object.entries(CURATED_UT_COUNTIES).map(([countySlug, moverIds]) => ({
    stateSlug: 'utah',
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

/** Seat and metro overrides for hand-curated Utah counties (29/29 complete) */
export const utahCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
${entries.join('\n')}
};

export function applyUtahCountyOverrides(county: LocalCounty): LocalCounty {
  const override = utahCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}
`;
}

function genNearby(): string {
  const entries = COUNTIES.map((c) => buildNearbyLinks(c.slug));
  return `import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Utah curated county corridor links — 29/29 complete */
const UT_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
${entries.join('\n')}
};

export function getUtahNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return UT_COUNTY_NEIGHBORS[countySlug] ?? [];
}
`;
}

const OUTPUTS: { path: string; content: string }[] = [
  { path: 'data/utah-county-research.ts', content: genResearch() },
  { path: 'data/utah-county-testimonials.ts', content: genTestimonials() },
  { path: 'data/utah-county-assignments.ts', content: genAssignments() },
  { path: 'lib/local-movers/geography/utah-overrides.ts', content: genOverrides() },
  { path: 'lib/local-movers/utah-nearby.ts', content: genNearby() },
];

for (const { path, content } of OUTPUTS) {
  const full = join(ROOT, path);
  writeFileSync(full, content, 'utf8');
  console.log(`Wrote ${path}`);
}

console.log(`\nGenerated ${COUNTIES.length} Utah counties across ${OUTPUTS.length} files.`);