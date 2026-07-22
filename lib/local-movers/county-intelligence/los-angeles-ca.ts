import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Los Angeles County moving intelligence.
 * Used by /local-movers/california/los-angeles and the shared intelligence template.
 */
export const losAngelesCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'california',
  countySlug: 'los-angeles',
  hubTitle: 'LA County Moving Intelligence Hub',
  eyebrow: 'Los Angeles County · Hyper-local guide',
  h1: 'Moving in Los Angeles County: Traffic, High-Rises & Zone-by-Zone Guide',
  heroOpener:
    'Los Angeles County is not one market — it is dozens of micro-markets stitched together by freeways, canyons, and dense cities. A 12-mile move can burn three billable hours in 405 traffic, a hillside delivery can force a shuttle truck, and a DTLA high-rise can require COI paperwork and elevator windows booked weeks ahead. This guide is built for people who are actually moving here — not generic “California tips.”',
  heroCredibility:
    'Intrastate CA moves · BHGS licensing awareness · FMCSA when interstate · Curated county listings',
  whatMakesDifferent: {
    title: 'What makes moving in LA County different',
    intro:
      'These are the local gotchas that turn a simple estimate into an expensive day — know them before you book.',
    bullets: [
      {
        title: 'Freeway traffic is a line item',
        detail:
          'Hourly crews bill travel and loading time. I-405, I-10, US-101, and the 110 can double door-to-door time for short hops (Santa Monica ↔ Culver City, Burbank ↔ Pasadena). Ask whether the quote is portal-to-portal and how peak-hour windows are priced.',
      },
      {
        title: 'Parking permits & street sweeping',
        detail:
          'Many cities (LA City, Santa Monica, West Hollywood, Beverly Hills, Pasadena, Long Beach) enforce preferential parking, temporary “no parking” signs, and street-sweeping tickets. A missing permit can mean a blocked truck or a $70–$150+ ticket — often passed to you. Confirm who pulls temporary no-parking / meter hoods.',
      },
      {
        title: 'Hillside & canyon logistics',
        detail:
          'Hollywood Hills, Mount Washington, parts of Malibu, and Palos Verdes often need shuttle trucks: a smaller vehicle ferries loads from a street-legal staging area. Shuttle fees are commonly $150–$400+ extra. Measure driveway grade, turn radius, and overhead wires before move day.',
      },
      {
        title: 'High-rise & condo COI / elevators',
        detail:
          'DTLA, Century City, Marina towers, and many Valley apartment complexes require Certificates of Insurance naming the HOA/building, elevator reservations, and padded elevators. Some buildings only allow moves on weekdays 9–4. Get building rules in writing and share them with your mover early.',
      },
      {
        title: 'Coastal marine layer vs Valley heat',
        detail:
          'Westside “June Gloom” keeps mornings cool and damp (wood floors, cardboard). Inland valleys (San Fernando, San Gabriel, Antelope) hit triple-digit summers that limit safe load times. Plan early starts inland; allow extra wrap time for coastal moisture.',
      },
      {
        title: 'Port / South Bay congestion',
        detail:
          'San Pedro, Wilmington, Long Beach, and Carson sit next to port and warehouse corridors. Weekday truck traffic on I-710 and the 110 can stall a local crew. If either address is port-adjacent, avoid mid-day mid-week windows when possible.',
      },
      {
        title: 'Cross-zone “local” moves still feel long-distance',
        detail:
          'Antelope Valley ↔ Westside, or Long Beach ↔ Pasadena, can be 50–90 minutes each way without traffic. Some “local” quotes quietly treat these as longer-haul with higher minimums. Get zone-to-zone drive time written into the estimate assumptions.',
      },
      {
        title: 'California intrastate rules (BHGS)',
        detail:
          'Moves entirely within California are generally overseen by the California Bureau of Household Goods and Services (BHGS), not only FMCSA. Interstate legs (e.g. LA → Las Vegas) need FMCSA authority. Confirm which license applies to your exact origin and destination.',
      },
    ],
  },
  zonesIntro:
    'Treat each zone as its own logistics problem. Housing stock, truck access, and crew expertise differ more across LA County than across many entire states.',
  zones: [
    {
      id: 'westside',
      name: 'Westside & Beach Cities',
      shortName: 'Westside',
      neighborhoods: [
        'Santa Monica',
        'Venice',
        'Mar Vista',
        'Brentwood',
        'West LA',
        'Culver City',
        'Marina del Rey',
      ],
      housingTypes: 'Condos, walk-ups, hillside homes, luxury multi-story',
      challenges: [
        'Permit parking and narrow streets',
        'Elevator buildings near the beach',
        '405/10 corridor delays',
      ],
      moverTips:
        'Prefer crews with coastal building experience and COI templates ready for HOAs. Book weekday mornings to avoid beach traffic.',
      cityKeywords: [
        'santa monica',
        'venice',
        'brentwood',
        'culver',
        'marina',
        'west la',
        'mar vista',
        'pacific palisades',
      ],
    },
    {
      id: 'sfv',
      name: 'San Fernando Valley',
      shortName: 'SF Valley',
      neighborhoods: [
        'Sherman Oaks',
        'Encino',
        'Studio City',
        'North Hollywood',
        'Van Nuys',
        'Woodland Hills',
        'Burbank',
        'Glendale',
      ],
      housingTypes: 'Ranch homes, apartments, suburban two-story, some high-rises',
      challenges: [
        'Heat delays in summer afternoons',
        '101/405/5 merge congestion',
        'Long driveways and cul-de-sacs',
      ],
      moverTips:
        'Summer moves should start early. Ask about air-conditioned trucks for electronics and wood furniture.',
      cityKeywords: [
        'sherman oaks',
        'encino',
        'studio city',
        'north hollywood',
        'van nuys',
        'woodland hills',
        'burbank',
        'glendale',
        'northridge',
        'reseda',
      ],
    },
    {
      id: 'downtown',
      name: 'Downtown, Mid-City & Central',
      shortName: 'DTLA / Mid-City',
      neighborhoods: [
        'Downtown LA',
        'Arts District',
        'Koreatown',
        'Mid-Wilshire',
        'Westlake',
        'Echo Park',
        'Silver Lake',
      ],
      housingTypes: 'High-rises, loft conversions, dense walk-ups',
      challenges: [
        'Elevator booking windows',
        'COI and loading-dock rules',
        'Street closure / filming impacts',
      ],
      moverTips:
        'Send building rules + COI requirements before the estimate. Confirm dock reservation numbers the day before.',
      cityKeywords: [
        'downtown',
        'dtla',
        'koreatown',
        'echo park',
        'silver lake',
        'mid-wilshire',
        'westlake',
        'arts district',
      ],
    },
    {
      id: 'south-bay',
      name: 'South Bay & Harbor',
      shortName: 'South Bay',
      neighborhoods: [
        'Torrance',
        'Redondo Beach',
        'Hermosa',
        'Manhattan Beach',
        'El Segundo',
        'Carson',
        'Long Beach',
        'San Pedro',
      ],
      housingTypes: 'Beach cottages, mid-rises, suburban tracts, port-adjacent apartments',
      challenges: [
        'Port and warehouse truck traffic',
        'Narrow beach streets',
        'Weekend tourist congestion',
      ],
      moverTips:
        'Avoid mid-week midday near the ports. Long Beach high-rises need the same elevator discipline as DTLA.',
      cityKeywords: [
        'torrance',
        'redondo',
        'hermosa',
        'manhattan beach',
        'el segundo',
        'carson',
        'long beach',
        'san pedro',
        'wilmington',
      ],
    },
    {
      id: 'sgv',
      name: 'Pasadena & San Gabriel Valley',
      shortName: 'Pasadena / SGV',
      neighborhoods: [
        'Pasadena',
        'South Pasadena',
        'Alhambra',
        'Arcadia',
        'Monrovia',
        'El Monte',
        'Pomona',
      ],
      housingTypes: 'Craftsman homes, apartments, hillside estates, suburban SFH',
      challenges: [
        'Historic home stairs and narrow lots',
        '210/10/605 corridor traffic',
        'HOA communities inland',
      ],
      moverTips:
        'Craftsman and multi-level homes need careful stair protection. Confirm Rose Parade / event blackout dates near Pasadena.',
      cityKeywords: [
        'pasadena',
        'alhambra',
        'arcadia',
        'monrovia',
        'el monte',
        'pomona',
        'san gabriel',
        'monterey park',
      ],
    },
    {
      id: 'hills',
      name: 'Hollywood Hills & Canyons',
      shortName: 'Hills',
      neighborhoods: [
        'Hollywood Hills',
        'Los Feliz hills',
        'Mount Washington',
        'Beverly Hills canyons',
        'Malibu canyons',
      ],
      housingTypes: 'Hillside moderns, multi-level homes, tight street access',
      challenges: [
        'Shuttle trucks almost always',
        'Limited turnaround for 26′ trucks',
        'Steep driveways and low branches',
      ],
      moverTips:
        'Budget shuttle fees and extra labor. Share driveway photos and truck approach videos with the estimator.',
      cityKeywords: [
        'hollywood hills',
        'los feliz',
        'malibu',
        'beverly hills',
        'bel air',
        'mount washington',
        'laurel canyon',
      ],
    },
    {
      id: 'antelope',
      name: 'Antelope Valley (North County)',
      shortName: 'Antelope Valley',
      neighborhoods: ['Lancaster', 'Palmdale', 'Quartz Hill', 'Acton', 'Santa Clarita (north)'],
      housingTypes: 'Suburban tracts, new builds, larger square footage',
      challenges: [
        'Long distance to Westside / South Bay',
        'Wind and heat extremes',
        'Fewer elevator buildings, more bulk volume',
      ],
      moverTips:
        'Treat AV ↔ basin moves as long local hauls. Confirm fuel surcharges and whether minimum hours cover return travel.',
      cityKeywords: [
        'lancaster',
        'palmdale',
        'quartz hill',
        'acton',
        'santa clarita',
        'canyon country',
        'valencia',
      ],
    },
    {
      id: 'southeast',
      name: 'Southeast Cities',
      shortName: 'SE Cities',
      neighborhoods: [
        'Downey',
        'Norwalk',
        'Whittier',
        'Bellflower',
        'Cerritos',
        'Compton',
        'Lynwood',
      ],
      housingTypes: 'Single-family, duplexes, garden apartments',
      challenges: [
        'I-5 / I-605 / I-710 congestion',
        'Varied city permit rules',
        'Cross-county spill into Orange County',
      ],
      moverTips:
        'If destination is near the OC line, clarify whether the quote is still “local” under the mover’s rate card.',
      cityKeywords: [
        'downey',
        'norwalk',
        'whittier',
        'bellflower',
        'cerritos',
        'compton',
        'lynwood',
        'paramount',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside LA County',
    intro:
      'Two “local” moves of the same square footage can differ by thousands of dollars depending on zones, buildings, and traffic windows.',
    drivers: [
      {
        title: 'Cross-freeway distance vs map miles',
        detail:
          'Santa Monica → Pasadena is ~25 miles but can be 90+ minutes. Hourly billing follows time, not crow-flies distance.',
      },
      {
        title: 'High-rise & building fees',
        detail:
          'Elevator deposits, reserved loading docks, and COI processing can add $100–$500+ in soft costs before labor starts.',
      },
      {
        title: 'Shuttle & long-carry',
        detail:
          'Hillside streets and no-truck zones force shuttle trucks or long carries — common in Hollywood Hills and some beach blocks.',
      },
      {
        title: 'Parking tickets & permits',
        detail:
          'Temporary no-parking signs, meter bags, and residential permit districts vary by city. Confirm who pays tickets if rules were unclear.',
      },
      {
        title: 'Fuel, crews & peak calendars',
        detail:
          'End-of-month Saturdays and summer Fridays price highest. Mid-month mid-week starts are often the best rate.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, walk-up)',
        value: '$650–$1,600+',
        note: 'Higher with elevators or Westside parking complexity',
      },
      {
        label: '2–3BR apartment or condo',
        value: '$1,800–$4,200+',
        note: 'COI + elevator windows often required',
      },
      {
        label: '3–4+ BR house (cross-zone)',
        value: '$2,800–$7,000+',
        note: 'AV ↔ basin and multi-freeway hauls trend higher',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$130–$200+/hr',
        note: 'Portal-to-portal; 3-person crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar intelligence',
    intro:
      'LA’s weather is mild — the calendar is not. School, entertainment, and tourism set the real peaks.',
    items: [
      {
        title: 'Worst windows: late May – mid-September weekends',
        detail:
          'School calendars + summer heat inland + vacation demand. Book 2–4 weeks ahead for Saturdays.',
      },
      {
        title: 'June Gloom (coast)',
        detail:
          'Marine layer keeps mornings damp on the Westside and South Bay — protect wood floors and allow dry-out time for cardboard.',
      },
      {
        title: 'Santa Ana winds (fall)',
        detail:
          'Hot, dry winds increase fire risk and can force route changes in canyon areas. Flexible dates help.',
      },
      {
        title: 'Awards / film / sports weekends',
        detail:
          'Oscar week, major Hollywood events, marathon routes, and stadium days can close streets. Check city DOT alerts.',
      },
      {
        title: 'Best value: mid-month Tue–Thu',
        detail:
          'Still plan early starts inland in summer. Avoid end-of-month Fridays when possible.',
      },
    ],
  },
  resources: {
    title: 'Practical LA County resources',
    intro:
      'Official links and licensing notes — verify current requirements on the city or agency site.',
    items: [
      {
        label: 'City of LA temporary parking / street use',
        href: 'https://ladot.lacity.gov/',
        note: 'LADOT — no-parking signs, temporary restrictions',
        external: true,
      },
      {
        label: 'Santa Monica parking & permits',
        href: 'https://www.santamonica.gov/parking',
        external: true,
      },
      {
        label: 'Pasadena parking services',
        href: 'https://www.cityofpasadena.net/transportation/parking/',
        external: true,
      },
      {
        label: 'Long Beach parking information',
        href: 'https://www.longbeach.gov/pw/resources/parking/',
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
        label: 'LADWP — start/stop service',
        href: 'https://www.ladwp.com/',
        note: 'City of LA power & water',
        external: true,
      },
      {
        label: 'Southern California Edison (SCE)',
        href: 'https://www.sce.com/',
        note: 'Many Valley / SGV / South Bay addresses',
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
    'Filter listings by zone keywords (e.g. Westside, Valley) or open full profiles. Local movers may only serve selected LA County areas — confirm coverage before booking.',
  lastReviewed: '2026-07-21',
};
