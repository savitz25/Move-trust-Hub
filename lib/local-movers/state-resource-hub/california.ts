import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * California Moving Resource Hub — Phase 1 + Phase 2 content modules.
 * Used by /local-movers/california as the master state-hub template.
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
      href: '#ca-regulations',
      description:
        'Intrastate rules (BHGS), local vs long in-state costs, and county-by-county access tips.',
    },
    {
      id: 'to',
      label: 'Moving To California',
      href: '#ca-regions',
      description:
        'Pick a region, open deep county guides, and plan parking, HOAs, and metro logistics.',
    },
    {
      id: 'from',
      label: 'Moving From California',
      href: '#ca-routes',
      description:
        'Popular outbound routes, interstate authority checks, and inventory planning for long hauls.',
    },
  ],
  primaryCta: {
    label: 'Calculate My California Moving Cost',
    href: '/moving-calculator',
  },
  secondaryCta: {
    label: 'Search licensed movers',
    href: '/companies',
  },
  snapshot: {
    title: 'California moving snapshot',
    methodology:
      'Cost ranges are planning estimates based on typical California local and intrastate patterns (labor markets, accessorials, and distance). They are not quotes. Always compare written estimates from licensed movers. Mover counts reflect curated county listings plus verified directory carriers.',
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
    title: 'California moving regulations & consumer protection',
    intro:
      'California is one of the few states where in-state household moves have a dedicated state regulator separate from federal interstate rules. Knowing which license applies protects you from unlicensed operators.',
    interstate: {
      title: 'Interstate (crossing state lines) → FMCSA / USDOT',
      body:
        'If your origin or destination is outside California, the mover generally needs active FMCSA operating authority and a USDOT number. Verify carriers on FMCSA SAFER before you deposit money. A California-only BHGS permit alone is not enough for a Texas or Arizona delivery.',
    },
    intrastate: {
      title: 'Intrastate (entirely within California) → BHGS',
      body:
        'Moves that start and end in California are typically regulated by the Bureau of Household Goods and Services (BHGS) under the California Department of Consumer Affairs. Household movers must hold a valid California Household Mover permit (often discussed as a “CAL-T” style permit). Confirm the permit is active for the company name on your estimate.',
    },
    verifySteps: [
      'Decide whether your move is entirely in California (BHGS) or crosses a state line (FMCSA / USDOT).',
      'Match the legal company name on the estimate to the name in the official license search.',
      'For intrastate: search the BHGS Household Mover license lookup and confirm active status.',
      'For interstate: look up the USDOT / MC on FMCSA SAFER and check out-of-service flags.',
      'Get a written estimate, ask about valuation coverage, and never pay large cash deposits to unverified operators.',
      'Keep copies of the estimate, inventory, and any Not-to-Exceed or maximum-rate documents.',
    ],
    protections: [
      {
        title: 'Important Information for Persons Moving Household Goods',
        detail:
          'Licensed California household movers are expected to provide consumer information materials required under BHGS rules. Ask for the booklet / disclosures before you sign.',
      },
      {
        title: 'Written estimates & rate frameworks',
        detail:
          'California household movers operate under regulated rate frameworks (including maximum-rate / Not-to-Exceed concepts depending on the move type and tariff). Demand clarity in writing on how the final price can change.',
      },
      {
        title: 'Complaints & enforcement',
        detail:
          'BHGS handles consumer complaints against California household movers. FMCSA and state AGs play roles on interstate fraud. Document everything.',
      },
    ],
    officialLinks: [
      {
        label: 'BHGS — Household Movers (DCA)',
        href: 'https://bhgs.dca.ca.gov/',
        external: true,
      },
      {
        label: 'BHGS — License search',
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
  },
  regions: [
    {
      id: 'bay-area',
      name: 'Bay Area',
      shortName: 'Bay Area',
      blurb:
        'Hills, high-rises, ferry/bridge timing, and tech-driven demand from SF to Silicon Valley and the East Bay.',
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
    },
    {
      id: 'la-metro',
      name: 'Greater Los Angeles / LA Metro',
      shortName: 'LA Metro',
      blurb:
        'Freeway time, elevators/COI, parking permits, and micro-markets from the Westside to the Valley and South Bay.',
      countySlugs: ['los-angeles', 'ventura'],
    },
    {
      id: 'orange-coastal',
      name: 'Orange County & Coastal SoCal',
      shortName: 'Orange / Coastal',
      blurb:
        'Planned communities, HOAs, coastal access, and high-value suburban inventories.',
      countySlugs: ['orange'],
    },
    {
      id: 'san-diego',
      name: 'San Diego Metro',
      shortName: 'San Diego',
      blurb:
        'Coastal density, military and biotech moves, and heat inland toward East County and Imperial.',
      countySlugs: ['san-diego', 'imperial'],
    },
    {
      id: 'inland-empire',
      name: 'Inland Empire',
      shortName: 'Inland Empire',
      blurb:
        'Logistics corridors, new tracts, HOAs, and long portal-to-portal hauls on the 10/15/60/91.',
      countySlugs: ['riverside', 'san-bernardino'],
    },
    {
      id: 'central-valley',
      name: 'Central Valley',
      shortName: 'Central Valley',
      blurb:
        'Long distances, summer heat, ag-adjacent access, and growing family markets from Bakersfield to Stockton.',
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
    },
    {
      id: 'sacramento',
      name: 'Sacramento Region',
      shortName: 'Sacramento',
      blurb:
        'Capital employment, foothill approaches, and suburban growth in Placer, El Dorado, and Yolo.',
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
    },
    {
      id: 'central-coast',
      name: 'Central Coast',
      shortName: 'Central Coast',
      blurb:
        '101 corridor towns, tourism seasonality, and mixed coastal / inland access from Monterey to Santa Barbara.',
      countySlugs: [
        'monterey',
        'san-benito',
        'san-luis-obispo',
        'santa-barbara',
      ],
    },
    {
      id: 'northern-sierra',
      name: 'Northern California / Sierra',
      shortName: 'North / Sierra',
      blurb:
        'Rural and mountain access, wildfire-season planning, and thinner crew coverage outside major hubs.',
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
    },
  ],
  costs: {
    title: 'California moving costs',
    intro:
      'California pricing reflects high labor markets, accessorials (elevators, permits, long carries), fuel, and long distances between metros. Use these as planning bands — then run a personalized inventory through the calculator.',
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
    outbound: [
      {
        label: 'California → Texas',
        href: '/moving-to/texas',
        note: 'One of the highest-volume outbound lanes — plan for multi-day transit and summer heat at destination.',
      },
      {
        label: 'California → Arizona',
        href: '/moving-to/arizona',
        note: 'I-10 corridor demand; heat and HOA rules at Phoenix/Tucson common.',
      },
      {
        label: 'California → Nevada',
        href: '/moving-to/nevada',
        note: 'Shorter interstate hop; still requires interstate authority.',
      },
      {
        label: 'California → Washington',
        href: '/moving-to/washington',
        note: 'I-5 northbound; rain-season packing and apartment elevators at destination.',
      },
      {
        label: 'California → Oregon',
        href: '/moving-to/oregon',
        note: 'Popular for Bay Area and Northern California outbound households.',
      },
    ],
    inbound: [
      {
        label: 'Moving to Los Angeles County',
        href: '/local-movers/california/los-angeles',
        note: 'Deep zone guide for freeways, COI, and micro-markets.',
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
        'Moves entirely within California are generally regulated by the Bureau of Household Goods and Services (BHGS) under the California Department of Consumer Affairs — household movers need a valid California Household Mover permit. Moves that cross state lines fall under federal FMCSA rules and require active interstate operating authority and a USDOT number. Confirm which framework applies to your exact origin and destination.',
    },
    {
      question: 'What is the difference between a local and long-distance move in California?',
      answer:
        '“Local” usually means same metro or short-radius hourly work. Longer in-state corridors (for example Los Angeles to the Bay Area) are still intrastate if both ends are in California, but they price more like distance moves and still require a BHGS-permitted household mover. Crossing into Nevada, Arizona, or another state makes the job interstate under FMCSA.',
    },
    {
      question: 'How do I verify a California mover is legally allowed to operate?',
      answer:
        'For in-state moves, search the company name in the official BHGS / DCA license lookup and confirm an active Household Mover permit. For interstate moves, look up the USDOT or MC number on FMCSA SAFER. Match the legal name on your estimate to the license record, and use Move Trust Hub’s Verify DOT tool as a second check.',
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
      'County guides combine public licensing checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement for inclusion.',
    independence:
      'Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.',
  },
  stickyNav: [
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
