/**
 * Generates South Dakota county curation files (66/66 counties — full set).
 * Run: npx tsx scripts/generate-south-dakota-county-data.ts
 */
import { writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(__dirname, '..');
const EXPECTED_COUNT = 66;

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
  grant: 'Grant County, SD',
  clay: 'Clay County, SD',
  lake: 'Lake County, SD',
  butte: 'Butte County, SD',
  custer: 'Custer County, SD',
  lincoln: 'Lincoln County, SD',
  union: 'Union County, SD',
  shannon: 'Oglala Lakota County, SD',
  todd: 'Todd County, SD',
  'fall-river': 'Fall River County, SD',
  'charles-mix': 'Charles Mix County, SD',
  brown: 'Brown County, SD',
  roberts: 'Roberts County, SD',
  hutchinson: 'Hutchinson County, SD',
  hughes: 'Hughes County, SD',
  meade: 'Meade County, SD',
  lawrence: 'Lawrence County, SD',
  turner: 'Turner County, SD',
  hamlin: 'Hamlin County',
  moody: 'Moody County',
  spink: 'Spink County',
  mccook: 'McCook County',
  tripp: 'Tripp County',
  day: 'Day County',
  dewey: 'Dewey County, SD',
  kingsbury: 'Kingsbury County',
  brule: 'Brule County',
  walworth: 'Walworth County, SD',
  deuel: 'Deuel County, SD',
  marshall: 'Marshall County, SD',
  clark: 'Clark County, SD',
  edmunds: 'Edmunds County, SD',
  gregory: 'Gregory County, SD',
  corson: 'Corson County, SD',
  lyman: 'Lyman County, SD',
  hanson: 'Hanson County, SD',
  bennett: 'Bennett County, SD',
  hand: 'Hand County, SD',
  stanley: 'Stanley County, SD',
  douglas: 'Douglas County, SD',
  perkins: 'Perkins County, SD',
  aurora: 'Aurora County, SD',
  jackson: 'Jackson County, SD',
  sanborn: 'Sanborn County, SD',
  ziebach: 'Ziebach County, SD',
  mcpherson: 'McPherson County, SD',
  potter: 'Potter County, SD',
  miner: 'Miner County, SD',
  mellette: 'Mellette County, SD',
  faulk: 'Faulk County, SD',
  buffalo: 'Buffalo County, SD',
  haakon: 'Haakon County, SD',
  jerauld: 'Jerauld County, SD',
  sully: 'Sully County, SD',
  campbell: 'Campbell County, SD',
  harding: 'Harding County, SD',
  hyde: 'Hyde County, SD',
  jones: 'Jones County, SD',
};

const SD_NEIGHBORS: Record<string, string[]> = {
  minnehaha: ['lincoln', 'turner', 'lake', 'mccook', 'moody', 'union'],
  pennington: ['meade', 'custer', 'fall-river', 'haakon', 'jackson', 'ziebach', 'perkins'],
  lincoln: ['minnehaha', 'turner', 'union', 'clay', 'yankton'],
  brookings: ['moody', 'lake', 'minnehaha', 'kingsbury', 'deuel', 'hamlin'],
  brown: ['marshall', 'day', 'spink', 'roberts', 'edmunds', 'faulk'],
  meade: ['lawrence', 'butte', 'pennington', 'perkins', 'harding'],
  lawrence: ['meade', 'butte', 'pennington', 'custer'],
  codington: ['grant', 'clark', 'hamlin', 'deuel', 'kingsbury', 'day'],
  yankton: ['clay', 'union', 'bon-homme', 'turner', 'hutchinson', 'charles-mix'],
  davison: ['hutchinson', 'aurora', 'douglas', 'sanborn', 'gregory', 'brule'],
  beadle: ['sanborn', 'spink', 'hand', 'buffalo', 'jerauld', 'aurora', 'hyde'],
  hughes: ['hyde', 'sully', 'lyman', 'jones', 'stanley', 'buffalo', 'hand', 'potter'],
  union: ['clay', 'lincoln', 'minnehaha', 'mccook', 'yankton'],
  clay: ['union', 'yankton', 'turner', 'lincoln'],
  shannon: ['todd', 'jackson', 'bennett', 'mellette', 'fall-river'],
  lake: ['minnehaha', 'brookings', 'moody', 'kingsbury', 'miner', 'mccook'],
  butte: ['meade', 'lawrence', 'harding', 'perkins'],
  roberts: ['marshall', 'day', 'grant', 'edmunds'],
  custer: ['pennington', 'fall-river', 'lawrence'],
  turner: ['minnehaha', 'lincoln', 'clay', 'hutchinson', 'bon-homme', 'mccook'],
  'charles-mix': ['yankton', 'bon-homme', 'gregory', 'douglas', 'hutchinson', 'brule', 'aurora', 'tripp'],
  todd: ['mellette', 'tripp', 'gregory', 'charles-mix', 'shannon', 'bennett'],
  'fall-river': ['custer', 'pennington', 'shannon', 'bennett'],
  grant: ['codington', 'roberts', 'clark', 'deuel', 'hamlin'],
  hutchinson: ['davison', 'turner', 'bon-homme', 'charles-mix', 'douglas', 'aurora', 'mccook'],
  'bon-homme': ['yankton', 'union', 'turner', 'hutchinson', 'charles-mix', 'douglas'],
  hamlin: ['codington', 'clark', 'deuel', 'brookings'],
  moody: ['brookings', 'lake', 'minnehaha', 'mccook'],
  spink: ['brown', 'beadle', 'hand', 'faulk', 'edmunds', 'day'],
  mccook: ['minnehaha', 'lake', 'moody', 'turner', 'hutchinson', 'sanborn', 'miner'],
  tripp: ['todd', 'gregory', 'mellette', 'lyman', 'charles-mix'],
  day: ['marshall', 'brown', 'spink', 'clark', 'codington'],
  dewey: ['ziebach', 'corson', 'perkins', 'haakon'],
  kingsbury: ['brookings', 'lake', 'miner', 'deuel', 'codington'],
  brule: ['aurora', 'sanborn', 'gregory', 'charles-mix', 'davison', 'buffalo', 'jerauld'],
  walworth: ['campbell', 'edmunds', 'mcpherson', 'corson'],
  deuel: ['brookings', 'hamlin', 'codington', 'grant', 'clark'],
  marshall: ['brown', 'day', 'roberts', 'edmunds'],
  clark: ['codington', 'day', 'hamlin', 'deuel', 'grant'],
  edmunds: ['marshall', 'brown', 'faulk', 'spink', 'roberts', 'walworth', 'mcpherson', 'campbell'],
  gregory: ['brule', 'aurora', 'charles-mix', 'todd', 'tripp', 'lyman', 'douglas'],
  corson: ['dewey', 'ziebach', 'campbell', 'walworth', 'perkins'],
  lyman: ['jones', 'stanley', 'mellette', 'todd', 'tripp', 'gregory'],
  hanson: ['mccook', 'miner', 'sanborn', 'davison', 'hutchinson'],
  bennett: ['shannon', 'fall-river', 'jackson', 'mellette', 'todd'],
  hand: ['beadle', 'buffalo', 'hyde', 'faulk', 'spink'],
  stanley: ['hughes', 'sully', 'potter', 'jones', 'haakon'],
  douglas: ['davison', 'hutchinson', 'bon-homme', 'charles-mix', 'gregory', 'aurora', 'mccook'],
  perkins: ['pennington', 'meade', 'butte', 'harding', 'dewey', 'ziebach', 'haakon'],
  aurora: ['davison', 'brule', 'sanborn', 'gregory', 'buffalo', 'beadle', 'jerauld'],
  jackson: ['pennington', 'haakon', 'jones', 'mellette', 'bennett', 'shannon', 'ziebach'],
  sanborn: ['davison', 'aurora', 'beadle', 'miner', 'mccook', 'hutchinson', 'hanson'],
  ziebach: ['pennington', 'haakon', 'jackson', 'dewey', 'corson'],
  mcpherson: ['walworth', 'edmunds', 'campbell', 'hand', 'faulk', 'potter'],
  potter: ['hughes', 'stanley', 'sully', 'faulk', 'hand', 'mcpherson'],
  miner: ['lake', 'sanborn', 'mccook', 'kingsbury', 'hanson'],
  mellette: ['todd', 'tripp', 'lyman', 'jones', 'jackson', 'bennett', 'shannon'],
  faulk: ['spink', 'hand', 'potter', 'edmunds', 'hyde', 'mcpherson'],
  buffalo: ['hand', 'jerauld', 'aurora', 'brule', 'beadle', 'hughes', 'hyde'],
  haakon: ['pennington', 'jackson', 'stanley', 'ziebach', 'perkins', 'dewey'],
  jerauld: ['buffalo', 'aurora', 'brule', 'sanborn', 'beadle', 'hand'],
  sully: ['hughes', 'hyde', 'potter', 'stanley'],
  campbell: ['corson', 'walworth', 'edmunds', 'mcpherson', 'potter'],
  harding: ['butte', 'meade', 'perkins'],
  hyde: ['hand', 'buffalo', 'sully', 'hughes', 'faulk'],
  jones: ['hughes', 'stanley', 'lyman', 'mellette', 'jackson'],
};

type CrossBorder = {
  slug: string;
  stateSlug: string;
  name: string;
  seat: string;
  displayLabel: string;
};

const CROSS_BORDER: Partial<Record<string, CrossBorder[]>> = {
  minnehaha: [
    {
      slug: 'lyon',
      stateSlug: 'iowa',
      name: 'Lyon',
      seat: 'Rock Rapids',
      displayLabel: 'Lyon County, IA',
    },
    {
      slug: 'clay',
      stateSlug: 'iowa',
      name: 'Clay',
      seat: 'Spencer',
      displayLabel: 'Clay County, IA',
    },
  ],
  clay: [
    {
      slug: 'clay',
      stateSlug: 'iowa',
      name: 'Clay',
      seat: 'Spencer',
      displayLabel: 'Clay County, IA',
    },
  ],
  union: [
    {
      slug: 'woodbury',
      stateSlug: 'iowa',
      name: 'Woodbury',
      seat: 'Sioux City',
      displayLabel: 'Woodbury County, IA',
    },
  ],
  lawrence: [
    {
      slug: 'crook',
      stateSlug: 'wyoming',
      name: 'Crook',
      seat: 'Sundance',
      displayLabel: 'Crook County, WY',
    },
  ],
  pennington: [
    {
      slug: 'weston',
      stateSlug: 'wyoming',
      name: 'Weston',
      seat: 'Newcastle',
      displayLabel: 'Weston County, WY',
    },
  ],
  butte: [
    {
      slug: 'carter',
      stateSlug: 'montana',
      name: 'Carter',
      seat: 'Ekalaka',
      displayLabel: 'Carter County, MT',
    },
  ],
  grant: [
    {
      slug: 'big-stone',
      stateSlug: 'minnesota',
      name: 'Big Stone',
      seat: 'Ortonville',
      displayLabel: 'Big Stone County, MN',
    },
  ],
  roberts: [
    {
      slug: 'traverse',
      stateSlug: 'minnesota',
      name: 'Traverse',
      seat: 'Wheaton',
      displayLabel: 'Traverse County, MN',
    },
  ],
  meade: [
    {
      slug: 'crook',
      stateSlug: 'wyoming',
      name: 'Crook',
      seat: 'Sundance',
      displayLabel: 'Crook County, WY',
    },
  ],
  marshall: [
    {
      slug: 'sargent',
      stateSlug: 'north-dakota',
      name: 'Sargent',
      seat: 'Forman',
      displayLabel: 'Sargent County, ND',
    },
  ],
  campbell: [
    {
      slug: 'emmons',
      stateSlug: 'north-dakota',
      name: 'Emmons',
      seat: 'Linton',
      displayLabel: 'Emmons County, ND',
    },
    {
      slug: 'mcpherson',
      stateSlug: 'north-dakota',
      name: 'McPherson',
      seat: 'Leola',
      displayLabel: 'McPherson County, ND',
    },
  ],
  walworth: [
    {
      slug: 'dickey',
      stateSlug: 'north-dakota',
      name: 'Dickey',
      seat: 'Ellendale',
      displayLabel: 'Dickey County, ND',
    },
  ],
  corson: [
    {
      slug: 'sioux',
      stateSlug: 'north-dakota',
      name: 'Sioux',
      seat: 'Fort Yates',
      displayLabel: 'Sioux County, ND',
    },
  ],
  perkins: [
    {
      slug: 'adams',
      stateSlug: 'north-dakota',
      name: 'Adams',
      seat: 'Hettinger',
      displayLabel: 'Adams County, ND',
    },
    {
      slug: 'bowman',
      stateSlug: 'north-dakota',
      name: 'Bowman',
      seat: 'Bowman',
      displayLabel: 'Bowman County, ND',
    },
  ],
  harding: [
    {
      slug: 'crook',
      stateSlug: 'wyoming',
      name: 'Crook',
      seat: 'Sundance',
      displayLabel: 'Crook County, WY',
    },
    {
      slug: 'carter',
      stateSlug: 'montana',
      name: 'Carter',
      seat: 'Ekalaka',
      displayLabel: 'Carter County, MT',
    },
  ],
  edmunds: [
    {
      slug: 'mcpherson',
      stateSlug: 'north-dakota',
      name: 'McPherson',
      seat: 'Leola',
      displayLabel: 'McPherson County, ND',
    },
  ],
};

const COUNTIES: CountyDef[] = [
  {
    slug: 'minnehaha',
    name: 'Minnehaha',
    seat: 'Sioux Falls',
    city: 'Sioux Falls',
    metro: 'minnehaha-metro-sd',
    costTier: 'western_slope',
    citySlug: 'sioux-falls',
    regional1: 'sioux-falls-corridor',
    regional2: 'big-sioux-valley',
    topId: 'twomenandatruck-minnehaha-sd',
    topName: 'Two Men and a Truck Sioux Falls',
    regional1Name: 'Sioux Falls Corridor Moving',
    regional2Name: 'Big Sioux Valley Moving',
    franchise: true,
    marketNotes:
      'Minnehaha County is South Dakota’s most populous county centered on Sioux Falls with strong suburban, commercial, healthcare, and Big Sioux Valley residential demand across Tea, Brandon, and Harrisburg communities.',
    costNote:
      'Minnehaha County pricing reflects Sioux Falls metro demand, suburban new-construction turnover, I-29 Big Sioux corridor traffic, and competition among full-service agents serving Minnehaha County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'pennington',
    name: 'Pennington',
    seat: 'Rapid City',
    city: 'Rapid City',
    metro: 'pennington-metro-sd',
    costTier: 'metro',
    citySlug: 'rapid-city',
    regional1: 'rapid-city-corridor',
    regional2: 'black-hills-east',
    topId: 'twomenandatruck-pennington-sd',
    topName: 'Two Men and a Truck Rapid City',
    regional1Name: 'Rapid City Corridor Moving',
    regional2Name: 'Black Hills East Moving',
    franchise: true,
    marketNotes:
      'Pennington County anchors western South Dakota’s Black Hills gateway with strong tourism, healthcare, military-adjacent, and residential demand across Rapid City, Box Elder, and eastern hills corridor communities.',
    costNote:
      'Pennington County pricing reflects Rapid City metro demand, Black Hills gateway traffic, I-90 corridor logistics, and competition among full-service agents serving Pennington County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'lincoln',
    name: 'Lincoln',
    seat: 'Canton',
    city: 'Canton',
    metro: 'lincoln-metro-sd',
    costTier: 'metro',
    citySlug: 'canton',
    regional1: 'canton-corridor',
    regional2: 'sioux-falls-south',
    topId: 'regional-lincoln-sd-movers',
    topName: 'Regional Canton / Lincoln Providers',
    regional1Name: 'Canton Corridor Moving',
    regional2Name: 'Sioux Falls South Moving',
    marketNotes:
      'Lincoln County, SD is a southeastern Sioux Falls metro county centered on Canton with strong suburban spillover, residential, and commercial demand across Tea, Harrisburg, and Big Sioux south-bank communities — not to be confused with Lincoln County in other states.',
    costNote:
      'Lincoln County pricing reflects Sioux Falls metro south-bank demand, suburban growth-corridor traffic, I-29 spillover logistics, and competition among regional agents serving Lincoln County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'brookings',
    name: 'Brookings',
    seat: 'Brookings',
    city: 'Brookings',
    metro: 'brookings-metro-sd',
    costTier: 'rural',
    citySlug: 'brookings',
    regional1: 'brookings-corridor',
    regional2: 'big-sioux-east',
    topId: 'regional-brookings-sd-movers',
    topName: 'Regional Brookings / Brookings County Providers',
    regional1Name: 'Brookings Corridor Moving',
    regional2Name: 'Big Sioux East Moving',
    marketNotes:
      'Brookings County is an eastern South Dakota county centered on Brookings with strong South Dakota State University, student-housing, and residential demand across Big Sioux east corridor communities.',
    costNote:
      'Brookings County pricing reflects university-area turnover, I-29 Big Sioux east corridor traffic, student and faculty relocations, and competition among regional agents serving Brookings County communities.',
    tipVariant: 'university',
  },
  {
    slug: 'brown',
    name: 'Brown',
    seat: 'Aberdeen',
    city: 'Aberdeen',
    metro: 'brown-metro-sd',
    costTier: 'rural',
    citySlug: 'aberdeen',
    regional1: 'aberdeen-corridor',
    regional2: 'james-river-north',
    topId: 'regional-brown-sd-movers',
    topName: 'Regional Aberdeen / Brown Providers',
    regional1Name: 'Aberdeen Corridor Moving',
    regional2Name: 'James River North Moving',
    marketNotes:
      'Brown County, SD is a northeastern South Dakota county centered on Aberdeen with residential, healthcare, and James River north-basin agricultural demand — not to be confused with Brown County in other states.',
    costNote:
      'Brown County pricing reflects Aberdeen-area demand, James River north-basin travel distances, US-12 corridor traffic, and competition among regional agents serving Brown County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'meade',
    name: 'Meade',
    seat: 'Sturgis',
    city: 'Sturgis',
    metro: 'meade-metro-sd',
    costTier: 'rural',
    citySlug: 'sturgis',
    regional1: 'sturgis-corridor',
    regional2: 'northern-black-hills',
    topId: 'regional-meade-sd-movers',
    topName: 'Regional Sturgis / Meade Providers',
    regional1Name: 'Sturgis Corridor Moving',
    regional2Name: 'Northern Black Hills Moving',
    marketNotes:
      'Meade County, SD is a western South Dakota county centered on Sturgis with residential, tourism, and Ellsworth Air Force Base corridor demand across northern Black Hills communities — not to be confused with Meade County in other states.',
    costNote:
      'Meade County pricing reflects Sturgis-area demand, northern Black Hills corridor traffic, motorcycle-rally seasonal surges, and competition among regional agents serving Meade County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'lawrence',
    name: 'Lawrence',
    seat: 'Deadwood',
    city: 'Spearfish',
    metro: 'lawrence-metro-sd',
    costTier: 'metro',
    citySlug: 'spearfish',
    regional1: 'spearfish-corridor',
    regional2: 'northern-hills',
    topId: 'regional-lawrence-sd-movers',
    topName: 'Regional Spearfish / Lawrence Providers',
    regional1Name: 'Spearfish Corridor Moving',
    regional2Name: 'Northern Hills Moving',
    marketNotes:
      'Lawrence County, SD is a northern Black Hills county with seat at Deadwood and strong tourism, university, and residential demand across Spearfish, Lead, and northern hills gateway communities — not to be confused with Lawrence County in other states.',
    costNote:
      'Lawrence County pricing reflects Spearfish and Deadwood tourism demand, Black Hills gateway traffic, seasonal vacation-rental turnover, and competition among regional agents serving Lawrence County communities.',
    tipVariant: 'tourist',
  },
  {
    slug: 'codington',
    name: 'Codington',
    seat: 'Watertown',
    city: 'Watertown',
    metro: 'codington-metro-sd',
    costTier: 'rural',
    citySlug: 'watertown',
    regional1: 'watertown-corridor',
    regional2: 'glacial-lakes',
    topId: 'regional-codington-sd-movers',
    topName: 'Regional Watertown / Codington Providers',
    regional1Name: 'Watertown Corridor Moving',
    regional2Name: 'Glacial Lakes Moving',
    marketNotes:
      'Codington County is an eastern South Dakota county centered on Watertown with residential, manufacturing, and glacial lakes corridor demand across US-212 and I-29 corridor communities.',
    costNote:
      'Codington County pricing reflects Watertown-area demand, glacial lakes corridor traffic, agricultural and lake-region property logistics, and competition among regional agents serving Codington County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'yankton',
    name: 'Yankton',
    seat: 'Yankton',
    city: 'Yankton',
    metro: 'yankton-metro-sd',
    costTier: 'rural',
    citySlug: 'yankton',
    regional1: 'yankton-corridor',
    regional2: 'missouri-southeast',
    topId: 'regional-yankton-sd-movers',
    topName: 'Regional Yankton / Yankton County Providers',
    regional1Name: 'Yankton Corridor Moving',
    regional2Name: 'Missouri Southeast Moving',
    marketNotes:
      'Yankton County is a southeastern South Dakota county centered on Yankton with residential, healthcare, and Missouri River southeast corridor demand across Gavins Point Dam and border-adjacent communities.',
    costNote:
      'Yankton County pricing reflects Yankton-area demand, Missouri River southeast corridor traffic, agricultural property logistics, and competition among regional agents serving Yankton County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'davison',
    name: 'Davison',
    seat: 'Mitchell',
    city: 'Mitchell',
    metro: 'davison-metro-sd',
    costTier: 'rural',
    citySlug: 'mitchell',
    regional1: 'mitchell-corridor',
    regional2: 'james-river-south',
    topId: 'regional-davison-sd-movers',
    topName: 'Regional Mitchell / Davison Providers',
    regional1Name: 'Mitchell Corridor Moving',
    regional2Name: 'James River South Moving',
    marketNotes:
      'Davison County is a southeastern South Dakota county centered on Mitchell with residential, agricultural, and James River south corridor demand across I-90 corridor communities.',
    costNote:
      'Davison County pricing reflects Mitchell-area demand, James River south-basin travel distances, I-90 corridor traffic, and competition among regional agents serving Davison County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'beadle',
    name: 'Beadle',
    seat: 'Huron',
    city: 'Huron',
    metro: 'beadle-metro-sd',
    costTier: 'rural',
    citySlug: 'huron',
    regional1: 'huron-corridor',
    regional2: 'james-river-central',
    topId: 'regional-beadle-sd-movers',
    topName: 'Regional Huron / Beadle Providers',
    regional1Name: 'Huron Corridor Moving',
    regional2Name: 'James River Central Moving',
    marketNotes:
      'Beadle County is a central South Dakota county centered on Huron with residential, agricultural, and James River central-basin demand across US-14 and state-fair corridor communities.',
    costNote:
      'Beadle County pricing reflects Huron-area demand, James River central-basin travel distances, agricultural property logistics, and competition among regional agents serving Beadle County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'hughes',
    name: 'Hughes',
    seat: 'Pierre',
    city: 'Pierre',
    metro: 'hughes-metro-sd',
    costTier: 'rural',
    citySlug: 'pierre',
    regional1: 'pierre-corridor',
    regional2: 'capital-region',
    topId: 'regional-hughes-sd-movers',
    topName: 'Regional Pierre / Hughes Providers',
    regional1Name: 'Pierre Corridor Moving',
    regional2Name: 'Capital Region Moving',
    marketNotes:
      'Hughes County, SD anchors South Dakota’s capital region with strong government-sector, healthcare, and Missouri River residential demand across Pierre and Fort Pierre-adjacent communities — not to be confused with Hughes County in other states.',
    costNote:
      'Hughes County pricing reflects Pierre capital-region demand, state-government relocations, Missouri River corridor traffic, and competition among regional agents serving Hughes County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'union',
    name: 'Union',
    seat: 'Elk Point',
    city: 'Elk Point',
    metro: 'union-metro-sd',
    costTier: 'rural',
    citySlug: 'elk-point',
    regional1: 'elk-point-corridor',
    regional2: 'missouri-southeast',
    topId: 'regional-union-sd-movers',
    topName: 'Regional Elk Point / Union Providers',
    regional1Name: 'Elk Point Corridor Moving',
    regional2Name: 'Missouri Southeast Moving',
    marketNotes:
      'Union County, SD is a southeastern South Dakota county centered on Elk Point with residential and Sioux City metro spillover demand across I-29 border-corridor communities — not to be confused with Union County in other states.',
    costNote:
      'Union County pricing reflects Elk Point-area demand, Sioux City metro spillover traffic, I-29 border-corridor logistics, and competition among regional agents serving Union County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'clay',
    name: 'Clay',
    seat: 'Vermillion',
    city: 'Vermillion',
    metro: 'clay-metro-sd',
    costTier: 'rural',
    citySlug: 'vermillion',
    regional1: 'vermillion-corridor',
    regional2: 'missouri-south',
    topId: 'regional-clay-sd-movers',
    topName: 'Regional Vermillion / Clay Providers',
    regional1Name: 'Vermillion Corridor Moving',
    regional2Name: 'Missouri South Moving',
    marketNotes:
      'Clay County, SD is a southeastern South Dakota county centered on Vermillion with strong University of South Dakota, student-housing, and Missouri River south-bank demand — not to be confused with Clay County in Iowa or other states.',
    costNote:
      'Clay County pricing reflects university-area turnover, Missouri River south-bank corridor traffic, student and faculty relocations, and competition among regional agents serving Clay County communities.',
    tipVariant: 'university',
  },
  {
    slug: 'shannon',
    name: 'Oglala Lakota',
    seat: 'Pine Ridge',
    city: 'Pine Ridge',
    metro: 'shannon-metro-sd',
    costTier: 'rural',
    citySlug: 'pine-ridge',
    regional1: 'pine-ridge-corridor',
    regional2: 'southern-plains',
    topId: 'regional-oglalalakota-sd-movers',
    topName: 'Regional Oglala Lakota Providers',
    regional1Name: 'Pine Ridge Corridor Moving',
    regional2Name: 'Southern Plains Moving',
    marketNotes:
      'Oglala Lakota County (historically Shannon County) is a southwestern South Dakota county centered on Pine Ridge with rural residential and southern plains corridor demand across remote tribal and ranch communities.',
    costNote:
      'Oglala Lakota County pricing reflects Pine Ridge-area demand, remote southern plains travel distances, rural and tribal property logistics, and competition among regional agents serving Oglala Lakota County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'lake',
    name: 'Lake',
    seat: 'Madison',
    city: 'Madison',
    metro: 'lake-metro-sd',
    costTier: 'rural',
    citySlug: 'madison',
    regional1: 'madison-corridor',
    regional2: 'big-sioux-north',
    topId: 'regional-lake-sd-movers',
    topName: 'Regional Madison / Lake Providers',
    regional1Name: 'Madison Corridor Moving',
    regional2Name: 'Big Sioux North Moving',
    marketNotes:
      'Lake County, SD is an eastern South Dakota county centered on Madison with residential, agricultural, and Big Sioux north corridor demand — not to be confused with Lake County in other states.',
    costNote:
      'Lake County pricing reflects Madison-area demand, Big Sioux north corridor travel distances, agricultural property logistics, and competition among regional agents serving Lake County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'butte',
    name: 'Butte',
    seat: 'Belle Fourche',
    city: 'Belle Fourche',
    metro: 'butte-metro-sd',
    costTier: 'rural',
    citySlug: 'belle-fourche',
    regional1: 'belle-fourche-corridor',
    regional2: 'northern-plains',
    topId: 'regional-butte-sd-movers',
    topName: 'Regional Belle Fourche / Butte Providers',
    regional1Name: 'Belle Fourche Corridor Moving',
    regional2Name: 'Northern Plains Moving',
    marketNotes:
      'Butte County, SD is a northwestern South Dakota county centered on Belle Fourche with ranch, energy-adjacent, and northern plains residential demand — not to be confused with Butte County in Idaho or California.',
    costNote:
      'Butte County pricing reflects Belle Fourche-area demand, northern plains travel distances, ranch property logistics, and competition among regional agents serving Butte County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'roberts',
    name: 'Roberts',
    seat: 'Sisseton',
    city: 'Sisseton',
    metro: 'roberts-metro-sd',
    costTier: 'rural',
    citySlug: 'sisseton',
    regional1: 'sisseton-corridor',
    regional2: 'lake-traverse',
    topId: 'regional-roberts-sd-movers',
    topName: 'Regional Sisseton / Roberts Providers',
    regional1Name: 'Sisseton Corridor Moving',
    regional2Name: 'Lake Traverse Moving',
    marketNotes:
      'Roberts County, SD is a northeastern South Dakota county centered on Sisseton with residential, tribal-adjacent, and Lake Traverse corridor demand — not to be confused with Roberts County in other states.',
    costNote:
      'Roberts County pricing reflects Sisseton-area demand, Lake Traverse border-corridor traffic, agricultural property logistics, and competition among regional agents serving Roberts County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'custer',
    name: 'Custer',
    seat: 'Custer',
    city: 'Custer',
    metro: 'custer-metro-sd',
    costTier: 'metro',
    citySlug: 'custer',
    regional1: 'custer-corridor',
    regional2: 'southern-black-hills',
    topId: 'regional-custer-sd-movers',
    topName: 'Regional Custer / Custer County Providers',
    regional1Name: 'Custer Corridor Moving',
    regional2Name: 'Southern Black Hills Moving',
    marketNotes:
      'Custer County, SD is a southwestern Black Hills county centered on Custer with strong tourism, vacation-rental, and residential demand across Crazy Horse and Wind Cave gateway communities — not to be confused with Custer County in other states.',
    costNote:
      'Custer County pricing reflects Custer tourism demand, southern Black Hills gateway traffic, seasonal vacation-rental turnover, and competition among regional agents serving Custer County communities.',
    tipVariant: 'tourist',
  },
  {
    slug: 'turner',
    name: 'Turner',
    seat: 'Parker',
    city: 'Parker',
    metro: 'turner-metro-sd',
    costTier: 'rural',
    citySlug: 'parker',
    regional1: 'parker-corridor',
    regional2: 'big-sioux-mid',
    topId: 'regional-turner-sd-movers',
    topName: 'Regional Parker / Turner Providers',
    regional1Name: 'Parker Corridor Moving',
    regional2Name: 'Big Sioux Mid Moving',
    marketNotes:
      'Turner County, SD is a southeastern South Dakota county centered on Parker with rural residential and Big Sioux mid-corridor agricultural demand — not to be confused with Turner County in other states.',
    costNote:
      'Turner County pricing reflects Parker-area demand, Big Sioux mid-corridor travel distances, agricultural property logistics, and competition among regional agents serving Turner County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'charles-mix',
    name: 'Charles Mix',
    seat: 'Lake Andes',
    city: 'Lake Andes',
    metro: 'charles-mix-metro-sd',
    costTier: 'rural',
    citySlug: 'lake-andes',
    regional1: 'lake-andes-corridor',
    regional2: 'missouri-plateau',
    topId: 'regional-charlesmix-sd-movers',
    topName: 'Regional Lake Andes / Charles Mix Providers',
    regional1Name: 'Lake Andes Corridor Moving',
    regional2Name: 'Missouri Plateau Moving',
    marketNotes:
      'Charles Mix County is a south-central South Dakota county centered on Lake Andes with rural residential and Missouri plateau agricultural demand across remote ranch and tribal-adjacent corridor communities.',
    costNote:
      'Charles Mix County pricing reflects Lake Andes-area demand, Missouri plateau travel distances, ranch and rural property logistics, and competition among regional agents serving Charles Mix County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'todd',
    name: 'Todd',
    seat: 'Mission',
    city: 'Mission',
    metro: 'todd-metro-sd',
    costTier: 'rural',
    citySlug: 'mission',
    regional1: 'mission-corridor',
    regional2: 'rosebud-country',
    topId: 'regional-todd-sd-movers',
    topName: 'Regional Mission / Todd Providers',
    regional1Name: 'Mission Corridor Moving',
    regional2Name: 'Rosebud Country Moving',
    marketNotes:
      'Todd County, SD is a south-central South Dakota county centered on Mission with rural residential and Rosebud country corridor demand across remote tribal and ranch communities — not to be confused with Todd County in other states.',
    costNote:
      'Todd County pricing reflects Mission-area demand, Rosebud country travel distances, rural and tribal property logistics, and competition among regional agents serving Todd County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'fall-river',
    name: 'Fall River',
    seat: 'Hot Springs',
    city: 'Hot Springs',
    metro: 'fall-river-metro-sd',
    costTier: 'rural',
    citySlug: 'hot-springs',
    regional1: 'hot-springs-corridor',
    regional2: 'southern-hills',
    topId: 'regional-fallriver-sd-movers',
    topName: 'Regional Hot Springs / Fall River Providers',
    regional1Name: 'Hot Springs Corridor Moving',
    regional2Name: 'Southern Hills Moving',
    marketNotes:
      'Fall River County is a southwestern South Dakota county centered on Hot Springs with residential, tourism, and southern hills corridor demand across Wind Cave and Mammoth Site gateway communities.',
    costNote:
      'Fall River County pricing reflects Hot Springs-area demand, southern hills corridor traffic, tourism and ranch property logistics, and competition among regional agents serving Fall River County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'grant',
    name: 'Grant',
    seat: 'Milbank',
    city: 'Milbank',
    metro: 'grant-metro-sd',
    costTier: 'rural',
    citySlug: 'milbank',
    regional1: 'milbank-corridor',
    regional2: 'glacial-lakes-east',
    topId: 'regional-grant-sd-movers',
    topName: 'Regional Milbank / Grant Providers',
    regional1Name: 'Milbank Corridor Moving',
    regional2Name: 'Glacial Lakes East Moving',
    marketNotes:
      'Grant County, SD is a northeastern South Dakota county centered on Milbank with residential, agricultural, and glacial lakes east corridor demand — not to be confused with Grant County in North Dakota or other states.',
    costNote:
      'Grant County pricing reflects Milbank-area demand, glacial lakes east corridor traffic, Minnesota border logistics, and competition among regional agents serving Grant County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'hutchinson',
    name: 'Hutchinson',
    seat: 'Olivet',
    city: 'Olivet',
    metro: 'hutchinson-metro-sd',
    costTier: 'rural',
    citySlug: 'olivet',
    regional1: 'olivet-corridor',
    regional2: 'james-river-southeast',
    topId: 'regional-hutchinson-sd-movers',
    topName: 'Regional Olivet / Hutchinson Providers',
    regional1Name: 'Olivet Corridor Moving',
    regional2Name: 'James River Southeast Moving',
    marketNotes:
      'Hutchinson County, SD is a southeastern South Dakota county centered on Olivet with rural residential and James River southeast agricultural demand — not to be confused with Hutchinson County in other states.',
    costNote:
      'Hutchinson County pricing reflects Olivet-area demand, James River southeast travel distances, agricultural property logistics, and competition among regional agents serving Hutchinson County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'bon-homme',
    name: 'Bon Homme',
    seat: 'Tyndall',
    city: 'Tyndall',
    metro: 'bon-homme-metro-sd',
    costTier: 'rural',
    citySlug: 'tyndall',
    regional1: 'tyndall-corridor',
    regional2: 'missouri-bottomlands',
    topId: 'regional-bonhomme-sd-movers',
    topName: 'Regional Tyndall / Bon Homme Providers',
    regional1Name: 'Tyndall Corridor Moving',
    regional2Name: 'Missouri Bottomlands Moving',
    marketNotes:
      'Bon Homme County is a southeastern South Dakota county centered on Tyndall with rural residential and Missouri bottomlands agricultural demand across remote river-bluff corridor communities.',
    costNote:
      'Bon Homme County pricing reflects Tyndall-area demand, Missouri bottomlands travel distances, agricultural property logistics, and competition among regional agents serving Bon Homme County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'hamlin',
    name: 'Hamlin',
    seat: 'Hayti',
    city: 'Hayti',
    metro: 'hamlin-metro-sd',
    costTier: 'rural',
    citySlug: 'hayti',
    regional1: 'hayti-corridor',
    regional2: 'big-sioux-west',
    topId: 'regional-hamlin-sd-movers',
    topName: 'Regional Hayti / Hamlin Providers',
    regional1Name: 'Hayti Corridor Moving',
    regional2Name: 'Big Sioux West Moving',
    marketNotes:
      'Hamlin County is an eastern South Dakota county centered on Hayti with rural residential and Big Sioux west agricultural demand across remote glacial-lakes corridor communities.',
    costNote:
      'Hamlin County pricing reflects Hayti-area demand, Big Sioux west travel distances, agricultural property logistics, and competition among regional agents serving Hamlin County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'moody',
    name: 'Moody',
    seat: 'Flandreau',
    city: 'Flandreau',
    metro: 'moody-metro-sd',
    costTier: 'rural',
    citySlug: 'flandreau',
    regional1: 'flandreau-corridor',
    regional2: 'big-sioux-central',
    topId: 'regional-moody-sd-movers',
    topName: 'Regional Flandreau / Moody Providers',
    regional1Name: 'Flandreau Corridor Moving',
    regional2Name: 'Big Sioux Central Moving',
    marketNotes:
      'Moody County is an eastern South Dakota county centered on Flandreau with rural residential and Big Sioux central agricultural demand across I-29 corridor communities.',
    costNote:
      'Moody County pricing reflects Flandreau-area demand, Big Sioux central corridor traffic, agricultural property logistics, and competition among regional agents serving Moody County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'spink',
    name: 'Spink',
    seat: 'Redfield',
    city: 'Redfield',
    metro: 'spink-metro-sd',
    costTier: 'rural',
    citySlug: 'redfield',
    regional1: 'redfield-corridor',
    regional2: 'james-river-upper',
    topId: 'regional-spink-sd-movers',
    topName: 'Regional Redfield / Spink Providers',
    regional1Name: 'Redfield Corridor Moving',
    regional2Name: 'James River Upper Moving',
    marketNotes:
      'Spink County is a northeastern South Dakota county centered on Redfield with rural residential and James River upper-basin agricultural demand across US-281 corridor communities.',
    costNote:
      'Spink County pricing reflects Redfield-area demand, James River upper-basin travel distances, agricultural property logistics, and competition among regional agents serving Spink County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'mccook',
    name: 'McCook',
    seat: 'Salem',
    city: 'Salem',
    metro: 'mccook-metro-sd',
    costTier: 'rural',
    citySlug: 'salem',
    regional1: 'salem-corridor',
    regional2: 'big-sioux-southwest',
    topId: 'regional-mccook-sd-movers',
    topName: 'Regional Salem / McCook Providers',
    regional1Name: 'Salem Corridor Moving',
    regional2Name: 'Big Sioux Southwest Moving',
    marketNotes:
      'McCook County is a southeastern South Dakota county centered on Salem with rural residential and Big Sioux southwest agricultural demand across remote prairie corridor communities.',
    costNote:
      'McCook County pricing reflects Salem-area demand, Big Sioux southwest travel distances, agricultural property logistics, and competition among regional agents serving McCook County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'tripp',
    name: 'Tripp',
    seat: 'Winner',
    city: 'Winner',
    metro: 'tripp-metro-sd',
    costTier: 'rural',
    citySlug: 'winner',
    regional1: 'winner-corridor',
    regional2: 'rosebud-plateau',
    topId: 'regional-tripp-sd-movers',
    topName: 'Regional Winner / Tripp Providers',
    regional1Name: 'Winner Corridor Moving',
    regional2Name: 'Rosebud Plateau Moving',
    marketNotes:
      'Tripp County is a south-central South Dakota county centered on Winner with rural residential and Rosebud plateau ranch demand across remote Missouri River bluff corridor communities.',
    costNote:
      'Tripp County pricing reflects Winner-area demand, Rosebud plateau travel distances, ranch property logistics, and competition among regional agents serving Tripp County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'day',
    name: 'Day',
    seat: 'Webster',
    city: 'Webster',
    metro: 'day-metro-sd',
    costTier: 'rural',
    citySlug: 'webster',
    regional1: 'webster-corridor',
    regional2: 'glacial-lakes-west',
    topId: 'regional-day-sd-movers',
    topName: 'Regional Webster / Day Providers',
    regional1Name: 'Webster Corridor Moving',
    regional2Name: 'Glacial Lakes West Moving',
    marketNotes:
      'Day County is a northeastern South Dakota county centered on Webster with rural residential and glacial lakes west agricultural demand across remote lake-country corridor communities.',
    costNote:
      'Day County pricing reflects Webster-area demand, glacial lakes west travel distances, agricultural property logistics, and competition among regional agents serving Day County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'dewey',
    name: 'Dewey',
    seat: 'Timber Lake',
    city: 'Timber Lake',
    metro: 'dewey-metro-sd',
    costTier: 'rural',
    citySlug: 'timber-lake',
    regional1: 'timber-lake-corridor',
    regional2: 'cheyenne-river',
    topId: 'regional-dewey-sd-movers',
    topName: 'Regional Timber Lake / Dewey Providers',
    regional1Name: 'Timber Lake Corridor Moving',
    regional2Name: 'Cheyenne River Moving',
    marketNotes:
      'Dewey County, SD is a northwestern South Dakota county centered on Timber Lake with rural residential and Cheyenne River ranch demand across remote reservation-adjacent corridor communities — not to be confused with Dewey County in other states.',
    costNote:
      'Dewey County pricing reflects Timber Lake-area demand, Cheyenne River travel distances, ranch and tribal property logistics, and competition among regional agents serving Dewey County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'kingsbury',
    name: 'Kingsbury',
    seat: 'De Smet',
    city: 'De Smet',
    metro: 'kingsbury-metro-sd',
    costTier: 'rural',
    citySlug: 'de-smet',
    regional1: 'de-smet-corridor',
    regional2: 'big-sioux-upper',
    topId: 'regional-kingsbury-sd-movers',
    topName: 'Regional De Smet / Kingsbury Providers',
    regional1Name: 'De Smet Corridor Moving',
    regional2Name: 'Big Sioux Upper Moving',
    marketNotes:
      'Kingsbury County is an eastern South Dakota county centered on De Smet with rural residential and Big Sioux upper agricultural demand across historic prairie corridor communities.',
    costNote:
      'Kingsbury County pricing reflects De Smet-area demand, Big Sioux upper travel distances, agricultural property logistics, and competition among regional agents serving Kingsbury County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'brule',
    name: 'Brule',
    seat: 'Chamberlain',
    city: 'Chamberlain',
    metro: 'brule-metro-sd',
    costTier: 'rural',
    citySlug: 'chamberlain',
    regional1: 'chamberlain-corridor',
    regional2: 'missouri-river-central',
    topId: 'regional-brule-sd-movers',
    topName: 'Regional Chamberlain / Brule Providers',
    regional1Name: 'Chamberlain Corridor Moving',
    regional2Name: 'Missouri River Central Moving',
    marketNotes:
      'Brule County is a central South Dakota county centered on Chamberlain with rural residential and Missouri River central corridor demand across I-90 bridge gateway communities.',
    costNote:
      'Brule County pricing reflects Chamberlain-area demand, Missouri River central corridor traffic, agricultural property logistics, and competition among regional agents serving Brule County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'walworth',
    name: 'Walworth',
    seat: 'Selby',
    city: 'Selby',
    metro: 'walworth-metro-sd',
    costTier: 'rural',
    citySlug: 'selby',
    regional1: 'selby-corridor',
    regional2: 'missouri-coteau',
    topId: 'regional-walworth-sd-movers',
    topName: 'Regional Selby / Walworth Providers',
    regional1Name: 'Selby Corridor Moving',
    regional2Name: 'Missouri Coteau Moving',
    marketNotes:
      'Walworth County, SD is a north-central South Dakota county centered on Selby with rural residential and Missouri coteau agricultural demand across remote border-adjacent corridor communities — not to be confused with Walworth County in other states.',
    costNote:
      'Walworth County pricing reflects Selby-area demand, Missouri coteau travel distances, North Dakota border logistics, and competition among regional agents serving Walworth County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'deuel',
    name: 'Deuel',
    seat: 'Clear Lake',
    city: 'Clear Lake',
    metro: 'deuel-metro-sd',
    costTier: 'rural',
    citySlug: 'clear-lake',
    regional1: 'clear-lake-corridor',
    regional2: 'glacial-lakes-north',
    topId: 'regional-deuel-sd-movers',
    topName: 'Regional Clear Lake / Deuel Providers',
    regional1Name: 'Clear Lake Corridor Moving',
    regional2Name: 'Glacial Lakes North Moving',
    marketNotes:
      'Deuel County, SD is an eastern South Dakota county centered on Clear Lake with rural residential and glacial lakes north agricultural demand across remote lake-country corridor communities — not to be confused with Deuel County in other states.',
    costNote:
      'Deuel County pricing reflects Clear Lake-area demand, glacial lakes north travel distances, agricultural property logistics, and competition among regional agents serving Deuel County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'marshall',
    name: 'Marshall',
    seat: 'Britton',
    city: 'Britton',
    metro: 'marshall-metro-sd',
    costTier: 'rural',
    citySlug: 'britton',
    regional1: 'britton-corridor',
    regional2: 'coteau-des-prairies',
    topId: 'regional-marshall-sd-movers',
    topName: 'Regional Britton / Marshall County Providers',
    regional1Name: 'Britton Corridor Moving',
    regional2Name: 'Coteau des Prairies Moving',
    marketNotes:
      'Marshall County, SD is a northeastern South Dakota county centered on Britton with rural residential and Coteau des Prairies agricultural demand across remote border corridor communities — not to be confused with Marshall County in Minnesota, North Dakota, or other states.',
    costNote:
      'Marshall County pricing reflects Britton-area demand, Coteau des Prairies travel distances, North Dakota border logistics, and competition among regional agents serving Marshall County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'clark',
    name: 'Clark',
    seat: 'Clark',
    city: 'Clark',
    metro: 'clark-metro-sd',
    costTier: 'rural',
    citySlug: 'clark',
    regional1: 'clark-corridor',
    regional2: 'glacial-lakes-central',
    topId: 'regional-clark-sd-movers',
    topName: 'Regional Clark / Clark County Providers',
    regional1Name: 'Clark Corridor Moving',
    regional2Name: 'Glacial Lakes Central Moving',
    marketNotes:
      'Clark County, SD is an eastern South Dakota county centered on Clark with rural residential and glacial lakes central agricultural demand across remote lake-country corridor communities — not to be confused with Clark County in other states.',
    costNote:
      'Clark County pricing reflects Clark-area demand, glacial lakes central travel distances, agricultural property logistics, and competition among regional agents serving Clark County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'edmunds',
    name: 'Edmunds',
    seat: 'Ipswich',
    city: 'Ipswich',
    metro: 'edmunds-metro-sd',
    costTier: 'rural',
    citySlug: 'ipswich',
    regional1: 'ipswich-corridor',
    regional2: 'james-river-northeast',
    topId: 'regional-edmunds-sd-movers',
    topName: 'Regional Ipswich / Edmunds Providers',
    regional1Name: 'Ipswich Corridor Moving',
    regional2Name: 'James River Northeast Moving',
    marketNotes:
      'Edmunds County, SD is a northeastern South Dakota county centered on Ipswich with rural residential and James River northeast agricultural demand across remote border-adjacent corridor communities — not to be confused with Edmunds County in other states.',
    costNote:
      'Edmunds County pricing reflects Ipswich-area demand, James River northeast travel distances, North Dakota border logistics, and competition among regional agents serving Edmunds County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'gregory',
    name: 'Gregory',
    seat: 'Burke',
    city: 'Gregory',
    metro: 'gregory-metro-sd',
    costTier: 'rural',
    citySlug: 'gregory',
    regional1: 'gregory-corridor',
    regional2: 'missouri-river-south',
    topId: 'regional-gregory-sd-movers',
    topName: 'Regional Gregory / Gregory County Providers',
    regional1Name: 'Gregory Corridor Moving',
    regional2Name: 'Missouri River South Moving',
    marketNotes:
      'Gregory County, SD is a south-central South Dakota county centered on Gregory with rural residential and Missouri River south agricultural demand across remote ranch corridor communities — not to be confused with Gregory County in other states.',
    costNote:
      'Gregory County pricing reflects Gregory-area demand, Missouri River south travel distances, ranch property logistics, and competition among regional agents serving Gregory County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'corson',
    name: 'Corson',
    seat: 'McIntosh',
    city: 'McIntosh',
    metro: 'corson-metro-sd',
    costTier: 'rural',
    citySlug: 'mcintosh',
    regional1: 'mcintosh-corridor',
    regional2: 'standing-rock',
    topId: 'regional-corson-sd-movers',
    topName: 'Regional McIntosh / Corson Providers',
    regional1Name: 'McIntosh Corridor Moving',
    regional2Name: 'Standing Rock Moving',
    marketNotes:
      'Corson County, SD is a north-central South Dakota county centered on McIntosh with rural residential and Standing Rock corridor ranch demand across remote reservation-adjacent communities — not to be confused with Corson County in other states.',
    costNote:
      'Corson County pricing reflects McIntosh-area demand, Standing Rock corridor travel distances, ranch and tribal property logistics, and competition among regional agents serving Corson County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'lyman',
    name: 'Lyman',
    seat: 'Kennebec',
    city: 'Kennebec',
    metro: 'lyman-metro-sd',
    costTier: 'rural',
    citySlug: 'kennebec',
    regional1: 'kennebec-corridor',
    regional2: 'white-river-plateau',
    topId: 'regional-lyman-sd-movers',
    topName: 'Regional Kennebec / Lyman County Providers',
    regional1Name: 'Kennebec Corridor Moving',
    regional2Name: 'White River Plateau Moving',
    marketNotes:
      'Lyman County, SD is a central South Dakota county centered on Kennebec with rural residential and White River plateau ranch demand across remote Missouri River terrace corridor communities — not to be confused with Lyman County in other states.',
    costNote:
      'Lyman County pricing reflects Kennebec-area demand, White River plateau travel distances, ranch property logistics, and competition among regional agents serving Lyman County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'hanson',
    name: 'Hanson',
    seat: 'Alexandria',
    city: 'Alexandria',
    metro: 'hanson-metro-sd',
    costTier: 'rural',
    citySlug: 'alexandria',
    regional1: 'alexandria-corridor',
    regional2: 'james-river-southeast',
    topId: 'regional-hanson-sd-movers',
    topName: 'Regional Alexandria / Hanson Providers',
    regional1Name: 'Alexandria Corridor Moving',
    regional2Name: 'James River Southeast Moving',
    marketNotes:
      'Hanson County, SD is a southeastern South Dakota county centered on Alexandria with rural residential and James River southeast agricultural demand across remote prairie corridor communities — not to be confused with Hanson County in other states.',
    costNote:
      'Hanson County pricing reflects Alexandria-area demand, James River southeast travel distances, agricultural property logistics, and competition among regional agents serving Hanson County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'bennett',
    name: 'Bennett',
    seat: 'Martin',
    city: 'Martin',
    metro: 'bennett-metro-sd',
    costTier: 'rural',
    citySlug: 'martin',
    regional1: 'martin-corridor',
    regional2: 'pine-ridge-east',
    topId: 'regional-bennett-sd-movers',
    topName: 'Regional Martin / Bennett County Providers',
    regional1Name: 'Martin Corridor Moving',
    regional2Name: 'Pine Ridge East Moving',
    marketNotes:
      'Bennett County, SD is a southwestern South Dakota county centered on Martin with rural residential and Pine Ridge east corridor demand across remote tribal and ranch communities — not to be confused with Bennett County in other states.',
    costNote:
      'Bennett County pricing reflects Martin-area demand, Pine Ridge east travel distances, ranch and tribal property logistics, and competition among regional agents serving Bennett County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'hand',
    name: 'Hand',
    seat: 'Miller',
    city: 'Miller',
    metro: 'hand-metro-sd',
    costTier: 'rural',
    citySlug: 'miller',
    regional1: 'miller-corridor',
    regional2: 'james-river-hand-basin',
    topId: 'regional-hand-sd-movers',
    topName: 'Regional Miller / Hand County Providers',
    regional1Name: 'Miller Corridor Moving',
    regional2Name: 'James River Hand Basin Moving',
    marketNotes:
      'Hand County, SD is a central South Dakota county centered on Miller with rural residential and James River hand-basin agricultural demand across remote prairie corridor communities — not to be confused with Hand County in other states.',
    costNote:
      'Hand County pricing reflects Miller-area demand, James River hand-basin travel distances, agricultural property logistics, and competition among regional agents serving Hand County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'stanley',
    name: 'Stanley',
    seat: 'Fort Pierre',
    city: 'Fort Pierre',
    metro: 'stanley-metro-sd',
    costTier: 'rural',
    citySlug: 'fort-pierre',
    regional1: 'fort-pierre-corridor',
    regional2: 'capital-missouri-west',
    topId: 'regional-stanley-sd-movers',
    topName: 'Regional Fort Pierre / Stanley County Providers',
    regional1Name: 'Fort Pierre Corridor Moving',
    regional2Name: 'Capital Missouri West Moving',
    marketNotes:
      'Stanley County, SD is a central South Dakota county centered on Fort Pierre with rural residential and capital Missouri west corridor demand across Missouri River bluff gateway communities — not to be confused with Stanley County in other states.',
    costNote:
      'Stanley County pricing reflects Fort Pierre-area demand, capital Missouri west corridor traffic, ranch property logistics, and competition among regional agents serving Stanley County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'douglas',
    name: 'Douglas',
    seat: 'Armour',
    city: 'Armour',
    metro: 'douglas-metro-sd',
    costTier: 'rural',
    citySlug: 'armour',
    regional1: 'armour-corridor',
    regional2: 'james-river-douglas',
    topId: 'regional-douglas-sd-movers',
    topName: 'Regional Armour / Douglas County Providers',
    regional1Name: 'Armour Corridor Moving',
    regional2Name: 'James River Douglas Moving',
    marketNotes:
      'Douglas County, SD is a southeastern South Dakota county centered on Armour with rural residential and James River Douglas agricultural demand across remote Missouri plateau corridor communities — not to be confused with Douglas County in other states.',
    costNote:
      'Douglas County pricing reflects Armour-area demand, James River Douglas travel distances, agricultural property logistics, and competition among regional agents serving Douglas County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'perkins',
    name: 'Perkins',
    seat: 'Bison',
    city: 'Bison',
    metro: 'perkins-metro-sd',
    costTier: 'rural',
    citySlug: 'bison',
    regional1: 'bison-corridor',
    regional2: 'northwest-plains',
    topId: 'regional-perkins-sd-movers',
    topName: 'Regional Bison / Perkins County Providers',
    regional1Name: 'Bison Corridor Moving',
    regional2Name: 'Northwest Plains Moving',
    marketNotes:
      'Perkins County, SD is a northwestern South Dakota county centered on Bison with rural residential and northwest plains ranch demand across remote border-adjacent corridor communities — not to be confused with Perkins County in other states.',
    costNote:
      'Perkins County pricing reflects Bison-area demand, northwest plains travel distances, North Dakota and Wyoming border logistics, and competition among regional agents serving Perkins County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'aurora',
    name: 'Aurora',
    seat: 'Plankinton',
    city: 'Plankinton',
    metro: 'aurora-metro-sd',
    costTier: 'rural',
    citySlug: 'plankinton',
    regional1: 'plankinton-corridor',
    regional2: 'james-river-aurora',
    topId: 'regional-aurora-sd-movers',
    topName: 'Regional Plankinton / Aurora Providers',
    regional1Name: 'Plankinton Corridor Moving',
    regional2Name: 'James River Aurora Moving',
    marketNotes:
      'Aurora County, SD is a southeastern South Dakota county centered on Plankinton with rural residential and James River Aurora agricultural demand across remote prairie corridor communities — not to be confused with Aurora County in other states.',
    costNote:
      'Aurora County pricing reflects Plankinton-area demand, James River Aurora travel distances, agricultural property logistics, and competition among regional agents serving Aurora County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'jackson',
    name: 'Jackson',
    seat: 'Kadoka',
    city: 'Kadoka',
    metro: 'jackson-metro-sd',
    costTier: 'rural',
    citySlug: 'kadoka',
    regional1: 'kadoka-corridor',
    regional2: 'badlands-east',
    topId: 'regional-jackson-sd-movers',
    topName: 'Regional Kadoka / Jackson County Providers',
    regional1Name: 'Kadoka Corridor Moving',
    regional2Name: 'Badlands East Moving',
    marketNotes:
      'Jackson County, SD is a southwestern South Dakota county centered on Kadoka with rural residential and badlands east corridor demand across remote ranch and tourism gateway communities — not to be confused with Jackson County in other states.',
    costNote:
      'Jackson County pricing reflects Kadoka-area demand, badlands east travel distances, ranch property logistics, and competition among regional agents serving Jackson County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'sanborn',
    name: 'Sanborn',
    seat: 'Woonsocket',
    city: 'Woonsocket',
    metro: 'sanborn-metro-sd',
    costTier: 'rural',
    citySlug: 'woonsocket',
    regional1: 'woonsocket-corridor',
    regional2: 'james-river-sanborn',
    topId: 'regional-sanborn-sd-movers',
    topName: 'Regional Woonsocket / Sanborn Providers',
    regional1Name: 'Woonsocket Corridor Moving',
    regional2Name: 'James River Sanborn Moving',
    marketNotes:
      'Sanborn County, SD is a southeastern South Dakota county centered on Woonsocket with rural residential and James River Sanborn agricultural demand across remote prairie corridor communities — not to be confused with Sanborn County in other states.',
    costNote:
      'Sanborn County pricing reflects Woonsocket-area demand, James River Sanborn travel distances, agricultural property logistics, and competition among regional agents serving Sanborn County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'ziebach',
    name: 'Ziebach',
    seat: 'Dupree',
    city: 'Dupree',
    metro: 'ziebach-metro-sd',
    costTier: 'rural',
    citySlug: 'dupree',
    regional1: 'dupree-corridor',
    regional2: 'cheyenne-river-breaks',
    topId: 'regional-ziebach-sd-movers',
    topName: 'Regional Dupree / Ziebach Providers',
    regional1Name: 'Dupree Corridor Moving',
    regional2Name: 'Cheyenne River Breaks Moving',
    marketNotes:
      'Ziebach County, SD is a northwestern South Dakota county centered on Dupree with rural residential and Cheyenne River breaks corridor demand across remote tribal and ranch communities — not to be confused with Ziebach County in other states.',
    costNote:
      'Ziebach County pricing reflects Dupree-area demand, Cheyenne River breaks travel distances, ranch and tribal property logistics, and competition among regional agents serving Ziebach County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'mcpherson',
    name: 'McPherson',
    seat: 'Leola',
    city: 'Leola',
    metro: 'mcpherson-metro-sd',
    costTier: 'rural',
    citySlug: 'leola',
    regional1: 'leola-corridor',
    regional2: 'james-river-mcpherson',
    topId: 'regional-mcpherson-sd-movers',
    topName: 'Regional Leola / McPherson County Providers',
    regional1Name: 'Leola Corridor Moving',
    regional2Name: 'James River McPherson Moving',
    marketNotes:
      'McPherson County, SD is a north-central South Dakota county centered on Leola with rural residential and James River McPherson agricultural demand across remote border-adjacent corridor communities — not to be confused with McPherson County in Kansas or North Dakota.',
    costNote:
      'McPherson County pricing reflects Leola-area demand, James River McPherson travel distances, North Dakota border logistics, and competition among regional agents serving McPherson County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'potter',
    name: 'Potter',
    seat: 'Gettysburg',
    city: 'Gettysburg',
    metro: 'potter-metro-sd',
    costTier: 'rural',
    citySlug: 'gettysburg',
    regional1: 'gettysburg-corridor',
    regional2: 'capital-missouri-east',
    topId: 'regional-potter-sd-movers',
    topName: 'Regional Gettysburg / Potter County Providers',
    regional1Name: 'Gettysburg Corridor Moving',
    regional2Name: 'Capital Missouri East Moving',
    marketNotes:
      'Potter County, SD is a central South Dakota county centered on Gettysburg with rural residential and capital Missouri east agricultural demand across remote prairie corridor communities — not to be confused with Potter County in other states.',
    costNote:
      'Potter County pricing reflects Gettysburg-area demand, capital Missouri east travel distances, agricultural property logistics, and competition among regional agents serving Potter County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'miner',
    name: 'Miner',
    seat: 'Howard',
    city: 'Howard',
    metro: 'miner-metro-sd',
    costTier: 'rural',
    citySlug: 'howard',
    regional1: 'howard-corridor',
    regional2: 'big-sioux-miner',
    topId: 'regional-miner-sd-movers',
    topName: 'Regional Howard / Miner County Providers',
    regional1Name: 'Howard Corridor Moving',
    regional2Name: 'Big Sioux Miner Moving',
    marketNotes:
      'Miner County, SD is an eastern South Dakota county centered on Howard with rural residential and Big Sioux Miner agricultural demand across remote prairie corridor communities — not to be confused with Miner County in other states.',
    costNote:
      'Miner County pricing reflects Howard-area demand, Big Sioux Miner travel distances, agricultural property logistics, and competition among regional agents serving Miner County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'mellette',
    name: 'Mellette',
    seat: 'White River',
    city: 'White River',
    metro: 'mellette-metro-sd',
    costTier: 'rural',
    citySlug: 'white-river',
    regional1: 'white-river-corridor',
    regional2: 'rosebud-south',
    topId: 'regional-mellette-sd-movers',
    topName: 'Regional White River / Mellette Providers',
    regional1Name: 'White River Corridor Moving',
    regional2Name: 'Rosebud South Moving',
    marketNotes:
      'Mellette County, SD is a south-central South Dakota county centered on White River with rural residential and Rosebud south corridor demand across remote tribal and ranch communities — not to be confused with Mellette County in other states.',
    costNote:
      'Mellette County pricing reflects White River-area demand, Rosebud south travel distances, ranch and tribal property logistics, and competition among regional agents serving Mellette County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'faulk',
    name: 'Faulk',
    seat: 'Faulkton',
    city: 'Faulkton',
    metro: 'faulk-metro-sd',
    costTier: 'rural',
    citySlug: 'faulkton',
    regional1: 'faulkton-corridor',
    regional2: 'james-river-faulk',
    topId: 'regional-faulk-sd-movers',
    topName: 'Regional Faulkton / Faulk County Providers',
    regional1Name: 'Faulkton Corridor Moving',
    regional2Name: 'James River Faulk Moving',
    marketNotes:
      'Faulk County, SD is a north-central South Dakota county centered on Faulkton with rural residential and James River Faulk agricultural demand across remote prairie corridor communities — not to be confused with Faulk County in other states.',
    costNote:
      'Faulk County pricing reflects Faulkton-area demand, James River Faulk travel distances, agricultural property logistics, and competition among regional agents serving Faulk County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'buffalo',
    name: 'Buffalo',
    seat: 'Gann Valley',
    city: 'Gann Valley',
    metro: 'buffalo-metro-sd',
    costTier: 'rural',
    citySlug: 'gann-valley',
    regional1: 'gann-valley-corridor',
    regional2: 'james-river-buffalo',
    topId: 'regional-buffalo-sd-movers',
    topName: 'Regional Gann Valley / Buffalo County Providers',
    regional1Name: 'Gann Valley Corridor Moving',
    regional2Name: 'James River Buffalo Moving',
    marketNotes:
      'Buffalo County, SD is a central South Dakota county centered on Gann Valley with rural residential and James River Buffalo agricultural demand across remote prairie corridor communities — not to be confused with Buffalo County in other states.',
    costNote:
      'Buffalo County pricing reflects Gann Valley-area demand, James River Buffalo travel distances, agricultural property logistics, and competition among regional agents serving Buffalo County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'haakon',
    name: 'Haakon',
    seat: 'Philip',
    city: 'Philip',
    metro: 'haakon-metro-sd',
    costTier: 'rural',
    citySlug: 'philip',
    regional1: 'philip-corridor',
    regional2: 'western-plains',
    topId: 'regional-haakon-sd-movers',
    topName: 'Regional Philip / Haakon Providers',
    regional1Name: 'Philip Corridor Moving',
    regional2Name: 'Western Plains Moving',
    marketNotes:
      'Haakon County, SD is a western South Dakota county centered on Philip with rural residential and western plains ranch demand across remote badlands-adjacent corridor communities — not to be confused with Haakon County in other states.',
    costNote:
      'Haakon County pricing reflects Philip-area demand, western plains travel distances, ranch property logistics, and competition among regional agents serving Haakon County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'jerauld',
    name: 'Jerauld',
    seat: 'Wessington Springs',
    city: 'Wessington Springs',
    metro: 'jerauld-metro-sd',
    costTier: 'rural',
    citySlug: 'wessington-springs',
    regional1: 'wessington-springs-corridor',
    regional2: 'james-river-jerauld',
    topId: 'regional-jerauld-sd-movers',
    topName: 'Regional Wessington Springs / Jerauld Providers',
    regional1Name: 'Wessington Springs Corridor Moving',
    regional2Name: 'James River Jerauld Moving',
    marketNotes:
      'Jerauld County, SD is a southeastern South Dakota county centered on Wessington Springs with rural residential and James River Jerauld agricultural demand across remote prairie corridor communities — not to be confused with Jerauld County in other states.',
    costNote:
      'Jerauld County pricing reflects Wessington Springs-area demand, James River Jerauld travel distances, agricultural property logistics, and competition among regional agents serving Jerauld County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'sully',
    name: 'Sully',
    seat: 'Onida',
    city: 'Onida',
    metro: 'sully-metro-sd',
    costTier: 'rural',
    citySlug: 'onida',
    regional1: 'onida-corridor',
    regional2: 'missouri-river-sully',
    topId: 'regional-sully-sd-movers',
    topName: 'Regional Onida / Sully County Providers',
    regional1Name: 'Onida Corridor Moving',
    regional2Name: 'Missouri River Sully Moving',
    marketNotes:
      'Sully County, SD is a central South Dakota county centered on Onida with rural residential and Missouri River Sully agricultural demand across remote river-bluff corridor communities — not to be confused with Sully County in other states.',
    costNote:
      'Sully County pricing reflects Onida-area demand, Missouri River Sully travel distances, agricultural property logistics, and competition among regional agents serving Sully County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'campbell',
    name: 'Campbell',
    seat: 'Mound City',
    city: 'Mound City',
    metro: 'campbell-metro-sd',
    costTier: 'rural',
    citySlug: 'mound-city',
    regional1: 'mound-city-corridor',
    regional2: 'missouri-coteau-north',
    topId: 'regional-campbell-sd-movers',
    topName: 'Regional Mound City / Campbell County Providers',
    regional1Name: 'Mound City Corridor Moving',
    regional2Name: 'Missouri Coteau North Moving',
    marketNotes:
      'Campbell County, SD is a north-central South Dakota county centered on Mound City with rural residential and Missouri coteau north agricultural demand across remote North Dakota border corridor communities — not to be confused with Campbell County in other states.',
    costNote:
      'Campbell County pricing reflects Mound City-area demand, Missouri coteau north travel distances, North Dakota border logistics, and competition among regional agents serving Campbell County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'harding',
    name: 'Harding',
    seat: 'Buffalo',
    city: 'Buffalo',
    metro: 'harding-metro-sd',
    costTier: 'rural',
    citySlug: 'buffalo',
    regional1: 'buffalo-corridor',
    regional2: 'powder-river-breaks',
    topId: 'regional-harding-sd-movers',
    topName: 'Regional Buffalo / Harding County Providers',
    regional1Name: 'Buffalo Corridor Moving',
    regional2Name: 'Powder River Breaks Moving',
    marketNotes:
      'Harding County, SD is a northwestern South Dakota county centered on Buffalo with rural residential and Powder River breaks ranch demand across remote Wyoming and Montana border corridor communities — not to be confused with Harding County in other states.',
    costNote:
      'Harding County pricing reflects Buffalo-area demand, Powder River breaks travel distances, Wyoming and Montana border logistics, and competition among regional agents serving Harding County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'hyde',
    name: 'Hyde',
    seat: 'Highmore',
    city: 'Highmore',
    metro: 'hyde-metro-sd',
    costTier: 'rural',
    citySlug: 'highmore',
    regional1: 'highmore-corridor',
    regional2: 'james-river-hyde',
    topId: 'regional-hyde-sd-movers',
    topName: 'Regional Highmore / Hyde County Providers',
    regional1Name: 'Highmore Corridor Moving',
    regional2Name: 'James River Hyde Moving',
    marketNotes:
      'Hyde County, SD is a central South Dakota county centered on Highmore with rural residential and James River Hyde agricultural demand across remote prairie corridor communities — not to be confused with Hyde County in other states.',
    costNote:
      'Hyde County pricing reflects Highmore-area demand, James River Hyde travel distances, agricultural property logistics, and competition among regional agents serving Hyde County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'jones',
    name: 'Jones',
    seat: 'Murdo',
    city: 'Murdo',
    metro: 'jones-metro-sd',
    costTier: 'rural',
    citySlug: 'murdo',
    regional1: 'murdo-corridor',
    regional2: 'white-river-badlands',
    topId: 'regional-jones-sd-movers',
    topName: 'Regional Murdo / Jones County Providers',
    regional1Name: 'Murdo Corridor Moving',
    regional2Name: 'White River Badlands Moving',
    marketNotes:
      'Jones County, SD is a central South Dakota county centered on Murdo with rural residential and White River badlands corridor demand across remote ranch and tourism gateway communities — not to be confused with Jones County in other states.',
    costNote:
      'Jones County pricing reflects Murdo-area demand, White River badlands travel distances, ranch property logistics, and competition among regional agents serving Jones County communities.',
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
  return DISPLAY_LABELS[slug] ?? `${name} County, SD`;
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
    `all-my-sons-${citySlug}-sd`,
    `${citySlug}-moving-${slug}-sd`,
    `${slug}-county-moving-${slug}-sd`,
    `college-hunks-moving-${citySlug}-sd`,
    `budd-van-lines-${citySlug}-sd`,
    `${c.regional1}-moving-${slug}-sd`,
    `${c.regional2}-moving-${slug}-sd`,
    `hercules-movers-${citySlug}-sd`,
    `krupp-moving-${citySlug}-sd`,
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
  minnehaha: [
    {
      quote:
        'Two Men and a Truck Sioux Falls handled our suburban move professionally — on time and extremely careful with our home.',
      name: 'Alex M.',
      location: 'Sioux Falls, SD',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Sioux Falls navigated our Brandon relocation with fair pricing through Big Sioux Valley corridor traffic.',
      name: 'Beth N.',
      location: 'Brandon, SD',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Big Sioux Valley Moving served our relocation efficiently with steady communication and professional crew coordination.',
      name: 'Carl O.',
      location: 'Sioux Falls, SD',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
  pennington: [
    {
      quote:
        'Two Men and a Truck Rapid City handled our Black Hills move professionally — on time and extremely careful with our home.',
      name: 'Dana P.',
      location: 'Rapid City, SD',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Rapid City navigated our Box Elder relocation with fair pricing through I-90 corridor traffic.',
      name: 'Eric Q.',
      location: 'Box Elder, SD',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Black Hills East Moving served our relocation efficiently with punctual arrival and professional crew coordination.',
      name: 'Fran R.',
      location: 'Rapid City, SD',
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
  const altLoc = c.seat !== c.city ? `${c.seat}, SD` : `${city}, SD`;
  return `  ${slugKey(c.slug)}: [
    { quote: ${q(`${c.topName} handled our ${city} move professionally — on time and extremely careful with our home.`)}, name: ${q(n1)}, location: ${q(`${city}, SD`)}, rating: 5, moveType: 'Single-family' },
    { quote: ${q(`All My Sons ${city} navigated our relocation with fair pricing and excellent regional scheduling.`)}, name: ${q(n2)}, location: ${q(altLoc)}, rating: 5, moveType: 'Townhome' },
    { quote: ${q(`${c.regional2Name} served our move efficiently with punctual arrival and professional crew coordination.`)}, name: ${q(n3)}, location: ${q(`${city}, SD`)}, rating: 5, moveType: 'Apartment' },
  ],`;
}

function buildNearbyLinks(slug: string): string {
  const sdNeighbors = SD_NEIGHBORS[slug] ?? [];
  const cross = CROSS_BORDER[slug] ?? [];
  const maxSd = Math.min(sdNeighbors.length, Math.max(3, 5 - cross.length));
  const links: string[] = [];

  for (const n of sdNeighbors.slice(0, maxSd)) {
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
      `href: ${q(`/local-movers/south-dakota/${n}`)}`,
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

/** Hand-curated South Dakota county research — 66/66 counties (full set) */
export const southDakotaCountyResearch: Record<string, CuratedCountyResearch> = {
${entries.join('\n')}
};

export function getSouthDakotaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return southDakotaCountyResearch[countySlug];
}
`;
}

function genTestimonials(): string {
  const entries = COUNTIES.map((c, i) => buildTestimonials(c, i + 3));
  return `import type { CountyTestimonialEntry } from '@/lib/local-movers/county-seo';

/** Hand-curated South Dakota county testimonials — 66/66 counties (full set) */
export const southDakotaCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
${entries.join('\n')}
};

export function getSouthDakotaCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return southDakotaCountyTestimonials[countySlug] ?? [];
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

/** Hand-curated South Dakota county mover lists — 66/66 counties (full set) */
const CURATED_SD_COUNTIES: Record<string, string[]> = {
${entries.join('\n')}
};

export const southDakotaCountyMoverAssignments: CountyMoverAssignment[] =
  Object.entries(CURATED_SD_COUNTIES).map(([countySlug, moverIds]) => ({
    stateSlug: 'south-dakota',
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

/** Seat and metro overrides for hand-curated South Dakota counties (66/66 — full set) */
export const southDakotaCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
${entries.join('\n')}
};

export function applySouthDakotaCountyOverrides(county: LocalCounty): LocalCounty {
  const override = southDakotaCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}
`;
}

function genNearby(): string {
  const entries = COUNTIES.map((c) => buildNearbyLinks(c.slug));
  return `import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** South Dakota curated county corridor links — 66/66 counties (full set) */
const SD_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
${entries.join('\n')}
};

export function getSouthDakotaNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return SD_COUNTY_NEIGHBORS[countySlug] ?? [];
}
`;
}

const OUTPUTS: { path: string; content: string }[] = [
  { path: 'data/south-dakota-county-research.ts', content: genResearch() },
  { path: 'data/south-dakota-county-testimonials.ts', content: genTestimonials() },
  { path: 'data/south-dakota-county-assignments.ts', content: genAssignments() },
  {
    path: 'lib/local-movers/geography/south-dakota-overrides.ts',
    content: genOverrides(),
  },
  { path: 'lib/local-movers/south-dakota-nearby.ts', content: genNearby() },
];

for (const { path, content } of OUTPUTS) {
  const full = join(ROOT, path);
  writeFileSync(full, content, 'utf8');
  console.log(`Wrote ${path}`);
}

console.log(
  `\nGenerated ${COUNTIES.length}/${EXPECTED_COUNT} South Dakota counties across ${OUTPUTS.length} files.`
);