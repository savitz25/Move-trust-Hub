/**
 * Generates Wave 1 State Resource Hub packs from researched content + validated regions.
 * Run: node scripts/generate-wave1-state-hubs.mjs
 */
import { readFileSync, writeFileSync } from 'fs';

const regions = JSON.parse(readFileSync('scripts/tmp-wave1-regions.json', 'utf8'));

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

function intents(stateName, code) {
  return [
    {
      id: 'within',
      label: `Moving Within ${stateName}`,
      href: '#hub-regulations',
      description: `Confirm in-state licensing rules, then compare local costs and open the counties you will use.`,
    },
    {
      id: 'to',
      label: `Moving To ${stateName}`,
      href: '#hub-regions',
      description: `Choose a region first, then a county guide for access, seasonality, and metro logistics.`,
    },
    {
      id: 'from',
      label: `Moving From ${stateName}`,
      href: '#hub-routes',
      description: `Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul.`,
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
  // defs: [{id, name, shortName, blurb, challenges, ctaLabel, key}]
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

const packs = {
  texas: {
    stateSlug: 'texas',
    stateCode: 'TX',
    h1: 'Texas Moving Resource Hub: Costs, TxDMV Licensing & 254 County Guides',
    metaTitle:
      'Texas Movers Guide 2026 — Costs, TxDMV Licensing & 254 County Guides',
    metaDescription:
      'Plan a move within, to, or from Texas. Compare local and intrastate costs, verify TxDMV household goods certificates, browse 254 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for Texas moves in 2026 — typical costs, TxDMV vs FMCSA rules, metro and regional county guides, and tools to compare licensed movers without paid placements.',
    trustBar: [
      '254 County Guides',
      'Verified Movers',
      'TxDMV & FMCSA Checked',
      'Updated 2026',
    ],
    intents: intents('Texas', 'TX'),
    primaryCta: {
      label: 'Calculate My Texas Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in Texas is different',
      paragraphs: [
        'Texas is not one moving market. DFW freeways, Houston humidity and flooding risk, Austin growth corridors, San Antonio military calendars, Permian Basin industrial traffic, and vast rural driveways produce different truck access, labor time, and soft costs — even when map miles look similar.',
        'Intrastate household goods movers must hold an active Texas Department of Motor Vehicles (TxDMV) certificate. Interstate jobs need federal FMCSA authority. Summer heat, long intercity distances, and HOA-heavy suburbs are first-class planning inputs — then drill into the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'Texas moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical Texas local and intrastate patterns; they are not bids. Mover counts combine curated county listings and verified directory carriers. Always compare written estimates from movers licensed for your route.',
      stats: [
        {
          label: 'Typical local move (studio–2BR)',
          value: '$450–$2,200+',
          note: 'Same metro; stairs, long carries, and HOAs push higher',
        },
        {
          label: 'Typical local move (3–4+ BR)',
          value: '$1,600–$5,500+',
          note: 'Larger homes and heat-day crew hours common',
        },
        {
          label: 'Intrastate corridor (e.g. DFW ↔ Houston)',
          value: '$2,200–$7,500+',
          note: 'Home size, packing, and season drive the spread',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'Heat + school calendars; mid-week mornings help',
        },
        {
          label: 'Top inbound origins',
          value: 'CA · NY · IL · FL · CO',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: '254',
          note: 'Major metros emphasized; full state coverage',
        },
      ],
    },
    regulations: {
      mode: 'strong_state_regulator',
      title: 'Texas moving regulations & consumer protection',
      intro:
        'Texas requires household goods movers operating in the state to be certified by the Texas Department of Motor Vehicles (TxDMV). Match the license to the job before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside Texas)',
        body:
          'If origin or destination is outside Texas, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. A TxDMV certificate alone does not authorize an out-of-state delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within Texas)',
        body:
          'Moves that start and end in Texas generally require an active TxDMV household goods / motor carrier certificate. Consumers can verify status in the TxDMV Truck Stop motor carrier lookup. Certificate numbers should appear on trucks, ads, and proposals.',
      },
      verifySteps: [
        'Classify the job: entirely in Texas (TxDMV) vs any out-of-state leg (FMCSA / USDOT).',
        'Copy the exact legal name and certificate / USDOT numbers from the written estimate.',
        'Intrastate: search the company in the TxDMV Truck Stop database and confirm Active status.',
        'Interstate: look up USDOT / MC on FMCSA SAFER; review out-of-service and authority status.',
        'Refuse large cash deposits to unverified operators; keep the estimate, inventory, and contract.',
        'Confirm cargo and liability insurance and how valuation coverage works before load day.',
      ],
      protections: [
        {
          title: 'Written proposals & contracts',
          detail:
            'Licensed Texas movers should provide clear written proposals/contracts. Read every line before you sign and keep a copy.',
        },
        {
          title: 'Vehicle markings',
          detail:
            'TxDMV expects required markings (including certificate and USDOT information as applicable) on moving equipment. Missing markings can be a red flag.',
        },
        {
          title: 'Complaints',
          detail:
            'Document damage or disputes in writing. TxDMV consumer-protection resources and FMCSA (for interstate) may apply depending on the route.',
        },
      ],
      officialLinks: [
        {
          label: 'TxDMV — Don’t Make a Move Without Us',
          href: 'https://www.txdmv.gov/motorists/consumer-protection/dont-make-a-move',
          external: true,
        },
        {
          label: 'TxDMV Truck Stop carrier lookup',
          href: 'https://apps.txdmv.gov/apps/mccs/truckstop/',
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
        'Licensing rules and lookup tools can change. Always verify current certificate or authority status on official government sites for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('texas', [
      {
        key: 'dfw',
        id: 'dfw',
        name: 'Dallas–Fort Worth Metroplex',
        shortName: 'DFW',
        blurb:
          'Freeway-dense suburbs, HOA tracts, and high-volume corporate and family moves across Collin, Dallas, Denton, and Tarrant.',
        challenges: [
          'I-35 / I-20 / I-635 congestion and long portal-to-portal time',
          'HOA windows and new-construction access',
        ],
        ctaLabel: 'Explore DFW counties',
      },
      {
        key: 'houston',
        id: 'houston',
        name: 'Greater Houston',
        shortName: 'Houston',
        blurb:
          'Humidity, floodplain access planning, energy-sector calendars, and sprawling suburban HOAs from Harris to Fort Bend and Montgomery.',
        challenges: [
          'Weather and flood-risk staging flexibility',
          'Long suburban carries and HOA rules',
        ],
        ctaLabel: 'Explore Houston region',
      },
      {
        key: 'austin-central',
        id: 'austin-central',
        name: 'Austin & Central Texas',
        shortName: 'Austin',
        blurb:
          'Fast-growth corridors, tech and university calendars, and steep demand for mid-week windows in Travis and Williamson.',
        challenges: [
          'Apartment elevators and downtown staging limits',
          'Peak school-year and tech relocation demand',
        ],
        ctaLabel: 'Explore Austin region',
      },
      {
        key: 'san-antonio',
        id: 'san-antonio',
        name: 'San Antonio & South-Central',
        shortName: 'San Antonio',
        blurb:
          'Military PCS cycles, Hill Country approaches, and large family homes across Bexar and neighboring counties.',
        challenges: [
          'Military calendar spikes',
          'Heat and longer suburban driveways',
        ],
        ctaLabel: 'Explore San Antonio region',
      },
      {
        key: 'rgv-south',
        id: 'rgv-south',
        name: 'Rio Grande Valley & South Texas',
        shortName: 'RGV / South',
        blurb:
          'Border metros, winter Texian/snowbird patterns, and bilingual service expectations in Hidalgo, Cameron, and Webb.',
        challenges: [
          'Seasonal population swings',
          'Heat and long regional hauls',
        ],
        ctaLabel: 'Explore South Texas',
      },
      {
        key: 'el-paso',
        id: 'el-paso',
        name: 'El Paso & Far West',
        shortName: 'El Paso',
        blurb:
          'Desert climate, mountain-edge access, and cross-border logistics context on the far western edge of the state.',
        challenges: [
          'Desert heat windows',
          'Long distances to other Texas metros',
        ],
        ctaLabel: 'Explore El Paso region',
      },
      {
        key: 'permian-west',
        id: 'permian-west',
        name: 'Permian Basin & West Texas',
        shortName: 'Permian / West',
        blurb:
          'Energy-sector demand, industrial traffic, and sparse rural segments between Midland–Odessa and surrounding counties.',
        challenges: [
          'Oilfield traffic and crew availability',
          'Long rural approaches',
        ],
        ctaLabel: 'Explore West Texas',
      },
      {
        key: 'east-texas',
        id: 'east-texas',
        name: 'East Texas',
        shortName: 'East Texas',
        blurb:
          'Piney Woods towns, mixed suburban and rural lots, and corridors linking Tyler–Longview to Houston and DFW.',
        challenges: [
          'Rural driveway access',
          'Longer hauls to major metros',
        ],
        ctaLabel: 'Explore East Texas',
      },
      {
        key: 'panhandle-plains',
        id: 'panhandle-plains',
        name: 'Panhandle & South Plains',
        shortName: 'Panhandle',
        blurb:
          'Amarillo and Lubbock hubs, wind and weather exposure, and wide-open approaches across the plains.',
        challenges: [
          'Wind and weather delays',
          'Distance between towns',
        ],
        ctaLabel: 'Explore Panhandle / Plains',
      },
      {
        key: 'coastal-bend',
        id: 'coastal-bend',
        name: 'Coastal Bend',
        shortName: 'Coastal Bend',
        blurb:
          'Corpus Christi and coastal humidity, hurricane-season flexibility, and port-adjacent logistics.',
        challenges: [
          'Hurricane-season timing',
          'Humidity and coastal access',
        ],
        ctaLabel: 'Explore Coastal Bend',
      },
      {
        key: 'rest-texas',
        id: 'rest-texas',
        name: 'Hill Country, Borderlands & Rest of Texas',
        shortName: 'Rest of Texas',
        blurb:
          'Smaller metros, Hill Country lots, agricultural properties, and long rural driveways outside the major hubs.',
        challenges: [
          'Thin local crew coverage',
          'Long driveways and farm-adjacent access',
        ],
        ctaLabel: 'Explore other Texas counties',
      },
    ]),
    costs: {
      title: 'Texas moving costs',
      intro:
        'Texas pricing reflects metro labor markets, long intercity distances, summer heat productivity, and HOA accessorials. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate Texas moving costs',
        lastReviewed: '2026-07-22',
        body:
          'These ranges are planning estimates, not quotes. They combine typical Texas local and intrastate market patterns: home size, distance, accessorials (stairs, long carries, HOAs), seasonal demand, and regional labor rates. Actual bids vary. Always compare written estimates from movers with active TxDMV certificates for in-state work and FMCSA authority for interstate work.',
      },
      ranges: [
        {
          label: 'Local studio / 1BR (simple access)',
          value: '$450–$1,500+',
          note: 'Higher with elevators or HOA rules',
        },
        {
          label: 'Local 2–3BR house',
          value: '$1,400–$4,200+',
          note: 'Suburban long carries common',
        },
        {
          label: 'Intrastate mid-size (e.g. Austin ↔ San Antonio)',
          value: '$1,800–$5,500+',
          note: 'Packing and season matter',
        },
        {
          label: 'Intrastate long (e.g. DFW ↔ Houston)',
          value: '$2,200–$7,500+',
          note: '3–4+ BR and full packing push the top',
        },
        {
          label: 'Typical 2-person crew (major metros)',
          value: '$120–$200+/hr',
          note: 'Portal-to-portal; heat days may affect pace',
        },
      ],
      factors: [
        'Major metros (DFW, Houston, Austin) often price higher than rural counties.',
        'Summer heat favors early starts and can extend labor time.',
        'HOA move windows and gate lists add soft costs in master-planned suburbs.',
        'Long I-10 / I-35 / I-45 portal-to-portal time affects hourly bills.',
        'Peak May–September and end-of-month weekends fill crews early.',
      ],
    },
    routes: {
      title: 'Popular Texas moving routes',
      intro:
        'Texas is a major inbound destination and a large internal market. Interstate jobs need FMCSA authority; in-state corridors need TxDMV-certified household goods movers.',
      migrationProfile: 'inbound_dominant',
      outbound: [
        {
          label: 'Texas → Oklahoma / Arkansas',
          href: '/moving-to/oklahoma',
          origins: 'DFW, East Texas, Houston',
          transit: 'Often same-week interstate corridors',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Common shorter interstate hops from North and East Texas.',
        },
        {
          label: 'Texas → Colorado',
          href: '/moving-to/colorado',
          origins: 'DFW, Austin, Houston',
          transit: 'Multi-day linehaul',
          planningNote: 'Altitude and seasonal weather at destination matter.',
          note: 'Popular lifestyle outbound lane for metro Texas households.',
        },
        {
          label: 'Texas → Florida',
          href: '/moving-to/florida',
          origins: 'Houston, DFW, San Antonio',
          transit: 'Multi-day I-10 / southeastern corridors',
          planningNote: 'Hurricane season and HOA rules at FL destinations.',
          note: 'Bi-directional Sun Belt traffic is common.',
        },
      ],
      inbound: [
        {
          label: 'California → Texas',
          href: '/local-movers/texas',
          origins: 'LA Basin, Bay Area, San Diego',
          transit: 'Multi-day; large inventories common',
          planningNote: 'One of the highest-volume inbound lanes into Texas metros.',
          note: 'Confirm interstate FMCSA authority and TxDMV for any in-state second hop.',
        },
        {
          label: 'Moving to Dallas County / DFW',
          href: '/local-movers/texas/dallas',
          note: 'Freeway density and HOA suburbs define many arrivals.',
        },
        {
          label: 'Moving to Harris County / Houston',
          href: '/local-movers/texas/harris',
          note: 'Humidity, sprawl, and floodplain access planning.',
        },
        {
          label: 'Moving to Travis County / Austin',
          href: '/local-movers/texas/travis',
          note: 'Growth corridors and apartment elevators are common.',
        },
      ],
    },
    challenges: {
      title: 'Texas-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real Texas moves — not generic national checklist filler.',
      items: [
        {
          title: 'Summer heat & early starts',
          detail:
            'June–September heat is operational, not cosmetic. Prefer early load windows, hydration plans, and realistic labor time for multi-story homes.',
        },
        {
          title: 'Metro freeway congestion',
          detail:
            'DFW, Houston, and Austin portal-to-portal time often exceeds map estimates at peak. Ask whether quotes are portal-to-portal.',
        },
        {
          title: 'HOA and master-planned communities',
          detail:
            'Many suburbs require Certificates of Insurance, approved hours, and gate lists. Collect the packet before move day.',
        },
        {
          title: 'Rural and ranch access',
          detail:
            'Outside metros, long driveways, soft shoulders, and limited turnarounds can force smaller trucks or long carries.',
        },
        {
          title: 'Severe weather flexibility',
          detail:
            'Thunderstorms, flooding, and Gulf storms can force reschedules. Build buffer into load/delivery windows.',
        },
        {
          title: 'Long distances between hubs',
          detail:
            'El Paso, Lubbock, the Valley, and East Texas are not “local” to DFW or Houston. Treat long in-state hauls as distance moves with correct licensing.',
        },
      ],
    },
    tools: SHARED_TOOLS('Texas'),
    faq: [
      {
        question: 'How are movers regulated in Texas?',
        answer:
          'Intrastate household goods movers generally need an active Texas Department of Motor Vehicles (TxDMV) certificate. Interstate moves that cross state lines require federal FMCSA operating authority and a USDOT number. Confirm which framework applies to your exact origin and destination and verify status on official tools (TxDMV Truck Stop and FMCSA SAFER).',
      },
      {
        question: 'How do I verify a Texas mover is licensed?',
        answer:
          'Search the company name or certificate in the TxDMV Truck Stop motor carrier lookup and confirm Active status. For interstate work, also verify USDOT / MC on FMCSA SAFER. Match the legal name on your estimate to the official record before you pay a deposit.',
      },
      {
        question: 'When is the best time to move in Texas?',
        answer:
          'Demand peaks late spring through early fall and around month-end leases. Mid-week mornings outside peak summer heat are often easier for crew availability and HOA windows. Extreme heat can affect summer pacing even when crews are available.',
      },
      {
        question: 'Why do Texas moves vary so much in price?',
        answer:
          'Metro labor markets, HOA accessorials, stairs/long carries, heat, and long intercity distances drive spreads. Rural jobs may add travel time. Use county guides for local access tips and the calculator for inventory-based planning.',
      },
      {
        question: 'Do I need different movers for local vs interstate Texas moves?',
        answer:
          'Not always, but the license must match the job. A TxDMV-certified intrastate operator may not hold FMCSA interstate authority. Always verify TxDMV for in-state work and FMCSA for out-of-state work — some companies hold both.',
      },
      {
        question: 'What should I watch for with unlicensed movers in Texas?',
        answer:
          'TxDMV warns consumers that unlicensed operators are illegal for household goods work. Avoid large cash deposits, demand written contracts, and verify Active certificate status in Truck Stop before load day.',
      },
    ],
    trust: {
      byline: 'Curated by the Move Trust Hub editorial team',
      lastReviewed: '2026-07-22',
      methodology:
        'County guides combine public licensing checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement for inclusion. Cost ranges are planning estimates derived from typical Texas market patterns, not live bids.',
      independence:
        'Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.',
      sources: [
        {
          label: 'TxDMV consumer protection — household movers',
          href: 'https://www.txdmv.gov/motorists/consumer-protection/dont-make-a-move',
        },
        {
          label: 'TxDMV Truck Stop lookup',
          href: 'https://apps.txdmv.gov/apps/mccs/truckstop/',
        },
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  },
};

// Continue with FL, NY, GA, AZ in same object...
Object.assign(packs, {
  florida: buildFlorida(),
  'new-york': buildNewYork(),
  georgia: buildGeorgia(),
  arizona: buildArizona(),
});

function buildFlorida() {
  return {
    stateSlug: 'florida',
    stateCode: 'FL',
    h1: 'Florida Moving Resource Hub: Costs, FDACS Registration & 67 County Guides',
    metaTitle:
      'Florida Movers Guide 2026 — Costs, FDACS Registration & 67 County Guides',
    metaDescription:
      'Plan a move within, to, or from Florida. Compare local and intrastate costs, verify FDACS household mover registration, browse 67 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for Florida moves in 2026 — typical costs, FDACS vs FMCSA rules, regional county guides, and tools to compare registered movers without paid placements.',
    trustBar: [
      '67 County Guides',
      'Verified Movers',
      'FDACS & FMCSA Checked',
      'Updated 2026',
    ],
    intents: intents('Florida', 'FL'),
    primaryCta: {
      label: 'Calculate My Florida Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in Florida is different',
      paragraphs: [
        'Florida is not one moving market. South Florida high-rises and COIs, Tampa Bay bridges, Orlando tourism calendars, Panhandle storm windows, and inland heat produce different access and labor profiles under one state name.',
        'Intrastate household movers must register with the Florida Department of Agriculture and Consumer Services (FDACS) under Chapter 507, Florida Statutes. Interstate jobs need FMCSA authority. Hurricane season, HOAs, and condo elevators are planning inputs — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'Florida moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical Florida local and intrastate patterns; they are not bids. Always compare written estimates from FDACS-registered movers for in-state work and FMCSA-authorized carriers for interstate work.',
      stats: [
        {
          label: 'Typical local move (studio–2BR)',
          value: '$500–$2,400+',
          note: 'Condos/elevators and parking push higher',
        },
        {
          label: 'Typical local move (3–4+ BR)',
          value: '$1,800–$5,800+',
          note: 'HOAs and heat-day labor common',
        },
        {
          label: 'Intrastate corridor (e.g. Miami ↔ Orlando)',
          value: '$2,000–$7,000+',
          note: 'Season and packing drive the spread',
        },
        {
          label: 'Peak season',
          value: 'Oct–Apr (snowbird) + summer leases',
          note: 'Hurricane season needs flexible dates',
        },
        {
          label: 'Top inbound origins',
          value: 'NY · NJ · PA · IL · OH · CA',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: '67',
          note: 'Coastal metros emphasized',
        },
      ],
    },
    regulations: {
      mode: 'strong_state_regulator',
      title: 'Florida moving regulations & consumer protection',
      intro:
        'Florida requires intrastate household movers and moving brokers to register with the Florida Department of Agriculture and Consumer Services (FDACS). Match registration to the job before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside Florida)',
        body:
          'If origin or destination is outside Florida, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. FDACS registration alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within Florida)',
        body:
          'Intrastate movers of household goods must register with FDACS under Chapter 507, Florida Statutes. Consumers can verify registration through the FDACS business/license lookup or by calling 1-800-HELP-FLA. Local city/county licenses may also apply but do not replace state registration.',
      },
      verifySteps: [
        'Classify the job: entirely in Florida (FDACS) vs any out-of-state leg (FMCSA / USDOT).',
        'Copy the exact legal name from the written estimate and any registration number provided.',
        'Intrastate: verify the mover in the FDACS business search / license lookup.',
        'Interstate: look up USDOT / MC on FMCSA SAFER.',
        'Ask for required consumer disclosures, written estimates, and valuation options.',
        'Avoid large cash deposits to unverified operators; keep contracts and inventories.',
      ],
      protections: [
        {
          title: 'Written estimates & contracts',
          detail:
            'Insist on written estimates and read contracts fully. Clarify stairs, long carries, elevators, and storage fees before signing.',
        },
        {
          title: 'Insurance minimums',
          detail:
            'FDACS registration involves insurance requirements for household goods. Confirm coverage details and optional valuation upgrades.',
        },
        {
          title: 'Complaints',
          detail:
            'FDACS consumer resources and 1-800-HELP-FLA can assist with in-state mover issues. Interstate disputes may involve FMCSA.',
        },
      ],
      officialLinks: [
        {
          label: 'FDACS — Moving companies',
          href: 'https://www.fdacs.gov/Business-Services/Moving-Companies',
          external: true,
        },
        {
          label: 'FDACS — Moving within Florida',
          href: 'https://www.fdacs.gov/Consumer-Resources/Consumer-Rights-and-Responsibilities/Moving-Within-Florida',
          external: true,
        },
        {
          label: 'FDACS business search',
          href: 'https://csapp.fdacs.gov/cspublicapp/businesssearch/businesssearch.aspx',
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
        'Licensing rules and lookup tools can change. Always verify current FDACS registration or FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('florida', [
      {
        key: 'south-florida',
        id: 'south-florida',
        name: 'South Florida',
        shortName: 'South FL',
        blurb:
          'Miami–Fort Lauderdale–Palm Beach density, condo elevators/COI, parking permits, and international inbound patterns.',
        challenges: [
          'High-rise elevators and building COI windows',
          'Tight street staging and parking rules',
        ],
        ctaLabel: 'Explore South Florida',
      },
      {
        key: 'tampa-bay',
        id: 'tampa-bay',
        name: 'Tampa Bay',
        shortName: 'Tampa Bay',
        blurb:
          'Bridges, humidity, suburban HOAs, and mixed coastal/inland access across Hillsborough, Pinellas, and neighbors.',
        challenges: [
          'Bridge and bay traffic timing',
          'HOA and multi-unit access rules',
        ],
        ctaLabel: 'Explore Tampa Bay',
      },
      {
        key: 'central-orlando',
        id: 'central-orlando',
        name: 'Central Florida / Orlando',
        shortName: 'Central FL',
        blurb:
          'Tourism calendars, theme-park traffic, and fast-growing suburbs in Orange, Seminole, Osceola, and Polk.',
        challenges: [
          'Tourism-season congestion',
          'New-construction HOA rules',
        ],
        ctaLabel: 'Explore Central Florida',
      },
      {
        key: 'northeast-jax',
        id: 'northeast-jax',
        name: 'Northeast Florida / Jacksonville',
        shortName: 'NE Florida',
        blurb:
          'Jacksonville metro sprawl, military presence, and Atlantic coastal communities north of Central Florida.',
        challenges: [
          'Military PCS calendars',
          'Long suburban portal-to-portal time',
        ],
        ctaLabel: 'Explore Northeast Florida',
      },
      {
        key: 'southwest',
        id: 'southwest',
        name: 'Southwest Florida',
        shortName: 'SW Florida',
        blurb:
          'Fort Myers–Naples corridors, seasonal residents, and Gulf Coast HOAs in Lee and Collier.',
        challenges: [
          'Snowbird-season demand spikes',
          'Gulf storm timing flexibility',
        ],
        ctaLabel: 'Explore Southwest Florida',
      },
      {
        key: 'panhandle',
        id: 'panhandle',
        name: 'Northwest Florida / Panhandle',
        shortName: 'Panhandle',
        blurb:
          'Beach towns, military bases, and Tallahassee government calendars from Escambia through Leon.',
        challenges: [
          'Hurricane-season access risk',
          'Seasonal tourism windows on the coast',
        ],
        ctaLabel: 'Explore the Panhandle',
      },
      {
        key: 'north-central',
        id: 'north-central',
        name: 'North & Interior Florida',
        shortName: 'North / Interior',
        blurb:
          'Gainesville, Ocala, and interior counties with mixed college, rural, and small-metro patterns.',
        challenges: [
          'Thinner crew coverage outside metros',
          'Heat and longer regional hauls',
        ],
        ctaLabel: 'Explore North / Interior Florida',
      },
    ]),
    costs: {
      title: 'Florida moving costs',
      intro:
        'Florida pricing reflects condo accessorials, HOAs, heat/humidity, and seasonal demand (snowbirds and summer leases). Use ranges for planning, then run a personalized inventory through the calculator.',
      methodology: {
        title: 'How we estimate Florida moving costs',
        lastReviewed: '2026-07-22',
        body:
          'These ranges are planning estimates, not quotes. They combine typical Florida local and intrastate patterns: home size, distance, elevators/COI, parking, HOAs, seasonality, and regional labor. Actual bids vary. Always compare written estimates from FDACS-registered movers for in-state work and FMCSA-authorized carriers for interstate work.',
      },
      ranges: [
        {
          label: 'Local studio / 1BR condo',
          value: '$500–$1,800+',
          note: 'Elevators and COI soft costs common',
        },
        {
          label: 'Local 2–3BR house',
          value: '$1,500–$4,500+',
          note: 'HOA windows add soft costs',
        },
        {
          label: 'Intrastate mid-size (e.g. Tampa ↔ Orlando)',
          value: '$1,800–$5,500+',
          note: 'Season matters',
        },
        {
          label: 'Intrastate long (e.g. Miami ↔ Jacksonville)',
          value: '$2,400–$7,500+',
          note: 'Full packing pushes the top',
        },
        {
          label: 'Typical 2-person crew (major metros)',
          value: '$125–$210+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'South Florida high-rises often require elevator reservations and COI.',
        'HOA move windows are common across coastal and master-planned suburbs.',
        'Snowbird season (roughly Oct–Apr) can tighten calendars in SWFL and parts of the east coast.',
        'Hurricane season requires flexible load/delivery planning.',
        'Heat and humidity favor early starts most of the year.',
      ],
    },
    routes: {
      title: 'Popular Florida moving routes',
      intro:
        'Florida is a major inbound destination with strong Northeast and Midwest origins. Interstate jobs need FMCSA authority; in-state corridors need FDACS-registered movers.',
      migrationProfile: 'inbound_dominant',
      outbound: [
        {
          label: 'Florida → Georgia / Carolinas',
          href: '/moving-to/georgia',
          origins: 'Jacksonville, Orlando, Tampa',
          transit: 'Often 1–2 day interstate corridors',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Common shorter outbound hops from North and Central Florida.',
        },
        {
          label: 'Florida → Texas',
          href: '/moving-to/texas',
          origins: 'Tampa, Orlando, South Florida',
          transit: 'Multi-day I-10 corridor',
          planningNote: 'Heat at both ends in summer.',
          note: 'Bi-directional Sun Belt traffic is common.',
        },
      ],
      inbound: [
        {
          label: 'Northeast → Florida',
          href: '/local-movers/florida',
          origins: 'NY, NJ, PA, New England',
          transit: 'Multi-day; peak in fall/winter snowbird windows',
          planningNote: 'Book early for Oct–Apr coastal arrivals.',
          note: 'One of the highest-volume inbound patterns into Florida.',
        },
        {
          label: 'Moving to Miami-Dade County',
          href: '/local-movers/florida/miami-dade',
          note: 'Condo elevators, parking, and dense urban access.',
        },
        {
          label: 'Moving to Orange County (Orlando)',
          href: '/local-movers/florida/orange',
          note: 'Tourism traffic and fast-growth suburbs.',
        },
        {
          label: 'Moving to Hillsborough County (Tampa)',
          href: '/local-movers/florida/hillsborough',
          note: 'Bay area bridges and suburban HOAs.',
        },
      ],
    },
    challenges: {
      title: 'Florida-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real Florida moves — not generic national checklist filler.',
      items: [
        {
          title: 'Condo elevators & COI',
          detail:
            'South Florida and many coastal towers require Certificates of Insurance, reserved freight elevators, and fixed move windows. Collect building packets early.',
        },
        {
          title: 'Hurricane season flexibility',
          detail:
            'June–November storms can force reschedules. Build buffer into load and delivery dates, especially on barrier islands and coastal zips.',
        },
        {
          title: 'Snowbird & seasonal demand',
          detail:
            'Fall through spring increases demand in many coastal markets. Book popular windows early.',
        },
        {
          title: 'HOA rules statewide',
          detail:
            'Master-planned and gated communities often limit truck size, hours, and parking. Confirm rules before move day.',
        },
        {
          title: 'Heat and humidity',
          detail:
            'Early starts protect crews and belongings. Plan water and AC staging for electronics and wood furniture.',
        },
        {
          title: 'Tourism traffic (Orlando / beaches)',
          detail:
            'Theme-park and beach traffic can inflate portal-to-portal time. Prefer mid-week mornings when possible.',
        },
      ],
    },
    tools: SHARED_TOOLS('Florida'),
    faq: [
      {
        question: 'How are movers regulated in Florida?',
        answer:
          'Intrastate household movers and moving brokers must register with the Florida Department of Agriculture and Consumer Services (FDACS) under Chapter 507, Florida Statutes. Interstate moves require federal FMCSA operating authority and a USDOT number. Verify FDACS registration for in-state work and FMCSA SAFER for out-of-state work.',
      },
      {
        question: 'How do I verify a Florida mover is registered?',
        answer:
          'Use the FDACS business/license lookup or call 1-800-HELP-FLA. Match the legal name on your estimate to the registration record. For interstate moves, also verify USDOT / MC on FMCSA SAFER.',
      },
      {
        question: 'When is the best time to move in Florida?',
        answer:
          'It depends on market: snowbird season tightens coastal calendars roughly October–April, while summer still sees lease-driven peaks and heat. Hurricane season requires flexible dates. Mid-week mornings are often easier for elevators and traffic.',
      },
      {
        question: 'Why do condo moves cost more in Florida?',
        answer:
          'Elevator reservations, COI requirements, long carries from loading docks, and limited truck staging add labor time and soft costs — especially in South Florida high-rises.',
      },
      {
        question: 'Do HOAs affect Florida moves?',
        answer:
          'Yes. Many communities require approved hours, insurance certificates, and parking rules. Get the HOA or building packet before you book a crew.',
      },
      {
        question: 'Is FDACS registration enough for a move to Georgia or New York?',
        answer:
          'No. Crossing state lines generally requires FMCSA interstate authority. FDACS registration covers intrastate Florida household moving registration requirements — not interstate operating authority.',
      },
    ],
    trust: {
      byline: 'Curated by the Move Trust Hub editorial team',
      lastReviewed: '2026-07-22',
      methodology:
        'County guides combine public registration/licensing checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.',
      independence:
        'Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.',
      sources: [
        {
          label: 'FDACS — Moving companies',
          href: 'https://www.fdacs.gov/Business-Services/Moving-Companies',
        },
        {
          label: 'FDACS — Moving within Florida',
          href: 'https://www.fdacs.gov/Consumer-Resources/Consumer-Rights-and-Responsibilities/Moving-Within-Florida',
        },
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  };
}

function buildNewYork() {
  return {
    stateSlug: 'new-york',
    stateCode: 'NY',
    h1: 'New York Moving Resource Hub: Costs, NYSDOT Licensing & 62 County Guides',
    metaTitle:
      'New York Movers Guide 2026 — Costs, NYSDOT Licensing & 62 County Guides',
    metaDescription:
      'Plan a move within, to, or from New York. Compare local and intrastate costs, verify NYSDOT household goods authority, browse 62 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for New York moves in 2026 — typical costs, NYSDOT vs FMCSA rules, NYC-to-upstate regional guides, and tools to compare licensed movers without paid placements.',
    trustBar: [
      '62 County Guides',
      'Verified Movers',
      'NYSDOT & FMCSA Checked',
      'Updated 2026',
    ],
    intents: intents('New York', 'NY'),
    primaryCta: {
      label: 'Calculate My New York Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in New York is different',
      paragraphs: [
        'New York is not one moving market. NYC walk-ups and freight elevators, Long Island parkways, Hudson Valley estates, and upstate rural driveways produce different access, labor time, and soft costs under one state name.',
        'Intrastate household goods movers must hold authority from the New York State Department of Transportation (NYSDOT). Interstate jobs need FMCSA authority. Building COIs, alternate-side parking, winter weather, and co-op rules are planning inputs — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'New York moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical New York local and intrastate patterns; they are not bids. Always compare written estimates from NYSDOT-authorized movers for in-state work and FMCSA-authorized carriers for interstate work.',
      stats: [
        {
          label: 'Typical NYC studio / 1BR',
          value: '$700–$2,800+',
          note: 'Walk-ups, elevators, and parking dominate cost',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$2,000–$6,500+',
          note: 'Long Island / Westchester access varies',
        },
        {
          label: 'Intrastate corridor (e.g. NYC ↔ Albany)',
          value: '$2,500–$8,500+',
          note: 'Season and packing drive the spread',
        },
        {
          label: 'Peak season',
          value: 'May–September + month-end',
          note: 'NYC lease cycles intensify demand',
        },
        {
          label: 'Top outbound destinations',
          value: 'FL · NJ · PA · NC · TX · CT',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: '62',
          note: 'NYC, Long Island, and upstate coverage',
        },
      ],
    },
    regulations: {
      mode: 'strong_state_regulator',
      title: 'New York moving regulations & consumer protection',
      intro:
        'New York requires household goods movers operating within the state to be licensed by the New York State Department of Transportation (NYSDOT). Match authority to the job before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside New York)',
        body:
          'If origin or destination is outside New York, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. NYSDOT intrastate authority alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within New York)',
        body:
          'Moves within New York State generally require NYSDOT household goods moving authority. Consumers should verify licensing with NYSDOT (contact channels published by the Department) and insist on required consumer information materials, including the Summary of Information booklet describing shipper rights.',
      },
      verifySteps: [
        'Classify the job: entirely in New York (NYSDOT) vs any out-of-state leg (FMCSA / USDOT).',
        'Copy the exact legal name and NYDOT / USDOT numbers from the written estimate.',
        'Intrastate: verify the mover is licensed by NYSDOT before hiring.',
        'Interstate: look up USDOT / MC on FMCSA SAFER.',
        'Require an Order for Service with a clear dollar amount and keep copies of everything you sign.',
        'Make an inventory and understand released vs additional valuation coverage.',
      ],
      protections: [
        {
          title: 'Summary of Information booklet',
          detail:
            'NYSDOT expects movers to provide consumer information materials describing shipper rights. Ask for the Summary of Information booklet before you sign.',
        },
        {
          title: 'Order for Service',
          detail:
            'Before anything moves, ensure you have an Order for Service stating amounts due and key terms. Read it carefully and keep a copy.',
        },
        {
          title: 'Claims',
          detail:
            'File written claims for loss or damage with the mover promptly. Document condition with photos and inventories.',
        },
      ],
      officialLinks: [
        {
          label: 'NYSDOT — Moving (consumer guidance)',
          href: 'https://www.dot.ny.gov/divisions/operating/osss/truck/moving',
          external: true,
        },
        {
          label: 'NYSDOT — Registration & licensing',
          href: 'https://www.dot.ny.gov/divisions/operating/osss/truck/registration-licensing',
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
        'Licensing rules and verification processes can change. Always verify current NYSDOT authority or FMCSA status for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('new-york', [
      {
        key: 'nyc',
        id: 'nyc',
        name: 'New York City',
        shortName: 'NYC',
        blurb:
          'Five boroughs of walk-ups, freight elevators, COI rules, street permits, and high labor intensity.',
        challenges: [
          'Walk-ups, elevators, and COI windows',
          'Street parking and loading constraints',
        ],
        ctaLabel: 'Explore NYC boroughs',
      },
      {
        key: 'long-island',
        id: 'long-island',
        name: 'Long Island',
        shortName: 'Long Island',
        blurb:
          'Nassau and Suffolk parkways, suburban lots, barrier-beach access, and summer traffic.',
        challenges: [
          'Parkway congestion and bridge timing',
          'Seasonal beach-community access',
        ],
        ctaLabel: 'Explore Long Island',
      },
      {
        key: 'hudson-valley',
        id: 'hudson-valley',
        name: 'Lower Hudson Valley',
        shortName: 'Hudson Valley',
        blurb:
          'Westchester through the mid-Hudson: estates, older multi-story homes, and NYC-adjacent commuting patterns.',
        challenges: [
          'Older homes with tight stairs',
          'Commuter-corridor traffic peaks',
        ],
        ctaLabel: 'Explore Hudson Valley',
      },
      {
        key: 'capital-region',
        id: 'capital-region',
        name: 'Capital Region',
        shortName: 'Capital Region',
        blurb:
          'Albany–Schenectady–Troy government and university calendars with surrounding suburban and rural lots.',
        challenges: [
          'Winter weather windows',
          'Mix of urban and rural access',
        ],
        ctaLabel: 'Explore Capital Region',
      },
      {
        key: 'western-ny',
        id: 'western-ny',
        name: 'Western New York',
        shortName: 'Western NY',
        blurb:
          'Buffalo–Niagara lake-effect weather, older housing stock, and industrial-edge logistics.',
        challenges: [
          'Lake-effect snow planning',
          'Older multi-story homes',
        ],
        ctaLabel: 'Explore Western NY',
      },
      {
        key: 'finger-lakes',
        id: 'finger-lakes',
        name: 'Rochester & Finger Lakes',
        shortName: 'Finger Lakes',
        blurb:
          'Rochester metro plus lake-country towns with mixed suburban and rural driveway access.',
        challenges: [
          'Winter weather',
          'Longer regional hauls between towns',
        ],
        ctaLabel: 'Explore Finger Lakes',
      },
      {
        key: 'central-ny',
        id: 'central-ny',
        name: 'Central New York',
        shortName: 'Central NY',
        blurb:
          'Syracuse and surrounding counties with university calendars and mixed urban/rural stock.',
        challenges: [
          'Snow and ice access',
          'Thinner coverage outside the metro',
        ],
        ctaLabel: 'Explore Central NY',
      },
      {
        key: 'north-country',
        id: 'north-country',
        name: 'North Country',
        shortName: 'North Country',
        blurb:
          'Adirondack and northern border counties with rural driveways, tourism seasonality, and weather exposure.',
        challenges: [
          'Rural mountain access',
          'Seasonal road and weather constraints',
        ],
        ctaLabel: 'Explore North Country',
      },
      {
        key: 'rest-ny',
        id: 'rest-ny',
        name: 'Southern Tier & Remaining Counties',
        shortName: 'Southern Tier+',
        blurb:
          'Remaining counties including Southern Tier communities with smaller metros and rural approaches.',
        challenges: [
          'Longer crew travel times',
          'Rural driveway access',
        ],
        ctaLabel: 'Explore remaining NY counties',
      },
    ]),
    costs: {
      title: 'New York moving costs',
      intro:
        'New York pricing reflects NYC labor intensity, building accessorials, Long Island/Westchester suburban patterns, and winter productivity. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate New York moving costs',
        lastReviewed: '2026-07-22',
        body:
          'These ranges are planning estimates, not quotes. They combine typical New York local and intrastate patterns: home size, distance, walk-ups/elevators, parking, co-op/HOA rules, seasonality, and regional labor. Actual bids vary. Always compare written estimates from NYSDOT-authorized movers for in-state work and FMCSA-authorized carriers for interstate work.',
      },
      ranges: [
        {
          label: 'NYC studio / 1BR (walk-up or elevator)',
          value: '$700–$2,800+',
          note: 'Flights of stairs and COI dominate',
        },
        {
          label: 'Suburban 2–3BR (LI / Westchester)',
          value: '$1,800–$5,000+',
          note: 'Driveway access still varies',
        },
        {
          label: 'Intrastate mid-size (e.g. NYC ↔ Hudson Valley)',
          value: '$2,200–$7,000+',
          note: 'Season and packing matter',
        },
        {
          label: 'Intrastate long (e.g. NYC ↔ Buffalo)',
          value: '$3,000–$9,500+',
          note: 'Full packing pushes the top',
        },
        {
          label: 'Typical 2–3 person crew (downstate)',
          value: '$150–$280+/hr',
          note: 'Portal-to-portal; access drives hours',
        },
      ],
      factors: [
        'NYC walk-ups and freight elevators add substantial labor time.',
        'Building COI and move windows are common in multi-unit properties.',
        'Street parking rules and permits can force long carries.',
        'Winter weather affects upstate pacing and scheduling.',
        'Peak lease cycles and summer weekends fill crews early.',
      ],
    },
    routes: {
      title: 'Popular New York moving routes',
      intro:
        'New York is a major outbound origin (especially from NYC metro) and has large internal NYC–upstate flows. Interstate jobs need FMCSA authority; in-state corridors need NYSDOT-authorized movers.',
      migrationProfile: 'outbound_dominant',
      outbound: [
        {
          label: 'New York → Florida',
          href: '/moving-to/florida',
          origins: 'NYC, Long Island, Lower Hudson',
          transit: 'Multi-day; strong snowbird seasonality',
          planningNote: 'Book early for fall/winter coastal FL arrivals.',
          note: 'One of the highest-volume outbound lanes from the Northeast.',
        },
        {
          label: 'New York → New Jersey / Pennsylvania',
          href: '/moving-to/new-jersey',
          origins: 'NYC, Westchester, Long Island',
          transit: 'Often same-day or next-day interstate',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Common cross-Hudson and I-80 corridor moves.',
        },
        {
          label: 'New York → North Carolina / South',
          href: '/moving-to/north-carolina',
          origins: 'NYC metro, Upstate',
          transit: 'Multi-day I-95 corridor',
          planningNote: 'Inventory size and elevator origins drive cost.',
          note: 'Popular lifestyle outbound destinations.',
        },
      ],
      inbound: [
        {
          label: 'Moving to New York County (Manhattan)',
          href: '/local-movers/new-york/new-york',
          note: 'Elevators, COI, and street logistics dominate.',
        },
        {
          label: 'Moving to Kings County (Brooklyn)',
          href: '/local-movers/new-york/kings',
          note: 'Walk-ups and tight street staging are common.',
        },
        {
          label: 'Moving to Westchester County',
          href: '/local-movers/new-york/westchester',
          note: 'Suburban lots with NYC-adjacent traffic patterns.',
        },
      ],
    },
    challenges: {
      title: 'New York-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real New York moves — not generic national checklist filler.',
      items: [
        {
          title: 'Walk-ups and elevator reservations',
          detail:
            'NYC and dense multi-unit buildings often need reserved elevators, padding, and COI certificates. Confirm windows before you book.',
        },
        {
          title: 'Street parking and loading rules',
          detail:
            'Alternate-side rules, hydrants, and limited curb space can force long carries or permits. Plan staging early.',
        },
        {
          title: 'Co-op and condo board requirements',
          detail:
            'Many buildings require certificates of insurance, certificates of good standing, and fixed move hours. Incomplete paperwork delays crews.',
        },
        {
          title: 'Winter weather (especially upstate)',
          detail:
            'Snow and ice change driveway access and pacing. Build weather buffer into schedules north and west of NYC.',
        },
        {
          title: 'Parkway and bridge congestion',
          detail:
            'Long Island and Hudson crossings can double portal-to-portal time at peak. Prefer mid-week mornings.',
        },
        {
          title: 'Rural upstate access',
          detail:
            'North Country and rural counties may involve long driveways and thinner crew coverage — confirm the mover serves your exact address.',
        },
      ],
    },
    tools: SHARED_TOOLS('New York'),
    faq: [
      {
        question: 'How are movers regulated in New York?',
        answer:
          'Intrastate household goods movers generally need authority from the New York State Department of Transportation (NYSDOT). Interstate moves require federal FMCSA operating authority and a USDOT number. Confirm which framework applies to your exact origin and destination.',
      },
      {
        question: 'How do I verify a New York mover is licensed?',
        answer:
          'Verify NYSDOT licensing using Department guidance and contact channels for household goods movers. For interstate work, check FMCSA SAFER for USDOT / MC status. Match the legal name on your estimate to official records before paying a deposit.',
      },
      {
        question: 'What documents should I receive before a New York move?',
        answer:
          'Ask for consumer information materials (including the Summary of Information booklet), a written estimate, and an Order for Service with clear amounts. Keep copies of everything you sign and create your own inventory.',
      },
      {
        question: 'When is the best time to move in New York?',
        answer:
          'Demand peaks late spring through early fall and around month-end NYC lease cycles. Mid-week mornings are often easier for elevators and street loading. Upstate winter weather can force flexible dates.',
      },
      {
        question: 'Why are NYC moves so expensive?',
        answer:
          'Labor intensity from stairs, elevators, long carries, COI windows, and limited truck staging drives hours up even for short distances. Access often matters more than miles.',
      },
      {
        question: 'Is a NYSDOT license enough for a move to Florida?',
        answer:
          'No. Crossing state lines generally requires FMCSA interstate authority. NYSDOT authority covers intrastate New York household goods operations — not interstate operating authority.',
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
          label: 'NYSDOT — Moving',
          href: 'https://www.dot.ny.gov/divisions/operating/osss/truck/moving',
        },
        {
          label: 'NYSDOT — Registration & licensing',
          href: 'https://www.dot.ny.gov/divisions/operating/osss/truck/registration-licensing',
        },
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  };
}

function buildGeorgia() {
  return {
    stateSlug: 'georgia',
    stateCode: 'GA',
    h1: 'Georgia Moving Resource Hub: Costs, DPS Household Goods Rules & 159 County Guides',
    metaTitle:
      'Georgia Movers Guide 2026 — Costs, DPS Licensing & 159 County Guides',
    metaDescription:
      'Plan a move within, to, or from Georgia. Compare local and intrastate costs, verify Georgia DPS household goods certification, browse 159 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for Georgia moves in 2026 — typical costs, DPS household goods rules vs FMCSA, Atlanta-to-coastal regional guides, and tools to compare certified movers without paid placements.',
    trustBar: [
      '159 County Guides',
      'Verified Movers',
      'GA DPS & FMCSA Checked',
      'Updated 2026',
    ],
    intents: intents('Georgia', 'GA'),
    primaryCta: {
      label: 'Calculate My Georgia Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in Georgia is different',
      paragraphs: [
        'Georgia is not one moving market. Metro Atlanta HOAs and freeways, North Georgia mountain approaches, Savannah humidity and historic districts, and rural South Georgia driveways produce different access and labor profiles under one state name.',
        'Intrastate household goods movers must be certified by the Georgia Department of Public Safety (DPS) Motor Carrier Compliance Division. Interstate jobs need FMCSA authority. Summer heat, pollen-season calendars, and HOA rules are planning inputs — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'Georgia moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical Georgia local and intrastate patterns; they are not bids. Always compare written estimates from DPS-certified movers for in-state work and FMCSA-authorized carriers for interstate work.',
      stats: [
        {
          label: 'Typical local move (studio–2BR)',
          value: '$450–$2,000+',
          note: 'Atlanta elevators/HOAs push higher',
        },
        {
          label: 'Typical local move (3–4+ BR)',
          value: '$1,600–$5,200+',
          note: 'Suburban long carries common',
        },
        {
          label: 'Intrastate corridor (e.g. Atlanta ↔ Savannah)',
          value: '$2,000–$6,500+',
          note: 'Season and packing drive the spread',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'Heat + school calendars',
        },
        {
          label: 'Top inbound origins',
          value: 'NY · FL · CA · TX · NC',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: '159',
          note: 'Metro Atlanta emphasized',
        },
      ],
    },
    regulations: {
      mode: 'strong_state_regulator',
      title: 'Georgia moving regulations & consumer protection',
      intro:
        'Georgia requires household goods movers operating in the state to hold certification from the Georgia Department of Public Safety (DPS) Motor Carrier Compliance Division. Match certification to the job before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside Georgia)',
        body:
          'If origin or destination is outside Georgia, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. Georgia DPS household goods certification alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within Georgia)',
        body:
          'Intrastate household goods movers must obtain required DPS household goods certification / Certificate of Public Convenience and Necessity processes administered through Georgia Motor Carrier Compliance. Consumers can review licensed mover listings and DPS household goods resources on official gamccd.net pages.',
      },
      verifySteps: [
        'Classify the job: entirely in Georgia (DPS HHG) vs any out-of-state leg (FMCSA / USDOT).',
        'Copy the exact legal name from the written estimate.',
        'Intrastate: verify the mover appears on Georgia DPS licensed household goods mover resources / portals.',
        'Interstate: look up USDOT / MC on FMCSA SAFER.',
        'Get written estimates, clarify tariff/accessorial rules, and keep contracts.',
        'Avoid large cash deposits to unverified operators.',
      ],
      protections: [
        {
          title: 'Certification requirement',
          detail:
            'Georgia Attorney General consumer guidance notes movers must hold a Certificate of Public Convenience and Necessity and that DPS enforces intrastate household goods rules and tariffs.',
        },
        {
          title: 'Written estimates',
          detail:
            'Insist on written estimates and clear accessorial pricing (stairs, long carry, packing, storage).',
        },
        {
          title: 'Complaints',
          detail:
            'DPS household goods enforcement and consumer resources may assist for in-state issues; interstate issues may involve FMCSA.',
        },
      ],
      officialLinks: [
        {
          label: 'Georgia DPS — Household Goods',
          href: 'https://gamccd.net/HouseholdGoods.aspx',
          external: true,
        },
        {
          label: 'Georgia AG — Moving companies consumer topic',
          href: 'https://consumer.georgia.gov/consumer-topics/moving-companies',
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
        'Licensing rules and directories can change. Always verify current DPS household goods certification or FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('georgia', [
      {
        key: 'metro-atlanta',
        id: 'metro-atlanta',
        name: 'Metro Atlanta',
        shortName: 'Metro Atlanta',
        blurb:
          'Perimeter freeways, HOA-heavy suburbs, mid-rises, and high-volume corporate and family moves across core metro counties.',
        challenges: [
          'I-75 / I-85 / I-285 congestion',
          'HOA windows and new-construction access',
        ],
        ctaLabel: 'Explore Metro Atlanta',
      },
      {
        key: 'north-georgia',
        id: 'north-georgia',
        name: 'North Georgia',
        shortName: 'North GA',
        blurb:
          'Mountain approaches, tourism towns, and mixed suburban/rural lots north of Atlanta.',
        challenges: [
          'Hill and mountain driveway access',
          'Seasonal tourism traffic',
        ],
        ctaLabel: 'Explore North Georgia',
      },
      {
        key: 'coastal-ga',
        id: 'coastal-ga',
        name: 'Coastal Georgia',
        shortName: 'Coastal GA',
        blurb:
          'Savannah historic districts, humidity, and coastal access across Chatham and neighboring counties.',
        challenges: [
          'Historic district staging limits',
          'Humidity and storm-season flexibility',
        ],
        ctaLabel: 'Explore Coastal Georgia',
      },
      {
        key: 'middle-ga',
        id: 'middle-ga',
        name: 'Middle Georgia',
        shortName: 'Middle GA',
        blurb:
          'Macon and central corridors with mixed small-metro and rural patterns between Atlanta and South Georgia.',
        challenges: [
          'Longer regional hauls',
          'Heat and thinner local coverage',
        ],
        ctaLabel: 'Explore Middle Georgia',
      },
      {
        key: 'augusta-east',
        id: 'augusta-east',
        name: 'Augusta & East Georgia',
        shortName: 'Augusta / East',
        blurb:
          'Augusta metro and eastern counties with medical, military, and river-adjacent patterns.',
        challenges: [
          'Heat and humidity',
          'Cross-state proximity logistics (SC border context)',
        ],
        ctaLabel: 'Explore Augusta / East',
      },
      {
        key: 'southwest-ga',
        id: 'southwest-ga',
        name: 'Southwest & South Georgia',
        shortName: 'SW / South GA',
        blurb:
          'Albany, Valdosta, and agricultural counties with rural driveways and longer crew travel times.',
        challenges: [
          'Rural access and thin coverage',
          'Long distances between towns',
        ],
        ctaLabel: 'Explore South Georgia',
      },
      {
        key: 'rest-georgia',
        id: 'rest-georgia',
        name: 'Other Georgia Counties',
        shortName: 'Rest of GA',
        blurb:
          'Remaining counties outside the primary metro and coastal groupings — small towns and rural lots statewide.',
        challenges: [
          'Confirm mover coverage for remote addresses',
          'Long driveway and farm-adjacent access',
        ],
        ctaLabel: 'Explore remaining counties',
      },
    ]),
    costs: {
      title: 'Georgia moving costs',
      intro:
        'Georgia pricing reflects Atlanta metro labor and HOAs, coastal humidity accessorials, heat, and long rural distances. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate Georgia moving costs',
        lastReviewed: '2026-07-22',
        body:
          'These ranges are planning estimates, not quotes. They combine typical Georgia local and intrastate patterns: home size, distance, HOAs, stairs/long carries, seasonality, and regional labor. Actual bids vary. Always compare written estimates from DPS-certified movers for in-state work and FMCSA-authorized carriers for interstate work.',
      },
      ranges: [
        {
          label: 'Local studio / 1BR',
          value: '$450–$1,600+',
          note: 'Elevators/HOAs push higher in Atlanta',
        },
        {
          label: 'Local 2–3BR house',
          value: '$1,400–$4,200+',
          note: 'Suburban long carries common',
        },
        {
          label: 'Intrastate mid-size (e.g. Atlanta ↔ Macon)',
          value: '$1,600–$5,000+',
          note: 'Season matters',
        },
        {
          label: 'Intrastate long (e.g. Atlanta ↔ Savannah)',
          value: '$2,000–$6,500+',
          note: 'Full packing pushes the top',
        },
        {
          label: 'Typical 2-person crew (Atlanta metro)',
          value: '$120–$200+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'Metro Atlanta HOAs and freeway time add soft costs and hours.',
        'Summer heat favors early starts statewide.',
        'Coastal historic districts can limit truck staging.',
        'Rural South Georgia jobs may include significant crew travel time.',
        'Peak school-year and end-of-month weekends fill crews early.',
      ],
    },
    routes: {
      title: 'Popular Georgia moving routes',
      intro:
        'Georgia is a major Southeast hub with strong Atlanta inbound/outbound flows and Florida–Carolinas corridors. Interstate jobs need FMCSA authority; in-state corridors need DPS-certified household goods movers.',
      migrationProfile: 'balanced',
      outbound: [
        {
          label: 'Georgia → Florida',
          href: '/moving-to/florida',
          origins: 'Atlanta, Savannah, South Georgia',
          transit: 'Often 1–2 day interstate',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'High-volume Southeast corridor.',
        },
        {
          label: 'Georgia → Carolinas',
          href: '/moving-to/north-carolina',
          origins: 'Atlanta, North Georgia',
          transit: 'I-85 / I-95 corridors',
          planningNote: 'HOAs at destination common.',
          note: 'Common lifestyle and job-driven moves.',
        },
        {
          label: 'Georgia → Texas',
          href: '/moving-to/texas',
          origins: 'Atlanta metro',
          transit: 'Multi-day',
          planningNote: 'Large inventories and heat planning.',
          note: 'Growing long-haul outbound lane.',
        },
      ],
      inbound: [
        {
          label: 'Northeast / Midwest → Atlanta',
          href: '/local-movers/georgia/fulton',
          note: 'Corporate and family inbound into Metro Atlanta.',
        },
        {
          label: 'Moving to Fulton County',
          href: '/local-movers/georgia/fulton',
          note: 'Core Atlanta access and multi-unit rules.',
        },
        {
          label: 'Moving to Chatham County (Savannah)',
          href: '/local-movers/georgia/chatham',
          note: 'Historic district staging and humidity.',
        },
      ],
    },
    challenges: {
      title: 'Georgia-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real Georgia moves — not generic national checklist filler.',
      items: [
        {
          title: 'Metro Atlanta traffic',
          detail:
            'I-75/I-85/I-285 peaks inflate portal-to-portal time. Prefer mid-week mornings and honest travel assumptions on estimates.',
        },
        {
          title: 'HOA-heavy suburbs',
          detail:
            'Many Atlanta-area communities require COI, approved hours, and gate lists. Collect packets early.',
        },
        {
          title: 'Summer heat and humidity',
          detail:
            'Early starts protect crews and belongings. Coastal humidity adds handling considerations for wood and electronics.',
        },
        {
          title: 'Historic district access (Savannah and others)',
          detail:
            'Narrow streets and limited staging can force smaller trucks or longer carries.',
        },
        {
          title: 'North Georgia terrain',
          detail:
            'Mountain and hill driveways may need smaller trucks or shuttle strategies.',
        },
        {
          title: 'Rural coverage gaps',
          detail:
            'South Georgia and remote counties may require regional crews — confirm service to your exact address and travel fees.',
        },
      ],
    },
    tools: SHARED_TOOLS('Georgia'),
    faq: [
      {
        question: 'How are movers regulated in Georgia?',
        answer:
          'Intrastate household goods movers must be certified through the Georgia Department of Public Safety Motor Carrier Compliance Division (household goods certification / CPCN framework). Interstate moves require federal FMCSA operating authority and a USDOT number. Verify the correct authority for your exact origin and destination.',
      },
      {
        question: 'How do I verify a Georgia mover is certified?',
        answer:
          'Use Georgia DPS household goods resources and licensed mover listings/portals (gamccd.net). For interstate work, also verify USDOT / MC on FMCSA SAFER. Match the legal name on your estimate to official records before paying a deposit.',
      },
      {
        question: 'When is the best time to move in Georgia?',
        answer:
          'Demand peaks late spring through early fall and around school calendars. Mid-week mornings outside peak summer heat are often easier. Coastal storm season can require flexible dates.',
      },
      {
        question: 'Why do Atlanta moves cost more than rural Georgia moves?',
        answer:
          'Metro labor rates, HOA soft costs, elevators, and freeway portal-to-portal time increase hours. Rural jobs may be cheaper per hour but add travel time if crews come from outside the county.',
      },
      {
        question: 'Do I need different movers for local vs interstate Georgia moves?',
        answer:
          'Not always, but the license must match the job. DPS household goods certification for intrastate work is not a substitute for FMCSA interstate authority.',
      },
      {
        question: 'What should I check before hiring any Georgia mover?',
        answer:
          'Active DPS certification for in-state work (or FMCSA for interstate), written estimate, insurance/valuation clarity, and references. Avoid large cash deposits to unverified operators.',
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
          label: 'Georgia DPS — Household Goods',
          href: 'https://gamccd.net/HouseholdGoods.aspx',
        },
        {
          label: 'Georgia AG — Moving companies',
          href: 'https://consumer.georgia.gov/consumer-topics/moving-companies',
        },
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  };
}

function buildArizona() {
  return {
    stateSlug: 'arizona',
    stateCode: 'AZ',
    h1: 'Arizona Moving Resource Hub: Costs, Consumer Checks & 15 County Guides',
    metaTitle:
      'Arizona Movers Guide 2026 — Costs, Licensing Reality & 15 County Guides',
    metaDescription:
      'Plan a move within, to, or from Arizona. Compare local costs, understand Arizona’s limited state HHG licensing posture, verify FMCSA for interstate work, browse 15 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for Arizona moves in 2026 — desert heat logistics, Phoenix and Tucson metro guides, consumer verification steps, and tools to compare movers without paid placements.',
    trustBar: [
      '15 County Guides',
      'Verified Movers',
      'FMCSA for Interstate',
      'Updated 2026',
    ],
    intents: intents('Arizona', 'AZ'),
    primaryCta: {
      label: 'Calculate My Arizona Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in Arizona is different',
      paragraphs: [
        'Arizona is not one moving market. Phoenix HOA tracts and summer heat, Tucson mountain-edge lots, Northern Arizona elevation and winter weather, and long desert highway hauls produce different access and labor profiles under one state name.',
        'Arizona does not operate a California-style statewide household goods mover permit system for all intrastate moves. Consumers should still verify business registration, insurance, reviews, and — for any interstate leg — FMCSA authority. Heat, monsoons, and HOA rules are first-class planning inputs.',
      ],
    },
    snapshot: {
      title: 'Arizona moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical Arizona local and regional patterns; they are not bids. Always compare written estimates and verify insurance and (for interstate) FMCSA authority.',
      stats: [
        {
          label: 'Typical local move (studio–2BR)',
          value: '$450–$2,000+',
          note: 'Heat-day pacing and HOAs push higher',
        },
        {
          label: 'Typical local move (3–4+ BR)',
          value: '$1,600–$5,000+',
          note: 'Large Phoenix-area homes common',
        },
        {
          label: 'Intrastate corridor (e.g. Phoenix ↔ Tucson)',
          value: '$1,500–$5,500+',
          note: 'Season and packing drive the spread',
        },
        {
          label: 'Peak season',
          value: 'Oct–Apr (snowbirds) + summer leases',
          note: 'Extreme summer heat favors early starts',
        },
        {
          label: 'Top inbound origins',
          value: 'CA · WA · CO · IL · NY',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: '15',
          note: 'Maricopa and Pima dominate volume',
        },
      ],
    },
    regulations: {
      mode: 'limited_or_none',
      title: 'Arizona moving regulations & consumer protection',
      intro:
        'Arizona does not require a specialized statewide household goods mover license comparable to California BHGS or Texas TxDMV certificates for all intrastate moves. That does not mean “no rules” — business registration, insurance, local requirements, and federal interstate rules still matter.',
      interstate: {
        title: 'Interstate (any leg outside Arizona)',
        body:
          'If origin or destination is outside Arizona, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER and FMCSA Protect Your Move resources before you deposit money.',
      },
      intrastate: {
        title: 'Intrastate (entirely within Arizona)',
        body:
          'Arizona is widely treated as having limited state-level household goods mover permitting. Arizona Department of Public Safety materials emphasize complaint investigation and safety enforcement in the household goods space, and consumers are commonly directed to verify business registration (e.g., Arizona Corporation Commission entity search) and to use careful consumer diligence. Always confirm current requirements for your city and mover type.',
      },
      verifySteps: [
        'Classify the job: entirely in Arizona vs any out-of-state leg (FMCSA / USDOT required for interstate).',
        'Verify the company is a registered business (Arizona Corporation Commission entity search is a common check).',
        'For interstate moves, look up USDOT / MC on FMCSA SAFER and review Protect Your Move guidance.',
        'Demand written estimates, proof of insurance, and clear valuation terms.',
        'Check complaint history and avoid large cash deposits to unknown operators.',
        'Document inventory and condition with photos before load day.',
      ],
      protections: [
        {
          title: 'Business registration checks',
          detail:
            'Because Arizona lacks a universal HHG permit lookup like some states, confirming the business entity and insurance is especially important.',
        },
        {
          title: 'Written estimates',
          detail:
            'Insist on written estimates and clarity on stairs, long carries, packing, and storage. Verbal-only quotes are a red flag.',
        },
        {
          title: 'Interstate consumer booklets',
          detail:
            'For interstate moves, FMCSA requires specific consumer disclosures (including rights-and-responsibilities materials). Ask for them.',
        },
      ],
      officialLinks: [
        {
          label: 'Arizona DPS — Household goods information',
          href: 'https://www.azdps.gov/content/basic-page/94/hhg',
          external: true,
        },
        {
          label: 'Arizona Corporation Commission entity search',
          href: 'https://ecorp.azcc.gov/EntitySearch/Index',
          external: true,
        },
        {
          label: 'FMCSA Protect Your Move',
          href: 'https://www.fmcsa.dot.gov/protect-your-move',
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
        'Arizona’s regulatory posture for intrastate household goods movers can be easy to misstate online. Always verify current requirements with official Arizona agencies and, for interstate moves, FMCSA. This page is educational, not legal advice.',
    },
    regions: regionObjects('arizona', [
      {
        key: 'phoenix-metro',
        id: 'phoenix-metro',
        name: 'Phoenix Metro',
        shortName: 'Phoenix',
        blurb:
          'Maricopa and Pinal growth corridors, HOA tracts, summer heat logistics, and high-volume family and snowbird moves.',
        challenges: [
          'Extreme summer heat windows',
          'HOA rules in master-planned communities',
        ],
        ctaLabel: 'Explore Phoenix metro',
      },
      {
        key: 'tucson-south',
        id: 'tucson-south',
        name: 'Tucson & Southern Arizona',
        shortName: 'Tucson / South',
        blurb:
          'Pima metro plus border-region counties with mountain-edge lots and desert highway approaches.',
        challenges: [
          'Heat and monsoon timing',
          'Mountain-edge driveway access',
        ],
        ctaLabel: 'Explore Tucson / South',
      },
      {
        key: 'northern-az',
        id: 'northern-az',
        name: 'Northern Arizona',
        shortName: 'Northern AZ',
        blurb:
          'Flagstaff elevation, high-country weather, and tourism towns across Coconino, Yavapai, and the northern counties.',
        challenges: [
          'Winter weather and elevation',
          'Long distances between towns',
        ],
        ctaLabel: 'Explore Northern Arizona',
      },
      {
        key: 'western-rural',
        id: 'western-rural',
        name: 'Western & Rural Arizona',
        shortName: 'West / Rural',
        blurb:
          'Yuma agriculture and winter visitors, river communities, and rural counties with thinner crew coverage.',
        challenges: [
          'Seasonal population swings',
          'Confirm mover coverage for remote addresses',
        ],
        ctaLabel: 'Explore West / Rural Arizona',
      },
    ]),
    costs: {
      title: 'Arizona moving costs',
      intro:
        'Arizona pricing reflects Phoenix metro labor and HOAs, extreme heat productivity, monsoon flexibility, and long desert highway hauls. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate Arizona moving costs',
        lastReviewed: '2026-07-22',
        body:
          'These ranges are planning estimates, not quotes. They combine typical Arizona local and regional patterns: home size, distance, HOAs, heat-day labor, and access. Actual bids vary. For interstate moves, always verify FMCSA authority. For local moves, emphasize written estimates, insurance, and business legitimacy checks.',
      },
      ranges: [
        {
          label: 'Local studio / 1BR',
          value: '$450–$1,600+',
          note: 'HOAs and heat pacing push higher',
        },
        {
          label: 'Local 2–3BR house',
          value: '$1,400–$4,200+',
          note: 'Large Phoenix-area homes common',
        },
        {
          label: 'Intrastate mid-size (Phoenix ↔ Tucson)',
          value: '$1,500–$5,000+',
          note: 'Season matters',
        },
        {
          label: 'Intrastate long (Phoenix ↔ Flagstaff)',
          value: '$1,800–$5,500+',
          note: 'Elevation and weather at destination',
        },
        {
          label: 'Typical 2-person crew (Phoenix metro)',
          value: '$120–$200+/hr',
          note: 'Portal-to-portal; early starts in summer',
        },
      ],
      factors: [
        'Summer heat makes early starts essential and can slow multi-story jobs.',
        'HOA move windows are common in master-planned Phoenix-area communities.',
        'Monsoon storms can force same-day reschedules.',
        'Long desert highways add portal-to-portal time between metros.',
        'Snowbird season increases demand in many markets from fall through spring.',
      ],
    },
    routes: {
      title: 'Popular Arizona moving routes',
      intro:
        'Arizona is a major inbound destination from California and colder states, with strong Phoenix-centric internal flows. Interstate jobs need FMCSA authority.',
      migrationProfile: 'inbound_dominant',
      outbound: [
        {
          label: 'Arizona → California',
          href: '/local-movers/california',
          origins: 'Phoenix, Tucson',
          transit: 'Often 1–2 day I-10 corridor',
          planningNote: 'Confirm FMCSA authority; CA intrastate second hops need BHGS.',
          note: 'Common bi-directional Southwest corridor.',
        },
        {
          label: 'Arizona → Colorado / Utah',
          href: '/moving-to/colorado',
          origins: 'Phoenix metro',
          transit: 'Multi-day; elevation at destination',
          planningNote: 'Weather windows matter in winter.',
          note: 'Lifestyle outbound lanes from the Valley.',
        },
      ],
      inbound: [
        {
          label: 'California → Arizona',
          href: '/local-movers/arizona/maricopa',
          origins: 'Southern California, Bay Area',
          transit: 'I-10 / I-8 corridors',
          planningNote: 'One of the highest-volume inbound lanes into Maricopa County.',
          note: 'Confirm interstate FMCSA authority.',
        },
        {
          label: 'Moving to Maricopa County (Phoenix)',
          href: '/local-movers/arizona/maricopa',
          note: 'HOAs, heat, and large suburban homes.',
        },
        {
          label: 'Moving to Pima County (Tucson)',
          href: '/local-movers/arizona/pima',
          note: 'Desert heat and mountain-edge access.',
        },
      ],
    },
    challenges: {
      title: 'Arizona-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real Arizona moves — not generic national checklist filler.',
      items: [
        {
          title: 'Extreme summer heat',
          detail:
            'Late spring through early fall, schedule early morning loads. Heat affects crew pacing, electronics protection, and pet safety.',
        },
        {
          title: 'Monsoon storms',
          detail:
            'Summer storms can flood streets and pause outdoor work. Build flexible dates into contracts when possible.',
        },
        {
          title: 'HOA-heavy Valley suburbs',
          detail:
            'Many Phoenix-area communities require COI, approved hours, and parking rules. Get the packet before move day.',
        },
        {
          title: 'Elevation changes (Flagstaff and high country)',
          detail:
            'Northern Arizona winters and elevation can affect truck access and scheduling compared with desert floors.',
        },
        {
          title: 'Long desert distances',
          detail:
            'Phoenix–Tucson or Valley–Yuma runs need honest portal-to-portal assumptions and hydration/heat planning.',
        },
        {
          title: 'Consumer diligence without a universal HHG permit',
          detail:
            'Because Arizona lacks a CA/TX-style universal mover certificate for all intrastate moves, emphasize written estimates, insurance proof, business registration, and FMCSA checks for interstate work.',
        },
      ],
    },
    tools: SHARED_TOOLS('Arizona'),
    faq: [
      {
        question: 'Does Arizona require a special license for local movers?',
        answer:
          'Arizona does not use a California- or Texas-style statewide household goods mover permit for all intrastate moves. Consumers should still verify business registration, insurance, written estimates, and — for interstate moves — FMCSA authority. Always confirm current requirements with official Arizona sources.',
      },
      {
        question: 'How do I verify a mover for an Arizona interstate move?',
        answer:
          'Look up the USDOT or MC number on FMCSA SAFER and review FMCSA Protect Your Move guidance. Match the legal name on your estimate to the federal record before paying a deposit.',
      },
      {
        question: 'When is the best time to move in Arizona?',
        answer:
          'Many people prefer fall through spring to avoid extreme heat, but snowbird season can tighten coastal and Valley calendars. In summer, book early-morning windows and plan for heat delays.',
      },
      {
        question: 'Why do Phoenix moves cost more on some days?',
        answer:
          'Heat pacing, HOA windows, large single-family inventories, and end-of-month demand all increase labor hours. Access and timing often matter as much as distance.',
      },
      {
        question: 'What should I watch for when hiring any Arizona mover?',
        answer:
          'Written estimates only, proof of insurance, clear valuation terms, verifiable business identity, and FMCSA authority for interstate work. Avoid large cash deposits to unknown operators.',
      },
      {
        question: 'Do HOAs affect Arizona moves?',
        answer:
          'Yes — especially in Maricopa County master-planned communities. Confirm COI requirements, approved hours, and parking rules before move day.',
      },
    ],
    trust: {
      byline: 'Curated by the Move Trust Hub editorial team',
      lastReviewed: '2026-07-22',
      methodology:
        'County guides combine public records checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids. Arizona regulation language is intentionally conservative because the state does not mirror CA/TX permit models.',
      independence:
        'Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.',
      sources: [
        {
          label: 'Arizona DPS — Household goods info',
          href: 'https://www.azdps.gov/content/basic-page/94/hhg',
        },
        {
          label: 'Arizona Corporation Commission entity search',
          href: 'https://ecorp.azcc.gov/EntitySearch/Index',
        },
        {
          label: 'FMCSA Protect Your Move',
          href: 'https://www.fmcsa.dot.gov/protect-your-move',
        },
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  };
}

function toTs(varName, pack) {
  return `import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 1):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: ${pack.routes.migrationProfile}
 * - Regulation mode: ${pack.regulations.mode}
 */
export const ${varName}: StateResourceHubPack = ${JSON.stringify(pack, null, 2)};
`;
}

const fileMap = [
  ['texas', 'texasStateResourceHub', packs.texas],
  ['florida', 'floridaStateResourceHub', packs.florida],
  ['new-york', 'newYorkStateResourceHub', packs['new-york']],
  ['georgia', 'georgiaStateResourceHub', packs.georgia],
  ['arizona', 'arizonaStateResourceHub', packs.arizona],
];

for (const [file, varName, pack] of fileMap) {
  // Quality gate: region membership
  const all = new Set(Object.values(regions[file]).flat());
  // regions json keys match state slug
  const reg = regions[file];
  const seen = new Set();
  let dups = 0;
  for (const r of pack.regions) {
    for (const s of r.countySlugs) {
      if (seen.has(s)) dups++;
      seen.add(s);
    }
  }
  console.log(file, 'counties in pack regions', seen.size, 'dups', dups, 'mode', pack.regulations.mode, 'migration', pack.routes.migrationProfile);
  if (dups) throw new Error('duplicate counties in ' + file);
  writeFileSync(
    `lib/local-movers/state-resource-hub/${file}.ts`,
    toTs(varName, pack)
  );
  console.log('wrote', file);
}

writeFileSync(
  'lib/local-movers/state-resource-hub/registry.ts',
  `import { arizonaStateResourceHub } from '@/lib/local-movers/state-resource-hub/arizona';
import { californiaStateResourceHub } from '@/lib/local-movers/state-resource-hub/california';
import { floridaStateResourceHub } from '@/lib/local-movers/state-resource-hub/florida';
import { georgiaStateResourceHub } from '@/lib/local-movers/state-resource-hub/georgia';
import { newYorkStateResourceHub } from '@/lib/local-movers/state-resource-hub/new-york';
import { texasStateResourceHub } from '@/lib/local-movers/state-resource-hub/texas';
import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

const PACKS: StateResourceHubPack[] = [
  arizonaStateResourceHub,
  californiaStateResourceHub,
  floridaStateResourceHub,
  georgiaStateResourceHub,
  newYorkStateResourceHub,
  texasStateResourceHub,
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
console.log('registry updated');
