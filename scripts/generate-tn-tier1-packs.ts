/**
 * One-shot generator for Tennessee Tier-1 Core 12 intelligence packs.
 * Run: npx tsx scripts/generate-tn-tier1-packs.ts
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

type CountySpec = {
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

function j(v: unknown): string {
  return JSON.stringify(v);
}

function render(p: CountySpec): string {
  const label = p.hub.replace(' Moving Intelligence Hub', '');
  const bullets = p.differentBullets
    .map(
      (b) => `      {
        title: ${j(b.t)},
        detail: ${j(b.d)},
      }`
    )
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
import { finalizeTnPack } from '@/lib/local-movers/county-intelligence/tennessee/tn-shared';

export const ${p.exportName}: CountyIntelligencePack = finalizeTnPack({
  countySlug: ${j(p.slug)},
  hubTitle: ${j(p.hub)},
  eyebrow: ${j(p.eyebrow)},
  h1: ${j(p.h1)},
  heroOpener: ${j(p.opener)},
  heroCredibility:
    'TDOR motor carrier intrastate authority for in-state TN moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: ${j(p.corridors)},
  whatMakesDifferent: {
    title: ${j(`What makes moving in ${label} different`)},
    intro: ${j(p.differentIntro)},
    bullets: [
${bullets},
      {
        title: 'Intrastate TN rules vs interstate authority',
        detail:
          'Moves entirely within Tennessee by for-hire carriers are generally subject to Tennessee Department of Revenue (TDOR) motor carrier intrastate authority requirements as applicable. Interstate legs need active FMCSA USDOT (and usually MC).',
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
      'Official links first; directory listings are independent, not endorsements. Verify TDOR intrastate authority for in-state moves and FMCSA for interstate legs.',
    items: [
${res}
    ],
  },
  directoryHint: ${j(p.directoryHint)},
  lastReviewed: '2026-07-24',
});
`;
}

const counties: CountySpec[] = [
  {
    slug: 'shelby',
    exportName: 'shelbyCountyTnIntelligence',
    hub: 'Shelby County Moving Intelligence Hub',
    eyebrow: 'Shelby · Memphis core, Midtown/East Memphis & river-city logistics',
    h1: 'Moving in Shelby County: Memphis Core, Midtown Access & I-40/I-240 Logistics',
    opener:
      'Shelby County is Memphis’s river-city engine: downtown and Midtown mixed stock, East Memphis multi-family and older SFH, suburban rings toward Germantown and Collierville, and humidity/heat that punishes afternoon open carries. A downtown loft, a Midtown craftsman, an East Memphis ranch, and a Collierville HOA two-story do not share truck access or I-240 portal time. This hub is for Shelby — not Nashville music-core copy or Knoxville foothills tips.',
    corridors: 'I-40 · I-55 · I-240 · I-69 links · US-51 · US-61',
    differentIntro:
      'These are Memphis river-city realities — heat/humidity, I-240 loops, and Midtown/East Memphis access — not Nashville towers or East Tennessee mountains.',
    differentBullets: [
      { t: 'Heat and humidity compress productive outdoor hours', d: 'Summer afternoons slow exterior carries. Prefer early starts and tarp discipline.' },
      { t: 'I-40 / I-55 / I-240 define portal-to-portal time', d: 'Cross-town pairs look local on maps and regional at peak. Price honestly.' },
      { t: 'Midtown and near-core stock mixes stairs and multi-unit product', d: 'Access photos beat verbal promises on older blocks.' },
      { t: 'East Memphis and eastern suburbs flip to HOA and longer empty miles', d: 'Gate lists and driveway rules appear more often than downtown alleys.' },
      { t: 'Cross-state Memphis pairs are routine', d: 'Arkansas and Mississippi edges change FMCSA vs TDOR assumptions — clarify destinations.' },
    ],
    zonesHeading: 'Shelby access zones',
    zonesIntro: 'Plan by downtown/Midtown, East Memphis, southeast suburbs, and north/river-adjacent corridors.',
    zones: [
      { id: 'downtown-midtown', name: 'Downtown Memphis & Midtown', short: 'Downtown / Midtown', hoods: ['Downtown', 'Midtown', 'Cooper-Young', 'Central Gardens', 'Victorian Village'], housing: 'Lofts, multi-unit, older SFH, some mid-rise', challenges: ['Stairs and curb friction', 'Event-day downtown congestion', 'Heat on open staging'], tips: 'Prefer mid-week early mornings. Photo curb and stairs. Confirm elevator rules on multi-unit.', keywords: ['memphis', 'midtown', 'downtown', 'cooper-young'] },
      { id: 'east-memphis', name: 'East Memphis multi-family & SFH', short: 'East Memphis', hoods: ['East Memphis', 'Poplar corridor', 'White Station edges', 'Sea Isle'], housing: 'SFH, multi-family, townhomes', challenges: ['Poplar corridor congestion', 'Mixed access types', 'Longer empty miles from river core'], tips: 'Build I-240 buffer. Confirm unit access type. Prefer early starts.', keywords: ['east memphis', 'poplar', 'white station'] },
      { id: 'se-suburbs', name: 'Germantown, Collierville & southeast suburbs', short: 'SE suburbs', hoods: ['Germantown', 'Collierville', 'Cordova edges', 'HOA villages'], housing: 'HOA SFH, townhomes, multi-family', challenges: ['HOA gate lists', 'I-240 congestion', 'Long portal time to downtown'], tips: 'Collect HOA packets first. Price southeast pairs honestly.', keywords: ['germantown', 'collierville', 'cordova'] },
      { id: 'north-river', name: 'North Memphis & river-adjacent corridors', short: 'North / river', hoods: ['North Memphis', 'Frayser edges', 'Mississippi River approaches', 'Industrial-adjacent residential'], housing: 'Mixed SFH, multi-family, industrial-adjacent', challenges: ['Varied street widths', 'Industrial truck corridors', 'Longer empty miles'], tips: 'Survey truck access. Prefer early starts for long north-county pairs.', keywords: ['north memphis', 'frayser', 'river'] },
    ],
    costIntro: 'Heat pacing, loop freeway portal time, and HOA soft costs separate cheap estimates from real bills.',
    costDrivers: [
      { t: 'Heat pacing and storm holds', d: 'Summer labor hours stretch on open suburban streets.' },
      { t: 'I-40 / I-240 congestion', d: 'Cross-town portal time spikes at peak.' },
      { t: 'HOA southeast growth product', d: 'Gate lists push demand into peak windows.' },
      { t: 'Cross-state empty miles', d: 'AR/MS destinations change staging distance and authority assumptions.' },
    ],
    ranges: [
      { l: 'Studio / 1BR (simple access)', v: '$400–$1,250+', n: 'Higher with stairs or peak freeways' },
      { l: '2–3BR condo or modest SFH', v: '$1,250–$3,500+', n: 'HOA soft costs trend up' },
      { l: '3–4+ BR / cross-loop', v: '$2,300–$6,800+', n: 'Long I-240 pairs price highest' },
      { l: 'Typical 2-person crew rate', v: '$100–$175+/hr', n: 'Portal-to-portal' },
    ],
    seasonalIntro: 'Heat, storms, and family calendars reshape Memphis access windows.',
    seasonal: [
      { t: 'Best windows: mid-week early mornings', d: 'Beat heat and I-240 peak.' },
      { t: 'Peak family season: late May–mid-August', d: 'Book suburban Saturdays early.' },
      { t: 'Summer heat and storms', d: 'Prefer dawn starts; confirm weather contingency.' },
      { t: 'Month-end multi-family turns', d: 'Lease clusters fill crews in East Memphis and core multi-unit.' },
    ],
    specializedId: 'memphis-river-city',
    specializedTitle: 'Memphis river-city heat & loop logistics module',
    specializedIntro: 'Shelby estimates fail when heat pacing or I-240 distance is ignored.',
    specializedBullets: [
      'Prefer early starts May–September for open carries.',
      'Price I-40/I-240 pairs portal-to-portal.',
      'Collect HOA packets for Germantown/Collierville product.',
      'Clarify Tennessee vs Arkansas/Mississippi destinations.',
      'Verify TDOR intrastate authority for in-state-only jobs and FMCSA for interstate legs.',
    ],
    schools: [
      { t: 'How districts work here', d: 'Shelby County Schools and municipal systems (e.g., Germantown, Collierville, Bartlett where applicable) serve different addresses. Confirm zoning carefully.' },
      { t: 'Research sources', d: 'District boundary tools, Tennessee DOE data, and campus visits beat ranking screenshots.' },
    ],
    hospitals: [
      { t: 'Major systems', d: 'Methodist, Baptist Memorial, Regional One, and other facilities serve Memphis corridors. Confirm networks.' },
      { t: 'What relocators should do', d: 'Map peak-hour drive times from southeast suburbs. Transfer records early.' },
    ],
    housing: [
      { t: 'Core vs eastern stock', d: 'Mixed multi-unit and older SFH near core; larger HOA tracts dominate eastern suburbs.' },
      { t: 'Cost variation', d: 'Prices vary sharply by corridor. Budget HOA dues where applicable.' },
    ],
    townFit: [
      { t: 'Midtown / near-core lifestyle', d: 'Walkable amenities with stair/curb tradeoffs.' },
      { t: 'East Memphis pattern', d: 'Established SFH and multi-family with arterial congestion.' },
      { t: 'Southeast suburb pattern', d: 'HOA product and longer portal time to downtown jobs.' },
    ],
    jobs: [
      { t: 'Employment anchors', d: 'Logistics, healthcare, education, distribution, and professional services shape employment.' },
      { t: 'Commute realism', d: 'I-40, I-55, and I-240 peaks are real. Test drive peak routes.' },
    ],
    lifestyle: [
      { t: 'River-city identity', d: 'Shelby is West Tennessee river-metro fabric — not Nashville music-core or East Tennessee mountains.' },
      { t: 'Climate', d: 'Hot humid summers and storms. Plan outdoor staging contingency.' },
    ],
    resources: [
      { l: 'Shelby County — official site', h: 'https://www.shelbycountytn.gov/' },
      { l: 'City of Memphis', h: 'https://www.memphistn.gov/' },
      { l: 'Shelby County Schools', h: 'https://www.scsk12.org/', n: 'Boundaries & calendars' },
      { l: 'TDOT traffic resources', h: 'https://www.tn.gov/tdot.html' },
    ],
    directoryHint:
      'Prefer heat-aware early starts; Midtown stair/curb experience; HOA fluency for eastern suburbs; honest I-240 pricing. Verify TDOR intrastate and FMCSA as applicable.',
  },
  {
    slug: 'davidson',
    exportName: 'davidsonCountyTnIntelligence',
    hub: 'Davidson County Moving Intelligence Hub',
    eyebrow: 'Davidson · Nashville urban core, music/tourism pulses & neighborhood micro-markets',
    h1: 'Moving in Davidson County: Nashville Core, Condo Access & I-40/I-65 Logistics',
    opener:
      'Davidson County is Nashville’s urban-and-corridor market: downtown and Gulch high-rises with COI and freight elevators, East Nashville and 12South micro-markets with tight streets, music-industry and tourism curb pulses, and suburban arms that still sit under one county name. A Gulch tower, an East Nashville bungalow, a Green Hills condo, and an Antioch multi-family unit do not share truck access or I-40/I-65 portal time. This hub is for Davidson — not Memphis river copy, not Williamson estate HOA patterns, and not a renamed Atlanta page.',
    corridors: 'I-40 · I-24 · I-65 · Briley Pkwy · Ellington Pkwy · US-41',
    differentIntro:
      'These are Nashville-core realities — vertical product, tourism/event curb pressure, and neighborhood micro-markets — not Memphis heat-only tips or Williamson premium suburbs alone.',
    differentBullets: [
      { t: 'Downtown / Gulch elevators make COI the default', d: 'Towers need building packets, freight elevators, and fixed move windows.' },
      { t: 'Music and tourism calendars rewrite curb access', d: 'Event nights and Broadway-adjacent staging can erase “normal” residential windows.' },
      { t: 'Neighborhood micro-markets are not interchangeable', d: 'East Nashville alleys differ from Green Hills multi-unit and Antioch multi-family.' },
      { t: 'I-40 / I-24 / I-65 define portal-to-portal time', d: 'Cross-town pairs look local on maps and regional at peak.' },
      { t: 'Cross-county Nashville pairs are routine', d: 'Williamson, Rutherford, Sumner, and Wilson destinations need clear county lines for drive time and authority assumptions.' },
    ],
    zonesHeading: 'Davidson access zones',
    zonesIntro: 'Plan by downtown/Gulch vertical core, East Nashville, south/west near-core, and outer multi-family arms.',
    zones: [
      { id: 'downtown-gulch', name: 'Downtown, Gulch & SoBro vertical core', short: 'Downtown / Gulch', hoods: ['Downtown', 'The Gulch', 'SoBro', 'Music Row edges', 'Germantown'], housing: 'High-rises, mid-rises, lofts', challenges: ['Near-universal COI and elevators', 'Scarce curb staging', 'Event-day congestion'], tips: 'Get building packets early. Prefer mid-week morning freight windows. Avoid major event nights when flexible.', keywords: ['nashville', 'gulch', 'downtown', 'sobro', 'germantown'] },
      { id: 'east-nashville', name: 'East Nashville neighborhood micro-markets', short: 'East Nashville', hoods: ['East Nashville', 'Five Points', 'Lockeland Springs', 'Inglewood edges'], housing: 'Older SFH, multi-story walk-ups, limited multi-family', challenges: ['Tight streets and alleys', 'Stairs common', 'Limited legal curb'], tips: 'Photo alley and curb. Prefer mid-week mornings. Confirm stair access unit-by-unit.', keywords: ['east nashville', 'five points', 'lockeland', 'inglewood'] },
      { id: 'green-hills-south', name: 'Green Hills, 12South & south/west near-core', short: 'South / west near-core', hoods: ['Green Hills', '12South', 'Hillsboro Village edges', 'Sylvan Park edges'], housing: 'Condos, townhomes, older SFH, mid-rise multi-family', challenges: ['Mixed elevators and tight residential streets', 'Retail-corridor traffic', 'High-value inventory handling'], tips: 'Survey multi-unit and SFH as different products. Discuss valuation for higher-value contents.', keywords: ['green hills', '12south', 'hillsboro', 'sylvan park'] },
      { id: 'outer-arms', name: 'Antioch, Madison & outer multi-family arms', short: 'Outer arms', hoods: ['Antioch', 'Madison', 'Bordeaux edges', 'Briley multi-family'], housing: 'Multi-family, townhomes, tract SFH', challenges: ['I-24 / Briley congestion', 'Elevator buildings with guest parking chaos', 'Long portal time to core'], tips: 'Book lease-end clusters early. Build freeway buffer. Confirm elevator reservations.', keywords: ['antioch', 'madison', 'bordeaux', 'briley'] },
    ],
    costIntro: 'Elevator buildings, event curb friction, and freeway portal time drive quotes more than square footage alone.',
    costDrivers: [
      { t: 'High-rise COI and elevators', d: 'Downtown labor and wait time dominate core jobs.' },
      { t: 'Event and tourism curb pressure', d: 'Peak nights raise time risk near entertainment corridors.' },
      { t: 'I-40 / I-24 / I-65 congestion', d: 'Portal-to-portal spikes at peak.' },
      { t: 'Cross-county empty miles', d: 'Suburb-ring destinations raise staging distance.' },
    ],
    ranges: [
      { l: 'Studio / 1BR (simple access)', v: '$450–$1,400+', n: 'Higher with elevators' },
      { l: '2–3BR condo or modest SFH', v: '$1,400–$3,900+', n: 'Core multi-unit trends up' },
      { l: '3–4+ BR / tower / cross-county', v: '$2,600–$7,800+', n: 'Gulch towers and long freeway pairs highest' },
      { l: 'Typical 2-person crew rate', v: '$110–$185+/hr', n: 'Portal-to-portal' },
    ],
    seasonalIntro: 'Tourism, music calendars, and family seasons reshape Nashville access.',
    seasonal: [
      { t: 'Best windows: mid-week early mornings', d: 'Clear curb and reduce freeway pain.' },
      { t: 'CMA / major event weeks', d: 'Book early or avoid entertainment-district staging when flexible.' },
      { t: 'Peak family season: late May–mid-August', d: 'Suburban and multi-family Saturdays fill first.' },
      { t: 'Summer heat and storms', d: 'Prefer early starts; confirm weather contingency.' },
    ],
    specializedId: 'nashville-core-vertical',
    specializedTitle: 'Nashville vertical core & event-calendar module',
    specializedIntro: 'Davidson estimates fail when tower packets or tourism curb rules are ignored.',
    specializedBullets: [
      'Request building move packets at lease signing or escrow for towers.',
      'Reserve freight elevators in writing and reconfirm the day before.',
      'Avoid major event nights near Broadway/Gulch when flexible.',
      'Price I-40/I-24/I-65 pairs portal-to-portal.',
      'Clarify Davidson vs Williamson/Rutherford/Sumner/Wilson addresses.',
      'Verify TDOR intrastate authority for in-state-only jobs and FMCSA for interstate legs.',
    ],
    schools: [
      { t: 'How districts work here', d: 'Metro Nashville Public Schools is the primary public K–12 system. Assignment is address-based.' },
      { t: 'Research sources', d: 'District tools, Tennessee DOE data, and campus visits beat ranking screenshots.' },
    ],
    hospitals: [
      { t: 'Major systems', d: 'Vanderbilt, HCA TriStar, Ascension Saint Thomas, and other facilities serve Nashville corridors. Confirm networks.' },
      { t: 'What relocators should do', d: 'Map peak-hour drive times from outer arms. Transfer records early.' },
    ],
    housing: [
      { t: 'Vertical core vs neighborhood stock', d: 'Towers downtown; older SFH and multi-unit in East Nashville; multi-family on outer arms.' },
      { t: 'Cost variation', d: 'Prices vary sharply by corridor. Budget condo dues and parking fees in towers.' },
    ],
    townFit: [
      { t: 'Downtown / Gulch lifestyle', d: 'Urban amenities with elevator tradeoffs.' },
      { t: 'East Nashville pattern', d: 'Neighborhood character with stair/curb logistics.' },
      { t: 'Outer multi-family pattern', d: 'Space and price tradeoffs with longer freeway portal time.' },
    ],
    jobs: [
      { t: 'Employment anchors', d: 'Healthcare, music/entertainment, tourism, tech, education, and professional services shape employment.' },
      { t: 'Commute realism', d: 'I-40, I-24, I-65, and Briley peaks are real. Test drive peak routes.' },
    ],
    lifestyle: [
      { t: 'Music-city identity', d: 'Davidson stacks entertainment density with neighborhood micro-markets — not Memphis river logistics or Knoxville foothills.' },
      { t: 'Climate', d: 'Hot humid summers and storms. Plan outdoor staging contingency.' },
    ],
    resources: [
      { l: 'Metro Nashville / Davidson County', h: 'https://www.nashville.gov/' },
      { l: 'Metro Nashville Public Schools', h: 'https://www.mnps.org/', n: 'Boundaries & calendars' },
      { l: 'TDOT traffic resources', h: 'https://www.tn.gov/tdot.html' },
    ],
    directoryHint:
      'Prefer downtown elevator/COI experience for towers; East Nashville stair/curb fluency; honest I-40/I-65 pricing. Verify TDOR intrastate and FMCSA as applicable.',
  },
];

// Remaining counties appended below in same file structure for maintainability
// (continued in second write if needed)

const more: CountySpec[] = [
  {
    slug: 'knox',
    exportName: 'knoxCountyTnIntelligence',
    hub: 'Knox County Moving Intelligence Hub',
    eyebrow: 'Knox · Knoxville core, university influence & foothills access',
    h1: 'Moving in Knox County: Knoxville Core, UT Influence & I-40/I-75 Logistics',
    opener:
      'Knox County is East Tennessee’s regional hub: downtown and Fort Sanders multi-unit near the University of Tennessee, foothill neighborhoods with driveway grades, West Knoxville multi-family and HOA growth, and I-40/I-75 logistics that are not Nashville music-core or Memphis river loops. A Fort Sanders walk-up, a Sequoyah Hills home, a Turkey Creek multi-family unit, and a Halls-edge tract do not share truck access or portal time. This hub is for Knox — not Sevier tourism copy or Blount foothill overflow alone.',
    corridors: 'I-40 · I-75 · I-640 · US-129 · Alcoa Hwy · Kingston Pike',
    differentIntro: 'These are Knoxville regional realities — university turns, foothill grades, and I-40/I-75 corridors — not Nashville towers or Sevier cabin logistics.',
    differentBullets: [
      { t: 'University lease waves reshape multi-family demand', d: 'August/May clusters near campus fill crews early.' },
      { t: 'Foothill driveways add grade and turn-radius risk', d: 'Survey access photos matter outside flat suburban lots.' },
      { t: 'I-40 / I-75 / I-640 define portal-to-portal time', d: 'Cross-county pairs look local on maps and regional at peak.' },
      { t: 'West Knoxville multi-family is HOA-dense growth product', d: 'Gate lists and approved hours appear more often than downtown alleys.' },
      { t: 'Knox ↔ Blount pairs are everyday regional logistics', d: 'Keep county lines clear for drive time and authority assumptions.' },
    ],
    zonesHeading: 'Knox access zones',
    zonesIntro: 'Plan by downtown/Fort Sanders, west Knoxville growth, north/south corridors, and foothill edges.',
    zones: [
      { id: 'downtown-ut', name: 'Downtown Knoxville & Fort Sanders / UT edges', short: 'Downtown / UT', hoods: ['Downtown', 'Fort Sanders', 'UT campus edges', 'Old City edges'], housing: 'Multi-unit, older SFH, student rentals', challenges: ['Stairs and tight streets', 'Lease-end waves', 'Event-day curb pressure'], tips: 'Book academic peaks early. Photo curb and stairs. Prefer mid-week mornings.', keywords: ['knoxville', 'fort sanders', 'downtown', 'ut'] },
      { id: 'west-knox', name: 'West Knoxville multi-family & Kingston Pike', short: 'West Knoxville', hoods: ['West Knoxville', 'Bearden', 'Turkey Creek edges', 'Kingston Pike multi-family'], housing: 'Multi-family, townhomes, HOA SFH', challenges: ['Kingston Pike congestion', 'Elevator buildings', 'Long portal time to downtown'], tips: 'Collect HOA packets. Build arterial buffer. Confirm elevator reservations.', keywords: ['west knoxville', 'bearden', 'turkey creek', 'kingston pike'] },
      { id: 'north-south', name: 'North & south Knox corridors', short: 'N/S corridors', hoods: ['Halls edges', 'Fountain City', 'South Knoxville', 'Chapman Highway edges'], housing: 'SFH, multi-family, mixed tracts', challenges: ['I-640 / arterial congestion', 'Varied driveway access', 'Longer empty miles'], tips: 'Prefer early starts. Survey driveway depth. Price long corridor pairs honestly.', keywords: ['halls', 'fountain city', 'south knoxville', 'chapman'] },
      { id: 'foothill-edges', name: 'Foothill edges & Alcoa Hwy approaches', short: 'Foothill edges', hoods: ['Sequoyah Hills', 'Westland edges', 'Alcoa Hwy approaches', 'Hillside driveways'], housing: 'Hillside SFH, some multi-family', challenges: ['Grades and turn radius', 'Weather-sensitive surfaces', 'Limited alternate routes'], tips: 'Survey grade and truck length. Discuss shuttle carries when needed.', keywords: ['sequoyah', 'alcoa hwy', 'westland', 'foothills'] },
    ],
    costIntro: 'University turns, foothill access, and freeway portal time drive quotes.',
    costDrivers: [
      { t: 'Campus multi-family lease waves', d: 'Peak academic windows raise pricing risk.' },
      { t: 'Foothill long carries', d: 'Labor hours rise when trucks cannot park at the door.' },
      { t: 'I-40 / I-75 congestion', d: 'Portal-to-portal spikes at peak.' },
      { t: 'West Knox HOA soft costs', d: 'Gate lists push demand into peak windows.' },
    ],
    ranges: [
      { l: 'Studio / 1BR (simple access)', v: '$400–$1,250+', n: 'Higher near campus peaks' },
      { l: '2–3BR condo or modest SFH', v: '$1,250–$3,500+', n: 'Foothill access trends up' },
      { l: '3–4+ BR / long local / cross-county', v: '$2,300–$6,600+', n: 'Long I-40 pairs price highest' },
      { l: 'Typical 2-person crew rate', v: '$100–$175+/hr', n: 'Portal-to-portal' },
    ],
    seasonalIntro: 'University calendars, family seasons, and summer storms reshape access.',
    seasonal: [
      { t: 'Best windows: mid-week early mornings', d: 'Reduce Kingston Pike and I-40 pain.' },
      { t: 'UT move-in/out peaks', d: 'Book August/May clusters early for campus-adjacent product.' },
      { t: 'Peak family season: late May–mid-August', d: 'Suburban Saturdays fill first.' },
      { t: 'Summer heat and storms', d: 'Prefer early starts; confirm weather contingency.' },
    ],
    specializedId: 'knoxville-ut-foothills',
    specializedTitle: 'Knoxville university & foothills logistics module',
    specializedIntro: 'Knox estimates fail when UT lease waves or hillside access are ignored.',
    specializedBullets: [
      'Book academic peaks early for Fort Sanders multi-family.',
      'Survey driveway grade on foothill addresses.',
      'Price I-40/I-75 pairs portal-to-portal.',
      'Clarify Knox vs Blount destinations.',
      'Verify TDOR intrastate authority for in-state-only jobs and FMCSA for interstate legs.',
    ],
    schools: [
      { t: 'How districts work here', d: 'Knox County Schools is the primary public K–12 system. Assignment is address-based.' },
      { t: 'Research sources', d: 'District tools, Tennessee DOE data, and campus visits beat ranking screenshots.' },
    ],
    hospitals: [
      { t: 'Major systems', d: 'University of Tennessee Medical Center, Covenant Health, and other facilities serve Knoxville corridors. Confirm networks.' },
      { t: 'What relocators should do', d: 'Map peak-hour drive times from west Knoxville and foothill edges. Transfer records early.' },
    ],
    housing: [
      { t: 'Near-campus vs west growth stock', d: 'Student multi-unit near UT; HOA multi-family and SFH dominate west growth.' },
      { t: 'Foothill access realities', d: 'Grades and limited turn radius affect move day more than square footage alone.' },
    ],
    townFit: [
      { t: 'Downtown / UT lifestyle', d: 'Urban and campus proximity with stair/curb tradeoffs.' },
      { t: 'West Knoxville pattern', d: 'Retail and multi-family amenities with arterial congestion.' },
      { t: 'Foothill lifestyle', d: 'Views and grades with driveway logistics.' },
    ],
    jobs: [
      { t: 'Employment anchors', d: 'Education, healthcare, energy/research, logistics, and professional services shape employment.' },
      { t: 'Commute realism', d: 'I-40, I-75, and Kingston Pike peaks are real. Test drive peak routes.' },
    ],
    lifestyle: [
      { t: 'East Tennessee regional hub identity', d: 'Knox is distinct from Nashville music-core, Memphis river logistics, and Sevier tourism peaks.' },
      { t: 'Climate', d: 'Hot humid summers and storms; foothill weather can differ from valley floors.' },
    ],
    resources: [
      { l: 'Knox County — official site', h: 'https://www.knoxcounty.org/' },
      { l: 'City of Knoxville', h: 'https://www.knoxvilletn.gov/' },
      { l: 'Knox County Schools', h: 'https://www.knoxschools.org/', n: 'Boundaries & calendars' },
      { l: 'TDOT traffic resources', h: 'https://www.tn.gov/tdot.html' },
    ],
    directoryHint:
      'Prefer UT multi-family experience for campus peaks; foothill grade surveys; honest I-40/I-75 pricing. Verify TDOR intrastate and FMCSA as applicable.',
  },
  {
    slug: 'hamilton',
    exportName: 'hamiltonCountyTnIntelligence',
    hub: 'Hamilton County Moving Intelligence Hub',
    eyebrow: 'Hamilton · Chattanooga river/mountain-edge logistics & downtown revival',
    h1: 'Moving in Hamilton County: Chattanooga Downtown, River Access & I-24 Logistics',
    opener:
      'Hamilton County is Chattanooga’s river-and-ridge market: downtown revival multi-unit, North Shore and Southside pockets, mountain-edge driveways, and I-24 logistics that punish estimates built for flat Piedmont freeways alone. A downtown loft, a North Shore craftsman, a Hixson multi-family unit, and an East Brainerd HOA home do not share truck access or portal time. This hub is for Hamilton — not Nashville core copy or Knoxville university tips.',
    corridors: 'I-24 · I-75 · US-27 · TN-153 · Broad Street corridor',
    differentIntro: 'These are Chattanooga river/mountain-edge realities — downtown revival product and I-24 timing — not Memphis loops or Sevier tourism spurs.',
    differentBullets: [
      { t: 'Downtown multi-unit is elevator-first on many addresses', d: 'Building packets and dock rules beat verbal access promises.' },
      { t: 'Mountain-edge grades appear outside the river core', d: 'Survey turn radius and driveway slope before final pricing.' },
      { t: 'I-24 / I-75 define portal-to-portal time', d: 'Cross-county and cross-town pairs burn clock at peak.' },
      { t: 'River-adjacent curb competition on event days', d: 'Waterfront and downtown events can close staging windows.' },
      { t: 'Georgia border pairs are routine', d: 'Clarify Tennessee vs Georgia destinations for TDOR vs FMCSA assumptions.' },
    ],
    zonesHeading: 'Hamilton access zones',
    zonesIntro: 'Plan by downtown/Southside, North Shore, Hixson/north corridors, and East Brainerd growth.',
    zones: [
      { id: 'downtown-southside', name: 'Downtown Chattanooga & Southside', short: 'Downtown / Southside', hoods: ['Downtown', 'Southside', 'MLK District edges', 'Riverfront multi-unit'], housing: 'Lofts, mid-rises, renovated multi-unit', challenges: ['COI/elevators', 'Event-day curb pressure', 'Tight historic streets'], tips: 'Get building packets early. Prefer mid-week mornings. Avoid major event nights when flexible.', keywords: ['chattanooga', 'downtown', 'southside', 'riverfront'] },
      { id: 'north-shore', name: 'North Shore & near-river neighborhoods', short: 'North Shore', hoods: ['North Shore', 'Hill City edges', 'Stringers Ridge approaches'], housing: 'Older SFH, multi-unit, hillside homes', challenges: ['Stairs and grades', 'Limited curb', 'Bridge approach congestion'], tips: 'Photo curb and driveway grade. Prefer early starts.', keywords: ['north shore', 'hill city', 'chattanooga'] },
      { id: 'hixson-north', name: 'Hixson & northern multi-family corridors', short: 'Hixson / north', hoods: ['Hixson', 'TN-153 multi-family', 'Middle Valley edges', 'Red Bank edges'], housing: 'Multi-family, townhomes, SFH', challenges: ['TN-153 congestion', 'Elevator buildings', 'Longer empty miles from downtown yards'], tips: 'Build TN-153 buffer. Confirm elevator reservations. Collect HOA packets where applicable.', keywords: ['hixson', 'red bank', 'middle valley'] },
      { id: 'east-brainerd', name: 'East Brainerd & eastern growth', short: 'East Brainerd', hoods: ['East Brainerd', 'Ooltewah edges', 'Apison edges', 'HOA villages'], housing: 'HOA SFH, townhomes, multi-family', challenges: ['I-75 congestion', 'HOA rules', 'Long portal time to river core'], tips: 'Collect HOA packets. Price I-75 pairs honestly. Clarify Hamilton vs Georgia border addresses.', keywords: ['east brainerd', 'ooltewah', 'apison'] },
    ],
    costIntro: 'Elevator buildings, grades, and I-24 portal time drive quotes.',
    costDrivers: [
      { t: 'Downtown elevator / COI buildings', d: 'Labor and wait time dominate core jobs.' },
      { t: 'Mountain-edge long carries', d: 'Grade access raises labor hours.' },
      { t: 'I-24 / I-75 congestion', d: 'Portal-to-portal spikes at peak.' },
      { t: 'Cross-border empty miles', d: 'Georgia destinations change staging and authority assumptions.' },
    ],
    ranges: [
      { l: 'Studio / 1BR (simple access)', v: '$400–$1,300+', n: 'Higher with elevators or grades' },
      { l: '2–3BR condo or modest SFH', v: '$1,300–$3,600+', n: 'HOA soft costs trend up' },
      { l: '3–4+ BR / long local / cross-border', v: '$2,400–$6,900+', n: 'Long I-24 pairs price highest' },
      { l: 'Typical 2-person crew rate', v: '$100–$175+/hr', n: 'Portal-to-portal' },
    ],
    seasonalIntro: 'Tourism, riverfront events, and family seasons reshape access.',
    seasonal: [
      { t: 'Best windows: mid-week early mornings', d: 'Clear curb and reduce I-24 pain.' },
      { t: 'Peak family season: late May–mid-August', d: 'Book suburban Saturdays early.' },
      { t: 'Event and tourism weekends', d: 'Downtown staging competes with visitors — prefer mid-week when flexible.' },
      { t: 'Summer heat and storms', d: 'Prefer early starts; confirm weather contingency.' },
    ],
    specializedId: 'chattanooga-river-ridge',
    specializedTitle: 'Chattanooga river/ridge & I-24 logistics module',
    specializedIntro: 'Hamilton estimates fail when downtown elevators or mountain-edge grades are ignored.',
    specializedBullets: [
      'Request downtown building packets early.',
      'Survey driveway grade on ridge-edge addresses.',
      'Price I-24/I-75 pairs portal-to-portal.',
      'Clarify Tennessee vs Georgia destinations.',
      'Verify TDOR intrastate authority for in-state-only jobs and FMCSA for interstate legs.',
    ],
    schools: [
      { t: 'How districts work here', d: 'Hamilton County Schools is the primary public K–12 system. Assignment is address-based.' },
      { t: 'Research sources', d: 'District tools, Tennessee DOE data, and campus visits beat ranking screenshots.' },
    ],
    hospitals: [
      { t: 'Major systems', d: 'Erlanger, CHI Memorial, and other facilities serve Chattanooga corridors. Confirm networks.' },
      { t: 'What relocators should do', d: 'Map peak-hour drive times from East Brainerd and Hixson. Transfer records early.' },
    ],
    housing: [
      { t: 'River-core multi-unit vs eastern HOA growth', d: 'Downtown lofts differ sharply from East Brainerd master plans.' },
      { t: 'Ridge-edge access realities', d: 'Grades affect move day more than square footage alone.' },
    ],
    townFit: [
      { t: 'Downtown / Southside lifestyle', d: 'Urban amenities with elevator tradeoffs.' },
      { t: 'North Shore pattern', d: 'Near-river character with stair/grade logistics.' },
      { t: 'East Brainerd growth', d: 'HOA product with I-75 commute risk.' },
    ],
    jobs: [
      { t: 'Employment anchors', d: 'Healthcare, manufacturing, logistics, tourism, education, and professional services shape employment.' },
      { t: 'Commute realism', d: 'I-24, I-75, and TN-153 peaks are real. Test drive peak routes.' },
    ],
    lifestyle: [
      { t: 'River-and-ridge identity', d: 'Hamilton is distinct from Nashville music-core and Memphis river loops despite shared “Tennessee metro” labels.' },
      { t: 'Climate', d: 'Hot humid summers and storms. Plan outdoor staging contingency.' },
    ],
    resources: [
      { l: 'Hamilton County — official site', h: 'https://www.hamiltontn.gov/' },
      { l: 'City of Chattanooga', h: 'https://chattanooga.gov/' },
      { l: 'Hamilton County Schools', h: 'https://www.hcde.org/', n: 'Boundaries & calendars' },
      { l: 'TDOT traffic resources', h: 'https://www.tn.gov/tdot.html' },
    ],
    directoryHint:
      'Prefer downtown elevator experience; ridge-edge grade surveys; honest I-24 pricing. Verify TDOR intrastate and FMCSA as applicable.',
  },
];

const ringAndSpecial: CountySpec[] = [
  {
    slug: 'rutherford',
    exportName: 'rutherfordCountyTnIntelligence',
    hub: 'Rutherford County Moving Intelligence Hub',
    eyebrow: 'Rutherford · Murfreesboro growth & Nashville southeast overflow',
    h1: 'Moving in Rutherford County: Murfreesboro Growth, HOA Construction & I-24 Logistics',
    opener:
      'Rutherford County is Nashville’s southeast growth engine: Murfreesboro multi-family and new construction, Smyrna and La Vergne industrial-adjacent housing, and I-24 portal time into Davidson that is not Williamson estate product and not downtown Nashville elevators. A Medical Center Parkway multi-family unit, a Murfreesboro HOA two-story, a Smyrna townhome, and a rural-edge lot do not share truck access or empty-mile risk. This hub is for Rutherford — not a Davidson or Williamson clone.',
    corridors: 'I-24 · US-41/70S · TN-840 links · Medical Center Pkwy · Old Fort Pkwy',
    differentIntro: 'Southeast Nashville overflow with new construction density — not premium Williamson estates or Sumner lake-edge patterns.',
    differentBullets: [
      { t: 'New construction and HOA villages dominate many addresses', d: 'Gate lists, driveway mud, and unfinished streets are routine on growth edges.' },
      { t: 'I-24 defines Nashville-linked portal time', d: 'Cross-county pairs burn clock at peak.' },
      { t: 'University and multi-family lease waves exist in Murfreesboro', d: 'Book academic and month-end clusters early.' },
      { t: 'Industrial-adjacent corridors near Smyrna change staging', d: 'Freight traffic and curb competition differ from pure bedroom HOAs.' },
      { t: 'Rutherford is not Williamson', d: 'More growth-tract product and different price/access mix — do not reuse Franklin estate copy.' },
    ],
    zonesHeading: 'Rutherford access zones',
    zonesIntro: 'Plan by Murfreesboro core/growth, Smyrna/La Vergne, TN-840 edges, and rural south/east approaches.',
    zones: [
      { id: 'murfreesboro-growth', name: 'Murfreesboro multi-family & HOA growth', short: 'Murfreesboro growth', hoods: ['Murfreesboro', 'Medical Center Pkwy multi-family', 'Old Fort Pkwy corridors', 'HOA master plans'], housing: 'Multi-family, townhomes, HOA SFH, new construction', challenges: ['HOA rules', 'I-24 congestion', 'Construction-site access'], tips: 'Collect HOA packets. Survey unfinished streets. Build I-24 buffer.', keywords: ['murfreesboro', 'medical center', 'old fort'] },
      { id: 'smyrna-lavergne', name: 'Smyrna, La Vergne & industrial-adjacent housing', short: 'Smyrna / La Vergne', hoods: ['Smyrna', 'La Vergne', 'Nissan Drive edges', 'I-24 multi-family'], housing: 'Multi-family, townhomes, SFH', challenges: ['Freight corridor traffic', 'Elevator buildings', 'Long portal time to Nashville core'], tips: 'Prefer early starts. Confirm elevator reservations. Clarify Rutherford vs Davidson addresses.', keywords: ['smyrna', 'la vergne', 'nissan'] },
      { id: '840-edges', name: 'TN-840 edges & cross-county approaches', short: '840 edges', hoods: ['TN-840 multi-family', 'Northwest Rutherford tracts', 'Nolensville-edge (verify county)'], housing: 'HOA SFH, multi-family', challenges: ['Cross-county confusion', 'Long empty miles', 'HOA density'], tips: 'Clarify county lines. Price Davidson-linked pairs honestly.', keywords: ['840', 'nolensville edge', 'northwest rutherford'] },
      { id: 'rural-se', name: 'Southern & eastern rural-edge Rutherford', short: 'Rural SE', hoods: ['Eagleville edges', 'Eastern tracts', 'Rural driveway lots'], housing: 'SFH, rural-edge lots', challenges: ['Long empty miles', 'Soft surfaces after rain', 'Limited alternate routes'], tips: 'Survey driveway access. Prefer early starts for long pairs.', keywords: ['eagleville', 'rural rutherford'] },
    ],
    costIntro: 'I-24 empty miles, HOA soft costs, and new-construction access drive quotes.',
    costDrivers: [
      { t: 'I-24 Nashville-linked congestion', d: 'Portal-to-portal spikes at peak.' },
      { t: 'HOA gate lists and approved hours', d: 'Soft costs push demand into peak windows.' },
      { t: 'New construction site access', d: 'Unfinished streets raise time risk.' },
      { t: 'Cross-county empty miles', d: 'Davidson destinations raise staging distance.' },
    ],
    ranges: [
      { l: 'Studio / 1BR (simple access)', v: '$400–$1,250+', n: 'Higher with HOA soft costs' },
      { l: '2–3BR HOA SFH or multi-family', v: '$1,300–$3,600+', n: 'I-24 pairs trend up' },
      { l: '3–4+ BR / long Nashville-linked', v: '$2,400–$6,800+', n: 'Cross-county pairs price highest' },
      { l: 'Typical 2-person crew rate', v: '$100–$175+/hr', n: 'Portal-to-portal' },
    ],
    seasonalIntro: 'Growth construction seasons and family calendars reshape access.',
    seasonal: [
      { t: 'Best windows: mid-week early mornings', d: 'Reduce I-24 pain and clear HOA hours.' },
      { t: 'Peak family season: late May–mid-August', d: 'Book suburban Saturdays early.' },
      { t: 'University / multi-family lease waves', d: 'May/August clusters in Murfreesboro multi-family.' },
      { t: 'Summer heat and storms', d: 'Prefer early starts on open new-construction streets.' },
    ],
    specializedId: 'rutherford-i24-growth',
    specializedTitle: 'Murfreesboro growth & I-24 overflow module',
    specializedIntro: 'Rutherford estimates fail when HOA rules or Nashville empty miles are ignored.',
    specializedBullets: [
      'Collect HOA packets for master-planned villages.',
      'Survey new-construction street access before final pricing.',
      'Price I-24 Davidson pairs portal-to-portal.',
      'Do not reuse Williamson estate assumptions here.',
      'Verify TDOR intrastate authority for in-state-only jobs and FMCSA for interstate legs.',
    ],
    schools: [
      { t: 'How districts work here', d: 'Rutherford County Schools and Murfreesboro City Schools serve different addresses. Confirm zoning carefully.' },
      { t: 'Growth areas and capacity', d: 'Rapid growth corridors can see enrollment pressure. Ask about capacity when touring.' },
    ],
    hospitals: [
      { t: 'Major systems', d: 'Ascension Saint Thomas Rutherford and Nashville-metro systems serve residents. Confirm networks.' },
      { t: 'What relocators should do', d: 'Map peak-hour I-24 times into Davidson specialty care. Transfer records early.' },
    ],
    housing: [
      { t: 'Growth-tract product', d: 'New construction and HOA villages dominate many corridors.' },
      { t: 'Cost vs Williamson', d: 'Often more attainable than Franklin/Brentwood — still budget HOA dues and commute time.' },
    ],
    townFit: [
      { t: 'Murfreesboro growth lifestyle', d: 'Newer multi-family and HOA product with I-24 commute risk.' },
      { t: 'Smyrna / La Vergne pattern', d: 'Industrial-adjacent housing with freight corridor logistics.' },
    ],
    jobs: [
      { t: 'Employment anchors', d: 'Many residents commute into Davidson; local manufacturing, healthcare, education, and retail also employ residents.' },
      { t: 'Commute realism', d: 'I-24 peaks are real. Test drive peak routes into Nashville.' },
    ],
    lifestyle: [
      { t: 'Southeast Nashville overflow identity', d: 'Rutherford is growth suburb fabric — not downtown Nashville vertical living or Williamson premium estates.' },
      { t: 'Climate', d: 'Hot humid summers and storms. Plan outdoor staging contingency.' },
    ],
    resources: [
      { l: 'Rutherford County — official site', h: 'https://www.rutherfordcountytn.gov/' },
      { l: 'City of Murfreesboro', h: 'https://www.murfreesborotn.gov/' },
      { l: 'Rutherford County Schools', h: 'https://www.rcschools.net/' },
      { l: 'TDOT traffic resources', h: 'https://www.tn.gov/tdot.html' },
    ],
    directoryHint:
      'Prefer HOA and new-construction fluency; honest I-24 pricing into Davidson. Verify TDOR intrastate and FMCSA as applicable.',
  },
  {
    slug: 'williamson',
    exportName: 'williamsonCountyTnIntelligence',
    hub: 'Williamson County Moving Intelligence Hub',
    eyebrow: 'Williamson · Franklin/Brentwood affluent suburbs & higher-value inventory',
    h1: 'Moving in Williamson County: Franklin Estates, Brentwood Access & I-65 Logistics',
    opener:
      'Williamson County is Nashville’s premium south corridor: Franklin and Brentwood estate and HOA product, Cool Springs multi-family and corporate campuses, higher-value inventories that need careful handling, and I-65 portal time that is not Rutherford growth-tract logistics and not downtown Davidson elevators. A Brentwood estate, a Franklin historic-district home, a Cool Springs mid-rise, and a Nolensville-edge HOA two-story do not share truck access or handling expectations. This hub is for Williamson — not a Rutherford or Sumner clone.',
    corridors: 'I-65 · TN-840 · US-31 · Cool Springs Blvd · Hillsboro Rd corridors',
    differentIntro: 'Premium south-Nashville suburbs with higher-value inventory and dense HOA rules — not Murfreesboro growth tracts or Hendersonville lake edges.',
    differentBullets: [
      { t: 'Higher-value inventory is common', d: 'Discuss valuation, padding, and specialty handling early — cheap released-value coverage is often inadequate.' },
      { t: 'HOA and estate access dominate many addresses', d: 'Gate lists, long driveways, and approved hours are routine.' },
      { t: 'I-65 defines Nashville-linked portal time', d: 'Cross-county pairs burn clock at peak.' },
      { t: 'Cool Springs multi-unit is elevator product', d: 'Building packets still apply even outside downtown Nashville.' },
      { t: 'Williamson is not Rutherford', d: 'Premium access and handling expectations differ from southeast growth-tract moves.' },
    ],
    zonesHeading: 'Williamson access zones',
    zonesIntro: 'Plan by Franklin core/estates, Brentwood, Cool Springs multi-family, and eastern/southern growth edges.',
    zones: [
      { id: 'franklin', name: 'Franklin historic core & estate edges', short: 'Franklin', hoods: ['Franklin', 'Downtown Franklin edges', 'Fieldstone Farms edges', 'Estate corridors'], housing: 'Historic SFH, estates, HOA villages, some multi-family', challenges: ['Tight historic streets', 'Long estate driveways', 'HOA rules'], tips: 'Survey driveway length. Collect HOA packets. Prefer mid-week mornings near downtown Franklin.', keywords: ['franklin', 'fieldstone', 'williamson'] },
      { id: 'brentwood', name: 'Brentwood estates & multi-family', short: 'Brentwood', hoods: ['Brentwood', 'Maryland Farms edges', 'Concord Rd corridors', 'Estate HOAs'], housing: 'Estates, HOA SFH, multi-family', challenges: ['Gate lists', 'High-value contents', 'I-65 congestion'], tips: 'Discuss valuation early. Photo gate and driveway. Build I-65 buffer.', keywords: ['brentwood', 'maryland farms'] },
      { id: 'cool-springs', name: 'Cool Springs corporate & multi-unit', short: 'Cool Springs', hoods: ['Cool Springs', 'Mallory Station multi-family', 'Carothers multi-family'], housing: 'Mid-rise multi-family, townhomes', challenges: ['Elevators and COI', 'Retail/corporate congestion', 'Lease-end waves'], tips: 'Reserve elevators in writing. Prefer early starts. Confirm building packets.', keywords: ['cool springs', 'mallory station'] },
      { id: 'east-south-growth', name: 'Nolensville-edge & southern growth', short: 'E/S growth', hoods: ['Nolensville edges', 'Thompson Station edges', 'Southern HOA villages'], housing: 'HOA SFH, townhomes', challenges: ['Long empty miles', 'HOA density', 'County-line confusion with Rutherford/Davidson'], tips: 'Clarify county lines. Price long pairs honestly. Collect HOA packets.', keywords: ['nolensville', 'thompson station'] },
    ],
    costIntro: 'Higher-value handling, HOA soft costs, and I-65 portal time drive quotes above typical growth-suburb averages.',
    costDrivers: [
      { t: 'High-value inventory handling', d: 'Specialty protection and survey rigor raise labor hours.' },
      { t: 'Estate and HOA access rules', d: 'Gate lists and long carries dominate many jobs.' },
      { t: 'I-65 Nashville-linked congestion', d: 'Portal-to-portal spikes at peak.' },
      { t: 'Cool Springs elevator buildings', d: 'COI and wait time add cost.' },
    ],
    ranges: [
      { l: 'Studio / 1BR (simple access)', v: '$500–$1,500+', n: 'Higher with elevators' },
      { l: '2–3BR condo or modest SFH', v: '$1,600–$4,500+', n: 'HOA and handling soft costs trend up' },
      { l: '3–4+ BR estate / high-value', v: '$3,000–$9,500+', n: 'Estates and careful-handling inventories price highest' },
      { l: 'Typical 2-person crew rate', v: '$120–$200+/hr', n: 'Portal-to-portal; specialty crews scale up' },
    ],
    seasonalIntro: 'Family seasons and corporate calendars reshape premium-suburb access.',
    seasonal: [
      { t: 'Best windows: mid-week early mornings', d: 'Reduce I-65 pain and clear HOA hours.' },
      { t: 'Peak family season: late May–mid-August', d: 'Book estate and HOA Saturdays early.' },
      { t: 'Corporate apartment turns', d: 'Mid-month Cool Springs demand competes with weekend SFH.' },
      { t: 'Summer heat and storms', d: 'Prefer early starts; protect high-value outdoor staging.' },
    ],
    specializedId: 'williamson-premium-hoa',
    specializedTitle: 'Franklin/Brentwood premium HOA & high-value module',
    specializedIntro: 'Williamson estimates fail when estate access or valuation is treated as generic suburb work.',
    specializedBullets: [
      'Discuss valuation and specialty handling at survey.',
      'Collect HOA and gate packets early.',
      'Survey long driveways and truck turn radius on estates.',
      'Price I-65 Davidson pairs portal-to-portal.',
      'Do not reuse Rutherford growth-tract assumptions here.',
      'Verify TDOR intrastate authority for in-state-only jobs and FMCSA for interstate legs.',
    ],
    schools: [
      { t: 'How districts work here', d: 'Williamson County Schools and Franklin Special School District serve different addresses. Confirm zoning carefully.' },
      { t: 'Research sources', d: 'District tools, Tennessee DOE data, and campus visits beat ranking screenshots.' },
    ],
    hospitals: [
      { t: 'Major systems', d: 'Williamson Medical Center and Nashville-metro systems serve residents. Confirm networks.' },
      { t: 'What relocators should do', d: 'Map peak-hour I-65 times into Davidson specialty care. Transfer records early.' },
    ],
    housing: [
      { t: 'Premium HOA and estate stock', d: 'Higher purchase prices often pair with stricter move-day rules and higher-value contents.' },
      { t: 'Cool Springs multi-unit', d: 'Elevator product with corporate lease dynamics.' },
    ],
    townFit: [
      { t: 'Franklin lifestyle', d: 'Historic core amenities with estate and HOA logistics.' },
      { t: 'Brentwood pattern', d: 'Premium residential with gate and driveway access friction.' },
      { t: 'Cool Springs multi-unit', d: 'Corporate proximity with elevator tradeoffs.' },
    ],
    jobs: [
      { t: 'Employment anchors', d: 'Many residents work in Davidson; Cool Springs corporate campuses and healthcare also employ locals.' },
      { t: 'Commute realism', d: 'I-65 peaks are real. Test drive peak routes into Nashville.' },
    ],
    lifestyle: [
      { t: 'Premium south-corridor identity', d: 'Williamson is distinct from Rutherford growth tracts and Sumner lake-edge suburbs.' },
      { t: 'Climate', d: 'Hot humid summers and storms. Plan outdoor staging contingency for high-value goods.' },
    ],
    resources: [
      { l: 'Williamson County — official site', h: 'https://www.williamsoncounty-tn.gov/' },
      { l: 'City of Franklin', h: 'https://www.franklintn.gov/' },
      { l: 'City of Brentwood', h: 'https://www.brentwoodtn.gov/' },
      { l: 'Williamson County Schools', h: 'https://www.wcs.edu/' },
      { l: 'TDOT traffic resources', h: 'https://www.tn.gov/tdot.html' },
    ],
    directoryHint:
      'Prefer high-value handling and estate/HOA fluency; Cool Springs elevator experience; honest I-65 pricing. Verify TDOR intrastate and FMCSA as applicable.',
  },
  {
    slug: 'montgomery',
    exportName: 'montgomeryCountyTnIntelligence',
    hub: 'Montgomery County Moving Intelligence Hub',
    eyebrow: 'Montgomery · Clarksville, Fort Campbell PCS & military household patterns',
    h1: 'Moving in Montgomery County: Fort Campbell PCS Timelines, Clarksville Access & I-24 Logistics',
    opener:
      'Montgomery County is a military-timeline market: Fort Campbell PCS orders compress surveys and load days; Clarksville multi-family corridors absorb high turnover; and I-24 / US-41A logistics dominate pairs that look local on a map. A base-adjacent apartment, a downtown Clarksville walk-up, a Sango HOA two-story, and a rural-edge house do not share truck access or order-driven timing. This hub is for Montgomery — not Nashville suburb overflow copy and not a renamed Cumberland NC page.',
    corridors: 'I-24 · US-41A · TN-374 · 101st Airborne Pkwy · Fort Campbell Blvd',
    differentIntro: 'PCS-driven calendars and base-adjacent housing turnover — Army installation logistics on the TN/KY border, not Nashville music-core.',
    differentBullets: [
      { t: 'PCS orders rewrite booking lead time', d: 'Military household moves often have fixed report dates. Flexible civilian weekend windows are not the default.' },
      { t: 'High multi-family turnover near base-access corridors', d: 'Elevators, parking, and lease-end clusters stack around permanent-change cycles.' },
      { t: 'I-24 and US-41A define portal time', d: 'Cross-town and regional pairs burn clock at peak.' },
      { t: 'Kentucky border pairs are routine', d: 'Clarify Tennessee vs Kentucky destinations for TDOR vs FMCSA assumptions.' },
      { t: 'Montgomery is not a Nashville suburb ring county', d: 'Military timelines dominate more than HOA-only growth patterns.' },
    ],
    zonesHeading: 'Montgomery access zones',
    zonesIntro: 'Plan by base-adjacent multi-family, central Clarksville, Sango/growth edges, and rural approaches.',
    zones: [
      { id: 'base-adjacent', name: 'Fort Campbell–adjacent multi-family', short: 'Base-adjacent', hoods: ['Fort Campbell Blvd corridors', '101st Airborne Pkwy multi-family', 'Base housing-adjacent rentals'], housing: 'Multi-family, townhomes, military-workforce rentals', challenges: ['PCS lease-end waves', 'Access/ID rules', 'Tight parking'], tips: 'Confirm access requirements early. Align to order dates. Photo elevators and parking.', keywords: ['fort campbell', 'clarksville', '101st', 'fort campbell blvd'] },
      { id: 'central-clarksville', name: 'Central Clarksville corridors', short: 'Central Clarksville', hoods: ['Downtown Clarksville', 'Madison Street corridors', 'Older SFH pockets', 'Multi-family near retail'], housing: 'Older SFH, multi-family, townhomes', challenges: ['Mixed access types', 'Arterial congestion', 'Month-end turnover'], tips: 'Prefer mid-week early starts when orders allow. Confirm unit access type.', keywords: ['clarksville', 'madison street', 'downtown'] },
      { id: 'sango-growth', name: 'Sango & southern growth', short: 'Sango growth', hoods: ['Sango', 'TN-374 multi-family', 'Southern HOA villages'], housing: 'HOA SFH, multi-family, townhomes', challenges: ['HOA rules', 'Longer empty miles from base-edge yards', 'Peak arterial congestion'], tips: 'Collect HOA packets. Price long pairs honestly.', keywords: ['sango', 'south clarksville'] },
      { id: 'rural-edges', name: 'Rural & eastern Montgomery edges', short: 'Rural edges', hoods: ['Woodlawn edges', 'Rural driveway lots', 'Eastern tracts'], housing: 'SFH, rural-edge lots', challenges: ['Long empty miles', 'Soft surfaces after rain', 'Limited alternate routes'], tips: 'Survey driveway access. Prefer early starts for long pairs.', keywords: ['woodlawn', 'rural montgomery'] },
    ],
    costIntro: 'PCS timing pressure, multi-family access, and I-24 empty miles drive quotes.',
    costDrivers: [
      { t: 'Compressed PCS timelines', d: 'Rush calendars raise peak pricing risk.' },
      { t: 'Multi-family elevators and parking', d: 'Base-adjacent apartments add labor and wait time.' },
      { t: 'I-24 / US-41A congestion', d: 'Portal-to-portal spikes at peak.' },
      { t: 'Cross-border empty miles', d: 'Kentucky destinations change staging and authority assumptions.' },
    ],
    ranges: [
      { l: 'Studio / 1BR (simple access)', v: '$400–$1,200+', n: 'Higher near base multi-family peaks' },
      { l: '2–3BR apartment or modest SFH', v: '$1,200–$3,400+', n: 'PCS rush windows trend up' },
      { l: '3–4+ BR / long local / interstate start', v: '$2,200–$7,200+', n: 'Interstate PCS legs are full household goods jobs' },
      { l: 'Typical 2-person crew rate', v: '$100–$170+/hr', n: 'Portal-to-portal for local legs' },
    ],
    seasonalIntro: 'Military PCS seasons and family calendars stack demand tightly.',
    seasonal: [
      { t: 'PCS peak seasons', d: 'High-volume windows fill crews first. Book to order dates immediately.' },
      { t: 'Best flexible windows: mid-week early mornings', d: 'Reduce arterial pain when orders allow.' },
      { t: 'Month-end multi-family turns', d: 'Lease clusters near base corridors fill early.' },
      { t: 'Summer heat and storms', d: 'Prefer early starts; confirm weather contingency.' },
    ],
    specializedId: 'fort-campbell-pcs',
    specializedTitle: 'Fort Campbell PCS logistics module',
    specializedIntro: 'Montgomery estimates fail when military report dates or base-access rules are ignored.',
    specializedBullets: [
      'Align survey, pack, and delivery to PCS timelines.',
      'Confirm IDs and access rules for base-adjacent multi-family.',
      'Demand written inventories and valuation discussions early.',
      'Price I-24 and US-41A pairs portal-to-portal.',
      'Clarify Tennessee vs Kentucky destinations.',
      'Verify TDOR for in-state-only legs and FMCSA for interstate PCS shipments.',
    ],
    schools: [
      { t: 'How districts work here', d: 'Clarksville-Montgomery County School System is the primary public K–12 system. Assignment is address-based; military families should confirm zoning for off-post housing.' },
      { t: 'Turnover and capacity', d: 'High military mobility can affect enrollment patterns. Ask about calendars and capacity when touring.' },
    ],
    hospitals: [
      { t: 'Major systems', d: 'Tennova and other facilities serve Clarksville corridors; military beneficiaries also navigate TRICARE networks. Confirm coverage.' },
      { t: 'What relocators should do', d: 'Map drive times from base-adjacent housing. Transfer records early.' },
    ],
    housing: [
      { t: 'Base-adjacent multi-family density', d: 'High turnover product near major boulevards.' },
      { t: 'Military housing decisions', d: 'On-post vs off-post choices change access rules and commute patterns.' },
    ],
    townFit: [
      { t: 'Base-adjacent convenience', d: 'Short commute with multi-family move-day logistics.' },
      { t: 'Central Clarksville pattern', d: 'Mixed stock with arterial congestion.' },
      { t: 'Sango growth pattern', d: 'HOA product with longer portal time toward base gates.' },
    ],
    jobs: [
      { t: 'Employment anchors', d: 'Military installation, healthcare, education, retail, and logistics shape employment.' },
      { t: 'Commute realism', d: 'I-24, US-41A, and Fort Campbell Blvd peaks are real. Test drive peak routes.' },
    ],
    lifestyle: [
      { t: 'Military-community identity', d: 'Montgomery rhythms follow installation calendars more than Nashville suburb rings.' },
      { t: 'Climate', d: 'Hot humid summers and storms. Plan outdoor staging contingency.' },
    ],
    resources: [
      { l: 'Montgomery County — official site', h: 'https://mcgtn.org/' },
      { l: 'City of Clarksville', h: 'https://www.cityofclarksville.com/' },
      { l: 'CMCSS schools', h: 'https://www.cmcss.net/' },
      { l: 'Fort Campbell (official)', h: 'https://home.army.mil/campbell/', n: 'Installation information; confirm contractor access rules' },
      { l: 'TDOT traffic resources', h: 'https://www.tn.gov/tdot.html' },
    ],
    directoryHint:
      'Prefer PCS-fluent crews for Fort Campbell timelines; multi-family experience on base-adjacent corridors. Verify TDOR for in-state legs and FMCSA for interstate PCS.',
  },
  {
    slug: 'sumner',
    exportName: 'sumnerCountyTnIntelligence',
    hub: 'Sumner County Moving Intelligence Hub',
    eyebrow: 'Sumner · Hendersonville/Gallatin north-Nashville growth & lake-adjacent suburbs',
    h1: 'Moving in Sumner County: Hendersonville Growth, Gallatin Access & I-65 Logistics',
    opener:
      'Sumner County is Nashville’s northern growth ring: Hendersonville multi-family and HOA product, Gallatin town and industrial-adjacent edges, lake-adjacent suburbs, and Vietnam Veterans Blvd / I-65 portal time that is not Williamson premium estates and not Wilson’s I-40 east corridor. A Hendersonville HOA two-story, a Gallatin multi-family unit, a lake-edge home, and a Portland-edge tract do not share truck access or empty-mile risk. This hub is for Sumner — not a Davidson or Rutherford clone.',
    corridors: 'I-65 · Vietnam Veterans Blvd · US-31E · TN-386 · Gallatin Pike',
    differentIntro: 'North-Nashville growth and lake-adjacent suburbs — not Franklin estates or Murfreesboro I-24 growth tracts.',
    differentBullets: [
      { t: 'Vietnam Veterans Blvd and I-65 define portal time', d: 'Cross-county pairs into Davidson burn clock at peak.' },
      { t: 'HOA density is common in Hendersonville corridors', d: 'Gate lists and approved hours are routine.' },
      { t: 'Lake-adjacent access can mean longer driveways and seasonal traffic', d: 'Survey access photos beat map miles.' },
      { t: 'Gallatin stock can differ from pure bedroom HOAs', d: 'Town and industrial-adjacent edges need different surveys.' },
      { t: 'Sumner is not Wilson or Williamson', d: 'North-corridor logistics differ from I-40 east growth and south premium suburbs.' },
    ],
    zonesHeading: 'Sumner access zones',
    zonesIntro: 'Plan by Hendersonville growth, Gallatin core, lake-adjacent edges, and northern towns.',
    zones: [
      { id: 'hendersonville', name: 'Hendersonville multi-family & HOA growth', short: 'Hendersonville', hoods: ['Hendersonville', 'Vietnam Veterans Blvd multi-family', 'HOA master plans', 'Indian Lake edges'], housing: 'HOA SFH, multi-family, townhomes', challenges: ['HOA rules', 'TN-386 / VVB congestion', 'Long portal time to Nashville core'], tips: 'Collect HOA packets. Build VVB/I-65 buffer. Prefer early starts.', keywords: ['hendersonville', 'indian lake', 'vvb'] },
      { id: 'gallatin', name: 'Gallatin core & multi-family', short: 'Gallatin', hoods: ['Gallatin', 'Downtown Gallatin edges', 'US-31E multi-family', 'Industrial-adjacent residential'], housing: 'SFH, multi-family, townhomes', challenges: ['Mixed access types', 'Arterial congestion', 'Longer empty miles from Hendersonville yards'], tips: 'Confirm unit access type. Prefer mid-week mornings. Survey industrial-edge staging carefully.', keywords: ['gallatin', 'us-31e'] },
      { id: 'lake-edge', name: 'Lake-adjacent residential edges', short: 'Lake edge', hoods: ['Old Hickory Lake edges', 'Lake-adjacent SFH', 'Seasonal recreation corridors'], housing: 'SFH, some multi-family', challenges: ['Longer driveways', 'Seasonal traffic pulses', 'Weather-sensitive approaches'], tips: 'Share driveway photos. Build seasonal buffer on summer weekends.', keywords: ['old hickory lake', 'lake'] },
      { id: 'north-towns', name: 'Portland, White House edges & northern towns', short: 'North towns', hoods: ['Portland', 'White House edges', 'Northern tracts'], housing: 'SFH, multi-family, rural-edge lots', challenges: ['Long empty miles', 'I-65 approach congestion', 'Varied driveway access'], tips: 'Price long north-county pairs honestly. Clarify Sumner vs Robertson addresses when relevant.', keywords: ['portland', 'white house', 'north sumner'] },
    ],
    costIntro: 'North-corridor empty miles and HOA soft costs drive quotes.',
    costDrivers: [
      { t: 'I-65 / Vietnam Veterans congestion', d: 'Portal-to-portal spikes at peak.' },
      { t: 'HOA gate lists', d: 'Soft costs push demand into peak windows.' },
      { t: 'Lake-edge long carries', d: 'Labor hours rise on long driveways.' },
      { t: 'Cross-county empty miles', d: 'Davidson destinations raise staging distance.' },
    ],
    ranges: [
      { l: 'Studio / 1BR (simple access)', v: '$400–$1,250+', n: 'Higher with HOA soft costs' },
      { l: '2–3BR HOA SFH or multi-family', v: '$1,300–$3,600+', n: 'I-65 pairs trend up' },
      { l: '3–4+ BR / long Nashville-linked', v: '$2,400–$6,800+', n: 'Cross-county pairs price highest' },
      { l: 'Typical 2-person crew rate', v: '$100–$175+/hr', n: 'Portal-to-portal' },
    ],
    seasonalIntro: 'Family seasons and summer lake traffic reshape access.',
    seasonal: [
      { t: 'Best windows: mid-week early mornings', d: 'Reduce VVB/I-65 pain.' },
      { t: 'Peak family season: late May–mid-August', d: 'Book suburban Saturdays early.' },
      { t: 'Summer lake-edge weekends', d: 'Expect recreation traffic; prefer mid-week when flexible.' },
      { t: 'Summer heat and storms', d: 'Prefer early starts on open suburban streets.' },
    ],
    specializedId: 'sumner-north-ring',
    specializedTitle: 'North Nashville growth & lake-edge module',
    specializedIntro: 'Sumner estimates fail when HOA rules or Davidson empty miles are ignored.',
    specializedBullets: [
      'Collect HOA packets for Hendersonville product.',
      'Price I-65/VVB pairs portal-to-portal.',
      'Survey lake-edge driveways carefully.',
      'Do not reuse Williamson estate or Wilson I-40 assumptions here.',
      'Verify TDOR intrastate authority for in-state-only jobs and FMCSA for interstate legs.',
    ],
    schools: [
      { t: 'How districts work here', d: 'Sumner County Schools is the primary public K–12 system. Assignment is address-based.' },
      { t: 'Growth areas', d: 'Hendersonville corridors can see enrollment pressure. Ask about capacity when touring.' },
    ],
    hospitals: [
      { t: 'Major systems', d: 'Sumner Regional / Highpoint Health and Nashville-metro systems serve residents. Confirm networks.' },
      { t: 'What relocators should do', d: 'Map peak-hour times into Davidson specialty care. Transfer records early.' },
    ],
    housing: [
      { t: 'HOA growth vs lake-edge stock', d: 'Master plans dominate many corridors; lake edges add access complexity.' },
      { t: 'Cost variation', d: 'Hendersonville often prices differently from northern towns.' },
    ],
    townFit: [
      { t: 'Hendersonville lifestyle', d: 'North-ring amenities with freeway commute risk.' },
      { t: 'Gallatin pattern', d: 'Town and mixed stock with different access surveys.' },
      { t: 'Lake-edge lifestyle', d: 'Recreation access with driveway logistics.' },
    ],
    jobs: [
      { t: 'Employment anchors', d: 'Many residents commute into Davidson; local healthcare, retail, and manufacturing also employ residents.' },
      { t: 'Commute realism', d: 'I-65 and Vietnam Veterans peaks are real. Test drive peak routes into Nashville.' },
    ],
    lifestyle: [
      { t: 'North Nashville ring identity', d: 'Sumner is distinct from Wilson’s east I-40 growth and Williamson’s south premium corridor.' },
      { t: 'Climate', d: 'Hot humid summers and storms. Plan outdoor staging contingency.' },
    ],
    resources: [
      { l: 'Sumner County — official site', h: 'https://www.sumnertn.org/' },
      { l: 'City of Hendersonville', h: 'https://www.hvilletn.org/' },
      { l: 'City of Gallatin', h: 'https://www.gallatintn.gov/' },
      { l: 'Sumner County Schools', h: 'https://www.sumnerschools.org/' },
      { l: 'TDOT traffic resources', h: 'https://www.tn.gov/tdot.html' },
    ],
    directoryHint:
      'Prefer HOA fluency for Hendersonville; honest I-65/VVB pricing into Davidson. Verify TDOR intrastate and FMCSA as applicable.',
  },
  {
    slug: 'wilson',
    exportName: 'wilsonCountyTnIntelligence',
    hub: 'Wilson County Moving Intelligence Hub',
    eyebrow: 'Wilson · Mt. Juliet/Lebanon east-Nashville growth corridor',
    h1: 'Moving in Wilson County: Mt. Juliet Growth, Lebanon Access & I-40 Logistics',
    opener:
      'Wilson County is Nashville’s eastern growth corridor: Mt. Juliet multi-family and HOA product along I-40, Lebanon town and industrial-adjacent edges, and portal time into Davidson that is not Sumner’s northern VVB pattern and not Rutherford’s I-24 southeast path. A Mt. Juliet HOA two-story, a Providence multi-family unit, a Lebanon craftsman, and a rural-edge lot do not share truck access or empty-mile risk. This hub is for Wilson — not a Sumner or Williamson clone.',
    corridors: 'I-40 · US-70 · TN-109 · Mt. Juliet Road · Lebanon Pike corridors',
    differentIntro: 'East-Nashville I-40 growth — not north Sumner lake edges or south Williamson estates.',
    differentBullets: [
      { t: 'I-40 defines Nashville-linked portal time', d: 'Cross-county pairs burn clock at peak.' },
      { t: 'Mt. Juliet HOA density is common', d: 'Gate lists and approved hours are routine.' },
      { t: 'Lebanon stock can mix town SFH and industrial-adjacent multi-family', d: 'Access surveys differ from pure bedroom HOAs.' },
      { t: 'TN-109 and US-70 reshape north–south timing inside the county', d: 'Not every job is an I-40 hop.' },
      { t: 'Wilson is not Sumner or Rutherford', d: 'East I-40 logistics differ from north VVB and southeast I-24 patterns.' },
    ],
    zonesHeading: 'Wilson access zones',
    zonesIntro: 'Plan by Mt. Juliet growth, Lebanon core, I-40 multi-family corridors, and rural edges.',
    zones: [
      { id: 'mt-juliet', name: 'Mt. Juliet multi-family & HOA growth', short: 'Mt. Juliet', hoods: ['Mt. Juliet', 'Providence', 'Beckwith Rd corridors', 'HOA master plans'], housing: 'HOA SFH, multi-family, townhomes', challenges: ['HOA rules', 'I-40 congestion', 'Long portal time to Nashville core'], tips: 'Collect HOA packets. Build I-40 buffer. Prefer early starts.', keywords: ['mt juliet', 'mount juliet', 'providence'] },
      { id: 'lebanon', name: 'Lebanon core & multi-family', short: 'Lebanon', hoods: ['Lebanon', 'Downtown Lebanon edges', 'US-70 multi-family', 'Industrial-adjacent residential'], housing: 'SFH, multi-family, townhomes', challenges: ['Mixed access types', 'Arterial congestion', 'Longer empty miles from Mt. Juliet yards'], tips: 'Confirm unit access type. Prefer mid-week mornings.', keywords: ['lebanon', 'wilson county'] },
      { id: 'i40-corridor', name: 'I-40 multi-family corridor', short: 'I-40 corridor', hoods: ['I-40 multi-family', 'Belinda Pkwy edges', 'Cross-county approach multi-family'], housing: 'Multi-family, townhomes', challenges: ['Elevator buildings', 'Peak freeway congestion', 'Lease-end waves'], tips: 'Reserve elevators in writing. Book month-end early.', keywords: ['i-40', 'belinda', 'mt juliet multi-family'] },
      { id: 'rural-edges', name: 'Northern & southern rural edges', short: 'Rural edges', hoods: ['Watertown edges', 'Gladeville edges', 'Rural driveway lots'], housing: 'SFH, rural-edge lots', challenges: ['Long empty miles', 'Soft surfaces after rain', 'Limited alternate routes'], tips: 'Survey driveway access. Prefer early starts for long pairs.', keywords: ['watertown', 'gladeville', 'rural wilson'] },
    ],
    costIntro: 'I-40 empty miles and HOA soft costs drive quotes.',
    costDrivers: [
      { t: 'I-40 Nashville-linked congestion', d: 'Portal-to-portal spikes at peak.' },
      { t: 'HOA gate lists', d: 'Soft costs push demand into peak windows.' },
      { t: 'Multi-family elevators', d: 'Wait time adds labor hours.' },
      { t: 'Cross-county empty miles', d: 'Davidson destinations raise staging distance.' },
    ],
    ranges: [
      { l: 'Studio / 1BR (simple access)', v: '$400–$1,250+', n: 'Higher with HOA soft costs' },
      { l: '2–3BR HOA SFH or multi-family', v: '$1,300–$3,600+', n: 'I-40 pairs trend up' },
      { l: '3–4+ BR / long Nashville-linked', v: '$2,400–$6,800+', n: 'Cross-county pairs price highest' },
      { l: 'Typical 2-person crew rate', v: '$100–$175+/hr', n: 'Portal-to-portal' },
    ],
    seasonalIntro: 'Family seasons and multi-family lease turns reshape access.',
    seasonal: [
      { t: 'Best windows: mid-week early mornings', d: 'Reduce I-40 pain.' },
      { t: 'Peak family season: late May–mid-August', d: 'Book suburban Saturdays early.' },
      { t: 'Month-end multi-family turns', d: 'Lease clusters fill crews in Mt. Juliet multi-unit.' },
      { t: 'Summer heat and storms', d: 'Prefer early starts on open suburban streets.' },
    ],
    specializedId: 'wilson-i40-east',
    specializedTitle: 'East Nashville I-40 growth module',
    specializedIntro: 'Wilson estimates fail when HOA rules or Davidson empty miles are ignored.',
    specializedBullets: [
      'Collect HOA packets for Mt. Juliet product.',
      'Price I-40 pairs portal-to-portal.',
      'Clarify Wilson vs Davidson/Rutherford addresses.',
      'Do not reuse Sumner VVB or Williamson estate assumptions here.',
      'Verify TDOR intrastate authority for in-state-only jobs and FMCSA for interstate legs.',
    ],
    schools: [
      { t: 'How districts work here', d: 'Wilson County Schools and Lebanon Special School District serve different addresses. Confirm zoning carefully.' },
      { t: 'Growth areas', d: 'Mt. Juliet corridors can see enrollment pressure. Ask about capacity when touring.' },
    ],
    hospitals: [
      { t: 'Major systems', d: 'Vanderbilt Wilson County Hospital and Nashville-metro systems serve residents. Confirm networks.' },
      { t: 'What relocators should do', d: 'Map peak-hour I-40 times into Davidson specialty care. Transfer records early.' },
    ],
    housing: [
      { t: 'I-40 growth product', d: 'HOA multi-family and SFH dominate Mt. Juliet corridors.' },
      { t: 'Lebanon mixed stock', d: 'Town SFH and industrial-adjacent multi-family differ from pure bedroom HOAs.' },
    ],
    townFit: [
      { t: 'Mt. Juliet lifestyle', d: 'East-ring amenities with I-40 commute risk.' },
      { t: 'Lebanon pattern', d: 'Town and mixed stock with different access surveys.' },
    ],
    jobs: [
      { t: 'Employment anchors', d: 'Many residents commute into Davidson; local healthcare, retail, logistics, and manufacturing also employ residents.' },
      { t: 'Commute realism', d: 'I-40 peaks are real. Test drive peak routes into Nashville.' },
    ],
    lifestyle: [
      { t: 'East Nashville ring identity', d: 'Wilson is distinct from Sumner north growth and Rutherford southeast growth.' },
      { t: 'Climate', d: 'Hot humid summers and storms. Plan outdoor staging contingency.' },
    ],
    resources: [
      { l: 'Wilson County — official site', h: 'https://www.wilsoncountytn.gov/' },
      { l: 'City of Mt. Juliet', h: 'https://www.mtjuliet-tn.gov/' },
      { l: 'City of Lebanon', h: 'https://www.lebanontn.org/' },
      { l: 'Wilson County Schools', h: 'https://www.wcschools.com/' },
      { l: 'TDOT traffic resources', h: 'https://www.tn.gov/tdot.html' },
    ],
    directoryHint:
      'Prefer HOA fluency for Mt. Juliet; honest I-40 pricing into Davidson. Verify TDOR intrastate and FMCSA as applicable.',
  },
  {
    slug: 'blount',
    exportName: 'blountCountyTnIntelligence',
    hub: 'Blount County Moving Intelligence Hub',
    eyebrow: 'Blount · Maryville foothills, Knoxville south overflow & Smoky approaches',
    h1: 'Moving in Blount County: Maryville Access, Foothill Driveways & US-129 Logistics',
    opener:
      'Blount County is Knoxville’s southern foothill partner: Maryville and Alcoa multi-family and SFH, foothill driveways, airport-adjacent corridors, and Great Smoky approach logistics that are not Sevier tourism peaks and not Knoxville campus density alone. A Maryville HOA two-story, an Alcoa multi-family unit, a foothill driveway home, and a Townsend-edge cabin approach do not share truck access or grade risk. This hub is for Blount — not a Sevier tourism clone.',
    corridors: 'US-129 · US-321 · I-140 links · Alcoa Hwy · scenic foothill approaches',
    differentIntro: 'Foothill and Knoxville-south overflow logistics — not Pigeon Forge tourism spur congestion as the default product.',
    differentBullets: [
      { t: 'Foothill driveways add grade and turn-radius risk', d: 'Survey access photos matter outside flat suburban lots.' },
      { t: 'US-129 / Alcoa Hwy define portal time to Knoxville', d: 'Cross-county pairs burn clock at peak.' },
      { t: 'Airport-adjacent corridors change morning staging', d: 'Freight and passenger traffic pulses matter near Alcoa.' },
      { t: 'Smoky approach edges are not full Sevier tourism product', d: 'Still plan for seasonal traffic when addresses lean parkward.' },
      { t: 'Blount is not Sevier', d: 'Do not reuse Gatlinburg cabin-tourism copy for Maryville HOA jobs.' },
    ],
    zonesHeading: 'Blount access zones',
    zonesIntro: 'Plan by Maryville core, Alcoa/airport edges, foothill residential, and Townsend/park approaches.',
    zones: [
      { id: 'maryville', name: 'Maryville multi-family & SFH', short: 'Maryville', hoods: ['Maryville', 'Downtown Maryville edges', 'HOA villages', 'Multi-family corridors'], housing: 'SFH, multi-family, townhomes, HOA product', challenges: ['Arterial congestion', 'HOA rules', 'Mixed access types'], tips: 'Collect HOA packets. Prefer mid-week mornings. Confirm unit access type.', keywords: ['maryville', 'blount'] },
      { id: 'alcoa-airport', name: 'Alcoa & airport-adjacent corridors', short: 'Alcoa / airport', hoods: ['Alcoa', 'Airport Hwy edges', 'I-140 multi-family', 'Industrial-adjacent residential'], housing: 'Multi-family, SFH, townhomes', challenges: ['Airport traffic pulses', 'US-129 congestion', 'Longer empty miles from foothill addresses'], tips: 'Build US-129 buffer. Prefer early starts. Survey industrial-edge staging carefully.', keywords: ['alcoa', 'airport', 'us-129'] },
      { id: 'foothills', name: 'Foothill residential edges', short: 'Foothills', hoods: ['Foothill driveways', 'Wildwood edges', 'Hillside SFH'], housing: 'Hillside SFH, some multi-family', challenges: ['Grades and turn radius', 'Weather-sensitive surfaces', 'Limited alternate routes'], tips: 'Survey grade and truck length. Discuss shuttle carries when needed.', keywords: ['foothills', 'wildwood', 'hillside'] },
      { id: 'townsend-edge', name: 'Townsend & park-approach edges', short: 'Townsend edge', hoods: ['Townsend', 'US-321 approaches', 'Park-adjacent rentals'], housing: 'SFH, cabin-adjacent, vacation-adjacent rentals', challenges: ['Seasonal tourism traffic', 'Narrow approaches', 'Long empty miles'], tips: 'Share approach videos. Build seasonal buffer. Do not price as full Gatlinburg product without surveying.', keywords: ['townsend', 'us-321', 'smoky'] },
    ],
    costIntro: 'Foothill access and Knoxville-linked portal time drive quotes.',
    costDrivers: [
      { t: 'Foothill long carries', d: 'Labor hours rise when trucks cannot park at the door.' },
      { t: 'US-129 / Alcoa Hwy congestion', d: 'Portal-to-portal spikes at peak.' },
      { t: 'HOA soft costs in Maryville growth', d: 'Gate lists push demand into peak windows.' },
      { t: 'Seasonal park-approach traffic', d: 'Townsend edges can raise time risk in peak tourism windows.' },
    ],
    ranges: [
      { l: 'Studio / 1BR (simple access)', v: '$400–$1,250+', n: 'Higher with grades' },
      { l: '2–3BR condo or modest SFH', v: '$1,250–$3,500+', n: 'Foothill access trends up' },
      { l: '3–4+ BR / foothill / long local', v: '$2,300–$6,600+', n: 'Hillside addresses price highest' },
      { l: 'Typical 2-person crew rate', v: '$100–$175+/hr', n: 'Portal-to-portal' },
    ],
    seasonalIntro: 'Family seasons and tourism spillover reshape foothill access.',
    seasonal: [
      { t: 'Best windows: mid-week early mornings', d: 'Reduce US-129 pain.' },
      { t: 'Peak family season: late May–mid-August', d: 'Book suburban Saturdays early.' },
      { t: 'Tourism peak spillover', d: 'Park-approach edges can clog on peak weekends.' },
      { t: 'Summer heat and storms', d: 'Prefer early starts; foothill weather can differ from valley floors.' },
    ],
    specializedId: 'blount-foothills',
    specializedTitle: 'Maryville foothills & Knoxville-south overflow module',
    specializedIntro: 'Blount estimates fail when grades or US-129 empty miles are ignored.',
    specializedBullets: [
      'Survey driveway grade on foothill addresses.',
      'Price US-129/Alcoa Hwy pairs portal-to-portal.',
      'Collect HOA packets for Maryville growth product.',
      'Do not reuse Sevier tourism-cabin assumptions for standard Maryville HOA jobs.',
      'Verify TDOR intrastate authority for in-state-only jobs and FMCSA for interstate legs.',
    ],
    schools: [
      { t: 'How districts work here', d: 'Blount County Schools, Maryville City Schools, and Alcoa City Schools serve different addresses. Confirm zoning carefully.' },
      { t: 'Research sources', d: 'District tools, Tennessee DOE data, and campus visits beat ranking screenshots.' },
    ],
    hospitals: [
      { t: 'Major systems', d: 'Blount Memorial and Knoxville-metro systems serve residents. Confirm networks.' },
      { t: 'What relocators should do', d: 'Map peak-hour times into Knoxville specialty care. Transfer records early.' },
    ],
    housing: [
      { t: 'Valley towns vs foothill stock', d: 'Maryville/Alcoa multi-family and SFH differ from hillside driveways and park-approach edges.' },
      { t: 'Cost variation', d: 'Foothill and park-adjacent addresses can price differently from valley tracts.' },
    ],
    townFit: [
      { t: 'Maryville lifestyle', d: 'Town amenities with HOA and multi-family logistics.' },
      { t: 'Alcoa / airport pattern', d: 'Employment access with corridor congestion.' },
      { t: 'Foothill lifestyle', d: 'Grades and scenic access with driveway logistics.' },
    ],
    jobs: [
      { t: 'Employment anchors', d: 'Many residents commute into Knox; local manufacturing, healthcare, airport-related, and retail jobs also employ residents.' },
      { t: 'Commute realism', d: 'US-129 and Alcoa Hwy peaks are real. Test drive peak routes into Knoxville.' },
    ],
    lifestyle: [
      { t: 'Knoxville-south foothill identity', d: 'Blount is distinct from Sevier tourism peaks and Knoxville campus density.' },
      { t: 'Climate', d: 'Hot humid summers; foothill weather can shift quickly. Plan staging contingency.' },
    ],
    resources: [
      { l: 'Blount County — official site', h: 'https://www.blounttn.org/' },
      { l: 'City of Maryville', h: 'https://www.maryvillegov.com/' },
      { l: 'City of Alcoa', h: 'https://www.cityofalcoa-tn.gov/' },
      { l: 'Blount County Schools', h: 'https://www.blountk12.org/' },
      { l: 'TDOT traffic resources', h: 'https://www.tn.gov/tdot.html' },
    ],
    directoryHint:
      'Prefer foothill grade surveys; HOA fluency for Maryville growth; honest US-129 pricing into Knox. Verify TDOR intrastate and FMCSA as applicable.',
  },
  {
    slug: 'sevier',
    exportName: 'sevierCountyTnIntelligence',
    hub: 'Sevier County Moving Intelligence Hub',
    eyebrow: 'Sevier · Pigeon Forge/Gatlinburg tourism peaks & cabin logistics',
    h1: 'Moving in Sevier County: Tourism Peaks, Cabin Access & US-441 Logistics',
    opener:
      'Sevier County is a tourism-driven mountain market: Pigeon Forge and Gatlinburg curb competition, cabin and vacation-property logistics on steep or narrow approaches, seasonal congestion on US-441/US-321, and residential pockets in Sevierville that still are not Maryville HOA jobs. A Gatlinburg condo, a Pigeon Forge cabin, a Sevierville multi-family unit, and a rural mountain lot do not share truck access or seasonal timing risk. This hub is for Sevier — not Blount foothill overflow alone and not Knoxville campus density.',
    corridors: 'US-441 · US-321 · US-411 · Forks of the River Pkwy · tourism spur corridors',
    differentIntro: 'Tourism peaks and cabin/vacation-property access — not standard Knoxville suburb logistics.',
    differentBullets: [
      { t: 'Tourism calendars rewrite curb access', d: 'Peak visitor weekends can erase “normal” residential staging windows in Pigeon Forge and Gatlinburg.' },
      { t: 'Cabin and vacation-property approaches are grade- and width-sensitive', d: 'Survey turn radius, driveway grade, and shuttle needs before final pricing.' },
      { t: 'US-441 / US-321 define portal time', d: 'Short map miles can become long hours in peak season.' },
      { t: 'Humidity and mountain weather affect open staging', d: 'Protect cardboard and electronics; confirm weather contingency.' },
      { t: 'Sevier is not Blount', d: 'Tourism cabin logistics differ from Maryville HOA growth product.' },
    ],
    zonesHeading: 'Sevier access zones',
    zonesIntro: 'Plan by Sevierville, Pigeon Forge tourism core, Gatlinburg/park approaches, and rural mountain edges.',
    zones: [
      { id: 'sevierville', name: 'Sevierville multi-family & town corridors', short: 'Sevierville', hoods: ['Sevierville', 'Forks of the River multi-family', 'US-411 corridors', 'Town SFH'], housing: 'Multi-family, SFH, townhomes', challenges: ['Arterial congestion', 'Mixed access types', 'Tourism spillover traffic'], tips: 'Prefer mid-week mornings. Confirm unit access type. Build US-411 buffer in peak season.', keywords: ['sevierville', 'forks of the river'] },
      { id: 'pigeon-forge', name: 'Pigeon Forge tourism corridors', short: 'Pigeon Forge', hoods: ['Pigeon Forge', 'Parkway multi-unit', 'Tourism-adjacent rentals', 'Cabin approaches'], housing: 'Condos, cabins, multi-unit, vacation rentals', challenges: ['Severe peak curb competition', 'Association rules', 'Narrow approaches'], tips: 'Avoid peak tourist Saturdays when flexible. Get association packets. Survey cabin approaches carefully.', keywords: ['pigeon forge', 'parkway', 'cabin'] },
      { id: 'gatlinburg', name: 'Gatlinburg & park approaches', short: 'Gatlinburg', hoods: ['Gatlinburg', 'Parkway multi-unit', 'Mountain cabin approaches', 'Park entrance edges'], housing: 'Condos, cabins, multi-unit', challenges: ['Extreme tourism congestion', 'Steep/narrow approaches', 'Limited truck staging'], tips: 'Survey grade and truck length. Prefer mid-week off-peak. Discuss shuttle carries for tight cabins.', keywords: ['gatlinburg', 'smoky', 'cabin'] },
      { id: 'rural-mountain', name: 'Rural mountain edges', short: 'Rural mountain', hoods: ['Wears Valley edges', 'Rural cabin lots', 'Mountain driveway approaches'], housing: 'Cabins, SFH, rural-edge lots', challenges: ['Long empty miles', 'Soft surfaces after rain', 'Limited alternate routes'], tips: 'Share approach videos. Build weather delay language.', keywords: ['wears valley', 'rural sevier', 'cabin'] },
    ],
    costIntro: 'Tourism congestion and cabin access drive quotes far above flat-suburb averages.',
    costDrivers: [
      { t: 'Peak tourism curb competition', d: 'Time risk skyrockets on busy weekends.' },
      { t: 'Cabin grade and shuttle needs', d: 'Labor hours rise when full trucks cannot reach the door.' },
      { t: 'US-441 / US-321 congestion', d: 'Portal-to-portal spikes in peak season.' },
      { t: 'Weather contingency', d: 'Mountain fog, ice, and storms can force reschedules.' },
    ],
    ranges: [
      { l: 'Studio / 1BR (simple access)', v: '$450–$1,400+', n: 'Higher in peak tourism windows' },
      { l: '2–3BR condo or cabin (moderate access)', v: '$1,500–$4,500+', n: 'Cabin approaches trend up sharply' },
      { l: '3–4+ BR / steep cabin / peak tourism', v: '$2,800–$8,500+', n: 'Tight mountain access prices highest' },
      { l: 'Typical 2-person crew rate', v: '$110–$185+/hr', n: 'Portal-to-portal; specialty mountain access scales up' },
    ],
    seasonalIntro: 'Tourism peaks dominate more than standard family lease calendars.',
    seasonal: [
      { t: 'Best windows: mid-week off-peak tourism mornings', d: 'Clear curb in Pigeon Forge and Gatlinburg.' },
      { t: 'Summer and leaf-season peaks', d: 'Book early; expect severe congestion on US-441/US-321.' },
      { t: 'Holiday tourism spikes', d: 'Avoid peak holiday weekends when flexible.' },
      { t: 'Winter weather risk', d: 'Ice and mountain fog can delay arrivals — confirm contingency language.' },
    ],
    specializedId: 'sevier-tourism-cabin',
    specializedTitle: 'Tourism peak & cabin access module',
    specializedIntro: 'Sevier estimates fail when tourism curb rules or cabin grades are ignored.',
    specializedBullets: [
      'Survey cabin driveway grade, width, and shuttle needs before final pricing.',
      'Prefer mid-week off-peak windows in Pigeon Forge and Gatlinburg.',
      'Get association packets for condos and multi-unit tourism product.',
      'Build US-441/US-321 seasonal buffer.',
      'Do not reuse Blount Maryville HOA assumptions for cabin tourism jobs.',
      'Verify TDOR intrastate authority for in-state-only jobs and FMCSA for interstate legs.',
    ],
    schools: [
      { t: 'How districts work here', d: 'Sevier County Schools is the primary public K–12 system. Assignment is address-based.' },
      { t: 'Tourism economy context', d: 'Housing demand often follows hospitality employment more than school rankings alone.' },
    ],
    hospitals: [
      { t: 'Major systems', d: 'LeConte Medical Center and regional East Tennessee facilities serve residents. Confirm networks.' },
      { t: 'What relocators should do', d: 'Map peak-hour and tourism-affected drive times. Transfer records early.' },
    ],
    housing: [
      { t: 'Tourism multi-unit and cabin stock', d: 'Vacation rentals and cabins dominate many corridors; primary residences still exist in Sevierville and edges.' },
      { t: 'Access realities', d: 'Steep and narrow approaches matter more than square footage alone.' },
    ],
    townFit: [
      { t: 'Sevierville lifestyle', d: 'More residential town fabric with tourism spillover traffic.' },
      { t: 'Pigeon Forge / Gatlinburg pattern', d: 'Tourism density with extreme peak-season logistics.' },
      { t: 'Cabin / mountain-edge lifestyle', d: 'Scenic access with grade and shuttle tradeoffs on move day.' },
    ],
    jobs: [
      { t: 'Employment anchors', d: 'Tourism, hospitality, retail, and related services dominate; some residents commute toward Knoxville.' },
      { t: 'Commute realism', d: 'US-441 and US-321 peaks are severe in tourist season. Test drive peak routes.' },
    ],
    lifestyle: [
      { t: 'Tourism-mountain identity', d: 'Sevier is distinct from Blount foothill towns and Knoxville urban fabric.' },
      { t: 'Climate', d: 'Mountain weather shifts quickly; plan staging contingency year-round.' },
    ],
    resources: [
      { l: 'Sevier County — official site', h: 'https://www.seviercountytn.gov/' },
      { l: 'City of Sevierville', h: 'https://www.seviervilletn.org/' },
      { l: 'City of Pigeon Forge', h: 'https://www.cityofpigeonforge.com/' },
      { l: 'City of Gatlinburg', h: 'https://www.gatlinburgtn.gov/' },
      { l: 'Sevier County Schools', h: 'https://www.sevier.org/' },
      { l: 'TDOT traffic resources', h: 'https://www.tn.gov/tdot.html' },
    ],
    directoryHint:
      'Prefer cabin/mountain access experience; tourism-season curb awareness; honest US-441/US-321 seasonal pricing. Verify TDOR intrastate and FMCSA as applicable.',
  },
  {
    slug: 'sullivan',
    exportName: 'sullivanCountyTnIntelligence',
    hub: 'Sullivan County Moving Intelligence Hub',
    eyebrow: 'Sullivan · Kingsport/Bristol Tri-Cities regional patterns',
    h1: 'Moving in Sullivan County: Kingsport Access, Bristol Edges & I-81 Logistics',
    opener:
      'Sullivan County is a Tri-Cities regional market: Kingsport industrial-and-residential mix, Bristol edges that straddle state lines, Blountville and corridor multi-family, and I-81/I-26 logistics that are not Nashville suburb rings and not Knoxville campus density. A Kingsport multi-family unit, a Bristol TN home, a Blountville HOA two-story, and a rural-edge lot do not share truck access or empty-mile risk. This hub is for Sullivan — not a renamed Davidson or Knox page.',
    corridors: 'I-81 · I-26 · US-11W · US-23 · State of Franklin Rd corridors',
    differentIntro: 'Tri-Cities regional fabric with state-line edges — not Middle Tennessee growth rings or Sevier tourism peaks.',
    differentBullets: [
      { t: 'I-81 / I-26 define regional portal time', d: 'Cross-town and cross-state pairs burn clock at peak.' },
      { t: 'Kingsport mixes industrial-adjacent and residential stock', d: 'Access surveys matter more than ZIP labels.' },
      { t: 'Bristol edges can mean Virginia border logistics', d: 'Clarify Tennessee vs Virginia destinations for TDOR vs FMCSA assumptions.' },
      { t: 'Tri-Cities pairs are everyday regional work', d: 'Washington County TN and nearby markets change empty miles.' },
      { t: 'Sullivan is not Nashville or Knoxville', d: 'Do not reuse music-core or UT campus copy here.' },
    ],
    zonesHeading: 'Sullivan access zones',
    zonesIntro: 'Plan by Kingsport core, Bristol TN edges, Blountville/corridor multi-family, and rural edges.',
    zones: [
      { id: 'kingsport', name: 'Kingsport multi-family & residential corridors', short: 'Kingsport', hoods: ['Kingsport', 'Downtown Kingsport edges', 'Fort Henry Dr multi-family', 'Industrial-adjacent residential'], housing: 'SFH, multi-family, townhomes', challenges: ['Mixed access types', 'Arterial congestion', 'Industrial truck corridors'], tips: 'Confirm unit access type. Prefer mid-week mornings. Survey industrial-edge staging carefully.', keywords: ['kingsport', 'fort henry'] },
      { id: 'bristol-tn', name: 'Bristol TN edges & state-line approaches', short: 'Bristol TN', hoods: ['Bristol', 'State Street edges', 'Volunteer Pkwy multi-family', 'State-line residential'], housing: 'SFH, multi-family, townhomes', challenges: ['State-line address confusion', 'Cross-border portal time', 'Mixed access types'], tips: 'Clarify Tennessee vs Virginia destinations on every estimate. Build border-pair buffer.', keywords: ['bristol', 'volunteer pkwy', 'state street'] },
      { id: 'blountville-corridor', name: 'Blountville & airport/corridor multi-family', short: 'Blountville / corridor', hoods: ['Blountville', 'Airport-adjacent multi-family', 'US-11W corridors', 'HOA villages'], housing: 'Multi-family, HOA SFH, townhomes', challenges: ['Corridor congestion', 'HOA rules', 'Longer empty miles between cities'], tips: 'Collect HOA packets. Prefer early starts for long inter-city pairs.', keywords: ['blountville', 'tri-cities airport', 'us-11w'] },
      { id: 'rural-edges', name: 'Rural Sullivan edges', short: 'Rural edges', hoods: ['Rural driveway lots', 'Northern and eastern tracts'], housing: 'SFH, rural-edge lots', challenges: ['Long empty miles', 'Soft surfaces after rain', 'Limited alternate routes'], tips: 'Survey driveway access. Prefer early starts for long pairs.', keywords: ['rural sullivan'] },
    ],
    costIntro: 'Regional empty miles and mixed industrial-residential access drive quotes.',
    costDrivers: [
      { t: 'I-81 / I-26 congestion', d: 'Portal-to-portal spikes at peak.' },
      { t: 'Industrial-adjacent staging friction', d: 'Time risk near commercial corridors.' },
      { t: 'Cross-border empty miles', d: 'Virginia destinations change staging and authority assumptions.' },
      { t: 'Inter-city Tri-Cities pairs', d: 'Kingsport–Bristol–Johnson City-area logistics raise distance.' },
    ],
    ranges: [
      { l: 'Studio / 1BR (simple access)', v: '$400–$1,200+', n: 'Higher with peak freeways' },
      { l: '2–3BR condo or modest SFH', v: '$1,200–$3,400+', n: 'Regional pairs trend up' },
      { l: '3–4+ BR / long regional / cross-border', v: '$2,200–$6,400+', n: 'Long I-81 pairs price highest' },
      { l: 'Typical 2-person crew rate', v: '$100–$170+/hr', n: 'Portal-to-portal' },
    ],
    seasonalIntro: 'Family seasons and regional employment calendars reshape access.',
    seasonal: [
      { t: 'Best windows: mid-week early mornings', d: 'Reduce I-81 pain.' },
      { t: 'Peak family season: late May–mid-August', d: 'Book suburban Saturdays early.' },
      { t: 'Month-end multi-family turns', d: 'Lease clusters fill crews in corridor multi-unit.' },
      { t: 'Summer heat and storms', d: 'Prefer early starts; confirm weather contingency.' },
    ],
    specializedId: 'sullivan-tri-cities',
    specializedTitle: 'Tri-Cities regional & state-line logistics module',
    specializedIntro: 'Sullivan estimates fail when border destinations or industrial-adjacent access are ignored.',
    specializedBullets: [
      'Clarify Tennessee vs Virginia destinations on every estimate.',
      'Price I-81/I-26 pairs portal-to-portal.',
      'Survey industrial-adjacent staging carefully in Kingsport corridors.',
      'Do not reuse Nashville or Knoxville campus assumptions here.',
      'Verify TDOR for in-state-only jobs and FMCSA for interstate legs.',
    ],
    schools: [
      { t: 'How districts work here', d: 'Sullivan County Schools, Kingsport City Schools, and Bristol Tennessee City Schools serve different addresses. Confirm zoning carefully.' },
      { t: 'Research sources', d: 'District tools, Tennessee DOE data, and campus visits beat ranking screenshots.' },
    ],
    hospitals: [
      { t: 'Major systems', d: 'Ballad Health and other regional facilities serve Tri-Cities corridors. Confirm networks.' },
      { t: 'What relocators should do', d: 'Map peak-hour drive times across Kingsport–Bristol corridors. Transfer records early.' },
    ],
    housing: [
      { t: 'Industrial-residential mix', d: 'Kingsport corridors can sit near commercial logistics; Bristol edges may involve state-line complexity.' },
      { t: 'Cost variation', d: 'Prices vary by city and corridor within the county.' },
    ],
    townFit: [
      { t: 'Kingsport lifestyle', d: 'Regional employment access with mixed stock logistics.' },
      { t: 'Bristol TN pattern', d: 'State-line living with cross-border commute options.' },
      { t: 'Blountville / corridor pattern', d: 'Multi-family and HOA product between cities.' },
    ],
    jobs: [
      { t: 'Employment anchors', d: 'Manufacturing, healthcare, logistics, education, and regional services shape employment.' },
      { t: 'Commute realism', d: 'I-81, I-26, and US-11W peaks are real. Test drive peak routes across Tri-Cities.' },
    ],
    lifestyle: [
      { t: 'Tri-Cities identity', d: 'Sullivan is distinct from Nashville suburb rings, Memphis river logistics, and Sevier tourism peaks.' },
      { t: 'Climate', d: 'Four seasons with hot humid summers and winter weather risk. Plan staging contingency.' },
    ],
    resources: [
      { l: 'Sullivan County — official site', h: 'https://www.sullivancountytn.gov/' },
      { l: 'City of Kingsport', h: 'https://www.kingsporttn.gov/' },
      { l: 'City of Bristol Tennessee', h: 'https://www.bristoltn.org/' },
      { l: 'Sullivan County Schools', h: 'https://www.scde.k12.tn.us/' },
      { l: 'TDOT traffic resources', h: 'https://www.tn.gov/tdot.html' },
    ],
    directoryHint:
      'Prefer mixed industrial-residential access experience; honest I-81 pricing; clarify TN vs VA destinations. Verify TDOR for in-state legs and FMCSA for interstate.',
  },
];

const all = [...counties, ...more, ...ringAndSpecial];
const outDir = join(process.cwd(), 'lib/local-movers/county-intelligence/tennessee');
mkdirSync(outDir, { recursive: true });

for (const c of all) {
  const file = join(outDir, `${c.slug}-tn.ts`);
  writeFileSync(file, render(c), 'utf8');
  console.log('wrote', file);
}

console.log('done', all.length, 'packs');
