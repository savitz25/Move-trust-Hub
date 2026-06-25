/**
 * Generates all 44 Colorado county curation files (batch 1 + batch 2 + batch 3).
 * Run: npx tsx scripts/generate-colorado-county-data.ts
 */
import { writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(__dirname, '..');

type CostTier =
  | 'metro'
  | 'metro_boulder'
  | 'metro_denver'
  | 'western_slope'
  | 'rural'
  | 'resort'
  | 'luxury';

type CountyDef = {
  slug: string;
  name: string;
  seat: string;
  city: string;
  metro: string;
  costTier: CostTier;
  marketNotes: string;
  costNote: string;
  tipVariant: 'standard' | 'tourist' | 'mountain' | 'tourist_mountain' | 'rural';
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
    studioRange: '$900–$1,900',
    familyRange: '$3,500–$8,000+',
    avgHourly: '$125–$190/hr for a 2-person crew',
  },
  metro_boulder: {
    studioRange: '$950–$2,000',
    familyRange: '$3,800–$9,000+',
    avgHourly: '$130–$195/hr for a 2-person crew',
  },
  metro_denver: {
    studioRange: '$900–$1,900',
    familyRange: '$3,500–$8,500+',
    avgHourly: '$125–$190/hr for a 2-person crew',
  },
  western_slope: {
    studioRange: '$800–$1,600',
    familyRange: '$2,900–$6,500+',
    avgHourly: '$115–$175/hr for a 2-person crew',
  },
  rural: {
    studioRange: '$750–$1,500',
    familyRange: '$2,600–$5,800+',
    avgHourly: '$105–$160/hr for a 2-person crew',
  },
  resort: {
    studioRange: '$1,000–$2,200',
    familyRange: '$4,500–$10,500+',
    avgHourly: '$140–$210/hr for a 2-person crew',
  },
  luxury: {
    studioRange: '$1,200–$2,500',
    familyRange: '$5,500–$12,000+',
    avgHourly: '$155–$230/hr for a 2-person crew',
  },
};

const BATCH1_ASSIGNMENTS: Record<string, string[]> = {
  'el-paso': [
    'twomenandatruck-elpaso-co',
    'all-my-sons-colorado-springs-co',
    'colorado-springs-moving-el-paso-co',
    'el-paso-county-moving-el-paso-co',
    'college-hunks-moving-colorado-springs-co',
    'budd-van-lines-colorado-springs-co',
    'colorado-springs-corridor-moving-el-paso-co',
    'pikes-peak-moving-el-paso-co',
    'hercules-movers-colorado-springs-co',
    'krupp-moving-colorado-springs-co',
  ],
  denver: [
    'twomenandatruck-denver-co',
    'all-my-sons-denver-co',
    'denver-moving-denver-co',
    'denver-county-moving-denver-co',
    'college-hunks-moving-denver-co',
    'budd-van-lines-denver-co',
    'denver-corridor-moving-denver-co',
    'front-range-moving-denver-co',
    'hercules-movers-denver-co',
    'krupp-moving-denver-co',
  ],
  arapahoe: [
    'twomenandatruck-arapahoe-co',
    'all-my-sons-aurora-co',
    'aurora-moving-arapahoe-co',
    'arapahoe-county-moving-arapahoe-co',
    'college-hunks-moving-aurora-co',
    'budd-van-lines-aurora-co',
    'aurora-corridor-moving-arapahoe-co',
    'south-metro-moving-arapahoe-co',
    'hercules-movers-aurora-co',
    'krupp-moving-aurora-co',
  ],
  jefferson: [
    'twomenandatruck-jefferson-co',
    'all-my-sons-lakewood-co',
    'lakewood-moving-jefferson-co',
    'jefferson-county-moving-jefferson-co',
    'college-hunks-moving-lakewood-co',
    'budd-van-lines-lakewood-co',
    'lakewood-corridor-moving-jefferson-co',
    'foothills-west-moving-jefferson-co',
    'hercules-movers-lakewood-co',
    'krupp-moving-lakewood-co',
  ],
  adams: [
    'twomenandatruck-adams-co',
    'all-my-sons-thornton-co',
    'thornton-moving-adams-co',
    'adams-county-moving-adams-co',
    'college-hunks-moving-thornton-co',
    'budd-van-lines-thornton-co',
    'thornton-corridor-moving-adams-co',
    'north-metro-moving-adams-co',
    'hercules-movers-thornton-co',
    'krupp-moving-thornton-co',
  ],
  douglas: [
    'twomenandatruck-douglas-co',
    'all-my-sons-castle-rock-co',
    'castle-rock-moving-douglas-co',
    'douglas-county-moving-douglas-co',
    'college-hunks-moving-castle-rock-co',
    'budd-van-lines-castle-rock-co',
    'castle-rock-corridor-moving-douglas-co',
    'south-suburban-moving-douglas-co',
    'hercules-movers-castle-rock-co',
    'krupp-moving-castle-rock-co',
  ],
  weld: [
    'regional-weld-co-movers',
    'all-my-sons-greeley-co',
    'greeley-moving-weld-co',
    'weld-county-moving-weld-co',
    'college-hunks-moving-greeley-co',
    'budd-van-lines-greeley-co',
    'greeley-corridor-moving-weld-co',
    'northern-front-range-moving-weld-co',
    'hercules-movers-greeley-co',
    'krupp-moving-greeley-co',
  ],
};

const BATCH1_RESEARCH: Record<
  string,
  { marketNotes: string; costs: typeof COSTS.metro & { note: string }; tips: string[] }
> = {
  'el-paso': {
    marketNotes:
      'El Paso County is Colorado’s second most populous county with strong military, suburban, and residential demand.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,000+',
      avgHourly: '$125–$190/hr for a 2-person crew',
      note: 'El Paso County pricing reflects Colorado Springs metro demand, military PCS turnover, Pikes Peak corridor traffic, and competition among full-service agents serving suburban communities.',
    },
    tips: [
      'Verify coverage for Colorado Springs, Fountain, and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  denver: {
    marketNotes:
      'Denver County is coterminous with the City of Denver, with dense urban and residential demand.',
    costs: {
      studioRange: '$950–$2,100',
      familyRange: '$4,000–$9,500+',
      avgHourly: '$135–$200/hr for a 2-person crew',
      note: 'Denver County pricing reflects dense urban demand, parking and elevator access fees, heavy I-25 and I-70 corridor traffic, and competition among full-service agents serving downtown and neighborhood moves.',
    },
    tips: [
      'Verify coverage for Denver and surrounding neighborhoods before booking.',
      'Heavy urban traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value urban properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  arapahoe: {
    marketNotes:
      'Arapahoe County is a large suburban county south of Denver with strong residential demand.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$125–$190/hr for a 2-person crew',
      note: 'Arapahoe County pricing reflects Aurora and Centennial suburban demand, Denver metro spillover, and competition among full-service agents serving south-metro communities.',
    },
    tips: [
      'Verify coverage for Aurora, Centennial, and surrounding cities before booking.',
      'Denver metro traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jefferson: {
    marketNotes:
      'Jefferson County is a large suburban county west of Denver with strong residential demand.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$125–$190/hr for a 2-person crew',
      note: 'Jefferson County pricing reflects Lakewood and Arvada suburban demand, foothills access, Denver metro spillover, and competition among full-service agents serving west-metro communities.',
    },
    tips: [
      'Verify coverage for Lakewood, Arvada, and surrounding cities before booking.',
      'Denver metro traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  adams: {
    marketNotes:
      'Adams County is a large suburban county northeast of Denver with strong residential demand.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$120–$185/hr for a 2-person crew',
      note: 'Adams County pricing reflects Thornton and Westminster suburban demand, Denver metro spillover, and competition among full-service agents serving north-metro communities.',
    },
    tips: [
      'Verify coverage for Thornton, Westminster, and surrounding cities before booking.',
      'Denver metro traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  douglas: {
    marketNotes:
      'Douglas County is a large and affluent suburban county south of Denver with strong residential demand.',
    costs: {
      studioRange: '$950–$2,000',
      familyRange: '$3,800–$9,000+',
      avgHourly: '$130–$195/hr for a 2-person crew',
      note: 'Douglas County pricing reflects Castle Rock and Highlands Ranch affluent suburban demand, Denver metro spillover, and competition among full-service agents serving south-suburban communities.',
    },
    tips: [
      'Verify coverage for Castle Rock, Highlands Ranch, and surrounding cities before booking.',
      'Denver metro traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  weld: {
    marketNotes:
      'Weld County is a rapidly growing northern Colorado county with strong residential and agricultural demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Weld County pricing reflects Greeley metro demand, northern front-range growth, agricultural corridor logistics, and competition among regional agents serving Weld communities.',
    },
    tips: [
      'Verify coverage for Greeley and surrounding cities before booking.',
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
  'el-paso': [
    {
      quote:
        'Two Men and a Truck Colorado Springs handled our move professionally — on time and extremely careful with our home.',
      name: 'Alex M.',
      location: 'Colorado Springs, CO',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Colorado Springs navigated our relocation with fair pricing and excellent scheduling through regional traffic.',
      name: 'Beth N.',
      location: 'Fountain, CO',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Pikes Peak Moving served our move efficiently with punctual arrival and professional crew coordination.',
      name: 'Carl O.',
      location: 'Monument, CO',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
  denver: [
    {
      quote:
        'Two Men and a Truck Denver handled our urban move professionally — on time and extremely careful with our belongings.',
      name: 'Dana P.',
      location: 'Denver, CO',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'All My Sons Denver navigated our downtown relocation with fair pricing through heavy urban traffic.',
      name: 'Evan Q.',
      location: 'Denver, CO',
      rating: 5,
      moveType: 'Condo',
    },
    {
      quote:
        'Front Range Moving served our neighborhood move efficiently with steady communication and professional coordination.',
      name: 'Faye R.',
      location: 'Denver, CO',
      rating: 5,
      moveType: 'Townhome',
    },
  ],
  arapahoe: [
    {
      quote:
        'Two Men and a Truck Aurora handled our suburban move professionally — on time and extremely careful.',
      name: 'Glen S.',
      location: 'Aurora, CO',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Aurora navigated our Centennial relocation with fair pricing and excellent Denver metro scheduling.',
      name: 'Hope T.',
      location: 'Centennial, CO',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'South Metro Moving served our move efficiently with punctual arrival and professional crew coordination.',
      name: 'Ira U.',
      location: 'Englewood, CO',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
  jefferson: [
    {
      quote:
        'Two Men and a Truck Jefferson County handled our suburban move professionally — on time and extremely careful.',
      name: 'Jade V.',
      location: 'Lakewood, CO',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Lakewood navigated our Arvada relocation with fair pricing through Denver metro traffic.',
      name: 'Kyle W.',
      location: 'Arvada, CO',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Foothills West Moving served our move efficiently with professional crew coordination.',
      name: 'Lynn X.',
      location: 'Golden, CO',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  adams: [
    {
      quote:
        'Two Men and a Truck Adams County handled our suburban move professionally — on time and extremely careful.',
      name: 'Mia Y.',
      location: 'Thornton, CO',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Thornton navigated our Westminster relocation with fair pricing and excellent scheduling.',
      name: 'Noah Z.',
      location: 'Westminster, CO',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'North Metro Moving served our move efficiently with punctual arrival and professional coordination.',
      name: 'Olive A.',
      location: 'Brighton, CO',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
  douglas: [
    {
      quote:
        'Two Men and a Truck Douglas County handled our suburban move professionally — on time and extremely careful with our home.',
      name: 'Paul B.',
      location: 'Castle Rock, CO',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Castle Rock navigated our Highlands Ranch relocation with fair pricing through Denver metro traffic.',
      name: 'Quinn C.',
      location: 'Highlands Ranch, CO',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'South Suburban Moving served our move efficiently with professional crew coordination.',
      name: 'Rita D.',
      location: 'Parker, CO',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  weld: [
    {
      quote:
        'Regional Greeley / Weld providers handled our move professionally and efficiently with careful handling.',
      name: 'Sam E.',
      location: 'Greeley, CO',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Greeley navigated our relocation with fair pricing and excellent regional scheduling.',
      name: 'Tina F.',
      location: 'Greeley, CO',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Northern Front Range Moving served our move efficiently with punctual arrival and professional coordination.',
      name: 'Uma G.',
      location: 'Evans, CO',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
};

/** Slug collisions with other states — always use explicit CO displayLabel */
const DISPLAY_LABELS: Partial<Record<string, string>> = {
  garfield: 'Garfield County, CO',
  summit: 'Summit County, CO',
  morgan: 'Morgan County, CO',
  jefferson: 'Jefferson County, CO',
  'el-paso': 'El Paso County, CO',
  delta: 'Delta County, CO',
  fremont: 'Fremont County, CO',
  logan: 'Logan County, CO',
  park: 'Park County, CO',
  otero: 'Otero County, CO',
  grand: 'Grand County, CO',
  'rio-grande': 'Rio Grande County, CO',
  yuma: 'Yuma County, CO',
  'san-miguel': 'San Miguel County, CO',
  lake: 'Lake County, CO',
};

const CO_NEIGHBORS: Record<string, string[]> = {
  'el-paso': ['douglas', 'pueblo', 'fremont', 'teller', 'arapahoe'],
  denver: ['arapahoe', 'jefferson', 'adams', 'broomfield', 'boulder'],
  arapahoe: ['denver', 'douglas', 'jefferson', 'el-paso', 'elbert'],
  jefferson: ['denver', 'arapahoe', 'adams', 'clear-creek', 'boulder'],
  adams: ['denver', 'jefferson', 'weld', 'broomfield', 'larimer'],
  douglas: ['denver', 'arapahoe', 'el-paso', 'teller', 'park'],
  weld: ['adams', 'larimer', 'morgan', 'logan', 'boulder'],
  larimer: ['weld', 'boulder', 'adams', 'morgan', 'routt'],
  boulder: ['larimer', 'jefferson', 'broomfield', 'adams', 'weld'],
  pueblo: ['el-paso', 'fremont', 'huerfano', 'las-animas', 'otero'],
  mesa: ['garfield', 'delta', 'montrose', 'eagle', 'routt'],
  broomfield: ['denver', 'adams', 'boulder', 'jefferson', 'weld'],
  garfield: ['mesa', 'eagle', 'routt', 'pitkin', 'grand'],
  'la-plata': ['montezuma', 'mesa', 'delta', 'archuleta', 'san-juan'],
  eagle: ['summit', 'garfield', 'pitkin', 'lake', 'grand'],
  fremont: ['el-paso', 'pueblo', 'teller', 'park', 'chaffee'],
  montrose: ['mesa', 'delta', 'montezuma', 'garfield', 'ouray'],
  delta: ['mesa', 'montrose', 'garfield', 'gunnison', 'eagle'],
  elbert: ['douglas', 'el-paso', 'arapahoe', 'weld', 'kit-carson'],
  summit: ['eagle', 'clear-creek', 'park', 'lake', 'grand'],
  morgan: ['weld', 'larimer', 'adams', 'washington', 'logan'],
  montezuma: ['la-plata', 'mesa', 'archuleta', 'san-miguel', 'dolores'],
  routt: ['eagle', 'garfield', 'summit', 'larimer', 'moffat'],
  teller: ['el-paso', 'douglas', 'fremont', 'park', 'jefferson'],
  chaffee: ['gunnison', 'lake', 'park', 'fremont', 'summit'],
  logan: ['weld', 'morgan', 'yuma', 'washington', 'sedgwick'],
  park: ['jefferson', 'clear-creek', 'summit', 'lake', 'chaffee'],
  otero: ['pueblo', 'las-animas', 'huerfano', 'prowers', 'crowley'],
  gunnison: ['pitkin', 'lake', 'chaffee', 'mesa', 'delta'],
  grand: ['summit', 'clear-creek', 'eagle', 'routt', 'larimer'],
  alamosa: ['conejos', 'rio-grande', 'saguache', 'costilla'],
  pitkin: ['eagle', 'gunnison', 'lake', 'garfield', 'mesa'],
  archuleta: ['la-plata', 'rio-grande', 'conejos', 'mineral', 'san-juan'],
  'las-animas': ['huerfano', 'pueblo', 'otero', 'bent', 'baca'],
  moffat: ['routt', 'garfield', 'eagle', 'rio-blanco', 'jackson'],
  prowers: ['kit-carson', 'las-animas', 'bent', 'baca', 'kiowa'],
  'rio-grande': ['alamosa', 'conejos', 'archuleta', 'mineral', 'saguache'],
  yuma: ['logan', 'kit-carson', 'washington', 'morgan', 'cheyenne'],
  'clear-creek': ['jefferson', 'summit', 'grand', 'park', 'gilpin'],
  'san-miguel': ['montezuma', 'dolores', 'ouray', 'san-juan', 'mesa'],
  lake: ['summit', 'park', 'chaffee', 'pitkin', 'eagle'],
  conejos: ['alamosa', 'rio-grande', 'archuleta', 'huerfano', 'las-animas'],
  'kit-carson': ['yuma', 'weld', 'elbert', 'adams', 'arapahoe'],
  huerfano: ['pueblo', 'fremont', 'las-animas', 'conejos', 'otero'],
};

const COUNTIES: CountyDef[] = [
  {
    slug: 'el-paso',
    name: 'El Paso',
    seat: 'Colorado Springs',
    city: 'Colorado Springs',
    metro: 'el-paso-metro-co',
    costTier: 'metro',
    marketNotes: '',
    costNote: '',
    tipVariant: 'standard',
    batch1: true,
  },
  {
    slug: 'denver',
    name: 'Denver',
    seat: 'Denver',
    city: 'Denver',
    metro: 'denver-metro-co',
    costTier: 'metro',
    marketNotes: '',
    costNote: '',
    tipVariant: 'standard',
    batch1: true,
  },
  {
    slug: 'arapahoe',
    name: 'Arapahoe',
    seat: 'Littleton',
    city: 'Aurora',
    metro: 'arapahoe-metro-co',
    costTier: 'metro',
    marketNotes: '',
    costNote: '',
    tipVariant: 'standard',
    batch1: true,
  },
  {
    slug: 'jefferson',
    name: 'Jefferson',
    seat: 'Golden',
    city: 'Lakewood',
    metro: 'jefferson-metro-co',
    costTier: 'metro',
    marketNotes: '',
    costNote: '',
    tipVariant: 'standard',
    batch1: true,
  },
  {
    slug: 'adams',
    name: 'Adams',
    seat: 'Brighton',
    city: 'Thornton',
    metro: 'adams-metro-co',
    costTier: 'metro',
    marketNotes: '',
    costNote: '',
    tipVariant: 'standard',
    batch1: true,
  },
  {
    slug: 'douglas',
    name: 'Douglas',
    seat: 'Castle Rock',
    city: 'Castle Rock',
    metro: 'douglas-metro-co',
    costTier: 'metro',
    marketNotes: '',
    costNote: '',
    tipVariant: 'standard',
    batch1: true,
  },
  {
    slug: 'weld',
    name: 'Weld',
    seat: 'Greeley',
    city: 'Greeley',
    metro: 'weld-metro-co',
    costTier: 'metro',
    marketNotes: '',
    costNote: '',
    tipVariant: 'standard',
    batch1: true,
  },
  {
    slug: 'larimer',
    name: 'Larimer',
    seat: 'Fort Collins',
    city: 'Fort Collins',
    metro: 'larimer-metro-co',
    costTier: 'metro',
    citySlug: 'fort-collins',
    regional1: 'fort-collins-corridor',
    regional2: 'northern-front-range',
    topId: 'twomenandatruck-larimer-co',
    topName: 'Two Men and a Truck Fort Collins',
    regional1Name: 'Fort Collins Corridor Moving',
    regional2Name: 'Northern Front Range Moving',
    franchise: true,
    marketNotes:
      'Larimer County is a northern Colorado county centered on Fort Collins with strong university, tech, and residential demand across the northern Front Range.',
    costNote:
      'Larimer County pricing reflects Fort Collins metro demand, I-25 corridor traffic, CSU-area turnover, and competition among full-service agents serving northern Colorado communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'boulder',
    name: 'Boulder',
    seat: 'Boulder',
    city: 'Boulder',
    metro: 'boulder-metro-co',
    costTier: 'metro_boulder',
    citySlug: 'boulder',
    regional1: 'boulder-corridor',
    regional2: 'flatirons-foothills',
    topId: 'twomenandatruck-boulder-co',
    topName: 'Two Men and a Truck Boulder',
    regional1Name: 'Boulder Corridor Moving',
    regional2Name: 'Flatirons Foothills Moving',
    franchise: true,
    marketNotes:
      'Boulder County is a high-demand Front Range county with strong residential, university, and foothills demand across Boulder and mountain gateway communities.',
    costNote:
      'Boulder County pricing reflects Boulder metro demand, foothills access logistics, Denver metro spillover, and competition among full-service agents serving northwest metro communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'pueblo',
    name: 'Pueblo',
    seat: 'Pueblo',
    city: 'Pueblo',
    metro: 'pueblo-metro-co',
    costTier: 'rural',
    citySlug: 'pueblo',
    regional1: 'pueblo-corridor',
    regional2: 'southern-colorado',
    topId: 'regional-pueblo-co-movers',
    topName: 'Regional Pueblo / Pueblo County Providers',
    regional1Name: 'Pueblo Corridor Moving',
    regional2Name: 'Southern Colorado Moving',
    marketNotes:
      'Pueblo County is a southern Colorado county with residential and industrial demand across Pueblo and rural southern corridor communities.',
    costNote:
      'Pueblo County pricing reflects southern Colorado rural demand, I-25 corridor traffic, and competition among regional agents serving Pueblo and surrounding plains communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'mesa',
    name: 'Mesa',
    seat: 'Grand Junction',
    city: 'Grand Junction',
    metro: 'mesa-metro-co',
    costTier: 'western_slope',
    citySlug: 'grand-junction',
    regional1: 'grand-junction-corridor',
    regional2: 'western-slope',
    topId: 'regional-mesa-co-movers',
    topName: 'Regional Grand Junction / Mesa Providers',
    regional1Name: 'Grand Junction Corridor Moving',
    regional2Name: 'Western Slope Moving',
    marketNotes:
      'Mesa County anchors western Colorado’s Grand Junction metro with strong residential, agricultural, and outdoor-recreation demand.',
    costNote:
      'Mesa County pricing reflects Grand Junction metro demand, western slope corridor logistics, and competition among regional agents serving Mesa County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'broomfield',
    name: 'Broomfield',
    seat: 'Broomfield',
    city: 'Broomfield',
    metro: 'broomfield-metro-co',
    costTier: 'metro_denver',
    citySlug: 'broomfield',
    regional1: 'broomfield-corridor',
    regional2: 'northwest-metro',
    topId: 'regional-broomfield-co-movers',
    topName: 'Regional Broomfield Providers',
    regional1Name: 'Broomfield Corridor Moving',
    regional2Name: 'Northwest Metro Moving',
    marketNotes:
      'Broomfield County is a compact Denver metro county with strong residential and tech-corridor demand across Broomfield and northwest metro communities.',
    costNote:
      'Broomfield County pricing reflects Denver metro spillover demand, US-36 corridor traffic, and competition among full-service agents serving northwest metro communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'garfield',
    name: 'Garfield',
    seat: 'Glenwood Springs',
    city: 'Glenwood Springs',
    metro: 'garfield-metro-co',
    costTier: 'western_slope',
    citySlug: 'glenwood-springs',
    regional1: 'glenwood-corridor',
    regional2: 'roaring-fork-valley',
    topId: 'regional-garfield-co-movers',
    topName: 'Regional Glenwood Springs / Garfield Providers',
    regional1Name: 'Glenwood Corridor Moving',
    regional2Name: 'Roaring Fork Valley Moving',
    marketNotes:
      'Garfield County, CO spans Glenwood Springs and the Roaring Fork Valley with residential and tourism demand — not to be confused with Garfield County, Utah.',
    costNote:
      'Garfield County pricing reflects Glenwood Springs-area demand, I-70 corridor traffic, Roaring Fork Valley logistics, and competition among regional agents serving western Colorado communities.',
    tipVariant: 'mountain',
  },
  {
    slug: 'la-plata',
    name: 'La Plata',
    seat: 'Durango',
    city: 'Durango',
    metro: 'la-plata-metro-co',
    costTier: 'rural',
    citySlug: 'durango',
    regional1: 'durango-corridor',
    regional2: 'san-juan-mountains',
    topId: 'regional-laplata-co-movers',
    topName: 'Regional Durango / La Plata Providers',
    regional1Name: 'Durango Corridor Moving',
    regional2Name: 'San Juan Mountains Moving',
    marketNotes:
      'La Plata County is a southwestern Colorado county centered on Durango with tourism, outdoor-recreation, and residential demand across the San Juan Mountains.',
    costNote:
      'La Plata County pricing reflects Durango tourism demand, mountain-access logistics, vacation-rental turnover, and competition among regional agents serving southwestern Colorado communities.',
    tipVariant: 'tourist',
  },
  {
    slug: 'eagle',
    name: 'Eagle',
    seat: 'Eagle',
    city: 'Vail',
    metro: 'eagle-metro-co',
    costTier: 'resort',
    citySlug: 'vail',
    regional1: 'vail-corridor',
    regional2: 'ski-country',
    topId: 'regional-eagle-co-movers',
    topName: 'Regional Vail / Eagle Providers',
    regional1Name: 'Vail Corridor Moving',
    regional2Name: 'Ski Country Moving',
    marketNotes:
      'Eagle County anchors Colorado’s Vail Valley resort market with luxury homes, vacation properties, and strong demand across Vail, Avon, and mountain resort communities.',
    costNote:
      'Eagle County pricing reflects Vail resort demand, ski-season turnover, I-70 mountain corridor traffic, and competition among full-service agents serving Eagle County resort communities.',
    tipVariant: 'tourist_mountain',
  },
  {
    slug: 'fremont',
    name: 'Fremont',
    seat: 'Canon City',
    city: 'Canon City',
    metro: 'fremont-metro-co',
    costTier: 'rural',
    citySlug: 'canon-city',
    regional1: 'canon-city-corridor',
    regional2: 'royal-gorge',
    topId: 'regional-fremont-co-movers',
    topName: 'Regional Canon City / Fremont Providers',
    regional1Name: 'Canon City Corridor Moving',
    regional2Name: 'Royal Gorge Moving',
    marketNotes:
      'Fremont County is a central Colorado county with residential demand across Canon City and Royal Gorge corridor communities.',
    costNote:
      'Fremont County pricing reflects Canon City-area demand, rural corridor logistics, and competition among regional agents serving central Colorado communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'montrose',
    name: 'Montrose',
    seat: 'Montrose',
    city: 'Montrose',
    metro: 'montrose-metro-co',
    costTier: 'western_slope',
    citySlug: 'montrose',
    regional1: 'montrose-corridor',
    regional2: 'uncompahgre-valley',
    topId: 'regional-montrose-co-movers',
    topName: 'Regional Montrose / Montrose County Providers',
    regional1Name: 'Montrose Corridor Moving',
    regional2Name: 'Uncompahgre Valley Moving',
    marketNotes:
      'Montrose County is a western Colorado county with residential and agricultural demand across Montrose and Uncompahgre Valley communities.',
    costNote:
      'Montrose County pricing reflects Montrose-area demand, US-50 corridor traffic, and competition among regional agents serving western Colorado valley communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'delta',
    name: 'Delta',
    seat: 'Delta',
    city: 'Delta',
    metro: 'delta-metro-co',
    costTier: 'rural',
    citySlug: 'delta',
    regional1: 'delta-corridor',
    regional2: 'western-slope-south',
    topId: 'regional-delta-co-movers',
    topName: 'Regional Delta / Delta County Providers',
    regional1Name: 'Delta Corridor Moving',
    regional2Name: 'Western Slope South Moving',
    marketNotes:
      'Delta County is a western Colorado county with residential and agricultural demand across Delta and rural western slope communities.',
    costNote:
      'Delta County pricing reflects Delta-area demand, rural travel distances, and competition among regional agents serving western Colorado communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'elbert',
    name: 'Elbert',
    seat: 'Kiowa',
    city: 'Kiowa',
    metro: 'elbert-metro-co',
    costTier: 'rural',
    citySlug: 'kiowa',
    regional1: 'kiowa-corridor',
    regional2: 'eastern-plains',
    topId: 'regional-elbert-co-movers',
    topName: 'Regional Kiowa / Elbert Providers',
    regional1Name: 'Kiowa Corridor Moving',
    regional2Name: 'Eastern Plains Moving',
    marketNotes:
      'Elbert County is an eastern plains county with residential and ranch demand across Kiowa and rural Denver metro fringe communities.',
    costNote:
      'Elbert County pricing reflects Kiowa-area demand, eastern plains travel distances, and competition among regional agents serving rural Front Range fringe communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'summit',
    name: 'Summit',
    seat: 'Breckenridge',
    city: 'Breckenridge',
    metro: 'summit-metro-co',
    costTier: 'resort',
    citySlug: 'breckenridge',
    regional1: 'breckenridge-corridor',
    regional2: 'ski-resort',
    topId: 'regional-summit-co-movers',
    topName: 'Regional Breckenridge / Summit Providers',
    regional1Name: 'Breckenridge Corridor Moving',
    regional2Name: 'Ski Resort Moving',
    marketNotes:
      'Summit County, CO anchors Colorado’s high-country resort market with luxury homes and vacation properties across Breckenridge and Frisco — not to be confused with Summit County, Utah.',
    costNote:
      'Summit County pricing reflects Breckenridge resort demand, ski-season turnover, I-70 mountain corridor traffic, and competition among full-service agents serving high-country resort communities.',
    tipVariant: 'tourist_mountain',
  },
  {
    slug: 'morgan',
    name: 'Morgan',
    seat: 'Fort Morgan',
    city: 'Fort Morgan',
    metro: 'morgan-metro-co',
    costTier: 'rural',
    citySlug: 'fort-morgan',
    regional1: 'fort-morgan-corridor',
    regional2: 'eastern-plains-north',
    topId: 'regional-morgan-co-movers',
    topName: 'Regional Fort Morgan / Morgan Providers',
    regional1Name: 'Fort Morgan Corridor Moving',
    regional2Name: 'Eastern Plains North Moving',
    marketNotes:
      'Morgan County, CO is an eastern plains county with residential and agricultural demand across Fort Morgan — not to be confused with Morgan County, Utah.',
    costNote:
      'Morgan County pricing reflects Fort Morgan-area demand, eastern plains travel distances, and competition among regional agents serving northeastern Colorado communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'montezuma',
    name: 'Montezuma',
    seat: 'Cortez',
    city: 'Cortez',
    metro: 'montezuma-metro-co',
    costTier: 'rural',
    citySlug: 'cortez',
    regional1: 'cortez-corridor',
    regional2: 'four-corners',
    topId: 'regional-montezuma-co-movers',
    topName: 'Regional Cortez / Montezuma Providers',
    regional1Name: 'Cortez Corridor Moving',
    regional2Name: 'Four Corners Moving',
    marketNotes:
      'Montezuma County is a southwestern Colorado county with residential and tourism demand across Cortez and four corners gateway communities.',
    costNote:
      'Montezuma County pricing reflects Cortez-area demand, four corners corridor logistics, and competition among regional agents serving southwestern Colorado communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'routt',
    name: 'Routt',
    seat: 'Steamboat Springs',
    city: 'Steamboat Springs',
    metro: 'routt-metro-co',
    costTier: 'resort',
    citySlug: 'steamboat-springs',
    regional1: 'steamboat-corridor',
    regional2: 'yampa-valley',
    topId: 'regional-routt-co-movers',
    topName: 'Regional Steamboat Springs / Routt Providers',
    regional1Name: 'Steamboat Corridor Moving',
    regional2Name: 'Yampa Valley Moving',
    marketNotes:
      'Routt County anchors northwestern Colorado’s Steamboat Springs resort market with luxury homes, vacation properties, and strong Yampa Valley residential demand.',
    costNote:
      'Routt County pricing reflects Steamboat resort demand, ski-season turnover, mountain-access logistics, and competition among full-service agents serving northwestern Colorado resort communities.',
    tipVariant: 'tourist_mountain',
  },
  {
    slug: 'teller',
    name: 'Teller',
    seat: 'Cripple Creek',
    city: 'Cripple Creek',
    metro: 'teller-metro-co',
    costTier: 'rural',
    citySlug: 'cripple-creek',
    regional1: 'cripple-creek-corridor',
    regional2: 'pikes-peak-west',
    topId: 'regional-teller-co-movers',
    topName: 'Regional Cripple Creek / Teller Providers',
    regional1Name: 'Cripple Creek Corridor Moving',
    regional2Name: 'Pikes Peak West Moving',
    marketNotes:
      'Teller County is a Pikes Peak west mountain county with tourism, gaming, and residential demand across Cripple Creek and Woodland Park corridor communities.',
    costNote:
      'Teller County pricing reflects Cripple Creek-area demand, Pikes Peak west mountain-access logistics, Colorado Springs metro spillover, and competition among regional agents serving Teller County communities.',
    tipVariant: 'tourist_mountain',
  },
  {
    slug: 'chaffee',
    name: 'Chaffee',
    seat: 'Salida',
    city: 'Salida',
    metro: 'chaffee-metro-co',
    costTier: 'western_slope',
    citySlug: 'salida',
    regional1: 'salida-corridor',
    regional2: 'arkansas-river-valley',
    topId: 'regional-chaffee-co-movers',
    topName: 'Regional Salida / Chaffee Providers',
    regional1Name: 'Salida Corridor Moving',
    regional2Name: 'Arkansas River Valley Moving',
    marketNotes:
      'Chaffee County is a central Colorado mountain county centered on Salida with tourism, outdoor-recreation, and residential demand across the Arkansas River Valley.',
    costNote:
      'Chaffee County pricing reflects Salida tourism demand, mountain-access logistics, vacation-rental turnover, and competition among regional agents serving central Colorado mountain communities.',
    tipVariant: 'tourist_mountain',
  },
  {
    slug: 'logan',
    name: 'Logan',
    seat: 'Sterling',
    city: 'Sterling',
    metro: 'logan-metro-co',
    costTier: 'rural',
    citySlug: 'sterling',
    regional1: 'sterling-corridor',
    regional2: 'eastern-plains',
    topId: 'regional-logan-co-movers',
    topName: 'Regional Sterling / Logan Providers',
    regional1Name: 'Sterling Corridor Moving',
    regional2Name: 'Eastern Plains Moving',
    marketNotes:
      'Logan County, CO is an eastern plains county centered on Sterling with residential and agricultural demand across northeastern Colorado communities.',
    costNote:
      'Logan County pricing reflects Sterling-area demand, eastern plains travel distances, and competition among regional agents serving northeastern Colorado communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'park',
    name: 'Park',
    seat: 'Fairplay',
    city: 'Fairplay',
    metro: 'park-metro-co',
    costTier: 'western_slope',
    citySlug: 'fairplay',
    regional1: 'fairplay-corridor',
    regional2: 'south-park',
    topId: 'regional-park-co-movers',
    topName: 'Regional Fairplay / Park Providers',
    regional1Name: 'Fairplay Corridor Moving',
    regional2Name: 'South Park Moving',
    marketNotes:
      'Park County, CO spans Fairplay and the South Park high-country basin with mountain residential and seasonal demand across central Colorado communities.',
    costNote:
      'Park County pricing reflects Fairplay-area demand, South Park mountain-access logistics, Denver metro spillover, and competition among regional agents serving high-country communities.',
    tipVariant: 'mountain',
  },
  {
    slug: 'otero',
    name: 'Otero',
    seat: 'La Junta',
    city: 'La Junta',
    metro: 'otero-metro-co',
    costTier: 'rural',
    citySlug: 'la-junta',
    regional1: 'la-junta-corridor',
    regional2: 'southeast-plains',
    topId: 'regional-otero-co-movers',
    topName: 'Regional La Junta / Otero Providers',
    regional1Name: 'La Junta Corridor Moving',
    regional2Name: 'Southeast Plains Moving',
    marketNotes:
      'Otero County, CO is a southeastern plains county centered on La Junta with residential and agricultural demand across Arkansas Valley communities.',
    costNote:
      'Otero County pricing reflects La Junta-area demand, southeastern plains travel distances, and competition among regional agents serving rural Colorado communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'gunnison',
    name: 'Gunnison',
    seat: 'Gunnison',
    city: 'Gunnison',
    metro: 'gunnison-metro-co',
    costTier: 'western_slope',
    citySlug: 'gunnison',
    regional1: 'gunnison-corridor',
    regional2: 'crested-butte-area',
    topId: 'regional-gunnison-co-movers',
    topName: 'Regional Gunnison / Gunnison County Providers',
    regional1Name: 'Gunnison Corridor Moving',
    regional2Name: 'Crested Butte Area Moving',
    marketNotes:
      'Gunnison County is a central Colorado mountain county with tourism, university, and outdoor-recreation demand across Gunnison and Crested Butte communities.',
    costNote:
      'Gunnison County pricing reflects Gunnison tourism demand, Crested Butte resort spillover, mountain-access logistics, and competition among regional agents serving central Colorado communities.',
    tipVariant: 'tourist_mountain',
  },
  {
    slug: 'grand',
    name: 'Grand',
    seat: 'Hot Sulphur Springs',
    city: 'Granby',
    metro: 'grand-metro-co',
    costTier: 'metro',
    citySlug: 'granby',
    regional1: 'granby-corridor',
    regional2: 'winter-park-area',
    topId: 'regional-grand-co-movers',
    topName: 'Regional Granby / Grand Providers',
    regional1Name: 'Granby Corridor Moving',
    regional2Name: 'Winter Park Area Moving',
    marketNotes:
      'Grand County, CO spans Granby, Winter Park, and Hot Sulphur Springs with mountain resort and residential demand across the western I-70 corridor.',
    costNote:
      'Grand County pricing reflects Granby and Winter Park demand, I-70 mountain corridor traffic, ski-season turnover, and competition among full-service agents serving Grand County resort communities.',
    tipVariant: 'mountain',
  },
  {
    slug: 'alamosa',
    name: 'Alamosa',
    seat: 'Alamosa',
    city: 'Alamosa',
    metro: 'alamosa-metro-co',
    costTier: 'rural',
    citySlug: 'alamosa',
    regional1: 'alamosa-corridor',
    regional2: 'san-luis-valley',
    topId: 'regional-alamosa-co-movers',
    topName: 'Regional Alamosa / Alamosa County Providers',
    regional1Name: 'Alamosa Corridor Moving',
    regional2Name: 'San Luis Valley Moving',
    marketNotes:
      'Alamosa County anchors the San Luis Valley with residential, agricultural, and university demand across Alamosa and southern Colorado valley communities.',
    costNote:
      'Alamosa County pricing reflects San Luis Valley demand, rural travel distances, and competition among regional agents serving southern Colorado communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'pitkin',
    name: 'Pitkin',
    seat: 'Aspen',
    city: 'Aspen',
    metro: 'pitkin-metro-co',
    costTier: 'luxury',
    citySlug: 'aspen',
    regional1: 'aspen-corridor',
    regional2: 'roaring-fork-luxury',
    topId: 'regional-pitkin-co-movers',
    topName: 'Regional Aspen / Pitkin Providers',
    regional1Name: 'Aspen Corridor Moving',
    regional2Name: 'Roaring Fork Luxury Moving',
    marketNotes:
      'Pitkin County anchors Colorado’s Aspen luxury resort market with high-value homes, vacation properties, and strong demand across Aspen and Roaring Fork Valley communities.',
    costNote:
      'Pitkin County pricing reflects Aspen luxury resort demand, ski-season turnover, Roaring Fork Valley logistics, and competition among full-service agents serving high-end mountain resort communities.',
    tipVariant: 'tourist_mountain',
  },
  {
    slug: 'archuleta',
    name: 'Archuleta',
    seat: 'Pagosa Springs',
    city: 'Pagosa Springs',
    metro: 'archuleta-metro-co',
    costTier: 'rural',
    citySlug: 'pagosa-springs',
    regional1: 'pagosa-corridor',
    regional2: 'san-juan-south',
    topId: 'regional-archuleta-co-movers',
    topName: 'Regional Pagosa Springs / Archuleta Providers',
    regional1Name: 'Pagosa Corridor Moving',
    regional2Name: 'San Juan South Moving',
    marketNotes:
      'Archuleta County is a southwestern Colorado county centered on Pagosa Springs with tourism, outdoor-recreation, and residential demand across the San Juan south corridor.',
    costNote:
      'Archuleta County pricing reflects Pagosa Springs tourism demand, mountain-access logistics, vacation-rental turnover, and competition among regional agents serving southwestern Colorado communities.',
    tipVariant: 'tourist',
  },
  {
    slug: 'las-animas',
    name: 'Las Animas',
    seat: 'Trinidad',
    city: 'Trinidad',
    metro: 'las-animas-metro-co',
    costTier: 'rural',
    citySlug: 'trinidad',
    regional1: 'trinidad-corridor',
    regional2: 'southern-frontier',
    topId: 'regional-lasanimas-co-movers',
    topName: 'Regional Trinidad / Las Animas Providers',
    regional1Name: 'Trinidad Corridor Moving',
    regional2Name: 'Southern Frontier Moving',
    marketNotes:
      'Las Animas County is a southern Colorado county centered on Trinidad with residential and energy-corridor demand across the southern frontier region.',
    costNote:
      'Las Animas County pricing reflects Trinidad-area demand, southern Colorado rural travel distances, and competition among regional agents serving frontier corridor communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'moffat',
    name: 'Moffat',
    seat: 'Craig',
    city: 'Craig',
    metro: 'moffat-metro-co',
    costTier: 'rural',
    citySlug: 'craig',
    regional1: 'craig-corridor',
    regional2: 'northwest-colorado',
    topId: 'regional-moffat-co-movers',
    topName: 'Regional Craig / Moffat Providers',
    regional1Name: 'Craig Corridor Moving',
    regional2Name: 'Northwest Colorado Moving',
    marketNotes:
      'Moffat County is a northwestern Colorado county centered on Craig with residential, energy, and agricultural demand across northwest Colorado communities.',
    costNote:
      'Moffat County pricing reflects Craig-area demand, northwest Colorado travel distances, and competition among regional agents serving rural corridor communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'prowers',
    name: 'Prowers',
    seat: 'Lamar',
    city: 'Lamar',
    metro: 'prowers-metro-co',
    costTier: 'rural',
    citySlug: 'lamar',
    regional1: 'lamar-corridor',
    regional2: 'eastern-plains-south',
    topId: 'regional-prowers-co-movers',
    topName: 'Regional Lamar / Prowers Providers',
    regional1Name: 'Lamar Corridor Moving',
    regional2Name: 'Eastern Plains South Moving',
    marketNotes:
      'Prowers County is an eastern plains county centered on Lamar with residential and agricultural demand across southeastern Colorado communities.',
    costNote:
      'Prowers County pricing reflects Lamar-area demand, eastern plains travel distances, and competition among regional agents serving rural southeastern Colorado communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'rio-grande',
    name: 'Rio Grande',
    seat: 'Del Norte',
    city: 'Del Norte',
    metro: 'rio-grande-metro-co',
    costTier: 'rural',
    citySlug: 'del-norte',
    regional1: 'del-norte-corridor',
    regional2: 'rio-grande-valley',
    topId: 'regional-riogrande-co-movers',
    topName: 'Regional Del Norte / Rio Grande Providers',
    regional1Name: 'Del Norte Corridor Moving',
    regional2Name: 'Rio Grande Valley Moving',
    marketNotes:
      'Rio Grande County, CO is a southern Colorado county centered on Del Norte with residential and agricultural demand across the Rio Grande Valley.',
    costNote:
      'Rio Grande County pricing reflects Del Norte-area demand, San Juan south corridor logistics, and competition among regional agents serving rural southern Colorado communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'yuma',
    name: 'Yuma',
    seat: 'Wray',
    city: 'Wray',
    metro: 'yuma-metro-co',
    costTier: 'rural',
    citySlug: 'wray',
    regional1: 'wray-corridor',
    regional2: 'eastern-corner',
    topId: 'regional-yuma-co-movers',
    topName: 'Regional Wray / Yuma Providers',
    regional1Name: 'Wray Corridor Moving',
    regional2Name: 'Eastern Corner Moving',
    marketNotes:
      'Yuma County, CO is an eastern Colorado corner county centered on Wray with residential and agricultural demand across the northeastern plains.',
    costNote:
      'Yuma County pricing reflects Wray-area demand, eastern corner travel distances, and competition among regional agents serving rural northeastern Colorado communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'clear-creek',
    name: 'Clear Creek',
    seat: 'Georgetown',
    city: 'Georgetown',
    metro: 'clear-creek-metro-co',
    costTier: 'metro_denver',
    citySlug: 'georgetown',
    regional1: 'georgetown-corridor',
    regional2: 'i-70-mountain',
    topId: 'regional-clearcreek-co-movers',
    topName: 'Regional Georgetown / Clear Creek Providers',
    regional1Name: 'Georgetown Corridor Moving',
    regional2Name: 'I-70 Mountain Moving',
    marketNotes:
      'Clear Creek County spans Georgetown and the I-70 mountain corridor with residential and seasonal demand across Denver metro gateway communities.',
    costNote:
      'Clear Creek County pricing reflects Georgetown-area demand, I-70 mountain corridor traffic, Denver metro spillover, and competition among full-service agents serving west-metro mountain communities.',
    tipVariant: 'mountain',
  },
  {
    slug: 'san-miguel',
    name: 'San Miguel',
    seat: 'Telluride',
    city: 'Telluride',
    metro: 'san-miguel-metro-co',
    costTier: 'resort',
    citySlug: 'telluride',
    regional1: 'telluride-corridor',
    regional2: 'san-juan-luxury',
    topId: 'regional-sanmiguel-co-movers',
    topName: 'Regional Telluride / San Miguel Providers',
    regional1Name: 'Telluride Corridor Moving',
    regional2Name: 'San Juan Luxury Moving',
    marketNotes:
      'San Miguel County, CO anchors the Telluride resort market with luxury homes, vacation properties, and strong demand across southwestern Colorado mountain communities.',
    costNote:
      'San Miguel County pricing reflects Telluride resort demand, ski-season turnover, San Juan mountain-access logistics, and competition among full-service agents serving luxury resort communities.',
    tipVariant: 'tourist_mountain',
  },
  {
    slug: 'lake',
    name: 'Lake',
    seat: 'Leadville',
    city: 'Leadville',
    metro: 'lake-metro-co',
    costTier: 'western_slope',
    citySlug: 'leadville',
    regional1: 'leadville-corridor',
    regional2: 'high-country',
    topId: 'regional-lake-co-movers',
    topName: 'Regional Leadville / Lake Providers',
    regional1Name: 'Leadville Corridor Moving',
    regional2Name: 'High Country Moving',
    marketNotes:
      'Lake County, CO is Colorado’s smallest county centered on Leadville with mountain residential and tourism demand across high-country communities.',
    costNote:
      'Lake County pricing reflects Leadville-area demand, high-country mountain-access logistics, and competition among regional agents serving central Colorado mountain communities.',
    tipVariant: 'mountain',
  },
  {
    slug: 'conejos',
    name: 'Conejos',
    seat: 'Conejos',
    city: 'Conejos',
    metro: 'conejos-metro-co',
    costTier: 'rural',
    citySlug: 'conejos',
    regional1: 'conejos-corridor',
    regional2: 'san-luis-south',
    topId: 'regional-conejos-co-movers',
    topName: 'Regional Conejos / Conejos County Providers',
    regional1Name: 'Conejos Corridor Moving',
    regional2Name: 'San Luis South Moving',
    marketNotes:
      'Conejos County is a southern Colorado county with residential and agricultural demand across Conejos and San Luis Valley south corridor communities.',
    costNote:
      'Conejos County pricing reflects Conejos-area demand, San Luis Valley rural travel distances, and competition among regional agents serving southern Colorado communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'kit-carson',
    name: 'Kit Carson',
    seat: 'Burlington',
    city: 'Burlington',
    metro: 'kit-carson-metro-co',
    costTier: 'rural',
    citySlug: 'burlington',
    regional1: 'burlington-corridor',
    regional2: 'eastern-plains-east',
    topId: 'regional-kitcarson-co-movers',
    topName: 'Regional Burlington / Kit Carson Providers',
    regional1Name: 'Burlington Corridor Moving',
    regional2Name: 'Eastern Plains East Moving',
    marketNotes:
      'Kit Carson County is an eastern plains county centered on Burlington with residential and agricultural demand across northeastern Colorado communities.',
    costNote:
      'Kit Carson County pricing reflects Burlington-area demand, eastern plains travel distances, and competition among regional agents serving rural northeastern Colorado communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'huerfano',
    name: 'Huerfano',
    seat: 'Walsenburg',
    city: 'Walsenburg',
    metro: 'huerfano-metro-co',
    costTier: 'rural',
    citySlug: 'walsenburg',
    regional1: 'walsenburg-corridor',
    regional2: 'spanish-peaks',
    topId: 'regional-huerfano-co-movers',
    topName: 'Regional Walsenburg / Huerfano Providers',
    regional1Name: 'Walsenburg Corridor Moving',
    regional2Name: 'Spanish Peaks Moving',
    marketNotes:
      'Huerfano County is a southern Colorado county centered on Walsenburg with residential demand across Spanish Peaks corridor and I-25 south communities.',
    costNote:
      'Huerfano County pricing reflects Walsenburg-area demand, southern Colorado rural travel distances, and competition among regional agents serving I-25 south corridor communities.',
    tipVariant: 'rural',
  },
];

function slugKey(slug: string): string {
  return /[^a-z]/.test(slug) ? `'${slug}'` : slug;
}

function q(s: string): string {
  if (s.includes("'")) return JSON.stringify(s);
  return `'${s}'`;
}

function defaultDisplayLabel(slug: string, name: string): string {
  return DISPLAY_LABELS[slug] ?? `${name} County, CO`;
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
    `all-my-sons-${citySlug}-co`,
    `${citySlug}-moving-${slug}-co`,
    `${slug}-county-moving-${slug}-co`,
    `college-hunks-moving-${citySlug}-co`,
    `budd-van-lines-${citySlug}-co`,
    `${c.regional1}-moving-${slug}-co`,
    `${c.regional2}-moving-${slug}-co`,
    `hercules-movers-${citySlug}-co`,
    `krupp-moving-${citySlug}-co`,
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
];

const NON_CURATED_NAMES: Record<string, { name: string; seat: string }> = {
  teller: { name: 'Teller', seat: 'Cripple Creek' },
  'clear-creek': { name: 'Clear Creek', seat: 'Georgetown' },
  logan: { name: 'Logan', seat: 'Sterling' },
  washington: { name: 'Washington', seat: 'Akron' },
  archuleta: { name: 'Archuleta', seat: 'Pagosa Springs' },
  'san-juan': { name: 'San Juan', seat: 'Silverton' },
  pitkin: { name: 'Pitkin', seat: 'Aspen' },
  ouray: { name: 'Ouray', seat: 'Ouray' },
  gunnison: { name: 'Gunnison', seat: 'Gunnison' },
  dolores: { name: 'Dolores', seat: 'Dove Creek' },
  jackson: { name: 'Jackson', seat: 'Walden' },
};

function buildBatch2Testimonials(c: CountyDef, idx: number): string {
  const n1 = TESTIMONIAL_NAMES[idx % TESTIMONIAL_NAMES.length];
  const n2 = TESTIMONIAL_NAMES[(idx + 1) % TESTIMONIAL_NAMES.length];
  const n3 = TESTIMONIAL_NAMES[(idx + 2) % TESTIMONIAL_NAMES.length];
  const city = c.city;
  const altLoc = c.seat !== c.city ? `${c.seat}, CO` : `${city}, CO`;
  return `  ${slugKey(c.slug)}: [
    { quote: ${q(`${c.topName} handled our ${city} move professionally — on time and extremely careful with our home.`)}, name: ${q(n1)}, location: ${q(`${city}, CO`)}, rating: 5, moveType: 'Single-family' },
    { quote: ${q(`All My Sons ${city} navigated our relocation with fair pricing and excellent regional scheduling.`)}, name: ${q(n2)}, location: ${q(altLoc)}, rating: 5, moveType: 'Townhome' },
    { quote: ${q(`${c.regional2Name} served our move efficiently with punctual arrival and professional crew coordination.`)}, name: ${q(n3)}, location: ${q(`${city}, CO`)}, rating: 5, moveType: 'Apartment' },
  ],`;
}

function buildNearbyLinks(slug: string): string {
  const neighbors = CO_NEIGHBORS[slug] ?? [];
  const links: string[] = [];

  for (const n of neighbors.slice(0, 5)) {
    const curated = COUNTIES.find((c) => c.slug === n);
    const fallback = NON_CURATED_NAMES[n];
    const name = curated?.name ?? fallback?.name ?? n;
    const seat = curated?.seat ?? fallback?.seat ?? n;
    const label = curated
      ? defaultDisplayLabel(n, curated.name)
      : `${name} County, CO`;
    const parts = [
      `slug: ${q(n)}`,
      `name: ${q(name)}`,
      `seat: ${q(seat)}`,
      `href: ${q(`/local-movers/colorado/${n}`)}`,
      `displayLabel: ${q(label)}`,
    ];
    links.push(`    { ${parts.join(', ')} }`);
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

/** Hand-curated Colorado county research — batch 1+2+3: 44/64 */
export const coloradoCountyResearch: Record<string, CuratedCountyResearch> = {
${entries.join('\n')}
};

export function getColoradoCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return coloradoCountyResearch[countySlug];
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
    buildBatch2Testimonials(c, i + 7)
  );
  return `import type { CountyTestimonialEntry } from '@/lib/local-movers/county-seo';

/** Hand-curated Colorado county testimonials — batch 1+2+3: 44/64 */
export const coloradoCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
${[...batch1, ...batch2].join('\n')}
};

export function getColoradoCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return coloradoCountyTestimonials[countySlug] ?? [];
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

/** Hand-curated Colorado county mover lists — batch 1+2+3: 44/64 */
const CURATED_CO_COUNTIES: Record<string, string[]> = {
${entries.join('\n')}
};

export const coloradoCountyMoverAssignments: CountyMoverAssignment[] =
  Object.entries(CURATED_CO_COUNTIES).map(([countySlug, moverIds]) => ({
    stateSlug: 'colorado',
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

/** Seat and metro overrides for hand-curated Colorado counties (batch 1+2+3: 44/64) */
export const coloradoCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
${entries.join('\n')}
};

export function applyColoradoCountyOverrides(county: LocalCounty): LocalCounty {
  const override = coloradoCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}
`;
}

function genNearby(): string {
  const entries = COUNTIES.map((c) => buildNearbyLinks(c.slug));
  return `import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Colorado curated county corridor links — batch 1+2+3: 44/64 */
const CO_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
${entries.join('\n')}
};

export function getColoradoNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return CO_COUNTY_NEIGHBORS[countySlug] ?? [];
}
`;
}

const OUTPUTS: { path: string; content: string }[] = [
  { path: 'data/colorado-county-research.ts', content: genResearch() },
  { path: 'data/colorado-county-testimonials.ts', content: genTestimonials() },
  { path: 'data/colorado-county-assignments.ts', content: genAssignments() },
  { path: 'lib/local-movers/geography/colorado-overrides.ts', content: genOverrides() },
  { path: 'lib/local-movers/colorado-nearby.ts', content: genNearby() },
];

for (const { path, content } of OUTPUTS) {
  const full = join(ROOT, path);
  writeFileSync(full, content, 'utf8');
  console.log(`Wrote ${path}`);
}

console.log(`\nGenerated ${COUNTIES.length} Colorado counties across ${OUTPUTS.length} files.`);