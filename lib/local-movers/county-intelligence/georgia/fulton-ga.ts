import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Fulton County, Georgia moving intelligence.
 * Differentiators: Atlanta intown high-rises/parking, Midtown/Downtown, Buckhead,
 * south Fulton contrast, Connector traffic — not Gwinnett HOA sprawl, Cobb NW suburbs,
 * or DeKalb intown-east / Emory patterns.
 */
export const fultonCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'georgia',
  countySlug: 'fulton',
  hubTitle: 'Fulton County Moving Intelligence Hub',
  eyebrow: 'Fulton · Atlanta core, Buckhead & south Fulton contrast',
  h1: 'Moving in Fulton County: Atlanta High-Rises, Buckhead Access & Connector Traffic Guide',
  heroOpener:
    'Fulton County is Atlanta’s vertical-and-corridor engine under one county label: Midtown and Downtown towers with freight elevators and COI packets, Buckhead high-rises and tree-lined estates with tight curb staging, intown neighborhoods on connector-adjacent grids, and a very different south Fulton pattern of suburban tracts and longer portal times. A Midtown condo, a Buckhead townhome, a West Midtown loft, and a south Fulton single-family home do not share truck access, parking reality, or drive-time risk. I-75/85 through the Connector, GA-400, I-285, and event days rewrite “local” estimates that ignore building packets and traffic windows. This hub is for people actually moving in Fulton — not generic metro-Atlanta tips recycled from Gwinnett or Cobb.',
  heroCredibility:
    'Georgia DPS / MCCD household goods for intrastate Georgia moves · FMCSA for interstate legs · Atlanta high-rise COI & Connector awareness · Curated directory listings',
  majorCorridors: 'I-75/85 Connector · I-285 · GA-400 · I-20',
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
    title: 'What makes moving in Fulton County different',
    intro:
      'These are Fulton realities — intown vertical living, Buckhead access friction, south Fulton distance, and Connector congestion — not interchangeable “Atlanta metro” boilerplate.',
    bullets: [
      {
        title: 'High-rises make COI and elevators the default intown',
        detail:
          'Midtown, Downtown, Buckhead towers, and many West Midtown / Atlantic Station mid-rises require Certificates of Insurance naming the association or management company, reserved freight elevators, floor protection, and fixed move windows. Treat the building packet as part of the survey — not day-of paperwork.',
      },
      {
        title: 'Parking and curb staging are the job, not a footnote',
        detail:
          'Intown blocks often lack legal truck length, have temporary no-parking rules, and compete with rideshare and event traffic. Loading-zone permits, cone plans, and shuttle carries from legal staging can dominate labor hours.',
      },
      {
        title: 'The Connector turns short map miles into billable time',
        detail:
          'I-75/85 through Downtown, GA-400, I-20, and I-285 can double portal-to-portal hours at peak. Buckhead ↔ south Fulton or Midtown ↔ Alpharetta-edge pairs look local on a map and regional on a clock.',
      },
      {
        title: 'North Fulton vertical/estate mix vs south Fulton SFH contrast',
        detail:
          'Buckhead and Sandy Springs edges stack elevators, gated communities, and high-value contents. South Fulton often flips to driveway SFH, HOA villages, and longer empty-mile time from intown staging — different crews and equipment assumptions under one county name.',
      },
      {
        title: 'Event, stadium, and entertainment calendars rewrite windows',
        detail:
          'Downtown, Midtown, and Mercedes-Benz Stadium / State Farm Arena corridors can close curb access and spike congestion. Prefer mid-week mornings when HOA or building rules allow.',
      },
      {
        title: 'Intown stairs, alleys, and older multi-family still matter',
        detail:
          'Not every Fulton job is a tower. Virginia-Highland-edge patterns, older multi-story walk-ups, and narrow residential streets need long carries and careful truck placement even without freight elevators.',
      },
      {
        title: 'Multi-county metro pairs are routine',
        detail:
          'Households regularly move Fulton ↔ DeKalb, Cobb, Gwinnett, or Clayton. Clarify county lines on the estimate so drive time and licensing assumptions stay accurate.',
      },
      {
        title: 'Intrastate Georgia rules vs interstate authority',
        detail:
          'Moves entirely within Georgia are generally subject to Georgia Department of Public Safety (DPS) Motor Carrier Compliance Division (MCCD) household-goods frameworks. Interstate legs need active FMCSA USDOT (and usually MC) authority.',
      },
    ],
  },
  zonesHeading: 'Fulton access zones',
  zonesIntro:
    'Plan by Downtown/Midtown vertical core, Buckhead, intown neighborhoods, north Fulton edges, and south Fulton growth — elevator rules, curb reality, and Connector risk cluster by zone more than by ZIP alone.',
  zones: [
    {
      id: 'downtown-midtown',
      name: 'Downtown, Midtown & urban core',
      shortName: 'Downtown / Midtown',
      neighborhoods: [
        'Downtown Atlanta',
        'Midtown',
        'Old Fourth Ward edges',
        'Castleberry Hill edges',
        'Centennial Olympic Park area',
        'Tech Square edges',
      ],
      housingTypes:
        'High-rises and mid-rises, urban condos, lofts, limited older multi-story walk-ups',
      challenges: [
        'Near-universal COI, elevator reservations, and building move windows',
        'Tight loading docks and scarce legal curb staging',
        'Connector and event congestion',
        'Garage height limits and dock time caps on some towers',
      ],
      moverTips:
        'Get building packets early (COI limits, elevator hours, dock rules, certificate holders). Prefer mid-week morning freight windows. Share dock photos and truck height limits. Avoid major stadium/concert days when flexible.',
      cityKeywords: [
        'atlanta',
        'downtown',
        'midtown',
        'old fourth ward',
        'castleberry hill',
        'tech square',
      ],
    },
    {
      id: 'buckhead',
      name: 'Buckhead: towers, estates & commercial core',
      shortName: 'Buckhead',
      neighborhoods: [
        'Buckhead',
        'Lenox / Phipps edges',
        'Garden Hills',
        'Peachtree Battle edges',
        'Tuxedo Park edges',
        'Brookhaven edge (verify county)',
      ],
      housingTypes:
        'Luxury high-rises, mid-rises, townhomes, large SFH estates, gated pockets',
      challenges: [
        'Elevator/COI rules mixed with estate driveway constraints',
        'GA-400 / Peachtree congestion',
        'High-value contents and careful-handling expectations',
        'Gate lists and HOA rules in planned pockets',
      ],
      moverTips:
        'Survey towers and estates as different product types. Collect COI and HOA packets early. Discuss valuation for higher-value inventories. Build GA-400 buffer into start times.',
      cityKeywords: [
        'buckhead',
        'lenox',
        'garden hills',
        'peachtree battle',
        'tuxedo park',
      ],
    },
    {
      id: 'west-midtown-intown',
      name: 'West Midtown, Atlantic Station & near-intown',
      shortName: 'West Midtown',
      neighborhoods: [
        'West Midtown',
        'Atlantic Station',
        'Home Park',
        'English Avenue edges',
        'Marietta Street corridor',
        'Howell Mill corridor',
      ],
      housingTypes:
        'Lofts, mid-rise multi-family, townhomes, renovated industrial product, some SFH',
      challenges: [
        'Mixed elevator and walk-up access',
        'Street parking pressure and construction staging',
        'I-75 / Northside Drive congestion',
        'Long carries from legal curb spots',
      ],
      moverTips:
        'Photo alley, garage, and curb options before the survey is final. Confirm elevator vs stair access unit-by-unit. Prefer early weekday starts near commercial corridors.',
      cityKeywords: [
        'west midtown',
        'atlantic station',
        'home park',
        'howell mill',
        'marietta street',
      ],
    },
    {
      id: 'north-fulton',
      name: 'North Fulton: Sandy Springs, Roswell & Alpharetta edges',
      shortName: 'North Fulton',
      neighborhoods: [
        'Sandy Springs',
        'Roswell',
        'Alpharetta edges',
        'Johns Creek edges (verify county)',
        'Milton edges',
        'GA-400 corridor multi-family',
      ],
      housingTypes:
        'Suburban SFH, master-planned HOA communities, mid-rise multi-family, townhomes',
      challenges: [
        'GA-400 / I-285 weekday congestion',
        'HOA COI and gate lists',
        'Long portal time to intown origins',
        'County-line confusion with Forsyth / Gwinnett / Cobb addresses',
      ],
      moverTips:
        'Price 400-corridor pairs honestly. Collect HOA packets for gated villages. Clarify Fulton vs neighboring county destinations on every address.',
      cityKeywords: [
        'sandy springs',
        'roswell',
        'alpharetta',
        'milton',
        'johns creek',
        'north fulton',
      ],
    },
    {
      id: 'south-fulton',
      name: 'South Fulton, East Point, College Park & Hapeville',
      shortName: 'South Fulton',
      neighborhoods: [
        'South Fulton',
        'East Point',
        'College Park',
        'Hapeville',
        'Union City edges',
        'Fairburn edges',
      ],
      housingTypes:
        'Suburban SFH tracts, townhomes, multi-family corridors, airport-adjacent product',
      challenges: [
        'I-85 / I-285 / Camp Creek congestion',
        'Airport-area traffic and hotel corridor peaks',
        'Longer empty-mile time from intown staging',
        'HOA rules in newer villages mixed with older street grids',
      ],
      moverTips:
        'Never price south Fulton ↔ Midtown as a short hop without traffic buffer. Confirm airport-adjacent street access. Book family SFH Saturdays early in summer.',
      cityKeywords: [
        'south fulton',
        'east point',
        'college park',
        'hapeville',
        'union city',
        'fairburn',
      ],
    },
    {
      id: 'intown-east-edge',
      name: 'Intown east-edge Fulton pockets',
      shortName: 'Intown East Edge',
      neighborhoods: [
        'Virginia-Highland edges',
        'Morningside edges',
        'Inman Park edges (verify city/county)',
        'Candler Park edges',
        'Ponce corridor edges',
      ],
      housingTypes:
        'Older SFH and bungalows, multi-story renovations, townhomes, low-rise multi-family',
      challenges: [
        'Narrow streets and limited truck length',
        'Mature trees and driveway constraints',
        'High-value contents and careful-handling norms',
        'Spill into DeKalb destinations near the county line',
      ],
      moverTips:
        'Photo driveway width, street turns, and stairs. Clarify Fulton vs DeKalb addresses. Prefer early starts near school and arterial corridors.',
      cityKeywords: [
        'virginia highland',
        'morningside',
        'inman park',
        'candler park',
        'ponce',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Fulton moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Tower elevator soft costs, parking/curb friction, and Connector portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Elevator, COI & dock soft costs',
        detail:
          'Building packets, elevator reservations, and certificate admin add time before loading starts on Midtown, Downtown, and Buckhead towers.',
      },
      {
        title: 'Parking, permits & long curb carries',
        detail:
          'Legal staging can sit a block or more from the door. Shuttle carries and permit logistics raise labor hours on intown jobs.',
      },
      {
        title: 'Connector / GA-400 / I-285 congestion',
        detail:
          'Portal-to-portal billing tracks freeway peaks. Intown ↔ north or south Fulton pairs can burn 40–90+ minutes each way at rush.',
      },
      {
        title: 'Buckhead estate access & high-value inventories',
        detail:
          'Long drives, gate lists, stairs, and careful-handling expectations increase crew time and valuation choices.',
      },
      {
        title: 'South Fulton distance & family SFH volume',
        detail:
          'Longer empty miles from intown staging plus peak summer Saturday demand push pricing on cross-zone pairs.',
      },
      {
        title: 'Cross-county metro-Atlanta patterns',
        detail:
          'Fulton ↔ DeKalb, Cobb, Gwinnett, or Clayton stops need honest distance assumptions in the written estimate.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$520–$1,500+',
        note: 'Higher with elevators, docks, parking friction, or peak Connector traffic',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,700–$4,500+',
        note: 'Tower soft costs and intown carries trend up',
      },
      {
        label: '3–4+ BR / Buckhead tower or estate / cross-zone',
        value: '$2,900–$8,500+',
        note: 'High-rises, estates, and long north–south pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$125–$195+/hr',
        note: 'Portal-to-portal; packing and larger crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Fulton move',
    intro:
      'Lease cycles, corporate and tower turnover, school calendars, summer heat, and event seasons all reshape access and crew availability.',
    items: [
      {
        title: 'Best truck windows: mid-week mornings',
        detail:
          'Tuesday–Thursday before 9 a.m. usually clear curb space and reduce Connector / 400 pain. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Peak family season: May–August',
        detail:
          'South Fulton and north Fulton SFH moves fill Saturday calendars. Book 2–4 weeks ahead for popular windows.',
      },
      {
        title: 'Tower & multi-family turnover',
        detail:
          'Midtown, Downtown, and Buckhead apartments spike mid-month and around corporate start dates. Reserve elevators as soon as the lease date is firm.',
      },
      {
        title: 'Event and stadium days',
        detail:
          'Downtown and Midtown curb access can vanish near major games and concerts. Cross-check calendars for dock-dependent jobs.',
      },
      {
        title: 'Summer heat & afternoon storms',
        detail:
          'Prefer early starts; plan tarps and dry staging when storms are forecast. Heat slows open carries on south Fulton streets and loading docks.',
      },
    ],
  },
  specialized: [
    {
      id: 'atlanta-vertical-parking',
      title: 'Atlanta vertical, COI & parking module',
      intro:
        'Midtown, Downtown, and Buckhead tower jobs fail on docks, elevators, and legal curb staging more often than on packing skill.',
      bullets: [
        'Request building move packets (COI, elevator hours, dock rules) at lease signing or escrow.',
        'Share dock, garage height, and street photos before the survey is final.',
        'Reserve freight elevators in writing and reconfirm the day before.',
        'Budget shuttle carries when trucks cannot stage at the door.',
        'Avoid stadium and major event start times when the building allows flexibility.',
      ],
    },
    {
      id: 'connector-cross-zone',
      title: 'Connector traffic & north–south cross-zone module',
      intro:
        'Fulton’s length along the Connector and GA-400 makes many “local” pairs regional drive-time jobs — especially Buckhead/intown ↔ south Fulton.',
      bullets: [
        'Price portal-to-portal time honestly for any pair that rides I-75/85, GA-400, I-20, or I-285.',
        'Prefer mid-week morning starts for cross-zone pairs.',
        'Clarify Fulton vs DeKalb / Cobb / Gwinnett / Clayton border addresses.',
        'Collect HOA packets for north and south suburban villages early.',
        'Book peak June–August Saturdays early — family SFH corridors fill first.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Fulton County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, intown vs suburban lifestyle — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        intro:
          'Public K–12 in Fulton spans Atlanta Public Schools in the city core and Fulton County Schools across much of north and south Fulton, plus city systems in some municipalities. Assignment is address-based.',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Confirm whether an address falls in Atlanta Public Schools, Fulton County Schools, or another local system. Marketing names like Buckhead or Midtown do not guarantee a campus.',
          },
          {
            title: 'Growth areas and capacity',
            detail:
              'North Fulton and south Fulton growth pockets can see enrollment pressure. Ask districts about capacity, transfers, and busing when touring.',
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
              'Emory, Piedmont, Grady, Northside, Wellstar-affiliated, and other regional facilities serve different Fulton corridors. Confirm networks and specialties for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from south Fulton or north GA-400 suburbs to preferred facilities — Connector congestion changes “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Vertical intown vs suburban stock',
            detail:
              'Expect dense multi-unit product in Midtown, Downtown, and Buckhead cores; larger SFH tracts dominate much of north and south Fulton.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by corridor. Budget for HOA/condo dues, parking fees in towers, and insurance on higher-value inventories.',
          },
          {
            title: 'HOA and condo governance',
            detail:
              'Towers and planned communities often control move hours, truck size, and deposits. Read association documents carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Fulton areas fit whom',
        bullets: [
          {
            title: 'Intown vertical lifestyle',
            detail:
              'Midtown, Downtown, West Midtown, and Buckhead towers suit people prioritizing walkable amenities and shorter urban access — with parking and elevator tradeoffs on move day.',
          },
          {
            title: 'North Fulton suburban pattern',
            detail:
              'Sandy Springs, Roswell, and Alpharetta-edge communities often appeal for newer homes and corporate proximity along GA-400 — with longer intown commute risk.',
          },
          {
            title: 'South Fulton patterns',
            detail:
              'South Fulton, East Point, and College Park corridors can offer more SFH inventory and airport-area access; verify traffic to intown job centers at peak hours.',
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
              'Corporate headquarters, professional services, film/TV production, healthcare, logistics near the airport, and technology corridors shape local employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'Many households are car-dependent outside MARTA-served cores. Connector, GA-400, I-285, and I-20 peaks are real. Test drive peak routes before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, multiple Atlantas',
            detail:
              'Fulton stacks a vertical urban core, Buckhead commercial density, and long suburban arms — different from Gwinnett’s I-85 growth suburbs or Cobb’s northwest pattern.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, frequent storms, and occasional winter ice events. Plan outdoor staging and weather contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Arts, sports, and nightlife concentrate intown; suburban corridors feel more family- and campus-oriented. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Fulton resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify mover registration before deposits.',
    items: [
      {
        label: 'Fulton County — official site',
        href: 'https://www.fultoncountyga.gov/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Atlanta',
        href: 'https://www.atlantaga.gov/',
        external: true,
      },
      {
        label: 'Atlanta Public Schools',
        href: 'https://www.atlantapublicschools.us/',
        external: true,
        note: 'Boundaries & calendars (city core)',
      },
      {
        label: 'Fulton County Schools',
        href: 'https://www.fultonschools.org/',
        external: true,
      },
      {
        label: 'Georgia 511 — traffic conditions',
        href: 'https://www.511ga.org/',
        external: true,
        note: 'Connector, GA-400, I-285 before load windows',
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
    'Prefer crews with Midtown/Downtown dock and elevator experience for towers; Buckhead estate and high-value handling for north-core homes; honest Connector / GA-400 timing for north–south pairs; HOA fluency for suburban Fulton. Verify Georgia DPS/MCCD for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
};
