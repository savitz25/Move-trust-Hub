import {
  finalizeCaTier2Pack,
  CA_TIER2_BHGS_BULLET,
} from '@/lib/local-movers/county-intelligence/ca-tier2-shared';

/**
 * Napa County — California Tier 2 (Napa Valley North Bay secondary).
 * Parent: Sonoma County (+ SF Bay contrast). Not a Sonoma clone; not a pure SF rate card.
 */
export const napaCountyIntelligence = finalizeCaTier2Pack({
  countySlug: 'napa',
  hubTitle: 'Napa County Moving Intelligence Hub',
  eyebrow: 'Napa County · North Bay secondary · Napa Valley constrained roads',
  h1: 'Moving in Napa County: Napa Valley Secondary, Tourism + Residential & Constrained Valley Roads',
  heroOpener:
    'Napa County is a North Bay secondary split between everyday residential logistics and world-class wine tourism — not Sonoma with the plaza names swapped, and not a San Francisco elevator market with vines. City of Napa multi-unit and arterial stock, American Canyon Bay-collar growth, up-valley towns (Yountville, St. Helena, Calistoga) on constrained CA-29 / Silverado Trail two-lanes, and eastern hills / Lake Berryessa edges each need their own truck plan. Event weekends, harvest traffic, and visitor curb loss rewrite “local.” Quote the pocket: city multi-unit, American Canyon HOA, up-valley cottage, or rural hillside — never “Napa County local” alone.',
  heroCredibility:
    'North Bay secondary · Tourism + residential · Constrained valley roads · BHGS in-state · FMCSA interstate · Curated listings',
  majorCorridors: 'CA-29 · CA-12 · CA-121 · CA-128 · Silverado Trail',
  parentCompare: {
    parentLabel: 'Sonoma County',
    parentHref: '/local-movers/california/sonoma',
    title: 'How Napa County differs from Sonoma County (and SF Bay contrast)',
    intro:
      'Napa is a narrower valley secondary next to Sonoma’s larger multi-node North Bay market. Sonoma has Santa Rosa metro scale and west-county/coast options; Napa concentrates tourism and residential volume on constrained north–south valley roads. SF Bay is a long haul contrast — not a city-block local.',
    bullets: [
      {
        title: 'Corridor & drive time',
        detail:
          'CA-29 and Silverado Trail are the valley spine; CA-12 and CA-121 link American Canyon and south approaches; CA-128 serves northwest/Calistoga-edge pairs. Napa ↔ Santa Rosa is a North Bay timed local; Napa ↔ SF/Peninsula is a long regional haul. Up-valley two-lane congestion on event weekends understates map miles.',
      },
      {
        title: 'Housing differences',
        detail:
          'City of Napa multi-unit and postwar tracts, American Canyon planned growth, plaza-adjacent and historic up-valley cottages, vineyard-edge estates, and eastern hills stock replace Sonoma’s broader Santa Rosa multi-unit scale and west-county/coastal product mix. Premium winery-adjacent inventory is a larger share of specialty work.',
      },
      {
        title: 'Truck access, tourism & density',
        detail:
          'Valley towns lose curb space on visitor and event weekends; CA-29 / Silverado Trail bottlenecks delay portal time; rural parcels need driveway photos and sometimes shuttles. American Canyon reopens more suburban staging — different product from St. Helena or Calistoga cores.',
      },
      {
        title: 'Cost posture',
        detail:
          'Same-zone City of Napa jobs can look metro-adjacent; up-valley tourism delay, estate access, and event-season congestion push prices above many Sonoma south-county suburban locals of similar bedrooms. Peak visitor Saturdays and crush traffic add soft costs generic Bay rate cards miss.',
      },
      {
        title: 'Market role',
        detail:
          'North Bay wine-valley secondary: residential volume in Napa/American Canyon plus tourism/ag logistics up-valley. Popular routes bias to Sonoma and broader SF Bay context — not a pure Santa Rosa rate card and not an SF elevator schedule.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Napa County different',
    intro:
      'Secondary-market realities — constrained valley roads, tourism + residential collision, event-season congestion, and California licensing.',
    bullets: [
      {
        title: 'City of Napa, American Canyon, and up-valley are different products',
        detail:
          'Multi-unit Napa arterials, planned American Canyon stock, and St. Helena / Calistoga visitor cores do not share truck access or clock time. Name both cities — “Napa County local” fails on CA-29.',
      },
      {
        title: 'Constrained valley roads own the schedule',
        detail:
          'CA-29, Silverado Trail, and narrow town streets choke on visitor and harvest days. Mid-week mornings often win where lease windows allow; portal-to-portal time must be honest.',
      },
      {
        title: 'Tourism and event calendars collide with residential Saturdays',
        detail:
          'Auction weeks, festivals, marathon-style events, and peak tasting weekends fill curb space and two-lanes. Flag major event weekends when flexible.',
      },
      {
        title: 'Rural, winery & hillside access',
        detail:
          'Long driveways, soft shoulders, gates, outbuildings, and grade on eastern hills need photos. Shuttle language is common when a full-size box cannot stage at the door.',
      },
      CA_TIER2_BHGS_BULLET,
    ],
  },
  zonesIntro:
    'Four sharp zones — City of Napa residential core, American Canyon south collar, up-valley tourism towns, and eastern hills / rural edges. Constrained roads and event timing define the job.',
  zones: [
    {
      id: 'napa-city',
      name: 'City of Napa — Residential & Multi-Unit Core',
      shortName: 'Napa City',
      neighborhoods: [
        'Downtown Napa',
        'Oxbow / river edge',
        'Westwood / Browns Valley edge',
        'North Napa tracts',
        'South Napa arterial corridors',
      ],
      housingTypes:
        'Multi-unit and condos, mid-century SFH, denser grid stock, newer suburban pockets',
      challenges: [
        'Elevator COI and reserved move windows in multi-unit',
        'CA-29 / arterial congestion at peak and visitor surge',
        'Curb competition near downtown visitor nodes',
      ],
      moverTips:
        'Send building rules early. Prefer mid-week mornings over event and commute peaks. Price Napa ↔ Yountville/St. Helena with two-lane buffer, not map-mile quotes.',
      cityKeywords: [
        'napa',
        'downtown napa',
        'browns valley',
        'oxbow',
        'napa ca',
      ],
    },
    {
      id: 'american-canyon',
      name: 'American Canyon & South County Collar',
      shortName: 'American Canyon',
      neighborhoods: [
        'American Canyon',
        'Newer planned tracts',
        'CA-29 / CA-12 approaches',
        'South county commercial edge',
      ],
      housingTypes:
        'Master-planned and suburban SFH, townhomes, multi-family, HOA pockets',
      challenges: [
        'HOA COI and approved hours in planned stock',
        'Bay-collar commute peaks on 29/12 approaches',
        'Different product mix than up-valley tourism cores',
      ],
      moverTips:
        'Collect HOA packets for planned villages. Price American Canyon ↔ City of Napa or ↔ Sonoma/Bay edges with honest arterial time. Do not import St. Helena staging assumptions.',
      cityKeywords: [
        'american canyon',
        'american canyon ca',
        'south napa county',
      ],
    },
    {
      id: 'up-valley',
      name: 'Up-Valley Towns — Yountville, St. Helena, Calistoga',
      shortName: 'Up-Valley',
      neighborhoods: [
        'Yountville',
        'St. Helena',
        'Calistoga',
        'Rutherford / Oakville edges',
        'Silverado Trail corridor',
      ],
      housingTypes:
        'Historic cottages, plaza-adjacent SFH, vineyard-edge homes, limited multi-unit',
      challenges: [
        'Tourism and event-weekend congestion on CA-29 / Silverado Trail',
        'Limited staging on historic and narrow streets',
        'Harvest ag traffic on valley roads',
      ],
      moverTips:
        'Avoid peak tourist and major event Saturdays when flexible. Flag vineyard-adjacent or gravel access. Price up-valley ↔ City of Napa portal-to-portal with two-lane delay built in.',
      cityKeywords: [
        'yountville',
        'st helena',
        'st. helena',
        'calistoga',
        'rutherford',
        'oakville',
        'silverado trail',
      ],
    },
    {
      id: 'eastern-hills-rural',
      name: 'Eastern Hills, Lake Berryessa Edge & Rural Approaches',
      shortName: 'Hills / Rural',
      neighborhoods: [
        'Atlas Peak / eastern hills edges',
        'Lake Berryessa approaches',
        'Wooden Valley / east county pockets',
        'Rural vineyard and ranch edges',
      ],
      housingTypes:
        'Hillside SFH, ranch-edge lots, vineyard properties, limited multi-unit — many constrained approaches',
      challenges: [
        'Grade, narrow roads, and limited turnaround',
        'Long carries and soft shoulders',
        'Not interchangeable with City of Napa multi-unit jobs',
      ],
      moverTips:
        'Access-first: road width, grade, gates, and canopy photos before dispatch. Discuss shuttle options when a full-size box cannot stage at the door. Price empty miles from valley-floor yards honestly.',
      cityKeywords: [
        'lake berryessa',
        'atlas peak',
        'wooden valley',
        'east napa',
        'berryessa',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Napa County',
    intro:
      'Compressed drivers — valley two-lane time, tourism/event staging, and rural or estate access soft costs.',
    drivers: [
      {
        title: 'CA-29 / Silverado Trail / CA-12 cross-zone time',
        detail:
          'Napa ↔ Calistoga, American Canyon ↔ up-valley, or event-day valley legs burn more clock than freeway miles suggest. Hourly billing follows the clock.',
      },
      {
        title: 'Tourism staging & constrained town streets',
        detail:
          'Visitor curb loss, long carries, and shuttle needs add labor before boxes move. Get shuttle and long-carry fees in writing.',
      },
      {
        title: 'Estate, hillside & winery-edge access',
        detail:
          'Gates, grades, outbuildings, and canopy clearance raise packing hours and vehicle risk versus flat American Canyon tracts.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$550–$1,700+',
        note: 'Higher with elevators, tourism staging, or rural long-carry',
      },
      {
        label: '2–3BR house / town or tract',
        value: '$1,700–$4,800+',
        note: 'Event delays and up-valley hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / estate / event peak)',
        value: '$2,800–$8,500+',
        note: 'Hillside access and visitor-weekend pairs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal intelligence',
    intro:
      'Visitor peaks, harvest freight, school calendars, and fire/smoke windows set risk more than mild North Bay temperatures.',
    items: [
      {
        title: 'Peak residential: late spring – early fall weekends',
        detail:
          'School calendars and end-of-month leases fill Saturdays across City of Napa and American Canyon. Book 2–4 weeks ahead for popular windows.',
      },
      {
        title: 'Tourism, events & harvest (spring – fall)',
        detail:
          'Up-valley towns and CA-29 tighten on visitor weekends, festival/auction periods, and crush season. Prefer mid-week mornings for tourism cores when flexible.',
      },
      {
        title: 'Fire season & smoke (variable; often summer – fall)',
        detail:
          'Red-flag and poor air-quality days can pause outdoor packing on hillside and WUI parcels. Build flexibility and written weather/air policies.',
      },
    ],
  },
  specialized: [
    {
      id: 'constrained-valley-roads',
      title: 'Constrained valley-road & two-lane logistics',
      intro:
        'CA-29, Silverado Trail, and narrow town approaches are timing jobs first — especially on event weekends.',
      bullets: [
        'Price portal-to-portal time honestly for City of Napa ↔ up-valley pairs.',
        'Flag major visitor and event weekends so curb staging plans stay realistic.',
        'Prefer mid-week mornings for St. Helena, Yountville, and Calistoga cores when lease windows allow.',
      ],
    },
    {
      id: 'tourism-residential',
      title: 'Tourism + residential collision logistics',
      intro:
        'Wine-country visitor calendars stack on top of ordinary lease ends and family moves.',
      bullets: [
        'Avoid peak tasting Saturdays and known major events when flexible.',
        'Discuss valuation early for premium inventories — released-value alone is often inadequate.',
        'Separate American Canyon planned-stock jobs from up-valley tourism cores on the survey.',
      ],
    },
    {
      id: 'winery-hillside-access',
      title: 'Winery-edge, hillside & rural access',
      intro:
        'Eastern hills and vineyard parcels need truck-access plans city multi-unit jobs never see.',
      bullets: [
        'Share driveway width, gate codes, canopy clearance, grade, and turnaround photos before booking.',
        'Inventory outbuildings and note soft ground or gravel final approaches.',
        'Discuss shuttle options when a full-size box cannot stage at the door.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Napa County?',
    intro:
      'Compressed relocator notes — schools and hospitals by pocket, then test valley-road commute and tourism tolerance for the address you want.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Multiple systems (Napa Valley Unified and City of Napa feeders, American Canyon-area pathways, St. Helena Unified, Calistoga Joint Unified, and others). Match every listing to the correct boundary.',
        bullets: [
          {
            title: 'Town-first district check',
            detail:
              'Use official district tools and the California School Dashboard. Unincorporated valley and hills pockets can span feeders.',
          },
          {
            title: 'City vs American Canyon vs up-valley',
            detail:
              'Enrollment pressure and program mix differ by pocket — do not treat county averages as neighborhood truth. Napa Valley College shapes some rental and traffic patterns near campus-adjacent areas.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail:
              'Providence Queen of the Valley (Napa) and other valley services cover most residential pockets; up-valley and hills addresses need realistic ER drive times on congested CA-29 days — map them at rush hour and visitor peaks.',
          },
          {
            title: 'Specialty spillover',
            detail:
              'Some households use Sonoma, Solano, or broader Bay specialty networks. Confirm insurer networks and realistic appointment times before committing to a far up-valley or hills-only address.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Napa County resources',
    intro:
      'Local official links first. BHGS, FMCSA, and Move Trust Hub tools are added automatically for licensing checks.',
    items: [
      {
        label: 'County of Napa',
        href: 'https://www.countyofnapa.org/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Napa',
        href: 'https://www.cityofnapa.org/',
        external: true,
      },
      {
        label: 'City of American Canyon',
        href: 'https://www.cityofamericancanyon.org/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter by zone (Napa City, American Canyon, Up-Valley, Hills/Rural) when available. Confirm event timing, constrained-road portal time, and hillside access photos — parent context is Sonoma, not an SF elevator rate card.',
  lastReviewed: '2026-07-24',
});
