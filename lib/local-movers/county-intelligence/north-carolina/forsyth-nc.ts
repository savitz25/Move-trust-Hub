import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeNcPack } from '@/lib/local-movers/county-intelligence/north-carolina/nc-shared';

/** Forsyth County, NC — Winston-Salem Triad (complement to Guilford, not clone). */
export const forsythCountyNcIntelligence: CountyIntelligencePack = finalizeNcPack({
  countySlug: 'forsyth',
  hubTitle: 'Forsyth County Moving Intelligence Hub',
  eyebrow: 'Forsyth · Winston-Salem core, medical education & suburban growth',
  h1: 'Moving in Forsyth County: Winston-Salem Core, Suburban Growth & US-52 Logistics',
  heroOpener:
    'Forsyth County is the Winston-Salem half of the Triad partnership: downtown and West End historic fabric, medical and university employment corridors, and suburban growth that is denser along US-52 and Business 40 than High Point furniture edges. A downtown Winston loft, a West End craftsman, a Hanes Mall–area multi-family unit, and a northern HOA two-story do not share truck access or I-40 timing. This hub is for Forsyth — not a Guilford clone with a different city name.',
  heroCredibility:
    'NCUC household goods certificate (C-#) for intrastate NC moves · FMCSA for interstate · Winston-Salem access & Triad pairing awareness · Curated listings',
  majorCorridors: 'I-40 · US-52 · US-421 · I-285 · Business 40 · Silas Creek Pkwy',
  whatMakesDifferent: {
    title: 'What makes moving in Forsyth County different',
    intro: 'Winston-Salem historic core plus medical/education anchors — a Triad complement to Greensboro/High Point, not a duplicate.',
    bullets: [
      { title: 'West End and near-core stock is stair-and-street sensitive', detail: 'Older SFH grids need careful truck placement and long carries more often than elevator towers.' },
      { title: 'Medical and university corridors reshape mid-month demand', detail: 'Employment-driven apartment turns compete with weekend family SFH peaks.' },
      { title: 'US-52 / Business 40 / I-40 define portal time', detail: 'North–south and east–west pairs inside Forsyth still burn clock at peak.' },
      { title: 'Suburban growth is real but not Charlotte HOA sprawl scale', detail: 'Still collect HOA packets where planned communities apply.' },
      { title: 'Forsyth ↔ Guilford pairs are routine Triad logistics', detail: 'Clarify county lines for drive time and licensing assumptions.' },
      { title: 'Intrastate NC rules vs interstate authority', detail: 'In-state household moves generally need NCUC C-#. Interstate needs FMCSA.' },
    ],
  },
  zonesHeading: 'Forsyth access zones',
  zonesIntro: 'Plan by downtown/West End, medical/university corridors, south/west suburbs, northern growth, and eastern approaches toward Guilford.',
  zones: [
    {
      id: 'winston-core',
      name: 'Downtown Winston-Salem & West End',
      shortName: 'Downtown / West End',
      neighborhoods: ['Downtown', 'West End', 'Washington Park', 'Ardmore edges', 'Reynolda edges'],
      housingTypes: 'Historic SFH, limited mid-rise multi-family, lofts',
      challenges: ['Stairs and narrow streets', 'Limited curb staging', 'Event-day downtown friction'],
      moverTips: 'Photo curb and driveway. Prefer mid-week mornings. Confirm multi-unit elevator rules when present.',
      cityKeywords: ['winston-salem', 'winston', 'west end', 'downtown', 'ardmore', 'reynolda'],
    },
    {
      id: 'medical-university',
      name: 'Medical & university corridors',
      shortName: 'Medical / university',
      neighborhoods: ['Wake Forest University edges', 'Medical Parkway corridors', 'Cloverdale', 'Stratford edges'],
      housingTypes: 'Multi-family, townhomes, older SFH',
      challenges: ['Hospital traffic pulses', 'Mixed access types', 'Limited staging near campus edges'],
      moverTips: 'Avoid clinical peak hours when flexible. Confirm unit access type. Build arterial buffer.',
      cityKeywords: ['wake forest', 'medical', 'cloverdale', 'stratford', 'university'],
    },
    {
      id: 'south-west-suburbs',
      name: 'South & west suburban multi-family',
      shortName: 'S/W suburbs',
      neighborhoods: ['Hanes Mall area', 'Silas Creek corridor', 'Peace Haven', 'Clemmons edges (verify county)'],
      housingTypes: 'Multi-family, townhomes, HOA SFH',
      challenges: ['Retail-corridor congestion', 'Elevator buildings', 'I-40 approach friction'],
      moverTips: 'Book lease ends early. Collect HOA packets. Price I-40-linked pairs honestly.',
      cityKeywords: ['hanes mall', 'silas creek', 'peace haven', 'clemmons'],
    },
    {
      id: 'north-growth',
      name: 'Northern Forsyth growth edges',
      shortName: 'North growth',
      neighborhoods: ['Rural Hall edges', 'Stanleyville edges', 'Northern US-52 multi-family', 'Walkertown edges'],
      housingTypes: 'Newer tracts, multi-family, rural-edge lots',
      challenges: ['Longer empty miles', 'US-52 congestion', 'Varied driveway access'],
      moverTips: 'Share access photos for rural-edge lots. Prefer early starts for long north-county pairs.',
      cityKeywords: ['rural hall', 'stanleyville', 'walkertown', 'north winston'],
    },
  ],
  costDrivers: {
    title: 'What drives Forsyth moving costs',
    intro: 'Historic-core access, arterial congestion, and Triad empty miles drive quotes.',
    drivers: [
      { title: 'Stairs and curb friction near core', detail: 'Labor hours rise without elevators.' },
      { title: 'US-52 / Business 40 / I-40 congestion', detail: 'Portal time spikes at peak.' },
      { title: 'Medical corridor timing', detail: 'Mid-month turns compete with weekend demand.' },
      { title: 'Guilford cross-county empty miles', detail: 'Greensboro destinations raise staging distance.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$400–$1,200+', note: 'Higher with stairs' },
      { label: '2–3BR condo or modest SFH', value: '$1,200–$3,400+', note: 'HOA soft costs trend up' },
      { label: '3–4+ BR / cross-Triad', value: '$2,100–$6,200+', note: 'Long I-40 pairs highest' },
      { label: 'Typical 2-person crew rate', value: '$100–$170+/hr', note: 'Portal-to-portal' },
    ],
  },
  seasonal: {
    title: 'When to schedule a Forsyth move',
    intro: 'Family seasons, multi-family turns, and medical calendars reshape access.',
    items: [
      { title: 'Best windows: mid-week early mornings', detail: 'Clear curb and reduce arterial pain.' },
      { title: 'Peak family season: late May–mid-August', detail: 'Book suburban Saturdays early.' },
      { title: 'University / multi-family lease waves', detail: 'May/August clusters near campus-adjacent product.' },
      { title: 'Summer heat and storms', detail: 'Prefer early starts; confirm weather contingency.' },
    ],
  },
  specialized: [
    {
      id: 'winston-salem-triad',
      title: 'Winston-Salem core & Triad pairing module',
      intro: 'Forsyth estimates fail when West End stairs or Guilford pairs are priced as generic suburb hops.',
      bullets: [
        'Photo stairs and curb for West End / near-core SFH.',
        'Build US-52 and I-40 buffer for long pairs.',
        'Coordinate medical-corridor timing when flexible.',
        'Clarify Forsyth vs Guilford destinations.',
        'Verify NCUC C-# in-state and FMCSA interstate.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Forsyth County?',
    intro: 'Practical fit checklist — verify on official sources. No invented rankings.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          { title: 'How districts work here', detail: 'Winston-Salem/Forsyth County Schools is the primary public K–12 system. Assignment is address-based.' },
          { title: 'Growth areas', detail: 'Suburban edges can see enrollment pressure. Ask about capacity when touring.' },
          { title: 'Research sources', detail: 'District tools, NCDPI data, and campus visits beat ranking screenshots.' },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare access',
        bullets: [
          { title: 'Major systems', detail: 'Atrium Health Wake Forest Baptist and other facilities serve Winston-Salem corridors. Confirm networks.' },
          { title: 'What relocators should do', detail: 'Map peak-hour drive times. Transfer records early.' },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          { title: 'Historic core vs suburban edges', detail: 'Older near-core SFH and some multi-unit; larger tracts on growth edges.' },
          { title: 'Cost variation', detail: 'Prices vary by corridor. Budget HOA dues where applicable.' },
          { title: 'Access realities', detail: 'Stairs and narrow streets remain common near core even when suburbs feel modern.' },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Forsyth areas fit whom',
        bullets: [
          { title: 'West End / near-core lifestyle', detail: 'Suits established neighborhoods with stair/curb tradeoffs on move day.' },
          { title: 'Medical / university-adjacent pattern', detail: 'Employment proximity with traffic pulses and mixed stock.' },
          { title: 'Suburban growth pattern', detail: 'Newer multi-family and HOA product with arterial commute risk.' },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute patterns',
        bullets: [
          { title: 'Employment anchors', detail: 'Healthcare, education, manufacturing, logistics, and professional services shape local employment.' },
          { title: 'Commute realism', detail: 'I-40, US-52, and Business 40 peaks are real. Test drive peak routes.' },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          { title: 'Triad partner identity', detail: 'Forsyth complements Guilford without copying High Point commercial fabric or Greensboro downtown patterns exactly.' },
          { title: 'Climate', detail: 'Hot humid summers and storms. Plan outdoor staging contingency.' },
          { title: 'Pace', detail: 'Historic neighborhoods and suburban arms feel different. Visit peak and off-peak.' },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Forsyth resources',
    intro: 'Official links first. Verify NCUC in-state and FMCSA interstate.',
    items: [
      { label: 'Forsyth County — official site', href: 'https://www.forsyth.cc/', external: true },
      { label: 'City of Winston-Salem', href: 'https://www.cityofws.org/', external: true },
      { label: 'Winston-Salem/Forsyth County Schools', href: 'https://www.wsfcs.k12.nc.us/', external: true },
      { label: 'NCDOT traffic / 511', href: 'https://drivenc.gov/', external: true },
    ],
  },
  directoryHint:
    'Prefer historic-core stair/curb experience for West End; medical-corridor timing awareness; honest US-52/I-40 pricing for Triad pairs. Verify NCUC C-# and FMCSA.',
  lastReviewed: '2026-07-23',
});
