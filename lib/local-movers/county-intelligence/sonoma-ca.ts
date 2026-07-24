import {
  finalizeCaTier2Pack,
  CA_TIER2_BHGS_BULLET,
} from '@/lib/local-movers/county-intelligence/ca-tier2-shared';

/**
 * Sonoma County — California Tier 2 (North Bay wine-country secondary / SF Bay collar).
 * Parent: San Francisco Bay Tier 1. Not a SF peninsula clone; not a Napa brochure.
 */
export const sonomaCountyIntelligence = finalizeCaTier2Pack({
  countySlug: 'sonoma',
  hubTitle: 'Sonoma County Moving Intelligence Hub',
  eyebrow: 'Sonoma County · North Bay secondary · Wine country collar',
  h1: 'Moving in Sonoma County: North Bay Secondary, Wine-Country Access & US-101 Collar',
  heroOpener:
    'Sonoma County is the North Bay wine-country secondary that collars the San Francisco Bay market — not a peninsula suburb with vines pasted on. Santa Rosa is a real multi-unit and arterial hub on US-101; Petaluma and Rohnert Park absorb Bay commute spillover; Sonoma Valley and Healdsburg run on plaza tourism and harvest two-lanes; west county and Bodega edges add fog, soft shoulders, and long rural drives. Fire and smoke seasons rewrite outdoor packing on wildland-adjacent edges. Crews that quote “Bay Area local” without naming the pocket underprice tourism curb fights, vineyard approaches, and 101-to-two-lane portal time.',
  heroCredibility:
    'North Bay secondary · US-101 collar · Wine-country access · BHGS in-state · FMCSA interstate · Curated listings',
  majorCorridors: 'US-101 · CA-12 · CA-116 · CA-121 · CA-1',
  parentCompare: {
    parentLabel: 'Bay Area (San Francisco & San Mateo)',
    parentHref: '/local-movers/california/san-francisco',
    title: 'How Sonoma County differs from the San Francisco Bay core',
    intro:
      'Sonoma is a North Bay secondary and wine-country collar — not SF/Peninsula elevator density, not pure Marin commute product. Use this comparison when origin or destination sits in the Bay Tier 1 market.',
    bullets: [
      {
        title: 'Corridor & drive time',
        detail:
          'US-101 is the spine from Petaluma through Santa Rosa toward Healdsburg; CA-12, CA-116, and CA-121 feed valley and west-county pairs. Sonoma ↔ SF/Peninsula is a long North Bay haul, not a city-block local — portal-to-portal time, not brochure miles, sets the bill.',
      },
      {
        title: 'Housing differences',
        detail:
          'Santa Rosa multi-unit and postwar tracts, Rohnert Park planned stock, plaza-adjacent cottages in Sonoma and Healdsburg, and vineyard-edge ranches replace Mission/SOMA elevator towers and peninsula condo COI culture. Inventory and access change by pocket inside one county.',
      },
      {
        title: 'Truck access, tourism & density',
        detail:
          'Plaza towns lose curb space on visitor weekends; rural parcels need driveway photos, canopy clearance, and sometimes shuttles. Bay-core loading docks and freight elevators are rare outside Santa Rosa multi-unit — staging assumptions do not transfer.',
      },
      {
        title: 'Cost posture',
        detail:
          'Same-zone Santa Rosa jobs can look metro-adjacent; Sonoma Plaza, Healdsburg, west-county, and harvest-season rural pairs price higher on tourism delay, long carry, and two-lane clock. Peak visitor Saturdays and crush-season ag traffic add soft costs Bay crews often miss.',
      },
      {
        title: 'Market role',
        detail:
          'North Bay wine-country secondary and SF Bay collar: residential volume on 101 growth towns plus tourism/ag logistics the peninsula core never runs. Route popular long-locals toward San Francisco/Marin and nearby North Bay secondaries — not generic “Bay Area” rate cards alone.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Sonoma County different',
    intro:
      'Secondary-market realities that change estimates — 101 collar towns, wine-country tourism, rural/winery access, and California licensing.',
    bullets: [
      {
        title: 'Santa Rosa metro vs wine towns vs west county',
        detail:
          'Multi-unit Santa Rosa, south-county Petaluma/Rohnert Park HOAs, Sonoma Valley plaza streets, and coastal/west gravel approaches are different truck products. Name both cities on the estimate — “Sonoma County local” is too vague.',
      },
      {
        title: 'Tourism and harvest choke two-lane approaches',
        detail:
          'Sonoma Plaza, Healdsburg square, Sebastopol corridors, and tasting-room routes fill on weekends and festival weeks. Crush season adds ag trucks on farm-adjacent roads. Mid-week mornings often win where lease windows allow.',
      },
      {
        title: 'Rural, winery & older-stock access',
        detail:
          'Long driveways, soft shoulders, low oak canopy, gates, outbuildings, and stair-heavy older cottages are common outside planned south-county tracts. Share approach photos and outbuilding inventory on the survey.',
      },
      {
        title: 'Fire, smoke & microclimates',
        detail:
          'WUI and hillside edges face red-flag and air-quality delays; Bodega and west-county edges bring fog and wind while inland valleys run hotter. Outdoor packing plans should match the pocket, not a generic Bay forecast.',
      },
      CA_TIER2_BHGS_BULLET,
    ],
  },
  zonesIntro:
    'Four sharp zones — not a town dump. Santa Rosa metro, south 101 collar, wine-country valley, and coastal/west each need their own access and timing assumptions.',
  zones: [
    {
      id: 'santa-rosa-metro',
      name: 'Santa Rosa Metro & Mid-County Hub',
      shortName: 'Santa Rosa',
      neighborhoods: [
        'Downtown Santa Rosa',
        'Railroad Square',
        'Rincon Valley',
        'Roseland',
        'Bennett Valley edge',
        'Fountaingrove edge',
      ],
      housingTypes:
        'Multi-unit and condos, mid-century SFH, denser grid stock, hillside rebuild edges',
      challenges: [
        'Elevator COI and reserved move windows in multi-unit',
        'US-101 / arterial congestion at peak',
        'Hillside and Fountaingrove-edge access constraints',
      ],
      moverTips:
        'Send building rules early. Prefer mid-week mornings over 101 peaks. Treat Santa Rosa ↔ Sonoma or Healdsburg as timed locals with two-lane buffer, not map-mile quotes.',
      cityKeywords: [
        'santa rosa',
        'railroad square',
        'rincon valley',
        'roseland',
        'bennett valley',
        'fountaingrove',
      ],
    },
    {
      id: 'petaluma-south',
      name: 'Petaluma, Rohnert Park & South County Collar',
      shortName: 'South County',
      neighborhoods: [
        'Petaluma',
        'Rohnert Park',
        'Cotati',
        'Penngrove',
        'Petaluma downtown / river area',
      ],
      housingTypes:
        'Historic Petaluma SFH and multi-unit, suburban Rohnert Park tracts, HOA pockets',
      challenges: [
        '101 congestion toward Marin and Santa Rosa',
        'Historic downtown Petaluma staging limits',
        'HOA packets in planned Rohnert Park stock',
      ],
      moverTips:
        'Early weekday starts for downtown Petaluma. Collect HOA COI for Rohnert Park tracts. Price Petaluma ↔ Marin-edge or Santa Rosa with honest 101 ETAs.',
      cityKeywords: ['petaluma', 'rohnert park', 'cotati', 'penngrove'],
    },
    {
      id: 'sonoma-valley-wine',
      name: 'Sonoma Valley & North Wine Country',
      shortName: 'Wine Country',
      neighborhoods: [
        'City of Sonoma',
        'Sonoma Plaza',
        'Healdsburg',
        'Windsor',
        'Glen Ellen edge',
        'Kenwood edge',
      ],
      housingTypes:
        'Plaza-adjacent cottages, historic SFH, valley-floor homes, vineyard-edge estates',
      challenges: [
        'Tourism weekend congestion on plaza and square approaches',
        'Harvest traffic on valley roads',
        'Limited staging on historic and narrow streets',
      ],
      moverTips:
        'Avoid peak tourist Saturdays when flexible. Flag vineyard-adjacent or gravel access. Price Sonoma or Healdsburg ↔ Santa Rosa with CA-12 / 101 portal time.',
      cityKeywords: [
        'sonoma',
        'healdsburg',
        'windsor',
        'glen ellen',
        'kenwood',
        'sonoma valley',
      ],
    },
    {
      id: 'coastal-west',
      name: 'West County & Coastal Edge',
      shortName: 'Coastal / West',
      neighborhoods: [
        'Sebastopol',
        'Graton',
        'Occidental edge',
        'Bodega Bay edge',
        'West County rural pockets',
      ],
      housingTypes:
        'West County SFH, orchard and rural-edge lots, coastal cottages toward Bodega',
      challenges: [
        'Two-lane west-county roads and limited turnaround',
        'Fog, wind, and salt air on coastal edges',
        'Soft shoulders and canopy clearance on rural drives',
      ],
      moverTips:
        'Access-first: road width, gates, and canopy photos. Coastal jobs need wind-aware packing. Sebastopol ↔ Santa Rosa pays for two-lane delay — price portal-to-portal.',
      cityKeywords: [
        'sebastopol',
        'graton',
        'occidental',
        'bodega bay',
        'bodega',
        'west county',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Sonoma County',
    intro:
      'Compressed drivers — cross-zone 101/two-lane time, tourism and rural access, and when the pair leaves Santa Rosa for wine-country or west-county pockets.',
    drivers: [
      {
        title: 'US-101 & two-lane cross-zone time',
        detail:
          'Santa Rosa ↔ Sonoma, Petaluma ↔ Healdsburg, or west-county pairs burn more clock than freeway miles suggest — especially tourist weekends and harvest days. Hourly billing follows the clock.',
      },
      {
        title: 'Tourism staging & rural / winery access',
        detail:
          'Plaza curb loss, long driveways, shuttles, and outbuilding carries add labor before boxes move. Get shuttle and long-carry fees in writing.',
      },
      {
        title: 'Fire/smoke and older-stock labor',
        detail:
          'WUI contingency risk and stair-heavy historic cottages raise packing hours and reschedule odds versus flat south-county tracts.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$550–$1,600+',
        note: 'Higher with elevators, plaza staging, or rural long-carry',
      },
      {
        label: '2–3BR house / town or tract',
        value: '$1,600–$4,400+',
        note: 'Tourism delays and cross-valley hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / rural / wine-country peak)',
        value: '$2,600–$7,500+',
        note: 'Ag-edge access and visitor-weekend pairs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal intelligence',
    intro:
      'School calendars, visitor peaks, harvest freight, and fire/smoke windows set risk more than mild North Bay temperatures.',
    items: [
      {
        title: 'Peak residential: late spring – early fall weekends',
        detail:
          'School calendars and end-of-month leases fill Saturdays across Santa Rosa, Rohnert Park, and Petaluma. Book 2–4 weeks ahead for popular windows.',
      },
      {
        title: 'Tourism & harvest (summer – fall)',
        detail:
          'Plaza towns and tasting-room corridors tighten on visitor weekends; crush season congests farm-adjacent roads. Prefer mid-week mornings for wine-country cores.',
      },
      {
        title: 'Fire season & smoke (variable; often summer – fall)',
        detail:
          'Red-flag and poor air-quality days can pause outdoor packing on hillside and WUI parcels. Build flexibility and written weather/air policies before peak season.',
      },
    ],
  },
  specialized: [
    {
      id: 'rural-winery-drives',
      title: 'Rural, winery & long-driveway access',
      intro:
        'Vineyard-edge and west/north county parcels need truck-access plans city tracts never see.',
      bullets: [
        'Share driveway width, gate codes, canopy clearance, and turnaround photos before booking.',
        'Inventory outbuildings and note soft ground or gravel final approaches.',
        'Discuss shuttle options when a full-size box cannot stage at the door.',
        'Build harvest-season freight buffer on ag-adjacent roads.',
      ],
    },
    {
      id: 'tourism-peaks',
      title: 'Wine-country tourism peak logistics',
      intro:
        'Plaza and square towns run on visitor calendars that collide with residential Saturdays.',
      bullets: [
        'Prefer mid-week mornings for Sonoma Plaza, Healdsburg square, and Sebastopol corridor addresses.',
        'Flag festival and major visitor weekends so curb staging plans stay realistic.',
        'Price portal-to-portal time honestly when either address leaves Santa Rosa for tourist cores.',
      ],
    },
    {
      id: 'older-housing-stairs',
      title: 'Older housing, stairs & tight historic stock',
      intro:
        'Plaza cottages and pre-war cores often mean stairs, narrow halls, and finish-sensitive inventories.',
      bullets: [
        'Note stair counts, hallway width, and parking distance on the survey.',
        'Discuss packing and floor protection for older finishes early.',
        'Confirm parking permits or short-term staging limits in historic downtown blocks.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Sonoma County?',
    intro:
      'Compressed relocator notes — validate schools and healthcare by pocket, then test 101 commute and fire-insurance tolerance for the address you actually want.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Multiple districts (Santa Rosa City and feeders, Petaluma, Sonoma Valley Unified, Healdsburg, Windsor, Sebastopol-area, Cotati-Rohnert Park, and others). Match every listing address to the correct boundary.',
        bullets: [
          {
            title: 'Town-first district check',
            detail:
              'Use official district tools and the California School Dashboard. Marketing city names and unincorporated pockets can span feeders.',
          },
          {
            title: 'Metro vs wine towns vs west county',
            detail:
              'Enrollment pressure and program mix differ by pocket — do not treat county averages as neighborhood truth. Santa Rosa Junior College shapes some rental and traffic patterns near campus-adjacent areas.',
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
              'Providence / Santa Rosa Memorial and other Santa Rosa campuses, Petaluma Valley, Sonoma Valley Hospital, and Healdsburg-area services cover different pockets — map ER drive times at rush hour from your target neighborhood.',
          },
          {
            title: 'Specialty spillover',
            detail:
              'Some households use Marin or broader Bay specialty networks. Confirm insurer networks and realistic 101 appointment times before you commit to a far-west or far-north pocket.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Sonoma County resources',
    intro:
      'Local official links first. BHGS, FMCSA, and Move Trust Hub tools are added automatically for licensing checks.',
    items: [
      {
        label: 'County of Sonoma',
        href: 'https://sonomacounty.ca.gov/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Santa Rosa',
        href: 'https://www.srcity.org/',
        external: true,
      },
      {
        label: 'City of Petaluma',
        href: 'https://cityofpetaluma.org/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter by zone (Santa Rosa, South County, Wine Country, Coastal/West) when available. Confirm tourism timing, rural access photos, and fire/smoke contingency — especially for plaza towns and WUI pairs. Parent Bay market: San Francisco guide for long-haul context.',
  lastReviewed: '2026-07-24',
});
