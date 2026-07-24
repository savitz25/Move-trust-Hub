/**
 * Generate Ohio Tier-1 Core 12 intelligence packs.
 * Run: npx tsx scripts/generate-oh-tier1-packs.ts
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

type Zone = {
  id: string;
  name: string;
  short: string;
  hoods: string[];
  housing: string;
  challenges: string[];
  tips: string;
  keywords: string[];
};

type Spec = {
  slug: string;
  exportName: string;
  hub: string;
  eyebrow: string;
  h1: string;
  opener: string;
  corridors: string;
  differentIntro: string;
  differentBullets: Array<{ t: string; d: string }>;
  zonesHeading: string;
  zonesIntro: string;
  zones: Zone[];
  costIntro: string;
  costDrivers: Array<{ t: string; d: string }>;
  ranges: Array<{ l: string; v: string; n: string }>;
  seasonalIntro: string;
  seasonal: Array<{ t: string; d: string }>;
  specializedId: string;
  specializedTitle: string;
  specializedIntro: string;
  specializedBullets: string[];
  schools: Array<{ t: string; d: string }>;
  hospitals: Array<{ t: string; d: string }>;
  housing: Array<{ t: string; d: string }>;
  townFit: Array<{ t: string; d: string }>;
  jobs: Array<{ t: string; d: string }>;
  lifestyle: Array<{ t: string; d: string }>;
  resources: Array<{ l: string; h: string; n?: string }>;
  directoryHint: string;
};

const j = (v: unknown) => JSON.stringify(v);

function render(p: Spec): string {
  const label = p.hub.replace(' Moving Intelligence Hub', '');
  const bullets = p.differentBullets
    .map((b) => `      {\n        title: ${j(b.t)},\n        detail: ${j(b.d)},\n      }`)
    .join(',\n');
  const zones = p.zones
    .map(
      (z) => `    {
      id: ${j(z.id)},
      name: ${j(z.name)},
      shortName: ${j(z.short)},
      neighborhoods: ${j(z.hoods)},
      housingTypes: ${j(z.housing)},
      challenges: ${j(z.challenges)},
      moverTips: ${j(z.tips)},
      cityKeywords: ${j(z.keywords)},
    }`
    )
    .join(',\n');
  const drivers = p.costDrivers
    .map((d) => `      { title: ${j(d.t)}, detail: ${j(d.d)} }`)
    .join(',\n');
  const ranges = p.ranges
    .map((r) => `      { label: ${j(r.l)}, value: ${j(r.v)}, note: ${j(r.n)} }`)
    .join(',\n');
  const seasonal = p.seasonal
    .map((s) => `      { title: ${j(s.t)}, detail: ${j(s.d)} }`)
    .join(',\n');
  const rel = (id: string, title: string, items: Array<{ t: string; d: string }>) => `      {
        id: ${j(id)},
        title: ${j(title)},
        bullets: [
${items.map((i) => `          { title: ${j(i.t)}, detail: ${j(i.d)} }`).join(',\n')}
        ],
      }`;
  const res = p.resources
    .map(
      (r) =>
        `      { label: ${j(r.l)}, href: ${j(r.h)}, external: true${r.n ? `, note: ${j(r.n)}` : ''} }`
    )
    .join(',\n');

  return `import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeOhPack } from '@/lib/local-movers/county-intelligence/ohio/oh-shared';

export const ${p.exportName}: CountyIntelligencePack = finalizeOhPack({
  countySlug: ${j(p.slug)},
  hubTitle: ${j(p.hub)},
  eyebrow: ${j(p.eyebrow)},
  h1: ${j(p.h1)},
  heroOpener: ${j(p.opener)},
  heroCredibility:
    'PUCO household goods authority for intrastate OH moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: ${j(p.corridors)},
  whatMakesDifferent: {
    title: ${j(`What makes moving in ${label} different`)},
    intro: ${j(p.differentIntro)},
    bullets: [
${bullets},
      {
        title: 'Intrastate OH rules vs interstate authority',
        detail:
          'Moves entirely within Ohio are generally subject to Public Utilities Commission of Ohio (PUCO) household goods authority. Interstate legs need active FMCSA USDOT (and usually MC).',
      },
    ],
  },
  zonesHeading: ${j(p.zonesHeading)},
  zonesIntro: ${j(p.zonesIntro)},
  zones: [
${zones}
  ],
  costDrivers: {
    title: ${j(`What drives ${label} moving costs`)},
    intro: ${j(p.costIntro)},
    drivers: [
${drivers}
    ],
    ranges: [
${ranges}
    ],
  },
  seasonal: {
    title: ${j(`When to schedule a move in ${label}`)},
    intro: ${j(p.seasonalIntro)},
    items: [
${seasonal}
    ],
  },
  specialized: [
    {
      id: ${j(p.specializedId)},
      title: ${j(p.specializedTitle)},
      intro: ${j(p.specializedIntro)},
      bullets: ${j(p.specializedBullets)},
    },
  ],
  relocation: {
    title: ${j(`Considering a move to ${label}?`)},
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
${rel('schools', 'Schools & education landscape', p.schools)},
${rel('hospitals', 'Hospitals & healthcare access', p.hospitals)},
${rel('housing', 'Housing character & cost pressures', p.housing)},
${rel('town-fit', 'Which areas fit whom', p.townFit)},
${rel('jobs', 'Jobs & commute patterns', p.jobs)},
${rel('lifestyle', 'Lifestyle & practical livability', p.lifestyle)},
    ],
  },
  resources: {
    title: ${j(`Useful ${label} resources`)},
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify PUCO household goods authority for in-state moves and FMCSA for interstate legs.',
    items: [
${res}
    ],
  },
  directoryHint: ${j(p.directoryHint)},
  lastReviewed: '2026-07-24',
});
`;
}

const counties: Spec[] = [
  {
    slug: 'franklin',
    exportName: 'franklinCountyOhIntelligence',
    hub: 'Franklin County Moving Intelligence Hub',
    eyebrow: 'Franklin · Columbus core, Short North, German Village & I-270 ring',
    h1: 'Moving in Franklin County: Columbus Core, Short North Access & I-270 Logistics',
    opener:
      'Franklin County is Columbus’s metro engine: Short North and German Village curb friction, downtown and Arena District elevators, University District lease waves, and I-270/I-70/I-71 portal time that is not Cleveland lake-effect logistics and not Cincinnati hillside stairs. A Short North condo, a German Village brick rowhouse, a Dublin HOA two-story, and a Reynoldsburg multi-family unit do not share truck access or empty-mile risk. This hub is for Franklin — not a northeast-Ohio clone or renamed Cincinnati page.',
    corridors: 'I-70 · I-71 · I-270 · I-670 · US-23 · US-33',
    differentIntro:
      'These are Columbus realities — Short North curb limits, German Village brick stock, OSU lease pulses, and I-270 ring logistics — not Cleveland lakefront or Cincinnati hills.',
    differentBullets: [
      { t: 'Short North and near-core curb limits rewrite labor hours', d: 'Limited legal truck length, long carries, and event-day staging define many downtown-adjacent jobs.' },
      { t: 'German Village and older brick stock mix stairs and tight alleys', d: 'Access photos beat verbal promises on historic blocks.' },
      { t: 'I-270 / I-70 / I-71 define portal-to-portal time', d: 'Cross-metro pairs look local on maps and regional at peak.' },
      { t: 'University District and multi-family lease waves cluster crews', d: 'May/August and month-end turns fill elevators first.' },
      { t: 'Outer-ring HOA product is not Short North product', d: 'Dublin, New Albany, and Hilliard access rules differ from German Village alleys — survey each address.' },
    ],
    zonesHeading: 'Franklin access zones',
    zonesIntro: 'Plan by downtown/Short North, German Village/near-south, University District, and outer I-270 suburbs.',
    zones: [
      { id: 'downtown-short-north', name: 'Downtown, Arena District & Short North', short: 'Downtown / Short North', hoods: ['Downtown Columbus', 'Short North', 'Arena District', 'Victorian Village edges', 'Italian Village edges'], housing: 'High-rises, mid-rises, condos, renovated multi-unit', challenges: ['Elevators and COI', 'Scarce curb staging', 'Event-day congestion'], tips: 'Get building packets early. Prefer mid-week morning freight windows. Avoid festival peaks when flexible.', keywords: ['columbus', 'short north', 'downtown', 'arena district'] },
      { id: 'german-village', name: 'German Village & near-south brick stock', short: 'German Village', hoods: ['German Village', 'Schumacher Place', 'Merion Village edges', 'Brewery District edges'], housing: 'Brick rowhouses, twins, older SFH, limited multi-family', challenges: ['Tight alleys and streets', 'Stairs and long carries', 'Limited truck length'], tips: 'Photo alley width and curb. Prefer smaller trucks when required.', keywords: ['german village', 'brewery district', 'merion village'] },
      { id: 'university-district', name: 'University District & campus multi-family', short: 'University District', hoods: ['University District', 'OSU campus edges', 'Clintonville edges', 'High Street multi-family'], housing: 'Student multi-family, older SFH, mid-rises', challenges: ['Lease-end waves', 'Mixed elevators and stairs', 'I-71 / High Street congestion'], tips: 'Book academic peaks early. Confirm unit access type.', keywords: ['university district', 'osu', 'clintonville'] },
      { id: 'i270-outer', name: 'I-270 outer suburbs & HOA growth', short: 'I-270 outer ring', hoods: ['Dublin', 'Hilliard', 'New Albany edges', 'Reynoldsburg', 'Westerville edges', 'Grove City edges'], housing: 'HOA SFH, multi-family, townhomes', challenges: ['HOA rules', 'I-270 congestion', 'Long portal time to core jobs'], tips: 'Collect HOA packets. Price outer-ring pairs portal-to-portal.', keywords: ['dublin', 'hilliard', 'new albany', 'westerville', 'reynoldsburg'] },
    ],
    costIntro: 'Core curb/elevator access and I-270 ring portal time drive quotes more than square footage alone.',
    costDrivers: [
      { t: 'Short North / downtown elevator & curb friction', d: 'Labor and wait time dominate core jobs.' },
      { t: 'German Village alley long carries', d: 'Tight streets raise labor hours.' },
      { t: 'I-270 / I-70 / I-71 congestion', d: 'Portal-to-portal spikes at peak.' },
      { t: 'Outer-ring HOA soft costs', d: 'Gate lists push demand into peak windows.' },
    ],
    ranges: [
      { l: 'Studio / 1BR (simple access)', v: '$450–$1,400+', n: 'Higher with elevators or tight alleys' },
      { l: '2–3BR condo or modest SFH', v: '$1,400–$3,900+', n: 'Core curb friction trends up' },
      { l: '3–4+ BR / tower / cross-metro', v: '$2,600–$7,500+', n: 'Downtown towers and long I-270 pairs highest' },
      { l: 'Typical 2-person crew rate', v: '$110–$185+/hr', n: 'Portal-to-portal' },
    ],
    seasonalIntro: 'OSU calendars, multi-family lease turns, heat/humidity, and winter ice reshape access.',
    seasonal: [
      { t: 'Best windows: mid-week early mornings', d: 'Clear curb and reduce I-270/I-71 pain.' },
      { t: 'Peak family season: late May–mid-August', d: 'Book suburban Saturdays early.' },
      { t: 'University lease waves', d: 'May/August clusters near University District multi-family.' },
      { t: 'Winter ice and snow', d: 'Confirm contingency for driveway and alley access.' },
    ],
    specializedId: 'columbus-short-north-german-village',
    specializedTitle: 'Columbus Short North, German Village & I-270 module',
    specializedIntro: 'Franklin estimates fail when curb width, building packets, or I-270 empty miles are ignored.',
    specializedBullets: [
      'Request downtown/Short North building packets at lease signing or escrow.',
      'Survey alley width and truck length for German Village blocks.',
      'Price I-270/I-70/I-71 pairs portal-to-portal.',
      'Clarify Franklin vs Delaware/Licking/Fairfield destinations.',
      'Verify PUCO authority for in-state-only jobs and FMCSA for interstate legs.',
    ],
    schools: [
      { t: 'How districts work here', d: 'Columbus City Schools and numerous suburban districts (Dublin, Hilliard, Westerville, New Albany, and others) serve different addresses. Confirm zoning carefully.' },
      { t: 'Research sources', d: 'District tools, Ohio Department of Education data, and campus visits beat ranking screenshots.' },
    ],
    hospitals: [
      { t: 'Major systems', d: 'OhioHealth, Ohio State Wexner Medical Center, Nationwide Children’s, and Mount Carmel serve county corridors. Confirm networks.' },
      { t: 'What relocators should do', d: 'Map peak-hour drive times from outer I-270 suburbs into core specialty care. Transfer records early.' },
    ],
    housing: [
      { t: 'Core brick/condo vs outer HOA stock', d: 'Short North and German Village product differs sharply from Dublin/New Albany HOA two-stories.' },
      { t: 'Cost variation', d: 'Near-core renovated stock often prices differently from far-ring multi-family.' },
    ],
    townFit: [
      { t: 'Short North / downtown lifestyle', d: 'Walkable amenities with elevator and curb tradeoffs.' },
      { t: 'German Village pattern', d: 'Historic brick density with alley logistics.' },
      { t: 'I-270 outer-ring pattern', d: 'HOA product with longer portal time to core jobs.' },
    ],
    jobs: [
      { t: 'Employment anchors', d: 'State government, OSU, healthcare, insurance, logistics, and tech/professional services shape employment.' },
      { t: 'Commute realism', d: 'I-270, I-70, and I-71 peaks are real. Test drive peak routes across the ring.' },
    ],
    lifestyle: [
      { t: 'Central-Ohio identity', d: 'Franklin is Columbus metro — not Cleveland lake-effect winters or Cincinnati hillside stairs as the default product.' },
      { t: 'Climate', d: 'Hot humid summers and winter ice/snow. Plan outdoor staging contingency.' },
    ],
    resources: [
      { l: 'Franklin County — official site', h: 'https://www.franklincountyohio.gov/' },
      { l: 'City of Columbus', h: 'https://www.columbus.gov/' },
      { l: 'OHGO traffic (ODOT)', h: 'https://ohgo.com/' },
    ],
    directoryHint:
      'Prefer Short North elevator/curb experience and German Village alley surveys; honest I-270 pricing. Verify PUCO in-state and FMCSA interstate.',
  },
  {
    slug: 'cuyahoga',
    exportName: 'cuyahogaCountyOhIntelligence',
    hub: 'Cuyahoga County Moving Intelligence Hub',
    eyebrow: 'Cuyahoga · Cleveland core, lake-effect winter & east/west split',
    h1: 'Moving in Cuyahoga County: Cleveland Core, Lake-Effect Winter & East/West Logistics',
    opener:
      'Cuyahoga County is Cleveland’s lake-effect market: downtown elevators, east-side and west-side neighborhood micro-markets that are not interchangeable, Shoreway and I-90/I-480 portal time, and winter snow that rewrites driveway and curb risk. A downtown condo, a Lakewood multi-family unit, a Shaker Heights twin, and a Parma ranch do not share truck access or empty-mile risk. This hub is for Cuyahoga — not an Akron clone and not Columbus I-270 copy.',
    corridors: 'I-90 · I-71 · I-77 · I-480 · SR-2 · Shoreway links',
    differentIntro:
      'These are Cleveland realities — lake-effect snow, east/west neighborhood splits, and Shoreway logistics — not Columbus ring freeways or Cincinnati hills.',
    differentBullets: [
      { t: 'Lake-effect snow is an operational constraint', d: 'Winter storms compress productive outdoor hours and can force reschedules on grades and narrow streets.' },
      { t: 'East side and west side are different products', d: 'Do not price Lakewood like Shaker Heights or downtown towers like Parma SFH.' },
      { t: 'I-90 / I-71 / I-77 / I-480 rewrite portal-to-portal time', d: 'Cross-county pairs look local on maps and regional at peak.' },
      { t: 'Downtown and University Circle elevators make COI routine', d: 'Building packets and freight windows prevent day-of refusals.' },
      { t: 'Cuyahoga is not Summit or Lorain', d: 'Cleveland core logistics differ from Akron regional patterns and west-shore Lorain lake towns.' },
    ],
    zonesHeading: 'Cuyahoga access zones',
    zonesIntro: 'Plan by downtown/University Circle, west-side lakefront, east-side inner ring, and southern suburbs.',
    zones: [
      { id: 'downtown-uc', name: 'Downtown Cleveland & University Circle', short: 'Downtown / UC', hoods: ['Downtown', 'Warehouse District', 'University Circle', 'Ohio City edges', 'Tremont edges'], housing: 'High-rises, mid-rises, lofts, renovated multi-unit', challenges: ['Near-universal COI and elevators', 'Event-day curb pressure', 'Shoreway / I-90 congestion'], tips: 'Get building packets early. Prefer mid-week mornings. Avoid stadium and festival peaks when flexible.', keywords: ['cleveland', 'downtown', 'university circle', 'ohio city', 'tremont'] },
      { id: 'west-side', name: 'West-side lakefront & inner suburbs', short: 'West side', hoods: ['Lakewood', 'Rocky River edges', 'West Park', 'Edgewater corridors'], housing: 'Multi-family, twins, older SFH, some elevators', challenges: ['Tight streets', 'Lake-effect snow access', 'I-90 congestion'], tips: 'Photo curb and stairs. Build winter contingency language. Prefer early starts.', keywords: ['lakewood', 'rocky river', 'west park', 'edgewater'] },
      { id: 'east-side', name: 'East-side inner ring & heights', short: 'East side', hoods: ['Shaker Heights', 'Cleveland Heights', 'University Heights edges', 'East Cleveland edges'], housing: 'Twins, older SFH, multi-unit, some elevators', challenges: ['Hills and stairs', 'Tree-lined narrow streets', 'Winter access'], tips: 'Survey grade and curb. Prefer mid-week mornings after freeze events.', keywords: ['shaker heights', 'cleveland heights', 'university heights'] },
      { id: 'south-suburbs', name: 'Southern suburbs & I-480 corridors', short: 'South suburbs', hoods: ['Parma', 'Independence edges', 'Broadview Heights edges', 'I-480 multi-family'], housing: 'SFH, multi-family, townhomes, HOA pockets', challenges: ['I-480 / I-77 congestion', 'HOA rules in pockets', 'Long portal time to downtown'], tips: 'Collect HOA packets where applicable. Price south-corridor pairs honestly.', keywords: ['parma', 'independence', 'broadview heights', 'i-480'] },
    ],
    costIntro: 'Elevator/curb access, east/west micro-markets, and lake-effect winter risk drive quotes.',
    costDrivers: [
      { t: 'Downtown elevator / COI buildings', d: 'Labor and wait time dominate core jobs.' },
      { t: 'East/west access differences', d: 'Surveys must match the correct micro-market.' },
      { t: 'I-90 / I-480 / Shoreway congestion', d: 'Portal-to-portal spikes at peak.' },
      { t: 'Lake-effect winter contingency', d: 'Ice and snow can force reschedules.' },
    ],
    ranges: [
      { l: 'Studio / 1BR (simple access)', v: '$450–$1,350+', n: 'Higher with elevators or winter access risk' },
      { l: '2–3BR condo or modest SFH', v: '$1,350–$3,800+', n: 'Core curb friction trends up' },
      { l: '3–4+ BR / tower / cross-county', v: '$2,500–$7,200+', n: 'Downtown towers and long I-480 pairs highest' },
      { l: 'Typical 2-person crew rate', v: '$110–$180+/hr', n: 'Portal-to-portal' },
    ],
    seasonalIntro: 'Lake-effect winter, multi-family lease turns, and family seasons reshape access.',
    seasonal: [
      { t: 'Best windows: mid-week early mornings', d: 'Clear curb and reduce I-90/I-480 pain.' },
      { t: 'Peak family season: late May–mid-August', d: 'Book suburban Saturdays early.' },
      { t: 'Month-end multi-family turns', d: 'West-side and downtown multi-unit fill first.' },
      { t: 'Lake-effect snow season', d: 'Confirm contingency for driveway and hillside addresses November–March.' },
    ],
    specializedId: 'cleveland-lake-effect-east-west',
    specializedTitle: 'Cleveland lake-effect & east/west logistics module',
    specializedIntro: 'Cuyahoga estimates fail when east/west micro-markets or winter access are ignored.',
    specializedBullets: [
      'Request downtown building packets early.',
      'Treat east-side and west-side access as different products.',
      'Price I-90/I-71/I-77/I-480 pairs portal-to-portal.',
      'Write lake-effect weather contingency into winter estimates.',
      'Verify PUCO authority for in-state-only jobs and FMCSA for interstate legs.',
    ],
    schools: [
      { t: 'How districts work here', d: 'Cleveland Metropolitan School District and numerous suburban districts serve different addresses. Confirm zoning carefully.' },
      { t: 'Research sources', d: 'District tools, Ohio Department of Education data, and campus visits beat ranking screenshots.' },
    ],
    hospitals: [
      { t: 'Major systems', d: 'Cleveland Clinic, University Hospitals, MetroHealth, and other facilities serve county corridors. Confirm networks.' },
      { t: 'What relocators should do', d: 'Map peak-hour and weather-affected drive times from outer suburbs. Transfer records early.' },
    ],
    housing: [
      { t: 'East vs west stock patterns', d: 'West-side multi-family and lakefront product differs from east-side heights twins and southern SFH.' },
      { t: 'Winter access realities', d: 'Lake-effect snow changes move-day risk from late fall through early spring.' },
    ],
    townFit: [
      { t: 'Downtown / University Circle lifestyle', d: 'Walkable amenities with elevator tradeoffs.' },
      { t: 'West-side lakefront pattern', d: 'Multi-family density with winter access logistics.' },
      { t: 'East-side heights pattern', d: 'Older stock and tree-lined streets with grade logistics.' },
    ],
    jobs: [
      { t: 'Employment anchors', d: 'Healthcare, manufacturing, professional services, education, and logistics shape employment.' },
      { t: 'Commute realism', d: 'I-90, I-480, and Shoreway peaks are real. Test drive peak routes east and west.' },
    ],
    lifestyle: [
      { t: 'Lake-effect identity', d: 'Cuyahoga is distinct from Columbus ring freeways and Akron regional fabric.' },
      { t: 'Climate', d: 'Meaningful lake-effect snow and humid summers. Plan staging contingency.' },
    ],
    resources: [
      { l: 'Cuyahoga County — official site', h: 'https://www.cuyahogacounty.us/' },
      { l: 'City of Cleveland', h: 'https://www.clevelandohio.gov/' },
      { l: 'OHGO traffic (ODOT)', h: 'https://ohgo.com/' },
    ],
    directoryHint:
      'Prefer east/west micro-market fluency and downtown elevator experience; honest lake-effect contingency. Verify PUCO in-state and FMCSA interstate.',
  },
  {
    slug: 'hamilton',
    exportName: 'hamiltonCountyOhIntelligence',
    hub: 'Hamilton County Moving Intelligence Hub',
    eyebrow: 'Hamilton · Cincinnati hills/stairs, KY-adjacent & I-75/I-71 logistics',
    h1: 'Moving in Hamilton County: Cincinnati Hills, Stairs & I-75/I-71 Logistics',
    opener:
      'Hamilton County is Cincinnati’s hills-and-stairs market: steep driveways, multi-flight carries, river-adjacent curb limits, Kentucky-adjacent interstate pairs, and I-75/I-71 portal time that is not Columbus flat-ring logistics and not Cleveland lake-effect winters alone. An Over-the-Rhine condo, a Mount Adams hillside home, a Hyde Park twin, and a West Chester-edge (verify county) multi-family unit do not share truck access. This hub is for Hamilton County, Ohio — not Butler’s collar towns and not Kentucky destination defaults.',
    corridors: 'I-71 · I-75 · I-74 · I-275 · US-50 · Columbia Pkwy',
    differentIntro:
      'These are Cincinnati realities — hills, stairs, river approaches, and KY-adjacent authority lines — not Columbus I-270 product or Dayton Wright-Patt patterns.',
    differentBullets: [
      { t: 'Hills and stairs dominate labor hours', d: 'Long carries and multi-flight stairs beat map-mile quotes on many city neighborhoods.' },
      { t: 'Columbia Parkway and river approaches rewrite portal time', d: 'Short map miles become long clocks at peak.' },
      { t: 'Kentucky-adjacent pairs are routine', d: 'Clarify Ohio PUCO vs FMCSA for destinations across the river.' },
      { t: 'Neighborhood micro-markets are not interchangeable', d: 'OTR elevators differ from Hyde Park twins and western hillside SFH.' },
      { t: 'Hamilton County is not Butler or Warren', d: 'Urban Cincinnati hills differ from west/north collar HOA product and Mason/Lebanon growth.' },
    ],
    zonesHeading: 'Hamilton access zones',
    zonesIntro: 'Plan by downtown/OTR, hillside neighborhoods, eastern suburbs, and western corridors.',
    zones: [
      { id: 'downtown-otr', name: 'Downtown Cincinnati & Over-the-Rhine', short: 'Downtown / OTR', hoods: ['Downtown', 'Over-the-Rhine', 'The Banks edges', 'West End edges'], housing: 'High-rises, mid-rises, renovated multi-unit, lofts', challenges: ['Elevators and COI', 'Scarce curb staging', 'Event-day congestion'], tips: 'Get building packets early. Prefer mid-week morning freight windows.', keywords: ['cincinnati', 'downtown', 'over-the-rhine', 'otr'] },
      { id: 'hillsides', name: 'Hillside neighborhoods & stairs', short: 'Hillsides', hoods: ['Mount Adams', 'Mount Lookout edges', 'Price Hill', 'Columbia-Tusculum edges'], housing: 'Hillside SFH, multi-unit, older stock', challenges: ['Steep grades', 'Multi-flight stairs', 'Limited truck staging'], tips: 'Survey driveway grade and stair counts. Prefer smaller trucks when needed.', keywords: ['mount adams', 'price hill', 'mount lookout', 'hillsides'] },
      { id: 'east-side', name: 'Eastern suburbs & Hyde Park corridors', short: 'East side', hoods: ['Hyde Park', 'Oakley', 'Mariemont edges', 'Madisonville edges'], housing: 'Twins, older SFH, multi-family, some elevators', challenges: ['Tight streets', 'Mixed access types', 'I-71 congestion'], tips: 'Photo curb. Confirm unit access type. Build I-71 buffer.', keywords: ['hyde park', 'oakley', 'mariemont'] },
      { id: 'west-corridors', name: 'Western corridors & I-74 approaches', short: 'West corridors', hoods: ['Westwood', 'Delhi edges', 'Cheviot edges', 'I-74 multi-family'], housing: 'SFH, multi-family, townhomes', challenges: ['Hills and stairs', 'I-74 / I-75 congestion', 'Long portal time to core'], tips: 'Survey grade. Prefer early starts for west-to-core pairs.', keywords: ['westwood', 'delhi', 'cheviot'] },
    ],
    costIntro: 'Hills, stairs, river approaches, and I-75/I-71 portal time drive quotes.',
    costDrivers: [
      { t: 'Hillside long carries and stairs', d: 'Labor hours rise when trucks cannot park at the door.' },
      { t: 'I-75 / I-71 / Columbia Pkwy congestion', d: 'Portal-to-portal spikes at peak.' },
      { t: 'Downtown elevator / COI buildings', d: 'Wait time adds cost.' },
      { t: 'Cross-river empty miles', d: 'Kentucky destinations change staging and authority assumptions.' },
    ],
    ranges: [
      { l: 'Studio / 1BR (simple access)', v: '$450–$1,400+', n: 'Higher with stairs or elevators' },
      { l: '2–3BR twin or modest SFH', v: '$1,400–$3,900+', n: 'Hills trend up' },
      { l: '3–4+ BR / hillside / cross-river', v: '$2,600–$7,500+', n: 'Steep access and KY pairs price highest' },
      { l: 'Typical 2-person crew rate', v: '$110–$185+/hr', n: 'Portal-to-portal' },
    ],
    seasonalIntro: 'Family seasons, multi-family lease turns, heat/humidity, and winter ice on grades reshape access.',
    seasonal: [
      { t: 'Best windows: mid-week early mornings', d: 'Reduce I-75/I-71 pain and clear curb.' },
      { t: 'Peak family season: late May–mid-August', d: 'Book suburban Saturdays early.' },
      { t: 'Month-end multi-family turns', d: 'OTR and east-side multi-unit fill first.' },
      { t: 'Winter ice on hills', d: 'Confirm contingency for hillside addresses.' },
    ],
    specializedId: 'cincinnati-hills-stairs-ky',
    specializedTitle: 'Cincinnati hills, stairs & KY-adjacent module',
    specializedIntro: 'Hamilton estimates fail when grade, stairs, or cross-river authority lines are ignored.',
    specializedBullets: [
      'Survey driveway grade and stair counts before final pricing.',
      'Price I-75/I-71/Columbia Pkwy pairs portal-to-portal.',
      'Clarify Ohio vs Kentucky destinations for PUCO vs FMCSA.',
      'Do not reuse Butler collar HOA assumptions for hillside city stock.',
      'Verify PUCO authority for in-state-only jobs and FMCSA for interstate legs.',
    ],
    schools: [
      { t: 'How districts work here', d: 'Cincinnati Public Schools and numerous suburban districts serve different addresses. Confirm zoning carefully.' },
      { t: 'Research sources', d: 'District tools, Ohio Department of Education data, and campus visits beat ranking screenshots.' },
    ],
    hospitals: [
      { t: 'Major systems', d: 'UC Health, TriHealth, Cincinnati Children’s, and other facilities serve county corridors. Confirm networks.' },
      { t: 'What relocators should do', d: 'Map peak-hour and hill-affected drive times. Transfer records early.' },
    ],
    housing: [
      { t: 'Hillside city stock vs eastern suburban product', d: 'Steep grades and older multi-unit dominate many city neighborhoods; eastern corridors show more twin/SFH mix.' },
      { t: 'River-adjacent cost variation', d: 'Near-core renovated product often prices differently from western hillside SFH.' },
    ],
    townFit: [
      { t: 'Downtown / OTR lifestyle', d: 'Walkable amenities with elevator and curb tradeoffs.' },
      { t: 'Hillside neighborhood pattern', d: 'Views and character with stair logistics.' },
      { t: 'Eastern suburb pattern', d: 'More twin/SFH stock with I-71 commute risk.' },
    ],
    jobs: [
      { t: 'Employment anchors', d: 'Healthcare, consumer brands, manufacturing, education, and professional services shape employment; many residents also cross into Kentucky jobs.' },
      { t: 'Commute realism', d: 'I-75, I-71, and river bridges are real bottlenecks. Test drive peak routes.' },
    ],
    lifestyle: [
      { t: 'Hills-and-river identity', d: 'Hamilton County is distinct from Butler collar towns and Columbus flat-ring logistics.' },
      { t: 'Climate', d: 'Hot humid summers and winter ice on grades. Plan staging contingency.' },
    ],
    resources: [
      { l: 'Hamilton County, OH — official site', h: 'https://www.hamiltoncountyohio.gov/' },
      { l: 'City of Cincinnati', h: 'https://www.cincinnati-oh.gov/' },
      { l: 'OHGO traffic (ODOT)', h: 'https://ohgo.com/' },
    ],
    directoryHint:
      'Prefer hillside/stair experience and downtown elevator fluency; honest I-75/I-71 and KY-pair pricing. Verify PUCO in-state and FMCSA interstate.',
  },
  {
    slug: 'summit',
    exportName: 'summitCountyOhIntelligence',
    hub: 'Summit County Moving Intelligence Hub',
    eyebrow: 'Summit · Akron regional market (not a Cleveland clone)',
    h1: 'Moving in Summit County: Akron Access, Township Runs & I-77/I-76 Logistics',
    opener:
      'Summit County is an Akron-centered regional market: city multi-unit and older stock, Cuyahoga Falls and Stow corridors, suburban multi-family along SR-8, and I-76/I-77 logistics that are not Cleveland lake-effect defaults and not Canton/Stark industrial copy. An Akron multi-family unit, a Hudson HOA two-story, a Cuyahoga Falls twin, and a rural-edge lot do not share truck access or portal time. This hub is for Summit — not a renamed Cuyahoga page.',
    corridors: 'I-76 · I-77 · I-271 · SR-8 · SR-18 · Cleveland-Massillon Rd',
    differentIntro:
      'Akron regional city-and-suburb fabric — not Cleveland Shoreway logistics or Canton/Stark industrial corridors as the default product.',
    differentBullets: [
      { t: 'Akron multi-unit differs from northern suburban HOA product', d: 'Access surveys matter more than “northeast Ohio” labels.' },
      { t: 'I-76 / I-77 / SR-8 define portal time', d: 'Cross-county pairs burn clock at peak.' },
      { t: 'Cleveland-linked pairs are regional, not city local', d: 'Keep county lines clear for drive time and authority assumptions.' },
      { t: 'Hills and older stock appear in city corridors', d: 'Stairs and curb limits raise labor hours.' },
      { t: 'Summit is not Cuyahoga or Stark', d: 'Do not reuse Cleveland east/west or Canton assumptions here.' },
    ],
    zonesHeading: 'Summit access zones',
    zonesIntro: 'Plan by Akron city, Cuyahoga Falls/SR-8, northern suburbs, and southern/western corridors.',
    zones: [
      { id: 'akron-city', name: 'Akron city multi-unit & older stock', short: 'Akron city', hoods: ['Downtown Akron', 'Highland Square edges', 'City multi-family', 'Older SFH pockets'], housing: 'Multi-family, twins, older SFH', challenges: ['Tight streets', 'Mixed stairs and elevators', 'Arterial congestion'], tips: 'Photo curb. Confirm unit access type. Prefer mid-week mornings.', keywords: ['akron', 'downtown akron', 'highland square'] },
      { id: 'falls-sr8', name: 'Cuyahoga Falls & SR-8 corridors', short: 'Falls / SR-8', hoods: ['Cuyahoga Falls', 'Silver Lake edges', 'SR-8 multi-family'], housing: 'Multi-family, SFH, townhomes', challenges: ['SR-8 congestion', 'Mixed access types', 'Long portal time to Akron core'], tips: 'Build SR-8 buffer. Confirm elevator reservations when applicable.', keywords: ['cuyahoga falls', 'silver lake', 'sr-8'] },
      { id: 'north-suburbs', name: 'Northern suburbs & HOA growth', short: 'North suburbs', hoods: ['Hudson', 'Stow', 'Twinsburg edges', 'HOA villages'], housing: 'HOA SFH, multi-family, townhomes', challenges: ['HOA rules', 'I-271 / SR-8 congestion', 'Long portal time to Akron or Cleveland'], tips: 'Collect HOA packets. Price long north-county pairs honestly.', keywords: ['hudson', 'stow', 'twinsburg'] },
      { id: 'south-west', name: 'Southern & western corridors', short: 'South / west', hoods: ['Barberton edges', 'Norton edges', 'Cleveland-Massillon Rd corridors', 'Green edges'], housing: 'SFH, multi-family, rural-edge lots', challenges: ['Long empty miles', 'I-76 / I-77 congestion', 'Varied driveway access'], tips: 'Survey driveway access. Prefer early starts for long pairs.', keywords: ['barberton', 'norton', 'green', 'fairlawn edges'] },
    ],
    costIntro: 'City multi-unit access and regional freeway portal time drive quotes.',
    costDrivers: [
      { t: 'Akron multi-unit stairs and curb friction', d: 'Labor hours rise without elevators.' },
      { t: 'I-76 / I-77 / SR-8 congestion', d: 'Portal-to-portal spikes at peak.' },
      { t: 'Northern HOA soft costs', d: 'Gate lists push demand into peak windows.' },
      { t: 'Cleveland-linked empty miles', d: 'Cross-county pairs raise staging distance.' },
    ],
    ranges: [
      { l: 'Studio / 1BR (simple access)', v: '$400–$1,250+', n: 'Higher with stairs or elevators' },
      { l: '2–3BR condo or modest SFH', v: '$1,250–$3,500+', n: 'Regional pairs trend up' },
      { l: '3–4+ BR / long regional', v: '$2,300–$6,500+', n: 'Cross-county pairs price highest' },
      { l: 'Typical 2-person crew rate', v: '$100–$170+/hr', n: 'Portal-to-portal' },
    ],
    seasonalIntro: 'Family seasons, multi-family lease turns, and winter ice/snow reshape access.',
    seasonal: [
      { t: 'Best windows: mid-week early mornings', d: 'Reduce SR-8/I-77 pain.' },
      { t: 'Peak family season: late May–mid-August', d: 'Book suburban Saturdays early.' },
      { t: 'Month-end multi-family turns', d: 'Akron and Falls multi-unit fill first.' },
      { t: 'Winter ice and snow', d: 'Confirm contingency for driveway and hillside access.' },
    ],
    specializedId: 'akron-regional-not-cleveland',
    specializedTitle: 'Akron regional (not Cleveland) logistics module',
    specializedIntro: 'Summit estimates fail when Akron is treated as a Cleveland suburb clone.',
    specializedBullets: [
      'Survey Akron multi-unit access carefully — not Cleveland Shoreway defaults.',
      'Price I-76/I-77/SR-8 pairs portal-to-portal.',
      'Collect HOA packets for Hudson/Stow growth product.',
      'Clarify Summit vs Cuyahoga/Stark destinations.',
      'Verify PUCO authority for in-state-only jobs and FMCSA for interstate legs.',
    ],
    schools: [
      { t: 'How districts work here', d: 'Akron Public Schools and numerous suburban districts (Hudson, Stow-Munroe Falls, Cuyahoga Falls, and others) serve different addresses. Confirm zoning carefully.' },
      { t: 'Research sources', d: 'District tools, Ohio Department of Education data, and campus visits beat ranking screenshots.' },
    ],
    hospitals: [
      { t: 'Major systems', d: 'Summa Health, Cleveland Clinic Akron General, and regional facilities serve residents. Confirm networks.' },
      { t: 'What relocators should do', d: 'Map peak-hour drive times from northern suburbs into Akron specialty care. Transfer records early.' },
    ],
    housing: [
      { t: 'City vs northern suburban stock', d: 'Older multi-unit in Akron; more HOA SFH in Hudson/Stow corridors.' },
      { t: 'Cost variation', d: 'Northern suburbs often price differently from southern/western edges.' },
    ],
    townFit: [
      { t: 'Akron city lifestyle', d: 'Multi-unit amenities with curb logistics.' },
      { t: 'Falls / SR-8 pattern', d: 'Corridor multi-family with arterial congestion.' },
      { t: 'Northern suburb pattern', d: 'HOA product with longer regional commute risk.' },
    ],
    jobs: [
      { t: 'Employment anchors', d: 'Healthcare, polymers/manufacturing, education, and logistics shape employment; some residents commute toward Cleveland.' },
      { t: 'Commute realism', d: 'I-77, I-76, and SR-8 peaks are real. Test drive peak routes.' },
    ],
    lifestyle: [
      { t: 'Akron regional identity', d: 'Summit complements the Cleveland metro without cloning Cuyahoga lake-effect micro-markets.' },
      { t: 'Climate', d: 'Four seasons with meaningful winter snow/ice. Plan staging contingency.' },
    ],
    resources: [
      { l: 'Summit County — official site', h: 'https://co.summitoh.net/' },
      { l: 'City of Akron', h: 'https://www.akronohio.gov/' },
      { l: 'OHGO traffic (ODOT)', h: 'https://ohgo.com/' },
    ],
    directoryHint:
      'Prefer Akron multi-unit experience and SR-8 honesty — not Cleveland clone pricing. Verify PUCO in-state and FMCSA interstate.',
  },
  {
    slug: 'montgomery',
    exportName: 'montgomeryCountyOhIntelligence',
    hub: 'Montgomery County Moving Intelligence Hub',
    eyebrow: 'Montgomery · Dayton core & Wright-Patt adjacency',
    h1: 'Moving in Montgomery County: Dayton Access, Wright-Patt Adjacency & I-75 Logistics',
    opener:
      'Montgomery County is Dayton’s metro core: downtown and near-core multi-unit, suburban rings toward Kettering and Beavercreek edges, Wright-Patterson Air Force Base adjacency that pulses housing demand, and I-75/I-70 logistics that are not Cincinnati hillside stairs and not Columbus I-270 product. A downtown Dayton loft, an Oakwood twin, a Huber Heights multi-family unit, and a rural-edge lot do not share truck access. This hub is for Montgomery County, Ohio — not Pennsylvania Montgomery and not Butler Cincinnati collar.',
    corridors: 'I-70 · I-75 · US-35 · SR-4 · SR-48 · Needmore Rd corridors',
    differentIntro:
      'Dayton metro and Wright-Patt adjacency — not Cincinnati hills or Columbus ring freeways as the default product.',
    differentBullets: [
      { t: 'Wright-Patt adjacency reshapes housing demand pulses', d: 'PCS and base-related moves cluster crews outside pure civilian lease calendars.' },
      { t: 'I-75 / I-70 / US-35 define portal time', d: 'Cross-metro pairs burn clock at peak.' },
      { t: 'Dayton multi-unit differs from southern suburban HOA product', d: 'Access surveys matter more than county-wide rates.' },
      { t: 'Needmore Rd and SR-4 corridors change staging', d: 'Arterial congestion differs from pure freeway-only pricing.' },
      { t: 'Montgomery OH is not Cincinnati or Columbus', d: 'Do not reuse Hamilton hills or Franklin I-270 assumptions here.' },
    ],
    zonesHeading: 'Montgomery access zones',
    zonesIntro: 'Plan by Dayton core, southern suburbs, northern I-75 corridors, and eastern Wright-Patt approaches.',
    zones: [
      { id: 'dayton-core', name: 'Dayton core multi-unit & older stock', short: 'Dayton core', hoods: ['Downtown Dayton', 'Oregon District edges', 'City multi-family', 'Older SFH pockets'], housing: 'Multi-family, lofts, older SFH', challenges: ['Tight streets', 'Mixed stairs and elevators', 'US-35 congestion'], tips: 'Photo curb. Confirm unit access type. Prefer mid-week mornings.', keywords: ['dayton', 'downtown dayton', 'oregon district'] },
      { id: 'south-suburbs', name: 'Southern suburbs & Oakwood/Kettering', short: 'South suburbs', hoods: ['Kettering', 'Oakwood', 'Centerville edges', 'Miamisburg edges'], housing: 'SFH, twins, multi-family, HOA pockets', challenges: ['HOA rules in pockets', 'SR-48 congestion', 'Mixed access types'], tips: 'Collect HOA packets where applicable. Prefer early starts.', keywords: ['kettering', 'oakwood', 'centerville', 'miamisburg'] },
      { id: 'north-i75', name: 'Northern I-75 corridors', short: 'North I-75', hoods: ['Huber Heights', 'Vandalia edges', 'Englewood edges', 'I-75 multi-family'], housing: 'Multi-family, SFH, townhomes', challenges: ['I-75 congestion', 'Lease-end waves', 'Long portal time to core'], tips: 'Build I-75 buffer. Confirm elevator reservations.', keywords: ['huber heights', 'vandalia', 'englewood'] },
      { id: 'wright-patt-east', name: 'Eastern approaches toward Wright-Patt', short: 'Wright-Patt east', hoods: ['Riverside', 'Fairborn edges (verify county)', 'Needmore Rd corridors', 'Base-adjacent multi-family'], housing: 'Multi-family, SFH, townhomes', challenges: ['Base-related demand pulses', 'Arterial congestion', 'Cross-county confusion with Greene'], tips: 'Clarify Montgomery vs Greene addresses. Ask about PCS timing windows.', keywords: ['riverside', 'needmore', 'wright-patt', 'fairborn edges'] },
    ],
    costIntro: 'I-75 portal time, multi-unit access, and base-adjacent demand pulses drive quotes.',
    costDrivers: [
      { t: 'I-75 / I-70 / US-35 congestion', d: 'Portal-to-portal spikes at peak.' },
      { t: 'Dayton multi-unit access', d: 'Stairs and elevators raise labor hours.' },
      { t: 'Wright-Patt demand clustering', d: 'PCS windows fill crews faster than average civilian months.' },
      { t: 'Suburban HOA soft costs', d: 'Gate lists push demand into peak windows.' },
    ],
    ranges: [
      { l: 'Studio / 1BR (simple access)', v: '$400–$1,250+', n: 'Higher with elevators' },
      { l: '2–3BR condo or modest SFH', v: '$1,250–$3,500+', n: 'I-75 pairs trend up' },
      { l: '3–4+ BR / long regional / PCS peak', v: '$2,300–$6,500+', n: 'Base-season peaks price highest' },
      { l: 'Typical 2-person crew rate', v: '$100–$170+/hr', n: 'Portal-to-portal' },
    ],
    seasonalIntro: 'Family seasons, multi-family turns, and military PCS windows reshape access.',
    seasonal: [
      { t: 'Best windows: mid-week early mornings', d: 'Reduce I-75/US-35 pain.' },
      { t: 'Peak family season: late May–mid-August', d: 'Book suburban Saturdays early.' },
      { t: 'PCS / base-related peaks', d: 'Late spring–summer military moves cluster crews near eastern corridors.' },
      { t: 'Winter ice and snow', d: 'Confirm contingency for driveway access.' },
    ],
    specializedId: 'dayton-wright-patt',
    specializedTitle: 'Dayton & Wright-Patt adjacency module',
    specializedIntro: 'Montgomery estimates fail when I-75 empty miles or base-related demand pulses are ignored.',
    specializedBullets: [
      'Price I-75/I-70/US-35 pairs portal-to-portal.',
      'Ask about PCS timing for base-adjacent multi-family.',
      'Clarify Montgomery vs Greene destinations near Wright-Patt.',
      'Do not reuse Cincinnati hillside or Columbus I-270 assumptions here.',
      'Verify PUCO authority for in-state-only jobs and FMCSA for interstate legs.',
    ],
    schools: [
      { t: 'How districts work here', d: 'Dayton Public Schools and numerous suburban districts (Kettering, Centerville, Huber Heights, and others) serve different addresses. Confirm zoning carefully.' },
      { t: 'Research sources', d: 'District tools, Ohio Department of Education data, and campus visits beat ranking screenshots.' },
    ],
    hospitals: [
      { t: 'Major systems', d: 'Premier Health, Kettering Health, Dayton VA, and regional facilities serve residents. Confirm networks.' },
      { t: 'What relocators should do', d: 'Map peak-hour drive times from northern and eastern corridors. Transfer records early.' },
    ],
    housing: [
      { t: 'Core multi-unit vs southern suburban stock', d: 'Downtown and near-core product differs from Kettering/Centerville SFH and base-adjacent multi-family.' },
      { t: 'Cost variation', d: 'Southern suburbs often price differently from northern I-75 multi-family.' },
    ],
    townFit: [
      { t: 'Dayton core lifestyle', d: 'Multi-unit amenities with curb logistics.' },
      { t: 'Southern suburb pattern', d: 'Family SFH with arterial congestion.' },
      { t: 'Wright-Patt adjacent pattern', d: 'Base-linked housing with PCS-season move logistics.' },
    ],
    jobs: [
      { t: 'Employment anchors', d: 'Wright-Patterson and defense contracting, healthcare, manufacturing, education, and logistics shape employment.' },
      { t: 'Commute realism', d: 'I-75 and US-35 peaks are real. Test drive peak routes.' },
    ],
    lifestyle: [
      { t: 'Dayton metro identity', d: 'Montgomery is distinct from Cincinnati hills and Columbus ring freeways.' },
      { t: 'Climate', d: 'Hot humid summers and winter ice/snow. Plan staging contingency.' },
    ],
    resources: [
      { l: 'Montgomery County, OH — official site', h: 'https://www.mcohio.org/' },
      { l: 'City of Dayton', h: 'https://www.daytonohio.gov/' },
      { l: 'OHGO traffic (ODOT)', h: 'https://ohgo.com/' },
    ],
    directoryHint:
      'Prefer Dayton multi-unit experience and Wright-Patt PCS-season honesty; clear I-75 pricing. Verify PUCO in-state and FMCSA interstate.',
  },
  {
    slug: 'lucas',
    exportName: 'lucasCountyOhIntelligence',
    hub: 'Lucas County Moving Intelligence Hub',
    eyebrow: 'Lucas · Toledo core, Michigan border & I-75 logistics',
    h1: 'Moving in Lucas County: Toledo Access, MI Border Pairs & I-75 Logistics',
    opener:
      'Lucas County is Toledo’s lake-plain market: downtown and near-core multi-unit, west and south suburban rings, Michigan-border interstate pairs, and I-75/I-280/I-475 logistics that are not Cleveland Shoreway defaults and not Columbus I-270 copy. A downtown Toledo loft, an Ottawa Hills twin, a Sylvania multi-family unit, and a Maumee ranch do not share truck access or empty-mile risk. This hub is for Lucas — not a renamed Cuyahoga page.',
    corridors: 'I-75 · I-280 · I-475 · US-23 · SR-2 · Anthony Wayne Trail',
    differentIntro:
      'Toledo metro and Michigan-border adjacency — not Cleveland east/west lake-effect product or Dayton Wright-Patt patterns.',
    differentBullets: [
      { t: 'Michigan-border pairs are routine', d: 'Clarify Ohio PUCO vs FMCSA for destinations across the state line.' },
      { t: 'I-75 / I-280 / I-475 define portal time', d: 'Cross-metro pairs burn clock at peak.' },
      { t: 'Toledo multi-unit differs from western suburban HOA product', d: 'Access surveys matter more than county-wide rates.' },
      { t: 'Anthony Wayne Trail and SR-2 corridors change staging', d: 'Arterial congestion differs from pure freeway-only pricing.' },
      { t: 'Lucas is not Cuyahoga or Franklin', d: 'Do not reuse Cleveland Shoreway or Columbus ring assumptions here.' },
    ],
    zonesHeading: 'Lucas access zones',
    zonesIntro: 'Plan by Toledo core, western suburbs, southern Maumee corridors, and east-side industrial-adjacent edges.',
    zones: [
      { id: 'toledo-core', name: 'Toledo core multi-unit & older stock', short: 'Toledo core', hoods: ['Downtown Toledo', 'Warehouse District edges', 'Old West End edges', 'City multi-family'], housing: 'Multi-family, lofts, older SFH', challenges: ['Tight streets', 'Mixed stairs and elevators', 'I-75 approach congestion'], tips: 'Photo curb. Confirm unit access type. Prefer mid-week mornings.', keywords: ['toledo', 'downtown toledo', 'old west end'] },
      { id: 'west-suburbs', name: 'Western suburbs & Sylvania corridors', short: 'West suburbs', hoods: ['Sylvania', 'Ottawa Hills', 'West Toledo multi-family', 'HOA villages'], housing: 'HOA SFH, multi-family, townhomes, twins', challenges: ['HOA rules', 'US-23 / I-475 congestion', 'Long portal time to core'], tips: 'Collect HOA packets. Build freeway buffer.', keywords: ['sylvania', 'ottawa hills', 'west toledo'] },
      { id: 'south-maumee', name: 'Southern Maumee & Perrysburg-edge corridors', short: 'South / Maumee', hoods: ['Maumee', 'Perrysburg edges (verify county)', 'Anthony Wayne Trail multi-family'], housing: 'SFH, multi-family, townhomes', challenges: ['Cross-county confusion with Wood', 'I-75 congestion', 'Mixed access types'], tips: 'Clarify Lucas vs Wood addresses. Prefer early starts.', keywords: ['maumee', 'perrysburg edges', 'anthony wayne'] },
      { id: 'east-industrial', name: 'East-side industrial-adjacent residential', short: 'East side', hoods: ['East Toledo', 'Oregon edges', 'Industrial-adjacent residential'], housing: 'Multi-family, older SFH', challenges: ['Freight corridor traffic', 'Varied street widths', 'Staging friction'], tips: 'Survey truck access carefully. Prefer early starts.', keywords: ['east toledo', 'oregon', 'northwood edges'] },
    ],
    costIntro: 'I-75 portal time, multi-unit access, and Michigan-border empty miles drive quotes.',
    costDrivers: [
      { t: 'I-75 / I-280 / I-475 congestion', d: 'Portal-to-portal spikes at peak.' },
      { t: 'Toledo multi-unit access', d: 'Stairs and elevators raise labor hours.' },
      { t: 'Cross-state empty miles', d: 'Michigan destinations change staging and authority assumptions.' },
      { t: 'Western HOA soft costs', d: 'Gate lists push demand into peak windows.' },
    ],
    ranges: [
      { l: 'Studio / 1BR (simple access)', v: '$400–$1,250+', n: 'Higher with elevators' },
      { l: '2–3BR condo or modest SFH', v: '$1,250–$3,500+', n: 'I-75 pairs trend up' },
      { l: '3–4+ BR / long regional / MI-linked', v: '$2,300–$6,600+', n: 'Cross-state pairs price highest' },
      { l: 'Typical 2-person crew rate', v: '$100–$170+/hr', n: 'Portal-to-portal' },
    ],
    seasonalIntro: 'Family seasons, multi-family lease turns, and lake-plain winter weather reshape access.',
    seasonal: [
      { t: 'Best windows: mid-week early mornings', d: 'Reduce I-75 pain.' },
      { t: 'Peak family season: late May–mid-August', d: 'Book suburban Saturdays early.' },
      { t: 'Month-end multi-family turns', d: 'Core and western multi-unit fill first.' },
      { t: 'Winter ice and snow', d: 'Confirm contingency for driveway and arterial access.' },
    ],
    specializedId: 'toledo-mi-border',
    specializedTitle: 'Toledo & Michigan-border logistics module',
    specializedIntro: 'Lucas estimates fail when I-75 empty miles or Michigan pairs are ignored.',
    specializedBullets: [
      'Price I-75/I-280/I-475 pairs portal-to-portal.',
      'Clarify Ohio vs Michigan destinations for PUCO vs FMCSA.',
      'Collect HOA packets for western suburban product.',
      'Do not reuse Cleveland Shoreway assumptions as Toledo defaults.',
      'Verify PUCO authority for in-state-only jobs and FMCSA for interstate legs.',
    ],
    schools: [
      { t: 'How districts work here', d: 'Toledo Public Schools and numerous suburban districts (Sylvania, Maumee, Ottawa Hills, and others) serve different addresses. Confirm zoning carefully.' },
      { t: 'Research sources', d: 'District tools, Ohio Department of Education data, and campus visits beat ranking screenshots.' },
    ],
    hospitals: [
      { t: 'Major systems', d: 'ProMedica, Mercy Health, University of Toledo Medical Center, and regional facilities serve residents. Confirm networks.' },
      { t: 'What relocators should do', d: 'Map peak-hour drive times from western and southern corridors. Transfer records early.' },
    ],
    housing: [
      { t: 'Core multi-unit vs western suburban stock', d: 'Downtown and near-core product differs from Sylvania HOA and Maumee SFH.' },
      { t: 'Cost variation', d: 'Western suburbs often price differently from east-side industrial-adjacent stock.' },
    ],
    townFit: [
      { t: 'Toledo core lifestyle', d: 'Multi-unit amenities with curb logistics.' },
      { t: 'Western suburb pattern', d: 'HOA product with freeway commute risk.' },
      { t: 'Southern Maumee pattern', d: 'Town amenities with I-75 and cross-county logistics.' },
    ],
    jobs: [
      { t: 'Employment anchors', d: 'Healthcare, manufacturing, logistics, education, and automotive-related industry shape employment; some residents commute into Michigan.' },
      { t: 'Commute realism', d: 'I-75 and I-475 peaks are real. Test drive peak routes and border approaches.' },
    ],
    lifestyle: [
      { t: 'Toledo lake-plain identity', d: 'Lucas is distinct from Cleveland lake-effect micro-markets and Columbus ring freeways.' },
      { t: 'Climate', d: 'Lake-plain winters with ice/snow and humid summers. Plan staging contingency.' },
    ],
    resources: [
      { l: 'Lucas County — official site', h: 'https://www.co.lucas.oh.us/' },
      { l: 'City of Toledo', h: 'https://toledo.oh.gov/' },
      { l: 'OHGO traffic (ODOT)', h: 'https://ohgo.com/' },
    ],
    directoryHint:
      'Prefer Toledo multi-unit experience and honest MI-border pricing; clear I-75 portal times. Verify PUCO in-state and FMCSA interstate.',
  },
  {
    slug: 'butler',
    exportName: 'butlerCountyOhIntelligence',
    hub: 'Butler County Moving Intelligence Hub',
    eyebrow: 'Butler · West/north Cincinnati collar (Hamilton city ≠ Cincinnati)',
    h1: 'Moving in Butler County: West/North Collar Towns, Hamilton City & I-75 Logistics',
    opener:
      'Butler County is Cincinnati’s west/north collar: Fairfield and West Chester multi-family, Hamilton city (the county seat — not Cincinnati) older stock, Middletown corridors, and I-75/I-275 portal time that is not urban Cincinnati hillside stairs and not Warren’s Mason/Lebanon northeast growth alone. A West Chester HOA two-story, a Hamilton city multi-family unit, a Fairfield condo, and an Oxford college-town rental do not share truck access. This hub is for Butler — not a Hamilton County rename and not “Hamilton” confused with Cincinnati.',
    corridors: 'I-75 · I-275 · SR-4 · US-127 · SR-129 · Cincinnati-Dayton Rd',
    differentIntro:
      'West/north Cincinnati collar towns — not downtown Cincinnati hills and not Hamilton County urban product as the default.',
    differentBullets: [
      { t: 'Hamilton city is not Cincinnati', d: 'County-seat multi-unit and older stock differ from Over-the-Rhine elevators and Mount Adams stairs.' },
      { t: 'I-75 / I-275 define portal time to Cincinnati jobs', d: 'Collar pairs burn clock at peak.' },
      { t: 'West Chester multi-family is elevator- and HOA-heavy', d: 'Building packets still apply outside the city core.' },
      { t: 'Oxford college-town pulses cluster crews', d: 'Academic calendars differ from pure suburban lease turns.' },
      { t: 'Butler is not Hamilton County or Warren', d: 'West/north collar logistics differ from urban hills and NE Mason growth.' },
    ],
    zonesHeading: 'Butler access zones',
    zonesIntro: 'Plan by West Chester/Liberty, Hamilton city, Fairfield/SR-4, and northern Middletown/Oxford corridors.',
    zones: [
      { id: 'west-chester', name: 'West Chester, Liberty & I-75 multi-family', short: 'West Chester', hoods: ['West Chester', 'Liberty Township', 'I-75 multi-family', 'HOA master plans'], housing: 'HOA SFH, multi-family, townhomes', challenges: ['HOA rules', 'I-75 congestion', 'Elevator buildings'], tips: 'Collect HOA packets. Reserve elevators in writing. Build I-75 buffer.', keywords: ['west chester', 'liberty township', 'butler county'] },
      { id: 'hamilton-city', name: 'Hamilton city multi-unit & older stock', short: 'Hamilton city', hoods: ['Downtown Hamilton', 'City multi-family', 'Older SFH pockets'], housing: 'Multi-family, twins, older SFH', challenges: ['Tight streets', 'Mixed stairs and elevators', 'SR-4 / US-127 congestion'], tips: 'Photo curb. Confirm unit access type. Do not price as Cincinnati downtown.', keywords: ['hamilton ohio', 'hamilton city', 'downtown hamilton'] },
      { id: 'fairfield-sr4', name: 'Fairfield & SR-4 corridors', short: 'Fairfield / SR-4', hoods: ['Fairfield', 'SR-4 multi-family', 'Cincinnati-Dayton Rd corridors'], housing: 'Multi-family, SFH, townhomes', challenges: ['Arterial congestion', 'Lease-end waves', 'Long portal time to Cincinnati core'], tips: 'Prefer early starts. Confirm elevator reservations.', keywords: ['fairfield', 'sr-4', 'cincinnati-dayton'] },
      { id: 'north-middletown-oxford', name: 'Middletown, Oxford & northern corridors', short: 'North corridors', hoods: ['Middletown', 'Oxford', 'Monroe edges', 'US-127 multi-family'], housing: 'Multi-family, SFH, student housing near Oxford', challenges: ['Long empty miles', 'College lease waves', 'I-75 northern congestion'], tips: 'Book academic peaks early near Oxford. Survey driveway access on longer pairs.', keywords: ['middletown', 'oxford', 'monroe'] },
    ],
    costIntro: 'Collar freeway portal time and mixed HOA/multi-unit access drive quotes.',
    costDrivers: [
      { t: 'I-75 / I-275 congestion', d: 'Portal-to-portal spikes at peak.' },
      { t: 'West Chester HOA and elevator soft costs', d: 'Gate lists and wait time add cost.' },
      { t: 'Hamilton city multi-unit access', d: 'Stairs and curb limits raise labor hours.' },
      { t: 'Cincinnati-linked empty miles', d: 'Urban destinations raise staging distance.' },
    ],
    ranges: [
      { l: 'Studio / 1BR (simple access)', v: '$400–$1,300+', n: 'Higher with elevators' },
      { l: '2–3BR HOA SFH or multi-family', v: '$1,300–$3,700+', n: 'I-75 pairs trend up' },
      { l: '3–4+ BR / long Cincinnati-linked', v: '$2,400–$7,000+', n: 'Cross-county pairs price highest' },
      { l: 'Typical 2-person crew rate', v: '$105–$175+/hr', n: 'Portal-to-portal' },
    ],
    seasonalIntro: 'Family seasons, multi-family lease turns, and Oxford academic calendars reshape access.',
    seasonal: [
      { t: 'Best windows: mid-week early mornings', d: 'Reduce I-75 pain.' },
      { t: 'Peak family season: late May–mid-August', d: 'Book suburban Saturdays early.' },
      { t: 'Oxford / college lease waves', d: 'May/August clusters near campus multi-family.' },
      { t: 'Winter ice and snow', d: 'Confirm contingency for driveway access.' },
    ],
    specializedId: 'butler-cincy-collar-hamilton-city',
    specializedTitle: 'West/north Cincinnati collar & Hamilton city module',
    specializedIntro: 'Butler estimates fail when Hamilton city is confused with Cincinnati or collar empty miles are ignored.',
    specializedBullets: [
      'Never price Hamilton city as Cincinnati downtown or Mount Adams product.',
      'Collect West Chester HOA and elevator packets early.',
      'Price I-75/I-275 pairs portal-to-portal.',
      'Clarify Butler vs Hamilton County destinations.',
      'Verify PUCO authority for in-state-only jobs and FMCSA for interstate legs.',
    ],
    schools: [
      { t: 'How districts work here', d: 'Multiple independent school districts (Lakota, Fairfield, Hamilton, Middletown, Talawanda/Oxford, and others) serve different addresses. Confirm zoning carefully.' },
      { t: 'Research sources', d: 'District tools, Ohio Department of Education data, and campus visits beat ranking screenshots.' },
    ],
    hospitals: [
      { t: 'Major systems', d: 'TriHealth, UC Health facilities, Kettering Health Hamilton, and Cincinnati-metro systems serve residents. Confirm networks.' },
      { t: 'What relocators should do', d: 'Map peak-hour times into Cincinnati specialty care. Transfer records early.' },
    ],
    housing: [
      { t: 'Collar HOA vs Hamilton city stock', d: 'West Chester master plans differ sharply from Hamilton city multi-unit and Oxford student housing.' },
      { t: 'Cost variation', d: 'I-75 growth corridors often price differently from northern Middletown edges.' },
    ],
    townFit: [
      { t: 'West Chester lifestyle', d: 'Growth amenities with HOA logistics and I-75 commute risk.' },
      { t: 'Hamilton city pattern', d: 'County-seat multi-unit with curb logistics — not Cincinnati hills.' },
      { t: 'Oxford pattern', d: 'College-town living with academic lease pulses.' },
    ],
    jobs: [
      { t: 'Employment anchors', d: 'Many residents commute into Cincinnati; local manufacturing, healthcare, education (including Miami University), and logistics also employ residents.' },
      { t: 'Commute realism', d: 'I-75 and I-275 peaks are real. Test drive peak routes into the city.' },
    ],
    lifestyle: [
      { t: 'West/north collar identity', d: 'Butler is distinct from urban Hamilton County hills and Warren NE growth towns.' },
      { t: 'Climate', d: 'Hot humid summers and winter ice/snow. Plan staging contingency.' },
    ],
    resources: [
      { l: 'Butler County, OH — official site', h: 'https://www.butlercountyohio.org/' },
      { l: 'City of Hamilton, OH', h: 'https://www.hamilton-oh.gov/' },
      { l: 'OHGO traffic (ODOT)', h: 'https://ohgo.com/' },
    ],
    directoryHint:
      'Prefer West Chester HOA fluency and Hamilton-city-not-Cincinnati clarity; honest I-75 pricing. Verify PUCO in-state and FMCSA interstate.',
  },
  {
    slug: 'stark',
    exportName: 'starkCountyOhIntelligence',
    hub: 'Stark County Moving Intelligence Hub',
    eyebrow: 'Stark · Canton regional market (not Akron or Cleveland clone)',
    h1: 'Moving in Stark County: Canton Access, Township Runs & I-77/US-30 Logistics',
    opener:
      'Stark County is a Canton-centered regional market: city multi-unit and older stock, North Canton and Jackson Township growth, Massillon corridors, and I-77/US-30 logistics that are not Akron SR-8 defaults and not Cleveland lake-effect micro-markets. A Canton multi-family unit, a North Canton HOA home, a Massillon twin, and a rural-edge lot do not share truck access or empty-mile risk. This hub is for Stark — not a Summit rename.',
    corridors: 'I-77 · US-30 · US-62 · I-76 links · SR-43 · Tuscarawas St',
    differentIntro:
      'Canton regional city-and-township fabric — not Akron industrial mix or Cleveland Shoreway product.',
    differentBullets: [
      { t: 'Canton multi-unit differs from northern suburban HOA product', d: 'Access surveys matter more than “northeast Ohio” labels.' },
      { t: 'I-77 / US-30 define portal time', d: 'Cross-county pairs burn clock at peak.' },
      { t: 'Tuscarawas St and city arterials change staging', d: 'Event and retail congestion differ from pure freeway pricing.' },
      { t: 'Akron- and Cleveland-linked pairs are regional', d: 'Keep county lines clear for drive time assumptions.' },
      { t: 'Stark is not Summit or Cuyahoga', d: 'Do not reuse Akron or Cleveland assumptions as Canton defaults.' },
    ],
    zonesHeading: 'Stark access zones',
    zonesIntro: 'Plan by Canton city, North Canton/Jackson growth, Massillon corridors, and rural edges.',
    zones: [
      { id: 'canton-city', name: 'Canton city multi-unit & older stock', short: 'Canton city', hoods: ['Downtown Canton', 'City multi-family', 'Tuscarawas St corridors', 'Older SFH pockets'], housing: 'Multi-family, twins, older SFH', challenges: ['Tight streets', 'Mixed stairs and elevators', 'Arterial congestion'], tips: 'Photo curb. Confirm unit access type. Prefer mid-week mornings.', keywords: ['canton', 'downtown canton', 'tuscarawas'] },
      { id: 'north-canton-jackson', name: 'North Canton, Jackson & northern growth', short: 'North Canton / Jackson', hoods: ['North Canton', 'Jackson Township', 'HOA villages', 'US-62 multi-family'], housing: 'HOA SFH, multi-family, townhomes', challenges: ['HOA rules', 'I-77 congestion', 'Long portal time to Canton core'], tips: 'Collect HOA packets. Build I-77 buffer.', keywords: ['north canton', 'jackson township', 'green edges'] },
      { id: 'massillon', name: 'Massillon & western corridors', short: 'Massillon', hoods: ['Massillon', 'Perry edges', 'US-30 multi-family'], housing: 'SFH, multi-family, twins', challenges: ['US-30 congestion', 'Mixed access types', 'Longer empty miles'], tips: 'Prefer early starts. Survey driveway depth.', keywords: ['massillon', 'perry', 'us-30'] },
      { id: 'rural-edges', name: 'Southern & eastern rural edges', short: 'Rural edges', hoods: ['Alliance edges', 'Louisville edges', 'Rural driveway lots'], housing: 'SFH, rural-edge lots', challenges: ['Long empty miles', 'Soft surfaces after rain', 'Limited alternate routes'], tips: 'Survey truck access. Prefer early starts for long pairs.', keywords: ['alliance', 'louisville', 'rural stark'] },
    ],
    costIntro: 'City multi-unit access and regional freeway portal time drive quotes.',
    costDrivers: [
      { t: 'Canton multi-unit stairs and curb friction', d: 'Labor hours rise without elevators.' },
      { t: 'I-77 / US-30 congestion', d: 'Portal-to-portal spikes at peak.' },
      { t: 'Northern HOA soft costs', d: 'Gate lists push demand into peak windows.' },
      { t: 'Regional empty miles', d: 'Akron/Cleveland-linked pairs raise staging distance.' },
    ],
    ranges: [
      { l: 'Studio / 1BR (simple access)', v: '$400–$1,200+', n: 'Higher with stairs' },
      { l: '2–3BR condo or modest SFH', v: '$1,200–$3,400+', n: 'I-77 pairs trend up' },
      { l: '3–4+ BR / long regional', v: '$2,200–$6,200+', n: 'Cross-county pairs price highest' },
      { l: 'Typical 2-person crew rate', v: '$100–$165+/hr', n: 'Portal-to-portal' },
    ],
    seasonalIntro: 'Family seasons, multi-family lease turns, and winter ice/snow reshape access.',
    seasonal: [
      { t: 'Best windows: mid-week early mornings', d: 'Reduce I-77/US-30 pain.' },
      { t: 'Peak family season: late May–mid-August', d: 'Book suburban Saturdays early.' },
      { t: 'Month-end multi-family turns', d: 'Canton and North Canton multi-unit fill first.' },
      { t: 'Winter ice and snow', d: 'Confirm contingency for driveway access.' },
    ],
    specializedId: 'canton-regional-not-akron',
    specializedTitle: 'Canton regional (not Akron/Cleveland) module',
    specializedIntro: 'Stark estimates fail when Canton is treated as an Akron or Cleveland clone.',
    specializedBullets: [
      'Survey Canton multi-unit access carefully — not Akron SR-8 defaults.',
      'Price I-77/US-30 pairs portal-to-portal.',
      'Collect HOA packets for North Canton/Jackson growth product.',
      'Clarify Stark vs Summit/Cuyahoga destinations.',
      'Verify PUCO authority for in-state-only jobs and FMCSA for interstate legs.',
    ],
    schools: [
      { t: 'How districts work here', d: 'Canton City Schools and numerous suburban districts (North Canton, Jackson, Massillon, and others) serve different addresses. Confirm zoning carefully.' },
      { t: 'Research sources', d: 'District tools, Ohio Department of Education data, and campus visits beat ranking screenshots.' },
    ],
    hospitals: [
      { t: 'Major systems', d: 'Aultman, Cleveland Clinic Mercy, and regional facilities serve residents. Confirm networks.' },
      { t: 'What relocators should do', d: 'Map peak-hour drive times from outer townships. Transfer records early.' },
    ],
    housing: [
      { t: 'City vs northern suburban stock', d: 'Older multi-unit in Canton; more HOA SFH in North Canton/Jackson corridors.' },
      { t: 'Cost variation', d: 'Northern suburbs often price differently from rural edges.' },
    ],
    townFit: [
      { t: 'Canton city lifestyle', d: 'Multi-unit amenities with curb logistics.' },
      { t: 'North Canton / Jackson pattern', d: 'HOA growth with I-77 commute risk.' },
      { t: 'Massillon / rural lifestyle', d: 'Town or space living with longer empty-mile move logistics.' },
    ],
    jobs: [
      { t: 'Employment anchors', d: 'Healthcare, manufacturing, logistics, education, and retail shape employment.' },
      { t: 'Commute realism', d: 'I-77 and US-30 peaks are real. Test drive peak routes.' },
    ],
    lifestyle: [
      { t: 'Canton regional identity', d: 'Stark is distinct from Akron Summit fabric and Cleveland lake-effect micro-markets.' },
      { t: 'Climate', d: 'Four seasons with meaningful winter snow/ice. Plan staging contingency.' },
    ],
    resources: [
      { l: 'Stark County — official site', h: 'https://www.starkcountyohio.gov/' },
      { l: 'City of Canton', h: 'https://www.cantonohio.gov/' },
      { l: 'OHGO traffic (ODOT)', h: 'https://ohgo.com/' },
    ],
    directoryHint:
      'Prefer Canton multi-unit experience and I-77 honesty — not Akron/Cleveland clone pricing. Verify PUCO in-state and FMCSA interstate.',
  },
  {
    slug: 'lorain',
    exportName: 'lorainCountyOhIntelligence',
    hub: 'Lorain County Moving Intelligence Hub',
    eyebrow: 'Lorain · West of Cleveland lake shore & inland towns',
    h1: 'Moving in Lorain County: Lake Shore Towns, Inland Growth & I-90/SR-2 Logistics',
    opener:
      'Lorain County sits west of Cleveland: lake-shore cities (Lorain, Avon Lake, Sheffield Lake edges), inland growth toward Avon, North Ridgeville, and Elyria, Midway Mall-area multi-family, and I-90/SR-2 portal time that is not Cuyahoga east-side heights product and not pure rural Medina. A lake-shore multi-family unit, an Avon HOA two-story, an Elyria twin, and an Oberlin college-town rental do not share truck access. This hub is for Lorain — not a Cleveland city clone.',
    corridors: 'I-90 · SR-2 · SR-57 · US-20 · SR-58 · Midway Mall corridors',
    differentIntro:
      'West-of-Cleveland lake shore and inland collar — not downtown Cleveland elevators or east-side heights as the default product.',
    differentBullets: [
      { t: 'Lake-shore and inland towns are different products', d: 'Do not price Avon Lake like inland Elyria or Oberlin student housing.' },
      { t: 'I-90 / SR-2 define Cleveland-linked portal time', d: 'Collar pairs burn clock at peak.' },
      { t: 'Lake-effect snow still matters on shore corridors', d: 'Winter access risk is real even west of Cuyahoga.' },
      { t: 'Midway Mall multi-family corridors cluster lease turns', d: 'Month-end waves fill crews first.' },
      { t: 'Lorain is not Cuyahoga', d: 'West-shore and inland logistics differ from Cleveland core east/west micro-markets.' },
    ],
    zonesHeading: 'Lorain access zones',
    zonesIntro: 'Plan by lake-shore cities, Avon/North Ridgeville growth, Elyria core, and southern inland towns.',
    zones: [
      { id: 'lake-shore', name: 'Lake-shore cities & SR-2 corridors', short: 'Lake shore', hoods: ['Lorain', 'Avon Lake', 'Sheffield Lake edges', 'SR-2 multi-family'], housing: 'Multi-family, older SFH, some elevators', challenges: ['Lake-effect snow access', 'Tight streets in older blocks', 'SR-2 congestion'], tips: 'Photo curb. Write winter contingency language. Prefer early starts.', keywords: ['lorain', 'avon lake', 'sheffield lake'] },
      { id: 'avon-growth', name: 'Avon, North Ridgeville & inland growth', short: 'Avon growth', hoods: ['Avon', 'North Ridgeville', 'HOA villages', 'I-90 multi-family'], housing: 'HOA SFH, multi-family, townhomes', challenges: ['HOA rules', 'I-90 congestion', 'Long portal time to Cleveland core'], tips: 'Collect HOA packets. Build I-90 buffer.', keywords: ['avon', 'north ridgeville', 'avon ohio'] },
      { id: 'elyria', name: 'Elyria core & Midway Mall corridors', short: 'Elyria', hoods: ['Elyria', 'Midway Mall corridors', 'City multi-family'], housing: 'Multi-family, twins, older SFH', challenges: ['Arterial congestion', 'Mixed stairs and elevators', 'Lease-end waves'], tips: 'Confirm unit access type. Prefer mid-week mornings near mall corridors.', keywords: ['elyria', 'midway mall'] },
      { id: 'south-inland', name: 'Southern inland towns & Oberlin', short: 'South inland', hoods: ['Oberlin', 'Amherst edges', 'Wellington edges', 'SR-58 corridors'], housing: 'SFH, multi-family, student housing near Oberlin', challenges: ['Long empty miles', 'College lease waves', 'Varied driveway access'], tips: 'Book academic peaks early near Oberlin. Survey driveway access on longer pairs.', keywords: ['oberlin', 'amherst', 'wellington'] },
    ],
    costIntro: 'Cleveland-linked portal time and lake-shore vs inland access differences drive quotes.',
    costDrivers: [
      { t: 'I-90 / SR-2 congestion', d: 'Portal-to-portal spikes at peak.' },
      { t: 'Lake-shore winter access risk', d: 'Ice and snow can force reschedules.' },
      { t: 'Inland HOA soft costs', d: 'Gate lists push demand into peak windows.' },
      { t: 'Cleveland-linked empty miles', d: 'City destinations raise staging distance.' },
    ],
    ranges: [
      { l: 'Studio / 1BR (simple access)', v: '$400–$1,250+', n: 'Higher with elevators or winter access risk' },
      { l: '2–3BR HOA SFH or multi-family', v: '$1,250–$3,500+', n: 'I-90 pairs trend up' },
      { l: '3–4+ BR / long Cleveland-linked', v: '$2,300–$6,600+', n: 'Cross-county pairs price highest' },
      { l: 'Typical 2-person crew rate', v: '$100–$170+/hr', n: 'Portal-to-portal' },
    ],
    seasonalIntro: 'Lake-effect winter, family seasons, multi-family turns, and college calendars reshape access.',
    seasonal: [
      { t: 'Best windows: mid-week early mornings', d: 'Reduce I-90/SR-2 pain.' },
      { t: 'Peak family season: late May–mid-August', d: 'Book suburban Saturdays early.' },
      { t: 'College lease waves near Oberlin', d: 'May/August clusters fill multi-family crews.' },
      { t: 'Lake-effect snow season', d: 'Confirm contingency for shore addresses November–March.' },
    ],
    specializedId: 'lorain-west-shore-inland',
    specializedTitle: 'West-of-Cleveland lake shore & inland module',
    specializedIntro: 'Lorain estimates fail when shore and inland products are treated as identical.',
    specializedBullets: [
      'Survey lake-shore and inland access as different products.',
      'Price I-90/SR-2 pairs portal-to-portal.',
      'Collect HOA packets for Avon/North Ridgeville growth product.',
      'Do not reuse downtown Cleveland elevator assumptions as county defaults.',
      'Verify PUCO authority for in-state-only jobs and FMCSA for interstate legs.',
    ],
    schools: [
      { t: 'How districts work here', d: 'Multiple independent school districts (Lorain, Elyria, Avon, Avon Lake, North Ridgeville, Oberlin, and others) serve different addresses. Confirm zoning carefully.' },
      { t: 'Research sources', d: 'District tools, Ohio Department of Education data, and campus visits beat ranking screenshots.' },
    ],
    hospitals: [
      { t: 'Major systems', d: 'Mercy Health Lorain, University Hospitals facilities, Cleveland Clinic regional sites, and metro systems serve residents. Confirm networks.' },
      { t: 'What relocators should do', d: 'Map peak-hour times into Cleveland specialty care. Transfer records early.' },
    ],
    housing: [
      { t: 'Lake-shore vs inland growth stock', d: 'Older multi-unit and shore product differ from Avon HOA two-stories and Oberlin student housing.' },
      { t: 'Cost variation', d: 'Inland growth towns often price differently from older lake-shore blocks.' },
    ],
    townFit: [
      { t: 'Lake-shore lifestyle', d: 'Water-adjacent living with winter access logistics.' },
      { t: 'Avon / North Ridgeville pattern', d: 'HOA growth with I-90 commute risk into Cleveland.' },
      { t: 'Oberlin / inland pattern', d: 'College-town or rural-edge living with longer empty-mile moves.' },
    ],
    jobs: [
      { t: 'Employment anchors', d: 'Many residents commute into Cuyahoga; local manufacturing, healthcare, education, and logistics also employ residents.' },
      { t: 'Commute realism', d: 'I-90 and SR-2 peaks are real. Test drive peak routes into Cleveland.' },
    ],
    lifestyle: [
      { t: 'West-of-Cleveland identity', d: 'Lorain complements Cuyahoga without cloning downtown or east-side heights product.' },
      { t: 'Climate', d: 'Lake-effect snow risk on shore corridors and humid summers. Plan staging contingency.' },
    ],
    resources: [
      { l: 'Lorain County — official site', h: 'https://www.loraincounty.us/' },
      { l: 'City of Lorain', h: 'https://www.cityoflorain.org/' },
      { l: 'OHGO traffic (ODOT)', h: 'https://ohgo.com/' },
    ],
    directoryHint:
      'Prefer lake-shore vs inland surveys and honest I-90 pricing into Cleveland. Verify PUCO in-state and FMCSA interstate.',
  },
  {
    slug: 'mahoning',
    exportName: 'mahoningCountyOhIntelligence',
    hub: 'Mahoning County Moving Intelligence Hub',
    eyebrow: 'Mahoning · Youngstown regional market (not Cleveland or Akron)',
    h1: 'Moving in Mahoning County: Youngstown Access, Valley Towns & I-80/I-680 Logistics',
    opener:
      'Mahoning County is a Youngstown-centered regional market: city multi-unit and older stock, Boardman and Austintown corridors, Poland and Canfield suburban edges, and I-80/I-680 logistics that are not Cleveland lake-effect defaults and not Akron SR-8 product. A Youngstown multi-family unit, a Boardman HOA home, a Poland twin, and a rural-edge lot do not share truck access or empty-mile risk. This hub is for Mahoning — not a Cuyahoga or Summit rename.',
    corridors: 'I-80 · I-680 · US-62 · SR-11 · Market St · Belmont Ave',
    differentIntro:
      'Youngstown Valley city-and-suburb fabric — not Cleveland Shoreway logistics or Akron industrial mix as the default product.',
    differentBullets: [
      { t: 'Youngstown multi-unit differs from Boardman suburban product', d: 'Access surveys matter more than “northeast Ohio” labels.' },
      { t: 'I-80 / I-680 define portal time', d: 'Cross-county and PA-adjacent pairs burn clock at peak.' },
      { t: 'Pennsylvania adjacency exists on eastern edges', d: 'Clarify Ohio PUCO vs FMCSA for destinations outside Ohio.' },
      { t: 'Market St and Belmont Ave corridors change staging', d: 'Arterial congestion differs from pure freeway pricing.' },
      { t: 'Mahoning is not Cuyahoga or Summit', d: 'Do not reuse Cleveland or Akron assumptions as Youngstown defaults.' },
    ],
    zonesHeading: 'Mahoning access zones',
    zonesIntro: 'Plan by Youngstown city, Boardman/Austintown, southern Poland/Canfield, and eastern PA-adjacent edges.',
    zones: [
      { id: 'youngstown-city', name: 'Youngstown city multi-unit & older stock', short: 'Youngstown city', hoods: ['Downtown Youngstown', 'City multi-family', 'Market St corridors', 'Older SFH pockets'], housing: 'Multi-family, twins, older SFH', challenges: ['Tight streets', 'Mixed stairs and elevators', 'Arterial congestion'], tips: 'Photo curb. Confirm unit access type. Prefer mid-week mornings.', keywords: ['youngstown', 'downtown youngstown', 'market street'] },
      { id: 'boardman-austintown', name: 'Boardman, Austintown & commercial corridors', short: 'Boardman / Austintown', hoods: ['Boardman', 'Austintown', 'Belmont Ave multi-family', 'HOA villages'], housing: 'Multi-family, SFH, townhomes, HOA pockets', challenges: ['Belmont Ave congestion', 'HOA rules in pockets', 'Long portal time to city core'], tips: 'Collect HOA packets where applicable. Prefer early starts.', keywords: ['boardman', 'austintown', 'belmont'] },
      { id: 'south-suburbs', name: 'Poland, Canfield & southern suburbs', short: 'South suburbs', hoods: ['Poland', 'Canfield', 'Southern SFH tracts'], housing: 'SFH, multi-family, twins', challenges: ['Long empty miles', 'SR-11 congestion', 'Varied driveway access'], tips: 'Prefer early starts. Survey driveway depth.', keywords: ['poland', 'canfield', 'southern mahoning'] },
      { id: 'east-pa-edge', name: 'Eastern PA-adjacent edges', short: 'East PA edge', hoods: ['Struthers edges', 'Campbell edges', 'Eastern industrial-adjacent residential'], housing: 'Multi-family, older SFH', challenges: ['Cross-state empty miles', 'Freight corridor traffic', 'Staging friction'], tips: 'Clarify Ohio vs Pennsylvania destinations. Survey truck access carefully.', keywords: ['struthers', 'campbell', 'east youngstown'] },
    ],
    costIntro: 'City multi-unit access and I-80/I-680 portal time drive quotes.',
    costDrivers: [
      { t: 'Youngstown multi-unit stairs and curb friction', d: 'Labor hours rise without elevators.' },
      { t: 'I-80 / I-680 congestion', d: 'Portal-to-portal spikes at peak.' },
      { t: 'Suburban HOA soft costs', d: 'Gate lists push demand into peak windows.' },
      { t: 'Cross-state empty miles', d: 'Pennsylvania destinations change staging and authority assumptions.' },
    ],
    ranges: [
      { l: 'Studio / 1BR (simple access)', v: '$400–$1,200+', n: 'Higher with stairs' },
      { l: '2–3BR condo or modest SFH', v: '$1,200–$3,400+', n: 'I-80 pairs trend up' },
      { l: '3–4+ BR / long regional / PA-linked', v: '$2,200–$6,400+', n: 'Cross-state pairs price highest' },
      { l: 'Typical 2-person crew rate', v: '$100–$165+/hr', n: 'Portal-to-portal' },
    ],
    seasonalIntro: 'Family seasons, multi-family lease turns, and winter ice/snow reshape access.',
    seasonal: [
      { t: 'Best windows: mid-week early mornings', d: 'Reduce I-80/I-680 pain.' },
      { t: 'Peak family season: late May–mid-August', d: 'Book suburban Saturdays early.' },
      { t: 'Month-end multi-family turns', d: 'City and Boardman multi-unit fill first.' },
      { t: 'Winter ice and snow', d: 'Confirm contingency for driveway access.' },
    ],
    specializedId: 'youngstown-not-cleveland-akron',
    specializedTitle: 'Youngstown regional (not Cleveland/Akron) module',
    specializedIntro: 'Mahoning estimates fail when Youngstown is treated as a Cleveland or Akron clone.',
    specializedBullets: [
      'Survey Youngstown multi-unit access carefully — not Cleveland Shoreway defaults.',
      'Price I-80/I-680 pairs portal-to-portal.',
      'Clarify Ohio vs Pennsylvania destinations for PUCO vs FMCSA.',
      'Do not reuse Akron SR-8 or Cleveland east/west assumptions here.',
      'Verify PUCO authority for in-state-only jobs and FMCSA for interstate legs.',
    ],
    schools: [
      { t: 'How districts work here', d: 'Youngstown City Schools and numerous suburban districts (Boardman, Austintown, Poland, Canfield, and others) serve different addresses. Confirm zoning carefully.' },
      { t: 'Research sources', d: 'District tools, Ohio Department of Education data, and campus visits beat ranking screenshots.' },
    ],
    hospitals: [
      { t: 'Major systems', d: 'Mercy Health Youngstown, Cleveland Clinic facilities, and regional systems serve residents. Confirm networks.' },
      { t: 'What relocators should do', d: 'Map peak-hour drive times from outer suburbs. Transfer records early.' },
    ],
    housing: [
      { t: 'City vs Boardman suburban stock', d: 'Older multi-unit in Youngstown; more multi-family and SFH along Boardman/Austintown corridors.' },
      { t: 'Cost variation', d: 'Southern suburbs often price differently from eastern industrial-adjacent edges.' },
    ],
    townFit: [
      { t: 'Youngstown city lifestyle', d: 'Multi-unit amenities with curb logistics.' },
      { t: 'Boardman / Austintown pattern', d: 'Suburban commercial corridors with multi-family logistics.' },
      { t: 'Poland / Canfield pattern', d: 'Family SFH with longer empty-mile move logistics.' },
    ],
    jobs: [
      { t: 'Employment anchors', d: 'Healthcare, manufacturing, logistics, education, and retail shape employment; some residents commute toward Pennsylvania or Cleveland.' },
      { t: 'Commute realism', d: 'I-80 and I-680 peaks are real. Test drive peak routes.' },
    ],
    lifestyle: [
      { t: 'Youngstown Valley identity', d: 'Mahoning is distinct from Cleveland lake-effect micro-markets and Akron regional fabric.' },
      { t: 'Climate', d: 'Four seasons with meaningful winter snow/ice. Plan staging contingency.' },
    ],
    resources: [
      { l: 'Mahoning County — official site', h: 'https://www.mahoningcountyoh.gov/' },
      { l: 'City of Youngstown', h: 'https://youngstownohio.gov/' },
      { l: 'OHGO traffic (ODOT)', h: 'https://ohgo.com/' },
    ],
    directoryHint:
      'Prefer Youngstown multi-unit experience and I-80 honesty — not Cleveland/Akron clone pricing. Verify PUCO in-state and FMCSA interstate.',
  },
  {
    slug: 'warren',
    exportName: 'warrenCountyOhIntelligence',
    hub: 'Warren County Moving Intelligence Hub',
    eyebrow: 'Warren · NE Cincinnati collar — Mason/Lebanon (not urban Cincinnati)',
    h1: 'Moving in Warren County: Mason/Lebanon Growth, HOA Villages & I-71 Logistics',
    opener:
      'Warren County is Cincinnati’s northeast growth collar: Mason multi-family and HOA density, Lebanon and Springboro town corridors, longer empty miles from urban Cincinnati yards, and I-71/I-75-link logistics that are not Over-the-Rhine elevators and not Mount Adams stairs. A Mason townhome, a Lebanon multi-family unit, a Springboro HOA two-story, and a rural-edge lot do not share truck access. This hub is for Warren — not urban Hamilton County and not Butler’s west/north collar.',
    corridors: 'I-71 · I-75 links · SR-48 · US-22/3 · SR-123 · Mason-Montgomery Rd',
    differentIntro:
      'Northeast Cincinnati collar growth — not urban Cincinnati hills and not Butler West Chester product as the default.',
    differentBullets: [
      { t: 'Mason HOA and multi-family dominate growth corridors', d: 'Gate lists, approved hours, and elevator buildings are routine.' },
      { t: 'Empty miles from Cincinnati yards are real', d: 'Even “local” Warren pairs can price as distance work for city-based crews.' },
      { t: 'I-71 / Mason-Montgomery Rd define portal time', d: 'Cross-county pairs burn clock at peak.' },
      { t: 'Lebanon and Springboro are different from Mason density', d: 'Do not price county-seat stock like Mason master plans.' },
      { t: 'Warren is not Hamilton County urban product', d: 'NE growth logistics differ from Cincinnati hills/stairs micro-markets.' },
    ],
    zonesHeading: 'Warren access zones',
    zonesIntro: 'Plan by Mason growth, Lebanon core, Springboro/western approaches, and eastern rural edges.',
    zones: [
      { id: 'mason', name: 'Mason multi-family & HOA growth', short: 'Mason', hoods: ['Mason', 'Mason-Montgomery Rd multi-family', 'HOA master plans', 'Deerfield Township edges'], housing: 'HOA SFH, multi-family, townhomes', challenges: ['HOA rules', 'I-71 congestion', 'Elevator buildings'], tips: 'Collect HOA packets. Reserve elevators in writing. Build I-71 buffer.', keywords: ['mason', 'deerfield township', 'mason-montgomery'] },
      { id: 'lebanon', name: 'Lebanon core & county-seat corridors', short: 'Lebanon', hoods: ['Lebanon', 'US-42 corridors', 'City multi-family'], housing: 'Multi-family, SFH, twins', challenges: ['Mixed access types', 'SR-48 / US-42 congestion', 'Longer empty miles to Cincinnati'], tips: 'Photo curb. Prefer mid-week mornings. Do not price as Mason HOA default.', keywords: ['lebanon', 'lebanon ohio'] },
      { id: 'springboro-west', name: 'Springboro & western approaches', short: 'Springboro / west', hoods: ['Springboro', 'Franklin edges (verify county)', 'SR-73 multi-family', 'HOA villages'], housing: 'HOA SFH, multi-family, townhomes', challenges: ['HOA rules', 'I-75 link congestion', 'Cross-county confusion'], tips: 'Clarify Warren vs Montgomery addresses. Collect HOA packets.', keywords: ['springboro', 'franklin ohio edges'] },
      { id: 'east-rural', name: 'Eastern rural edges & small towns', short: 'East rural', hoods: ['Waynesville edges', 'Morrow edges', 'Rural driveway lots'], housing: 'SFH, rural-edge lots', challenges: ['Long empty miles', 'Soft surfaces after rain', 'Limited alternate routes'], tips: 'Survey driveway and truck turn radius. Prefer early starts.', keywords: ['waynesville', 'morrow', 'rural warren'] },
    ],
    costIntro: 'HOA soft costs and Cincinnati-linked empty miles drive quotes.',
    costDrivers: [
      { t: 'Longer empty miles from Cincinnati yards', d: 'Distance work disguised as “local.”' },
      { t: 'Mason HOA gate lists and elevators', d: 'Soft costs push demand into peak windows.' },
      { t: 'I-71 / Mason-Montgomery Rd congestion', d: 'Portal-to-portal spikes at peak.' },
      { t: 'Rural-edge access friction', d: 'Driveway surveys matter more than ZIP codes.' },
    ],
    ranges: [
      { l: 'Studio / 1BR (simple access)', v: '$450–$1,350+', n: 'Higher with HOA soft costs' },
      { l: '2–3BR HOA SFH or multi-family', v: '$1,400–$3,900+', n: 'Long portal times trend up' },
      { l: '3–4+ BR / long Cincinnati-linked', v: '$2,600–$7,500+', n: 'Cross-county pairs price highest' },
      { l: 'Typical 2-person crew rate', v: '$110–$180+/hr', n: 'Portal-to-portal' },
    ],
    seasonalIntro: 'Family seasons and multi-family lease turns reshape growth-corridor access.',
    seasonal: [
      { t: 'Best windows: mid-week early mornings', d: 'Reduce I-71 pain and clear HOA hours.' },
      { t: 'Peak family season: late May–mid-August', d: 'Book suburban Saturdays early.' },
      { t: 'Month-end multi-family turns', d: 'Mason multi-unit fills first.' },
      { t: 'Winter ice and snow', d: 'Confirm contingency for driveway access.' },
    ],
    specializedId: 'warren-ne-cincy-collar',
    specializedTitle: 'NE Cincinnati collar Mason/Lebanon module',
    specializedIntro: 'Warren estimates fail when empty miles or Mason HOA rules are ignored.',
    specializedBullets: [
      'Collect Mason HOA and elevator packets early.',
      'Price Cincinnati-linked pairs as logistics days.',
      'Do not reuse Over-the-Rhine or Mount Adams assumptions here.',
      'Clarify Warren vs Hamilton/Butler/Montgomery destinations.',
      'Verify PUCO authority for in-state-only jobs and FMCSA for interstate legs.',
    ],
    schools: [
      { t: 'How districts work here', d: 'Multiple independent school districts (Mason, Lebanon, Springboro, Kings, and others) serve different addresses. Confirm zoning carefully.' },
      { t: 'Growth areas', d: 'Mason and Springboro corridors can see enrollment pressure. Ask about capacity when touring.' },
    ],
    hospitals: [
      { t: 'Major systems', d: 'TriHealth, UC Health, Cincinnati Children’s regional access, and local facilities serve residents. Confirm networks.' },
      { t: 'What relocators should do', d: 'Map peak-hour times into Cincinnati specialty care. Transfer records early.' },
    ],
    housing: [
      { t: 'Mason growth product vs Lebanon stock', d: 'Master-planned HOA and multi-family dominate Mason; Lebanon and rural edges remain more mixed or rural.' },
      { t: 'Cost variation', d: 'Mason corridors often price differently from eastern rural townships.' },
    ],
    townFit: [
      { t: 'Mason lifestyle', d: 'Growth amenities with HOA logistics and I-71 commute risk.' },
      { t: 'Lebanon pattern', d: 'County-seat town living with mixed stock access.' },
      { t: 'Springboro / rural lifestyle', d: 'Family SFH or space with longer empty-mile move logistics.' },
    ],
    jobs: [
      { t: 'Employment anchors', d: 'Many residents commute into Cincinnati or Dayton; local corporate, healthcare, retail, and logistics also employ residents.' },
      { t: 'Commute realism', d: 'I-71 and Mason-Montgomery peaks are real. Test drive peak routes into the city.' },
    ],
    lifestyle: [
      { t: 'NE collar identity', d: 'Warren is distinct from urban Cincinnati hills and Butler west/north collar towns.' },
      { t: 'Climate', d: 'Hot humid summers and winter ice/snow. Plan staging contingency.' },
    ],
    resources: [
      { l: 'Warren County, OH — official site', h: 'https://www.warrencountyohio.gov/' },
      { l: 'City of Mason', h: 'https://www.imaginemason.org/' },
      { l: 'OHGO traffic (ODOT)', h: 'https://ohgo.com/' },
    ],
    directoryHint:
      'Prefer Mason HOA fluency and honest long-run pricing from Cincinnati yards — not urban hills defaults. Verify PUCO in-state and FMCSA interstate.',
  },
  {
    slug: 'lake',
    exportName: 'lakeCountyOhIntelligence',
    hub: 'Lake County Moving Intelligence Hub',
    eyebrow: 'Lake · East of Cleveland — Mentor/Willoughby lake shore',
    h1: 'Moving in Lake County: Mentor/Willoughby Access, Lake Shore & I-90/SR-2 Logistics',
    opener:
      'Lake County sits east of Cleveland: Mentor multi-family and retail corridors, Willoughby and Willoughby Hills edges, lake-shore towns toward Painesville and Madison, Vine Street and US-20 arterial staging, and I-90/SR-2 portal time that is not Cuyahoga downtown elevators and not Geauga rural defaults. A Mentor HOA two-story, a Willoughby multi-family unit, a Painesville twin, and a Madison rural-edge lot do not share truck access. This hub is for Lake — not a Cleveland city clone.',
    corridors: 'I-90 · SR-2 · US-20 · SR-44 · SR-91 · Vine Street corridors',
    differentIntro:
      'East-of-Cleveland lake shore and Mentor-centered growth — not downtown Cleveland elevators or west-shore Lorain product as the default.',
    differentBullets: [
      { t: 'Mentor multi-family and HOA product differs from older lake-shore stock', d: 'Access surveys matter more than “east of Cleveland” labels.' },
      { t: 'I-90 / SR-2 define Cleveland-linked portal time', d: 'Collar pairs burn clock at peak.' },
      { t: 'Lake-effect snow is an operational constraint', d: 'Shore and inland grades need winter contingency language.' },
      { t: 'Vine Street and US-20 arterials change staging', d: 'Retail congestion differs from pure freeway pricing.' },
      { t: 'Lake is not Cuyahoga', d: 'East-shore logistics differ from Cleveland core east/west micro-markets.' },
    ],
    zonesHeading: 'Lake access zones',
    zonesIntro: 'Plan by Mentor growth, Willoughby corridors, Painesville/lake-shore, and eastern Madison edges.',
    zones: [
      { id: 'mentor', name: 'Mentor multi-family, retail & HOA growth', short: 'Mentor', hoods: ['Mentor', 'Mentor-on-the-Lake edges', 'SR-2 multi-family', 'HOA villages'], housing: 'HOA SFH, multi-family, townhomes', challenges: ['HOA rules', 'I-90 / SR-2 congestion', 'Retail corridor staging'], tips: 'Collect HOA packets. Build freeway buffer. Prefer early starts near retail peaks.', keywords: ['mentor', 'mentor-on-the-lake'] },
      { id: 'willoughby', name: 'Willoughby, Eastlake & Vine Street corridors', short: 'Willoughby', hoods: ['Willoughby', 'Willoughby Hills', 'Eastlake edges', 'Vine Street multi-family'], housing: 'Multi-family, SFH, twins', challenges: ['Vine Street congestion', 'Mixed access types', 'Long portal time to Cleveland core'], tips: 'Photo curb. Confirm unit access type. Prefer mid-week mornings.', keywords: ['willoughby', 'willoughby hills', 'eastlake', 'vine street'] },
      { id: 'painesville-shore', name: 'Painesville & central lake-shore towns', short: 'Painesville / shore', hoods: ['Painesville', 'Fairport Harbor edges', 'Grand River edges', 'US-20 multi-family'], housing: 'Multi-family, older SFH, twins', challenges: ['Lake-effect snow access', 'Tight streets in older blocks', 'Arterial congestion'], tips: 'Write winter contingency language. Survey curb width carefully.', keywords: ['painesville', 'fairport harbor', 'grand river'] },
      { id: 'east-madison', name: 'Eastern Madison & rural edges', short: 'East / Madison', hoods: ['Madison', 'Perry edges', 'Rural driveway lots'], housing: 'SFH, rural-edge lots, limited multi-family', challenges: ['Long empty miles', 'Soft surfaces after rain', 'Limited alternate routes'], tips: 'Survey driveway access. Prefer early starts for long east-county pairs.', keywords: ['madison', 'perry', 'eastern lake'] },
    ],
    costIntro: 'Cleveland-linked portal time, HOA soft costs, and lake-effect winter risk drive quotes.',
    costDrivers: [
      { t: 'I-90 / SR-2 congestion', d: 'Portal-to-portal spikes at peak.' },
      { t: 'Mentor HOA and multi-family soft costs', d: 'Gate lists and elevators add cost.' },
      { t: 'Lake-effect winter contingency', d: 'Ice and snow can force reschedules.' },
      { t: 'Cleveland-linked empty miles', d: 'City destinations raise staging distance.' },
    ],
    ranges: [
      { l: 'Studio / 1BR (simple access)', v: '$400–$1,250+', n: 'Higher with elevators or winter access risk' },
      { l: '2–3BR HOA SFH or multi-family', v: '$1,250–$3,500+', n: 'I-90 pairs trend up' },
      { l: '3–4+ BR / long Cleveland-linked', v: '$2,300–$6,600+', n: 'Cross-county pairs price highest' },
      { l: 'Typical 2-person crew rate', v: '$100–$170+/hr', n: 'Portal-to-portal' },
    ],
    seasonalIntro: 'Lake-effect winter, family seasons, and multi-family lease turns reshape access.',
    seasonal: [
      { t: 'Best windows: mid-week early mornings', d: 'Reduce I-90/SR-2 pain.' },
      { t: 'Peak family season: late May–mid-August', d: 'Book suburban Saturdays early.' },
      { t: 'Month-end multi-family turns', d: 'Mentor and Willoughby multi-unit fill first.' },
      { t: 'Lake-effect snow season', d: 'Confirm contingency for shore and driveway addresses November–March.' },
    ],
    specializedId: 'lake-east-cuyahoga-shore',
    specializedTitle: 'East-of-Cleveland Mentor/Willoughby module',
    specializedIntro: 'Lake estimates fail when Mentor growth and shore access are treated as Cleveland core product.',
    specializedBullets: [
      'Collect Mentor HOA packets early.',
      'Price I-90/SR-2 pairs portal-to-portal.',
      'Write lake-effect weather contingency into winter estimates.',
      'Do not reuse downtown Cleveland elevator assumptions as county defaults.',
      'Verify PUCO authority for in-state-only jobs and FMCSA for interstate legs.',
    ],
    schools: [
      { t: 'How districts work here', d: 'Multiple independent school districts (Mentor, Willoughby-Eastlake, Painesville, Madison, and others) serve different addresses. Confirm zoning carefully.' },
      { t: 'Research sources', d: 'District tools, Ohio Department of Education data, and campus visits beat ranking screenshots.' },
    ],
    hospitals: [
      { t: 'Major systems', d: 'University Hospitals, Cleveland Clinic regional facilities, Lake Health / UH network sites, and metro systems serve residents. Confirm networks.' },
      { t: 'What relocators should do', d: 'Map peak-hour times into Cleveland specialty care. Transfer records early.' },
    ],
    housing: [
      { t: 'Mentor growth vs older shore stock', d: 'HOA multi-family and newer SFH dominate Mentor; Painesville and eastern edges show more older or rural stock.' },
      { t: 'Cost variation', d: 'Mentor corridors often price differently from eastern Madison rural edges.' },
    ],
    townFit: [
      { t: 'Mentor lifestyle', d: 'Growth amenities with HOA logistics and I-90 commute risk.' },
      { t: 'Willoughby pattern', d: 'Town multi-family with Vine Street arterial logistics.' },
      { t: 'Eastern / Madison lifestyle', d: 'Space with long empty-mile move logistics.' },
    ],
    jobs: [
      { t: 'Employment anchors', d: 'Many residents commute into Cuyahoga; local healthcare, manufacturing, retail, and logistics also employ residents.' },
      { t: 'Commute realism', d: 'I-90 and SR-2 peaks are real. Test drive peak routes into Cleveland.' },
    ],
    lifestyle: [
      { t: 'East-of-Cleveland identity', d: 'Lake complements Cuyahoga without cloning downtown or west-side product.' },
      { t: 'Climate', d: 'Meaningful lake-effect snow risk and humid summers. Plan staging contingency.' },
    ],
    resources: [
      { l: 'Lake County, OH — official site', h: 'https://www.lakecountyohio.gov/' },
      { l: 'City of Mentor', h: 'https://www.cityofmentor.com/' },
      { l: 'OHGO traffic (ODOT)', h: 'https://ohgo.com/' },
    ],
    directoryHint:
      'Prefer Mentor HOA fluency and lake-effect contingency; honest I-90 pricing into Cleveland. Verify PUCO in-state and FMCSA interstate.',
  },
];

const outDir = join(process.cwd(), 'lib/local-movers/county-intelligence/ohio');
mkdirSync(outDir, { recursive: true });
for (const c of counties) {
  writeFileSync(join(outDir, `${c.slug}-oh.ts`), render(c), 'utf8');
  console.log('wrote', c.slug);
}
console.log('done', counties.length);
