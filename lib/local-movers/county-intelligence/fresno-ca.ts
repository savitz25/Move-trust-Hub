import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Fresno County moving intelligence.
 * Used by /local-movers/california/fresno and the shared intelligence template.
 *
 * Differentiators vs Sacramento / generic Valley: Fresno metro + Clovis growth,
 * extreme summer heat, agricultural economy and rural-edge properties, Hwy 99/41/180
 * corridors, inbound from coastal high-cost markets — not capital-region or Bay Area.
 */
export const fresnoCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'california',
  countySlug: 'fresno',
  hubTitle: 'Fresno County Moving Intelligence Hub',
  eyebrow: 'Fresno County · Central Valley guide',
  h1: 'Moving in Fresno County: Central Valley Heat, Clovis Growth & Zone Guide',
  heroOpener:
    'Fresno County is anchored by the city of Fresno — one of California’s largest inland cities — plus strong suburban growth in Clovis and a ring of agricultural towns from Sanger and Reedley to Selma, Kerman, and the Coalinga edge. Relative to coastal Southern California and the Bay Area, housing is more affordable, so inbound families and workers arrive seeking space — then meet summer days that frequently top 100°F+. Urban core streets, postwar tracts, newer planned neighborhoods, and farm-edge properties are different logistics jobs. Highway 99, Highway 41, and Highway 180 set cross-town timing. This guide is for people moving in Fresno County — not generic “inland California” tips or a Sacramento script with the city name swapped.',
  heroCredibility:
    'Central Valley heat-aware · Urban–suburban–ag edge · Intrastate CA (BHGS) · FMCSA when interstate · Curated listings',
  whatMakesDifferent: {
    title: 'What makes moving in Fresno County different',
    intro:
      'These are the Central Valley realities that change estimates and schedules — extreme heat, affordability-driven inbound volume, and the urban-to-agricultural gradient.',
    bullets: [
      {
        title: 'Extreme summer heat is an operational constraint',
        detail:
          'June–September afternoons regularly hit 100°F+. Heat stresses crews, electronics, candles, and sealed packaging. Prefer 6–10 a.m. load windows in peak summer, request shaded staging, and avoid mid-afternoon moves when possible. Good crews plan water and heat-safe packing without you having to ask twice.',
      },
      {
        title: 'Affordability magnet from coastal California',
        detail:
          'Relative to LA, Orange County, and the Bay Area, Fresno County still offers more house for the money. Inbound transplants fill Clovis and north Fresno inventory in spring/summer and end-of-month windows — book popular Saturdays early.',
      },
      {
        title: 'Agricultural economy shapes the edges',
        detail:
          'Surrounding communities and rural-edge properties can involve longer approaches, equipment sheds, workshops, and different driveway patterns than a city tract. Mention outbuildings and unpaved access on the survey so the crew sizes labor correctly.',
      },
      {
        title: 'Urban core vs Clovis growth vs farm towns',
        detail:
          'Central Fresno multi-unit and older SFH jobs differ from Clovis planned suburbs and from Sanger/Reedley/Selma/Kerman edges. “Fresno County local” is too vague — put both cities in the estimate assumptions.',
      },
      {
        title: 'Growing HOA presence in newer tracts',
        detail:
          'Newer Clovis and north/northeast Fresno developments increasingly require Certificates of Insurance, approved hours, and floor protection. Treat the HOA packet as part of the survey when applicable.',
      },
      {
        title: 'Highway 99 / 41 / 180 timing is a line item',
        detail:
          'Cross-town pairs (e.g. Clovis ↔ southwest Fresno, or Fresno ↔ Selma) can burn more time than map miles suggest at peak commute and school hours. Ask whether quotes are portal-to-portal.',
      },
      {
        title: 'More staging space — still not “easy mode”',
        detail:
          'Many suburban streets offer better driveway staging than coastal cities, but heat, longer suburban distances, and agricultural-edge access still drive labor time and scheduling.',
      },
      {
        title: 'California intrastate rules (BHGS)',
        detail:
          'Moves entirely within California are generally overseen by the California Bureau of Household Goods and Services (BHGS). Interstate legs (e.g. Fresno → Phoenix or out of state) need FMCSA authority. Confirm which license applies to your exact origin and destination.',
      },
    ],
  },
  zonesIntro:
    'Treat each zone as its own access and climate problem. Central Fresno density, Clovis planned growth, and surrounding ag towns are not interchangeable — heat and distance define the job more than generic Valley advice.',
  zones: [
    {
      id: 'central-fresno',
      name: 'Central / Urban Fresno',
      shortName: 'Central Fresno',
      neighborhoods: [
        'Downtown Fresno',
        'Tower District',
        'Huntington Blvd area',
        'Central multi-unit corridors',
        'Older grid neighborhoods',
      ],
      housingTypes:
        'Older SFH, multi-unit buildings, mid-century stock, some loft/adaptive reuse, denser street grids',
      challenges: [
        'Tighter street parking and multi-unit long carries',
        'Elevator/COI rules in some multi-unit buildings',
        'Hwy 41 / 99 / 180 approaches into the core',
        'Peak heat on asphalt staging without shade',
      ],
      moverTips:
        'Confirm building rules for multi-unit. Weekday mornings beat heat and commute peaks. Inventory stairs carefully in older multi-story stock. Share parking constraints on denser blocks.',
      cityKeywords: [
        'downtown fresno',
        'tower district',
        'central fresno',
        'huntington',
        'fresno',
      ],
    },
    {
      id: 'north-fresno',
      name: 'North Fresno & Woodward Park area',
      shortName: 'North Fresno',
      neighborhoods: [
        'Woodward Park',
        'River Park edge',
        'North Fresno tracts',
        'Fig Garden edge',
        'Milburn / Nees corridors',
      ],
      housingTypes:
        'Suburban SFH, some townhomes, established and newer tracts, tree-lined neighborhoods',
      challenges: [
        'Cross-town travel to Clovis or south/west Fresno at peak',
        'Summer heat on open suburban streets',
        'Growing multi-family pockets with building rules',
        'School-hour arterial congestion',
      ],
      moverTips:
        'Early summer starts are critical. Clarify North Fresno ↔ Clovis or North ↔ southwest pairs for honest drive time. Inventory carefully — suburban volume often runs higher than coastal condos.',
      cityKeywords: [
        'woodward park',
        'north fresno',
        'river park',
        'fig garden',
        'nees',
        'herndon',
      ],
    },
    {
      id: 'clovis-ne',
      name: 'Clovis & Northeast',
      shortName: 'Clovis / NE',
      neighborhoods: [
        'Clovis',
        'Old Town Clovis edge',
        'Northeast growth areas',
        'Harlan Ranch edge',
        'Temperance / Shepherd corridors',
      ],
      housingTypes:
        'Strong mix of established SFH and newer master-planned communities, townhomes, multi-family',
      challenges: [
        'HOA COI and approved-hour rules in newer villages',
        'High family-move volume on summer weekends',
        'Arterial congestion toward Fresno core',
        'Heat + longer local distances to west/south Fresno',
      ],
      moverTips:
        'Clovis growth areas are increasingly HOA-first — send management packets with the estimate. Mid-week mornings beat heat and school traffic. Book May–August Saturdays early for family moves.',
      cityKeywords: [
        'clovis',
        'harlan ranch',
        'northeast fresno',
        'temperance',
        'shepherd',
        'old town clovis',
      ],
    },
    {
      id: 'east-sunnyside',
      name: 'East Fresno & Sunnyside',
      shortName: 'East / Sunnyside',
      neighborhoods: [
        'Sunnyside',
        'Southeast Fresno',
        'Kings Canyon corridor',
        'Fowler edge',
      ],
      housingTypes:
        'Suburban SFH, multi-family, mid-century and later tracts, some agricultural-edge transitions',
      challenges: [
        'Hwy 180 / Kings Canyon corridor timing',
        'Heat and longer carries on larger lots',
        'Transition to rural edges toward Sanger/Reedley',
        'Cross-town peaks toward Clovis and north Fresno',
      ],
      moverTips:
        'Clarify whether the address is still city/suburban or ag-edge. Share driveway and gate details for larger lots. Early starts in summer remain the best operational plan.',
      cityKeywords: [
        'sunnyside',
        'east fresno',
        'southeast fresno',
        'kings canyon',
        'fowler',
      ],
    },
    {
      id: 'west-sw-fresno',
      name: 'West / Southwest Fresno',
      shortName: 'West / SW Fresno',
      neighborhoods: [
        'West Fresno',
        'Southwest Fresno',
        'Highway 99 west side',
        'Industrial-edge residential pockets',
      ],
      housingTypes:
        'Mix of older SFH, multi-family, working neighborhoods, some newer infill',
      challenges: [
        'Hwy 99 freight and commute congestion',
        'Tighter budgets and varied property access',
        'Heat on open lots with limited shade',
        'Cross-town travel to Clovis/north Fresno at peak',
      ],
      moverTips:
        'Build 99 corridor timing into west↔east pairs. Confirm parking and long-carry needs for multi-unit. Summer heat still favors dawn starts even when the map looks “short.”',
      cityKeywords: [
        'west fresno',
        'southwest fresno',
        'westside fresno',
        'highway 99',
      ],
    },
    {
      id: 'ag-surround',
      name: 'Surrounding agricultural & smaller communities',
      shortName: 'Ag / Small towns',
      neighborhoods: [
        'Sanger',
        'Reedley',
        'Selma',
        'Kerman',
        'Kingsburg edge',
        'Coalinga edge',
        'Parlier / Orange Cove edge',
      ],
      housingTypes:
        'Small-town SFH, rural-edge homes, farm/ranch-adjacent properties, occasional outbuildings',
      challenges: [
        'Longer approaches and empty miles from Fresno/Clovis staging',
        'Unpaved or constrained rural driveways',
        'Agricultural traffic and seasonal road use',
        'Limited local services on remote legs',
      ],
      moverTips:
        'Treat town-to-Fresno pairs as long locals with honest portal-to-portal time. Mention sheds, shops, and unpaved access on the survey. Heat + rural sun exposure makes early starts non-negotiable in summer.',
      cityKeywords: [
        'sanger',
        'reedley',
        'selma',
        'kerman',
        'kingsburg',
        'coalinga',
        'parlier',
        'orange cove',
        'fowler',
        'firebaugh',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Fresno County',
    intro:
      'Two “local” moves of the same square footage can differ depending on heat windows, suburban distance, HOA soft costs, and whether the job is city tract or agricultural-edge.',
    drivers: [
      {
        title: 'Heat-constrained work windows',
        detail:
          'Summer heat compresses productive hours into mornings. Jobs that slip into peak afternoon heat may need more labor days or premium scheduling.',
      },
      {
        title: 'Cross-town and town-to-metro distance',
        detail:
          'Clovis ↔ southwest Fresno or Fresno ↔ Reedley/Selma can burn more portal-to-portal time than map miles suggest at peak.',
      },
      {
        title: 'HOA soft costs in newer tracts',
        detail:
          'COI and approved hours in Clovis/northeast growth areas add paperwork and can force weekday-only windows.',
      },
      {
        title: 'Agricultural-edge access',
        detail:
          'Longer approaches, outbuildings, and unpaved driveways add labor and vehicle risk — price them explicitly.',
      },
      {
        title: 'Inbound coastal calendars',
        detail:
          'Bay Area and Southern California transplants concentrate demand in spring/summer and end-of-month windows — book early for popular Saturdays.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$500–$1,200+',
        note: 'Higher with multi-unit long carries or peak heat windows',
      },
      {
        label: '2–3BR house / planned community',
        value: '$1,500–$3,600+',
        note: 'HOA soft costs and cross-town hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / ag-edge)',
        value: '$2,200–$5,500+',
        note: 'Town-to-metro and rural-edge jobs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$105–$165+/hr',
        note: 'Portal-to-portal; packing and 3-person crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, heat & calendar intelligence',
    intro:
      'Fresno peaks follow extreme heat, school calendars, agricultural cycles, and inbound coastal moves — not coastal marine layers.',
    items: [
      {
        title: 'Summer heat peak: roughly June – September',
        detail:
          'Plan early-morning loads, extra water, and heat-safe packing. Mid-afternoon moves in peak heat are high risk for people and property.',
      },
      {
        title: 'School & family calendars',
        detail:
          'Late spring through early fall weekends fill first for family SFH moves in Clovis and north Fresno. Book 2–4 weeks ahead for Saturdays.',
      },
      {
        title: 'Agricultural seasonal rhythm',
        detail:
          'Harvest and ag employment patterns can affect surrounding towns’ housing turnover and road use. Rural-edge jobs still need flexible timing around local activity.',
      },
      {
        title: 'Coastal inbound spring–summer wave',
        detail:
          'Households leaving higher-cost coastal markets often time moves around school years — suburban inventory books early.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start',
        detail:
          'Still plan around HOA weekday windows when applicable. Early starts win even in shoulder seasons when freeways are the real constraint.',
      },
    ],
  },
  resources: {
    title: 'Practical Fresno County resources',
    intro:
      'Official links and licensing notes — HOA, heat safety, and city rules change; verify before move day.',
    items: [
      {
        label: 'City of Fresno',
        href: 'https://www.fresno.gov/',
        note: 'City services; building HOA rules are separate',
        external: true,
      },
      {
        label: 'City of Clovis',
        href: 'https://cityofclovis.com/',
        external: true,
      },
      {
        label: 'Fresno County — official site',
        href: 'https://www.fresnocountyca.gov/',
        external: true,
      },
      {
        label: 'Caltrans District 6 — road conditions',
        href: 'https://dot.ca.gov/caltrans-near-me/district-6',
        note: 'Hwy 99 / 41 / 180 corridor awareness',
        external: true,
      },
      {
        label: 'NWS heat safety',
        href: 'https://www.weather.gov/safety/heat',
        note: 'Plan early loads when heat risk is elevated',
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
        label: 'PG&E — start/stop service (much of the region)',
        href: 'https://www.pge.com/',
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
    'Filter listings by zone (Central Fresno, North Fresno, Clovis/NE, East/Sunnyside, West/SW, Ag/small towns) when available. Confirm heat-window plans and town-to-metro drive assumptions — especially for summer and agricultural-edge moves.',
  lastReviewed: '2026-07-22',
};
