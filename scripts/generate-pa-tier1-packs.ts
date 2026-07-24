/**
 * Generate Pennsylvania Tier-1 Core 12 intelligence packs.
 * Run: npx tsx scripts/generate-pa-tier1-packs.ts
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
import { finalizePaPack } from '@/lib/local-movers/county-intelligence/pennsylvania/pa-shared';

export const ${p.exportName}: CountyIntelligencePack = finalizePaPack({
  countySlug: ${j(p.slug)},
  hubTitle: ${j(p.hub)},
  eyebrow: ${j(p.eyebrow)},
  h1: ${j(p.h1)},
  heroOpener: ${j(p.opener)},
  heroCredibility:
    'PA PUC household goods authority for intrastate moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: ${j(p.corridors)},
  whatMakesDifferent: {
    title: ${j(`What makes moving in ${label} different`)},
    intro: ${j(p.differentIntro)},
    bullets: [
${bullets},
      {
        title: 'Intrastate PA rules vs interstate authority',
        detail:
          'Moves entirely within Pennsylvania are generally subject to Pennsylvania Public Utility Commission (PUC) household goods authority. Interstate legs need active FMCSA USDOT (and usually MC).',
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
      'Official links first; directory listings are independent, not endorsements. Verify PA PUC authority for in-state moves and FMCSA for interstate legs.',
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
    slug: 'philadelphia',
    exportName: 'philadelphiaCountyPaIntelligence',
    hub: 'Philadelphia County Moving Intelligence Hub',
    eyebrow: 'Philadelphia · Center City elevators, rowhomes & neighborhood micro-markets',
    h1: 'Moving in Philadelphia: Rowhomes, Center City COIs & I-95/I-76 Logistics',
    opener:
      'Philadelphia County is the city itself: Center City towers with COI and freight elevators, South Philly and Fishtown rowhomes on narrow streets, Northeast multi-family corridors, and Northwest hills that are not Montgomery Main Line HOA product. A Center City condo, a South Philly rowhome, a Northeast apartment, and a Northwest twin do not share truck access or I-95/I-76 portal time. This hub is for Philadelphia — not a collar-county clone and not renamed Brooklyn or Jersey City copy.',
    corridors: 'I-95 · I-76 · I-676 · US-1 · Roosevelt Blvd · Broad Street',
    differentIntro:
      'These are city-of-Philadelphia realities — rowhome curb limits, Center City elevators, and neighborhood micro-markets — not Main Line suburbs or Pittsburgh hills.',
    differentBullets: [
      { t: 'Rowhomes and narrow streets dominate many neighborhoods', d: 'Limited legal truck length, long carries, and stoops define labor hours more than square footage alone.' },
      { t: 'Center City elevators make COI the default downtown', d: 'Building packets, freight elevators, and fixed windows prevent day-of refusals.' },
      { t: 'I-95 / I-76 / I-676 rewrite portal-to-portal time', d: 'Cross-city pairs look local on maps and regional at peak.' },
      { t: 'Northeast, Northwest, South, and West are different products', d: 'Do not price Fishtown like Northeast multi-family or Center City towers.' },
      { t: 'Collar-county pairs are routine but not “city local”', d: 'Montgomery, Bucks, Delaware, and Chester destinations need clear county lines for drive time and PA PUC vs FMCSA assumptions.' },
    ],
    zonesHeading: 'Philadelphia access zones',
    zonesIntro: 'Plan by Center City, South Philly, Northeast, Northwest, and West/University corridors.',
    zones: [
      { id: 'center-city', name: 'Center City & elevated core', short: 'Center City', hoods: ['Center City', 'Rittenhouse', 'Washington Square West', 'Old City edges', 'Logan Square'], housing: 'High-rises, mid-rises, condos, some rowhomes', challenges: ['Near-universal COI and elevators', 'Scarce curb staging', 'Event-day congestion'], tips: 'Get building packets early. Prefer mid-week morning freight windows.', keywords: ['philadelphia', 'center city', 'rittenhouse', 'old city'] },
      { id: 'south-philly', name: 'South Philadelphia rowhome corridors', short: 'South Philly', hoods: ['South Philadelphia', 'Passyunk', 'Point Breeze', 'Graduate Hospital edges'], housing: 'Rowhomes, twins, limited multi-family', challenges: ['Narrow streets', 'Limited truck length', 'Long carries and stoops'], tips: 'Photo curb and street width. Prefer smaller trucks when required.', keywords: ['south philly', 'passyunk', 'point breeze'] },
      { id: 'northeast', name: 'Northeast Philadelphia multi-family & SFH', short: 'Northeast', hoods: ['Northeast Philadelphia', 'Roosevelt Blvd corridors', 'Mayfair', 'Bustleton edges'], housing: 'Multi-family, twins, SFH', challenges: ['Roosevelt Blvd congestion', 'Elevator buildings', 'Long portal time to Center City'], tips: 'Build Blvd buffer. Confirm elevator vs stair access.', keywords: ['northeast philadelphia', 'mayfair', 'bustleton', 'roosevelt'] },
      { id: 'northwest', name: 'Northwest hills & twin stock', short: 'Northwest', hoods: ['Northwest Philadelphia', 'Germantown', 'Mount Airy', 'Chestnut Hill edges'], housing: 'Twins, older SFH, multi-unit', challenges: ['Hills and stairs', 'Tree-lined narrow streets', 'Winter access'], tips: 'Survey grade and curb. Prefer mid-week mornings.', keywords: ['germantown', 'mount airy', 'chestnut hill', 'northwest'] },
      { id: 'west-university', name: 'West Philly & University City', short: 'West / University City', hoods: ['University City', 'West Philadelphia', 'Spruce Hill', 'Powelton edges'], housing: 'Multi-unit, rowhomes, student multi-family', challenges: ['Lease-end waves', 'Mixed elevators and stairs', 'I-76 approach congestion'], tips: 'Book academic peaks early. Confirm unit access type.', keywords: ['university city', 'west philadelphia', 'powelton'] },
    ],
    costIntro: 'Rowhome access, elevators, and expressway portal time drive quotes more than square footage alone.',
    costDrivers: [
      { t: 'Center City elevator / COI buildings', d: 'Labor and wait time dominate core jobs.' },
      { t: 'Rowhome long carries', d: 'Narrow streets raise labor hours.' },
      { t: 'I-95 / I-76 congestion', d: 'Portal-to-portal spikes at peak.' },
      { t: 'Collar-county empty miles', d: 'Suburban destinations raise staging distance.' },
    ],
    ranges: [
      { l: 'Studio / 1BR (simple access)', v: '$450–$1,400+', n: 'Higher with elevators or narrow streets' },
      { l: '2–3BR rowhome or condo', v: '$1,400–$4,000+', n: 'Stoops and COI soft costs trend up' },
      { l: '3–4+ BR / tower / cross-city', v: '$2,600–$7,800+', n: 'Center City towers and long I-95 pairs highest' },
      { l: 'Typical 2-person crew rate', v: '$110–$185+/hr', n: 'Portal-to-portal' },
    ],
    seasonalIntro: 'Lease turns, university calendars, heat/humidity, and winter storms reshape access.',
    seasonal: [
      { t: 'Best windows: mid-week early mornings', d: 'Clear curb and reduce I-95/I-76 pain.' },
      { t: 'Peak family season: late May–mid-August', d: 'Book early for multi-family and rowhome Saturdays.' },
      { t: 'University lease waves', d: 'May/August clusters near University City multi-family.' },
      { t: 'Winter ice and snow', d: 'Hills and narrow streets need weather contingency language.' },
    ],
    specializedId: 'philly-rowhome-centercity',
    specializedTitle: 'Philadelphia rowhome & Center City elevator module',
    specializedIntro: 'Philadelphia estimates fail when curb width or building packets are ignored.',
    specializedBullets: [
      'Request Center City building packets at lease signing or escrow.',
      'Survey street width and truck length for rowhome blocks.',
      'Price I-95/I-76 pairs portal-to-portal.',
      'Clarify Philadelphia vs Montgomery/Bucks/Delaware/Chester destinations.',
      'Verify PA PUC authority for in-state-only jobs and FMCSA for interstate legs.',
    ],
    schools: [
      { t: 'How districts work here', d: 'School District of Philadelphia is the primary public K–12 system. Assignment is address-based.' },
      { t: 'Research sources', d: 'District tools, Pennsylvania PDE data, and campus visits beat ranking screenshots.' },
    ],
    hospitals: [
      { t: 'Major systems', d: 'Penn Medicine, Jefferson, Temple, CHOP, and other facilities serve city corridors. Confirm networks.' },
      { t: 'What relocators should do', d: 'Map peak-hour drive times from Northeast or Northwest. Transfer records early.' },
    ],
    housing: [
      { t: 'Rowhome vs tower stock', d: 'Most neighborhoods are rowhomes/twins; vertical product concentrates Center City and select multi-family corridors.' },
      { t: 'Cost variation', d: 'Prices vary sharply by neighborhood. Budget condo fees and parking constraints downtown.' },
    ],
    townFit: [
      { t: 'Center City lifestyle', d: 'Walkable amenities with elevator tradeoffs.' },
      { t: 'South Philly pattern', d: 'Rowhome density with narrow-street logistics.' },
      { t: 'Northeast / Northwest pattern', d: 'More multi-family or twin stock with longer portal time to core jobs.' },
    ],
    jobs: [
      { t: 'Employment anchors', d: 'Healthcare, education, professional services, logistics, and hospitality shape employment.' },
      { t: 'Commute realism', d: 'I-95, I-76, and SEPTA-oriented cores still leave many car-dependent edges. Test drive peak routes.' },
    ],
    lifestyle: [
      { t: 'City-county identity', d: 'Philadelphia is not a collar-county suburb and not Pittsburgh hills — neighborhood micro-markets dominate.' },
      { t: 'Climate', d: 'Hot humid summers, winter ice/snow. Plan outdoor staging contingency.' },
    ],
    resources: [
      { l: 'City of Philadelphia', h: 'https://www.phila.gov/' },
      { l: 'School District of Philadelphia', h: 'https://www.philasd.org/' },
      { l: 'PennDOT 511PA traffic', h: 'https://www.511pa.com/' },
    ],
    directoryHint:
      'Prefer Center City elevator/COI experience and rowhome curb surveys; honest I-95/I-76 pricing. Verify PA PUC in-state and FMCSA interstate.',
  },
  {
    slug: 'allegheny',
    exportName: 'alleghenyCountyPaIntelligence',
    hub: 'Allegheny County Moving Intelligence Hub',
    eyebrow: 'Allegheny · Pittsburgh hills, bridges & neighborhood micro-markets',
    h1: 'Moving in Allegheny County: Pittsburgh Hills, Stairs & Parkway Logistics',
    opener:
      'Allegheny County is Pittsburgh’s hills-and-bridges market: neighborhood stairs, steep driveways, bridge approaches, winter access risk, and Parkway East/West/North congestion that is not Philadelphia rowhome logistics and not Westmoreland’s east-suburban pattern alone. A South Side rowhome, a Squirrel Hill twin, a Downtown condo, and a North Hills HOA two-story do not share truck access or I-376 portal time. This hub is for Allegheny — not a renamed Philly page.',
    corridors: 'I-376 · I-279 · I-79 · Parkway East/West/North · PA-28',
    differentIntro:
      'These are Pittsburgh realities — hills, stairs, bridges, and winter access — not Philly rowhomes or Lehigh Valley industrial corridors.',
    differentBullets: [
      { t: 'Hills and stairs dominate labor hours', d: 'Long carries and multi-flight stairs beat map-mile quotes.' },
      { t: 'Bridge approaches rewrite portal time', d: 'Short map miles become long clocks at peak.' },
      { t: 'Winter ice and snow are operational constraints', d: 'Steep driveways need weather contingency language.' },
      { t: 'Neighborhood micro-markets are not interchangeable', d: 'South Side differs from North Hills HOA product and Downtown elevators.' },
      { t: 'Westmoreland pairs are regional, not city local', d: 'Keep county lines clear for drive time and authority assumptions.' },
    ],
    zonesHeading: 'Allegheny access zones',
    zonesIntro: 'Plan by Downtown/North Shore, East End, South Side/South Hills, North Hills, and airport corridor.',
    zones: [
      { id: 'downtown', name: 'Downtown Pittsburgh & North Shore', short: 'Downtown / North Shore', hoods: ['Downtown', 'North Shore', 'Strip District edges', 'Cultural District'], housing: 'High-rises, mid-rises, lofts', challenges: ['COI and elevators', 'Event-day curb pressure', 'Bridge approach congestion'], tips: 'Get building packets early. Prefer mid-week mornings. Avoid stadium event peaks when flexible.', keywords: ['pittsburgh', 'downtown', 'north shore', 'strip district'] },
      { id: 'east-end', name: 'East End neighborhoods', short: 'East End', hoods: ['Squirrel Hill', 'Shadyside', 'Oakland', 'Lawrenceville edges'], housing: 'Twins, multi-unit, older SFH, some elevators', challenges: ['Hills and stairs', 'Student lease waves near Oakland', 'Tight streets'], tips: 'Photo stairs and curb. Book academic peaks early near Oakland.', keywords: ['squirrel hill', 'shadyside', 'oakland', 'lawrenceville'] },
      { id: 'south-hills', name: 'South Side & South Hills', short: 'South Side / South Hills', hoods: ['South Side', 'Mount Washington', 'Dormont edges', 'Mt. Lebanon edges'], housing: 'Rowhomes, twins, hillside SFH, multi-family', challenges: ['Steep grades', 'Narrow streets', 'Parkway West congestion'], tips: 'Survey driveway grade. Prefer smaller trucks when needed. Build Parkway buffer.', keywords: ['south side', 'mount washington', 'mt lebanon', 'dormont'] },
      { id: 'north-hills', name: 'North Hills suburban multi-family', short: 'North Hills', hoods: ['North Hills', 'Ross', 'McCandless edges', 'Wexford edges'], housing: 'HOA SFH, multi-family, townhomes', challenges: ['I-79 / McKnight Rd congestion', 'HOA rules', 'Long portal time to Downtown'], tips: 'Collect HOA packets. Price north-corridor pairs honestly.', keywords: ['north hills', 'ross', 'mccandless', 'wexford'] },
    ],
    costIntro: 'Hills, stairs, bridges, and Parkway portal time drive quotes.',
    costDrivers: [
      { t: 'Hillside long carries and stairs', d: 'Labor hours rise when trucks cannot park at the door.' },
      { t: 'Parkway / bridge congestion', d: 'Portal-to-portal spikes at peak.' },
      { t: 'Winter weather contingency', d: 'Ice on grades can force reschedules.' },
      { t: 'Downtown elevator / COI buildings', d: 'Wait time adds cost.' },
    ],
    ranges: [
      { l: 'Studio / 1BR (simple access)', v: '$400–$1,300+', n: 'Higher with stairs or elevators' },
      { l: '2–3BR twin or modest SFH', v: '$1,300–$3,700+', n: 'Hills trend up' },
      { l: '3–4+ BR / hillside / cross-county', v: '$2,400–$7,000+', n: 'Steep access prices highest' },
      { l: 'Typical 2-person crew rate', v: '$100–$175+/hr', n: 'Portal-to-portal' },
    ],
    seasonalIntro: 'Winter weather, university calendars, and family seasons reshape access.',
    seasonal: [
      { t: 'Best windows: mid-week early mornings', d: 'Reduce Parkway pain and clear curb.' },
      { t: 'Peak family season: late May–mid-August', d: 'Book suburban Saturdays early.' },
      { t: 'University lease waves near Oakland', d: 'May/August clusters fill multi-family crews.' },
      { t: 'Winter ice and snow', d: 'Confirm contingency for hillside addresses.' },
    ],
    specializedId: 'pittsburgh-hills-bridges',
    specializedTitle: 'Pittsburgh hills, stairs & bridge logistics module',
    specializedIntro: 'Allegheny estimates fail when grade and bridge approaches are ignored.',
    specializedBullets: [
      'Survey driveway grade and stair counts before final pricing.',
      'Price Parkway and bridge pairs portal-to-portal.',
      'Collect Downtown building packets early.',
      'Clarify Allegheny vs Westmoreland destinations.',
      'Verify PA PUC authority for in-state-only jobs and FMCSA for interstate legs.',
    ],
    schools: [
      { t: 'How districts work here', d: 'Pittsburgh Public Schools and numerous suburban districts serve different addresses. Confirm zoning carefully.' },
      { t: 'Research sources', d: 'District tools, PDE data, and campus visits beat ranking screenshots.' },
    ],
    hospitals: [
      { t: 'Major systems', d: 'UPMC, Allegheny Health Network, and other facilities serve county corridors. Confirm networks.' },
      { t: 'What relocators should do', d: 'Map peak-hour and bridge-affected drive times. Transfer records early.' },
    ],
    housing: [
      { t: 'Hillside city stock vs North Hills suburbs', d: 'Older twins and rowhomes dominate many city neighborhoods; HOA multi-family appears more on suburban edges.' },
      { t: 'Winter access realities', d: 'Steep driveways change move-day risk from December through March.' },
    ],
    townFit: [
      { t: 'City neighborhood lifestyle', d: 'Walkable amenities with hills/stairs tradeoffs.' },
      { t: 'North Hills pattern', d: 'Suburban product with longer Parkway portal time to core jobs.' },
      { t: 'South Hills pattern', d: 'Hillside living with grade logistics.' },
    ],
    jobs: [
      { t: 'Employment anchors', d: 'Healthcare, education, tech, manufacturing, and professional services shape employment.' },
      { t: 'Commute realism', d: 'Parkways and bridges are real bottlenecks. Test drive peak routes.' },
    ],
    lifestyle: [
      { t: 'Hills-and-bridges identity', d: 'Allegheny is distinct from Philly rowhomes and Westmoreland’s east-suburban fabric.' },
      { t: 'Climate', d: 'Four seasons with meaningful winter snow/ice. Plan staging contingency.' },
    ],
    resources: [
      { l: 'Allegheny County — official site', h: 'https://www.alleghenycounty.us/' },
      { l: 'City of Pittsburgh', h: 'https://www.pittsburghpa.gov/' },
      { l: 'PennDOT 511PA traffic', h: 'https://www.511pa.com/' },
    ],
    directoryHint:
      'Prefer hillside/stair experience and Downtown elevator fluency; honest Parkway pricing. Verify PA PUC in-state and FMCSA interstate.',
  },
  {
    slug: 'montgomery',
    exportName: 'montgomeryCountyPaIntelligence',
    hub: 'Montgomery County Moving Intelligence Hub',
    eyebrow: 'Montgomery · Main Line, King of Prussia & Philly collar logistics',
    h1: 'Moving in Montgomery County: Main Line Access, KOP Corridors & I-76 Logistics',
    opener:
      'Montgomery County is Philadelphia’s northwest collar: Main Line multi-unit and older SFH, King of Prussia retail and multi-family density, Abington and Willow Grove corridors, and I-76/I-476 portal time that is not Center City rowhomes and not Chester far-west HOA growth alone. A Main Line twin, a KOP mid-rise, an Abington ranch, and a Lansdale multi-family unit do not share truck access or empty-mile risk. This hub is for Montgomery — not a Philadelphia city clone.',
    corridors: 'I-76 · I-476 · US-202 · PA-309 · PA-611',
    differentIntro: 'Collar-county density and Main Line access — not Philly Center City elevators as the default product.',
    differentBullets: [
      { t: 'Main Line stock mixes older SFH, twins, and multi-unit', d: 'Access surveys matter more than “suburb” labels.' },
      { t: 'I-76 / I-476 define portal-to-portal time', d: 'Philly-linked pairs burn clock at peak.' },
      { t: 'King of Prussia multi-family is elevator-heavy', d: 'Building packets still apply outside Center City.' },
      { t: 'HOA growth appears in pockets, not county-wide', d: 'Collect gate lists where planned communities apply.' },
      { t: 'Montgomery is not Bucks or Delaware', d: 'Northwest collar logistics differ from north-river Bucks and I-95 Delaware inner ring.' },
    ],
    zonesHeading: 'Montgomery access zones',
    zonesIntro: 'Plan by Main Line, King of Prussia, Abington/Willow Grove, and northern growth edges.',
    zones: [
      { id: 'main-line', name: 'Main Line towns & multi-unit', short: 'Main Line', hoods: ['Ardmore', 'Bryn Mawr', 'Narberth edges', 'Wayne edges', 'Lower Merion corridors'], housing: 'Older SFH, twins, multi-unit, some elevators', challenges: ['Tight streets', 'Mixed access types', 'I-76 congestion'], tips: 'Photo curb. Confirm elevator rules. Prefer mid-week mornings.', keywords: ['ardmore', 'bryn mawr', 'wayne', 'lower merion', 'main line'] },
      { id: 'kop', name: 'King of Prussia multi-family & retail corridors', short: 'King of Prussia', hoods: ['King of Prussia', 'US-202 multi-family', 'Gulph Road corridors'], housing: 'Mid-rise multi-family, townhomes, HOA product', challenges: ['Elevators and COI', 'Retail congestion', 'Lease-end waves'], tips: 'Reserve elevators in writing. Build US-202 buffer.', keywords: ['king of prussia', 'kop', 'upper merion'] },
      { id: 'abington-wg', name: 'Abington, Willow Grove & eastern corridors', short: 'Abington / WG', hoods: ['Abington', 'Willow Grove', 'Jenkintown edges', 'PA-611 multi-family'], housing: 'SFH, multi-family, twins', challenges: ['PA-611 congestion', 'Mixed stock access', 'Longer empty miles to Main Line'], tips: 'Prefer early starts. Confirm unit access type.', keywords: ['abington', 'willow grove', 'jenkintown'] },
      { id: 'north-growth', name: 'Lansdale, North Wales & northern growth', short: 'North growth', hoods: ['Lansdale', 'North Wales', 'PA-309 corridors', 'HOA villages'], housing: 'HOA SFH, multi-family, townhomes', challenges: ['HOA rules', 'PA-309 congestion', 'Long portal time to Philly core'], tips: 'Collect HOA packets. Price long north-county pairs honestly.', keywords: ['lansdale', 'north wales', 'montgomeryville'] },
    ],
    costIntro: 'Collar freeway portal time and mixed multi-unit access drive quotes.',
    costDrivers: [
      { t: 'I-76 / I-476 congestion', d: 'Portal-to-portal spikes at peak.' },
      { t: 'Main Line curb and multi-unit mix', d: 'Access type varies block by block.' },
      { t: 'KOP elevator buildings', d: 'COI and wait time add cost.' },
      { t: 'Philly-linked empty miles', d: 'City destinations raise staging distance.' },
    ],
    ranges: [
      { l: 'Studio / 1BR (simple access)', v: '$450–$1,350+', n: 'Higher with elevators' },
      { l: '2–3BR condo or modest SFH', v: '$1,350–$3,800+', n: 'Collar congestion trends up' },
      { l: '3–4+ BR / long Philly-linked', v: '$2,500–$7,200+', n: 'Cross-county pairs price highest' },
      { l: 'Typical 2-person crew rate', v: '$110–$180+/hr', n: 'Portal-to-portal' },
    ],
    seasonalIntro: 'Family seasons and multi-family lease turns reshape collar access.',
    seasonal: [
      { t: 'Best windows: mid-week early mornings', d: 'Reduce I-76/I-476 pain.' },
      { t: 'Peak family season: late May–mid-August', d: 'Book suburban Saturdays early.' },
      { t: 'Month-end multi-family turns', d: 'KOP and corridor apartments fill crews first.' },
      { t: 'Winter ice and snow', d: 'Confirm contingency for driveway and arterial access.' },
    ],
    specializedId: 'montgomery-collar-mainline',
    specializedTitle: 'Main Line & King of Prussia collar module',
    specializedIntro: 'Montgomery estimates fail when Philly empty miles or multi-unit rules are ignored.',
    specializedBullets: [
      'Collect KOP building packets early.',
      'Price I-76/I-476 pairs portal-to-portal.',
      'Clarify Montgomery vs Philadelphia destinations.',
      'Do not reuse Center City rowhome assumptions for Main Line SFH.',
      'Verify PA PUC authority for in-state-only jobs and FMCSA for interstate legs.',
    ],
    schools: [
      { t: 'How districts work here', d: 'Multiple independent school districts serve Montgomery addresses. Confirm zoning carefully.' },
      { t: 'Research sources', d: 'District tools, PDE data, and campus visits beat ranking screenshots.' },
    ],
    hospitals: [
      { t: 'Major systems', d: 'Main Line Health, Jefferson, Abington/Jefferson, and Philly-metro systems serve residents. Confirm networks.' },
      { t: 'What relocators should do', d: 'Map peak-hour times into city specialty care. Transfer records early.' },
    ],
    housing: [
      { t: 'Main Line vs northern growth stock', d: 'Older multi-unit and SFH on the Main Line; more HOA multi-family north.' },
      { t: 'Cost variation', d: 'Main Line corridors often price differently from northern growth towns.' },
    ],
    townFit: [
      { t: 'Main Line lifestyle', d: 'Rail-oriented towns with mixed multi-unit logistics.' },
      { t: 'KOP multi-unit pattern', d: 'Elevator product with retail-corridor congestion.' },
      { t: 'Northern growth pattern', d: 'HOA product with longer Philly commute risk.' },
    ],
    jobs: [
      { t: 'Employment anchors', d: 'Many residents commute into Philadelphia; KOP corporate, healthcare, and retail also employ locals.' },
      { t: 'Commute realism', d: 'I-76 and I-476 peaks are real. Test drive peak routes into the city.' },
    ],
    lifestyle: [
      { t: 'Northwest collar identity', d: 'Montgomery is distinct from Philly city, Bucks north suburbs, and Delaware I-95 inner ring.' },
      { t: 'Climate', d: 'Hot humid summers and winter ice/snow. Plan staging contingency.' },
    ],
    resources: [
      { l: 'Montgomery County, PA — official site', h: 'https://www.montgomerycountypa.gov/' },
      { l: 'PennDOT 511PA traffic', h: 'https://www.511pa.com/' },
    ],
    directoryHint:
      'Prefer Main Line multi-unit and KOP elevator experience; honest I-76/I-476 pricing. Verify PA PUC in-state and FMCSA interstate.',
  },
];

// Remaining 9 counties
const more: Spec[] = [
  {
    slug: 'bucks',
    exportName: 'bucksCountyPaIntelligence',
    hub: 'Bucks County Moving Intelligence Hub',
    eyebrow: 'Bucks · North Philly suburbs, river-town edges & longer suburban runs',
    h1: 'Moving in Bucks County: North Suburbs, River Towns & I-95 Logistics',
    opener:
      'Bucks County is Philadelphia’s northern collar: Lower Bucks multi-family near I-95, river-town edges along the Delaware, Central Bucks growth, and longer portal-to-portal runs that are not Montgomery Main Line and not Center City rowhomes. A Bensalem multi-family unit, a Newtown HOA two-story, a Doylestown twin, and a river-town house do not share truck access or empty-mile risk. This hub is for Bucks — not a Philadelphia or Montgomery clone.',
    corridors: 'I-95 · US-1 · PA-611 · US-202 links · PA-132',
    differentIntro: 'Northern Philly suburbs and river-town edges — not Main Line Montgomery or Delaware I-95 inner-ring west.',
    differentBullets: [
      { t: 'I-95 defines many Philly-linked portal times', d: 'Lower Bucks pairs burn clock at peak.' },
      { t: 'River-town streets can be tight and tourism-sensitive', d: 'Survey curb width near popular river edges.' },
      { t: 'Central and Upper Bucks mean longer empty miles', d: 'Do not price Doylestown like Bensalem multi-family.' },
      { t: 'HOA growth appears in pockets', d: 'Collect gate lists where planned communities apply.' },
      { t: 'Bucks is not Montgomery', d: 'North-river logistics differ from northwest Main Line patterns.' },
    ],
    zonesHeading: 'Bucks access zones',
    zonesIntro: 'Plan by Lower Bucks, Central Bucks, river-town edges, and Upper Bucks.',
    zones: [
      { id: 'lower-bucks', name: 'Lower Bucks multi-family & I-95 corridors', short: 'Lower Bucks', hoods: ['Bensalem', 'Levittown edges', 'Bristol edges', 'I-95 multi-family'], housing: 'Multi-family, twins, SFH', challenges: ['I-95 congestion', 'Elevator buildings', 'Long portal time to Center City'], tips: 'Build I-95 buffer. Confirm elevator reservations. Prefer early starts.', keywords: ['bensalem', 'levittown', 'bristol', 'lower bucks'] },
      { id: 'central-bucks', name: 'Central Bucks growth & HOA pockets', short: 'Central Bucks', hoods: ['Newtown', 'Warminster edges', 'Warrington', 'HOA villages'], housing: 'HOA SFH, multi-family, townhomes', challenges: ['HOA rules', 'US-202 / PA-611 congestion', 'Longer empty miles'], tips: 'Collect HOA packets. Price long pairs honestly.', keywords: ['newtown', 'warminster', 'warrington'] },
      { id: 'river-towns', name: 'Delaware River town edges', short: 'River towns', hoods: ['New Hope edges', 'Yardley edges', 'River Road corridors'], housing: 'Older SFH, multi-unit, tourism-adjacent', challenges: ['Tight streets', 'Seasonal traffic pulses', 'Limited staging'], tips: 'Photo curb. Prefer mid-week off-peak tourism mornings.', keywords: ['new hope', 'yardley', 'river'] },
      { id: 'upper-bucks', name: 'Upper Bucks towns & rural edges', short: 'Upper Bucks', hoods: ['Doylestown', 'Quakertown edges', 'Rural driveway lots'], housing: 'SFH, multi-family, rural-edge lots', challenges: ['Long empty miles', 'PA-611 congestion', 'Varied driveway access'], tips: 'Survey driveway access. Prefer early starts for long north-county pairs.', keywords: ['doylestown', 'quakertown', 'upper bucks'] },
    ],
    costIntro: 'I-95 portal time and long suburban empty miles drive quotes.',
    costDrivers: [
      { t: 'I-95 Philly-linked congestion', d: 'Portal-to-portal spikes at peak.' },
      { t: 'Longer Central/Upper empty miles', d: 'Distance work disguised as “local.”' },
      { t: 'HOA soft costs in growth pockets', d: 'Gate lists push demand into peak windows.' },
      { t: 'River-town curb limits', d: 'Labor hours rise on tight streets.' },
    ],
    ranges: [
      { l: 'Studio / 1BR (simple access)', v: '$450–$1,300+', n: 'Higher with elevators' },
      { l: '2–3BR HOA SFH or multi-family', v: '$1,350–$3,700+', n: 'I-95 pairs trend up' },
      { l: '3–4+ BR / long Philly-linked', v: '$2,500–$7,000+', n: 'Cross-county pairs price highest' },
      { l: 'Typical 2-person crew rate', v: '$110–$180+/hr', n: 'Portal-to-portal' },
    ],
    seasonalIntro: 'Family seasons, multi-family turns, and river tourism pulses reshape access.',
    seasonal: [
      { t: 'Best windows: mid-week early mornings', d: 'Reduce I-95 pain.' },
      { t: 'Peak family season: late May–mid-August', d: 'Book suburban Saturdays early.' },
      { t: 'River-town peak weekends', d: 'Prefer mid-week near popular river edges.' },
      { t: 'Winter ice and snow', d: 'Confirm contingency for driveway access.' },
    ],
    specializedId: 'bucks-north-collar',
    specializedTitle: 'North Philly suburbs & river-edge module',
    specializedIntro: 'Bucks estimates fail when I-95 empty miles or river-town curb limits are ignored.',
    specializedBullets: [
      'Price I-95 pairs portal-to-portal.',
      'Survey river-town street width carefully.',
      'Collect HOA packets for Central Bucks growth product.',
      'Clarify Bucks vs Philadelphia/Montgomery destinations.',
      'Verify PA PUC authority for in-state-only jobs and FMCSA for interstate legs.',
    ],
    schools: [
      { t: 'How districts work here', d: 'Multiple independent school districts serve Bucks addresses. Confirm zoning carefully.' },
      { t: 'Research sources', d: 'District tools, PDE data, and campus visits beat ranking screenshots.' },
    ],
    hospitals: [
      { t: 'Major systems', d: 'St. Mary Medical Center, Doylestown Health, and Philly-metro systems serve residents. Confirm networks.' },
      { t: 'What relocators should do', d: 'Map peak-hour times into city specialty care. Transfer records early.' },
    ],
    housing: [
      { t: 'Lower vs Upper stock', d: 'More multi-family near I-95; larger SFH and rural edges north.' },
      { t: 'Cost variation', d: 'Lower Bucks often prices differently from Central/Upper growth towns.' },
    ],
    townFit: [
      { t: 'Lower Bucks lifestyle', d: 'Closer Philly access with I-95 logistics.' },
      { t: 'Central Bucks pattern', d: 'HOA growth and family amenities with longer commute risk.' },
      { t: 'River-town lifestyle', d: 'Scenic edges with curb and tourism tradeoffs.' },
    ],
    jobs: [
      { t: 'Employment anchors', d: 'Many residents commute into Philadelphia or Montgomery; local healthcare, retail, and logistics also employ residents.' },
      { t: 'Commute realism', d: 'I-95 and US-1 peaks are real. Test drive peak routes.' },
    ],
    lifestyle: [
      { t: 'Northern collar identity', d: 'Bucks is distinct from Montgomery Main Line and Delaware I-95 west suburbs.' },
      { t: 'Climate', d: 'Hot humid summers and winter ice/snow. Plan staging contingency.' },
    ],
    resources: [
      { l: 'Bucks County — official site', h: 'https://www.buckscounty.gov/' },
      { l: 'PennDOT 511PA traffic', h: 'https://www.511pa.com/' },
    ],
    directoryHint:
      'Prefer I-95 multi-family experience and river-town curb surveys; honest long-run pricing. Verify PA PUC in-state and FMCSA interstate.',
  },
  {
    slug: 'delaware',
    exportName: 'delawareCountyPaIntelligence',
    hub: 'Delaware County Moving Intelligence Hub',
    eyebrow: 'Delaware · Inner-ring west suburbs, older stock & I-95 corridor',
    h1: 'Moving in Delaware County: Inner-Ring Suburbs, Older Stock & I-95 Logistics',
    opener:
      'Delaware County is Philadelphia’s western inner ring: older twins and multi-family near I-95, Media and western township growth, and short map miles that still burn portal time into the city. This is not Chester far-west HOA sprawl and not Center City elevator product as the default. A Upper Darby multi-family unit, a Media twin, a Springfield ranch, and a Marcus Hook-edge house do not share truck access or empty-mile risk. This hub is for Delaware County, PA — not Delaware the state.',
    corridors: 'I-95 · I-476 · US-1 · PA-3 · PA-352',
    differentIntro: 'Inner-ring west Philly suburbs with older stock — not Chester far-west growth or Bucks north-river patterns.',
    differentBullets: [
      { t: 'Older twins and multi-family dominate many corridors', d: 'Stairs, curb limits, and tight streets are common.' },
      { t: 'I-95 / I-476 define Philly-linked portal time', d: 'Cross-county pairs burn clock at peak.' },
      { t: 'Inner-ring density is not far-west HOA sprawl', d: 'Do not price Upper Darby like Chester County master plans.' },
      { t: 'State-line adjacency with Delaware/New Jersey edges exists', d: 'Clarify destinations for PA PUC vs FMCSA assumptions.' },
      { t: 'Delaware County is not Chester County', d: 'Inner-ring logistics differ from far-west growth portal times.' },
    ],
    zonesHeading: 'Delaware County access zones',
    zonesIntro: 'Plan by eastern inner-ring, Media/central, western townships, and I-95 industrial-adjacent edges.',
    zones: [
      { id: 'east-inner', name: 'Eastern inner-ring multi-family & twins', short: 'East inner-ring', hoods: ['Upper Darby', 'Yeadon edges', 'Darby edges', 'I-95 multi-family'], housing: 'Multi-family, twins, older SFH', challenges: ['Tight streets', 'I-95 congestion', 'Mixed stairs and elevators'], tips: 'Photo curb. Confirm unit access type. Build I-95 buffer.', keywords: ['upper darby', 'yeadon', 'darby'] },
      { id: 'media-central', name: 'Media & central corridors', short: 'Media / central', hoods: ['Media', 'PA-3 corridors', 'Swarthmore edges', 'Springfield'], housing: 'Twins, SFH, multi-family', challenges: ['Arterial congestion', 'Mixed access types', 'Longer empty miles to city core'], tips: 'Prefer mid-week mornings. Survey driveway depth.', keywords: ['media', 'springfield', 'swarthmore'] },
      { id: 'west-townships', name: 'Western townships & HOA pockets', short: 'West townships', hoods: ['Newtown Square edges', 'Marple', 'HOA villages', 'US-1 multi-family'], housing: 'HOA SFH, multi-family, townhomes', challenges: ['HOA rules', 'US-1 congestion', 'Portal time to Philly'], tips: 'Collect HOA packets. Price long pairs honestly.', keywords: ['newtown square', 'marple', 'broomall'] },
      { id: 'i95-south', name: 'I-95 southern industrial-adjacent edges', short: 'I-95 south', hoods: ['Chester city edges', 'Marcus Hook edges', 'Industrial-adjacent residential'], housing: 'Multi-family, older SFH', challenges: ['Freight corridor traffic', 'Varied street widths', 'Staging friction'], tips: 'Survey truck access carefully. Prefer early starts.', keywords: ['chester', 'marcus hook', 'trainer'] },
    ],
    costIntro: 'Inner-ring access friction and I-95 portal time drive quotes.',
    costDrivers: [
      { t: 'I-95 / I-476 congestion', d: 'Portal-to-portal spikes at peak.' },
      { t: 'Older twin and multi-family access', d: 'Stairs and curb limits raise labor hours.' },
      { t: 'HOA soft costs in western pockets', d: 'Gate lists push demand into peak windows.' },
      { t: 'Philly-linked empty miles', d: 'City destinations raise staging distance.' },
    ],
    ranges: [
      { l: 'Studio / 1BR (simple access)', v: '$400–$1,300+', n: 'Higher with stairs or elevators' },
      { l: '2–3BR twin or multi-family', v: '$1,300–$3,600+', n: 'I-95 pairs trend up' },
      { l: '3–4+ BR / long Philly-linked', v: '$2,400–$6,800+', n: 'Cross-county pairs price highest' },
      { l: 'Typical 2-person crew rate', v: '$105–$175+/hr', n: 'Portal-to-portal' },
    ],
    seasonalIntro: 'Family seasons and multi-family lease turns reshape access.',
    seasonal: [
      { t: 'Best windows: mid-week early mornings', d: 'Reduce I-95 pain.' },
      { t: 'Peak family season: late May–mid-August', d: 'Book suburban Saturdays early.' },
      { t: 'Month-end multi-family turns', d: 'Eastern multi-unit fills crews first.' },
      { t: 'Winter ice and snow', d: 'Confirm contingency for driveway and curb access.' },
    ],
    specializedId: 'delaware-pa-inner-ring',
    specializedTitle: 'Inner-ring west suburbs & I-95 module',
    specializedIntro: 'Delaware County estimates fail when older-stock access or Philly empty miles are ignored.',
    specializedBullets: [
      'Survey twin/rowhome curb width carefully.',
      'Price I-95/I-476 pairs portal-to-portal.',
      'Clarify Delaware vs Philadelphia/Chester destinations.',
      'Do not confuse Delaware County, PA with the state of Delaware on estimates.',
      'Verify PA PUC authority for in-state-only jobs and FMCSA for interstate legs.',
    ],
    schools: [
      { t: 'How districts work here', d: 'Multiple independent school districts serve Delaware County addresses. Confirm zoning carefully.' },
      { t: 'Research sources', d: 'District tools, PDE data, and campus visits beat ranking screenshots.' },
    ],
    hospitals: [
      { t: 'Major systems', d: 'Main Line Health, Crozer/Prospect-era facilities, and Philly-metro systems serve residents. Confirm networks for your household.' },
      { t: 'What relocators should do', d: 'Map peak-hour times into city specialty care. Transfer records early.' },
    ],
    housing: [
      { t: 'Older inner-ring stock', d: 'Twins and multi-family dominate many eastern corridors; western pockets show more HOA product.' },
      { t: 'Cost variation', d: 'Eastern multi-family often prices differently from western townships.' },
    ],
    townFit: [
      { t: 'Eastern inner-ring lifestyle', d: 'Closer city access with tight-street logistics.' },
      { t: 'Media / central pattern', d: 'Town amenities with mixed stock access.' },
      { t: 'Western township pattern', d: 'More HOA product with longer Philly commute risk.' },
    ],
    jobs: [
      { t: 'Employment anchors', d: 'Many residents commute into Philadelphia; local healthcare, education, and logistics also employ residents.' },
      { t: 'Commute realism', d: 'I-95 and I-476 peaks are real. Test drive peak routes into the city.' },
    ],
    lifestyle: [
      { t: 'Western inner-ring identity', d: 'Delaware County is distinct from Chester far-west growth and Philly city micro-markets.' },
      { t: 'Climate', d: 'Hot humid summers and winter ice/snow. Plan staging contingency.' },
    ],
    resources: [
      { l: 'Delaware County, PA — official site', h: 'https://www.delcopa.gov/' },
      { l: 'PennDOT 511PA traffic', h: 'https://www.511pa.com/' },
    ],
    directoryHint:
      'Prefer older twin/multi-family curb surveys; honest I-95 pricing into Philly. Verify PA PUC in-state and FMCSA interstate.',
  },
  {
    slug: 'chester',
    exportName: 'chesterCountyPaIntelligence',
    hub: 'Chester County Moving Intelligence Hub',
    eyebrow: 'Chester · Far-west growth, HOA subdivisions & longer portal times',
    h1: 'Moving in Chester County: Far-West Growth, HOA Villages & US-202 Logistics',
    opener:
      'Chester County is Philadelphia’s far-west growth collar: master-planned HOA density, longer empty miles from city yards, US-30/US-202 corridors, and township patterns that are not Delaware inner-ring twins and not Center City elevators. A West Chester multi-family unit, an Exton HOA two-story, a Malvern townhome, and a rural-edge lot do not share truck access or portal time. This hub is for Chester — not a Delaware County clone.',
    corridors: 'US-30 · US-202 · PA-100 · I-76 links · PA-3',
    differentIntro: 'Far-west Philly collar growth with longer portal times — not Delaware inner-ring density or Montgomery Main Line.',
    differentBullets: [
      { t: 'HOA master plans dominate many growth corridors', d: 'Gate lists, approved hours, and long cul-de-sac carries are routine.' },
      { t: 'Empty miles from Philly yards are real', d: 'Even “local” Chester pairs can price as distance work for city-based crews.' },
      { t: 'US-202 / US-30 define portal time', d: 'Cross-county pairs burn clock at peak.' },
      { t: 'Rural-edge lots still appear in western townships', d: 'Survey driveway access carefully.' },
      { t: 'Chester is not Delaware County', d: 'Far-west growth logistics differ from inner-ring I-95 twins.' },
    ],
    zonesHeading: 'Chester access zones',
    zonesIntro: 'Plan by West Chester/Exton growth, eastern approaches, southern townships, and western rural edges.',
    zones: [
      { id: 'west-chester-exton', name: 'West Chester, Exton & central growth', short: 'West Chester / Exton', hoods: ['West Chester', 'Exton', 'US-202 multi-family', 'HOA master plans'], housing: 'HOA SFH, multi-family, townhomes', challenges: ['HOA rules', 'US-202 congestion', 'Long portal time to Philly'], tips: 'Collect HOA packets. Build US-202 buffer. Prefer early starts.', keywords: ['west chester', 'exton', 'chester county'] },
      { id: 'east-approaches', name: 'Eastern approaches toward Delaware/Montco', short: 'East approaches', hoods: ['Malvern edges', 'Paoli edges', 'US-30 multi-family', 'HOA villages'], housing: 'HOA SFH, multi-family, townhomes', challenges: ['Cross-county confusion', 'Arterial congestion', 'Elevator buildings'], tips: 'Clarify Chester vs Delaware/Montgomery addresses. Confirm elevator reservations.', keywords: ['malvern', 'paoli', 'frazer'] },
      { id: 'south-townships', name: 'Southern township corridors', short: 'South townships', hoods: ['Kennett Square edges', 'Oxford edges', 'Southern HOA product'], housing: 'SFH, multi-family, rural-edge lots', challenges: ['Long empty miles', 'US-1 corridor congestion', 'Varied driveway access'], tips: 'Survey access photos. Prefer early starts for long south-county pairs.', keywords: ['kennett square', 'oxford', 'southern chester'] },
      { id: 'west-rural', name: 'Western rural-edge townships', short: 'West rural', hoods: ['Coatesville edges', 'Western tracts', 'Rural driveway lots'], housing: 'SFH, rural-edge lots', challenges: ['Long empty miles', 'Soft surfaces after rain', 'Limited alternate routes'], tips: 'Survey driveway and truck turn radius. Prefer early starts.', keywords: ['coatesville', 'western chester', 'rural'] },
    ],
    costIntro: 'HOA soft costs and long Philly-linked empty miles drive quotes.',
    costDrivers: [
      { t: 'Longer empty miles from city yards', d: 'Distance work disguised as “local.”' },
      { t: 'HOA gate lists and approved hours', d: 'Soft costs push demand into peak windows.' },
      { t: 'US-202 / US-30 congestion', d: 'Portal-to-portal spikes at peak.' },
      { t: 'Rural-edge access friction', d: 'Driveway surveys matter more than ZIP codes.' },
    ],
    ranges: [
      { l: 'Studio / 1BR (simple access)', v: '$450–$1,350+', n: 'Higher with HOA soft costs' },
      { l: '2–3BR HOA SFH or multi-family', v: '$1,400–$3,900+', n: 'Long portal times trend up' },
      { l: '3–4+ BR / long Philly-linked', v: '$2,600–$7,500+', n: 'Cross-county pairs price highest' },
      { l: 'Typical 2-person crew rate', v: '$110–$180+/hr', n: 'Portal-to-portal' },
    ],
    seasonalIntro: 'Family seasons and multi-family lease turns reshape growth-corridor access.',
    seasonal: [
      { t: 'Best windows: mid-week early mornings', d: 'Reduce US-202 pain and clear HOA hours.' },
      { t: 'Peak family season: late May–mid-August', d: 'Book suburban Saturdays early.' },
      { t: 'Month-end multi-family turns', d: 'Exton/West Chester multi-unit fills first.' },
      { t: 'Winter ice and snow', d: 'Confirm contingency for driveway access.' },
    ],
    specializedId: 'chester-far-west-growth',
    specializedTitle: 'Far-west growth & HOA logistics module',
    specializedIntro: 'Chester estimates fail when empty miles or HOA rules are ignored.',
    specializedBullets: [
      'Collect HOA packets for master-planned villages.',
      'Price Philly-linked pairs as logistics days.',
      'Clarify Chester vs Delaware/Montgomery destinations.',
      'Do not reuse Delaware inner-ring twin assumptions here.',
      'Verify PA PUC authority for in-state-only jobs and FMCSA for interstate legs.',
    ],
    schools: [
      { t: 'How districts work here', d: 'Multiple independent school districts serve Chester County addresses. Confirm zoning carefully.' },
      { t: 'Growth areas', d: 'Central growth corridors can see enrollment pressure. Ask about capacity when touring.' },
    ],
    hospitals: [
      { t: 'Major systems', d: 'Chester County Hospital / Penn Medicine and regional systems serve residents. Confirm networks.' },
      { t: 'What relocators should do', d: 'Map peak-hour times into Philly specialty care. Transfer records early.' },
    ],
    housing: [
      { t: 'HOA growth product', d: 'Master-planned villages dominate many corridors; western edges remain more rural.' },
      { t: 'Cost variation', d: 'Eastern approaches often price differently from far-west rural townships.' },
    ],
    townFit: [
      { t: 'West Chester / Exton lifestyle', d: 'Growth amenities with long Philly commute risk.' },
      { t: 'Eastern approach pattern', d: 'Closer collar access with multi-family logistics.' },
      { t: 'Western rural lifestyle', d: 'Space with long empty-mile move logistics.' },
    ],
    jobs: [
      { t: 'Employment anchors', d: 'Many residents commute into Philly or Montgomery; local corporate, healthcare, and logistics also employ residents.' },
      { t: 'Commute realism', d: 'US-202 and US-30 peaks are real. Test drive peak routes.' },
    ],
    lifestyle: [
      { t: 'Far-west collar identity', d: 'Chester is distinct from Delaware inner-ring and Philly city micro-markets.' },
      { t: 'Climate', d: 'Hot humid summers and winter ice/snow. Plan staging contingency.' },
    ],
    resources: [
      { l: 'Chester County — official site', h: 'https://www.chesco.org/' },
      { l: 'PennDOT 511PA traffic', h: 'https://www.511pa.com/' },
    ],
    directoryHint:
      'Prefer HOA fluency and honest long-run pricing from Philly yards. Verify PA PUC in-state and FMCSA interstate.',
  },
];

// Continue with lancaster, york, berks, lehigh, northampton, westmoreland in second array
const midstate: Spec[] = [
  {
    slug: 'lancaster',
    exportName: 'lancasterCountyPaIntelligence',
    hub: 'Lancaster County Moving Intelligence Hub',
    eyebrow: 'Lancaster · Mid-state city + townships (not Philly spillover)',
    h1: 'Moving in Lancaster County: City Access, Township Runs & US-30 Logistics',
    opener:
      'Lancaster County is a mid-state market: Lancaster city multi-unit and older stock, surrounding townships with longer rural-edge runs, tourism pulses near certain corridors, and US-30/US-222 logistics that are not Philly collar freeways. A downtown Lancaster multi-family unit, a Manheim Township HOA home, an Ephrata twin, and a rural-edge farmhouse approach do not share truck access or empty-mile risk. This hub is for Lancaster — not a renamed Montgomery page.',
    corridors: 'US-30 · US-222 · PA-283 · I-76 links · PA-23',
    differentIntro: 'Mid-state city-and-township fabric — not Philly collar congestion patterns.',
    differentBullets: [
      { t: 'City multi-unit and township SFH are different products', d: 'Do not price downtown Lancaster like rural-edge lots.' },
      { t: 'US-30 / US-222 define portal time', d: 'Cross-county pairs burn clock at peak.' },
      { t: 'Tourism pulses affect some corridors', d: 'Prefer mid-week near visitor-heavy edges when flexible.' },
      { t: 'Longer township empty miles are routine', d: 'Survey driveway access on rural edges.' },
      { t: 'Lancaster is not Philly spillover', d: 'Mid-state logistics differ from I-95 collar counties.' },
    ],
    zonesHeading: 'Lancaster access zones',
    zonesIntro: 'Plan by Lancaster city, northern townships, eastern corridors, and southern/western rural edges.',
    zones: [
      { id: 'lancaster-city', name: 'Lancaster city multi-unit & older stock', short: 'Lancaster city', hoods: ['Downtown Lancaster', 'City multi-family', 'Older SFH pockets'], housing: 'Multi-family, twins, older SFH', challenges: ['Tight streets', 'Mixed stairs and elevators', 'Event-day curb pressure'], tips: 'Photo curb. Confirm unit access type. Prefer mid-week mornings.', keywords: ['lancaster', 'downtown lancaster'] },
      { id: 'north-townships', name: 'Northern township growth', short: 'North townships', hoods: ['Manheim Township', 'Lititz edges', 'US-222 multi-family', 'HOA villages'], housing: 'HOA SFH, multi-family, townhomes', challenges: ['HOA rules', 'US-222 congestion', 'Longer empty miles from city yards'], tips: 'Collect HOA packets. Build arterial buffer.', keywords: ['manheim township', 'lititz', 'neffsville'] },
      { id: 'east-corridors', name: 'Eastern corridors & small cities', short: 'East corridors', hoods: ['Ephrata', 'New Holland edges', 'US-322 corridors'], housing: 'SFH, multi-family, twins', challenges: ['Arterial congestion', 'Mixed access types', 'Long portal time to Lancaster city'], tips: 'Prefer early starts. Survey driveway depth.', keywords: ['ephrata', 'new holland'] },
      { id: 'rural-edges', name: 'Southern & western rural edges', short: 'Rural edges', hoods: ['Quarryville edges', 'Columbia edges', 'Rural driveway lots'], housing: 'SFH, rural-edge lots', challenges: ['Long empty miles', 'Soft surfaces after rain', 'Limited alternate routes'], tips: 'Survey truck access. Prefer early starts for long pairs.', keywords: ['quarryville', 'columbia', 'rural lancaster'] },
    ],
    costIntro: 'Township empty miles and city multi-unit access drive quotes.',
    costDrivers: [
      { t: 'Longer township empty miles', d: 'Distance work disguised as “local.”' },
      { t: 'City multi-unit access', d: 'Stairs and elevators raise labor hours.' },
      { t: 'US-30 / US-222 congestion', d: 'Portal-to-portal spikes at peak.' },
      { t: 'HOA soft costs in growth townships', d: 'Gate lists push demand into peak windows.' },
    ],
    ranges: [
      { l: 'Studio / 1BR (simple access)', v: '$400–$1,250+', n: 'Higher with elevators' },
      { l: '2–3BR condo or modest SFH', v: '$1,250–$3,500+', n: 'Township distance trends up' },
      { l: '3–4+ BR / long township', v: '$2,300–$6,500+', n: 'Rural-edge pairs price highest' },
      { l: 'Typical 2-person crew rate', v: '$100–$170+/hr', n: 'Portal-to-portal' },
    ],
    seasonalIntro: 'Family seasons, multi-family turns, and tourism pulses reshape access.',
    seasonal: [
      { t: 'Best windows: mid-week early mornings', d: 'Reduce arterial pain.' },
      { t: 'Peak family season: late May–mid-August', d: 'Book suburban Saturdays early.' },
      { t: 'Tourism-adjacent peak weekends', d: 'Prefer mid-week near visitor-heavy edges when flexible.' },
      { t: 'Winter ice and snow', d: 'Confirm contingency for rural driveway access.' },
    ],
    specializedId: 'lancaster-midstate',
    specializedTitle: 'Mid-state city & township logistics module',
    specializedIntro: 'Lancaster estimates fail when township empty miles are ignored.',
    specializedBullets: [
      'Price long township pairs portal-to-portal.',
      'Survey rural-edge driveway access carefully.',
      'Collect HOA packets for northern growth product.',
      'Do not reuse Philly collar assumptions here.',
      'Verify PA PUC authority for in-state-only jobs and FMCSA for interstate legs.',
    ],
    schools: [
      { t: 'How districts work here', d: 'School District of Lancaster and numerous township districts serve different addresses. Confirm zoning carefully.' },
      { t: 'Research sources', d: 'District tools, PDE data, and campus visits beat ranking screenshots.' },
    ],
    hospitals: [
      { t: 'Major systems', d: 'Penn Medicine Lancaster General Health and regional facilities serve residents. Confirm networks.' },
      { t: 'What relocators should do', d: 'Map peak-hour drive times from outer townships. Transfer records early.' },
    ],
    housing: [
      { t: 'City vs township stock', d: 'Multi-unit and older stock in the city; more SFH/HOA in surrounding townships.' },
      { t: 'Cost variation', d: 'City multi-family often prices differently from rural-edge lots.' },
    ],
    townFit: [
      { t: 'City lifestyle', d: 'Walkable amenities with multi-unit logistics.' },
      { t: 'Northern township pattern', d: 'HOA growth with arterial congestion.' },
      { t: 'Rural-edge lifestyle', d: 'Space with long empty-mile move logistics.' },
    ],
    jobs: [
      { t: 'Employment anchors', d: 'Healthcare, manufacturing, agriculture-related industry, education, and tourism services shape employment.' },
      { t: 'Commute realism', d: 'US-30 and US-222 peaks are real. Test drive peak routes.' },
    ],
    lifestyle: [
      { t: 'Mid-state identity', d: 'Lancaster is distinct from Philly collar counties and Pittsburgh hills.' },
      { t: 'Climate', d: 'Hot humid summers and winter ice/snow. Plan staging contingency.' },
    ],
    resources: [
      { l: 'Lancaster County — official site', h: 'https://www.lancastercountypa.gov/' },
      { l: 'City of Lancaster', h: 'https://cityoflancasterpa.com/' },
      { l: 'PennDOT 511PA traffic', h: 'https://www.511pa.com/' },
    ],
    directoryHint:
      'Prefer township empty-mile honesty and city multi-unit access surveys. Verify PA PUC in-state and FMCSA interstate.',
  },
  {
    slug: 'york',
    exportName: 'yorkCountyPaIntelligence',
    hub: 'York County Moving Intelligence Hub',
    eyebrow: 'York · South-central PA, I-83 corridor (Harrisburg/Baltimore adjacency)',
    h1: 'Moving in York County: City Access, Township Growth & I-83 Logistics',
    opener:
      'York County is south-central Pennsylvania: York city multi-unit and older stock, suburban growth along I-83, township SFH, and adjacency patterns toward Harrisburg and Baltimore that are not Lancaster tourism edges and not Philly collar freeways. A York city multi-family unit, a Springettsbury HOA home, a Red Lion twin, and a rural-edge lot do not share truck access or portal time. This hub is for York — not a Lancaster clone.',
    corridors: 'I-83 · US-30 · PA-74 · PA-462 · I-76 links',
    differentIntro: 'South-central I-83 corridor market — not Lancaster city-township tourism mix or Philly spillover.',
    differentBullets: [
      { t: 'I-83 defines many regional portal times', d: 'Harrisburg- and Baltimore-adjacent pairs burn clock at peak.' },
      { t: 'City multi-unit differs from township growth product', d: 'Access surveys matter more than ZIP labels.' },
      { t: 'Cross-state Maryland pairs are routine', d: 'Clarify PA PUC vs FMCSA for destinations outside Pennsylvania.' },
      { t: 'HOA growth appears along suburban corridors', d: 'Collect gate lists where planned communities apply.' },
      { t: 'York is not Lancaster', d: 'I-83 south-central logistics differ from US-30 Lancaster patterns.' },
    ],
    zonesHeading: 'York access zones',
    zonesIntro: 'Plan by York city, northern I-83 growth, southern townships, and western/eastern rural edges.',
    zones: [
      { id: 'york-city', name: 'York city multi-unit & older stock', short: 'York city', hoods: ['Downtown York', 'City multi-family', 'Older SFH pockets'], housing: 'Multi-family, twins, older SFH', challenges: ['Tight streets', 'Mixed stairs and elevators', 'Arterial congestion'], tips: 'Photo curb. Confirm unit access type. Prefer mid-week mornings.', keywords: ['york', 'downtown york'] },
      { id: 'north-i83', name: 'Northern I-83 suburban growth', short: 'North I-83', hoods: ['Springettsbury', 'Manchester edges', 'I-83 multi-family', 'HOA villages'], housing: 'HOA SFH, multi-family, townhomes', challenges: ['I-83 congestion', 'HOA rules', 'Long portal time to city core'], tips: 'Collect HOA packets. Build I-83 buffer.', keywords: ['springettsbury', 'manchester', 'emigsville'] },
      { id: 'south-townships', name: 'Southern township corridors', short: 'South townships', hoods: ['Red Lion', 'Dallastown edges', 'Southern SFH tracts'], housing: 'SFH, multi-family, twins', challenges: ['Long empty miles', 'PA-74 congestion', 'Varied driveway access'], tips: 'Prefer early starts. Survey driveway depth.', keywords: ['red lion', 'dallastown', 'southern york'] },
      { id: 'rural-edges', name: 'Western & eastern rural edges', short: 'Rural edges', hoods: ['Hanover edges', 'Eastern tracts', 'Rural driveway lots'], housing: 'SFH, rural-edge lots', challenges: ['Long empty miles', 'Soft surfaces after rain', 'Limited alternate routes'], tips: 'Survey truck access. Prefer early starts for long pairs.', keywords: ['hanover', 'rural york'] },
    ],
    costIntro: 'I-83 portal time and township empty miles drive quotes.',
    costDrivers: [
      { t: 'I-83 regional congestion', d: 'Portal-to-portal spikes at peak.' },
      { t: 'Township empty miles', d: 'Distance work disguised as “local.”' },
      { t: 'City multi-unit access', d: 'Stairs and elevators raise labor hours.' },
      { t: 'Cross-state empty miles', d: 'Maryland destinations change staging and authority assumptions.' },
    ],
    ranges: [
      { l: 'Studio / 1BR (simple access)', v: '$400–$1,200+', n: 'Higher with elevators' },
      { l: '2–3BR condo or modest SFH', v: '$1,200–$3,400+', n: 'I-83 pairs trend up' },
      { l: '3–4+ BR / long regional', v: '$2,200–$6,400+', n: 'Cross-county pairs price highest' },
      { l: 'Typical 2-person crew rate', v: '$100–$170+/hr', n: 'Portal-to-portal' },
    ],
    seasonalIntro: 'Family seasons and multi-family lease turns reshape access.',
    seasonal: [
      { t: 'Best windows: mid-week early mornings', d: 'Reduce I-83 pain.' },
      { t: 'Peak family season: late May–mid-August', d: 'Book suburban Saturdays early.' },
      { t: 'Month-end multi-family turns', d: 'Northern multi-unit fills first.' },
      { t: 'Winter ice and snow', d: 'Confirm contingency for driveway access.' },
    ],
    specializedId: 'york-i83-corridor',
    specializedTitle: 'I-83 south-central corridor module',
    specializedIntro: 'York estimates fail when regional empty miles or Maryland pairs are ignored.',
    specializedBullets: [
      'Price I-83 pairs portal-to-portal.',
      'Clarify Pennsylvania vs Maryland destinations.',
      'Collect HOA packets for northern growth product.',
      'Do not reuse Lancaster tourism-edge assumptions here.',
      'Verify PA PUC authority for in-state-only jobs and FMCSA for interstate legs.',
    ],
    schools: [
      { t: 'How districts work here', d: 'York City School District and numerous township districts serve different addresses. Confirm zoning carefully.' },
      { t: 'Research sources', d: 'District tools, PDE data, and campus visits beat ranking screenshots.' },
    ],
    hospitals: [
      { t: 'Major systems', d: 'WellSpan York Hospital and regional facilities serve residents. Confirm networks.' },
      { t: 'What relocators should do', d: 'Map peak-hour drive times from outer townships. Transfer records early.' },
    ],
    housing: [
      { t: 'City vs suburban growth stock', d: 'Older multi-unit in the city; more HOA SFH along I-83 growth corridors.' },
      { t: 'Cost variation', d: 'Northern suburbs often price differently from southern rural edges.' },
    ],
    townFit: [
      { t: 'City lifestyle', d: 'Multi-unit amenities with curb logistics.' },
      { t: 'Northern I-83 growth pattern', d: 'HOA product with freeway commute risk.' },
      { t: 'Southern/rural lifestyle', d: 'Space with long empty-mile move logistics.' },
    ],
    jobs: [
      { t: 'Employment anchors', d: 'Healthcare, manufacturing, logistics, and education shape employment; some residents commute toward Harrisburg or Maryland.' },
      { t: 'Commute realism', d: 'I-83 peaks are real. Test drive peak routes.' },
    ],
    lifestyle: [
      { t: 'South-central identity', d: 'York is distinct from Lancaster mid-state tourism edges and Philly collar counties.' },
      { t: 'Climate', d: 'Hot humid summers and winter ice/snow. Plan staging contingency.' },
    ],
    resources: [
      { l: 'York County — official site', h: 'https://yorkcountypa.gov/' },
      { l: 'City of York', h: 'https://www.yorkcity.org/' },
      { l: 'PennDOT 511PA traffic', h: 'https://www.511pa.com/' },
    ],
    directoryHint:
      'Prefer I-83 portal-time honesty and city multi-unit access surveys. Verify PA PUC in-state and FMCSA interstate.',
  },
  {
    slug: 'berks',
    exportName: 'berksCountyPaIntelligence',
    hub: 'Berks County Moving Intelligence Hub',
    eyebrow: 'Berks · Reading regional market (not a Philly clone)',
    h1: 'Moving in Berks County: Reading Access, Township Runs & US-222 Logistics',
    opener:
      'Berks County is a Reading-centered regional market: city multi-unit and older stock, surrounding townships, US-222/US-422 logistics, and mid-state patterns that are not Philly collar freeways and not Lehigh Valley industrial corridors alone. A Reading multi-family unit, a Wyomissing HOA home, an Exeter twin, and a rural-edge lot do not share truck access or empty-mile risk. This hub is for Berks — not a renamed Montgomery page.',
    corridors: 'US-222 · US-422 · I-78 links · PA-61 · PA-12',
    differentIntro: 'Reading regional city-and-township fabric — not Philly spillover or Allentown industrial mix.',
    differentBullets: [
      { t: 'Reading multi-unit differs from township SFH', d: 'Access surveys matter more than county-wide rates.' },
      { t: 'US-222 / US-422 define portal time', d: 'Cross-county pairs burn clock at peak.' },
      { t: 'Hills and older stock appear in city corridors', d: 'Stairs and curb limits raise labor hours.' },
      { t: 'Longer township empty miles are routine', d: 'Survey driveway access on rural edges.' },
      { t: 'Berks is not Philly or Lehigh Valley', d: 'Do not reuse collar-county or Allentown assumptions here.' },
    ],
    zonesHeading: 'Berks access zones',
    zonesIntro: 'Plan by Reading city, western suburbs, eastern corridors, and rural edges.',
    zones: [
      { id: 'reading-city', name: 'Reading city multi-unit & older stock', short: 'Reading city', hoods: ['Downtown Reading', 'City multi-family', 'Older SFH pockets'], housing: 'Multi-family, twins, older SFH', challenges: ['Hills and stairs', 'Tight streets', 'Arterial congestion'], tips: 'Photo curb and stairs. Prefer mid-week mornings.', keywords: ['reading', 'downtown reading'] },
      { id: 'west-suburbs', name: 'Western suburban multi-family & HOA', short: 'West suburbs', hoods: ['Wyomissing', 'Sinking Spring edges', 'US-422 multi-family', 'HOA villages'], housing: 'HOA SFH, multi-family, townhomes', challenges: ['HOA rules', 'US-422 congestion', 'Long portal time to Reading core'], tips: 'Collect HOA packets. Build arterial buffer.', keywords: ['wyomissing', 'sinking spring', 'west reading'] },
      { id: 'east-corridors', name: 'Eastern corridors & small towns', short: 'East corridors', hoods: ['Exeter', 'Birdsboro edges', 'US-422 east multi-family'], housing: 'SFH, multi-family, twins', challenges: ['Arterial congestion', 'Mixed access types', 'Longer empty miles'], tips: 'Prefer early starts. Survey driveway depth.', keywords: ['exeter', 'birdsboro', 'st. lawrence'] },
      { id: 'rural-edges', name: 'Northern & southern rural edges', short: 'Rural edges', hoods: ['Kutztown edges', 'Southern tracts', 'Rural driveway lots'], housing: 'SFH, rural-edge lots', challenges: ['Long empty miles', 'Soft surfaces after rain', 'Limited alternate routes'], tips: 'Survey truck access. Prefer early starts for long pairs.', keywords: ['kutztown', 'rural berks'] },
    ],
    costIntro: 'City hills/stairs and township empty miles drive quotes.',
    costDrivers: [
      { t: 'City stairs and curb friction', d: 'Labor hours rise without elevators.' },
      { t: 'US-222 / US-422 congestion', d: 'Portal-to-portal spikes at peak.' },
      { t: 'Township empty miles', d: 'Distance work disguised as “local.”' },
      { t: 'HOA soft costs in western suburbs', d: 'Gate lists push demand into peak windows.' },
    ],
    ranges: [
      { l: 'Studio / 1BR (simple access)', v: '$400–$1,200+', n: 'Higher with stairs' },
      { l: '2–3BR condo or modest SFH', v: '$1,200–$3,400+', n: 'Township distance trends up' },
      { l: '3–4+ BR / long township', v: '$2,200–$6,200+', n: 'Rural-edge pairs price highest' },
      { l: 'Typical 2-person crew rate', v: '$100–$170+/hr', n: 'Portal-to-portal' },
    ],
    seasonalIntro: 'Family seasons and multi-family lease turns reshape access.',
    seasonal: [
      { t: 'Best windows: mid-week early mornings', d: 'Reduce arterial pain.' },
      { t: 'Peak family season: late May–mid-August', d: 'Book suburban Saturdays early.' },
      { t: 'Month-end multi-family turns', d: 'City and western multi-unit fill first.' },
      { t: 'Winter ice and snow', d: 'Hills need weather contingency language.' },
    ],
    specializedId: 'berks-reading-regional',
    specializedTitle: 'Reading regional city & township module',
    specializedIntro: 'Berks estimates fail when hills or township empty miles are ignored.',
    specializedBullets: [
      'Survey stairs and curb in Reading city carefully.',
      'Price long township pairs portal-to-portal.',
      'Collect HOA packets for western suburban product.',
      'Do not reuse Philly collar or Lehigh Valley assumptions here.',
      'Verify PA PUC authority for in-state-only jobs and FMCSA for interstate legs.',
    ],
    schools: [
      { t: 'How districts work here', d: 'Reading School District and numerous township districts serve different addresses. Confirm zoning carefully.' },
      { t: 'Research sources', d: 'District tools, PDE data, and campus visits beat ranking screenshots.' },
    ],
    hospitals: [
      { t: 'Major systems', d: 'Tower Health Reading Hospital and regional facilities serve residents. Confirm networks.' },
      { t: 'What relocators should do', d: 'Map peak-hour drive times from outer townships. Transfer records early.' },
    ],
    housing: [
      { t: 'City vs western suburban stock', d: 'Older multi-unit and hills in Reading; more HOA multi-family west.' },
      { t: 'Cost variation', d: 'Western suburbs often price differently from rural edges.' },
    ],
    townFit: [
      { t: 'Reading city lifestyle', d: 'Multi-unit amenities with hill/stair logistics.' },
      { t: 'Western suburb pattern', d: 'HOA product with arterial congestion.' },
      { t: 'Rural-edge lifestyle', d: 'Space with long empty-mile move logistics.' },
    ],
    jobs: [
      { t: 'Employment anchors', d: 'Healthcare, manufacturing, logistics, and education shape employment.' },
      { t: 'Commute realism', d: 'US-222 and US-422 peaks are real. Test drive peak routes.' },
    ],
    lifestyle: [
      { t: 'Reading regional identity', d: 'Berks is distinct from Philly collar counties and Lehigh Valley industrial corridors.' },
      { t: 'Climate', d: 'Hot humid summers and winter ice/snow. Plan staging contingency.' },
    ],
    resources: [
      { l: 'Berks County — official site', h: 'https://www.berkspa.gov/' },
      { l: 'City of Reading', h: 'https://www.readingpa.gov/' },
      { l: 'PennDOT 511PA traffic', h: 'https://www.511pa.com/' },
    ],
    directoryHint:
      'Prefer Reading hill/stair experience and township empty-mile honesty. Verify PA PUC in-state and FMCSA interstate.',
  },
  {
    slug: 'lehigh',
    exportName: 'lehighCountyPaIntelligence',
    hub: 'Lehigh County Moving Intelligence Hub',
    eyebrow: 'Lehigh · Allentown core & Lehigh Valley industrial/residential mix',
    h1: 'Moving in Lehigh County: Allentown Access, Valley Multi-Family & I-78 Logistics',
    opener:
      'Lehigh County is the Allentown half of the Lehigh Valley: city multi-unit and older stock, suburban multi-family along PA-22/I-78, industrial-adjacent residential edges, and logistics that are not Northampton’s Bethlehem/Easton patterns alone and not Philly collar freeways. An Allentown multi-family unit, a South Whitehall HOA home, an Emmaus twin, and a rural-edge lot do not share truck access or portal time. This hub is for Lehigh — not a Northampton clone.',
    corridors: 'I-78 · PA-22 · PA-309 · US-22 · PA-100',
    differentIntro: 'Allentown-centered Valley mix — not Bethlehem/Easton Northampton product or Philly spillover.',
    differentBullets: [
      { t: 'Allentown multi-unit differs from western township growth', d: 'Access surveys matter more than Valley-wide rates.' },
      { t: 'I-78 / PA-22 define portal time', d: 'Cross-county pairs burn clock at peak.' },
      { t: 'Industrial-adjacent corridors change staging', d: 'Freight traffic and curb competition differ from pure bedroom HOAs.' },
      { t: 'Northampton pairs are everyday Valley logistics', d: 'Keep county lines clear for drive time and authority assumptions.' },
      { t: 'Lehigh is not Northampton', d: 'Allentown patterns differ from Bethlehem/Easton micro-markets.' },
    ],
    zonesHeading: 'Lehigh access zones',
    zonesIntro: 'Plan by Allentown city, western suburbs, southern corridors, and northern approaches toward Northampton.',
    zones: [
      { id: 'allentown-city', name: 'Allentown city multi-unit & older stock', short: 'Allentown city', hoods: ['Downtown Allentown', 'City multi-family', 'Older SFH pockets'], housing: 'Multi-family, twins, older SFH', challenges: ['Tight streets', 'Mixed stairs and elevators', 'Arterial congestion'], tips: 'Photo curb. Confirm unit access type. Prefer mid-week mornings.', keywords: ['allentown', 'downtown allentown'] },
      { id: 'west-suburbs', name: 'Western suburban multi-family & HOA', short: 'West suburbs', hoods: ['South Whitehall', 'Upper Macungie edges', 'PA-22 multi-family', 'HOA villages'], housing: 'HOA SFH, multi-family, townhomes', challenges: ['HOA rules', 'PA-22 / I-78 congestion', 'Long portal time to city core'], tips: 'Collect HOA packets. Build freeway buffer.', keywords: ['south whitehall', 'upper macungie', 'wescosville'] },
      { id: 'south-corridors', name: 'Southern corridors & Emmaus edges', short: 'South corridors', hoods: ['Emmaus', 'Salisbury edges', 'PA-29 multi-family'], housing: 'SFH, multi-family, twins', challenges: ['Arterial congestion', 'Mixed access types', 'Longer empty miles'], tips: 'Prefer early starts. Survey driveway depth.', keywords: ['emmaus', 'salisbury', 'fountain hill edges'] },
      { id: 'north-valley', name: 'Northern approaches toward Northampton', short: 'North Valley', hoods: ['Whitehall', 'Catasauqua edges', 'US-22 multi-family'], housing: 'Multi-family, SFH, townhomes', challenges: ['US-22 congestion', 'Cross-county confusion', 'Elevator buildings'], tips: 'Clarify Lehigh vs Northampton addresses. Confirm elevator reservations.', keywords: ['whitehall', 'catasauqua', 'coplay'] },
    ],
    costIntro: 'Valley freeway portal time and multi-unit access drive quotes.',
    costDrivers: [
      { t: 'I-78 / PA-22 congestion', d: 'Portal-to-portal spikes at peak.' },
      { t: 'City multi-unit access', d: 'Stairs and elevators raise labor hours.' },
      { t: 'HOA soft costs in western suburbs', d: 'Gate lists push demand into peak windows.' },
      { t: 'Cross-county empty miles', d: 'Northampton destinations raise staging distance.' },
    ],
    ranges: [
      { l: 'Studio / 1BR (simple access)', v: '$400–$1,250+', n: 'Higher with elevators' },
      { l: '2–3BR condo or modest SFH', v: '$1,250–$3,500+', n: 'I-78 pairs trend up' },
      { l: '3–4+ BR / long Valley', v: '$2,300–$6,500+', n: 'Cross-county pairs price highest' },
      { l: 'Typical 2-person crew rate', v: '$100–$170+/hr', n: 'Portal-to-portal' },
    ],
    seasonalIntro: 'Family seasons and multi-family lease turns reshape Valley access.',
    seasonal: [
      { t: 'Best windows: mid-week early mornings', d: 'Reduce I-78/PA-22 pain.' },
      { t: 'Peak family season: late May–mid-August', d: 'Book suburban Saturdays early.' },
      { t: 'Month-end multi-family turns', d: 'Western multi-unit fills first.' },
      { t: 'Winter ice and snow', d: 'Confirm contingency for driveway access.' },
    ],
    specializedId: 'lehigh-allentown-valley',
    specializedTitle: 'Allentown & Lehigh Valley logistics module',
    specializedIntro: 'Lehigh estimates fail when Valley freeways or Northampton pairs are ignored.',
    specializedBullets: [
      'Price I-78/PA-22 pairs portal-to-portal.',
      'Clarify Lehigh vs Northampton destinations.',
      'Collect HOA packets for western suburban product.',
      'Do not reuse Bethlehem/Easton assumptions as Allentown defaults.',
      'Verify PA PUC authority for in-state-only jobs and FMCSA for interstate legs.',
    ],
    schools: [
      { t: 'How districts work here', d: 'Allentown School District and numerous township districts serve different addresses. Confirm zoning carefully.' },
      { t: 'Research sources', d: 'District tools, PDE data, and campus visits beat ranking screenshots.' },
    ],
    hospitals: [
      { t: 'Major systems', d: 'Lehigh Valley Health Network and regional facilities serve residents. Confirm networks.' },
      { t: 'What relocators should do', d: 'Map peak-hour drive times across the Valley. Transfer records early.' },
    ],
    housing: [
      { t: 'City vs western suburban stock', d: 'Multi-unit and older stock in Allentown; more HOA multi-family west.' },
      { t: 'Cost variation', d: 'Western suburbs often price differently from city multi-family.' },
    ],
    townFit: [
      { t: 'Allentown city lifestyle', d: 'Multi-unit amenities with curb logistics.' },
      { t: 'Western suburb pattern', d: 'HOA product with freeway commute risk.' },
      { t: 'Southern corridor pattern', d: 'Town amenities with mixed stock access.' },
    ],
    jobs: [
      { t: 'Employment anchors', d: 'Healthcare, logistics, manufacturing, education, and professional services shape employment.' },
      { t: 'Commute realism', d: 'I-78 and PA-22 peaks are real. Test drive peak routes.' },
    ],
    lifestyle: [
      { t: 'Lehigh Valley identity', d: 'Lehigh is distinct from Northampton partner towns and Philly collar counties.' },
      { t: 'Climate', d: 'Hot humid summers and winter ice/snow. Plan staging contingency.' },
    ],
    resources: [
      { l: 'Lehigh County — official site', h: 'https://www.lehighcounty.org/' },
      { l: 'City of Allentown', h: 'https://www.allentownpa.gov/' },
      { l: 'PennDOT 511PA traffic', h: 'https://www.511pa.com/' },
    ],
    directoryHint:
      'Prefer Allentown multi-unit experience and Valley freeway honesty. Verify PA PUC in-state and FMCSA interstate.',
  },
  {
    slug: 'northampton',
    exportName: 'northamptonCountyPaIntelligence',
    hub: 'Northampton County Moving Intelligence Hub',
    eyebrow: 'Northampton · Bethlehem/Easton Lehigh Valley partner (not Allentown clone)',
    h1: 'Moving in Northampton County: Bethlehem Access, Easton Edges & I-78 Logistics',
    opener:
      'Northampton County is the Bethlehem–Easton half of the Lehigh Valley: Bethlehem multi-unit and older stock, Easton river-edge logistics, suburban multi-family along US-22/I-78, and patterns that complement Lehigh without cloning Allentown. A Bethlehem multi-family unit, an Easton twin, a Bethlehem Township HOA home, and a Bangor-edge lot do not share truck access or portal time. This hub is for Northampton — not a Lehigh County rename.',
    corridors: 'I-78 · PA-33 · US-22 · PA-611 · PA-248',
    differentIntro: 'Bethlehem/Easton micro-markets — not Allentown defaults or Philly collar patterns.',
    differentBullets: [
      { t: 'Bethlehem and Easton are different access products', d: 'Do not price river-edge Easton like Bethlehem multi-family.' },
      { t: 'I-78 / US-22 define portal time', d: 'Cross-county pairs burn clock at peak.' },
      { t: 'Lehigh pairs are everyday Valley logistics', d: 'Keep county lines clear for drive time and authority assumptions.' },
      { t: 'New Jersey adjacency exists on eastern edges', d: 'Clarify PA PUC vs FMCSA for destinations outside Pennsylvania.' },
      { t: 'Northampton is not Lehigh', d: 'Bethlehem/Easton patterns differ from Allentown industrial/residential mix.' },
    ],
    zonesHeading: 'Northampton access zones',
    zonesIntro: 'Plan by Bethlehem, Easton, township growth, and northern rural edges.',
    zones: [
      { id: 'bethlehem', name: 'Bethlehem multi-unit & older stock', short: 'Bethlehem', hoods: ['Downtown Bethlehem', 'South Bethlehem edges', 'City multi-family', 'Older SFH pockets'], housing: 'Multi-family, twins, older SFH', challenges: ['Tight streets', 'Mixed stairs and elevators', 'Event-day curb pressure'], tips: 'Photo curb. Confirm unit access type. Prefer mid-week mornings.', keywords: ['bethlehem', 'south bethlehem'] },
      { id: 'easton', name: 'Easton river-edge & multi-family', short: 'Easton', hoods: ['Downtown Easton', 'West Ward edges', 'River-edge multi-family', 'PA-611 corridors'], housing: 'Multi-family, twins, older SFH', challenges: ['River-edge curb limits', 'Bridge approach congestion', 'NJ-adjacent empty miles'], tips: 'Survey curb width. Clarify Pennsylvania vs New Jersey destinations.', keywords: ['easton', 'forks township edges'] },
      { id: 'township-growth', name: 'Bethlehem Township & suburban multi-family', short: 'Township growth', hoods: ['Bethlehem Township', 'Palmer edges', 'US-22 multi-family', 'HOA villages'], housing: 'HOA SFH, multi-family, townhomes', challenges: ['HOA rules', 'US-22 congestion', 'Long portal time to city cores'], tips: 'Collect HOA packets. Build freeway buffer.', keywords: ['bethlehem township', 'palmer', 'hanover township'] },
      { id: 'north-rural', name: 'Northern rural edges', short: 'North rural', hoods: ['Bangor edges', 'Wind Gap edges', 'Rural driveway lots'], housing: 'SFH, rural-edge lots', challenges: ['Long empty miles', 'PA-33 congestion', 'Limited alternate routes'], tips: 'Survey driveway access. Prefer early starts for long pairs.', keywords: ['bangor', 'wind gap', 'pen argyl'] },
    ],
    costIntro: 'Valley freeways and dual-city access patterns drive quotes.',
    costDrivers: [
      { t: 'I-78 / US-22 congestion', d: 'Portal-to-portal spikes at peak.' },
      { t: 'Bethlehem vs Easton access differences', d: 'Surveys must match the correct micro-market.' },
      { t: 'HOA soft costs in township growth', d: 'Gate lists push demand into peak windows.' },
      { t: 'Cross-state empty miles', d: 'New Jersey destinations change staging and authority assumptions.' },
    ],
    ranges: [
      { l: 'Studio / 1BR (simple access)', v: '$400–$1,250+', n: 'Higher with elevators' },
      { l: '2–3BR condo or modest SFH', v: '$1,250–$3,500+', n: 'I-78 pairs trend up' },
      { l: '3–4+ BR / long Valley / cross-state', v: '$2,300–$6,600+', n: 'NJ pairs price highest' },
      { l: 'Typical 2-person crew rate', v: '$100–$170+/hr', n: 'Portal-to-portal' },
    ],
    seasonalIntro: 'Family seasons and multi-family lease turns reshape Valley access.',
    seasonal: [
      { t: 'Best windows: mid-week early mornings', d: 'Reduce I-78/US-22 pain.' },
      { t: 'Peak family season: late May–mid-August', d: 'Book suburban Saturdays early.' },
      { t: 'Month-end multi-family turns', d: 'Bethlehem and township multi-unit fill first.' },
      { t: 'Winter ice and snow', d: 'Confirm contingency for driveway access.' },
    ],
    specializedId: 'northampton-bethlehem-easton',
    specializedTitle: 'Bethlehem/Easton Valley partner module',
    specializedIntro: 'Northampton estimates fail when Bethlehem and Easton are treated as identical.',
    specializedBullets: [
      'Survey Bethlehem multi-unit and Easton river-edge access as different products.',
      'Price I-78/US-22 pairs portal-to-portal.',
      'Clarify Northampton vs Lehigh and Pennsylvania vs New Jersey destinations.',
      'Do not reuse Allentown assumptions as Bethlehem defaults.',
      'Verify PA PUC authority for in-state-only jobs and FMCSA for interstate legs.',
    ],
    schools: [
      { t: 'How districts work here', d: 'Bethlehem Area, Easton Area, and numerous township districts serve different addresses. Confirm zoning carefully.' },
      { t: 'Research sources', d: 'District tools, PDE data, and campus visits beat ranking screenshots.' },
    ],
    hospitals: [
      { t: 'Major systems', d: 'St. Luke’s University Health Network, Lehigh Valley Health Network, and regional facilities serve residents. Confirm networks.' },
      { t: 'What relocators should do', d: 'Map peak-hour drive times across Bethlehem–Easton corridors. Transfer records early.' },
    ],
    housing: [
      { t: 'Dual-city stock', d: 'Bethlehem and Easton multi-unit/older stock differ; townships show more HOA multi-family.' },
      { t: 'Cost variation', d: 'Township growth often prices differently from river-edge older stock.' },
    ],
    townFit: [
      { t: 'Bethlehem lifestyle', d: 'City amenities with multi-unit logistics.' },
      { t: 'Easton pattern', d: 'River-edge living with curb and bridge tradeoffs.' },
      { t: 'Township growth pattern', d: 'HOA product with freeway commute risk.' },
    ],
    jobs: [
      { t: 'Employment anchors', d: 'Healthcare, logistics, manufacturing, education, and professional services shape employment.' },
      { t: 'Commute realism', d: 'I-78 and US-22 peaks are real. Test drive peak routes across the Valley and into NJ when relevant.' },
    ],
    lifestyle: [
      { t: 'Lehigh Valley partner identity', d: 'Northampton complements Lehigh without cloning Allentown.' },
      { t: 'Climate', d: 'Hot humid summers and winter ice/snow. Plan staging contingency.' },
    ],
    resources: [
      { l: 'Northampton County — official site', h: 'https://www.northamptoncounty.org/' },
      { l: 'City of Bethlehem', h: 'https://www.bethlehem-pa.gov/' },
      { l: 'City of Easton', h: 'https://www.easton-pa.com/' },
      { l: 'PennDOT 511PA traffic', h: 'https://www.511pa.com/' },
    ],
    directoryHint:
      'Prefer Bethlehem multi-unit and Easton river-edge surveys; Valley freeway honesty. Verify PA PUC in-state and FMCSA interstate.',
  },
  {
    slug: 'westmoreland',
    exportName: 'westmorelandCountyPaIntelligence',
    hub: 'Westmoreland County Moving Intelligence Hub',
    eyebrow: 'Westmoreland · East-of-Pittsburgh suburbs/towns (Allegheny complement)',
    h1: 'Moving in Westmoreland County: East Suburbs, Town Cores & US-30 Logistics',
    opener:
      'Westmoreland County is Pittsburgh’s eastern complement: Greensburg and small-city multi-unit, suburban townships, longer empty miles from Allegheny yards, and US-30/I-76 logistics that are not Downtown Pittsburgh elevators and not South Hills stair product alone. A Greensburg multi-family unit, a Murrysville HOA home, a Latrobe twin, and a rural-edge lot do not share truck access or portal time. This hub is for Westmoreland — not an Allegheny rename.',
    corridors: 'I-76 · US-30 · PA-66 · I-70 links · PA-119',
    differentIntro: 'East-of-Pittsburgh towns and townships — not city hills/stairs as the default product.',
    differentBullets: [
      { t: 'Longer empty miles from Pittsburgh yards are real', d: 'Even “local” Westmoreland pairs can price as distance work for city-based crews.' },
      { t: 'US-30 / I-76 define portal time', d: 'Cross-county pairs burn clock at peak.' },
      { t: 'Small-city multi-unit differs from rural-edge lots', d: 'Access surveys matter more than county-wide rates.' },
      { t: 'Winter access still matters on hills and rural driveways', d: 'Confirm weather contingency language.' },
      { t: 'Westmoreland is not Allegheny', d: 'Eastern suburban/town logistics differ from Pittsburgh neighborhood micro-markets.' },
    ],
    zonesHeading: 'Westmoreland access zones',
    zonesIntro: 'Plan by Greensburg core, western approaches toward Allegheny, eastern small cities, and rural edges.',
    zones: [
      { id: 'greensburg', name: 'Greensburg multi-unit & older stock', short: 'Greensburg', hoods: ['Downtown Greensburg', 'City multi-family', 'Older SFH pockets'], housing: 'Multi-family, twins, older SFH', challenges: ['Tight streets', 'Mixed stairs and elevators', 'Arterial congestion'], tips: 'Photo curb. Confirm unit access type. Prefer mid-week mornings.', keywords: ['greensburg', 'downtown greensburg'] },
      { id: 'west-approaches', name: 'Western approaches toward Allegheny', short: 'West approaches', hoods: ['Murrysville', 'Monroeville-edge (verify county)', 'US-22 multi-family', 'HOA villages'], housing: 'HOA SFH, multi-family, townhomes', challenges: ['Cross-county confusion', 'US-22 congestion', 'Long portal time to Pittsburgh core'], tips: 'Clarify Westmoreland vs Allegheny addresses. Collect HOA packets. Build arterial buffer.', keywords: ['murrysville', 'export', 'delmont'] },
      { id: 'east-towns', name: 'Eastern small cities & corridors', short: 'East towns', hoods: ['Latrobe', 'Jeannette edges', 'US-30 multi-family'], housing: 'SFH, multi-family, twins', challenges: ['Long empty miles', 'US-30 congestion', 'Mixed access types'], tips: 'Prefer early starts. Survey driveway depth.', keywords: ['latrobe', 'jeannette', 'irwin'] },
      { id: 'rural-edges', name: 'Northern & southern rural edges', short: 'Rural edges', hoods: ['New Kensington edges', 'Southern tracts', 'Rural driveway lots'], housing: 'SFH, rural-edge lots', challenges: ['Long empty miles', 'Soft surfaces after rain', 'Limited alternate routes'], tips: 'Survey truck access. Prefer early starts for long pairs.', keywords: ['new kensington', 'rural westmoreland'] },
    ],
    costIntro: 'Pittsburgh-linked empty miles and town multi-unit access drive quotes.',
    costDrivers: [
      { t: 'Longer empty miles from Allegheny yards', d: 'Distance work disguised as “local.”' },
      { t: 'US-30 / I-76 congestion', d: 'Portal-to-portal spikes at peak.' },
      { t: 'HOA soft costs on western approaches', d: 'Gate lists push demand into peak windows.' },
      { t: 'Winter rural driveway access', d: 'Ice and soft surfaces raise time risk.' },
    ],
    ranges: [
      { l: 'Studio / 1BR (simple access)', v: '$400–$1,200+', n: 'Higher with elevators' },
      { l: '2–3BR condo or modest SFH', v: '$1,200–$3,400+', n: 'Long portal times trend up' },
      { l: '3–4+ BR / long Pittsburgh-linked', v: '$2,200–$6,400+', n: 'Cross-county pairs price highest' },
      { l: 'Typical 2-person crew rate', v: '$100–$170+/hr', n: 'Portal-to-portal' },
    ],
    seasonalIntro: 'Family seasons, multi-family turns, and winter weather reshape access.',
    seasonal: [
      { t: 'Best windows: mid-week early mornings', d: 'Reduce US-30 pain.' },
      { t: 'Peak family season: late May–mid-August', d: 'Book suburban Saturdays early.' },
      { t: 'Month-end multi-family turns', d: 'Western multi-unit fills first.' },
      { t: 'Winter ice and snow', d: 'Confirm contingency for rural driveway access.' },
    ],
    specializedId: 'westmoreland-east-pittsburgh',
    specializedTitle: 'East-of-Pittsburgh suburbs & towns module',
    specializedIntro: 'Westmoreland estimates fail when empty miles or Allegheny pairs are ignored.',
    specializedBullets: [
      'Price Pittsburgh-linked pairs as logistics days.',
      'Clarify Westmoreland vs Allegheny destinations.',
      'Collect HOA packets for western approach product.',
      'Do not reuse Downtown Pittsburgh elevator assumptions as county defaults.',
      'Verify PA PUC authority for in-state-only jobs and FMCSA for interstate legs.',
    ],
    schools: [
      { t: 'How districts work here', d: 'Numerous independent school districts serve Westmoreland addresses. Confirm zoning carefully.' },
      { t: 'Research sources', d: 'District tools, PDE data, and campus visits beat ranking screenshots.' },
    ],
    hospitals: [
      { t: 'Major systems', d: 'Excela Health and Pittsburgh-metro systems serve residents. Confirm networks.' },
      { t: 'What relocators should do', d: 'Map peak-hour times into Allegheny specialty care. Transfer records early.' },
    ],
    housing: [
      { t: 'Town multi-unit vs western suburban stock', d: 'Greensburg multi-unit differs from Murrysville HOA product and rural edges.' },
      { t: 'Cost variation', d: 'Western approaches often price differently from eastern small cities.' },
    ],
    townFit: [
      { t: 'Greensburg lifestyle', d: 'County-seat amenities with multi-unit logistics.' },
      { t: 'Western approach pattern', d: 'Closer Pittsburgh access with HOA logistics.' },
      { t: 'Eastern small-city pattern', d: 'Town living with longer empty-mile move logistics.' },
    ],
    jobs: [
      { t: 'Employment anchors', d: 'Many residents commute into Allegheny; local healthcare, manufacturing, education, and retail also employ residents.' },
      { t: 'Commute realism', d: 'US-30 and Parkway-adjacent peaks are real. Test drive peak routes into Pittsburgh.' },
    ],
    lifestyle: [
      { t: 'East-of-Pittsburgh identity', d: 'Westmoreland complements Allegheny without cloning city hills/stairs micro-markets.' },
      { t: 'Climate', d: 'Four seasons with meaningful winter snow/ice. Plan staging contingency.' },
    ],
    resources: [
      { l: 'Westmoreland County — official site', h: 'https://www.westmorelandcountypa.gov/' },
      { l: 'City of Greensburg', h: 'https://www.greensburgpa.org/' },
      { l: 'PennDOT 511PA traffic', h: 'https://www.511pa.com/' },
    ],
    directoryHint:
      'Prefer honest Pittsburgh empty-mile pricing and western HOA fluency. Verify PA PUC in-state and FMCSA interstate.',
  },
];

const all = [...counties, ...more, ...midstate];
const outDir = join(process.cwd(), 'lib/local-movers/county-intelligence/pennsylvania');
mkdirSync(outDir, { recursive: true });
for (const c of all) {
  writeFileSync(join(outDir, `${c.slug}-pa.ts`), render(c), 'utf8');
  console.log('wrote', c.slug);
}
console.log('done', all.length);
