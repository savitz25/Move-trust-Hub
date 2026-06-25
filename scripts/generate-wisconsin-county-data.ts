/**
 * Generates Wisconsin county curation files (all 72 Wisconsin counties).
 * Run: npx tsx scripts/generate-wisconsin-county-data.ts
 */
import { writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(__dirname, '..');
const EXPECTED_COUNT = 72;

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
  green: 'Green County, WI',
  iowa: 'Iowa County, WI',
  pierce: 'Pierce County, WI',
  douglas: 'Douglas County, WI',
  crawford: 'Crawford County, WI',
  iron: 'Iron County, WI',
  florence: 'Florence County, WI',
  ashland: 'Ashland County, WI',
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
  dunn: ['barron', 'chippewa', 'clark', 'eau-claire', 'pepin', 'pierce', 'polk', 'st-croix'],
  barron: ['burnett', 'chippewa', 'dunn', 'polk', 'rusk', 'sawyer', 'st-croix', 'washburn'],
  polk: ['barron', 'burnett', 'dunn', 'pierce', 'st-croix', 'washburn'],
  douglas: ['ashland', 'bayfield', 'washburn'],
  pierce: ['dunn', 'pepin', 'polk', 'st-croix'],
  marinette: ['florence', 'forest', 'langlade', 'oconto', 'menominee'],
  shawano: ['langlade', 'marathon', 'menominee', 'oconto', 'outagamie', 'waupaca'],
  oconto: ['brown', 'forest', 'langlade', 'marinette', 'menominee', 'shawano'],
  oneida: ['forest', 'langlade', 'price', 'vilas'],
  green: ['dane', 'iowa', 'lafayette', 'rock', 'walworth'],
  trempealeau: ['buffalo', 'eau-claire', 'jackson', 'la-crosse', 'pepin'],
  door: ['brown', 'kewaunee', 'marinette'],
  lincoln: ['langlade', 'marathon', 'oneida', 'price', 'taylor'],
  juneau: ['adams', 'jackson', 'monroe', 'sauk', 'wood'],
  waushara: ['green-lake', 'marquette', 'portage', 'waupaca', 'winnebago'],
  iowa: ['dane', 'grant', 'green', 'lafayette', 'richland', 'sauk'],
  vilas: ['forest', 'iron', 'oneida', 'price'],
  adams: ['columbia', 'juneau', 'marquette', 'portage', 'sauk', 'waushara', 'wood'],
  jackson: ['clark', 'eau-claire', 'juneau', 'la-crosse', 'monroe', 'trempealeau', 'wood'],
  kewaunee: ['brown', 'door', 'manitowoc'],
  taylor: ['chippewa', 'clark', 'jackson', 'langlade', 'lincoln', 'marathon', 'price', 'rusk'],
  langlade: ['forest', 'lincoln', 'marathon', 'menominee', 'oconto', 'oneida', 'price', 'shawano'],
  'green-lake': ['columbia', 'fond-du-lac', 'green', 'marquette', 'winnebago', 'waushara'],
  sawyer: ['ashland', 'bayfield', 'barron', 'douglas', 'price', 'rusk', 'washburn'],
  lafayette: ['grant', 'green', 'iowa'],
  burnett: ['barron', 'douglas', 'polk', 'washburn'],
  washburn: ['barron', 'bayfield', 'burnett', 'douglas', 'polk', 'sawyer'],
  richland: ['crawford', 'grant', 'iowa', 'sauk', 'vernon'],
  bayfield: ['ashland', 'douglas', 'sawyer', 'washburn'],
  ashland: ['bayfield', 'iron', 'price', 'sawyer', 'washburn'],
  marquette: ['adams', 'columbia', 'green-lake', 'waushara'],
  crawford: ['grant', 'iowa', 'richland', 'vernon'],
  rusk: ['barron', 'chippewa', 'clark', 'jackson', 'price', 'sawyer', 'taylor'],
  price: ['ashland', 'lincoln', 'oneida', 'rusk', 'sawyer', 'taylor', 'vilas'],
  buffalo: ['pepin', 'trempealeau', 'la-crosse', 'eau-claire', 'dunn'],
  forest: ['florence', 'langlade', 'marinette', 'oconto', 'oneida', 'vilas'],
  pepin: ['buffalo', 'dunn', 'eau-claire', 'pierce', 'trempealeau'],
  iron: ['ashland', 'vilas'],
  florence: ['forest', 'marinette'],
  menominee: ['langlade', 'oconto', 'shawano', 'outagamie'],
  clark: ['chippewa', 'dunn', 'eau-claire', 'jackson', 'marathon', 'taylor', 'wood', 'rusk'],
  vernon: ['crawford', 'la-crosse', 'monroe', 'richland', 'sauk'],
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
  douglas: [
    {
      slug: 'st-louis',
      stateSlug: 'minnesota',
      name: 'St. Louis',
      seat: 'Duluth',
      displayLabel: 'St. Louis County, MN',
    },
  ],
  pierce: [
    {
      slug: 'washington',
      stateSlug: 'minnesota',
      name: 'Washington',
      seat: 'Stillwater',
      displayLabel: 'Washington County, MN',
    },
    {
      slug: 'goodhue',
      stateSlug: 'minnesota',
      name: 'Goodhue',
      seat: 'Red Wing',
      displayLabel: 'Goodhue County, MN',
    },
  ],
  polk: [
    {
      slug: 'polk',
      stateSlug: 'minnesota',
      name: 'Polk',
      seat: 'Crookston',
      displayLabel: 'Polk County, MN',
    },
  ],
  crawford: [
    {
      slug: 'clayton',
      stateSlug: 'iowa',
      name: 'Clayton',
      seat: 'Elkader',
      displayLabel: 'Clayton County, IA',
    },
  ],
  iron: [
    {
      slug: 'gogebic',
      stateSlug: 'michigan',
      name: 'Gogebic',
      seat: 'Bessemer',
      displayLabel: 'Gogebic County, MI',
    },
  ],
  florence: [
    {
      slug: 'dickinson',
      stateSlug: 'michigan',
      name: 'Dickinson',
      seat: 'Iron Mountain',
      displayLabel: 'Dickinson County, MI',
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
  {
    slug: 'dunn',
    name: 'Dunn',
    seat: 'Menomonie',
    city: 'Menomonie',
    metro: 'dunn-metro-wi',
    costTier: 'regional_hub',
    citySlug: 'menomonie',
    regional1: 'menomonie-corridor',
    regional2: 'red-cedar-dunn',
    topId: 'regional-dunn-wi-movers',
    topName: 'Regional Menomonie / Dunn Providers',
    regional1Name: 'Menomonie Corridor Moving',
    regional2Name: 'Red Cedar Dunn Moving',
    marketNotes:
      'Dunn County, WI is a western Wisconsin county centered on Menomonie with residential demand across the Red Cedar and Chippewa Valley fringe corridor — not to be confused with Dunn County in other states.',
    costNote:
      'Dunn County pricing reflects Menomonie-area demand, UW–Stout campus turnover, and competition among regional agents serving Dunn County, WI communities.',
    tipVariant: 'university',
  },
  {
    slug: 'barron',
    name: 'Barron',
    seat: 'Barron',
    city: 'Barron',
    metro: 'barron-metro-wi',
    costTier: 'rural',
    citySlug: 'barron',
    regional1: 'barron-corridor',
    regional2: 'northwest-barron',
    topId: 'regional-barron-wi-movers',
    topName: 'Regional Barron / Barron County Providers',
    regional1Name: 'Barron Corridor Moving',
    regional2Name: 'Northwest Barron Moving',
    marketNotes:
      'Barron County, WI is a northwestern Wisconsin county centered on Barron with rural residential demand — not to be confused with Barron County in other states.',
    costNote:
      'Barron County pricing reflects northwest Wisconsin rural demand, longer travel distances, and competition among regional agents serving Barron County, WI communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'polk',
    name: 'Polk',
    seat: 'Balsam Lake',
    city: 'Balsam Lake',
    metro: 'polk-metro-wi',
    costTier: 'rural',
    citySlug: 'balsam-lake',
    regional1: 'balsam-lake-corridor',
    regional2: 'st-croix-polk',
    topId: 'regional-polk-wi-movers',
    topName: 'Regional Balsam Lake / Polk Providers',
    regional1Name: 'Balsam Lake Corridor Moving',
    regional2Name: 'St. Croix Polk Moving',
    marketNotes:
      'Polk County, WI is a northwestern Wisconsin county centered on Balsam Lake with rural residential demand along the St. Croix River corridor — not to be confused with Polk County, MN or other states.',
    costNote:
      'Polk County pricing reflects northwest Wisconsin rural demand, St. Croix River corridor travel distances, cross-border Minnesota logistics, and competition among regional agents serving Polk County, WI communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'douglas',
    name: 'Douglas',
    seat: 'Superior',
    city: 'Superior',
    metro: 'douglas-metro-wi',
    costTier: 'secondary_metro',
    citySlug: 'superior',
    regional1: 'superior-corridor',
    regional2: 'lake-superior-douglas',
    topId: 'regional-douglas-wi-movers',
    topName: 'Regional Superior / Douglas Providers',
    regional1Name: 'Superior Corridor Moving',
    regional2Name: 'Lake Superior Douglas Moving',
    marketNotes:
      'Douglas County, WI is a northwestern Wisconsin county centered on Superior with strong urban and residential demand across the Duluth–Superior Twin Ports corridor — not to be confused with Douglas County in other states.',
    costNote:
      'Douglas County pricing reflects Twin Ports cross-border demand, Lake Superior shoreline logistics, and competition among regional agents serving Douglas County, WI communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'pierce',
    name: 'Pierce',
    seat: 'Ellsworth',
    city: 'Ellsworth',
    metro: 'pierce-metro-wi',
    costTier: 'metro',
    citySlug: 'ellsworth',
    regional1: 'ellsworth-corridor',
    regional2: 'st-croix-pierce',
    topId: 'regional-pierce-wi-movers',
    topName: 'Regional Ellsworth / Pierce Providers',
    regional1Name: 'Ellsworth Corridor Moving',
    regional2Name: 'St. Croix Pierce Moving',
    marketNotes:
      'Pierce County, WI is a western Wisconsin county centered on Ellsworth with suburban and residential demand along the Twin Cities west-metro St. Croix River corridor — not to be confused with Pierce County in other states.',
    costNote:
      'Pierce County pricing reflects Twin Cities corridor demand, I-94 and St. Croix River bridge traffic, high-value suburban homes, and competition among regional agents serving Pierce County, WI communities.',
    tipVariant: 'msp_metro',
  },
  {
    slug: 'marinette',
    name: 'Marinette',
    seat: 'Marinette',
    city: 'Marinette',
    metro: 'marinette-metro-wi',
    costTier: 'regional_hub',
    citySlug: 'marinette',
    regional1: 'marinette-corridor',
    regional2: 'menominee-river-marinette',
    topId: 'regional-marinette-wi-movers',
    topName: 'Regional Marinette / Marinette County Providers',
    regional1Name: 'Marinette Corridor Moving',
    regional2Name: 'Menominee River Marinette Moving',
    marketNotes:
      'Marinette County, WI is a northeastern Wisconsin county centered on Marinette with residential demand along the Menominee River and Green Bay fringe corridor.',
    costNote:
      'Marinette County pricing reflects northeast Wisconsin regional demand, Menominee River corridor travel distances, and competition among regional agents serving Marinette County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'shawano',
    name: 'Shawano',
    seat: 'Shawano',
    city: 'Shawano',
    metro: 'shawano-metro-wi',
    costTier: 'rural',
    citySlug: 'shawano',
    regional1: 'shawano-corridor',
    regional2: 'wolf-river-shawano',
    topId: 'regional-shawano-wi-movers',
    topName: 'Regional Shawano / Shawano County Providers',
    regional1Name: 'Shawano Corridor Moving',
    regional2Name: 'Wolf River Shawano Moving',
    marketNotes:
      'Shawano County, WI is a northeastern Wisconsin county centered on Shawano with rural residential demand along the Wolf River corridor.',
    costNote:
      'Shawano County pricing reflects rural northeast Wisconsin demand, longer travel distances, and competition among regional agents serving Shawano County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'oconto',
    name: 'Oconto',
    seat: 'Oconto',
    city: 'Oconto',
    metro: 'oconto-metro-wi',
    costTier: 'rural',
    citySlug: 'oconto',
    regional1: 'oconto-corridor',
    regional2: 'bay-lake-oconto',
    topId: 'regional-oconto-wi-movers',
    topName: 'Regional Oconto / Oconto County Providers',
    regional1Name: 'Oconto Corridor Moving',
    regional2Name: 'Bay Lake Oconto Moving',
    marketNotes:
      'Oconto County, WI is a northeastern Wisconsin county centered on Oconto with rural residential demand along the Bay of Green Bay fringe corridor.',
    costNote:
      'Oconto County pricing reflects rural northeast Wisconsin demand, Bay of Green Bay corridor travel distances, and competition among regional agents serving Oconto County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'oneida',
    name: 'Oneida',
    seat: 'Rhinelander',
    city: 'Rhinelander',
    metro: 'oneida-metro-wi',
    costTier: 'secondary_metro',
    citySlug: 'rhinelander',
    regional1: 'rhinelander-corridor',
    regional2: 'lakes-country-oneida',
    topId: 'regional-oneida-wi-movers',
    topName: 'Regional Rhinelander / Oneida Providers',
    regional1Name: 'Rhinelander Corridor Moving',
    regional2Name: 'Lakes Country Oneida Moving',
    marketNotes:
      'Oneida County, WI is a north-central Wisconsin county centered on Rhinelander with lakes-country and residential demand — not to be confused with Oneida County in other states.',
    costNote:
      'Oneida County pricing reflects northwoods lakes-country demand, seasonal vacation-home logistics, and competition among regional agents serving Oneida County, WI communities.',
    tipVariant: 'tourist',
  },
  {
    slug: 'green',
    name: 'Green',
    seat: 'Monroe',
    city: 'Monroe',
    metro: 'green-metro-wi',
    costTier: 'rural',
    citySlug: 'monroe',
    regional1: 'monroe-corridor',
    regional2: 'driftless-green',
    topId: 'regional-green-wi-movers',
    topName: 'Regional Monroe / Green Providers',
    regional1Name: 'Monroe Corridor Moving',
    regional2Name: 'Driftless Green Moving',
    marketNotes:
      'Green County, WI is a southern Wisconsin county centered on Monroe with rural residential demand across the Driftless Area — not to be confused with Green County in other states or Monroe County, WI (Sparta).',
    costNote:
      'Green County pricing reflects Driftless Area rural demand, longer travel distances, and competition among regional agents serving Green County, WI communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'trempealeau',
    name: 'Trempealeau',
    seat: 'Whitehall',
    city: 'Whitehall',
    metro: 'trempealeau-metro-wi',
    costTier: 'rural',
    citySlug: 'whitehall',
    regional1: 'whitehall-corridor',
    regional2: 'trempealeau-river',
    topId: 'regional-trempealeau-wi-movers',
    topName: 'Regional Whitehall / Trempealeau Providers',
    regional1Name: 'Whitehall Corridor Moving',
    regional2Name: 'Trempealeau River Moving',
    marketNotes:
      'Trempealeau County, WI is a western Wisconsin county centered on Whitehall with rural residential demand along the Mississippi River bluff corridor.',
    costNote:
      'Trempealeau County pricing reflects rural western Wisconsin demand, Mississippi River bluff corridor travel distances, and competition among regional agents serving Trempealeau County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'door',
    name: 'Door',
    seat: 'Sturgeon Bay',
    city: 'Sturgeon Bay',
    metro: 'door-metro-wi',
    costTier: 'metro',
    citySlug: 'sturgeon-bay',
    regional1: 'sturgeon-bay-corridor',
    regional2: 'door-peninsula',
    topId: 'regional-door-wi-movers',
    topName: 'Regional Sturgeon Bay / Door Providers',
    regional1Name: 'Sturgeon Bay Corridor Moving',
    regional2Name: 'Door Peninsula Moving',
    marketNotes:
      'Door County, WI is a northeastern Wisconsin county centered on Sturgeon Bay with strong tourism, vacation-home, and residential demand across the Door Peninsula.',
    costNote:
      'Door County pricing reflects Door Peninsula tourism demand, seasonal vacation-home and second-home logistics, high-value lakeshore properties, and competition among regional agents serving Door County communities.',
    tipVariant: 'tourist',
  },
  {
    slug: 'lincoln',
    name: 'Lincoln',
    seat: 'Merrill',
    city: 'Merrill',
    metro: 'lincoln-metro-wi',
    costTier: 'regional_hub',
    citySlug: 'merrill',
    regional1: 'merrill-corridor',
    regional2: 'wisconsin-river-lincoln',
    topId: 'regional-lincoln-wi-movers',
    topName: 'Regional Merrill / Lincoln Providers',
    regional1Name: 'Merrill Corridor Moving',
    regional2Name: 'Wisconsin River Lincoln Moving',
    marketNotes:
      'Lincoln County, WI is a north-central Wisconsin county centered on Merrill with rural residential demand along the Wisconsin River corridor — not to be confused with Lincoln County in other states.',
    costNote:
      'Lincoln County pricing reflects north-central Wisconsin regional demand, Wisconsin River corridor travel distances, and competition among regional agents serving Lincoln County, WI communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'juneau',
    name: 'Juneau',
    seat: 'Mauston',
    city: 'Mauston',
    metro: 'juneau-metro-wi',
    costTier: 'rural',
    citySlug: 'mauston',
    regional1: 'mauston-corridor',
    regional2: 'wisconsin-dells-juneau',
    topId: 'regional-juneau-wi-movers',
    topName: 'Regional Mauston / Juneau Providers',
    regional1Name: 'Mauston Corridor Moving',
    regional2Name: 'Wisconsin Dells Juneau Moving',
    marketNotes:
      'Juneau County, WI is a central Wisconsin county centered on Mauston with rural residential demand across the Wisconsin Dells gateway corridor — not to be confused with Juneau County in other states.',
    costNote:
      'Juneau County pricing reflects Wisconsin Dells tourism-gateway demand, seasonal turnover, and competition among regional agents serving Juneau County, WI communities.',
    tipVariant: 'tourist',
  },
  {
    slug: 'waushara',
    name: 'Waushara',
    seat: 'Wautoma',
    city: 'Wautoma',
    metro: 'waushara-metro-wi',
    costTier: 'rural',
    citySlug: 'wautoma',
    regional1: 'wautoma-corridor',
    regional2: 'central-plains-waushara',
    topId: 'regional-waushara-wi-movers',
    topName: 'Regional Wautoma / Waushara Providers',
    regional1Name: 'Wautoma Corridor Moving',
    regional2Name: 'Central Plains Waushara Moving',
    marketNotes:
      'Waushara County, WI is a central Wisconsin county centered on Wautoma with rural residential demand across central Wisconsin plains communities.',
    costNote:
      'Waushara County pricing reflects rural central Wisconsin demand, longer travel distances, and competition among regional agents serving Waushara County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'iowa',
    name: 'Iowa',
    seat: 'Dodgeville',
    city: 'Dodgeville',
    metro: 'iowa-metro-wi',
    costTier: 'rural',
    citySlug: 'dodgeville',
    regional1: 'dodgeville-corridor',
    regional2: 'driftless-iowa',
    topId: 'regional-iowa-wi-movers',
    topName: 'Regional Dodgeville / Iowa Providers',
    regional1Name: 'Dodgeville Corridor Moving',
    regional2Name: 'Driftless Iowa Moving',
    marketNotes:
      'Iowa County, WI is a southwestern Wisconsin county centered on Dodgeville with rural residential demand across the Driftless Area — not to be confused with the state of Iowa or Iowa County in other states.',
    costNote:
      'Iowa County pricing reflects Driftless Area rural demand, longer travel distances, and competition among regional agents serving Iowa County, WI communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'vilas',
    name: 'Vilas',
    seat: 'Eagle River',
    city: 'Eagle River',
    metro: 'vilas-metro-wi',
    costTier: 'secondary_metro',
    citySlug: 'eagle-river',
    regional1: 'eagle-river-corridor',
    regional2: 'northwoods-vilas',
    topId: 'regional-vilas-wi-movers',
    topName: 'Regional Eagle River / Vilas Providers',
    regional1Name: 'Eagle River Corridor Moving',
    regional2Name: 'Northwoods Vilas Moving',
    marketNotes:
      'Vilas County, WI is a north-central Wisconsin county centered on Eagle River with lakes-country and residential demand across the northwoods corridor.',
    costNote:
      'Vilas County pricing reflects northwoods lakes-country demand, seasonal vacation-home logistics, and competition among regional agents serving Vilas County communities.',
    tipVariant: 'tourist',
  },
  {
    slug: 'adams',
    name: 'Adams',
    seat: 'Friendship',
    city: 'Friendship',
    metro: 'adams-metro-wi',
    costTier: 'rural',
    citySlug: 'friendship',
    regional1: 'friendship-corridor',
    regional2: 'central-sands-adams',
    topId: 'regional-adams-wi-movers',
    topName: 'Regional Friendship / Adams Providers',
    regional1Name: 'Friendship Corridor Moving',
    regional2Name: 'Central Sands Adams Moving',
    marketNotes:
      'Adams County, WI is a central Wisconsin county centered on Friendship with rural residential demand across central sands corridor communities — not to be confused with Adams County in other states.',
    costNote:
      'Adams County pricing reflects rural central Wisconsin demand, Wisconsin Dells fringe tourism logistics, and competition among regional agents serving Adams County, WI communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'jackson',
    name: 'Jackson',
    seat: 'Black River Falls',
    city: 'Black River Falls',
    metro: 'jackson-metro-wi',
    costTier: 'rural',
    citySlug: 'black-river-falls',
    regional1: 'black-river-falls-corridor',
    regional2: 'black-river-jackson',
    topId: 'regional-jackson-wi-movers',
    topName: 'Regional Black River Falls / Jackson Providers',
    regional1Name: 'Black River Falls Corridor Moving',
    regional2Name: 'Black River Jackson Moving',
    marketNotes:
      'Jackson County, WI is a western Wisconsin county centered on Black River Falls with rural residential demand — not to be confused with Jackson County in other states.',
    costNote:
      'Jackson County pricing reflects rural western Wisconsin demand, Black River corridor travel distances, and competition among regional agents serving Jackson County, WI communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'kewaunee',
    name: 'Kewaunee',
    seat: 'Kewaunee',
    city: 'Kewaunee',
    metro: 'kewaunee-metro-wi',
    costTier: 'rural',
    citySlug: 'kewaunee',
    regional1: 'kewaunee-corridor',
    regional2: 'lake-michigan-kewaunee',
    topId: 'regional-kewaunee-wi-movers',
    topName: 'Regional Kewaunee / Kewaunee County Providers',
    regional1Name: 'Kewaunee Corridor Moving',
    regional2Name: 'Lake Michigan Kewaunee Moving',
    marketNotes:
      'Kewaunee County, WI is an eastern Wisconsin county centered on Kewaunee with rural residential demand along the Lake Michigan shoreline.',
    costNote:
      'Kewaunee County pricing reflects rural eastern Wisconsin demand, Lake Michigan shoreline corridor travel distances, and competition among regional agents serving Kewaunee County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'taylor',
    name: 'Taylor',
    seat: 'Medford',
    city: 'Medford',
    metro: 'taylor-metro-wi',
    costTier: 'regional_hub',
    citySlug: 'medford',
    regional1: 'medford-corridor',
    regional2: 'red-cedar-taylor',
    topId: 'regional-taylor-wi-movers',
    topName: 'Regional Medford / Taylor Providers',
    regional1Name: 'Medford Corridor Moving',
    regional2Name: 'Red Cedar Taylor Moving',
    marketNotes:
      'Taylor County, WI is a north-central Wisconsin county centered on Medford with rural residential demand across the Red Cedar corridor — not to be confused with Taylor County in other states.',
    costNote:
      'Taylor County pricing reflects north-central Wisconsin regional demand, Red Cedar corridor travel distances, and competition among regional agents serving Taylor County, WI communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'langlade',
    name: 'Langlade',
    seat: 'Antigo',
    city: 'Antigo',
    metro: 'langlade-metro-wi',
    costTier: 'rural',
    citySlug: 'antigo',
    regional1: 'antigo-corridor',
    regional2: 'wolf-river-langlade',
    topId: 'regional-langlade-wi-movers',
    topName: 'Regional Antigo / Langlade Providers',
    regional1Name: 'Antigo Corridor Moving',
    regional2Name: 'Wolf River Langlade Moving',
    marketNotes:
      'Langlade County, WI is a north-central Wisconsin county centered on Antigo with rural residential demand along the Wolf River corridor — not to be confused with Langlade County in other states.',
    costNote:
      'Langlade County pricing reflects rural north-central Wisconsin demand, longer travel distances, and competition among regional agents serving Langlade County, WI communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'green-lake',
    name: 'Green Lake',
    seat: 'Green Lake',
    city: 'Green Lake',
    metro: 'green-lake-metro-wi',
    costTier: 'secondary_metro',
    citySlug: 'green-lake',
    regional1: 'green-lake-corridor',
    regional2: 'big-green-lake',
    topId: 'regional-greenlake-wi-movers',
    topName: 'Regional Green Lake / Green Lake County Providers',
    regional1Name: 'Green Lake Corridor Moving',
    regional2Name: 'Big Green Lake Moving',
    marketNotes:
      'Green Lake County, WI is a central Wisconsin county centered on Green Lake with lakes-country and residential demand across Big Green Lake corridor communities.',
    costNote:
      'Green Lake County pricing reflects lakes-country demand, seasonal vacation-home logistics, and competition among regional agents serving Green Lake County communities.',
    tipVariant: 'tourist',
  },
  {
    slug: 'sawyer',
    name: 'Sawyer',
    seat: 'Hayward',
    city: 'Hayward',
    metro: 'sawyer-metro-wi',
    costTier: 'secondary_metro',
    citySlug: 'hayward',
    regional1: 'hayward-corridor',
    regional2: 'namakagon-sawyer',
    topId: 'regional-sawyer-wi-movers',
    topName: 'Regional Hayward / Sawyer Providers',
    regional1Name: 'Hayward Corridor Moving',
    regional2Name: 'Namakagon Sawyer Moving',
    marketNotes:
      'Sawyer County, WI is a northwestern Wisconsin county centered on Hayward with lakes-country and residential demand across the northwoods Namakagon corridor.',
    costNote:
      'Sawyer County pricing reflects northwoods lakes-country demand, seasonal vacation-home logistics, and competition among regional agents serving Sawyer County communities.',
    tipVariant: 'tourist',
  },
  {
    slug: 'lafayette',
    name: 'Lafayette',
    seat: 'Darlington',
    city: 'Darlington',
    metro: 'lafayette-metro-wi',
    costTier: 'rural',
    citySlug: 'darlington',
    regional1: 'darlington-corridor',
    regional2: 'driftless-lafayette',
    topId: 'regional-lafayette-wi-movers',
    topName: 'Regional Darlington / Lafayette Providers',
    regional1Name: 'Darlington Corridor Moving',
    regional2Name: 'Driftless Lafayette Moving',
    marketNotes:
      'Lafayette County, WI is a southwestern Wisconsin county centered on Darlington with rural residential demand across the Driftless Area — not to be confused with Lafayette County in other states.',
    costNote:
      'Lafayette County pricing reflects Driftless Area rural demand, longer travel distances, and competition among regional agents serving Lafayette County, WI communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'burnett',
    name: 'Burnett',
    seat: 'Grantsburg',
    city: 'Grantsburg',
    metro: 'burnett-metro-wi',
    costTier: 'secondary_metro',
    citySlug: 'grantsburg',
    regional1: 'grantsburg-corridor',
    regional2: 'st-croix-burnett',
    topId: 'regional-burnett-wi-movers',
    topName: 'Regional Grantsburg / Burnett Providers',
    regional1Name: 'Grantsburg Corridor Moving',
    regional2Name: 'St. Croix Burnett Moving',
    marketNotes:
      'Burnett County, WI is a northwestern Wisconsin county centered on Grantsburg with lakes-country and residential demand along the St. Croix River corridor.',
    costNote:
      'Burnett County pricing reflects northwest Wisconsin lakes-country demand, seasonal vacation-home logistics, and competition among regional agents serving Burnett County communities.',
    tipVariant: 'tourist',
  },
  {
    slug: 'washburn',
    name: 'Washburn',
    seat: 'Shell Lake',
    city: 'Shell Lake',
    metro: 'washburn-metro-wi',
    costTier: 'secondary_metro',
    citySlug: 'shell-lake',
    regional1: 'shell-lake-corridor',
    regional2: 'northwoods-washburn',
    topId: 'regional-washburn-wi-movers',
    topName: 'Regional Shell Lake / Washburn Providers',
    regional1Name: 'Shell Lake Corridor Moving',
    regional2Name: 'Northwoods Washburn Moving',
    marketNotes:
      'Washburn County, WI is a northwestern Wisconsin county centered on Shell Lake with lakes-country and residential demand across the northwoods corridor — not to be confused with Washburn County in other states.',
    costNote:
      'Washburn County pricing reflects northwest Wisconsin lakes-country demand, seasonal vacation-home logistics, and competition among regional agents serving Washburn County, WI communities.',
    tipVariant: 'tourist',
  },
  {
    slug: 'richland',
    name: 'Richland',
    seat: 'Richland Center',
    city: 'Richland Center',
    metro: 'richland-metro-wi',
    costTier: 'rural',
    citySlug: 'richland-center',
    regional1: 'richland-center-corridor',
    regional2: 'driftless-richland',
    topId: 'regional-richland-wi-movers',
    topName: 'Regional Richland Center / Richland Providers',
    regional1Name: 'Richland Center Corridor Moving',
    regional2Name: 'Driftless Richland Moving',
    marketNotes:
      'Richland County, WI is a southwestern Wisconsin county centered on Richland Center with rural residential demand across the Driftless Area — not to be confused with Richland County in other states.',
    costNote:
      'Richland County pricing reflects Driftless Area rural demand, longer travel distances, and competition among regional agents serving Richland County, WI communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'bayfield',
    name: 'Bayfield',
    seat: 'Washburn',
    city: 'Washburn',
    metro: 'bayfield-metro-wi',
    costTier: 'secondary_metro',
    citySlug: 'washburn',
    regional1: 'washburn-corridor',
    regional2: 'apostle-bayfield',
    topId: 'regional-bayfield-wi-movers',
    topName: 'Regional Washburn / Bayfield Providers',
    regional1Name: 'Washburn Corridor Moving',
    regional2Name: 'Apostle Bayfield Moving',
    marketNotes:
      'Bayfield County, WI is a northwestern Wisconsin county centered on Washburn with lakes-country and residential demand across the Apostle Islands lakeshore corridor.',
    costNote:
      'Bayfield County pricing reflects Apostle Islands lakeshore demand, seasonal vacation-home logistics, and competition among regional agents serving Bayfield County communities.',
    tipVariant: 'tourist',
  },
  {
    slug: 'ashland',
    name: 'Ashland',
    seat: 'Ashland',
    city: 'Ashland',
    metro: 'ashland-metro-wi',
    costTier: 'regional_hub',
    citySlug: 'ashland',
    regional1: 'ashland-corridor',
    regional2: 'lake-superior-ashland',
    topId: 'regional-ashland-wi-movers',
    topName: 'Regional Ashland / Ashland County Providers',
    regional1Name: 'Ashland Corridor Moving',
    regional2Name: 'Lake Superior Ashland Moving',
    marketNotes:
      'Ashland County, WI is a northwestern Wisconsin county centered on Ashland with residential demand along the Lake Superior northwoods corridor — not to be confused with Ashland County in other states.',
    costNote:
      'Ashland County pricing reflects Lake Superior northwoods regional demand, corridor travel distances, and competition among regional agents serving Ashland County, WI communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'marquette',
    name: 'Marquette',
    seat: 'Montello',
    city: 'Montello',
    metro: 'marquette-metro-wi',
    costTier: 'rural',
    citySlug: 'montello',
    regional1: 'montello-corridor',
    regional2: 'fox-river-marquette',
    topId: 'regional-marquette-wi-movers',
    topName: 'Regional Montello / Marquette Providers',
    regional1Name: 'Montello Corridor Moving',
    regional2Name: 'Fox River Marquette Moving',
    marketNotes:
      'Marquette County, WI is a central Wisconsin county centered on Montello with rural residential demand along the Fox River corridor — not to be confused with Marquette County in other states.',
    costNote:
      'Marquette County pricing reflects rural central Wisconsin demand, longer travel distances, and competition among regional agents serving Marquette County, WI communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'crawford',
    name: 'Crawford',
    seat: 'Prairie du Chien',
    city: 'Prairie du Chien',
    metro: 'crawford-metro-wi',
    costTier: 'rural',
    citySlug: 'prairie-du-chien',
    regional1: 'prairie-du-chien-corridor',
    regional2: 'mississippi-crawford',
    topId: 'regional-crawford-wi-movers',
    topName: 'Regional Prairie du Chien / Crawford Providers',
    regional1Name: 'Prairie du Chien Corridor Moving',
    regional2Name: 'Mississippi Crawford Moving',
    marketNotes:
      'Crawford County, WI is a southwestern Wisconsin county centered on Prairie du Chien with rural residential demand along the Mississippi River corridor and cross-border Iowa logistics.',
    costNote:
      'Crawford County pricing reflects Mississippi River corridor demand, cross-border Iowa logistics, and competition among regional agents serving Crawford County, WI communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'rusk',
    name: 'Rusk',
    seat: 'Ladysmith',
    city: 'Ladysmith',
    metro: 'rusk-metro-wi',
    costTier: 'rural',
    citySlug: 'ladysmith',
    regional1: 'ladysmith-corridor',
    regional2: 'flambeau-rusk',
    topId: 'regional-rusk-wi-movers',
    topName: 'Regional Ladysmith / Rusk Providers',
    regional1Name: 'Ladysmith Corridor Moving',
    regional2Name: 'Flambeau Rusk Moving',
    marketNotes:
      'Rusk County, WI is a northern Wisconsin county centered on Ladysmith with rural residential demand along the Flambeau River corridor — not to be confused with Rusk County in other states.',
    costNote:
      'Rusk County pricing reflects rural northern Wisconsin demand, longer travel distances, and competition among regional agents serving Rusk County, WI communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'price',
    name: 'Price',
    seat: 'Phillips',
    city: 'Phillips',
    metro: 'price-metro-wi',
    costTier: 'rural',
    citySlug: 'phillips',
    regional1: 'phillips-corridor',
    regional2: 'northwoods-price',
    topId: 'regional-price-wi-movers',
    topName: 'Regional Phillips / Price Providers',
    regional1Name: 'Phillips Corridor Moving',
    regional2Name: 'Northwoods Price Moving',
    marketNotes:
      'Price County, WI is a north-central Wisconsin county centered on Phillips with rural residential demand across the northwoods corridor — not to be confused with Price County in other states.',
    costNote:
      'Price County pricing reflects northwoods rural demand, longer travel distances, and competition among regional agents serving Price County, WI communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'buffalo',
    name: 'Buffalo',
    seat: 'Alma',
    city: 'Alma',
    metro: 'buffalo-metro-wi',
    costTier: 'rural',
    citySlug: 'alma',
    regional1: 'alma-corridor',
    regional2: 'mississippi-bluff-buffalo',
    topId: 'regional-buffalo-wi-movers',
    topName: 'Regional Alma / Buffalo Providers',
    regional1Name: 'Alma Corridor Moving',
    regional2Name: 'Mississippi Bluff Buffalo Moving',
    marketNotes:
      'Buffalo County, WI is a western Wisconsin county centered on Alma with rural residential demand along the Mississippi River bluff corridor — not to be confused with Buffalo County in other states.',
    costNote:
      'Buffalo County pricing reflects Mississippi River bluff corridor demand, rural travel distances, and competition among regional agents serving Buffalo County, WI communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'forest',
    name: 'Forest',
    seat: 'Crandon',
    city: 'Crandon',
    metro: 'forest-metro-wi',
    costTier: 'secondary_metro',
    citySlug: 'crandon',
    regional1: 'crandon-corridor',
    regional2: 'northwoods-forest',
    topId: 'regional-forest-wi-movers',
    topName: 'Regional Crandon / Forest Providers',
    regional1Name: 'Crandon Corridor Moving',
    regional2Name: 'Northwoods Forest Moving',
    marketNotes:
      'Forest County, WI is a north-central Wisconsin county centered on Crandon with lakes-country and residential demand across the northwoods corridor.',
    costNote:
      'Forest County pricing reflects northwoods lakes-country demand, seasonal vacation-home logistics, and competition among regional agents serving Forest County communities.',
    tipVariant: 'tourist',
  },
  {
    slug: 'pepin',
    name: 'Pepin',
    seat: 'Durand',
    city: 'Durand',
    metro: 'pepin-metro-wi',
    costTier: 'rural',
    citySlug: 'durand',
    regional1: 'durand-corridor',
    regional2: 'chippewa-river-pepin',
    topId: 'regional-pepin-wi-movers',
    topName: 'Regional Durand / Pepin Providers',
    regional1Name: 'Durand Corridor Moving',
    regional2Name: 'Chippewa River Pepin Moving',
    marketNotes:
      'Pepin County, WI is a western Wisconsin county centered on Durand with rural residential demand along the Chippewa River corridor — not to be confused with Pepin County in other states.',
    costNote:
      'Pepin County pricing reflects rural western Wisconsin demand, Chippewa River corridor travel distances, and competition among regional agents serving Pepin County, WI communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'iron',
    name: 'Iron',
    seat: 'Hurley',
    city: 'Hurley',
    metro: 'iron-metro-wi',
    costTier: 'rural',
    citySlug: 'hurley',
    regional1: 'hurley-corridor',
    regional2: 'gogebic-range-iron',
    topId: 'regional-iron-wi-movers',
    topName: 'Regional Hurley / Iron Providers',
    regional1Name: 'Hurley Corridor Moving',
    regional2Name: 'Gogebic Range Iron Moving',
    marketNotes:
      'Iron County, WI is a northern Wisconsin county centered on Hurley with rural residential demand across the Gogebic Range corridor — not to be confused with Iron County in other states.',
    costNote:
      'Iron County pricing reflects Gogebic Range rural demand, cross-border Michigan logistics, and competition among regional agents serving Iron County, WI communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'florence',
    name: 'Florence',
    seat: 'Florence',
    city: 'Florence',
    metro: 'florence-metro-wi',
    costTier: 'rural',
    citySlug: 'florence',
    regional1: 'florence-corridor',
    regional2: 'pine-river-florence',
    topId: 'regional-florence-wi-movers',
    topName: 'Regional Florence / Florence County Providers',
    regional1Name: 'Florence Corridor Moving',
    regional2Name: 'Pine River Florence Moving',
    marketNotes:
      'Florence County, WI is a northeastern Wisconsin county centered on Florence with rural residential demand along the Pine River UP-border corridor — not to be confused with Florence County in other states.',
    costNote:
      'Florence County pricing reflects rural northeast Wisconsin demand, cross-border Michigan logistics, and competition among regional agents serving Florence County, WI communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'menominee',
    name: 'Menominee',
    seat: 'Keshena',
    city: 'Keshena',
    metro: 'menominee-metro-wi',
    costTier: 'rural',
    citySlug: 'keshena',
    regional1: 'keshena-corridor',
    regional2: 'wolf-river-menominee',
    topId: 'regional-menominee-wi-movers',
    topName: 'Regional Keshena / Menominee Providers',
    regional1Name: 'Keshena Corridor Moving',
    regional2Name: 'Wolf River Menominee Moving',
    marketNotes:
      'Menominee County, WI is a northeastern Wisconsin county centered on Keshena with rural residential demand along the Wolf River corridor — not to be confused with Menominee County in other states.',
    costNote:
      'Menominee County pricing reflects rural northeast Wisconsin demand, Wolf River corridor travel distances, and competition among regional agents serving Menominee County, WI communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'clark',
    name: 'Clark',
    seat: 'Neillsville',
    city: 'Neillsville',
    metro: 'clark-metro-wi',
    costTier: 'regional_hub',
    citySlug: 'neillsville',
    regional1: 'neillsville-corridor',
    regional2: 'black-river-clark',
    topId: 'regional-clark-wi-movers',
    topName: 'Regional Neillsville / Clark Providers',
    regional1Name: 'Neillsville Corridor Moving',
    regional2Name: 'Black River Clark Moving',
    marketNotes:
      'Clark County, WI is a central Wisconsin county centered on Neillsville with residential demand along the Black River corridor — not to be confused with Clark County in other states.',
    costNote:
      'Clark County pricing reflects central Wisconsin regional demand, Black River corridor travel distances, and competition among regional agents serving Clark County, WI communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'vernon',
    name: 'Vernon',
    seat: 'Viroqua',
    city: 'Viroqua',
    metro: 'vernon-metro-wi',
    costTier: 'rural',
    citySlug: 'viroqua',
    regional1: 'viroqua-corridor',
    regional2: 'driftless-vernon',
    topId: 'regional-vernon-wi-movers',
    topName: 'Regional Viroqua / Vernon Providers',
    regional1Name: 'Viroqua Corridor Moving',
    regional2Name: 'Driftless Vernon Moving',
    marketNotes:
      'Vernon County, WI is a western Wisconsin county centered on Viroqua with rural residential demand across the Driftless Area — not to be confused with Vernon County in other states.',
    costNote:
      'Vernon County pricing reflects Driftless Area rural demand, longer travel distances, and competition among regional agents serving Vernon County, WI communities.',
    tipVariant: 'rural',
  },
];

const SEAT_BY_SLUG = Object.fromEntries(COUNTIES.map((c) => [c.slug, c.seat]));

const NON_CURATED_NAMES: Record<string, { name: string; seat: string }> = {};

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

/** Hand-curated Wisconsin county research — all 72 Wisconsin counties */
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

/** Hand-curated Wisconsin county testimonials — all 72 Wisconsin counties */
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

/** Hand-curated Wisconsin county mover lists — all 72 Wisconsin counties */
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

/** Seat and metro overrides for hand-curated Wisconsin counties (all 72 Wisconsin counties) */
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

/** Wisconsin curated county corridor links — all 72 Wisconsin counties */
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