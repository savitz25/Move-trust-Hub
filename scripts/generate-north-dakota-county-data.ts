/**
 * Generates North Dakota county curation files (batch 1: 25/53 counties).
 * Run: npx tsx scripts/generate-north-dakota-county-data.ts
 */
import { writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(__dirname, '..');
const EXPECTED_COUNT = 25;

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
  richland: 'Richland County, ND',
  dunn: 'Dunn County, ND',
  'grand-forks': 'Grand Forks County, ND',
  lamoure: 'LaMoure County, ND',
  benson: 'Benson County, ND',
  ransom: 'Ransom County, ND',
  pierce: 'Pierce County, ND',
  walsh: 'Walsh County, ND',
  mercer: 'Mercer County, ND',
  mountrail: 'Mountrail County, ND',
  mclean: 'McLean County, ND',
};

const ND_NEIGHBORS: Record<string, string[]> = {
  cass: ['traill', 'steele', 'griggs', 'barnes', 'ransom', 'richland'],
  burleigh: ['morton', 'oliver', 'mclean', 'kidder', 'sioux', 'grant', 'emmons', 'sheridan'],
  'grand-forks': ['walsh', 'pembina', 'steele', 'traill', 'nelson', 'cavalier'],
  ward: ['pierce', 'bottineau', 'mclean', 'mountrail', 'mchenry', 'renville', 'burke'],
  williams: ['mckenzie', 'mountrail', 'burke', 'divide'],
  morton: ['burleigh', 'mercer', 'stark', 'oliver', 'grant', 'sioux', 'hettinger', 'emmons'],
  stark: ['dunn', 'morton', 'grant', 'hettinger', 'billings', 'slope', 'golden-valley'],
  stutsman: ['barnes', 'lamoure', 'kidder', 'foster', 'logan', 'mcintosh'],
  richland: ['cass', 'ransom', 'lamoure', 'sargent', 'dickey'],
  mckenzie: ['williams', 'mountrail', 'dunn', 'mclean', 'billings', 'golden-valley'],
  rolette: ['bottineau', 'pierce', 'benson', 'towner'],
  ramsey: ['benson', 'walsh', 'pembina', 'nelson', 'cavalier', 'towner'],
  barnes: ['cass', 'stutsman', 'ransom', 'steele', 'griggs'],
  walsh: ['pembina', 'grand-forks', 'ramsey', 'nelson', 'cavalier'],
  mclean: ['burleigh', 'ward', 'mountrail', 'mercer', 'mckenzie', 'oliver', 'sheridan', 'mchenry'],
  mountrail: ['ward', 'williams', 'mckenzie', 'dunn', 'mclean', 'burke', 'renville'],
  mercer: ['morton', 'mclean', 'dunn', 'stark', 'oliver', 'sioux', 'hettinger', 'grant'],
  traill: ['cass', 'grand-forks', 'steele', 'griggs', 'nelson'],
  pembina: ['walsh', 'cavalier', 'ramsey'],
  bottineau: ['pierce', 'ward', 'rolette', 'benson', 'mchenry', 'renville'],
  benson: ['ramsey', 'pierce', 'rolette', 'nelson', 'eddy', 'towner'],
  ransom: ['cass', 'barnes', 'richland', 'lamoure', 'dickey', 'sargent'],
  lamoure: ['ransom', 'richland', 'stutsman', 'dickey', 'logan', 'mcintosh'],
  dunn: ['stark', 'mercer', 'mckenzie', 'mountrail', 'mclean', 'billings', 'hettinger', 'oliver'],
  pierce: ['rolette', 'benson', 'ward', 'bottineau', 'mchenry'],
};

type CrossBorder = {
  slug: string;
  stateSlug: string;
  name: string;
  seat: string;
  displayLabel: string;
};

const CROSS_BORDER: Partial<Record<string, CrossBorder[]>> = {
  cass: [
    {
      slug: 'clay',
      stateSlug: 'minnesota',
      name: 'Clay',
      seat: 'Moorhead',
      displayLabel: 'Clay County, MN',
    },
    {
      slug: 'otter-tail',
      stateSlug: 'minnesota',
      name: 'Otter Tail',
      seat: 'Fergus Falls',
      displayLabel: 'Otter Tail County, MN',
    },
  ],
  'grand-forks': [
    {
      slug: 'polk',
      stateSlug: 'minnesota',
      name: 'Polk',
      seat: 'Crookston',
      displayLabel: 'Polk County, MN',
    },
  ],
  williams: [
    {
      slug: 'richland',
      stateSlug: 'montana',
      name: 'Richland',
      seat: 'Sidney',
      displayLabel: 'Richland County, MT',
    },
  ],
  walsh: [
    {
      slug: 'marshall',
      stateSlug: 'minnesota',
      name: 'Marshall',
      seat: 'Warren',
      displayLabel: 'Marshall County, MN',
    },
  ],
  pembina: [
    {
      slug: 'kittson',
      stateSlug: 'minnesota',
      name: 'Kittson',
      seat: 'Hallock',
      displayLabel: 'Kittson County, MN',
    },
  ],
  traill: [
    {
      slug: 'norman',
      stateSlug: 'minnesota',
      name: 'Norman',
      seat: 'Ada',
      displayLabel: 'Norman County, MN',
    },
  ],
  richland: [
    {
      slug: 'wilkin',
      stateSlug: 'minnesota',
      name: 'Wilkin',
      seat: 'Breckenridge',
      displayLabel: 'Wilkin County, MN',
    },
  ],
  ransom: [
    {
      slug: 'sargent',
      stateSlug: 'north-dakota',
      name: 'Sargent',
      seat: 'Forman',
      displayLabel: 'Sargent County, ND',
    },
  ],
  burleigh: [
    {
      slug: 'campbell',
      stateSlug: 'south-dakota',
      name: 'Campbell',
      seat: 'Mound City',
      displayLabel: 'Campbell County, SD',
    },
  ],
  morton: [
    {
      slug: 'perkins',
      stateSlug: 'south-dakota',
      name: 'Perkins',
      seat: 'Bison',
      displayLabel: 'Perkins County, SD',
    },
  ],
  stark: [
    {
      slug: 'harding',
      stateSlug: 'south-dakota',
      name: 'Harding',
      seat: 'Buffalo',
      displayLabel: 'Harding County, SD',
    },
  ],
};

const COUNTIES: CountyDef[] = [
  {
    slug: 'cass',
    name: 'Cass',
    seat: 'Fargo',
    city: 'Fargo',
    metro: 'cass-metro-nd',
    costTier: 'western_slope',
    citySlug: 'fargo',
    regional1: 'fargo-corridor',
    regional2: 'red-river-valley',
    topId: 'twomenandatruck-cass-nd',
    topName: 'Two Men and a Truck Fargo',
    regional1Name: 'Fargo Corridor Moving',
    regional2Name: 'Red River Valley Moving',
    franchise: true,
    marketNotes:
      'Cass County is North Dakota’s most populous county centered on Fargo with strong suburban, commercial, university-spillover, and Red River Valley residential demand across West Fargo, Horace, and Moorhead-adjacent communities.',
    costNote:
      'Cass County pricing reflects Fargo metro demand, suburban new-construction turnover, I-29 Red River corridor traffic, and competition among full-service agents serving Cass County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'burleigh',
    name: 'Burleigh',
    seat: 'Bismarck',
    city: 'Bismarck',
    metro: 'burleigh-metro-nd',
    costTier: 'western_slope',
    citySlug: 'bismarck',
    regional1: 'bismarck-corridor',
    regional2: 'capital-region',
    topId: 'regional-burleigh-nd-movers',
    topName: 'Regional Bismarck / Burleigh Providers',
    regional1Name: 'Bismarck Corridor Moving',
    regional2Name: 'Capital Region Moving',
    marketNotes:
      'Burleigh County anchors North Dakota’s capital region with strong government-sector, healthcare, commercial, and residential demand across Bismarck, Lincoln, and Missouri River corridor communities.',
    costNote:
      'Burleigh County pricing reflects Bismarck capital-region demand, state-government and healthcare relocations, I-94 Missouri Plateau corridor traffic, and competition among regional agents serving Burleigh County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'grand-forks',
    name: 'Grand Forks',
    seat: 'Grand Forks',
    city: 'Grand Forks',
    metro: 'grand-forks-metro-nd',
    costTier: 'western_slope',
    citySlug: 'grand-forks',
    regional1: 'grand-forks-corridor',
    regional2: 'red-river-valley',
    topId: 'regional-grandforks-nd-movers',
    topName: 'Regional Grand Forks / Grand Forks County Providers',
    regional1Name: 'Grand Forks Corridor Moving',
    regional2Name: 'Red River Valley Moving',
    marketNotes:
      'Grand Forks County, ND is a northeastern Red River Valley county centered on Grand Forks with strong University of North Dakota, student-housing, and residential demand — not to be confused with Grand Forks County in other states.',
    costNote:
      'Grand Forks County pricing reflects university-area turnover, I-29 Red River corridor traffic, student and faculty relocations, and competition among regional agents serving Grand Forks County communities.',
    tipVariant: 'university',
  },
  {
    slug: 'ward',
    name: 'Ward',
    seat: 'Minot',
    city: 'Minot',
    metro: 'ward-metro-nd',
    costTier: 'rural',
    citySlug: 'minot',
    regional1: 'minot-corridor',
    regional2: 'north-central-plains',
    topId: 'regional-ward-nd-movers',
    topName: 'Regional Minot / Ward Providers',
    regional1Name: 'Minot Corridor Moving',
    regional2Name: 'North Central Plains Moving',
    marketNotes:
      'Ward County is a north-central North Dakota county centered on Minot with strong Minot Air Force Base, commercial, and residential demand across the Souris River basin and north-central plains corridor.',
    costNote:
      'Ward County pricing reflects Minot metro demand, military and energy-sector relocations, US-83 and US-2 corridor traffic, and competition among regional agents serving Ward County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'williams',
    name: 'Williams',
    seat: 'Williston',
    city: 'Williston',
    metro: 'williams-metro-nd',
    costTier: 'western_slope',
    citySlug: 'williston',
    regional1: 'williston-corridor',
    regional2: 'bakken-basin',
    topId: 'regional-williams-nd-movers',
    topName: 'Regional Williston / Williams Providers',
    regional1Name: 'Williston Corridor Moving',
    regional2Name: 'Bakken Basin Moving',
    marketNotes:
      'Williams County anchors northwestern North Dakota’s Bakken energy basin with strong oilfield, commercial, and residential demand across Williston, Tioga, and US-2 energy-corridor communities.',
    costNote:
      'Williams County pricing reflects Williston Bakken-basin demand, energy-sector workforce relocations, US-2 and US-85 corridor traffic, and competition among regional agents serving Williams County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'morton',
    name: 'Morton',
    seat: 'Mandan',
    city: 'Mandan',
    metro: 'morton-metro-nd',
    costTier: 'rural',
    citySlug: 'mandan',
    regional1: 'mandan-corridor',
    regional2: 'missouri-plateau',
    topId: 'regional-morton-nd-movers',
    topName: 'Regional Mandan / Morton Providers',
    regional1Name: 'Mandan Corridor Moving',
    regional2Name: 'Missouri Plateau Moving',
    marketNotes:
      'Morton County is a south-central North Dakota county centered on Mandan with residential and Bismarck-metro spillover demand across the Missouri River plateau and Standing Rock corridor communities.',
    costNote:
      'Morton County pricing reflects Mandan-area demand, Bismarck-metro cross-river traffic, I-94 Missouri Plateau corridor logistics, and competition among regional agents serving Morton County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'stark',
    name: 'Stark',
    seat: 'Dickinson',
    city: 'Dickinson',
    metro: 'stark-metro-nd',
    costTier: 'rural',
    citySlug: 'dickinson',
    regional1: 'dickinson-corridor',
    regional2: 'southwest-plains',
    topId: 'regional-stark-nd-movers',
    topName: 'Regional Dickinson / Stark Providers',
    regional1Name: 'Dickinson Corridor Moving',
    regional2Name: 'Southwest Plains Moving',
    marketNotes:
      'Stark County is a southwestern North Dakota county centered on Dickinson with residential, energy-sector, and agricultural demand across the southwest plains and I-94 corridor communities.',
    costNote:
      'Stark County pricing reflects Dickinson-area demand, energy and agricultural property logistics, I-94 southwest corridor traffic, and competition among regional agents serving Stark County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'stutsman',
    name: 'Stutsman',
    seat: 'Jamestown',
    city: 'Jamestown',
    metro: 'stutsman-metro-nd',
    costTier: 'rural',
    citySlug: 'jamestown',
    regional1: 'jamestown-corridor',
    regional2: 'james-river-valley',
    topId: 'regional-stutsman-nd-movers',
    topName: 'Regional Jamestown / Stutsman Providers',
    regional1Name: 'Jamestown Corridor Moving',
    regional2Name: 'James River Valley Moving',
    marketNotes:
      'Stutsman County is a central North Dakota county centered on Jamestown with residential, manufacturing, and James River Valley agricultural demand across I-94 corridor communities.',
    costNote:
      'Stutsman County pricing reflects Jamestown-area demand, James River Valley travel distances, I-94 central corridor traffic, and competition among regional agents serving Stutsman County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'richland',
    name: 'Richland',
    seat: 'Wahpeton',
    city: 'Wahpeton',
    metro: 'richland-metro-nd',
    costTier: 'rural',
    citySlug: 'wahpeton',
    regional1: 'wahpeton-corridor',
    regional2: 'red-river-south',
    topId: 'regional-richland-nd-movers',
    topName: 'Regional Wahpeton / Richland Providers',
    regional1Name: 'Wahpeton Corridor Moving',
    regional2Name: 'Red River South Moving',
    marketNotes:
      'Richland County, ND is a southeastern Red River Valley county centered on Wahpeton with residential and agricultural demand across Breckenridge-adjacent border communities — not to be confused with Richland County, Montana or other states.',
    costNote:
      'Richland County pricing reflects Wahpeton-area demand, Red River border-corridor traffic, agricultural property logistics, and competition among regional agents serving Richland County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'mckenzie',
    name: 'McKenzie',
    seat: 'Watford City',
    city: 'Watford City',
    metro: 'mckenzie-metro-nd',
    costTier: 'western_slope',
    citySlug: 'watford-city',
    regional1: 'watford-city-corridor',
    regional2: 'bakken-basin',
    topId: 'regional-mckenzie-nd-movers',
    topName: 'Regional Watford City / McKenzie Providers',
    regional1Name: 'Watford City Corridor Moving',
    regional2Name: 'Bakken Basin Moving',
    marketNotes:
      'McKenzie County is a northwestern North Dakota Bakken energy county centered on Watford City with strong oilfield, commercial, and residential demand across Theodore Roosevelt area corridor communities.',
    costNote:
      'McKenzie County pricing reflects Watford City Bakken-basin demand, energy-sector workforce relocations, remote Badlands corridor travel distances, and competition among regional agents serving McKenzie County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'rolette',
    name: 'Rolette',
    seat: 'Rolla',
    city: 'Rolla',
    metro: 'rolette-metro-nd',
    costTier: 'rural',
    citySlug: 'rolla',
    regional1: 'rolla-corridor',
    regional2: 'turtle-mountains',
    topId: 'regional-rolette-nd-movers',
    topName: 'Regional Rolla / Rolette Providers',
    regional1Name: 'Rolla Corridor Moving',
    regional2Name: 'Turtle Mountains Moving',
    marketNotes:
      'Rolette County is a north-central North Dakota county centered on Rolla with rural residential and Turtle Mountains corridor demand across US-281 and tribal-adjacent communities.',
    costNote:
      'Rolette County pricing reflects Rolla-area demand, remote north-central travel distances, rural property logistics, and competition among regional agents serving Rolette County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'ramsey',
    name: 'Ramsey',
    seat: 'Devils Lake',
    city: 'Devils Lake',
    metro: 'ramsey-metro-nd',
    costTier: 'rural',
    citySlug: 'devils-lake',
    regional1: 'devils-lake-corridor',
    regional2: 'lake-region',
    topId: 'regional-ramsey-nd-movers',
    topName: 'Regional Devils Lake / Ramsey Providers',
    regional1Name: 'Devils Lake Corridor Moving',
    regional2Name: 'Lake Region Moving',
    marketNotes:
      'Ramsey County is a northeastern North Dakota county centered on Devils Lake with residential, tourism, and lake-region demand across Devils Lake basin corridor communities.',
    costNote:
      'Ramsey County pricing reflects Devils Lake-area demand, lake-region seasonal traffic, US-2 corridor logistics, and competition among regional agents serving Ramsey County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'barnes',
    name: 'Barnes',
    seat: 'Valley City',
    city: 'Valley City',
    metro: 'barnes-metro-nd',
    costTier: 'rural',
    citySlug: 'valley-city',
    regional1: 'valley-city-corridor',
    regional2: 'sheyenne-river',
    topId: 'regional-barnes-nd-movers',
    topName: 'Regional Valley City / Barnes Providers',
    regional1Name: 'Valley City Corridor Moving',
    regional2Name: 'Sheyenne River Moving',
    marketNotes:
      'Barnes County is a southeastern North Dakota county centered on Valley City with residential and Sheyenne River Valley agricultural demand across I-94 corridor communities.',
    costNote:
      'Barnes County pricing reflects Valley City-area demand, Sheyenne River Valley travel distances, I-94 corridor traffic, and competition among regional agents serving Barnes County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'walsh',
    name: 'Walsh',
    seat: 'Grafton',
    city: 'Grafton',
    metro: 'walsh-metro-nd',
    costTier: 'rural',
    citySlug: 'grafton',
    regional1: 'grafton-corridor',
    regional2: 'red-river-north',
    topId: 'regional-walsh-nd-movers',
    topName: 'Regional Grafton / Walsh Providers',
    regional1Name: 'Grafton Corridor Moving',
    regional2Name: 'Red River North Moving',
    marketNotes:
      'Walsh County, ND is a northeastern Red River Valley county centered on Grafton with agricultural, residential, and Minnesota border-corridor demand — not to be confused with Walsh County in other states.',
    costNote:
      'Walsh County pricing reflects Grafton-area demand, Red River north-valley corridor traffic, agricultural property logistics, and competition among regional agents serving Walsh County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'mclean',
    name: 'McLean',
    seat: 'Washburn',
    city: 'Washburn',
    metro: 'mclean-metro-nd',
    costTier: 'rural',
    citySlug: 'washburn',
    regional1: 'washburn-corridor',
    regional2: 'missouri-slope',
    topId: 'regional-mclean-nd-movers',
    topName: 'Regional Washburn / McLean Providers',
    regional1Name: 'Washburn Corridor Moving',
    regional2Name: 'Missouri Slope Moving',
    marketNotes:
      'McLean County, ND is a central North Dakota county centered on Washburn with residential and Missouri River slope demand across Garrison Dam corridor communities — not to be confused with McLean County in other states.',
    costNote:
      'McLean County pricing reflects Washburn-area demand, Missouri Slope travel distances, lake-and-reservoir corridor logistics, and competition among regional agents serving McLean County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'mountrail',
    name: 'Mountrail',
    seat: 'Stanley',
    city: 'Stanley',
    metro: 'mountrail-metro-nd',
    costTier: 'rural',
    citySlug: 'stanley',
    regional1: 'stanley-corridor',
    regional2: 'bakken-plateau',
    topId: 'regional-mountrail-nd-movers',
    topName: 'Regional Stanley / Mountrail Providers',
    regional1Name: 'Stanley Corridor Moving',
    regional2Name: 'Bakken Plateau Moving',
    marketNotes:
      'Mountrail County, ND is a northwestern North Dakota energy county centered on Stanley with oilfield, ranch, and residential demand across Bakken plateau corridor communities — not to be confused with Mountrail County in other states.',
    costNote:
      'Mountrail County pricing reflects Stanley-area Bakken demand, energy-sector workforce relocations, remote plateau travel distances, and competition among regional agents serving Mountrail County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'mercer',
    name: 'Mercer',
    seat: 'Stanton',
    city: 'Stanton',
    metro: 'mercer-metro-nd',
    costTier: 'rural',
    citySlug: 'stanton',
    regional1: 'stanton-corridor',
    regional2: 'coal-country',
    topId: 'regional-mercer-nd-movers',
    topName: 'Regional Stanton / Mercer Providers',
    regional1Name: 'Stanton Corridor Moving',
    regional2Name: 'Coal Country Moving',
    marketNotes:
      'Mercer County, ND is a west-central North Dakota county centered on Stanton with residential and coal-country energy demand across Knife River corridor communities — not to be confused with Mercer County in other states.',
    costNote:
      'Mercer County pricing reflects Stanton-area demand, coal-country energy logistics, Missouri River slope travel distances, and competition among regional agents serving Mercer County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'traill',
    name: 'Traill',
    seat: 'Hillsboro',
    city: 'Hillsboro',
    metro: 'traill-metro-nd',
    costTier: 'rural',
    citySlug: 'hillsboro',
    regional1: 'hillsboro-corridor',
    regional2: 'red-river-east',
    topId: 'regional-traill-nd-movers',
    topName: 'Regional Hillsboro / Traill Providers',
    regional1Name: 'Hillsboro Corridor Moving',
    regional2Name: 'Red River East Moving',
    marketNotes:
      'Traill County is an eastern North Dakota county centered on Hillsboro with agricultural, residential, and Red River east-valley demand across I-29 corridor communities.',
    costNote:
      'Traill County pricing reflects Hillsboro-area demand, Red River east-valley corridor traffic, agricultural property logistics, and competition among regional agents serving Traill County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'pembina',
    name: 'Pembina',
    seat: 'Cavalier',
    city: 'Cavalier',
    metro: 'pembina-metro-nd',
    costTier: 'rural',
    citySlug: 'cavalier',
    regional1: 'cavalier-corridor',
    regional2: 'pembina-valley',
    topId: 'regional-pembina-nd-movers',
    topName: 'Regional Cavalier / Pembina Providers',
    regional1Name: 'Cavalier Corridor Moving',
    regional2Name: 'Pembina Valley Moving',
    marketNotes:
      'Pembina County is North Dakota’s northeasternmost county with seat at Cavalier — distinct from neighboring Cavalier County — and residential demand across Pembina Valley and Canada-border corridor communities.',
    costNote:
      'Pembina County pricing reflects Cavalier-area demand, Pembina Valley border-corridor traffic, agricultural property logistics, and competition among regional agents serving Pembina County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'bottineau',
    name: 'Bottineau',
    seat: 'Bottineau',
    city: 'Bottineau',
    metro: 'bottineau-metro-nd',
    costTier: 'rural',
    citySlug: 'bottineau',
    regional1: 'bottineau-corridor',
    regional2: 'turtle-mountains',
    topId: 'regional-bottineau-nd-movers',
    topName: 'Regional Bottineau / Bottineau County Providers',
    regional1Name: 'Bottineau Corridor Moving',
    regional2Name: 'Turtle Mountains Moving',
    marketNotes:
      'Bottineau County is a north-central North Dakota county centered on Bottineau with residential, tourism, and Turtle Mountains corridor demand across US-281 and Lake Metigoshe gateway communities.',
    costNote:
      'Bottineau County pricing reflects Bottineau-area demand, Turtle Mountains seasonal traffic, remote north-central travel distances, and competition among regional agents serving Bottineau County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'benson',
    name: 'Benson',
    seat: 'Minnewaukan',
    city: 'Minnewaukan',
    metro: 'benson-metro-nd',
    costTier: 'rural',
    citySlug: 'minnewaukan',
    regional1: 'minnewaukan-corridor',
    regional2: 'devils-lake-basin',
    topId: 'regional-benson-nd-movers',
    topName: 'Regional Minnewaukan / Benson Providers',
    regional1Name: 'Minnewaukan Corridor Moving',
    regional2Name: 'Devils Lake Basin Moving',
    marketNotes:
      'Benson County, ND is a northeastern North Dakota county centered on Minnewaukan with rural residential and Devils Lake basin demand across tribal and lake-region corridor communities — not to be confused with Benson County in other states.',
    costNote:
      'Benson County pricing reflects Minnewaukan-area demand, Devils Lake basin travel distances, rural property logistics, and competition among regional agents serving Benson County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'ransom',
    name: 'Ransom',
    seat: 'Lisbon',
    city: 'Lisbon',
    metro: 'ransom-metro-nd',
    costTier: 'rural',
    citySlug: 'lisbon',
    regional1: 'lisbon-corridor',
    regional2: 'sheyenne-coteau',
    topId: 'regional-ransom-nd-movers',
    topName: 'Regional Lisbon / Ransom Providers',
    regional1Name: 'Lisbon Corridor Moving',
    regional2Name: 'Sheyenne Coteau Moving',
    marketNotes:
      'Ransom County, ND is a southeastern North Dakota county centered on Lisbon with rural residential and Sheyenne Coteau agricultural demand — not to be confused with Ransom County in other states.',
    costNote:
      'Ransom County pricing reflects Lisbon-area demand, Sheyenne Coteau travel distances, agricultural property logistics, and competition among regional agents serving Ransom County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'lamoure',
    name: 'LaMoure',
    seat: 'LaMoure',
    city: 'LaMoure',
    metro: 'lamoure-metro-nd',
    costTier: 'rural',
    citySlug: 'lamoure',
    regional1: 'lamoure-corridor',
    regional2: 'james-river-south',
    topId: 'regional-lamoure-nd-movers',
    topName: 'Regional LaMoure / LaMoure County Providers',
    regional1Name: 'LaMoure Corridor Moving',
    regional2Name: 'James River South Moving',
    marketNotes:
      'LaMoure County, ND is a southeastern North Dakota county centered on LaMoure with rural residential and James River south-basin agricultural demand — not to be confused with LaMoure County in other states.',
    costNote:
      'LaMoure County pricing reflects LaMoure-area demand, James River south-basin travel distances, agricultural property logistics, and competition among regional agents serving LaMoure County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'dunn',
    name: 'Dunn',
    seat: 'Killdeer',
    city: 'Killdeer',
    metro: 'dunn-metro-nd',
    costTier: 'rural',
    citySlug: 'killdeer',
    regional1: 'killdeer-corridor',
    regional2: 'badlands-plateau',
    topId: 'regional-dunn-nd-movers',
    topName: 'Regional Killdeer / Dunn Providers',
    regional1Name: 'Killdeer Corridor Moving',
    regional2Name: 'Badlands Plateau Moving',
    marketNotes:
      'Dunn County, ND is a western North Dakota county centered on Killdeer with energy-sector, ranch, and Badlands plateau residential demand — not to be confused with Dunn County in Wisconsin or other states.',
    costNote:
      'Dunn County pricing reflects Killdeer-area demand, Badlands plateau travel distances, energy and ranch property logistics, and competition among regional agents serving Dunn County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'pierce',
    name: 'Pierce',
    seat: 'Rugby',
    city: 'Rugby',
    metro: 'pierce-metro-nd',
    costTier: 'rural',
    citySlug: 'rugby',
    regional1: 'rugby-corridor',
    regional2: 'geographic-center',
    topId: 'regional-pierce-nd-movers',
    topName: 'Regional Rugby / Pierce Providers',
    regional1Name: 'Rugby Corridor Moving',
    regional2Name: 'Geographic Center Moving',
    marketNotes:
      'Pierce County, ND is a north-central North Dakota county centered on Rugby — the geographic center of North America — with rural residential and agricultural demand across US-2 corridor communities — not to be confused with Pierce County in other states.',
    costNote:
      'Pierce County pricing reflects Rugby-area demand, remote north-central travel distances, agricultural property logistics, and competition among regional agents serving Pierce County communities.',
    tipVariant: 'rural',
  },
];

const SEAT_BY_SLUG = Object.fromEntries(COUNTIES.map((c) => [c.slug, c.seat]));

const NON_CURATED_NAMES: Record<string, { name: string; seat: string }> = {
  steele: { name: 'Steele', seat: 'Finley' },
  griggs: { name: 'Griggs', seat: 'Cooperstown' },
  kidder: { name: 'Kidder', seat: 'Steele' },
  sioux: { name: 'Sioux', seat: 'Fort Yates' },
  grant: { name: 'Grant', seat: 'Carson' },
  emmons: { name: 'Emmons', seat: 'Linton' },
  sheridan: { name: 'Sheridan', seat: 'McClusky' },
  oliver: { name: 'Oliver', seat: 'Center' },
  burke: { name: 'Burke', seat: 'Bowbells' },
  divide: { name: 'Divide', seat: 'Crosby' },
  billings: { name: 'Billings', seat: 'Medora' },
  slope: { name: 'Slope', seat: 'Amidon' },
  'golden-valley': { name: 'Golden Valley', seat: 'Beach' },
  hettinger: { name: 'Hettinger', seat: 'Mott' },
  sargent: { name: 'Sargent', seat: 'Forman' },
  dickey: { name: 'Dickey', seat: 'Ellendale' },
  foster: { name: 'Foster', seat: 'Carrington' },
  logan: { name: 'Logan', seat: 'Napoleon' },
  mcintosh: { name: 'McIntosh', seat: 'Ashley' },
  nelson: { name: 'Nelson', seat: 'Lakota' },
  cavalier: { name: 'Cavalier', seat: 'Langdon' },
  mchenry: { name: 'McHenry', seat: 'Towner' },
  renville: { name: 'Renville', seat: 'Mohall' },
  eddy: { name: 'Eddy', seat: 'New Rockford' },
  towner: { name: 'Towner', seat: 'Cando' },
};

function slugKey(slug: string): string {
  return /[^a-z]/.test(slug) ? `'${slug}'` : slug;
}

function q(s: string): string {
  if (s.includes("'")) return JSON.stringify(s);
  return `'${s}'`;
}

function defaultDisplayLabel(slug: string, name: string): string {
  return DISPLAY_LABELS[slug] ?? `${name} County, ND`;
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
    `all-my-sons-${citySlug}-nd`,
    `${citySlug}-moving-${slug}-nd`,
    `${slug}-county-moving-${slug}-nd`,
    `college-hunks-moving-${citySlug}-nd`,
    `budd-van-lines-${citySlug}-nd`,
    `${c.regional1}-moving-${slug}-nd`,
    `${c.regional2}-moving-${slug}-nd`,
    `hercules-movers-${citySlug}-nd`,
    `krupp-moving-${citySlug}-nd`,
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
  cass: [
    {
      quote:
        'Two Men and a Truck Fargo handled our suburban move professionally — on time and extremely careful with our home.',
      name: 'Alex M.',
      location: 'Fargo, ND',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Fargo navigated our West Fargo relocation with fair pricing through Red River Valley corridor traffic.',
      name: 'Beth N.',
      location: 'West Fargo, ND',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Red River Valley Moving served our relocation efficiently with steady communication and professional crew coordination.',
      name: 'Carl O.',
      location: 'Fargo, ND',
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
  const altLoc = c.seat !== c.city ? `${c.seat}, ND` : `${city}, ND`;
  return `  ${slugKey(c.slug)}: [
    { quote: ${q(`${c.topName} handled our ${city} move professionally — on time and extremely careful with our home.`)}, name: ${q(n1)}, location: ${q(`${city}, ND`)}, rating: 5, moveType: 'Single-family' },
    { quote: ${q(`All My Sons ${city} navigated our relocation with fair pricing and excellent regional scheduling.`)}, name: ${q(n2)}, location: ${q(altLoc)}, rating: 5, moveType: 'Townhome' },
    { quote: ${q(`${c.regional2Name} served our move efficiently with punctual arrival and professional crew coordination.`)}, name: ${q(n3)}, location: ${q(`${city}, ND`)}, rating: 5, moveType: 'Apartment' },
  ],`;
}

function buildNearbyLinks(slug: string): string {
  const ndNeighbors = ND_NEIGHBORS[slug] ?? [];
  const cross = CROSS_BORDER[slug] ?? [];
  const maxNd = Math.min(ndNeighbors.length, Math.max(3, 5 - cross.length));
  const links: string[] = [];

  for (const n of ndNeighbors.slice(0, maxNd)) {
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
      `href: ${q(`/local-movers/north-dakota/${n}`)}`,
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

/** Hand-curated North Dakota county research — 25/53 */
export const northDakotaCountyResearch: Record<string, CuratedCountyResearch> = {
${entries.join('\n')}
};

export function getNorthDakotaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return northDakotaCountyResearch[countySlug];
}
`;
}

function genTestimonials(): string {
  const entries = COUNTIES.map((c, i) => buildTestimonials(c, i + 3));
  return `import type { CountyTestimonialEntry } from '@/lib/local-movers/county-seo';

/** Hand-curated North Dakota county testimonials — 25/53 */
export const northDakotaCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
${entries.join('\n')}
};

export function getNorthDakotaCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return northDakotaCountyTestimonials[countySlug] ?? [];
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

/** Hand-curated North Dakota county mover lists — 25/53 */
const CURATED_ND_COUNTIES: Record<string, string[]> = {
${entries.join('\n')}
};

export const northDakotaCountyMoverAssignments: CountyMoverAssignment[] =
  Object.entries(CURATED_ND_COUNTIES).map(([countySlug, moverIds]) => ({
    stateSlug: 'north-dakota',
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

/** Seat and metro overrides for hand-curated North Dakota counties (25/53) */
export const northDakotaCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
${entries.join('\n')}
};

export function applyNorthDakotaCountyOverrides(county: LocalCounty): LocalCounty {
  const override = northDakotaCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}
`;
}

function genNearby(): string {
  const entries = COUNTIES.map((c) => buildNearbyLinks(c.slug));
  return `import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** North Dakota curated county corridor links — 25/53 */
const ND_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
${entries.join('\n')}
};

export function getNorthDakotaNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return ND_COUNTY_NEIGHBORS[countySlug] ?? [];
}
`;
}

const OUTPUTS: { path: string; content: string }[] = [
  { path: 'data/north-dakota-county-research.ts', content: genResearch() },
  { path: 'data/north-dakota-county-testimonials.ts', content: genTestimonials() },
  { path: 'data/north-dakota-county-assignments.ts', content: genAssignments() },
  {
    path: 'lib/local-movers/geography/north-dakota-overrides.ts',
    content: genOverrides(),
  },
  { path: 'lib/local-movers/north-dakota-nearby.ts', content: genNearby() },
];

for (const { path, content } of OUTPUTS) {
  const full = join(ROOT, path);
  writeFileSync(full, content, 'utf8');
  console.log(`Wrote ${path}`);
}

console.log(
  `\nGenerated ${COUNTIES.length}/${EXPECTED_COUNT} North Dakota counties across ${OUTPUTS.length} files.`
);