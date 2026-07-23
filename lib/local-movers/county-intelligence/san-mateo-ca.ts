import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted San Mateo County moving intelligence.
 * Used by /local-movers/california/san-mateo and the shared intelligence template.
 *
 * Differentiators vs SF / Santa Clara: Peninsula tech corridor, coastal vs bay-side
 * split, hills/HOAs, SFO adjacency, 101/280 spine logistics.
 */
export const sanMateoCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'california',
  countySlug: 'san-mateo',
  hubTitle: 'San Mateo County Moving Intelligence Hub',
  eyebrow: 'San Mateo County · Peninsula guide',
  h1: 'Moving on the Peninsula: Hills, Tech Corridor, SFO & Zone-by-Zone Guide',
  heroOpener:
    'San Mateo County is the Peninsula’s logistics hinge — squeezed between San Francisco density and Silicon Valley sprawl, with a hard split between bay-side tech cities and foggy coastal towns. Hills and canyons from Hillsborough to Woodside punish full-size trucks; HOA-gated communities from Foster City to San Carlos demand Certificates of Insurance and weekday windows. SFO’s flight paths and US-101 freight rhythm turn “short” locals into hour-eating hauls, while Half Moon Bay and the coastside live on Highway 1 timing and wind. This guide is for people moving in San Mateo County — not generic Bay Area tips recycled from SF or San Jose.',
  heroCredibility:
    'Peninsula tech corridor · Hills/HOA access · SFO-adjacent timing · Intrastate CA (BHGS) · FMCSA when interstate · Curated listings',
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
    title: 'What makes moving in San Mateo County different',
    intro:
      'These are the Peninsula realities that change estimates — bay vs coast, hills, HOAs, tech calendars, and airport-adjacent freeways.',
    bullets: [
      {
        title: 'Bay-side tech corridor vs coastside is two different jobs',
        detail:
          'A South San Francisco biotech loft, a Menlo Park campus-adjacent condo, and a Half Moon Bay coastal home share a county name but not access, weather, or drive-time assumptions. Get origin and destination cities into the estimate — “Peninsula local” is too vague.',
      },
      {
        title: 'Hills and canyons rewrite truck access',
        detail:
          'Hillsborough, Woodside, Portola Valley, parts of San Mateo, Belmont, and Redwood City hills often mean steep driveways, low branches, limited turnaround, and no 26′ truck at the door. Shuttle trucks or long carries are common. Share approach photos and max truck length before move day.',
      },
      {
        title: 'HOAs and planned communities are routine',
        detail:
          'Foster City, Redwood Shores, many San Carlos/Belmont tracts, and coastal HOAs require Certificates of Insurance, approved hours, gate lists, and floor protection. Treat the HOA packet as part of the survey — after-the-fact COI scrambles cause day-of cancellations.',
      },
      {
        title: 'SFO adjacency is a logistics factor',
        detail:
          'South San Francisco, San Bruno, Millbrae, and Burlingame feel airport traffic, hotel load-ins, and US-101 / I-380 weave. Crews can stall near airport approaches even when neither address is “at SFO.” Build buffer into load windows near the airport cities.',
      },
      {
        title: 'US-101 and I-280 are the billable spine',
        detail:
          'Bay-side 101 and ridge-side 280 control portal-to-portal hours. Daly City ↔ Menlo Park or Pacifica ↔ Redwood City can double at the 7–9 a.m. and 3–7 p.m. peaks. Ask if quotes are portal-to-portal and how peak windows are priced.',
      },
      {
        title: 'High-value Peninsula inventories',
        detail:
          'Tech equity, design furniture, wine storage, and home offices are common from Burlingame through Atherton/Menlo edges. Cheap released-value coverage is often inadequate — discuss valuation and packing levels early.',
      },
      {
        title: 'California intrastate rules (BHGS) + FMCSA when interstate',
        detail:
          'Moves entirely within California are generally overseen by the California Bureau of Household Goods and Services (BHGS). Interstate legs (e.g. Peninsula → out-of-state tech transfer) need FMCSA authority. Confirm which license applies before deposit.',
      },
    ],
  },
  zonesIntro:
    'Treat each Peninsula zone as its own access problem. Bay-side tech density, hillside estates, SFO-adjacent cities, and coastside Highway 1 towns are not interchangeable.',
  zones: [
    {
      id: 'north-peninsula',
      name: 'North Peninsula — Daly City, Pacifica, South SF, San Bruno',
      shortName: 'North Pen',
      neighborhoods: [
        'Daly City',
        'Pacifica',
        'South San Francisco',
        'San Bruno',
        'Colma',
        'Broadmoor',
      ],
      housingTypes:
        'Mid-century SFH, multi-unit apartments, biotech-adjacent rentals, coastal Pacifica homes, hillside lots',
      challenges: [
        'US-101 / I-280 / I-380 congestion near SFO approaches',
        'Fog and wind on Pacifica coastal blocks',
        'Hillside access in Daly City and Pacifica pockets',
        'Biotech and industrial traffic in South SF',
      ],
      moverTips:
        'Build airport-corridor buffer into South SF / San Bruno windows. Pacifica often needs weather-aware packing and careful curb staging on Highway 1-adjacent streets. Confirm truck length on hillside Daly City approaches.',
      cityKeywords: [
        'daly city',
        'pacifica',
        'south san francisco',
        'south sf',
        'san bruno',
        'colma',
        'broadmoor',
        'brisbane',
      ],
    },
    {
      id: 'central-bay',
      name: 'Central Bay-Side — San Mateo, Burlingame, Millbrae, Foster City',
      shortName: 'Central Bay',
      neighborhoods: [
        'San Mateo',
        'Burlingame',
        'Millbrae',
        'Foster City',
        'Hillsborough',
        'San Mateo Park',
      ],
      housingTypes:
        'Suburban SFH, mid-rise condos, Foster City planned communities, high-value Hillsborough estates',
      challenges: [
        'HOA COI and gate rules in Foster City / planned communities',
        'Hillsborough driveway grades and limited truck turnaround',
        '101 corridor peak delays',
        'High-value inventory handling expectations',
      ],
      moverTips:
        'Send HOA packets early for Foster City and condo towers. Hillsborough almost always needs access photos — do not assume a full trailer reaches the door. Prefer mid-week mornings to miss 101 peaks.',
      cityKeywords: [
        'san mateo',
        'burlingame',
        'millbrae',
        'foster city',
        'hillsborough',
        'san mateo park',
      ],
    },
    {
      id: 'mid-peninsula',
      name: 'Mid-Peninsula — Belmont, San Carlos, Redwood City, Redwood Shores',
      shortName: 'Mid-Pen',
      neighborhoods: [
        'Belmont',
        'San Carlos',
        'Redwood City',
        'Redwood Shores',
        'Emerald Hills',
        'North Fair Oaks',
      ],
      housingTypes:
        'Hillside SFH, downtown multi-unit, Redwood Shores HOA communities, tech-adjacent rentals',
      challenges: [
        'Canyon and hillside access (Emerald Hills, Belmont hills)',
        'HOA windows in Redwood Shores',
        'Downtown Redwood City staging limits',
        '101/280 choice can add or save 30+ minutes',
      ],
      moverTips:
        'Ask which freeway spine the crew will use at your time of day. Redwood Shores needs COI and gate lists. Hillside Belmont/San Carlos jobs often need shuttles — share driveway photos.',
      cityKeywords: [
        'belmont',
        'san carlos',
        'redwood city',
        'redwood shores',
        'emerald hills',
        'north fair oaks',
      ],
    },
    {
      id: 'south-peninsula',
      name: 'South Peninsula — Menlo Park, Atherton, East Palo Alto edge',
      shortName: 'South Pen',
      neighborhoods: [
        'Menlo Park',
        'Atherton',
        'East Palo Alto',
        'North Fair Oaks edge',
        'Sharon Heights',
        'West Menlo',
      ],
      housingTypes:
        'High-value estates, tech-corridor condos, suburban SFH, multi-family near East Palo Alto',
      challenges: [
        'Estate driveway and tree-canopy access in Atherton / west Menlo',
        'Campus and commute traffic near Sand Hill / 101',
        'High-value packing and valuation expectations',
        'Cross-county spillover into Santa Clara / SF',
      ],
      moverTips:
        'Treat Atherton and west Menlo as access-first jobs — measure gates, branches, and turnarounds. Discuss full-value protection. For Menlo ↔ SF or Menlo ↔ South Bay, price honest travel time, not map miles.',
      cityKeywords: [
        'menlo park',
        'atherton',
        'east palo alto',
        'sharon heights',
        'west menlo',
        'menlo',
      ],
    },
    {
      id: 'coastside',
      name: 'Coastside — Half Moon Bay, El Granada, Montara, Moss Beach',
      shortName: 'Coastside',
      neighborhoods: [
        'Half Moon Bay',
        'El Granada',
        'Montara',
        'Moss Beach',
        'Princeton-by-the-Sea',
        'Pescadero edge',
      ],
      housingTypes:
        'Coastal SFH, hillside lots, agricultural-edge properties, small multi-unit, HOA pockets',
      challenges: [
        'Highway 1 congestion and limited alternate routes',
        'Wind, salt air, and damp packing conditions',
        'Narrow coastal streets and limited staging',
        'Long “local” hauls to bay-side cities via Hwy 92 or 1',
      ],
      moverTips:
        'Coastside ↔ bay-side is a long local — budget Hwy 92 or 1 time honestly. Protect metal and electronics against salt air. Avoid peak weekend tourist windows in Half Moon Bay when flexible.',
      cityKeywords: [
        'half moon bay',
        'el granada',
        'montara',
        'moss beach',
        'princeton',
        'pescadero',
        'coastside',
        'miramar',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside San Mateo County',
    intro:
      'Two Peninsula “local” moves of the same square footage can differ sharply depending on hills, HOA soft costs, SFO corridor timing, and whether the pair is coastside-to-bay or tract-to-tract on 101.',
    drivers: [
      {
        title: 'Hillside / canyon access & shuttles',
        detail:
          'Hillsborough, Woodside-adjacent edges, Belmont hills, and Emerald Hills often need smaller trucks, long carries, or shuttles — access complexity can exceed a same-size flatland job.',
      },
      {
        title: 'HOA soft costs in planned communities',
        detail:
          'COI, approved hours, and gate lists in Foster City, Redwood Shores, and many condo communities add soft costs and can force weekday-only windows.',
      },
      {
        title: '101 / 280 / SFO corridor time',
        detail:
          'Airport-adjacent weave and Peninsula commute peaks burn billable hours. North Peninsula ↔ South Peninsula pairs feel every delay.',
      },
      {
        title: 'Coastside long locals',
        detail:
          'Half Moon Bay ↔ Redwood City via Hwy 92 can be a half-day of truck time on bad days. Hourly billing follows the clock.',
      },
      {
        title: 'High-value inventory packing',
        detail:
          'Tech and estate households raise careful-handling and valuation expectations. Professional packing tiers are common add-ons.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$650–$1,700+',
        note: 'Higher with elevators, HOA windows, or hills',
      },
      {
        label: '2–3BR house / planned community',
        value: '$1,900–$4,600+',
        note: 'HOA soft costs and multi-freeway hauls trend up',
      },
      {
        label: '3–4+ BR (hills / coast↔bay / estate)',
        value: '$3,000–$9,000+',
        note: 'Hillsborough/Atherton access and coastside pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$140–$215+/hr',
        note: 'Portal-to-portal; packing and 3-person crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, tech & calendar intelligence',
    intro:
      'Peninsula peaks follow school calendars, tech onboarding, and freeways — hills stay access-sensitive year-round; coastside feels wind and tourist weekends.',
    items: [
      {
        title: 'Peak residential: late spring – early fall weekends',
        detail:
          'School calendars and end-of-month leases fill Saturdays from Daly City through Menlo Park. Book 2–4 weeks ahead for popular windows.',
      },
      {
        title: 'Tech hiring & campus start waves',
        detail:
          'Large employer onboarding along the Peninsula and into Santa Clara County clusters mid-week moves near Menlo, Redwood City, and South SF biotech. Hard start dates beat flexible ones for crew availability.',
      },
      {
        title: 'Coastside summer tourism (Half Moon Bay)',
        detail:
          'Weekend Highway 1 traffic and events can stall coastside jobs. Mid-week mornings are cleaner for HMB and Montara.',
      },
      {
        title: 'Fog, wind & damp (coast / Pacifica / west ridges)',
        detail:
          'Marine layer keeps mornings cool and damp — protect wood floors and cardboard. Bay-side cities can be warmer the same day.',
      },
      {
        title: 'Best value: mid-month Tue–Thu mornings',
        detail:
          'Still plan around HOA weekday windows and airport-corridor peaks. Avoid last Friday/Saturday of the month when leases and corporate starts collide.',
      },
    ],
  },
  specialized: [
    {
      id: 'peninsula-hills',
      title: 'Peninsula hills, canyons & estate access',
      intro:
        'Many San Mateo County failures on move day are driveway and truck-length failures on hills — not packing skill.',
      bullets: [
        'Share driveway grade, gate width, branch clearance, and turnaround photos for Hillsborough, Woodside-edge, Belmont, and Emerald Hills addresses.',
        'Assume shuttle or long-carry until a walkthrough proves a full-size truck fits.',
        'Protect floors and landscape on long carries; estate properties often have strict HOA or owner rules for walkways.',
        'Budget extra labor for multi-level hillside homes even when map distance is short.',
        'Confirm generator or low-wire clearance on older canyon roads before the truck is dispatched.',
      ],
    },
    {
      id: 'hoa-sfo-corridor',
      title: 'HOA communities & SFO-corridor timing',
      intro:
        'Foster City, Redwood Shores, and airport-adjacent cities add paperwork and traffic that flat hourly quotes often underprice.',
      bullets: [
        'Request the HOA COI template and approved move hours at lease signing or escrow; send them with every estimate.',
        'Gate lists and visitor truck rules can block unscheduled arrivals — reconfirm the day before.',
        'Near SFO (South SF, San Bruno, Millbrae, Burlingame), build buffer for 101/380 congestion and hotel/airport traffic.',
        'Prefer mid-morning starts that miss the worst commute peaks while still fitting HOA windows.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to San Mateo County?',
    intro:
      'The Peninsula offers bay-side tech access, hillside estates, family suburbs, and a separate coastside lifestyle — pick the pocket first, then validate schools, commute mode, and housing cost.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'San Mateo County uses many municipal and high-school districts (e.g., San Mateo Union High, Sequoia Union High, Jefferson Union, Cabrillo Unified on the coast, and multiple elementary districts). Match every listing address to the correct district.',
        bullets: [
          {
            title: 'Town-first district check',
            detail:
              'Use official district boundary tools and the California School Dashboard. Marketing city names can span multiple feeders — especially near Menlo Park, Redwood City, and unincorporated pockets.',
          },
          {
            title: 'Coast vs bay calendars',
            detail:
              'Coastside (Cabrillo Unified and related) and bay-side districts do not share the same enrollment pressures or bus patterns.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites and state dashboard data should lead; third-party rankings (GreatSchools, Niche) are secondary signals only.',
          },
          {
            title: 'Higher education adjacency',
            detail:
              'Stanford and other Peninsula/South Bay campuses influence rental markets and traffic near the southern county edge — useful for dual-career academic households.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Peninsula systems',
            detail:
              'Mills-Peninsula (Sutter), Stanford Health Care access from the south county, Kaiser facilities, and Seton / coastal-access options serve different pockets — map ER drive times at rush hour from your target address.',
          },
          {
            title: 'Specialty care',
            detail:
              'Many residents travel to Stanford or SF systems for specialty care. Confirm insurer networks and realistic appointment drive times.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer pediatric and specialty care early if mid-treatment; Peninsula specialists can book out.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing & cost of living',
        bullets: [
          {
            title: 'Price ladder by pocket',
            detail:
              'Atherton, Hillsborough, and parts of Menlo/Burlingame command premiums versus denser multi-family in Daly City, South SF, or East Palo Alto. Compare total monthly costs, not sticker price alone.',
          },
          {
            title: 'Stock variety',
            detail:
              'From coastside cottages to Foster City planned communities to hillside estates — access, HOA dues, and renovation needs vary widely.',
          },
          {
            title: 'HOA & parking',
            detail:
              'Many condos and planned communities include HOA rules that affect move-in and monthly budgets. Factor garage fees where street parking is limited.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town fit by lifestyle',
        bullets: [
          {
            title: 'Tech / commute-focused',
            detail:
              'Menlo Park, Redwood City, South SF, and San Mateo for bay-side job access and Caltrain corridors.',
          },
          {
            title: 'Family suburban',
            detail:
              'Foster City, San Carlos, Belmont, and parts of Burlingame/Millbrae often appeal for schools-oriented searches — still verify district boundaries.',
          },
          {
            title: 'Coastside lifestyle',
            detail:
              'Half Moon Bay, Montara, and El Granada trade bay-side commute ease for ocean access and Highway 1 dependence.',
          },
          {
            title: 'Estate / privacy',
            detail:
              'Hillsborough, Atherton, and hillside Woodside-edge pockets prioritize space and privacy — with corresponding access complexity for movers.',
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
              'Technology, biotech (South SF), professional services, healthcare, aviation/airport-adjacent roles, and hospitality.',
          },
          {
            title: 'Caltrain & 101/280',
            detail:
              'Caltrain supports car-light commuting for some bay-side households; many still drive 101 or 280. Map door-to-door times at peak.',
          },
          {
            title: 'SFO employment cluster',
            detail:
              'Airport and aviation-adjacent jobs concentrate near South SF, San Bruno, and Millbrae — useful for dual-career households with airport schedules.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & climate',
        bullets: [
          {
            title: 'Bay vs coast microclimates',
            detail:
              'Coastside fog and wind vs warmer bay-side inland pockets are real. Pack and dress by city, not by “Bay Area” averages.',
          },
          {
            title: 'Outdoors',
            detail:
              'Coastal trails, Crystal Springs / ridge open space, and beaches are major draws; weekend visitor traffic affects Half Moon Bay staging.',
          },
          {
            title: 'Between SF and Silicon Valley',
            detail:
              'Many households choose San Mateo County specifically for midpoint access to both — still validate your actual commute, not the brochure midpoint.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Practical San Mateo County resources',
    intro:
      'Official links and licensing notes — HOA, parking, and city rules change; verify before move day.',
    items: [
      {
        label: 'County of San Mateo',
        href: 'https://www.smcgov.org/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of San Mateo',
        href: 'https://www.cityofsanmateo.org/',
        external: true,
      },
      {
        label: 'City of Redwood City',
        href: 'https://www.redwoodcity.org/',
        external: true,
      },
      {
        label: 'City of South San Francisco',
        href: 'https://www.ssf.net/',
        external: true,
      },
      {
        label: 'City of Foster City',
        href: 'https://www.fostercity.org/',
        external: true,
      },
      {
        label: 'City of Half Moon Bay',
        href: 'https://www.half-moon-bay.ca.us/',
        external: true,
      },
      {
        label: 'City of Menlo Park',
        href: 'https://www.menlopark.gov/',
        external: true,
      },
      {
        label: 'San Francisco International Airport (SFO)',
        href: 'https://www.flysfo.com/',
        note: 'Airport context for adjacent cities — not a mover permit source',
        external: true,
      },
      {
        label: '511 SF Bay — traffic conditions',
        href: 'https://511.org/',
        note: 'Check 101/280/380 and Hwy 92 before locking load windows',
        external: true,
      },
      {
        label: 'CA BHGS — household movers (intrastate)',
        href: 'https://bhgs.dca.ca.gov/',
        note: 'California Bureau of Household Goods and Services',
        external: true,
      },
      {
        label: 'FMCSA SAFER — interstate authority',
        href: 'https://safer.fmcsa.dot.gov/',
        note: 'Required when the move crosses state lines',
        external: true,
      },
      {
        label: 'PG&E — start/stop service',
        href: 'https://www.pge.com/',
        note: 'Electric & gas for most of the county',
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
    'Filter listings by zone (North Pen, Central Bay, Mid-Pen, South Pen, Coastside) when available. Confirm hillside access, HOA/COI rules, and SFO-corridor timing — especially for Hillsborough/Atherton and Foster City/Redwood Shores.',
  lastReviewed: '2026-07-23',
};
