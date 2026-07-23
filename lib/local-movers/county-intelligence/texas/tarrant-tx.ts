import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Tarrant County, Texas moving intelligence.
 * Differentiators: Fort Worth identity vs DFW overflow, industrial + residential mix —
 * not Dallas Uptown towers alone, Houston bayou sprawl, or Collin master-planned boom towns.
 */
export const tarrantCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'texas',
  countySlug: 'tarrant',
  hubTitle: 'Tarrant County Moving Intelligence Hub',
  eyebrow: 'Tarrant · Fort Worth core, industrial corridors & DFW overflow',
  h1: 'Moving in Tarrant County: Fort Worth Core, Industrial Edges & DFW Overflow Guide',
  heroOpener:
    'Tarrant County is Fort Worth’s home base with a DFW overflow reality: a walkable cultural core and Near Southside densification on one side, aerospace and logistics corridors on another, and fast-growing northeast suburbs that feel more “DFW bedroom” than Stockyards. A downtown loft, a West 7th mid-rise, an Arlington multi-family near the entertainment district, and a Keller two-story do not share truck access or traffic patterns. I-30, I-35W, I-820, SH-360, and SH-183 link residential jobs to industrial and airport-adjacent noise. This hub is for people actually moving in Tarrant — not Dallas-centric tips with Fort Worth swapped in the headline.',
  heroCredibility:
    'TxDMV household goods for intrastate Texas moves · FMCSA for interstate legs · Fort Worth vs DFW overflow contrast · Curated directory listings',
  collapsibleDeepContent: true,
  sectionOrder: [
    'whatMakesDifferent',
    'zones',
    'costDrivers',
    'seasonal',
    'specialized',
    'relocation',
    'resources',
  ],
  whatMakesDifferent: {
    title: 'What makes moving in Tarrant County different',
    intro:
      'These are Tarrant realities — Fort Worth urban character plus industrial and DFW-overflow suburbs under one county label — not interchangeable “Metroplex” boilerplate.',
    bullets: [
      {
        title: 'Fort Worth core is not a Dallas clone',
        detail:
          'Downtown Fort Worth, Near Southside, and cultural-district pockets have their own loading docks, event calendars, and street grids. Do not price them like Uptown Dallas towers by default.',
      },
      {
        title: 'Industrial and aerospace corridors change staging',
        detail:
          'Alliance, industrial parks, and logistics approaches add heavy-truck traffic and shift-change congestion that pure residential estimates miss.',
      },
      {
        title: 'Arlington entertainment and stadium density',
        detail:
          'Event days near major stadiums and entertainment venues can choke surface streets. Flexible move dates beat fighting fan traffic with a box truck.',
      },
      {
        title: 'Northeast suburbs absorb DFW overflow growth',
        detail:
          'Keller, Southlake, Colleyville, Grapevine, and similar patterns bring HOA villages and school-driven summer demand that feel closer to Collin-style growth than historic Fort Worth bungalows.',
      },
      {
        title: 'I-30 / I-35W / I-820 loops define portal time',
        detail:
          'Cross-county pairs to Dallas or Denton and intra-county west–east hops live or die on loop and freeway peaks — map miles understate rush hour.',
      },
      {
        title: 'Mix of historic stock and new tracts',
        detail:
          'Older Fort Worth neighborhoods mean porch carries and tight streets; northeast master plans mean gate lists and long driveway carries. Inventory surveys must match the product.',
      },
      {
        title: 'Military and defense-adjacent employment pockets',
        detail:
          'Defense and aerospace-related schedules can create mid-week relocation spikes distinct from pure corporate apartment turnover in Dallas Uptown.',
      },
      {
        title: 'Intrastate Texas rules vs interstate authority',
        detail:
          'Moves entirely within Texas are generally subject to TxDMV household-goods motor-carrier frameworks. Interstate legs need active FMCSA USDOT (and usually MC) authority.',
      },
    ],
  },
  zonesHeading: 'Tarrant access zones',
  zonesIntro:
    'Plan by Fort Worth urban core, west Fort Worth, Arlington / mid-cities, northeast suburbs, far south/southeast, and Alliance / industrial north — each has its own access and traffic profile.',
  zones: [
    {
      id: 'fort-worth-core',
      name: 'Fort Worth core: Downtown, Near Southside & Cultural District',
      shortName: 'FW Core',
      neighborhoods: [
        'Downtown Fort Worth',
        'Near Southside',
        'Cultural District edges',
        'West 7th',
        'Stockyards edges',
        'Trinity Groves / river edges',
      ],
      housingTypes:
        'Mid-rises and lofts, urban condos, renovated multi-family, some historic SFH pockets',
      challenges: [
        'Elevator/COI and dock reservations in newer mid-rises',
        'Event and stockyards / downtown festival traffic',
        'Limited curb staging on popular corridors',
        'Mix of historic narrow streets and new vertical product',
      ],
      moverTips:
        'Get building packets for West 7th and downtown mid-rises early. Prefer mid-week mornings. Avoid major event weekends when flexible. Photo historic-street access near Stockyards edges.',
      cityKeywords: [
        'fort worth',
        'downtown fort worth',
        'near southside',
        'west 7th',
        'stockyards',
        'cultural district',
      ],
    },
    {
      id: 'west-fort-worth',
      name: 'West Fort Worth: TCU, Benbrook edges & western SFH belts',
      shortName: 'West FW',
      neighborhoods: [
        'TCU / University area',
        'Benbrook edges',
        'Western Hills',
        'Ridglea edges',
        'Clearfork edges',
        'Aledo approach (note: Parker Co. border)',
      ],
      housingTypes:
        'Older and renovated SFH, student multi-family near TCU, suburban tracts, townhomes',
      challenges: [
        'University move-in spikes near TCU',
        'Varied driveway and street width on older stock',
        'I-30 / I-820 west peaks',
        'County-line confusion with Parker County addresses',
      ],
      moverTips:
        'Avoid peak TCU move-in weekends when flexible. Photo older-grid access. Clarify Tarrant vs Parker destinations on western edges.',
      cityKeywords: [
        'tcu',
        'benbrook',
        'ridglea',
        'clearfork',
        'western hills',
        'fort worth west',
      ],
    },
    {
      id: 'arlington-midcities',
      name: 'Arlington, Grand Prairie edges & mid-cities entertainment belt',
      shortName: 'Arlington / Mid-Cities',
      neighborhoods: [
        'Arlington',
        'Grand Prairie edges (Tarrant patterns)',
        'Entertainment District',
        'Pantego / Dalworthington Gardens edges',
        'East Arlington multi-family',
      ],
      housingTypes:
        'Multi-family near venues, suburban SFH, townhomes, older tract homes',
      challenges: [
        'Stadium and event-day surface-street gridlock',
        'I-30 / SH-360 congestion',
        'Apartment move windows competing with event calendars',
        'Dallas County border pairs common on eastern edges',
      ],
      moverTips:
        'Never schedule curb-dependent moves against major stadium event start times. Price I-30 peaks honestly. Collect apartment packets early.',
      cityKeywords: [
        'arlington',
        'grand prairie',
        'pantego',
        'entertainment district',
        'cowboys',
        'rangers',
      ],
    },
    {
      id: 'northeast-suburbs',
      name: 'Northeast: Keller, Southlake, Colleyville, Grapevine & NRH',
      shortName: 'NE Suburbs',
      neighborhoods: [
        'Keller',
        'Southlake',
        'Colleyville',
        'Grapevine',
        'North Richland Hills',
        'Watauga / Haltom edges',
      ],
      housingTypes:
        'Master-planned SFH, HOA villages, higher-end suburban product, multi-family along corridors',
      challenges: [
        'SH-114 / SH-121 / I-820 peaks',
        'HOA COI and gate lists',
        'High summer Saturday family demand',
        'Airport-adjacent traffic near Grapevine',
      ],
      moverTips:
        'Treat northeast suburbs as HOA-first growth work. Book June–August Saturdays early. Build airport-corridor buffer for Grapevine-area pairs.',
      cityKeywords: [
        'keller',
        'southlake',
        'colleyville',
        'grapevine',
        'north richland hills',
        'watauga',
      ],
    },
    {
      id: 'south-southeast',
      name: 'South & southeast: Mansfield, Burleson edges & Crowley',
      shortName: 'South Tarrant',
      neighborhoods: [
        'Mansfield',
        'Burleson edges',
        'Crowley',
        'Everman edges',
        'Forest Hill edges',
        'Rendon edges',
      ],
      housingTypes:
        'Newer SFH tracts, HOA communities, multi-family, growth-edge product',
      challenges: [
        'US-287 / I-35W / I-20 approach congestion',
        'Long portal time to Fort Worth core or Arlington',
        'HOA rules in newer villages',
        'Johnson County border confusion south of Burleson',
      ],
      moverTips:
        'Price south-growth ↔ core pairs with full freeway buffer. Collect HOA packets. Clarify Tarrant vs Johnson destinations.',
      cityKeywords: [
        'mansfield',
        'burleson',
        'crowley',
        'everman',
        'forest hill',
      ],
    },
    {
      id: 'alliance-north-industrial',
      name: 'North industrial: Alliance, Haslet edges & logistics corridors',
      shortName: 'Alliance / North',
      neighborhoods: [
        'Alliance corridor',
        'Haslet edges',
        'Fort Worth north industrial',
        'Roanoke approach edges',
        'Saginaw / Blue Mound edges',
      ],
      housingTypes:
        'Newer residential near logistics parks, multi-family, industrial-adjacent SFH',
      challenges: [
        'Heavy-truck and shift-change traffic',
        'I-35W / Alliance corridor volatility',
        'Limited pure “quiet suburban” windows on industrial approaches',
        'Denton County border pairs northward',
      ],
      moverTips:
        'Build industrial-corridor buffer on weekdays. Prefer early starts before shift changes. Clarify Tarrant vs Denton addresses on northern edges.',
      cityKeywords: [
        'alliance',
        'haslet',
        'saginaw',
        'roanoke',
        'blue mound',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Tarrant moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Core mid-rise soft costs, event-day delays, and loop freeway portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Core mid-rise elevator, COI & dock soft costs',
        detail:
          'Building packets and elevator reservations add time on downtown, West 7th, and Near Southside vertical product.',
      },
      {
        title: 'Loop and freeway congestion (I-30 / I-35W / I-820 / SH-360)',
        detail:
          'Portal-to-portal billing tracks peaks. Northeast ↔ south or Fort Worth ↔ Arlington pairs can burn 40–75+ minutes each way.',
      },
      {
        title: 'Event-day access near Arlington venues',
        detail:
          'Stadium and entertainment schedules can force overtime, reschedules, or longer detours when curb access collapses.',
      },
      {
        title: 'HOA density in northeast growth suburbs',
        detail:
          'Gate lists, COI, and approved hours in Keller / Southlake / Colleyville-style villages push demand into peak pricing.',
      },
      {
        title: 'Industrial corridor delays',
        detail:
          'Alliance and logistics approaches add truck traffic that pure residential rate cards understate.',
      },
      {
        title: 'Cross-county DFW patterns',
        detail:
          'Tarrant ↔ Dallas, Denton, or Johnson stops need honest distance assumptions in the written estimate.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,300+',
        note: 'Higher with elevators, event traffic, or peak freeways',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,500–$3,900+',
        note: 'HOA soft costs and older-grid carries trend up',
      },
      {
        label: '3–4+ BR / mid-rise / cross-zone',
        value: '$2,500–$7,200+',
        note: 'Core vertical and long northeast–south pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$180+/hr',
        note: 'Portal-to-portal; packing and larger crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Tarrant move',
    intro:
      'School calendars, stadium event seasons, university turnover, and summer heat all reshape access and crew availability.',
    items: [
      {
        title: 'Best truck windows: mid-week mornings',
        detail:
          'Tuesday–Thursday before 9 a.m. usually clear curb space and reduce I-30 / I-35W / I-820 pain. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Peak family season: May–August',
        detail:
          'Northeast and south growth suburbs fill Saturday calendars. Book 2–4 weeks ahead for popular windows.',
      },
      {
        title: 'Stadium and entertainment calendars',
        detail:
          'Arlington event days can wipe out flexible curb access. Cross-check venue schedules before locking a Saturday near the entertainment district.',
      },
      {
        title: 'TCU and multi-family turnover',
        detail:
          'University-area and mid-cities apartments spike around semester and lease cycles. Avoid peak student weekends when flexible.',
      },
      {
        title: 'Summer heat',
        detail:
          'Prefer early starts; heat slows open carries on suburban streets and industrial approaches with little shade.',
      },
    ],
  },
  specialized: [
    {
      id: 'fort-worth-core-cultural',
      title: 'Fort Worth core & cultural-district access module',
      intro:
        'Downtown, Near Southside, West 7th, and Stockyards-edge jobs fail on docks, event traffic, and street width more often than on packing skill.',
      bullets: [
        'Request building move packets (COI, elevator hours, dock rules) early for mid-rises.',
        'Share street and dock photos for historic grids and river-edge approaches.',
        'Avoid major downtown and Stockyards festival weekends when flexible.',
        'Reserve elevators in writing and reconfirm the day before.',
        'Discuss valuation for higher-value renovated inventories early.',
      ],
    },
    {
      id: 'dfw-overflow-industrial',
      title: 'DFW overflow suburbs & industrial corridor module',
      intro:
        'Northeast HOA growth and Alliance/logistics volume is distance and access logistics — not Fort Worth loft packing alone.',
      bullets: [
        'Collect HOA COI and gate lists for Keller, Southlake, Colleyville, and similar villages.',
        'Price portal-to-portal time honestly for I-820, SH-114, and I-35W pairs.',
        'Build industrial shift-change buffer near Alliance corridors.',
        'Never fight stadium start times for Arlington curb-dependent jobs.',
        'Clarify Dallas, Denton, or Johnson border addresses before final pricing.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Tarrant County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, Fort Worth vs mid-cities lifestyle — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        intro:
          'Multiple independent school districts serve Tarrant County (Fort Worth ISD, Arlington, Keller, Mansfield, Grapevine-Colleyville, and others). Assignment is address-based.',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Public K–12 is split across many ISDs. Confirm zoning for any property — suburb marketing names do not guarantee school assignment.',
          },
          {
            title: 'Growth suburbs and capacity',
            detail:
              'Northeast and south growth areas can see enrollment pressure. Ask districts about capacity and busing when touring.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Texas Education Agency data, and campus visits beat ranking screenshots alone.',
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
              'Texas Health Resources, JPS Health Network, Baylor Scott & White campuses, and other regional facilities serve Fort Worth and mid-cities. Confirm networks and specialties for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from northeast or south suburbs to preferred hospitals — loop freeways change “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Fort Worth vs overflow stock',
            detail:
              'Expect denser mid-rise and renovated urban product near the core; larger HOA tracts in Keller/Southlake patterns; mixed multi-family near Arlington venues.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase and rent levels vary sharply between historic Fort Worth neighborhoods and premium northeast suburbs. Budget for HOA dues where applicable.',
          },
          {
            title: 'Industrial adjacency',
            detail:
              'Some northern and logistics-adjacent pockets trade price for truck traffic and noise. Visit at shift-change hours before deciding.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Tarrant areas fit whom',
        bullets: [
          {
            title: 'Fort Worth urban and cultural lifestyle',
            detail:
              'Downtown, Near Southside, West 7th, and Cultural District edges suit people prioritizing urban amenities and a distinct Fort Worth identity.',
          },
          {
            title: 'Northeast family suburbs',
            detail:
              'Keller, Southlake, Colleyville, and Grapevine often appeal for newer homes and schools — with freeway commute tradeoffs into Dallas or Alliance job centers.',
          },
          {
            title: 'Arlington and mid-cities convenience',
            detail:
              'Arlington can suit households wanting mid-cities access and entertainment proximity; verify event-day traffic before committing to venue-adjacent multi-family.',
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
              'Aerospace and defense, logistics and industrial, healthcare, education, hospitality near venues, and corporate offices shape local employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'Most households are car-dependent. I-30, I-35W, I-820, and SH-360 peaks are real. Test drive peak routes before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Western Metroplex character',
            detail:
              'Tarrant mixes a historic Fort Worth core, industrial north, and DFW overflow suburbs — a different feel from Dallas’s corporate grid or Collin’s master-planned boom towns alone.',
          },
          {
            title: 'Climate',
            detail:
              'Hot summers and occasional severe storms. Plan outdoor staging and heat-safe move-in logistics.',
          },
          {
            title: 'Events and culture',
            detail:
              'Stockyards, cultural district, and Arlington venues create lively weekends — and occasional access headaches. Visit at event and non-event times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Tarrant resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify mover registration before deposits.',
    items: [
      {
        label: 'Tarrant County — official site',
        href: 'https://www.tarrantcounty.com/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Fort Worth',
        href: 'https://www.fortworthtexas.gov/',
        external: true,
      },
      {
        label: 'City of Arlington',
        href: 'https://www.arlingtontx.gov/',
        external: true,
      },
      {
        label: 'Fort Worth ISD',
        href: 'https://www.fwisd.org/',
        external: true,
        note: 'Boundaries & calendars (one of several ISDs)',
      },
      {
        label: 'Arlington ISD',
        href: 'https://www.aisd.net/',
        external: true,
      },
      {
        label: 'Keller ISD',
        href: 'https://www.kellerisd.net/',
        external: true,
      },
      {
        label: 'DFW traffic — 511DFW',
        href: 'https://www.511dfw.org/',
        external: true,
        note: 'I-30, I-35W, I-820 before load windows',
      },
      {
        label: 'TxDMV — household goods movers',
        href: 'https://www.txdmv.gov/motor-carriers/household-goods-movers',
        external: true,
        note: 'Intrastate Texas household-goods motor carrier resources',
      },
      {
        label: 'FMCSA SAFER — interstate authority',
        href: 'https://safer.fmcsa.dot.gov/',
        external: true,
        note: 'Required when the move crosses state lines',
      },
      {
        label: 'Move Trust Hub — verify a USDOT',
        href: '/verify-dot',
        note: 'Cross-check interstate licensing before deposits',
      },
      {
        label: 'Free moving calculator',
        href: '/moving-calculator',
        note: 'Inventory-based volume for local or long-distance',
      },
      {
        label: 'All Texas local mover guides',
        href: '/local-movers/texas',
      },
    ],
  },
  directoryHint:
    'Prefer crews with Fort Worth mid-rise and historic-grid experience for core jobs; HOA fluency for Keller/Southlake/Colleyville; event-calendar awareness for Arlington. Industrial north needs shift-change buffers. Verify TxDMV for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
};
