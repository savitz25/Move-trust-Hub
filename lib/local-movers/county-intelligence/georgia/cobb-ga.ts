import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Cobb County, Georgia moving intelligence.
 * Differentiators: NW Atlanta suburbs, Cumberland/Vinings, Kennesaw/Acworth, I-75 —
 * not Fulton intown towers, Gwinnett I-85 diversity growth, or DeKalb Emory/intown-east mix.
 */
export const cobbCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'georgia',
  countySlug: 'cobb',
  hubTitle: 'Cobb County Moving Intelligence Hub',
  eyebrow: 'Cobb · NW Atlanta suburbs, Cumberland & I-75 corridor',
  h1: 'Moving in Cobb County: Cumberland, Vinings, Kennesaw Access & I-75 Corridor Guide',
  heroOpener:
    'Cobb County is northwest metro Atlanta’s mixed suburban market: Cumberland and Vinings multi-family and commercial density near I-285, established Smyrna and Marietta neighborhoods, Kennesaw and Acworth growth along I-75, and east Cobb HOA tracts with longer arterial carries. A Vinings mid-rise, a Marietta bungalow renovation, a Kennesaw two-story, and an east Cobb cul-de-sac do not share elevator rules, driveway constraints, or I-75 risk. Cumberland congestion, Barrett Parkway peaks, and school-calendar family volume rewrite “local” estimates that treat all of Cobb as interchangeable. This hub is for people actually moving in Cobb — not generic Atlanta tips recycled from Midtown or Gwinnett.',
  heroCredibility:
    'Georgia DPS / MCCD household goods for intrastate Georgia moves · FMCSA for interstate legs · Cumberland multi-family & I-75 awareness · Curated directory listings',
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
    title: 'What makes moving in Cobb County different',
    intro:
      'These are Cobb realities — Cumberland/Vinings density, I-75 northwest growth, and east Cobb HOA suburbs — not interchangeable “northwest Atlanta” boilerplate.',
    bullets: [
      {
        title: 'Cumberland and Vinings are multi-family logistics markets',
        detail:
          'Mid-rises and apartment communities near the Battery / Cumberland and Vinings often need COI, elevator reservations, and fixed move windows — closer to intown process than pure suburban driveway work.',
      },
      {
        title: 'I-75 and I-285 define portal-to-portal time',
        detail:
          'Smyrna ↔ Kennesaw, Vinings ↔ Acworth, or east Cobb ↔ Cumberland pairs can look short on a map and long on a clock at peak. Price freeway reality, not crow-flies miles.',
      },
      {
        title: 'East Cobb HOA tracts vs west/northwest growth product',
        detail:
          'East Cobb often means established larger homes, mature landscaping, and association rules. Kennesaw, Acworth, and northwest corridors add newer tracts, townhomes, and construction access friction.',
      },
      {
        title: 'Marietta and Smyrna mix historic grids with new multi-family',
        detail:
          'Square-adjacent older streets, renovated bungalows, and modern apartment product can sit in the same estimate pair. Survey stairs, alley access, and elevator rules separately.',
      },
      {
        title: 'Corporate and venue calendars affect Cumberland staging',
        detail:
          'Office, retail, and event traffic near Cumberland can shrink curb windows. Prefer mid-week mornings for dock- and curb-dependent jobs when building rules allow.',
      },
      {
        title: 'Family SFH demand still dominates much of the county',
        detail:
          'School calendars and multi-bedroom inventories fill Saturday crews from May through August — especially east Cobb and Kennesaw corridors.',
      },
      {
        title: 'Cross-county northwest metro pairs are common',
        detail:
          'Households regularly move Cobb ↔ Fulton, Cherokee, Paulding, or Douglas. Clarify county lines so drive time and licensing assumptions stay accurate.',
      },
      {
        title: 'Intrastate Georgia rules vs interstate authority',
        detail:
          'Moves entirely within Georgia are generally subject to Georgia DPS Motor Carrier Compliance Division (MCCD) household-goods frameworks. Interstate legs need active FMCSA USDOT (and usually MC) authority.',
      },
    ],
  },
  zonesHeading: 'Cobb access zones',
  zonesIntro:
    'Plan by Cumberland/Vinings density, Smyrna/Marietta core, east Cobb HOA suburbs, Kennesaw/Acworth I-75 growth, and west Cobb edges — each has its own access and traffic profile.',
  zones: [
    {
      id: 'cumberland-vinings',
      name: 'Cumberland, Vinings & I-285 edge',
      shortName: 'Cumberland / Vinings',
      neighborhoods: [
        'Cumberland',
        'Vinings',
        'The Battery Atlanta edges',
        'Galleria area',
        'Paces Ferry corridor',
        'I-285 / I-75 interchange edges',
      ],
      housingTypes:
        'Mid-rise multi-family, luxury apartments, townhomes, limited SFH and estate pockets',
      challenges: [
        'Elevator/COI and building move windows',
        'Cumberland event and office congestion',
        'Tight loading courts and truck length limits',
        'High portal time to northwest SFH destinations',
      ],
      moverTips:
        'Get apartment packets early. Prefer mid-week morning freight windows. Avoid major event days near the Battery when flexible. Share dock photos and height limits.',
      cityKeywords: [
        'cumberland',
        'vinings',
        'battery',
        'galleria',
        'paces ferry',
      ],
    },
    {
      id: 'smyrna-marietta',
      name: 'Smyrna, Marietta & central Cobb',
      shortName: 'Smyrna / Marietta',
      neighborhoods: [
        'Smyrna',
        'Marietta',
        'Marietta Square edges',
        'Belmont Hills edges',
        'Concord Road corridor',
        'South Marietta Parkway edges',
      ],
      housingTypes:
        'Older SFH and bungalows, renovations, townhomes, multi-family, some HOA villages',
      challenges: [
        'Mixed older-grid access and newer multi-family elevators',
        'Atlanta Road / Windy Hill / 120 congestion',
        'Stairs and limited driveway depth on renovated stock',
        'Weekday civic and commercial traffic near Marietta core',
      ],
      moverTips:
        'Photo driveway width, stairs, and street turns for older homes. Confirm elevator rules for multi-family. Prefer early weekday starts near commercial corridors.',
      cityKeywords: [
        'smyrna',
        'marietta',
        'windy hill',
        'belmont hills',
        'concord',
      ],
    },
    {
      id: 'east-cobb',
      name: 'East Cobb: established HOA & family suburbs',
      shortName: 'East Cobb',
      neighborhoods: [
        'East Cobb',
        'Wheeler / Lassiter corridors',
        'Johnson Ferry corridor',
        'Sewell Mill edges',
        'Indian Hills edges',
        'Roswell Road (Cobb) edges',
      ],
      housingTypes:
        'Larger established SFH, HOA communities, some townhomes, limited multi-family',
      challenges: [
        'HOA COI and truck rules in many subdivisions',
        'Johnson Ferry / Roswell Road congestion',
        'Long driveway carries and mature landscaping',
        'High-value contents and careful-handling expectations',
      ],
      moverTips:
        'Collect HOA packets early. Discuss valuation for higher-value inventories. Build arterial buffer into school-year mornings. Book summer Saturdays early.',
      cityKeywords: [
        'east cobb',
        'johnson ferry',
        'sewell mill',
        'indian hills',
        'lassiter',
      ],
    },
    {
      id: 'kennesaw-acworth',
      name: 'Kennesaw, Acworth & I-75 north growth',
      shortName: 'Kennesaw / Acworth',
      neighborhoods: [
        'Kennesaw',
        'Acworth',
        'Barrett Parkway corridor',
        'Town Center edges',
        'Wade Green corridor',
        'Lake Allatoona edges',
      ],
      housingTypes:
        'Growth SFH, HOA master plans, townhomes, multi-family near retail nodes',
      challenges: [
        'I-75 / Barrett Parkway congestion',
        'HOA gate lists and weekday windows',
        'New-construction staging on growth edges',
        'Spill toward Cherokee County destinations',
      ],
      moverTips:
        'Price I-75 peaks honestly. Confirm construction access the week of greenfield moves. Clarify Cobb vs Cherokee addresses near the line.',
      cityKeywords: [
        'kennesaw',
        'acworth',
        'barrett',
        'town center',
        'wade green',
      ],
    },
    {
      id: 'west-cobb',
      name: 'West Cobb: Powder Springs, Austell & Mableton edges',
      shortName: 'West Cobb',
      neighborhoods: [
        'Powder Springs',
        'Austell edges',
        'Mableton',
        'Macland Road corridor',
        'Dallas Highway edges',
        'South Cobb Drive corridor',
      ],
      housingTypes:
        'Suburban SFH, townhomes, some multi-family, mix of older tracts and newer subdivisions',
      challenges: [
        'Longer portal time to Cumberland or intown Fulton',
        'Arterial congestion without always using I-75',
        'HOA rules in newer villages mixed with older grids',
        'County-line confusion with Douglas / Paulding edges',
      ],
      moverTips:
        'Treat west Cobb as distance work from Vinings multi-family. Confirm HOA vs non-HOA access. Prefer mid-week mornings for cross-zone pairs.',
      cityKeywords: [
        'powder springs',
        'austell',
        'mableton',
        'macland',
        'south cobb',
      ],
    },
    {
      id: 'north-cobb-edge',
      name: 'North Cobb edges toward Cherokee',
      shortName: 'North Cobb Edge',
      neighborhoods: [
        'North Kennesaw edges',
        'Woodstock edge (verify county)',
        'Bells Ferry corridor',
        'Shiloh Road edges',
        'Hwy 92 corridor pockets',
      ],
      housingTypes:
        'Newer SFH tracts, HOA communities, townhomes, limited multi-family',
      challenges: [
        'Growth traffic and incomplete street staging',
        'HOA COI and gate lists',
        'County-line address confusion with Cherokee',
        'Long empty-mile time from southern Cobb staging',
      ],
      moverTips:
        'Clarify Cobb vs Cherokee jurisdiction on every address. Collect gate lists early. Book peak family Saturdays well ahead in summer.',
      cityKeywords: [
        'woodstock',
        'bells ferry',
        'shiloh',
        'north kennesaw',
        'hwy 92',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Cobb moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Cumberland elevator soft costs, east Cobb HOA logistics, and I-75 portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Cumberland / Vinings elevator & COI soft costs',
        detail:
          'Building packets, elevator reservations, and certificate admin add time before loading starts on multi-family product.',
      },
      {
        title: 'I-75 / I-285 / Barrett congestion',
        detail:
          'Portal-to-portal billing tracks peaks. South–north pairs can burn 35–70+ minutes each way at rush.',
      },
      {
        title: 'East Cobb HOA and large SFH access',
        detail:
          'Gate rules, mature landscaping, long carries, and higher-value inventories raise labor hours.',
      },
      {
        title: 'Kennesaw growth & new-construction friction',
        detail:
          'Incomplete streets, mud, and limited staging on northwest builds raise labor hours and delay risk.',
      },
      {
        title: 'Peak summer family demand',
        detail:
          'School-calendar SFH volume tightens Saturday supply May–August.',
      },
      {
        title: 'Cross-county northwest metro patterns',
        detail:
          'Cobb ↔ Fulton, Cherokee, Paulding, or Douglas stops need honest distance assumptions in the written estimate.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$490–$1,400+',
        note: 'Higher with elevators, HOA windows, or peak I-75 traffic',
      },
      {
        label: '2–3BR condo/townhome or modest SFH',
        value: '$1,600–$4,200+',
        note: 'Cumberland multi-family and east Cobb HOA soft costs trend up',
      },
      {
        label: '3–4+ BR / gated community / cross-zone',
        value: '$2,700–$7,800+',
        note: 'Large east Cobb homes and long I-75 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$190+/hr',
        note: 'Portal-to-portal; packing and larger crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Cobb move',
    intro:
      'School calendars, Cumberland multi-family turnover, Kennesaw growth closings, and summer heat all reshape access and crew availability.',
    items: [
      {
        title: 'Best truck windows: mid-week mornings',
        detail:
          'Tuesday–Thursday before 9 a.m. usually clear curb space and reduce I-75 / Cumberland pain. Avoid month-end Fridays when leases and closings collide.',
      },
      {
        title: 'Peak family season: May–August',
        detail:
          'East Cobb, Kennesaw, and west Cobb SFH moves fill Saturday calendars first. Book 2–4 weeks ahead for popular HOA windows.',
      },
      {
        title: 'Cumberland multi-family turnover',
        detail:
          'Apartments near Cumberland and Vinings can spike mid-month. Reserve elevators and COI as soon as the lease date is firm.',
      },
      {
        title: 'Event days near the Battery',
        detail:
          'Game and concert traffic can erase curb access. Cross-check calendars for dock-dependent jobs.',
      },
      {
        title: 'Summer heat & afternoon storms',
        detail:
          'Prefer early starts for heat on open suburban streets. Plan moisture protection when storms are forecast.',
      },
    ],
  },
  specialized: [
    {
      id: 'cumberland-multifamily',
      title: 'Cumberland / Vinings multi-family module',
      intro:
        'Northwest I-285 multi-family jobs fail on elevators, COI, and event congestion more often than on packing skill.',
      bullets: [
        'Request apartment move packets (COI, elevator hours, dock rules) at lease signing.',
        'Share dock and loading-court photos before the survey is final.',
        'Reserve freight elevators in writing and reconfirm the day before.',
        'Avoid major Battery event start times when the building allows flexibility.',
        'Price portal time honestly for any pair that must re-enter I-75 or I-285 after load-out.',
      ],
    },
    {
      id: 'i75-east-cobb-hoa',
      title: 'I-75 corridor & east Cobb HOA module',
      intro:
        'Much of Cobb volume is HOA logistics plus freeway distance — not Atlanta intown high-rise work.',
      bullets: [
        'Collect HOA COI, gate lists, and approved hours before the survey is final.',
        'Price portal-to-portal time honestly for I-75, Barrett Parkway, and Johnson Ferry pairs.',
        'Photo driveway, mature trees, and cul-de-sac turnaround for established east Cobb homes.',
        'Confirm unfinished road conditions on Kennesaw/Acworth greenfield moves.',
        'Clarify Cherokee, Fulton, Paulding, or Douglas border addresses.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Cobb County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, northwest suburban lifestyle — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        intro:
          'Cobb County School District serves most of the county; Marietta City Schools serves the city of Marietta. Assignment is address-based.',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Confirm whether an address falls in Cobb County School District or Marietta City Schools. Neighborhood marketing names do not guarantee a campus.',
          },
          {
            title: 'Growth areas and capacity',
            detail:
              'Northwest growth corridors can see enrollment pressure. Ask districts about capacity, transfers, and busing when touring.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Georgia Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'Wellstar Kennestone and other Wellstar campuses, plus access into metro Atlanta systems, serve different Cobb corridors. Confirm networks and specialties for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Acworth, east Cobb, or Powder Springs to preferred facilities — I-75 congestion changes “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Multi-family density vs suburban SFH',
            detail:
              'Expect denser multi-unit product near Cumberland and Vinings; larger established homes dominate much of east Cobb; newer tracts cluster toward Kennesaw and Acworth.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by corridor. Budget for HOA/condo dues, parking in multi-family, and longer commute costs from outer northwest edges.',
          },
          {
            title: 'HOA prevalence',
            detail:
              'Many east Cobb and growth communities include dues and architectural rules. Read association documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Cobb areas fit whom',
        bullets: [
          {
            title: 'Cumberland / Vinings lifestyle',
            detail:
              'Suits people prioritizing newer multi-family amenities and job/venue proximity — with elevator move logistics and event traffic tradeoffs.',
          },
          {
            title: 'East Cobb family suburbs',
            detail:
              'Often appeals for established homes and school-focused living — with Johnson Ferry arterial congestion and HOA rules.',
          },
          {
            title: 'Kennesaw / Acworth growth pattern',
            detail:
              'Newer homes and I-75 access attract many relocators; verify peak drive times to Cumberland or intown Fulton.',
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
              'Healthcare, corporate offices near Cumberland, logistics, retail, education, and professional services shape local employment. Many residents also commute into Fulton cores.',
          },
          {
            title: 'Commute realism',
            detail:
              'Most households are car-dependent. I-75, I-285, Barrett Parkway, and Johnson Ferry peaks are real. Test drive peak routes before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Northwest metro suburban character',
            detail:
              'Cobb stacks venue-adjacent multi-family, historic Marietta edges, and family HOA suburbs — different from Fulton’s vertical core or Gwinnett’s I-85 growth pattern.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers and frequent storms. Plan outdoor staging and heat-safe move-in logistics.',
          },
          {
            title: 'Amenities and pace',
            detail:
              'Retail, parks, and dining are strong along major corridors; outer edges can feel more construction-oriented. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Cobb resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify mover registration before deposits.',
    items: [
      {
        label: 'Cobb County — official site',
        href: 'https://www.cobbcounty.org/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Marietta',
        href: 'https://www.mariettaga.gov/',
        external: true,
      },
      {
        label: 'City of Smyrna',
        href: 'https://www.smyrnaga.gov/',
        external: true,
      },
      {
        label: 'City of Kennesaw',
        href: 'https://www.kennesaw-ga.gov/',
        external: true,
      },
      {
        label: 'Cobb County School District',
        href: 'https://www.cobbk12.org/',
        external: true,
        note: 'Boundaries & calendars (most of county)',
      },
      {
        label: 'Marietta City Schools',
        href: 'https://www.marietta-city.org/',
        external: true,
      },
      {
        label: 'Georgia 511 — traffic conditions',
        href: 'https://www.511ga.org/',
        external: true,
        note: 'I-75, I-285 before load windows',
      },
      {
        label: 'Georgia DPS / MCCD — household goods',
        href: 'https://gamccd.net/HouseholdGoods.aspx',
        external: true,
        note: 'Intrastate Georgia household-goods motor carrier resources',
      },
      {
        label: 'Georgia MCCD — main site',
        href: 'https://gamccd.net/',
        external: true,
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
        label: 'All Georgia local mover guides',
        href: '/local-movers/georgia',
      },
    ],
  },
  directoryHint:
    'Prefer crews with Cumberland/Vinings elevator and COI experience for multi-family; east Cobb HOA fluency for established family homes; honest I-75 / Barrett timing for Kennesaw and Acworth pairs. Verify Georgia DPS/MCCD for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
};
