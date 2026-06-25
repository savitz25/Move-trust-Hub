/**
 * Generates South Dakota county curation files (batch 1: 26/66 counties).
 * Run: npx tsx scripts/generate-south-dakota-county-data.ts
 */
import { writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(__dirname, '..');
const EXPECTED_COUNT = 26;

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
];

const SEAT_BY_SLUG = Object.fromEntries(COUNTIES.map((c) => [c.slug, c.seat]));

const NON_CURATED_NAMES: Record<string, { name: string; seat: string }> = {
  aurora: { name: 'Aurora', seat: 'Plankinton' },
  bennett: { name: 'Bennett', seat: 'Martin' },
  brule: { name: 'Brule', seat: 'Chamberlain' },
  buffalo: { name: 'Buffalo', seat: 'Gann Valley' },
  campbell: { name: 'Campbell', seat: 'Mound City' },
  clark: { name: 'Clark', seat: 'Clark' },
  corson: { name: 'Corson', seat: 'McLaughlin' },
  day: { name: 'Day', seat: 'Webster' },
  deuel: { name: 'Deuel', seat: 'Clear Lake' },
  dewey: { name: 'Dewey', seat: 'Timber Lake' },
  douglas: { name: 'Douglas', seat: 'Armour' },
  edmunds: { name: 'Edmunds', seat: 'Ipswich' },
  faulk: { name: 'Faulk', seat: 'Faulkton' },
  gregory: { name: 'Gregory', seat: 'Burke' },
  haakon: { name: 'Haakon', seat: 'Philip' },
  hamlin: { name: 'Hamlin', seat: 'Hayti' },
  hand: { name: 'Hand', seat: 'Miller' },
  hanson: { name: 'Hanson', seat: 'Alexandria' },
  harding: { name: 'Harding', seat: 'Buffalo' },
  hyde: { name: 'Hyde', seat: 'Highmore' },
  jackson: { name: 'Jackson', seat: 'Kadoka' },
  jerauld: { name: 'Jerauld', seat: 'Wessington Springs' },
  jones: { name: 'Jones', seat: 'Murdo' },
  kingsbury: { name: 'Kingsbury', seat: 'De Smet' },
  lyman: { name: 'Lyman', seat: 'Kennebec' },
  marshall: { name: 'Marshall', seat: 'Britton' },
  mccook: { name: 'McCook', seat: 'Salem' },
  mcpherson: { name: 'McPherson', seat: 'Leola' },
  mellette: { name: 'Mellette', seat: 'White River' },
  miner: { name: 'Miner', seat: 'Howard' },
  moody: { name: 'Moody', seat: 'Flandreau' },
  perkins: { name: 'Perkins', seat: 'Bison' },
  potter: { name: 'Potter', seat: 'Gettysburg' },
  sanborn: { name: 'Sanborn', seat: 'Woonsocket' },
  spink: { name: 'Spink', seat: 'Redfield' },
  stanley: { name: 'Stanley', seat: 'Fort Pierre' },
  sully: { name: 'Sully', seat: 'Onida' },
  tripp: { name: 'Tripp', seat: 'Winner' },
  walworth: { name: 'Walworth', seat: 'Selby' },
  ziebach: { name: 'Ziebach', seat: 'Dupree' },
};

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

/** Hand-curated South Dakota county research — batch 1: 26/66 */
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

/** Hand-curated South Dakota county testimonials — batch 1: 26/66 */
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

/** Hand-curated South Dakota county mover lists — batch 1: 26/66 */
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

/** Seat and metro overrides for hand-curated South Dakota counties (batch 1: 26/66) */
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

/** South Dakota curated county corridor links — batch 1: 26/66 */
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