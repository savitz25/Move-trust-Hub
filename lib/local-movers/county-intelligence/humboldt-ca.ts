import {
  finalizeCaTier2Pack,
  CA_TIER2_BHGS_BULLET,
} from '@/lib/local-movers/county-intelligence/ca-tier2-shared';

/**
 * Humboldt County — California Tier 2 (Eureka–Arcata North Coast regional).
 * Independent north-coast market — parent SF is distant contrast only, not a Bay collar.
 */
export const humboldtCountyIntelligence = finalizeCaTier2Pack({
  countySlug: 'humboldt',
  hubTitle: 'Humboldt County Moving Intelligence Hub',
  eyebrow: 'Humboldt County · Eureka–Arcata North Coast regional · Independent',
  h1: 'Moving in Humboldt County: Eureka–Arcata North Coast Hub, US-101 Access & Limited Corridor Redundancy',
  heroOpener:
    'Humboldt County is the North Coast’s Eureka–Arcata regional hub — independent, not a Bay Area collar with fog and redwoods pasted on. Eureka carries port-city multi-unit, Victorian cores, and bay-edge stock; Arcata and McKinleyville absorb Cal Poly Humboldt turnover and north-bay residential volume; Fortuna and south-101 towns run freer small-city pairs; inland and south-county edges (Willow Creek on CA-299, Garberville/Redway approaches on US-101) add long two-lane last-mile with almost no corridor redundancy. A single slide, storm, or crash on 101 or 299 can rewrite the day’s clock. Quote the pocket: Eureka grid, Arcata university multi-unit, south-county two-lane, or inland mountain approach — never “Humboldt County local” alone.',
  heroCredibility:
    'Independent North Coast hub · US-101 limited redundancy · Cal Poly Humboldt influence · BHGS in-state · FMCSA interstate · Curated listings',
  majorCorridors: 'US-101 · CA-299 · CA-36 · CA-255 · local coastal arterials',
  parentCompare: {
    parentLabel: 'Bay Area / Northern CA metros (distant contrast)',
    parentHref: '/local-movers/california/san-francisco',
    title: 'How Humboldt County differs from Bay Area / Northern CA metros',
    intro:
      'Humboldt is a freestanding North Coast regional market. San Francisco and broader Bay/Northern CA metros are distant contrast only — not parent commute collars and not interchangeable rate cards. Use this when origin or destination is Bay-side and the other end is Humboldt.',
    bullets: [
      {
        title: 'Corridor & drive time',
        detail:
          'US-101 is the only continuous coastal spine; CA-299 links east toward Redding; CA-36 and CA-255 serve south and bay-crossing pairs; local coastal arterials finish last-mile. Humboldt ↔ Bay Area is a long multi-hour coastal or inland haul with limited detours — not a North Bay local. In-county Arcata ↔ Garberville still burns two-lane clock Bay freeflow maps understate.',
      },
      {
        title: 'Housing differences',
        detail:
          'Victorian and mid-century Eureka stock, Arcata multi-unit and student-adjacent rentals, Fortuna small-city SFH, and redwood-edge rural parcels replace SF elevator towers and peninsula condo COI culture. Moisture, older finishes, and long rural approaches are normal outside planned north-bay tracts.',
      },
      {
        title: 'Truck access, density & constraints',
        detail:
          'Historic Eureka grids and Arcata village blocks often mean tight staging; rural parcels need driveway photos and canopy clearance. Limited alternate routes mean one blocked segment can strand a crew. Bay loading-dock assumptions do not transfer.',
      },
      {
        title: 'Cost posture',
        detail:
          'Same-zone Eureka/Arcata jobs can look mid-market until stairs, moisture packing, or multi-unit long carries hit. South-county and inland long-locals price on empty miles and redundancy risk. Long-haul from the Bay is distance honesty, not “North Bay wine country” pricing.',
      },
      {
        title: 'Market role',
        detail:
          'Independent North Coast regional: healthcare, education (Cal Poly Humboldt), timber/recreation edges, and coastal services — not Bay spillover. Popular long-haul framing uses SF/Bay only as distant contrast and nearby north-coast or inland north-state secondaries.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Humboldt County different',
    intro:
      'North Coast realities — long coastal approach, university turnover, limited corridor redundancy, and California licensing — that Bay scripts miss.',
    bullets: [
      {
        title: 'Eureka, Arcata, and south/inland edges are different products',
        detail:
          'Port-city Victorian multi-unit, university-adjacent rentals, Fortuna tracts, and Garberville/Willow Creek two-lane parcels do not share access. Name both cities — “Humboldt County local” fails across 101 vs 299.',
      },
      {
        title: 'Limited corridor redundancy is an operational risk',
        detail:
          'US-101 and CA-299 have few good parallel routes. Storms, slides, fires, and crashes create real day-of delays. Build buffer and flexible reschedule language for long-locals.',
      },
      {
        title: 'Cal Poly Humboldt shapes Arcata / McKinleyville volume',
        detail:
          'Semester transitions concentrate multi-unit load-outs and small-inventory student moves. Book early around academic peaks and confirm building parking rules.',
      },
      {
        title: 'Fog, rain & older coastal stock',
        detail:
          'Damp packing, steep Victorian stairs, and soft shoulders on rural approaches rewrite labor hours. Share stair counts and approach photos on the survey.',
      },
      CA_TIER2_BHGS_BULLET,
    ],
  },
  zonesIntro:
    'Four sharp zones — Eureka core, Arcata/McKinleyville university belt, Fortuna/south 101, and inland/south-county two-lane edges. Limited redundancy means access and timing plans must name the corridor.',
  zones: [
    {
      id: 'eureka-core',
      name: 'Eureka Core & Humboldt Bay Edge',
      shortName: 'Eureka',
      neighborhoods: [
        'Downtown Eureka',
        'Old Town Eureka',
        'Myrtletown edge',
        'Cutten edge',
        'Bay-edge multi-unit corridors',
      ],
      housingTypes:
        'Victorian and early-20th-century SFH, multi-unit, mid-century stock, bay-adjacent denser blocks',
      challenges: [
        'Tight historic grids and limited curb staging',
        'Stairs and narrow halls in older stock',
        'Fog, rain, and damp packing conditions',
        'US-101 / arterial peaks through the city',
      ],
      moverTips:
        'Access-first on Old Town and denser blocks: parking plan and stair counts. Prefer mid-week mornings. Discuss floor protection and moisture-aware packing for older finishes.',
      cityKeywords: [
        'eureka',
        'old town eureka',
        'myrtletown',
        'cutten',
        'humboldt bay',
      ],
    },
    {
      id: 'arcata-mckinleyville',
      name: 'Arcata, McKinleyville & Cal Poly Humboldt Belt',
      shortName: 'Arcata / North',
      neighborhoods: [
        'Arcata',
        'Cal Poly Humboldt–adjacent',
        'McKinleyville',
        'Manila edge',
        'North bay residential',
      ],
      housingTypes:
        'University multi-unit and rentals, SFH tracts, mid-century stock, some newer suburban pockets',
      challenges: [
        'Semester and lease-end multi-unit peaks',
        'Parking scarcity near campus-adjacent stock',
        'CA-255 / 101 timing between Arcata and Eureka',
        'Fog and damp conditions year-round',
      ],
      moverTips:
        'Book early around semester transitions. Confirm elevator status, parking, and building windows for multi-unit. Price Arcata ↔ Eureka as a timed bay-crossing local, not map-mile free.',
      cityKeywords: [
        'arcata',
        'mckinleyville',
        'manila',
        'cal poly humboldt',
        'humboldt state',
        'north humboldt',
      ],
    },
    {
      id: 'fortuna-south101',
      name: 'Fortuna, Rio Dell & South US-101 Towns',
      shortName: 'South 101',
      neighborhoods: [
        'Fortuna',
        'Rio Dell',
        'Scotia edge',
        'South-county 101 corridor towns',
      ],
      housingTypes:
        'Small-city SFH, multi-family, mid-century tracts, timber- and highway-adjacent edges',
      challenges: [
        'US-101 dependence with limited alternate routes',
        'Longer empty miles from Eureka/Arcata staging',
        'Weather-related corridor delays',
        'Varied older-stock access',
      ],
      moverTips:
        'Build 101 delay buffer into Fortuna ↔ Eureka pairs. Early starts reduce weather and traffic risk. Note any industrial or mill-edge adjacency for mid-day freight mix.',
      cityKeywords: [
        'fortuna',
        'rio dell',
        'scotia',
        'south humboldt',
        'us-101 south',
      ],
    },
    {
      id: 'inland-south-edges',
      name: 'Inland CA-299 & Far South Two-Lane Edges',
      shortName: 'Inland / Far South',
      neighborhoods: [
        'Willow Creek',
        'Garberville / Redway approaches',
        'CA-299 inland parcels',
        'Remote south-county 101 edges',
      ],
      housingTypes:
        'Rural SFH, cabin-style stock, redwood-edge parcels, long-driveway homes — many constrained approaches',
      challenges: [
        'Long two-lane empty miles and limited turnaround',
        'Almost no corridor redundancy if 101 or 299 closes',
        'Canopy clearance, soft shoulders, and gates',
        'Cell coverage and dispatch delays on remote parcels',
      ],
      moverTips:
        'Never assume a full-size box reaches the door — measure road width and turnaround. Discuss shuttle or staged transfer for constrained inland/far-south addresses. Prefer flexible dates when storms or fires threaten corridor closures.',
      cityKeywords: [
        'willow creek',
        'garberville',
        'redway',
        'ca-299',
        'far south humboldt',
        'inland humboldt',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Humboldt County',
    intro:
      'Compressed drivers — 101/299 long-local time, limited redundancy risk, university multi-unit peaks, and rural two-lane access.',
    drivers: [
      {
        title: 'US-101 / CA-299 cross-zone & redundancy risk',
        detail:
          'Eureka ↔ Fortuna or Arcata ↔ Willow Creek burns two-lane clock; a single corridor incident can double the day. Hourly billing follows portal-to-portal time plus contingency.',
      },
      {
        title: 'Historic stairs, damp packing & multi-unit long carries',
        detail:
          'Victorian Eureka and campus multi-unit stock add labor hours before miles matter. Get stair and packing scope in writing.',
      },
      {
        title: 'Rural redwood-edge access',
        detail:
          'Long driveways, soft shoulders, and canopy clearance on inland/south edges add shuttle and long-carry fees city tracts never see.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$500–$1,400+',
        note: 'Higher with stairs, multi-unit, or damp-weather packing',
      },
      {
        label: '2–3BR house / small-city tract',
        value: '$1,400–$3,800+',
        note: 'Cross-bay and south-101 pairs trend up',
      },
      {
        label: '3–4+ BR (inland / far-south / long two-lane)',
        value: '$2,200–$6,200+',
        note: 'Remote last-mile and corridor-delay risk price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal intelligence',
    intro:
      'Rain, academic calendars, and corridor weather set risk more than mild coastal temperatures on paper.',
    items: [
      {
        title: 'Peak residential: late spring – early fall weekends',
        detail:
          'School calendars and end-of-month leases fill Saturdays across Eureka and Arcata. Book 2–4 weeks ahead for popular windows.',
      },
      {
        title: 'Cal Poly Humboldt semester transitions',
        detail:
          'Move-in/move-out peaks concentrate multi-unit volume in Arcata and McKinleyville. Book early and confirm building rules.',
      },
      {
        title: 'Storm, slide & fire corridor risk (variable)',
        detail:
          'Winter storms and occasional fire/slide events can close or slow 101 and 299. Build flexibility for long-locals and inland pairs.',
      },
    ],
  },
  specialized: [
    {
      id: 'limited-redundancy',
      title: 'Limited corridor redundancy (US-101 / CA-299)',
      intro:
        'Humboldt’s defining logistics risk is dependence on a thin coastal and inland corridor network with few parallel detours.',
      bullets: [
        'Price long-locals with honest buffer for weather and incident delay — not optimistic map ETAs.',
        'Confirm flexible reschedule language when either address sits south of Fortuna or inland on CA-299.',
        'Ask how crews handle mid-route closures before you deposit on remote pairs.',
      ],
    },
    {
      id: 'cal-poly-humboldt',
      title: 'Cal Poly Humboldt & university multi-unit logistics',
      intro:
        'Arcata/McKinleyville volume tracks academic calendars more than pure residential Bay seasons.',
      bullets: [
        'Book early around semester start/end for campus-adjacent multi-unit.',
        'Confirm elevator reservations, parking plans, and small-inventory student load-outs.',
        'Treat university rentals as their own product — not a Eureka Victorian quote with the city name swapped.',
      ],
    },
    {
      id: 'coastal-rural-access',
      title: 'Coastal historic & rural redwood-edge access',
      intro:
        'Old Town stairs and inland two-lane parcels both need access-first plans Bay freeflow crews underprice.',
      bullets: [
        'Share stair counts, hallway width, and parking distance for Eureka historic stock.',
        'Send driveway, canopy, and turnaround photos for Willow Creek / Garberville-class addresses.',
        'Discuss shuttle options when a full-size box cannot stage at the door.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Humboldt County?',
    intro:
      'Compressed relocator notes — validate schools and healthcare by pocket, then test fog, rain, and realistic 101 drive times before choosing on price alone.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Multiple systems (Eureka City Schools and feeders, Arcata/McKinleyville-area districts, Fortuna Union and south-county systems, inland districts, plus Cal Poly Humboldt for higher ed). Match every listing to the correct boundary.',
        bullets: [
          {
            title: 'Town-first district check',
            detail:
              'Use official district tools and the California School Dashboard. Unincorporated coastal and inland edges can span feeders.',
          },
          {
            title: 'University influence',
            detail:
              'Cal Poly Humboldt shapes rental demand and traffic near Arcata and McKinleyville. Program mix differs sharply from south-county and inland towns.',
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
              'Providence St. Joseph Hospital Eureka and other regional campuses serve the north bay — map ER drive times from Fortuna, Garberville, or Willow Creek, not just Eureka addresses.',
          },
          {
            title: 'Specialty spillover',
            detail:
              'Some households use Bay Area or Sacramento specialty networks. Confirm insurer networks and multi-hour coastal/inland appointment times before choosing a far-south or inland pocket.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Humboldt County resources',
    intro:
      'Local official links first. BHGS, FMCSA, and Move Trust Hub tools are added automatically for licensing checks.',
    items: [
      {
        label: 'County of Humboldt',
        href: 'https://humboldtgov.org/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Eureka',
        href: 'https://www.eurekaca.gov/',
        external: true,
      },
      {
        label: 'City of Arcata',
        href: 'https://www.cityofarcata.org/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter by zone (Eureka, Arcata/North, South 101, Inland/Far South) when available. Confirm corridor redundancy risk, university timing, and rural access photos — this is an independent North Coast hub, not a Bay collar. Distant contrast only: San Francisco guide for long-haul context.',
  lastReviewed: '2026-07-24',
});
