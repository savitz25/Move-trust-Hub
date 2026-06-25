/**
 * Generates Minnesota county curation files (batches 1–2 — 37 counties).
 * Run: npx tsx scripts/generate-minnesota-county-data.ts
 */
import { writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(__dirname, '..');
const EXPECTED_COUNT = 37;

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
];

const SEAT_BY_SLUG = Object.fromEntries(COUNTIES.map((c) => [c.slug, c.seat]));

const NON_CURATED_NAMES: Record<string, { name: string; seat: string }> = {
  'mille-lacs': { name: 'Mille Lacs', seat: 'Milaca' },
  pierce: { name: 'Pierce', seat: 'Ellsworth' },
  lake: { name: 'Lake', seat: 'Two Harbors' },
  koochiching: { name: 'Koochiching', seat: 'International Falls' },
  cook: { name: 'Cook', seat: 'Grand Marais' },
  dodge: { name: 'Dodge', seat: 'Mantorville' },
  wabasha: { name: 'Wabasha', seat: 'Wabasha' },
  fillmore: { name: 'Fillmore', seat: 'Preston' },
  todd: { name: 'Todd', seat: 'Long Prairie' },
  pope: { name: 'Pope', seat: 'Glenwood' },
  meeker: { name: 'Meeker', seat: 'Litchfield' },
  sibley: { name: 'Sibley', seat: 'Gaylord' },
  'le-sueur': { name: 'Le Sueur', seat: 'Le Center' },
  aitkin: { name: 'Aitkin', seat: 'Aitkin' },
  kanabec: { name: 'Kanabec', seat: 'Mora' },
  houston: { name: 'Houston', seat: 'Caledonia' },
  brown: { name: 'Brown', seat: 'New Ulm' },
  faribault: { name: 'Faribault', seat: 'Blue Earth' },
  martin: { name: 'Martin', seat: 'Fairmont' },
  waseca: { name: 'Waseca', seat: 'Waseca' },
  watonwan: { name: 'Watonwan', seat: 'St. James' },
  norman: { name: 'Norman', seat: 'Ada' },
  wilkin: { name: 'Wilkin', seat: 'Breckenridge' },
  hubbard: { name: 'Hubbard', seat: 'Park Rapids' },
  clearwater: { name: 'Clearwater', seat: 'Bagley' },
  marshall: { name: 'Marshall', seat: 'Warren' },
  pennington: { name: 'Pennington', seat: 'Thief River Falls' },
  roseau: { name: 'Roseau', seat: 'Roseau' },
  'lake-of-the-woods': { name: 'Lake of the Woods', seat: 'Baudette' },
  chippewa: { name: 'Chippewa', seat: 'Montevideo' },
  renville: { name: 'Renville', seat: 'Olivia' },
  swift: { name: 'Swift', seat: 'Benson' },
  grant: { name: 'Grant', seat: 'Elbow Lake' },
  stevens: { name: 'Stevens', seat: 'Morris' },
  mahnomen: { name: 'Mahnomen', seat: 'Mahnomen' },
  'red-lake': { name: 'Red Lake', seat: 'Red Lake Falls' },
  wadena: { name: 'Wadena', seat: 'Wadena' },
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

/** Hand-curated Minnesota county research — 37 counties */
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

/** Hand-curated Minnesota county testimonials — 37 counties */
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

/** Hand-curated Minnesota county mover lists — 37 counties */
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

/** Seat and metro overrides for hand-curated Minnesota counties (batches 1–2 — 37 counties) */
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

/** Minnesota curated county corridor links — 37 counties */
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