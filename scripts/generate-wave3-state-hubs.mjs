/**
 * Wave 3 State Resource Hubs: CO, VA, MI, NJ, TN
 * Run: node scripts/generate-wave3-state-hubs.mjs
 *
 * Prerequisites: scripts/tmp-wave3-regions.json (0 orphans / 0 duplicates)
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs';

const regions = JSON.parse(readFileSync('scripts/tmp-wave3-regions.json', 'utf8'));

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
 * Research brief (Wave 3):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: ${pack.routes.migrationProfile}
 * - Regulation mode: ${pack.regulations.mode}
 */
export const ${varName}: StateResourceHubPack = ${JSON.stringify(pack, null, 2)};
`;
}

function getUniqueCountyCount(stateSlug) {
  const t = readFileSync(`data/generated/states/${stateSlug}.ts`, 'utf8');
  const items = [];
  const re = /\{\s*"slug":\s*"([^"]+)",\s*"name":\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(t))) items.push(m[1]);
  return new Set(items).size;
}

const coCount = getUniqueCountyCount('colorado');
const vaCount = getUniqueCountyCount('virginia');
const miCount = getUniqueCountyCount('michigan');
const njCount = getUniqueCountyCount('new-jersey');
const tnCount = getUniqueCountyCount('tennessee');

const packs = {
  colorado: {
    stateSlug: 'colorado',
    stateCode: 'CO',
    h1: `Colorado Moving Resource Hub: Costs, PUC HHG Permits & ${coCount} County Guides`,
    metaTitle: `Colorado Movers Guide 2026 — Costs, PUC HHG Permits & ${coCount} County Guides`,
    metaDescription:
      'Plan a move within, to, or from Colorado. Compare local and intrastate costs, verify Colorado PUC household goods permits, browse county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for Colorado moves in 2026 — typical costs, PUC HHG vs FMCSA rules, Denver-to-mountain regional guides, and tools to compare permitted movers without paid placements.',
    trustBar: [
      `${coCount} County Guides`,
      'Verified Movers',
      'CO PUC & FMCSA Checked',
      'Updated 2026',
    ],
    intents: intents('Colorado'),
    primaryCta: {
      label: 'Calculate My Colorado Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in Colorado is different',
      paragraphs: [
        'Colorado is not one moving market. Denver multi-unit elevators and street staging, Front Range HOA suburbs, high-country altitude and narrow mountain roads, Western Slope agricultural towns, and Eastern Plains long hauls produce different access and labor profiles under one state name.',
        'Intrastate household goods movers must hold a valid Colorado Public Utilities Commission (PUC) household goods (HHG) permit under Title 40, Article 10.1, C.R.S. Interstate jobs need FMCSA authority. Altitude, winter weather, wildfire-season air quality, and ski-town logistics are planning inputs — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'Colorado moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical Colorado local and intrastate patterns; they are not bids. Always compare written estimates from PUC-permitted movers for in-state work and FMCSA-authorized carriers for interstate work.',
      stats: [
        {
          label: 'Typical Denver studio / 1BR',
          value: '$650–$2,500+',
          note: 'Elevators, parking, and altitude labor matter',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$2,000–$6,000+',
          note: 'Front Range HOAs common',
        },
        {
          label: 'Intrastate corridor (e.g. Denver ↔ Grand Junction)',
          value: '$2,500–$8,000+',
          note: 'Mountain passes and weather matter',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'Ski-town winter peaks also exist',
        },
        {
          label: 'Top inbound origins',
          value: 'CA · TX · FL · IL · AZ',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: String(coCount),
          note: 'Front Range emphasized',
        },
      ],
    },
    regulations: {
      mode: 'strong_state_regulator',
      title: 'Colorado moving regulations & consumer protection',
      intro:
        'Colorado requires household goods movers operating within the state to hold a valid Public Utilities Commission (PUC) household goods permit (HHG). Match the permit to the job before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside Colorado)',
        body: 'If origin or destination is outside Colorado, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. A Colorado PUC HHG permit alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within Colorado)',
        body: 'Household goods movers operating within Colorado are regulated by the Colorado PUC under Title 40, Article 10.1, C.R.S. and Commission rules. Consumers should confirm an active HHG permit and written estimate/contract before hiring. The Commission can act against movers that violate permit terms or refuse to obey orders or rules.',
      },
      verifySteps: [
        'Classify the job: entirely in Colorado (PUC HHG) vs any out-of-state leg (FMCSA / USDOT).',
        'Copy the exact legal name from the written estimate.',
        'Intrastate: search the Colorado PUC permit search and confirm an active HHG permit.',
        'Interstate: look up USDOT / MC on FMCSA SAFER.',
        'Get a written estimate and contract — PUC consumer guidance emphasizes written paperwork.',
        'Avoid large cash deposits to unverified operators; use PUC complaint channels if needed.',
      ],
      protections: [
        {
          title: 'PUC HHG permit requirement',
          detail:
            'Colorado PUC regulates household goods movers and publishes consumer guidance to verify permits before you hire. Permit numbers for movers include HHG designation.',
        },
        {
          title: 'Written estimate and contract',
          detail:
            'PUC consumer materials stress getting a written estimate and contract from permitted movers before move day.',
        },
        {
          title: 'Complaint and enforcement channels',
          detail:
            'Consumers can check permits and file complaints through PUC household goods consumer tools when movers violate permit terms or rules.',
        },
      ],
      officialLinks: [
        {
          label: 'Colorado PUC — Household goods movers',
          href: 'https://puc.colorado.gov/movers',
          external: true,
        },
        {
          label: 'Colorado PUC — Consumer info for movers',
          href: 'https://puc.colorado.gov/household-goods-movers-consumer-info',
          external: true,
        },
        {
          label: 'Colorado PUC — Permit search',
          href: 'https://www.dora.state.co.us/pls/real/PUC_Permit.Search_Form',
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
        'Licensing rules and permit directories can change. Always verify current PUC HHG permit status or FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('colorado', [
      {
        key: 'denver-metro',
        id: 'denver-metro',
        name: 'Denver Metro & Core Front Range',
        shortName: 'Denver Metro',
        blurb:
          'Multi-unit elevators, street parking, and dense suburban HOAs across Denver, Jefferson, Arapahoe, Adams, Boulder, Douglas, and neighbors.',
        challenges: [
          'Elevators, stairs, and limited truck staging',
          'HOA move windows on the Front Range',
        ],
        ctaLabel: 'Explore Denver Metro',
      },
      {
        key: 'northern-front-range',
        id: 'northern-front-range',
        name: 'Northern Front Range',
        shortName: 'Northern Front Range',
        blurb:
          'Fort Collins–Greeley growth corridors, plains approaches, and longer hauls into northeast counties.',
        challenges: [
          'Growth-suburb HOA calendars',
          'Wind and winter weather on plains corridors',
        ],
        ctaLabel: 'Explore Northern Front Range',
      },
      {
        key: 'southern-front-range',
        id: 'southern-front-range',
        name: 'Southern Front Range & Pikes Peak',
        shortName: 'Southern Front Range',
        blurb:
          'Colorado Springs, Pueblo, and mountain-adjacent communities with military and suburban mix.',
        challenges: [
          'Elevation and hill access near Pikes Peak',
          'Military and lease-cycle peaks',
        ],
        ctaLabel: 'Explore Southern Front Range',
      },
      {
        key: 'mountain',
        id: 'mountain',
        name: 'Mountain & High Country',
        shortName: 'Mountain',
        blurb:
          'Summit, Eagle, Pitkin, and high-country counties with altitude, narrow roads, and seasonal resort demand.',
        challenges: [
          'Altitude labor and weather windows',
          'Narrow mountain roads and HOA/resort rules',
        ],
        ctaLabel: 'Explore Mountain counties',
      },
      {
        key: 'western-slope',
        id: 'western-slope',
        name: 'Western Slope',
        shortName: 'Western Slope',
        blurb:
          'Grand Junction and Western Slope towns with longer portal-to-portal distances from Denver crews.',
        challenges: [
          'Distance from Front Range fleets',
          'Mountain pass weather on I-70 approaches',
        ],
        ctaLabel: 'Explore Western Slope',
      },
      {
        key: 'southwest-san-luis',
        id: 'southwest-san-luis',
        name: 'Southwest & San Luis Valley',
        shortName: 'SW / San Luis',
        blurb:
          'Durango-area, Four Corners approaches, and San Luis Valley agricultural communities.',
        challenges: [
          'Confirm mover coverage for remote addresses',
          'Altitude and long regional hauls',
        ],
        ctaLabel: 'Explore SW / San Luis',
      },
      {
        key: 'eastern-plains',
        id: 'eastern-plains',
        name: 'Eastern Plains',
        shortName: 'Eastern Plains',
        blurb:
          'Rural plains counties with longer driveway access and thinner local mover density.',
        challenges: [
          'Longer regional hauls and fuel time',
          'Confirm coverage for remote addresses',
        ],
        ctaLabel: 'Explore Eastern Plains',
      },
    ]),
    costs: {
      title: 'Colorado moving costs',
      intro:
        'Colorado pricing reflects Front Range labor markets, altitude, mountain access, HOAs, and seasonal resort demand. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate Colorado moving costs',
        lastReviewed: '2026-07-23',
        body: 'These ranges are planning estimates, not quotes. They combine typical Colorado local and intrastate patterns: home size, distance, stairs/elevators, parking, altitude, mountain roads, HOAs, seasonality, and regional labor. Actual bids vary. Always compare written estimates from PUC-permitted movers for in-state work and FMCSA-authorized carriers for interstate work.',
      },
      ranges: [
        {
          label: 'Denver studio / 1BR',
          value: '$650–$2,500+',
          note: 'Elevators and parking dominate',
        },
        {
          label: 'Suburban 2–3BR house',
          value: '$1,800–$5,500+',
          note: 'Front Range HOAs common',
        },
        {
          label: 'Intrastate mid-size (e.g. Denver ↔ Colorado Springs)',
          value: '$1,800–$5,500+',
          note: 'Season and packing matter',
        },
        {
          label: 'Intrastate long / mountain (e.g. Denver ↔ Grand Junction or ski towns)',
          value: '$2,500–$8,500+',
          note: 'Passes, altitude, and weather matter',
        },
        {
          label: 'Typical 2–3 person crew (Front Range)',
          value: '$140–$250+/hr',
          note: 'Portal-to-portal; access drives hours',
        },
      ],
      factors: [
        'Altitude can slow labor productivity on mountain moves.',
        'HOA windows are common in Front Range suburbs.',
        'Mountain passes and winter weather affect portal-to-portal time.',
        'Ski-town peak seasons can compete with summer statewide peaks.',
        'Elevators, long carries, and tight street staging add hours in Denver.',
      ],
    },
    routes: {
      title: 'Popular Colorado moving routes',
      intro:
        'Colorado is a major Rocky Mountain inbound destination with strong California and Sun Belt origins, plus large Front Range internal flows. Interstate jobs need FMCSA authority; in-state corridors need PUC-permitted HHG movers.',
      migrationProfile: 'inbound_dominant',
      outbound: [
        {
          label: 'Colorado → California',
          href: '/local-movers/california',
          origins: 'Denver metro, Front Range',
          transit: 'Multi-day I-70 / I-15 or southern corridors',
          planningNote: 'CA second hops may need BHGS for in-CA legs.',
          note: 'Bi-directional West traffic is common.',
        },
        {
          label: 'Colorado → Texas',
          href: '/local-movers/texas',
          origins: 'Denver, Colorado Springs',
          transit: 'I-25 / I-40 multi-day',
          planningNote: 'Confirm FMCSA authority end-to-end.',
          note: 'Popular Sun Belt outbound and return corridor.',
        },
        {
          label: 'Colorado → Arizona',
          href: '/local-movers/arizona',
          origins: 'Front Range, Western Slope',
          transit: 'Mountain and desert multi-day',
          planningNote: 'Summer heat at destination matters.',
          note: 'Common lifestyle outbound route.',
        },
      ],
      inbound: [
        {
          label: 'California → Colorado',
          href: '/local-movers/colorado/denver',
          origins: 'Bay Area, LA, San Diego',
          transit: 'Multi-day',
          planningNote: 'High-volume inbound into Denver metro.',
          note: 'Confirm interstate FMCSA authority.',
        },
        {
          label: 'Moving to Denver County',
          href: '/local-movers/colorado/denver',
          note: 'Multi-unit elevators and street logistics dominate.',
        },
        {
          label: 'Moving to El Paso County (Colorado Springs)',
          href: '/local-movers/colorado/el-paso',
          note: 'Military cycles and suburban HOA patterns.',
        },
        {
          label: 'Moving to Boulder County',
          href: '/local-movers/colorado/boulder',
          note: 'Hill access and constrained parking common.',
        },
      ],
    },
    challenges: {
      title: 'Colorado-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real Colorado moves — not generic national checklist filler.',
      items: [
        {
          title: 'Altitude and labor pacing',
          detail:
            'High-country moves can reduce crew productivity. Build buffer time for mountain towns and share floor counts early.',
        },
        {
          title: 'Mountain roads and weather',
          detail:
            'I-70 and pass routes can close or slow trucks. Flexible dates beat rigid ski-season calendars.',
        },
        {
          title: 'Front Range HOA windows',
          detail:
            'Many suburbs limit elevator and loading-dock hours. Get HOA rules in writing before booking.',
        },
        {
          title: 'Wildfire-season air quality',
          detail:
            'Summer smoke can delay outdoor work. Keep a backup date for July–September Front Range moves.',
        },
        {
          title: 'Permit verification',
          detail:
            'Confirm the exact legal name has an active Colorado PUC HHG permit for in-state work before deposits.',
        },
      ],
    },
    tools: SHARED_TOOLS('Colorado'),
    faq: [
      {
        question: 'Do Colorado movers need a state permit?',
        answer:
          'Yes. Household goods movers operating within Colorado generally need a valid Colorado Public Utilities Commission (PUC) household goods (HHG) permit. Interstate moves require FMCSA authority instead of (or in addition to) in-state credentials.',
      },
      {
        question: 'How do I verify a Colorado mover is permitted?',
        answer:
          'Use the Colorado PUC permit search and match the legal name on your written estimate. For any out-of-state leg, also verify USDOT / MC authority on FMCSA SAFER.',
      },
      {
        question: 'How much does a local Denver move cost?',
        answer:
          'Planning ranges often fall around $650–$2,500+ for a studio/1BR and more for larger homes, driven by elevators, parking, stairs, and season. Use the calculator for inventory-based planning, then compare written estimates.',
      },
      {
        question: 'Is a Denver-to-Colorado Springs move intrastate?',
        answer:
          'Yes — both ends are in Colorado, so you generally need a PUC-permitted household goods mover. Confirm written estimates cover stairs, packing, and access fees.',
      },
      {
        question: 'When is peak moving season in Colorado?',
        answer:
          'Statewide peak is typically May–September. Ski towns can also see winter peaks around holiday and season-change dates.',
      },
      {
        question: 'Do I need different authority for interstate moves out of Colorado?',
        answer:
          'Yes. Any origin or destination outside Colorado generally requires active FMCSA operating authority and a USDOT number. A PUC HHG permit alone is not interstate authority.',
      },
    ],
    trust: {
      byline: 'Move Trust Hub editorial research',
      lastReviewed: '2026-07-23',
      methodology:
        'County guides combine public registration checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.',
      independence:
        'Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.',
      sources: [
        {
          label: 'Colorado PUC — Household goods movers',
          href: 'https://puc.colorado.gov/movers',
        },
        {
          label: 'Colorado PUC — Consumer info',
          href: 'https://puc.colorado.gov/household-goods-movers-consumer-info',
        },
        {
          label: 'Colorado PUC — Permit search',
          href: 'https://www.dora.state.co.us/pls/real/PUC_Permit.Search_Form',
        },
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  },

  virginia: {
    stateSlug: 'virginia',
    stateCode: 'VA',
    h1: `Virginia Moving Resource Hub: Costs, DMV HHG Authority & ${vaCount} Local Guides`,
    metaTitle: `Virginia Movers Guide 2026 — Costs, DMV HHG Authority & ${vaCount} Local Guides`,
    metaDescription:
      'Plan a move within, to, or from Virginia. Compare local and intrastate costs, understand DMV household goods carrier rules (including the 31-mile framework), browse local guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for Virginia moves in 2026 — typical costs, DMV household goods vs FMCSA rules, NoVA-to-Hampton Roads regional guides, and tools to compare authorized movers without paid placements.',
    trustBar: [
      `${vaCount} Local Guides`,
      'Verified Movers',
      'VA DMV & FMCSA Checked',
      'Updated 2026',
    ],
    intents: intents('Virginia'),
    primaryCta: {
      label: 'Calculate My Virginia Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in Virginia is different',
      paragraphs: [
        'Virginia is not one moving market. Northern Virginia high-rises and Pentagon-area traffic, Richmond row and suburban stock, Hampton Roads bridges and military cycles, Southwest mountain towns, and independent cities with their own logistics produce different access and labor profiles under one state name.',
        'Virginia DMV regulates household goods carriers for longer in-state hauls (generally 31+ road miles under Code of Virginia frameworks), while shorter local moves may fall outside full household-goods certificate requirements. Interstate jobs need FMCSA authority. Military PCS peaks, HOA suburbs, and bridge/tunnel congestion are planning inputs — then open the region and locality that match your addresses.',
      ],
    },
    snapshot: {
      title: 'Virginia moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical Virginia local and intrastate patterns; they are not bids. Always compare written estimates and confirm the right authority for distance and state lines.',
      stats: [
        {
          label: 'Typical NoVA studio / 1BR',
          value: '$700–$2,800+',
          note: 'Elevators and parking dominate',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$2,000–$6,500+',
          note: 'HOAs common in growth corridors',
        },
        {
          label: 'Intrastate corridor (e.g. NoVA ↔ Richmond)',
          value: '$2,200–$7,000+',
          note: 'Confirm DMV HHG rules by distance',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'Military PCS can create second peaks',
        },
        {
          label: 'Top inbound origins',
          value: 'DC · MD · NY · PA · NC',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'Local guides',
          value: String(vaCount),
          note: 'NoVA and Hampton Roads emphasized',
        },
      ],
    },
    regulations: {
      mode: 'partial_state_regulation',
      title: 'Virginia moving regulations & consumer protection',
      intro:
        'Virginia regulates household goods carriers through DMV Motor Carrier Services for qualifying in-state household goods operations. Distance matters: Code of Virginia frameworks treat shorter hauls differently from certificated longer household-goods moves. Always match authority to the actual origin, destination, and road miles.',
      interstate: {
        title: 'Interstate (any leg outside Virginia)',
        body: 'If origin or destination is outside Virginia, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. Virginia household goods authority alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within Virginia)',
        body: 'Virginia DMV issues household goods carrier authority for for-hire household goods transportation under state motor-carrier rules. Household goods carriers for longer in-state distances (commonly framed around 31 road miles and above) face certificate, insurance/bond, and related requirements; shorter local hauls may be treated differently under Code of Virginia Article 4 exemptions. Confirm with DMV materials and your written estimate which framework applies to your job.',
      },
      verifySteps: [
        'Classify the job: entirely in Virginia vs any out-of-state leg (FMCSA / USDOT).',
        'Estimate road miles between origin and destination — distance can change which Virginia rules apply.',
        'Copy the exact legal name from the written estimate.',
        'Intrastate: confirm appropriate Virginia DMV motor carrier / household goods credentials for the company and job type.',
        'Interstate: look up USDOT / MC on FMCSA SAFER.',
        'Get written estimates, insurance/valuation clarity, and avoid large cash deposits to unverified operators.',
      ],
      protections: [
        {
          title: 'DMV household goods carrier framework',
          detail:
            'Virginia DMV publishes household goods carrier requirements for qualifying intrastate operators, including financial responsibility expectations such as surety bond or letter of credit where applicable.',
        },
        {
          title: 'Distance-based rules',
          detail:
            'Code of Virginia materials distinguish shorter household goods hauls from certificated longer in-state household goods carriage — ask carriers which authority covers your exact addresses.',
        },
        {
          title: 'Written estimates',
          detail:
            'Insist on written estimates and clarity on stairs, elevators, long carries, and packing before signing — especially on NoVA and military moves.',
        },
      ],
      officialLinks: [
        {
          label: 'Virginia DMV — Household goods carrier',
          href: 'https://www.dmv.virginia.gov/businesses/motor-carriers/intrastate/house-goods',
          external: true,
        },
        {
          label: 'Virginia DMV — Motor carriers',
          href: 'https://www.dmv.virginia.gov/businesses/motor-carriers',
          external: true,
        },
        {
          label: 'Code of Virginia — Household goods carriers',
          href: 'https://law.lis.virginia.gov/vacodefull/title46.2/chapter21/article4/',
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
        'Licensing rules, distance thresholds, and lookup tools can change. Always verify current Virginia DMV credentials or FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('virginia', [
      {
        key: 'northern-va',
        id: 'northern-va',
        name: 'Northern Virginia',
        shortName: 'NoVA',
        blurb:
          'Arlington, Fairfax, Loudoun, Prince William, and neighbors with high-rises, HOAs, and DC-adjacent traffic.',
        challenges: [
          'Elevators, parking, and security desks',
          'Beltway and HOA move windows',
        ],
        ctaLabel: 'Explore Northern Virginia',
      },
      {
        key: 'richmond-central',
        id: 'richmond-central',
        name: 'Richmond & Central Virginia',
        shortName: 'Richmond / Central',
        blurb:
          'Richmond independent city and Central Virginia suburbs with mixed historic and growth-corridor stock.',
        challenges: [
          'Historic homes and stairs',
          'I-95 corridor congestion',
        ],
        ctaLabel: 'Explore Richmond / Central',
      },
      {
        key: 'hampton-roads',
        id: 'hampton-roads',
        name: 'Hampton Roads',
        shortName: 'Hampton Roads',
        blurb:
          'Virginia Beach, Norfolk, Chesapeake, Newport News, and neighbors with bridges, tunnels, and military cycles.',
        challenges: [
          'Bridge/tunnel timing and military PCS peaks',
          'Coastal humidity and parking constraints',
        ],
        ctaLabel: 'Explore Hampton Roads',
      },
      {
        key: 'southwest-va',
        id: 'southwest-va',
        name: 'Southwest Virginia',
        shortName: 'Southwest VA',
        blurb:
          'Roanoke, New River Valley, and mountain communities with longer regional hauls and hill access.',
        challenges: [
          'Hill and mountain driveway access',
          'Confirm mover coverage for remote addresses',
        ],
        ctaLabel: 'Explore Southwest Virginia',
      },
      {
        key: 'shenandoah-valley',
        id: 'shenandoah-valley',
        name: 'Shenandoah Valley',
        shortName: 'Shenandoah Valley',
        blurb:
          'Harrisonburg, Staunton, and valley communities along I-81 with college towns and rural lots.',
        challenges: [
          'I-81 weather and truck traffic',
          'Mix of campus and rural access',
        ],
        ctaLabel: 'Explore Shenandoah Valley',
      },
      {
        key: 'eastern-shore',
        id: 'eastern-shore',
        name: 'Eastern Shore',
        shortName: 'Eastern Shore',
        blurb:
          'Accomack and Northampton with bridge-tunnel approaches and thinner local coverage.',
        challenges: [
          'Bridge-tunnel timing',
          'Confirm mover coverage early',
        ],
        ctaLabel: 'Explore Eastern Shore',
      },
      {
        key: 'northern-neck',
        id: 'northern-neck',
        name: 'Northern Neck & Middle Peninsula',
        shortName: 'Northern Neck',
        blurb:
          'Riverside and peninsula counties with longer driveway approaches and seasonal patterns.',
        challenges: [
          'Rural access and longer carries',
          'Confirm coverage for waterfront addresses',
        ],
        ctaLabel: 'Explore Northern Neck',
      },
    ]),
    costs: {
      title: 'Virginia moving costs',
      intro:
        'Virginia pricing reflects NoVA labor markets, HOAs, bridges/tunnels, military timing, and long I-81/I-95 corridors. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate Virginia moving costs',
        lastReviewed: '2026-07-23',
        body: 'These ranges are planning estimates, not quotes. They combine typical Virginia local and intrastate patterns: home size, distance, stairs/elevators, parking, HOAs, military windows, bridges/tunnels, and regional labor. Actual bids vary. Always compare written estimates and confirm the correct Virginia or FMCSA authority for your route.',
      },
      ranges: [
        {
          label: 'NoVA studio / 1BR',
          value: '$700–$2,800+',
          note: 'Elevators and parking dominate',
        },
        {
          label: 'Suburban 2–3BR house',
          value: '$1,900–$5,500+',
          note: 'HOAs common',
        },
        {
          label: 'Intrastate mid-size (e.g. NoVA ↔ Richmond)',
          value: '$2,000–$6,500+',
          note: 'Distance rules may apply',
        },
        {
          label: 'Intrastate long (e.g. NoVA ↔ Hampton Roads or Southwest)',
          value: '$2,500–$8,000+',
          note: 'Full packing pushes the top',
        },
        {
          label: 'Typical 2–3 person crew (NoVA)',
          value: '$145–$260+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'NoVA elevators and security desks add labor time.',
        'HOA windows are common in Loudoun, Fairfax, and Prince William suburbs.',
        'Hampton Roads bridges and tunnels affect truck timing.',
        'Military PCS seasons can compress available crews.',
        'I-81 and mountain approaches change portal-to-portal hours in the west.',
      ],
    },
    routes: {
      title: 'Popular Virginia moving routes',
      intro:
        'Virginia sits between Northeast origins and Sun Belt destinations, with heavy NoVA–DC churn and strong Hampton Roads military flows. Interstate jobs need FMCSA authority; longer in-state household goods jobs need the correct Virginia credentials.',
      migrationProfile: 'balanced',
      outbound: [
        {
          label: 'Virginia → North Carolina',
          href: '/local-movers/north-carolina',
          origins: 'NoVA, Richmond, Hampton Roads',
          transit: 'I-95 / I-85 corridors',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Popular lifestyle and job-driven outbound route.',
        },
        {
          label: 'Virginia → Florida',
          href: '/moving-to/florida',
          origins: 'NoVA, Richmond',
          transit: 'Multi-day I-95',
          planningNote: 'Book early for winter arrivals.',
          note: 'High-volume Northeast-to-Florida corridor.',
        },
        {
          label: 'Virginia → Maryland / DC area',
          href: '/local-movers/maryland',
          origins: 'Northern Virginia',
          transit: 'Often same-day interstate metro hop',
          planningNote: 'Still interstate if crossing state lines.',
          note: 'Common short cross-border metro moves.',
        },
      ],
      inbound: [
        {
          label: 'Moving to Fairfax County',
          href: '/local-movers/virginia/fairfax',
          note: 'Elevators, HOAs, and Beltway logistics.',
        },
        {
          label: 'Moving to Virginia Beach',
          href: '/local-movers/virginia/virginia-beach',
          note: 'Coastal access and military timing.',
        },
        {
          label: 'Moving to Loudoun County',
          href: '/local-movers/virginia/loudoun',
          note: 'Growth suburbs and HOA calendars.',
        },
      ],
    },
    challenges: {
      title: 'Virginia-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real Virginia moves — not generic national checklist filler.',
      items: [
        {
          title: 'NoVA multi-unit access',
          detail:
            'Arlington and Fairfax buildings often need certificates of insurance, elevator reservations, and strict loading windows. Start paperwork early.',
        },
        {
          title: 'Distance-based in-state rules',
          detail:
            'Ask whether your in-state haul falls under full household goods carrier rules or a shorter local framework — road miles matter in Virginia.',
        },
        {
          title: 'Hampton Roads bridges and tunnels',
          detail:
            'Truck timing through bridges and tunnels can add hours. Share exact addresses and preferred windows with estimators.',
        },
        {
          title: 'Military PCS peaks',
          detail:
            'Hampton Roads and Northern Virginia see compressed demand around PCS cycles. Book earlier than a typical civilian calendar.',
        },
        {
          title: 'Independent cities vs counties',
          detail:
            'Virginia’s independent cities can change tax, parking, and address logic. Confirm the exact locality name on estimates and guides.',
        },
      ],
    },
    tools: SHARED_TOOLS('Virginia'),
    faq: [
      {
        question: 'Do Virginia movers need state authority?',
        answer:
          'Many for-hire household goods moves within Virginia require appropriate DMV motor carrier / household goods credentials, especially for longer in-state distances. Short local hauls may be treated differently. Interstate jobs require FMCSA authority.',
      },
      {
        question: 'What is the 31-mile rule people mention in Virginia?',
        answer:
          'Virginia Code frameworks have long distinguished household goods carriage under certain distance thresholds (commonly discussed around 31 road miles). Confirm with DMV materials and your carrier which rules apply to your exact origin and destination.',
      },
      {
        question: 'How much does a local Northern Virginia move cost?',
        answer:
          'Planning ranges often fall around $700–$2,800+ for a studio/1BR and more for larger homes, driven by elevators, parking, and HOAs. Use the calculator, then compare written estimates.',
      },
      {
        question: 'Is a Fairfax-to-Richmond move interstate?',
        answer:
          'No — both ends are in Virginia, so it is intrastate. Confirm the mover holds the correct Virginia credentials for that distance and job type.',
      },
      {
        question: 'When is peak moving season in Virginia?',
        answer:
          'Statewide peak is typically May–September. Military PCS cycles in Hampton Roads and NoVA can create additional demand spikes.',
      },
      {
        question: 'Do I need FMCSA authority for a Virginia-to-Maryland move?',
        answer:
          'Yes. Crossing state lines generally requires active FMCSA operating authority and a USDOT number, even for short metro hops.',
      },
    ],
    trust: {
      byline: 'Move Trust Hub editorial research',
      lastReviewed: '2026-07-23',
      methodology:
        'County and independent-city guides combine public registration checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.',
      independence:
        'Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.',
      sources: [
        {
          label: 'Virginia DMV — Household goods carrier',
          href: 'https://www.dmv.virginia.gov/businesses/motor-carriers/intrastate/house-goods',
        },
        {
          label: 'Code of Virginia — Household goods carriers',
          href: 'https://law.lis.virginia.gov/vacodefull/title46.2/chapter21/article4/',
        },
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  },

  michigan: {
    stateSlug: 'michigan',
    stateCode: 'MI',
    h1: `Michigan Moving Resource Hub: Costs, MSP CVED Authority & ${miCount} County Guides`,
    metaTitle: `Michigan Movers Guide 2026 — Costs, MSP CVED Authority & ${miCount} County Guides`,
    metaDescription:
      'Plan a move within, to, or from Michigan. Compare local and intrastate costs, verify Michigan State Police CVED household goods authority, browse 83 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for Michigan moves in 2026 — typical costs, MSP CVED vs FMCSA rules, Detroit-to-UP regional guides, and tools to compare authorized movers without paid placements.',
    trustBar: [
      `${miCount} County Guides`,
      'Verified Movers',
      'MSP CVED & FMCSA Checked',
      'Updated 2026',
    ],
    intents: intents('Michigan'),
    primaryCta: {
      label: 'Calculate My Michigan Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in Michigan is different',
      paragraphs: [
        'Michigan is not one moving market. Detroit multi-unit and street staging, Oakland/Washtenaw suburbs, Grand Rapids growth corridors, lake-effect snow belts, northern Lower Peninsula seasonal homes, and Upper Peninsula long hauls produce different access and labor profiles under one state name.',
        'Intrastate household goods carriers need active authority through the Michigan State Police Commercial Vehicle Enforcement Division (MSP CVED). Interstate jobs need FMCSA authority. Winter weather, bridge and ferry logistics to the UP, and college-town lease cycles are planning inputs — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'Michigan moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical Michigan local and intrastate patterns; they are not bids. Always compare written estimates from CVED-authorized movers for in-state work and FMCSA-authorized carriers for interstate work.',
      stats: [
        {
          label: 'Typical Detroit studio / 1BR',
          value: '$550–$2,300+',
          note: 'Stairs, elevators, and street staging',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$1,800–$5,500+',
          note: 'Metro Detroit HOAs common',
        },
        {
          label: 'Intrastate corridor (e.g. Detroit ↔ Grand Rapids)',
          value: '$2,000–$6,500+',
          note: 'Season and packing drive the spread',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'Winter weather forces flexible dates',
        },
        {
          label: 'Top outbound destinations',
          value: 'FL · TX · AZ · OH · IN · IL',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: String(miCount),
          note: 'Metro Detroit emphasized',
        },
      ],
    },
    regulations: {
      mode: 'strong_state_regulator',
      title: 'Michigan moving regulations & consumer protection',
      intro:
        'Michigan requires household goods movers operating for hire within the state to hold active MSP CVED authority. Match authority to the job before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside Michigan)',
        body: 'If origin or destination is outside Michigan, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. Michigan CVED household goods authority alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within Michigan)',
        body: 'For-hire household goods transportation within Michigan generally requires active authority through the Michigan State Police Commercial Vehicle Enforcement Division (CVED). Consumers can search carriers with active authority using the CVED Authority Carrier Search (mspcapsearch) tools.',
      },
      verifySteps: [
        'Classify the job: entirely in Michigan (MSP CVED) vs any out-of-state leg (FMCSA / USDOT).',
        'Copy the exact legal name from the written estimate.',
        'Intrastate: search CVED Authority Carrier Search for active household goods authority.',
        'Interstate: look up USDOT / MC on FMCSA SAFER.',
        'Get an onsite estimate when possible and insist on written terms.',
        'Avoid large cash deposits to unverified operators.',
      ],
      protections: [
        {
          title: 'MSP CVED authority requirement',
          detail:
            'Michigan State Police CVED regulates household goods mover authority and publishes consumer tips for protecting your move, including verifying active authority online.',
        },
        {
          title: 'Online authority search',
          detail:
            'Active Michigan authority can be checked via the CVED Authority Carrier Search portal before you hire.',
        },
        {
          title: 'Onsite estimates',
          detail:
            'CVED consumer guidance encourages obtaining onsite estimates so access issues are priced before move day.',
        },
      ],
      officialLinks: [
        {
          label: 'MSP CVED — Key tips for household goods moves',
          href: 'https://www.michigan.gov/msp/divisions/cved/regulatory/key-tips-to-protecting-your-household-goods-move',
          external: true,
        },
        {
          label: 'CVED Authority Carrier Search',
          href: 'https://mspcapsearch.state.mi.us/',
          external: true,
        },
        {
          label: 'MSP CVED — Regulatory & credentialing',
          href: 'https://www.michigan.gov/msp/divisions/cved/regulatory',
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
        'Licensing rules and lookup tools can change. Always verify current MSP CVED authority or FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('michigan', [
      {
        key: 'metro-detroit',
        id: 'metro-detroit',
        name: 'Metro Detroit',
        shortName: 'Metro Detroit',
        blurb:
          'Wayne, Oakland, Macomb, Washtenaw, and neighbors with multi-unit access, suburbs, and dense street logistics.',
        challenges: [
          'Stairs, elevators, and street staging',
          'Suburban HOA windows',
        ],
        ctaLabel: 'Explore Metro Detroit',
      },
      {
        key: 'west-michigan',
        id: 'west-michigan',
        name: 'West Michigan',
        shortName: 'West Michigan',
        blurb:
          'Grand Rapids, lakeshore counties, and growth corridors with suburban HOAs and lake-effect weather.',
        challenges: [
          'Lake-effect snow windows',
          'Growth-suburb HOA calendars',
        ],
        ctaLabel: 'Explore West Michigan',
      },
      {
        key: 'mid-michigan',
        id: 'mid-michigan',
        name: 'Mid-Michigan',
        shortName: 'Mid-Michigan',
        blurb:
          'Lansing capital region and central counties with college towns and mixed suburban-rural stock.',
        challenges: [
          'Campus lease-cycle peaks',
          'Winter weather productivity loss',
        ],
        ctaLabel: 'Explore Mid-Michigan',
      },
      {
        key: 'thumb-saginaw',
        id: 'thumb-saginaw',
        name: 'Thumb & Saginaw Bay',
        shortName: 'Thumb / Saginaw',
        blurb:
          'Flint, Saginaw, Bay City, and Thumb counties with industrial towns and longer rural approaches.',
        challenges: [
          'Older multi-story stock and stairs',
          'Confirm coverage for rural addresses',
        ],
        ctaLabel: 'Explore Thumb / Saginaw',
      },
      {
        key: 'southwest-mi',
        id: 'southwest-mi',
        name: 'Southwest Michigan',
        shortName: 'Southwest MI',
        blurb:
          'Kalamazoo, Benton Harbor–St. Joseph, and Indiana-border counties with short interstate hops nearby.',
        challenges: [
          'Cross-border job classification (still interstate if leaving MI)',
          'Lake-effect weather',
        ],
        ctaLabel: 'Explore Southwest Michigan',
      },
      {
        key: 'northern-lower',
        id: 'northern-lower',
        name: 'Northern Lower Peninsula',
        shortName: 'Northern Lower',
        blurb:
          'Traverse City and northern Lower counties with seasonal homes, tourist peaks, and longer hauls.',
        challenges: [
          'Seasonal cottage access and driveways',
          'Thinner winter mover density',
        ],
        ctaLabel: 'Explore Northern Lower',
      },
      {
        key: 'upper-peninsula',
        id: 'upper-peninsula',
        name: 'Upper Peninsula',
        shortName: 'Upper Peninsula',
        blurb:
          'Marquette and UP counties with long portal-to-portal distances, bridge logistics, and severe winters.',
        challenges: [
          'Mackinac Bridge and long regional hauls',
          'Severe winter weather windows',
        ],
        ctaLabel: 'Explore Upper Peninsula',
      },
    ]),
    costs: {
      title: 'Michigan moving costs',
      intro:
        'Michigan pricing reflects Metro Detroit labor markets, winter weather, lake-effect delays, and long peninsula hauls. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate Michigan moving costs',
        lastReviewed: '2026-07-23',
        body: 'These ranges are planning estimates, not quotes. They combine typical Michigan local and intrastate patterns: home size, distance, stairs/elevators, parking, HOAs, winter weather, and regional labor. Actual bids vary. Always compare written estimates from CVED-authorized movers for in-state work and FMCSA-authorized carriers for interstate work.',
      },
      ranges: [
        {
          label: 'Detroit studio / 1BR',
          value: '$550–$2,300+',
          note: 'Stairs and staging dominate',
        },
        {
          label: 'Suburban 2–3BR house',
          value: '$1,700–$5,000+',
          note: 'HOAs vary by suburb',
        },
        {
          label: 'Intrastate mid-size (e.g. Detroit ↔ Lansing)',
          value: '$1,800–$5,500+',
          note: 'Season matters',
        },
        {
          label: 'Intrastate long (e.g. Detroit ↔ Marquette)',
          value: '$2,800–$9,000+',
          note: 'Bridge and weather matter',
        },
        {
          label: 'Typical 2–3 person crew (Metro Detroit)',
          value: '$125–$230+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'Winter weather can erase productivity and force reschedules.',
        'Metro Detroit multi-unit buildings add stair and elevator time.',
        'UP moves include bridge logistics and long empty miles.',
        'College towns create concentrated lease-end demand.',
        'Lake-effect snow belts need flexible dates November–March.',
      ],
    },
    routes: {
      title: 'Popular Michigan moving routes',
      intro:
        'Michigan sees strong outbound flows to Sun Belt states and short interstate hops into Ohio, Indiana, and Illinois, plus large Detroit–Grand Rapids internal traffic. Interstate jobs need FMCSA authority; in-state corridors need CVED-authorized movers.',
      migrationProfile: 'outbound_dominant',
      outbound: [
        {
          label: 'Michigan → Florida',
          href: '/moving-to/florida',
          origins: 'Metro Detroit, West Michigan',
          transit: 'Multi-day; snowbird seasonality',
          planningNote: 'Book early for fall/winter FL arrivals.',
          note: 'High-volume Midwest-to-Florida corridor.',
        },
        {
          label: 'Michigan → Texas / Arizona',
          href: '/local-movers/texas',
          origins: 'Metro Detroit, Grand Rapids',
          transit: 'Multi-day interstate',
          planningNote: 'Confirm FMCSA authority end-to-end.',
          note: 'Popular job and lifestyle outbound destinations.',
        },
        {
          label: 'Michigan → Ohio / Indiana / Illinois',
          href: '/local-movers/ohio',
          origins: 'Southeast and Southwest MI',
          transit: 'Often same-day or next-day interstate',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Short cross-border metro moves are common.',
        },
      ],
      inbound: [
        {
          label: 'Moving to Wayne County (Detroit)',
          href: '/local-movers/michigan/wayne',
          note: 'Street logistics and multi-unit access dominate.',
        },
        {
          label: 'Moving to Oakland County',
          href: '/local-movers/michigan/oakland',
          note: 'Suburban HOAs and larger home inventories.',
        },
        {
          label: 'Moving to Kent County (Grand Rapids)',
          href: '/local-movers/michigan/kent',
          note: 'West Michigan growth corridors.',
        },
      ],
    },
    challenges: {
      title: 'Michigan-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real Michigan moves — not generic national checklist filler.',
      items: [
        {
          title: 'Winter weather windows',
          detail:
            'Snow and ice can shut down driveway access and slow crews. Build weather buffers November–March, especially in snow belts and the UP.',
        },
        {
          title: 'Metro Detroit multi-unit logistics',
          detail:
            'Older buildings mean stairs, limited elevators, and street permits. Share photos of approaches with estimators.',
        },
        {
          title: 'Upper Peninsula distance',
          detail:
            'Detroit- or GR-based crews face long empty miles and Mackinac Bridge timing. Confirm coverage and overnight plans early.',
        },
        {
          title: 'College lease peaks',
          detail:
            'Ann Arbor, East Lansing, and other campus markets compress demand around August move-in. Book early.',
        },
        {
          title: 'Authority verification',
          detail:
            'Confirm active MSP CVED household goods authority on the carrier search before deposits for in-state work.',
        },
      ],
    },
    tools: SHARED_TOOLS('Michigan'),
    faq: [
      {
        question: 'Do Michigan movers need state authority?',
        answer:
          'Yes. For-hire household goods movers operating within Michigan generally need active MSP CVED authority. Interstate moves require FMCSA authority.',
      },
      {
        question: 'How do I verify a Michigan mover?',
        answer:
          'Use the CVED Authority Carrier Search (mspcapsearch.state.mi.us) and match the legal name on your estimate. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER.',
      },
      {
        question: 'How much does a local Detroit-area move cost?',
        answer:
          'Planning ranges often fall around $550–$2,300+ for a studio/1BR and more for larger homes, driven by stairs, elevators, and season. Use the calculator, then compare written estimates.',
      },
      {
        question: 'Is a Detroit-to-Grand Rapids move intrastate?',
        answer:
          'Yes — both ends are in Michigan, so you generally need a CVED-authorized household goods mover.',
      },
      {
        question: 'When is peak moving season in Michigan?',
        answer:
          'Statewide peak is typically May–September. Winter weather can force flexible dates even outside peak.',
      },
      {
        question: 'Do short moves into Ohio or Indiana still need FMCSA authority?',
        answer:
          'Yes. Crossing state lines generally requires active FMCSA operating authority even for short metro hops.',
      },
    ],
    trust: {
      byline: 'Move Trust Hub editorial research',
      lastReviewed: '2026-07-23',
      methodology:
        'County guides combine public registration checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.',
      independence:
        'Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.',
      sources: [
        {
          label: 'MSP CVED — Key tips for HHG moves',
          href: 'https://www.michigan.gov/msp/divisions/cved/regulatory/key-tips-to-protecting-your-household-goods-move',
        },
        {
          label: 'CVED Authority Carrier Search',
          href: 'https://mspcapsearch.state.mi.us/',
        },
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  },

  'new-jersey': {
    stateSlug: 'new-jersey',
    stateCode: 'NJ',
    h1: `New Jersey Moving Resource Hub: Costs, DCA Public Mover Licenses & ${njCount} County Guides`,
    metaTitle: `New Jersey Movers Guide 2026 — Costs, DCA Licenses & ${njCount} County Guides`,
    metaDescription:
      'Plan a move within, to, or from New Jersey. Compare local and intrastate costs, verify New Jersey Division of Consumer Affairs public mover licenses, browse 21 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for New Jersey moves in 2026 — typical costs, DCA public mover vs FMCSA rules, North-to-South Jersey regional guides, and tools to compare licensed movers without paid placements.',
    trustBar: [
      `${njCount} County Guides`,
      'Verified Movers',
      'NJ DCA & FMCSA Checked',
      'Updated 2026',
    ],
    intents: intents('New Jersey'),
    primaryCta: {
      label: 'Calculate My New Jersey Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in New Jersey is different',
      paragraphs: [
        'New Jersey is not one moving market. Bergen and Hudson multi-unit elevators near NYC, Essex/Union dense street staging, Central Jersey HOA suburbs, Shore seasonal congestion, and South Jersey Philly-adjacent logistics produce different access and labor profiles under one state name.',
        'Intrastate public movers must be licensed by the New Jersey Division of Consumer Affairs (Public Movers and Warehousemen). Interstate jobs need FMCSA authority. Toll roads, street permits, co-op boards, and Shore summer traffic are planning inputs — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'New Jersey moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical New Jersey local and intrastate patterns; they are not bids. Always compare written estimates from DCA-licensed public movers for in-state work and FMCSA-authorized carriers for interstate work.',
      stats: [
        {
          label: 'Typical North Jersey studio / 1BR',
          value: '$700–$2,900+',
          note: 'Elevators, stairs, and parking dominate',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$2,000–$6,500+',
          note: 'HOAs common in Central Jersey',
        },
        {
          label: 'Intrastate corridor (e.g. Bergen ↔ Ocean)',
          value: '$2,000–$6,500+',
          note: 'Toll and traffic time matter',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'Shore summer peaks compress crews',
        },
        {
          label: 'Top outbound destinations',
          value: 'FL · NC · PA · NY · SC',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: String(njCount),
          note: 'North and Central emphasized',
        },
      ],
    },
    regulations: {
      mode: 'strong_state_regulator',
      title: 'New Jersey moving regulations & consumer protection',
      intro:
        'New Jersey requires public movers operating within the state to hold a Public Movers and Warehousemen license from the Division of Consumer Affairs. Match the license to the job before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside New Jersey)',
        body: 'If origin or destination is outside New Jersey, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. A New Jersey public mover license alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within New Jersey)',
        body: 'Public movers and warehousemen operating within New Jersey are regulated by the Division of Consumer Affairs. Licensed movers are expected to meet insurance, location, tariff, and consumer-protection requirements. Consumers should verify the license and get written estimates that include the NJ public mover license number.',
      },
      verifySteps: [
        'Classify the job: entirely in New Jersey (DCA public mover license) vs any out-of-state leg (FMCSA / USDOT).',
        'Copy the exact legal name from the written estimate.',
        'Intrastate: verify the Public Movers license via Division of Consumer Affairs license verification tools.',
        'Interstate: look up USDOT / MC on FMCSA SAFER.',
        'Confirm written estimate includes name, address, phone, and NJ public mover license number.',
        'Avoid large cash deposits to unverified operators; ask about insurance certificates.',
      ],
      protections: [
        {
          title: 'DCA public mover licensing',
          detail:
            'The Division of Consumer Affairs regulates public movers and warehousemen and advises consumers to verify licenses and complaint history before hiring.',
        },
        {
          title: 'License number on estimates',
          detail:
            'Consumer guidance expects licensed movers to include their New Jersey public mover license number on estimates and related paperwork.',
        },
        {
          title: 'Insurance and tariff expectations',
          detail:
            'Licensed public movers are expected to meet insurance and tariff filing expectations designed to protect consumers on in-state moves.',
        },
      ],
      officialLinks: [
        {
          label: 'NJ DCA — Public Movers and Warehousemen',
          href: 'https://www.njconsumeraffairs.gov/pmw',
          external: true,
        },
        {
          label: 'NJ DCA — License verification',
          href: 'https://newjersey.mylicense.com/verification/',
          external: true,
        },
        {
          label: 'NJ DCA — Regulated business search',
          href: 'https://rgbportal.dca.njoag.gov/public-view/',
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
        'Licensing rules and verification portals can change. Always verify current DCA public mover license status or FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('new-jersey', [
      {
        key: 'north-jersey',
        id: 'north-jersey',
        name: 'North Jersey',
        shortName: 'North Jersey',
        blurb:
          'Bergen, Hudson, Essex, Passaic, Union, Morris, and neighbors with NYC-adjacent multi-unit logistics and dense suburbs.',
        challenges: [
          'Elevators, co-ops, and street permits',
          'Bridge and tunnel congestion',
        ],
        ctaLabel: 'Explore North Jersey',
      },
      {
        key: 'central-jersey',
        id: 'central-jersey',
        name: 'Central Jersey',
        shortName: 'Central Jersey',
        blurb:
          'Middlesex, Somerset, Mercer, Monmouth, and Hunterdon with HOA suburbs, Turnpike/Parkway corridors, and mixed urban cores.',
        challenges: [
          'HOA move windows',
          'Turnpike and Parkway traffic timing',
        ],
        ctaLabel: 'Explore Central Jersey',
      },
      {
        key: 'south-jersey',
        id: 'south-jersey',
        name: 'South Jersey',
        shortName: 'South Jersey',
        blurb:
          'Ocean, Burlington, Camden, Atlantic, and Shore counties with seasonal peaks and Philly-adjacent patterns.',
        challenges: [
          'Shore summer congestion',
          'Cross-metro logistics toward Philadelphia',
        ],
        ctaLabel: 'Explore South Jersey',
      },
    ]),
    costs: {
      title: 'New Jersey moving costs',
      intro:
        'New Jersey pricing reflects North Jersey labor markets, multi-unit access, tolls, HOAs, and Shore seasonality. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate New Jersey moving costs',
        lastReviewed: '2026-07-23',
        body: 'These ranges are planning estimates, not quotes. They combine typical New Jersey local and intrastate patterns: home size, distance, stairs/elevators, parking, HOAs, tolls, seasonality, and regional labor. Actual bids vary under licensed public mover frameworks. Always compare written estimates from DCA-licensed movers for in-state work and FMCSA-authorized carriers for interstate work.',
      },
      ranges: [
        {
          label: 'North Jersey studio / 1BR',
          value: '$700–$2,900+',
          note: 'Elevators and parking dominate',
        },
        {
          label: 'Suburban 2–3BR house',
          value: '$1,900–$5,500+',
          note: 'HOAs common',
        },
        {
          label: 'Intrastate mid-size (e.g. Essex ↔ Mercer)',
          value: '$1,900–$5,500+',
          note: 'Tolls and traffic matter',
        },
        {
          label: 'Intrastate long (e.g. Bergen ↔ Cape May)',
          value: '$2,400–$7,500+',
          note: 'Shore seasonality pushes the top',
        },
        {
          label: 'Typical 2–3 person crew (North Jersey)',
          value: '$150–$270+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'Multi-unit elevators and long carries dominate North Jersey jobs.',
        'HOA windows are common in Central Jersey growth suburbs.',
        'Tolls and congestion change portal-to-portal time statewide.',
        'Shore summer peaks compete with statewide May–September demand.',
        'Co-op and condo boards may require certificates of insurance.',
      ],
    },
    routes: {
      title: 'Popular New Jersey moving routes',
      intro:
        'New Jersey is a high-churn Northeast market with strong outbound Sun Belt flows and constant short interstate hops into New York and Pennsylvania. Interstate jobs need FMCSA authority; in-state corridors need DCA-licensed public movers.',
      migrationProfile: 'outbound_dominant',
      outbound: [
        {
          label: 'New Jersey → Florida',
          href: '/moving-to/florida',
          origins: 'North and Central Jersey',
          transit: 'Multi-day I-95',
          planningNote: 'Book early for winter arrivals.',
          note: 'High-volume Northeast-to-Florida corridor.',
        },
        {
          label: 'New Jersey → Carolinas',
          href: '/local-movers/north-carolina',
          origins: 'Statewide',
          transit: 'I-95 multi-day',
          planningNote: 'HOAs at destination common.',
          note: 'Popular lifestyle outbound destinations.',
        },
        {
          label: 'New Jersey → New York / Pennsylvania',
          href: '/local-movers/new-york',
          origins: 'North and South Jersey',
          transit: 'Often same-day interstate',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Short cross-border metro moves are extremely common.',
        },
      ],
      inbound: [
        {
          label: 'Moving to Bergen County',
          href: '/local-movers/new-jersey/bergen',
          note: 'NYC-adjacent multi-unit and suburban mix.',
        },
        {
          label: 'Moving to Middlesex County',
          href: '/local-movers/new-jersey/middlesex',
          note: 'Central Jersey corridors and HOAs.',
        },
        {
          label: 'Moving to Monmouth County',
          href: '/local-movers/new-jersey/monmouth',
          note: 'Shore-adjacent suburbs and seasonal peaks.',
        },
      ],
    },
    challenges: {
      title: 'New Jersey-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real New Jersey moves — not generic national checklist filler.',
      items: [
        {
          title: 'Multi-unit and co-op access',
          detail:
            'North Jersey buildings often need certificates of insurance, elevator reservations, and strict loading windows. Start paperwork a week early.',
        },
        {
          title: 'Street permits and tight staging',
          detail:
            'Dense towns may require parking permits for trucks. Share approach photos and curb rules with estimators.',
        },
        {
          title: 'Shore summer congestion',
          detail:
            'Ocean and Atlantic county moves in summer can double transit time. Avoid Friday arrivals when possible.',
        },
        {
          title: 'Short interstate hops',
          detail:
            'Moves into NYC or Pennsylvania are still interstate. Confirm FMCSA authority even for a one-hour haul.',
        },
        {
          title: 'License verification',
          detail:
            'Confirm the exact legal name holds an active New Jersey public mover license before deposits on in-state work.',
        },
      ],
    },
    tools: SHARED_TOOLS('New Jersey'),
    faq: [
      {
        question: 'Do New Jersey movers need a state license?',
        answer:
          'Yes. Public movers operating within New Jersey generally need a Public Movers and Warehousemen license from the Division of Consumer Affairs. Interstate moves require FMCSA authority.',
      },
      {
        question: 'How do I verify a New Jersey mover is licensed?',
        answer:
          'Use the Division of Consumer Affairs license verification tools and match the legal name on your written estimate. Estimates should include the NJ public mover license number.',
      },
      {
        question: 'How much does a local North Jersey move cost?',
        answer:
          'Planning ranges often fall around $700–$2,900+ for a studio/1BR and more for larger homes, driven by elevators, parking, and labor markets. Use the calculator, then compare written estimates.',
      },
      {
        question: 'Is a Bergen-to-Ocean County move intrastate?',
        answer:
          'Yes — both ends are in New Jersey, so you generally need a DCA-licensed public mover.',
      },
      {
        question: 'Does a move from Hoboken to Manhattan need FMCSA authority?',
        answer:
          'Yes. Crossing into New York is interstate even if the distance is short. Confirm active FMCSA operating authority and a USDOT number.',
      },
      {
        question: 'When is peak moving season in New Jersey?',
        answer:
          'Statewide peak is typically May–September, with additional Shore congestion in summer months.',
      },
    ],
    trust: {
      byline: 'Move Trust Hub editorial research',
      lastReviewed: '2026-07-23',
      methodology:
        'County guides combine public registration checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.',
      independence:
        'Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.',
      sources: [
        {
          label: 'NJ DCA — Public Movers and Warehousemen',
          href: 'https://www.njconsumeraffairs.gov/pmw',
        },
        {
          label: 'NJ DCA — License verification',
          href: 'https://newjersey.mylicense.com/verification/',
        },
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  },

  tennessee: {
    stateSlug: 'tennessee',
    stateCode: 'TN',
    h1: `Tennessee Moving Resource Hub: Costs, Intrastate Authority & ${tnCount} County Guides`,
    metaTitle: `Tennessee Movers Guide 2026 — Costs, TDOR Authority & ${tnCount} County Guides`,
    metaDescription:
      'Plan a move within, to, or from Tennessee. Compare local and intrastate costs, understand Tennessee Department of Revenue intrastate motor carrier authority, browse 95 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for Tennessee moves in 2026 — typical costs, intrastate authority vs FMCSA rules, Nashville-to-Memphis regional guides, and tools to compare authorized movers without paid placements.',
    trustBar: [
      `${tnCount} County Guides`,
      'Verified Movers',
      'TN Authority & FMCSA Checked',
      'Updated 2026',
    ],
    intents: intents('Tennessee'),
    primaryCta: {
      label: 'Calculate My Tennessee Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in Tennessee is different',
      paragraphs: [
        'Tennessee is not one moving market. Nashville multi-unit and HOA growth corridors, Memphis heat and older stock, Knoxville foothill access, Chattanooga ridge-and-valley logistics, and Tri-Cities industrial towns produce different access and labor profiles under one state name.',
        'For-hire motor carriers operating entirely within Tennessee generally need Tennessee Department of Revenue intrastate authority (Motor Carrier unit). Household goods hauls fall under that for-hire framework rather than a California-style dedicated HHG consumer board. Interstate jobs need FMCSA authority. Summer heat, music-city lease peaks, and I-40 corridor distances are planning inputs — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'Tennessee moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical Tennessee local and intrastate patterns; they are not bids. Always compare written estimates and confirm the right Tennessee or FMCSA authority for your route.',
      stats: [
        {
          label: 'Typical Nashville studio / 1BR',
          value: '$550–$2,300+',
          note: 'Elevators and parking dominate',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$1,800–$5,500+',
          note: 'Middle TN HOAs common',
        },
        {
          label: 'Intrastate corridor (e.g. Nashville ↔ Knoxville)',
          value: '$2,000–$6,500+',
          note: 'I-40 distance and season matter',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'Heat and humidity affect productivity',
        },
        {
          label: 'Top inbound origins',
          value: 'CA · IL · NY · FL · TX',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: String(tnCount),
          note: 'Nashville metro emphasized',
        },
      ],
    },
    regulations: {
      mode: 'partial_state_regulation',
      title: 'Tennessee moving regulations & consumer protection',
      intro:
        'Tennessee regulates for-hire motor carriers operating on public highways within the state through Department of Revenue Motor Carrier intrastate authority. Household goods carriers are part of that for-hire framework. Match authority to the job before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside Tennessee)',
        body: 'If origin or destination is outside Tennessee, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. Tennessee intrastate authority alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within Tennessee)',
        body: 'For-hire motor carriers using Tennessee public highways entirely within the state generally need Intrastate Authority through the Tennessee Department of Revenue Motor Carrier unit. Household goods transportation is treated as for-hire property carriage under that system, with insurance and application requirements that can include household goods categories. Consumers should confirm the carrier’s intrastate credentials and get written estimates before hiring.',
      },
      verifySteps: [
        'Classify the job: entirely in Tennessee (intrastate authority) vs any out-of-state leg (FMCSA / USDOT).',
        'Copy the exact legal name from the written estimate.',
        'Intrastate: confirm Tennessee Department of Revenue Motor Carrier intrastate authority for for-hire household goods work.',
        'Interstate: look up USDOT / MC on FMCSA SAFER.',
        'Get written estimates, insurance/valuation clarity, and inventory details.',
        'Avoid large cash deposits to unverified operators.',
      ],
      protections: [
        {
          title: 'Intrastate authority requirement',
          detail:
            'Tennessee Department of Revenue Motor Carrier materials state that intrastate authority allows for-hire motor carriers to use public highways of Tennessee for transportation of persons or property in intrastate commerce.',
        },
        {
          title: 'Household goods as for-hire carriage',
          detail:
            'Industry compliance references treat household goods as a for-hire category under Tennessee intrastate authority applications and insurance expectations — ask carriers for proof that covers your job type.',
        },
        {
          title: 'Written estimates',
          detail:
            'Insist on written estimates and clarity on stairs, elevators, long carries, heat delays, and packing before signing.',
        },
      ],
      officialLinks: [
        {
          label: 'TN Department of Revenue — Intrastate authority',
          href: 'https://www.tn.gov/revenue/motor-carrier/intrastate-authority.html',
          external: true,
        },
        {
          label: 'TN Department of Revenue — Motor Carrier',
          href: 'https://www.tn.gov/revenue/motor-carrier.html',
          external: true,
        },
        {
          label: 'TN Revenue support — What is Intrastate Authority',
          href: 'https://revenue.support.tn.gov/hc/en-us/articles/360060995071-MC-Intrastate-1-What-is-Intrastate-Authority',
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
        'Licensing rules and application processes can change. Always verify current Tennessee intrastate authority or FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('tennessee', [
      {
        key: 'nashville-middle',
        id: 'nashville-middle',
        name: 'Nashville & Middle Tennessee',
        shortName: 'Middle TN',
        blurb:
          'Davidson, Williamson, Rutherford, Sumner, and Middle Tennessee growth counties with multi-unit and HOA suburbs.',
        challenges: [
          'Elevators, parking, and HOA windows',
          'Music-city lease and tour-season peaks',
        ],
        ctaLabel: 'Explore Middle Tennessee',
      },
      {
        key: 'memphis-west',
        id: 'memphis-west',
        name: 'Memphis & West Tennessee',
        shortName: 'West TN',
        blurb:
          'Shelby County and West Tennessee communities with heat, older multi-story stock, and Mississippi River logistics.',
        challenges: [
          'Summer heat and humidity productivity loss',
          'Older homes and stairs',
        ],
        ctaLabel: 'Explore West Tennessee',
      },
      {
        key: 'knoxville-east',
        id: 'knoxville-east',
        name: 'Knoxville & East Tennessee',
        shortName: 'East TN',
        blurb:
          'Knox, Blount, Sevier, and East Tennessee foothill counties with tourist peaks and hill access.',
        challenges: [
          'Hill driveways and foothill roads',
          'Smokies tourism season congestion',
        ],
        ctaLabel: 'Explore East Tennessee',
      },
      {
        key: 'chattanooga-se',
        id: 'chattanooga-se',
        name: 'Chattanooga & Southeast',
        shortName: 'Chattanooga / SE',
        blurb:
          'Hamilton and southeast ridge-and-valley counties with river city logistics and Georgia-border hops.',
        challenges: [
          'Hill and ridge access',
          'Short interstate hops into Georgia need FMCSA authority',
        ],
        ctaLabel: 'Explore Chattanooga / SE',
      },
      {
        key: 'tri-cities',
        id: 'tri-cities',
        name: 'Tri-Cities',
        shortName: 'Tri-Cities',
        blurb:
          'Sullivan, Washington, Carter, and neighbors with industrial towns and Appalachian approaches.',
        challenges: [
          'Mountain weather and longer regional hauls',
          'Confirm mover coverage for remote addresses',
        ],
        ctaLabel: 'Explore Tri-Cities',
      },
    ]),
    costs: {
      title: 'Tennessee moving costs',
      intro:
        'Tennessee pricing reflects Nashville labor markets, summer heat, HOA suburbs, and long I-40 east–west hauls. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate Tennessee moving costs',
        lastReviewed: '2026-07-23',
        body: 'These ranges are planning estimates, not quotes. They combine typical Tennessee local and intrastate patterns: home size, distance, stairs/elevators, parking, HOAs, heat, and regional labor. Actual bids vary. Always compare written estimates and confirm Tennessee intrastate or FMCSA authority for your route.',
      },
      ranges: [
        {
          label: 'Nashville studio / 1BR',
          value: '$550–$2,300+',
          note: 'Elevators and parking dominate',
        },
        {
          label: 'Suburban 2–3BR house',
          value: '$1,700–$5,000+',
          note: 'Middle TN HOAs common',
        },
        {
          label: 'Intrastate mid-size (e.g. Nashville ↔ Chattanooga)',
          value: '$1,800–$5,500+',
          note: 'Season and packing matter',
        },
        {
          label: 'Intrastate long (e.g. Memphis ↔ Knoxville)',
          value: '$2,400–$7,500+',
          note: 'I-40 distance drives hours',
        },
        {
          label: 'Typical 2–3 person crew (Nashville)',
          value: '$125–$230+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'Nashville multi-unit buildings add elevator and staging time.',
        'Summer heat can slow outdoor labor and force earlier start times.',
        'HOA windows are common in Williamson and Rutherford suburbs.',
        'East–west I-40 hauls create long portal-to-portal days.',
        'Tourism seasons in Sevier County can congest roads and lodging for crews.',
      ],
    },
    routes: {
      title: 'Popular Tennessee moving routes',
      intro:
        'Tennessee is a major inbound Sun Belt destination — especially Nashville — with strong California and Midwest origins and large Memphis–Nashville–Knoxville internal flows. Interstate jobs need FMCSA authority; in-state corridors need properly authorized for-hire carriers.',
      migrationProfile: 'inbound_dominant',
      outbound: [
        {
          label: 'Tennessee → Florida',
          href: '/moving-to/florida',
          origins: 'Nashville, Memphis',
          transit: 'I-75 / I-65 multi-day',
          planningNote: 'Confirm FMCSA authority end-to-end.',
          note: 'Common lifestyle outbound corridor.',
        },
        {
          label: 'Tennessee → Georgia / Carolinas',
          href: '/local-movers/georgia',
          origins: 'Chattanooga, Knoxville, Nashville',
          transit: 'Often next-day interstate',
          planningNote: 'Short hops are still interstate.',
          note: 'Popular Southeast job corridors.',
        },
        {
          label: 'Tennessee → Texas',
          href: '/local-movers/texas',
          origins: 'Nashville, Memphis',
          transit: 'Multi-day I-40',
          planningNote: 'Summer heat at both ends matters.',
          note: 'Bi-directional Sun Belt traffic.',
        },
      ],
      inbound: [
        {
          label: 'California → Tennessee',
          href: '/local-movers/tennessee/davidson',
          origins: 'LA, Bay Area, San Diego',
          transit: 'Multi-day',
          planningNote: 'High-volume inbound into Nashville metro.',
          note: 'Confirm interstate FMCSA authority.',
        },
        {
          label: 'Moving to Davidson County (Nashville)',
          href: '/local-movers/tennessee/davidson',
          note: 'Multi-unit elevators and dense urban staging.',
        },
        {
          label: 'Moving to Williamson County',
          href: '/local-movers/tennessee/williamson',
          note: 'HOA suburbs and larger home inventories.',
        },
        {
          label: 'Moving to Shelby County (Memphis)',
          href: '/local-movers/tennessee/shelby',
          note: 'Heat, older stock, and river-city logistics.',
        },
      ],
    },
    challenges: {
      title: 'Tennessee-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real Tennessee moves — not generic national checklist filler.',
      items: [
        {
          title: 'Nashville growth and HOAs',
          detail:
            'Williamson, Rutherford, and Davidson suburbs often restrict elevator and loading hours. Get HOA rules in writing before booking.',
        },
        {
          title: 'Summer heat and humidity',
          detail:
            'Memphis and Middle Tennessee summer heat slows outdoor labor. Prefer early start times June–August.',
        },
        {
          title: 'Long east–west hauls',
          detail:
            'Memphis–Knoxville distances make for long crew days. Confirm overnight plans and fuel time on written estimates.',
        },
        {
          title: 'Smokies tourism congestion',
          detail:
            'Sevier and Blount county roads jam in peak tourism seasons. Avoid weekend arrivals when possible.',
        },
        {
          title: 'Authority mix',
          detail:
            'Confirm Tennessee intrastate authority for pure in-state jobs and FMCSA authority for any out-of-state leg before deposits.',
        },
      ],
    },
    tools: SHARED_TOOLS('Tennessee'),
    faq: [
      {
        question: 'Do Tennessee movers need state authority?',
        answer:
          'For-hire motor carriers operating entirely within Tennessee generally need Intrastate Authority through the Department of Revenue Motor Carrier unit. Interstate moves require FMCSA authority.',
      },
      {
        question: 'Is there a dedicated household goods board in Tennessee?',
        answer:
          'Tennessee’s primary in-state framework is for-hire motor carrier intrastate authority rather than a California-style dedicated HHG consumer commission. Ask carriers for proof that their credentials cover household goods for-hire work.',
      },
      {
        question: 'How much does a local Nashville move cost?',
        answer:
          'Planning ranges often fall around $550–$2,300+ for a studio/1BR and more for larger homes, driven by elevators, parking, and season. Use the calculator, then compare written estimates.',
      },
      {
        question: 'Is a Nashville-to-Memphis move intrastate?',
        answer:
          'Yes — both ends are in Tennessee, so you generally need a properly authorized for-hire intrastate carrier for household goods.',
      },
      {
        question: 'When is peak moving season in Tennessee?',
        answer:
          'Statewide peak is typically May–September. Heat and humidity can affect summer productivity even outside holiday weekends.',
      },
      {
        question: 'Do short moves into Georgia from Chattanooga need FMCSA authority?',
        answer:
          'Yes. Crossing state lines generally requires active FMCSA operating authority even for short hops.',
      },
    ],
    trust: {
      byline: 'Move Trust Hub editorial research',
      lastReviewed: '2026-07-23',
      methodology:
        'County guides combine public registration checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.',
      independence:
        'Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.',
      sources: [
        {
          label: 'TN DOR — Intrastate authority',
          href: 'https://www.tn.gov/revenue/motor-carrier/intrastate-authority.html',
        },
        {
          label: 'TN DOR — Motor Carrier',
          href: 'https://www.tn.gov/revenue/motor-carrier.html',
        },
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  },
};

const fileMap = [
  ['colorado', 'coloradoStateResourceHub', packs.colorado],
  ['virginia', 'virginiaStateResourceHub', packs.virginia],
  ['michigan', 'michiganStateResourceHub', packs.michigan],
  ['new-jersey', 'newJerseyStateResourceHub', packs['new-jersey']],
  ['tennessee', 'tennesseeStateResourceHub', packs.tennessee],
];

function getAllSlugs(stateSlug) {
  const t = readFileSync(`data/generated/states/${stateSlug}.ts`, 'utf8');
  const items = [];
  const re = /\{\s*"slug":\s*"([^"]+)",\s*"name":\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(t))) items.push(m[1]);
  return [...new Set(items)];
}

for (const [file, varName, pack] of fileMap) {
  const seen = new Set();
  let dups = 0;
  for (const r of pack.regions) {
    if (!r.countySlugs || !r.countySlugs.length) {
      throw new Error(`empty region ${r.id} in ${file}`);
    }
    for (const s of r.countySlugs) {
      if (seen.has(s)) dups++;
      seen.add(s);
    }
  }
  const all = getAllSlugs(file);
  const orphans = all.filter((s) => !seen.has(s));
  const unknown = [...seen].filter((s) => !all.includes(s));
  console.log(
    file,
    'counties',
    seen.size,
    '/',
    all.length,
    'dups',
    dups,
    'orphans',
    orphans.length,
    'mode',
    pack.regulations.mode,
    'migration',
    pack.routes.migrationProfile
  );
  if (dups) throw new Error('duplicate counties in ' + file);
  if (orphans.length) throw new Error('orphans in ' + file + ': ' + orphans.join(','));
  if (unknown.length) throw new Error('unknown in ' + file + ': ' + unknown.join(','));
  writeFileSync(
    `lib/local-movers/state-resource-hub/${file}.ts`,
    toTs(varName, pack)
  );
}

// Registry: Wave 1 + Wave 2 + Wave 3 + CA
writeFileSync(
  'lib/local-movers/state-resource-hub/registry.ts',
  `import { arizonaStateResourceHub } from '@/lib/local-movers/state-resource-hub/arizona';
import { californiaStateResourceHub } from '@/lib/local-movers/state-resource-hub/california';
import { coloradoStateResourceHub } from '@/lib/local-movers/state-resource-hub/colorado';
import { floridaStateResourceHub } from '@/lib/local-movers/state-resource-hub/florida';
import { georgiaStateResourceHub } from '@/lib/local-movers/state-resource-hub/georgia';
import { illinoisStateResourceHub } from '@/lib/local-movers/state-resource-hub/illinois';
import { michiganStateResourceHub } from '@/lib/local-movers/state-resource-hub/michigan';
import { newJerseyStateResourceHub } from '@/lib/local-movers/state-resource-hub/new-jersey';
import { newYorkStateResourceHub } from '@/lib/local-movers/state-resource-hub/new-york';
import { northCarolinaStateResourceHub } from '@/lib/local-movers/state-resource-hub/north-carolina';
import { ohioStateResourceHub } from '@/lib/local-movers/state-resource-hub/ohio';
import { pennsylvaniaStateResourceHub } from '@/lib/local-movers/state-resource-hub/pennsylvania';
import { tennesseeStateResourceHub } from '@/lib/local-movers/state-resource-hub/tennessee';
import { texasStateResourceHub } from '@/lib/local-movers/state-resource-hub/texas';
import { virginiaStateResourceHub } from '@/lib/local-movers/state-resource-hub/virginia';
import { washingtonStateResourceHub } from '@/lib/local-movers/state-resource-hub/washington';
import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

const PACKS: StateResourceHubPack[] = [
  arizonaStateResourceHub,
  californiaStateResourceHub,
  coloradoStateResourceHub,
  floridaStateResourceHub,
  georgiaStateResourceHub,
  illinoisStateResourceHub,
  michiganStateResourceHub,
  newJerseyStateResourceHub,
  newYorkStateResourceHub,
  northCarolinaStateResourceHub,
  ohioStateResourceHub,
  pennsylvaniaStateResourceHub,
  tennesseeStateResourceHub,
  texasStateResourceHub,
  virginiaStateResourceHub,
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

console.log('registry updated with Wave 3 (16 packs total)');
