import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMoPack,
  MO_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/missouri/mo-shared';

/**
 * Greene County, MO — Springfield / SW Missouri regional hub.
 * Not St. Louis spillover and not Kansas City freeflow.
 */
export const greeneCountyMoIntelligence: CountyIntelligencePack = finalizeMoPack({
  countySlug: 'greene',
  hubTitle: 'Greene County Moving Intelligence Hub',
  eyebrow:
    'Greene County · Springfield regional core, MSU cycles & I-44 / US-65 logistics',
  h1: 'Moving in Greene County: Springfield Access, Campus Cycles & I-44 / US-65 Regional Corridors',
  heroOpener:
    'Greene County, Missouri is not St. Louis metro spillover and not a Kansas City interstate clone — it is Springfield’s regional hub with downtown and midtown multi-unit density, Missouri State University lease waves, Republic and Battlefield growth product, and I-44 / US-60 / US-65 freeflow that rewrites “local” estimates. A downtown loft elevator, a near-campus walk-up stair stack, a south Springfield HOA driveway, and a Republic cul-de-sac do not share truck access or crew skill. Ozarks weather, campus peaks, and regional empty miles are real inputs. This hub is for people moving in Greene County — not a renamed St. Louis or Kansas City page.',
  heroCredibility:
    'MoDOT Motor Carrier Services household goods authority for intrastate · FMCSA for interstate · Springfield regional & campus logistics awareness · Curated listings',
  majorCorridors: 'I-44 · US-60 · US-65 · local Springfield grid',
  whatMakesDifferent: {
    title: 'What makes moving in Greene County different',
    intro:
      'These are Springfield and southwest Missouri realities — campus multi-unit, regional freeway freeflow, and Ozarks-edge product — not St. Louis I-270 loops or Kansas City I-435 grids.',
    bullets: [
      {
        title: 'Springfield is a regional hub — not STL/KC spillover',
        detail:
          'Ignore I-270 Chesterfield assumptions and I-70 Independence freeflow templates. Corridors, housing mix, and empty-mile patterns are southwest Missouri-specific.',
      },
      {
        title: 'MSU and campus-adjacent multi-unit rewrite labor and calendars',
        detail:
          'Near-campus walk-ups, limited elevators, and August/January lease waves compress demand. Flat-rate optimism from south-side HOA driveways underprices stair counts.',
      },
      {
        title: 'Downtown and midtown product is not Republic growth product',
        detail:
          'Lofts, older multi-unit, and tight curb differ from Battlefield and Republic HOA packets. Same-county jobs still need product-specific surveys.',
      },
      {
        title: 'I-44, US-60, and US-65 turn short pairs into billable hours',
        detail:
          'Downtown ↔ Republic, north Springfield ↔ Battlefield, or campus ↔ east commercial pairs look local and still burn portal time at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'Ozarks weather and severe-storm season reshape outdoor carries',
        detail:
          'Summer heat, thunderstorms, and winter ice add cancellation risk. Prefer flexible dates and early starts.',
      },
      {
        title: 'Regional multi-county and Arkansas pairs are routine',
        detail:
          'Households regularly move Greene ↔ Christian, Webster, or out-of-state Arkansas destinations. Clarify addresses so MoDOT vs FMCSA assumptions stay accurate when any leg leaves Missouri.',
      },
      MO_REG_BULLET,
    ],
  },
  zonesHeading: 'Greene County access zones',
  zonesIntro:
    'Plan by downtown–midtown multi-unit, MSU campus-adjacent stock, south Springfield multi-family, Republic–Battlefield growth, and northern commercial–residential belts along I-44 / US-65.',
  zones: [
    {
      id: 'downtown-midtown-springfield',
      name: 'Downtown Springfield, midtown & commercial-core multi-unit',
      shortName: 'Downtown / midtown',
      neighborhoods: [
        'Downtown Springfield',
        'Midtown corridors',
        'Commercial Street edges',
        'Park Central edges',
        'Grant Beach edges',
        'Woodland Heights edges',
      ],
      housingTypes: 'Loft conversions, walk-up multifamily, limited mid-rise elevators, older SFH',
      challenges: [
        'Elevator/COI where present and scarce curb',
        'Event and entertainment freeflow',
        'US-65 / local arterial congestion',
      ],
      moverTips:
        'Book elevators early when present. Prefer mid-week starts. Photo curb options on commercial-adjacent blocks.',
      cityKeywords: [
        'springfield',
        'downtown springfield',
      ],
    },
    {
      id: 'msu-campus-belt',
      name: 'Missouri State University campus-adjacent multi-unit',
      shortName: 'MSU campus belt',
      neighborhoods: [
        'MSU campus edges',
        'National Avenue corridors',
        'Grand Street corridors',
        'Student multi-unit belts',
        'Phelps Grove edges',
        'South Avenue edges',
      ],
      housingTypes: 'Student multi-unit, walk-ups, limited elevators, older rentals',
      challenges: [
        'Semester lease waves and scarce curb at peaks',
        'Long stair carries and basement storage',
        'Compressed August and January demand',
      ],
      moverTips:
        'Book crews early for August and January. Prefer mid-week starts. Confirm building rules in writing and inventory storage carefully.',
      cityKeywords: [
        'springfield',
        'missouri state',
      ],
    },
    {
      id: 'south-springfield',
      name: 'South Springfield multi-family, medical & professional stock',
      shortName: 'South Springfield',
      neighborhoods: [
        'South Springfield corridors',
        'Battlefield Road corridors',
        'Sunshine Street corridors',
        'Medical mile edges',
        'Southern Hills edges',
        'Sequiota edges',
      ],
      housingTypes: 'Multi-family, townhomes, SFH, some elevators',
      challenges: [
        'US-65 / US-60 freeflow',
        'HOA and multi-unit mix',
        'Healthcare campus traffic spikes',
      ],
      moverTips:
        'Collect building and HOA rules early. Price US-65 honestly. Prefer early starts near medical corridors.',
      cityKeywords: [
        'springfield',
      ],
    },
    {
      id: 'republic-battlefield',
      name: 'Republic, Battlefield & southwest growth HOAs',
      shortName: 'Republic / Battlefield',
      neighborhoods: [
        'Republic',
        'Battlefield',
        'Southwest growth corridors',
        'FF Highway edges',
        'Wilson’s Creek edges',
        'Clever edges',
      ],
      housingTypes: 'HOA SFH, townhomes, newer multi-family',
      challenges: [
        'HOA gate lists and timed windows',
        'US-60 / local freeflow',
        'Longer empty miles vs downtown',
      ],
      moverTips:
        'Collect HOA packets early. Confirm truck length rules. Price southwest empty miles for downtown unload pairs.',
      cityKeywords: [
        'republic',
        'battlefield',
        'clever',
      ],
    },
    {
      id: 'north-i44-belt',
      name: 'North Springfield, I-44 commercial-residential belts',
      shortName: 'North / I-44',
      neighborhoods: [
        'North Springfield corridors',
        'I-44 belt edges',
        'Kearney Street corridors',
        'Airport approach edges',
        'Willard edges',
        'Strafford edges',
      ],
      housingTypes: 'SFH, multi-unit, ranch stock, industrial-adjacent residential',
      challenges: [
        'I-44 freeflow and freight traffic',
        'Mixed curb and driveway product',
        'Airport-adjacent spikes on some approaches',
      ],
      moverTips:
        'Avoid peak I-44 windows when flexible. Survey older stock carefully. Clarify Springfield vs Willard / Strafford addresses.',
      cityKeywords: [
        'springfield',
        'willard',
        'strafford',
      ],
    },
    {
      id: 'east-us60-nixa-edges',
      name: 'East Springfield, US-60 & Christian County fringe edges',
      shortName: 'East / US-60',
      neighborhoods: [
        'East Springfield corridors',
        'US-60 edges',
        'Nixa approach edges',
        'Ozark approach edges',
        'Fremont Hills edges',
        'James River Freeway edges',
      ],
      housingTypes: 'SFH, multi-family, growth-edge HOA product',
      challenges: [
        'US-60 / US-65 freeflow',
        'Cross-county pairs into Christian County common',
        'Mixed HOA and older stock',
      ],
      moverTips:
        'Price US-60 / US-65 honestly. Clarify Greene vs Christian County lines on multi-address estimates. Collect HOA rules on growth edges.',
      cityKeywords: [
        'springfield',
        'nixa',
        'ozark',
        'fremont hills',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Greene County moving costs',
    intro:
      'Campus access product, HOA admin, and I-44 / US-65 freeflow move the number more than packing skill alone — this is Springfield regional pricing, not STL/KC templates.',
    drivers: [
      {
        title: 'Campus walk-ups, stairs & lease-wave density',
        detail:
          'MSU-adjacent multi-unit adds flight counts and schedule risk that south HOA driveways do not share.',
      },
      {
        title: 'Downtown curb, lofts & limited elevators',
        detail:
          'Core multi-unit adds COI and scarce-staging soft costs before packing skill matters.',
      },
      {
        title: 'I-44 · US-60 · US-65 congestion',
        detail:
          'Cross-city and city–suburb pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Republic–Battlefield HOA windows',
        detail:
          'Growth packets rewrite jobs that look simple on a map.',
      },
      {
        title: 'Regional multi-county & out-of-state empty miles',
        detail:
          'Christian County, Branson-corridor, and Arkansas destinations raise staging distance and authority complexity when leaving Missouri.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,700+',
        note: 'Higher with stairs, campus peaks, or peak US-65 pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,300–$4,000+',
        note: 'Stairs, HOA, and portal soft costs trend up',
      },
      {
        label: '3–4+ BR / cross-zone / regional',
        value: '$2,500–$8,000+',
        note: 'Growth-edge and long I-44 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$195+/hr',
        note: 'Portal-to-portal; packing, HOA admin, and stairs scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Greene County move',
    intro:
      'Campus calendars, family school peaks, summer heat, severe storms, and winter ice reshape access and crew availability across Springfield.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease campus multi-unit windows, and reduce US-65 / I-44 pain. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Peak season: late May–mid-September (plus January campus turnover)',
        detail:
          'Apartment turnover, MSU waves, and family school calendars fill first. Book early for August peaks.',
      },
      {
        title: 'Summer heat & severe-storm risk',
        detail:
          'June–August heat and thunderstorms raise cancellation and crew-rotation soft costs. Prefer early starts and flexible weather windows.',
      },
      {
        title: 'Winter ice and freeze-thaw',
        detail:
          'December–February adds icy stoops and weather cancellations. Prefer flexible dates and contingency for melt and tarps on older stock.',
      },
    ],
  },
  specialized: [
    {
      id: 'greene-campus-regional',
      title: 'Greene County campus, HOA & I-44 regional logistics module',
      intro:
        'Greene County estimates fail more often on stair surveys, campus calendars, HOA packets, and freeway freeflow than on packing skill alone.',
      bullets: [
        'Survey stair counts and building rules for MSU-adjacent multi-unit before the quote is final.',
        'Collect HOA packets early for Republic, Battlefield, and south Springfield product.',
        'Price portal-to-portal time for any pair that rides I-44, US-60, or US-65 at peak.',
        'Plan August and January campus peaks separately from general family school calendars.',
        'Clarify Springfield vs Republic vs Willard vs fringe addresses on every estimate.',
        'For in-state jobs verify MoDOT household goods operating authority; verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-stl-not-kc',
      title: 'Not St. Louis · not Kansas City micro-market module',
      intro:
        'A single “Missouri metro rate” collapses when Springfield regional product is confused with St. Louis loop logistics or Kansas City interstate freeflow.',
      bullets: [
        'Do not apply I-270 or I-435 timing assumptions — use I-44 / US-60 / US-65 realities.',
        'Do not price campus walk-ups like Chesterfield or Lee’s Summit HOA driveways.',
        'Match regional empty miles (Christian County, Branson corridor, Arkansas) separately from in-city pairs.',
        'Keep southwest Missouri housing mix distinct from STL/KC templates on every survey.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Greene County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Springfield Public Schools covers much of the city; Republic, Willard, Strafford, Logan-Rogersville, and other systems serve growth and fringe addresses. Assignment is address-based — marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and growth-edge boundaries can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Missouri DESE data, and campus visits beat ranking screenshots alone.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare access',
        bullets: [
          {
            title: 'Major systems',
            detail:
              'CoxHealth and Mercy Springfield campuses dominate regional care, with additional specialty and outpatient sites across the county. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — US-65 freeflow changes “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Housing mix',
            detail:
              'Expect downtown lofts and midtown multi-unit; campus-adjacent rentals; south Springfield multi-family and professional SFH; Republic and Battlefield HOA growth; northern and eastern fringe ranch stock.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by product and fringe municipality. Budget for HOA dues and older-building repair risk where relevant.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Associations and multi-unit management often control move hours, truck size, and deposits. Read documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown / midtown urban lifestyle',
            detail:
              'Suits people prioritizing walkability and amenities — with curb, stairs, and event-day tradeoffs on move day.',
          },
          {
            title: 'Campus-adjacent living',
            detail:
              'Often appeals for students and staff — with lease-wave peaks and multi-unit logistics.',
          },
          {
            title: 'South Springfield professional belts',
            detail:
              'Attracts households seeking multi-family or SFH near medical and retail corridors — with US-65 freeflow.',
          },
          {
            title: 'Republic / Battlefield growth living',
            detail:
              'Fits buyers chasing newer product and relative space — with HOA rules and longer empty miles to the core.',
          },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute patterns',
        bullets: [
          {
            title: 'Employment anchors',
            detail:
              'Healthcare systems, education (including MSU), logistics, manufacturing, call centers, and regional retail concentrate demand. Many households reverse-commute across the US-65 / I-44 grid.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak arterial and freeway freeflow is real. Test peak routes before choosing solely on rent or purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Local character',
            detail:
              'Greene County stacks a mid-size regional city, campus energy, and Ozarks-edge growth — different from St. Louis metro density and Kansas City interstate freeflow.',
          },
          {
            title: 'Climate',
            detail:
              'Humid subtropical-leaning four-season climate with hot summers, severe-storm risk, and occasional winter ice. Plan outdoor staging, heat, and ice contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — campus calendars, summer weather, and regional events reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Greene County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify MoDOT household goods operating authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Greene County, Missouri — official site',
        href: 'https://greenecountymo.gov/',
        external: true,
        note: 'County services & unincorporated info',
      },
      {
        label: 'City of Springfield',
        href: 'https://www.springfieldmo.gov/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'Springfield Public Schools',
        href: 'https://www.sps.org/',
        external: true,
        note: 'Boundaries & calendars (city addresses)',
      },
      {
        label: 'Traveler Information Map — MoDOT',
        href: 'https://traveler.modot.org/map/',
        external: true,
        note: 'I-44 / US-60 / US-65 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with campus multi-unit and stair fluency for MSU-adjacent product; HOA gate fluency for Republic–Battlefield growth; honest I-44 · US-60 · US-65 timing for cross-zone pairs. Verify MoDOT Motor Carrier Services household goods operating authority for intrastate moves and FMCSA for interstate legs before deposits.',
  lastReviewed: '2026-07-24',
});
