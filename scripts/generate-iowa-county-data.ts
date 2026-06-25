/**
 * Generates Iowa county curation files (batch 1 — 21 counties).
 * Run: npx tsx scripts/generate-iowa-county-data.ts
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

/** Slug collisions with other states — always use explicit IA displayLabel */
const DISPLAY_LABELS: Partial<Record<string, string>> = {
  johnson: 'Johnson County, IA',
  dallas: 'Dallas County, IA',
  clinton: 'Clinton County, IA',
  marion: 'Marion County, IA',
  sioux: 'Sioux County, IA',
  warren: 'Warren County, IA',
  story: 'Story County, IA',
  dubuque: 'Dubuque County, IA',
  pottawattamie: 'Pottawattamie County, IA',
  marshall: 'Marshall County, IA',
  jasper: 'Jasper County, IA',
  webster: 'Webster County, IA',
  'des-moines': 'Des Moines County, IA',
  madison: 'Madison County, IA',
  washington: 'Washington County, IA',
  polk: 'Polk County, IA',
  linn: 'Linn County, IA',
  scott: 'Scott County, IA',
  clay: 'Clay County, IA',
  lee: 'Lee County, IA',
  wayne: 'Wayne County, IA',
  grant: 'Grant County, IA',
  franklin: 'Franklin County, IA',
  jefferson: 'Jefferson County, IA',
  jackson: 'Jackson County, IA',
  monroe: 'Monroe County, IA',
  decatur: 'Decatur County, IA',
  buchanan: 'Buchanan County, IA',
  cedar: 'Cedar County, IA',
  boone: 'Boone County, IA',
  hamilton: 'Hamilton County, IA',
  lucas: 'Lucas County, IA',
  union: 'Union County, IA',
  adams: 'Adams County, IA',
  cass: 'Cass County, IA',
  hancock: 'Hancock County, IA',
  floyd: 'Floyd County, IA',
  lyon: 'Lyon County, IA',
  plymouth: 'Plymouth County, IA',
  crawford: 'Crawford County, IA',
  calhoun: 'Calhoun County, IA',
  humboldt: 'Humboldt County, IA',
  pocahontas: 'Pocahontas County, IA',
  wright: 'Wright County, IA',
  appanoose: 'Appanoose County, IA',
  davis: 'Davis County, IA',
  keokuk: 'Keokuk County, IA',
  mahaska: 'Mahaska County, IA',
  poweshiek: 'Poweshiek County, IA',
  benton: 'Benton County, IA',
  delaware: 'Delaware County, IA',
  iowa: 'Iowa County, IA',
  jones: 'Jones County, IA',
  henry: 'Henry County, IA',
  louisa: 'Louisa County, IA',
  grundy: 'Grundy County, IA',
  hardin: 'Hardin County, IA',
  bremer: 'Bremer County, IA',
  butler: 'Butler County, IA',
  guthrie: 'Guthrie County, IA',
  adair: 'Adair County, IA',
  cherokee: 'Cherokee County, IA',
  ida: 'Ida County, IA',
  monona: 'Monona County, IA',
  harrison: 'Harrison County, IA',
  mills: 'Mills County, IA',
  montgomery: 'Montgomery County, IA',
  shelby: 'Shelby County, IA',
  clarke: 'Clarke County, IA',
  'van-buren': 'Van Buren County, IA',
  tama: 'Tama County, IA',
  fayette: 'Fayette County, IA',
  winnebago: 'Winnebago County, IA',
  chickasaw: 'Chickasaw County, IA',
  winneshiek: 'Winneshiek County, IA',
  allamakee: 'Allamakee County, IA',
  clayton: 'Clayton County, IA',
};

const IA_NEIGHBORS: Record<string, string[]> = {
  polk: ['dallas', 'warren', 'jasper', 'story', 'boone', 'madison', 'marshall'],
  linn: ['benton', 'johnson', 'jones', 'cedar', 'delaware', 'iowa'],
  scott: ['clinton', 'cedar', 'muscatine', 'jackson', 'louisa'],
  johnson: ['linn', 'washington', 'iowa', 'keokuk', 'cedar', 'muscatine'],
  'black-hawk': ['bremer', 'grundy', 'butler', 'franklin', 'benton', 'buchanan'],
  dallas: ['polk', 'warren', 'madison', 'guthrie', 'adair'],
  woodbury: ['plymouth', 'sioux', 'cherokee', 'crawford', 'ida', 'monona'],
  story: ['polk', 'marshall', 'boone', 'hamilton', 'hardin', 'jasper'],
  dubuque: ['clayton', 'delaware', 'jackson', 'jones'],
  pottawattamie: ['harrison', 'mills', 'montgomery', 'shelby'],
  warren: ['polk', 'marion', 'jasper', 'madison', 'lucas', 'clarke'],
  clinton: ['scott', 'cedar', 'jackson'],
  'cerro-gordo': ['floyd', 'franklin', 'hancock', 'mitchell', 'worth'],
  muscatine: ['scott', 'johnson', 'louisa', 'cedar'],
  marshall: ['story', 'jasper', 'tama', 'poweshiek', 'hardin', 'benton', 'grundy'],
  jasper: ['polk', 'marion', 'mahaska', 'poweshiek', 'story', 'warren'],
  'des-moines': ['henry', 'lee', 'louisa', 'van-buren'],
  webster: ['calhoun', 'hamilton', 'humboldt', 'pocahontas', 'wright'],
  sioux: ['lyon', 'obrien', 'plymouth'],
  wapello: ['appanoose', 'davis', 'jefferson', 'keokuk', 'mahaska', 'monroe'],
  marion: ['jasper', 'mahaska', 'monroe', 'warren'],
};

type CrossBorder = {
  slug: string;
  stateSlug: string;
  name: string;
  seat: string;
  displayLabel: string;
};

const CROSS_BORDER: Partial<Record<string, CrossBorder[]>> = {
  pottawattamie: [
    {
      slug: 'douglas',
      stateSlug: 'nebraska',
      name: 'Douglas',
      seat: 'Omaha',
      displayLabel: 'Douglas County, NE',
    },
    {
      slug: 'sarpy',
      stateSlug: 'nebraska',
      name: 'Sarpy',
      seat: 'Papillion',
      displayLabel: 'Sarpy County, NE',
    },
  ],
  woodbury: [
    {
      slug: 'dakota',
      stateSlug: 'nebraska',
      name: 'Dakota',
      seat: 'Dakota City',
      displayLabel: 'Dakota County, NE',
    },
    {
      slug: 'union',
      stateSlug: 'south-dakota',
      name: 'Union',
      seat: 'Elk Point',
      displayLabel: 'Union County, SD',
    },
  ],
  sioux: [
    {
      slug: 'union',
      stateSlug: 'south-dakota',
      name: 'Union',
      seat: 'Elk Point',
      displayLabel: 'Union County, SD',
    },
  ],
  scott: [
    {
      slug: 'rock-island',
      stateSlug: 'illinois',
      name: 'Rock Island',
      seat: 'Rock Island',
      displayLabel: 'Rock Island County, IL',
    },
  ],
  dubuque: [
    {
      slug: 'grant',
      stateSlug: 'wisconsin',
      name: 'Grant',
      seat: 'Lancaster',
      displayLabel: 'Grant County, WI',
    },
    {
      slug: 'jo-daviess',
      stateSlug: 'illinois',
      name: 'Jo Daviess',
      seat: 'Galena',
      displayLabel: 'Jo Daviess County, IL',
    },
  ],
  clinton: [
    {
      slug: 'rock-island',
      stateSlug: 'illinois',
      name: 'Rock Island',
      seat: 'Rock Island',
      displayLabel: 'Rock Island County, IL',
    },
  ],
  'des-moines': [
    {
      slug: 'rock-island',
      stateSlug: 'illinois',
      name: 'Rock Island',
      seat: 'Rock Island',
      displayLabel: 'Rock Island County, IL',
    },
  ],
};

const COUNTIES: CountyDef[] = [
  {
    slug: 'polk',
    name: 'Polk',
    seat: 'Des Moines',
    city: 'Des Moines',
    metro: 'polk-metro-ia',
    costTier: 'metro',
    citySlug: 'des-moines',
    regional1: 'des-moines-corridor',
    regional2: 'raccoon-river-valley',
    topId: 'twomenandatruck-polk-ia',
    topName: 'Two Men and a Truck Des Moines',
    regional1Name: 'Des Moines Corridor Moving',
    regional2Name: 'Raccoon River Valley Moving',
    franchise: true,
    marketNotes:
      'Polk County anchors Iowa’s largest metro centered on Des Moines with strong suburban, commercial, insurance-sector, and state-government demand across West Des Moines, Ankeny, Urbandale, and Raccoon River valley corridor communities.',
    costNote:
      'Polk County pricing reflects Des Moines metro demand, suburban new-construction turnover, I-35 and I-80 corridor traffic, and competition among full-service agents serving Polk County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'linn',
    name: 'Linn',
    seat: 'Cedar Rapids',
    city: 'Cedar Rapids',
    metro: 'linn-metro-ia',
    costTier: 'secondary_metro',
    citySlug: 'cedar-rapids',
    regional1: 'cedar-rapids-corridor',
    regional2: 'cedar-river-valley',
    topId: 'twomenandatruck-linn-ia',
    topName: 'Two Men and a Truck Cedar Rapids',
    regional1Name: 'Cedar Rapids Corridor Moving',
    regional2Name: 'Cedar River Valley Moving',
    franchise: true,
    marketNotes:
      'Linn County is eastern Iowa’s second-largest metro county centered on Cedar Rapids with strong manufacturing, healthcare, suburban, and Cedar River valley residential demand across Marion-adjacent and corridor communities.',
    costNote:
      'Linn County pricing reflects Cedar Rapids secondary-metro demand, Cedar River valley corridor traffic, manufacturing-sector relocations, and competition among full-service agents serving Linn County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'scott',
    name: 'Scott',
    seat: 'Davenport',
    city: 'Davenport',
    metro: 'scott-metro-ia',
    costTier: 'secondary_metro',
    citySlug: 'davenport',
    regional1: 'quad-cities-corridor',
    regional2: 'mississippi-river-east',
    topId: 'regional-scott-ia-movers',
    topName: 'Regional Quad Cities / Scott Providers',
    regional1Name: 'Quad Cities Corridor Moving',
    regional2Name: 'Mississippi River East Moving',
    marketNotes:
      'Scott County anchors the Iowa side of the Quad Cities metro centered on Davenport with strong Mississippi River east-bank, Bettendorf-adjacent, and cross-border Illinois corridor demand across riverfront and suburban communities.',
    costNote:
      'Scott County pricing reflects Quad Cities secondary-metro demand, Mississippi River east corridor traffic, cross-border Illinois logistics, and competition among regional agents serving Scott County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'johnson',
    name: 'Johnson',
    seat: 'Iowa City',
    city: 'Iowa City',
    metro: 'johnson-metro-ia',
    costTier: 'metro',
    citySlug: 'iowa-city',
    regional1: 'iowa-city-corridor',
    regional2: 'iowa-river-valley',
    topId: 'regional-johnson-ia-movers',
    topName: 'Regional Iowa City / Johnson Providers',
    regional1Name: 'Iowa City Corridor Moving',
    regional2Name: 'Iowa River Valley Moving',
    marketNotes:
      'Johnson County, IA is a university and healthcare county centered on Iowa City with strong University of Iowa, student-housing, Coralville-adjacent, and Iowa River valley residential demand — not to be confused with Johnson County in other states.',
    costNote:
      'Johnson County pricing reflects Iowa City metro demand, university and healthcare relocations, Iowa River valley corridor traffic, and competition among full-service agents serving Johnson County communities.',
    tipVariant: 'university',
  },
  {
    slug: 'black-hawk',
    name: 'Black Hawk',
    seat: 'Waterloo',
    city: 'Waterloo',
    metro: 'black-hawk-metro-ia',
    costTier: 'secondary_metro',
    citySlug: 'waterloo',
    regional1: 'waterloo-corridor',
    regional2: 'cedar-falls-valley',
    topId: 'regional-blackhawk-ia-movers',
    topName: 'Regional Waterloo / Black Hawk Providers',
    regional1Name: 'Waterloo Corridor Moving',
    regional2Name: 'Cedar Falls Valley Moving',
    marketNotes:
      'Black Hawk County is a northeastern Iowa metro county centered on Waterloo and Cedar Falls with strong manufacturing, healthcare, and Cedar Valley corridor residential demand across UNI-adjacent and river-valley communities.',
    costNote:
      'Black Hawk County pricing reflects Waterloo–Cedar Falls secondary-metro demand, Cedar Valley corridor traffic, manufacturing-sector relocations, and competition among regional agents serving Black Hawk County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'dallas',
    name: 'Dallas',
    seat: 'Adel',
    city: 'Waukee',
    metro: 'dallas-metro-ia',
    costTier: 'metro',
    citySlug: 'waukee',
    regional1: 'waukee-corridor',
    regional2: 'raccoon-river-west',
    topId: 'regional-dallas-ia-movers',
    topName: 'Regional Waukee / Dallas Providers',
    regional1Name: 'Waukee Corridor Moving',
    regional2Name: 'Raccoon River West Moving',
    marketNotes:
      'Dallas County, IA is Iowa’s fastest-growing Des Moines metro west suburban county centered on Waukee and Adel with strong new-construction, corporate spillover, and Raccoon River west corridor demand — not to be confused with Dallas County in Texas or other states.',
    costNote:
      'Dallas County pricing reflects Waukee and Adel metro suburban growth demand, Raccoon River west corridor traffic, new-construction turnover, and competition among regional agents serving Dallas County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'woodbury',
    name: 'Woodbury',
    seat: 'Sioux City',
    city: 'Sioux City',
    metro: 'woodbury-metro-ia',
    costTier: 'secondary_metro',
    citySlug: 'sioux-city',
    regional1: 'sioux-city-corridor',
    regional2: 'missouri-river-northwest',
    topId: 'regional-woodbury-ia-movers',
    topName: 'Regional Sioux City / Woodbury Providers',
    regional1Name: 'Sioux City Corridor Moving',
    regional2Name: 'Missouri River Northwest Moving',
    marketNotes:
      'Woodbury County anchors northwest Iowa’s Sioux City metro with strong Missouri River northwest corridor, cross-border Nebraska and South Dakota, and industrial riverfront residential demand across Sergeant Bluff-adjacent communities.',
    costNote:
      'Woodbury County pricing reflects Sioux City secondary-metro demand, Missouri River northwest corridor traffic, tri-state cross-border logistics, and competition among regional agents serving Woodbury County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'story',
    name: 'Story',
    seat: 'Nevada',
    city: 'Ames',
    metro: 'story-metro-ia',
    costTier: 'secondary_metro',
    citySlug: 'ames',
    regional1: 'ames-corridor',
    regional2: 'skunk-river-valley',
    topId: 'regional-story-ia-movers',
    topName: 'Regional Ames / Story Providers',
    regional1Name: 'Ames Corridor Moving',
    regional2Name: 'Skunk River Valley Moving',
    marketNotes:
      'Story County, IA is a central Iowa county with seat at Nevada and strong Ames and Iowa State University corridor demand across student-housing, research-campus, and Skunk River valley residential communities.',
    costNote:
      'Story County pricing reflects Ames secondary-metro demand, Iowa State University relocations, Skunk River valley corridor traffic, and competition among regional agents serving Story County communities.',
    tipVariant: 'university',
  },
  {
    slug: 'dubuque',
    name: 'Dubuque',
    seat: 'Dubuque',
    city: 'Dubuque',
    metro: 'dubuque-metro-ia',
    costTier: 'secondary_metro',
    citySlug: 'dubuque',
    regional1: 'dubuque-corridor',
    regional2: 'mississippi-bluff-country',
    topId: 'regional-dubuque-ia-movers',
    topName: 'Regional Dubuque / Dubuque County Providers',
    regional1Name: 'Dubuque Corridor Moving',
    regional2Name: 'Mississippi Bluff Country Moving',
    marketNotes:
      'Dubuque County is a northeastern Iowa Mississippi River bluff county centered on Dubuque with strong riverfront, tourism, manufacturing, and cross-border Wisconsin and Illinois corridor residential demand.',
    costNote:
      'Dubuque County pricing reflects Dubuque secondary-metro demand, Mississippi bluff corridor traffic, cross-border tri-state logistics, and competition among regional agents serving Dubuque County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'pottawattamie',
    name: 'Pottawattamie',
    seat: 'Council Bluffs',
    city: 'Council Bluffs',
    metro: 'pottawattamie-metro-ia',
    costTier: 'secondary_metro',
    citySlug: 'council-bluffs',
    regional1: 'council-bluffs-corridor',
    regional2: 'missouri-river-omaha',
    topId: 'regional-pottawattamie-ia-movers',
    topName: 'Regional Council Bluffs / Pottawattamie Providers',
    regional1Name: 'Council Bluffs Corridor Moving',
    regional2Name: 'Missouri River Omaha Moving',
    marketNotes:
      'Pottawattamie County anchors the Iowa side of the Omaha–Council Bluffs metro with strong Missouri River cross-border, casino-corridor, and suburban spillover demand across Council Bluffs and riverfront communities.',
    costNote:
      'Pottawattamie County pricing reflects Council Bluffs secondary-metro demand, Missouri River Omaha corridor traffic, cross-border Nebraska logistics, and competition among regional agents serving Pottawattamie County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'warren',
    name: 'Warren',
    seat: 'Indianola',
    city: 'Indianola',
    metro: 'warren-metro-ia',
    costTier: 'secondary_metro',
    citySlug: 'indianola',
    regional1: 'indianola-corridor',
    regional2: 'des-moines-south',
    topId: 'regional-warren-ia-movers',
    topName: 'Regional Indianola / Warren Providers',
    regional1Name: 'Indianola Corridor Moving',
    regional2Name: 'Des Moines South Moving',
    marketNotes:
      'Warren County, IA is a Des Moines metro south suburban county centered on Indianola with strong residential spillover, Simpson College-adjacent, and Des Moines south corridor demand — not to be confused with Warren County in other states.',
    costNote:
      'Warren County pricing reflects Indianola secondary-metro demand, Des Moines south corridor traffic, suburban growth logistics, and competition among regional agents serving Warren County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'clinton',
    name: 'Clinton',
    seat: 'Clinton',
    city: 'Clinton',
    metro: 'clinton-metro-ia',
    costTier: 'rural',
    citySlug: 'clinton',
    regional1: 'clinton-corridor',
    regional2: 'mississippi-river-clinton',
    topId: 'regional-clinton-ia-movers',
    topName: 'Regional Clinton / Clinton County Providers',
    regional1Name: 'Clinton Corridor Moving',
    regional2Name: 'Mississippi River Clinton Moving',
    marketNotes:
      'Clinton County, IA is a Mississippi River east corridor county centered on Clinton with rural residential, riverfront industrial, and Quad Cities fringe demand — not to be confused with Clinton County in other states.',
    costNote:
      'Clinton County pricing reflects Clinton-area demand, Mississippi River east corridor travel distances, cross-border Illinois logistics, and competition among regional agents serving Clinton County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'cerro-gordo',
    name: 'Cerro Gordo',
    seat: 'Mason City',
    city: 'Mason City',
    metro: 'cerro-gordo-metro-ia',
    costTier: 'rural',
    citySlug: 'mason-city',
    regional1: 'mason-city-corridor',
    regional2: 'winnebago-river-valley',
    topId: 'regional-cerrogordo-ia-movers',
    topName: 'Regional Mason City / Cerro Gordo Providers',
    regional1Name: 'Mason City Corridor Moving',
    regional2Name: 'Winnebago River Valley Moving',
    marketNotes:
      'Cerro Gordo County is a north-central Iowa county centered on Mason City with residential, manufacturing, and Winnebago River valley agricultural demand across I-35 corridor gateway communities.',
    costNote:
      'Cerro Gordo County pricing reflects Mason City-area demand, Winnebago River valley travel distances, agricultural property logistics, and competition among regional agents serving Cerro Gordo County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'muscatine',
    name: 'Muscatine',
    seat: 'Muscatine',
    city: 'Muscatine',
    metro: 'muscatine-metro-ia',
    costTier: 'rural',
    citySlug: 'muscatine',
    regional1: 'muscatine-corridor',
    regional2: 'mississippi-river-muscatine',
    topId: 'regional-muscatine-ia-movers',
    topName: 'Regional Muscatine / Muscatine County Providers',
    regional1Name: 'Muscatine Corridor Moving',
    regional2Name: 'Mississippi River Muscatine Moving',
    marketNotes:
      'Muscatine County is a Mississippi River corridor county centered on Muscatine with residential, pearl-button heritage tourism, and riverfront manufacturing demand across eastern Iowa bluff communities.',
    costNote:
      'Muscatine County pricing reflects Muscatine-area demand, Mississippi River corridor travel distances, riverfront property logistics, and competition among regional agents serving Muscatine County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'marshall',
    name: 'Marshall',
    seat: 'Marshalltown',
    city: 'Marshalltown',
    metro: 'marshall-metro-ia',
    costTier: 'rural',
    citySlug: 'marshalltown',
    regional1: 'marshalltown-corridor',
    regional2: 'iowa-river-central',
    topId: 'regional-marshall-ia-movers',
    topName: 'Regional Marshalltown / Marshall Providers',
    regional1Name: 'Marshalltown Corridor Moving',
    regional2Name: 'Iowa River Central Moving',
    marketNotes:
      'Marshall County, IA is a central Iowa county centered on Marshalltown with residential, manufacturing, and Iowa River central corridor agricultural demand — not to be confused with Marshall County in other states.',
    costNote:
      'Marshall County pricing reflects Marshalltown-area demand, Iowa River central corridor travel distances, agricultural property logistics, and competition among regional agents serving Marshall County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'jasper',
    name: 'Jasper',
    seat: 'Newton',
    city: 'Newton',
    metro: 'jasper-metro-ia',
    costTier: 'rural',
    citySlug: 'newton',
    regional1: 'newton-corridor',
    regional2: 'skunk-river-south',
    topId: 'regional-jasper-ia-movers',
    topName: 'Regional Newton / Jasper Providers',
    regional1Name: 'Newton Corridor Moving',
    regional2Name: 'Skunk River South Moving',
    marketNotes:
      'Jasper County, IA is a central Iowa county centered on Newton with residential, wind-energy manufacturing, and Skunk River south corridor demand — not to be confused with Jasper County in other states.',
    costNote:
      'Jasper County pricing reflects Newton-area demand, Skunk River south corridor travel distances, agricultural property logistics, and competition among regional agents serving Jasper County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'des-moines',
    name: 'Des Moines',
    seat: 'Burlington',
    city: 'Burlington',
    metro: 'des-moines-metro-ia',
    costTier: 'rural',
    citySlug: 'burlington',
    regional1: 'burlington-corridor',
    regional2: 'mississippi-river-southeast',
    topId: 'regional-desmoines-ia-movers',
    topName: 'Regional Burlington / Des Moines County Providers',
    regional1Name: 'Burlington Corridor Moving',
    regional2Name: 'Mississippi River Southeast Moving',
    marketNotes:
      'Des Moines County, IA is a southeastern Iowa Mississippi River county centered on Burlington — not to be confused with Polk County (Des Moines city) or Des Moines County in other states — with riverfront, manufacturing, and bluff-country residential demand.',
    costNote:
      'Des Moines County pricing reflects Burlington-area demand, Mississippi River southeast corridor travel distances, cross-border Illinois logistics, and competition among regional agents serving Des Moines County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'webster',
    name: 'Webster',
    seat: 'Fort Dodge',
    city: 'Fort Dodge',
    metro: 'webster-metro-ia',
    costTier: 'rural',
    citySlug: 'fort-dodge',
    regional1: 'fort-dodge-corridor',
    regional2: 'des-moines-river-north',
    topId: 'regional-webster-ia-movers',
    topName: 'Regional Fort Dodge / Webster Providers',
    regional1Name: 'Fort Dodge Corridor Moving',
    regional2Name: 'Des Moines River North Moving',
    marketNotes:
      'Webster County, IA is a north-central Iowa county centered on Fort Dodge with residential, gypsum-industry, and Des Moines River north corridor agricultural demand — not to be confused with Webster County in other states.',
    costNote:
      'Webster County pricing reflects Fort Dodge-area demand, Des Moines River north corridor travel distances, agricultural property logistics, and competition among regional agents serving Webster County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'sioux',
    name: 'Sioux',
    seat: 'Orange City',
    city: 'Orange City',
    metro: 'sioux-metro-ia',
    costTier: 'rural',
    citySlug: 'orange-city',
    regional1: 'orange-city-corridor',
    regional2: 'big-sioux-valley',
    topId: 'regional-sioux-ia-movers',
    topName: 'Regional Orange City / Sioux Providers',
    regional1Name: 'Orange City Corridor Moving',
    regional2Name: 'Big Sioux Valley Moving',
    marketNotes:
      'Sioux County, IA is a northwest Iowa county centered on Orange City — not to be confused with Sioux City (Woodbury County) or Sioux County in other states — with Dutch-heritage community, agricultural, and Big Sioux Valley corridor demand.',
    costNote:
      'Sioux County pricing reflects Orange City-area demand, Big Sioux Valley travel distances, agricultural property logistics, and competition among regional agents serving Sioux County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'wapello',
    name: 'Wapello',
    seat: 'Ottumwa',
    city: 'Ottumwa',
    metro: 'wapello-metro-ia',
    costTier: 'rural',
    citySlug: 'ottumwa',
    regional1: 'ottumwa-corridor',
    regional2: 'des-moines-river-south',
    topId: 'regional-wapello-ia-movers',
    topName: 'Regional Ottumwa / Wapello Providers',
    regional1Name: 'Ottumwa Corridor Moving',
    regional2Name: 'Des Moines River South Moving',
    marketNotes:
      'Wapello County is a southeastern Iowa county centered on Ottumwa with residential, manufacturing, and Des Moines River south corridor agricultural demand across regional hub communities.',
    costNote:
      'Wapello County pricing reflects Ottumwa-area demand, Des Moines River south corridor travel distances, agricultural property logistics, and competition among regional agents serving Wapello County communities.',
    tipVariant: 'rural',
  },
  {
    slug: 'marion',
    name: 'Marion',
    seat: 'Knoxville',
    city: 'Knoxville',
    metro: 'marion-metro-ia',
    costTier: 'rural',
    citySlug: 'knoxville',
    regional1: 'knoxville-corridor',
    regional2: 'des-moines-river-marion',
    topId: 'regional-marion-ia-movers',
    topName: 'Regional Knoxville / Marion Providers',
    regional1Name: 'Knoxville Corridor Moving',
    regional2Name: 'Des Moines River Marion Moving',
    marketNotes:
      'Marion County, IA is a south-central Iowa county with seat at Knoxville — not to be confused with Marion suburb (Linn County) or Marion County in other states — with rural residential and Des Moines River corridor agricultural demand.',
    costNote:
      'Marion County pricing reflects Knoxville-area demand, Des Moines River corridor travel distances, agricultural property logistics, and competition among regional agents serving Marion County communities.',
    tipVariant: 'rural',
  },
];

const SEAT_BY_SLUG = Object.fromEntries(COUNTIES.map((c) => [c.slug, c.seat]));

const NON_CURATED_NAMES: Record<string, { name: string; seat: string }> = {
  adair: { name: 'Adair', seat: 'Greenfield' },
  appanoose: { name: 'Appanoose', seat: 'Centerville' },
  benton: { name: 'Benton', seat: 'Vinton' },
  boone: { name: 'Boone', seat: 'Boone' },
  bremer: { name: 'Bremer', seat: 'Waverly' },
  buchanan: { name: 'Buchanan', seat: 'Independence' },
  butler: { name: 'Butler', seat: 'Allison' },
  calhoun: { name: 'Calhoun', seat: 'Rockwell City' },
  cedar: { name: 'Cedar', seat: 'Tipton' },
  cherokee: { name: 'Cherokee', seat: 'Cherokee' },
  clarke: { name: 'Clarke', seat: 'Osceola' },
  clayton: { name: 'Clayton', seat: 'Elkader' },
  crawford: { name: 'Crawford', seat: 'Denison' },
  davis: { name: 'Davis', seat: 'Bloomfield' },
  delaware: { name: 'Delaware', seat: 'Manchester' },
  floyd: { name: 'Floyd', seat: 'Charles City' },
  franklin: { name: 'Franklin', seat: 'Hampton' },
  grundy: { name: 'Grundy', seat: 'Grundy Center' },
  guthrie: { name: 'Guthrie', seat: 'Guthrie Center' },
  hamilton: { name: 'Hamilton', seat: 'Webster City' },
  hancock: { name: 'Hancock', seat: 'Garner' },
  hardin: { name: 'Hardin', seat: 'Eldora' },
  harrison: { name: 'Harrison', seat: 'Logan' },
  henry: { name: 'Henry', seat: 'Mount Pleasant' },
  humboldt: { name: 'Humboldt', seat: 'Dakota City' },
  ida: { name: 'Ida', seat: 'Ida Grove' },
  iowa: { name: 'Iowa', seat: 'Marengo' },
  jackson: { name: 'Jackson', seat: 'Maquoketa' },
  jefferson: { name: 'Jefferson', seat: 'Fairfield' },
  jones: { name: 'Jones', seat: 'Anamosa' },
  keokuk: { name: 'Keokuk', seat: 'Sigourney' },
  lee: { name: 'Lee', seat: 'Fort Madison' },
  louisa: { name: 'Louisa', seat: 'Wapello' },
  lucas: { name: 'Lucas', seat: 'Chariton' },
  lyon: { name: 'Lyon', seat: 'Rock Rapids' },
  madison: { name: 'Madison', seat: 'Winterset' },
  mahaska: { name: 'Mahaska', seat: 'Oskaloosa' },
  mills: { name: 'Mills', seat: 'Glenwood' },
  mitchell: { name: 'Mitchell', seat: 'Osage' },
  monona: { name: 'Monona', seat: 'Onawa' },
  monroe: { name: 'Monroe', seat: 'Albia' },
  montgomery: { name: 'Montgomery', seat: 'Red Oak' },
  obrien: { name: "O'Brien", seat: 'Primghar' },
  plymouth: { name: 'Plymouth', seat: 'Le Mars' },
  pocahontas: { name: 'Pocahontas', seat: 'Pocahontas' },
  poweshiek: { name: 'Poweshiek', seat: 'Montezuma' },
  shelby: { name: 'Shelby', seat: 'Harlan' },
  tama: { name: 'Tama', seat: 'Toledo' },
  'van-buren': { name: 'Van Buren', seat: 'Keosauqua' },
  washington: { name: 'Washington', seat: 'Washington' },
  worth: { name: 'Worth', seat: 'Northwood' },
  wright: { name: 'Wright', seat: 'Clarion' },
};

function slugKey(slug: string): string {
  return /[^a-z]/.test(slug) ? `'${slug}'` : slug;
}

function q(s: string): string {
  if (s.includes("'")) return JSON.stringify(s);
  return `'${s}'`;
}

function defaultDisplayLabel(slug: string, name: string): string {
  return DISPLAY_LABELS[slug] ?? `${name} County, IA`;
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
    `all-my-sons-${citySlug}-ia`,
    `${citySlug}-moving-${slug}-ia`,
    `${slug}-county-moving-${slug}-ia`,
    `college-hunks-moving-${citySlug}-ia`,
    `budd-van-lines-${citySlug}-ia`,
    `${c.regional1}-moving-${slug}-ia`,
    `${c.regional2}-moving-${slug}-ia`,
    `hercules-movers-${citySlug}-ia`,
    `krupp-moving-${citySlug}-ia`,
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
  polk: [
    {
      quote:
        'Two Men and a Truck Des Moines handled our suburban move professionally — on time and extremely careful with our home.',
      name: 'Alex M.',
      location: 'Des Moines, IA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Des Moines navigated our West Des Moines relocation with fair pricing through Raccoon River valley corridor traffic.',
      name: 'Beth N.',
      location: 'Des Moines, IA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Raccoon River Valley Moving served our Ankeny-area move efficiently with steady communication and professional crew coordination.',
      name: 'Carl O.',
      location: 'Ankeny, IA',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
  linn: [
    {
      quote:
        'Two Men and a Truck Cedar Rapids handled our Cedar River valley move professionally — on time and extremely careful with our home.',
      name: 'Dana P.',
      location: 'Cedar Rapids, IA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Cedar Rapids navigated our Marion-adjacent relocation with fair pricing through Cedar River corridor traffic.',
      name: 'Eric Q.',
      location: 'Cedar Rapids, IA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Cedar River Valley Moving served our relocation efficiently with punctual arrival and professional crew coordination.',
      name: 'Fran R.',
      location: 'Marion, IA',
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
  const altLoc = c.seat !== c.city ? `${c.seat}, IA` : `${city}, IA`;
  return `  ${slugKey(c.slug)}: [
    { quote: ${q(`${c.topName} handled our ${city} move professionally — on time and extremely careful with our home.`)}, name: ${q(n1)}, location: ${q(`${city}, IA`)}, rating: 5, moveType: 'Single-family' },
    { quote: ${q(`All My Sons ${city} navigated our relocation with fair pricing and excellent regional scheduling.`)}, name: ${q(n2)}, location: ${q(altLoc)}, rating: 5, moveType: 'Townhome' },
    { quote: ${q(`${c.regional2Name} served our move efficiently with punctual arrival and professional crew coordination.`)}, name: ${q(n3)}, location: ${q(`${city}, IA`)}, rating: 5, moveType: 'Apartment' },
  ],`;
}

function buildNearbyLinks(slug: string): string {
  const iaNeighbors = IA_NEIGHBORS[slug] ?? [];
  const cross = CROSS_BORDER[slug] ?? [];
  const crossSlugs = new Set(cross.map((cb) => cb.slug));
  const maxIa = Math.min(iaNeighbors.length, Math.max(3, 5 - cross.length));
  const links: string[] = [];

  for (const n of iaNeighbors.slice(0, maxIa)) {
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
      `href: ${q(`/local-movers/iowa/${n}`)}`,
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

/** Hand-curated Iowa county research — batch 1: 21 counties */
export const iowaCountyResearch: Record<string, CuratedCountyResearch> = {
${entries.join('\n')}
};

export function getIowaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return iowaCountyResearch[countySlug];
}
`;
}

function genTestimonials(): string {
  const entries = COUNTIES.map((c, i) => buildTestimonials(c, i + 3));
  return `import type { CountyTestimonialEntry } from '@/lib/local-movers/county-seo';

/** Hand-curated Iowa county testimonials — batch 1: 21 counties */
export const iowaCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
${entries.join('\n')}
};

export function getIowaCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return iowaCountyTestimonials[countySlug] ?? [];
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

/** Hand-curated Iowa county mover lists — batch 1: 21 counties */
const CURATED_IA_COUNTIES: Record<string, string[]> = {
${entries.join('\n')}
};

export const iowaCountyMoverAssignments: CountyMoverAssignment[] =
  Object.entries(CURATED_IA_COUNTIES).map(([countySlug, moverIds]) => ({
    stateSlug: 'iowa',
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

/** Seat and metro overrides for hand-curated Iowa counties (batch 1 — 21 counties) */
export const iowaCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
${entries.join('\n')}
};

export function applyIowaCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'iowa') return county;
  const override = iowaCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}
`;
}

function genNearby(): string {
  const entries = COUNTIES.map((c) => buildNearbyLinks(c.slug));
  return `import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Iowa curated county corridor links — batch 1: 21 counties */
const IA_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
${entries.join('\n')}
};

export function getIowaNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return IA_COUNTY_NEIGHBORS[countySlug] ?? [];
}
`;
}

const OUTPUTS: { path: string; content: string }[] = [
  { path: 'data/iowa-county-research.ts', content: genResearch() },
  { path: 'data/iowa-county-testimonials.ts', content: genTestimonials() },
  { path: 'data/iowa-county-assignments.ts', content: genAssignments() },
  {
    path: 'lib/local-movers/geography/iowa-overrides.ts',
    content: genOverrides(),
  },
  { path: 'lib/local-movers/iowa-nearby.ts', content: genNearby() },
];

for (const { path, content } of OUTPUTS) {
  const full = join(ROOT, path);
  writeFileSync(full, content, 'utf8');
  console.log(`Wrote ${path}`);
}

console.log(
  `\nGenerated ${COUNTIES.length}/${EXPECTED_COUNT} Iowa counties across ${OUTPUTS.length} files.`
);