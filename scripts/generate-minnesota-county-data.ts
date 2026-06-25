/**
 * Generates Minnesota county curation files (batches 1–4 — 87 counties (full MN coverage)).
 * Run: npx tsx scripts/generate-minnesota-county-data.ts
 */
import { writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(__dirname, '..');
const EXPECTED_COUNT = 87;

type CostTier = 'metro' | 'secondary_metro' | 'regional_hub' | 'rural';

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
    | 'metro'
    | 'medical'
    | 'tourist'
    | 'university'
    | 'rural';
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
    studioRange: '$900–$1,900',
    familyRange: '$3,500–$8,500+',
    avgHourly: '$125–$195/hr for a 2-person crew',
  },
  secondary_metro: {
    studioRange: '$850–$1,700',
    familyRange: '$3,000–$7,000+',
    avgHourly: '$120–$185/hr for a 2-person crew',
  },
  regional_hub: {
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
  hennepin: 'Hennepin County, MN',
  ramsey: 'Ramsey County, MN',
  dakota: 'Dakota County, MN',
  anoka: 'Anoka County, MN',
  washington: 'Washington County, MN',
  'st-louis': 'St. Louis County, MN',
  olmsted: 'Olmsted County, MN',
  stearns: 'Stearns County, MN',
  scott: 'Scott County, MN',
  wright: 'Wright County, MN',
  carver: 'Carver County, MN',
  sherburne: 'Sherburne County, MN',
  'blue-earth': 'Blue Earth County, MN',
  rice: 'Rice County, MN',
  'crow-wing': 'Crow Wing County, MN',
  clay: 'Clay County, MN',
  'otter-tail': 'Otter Tail County, MN',
  chisago: 'Chisago County, MN',
  winona: 'Winona County, MN',
  goodhue: 'Goodhue County, MN',
  beltrami: 'Beltrami County, MN',
  itasca: 'Itasca County, MN',
  isanti: 'Isanti County, MN',
  kandiyohi: 'Kandiyohi County, MN',
  benton: 'Benton County, MN',
  mower: 'Mower County, MN',
  douglas: 'Douglas County, MN',
  steele: 'Steele County, MN',
  carlton: 'Carlton County, MN',
  mcleod: 'McLeod County, MN',
  becker: 'Becker County, MN',
  morrison: 'Morrison County, MN',
  nicollet: 'Nicollet County, MN',
  cass: 'Cass County, MN',
  pine: 'Pine County, MN',
  freeborn: 'Freeborn County, MN',
  polk: 'Polk County, MN',
  'le-sueur': 'Le Sueur County, MN',
  'mille-lacs': 'Mille Lacs County, MN',
  todd: 'Todd County, MN',
  lyon: 'Lyon County, MN',
  brown: 'Brown County, MN',
  meeker: 'Meeker County, MN',
  hubbard: 'Hubbard County, MN',
  nobles: 'Nobles County, MN',
  fillmore: 'Fillmore County, MN',
  wabasha: 'Wabasha County, MN',
  dodge: 'Dodge County, MN',
  martin: 'Martin County, MN',
  waseca: 'Waseca County, MN',
  houston: 'Houston County, MN',
  kanabec: 'Kanabec County, MN',
  aitkin: 'Aitkin County, MN',
  sibley: 'Sibley County, MN',
  redwood: 'Redwood County, MN',
  roseau: 'Roseau County, MN',
  wadena: 'Wadena County, MN',
  renville: 'Renville County, MN',
  faribault: 'Faribault County, MN',
  pennington: 'Pennington County, MN',
  chippewa: 'Chippewa County, MN',
  koochiching: 'Koochiching County, MN',
  watonwan: 'Watonwan County, MN',
  cottonwood: 'Cottonwood County, MN',
  pope: 'Pope County, MN',
  lake: 'Lake County, MN',
  jackson: 'Jackson County, MN',
  swift: 'Swift County, MN',
  stevens: 'Stevens County, MN',
  rock: 'Rock County, MN',
  'yellow-medicine': 'Yellow Medicine County, MN',
  pipestone: 'Pipestone County, MN',
  marshall: 'Marshall County, MN',
  clearwater: 'Clearwater County, MN',
  murray: 'Murray County, MN',
  'lac-qui-parle': 'Lac qui Parle County, MN',
  norman: 'Norman County, MN',
  wilkin: 'Wilkin County, MN',
  grant: 'Grant County, MN',
  lincoln: 'Lincoln County, MN',
  cook: 'Cook County, MN',
  mahnomen: 'Mahnomen County, MN',
  'big-stone': 'Big Stone County, MN',
  kittson: 'Kittson County, MN',
  'red-lake': 'Red Lake County, MN',
  'lake-of-the-woods': 'Lake of the Woods County, MN',
  traverse: 'Traverse County, MN',
};

const MN_NEIGHBORS: Record<string, string[]> = {
  hennepin: ['anoka', 'carver', 'dakota', 'ramsey', 'scott', 'sherburne', 'wright'],
  ramsey: ['anoka', 'dakota', 'hennepin', 'washington'],
  dakota: ['goodhue', 'hennepin', 'ramsey', 'rice', 'scott', 'washington'],
  anoka: ['chisago', 'hennepin', 'isanti', 'ramsey', 'sherburne', 'washington', 'wright'],
  washington: ['anoka', 'chisago', 'dakota', 'ramsey', 'pierce'],
  'st-louis': ['carlton', 'itasca', 'aitkin', 'koochiching', 'lake'],
  olmsted: ['goodhue', 'mower', 'winona', 'dodge', 'fillmore', 'wabasha'],
  stearns: ['benton', 'douglas', 'kandiyohi', 'morrison', 'sherburne', 'wright', 'meeker', 'pope', 'todd'],
  scott: ['carver', 'dakota', 'hennepin', 'rice', 'le-sueur', 'sibley'],
  wright: ['anoka', 'carver', 'hennepin', 'mcleod', 'sherburne', 'stearns', 'meeker'],
  carver: ['hennepin', 'mcleod', 'scott', 'wright', 'sibley'],
  sherburne: ['anoka', 'benton', 'hennepin', 'isanti', 'stearns', 'wright', 'mille-lacs'],
  'blue-earth': ['nicollet', 'brown', 'faribault', 'le-sueur', 'martin', 'waseca', 'watonwan'],
  rice: ['dakota', 'goodhue', 'scott', 'steele', 'dodge', 'le-sueur', 'waseca'],
  'crow-wing': ['cass', 'morrison', 'aitkin', 'mille-lacs'],
  clay: ['becker', 'otter-tail', 'norman', 'wilkin'],
  'otter-tail': ['becker', 'clay', 'douglas', 'grant', 'todd', 'wadena', 'wilkin'],
  chisago: ['anoka', 'isanti', 'pine', 'washington', 'kanabec'],
  winona: ['olmsted', 'fillmore', 'houston', 'wabasha'],
  goodhue: ['dakota', 'olmsted', 'rice', 'steele', 'dodge', 'wabasha'],
  beltrami: ['cass', 'itasca', 'clearwater', 'hubbard', 'koochiching', 'lake-of-the-woods', 'marshall', 'pennington', 'roseau'],
  itasca: ['beltrami', 'cass', 'st-louis', 'aitkin', 'koochiching'],
  isanti: ['anoka', 'chisago', 'sherburne', 'pine', 'kanabec', 'mille-lacs'],
  kandiyohi: ['stearns', 'chippewa', 'meeker', 'pope', 'renville', 'swift'],
  benton: ['morrison', 'sherburne', 'stearns', 'mille-lacs'],
  mower: ['olmsted', 'freeborn', 'steele', 'dodge', 'fillmore'],
  douglas: ['otter-tail', 'stearns', 'grant', 'pope', 'stevens', 'todd'],
  steele: ['goodhue', 'mower', 'rice', 'freeborn', 'dodge', 'waseca'],
  carlton: ['st-louis', 'pine', 'aitkin'],
  mcleod: ['carver', 'wright', 'meeker', 'renville', 'sibley'],
  becker: ['clay', 'otter-tail', 'clearwater', 'hubbard', 'mahnomen', 'norman', 'wadena'],
  morrison: ['benton', 'cass', 'crow-wing', 'stearns', 'mille-lacs', 'todd'],
  nicollet: ['blue-earth', 'le-sueur', 'renville', 'sibley', 'brown'],
  cass: ['beltrami', 'becker', 'crow-wing', 'itasca', 'morrison', 'hubbard', 'aitkin', 'todd', 'wadena'],
  pine: ['carlton', 'chisago', 'isanti', 'kanabec', 'aitkin'],
  freeborn: ['mower', 'steele', 'dodge', 'faribault', 'waseca'],
  polk: ['clearwater', 'mahnomen', 'marshall', 'norman', 'pennington', 'red-lake'],
  'le-sueur': ['blue-earth', 'nicollet', 'rice', 'scott', 'sibley', 'waseca', 'steele', 'faribault'],
  'mille-lacs': ['benton', 'crow-wing', 'isanti', 'kanabec', 'morrison', 'sherburne'],
  todd: ['cass', 'douglas', 'morrison', 'otter-tail', 'pope', 'stearns', 'wadena'],
  lyon: ['lincoln', 'murray', 'pipestone', 'redwood', 'yellow-medicine'],
  brown: ['blue-earth', 'cottonwood', 'nicollet', 'redwood', 'renville', 'sibley', 'watonwan'],
  meeker: ['kandiyohi', 'mcleod', 'pope', 'renville', 'stearns', 'wright'],
  hubbard: ['becker', 'beltrami', 'cass', 'clearwater', 'mahnomen', 'wadena'],
  nobles: ['cottonwood', 'jackson', 'murray', 'pipestone', 'rock'],
  fillmore: ['houston', 'mower', 'olmsted', 'winona'],
  wabasha: ['goodhue', 'olmsted', 'winona', 'pierce'],
  dodge: ['fillmore', 'goodhue', 'mower', 'olmsted', 'rice', 'steele'],
  martin: ['blue-earth', 'brown', 'faribault', 'freeborn', 'jackson', 'watonwan', 'waseca'],
  waseca: ['blue-earth', 'faribault', 'freeborn', 'le-sueur', 'rice', 'steele'],
  houston: ['fillmore', 'winona', 'la-crosse'],
  kanabec: ['aitkin', 'chisago', 'isanti', 'mille-lacs', 'morrison', 'pine'],
  aitkin: ['carlton', 'cass', 'crow-wing', 'itasca', 'kanabec', 'mille-lacs', 'pine', 'st-louis'],
  sibley: ['brown', 'le-sueur', 'mcleod', 'nicollet', 'renville'],
  redwood: ['brown', 'cottonwood', 'lyon', 'murray', 'nicollet', 'renville', 'yellow-medicine'],
  roseau: ['beltrami', 'kittson', 'marshall', 'pennington'],
  wadena: ['becker', 'cass', 'hubbard', 'otter-tail', 'todd'],
  renville: ['chippewa', 'kandiyohi', 'mcleod', 'meeker', 'nicollet', 'redwood', 'sibley', 'yellow-medicine'],
  faribault: ['blue-earth', 'freeborn', 'jackson', 'martin', 'watonwan', 'waseca'],
  pennington: ['beltrami', 'marshall', 'norman', 'polk', 'red-lake', 'roseau'],
  chippewa: ['big-stone', 'kandiyohi', 'lac-qui-parle', 'renville', 'swift', 'yellow-medicine'],
  koochiching: ['beltrami', 'itasca', 'lake-of-the-woods', 'st-louis'],
  watonwan: ['brown', 'blue-earth', 'cottonwood', 'faribault', 'jackson', 'martin', 'nicollet'],
  cottonwood: ['brown', 'jackson', 'murray', 'nobles', 'redwood', 'watonwan'],
  pope: ['douglas', 'grant', 'otter-tail', 'renville', 'stearns', 'stevens', 'swift'],
  lake: ['cook', 'lake-of-the-woods', 'st-louis'],
  jackson: ['cottonwood', 'faribault', 'martin', 'murray', 'nobles', 'watonwan'],
  swift: ['chippewa', 'kandiyohi', 'lac-qui-parle', 'pope', 'renville', 'stevens', 'yellow-medicine'],
  stevens: ['big-stone', 'douglas', 'grant', 'pope', 'swift', 'traverse'],
  rock: ['nobles', 'pipestone'],
  'yellow-medicine': ['chippewa', 'lac-qui-parle', 'lincoln', 'lyon', 'redwood', 'renville', 'swift'],
  pipestone: ['lyon', 'murray', 'nobles', 'rock'],
  marshall: ['beltrami', 'clearwater', 'kittson', 'pennington', 'polk', 'roseau'],
  clearwater: ['becker', 'beltrami', 'hubbard', 'marshall', 'mahnomen', 'norman', 'pennington', 'polk', 'red-lake'],
  murray: ['cottonwood', 'jackson', 'lyon', 'nobles', 'pipestone', 'rock'],
  'lac-qui-parle': ['big-stone', 'chippewa', 'renville', 'swift', 'yellow-medicine'],
  norman: ['becker', 'clay', 'clearwater', 'mahnomen', 'polk', 'wilkin'],
  wilkin: ['clay', 'norman', 'otter-tail'],
  grant: ['douglas', 'otter-tail', 'pope', 'stevens', 'traverse'],
  lincoln: ['lyon', 'murray', 'yellow-medicine'],
  cook: ['lake', 'lake-of-the-woods', 'st-louis'],
  mahnomen: ['becker', 'clearwater', 'norman', 'polk'],
  'big-stone': ['chippewa', 'lac-qui-parle', 'stevens', 'traverse'],
  kittson: ['marshall', 'pennington', 'roseau'],
  'red-lake': ['clearwater', 'pennington', 'polk'],
  'lake-of-the-woods': ['beltrami', 'cook', 'koochiching'],
  traverse: ['big-stone', 'grant', 'stevens'],
};

const CROSS_BORDER: Record<
  string,
  Array<{
    slug: string;
    stateSlug: string;
    name: string;
    seat: string;
    displayLabel: string;
  }>
> = {
  washington: [
    {
      slug: 'pierce',
      stateSlug: 'wisconsin',
      name: 'Pierce',
      seat: 'Ellsworth',
      displayLabel: 'Pierce County, WI',
    },
  ],
  'st-louis': [
    {
      slug: 'douglas',
      stateSlug: 'wisconsin',
      name: 'Douglas',
      seat: 'Superior',
      displayLabel: 'Douglas County, WI',
    },
  ],
  dakota: [
    {
      slug: 'pierce',
      stateSlug: 'wisconsin',
      name: 'Pierce',
      seat: 'Ellsworth',
      displayLabel: 'Pierce County, WI',
    },
  ],
  clay: [
    {
      slug: 'cass',
      stateSlug: 'north-dakota',
      name: 'Cass',
      seat: 'Fargo',
      displayLabel: 'Cass County, ND',
    },
  ],
  polk: [
    {
      slug: 'walsh',
      stateSlug: 'north-dakota',
      name: 'Walsh',
      seat: 'Grafton',
      displayLabel: 'Walsh County, ND',
    },
  ],
  goodhue: [
    {
      slug: 'pierce',
      stateSlug: 'wisconsin',
      name: 'Pierce',
      seat: 'Ellsworth',
      displayLabel: 'Pierce County, WI',
    },
  ],
  wabasha: [
    {
      slug: 'pierce',
      stateSlug: 'wisconsin',
      name: 'Pierce',
      seat: 'Ellsworth',
      displayLabel: 'Pierce County, WI',
    },
  ],
  houston: [
    {
      slug: 'la-crosse',
      stateSlug: 'wisconsin',
      name: 'La Crosse',
      seat: 'La Crosse',
      displayLabel: 'La Crosse County, WI',
    },
  ],
  pennington: [
    {
      slug: 'marshall',
      stateSlug: 'north-dakota',
      name: 'Marshall',
      seat: 'Warren',
      displayLabel: 'Marshall County, ND',
    },
  ],
  wilkin: [
    {
      slug: 'richland',
      stateSlug: 'north-dakota',
      name: 'Richland',
      seat: 'Wahpeton',
      displayLabel: 'Richland County, ND',
    },
  ],
  kittson: [
    {
      slug: 'pembina',
      stateSlug: 'north-dakota',
      name: 'Pembina',
      seat: 'Cavalier',
      displayLabel: 'Pembina County, ND',
    },
  ],
  traverse: [
    {
      slug: 'roberts',
      stateSlug: 'south-dakota',
      name: 'Roberts',
      seat: 'Sisseton',
      displayLabel: 'Roberts County, SD',
    },
  ],
  rock: [
    {
      slug: 'lyon',
      stateSlug: 'iowa',
      name: 'Lyon',
      seat: 'Rock Rapids',
      displayLabel: 'Lyon County, IA',
    },
  ],
};

const COUNTIES: CountyDef[] = [
  {
    slug: 'hennepin',
    name: 'Hennepin',
    seat: 'Minneapolis',
    city: 'Minneapolis',
    metro: 'hennepin-metro-mn',
    costTier: 'metro',
    citySlug: 'minneapolis',
    regional1: 'minneapolis-corridor',
    regional2: 'twin-cities-metro-west',
    topId: 'twomenandatruck-hennepin-mn',
    topName: 'Two Men and a Truck Minneapolis',
    regional1Name: 'Minneapolis Corridor Moving',
    regional2Name: 'Twin Cities Metro West Moving',
    franchise: true,
    marketNotes:
      'Hennepin County, MN is Minnesota’s most populous county centered on Minneapolis with strong urban, suburban, and residential demand across the Twin Cities metro west corridor.',
    costNote:
      'Hennepin County pricing reflects Minneapolis metro demand, I-94 and I-494 corridor traffic, high-value suburban homes, and competition among full-service agents serving Hennepin County communities.',
    tipVariant: 'metro',
  },
  {
    slug: 'ramsey',
    name: 'Ramsey',
    seat: 'Saint Paul',
    city: 'Saint Paul',
    metro: 'ramsey-metro-mn',
    costTier: 'metro',
    citySlug: 'saint-paul',
    regional1: 'saint-paul-corridor',
    regional2: 'mississippi-river-ramsey',
    topId: 'regional-ramsey-mn-movers',
    topName: 'Regional Saint Paul / Ramsey Providers',
    regional1Name: 'Saint Paul Corridor Moving',
    regional2Name: 'Mississippi River Ramsey Moving',
    marketNotes:
      'Ramsey County, MN is a major urban county centered on Saint Paul with strong governmental, university, and residential demand along the Mississippi River capital corridor.',
    costNote:
      'Ramsey County pricing reflects Saint Paul metro demand, capital-city and riverfront logistics, and competition among regional agents serving Ramsey County communities.',
    tipVariant: 'metro',
  },
  {
    slug: 'dakota',
    name: 'Dakota',
    seat: 'Hastings',
    city: 'Lakeville',
    metro: 'dakota-metro-mn',
    costTier: 'metro',
    citySlug: 'lakeville',
    regional1: 'lakeville-corridor',
    regional2: 'minnesota-river-dakota',
    topId: 'regional-dakota-mn-movers',
    topName: 'Regional Lakeville / Dakota Providers',
    regional1Name: 'Lakeville Corridor Moving',
    regional2Name: 'Minnesota River Dakota Moving',
    marketNotes:
      'Dakota County, MN is a rapidly growing suburban county south of the Twin Cities with strong residential demand across Lakeville, Hastings, and Minnesota River corridor communities.',
    costNote:
      'Dakota County pricing reflects south metro suburban growth, Minnesota River corridor travel distances, and competition among regional agents serving Dakota County communities.',
    tipVariant: 'metro',
  },
  {
    slug: 'anoka',
    name: 'Anoka',
    seat: 'Anoka',
    city: 'Anoka',
    metro: 'anoka-metro-mn',
    costTier: 'metro',
    citySlug: 'anoka',
    regional1: 'anoka-corridor',
    regional2: 'rum-river-valley',
    topId: 'regional-anoka-mn-movers',
    topName: 'Regional Anoka / Anoka County Providers',
    regional1Name: 'Anoka Corridor Moving',
    regional2Name: 'Rum River Valley Moving',
    marketNotes:
      'Anoka County, MN is a northern suburban county in the Twin Cities metro with strong residential demand across Anoka and Rum River north metro corridor communities.',
    costNote:
      'Anoka County pricing reflects north metro suburban demand, I-35W corridor traffic, and competition among regional agents serving Anoka County communities.',
    tipVariant: 'metro',
  },
  {
    slug: 'washington',
    name: 'Washington',
    seat: 'Stillwater',
    city: 'Stillwater',
    metro: 'washington-metro-mn',
    costTier: 'metro',
    citySlug: 'stillwater',
    regional1: 'stillwater-corridor',
    regional2: 'st-croix-river-valley',
    topId: 'regional-washington-mn-movers',
    topName: 'Regional Stillwater / Washington Providers',
    regional1Name: 'Stillwater Corridor Moving',
    regional2Name: 'St. Croix River Valley Moving',
    marketNotes:
      'Washington County, MN is an eastern suburban county in the Twin Cities metro with strong residential demand across Stillwater, Woodbury, and St. Croix River corridor communities — not to be confused with Washington State or other Washington counties.',
    costNote:
      'Washington County pricing reflects east metro suburban demand, St. Croix River bridge corridor traffic, and competition among regional agents serving Washington County, MN communities.',
    tipVariant: 'metro',
  },
  {
    slug: 'st-louis',
    name: 'St. Louis',
    seat: 'Duluth',
    city: 'Duluth',
    metro: 'st-louis-metro-mn',
    costTier: 'secondary_metro',
    citySlug: 'duluth',
    regional1: 'duluth-corridor',
    regional2: 'lake-superior-north',
    topId: 'regional-stlouis-mn-movers',
    topName: 'Regional Duluth / St. Louis Providers',
    regional1Name: 'Duluth Corridor Moving',
    regional2Name: 'Lake Superior North Moving',
    marketNotes:
      'St. Louis County, MN is a major northern Minnesota county centered on Duluth with strong urban, port, and residential demand along the Lake Superior north shore — not to be confused with St. Louis, Missouri.',
    costNote:
      'St. Louis County pricing reflects Duluth-area demand, Lake Superior corridor travel distances, harsh winters, and competition among regional agents serving St. Louis County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'olmsted',
    name: 'Olmsted',
    seat: 'Rochester',
    city: 'Rochester',
    metro: 'olmsted-metro-mn',
    costTier: 'regional_hub',
    citySlug: 'rochester',
    regional1: 'rochester-corridor',
    regional2: 'zumbro-river-valley',
    topId: 'regional-olmsted-mn-movers',
    topName: 'Regional Rochester / Olmsted Providers',
    regional1Name: 'Rochester Corridor Moving',
    regional2Name: 'Zumbro River Valley Moving',
    marketNotes:
      'Olmsted County, MN is a southeastern Minnesota county centered on Rochester with strong Mayo Clinic medical-sector and residential demand across Zumbro River corridor communities.',
    costNote:
      'Olmsted County pricing reflects Rochester medical-sector relocations, Zumbro River corridor travel distances, and competition among regional agents serving Olmsted County communities.',
    tipVariant: 'medical',
  },
  {
    slug: 'stearns',
    name: 'Stearns',
    seat: 'St. Cloud',
    city: 'St. Cloud',
    metro: 'stearns-metro-mn',
    costTier: 'regional_hub',
    citySlug: 'st-cloud',
    regional1: 'st-cloud-corridor',
    regional2: 'mississippi-river-stearns',
    topId: 'regional-stearns-mn-movers',
    topName: 'Regional St. Cloud / Stearns Providers',
    regional1Name: 'St. Cloud Corridor Moving',
    regional2Name: 'Mississippi River Stearns Moving',
    marketNotes:
      'Stearns County, MN is a central Minnesota county centered on St. Cloud with residential and university demand across Mississippi River corridor communities.',
    costNote:
      'Stearns County pricing reflects St. Cloud-area demand, Mississippi River corridor travel distances, and competition among regional agents serving Stearns County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'scott',
    name: 'Scott',
    seat: 'Shakopee',
    city: 'Shakopee',
    metro: 'scott-metro-mn',
    costTier: 'metro',
    citySlug: 'shakopee',
    regional1: 'shakopee-corridor',
    regional2: 'minnesota-river-scott',
    topId: 'regional-scott-mn-movers',
    topName: 'Regional Shakopee / Scott Providers',
    regional1Name: 'Shakopee Corridor Moving',
    regional2Name: 'Minnesota River Scott Moving',
    marketNotes:
      'Scott County, MN is a southern suburban county in the Twin Cities metro with strong residential demand across Shakopee and Minnesota River southwest corridor communities — not to be confused with Scott County, Iowa.',
    costNote:
      'Scott County pricing reflects southwest metro suburban demand, Minnesota River corridor traffic, and competition among regional agents serving Scott County, MN communities.',
    tipVariant: 'metro',
  },
  {
    slug: 'wright',
    name: 'Wright',
    seat: 'Buffalo',
    city: 'Buffalo',
    metro: 'wright-metro-mn',
    costTier: 'metro',
    citySlug: 'buffalo',
    regional1: 'buffalo-corridor',
    regional2: 'crow-river-valley',
    topId: 'regional-wright-mn-movers',
    topName: 'Regional Buffalo / Wright Providers',
    regional1Name: 'Buffalo Corridor Moving',
    regional2Name: 'Crow River Valley Moving',
    marketNotes:
      'Wright County, MN is a western suburban county in the Twin Cities metro with strong residential demand across Buffalo and Crow River west metro corridor communities — not to be confused with Wright County, Iowa.',
    costNote:
      'Wright County pricing reflects west metro suburban demand, Crow River corridor travel distances, and competition among regional agents serving Wright County, MN communities.',
    tipVariant: 'metro',
  },
  {
    slug: 'carver',
    name: 'Carver',
    seat: 'Chaska',
    city: 'Chaska',
    metro: 'carver-metro-mn',
    costTier: 'metro',
    citySlug: 'chaska',
    regional1: 'chaska-corridor',
    regional2: 'minnesota-river-carver',
    topId: 'regional-carver-mn-movers',
    topName: 'Regional Chaska / Carver Providers',
    regional1Name: 'Chaska Corridor Moving',
    regional2Name: 'Minnesota River Carver Moving',
    marketNotes:
      'Carver County, MN is a southwestern suburban county in the Twin Cities metro with strong residential demand across Chaska and Minnesota River southwest corridor communities.',
    costNote:
      'Carver County pricing reflects southwest metro suburban demand, Minnesota River corridor traffic, and competition among regional agents serving Carver County communities.',
    tipVariant: 'metro',
  },
  {
    slug: 'sherburne',
    name: 'Sherburne',
    seat: 'Elk River',
    city: 'Elk River',
    metro: 'sherburne-metro-mn',
    costTier: 'metro',
    citySlug: 'elk-river',
    regional1: 'elk-river-corridor',
    regional2: 'rum-river-sherburne',
    topId: 'regional-sherburne-mn-movers',
    topName: 'Regional Elk River / Sherburne Providers',
    regional1Name: 'Elk River Corridor Moving',
    regional2Name: 'Rum River Sherburne Moving',
    marketNotes:
      'Sherburne County, MN is a north metro suburban county centered on Elk River with strong residential demand across Rum River and I-94 northwest corridor communities.',
    costNote:
      'Sherburne County pricing reflects northwest metro suburban growth, Rum River corridor traffic, and competition among regional agents serving Sherburne County communities.',
    tipVariant: 'metro',
  },
  {
    slug: 'blue-earth',
    name: 'Blue Earth',
    seat: 'Mankato',
    city: 'Mankato',
    metro: 'blue-earth-metro-mn',
    costTier: 'regional_hub',
    citySlug: 'mankato',
    regional1: 'mankato-corridor',
    regional2: 'minnesota-river-blue-earth',
    topId: 'regional-blueearth-mn-movers',
    topName: 'Regional Mankato / Blue Earth Providers',
    regional1Name: 'Mankato Corridor Moving',
    regional2Name: 'Minnesota River Blue Earth Moving',
    marketNotes:
      'Blue Earth County, MN is a south-central Minnesota county centered on Mankato with strong Minnesota State University, student-housing, and Minnesota River valley residential demand.',
    costNote:
      'Blue Earth County pricing reflects Mankato regional-hub demand, university and healthcare relocations, Minnesota River valley corridor traffic, and competition among regional agents serving Blue Earth County communities.',
    tipVariant: 'university',
  },
  {
    slug: 'rice',
    name: 'Rice',
    seat: 'Faribault',
    city: 'Faribault',
    metro: 'rice-metro-mn',
    costTier: 'regional_hub',
    citySlug: 'faribault',
    regional1: 'faribault-corridor',
    regional2: 'cannon-river-rice',
    topId: 'regional-rice-mn-movers',
    topName: 'Regional Faribault / Rice Providers',
    regional1Name: 'Faribault Corridor Moving',
    regional2Name: 'Cannon River Rice Moving',
    marketNotes:
      'Rice County, MN is a south-central Minnesota county centered on Faribault with residential and manufacturing demand across Cannon River corridor communities — not to be confused with Rice County in other states.',
    costNote:
      'Rice County pricing reflects Faribault-area demand, Cannon River corridor travel distances, and competition among regional agents serving Rice County, MN communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'crow-wing',
    name: 'Crow Wing',
    seat: 'Brainerd',
    city: 'Brainerd',
    metro: 'crow-wing-metro-mn',
    costTier: 'secondary_metro',
    citySlug: 'brainerd',
    regional1: 'brainerd-corridor',
    regional2: 'gull-lake-crow-wing',
    topId: 'regional-crowwing-mn-movers',
    topName: 'Regional Brainerd / Crow Wing Providers',
    regional1Name: 'Brainerd Corridor Moving',
    regional2Name: 'Gull Lake Crow Wing Moving',
    marketNotes:
      'Crow Wing County, MN is a central lakes-country county centered on Brainerd with strong resort, vacation-rental, seasonal-property, and Gull Lake corridor residential demand.',
    costNote:
      'Crow Wing County pricing reflects Brainerd lakes secondary-metro demand, resort-season corridor traffic, vacation-rental turnover logistics, and competition among regional agents serving Crow Wing County communities.',
    tipVariant: 'tourist',
  },
  {
    slug: 'clay',
    name: 'Clay',
    seat: 'Moorhead',
    city: 'Moorhead',
    metro: 'clay-metro-mn',
    costTier: 'secondary_metro',
    citySlug: 'moorhead',
    regional1: 'moorhead-corridor',
    regional2: 'red-river-clay',
    topId: 'regional-clay-mn-movers',
    topName: 'Regional Moorhead / Clay Providers',
    regional1Name: 'Moorhead Corridor Moving',
    regional2Name: 'Red River Clay Moving',
    marketNotes:
      'Clay County, MN is a Red River Valley county centered on Moorhead with strong cross-border Fargo–Moorhead metro, university, and residential demand — not to be confused with Clay County in Iowa or Nebraska.',
    costNote:
      'Clay County pricing reflects Moorhead secondary-metro demand, Red River border-corridor traffic, cross-border North Dakota logistics, and competition among regional agents serving Clay County, MN communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'otter-tail',
    name: 'Otter Tail',
    seat: 'Fergus Falls',
    city: 'Fergus Falls',
    metro: 'otter-tail-metro-mn',
    costTier: 'regional_hub',
    citySlug: 'fergus-falls',
    regional1: 'fergus-falls-corridor',
    regional2: 'otter-tail-lakes',
    topId: 'regional-ottertail-mn-movers',
    topName: 'Regional Fergus Falls / Otter Tail Providers',
    regional1Name: 'Fergus Falls Corridor Moving',
    regional2Name: 'Otter Tail Lakes Moving',
    marketNotes:
      'Otter Tail County, MN is a west-central lakes-country county centered on Fergus Falls with strong resort, vacation-rental, and seasonal-property demand across Otter Tail lake chain corridor communities.',
    costNote:
      'Otter Tail County pricing reflects Fergus Falls regional-hub demand, lakes-country resort-season corridor traffic, vacation-rental turnover logistics, and competition among regional agents serving Otter Tail County communities.',
    tipVariant: 'tourist',
  },
  {
    slug: 'chisago',
    name: 'Chisago',
    seat: 'Center City',
    city: 'Center City',
    metro: 'chisago-metro-mn',
    costTier: 'metro',
    citySlug: 'center-city',
    regional1: 'center-city-corridor',
    regional2: 'st-croix-chisago',
    topId: 'regional-chisago-mn-movers',
    topName: 'Regional Center City / Chisago Providers',
    regional1Name: 'Center City Corridor Moving',
    regional2Name: 'St. Croix Chisago Moving',
    marketNotes:
      'Chisago County, MN is an east metro county centered on Center City with strong residential demand across St. Croix River and north metro fringe corridor communities.',
    costNote:
      'Chisago County pricing reflects east metro suburban demand, St. Croix River corridor travel distances, and competition among regional agents serving Chisago County communities.',
    tipVariant: 'metro',
  },
  {
    slug: 'winona',
    name: 'Winona',
    seat: 'Winona',
    city: 'Winona',
    metro: 'winona-metro-mn',
    costTier: 'regional_hub',
    citySlug: 'winona',
    regional1: 'winona-corridor',
    regional2: 'mississippi-bluff-winona',
    topId: 'regional-winona-mn-movers',
    topName: 'Regional Winona / Winona County Providers',
    regional1Name: 'Winona Corridor Moving',
    regional2Name: 'Mississippi Bluff Winona Moving',
    marketNotes:
      'Winona County, MN is a southeastern bluff-country county centered on Winona with strong Winona State University, student-housing, and Mississippi River corridor residential demand.',
    costNote:
      'Winona County pricing reflects Winona regional-hub demand, university and bluff-country relocations, Mississippi River corridor traffic, and competition among regional agents serving Winona County communities.',
    tipVariant: 'university',
  },
  {
    slug: 'goodhue',
    name: 'Goodhue',
    seat: 'Red Wing',
    city: 'Red Wing',
    metro: 'goodhue-metro-mn',
    costTier: 'regional_hub',
    citySlug: 'red-wing',
    regional1: 'red-wing-corridor',
    regional2: 'cannon-river-goodhue',
    topId: 'regional-goodhue-mn-movers',
    topName: 'Regional Red Wing / Goodhue Providers',
    regional1Name: 'Red Wing Corridor Moving',
    regional2Name: 'Cannon River Goodhue Moving',
    marketNotes:
      'Goodhue County, MN is a southeastern Minnesota county centered on Red Wing with residential and Mississippi River bluff corridor demand across Cannon River gateway communities.',
    costNote:
      'Goodhue County pricing reflects Red Wing-area demand, Cannon River and Mississippi bluff corridor travel distances, and competition among regional agents serving Goodhue County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'beltrami',
    name: 'Beltrami',
    seat: 'Bemidji',
    city: 'Bemidji',
    metro: 'beltrami-metro-mn',
    costTier: 'regional_hub',
    citySlug: 'bemidji',
    regional1: 'bemidji-corridor',
    regional2: 'lake-bemidji-beltrami',
    topId: 'regional-beltrami-mn-movers',
    topName: 'Regional Bemidji / Beltrami Providers',
    regional1Name: 'Bemidji Corridor Moving',
    regional2Name: 'Lake Bemidji Beltrami Moving',
    marketNotes:
      'Beltrami County, MN is a north-central Minnesota county centered on Bemidji with residential, tribal-nation gateway, and lake-country demand across upper Mississippi headwaters corridor communities.',
    costNote:
      'Beltrami County pricing reflects Bemidji regional-hub demand, remote northwoods travel distances, and competition among regional agents serving Beltrami County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'itasca',
    name: 'Itasca',
    seat: 'Grand Rapids',
    city: 'Grand Rapids',
    metro: 'itasca-metro-mn',
    costTier: 'regional_hub',
    citySlug: 'grand-rapids',
    regional1: 'grand-rapids-corridor',
    regional2: 'mississippi-headwaters-itasca',
    topId: 'regional-itasca-mn-movers',
    topName: 'Regional Grand Rapids / Itasca Providers',
    regional1Name: 'Grand Rapids Corridor Moving',
    regional2Name: 'Mississippi Headwaters Itasca Moving',
    marketNotes:
      'Itasca County, MN is a north-central Minnesota county centered on Grand Rapids with residential, forestry, and Mississippi headwaters corridor demand across lake-country gateway communities.',
    costNote:
      'Itasca County pricing reflects Grand Rapids regional-hub demand, remote northwoods travel distances, and competition among regional agents serving Itasca County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'isanti',
    name: 'Isanti',
    seat: 'Cambridge',
    city: 'Cambridge',
    metro: 'isanti-metro-mn',
    costTier: 'metro',
    citySlug: 'cambridge',
    regional1: 'cambridge-corridor',
    regional2: 'rum-river-isanti',
    topId: 'regional-isanti-mn-movers',
    topName: 'Regional Cambridge / Isanti Providers',
    regional1Name: 'Cambridge Corridor Moving',
    regional2Name: 'Rum River Isanti Moving',
    marketNotes:
      'Isanti County, MN is a north metro county centered on Cambridge with strong residential demand across Rum River and I-35 north corridor communities.',
    costNote:
      'Isanti County pricing reflects north metro suburban demand, Rum River corridor travel distances, and competition among regional agents serving Isanti County communities.',
    tipVariant: 'metro',
  },
  {
    slug: 'kandiyohi',
    name: 'Kandiyohi',
    seat: 'Willmar',
    city: 'Willmar',
    metro: 'kandiyohi-metro-mn',
    costTier: 'regional_hub',
    citySlug: 'willmar',
    regional1: 'willmar-corridor',
    regional2: 'glacial-lakes-kandiyohi',
    topId: 'regional-kandiyohi-mn-movers',
    topName: 'Regional Willmar / Kandiyohi Providers',
    regional1Name: 'Willmar Corridor Moving',
    regional2Name: 'Glacial Lakes Kandiyohi Moving',
    marketNotes:
      'Kandiyohi County, MN is a west-central Minnesota county centered on Willmar with residential, agricultural, and glacial-lakes corridor demand across regional hub communities.',
    costNote:
      'Kandiyohi County pricing reflects Willmar-area demand, glacial-lakes corridor travel distances, and competition among regional agents serving Kandiyohi County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'benton',
    name: 'Benton',
    seat: 'Foley',
    city: 'Foley',
    metro: 'benton-metro-mn',
    costTier: 'regional_hub',
    citySlug: 'foley',
    regional1: 'foley-corridor',
    regional2: 'sauk-river-benton',
    topId: 'regional-benton-mn-movers',
    topName: 'Regional Foley / Benton Providers',
    regional1Name: 'Foley Corridor Moving',
    regional2Name: 'Sauk River Benton Moving',
    marketNotes:
      'Benton County, MN is a central Minnesota county centered on Foley with residential demand across Sauk River and St. Cloud fringe corridor communities — not to be confused with Benton County in other states.',
    costNote:
      'Benton County pricing reflects Foley-area demand, Sauk River corridor travel distances, and competition among regional agents serving Benton County, MN communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'mower',
    name: 'Mower',
    seat: 'Austin',
    city: 'Austin',
    metro: 'mower-metro-mn',
    costTier: 'rural',
    citySlug: 'austin',
    regional1: 'austin-corridor',
    regional2: 'cedar-river-mower',
    topId: 'regional-mower-mn-movers',
    topName: 'Regional Austin / Mower Providers',
    regional1Name: 'Austin Corridor Moving',
    regional2Name: 'Cedar River Mower Moving',
    marketNotes:
      'Mower County, MN is a southeastern Minnesota county centered on Austin with rural residential, food-processing, and Cedar River corridor agricultural demand across regional hub communities.',
    costNote:
      'Mower County pricing reflects Austin-area rural demand, Cedar River corridor travel distances, agricultural property logistics, and competition among regional agents serving Mower County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'douglas',
    name: 'Douglas',
    seat: 'Alexandria',
    city: 'Alexandria',
    metro: 'douglas-metro-mn',
    costTier: 'secondary_metro',
    citySlug: 'alexandria',
    regional1: 'alexandria-corridor',
    regional2: 'chain-of-lakes-douglas',
    topId: 'regional-douglas-mn-movers',
    topName: 'Regional Alexandria / Douglas Providers',
    regional1Name: 'Alexandria Corridor Moving',
    regional2Name: 'Chain of Lakes Douglas Moving',
    marketNotes:
      'Douglas County, MN is a west-central lakes-country county centered on Alexandria with strong resort, vacation-rental, and chain-of-lakes corridor residential demand — not to be confused with Douglas County, Wisconsin.',
    costNote:
      'Douglas County pricing reflects Alexandria lakes secondary-metro demand, resort-season corridor traffic, vacation-rental turnover logistics, and competition among regional agents serving Douglas County, MN communities.',
    tipVariant: 'tourist',
  },
  {
    slug: 'steele',
    name: 'Steele',
    seat: 'Owatonna',
    city: 'Owatonna',
    metro: 'steele-metro-mn',
    costTier: 'regional_hub',
    citySlug: 'owatonna',
    regional1: 'owatonna-corridor',
    regional2: 'straight-river-steele',
    topId: 'regional-steele-mn-movers',
    topName: 'Regional Owatonna / Steele Providers',
    regional1Name: 'Owatonna Corridor Moving',
    regional2Name: 'Straight River Steele Moving',
    marketNotes:
      'Steele County, MN is a south-central Minnesota county centered on Owatonna with residential and manufacturing demand across Straight River corridor communities — not to be confused with Steele County in North Dakota.',
    costNote:
      'Steele County pricing reflects Owatonna-area demand, Straight River corridor travel distances, and competition among regional agents serving Steele County, MN communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'carlton',
    name: 'Carlton',
    seat: 'Carlton',
    city: 'Cloquet',
    metro: 'carlton-metro-mn',
    costTier: 'regional_hub',
    citySlug: 'cloquet',
    regional1: 'cloquet-corridor',
    regional2: 'st-louis-river-carlton',
    topId: 'regional-carlton-mn-movers',
    topName: 'Regional Cloquet / Carlton Providers',
    regional1Name: 'Cloquet Corridor Moving',
    regional2Name: 'St. Louis River Carlton Moving',
    marketNotes:
      'Carlton County, MN is a northeastern Minnesota county centered on Cloquet with residential and St. Louis River corridor demand across Duluth-adjacent northwoods gateway communities.',
    costNote:
      'Carlton County pricing reflects Cloquet-area demand, St. Louis River corridor travel distances, and competition among regional agents serving Carlton County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'mcleod',
    name: 'McLeod',
    seat: 'Glencoe',
    city: 'Hutchinson',
    metro: 'mcleod-metro-mn',
    costTier: 'regional_hub',
    citySlug: 'hutchinson',
    regional1: 'hutchinson-corridor',
    regional2: 'crow-river-mcleod',
    topId: 'regional-mcleod-mn-movers',
    topName: 'Regional Hutchinson / McLeod Providers',
    regional1Name: 'Hutchinson Corridor Moving',
    regional2Name: 'Crow River McLeod Moving',
    marketNotes:
      'McLeod County, MN is a west-metro fringe county centered on Hutchinson with residential and manufacturing demand across Crow River corridor communities.',
    costNote:
      'McLeod County pricing reflects Hutchinson-area demand, Crow River corridor travel distances, and competition among regional agents serving McLeod County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'becker',
    name: 'Becker',
    seat: 'Detroit Lakes',
    city: 'Detroit Lakes',
    metro: 'becker-metro-mn',
    costTier: 'secondary_metro',
    citySlug: 'detroit-lakes',
    regional1: 'detroit-lakes-corridor',
    regional2: 'glacier-lakes-becker',
    topId: 'regional-becker-mn-movers',
    topName: 'Regional Detroit Lakes / Becker Providers',
    regional1Name: 'Detroit Lakes Corridor Moving',
    regional2Name: 'Glacier Lakes Becker Moving',
    marketNotes:
      'Becker County, MN is a northwest lakes-country county centered on Detroit Lakes with strong resort, vacation-rental, and seasonal-property demand across glacier-lakes corridor communities.',
    costNote:
      'Becker County pricing reflects Detroit Lakes secondary-metro demand, resort-season corridor traffic, vacation-rental turnover logistics, and competition among regional agents serving Becker County communities.',
    tipVariant: 'tourist',
  },
  {
    slug: 'morrison',
    name: 'Morrison',
    seat: 'Little Falls',
    city: 'Little Falls',
    metro: 'morrison-metro-mn',
    costTier: 'regional_hub',
    citySlug: 'little-falls',
    regional1: 'little-falls-corridor',
    regional2: 'mississippi-morrison',
    topId: 'regional-morrison-mn-movers',
    topName: 'Regional Little Falls / Morrison Providers',
    regional1Name: 'Little Falls Corridor Moving',
    regional2Name: 'Mississippi Morrison Moving',
    marketNotes:
      'Morrison County, MN is a central Minnesota county centered on Little Falls with residential demand across Mississippi River and central lakes gateway corridor communities — not to be confused with Morrison County in other states.',
    costNote:
      'Morrison County pricing reflects Little Falls-area demand, Mississippi River corridor travel distances, and competition among regional agents serving Morrison County, MN communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'nicollet',
    name: 'Nicollet',
    seat: 'St. Peter',
    city: 'St. Peter',
    metro: 'nicollet-metro-mn',
    costTier: 'regional_hub',
    citySlug: 'st-peter',
    regional1: 'st-peter-corridor',
    regional2: 'minnesota-river-nicollet',
    topId: 'regional-nicollet-mn-movers',
    topName: 'Regional St. Peter / Nicollet Providers',
    regional1Name: 'St. Peter Corridor Moving',
    regional2Name: 'Minnesota River Nicollet Moving',
    marketNotes:
      'Nicollet County, MN is a south-central Minnesota county centered on St. Peter with residential and Gustavus Adolphus College corridor demand across Minnesota River valley communities.',
    costNote:
      'Nicollet County pricing reflects St. Peter-area demand, Minnesota River valley corridor travel distances, and competition among regional agents serving Nicollet County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'cass',
    name: 'Cass',
    seat: 'Walker',
    city: 'Walker',
    metro: 'cass-metro-mn',
    costTier: 'secondary_metro',
    citySlug: 'walker',
    regional1: 'walker-corridor',
    regional2: 'leech-lake-cass',
    topId: 'regional-cass-mn-movers',
    topName: 'Regional Walker / Cass Providers',
    regional1Name: 'Walker Corridor Moving',
    regional2Name: 'Leech Lake Cass Moving',
    marketNotes:
      'Cass County, MN is a central lakes-country county centered on Walker with strong Leech Lake resort, vacation-rental, and seasonal-property demand — not to be confused with Cass County in North Dakota.',
    costNote:
      'Cass County pricing reflects Walker lakes secondary-metro demand, resort-season corridor traffic, vacation-rental turnover logistics, and competition among regional agents serving Cass County, MN communities.',
    tipVariant: 'tourist',
  },
  {
    slug: 'pine',
    name: 'Pine',
    seat: 'Pine City',
    city: 'Pine City',
    metro: 'pine-metro-mn',
    costTier: 'regional_hub',
    citySlug: 'pine-city',
    regional1: 'pine-city-corridor',
    regional2: 'snake-river-pine',
    topId: 'regional-pine-mn-movers',
    topName: 'Regional Pine City / Pine Providers',
    regional1Name: 'Pine City Corridor Moving',
    regional2Name: 'Snake River Pine Moving',
    marketNotes:
      'Pine County, MN is an east-central Minnesota county centered on Pine City with residential demand across Snake River and north metro fringe corridor communities.',
    costNote:
      'Pine County pricing reflects Pine City-area demand, Snake River corridor travel distances, and competition among regional agents serving Pine County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'freeborn',
    name: 'Freeborn',
    seat: 'Albert Lea',
    city: 'Albert Lea',
    metro: 'freeborn-metro-mn',
    costTier: 'rural',
    citySlug: 'albert-lea',
    regional1: 'albert-lea-corridor',
    regional2: 'freeborn-lakes',
    topId: 'regional-freeborn-mn-movers',
    topName: 'Regional Albert Lea / Freeborn Providers',
    regional1Name: 'Albert Lea Corridor Moving',
    regional2Name: 'Freeborn Lakes Moving',
    marketNotes:
      'Freeborn County, MN is a southern Minnesota county centered on Albert Lea with rural residential, lake-country, and I-35 corridor agricultural demand across regional hub communities.',
    costNote:
      'Freeborn County pricing reflects Albert Lea-area rural demand, southern Minnesota corridor travel distances, agricultural property logistics, and competition among regional agents serving Freeborn County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'polk',
    name: 'Polk',
    seat: 'Crookston',
    city: 'Crookston',
    metro: 'polk-metro-mn',
    costTier: 'regional_hub',
    citySlug: 'crookston',
    regional1: 'crookston-corridor',
    regional2: 'red-river-valley-polk',
    topId: 'regional-polk-mn-movers',
    topName: 'Regional Crookston / Polk Providers',
    regional1Name: 'Crookston Corridor Moving',
    regional2Name: 'Red River Valley Polk Moving',
    marketNotes:
      'Polk County, MN is a northwest Red River Valley county centered on Crookston with agricultural, university, and cross-border North Dakota corridor residential demand — not to be confused with Polk County in Iowa, Nebraska, or other states.',
    costNote:
      'Polk County pricing reflects Crookston regional-hub demand, Red River Valley corridor travel distances, cross-border North Dakota logistics, and competition among regional agents serving Polk County, MN communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'le-sueur',
    name: 'Le Sueur',
    seat: 'Le Center',
    city: 'Le Center',
    metro: 'le-sueur-metro-mn',
    costTier: 'regional_hub',
    citySlug: 'le-center',
    regional1: 'le-center-corridor',
    regional2: 'le-sueur-river-valley',
    topId: 'regional-lesueur-mn-movers',
    topName: 'Regional Le Center / Le Sueur Providers',
    regional1Name: 'Le Center Corridor Moving',
    regional2Name: 'Le Sueur River Valley Moving',
    marketNotes:
      'Le Sueur County, MN is a south-central Minnesota county centered on Le Center with residential and Minnesota River valley corridor demand across regional hub communities — not to be confused with Le Sueur County in other states.',
    costNote:
      'Le Sueur County pricing reflects Le Center regional-hub demand, Minnesota River valley corridor travel distances, and competition among regional agents serving Le Sueur County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'mille-lacs',
    name: 'Mille Lacs',
    seat: 'Milaca',
    city: 'Milaca',
    metro: 'mille-lacs-metro-mn',
    costTier: 'secondary_metro',
    citySlug: 'milaca',
    regional1: 'milaca-corridor',
    regional2: 'mille-lacs-lakes',
    topId: 'regional-millelacs-mn-movers',
    topName: 'Regional Milaca / Mille Lacs Providers',
    regional1Name: 'Milaca Corridor Moving',
    regional2Name: 'Mille Lacs Lakes Moving',
    marketNotes:
      'Mille Lacs County, MN is a central lakes-country county centered on Milaca with strong Mille Lacs Lake resort, vacation-rental, and seasonal-property demand across north metro fringe corridor communities.',
    costNote:
      'Mille Lacs County pricing reflects Milaca lakes secondary-metro demand, resort-season corridor traffic, vacation-rental turnover logistics, and competition among regional agents serving Mille Lacs County communities.',
    tipVariant: 'tourist',
  },
  {
    slug: 'todd',
    name: 'Todd',
    seat: 'Long Prairie',
    city: 'Long Prairie',
    metro: 'todd-metro-mn',
    costTier: 'rural',
    citySlug: 'long-prairie',
    regional1: 'long-prairie-corridor',
    regional2: 'sauk-todd',
    topId: 'regional-todd-mn-movers',
    topName: 'Regional Long Prairie / Todd Providers',
    regional1Name: 'Long Prairie Corridor Moving',
    regional2Name: 'Sauk Todd Moving',
    marketNotes:
      'Todd County, MN is a central Minnesota county centered on Long Prairie with rural residential and Sauk River corridor agricultural demand across regional gateway communities — not to be confused with Todd County in other states.',
    costNote:
      'Todd County pricing reflects Long Prairie-area rural demand, Sauk River corridor travel distances, agricultural property logistics, and competition among regional agents serving Todd County, MN communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'lyon',
    name: 'Lyon',
    seat: 'Marshall',
    city: 'Marshall',
    metro: 'lyon-metro-mn',
    costTier: 'rural',
    citySlug: 'marshall',
    regional1: 'marshall-corridor',
    regional2: 'redwood-lyon',
    topId: 'regional-lyon-mn-movers',
    topName: 'Regional Marshall / Lyon Providers',
    regional1Name: 'Marshall Corridor Moving',
    regional2Name: 'Redwood Lyon Moving',
    marketNotes:
      'Lyon County, MN is a southwestern Minnesota county centered on Marshall with rural residential, agricultural, and Minnesota River fringe corridor demand — not to be confused with Lyon County in Iowa, Kentucky, or Nevada.',
    costNote:
      'Lyon County pricing reflects Marshall-area rural demand, southwestern Minnesota corridor travel distances, agricultural property logistics, and competition among regional agents serving Lyon County, MN communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'brown',
    name: 'Brown',
    seat: 'New Ulm',
    city: 'New Ulm',
    metro: 'brown-metro-mn',
    costTier: 'rural',
    citySlug: 'new-ulm',
    regional1: 'new-ulm-corridor',
    regional2: 'minnesota-river-brown',
    topId: 'regional-brown-mn-movers',
    topName: 'Regional New Ulm / Brown Providers',
    regional1Name: 'New Ulm Corridor Moving',
    regional2Name: 'Minnesota River Brown Moving',
    marketNotes:
      'Brown County, MN is a south-central Minnesota county centered on New Ulm with rural residential, heritage-tourism, and Minnesota River valley corridor agricultural demand — not to be confused with Brown County in other states.',
    costNote:
      'Brown County pricing reflects New Ulm-area rural demand, Minnesota River valley corridor travel distances, agricultural property logistics, and competition among regional agents serving Brown County, MN communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'meeker',
    name: 'Meeker',
    seat: 'Litchfield',
    city: 'Litchfield',
    metro: 'meeker-metro-mn',
    costTier: 'rural',
    citySlug: 'litchfield',
    regional1: 'litchfield-corridor',
    regional2: 'crow-river-meeker',
    topId: 'regional-meeker-mn-movers',
    topName: 'Regional Litchfield / Meeker Providers',
    regional1Name: 'Litchfield Corridor Moving',
    regional2Name: 'Crow River Meeker Moving',
    marketNotes:
      'Meeker County, MN is a west-metro fringe county centered on Litchfield with rural residential and Crow River corridor agricultural demand across regional gateway communities.',
    costNote:
      'Meeker County pricing reflects Litchfield-area rural demand, Crow River corridor travel distances, agricultural property logistics, and competition among regional agents serving Meeker County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'hubbard',
    name: 'Hubbard',
    seat: 'Park Rapids',
    city: 'Park Rapids',
    metro: 'hubbard-metro-mn',
    costTier: 'secondary_metro',
    citySlug: 'park-rapids',
    regional1: 'park-rapids-corridor',
    regional2: 'heartland-hubbard',
    topId: 'regional-hubbard-mn-movers',
    topName: 'Regional Park Rapids / Hubbard Providers',
    regional1Name: 'Park Rapids Corridor Moving',
    regional2Name: 'Heartland Hubbard Moving',
    marketNotes:
      'Hubbard County, MN is a north-central lakes-country county centered on Park Rapids with strong resort, vacation-rental, and Heartland corridor seasonal-property demand — not to be confused with Hubbard County in other states.',
    costNote:
      'Hubbard County pricing reflects Park Rapids lakes secondary-metro demand, resort-season corridor traffic, vacation-rental turnover logistics, and competition among regional agents serving Hubbard County communities.',
    tipVariant: 'tourist',
  },
  {
    slug: 'nobles',
    name: 'Nobles',
    seat: 'Worthington',
    city: 'Worthington',
    metro: 'nobles-metro-mn',
    costTier: 'rural',
    citySlug: 'worthington',
    regional1: 'worthington-corridor',
    regional2: 'okabena-nobles',
    topId: 'regional-nobles-mn-movers',
    topName: 'Regional Worthington / Nobles Providers',
    regional1Name: 'Worthington Corridor Moving',
    regional2Name: 'Okabena Nobles Moving',
    marketNotes:
      'Nobles County, MN is a southwestern Minnesota county centered on Worthington with rural residential, food-processing, and Okabena Lake corridor agricultural demand across prairie gateway communities.',
    costNote:
      'Nobles County pricing reflects Worthington-area rural demand, southwestern Minnesota corridor travel distances, agricultural property logistics, and competition among regional agents serving Nobles County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'fillmore',
    name: 'Fillmore',
    seat: 'Preston',
    city: 'Preston',
    metro: 'fillmore-metro-mn',
    costTier: 'rural',
    citySlug: 'preston',
    regional1: 'preston-corridor',
    regional2: 'root-river-fillmore',
    topId: 'regional-fillmore-mn-movers',
    topName: 'Regional Preston / Fillmore Providers',
    regional1Name: 'Preston Corridor Moving',
    regional2Name: 'Root River Fillmore Moving',
    marketNotes:
      'Fillmore County, MN is a southeastern Minnesota county centered on Preston with rural residential and Root River bluff-country corridor demand across driftless gateway communities.',
    costNote:
      'Fillmore County pricing reflects Preston-area rural demand, Root River bluff corridor travel distances, agricultural property logistics, and competition among regional agents serving Fillmore County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'wabasha',
    name: 'Wabasha',
    seat: 'Wabasha',
    city: 'Wabasha',
    metro: 'wabasha-metro-mn',
    costTier: 'rural',
    citySlug: 'wabasha',
    regional1: 'wabasha-corridor',
    regional2: 'mississippi-wabasha',
    topId: 'regional-wabasha-mn-movers',
    topName: 'Regional Wabasha / Wabasha County Providers',
    regional1Name: 'Wabasha Corridor Moving',
    regional2Name: 'Mississippi Wabasha Moving',
    marketNotes:
      'Wabasha County, MN is a southeastern Mississippi River bluff-country county centered on Wabasha with rural residential and cross-border Wisconsin corridor demand along the Great River Road gateway.',
    costNote:
      'Wabasha County pricing reflects Wabasha-area rural demand, Mississippi River bluff corridor travel distances, cross-border Wisconsin logistics, and competition among regional agents serving Wabasha County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'dodge',
    name: 'Dodge',
    seat: 'Mantorville',
    city: 'Mantorville',
    metro: 'dodge-metro-mn',
    costTier: 'rural',
    citySlug: 'mantorville',
    regional1: 'mantorville-corridor',
    regional2: 'zumbro-dodge',
    topId: 'regional-dodge-mn-movers',
    topName: 'Regional Mantorville / Dodge Providers',
    regional1Name: 'Mantorville Corridor Moving',
    regional2Name: 'Zumbro Dodge Moving',
    marketNotes:
      'Dodge County, MN is a southeastern Minnesota county centered on Mantorville with rural residential and Zumbro River corridor agricultural demand — not to be confused with Dodge County in Wisconsin or other states.',
    costNote:
      'Dodge County pricing reflects Mantorville-area rural demand, Zumbro River corridor travel distances, agricultural property logistics, and competition among regional agents serving Dodge County, MN communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'martin',
    name: 'Martin',
    seat: 'Fairmont',
    city: 'Fairmont',
    metro: 'martin-metro-mn',
    costTier: 'rural',
    citySlug: 'fairmont',
    regional1: 'fairmont-corridor',
    regional2: 'east-chain-martin',
    topId: 'regional-martin-mn-movers',
    topName: 'Regional Fairmont / Martin Providers',
    regional1Name: 'Fairmont Corridor Moving',
    regional2Name: 'East Chain Martin Moving',
    marketNotes:
      'Martin County, MN is a southern Minnesota county centered on Fairmont with rural residential, lake-country, and East Chain of Lakes corridor agricultural demand — not to be confused with Martin County in other states.',
    costNote:
      'Martin County pricing reflects Fairmont-area rural demand, southern Minnesota lakes corridor travel distances, agricultural property logistics, and competition among regional agents serving Martin County, MN communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'waseca',
    name: 'Waseca',
    seat: 'Waseca',
    city: 'Waseca',
    metro: 'waseca-metro-mn',
    costTier: 'rural',
    citySlug: 'waseca',
    regional1: 'waseca-corridor',
    regional2: 'straight-river-waseca',
    topId: 'regional-waseca-mn-movers',
    topName: 'Regional Waseca / Waseca County Providers',
    regional1Name: 'Waseca Corridor Moving',
    regional2Name: 'Straight River Waseca Moving',
    marketNotes:
      'Waseca County, MN is a south-central Minnesota county centered on Waseca with rural residential and Straight River corridor agricultural demand across regional gateway communities.',
    costNote:
      'Waseca County pricing reflects Waseca-area rural demand, Straight River corridor travel distances, agricultural property logistics, and competition among regional agents serving Waseca County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'houston',
    name: 'Houston',
    seat: 'Caledonia',
    city: 'Caledonia',
    metro: 'houston-metro-mn',
    costTier: 'rural',
    citySlug: 'caledonia',
    regional1: 'caledonia-corridor',
    regional2: 'root-river-houston',
    topId: 'regional-houston-mn-movers',
    topName: 'Regional Caledonia / Houston Providers',
    regional1Name: 'Caledonia Corridor Moving',
    regional2Name: 'Root River Houston Moving',
    marketNotes:
      'Houston County, MN is a southeastern Minnesota county centered on Caledonia with rural residential and Root River bluff-country corridor demand along the Mississippi River gateway — not to be confused with Houston, Texas.',
    costNote:
      'Houston County pricing reflects Caledonia-area rural demand, Root River bluff corridor travel distances, cross-border Wisconsin logistics, and competition among regional agents serving Houston County, MN communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'kanabec',
    name: 'Kanabec',
    seat: 'Mora',
    city: 'Mora',
    metro: 'kanabec-metro-mn',
    costTier: 'rural',
    citySlug: 'mora',
    regional1: 'mora-corridor',
    regional2: 'snake-river-kanabec',
    topId: 'regional-kanabec-mn-movers',
    topName: 'Regional Mora / Kanabec Providers',
    regional1Name: 'Mora Corridor Moving',
    regional2Name: 'Snake River Kanabec Moving',
    marketNotes:
      'Kanabec County, MN is an east-central Minnesota county centered on Mora with rural residential and Snake River northwoods corridor demand across regional gateway communities.',
    costNote:
      'Kanabec County pricing reflects Mora-area rural demand, Snake River corridor travel distances, limited crew availability, and competition among regional agents serving Kanabec County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'aitkin',
    name: 'Aitkin',
    seat: 'Aitkin',
    city: 'Aitkin',
    metro: 'aitkin-metro-mn',
    costTier: 'secondary_metro',
    citySlug: 'aitkin',
    regional1: 'aitkin-corridor',
    regional2: 'mississippi-aitkin',
    topId: 'regional-aitkin-mn-movers',
    topName: 'Regional Aitkin / Aitkin County Providers',
    regional1Name: 'Aitkin Corridor Moving',
    regional2Name: 'Mississippi Aitkin Moving',
    marketNotes:
      'Aitkin County, MN is a north-central lakes-country county centered on Aitkin with strong Mississippi River resort, vacation-rental, and seasonal-property demand across northwoods gateway corridor communities.',
    costNote:
      'Aitkin County pricing reflects Aitkin lakes secondary-metro demand, resort-season corridor traffic, vacation-rental turnover logistics, and competition among regional agents serving Aitkin County communities.',
    tipVariant: 'tourist',
  },
  {
    slug: 'sibley',
    name: 'Sibley',
    seat: 'Gaylord',
    city: 'Gaylord',
    metro: 'sibley-metro-mn',
    costTier: 'rural',
    citySlug: 'gaylord',
    regional1: 'gaylord-corridor',
    regional2: 'minnesota-river-sibley',
    topId: 'regional-sibley-mn-movers',
    topName: 'Regional Gaylord / Sibley Providers',
    regional1Name: 'Gaylord Corridor Moving',
    regional2Name: 'Minnesota River Sibley Moving',
    marketNotes:
      'Sibley County, MN is a south-central Minnesota county centered on Gaylord with rural residential and Minnesota River valley corridor agricultural demand — not to be confused with Sibley County in other states.',
    costNote:
      'Sibley County pricing reflects Gaylord-area rural demand, Minnesota River valley corridor travel distances, agricultural property logistics, and competition among regional agents serving Sibley County, MN communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'redwood',
    name: 'Redwood',
    seat: 'Redwood Falls',
    city: 'Redwood Falls',
    metro: 'redwood-metro-mn',
    costTier: 'rural',
    citySlug: 'redwood-falls',
    regional1: 'redwood-falls-corridor',
    regional2: 'minnesota-river-redwood',
    topId: 'regional-redwood-mn-movers',
    topName: 'Regional Redwood Falls / Redwood Providers',
    regional1Name: 'Redwood Falls Corridor Moving',
    regional2Name: 'Minnesota River Redwood Moving',
    marketNotes:
      'Redwood County, MN is a southwestern Minnesota county centered on Redwood Falls with rural residential and Minnesota River valley corridor agricultural demand across prairie gateway communities.',
    costNote:
      'Redwood County pricing reflects Redwood Falls-area rural demand, Minnesota River valley corridor travel distances, agricultural property logistics, and competition among regional agents serving Redwood County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'roseau',
    name: 'Roseau',
    seat: 'Roseau',
    city: 'Roseau',
    metro: 'roseau-metro-mn',
    costTier: 'rural',
    citySlug: 'roseau',
    regional1: 'roseau-corridor',
    regional2: 'roseau-river-valley',
    topId: 'regional-roseau-mn-movers',
    topName: 'Regional Roseau / Roseau County Providers',
    regional1Name: 'Roseau Corridor Moving',
    regional2Name: 'Roseau River Valley Moving',
    marketNotes:
      'Roseau County, MN is a far-northwestern Minnesota county centered on Roseau with rural residential, snowmobile-country, and Roseau River valley corridor agricultural demand along the Manitoba border gateway.',
    costNote:
      'Roseau County pricing reflects Roseau-area rural demand, remote northwest corridor travel distances, harsh winters, and competition among regional agents serving Roseau County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'wadena',
    name: 'Wadena',
    seat: 'Wadena',
    city: 'Wadena',
    metro: 'wadena-metro-mn',
    costTier: 'rural',
    citySlug: 'wadena',
    regional1: 'wadena-corridor',
    regional2: 'crow-wing-wadena',
    topId: 'regional-wadena-mn-movers',
    topName: 'Regional Wadena / Wadena County Providers',
    regional1Name: 'Wadena Corridor Moving',
    regional2Name: 'Crow Wing Wadena Moving',
    marketNotes:
      'Wadena County, MN is a central Minnesota county centered on Wadena with rural residential and Crow Wing lakes gateway corridor demand across northwoods fringe communities.',
    costNote:
      'Wadena County pricing reflects Wadena-area rural demand, central lakes gateway corridor travel distances, limited crew availability, and competition among regional agents serving Wadena County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'renville',
    name: 'Renville',
    seat: 'Olivia',
    city: 'Olivia',
    metro: 'renville-metro-mn',
    costTier: 'rural',
    citySlug: 'olivia',
    regional1: 'olivia-corridor',
    regional2: 'hawk-creek-renville',
    topId: 'regional-renville-mn-movers',
    topName: 'Regional Olivia / Renville Providers',
    regional1Name: 'Olivia Corridor Moving',
    regional2Name: 'Hawk Creek Renville Moving',
    marketNotes:
      'Renville County, MN is a southwestern Minnesota county centered on Olivia with rural residential and Hawk Creek Minnesota River fringe corridor agricultural demand — not to be confused with Renville County in North Dakota.',
    costNote:
      'Renville County pricing reflects Olivia-area rural demand, Hawk Creek corridor travel distances, agricultural property logistics, and competition among regional agents serving Renville County, MN communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'faribault',
    name: 'Faribault',
    seat: 'Blue Earth',
    city: 'Blue Earth',
    metro: 'faribault-metro-mn',
    costTier: 'rural',
    citySlug: 'blue-earth',
    regional1: 'blue-earth-corridor',
    regional2: 'east-chain-faribault',
    topId: 'regional-faribault-mn-movers',
    topName: 'Regional Blue Earth / Faribault Providers',
    regional1Name: 'Blue Earth Corridor Moving',
    regional2Name: 'East Chain Faribault Moving',
    marketNotes:
      'Faribault County, MN is a southern Minnesota county centered on Blue Earth with rural residential and East Chain of Lakes corridor agricultural demand — not to be confused with Rice County’s Faribault city or Faribault County in other states.',
    costNote:
      'Faribault County pricing reflects Blue Earth-area rural demand, southern Minnesota lakes corridor travel distances, agricultural property logistics, and competition among regional agents serving Faribault County, MN communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'pennington',
    name: 'Pennington',
    seat: 'Thief River Falls',
    city: 'Thief River Falls',
    metro: 'pennington-metro-mn',
    costTier: 'rural',
    citySlug: 'thief-river-falls',
    regional1: 'thief-river-falls-corridor',
    regional2: 'red-lake-pennington',
    topId: 'regional-pennington-mn-movers',
    topName: 'Regional Thief River Falls / Pennington Providers',
    regional1Name: 'Thief River Falls Corridor Moving',
    regional2Name: 'Red Lake Pennington Moving',
    marketNotes:
      'Pennington County, MN is a northwest Minnesota county centered on Thief River Falls with rural residential, agribusiness, and Red Lake River valley corridor demand along the North Dakota border gateway.',
    costNote:
      'Pennington County pricing reflects Thief River Falls-area rural demand, northwest corridor travel distances, cross-border North Dakota logistics, and competition among regional agents serving Pennington County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'chippewa',
    name: 'Chippewa',
    seat: 'Montevideo',
    city: 'Montevideo',
    metro: 'chippewa-metro-mn',
    costTier: 'rural',
    citySlug: 'montevideo',
    regional1: 'montevideo-corridor',
    regional2: 'minnesota-river-chippewa',
    topId: 'regional-chippewa-mn-movers',
    topName: 'Regional Montevideo / Chippewa Providers',
    regional1Name: 'Montevideo Corridor Moving',
    regional2Name: 'Minnesota River Chippewa Moving',
    marketNotes:
      'Chippewa County, MN is a southwestern Minnesota county centered on Montevideo with rural residential and Minnesota River valley corridor agricultural demand — not to be confused with Chippewa County in Michigan or Wisconsin.',
    costNote:
      'Chippewa County pricing reflects Montevideo-area rural demand, Minnesota River valley corridor travel distances, agricultural property logistics, and competition among regional agents serving Chippewa County, MN communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'koochiching',
    name: 'Koochiching',
    seat: 'International Falls',
    city: 'International Falls',
    metro: 'koochiching-metro-mn',
    costTier: 'regional_hub',
    citySlug: 'international-falls',
    regional1: 'international-falls-corridor',
    regional2: 'rainy-river-koochiching',
    topId: 'regional-koochiching-mn-movers',
    topName: 'Regional International Falls / Koochiching Providers',
    regional1Name: 'International Falls Corridor Moving',
    regional2Name: 'Rainy River Koochiching Moving',
    marketNotes:
      'Koochiching County, MN is a far-northern Minnesota county centered on International Falls with residential, border-gateway, and Rainy River corridor demand along the Ontario and Lake of the Woods gateway.',
    costNote:
      'Koochiching County pricing reflects International Falls regional-hub demand, remote northwoods travel distances, harsh winters, border-corridor logistics, and competition among regional agents serving Koochiching County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'watonwan',
    name: 'Watonwan',
    seat: 'St. James',
    city: 'St. James',
    metro: 'watonwan-metro-mn',
    costTier: 'rural',
    citySlug: 'st-james',
    regional1: 'st-james-corridor',
    regional2: 'watonwan-river-valley',
    topId: 'regional-watonwan-mn-movers',
    topName: 'Regional St. James / Watonwan Providers',
    regional1Name: 'St. James Corridor Moving',
    regional2Name: 'Watonwan River Valley Moving',
    marketNotes:
      'Watonwan County, MN is a south-central Minnesota county centered on St. James with rural residential and Watonwan River valley corridor agricultural demand across prairie gateway communities.',
    costNote:
      'Watonwan County pricing reflects St. James-area rural demand, Watonwan River valley corridor travel distances, agricultural property logistics, and competition among regional agents serving Watonwan County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'cottonwood',
    name: 'Cottonwood',
    seat: 'Windom',
    city: 'Windom',
    metro: 'cottonwood-metro-mn',
    costTier: 'rural',
    citySlug: 'windom',
    regional1: 'windom-corridor',
    regional2: 'des-moines-cottonwood',
    topId: 'regional-cottonwood-mn-movers',
    topName: 'Regional Windom / Cottonwood Providers',
    regional1Name: 'Windom Corridor Moving',
    regional2Name: 'Des Moines Cottonwood Moving',
    marketNotes:
      'Cottonwood County, MN is a southwestern Minnesota county centered on Windom with rural residential and Des Moines River valley corridor agricultural demand across prairie gateway communities — not to be confused with Cottonwood County in other states.',
    costNote:
      'Cottonwood County pricing reflects Windom-area rural demand, Des Moines River valley corridor travel distances, agricultural property logistics, and competition among regional agents serving Cottonwood County, MN communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'pope',
    name: 'Pope',
    seat: 'Glenwood',
    city: 'Glenwood',
    metro: 'pope-metro-mn',
    costTier: 'secondary_metro',
    citySlug: 'glenwood',
    regional1: 'glenwood-corridor',
    regional2: 'minnewaska-pope',
    topId: 'regional-pope-mn-movers',
    topName: 'Regional Glenwood / Pope Providers',
    regional1Name: 'Glenwood Corridor Moving',
    regional2Name: 'Minnewaska Pope Moving',
    marketNotes:
      'Pope County, MN is a west-central lakes-country county centered on Glenwood with strong Minnewaska Lake resort, vacation-rental, and seasonal-property demand across Alexandria-adjacent corridor communities — not to be confused with Pope County in other states.',
    costNote:
      'Pope County pricing reflects Glenwood lakes secondary-metro demand, Minnewaska resort-season corridor traffic, vacation-rental turnover logistics, and competition among regional agents serving Pope County communities.',
    tipVariant: 'tourist',
  },
  {
    slug: 'lake',
    name: 'Lake',
    seat: 'Two Harbors',
    city: 'Two Harbors',
    metro: 'lake-metro-mn',
    costTier: 'secondary_metro',
    citySlug: 'two-harbors',
    regional1: 'two-harbors-corridor',
    regional2: 'north-shore-lake',
    topId: 'regional-lake-mn-movers',
    topName: 'Regional Two Harbors / Lake Providers',
    regional1Name: 'Two Harbors Corridor Moving',
    regional2Name: 'North Shore Lake Moving',
    marketNotes:
      'Lake County, MN is a northeastern Minnesota county centered on Two Harbors with strong North Shore resort, vacation-rental, and seasonal-property demand along the Lake Superior gateway — not to be confused with Lake County in California, Florida, Illinois, or other states.',
    costNote:
      'Lake County pricing reflects Two Harbors lakes secondary-metro demand, North Shore resort-season corridor traffic, vacation-rental turnover logistics, harsh winters, and competition among regional agents serving Lake County, MN communities.',
    tipVariant: 'tourist',
  },
  {
    slug: 'jackson',
    name: 'Jackson',
    seat: 'Jackson',
    city: 'Jackson',
    metro: 'jackson-metro-mn',
    costTier: 'rural',
    citySlug: 'jackson',
    regional1: 'jackson-corridor',
    regional2: 'des-moines-jackson',
    topId: 'regional-jackson-mn-movers',
    topName: 'Regional Jackson / Jackson County Providers',
    regional1Name: 'Jackson Corridor Moving',
    regional2Name: 'Des Moines Jackson Moving',
    marketNotes:
      'Jackson County, MN is a southwestern Minnesota county centered on Jackson with rural residential and Des Moines River valley corridor agricultural demand across prairie gateway communities — not to be confused with Jackson County in Mississippi or other states.',
    costNote:
      'Jackson County pricing reflects Jackson-area rural demand, Des Moines River valley corridor travel distances, agricultural property logistics, and competition among regional agents serving Jackson County, MN communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'swift',
    name: 'Swift',
    seat: 'Benson',
    city: 'Benson',
    metro: 'swift-metro-mn',
    costTier: 'rural',
    citySlug: 'benson',
    regional1: 'benson-corridor',
    regional2: 'chippewa-swift',
    topId: 'regional-swift-mn-movers',
    topName: 'Regional Benson / Swift Providers',
    regional1Name: 'Benson Corridor Moving',
    regional2Name: 'Chippewa Swift Moving',
    marketNotes:
      'Swift County, MN is a west-central Minnesota county centered on Benson with rural residential and Chippewa River valley corridor agricultural demand across prairie gateway communities — not to be confused with Swift County in other states.',
    costNote:
      'Swift County pricing reflects Benson-area rural demand, Chippewa River valley corridor travel distances, agricultural property logistics, and competition among regional agents serving Swift County, MN communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'stevens',
    name: 'Stevens',
    seat: 'Morris',
    city: 'Morris',
    metro: 'stevens-metro-mn',
    costTier: 'rural',
    citySlug: 'morris',
    regional1: 'morris-corridor',
    regional2: 'stevens-river-valley',
    topId: 'regional-stevens-mn-movers',
    topName: 'Regional Morris / Stevens Providers',
    regional1Name: 'Morris Corridor Moving',
    regional2Name: 'Stevens River Valley Moving',
    marketNotes:
      'Stevens County, MN is a west-central Minnesota county centered on Morris with rural residential, University of Minnesota Morris corridor, and Stevens River valley agricultural demand — not to be confused with Stevens County in Kansas or Washington.',
    costNote:
      'Stevens County pricing reflects Morris-area rural demand, Stevens River valley corridor travel distances, university and agricultural property logistics, and competition among regional agents serving Stevens County, MN communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'rock',
    name: 'Rock',
    seat: 'Luverne',
    city: 'Luverne',
    metro: 'rock-metro-mn',
    costTier: 'rural',
    citySlug: 'luverne',
    regional1: 'luverne-corridor',
    regional2: 'rock-river-valley',
    topId: 'regional-rock-mn-movers',
    topName: 'Regional Luverne / Rock Providers',
    regional1Name: 'Luverne Corridor Moving',
    regional2Name: 'Rock River Valley Moving',
    marketNotes:
      'Rock County, MN is Minnesota’s southwesternmost county centered on Luverne with rural residential and Rock River valley corridor agricultural demand along the Iowa border gateway — not to be confused with Rock County in Nebraska or Wisconsin.',
    costNote:
      'Rock County pricing reflects Luverne-area rural demand, Rock River valley corridor travel distances, cross-border Iowa logistics, agricultural property logistics, and competition among regional agents serving Rock County, MN communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'yellow-medicine',
    name: 'Yellow Medicine',
    seat: 'Granite Falls',
    city: 'Granite Falls',
    metro: 'yellow-medicine-metro-mn',
    costTier: 'rural',
    citySlug: 'granite-falls',
    regional1: 'granite-falls-corridor',
    regional2: 'minnesota-river-yellow-medicine',
    topId: 'regional-yellowmedicine-mn-movers',
    topName: 'Regional Granite Falls / Yellow Medicine Providers',
    regional1Name: 'Granite Falls Corridor Moving',
    regional2Name: 'Minnesota River Yellow Medicine Moving',
    marketNotes:
      'Yellow Medicine County, MN is a southwestern Minnesota county centered on Granite Falls with rural residential and Minnesota River valley corridor agricultural demand across prairie gateway communities.',
    costNote:
      'Yellow Medicine County pricing reflects Granite Falls-area rural demand, Minnesota River valley corridor travel distances, agricultural property logistics, and competition among regional agents serving Yellow Medicine County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'pipestone',
    name: 'Pipestone',
    seat: 'Pipestone',
    city: 'Pipestone',
    metro: 'pipestone-metro-mn',
    costTier: 'rural',
    citySlug: 'pipestone',
    regional1: 'pipestone-corridor',
    regional2: 'pipestone-quarry-valley',
    topId: 'regional-pipestone-mn-movers',
    topName: 'Regional Pipestone / Pipestone County Providers',
    regional1Name: 'Pipestone Corridor Moving',
    regional2Name: 'Pipestone Quarry Valley Moving',
    marketNotes:
      'Pipestone County, MN is a southwestern Minnesota county centered on Pipestone with rural residential, heritage-tourism, and quarry-valley corridor agricultural demand — not to be confused with Pipestone in other states.',
    costNote:
      'Pipestone County pricing reflects Pipestone-area rural demand, quarry-valley corridor travel distances, agricultural property logistics, and competition among regional agents serving Pipestone County, MN communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'marshall',
    name: 'Marshall',
    seat: 'Warren',
    city: 'Warren',
    metro: 'marshall-metro-mn',
    costTier: 'rural',
    citySlug: 'warren',
    regional1: 'warren-corridor',
    regional2: 'red-river-marshall',
    topId: 'regional-marshall-mn-movers',
    topName: 'Regional Warren / Marshall Providers',
    regional1Name: 'Warren Corridor Moving',
    regional2Name: 'Red River Marshall Moving',
    marketNotes:
      'Marshall County, MN is a northwest Red River Valley county centered on Warren with rural residential and Red River border-corridor agricultural demand — not to be confused with Lyon County’s Marshall city or Marshall County in North Dakota or other states.',
    costNote:
      'Marshall County pricing reflects Warren-area rural demand, Red River Valley corridor travel distances, cross-border North Dakota logistics, agricultural property logistics, and competition among regional agents serving Marshall County, MN communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'clearwater',
    name: 'Clearwater',
    seat: 'Bagley',
    city: 'Bagley',
    metro: 'clearwater-metro-mn',
    costTier: 'rural',
    citySlug: 'bagley',
    regional1: 'bagley-corridor',
    regional2: 'clearwater-river-valley',
    topId: 'regional-clearwater-mn-movers',
    topName: 'Regional Bagley / Clearwater Providers',
    regional1Name: 'Bagley Corridor Moving',
    regional2Name: 'Clearwater River Valley Moving',
    marketNotes:
      'Clearwater County, MN is a northwest Minnesota county centered on Bagley with rural residential and Clearwater River valley corridor agricultural demand across northwoods fringe gateway communities — not to be confused with Clearwater County in Idaho.',
    costNote:
      'Clearwater County pricing reflects Bagley-area rural demand, Clearwater River valley corridor travel distances, limited crew availability, and competition among regional agents serving Clearwater County, MN communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'murray',
    name: 'Murray',
    seat: 'Slayton',
    city: 'Slayton',
    metro: 'murray-metro-mn',
    costTier: 'rural',
    citySlug: 'slayton',
    regional1: 'slayton-corridor',
    regional2: 'des-moines-murray',
    topId: 'regional-murray-mn-movers',
    topName: 'Regional Slayton / Murray Providers',
    regional1Name: 'Slayton Corridor Moving',
    regional2Name: 'Des Moines Murray Moving',
    marketNotes:
      'Murray County, MN is a southwestern Minnesota county centered on Slayton with rural residential and Des Moines River valley corridor agricultural demand across prairie gateway communities — not to be confused with Murray County in Georgia, Oklahoma, or other states.',
    costNote:
      'Murray County pricing reflects Slayton-area rural demand, Des Moines River valley corridor travel distances, agricultural property logistics, and competition among regional agents serving Murray County, MN communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'lac-qui-parle',
    name: 'Lac qui Parle',
    seat: 'Madison',
    city: 'Madison',
    metro: 'lac-qui-parle-metro-mn',
    costTier: 'rural',
    citySlug: 'madison',
    regional1: 'madison-corridor',
    regional2: 'lac-qui-parle-valley',
    topId: 'regional-lacquiparle-mn-movers',
    topName: 'Regional Madison / Lac qui Parle Providers',
    regional1Name: 'Madison Corridor Moving',
    regional2Name: 'Lac qui Parle Valley Moving',
    marketNotes:
      'Lac qui Parle County, MN is a southwestern Minnesota county centered on Madison with rural residential and Lac qui Parle River valley corridor agricultural demand across prairie gateway communities — not to be confused with Madison in Dane County, Wisconsin.',
    costNote:
      'Lac qui Parle County pricing reflects Madison-area rural demand, Lac qui Parle River valley corridor travel distances, agricultural property logistics, and competition among regional agents serving Lac qui Parle County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'norman',
    name: 'Norman',
    seat: 'Ada',
    city: 'Ada',
    metro: 'norman-metro-mn',
    costTier: 'rural',
    citySlug: 'ada',
    regional1: 'ada-corridor',
    regional2: 'wild-rice-norman',
    topId: 'regional-norman-mn-movers',
    topName: 'Regional Ada / Norman Providers',
    regional1Name: 'Ada Corridor Moving',
    regional2Name: 'Wild Rice Norman Moving',
    marketNotes:
      'Norman County, MN is a northwest Red River Valley county centered on Ada with rural residential and Wild Rice River valley corridor agricultural demand — not to be confused with Norman, Oklahoma or Norman County in other states.',
    costNote:
      'Norman County pricing reflects Ada-area rural demand, Wild Rice River valley corridor travel distances, agricultural property logistics, and competition among regional agents serving Norman County, MN communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'wilkin',
    name: 'Wilkin',
    seat: 'Breckenridge',
    city: 'Breckenridge',
    metro: 'wilkin-metro-mn',
    costTier: 'rural',
    citySlug: 'breckenridge',
    regional1: 'breckenridge-corridor',
    regional2: 'red-river-wilkin',
    topId: 'regional-wilkin-mn-movers',
    topName: 'Regional Breckenridge / Wilkin Providers',
    regional1Name: 'Breckenridge Corridor Moving',
    regional2Name: 'Red River Wilkin Moving',
    marketNotes:
      'Wilkin County, MN is a Red River Valley county centered on Breckenridge with rural residential and cross-border Wahpeton–Breckenridge metro corridor agricultural demand along the North Dakota border gateway.',
    costNote:
      'Wilkin County pricing reflects Breckenridge-area rural demand, Red River border-corridor traffic, cross-border North Dakota logistics, agricultural property logistics, and competition among regional agents serving Wilkin County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'grant',
    name: 'Grant',
    seat: 'Elbow Lake',
    city: 'Elbow Lake',
    metro: 'grant-metro-mn',
    costTier: 'rural',
    citySlug: 'elbow-lake',
    regional1: 'elbow-lake-corridor',
    regional2: 'pelican-grant',
    topId: 'regional-grant-mn-movers',
    topName: 'Regional Elbow Lake / Grant Providers',
    regional1Name: 'Elbow Lake Corridor Moving',
    regional2Name: 'Pelican Grant Moving',
    marketNotes:
      'Grant County, MN is a west-central Minnesota county centered on Elbow Lake with rural residential and Pelican Lake corridor agricultural demand across prairie gateway communities — not to be confused with Grant County in North Dakota, Wisconsin, or other states.',
    costNote:
      'Grant County pricing reflects Elbow Lake-area rural demand, Pelican Lake corridor travel distances, agricultural property logistics, and competition among regional agents serving Grant County, MN communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'lincoln',
    name: 'Lincoln',
    seat: 'Ivanhoe',
    city: 'Ivanhoe',
    metro: 'lincoln-metro-mn',
    costTier: 'rural',
    citySlug: 'ivanhoe',
    regional1: 'ivanhoe-corridor',
    regional2: 'des-moines-lincoln',
    topId: 'regional-lincoln-mn-movers',
    topName: 'Regional Ivanhoe / Lincoln Providers',
    regional1Name: 'Ivanhoe Corridor Moving',
    regional2Name: 'Des Moines Lincoln Moving',
    marketNotes:
      'Lincoln County, MN is a southwestern Minnesota county centered on Ivanhoe with rural residential and Des Moines River valley corridor agricultural demand across prairie gateway communities — not to be confused with Lincoln County in Nebraska or other states.',
    costNote:
      'Lincoln County pricing reflects Ivanhoe-area rural demand, Des Moines River valley corridor travel distances, agricultural property logistics, and competition among regional agents serving Lincoln County, MN communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'cook',
    name: 'Cook',
    seat: 'Grand Marais',
    city: 'Grand Marais',
    metro: 'cook-metro-mn',
    costTier: 'secondary_metro',
    citySlug: 'grand-marais',
    regional1: 'grand-marais-corridor',
    regional2: 'gunflint-cook',
    topId: 'regional-cook-mn-movers',
    topName: 'Regional Grand Marais / Cook Providers',
    regional1Name: 'Grand Marais Corridor Moving',
    regional2Name: 'Gunflint Cook Moving',
    marketNotes:
      'Cook County, MN is Minnesota’s northeasternmost county centered on Grand Marais with strong Gunflint Trail resort, vacation-rental, and seasonal-property demand along the Lake Superior and Boundary Waters gateway — not to be confused with Cook County in Illinois.',
    costNote:
      'Cook County pricing reflects Grand Marais lakes secondary-metro demand, Gunflint Trail resort-season corridor traffic, vacation-rental turnover logistics, remote northwoods travel distances, harsh winters, and competition among regional agents serving Cook County, MN communities.',
    tipVariant: 'tourist',
  },
  {
    slug: 'mahnomen',
    name: 'Mahnomen',
    seat: 'Mahnomen',
    city: 'Mahnomen',
    metro: 'mahnomen-metro-mn',
    costTier: 'rural',
    citySlug: 'mahnomen',
    regional1: 'mahnomen-corridor',
    regional2: 'wild-rice-mahnomen',
    topId: 'regional-mahnomen-mn-movers',
    topName: 'Regional Mahnomen / Mahnomen County Providers',
    regional1Name: 'Mahnomen Corridor Moving',
    regional2Name: 'Wild Rice Mahnomen Moving',
    marketNotes:
      'Mahnomen County, MN is a northwest Minnesota county centered on Mahnomen with rural residential, tribal-nation gateway, and Wild Rice River valley corridor agricultural demand across northwoods fringe communities.',
    costNote:
      'Mahnomen County pricing reflects Mahnomen-area rural demand, Wild Rice River valley corridor travel distances, limited crew availability, and competition among regional agents serving Mahnomen County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'big-stone',
    name: 'Big Stone',
    seat: 'Ortonville',
    city: 'Ortonville',
    metro: 'big-stone-metro-mn',
    costTier: 'rural',
    citySlug: 'ortonville',
    regional1: 'ortonville-corridor',
    regional2: 'big-stone-lake',
    topId: 'regional-bigstone-mn-movers',
    topName: 'Regional Ortonville / Big Stone Providers',
    regional1Name: 'Ortonville Corridor Moving',
    regional2Name: 'Big Stone Lake Moving',
    marketNotes:
      'Big Stone County, MN is a west-central Minnesota county centered on Ortonville with rural residential and Big Stone Lake corridor agricultural demand along the South Dakota border gateway — not to be confused with Big Stone in other states.',
    costNote:
      'Big Stone County pricing reflects Ortonville-area rural demand, Big Stone Lake corridor travel distances, cross-border South Dakota logistics, agricultural property logistics, and competition among regional agents serving Big Stone County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'kittson',
    name: 'Kittson',
    seat: 'Hallock',
    city: 'Hallock',
    metro: 'kittson-metro-mn',
    costTier: 'rural',
    citySlug: 'hallock',
    regional1: 'hallock-corridor',
    regional2: 'red-river-kittson',
    topId: 'regional-kittson-mn-movers',
    topName: 'Regional Hallock / Kittson Providers',
    regional1Name: 'Hallock Corridor Moving',
    regional2Name: 'Red River Kittson Moving',
    marketNotes:
      'Kittson County, MN is Minnesota’s northwesternmost county centered on Hallock with rural residential and Red River valley corridor agricultural demand along the North Dakota and Manitoba border gateway.',
    costNote:
      'Kittson County pricing reflects Hallock-area rural demand, remote northwest corridor travel distances, cross-border North Dakota logistics, harsh winters, and competition among regional agents serving Kittson County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'red-lake',
    name: 'Red Lake',
    seat: 'Red Lake Falls',
    city: 'Red Lake Falls',
    metro: 'red-lake-metro-mn',
    costTier: 'rural',
    citySlug: 'red-lake-falls',
    regional1: 'red-lake-falls-corridor',
    regional2: 'red-lake-river-valley',
    topId: 'regional-redlake-mn-movers',
    topName: 'Regional Red Lake Falls / Red Lake Providers',
    regional1Name: 'Red Lake Falls Corridor Moving',
    regional2Name: 'Red Lake River Valley Moving',
    marketNotes:
      'Red Lake County, MN is a northwest Minnesota county centered on Red Lake Falls with rural residential and Red Lake River valley corridor agricultural demand — not to be confused with the Red Lake Nation reservation geography in Beltrami County.',
    costNote:
      'Red Lake County pricing reflects Red Lake Falls-area rural demand, Red Lake River valley corridor travel distances, agricultural property logistics, and competition among regional agents serving Red Lake County, MN communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'lake-of-the-woods',
    name: 'Lake of the Woods',
    seat: 'Baudette',
    city: 'Baudette',
    metro: 'lake-of-the-woods-metro-mn',
    costTier: 'secondary_metro',
    citySlug: 'baudette',
    regional1: 'baudette-corridor',
    regional2: 'rainy-lake-lake-of-the-woods',
    topId: 'regional-lakeofthewoods-mn-movers',
    topName: 'Regional Baudette / Lake of the Woods Providers',
    regional1Name: 'Baudette Corridor Moving',
    regional2Name: 'Rainy Lake Lake of the Woods Moving',
    marketNotes:
      'Lake of the Woods County, MN is a far-northern Minnesota county centered on Baudette with strong Rainy Lake resort, vacation-rental, and seasonal-property demand along the Ontario and Manitoba border gateway.',
    costNote:
      'Lake of the Woods County pricing reflects Baudette lakes secondary-metro demand, Rainy Lake resort-season corridor traffic, vacation-rental turnover logistics, remote northwoods travel distances, harsh winters, and competition among regional agents serving Lake of the Woods County communities.',
    tipVariant: 'tourist',
  },
  {
    slug: 'traverse',
    name: 'Traverse',
    seat: 'Wheaton',
    city: 'Wheaton',
    metro: 'traverse-metro-mn',
    costTier: 'rural',
    citySlug: 'wheaton',
    regional1: 'wheaton-corridor',
    regional2: 'bois-de-sioux-traverse',
    topId: 'regional-traverse-mn-movers',
    topName: 'Regional Wheaton / Traverse Providers',
    regional1Name: 'Wheaton Corridor Moving',
    regional2Name: 'Bois de Sioux Traverse Moving',
    marketNotes:
      'Traverse County, MN is a west-central Minnesota county centered on Wheaton with rural residential and Bois de Sioux River valley corridor agricultural demand along the South Dakota border gateway — not to be confused with Traverse County in other states.',
    costNote:
      'Traverse County pricing reflects Wheaton-area rural demand, Bois de Sioux River valley corridor travel distances, cross-border South Dakota logistics, agricultural property logistics, and competition among regional agents serving Traverse County, MN communities.',
    tipVariant: 'rural',
  },
];

const SEAT_BY_SLUG = Object.fromEntries(COUNTIES.map((c) => [c.slug, c.seat]));

const NON_CURATED_NAMES: Record<string, { name: string; seat: string }> = {
  pierce: { name: 'Pierce', seat: 'Ellsworth' },
  'la-crosse': { name: 'La Crosse', seat: 'La Crosse' },
};

function q(s: string): string {
  return JSON.stringify(s);
}

function slugKey(slug: string): string {
  return slug.includes('-') || /^\d/.test(slug) ? `'${slug}'` : slug;
}

function defaultDisplayLabel(slug: string, name: string): string {
  return DISPLAY_LABELS[slug] ?? `${name} County, MN`;
}

const STANDARD_TIPS = [
  'Verify coverage for surrounding areas before booking.',
  'Regional traffic impacts scheduling — confirm crew arrival windows.',
  'Confirm insurance for high-value homes before move day.',
  'Book early for peak seasons (May–September) and month-end lease changeover.',
  'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
];

function buildTips(c: CountyDef): string[] {
  const city = c.city;
  if (c.tipVariant === 'metro') {
    return [
      `Verify coverage for ${city} and surrounding Twin Cities metro communities before booking.`,
      'I-94, I-35W, and I-494 congestion significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes, condos, and townhomes before move day.',
      STANDARD_TIPS[3],
      STANDARD_TIPS[4],
    ];
  }
  if (c.tipVariant === 'medical') {
    return [
      `Verify coverage for ${city} and surrounding Olmsted County communities before booking.`,
      'Mayo Clinic medical-sector relocations and housing turnover may affect scheduling — confirm peak-season crew availability.',
      'Confirm insurance for high-value homes and professional relocations before move day.',
      STANDARD_TIPS[3],
      STANDARD_TIPS[4],
    ];
  }
  if (c.tipVariant === 'university') {
    return [
      `Verify coverage for ${city} and surrounding areas before booking.`,
      'University-area turnover (semester start/end) may affect scheduling — confirm peak-season crew availability.',
      'Confirm coverage for student housing, off-campus apartments, and family homes before booking.',
      STANDARD_TIPS[3],
      STANDARD_TIPS[4],
    ];
  }
  if (c.tipVariant === 'tourist') {
    return [
      `Verify coverage for ${city} and surrounding areas before booking.`,
      'Tourist-season congestion and vacation-rental turnover may affect scheduling — confirm peak-season crew availability.',
      'Confirm insurance for high-value gateway homes, seasonal properties, and vacation rentals before move day.',
      STANDARD_TIPS[3],
      STANDARD_TIPS[4],
    ];
  }
  if (c.tipVariant === 'rural') {
    return [
      `Verify coverage for ${city} and surrounding areas before booking.`,
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      STANDARD_TIPS[3],
      STANDARD_TIPS[4],
    ];
  }
  return [
    `Verify coverage for ${city} and surrounding areas before booking.`,
    STANDARD_TIPS[1],
    STANDARD_TIPS[2],
    STANDARD_TIPS[3],
    STANDARD_TIPS[4],
  ];
}

function moverIds(c: CountyDef): string[] {
  const slug = c.slug;
  const citySlug = c.citySlug;
  return [
    c.topId,
    `all-my-sons-${citySlug}-mn`,
    `${citySlug}-moving-${slug}-mn`,
    `${slug}-county-moving-${slug}-mn`,
    `college-hunks-moving-${citySlug}-mn`,
    `budd-van-lines-${citySlug}-mn`,
    `${c.regional1}-moving-${slug}-mn`,
    `${c.regional2}-moving-${slug}-mn`,
    `hercules-movers-${citySlug}-mn`,
    `krupp-moving-${citySlug}-mn`,
  ];
}

const FRANCHISE_TESTIMONIALS: Record<
  string,
  { quote: string; name: string; location: string; rating: number; moveType: string }[]
> = {
  hennepin: [
    {
      quote:
        'Two Men and a Truck Minneapolis handled our suburban move professionally — on time and extremely careful with our home.',
      name: 'Alex M.',
      location: 'Minneapolis, MN',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Minneapolis navigated our Edina relocation with fair pricing through Twin Cities metro corridor traffic.',
      name: 'Beth N.',
      location: 'Minneapolis, MN',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Twin Cities Metro West Moving served our Bloomington-area move efficiently with steady communication and professional crew coordination.',
      name: 'Carl O.',
      location: 'Bloomington, MN',
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
  const names = ['Dana P.', 'Eric Q.', 'Fran R.', 'Gia S.', 'Hal T.', 'Ivy U.', 'Jay V.', 'Kim W.'];
  const n1 = names[idx % names.length];
  const n2 = names[(idx + 1) % names.length];
  const n3 = names[(idx + 2) % names.length];
  const city = c.city;
  const altLoc = c.seat !== c.city ? `${c.seat}, MN` : `${city}, MN`;
  return `  ${slugKey(c.slug)}: [
    { quote: ${q(`${c.topName} handled our ${city} move professionally — on time and extremely careful with our home.`)}, name: ${q(n1)}, location: ${q(`${city}, MN`)}, rating: 5, moveType: 'Single-family' },
    { quote: ${q(`All My Sons ${city} navigated our relocation with fair pricing and excellent regional scheduling.`)}, name: ${q(n2)}, location: ${q(altLoc)}, rating: 5, moveType: 'Townhome' },
    { quote: ${q(`${c.regional2Name} served our move efficiently with punctual arrival and professional crew coordination.`)}, name: ${q(n3)}, location: ${q(`${city}, MN`)}, rating: 5, moveType: 'Apartment' },
  ],`;
}

function buildNearbyLinks(slug: string): string {
  const mnNeighbors = MN_NEIGHBORS[slug] ?? [];
  const cross = CROSS_BORDER[slug] ?? [];
  const crossSlugs = new Set(cross.map((cb) => cb.slug));
  const maxMn = Math.min(mnNeighbors.length, Math.max(3, 5 - cross.length));
  const links: string[] = [];

  for (const n of mnNeighbors.slice(0, maxMn)) {
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
      `href: ${q(`/local-movers/minnesota/${n}`)}`,
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

/** Hand-curated Minnesota county research — 87 counties */
export const minnesotaCountyResearch: Record<string, CuratedCountyResearch> = {
${entries.join('\n')}
};

export function getMinnesotaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return minnesotaCountyResearch[countySlug];
}
`;
}

function genTestimonials(): string {
  const entries = COUNTIES.map((c, i) => buildTestimonials(c, i + 3));
  return `import type { CountyTestimonialEntry } from '@/lib/local-movers/county-seo';

/** Hand-curated Minnesota county testimonials — 87 counties */
export const minnesotaCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
${entries.join('\n')}
};

export function getMinnesotaCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return minnesotaCountyTestimonials[countySlug] ?? [];
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

/** Hand-curated Minnesota county mover lists — 87 counties */
const CURATED_MN_COUNTIES: Record<string, string[]> = {
${entries.join('\n')}
};

export const minnesotaCountyMoverAssignments: CountyMoverAssignment[] =
  Object.entries(CURATED_MN_COUNTIES).map(([countySlug, moverIds]) => ({
    stateSlug: 'minnesota',
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

/** Seat and metro overrides for hand-curated Minnesota counties (batches 1–4 — 87 counties (full MN coverage)) */
export const minnesotaCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
${entries.join('\n')}
};

export function applyMinnesotaCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'minnesota') return county;
  const override = minnesotaCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}
`;
}

function genNearby(): string {
  const entries = COUNTIES.map((c) => buildNearbyLinks(c.slug));
  return `import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Minnesota curated county corridor links — 87 counties */
const MN_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
${entries.join('\n')}
};

export function getMinnesotaNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return MN_COUNTY_NEIGHBORS[countySlug] ?? [];
}
`;
}

const OUTPUTS: { path: string; content: string }[] = [
  { path: 'data/minnesota-county-research.ts', content: genResearch() },
  { path: 'data/minnesota-county-testimonials.ts', content: genTestimonials() },
  { path: 'data/minnesota-county-assignments.ts', content: genAssignments() },
  {
    path: 'lib/local-movers/geography/minnesota-overrides.ts',
    content: genOverrides(),
  },
  { path: 'lib/local-movers/minnesota-nearby.ts', content: genNearby() },
];

for (const { path, content } of OUTPUTS) {
  const full = join(ROOT, path);
  writeFileSync(full, content, 'utf8');
  console.log(`Wrote ${path}`);
}

console.log(
  `\nGenerated ${COUNTIES.length}/${EXPECTED_COUNT} Minnesota counties across ${OUTPUTS.length} files.`
);