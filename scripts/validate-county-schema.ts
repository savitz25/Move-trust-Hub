/**
 * Validates JSON-LD graph integrity for curated-state county pages.
 * Run: npx tsx scripts/validate-county-schema.ts
 */
import { buildCountySchemaGraph } from '../lib/local-movers/build-county-schema-graph';
import { getCountiesForState, getCounty } from '../lib/local-movers/geography/index';
import {
  buildCountyDescription,
  buildCountyFaqItems,
  buildCountyLabel,
  buildCountyTestimonials,
  buildCountyTitle,
  getCountyPath,
  getMoversForCounty,
} from '../lib/local-movers/index';
import { getLocalState } from '../lib/local-movers/states';
import {
  buildSchemaPrimaryCity,
  validateCountySchemaGraph,
} from '../lib/local-movers/schema-helpers';

const CURATED_STATES = [
  'texas',
  'new-york',
  'new-jersey',
  'california',
  'south-carolina',
  'florida',
  'north-carolina',
  'tennessee',
  'alabama',
] as const;

const SPOT_CHECK: Array<{ stateSlug: string; countySlug: string; expectedCity?: string }> = [
  { stateSlug: 'texas', countySlug: 'travis', expectedCity: 'Austin' },
  { stateSlug: 'texas', countySlug: 'austin', expectedCity: 'Bellville' },
  { stateSlug: 'california', countySlug: 'los-angeles', expectedCity: 'Los Angeles' },
  { stateSlug: 'new-york', countySlug: 'new-york', expectedCity: 'Manhattan' },
  { stateSlug: 'florida', countySlug: 'miami-dade', expectedCity: 'Miami' },
  { stateSlug: 'north-carolina', countySlug: 'wake', expectedCity: 'Raleigh' },
  { stateSlug: 'tennessee', countySlug: 'shelby', expectedCity: 'Memphis' },
  { stateSlug: 'tennessee', countySlug: 'davidson', expectedCity: 'Nashville' },
  { stateSlug: 'tennessee', countySlug: 'knox', expectedCity: 'Knoxville' },
  { stateSlug: 'alabama', countySlug: 'jefferson', expectedCity: 'Birmingham' },
  { stateSlug: 'alabama', countySlug: 'madison', expectedCity: 'Huntsville' },
  { stateSlug: 'alabama', countySlug: 'mobile', expectedCity: 'Mobile' },
];

let totalIssues = 0;

for (const stateSlug of CURATED_STATES) {
  const state = getLocalState(stateSlug);
  if (!state) {
    console.error(`Missing state: ${stateSlug}`);
    totalIssues += 1;
    continue;
  }

  const counties = getCountiesForState(stateSlug);

  for (const county of counties) {
    const result = getMoversForCounty(stateSlug, county.slug);
    if (!result) continue;

    const { movers } = result;
    const title = buildCountyTitle(county, state.name);
    const description = buildCountyDescription(county, state.name, movers.length);
    const path = getCountyPath(stateSlug, county.slug);
    const countyLabel = buildCountyLabel(county);
    const faqItems = buildCountyFaqItems(county, state.name, movers);
    const testimonials = buildCountyTestimonials(county, state.name);

    const graph = buildCountySchemaGraph({
      title,
      description,
      path,
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Local Movers', path: '/local-movers' },
        { name: state.name, path: `/local-movers/${stateSlug}` },
        { name: countyLabel, path },
      ],
      movers,
      county,
      stateName: state.name,
      faqItems,
      testimonials,
    });

    const issues = validateCountySchemaGraph(graph, county);
    if (issues.length) {
      for (const issue of issues) {
        console.error(`[${issue.stateSlug}/${issue.countySlug}] ${issue.issue}`);
        totalIssues += 1;
      }
    }
  }
}

for (const check of SPOT_CHECK) {
  const county = getCounty(check.stateSlug, check.countySlug);
  const state = getLocalState(check.stateSlug);
  if (!county || !state) {
    console.error(`Spot check missing data: ${check.stateSlug}/${check.countySlug}`);
    totalIssues += 1;
    continue;
  }

  const primaryCity = buildSchemaPrimaryCity(county);
  if (check.expectedCity && primaryCity !== check.expectedCity) {
    console.error(
      `[spot-check ${check.stateSlug}/${check.countySlug}] expected primary city "${check.expectedCity}", got "${primaryCity ?? 'none'}"`
    );
    totalIssues += 1;
  }
}

if (totalIssues > 0) {
  console.error(`\nCounty schema validation failed with ${totalIssues} issue(s).`);
  process.exit(1);
}

console.log(
  `County schema validation passed for ${CURATED_STATES.length} curated states and ${SPOT_CHECK.length} spot checks.`
);