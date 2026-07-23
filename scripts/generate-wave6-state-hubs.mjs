/**
 * Wave 6 State Resource Hubs: OR, OK, CT, IA, AR
 * Run: node scripts/generate-wave6-state-hubs.mjs
 * Prerequisites: scripts/tmp-wave6-regions.json (0 orphans / 0 duplicates)
 */
import { readFileSync, writeFileSync } from 'fs';

const regions = JSON.parse(readFileSync('scripts/tmp-wave6-regions.json', 'utf8'));

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
 * Research brief (Wave 6):
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

const orCount = getUniqueCountyCount('oregon');
const okCount = getUniqueCountyCount('oklahoma');
const ctCount = getUniqueCountyCount('connecticut');
const iaCount = getUniqueCountyCount('iowa');
const arCount = getUniqueCountyCount('arkansas');

const packs = {
  oregon: {
    stateSlug: 'oregon',
    stateCode: 'OR',
    h1: `Oregon Moving Resource Hub: Costs, ODOT Certificates & ${orCount} County Guides`,
    metaTitle: `Oregon Movers Guide 2026 — Costs, ODOT HHG Certificates & ${orCount} County Guides`,
    metaDescription:
      'Plan a move within, to, or from Oregon. Compare local and intrastate costs, verify ODOT household goods certificates, browse 36 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for Oregon moves in 2026 — typical costs, ODOT vs FMCSA rules, Portland-to-Bend regional guides, and tools to compare certified movers without paid placements.',
    trustBar: [
      `${orCount} County Guides`,
      'Verified Movers',
      'ODOT & FMCSA Checked',
      'Updated 2026',
    ],
    intents: intents('Oregon'),
    primaryCta: {
      label: 'Calculate My Oregon Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in Oregon is different',
      paragraphs: [
        'Oregon is not one moving market. Portland multi-unit elevators and hills, Willamette Valley college towns, Oregon Coast weather windows, Southern Oregon mountain approaches, Central Oregon high-desert access, and Eastern Oregon long hauls produce different access and labor profiles under one state name.',
        'When origin and destination are both in Oregon, rates and services are regulated by the ODOT Commerce and Compliance Division. Consumers should only use ODOT-certified movers for point-to-point in-state work. Interstate jobs need FMCSA authority. Rain, wildfire-season air quality, and Cascade pass weather are planning inputs — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'Oregon moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical Oregon local and intrastate patterns; they are not bids. Always compare written estimates from ODOT-certified movers for in-state work and FMCSA-authorized carriers for interstate work.',
      stats: [
        {
          label: 'Typical Portland studio / 1BR',
          value: '$600–$2,500+',
          note: 'Hills, elevators, and parking dominate',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$1,900–$5,500+',
          note: 'Metro HOAs common',
        },
        {
          label: 'Intrastate corridor (e.g. Portland ↔ Bend)',
          value: '$2,200–$7,000+',
          note: 'Passes and weather matter',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'Rain can force flexible dates year-round',
        },
        {
          label: 'Top inbound origins',
          value: 'CA · WA · TX · AZ · IL',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: String(orCount),
          note: 'Portland metro emphasized',
        },
      ],
    },
    regulations: {
      mode: 'strong_state_regulator',
      title: 'Oregon moving regulations & consumer protection',
      intro:
        'Oregon requires household goods movers operating point-to-point within the state to be certified by the ODOT Commerce and Compliance Division. Match the certificate to the job before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside Oregon)',
        body: 'If origin or destination is outside Oregon, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. An ODOT household goods certificate alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within Oregon)',
        body: 'When the origin and destination of a move are within Oregon, moving company rates and services are regulated by ODOT Commerce and Compliance. Consumers should ask for the certificate number and use only ODOT-certified movers. Certified carriers operate under approved tariffs and insurance/bond expectations; uncertified operation can trigger civil penalties.',
      },
      verifySteps: [
        'Classify the job: entirely in Oregon (ODOT certificate) vs any out-of-state leg (FMCSA / USDOT).',
        'Copy the exact legal name from the written estimate.',
        'Intrastate: confirm ODOT household goods certification and ask for the certificate number.',
        'Interstate: look up USDOT / MC on FMCSA SAFER.',
        'Ask for the General Information Bulletin materials carriers are expected to provide shippers.',
        'Avoid large cash deposits to unverified operators; report issues to consumer protection channels when needed.',
      ],
      protections: [
        {
          title: 'ODOT certification requirement',
          detail:
            'ODOT consumer guidance states that for moves from point to point within Oregon, you should only use a mover certified by ODOT and ask for its certificate number.',
        },
        {
          title: 'Approved tariffs and consumer bulletin',
          detail:
            'Authorized intrastate household goods carriers operate under approved rate/tariff frameworks and must provide shippers the General Information Bulletin for Moving Household Goods in Oregon.',
        },
        {
          title: 'Enforcement against uncertified movers',
          detail:
            'Operating without proper authority can result in citations and civil penalties; ODOT partners with local law enforcement on unauthorized mover operations.',
        },
      ],
      officialLinks: [
        {
          label: 'ODOT — Household goods moving',
          href: 'https://www.oregon.gov/odot/mct/pages/household-goods-moving.aspx',
          external: true,
        },
        {
          label: 'ODOT — Household goods mover application process',
          href: 'https://www.oregon.gov/odot/mct/pages/household-goods-mover-application-process.aspx',
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
        'Licensing rules and directories can change. Always verify current ODOT certificate status or FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('oregon', [
      {
        key: 'portland-metro',
        id: 'portland-metro',
        name: 'Portland Metro',
        shortName: 'Portland Metro',
        blurb:
          'Multnomah, Washington, Clackamas, and neighbors with hills, multi-unit elevators, and dense suburbs.',
        challenges: [
          'Hills, elevators, and tight street staging',
          'Bridge and freeway congestion',
        ],
        ctaLabel: 'Explore Portland Metro',
      },
      {
        key: 'willamette-valley',
        id: 'willamette-valley',
        name: 'Willamette Valley',
        shortName: 'Willamette Valley',
        blurb:
          'Salem, Eugene, Corvallis, and valley counties with college peaks and I-5 corridor logistics.',
        challenges: [
          'Campus lease-cycle peaks',
          'Rain delays and soft ground access',
        ],
        ctaLabel: 'Explore Willamette Valley',
      },
      {
        key: 'oregon-coast',
        id: 'oregon-coast',
        name: 'Oregon Coast',
        shortName: 'Oregon Coast',
        blurb:
          'Clatsop to Curry coastal counties with weather exposure, bridges, and thinner coverage in places.',
        challenges: [
          'Coastal weather and wind delays',
          'Confirm mover coverage for remote addresses',
        ],
        ctaLabel: 'Explore Oregon Coast',
      },
      {
        key: 'southern-or',
        id: 'southern-or',
        name: 'Southern Oregon',
        shortName: 'Southern OR',
        blurb:
          'Medford, Grants Pass, and southern mountain approaches with longer regional hauls.',
        challenges: [
          'Mountain pass weather',
          'Distance from Portland fleets',
        ],
        ctaLabel: 'Explore Southern Oregon',
      },
      {
        key: 'central-or',
        id: 'central-or',
        name: 'Central Oregon',
        shortName: 'Central OR',
        blurb:
          'Bend–Deschutes high desert, Cascades approaches, and recreation-season demand.',
        challenges: [
          'Cascade pass weather on I-84/US routes',
          'Seasonal recreation peaks',
        ],
        ctaLabel: 'Explore Central Oregon',
      },
      {
        key: 'eastern-or',
        id: 'eastern-or',
        name: 'Eastern Oregon',
        shortName: 'Eastern OR',
        blurb:
          'Pendleton, Baker, and eastern counties with long portal-to-portal distances and rural access.',
        challenges: [
          'Long empty miles and fuel time',
          'Confirm coverage early',
        ],
        ctaLabel: 'Explore Eastern Oregon',
      },
    ]),
    costs: {
      title: 'Oregon moving costs',
      intro:
        'Oregon pricing reflects Portland labor markets, hills/elevators, rain delays, mountain passes, and coastal logistics. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate Oregon moving costs',
        lastReviewed: '2026-07-23',
        body: 'These ranges are planning estimates, not quotes. They combine typical Oregon local and intrastate patterns: home size, distance, hills/elevators, parking, HOAs, weather, and regional labor. Actual bids vary under ODOT tariff frameworks for certified intrastate movers. Always compare written estimates from ODOT-certified movers for in-state work and FMCSA-authorized carriers for interstate work.',
      },
      ranges: [
        {
          label: 'Portland studio / 1BR',
          value: '$600–$2,500+',
          note: 'Hills and elevators dominate',
        },
        {
          label: 'Suburban 2–3BR house',
          value: '$1,800–$5,200+',
          note: 'Metro HOAs common',
        },
        {
          label: 'Intrastate mid-size (e.g. Portland ↔ Salem or Eugene)',
          value: '$1,800–$5,500+',
          note: 'Season and packing matter',
        },
        {
          label: 'Intrastate long (e.g. Portland ↔ Bend or Medford)',
          value: '$2,400–$8,000+',
          note: 'Passes and weather matter',
        },
        {
          label: 'Typical 2–3 person crew (Portland metro)',
          value: '$140–$250+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'Portland hills and multi-unit elevators add labor time.',
        'Rain can slow outdoor work and force flexible dates.',
        'Cascade and mountain passes affect east–west hauls in winter.',
        'Wildfire-season air quality can delay summer jobs.',
        'Coastal wind and bridge timing change coastal job plans.',
      ],
    },
    routes: {
      title: 'Popular Oregon moving routes',
      intro:
        'Oregon is a major West Coast destination with strong California and Washington flows plus large Portland–Bend–Eugene internal traffic. Interstate jobs need FMCSA authority; in-state corridors need ODOT-certified movers.',
      migrationProfile: 'inbound_dominant',
      outbound: [
        {
          label: 'Oregon → Washington',
          href: '/local-movers/washington',
          origins: 'Portland metro, Northern OR',
          transit: 'Often same-day interstate via I-5',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Common short outbound hop from Portland.',
        },
        {
          label: 'Oregon → California',
          href: '/local-movers/california',
          origins: 'Portland, Southern OR',
          transit: 'Multi-day I-5 corridor',
          planningNote: 'CA second hops may need BHGS for in-CA legs.',
          note: 'Bi-directional West Coast traffic is common.',
        },
        {
          label: 'Oregon → Arizona / Texas',
          href: '/local-movers/arizona',
          origins: 'Portland, Bend',
          transit: 'Multi-day interstate',
          planningNote: 'Confirm FMCSA authority end-to-end.',
          note: 'Popular lifestyle outbound destinations.',
        },
      ],
      inbound: [
        {
          label: 'California → Oregon',
          href: '/local-movers/oregon/multnomah',
          origins: 'Bay Area, LA, San Diego',
          transit: 'Multi-day I-5',
          planningNote: 'High-volume inbound into Portland metro.',
          note: 'Confirm interstate FMCSA authority.',
        },
        {
          label: 'Moving to Multnomah County (Portland)',
          href: '/local-movers/oregon/multnomah',
          note: 'Hills, elevators, and dense multi-unit access.',
        },
        {
          label: 'Moving to Deschutes County (Bend)',
          href: '/local-movers/oregon/deschutes',
          note: 'High-desert access and recreation-season peaks.',
        },
      ],
    },
    challenges: {
      title: 'Oregon-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real Oregon moves — not generic national checklist filler.',
      items: [
        {
          title: 'Portland hills and multi-unit access',
          detail:
            'Elevators, long carries, and limited truck staging are common. Share approach photos early.',
        },
        {
          title: 'Rain and flexible dates',
          detail:
            'Wet weather can slow outdoor work year-round. Build schedule buffers rather than rigid single-day plans.',
        },
        {
          title: 'Mountain passes and high desert',
          detail:
            'Portland–Bend and eastbound routes can close or slow trucks in winter. Confirm pass status before booking.',
        },
        {
          title: 'Wildfire-season air quality',
          detail:
            'Summer smoke can delay outdoor labor. Keep a backup date for July–September jobs.',
        },
        {
          title: 'ODOT certificate verification',
          detail:
            'Confirm the exact legal name is ODOT-certified before deposits on pure in-state work.',
        },
      ],
    },
    tools: SHARED_TOOLS('Oregon'),
    faq: [
      {
        question: 'Do Oregon movers need an ODOT certificate?',
        answer:
          'Yes. For point-to-point moves within Oregon, consumers should use movers certified by ODOT Commerce and Compliance. Interstate moves require FMCSA authority.',
      },
      {
        question: 'How do I verify an Oregon mover?',
        answer:
          'Ask for the ODOT certificate number and confirm certification via ODOT household goods moving resources. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER.',
      },
      {
        question: 'How much does a local Portland move cost?',
        answer:
          'Planning ranges often fall around $600–$2,500+ for a studio/1BR and more for larger homes, driven by hills, elevators, and season. Use the calculator, then compare written estimates.',
      },
      {
        question: 'Is a Portland-to-Bend move intrastate?',
        answer:
          'Yes — both ends are in Oregon, so you generally need an ODOT-certified household goods mover.',
      },
      {
        question: 'When is peak moving season in Oregon?',
        answer:
          'Statewide peak is typically May–September. Rain can force flexible dates even outside peak.',
      },
      {
        question: 'Does a Portland-to-Vancouver, WA move need FMCSA authority?',
        answer:
          'Yes. Crossing into Washington is interstate even for short hops. Confirm active FMCSA operating authority.',
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
          label: 'ODOT — Household goods moving',
          href: 'https://www.oregon.gov/odot/mct/pages/household-goods-moving.aspx',
        },
        {
          label: 'ODOT — Mover application process',
          href: 'https://www.oregon.gov/odot/mct/pages/household-goods-mover-application-process.aspx',
        },
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  },

  oklahoma: {
    stateSlug: 'oklahoma',
    stateCode: 'OK',
    h1: `Oklahoma Moving Resource Hub: Costs, OCC HHG Certificates & ${okCount} County Guides`,
    metaTitle: `Oklahoma Movers Guide 2026 — Costs, OCC Certificates & ${okCount} County Guides`,
    metaDescription:
      'Plan a move within, to, or from Oklahoma. Compare local and intrastate costs, verify Oklahoma Corporation Commission household goods certificates, browse 77 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for Oklahoma moves in 2026 — typical costs, OCC vs FMCSA rules, OKC-to-Tulsa regional guides, and tools to compare certificated movers without paid placements.',
    trustBar: [
      `${okCount} County Guides`,
      'Verified Movers',
      'OCC & FMCSA Checked',
      'Updated 2026',
    ],
    intents: intents('Oklahoma'),
    primaryCta: {
      label: 'Calculate My Oklahoma Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in Oklahoma is different',
      paragraphs: [
        'Oklahoma is not one moving market. Oklahoma City multi-unit and HOA suburbs, Tulsa river-city stock, Lawton military cycles, college towns, and panhandle long hauls produce different access and labor profiles under one state name.',
        'Intrastate carriers of household goods — even for shipments wholly within city limits — must obtain a Household Goods Certificate from the Oklahoma Corporation Commission (OCC). Interstate jobs need FMCSA authority. Tornado-season weather, summer heat, and I-35/I-40 corridors are planning inputs — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'Oklahoma moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical Oklahoma local and intrastate patterns; they are not bids. Always compare written estimates from OCC-certificated movers for in-state work and FMCSA-authorized carriers for interstate work.',
      stats: [
        {
          label: 'Typical OKC / Tulsa studio / 1BR',
          value: '$450–$2,000+',
          note: 'Stairs and heat matter',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$1,500–$4,800+',
          note: 'Metro HOAs common',
        },
        {
          label: 'Intrastate corridor (e.g. OKC ↔ Tulsa)',
          value: '$1,600–$5,000+',
          note: 'Season and packing drive the spread',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'Heat and storms affect productivity',
        },
        {
          label: 'Top outbound destinations',
          value: 'TX · FL · CO · AR · KS · AZ',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: String(okCount),
          note: 'OKC and Tulsa emphasized',
        },
      ],
    },
    regulations: {
      mode: 'strong_state_regulator',
      title: 'Oklahoma moving regulations & consumer protection',
      intro:
        'Oklahoma requires intrastate household goods carriers — including moves wholly within city limits — to obtain a Household Goods Certificate from the Oklahoma Corporation Commission. Match the certificate to the job before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside Oklahoma)',
        body: 'If origin or destination is outside Oklahoma, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. An OCC household goods certificate alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within Oklahoma)',
        body: 'OCC Transportation Division issues Intrastate Household Goods Carriers Certificates valid for statewide operations. Certificates are issued for a term (initially one year) and must be renewed. Vehicle stamps/copies of certificates are required for equipment operating under the certificate.',
      },
      verifySteps: [
        'Classify the job: entirely in Oklahoma (OCC HHG certificate) vs any out-of-state leg (FMCSA / USDOT).',
        'Copy the exact legal name from the written estimate.',
        'Intrastate: confirm an active OCC Household Goods Certificate for the company.',
        'Interstate: look up USDOT / MC on FMCSA SAFER.',
        'Get written estimates, insurance/valuation clarity, and inventory details.',
        'Avoid large cash deposits to unverified operators.',
      ],
      protections: [
        {
          title: 'OCC Household Goods Certificate',
          detail:
            'Intrastate carriers of household goods — even within city limits — must obtain a Household Goods Certificate from the Oklahoma Corporation Commission.',
        },
        {
          title: 'Statewide certificate scope',
          detail:
            'Household Goods Certificates are valid for statewide operations once issued and must be renewed on the Commission’s schedule.',
        },
        {
          title: 'Vehicle documentation',
          detail:
            'Carriers receive certificate documentation and must keep required copies/stamps for vehicles operated under the certificate.',
        },
      ],
      officialLinks: [
        {
          label: 'OCC — Household goods movers',
          href: 'https://oklahoma.gov/occ/divisions/transportation/household-goods-movers.html',
          external: true,
        },
        {
          label: 'Oklahoma Corporation Commission',
          href: 'https://oklahoma.gov/occ/',
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
        'Licensing rules and fees can change. Always verify current OCC household goods certificate status or FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('oklahoma', [
      {
        key: 'oklahoma-city-metro',
        id: 'oklahoma-city-metro',
        name: 'Oklahoma City Metro',
        shortName: 'OKC Metro',
        blurb:
          'Oklahoma, Cleveland, Canadian, and neighbors with multi-unit access, HOAs, and I-35/I-40 logistics.',
        challenges: [
          'HOA windows in growth suburbs',
          'Tornado-season weather buffers',
        ],
        ctaLabel: 'Explore OKC Metro',
      },
      {
        key: 'tulsa-metro',
        id: 'tulsa-metro',
        name: 'Tulsa Metro',
        shortName: 'Tulsa Metro',
        blurb:
          'Tulsa and surrounding counties with river-city stock, suburbs, and industrial corridors.',
        challenges: [
          'Mixed multi-story and suburban access',
          'I-44 corridor timing',
        ],
        ctaLabel: 'Explore Tulsa Metro',
      },
      {
        key: 'southwest-ok',
        id: 'southwest-ok',
        name: 'Southwest Oklahoma',
        shortName: 'Southwest OK',
        blurb:
          'Lawton, southern plains, and southwest counties with military cycles and longer rural approaches.',
        challenges: [
          'Military PCS timing near Lawton',
          'Confirm coverage for rural addresses',
        ],
        ctaLabel: 'Explore Southwest Oklahoma',
      },
      {
        key: 'northwest-ok',
        id: 'northwest-ok',
        name: 'Northwest Oklahoma & Panhandle',
        shortName: 'Northwest / Panhandle',
        blurb:
          'Enid, Stillwater approaches, and panhandle counties with long portal-to-portal distances.',
        challenges: [
          'Wind and winter weather on plains corridors',
          'Long empty miles from major metros',
        ],
        ctaLabel: 'Explore Northwest / Panhandle',
      },
      {
        key: 'eastern-ok',
        id: 'eastern-ok',
        name: 'Eastern Oklahoma',
        shortName: 'Eastern OK',
        blurb:
          'Muskogee, lake country, and eastern counties with hill access and Arkansas-border hops.',
        challenges: [
          'Hill and lake-road access',
          'Short AR hops need FMCSA authority',
        ],
        ctaLabel: 'Explore Eastern Oklahoma',
      },
    ]),
    costs: {
      title: 'Oklahoma moving costs',
      intro:
        'Oklahoma pricing reflects OKC and Tulsa labor markets, summer heat, storm risk, and long east–west hauls. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate Oklahoma moving costs',
        lastReviewed: '2026-07-23',
        body: 'These ranges are planning estimates, not quotes. They combine typical Oklahoma local and intrastate patterns: home size, distance, stairs, parking, HOAs, heat, storms, and regional labor. Actual bids vary. Always compare written estimates from OCC-certificated movers for in-state work and FMCSA-authorized carriers for interstate work.',
      },
      ranges: [
        {
          label: 'OKC / Tulsa studio / 1BR',
          value: '$450–$2,000+',
          note: 'Access and heat dominate',
        },
        {
          label: 'Suburban 2–3BR house',
          value: '$1,500–$4,500+',
          note: 'HOAs common',
        },
        {
          label: 'Intrastate mid-size (e.g. OKC ↔ Tulsa)',
          value: '$1,600–$5,000+',
          note: 'Season matters',
        },
        {
          label: 'Intrastate long (e.g. OKC ↔ Guymon or Idabel)',
          value: '$2,000–$6,500+',
          note: 'Distance drives hours',
        },
        {
          label: 'Typical 2–3 person crew (major metros)',
          value: '$110–$200+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'Summer heat slows outdoor labor — prefer early starts.',
        'Severe storm seasons can force same-day reschedules.',
        'Metro HOAs add elevator and loading windows.',
        'Panhandle and far-east jobs include long empty miles.',
        'Short hops into TX, KS, AR, or MO are interstate even when nearby.',
      ],
    },
    routes: {
      title: 'Popular Oklahoma moving routes',
      intro:
        'Oklahoma sits between Texas and the Midwest with strong outbound flows to Texas and Florida and large OKC–Tulsa internal traffic. Interstate jobs need FMCSA authority; in-state corridors need OCC-certificated household goods carriers.',
      migrationProfile: 'outbound_dominant',
      outbound: [
        {
          label: 'Oklahoma → Texas',
          href: '/local-movers/texas',
          origins: 'OKC, Tulsa, Southwest OK',
          transit: 'Often same-day or next-day interstate via I-35/I-44',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Highest-volume outbound corridor.',
        },
        {
          label: 'Oklahoma → Florida / Colorado',
          href: '/moving-to/florida',
          origins: 'OKC, Tulsa',
          transit: 'Multi-day interstate',
          planningNote: 'Book early for seasonal peaks.',
          note: 'Popular lifestyle outbound destinations.',
        },
        {
          label: 'Oklahoma → Arkansas / Kansas',
          href: '/local-movers/arkansas',
          origins: 'Eastern and northern OK',
          transit: 'Often same-day interstate',
          planningNote: 'Confirm FMCSA authority even for short hops.',
          note: 'Common cross-border metro moves.',
        },
      ],
      inbound: [
        {
          label: 'Moving to Oklahoma County (OKC)',
          href: '/local-movers/oklahoma/oklahoma',
          note: 'Multi-unit access and dense urban staging.',
        },
        {
          label: 'Moving to Tulsa County',
          href: '/local-movers/oklahoma/tulsa',
          note: 'River-city stock and suburban mix.',
        },
        {
          label: 'Moving to Cleveland County',
          href: '/local-movers/oklahoma/cleveland',
          note: 'Norman–OKC south metro growth corridors.',
        },
      ],
    },
    challenges: {
      title: 'Oklahoma-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real Oklahoma moves — not generic national checklist filler.',
      items: [
        {
          title: 'Severe weather windows',
          detail:
            'Spring storm and tornado seasons can cancel move days with little notice. Build weather buffers March–June.',
        },
        {
          title: 'Summer heat',
          detail:
            'Outdoor labor slows quickly June–August. Prefer early start times and shade staging when possible.',
        },
        {
          title: 'Metro HOA windows',
          detail:
            'OKC and Tulsa growth suburbs often restrict elevator and loading hours. Get rules in writing before booking.',
        },
        {
          title: 'Short interstate hops into Texas',
          detail:
            'Border jobs are still interstate. Confirm FMCSA authority even for a one-hour haul.',
        },
        {
          title: 'OCC certificate verification',
          detail:
            'Confirm the exact legal name holds an active OCC Household Goods Certificate before deposits on in-state work.',
        },
      ],
    },
    tools: SHARED_TOOLS('Oklahoma'),
    faq: [
      {
        question: 'Do Oklahoma movers need an OCC certificate?',
        answer:
          'Yes. Intrastate household goods carriers — including moves within city limits — must obtain a Household Goods Certificate from the Oklahoma Corporation Commission. Interstate moves require FMCSA authority.',
      },
      {
        question: 'How do I verify an Oklahoma mover?',
        answer:
          'Confirm OCC household goods certificate status for the legal name on your estimate via OCC Transportation resources. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER.',
      },
      {
        question: 'How much does a local OKC or Tulsa move cost?',
        answer:
          'Planning ranges often fall around $450–$2,000+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates.',
      },
      {
        question: 'Is an OKC-to-Tulsa move intrastate?',
        answer:
          'Yes — both ends are in Oklahoma, so you generally need an OCC-certificated household goods carrier.',
      },
      {
        question: 'When is peak moving season in Oklahoma?',
        answer:
          'Statewide peak is typically May–September. Heat and storms can affect productivity.',
      },
      {
        question: 'Does an OKC-to-Dallas move need FMCSA authority?',
        answer:
          'Yes. Crossing into Texas is interstate. Confirm active FMCSA operating authority and a USDOT number.',
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
          label: 'OCC — Household goods movers',
          href: 'https://oklahoma.gov/occ/divisions/transportation/household-goods-movers.html',
        },
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  },

  connecticut: {
    stateSlug: 'connecticut',
    stateCode: 'CT',
    h1: `Connecticut Moving Resource Hub: Costs, CTDOT Certificates & ${ctCount} County Guides`,
    metaTitle: `Connecticut Movers Guide 2026 — Costs, HHG Certificates & ${ctCount} County Guides`,
    metaDescription:
      'Plan a move within, to, or from Connecticut. Compare local and intrastate costs, verify Connecticut household goods carrier certificates, browse 8 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for Connecticut moves in 2026 — typical costs, CT household goods vs FMCSA rules, Fairfield-to-New London regional guides, and tools to compare certificated movers without paid placements.',
    trustBar: [
      `${ctCount} County Guides`,
      'Verified Movers',
      'CT Cert & FMCSA Checked',
      'Updated 2026',
    ],
    intents: intents('Connecticut'),
    primaryCta: {
      label: 'Calculate My Connecticut Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in Connecticut is different',
      paragraphs: [
        'Connecticut is not one moving market. Fairfield County NYC-adjacent multi-unit logistics, New Haven and Hartford urban cores, shoreline seasonal congestion, and Litchfield hills produce different access and labor profiles under one state name — even with only eight counties.',
        'Household goods movers operating within Connecticut generally need a Household Goods Carrier Certificate (CTDOT certificate frameworks). Interstate jobs need FMCSA authority. Toll roads, co-op boards, winter ice, and short hops into New York, Massachusetts, and Rhode Island are planning inputs — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'Connecticut moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical Connecticut local and intrastate patterns; they are not bids. Always compare written estimates from certificated movers for in-state work and FMCSA-authorized carriers for interstate work.',
      stats: [
        {
          label: 'Typical Fairfield studio / 1BR',
          value: '$700–$2,900+',
          note: 'Elevators, stairs, and parking dominate',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$2,000–$6,500+',
          note: 'HOAs and long driveways common',
        },
        {
          label: 'Intrastate corridor (e.g. Stamford ↔ Hartford)',
          value: '$1,900–$6,000+',
          note: 'I-95 / I-84 timing matters',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'College and lease peaks compress crews',
        },
        {
          label: 'Top outbound destinations',
          value: 'FL · NY · MA · NC · SC',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: String(ctCount),
          note: 'Fairfield and Hartford emphasized',
        },
      ],
    },
    regulations: {
      mode: 'strong_state_regulator',
      title: 'Connecticut moving regulations & consumer protection',
      intro:
        'Connecticut requires household goods movers operating within the state to hold appropriate Household Goods Carrier Certificate authority under state transportation frameworks. Match the certificate to the job before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside Connecticut)',
        body: 'If origin or destination is outside Connecticut, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. A Connecticut household goods certificate alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within Connecticut)',
        body: 'Movers transporting household goods within Connecticut generally need a Household Goods Carrier Certificate (CTDOT certificate lists and consumer guidance). Confirm the certificate for the legal name on your estimate and get written estimates before hiring.',
      },
      verifySteps: [
        'Classify the job: entirely in Connecticut (state HHG certificate) vs any out-of-state leg (FMCSA / USDOT).',
        'Copy the exact legal name from the written estimate.',
        'Intrastate: confirm a Connecticut Household Goods Carrier Certificate for the company.',
        'Interstate: look up USDOT / MC on FMCSA SAFER.',
        'Get written estimates, insurance certificates, and inventory details.',
        'Avoid large cash deposits to unverified operators.',
      ],
      protections: [
        {
          title: 'Household Goods Carrier Certificate',
          detail:
            'Connecticut consumer materials state movers must have a Household Goods Carrier Certificate or related motor carrier permit authority to transport household goods.',
        },
        {
          title: 'CTDOT certificate listings',
          detail:
            'State resources publish lists of household goods movers with CTDOT certificates for consumer verification.',
        },
        {
          title: 'Written estimates',
          detail:
            'Insist on written estimates and clarity on stairs, elevators, long carries, and packing before signing — especially on Fairfield multi-unit jobs.',
        },
      ],
      officialLinks: [
        {
          label: 'CT.gov — Movers and moving consumer facts',
          href: 'https://portal.ct.gov/dcp/common-elements/consumer-facts-and-contacts/movers-and-moving',
          external: true,
        },
        {
          label: 'CTDOT — Household goods movers with certificate',
          href: 'https://portal.ct.gov/dot/publictrans/bureau-of-public-transportation/household-goods-movers-with-ctdot-cert',
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
        'Licensing rules and directories can change. Always verify current Connecticut household goods certificate status or FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('connecticut', [
      {
        key: 'southwest-ct',
        id: 'southwest-ct',
        name: 'Southwest Connecticut',
        shortName: 'Southwest CT',
        blurb:
          'Fairfield and New Haven with NYC-adjacent multi-unit logistics, shoreline towns, and dense suburbs.',
        challenges: [
          'Elevators, co-ops, and street permits',
          'I-95 congestion windows',
        ],
        ctaLabel: 'Explore Southwest Connecticut',
      },
      {
        key: 'central-ct',
        id: 'central-ct',
        name: 'Central Connecticut',
        shortName: 'Central CT',
        blurb:
          'Hartford, Middlesex, and Tolland with capital-city logistics, suburbs, and I-84 corridors.',
        challenges: [
          'Mixed multi-unit and suburban access',
          'I-84 / I-91 timing',
        ],
        ctaLabel: 'Explore Central Connecticut',
      },
      {
        key: 'eastern-ct',
        id: 'eastern-ct',
        name: 'Eastern Connecticut',
        shortName: 'Eastern CT',
        blurb:
          'New London and Windham with shoreline, casino-corridor traffic, and rural approaches.',
        challenges: [
          'Shoreline seasonal congestion',
          'Confirm coverage for rural addresses',
        ],
        ctaLabel: 'Explore Eastern Connecticut',
      },
      {
        key: 'northwest-ct',
        id: 'northwest-ct',
        name: 'Northwest Connecticut',
        shortName: 'Northwest CT',
        blurb:
          'Litchfield County hills, longer driveways, and thinner local coverage in places.',
        challenges: [
          'Hill driveways and winter ice',
          'Longer regional hauls from the shore',
        ],
        ctaLabel: 'Explore Northwest Connecticut',
      },
    ]),
    costs: {
      title: 'Connecticut moving costs',
      intro:
        'Connecticut pricing reflects Fairfield labor markets, multi-unit access, HOAs, tolls, and winter weather. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate Connecticut moving costs',
        lastReviewed: '2026-07-23',
        body: 'These ranges are planning estimates, not quotes. They combine typical Connecticut local and intrastate patterns: home size, distance, stairs/elevators, parking, HOAs, tolls, seasonality, and regional labor. Actual bids vary. Always compare written estimates from certificated movers for in-state work and FMCSA-authorized carriers for interstate work.',
      },
      ranges: [
        {
          label: 'Fairfield studio / 1BR',
          value: '$700–$2,900+',
          note: 'Elevators and parking dominate',
        },
        {
          label: 'Suburban 2–3BR house',
          value: '$1,900–$5,500+',
          note: 'HOAs and long driveways common',
        },
        {
          label: 'Intrastate mid-size (e.g. New Haven ↔ Hartford)',
          value: '$1,800–$5,500+',
          note: 'I-91 timing matters',
        },
        {
          label: 'Intrastate long (e.g. Stamford ↔ New London)',
          value: '$2,200–$7,000+',
          note: 'I-95 congestion pushes hours',
        },
        {
          label: 'Typical 2–3 person crew (Southwest CT)',
          value: '$150–$270+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'Fairfield multi-unit buildings add elevator and security-desk time.',
        'I-95 congestion changes portal-to-portal hours along the shore.',
        'HOA and co-op rules often require certificates of insurance.',
        'Winter ice can force flexible dates inland and on hills.',
        'Short hops into NY, MA, or RI are interstate even when nearby.',
      ],
    },
    routes: {
      title: 'Popular Connecticut moving routes',
      intro:
        'Connecticut is a high-churn Northeast market with strong outbound Sun Belt flows and constant short interstate hops into New York, Massachusetts, and Rhode Island. Interstate jobs need FMCSA authority; in-state corridors need certificated household goods movers.',
      migrationProfile: 'outbound_dominant',
      outbound: [
        {
          label: 'Connecticut → Florida',
          href: '/moving-to/florida',
          origins: 'Fairfield, Hartford, New Haven',
          transit: 'Multi-day I-95',
          planningNote: 'Book early for winter arrivals.',
          note: 'High-volume Northeast-to-Florida corridor.',
        },
        {
          label: 'Connecticut → Carolinas',
          href: '/local-movers/north-carolina',
          origins: 'Statewide',
          transit: 'I-95 multi-day',
          planningNote: 'HOAs at destination common.',
          note: 'Popular lifestyle outbound destinations.',
        },
        {
          label: 'Connecticut → New York / Massachusetts',
          href: '/local-movers/new-york',
          origins: 'Fairfield, Litchfield, Hartford',
          transit: 'Often same-day interstate',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Short cross-border metro moves are extremely common.',
        },
      ],
      inbound: [
        {
          label: 'Moving to Fairfield County',
          href: '/local-movers/connecticut/fairfield',
          note: 'NYC-adjacent multi-unit and suburban mix.',
        },
        {
          label: 'Moving to Hartford County',
          href: '/local-movers/connecticut/hartford',
          note: 'Capital region logistics and suburbs.',
        },
        {
          label: 'Moving to New Haven County',
          href: '/local-movers/connecticut/new-haven',
          note: 'Urban cores and shoreline communities.',
        },
      ],
    },
    challenges: {
      title: 'Connecticut-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real Connecticut moves — not generic national checklist filler.',
      items: [
        {
          title: 'Fairfield multi-unit access',
          detail:
            'Co-ops and condos often need certificates of insurance, elevator reservations, and strict loading windows. Start paperwork early.',
        },
        {
          title: 'I-95 corridor congestion',
          detail:
            'Shoreline truck timing can double portal-to-portal hours. Avoid peak commute windows when possible.',
        },
        {
          title: 'Short interstate hops',
          detail:
            'Moves into NYC, Westchester, or Massachusetts are interstate even if short. Confirm FMCSA authority before deposits.',
        },
        {
          title: 'Winter ice on hills',
          detail:
            'Litchfield and inland driveways can ice over. Build weather buffers November–March.',
        },
        {
          title: 'Certificate verification',
          detail:
            'Confirm the exact legal name holds a Connecticut Household Goods Carrier Certificate before deposits on in-state work.',
        },
      ],
    },
    tools: SHARED_TOOLS('Connecticut'),
    faq: [
      {
        question: 'Do Connecticut movers need a state certificate?',
        answer:
          'Yes. Household goods movers operating within Connecticut generally need a Household Goods Carrier Certificate. Interstate moves require FMCSA authority.',
      },
      {
        question: 'How do I verify a Connecticut mover?',
        answer:
          'Confirm CT household goods certificate status for the legal name on your estimate using state CTDOT/consumer resources. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER.',
      },
      {
        question: 'How much does a local Fairfield County move cost?',
        answer:
          'Planning ranges often fall around $700–$2,900+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates.',
      },
      {
        question: 'Is a Stamford-to-Hartford move intrastate?',
        answer:
          'Yes — both ends are in Connecticut, so you generally need a certificated household goods mover.',
      },
      {
        question: 'When is peak moving season in Connecticut?',
        answer:
          'Statewide peak is typically May–September, with additional pressure around college and lease turnovers.',
      },
      {
        question: 'Does a Greenwich-to-Westchester move need FMCSA authority?',
        answer:
          'Yes. Crossing into New York is interstate even for short hops. Confirm active FMCSA operating authority.',
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
          label: 'CT.gov — Movers and moving',
          href: 'https://portal.ct.gov/dcp/common-elements/consumer-facts-and-contacts/movers-and-moving',
        },
        {
          label: 'CTDOT — Household goods movers with certificate',
          href: 'https://portal.ct.gov/dot/publictrans/bureau-of-public-transportation/household-goods-movers-with-ctdot-cert',
        },
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  },

  iowa: {
    stateSlug: 'iowa',
    stateCode: 'IA',
    h1: `Iowa Moving Resource Hub: Costs, Iowa DOT HHG Permits & ${iaCount} County Guides`,
    metaTitle: `Iowa Movers Guide 2026 — Costs, Iowa DOT Authority & ${iaCount} County Guides`,
    metaDescription:
      'Plan a move within, to, or from Iowa. Compare local and intrastate costs, verify Iowa DOT household goods motor carrier permits, browse 99 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for Iowa moves in 2026 — typical costs, Iowa DOT vs FMCSA rules, Des Moines-to-Cedar Rapids regional guides, and tools to compare permitted movers without paid placements.',
    trustBar: [
      `${iaCount} County Guides`,
      'Verified Movers',
      'Iowa DOT & FMCSA Checked',
      'Updated 2026',
    ],
    intents: intents('Iowa'),
    primaryCta: {
      label: 'Calculate My Iowa Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in Iowa is different',
      paragraphs: [
        'Iowa is not one moving market. Des Moines multi-unit and HOA suburbs, Cedar Rapids–Iowa City corridor logistics, Quad Cities river approaches, Sioux City border hops, and long prairie hauls produce different access and labor profiles under one state name.',
        'Intrastate for-hire motor carriers of household goods must obtain an Iowa DOT Intrastate Motor Carrier Permit and file tariffs with the Office of Motor Carrier Services. Interstate jobs need FMCSA authority. Winter ice, summer heat, and college lease peaks are planning inputs — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'Iowa moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical Iowa local and intrastate patterns; they are not bids. Always compare written estimates from Iowa DOT-permitted movers for in-state work and FMCSA-authorized carriers for interstate work.',
      stats: [
        {
          label: 'Typical Des Moines studio / 1BR',
          value: '$450–$2,000+',
          note: 'Stairs and winter access matter',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$1,500–$4,800+',
          note: 'Metro HOAs common',
        },
        {
          label: 'Intrastate corridor (e.g. Des Moines ↔ Cedar Rapids)',
          value: '$1,600–$5,000+',
          note: 'Season and packing drive the spread',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'Winter weather forces flexible dates',
        },
        {
          label: 'Top outbound destinations',
          value: 'FL · TX · AZ · IL · MN · MO',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: String(iaCount),
          note: 'Des Moines and Eastern IA emphasized',
        },
      ],
    },
    regulations: {
      mode: 'strong_state_regulator',
      title: 'Iowa moving regulations & consumer protection',
      intro:
        'Iowa requires for-hire motor carriers transporting household goods within the state to hold an Intrastate Motor Carrier Permit from the Iowa DOT Office of Motor Carrier Services and to file household goods tariffs. Match the permit to the job before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside Iowa)',
        body: 'If origin or destination is outside Iowa, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. An Iowa intrastate household goods permit alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within Iowa)',
        body: 'Motor carrier permits are issued for intrastate for-hire transportation including household goods. Household goods carriers must file tariffs stating rates and charges with Iowa DOT Motor Carrier Services; tariffs must be filed, posted, and approved before a permit can be issued. Consumers should confirm permit and written rate clarity before hiring.',
      },
      verifySteps: [
        'Classify the job: entirely in Iowa (Iowa DOT permit + HHG tariff) vs any out-of-state leg (FMCSA / USDOT).',
        'Copy the exact legal name from the written estimate.',
        'Intrastate: confirm Iowa Intrastate Motor Carrier Permit covering household goods.',
        'Interstate: look up USDOT / MC on FMCSA SAFER.',
        'Get written estimates and ask how rates map to the filed tariff.',
        'Avoid large cash deposits to unverified operators.',
      ],
      protections: [
        {
          title: 'Intrastate motor carrier permit',
          detail:
            'Iowa DOT issues motor carrier permits to for-hire carriers transporting household goods and other regulated categories within the state.',
        },
        {
          title: 'Household goods tariff filing',
          detail:
            'Motor carriers of household goods must maintain tariffs on file with Iowa DOT stating rates and charges for services performed under the permit.',
        },
        {
          title: 'Written estimates',
          detail:
            'Insist on written estimates and clarity on stairs, elevators, long carries, and packing before signing.',
        },
      ],
      officialLinks: [
        {
          label: 'Iowa DOT — Motor carriers',
          href: 'https://iowadot.gov/motor-carriers',
          external: true,
        },
        {
          label: 'Iowa DOT — Intrastate for-hire authority guide',
          href: 'https://iowadot.gov/media/1143/download?inline',
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
        'Licensing rules and forms can change. Always verify current Iowa DOT permit status or FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('iowa', [
      {
        key: 'des-moines-central',
        id: 'des-moines-central',
        name: 'Des Moines & Central Iowa',
        shortName: 'Des Moines / Central',
        blurb:
          'Polk, Dallas, Warren, Story, and central counties with multi-unit access, HOAs, and I-35/I-80 logistics.',
        challenges: [
          'HOA windows in growth suburbs',
          'Winter ice and summer heat',
        ],
        ctaLabel: 'Explore Des Moines / Central',
      },
      {
        key: 'eastern-ia',
        id: 'eastern-ia',
        name: 'Eastern Iowa',
        shortName: 'Eastern IA',
        blurb:
          'Cedar Rapids, Iowa City, Quad Cities approaches, and eastern industrial corridors.',
        challenges: [
          'Campus lease-cycle peaks',
          'River-city staging near the Mississippi',
        ],
        ctaLabel: 'Explore Eastern Iowa',
      },
      {
        key: 'western-ia',
        id: 'western-ia',
        name: 'Western Iowa',
        shortName: 'Western IA',
        blurb:
          'Sioux City, Council Bluffs, and western counties with Nebraska-border hops and longer rural hauls.',
        challenges: [
          'Short NE hops need FMCSA authority',
          'Confirm coverage for rural addresses',
        ],
        ctaLabel: 'Explore Western Iowa',
      },
      {
        key: 'northern-ia',
        id: 'northern-ia',
        name: 'Northern Iowa',
        shortName: 'Northern IA',
        blurb:
          'Mason City and northern counties with agricultural corridors and winter exposure.',
        challenges: [
          'Severe winter weather windows',
          'Longer regional hauls to Des Moines',
        ],
        ctaLabel: 'Explore Northern Iowa',
      },
      {
        key: 'southern-ia',
        id: 'southern-ia',
        name: 'Southern Iowa',
        shortName: 'Southern IA',
        blurb:
          'Southern counties with thinner local mover density and longer driveway approaches.',
        challenges: [
          'Confirm mover coverage early',
          'Long portal-to-portal distances',
        ],
        ctaLabel: 'Explore Southern Iowa',
      },
    ]),
    costs: {
      title: 'Iowa moving costs',
      intro:
        'Iowa pricing reflects Des Moines labor markets, winter weather, college peaks, and long cross-state hauls. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate Iowa moving costs',
        lastReviewed: '2026-07-23',
        body: 'These ranges are planning estimates, not quotes. They combine typical Iowa local and intrastate patterns: home size, distance, stairs, parking, HOAs, winter weather, and regional labor. Actual bids vary under permitted tariff frameworks. Always compare written estimates from Iowa DOT-permitted movers for in-state work and FMCSA-authorized carriers for interstate work.',
      },
      ranges: [
        {
          label: 'Des Moines studio / 1BR',
          value: '$450–$2,000+',
          note: 'Access and season dominate',
        },
        {
          label: 'Suburban 2–3BR house',
          value: '$1,500–$4,500+',
          note: 'HOAs common',
        },
        {
          label: 'Intrastate mid-size (e.g. Des Moines ↔ Cedar Rapids)',
          value: '$1,600–$5,000+',
          note: 'Season matters',
        },
        {
          label: 'Intrastate long (e.g. Sioux City ↔ Dubuque)',
          value: '$2,000–$6,500+',
          note: 'Distance drives hours',
        },
        {
          label: 'Typical 2–3 person crew (Des Moines metro)',
          value: '$110–$200+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'Winter ice and snow can erase productivity and force reschedules.',
        'College towns compress August demand along the I-80 corridor.',
        'Metro HOAs add elevator and loading windows.',
        'Border hops into IL, NE, MN, MO, or WI are interstate even when short.',
        'Peak May–September fills crews before winter risk rises.',
      ],
    },
    routes: {
      title: 'Popular Iowa moving routes',
      intro:
        'Iowa sees strong outbound Sun Belt flows and constant short interstate hops into Illinois, Nebraska, Minnesota, Missouri, and Wisconsin, plus large Des Moines–Cedar Rapids internal traffic. Interstate jobs need FMCSA authority; in-state corridors need Iowa DOT-permitted household goods carriers.',
      migrationProfile: 'outbound_dominant',
      outbound: [
        {
          label: 'Iowa → Florida',
          href: '/moving-to/florida',
          origins: 'Des Moines, Eastern IA',
          transit: 'Multi-day; snowbird seasonality',
          planningNote: 'Book early for fall/winter FL arrivals.',
          note: 'High-volume Midwest-to-Florida corridor.',
        },
        {
          label: 'Iowa → Texas / Arizona',
          href: '/local-movers/texas',
          origins: 'Des Moines metro',
          transit: 'Multi-day interstate',
          planningNote: 'Confirm FMCSA authority end-to-end.',
          note: 'Popular job and lifestyle outbound destinations.',
        },
        {
          label: 'Iowa → Illinois / Nebraska / Minnesota',
          href: '/local-movers/illinois',
          origins: 'Eastern, Western, and Northern IA',
          transit: 'Often same-day interstate',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Short cross-border metro moves are common.',
        },
      ],
      inbound: [
        {
          label: 'Moving to Polk County (Des Moines)',
          href: '/local-movers/iowa/polk',
          note: 'Multi-unit access and dense urban staging.',
        },
        {
          label: 'Moving to Linn County (Cedar Rapids)',
          href: '/local-movers/iowa/linn',
          note: 'Eastern corridor industrial and suburban mix.',
        },
        {
          label: 'Moving to Johnson County (Iowa City)',
          href: '/local-movers/iowa/johnson',
          note: 'Campus peaks and mixed multi-unit stock.',
        },
      ],
    },
    challenges: {
      title: 'Iowa-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real Iowa moves — not generic national checklist filler.',
      items: [
        {
          title: 'Winter weather windows',
          detail:
            'Ice and snow can shut down driveway access. Build weather buffers November–March statewide.',
        },
        {
          title: 'College lease peaks',
          detail:
            'Iowa City, Ames, and other campus markets compress August demand. Book early.',
        },
        {
          title: 'Border metro hops',
          detail:
            'Quad Cities, Council Bluffs, and Sioux City jobs often cross state lines. Confirm FMCSA authority before deposits.',
        },
        {
          title: 'Tariff-aware estimates',
          detail:
            'Ask how quoted rates map to the carrier’s Iowa DOT-filed household goods tariff for pure in-state work.',
        },
        {
          title: 'Permit verification',
          detail:
            'Confirm the exact legal name holds an Iowa Intrastate Motor Carrier Permit covering household goods before deposits.',
        },
      ],
    },
    tools: SHARED_TOOLS('Iowa'),
    faq: [
      {
        question: 'Do Iowa movers need a state permit?',
        answer:
          'Yes. For-hire household goods transportation within Iowa generally requires an Intrastate Motor Carrier Permit from Iowa DOT, with household goods tariffs on file. Interstate moves require FMCSA authority.',
      },
      {
        question: 'How do I verify an Iowa mover?',
        answer:
          'Confirm Iowa DOT motor carrier permit status for the legal name on your estimate. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER.',
      },
      {
        question: 'How much does a local Des Moines move cost?',
        answer:
          'Planning ranges often fall around $450–$2,000+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates.',
      },
      {
        question: 'Is a Des Moines-to-Cedar Rapids move intrastate?',
        answer:
          'Yes — both ends are in Iowa, so you generally need an Iowa DOT-permitted household goods carrier.',
      },
      {
        question: 'When is peak moving season in Iowa?',
        answer:
          'Statewide peak is typically May–September. Winter weather can force flexible dates even outside peak.',
      },
      {
        question: 'Does a Council Bluffs-to-Omaha move need FMCSA authority?',
        answer:
          'Yes. Crossing into Nebraska is interstate even for short hops. Confirm active FMCSA operating authority.',
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
          label: 'Iowa DOT — Motor carriers',
          href: 'https://iowadot.gov/motor-carriers',
        },
        {
          label: 'Iowa DOT — Intrastate for-hire authority',
          href: 'https://iowadot.gov/media/1143/download?inline',
        },
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  },

  arkansas: {
    stateSlug: 'arkansas',
    stateCode: 'AR',
    h1: `Arkansas Moving Resource Hub: Costs, ARDOT Intrastate Authority & ${arCount} County Guides`,
    metaTitle: `Arkansas Movers Guide 2026 — Costs, ARDOT Authority & ${arCount} County Guides`,
    metaDescription:
      'Plan a move within, to, or from Arkansas. Compare local and intrastate costs, understand ARDOT intrastate authority for household goods movers, browse 75 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for Arkansas moves in 2026 — typical costs, ARDOT vs FMCSA rules, Little Rock-to-NWA regional guides, and tools to compare authorized movers without paid placements.',
    trustBar: [
      `${arCount} County Guides`,
      'Verified Movers',
      'ARDOT & FMCSA Checked',
      'Updated 2026',
    ],
    intents: intents('Arkansas'),
    primaryCta: {
      label: 'Calculate My Arkansas Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in Arkansas is different',
      paragraphs: [
        'Arkansas is not one moving market. Northwest Arkansas growth corridors, Little Rock capital logistics, Delta agricultural towns, Ozarks hill access, and Texas-border industrial traffic produce different access and labor profiles under one state name.',
        'For-hire household goods movers operating within Arkansas need Intrastate Operating Authority through Arkansas Department of Transportation (ARDOT) permit frameworks for household goods movers. Interstate jobs need FMCSA authority. Summer heat, tornado-season weather, and mountain roads are planning inputs — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'Arkansas moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical Arkansas local and intrastate patterns; they are not bids. Always compare written estimates and confirm ARDOT or FMCSA authority for your route.',
      stats: [
        {
          label: 'Typical Little Rock / NWA studio / 1BR',
          value: '$450–$2,000+',
          note: 'Access and heat matter',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$1,500–$4,800+',
          note: 'NWA HOAs common',
        },
        {
          label: 'Intrastate corridor (e.g. Little Rock ↔ Fayetteville)',
          value: '$1,700–$5,500+',
          note: 'I-40 / I-49 timing matters',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'Heat and storms affect productivity',
        },
        {
          label: 'Top outbound destinations',
          value: 'TX · FL · MO · OK · TN · CO',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: String(arCount),
          note: 'NWA and Central AR emphasized',
        },
      ],
    },
    regulations: {
      mode: 'strong_state_regulator',
      title: 'Arkansas moving regulations & consumer protection',
      intro:
        'Arkansas requires for-hire household goods movers operating within the state to obtain Intrastate Operating Authority through ARDOT permit frameworks for household goods movers. Match authority to the job before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside Arkansas)',
        body: 'If origin or destination is outside Arkansas, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. Arkansas intrastate household goods authority alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within Arkansas)',
        body: 'ARDOT publishes registration forms and intrastate authority processes for for-hire household goods movers and related motor carrier categories. Consumers should confirm the carrier holds appropriate Arkansas intrastate household goods authority and get written estimates before hiring.',
      },
      verifySteps: [
        'Classify the job: entirely in Arkansas (ARDOT intrastate authority) vs any out-of-state leg (FMCSA / USDOT).',
        'Copy the exact legal name from the written estimate.',
        'Intrastate: confirm Arkansas intrastate operating authority for household goods movers.',
        'Interstate: look up USDOT / MC on FMCSA SAFER.',
        'Get written estimates, insurance/valuation clarity, and inventory details.',
        'Avoid large cash deposits to unverified operators.',
      ],
      protections: [
        {
          title: 'Intrastate operating authority',
          detail:
            'ARDOT permit resources include registration pathways for for-hire household goods movers under Arkansas intrastate authority frameworks.',
        },
        {
          title: 'Written estimates',
          detail:
            'Insist on written estimates and clarity on stairs, elevators, long carries, hills, and packing before signing.',
        },
        {
          title: 'Insurance clarity',
          detail:
            'Ask for certificates of insurance and valuation options before move day — especially on longer Ozarks and Delta hauls.',
        },
      ],
      officialLinks: [
        {
          label: 'ARDOT — Permits',
          href: 'https://ardot.gov/permits/',
          external: true,
        },
        {
          label: 'ARDOT — Intrastate authority',
          href: 'https://ardot.gov/divisions/legal/arkansas-intrastate-authority/',
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
        'Licensing rules and forms can change. Always verify current ARDOT intrastate authority or FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('arkansas', [
      {
        key: 'central-ar',
        id: 'central-ar',
        name: 'Central Arkansas',
        shortName: 'Central AR',
        blurb:
          'Little Rock, North Little Rock, and central counties with capital-city logistics and mixed suburbs.',
        challenges: [
          'I-30 / I-40 congestion windows',
          'Heat and humidity productivity loss',
        ],
        ctaLabel: 'Explore Central Arkansas',
      },
      {
        key: 'northwest-ar',
        id: 'northwest-ar',
        name: 'Northwest Arkansas',
        shortName: 'Northwest AR',
        blurb:
          'Benton, Washington, and NWA growth corridors with HOAs, corporate relocations, and hill access.',
        challenges: [
          'HOA windows in growth suburbs',
          'Ozarks hill driveways',
        ],
        ctaLabel: 'Explore Northwest Arkansas',
      },
      {
        key: 'northeast-ar',
        id: 'northeast-ar',
        name: 'Northeast Arkansas',
        shortName: 'Northeast AR',
        blurb:
          'Jonesboro, Delta approaches, and northeast counties with agricultural corridors and Memphis-adjacent patterns.',
        challenges: [
          'Confirm coverage for rural Delta addresses',
          'Short TN/MO hops need FMCSA authority',
        ],
        ctaLabel: 'Explore Northeast Arkansas',
      },
      {
        key: 'south-ar',
        id: 'south-ar',
        name: 'South Arkansas',
        shortName: 'South AR',
        blurb:
          'Pine Bluff, El Dorado, Texarkana approaches, and south counties with longer regional hauls.',
        challenges: [
          'Distance from NWA fleets',
          'Texas-border jobs need FMCSA authority',
        ],
        ctaLabel: 'Explore South Arkansas',
      },
      {
        key: 'north-central-ar',
        id: 'north-central-ar',
        name: 'North-Central Arkansas & Ozarks',
        shortName: 'North-Central / Ozarks',
        blurb:
          'Mountain Home and Ozarks counties with tourism peaks and steep access.',
        challenges: [
          'Mountain roads and steep driveways',
          'Tourism season congestion',
        ],
        ctaLabel: 'Explore North-Central / Ozarks',
      },
    ]),
    costs: {
      title: 'Arkansas moving costs',
      intro:
        'Arkansas pricing reflects NWA and Little Rock labor markets, heat, hills, and long I-40/I-49 hauls. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate Arkansas moving costs',
        lastReviewed: '2026-07-23',
        body: 'These ranges are planning estimates, not quotes. They combine typical Arkansas local and intrastate patterns: home size, distance, stairs, parking, HOAs, hills, heat, and regional labor. Actual bids vary. Always compare written estimates and confirm ARDOT or FMCSA authority for your route.',
      },
      ranges: [
        {
          label: 'Little Rock / NWA studio / 1BR',
          value: '$450–$2,000+',
          note: 'Access and heat dominate',
        },
        {
          label: 'Suburban 2–3BR house',
          value: '$1,500–$4,500+',
          note: 'NWA HOAs common',
        },
        {
          label: 'Intrastate mid-size (e.g. Little Rock ↔ Conway or Hot Springs)',
          value: '$1,500–$4,800+',
          note: 'Season matters',
        },
        {
          label: 'Intrastate long (e.g. Fayetteville ↔ Texarkana or Jonesboro)',
          value: '$2,000–$6,500+',
          note: 'Distance and hills push hours',
        },
        {
          label: 'Typical 2–3 person crew (major metros)',
          value: '$110–$200+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'Summer heat slows outdoor labor — prefer early starts.',
        'NWA HOAs add elevator and loading windows.',
        'Ozarks hills may require smaller trucks or shuttles.',
        'Severe storm seasons can force reschedules.',
        'Border hops into TX, MO, OK, TN, or MS are interstate even when short.',
      ],
    },
    routes: {
      title: 'Popular Arkansas moving routes',
      intro:
        'Arkansas bridges the South and Midwest with strong Northwest Arkansas inbound growth, outbound Texas/Florida flows, and large Little Rock–NWA internal traffic. Interstate jobs need FMCSA authority; in-state corridors need properly authorized for-hire carriers.',
      migrationProfile: 'balanced',
      outbound: [
        {
          label: 'Arkansas → Texas',
          href: '/local-movers/texas',
          origins: 'Little Rock, NWA, South AR',
          transit: 'I-30 / I-49 multi-day or same-day near border',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Highest-volume outbound corridor.',
        },
        {
          label: 'Arkansas → Florida',
          href: '/moving-to/florida',
          origins: 'Central and Northwest AR',
          transit: 'Multi-day interstate',
          planningNote: 'Book early for seasonal peaks.',
          note: 'Common lifestyle outbound route.',
        },
        {
          label: 'Arkansas → Missouri / Oklahoma / Tennessee',
          href: '/local-movers/missouri',
          origins: 'NWA, Northeast AR, West AR',
          transit: 'Often same-day or next-day interstate',
          planningNote: 'Confirm FMCSA authority even for short hops.',
          note: 'Common cross-border metro moves.',
        },
      ],
      inbound: [
        {
          label: 'Moving to Benton County',
          href: '/local-movers/arkansas/benton',
          note: 'NWA growth suburbs and HOA calendars.',
        },
        {
          label: 'Moving to Washington County',
          href: '/local-movers/arkansas/washington',
          note: 'Fayetteville–Springdale corridor logistics.',
        },
        {
          label: 'Moving to Pulaski County (Little Rock)',
          href: '/local-movers/arkansas/pulaski',
          note: 'Capital-city multi-unit and suburban mix.',
        },
      ],
    },
    challenges: {
      title: 'Arkansas-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real Arkansas moves — not generic national checklist filler.',
      items: [
        {
          title: 'Northwest Arkansas HOAs',
          detail:
            'Benton and Washington growth suburbs often restrict elevator and loading hours. Get rules in writing before booking.',
        },
        {
          title: 'Ozarks access',
          detail:
            'Steep driveways and mountain roads may need smaller trucks or shuttle strategies. Share GPS pins and photos early.',
        },
        {
          title: 'Heat and storms',
          detail:
            'Summer heat and spring severe weather can cancel or slow move days. Build flexible buffers.',
        },
        {
          title: 'Border hops',
          detail:
            'Jobs into Texas, Missouri, Oklahoma, or Tennessee are interstate even if short. Confirm FMCSA authority before deposits.',
        },
        {
          title: 'Authority verification',
          detail:
            'Confirm the exact legal name holds Arkansas intrastate household goods authority before deposits on pure in-state work.',
        },
      ],
    },
    tools: SHARED_TOOLS('Arkansas'),
    faq: [
      {
        question: 'Do Arkansas movers need state authority?',
        answer:
          'Yes. For-hire household goods movers operating within Arkansas generally need Intrastate Operating Authority through ARDOT frameworks. Interstate moves require FMCSA authority.',
      },
      {
        question: 'How do I verify an Arkansas mover?',
        answer:
          'Confirm ARDOT intrastate household goods authority for the legal name on your estimate. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER.',
      },
      {
        question: 'How much does a local Little Rock or NWA move cost?',
        answer:
          'Planning ranges often fall around $450–$2,000+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates.',
      },
      {
        question: 'Is a Little Rock-to-Fayetteville move intrastate?',
        answer:
          'Yes — both ends are in Arkansas, so you generally need a properly authorized for-hire household goods carrier.',
      },
      {
        question: 'When is peak moving season in Arkansas?',
        answer:
          'Statewide peak is typically May–September. Heat and storms can affect productivity.',
      },
      {
        question: 'Does a Texarkana, AR-to-Texarkana, TX move need FMCSA authority?',
        answer:
          'Yes. Crossing into Texas is interstate even for short hops. Confirm active FMCSA operating authority.',
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
          label: 'ARDOT — Permits',
          href: 'https://ardot.gov/permits/',
        },
        {
          label: 'ARDOT — Intrastate authority',
          href: 'https://ardot.gov/divisions/legal/arkansas-intrastate-authority/',
        },
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  },
};

const fileMap = [
  ['oregon', 'oregonStateResourceHub', packs.oregon],
  ['oklahoma', 'oklahomaStateResourceHub', packs.oklahoma],
  ['connecticut', 'connecticutStateResourceHub', packs.connecticut],
  ['iowa', 'iowaStateResourceHub', packs.iowa],
  ['arkansas', 'arkansasStateResourceHub', packs.arkansas],
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

// Full registry W1–W6 + CA
writeFileSync(
  'lib/local-movers/state-resource-hub/registry.ts',
  `import { alabamaStateResourceHub } from '@/lib/local-movers/state-resource-hub/alabama';
import { arizonaStateResourceHub } from '@/lib/local-movers/state-resource-hub/arizona';
import { arkansasStateResourceHub } from '@/lib/local-movers/state-resource-hub/arkansas';
import { californiaStateResourceHub } from '@/lib/local-movers/state-resource-hub/california';
import { coloradoStateResourceHub } from '@/lib/local-movers/state-resource-hub/colorado';
import { connecticutStateResourceHub } from '@/lib/local-movers/state-resource-hub/connecticut';
import { floridaStateResourceHub } from '@/lib/local-movers/state-resource-hub/florida';
import { georgiaStateResourceHub } from '@/lib/local-movers/state-resource-hub/georgia';
import { illinoisStateResourceHub } from '@/lib/local-movers/state-resource-hub/illinois';
import { indianaStateResourceHub } from '@/lib/local-movers/state-resource-hub/indiana';
import { iowaStateResourceHub } from '@/lib/local-movers/state-resource-hub/iowa';
import { kentuckyStateResourceHub } from '@/lib/local-movers/state-resource-hub/kentucky';
import { louisianaStateResourceHub } from '@/lib/local-movers/state-resource-hub/louisiana';
import { marylandStateResourceHub } from '@/lib/local-movers/state-resource-hub/maryland';
import { massachusettsStateResourceHub } from '@/lib/local-movers/state-resource-hub/massachusetts';
import { michiganStateResourceHub } from '@/lib/local-movers/state-resource-hub/michigan';
import { minnesotaStateResourceHub } from '@/lib/local-movers/state-resource-hub/minnesota';
import { missouriStateResourceHub } from '@/lib/local-movers/state-resource-hub/missouri';
import { newJerseyStateResourceHub } from '@/lib/local-movers/state-resource-hub/new-jersey';
import { newYorkStateResourceHub } from '@/lib/local-movers/state-resource-hub/new-york';
import { northCarolinaStateResourceHub } from '@/lib/local-movers/state-resource-hub/north-carolina';
import { ohioStateResourceHub } from '@/lib/local-movers/state-resource-hub/ohio';
import { oklahomaStateResourceHub } from '@/lib/local-movers/state-resource-hub/oklahoma';
import { oregonStateResourceHub } from '@/lib/local-movers/state-resource-hub/oregon';
import { pennsylvaniaStateResourceHub } from '@/lib/local-movers/state-resource-hub/pennsylvania';
import { southCarolinaStateResourceHub } from '@/lib/local-movers/state-resource-hub/south-carolina';
import { tennesseeStateResourceHub } from '@/lib/local-movers/state-resource-hub/tennessee';
import { texasStateResourceHub } from '@/lib/local-movers/state-resource-hub/texas';
import { virginiaStateResourceHub } from '@/lib/local-movers/state-resource-hub/virginia';
import { washingtonStateResourceHub } from '@/lib/local-movers/state-resource-hub/washington';
import { wisconsinStateResourceHub } from '@/lib/local-movers/state-resource-hub/wisconsin';
import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

const PACKS: StateResourceHubPack[] = [
  alabamaStateResourceHub,
  arizonaStateResourceHub,
  arkansasStateResourceHub,
  californiaStateResourceHub,
  coloradoStateResourceHub,
  connecticutStateResourceHub,
  floridaStateResourceHub,
  georgiaStateResourceHub,
  illinoisStateResourceHub,
  indianaStateResourceHub,
  iowaStateResourceHub,
  kentuckyStateResourceHub,
  louisianaStateResourceHub,
  marylandStateResourceHub,
  massachusettsStateResourceHub,
  michiganStateResourceHub,
  minnesotaStateResourceHub,
  missouriStateResourceHub,
  newJerseyStateResourceHub,
  newYorkStateResourceHub,
  northCarolinaStateResourceHub,
  ohioStateResourceHub,
  oklahomaStateResourceHub,
  oregonStateResourceHub,
  pennsylvaniaStateResourceHub,
  southCarolinaStateResourceHub,
  tennesseeStateResourceHub,
  texasStateResourceHub,
  virginiaStateResourceHub,
  washingtonStateResourceHub,
  wisconsinStateResourceHub,
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

console.log('registry updated with Wave 6 (31 packs total)');
