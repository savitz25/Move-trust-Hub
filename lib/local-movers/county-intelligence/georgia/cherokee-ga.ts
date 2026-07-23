import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Cherokee County, Georgia moving intelligence.
 * Differentiators: north-metro growth, HOA suburbs, longer access, family moves —
 * not Fulton towers, Gwinnett I-85 diversity core, or Forsyth’s more affluent
 * Lake Lanier / GA-400 north pattern (adjacent but distinct).
 */
export const cherokeeCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'georgia',
  countySlug: 'cherokee',
  hubTitle: 'Cherokee County Moving Intelligence Hub',
  eyebrow: 'Cherokee · North-metro growth, HOAs & longer access',
  h1: 'Moving in Cherokee County: Woodstock Growth, HOA Access & Family Relocation Guide',
  heroOpener:
    'Cherokee County is north-metro Atlanta’s growth-and-distance market: Woodstock and Canton master plans, HOA gate lists, longer portal times from inside the Perimeter, and family SFH inventories that dominate summer calendars. A Woodstock townhome, a Canton two-story, a Holly Springs cul-de-sac, and a Waleska-edge home on a longer rural approach do not share driveway depth, HOA rules, or empty-mile risk. I-575, Bells Ferry, Hwy 92, and school-zone arterials rewrite “local” estimates that ignore how far Cherokee sits from intown staging. This hub is for people actually moving in Cherokee — not generic Atlanta tips recycled from Cumberland multi-family or Midtown elevators.',
  heroCredibility:
    'Georgia DPS / MCCD household goods for intrastate Georgia moves · FMCSA for interstate legs · North-metro HOA & long-access awareness · Curated directory listings',
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
    title: 'What makes moving in Cherokee County different',
    intro:
      'These are Cherokee realities — north-metro growth, HOA logistics, and longer access from the core — not interchangeable “north Atlanta suburb” boilerplate.',
    bullets: [
      {
        title: 'Distance from intown staging is a primary cost driver',
        detail:
          'Many crews stage inside the Perimeter or along I-75. Woodstock ↔ Atlanta-core or Canton ↔ Cumberland pairs burn real empty-mile and portal time even when both stops are “metro Atlanta.”',
      },
      {
        title: 'HOA master plans dominate family move volume',
        detail:
          'Woodstock, Holly Springs, Canton growth villages, and similar communities often require COI, gate lists, truck limits, and weekday windows. Collect rules before the survey is final.',
      },
      {
        title: 'I-575 is the spine — and the bottleneck',
        detail:
          'North–south pairs along I-575 and parallel arterials can look short on a map and long at peak. Price freeway and school-zone reality, not crow-flies miles.',
      },
      {
        title: 'New-construction access friction is common',
        detail:
          'Growth edges may have incomplete streets, mud, limited staging, and HOA rules that lag closings. Confirm road and gate conditions the week of the move.',
      },
      {
        title: 'Family multi-bedroom inventories are the default job',
        detail:
          'School-calendar SFH moves with garages, playrooms, and large kitchens dominate May–August. Packing help and Saturday supply constraints matter more than elevator logistics.',
      },
      {
        title: 'Rural-edge and longer driveway approaches still appear',
        detail:
          'Northern and western Cherokee pockets can add gravel approaches, septic-setback staging limits, and longer carries than pure master-plan cul-de-sacs.',
      },
      {
        title: 'Cross-county north-metro pairs are routine',
        detail:
          'Households regularly move Cherokee ↔ Cobb, Forsyth, Fulton, or Bartow. Clarify county lines so drive time and licensing assumptions stay accurate.',
      },
      {
        title: 'Intrastate Georgia rules vs interstate authority',
        detail:
          'Moves entirely within Georgia are generally subject to Georgia DPS Motor Carrier Compliance Division (MCCD) household-goods frameworks. Interstate legs need active FMCSA USDOT (and usually MC) authority.',
      },
    ],
  },
  zonesHeading: 'Cherokee access zones',
  zonesIntro:
    'Plan by Woodstock south-edge growth, Canton core, Holly Springs / Towne Lake patterns, north rural-edge, and west Cherokee — each has its own HOA density and distance profile.',
  zones: [
    {
      id: 'woodstock',
      name: 'Woodstock & south Cherokee growth',
      shortName: 'Woodstock',
      neighborhoods: [
        'Woodstock',
        'Towne Lake edges',
        'Downtown Woodstock edges',
        'Hwy 92 corridor',
        'Rope Mill edges',
        'South Cherokee multi-family',
      ],
      housingTypes:
        'Master-planned HOA SFH, townhomes, multi-family near retail nodes, some older tracts',
      challenges: [
        'HOA COI, gate lists, and truck limits',
        'I-575 / Hwy 92 congestion',
        'Peak Saturday family demand',
        'County-line confusion with Cobb near the south edge',
      ],
      moverTips:
        'Collect HOA packets early. Price I-575 peaks honestly. Clarify Cherokee vs Cobb addresses near Woodstock’s south edge. Book summer Saturdays 2–4 weeks ahead.',
      cityKeywords: [
        'woodstock',
        'towne lake',
        'rope mill',
        'hwy 92',
        'south cherokee',
      ],
    },
    {
      id: 'canton',
      name: 'Canton core & central Cherokee',
      shortName: 'Canton',
      neighborhoods: [
        'Canton',
        'Downtown Canton edges',
        'Riverstone corridor',
        'Hickory Flat edges',
        'Ball Ground edges',
        'Central Cherokee multi-family',
      ],
      housingTypes:
        'Suburban SFH, HOA villages, townhomes, multi-family, mix of older and newer product',
      challenges: [
        'I-575 and Riverstone arterial congestion',
        'HOA rules in newer villages mixed with older street grids',
        'Long empty-mile time from Perimeter staging',
        'School-zone timing on major corridors',
      ],
      moverTips:
        'Prefer mid-week morning starts for I-575 pairs. Confirm HOA vs non-HOA access. Share driveway and cul-de-sac photos for two-story SFH.',
      cityKeywords: [
        'canton',
        'riverstone',
        'hickory flat',
        'ball ground',
        'central cherokee',
      ],
    },
    {
      id: 'holly-springs',
      name: 'Holly Springs & mid-corridor communities',
      shortName: 'Holly Springs',
      neighborhoods: [
        'Holly Springs',
        'Sixes Road corridor',
        'Toonigh edges',
        'Midway edges',
        'Holly Springs multi-family',
      ],
      housingTypes:
        'Growth SFH, HOA master plans, townhomes, limited multi-family',
      challenges: [
        'Near-universal HOA admin in planned villages',
        'Arterial congestion between Woodstock and Canton',
        'New-construction staging',
        'Large family inventories',
      ],
      moverTips:
        'Treat Holly Springs as HOA-first family work. Confirm unfinished streets the week of greenfield moves. Prefer early summer starts for heat.',
      cityKeywords: [
        'holly springs',
        'sixes',
        'toonigh',
        'midway',
      ],
    },
    {
      id: 'north-cherokee',
      name: 'North Cherokee: Ball Ground, Waleska & rural-edge',
      shortName: 'North Cherokee',
      neighborhoods: [
        'Ball Ground',
        'Waleska',
        'Free Home edges',
        'Nelson edges',
        'North I-575 corridor',
        'Rural-edge parcels',
      ],
      housingTypes:
        'SFH on larger lots, some HOA pockets, rural-edge homes, limited multi-family',
      challenges: [
        'Longer driveway and approach carries',
        'Gravel or incomplete road staging on some parcels',
        'Long portal time from south-metro origins',
        'Limited turnaround for large trucks on rural roads',
      ],
      moverTips:
        'Photo full approach roads, turnarounds, and driveway grade. Discuss shuttle or smaller truck options when needed. Build generous travel buffer from intown origins.',
      cityKeywords: [
        'ball ground',
        'waleska',
        'free home',
        'nelson',
        'north cherokee',
      ],
    },
    {
      id: 'west-cherokee',
      name: 'West Cherokee toward Bartow edges',
      shortName: 'West Cherokee',
      neighborhoods: [
        'West Canton edges',
        'Hwy 20 corridor pockets',
        'Knox Bridge edges',
        'Bartow County line edges',
        'Lake Allatoona north-edge pockets',
      ],
      housingTypes:
        'Suburban and semi-rural SFH, some HOA villages, limited multi-family',
      challenges: [
        'Longer empty-mile time and sparse staging options',
        'County-line confusion with Bartow',
        'Lake-area weekend traffic on some corridors',
        'HOA rules mixed with non-HOA acreage homes',
      ],
      moverTips:
        'Clarify Cherokee vs Bartow addresses. Confirm truck access on lake-adjacent and acreage parcels. Prefer mid-week windows for cross-county pairs.',
      cityKeywords: [
        'knox bridge',
        'hwy 20',
        'lake allatoona',
        'west canton',
        'bartow',
      ],
    },
    {
      id: 'towne-lake-multifamily',
      name: 'Towne Lake, retail-node multi-family & townhomes',
      shortName: 'Towne Lake MF',
      neighborhoods: [
        'Towne Lake',
        'Woodstock Parkway edges',
        'Retail-node apartments',
        'Stacked townhome communities',
        'I-575 exit multi-family',
      ],
      housingTypes:
        'Townhomes, garden and mid-rise multi-family, amenity-heavy planned product',
      challenges: [
        'Elevator or stair-stack rules in multi-unit product',
        'HOA/management COI and move windows',
        'Parking court truck limits',
        'Weekend retail congestion',
      ],
      moverTips:
        'Get management packets early. Reserve elevators or freight windows in writing. Avoid peak retail Saturday afternoons when flexible.',
      cityKeywords: [
        'towne lake',
        'woodstock parkway',
        'apartments',
        'townhomes',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Cherokee moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Long access from the core, HOA soft costs, and family SFH volume separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Empty-mile and portal time from inside the Perimeter',
        detail:
          'Crews often travel farther than pure suburban markets. Portal-to-portal billing must include real I-575 / arterial peaks.',
      },
      {
        title: 'HOA gate lists, COI & approved hours',
        detail:
          'Master-planned communities across Woodstock, Holly Springs, and Canton add admin time and can force premium weekday slots.',
      },
      {
        title: 'Large family SFH inventories',
        detail:
          'Multi-bedroom two-stories and full garages raise labor hours vs studio multi-family.',
      },
      {
        title: 'New-construction access friction',
        detail:
          'Incomplete streets, mud, and limited staging on growth edges raise labor hours and delay risk.',
      },
      {
        title: 'Rural-edge approach constraints',
        detail:
          'Long drives, tight turnarounds, and grade issues on northern/western parcels add time and equipment choices.',
      },
      {
        title: 'Cross-county north-metro patterns',
        detail:
          'Cherokee ↔ Cobb, Forsyth, Fulton, or Bartow stops need honest distance assumptions in the written estimate.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$470–$1,350+',
        note: 'Higher with HOA windows, stairs, or long portal time from the core',
      },
      {
        label: '2–3BR townhome or modest SFH',
        value: '$1,550–$4,000+',
        note: 'HOA soft costs and family inventories trend up',
      },
      {
        label: '3–4+ BR / gated community / long-access pair',
        value: '$2,600–$7,500+',
        note: 'Large HOA homes and Perimeter-origin pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$185+/hr',
        note: 'Portal-to-portal; packing and larger crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Cherokee move',
    intro:
      'School calendars, new-home closings, summer heat, and weekend retail/lake traffic all reshape access and crew availability.',
    items: [
      {
        title: 'Best truck windows: mid-week mornings',
        detail:
          'Tuesday–Thursday before 9 a.m. usually clear curb space and reduce I-575 pain. Avoid month-end Fridays when leases and closings collide.',
      },
      {
        title: 'Peak family season: May–August',
        detail:
          'Woodstock, Holly Springs, and Canton SFH moves fill Saturday calendars first. Book 2–4 weeks ahead for popular HOA windows.',
      },
      {
        title: 'New-home closing clusters',
        detail:
          'Growth villages may see batches of closings that strain local crew supply. Book early when your builder closing date is firm.',
      },
      {
        title: 'School-year arterial peaks',
        detail:
          'Avoid drop-off and pick-up windows on major corridors when flexible — they collide with load start times.',
      },
      {
        title: 'Summer heat & afternoon storms',
        detail:
          'Prefer early starts for heat on open new-construction streets. Plan tarps and dry staging when storms are forecast.',
      },
    ],
  },
  specialized: [
    {
      id: 'north-metro-hoa-growth',
      title: 'North-metro HOA growth & family SFH module',
      intro:
        'Woodstock, Holly Springs, and Canton volume fails on gate lists, Saturday demand, and large inventories more often than on packing skill alone.',
      bullets: [
        'Collect HOA COI, gate lists, approved hours, and truck size limits before the survey is final.',
        'Photo driveway, gate, and cul-de-sac turnaround space.',
        'Book peak June–August Saturdays early — family HOA corridors fill first.',
        'Discuss packing help for multi-bedroom inventories early.',
        'Prefer early summer starts for heat on open streets.',
      ],
    },
    {
      id: 'long-access-i575',
      title: 'Long-access I-575 & rural-edge module',
      intro:
        'Cherokee’s distance from intown staging and its rural-edge parcels make travel time and approach logistics first-class estimate factors.',
      bullets: [
        'Price portal-to-portal and empty-mile time honestly for any Perimeter or Cobb origin.',
        'Confirm unfinished road and staging conditions the week of greenfield moves.',
        'Photo full approach roads and turnarounds on rural-edge parcels.',
        'Clarify Cobb, Forsyth, Fulton, or Bartow border addresses.',
        'Build buffer for I-575 peaks rather than assuming “north metro local” speed.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Cherokee County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, north-metro lifestyle — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        intro:
          'Cherokee County School District serves the county. Assignment is address-based.',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Confirm zoning for any property with district tools — master-plan marketing names do not guarantee a campus.',
          },
          {
            title: 'Growth areas and capacity',
            detail:
              'South and mid-corridor growth can see enrollment pressure as new tracts open. Ask about capacity, transfers, and busing when touring.',
          },
          {
            title: 'Research sources',
            detail:
              'Cherokee County School District boundary tools, Georgia Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'Northside Hospital Cherokee and other regional facilities serve Canton and surrounding areas, with additional access into Cobb and broader metro systems. Confirm networks and specialties for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Woodstock, Holly Springs, or Ball Ground to preferred facilities — I-575 congestion changes “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Growth-suburb and HOA stock',
            detail:
              'Much of Cherokee’s newer inventory sits in HOA communities with amenities, architectural rules, and dues. Northern edges offer more acreage and rural-edge product.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by corridor and lot size. Budget for HOA dues and longer commute fuel/time costs to intown job centers.',
          },
          {
            title: 'New construction pace',
            detail:
              'South and mid-corridor growth can feel construction-heavy. Visit at commute hours to understand traffic and noise before deciding.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Cherokee areas fit whom',
        bullets: [
          {
            title: 'Woodstock / Towne Lake lifestyle',
            detail:
              'Often appeals for newer homes, retail amenities, and relatively shorter access toward Cobb — still car-dependent at peak.',
          },
          {
            title: 'Canton and mid-corridor family suburbs',
            detail:
              'Suits school-focused households seeking growth SFH; verify I-575 drive times to job centers.',
          },
          {
            title: 'North and west quieter edges',
            detail:
              'Ball Ground, Waleska, and west-edge patterns can feel more spacious or rural; confirm services and commute tolerance first.',
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
              'Healthcare, retail, education, local services, and some manufacturing/logistics shape in-county employment. Many residents commute into Cobb or Fulton job centers.',
          },
          {
            title: 'Commute realism',
            detail:
              'Most households are car-dependent. I-575, Hwy 92, and Bells Ferry peaks are real. Test drive peak routes before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'North-metro growth character',
            detail:
              'Cherokee is defined by family-oriented growth suburbs and longer access to the Atlanta core — different from Fulton’s vertical markets or DeKalb’s intown-east mix.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers and frequent storms. Plan outdoor staging and heat-safe move-in logistics.',
          },
          {
            title: 'Pace and amenities',
            detail:
              'Parks, trails, and retail are strong in growth corridors; northern edges feel quieter. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Cherokee resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify mover registration before deposits.',
    items: [
      {
        label: 'Cherokee County — official site',
        href: 'https://www.cherokeega.com/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Woodstock',
        href: 'https://www.woodstockga.gov/',
        external: true,
      },
      {
        label: 'City of Canton',
        href: 'https://www.cantonga.gov/',
        external: true,
      },
      {
        label: 'City of Holly Springs',
        href: 'https://www.hollyspringsga.us/',
        external: true,
      },
      {
        label: 'Cherokee County School District',
        href: 'https://www.cherokeek12.net/',
        external: true,
        note: 'Boundaries & calendars',
      },
      {
        label: 'Georgia 511 — traffic conditions',
        href: 'https://www.511ga.org/',
        external: true,
        note: 'I-575 and arterials before load windows',
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
    'Prefer crews with north-metro HOA fluency for Woodstock/Holly Springs/Canton; honest I-575 and empty-mile timing for Perimeter-origin pairs; family SFH packing capacity for summer peak; rural-edge approach awareness for north Cherokee. Verify Georgia DPS/MCCD for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
};
