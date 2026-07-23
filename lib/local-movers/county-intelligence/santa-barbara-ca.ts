import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Santa Barbara County moving intelligence.
 * Used by /local-movers/california/santa-barbara and the shared intelligence template.
 *
 * Differentiators vs Ventura / LA: coastal constrained streets + high-cost housing core
 * (Santa Barbara, Montecito, Carpinteria) vs Goleta / UCSB and sprawling North County
 * (Santa Maria, Lompoc, Buellton) along US-101 — not a Ventura or South Bay clone.
 */
export const santaBarbaraCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'california',
  countySlug: 'santa-barbara',
  hubTitle: 'Santa Barbara County Moving Intelligence Hub',
  eyebrow: 'Santa Barbara County · Coast & North County guide',
  h1: 'Moving in Santa Barbara County: Coastal Core, Goleta & North County Zone Guide',
  heroOpener:
    'Santa Barbara County is two logistics worlds under one name. The coastal core — Santa Barbara, Montecito, Carpinteria, Summerland — packs high-cost housing onto constrained streets, hillside driveways, HOA estates, and downtown blocks where full-size trucks often cannot stage at the door. Goleta and Isla Vista add UCSB turnover, apartment density, and airport-adjacent timing. North County — Santa Maria, Orcutt, Lompoc, Buellton, Solvang — sits inland on agricultural and valley patterns with different access, heat, and price points. US-101 is the spine that turns “local” into a long haul between coast and Santa Maria. This guide is for people moving in Santa Barbara County — not Ventura tips with the city name swapped, and not generic Central Coast copy.',
  heroCredibility:
    'Coastal core vs North County · Constrained streets & 101 spine · Intrastate CA (BHGS) · FMCSA when interstate · Curated listings',
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
    title: 'What makes moving in Santa Barbara County different',
    intro:
      'These are the local realities that change estimates — coastal constrained access, premium housing soft costs, Goleta/UCSB volume, and the long 101 run to North County.',
    bullets: [
      {
        title: 'Coastal core and North County are different products',
        detail:
          'A Montecito estate, a downtown Santa Barbara condo, a Goleta tract, and a Santa Maria or Lompoc suburban home share a county label but not truck access, labor hours, or drive-time assumptions. Get both cities into the estimate — “Santa Barbara County local” is too vague when the pair spans coast and North County.',
      },
      {
        title: 'Constrained coastal streets rewrite truck plans',
        detail:
          'Santa Barbara’s Riviera hillsides, Mission-adjacent blocks, Montecito lanes, and Carpinteria beach streets often mean limited staging, tight turns, low branches, and long carries. Shuttle vans or smaller trucks are common. Share approach photos and max truck length before move day — do not assume a 26′ box reaches the door.',
      },
      {
        title: 'Higher-cost housing means higher-stakes inventories',
        detail:
          'Coastal and Montecito inventories often include art, wine, design furniture, and remodel-sensitive finishes. Cheap released-value coverage is frequently inadequate. Discuss valuation, packing levels, and floor protection early — and expect HOA/estate COI packets on many premium addresses.',
      },
      {
        title: 'US-101 is a billable line item, not background noise',
        detail:
          'The 101 spine links Carpinteria through Santa Barbara and Goleta to Buellton and Santa Maria. Coast ↔ Santa Maria or Lompoc can burn hours at peak and through Gaviota-area constraints. Hourly crews feel every delay — ask how portal-to-portal time is priced and whether cross-zone pairs are still “local” on the rate card.',
      },
      {
        title: 'Goleta / UCSB creates a distinct turnover market',
        detail:
          'Isla Vista, student-heavy multi-unit stock, and academic calendars drive concentrated load-outs that do not match Montecito estate timing. Elevator reservations, parking scarcity, and end-of-quarter peaks matter — treat campus-adjacent jobs as their own product.',
      },
      {
        title: 'North County ag and valley logistics',
        detail:
          'Santa Maria, Orcutt, Lompoc, and surrounding valley towns mix suburban tracts with agricultural traffic and longer deadheads from coastal crews. Mid-day freight near farm corridors can stall “short” locals. Heat inland also diverges from marine-layer coast on the same calendar day.',
      },
      {
        title: 'Fire, wind & hillside risk on the South Coast edge',
        detail:
          'Hillside and canyon-edge pockets (Riviera, Montecito foothills, some Carpinteria and Goleta edges) face fire-season and wind operational risk. Crews may delay outdoor packing or reschedule on red-flag days. Ask about weather contingency before late-summer and fall peaks.',
      },
      {
        title: 'California intrastate rules (BHGS) + FMCSA when interstate',
        detail:
          'Moves entirely within California are generally overseen by the California Bureau of Household Goods and Services (BHGS). Interstate legs (e.g. Santa Barbara → out-of-state) need FMCSA authority. Confirm which license applies to your exact origin and destination before deposit.',
      },
    ],
  },
  zonesHeading: 'Santa Barbara County move zones',
  zonesIntro:
    'Treat each zone as its own access and traffic problem. Coastal constrained streets, Goleta/UCSB density, and North County valley moves are not interchangeable — and 101 distance rewrites “local.”',
  zones: [
    {
      id: 'sb-coastal-core',
      name: 'Santa Barbara Coastal Core — City, Mesa, Riviera',
      shortName: 'SB Core',
      neighborhoods: [
        'Downtown Santa Barbara',
        'Upper East / Mission area',
        'The Mesa',
        'Riviera / Riviera hillside',
        'Westside Santa Barbara',
        'Eastside Santa Barbara',
      ],
      housingTypes:
        'Downtown multi-unit and condos, hillside SFH, Mesa mid-century homes, premium finishes, limited street staging',
      challenges: [
        'Constrained downtown and hillside truck staging',
        'Riviera grades, tight turns, and long carries',
        'Condo COI and elevator windows',
        'US-101 congestion through the city at peak',
      ],
      moverTips:
        'Expect shuttle or long-carry on many Riviera and downtown-adjacent streets. Send condo rules early. Prefer mid-week mornings; protect floors and finishes on higher-value inventories.',
      cityKeywords: [
        'santa barbara',
        'mesa',
        'riviera',
        'downtown santa barbara',
        'mission canyon',
        'upper east',
        'westside santa barbara',
      ],
    },
    {
      id: 'montecito-carp',
      name: 'Montecito, Summerland & Carpinteria Coast',
      shortName: 'Montecito / Carp',
      neighborhoods: [
        'Montecito',
        'Summerland',
        'Carpinteria',
        'Hope Ranch edge',
        'Toro Canyon edge',
        'Padaro / beach-adjacent Carpinteria',
      ],
      housingTypes:
        'Estate and larger-lot SFH, gated HOA communities, coastal cottages, beach-adjacent homes, some multi-unit in Carpinteria',
      challenges: [
        'Gate lists, COI, and estate access protocols',
        'Narrow lanes and limited turnaround on estate streets',
        'High-value inventory and finish protection expectations',
        'Beach and salt-air packing near Carpinteria waterfront',
      ],
      moverTips:
        'Treat Montecito as access-first: driveway photos, gate codes, and approved hours belong in the survey. Carpinteria beach blocks may need smaller trucks or long carries. Budget valuation and packing for premium inventories.',
      cityKeywords: [
        'montecito',
        'summerland',
        'carpinteria',
        'hope ranch',
        'toro canyon',
        'padaro',
      ],
    },
    {
      id: 'goleta-ucsb',
      name: 'Goleta, Isla Vista & UCSB Corridor',
      shortName: 'Goleta / UCSB',
      neighborhoods: [
        'Goleta',
        'Isla Vista',
        'UCSB-adjacent',
        'Old Town Goleta',
        'Ellwood',
        'Santa Barbara Airport corridor',
      ],
      housingTypes:
        'Suburban SFH, student multi-unit, apartments and condos, planned tracts, airport-adjacent rentals',
      challenges: [
        'Isla Vista parking scarcity and multi-unit load-outs',
        'Academic calendar peak turnover',
        'Airport and 101 weave timing',
        'Elevator and landlord move-window rules',
      ],
      moverTips:
        'Share unit floor, elevator status, and parking plan for Isla Vista and dense Goleta multi-unit. Book early around quarter ends. Build buffer near airport approaches when either address sits on the corridor.',
      cityKeywords: [
        'goleta',
        'isla vista',
        'ucsb',
        'university of california santa barbara',
        'ellwood',
        'old town goleta',
      ],
    },
    {
      id: 'santa-maria-north',
      name: 'Santa Maria, Orcutt & North County Hub',
      shortName: 'Santa Maria',
      neighborhoods: [
        'Santa Maria',
        'Orcutt',
        'Betteravia corridor edge',
        'Northwest Santa Maria',
        'East Santa Maria',
      ],
      housingTypes:
        'Suburban SFH, multi-family, newer tracts, ag-adjacent edges, some HOA communities',
      challenges: [
        'Long 101 haul from South Coast crews',
        'Ag and commercial truck traffic near field corridors',
        'Inland heat vs marine-layer coast the same day',
        'Cross-zone pricing when paired with coastal core',
      ],
      moverTips:
        'Price Santa Maria ↔ Santa Barbara as a timed 101 job, not map-mile “local.” Note ag-corridor adjacency so crews build freight buffer. Summer inland starts should run early for heat.',
      cityKeywords: [
        'santa maria',
        'orcutt',
        'betteravia',
        'north county santa barbara',
      ],
    },
    {
      id: 'lompoc-valley',
      name: 'Lompoc Valley & Vandenberg-Adjacent',
      shortName: 'Lompoc',
      neighborhoods: [
        'Lompoc',
        'Mission Hills',
        'Vandenberg Village',
        'Vandenberg SFB edge',
        'Mesa Oaks edge',
      ],
      housingTypes:
        'Suburban SFH, multi-family, base-adjacent housing, valley tracts',
      challenges: [
        'Distance from South Coast staging yards',
        'Base-adjacent access rules when applicable',
        'Valley fog and wind patterns on some days',
        'Limited same-day pairing with Montecito-style estate jobs',
      ],
      moverTips:
        'Confirm if either address is near base gates or restricted corridors. Treat Lompoc ↔ coastal core as long-local with honest deadhead. Share driveway and street width photos for hillside or cul-de-sac pockets.',
      cityKeywords: [
        'lompoc',
        'vandenberg',
        'vandenberg village',
        'mission hills lompoc',
        'vandenberg space force',
      ],
    },
    {
      id: 'santa-ynez',
      name: 'Santa Ynez Valley — Buellton, Solvang, Los Olivos',
      shortName: 'Santa Ynez',
      neighborhoods: [
        'Buellton',
        'Solvang',
        'Los Olivos',
        'Santa Ynez',
        'Ballard edge',
        'Los Alamos edge',
      ],
      housingTypes:
        'Valley SFH, wine-country estates, small-town multi-unit, ranch-edge lots',
      challenges: [
        'Narrow town streets (especially Solvang visitor core)',
        'Estate and ranch access with long carries',
        '101 / 154 connection timing to coast or Santa Maria',
        'Tourism congestion on weekends in Solvang',
      ],
      moverTips:
        'Avoid peak tourist weekends in Solvang when flexible. Ranch and estate jobs need approach photos and outbuilding inventory. Price valley ↔ coast pairs as timed corridor jobs.',
      cityKeywords: [
        'buellton',
        'solvang',
        'los olivos',
        'santa ynez',
        'ballard',
        'los alamos',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Santa Barbara County',
    intro:
      'Two “local” moves of the same square footage can differ sharply depending on coastal staging, estate soft costs, and whether the pair rides 101 between the South Coast and North County.',
    drivers: [
      {
        title: 'US-101 cross-zone time (coast ↔ North County)',
        detail:
          'Santa Barbara ↔ Santa Maria, Goleta ↔ Lompoc, or Montecito ↔ Buellton can burn 60–120+ minutes each way depending on traffic and corridor constraints. Hourly billing follows the clock.',
      },
      {
        title: 'Coastal staging, shuttles & long carries',
        detail:
          'Downtown, Riviera, Montecito lanes, and beach-adjacent Carpinteria blocks often need smaller trucks or long carries. Ask for shuttle and stair/long-carry fees in writing.',
      },
      {
        title: 'Estate / HOA soft costs',
        detail:
          'Gate lists, Certificates of Insurance, approved hours, and floor protection add soft costs before labor starts — common in Montecito, Hope Ranch edges, and planned communities.',
      },
      {
        title: 'High-value packing & valuation',
        detail:
          'Art, wine, and finish-sensitive inventories on the coastal core raise packing labor and coverage needs beyond a basic released-value move.',
      },
      {
        title: 'UCSB / multi-unit density (Goleta–Isla Vista)',
        detail:
          'Elevator windows, parking scarcity, and concentrated academic peaks add labor hours and scheduling risk even on small square-footage jobs.',
      },
      {
        title: 'Fire / wind contingency risk',
        detail:
          'Red-flag and high-wind days can force hillside reschedules. Clarify cancellation and weather policies before late-summer and fall peaks.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$600–$1,800+',
        note: 'Higher with elevators, beach shuttle, or coastal staging limits',
      },
      {
        label: '2–3BR house / condo',
        value: '$1,800–$5,000+',
        note: 'Estate soft costs and 101 cross-zone pairs trend up',
      },
      {
        label: '3–4+ BR (hills / estate / North County corridor)',
        value: '$3,000–$9,000+',
        note: 'Montecito access and coast↔Santa Maria pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$130–$210+/hr',
        note: 'Portal-to-portal; packing and 3-person crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, academic & calendar intelligence',
    intro:
      'South Coast weather is often mild — school calendars, tourism, UCSB quarters, 101 peaks, and fire/wind seasons set the real operational risk.',
    items: [
      {
        title: 'Peak residential: late spring – early fall weekends',
        detail:
          'School calendars and end-of-month leases fill Saturdays across the coastal core and Goleta. Book 2–4 weeks ahead for popular windows.',
      },
      {
        title: 'UCSB / Isla Vista academic peaks',
        detail:
          'Quarter starts and ends concentrate multi-unit load-outs. Book early and confirm elevator/parking rules well before move day.',
      },
      {
        title: 'Fire season & red-flag windows (typically late summer – fall, variable)',
        detail:
          'Wildfire risk and red-flag warnings can restrict hillside work and outdoor packing on Riviera, Montecito foothills, and canyon edges. Build schedule flexibility.',
      },
      {
        title: 'Tourism pressure (Solvang, waterfront, downtown)',
        detail:
          'Weekend visitor traffic tightens staging near Solvang, Stearns Wharf-adjacent corridors, and popular beach blocks. Mid-week mornings win when HOA windows allow.',
      },
      {
        title: 'North County summer heat vs marine layer',
        detail:
          'Santa Maria and Lompoc afternoons can run much hotter than the coastal core. Early starts protect crews and electronics on inland jobs.',
      },
      {
        title: 'Best value: mid-month Tue–Thu mornings',
        detail:
          'Still plan around HOA weekday windows and academic peaks. Avoid last Friday/Saturday of the month when leases collide — and check wind/fire forecasts in season.',
      },
    ],
  },
  specialized: [
    {
      id: 'coastal-constrained-101',
      title: 'Coastal constrained streets & US-101 corridor logistics',
      intro:
        'Santa Barbara County’s defining move problem is often access-on-the-coast plus distance-on-101 when the other address sits in North County or the Santa Ynez Valley.',
      bullets: [
        'Price portal-to-portal time honestly for any pair that rides 101 between the South Coast and Santa Maria, Lompoc, or Buellton.',
        'Share driveway, street-width, and turnaround photos for Riviera, Montecito, and hillside coastal homes before booking.',
        'Expect shuttle or long-carry language on constrained downtown and estate streets — get fees in writing.',
        'Prefer mid-morning starts that miss the worst commute peaks when HOA or building windows allow.',
        'If one address is coastal-premium and the other is North County suburban, confirm whether the mover’s “local” rate card still applies or if a long-local / distance schedule is used.',
      ],
    },
    {
      id: 'ucsb-north-county-split',
      title: 'UCSB turnover & North County valley module',
      intro:
        'Goleta/Isla Vista multi-unit peaks and Santa Maria–Lompoc valley logistics do not behave like Montecito estate moves — size the crew and schedule to the pocket.',
      bullets: [
        'Isla Vista and dense Goleta buildings need elevator reservations, parking plans, and landlord move rules confirmed in writing.',
        'Align booking with academic calendars when either party is student- or staff-driven.',
        'North County addresses should note ag/industrial adjacency so crews build freight-traffic buffer.',
        'Inland summer heat changes start times even when Santa Barbara beach weather looks mild.',
        'Base-adjacent Lompoc / Vandenberg-area jobs may need extra access documentation — ask early if gates or IDs apply.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Santa Barbara County?',
    intro:
      'Coastal lifestyle, Goleta practicality, wine-country valley towns, and North County affordability are different bets — pick the pocket first, then validate schools, healthcare, and 101 commute tolerance.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Santa Barbara County uses multiple districts (e.g., Santa Barbara Unified, Goleta Union and related high-school feeders, Carpinteria Unified, Santa Maria-Bonita / Santa Maria Joint Union systems, Lompoc Unified, Buellton Union / Solvang / other valley districts, and others). Match every listing address to the correct district.',
        bullets: [
          {
            title: 'Town-first district check',
            detail:
              'Use official district boundary tools and the California School Dashboard. Marketing city names and unincorporated pockets (Montecito, Isla Vista, Orcutt) can span feeders.',
          },
          {
            title: 'Coast vs Goleta vs North County',
            detail:
              'Enrollment pressures, program offerings, and bus patterns differ sharply between South Coast, Goleta, Santa Maria, and Lompoc — do not treat county averages as neighborhood truth.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites and state dashboard data should lead; third-party rankings are secondary signals only.',
          },
          {
            title: 'Higher education presence',
            detail:
              'UCSB and community colleges shape rental demand, traffic, and housing competition near Goleta and Isla Vista — useful for student, staff, and research households.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'County acute-care anchors',
            detail:
              'Cottage Health campuses on the South Coast, Marian Regional (Santa Maria), Lompoc Valley Medical Center, and other regional facilities serve different pockets — map ER drive times at rush hour from your target neighborhood.',
          },
          {
            title: 'Specialty care spillover',
            detail:
              'Some residents travel to larger Southern California systems for specialty care. Confirm insurer networks and realistic appointment drive times on 101.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer pediatric and specialty care early if mid-treatment; book first appointments before peak summer and academic move chaos.',
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
              'Montecito and coastal Santa Barbara often price far above Goleta, and North County (Santa Maria, Lompoc) is a different affordability band entirely. Compare total monthly costs, not sticker price alone.',
          },
          {
            title: 'Stock variety',
            detail:
              'Hillside estates, downtown condos, student multi-unit, suburban tracts, and ranch-edge lots — insurance, HOA dues, and access rules vary widely.',
          },
          {
            title: 'Wildfire & insurance awareness',
            detail:
              'Hillside and wildland-urban interface parcels can face higher insurance scrutiny. Factor insurance availability and cost into foothill and canyon-edge searches.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town fit by lifestyle',
        bullets: [
          {
            title: 'Coastal lifestyle premium',
            detail:
              'Santa Barbara, Montecito, and Carpinteria for beach access and urban amenities — with constrained staging and higher housing costs on move day and every month after.',
          },
          {
            title: 'Goleta practicality',
            detail:
              'More suburban layouts and UCSB-adjacent energy; multi-unit rules and academic peaks shape the experience.',
          },
          {
            title: 'North County value & space',
            detail:
              'Santa Maria, Orcutt, and Lompoc for relatively more space per dollar — with inland climate and longer coast access via 101.',
          },
          {
            title: 'Wine-country valley character',
            detail:
              'Solvang, Los Olivos, Buellton, and Santa Ynez for small-town and estate living with tourism and ranch-access tradeoffs.',
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
              'Healthcare, higher education (UCSB), tourism and hospitality, agriculture and food processing (especially North County), aerospace/defense-adjacent roles near Vandenberg, tech/professional services, and public sector.',
          },
          {
            title: '101 corridor reality',
            detail:
              'Coast ↔ North County commuting is a real daily cost. Peak 101 times should drive housing choice more than brochure distance.',
          },
          {
            title: 'Hybrid / local options',
            detail:
              'Some professional and remote-capable roles reduce daily corridor trips — still validate broadband and coworking by pocket if that matters to you.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & climate',
        bullets: [
          {
            title: 'Coast vs inland microclimates',
            detail:
              'Marine layer and milder temps on the South Coast vs hotter Santa Maria / Lompoc afternoons. Same county, different packing and start-time logic.',
          },
          {
            title: 'Outdoors & culture',
            detail:
              'Beaches, wine country, hiking, and downtown cultural amenities are major draws; weekend visitor traffic affects coastal and Solvang staging.',
          },
          {
            title: 'Seasonal risk literacy',
            detail:
              'Fire and wind seasons are part of living here for hillside and foothill households — emergency kits, evacuation routes, and insurance reviews belong in relocation planning, not after move-in.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Practical Santa Barbara County resources',
    intro:
      'Official links and licensing notes — HOA, parking, fire restrictions, and city rules change; verify before move day.',
    items: [
      {
        label: 'County of Santa Barbara',
        href: 'https://www.countyofsb.org/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Santa Barbara',
        href: 'https://www.santabarbaraca.gov/',
        external: true,
      },
      {
        label: 'City of Goleta',
        href: 'https://www.cityofgoleta.org/',
        external: true,
      },
      {
        label: 'City of Carpinteria',
        href: 'https://carpinteriaca.gov/',
        external: true,
      },
      {
        label: 'City of Santa Maria',
        href: 'https://www.cityofsantamaria.org/',
        external: true,
      },
      {
        label: 'City of Lompoc',
        href: 'https://www.cityoflompoc.com/',
        external: true,
      },
      {
        label: 'City of Buellton',
        href: 'https://www.cityofbuellton.com/',
        external: true,
      },
      {
        label: 'City of Solvang',
        href: 'https://www.cityofsolvang.com/',
        external: true,
      },
      {
        label: 'UC Santa Barbara',
        href: 'https://www.ucsb.edu/',
        note: 'Campus calendars and student housing context',
        external: true,
      },
      {
        label: 'CAL FIRE — incident & readiness information',
        href: 'https://www.fire.ca.gov/',
        note: 'Check fire conditions during wildfire season',
        external: true,
      },
      {
        label: 'National Weather Service — Los Angeles/Oxnard',
        href: 'https://www.weather.gov/lox/',
        note: 'Wind and red-flag context for move planning',
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
        label: 'Southern California Edison / local utility check',
        href: 'https://www.sce.com/',
        note: 'Electric service for much of the county — confirm by address',
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
    'Filter listings by zone (SB Core, Montecito/Carp, Goleta/UCSB, Santa Maria, Lompoc, Santa Ynez) when available. Confirm coastal access/shuttle needs, HOA/estate COI, 101 travel time to North County, and fire/wind contingency for hillside pairs.',
  lastReviewed: '2026-07-23',
};
