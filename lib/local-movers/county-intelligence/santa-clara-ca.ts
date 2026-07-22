import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Santa Clara County moving intelligence.
 * Used by /local-movers/california/santa-clara and the shared intelligence template.
 *
 * Differentiators vs SF/Alameda/generic Bay Area: Silicon Valley tech relocation density,
 * extreme home values & shipment value, HOA/condo paperwork culture, campus-adjacent
 * timing, North County corridor vs South County distance — not SF hills or East Bay.
 */
export const santaClaraCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'california',
  countySlug: 'santa-clara',
  hubTitle: 'Santa Clara County Moving Intelligence Hub',
  eyebrow: 'Santa Clara County · Silicon Valley guide',
  h1: 'Moving in Santa Clara County: Silicon Valley, HOAs & Zone-by-Zone Guide',
  heroOpener:
    'Santa Clara County is the heart of Silicon Valley and the most populous county in the Bay Area / Northern California (~1.91–1.92 million residents). Extreme housing costs mean high average shipment values — executive and tech households full of monitors, workstations, art, and fragile specialty gear. Corporate new-hire and campus-driven relocations stack on top of normal lease turns. HOAs, condo boards, and building managers routinely require Certificates of Insurance, elevator windows, and weekday-only moves. US-101, I-280, I-880, SR-85, SR-87, and SR-237 can turn a 12-mile hop into a half-day of billable time. This guide is for people moving in Santa Clara County — not generic “Bay Area” tips recycled from San Francisco or the East Bay.',
  heroCredibility:
    'Silicon Valley–aware · High-value household focus · HOA/condo first · Intrastate CA (BHGS) · FMCSA when interstate · Curated listings',
  whatMakesDifferent: {
    title: 'What makes moving in Santa Clara County different',
    intro:
      'These are the Silicon Valley realities that change estimates, insurance, and schedules — especially high-value inventory, HOAs, and tech-corridor traffic.',
    bullets: [
      {
        title: 'High housing costs → high shipment values',
        detail:
          'Median home prices and household incomes push inventory value well above many California counties. Ask for adequate declared-value or third-party coverage; default released-value rates are rarely enough for a typical North County or West Valley household packed with electronics and design furniture.',
      },
      {
        title: 'Tech & corporate relocation rhythm',
        detail:
          'New-hire starts, campus transfers, and equity-driven home purchases create waves of moves near major employers. Offer letters and start dates often force mid-month mid-week windows. Share hard dates early so crews can plan around 101/280/237 peaks.',
      },
      {
        title: 'HOA, condo & building paperwork is routine',
        detail:
          'Townhomes, planned communities, and mid/high-rise buildings across Sunnyvale, Santa Clara, Mountain View, San Jose, and Campbell commonly require COI naming the HOA or management company, elevator reservations, floor protection, and approved hours (often weekdays only). Treat the building packet as part of the survey — not a day-of surprise.',
      },
      {
        title: 'Electronics-heavy households',
        detail:
          'Multi-monitor setups, networking gear, servers, instruments, and specialty tech are common. Request TV/monitor cartons, anti-static handling where appropriate, and inventory photos for high-value items. White-glove or partial-pack options pay for themselves when the living room is a home office.',
      },
      {
        title: 'Freeway timing is a line item',
        detail:
          'US-101, I-280, I-880, SR-85, SR-87, and SR-237 control billable hours. Palo Alto ↔ South San Jose, Cupertino ↔ Milpitas, or Mountain View ↔ Gilroy can double travel time in 7–10 a.m. and 3–7 p.m. peaks. Ask whether quotes are portal-to-portal and how peak windows are priced.',
      },
      {
        title: 'Campus-adjacent congestion',
        detail:
          'Major tech campuses concentrate commute and shuttle traffic. Moves near large employers should avoid shift-change surges when possible and confirm street parking / loading rules that change during campus events.',
      },
      {
        title: 'South County is a different logistics profile',
        detail:
          'Morgan Hill, Gilroy, and San Martin feel more suburban/agricultural with longer hauls to North County job centers. Treat South County ↔ North County as a long local pair with honest drive-time assumptions — not the same as a Sunnyvale ↔ Mountain View hop.',
      },
      {
        title: 'California intrastate rules (BHGS)',
        detail:
          'Moves entirely within California are generally overseen by the California Bureau of Household Goods and Services (BHGS). Interstate legs (e.g. San Jose → Seattle or out of state) need FMCSA authority. Confirm which license applies to your exact origin and destination.',
      },
    ],
  },
  zonesIntro:
    'Treat each zone as its own access and value profile. North County tech condos, West Valley homes, East San Jose neighborhoods, and South County tracts are not interchangeable — Silicon Valley density and paperwork define the job more than generic Bay Area advice.',
  zones: [
    {
      id: 'central-sj',
      name: 'Central / Downtown San Jose & Urban Core',
      shortName: 'Central SJ',
      neighborhoods: [
        'Downtown San Jose',
        'Japantown',
        'Diridon / SAP Center area',
        'Rose Garden',
        'Naglee Park',
        'Midtown',
        'St. James',
      ],
      housingTypes:
        'High-rises, mid-rise condos, denser multi-family, some historic SFH and walk-ups',
      challenges: [
        'Elevator reservations, loading docks, and COI requirements',
        'Event and arena traffic near Diridon / SAP Center',
        'Limited curb staging and permit-sensitive streets',
        'SR-87 / I-280 / US-101 weave congestion into the core',
      ],
      moverTips:
        'Send building rules + COI with the estimate. Confirm dock or freight-elevator numbers the day before. Avoid major event nights near downtown when possible. Weekday mornings are usually the cleanest staging windows.',
      cityKeywords: [
        'downtown san jose',
        'san jose',
        'japantown',
        'diridon',
        'rose garden',
        'naglee park',
        'midtown',
        'st james',
        'sofa',
      ],
    },
    {
      id: 'north-tech',
      name: 'North County / Tech Corridor',
      shortName: 'North Tech',
      neighborhoods: [
        'Sunnyvale',
        'Santa Clara',
        'Mountain View',
        'Palo Alto',
        'Los Altos',
        'Cupertino',
        'Milpitas',
        'Los Altos Hills',
      ],
      housingTypes:
        'Condos, townhomes, mid-rises, executive SFH, planned communities, some hillside estates',
      challenges: [
        'Near-universal HOA/condo paperwork in many complexes',
        'US-101 / SR-237 / I-280 / SR-85 commute peaks near campuses',
        'High shipment values and electronics density',
        'Tight visitor parking at multi-unit buildings',
      ],
      moverTips:
        'Collect HOA/management move packets early. Prefer mid-week mornings away from campus shift changes. Inventory multi-monitor setups and specialty gear on the survey. Confirm valuation coverage matches household value.',
      cityKeywords: [
        'sunnyvale',
        'santa clara',
        'mountain view',
        'palo alto',
        'los altos',
        'cupertino',
        'milpitas',
        'los altos hills',
        'stanford',
        'north san jose',
      ],
    },
    {
      id: 'west-valley',
      name: 'West Valley',
      shortName: 'West Valley',
      neighborhoods: [
        'Campbell',
        'Los Gatos',
        'Saratoga',
        'Willow Glen',
        'Almaden Valley',
        'Cambrian',
        'Cupertino edge',
      ],
      housingTypes:
        'Single-family homes, hillside properties, townhomes, tree-lined neighborhoods, higher-value SFH',
      challenges: [
        'Hillside driveways and limited truck turnaround (Los Gatos / Saratoga foothills)',
        'Narrow residential streets and parking constraints',
        'SR-85 / SR-17 approach congestion',
        'High-value contents and careful handling expectations',
      ],
      moverTips:
        'Share driveway and approach photos for hillside homes. Budget long-carry or shuttle on tight streets. West Valley SFH inventories often need more packing labor than North County condos — survey carefully.',
      cityKeywords: [
        'campbell',
        'los gatos',
        'saratoga',
        'willow glen',
        'almaden',
        'cambrian',
        'monte sereno',
        'burbank',
      ],
    },
    {
      id: 'east-sj',
      name: 'East San Jose & Evergreen',
      shortName: 'East SJ / Evergreen',
      neighborhoods: [
        'East San Jose',
        'Evergreen',
        'Alum Rock',
        'King & Story area',
        'Silver Creek',
        'Communications Hill',
      ],
      housingTypes:
        'Suburban SFH, townhomes, multi-family, hillside planned pockets, mixed older and newer tracts',
      challenges: [
        'Hills and longer carries in Evergreen / Silver Creek',
        'US-101 / I-680 / Capitol Expressway traffic patterns',
        'Varied HOA presence vs open-street neighborhoods',
        'Cross-town travel time to North County job centers',
      ],
      moverTips:
        'Clarify origin/destination within San Jose — East ↔ North can be a long “local.” Hillside Evergreen lots may need approach photos. Confirm multi-unit elevator rules where applicable.',
      cityKeywords: [
        'evergreen',
        'alum rock',
        'east san jose',
        'silver creek',
        'communications hill',
        'king and story',
        'monterey road',
      ],
    },
    {
      id: 'south-county',
      name: 'South County',
      shortName: 'South County',
      neighborhoods: [
        'Morgan Hill',
        'Gilroy',
        'San Martin',
        'South San Jose fringe',
      ],
      housingTypes:
        'Suburban SFH, newer tracts, some agricultural-edge properties, growing HOA communities',
      challenges: [
        'Longer hauls to North County / Peninsula job centers via US-101',
        'Peak commute congestion on 101 toward Silicon Valley core',
        'Larger average lot sizes and bulk volume vs urban condos',
        'Weather and heat inland vs cooler peninsula days',
      ],
      moverTips:
        'Treat Morgan Hill/Gilroy ↔ Sunnyvale/Palo Alto as long local hauls with honest portal-to-portal time. Mid-week mid-month is often best. Confirm HOA rules in newer South County tracts.',
      cityKeywords: [
        'morgan hill',
        'gilroy',
        'san martin',
        'south county',
        'coyote',
        'san teresa',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Santa Clara County',
    intro:
      'Two “local” moves of the same square footage can differ by thousands depending on HOA soft costs, high-value packing, freeway windows, and whether the pair is North County condo-to-condo or South County long-haul.',
    drivers: [
      {
        title: 'HOA, COI & elevator soft costs',
        detail:
          'COI processing, elevator deposits, reserved loading times, and weekday-only windows add $100–$500+ in soft costs before labor starts — common across North County and many San Jose multi-unit buildings.',
      },
      {
        title: 'High-value packing & valuation',
        detail:
          'Electronics, art, and designer furniture increase packing labor and insurance needs. Cheap released-value coverage is often inadequate for Silicon Valley households.',
      },
      {
        title: 'Cross-corridor freeway time',
        detail:
          'Palo Alto ↔ Evergreen or Cupertino ↔ Gilroy can burn hours on 101/280/85/237. Hourly billing follows time, not crow-flies miles.',
      },
      {
        title: 'Campus & commute peak windows',
        detail:
          'Tech corridor shift changes and school calendars concentrate demand. Mid-month mid-week mornings usually price best; end-of-month Saturdays fill first.',
      },
      {
        title: 'Hillside / West Valley access',
        detail:
          'Los Gatos, Saratoga, and foothill properties may need smaller trucks, long carries, or shuttles — budget access complexity explicitly.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR condo (same zone)',
        value: '$700–$1,800+',
        note: 'Elevator + COI windows common in North County',
      },
      {
        label: '2–3BR condo / townhome',
        value: '$2,000–$4,800+',
        note: 'HOA soft costs and electronics packing trend up',
      },
      {
        label: '3–4+ BR house (cross-zone / high value)',
        value: '$3,200–$8,500+',
        note: 'West Valley SFH and multi-freeway hauls price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$145–$220+/hr',
        note: 'Portal-to-portal; packing and 3-person crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, tech-calendar & traffic intelligence',
    intro:
      'Silicon Valley peaks follow tech hiring, school calendars, and freeways — weather is mild compared with Southern California deserts.',
    items: [
      {
        title: 'Peak demand: late spring – early fall + end-of-month',
        detail:
          'School calendars, new-hire start dates, and lease turns fill Saturdays. Book 2–4 weeks ahead for popular North County windows.',
      },
      {
        title: 'Tech hiring waves',
        detail:
          'Large employer onboarding cycles can cluster mid-week moves near campuses. Hard start dates beat flexible ones for crew availability — share them early.',
      },
      {
        title: 'Commute-season congestion',
        detail:
          'School-year mornings and evenings are worst on 101/280/237/85. Early truck arrivals still win even when the weather is perfect.',
      },
      {
        title: 'Holiday and event pockets',
        detail:
          'Downtown San Jose events and holiday weeks can block staging. Check local calendars if either address is event-adjacent.',
      },
      {
        title: 'Best value: mid-month Tue–Thu mornings',
        detail:
          'Still plan around HOA weekday windows. Avoid last Friday/Saturday of the month when leases and corporate starts collide.',
      },
    ],
  },
  resources: {
    title: 'Practical Santa Clara County resources',
    intro:
      'Official links and licensing notes — HOA and building rules change; verify current requirements before move day.',
    items: [
      {
        label: 'City of San Jose — transportation & parking context',
        href: 'https://www.sanjoseca.gov/',
        note: 'City services; building HOA rules are separate',
        external: true,
      },
      {
        label: 'City of Sunnyvale',
        href: 'https://www.sunnyvale.ca.gov/',
        external: true,
      },
      {
        label: 'City of Palo Alto',
        href: 'https://www.cityofpaloalto.org/',
        external: true,
      },
      {
        label: 'City of Mountain View',
        href: 'https://www.mountainview.gov/',
        external: true,
      },
      {
        label: 'City of Cupertino',
        href: 'https://www.cupertino.org/',
        external: true,
      },
      {
        label: 'Santa Clara County — official site',
        href: 'https://www.sccgov.org/',
        external: true,
      },
      {
        label: '511 SF Bay — traffic conditions',
        href: 'https://511.org/',
        note: 'Check 101/280/237/85 before locking load windows',
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
        note: 'Electric & gas for most of the county',
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
    'Filter listings by zone (Central SJ, North Tech, West Valley, East SJ/Evergreen, South County) when available. Confirm HOA/COI rules and valuation coverage — especially for North County condos and high-value West Valley homes.',
  lastReviewed: '2026-07-22',
};
