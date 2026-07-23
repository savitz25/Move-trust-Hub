import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted San Francisco County moving intelligence.
 * Used by /local-movers/california/san-francisco and the shared intelligence template.
 *
 * Differentiators vs Peninsula / East Bay: extreme density, hills, parking permits,
 * micro-units & vertical living, tech/finance calendars, SFMTA curb rules.
 */
export const sanFranciscoCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'california',
  countySlug: 'san-francisco',
  hubTitle: 'San Francisco County Moving Intelligence Hub',
  eyebrow: 'San Francisco · Hyper-local city-county guide',
  h1: 'Moving in San Francisco: Hills, Parking Permits, Vertical Living & Zone Guide',
  heroOpener:
    'San Francisco is a city-county where density is the product, not the exception. Victorian flats with three-flight carries sit one block from micro-units and glass towers that demand Certificates of Insurance, freight elevators, and weekday-only windows. Hills rewrite truck length before you open a door; SFMTA parking permits and temporary no-parking signs decide whether a 26′ box truck ever reaches the curb. Tech and finance lease turns, plus end-of-month apartment churn, fill crews while fog-damp cardboard and windy rooftops punish lazy packing. This guide is for people moving in San Francisco — not generic Bay Area tips recycled from Oakland or San Jose.',
  heroCredibility:
    'Hills & vertical access · Parking-permit aware · Tech/finance calendars · Intrastate CA (BHGS) · FMCSA when interstate · Curated listings',
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
    title: 'What makes moving in San Francisco different',
    intro:
      'These are the city-county realities that separate a clean estimate from a day-of scramble — density, hills, permits, and building paperwork.',
    bullets: [
      {
        title: 'Extreme density is the default logistics problem',
        detail:
          'Most SF addresses lack private driveways. Curb space is shared with buses, bike lanes, loading zones, and resident permit parking. A “local” studio can still need temporary no-parking signs, a smaller shuttle truck, and long-carry from a legal staging block. Share exact cross-streets and photos of the approach — map pins alone understate the job.',
      },
      {
        title: 'Hills rewrite truck size and crew time',
        detail:
          'Russian Hill, Nob Hill, Pacific Heights, Twin Peaks, Bernal Heights, and Noe Valley grades often block full-size trucks at the door. Low branches, tight switchbacks, and limited turnaround force shuttles or multi-trip carries. Ask for a max truck length on the survey and budget stair time for hillside Victorians and multi-level flats.',
      },
      {
        title: 'Parking permits & temporary no-parking are line items',
        detail:
          'SFMTA temporary parking restriction (TPR) signs and residential permit zones decide whether a truck can legally idle. Many buildings require movers to post signs 24–72 hours ahead. Confirm who pulls permits, who pays, and what happens if signs are missing on move morning — idle time is billable.',
      },
      {
        title: 'Vertical living: elevators, docks & COI culture',
        detail:
          'SOMA, Financial District, Mission Bay, Rincon Hill, and many mid-rises require Certificates of Insurance naming the building or HOA, elevator reservations, floor protection, and approved hours (often weekdays only). Micro-units and high-rise condos add inventory constraints — tight elevators, reserved docks, and zero curb grace. Send the building packet with the estimate request.',
      },
      {
        title: 'Micro-units, TICs & older multi-unit stock',
        detail:
          'In-law units, tenancy-in-common buildings, railroad flats, and converted lofts mean narrow halls, shared stairs, and neighbors who control elevator calendars. Soft goods and disassembled furniture often fit better than fully assembled pieces. Measure sofa and mattress paths before move day.',
      },
      {
        title: 'Tech & finance calendars drive demand spikes',
        detail:
          'Corporate starts, RSU/vesting-driven housing changes, and large employer onboarding cycles cluster moves mid-week near SOMA, Mission Bay, and FiDi. End-of-month apartment turns collide with those peaks. Flexible mid-month dates are usually cheaper and more available than last-Saturday-of-the-month.',
      },
      {
        title: 'California intrastate rules (BHGS) + FMCSA when interstate',
        detail:
          'Moves entirely within California are generally overseen by the California Bureau of Household Goods and Services (BHGS). Legs that cross state lines need FMCSA authority. Confirm which license applies to your exact origin and destination before you put down a deposit — SF ↔ out-of-state tech transfers are common.',
      },
    ],
  },
  zonesIntro:
    'Treat each SF zone as its own access problem. Hills, tower COIs, and permit streets change the job more than neighborhood brand names alone.',
  zones: [
    {
      id: 'northeast-core',
      name: 'Northeast Core — FiDi, SOMA, Nob Hill, Russian Hill',
      shortName: 'NE Core',
      neighborhoods: [
        'Financial District',
        'SOMA',
        'Rincon Hill',
        'Yerba Buena',
        'Nob Hill',
        'Russian Hill',
        'North Beach',
        'Chinatown',
      ],
      housingTypes:
        'High-rises, mid-rise condos, older walk-up flats, hillside Victorians, mixed-use lofts',
      challenges: [
        'Freight elevator and loading-dock windows',
        'COI naming building / HOA management',
        'Steep grades on Nob / Russian Hill with limited truck turnaround',
        'Event and commute congestion near Embarcadero and Market',
      ],
      moverTips:
        'Send COI requirements and elevator reservation numbers with the estimate. Prefer mid-week morning starts. For hillside streets, assume shuttle or long-carry until photos prove otherwise. Confirm temporary no-parking signs are posted before the crew rolls.',
      cityKeywords: [
        'financial district',
        'fidi',
        'soma',
        'rincon hill',
        'yerba buena',
        'nob hill',
        'russian hill',
        'north beach',
        'chinatown',
        'embarcadero',
        'union square',
      ],
    },
    {
      id: 'mission-bay-potrero',
      name: 'Mission Bay, Dogpatch & Potrero',
      shortName: 'Mission Bay',
      neighborhoods: [
        'Mission Bay',
        'Dogpatch',
        'Potrero Hill',
        'Showplace Square',
        'Central Waterfront',
      ],
      housingTypes:
        'New high-rises, biotech-adjacent rentals, loft conversions, hillside SFH on Potrero grades',
      challenges: [
        'Tower COI and reserved elevator slots',
        'Construction and biotech campus traffic',
        'Potrero Hill grades and limited staging',
        'UCSF / hospital corridor timing near Mission Bay',
      ],
      moverTips:
        'Treat Mission Bay towers like pure vertical jobs — dock and elevator first. Potrero Hill often needs smaller trucks. Share any building move-in coordinator contacts early so COI is not day-of.',
      cityKeywords: [
        'mission bay',
        'dogpatch',
        'potrero',
        'potrero hill',
        'showplace square',
        'ucsf',
      ],
    },
    {
      id: 'mission-castro-noe',
      name: 'Mission, Castro, Noe Valley & Bernal',
      shortName: 'Mission / Noe',
      neighborhoods: [
        'Mission District',
        'Castro',
        'Noe Valley',
        'Bernal Heights',
        'Glen Park',
        'Dolores Heights',
      ],
      housingTypes:
        'Edwardian and Victorian flats, multi-unit walk-ups, hillside homes, some modern infill',
      challenges: [
        'Narrow residential streets and resident permit parking',
        'Multi-flight stairs and tight turns',
        'Bernal / Noe grades that limit truck length',
        'Weekend commercial congestion on Mission and Castro corridors',
      ],
      moverTips:
        'Weekday mornings beat Mission weekend energy. Measure sofa paths for railroad flats. Budget stair protection and long-carry on Bernal and upper Noe. Temporary no-parking signs are often essential on permit blocks.',
      cityKeywords: [
        'mission',
        'castro',
        'noe valley',
        'bernal heights',
        'glen park',
        'dolores heights',
        'eureka valley',
      ],
    },
    {
      id: 'richmond-sunset',
      name: 'Richmond, Sunset & Outer West Side',
      shortName: 'West Side',
      neighborhoods: [
        'Inner Richmond',
        'Outer Richmond',
        'Inner Sunset',
        'Outer Sunset',
        'Parkside',
        'Seacliff',
        'Lake Street',
      ],
      housingTypes:
        'Edwardian and mid-century SFH, multi-unit flats, fog-belt apartments, some larger lots near Seacliff',
      challenges: [
        'Fog and damp conditions for cardboard and wood floors',
        'Resident permit parking and limited curb space',
        'Longer cross-city hauls to SOMA / Mission Bay at peak',
        'Ocean-adjacent wind on exposed blocks',
      ],
      moverTips:
        'Protect floors against damp fog; keep boxes off wet sidewalks. Outer Sunset ↔ FiDi is “local” but can burn hours on Geary or 19th Ave — ask how portal-to-portal time is priced. Early starts still win.',
      cityKeywords: [
        'richmond',
        'sunset',
        'outer sunset',
        'inner sunset',
        'parkside',
        'seacliff',
        'lake street',
        'richmond district',
      ],
    },
    {
      id: 'pacific-heights-marina',
      name: 'Pacific Heights, Marina, Presidio & Cow Hollow',
      shortName: 'N. Waterfront',
      neighborhoods: [
        'Pacific Heights',
        'Marina District',
        'Cow Hollow',
        'Presidio Heights',
        'Presidio',
        'Laurel Heights',
      ],
      housingTypes:
        'High-value SFH and flats, Marina-style apartments, hilltop homes, limited multi-unit towers',
      challenges: [
        'Steep Pacific Heights approaches and limited truck access',
        'High-value inventory handling expectations',
        'Presidio access and gate / road rules when applicable',
        'Weekend tourist and event traffic near the waterfront',
      ],
      moverTips:
        'Share driveway and stair photos for Pac Heights. Discuss full-value valuation for high-end inventories. Confirm Presidio access requirements if either address is inside the park boundary. Prefer mid-week to avoid Marina weekend congestion.',
      cityKeywords: [
        'pacific heights',
        'marina',
        'cow hollow',
        'presidio',
        'presidio heights',
        'laurel heights',
        'marina district',
      ],
    },
    {
      id: 'excelsior-visitacion',
      name: 'Excelsior, Outer Mission, Visitacion Valley & Bayview',
      shortName: 'SE Corridor',
      neighborhoods: [
        'Excelsior',
        'Outer Mission',
        'Visitacion Valley',
        'Bayview',
        'Hunters Point',
        'Portola',
        'Crocker Amazon',
      ],
      housingTypes:
        'Suburban-scale SFH, multi-unit flats, hillside lots, redevelopment-adjacent housing',
      challenges: [
        'I-280 / US-101 spillover and industrial corridor traffic',
        'Hillside and cul-de-sac access in places',
        'Longer hauls to north-side towers on peak days',
        'Mix of easy driveway homes and tight multi-unit blocks',
      ],
      moverTips:
        'Many SE homes have better driveway access than the NE core — still confirm truck length on hills. For Bayview / Hunters Point, share construction or industrial-adjacent notes. Treat SE ↔ Marina or Pac Heights as a long local with honest drive time.',
      cityKeywords: [
        'excelsior',
        'outer mission',
        'visitacion valley',
        'bayview',
        'hunters point',
        'portola',
        'crocker amazon',
        'ingleside',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside San Francisco',
    intro:
      'Two “local” moves of the same square footage can differ by thousands depending on hills, permits, elevators, and cross-city freeways. Density soft costs often exceed labor on paper until access is priced honestly.',
    drivers: [
      {
        title: 'Parking permits & temporary no-parking signs',
        detail:
          'SFMTA TPR signs, resident permit blocks, and paid loading zones add soft costs and risk. Missing signs can idle a full crew — clarify who obtains and posts them.',
      },
      {
        title: 'Shuttle, long-carry & hill access',
        detail:
          'Hill streets and no-truck blocks force shuttle trucks or multi-flight carries. Ask for shuttle and long-carry fees in writing; they frequently exceed $150–$500+ when needed.',
      },
      {
        title: 'Elevator, dock & COI soft costs',
        detail:
          'Tower moves add COI processing, elevator deposits, reserved docks, and weekday-only windows — common in SOMA, Mission Bay, and FiDi high-rises.',
      },
      {
        title: 'Cross-city time vs map miles',
        detail:
          'Outer Sunset → Mission Bay or Bernal → Marina can burn 45–90+ minutes at peak on US-101, I-280, Geary, or 19th Ave. Hourly billing follows the clock, not crow-flies distance.',
      },
      {
        title: 'High-value & micro-unit packing complexity',
        detail:
          'Tech/finance households often need careful packing for electronics and art; micro-units need disassembly and path planning. Cheap released-value coverage is often inadequate for SF inventories.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, walk-up)',
        value: '$700–$1,900+',
        note: 'Higher with hills, permits, or long-carry',
      },
      {
        label: '2–3BR flat or condo',
        value: '$1,900–$4,800+',
        note: 'Elevator + COI windows common in towers',
      },
      {
        label: '3–4+ BR house / multi-level (cross-zone)',
        value: '$3,200–$8,500+',
        note: 'Hill access and north↔south pairs trend higher',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$140–$220+/hr',
        note: 'Portal-to-portal; 3-person crews and packing scale up',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, tech & calendar intelligence',
    intro:
      'SF weather is mild year-round — lease turns, tech onboarding, and fog/wind set the real peaks more than temperature.',
    items: [
      {
        title: 'Peak residential: May – September weekends + end-of-month',
        detail:
          'Apartment lease turns and family moves fill Saturdays. Book 3–5 weeks ahead for last-weekend-of-month dates in popular neighborhoods.',
      },
      {
        title: 'Tech & finance start-date clusters',
        detail:
          'Large employer onboarding and office-adjacent housing changes can spike mid-week demand near SOMA, Mission Bay, and FiDi. Share hard start dates early.',
      },
      {
        title: 'Summer fog & damp west side',
        detail:
          'Richmond and Sunset marine layer keeps mornings cool and damp — protect wood floors and allow cardboard dry-out time. East-side Mission can be warmer the same day.',
      },
      {
        title: 'Parade, marathon & waterfront events',
        detail:
          'Street closures on Market, Embarcadero, and neighborhood festival routes can block staging. Check city event calendars if either address is corridor-adjacent.',
      },
      {
        title: 'Best value: mid-month Tue–Thu mornings',
        detail:
          'Still plan around building weekday windows and permit posting lead times. Avoid last Friday/Saturday of the month when leases and corporate starts collide.',
      },
    ],
  },
  specialized: [
    {
      id: 'vertical-parking',
      title: 'Vertical living, elevators & parking-permit logistics',
      intro:
        'Most SF failures on move day are access failures — elevator windows, COI gaps, and illegal curb staging — not packing skill.',
      bullets: [
        'Request the building’s move packet (COI limits, elevator hours, dock rules) at lease signing or escrow and send it with every estimate request.',
        'Post SFMTA temporary no-parking signs with the required lead time; photograph posted signs the night before.',
        'Assume shuttle or long-carry on grades until a walkthrough or photos prove a full-size truck fits.',
        'Reserve freight elevators in writing and reconfirm the day before — shared residential elevators slip schedules fast.',
        'For micro-units and railroad flats, measure mattress and sofa paths; plan disassembly before the truck arrives.',
      ],
    },
    {
      id: 'hills-high-value',
      title: 'Hills & high-value inventory module',
      intro:
        'Hillside Victorians and tech/finance households need access photos and valuation clarity before crews are booked.',
      bullets: [
        'Share driveway grade, stair count, and turnaround photos for Pacific Heights, Russian Hill, Bernal, and Twin Peaks approaches.',
        'Discuss full-value protection for electronics, art, and design furniture — released-value coverage is often insufficient.',
        'Protect floors and handrails on multi-flight carries; older buildings scratch easily under rush conditions.',
        'Budget extra labor hours for three-plus flights even when map distance is short.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to San Francisco?',
    intro:
      'SF is one city-county with sharp micro-neighborhood differences — density, hills, schools by zone, and commute mode matter more than a single “city average.” Validate fit by pocket, not by skyline photos.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'San Francisco Unified School District (SFUSD) covers the city-county. Assignment and choice systems matter as much as neighborhood reputation — confirm current SFUSD policies for any address.',
        bullets: [
          {
            title: 'District-first research',
            detail:
              'Use SFUSD official resources and California School Dashboard data for programs and performance context. Third-party ranking sites are secondary signals only.',
          },
          {
            title: 'Neighborhood ≠ automatic assignment',
            detail:
              'SF’s student assignment rules have changed over time. Do not assume a listing’s zip guarantees a specific elementary — verify with SFUSD for the year you enroll.',
          },
          {
            title: 'Private & independent options',
            detail:
              'Many relocating families also evaluate independent and parochial schools; application calendars often run well ahead of lease or closing dates.',
          },
          {
            title: 'Higher education presence',
            detail:
              'USF, SF State, UCSF, and nearby universities shape rental demand and traffic near campus-adjacent neighborhoods — useful context for dual-career academic households.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Major systems',
            detail:
              'UCSF Health, Zuckerberg San Francisco General, CPMC (Sutter), and Kaiser facilities serve different parts of the city — map ER and specialty access from your target neighborhood at rush hour.',
          },
          {
            title: 'Insurance networks',
            detail:
              'Confirm in-network hospitals and specialists before you sign a lease; SF systems book out for some specialties.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer pediatric and specialty care early if you are mid-treatment; bring records digitally when possible.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing & cost of living',
        bullets: [
          {
            title: 'Stock variety under one skyline',
            detail:
              'Micro-units, TIC flats, rent-controlled apartments, high-rise condos, and hillside SFH coexist. Access rules and monthly costs differ more than square footage alone suggests.',
          },
          {
            title: 'Cost structure',
            detail:
              'Housing typically dominates the budget. Compare total monthly cost (rent or mortgage, HOA, parking, insurance) — not sticker price alone.',
          },
          {
            title: 'Parking & storage reality',
            detail:
              'Many buildings lack included parking or large storage. Factor garage fees and off-site storage into move planning and ongoing costs.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Neighborhood fit by lifestyle',
        bullets: [
          {
            title: 'Vertical / walkable core',
            detail:
              'SOMA, Mission Bay, FiDi, and parts of the Mission for short commutes to tech/finance and transit-heavy living.',
          },
          {
            title: 'Family-oriented pockets',
            detail:
              'Noe Valley, parts of the Richmond/Sunset, Bernal Heights, and Glen Park often appeal to households wanting more residential character — still verify schools and access.',
          },
          {
            title: 'Quieter west / SE edges',
            detail:
              'Outer Sunset, Outer Richmond, Excelsior, and Portola can trade central density for slightly more space and different fog/wind patterns.',
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
              'Technology, finance, professional services, healthcare, hospitality, and public sector roles concentrate in the NE core, Mission Bay, and civic corridors.',
          },
          {
            title: 'Transit options',
            detail:
              'BART, Muni Metro, buses, Caltrain (via connections), and ferries support car-light living for many households — map door-to-door times at peak, not midday.',
          },
          {
            title: 'Car reality',
            detail:
              'Owning a car in SF often means paid garage parking and tight street rules. Many residents go car-light; others keep a vehicle for Peninsula or weekend trips.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & climate',
        bullets: [
          {
            title: 'Microclimates',
            detail:
              'Fog and wind on the west side vs warmer Mission-side days are real. Pack and dress by neighborhood, not by “California” stereotypes.',
          },
          {
            title: 'Walkability & density',
            detail:
              'Daily errands, restaurants, and parks are often close — at the cost of noise, parking scarcity, and shared building rules.',
          },
          {
            title: 'Outdoors access',
            detail:
              'Golden Gate Park, the Presidio, ocean and bay waterfronts, and nearby regional parks are major draws; weekend visitor traffic affects staging near tourist corridors.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Practical San Francisco resources',
    intro:
      'Official links, licensing, and curb rules — building HOAs and SFMTA postings change; verify before move day.',
    items: [
      {
        label: 'City & County of San Francisco',
        href: 'https://sf.gov/',
        note: 'City services hub',
        external: true,
      },
      {
        label: 'SFMTA — parking & temporary restrictions',
        href: 'https://www.sfmta.com/parking',
        note: 'Parking, TPR / temporary no-parking context',
        external: true,
      },
      {
        label: 'SFMTA — temporary sign / parking restriction info',
        href: 'https://www.sfmta.com/',
        note: 'Confirm current temporary restriction process before move day',
        external: true,
      },
      {
        label: 'SF Planning / building context',
        href: 'https://sfplanning.org/',
        note: 'City planning context; HOA rules are separate',
        external: true,
      },
      {
        label: 'SFUSD — San Francisco Unified School District',
        href: 'https://www.sfusd.edu/',
        note: 'School assignment and district resources',
        external: true,
      },
      {
        label: '511 SF Bay — traffic conditions',
        href: 'https://511.org/',
        note: 'Check 101/280 and city approaches before locking load windows',
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
        label: 'PG&E — start/stop service',
        href: 'https://www.pge.com/',
        note: 'Electric & gas for San Francisco',
        external: true,
      },
      {
        label: 'SFPUC — water & power context',
        href: 'https://sfpuc.org/',
        note: 'Municipal water and related services',
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
    'Filter listings by zone (NE Core, Mission Bay, Mission/Noe, West Side, N. Waterfront, SE Corridor) when available. Confirm parking permits, elevator COI, and hill access before booking — SF density jobs fail on access, not miles.',
  lastReviewed: '2026-07-23',
};
