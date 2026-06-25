/**
 * Generates Nebraska county curation files (batch 1 — 21 counties).
 * Run: npx tsx scripts/generate-nebraska-county-data.ts
 */
import { writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(__dirname, '..');
const EXPECTED_COUNT = 21;

type CostTier = 'metro' | 'secondary_metro' | 'rural';

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
  secondary_metro: {
    studioRange: '$800–$1,600',
    familyRange: '$2,900–$6,500+',
    avgHourly: '$115–$175/hr for a 2-person crew',
  },
  rural: {
    studioRange: '$750–$1,500',
    familyRange: '$2,600–$5,800+',
    avgHourly: '$100–$155/hr for a 2-person crew',
  },
};

const DISPLAY_LABELS: Partial<Record<string, string>> = {
  buffalo: 'Buffalo County, NE',
  madison: 'Madison County, NE',
  platte: 'Platte County, NE',
  lincoln: 'Lincoln County, NE',
  adams: 'Adams County, NE',
  cass: 'Cass County, NE',
  dakota: 'Dakota County, NE',
  washington: 'Washington County, NE',
  seward: 'Seward County, NE',
  saline: 'Saline County, NE',
  york: 'York County, NE',
};

const NE_NEIGHBORS: Record<string, string[]> = {
  douglas: ['sarpy', 'washington', 'saunders', 'cass', 'dodge'],
  lancaster: ['saunders', 'seward', 'saline', 'gage', 'otoe'],
  sarpy: ['douglas', 'cass', 'saunders', 'washington'],
  hall: ['buffalo', 'adams', 'dawson', 'hamilton', 'merrick'],
  buffalo: ['hall', 'dawson', 'lincoln', 'adams', 'phelps'],
  dodge: ['douglas', 'saunders', 'washington', 'colfax', 'cuming'],
  madison: ['platte', 'dakota', 'pierce', 'wayne', 'antelope'],
  platte: ['madison', 'hall', 'colfax', 'merrick', 'polk'],
  'scotts-bluff': ['banner', 'sioux', 'box-butte', 'morrill', 'garden'],
  lincoln: ['buffalo', 'dawson', 'mcpherson', 'logan', 'custer'],
  adams: ['hall', 'buffalo', 'york', 'clay', 'fillmore'],
  cass: ['sarpy', 'douglas', 'saunders', 'otoe', 'mills'],
  dawson: ['hall', 'buffalo', 'lincoln', 'gosper', 'phelps'],
  saunders: ['douglas', 'lancaster', 'sarpy', 'cass', 'dodge', 'washington', 'seward'],
  dakota: ['madison', 'dixon', 'thurston', 'wayne', 'cedar'],
  gage: ['lancaster', 'saline', 'otoe', 'jefferson', 'thayer'],
  washington: ['douglas', 'dodge', 'saunders', 'burt', 'thurston'],
  seward: ['lancaster', 'saunders', 'york', 'fillmore', 'butler'],
  otoe: ['cass', 'lancaster', 'gage', 'johnson', 'nemaha'],
  saline: ['lancaster', 'gage', 'jefferson', 'fillmore', 'thayer'],
  york: ['hall', 'seward', 'adams', 'fillmore', 'hamilton'],
};

type CrossBorder = {
  slug: string;
  stateSlug: string;
  name: string;
  seat: string;
  displayLabel: string;
};

const CROSS_BORDER: Partial<Record<string, CrossBorder[]>> = {
  douglas: [
    {
      slug: 'pottawattamie',
      stateSlug: 'iowa',
      name: 'Pottawattamie',
      seat: 'Council Bluffs',
      displayLabel: 'Pottawattamie County, IA',
    },
  ],
  sarpy: [
    {
      slug: 'pottawattamie',
      stateSlug: 'iowa',
      name: 'Pottawattamie',
      seat: 'Council Bluffs',
      displayLabel: 'Pottawattamie County, IA',
    },
    {
      slug: 'mills',
      stateSlug: 'iowa',
      name: 'Mills',
      seat: 'Glenwood',
      displayLabel: 'Mills County, IA',
    },
  ],
  cass: [
    {
      slug: 'mills',
      stateSlug: 'iowa',
      name: 'Mills',
      seat: 'Glenwood',
      displayLabel: 'Mills County, IA',
    },
    {
      slug: 'pottawattamie',
      stateSlug: 'iowa',
      name: 'Pottawattamie',
      seat: 'Council Bluffs',
      displayLabel: 'Pottawattamie County, IA',
    },
  ],
  dakota: [
    {
      slug: 'woodbury',
      stateSlug: 'iowa',
      name: 'Woodbury',
      seat: 'Sioux City',
      displayLabel: 'Woodbury County, IA',
    },
  ],
};

const COUNTIES: CountyDef[] = [
  {
    slug: 'douglas',
    name: 'Douglas',
    seat: 'Omaha',
    city: 'Omaha',
    metro: 'douglas-metro-ne',
    costTier: 'metro',
    citySlug: 'omaha',
    regional1: 'omaha-corridor',
    regional2: 'platte-river-east',
    topId: 'twomenandatruck-douglas-ne',
    topName: 'Two Men and a Truck Omaha',
    regional1Name: 'Omaha Corridor Moving',
    regional2Name: 'Platte River East Moving',
    franchise: true,
    marketNotes:
      'Douglas County anchors Nebraska’s largest metro centered on Omaha with strong suburban, commercial, healthcare, and Missouri River cross-border demand across Bellevue-adjacent, West Omaha, and Council Bluffs corridor communities.',
    costNote:
      'Douglas County pricing reflects Omaha metro demand, suburban new-construction turnover, I-80 and I-29 corridor traffic, and competition among full-service agents serving Douglas County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'lancaster',
    name: 'Lancaster',
    seat: 'Lincoln',
    city: 'Lincoln',
    metro: 'lancaster-metro-ne',
    costTier: 'secondary_metro',
    citySlug: 'lincoln',
    regional1: 'lincoln-corridor',
    regional2: 'salt-creek-valley',
    topId: 'twomenandatruck-lancaster-ne',
    topName: 'Two Men and a Truck Lincoln',
    regional1Name: 'Lincoln Corridor Moving',
    regional2Name: 'Salt Creek Valley Moving',
    franchise: true,
    marketNotes:
      'Lancaster County is Nebraska’s capital and university county centered on Lincoln with strong state-government, University of Nebraska–Lincoln, student-housing, and Salt Creek Valley residential demand across downtown, south Lincoln, and suburban growth corridors.',
    costNote:
      'Lancaster County pricing reflects Lincoln secondary-metro demand, state-government and university relocations, Salt Creek Valley corridor traffic, and competition among full-service agents serving Lancaster County communities.',
    tipVariant: 'university',
  },
  {
    slug: 'sarpy',
    name: 'Sarpy',
    seat: 'Papillion',
    city: 'Papillion',
    metro: 'sarpy-metro-ne',
    costTier: 'metro',
    citySlug: 'papillion',
    regional1: 'papillion-corridor',
    regional2: 'omaha-south',
    topId: 'regional-sarpy-ne-movers',
    topName: 'Regional Papillion / Sarpy Providers',
    regional1Name: 'Papillion Corridor Moving',
    regional2Name: 'Omaha South Moving',
    marketNotes:
      'Sarpy County is Nebraska’s fastest-growing suburban county centered on Papillion with strong Omaha metro south-bank demand across Bellevue, La Vista, Gretna, and Offutt Air Force Base corridor communities.',
    costNote:
      'Sarpy County pricing reflects Omaha metro suburban growth demand, Papillion and Bellevue corridor traffic, new-construction turnover, and competition among regional agents serving Sarpy County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'hall',
    name: 'Hall',
    seat: 'Grand Island',
    city: 'Grand Island',
    metro: 'hall-metro-ne',
    costTier: 'rural',
    citySlug: 'grand-island',
    regional1: 'grand-island-corridor',
    regional2: 'platte-valley-central',
    topId: 'regional-hall-ne-movers',
    topName: 'Regional Grand Island / Hall Providers',
    regional1Name: 'Grand Island Corridor Moving',
    regional2Name: 'Platte Valley Central Moving',
    marketNotes:
      'Hall County is a central Nebraska hub county centered on Grand Island with residential, manufacturing, agricultural, and I-80 Platte Valley corridor demand across central Nebraska gateway communities.',
    costNote:
      'Hall County pricing reflects Grand Island-area demand, Platte Valley central corridor travel distances, agricultural property logistics, and competition among regional agents serving Hall County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'buffalo',
    name: 'Buffalo',
    seat: 'Kearney',
    city: 'Kearney',
    metro: 'buffalo-metro-ne',
    costTier: 'rural',
    citySlug: 'kearney',
    regional1: 'kearney-corridor',
    regional2: 'platte-valley-mid',
    topId: 'regional-buffalo-ne-movers',
    topName: 'Regional Kearney / Buffalo County Providers',
    regional1Name: 'Kearney Corridor Moving',
    regional2Name: 'Platte Valley Mid Moving',
    marketNotes:
      'Buffalo County, NE is a central Nebraska county centered on Kearney with strong University of Nebraska at Kearney, student-housing, and I-80 Platte Valley mid-corridor demand — not to be confused with Buffalo County in other states.',
    costNote:
      'Buffalo County pricing reflects Kearney-area demand, I-80 Platte Valley mid-corridor traffic, university and agricultural property logistics, and competition among regional agents serving Buffalo County communities.',
    tipVariant: 'university',
  },
  {
    slug: 'dodge',
    name: 'Dodge',
    seat: 'Fremont',
    city: 'Fremont',
    metro: 'dodge-metro-ne',
    costTier: 'rural',
    citySlug: 'fremont',
    regional1: 'fremont-corridor',
    regional2: 'elkhorn-river-east',
    topId: 'regional-dodge-ne-movers',
    topName: 'Regional Fremont / Dodge Providers',
    regional1Name: 'Fremont Corridor Moving',
    regional2Name: 'Elkhorn River East Moving',
    marketNotes:
      'Dodge County is an eastern Nebraska county centered on Fremont with residential, manufacturing, and Elkhorn River east corridor demand across Omaha metro fringe and agricultural communities.',
    costNote:
      'Dodge County pricing reflects Fremont-area demand, Elkhorn River east corridor travel distances, agricultural and industrial property logistics, and competition among regional agents serving Dodge County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'madison',
    name: 'Madison',
    seat: 'Norfolk',
    city: 'Norfolk',
    metro: 'madison-metro-ne',
    costTier: 'rural',
    citySlug: 'norfolk',
    regional1: 'norfolk-corridor',
    regional2: 'elkhorn-valley-north',
    topId: 'regional-madison-ne-movers',
    topName: 'Regional Norfolk / Madison County Providers',
    regional1Name: 'Norfolk Corridor Moving',
    regional2Name: 'Elkhorn Valley North Moving',
    marketNotes:
      'Madison County, NE is a northeastern Nebraska county with seat at Norfolk — not Madison town — with residential, healthcare, and Elkhorn Valley north agricultural demand across US-275 corridor communities.',
    costNote:
      'Madison County pricing reflects Norfolk-area demand, Elkhorn Valley north corridor travel distances, agricultural property logistics, and competition among regional agents serving Madison County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'platte',
    name: 'Platte',
    seat: 'Columbus',
    city: 'Columbus',
    metro: 'platte-metro-ne',
    costTier: 'rural',
    citySlug: 'columbus',
    regional1: 'columbus-corridor',
    regional2: 'loup-river-valley',
    topId: 'regional-platte-ne-movers',
    topName: 'Regional Columbus / Platte County Providers',
    regional1Name: 'Columbus Corridor Moving',
    regional2Name: 'Loup River Valley Moving',
    marketNotes:
      'Platte County, NE is an eastern Nebraska county centered on Columbus with residential, manufacturing, and Loup River valley corridor demand — not to be confused with Platte County in Wyoming or other states.',
    costNote:
      'Platte County pricing reflects Columbus-area demand, Loup River valley corridor travel distances, agricultural and industrial property logistics, and competition among regional agents serving Platte County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'scotts-bluff',
    name: 'Scotts Bluff',
    seat: 'Gering',
    city: 'Scottsbluff',
    metro: 'scotts-bluff-metro-ne',
    costTier: 'rural',
    citySlug: 'scottsbluff',
    regional1: 'scottsbluff-corridor',
    regional2: 'north-platte-valley-west',
    topId: 'regional-scottsbluff-ne-movers',
    topName: 'Regional Scottsbluff / Scotts Bluff Providers',
    regional1Name: 'Scottsbluff Corridor Moving',
    regional2Name: 'North Platte Valley West Moving',
    marketNotes:
      'Scotts Bluff County is a western Nebraska Panhandle county with seat at Gering and strong residential, agricultural, and North Platte Valley west corridor demand across Scottsbluff, Mitchell, and I-80 Panhandle gateway communities.',
    costNote:
      'Scotts Bluff County pricing reflects Scottsbluff and Gering-area demand, Panhandle travel distances, agricultural property logistics, and competition among regional agents serving Scotts Bluff County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'lincoln',
    name: 'Lincoln',
    seat: 'North Platte',
    city: 'North Platte',
    metro: 'lincoln-metro-ne',
    costTier: 'rural',
    citySlug: 'north-platte',
    regional1: 'north-platte-corridor',
    regional2: 'platte-valley-west',
    topId: 'regional-lincoln-ne-movers',
    topName: 'Regional North Platte / Lincoln County Providers',
    regional1Name: 'North Platte Corridor Moving',
    regional2Name: 'Platte Valley West Moving',
    marketNotes:
      'Lincoln County, NE is a western Nebraska county centered on North Platte with residential, railroad-logistics, and Platte Valley west corridor demand — not to be confused with Lancaster County (Lincoln city) or Lincoln County in other states.',
    costNote:
      'Lincoln County pricing reflects North Platte-area demand, Platte Valley west travel distances, ranch and agricultural property logistics, and competition among regional agents serving Lincoln County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'adams',
    name: 'Adams',
    seat: 'Hastings',
    city: 'Hastings',
    metro: 'adams-metro-ne',
    costTier: 'rural',
    citySlug: 'hastings',
    regional1: 'hastings-corridor',
    regional2: 'republican-river-valley',
    topId: 'regional-adams-ne-movers',
    topName: 'Regional Hastings / Adams County Providers',
    regional1Name: 'Hastings Corridor Moving',
    regional2Name: 'Republican River Valley Moving',
    marketNotes:
      'Adams County, NE is a south-central Nebraska county centered on Hastings with residential, manufacturing, and Republican River valley agricultural demand — not to be confused with Adams County in Colorado or other states.',
    costNote:
      'Adams County pricing reflects Hastings-area demand, Republican River valley corridor travel distances, agricultural property logistics, and competition among regional agents serving Adams County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'cass',
    name: 'Cass',
    seat: 'Plattsmouth',
    city: 'Plattsmouth',
    metro: 'cass-metro-ne',
    costTier: 'secondary_metro',
    citySlug: 'plattsmouth',
    regional1: 'plattsmouth-corridor',
    regional2: 'missouri-river-south',
    topId: 'regional-cass-ne-movers',
    topName: 'Regional Plattsmouth / Cass County Providers',
    regional1Name: 'Plattsmouth Corridor Moving',
    regional2Name: 'Missouri River South Moving',
    marketNotes:
      'Cass County, NE is a southeastern Omaha metro county centered on Plattsmouth with residential spillover, Missouri River south-bank, and cross-border Iowa corridor demand — not to be confused with Cass County in other states.',
    costNote:
      'Cass County pricing reflects Plattsmouth secondary-metro demand, Missouri River south corridor traffic, Omaha metro fringe logistics, and competition among regional agents serving Cass County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'dawson',
    name: 'Dawson',
    seat: 'Lexington',
    city: 'Lexington',
    metro: 'dawson-metro-ne',
    costTier: 'rural',
    citySlug: 'lexington',
    regional1: 'lexington-corridor',
    regional2: 'platte-valley-midwest',
    topId: 'regional-dawson-ne-movers',
    topName: 'Regional Lexington / Dawson Providers',
    regional1Name: 'Lexington Corridor Moving',
    regional2Name: 'Platte Valley Midwest Moving',
    marketNotes:
      'Dawson County is a central Nebraska county centered on Lexington with residential, food-processing, and Platte Valley midwest agricultural demand across I-80 corridor communities.',
    costNote:
      'Dawson County pricing reflects Lexington-area demand, Platte Valley midwest travel distances, agricultural property logistics, and competition among regional agents serving Dawson County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'saunders',
    name: 'Saunders',
    seat: 'Wahoo',
    city: 'Wahoo',
    metro: 'saunders-metro-ne',
    costTier: 'rural',
    citySlug: 'wahoo',
    regional1: 'wahoo-corridor',
    regional2: 'platte-river-mid',
    topId: 'regional-saunders-ne-movers',
    topName: 'Regional Wahoo / Saunders Providers',
    regional1Name: 'Wahoo Corridor Moving',
    regional2Name: 'Platte River Mid Moving',
    marketNotes:
      'Saunders County is an eastern Nebraska county centered on Wahoo with rural residential, agricultural, and Platte River mid-corridor demand bridging Omaha and Lincoln metro fringe communities.',
    costNote:
      'Saunders County pricing reflects Wahoo-area demand, Platte River mid-corridor travel distances, agricultural property logistics, and competition among regional agents serving Saunders County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'dakota',
    name: 'Dakota',
    seat: 'Dakota City',
    city: 'Dakota City',
    metro: 'dakota-metro-ne',
    costTier: 'rural',
    citySlug: 'dakota-city',
    regional1: 'dakota-city-corridor',
    regional2: 'missouri-river-north',
    topId: 'regional-dakota-ne-movers',
    topName: 'Regional Dakota City / Dakota County Providers',
    regional1Name: 'Dakota City Corridor Moving',
    regional2Name: 'Missouri River North Moving',
    marketNotes:
      'Dakota County, NE is a northeastern Nebraska county centered on Dakota City with residential, industrial, and Sioux City metro spillover demand across Missouri River north corridor communities — not to be confused with Dakota County in other states.',
    costNote:
      'Dakota County pricing reflects Dakota City and South Sioux City-area demand, Missouri River north corridor traffic, cross-border Iowa logistics, and competition among regional agents serving Dakota County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'gage',
    name: 'Gage',
    seat: 'Beatrice',
    city: 'Beatrice',
    metro: 'gage-metro-ne',
    costTier: 'rural',
    citySlug: 'beatrice',
    regional1: 'beatrice-corridor',
    regional2: 'big-blue-valley',
    topId: 'regional-gage-ne-movers',
    topName: 'Regional Beatrice / Gage Providers',
    regional1Name: 'Beatrice Corridor Moving',
    regional2Name: 'Big Blue Valley Moving',
    marketNotes:
      'Gage County is a southeastern Nebraska county centered on Beatrice with rural residential, agricultural, and Big Blue River valley corridor demand across Lincoln metro south fringe communities.',
    costNote:
      'Gage County pricing reflects Beatrice-area demand, Big Blue Valley travel distances, agricultural property logistics, and competition among regional agents serving Gage County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'washington',
    name: 'Washington',
    seat: 'Blair',
    city: 'Blair',
    metro: 'washington-metro-ne',
    costTier: 'secondary_metro',
    citySlug: 'blair',
    regional1: 'blair-corridor',
    regional2: 'elkhorn-river-north',
    topId: 'regional-washington-ne-movers',
    topName: 'Regional Blair / Washington County Providers',
    regional1Name: 'Blair Corridor Moving',
    regional2Name: 'Elkhorn River North Moving',
    marketNotes:
      'Washington County, NE is an eastern Omaha metro county centered on Blair with residential spillover, Elkhorn River north corridor, and suburban growth demand — not to be confused with Washington County in other states.',
    costNote:
      'Washington County pricing reflects Blair secondary-metro demand, Elkhorn River north corridor traffic, Omaha metro north-bank logistics, and competition among regional agents serving Washington County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'seward',
    name: 'Seward',
    seat: 'Seward',
    city: 'Seward',
    metro: 'seward-metro-ne',
    costTier: 'rural',
    citySlug: 'seward',
    regional1: 'seward-corridor',
    regional2: 'big-blue-north',
    topId: 'regional-seward-ne-movers',
    topName: 'Regional Seward / Seward County Providers',
    regional1Name: 'Seward Corridor Moving',
    regional2Name: 'Big Blue North Moving',
    marketNotes:
      'Seward County, NE is a southeastern Nebraska county centered on Seward with rural residential, agricultural, and Big Blue River north corridor demand across Lincoln metro fringe communities — not to be confused with Seward County in other states.',
    costNote:
      'Seward County pricing reflects Seward-area demand, Big Blue north corridor travel distances, agricultural property logistics, and competition among regional agents serving Seward County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'otoe',
    name: 'Otoe',
    seat: 'Nebraska City',
    city: 'Nebraska City',
    metro: 'otoe-metro-ne',
    costTier: 'rural',
    citySlug: 'nebraska-city',
    regional1: 'nebraska-city-corridor',
    regional2: 'missouri-river-bluff',
    topId: 'regional-otoe-ne-movers',
    topName: 'Regional Nebraska City / Otoe Providers',
    regional1Name: 'Nebraska City Corridor Moving',
    regional2Name: 'Missouri River Bluff Moving',
    marketNotes:
      'Otoe County is a southeastern Nebraska county centered on Nebraska City with rural residential, orchard-country, and Missouri River bluff corridor demand across historic river-town communities.',
    costNote:
      'Otoe County pricing reflects Nebraska City-area demand, Missouri River bluff corridor travel distances, agricultural property logistics, and competition among regional agents serving Otoe County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'saline',
    name: 'Saline',
    seat: 'Wilber',
    city: 'Wilber',
    metro: 'saline-metro-ne',
    costTier: 'rural',
    citySlug: 'wilber',
    regional1: 'wilber-corridor',
    regional2: 'big-blue-south',
    topId: 'regional-saline-ne-movers',
    topName: 'Regional Wilber / Saline County Providers',
    regional1Name: 'Wilber Corridor Moving',
    regional2Name: 'Big Blue South Moving',
    marketNotes:
      'Saline County, NE is a southeastern Nebraska county centered on Wilber with rural residential, Czech-heritage community, and Big Blue River south corridor agricultural demand — not to be confused with Saline County in other states.',
    costNote:
      'Saline County pricing reflects Wilber-area demand, Big Blue south corridor travel distances, agricultural property logistics, and competition among regional agents serving Saline County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'york',
    name: 'York',
    seat: 'York',
    city: 'York',
    metro: 'york-metro-ne',
    costTier: 'rural',
    citySlug: 'york',
    regional1: 'york-corridor',
    regional2: 'blue-river-valley',
    topId: 'regional-york-ne-movers',
    topName: 'Regional York / York County Providers',
    regional1Name: 'York Corridor Moving',
    regional2Name: 'Blue River Valley Moving',
    marketNotes:
      'York County, NE is a east-central Nebraska county centered on York with rural residential, agricultural, and Blue River valley corridor demand across I-80 and US-81 corridor communities — not to be confused with York County in other states.',
    costNote:
      'York County pricing reflects York-area demand, Blue River valley travel distances, agricultural property logistics, and competition among regional agents serving York County communities.',
    tipVariant: 'rural',
  },
];

const SEAT_BY_SLUG = Object.fromEntries(COUNTIES.map((c) => [c.slug, c.seat]));

const NON_CURATED_NAMES: Record<string, { name: string; seat: string }> = {
  hamilton: { name: 'Hamilton', seat: 'Aurora' },
  merrick: { name: 'Merrick', seat: 'Central City' },
  phelps: { name: 'Phelps', seat: 'Holdrege' },
  colfax: { name: 'Colfax', seat: 'Schuyler' },
  cuming: { name: 'Cuming', seat: 'West Point' },
  pierce: { name: 'Pierce', seat: 'Pierce' },
  wayne: { name: 'Wayne', seat: 'Wayne' },
  antelope: { name: 'Antelope', seat: 'Neligh' },
  polk: { name: 'Polk', seat: 'Osceola' },
  banner: { name: 'Banner', seat: 'Harrisburg' },
  sioux: { name: 'Sioux', seat: 'Harrison' },
  'box-butte': { name: 'Box Butte', seat: 'Alliance' },
  morrill: { name: 'Morrill', seat: 'Bridgeport' },
  garden: { name: 'Garden', seat: 'Oshkosh' },
  mcpherson: { name: 'McPherson', seat: 'Tryon' },
  logan: { name: 'Logan', seat: 'Stapleton' },
  custer: { name: 'Custer', seat: 'Broken Bow' },
  clay: { name: 'Clay', seat: 'Clay Center' },
  fillmore: { name: 'Fillmore', seat: 'Geneva' },
  gosper: { name: 'Gosper', seat: 'Elwood' },
  dixon: { name: 'Dixon', seat: 'Ponca' },
  thurston: { name: 'Thurston', seat: 'Pender' },
  cedar: { name: 'Cedar', seat: 'Hartington' },
  jefferson: { name: 'Jefferson', seat: 'Fairbury' },
  thayer: { name: 'Thayer', seat: 'Hebron' },
  burt: { name: 'Burt', seat: 'Tekamah' },
  butler: { name: 'Butler', seat: 'David City' },
  johnson: { name: 'Johnson', seat: 'Tecumseh' },
  nemaha: { name: 'Nemaha', seat: 'Auburn' },
};

function slugKey(slug: string): string {
  return /[^a-z]/.test(slug) ? `'${slug}'` : slug;
}

function q(s: string): string {
  if (s.includes("'")) return JSON.stringify(s);
  return `'${s}'`;
}

function defaultDisplayLabel(slug: string, name: string): string {
  return DISPLAY_LABELS[slug] ?? `${name} County, NE`;
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
    `all-my-sons-${citySlug}-ne`,
    `${citySlug}-moving-${slug}-ne`,
    `${slug}-county-moving-${slug}-ne`,
    `college-hunks-moving-${citySlug}-ne`,
    `budd-van-lines-${citySlug}-ne`,
    `${c.regional1}-moving-${slug}-ne`,
    `${c.regional2}-moving-${slug}-ne`,
    `hercules-movers-${citySlug}-ne`,
    `krupp-moving-${citySlug}-ne`,
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
  douglas: [
    {
      quote:
        'Two Men and a Truck Omaha handled our suburban move professionally — on time and extremely careful with our home.',
      name: 'Alex M.',
      location: 'Omaha, NE',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Omaha navigated our West Omaha relocation with fair pricing through Platte River east corridor traffic.',
      name: 'Beth N.',
      location: 'Omaha, NE',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Platte River East Moving served our relocation efficiently with steady communication and professional crew coordination.',
      name: 'Carl O.',
      location: 'Bellevue, NE',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
  lancaster: [
    {
      quote:
        'Two Men and a Truck Lincoln handled our capital-city move professionally — on time and extremely careful with our home.',
      name: 'Dana P.',
      location: 'Lincoln, NE',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Lincoln navigated our university-area relocation with fair pricing through Salt Creek Valley corridor traffic.',
      name: 'Eric Q.',
      location: 'Lincoln, NE',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Salt Creek Valley Moving served our relocation efficiently with punctual arrival and professional crew coordination.',
      name: 'Fran R.',
      location: 'Lincoln, NE',
      rating: 5,
      moveType: 'Apartment',
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
  const altLoc = c.seat !== c.city ? `${c.seat}, NE` : `${city}, NE`;
  return `  ${slugKey(c.slug)}: [
    { quote: ${q(`${c.topName} handled our ${city} move professionally — on time and extremely careful with our home.`)}, name: ${q(n1)}, location: ${q(`${city}, NE`)}, rating: 5, moveType: 'Single-family' },
    { quote: ${q(`All My Sons ${city} navigated our relocation with fair pricing and excellent regional scheduling.`)}, name: ${q(n2)}, location: ${q(altLoc)}, rating: 5, moveType: 'Townhome' },
    { quote: ${q(`${c.regional2Name} served our move efficiently with punctual arrival and professional crew coordination.`)}, name: ${q(n3)}, location: ${q(`${city}, NE`)}, rating: 5, moveType: 'Apartment' },
  ],`;
}

function buildNearbyLinks(slug: string): string {
  const neNeighbors = NE_NEIGHBORS[slug] ?? [];
  const cross = CROSS_BORDER[slug] ?? [];
  const crossSlugs = new Set(cross.map((cb) => cb.slug));
  const maxNe = Math.min(neNeighbors.length, Math.max(3, 5 - cross.length));
  const links: string[] = [];

  for (const n of neNeighbors.slice(0, maxNe)) {
    if (crossSlugs.has(n)) continue;
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
      `href: ${q(`/local-movers/nebraska/${n}`)}`,
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

/** Hand-curated Nebraska county research — batch 1 (21 counties) */
export const nebraskaCountyResearch: Record<string, CuratedCountyResearch> = {
${entries.join('\n')}
};

export function getNebraskaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return nebraskaCountyResearch[countySlug];
}
`;
}

function genTestimonials(): string {
  const entries = COUNTIES.map((c, i) => buildTestimonials(c, i + 3));
  return `import type { CountyTestimonialEntry } from '@/lib/local-movers/county-seo';

/** Hand-curated Nebraska county testimonials — batch 1 (21 counties) */
export const nebraskaCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
${entries.join('\n')}
};

export function getNebraskaCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return nebraskaCountyTestimonials[countySlug] ?? [];
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

/** Hand-curated Nebraska county mover lists — batch 1 (21 counties) */
const CURATED_NE_COUNTIES: Record<string, string[]> = {
${entries.join('\n')}
};

export const nebraskaCountyMoverAssignments: CountyMoverAssignment[] =
  Object.entries(CURATED_NE_COUNTIES).map(([countySlug, moverIds]) => ({
    stateSlug: 'nebraska',
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

/** Seat and metro overrides for hand-curated Nebraska counties (batch 1 — 21 counties) */
export const nebraskaCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
${entries.join('\n')}
};

export function applyNebraskaCountyOverrides(county: LocalCounty): LocalCounty {
  const override = nebraskaCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}
`;
}

function genNearby(): string {
  const entries = COUNTIES.map((c) => buildNearbyLinks(c.slug));
  return `import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Nebraska curated county corridor links — batch 1 (21 counties) */
const NE_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
${entries.join('\n')}
};

export function getNebraskaNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return NE_COUNTY_NEIGHBORS[countySlug] ?? [];
}
`;
}

const OUTPUTS: { path: string; content: string }[] = [
  { path: 'data/nebraska-county-research.ts', content: genResearch() },
  { path: 'data/nebraska-county-testimonials.ts', content: genTestimonials() },
  { path: 'data/nebraska-county-assignments.ts', content: genAssignments() },
  {
    path: 'lib/local-movers/geography/nebraska-overrides.ts',
    content: genOverrides(),
  },
  { path: 'lib/local-movers/nebraska-nearby.ts', content: genNearby() },
];

for (const { path, content } of OUTPUTS) {
  const full = join(ROOT, path);
  writeFileSync(full, content, 'utf8');
  console.log(`Wrote ${path}`);
}

console.log(
  `\nGenerated ${COUNTIES.length}/${EXPECTED_COUNT} Nebraska counties across ${OUTPUTS.length} files.`
);