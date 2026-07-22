import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Orange County moving intelligence.
 * Used by /local-movers/california/orange and the shared intelligence template.
 *
 * Differentiators vs LA / San Diego: extreme HOA / master-planned density (Irvine model),
 * affluent shipment values, compact coastal–inland contrast, Anaheim Resort tourism traffic.
 */
export const orangeCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'california',
  countySlug: 'orange',
  hubTitle: 'Orange County Moving Intelligence Hub',
  eyebrow: 'Orange County · Hyper-local guide',
  h1: 'Moving in Orange County: HOAs, Planned Communities & Zone-by-Zone Guide',
  heroOpener:
    'Orange County is one of the most HOA- and master-planned-dense counties in the United States. Irvine, Mission Viejo, Rancho Santa Margarita, Ladera Ranch, Coto de Caza, and similar communities often treat a household move like a managed construction event: Certificates of Insurance, elevator or loading windows, truck-size limits, floor protection, and sometimes on-site management approval at the gate. Add high average home values (and higher insurance expectations), a sharp coastal vs inland contrast inside a compact county, and Anaheim Resort traffic that can freeze a “short” local hop — and generic Southern California advice falls short. This guide is built for people actually moving in OC.',
  heroCredibility:
    'HOA & planned-community first · Intrastate CA (BHGS) · FMCSA when interstate · Curated county listings',
  whatMakesDifferent: {
    title: 'What makes moving in Orange County different',
    intro:
      'These are the OC-specific realities that turn a simple estimate into a multi-stakeholder project — especially in planned communities and coastal cities.',
    bullets: [
      {
        title: 'HOAs and planned communities are the default, not the exception',
        detail:
          'Large swaths of OC (Irvine, Tustin Ranch, Mission Viejo, RSM, Ladera Ranch, Aliso Viejo, many Newport / Laguna HOAs) require advance paperwork: COI naming the association or management company, elevator reservations, protective padding, approved hours (often weekdays only), and truck-size or street-parking rules. Treat the HOA packet as part of the inventory survey — not something you send the morning of the move.',
      },
      {
        title: 'Gated and guarded entrances add a coordination step',
        detail:
          'Guard gates, RFID visitor systems, and temporary vendor passes are common in South County and Irvine villages. Crews may need a resident escort, a pre-cleared vendor list, or a 24–48 hour gate notice. If the truck is turned away at the gate, wait time is usually billable. Put management contact info on the work order.',
      },
      {
        title: 'Higher home values → higher care and insurance expectations',
        detail:
          'Affluent coastal and planned-community inventories often include designer furniture, large TVs, wine storage, and art. Ask for declared-value or higher third-party coverage when shipment value warrants it. Cheap “released value” coverage is rarely enough for a typical Irvine or Newport household.',
      },
      {
        title: 'Coastal vs inland is two logistics models in one county',
        detail:
          'Huntington Beach, Newport, Laguna, and Dana Point bring tight streets, tourist parking, and salt air. Inland / South County planned communities bring HOA rules and cul-de-sac truck limits. Santa Ana and older North County neighborhoods can mean street parking, multi-unit walk-ups, and different city permit cultures — all within 30–45 minutes of each other.',
      },
      {
        title: 'Anaheim Resort & tourism distort traffic and turnover',
        detail:
          'Disneyland Resort, convention calendars, and hotel load-ins choke Harbor Blvd, Katella, Ball Rd, and the I-5 / SR-57 / SR-22 interchanges. Event weeks fill short-term housing and push residential move demand nearby. If either address is near the Resort District, avoid peak park arrival/departure windows and check event calendars before locking a Saturday.',
      },
      {
        title: 'Freeway timing is a line item on “local” quotes',
        detail:
          'I-5, I-405, SR-22, SR-55, SR-91, and SR-73 control billable hours. Costa Mesa ↔ Anaheim, Irvine ↔ Huntington Beach, and Fullerton ↔ South County can double travel time in the 7–9 a.m. and 3–7 p.m. peaks. Ask whether the quote is portal-to-portal and how peak windows are priced.',
      },
      {
        title: 'Irvine is not “just another suburb”',
        detail:
          'Village-based planning (Woodbridge, Turtle Rock, University Park, Spectrum, Great Park neighborhoods, etc.) often means strict architectural and move-in rules, specific loading locations, and management companies that enforce written guidelines. An Irvine planned-community move is operationally closer to a corporate high-rise job than to an older Santa Ana bungalow move — price and schedule it accordingly.',
      },
      {
        title: 'California intrastate rules (BHGS)',
        detail:
          'Moves entirely within California are generally overseen by the California Bureau of Household Goods and Services (BHGS). Interstate legs (e.g. OC → Las Vegas or out of state) need FMCSA authority. Confirm which license applies to your exact origin and destination before deposits.',
      },
    ],
  },
  zonesIntro:
    'Treat each OC zone as its own ruleset. HOA density, coastal staging, and Anaheim Resort traffic change the job more than map miles suggest — Orange County is not interchangeable with Los Angeles or San Diego.',
  zones: [
    {
      id: 'north-oc',
      name: 'North Orange County',
      shortName: 'North OC',
      neighborhoods: [
        'Anaheim',
        'Fullerton',
        'Brea',
        'Placentia',
        'Yorba Linda',
        'Buena Park',
        'La Habra',
        'Cypress',
      ],
      housingTypes:
        'Suburban SFH, older tracts, multi-family near freeways, Resort-adjacent apartments, some hillside estates (Yorba Linda)',
      challenges: [
        'Anaheim Resort / Disneyland traffic and event street impacts',
        'I-5 / SR-91 / SR-57 congestion',
        'Mixed HOA rules (lighter in older tracts, strict in some new builds)',
        'Short-term rental and hotel turnover near the Resort District',
      ],
      moverTips:
        'If either address is near Harbor / Katella / Ball, avoid park open/close surges and convention changeover days. Confirm street parking and temporary no-parking needs. Yorba Linda hillsides may need driveway photos for truck access.',
      cityKeywords: [
        'anaheim',
        'fullerton',
        'brea',
        'placentia',
        'yorba linda',
        'buena park',
        'la habra',
        'cypress',
        'stanton',
        'la palma',
        'disneyland',
      ],
    },
    {
      id: 'central-inland',
      name: 'Central / Inland Core',
      shortName: 'Central',
      neighborhoods: [
        'Santa Ana',
        'Orange',
        'Tustin',
        'Garden Grove',
        'Westminster',
        'Fountain Valley',
        'Midway City',
      ],
      housingTypes:
        'Older SFH and bungalows, dense multi-family, some newer planned pockets (Tustin), commercial-adjacent housing',
      challenges: [
        'Street parking and multi-unit long carries',
        'SR-22 / SR-55 / I-5 weave traffic',
        'Varied city rules vs HOA-heavy South County',
        'Larger inventory variance (starter homes to renovated craftsmans)',
      ],
      moverTips:
        'Older Santa Ana / Orange street grids often allow easier truck access than Irvine villages — but parking and elevators in mid-rises still need planning. Get clear inventory photos; renovation-era homes hide heavy furniture and stairs.',
      cityKeywords: [
        'santa ana',
        'orange',
        'tustin',
        'garden grove',
        'westminster',
        'fountain valley',
        'midway city',
        'villa park',
      ],
    },
    {
      id: 'irvine-planned',
      name: 'Irvine & Planned Communities',
      shortName: 'Irvine / Planned',
      neighborhoods: [
        'Irvine',
        'Tustin Ranch',
        'Irvine Spectrum',
        'University Town Center',
        'Great Park neighborhoods',
        'Portola Springs',
        'Orchard Hills',
        'Woodbridge',
      ],
      housingTypes:
        'Master-planned SFH and condos, village HOAs, mid-rise apartments, townhomes, high document-control communities',
      challenges: [
        'Near-universal COI and written move-in rules',
        'Elevator reservations and narrow weekday windows',
        'Gate / vendor registration and truck-size limits',
        'Cul-de-sac and private-street access restrictions',
      ],
      moverTips:
        'Collect the HOA/management move packet before the estimate. Send COI templates early. Confirm approved hours, elevator pads, and where a 26′ truck may legally stage. Prefer mid-week mornings; end-of-month Saturdays book out first in Irvine villages.',
      cityKeywords: [
        'irvine',
        'tustin ranch',
        'spectrum',
        'woodbridge',
        'turtle rock',
        'university park',
        'portola',
        'orchard hills',
        'great park',
        'northwood',
        'quail hill',
        'deerfield',
      ],
    },
    {
      id: 'coastal',
      name: 'Coastal Cities',
      shortName: 'Coastal',
      neighborhoods: [
        'Huntington Beach',
        'Newport Beach',
        'Costa Mesa',
        'Laguna Beach',
        'Dana Point',
        'San Clemente',
        'Seal Beach',
        'Laguna Woods',
      ],
      housingTypes:
        'Beach cottages, bluff and canyon homes, luxury SFH, condos, aging-in-place communities (e.g. Laguna Woods)',
      challenges: [
        'Limited street parking and tourist congestion',
        'Tight lots, stairs, and long carries to beach blocks',
        'Salt air packing and floor protection',
        'HOA / condo towers along the coast with elevator rules',
      ],
      moverTips:
        'Expect shuttle or long-carry on many beach streets. Book weekdays for Huntington / Newport / Laguna tourist corridors. Mention canyon or bluff driveways early. Laguna Woods and similar communities often have extra association procedures — treat them like planned-community moves.',
      cityKeywords: [
        'huntington beach',
        'newport',
        'costa mesa',
        'laguna beach',
        'dana point',
        'san clemente',
        'seal beach',
        'laguna woods',
        'balboa',
        'corona del mar',
        'sunset beach',
        'capistrano beach',
      ],
    },
    {
      id: 'south-county',
      name: 'South County Planned Suburbs',
      shortName: 'South County',
      neighborhoods: [
        'Mission Viejo',
        'Laguna Niguel',
        'Rancho Santa Margarita',
        'Lake Forest',
        'Aliso Viejo',
        'Ladera Ranch',
        'Coto de Caza',
        'San Juan Capistrano',
      ],
      housingTypes:
        'Master-planned SFH, gated estates, townhomes, strong HOA governance, limited high-rises',
      challenges: [
        'Gated entries and HOA truck/hour rules',
        'I-5 South County congestion toward the coast',
        'Longer local hauls to North OC or LA County line',
        'Hillside and equestrian-area access in places (Coto, eastern RSM)',
      ],
      moverTips:
        'South County is HOA-first: COI, gate lists, and approved hours are standard. Share gate codes or guest-pass process on the work order. For Coto / hillside streets, send approach photos. Mid-month mid-week remains the best rate window.',
      cityKeywords: [
        'mission viejo',
        'laguna niguel',
        'rancho santa margarita',
        'lake forest',
        'aliso viejo',
        'ladera ranch',
        'coto de caza',
        'san juan capistrano',
        'rsm',
        'foothill ranch',
        'trabuco',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Orange County',
    intro:
      'Two “local” moves of the same square footage can differ by thousands depending on HOA soft costs, coastal access, Anaheim traffic windows, and shipment value. Higher average home values push insurance and careful-handling expectations up.',
    drivers: [
      {
        title: 'HOA, COI & building soft costs',
        detail:
          'COI processing, elevator deposits, reserved loading times, floor protection requirements, and weekday-only windows add $100–$500+ in soft costs before labor starts — routine in Irvine and South County planned communities.',
      },
      {
        title: 'Gate delays & vendor registration',
        detail:
          'If a truck waits at a guard gate without a pass, wait time is usually billable. Pre-clear vendors 24–48 hours ahead for gated villages.',
      },
      {
        title: 'Coastal shuttle & long-carry',
        detail:
          'Beach blocks and no-truck streets force shuttle trucks or long carries. Ask for shuttle fees in writing; they are often $150–$400+ when needed.',
      },
      {
        title: 'Cross-freeway “local” distance',
        detail:
          'Fullerton → San Clemente or HB → Yorba Linda is local on a map but can burn hours on I-5 / I-405 / SR-55 / SR-91. Hourly billing follows time, not crow-flies miles.',
      },
      {
        title: 'Peak tourism & end-of-month calendars',
        detail:
          'Anaheim event weeks, summer Saturdays, and lease turnovers price highest. Mid-month Tue–Thu starts are usually the best value.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$650–$1,600+',
        note: 'Higher with elevators, HOA windows, or coastal shuttle needs',
      },
      {
        label: '2–3BR condo / planned-community home',
        value: '$1,900–$4,500+',
        note: 'COI + elevator or gate coordination common',
      },
      {
        label: '3–4+ BR house (cross-zone / high value)',
        value: '$2,800–$7,000+',
        note: 'Coastal luxury and multi-freeway hauls trend higher',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$130–$200+/hr',
        note: 'Portal-to-portal; packing and 3-person crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, tourism & calendar intelligence',
    intro:
      'OC weather is mild year-round — tourism, school calendars, and HOA weekend bans set the real peaks.',
    items: [
      {
        title: 'Worst rate windows: late May – mid-September weekends',
        detail:
          'School calendars + summer coastal demand + end-of-month leases. Book 2–4 weeks ahead for Saturdays in Irvine and South County.',
      },
      {
        title: 'Anaheim Resort peak periods',
        detail:
          'Holiday weeks, major conventions, and summer park crowds choke Resort District streets. Residential moves nearby should start early and avoid park open/close surges.',
      },
      {
        title: 'Coastal summer congestion',
        detail:
          'Huntington, Newport, and Laguna weekend traffic plus scarce parking make weekday coastal moves far more efficient.',
      },
      {
        title: 'May gray / June gloom (coast)',
        detail:
          'Marine layer keeps mornings cool and damp near the water — protect wood floors and allow cardboard dry-out time. Inland North OC can be clear and warmer the same day.',
      },
      {
        title: 'Best value: mid-month Tue–Thu',
        detail:
          'Still plan early starts near I-5 / I-405. Avoid last Friday/Saturday of the month when HOA calendars and leases collide.',
      },
    ],
  },
  resources: {
    title: 'Practical Orange County resources',
    intro:
      'Official links and licensing notes — HOA and city rules change; verify current requirements before move day.',
    items: [
      {
        label: 'City of Irvine — parking & transportation',
        href: 'https://www.cityofirvine.org/transportation',
        note: 'City rules; HOA rules are separate and often stricter',
        external: true,
      },
      {
        label: 'City of Anaheim — parking & mobility',
        href: 'https://www.anaheim.net/193/Parking-and-Mobility',
        note: 'Relevant near Resort District residential moves',
        external: true,
      },
      {
        label: 'City of Huntington Beach — parking',
        href: 'https://www.huntingtonbeachca.gov/residents/parking/',
        external: true,
      },
      {
        label: 'City of Newport Beach — parking services',
        href: 'https://www.newportbeachca.gov/government/departments/municipal-operations/parking-services',
        external: true,
      },
      {
        label: 'Visit Anaheim / event awareness',
        href: 'https://visitanaheim.org/',
        note: 'Check major events that impact Resort District traffic',
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
        note: 'Electric utility for much of OC',
        external: true,
      },
      {
        label: 'SoCalGas — start/stop service',
        href: 'https://www.socalgas.com/',
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
    'Filter listings by zone (North OC, Central, Irvine/Planned, Coastal, South County) when available. Always confirm HOA/COI and gate procedures before booking — especially in Irvine and South County planned communities.',
  lastReviewed: '2026-07-22',
};
