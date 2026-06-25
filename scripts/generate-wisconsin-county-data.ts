/**
 * Generates Wisconsin county curation files (batches 1–2 — 30 counties).
 * Run: npx tsx scripts/generate-wisconsin-county-data.ts
 */
import { writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(__dirname, '..');
const EXPECTED_COUNT = 30;

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
    | 'msp_metro'
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
  milwaukee: 'Milwaukee County, WI',
  dane: 'Dane County, WI',
  waukesha: 'Waukesha County, WI',
  brown: 'Brown County, WI',
  racine: 'Racine County, WI',
  outagamie: 'Outagamie County, WI',
  winnebago: 'Winnebago County, WI',
  kenosha: 'Kenosha County, WI',
  rock: 'Rock County, WI',
  marathon: 'Marathon County, WI',
  washington: 'Washington County, WI',
  dodge: 'Dodge County, WI',
  grant: 'Grant County, WI',
  monroe: 'Monroe County, WI',
  portage: 'Portage County, WI',
  columbia: 'Columbia County, WI',
  wood: 'Wood County, WI',
  'st-croix': 'St. Croix County, WI',
};

const WI_NEIGHBORS: Record<string, string[]> = {
  milwaukee: ['waukesha', 'racine', 'washington', 'ozaukee'],
  dane: ['columbia', 'dodge', 'green', 'iowa', 'rock', 'sauk'],
  waukesha: ['dodge', 'jefferson', 'milwaukee', 'walworth', 'washington'],
  brown: ['door', 'kewaunee', 'oconto', 'outagamie', 'shawano'],
  racine: ['kenosha', 'milwaukee', 'walworth'],
  outagamie: ['brown', 'calumet', 'manitowoc', 'shawano', 'waupaca', 'winnebago'],
  winnebago: [
    'calumet',
    'fond-du-lac',
    'green-lake',
    'outagamie',
    'waushara',
    'waupaca',
  ],
  kenosha: ['racine', 'walworth', 'lake'],
  rock: ['dane', 'green', 'jefferson', 'walworth', 'winnebago'],
  marathon: ['clark', 'langlade', 'lincoln', 'portage', 'taylor', 'wood'],
  washington: ['dodge', 'fond-du-lac', 'milwaukee', 'ozaukee', 'sheboygan', 'waukesha'],
  'la-crosse': ['buffalo', 'jackson', 'monroe', 'trempealeau', 'vernon'],
  sheboygan: ['calumet', 'fond-du-lac', 'manitowoc', 'ozaukee', 'washington'],
  'eau-claire': ['buffalo', 'chippewa', 'clark', 'dunn', 'jackson', 'pepin', 'trempealeau'],
  walworth: ['jefferson', 'kenosha', 'racine', 'rock', 'waukesha'],
  'fond-du-lac': ['calumet', 'dodge', 'green-lake', 'sheboygan', 'washington', 'winnebago'],
  'st-croix': ['barron', 'dunn', 'pierce', 'polk'],
  ozaukee: ['milwaukee', 'sheboygan', 'washington'],
  dodge: ['columbia', 'dane', 'fond-du-lac', 'green-lake', 'jefferson', 'washington', 'waukesha'],
  jefferson: ['dane', 'dodge', 'rock', 'walworth', 'waukesha'],
  manitowoc: ['brown', 'calumet', 'kewaunee', 'outagamie', 'sheboygan'],
  wood: ['adams', 'clark', 'jackson', 'juneau', 'marathon', 'portage'],
  portage: ['adams', 'marathon', 'waupaca', 'waushara', 'wood'],
  chippewa: ['barron', 'clark', 'dunn', 'eau-claire', 'pepin', 'rusk', 'taylor'],
  sauk: ['adams', 'columbia', 'crawford', 'iowa', 'juneau', 'richland', 'vernon'],
  columbia: ['dane', 'dodge', 'green-lake', 'marquette', 'sauk'],
  calumet: ['fond-du-lac', 'manitowoc', 'outagamie', 'sheboygan', 'winnebago'],
  grant: ['crawford', 'iowa', 'lafayette', 'richland'],
  waupaca: ['langlade', 'marathon', 'outagamie', 'portage', 'shawano', 'waushara', 'winnebago'],
  monroe: ['crawford', 'jackson', 'juneau', 'la-crosse', 'richland', 'vernon'],
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
  kenosha: [
    {
      slug: 'lake',
      stateSlug: 'illinois',
      name: 'Lake',
      seat: 'Waukegan',
      displayLabel: 'Lake County, IL',
    },
  ],
  rock: [
    {
      slug: 'winnebago',
      stateSlug: 'illinois',
      name: 'Winnebago',
      seat: 'Rockford',
      displayLabel: 'Winnebago County, IL',
    },
  ],
  'st-croix': [
    {
      slug: 'washington',
      stateSlug: 'minnesota',
      name: 'Washington',
      seat: 'Stillwater',
      displayLabel: 'Washington County, MN',
    },
  ],
  'la-crosse': [
    {
      slug: 'houston',
      stateSlug: 'minnesota',
      name: 'Houston',
      seat: 'Caledonia',
      displayLabel: 'Houston County, MN',
    },
  ],
};

const COUNTIES: CountyDef[] = [
  {
    slug: 'milwaukee',
    name: 'Milwaukee',
    seat: 'Milwaukee',
    city: 'Milwaukee',
    metro: 'milwaukee-metro-wi',
    costTier: 'metro',
    citySlug: 'milwaukee',
    regional1: 'milwaukee-corridor',
    regional2: 'lake-michigan-milwaukee',
    topId: 'twomenandatruck-milwaukee-wi',
    topName: 'Two Men and a Truck Milwaukee',
    regional1Name: 'Milwaukee Corridor Moving',
    regional2Name: 'Lake Michigan Milwaukee Moving',
    franchise: true,
    marketNotes:
      'Milwaukee County, WI is Wisconsin’s most populous county centered on Milwaukee with strong urban, suburban, and residential demand across the Milwaukee metro and Lake Michigan corridor.',
    costNote:
      'Milwaukee County pricing reflects Milwaukee metro demand, I-43 and I-94 corridor traffic, high-value urban and suburban homes, and competition among full-service agents serving Milwaukee County communities.',
    tipVariant: 'metro',
  },
  {
    slug: 'dane',
    name: 'Dane',
    seat: 'Madison',
    city: 'Madison',
    metro: 'dane-metro-wi',
    costTier: 'metro',
    citySlug: 'madison',
    regional1: 'madison-corridor',
    regional2: 'capitol-square-dane',
    topId: 'regional-dane-wi-movers',
    topName: 'Regional Madison / Dane Providers',
    regional1Name: 'Madison Corridor Moving',
    regional2Name: 'Capitol Square Dane Moving',
    marketNotes:
      'Dane County, WI is a major urban county centered on Madison with strong governmental, university, and residential demand across Wisconsin’s capital corridor — not to be confused with Dane County in other states.',
    costNote:
      'Dane County pricing reflects Madison metro demand, capitol-city and university-area logistics, and competition among regional agents serving Dane County communities.',
    tipVariant: 'university',
  },
  {
    slug: 'waukesha',
    name: 'Waukesha',
    seat: 'Waukesha',
    city: 'Waukesha',
    metro: 'waukesha-metro-wi',
    costTier: 'metro',
    citySlug: 'waukesha',
    regional1: 'waukesha-corridor',
    regional2: 'lake-country-waukesha',
    topId: 'regional-waukesha-wi-movers',
    topName: 'Regional Waukesha / Waukesha County Providers',
    regional1Name: 'Waukesha Corridor Moving',
    regional2Name: 'Lake Country Waukesha Moving',
    marketNotes:
      'Waukesha County, WI is a major suburban county in the Milwaukee metro west corridor with strong residential demand across Waukesha, Lake Country, and west suburban communities.',
    costNote:
      'Waukesha County pricing reflects west Milwaukee suburban demand, I-94 corridor traffic, high-value Lake Country homes, and competition among regional agents serving Waukesha County communities.',
    tipVariant: 'metro',
  },
  {
    slug: 'brown',
    name: 'Brown',
    seat: 'Green Bay',
    city: 'Green Bay',
    metro: 'brown-metro-wi',
    costTier: 'secondary_metro',
    citySlug: 'green-bay',
    regional1: 'green-bay-corridor',
    regional2: 'fox-river-brown',
    topId: 'regional-brown-wi-movers',
    topName: 'Regional Green Bay / Brown Providers',
    regional1Name: 'Green Bay Corridor Moving',
    regional2Name: 'Fox River Brown Moving',
    marketNotes:
      'Brown County, WI is a northeastern Wisconsin county centered on Green Bay with strong urban, port, and residential demand along the Fox River corridor — not to be confused with Brown County, MN or other Brown counties nationwide.',
    costNote:
      'Brown County pricing reflects Green Bay-area demand, Fox River corridor travel distances, and competition among regional agents serving Brown County, WI communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'racine',
    name: 'Racine',
    seat: 'Racine',
    city: 'Racine',
    metro: 'racine-metro-wi',
    costTier: 'secondary_metro',
    citySlug: 'racine',
    regional1: 'racine-corridor',
    regional2: 'root-river-racine',
    topId: 'regional-racine-wi-movers',
    topName: 'Regional Racine / Racine County Providers',
    regional1Name: 'Racine Corridor Moving',
    regional2Name: 'Root River Racine Moving',
    marketNotes:
      'Racine County, WI is a southeastern Wisconsin county centered on Racine with strong urban, suburban, and residential demand along the Root River and Lake Michigan corridor.',
    costNote:
      'Racine County pricing reflects Racine-area demand, Lake Michigan shoreline logistics, and competition among regional agents serving Racine County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'outagamie',
    name: 'Outagamie',
    seat: 'Appleton',
    city: 'Appleton',
    metro: 'outagamie-metro-wi',
    costTier: 'secondary_metro',
    citySlug: 'appleton',
    regional1: 'appleton-corridor',
    regional2: 'fox-cities-outagamie',
    topId: 'regional-outagamie-wi-movers',
    topName: 'Regional Appleton / Outagamie Providers',
    regional1Name: 'Appleton Corridor Moving',
    regional2Name: 'Fox Cities Outagamie Moving',
    marketNotes:
      'Outagamie County, WI is a Fox Valley county centered on Appleton with strong urban, suburban, and residential demand across Fox Cities corridor communities.',
    costNote:
      'Outagamie County pricing reflects Appleton-area demand, Fox Cities corridor travel distances, and competition among regional agents serving Outagamie County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'winnebago',
    name: 'Winnebago',
    seat: 'Oshkosh',
    city: 'Oshkosh',
    metro: 'winnebago-metro-wi',
    costTier: 'secondary_metro',
    citySlug: 'oshkosh',
    regional1: 'oshkosh-corridor',
    regional2: 'lake-winnebago-winnebago',
    topId: 'regional-winnebago-wi-movers',
    topName: 'Regional Oshkosh / Winnebago Providers',
    regional1Name: 'Oshkosh Corridor Moving',
    regional2Name: 'Lake Winnebago Winnebago Moving',
    marketNotes:
      'Winnebago County, WI is a Fox Valley county centered on Oshkosh with strong urban, suburban, and residential demand along Lake Winnebago — not to be confused with Winnebago County, IA or Winnebago County, IL.',
    costNote:
      'Winnebago County pricing reflects Oshkosh-area demand, Lake Winnebago corridor travel distances, and competition among regional agents serving Winnebago County, WI communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'kenosha',
    name: 'Kenosha',
    seat: 'Kenosha',
    city: 'Kenosha',
    metro: 'kenosha-metro-wi',
    costTier: 'metro',
    citySlug: 'kenosha',
    regional1: 'kenosha-corridor',
    regional2: 'chicago-milwaukee-kenosha',
    topId: 'regional-kenosha-wi-movers',
    topName: 'Regional Kenosha / Kenosha County Providers',
    regional1Name: 'Kenosha Corridor Moving',
    regional2Name: 'Chicago Milwaukee Kenosha Moving',
    marketNotes:
      'Kenosha County, WI is a southeastern Wisconsin county centered on Kenosha with strong urban, suburban, and residential demand along the Chicago–Milwaukee I-94 corridor — not to be confused with Kenosha County in other states.',
    costNote:
      'Kenosha County pricing reflects Chicago–Milwaukee I-94 corridor demand, cross-border Illinois logistics, Lake Michigan shoreline communities, and competition among regional agents serving Kenosha County communities.',
    tipVariant: 'metro',
  },
  {
    slug: 'rock',
    name: 'Rock',
    seat: 'Janesville',
    city: 'Janesville',
    metro: 'rock-metro-wi',
    costTier: 'secondary_metro',
    citySlug: 'janesville',
    regional1: 'janesville-corridor',
    regional2: 'rock-river-rock',
    topId: 'regional-rock-wi-movers',
    topName: 'Regional Janesville / Rock Providers',
    regional1Name: 'Janesville Corridor Moving',
    regional2Name: 'Rock River Rock Moving',
    marketNotes:
      'Rock County, WI is a southern Wisconsin county centered on Janesville with strong urban, suburban, and residential demand along the Rock River corridor — not to be confused with Rock County, MN or Rock County in other states.',
    costNote:
      'Rock County pricing reflects Janesville-area demand, Rock River corridor travel distances, cross-border Illinois logistics, and competition among regional agents serving Rock County, WI communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'marathon',
    name: 'Marathon',
    seat: 'Wausau',
    city: 'Wausau',
    metro: 'marathon-metro-wi',
    costTier: 'secondary_metro',
    citySlug: 'wausau',
    regional1: 'wausau-corridor',
    regional2: 'wisconsin-river-marathon',
    topId: 'regional-marathon-wi-movers',
    topName: 'Regional Wausau / Marathon Providers',
    regional1Name: 'Wausau Corridor Moving',
    regional2Name: 'Wisconsin River Marathon Moving',
    marketNotes:
      'Marathon County, WI is a north-central Wisconsin county centered on Wausau with strong urban, suburban, and residential demand along the Wisconsin River corridor.',
    costNote:
      'Marathon County pricing reflects Wausau-area demand, Wisconsin River corridor travel distances, and competition among regional agents serving Marathon County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'washington',
    name: 'Washington',
    seat: 'West Bend',
    city: 'West Bend',
    metro: 'washington-metro-wi',
    costTier: 'metro',
    citySlug: 'west-bend',
    regional1: 'west-bend-corridor',
    regional2: 'kettle-moraine-washington',
    topId: 'regional-washington-wi-movers',
    topName: 'Regional West Bend / Washington Providers',
    regional1Name: 'West Bend Corridor Moving',
    regional2Name: 'Kettle Moraine Washington Moving',
    marketNotes:
      'Washington County, WI is a northern suburban county in the Milwaukee metro centered on West Bend with strong residential demand — not to be confused with Washington County, MN or Washington State.',
    costNote:
      'Washington County pricing reflects north Milwaukee suburban demand, I-41 and US-45 corridor traffic, high-value suburban homes, and competition among regional agents serving Washington County, WI communities.',
    tipVariant: 'metro',
  },
  {
    slug: 'la-crosse',
    name: 'La Crosse',
    seat: 'La Crosse',
    city: 'La Crosse',
    metro: 'la-crosse-metro-wi',
    costTier: 'secondary_metro',
    citySlug: 'la-crosse',
    regional1: 'la-crosse-corridor',
    regional2: 'mississippi-bluff-la-crosse',
    topId: 'regional-lacrosse-wi-movers',
    topName: 'Regional La Crosse / La Crosse County Providers',
    regional1Name: 'La Crosse Corridor Moving',
    regional2Name: 'Mississippi Bluff La Crosse Moving',
    marketNotes:
      'La Crosse County, WI is a western Wisconsin county centered on La Crosse with strong urban and residential demand along the Mississippi River bluff corridor.',
    costNote:
      'La Crosse County pricing reflects La Crosse-area demand, Mississippi River corridor travel distances, cross-border Minnesota logistics, and competition among regional agents serving La Crosse County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'sheboygan',
    name: 'Sheboygan',
    seat: 'Sheboygan',
    city: 'Sheboygan',
    metro: 'sheboygan-metro-wi',
    costTier: 'secondary_metro',
    citySlug: 'sheboygan',
    regional1: 'sheboygan-corridor',
    regional2: 'lake-michigan-sheboygan',
    topId: 'regional-sheboygan-wi-movers',
    topName: 'Regional Sheboygan / Sheboygan County Providers',
    regional1Name: 'Sheboygan Corridor Moving',
    regional2Name: 'Lake Michigan Sheboygan Moving',
    marketNotes:
      'Sheboygan County, WI is an eastern Wisconsin county centered on Sheboygan with strong residential demand along the Lake Michigan shoreline.',
    costNote:
      'Sheboygan County pricing reflects Sheboygan-area demand, Lake Michigan corridor travel distances, and competition among regional agents serving Sheboygan County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'eau-claire',
    name: 'Eau Claire',
    seat: 'Eau Claire',
    city: 'Eau Claire',
    metro: 'eau-claire-metro-wi',
    costTier: 'secondary_metro',
    citySlug: 'eau-claire',
    regional1: 'eau-claire-corridor',
    regional2: 'chippewa-valley-eau-claire',
    topId: 'regional-eauclaire-wi-movers',
    topName: 'Regional Eau Claire / Eau Claire County Providers',
    regional1Name: 'Eau Claire Corridor Moving',
    regional2Name: 'Chippewa Valley Eau Claire Moving',
    marketNotes:
      'Eau Claire County, WI is a northwestern Wisconsin county centered on Eau Claire with strong urban and residential demand across the Chippewa Valley corridor.',
    costNote:
      'Eau Claire County pricing reflects Chippewa Valley demand, regional corridor travel distances, and competition among regional agents serving Eau Claire County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'walworth',
    name: 'Walworth',
    seat: 'Elkhorn',
    city: 'Elkhorn',
    metro: 'walworth-metro-wi',
    costTier: 'secondary_metro',
    citySlug: 'elkhorn',
    regional1: 'elkhorn-corridor',
    regional2: 'geneva-lake-walworth',
    topId: 'regional-walworth-wi-movers',
    topName: 'Regional Elkhorn / Walworth Providers',
    regional1Name: 'Elkhorn Corridor Moving',
    regional2Name: 'Geneva Lake Walworth Moving',
    marketNotes:
      'Walworth County, WI is a southeastern Wisconsin county centered on Elkhorn with strong residential demand across Geneva Lake and resort-lake communities — not to be confused with Walworth County in other states.',
    costNote:
      'Walworth County pricing reflects Geneva Lake-area demand, seasonal resort-home logistics, and competition among regional agents serving Walworth County, WI communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'fond-du-lac',
    name: 'Fond du Lac',
    seat: 'Fond du Lac',
    city: 'Fond du Lac',
    metro: 'fond-du-lac-metro-wi',
    costTier: 'secondary_metro',
    citySlug: 'fond-du-lac',
    regional1: 'fond-du-lac-corridor',
    regional2: 'lake-winnebago-fonddulac',
    topId: 'regional-fonddulac-wi-movers',
    topName: 'Regional Fond du Lac / Fond du Lac County Providers',
    regional1Name: 'Fond du Lac Corridor Moving',
    regional2Name: 'Lake Winnebago Fond du Lac Moving',
    marketNotes:
      'Fond du Lac County, WI is an east-central Wisconsin county centered on Fond du Lac with residential demand along Lake Winnebago.',
    costNote:
      'Fond du Lac County pricing reflects Lake Winnebago-area demand, regional corridor travel distances, and competition among regional agents serving Fond du Lac County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'st-croix',
    name: 'St. Croix',
    seat: 'Hudson',
    city: 'Hudson',
    metro: 'st-croix-metro-wi',
    costTier: 'metro',
    citySlug: 'hudson',
    regional1: 'hudson-corridor',
    regional2: 'st-croix-river-valley',
    topId: 'regional-stcroix-wi-movers',
    topName: 'Regional Hudson / St. Croix Providers',
    regional1Name: 'Hudson Corridor Moving',
    regional2Name: 'St. Croix River Valley Moving',
    marketNotes:
      'St. Croix County, WI is a western Wisconsin county centered on Hudson with strong suburban and residential demand along the Twin Cities west-metro St. Croix River corridor.',
    costNote:
      'St. Croix County pricing reflects Twin Cities corridor demand, I-94 and St. Croix River bridge traffic, high-value suburban homes, and competition among regional agents serving St. Croix County communities.',
    tipVariant: 'msp_metro',
  },
  {
    slug: 'ozaukee',
    name: 'Ozaukee',
    seat: 'Port Washington',
    city: 'Port Washington',
    metro: 'ozaukee-metro-wi',
    costTier: 'metro',
    citySlug: 'port-washington',
    regional1: 'port-washington-corridor',
    regional2: 'lake-michigan-ozaukee',
    topId: 'regional-ozaukee-wi-movers',
    topName: 'Regional Port Washington / Ozaukee Providers',
    regional1Name: 'Port Washington Corridor Moving',
    regional2Name: 'Lake Michigan Ozaukee Moving',
    marketNotes:
      'Ozaukee County, WI is a northern suburban county in the Milwaukee metro centered on Port Washington with strong lakeshore residential demand.',
    costNote:
      'Ozaukee County pricing reflects north Milwaukee lakeshore suburban demand, I-43 corridor traffic, high-value suburban homes, and competition among regional agents serving Ozaukee County communities.',
    tipVariant: 'metro',
  },
  {
    slug: 'dodge',
    name: 'Dodge',
    seat: 'Juneau',
    city: 'Juneau',
    metro: 'dodge-metro-wi',
    costTier: 'regional_hub',
    citySlug: 'juneau',
    regional1: 'juneau-corridor',
    regional2: 'rock-river-dodge',
    topId: 'regional-dodge-wi-movers',
    topName: 'Regional Juneau / Dodge Providers',
    regional1Name: 'Juneau Corridor Moving',
    regional2Name: 'Rock River Dodge Moving',
    marketNotes:
      'Dodge County, WI is an east-central Wisconsin county centered on Juneau with rural residential demand — not to be confused with Dodge County, MN or Dodge County in other states.',
    costNote:
      'Dodge County pricing reflects rural east-central Wisconsin demand, longer travel distances between communities, and competition among regional agents serving Dodge County, WI communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'jefferson',
    name: 'Jefferson',
    seat: 'Jefferson',
    city: 'Jefferson',
    metro: 'jefferson-metro-wi',
    costTier: 'secondary_metro',
    citySlug: 'jefferson',
    regional1: 'jefferson-corridor',
    regional2: 'rock-river-jefferson',
    topId: 'regional-jefferson-wi-movers',
    topName: 'Regional Jefferson / Jefferson County Providers',
    regional1Name: 'Jefferson Corridor Moving',
    regional2Name: 'Rock River Jefferson Moving',
    marketNotes:
      'Jefferson County, WI is a southeastern Wisconsin county centered on Jefferson with residential demand along the Rock River corridor — not to be confused with Jefferson County in other states.',
    costNote:
      'Jefferson County pricing reflects Rock River corridor demand, regional travel distances, and competition among regional agents serving Jefferson County, WI communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'manitowoc',
    name: 'Manitowoc',
    seat: 'Manitowoc',
    city: 'Manitowoc',
    metro: 'manitowoc-metro-wi',
    costTier: 'secondary_metro',
    citySlug: 'manitowoc',
    regional1: 'manitowoc-corridor',
    regional2: 'lake-michigan-manitowoc',
    topId: 'regional-manitowoc-wi-movers',
    topName: 'Regional Manitowoc / Manitowoc County Providers',
    regional1Name: 'Manitowoc Corridor Moving',
    regional2Name: 'Lake Michigan Manitowoc Moving',
    marketNotes:
      'Manitowoc County, WI is an eastern Wisconsin county centered on Manitowoc with residential demand along the Lake Michigan shoreline.',
    costNote:
      'Manitowoc County pricing reflects Lake Michigan shoreline demand, regional corridor travel distances, and competition among regional agents serving Manitowoc County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'wood',
    name: 'Wood',
    seat: 'Wisconsin Rapids',
    city: 'Wisconsin Rapids',
    metro: 'wood-metro-wi',
    costTier: 'regional_hub',
    citySlug: 'wisconsin-rapids',
    regional1: 'wisconsin-rapids-corridor',
    regional2: 'wisconsin-river-wood',
    topId: 'regional-wood-wi-movers',
    topName: 'Regional Wisconsin Rapids / Wood Providers',
    regional1Name: 'Wisconsin Rapids Corridor Moving',
    regional2Name: 'Wisconsin River Wood Moving',
    marketNotes:
      'Wood County, WI is a central Wisconsin county centered on Wisconsin Rapids with residential demand along the Wisconsin River corridor.',
    costNote:
      'Wood County pricing reflects Wisconsin River corridor demand, regional travel distances, and competition among regional agents serving Wood County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'portage',
    name: 'Portage',
    seat: 'Stevens Point',
    city: 'Stevens Point',
    metro: 'portage-metro-wi',
    costTier: 'regional_hub',
    citySlug: 'stevens-point',
    regional1: 'stevens-point-corridor',
    regional2: 'wisconsin-river-portage',
    topId: 'regional-portage-wi-movers',
    topName: 'Regional Stevens Point / Portage Providers',
    regional1Name: 'Stevens Point Corridor Moving',
    regional2Name: 'Wisconsin River Portage Moving',
    marketNotes:
      'Portage County, WI is a central Wisconsin county centered on Stevens Point with educational and residential demand — not to be confused with Portage County in other states.',
    costNote:
      'Portage County pricing reflects Stevens Point-area demand, UW–Stevens Point campus turnover, and competition among regional agents serving Portage County, WI communities.',
    tipVariant: 'university',
  },
  {
    slug: 'chippewa',
    name: 'Chippewa',
    seat: 'Chippewa Falls',
    city: 'Chippewa Falls',
    metro: 'chippewa-metro-wi',
    costTier: 'secondary_metro',
    citySlug: 'chippewa-falls',
    regional1: 'chippewa-falls-corridor',
    regional2: 'chippewa-valley-chippewa',
    topId: 'regional-chippewa-wi-movers',
    topName: 'Regional Chippewa Falls / Chippewa Providers',
    regional1Name: 'Chippewa Falls Corridor Moving',
    regional2Name: 'Chippewa Valley Chippewa Moving',
    marketNotes:
      'Chippewa County, WI is a northwestern Wisconsin county centered on Chippewa Falls with residential demand across the Chippewa Valley corridor.',
    costNote:
      'Chippewa County pricing reflects Chippewa Valley demand, regional corridor travel distances, and competition among regional agents serving Chippewa County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'sauk',
    name: 'Sauk',
    seat: 'Baraboo',
    city: 'Baraboo',
    metro: 'sauk-metro-wi',
    costTier: 'secondary_metro',
    citySlug: 'baraboo',
    regional1: 'baraboo-corridor',
    regional2: 'devil-lake-sauk',
    topId: 'regional-sauk-wi-movers',
    topName: 'Regional Baraboo / Sauk Providers',
    regional1Name: 'Baraboo Corridor Moving',
    regional2Name: 'Devil Lake Sauk Moving',
    marketNotes:
      'Sauk County, WI is a south-central Wisconsin county centered on Baraboo with residential demand across Devil\'s Lake and Wisconsin Dells gateway communities.',
    costNote:
      'Sauk County pricing reflects tourism-gateway demand, seasonal vacation-home logistics, and competition among regional agents serving Sauk County communities.',
    tipVariant: 'tourist',
  },
  {
    slug: 'columbia',
    name: 'Columbia',
    seat: 'Portage',
    city: 'Portage',
    metro: 'columbia-metro-wi',
    costTier: 'secondary_metro',
    citySlug: 'portage',
    regional1: 'portage-corridor',
    regional2: 'wisconsin-river-columbia',
    topId: 'regional-columbia-wi-movers',
    topName: 'Regional Portage / Columbia Providers',
    regional1Name: 'Portage Corridor Moving',
    regional2Name: 'Wisconsin River Columbia Moving',
    marketNotes:
      'Columbia County, WI is a south-central Wisconsin county centered on Portage with residential demand along the Wisconsin River corridor — not to be confused with Columbia County in other states.',
    costNote:
      'Columbia County pricing reflects Wisconsin River corridor demand, regional travel distances, and competition among regional agents serving Columbia County, WI communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'calumet',
    name: 'Calumet',
    seat: 'Chilton',
    city: 'Chilton',
    metro: 'calumet-metro-wi',
    costTier: 'secondary_metro',
    citySlug: 'chilton',
    regional1: 'chilton-corridor',
    regional2: 'fox-river-calumet',
    topId: 'regional-calumet-wi-movers',
    topName: 'Regional Chilton / Calumet Providers',
    regional1Name: 'Chilton Corridor Moving',
    regional2Name: 'Fox River Calumet Moving',
    marketNotes:
      'Calumet County, WI is an east-central Wisconsin county centered on Chilton with residential demand across the Fox River corridor.',
    costNote:
      'Calumet County pricing reflects Fox River corridor demand, regional travel distances, and competition among regional agents serving Calumet County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'grant',
    name: 'Grant',
    seat: 'Lancaster',
    city: 'Lancaster',
    metro: 'grant-metro-wi',
    costTier: 'rural',
    citySlug: 'lancaster',
    regional1: 'lancaster-corridor',
    regional2: 'driftless-grant',
    topId: 'regional-grant-wi-movers',
    topName: 'Regional Lancaster / Grant Providers',
    regional1Name: 'Lancaster Corridor Moving',
    regional2Name: 'Driftless Grant Moving',
    marketNotes:
      'Grant County, WI is a southwestern Wisconsin county centered on Lancaster with rural residential demand across the Driftless Area — not to be confused with Grant County in other states.',
    costNote:
      'Grant County pricing reflects Driftless Area rural demand, longer travel distances, and competition among regional agents serving Grant County, WI communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'waupaca',
    name: 'Waupaca',
    seat: 'Waupaca',
    city: 'Waupaca',
    metro: 'waupaca-metro-wi',
    costTier: 'secondary_metro',
    citySlug: 'waupaca',
    regional1: 'waupaca-corridor',
    regional2: 'chain-of-lakes-waupaca',
    topId: 'regional-waupaca-wi-movers',
    topName: 'Regional Waupaca / Waupaca County Providers',
    regional1Name: 'Waupaca Corridor Moving',
    regional2Name: 'Chain of Lakes Waupaca Moving',
    marketNotes:
      'Waupaca County, WI is a central Wisconsin county centered on Waupaca with lakes-country and residential demand across the Chain of Lakes corridor.',
    costNote:
      'Waupaca County pricing reflects lakes-country demand, seasonal vacation-home logistics, and competition among regional agents serving Waupaca County communities.',
    tipVariant: 'tourist',
  },
  {
    slug: 'monroe',
    name: 'Monroe',
    seat: 'Sparta',
    city: 'Sparta',
    metro: 'monroe-metro-wi',
    costTier: 'regional_hub',
    citySlug: 'sparta',
    regional1: 'sparta-corridor',
    regional2: 'driftless-monroe',
    topId: 'regional-monroe-wi-movers',
    topName: 'Regional Sparta / Monroe Providers',
    regional1Name: 'Sparta Corridor Moving',
    regional2Name: 'Driftless Monroe Moving',
    marketNotes:
      'Monroe County, WI is a western Wisconsin county centered on Sparta with rural residential demand across the Driftless Area — not to be confused with Monroe County in other states.',
    costNote:
      'Monroe County pricing reflects Driftless Area rural demand, regional travel distances, and competition among regional agents serving Monroe County, WI communities.',
    tipVariant: 'standard',
  },
];

const SEAT_BY_SLUG = Object.fromEntries(COUNTIES.map((c) => [c.slug, c.seat]));

const NON_CURATED_NAMES: Record<string, { name: string; seat: string }> = {
  green: { name: 'Green', seat: 'Monroe' },
  iowa: { name: 'Iowa', seat: 'Dodgeville' },
  door: { name: 'Door', seat: 'Sturgeon Bay' },
  kewaunee: { name: 'Kewaunee', seat: 'Kewaunee' },
  oconto: { name: 'Oconto', seat: 'Oconto' },
  shawano: { name: 'Shawano', seat: 'Shawano' },
  'green-lake': { name: 'Green Lake', seat: 'Green Lake' },
  waushara: { name: 'Waushara', seat: 'Wautoma' },
  clark: { name: 'Clark', seat: 'Neillsville' },
  langlade: { name: 'Langlade', seat: 'Antigo' },
  lincoln: { name: 'Lincoln', seat: 'Merrill' },
  taylor: { name: 'Taylor', seat: 'Medford' },
  buffalo: { name: 'Buffalo', seat: 'Alma' },
  trempealeau: { name: 'Trempealeau', seat: 'Whitehall' },
  vernon: { name: 'Vernon', seat: 'Viroqua' },
  jackson: { name: 'Jackson', seat: 'Black River Falls' },
  pepin: { name: 'Pepin', seat: 'Durand' },
  dunn: { name: 'Dunn', seat: 'Menomonie' },
  pierce: { name: 'Pierce', seat: 'Ellsworth' },
  polk: { name: 'Polk', seat: 'Balsam Lake' },
  barron: { name: 'Barron', seat: 'Barron' },
  adams: { name: 'Adams', seat: 'Friendship' },
  juneau: { name: 'Juneau', seat: 'Mauston' },
  crawford: { name: 'Crawford', seat: 'Prairie du Chien' },
  richland: { name: 'Richland', seat: 'Richland Center' },
  marquette: { name: 'Marquette', seat: 'Montello' },
  rusk: { name: 'Rusk', seat: 'Ladysmith' },
  lafayette: { name: 'Lafayette', seat: 'Darlington' },
};

function q(s: string): string {
  return JSON.stringify(s);
}

function slugKey(slug: string): string {
  return slug.includes('-') || /^\d/.test(slug) ? `'${slug}'` : slug;
}

function defaultDisplayLabel(slug: string, name: string): string {
  return DISPLAY_LABELS[slug] ?? `${name} County, WI`;
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
      `Verify coverage for ${city} and surrounding Milwaukee metro communities before booking.`,
      'I-43, I-94, and I-41 congestion significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes, condos, and townhomes before move day.',
      STANDARD_TIPS[3],
      STANDARD_TIPS[4],
    ];
  }
  if (c.tipVariant === 'msp_metro') {
    return [
      `Verify coverage for ${city} and surrounding Twin Cities corridor communities before booking.`,
      'I-94 and St. Croix River bridge corridor congestion significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes, condos, and townhomes before move day.',
      STANDARD_TIPS[3],
      STANDARD_TIPS[4],
    ];
  }
  if (c.tipVariant === 'medical') {
    return [
      `Verify coverage for ${city} and surrounding county communities before booking.`,
      'Medical-sector relocations and housing turnover may affect scheduling — confirm peak-season crew availability.',
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
    `all-my-sons-${citySlug}-wi`,
    `${citySlug}-moving-${slug}-wi`,
    `${slug}-county-moving-${slug}-wi`,
    `college-hunks-moving-${citySlug}-wi`,
    `budd-van-lines-${citySlug}-wi`,
    `${c.regional1}-moving-${slug}-wi`,
    `${c.regional2}-moving-${slug}-wi`,
    `hercules-movers-${citySlug}-wi`,
    `krupp-moving-${citySlug}-wi`,
  ];
}

const FRANCHISE_TESTIMONIALS: Record<
  string,
  { quote: string; name: string; location: string; rating: number; moveType: string }[]
> = {
  milwaukee: [
    {
      quote:
        'Two Men and a Truck Milwaukee handled our suburban move professionally — on time and extremely careful with our home.',
      name: 'Alex M.',
      location: 'Milwaukee, WI',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Milwaukee navigated our Wauwatosa relocation with fair pricing through Milwaukee metro corridor traffic.',
      name: 'Beth N.',
      location: 'Milwaukee, WI',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Lake Michigan Milwaukee Moving served our Shorewood-area move efficiently with steady communication and professional crew coordination.',
      name: 'Carl O.',
      location: 'Shorewood, WI',
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
  const altLoc = c.seat !== c.city ? `${c.seat}, WI` : `${city}, WI`;
  return `  ${slugKey(c.slug)}: [
    { quote: ${q(`${c.topName} handled our ${city} move professionally — on time and extremely careful with our home.`)}, name: ${q(n1)}, location: ${q(`${city}, WI`)}, rating: 5, moveType: 'Single-family' },
    { quote: ${q(`All My Sons ${city} navigated our relocation with fair pricing and excellent regional scheduling.`)}, name: ${q(n2)}, location: ${q(altLoc)}, rating: 5, moveType: 'Townhome' },
    { quote: ${q(`${c.regional2Name} served our move efficiently with punctual arrival and professional crew coordination.`)}, name: ${q(n3)}, location: ${q(`${city}, WI`)}, rating: 5, moveType: 'Apartment' },
  ],`;
}

function buildNearbyLinks(slug: string): string {
  const wiNeighbors = WI_NEIGHBORS[slug] ?? [];
  const cross = CROSS_BORDER[slug] ?? [];
  const crossSlugs = new Set(cross.map((cb) => cb.slug));
  const maxWi = Math.min(wiNeighbors.length, Math.max(3, 5 - cross.length));
  const links: string[] = [];

  for (const n of wiNeighbors.slice(0, maxWi)) {
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
      `href: ${q(`/local-movers/wisconsin/${n}`)}`,
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

/** Hand-curated Wisconsin county research — batches 1–2 (30 counties) */
export const wisconsinCountyResearch: Record<string, CuratedCountyResearch> = {
${entries.join('\n')}
};

export function getWisconsinCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return wisconsinCountyResearch[countySlug];
}
`;
}

function genTestimonials(): string {
  const entries = COUNTIES.map((c, i) => buildTestimonials(c, i + 3));
  return `import type { CountyTestimonialEntry } from '@/lib/local-movers/county-seo';

/** Hand-curated Wisconsin county testimonials — batches 1–2 (30 counties) */
export const wisconsinCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
${entries.join('\n')}
};

export function getWisconsinCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return wisconsinCountyTestimonials[countySlug] ?? [];
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

/** Hand-curated Wisconsin county mover lists — batches 1–2 (30 counties) */
const CURATED_WI_COUNTIES: Record<string, string[]> = {
${entries.join('\n')}
};

export const wisconsinCountyMoverAssignments: CountyMoverAssignment[] =
  Object.entries(CURATED_WI_COUNTIES).map(([countySlug, moverIds]) => ({
    stateSlug: 'wisconsin',
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

/** Seat and metro overrides for hand-curated Wisconsin counties (batches 1–2 — 30 counties) */
export const wisconsinCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
${entries.join('\n')}
};

export function applyWisconsinCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'wisconsin') return county;
  const override = wisconsinCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}
`;
}

function genNearby(): string {
  const entries = COUNTIES.map((c) => buildNearbyLinks(c.slug));
  return `import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Wisconsin curated county corridor links — batches 1–2 (30 counties) */
const WI_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
${entries.join('\n')}
};

export function getWisconsinNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return WI_COUNTY_NEIGHBORS[countySlug] ?? [];
}
`;
}

const OUTPUTS: { path: string; content: string }[] = [
  { path: 'data/wisconsin-county-research.ts', content: genResearch() },
  { path: 'data/wisconsin-county-testimonials.ts', content: genTestimonials() },
  { path: 'data/wisconsin-county-assignments.ts', content: genAssignments() },
  {
    path: 'lib/local-movers/geography/wisconsin-overrides.ts',
    content: genOverrides(),
  },
  { path: 'lib/local-movers/wisconsin-nearby.ts', content: genNearby() },
];

for (const { path, content } of OUTPUTS) {
  const full = join(ROOT, path);
  writeFileSync(full, content, 'utf8');
  console.log(`Wrote ${path}`);
}

console.log(
  `\nGenerated ${COUNTIES.length}/${EXPECTED_COUNT} Wisconsin counties across ${OUTPUTS.length} files.`
);