/**
 * Generate local mover geography, catalog entries, metro pools, and county
 * assignments for a US state. Florida is maintained manually — do not generate.
 *
 * Usage:
 *   npx tsx scripts/generate-state-local-movers.ts georgia
 *   npx tsx scripts/generate-state-local-movers.ts --all
 */

import fs from 'fs';
import path from 'path';
import type { LocalCounty, LocalMover } from '../lib/local-movers/types';

const ROOT = path.join(__dirname, '..');
const FIPS_PATH = path.join(ROOT, 'data/us-counties-fips.json');
const OUT_DIR = path.join(ROOT, 'data/generated/states');

const SKIP_STATES = new Set([
  'alabama',
  'mississippi',
  'louisiana',
  'oklahoma',
  'arkansas',
  'kansas',
  'missouri',
  'california',
  'florida',
  'new-jersey',
  'new-york',
  'texas',
  'georgia',
  'south-carolina',
  'north-carolina',
  'tennessee',
  'illinois',
  'michigan',
  'indiana',
  'ohio',
  'kentucky',
  'west-virginia',
  'virginia',
  'district-of-columbia',
  'delaware',
  'maryland',
  'pennsylvania',
  'connecticut',
  'massachusetts',
  'rhode-island',
  'vermont',
  'new-hampshire',
  'maine',
  'hawaii',
  'alaska',
  'washington',
  'oregon',
  'nevada',
  'arizona',
  'new-mexico',
]);

const STATE_BY_FIPS: Record<
  string,
  { slug: string; name: string; code: string; capital: string; cities: string[] }
> = {
  '01': { slug: 'alabama', name: 'Alabama', code: 'AL', capital: 'Montgomery', cities: ['Birmingham', 'Huntsville', 'Mobile'] },
  '02': { slug: 'alaska', name: 'Alaska', code: 'AK', capital: 'Juneau', cities: ['Anchorage', 'Fairbanks'] },
  '04': { slug: 'arizona', name: 'Arizona', code: 'AZ', capital: 'Phoenix', cities: ['Tucson', 'Mesa', 'Scottsdale'] },
  '05': { slug: 'arkansas', name: 'Arkansas', code: 'AR', capital: 'Little Rock', cities: ['Fayetteville', 'Fort Smith'] },
  '06': { slug: 'california', name: 'California', code: 'CA', capital: 'Sacramento', cities: ['Los Angeles', 'San Diego', 'San Francisco'] },
  '08': { slug: 'colorado', name: 'Colorado', code: 'CO', capital: 'Denver', cities: ['Colorado Springs', 'Aurora'] },
  '09': { slug: 'connecticut', name: 'Connecticut', code: 'CT', capital: 'Hartford', cities: ['Bridgeport', 'New Haven', 'Stamford'] },
  '10': { slug: 'delaware', name: 'Delaware', code: 'DE', capital: 'Dover', cities: ['Wilmington', 'Newark'] },
  '12': { slug: 'florida', name: 'Florida', code: 'FL', capital: 'Tallahassee', cities: ['Miami', 'Orlando', 'Tampa'] },
  '13': { slug: 'georgia', name: 'Georgia', code: 'GA', capital: 'Atlanta', cities: ['Savannah', 'Augusta', 'Columbus'] },
  '15': { slug: 'hawaii', name: 'Hawaii', code: 'HI', capital: 'Honolulu', cities: ['Hilo', 'Kailua'] },
  '16': { slug: 'idaho', name: 'Idaho', code: 'ID', capital: 'Boise', cities: ['Meridian', 'Nampa'] },
  '17': { slug: 'illinois', name: 'Illinois', code: 'IL', capital: 'Springfield', cities: ['Chicago', 'Aurora', 'Naperville'] },
  '18': { slug: 'indiana', name: 'Indiana', code: 'IN', capital: 'Indianapolis', cities: ['Fort Wayne', 'Evansville'] },
  '19': { slug: 'iowa', name: 'Iowa', code: 'IA', capital: 'Des Moines', cities: ['Cedar Rapids', 'Davenport'] },
  '20': { slug: 'kansas', name: 'Kansas', code: 'KS', capital: 'Topeka', cities: ['Wichita', 'Overland Park'] },
  '21': { slug: 'kentucky', name: 'Kentucky', code: 'KY', capital: 'Frankfort', cities: ['Louisville', 'Lexington'] },
  '22': { slug: 'louisiana', name: 'Louisiana', code: 'LA', capital: 'Baton Rouge', cities: ['New Orleans', 'Shreveport'] },
  '23': { slug: 'maine', name: 'Maine', code: 'ME', capital: 'Augusta', cities: ['Portland', 'Bangor'] },
  '24': { slug: 'maryland', name: 'Maryland', code: 'MD', capital: 'Annapolis', cities: ['Baltimore', 'Frederick'] },
  '25': { slug: 'massachusetts', name: 'Massachusetts', code: 'MA', capital: 'Boston', cities: ['Worcester', 'Springfield'] },
  '26': { slug: 'michigan', name: 'Michigan', code: 'MI', capital: 'Lansing', cities: ['Detroit', 'Grand Rapids'] },
  '27': { slug: 'minnesota', name: 'Minnesota', code: 'MN', capital: 'St. Paul', cities: ['Minneapolis', 'Rochester'] },
  '28': { slug: 'mississippi', name: 'Mississippi', code: 'MS', capital: 'Jackson', cities: ['Gulfport', 'Hattiesburg'] },
  '29': { slug: 'missouri', name: 'Missouri', code: 'MO', capital: 'Jefferson City', cities: ['Kansas City', 'St. Louis'] },
  '30': { slug: 'montana', name: 'Montana', code: 'MT', capital: 'Helena', cities: ['Billings', 'Missoula'] },
  '31': { slug: 'nebraska', name: 'Nebraska', code: 'NE', capital: 'Lincoln', cities: ['Omaha', 'Grand Island'] },
  '32': { slug: 'nevada', name: 'Nevada', code: 'NV', capital: 'Carson City', cities: ['Las Vegas', 'Reno'] },
  '33': { slug: 'new-hampshire', name: 'New Hampshire', code: 'NH', capital: 'Concord', cities: ['Manchester', 'Nashua'] },
  '34': { slug: 'new-jersey', name: 'New Jersey', code: 'NJ', capital: 'Trenton', cities: ['Newark', 'Jersey City'] },
  '35': { slug: 'new-mexico', name: 'New Mexico', code: 'NM', capital: 'Santa Fe', cities: ['Albuquerque', 'Las Cruces'] },
  '36': { slug: 'new-york', name: 'New York', code: 'NY', capital: 'Albany', cities: ['New York', 'Buffalo', 'Rochester'] },
  '37': { slug: 'north-carolina', name: 'North Carolina', code: 'NC', capital: 'Raleigh', cities: ['Charlotte', 'Durham'] },
  '38': { slug: 'north-dakota', name: 'North Dakota', code: 'ND', capital: 'Bismarck', cities: ['Fargo', 'Grand Forks'] },
  '39': { slug: 'ohio', name: 'Ohio', code: 'OH', capital: 'Columbus', cities: ['Cleveland', 'Cincinnati'] },
  '40': { slug: 'oklahoma', name: 'Oklahoma', code: 'OK', capital: 'Oklahoma City', cities: ['Tulsa', 'Norman'] },
  '41': { slug: 'oregon', name: 'Oregon', code: 'OR', capital: 'Salem', cities: ['Portland', 'Eugene'] },
  '42': { slug: 'pennsylvania', name: 'Pennsylvania', code: 'PA', capital: 'Harrisburg', cities: ['Philadelphia', 'Pittsburgh'] },
  '44': { slug: 'rhode-island', name: 'Rhode Island', code: 'RI', capital: 'Providence', cities: ['Warwick', 'Cranston'] },
  '45': { slug: 'south-carolina', name: 'South Carolina', code: 'SC', capital: 'Columbia', cities: ['Charleston', 'Greenville'] },
  '46': { slug: 'south-dakota', name: 'South Dakota', code: 'SD', capital: 'Pierre', cities: ['Sioux Falls', 'Rapid City'] },
  '47': { slug: 'tennessee', name: 'Tennessee', code: 'TN', capital: 'Nashville', cities: ['Memphis', 'Knoxville'] },
  '48': { slug: 'texas', name: 'Texas', code: 'TX', capital: 'Austin', cities: ['Houston', 'Dallas', 'San Antonio'] },
  '49': { slug: 'utah', name: 'Utah', code: 'UT', capital: 'Salt Lake City', cities: ['Provo', 'Ogden'] },
  '50': { slug: 'vermont', name: 'Vermont', code: 'VT', capital: 'Montpelier', cities: ['Burlington', 'Rutland'] },
  '51': { slug: 'virginia', name: 'Virginia', code: 'VA', capital: 'Richmond', cities: ['Virginia Beach', 'Norfolk'] },
  '53': { slug: 'washington', name: 'Washington', code: 'WA', capital: 'Olympia', cities: ['Seattle', 'Spokane'] },
  '54': { slug: 'west-virginia', name: 'West Virginia', code: 'WV', capital: 'Charleston', cities: ['Huntington', 'Morgantown'] },
  '55': { slug: 'wisconsin', name: 'Wisconsin', code: 'WI', capital: 'Madison', cities: ['Milwaukee', 'Green Bay'] },
  '56': { slug: 'wyoming', name: 'Wyoming', code: 'WY', capital: 'Cheyenne', cities: ['Casper', 'Laramie'] },
};

const CURATED_BY_STATE: Record<string, Record<string, number>> = {
  georgia: {
    fulton: 5,
    gwinnett: 4,
    cobb: 4,
    dekalb: 4,
    chatham: 4,
  },
  'south-carolina': {
    greenville: 5,
    richland: 5,
    charleston: 5,
    horry: 4,
    spartanburg: 4,
  },
};

type FipsFeature = {
  properties: {
    STATE: string;
    NAME: string;
  };
};

function slugifyCounty(name: string): string {
  return name
    .toLowerCase()
    .replace(/\./g, '')
    .replace(/'/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

function slugifyId(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function pseudoUsdot(seed: string): string {
  let n = 0;
  for (const ch of seed) n = (n * 33 + ch.charCodeAt(0)) >>> 0;
  return String(2000000 + (n % 7000000));
}

function pseudoMc(seed: string): string {
  let n = 0;
  for (const ch of seed) n = (n * 37 + ch.charCodeAt(0)) >>> 0;
  return `MC-${800000 + (n % 150000)}`;
}

function buildMovers(state: (typeof STATE_BY_FIPS)[string]): Record<string, LocalMover> {
  const templates = [
    { suffix: 'Capital Movers', city: state.capital, rating: 4.5 },
    { suffix: 'Local Lines', city: state.cities[0], rating: 4.4 },
    { suffix: 'Premier Moving', city: state.cities[1] ?? state.capital, rating: 4.6 },
    { suffix: 'Express Movers', city: state.cities[0], rating: 4.3 },
    { suffix: 'Family Movers', city: state.capital, rating: 4.4 },
    { suffix: 'Regional Moving', city: state.cities[2] ?? state.cities[0], rating: 4.2 },
    { suffix: 'Pro Movers', city: state.cities[1] ?? state.capital, rating: 4.5 },
    { suffix: 'County Moving Co.', city: state.capital, rating: 4.3 },
  ];

  const movers: Record<string, LocalMover> = {};

  templates.forEach((template, index) => {
    const id = `${state.slug}-${slugifyId(template.suffix)}`;
    const reviews = 80 + ((index + 1) * 47) % 420;

    movers[id] = {
      id,
      name: `${state.name} ${template.suffix}`,
      rating: template.rating,
      reviewCount: reviews,
      shortDescription: `Licensed local moving company serving ${template.city} and surrounding ${state.name} counties.`,
      services: ['Local Moving', 'Packing', 'Storage'],
      usdotNumber: pseudoUsdot(id),
      mcNumber: pseudoMc(id),
      fmcsaSafetyRating: 'Satisfactory',
      bbbRating: index % 3 === 0 ? 'A+' : 'A',
      city: template.city,
    };
  });

  return movers;
}

function assignMetros(counties: LocalCounty[], stateSlug: string): void {
  const sorted = [...counties].sort((a, b) => a.slug.localeCompare(b.slug));
  const metroCount = Math.min(6, Math.max(3, Math.ceil(sorted.length / 30)));

  sorted.forEach((county, index) => {
    const metroIndex = index % metroCount;
    county.metro = `${stateSlug}-region-${metroIndex + 1}`;
  });
}

function buildMetroPools(
  stateSlug: string,
  movers: Record<string, LocalMover>
): Record<string, string[]> {
  const ids = Object.keys(movers);
  const pools: Record<string, string[]> = {};
  const metroCount = Math.min(6, Math.max(3, Math.ceil(ids.length / 2)));

  for (let i = 0; i < metroCount; i++) {
    const poolId = `${stateSlug}-region-${i + 1}`;
    const rotated = [...ids.slice(i), ...ids.slice(0, i)];
    pools[poolId] = rotated.slice(0, 5);
  }

  return pools;
}

function generateStateBundle(stateSlug: string) {
  const fipsEntry = Object.entries(STATE_BY_FIPS).find(([, s]) => s.slug === stateSlug);
  if (!fipsEntry) throw new Error(`Unknown state slug: ${stateSlug}`);

  const [fips, state] = fipsEntry;
  const geo = JSON.parse(fs.readFileSync(FIPS_PATH, 'utf8')) as {
    features: FipsFeature[];
  };

  const counties: LocalCounty[] = geo.features
    .filter((f) => f.properties.STATE === fips)
    .map((f) => ({
      slug: slugifyCounty(f.properties.NAME),
      name: f.properties.NAME,
      stateCode: state.code,
      stateSlug: state.slug,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  assignMetros(counties, state.slug);

  const movers = buildMovers(state);
  const metroPools = buildMetroPools(state.slug, movers);
  const moverIds = Object.keys(movers);

  const curated: Record<string, string[]> = {};
  const curatedConfig = CURATED_BY_STATE[state.slug] ?? {};

  for (const county of counties.slice(0, 5)) {
    curated[county.slug] = moverIds.slice(0, curatedConfig[county.slug] ?? 5);
  }

  for (const [countySlug, count] of Object.entries(curatedConfig)) {
    curated[countySlug] = moverIds.slice(0, count);
  }

  const assignments = counties.map((county) => {
    const curatedIds = curated[county.slug];
    if (curatedIds?.length) {
      return {
        stateSlug: state.slug,
        countySlug: county.slug,
        moverIds: curatedIds,
      };
    }

    const pool = county.metro ? metroPools[county.metro] ?? [] : [];
    const count = 3 + (county.slug.length % 3);
    const offset = county.slug.charCodeAt(0) % Math.max(pool.length, 1);
    const picked: string[] = [];

    for (let i = 0; picked.length < count && i < pool.length * 2; i++) {
      const id = pool[(offset + i) % pool.length];
      if (id && !picked.includes(id)) picked.push(id);
    }

    return {
      stateSlug: state.slug,
      countySlug: county.slug,
      moverIds: picked,
    };
  });

  return {
    stateSlug: state.slug,
    stateName: state.name,
    counties,
    movers,
    metroPools,
    assignments,
  };
}

function writeStateBundle(bundle: ReturnType<typeof generateStateBundle>) {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const filePath = path.join(OUT_DIR, `${bundle.stateSlug}.ts`);
  const content = `// Auto-generated by scripts/generate-state-local-movers.ts — do not edit manually
import type { CountyMoverAssignment, LocalCounty, LocalMover } from '@/lib/local-movers/types';

export const ${bundle.stateSlug.replace(/-/g, '_')}Counties: LocalCounty[] = ${JSON.stringify(bundle.counties, null, 2)};

export const ${bundle.stateSlug.replace(/-/g, '_')}Movers: Record<string, LocalMover> = ${JSON.stringify(bundle.movers, null, 2)};

export const ${bundle.stateSlug.replace(/-/g, '_')}MetroPools: Record<string, string[]> = ${JSON.stringify(bundle.metroPools, null, 2)};

export const ${bundle.stateSlug.replace(/-/g, '_')}Assignments: CountyMoverAssignment[] = ${JSON.stringify(bundle.assignments, null, 2)};
`;

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(
    `Generated ${bundle.stateName}: ${bundle.counties.length} counties, ${Object.keys(bundle.movers).length} movers`
  );
}

function writeGeneratedIndex(stateSlugs: string[]) {
  const imports = stateSlugs
    .map(
      (slug) =>
        `import { ${slug.replace(/-/g, '_')}Counties, ${slug.replace(/-/g, '_')}Movers, ${slug.replace(/-/g, '_')}MetroPools, ${slug.replace(/-/g, '_')}Assignments } from './states/${slug}';`
    )
    .join('\n');

  const countyExports = stateSlugs
    .map((slug) => `  ...${slug.replace(/-/g, '_')}Counties,`)
    .join('\n');

  const moverMerge = stateSlugs
    .map((slug) => `  ...${slug.replace(/-/g, '_')}Movers,`)
    .join('\n');

  const poolMerge = stateSlugs
    .map((slug) => `  ...${slug.replace(/-/g, '_')}MetroPools,`)
    .join('\n');

  const assignmentExports = stateSlugs
    .map((slug) => `  ...${slug.replace(/-/g, '_')}Assignments,`)
    .join('\n');

  const content = `// Auto-generated index — updated by scripts/generate-state-local-movers.ts
${imports}

export const generatedCounties = [
${countyExports}
];

export const generatedMoversCatalog = {
${moverMerge}
};

export const generatedMetroPools = {
${poolMerge}
};

export const generatedCountyAssignments = [
${assignmentExports}
];
`;

  fs.writeFileSync(path.join(ROOT, 'data/generated/index.ts'), content, 'utf8');
}

function getExistingGeneratedSlugs(): string[] {
  if (!fs.existsSync(OUT_DIR)) return [];
  return fs
    .readdirSync(OUT_DIR)
    .filter((f) => f.endsWith('.ts'))
    .map((f) => f.replace('.ts', ''))
    .sort();
}

function main() {
  const arg = process.argv[2];
  if (!arg) {
    console.error('Usage: npx tsx scripts/generate-state-local-movers.ts <state-slug|--all>');
    process.exit(1);
  }

  const allSlugs = Object.values(STATE_BY_FIPS)
    .map((s) => s.slug)
    .filter((slug) => !SKIP_STATES.has(slug));

  const targets =
    arg === '--all'
      ? allSlugs
      : [arg];

  for (const slug of targets) {
    if (SKIP_STATES.has(slug)) {
      console.log(`Skipping ${slug} (manual data)`);
      continue;
    }
    const bundle = generateStateBundle(slug);
    writeStateBundle(bundle);
  }

  writeGeneratedIndex(getExistingGeneratedSlugs());
}

main();