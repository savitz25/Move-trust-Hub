import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Polk County moving intelligence.
 * Inland between Tampa and Orlando — suburban/rural mix, lakes, I-4 corridor.
 */
export const polkCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'florida',
  countySlug: 'polk',
  hubTitle: 'Polk County Inland Corridor Moving Intelligence Hub',
  eyebrow: 'Polk County · Central Florida inland · Tampa–Orlando middle guide',
  h1: 'Moving in Polk County: Lakeland–Winter Haven Suburbs, Lake Country & I-4 Inland Logistics',
  heroOpener:
    'Polk County sits inland between Tampa Bay and Orlando — Lakeland and Winter Haven suburban rings, Bartow and county-seat logistics, lake-country lots, citrus and phosphate heritage edges, and I-4 through-traffic that is not a coastal condo market. Crews often stage from Tampa or Orlando regions; “local” can still mean long empty miles across a large inland county. This guide is Polk-specific — not a renamed Miami high-rise page or a Tampa beach script.',
  heroCredibility:
    'Tampa–Orlando inland corridor · Suburban/rural mix · I-4 & lake-aware · FDACS Ch. 507 (intrastate) · FMCSA when interstate · Curated listings',
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
    title: 'What makes moving in Polk County different',
    intro:
      'Inland sprawl, dual-metro pull (Tampa vs Orlando labor), lake lots, and rural edges define estimates — not beach elevators or theme-park guest traffic alone.',
    bullets: [
      {
        title: 'Between two metros, not inside either core',
        detail:
          'Many households commute or shop toward Tampa or Orlando while living in Polk. Crews may stage from either side — ask where the truck starts and whether travel time is portal-to-portal.',
      },
      {
        title: 'I-4 is the spine and the bottleneck',
        detail:
          'Lakeland ↔ Orlando-edge and Plant City-edge ↔ Winter Haven pairs ride I-4 peaks. Freight and tourist through-traffic add delay risk that pure inland map miles understate.',
      },
      {
        title: 'Suburban growth vs agricultural edges',
        detail:
          'Newer HOA tracts around Lakeland and Winter Haven sit near larger-lot, citrus-adjacent, and rural driveway properties. One county name covers two access products.',
      },
      {
        title: 'Lake-country lots change the survey',
        detail:
          'Winter Haven chain-of-lakes and other waterfront parcels can mean docks, soft ground, elevation, and limited truck swing room — not identical to dry inland cul-de-sacs.',
      },
      {
        title: 'Retiree and value-driven inbound patterns',
        detail:
          'Relative affordability versus coastal metros draws retirees and families. Inventory often includes full SFH contents and workshop gear more than downtown studio stacks.',
      },
      {
        title: 'Phosphate, logistics & industrial-adjacent pockets',
        detail:
          'Industrial and logistics corridors influence some residential edges and mid-day freight traffic. Note plant-adjacent approaches when relevant.',
      },
      {
        title: 'Heat without coastal breeze assumptions',
        detail:
          'Inland summer heat is intense. Early-morning load windows and heat-safe packing matter as much as in coastal Florida — sometimes more on open rural lots.',
      },
      {
        title: 'Florida licensing: FDACS Ch. 507 vs FMCSA',
        detail:
          'Intrastate moves generally require FDACS registration under Chapter 507. Interstate jobs need FMCSA authority. Verify the legal name on the estimate against the correct registry.',
      },
    ],
  },
  zonesHeading: 'Polk County zones: Lakeland, Winter Haven, lakes & rural edges',
  zonesIntro:
    'Treat Lakeland suburbs, Winter Haven lake country, Bartow, and rural southern/eastern edges as different drive-time and access problems — not one generic “Central Florida local.”',
  zones: [
    {
      id: 'lakeland-metro',
      name: 'Lakeland metro & northwest Polk suburbs',
      shortName: 'Lakeland',
      neighborhoods: [
        'Lakeland',
        'South Lakeland',
        'North Lakeland',
        'Lakeland Highlands edge',
        'I-4 Lakeland corridors',
      ],
      housingTypes:
        'Suburban SFH, HOA villages, mid-century stock, apartments, some downtown multifamily',
      challenges: [
        'I-4 peak congestion on east–west pairs',
        'HOA COI and approved hours in newer tracts',
        'High family-inventory weekend demand',
        'Crews staging from Tampa or Orlando adding travel time',
      ],
      moverTips:
        'Ask where the crew stages and whether quotes are portal-to-portal. Send HOA packets early. Mid-week starts beat I-4 tourist and freight peaks.',
      cityKeywords: [
        'lakeland',
        'lakeland highlands',
        'south lakeland',
        'north lakeland',
      ],
    },
    {
      id: 'winter-haven-lakes',
      name: 'Winter Haven, chain of lakes & central Polk',
      shortName: 'Winter Haven / Lakes',
      neighborhoods: [
        'Winter Haven',
        'Chain of Lakes neighborhoods',
        'Cypress Gardens edge',
        'Central Polk lake communities',
        'US-17 corridors',
      ],
      housingTypes:
        'Lake-adjacent SFH, suburban tracts, retiree communities, multifamily near commercial strips',
      challenges: [
        'Lake-lot access, docks, and soft ground',
        'Cross-county hauls to Lakeland or Haines City at peak',
        'Mix of HOA and non-HOA rules',
        'Tourist traffic near attractions and lake events',
      ],
      moverTips:
        'Share lake-lot driveway and dock photos. Inventory stairs and long carries on waterfront homes. Clarify Winter Haven ↔ Lakeland as a true local with arterial timing.',
      cityKeywords: [
        'winter haven',
        'chain of lakes',
        'cypress gardens',
        'lake alfred',
      ],
    },
    {
      id: 'haines-davenport-ne',
      name: 'Haines City, Davenport & northeast I-4 growth',
      shortName: 'NE Polk / I-4',
      neighborhoods: [
        'Haines City',
        'Davenport',
        'ChampionsGate edge influence',
        'Northeast Polk growth tracts',
        'US-27 corridors',
      ],
      housingTypes:
        'Newer master-planned SFH, townhomes, resort-adjacent housing influence, growing HOA stock',
      challenges: [
        'Orlando-metro tourist traffic spillover on US-27 / I-4',
        'HOA rules in new villages',
        'Long hauls to southern Polk rural edges',
        'High inbound family volume on peak weekends',
      ],
      moverTips:
        'Book growth-corridor weekends early. Confirm HOA windows. Treat Davenport ↔ Bartow or southern rural pairs as long locals.',
      cityKeywords: [
        'haines city',
        'davenport',
        'championsgate',
        'northeast polk',
        'us-27',
      ],
    },
    {
      id: 'bartow-county-seat',
      name: 'Bartow, county seat & south-central Polk',
      shortName: 'Bartow / South-central',
      neighborhoods: [
        'Bartow',
        'South-central corridors',
        'County-government adjacent areas',
        'Smaller-city residential stock',
      ],
      housingTypes:
        'Small-city SFH, modest multifamily, larger-lot edges, working-community stock',
      challenges: [
        'Thinner same-day crew density than Lakeland',
        'Longer empty miles from Tampa/Orlando staging',
        'Heat on open lots',
        'Mix of paved and constrained older streets',
      ],
      moverTips:
        'Confirm explicit Bartow coverage and travel fees. Prefer written estimates with portal-to-portal language. Share driveway constraints on older lots.',
      cityKeywords: ['bartow', 'fort meade edge', 'south-central polk'],
    },
    {
      id: 'auburndale-polk-city',
      name: 'Auburndale, Polk City & mid-county connectors',
      shortName: 'Mid-county',
      neighborhoods: [
        'Auburndale',
        'Polk City',
        'Lake Alfred edge',
        'Mid-county suburban and lake pockets',
      ],
      housingTypes:
        'Suburban SFH, lake homes, manufactured-home communities, mixed lot sizes',
      challenges: [
        'Connector-road congestion between Lakeland and Winter Haven',
        'Variable driveway quality',
        'Cross-zone pairs that look short but hit school peaks',
        'Inconsistent HOA intensity by subdivision',
      ],
      moverTips:
        'Treat mid-county as its own timing problem — not automatically “close to Lakeland.” Confirm school-zone peak windows on arterial routes.',
      cityKeywords: [
        'auburndale',
        'polk city',
        'lake alfred',
        'mid polk',
      ],
    },
    {
      id: 'rural-south-east',
      name: 'Rural south & east Polk edges',
      shortName: 'Rural edges',
      neighborhoods: [
        'Frostproof edge',
        'Lake Wales area',
        'Eastern agricultural edges',
        'Southern rural Polk',
        'Larger-lot and ranch-style properties',
      ],
      housingTypes:
        'Rural SFH, agricultural-adjacent homes, larger lots, outbuildings, some small-town cores',
      challenges: [
        'Long empty miles and sparse services',
        'Unpaved or soft driveways',
        'Outbuildings and equipment inventories',
        'Heat and limited shade on open approaches',
      ],
      moverTips:
        'Price distance and access explicitly. Share road-width and driveway photos. Inventory sheds and workshops separately from household furniture.',
      cityKeywords: [
        'lake wales',
        'frostproof',
        'rural polk',
        'east polk',
        'south polk',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Polk County',
    intro:
      'Staging city, I-4 timing, lake access, and rural empty miles move quotes more than square footage alone.',
    drivers: [
      {
        title: 'Crew staging origin (Tampa vs Orlando vs in-county)',
        detail:
          'Travel time to the first address can dominate on “local” jobs when crews are regional. Demand portal-to-portal clarity.',
      },
      {
        title: 'I-4 and US-27 corridor delay risk',
        detail:
          'Through-traffic and tourist spillover add billable hours on northeast growth and Lakeland pairs.',
      },
      {
        title: 'Lake-lot labor premiums',
        detail:
          'Stairs, docks, soft ground, and limited swing room increase hours versus dry inland tracts.',
      },
      {
        title: 'Rural access & outbuildings',
        detail:
          'Long drives, unpaved approaches, and workshop inventories add time and vehicle risk.',
      },
      {
        title: 'HOA soft costs in growth tracts',
        detail:
          'Newer Lakeland / Davenport / Haines City villages restrict hours and require paperwork.',
      },
      {
        title: 'Inland heat windows',
        detail:
          'Summer heat can force early starts or multi-day splits on large SFH inventories.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$400–$950+',
        note: 'Higher with long regional staging travel or peak I-4 windows',
      },
      {
        label: '2–3BR house / suburban HOA',
        value: '$1,500–$3,500+',
        note: 'Cross-county and lake-lot access trend up',
      },
      {
        label: '3–4+ BR (rural edge / long corridor / lake)',
        value: '$2,000–$5,500+',
        note: 'Rural empty miles and waterfront stairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$95–$155+/hr',
        note: 'Portal-to-portal; packing and 3-person crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, corridor & heat intelligence',
    intro:
      'Polk peaks follow family summer moves, retiree transitions, I-4 tourist through-traffic, and inland heat — not beach snowbird towers alone.',
    items: [
      {
        title: 'Family summer weekends',
        detail:
          'Lakeland and growth-corridor SFH moves fill first. Book 2–3 weeks ahead for Saturdays.',
      },
      {
        title: 'Winter retiree & snowbird-adjacent demand',
        detail:
          'Some lake and planned communities see higher winter turnover even without beach density — elevators and preferred crews still tighten.',
      },
      {
        title: 'I-4 tourist through-peaks',
        detail:
          'Holiday and theme-park travel seasons worsen east–west timing even for pure Polk addresses near the corridor.',
      },
      {
        title: 'Hurricane season inland effects',
        detail:
          'Wind and rain still disrupt schedules; flooding risk is parcel-specific near lakes and low areas. Keep flexible language in contracts.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start',
        detail:
          'Beat heat and I-4 peaks. Still honor HOA weekday windows where required.',
      },
    ],
  },
  specialized: [
    {
      id: 'inland-corridor-dual-metro',
      title: 'I-4 inland corridor & dual-metro crew staging',
      intro:
        'Polk’s defining operational problem is often being between Tampa and Orlando labor markets on a congested spine.',
      bullets: [
        'Ask where the truck and crew stage and whether travel is included portal-to-portal.',
        'Price Lakeland ↔ Davenport / Haines City pairs with I-4 delay risk explicit.',
        'Confirm in-county coverage for Bartow and rural edges — do not assume Orlando or Tampa “local” rates automatically apply.',
        'Prefer early starts to avoid freight and tourist through-traffic on I-4 and US-27.',
        'Name both cities on the estimate; “Polk County local” alone is too vague.',
      ],
    },
    {
      id: 'lakes-rural-hoa',
      title: 'Lake-country access, rural lots & suburban HOA module',
      intro:
        'Waterfront Winter Haven-area homes and agricultural-edge properties are different products from new HOA tracts — survey them as such.',
      bullets: [
        'Share driveway, dock, and soft-ground photos for lake lots before booking.',
        'Inventory outbuildings and equipment separately on rural and ag-edge properties.',
        'Send HOA COI and approved-hour packets for Lakeland and northeast growth villages.',
        'Confirm truck length limits on constrained rural roads and older small-city streets.',
        'Plan heat-safe packing and early load windows on open inland lots in summer.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Polk County?',
    intro:
      'Lakeland suburban convenience, Winter Haven lakes, I-4 growth towns, and rural edges are different bets — pick commute direction (Tampa vs Orlando) first, then validate schools and insurance.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Polk County Public Schools covers the county with magnets, charters, and private options. Match every listing to the correct attendance zone.',
        bullets: [
          {
            title: 'Zone before city marketing',
            detail:
              'Use district boundary tools. Lakeland, Winter Haven, and Haines City brands span multiple feeders.',
          },
          {
            title: 'Growth-corridor capacity',
            detail:
              'Northeast I-4 growth can pressure enrollment — verify current capacity and construction plans.',
          },
          {
            title: 'Higher education presence',
            detail:
              'Florida Polytechnic University, Polk State College, and related campuses shape some rental and traffic patterns.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites and Florida DOE data should lead; third-party rankings are secondary.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'In-county acute care',
            detail:
              'Lakeland Regional and other regional campuses serve large parts of Polk. Map ER drive times from lake and rural edges — not only from Lakeland proper.',
          },
          {
            title: 'Specialty care spillover',
            detail:
              'Some specialties still pull residents toward Tampa or Orlando systems. Factor corridor drive times into healthcare planning.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer primary care early; winter and summer move peaks can delay first appointments.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing & cost of living',
        bullets: [
          {
            title: 'Relative inland affordability',
            detail:
              'Often more approachable than coastal Tampa Bay or Orlando tourism cores for comparable size — lake and new HOA product is its own ladder.',
          },
          {
            title: 'Stock variety',
            detail:
              'New master plans, mid-century SFH, lake homes, rural lots, and manufactured-home communities each change access and insurance profiles.',
          },
          {
            title: 'Insurance & heat utilities',
            detail:
              'Wind coverage and inland cooling costs are real monthly lines. Pull quotes before locking a contract.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town fit by lifestyle',
        bullets: [
          {
            title: 'Lakeland suburban',
            detail:
              'Jobs, shopping, and I-4 access with classic Central Florida suburban patterns.',
          },
          {
            title: 'Winter Haven lake country',
            detail:
              'Water recreation and smaller-city scale — waterfront access tradeoffs on some lots.',
          },
          {
            title: 'Northeast growth towns',
            detail:
              'Haines City / Davenport for newer housing and Orlando-direction orientation — tourist corridor traffic included.',
          },
          {
            title: 'Bartow & rural edges',
            detail:
              'Quieter small-city or ag-edge living — longer drives to metro amenities and specialty care.',
          },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute',
        bullets: [
          {
            title: 'Local anchors',
            detail:
              'Healthcare, education, logistics/distribution, retail, government, agriculture-related, and industrial employers are major themes.',
          },
          {
            title: 'Dual-metro commute reality',
            detail:
              'Many residents work toward Tampa Bay or Orlando. Test peak I-4 and arterial runs before choosing a pocket.',
          },
          {
            title: 'Hybrid & regional work',
            detail:
              'Hybrid schedules reduce daily corridor pain but still require realistic in-office day plans across long inland distances.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & climate',
        bullets: [
          {
            title: 'Inland Florida living',
            detail:
              'Lakes, parks, and lower coastal density for many households — summer heat is intense without a reliable sea breeze.',
          },
          {
            title: 'Between metros culture',
            detail:
              'Access to both Tampa Bay and Orlando amenities is a draw; weekend corridor traffic is the tradeoff.',
          },
          {
            title: 'Outdoor & lake recreation',
            detail:
              'Boating and lake sports are lifestyle anchors in central Polk — dock properties add move-day complexity.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Practical Polk County resources',
    intro:
      'Official links and licensing notes — HOA rules, road conditions, and FDACS registration change; verify before move day.',
    items: [
      {
        label: 'Polk County Board of County Commissioners',
        href: 'https://www.polk-county.net/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Lakeland',
        href: 'https://www.lakelandgov.net/',
        external: true,
      },
      {
        label: 'City of Winter Haven',
        href: 'https://www.mywinterhaven.com/',
        external: true,
      },
      {
        label: 'City of Bartow',
        href: 'https://www.cityofbartow.net/',
        external: true,
      },
      {
        label: 'City of Haines City',
        href: 'https://www.hainescity.com/',
        external: true,
      },
      {
        label: 'Polk County Public Schools',
        href: 'https://polkschoolsfl.com/',
        external: true,
      },
      {
        label: 'FDACS — Moving companies (Ch. 507)',
        href: 'https://www.fdacs.gov/Business-Services/Moving-Companies',
        note: 'Intrastate household mover registration',
        external: true,
      },
      {
        label: 'FDACS — Moving within Florida',
        href: 'https://www.fdacs.gov/Consumer-Resources/Consumer-Rights-and-Responsibilities/Moving-Within-Florida',
        external: true,
      },
      {
        label: 'FDACS business search',
        href: 'https://csapp.fdacs.gov/cspublicapp/businesssearch/businesssearch.aspx',
        external: true,
      },
      {
        label: 'FMCSA SAFER — interstate authority',
        href: 'https://safer.fmcsa.dot.gov/',
        note: 'Required when the move crosses state lines',
        external: true,
      },
      {
        label: 'National Hurricane Center',
        href: 'https://www.nhc.noaa.gov/',
        external: true,
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
    ],
  },
  directoryHint:
    'Filter by zone (Lakeland, Winter Haven/Lakes, NE Polk/I-4, Bartow, Mid-county, Rural edges). Confirm crew staging city, I-4 assumptions, and FDACS registration.',
  lastReviewed: '2026-07-23',
};
