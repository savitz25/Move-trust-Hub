/**
 * Generates lightweight SVG path geo JSON for the interactive US map.
 * Run: npx tsx scripts/generate-us-map-geo.ts
 *
 * Dev dependencies: us-atlas, topojson-client, d3-geo
 */
import fs from 'fs';
import path from 'path';
import { feature, mesh } from 'topojson-client';
import type { Feature, FeatureCollection, Geometry } from 'geojson';
import { geoAlbersUsa, geoPath } from 'd3-geo';
// @ts-expect-error us-atlas ships without types
import statesTopo from 'us-atlas/states-10m.json';
// @ts-expect-error us-atlas ships without types
import countiesTopo from 'us-atlas/counties-10m.json';
import { localStates } from '../lib/local-movers/states';
import { getCountiesForState } from '../lib/local-movers/geography/index';
import { getCountyPath, getStatePath } from '../lib/local-movers/index';
import { isCuratedState } from '../lib/local-movers/curated-states';
import type { MapSearchResult } from '../lib/map/types';

const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public/geo');
const COUNTIES_DIR = path.join(OUT_DIR, 'counties');

const FIPS_TO_SLUG: Record<string, string> = {
  '01': 'alabama',
  '02': 'alaska',
  '04': 'arizona',
  '05': 'arkansas',
  '06': 'california',
  '08': 'colorado',
  '09': 'connecticut',
  '10': 'delaware',
  '11': 'district-of-columbia',
  '12': 'florida',
  '13': 'georgia',
  '15': 'hawaii',
  '16': 'idaho',
  '17': 'illinois',
  '18': 'indiana',
  '19': 'iowa',
  '20': 'kansas',
  '21': 'kentucky',
  '22': 'louisiana',
  '23': 'maine',
  '24': 'maryland',
  '25': 'massachusetts',
  '26': 'michigan',
  '27': 'minnesota',
  '28': 'mississippi',
  '29': 'missouri',
  '30': 'montana',
  '31': 'nebraska',
  '32': 'nevada',
  '33': 'new-hampshire',
  '34': 'new-jersey',
  '35': 'new-mexico',
  '36': 'new-york',
  '37': 'north-carolina',
  '38': 'north-dakota',
  '39': 'ohio',
  '40': 'oklahoma',
  '41': 'oregon',
  '42': 'pennsylvania',
  '44': 'rhode-island',
  '45': 'south-carolina',
  '46': 'south-dakota',
  '47': 'tennessee',
  '48': 'texas',
  '49': 'utah',
  '50': 'vermont',
  '51': 'virginia',
  '53': 'washington',
  '54': 'west-virginia',
  '55': 'wisconsin',
  '56': 'wyoming',
};

const SLUG_TO_CODE = Object.fromEntries(localStates.map((s) => [s.slug, s.code]));

const NAME_OVERRIDES: Record<string, Record<string, string>> = {
  missouri: {
    'St. Louis': 'st-louis',
    'St. Louis city': 'st-louis-city',
  },
  virginia: {
    'Alexandria city': 'alexandria-city',
    'Bristol city': 'bristol-city',
    'Buena Vista city': 'buena-vista-city',
    'Charlottesville city': 'charlottesville-city',
    'Chesapeake city': 'chesapeake-city',
    'Colonial Heights city': 'colonial-heights-city',
    'Covington city': 'covington-city',
    'Danville city': 'danville-city',
    'Emporia city': 'emporia-city',
    'Fairfax city': 'fairfax-city',
    'Falls Church city': 'falls-church-city',
    'Franklin city': 'franklin-city',
    'Fredericksburg city': 'fredericksburg-city',
    'Galax city': 'galax-city',
    'Hampton city': 'hampton-city',
    'Harrisonburg city': 'harrisonburg-city',
    'Hopewell city': 'hopewell-city',
    'Lexington city': 'lexington-city',
    'Lynchburg city': 'lynchburg-city',
    'Manassas city': 'manassas-city',
    'Manassas Park city': 'manassas-park-city',
    'Martinsville city': 'martinsville-city',
    'Newport News city': 'newport-news-city',
    'Norfolk city': 'norfolk-city',
    'Norton city': 'norton-city',
    'Petersburg city': 'petersburg-city',
    'Poquoson city': 'poquoson-city',
    'Portsmouth city': 'portsmouth-city',
    'Radford city': 'radford-city',
    'Richmond city': 'richmond-city',
    'Roanoke city': 'roanoke-city',
    'Salem city': 'salem-city',
    'Staunton city': 'staunton-city',
    'Suffolk city': 'suffolk-city',
    'Virginia Beach city': 'virginia-beach-city',
    'Waynesboro city': 'waynesboro-city',
    'Williamsburg city': 'williamsburg-city',
    'Winchester city': 'winchester-city',
  },
};

function normalizeCountyName(name: string): string {
  return name
    .replace(/\s+(Parish|Borough|Census Area|Municipality|city|City)$/i, '')
    .replace(/\./g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function buildCountySlugLookup(stateSlug: string) {
  const counties = getCountiesForState(stateSlug);
  const byName = new Map<string, string>();
  const overrides = NAME_OVERRIDES[stateSlug] ?? {};

  for (const county of counties) {
    byName.set(normalizeCountyName(county.name), county.slug);
  }

  return (geoName: string): string | undefined => {
    if (overrides[geoName]) return overrides[geoName];
    const normalized = normalizeCountyName(geoName);
    if (byName.has(normalized)) return byName.get(normalized);

    // Louisiana: "St. John the Baptist" etc.
    for (const [key, slug] of byName.entries()) {
      if (normalized.includes(key) || key.includes(normalized)) return slug;
    }

    return undefined;
  };
}

function getBbox(pathD: string): [number, number, number, number] {
  const nums = pathD.match(/-?\d+\.?\d*/g)?.map(Number) ?? [];
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (let i = 0; i < nums.length; i += 2) {
    const x = nums[i];
    const y = nums[i + 1];
    if (x == null || y == null) continue;
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }
  return [minX, minY, maxX, maxY];
}

function getCentroid(bbox: [number, number, number, number]): [number, number] {
  return [(bbox[0] + bbox[2]) / 2, (bbox[1] + bbox[3]) / 2];
}

function toViewBox(bbox: [number, number, number, number], pad = 8): string {
  const [minX, minY, maxX, maxY] = bbox;
  const width = maxX - minX + pad * 2;
  const height = maxY - minY + pad * 2;
  return `${minX - pad} ${minY - pad} ${width} ${height}`;
}

const projection = geoAlbersUsa().scale(1100).translate([480, 290]);
const pathGen = geoPath(projection);

const statesFeatures = feature(
  statesTopo as never,
  (statesTopo as { objects: { states: unknown } }).objects.states
) as FeatureCollection<Geometry, { name: string }>;

fs.mkdirSync(COUNTIES_DIR, { recursive: true });

const nationalStates: Array<{
  slug: string;
  name: string;
  code: string;
  path: string;
  cx: number;
  cy: number;
  bbox: [number, number, number, number];
  curated: boolean;
  href: string;
}> = [];

let nationalBbox: [number, number, number, number] = [Infinity, Infinity, -Infinity, -Infinity];

for (const stateFeature of statesFeatures.features) {
  const fips = String(stateFeature.id).padStart(2, '0');
  const slug = FIPS_TO_SLUG[fips];
  if (!slug) continue;

  const localState = localStates.find((s) => s.slug === slug);
  if (!localState) continue;

  const pathD = pathGen(stateFeature) ?? '';
  if (!pathD) continue;

  const bbox = getBbox(pathD);
  const [cx, cy] = getCentroid(bbox);
  nationalBbox = [
    Math.min(nationalBbox[0], bbox[0]),
    Math.min(nationalBbox[1], bbox[1]),
    Math.max(nationalBbox[2], bbox[2]),
    Math.max(nationalBbox[3], bbox[3]),
  ];

  nationalStates.push({
    slug,
    name: localState.name,
    code: localState.code,
    path: pathD,
    cx,
    cy,
    bbox,
    curated: isCuratedState(slug),
    href: `/local-movers/${slug}`,
  });

  const stateMesh = mesh(
    countiesTopo as never,
    (countiesTopo as { objects: { counties: unknown } }).objects.counties,
    (a, b) => (a as { id: string }).id === fips || (b as { id: string }).id === fips
  );

  const countiesFeatures = feature(
    countiesTopo as never,
    (countiesTopo as { objects: { counties: unknown } }).objects.counties
  ) as FeatureCollection<Geometry, { name: string }>;

  const lookup = buildCountySlugLookup(slug);
  const stateCounties: Array<{ slug: string; name: string; path: string; href: string }> = [];
  let stateBbox: [number, number, number, number] = [Infinity, Infinity, -Infinity, -Infinity];

  for (const countyFeature of countiesFeatures.features) {
    const countyFips = String(countyFeature.id ?? '');
    if (!countyFips.startsWith(fips)) continue;

    const countySlug = lookup(countyFeature.properties.name);
    if (!countySlug) continue;

    const countyPath = pathGen(countyFeature) ?? '';
    if (!countyPath) continue;

    const cBbox = getBbox(countyPath);
    stateBbox = [
      Math.min(stateBbox[0], cBbox[0]),
      Math.min(stateBbox[1], cBbox[1]),
      Math.max(stateBbox[2], cBbox[2]),
      Math.max(stateBbox[3], cBbox[3]),
    ];

    const county = getCountiesForState(slug).find((c) => c.slug === countySlug);
    stateCounties.push({
      slug: countySlug,
      name: county?.name ?? countyFeature.properties.name,
      path: countyPath,
      href: `/local-movers/${slug}/${countySlug}`,
    });
  }

  if (stateCounties.length > 0 && stateBbox[0] !== Infinity) {
    fs.writeFileSync(
      path.join(COUNTIES_DIR, `${slug}.json`),
      JSON.stringify({
        stateSlug: slug,
        stateName: localState.name,
        viewBox: toViewBox(stateBbox, 12),
        counties: stateCounties,
      })
    );
  }
}

fs.writeFileSync(
  path.join(OUT_DIR, 'us-states.json'),
  JSON.stringify({
    viewBox: toViewBox(nationalBbox, 4),
    states: nationalStates,
  })
);

const searchIndex: MapSearchResult[] = [];
for (const state of localStates) {
  searchIndex.push({
    type: 'state',
    label: state.name,
    sublabel: state.code,
    href: getStatePath(state.slug),
    stateSlug: state.slug,
  });

  for (const county of getCountiesForState(state.slug)) {
    searchIndex.push({
      type: 'county',
      label: county.name,
      sublabel: `${state.name} (${state.code})`,
      href: getCountyPath(state.slug, county.slug),
      stateSlug: state.slug,
    });
  }
}

fs.writeFileSync(
  path.join(OUT_DIR, 'search-index.json'),
  JSON.stringify(searchIndex)
);

console.log(
  `Generated ${nationalStates.length} states, ${fs.readdirSync(COUNTIES_DIR).length} county files, and ${searchIndex.length} search entries.`
);