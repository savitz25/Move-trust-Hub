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
  'mississippi',
  'louisiana',
  'oklahoma',
  'arkansas',
  'kansas',
  'missouri',
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
  { stateSlug: 'mississippi', countySlug: 'hinds', expectedCity: 'Jackson' },
  { stateSlug: 'mississippi', countySlug: 'harrison', expectedCity: 'Gulfport' },
  { stateSlug: 'mississippi', countySlug: 'desoto', expectedCity: 'Hernando' },
  { stateSlug: 'louisiana', countySlug: 'orleans', expectedCity: 'New Orleans' },
  { stateSlug: 'louisiana', countySlug: 'east-baton-rouge', expectedCity: 'Baton Rouge' },
  { stateSlug: 'louisiana', countySlug: 'jefferson', expectedCity: 'Gretna' },
  { stateSlug: 'oklahoma', countySlug: 'oklahoma', expectedCity: 'Oklahoma City' },
  { stateSlug: 'oklahoma', countySlug: 'tulsa', expectedCity: 'Tulsa' },
  { stateSlug: 'oklahoma', countySlug: 'cleveland', expectedCity: 'Norman' },
  { stateSlug: 'arkansas', countySlug: 'pulaski', expectedCity: 'Little Rock' },
  { stateSlug: 'arkansas', countySlug: 'benton', expectedCity: 'Bentonville' },
  { stateSlug: 'arkansas', countySlug: 'washington', expectedCity: 'Fayetteville' },
  { stateSlug: 'kansas', countySlug: 'johnson', expectedCity: 'Olathe' },
  { stateSlug: 'kansas', countySlug: 'sedgwick', expectedCity: 'Wichita' },
  { stateSlug: 'kansas', countySlug: 'shawnee', expectedCity: 'Topeka' },
  { stateSlug: 'missouri', countySlug: 'st-louis', expectedCity: 'Clayton' },
  { stateSlug: 'missouri', countySlug: 'jackson', expectedCity: 'Independence' },
  { stateSlug: 'missouri', countySlug: 'st-charles', expectedCity: 'St. Charles' },
  { stateSlug: 'missouri', countySlug: 'greene', expectedCity: 'Springfield' },
  { stateSlug: 'missouri', countySlug: 'st-louis-city', expectedCity: 'St. Louis' },
  { stateSlug: 'missouri', countySlug: 'clay', expectedCity: 'Liberty' },
  { stateSlug: 'missouri', countySlug: 'jefferson', expectedCity: 'Hillsboro' },
  { stateSlug: 'missouri', countySlug: 'boone', expectedCity: 'Columbia' },
  { stateSlug: 'missouri', countySlug: 'jasper', expectedCity: 'Carthage' },
  { stateSlug: 'missouri', countySlug: 'cass', expectedCity: 'Harrisonville' },
  { stateSlug: 'missouri', countySlug: 'platte', expectedCity: 'Platte City' },
  { stateSlug: 'missouri', countySlug: 'franklin', expectedCity: 'Union' },
  { stateSlug: 'missouri', countySlug: 'christian', expectedCity: 'Ozark' },
  { stateSlug: 'missouri', countySlug: 'cape-girardeau', expectedCity: 'Jackson' },
  { stateSlug: 'missouri', countySlug: 'buchanan', expectedCity: 'St. Joseph' },
  { stateSlug: 'missouri', countySlug: 'cole', expectedCity: 'Jefferson City' },
  { stateSlug: 'missouri', countySlug: 'st-francois', expectedCity: 'Farmington' },
  { stateSlug: 'missouri', countySlug: 'lincoln', expectedCity: 'Troy' },
  { stateSlug: 'missouri', countySlug: 'newton', expectedCity: 'Neosho' },
  { stateSlug: 'missouri', countySlug: 'johnson', expectedCity: 'Warrensburg' },
  { stateSlug: 'missouri', countySlug: 'taney', expectedCity: 'Forsyth' },
  { stateSlug: 'missouri', countySlug: 'pulaski', expectedCity: 'Waynesville' },
  { stateSlug: 'missouri', countySlug: 'callaway', expectedCity: 'Fulton' },
  { stateSlug: 'missouri', countySlug: 'phelps', expectedCity: 'Rolla' },
  { stateSlug: 'missouri', countySlug: 'pettis', expectedCity: 'Sedalia' },
  { stateSlug: 'missouri', countySlug: 'webster', expectedCity: 'Marshfield' },
  { stateSlug: 'missouri', countySlug: 'camden', expectedCity: 'Camdenton' },
  { stateSlug: 'missouri', countySlug: 'butler', expectedCity: 'Poplar Bluff' },
  { stateSlug: 'missouri', countySlug: 'howell', expectedCity: 'West Plains' },
  { stateSlug: 'missouri', countySlug: 'lawrence', expectedCity: 'Mount Vernon' },
  { stateSlug: 'missouri', countySlug: 'warren', expectedCity: 'Warrenton' },
  { stateSlug: 'missouri', countySlug: 'scott', expectedCity: 'Benton' },
  { stateSlug: 'missouri', countySlug: 'laclede', expectedCity: 'Lebanon' },
  { stateSlug: 'missouri', countySlug: 'barry', expectedCity: 'Cassville' },
  { stateSlug: 'missouri', countySlug: 'polk', expectedCity: 'Bolivar' },
  { stateSlug: 'missouri', countySlug: 'lafayette', expectedCity: 'Lexington' },
  { stateSlug: 'missouri', countySlug: 'stone', expectedCity: 'Galena' },
  { stateSlug: 'missouri', countySlug: 'marion', expectedCity: 'Palmyra' },
  { stateSlug: 'missouri', countySlug: 'stoddard', expectedCity: 'Bloomfield' },
  { stateSlug: 'missouri', countySlug: 'dunklin', expectedCity: 'Kennett' },
  { stateSlug: 'missouri', countySlug: 'texas', expectedCity: 'Houston' },
  { stateSlug: 'missouri', countySlug: 'miller', expectedCity: 'Tuscumbia' },
  { stateSlug: 'missouri', countySlug: 'adair', expectedCity: 'Kirksville' },
  { stateSlug: 'missouri', countySlug: 'audrain', expectedCity: 'Mexico' },
  { stateSlug: 'missouri', countySlug: 'randolph', expectedCity: 'Huntsville' },
  { stateSlug: 'missouri', countySlug: 'mcdonald', expectedCity: 'Pineville' },
  { stateSlug: 'missouri', countySlug: 'washington', expectedCity: 'Potosi' },
  { stateSlug: 'missouri', countySlug: 'ray', expectedCity: 'Richmond' },
  { stateSlug: 'missouri', countySlug: 'saline', expectedCity: 'Marshall' },
  { stateSlug: 'missouri', countySlug: 'crawford', expectedCity: 'Steelville' },
  { stateSlug: 'missouri', countySlug: 'henry', expectedCity: 'Clinton' },
  { stateSlug: 'missouri', countySlug: 'morgan', expectedCity: 'Versailles' },
  { stateSlug: 'missouri', countySlug: 'clinton', expectedCity: 'Plattsburg' },
  { stateSlug: 'missouri', countySlug: 'benton', expectedCity: 'Warsaw' },
  { stateSlug: 'missouri', countySlug: 'vernon', expectedCity: 'Nevada' },
  { stateSlug: 'missouri', countySlug: 'nodaway', expectedCity: 'Maryville' },
  { stateSlug: 'missouri', countySlug: 'wright', expectedCity: 'Hartville' },
  { stateSlug: 'missouri', countySlug: 'perry', expectedCity: 'Perryville' },
  { stateSlug: 'missouri', countySlug: 'ste-genevieve', expectedCity: 'Ste. Genevieve' },
  { stateSlug: 'missouri', countySlug: 'andrew', expectedCity: 'Savannah' },
  { stateSlug: 'missouri', countySlug: 'dallas', expectedCity: 'Buffalo' },
  { stateSlug: 'missouri', countySlug: 'pike', expectedCity: 'Bowling Green' },
  { stateSlug: 'missouri', countySlug: 'cooper', expectedCity: 'Boonville' },
  { stateSlug: 'missouri', countySlug: 'bates', expectedCity: 'Butler' },
  { stateSlug: 'missouri', countySlug: 'moniteau', expectedCity: 'California' },
  { stateSlug: 'missouri', countySlug: 'macon', expectedCity: 'Macon' },
  { stateSlug: 'missouri', countySlug: 'new-madrid', expectedCity: 'New Madrid' },
  { stateSlug: 'missouri', countySlug: 'gasconade', expectedCity: 'Hermann' },
  { stateSlug: 'missouri', countySlug: 'cedar', expectedCity: 'Stockton' },
  { stateSlug: 'missouri', countySlug: 'livingston', expectedCity: 'Chillicothe' },
  { stateSlug: 'missouri', countySlug: 'dent', expectedCity: 'Salem' },
  { stateSlug: 'missouri', countySlug: 'pemiscot', expectedCity: 'Caruthersville' },
  { stateSlug: 'missouri', countySlug: 'osage', expectedCity: 'Linn' },
  { stateSlug: 'missouri', countySlug: 'madison', expectedCity: 'Fredericktown' },
  { stateSlug: 'missouri', countySlug: 'douglas', expectedCity: 'Ava' },
  { stateSlug: 'missouri', countySlug: 'mississippi', expectedCity: 'Charleston' },
  { stateSlug: 'missouri', countySlug: 'barton', expectedCity: 'Lamar' },
  { stateSlug: 'missouri', countySlug: 'linn', expectedCity: 'Linneus' },
  { stateSlug: 'missouri', countySlug: 'montgomery', expectedCity: 'Montgomery City' },
  { stateSlug: 'missouri', countySlug: 'bollinger', expectedCity: 'Marble Hill' },
  { stateSlug: 'missouri', countySlug: 'ripley', expectedCity: 'Doniphan' },
  { stateSlug: 'missouri', countySlug: 'wayne', expectedCity: 'Greenville' },
  { stateSlug: 'missouri', countySlug: 'ralls', expectedCity: 'New London' },
  { stateSlug: 'missouri', countySlug: 'howard', expectedCity: 'Fayette' },
  { stateSlug: 'missouri', countySlug: 'st-clair', expectedCity: 'Osceola' },
  { stateSlug: 'missouri', countySlug: 'lewis', expectedCity: 'Monticello' },
  { stateSlug: 'missouri', countySlug: 'grundy', expectedCity: 'Trenton' },
  { stateSlug: 'missouri', countySlug: 'dekalb', expectedCity: 'Maysville' },
  { stateSlug: 'missouri', countySlug: 'ozark', expectedCity: 'Gainesville' },
  { stateSlug: 'missouri', countySlug: 'iron', expectedCity: 'Ironton' },
  { stateSlug: 'missouri', countySlug: 'hickory', expectedCity: 'Hermitage' },
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