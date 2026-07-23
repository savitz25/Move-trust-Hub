/**
 * Wave 9 State Resource Hubs: MT, WY, ND, SD, ME
 * Run: node scripts/generate-wave9-state-hubs.mjs
 * Prerequisites: scripts/tmp-wave9-regions.json (0 orphans / 0 duplicates)
 *
 * Lower-population states: natural compact regions, honest regulation modes
 * (including limited_or_none / partial where no dedicated HHG board exists).
 */
import { readFileSync, writeFileSync } from 'fs';

const regions = JSON.parse(readFileSync('scripts/tmp-wave9-regions.json', 'utf8'));

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
 * Research brief (Wave 9):
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

function getAllSlugs(stateSlug) {
  const t = readFileSync(`data/generated/states/${stateSlug}.ts`, 'utf8');
  const items = [];
  const re = /\{\s*"slug":\s*"([^"]+)",\s*"name":\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(t))) items.push(m[1]);
  return [...new Set(items)];
}

const mtCount = getUniqueCountyCount('montana');
const wyCount = getUniqueCountyCount('wyoming');
const ndCount = getUniqueCountyCount('north-dakota');
const sdCount = getUniqueCountyCount('south-dakota');
const meCount = getUniqueCountyCount('maine');

const packs = {
  montana: {
    stateSlug: 'montana',
    stateCode: 'MT',
    h1: `Montana Moving Resource Hub: Costs, FMCSA Checks & ${mtCount} County Guides`,
    metaTitle: `Montana Movers Guide 2026 — Costs, Insurance Checks & ${mtCount} County Guides`,
    metaDescription:
      'Plan a move within, to, or from Montana. Compare local and intrastate costs, understand Montana’s lighter HHG licensing framework versus FMCSA interstate rules, browse 56 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for Montana moves in 2026 — typical costs, FMCSA-first verification for interstate work, Missoula-to-Billings regional guides, and tools to compare movers without paid placements.',
    trustBar: [
      `${mtCount} County Guides`,
      'Verified Movers',
      'FMCSA-Focused Checks',
      'Updated 2026',
    ],
    intents: intents('Montana'),
    primaryCta: {
      label: 'Calculate My Montana Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in Montana is different',
      paragraphs: [
        'Montana is not one moving market. Missoula and Flathead valley logistics, Bozeman growth HOAs, Great Falls corridors, Billings eastside hauls, and long empty miles across the Hi-Line produce different access and labor profiles under one state name.',
        'Montana’s household-goods licensing framework is lighter than many states after recent motor-carrier policy changes — there is no California-style dedicated consumer HHG permit directory for most local jobs. Interstate work still needs FMCSA authority. Winter passes, wildfire season, and thin rural coverage are planning inputs — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'Montana moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical Montana local and intrastate patterns; they are not bids. Always compare written estimates and confirm FMCSA authority for any out-of-state leg.',
      stats: [
        {
          label: 'Typical Bozeman / Missoula studio / 1BR',
          value: '$500–$2,300+',
          note: 'Access, stairs, and season matter',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$1,700–$5,500+',
          note: 'Growth-suburb HOAs in the west',
        },
        {
          label: 'Intrastate long (e.g. Missoula ↔ Billings)',
          value: '$2,400–$8,500+',
          note: 'Distance and mountain weather drive hours',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'Winter forces flexible dates',
        },
        {
          label: 'Top outbound destinations',
          value: 'WA · CO · AZ · TX · ID · CA',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: String(mtCount),
          note: 'Western MT emphasized',
        },
      ],
    },
    regulations: {
      mode: 'limited_or_none',
      title: 'Montana moving regulations & consumer protection',
      intro:
        'Montana does not currently operate a consumer-facing household-goods permit regime comparable to Nebraska PSC or Oregon ODOT. Recent motor-carrier policy changes reduced state HHG-specific licensing for many local operators. Interstate jobs still require FMCSA authority. Verify insurance and contracts carefully before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside Montana)',
        body: 'If origin or destination is outside Montana, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. A Montana business registration alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within Montana)',
        body: 'Montana historically regulated certain motor carriers of household goods through Public Service Commission certificate frameworks; policy changes in recent years have lightened dedicated HHG licensing for many local moves. Consumers should still insist on written estimates, cargo and liability insurance certificates, and a clear legal business name. MDT Motor Carrier Services remains relevant for commercial vehicle safety and permits.',
      },
      verifySteps: [
        'Classify the job: entirely in Montana vs any out-of-state leg (FMCSA / USDOT required).',
        'Copy the exact legal name from the written estimate.',
        'Interstate: look up USDOT / MC on FMCSA SAFER before deposits.',
        'Intrastate: request insurance certificates, written inventory estimates, and business credentials.',
        'Confirm mountain-pass and rural driveway access for your addresses.',
        'Avoid large cash deposits to unverified operators.',
      ],
      protections: [
        {
          title: 'Lighter state HHG framework',
          detail:
            'Consumer and compliance sources note Montana eliminated or reduced specific household-goods licensing requirements for many intrastate operators after 2023 policy changes — do not invent a permit number that does not exist.',
        },
        {
          title: 'FMCSA for interstate moves',
          detail:
            'Any move that crosses a state line is generally under federal household goods rules — verify active FMCSA authority on SAFER.',
        },
        {
          title: 'Written estimates and insurance',
          detail:
            'Without a strong state HHG license lookup, written estimates and cargo/liability insurance certificates are your primary consumer controls on local jobs.',
        },
      ],
      officialLinks: [
        {
          label: 'FMCSA SAFER — USDOT lookup',
          href: 'https://safer.fmcsa.dot.gov/',
          external: true,
        },
        {
          label: 'FMCSA — Protect Your Move',
          href: 'https://www.fmcsa.dot.gov/protect-your-move',
          external: true,
        },
        {
          label: 'MDT — Motor Carrier Services',
          href: 'https://www.mdt.mt.gov/business/mcs/',
          external: true,
        },
        { label: 'Move Trust Hub — Verify a USDOT', href: '/verify-dot' },
      ],
      disclaimer:
        'Regulatory frameworks can change. Always verify current commercial credentials and FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('montana', [
      {
        key: 'western-mt',
        id: 'western-mt',
        name: 'Western Montana',
        shortName: 'Western MT',
        blurb:
          'Missoula, Flathead, Bitterroot, and western valleys with mountain access and growth suburbs.',
        challenges: [
          'Mountain weather and long carries',
          'Seasonal tourism congestion',
        ],
        ctaLabel: 'Explore Western Montana',
      },
      {
        key: 'southwestern-mt',
        id: 'southwestern-mt',
        name: 'Southwestern Montana',
        shortName: 'SW Montana',
        blurb:
          'Bozeman, Livingston, and southwest growth corridors with HOAs and recreation peaks.',
        challenges: [
          'Growth-suburb HOA windows',
          'Winter pass timing toward Yellowstone approaches',
        ],
        ctaLabel: 'Explore Southwestern Montana',
      },
      {
        key: 'north-central-mt',
        id: 'north-central-mt',
        name: 'North-Central Montana',
        shortName: 'North-Central',
        blurb:
          'Great Falls, Helena, and north-central corridors with longer regional hauls.',
        challenges: [
          'Wind and winter weather',
          'Confirm coverage for rural addresses',
        ],
        ctaLabel: 'Explore North-Central Montana',
      },
      {
        key: 'eastern-mt',
        id: 'eastern-mt',
        name: 'Eastern Montana',
        shortName: 'Eastern MT',
        blurb:
          'Billings and eastern plains counties with long empty miles and thinner local fleets.',
        challenges: [
          'Long portal-to-portal distances',
          'Confirm mover coverage early',
        ],
        ctaLabel: 'Explore Eastern Montana',
      },
    ]),
    costs: {
      title: 'Montana moving costs',
      intro:
        'Montana pricing reflects thin fleets, mountain weather, long empty miles, and growth markets in the west. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate Montana moving costs',
        lastReviewed: '2026-07-23',
        body: 'These ranges are planning estimates, not quotes. They combine typical Montana local and intrastate patterns: home size, distance, stairs, parking, mountain weather, and regional labor. Actual bids vary widely with season and rural access. Always compare written estimates and confirm FMCSA authority for any out-of-state leg.',
      },
      ranges: [
        {
          label: 'Bozeman / Missoula studio / 1BR',
          value: '$500–$2,300+',
          note: 'Access and season dominate',
        },
        {
          label: 'Suburban 2–3BR house',
          value: '$1,700–$5,200+',
          note: 'HOAs in growth corridors',
        },
        {
          label: 'Intrastate mid-size (e.g. Missoula ↔ Helena)',
          value: '$1,800–$5,500+',
          note: 'Weather windows matter',
        },
        {
          label: 'Intrastate long (e.g. Missoula ↔ Billings)',
          value: '$2,500–$8,500+',
          note: 'Distance drives hours',
        },
        {
          label: 'Typical 2–3 person crew (western metros)',
          value: '$120–$220+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'Mountain passes can close or slow trucks in winter.',
        'Rural eastern jobs include long empty miles.',
        'Bozeman and Flathead growth create HOA and peak-season pressure.',
        'Wildfire-season air quality can delay summer outdoor work.',
        'Short hops into ID, WY, ND, or SD are interstate even when nearby.',
      ],
    },
    routes: {
      title: 'Popular Montana moving routes',
      intro:
        'Montana sees outbound flows to Sun Belt and coastal states plus strong internal west–east hauls. Interstate jobs need FMCSA authority; local jobs need careful insurance and contract verification.',
      migrationProfile: 'outbound_dominant',
      outbound: [
        {
          label: 'Montana → Washington / Idaho',
          href: '/local-movers/washington',
          origins: 'Western MT',
          transit: 'Often next-day interstate',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Common short regional hops.',
        },
        {
          label: 'Montana → Colorado / Arizona',
          href: '/local-movers/colorado',
          origins: 'Bozeman, Missoula, Billings',
          transit: 'Multi-day interstate',
          planningNote: 'Confirm FMCSA authority end-to-end.',
          note: 'Popular lifestyle outbound destinations.',
        },
        {
          label: 'Montana → Texas / California',
          href: '/local-movers/texas',
          origins: 'Statewide metros',
          transit: 'Multi-day interstate',
          planningNote: 'Book early for seasonal peaks.',
          note: 'Long-haul outbound corridors.',
        },
      ],
      inbound: [
        {
          label: 'Moving to Gallatin County (Bozeman)',
          href: '/local-movers/montana/gallatin',
          note: 'Growth suburbs and recreation-season peaks.',
        },
        {
          label: 'Moving to Missoula County',
          href: '/local-movers/montana/missoula',
          note: 'Valley access and mountain approaches.',
        },
        {
          label: 'Moving to Yellowstone County (Billings)',
          href: '/local-movers/montana/yellowstone',
          note: 'Eastern hub logistics and longer regional hauls.',
        },
      ],
    },
    challenges: {
      title: 'Montana-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real Montana moves — not generic national checklist filler.',
      items: [
        {
          title: 'Mountain weather windows',
          detail:
            'Passes and valley ice can shut down trucks. Build weather buffers October–April.',
        },
        {
          title: 'Long empty miles',
          detail:
            'West–east hauls create expensive empty miles. Get inventory-based written estimates.',
        },
        {
          title: 'Lighter state HHG licensing',
          detail:
            'Without a dedicated consumer HHG permit lookup, demand insurance certificates, written estimates, and FMCSA checks for any border hop.',
        },
        {
          title: 'Growth-market HOAs',
          detail:
            'Bozeman and Flathead suburbs often restrict elevator and loading hours. Get rules in writing.',
        },
        {
          title: 'Wildfire-season air quality',
          detail:
            'Summer smoke can delay outdoor work. Keep a backup date for July–September jobs.',
        },
      ],
    },
    tools: SHARED_TOOLS('Montana'),
    faq: [
      {
        question: 'Do Montana movers need a special household goods license?',
        answer:
          'Montana’s dedicated HHG licensing framework is lighter than many states after recent policy changes. Consumers should still verify insurance, written contracts, and FMCSA authority for any out-of-state leg.',
      },
      {
        question: 'How do I verify a Montana mover for an interstate move?',
        answer:
          'Look up USDOT / MC authority on FMCSA SAFER for the legal name on your estimate. Also request certificates of insurance and written inventory estimates.',
      },
      {
        question: 'How much does a local Bozeman or Missoula move cost?',
        answer:
          'Planning ranges often fall around $500–$2,300+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates.',
      },
      {
        question: 'Is a Missoula-to-Billings move interstate?',
        answer:
          'No — both ends are in Montana. Focus on weather windows, packing, and inventory-based written estimates for the long haul.',
      },
      {
        question: 'When is peak moving season in Montana?',
        answer:
          'Statewide peak is typically May–September. Winter weather can force flexible dates for much of the rest of the year.',
      },
      {
        question: 'Does a Missoula-to-Spokane move need FMCSA authority?',
        answer:
          'Yes. Crossing into Washington is interstate. Confirm active FMCSA operating authority and a USDOT number.',
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
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        {
          label: 'FMCSA — Protect Your Move',
          href: 'https://www.fmcsa.dot.gov/protect-your-move',
        },
        {
          label: 'MDT — Motor Carrier Services',
          href: 'https://www.mdt.mt.gov/business/mcs/',
        },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  },

  wyoming: {
    stateSlug: 'wyoming',
    stateCode: 'WY',
    h1: `Wyoming Moving Resource Hub: Costs, WYDOT Authority & ${wyCount} County Guides`,
    metaTitle: `Wyoming Movers Guide 2026 — Costs, WYDOT Authority & ${wyCount} County Guides`,
    metaDescription:
      'Plan a move within, to, or from Wyoming. Compare local and intrastate costs, understand WYDOT intrastate operating authority for household goods hauls, browse 23 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for Wyoming moves in 2026 — typical costs, WYDOT vs FMCSA rules, Cheyenne-to-Jackson regional guides, and tools to compare authorized movers without paid placements.',
    trustBar: [
      `${wyCount} County Guides`,
      'Verified Movers',
      'WYDOT & FMCSA Checked',
      'Updated 2026',
    ],
    intents: intents('Wyoming'),
    primaryCta: {
      label: 'Calculate My Wyoming Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in Wyoming is different',
      paragraphs: [
        'Wyoming is not one moving market. Cheyenne plains logistics, Casper energy corridors, Jackson Hole seasonal peaks, and long empty miles across the Basin produce different access and labor profiles under one state name.',
        'Intrastate for-hire carriers — including household goods — generally need Operating Authority from the Wyoming Department of Transportation (often documented as a Letter of Authority carried in the vehicle). Interstate jobs need FMCSA authority. Wind, winter closures, and thin rural fleets are planning inputs — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'Wyoming moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical Wyoming local and intrastate patterns; they are not bids. Always compare written estimates from properly authorized carriers for in-state work and FMCSA-authorized carriers for interstate work.',
      stats: [
        {
          label: 'Typical Cheyenne / Casper studio / 1BR',
          value: '$450–$2,100+',
          note: 'Wind and season matter',
        },
        {
          label: 'Typical house 3–4 BR',
          value: '$1,600–$5,500+',
          note: 'Rural driveways common',
        },
        {
          label: 'Intrastate long (e.g. Cheyenne ↔ Jackson)',
          value: '$2,500–$9,000+',
          note: 'Distance, weather, and seasonality',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'Jackson peaks can extend into winter',
        },
        {
          label: 'Top outbound destinations',
          value: 'CO · TX · AZ · UT · MT · CA',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: String(wyCount),
          note: 'Southeast and Northwest emphasized',
        },
      ],
    },
    regulations: {
      mode: 'partial_state_regulation',
      title: 'Wyoming moving regulations & consumer protection',
      intro:
        'Wyoming generally requires intrastate for-hire motor carriers — including household goods hauls — to hold Operating Authority from WYDOT Motor Carrier Services. A Letter of Authority is commonly expected in each vehicle. Match authority to the job before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside Wyoming)',
        body: 'If origin or destination is outside Wyoming, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. Wyoming operating authority alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within Wyoming)',
        body: 'Anyone transporting goods they do not own for compensation within Wyoming generally needs Operating Authority from WYDOT. Applications typically require a filing fee, USDOT number, and insurance filings (liability and cargo minimums apply for household goods-type hauls). Consumers should confirm authority and get written estimates before hiring.',
      },
      verifySteps: [
        'Classify the job: entirely in Wyoming (WYDOT operating authority) vs any out-of-state leg (FMCSA / USDOT).',
        'Copy the exact legal name from the written estimate.',
        'Intrastate: ask for WYDOT Letter of Authority / operating authority documentation.',
        'Interstate: look up USDOT / MC on FMCSA SAFER.',
        'Get written estimates and insurance certificates (cargo + liability).',
        'Avoid large cash deposits to unverified operators.',
      ],
      protections: [
        {
          title: 'WYDOT operating authority',
          detail:
            'Intrastate household goods carriers operating for compensation generally need Operating Authority from Wyoming Department of Transportation Motor Carrier Services.',
        },
        {
          title: 'Letter of Authority in vehicles',
          detail:
            'Compliance guidance commonly expects a Letter of Authority to be held in each vehicle operating under Wyoming authority.',
        },
        {
          title: 'Insurance minimums',
          detail:
            'WYDOT frameworks typically require liability and cargo insurance filings for household goods-type hauls — ask for certificates before move day.',
        },
      ],
      officialLinks: [
        {
          label: 'WYDOT — Trucking & commercial vehicles',
          href: 'https://www.dot.state.wy.us/home/trucking_commercial_vehicles.html',
          external: true,
        },
        {
          label: 'FMCSA SAFER — USDOT lookup',
          href: 'https://safer.fmcsa.dot.gov/',
          external: true,
        },
        {
          label: 'FMCSA — Protect Your Move',
          href: 'https://www.fmcsa.dot.gov/protect-your-move',
          external: true,
        },
        { label: 'Move Trust Hub — Verify a USDOT', href: '/verify-dot' },
      ],
      disclaimer:
        'Licensing rules and forms can change. Always verify current WYDOT operating authority or FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('wyoming', [
      {
        key: 'southeast-wy',
        id: 'southeast-wy',
        name: 'Southeast Wyoming',
        shortName: 'Southeast',
        blurb:
          'Cheyenne, Laramie, and southeast plains counties with I-80/I-25 logistics.',
        challenges: [
          'Wind and winter weather',
          'Short CO hops need FMCSA authority',
        ],
        ctaLabel: 'Explore Southeast Wyoming',
      },
      {
        key: 'central-wy',
        id: 'central-wy',
        name: 'Central Wyoming',
        shortName: 'Central',
        blurb:
          'Casper, Riverton, and central basin counties with energy corridors and longer hauls.',
        challenges: [
          'Long empty miles',
          'Confirm coverage for rural addresses',
        ],
        ctaLabel: 'Explore Central Wyoming',
      },
      {
        key: 'northeast-wy',
        id: 'northeast-wy',
        name: 'Northeast Wyoming',
        shortName: 'Northeast',
        blurb:
          'Gillette, Sheridan, and northeast counties with industrial and ranch access.',
        challenges: [
          'Industrial shift timing',
          'Winter road conditions',
        ],
        ctaLabel: 'Explore Northeast Wyoming',
      },
      {
        key: 'northwest-wy',
        id: 'northwest-wy',
        name: 'Northwest Wyoming',
        shortName: 'Northwest',
        blurb:
          'Jackson, Cody, and northwest mountain counties with tourism peaks and thin winter access.',
        challenges: [
          'Seasonal housing and HOA/resort rules',
          'Mountain pass weather',
        ],
        ctaLabel: 'Explore Northwest Wyoming',
      },
    ]),
    costs: {
      title: 'Wyoming moving costs',
      intro:
        'Wyoming pricing reflects thin fleets, wind, long empty miles, and Jackson seasonal demand. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate Wyoming moving costs',
        lastReviewed: '2026-07-23',
        body: 'These ranges are planning estimates, not quotes. They combine typical Wyoming local and intrastate patterns: home size, distance, weather, rural access, and regional labor. Actual bids vary widely by season — especially in Teton County. Always compare written estimates and confirm the correct Wyoming or FMCSA authority for your route.',
      },
      ranges: [
        {
          label: 'Cheyenne / Casper studio / 1BR',
          value: '$450–$2,100+',
          note: 'Wind and access dominate',
        },
        {
          label: 'House 2–3BR',
          value: '$1,600–$5,200+',
          note: 'Rural driveways common',
        },
        {
          label: 'Intrastate mid-size (e.g. Cheyenne ↔ Casper)',
          value: '$1,800–$5,500+',
          note: 'Season matters',
        },
        {
          label: 'Intrastate long / mountain (e.g. Cheyenne ↔ Jackson)',
          value: '$2,800–$10,000+',
          note: 'Seasonality and weather push the top',
        },
        {
          label: 'Typical 2–3 person crew (major markets)',
          value: '$115–$210+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'Wind and winter weather can force same-day reschedules.',
        'Jackson seasonal peaks compress available crews.',
        'Long empty miles between hubs raise portal-to-portal time.',
        'Mountain approaches may need smaller trucks or shuttles.',
        'Short hops into CO, MT, UT, ID, NE, or SD are interstate even when nearby.',
      ],
    },
    routes: {
      title: 'Popular Wyoming moving routes',
      intro:
        'Wyoming sits between Colorado Front Range and Mountain West corridors with strong outbound Sun Belt flows and short interstate hops into Colorado, Montana, and Utah. Interstate jobs need FMCSA authority; in-state corridors need properly authorized carriers.',
      migrationProfile: 'outbound_dominant',
      outbound: [
        {
          label: 'Wyoming → Colorado',
          href: '/local-movers/colorado',
          origins: 'Cheyenne, Laramie, Casper',
          transit: 'Often same-day or next-day interstate via I-25/I-80',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Highest-volume short outbound corridor.',
        },
        {
          label: 'Wyoming → Texas / Arizona',
          href: '/local-movers/texas',
          origins: 'Statewide',
          transit: 'Multi-day interstate',
          planningNote: 'Confirm FMCSA authority end-to-end.',
          note: 'Popular lifestyle outbound destinations.',
        },
        {
          label: 'Wyoming → Utah / Montana',
          href: '/local-movers/utah',
          origins: 'Western and northern WY',
          transit: 'Mountain multi-day or next-day',
          planningNote: 'Weather windows matter.',
          note: 'Common regional Mountain West hops.',
        },
      ],
      inbound: [
        {
          label: 'Moving to Laramie County (Cheyenne)',
          href: '/local-movers/wyoming/laramie',
          note: 'Plains logistics and I-25/I-80 access.',
        },
        {
          label: 'Moving to Natrona County (Casper)',
          href: '/local-movers/wyoming/natrona',
          note: 'Central hub and energy-corridor patterns.',
        },
        {
          label: 'Moving to Teton County (Jackson)',
          href: '/local-movers/wyoming/teton',
          note: 'Seasonal peaks and mountain access.',
        },
      ],
    },
    challenges: {
      title: 'Wyoming-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real Wyoming moves — not generic national checklist filler.',
      items: [
        {
          title: 'Wind and winter closures',
          detail:
            'I-80 and mountain routes can close with little notice. Build weather buffers October–April.',
        },
        {
          title: 'Jackson seasonal demand',
          detail:
            'Tourism and second-home calendars compress crews. Book early for peak seasons.',
        },
        {
          title: 'Long empty miles',
          detail:
            'Cross-state-internal hauls create expensive empty miles. Get inventory-based written estimates.',
        },
        {
          title: 'Short interstate hops into Colorado',
          detail:
            'Cheyenne-to-Front Range jobs are interstate even if short. Confirm FMCSA authority before deposits.',
        },
        {
          title: 'WYDOT authority verification',
          detail:
            'Ask for Operating Authority / Letter of Authority documentation for pure in-state household goods work.',
        },
      ],
    },
    tools: SHARED_TOOLS('Wyoming'),
    faq: [
      {
        question: 'Do Wyoming movers need operating authority?',
        answer:
          'Yes. Intrastate for-hire carriers transporting household goods generally need Operating Authority from WYDOT. Interstate moves require FMCSA authority.',
      },
      {
        question: 'How do I verify a Wyoming mover?',
        answer:
          'Ask for WYDOT Letter of Authority / operating authority documentation and insurance certificates. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER.',
      },
      {
        question: 'How much does a local Cheyenne or Casper move cost?',
        answer:
          'Planning ranges often fall around $450–$2,100+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates.',
      },
      {
        question: 'Is a Cheyenne-to-Jackson move intrastate?',
        answer:
          'Yes — both ends are in Wyoming, so you generally need properly authorized for-hire carriers for household goods.',
      },
      {
        question: 'When is peak moving season in Wyoming?',
        answer:
          'Statewide peak is typically May–September. Jackson markets can also see strong winter demand.',
      },
      {
        question: 'Does a Cheyenne-to-Fort Collins move need FMCSA authority?',
        answer:
          'Yes. Crossing into Colorado is interstate even for short hops. Confirm active FMCSA operating authority.',
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
          label: 'WYDOT — Trucking & commercial vehicles',
          href: 'https://www.dot.state.wy.us/home/trucking_commercial_vehicles.html',
        },
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  },

  'north-dakota': {
    stateSlug: 'north-dakota',
    stateCode: 'ND',
    h1: `North Dakota Moving Resource Hub: Costs, NDDOT HHG Permits & ${ndCount} County Guides`,
    metaTitle: `North Dakota Movers Guide 2026 — Costs, HHG Permits & ${ndCount} County Guides`,
    metaDescription:
      'Plan a move within, to, or from North Dakota. Compare local and intrastate costs, verify NDDOT household goods carrier permits, browse 53 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for North Dakota moves in 2026 — typical costs, NDDOT vs FMCSA rules, Fargo-to-Bismarck regional guides, and tools to compare permitted movers without paid placements.',
    trustBar: [
      `${ndCount} County Guides`,
      'Verified Movers',
      'NDDOT & FMCSA Checked',
      'Updated 2026',
    ],
    intents: intents('North Dakota'),
    primaryCta: {
      label: 'Calculate My North Dakota Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in North Dakota is different',
      paragraphs: [
        'North Dakota is not one moving market. Fargo Red River logistics, Bismarck capital corridors, Minot and Williston energy cycles, and long empty miles across the prairie produce different access and labor profiles under one state name.',
        'Household goods carriers operating in North Dakota generally need a Household Goods Carrier Permit from the North Dakota Department of Transportation Motor Vehicle division (application fee frameworks under state law). Interstate jobs need FMCSA authority. Extreme cold, wind, and thin rural fleets are planning inputs — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'North Dakota moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical North Dakota local and intrastate patterns; they are not bids. Always compare written estimates from permitted movers for in-state work and FMCSA-authorized carriers for interstate work.',
      stats: [
        {
          label: 'Typical Fargo studio / 1BR',
          value: '$450–$2,000+',
          note: 'Winter access dominates',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$1,500–$4,800+',
          note: 'Metro HOAs vary',
        },
        {
          label: 'Intrastate long (e.g. Fargo ↔ Williston)',
          value: '$2,200–$8,000+',
          note: 'Distance and weather drive hours',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'Winter forces flexible dates',
        },
        {
          label: 'Top outbound destinations',
          value: 'MN · TX · AZ · CO · FL · MT',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: String(ndCount),
          note: 'Red River and Bismarck emphasized',
        },
      ],
    },
    regulations: {
      mode: 'strong_state_regulator',
      title: 'North Dakota moving regulations & consumer protection',
      intro:
        'North Dakota requires household goods carriers operating in the state to obtain a Household Goods Carrier Permit (NDDOT Motor Vehicle application frameworks, including statutory application fees). Match the permit to the job before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside North Dakota)',
        body: 'If origin or destination is outside North Dakota, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. A North Dakota household goods permit alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within North Dakota)',
        body: 'Every household goods carrier operating in North Dakota, when applying for a household goods carrier permit, must pay statutory application fees and complete NDDOT Motor Vehicle permit processes. Annual renewal frameworks and insurance documentation commonly apply. Consumers should confirm permit status and get written estimates before hiring.',
      },
      verifySteps: [
        'Classify the job: entirely in North Dakota (HHG permit) vs any out-of-state leg (FMCSA / USDOT).',
        'Copy the exact legal name from the written estimate.',
        'Intrastate: confirm NDDOT household goods carrier permit for the company.',
        'Interstate: look up USDOT / MC on FMCSA SAFER.',
        'Get written estimates and insurance certificates.',
        'Avoid large cash deposits to unverified operators.',
      ],
      protections: [
        {
          title: 'Household goods carrier permit',
          detail:
            'North Dakota law provides for household goods carrier permits administered through NDDOT Motor Vehicle application processes with statutory filing fees.',
        },
        {
          title: 'Insurance compliance',
          detail:
            'Permit processes commonly require proof of liability and cargo insurance — ask for certificates before move day.',
        },
        {
          title: 'Written estimates',
          detail:
            'Insist on written estimates and clarity on winter access, long carries, and packing before signing.',
        },
      ],
      officialLinks: [
        {
          label: 'NDDOT — Forms (Household Goods Carrier Permit SFN 10539)',
          href: 'https://www.dot.nd.gov/forms/sfn10539.pdf',
          external: true,
        },
        {
          label: 'North Dakota DOT',
          href: 'https://www.dot.nd.gov/',
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
        'Licensing rules and forms can change. Always verify current household goods permit status or FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('north-dakota', [
      {
        key: 'fargo-red-river',
        id: 'fargo-red-river',
        name: 'Fargo & Red River Valley',
        shortName: 'Red River',
        blurb:
          'Cass, Grand Forks, and eastern counties with multi-unit access and Minnesota-border hops.',
        challenges: [
          'Short MN hops need FMCSA authority',
          'Winter ice and flood-season logistics',
        ],
        ctaLabel: 'Explore Red River',
      },
      {
        key: 'bismarck-central',
        id: 'bismarck-central',
        name: 'Bismarck & Central / Southwest',
        shortName: 'Bismarck / Central',
        blurb:
          'Burleigh–Morton capital corridors and southwest energy approaches.',
        challenges: [
          'Long empty miles westward',
          'Wind and winter weather',
        ],
        ctaLabel: 'Explore Bismarck / Central',
      },
      {
        key: 'minot-northwest',
        id: 'minot-northwest',
        name: 'Minot & Northwest',
        shortName: 'Northwest',
        blurb:
          'Ward, Williams, and northwest energy counties with industrial cycles and thin coverage.',
        challenges: [
          'Energy-cycle demand spikes',
          'Confirm mover coverage early',
        ],
        ctaLabel: 'Explore Northwest',
      },
      {
        key: 'northeast-nd',
        id: 'northeast-nd',
        name: 'Northeast North Dakota',
        shortName: 'Northeast',
        blurb:
          'Devils Lake approaches and northeast agricultural counties.',
        challenges: [
          'Rural driveway access',
          'Longer hauls to Fargo fleets',
        ],
        ctaLabel: 'Explore Northeast',
      },
    ]),
    costs: {
      title: 'North Dakota moving costs',
      intro:
        'North Dakota pricing reflects Fargo labor markets, extreme winters, and long prairie hauls. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate North Dakota moving costs',
        lastReviewed: '2026-07-23',
        body: 'These ranges are planning estimates, not quotes. They combine typical North Dakota local and intrastate patterns: home size, distance, winter access, packing, and regional labor. Actual bids vary widely with season and energy-cycle demand. Always compare written estimates from permitted movers for in-state work and FMCSA-authorized carriers for interstate work.',
      },
      ranges: [
        {
          label: 'Fargo studio / 1BR',
          value: '$450–$2,000+',
          note: 'Winter access dominates',
        },
        {
          label: 'Suburban 2–3BR house',
          value: '$1,500–$4,500+',
          note: 'HOAs vary',
        },
        {
          label: 'Intrastate mid-size (e.g. Fargo ↔ Bismarck)',
          value: '$1,800–$5,500+',
          note: 'Season matters',
        },
        {
          label: 'Intrastate long (e.g. Fargo ↔ Williston)',
          value: '$2,400–$8,500+',
          note: 'Distance and weather push hours',
        },
        {
          label: 'Typical 2–3 person crew (Fargo metro)',
          value: '$110–$200+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'Extreme cold can erase productivity and limit truck starts.',
        'Wind and ice force flexible winter dates.',
        'Northwest energy cycles can tighten crew availability.',
        'Long empty miles between hubs raise portal-to-portal time.',
        'Short hops into MN, MT, or SD are interstate even when nearby.',
      ],
    },
    routes: {
      title: 'Popular North Dakota moving routes',
      intro:
        'North Dakota sees outbound Sun Belt flows, constant short interstate hops into Minnesota, and large Fargo–Bismarck internal traffic. Interstate jobs need FMCSA authority; in-state corridors need properly permitted household goods carriers.',
      migrationProfile: 'outbound_dominant',
      outbound: [
        {
          label: 'North Dakota → Minnesota',
          href: '/local-movers/minnesota',
          origins: 'Fargo, Grand Forks',
          transit: 'Often same-day interstate',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Highest-volume short outbound corridor.',
        },
        {
          label: 'North Dakota → Texas / Arizona / Florida',
          href: '/local-movers/texas',
          origins: 'Statewide metros',
          transit: 'Multi-day interstate',
          planningNote: 'Book early for seasonal peaks.',
          note: 'Popular lifestyle outbound destinations.',
        },
        {
          label: 'North Dakota → Montana / Colorado',
          href: '/local-movers/montana',
          origins: 'West and central ND',
          transit: 'Multi-day interstate',
          planningNote: 'Confirm FMCSA authority end-to-end.',
          note: 'Common regional Mountain West hops.',
        },
      ],
      inbound: [
        {
          label: 'Moving to Cass County (Fargo)',
          href: '/local-movers/north-dakota/cass',
          note: 'Multi-unit access and MN-border patterns.',
        },
        {
          label: 'Moving to Burleigh County (Bismarck)',
          href: '/local-movers/north-dakota/burleigh',
          note: 'Capital corridors and plains logistics.',
        },
        {
          label: 'Moving to Ward County (Minot)',
          href: '/local-movers/north-dakota/ward',
          note: 'Northwest hub and military cycles.',
        },
      ],
    },
    challenges: {
      title: 'North Dakota-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real North Dakota moves — not generic national checklist filler.',
      items: [
        {
          title: 'Extreme winter access',
          detail:
            'Ice, wind, and cold can shut down driveway access. Build large weather buffers November–March.',
        },
        {
          title: 'Fargo–Moorhead border hops',
          detail:
            'Jobs into Minnesota are interstate even if short. Confirm FMCSA authority before deposits.',
        },
        {
          title: 'Long prairie hauls',
          detail:
            'Fargo–Williston distances create expensive empty miles. Get inventory-based written estimates.',
        },
        {
          title: 'Energy-cycle demand',
          detail:
            'Northwest markets can tighten crews during boom periods. Book early.',
        },
        {
          title: 'HHG permit verification',
          detail:
            'Confirm the exact legal name holds a North Dakota household goods carrier permit before deposits on pure in-state work.',
        },
      ],
    },
    tools: SHARED_TOOLS('North Dakota'),
    faq: [
      {
        question: 'Do North Dakota movers need a household goods permit?',
        answer:
          'Yes. Household goods carriers operating in North Dakota generally need a Household Goods Carrier Permit through NDDOT Motor Vehicle frameworks. Interstate moves require FMCSA authority.',
      },
      {
        question: 'How do I verify a North Dakota mover?',
        answer:
          'Confirm household goods carrier permit status for the legal name on your estimate and request insurance certificates. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER.',
      },
      {
        question: 'How much does a local Fargo move cost?',
        answer:
          'Planning ranges often fall around $450–$2,000+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates.',
      },
      {
        question: 'Is a Fargo-to-Bismarck move intrastate?',
        answer:
          'Yes — both ends are in North Dakota, so you generally need a permitted household goods carrier.',
      },
      {
        question: 'When is peak moving season in North Dakota?',
        answer:
          'Statewide peak is typically May–September. Winter weather can force flexible dates for much of the rest of the year.',
      },
      {
        question: 'Does a Fargo-to-Moorhead move need FMCSA authority?',
        answer:
          'Yes. Crossing into Minnesota is interstate even for short hops. Confirm active FMCSA operating authority.',
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
          label: 'NDDOT — Household Goods Carrier Permit form',
          href: 'https://www.dot.nd.gov/forms/sfn10539.pdf',
        },
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  },

  'south-dakota': {
    stateSlug: 'south-dakota',
    stateCode: 'SD',
    h1: `South Dakota Moving Resource Hub: Costs, FMCSA Checks & ${sdCount} County Guides`,
    metaTitle: `South Dakota Movers Guide 2026 — Costs, Insurance Checks & ${sdCount} County Guides`,
    metaDescription:
      'Plan a move within, to, or from South Dakota. Compare local and intrastate costs, understand South Dakota’s limited dedicated HHG licensing versus FMCSA interstate rules, browse 66 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for South Dakota moves in 2026 — typical costs, FMCSA-first verification for interstate work, Sioux Falls-to-Rapid City regional guides, and tools to compare movers without paid placements.',
    trustBar: [
      `${sdCount} County Guides`,
      'Verified Movers',
      'FMCSA-Focused Checks',
      'Updated 2026',
    ],
    intents: intents('South Dakota'),
    primaryCta: {
      label: 'Calculate My South Dakota Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in South Dakota is different',
      paragraphs: [
        'South Dakota is not one moving market. Sioux Falls multi-unit growth, Rapid City Black Hills approaches, Pierre capital logistics, and long empty miles across the prairie produce different access and labor profiles under one state name.',
        'South Dakota does not operate a consumer-facing household-goods permit regime comparable to North Dakota’s NDDOT HHG permit or Nebraska’s PSC license. Interstate jobs need FMCSA authority. For in-state work, insist on insurance certificates, written estimates, and clear legal names. Winter ice, wind, and tourism peaks near the Hills are planning inputs — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'South Dakota moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical South Dakota local and intrastate patterns; they are not bids. Always compare written estimates and confirm FMCSA authority for any out-of-state leg.',
      stats: [
        {
          label: 'Typical Sioux Falls studio / 1BR',
          value: '$450–$2,000+',
          note: 'Access and winter weather matter',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$1,500–$4,800+',
          note: 'HOAs in growth suburbs',
        },
        {
          label: 'Intrastate long (e.g. Sioux Falls ↔ Rapid City)',
          value: '$2,200–$8,000+',
          note: 'I-90 distance and weather drive hours',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'Hills tourism can create second peaks',
        },
        {
          label: 'Top outbound destinations',
          value: 'MN · TX · AZ · CO · FL · NE',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: String(sdCount),
          note: 'Sioux Falls and Black Hills emphasized',
        },
      ],
    },
    regulations: {
      mode: 'limited_or_none',
      title: 'South Dakota moving regulations & consumer protection',
      intro:
        'South Dakota does not maintain a dedicated household-goods consumer permit board comparable to several neighboring states. Interstate work still requires FMCSA authority. Verify insurance and contracts carefully before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside South Dakota)',
        body: 'If origin or destination is outside South Dakota, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. A South Dakota business registration alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within South Dakota)',
        body: 'Without a strong state HHG permit directory, consumers should insist on written estimates, cargo and liability insurance certificates, and a clear legal business name for pure in-state jobs. Commercial vehicle safety rules still apply; confirm any local licensing requirements with the carrier in writing.',
      },
      verifySteps: [
        'Classify the job: entirely in South Dakota vs any out-of-state leg (FMCSA / USDOT required).',
        'Copy the exact legal name from the written estimate.',
        'Interstate: look up USDOT / MC on FMCSA SAFER before deposits.',
        'Intrastate: request insurance certificates, written inventory estimates, and business credentials.',
        'Confirm rural driveway and Black Hills access for your addresses.',
        'Avoid large cash deposits to unverified operators.',
      ],
      protections: [
        {
          title: 'No dedicated HHG permit board',
          detail:
            'South Dakota does not publish a California-style dedicated household-goods consumer license directory — do not invent a permit number that does not exist.',
        },
        {
          title: 'FMCSA for interstate moves',
          detail:
            'Any move that crosses a state line is generally under federal household goods rules — verify active FMCSA authority on SAFER.',
        },
        {
          title: 'Written estimates and insurance',
          detail:
            'Without a strong state HHG license lookup, written estimates and cargo/liability insurance certificates are your primary consumer controls on local jobs.',
        },
      ],
      officialLinks: [
        {
          label: 'FMCSA SAFER — USDOT lookup',
          href: 'https://safer.fmcsa.dot.gov/',
          external: true,
        },
        {
          label: 'FMCSA — Protect Your Move',
          href: 'https://www.fmcsa.dot.gov/protect-your-move',
          external: true,
        },
        { label: 'Move Trust Hub — Verify a USDOT', href: '/verify-dot' },
        {
          label: 'Move Trust Hub — How we score movers',
          href: '/about/how-we-score-movers',
        },
      ],
      disclaimer:
        'Regulatory frameworks can change. Always verify current commercial credentials and FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('south-dakota', [
      {
        key: 'sioux-falls-east',
        id: 'sioux-falls-east',
        name: 'Sioux Falls & East River',
        shortName: 'East River',
        blurb:
          'Minnehaha, Lincoln, and east-river counties with multi-unit access and Iowa/Minnesota-border hops.',
        challenges: [
          'Short IA/MN hops need FMCSA authority',
          'Winter ice and growth-suburb HOAs',
        ],
        ctaLabel: 'Explore East River',
      },
      {
        key: 'pierre-central',
        id: 'pierre-central',
        name: 'Pierre & Central South Dakota',
        shortName: 'Central',
        blurb:
          'Hughes and central prairie counties with longer regional hauls and thinner fleets.',
        challenges: [
          'Long empty miles',
          'Confirm coverage for rural addresses',
        ],
        ctaLabel: 'Explore Central',
      },
      {
        key: 'black-hills-west',
        id: 'black-hills-west',
        name: 'Rapid City & Black Hills',
        shortName: 'Black Hills',
        blurb:
          'Pennington, Meade, Lawrence, and western counties with tourism peaks and hill access.',
        challenges: [
          'Tourism-season congestion',
          'Hill driveways and winter weather',
        ],
        ctaLabel: 'Explore Black Hills',
      },
    ]),
    costs: {
      title: 'South Dakota moving costs',
      intro:
        'South Dakota pricing reflects Sioux Falls labor markets, winter weather, and long I-90 hauls to the Black Hills. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate South Dakota moving costs',
        lastReviewed: '2026-07-23',
        body: 'These ranges are planning estimates, not quotes. They combine typical South Dakota local and intrastate patterns: home size, distance, winter access, packing, and regional labor. Actual bids vary with season and tourism peaks. Always compare written estimates and confirm FMCSA authority for any out-of-state leg.',
      },
      ranges: [
        {
          label: 'Sioux Falls studio / 1BR',
          value: '$450–$2,000+',
          note: 'Access and season dominate',
        },
        {
          label: 'Suburban 2–3BR house',
          value: '$1,500–$4,500+',
          note: 'HOAs in growth suburbs',
        },
        {
          label: 'Intrastate mid-size (e.g. Sioux Falls ↔ Brookings)',
          value: '$1,500–$4,800+',
          note: 'Season matters',
        },
        {
          label: 'Intrastate long (e.g. Sioux Falls ↔ Rapid City)',
          value: '$2,200–$8,000+',
          note: 'I-90 distance drives hours',
        },
        {
          label: 'Typical 2–3 person crew (Sioux Falls)',
          value: '$110–$200+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'Winter ice and wind force flexible dates.',
        'Black Hills tourism can tighten summer crews.',
        'Long empty miles between Sioux Falls and Rapid City raise portal-to-portal time.',
        'Growth suburbs add HOA elevator windows.',
        'Short hops into MN, IA, NE, ND, MT, or WY are interstate even when nearby.',
      ],
    },
    routes: {
      title: 'Popular South Dakota moving routes',
      intro:
        'South Dakota sees outbound Sun Belt flows, short interstate hops into Minnesota and Iowa, and large Sioux Falls–Rapid City internal traffic. Interstate jobs need FMCSA authority; local jobs need careful insurance and contract verification.',
      migrationProfile: 'outbound_dominant',
      outbound: [
        {
          label: 'South Dakota → Minnesota / Iowa',
          href: '/local-movers/minnesota',
          origins: 'Sioux Falls metro',
          transit: 'Often same-day interstate',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Highest-volume short outbound corridors.',
        },
        {
          label: 'South Dakota → Texas / Arizona / Florida',
          href: '/local-movers/texas',
          origins: 'Statewide metros',
          transit: 'Multi-day interstate',
          planningNote: 'Book early for seasonal peaks.',
          note: 'Popular lifestyle outbound destinations.',
        },
        {
          label: 'South Dakota → Colorado / Wyoming',
          href: '/local-movers/colorado',
          origins: 'Rapid City, west river',
          transit: 'Multi-day interstate',
          planningNote: 'Confirm FMCSA authority end-to-end.',
          note: 'Common Mountain West hops.',
        },
      ],
      inbound: [
        {
          label: 'Moving to Minnehaha County (Sioux Falls)',
          href: '/local-movers/south-dakota/minnehaha',
          note: 'Multi-unit access and growth suburbs.',
        },
        {
          label: 'Moving to Pennington County (Rapid City)',
          href: '/local-movers/south-dakota/pennington',
          note: 'Black Hills access and tourism peaks.',
        },
        {
          label: 'Moving to Lincoln County',
          href: '/local-movers/south-dakota/lincoln',
          note: 'Sioux Falls south-metro growth corridors.',
        },
      ],
    },
    challenges: {
      title: 'South Dakota-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real South Dakota moves — not generic national checklist filler.',
      items: [
        {
          title: 'Winter ice and wind',
          detail:
            'Prairie weather can cancel move days with little notice. Build buffers November–March.',
        },
        {
          title: 'Sioux Falls–Rapid City distance',
          detail:
            'I-90 hauls create long empty miles. Get inventory-based written estimates.',
        },
        {
          title: 'Limited state HHG permit regime',
          detail:
            'Without a dedicated consumer HHG license lookup, demand insurance certificates, written estimates, and FMCSA checks for any border hop.',
        },
        {
          title: 'Black Hills tourism peaks',
          detail:
            'Summer congestion can slow trucks and lodging for crews. Avoid Friday arrivals when possible.',
        },
        {
          title: 'Short interstate hops',
          detail:
            'Moves into Minnesota, Iowa, Nebraska, or North Dakota are interstate even if short. Confirm FMCSA authority before deposits.',
        },
      ],
    },
    tools: SHARED_TOOLS('South Dakota'),
    faq: [
      {
        question: 'Do South Dakota movers need a special household goods license?',
        answer:
          'South Dakota does not operate a dedicated household-goods consumer permit board comparable to some neighboring states. Consumers should still verify insurance, written contracts, and FMCSA authority for any out-of-state leg.',
      },
      {
        question: 'How do I verify a South Dakota mover for an interstate move?',
        answer:
          'Look up USDOT / MC authority on FMCSA SAFER for the legal name on your estimate. Also request certificates of insurance and written inventory estimates.',
      },
      {
        question: 'How much does a local Sioux Falls move cost?',
        answer:
          'Planning ranges often fall around $450–$2,000+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates.',
      },
      {
        question: 'Is a Sioux Falls-to-Rapid City move interstate?',
        answer:
          'No — both ends are in South Dakota. Focus on weather windows, packing, and inventory-based written estimates for the long haul.',
      },
      {
        question: 'When is peak moving season in South Dakota?',
        answer:
          'Statewide peak is typically May–September. Black Hills tourism can create additional summer demand.',
      },
      {
        question: 'Does a Sioux Falls-to-Sioux City move need FMCSA authority?',
        answer:
          'Yes. Crossing into Iowa is interstate even for relatively short hauls. Confirm active FMCSA operating authority.',
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
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        {
          label: 'FMCSA — Protect Your Move',
          href: 'https://www.fmcsa.dot.gov/protect-your-move',
        },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  },

  maine: {
    stateSlug: 'maine',
    stateCode: 'ME',
    h1: `Maine Moving Resource Hub: Costs, FMCSA Checks & ${meCount} County Guides`,
    metaTitle: `Maine Movers Guide 2026 — Costs, Insurance Checks & ${meCount} County Guides`,
    metaDescription:
      'Plan a move within, to, or from Maine. Compare local and intrastate costs, understand Maine’s limited dedicated HHG licensing versus FMCSA interstate rules, browse 16 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for Maine moves in 2026 — typical costs, FMCSA-first verification for interstate work, Portland-to-Aroostook regional guides, and tools to compare movers without paid placements.',
    trustBar: [
      `${meCount} County Guides`,
      'Verified Movers',
      'FMCSA-Focused Checks',
      'Updated 2026',
    ],
    intents: intents('Maine'),
    primaryCta: {
      label: 'Calculate My Maine Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in Maine is different',
      paragraphs: [
        'Maine is not one moving market. Portland multi-unit and coastal access, midcoast tourism peaks, Bangor corridors, and long Aroostook hauls produce different access and labor profiles under one state name — with only 16 counties but huge distances north to south.',
        'Maine does not require a separate intrastate household goods mover license comparable to Massachusetts DPU or New Hampshire frameworks in many consumer sources. Interstate jobs need FMCSA authority. For in-state work, insist on insurance certificates, written estimates, and clear legal names. Winter ice, ferry logistics, and thin northern coverage are planning inputs — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'Maine moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical Maine local and intrastate patterns; they are not bids. Always compare written estimates and confirm FMCSA authority for any out-of-state leg.',
      stats: [
        {
          label: 'Typical Portland studio / 1BR',
          value: '$550–$2,400+',
          note: 'Stairs, elevators, and winter staging',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$1,700–$5,200+',
          note: 'Coastal access and HOAs vary',
        },
        {
          label: 'Intrastate long (e.g. Portland ↔ Bangor or Aroostook)',
          value: '$2,000–$7,500+',
          note: 'Distance and weather drive hours',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'Coastal tourism compresses summer crews',
        },
        {
          label: 'Top outbound destinations',
          value: 'FL · NH · MA · NC · SC · TX',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: String(meCount),
          note: 'Southern Maine emphasized',
        },
      ],
    },
    regulations: {
      mode: 'limited_or_none',
      title: 'Maine moving regulations & consumer protection',
      intro:
        'Maine does not maintain a dedicated household-goods consumer permit board for most local movers according to commonly cited BMV and industry summaries. Interstate work still requires FMCSA authority. Verify insurance and contracts carefully before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside Maine)',
        body: 'If origin or destination is outside Maine, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. A Maine business registration alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within Maine)',
        body: 'Without a strong state HHG permit directory, consumers should insist on written estimates, cargo and liability insurance certificates, and a clear legal business name for pure in-state jobs. Confirm any municipal parking or street-permit rules in Portland and coastal towns separately.',
      },
      verifySteps: [
        'Classify the job: entirely in Maine vs any out-of-state leg (FMCSA / USDOT required).',
        'Copy the exact legal name from the written estimate.',
        'Interstate: look up USDOT / MC on FMCSA SAFER before deposits.',
        'Intrastate: request insurance certificates, written inventory estimates, and business credentials.',
        'Confirm coastal, ferry, and northern driveway access for your addresses.',
        'Avoid large cash deposits to unverified operators.',
      ],
      protections: [
        {
          title: 'No separate intrastate HHG license (typical guidance)',
          detail:
            'Consumer sources commonly state Maine does not require a separate intrastate household goods mover license — do not invent a permit number that does not exist.',
        },
        {
          title: 'FMCSA for interstate moves',
          detail:
            'Any move that crosses a state line is generally under federal household goods rules — verify active FMCSA authority on SAFER.',
        },
        {
          title: 'Written estimates and insurance',
          detail:
            'Without a strong state HHG license lookup, written estimates and cargo/liability insurance certificates are your primary consumer controls on local jobs.',
        },
      ],
      officialLinks: [
        {
          label: 'FMCSA SAFER — USDOT lookup',
          href: 'https://safer.fmcsa.dot.gov/',
          external: true,
        },
        {
          label: 'FMCSA — Protect Your Move',
          href: 'https://www.fmcsa.dot.gov/protect-your-move',
          external: true,
        },
        { label: 'Move Trust Hub — Verify a USDOT', href: '/verify-dot' },
        {
          label: 'Move Trust Hub — How we score movers',
          href: '/about/how-we-score-movers',
        },
      ],
      disclaimer:
        'Regulatory frameworks can change. Always verify current commercial credentials and FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('maine', [
      {
        key: 'southern-me',
        id: 'southern-me',
        name: 'Southern Maine',
        shortName: 'Southern ME',
        blurb:
          'Cumberland, York, and southern counties with Portland multi-unit logistics and NH-border hops.',
        challenges: [
          'Elevators, tight streets, and winter ice',
          'Short NH hops need FMCSA authority',
        ],
        ctaLabel: 'Explore Southern Maine',
      },
      {
        key: 'midcoast-central',
        id: 'midcoast-central',
        name: 'Midcoast & Central Maine',
        shortName: 'Midcoast / Central',
        blurb:
          'Kennebec, midcoast, and central counties with tourism peaks and mixed rural access.',
        challenges: [
          'Summer tourism congestion',
          'Confirm coverage for rural addresses',
        ],
        ctaLabel: 'Explore Midcoast / Central',
      },
      {
        key: 'downeast-north',
        id: 'downeast-north',
        name: 'Downeast & Northern Maine',
        shortName: 'Downeast / North',
        blurb:
          'Penobscot, Hancock, Washington, and Aroostook with long hauls and thinner fleets.',
        challenges: [
          'Long empty miles from Portland fleets',
          'Winter weather and remote access',
        ],
        ctaLabel: 'Explore Downeast / North',
      },
    ]),
    costs: {
      title: 'Maine moving costs',
      intro:
        'Maine pricing reflects Portland labor markets, winter weather, coastal access, and long north–south hauls. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate Maine moving costs',
        lastReviewed: '2026-07-23',
        body: 'These ranges are planning estimates, not quotes. They combine typical Maine local and intrastate patterns: home size, distance, stairs/elevators, parking, winter weather, coastal access, and regional labor. Actual bids vary with season and tourism peaks. Always compare written estimates and confirm FMCSA authority for any out-of-state leg.',
      },
      ranges: [
        {
          label: 'Portland studio / 1BR',
          value: '$550–$2,400+',
          note: 'Stairs and winter access dominate',
        },
        {
          label: 'Suburban 2–3BR house',
          value: '$1,700–$5,000+',
          note: 'Coastal access varies',
        },
        {
          label: 'Intrastate mid-size (e.g. Portland ↔ Augusta)',
          value: '$1,600–$5,000+',
          note: 'Season matters',
        },
        {
          label: 'Intrastate long (e.g. Portland ↔ Bangor or Aroostook)',
          value: '$2,200–$7,500+',
          note: 'Distance and weather push hours',
        },
        {
          label: 'Typical 2–3 person crew (Portland metro)',
          value: '$125–$230+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'Winter ice and snow force flexible dates statewide.',
        'Portland multi-unit buildings add stair and elevator time.',
        'Coastal tourism compresses summer crews.',
        'Northern and Downeast jobs include long empty miles.',
        'Short hops into NH, MA, or Canada-adjacent logistics need careful authority checks.',
      ],
    },
    routes: {
      title: 'Popular Maine moving routes',
      intro:
        'Maine sees strong outbound Sun Belt and New England flows, short interstate hops into New Hampshire and Massachusetts, and large Portland–Bangor internal traffic. Interstate jobs need FMCSA authority; local jobs need careful insurance and contract verification.',
      migrationProfile: 'outbound_dominant',
      outbound: [
        {
          label: 'Maine → Florida / Carolinas',
          href: '/moving-to/florida',
          origins: 'Portland, midcoast',
          transit: 'Multi-day I-95',
          planningNote: 'Book early for winter arrivals.',
          note: 'High-volume Northeast snowbird corridor.',
        },
        {
          label: 'Maine → New Hampshire / Massachusetts',
          href: '/local-movers/new-hampshire',
          origins: 'York, Cumberland',
          transit: 'Often same-day interstate',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Common short cross-border metro moves.',
        },
        {
          label: 'Maine → Texas / Arizona',
          href: '/local-movers/texas',
          origins: 'Statewide',
          transit: 'Multi-day interstate',
          planningNote: 'Confirm FMCSA authority end-to-end.',
          note: 'Popular long-haul outbound destinations.',
        },
      ],
      inbound: [
        {
          label: 'Moving to Cumberland County (Portland)',
          href: '/local-movers/maine/cumberland',
          note: 'Multi-unit access and coastal logistics.',
        },
        {
          label: 'Moving to York County',
          href: '/local-movers/maine/york',
          note: 'Southern suburbs and NH-border patterns.',
        },
        {
          label: 'Moving to Penobscot County (Bangor)',
          href: '/local-movers/maine/penobscot',
          note: 'Central hub for Downeast and northern approaches.',
        },
      ],
    },
    challenges: {
      title: 'Maine-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real Maine moves — not generic national checklist filler.',
      items: [
        {
          title: 'Winter ice and snow',
          detail:
            'Driveways and coastal roads can ice over for days. Build weather buffers November–March.',
        },
        {
          title: 'Portland multi-unit access',
          detail:
            'Stairs, elevators, and tight streets dominate. Share approach photos early.',
        },
        {
          title: 'Limited state HHG permit regime',
          detail:
            'Without a dedicated consumer HHG license lookup, demand insurance certificates, written estimates, and FMCSA checks for any border hop.',
        },
        {
          title: 'Coastal tourism peaks',
          detail:
            'Summer congestion can double transit time midcoast. Avoid Friday arrivals when possible.',
        },
        {
          title: 'Northern empty miles',
          detail:
            'Aroostook and Downeast jobs create long empty miles from Portland fleets. Confirm coverage early.',
        },
      ],
    },
    tools: SHARED_TOOLS('Maine'),
    faq: [
      {
        question: 'Do Maine movers need a special household goods license?',
        answer:
          'Consumer sources commonly state Maine does not require a separate intrastate household goods mover license. Consumers should still verify insurance, written contracts, and FMCSA authority for any out-of-state leg.',
      },
      {
        question: 'How do I verify a Maine mover for an interstate move?',
        answer:
          'Look up USDOT / MC authority on FMCSA SAFER for the legal name on your estimate. Also request certificates of insurance and written inventory estimates.',
      },
      {
        question: 'How much does a local Portland move cost?',
        answer:
          'Planning ranges often fall around $550–$2,400+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates.',
      },
      {
        question: 'Is a Portland-to-Bangor move interstate?',
        answer:
          'No — both ends are in Maine. Focus on weather windows, packing, and inventory-based written estimates for the haul.',
      },
      {
        question: 'When is peak moving season in Maine?',
        answer:
          'Statewide peak is typically May–September. Coastal tourism can create additional summer demand.',
      },
      {
        question: 'Does a Kittery-to-Portsmouth move need FMCSA authority?',
        answer:
          'Yes. Crossing into New Hampshire is interstate even for short hops. Confirm active FMCSA operating authority.',
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
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        {
          label: 'FMCSA — Protect Your Move',
          href: 'https://www.fmcsa.dot.gov/protect-your-move',
        },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  },
};

const fileMap = [
  ['montana', 'montanaStateResourceHub', packs.montana],
  ['wyoming', 'wyomingStateResourceHub', packs.wyoming],
  ['north-dakota', 'northDakotaStateResourceHub', packs['north-dakota']],
  ['south-dakota', 'southDakotaStateResourceHub', packs['south-dakota']],
  ['maine', 'maineStateResourceHub', packs.maine],
];

for (const [file, varName, pack] of fileMap) {
  const seen = new Set();
  let dups = 0;
  for (const r of pack.regions) {
    if (!r.countySlugs?.length) throw new Error(`empty region ${r.id} in ${file}`);
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
  writeFileSync(`lib/local-movers/state-resource-hub/${file}.ts`, toTs(varName, pack));
}

// Full registry W1–W9 + CA
writeFileSync(
  'lib/local-movers/state-resource-hub/registry.ts',
  `import { alabamaStateResourceHub } from '@/lib/local-movers/state-resource-hub/alabama';
import { alaskaStateResourceHub } from '@/lib/local-movers/state-resource-hub/alaska';
import { arizonaStateResourceHub } from '@/lib/local-movers/state-resource-hub/arizona';
import { arkansasStateResourceHub } from '@/lib/local-movers/state-resource-hub/arkansas';
import { californiaStateResourceHub } from '@/lib/local-movers/state-resource-hub/california';
import { coloradoStateResourceHub } from '@/lib/local-movers/state-resource-hub/colorado';
import { connecticutStateResourceHub } from '@/lib/local-movers/state-resource-hub/connecticut';
import { floridaStateResourceHub } from '@/lib/local-movers/state-resource-hub/florida';
import { georgiaStateResourceHub } from '@/lib/local-movers/state-resource-hub/georgia';
import { hawaiiStateResourceHub } from '@/lib/local-movers/state-resource-hub/hawaii';
import { idahoStateResourceHub } from '@/lib/local-movers/state-resource-hub/idaho';
import { illinoisStateResourceHub } from '@/lib/local-movers/state-resource-hub/illinois';
import { indianaStateResourceHub } from '@/lib/local-movers/state-resource-hub/indiana';
import { iowaStateResourceHub } from '@/lib/local-movers/state-resource-hub/iowa';
import { kansasStateResourceHub } from '@/lib/local-movers/state-resource-hub/kansas';
import { kentuckyStateResourceHub } from '@/lib/local-movers/state-resource-hub/kentucky';
import { louisianaStateResourceHub } from '@/lib/local-movers/state-resource-hub/louisiana';
import { maineStateResourceHub } from '@/lib/local-movers/state-resource-hub/maine';
import { marylandStateResourceHub } from '@/lib/local-movers/state-resource-hub/maryland';
import { massachusettsStateResourceHub } from '@/lib/local-movers/state-resource-hub/massachusetts';
import { michiganStateResourceHub } from '@/lib/local-movers/state-resource-hub/michigan';
import { minnesotaStateResourceHub } from '@/lib/local-movers/state-resource-hub/minnesota';
import { mississippiStateResourceHub } from '@/lib/local-movers/state-resource-hub/mississippi';
import { missouriStateResourceHub } from '@/lib/local-movers/state-resource-hub/missouri';
import { montanaStateResourceHub } from '@/lib/local-movers/state-resource-hub/montana';
import { nebraskaStateResourceHub } from '@/lib/local-movers/state-resource-hub/nebraska';
import { nevadaStateResourceHub } from '@/lib/local-movers/state-resource-hub/nevada';
import { newJerseyStateResourceHub } from '@/lib/local-movers/state-resource-hub/new-jersey';
import { newMexicoStateResourceHub } from '@/lib/local-movers/state-resource-hub/new-mexico';
import { newYorkStateResourceHub } from '@/lib/local-movers/state-resource-hub/new-york';
import { northCarolinaStateResourceHub } from '@/lib/local-movers/state-resource-hub/north-carolina';
import { northDakotaStateResourceHub } from '@/lib/local-movers/state-resource-hub/north-dakota';
import { ohioStateResourceHub } from '@/lib/local-movers/state-resource-hub/ohio';
import { oklahomaStateResourceHub } from '@/lib/local-movers/state-resource-hub/oklahoma';
import { oregonStateResourceHub } from '@/lib/local-movers/state-resource-hub/oregon';
import { pennsylvaniaStateResourceHub } from '@/lib/local-movers/state-resource-hub/pennsylvania';
import { southCarolinaStateResourceHub } from '@/lib/local-movers/state-resource-hub/south-carolina';
import { southDakotaStateResourceHub } from '@/lib/local-movers/state-resource-hub/south-dakota';
import { tennesseeStateResourceHub } from '@/lib/local-movers/state-resource-hub/tennessee';
import { texasStateResourceHub } from '@/lib/local-movers/state-resource-hub/texas';
import { utahStateResourceHub } from '@/lib/local-movers/state-resource-hub/utah';
import { virginiaStateResourceHub } from '@/lib/local-movers/state-resource-hub/virginia';
import { washingtonStateResourceHub } from '@/lib/local-movers/state-resource-hub/washington';
import { westVirginiaStateResourceHub } from '@/lib/local-movers/state-resource-hub/west-virginia';
import { wisconsinStateResourceHub } from '@/lib/local-movers/state-resource-hub/wisconsin';
import { wyomingStateResourceHub } from '@/lib/local-movers/state-resource-hub/wyoming';
import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

const PACKS: StateResourceHubPack[] = [
  alabamaStateResourceHub,
  alaskaStateResourceHub,
  arizonaStateResourceHub,
  arkansasStateResourceHub,
  californiaStateResourceHub,
  coloradoStateResourceHub,
  connecticutStateResourceHub,
  floridaStateResourceHub,
  georgiaStateResourceHub,
  hawaiiStateResourceHub,
  idahoStateResourceHub,
  illinoisStateResourceHub,
  indianaStateResourceHub,
  iowaStateResourceHub,
  kansasStateResourceHub,
  kentuckyStateResourceHub,
  louisianaStateResourceHub,
  maineStateResourceHub,
  marylandStateResourceHub,
  massachusettsStateResourceHub,
  michiganStateResourceHub,
  minnesotaStateResourceHub,
  mississippiStateResourceHub,
  missouriStateResourceHub,
  montanaStateResourceHub,
  nebraskaStateResourceHub,
  nevadaStateResourceHub,
  newJerseyStateResourceHub,
  newMexicoStateResourceHub,
  newYorkStateResourceHub,
  northCarolinaStateResourceHub,
  northDakotaStateResourceHub,
  ohioStateResourceHub,
  oklahomaStateResourceHub,
  oregonStateResourceHub,
  pennsylvaniaStateResourceHub,
  southCarolinaStateResourceHub,
  southDakotaStateResourceHub,
  tennesseeStateResourceHub,
  texasStateResourceHub,
  utahStateResourceHub,
  virginiaStateResourceHub,
  washingtonStateResourceHub,
  westVirginiaStateResourceHub,
  wisconsinStateResourceHub,
  wyomingStateResourceHub,
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

console.log('registry updated with Wave 9 (46 packs total)');
