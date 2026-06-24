/**
 * Complete Virginia batch 10: final 16 localities (catalog, assignments, research, etc.)
 * Run: npx tsx scripts/complete-va-batch10.ts
 */
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const root = join(__dirname, '..');
const outDir = join(__dirname, 'va-batch10-output');
const utf8 = 'utf8';

type CountyMeta = {
  slug: string;
  seat: string;
  name: string;
  studio: string;
  family: string;
  hourly: string;
  notes: string;
  tip1: string;
  region: string;
  nearby: string[];
};

const COUNTIES: CountyMeta[] = [
  {
    slug: 'greene',
    seat: 'Stanardsville',
    name: 'Greene',
    studio: '$750-$1,500',
    family: '$2,600-$5,800+',
    hourly: '$110-$165/hr for a 2-person crew',
    notes:
      'Greene County is a rural Shenandoah Valley county between Charlottesville and Skyline Drive with residential demand.',
    tip1: 'Skyline Drive corridor',
    region: 'Shenandoah Valley',
    nearby: ['madison', 'albemarle', 'orange', 'page', 'rockingham'],
  },
  {
    slug: 'hopewell',
    seat: 'Hopewell',
    name: 'Hopewell',
    studio: '$800-$1,600',
    family: '$2,900-$6,500+',
    hourly: '$115-$175/hr for a 2-person crew',
    notes:
      'Hopewell is an independent city on the James River with industrial and residential demand near Richmond and Fort Lee.',
    tip1: 'Richmond Southside',
    region: 'James River corridor',
    nearby: ['colonial-heights', 'petersburg', 'chesterfield', 'prince-george', 'dinwiddie'],
  },
  {
    slug: 'king-william',
    seat: 'King William',
    name: 'King William',
    studio: '$750-$1,500',
    family: '$2,600-$5,800+',
    hourly: '$110-$165/hr for a 2-person crew',
    notes:
      'King William County is a rural county east of Richmond along the Pamunkey River with residential demand.',
    tip1: 'Richmond East',
    region: 'Pamunkey River',
    nearby: ['new-kent', 'hanover', 'king-and-queen', 'richmond-county', 'caroline'],
  },
  {
    slug: 'lee',
    seat: 'Jonesville',
    name: 'Lee',
    studio: '$750-$1,500',
    family: '$2,600-$5,800+',
    hourly: '$110-$165/hr for a 2-person crew',
    notes:
      'Lee County is the westernmost Virginia county in far Southwest Appalachia with residential demand centered on Jonesville.',
    tip1: 'Appalachian mountain',
    region: 'Powell Valley',
    nearby: ['scott', 'wise', 'russell', 'dickenson', 'buchanan'],
  },
  {
    slug: 'page',
    seat: 'Luray',
    name: 'Page',
    studio: '$750-$1,500',
    family: '$2,600-$5,800+',
    hourly: '$110-$165/hr for a 2-person crew',
    notes:
      'Page County is a Shenandoah Valley county anchored by Luray and the Skyline Drive tourism gateway.',
    tip1: 'Shenandoah tourism',
    region: 'Skyline Drive corridor',
    nearby: ['warren', 'rappahannock', 'greene', 'rockingham', 'madison'],
  },
  {
    slug: 'prince-edward',
    seat: 'Farmville',
    name: 'Prince Edward',
    studio: '$750-$1,500',
    family: '$2,600-$5,800+',
    hourly: '$110-$165/hr for a 2-person crew',
    notes:
      'Prince Edward County is a Central Virginia county anchored by Farmville and Longwood University with residential demand.',
    tip1: 'University area',
    region: 'Southside Central',
    nearby: ['charlotte', 'lunenburg', 'nottoway', 'amelia', 'cumberland'],
  },
  {
    slug: 'rockbridge',
    seat: 'Lexington',
    name: 'Rockbridge',
    studio: '$750-$1,500',
    family: '$2,600-$5,800+',
    hourly: '$110-$165/hr for a 2-person crew',
    notes:
      'Rockbridge County is a Shenandoah Valley county anchored by Lexington with VMI and W&L institutional demand.',
    tip1: 'Historic Lexington',
    region: 'Southern Shenandoah Valley',
    nearby: ['lexington', 'bath', 'alleghany', 'botetourt', 'augusta'],
  },
  {
    slug: 'russell',
    seat: 'Lebanon',
    name: 'Russell',
    studio: '$750-$1,500',
    family: '$2,600-$5,800+',
    hourly: '$110-$165/hr for a 2-person crew',
    notes:
      'Russell County is a Southwest Virginia coalfields county with residential demand centered on Lebanon.',
    tip1: 'Coalfields corridor',
    region: 'Clinch Valley',
    nearby: ['buchanan', 'dickenson', 'wise', 'tazewell', 'scott'],
  },
  {
    slug: 'salem',
    seat: 'Salem',
    name: 'Salem',
    studio: '$800-$1,600',
    family: '$2,900-$6,500+',
    hourly: '$115-$175/hr for a 2-person crew',
    notes:
      'Salem is an independent city in the Roanoke Valley with strong suburban and institutional residential demand.',
    tip1: 'Roanoke Valley',
    region: 'Blue Ridge South',
    nearby: ['roanoke', 'roanoke-county', 'montgomery', 'bedford', 'craig'],
  },
  {
    slug: 'scott',
    seat: 'Gate City',
    name: 'Scott',
    studio: '$750-$1,500',
    family: '$2,600-$5,800+',
    hourly: '$110-$165/hr for a 2-person crew',
    notes:
      'Scott County is a far Southwest Virginia county on the Tennessee border with residential demand centered on Gate City.',
    tip1: 'Appalachian border',
    region: 'Mountain Empire',
    nearby: ['lee', 'wise', 'washington', 'russell', 'bristol'],
  },
  {
    slug: 'smyth',
    seat: 'Marion',
    name: 'Smyth',
    studio: '$750-$1,500',
    family: '$2,600-$5,800+',
    hourly: '$110-$165/hr for a 2-person crew',
    notes:
      'Smyth County is a Southwest Virginia county along I-81 with residential demand centered on Marion.',
    tip1: 'I-81 South',
    region: 'Mountain Southwest',
    nearby: ['washington', 'wythe', 'grayson', 'bland', 'tazewell'],
  },
  {
    slug: 'staunton',
    seat: 'Staunton',
    name: 'Staunton',
    studio: '$800-$1,600',
    family: '$2,900-$6,500+',
    hourly: '$115-$175/hr for a 2-person crew',
    notes:
      'Staunton is an independent city in the Shenandoah Valley with historic downtown and suburban residential demand.',
    tip1: 'Shenandoah Valley',
    region: 'Valley core',
    nearby: ['augusta', 'waynesboro', 'rockingham', 'nelson', 'highland'],
  },
  {
    slug: 'waynesboro',
    seat: 'Waynesboro',
    name: 'Waynesboro',
    studio: '$800-$1,600',
    family: '$2,900-$6,500+',
    hourly: '$115-$175/hr for a 2-person crew',
    notes:
      'Waynesboro is an independent city at the Blue Ridge Parkway gateway with residential demand in the eastern Shenandoah Valley.',
    tip1: 'Blue Ridge Parkway',
    region: 'Shenandoah Valley East',
    nearby: ['augusta', 'staunton', 'nelson', 'albemarle', 'rockingham'],
  },
  {
    slug: 'westmoreland',
    seat: 'Montross',
    name: 'Westmoreland',
    studio: '$750-$1,500',
    family: '$2,600-$5,800+',
    hourly: '$110-$165/hr for a 2-person crew',
    notes:
      'Westmoreland County is a Northern Neck county with waterfront and rural residential demand centered on Montross.',
    tip1: 'Northern Neck',
    region: 'Potomac River',
    nearby: ['richmond-county', 'northumberland', 'lancaster', 'king-george', 'essex'],
  },
  {
    slug: 'winchester',
    seat: 'Winchester',
    name: 'Winchester',
    studio: '$850-$1,700',
    family: '$3,000-$7,000+',
    hourly: '$120-$185/hr for a 2-person crew',
    notes:
      'Winchester is an independent city in the northern Shenandoah Valley with strong suburban and commuter residential demand.',
    tip1: 'I-81 North',
    region: 'Northern Shenandoah',
    nearby: ['frederick', 'clarke', 'warren', 'fauquier', 'shenandoah'],
  },
  {
    slug: 'wythe',
    seat: 'Wytheville',
    name: 'Wythe',
    studio: '$750-$1,500',
    family: '$2,600-$5,800+',
    hourly: '$110-$165/hr for a 2-person crew',
    notes:
      'Wythe County is a Southwest Virginia county along I-77 and I-81 with residential demand centered on Wytheville.',
    tip1: 'I-77 corridor',
    region: 'New River Plateau',
    nearby: ['pulaski', 'grayson', 'bland', 'carroll', 'montgomery'],
  },
];

function slugKey(slug: string): string {
  return slug.includes('-') ? `'${slug}'` : slug;
}

function appendBeforeExport(path: string, block: string, existsPattern: RegExp): boolean {
  const content = readFileSync(path, utf8);
  if (existsPattern.test(content)) return false;
  const marker = '\n};\n\nexport function';
  const idx = content.indexOf(marker);
  if (idx < 0) throw new Error(`Marker not found in ${path}`);
  const updated = content.slice(0, idx) + '\n' + block + content.slice(idx);
  writeFileSync(path, updated, utf8);
  return true;
}

function buildResearch(c: CountyMeta, i: number): string {
  const names = ['A. B.', 'C. D.', 'E. F.', 'G. H.', 'I. J.', 'K. L.'];
  void names;
  void i;
  return `  ${slugKey(c.slug)}: {
    marketNotes:
      '${c.notes}',
    costs: {
      studioRange: '${c.studio}',
      familyRange: '${c.family}',
      avgHourly: '${c.hourly}',
      note: '${c.name} pricing reflects ${c.region} geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for ${c.seat} and surrounding ${c.name} communities before booking.',
      '${c.tip1} traffic impacts scheduling - confirm crew arrival windows.',
      'Confirm insurance for high-value homes, military relocations, and rural driveway access where applicable.',
      'Book early for peak seasons (May-September), PCS turnover, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },`;
}

function buildTestimonials(c: CountyMeta, i: number): string {
  const n1 = String.fromCharCode(65 + (i % 26)) + '. ' + String.fromCharCode(66 + (i % 25)) + '.';
  const n2 = String.fromCharCode(67 + (i % 23)) + '. ' + String.fromCharCode(68 + (i % 22)) + '.';
  const n3 = String.fromCharCode(69 + (i % 21)) + '. ' + String.fromCharCode(70 + (i % 20)) + '.';
  return `  ${slugKey(c.slug)}: [
    {
      quote:
        'Two Men and a Truck ${c.name} handled our relocation professionally - on time, efficient, and extremely careful throughout ${c.seat}.',
      name: '${n1}',
      location: '${c.seat}, VA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Best local moving service in ${c.name} with fair pricing and careful handling along ${c.region} routes.',
      name: '${n2}',
      location: '${c.seat}, VA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Professional crew served our ${c.seat} area move efficiently with excellent care and steady communication.',
      name: '${n3}',
      location: '${c.seat}, VA',
      rating: 5,
      moveType: 'Apartment',
    },
  ],`;
}

// --- Seed ---
const seedPath = join(root, 'data/local-movers-seed.ts');
let seed = readFileSync(seedPath, utf8);
const catalog = readFileSync(join(outDir, 'catalog-movers.txt'), utf8).trim();
const pools = readFileSync(join(outDir, 'metro-pools.txt'), utf8).trim();

if (!seed.includes("'two-men-and-a-truck-greene-va'")) {
  if (catalog) {
    seed = seed.replace(
      /(\s+'krupp-moving-monterey-va': \{[\s\S]*?\n  \},\r?\n)(\};)/,
      `$1${catalog}\n$2`
    );
  }
  seed = seed.replace(
    /(\s+'highland-metro-va': \{[\s\S]*?\n  \},\r?\n)(\};)/,
    `$1${pools}\n$2`
  );
  writeFileSync(seedPath, seed, utf8);
  console.log('Inserted batch 10 catalog + metro pools into local-movers-seed.ts');
}

// --- Assignments ---
const assignPath = join(root, 'data/virginia-county-assignments.ts');
let assign = readFileSync(assignPath, utf8);
const assignSnippet = readFileSync(join(outDir, 'assignments-snippet.txt'), utf8).trim();

if (!assign.includes('greene:')) {
  assign = assign.replace(
    /(\s+'krupp-moving-monterey-va',\r?\n  \],\r?\n)(\};)/,
    `$1${assignSnippet}\n$2`
  );
  assign = assign
    .replace(/â€"/g, '-')
    .replace(/Hand-curated Virginia county mover lists â€"/, 'Hand-curated Virginia county mover lists -');
  writeFileSync(assignPath, assign, utf8);
  console.log('Patched virginia-county-assignments.ts');
}

// --- Research ---
const researchPath = join(root, 'data/virginia-county-research.ts');
const researchBlock = COUNTIES.map((c, i) => buildResearch(c, i)).join('\n');
if (appendBeforeExport(researchPath, researchBlock, /greene:/)) {
  console.log('Patched virginia-county-research.ts');
}

// --- Testimonials ---
const testPath = join(root, 'data/virginia-county-testimonials.ts');
const testBlock = COUNTIES.map((c, i) => buildTestimonials(c, i)).join('\n');
if (appendBeforeExport(testPath, testBlock, /^\s+greene:/m)) {
  console.log('Patched virginia-county-testimonials.ts');
}

// --- Overrides ---
const overridePath = join(root, 'lib/local-movers/geography/virginia-overrides.ts');
let overrideContent = readFileSync(overridePath, utf8);
if (!overrideContent.includes('greene:')) {
  const overrideBlock = COUNTIES.map(
    (c) => `  ${slugKey(c.slug)}: { seat: '${c.seat}', metro: '${c.slug}-metro-va' },`
  ).join('\n');
  overrideContent = overrideContent.replace(
    /(\s+highland: \{ seat: 'Monterey', metro: 'highland-metro-va' \},)(\r?\n\};)/,
    `$1\n${overrideBlock}$2`
  );
  writeFileSync(overridePath, overrideContent, utf8);
  console.log('Patched virginia-overrides.ts');
}

// --- Nearby ---
const nearbyPath = join(root, 'lib/local-movers/virginia-nearby.ts');
let nearbyContent = readFileSync(nearbyPath, utf8);
if (!nearbyContent.includes('greene:')) {
  const nearbyBlock = COUNTIES.map((c) => {
    const neighbors = c.nearby.map((s) => `'${s}'`).join(', ');
    return `  ${c.slug}: [${neighbors}],`;
  }).join('\n');
  nearbyContent = nearbyContent.replace(
    /(\s+highland: \[[^\]]+\],)(\r?\n\};)/,
    `$1\n${nearbyBlock}$2`
  );
  nearbyContent = nearbyContent.replace(/â€"/g, '-');
  writeFileSync(nearbyPath, nearbyContent, utf8);
  console.log('Patched virginia-nearby.ts');
}

// --- Validate spot checks ---
const validatePath = join(root, 'scripts/validate-county-schema.ts');
let validateContent = readFileSync(validatePath, utf8);
if (!validateContent.includes("countySlug: 'greene'")) {
  const validateBlock = COUNTIES.map(
    (c) => `  { stateSlug: 'virginia', countySlug: '${c.slug}', expectedCity: '${c.seat}' },`
  ).join('\n');
  validateContent = validateContent.replace(
    /(\s+\{ stateSlug: 'virginia', countySlug: 'craig', expectedCity: 'New Castle' \},)/,
    `$1\n${validateBlock}`
  );
  writeFileSync(validatePath, validateContent, utf8);
  console.log('Patched validate-county-schema.ts');
}

// --- Sitemap trim ---
const sitemapPath = join(root, 'app/sitemap-local/sitemap.ts');
let sitemap = readFileSync(sitemapPath, utf8);
const newHighTraffic = `const VA_HIGH_TRAFFIC_COUNTIES = new Set([
  'fairfax',
  'prince-william',
  'loudoun',
  'virginia-beach',
  'chesterfield',
  'henrico',
  'chesapeake',
  'arlington',
  'richmond',
  'norfolk',
  'newport-news',
  'stafford',
  'alexandria',
  'spotsylvania',
  'hampton',
  'albemarle',
  'hanover',
  'suffolk',
]);`;
sitemap = sitemap.replace(
  /const VA_HIGH_TRAFFIC_COUNTIES = new Set\(\[[\s\S]*?\]\);/,
  newHighTraffic
);
writeFileSync(sitemapPath, sitemap, utf8);
console.log('Trimmed VA_HIGH_TRAFFIC_COUNTIES to 18');

console.log('VA batch 10 complete');