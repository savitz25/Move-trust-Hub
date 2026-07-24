import {
  finalizeCaTier2Pack,
  CA_TIER2_BHGS_BULLET,
} from '@/lib/local-movers/county-intelligence/ca-tier2-shared';

/**
 * Merced County — California Tier 2 (Merced / UC Merced Valley market).
 * Parent: Fresno County (+ Stanislaus contrast). Not a Fresno clone; HSR only as planning context.
 */
export const mercedCountyIntelligence = finalizeCaTier2Pack({
  countySlug: 'merced',
  hubTitle: 'Merced County Moving Intelligence Hub',
  eyebrow: 'Merced County · UC Merced Valley market · CA-99 spine',
  h1: 'Moving in Merced County: UC Merced Growth, Valley Ag Logistics & CA-99 Market',
  heroOpener:
    'Merced County is a Central Valley secondary built around the City of Merced and UC Merced growth, west-side Los Banos logistics on CA-152, and ag-town volume along CA-99 — not Fresno with the names swapped, and not a Bay spillover suburb. University semester peaks, valley heat, farm-edge last-mile, and 99 freight rhythm define the product. High-speed rail appears in corridor planning discussions for the broader San Joaquin Valley; do not invent operating HSR service or station logistics that are not part of a residential move day. Quote the pocket: UC-adjacent multi-unit, Merced suburban SFH, Los Banos west side, or ag-edge town — never “Merced County local” alone.',
  heroCredibility:
    'UC Merced Valley market · Ag logistics · Valley heat · BHGS in-state · FMCSA interstate · Curated listings',
  majorCorridors: 'CA-99 · CA-140 · CA-59 · CA-152 · CA-165',
  parentCompare: {
    parentLabel: 'Fresno County',
    parentHref: '/local-movers/california/fresno',
    title: 'How Merced County differs from Fresno County (and Stanislaus contrast)',
    intro:
      'Merced is a smaller Valley secondary north of Fresno’s mid-metro scale — UC Merced growth and west-side Los Banos pairs are its own ladder. Stanislaus (Modesto) is the northern valley contrast for some households; neither is a drop-in template for Merced university multi-unit or CA-152 west-side jobs.',
    bullets: [
      {
        title: 'Corridor & drive time',
        detail:
          'CA-99 is the north–south spine; CA-140 and CA-59 serve Merced metro and Yosemite-approach edges; CA-152 and CA-165 feed Los Banos and west-side pairs. Merced ↔ Fresno is a timed 99 long-local; Merced ↔ Los Banos is a classic underquoted cross-county haul; Merced ↔ Modesto is a Stanislaus-contrast corridor, not Fresno freeflow.',
      },
      {
        title: 'Housing differences',
        detail:
          'UC Merced–adjacent multi-unit and rental turnover, City of Merced suburban SFH, Atwater / Livingston / Delhi 99-town stock, and Los Banos west-side tracts replace Fresno–Clovis planned-growth scale. Ag-edge outbuildings and unpaved approaches are normal outside metro cores.',
      },
      {
        title: 'Truck access, density & constraints',
        detail:
          'Campus multi-unit parking and lease-end clustering differ from Clovis HOA villages. West-side and farm-edge jobs add empty miles, gates, and soft ground. Valley heat on open lots is operational. Do not import Fresno metro yard density assumptions into rural Merced pairs.',
      },
      {
        title: 'Cost posture',
        detail:
          'Same-zone Merced suburban jobs can look valley-simple until heat windows and multi-unit long carries hit. UC peak calendars, Merced ↔ Los Banos corridor time, and ag-edge access push prices above flat map-mile assumptions — secondary-market labor with heat and distance premiums, not coastal scarcity pricing.',
      },
      {
        title: 'Market role',
        detail:
          'UC Merced Valley secondary: university and public-sector employment in Merced, ag and logistics volume on 99 and west-side corridors. Popular long-haul context points toward Fresno and Stanislaus secondaries — not a Fresno–Clovis rate card alone. Treat any HSR narrative as proposed/corridor planning context only, not active move-day infrastructure.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Merced County different',
    intro:
      'Valley secondary realities — UC Merced turnover, ag last-mile, extreme heat, and California licensing — not Fresno mid-metro or Bay collar habits.',
    bullets: [
      {
        title: 'UC Merced calendars concentrate multi-unit volume',
        detail:
          'Semester start/end and lease turns pack campus-adjacent multi-unit. Book early around academic peaks and confirm elevator/parking rules before the crew day.',
      },
      {
        title: 'Merced metro vs Los Banos west side vs 99 towns',
        detail:
          'City of Merced SFH, Los Banos CA-152 logistics, and Atwater/Livingston ag-edge stock do not share clock time. Name both cities — “Merced County local” fails across the valley floor.',
      },
      {
        title: 'Valley heat is an operational constraint',
        detail:
          'Summer afternoons regularly top extreme temperatures. Prefer early starts, shaded staging, and heat-safe packing — coastal mild-weather habits do not transfer.',
      },
      {
        title: 'Ag economy shapes edge logistics',
        detail:
          'Farm-edge properties bring longer approaches, equipment sheds, and seasonal road use. Inventory outbuildings and unpaved access on the survey.',
      },
      CA_TIER2_BHGS_BULLET,
    ],
  },
  zonesIntro:
    'Four sharp zones — Merced metro / UC Merced, Los Banos west side, Atwater–Livingston 99 belt, and south/east ag-edge towns. Heat and empty miles define many pairs.',
  zones: [
    {
      id: 'merced-uc',
      name: 'Merced Metro & UC Merced Growth',
      shortName: 'Merced / UC',
      neighborhoods: [
        'Downtown Merced',
        'UC Merced–adjacent',
        'North Merced tracts',
        'South Merced / industrial edge',
        'CA-99 / CA-140 corridors',
      ],
      housingTypes:
        'Multi-unit and student-adjacent rentals, mid-century SFH, newer suburban tracts, denser grid stock',
      challenges: [
        'Semester and lease-end multi-unit clustering',
        'Parking scarcity near campus and denser blocks',
        'CA-99 peaks and summer heat on asphalt staging',
      ],
      moverTips:
        'Share elevator status, parking plan, and lease-end timing for multi-unit. Book early around UC Merced peaks. Prefer 6–10 a.m. summer starts. Price Merced ↔ Los Banos as a timed 152/99 corridor job.',
      cityKeywords: [
        'merced',
        'uc merced',
        'downtown merced',
        'north merced',
        'merced ca',
      ],
    },
    {
      id: 'los-banos-west',
      name: 'Los Banos & West-Side CA-152 Belt',
      shortName: 'Los Banos',
      neighborhoods: [
        'Los Banos',
        'West-side tracts',
        'CA-152 corridor',
        'San Luis Reservoir approaches',
        'West county commercial edge',
      ],
      housingTypes:
        'Suburban SFH, multi-family, planned pockets, west-side working neighborhoods',
      challenges: [
        'Long empty miles from Merced metro staging on many pairs',
        'CA-152 freight and commute timing',
        'Heat on open lots with limited shade',
      ],
      moverTips:
        'Treat Los Banos ↔ Merced as a long local with honest portal-to-portal time. Confirm whether a pure local rate card still applies. Early summer starts are non-negotiable.',
      cityKeywords: [
        'los banos',
        'los baños',
        'los banos ca',
        'highway 152',
      ],
    },
    {
      id: 'atwater-livingston',
      name: 'Atwater, Livingston & North 99 Belt',
      shortName: 'Atwater / Livingston',
      neighborhoods: [
        'Atwater',
        'Livingston',
        'Delhi edge',
        'Winton edge',
        'CA-99 north corridor towns',
      ],
      housingTypes:
        'Small-city SFH, multi-family, ag-adjacent edges, older and newer tracts',
      challenges: [
        '99 freight and commute congestion',
        'Town-to-Merced portal time understated by map miles',
        'Heat + varied property access',
      ],
      moverTips:
        'Build 99 corridor timing into Atwater/Livingston ↔ Merced pairs. Inventory multi-unit long carries carefully. Early starts beat heat and school traffic.',
      cityKeywords: [
        'atwater',
        'livingston',
        'delhi',
        'winton',
        'atwater ca',
      ],
    },
    {
      id: 'ag-edge-south',
      name: 'South / East Ag-Edge Towns',
      shortName: 'Ag-edge',
      neighborhoods: [
        'Dos Palos',
        'Gustine edge',
        'Planada edge',
        'Le Grand edge',
        'Chowchilla-adjacent south edges',
      ],
      housingTypes:
        'Small-town SFH, farm/ranch-adjacent properties, rural lots, occasional outbuildings',
      challenges: [
        'Longer approaches and empty miles from Merced staging',
        'Unpaved or constrained rural driveways',
        'Agricultural traffic and seasonal road use',
      ],
      moverTips:
        'Mention sheds, shops, gates, and unpaved access on the survey. Price town-to-metro pairs portal-to-portal. Early starts protect crews in peak heat.',
      cityKeywords: [
        'dos palos',
        'gustine',
        'planada',
        'le grand',
        'dos palos ca',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Merced County',
    intro:
      'Compressed drivers — heat windows, UC multi-unit peaks, Merced ↔ Los Banos / 99 town distance, and ag-edge access.',
    drivers: [
      {
        title: 'Heat-constrained work windows',
        detail:
          'Summer heat compresses productive hours into mornings. Jobs that slip into peak afternoon heat may need more labor days or premium scheduling.',
      },
      {
        title: 'Cross-zone 99 / 152 / 140 distance',
        detail:
          'Merced ↔ Los Banos or Merced ↔ Atwater/Livingston can burn more portal-to-portal time than map miles suggest at peak — freer than Bay freeways, still billable.',
      },
      {
        title: 'UC multi-unit & ag-edge access',
        detail:
          'Campus parking scarcity, elevators, long rural approaches, and outbuildings add labor before boxes move. Price them explicitly versus pure suburban driveway jobs.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$450–$1,250+',
        note: 'Higher with multi-unit long carries or peak heat windows',
      },
      {
        label: '2–3BR house / suburban Merced',
        value: '$1,400–$3,600+',
        note: 'Campus peaks and cross-town hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / west side / ag-edge)',
        value: '$2,200–$5,800+',
        note: 'Los Banos pairs and rural-edge jobs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal & heat calendar intelligence',
    intro:
      'UC calendars, extreme heat, and ag-edge rhythm set risk — not coastal marine layers or Fresno–Clovis scale alone.',
    items: [
      {
        title: 'UC Merced & lease peaks',
        detail:
          'Semester transitions and end-of-month leases fill multi-unit capacity first. Book 2–4 weeks ahead for popular campus-adjacent windows.',
      },
      {
        title: 'Summer heat peak: roughly June – September',
        detail:
          'Plan early-morning loads, extra water, and heat-safe packing. Mid-afternoon moves in peak heat are high risk for people and property.',
      },
      {
        title: 'Ag freight & harvest rhythm',
        detail:
          'Agricultural peaks increase commercial truck volume on valley roads and 99/152 approaches. Build buffer mid-day on farm-adjacent corridors.',
      },
    ],
  },
  specialized: [
    {
      id: 'uc-merced-turnover',
      title: 'UC Merced university & multi-unit turnover',
      intro:
        'Campus-adjacent density and semester calendars are a distinct product from Los Banos SFH or ag-edge jobs.',
      bullets: [
        'Align booking with semester and lease-end windows when either household is student- or staff-connected.',
        'Confirm elevator reservations, parking plans, and building rules early.',
        'Treat multi-unit long carries as their own labor line — not a suburban SFH quote with the city name swapped.',
      ],
    },
    {
      id: 'ag-logistics-last-mile',
      title: 'Ag logistics & farm-edge last-mile',
      intro:
        '99-town and rural parcels are not interchangeable with Merced cul-de-sacs — empty miles and access define the job.',
      bullets: [
        'Price portal-to-portal time honestly for metro ↔ Los Banos / Atwater / Dos Palos pairs.',
        'Note sheds, shops, gates, and unpaved approaches on the survey before dispatch.',
        'Build buffer for agricultural and freight traffic mid-day on valley arterials.',
      ],
    },
    {
      id: 'valley-heat-hsr-context',
      title: 'Valley heat logistics (and HSR planning context only)',
      intro:
        'Heat is the daily operational constraint. High-speed rail may appear in regional corridor planning — it is not an active residential move-day service assumption.',
      bullets: [
        'Prefer 6–10 a.m. starts in peak summer; treat mid-afternoon loads as high risk.',
        'Request shaded staging and heat-safe packing for electronics and sealed goods.',
        'If discussing long-term relocation near proposed HSR corridor planning areas, verify current construction and access impacts locally — do not assume operating high-speed service or station-side mover logistics.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Merced County?',
    intro:
      'Compressed relocator notes — schools and hospitals by pocket, then plan for valley heat, UC traffic, and west-side vs east-side drive times.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Multiple systems (Merced City School District and Merced Union High pathways, Los Banos Unified, Atwater / Livingston / Delhi-area districts, and others). Match every listing to the correct boundary.',
        bullets: [
          {
            title: 'Town-first district check',
            detail:
              'Use official district tools and the California School Dashboard. Marketing city names and unincorporated pockets can span feeders.',
          },
          {
            title: 'UC Merced growth pressure',
            detail:
              'University expansion shapes rental demand and some neighborhood traffic near campus. Do not treat county averages as neighborhood truth for enrollment pressure.',
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
              'Dignity Health Mercy Medical Center (Merced) and other valley facilities serve the metro core; Los Banos and far ag-edge towns mean longer drives — map ER times at rush hour from your target neighborhood.',
          },
          {
            title: 'Specialty spillover',
            detail:
              'Some residents use Fresno or Modesto specialty systems. Confirm insurer networks and realistic CA-99 appointment times before choosing a far west-side or rural-only address.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Merced County resources',
    intro:
      'Local official links first. BHGS, FMCSA, and Move Trust Hub tools are added automatically for licensing checks.',
    items: [
      {
        label: 'County of Merced',
        href: 'https://www.countyofmerced.com/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Merced',
        href: 'https://www.cityofmerced.gov/',
        external: true,
      },
      {
        label: 'City of Los Banos',
        href: 'https://www.losbanos.org/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter by zone (Merced/UC, Los Banos, Atwater/Livingston, Ag-edge) when available. Confirm heat windows, UC timing, and west-side portal time — parent context is Fresno, with Stanislaus as northern contrast. Treat HSR as proposed/corridor planning only.',
  lastReviewed: '2026-07-24',
});
