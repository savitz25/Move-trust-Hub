import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted San Diego County moving intelligence.
 * Used by /local-movers/california/san-diego and the shared intelligence template.
 *
 * Differentiators vs LA / Orange County: military PCS volume, base access,
 * coastal condo/HOA density, North County vs South Bay logistics, border corridor.
 */
export const sanDiegoCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'california',
  countySlug: 'san-diego',
  hubTitle: 'San Diego County Moving Intelligence Hub',
  eyebrow: 'San Diego County · Hyper-local guide',
  h1: 'Moving in San Diego County: Military PCS, Condos & Zone-by-Zone Guide',
  heroOpener:
    'San Diego County is one of the densest military markets in the United States — Naval Base San Diego, Coronado, MCAS Miramar, MCRD, and the pull of Camp Pendleton in North County shape calendars, crew demand, and what “local experience” actually means. Layer on coastal high-rises with COI and elevator windows, beach neighborhoods with zero truck staging, and a freeway spine (I-5, I-15, I-8, I-805) that can turn a 15-mile hop into a half-day bill. This guide is for people moving here — not generic SoCal tips recycled from LA.',
  heroCredibility:
    'Military & PCS-aware guidance · Intrastate CA (BHGS) · FMCSA when interstate · Curated county listings',
  whatMakesDifferent: {
    title: 'What makes moving in San Diego County different',
    intro:
      'These are the local realities that separate a clean estimate from a blown schedule — especially if you are military, coastal, or high-rise.',
    bullets: [
      {
        title: 'Military & PCS dominate demand',
        detail:
          'San Diego County hosts 115,000+ active-duty personnel with major Navy and Marine Corps footprints: Naval Base San Diego (32nd Street), Naval Base Coronado (North Island + Amphibious Base), MCAS Miramar, Marine Corps Recruit Depot San Diego, and strong spillover from Camp Pendleton into Oceanside / North County. Peak PCS windows (typically late spring through summer, plus end-of-month duty station changes) fill crews weeks out. Prefer movers who routinely handle military households, temporary lodging, partial-pack, and storage-in-transit — not just civilian local hauls.',
      },
      {
        title: 'Base access is a logistics plan, not a footnote',
        detail:
          'Gate rules, REAL ID / CAC requirements, vehicle registration, and prohibited items vary by installation. Share base destination (or on-base housing) early so the crew can stage outside if needed, use an escort protocol, or schedule within visitor hours. Never assume a 26′ truck can idle at the gate. Confirm whether the quote includes wait time for base entry.',
      },
      {
        title: 'Condos, high-rises & HOAs are the default in many zip codes',
        detail:
          'Downtown San Diego, Little Italy, Marina District, Mission Valley towers, UTC / La Jolla Village, and much of coastal North County require Certificates of Insurance naming the HOA or building, elevator reservations, floor protection, and often weekday-only move windows (e.g. 9–4). Get building rules in writing and send them with the estimate request — after-the-fact COI scrambles cause day-of cancellations.',
      },
      {
        title: 'Beach streets punish large trucks',
        detail:
          'Pacific Beach, Mission Beach, Ocean Beach, parts of La Jolla, and Coronado residential blocks often have limited staging, tight alleys, sand-adjacent approaches, and aggressive weekend parking. Many jobs need a smaller shuttle or long-carry from a legal staging street. Budget time and ask about shuttle fees before Saturday move day.',
      },
      {
        title: 'Freeway timing is a line item',
        detail:
          'I-5 (coast spine), I-15 (inland North County / Escondido), I-8 (East County), I-805 (mid-city bypass), SR-52, and SR-163 control billable hours. Mission Valley ↔ coastal, South Bay ↔ North County, and East County ↔ beach runs can double travel time in the 7–9 a.m. and 3–6:30 p.m. peaks. Ask if quotes are portal-to-portal and how peak windows are priced.',
      },
      {
        title: 'Coastal air & sand change packing',
        detail:
          'Salt air and fine beach sand work into electronics, hinges, and cardboard. Good crews use extra wrap for metal and wood, keep boxes off damp concrete, and protect floors near open beach doors. If either address is within a few blocks of the water, say so on the survey.',
      },
      {
        title: 'South Bay & border-corridor logistics',
        detail:
          'Chula Vista, National City, Imperial Beach, and Otay Mesa sit near commercial truck routes, port-adjacent traffic, and border-crossing volume. Weekday mid-day can stall a local crew on I-5 / I-805. If you are relocating for work near the border industrial parks, avoid peak commercial windows when possible.',
      },
      {
        title: 'California intrastate rules (BHGS)',
        detail:
          'Moves entirely within California are generally overseen by the California Bureau of Household Goods and Services (BHGS). Interstate legs (e.g. San Diego → Phoenix or out-of-state PCS) need FMCSA authority. Confirm which license applies to your exact origin and destination before you put down a deposit.',
      },
    ],
  },
  zonesIntro:
    'Treat each zone as its own logistics problem. Military corridors, coastal condo rules, and inland heat change the job more than a map alone suggests — San Diego is not interchangeable with LA or Orange County.',
  zones: [
    {
      id: 'central',
      name: 'Central / Urban Core',
      shortName: 'Central',
      neighborhoods: [
        'Downtown',
        'Bankers Hill',
        'Hillcrest',
        'North Park',
        'South Park',
        'Mission Valley',
        'University Heights',
        'Normal Heights',
      ],
      housingTypes:
        'High-rises, mid-rise condos, walk-ups, older streetcar-era homes, Mission Valley towers',
      challenges: [
        'Elevator reservations and loading-dock windows',
        'COI naming HOA / building management',
        'Street parking scarcity and event closures (Petco / Gaslamp)',
        'I-5 / SR-163 / I-8 merge congestion into the core',
      ],
      moverTips:
        'Send building rules + COI requirements with the estimate. Prefer mid-week morning starts. Confirm dock or freight-elevator reservation numbers the day before. Hillcrest and North Park walk-ups need stair protection and careful curb staging.',
      cityKeywords: [
        'downtown',
        'bankers hill',
        'hillcrest',
        'north park',
        'south park',
        'mission valley',
        'university heights',
        'normal heights',
        'little italy',
        'east village',
        'gaslamp',
      ],
    },
    {
      id: 'coastal',
      name: 'Coastal Beach Communities',
      shortName: 'Coastal',
      neighborhoods: [
        'Pacific Beach',
        'Mission Beach',
        'La Jolla',
        'Ocean Beach',
        'Point Loma',
        'Coronado',
        'Mission Bay',
      ],
      housingTypes:
        'Beach cottages, condos, cliff-side homes, Coronado SFH, limited-staging multi-unit buildings',
      challenges: [
        'Almost no legal truck staging on beach blocks',
        'Weekend tourist and boardwalk congestion',
        'Sand / salt-air packing and floor protection',
        'Naval Base Coronado access when destination is on-base or base-adjacent',
      ],
      moverTips:
        'Expect shuttle or long-carry on many PB / Mission Beach / OB streets. Book weekdays for tourist corridors. Mention Coronado bridge timing and any base housing destination early. Pack soft goods against sand; wrap metal and outdoor furniture carefully.',
      cityKeywords: [
        'pacific beach',
        'mission beach',
        'la jolla',
        'ocean beach',
        'point loma',
        'coronado',
        'mission bay',
        'pb',
        'ob',
        'bird rock',
        'pacific beach',
      ],
    },
    {
      id: 'north-county',
      name: 'North County Coastal & Inland',
      shortName: 'North County',
      neighborhoods: [
        'Oceanside',
        'Carlsbad',
        'Encinitas',
        'Solana Beach',
        'Del Mar',
        'Vista',
        'San Marcos',
        'Escondido',
        'Poway',
      ],
      housingTypes:
        'Coastal SFH and condos, master-planned communities, inland suburban tracts, gated HOAs',
      challenges: [
        'Camp Pendleton influence and PCS timing in Oceanside / Camp Pendleton corridor',
        'I-5 coastal vs I-15 inland travel times diverge sharply at peak',
        'Gated communities with visitor and truck rules',
        'Long “local” hauls North County ↔ South Bay or East County',
      ],
      moverTips:
        'Treat Oceanside / Carlsbad military moves like specialized jobs — base experience helps. For inland (Escondido, San Marcos, Vista), summer heat favors early starts. Confirm whether North County ↔ central San Diego is still billed as a short local under the mover’s rate card.',
      cityKeywords: [
        'oceanside',
        'carlsbad',
        'encinitas',
        'solana beach',
        'del mar',
        'vista',
        'san marcos',
        'escondido',
        'poway',
        'cardiff',
        'leucadia',
        'rancho bernardo',
        '4s ranch',
        'camp pendleton',
      ],
    },
    {
      id: 'south-bay',
      name: 'South Bay & Border Corridor',
      shortName: 'South Bay',
      neighborhoods: [
        'Chula Vista',
        'National City',
        'Imperial Beach',
        'Bonita',
        'Otay Mesa',
        'San Ysidro',
      ],
      housingTypes: 'Suburban SFH, multi-family, newer master plans, industrial-adjacent housing',
      challenges: [
        'I-5 / I-805 commercial and border-related traffic',
        'Longer hauls to La Jolla / North County on peak days',
        'Port and warehouse corridor congestion mid-week',
      ],
      moverTips:
        'Avoid mid-day mid-week near Otay Mesa freight routes when possible. Chula Vista HOA communities often need COI. If either address is near the border industrial parks, share that on the survey for realistic drive-time assumptions.',
      cityKeywords: [
        'chula vista',
        'national city',
        'imperial beach',
        'bonita',
        'otay',
        'san ysidro',
        'south bay',
        'eastlake',
        'otay ranch',
      ],
    },
    {
      id: 'east-county',
      name: 'East County',
      shortName: 'East County',
      neighborhoods: [
        'El Cajon',
        'Santee',
        'La Mesa',
        'Spring Valley',
        'Lemon Grove',
        'Alpine',
        'Lakeside',
        'Jamul',
      ],
      housingTypes: 'Suburban SFH, hillside lots, rural-edge properties, fewer high-rises',
      challenges: [
        'I-8 heat and grade on summer afternoons',
        'Longer carries on hillside / canyon lots',
        'Cross-county drive times to coastal destinations',
        'Wind and heat extremes inland vs coast',
      ],
      moverTips:
        'Summer inland moves should start early. Alpine / Jamul / Lakeside properties may need driveway photos for truck access. Treat East County ↔ coastal as a long local haul with honest travel time in the estimate.',
      cityKeywords: [
        'el cajon',
        'santee',
        'la mesa',
        'spring valley',
        'lemon grove',
        'alpine',
        'lakeside',
        'jamul',
        'casa de oro',
        'rancho san diego',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside San Diego County',
    intro:
      'Two “local” moves of the same square footage can differ by thousands depending on military timing, buildings, zones, and freeway windows. High regional housing costs and PCS peaks keep crews booked — plan inventory and access details early.',
    drivers: [
      {
        title: 'PCS & end-of-month military calendars',
        detail:
          'Late spring through summer and last-week-of-month duty changes push demand (and prices) up. Mid-month mid-week civilian dates are usually the best value.',
      },
      {
        title: 'High-rise, condo & HOA soft costs',
        detail:
          'COI processing, elevator deposits, reserved docks, and weekday-only windows add $100–$500+ in soft costs before labor starts — common downtown, Mission Valley, and coastal towers.',
      },
      {
        title: 'Shuttle, long-carry & beach access',
        detail:
          'Beach blocks and no-truck streets force shuttle trucks or long carries. Ask for shuttle fees in writing; they are often $150–$400+ when needed.',
      },
      {
        title: 'Cross-zone freeways vs map miles',
        detail:
          'Oceanside → Chula Vista or Alpine → PB is “local” on a map but can burn hours on I-5 / I-15 / I-8. Hourly billing follows time, not crow-flies distance.',
      },
      {
        title: 'Base wait time & dual-location staging',
        detail:
          'If housing is on-base or gate-adjacent, wait time and staging outside the installation may be billable. Clarify before move day.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, walk-up)',
        value: '$600–$1,500+',
        note: 'Higher with elevators, downtown COI, or beach shuttle needs',
      },
      {
        label: '2–3BR apartment or condo',
        value: '$1,700–$4,000+',
        note: 'Elevator + COI windows common in towers',
      },
      {
        label: '3–4+ BR house (cross-zone / PCS)',
        value: '$2,600–$6,500+',
        note: 'North County ↔ South Bay and military peak weeks trend higher',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$125–$195+/hr',
        note: 'Portal-to-portal; 3-person crews and packing scale up',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, military & calendar intelligence',
    intro:
      'San Diego’s weather is mild year-round — the military calendar, tourism, and school year set the real peaks.',
    items: [
      {
        title: 'PCS peak: roughly May – August (+ end-of-month spikes)',
        detail:
          'Navy and Marine Corps permanent-change-of-station orders cluster in summer. Book 3–6 weeks ahead for Saturday or end-of-month military moves. Temporary lodging and storage-in-transit are common add-ons.',
      },
      {
        title: 'Snowbirds & winter visitors (coastal / North County)',
        detail:
          'Winter months bring seasonal residents and short-term rentals along the coast and Carlsbad / Oceanside corridors. Mid-winter weekdays can still be competitive near the beach.',
      },
      {
        title: 'Comic-Con, Padres runs & waterfront events',
        detail:
          'Downtown / Gaslamp / Marina street closures and hotel load-ins can block staging. If either address is near the Convention Center or waterfront, check city event maps before locking a date.',
      },
      {
        title: 'May gray / June gloom (coast)',
        detail:
          'Marine layer keeps mornings cool and damp near the water — protect wood floors and allow cardboard dry-out time. Inland East County can still be hot and clear the same day.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, non-PCS weeks',
        detail:
          'Early starts still win near freeways. Avoid last Friday/Saturday of the month when possible — military and civilian leases collide.',
      },
    ],
  },
  resources: {
    title: 'Practical San Diego County resources',
    intro:
      'Official links, licensing, and military-adjacent references — always verify current gate and city rules before move day.',
    items: [
      {
        label: 'City of San Diego — parking & temporary restrictions',
        href: 'https://www.sandiego.gov/parking',
        note: 'Street parking, temporary no-parking, and related rules',
        external: true,
      },
      {
        label: 'City of San Diego — special events / street impacts',
        href: 'https://www.sandiego.gov/specialevents',
        note: 'Check downtown & waterfront closures',
        external: true,
      },
      {
        label: 'Naval Base San Diego (CNIC)',
        href: 'https://cnrsw.cnic.navy.mil/Installations/NAVBASE-San-Diego/',
        note: 'Installation info — confirm current visitor / gate policy',
        external: true,
      },
      {
        label: 'Naval Base Coronado (CNIC)',
        href: 'https://cnrsw.cnic.navy.mil/Installations/NAVBASE-Coronado/',
        note: 'North Island & amphibious base area',
        external: true,
      },
      {
        label: 'MCAS Miramar',
        href: 'https://www.miramar.marines.mil/',
        note: 'Confirm access requirements if destination is on or near base',
        external: true,
      },
      {
        label: 'Marine Corps Recruit Depot San Diego',
        href: 'https://www.mcrdsd.marines.mil/',
        external: true,
      },
      {
        label: 'Military OneSource — PCS & moving',
        href: 'https://www.militaryonesource.mil/moving-housing/moving/',
        note: 'Official PCS planning resources for service members',
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
        label: 'SDG&E — start/stop service',
        href: 'https://www.sdge.com/',
        note: 'Gas & electric for most of the county',
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
    'Filter listings by zone (Central, Coastal, North County, South Bay, East County) when available. Military PCS, base housing, and coastal high-rises need explicit coverage confirmation before booking.',
  lastReviewed: '2026-07-22',
};
