import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Hillsborough County, Florida moving intelligence.
 * Differentiators: Tampa core vs suburbs, bay access, growth corridors —
 * not Pinellas peninsula/bridge logistics or Pasco north-suburb growth alone.
 */
export const hillsboroughCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'florida',
  countySlug: 'hillsborough',
  hubTitle: 'Hillsborough County Moving Intelligence Hub',
  eyebrow: 'Hillsborough · Tampa core & growth corridors',
  h1: 'Moving in Hillsborough County: Tampa Core, Bay Edges & Suburb Growth Zone Guide',
  heroOpener:
    'Hillsborough County is Tampa Bay’s largest inland–urban engine: downtown and South Tampa density on one side, explosive suburban growth in Brandon, Riverview, Wesley Chapel-edge patterns, and South County on the other. Channelside high-rises need COI and elevators; Hyde Park and South Tampa mean older street grids and careful staging; New Tampa and eastern corridors flip to HOA villages and I-75 / I-4 portal time; Port Tampa and bayfront pockets add industrial and waterfront access quirks. This hub is for people actually moving in Hillsborough — not generic Florida tips recycled from Orlando or Miami.',
  heroCredibility:
    'FDACS Ch. 507 for intrastate Florida moves · FMCSA for interstate legs · Tampa core vs suburb contrast · Curated directory listings',
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
    title: 'What makes moving in Hillsborough County different',
    intro:
      'These are Hillsborough realities — urban Tampa access vs growth-corridor HOAs under one county name — not interchangeable “Tampa Bay” boilerplate.',
    bullets: [
      {
        title: 'Tampa core and suburbs are different jobs under one county label',
        detail:
          'A Channelside condo, a South Tampa bungalow, a Brandon townhome, and a Riverview two-story do not share truck access, parking rules, or inventory profiles. Name both origin and destination zones on every estimate.',
      },
      {
        title: 'Downtown and mid-rise product brings COI and elevator rules',
        detail:
          'Channelside, downtown towers, and multi-unit near the core often require Certificates of Insurance, reserved elevators, and fixed move windows. Treat building packets as part of the survey.',
      },
      {
        title: 'Growth corridors rewrite demand and drive time',
        detail:
          'Brandon, Riverview, Valrico, FishHawk-area patterns, New Tampa, and South County growth fill crews and lengthen I-75 / I-4 / Crosstown-style portal time. “Local” map miles understate peak congestion.',
      },
      {
        title: 'Bay, river, and port edges change staging',
        detail:
          'Bayshore approaches, Davis Islands / Harbour Island access, and port-adjacent industrial traffic create narrow windows and truck constraints that inland cul-de-sacs never see.',
      },
      {
        title: 'HOA density is high in newer eastern and northern suburbs',
        detail:
          'Planned communities enforce gate lists, COI, and approved hours. Collect management rules before locking a Saturday crew in peak season.',
      },
      {
        title: 'Cross-bay pairs with Pinellas are common',
        detail:
          'Households regularly move Hillsborough ↔ Pinellas via bridges and causeways. Price bridge timing honestly; keep FDACS frameworks for in-state work and FMCSA when any leg leaves Florida.',
      },
      {
        title: 'Summer heat and afternoon storms affect open staging',
        detail:
          'Heat stress and daily thunderstorms slow exterior carries on suburban streets and open docks. Early starts outperform noon load-outs in peak summer.',
      },
      {
        title: 'Intrastate Florida rules vs interstate authority',
        detail:
          'Moves entirely within Florida are generally subject to Florida Statutes Chapter 507 household-mover frameworks administered by FDACS. Interstate legs need active FMCSA USDOT (and usually MC) authority.',
      },
    ],
  },
  zonesHeading: 'Hillsborough access zones',
  zonesIntro:
    'Plan by Tampa urban core, South Tampa / bay edges, northwest suburbs, eastern growth belt, and South County — each has its own access and traffic profile.',
  zones: [
    {
      id: 'tampa-core',
      name: 'Tampa urban core & Channelside',
      shortName: 'Tampa Core',
      neighborhoods: [
        'Downtown Tampa',
        'Channelside',
        'Harbour Island',
        'Ybor City',
        'Heights / River Arts District edges',
        'West River edges',
      ],
      housingTypes:
        'High-rises and mid-rises, urban condos, multi-family, some loft and redevelopment product',
      challenges: [
        'Elevator/COI and loading-dock reservations',
        'Event and arena traffic near downtown',
        'Limited curb staging',
        'Bridge and causeway timing to island pockets',
      ],
      moverTips:
        'Get building packets early. Prefer mid-week morning freight windows. Avoid major event days when flexible. Share dock photos and truck height limits.',
      cityKeywords: [
        'tampa',
        'channelside',
        'harbour island',
        'ybor',
        'downtown tampa',
      ],
    },
    {
      id: 'south-tampa-bay',
      name: 'South Tampa, Bayshore & peninsula pockets',
      shortName: 'South Tampa',
      neighborhoods: [
        'South Tampa',
        'Hyde Park',
        'Bayshore Beautiful',
        'Palma Ceia',
        'Davis Islands',
        'Ballast Point',
        'MacDill edges',
      ],
      housingTypes:
        'Older SFH and bungalows, multi-story homes, some multi-family, waterfront and near-bay product',
      challenges: [
        'Older street grids and limited truck length',
        'Island bridge access (Davis Islands)',
        'High-value contents and careful-handling norms',
        'Bay-edge storm and flood considerations on mapped parcels',
      ],
      moverTips:
        'Photo driveway width and street turns. Confirm Davis Islands truck and bridge rules. Discuss valuation for higher-value inventories. Prefer early starts near school corridors.',
      cityKeywords: [
        'south tampa',
        'hyde park',
        'palma ceia',
        'davis islands',
        'ballast point',
        'bayshore',
      ],
    },
    {
      id: 'northwest-suburbs',
      name: 'Northwest: Carrollwood, Citrus Park, Westchase & Town N Country',
      shortName: 'NW Suburbs',
      neighborhoods: [
        'Carrollwood',
        'Citrus Park',
        'Westchase',
        'Town N Country',
        'Egypt Lake',
        'Northdale edges',
      ],
      housingTypes:
        'Suburban SFH, townhomes, HOA communities, multi-family along Veterans / Dale Mabry corridors',
      challenges: [
        'Veterans Expressway / Dale Mabry congestion',
        'HOA rules in planned pockets',
        'Long carries in large communities',
        'Cross-zone pairs to downtown or eastern suburbs',
      ],
      moverTips:
        'Collect HOA packets for gated or managed communities. Price portal-to-portal time for northwest ↔ downtown pairs honestly. Mid-week mornings reduce Veterans peaks.',
      cityKeywords: [
        'carrollwood',
        'citrus park',
        'westchase',
        'town n country',
        'northdale',
        'egypt lake',
      ],
    },
    {
      id: 'eastern-growth',
      name: 'Eastern growth: Brandon, Riverview, Valrico & FishHawk edges',
      shortName: 'Eastern Growth',
      neighborhoods: [
        'Brandon',
        'Riverview',
        'Valrico',
        'Seffner',
        'FishHawk / Lithia edges',
        'Bloomingdale',
      ],
      housingTypes:
        'Newer SFH tracts, townhomes, HOA villages, multi-family along Causeway / US-301 corridors',
      challenges: [
        'I-75 / I-4 / Crosstown approach congestion',
        'HOA COI and gate lists in newer villages',
        'High summer Saturday demand',
        'Long empty-mile time from Tampa core staging',
      ],
      moverTips:
        'Treat eastern growth as HOA-first suburban work. Book June–August Saturdays early. Confirm community truck access the week of the move. Start early in heat.',
      cityKeywords: [
        'brandon',
        'riverview',
        'valrico',
        'seffner',
        'lithia',
        'fishhawk',
        'bloomingdale',
      ],
    },
    {
      id: 'new-tampa-north',
      name: 'New Tampa & northern Hillsborough',
      shortName: 'New Tampa',
      neighborhoods: [
        'New Tampa',
        'University area',
        'Lutz edges (Hillsborough side)',
        'Wesley Chapel approach (note: Pasco County border)',
        'Pebble Creek edges',
      ],
      housingTypes:
        'Master-planned SFH, townhomes, multi-family near USF and Bruce B. Downs corridors',
      challenges: [
        'I-275 / I-75 / Bruce B. Downs peaks',
        'HOA density in planned communities',
        'Confusion near Pasco County line addresses',
        'Student-calendar multi-family turnover near USF',
      ],
      moverTips:
        'Clarify Hillsborough vs Pasco destinations near the northern line. Collect HOA packets for New Tampa villages. Avoid peak student move-in weekends when flexible near University apartments.',
      cityKeywords: [
        'new tampa',
        'lutz',
        'university',
        'usf',
        'pebble creek',
      ],
    },
    {
      id: 'south-county',
      name: 'South County: Apollo Beach, Ruskin, Sun City Center & edges',
      shortName: 'South County',
      neighborhoods: [
        'Apollo Beach',
        'Ruskin',
        'Sun City Center',
        'Gibsonton',
        'Wimauma edges',
        'Riverview south edges',
      ],
      housingTypes:
        'Newer waterfront and suburban SFH, age-restricted communities, multi-family, growth tracts',
      challenges: [
        'Long I-75 legs to Tampa core',
        'HOA and 55+ community move windows',
        'Heat and storm exposure on open sites',
        'Industrial / port spill traffic on some approaches',
      ],
      moverTips:
        'Confirm whether core ↔ South County pairs still use a pure local rate card. Get age-restricted community rules in writing. Build I-75 buffer for peak commute windows.',
      cityKeywords: [
        'apollo beach',
        'ruskin',
        'sun city center',
        'gibsonton',
        'wimauma',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Hillsborough moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Core elevator soft costs and growth-corridor portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Downtown elevator, COI & dock soft costs',
        detail:
          'Building packets, elevator reservations, and certificate admin add time before loading starts on core towers.',
      },
      {
        title: 'Growth-corridor congestion (I-75 / I-4 / Veterans)',
        detail:
          'Portal-to-portal billing tracks expressway peaks. Downtown ↔ Riverview or Brandon ↔ Westchase can burn 45–90+ minutes each way at rush.',
      },
      {
        title: 'HOA and planned-community rules',
        detail:
          'Gate lists, COI, and weekday-only windows in eastern and New Tampa villages push demand into peak pricing.',
      },
      {
        title: 'Older South Tampa access & long carries',
        detail:
          'Tight grids, stairs, and limited driveway depth raise labor hours vs new cul-de-sac product.',
      },
      {
        title: 'Cross-bay and multi-county patterns',
        detail:
          'Hillsborough ↔ Pinellas or Pasco stops need honest bridge and distance assumptions in the written estimate.',
      },
      {
        title: 'Summer heat and storm delays',
        detail:
          'Heat-safe pacing and weather holds can extend job hours on open suburban streets and docks.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,250+',
        note: 'Higher with elevators, docks, or peak traffic',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,500–$4,000+',
        note: 'HOA soft costs and older-grid carries trend up',
      },
      {
        label: '3–4+ BR / core tower / cross-zone',
        value: '$2,600–$7,500+',
        note: 'Downtown towers and long growth-corridor pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$185+/hr',
        note: 'Portal-to-portal; packing and larger crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Hillsborough move',
    intro:
      'School calendars, USF turnover, summer heat, and hurricane season all reshape access and crew availability.',
    items: [
      {
        title: 'Best truck windows: mid-week mornings',
        detail:
          'Tuesday–Thursday before 9 a.m. usually clear curb space and reduce I-4 / I-75 / Veterans pain. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Peak family season: May–August',
        detail:
          'Eastern growth suburbs and family SFH moves fill Saturday calendars. Book 2–4 weeks ahead for popular windows.',
      },
      {
        title: 'University-area turnover',
        detail:
          'USF-adjacent multi-family can spike around semester starts. Avoid peak student weekends when flexible.',
      },
      {
        title: 'Hurricane season: June–November',
        detail:
          'Bay-edge and low-elevation parcels need weather contingency. Confirm reschedule policies before deposits.',
      },
      {
        title: 'Summer heat & afternoon storms',
        detail:
          'Prefer early starts; plan tarps and dry staging when storms are forecast. Heat slows open carries on new-construction streets.',
      },
    ],
  },
  specialized: [
    {
      id: 'tampa-core-vertical',
      title: 'Tampa core vertical & bay-edge access module',
      intro:
        'Downtown, Channelside, and bay-peninsula jobs fail on docks, bridges, and street width more often than on packing skill.',
      bullets: [
        'Request building move packets (COI, elevator hours, dock rules) at lease signing or escrow.',
        'Share dock and street photos for Harbour Island, Davis Islands, and downtown towers.',
        'Reserve freight elevators in writing and reconfirm the day before.',
        'Build buffer for downtown events and bridge access windows.',
        'Discuss valuation for higher-value South Tampa inventories early.',
      ],
    },
    {
      id: 'growth-corridor-hoa',
      title: 'Eastern & northern growth corridor HOA module',
      intro:
        'Brandon, Riverview, New Tampa, and South County volume is often HOA logistics plus expressway distance — not urban elevators.',
      bullets: [
        'Collect HOA COI, gate lists, and approved hours before the survey is final.',
        'Price portal-to-portal time honestly for any pair that rides I-75, I-4, or long arterial legs.',
        'Prefer early summer starts for heat on open suburban streets.',
        'Clarify Pasco or Pinellas border addresses so drive-time and licensing assumptions stay accurate.',
        'Book peak June–August Saturdays early — growth corridors fill first.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Hillsborough County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, urban vs growth-suburb lifestyle — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        intro:
          'Hillsborough County Public Schools serves most public K–12 students. Magnets, choice, and boundary options vary by address.',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Public K–12 is largely under Hillsborough County Public Schools, with magnets and choice programs layered on. Confirm zoning for any property — neighborhood marketing names do not guarantee school assignment.',
          },
          {
            title: 'Growth areas and capacity',
            detail:
              'Eastern and southern growth corridors can see enrollment pressure as new tracts open. Ask districts about capacity and busing when touring.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Florida Department of Education data, and independent comparison sites help — validate with campus visits.',
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
              'Tampa General Hospital, Moffitt Cancer Center, AdventHealth Tampa, and other regional campuses anchor specialized and acute care. Confirm networks and specialties for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from growth suburbs to preferred facilities — I-75 and I-4 congestion changes “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Urban vs growth stock',
            detail:
              'Expect denser multi-unit and older SFH near Tampa core and South Tampa; larger newer tracts dominate Brandon, Riverview, New Tampa, and South County.',
          },
          {
            title: 'Insurance and flood',
            detail:
              'Bay-edge and flood-mapped parcels can carry higher insurance costs. Check FEMA maps and insurance quotes before finalizing a budget.',
          },
          {
            title: 'HOA prevalence',
            detail:
              'Newer eastern and northern communities often include dues and architectural rules. Read association documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Hillsborough areas fit whom',
        bullets: [
          {
            title: 'Urban and near-core lifestyle',
            detail:
              'Downtown, Channelside, Hyde Park, and South Tampa suit people prioritizing shorter urban access and amenities over new-tract square footage.',
          },
          {
            title: 'Family growth suburbs',
            detail:
              'Brandon, Riverview, Valrico, FishHawk edges, and New Tampa often appeal for newer homes and HOA amenities — with longer core commutes.',
          },
          {
            title: 'Quieter or age-oriented south',
            detail:
              'Sun City Center and some South County pockets attract retirees and quieter suburban living; verify community rules before closing.',
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
              'Healthcare, port and logistics, finance and professional services, education (including USF), tourism, and corporate offices shape local employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'Most households are car-dependent. I-4, I-75, and Veterans peaks are real. Test drive peak routes from growth suburbs before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Bay access without living on a peninsula-only grid',
            detail:
              'Hillsborough offers bay edges and river amenities while still including large inland suburban footprints — a different pattern than Pinellas beach towns.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, frequent afternoon storms, and hurricane season. Plan outdoor staging and storm readiness as part of move-in.',
          },
          {
            title: 'Growth pace',
            detail:
              'Eastern and southern corridors can feel construction-heavy. Visit at commute hours to understand traffic and noise before deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Hillsborough resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify mover registration before deposits.',
    items: [
      {
        label: 'Hillsborough County — official site',
        href: 'https://www.hillsboroughcounty.org/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'Hillsborough County Public Schools',
        href: 'https://www.hillsboroughschools.org/',
        external: true,
        note: 'Boundaries, choice & calendars',
      },
      {
        label: 'City of Tampa',
        href: 'https://www.tampa.gov/',
        external: true,
      },
      {
        label: 'City of Temple Terrace',
        href: 'https://www.templeterrace.com/',
        external: true,
      },
      {
        label: 'City of Plant City',
        href: 'https://www.plantcitygov.com/',
        external: true,
      },
      {
        label: 'FL511 — traffic conditions',
        href: 'https://fl511.com/',
        external: true,
        note: 'I-4, I-75, Veterans before load windows',
      },
      {
        label: 'FEMA Flood Map Service Center',
        href: 'https://msc.fema.gov/portal/home',
        external: true,
        note: 'Check parcel flood zones',
      },
      {
        label: 'FDACS — Florida household movers (Ch. 507)',
        href: 'https://www.fdacs.gov/',
        external: true,
        note: 'Intrastate mover registration & consumer resources',
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
        label: 'All Florida local mover guides',
        href: '/local-movers/florida',
      },
    ],
  },
  directoryHint:
    'Prefer crews with Tampa core dock/elevator experience for Channelside and downtown jobs; HOA fluency for Brandon, Riverview, and New Tampa. Cross-bay pairs need honest bridge timing. Verify FDACS for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
};
