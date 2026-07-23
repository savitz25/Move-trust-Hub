/**
 * Wave 2 State Resource Hubs: IL, PA, NC, WA, OH
 * Run: node scripts/generate-wave2-state-hubs.mjs
 */
import { readFileSync, writeFileSync } from 'fs';

const regions = JSON.parse(readFileSync('scripts/tmp-wave2-regions.json', 'utf8'));

const SHARED_TOOLS = (stateName) => [
  {
    label: 'Free moving calculator',
    href: '/moving-calculator',
    description: `Inventory-based volume and cost planning for local, intrastate, or interstate ${stateName} moves.`,
  },
  {
    label: 'Verify a USDOT',
    href: '/verify-dot',
    description: 'Look up interstate authority before you pay a deposit on a cross-state move.',
  },
  {
    label: 'Interstate mover directory',
    href: '/companies',
    description: 'Search licensed carriers nationwide — same tools used across Move Trust Hub.',
  },
  {
    label: 'How we score movers',
    href: '/about/how-we-score-movers',
    description: 'Independent methodology — no lead fees, no paid placement for rankings.',
  },
  {
    label: 'Moving timeline checklist',
    href: '/resources/checklist',
    description: `Interstate-ready planning checklist you can adapt for ${stateName} local and long moves.`,
  },
  {
    label: 'Packing checklist',
    href: '/resources/packing-checklist',
    description: 'Room-by-room packing guidance before your crew arrival window.',
  },
];

const STICKY = [
  { id: 'hub-intent', label: 'Start' },
  { id: 'hub-why-different', label: 'Why here' },
  { id: 'hub-snapshot', label: 'Snapshot' },
  { id: 'hub-regulations', label: 'Regulations' },
  { id: 'hub-regions', label: 'Regions' },
  { id: 'hub-map', label: 'Map' },
  { id: 'hub-costs', label: 'Costs' },
  { id: 'hub-routes', label: 'Routes' },
  { id: 'hub-challenges', label: 'Tips' },
  { id: 'hub-counties', label: 'Counties' },
  { id: 'hub-tools', label: 'Tools' },
  { id: 'hub-faq', label: 'FAQ' },
];

function intents(stateName) {
  return [
    {
      id: 'within',
      label: `Moving Within ${stateName}`,
      href: '#hub-regulations',
      description:
        'Confirm in-state licensing rules, then compare local costs and open the counties you will use.',
    },
    {
      id: 'to',
      label: `Moving To ${stateName}`,
      href: '#hub-regions',
      description:
        'Choose a region first, then a county guide for access, seasonality, and metro logistics.',
    },
    {
      id: 'from',
      label: `Moving From ${stateName}`,
      href: '#hub-routes',
      description:
        'Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul.',
    },
    {
      id: 'unsure',
      label: 'Not Sure Yet',
      href: '#hub-why-different',
      description: `Start with how ${stateName} markets differ, then use the calculator and map to narrow your plan.`,
    },
  ];
}

function regionObjects(slug, defs) {
  return defs.map((d) => ({
    id: d.id,
    name: d.name,
    shortName: d.shortName,
    blurb: d.blurb,
    challenges: d.challenges,
    countySlugs: regions[slug][d.key],
    ctaLabel: d.ctaLabel,
  }));
}

function toTs(varName, pack) {
  return `import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 2):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: ${pack.routes.migrationProfile}
 * - Regulation mode: ${pack.regulations.mode}
 */
export const ${varName}: StateResourceHubPack = ${JSON.stringify(pack, null, 2)};
`;
}

const packs = {
  illinois: {
    stateSlug: 'illinois',
    stateCode: 'IL',
    h1: 'Illinois Moving Resource Hub: Costs, ICC Licensing & 102 County Guides',
    metaTitle:
      'Illinois Movers Guide 2026 — Costs, ICC Licensing & 102 County Guides',
    metaDescription:
      'Plan a move within, to, or from Illinois. Compare local and intrastate costs, verify Illinois Commerce Commission household goods licenses, browse 102 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for Illinois moves in 2026 — typical costs, ICC vs FMCSA rules, Chicago-to-downstate regional guides, and tools to compare licensed movers without paid placements.',
    trustBar: [
      '102 County Guides',
      'Verified Movers',
      'ICC & FMCSA Checked',
      'Updated 2026',
    ],
    intents: intents('Illinois'),
    primaryCta: {
      label: 'Calculate My Illinois Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in Illinois is different',
      paragraphs: [
        'Illinois is not one moving market. Chicago high-rises and alley staging, collar-county HOAs, Central Illinois college towns, Metro East St. Louis logistics, and rural Southern Illinois driveways produce different access and labor profiles under one state name.',
        'Intrastate household goods movers must hold a Household Goods license from the Illinois Commerce Commission (ICC). Interstate jobs need FMCSA authority. Winter weather, lake-effect snow in the north, and long I-55/I-57 hauls are planning inputs — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'Illinois moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical Illinois local and intrastate patterns; they are not bids. Always compare written estimates from ICC-licensed movers for in-state work and FMCSA-authorized carriers for interstate work.',
      stats: [
        {
          label: 'Typical Chicago studio / 1BR',
          value: '$600–$2,500+',
          note: 'Walk-ups, elevators, and alley staging dominate',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$1,800–$5,500+',
          note: 'Collar-county HOAs common',
        },
        {
          label: 'Intrastate corridor (e.g. Chicago ↔ Springfield)',
          value: '$2,200–$7,000+',
          note: 'Season and packing drive the spread',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'Winter weather can force flexible dates',
        },
        {
          label: 'Top outbound destinations',
          value: 'FL · TX · AZ · IN · WI · MO',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: '102',
          note: 'Chicago metro emphasized',
        },
      ],
    },
    regulations: {
      mode: 'strong_state_regulator',
      title: 'Illinois moving regulations & consumer protection',
      intro:
        'Illinois requires for-hire household goods movers operating within the state to hold a Household Goods license from the Illinois Commerce Commission (ICC). Match the license to the job before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside Illinois)',
        body:
          'If origin or destination is outside Illinois, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. An ICC household goods license alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within Illinois)',
        body:
          'For-hire transportation of household property within Illinois generally requires an ICC Household Goods license. Consumers can search licensed household goods movers and related complaint information through ICC motor carrier search tools.',
      },
      verifySteps: [
        'Classify the job: entirely in Illinois (ICC) vs any out-of-state leg (FMCSA / USDOT).',
        'Copy the exact legal name from the written estimate.',
        'Intrastate: search the ICC household goods / motor carrier tools for an active license.',
        'Interstate: look up USDOT / MC on FMCSA SAFER.',
        'Get written estimates, confirm insurance and valuation, and keep contracts.',
        'Avoid large cash deposits to unverified operators.',
      ],
      protections: [
        {
          title: 'ICC licensing requirement',
          detail:
            'Illinois guidance states businesses engaged in for-hire household goods transportation must obtain a Household Goods license from the ICC. Operating without a valid license can trigger enforcement.',
        },
        {
          title: 'Complaint visibility',
          detail:
            'ICC consumer tools may show complaint history for licensed movers — review before you hire.',
        },
        {
          title: 'Written estimates',
          detail:
            'Insist on written estimates and clarity on stairs, elevators, long carries, and packing before signing.',
        },
      ],
      officialLinks: [
        {
          label: 'Illinois — Household Goods Movers service page',
          href: 'https://www.illinois.gov/services/service.household-goods-movers.html',
          external: true,
        },
        {
          label: 'ICC motor carrier search',
          href: 'https://www.icc.illinois.gov/emdb/mcis/search',
          external: true,
        },
        {
          label: 'FMCSA SAFER — USDOT lookup',
          href: 'https://safer.fmcsa.dot.gov/',
          external: true,
        },
        { label: 'Move Trust Hub — Verify a USDOT', href: '/verify-dot' },
      ],
      disclaimer:
        'Licensing rules and lookup tools can change. Always verify current ICC license or FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('illinois', [
      {
        key: 'chicago-metro',
        id: 'chicago-metro',
        name: 'Chicago Metro',
        shortName: 'Chicago Metro',
        blurb:
          'Cook and collar counties: high-rises, alleys, elevators/COI, and dense suburban HOAs around the city.',
        challenges: [
          'Walk-ups, elevators, and alley staging',
          'Expressway congestion and permit rules',
        ],
        ctaLabel: 'Explore Chicago metro',
      },
      {
        key: 'northern-il',
        id: 'northern-il',
        name: 'Northern Illinois',
        shortName: 'Northern IL',
        blurb:
          'Rockford corridor and northwestern counties with mixed suburban and rural lots outside the core collar.',
        challenges: [
          'Winter weather windows',
          'Longer hauls into Chicago',
        ],
        ctaLabel: 'Explore Northern Illinois',
      },
      {
        key: 'central-il',
        id: 'central-il',
        name: 'Central Illinois',
        shortName: 'Central IL',
        blurb:
          'Springfield, Peoria, Champaign–Urbana, and Bloomington–Normal hubs with college and government calendars.',
        challenges: [
          'University move-in peaks',
          'Heat and winter extremes',
        ],
        ctaLabel: 'Explore Central Illinois',
      },
      {
        key: 'metro-east',
        id: 'metro-east',
        name: 'Metro East / Southern Metro',
        shortName: 'Metro East',
        blurb:
          'St. Louis metro Illinois side and southern industrial corridors with cross-river logistics context.',
        challenges: [
          'Cross-metro traffic patterns',
          'Mix of urban and rural access',
        ],
        ctaLabel: 'Explore Metro East',
      },
      {
        key: 'southern-il',
        id: 'southern-il',
        name: 'Southern Illinois',
        shortName: 'Southern IL',
        blurb:
          'Smaller metros and rural counties with longer driveways and thinner local crew coverage.',
        challenges: [
          'Confirm mover coverage for remote addresses',
          'Long portal-to-portal distances',
        ],
        ctaLabel: 'Explore Southern Illinois',
      },
      {
        key: 'rest',
        id: 'rest-illinois',
        name: 'Other Illinois Counties',
        shortName: 'Rest of IL',
        blurb:
          'Remaining counties outside the primary metro and regional groupings.',
        challenges: [
          'Rural driveway access',
          'Crew travel time from larger hubs',
        ],
        ctaLabel: 'Explore remaining counties',
      },
    ]),
    costs: {
      title: 'Illinois moving costs',
      intro:
        'Illinois pricing reflects Chicago labor intensity, building accessorials, collar-county HOAs, and long downstate distances. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate Illinois moving costs',
        lastReviewed: '2026-07-22',
        body:
          'These ranges are planning estimates, not quotes. They combine typical Illinois local and intrastate patterns: home size, distance, elevators/stairs, parking, HOAs, seasonality, and regional labor. Actual bids vary. Always compare written estimates from ICC-licensed movers for in-state work and FMCSA-authorized carriers for interstate work.',
      },
      ranges: [
        {
          label: 'Chicago studio / 1BR',
          value: '$600–$2,500+',
          note: 'Walk-ups and elevators dominate',
        },
        {
          label: 'Suburban 2–3BR house',
          value: '$1,600–$4,500+',
          note: 'HOA soft costs common',
        },
        {
          label: 'Intrastate mid-size (e.g. Chicago ↔ Champaign)',
          value: '$2,000–$6,000+',
          note: 'Season matters',
        },
        {
          label: 'Intrastate long (e.g. Chicago ↔ Metro East)',
          value: '$2,400–$7,500+',
          note: 'Full packing pushes the top',
        },
        {
          label: 'Typical 2–3 person crew (Chicago metro)',
          value: '$140–$250+/hr',
          note: 'Portal-to-portal; access drives hours',
        },
      ],
      factors: [
        'Chicago walk-ups, elevators, and alley loading add labor time.',
        'Collar-county HOAs often require COI and approved hours.',
        'Winter weather can slow upstate/northern jobs and force reschedules.',
        'Long I-55 / I-57 / I-80 hauls affect portal-to-portal pricing.',
        'Peak May–September and month-end leases fill crews early.',
      ],
    },
    routes: {
      title: 'Popular Illinois moving routes',
      intro:
        'Illinois is a Midwest hub with strong Chicago outbound lanes and internal Chicago–downstate flows. Interstate jobs need FMCSA authority; in-state corridors need ICC-licensed household goods movers.',
      migrationProfile: 'outbound_dominant',
      outbound: [
        {
          label: 'Illinois → Florida',
          href: '/moving-to/florida',
          origins: 'Chicago metro, Central Illinois',
          transit: 'Multi-day; strong snowbird seasonality',
          planningNote: 'Book early for fall/winter FL arrivals.',
          note: 'High-volume Midwest-to-Florida corridor.',
        },
        {
          label: 'Illinois → Texas / Southwest',
          href: '/moving-to/texas',
          origins: 'Chicago metro',
          transit: 'Multi-day linehaul',
          planningNote: 'Large inventories and heat at destination.',
          note: 'Common job and lifestyle outbound lane.',
        },
        {
          label: 'Illinois → Indiana / Wisconsin',
          href: '/moving-to/indiana',
          origins: 'Chicago collar counties',
          transit: 'Often same-day or next-day interstate',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Short cross-border metro moves are common.',
        },
      ],
      inbound: [
        {
          label: 'Moving to Cook County (Chicago)',
          href: '/local-movers/illinois/cook',
          note: 'High-rise and walk-up access dominate many arrivals.',
        },
        {
          label: 'Moving to DuPage County',
          href: '/local-movers/illinois/dupage',
          note: 'Collar-county HOAs and suburban lots.',
        },
        {
          label: 'Moving to Champaign County',
          href: '/local-movers/illinois/champaign',
          note: 'University calendars and mid-state logistics.',
        },
      ],
    },
    challenges: {
      title: 'Illinois-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real Illinois moves — not generic national checklist filler.',
      items: [
        {
          title: 'Chicago walk-ups and elevators',
          detail:
            'Multi-flight walk-ups and reserved freight elevators with COI requirements drive hours even on short distances. Confirm building rules early.',
        },
        {
          title: 'Alley and street staging limits',
          detail:
            'Limited curb space and alley access can force smaller trucks or longer carries. Plan permits and staging in advance.',
        },
        {
          title: 'Winter weather',
          detail:
            'Snow and ice affect driveways, loading docks, and schedules — especially outside the city core. Build weather buffer into winter moves.',
        },
        {
          title: 'Collar-county HOAs',
          detail:
            'Many suburbs require certificates of insurance, approved hours, and gate lists. Incomplete paperwork delays crews.',
        },
        {
          title: 'Long downstate distances',
          detail:
            'Chicago to Southern Illinois is not a local hop. Treat long in-state hauls as distance moves with correct ICC licensing.',
        },
        {
          title: 'University and lease calendars',
          detail:
            'Champaign–Urbana, Normal, and Chicago lease cycles create peak windows. Book early for May and August.',
        },
      ],
    },
    tools: SHARED_TOOLS('Illinois'),
    faq: [
      {
        question: 'How are movers regulated in Illinois?',
        answer:
          'For-hire household goods movers operating within Illinois generally need a Household Goods license from the Illinois Commerce Commission (ICC). Interstate moves that cross state lines require federal FMCSA operating authority and a USDOT number. Confirm which framework applies to your exact origin and destination.',
      },
      {
        question: 'How do I verify an Illinois mover is licensed?',
        answer:
          'Use ICC motor carrier / household goods search tools to confirm an active license for the legal company name on your estimate. For interstate work, also verify USDOT / MC on FMCSA SAFER before paying a deposit.',
      },
      {
        question: 'When is the best time to move in Illinois?',
        answer:
          'Demand peaks late spring through early fall and around month-end leases. Mid-week mornings are often easier. Winter weather can force flexible dates, especially in northern counties.',
      },
      {
        question: 'Why are Chicago moves expensive?',
        answer:
          'Labor intensity from stairs, elevators, long carries, COI windows, and limited truck staging drives hours up even for short distances. Access often matters more than miles.',
      },
      {
        question: 'Is an ICC license enough for a move to Florida?',
        answer:
          'No. Crossing state lines generally requires FMCSA interstate authority. An ICC household goods license covers Illinois intrastate for-hire household goods operations — not interstate operating authority.',
      },
      {
        question: 'What should I check before hiring any Illinois mover?',
        answer:
          'Active ICC license for in-state work (or FMCSA for interstate), written estimate, insurance/valuation clarity, and complaint history where available. Avoid large cash deposits to unverified operators.',
      },
    ],
    trust: {
      byline: 'Curated by the Move Trust Hub editorial team',
      lastReviewed: '2026-07-22',
      methodology:
        'County guides combine public licensing checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.',
      independence:
        'Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.',
      sources: [
        {
          label: 'Illinois — Household Goods Movers',
          href: 'https://www.illinois.gov/services/service.household-goods-movers.html',
        },
        {
          label: 'ICC motor carrier search',
          href: 'https://www.icc.illinois.gov/emdb/mcis/search',
        },
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  },
};

Object.assign(packs, {
  pennsylvania: buildPennsylvania(),
  'north-carolina': buildNorthCarolina(),
  washington: buildWashington(),
  ohio: buildOhio(),
});

function buildPennsylvania() {
  return {
    stateSlug: 'pennsylvania',
    stateCode: 'PA',
    h1: 'Pennsylvania Moving Resource Hub: Costs, PUC Licensing & 67 County Guides',
    metaTitle:
      'Pennsylvania Movers Guide 2026 — Costs, PUC Licensing & 67 County Guides',
    metaDescription:
      'Plan a move within, to, or from Pennsylvania. Compare local and intrastate costs, verify Pennsylvania PUC household goods certificates, browse 67 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for Pennsylvania moves in 2026 — typical costs, PUC vs FMCSA rules, Philly-to-Pittsburgh regional guides, and tools to compare certificated movers without paid placements.',
    trustBar: [
      '67 County Guides',
      'Verified Movers',
      'PA PUC & FMCSA Checked',
      'Updated 2026',
    ],
    intents: intents('Pennsylvania'),
    primaryCta: {
      label: 'Calculate My Pennsylvania Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in Pennsylvania is different',
      paragraphs: [
        'Pennsylvania is not one moving market. Philadelphia row homes and tight streets, Pittsburgh hills, Lehigh Valley growth, and rural northern counties produce different access and labor profiles under one state name.',
        'Intrastate household goods movers must be licensed by the Pennsylvania Public Utility Commission (PUC) and maintain approved insurance and rates. Interstate jobs need FMCSA authority. Winter weather, mountain approaches, and HOA suburbs are planning inputs — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'Pennsylvania moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical Pennsylvania local and intrastate patterns; they are not bids. Always compare written estimates from PUC-certificated movers for in-state work and FMCSA-authorized carriers for interstate work.',
      stats: [
        {
          label: 'Typical Philly row-home / 1–2BR',
          value: '$550–$2,400+',
          note: 'Stairs and street staging dominate',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$1,700–$5,200+',
          note: 'HOAs and hills vary by region',
        },
        {
          label: 'Intrastate corridor (e.g. Philly ↔ Harrisburg)',
          value: '$2,000–$6,500+',
          note: 'Season and packing drive the spread',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'Winter weather can force flexible dates',
        },
        {
          label: 'Top outbound destinations',
          value: 'FL · NC · SC · TX · NJ · DE',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: '67',
          note: 'Philly and Pittsburgh emphasized',
        },
      ],
    },
    regulations: {
      mode: 'strong_state_regulator',
      title: 'Pennsylvania moving regulations & consumer protection',
      intro:
        'Pennsylvania requires household goods movers operating within the state to be licensed by the Public Utility Commission (PUC). Match the certificate to the job before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside Pennsylvania)',
        body:
          'If origin or destination is outside Pennsylvania, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. A PA PUC household goods certificate alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within Pennsylvania)',
        body:
          'Household goods movers operating within Pennsylvania must be licensed by the PUC, maintain required insurance, and charge fees consistent with PUC-approved frameworks. Consumers should ensure the company is PUC-licensed and that the PUC number appears in advertising as required.',
      },
      verifySteps: [
        'Classify the job: entirely in Pennsylvania (PUC) vs any out-of-state leg (FMCSA / USDOT).',
        'Copy the exact legal name and PUC number from the written estimate/ads.',
        'Intrastate: confirm the mover is on PUC household goods operator resources / certificated lists.',
        'Interstate: look up USDOT / MC on FMCSA SAFER.',
        'Get written estimates, confirm insurance, and keep contracts.',
        'Avoid large cash deposits to unverified operators.',
      ],
      protections: [
        {
          title: 'PUC licensing & insurance',
          detail:
            'PUC guidance states in-state household goods movers must be licensed and maintain adequate insurance coverage.',
        },
        {
          title: 'Approved fees / rate frameworks',
          detail:
            'PUC-regulated movers must charge fees consistent with commission-approved structures. Ask how your price can change.',
        },
        {
          title: 'Written contracts',
          detail:
            'Insist on written estimates and clarity on stairs, long carries, packing, and storage before signing.',
        },
      ],
      officialLinks: [
        {
          label: 'PA PUC — Limos, taxis & movers',
          href: 'https://www.puc.pa.gov/motor-carrier/limos-taxis-movers/',
          external: true,
        },
        {
          label: 'PA PUC motor carrier overview',
          href: 'https://www.puc.pa.gov/motor-carrier/',
          external: true,
        },
        {
          label: 'FMCSA SAFER — USDOT lookup',
          href: 'https://safer.fmcsa.dot.gov/',
          external: true,
        },
        { label: 'Move Trust Hub — Verify a USDOT', href: '/verify-dot' },
      ],
      disclaimer:
        'Licensing rules and directories can change. Always verify current PUC certification or FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('pennsylvania', [
      {
        key: 'philadelphia-se',
        id: 'philadelphia-se',
        name: 'Philadelphia & Southeast',
        shortName: 'SE PA',
        blurb:
          'Row homes, tight streets, elevators, and dense suburbs across Philadelphia and the collar counties.',
        challenges: [
          'Stairs, street staging, and parking limits',
          'Building COI and multi-unit rules',
        ],
        ctaLabel: 'Explore Southeast PA',
      },
      {
        key: 'lehigh-valley',
        id: 'lehigh-valley',
        name: 'Lehigh Valley & Eastern',
        shortName: 'Lehigh Valley',
        blurb:
          'Allentown–Bethlehem–Easton growth corridors and eastern mountain approaches.',
        challenges: [
          'Growth-suburb HOA rules',
          'I-78 / mountain traffic patterns',
        ],
        ctaLabel: 'Explore Lehigh Valley',
      },
      {
        key: 'central-pa',
        id: 'central-pa',
        name: 'Central Pennsylvania',
        shortName: 'Central PA',
        blurb:
          'Harrisburg, Lancaster, York, and State College corridors with mixed suburban and rural lots.',
        challenges: [
          'University and government calendars',
          'Winter weather windows',
        ],
        ctaLabel: 'Explore Central PA',
      },
      {
        key: 'northeast-pa',
        id: 'northeast-pa',
        name: 'Northeast Pennsylvania',
        shortName: 'NE PA',
        blurb:
          'Scranton–Wilkes-Barre and Pocono-area counties with tourism seasonality and hill access.',
        challenges: [
          'Winter weather and hills',
          'Seasonal tourism traffic',
        ],
        ctaLabel: 'Explore Northeast PA',
      },
      {
        key: 'pittsburgh-sw',
        id: 'pittsburgh-sw',
        name: 'Pittsburgh & Southwest',
        shortName: 'SW PA',
        blurb:
          'Hillside homes, bridges, and older multi-story stock across Allegheny and neighboring counties.',
        challenges: [
          'Steep driveways and tight streets',
          'Bridge and tunnel congestion',
        ],
        ctaLabel: 'Explore Pittsburgh region',
      },
      {
        key: 'erie-nw',
        id: 'erie-nw',
        name: 'Erie, Northwest & Laurel Highlands',
        shortName: 'NW / Highlands',
        blurb:
          'Lake Erie weather, rural lots, and mountain communities west and north of the major metros.',
        challenges: [
          'Lake-effect and mountain weather',
          'Longer regional hauls',
        ],
        ctaLabel: 'Explore NW / Highlands',
      },
      {
        key: 'rest',
        id: 'rest-pa',
        name: 'Other Pennsylvania Counties',
        shortName: 'Rest of PA',
        blurb: 'Remaining counties outside the primary regional groupings.',
        challenges: [
          'Confirm mover coverage for remote addresses',
          'Rural driveway access',
        ],
        ctaLabel: 'Explore remaining counties',
      },
    ]),
    costs: {
      title: 'Pennsylvania moving costs',
      intro:
        'Pennsylvania pricing reflects Philly and Pittsburgh access challenges, suburban HOAs, hills, and winter productivity. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate Pennsylvania moving costs',
        lastReviewed: '2026-07-22',
        body:
          'These ranges are planning estimates, not quotes. They combine typical Pennsylvania local and intrastate patterns: home size, distance, stairs/hills, parking, HOAs, seasonality, and regional labor. Actual bids vary. Always compare written estimates from PUC-certificated movers for in-state work and FMCSA-authorized carriers for interstate work.',
      },
      ranges: [
        {
          label: 'Urban 1–2BR (Philly / Pittsburgh)',
          value: '$550–$2,400+',
          note: 'Stairs and staging dominate',
        },
        {
          label: 'Suburban 2–3BR house',
          value: '$1,600–$4,500+',
          note: 'HOAs and hills vary',
        },
        {
          label: 'Intrastate mid-size (e.g. Philly ↔ Harrisburg)',
          value: '$1,800–$5,500+',
          note: 'Season matters',
        },
        {
          label: 'Intrastate long (e.g. Philly ↔ Pittsburgh)',
          value: '$2,500–$7,500+',
          note: 'Full packing pushes the top',
        },
        {
          label: 'Typical 2-person crew (major metros)',
          value: '$125–$220+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'Row homes and hillside properties add stair and carry labor.',
        'Winter weather can slow northern and mountain jobs.',
        'HOA windows are common in growth suburbs.',
        'Turnpike and mountain corridors affect portal-to-portal time.',
        'Peak May–September and month-end leases fill crews early.',
      ],
    },
    routes: {
      title: 'Popular Pennsylvania moving routes',
      intro:
        'Pennsylvania sits between Northeast origins and Sun Belt destinations, with large Philly–Pittsburgh internal flows. Interstate jobs need FMCSA authority; in-state corridors need PUC-certificated movers.',
      migrationProfile: 'outbound_dominant',
      outbound: [
        {
          label: 'Pennsylvania → Florida',
          href: '/moving-to/florida',
          origins: 'Philly metro, Pittsburgh, Central PA',
          transit: 'Multi-day; snowbird seasonality',
          planningNote: 'Book early for fall/winter FL arrivals.',
          note: 'High-volume Northeast-to-Florida corridor.',
        },
        {
          label: 'Pennsylvania → Carolinas',
          href: '/moving-to/north-carolina',
          origins: 'Philly metro, Central PA',
          transit: 'I-95 / I-81 corridors',
          planningNote: 'HOAs at destination common.',
          note: 'Popular lifestyle outbound destinations.',
        },
        {
          label: 'Pennsylvania → New Jersey / New York',
          href: '/local-movers/new-jersey',
          origins: 'Philly and Lehigh Valley',
          transit: 'Often same-day or next-day interstate',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Short cross-border metro moves are common.',
        },
      ],
      inbound: [
        {
          label: 'Moving to Philadelphia County',
          href: '/local-movers/pennsylvania/philadelphia',
          note: 'Row homes, stairs, and street logistics dominate.',
        },
        {
          label: 'Moving to Allegheny County (Pittsburgh)',
          href: '/local-movers/pennsylvania/allegheny',
          note: 'Hills, bridges, and older multi-story stock.',
        },
        {
          label: 'Moving to Montgomery County',
          href: '/local-movers/pennsylvania/montgomery',
          note: 'Philly collar suburbs and HOA communities.',
        },
      ],
    },
    challenges: {
      title: 'Pennsylvania-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real Pennsylvania moves — not generic national checklist filler.',
      items: [
        {
          title: 'Row homes and narrow streets',
          detail:
            'Philadelphia-area staging often means long carries and limited truck length. Share approach photos early.',
        },
        {
          title: 'Pittsburgh hills',
          detail:
            'Steep driveways and switchbacks may require smaller trucks or shuttle strategies.',
        },
        {
          title: 'Winter weather',
          detail:
            'Snow and ice affect mountain and northern counties. Build weather buffer into winter schedules.',
        },
        {
          title: 'HOA suburbs',
          detail:
            'Growth communities around major metros often require COI and approved hours.',
        },
        {
          title: 'Turnpike and mountain corridors',
          detail:
            'Philly–Pittsburgh hauls need honest portal-to-portal assumptions across the Turnpike.',
        },
        {
          title: 'Rural coverage gaps',
          detail:
            'Northern and mountain counties may require regional crews — confirm service to your exact address.',
        },
      ],
    },
    tools: SHARED_TOOLS('Pennsylvania'),
    faq: [
      {
        question: 'How are movers regulated in Pennsylvania?',
        answer:
          'Household goods movers operating within Pennsylvania must be licensed by the Pennsylvania Public Utility Commission (PUC) and maintain required insurance and rate frameworks. Interstate moves require federal FMCSA operating authority and a USDOT number.',
      },
      {
        question: 'How do I verify a Pennsylvania mover is licensed?',
        answer:
          'Confirm the company is PUC-licensed for household goods operations (look for PUC numbers in ads and verify via PUC motor carrier / household goods resources). For interstate work, also check FMCSA SAFER for USDOT / MC status.',
      },
      {
        question: 'When is the best time to move in Pennsylvania?',
        answer:
          'Demand peaks late spring through early fall. Mid-week mornings are often easier. Winter weather can force flexible dates in northern and mountain counties.',
      },
      {
        question: 'Why do Philly and Pittsburgh moves cost more?',
        answer:
          'Stairs, hills, limited staging, and building access rules increase labor hours even for short distances. Access often matters more than miles.',
      },
      {
        question: 'Is a PA PUC license enough for a move to Florida?',
        answer:
          'No. Crossing state lines generally requires FMCSA interstate authority. PUC household goods certification covers Pennsylvania intrastate operations — not interstate operating authority.',
      },
      {
        question: 'What should I check before hiring any Pennsylvania mover?',
        answer:
          'Active PUC certification for in-state work (or FMCSA for interstate), written estimate, insurance/valuation clarity, and contract terms. Avoid large cash deposits to unverified operators.',
      },
    ],
    trust: {
      byline: 'Curated by the Move Trust Hub editorial team',
      lastReviewed: '2026-07-22',
      methodology:
        'County guides combine public licensing checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.',
      independence:
        'Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.',
      sources: [
        {
          label: 'PA PUC — Limos, taxis & movers',
          href: 'https://www.puc.pa.gov/motor-carrier/limos-taxis-movers/',
        },
        {
          label: 'PA PUC motor carrier',
          href: 'https://www.puc.pa.gov/motor-carrier/',
        },
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  };
}

function buildNorthCarolina() {
  return {
    stateSlug: 'north-carolina',
    stateCode: 'NC',
    h1: 'North Carolina Moving Resource Hub: Costs, NCUC Certificates & 100 County Guides',
    metaTitle:
      'North Carolina Movers Guide 2026 — Costs, NCUC Licensing & 100 County Guides',
    metaDescription:
      'Plan a move within, to, or from North Carolina. Compare local and intrastate costs, verify NCUC household goods certificates, browse 100 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for North Carolina moves in 2026 — typical costs, NCUC vs FMCSA rules, Triangle-to-coast regional guides, and tools to compare certificated movers without paid placements.',
    trustBar: [
      '100 County Guides',
      'Verified Movers',
      'NCUC & FMCSA Checked',
      'Updated 2026',
    ],
    intents: intents('North Carolina'),
    primaryCta: {
      label: 'Calculate My North Carolina Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in North Carolina is different',
      paragraphs: [
        'North Carolina is not one moving market. Charlotte freeways, Triangle university calendars, Triad logistics, Asheville mountain approaches, and Outer Banks storm windows produce different access and labor profiles under one state name.',
        'Intrastate household goods movers must hold a certificate (C-number) from the North Carolina Utilities Commission (NCUC) and follow Maximum Rate Tariff rules. Interstate jobs need FMCSA authority. Humidity, HOAs, and hurricane-season flexibility are planning inputs — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'North Carolina moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical North Carolina local and intrastate patterns; they are not bids. Always compare written estimates from NCUC-certificated movers for in-state work and FMCSA-authorized carriers for interstate work.',
      stats: [
        {
          label: 'Typical local move (studio–2BR)',
          value: '$450–$2,000+',
          note: 'HOAs and heat push higher in metros',
        },
        {
          label: 'Typical local move (3–4+ BR)',
          value: '$1,600–$5,000+',
          note: 'Suburban long carries common',
        },
        {
          label: 'Intrastate corridor (e.g. Charlotte ↔ Raleigh)',
          value: '$1,800–$6,000+',
          note: 'Season and packing drive the spread',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'Hurricane season needs flexible dates',
        },
        {
          label: 'Top inbound origins',
          value: 'NY · NJ · FL · VA · CA · PA',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: '100',
          note: 'Major metros emphasized',
        },
      ],
    },
    regulations: {
      mode: 'strong_state_regulator',
      title: 'North Carolina moving regulations & consumer protection',
      intro:
        'North Carolina requires intrastate household goods movers to obtain a certificate (C-number) from the North Carolina Utilities Commission (NCUC) and abide by the Maximum Rate Tariff. Match certification to the job before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside North Carolina)',
        body:
          'If origin or destination is outside North Carolina, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. An NCUC certificate alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within North Carolina)',
        body:
          'Intrastate household goods movers must hold an NCUC certificate (commonly a “C” number / Certificate of Exemption authorizing HHG transportation within NC). The Maximum Rate Tariff sets maximum charges, required forms, and the consumer booklet “Moving in North Carolina, Your Rights and Responsibilities,” which movers must provide.',
      },
      verifySteps: [
        'Classify the job: entirely in North Carolina (NCUC) vs any out-of-state leg (FMCSA / USDOT).',
        'Ask for the mover’s NCUC certificate (C-number) and match it to the legal name on your estimate.',
        'Intrastate: check the NCUC certified carriers list / call Public Staff (919) 733-7766 for current status.',
        'Interstate: look up USDOT / MC on FMCSA SAFER.',
        'Require the consumer rights booklet, written estimate, and proper forms.',
        'Avoid large cash deposits to unverified operators.',
      ],
      protections: [
        {
          title: 'Maximum Rate Tariff',
          detail:
            'NCUC’s Maximum Rate Tariff governs maximum rates, rules, and required forms for certificated intrastate HHG moves. Ask how your estimate relates to tariff rules.',
        },
        {
          title: 'Consumer booklet',
          detail:
            'Certificated movers must provide the informational booklet describing your rights and responsibilities for moves within North Carolina.',
        },
        {
          title: 'Certificate display',
          detail:
            'Legitimate movers should be able to provide their C-number; it is commonly expected on trucks and in advertising.',
        },
      ],
      officialLinks: [
        {
          label: 'NCUC — Moving guide',
          href: 'https://www.ncuc.gov/industries/transportation/movingguide.html',
          external: true,
        },
        {
          label: 'NCUC — Transportation / HHG overview',
          href: 'https://www.ncuc.gov/Industries/transportation/transportation.html',
          external: true,
        },
        {
          label: 'NC DOJ — Moving consumer tips',
          href: 'https://ncdoj.gov/protecting-consumers/home-repair-and-products/moving/',
          external: true,
        },
        {
          label: 'FMCSA SAFER — USDOT lookup',
          href: 'https://safer.fmcsa.dot.gov/',
          external: true,
        },
        { label: 'Move Trust Hub — Verify a USDOT', href: '/verify-dot' },
      ],
      disclaimer:
        'Licensing rules and carrier lists can change. Always verify current NCUC certificate status or FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('north-carolina', [
      {
        key: 'charlotte-metro',
        id: 'charlotte-metro',
        name: 'Charlotte Metro',
        shortName: 'Charlotte',
        blurb:
          'Banking and corporate growth, HOA suburbs, and freeway density across Mecklenburg and neighboring counties.',
        challenges: [
          'I-77 / I-85 congestion',
          'HOA windows in master-planned communities',
        ],
        ctaLabel: 'Explore Charlotte metro',
      },
      {
        key: 'triangle',
        id: 'triangle',
        name: 'Research Triangle',
        shortName: 'Triangle',
        blurb:
          'Raleigh–Durham–Chapel Hill university and tech calendars with fast-growing suburbs.',
        challenges: [
          'University move-in peaks',
          'New-construction HOA rules',
        ],
        ctaLabel: 'Explore the Triangle',
      },
      {
        key: 'triad',
        id: 'triad',
        name: 'Piedmont Triad',
        shortName: 'Triad',
        blurb:
          'Greensboro–Winston-Salem–High Point logistics and mixed urban/suburban stock.',
        challenges: [
          'Heat and humidity pacing',
          'Cross-metro portal-to-portal time',
        ],
        ctaLabel: 'Explore the Triad',
      },
      {
        key: 'asheville-west',
        id: 'asheville-west',
        name: 'Asheville & Western NC',
        shortName: 'Western NC',
        blurb:
          'Mountain approaches, tourism towns, and elevation weather from Asheville across the western counties.',
        challenges: [
          'Steep driveways and mountain access',
          'Winter weather at elevation',
        ],
        ctaLabel: 'Explore Western NC',
      },
      {
        key: 'coastal-east',
        id: 'coastal-east',
        name: 'Coastal & Eastern NC',
        shortName: 'Coastal / East',
        blurb:
          'Wilmington, military bases, Outer Banks approaches, and hurricane-season logistics across eastern counties.',
        challenges: [
          'Hurricane-season flexibility',
          'Military PCS calendars',
        ],
        ctaLabel: 'Explore Coastal / East NC',
      },
      {
        key: 'rest',
        id: 'rest-nc',
        name: 'Other North Carolina Counties',
        shortName: 'Rest of NC',
        blurb:
          'Remaining Piedmont and rural counties outside the primary metro groupings.',
        challenges: [
          'Confirm mover coverage for remote addresses',
          'Longer regional hauls',
        ],
        ctaLabel: 'Explore remaining counties',
      },
    ]),
    costs: {
      title: 'North Carolina moving costs',
      intro:
        'North Carolina pricing reflects metro growth, HOAs, humidity/heat, mountain access, and coastal storm flexibility. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate North Carolina moving costs',
        lastReviewed: '2026-07-22',
        body:
          'These ranges are planning estimates, not quotes. They combine typical North Carolina local and intrastate patterns: home size, distance, HOAs, stairs/long carries, seasonality, and regional labor. Actual bids vary and must respect NCUC Maximum Rate Tariff rules for certificated intrastate moves. Always compare written estimates from NCUC-certificated movers for in-state work and FMCSA-authorized carriers for interstate work.',
      },
      ranges: [
        {
          label: 'Local studio / 1BR',
          value: '$450–$1,600+',
          note: 'HOAs push higher in metros',
        },
        {
          label: 'Local 2–3BR house',
          value: '$1,400–$4,200+',
          note: 'Suburban long carries common',
        },
        {
          label: 'Intrastate mid-size (e.g. Charlotte ↔ Greensboro)',
          value: '$1,600–$5,000+',
          note: 'Season matters',
        },
        {
          label: 'Intrastate long (e.g. Charlotte ↔ Wilmington)',
          value: '$2,000–$6,500+',
          note: 'Full packing pushes the top',
        },
        {
          label: 'Typical 2-person crew (major metros)',
          value: '$115–$195+/hr',
          note: 'Portal-to-portal; tariff rules apply in-state',
        },
      ],
      factors: [
        'Metro HOAs often require COI and approved hours.',
        'Mountain access can force smaller trucks or long carries.',
        'Hurricane season requires flexible coastal dates.',
        'University calendars create May/August peaks in the Triangle.',
        'Heat and humidity favor early starts most of the year.',
      ],
    },
    routes: {
      title: 'Popular North Carolina moving routes',
      intro:
        'North Carolina is a major inbound Southeast destination with strong Northeast origins and large Charlotte–Triangle internal flows. Interstate jobs need FMCSA authority; in-state corridors need NCUC-certificated movers.',
      migrationProfile: 'inbound_dominant',
      outbound: [
        {
          label: 'North Carolina → Florida',
          href: '/moving-to/florida',
          origins: 'Charlotte, Triangle, Coastal NC',
          transit: 'Often 1–2 day interstate',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Common Southeast corridor.',
        },
        {
          label: 'North Carolina → South Carolina / Tennessee',
          href: '/moving-to/south-carolina',
          origins: 'Charlotte, Western NC',
          transit: 'Short interstate hops',
          planningNote: 'Confirm FMCSA even on short border crossings.',
          note: 'Frequent cross-border metro and mountain moves.',
        },
      ],
      inbound: [
        {
          label: 'Northeast → North Carolina',
          href: '/local-movers/north-carolina',
          origins: 'NY, NJ, PA, New England',
          transit: 'Multi-day I-95 corridor',
          planningNote: 'High-volume inbound into Charlotte and the Triangle.',
          note: 'Confirm interstate FMCSA authority.',
        },
        {
          label: 'Moving to Mecklenburg County (Charlotte)',
          href: '/local-movers/north-carolina/mecklenburg',
          note: 'HOAs and freeway density define many arrivals.',
        },
        {
          label: 'Moving to Wake County (Raleigh)',
          href: '/local-movers/north-carolina/wake',
          note: 'Tech/university growth and suburban tracts.',
        },
      ],
    },
    challenges: {
      title: 'North Carolina-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real North Carolina moves — not generic national checklist filler.',
      items: [
        {
          title: 'HOA-heavy growth suburbs',
          detail:
            'Charlotte and Triangle communities often require COI, approved hours, and gate lists. Collect packets early.',
        },
        {
          title: 'Mountain access (Western NC)',
          detail:
            'Steep driveways and switchbacks may need smaller trucks or shuttle strategies around Asheville and beyond.',
        },
        {
          title: 'Hurricane season (coast)',
          detail:
            'Build flexible dates for eastern and barrier-adjacent moves during storm season.',
        },
        {
          title: 'University calendars',
          detail:
            'Triangle and college towns spike in May and August. Book early for those windows.',
        },
        {
          title: 'Heat and humidity',
          detail:
            'Early starts protect crews and belongings across the Piedmont and coast.',
        },
        {
          title: 'Maximum Rate Tariff compliance',
          detail:
            'Certificated intrastate movers operate under NCUC tariff rules — ask how estimates and forms map to required paperwork.',
        },
      ],
    },
    tools: SHARED_TOOLS('North Carolina'),
    faq: [
      {
        question: 'How are movers regulated in North Carolina?',
        answer:
          'Intrastate household goods movers must hold a certificate (C-number) from the North Carolina Utilities Commission and follow the Maximum Rate Tariff. Interstate moves require federal FMCSA operating authority and a USDOT number.',
      },
      {
        question: 'How do I verify a North Carolina mover is certificated?',
        answer:
          'Ask for the NCUC C-number, check the NCUC certified carriers list, or call Public Staff at (919) 733-7766 for current status. For interstate work, also verify USDOT / MC on FMCSA SAFER.',
      },
      {
        question: 'What is the Maximum Rate Tariff?',
        answer:
          'It is the NCUC framework that sets maximum rates, rules, required forms, and consumer information requirements for certificated intrastate household goods moves in North Carolina.',
      },
      {
        question: 'When is the best time to move in North Carolina?',
        answer:
          'Demand peaks late spring through early fall. Mid-week mornings are often easier. Coastal storm season and university calendars can force flexible dates.',
      },
      {
        question: 'Is an NCUC certificate enough for a move to Florida?',
        answer:
          'No. Crossing state lines generally requires FMCSA interstate authority. NCUC certificates authorize intrastate North Carolina household goods transportation — not interstate operating authority.',
      },
      {
        question: 'What documents should I receive for an in-state NC move?',
        answer:
          'Ask for the consumer rights booklet, a written estimate, and required tariff forms. Keep copies of everything you sign and create your own inventory.',
      },
    ],
    trust: {
      byline: 'Curated by the Move Trust Hub editorial team',
      lastReviewed: '2026-07-22',
      methodology:
        'County guides combine public certification checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.',
      independence:
        'Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.',
      sources: [
        {
          label: 'NCUC — Moving guide',
          href: 'https://www.ncuc.gov/industries/transportation/movingguide.html',
        },
        {
          label: 'NCUC — Transportation',
          href: 'https://www.ncuc.gov/Industries/transportation/transportation.html',
        },
        {
          label: 'NC DOJ — Moving',
          href: 'https://ncdoj.gov/protecting-consumers/home-repair-and-products/moving/',
        },
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  };
}

function buildWashington() {
  return {
    stateSlug: 'washington',
    stateCode: 'WA',
    h1: 'Washington Moving Resource Hub: Costs, UTC Permits & 39 County Guides',
    metaTitle:
      'Washington Movers Guide 2026 — Costs, UTC Permits & 39 County Guides',
    metaDescription:
      'Plan a move within, to, or from Washington. Compare local and intrastate costs, verify Washington UTC household goods permits, browse 39 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for Washington moves in 2026 — typical costs, UTC vs FMCSA rules, Puget Sound-to-Eastern WA regional guides, and tools to compare permitted movers without paid placements.',
    trustBar: [
      '39 County Guides',
      'Verified Movers',
      'WA UTC & FMCSA Checked',
      'Updated 2026',
    ],
    intents: intents('Washington'),
    primaryCta: {
      label: 'Calculate My Washington Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in Washington is different',
      paragraphs: [
        'Washington is not one moving market. Seattle multi-unit elevators and hills, Eastside HOAs, Southwest WA Portland-adjacent traffic, Central WA agricultural corridors, and Spokane winters produce different access and labor profiles under one state name.',
        'Intrastate household goods carriers must hold a valid permit from the Washington Utilities and Transportation Commission (UTC). It is illegal to operate without one. Interstate jobs need FMCSA authority. Rain, hills, ferries, and wildfire-season air quality are planning inputs — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'Washington moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical Washington local and intrastate patterns; they are not bids. Always compare written estimates from UTC-permitted movers for in-state work and FMCSA-authorized carriers for interstate work.',
      stats: [
        {
          label: 'Typical Seattle studio / 1BR',
          value: '$650–$2,600+',
          note: 'Hills, elevators, and parking dominate',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$2,000–$6,000+',
          note: 'Eastside HOAs common',
        },
        {
          label: 'Intrastate corridor (e.g. Seattle ↔ Spokane)',
          value: '$2,500–$8,000+',
          note: 'Passes and weather matter',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'Rain can force flexible dates year-round',
        },
        {
          label: 'Top inbound origins',
          value: 'CA · OR · TX · AZ · IL',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: '39',
          note: 'Puget Sound emphasized',
        },
      ],
    },
    regulations: {
      mode: 'strong_state_regulator',
      title: 'Washington moving regulations & consumer protection',
      intro:
        'Washington requires household goods carriers operating within the state to hold a valid permit from the Utilities and Transportation Commission (UTC). Match the permit to the job before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside Washington)',
        body:
          'If origin or destination is outside Washington, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. A UTC household goods permit alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within Washington)',
        body:
          'A moving company operating within Washington must have a valid UTC household goods permit — operating without one is illegal. UTC-permitted companies are expected to follow commission rate/tariff frameworks, insurance requirements, and consumer guide distribution rules.',
      },
      verifySteps: [
        'Classify the job: entirely in Washington (UTC) vs any out-of-state leg (FMCSA / USDOT).',
        'Copy the exact legal name from the written estimate.',
        'Intrastate: look up the company on the UTC companies / permitted movers tools and confirm active status.',
        'Interstate: look up USDOT / MC on FMCSA SAFER.',
        'Ask for the consumer moving guide materials and written estimate/forms required by UTC rules.',
        'Avoid large cash deposits to unverified operators; report suspected non-permitted carriers to UTC channels.',
      ],
      protections: [
        {
          title: 'UTC permit requirement',
          detail:
            'UTC consumer guidance states in-state movers must have a valid commission permit and that unpermitted operation is illegal.',
        },
        {
          title: 'Rates, insurance, and vehicle standards',
          detail:
            'Permitted companies are expected to charge proper rates, carry insurance, and maintain vehicles under UTC oversight.',
        },
        {
          title: 'Consumer moving guide',
          detail:
            'Household goods carriers are required to distribute consumer moving guide materials — ask for them before you sign.',
        },
      ],
      officialLinks: [
        {
          label: 'WA UTC — Household goods carriers',
          href: 'https://www.utc.wa.gov/MovingCompanies',
          external: true,
        },
        {
          label: 'WA UTC — Choosing a licensed mover',
          href: 'https://www.utc.wa.gov/get-help-utility-or-transportation-service/choosing-licensed-mover-washington-state',
          external: true,
        },
        {
          label: 'FMCSA SAFER — USDOT lookup',
          href: 'https://safer.fmcsa.dot.gov/',
          external: true,
        },
        { label: 'Move Trust Hub — Verify a USDOT', href: '/verify-dot' },
      ],
      disclaimer:
        'Licensing rules and permit directories can change. Always verify current UTC permit status or FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('washington', [
      {
        key: 'seattle-puget',
        id: 'seattle-puget',
        name: 'Seattle & Puget Sound',
        shortName: 'Puget Sound',
        blurb:
          'Hills, multi-unit elevators, ferry-adjacent logistics, and dense Eastside HOAs across King, Snohomish, Pierce, and neighbors.',
        challenges: [
          'Hills, elevators, and tight street staging',
          'Bridge and freeway congestion',
        ],
        ctaLabel: 'Explore Puget Sound',
      },
      {
        key: 'southwest-wa',
        id: 'southwest-wa',
        name: 'Southwest Washington',
        shortName: 'SW Washington',
        blurb:
          'Vancouver–Clark County Portland-adjacent patterns, coastal approaches, and I-5 corridor towns.',
        challenges: [
          'Cross-metro traffic toward Portland',
          'Rain and coastal access',
        ],
        ctaLabel: 'Explore SW Washington',
      },
      {
        key: 'central-wa',
        id: 'central-wa',
        name: 'Central Washington',
        shortName: 'Central WA',
        blurb:
          'Yakima, Tri-Cities, and agricultural corridors with longer highway hauls across the Cascades approaches.',
        challenges: [
          'Mountain pass weather',
          'Long portal-to-portal distances',
        ],
        ctaLabel: 'Explore Central Washington',
      },
      {
        key: 'eastern-wa',
        id: 'eastern-wa',
        name: 'Eastern Washington',
        shortName: 'Eastern WA',
        blurb:
          'Spokane metro and inland counties with colder winters and more rural driveway patterns.',
        challenges: [
          'Winter weather windows',
          'Distance from Puget Sound crews',
        ],
        ctaLabel: 'Explore Eastern Washington',
      },
      {
        key: 'olympic-peninsula',
        id: 'olympic-peninsula',
        name: 'Olympic Peninsula',
        shortName: 'Olympic Peninsula',
        blurb:
          'Clallam and Jefferson coastal and forest approaches with thinner coverage and weather exposure.',
        challenges: [
          'Confirm mover coverage for remote addresses',
          'Weather and ferry/highway timing',
        ],
        ctaLabel: 'Explore Olympic Peninsula',
      },
    ]),
    costs: {
      title: 'Washington moving costs',
      intro:
        'Washington pricing reflects Seattle labor markets, hills/elevators, rain delays, mountain passes, and HOA suburbs. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate Washington moving costs',
        lastReviewed: '2026-07-22',
        body:
          'These ranges are planning estimates, not quotes. They combine typical Washington local and intrastate patterns: home size, distance, hills/elevators, parking, HOAs, weather, and regional labor. Actual bids vary under UTC tariff/rate frameworks for permitted intrastate movers. Always compare written estimates from UTC-permitted movers for in-state work and FMCSA-authorized carriers for interstate work.',
      },
      ranges: [
        {
          label: 'Seattle studio / 1BR',
          value: '$650–$2,600+',
          note: 'Hills and elevators dominate',
        },
        {
          label: 'Suburban 2–3BR house',
          value: '$1,800–$5,000+',
          note: 'Eastside HOAs common',
        },
        {
          label: 'Intrastate mid-size (e.g. Seattle ↔ Olympia)',
          value: '$1,800–$5,500+',
          note: 'Season and packing matter',
        },
        {
          label: 'Intrastate long (e.g. Seattle ↔ Spokane)',
          value: '$2,500–$8,000+',
          note: 'Passes and weather matter',
        },
        {
          label: 'Typical 2–3 person crew (Puget Sound)',
          value: '$145–$260+/hr',
          note: 'Portal-to-portal; access drives hours',
        },
      ],
      factors: [
        'Seattle hills and multi-unit elevators add labor time.',
        'Rain can slow outdoor work and force flexible dates.',
        'Mountain passes affect Seattle–Eastern WA hauls in winter.',
        'HOA windows are common on the Eastside and in growth suburbs.',
        'Peak May–September fills crews early.',
      ],
    },
    routes: {
      title: 'Popular Washington moving routes',
      intro:
        'Washington is a major inbound West Coast destination with strong California origins and large Seattle–Spokane internal flows. Interstate jobs need FMCSA authority; in-state corridors need UTC-permitted movers.',
      migrationProfile: 'inbound_dominant',
      outbound: [
        {
          label: 'Washington → Oregon',
          href: '/moving-to/oregon',
          origins: 'Seattle, Southwest WA',
          transit: 'Often same-day or next-day interstate via I-5',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Common short outbound hop from Puget Sound and Clark County.',
        },
        {
          label: 'Washington → California',
          href: '/local-movers/california',
          origins: 'Seattle metro',
          transit: 'Multi-day I-5 corridor',
          planningNote: 'CA second hops may need BHGS for in-CA legs.',
          note: 'Bi-directional West Coast traffic is common.',
        },
      ],
      inbound: [
        {
          label: 'California → Washington',
          href: '/local-movers/washington/king',
          origins: 'Bay Area, LA, San Diego',
          transit: 'Multi-day I-5',
          planningNote: 'High-volume inbound into King and Snohomish counties.',
          note: 'Confirm interstate FMCSA authority.',
        },
        {
          label: 'Moving to King County (Seattle)',
          href: '/local-movers/washington/king',
          note: 'Hills, elevators, and dense multi-unit access.',
        },
        {
          label: 'Moving to Spokane County',
          href: '/local-movers/washington/spokane',
          note: 'Eastern WA winters and more open lots.',
        },
      ],
    },
    challenges: {
      title: 'Washington-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real Washington moves — not generic national checklist filler.',
      items: [
        {
          title: 'Hills and elevators (Seattle metro)',
          detail:
            'Steep streets and multi-unit freight elevators with COI windows drive hours. Confirm building rules early.',
        },
        {
          title: 'Rain and wet staging',
          detail:
            'Protect floors and electronics; rain can slow outdoor work and change truck access on soft ground.',
        },
        {
          title: 'Mountain pass weather',
          detail:
            'Seattle–Spokane and Cascade routes can close or slow in winter. Build weather buffer into long in-state hauls.',
        },
        {
          title: 'Ferry and water-adjacent logistics',
          detail:
            'Island and peninsula jobs may involve ferry timing or limited staging — survey access carefully.',
        },
        {
          title: 'HOA suburbs (Eastside and growth areas)',
          detail:
            'Many communities require COI, approved hours, and parking rules.',
        },
        {
          title: 'UTC permit enforcement',
          detail:
            'Unpermitted movers are illegal for in-state household goods work. Verify UTC permit status before hiring.',
        },
      ],
    },
    tools: SHARED_TOOLS('Washington'),
    faq: [
      {
        question: 'How are movers regulated in Washington?',
        answer:
          'Household goods carriers operating within Washington must hold a valid permit from the Washington Utilities and Transportation Commission (UTC). Operating without a permit is illegal. Interstate moves require federal FMCSA operating authority and a USDOT number.',
      },
      {
        question: 'How do I verify a Washington mover is permitted?',
        answer:
          'Use UTC company lookup / permitted mover tools to confirm active household goods permit status for the legal company name on your estimate. For interstate work, also verify USDOT / MC on FMCSA SAFER.',
      },
      {
        question: 'When is the best time to move in Washington?',
        answer:
          'Demand peaks late spring through early fall. Mid-week mornings are often easier for elevators and traffic. Rain can affect schedules year-round; mountain passes can force winter flexibility on long hauls.',
      },
      {
        question: 'Why are Seattle moves expensive?',
        answer:
          'Hills, elevators, limited staging, COI windows, and high metro labor rates increase hours even for short distances. Access often matters more than miles.',
      },
      {
        question: 'Is a UTC permit enough for a move to California?',
        answer:
          'No. Crossing state lines generally requires FMCSA interstate authority. A UTC household goods permit covers Washington intrastate operations — not interstate operating authority.',
      },
      {
        question: 'What should I check before hiring any Washington mover?',
        answer:
          'Active UTC permit for in-state work (or FMCSA for interstate), written estimate, insurance/valuation clarity, and consumer guide materials. Avoid large cash deposits to unverified operators.',
      },
    ],
    trust: {
      byline: 'Curated by the Move Trust Hub editorial team',
      lastReviewed: '2026-07-22',
      methodology:
        'County guides combine public permit checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.',
      independence:
        'Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.',
      sources: [
        {
          label: 'WA UTC — Household goods carriers',
          href: 'https://www.utc.wa.gov/MovingCompanies',
        },
        {
          label: 'WA UTC — Choosing a licensed mover',
          href: 'https://www.utc.wa.gov/get-help-utility-or-transportation-service/choosing-licensed-mover-washington-state',
        },
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  };
}

function buildOhio() {
  return {
    stateSlug: 'ohio',
    stateCode: 'OH',
    h1: 'Ohio Moving Resource Hub: Costs, PUCO Registration & 88 County Guides',
    metaTitle:
      'Ohio Movers Guide 2026 — Costs, PUCO Licensing & 88 County Guides',
    metaDescription:
      'Plan a move within, to, or from Ohio. Compare local and intrastate costs, verify PUCO household goods registration, browse 88 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for Ohio moves in 2026 — typical costs, PUCO vs FMCSA rules, Cleveland-to-Cincinnati regional guides, and tools to compare registered movers without paid placements.',
    trustBar: [
      '88 County Guides',
      'Verified Movers',
      'PUCO & FMCSA Checked',
      'Updated 2026',
    ],
    intents: intents('Ohio'),
    primaryCta: {
      label: 'Calculate My Ohio Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in Ohio is different',
      paragraphs: [
        'Ohio is not one moving market. Cleveland lake-effect weather, Columbus growth corridors, Cincinnati river metro patterns, Dayton logistics, and Appalachian southeastern counties produce different access and labor profiles under one state name.',
        'Intrastate household goods movers must register with the Public Utilities Commission of Ohio (PUCO). Interstate jobs need FMCSA authority. Winter weather, older multi-story homes, and HOA suburbs are planning inputs — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'Ohio moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical Ohio local and intrastate patterns; they are not bids. Always compare written estimates from PUCO-registered movers for in-state work and FMCSA-authorized carriers for interstate work.',
      stats: [
        {
          label: 'Typical local move (studio–2BR)',
          value: '$450–$1,900+',
          note: 'Stairs and winter access push higher',
        },
        {
          label: 'Typical local move (3–4+ BR)',
          value: '$1,500–$4,800+',
          note: 'Suburban long carries common',
        },
        {
          label: 'Intrastate corridor (e.g. Cleveland ↔ Columbus)',
          value: '$1,800–$5,800+',
          note: 'Season and packing drive the spread',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'Winter weather can force flexible dates',
        },
        {
          label: 'Top outbound destinations',
          value: 'FL · TX · NC · SC · IN · KY',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: '88',
          note: 'Major metros emphasized',
        },
      ],
    },
    regulations: {
      mode: 'strong_state_regulator',
      title: 'Ohio moving regulations & consumer protection',
      intro:
        'Ohio requires household goods movers operating within the state to register with the Public Utilities Commission of Ohio (PUCO) and follow PUCO rules. Match registration to the job before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside Ohio)',
        body:
          'If origin or destination is outside Ohio, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. PUCO household goods registration alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within Ohio)',
        body:
          'For-hire household goods movers conducting point-to-point moves within Ohio must obtain required PUCO registration / certificate authority for household goods operations. Consumers can verify registered movers using PUCO household goods lists and resources. Certificate numbers should appear in advertisements.',
      },
      verifySteps: [
        'Classify the job: entirely in Ohio (PUCO) vs any out-of-state leg (FMCSA / USDOT).',
        'Copy the exact legal name and PUCO certificate number from ads/estimate.',
        'Intrastate: check the PUCO household goods movers list / resources for registration.',
        'Interstate: look up USDOT / MC on FMCSA SAFER.',
        'Get written estimates on request and keep contracts and inventories.',
        'Avoid large cash deposits to unverified operators.',
      ],
      protections: [
        {
          title: 'PUCO registration requirement',
          detail:
            'PUCO requires household goods movers to be registered and to follow PUCO rules. Display of certificate numbers in advertising helps consumers identify legitimate operators.',
        },
        {
          title: 'Written estimates',
          detail:
            'Insist on written estimates and clarity on stairs, long carries, packing, and storage before signing.',
        },
        {
          title: 'Know your rights resources',
          detail:
            'PUCO publishes consumer guidance for hiring moving companies — review rights materials before load day.',
        },
      ],
      officialLinks: [
        {
          label: 'PUCO — Movers',
          href: 'https://puco.ohio.gov/transportation/movers',
          external: true,
        },
        {
          label: 'PUCO — Household goods carriers list',
          href: 'https://puco.ohio.gov/transportation/movers/resources/hhg-list',
          external: true,
        },
        {
          label: 'PUCO — Know your rights when hiring a mover',
          href: 'https://puco.ohio.gov/transportation/movers/resources/know-your-rights-when-hiring-a-moving-company',
          external: true,
        },
        {
          label: 'FMCSA SAFER — USDOT lookup',
          href: 'https://safer.fmcsa.dot.gov/',
          external: true,
        },
        { label: 'Move Trust Hub — Verify a USDOT', href: '/verify-dot' },
      ],
      disclaimer:
        'Licensing rules and directories can change. Always verify current PUCO registration or FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('ohio', [
      {
        key: 'cleveland-ne',
        id: 'cleveland-ne',
        name: 'Cleveland & Northeast Ohio',
        shortName: 'NE Ohio',
        blurb:
          'Lake-effect weather, older multi-story homes, and industrial-edge logistics across Cuyahoga and neighboring counties.',
        challenges: [
          'Lake-effect snow planning',
          'Older multi-story access',
        ],
        ctaLabel: 'Explore Northeast Ohio',
      },
      {
        key: 'columbus-central',
        id: 'columbus-central',
        name: 'Columbus & Central Ohio',
        shortName: 'Central Ohio',
        blurb:
          'State capital growth corridors, university calendars, and fast-growing suburban HOAs around Franklin County.',
        challenges: [
          'University and government calendars',
          'HOA windows in growth suburbs',
        ],
        ctaLabel: 'Explore Central Ohio',
      },
      {
        key: 'cincinnati-sw',
        id: 'cincinnati-sw',
        name: 'Cincinnati & Southwest Ohio',
        shortName: 'SW Ohio',
        blurb:
          'River metro patterns, hills, and cross-state proximity to Kentucky with mixed urban and suburban stock.',
        challenges: [
          'Hills and older multi-story homes',
          'Cross-river traffic patterns',
        ],
        ctaLabel: 'Explore Southwest Ohio',
      },
      {
        key: 'dayton-west',
        id: 'dayton-west',
        name: 'Dayton & West Ohio',
        shortName: 'West Ohio',
        blurb:
          'Dayton logistics corridors and western agricultural counties with mixed small-metro and rural lots.',
        challenges: [
          'Heat and winter extremes',
          'Longer regional hauls',
        ],
        ctaLabel: 'Explore West Ohio',
      },
      {
        key: 'toledo-nw',
        id: 'toledo-nw',
        name: 'Toledo & Northwest Ohio',
        shortName: 'NW Ohio',
        blurb:
          'Toledo metro and northwestern counties with lake-adjacent weather and industrial logistics.',
        challenges: [
          'Winter weather windows',
          'Confirm coverage outside the metro',
        ],
        ctaLabel: 'Explore Northwest Ohio',
      },
      {
        key: 'appalachia-se',
        id: 'appalachia-se',
        name: 'Southeast & Appalachian Ohio',
        shortName: 'SE / Appalachia',
        blurb:
          'Hillier terrain, smaller metros, and rural driveways across southeastern counties including Stark and Appalachian communities.',
        challenges: [
          'Hill and rural driveway access',
          'Thinner local crew coverage',
        ],
        ctaLabel: 'Explore Southeast Ohio',
      },
      {
        key: 'rest',
        id: 'rest-ohio',
        name: 'Other Ohio Counties',
        shortName: 'Rest of OH',
        blurb: 'Remaining counties outside the primary regional groupings.',
        challenges: [
          'Confirm mover coverage for remote addresses',
          'Longer crew travel times',
        ],
        ctaLabel: 'Explore remaining counties',
      },
    ]),
    costs: {
      title: 'Ohio moving costs',
      intro:
        'Ohio pricing reflects multi-metro labor markets, older housing stock, winter productivity, and suburban HOAs. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate Ohio moving costs',
        lastReviewed: '2026-07-22',
        body:
          'These ranges are planning estimates, not quotes. They combine typical Ohio local and intrastate patterns: home size, distance, stairs, HOAs, seasonality, and regional labor. Actual bids vary. Always compare written estimates from PUCO-registered movers for in-state work and FMCSA-authorized carriers for interstate work.',
      },
      ranges: [
        {
          label: 'Local studio / 1BR',
          value: '$450–$1,600+',
          note: 'Stairs push higher in older stock',
        },
        {
          label: 'Local 2–3BR house',
          value: '$1,400–$4,200+',
          note: 'Suburban long carries common',
        },
        {
          label: 'Intrastate mid-size (e.g. Columbus ↔ Dayton)',
          value: '$1,500–$4,800+',
          note: 'Season matters',
        },
        {
          label: 'Intrastate long (e.g. Cleveland ↔ Cincinnati)',
          value: '$2,000–$6,500+',
          note: 'Full packing pushes the top',
        },
        {
          label: 'Typical 2-person crew (major metros)',
          value: '$115–$195+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'Older multi-story homes add stair labor in many metros.',
        'Winter weather can slow northern Ohio jobs.',
        'HOA windows appear in growth suburbs around Columbus and elsewhere.',
        'Long I-71 / I-75 / I-70 hauls affect portal-to-portal pricing.',
        'Peak May–September and month-end leases fill crews early.',
      ],
    },
    routes: {
      title: 'Popular Ohio moving routes',
      intro:
        'Ohio is a Midwest crossroads with strong outbound Sun Belt lanes and large multi-metro internal flows. Interstate jobs need FMCSA authority; in-state corridors need PUCO-registered household goods movers.',
      migrationProfile: 'outbound_dominant',
      outbound: [
        {
          label: 'Ohio → Florida',
          href: '/moving-to/florida',
          origins: 'Cleveland, Columbus, Cincinnati',
          transit: 'Multi-day; snowbird seasonality',
          planningNote: 'Book early for fall/winter FL arrivals.',
          note: 'High-volume Midwest-to-Florida corridor.',
        },
        {
          label: 'Ohio → Carolinas / South',
          href: '/moving-to/north-carolina',
          origins: 'Columbus, Cincinnati, Cleveland',
          transit: 'I-75 / I-77 corridors',
          planningNote: 'HOAs at destination common.',
          note: 'Popular lifestyle outbound destinations.',
        },
        {
          label: 'Ohio → Indiana / Kentucky',
          href: '/moving-to/indiana',
          origins: 'Cincinnati, Dayton, Toledo',
          transit: 'Often same-day or next-day interstate',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Short cross-border metro moves are common.',
        },
      ],
      inbound: [
        {
          label: 'Moving to Franklin County (Columbus)',
          href: '/local-movers/ohio/franklin',
          note: 'Growth suburbs and university calendars.',
        },
        {
          label: 'Moving to Cuyahoga County (Cleveland)',
          href: '/local-movers/ohio/cuyahoga',
          note: 'Older stock and lake-effect weather.',
        },
        {
          label: 'Moving to Hamilton County (Cincinnati)',
          href: '/local-movers/ohio/hamilton',
          note: 'Hills and river-metro logistics.',
        },
      ],
    },
    challenges: {
      title: 'Ohio-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real Ohio moves — not generic national checklist filler.',
      items: [
        {
          title: 'Winter weather (especially northern Ohio)',
          detail:
            'Lake-effect snow and ice change driveway access and schedules. Build weather buffer into winter moves.',
        },
        {
          title: 'Older multi-story housing stock',
          detail:
            'Stairs and tight entries increase labor time in many urban neighborhoods.',
        },
        {
          title: 'Multi-metro distances',
          detail:
            'Cleveland–Cincinnati is a real haul. Treat long in-state corridors as distance moves with correct PUCO registration.',
        },
        {
          title: 'HOA growth suburbs',
          detail:
            'Especially around Columbus, confirm COI and approved hours before move day.',
        },
        {
          title: 'Appalachian / hill access in the southeast',
          detail:
            'Steeper lots may need smaller trucks or longer carries — survey access early.',
        },
        {
          title: 'PUCO registration checks',
          detail:
            'Verify the mover appears on PUCO household goods resources and that certificate numbers appear in advertising.',
        },
      ],
    },
    tools: SHARED_TOOLS('Ohio'),
    faq: [
      {
        question: 'How are movers regulated in Ohio?',
        answer:
          'Household goods movers operating within Ohio must register with the Public Utilities Commission of Ohio (PUCO) and follow PUCO rules. Interstate moves require federal FMCSA operating authority and a USDOT number.',
      },
      {
        question: 'How do I verify an Ohio mover is registered?',
        answer:
          'Check the PUCO household goods movers list / resources and look for the certificate number in advertisements. For interstate work, also verify USDOT / MC on FMCSA SAFER before paying a deposit.',
      },
      {
        question: 'When is the best time to move in Ohio?',
        answer:
          'Demand peaks late spring through early fall. Mid-week mornings are often easier. Winter weather can force flexible dates, especially in northern counties.',
      },
      {
        question: 'Why do Ohio move prices vary so much?',
        answer:
          'Metro labor rates, stairs in older homes, HOAs, winter productivity, and long intercity distances all change hours. Access and season often matter as much as miles.',
      },
      {
        question: 'Is PUCO registration enough for a move to Florida?',
        answer:
          'No. Crossing state lines generally requires FMCSA interstate authority. PUCO household goods registration covers Ohio intrastate operations — not interstate operating authority.',
      },
      {
        question: 'What should I check before hiring any Ohio mover?',
        answer:
          'Active PUCO registration for in-state work (or FMCSA for interstate), written estimate, insurance/valuation clarity, and contract terms. Avoid large cash deposits to unverified operators.',
      },
    ],
    trust: {
      byline: 'Curated by the Move Trust Hub editorial team',
      lastReviewed: '2026-07-22',
      methodology:
        'County guides combine public registration checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.',
      independence:
        'Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.',
      sources: [
        {
          label: 'PUCO — Movers',
          href: 'https://puco.ohio.gov/transportation/movers',
        },
        {
          label: 'PUCO — HHG list',
          href: 'https://puco.ohio.gov/transportation/movers/resources/hhg-list',
        },
        {
          label: 'PUCO — Know your rights',
          href: 'https://puco.ohio.gov/transportation/movers/resources/know-your-rights-when-hiring-a-moving-company',
        },
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  };
}

const fileMap = [
  ['illinois', 'illinoisStateResourceHub', packs.illinois],
  ['pennsylvania', 'pennsylvaniaStateResourceHub', packs.pennsylvania],
  ['north-carolina', 'northCarolinaStateResourceHub', packs['north-carolina']],
  ['washington', 'washingtonStateResourceHub', packs.washington],
  ['ohio', 'ohioStateResourceHub', packs.ohio],
];

for (const [file, varName, pack] of fileMap) {
  const seen = new Set();
  let dups = 0;
  for (const r of pack.regions) {
    for (const s of r.countySlugs) {
      if (seen.has(s)) dups++;
      seen.add(s);
    }
  }
  console.log(
    file,
    'counties',
    seen.size,
    'dups',
    dups,
    'mode',
    pack.regulations.mode,
    'migration',
    pack.routes.migrationProfile
  );
  if (dups) throw new Error('duplicate counties in ' + file);
  writeFileSync(
    `lib/local-movers/state-resource-hub/${file}.ts`,
    toTs(varName, pack)
  );
}

// Merge registry with existing Wave 1 + CA
writeFileSync(
  'lib/local-movers/state-resource-hub/registry.ts',
  `import { arizonaStateResourceHub } from '@/lib/local-movers/state-resource-hub/arizona';
import { californiaStateResourceHub } from '@/lib/local-movers/state-resource-hub/california';
import { floridaStateResourceHub } from '@/lib/local-movers/state-resource-hub/florida';
import { georgiaStateResourceHub } from '@/lib/local-movers/state-resource-hub/georgia';
import { illinoisStateResourceHub } from '@/lib/local-movers/state-resource-hub/illinois';
import { newYorkStateResourceHub } from '@/lib/local-movers/state-resource-hub/new-york';
import { northCarolinaStateResourceHub } from '@/lib/local-movers/state-resource-hub/north-carolina';
import { ohioStateResourceHub } from '@/lib/local-movers/state-resource-hub/ohio';
import { pennsylvaniaStateResourceHub } from '@/lib/local-movers/state-resource-hub/pennsylvania';
import { texasStateResourceHub } from '@/lib/local-movers/state-resource-hub/texas';
import { washingtonStateResourceHub } from '@/lib/local-movers/state-resource-hub/washington';
import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

const PACKS: StateResourceHubPack[] = [
  arizonaStateResourceHub,
  californiaStateResourceHub,
  floridaStateResourceHub,
  georgiaStateResourceHub,
  illinoisStateResourceHub,
  newYorkStateResourceHub,
  northCarolinaStateResourceHub,
  ohioStateResourceHub,
  pennsylvaniaStateResourceHub,
  texasStateResourceHub,
  washingtonStateResourceHub,
];

const bySlug = new Map(PACKS.map((p) => [p.stateSlug, p] as const));

export function getStateResourceHubPack(
  stateSlug: string
): StateResourceHubPack | null {
  return bySlug.get(stateSlug) ?? null;
}

export function hasStateResourceHubPack(stateSlug: string): boolean {
  return bySlug.has(stateSlug);
}
`
);

console.log('registry updated with Wave 2');
