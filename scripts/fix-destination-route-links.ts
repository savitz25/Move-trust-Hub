/**
 * Repairs mismatched routeLinks in lib/destinations/content/*.ts
 * where labels like "Chicago → Miami" point to wrong route guide slugs.
 *
 * Usage: npm run fix:route-links
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = process.cwd();
const CONTENT_DIR = join(ROOT, 'lib/destinations/content');

const VALID_ROUTE_SLUGS = new Set([
  'california-to-texas', 'california-to-oregon', 'california-to-washington',
  'california-to-idaho', 'california-to-wyoming', 'california-to-arizona',
  'california-to-north-carolina', 'california-to-south-carolina', 'california-to-florida',
  'california-to-tennessee', 'california-to-new-york', 'los-angeles-to-dallas-fort-worth',
  'san-francisco-to-austin', 'san-diego-to-houston', 'new-york-to-texas',
  'new-jersey-to-south-carolina', 'new-jersey-to-florida', 'new-jersey-to-georgia',
  'new-jersey-to-texas', 'pennsylvania-to-south-carolina', 'pennsylvania-to-north-carolina',
  'pennsylvania-to-florida', 'pennsylvania-to-texas', 'massachusetts-to-south-carolina',
  'massachusetts-to-north-carolina', 'massachusetts-to-georgia', 'massachusetts-to-tennessee',
  'massachusetts-to-florida', 'massachusetts-to-texas', 'minnesota-to-texas',
  'minnesota-to-arizona', 'minnesota-to-tennessee', 'minnesota-to-south-carolina',
  'minnesota-to-north-carolina', 'minnesota-to-georgia', 'minnesota-to-florida',
  'illinois-to-tennessee', 'illinois-to-georgia', 'illinois-to-north-carolina',
  'illinois-to-south-carolina', 'illinois-to-louisiana', 'illinois-to-texas',
  'illinois-to-florida', 'illinois-to-arizona', 'new-york-to-florida',
  'florida-to-new-york', 'texas-to-california', 'east-coast-to-west-coast',
  'new-york-to-myrtle-beach',
]);

const ORIGIN_STATE: Record<string, string> = {
  california: 'california',
  chicago: 'illinois',
  illinois: 'illinois',
  'new york': 'new-york',
  'new jersey': 'new-jersey',
  texas: 'texas',
  pennsylvania: 'pennsylvania',
  massachusetts: 'massachusetts',
  minnesota: 'minnesota',
  florida: 'florida',
  georgia: 'georgia',
  washington: 'california',
  arizona: 'california',
  colorado: 'california',
  oklahoma: 'texas',
  tennessee: 'illinois',
  missouri: 'illinois',
  wisconsin: 'illinois',
  michigan: 'illinois',
  indiana: 'illinois',
  virginia: 'new-york',
  maryland: 'pennsylvania',
  connecticut: 'massachusetts',
};

const FLORIDA_MARKERS = [
  'miami', 'boca', 'fort lauderdale', 'hollywood', 'naples', 'tampa', 'orlando',
  'jacksonville', 'palm beach', 'delray', 'boynton', 'deerfield', 'cape coral',
  'sarasota', 'clearwater', 'st. petersburg', 'pensacola', 'florida',
];

const TEXAS_MARKERS = ['austin', 'dallas', 'houston', 'san antonio', 'arlington', 'fort worth', 'texas', 'plano', 'frisco'];
const GEORGIA_MARKERS = ['atlanta', 'alpharetta', 'savannah', 'georgia', 'marietta', 'roswell', 'johns creek', 'decatur'];
const NC_MARKERS = ['charlotte', 'raleigh', 'durham', 'wilmington', 'asheville', 'north carolina', 'cary', 'apex'];
const SC_MARKERS = ['myrtle beach', 'charleston', 'greenville', 'hilton head', 'south carolina', 'spartanburg'];
const TN_MARKERS = ['nashville', 'knoxville', 'chattanooga', 'memphis', 'tennessee', 'franklin', 'clarksville'];
const AZ_MARKERS = ['phoenix', 'scottsdale', 'tucson', 'mesa', 'arizona', 'chandler', 'buckeye'];
const CO_MARKERS = ['denver', 'boulder', 'colorado', 'aurora', 'fort collins', 'arvada'];

function inferDestState(labelDest: string): string | null {
  const d = labelDest.toLowerCase();
  if (FLORIDA_MARKERS.some((m) => d.includes(m))) return 'florida';
  if (TEXAS_MARKERS.some((m) => d.includes(m))) return 'texas';
  if (GEORGIA_MARKERS.some((m) => d.includes(m))) return 'georgia';
  if (NC_MARKERS.some((m) => d.includes(m))) return 'north-carolina';
  if (SC_MARKERS.some((m) => d.includes(m))) return 'south-carolina';
  if (TN_MARKERS.some((m) => d.includes(m))) return 'tennessee';
  if (AZ_MARKERS.some((m) => d.includes(m))) return 'arizona';
  if (CO_MARKERS.some((m) => d.includes(m))) return 'colorado';
  if (d.includes('louisiana') || d.includes('new orleans')) return 'louisiana';
  if (d.includes('oregon') || d.includes('portland')) return 'oregon';
  if (d.includes('washington') || d.includes('seattle')) return 'washington';
  if (d.includes('new york')) return 'new-york';
  return null;
}

function inferOriginState(labelOrigin: string): string | null {
  const o = labelOrigin.toLowerCase().trim();
  if (ORIGIN_STATE[o]) return ORIGIN_STATE[o];
  for (const [key, state] of Object.entries(ORIGIN_STATE)) {
    if (o.includes(key)) return state;
  }
  return null;
}

function resolveRouteSlug(label: string): string | null {
  const parts = label.split('→').map((s) => s.trim());
  if (parts.length !== 2) return null;
  const [originLabel, destLabel] = parts;
  const origin = inferOriginState(originLabel);
  const dest = inferDestState(destLabel);
  if (!origin || !dest) return null;
  const slug = `${origin}-to-${dest}`;
  return VALID_ROUTE_SLUGS.has(slug) ? slug : null;
}

function walk(dir: string, files: string[] = []): string[] {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, files);
    else if (e.endsWith('.ts')) files.push(p);
  }
  return files;
}

let totalFixes = 0;
let filesChanged = 0;

for (const file of walk(CONTENT_DIR)) {
  let content = readFileSync(file, 'utf8');
  let fileFixes = 0;

  content = content.replace(
    /label:\s*'([^']+)',\s*\n\s*href:\s*'\/resources\/routes\/([^']+)'/g,
    (match, label: string, slug: string) => {
      const resolved = resolveRouteSlug(label);
      if (!resolved || resolved === slug) return match;
      fileFixes++;
      return `label: '${label}',\n      href: '/resources/routes/${resolved}'`;
    }
  );

  if (fileFixes > 0) {
    writeFileSync(file, content, 'utf8');
    filesChanged++;
    totalFixes += fileFixes;
    console.log(`  ${file.replace(ROOT + '\\', '')}: ${fileFixes} fix(es)`);
  }
}

console.log(`\nfix-destination-route-links: ${totalFixes} link(s) in ${filesChanged} file(s)`);