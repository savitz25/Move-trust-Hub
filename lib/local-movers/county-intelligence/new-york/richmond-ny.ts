import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Richmond County (Staten Island), New York moving intelligence.
 * Differentiators: suburban borough density, bridge/ferry access constraints,
 * house-and-driveway patterns — not Manhattan freight towers, Brooklyn
 * brownstone walks, Queens co-op sprawl, or Bronx arterial multi-family mix.
 */
export const richmondCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'new-york',
  countySlug: 'richmond',
  hubTitle: 'Staten Island (Richmond County) Moving Intelligence Hub',
  eyebrow: 'Richmond · Suburban borough, bridge & ferry access, lower density',
  h1: 'Moving on Staten Island: Suburban Access, Bridge Routes, Homes & Ferry-Edge Guide',
  heroOpener:
    'Richmond County is Staten Island — New York City’s most suburban borough by feel and by truck logistics. Driveways, semi-detached homes, and lower-density streets replace Manhattan freight elevators and Brooklyn stoop carries as the default problem set. The catch is access: nearly every off-island pair depends on bridges (Verrazzano-Narrows, Goethals, Outerbridge Crossing, Bayonne) or ferry-adjacent planning, and “local” Staten Island-to-Brooklyn jobs can burn more portal time than map miles suggest. North Shore multi-family, mid-island residential tracts, and South Shore house corridors do not share the same curb reality. This hub is for people actually moving on Staten Island — not generic NYC tips recycled from tower COIs or brownstone walk-ups.',
  heroCredibility:
    'NYSDOT household goods for intrastate New York moves · FMCSA for interstate legs · Staten Island suburban access & bridge-route awareness · Curated directory listings',
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
    title: 'What makes moving on Staten Island different',
    intro:
      'These are Richmond County realities — suburban housing stock, bridge-dependent access, and lower density — not clone “fifth borough” copy of Manhattan or Brooklyn logistics.',
    bullets: [
      {
        title: 'Suburban density changes the default job',
        detail:
          'Single-family homes, semi-detached houses, driveways, and garages are far more common than in the other four boroughs. Stair carries inside multi-level homes still matter, but freight-elevator COI culture is not the island-wide default.',
      },
      {
        title: 'Bridge access is the off-island bottleneck',
        detail:
          'Verrazzano-Narrows to Brooklyn, Goethals and Outerbridge Crossing toward New Jersey, and Bayonne Bridge routes decide outbound timing. Peak bridge congestion turns short regional pairs into long billable drives. Build buffer — never price SI ↔ Brooklyn as an ordinary “local” hop without traffic reality.',
      },
      {
        title: 'Ferry-edge and North Shore patterns differ from South Shore tracts',
        detail:
          'St. George, Tompkinsville, and North Shore multi-family/waterfront pockets behave more urban. Annadale, Great Kills, Tottenville, and other South Shore corridors feel more suburban house-and-driveway. Zone the estimate accordingly.',
      },
      {
        title: 'In-island distances still add up',
        detail:
          'North Shore ↔ South Shore pairs cross the island’s length with commercial corridors (Hylan Boulevard, Richmond Avenue, Victory Boulevard) and expressway peaks (Staten Island Expressway). Same-borough does not mean short.',
      },
      {
        title: 'HOA, condo, and townhouse pockets exist — but are not Manhattan towers',
        detail:
          'Some planned communities and multi-family buildings require Certificates of Insurance, reserved elevators, or gate lists. Collect packets early, but do not assume every SI address is a freight-dock problem.',
      },
      {
        title: 'New Jersey adjacency is routine',
        detail:
          'Many households move Staten Island ↔ New Jersey. Those legs are interstate for FMCSA purposes even when the drive feels local. Confirm authority before deposits.',
      },
      {
        title: 'Weather and hillside streets in some pockets',
        detail:
          'Certain North Shore and elevated streets add grades, tight turns, and winter ice risk. Photo approaches for hillside homes the way other boroughs photo walk-up stairs.',
      },
      {
        title: 'Intrastate NYSDOT rules vs interstate FMCSA authority',
        detail:
          'Moves entirely within New York State generally require NYSDOT household goods authority. Any New Jersey or farther leg needs active FMCSA USDOT (and usually MC) authority.',
      },
    ],
  },
  zonesHeading: 'Staten Island access zones',
  zonesIntro:
    'Plan by North Shore ferry-edge density, mid-island residential corridors, South Shore house tracts, and West Shore industrial-adjacent routes — bridge timing and housing type cluster by zone.',
  zones: [
    {
      id: 'north-shore',
      name: 'North Shore — St. George, New Brighton, Tompkinsville, ferry edge',
      shortName: 'North Shore',
      neighborhoods: [
        'St. George',
        'Tompkinsville',
        'New Brighton',
        'Stapleton',
        'Clifton',
        'West Brighton edges',
      ],
      housingTypes:
        'Multi-family, some elevators and mid-rises, older homes on grades, ferry-terminal-adjacent product',
      challenges: [
        'More urban curb and multi-family access than South Shore',
        'Hills and tighter residential streets in places',
        'Ferry terminal and civic-center congestion pockets',
        'Mixed walk-up and elevator buildings',
      ],
      moverTips:
        'Confirm elevator vs stair access. Photo hillside approaches and curb width. Prefer early starts near the ferry and civic core. Do not assume driveway staging on denser North Shore blocks.',
      cityKeywords: [
        'st george',
        'tompkinsville',
        'new brighton',
        'stapleton',
        'clifton',
        'staten island',
      ],
    },
    {
      id: 'mid-island',
      name: 'Mid-island — New Springville, Heartland Village, Willowbrook, Graniteville',
      shortName: 'Mid-Island',
      neighborhoods: [
        'New Springville',
        'Heartland Village',
        'Willowbrook',
        'Graniteville',
        'Bulls Head',
        'Castleton Corners edges',
      ],
      housingTypes:
        'SFH tracts, townhomes, condos, garden apartments, commercial-corridor multi-family',
      challenges: [
        'Staten Island Expressway and Richmond Avenue congestion',
        'HOA/condo rules in planned pockets',
        'Longer in-island distances to North or South Shore',
        'Shopping-corridor traffic on weekends',
      ],
      moverTips:
        'Collect HOA or condo packets when applicable. Price mid-island ↔ shore pairs with expressway buffer. Prefer mid-week mornings for commercial-corridor edges. Confirm driveway vs street-only access.',
      cityKeywords: [
        'new springville',
        'heartland village',
        'willowbrook',
        'graniteville',
        'bulls head',
        'staten island',
      ],
    },
    {
      id: 'south-shore',
      name: 'South Shore — Great Kills, Annadale, Eltingville, Tottenville',
      shortName: 'South Shore',
      neighborhoods: [
        'Great Kills',
        'Annadale',
        'Eltingville',
        'Tottenville',
        'Huguenot',
        'Prince\'s Bay',
        'Richmond Valley edges',
      ],
      housingTypes:
        'Predominantly SFH and semi-detached, some townhomes, lower multi-family density',
      challenges: [
        'Longer portal time to North Shore and Verrazzano approaches',
        'Family-volume inventories on multi-level homes',
        'Hylan Boulevard weekend congestion',
        'Weather exposure on more open residential streets',
      ],
      moverTips:
        'Survey multi-level homes for stair and driveway constraints. Book summer Saturdays early. Build real drive time to bridge approaches. Discuss packing for larger household inventories common in house stock.',
      cityKeywords: [
        'great kills',
        'annadale',
        'eltingville',
        'tottenville',
        'huguenot',
        'princes bay',
        'staten island',
      ],
    },
    {
      id: 'east-shore-verrazzano',
      name: 'East Shore & Verrazzano approaches — Fort Wadsworth, South Beach, Dongan Hills',
      shortName: 'East Shore / VZ',
      neighborhoods: [
        'Fort Wadsworth edges',
        'South Beach',
        'Dongan Hills',
        'Grasmere',
        'Old Town',
        'Arrochar',
        'Concord edges',
      ],
      housingTypes:
        'SFH, semi-detached, multi-family near commercial strips, some waterfront-adjacent product',
      challenges: [
        'Verrazzano-Narrows approach congestion for Brooklyn pairs',
        'Beach and boardwalk event traffic in season',
        'Mixed house and multi-family access',
        'Bridge toll and timing assumptions on estimates',
      ],
      moverTips:
        'Price SI ↔ Brooklyn pairs with Verrazzano peak reality. Prefer mid-week morning bridge crossings. Confirm truck staging near beach corridors on summer weekends. Clarify toll handling in the written estimate.',
      cityKeywords: [
        'south beach',
        'dongan hills',
        'grasmere',
        'arrochar',
        'old town',
        'fort wadsworth',
        'staten island',
      ],
    },
    {
      id: 'west-shore',
      name: 'West Shore — industrial-adjacent, Travis, Chelsea, Bloomfield edges',
      shortName: 'West Shore',
      neighborhoods: [
        'Travis',
        'Chelsea (SI)',
        'Bloomfield',
        'Rossville edges',
        'West Shore Expressway corridor',
        'Outerbridge / Goethals approach edges',
      ],
      housingTypes:
        'SFH and newer residential pockets, mixed industrial-adjacent streets, some townhome product',
      challenges: [
        'Industrial and commercial truck traffic',
        'Goethals / Outerbridge congestion for NJ pairs',
        'Longer empty-mile time from North Shore staging',
        'Variable residential street maturity in growth pockets',
      ],
      moverTips:
        'Build NJ bridge buffer for interstate pairs. Confirm FMCSA when crossing into New Jersey. Photo truck access on industrial-adjacent residential streets. Prefer early starts away from commercial peaks.',
      cityKeywords: [
        'travis',
        'bloomfield',
        'rossville',
        'chelsea staten island',
        'west shore',
        'staten island',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Staten Island moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. House volume, bridge portal time, and in-island distance separate cheap estimates from real bills — a different cost story than Manhattan elevator soft costs.',
    drivers: [
      {
        title: 'Bridge portal time & tolls',
        detail:
          'Verrazzano, Goethals, Outerbridge, and Bayonne crossings inflate portal-to-portal hours and add toll line items on off-island pairs.',
      },
      {
        title: 'Suburban multi-level home volume',
        detail:
          'SFH and semi-detached inventories often exceed studio/1BR urban averages — more packing scope and stair labor inside the house.',
      },
      {
        title: 'North Shore multi-family & hillside access',
        detail:
          'Denser northern pockets reintroduce curb scarcity, stairs, and grades more like other boroughs than South Shore driveways.',
      },
      {
        title: 'In-island North–South distance',
        detail:
          'Same-borough pairs across the island still need honest drive-time assumptions along expressways and commercial boulevards.',
      },
      {
        title: 'HOA / condo soft costs in planned pockets',
        detail:
          'Where communities require COI, elevators, or gate lists, admin and wait time return — but unevenly across the island.',
      },
      {
        title: 'Interstate NJ adjacency',
        detail:
          'Staten Island ↔ New Jersey jobs need FMCSA authority and interstate estimating discipline even when the drive feels local.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR or small multi-family',
        value: '$550–$1,900+',
        note: 'Higher with stairs, limited curb, or peak bridge legs',
      },
      {
        label: '2–3BR home or larger multi-family',
        value: '$1,400–$4,200+',
        note: 'House volume and driveway access vary widely',
      },
      {
        label: '3–4+ BR SFH / cross-island / bridge-heavy pairs',
        value: '$2,400–$7,500+',
        note: 'Large homes and Verrazzano/NJ bridge jobs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$125–$200+/hr',
        note: 'Portal-to-portal; packing and larger crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Staten Island move',
    intro:
      'Family summer demand, bridge peaks, beach corridors, and winter weather on exposed residential streets all reshape crew availability and drive time.',
    items: [
      {
        title: 'Best truck windows: mid-week mornings',
        detail:
          'Tuesday–Thursday before 9 a.m. usually improve bridge crossings and commercial-boulevard traffic. Avoid peak Friday evening bridge rushes when flexible.',
      },
      {
        title: 'Peak family season: May–August',
        detail:
          'South Shore and mid-island SFH moves fill Saturday calendars. Book 2–4 weeks ahead for popular windows.',
      },
      {
        title: 'Beach and boardwalk summer traffic',
        detail:
          'East Shore corridors can clog on hot weekends. Prefer mid-week residential starts in season.',
      },
      {
        title: 'Holiday bridge peaks',
        detail:
          'Holiday weekends spike Verrazzano and NJ bridge traffic. Build extra portal buffer or shift days when leases allow.',
      },
      {
        title: 'Winter weather on grades',
        detail:
          'Snow and ice slow hillside North Shore streets and open driveway carries. Confirm path clearing at both ends.',
      },
    ],
  },
  specialized: [
    {
      id: 'si-suburban-home',
      title: 'Staten Island suburban home module',
      intro:
        'House and semi-detached jobs dominate much of the island — driveway surveys, multi-level stairs, and larger inventories replace freight-elevator packets as the default checklist.',
      bullets: [
        'Photo driveways, garage height, and street turns before the estimate is final.',
        'Survey multi-level homes for internal stair labor and bulk-item paths.',
        'Discuss packing scope for larger household inventories common in SFH stock.',
        'Confirm HOA or condo rules only where the address actually has them — do not assume tower packets.',
        'Book peak summer Saturdays early on South Shore and mid-island corridors.',
      ],
    },
    {
      id: 'si-bridge-ferry-access',
      title: 'Bridge, ferry-edge & off-island access module',
      intro:
        'Off-island Staten Island moves live or die on bridge timing; North Shore ferry-edge jobs add a denser curb pattern than the rest of the borough.',
      bullets: [
        'Price Verrazzano pairs to Brooklyn with peak congestion buffer — not map miles alone.',
        'Treat Goethals, Outerbridge, and Bayonne legs as interstate when entering New Jersey; confirm FMCSA.',
        'Clarify toll handling in the written estimate.',
        'For North Shore multi-family, photo curb and hillside access like an urban job.',
        'Prefer mid-week morning bridge crossings when lease dates allow.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Staten Island (Richmond County)?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, suburban character, and bridge-dependent commutes — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        intro:
          'Public K–12 on Staten Island is part of New York City Public Schools with address-based zoning across North Shore, mid-island, and South Shore communities.',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Confirm your address zone through NYC Public Schools tools. Neighborhood names do not guarantee a specific campus assignment.',
          },
          {
            title: 'Geographic spread',
            detail:
              'Island length means school and activity driving can be significant between shores. Factor student travel time into housing choices.',
          },
          {
            title: 'Research sources',
            detail:
              'Official NYC Public Schools resources and campus visits beat ranking screenshots alone.',
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
              'Northwell Staten Island University Hospital campuses, Richmond University Medical Center, and other regional providers serve the island. Confirm networks and specialties for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map drive times from South Shore vs North Shore addresses — island geography matters. Transfer records early and verify in-network status.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Most suburban of the five boroughs',
            detail:
              'Expect more SFH, semi-detached, and driveway living than elsewhere in NYC, with denser multi-family concentrated more on the North Shore.',
          },
          {
            title: 'Cost variation',
            detail:
              'Purchase prices and rents vary by shore and neighborhood, generally with different bands than Manhattan or brownstone Brooklyn cores. Budget for property taxes, insurance, and car dependence.',
          },
          {
            title: 'HOA and condo pockets',
            detail:
              'Some planned communities control move rules and truck access. Read documents carefully where applicable.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Staten Island areas fit whom',
        bullets: [
          {
            title: 'North Shore / ferry-edge lifestyle',
            detail:
              'St. George and nearby areas often appeal for denser, more transit- and ferry-oriented living — with multi-family move complexity and hills in places.',
          },
          {
            title: 'Mid-island practicality',
            detail:
              'Central residential and commercial corridors can balance space and island access — with expressway and boulevard traffic as daily inputs.',
          },
          {
            title: 'South Shore house pattern',
            detail:
              'Great Kills, Annadale, Tottenville, and similar corridors often appeal for house-scale living — with longer bridge access times to the rest of NYC.',
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
              'Healthcare, education, retail, public sector, local services, and commutes to Manhattan, Brooklyn, or New Jersey shape many households.',
          },
          {
            title: 'Commute realism',
            detail:
              'Express bus, ferry, and car/bridge commutes are common; pure subway coverage is not like the other boroughs. Test peak bridge and ferry routes before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Suburban city living',
            detail:
              'Staten Island offers more yard and driveway norms inside NYC limits, with tradeoffs in off-island travel time and car dependence for many trips.',
          },
          {
            title: 'Parks and waterfront',
            detail:
              'Greenbelt, beaches, and waterfront edges distribute outdoor amenities across the island. Visit candidate neighborhoods on weekdays and weekends.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, cold winters, coastal wind on exposed shores. Plan weather contingency for driveway and open-street move staging.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Staten Island (Richmond County) resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify mover authority before deposits.',
    items: [
      {
        label: 'NYC 311 — city services & parking info',
        href: 'https://portal.311.nyc.gov/',
        external: true,
        note: 'Street cleaning, parking, and city service questions',
      },
      {
        label: 'NYC Department of Transportation',
        href: 'https://www.nyc.gov/html/dot/html/home/home.shtml',
        external: true,
      },
      {
        label: 'NYC Public Schools',
        href: 'https://www.schools.nyc.gov/',
        external: true,
        note: 'Zones, calendars, and enrollment',
      },
      {
        label: 'MTA — Staten Island Ferry',
        href: 'https://www.siferry.com/',
        external: true,
        note: 'Ferry service context (passenger); vehicle moves use bridges',
      },
      {
        label: 'NYSDOT — Moving (consumer guidance)',
        href: 'https://www.dot.ny.gov/divisions/operating/osss/truck/moving',
        external: true,
        note: 'Intrastate New York household goods guidance',
      },
      {
        label: 'NYSDOT — Registration & licensing',
        href: 'https://www.dot.ny.gov/divisions/operating/osss/truck/registration-licensing',
        external: true,
      },
      {
        label: 'FMCSA SAFER — interstate authority',
        href: 'https://safer.fmcsa.dot.gov/',
        external: true,
        note: 'Required when the move crosses state lines (including NJ)',
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
        label: 'All New York local mover guides',
        href: '/local-movers/new-york',
      },
    ],
  },
  directoryHint:
    'Prefer crews with suburban SFH and driveway experience for South Shore and mid-island homes; North Shore multi-family and hillside fluency near the ferry edge; honest Verrazzano and NJ bridge timing for off-island pairs. Verify NYSDOT household goods authority for in-state moves and FMCSA for interstate legs (including New Jersey).',
  lastReviewed: '2026-07-23',
};
