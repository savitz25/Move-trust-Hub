import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted San Bernardino County moving intelligence.
 * Used by /local-movers/california/san-bernardino and the shared intelligence template.
 *
 * Differentiators: extreme land area (one of the largest U.S. counties), valley vs
 * high desert vs mountain vs remote Mojave, military remoteness (Fort Irwin, 29 Palms,
 * MCLB Barstow), IE warehouse traffic — not interchangeable with Riverside coastal IE tips.
 */
export const sanBernardinoCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'california',
  countySlug: 'san-bernardino',
  hubTitle: 'San Bernardino County Moving Intelligence Hub',
  eyebrow: 'San Bernardino County · Valley · Desert · Mountains',
  h1: 'Moving in San Bernardino County: Valley, High Desert & Mountain Zone Guide',
  heroOpener:
    'San Bernardino County is the fifth-most populous county in California (~2.22–2.23 million people) and one of the largest counties in the United States by land area. “Local” here can mean a Fontana tract hop — or a 90–120+ minute climb to Big Bear, a windy high-desert haul to Victorville, or a remote logistics day toward Fort Irwin or Twentynine Palms. The West Valley shares Inland Empire warehouse freeways (I-10, I-15, I-215, SR-210); the High Desert brings heat, dust, and long grades on I-15; mountain communities add steep roads, winter weather, and tight cabin access; the Morongo Basin sits on SR-62 with military and park tourism rhythms. More affordable than coastal LA and Orange County, it draws inbound movers who then discover that zone-to-zone distance and climate dominate the job. This guide is built for San Bernardino County — not generic Inland Empire filler.',
  heroCredibility:
    'Valley · High Desert · Mountains · Military remote · Intrastate CA (BHGS) · FMCSA when interstate · Curated listings',
  whatMakesDifferent: {
    title: 'What makes moving in San Bernardino County different',
    intro:
      'These are the realities of an enormous, multi-climate county — size, elevation, heat, and remote bases change estimates more than square footage alone.',
    bullets: [
      {
        title: 'Extreme size: four environments, one county name',
        detail:
          'West Valley urban/suburban corridors, High Desert cities, San Bernardino Mountains communities, and Morongo Basin / remote Mojave are different truck-access, weather, and HOA problems. A Rancho Cucamonga condo move and a Lake Arrowhead cabin move should never share the same assumptions.',
      },
      {
        title: 'Affordability pull from coastal counties',
        detail:
          'Relative to Los Angeles and Orange County housing costs, San Bernardino still attracts inbound families and buyers seeking space. Spring/summer and end-of-month calendars stay busy in the West Valley and High Desert — book popular Saturdays early.',
      },
      {
        title: 'Valley logistics & warehouse traffic',
        detail:
          'Ontario, Fontana, San Bernardino, and nearby corridors sit next to major distribution networks. I-10, I-15, I-215, and SR-210 carry heavy tractor-trailer volume. Mid-day mid-week can stall “short” local hops near industrial clusters — build buffer into ETAs.',
      },
      {
        title: 'High-desert heat, wind, and dust',
        detail:
          'Victorville, Hesperia, Apple Valley, Adelanto, and Barstow see extreme summer heat and frequent wind. Protect electronics and finishes, prefer early starts (often 6–10 a.m. in peak summer), and avoid sealed trucks baking in afternoon sun.',
      },
      {
        title: 'Mountain grades, weather, and access',
        detail:
          'Big Bear, Lake Arrowhead, Running Springs, and Crestline involve steep grades (SR-18 and related routes), narrow roads, limited staging, and winter storms that can bring chains, delays, or closures. Share driveway photos, truck length limits, and weather-flexible dates for mountain moves.',
      },
      {
        title: 'Military remoteness is a logistics plan',
        detail:
          'Fort Irwin National Training Center, MCAGCC Twentynine Palms, and MCLB Barstow sit far from West Valley staging. PCS and training calendars, base access, long empty miles, and limited local services all affect cost and timing. Confirm gate rules and whether travel is billed portal-to-portal to/from the valley.',
      },
      {
        title: 'HOAs growing in newer tracts — cabins are the opposite problem',
        detail:
          'Newer West Valley and High Desert planned communities increasingly want COIs and gate lists. Mountain properties more often fail on truck size, turn radius, and parking than paperwork. Match the crew’s experience to the property type.',
      },
      {
        title: 'California intrastate rules (BHGS)',
        detail:
          'Moves entirely within California are generally overseen by the California Bureau of Household Goods and Services (BHGS). Interstate legs need FMCSA authority. Confirm which license applies to your exact origin and destination.',
      },
    ],
  },
  zonesIntro:
    'Treat each zone as its own climate and access problem. Valley freeways, high-desert wind, mountain grades, and remote bases are not interchangeable — San Bernardino County’s size is the defining constraint.',
  zones: [
    {
      id: 'west-valley',
      name: 'West Valley / Urban Core',
      shortName: 'West Valley',
      neighborhoods: [
        'San Bernardino',
        'Fontana',
        'Rialto',
        'Colton',
        'Grand Terrace',
        'Loma Linda',
        'Highland',
      ],
      housingTypes:
        'Older urban neighborhoods, multi-family, tract suburbs, medical-adjacent housing (Loma Linda), mixed HOA presence',
      challenges: [
        'I-10 / I-215 / I-15 warehouse and through traffic',
        'Varied street access in older San Bernardino neighborhoods',
        'Cross-city “local” hops that still burn time in peak IE congestion',
        'Summer valley heat (less extreme than high desert, still operational)',
      ],
      moverTips:
        'Clarify exact city pairs for drive time. Near industrial corridors, avoid mid-day peaks when possible. Older multi-unit buildings may need long carries and stair protection more often than elevators.',
      cityKeywords: [
        'san bernardino',
        'fontana',
        'rialto',
        'colton',
        'grand terrace',
        'loma linda',
        'highland',
        'bloomington',
        'muscoy',
      ],
    },
    {
      id: 'nw-corridor',
      name: 'Northwest / Rancho Cucamonga–Ontario Corridor',
      shortName: 'RC–Ontario Corridor',
      neighborhoods: [
        'Rancho Cucamonga',
        'Ontario',
        'Upland',
        'Chino',
        'Chino Hills',
        'Montclair',
        'Ontario Ranch',
      ],
      housingTypes:
        'Large newer tract and planned communities, master-planned HOAs, multi-family near freeways, some hillside (Chino Hills)',
      challenges: [
        'SR-210 / I-10 / I-15 congestion and airport-adjacent traffic (Ontario)',
        'HOA COI and gate rules in newer developments',
        'Cross-county spills into LA and Riverside counties',
        'Busy end-of-month calendars from inbound coastal movers',
      ],
      moverTips:
        'Ontario Ranch / newer RC tracts often need HOA packets — send early. Airport and logistics traffic can slow mid-day windows. Chino Hills slopes may need driveway photos for larger trucks.',
      cityKeywords: [
        'rancho cucamonga',
        'ontario',
        'upland',
        'chino',
        'chino hills',
        'montclair',
        'ontario ranch',
        'alta loma',
        'etiwanda',
        'guasti',
      ],
    },
    {
      id: 'high-desert',
      name: 'High Desert',
      shortName: 'High Desert',
      neighborhoods: [
        'Victorville',
        'Hesperia',
        'Apple Valley',
        'Adelanto',
        'Barstow',
        'Phelan',
        'Oak Hills',
      ],
      housingTypes:
        'Suburban SFH on larger lots, manufactured homes, ranch-style properties, growing tracts, fewer high-rises',
      challenges: [
        'Extreme summer heat and frequent wind / dust',
        'Long grades and distance via I-15 from the valley',
        'Larger average inventories and longer carries on big lots',
        'Barstow as a remote logistics node (military + through-traffic)',
      ],
      moverTips:
        'Summer high-desert moves should start at dawn. Protect against dust and heat. Treat Victorville/Hesperia ↔ West Valley as a long local haul with explicit portal-to-portal assumptions. Confirm driveway and gate access on larger properties.',
      cityKeywords: [
        'victorville',
        'hesperia',
        'apple valley',
        'adelanto',
        'barstow',
        'phelan',
        'oak hills',
        'helendale',
        'hinkley',
        'lucerne valley',
      ],
    },
    {
      id: 'mountains',
      name: 'Mountain Communities',
      shortName: 'Mountains',
      neighborhoods: [
        'Big Bear Lake',
        'Big Bear City',
        'Lake Arrowhead',
        'Running Springs',
        'Crestline',
        'Twin Peaks',
        'Blue Jay',
      ],
      housingTypes:
        'Cabins, chalets, A-frames, vacation homes, steep-lot residences, limited multi-family',
      challenges: [
        'Steep grades and narrow mountain roads (SR-18 and related)',
        'Winter weather, chains, ice, and seasonal delays',
        'Limited truck turnaround, parking, and staging at cabins',
        'Long empty miles from valley staging points',
      ],
      moverTips:
        'Share approach photos, driveway grade, and max truck length before the estimate. Budget shuttle or long-carry for tight cabin streets. Winter moves need weather holds and flexible dates. Never assume a 26′ truck can reach every Big Bear or Arrowhead address.',
      cityKeywords: [
        'big bear',
        'lake arrowhead',
        'running springs',
        'crestline',
        'twin peaks',
        'blue jay',
        'sugarloaf',
        'fawnskin',
        'cedarpines',
      ],
    },
    {
      id: 'morongo-basin',
      name: 'Morongo Basin / Remote Desert',
      shortName: 'Morongo Basin',
      neighborhoods: [
        'Twentynine Palms',
        'Yucca Valley',
        'Joshua Tree',
        'Morongo Valley',
        'Landers',
        'Wonder Valley',
      ],
      housingTypes:
        'Desert homes, modular and site-built mixes, artistic/remote properties, base-adjacent housing',
      challenges: [
        'Long distance via SR-62 from the valley and Coachella approaches',
        'Extreme heat and limited services for breakdowns',
        'MCAGCC Twentynine Palms access and PCS timing',
        'Park tourism traffic near Joshua Tree in peak seasons',
      ],
      moverTips:
        'Treat Morongo Basin jobs as remote logistics: fuel, water, heat windows, and honest travel time. Confirm base housing rules for Twentynine Palms. Peak park weekends can slow local roads — mid-week is often smoother.',
      cityKeywords: [
        'twentynine palms',
        '29 palms',
        'yucca valley',
        'joshua tree',
        'morongo',
        'landers',
        'wonder valley',
        'joshua tree national',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside San Bernardino County',
    intro:
      'Two “local” moves of the same square footage can differ by thousands depending on elevation, heat windows, empty miles, mountain access, and remote military destinations.',
    drivers: [
      {
        title: 'Cross-zone distance & empty miles',
        detail:
          'West Valley ↔ High Desert, valley ↔ Big Bear, or valley ↔ Twentynine Palms can add 1–2+ hours each way. Portal-to-portal billing and fuel matter more here than in compact coastal counties.',
      },
      {
        title: 'Mountain access premiums',
        detail:
          'Steep grades, shuttle needs, weather holds, and limited truck size on mountain roads add labor and risk. Cabin staging often costs more than a same-SFH valley job.',
      },
      {
        title: 'Heat-constrained work windows',
        detail:
          'High-desert and valley summer heat compress productive hours into mornings. Jobs that slip into peak heat may need more days or premium scheduling.',
      },
      {
        title: 'Warehouse-corridor congestion (valley)',
        detail:
          'IE logistics traffic on I-10 / I-15 / I-215 / SR-210 can stall crews mid-day near Ontario–Fontana–San Bernardino corridors.',
      },
      {
        title: 'Military remote destinations',
        detail:
          'Fort Irwin, Twentynine Palms, and Barstow logistics add long deadhead miles, gate wait, and limited local support — price travel explicitly.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$550–$1,400+',
        note: 'Higher with mountain grades or long high-desert travel',
      },
      {
        label: '2–3BR house / planned community',
        value: '$1,600–$3,800+',
        note: 'HOA windows and multi-freeway valley hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / mountain / remote)',
        value: '$2,500–$7,000+',
        note: 'Valley ↔ mountains/desert and remote base-adjacent jobs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$185+/hr',
        note: 'Portal-to-portal; packing, shuttles, and 3-person crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, weather & calendar intelligence',
    intro:
      'San Bernardino’s calendar is heat, wind, mountain winter, military PCS, and IE family peaks — not coastal marine layers.',
    items: [
      {
        title: 'Summer heat peak: roughly June – September',
        detail:
          'Valley and especially high-desert/Morongo Basin moves should start early. Protect electronics and avoid mid-afternoon sealed-truck staging in direct sun.',
      },
      {
        title: 'Mountain winter: storms, ice, chain controls',
        detail:
          'Big Bear / Arrowhead routes can close or delay with snow and ice. Build weather holds into contracts and keep flexible dates for cabin moves November–March.',
      },
      {
        title: 'High-desert wind events',
        detail:
          'Strong winds complicate high-profile loads and outdoor packing. Flexible start times help when wind advisories hit the Victor Valley or Barstow corridor.',
      },
      {
        title: 'Military / training calendars',
        detail:
          'Fort Irwin and Twentynine Palms movements can cluster around training and PCS windows. Remote legs book limited specialized capacity — plan early.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, non-storm / non-peak-heat windows',
        detail:
          'Still start early inland. Avoid last Friday/Saturday of the month when leases and family moves collide in the West Valley.',
      },
    ],
  },
  resources: {
    title: 'Practical San Bernardino County resources',
    intro:
      'Official links and safety references — mountain weather, base access, and city rules change; verify before move day.',
    items: [
      {
        label: 'San Bernardino County — official site',
        href: 'https://www.sbcounty.gov/',
        external: true,
      },
      {
        label: 'City of San Bernardino',
        href: 'https://www.sbcity.org/',
        external: true,
      },
      {
        label: 'City of Rancho Cucamonga',
        href: 'https://www.cityofrc.us/',
        external: true,
      },
      {
        label: 'City of Ontario',
        href: 'https://www.ontarioca.gov/',
        external: true,
      },
      {
        label: 'Caltrans — road conditions (mountain / desert routes)',
        href: 'https://roads.dot.ca.gov/',
        note: 'Check SR-18 and other mountain routes before cabin moves',
        external: true,
      },
      {
        label: 'NWS heat safety',
        href: 'https://www.weather.gov/safety/heat',
        note: 'Plan early loads when heat risk is elevated',
        external: true,
      },
      {
        label: 'Fort Irwin National Training Center',
        href: 'https://home.army.mil/irwin/',
        note: 'Confirm access if destination is base-related',
        external: true,
      },
      {
        label: 'MCAGCC Twentynine Palms',
        href: 'https://www.29palms.marines.mil/',
        external: true,
      },
      {
        label: 'MCLB Barstow',
        href: 'https://www.mclbbarrstow.marines.mil/',
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
        label: 'Southern California Edison (SCE)',
        href: 'https://www.sce.com/',
        note: 'Electric utility for much of the county',
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
    'Filter listings by zone (West Valley, RC–Ontario Corridor, High Desert, Mountains, Morongo Basin) when available. Confirm heat windows, mountain access, and city-to-city drive assumptions — especially for desert, cabin, or remote base-adjacent moves.',
  lastReviewed: '2026-07-22',
};
