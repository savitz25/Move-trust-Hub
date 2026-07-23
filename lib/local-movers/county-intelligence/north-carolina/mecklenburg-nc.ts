import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeNcPack } from '@/lib/local-movers/county-intelligence/north-carolina/nc-shared';

/**
 * Mecklenburg County, NC — Charlotte metro core.
 * Not a renamed Atlanta/Fulton or South Florida page.
 */
export const mecklenburgCountyNcIntelligence: CountyIntelligencePack = finalizeNcPack({
  countySlug: 'mecklenburg',
  hubTitle: 'Mecklenburg County Moving Intelligence Hub',
  eyebrow: 'Mecklenburg · Charlotte Uptown, South End & suburban ring',
  h1: 'Moving in Mecklenburg County: Uptown High-Rises, South End Access & I-77/I-85 Logistics',
  heroOpener:
    'Mecklenburg County is Charlotte’s vertical-and-ring engine: Uptown towers and South End mid-rises with COI and freight elevators, South Park and University City multi-family corridors, and a wide suburban ring from Ballantyne to Huntersville that prices as HOA distance work. A South End loft, a Myers Park craftsman, a University City student apartment, and a Ballantyne HOA two-story do not share truck access or portal time. I-77, I-85, I-485, and US-74 rewrite “local” estimates that ignore building packets and peak freeways. This hub is for people moving in Mecklenburg — not generic Piedmont tips recycled from the Triangle or Triad.',
  heroCredibility:
    'NCUC household goods certificate (C-#) for intrastate NC moves · FMCSA for interstate · Charlotte high-rise COI & beltway awareness · Curated listings',
  majorCorridors: 'I-77 · I-85 · I-485 · US-74 · NC-16 · Billy Graham Pkwy',
  whatMakesDifferent: {
    title: 'What makes moving in Mecklenburg County different',
    intro:
      'These are Charlotte-core realities — Uptown/South End vertical living, suburban ring HOAs, and beltway congestion — not interchangeable “North Carolina metro” boilerplate.',
    bullets: [
      {
        title: 'Uptown and South End make elevators the default',
        detail:
          'Towers and mid-rises need Certificates of Insurance, reserved freight elevators, floor protection, and fixed move windows. Treat the building packet as part of the survey.',
      },
      {
        title: 'I-77 / I-85 / I-485 turn short map miles into billable time',
        detail:
          'Uptown ↔ Ballantyne or University City ↔ South Park pairs look local on a map and regional on a clock at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'South Park and University corridors are multi-family products',
        detail:
          'Elevator buildings, tight curb, and lease-end waves differ from Myers Park or Plaza Midwood single-family stairs and alley staging.',
      },
      {
        title: 'Suburban ring HOAs dominate Ballantyne, Huntersville & Matthews edges',
        detail:
          'Gate lists, COI, truck length limits, and approved hours are common. Collect management packets early.',
      },
      {
        title: 'Cross-county Charlotte pairs are routine',
        detail:
          'Households regularly move Mecklenburg ↔ Union, Cabarrus, or Gaston. Clarify county lines so NCUC vs FMCSA and drive-time assumptions stay accurate.',
      },
      {
        title: 'Intrastate NC rules vs interstate authority',
        detail:
          'Moves entirely within North Carolina are generally subject to NCUC household goods certification (C-#). Interstate legs need active FMCSA USDOT (and usually MC).',
      },
    ],
  },
  zonesHeading: 'Mecklenburg access zones',
  zonesIntro:
    'Plan by Uptown/South End vertical core, South Park/midtown multi-family, University City, south/southeast suburbs, and north lake-edge growth — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'uptown-south-end',
      name: 'Uptown, South End & center-city vertical core',
      shortName: 'Uptown / South End',
      neighborhoods: ['Uptown', 'South End', 'First Ward', 'Third Ward', 'Optimist Park edges', 'Wilmore'],
      housingTypes: 'High-rises, mid-rises, lofts, urban condos',
      challenges: [
        'Near-universal COI and elevator reservations',
        'Scarce legal curb staging and dock time caps',
        'I-277 / I-77 event and commute congestion',
      ],
      moverTips:
        'Get building packets early. Prefer mid-week morning freight windows. Share dock and truck-height photos. Avoid major stadium/concert days when flexible.',
      cityKeywords: ['charlotte', 'uptown', 'south end', 'first ward', 'third ward', 'wilmore'],
    },
    {
      id: 'south-park-midtown',
      name: 'South Park, Dilworth & near-midtown corridors',
      shortName: 'South Park',
      neighborhoods: ['South Park', 'Dilworth', 'Myers Park', 'Sedgefield', 'Cotswold', 'Barclay Downs'],
      housingTypes: 'Mid-rise multi-family, townhomes, older SFH, estate edges',
      challenges: [
        'Mix of elevators and tight residential streets',
        'Retail-corridor traffic near South Park',
        'Tree canopy and driveway depth on older SFH',
      ],
      moverTips:
        'Survey multi-family and SFH as different products. Photo curb options on Dilworth/Myers Park blocks. Build South Park peak buffer.',
      cityKeywords: ['south park', 'dilworth', 'myers park', 'cotswold', 'sedgefield'],
    },
    {
      id: 'university-city',
      name: 'University City & northeast multi-family',
      shortName: 'University City',
      neighborhoods: ['University City', 'UNCC area', 'Mallard Creek', 'Hidden Valley edges', 'Newell'],
      housingTypes: 'Student and workforce multi-family, townhomes, suburban SFH',
      challenges: [
        'Lease-end waves near campus',
        'I-85 / University City Blvd congestion',
        'Elevator buildings with tight guest parking',
      ],
      moverTips:
        'Book August/May clusters early. Confirm elevator vs stair access. Prefer early I-85 windows.',
      cityKeywords: ['university city', 'uncc', 'mallard creek', 'newell', 'university'],
    },
    {
      id: 'south-suburbs',
      name: 'Ballantyne, Pineville & south/southeast suburbs',
      shortName: 'South suburbs',
      neighborhoods: ['Ballantyne', 'Pineville', 'Matthews edges', 'Providence', 'Rea Road corridor'],
      housingTypes: 'Master-planned HOA SFH, townhomes, multi-family along I-485',
      challenges: [
        'HOA gate lists and approved hours',
        'I-485 portal time to Uptown origins',
        'Long cul-de-sac carries',
      ],
      moverTips:
        'Collect HOA packets first. Price 485-ring pairs honestly. Share driveway and gate photos.',
      cityKeywords: ['ballantyne', 'pineville', 'matthews', 'providence', 'rea road'],
    },
    {
      id: 'north-lake',
      name: 'Huntersville, Cornelius & north lake-edge growth',
      shortName: 'North lake edge',
      neighborhoods: ['Huntersville', 'Cornelius', 'Davidson edges', 'Lake Norman edges', 'Birkdale'],
      housingTypes: 'HOA SFH, townhomes, multi-family near retail corridors',
      challenges: [
        'I-77 Express / general-purpose congestion',
        'HOA density and longer empty miles from center-city yards',
        'County-line confusion with Iredell addresses',
      ],
      moverTips:
        'Build I-77 buffer for any Uptown-linked pair. Clarify Mecklenburg vs Iredell destinations. Prefer mid-week starts.',
      cityKeywords: ['huntersville', 'cornelius', 'davidson', 'lake norman', 'birkdale'],
    },
  ],
  costDrivers: {
    title: 'What drives Mecklenburg moving costs',
    intro:
      'Building access, beltway portal time, and HOA soft costs separate cheap estimates from real bills more than square footage alone.',
    drivers: [
      {
        title: 'Elevator / COI buildings',
        detail: 'Uptown and South End towers add labor, wait time, and certificate costs.',
      },
      {
        title: 'I-77 / I-85 / I-485 congestion',
        detail: 'Cross-ring pairs burn portal-to-portal hours at peak.',
      },
      {
        title: 'HOA master-planned rules',
        detail: 'Gate lists and weekday-only windows push demand into peak pricing.',
      },
      {
        title: 'Cross-county empty miles',
        detail: 'Union, Cabarrus, and Gaston destinations raise staging distance from Charlotte yards.',
      },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$450–$1,400+', note: 'Higher with elevators or peak freeways' },
      { label: '2–3BR condo or modest SFH', value: '$1,400–$3,900+', note: 'HOA soft costs trend up' },
      { label: '3–4+ BR / tower / cross-ring', value: '$2,600–$7,800+', note: 'Uptown towers and long I-485 pairs price highest' },
      { label: 'Typical 2-person crew rate', value: '$110–$185+/hr', note: 'Portal-to-portal; packing scales up' },
    ],
  },
  seasonal: {
    title: 'When to schedule a Mecklenburg move',
    intro: 'Lease turns, bank/finance calendars, heat/humidity, and school seasons reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Tuesday–Thursday starts clear curb space and reduce I-77/I-85 pain. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'Suburban SFH Saturday demand fills first. Book 2–4 weeks ahead for peak weekends.',
      },
      {
        title: 'Summer heat and storms',
        detail: 'Afternoon humidity and pop-up storms slow exterior carries. Prefer early starts and tarp plans.',
      },
      {
        title: 'University / multi-family lease waves',
        detail: 'University City and center-city apartments create May/August clusters. Book early.',
      },
    ],
  },
  specialized: [
    {
      id: 'charlotte-vertical-beltway',
      title: 'Charlotte vertical core & beltway logistics module',
      intro: 'Uptown/South End building rules and I-485 ring distance fail estimates more often than packing skill.',
      bullets: [
        'Request building move packets at lease signing or escrow for towers and mid-rises.',
        'Reserve freight elevators in writing and reconfirm the day before.',
        'Price portal-to-portal time for any pair that rides I-77, I-85, or I-485.',
        'Collect HOA COI and gate lists for Ballantyne / Huntersville / Matthews product.',
        'Clarify Mecklenburg vs Union/Cabarrus/Gaston addresses on every estimate.',
        'Verify NCUC C-# for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Mecklenburg County?',
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
              'Charlotte-Mecklenburg Schools (CMS) is the primary public K–12 system. Assignment is address-based — neighborhood marketing names do not guarantee school assignment.',
          },
          {
            title: 'Growth areas and capacity',
            detail:
              'South and north growth corridors can see enrollment pressure. Ask CMS about capacity, magnets, and busing when touring.',
          },
          {
            title: 'Research sources',
            detail:
              'CMS boundary tools, North Carolina DPI data, and campus visits beat ranking screenshots alone.',
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
              'Atrium Health and Novant Health campuses serve different Charlotte corridors, with additional specialty facilities metro-wide. Confirm networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Ballantyne or University City to preferred campuses — beltway congestion changes “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Vertical core vs suburban ring',
            detail:
              'Expect dense multi-unit product Uptown and South End; larger HOA tracts dominate Ballantyne, Huntersville, and many south/east edges.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by corridor. Budget for condo dues, parking fees in towers, and HOA assessments.',
          },
          {
            title: 'HOA and condo governance',
            detail:
              'Towers and planned communities often control move hours, truck size, and deposits. Read association documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Mecklenburg areas fit whom',
        bullets: [
          {
            title: 'Uptown / South End urban lifestyle',
            detail:
              'Suits people prioritizing walkable amenities and shorter urban access — with parking and elevator tradeoffs on move day.',
          },
          {
            title: 'South Park / Myers Park near-core pattern',
            detail:
              'Often appeals for established neighborhoods and midtown access with mixed multi-family and SFH logistics.',
          },
          {
            title: 'South and north suburban growth',
            detail:
              'Ballantyne, Matthews-edge, and Huntersville/Cornelius attract households seeking newer homes and space — with I-77/I-485 commute risk.',
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
              'Banking and finance, energy, healthcare, logistics, and professional services concentrate Uptown and along major employment corridors.',
          },
          {
            title: 'Commute realism',
            detail:
              'Many households are car-dependent outside center-city cores. I-77, I-85, and I-485 peaks are real. Test drive peak routes before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, multiple Charlottes',
            detail:
              'Mecklenburg stacks a vertical urban core, established near-midtown neighborhoods, and long suburban arms — different from Triangle research-town patterns or Triad industrial fabric.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, frequent storms, and mild winters. Plan outdoor staging and weather contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Sports, arts, and nightlife concentrate center-city; suburban corridors feel more family- and retail-oriented. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Mecklenburg resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify NCUC certification for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Mecklenburg County — official site',
        href: 'https://www.mecknc.gov/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Charlotte',
        href: 'https://www.charlottenc.gov/',
        external: true,
      },
      {
        label: 'Charlotte-Mecklenburg Schools',
        href: 'https://www.cmsk12.org/',
        external: true,
        note: 'Boundaries & calendars',
      },
      {
        label: 'NCDOT traffic / 511',
        href: 'https://drivenc.gov/',
        external: true,
        note: 'I-77, I-85, I-485 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with Uptown/South End dock and elevator experience for towers; HOA fluency for Ballantyne and north lake-edge product; honest I-77/I-485 timing for cross-ring pairs. Verify NCUC C-# for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
});
