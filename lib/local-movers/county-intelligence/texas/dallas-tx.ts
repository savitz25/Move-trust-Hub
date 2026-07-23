import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Dallas County, Texas moving intelligence.
 * Differentiators: urban core + northern suburbs, corporate towers, freeway grid —
 * not Houston bayou sprawl, Fort Worth industrial west, or Austin tech density alone.
 */
export const dallasCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'texas',
  countySlug: 'dallas',
  hubTitle: 'Dallas County Moving Intelligence Hub',
  eyebrow: 'Dallas · urban core, Uptown & northern corporate suburbs',
  h1: 'Moving in Dallas County: Urban Core, Freeway Grid & Northern Suburb Guide',
  heroOpener:
    'Dallas County is a freeway-grid metro: downtown and Uptown vertical living on one side, dense northern suburbs and corporate campuses on another, and older east/south neighborhoods with different street widths and inventory profiles. A Victory Park high-rise, an East Dallas craftsman, a Richardson condo, and a Mesquite ranch do not share truck access or portal time. I-35E, I-635 (LBJ), US-75, I-30, and the Dallas North Tollway turn short map miles into long load windows at peak. This hub is for people actually moving in Dallas County — not generic DFW tips that erase Fort Worth or Collin growth patterns.',
  heroCredibility:
    'TxDMV household goods for intrastate Texas moves · FMCSA for interstate legs · Dallas core vs northern suburb contrast · Curated directory listings',
  majorCorridors: 'I-35E · I-30 · I-635 · Dallas North Tollway · PGBT',
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
    title: 'What makes moving in Dallas County different',
    intro:
      'These are Dallas County realities — vertical corporate core plus northern suburb HOAs under one county name — not interchangeable “DFW” boilerplate.',
    bullets: [
      {
        title: 'Urban core and northern suburbs are different jobs',
        detail:
          'Downtown, Uptown, and Knox/Henderson towers need COI and elevators. Richardson, Addison, Carrollton, and Garland flip to multi-family and SFH with HOA rules and LBJ / Tollway congestion.',
      },
      {
        title: 'Freeway grid dominates portal-to-portal time',
        detail:
          'I-35E, I-635, US-75, I-30, and the Dallas North Tollway define whether a “local” move finishes on schedule. Peak corporate commute windows punish mid-afternoon load-outs.',
      },
      {
        title: 'Corporate and finance relocation density',
        detail:
          'Uptown, downtown, and northern corporate corridors generate mid-month executive and apartment-to-apartment moves that compete with weekend family demand.',
      },
      {
        title: 'High-rise product is concentrated, not county-wide',
        detail:
          'Vertical living clusters in downtown, Uptown, Victory, and select mid-rise corridors. Treating every Dallas address like a tower job overprices suburbs; ignoring elevator rules underprices core moves.',
      },
      {
        title: 'East and south Dallas stock differs from north',
        detail:
          'Older street grids, varied driveway depth, and mixed multi-family change labor hours versus master-planned northern product. Inventory surveys matter more than zip codes alone.',
      },
      {
        title: 'Cross-county DFW pairs are routine',
        detail:
          'Households regularly move Dallas ↔ Collin, Tarrant, Denton, or Rockwall. Clarify county lines so drive time and TxDMV/FMCSA assumptions stay accurate.',
      },
      {
        title: 'Heat and summer storm cells affect open staging',
        detail:
          'North Texas heat and afternoon storms slow exterior carries. Early starts outperform noon suburban load-outs in peak summer.',
      },
      {
        title: 'Intrastate Texas rules vs interstate authority',
        detail:
          'Moves entirely within Texas are generally subject to TxDMV household-goods motor-carrier frameworks. Interstate legs need active FMCSA USDOT (and usually MC) authority.',
      },
    ],
  },
  zonesHeading: 'Dallas access zones',
  zonesIntro:
    'Plan by downtown/Uptown vertical, central/east neighborhoods, northern corporate suburbs, far-east cities, southern corridors, and northwest multi-family belts — each has its own access and freeway profile.',
  zones: [
    {
      id: 'dallas-core-uptown',
      name: 'Dallas core: Downtown, Uptown & Victory',
      shortName: 'Core / Uptown',
      neighborhoods: [
        'Downtown Dallas',
        'Uptown',
        'Victory Park',
        'Arts District edges',
        'West End edges',
        'Design District edges',
      ],
      housingTypes:
        'High-rises and mid-rises, urban condos, luxury multi-family, some loft product',
      challenges: [
        'Elevator/COI and loading-dock reservations',
        'Event and arena traffic near Victory / downtown',
        'Limited curb staging',
        'Garage height and truck route constraints',
      ],
      moverTips:
        'Get building packets early. Prefer mid-week morning freight windows. Avoid major event days when flexible. Share dock photos and truck height limits.',
      cityKeywords: [
        'dallas',
        'uptown',
        'downtown dallas',
        'victory park',
        'arts district',
      ],
    },
    {
      id: 'central-east',
      name: 'Central & East Dallas: Lakewood, Lower Greenville & M Streets',
      shortName: 'Central / East',
      neighborhoods: [
        'East Dallas',
        'Lakewood',
        'Lower Greenville',
        'M Streets',
        'Lake Highlands edges',
        'Knox / Henderson edges',
      ],
      housingTypes:
        'Older SFH and craftsman stock, duplexes, townhomes, mid-rise multi-family',
      challenges: [
        'Narrow residential streets and limited truck length',
        'Street-park pressure near popular corridors',
        'Stairs and porch carries on older homes',
        'Mix of high-value contents and modest rentals',
      ],
      moverTips:
        'Photo street width and driveway depth. Prefer early starts near school and retail corridors. Discuss valuation when inventories include antiques or art.',
      cityKeywords: [
        'east dallas',
        'lakewood',
        'lower greenville',
        'lake highlands',
        'knox henderson',
      ],
    },
    {
      id: 'northern-corporate',
      name: 'Northern corporate: Richardson, Addison, Carrollton & Farmers Branch',
      shortName: 'Northern Suburbs',
      neighborhoods: [
        'Richardson',
        'Addison',
        'Carrollton',
        'Farmers Branch',
        'North Dallas',
        'Telecom Corridor edges',
      ],
      housingTypes:
        'Multi-family corridors, mid-rises, SFH tracts, townhomes, corporate-adjacent apartments',
      challenges: [
        'US-75 / LBJ / Tollway corporate congestion',
        'HOA and apartment move-in windows',
        'High weekday demand from office campuses',
        'Collin County border confusion on northern edges',
      ],
      moverTips:
        'Price Tollway and LBJ peaks honestly. Collect apartment and HOA packets. Mid-week mornings reduce corporate commute collisions.',
      cityKeywords: [
        'richardson',
        'addison',
        'carrollton',
        'farmers branch',
        'north dallas',
      ],
    },
    {
      id: 'far-east',
      name: 'Far east: Garland, Mesquite, Rowlett & Sunnyvale edges',
      shortName: 'Far East',
      neighborhoods: [
        'Garland',
        'Mesquite',
        'Rowlett',
        'Sunnyvale edges',
        'Balch Springs edges',
        'Sachse approach (note: border patterns)',
      ],
      housingTypes:
        'Suburban SFH, townhomes, multi-family along I-30 / I-635 corridors',
      challenges: [
        'I-30 / I-635 / President George Bush Turnpike peaks',
        'Long portal time to Uptown / downtown origins',
        'HOA rules in newer lake and tract communities',
        'County-line confusion with Rockwall / Collin edges',
      ],
      moverTips:
        'Treat far-east pairs to core as multi-freeway jobs. Confirm HOA gate lists. Book summer Saturdays early for family SFH demand.',
      cityKeywords: [
        'garland',
        'mesquite',
        'rowlett',
        'sunnyvale',
        'balch springs',
      ],
    },
    {
      id: 'southern-corridors',
      name: 'Southern corridors: Oak Cliff, Desoto, Lancaster & Cedar Hill edges',
      shortName: 'South Dallas Co.',
      neighborhoods: [
        'Oak Cliff',
        'Bishop Arts edges',
        'Desoto',
        'Lancaster',
        'Cedar Hill edges',
        'Duncanville edges',
      ],
      housingTypes:
        'Older urban SFH, renovated bungalows, suburban tracts, multi-family',
      challenges: [
        'I-35E / US-67 congestion patterns',
        'Varied street access in older Oak Cliff grids',
        'Long north-bound portal time to corporate north',
        'Heat exposure on open suburban streets',
      ],
      moverTips:
        'Photo older-grid access in Oak Cliff. Price south ↔ north corporate pairs with full freeway buffer. Prefer early starts in summer heat.',
      cityKeywords: [
        'oak cliff',
        'desoto',
        'lancaster',
        'cedar hill',
        'duncanville',
        'bishop arts',
      ],
    },
    {
      id: 'northwest-belt',
      name: 'Northwest belt: Irving, Coppell edges & DFW Airport approach',
      shortName: 'NW / Irving',
      neighborhoods: [
        'Irving',
        'Las Colinas',
        'Coppell edges (Dallas Co. patterns)',
        'Valley Ranch edges',
        'DFW Airport-adjacent multi-family',
      ],
      housingTypes:
        'Corporate multi-family, mid-rises, SFH, planned communities near airport and business parks',
      challenges: [
        'SH-114 / LBJ / airport traffic volatility',
        'Elevator product in Las Colinas mixed with SFH',
        'Tarrant County border pairs common',
        'Corporate lease-turn spikes mid-month',
      ],
      moverTips:
        'Build airport-corridor buffer. Get Las Colinas building packets early. Clarify Dallas vs Tarrant destinations near western edges.',
      cityKeywords: [
        'irving',
        'las colinas',
        'coppell',
        'valley ranch',
        'dfw',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Dallas moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Core elevator soft costs and freeway-grid portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Core elevator, COI & dock soft costs',
        detail:
          'Building packets, elevator reservations, and certificate admin add time before loading starts on downtown and Uptown towers.',
      },
      {
        title: 'Freeway-grid congestion (I-35E / LBJ / US-75 / Tollway)',
        detail:
          'Portal-to-portal billing tracks peak corporate commute windows. Core ↔ far-east or south ↔ north pairs can burn 40–80+ minutes each way.',
      },
      {
        title: 'Apartment and HOA move windows',
        detail:
          'Northern multi-family and HOA communities enforce approved hours and COI, pushing demand into premium slots.',
      },
      {
        title: 'Older central/east access & long carries',
        detail:
          'Tight grids, stairs, and limited driveway depth raise labor hours vs newer suburban product.',
      },
      {
        title: 'Cross-county DFW patterns',
        detail:
          'Dallas ↔ Collin, Tarrant, or Denton stops need honest distance assumptions in the written estimate.',
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
        value: '$480–$1,350+',
        note: 'Higher with elevators, docks, or peak freeway traffic',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,550–$4,100+',
        note: 'HOA/apartment soft costs and older-grid carries trend up',
      },
      {
        label: '3–4+ BR / core tower / cross-zone',
        value: '$2,700–$7,800+',
        note: 'Uptown towers and long north–south pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$185+/hr',
        note: 'Portal-to-portal; packing and larger crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Dallas move',
    intro:
      'Corporate lease cycles, school calendars, summer heat, and end-of-month apartment turnover all reshape access and crew availability.',
    items: [
      {
        title: 'Best truck windows: mid-week mornings',
        detail:
          'Tuesday–Thursday before 9 a.m. usually clear curb space and reduce LBJ / Tollway / US-75 pain. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Peak family season: May–August',
        detail:
          'Suburban SFH and northern multi-family moves fill Saturday calendars. Book 2–4 weeks ahead for popular windows.',
      },
      {
        title: 'Corporate and apartment turnover',
        detail:
          'Uptown, Las Colinas, and Telecom Corridor multi-family can spike mid-month and at quarter boundaries. Confirm building windows early.',
      },
      {
        title: 'State fair & major event weekends',
        detail:
          'Fair Park and downtown event days can choke core access. Build buffer or shift dates when flexible.',
      },
      {
        title: 'Summer heat & storm cells',
        detail:
          'Prefer early starts; plan tarps and dry staging when storms are forecast. Heat slows open carries on suburban streets.',
      },
    ],
  },
  specialized: [
    {
      id: 'dallas-core-vertical',
      title: 'Dallas core vertical & event-access module',
      intro:
        'Downtown, Uptown, and Victory jobs fail on docks, elevators, and event traffic more often than on packing skill.',
      bullets: [
        'Request building move packets (COI, elevator hours, dock rules) at lease signing or escrow.',
        'Share dock and garage height photos for high-rises.',
        'Reserve freight elevators in writing and reconfirm the day before.',
        'Build buffer for arena, concert, and downtown event days.',
        'Discuss valuation for higher-value Uptown inventories early.',
      ],
    },
    {
      id: 'northern-freeway-corporate',
      title: 'Northern freeway & corporate multi-family module',
      intro:
        'Richardson, Addison, Carrollton, and Irving volume is often apartment logistics plus LBJ / Tollway distance — not pure downtown elevators.',
      bullets: [
        'Collect apartment and HOA COI packets before the survey is final.',
        'Price portal-to-portal time honestly for any pair that rides US-75, LBJ, or the Tollway.',
        'Prefer early summer starts for heat on open suburban streets.',
        'Clarify Collin or Tarrant border addresses so drive-time assumptions stay accurate.',
        'Book peak June–August Saturdays early — northern corridors fill first.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Dallas County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, core vs suburb lifestyle — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        intro:
          'Multiple independent school districts serve Dallas County (Dallas ISD, Richardson, Garland, Mesquite, Coppell, and others). Assignment is address-based.',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Public K–12 is split across many ISDs. Confirm zoning for any property — neighborhood marketing names do not guarantee school assignment.',
          },
          {
            title: 'Choice and magnet options',
            detail:
              'Some districts offer magnets and choice programs layered on neighborhood schools. Verify application timelines when relocating mid-year.',
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
              'UT Southwestern, Baylor University Medical Center, Parkland, Texas Health resources, and other regional campuses anchor specialized and acute care. Confirm networks and specialties for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from far-east or southern suburbs to preferred facilities — freeway grid congestion changes “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core vs suburb stock',
            detail:
              'Expect dense multi-unit and luxury towers downtown/Uptown; older SFH in central/east corridors; larger suburban tracts and multi-family north and far east.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase and rent levels vary sharply by neighborhood. Budget for HOA dues in planned communities and parking fees in towers.',
          },
          {
            title: 'HOA and apartment rules',
            detail:
              'Northern multi-family and HOA tracts often include move-in fees and approved hours. Read documents carefully before closing or signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Dallas areas fit whom',
        bullets: [
          {
            title: 'Urban and near-core lifestyle',
            detail:
              'Downtown, Uptown, Knox/Henderson, and parts of East Dallas suit people prioritizing walkable amenities and shorter urban access.',
          },
          {
            title: 'Northern corporate suburbs',
            detail:
              'Richardson, Addison, Carrollton, and Farmers Branch often appeal for multi-family convenience and corporate campus proximity — with freeway commute tradeoffs.',
          },
          {
            title: 'Far-east and southern family patterns',
            detail:
              'Garland, Mesquite, Rowlett, Desoto, and similar corridors often attract SFH-focused households seeking more space; verify commute to northern job centers.',
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
              'Corporate headquarters, finance and professional services, healthcare, telecom/tech corridors, logistics, and airport-adjacent employment shape the local market.',
          },
          {
            title: 'Commute realism',
            detail:
              'Most households are car-dependent. LBJ, US-75, I-35E, and Tollway peaks are real. Test drive peak routes before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Grid metro with multiple hubs',
            detail:
              'Dallas County mixes a vertical corporate core with sprawling suburban belts — different from Houston’s bayou sprawl or Fort Worth’s western industrial character.',
          },
          {
            title: 'Climate',
            detail:
              'Hot summers, occasional severe storms, and mild winters. Plan outdoor staging and heat-safe move-in logistics.',
          },
          {
            title: 'Arts, sports, and events',
            detail:
              'Core event calendars can affect weekend access and noise near downtown venues — visit at commute and event hours when deciding on a tower.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Dallas resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify mover registration before deposits.',
    items: [
      {
        label: 'Dallas County — official site',
        href: 'https://www.dallascounty.org/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Dallas',
        href: 'https://dallascityhall.com/',
        external: true,
      },
      {
        label: 'Dallas ISD',
        href: 'https://www.dallasisd.org/',
        external: true,
        note: 'Boundaries & calendars (one of several ISDs)',
      },
      {
        label: 'Richardson ISD',
        href: 'https://www.risd.org/',
        external: true,
      },
      {
        label: 'Garland ISD',
        href: 'https://www.garlandisd.net/',
        external: true,
      },
      {
        label: 'DFW traffic — 511DFW',
        href: 'https://www.511dfw.org/',
        external: true,
        note: 'LBJ, US-75, Tollway before load windows',
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
    'Prefer crews with downtown/Uptown dock and elevator experience for core towers; freeway-grid fluency for Richardson, Addison, Irving, and far-east pairs. Cross-county DFW moves need honest LBJ / Tollway timing. Verify TxDMV for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
};
