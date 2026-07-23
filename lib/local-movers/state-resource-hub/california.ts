import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * California Moving Resource Hub — polished master template.
 * Used by /local-movers/california. Every CA county appears in exactly one region.
 */
export const californiaStateResourceHub: StateResourceHubPack = {
  stateSlug: 'california',
  stateCode: 'CA',
  h1: 'California Moving Resource Hub: Costs, BHGS Rules & 58 County Guides',
  metaTitle:
    'California Movers Guide 2026 — Costs, BHGS Regulations & 58 County Guides',
  metaDescription:
    'Plan a move within, to, or from California. Compare local and intrastate costs, verify BHGS Household Mover permits, browse 58 county guides, and use free tools — independent of mover lead fees.',
  heroSubhead:
    'The independent planning hub for California moves in 2026 — typical costs, BHGS vs FMCSA rules, regional and county guides, and tools to compare licensed movers without paid placements.',
  trustBar: [
    '58 County Guides',
    '400+ Verified Movers',
    'BHGS & FMCSA Checked',
    'Updated 2026',
  ],
  intents: [
    {
      id: 'within',
      label: 'Moving Within California',
      href: '#hub-regulations',
      description:
        'Confirm BHGS rules for in-state work, then compare local costs and open the counties you will use.',
    },
    {
      id: 'to',
      label: 'Moving To California',
      href: '#hub-regions',
      description:
        'Choose a region first, then a county guide for parking, HOAs, elevators, and metro logistics.',
    },
    {
      id: 'from',
      label: 'Moving From California',
      href: '#hub-routes',
      description:
        'Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the long haul.',
    },
    {
      id: 'unsure',
      label: 'Not Sure Yet',
      href: '#hub-why-different',
      description:
        'Start with how California markets differ, then use the calculator and map to narrow your plan.',
    },
  ],
  primaryCta: {
    label: 'Calculate My California Moving Cost',
    href: '/moving-calculator',
  },
  secondaryCta: {
    label: 'Find & Compare Movers',
    href: '/companies',
  },
  tertiaryCta: {
    label: 'Explore Regions & Counties',
    href: '#hub-regions',
  },
  whyDifferent: {
    title: 'Why moving in California is different',
    paragraphs: [
      'California is not one moving market. Coastal high-rises, Inland Empire tracts, Central Valley heat, Bay Area hills, and Sierra/rural approaches produce completely different truck access, labor time, and soft costs — even when the map distance looks similar.',
      'Intrastate jobs are regulated by California’s Bureau of Household Goods and Services (BHGS). Interstate jobs need federal FMCSA authority. Treat licensing, peak season, and county-level access rules as first-class planning inputs — then drill into the region and county that match your addresses.',
    ],
  },
  snapshot: {
    title: 'California moving snapshot',
    methodology:
      'Snapshot figures are planning orientation only. Cost bands reflect typical California local and intrastate patterns; they are not bids. Mover counts combine curated county listings and verified directory carriers. Always compare written estimates from licensed movers.',
    stats: [
      {
        label: 'Typical local move (studio–2BR)',
        value: '$600–$2,800+',
        note: 'Same metro; elevators, permits & long carries push higher',
      },
      {
        label: 'Typical local move (3–4+ BR)',
        value: '$2,200–$7,500+',
        note: 'Hills, HOAs, and high-value inventories common',
      },
      {
        label: 'Intrastate corridor (e.g. LA ↔ SF)',
        value: '$3,500–$12,000+',
        note: 'Home size, packing, and season drive the spread',
      },
      {
        label: 'Peak season',
        value: 'May–September',
        note: 'Lower demand often Oct–Mar mid-week',
      },
      {
        label: 'Top outbound states',
        value: 'TX · AZ · NV · WA · OR',
        note: 'Interstate — confirm FMCSA authority',
      },
      {
        label: 'County guides',
        value: '58',
        note: 'Deep / Tier 1 research on major metros',
      },
    ],
  },
  regulations: {
    mode: 'strong_state_regulator',
    title: 'California moving regulations & consumer protection',
    intro:
      'California separates in-state household goods regulation from federal interstate rules. Match the license to the job before you pay a deposit.',
    interstate: {
      title: 'Interstate (any leg outside California)',
      body:
        'If origin or destination is outside California, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. A California BHGS Household Mover permit alone does not authorize an interstate delivery (for example to Texas or Arizona).',
    },
    intrastate: {
      title: 'Intrastate (entirely within California)',
      body:
        'Moves that start and end in California are typically overseen by the Bureau of Household Goods and Services (BHGS), California Department of Consumer Affairs. Household movers must hold a current California Household Mover permit. Confirm the legal company name on your estimate matches an active permit in the official DCA / BHGS license search.',
    },
    verifySteps: [
      'Classify the job: entirely in California (BHGS) vs any out-of-state leg (FMCSA / USDOT).',
      'Copy the exact legal name from the written estimate.',
      'Intrastate: search that name in the official DCA license search and confirm an active Household Mover permit.',
      'Interstate: look up USDOT / MC on FMCSA SAFER; review out-of-service and authority status.',
      'Refuse large cash deposits to unverified operators; keep the estimate, inventory, and disclosures.',
      'Ask for required consumer information materials and how the final price can change under the estimate type you signed.',
    ],
    protections: [
      {
        title: 'Consumer information materials',
        detail:
          'Licensed California household movers are expected to provide required consumer information (commonly discussed as the “Important Information for Persons Moving Household Goods” materials). Ask for disclosures before you sign.',
      },
      {
        title: 'Written estimates & rate frameworks',
        detail:
          'California household movers operate under regulated rate frameworks. Demand written clarity on maximum charges, Not-to-Exceed language where applicable, and what can change the price (stairs, long carry, packing, delays).',
      },
      {
        title: 'Complaints & enforcement',
        detail:
          'BHGS accepts consumer complaints involving California household movers. Interstate fraud and authority issues may involve FMCSA and other agencies. Keep records.',
      },
    ],
    officialLinks: [
      {
        label: 'BHGS — Household Movers (DCA)',
        href: 'https://bhgs.dca.ca.gov/',
        external: true,
      },
      {
        label: 'Official DCA license search',
        href: 'https://search.dca.ca.gov/',
        external: true,
      },
      {
        label: 'FMCSA SAFER — USDOT lookup',
        href: 'https://safer.fmcsa.dot.gov/',
        external: true,
      },
      {
        label: 'Move Trust Hub — Verify a USDOT',
        href: '/verify-dot',
      },
    ],
    disclaimer:
      'Licensing rules and search tools can change. Always verify current permit or authority status on official government sites for the company named on your estimate. This page is educational, not legal advice.',
  },
  regions: [
    {
      id: 'bay-area',
      name: 'Bay Area',
      shortName: 'Bay Area',
      blurb:
        'Hills, high-rises, bridge/ferry timing, and tech-driven demand from San Francisco to Silicon Valley and the East Bay.',
      challenges: [
        'Steep driveways and street parking limits',
        'Elevator COI windows in multi-unit buildings',
      ],
      countySlugs: [
        'san-francisco',
        'san-mateo',
        'santa-clara',
        'alameda',
        'contra-costa',
        'marin',
        'napa',
        'sonoma',
        'solano',
        'santa-cruz',
      ],
      ctaLabel: 'Explore Bay Area counties',
    },
    {
      id: 'la-metro',
      name: 'Greater Los Angeles / LA Metro',
      shortName: 'LA Metro',
      blurb:
        'Freeway time, elevators/COI, parking permits, and micro-markets from the Westside to the Valley and South Bay.',
      challenges: [
        'Parking permits and building access rules',
        'Long portal-to-portal freeway time',
      ],
      countySlugs: ['los-angeles', 'ventura'],
      ctaLabel: 'Explore LA Metro counties',
    },
    {
      id: 'orange-coastal',
      name: 'Orange County & Coastal SoCal',
      shortName: 'Orange / Coastal',
      blurb:
        'Planned communities, HOAs, coastal access, and high-value suburban inventories.',
      challenges: [
        'HOA move windows and COI requirements',
        'High-value contents and careful-handling expectations',
      ],
      countySlugs: ['orange'],
      ctaLabel: 'Explore Orange County',
    },
    {
      id: 'san-diego',
      name: 'San Diego Metro',
      shortName: 'San Diego',
      blurb:
        'Coastal density, military and biotech moves, and heat inland toward East County and Imperial.',
      challenges: [
        'Coastal multi-unit access vs inland heat',
        'Military / seasonal calendar spikes',
      ],
      countySlugs: ['san-diego', 'imperial'],
      ctaLabel: 'Explore San Diego region',
    },
    {
      id: 'inland-empire',
      name: 'Inland Empire',
      shortName: 'Inland Empire',
      blurb:
        'Logistics corridors, new tracts, HOAs, and long portal-to-portal hauls on the 10/15/60/91.',
      challenges: [
        'New-construction HOA rules',
        'Heat and long freeway hauls',
      ],
      countySlugs: ['riverside', 'san-bernardino'],
      ctaLabel: 'Explore Inland Empire',
    },
    {
      id: 'central-valley',
      name: 'Central Valley',
      shortName: 'Central Valley',
      blurb:
        'Long distances, summer heat, ag-adjacent access, and growing family markets from Bakersfield to Stockton.',
      challenges: [
        'Extreme summer heat windows',
        'Longer in-region distances',
      ],
      countySlugs: [
        'kern',
        'tulare',
        'kings',
        'fresno',
        'madera',
        'merced',
        'stanislaus',
        'san-joaquin',
      ],
      ctaLabel: 'Explore Central Valley',
    },
    {
      id: 'sacramento',
      name: 'Sacramento Region',
      shortName: 'Sacramento',
      blurb:
        'Capital employment, foothill approaches, and suburban growth in Placer, El Dorado, and Yolo.',
      challenges: [
        'Foothill / wildfire-season planning',
        'Suburban HOA and school-calendar peaks',
      ],
      countySlugs: [
        'sacramento',
        'placer',
        'el-dorado',
        'yolo',
        'sutter',
        'yuba',
        'amador',
        'calaveras',
        'tuolumne',
      ],
      ctaLabel: 'Explore Sacramento region',
    },
    {
      id: 'central-coast',
      name: 'Central Coast',
      shortName: 'Central Coast',
      blurb:
        '101 corridor towns, tourism seasonality, and mixed coastal / inland access from Monterey to Santa Barbara.',
      challenges: [
        'Tourism-season congestion',
        'Coastal access and hill approaches',
      ],
      countySlugs: [
        'monterey',
        'san-benito',
        'san-luis-obispo',
        'santa-barbara',
      ],
      ctaLabel: 'Explore Central Coast',
    },
    {
      id: 'northern-sierra',
      name: 'Northern California / Sierra',
      shortName: 'North / Sierra',
      blurb:
        'Rural and mountain access, wildfire-season planning, and thinner crew coverage outside major hubs.',
      challenges: [
        'Rural driveway and mountain access',
        'Wildfire-season timing flexibility',
      ],
      countySlugs: [
        'butte',
        'shasta',
        'tehama',
        'glenn',
        'colusa',
        'nevada',
        'plumas',
        'sierra',
        'lassen',
        'modoc',
        'siskiyou',
        'trinity',
        'humboldt',
        'del-norte',
        'mendocino',
        'lake',
        'alpine',
        'mono',
        'inyo',
        'mariposa',
      ],
      ctaLabel: 'Explore North / Sierra',
    },
  ],
  costs: {
    title: 'California moving costs',
    intro:
      'California pricing reflects coastal labor markets, accessorials, fuel, and long distances between metros. Use ranges for planning, then inventory your home in the calculator.',
    methodology: {
      title: 'How we estimate California moving costs',
      lastReviewed: '2026-07-22',
      body:
        'These ranges are planning estimates, not quotes. They combine typical California local and intrastate market patterns: home size, distance, accessorials (elevators, permits, long carries, stairs), seasonal demand, and regional labor rates. Actual bids vary by inventory, access, packing, valuation, and date. Always compare written estimates from movers licensed for your exact route (BHGS for in-state; FMCSA for interstate).',
    },
    ranges: [
      {
        label: 'Local studio / 1BR (simple access)',
        value: '$600–$1,800+',
        note: 'Higher with elevators or street permits',
      },
      {
        label: 'Local 2–3BR house or multi-family',
        value: '$1,800–$4,800+',
        note: 'HOA soft costs and long carries common',
      },
      {
        label: 'Intrastate mid-size (e.g. LA ↔ San Diego)',
        value: '$2,800–$8,500+',
        note: 'Packing and season matter',
      },
      {
        label: 'Intrastate long (e.g. LA ↔ Bay Area)',
        value: '$3,500–$12,000+',
        note: '3–4+ BR and full packing push the top',
      },
      {
        label: 'Typical 2-person crew (major metros)',
        value: '$140–$230+/hr',
        note: 'Portal-to-portal; 3-person crews scale up',
      },
    ],
    factors: [
      'Labor rates in coastal metros run higher than many U.S. markets.',
      'Parking permits, freight elevators, and HOA windows add soft costs in LA, SF, San Diego, and dense Orange County.',
      'Hillside and canyon homes often need shuttles or long carries.',
      'Fuel and long I-5 / I-580 / I-405 portal-to-portal time affect hourly bills.',
      'Peak May–September and end-of-month weekends fill crews early.',
    ],
  },
  routes: {
    title: 'Popular California moving routes',
    intro:
      'California is both a major origin and destination. Outbound interstate moves need FMCSA authority; in-state corridors need BHGS-permitted household movers.',
    migrationProfile: 'outbound_dominant',
    outbound: [
      {
        label: 'California → Texas',
        href: '/moving-to/texas',
        origins: 'LA Basin, Bay Area, San Diego, Sacramento',
        transit: 'Multi-day linehaul; ~1,200–1,800+ miles depending on metros',
        planningNote:
          'One of the highest-volume outbound lanes — summer heat at destination and large inventories are common.',
        note: 'Confirm interstate FMCSA authority; plan multi-day transit and heat protection for electronics.',
      },
      {
        label: 'California → Arizona',
        href: '/moving-to/arizona',
        origins: 'Southern California, Inland Empire, Central Valley',
        transit: 'Often 1–3 day corridor via I-10 / I-8',
        planningNote:
          'HOA and heat windows at Phoenix/Tucson matter as much as linehaul miles.',
        note: 'Shorter interstate hop than TX; still requires FMCSA authority.',
      },
      {
        label: 'California → Nevada',
        href: '/moving-to/nevada',
        origins: 'Southern California, Bay Area (longer)',
        transit: 'Often same-week via I-15 or I-80 corridors',
        planningNote: 'Short interstate — do not use an intrastate-only permit.',
        note: 'Verify USDOT; apartment elevators at Las Vegas/Reno destinations are common.',
      },
      {
        label: 'California → Washington',
        href: '/moving-to/washington',
        origins: 'Bay Area, Northern California, LA',
        transit: 'I-5 northbound multi-day',
        planningNote: 'Rain-season packing and Seattle multi-unit access at delivery.',
        note: 'Popular for Bay Area outbound households; confirm interstate authority.',
      },
      {
        label: 'California → Oregon',
        href: '/moving-to/oregon',
        origins: 'Bay Area, Sacramento, Northern California',
        transit: 'I-5 corridor; shorter than WA for northern origins',
        planningNote: 'Portland multi-unit and Willamette Valley SFH access differ.',
        note: 'Strong outbound lane for Northern California and Bay Area.',
      },
    ],
    inbound: [
      {
        label: 'Moving to Los Angeles County',
        href: '/local-movers/california/los-angeles',
        note: 'Deep zone guide for freeways, COI, and micro-markets.',
        origins: 'National inbound + California internal',
        transit: 'Varies by origin; local access often dominates cost',
        planningNote: 'Use the LA intelligence pack for zone-level access tips.',
      },
      {
        label: 'Moving to San Diego County',
        href: '/local-movers/california/san-diego',
        note: 'Coastal vs inland access and military/biotech calendars.',
      },
      {
        label: 'Moving to Santa Clara County',
        href: '/local-movers/california/santa-clara',
        note: 'Silicon Valley HOAs, apartments, and Peninsula logistics.',
      },
    ],
  },
  challenges: {
    title: 'California-specific moving challenges & tips',
    intro:
      'These issues show up constantly on real California moves — not generic national checklist filler.',
    items: [
      {
        title: 'Wildfire season & air-quality windows',
        detail:
          'Late spring through fall, check air quality and evacuation status near origin/destination. Flexible load dates and sealed trucks help when smoke is heavy.',
      },
      {
        title: 'Urban density: permits, elevators, HOAs',
        detail:
          'LA, SF, San Diego, and coastal Orange County often need Certificates of Insurance, freight elevator reservations, and municipal parking permits. Collect building packets early.',
      },
      {
        title: 'Central Valley heat vs coastal cool',
        detail:
          'Summer Valley moves favor early starts and hydration plans. Coastal fog does not cancel heat risk on inland legs the same day.',
      },
      {
        title: 'Long distances between metros',
        detail:
          'LA ↔ Bay Area or Sacramento ↔ San Diego is not a “local.” Quote portal-to-portal honestly and plan overnight transit when needed.',
      },
      {
        title: 'Hills, canyons, and long carries',
        detail:
          'Berkeley hills, Hollywood Hills, and many foothill communities need smaller trucks or shuttles. Share approach photos before move day.',
      },
      {
        title: 'High-value contents & valuation',
        detail:
          'Many California households need more than released-value coverage. Discuss full-value options and inventory high-value items in writing.',
      },
    ],
  },
  tools: [
    {
      label: 'Free moving calculator',
      href: '/moving-calculator',
      description:
        'Inventory-based volume and cost planning for local, intrastate, or interstate moves.',
    },
    {
      label: 'Verify a USDOT',
      href: '/verify-dot',
      description:
        'Look up interstate authority before you pay a deposit on a cross-state move.',
    },
    {
      label: 'Interstate mover directory',
      href: '/companies',
      description:
        'Search licensed carriers nationwide — same tools used across Move Trust Hub.',
    },
    {
      label: 'How we score movers',
      href: '/about/how-we-score-movers',
      description:
        'Independent methodology — no lead fees, no paid placement for rankings.',
    },
    {
      label: 'Moving timeline checklist',
      href: '/resources/checklist',
      description:
        'Interstate-ready planning checklist you can adapt for California local and long moves.',
    },
    {
      label: 'Packing checklist',
      href: '/resources/packing-checklist',
      description: 'Room-by-room packing guidance before your crew arrival window.',
    },
  ],
  faq: [
    {
      question: 'How are movers regulated in California?',
      answer:
        'Moves entirely within California are generally regulated by the Bureau of Household Goods and Services (BHGS) under the California Department of Consumer Affairs — household movers need a valid California Household Mover permit. Moves that cross state lines fall under federal FMCSA rules and require active interstate operating authority and a USDOT number. Confirm which framework applies to your exact origin and destination, and verify status on official government tools.',
    },
    {
      question: 'What is the difference between a local and long-distance move in California?',
      answer:
        '“Local” usually means same metro or short-radius hourly work. Longer in-state corridors (for example Los Angeles to the Bay Area) are still intrastate if both ends are in California, but they price more like distance moves and still require a BHGS-permitted household mover. Crossing into Nevada, Arizona, or another state makes the job interstate under FMCSA.',
    },
    {
      question: 'How do I verify a California mover is legally allowed to operate?',
      answer:
        'For in-state moves, search the company name in the official DCA license search and confirm an active Household Mover permit. For interstate moves, look up the USDOT or MC number on FMCSA SAFER. Match the legal name on your estimate to the license record, and use Move Trust Hub’s Verify DOT tool as a second check. Rules and records can change — re-check before you pay a deposit.',
    },
    {
      question: 'When is the best time to move in California?',
      answer:
        'Demand peaks from late spring through early fall and around month-end lease dates. Mid-week mornings outside May–September are often easier for crew availability, elevator windows, and coastal/urban parking. Valley heat and wildfire smoke can also affect summer planning.',
    },
    {
      question: 'Why do California moves cost more than in many other states?',
      answer:
        'Coastal labor markets, fuel, long freeway travel time, and accessorials — elevators, parking permits, HOA rules, hillside shuttles — push hourly and distance prices up. High-value inventories also increase careful-handling time and valuation needs. Use county guides for micro-market access tips and the calculator for inventory-based planning.',
    },
    {
      question: 'Do I need different movers for local vs interstate California moves?',
      answer:
        'Not always, but the license must match the job. An intrastate-only operator may be excellent for a within-California move yet not authorized for a delivery to Texas. Always verify BHGS for in-state work and FMCSA for interstate work — some companies hold both.',
    },
  ],
  trust: {
    byline: 'Curated by the Move Trust Hub editorial team',
    lastReviewed: '2026-07-22',
    methodology:
      'County guides combine public licensing checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement for inclusion. Cost ranges are planning estimates derived from typical California market patterns, not live bids.',
    independence:
      'Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.',
    sources: [
      { label: 'BHGS / California DCA — Household Movers', href: 'https://bhgs.dca.ca.gov/' },
      { label: 'DCA official license search', href: 'https://search.dca.ca.gov/' },
      { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
      { label: 'How we score movers', href: '/about/how-we-score-movers' },
    ],
  },
  stickyNav: [
    { id: 'ca-intent', label: 'Start' },
    { id: 'ca-why-different', label: 'Why CA' },
    { id: 'ca-snapshot', label: 'Snapshot' },
    { id: 'ca-regulations', label: 'Regulations' },
    { id: 'ca-regions', label: 'Regions' },
    { id: 'ca-map', label: 'Map' },
    { id: 'ca-costs', label: 'Costs' },
    { id: 'ca-routes', label: 'Routes' },
    { id: 'ca-challenges', label: 'Tips' },
    { id: 'ca-counties', label: 'Counties' },
    { id: 'ca-tools', label: 'Tools' },
    { id: 'ca-faq', label: 'FAQ' },
  ],
};
