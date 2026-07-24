import {
  finalizeCaTier2Pack,
  CA_TIER2_BHGS_BULLET,
} from '@/lib/local-movers/county-intelligence/ca-tier2-shared';

/**
 * Butte County — California Tier 2 (Chico North Valley independent).
 * Parent: Sacramento County (distant) — regional independence, not a Sac collar clone.
 */
export const butteCountyIntelligence = finalizeCaTier2Pack({
  countySlug: 'butte',
  hubTitle: 'Butte County Moving Intelligence Hub',
  eyebrow: 'Butte County · Chico North Valley independent · CA-99 spine',
  h1: 'Moving in Butte County: Chico North Valley Independent, University Turnover & Valley Heat',
  heroOpener:
    'Butte County is a freestanding North Valley market centered on Chico — not a Sacramento collar suburb with a longer drive, and not a recycled Roseville HOA script. Chico State semester peaks, Oroville seat logistics, Paradise / Magalia rebuild and wildland-urban-interface access, and valley heat on CA-99 define day-to-day work. Sacramento is a distant parent metro for licensing context and long-haul routing — not the local commute product. Quote the pocket: campus multi-unit, Chico suburban SFH, foothill rebuild edge, or south-county ag town — never “Butte County local” as one rate card.',
  heroCredibility:
    'North Valley independent · Chico State turnover · Valley heat · BHGS in-state · FMCSA interstate · Curated listings',
  majorCorridors: 'CA-99 · CA-32 · CA-70 · CA-162',
  parentCompare: {
    parentLabel: 'Sacramento County',
    parentHref: '/local-movers/california/sacramento',
    title: 'How Butte County differs from Sacramento County (distant parent)',
    intro:
      'Butte is a North Valley independent market roughly two hours north of the capital region on CA-99 — not Placer-style Sac collar growth and not a thinner capital-metro zone dump. Use Sacramento as distant parent context for licensing and long-haul routing, not as a drop-in template for Chico logistics.',
    bullets: [
      {
        title: 'Corridor & drive time',
        detail:
          'CA-99 is the north–south spine; CA-32 feeds Chico–Orland and west approaches; CA-70 and CA-162 serve Oroville and foothill pairs. Chico ↔ Sacramento is a long inter-regional haul, not a metro-collar local. In-county Chico ↔ Oroville or Chico ↔ Paradise edges still burn portal-to-portal time that map miles understate.',
      },
      {
        title: 'Housing differences',
        detail:
          'Chico State–adjacent multi-unit and rental turnover, established Chico suburban SFH, Oroville seat stock, Paradise / Magalia rebuild and hillside properties, and south-county small-town / ag-edge homes replace capital-grid multi-unit and South Placer master-planned density. Rebuild and WUI edges are a distinct product Sacramento floor crews rarely price daily.',
      },
      {
        title: 'Truck access, density & constraints',
        detail:
          'Campus multi-unit parking scarcity and lease-end clustering differ from capital elevators. Foothill rebuild pockets need driveway photos, narrow-road plans, and sometimes longer empty miles from Chico staging. Valley heat on open lots is an operational constraint, not a footnote.',
      },
      {
        title: 'Cost posture',
        detail:
          'Same-zone Chico suburban jobs can look valley-simple until heat windows and multi-unit long carries hit. Foothill rebuild access, campus peak calendars, and Chico ↔ Oroville corridor time push prices above flat map-mile assumptions — still secondary-market labor, not capital-core scarcity pricing.',
      },
      {
        title: 'Market role',
        detail:
          'Independent North Valley mid-market: university and healthcare employment in Chico, county-seat volume in Oroville, rebuild/WUI specialty access, and ag-edge towns. Popular long-haul context points toward Sacramento and other North Valley secondaries — not a Sac-collar rate card.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Butte County different',
    intro:
      'Independent North Valley realities — university turnover, foothill rebuild access, valley heat, and California licensing — not Sacramento collar habits.',
    bullets: [
      {
        title: 'Chico State calendars concentrate multi-unit volume',
        detail:
          'Semester start/end and lease turns pack multi-unit and student-adjacent stock. Book early around academic peaks and confirm elevator/parking rules before the crew day.',
      },
      {
        title: 'Paradise / Magalia and foothill edges are access jobs',
        detail:
          'Rebuild and WUI properties often mean grades, limited turnaround, canopy, and longer deadhead from Chico. Share approach photos; never assume a standard suburban driveway plan.',
      },
      {
        title: 'Valley heat is operational, not cosmetic',
        detail:
          'Summer afternoons regularly run extreme on the valley floor. Prefer early starts, shaded staging, and heat-safe packing — mild-weather Bay or coastal habits do not transfer.',
      },
      {
        title: 'Chico, Oroville, and south-county are different products',
        detail:
          'Campus multi-unit, county-seat stock, and Gridley / ag-edge towns do not share truck access or clock time. Name both cities on the estimate.',
      },
      CA_TIER2_BHGS_BULLET,
    ],
  },
  zonesIntro:
    'Four sharp zones — Chico metro/university core, Oroville seat belt, Paradise / Magalia foothill rebuild edge, and south-county / ag-edge towns. Do not collapse them into one “North Valley local.”',
  zones: [
    {
      id: 'chico-metro',
      name: 'Chico Metro & University Core',
      shortName: 'Chico',
      neighborhoods: [
        'Downtown Chico',
        'Chico State–adjacent',
        'North Chico / Barber',
        'Southwest Chico tracts',
        'East Chico / pathways corridors',
      ],
      housingTypes:
        'Multi-unit and student-adjacent rentals, mid-century SFH, denser grid stock, newer suburban tracts',
      challenges: [
        'Semester and lease-end multi-unit clustering',
        'Parking scarcity near campus and downtown',
        'CA-99 / arterial peaks and summer heat on asphalt staging',
      ],
      moverTips:
        'Share elevator status, parking plan, and lease-end timing for multi-unit. Book early around Chico State peaks. Prefer 6–10 a.m. summer starts. Price Chico ↔ Oroville as a timed 99/70 corridor job.',
      cityKeywords: [
        'chico',
        'chico state',
        'downtown chico',
        'north chico',
        'chico ca',
      ],
    },
    {
      id: 'oroville-seat',
      name: 'Oroville & County-Seat Belt',
      shortName: 'Oroville',
      neighborhoods: [
        'Oroville',
        'Thermalito edge',
        'South Oroville',
        'Lake Oroville approaches',
        'CA-70 corridor pockets',
      ],
      housingTypes:
        'Small-city SFH, multi-family, older stock, lake- and foothill-edge homes',
      challenges: [
        'Longer empty miles from Chico staging on many pairs',
        'Mixed older access and hillside edges',
        'CA-70 / valley heat on open lots',
      ],
      moverTips:
        'Treat Oroville ↔ Chico as a long local with honest portal-to-portal time. Confirm driveway and street constraints on older blocks. Early summer starts remain non-negotiable.',
      cityKeywords: [
        'oroville',
        'thermalito',
        'south oroville',
        'oroville ca',
      ],
    },
    {
      id: 'paradise-magalia',
      name: 'Paradise, Magalia & Foothill Rebuild / WUI Edge',
      shortName: 'Paradise / Magalia',
      neighborhoods: [
        'Paradise',
        'Magalia',
        'Paradise upper / ridge edges',
        'Skyway corridor approaches',
        'Wildland-urban-interface pockets',
      ],
      housingTypes:
        'Rebuild SFH, hillside and ridge homes, limited multi-unit, constrained final approaches',
      challenges: [
        'Grade, narrow roads, and limited truck turnaround',
        'Longer deadhead and variable rebuild-site access',
        'Fire-season awareness and weather/air-quality risk',
      ],
      moverTips:
        'Access-first: road width, grade, gates, and turnaround photos before dispatch. Discuss fire-season and air-quality contingency in writing. Do not quote as a flat Chico suburban job.',
      cityKeywords: [
        'paradise',
        'magalia',
        'paradise ca',
        'skyway',
        'upper ridge',
      ],
    },
    {
      id: 'south-county-ag',
      name: 'South County & Ag-Edge Towns',
      shortName: 'South County',
      neighborhoods: [
        'Gridley',
        'Biggs',
        'Durham edge',
        'Richvale edge',
        'South 99 corridor towns',
      ],
      housingTypes:
        'Small-town SFH, farm-edge homes, rural lots, occasional outbuildings',
      challenges: [
        'Empty miles from Chico/Oroville yards',
        'Agricultural traffic and unpaved approaches',
        'Heat + limited shaded staging',
      ],
      moverTips:
        'Price town-to-Chico pairs portal-to-portal. Inventory sheds and soft ground on the survey. Early starts protect crews when valley heat peaks.',
      cityKeywords: [
        'gridley',
        'biggs',
        'durham',
        'richvale',
        'gridley ca',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Butte County',
    intro:
      'Compressed drivers — university multi-unit peaks, foothill rebuild access, heat windows, and Chico ↔ outlying corridor time.',
    drivers: [
      {
        title: 'CA-99 / 70 / 32 cross-zone time',
        detail:
          'Chico ↔ Oroville, Chico ↔ Paradise edges, or south-county legs burn more clock than map miles suggest — especially heat-constrained days. Hourly billing follows the clock.',
      },
      {
        title: 'Campus multi-unit & peak calendar labor',
        detail:
          'Elevator waits, parking scarcity, and semester clustering add hours before boxes move. Book and staff early around academic turns.',
      },
      {
        title: 'Foothill rebuild / WUI access',
        detail:
          'Grades, narrow approaches, long carries, and longer empty miles force delays or smaller-truck plans. Price access explicitly versus flat Chico tracts.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$450–$1,300+',
        note: 'Higher with multi-unit long carries or peak heat windows',
      },
      {
        label: '2–3BR house / suburban Chico',
        value: '$1,400–$3,800+',
        note: 'Campus peaks and cross-town hauls trend up',
      },
      {
        label: '3–4+ BR (foothill rebuild / long corridor)',
        value: '$2,200–$6,500+',
        note: 'WUI access and town-to-metro pairs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal intelligence',
    intro:
      'University calendars, valley heat, and fire/smoke windows set risk more than mild coastal temperatures.',
    items: [
      {
        title: 'Chico State & lease peaks',
        detail:
          'Semester transitions and end-of-month leases fill multi-unit capacity first. Book 2–4 weeks ahead for popular campus-adjacent windows.',
      },
      {
        title: 'Valley heat peak (roughly June – September)',
        detail:
          'Plan early-morning loads, extra water, and heat-safe packing. Mid-afternoon moves in peak heat are high risk for people and property.',
      },
      {
        title: 'Fire season & air quality (variable; often summer – fall)',
        detail:
          'Red-flag and poor air-quality days can pause outdoor packing on foothill and WUI parcels. Build flexibility and written weather/air policies.',
      },
    ],
  },
  specialized: [
    {
      id: 'chico-state-turnover',
      title: 'Chico State university & multi-unit turnover',
      intro:
        'Campus-adjacent density and semester calendars are a distinct product from Oroville SFH or foothill rebuild jobs.',
      bullets: [
        'Align booking with semester and lease-end windows when either household is student- or staff-connected.',
        'Confirm elevator reservations, parking plans, and building rules early.',
        'Treat multi-unit long carries as their own labor line — not a suburban SFH quote with the city name swapped.',
      ],
    },
    {
      id: 'wildfire-rebuild-access',
      title: 'Foothill rebuild & WUI access logistics',
      intro:
        'Paradise, Magalia, and ridge edges need truck-access plans flat valley tracts never see.',
      bullets: [
        'Share driveway width, grade, gates, canopy clearance, and turnaround photos before booking.',
        'Discuss fire-season and air-quality contingency language in writing.',
        'Price empty miles from Chico staging honestly for ridge and rebuild sites.',
      ],
    },
    {
      id: 'valley-heat',
      title: 'North Valley heat logistics',
      intro:
        'Valley-floor heat compresses productive hours — coastal and Bay mild-weather rate cards underweight it.',
      bullets: [
        'Prefer 6–10 a.m. starts in peak summer; treat mid-afternoon loads as high risk.',
        'Request shaded staging and heat-safe packing for electronics and sealed goods.',
        'If the job runs long, discuss split-day options rather than pushing into peak heat.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Butte County?',
    intro:
      'Compressed relocator notes — schools and hospitals by pocket, then test heat tolerance, campus traffic, and foothill access for the address you want.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Multiple systems (Chico Unified, Oroville-area districts, Paradise Unified and other foothill systems, Gridley and south-county districts, and others). Match every listing to the correct boundary.',
        bullets: [
          {
            title: 'Town-first district check',
            detail:
              'Use official district tools and the California School Dashboard. Unincorporated and rebuild edges can span feeders.',
          },
          {
            title: 'Chico State & community college context',
            detail:
              'California State University, Chico shapes rental demand and traffic near campus. Do not treat county averages as neighborhood truth for enrollment pressure.',
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
              'Enloe Medical Center (Chico) and Oroville Hospital / other south-county services cover different pockets — map ER drive times at rush hour, especially for foothill pairs.',
          },
          {
            title: 'Specialty spillover',
            detail:
              'Some residents use Sacramento specialty systems for complex care. Confirm insurer networks and realistic CA-99 drive times before choosing a far-foothill-only address.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Butte County resources',
    intro:
      'Local official links first. BHGS, FMCSA, and Move Trust Hub tools are added automatically for licensing checks.',
    items: [
      {
        label: 'County of Butte',
        href: 'https://www.buttecounty.net/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Chico',
        href: 'https://www.chico.ca.us/',
        external: true,
      },
      {
        label: 'City of Oroville',
        href: 'https://www.cityoforoville.org/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter by zone (Chico, Oroville, Paradise/Magalia, South County) when available. Confirm campus timing, heat windows, and foothill access photos — this is a North Valley independent market, not a Sacramento collar clone.',
  lastReviewed: '2026-07-24',
});
