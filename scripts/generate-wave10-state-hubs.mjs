/**
 * Wave 10 (Final) State Resource Hubs: NH, VT, RI, DE
 * Run: node scripts/generate-wave10-state-hubs.mjs
 * Prerequisites: scripts/tmp-wave10-regions.json (0 orphans / 0 duplicates)
 *
 * Small states: compact natural regions; RI/DE use flat_county_list at runtime
 * per TEMPLATE_RULES (< ~8 counties). Completes all 50 US states.
 */
import { readFileSync, writeFileSync } from 'fs';

const regions = JSON.parse(readFileSync('scripts/tmp-wave10-regions.json', 'utf8'));

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
 * Research brief (Wave 10 — final):
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

const nhCount = getUniqueCountyCount('new-hampshire');
const vtCount = getUniqueCountyCount('vermont');
const riCount = getUniqueCountyCount('rhode-island');
const deCount = getUniqueCountyCount('delaware');

const packs = {
  'new-hampshire': {
    stateSlug: 'new-hampshire',
    stateCode: 'NH',
    h1: `New Hampshire Moving Resource Hub: Costs, HHG Carrier Authority & ${nhCount} County Guides`,
    metaTitle: `New Hampshire Movers Guide 2026 — Costs, NHPC Authority & ${nhCount} County Guides`,
    metaDescription:
      'Plan a move within, to, or from New Hampshire. Compare local and intrastate costs, verify New Hampshire household goods carrier authority, browse 10 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for New Hampshire moves in 2026 — typical costs, state HHG authority vs FMCSA rules, Seacoast-to-North Country regional guides, and tools to compare authorized movers without paid placements.',
    trustBar: [
      `${nhCount} County Guides`,
      'Verified Movers',
      'NH Authority & FMCSA Checked',
      'Updated 2026',
    ],
    intents: intents('New Hampshire'),
    primaryCta: {
      label: 'Calculate My New Hampshire Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in New Hampshire is different',
      paragraphs: [
        'New Hampshire is not one moving market. Seacoast multi-unit and MA-border logistics, Manchester–Nashua growth corridors, Lakes Region seasonal peaks, and North Country long hauls produce different access and labor profiles under one state name — with only ten counties but sharp micro-climates.',
        'Intrastate household goods carriers generally need Household Goods Carrier authority under New Hampshire Department of Safety / Bureau frameworks (RSA 359-T rules; NHPC-style carrier identifiers in consumer guidance). Interstate jobs need FMCSA authority. Winter ice, leaf-season traffic, and short hops into Massachusetts and Maine are planning inputs — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'New Hampshire moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical New Hampshire local and intrastate patterns; they are not bids. Always compare written estimates from authorized carriers for in-state work and FMCSA-authorized carriers for interstate work.',
      stats: [
        {
          label: 'Typical Manchester / Seacoast studio / 1BR',
          value: '$550–$2,400+',
          note: 'Stairs, elevators, and winter staging',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$1,700–$5,200+',
          note: 'HOAs and long driveways vary',
        },
        {
          label: 'Intrastate mid-size (e.g. Nashua ↔ Concord)',
          value: '$1,500–$4,800+',
          note: 'Season matters',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'Foliage and ski seasons create second peaks',
        },
        {
          label: 'Top outbound destinations',
          value: 'FL · MA · ME · NC · SC · TX',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: String(nhCount),
          note: 'Seacoast and Hillsborough emphasized',
        },
      ],
    },
    regulations: {
      mode: 'strong_state_regulator',
      title: 'New Hampshire moving regulations & consumer protection',
      intro:
        'New Hampshire requires intrastate household goods carriers to hold Household Goods Carrier authority under state Department of Safety Bureau frameworks (RSA 359-T and related rules). Match authority to the job before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside New Hampshire)',
        body: 'If origin or destination is outside New Hampshire, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. New Hampshire household goods authority alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within New Hampshire)',
        body: 'Intrastate movers must obtain Household Goods Carrier authority (permit or certificate pathways under Bureau rules). Updated rules emphasize written estimates on customer request, annual household-goods vehicle registration with DMV for vehicles used in service, and fitness-to-perform evaluations for new authority. Consumers should confirm active authority and get written estimates before hiring.',
      },
      verifySteps: [
        'Classify the job: entirely in New Hampshire (state HHG authority) vs any out-of-state leg (FMCSA / USDOT).',
        'Copy the exact legal name from the written estimate.',
        'Intrastate: confirm New Hampshire household goods carrier authority for the company.',
        'Interstate: look up USDOT / MC on FMCSA SAFER.',
        'Request a written estimate (carriers must provide one on customer request under current rules).',
        'Avoid large cash deposits to unverified operators.',
      ],
      protections: [
        {
          title: 'Household goods carrier authority',
          detail:
            'New Hampshire requires household goods carriers to hold state authority under RSA 359-T frameworks administered through the Department of Safety Bureau of common carriers rules.',
        },
        {
          title: 'Written estimates on request',
          detail:
            'Updated regulatory guidance requires household goods carriers to provide a written estimate of cost upon the request of any customer.',
        },
        {
          title: 'Vehicle registration for HHG service',
          detail:
            'Carriers with active authority register each vehicle used in household goods service annually with the Division of Motor Vehicles.',
        },
      ],
      officialLinks: [
        {
          label: 'New Hampshire Department of Transportation',
          href: 'https://www.nh.gov/dot/',
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
        'Licensing rules and application channels can change. Always verify current New Hampshire household goods authority or FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('new-hampshire', [
      {
        key: 'seacoast-south',
        id: 'seacoast-south',
        name: 'Seacoast & Southern New Hampshire',
        shortName: 'Seacoast / South',
        blurb:
          'Rockingham, Strafford, and Hillsborough with MA-border hops, multi-unit access, and dense suburbs.',
        challenges: [
          'Short MA hops need FMCSA authority',
          'Elevators, HOAs, and winter ice',
        ],
        ctaLabel: 'Explore Seacoast / South',
      },
      {
        key: 'central-nh',
        id: 'central-nh',
        name: 'Central New Hampshire',
        shortName: 'Central NH',
        blurb:
          'Merrimack, Belknap, and Sullivan with capital logistics and Lakes Region approaches.',
        challenges: [
          'Seasonal lake-home access',
          'I-93 congestion windows',
        ],
        ctaLabel: 'Explore Central New Hampshire',
      },
      {
        key: 'lakes-north',
        id: 'lakes-north',
        name: 'Lakes Region & North Country',
        shortName: 'Lakes / North',
        blurb:
          'Carroll, Grafton, and Coos with mountain access, ski peaks, and thinner northern fleets.',
        challenges: [
          'Mountain weather and long empty miles',
          'Confirm coverage for remote addresses',
        ],
        ctaLabel: 'Explore Lakes / North Country',
      },
      {
        key: 'southwest-nh',
        id: 'southwest-nh',
        name: 'Southwest New Hampshire',
        shortName: 'Southwest',
        blurb:
          'Cheshire County with VT/MA border patterns and mixed rural-town access.',
        challenges: [
          'Short VT/MA hops need FMCSA authority',
          'Confirm mover coverage early',
        ],
        ctaLabel: 'Explore Southwest New Hampshire',
      },
    ]),
    costs: {
      title: 'New Hampshire moving costs',
      intro:
        'New Hampshire pricing reflects Seacoast and Manchester labor markets, winter weather, and short interstate border hops. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate New Hampshire moving costs',
        lastReviewed: '2026-07-23',
        body: 'These ranges are planning estimates, not quotes. They combine typical New Hampshire local and intrastate patterns: home size, distance, stairs/elevators, parking, winter weather, and regional labor. Actual bids vary with season and tourism peaks. Always compare written estimates from authorized movers for in-state work and FMCSA-authorized carriers for interstate work.',
      },
      ranges: [
        {
          label: 'Manchester / Seacoast studio / 1BR',
          value: '$550–$2,400+',
          note: 'Stairs and winter access dominate',
        },
        {
          label: 'Suburban 2–3BR house',
          value: '$1,700–$5,000+',
          note: 'HOAs and long driveways vary',
        },
        {
          label: 'Intrastate mid-size (e.g. Nashua ↔ Concord)',
          value: '$1,500–$4,800+',
          note: 'Season matters',
        },
        {
          label: 'Intrastate long (e.g. Nashua ↔ North Country)',
          value: '$2,000–$7,000+',
          note: 'Distance and weather push hours',
        },
        {
          label: 'Typical 2–3 person crew (southern NH)',
          value: '$125–$230+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'Winter ice and snow force flexible dates statewide.',
        'Southern multi-unit buildings add stair and elevator time.',
        'Foliage and ski seasons can tighten crews outside summer peak.',
        'North Country jobs include long empty miles from Seacoast fleets.',
        'Short hops into MA, ME, VT, or NY are interstate even when nearby.',
      ],
    },
    routes: {
      title: 'Popular New Hampshire moving routes',
      intro:
        'New Hampshire sees strong outbound Sun Belt flows, constant short interstate hops into Massachusetts and Maine, and large Seacoast–Lakes internal traffic. Interstate jobs need FMCSA authority; in-state corridors need authorized household goods carriers.',
      migrationProfile: 'outbound_dominant',
      outbound: [
        {
          label: 'New Hampshire → Florida / Carolinas',
          href: '/moving-to/florida',
          origins: 'Seacoast, Hillsborough',
          transit: 'Multi-day I-95',
          planningNote: 'Book early for winter arrivals.',
          note: 'High-volume Northeast snowbird corridor.',
        },
        {
          label: 'New Hampshire → Massachusetts / Maine',
          href: '/local-movers/massachusetts',
          origins: 'Southern and Seacoast NH',
          transit: 'Often same-day interstate',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Extremely common short cross-border metro moves.',
        },
        {
          label: 'New Hampshire → Texas / Arizona',
          href: '/local-movers/texas',
          origins: 'Statewide',
          transit: 'Multi-day interstate',
          planningNote: 'Confirm FMCSA authority end-to-end.',
          note: 'Popular long-haul outbound destinations.',
        },
      ],
      inbound: [
        {
          label: 'Moving to Hillsborough County',
          href: '/local-movers/new-hampshire/hillsborough',
          note: 'Manchester–Nashua multi-unit and suburban mix.',
        },
        {
          label: 'Moving to Rockingham County',
          href: '/local-movers/new-hampshire/rockingham',
          note: 'Seacoast logistics and MA-border patterns.',
        },
        {
          label: 'Moving to Merrimack County (Concord)',
          href: '/local-movers/new-hampshire/merrimack',
          note: 'Capital corridors and Lakes approaches.',
        },
      ],
    },
    challenges: {
      title: 'New Hampshire-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real New Hampshire moves — not generic national checklist filler.',
      items: [
        {
          title: 'Winter ice and snow',
          detail:
            'Driveways and mountain roads can ice over for days. Build weather buffers November–March.',
        },
        {
          title: 'MA border hops',
          detail:
            'Jobs from Nashua or Seacoast into Massachusetts are interstate even if short. Confirm FMCSA authority before deposits.',
        },
        {
          title: 'Written estimate rules',
          detail:
            'Current HHG rules emphasize written estimates on customer request — get one in writing before move day.',
        },
        {
          title: 'North Country empty miles',
          detail:
            'Coos and northern Grafton jobs create long empty miles from southern fleets. Confirm coverage early.',
        },
        {
          title: 'Authority verification',
          detail:
            'Confirm the exact legal name holds New Hampshire household goods carrier authority before deposits on pure in-state work.',
        },
      ],
    },
    tools: SHARED_TOOLS('New Hampshire'),
    faq: [
      {
        question: 'Do New Hampshire movers need state authority?',
        answer:
          'Yes. Intrastate household goods carriers generally need Household Goods Carrier authority under New Hampshire Department of Safety Bureau frameworks. Interstate moves require FMCSA authority.',
      },
      {
        question: 'How do I verify a New Hampshire mover?',
        answer:
          'Confirm state household goods carrier authority for the legal name on your estimate and request a written estimate. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER.',
      },
      {
        question: 'How much does a local Manchester or Seacoast move cost?',
        answer:
          'Planning ranges often fall around $550–$2,400+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates.',
      },
      {
        question: 'Is a Nashua-to-Concord move intrastate?',
        answer:
          'Yes — both ends are in New Hampshire, so you generally need an authorized household goods carrier.',
      },
      {
        question: 'When is peak moving season in New Hampshire?',
        answer:
          'Statewide peak is typically May–September. Foliage and ski seasons can create additional demand spikes.',
      },
      {
        question: 'Does a Nashua-to-Lowell move need FMCSA authority?',
        answer:
          'Yes. Crossing into Massachusetts is interstate even for short hops. Confirm active FMCSA operating authority.',
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
          label: 'New Hampshire Department of Transportation',
          href: 'https://www.nh.gov/dot/',
        },
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  },

  vermont: {
    stateSlug: 'vermont',
    stateCode: 'VT',
    h1: `Vermont Moving Resource Hub: Costs, FMCSA Checks & ${vtCount} County Guides`,
    metaTitle: `Vermont Movers Guide 2026 — Costs, Insurance Checks & ${vtCount} County Guides`,
    metaDescription:
      'Plan a move within, to, or from Vermont. Compare local and intrastate costs, understand Vermont’s limited dedicated HHG licensing versus FMCSA interstate rules, browse 14 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for Vermont moves in 2026 — typical costs, FMCSA-first verification for interstate work, Burlington-to-Brattleboro regional guides, and tools to compare movers without paid placements.',
    trustBar: [
      `${vtCount} County Guides`,
      'Verified Movers',
      'FMCSA-Focused Checks',
      'Updated 2026',
    ],
    intents: intents('Vermont'),
    primaryCta: {
      label: 'Calculate My Vermont Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in Vermont is different',
      paragraphs: [
        'Vermont is not one moving market. Burlington multi-unit and lake-effect weather, Central Vermont capital logistics, southern ski-town peaks, and Northeast Kingdom long hauls produce different access and labor profiles under one state name — with fourteen counties and sharp mountain micro-climates.',
        'Vermont does not require a dedicated local household-goods mover license in commonly cited consumer guidance (unlike New Hampshire’s HHG carrier authority). Interstate jobs need FMCSA authority. For in-state work, insist on insurance certificates, written estimates, and clear legal names. Mud season, winter ice, and thin rural fleets are planning inputs — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'Vermont moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical Vermont local and intrastate patterns; they are not bids. Always compare written estimates and confirm FMCSA authority for any out-of-state leg.',
      stats: [
        {
          label: 'Typical Burlington studio / 1BR',
          value: '$500–$2,300+',
          note: 'Stairs, elevators, and winter staging',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$1,700–$5,200+',
          note: 'Long driveways and mud season matter',
        },
        {
          label: 'Intrastate mid-size (e.g. Burlington ↔ Montpelier)',
          value: '$1,500–$5,000+',
          note: 'Season and packing drive the spread',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'Ski and foliage seasons create second peaks',
        },
        {
          label: 'Top outbound destinations',
          value: 'FL · NY · MA · NC · SC · NH',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: String(vtCount),
          note: 'Chittenden emphasized',
        },
      ],
    },
    regulations: {
      mode: 'limited_or_none',
      title: 'Vermont moving regulations & consumer protection',
      intro:
        'Vermont does not maintain a dedicated household-goods consumer permit board for most local movers according to commonly cited state and industry summaries. Interstate work still requires FMCSA authority. Verify insurance and contracts carefully before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside Vermont)',
        body: 'If origin or destination is outside Vermont, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. A Vermont business registration alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within Vermont)',
        body: 'Without a strong state HHG permit directory, consumers should insist on written estimates, cargo and liability insurance certificates, and a clear legal business name for pure in-state jobs. Confirm any municipal parking or road-weight rules in mountain towns separately.',
      },
      verifySteps: [
        'Classify the job: entirely in Vermont vs any out-of-state leg (FMCSA / USDOT required).',
        'Copy the exact legal name from the written estimate.',
        'Interstate: look up USDOT / MC on FMCSA SAFER before deposits.',
        'Intrastate: request insurance certificates, written inventory estimates, and business credentials.',
        'Confirm mountain driveway and mud-season access for your addresses.',
        'Avoid large cash deposits to unverified operators.',
      ],
      protections: [
        {
          title: 'No dedicated local HHG license (typical guidance)',
          detail:
            'Consumer sources commonly state a local household-goods mover license is not required in Vermont — do not invent a permit number that does not exist.',
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
    regions: regionObjects('vermont', [
      {
        key: 'northwest-vt',
        id: 'northwest-vt',
        name: 'Northwest Vermont',
        shortName: 'Northwest',
        blurb:
          'Chittenden, Franklin, and northwest counties with Burlington multi-unit access and lake-effect weather.',
        challenges: [
          'Elevators, stairs, and winter ice',
          'Short NY hops need FMCSA authority',
        ],
        ctaLabel: 'Explore Northwest Vermont',
      },
      {
        key: 'central-vt',
        id: 'central-vt',
        name: 'Central Vermont',
        shortName: 'Central',
        blurb:
          'Washington, Addison, and central counties with capital logistics and mountain approaches.',
        challenges: [
          'Mud season driveway access',
          'I-89 weather windows',
        ],
        ctaLabel: 'Explore Central Vermont',
      },
      {
        key: 'southern-vt',
        id: 'southern-vt',
        name: 'Southern Vermont',
        shortName: 'Southern',
        blurb:
          'Bennington, Windham, and Rutland with ski-town peaks and MA/NY border patterns.',
        challenges: [
          'Ski-season demand spikes',
          'Short MA/NY hops need FMCSA authority',
        ],
        ctaLabel: 'Explore Southern Vermont',
      },
      {
        key: 'northeast-kingdom',
        id: 'northeast-kingdom',
        name: 'Northeast Kingdom',
        shortName: 'NE Kingdom',
        blurb:
          'Caledonia, Essex, and Orleans with long hauls and thinner local fleets.',
        challenges: [
          'Confirm mover coverage early',
          'Long empty miles from Burlington fleets',
        ],
        ctaLabel: 'Explore Northeast Kingdom',
      },
    ]),
    costs: {
      title: 'Vermont moving costs',
      intro:
        'Vermont pricing reflects Burlington labor markets, winter weather, mountain access, and long rural hauls. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate Vermont moving costs',
        lastReviewed: '2026-07-23',
        body: 'These ranges are planning estimates, not quotes. They combine typical Vermont local and intrastate patterns: home size, distance, stairs, parking, mud season, winter weather, and regional labor. Actual bids vary with ski and foliage seasons. Always compare written estimates and confirm FMCSA authority for any out-of-state leg.',
      },
      ranges: [
        {
          label: 'Burlington studio / 1BR',
          value: '$500–$2,300+',
          note: 'Stairs and winter access dominate',
        },
        {
          label: 'Suburban 2–3BR house',
          value: '$1,700–$5,000+',
          note: 'Long driveways common',
        },
        {
          label: 'Intrastate mid-size (e.g. Burlington ↔ Montpelier)',
          value: '$1,500–$4,800+',
          note: 'Season matters',
        },
        {
          label: 'Intrastate long (e.g. Burlington ↔ Brattleboro)',
          value: '$2,000–$7,000+',
          note: 'Distance and weather push hours',
        },
        {
          label: 'Typical 2–3 person crew (Burlington metro)',
          value: '$120–$220+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'Winter ice and mud season force flexible dates.',
        'Ski towns can tighten crews outside summer peak.',
        'Northeast Kingdom jobs include long empty miles.',
        'Burlington multi-unit buildings add stair and elevator time.',
        'Short hops into NY, NH, or MA are interstate even when nearby.',
      ],
    },
    routes: {
      title: 'Popular Vermont moving routes',
      intro:
        'Vermont sees outbound Sun Belt and New England flows, short interstate hops into New York, New Hampshire, and Massachusetts, and large Burlington internal traffic. Interstate jobs need FMCSA authority; local jobs need careful insurance and contract verification.',
      migrationProfile: 'outbound_dominant',
      outbound: [
        {
          label: 'Vermont → Florida / Carolinas',
          href: '/moving-to/florida',
          origins: 'Burlington, southern VT',
          transit: 'Multi-day interstate',
          planningNote: 'Book early for winter arrivals.',
          note: 'Common snowbird outbound corridor.',
        },
        {
          label: 'Vermont → New York / New Hampshire / Massachusetts',
          href: '/local-movers/new-york',
          origins: 'Northwest and southern VT',
          transit: 'Often same-day interstate',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Common short cross-border metro moves.',
        },
        {
          label: 'Vermont → Texas / Arizona',
          href: '/local-movers/texas',
          origins: 'Statewide',
          transit: 'Multi-day interstate',
          planningNote: 'Confirm FMCSA authority end-to-end.',
          note: 'Popular long-haul outbound destinations.',
        },
      ],
      inbound: [
        {
          label: 'Moving to Chittenden County (Burlington)',
          href: '/local-movers/vermont/chittenden',
          note: 'Multi-unit access and lake-effect weather.',
        },
        {
          label: 'Moving to Washington County (Montpelier area)',
          href: '/local-movers/vermont/washington',
          note: 'Capital corridors and mountain approaches.',
        },
        {
          label: 'Moving to Windham County',
          href: '/local-movers/vermont/windham',
          note: 'Southern ski-town and border patterns.',
        },
      ],
    },
    challenges: {
      title: 'Vermont-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real Vermont moves — not generic national checklist filler.',
      items: [
        {
          title: 'Mud season and winter ice',
          detail:
            'Driveways can become impassable in spring thaw and midwinter ice. Build large weather buffers.',
        },
        {
          title: 'Limited state HHG permit regime',
          detail:
            'Without a dedicated consumer HHG license lookup, demand insurance certificates, written estimates, and FMCSA checks for any border hop.',
        },
        {
          title: 'Ski-town seasonal demand',
          detail:
            'Southern and mountain markets tighten crews around ski and foliage peaks. Book early.',
        },
        {
          title: 'Northeast Kingdom empty miles',
          detail:
            'Remote northern jobs create long empty miles from Burlington fleets. Confirm coverage early.',
        },
        {
          title: 'Short interstate hops',
          detail:
            'Moves into New York, New Hampshire, or Massachusetts are interstate even if short. Confirm FMCSA authority before deposits.',
        },
      ],
    },
    tools: SHARED_TOOLS('Vermont'),
    faq: [
      {
        question: 'Do Vermont movers need a special household goods license?',
        answer:
          'Consumer sources commonly state a local household-goods mover license is not required in Vermont. Consumers should still verify insurance, written contracts, and FMCSA authority for any out-of-state leg.',
      },
      {
        question: 'How do I verify a Vermont mover for an interstate move?',
        answer:
          'Look up USDOT / MC authority on FMCSA SAFER for the legal name on your estimate. Also request certificates of insurance and written inventory estimates.',
      },
      {
        question: 'How much does a local Burlington move cost?',
        answer:
          'Planning ranges often fall around $500–$2,300+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates.',
      },
      {
        question: 'Is a Burlington-to-Brattleboro move interstate?',
        answer:
          'No — both ends are in Vermont. Focus on weather windows, packing, and inventory-based written estimates for the haul.',
      },
      {
        question: 'When is peak moving season in Vermont?',
        answer:
          'Statewide peak is typically May–September. Ski and foliage seasons can create additional demand spikes.',
      },
      {
        question: 'Does a Burlington-to-Plattsburgh move need FMCSA authority?',
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

  'rhode-island': {
    stateSlug: 'rhode-island',
    stateCode: 'RI',
    h1: `Rhode Island Moving Resource Hub: Costs, DPUC Certificates & ${riCount} County Guides`,
    metaTitle: `Rhode Island Movers Guide 2026 — Costs, DPUC Certificates & ${riCount} County Guides`,
    metaDescription:
      'Plan a move within, to, or from Rhode Island. Compare local and intrastate costs, verify Rhode Island Division of Public Utilities and Carriers household goods certificates, browse 5 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for Rhode Island moves in 2026 — typical costs, DPUC vs FMCSA rules, Providence-to-South County guides, and tools to compare certificated movers without paid placements.',
    trustBar: [
      `${riCount} County Guides`,
      'Verified Movers',
      'RI DPUC & FMCSA Checked',
      'Updated 2026',
    ],
    intents: intents('Rhode Island'),
    primaryCta: {
      label: 'Calculate My Rhode Island Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in Rhode Island is different',
      paragraphs: [
        'Rhode Island is not one moving market. Providence multi-unit elevators and tight streets, East Bay and Kent County suburbs, Newport tourism congestion, and South County coastal access produce different labor profiles under one state name — with only five counties but dense border pressure from Massachusetts and Connecticut.',
        'Intrastate household goods movers must hold a certificate from the Rhode Island Division of Public Utilities and Carriers (DPUC). Interstate jobs need FMCSA authority. Winter ice, college peaks, and short hops into Massachusetts and Connecticut are planning inputs — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'Rhode Island moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical Rhode Island local and intrastate patterns; they are not bids. Always compare written estimates from DPUC-certificated movers for in-state work and FMCSA-authorized carriers for interstate work.',
      stats: [
        {
          label: 'Typical Providence studio / 1BR',
          value: '$550–$2,500+',
          note: 'Stairs, elevators, and tight streets',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$1,700–$5,200+',
          note: 'HOAs and coastal access vary',
        },
        {
          label: 'Intrastate mid-size (e.g. Providence ↔ Warwick or Newport)',
          value: '$1,400–$4,800+',
          note: 'Season and traffic matter',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'College and tourism peaks compress crews',
        },
        {
          label: 'Top outbound destinations',
          value: 'FL · MA · CT · NC · SC · NY',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: String(riCount),
          note: 'Providence emphasized',
        },
      ],
    },
    regulations: {
      mode: 'strong_state_regulator',
      title: 'Rhode Island moving regulations & consumer protection',
      intro:
        'Rhode Island requires household goods movers operating within the state to hold a certificate from the Division of Public Utilities and Carriers. Match the certificate to the job before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside Rhode Island)',
        body: 'If origin or destination is outside Rhode Island, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. A Rhode Island DPUC household goods certificate alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within Rhode Island)',
        body: 'To receive a certificate to transport household goods, applicants must prove fitness, willingness, and ability to provide the proposed service under DPUC Motor Carriers Division jurisdiction. DPUC publishes licensed moving company lists and moving information for consumers. Carriers must provide a Bill of Lading as receipt and contract for household goods transportation.',
      },
      verifySteps: [
        'Classify the job: entirely in Rhode Island (DPUC certificate) vs any out-of-state leg (FMCSA / USDOT).',
        'Copy the exact legal name from the written estimate.',
        'Intrastate: confirm DPUC licensed household goods carrier status for the company.',
        'Interstate: look up USDOT / MC on FMCSA SAFER.',
        'Get a written estimate and Bill of Lading before move day.',
        'Avoid large cash deposits to unverified operators.',
      ],
      protections: [
        {
          title: 'DPUC household goods certificate',
          detail:
            'Rhode Island Division of Public Utilities and Carriers certificates household goods movers; applicants must prove fitness, willingness, and ability to perform the service.',
        },
        {
          title: 'Public licensed mover lists',
          detail:
            'DPUC maintains consumer-facing lists of licensed moving companies and advises calling Motor Carriers for questions.',
        },
        {
          title: 'Bill of Lading requirement',
          detail:
            'Movers must provide customers with a Bill of Lading that serves as a receipt and contract for the transportation of household goods.',
        },
      ],
      officialLinks: [
        {
          label: 'RI DPUC — Moving information',
          href: 'https://ripuc.ri.gov/utility-information/motor-carriers/moving-information',
          external: true,
        },
        {
          label: 'RI DPUC — Motor Carriers Division jurisdiction',
          href: 'https://ripuc.ri.gov/utility-information/motor-carriers/responsibilities-and-jurisdiction-motor-carriers-division',
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
        'Licensing rules and directories can change. Always verify current DPUC certificate status or FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    // 5 counties → flat_county_list at runtime; compact natural groups retained
    regions: regionObjects('rhode-island', [
      {
        key: 'providence-metro',
        id: 'providence-metro',
        name: 'Providence Metro',
        shortName: 'Providence Metro',
        blurb:
          'Providence, Bristol, and Kent with multi-unit elevators, tight streets, and dense suburbs.',
        challenges: [
          'Elevators, stairs, and limited staging',
          'I-95 congestion windows',
        ],
        ctaLabel: 'Explore Providence Metro',
      },
      {
        key: 'south-county-coast',
        id: 'south-county-coast',
        name: 'South County & Newport',
        shortName: 'South County / Newport',
        blurb:
          'Washington and Newport with coastal tourism peaks and ferry-adjacent logistics.',
        challenges: [
          'Summer tourism congestion',
          'Coastal parking and access limits',
        ],
        ctaLabel: 'Explore South County / Newport',
      },
    ]),
    costs: {
      title: 'Rhode Island moving costs',
      intro:
        'Rhode Island pricing reflects Providence labor markets, multi-unit access, coastal tourism, and constant short interstate border hops. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate Rhode Island moving costs',
        lastReviewed: '2026-07-23',
        body: 'These ranges are planning estimates, not quotes. They combine typical Rhode Island local and intrastate patterns: home size, distance, stairs/elevators, parking, tourism seasonality, and regional labor. Actual bids vary. Always compare written estimates from DPUC-certificated movers for in-state work and FMCSA-authorized carriers for interstate work.',
      },
      ranges: [
        {
          label: 'Providence studio / 1BR',
          value: '$550–$2,500+',
          note: 'Stairs and tight streets dominate',
        },
        {
          label: 'Suburban 2–3BR house',
          value: '$1,700–$5,000+',
          note: 'HOAs and coastal access vary',
        },
        {
          label: 'Intrastate mid-size (e.g. Providence ↔ Newport)',
          value: '$1,400–$4,800+',
          note: 'Tourism traffic matters',
        },
        {
          label: 'Typical 2–3 person crew (Providence metro)',
          value: '$125–$240+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'Providence multi-unit buildings add stair and elevator time.',
        'Summer coastal tourism compresses crews and road capacity.',
        'College move-in peaks tighten late August demand.',
        'Almost every long haul quickly becomes interstate into MA or CT.',
        'Winter ice forces flexible dates.',
      ],
    },
    routes: {
      title: 'Popular Rhode Island moving routes',
      intro:
        'Rhode Island is a high-churn New England market with strong outbound Sun Belt flows and constant short interstate hops into Massachusetts and Connecticut. Interstate jobs need FMCSA authority; in-state corridors need DPUC-certificated household goods movers.',
      migrationProfile: 'outbound_dominant',
      outbound: [
        {
          label: 'Rhode Island → Florida / Carolinas',
          href: '/moving-to/florida',
          origins: 'Providence metro',
          transit: 'Multi-day I-95',
          planningNote: 'Book early for winter arrivals.',
          note: 'High-volume Northeast snowbird corridor.',
        },
        {
          label: 'Rhode Island → Massachusetts / Connecticut',
          href: '/local-movers/massachusetts',
          origins: 'Statewide',
          transit: 'Often same-day interstate',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Extremely common short cross-border metro moves.',
        },
        {
          label: 'Rhode Island → New York',
          href: '/local-movers/new-york',
          origins: 'Providence, South County',
          transit: 'I-95 multi-day or next-day',
          planningNote: 'Confirm FMCSA authority end-to-end.',
          note: 'Common Northeast job corridor.',
        },
      ],
      inbound: [
        {
          label: 'Moving to Providence County',
          href: '/local-movers/rhode-island/providence',
          note: 'Multi-unit elevators and dense urban staging.',
        },
        {
          label: 'Moving to Kent County',
          href: '/local-movers/rhode-island/kent',
          note: 'Warwick–central suburbs and HOAs.',
        },
        {
          label: 'Moving to Washington County',
          href: '/local-movers/rhode-island/washington',
          note: 'South County coastal access and tourism peaks.',
        },
      ],
    },
    challenges: {
      title: 'Rhode Island-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real Rhode Island moves — not generic national checklist filler.',
      items: [
        {
          title: 'Providence multi-unit access',
          detail:
            'Stairs, elevators, and tight streets dominate. Share approach photos and reserve elevators early.',
        },
        {
          title: 'Border hops into MA and CT',
          detail:
            'Many jobs cross state lines within minutes. Confirm FMCSA authority even for short hauls.',
        },
        {
          title: 'Summer tourism congestion',
          detail:
            'Newport and South County roads jam in peak season. Avoid Friday arrivals when possible.',
        },
        {
          title: 'College lease peaks',
          detail:
            'Late August demand spikes around student turnovers. Book earlier than a typical civilian calendar.',
        },
        {
          title: 'DPUC certificate verification',
          detail:
            'Confirm the exact legal name holds a Rhode Island DPUC household goods certificate before deposits on pure in-state work.',
        },
      ],
    },
    tools: SHARED_TOOLS('Rhode Island'),
    faq: [
      {
        question: 'Do Rhode Island movers need a DPUC certificate?',
        answer:
          'Yes. Household goods movers operating within Rhode Island generally need a certificate from the Division of Public Utilities and Carriers. Interstate moves require FMCSA authority.',
      },
      {
        question: 'How do I verify a Rhode Island mover?',
        answer:
          'Use DPUC licensed moving company resources and match the legal name on your estimate. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER.',
      },
      {
        question: 'How much does a local Providence move cost?',
        answer:
          'Planning ranges often fall around $550–$2,500+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates.',
      },
      {
        question: 'Is a Providence-to-Newport move intrastate?',
        answer:
          'Yes — both ends are in Rhode Island, so you generally need a DPUC-certificated household goods mover.',
      },
      {
        question: 'When is peak moving season in Rhode Island?',
        answer:
          'Statewide peak is typically May–September, with additional college and tourism spikes.',
      },
      {
        question: 'Does a Providence-to-Boston move need FMCSA authority?',
        answer:
          'Yes. Crossing into Massachusetts is interstate. Confirm active FMCSA operating authority and a USDOT number.',
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
          label: 'RI DPUC — Moving information',
          href: 'https://ripuc.ri.gov/utility-information/motor-carriers/moving-information',
        },
        {
          label: 'RI DPUC — Motor Carriers Division',
          href: 'https://ripuc.ri.gov/utility-information/motor-carriers/responsibilities-and-jurisdiction-motor-carriers-division',
        },
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  },

  delaware: {
    stateSlug: 'delaware',
    stateCode: 'DE',
    h1: `Delaware Moving Resource Hub: Costs, FMCSA Checks & ${deCount} County Guides`,
    metaTitle: `Delaware Movers Guide 2026 — Costs, Insurance Checks & ${deCount} County Guides`,
    metaDescription:
      'Plan a move within, to, or from Delaware. Compare local and intrastate costs, understand Delaware’s limited dedicated HHG licensing versus FMCSA interstate rules, browse 3 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for Delaware moves in 2026 — typical costs, FMCSA-first verification for interstate work, New Castle-to-Sussex county guides, and tools to compare movers without paid placements.',
    trustBar: [
      `${deCount} County Guides`,
      'Verified Movers',
      'FMCSA-Focused Checks',
      'Updated 2026',
    ],
    intents: intents('Delaware'),
    primaryCta: {
      label: 'Calculate My Delaware Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in Delaware is different',
      paragraphs: [
        'Delaware is not one moving market. New Castle multi-unit and Philly-adjacent logistics, Kent capital corridors, and Sussex beach-season congestion produce different access and labor profiles under one state name — with only three counties but intense cross-border pressure from Pennsylvania, Maryland, and New Jersey.',
        'Delaware does not require a special state household-goods certificate for pure intrastate movers according to commonly cited consumer guidance. Interstate jobs need FMCSA authority. For in-state work, insist on insurance certificates, written estimates, and clear legal names. Summer beach traffic, winter ice, and constant short interstate hops are planning inputs — then open the county that matches your addresses.',
      ],
    },
    snapshot: {
      title: 'Delaware moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical Delaware local and intrastate patterns; they are not bids. Always compare written estimates and confirm FMCSA authority for any out-of-state leg.',
      stats: [
        {
          label: 'Typical Wilmington studio / 1BR',
          value: '$500–$2,300+',
          note: 'Stairs, elevators, and parking matter',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$1,600–$5,000+',
          note: 'HOAs common in growth suburbs',
        },
        {
          label: 'Intrastate mid-size (e.g. Wilmington ↔ Dover or Rehoboth)',
          value: '$1,400–$4,800+',
          note: 'Beach season traffic matters',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'Sussex beach peaks compress crews',
        },
        {
          label: 'Top outbound destinations',
          value: 'FL · MD · PA · NC · SC · NJ',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: String(deCount),
          note: 'New Castle emphasized',
        },
      ],
    },
    regulations: {
      mode: 'limited_or_none',
      title: 'Delaware moving regulations & consumer protection',
      intro:
        'Delaware does not issue a special state household-goods certificate for pure intrastate movers according to commonly cited consumer guidance. Interstate work still requires FMCSA authority. Verify insurance and contracts carefully before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside Delaware)',
        body: 'If origin or destination is outside Delaware, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. A Delaware business registration alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within Delaware)',
        body: 'Without a dedicated state HHG permit directory, consumers should insist on written estimates, cargo and liability insurance certificates, and a clear legal business name for pure in-state jobs. Business registration remains an important verification step. Confirm any municipal parking rules separately.',
      },
      verifySteps: [
        'Classify the job: entirely in Delaware vs any out-of-state leg (FMCSA / USDOT required).',
        'Copy the exact legal name from the written estimate.',
        'Interstate: look up USDOT / MC on FMCSA SAFER before deposits.',
        'Intrastate: request insurance certificates, written inventory estimates, and business registration details.',
        'Confirm beach-town and multi-unit access for your addresses.',
        'Avoid large cash deposits to unverified operators.',
      ],
      protections: [
        {
          title: 'No special state HHG certificate (typical guidance)',
          detail:
            'Consumer sources commonly state Delaware does not require a special household goods mover license or certificate for pure intrastate operators — do not invent a permit number that does not exist.',
        },
        {
          title: 'FMCSA for interstate moves',
          detail:
            'Any move that crosses a state line is generally under federal household goods rules — verify active FMCSA authority on SAFER. Many Delaware jobs become interstate within minutes.',
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
    // 3 counties → flat_county_list; one region per county for clean map anchors
    regions: regionObjects('delaware', [
      {
        key: 'new-castle',
        id: 'new-castle',
        name: 'New Castle County',
        shortName: 'New Castle',
        blurb:
          'Wilmington multi-unit access, suburbs, and Philly-adjacent border logistics.',
        challenges: [
          'Elevators, stairs, and tight staging',
          'Short PA/NJ hops need FMCSA authority',
        ],
        ctaLabel: 'Explore New Castle County',
      },
      {
        key: 'kent',
        id: 'kent',
        name: 'Kent County',
        shortName: 'Kent',
        blurb:
          'Dover capital corridors and central Delaware suburbs with I-1 logistics.',
        challenges: [
          'Military and capital-cycle peaks',
          'Confirm coverage for rural addresses',
        ],
        ctaLabel: 'Explore Kent County',
      },
      {
        key: 'sussex',
        id: 'sussex',
        name: 'Sussex County',
        shortName: 'Sussex',
        blurb:
          'Beach towns and southern growth with summer tourism congestion and MD-border hops.',
        challenges: [
          'Beach-season road congestion',
          'Short MD hops need FMCSA authority',
        ],
        ctaLabel: 'Explore Sussex County',
      },
    ]),
    costs: {
      title: 'Delaware moving costs',
      intro:
        'Delaware pricing reflects Wilmington labor markets, beach-season demand, and constant short interstate border hops. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate Delaware moving costs',
        lastReviewed: '2026-07-23',
        body: 'These ranges are planning estimates, not quotes. They combine typical Delaware local and intrastate patterns: home size, distance, stairs/elevators, parking, beach seasonality, and regional labor. Actual bids vary. Always compare written estimates and confirm FMCSA authority for any out-of-state leg.',
      },
      ranges: [
        {
          label: 'Wilmington studio / 1BR',
          value: '$500–$2,300+',
          note: 'Stairs and elevators dominate',
        },
        {
          label: 'Suburban 2–3BR house',
          value: '$1,600–$4,800+',
          note: 'HOAs common',
        },
        {
          label: 'Intrastate mid-size (e.g. Wilmington ↔ Dover or Rehoboth)',
          value: '$1,400–$4,800+',
          note: 'Beach traffic matters',
        },
        {
          label: 'Typical 2–3 person crew (New Castle County)',
          value: '$120–$220+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'Wilmington multi-unit buildings add stair and elevator time.',
        'Sussex beach season compresses crews and road capacity.',
        'Many hauls become interstate into PA, MD, or NJ within minutes.',
        'HOA windows are common in northern suburbs.',
        'Winter ice forces flexible dates.',
      ],
    },
    routes: {
      title: 'Popular Delaware moving routes',
      intro:
        'Delaware sits between Northeast metros and Mid-Atlantic beach markets with constant short interstate hops into Pennsylvania, Maryland, and New Jersey. Interstate jobs need FMCSA authority; pure in-state jobs need careful insurance and contract verification.',
      migrationProfile: 'outbound_dominant',
      outbound: [
        {
          label: 'Delaware → Florida / Carolinas',
          href: '/moving-to/florida',
          origins: 'New Castle, Sussex',
          transit: 'Multi-day I-95',
          planningNote: 'Book early for winter arrivals.',
          note: 'High-volume Mid-Atlantic snowbird corridor.',
        },
        {
          label: 'Delaware → Pennsylvania / Maryland / New Jersey',
          href: '/local-movers/pennsylvania',
          origins: 'Statewide',
          transit: 'Often same-day interstate',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Extremely common short cross-border metro moves.',
        },
        {
          label: 'Delaware → Virginia / North Carolina',
          href: '/local-movers/virginia',
          origins: 'New Castle, Kent',
          transit: 'I-95 multi-day',
          planningNote: 'Confirm FMCSA authority end-to-end.',
          note: 'Common lifestyle outbound destinations.',
        },
      ],
      inbound: [
        {
          label: 'Moving to New Castle County',
          href: '/local-movers/delaware/new-castle',
          note: 'Wilmington multi-unit access and Philly-adjacent patterns.',
        },
        {
          label: 'Moving to Kent County',
          href: '/local-movers/delaware/kent',
          note: 'Dover capital corridors and central suburbs.',
        },
        {
          label: 'Moving to Sussex County',
          href: '/local-movers/delaware/sussex',
          note: 'Beach-town access and summer tourism peaks.',
        },
      ],
    },
    challenges: {
      title: 'Delaware-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real Delaware moves — not generic national checklist filler.',
      items: [
        {
          title: 'Constant short interstate hops',
          detail:
            'Jobs into Pennsylvania, Maryland, or New Jersey are interstate even if short. Confirm FMCSA authority before deposits.',
        },
        {
          title: 'Limited state HHG permit regime',
          detail:
            'Without a dedicated consumer HHG license lookup, demand insurance certificates, written estimates, and FMCSA checks for any border hop.',
        },
        {
          title: 'Sussex beach season',
          detail:
            'Summer traffic can double transit time to coastal towns. Avoid Friday arrivals when possible.',
        },
        {
          title: 'Wilmington multi-unit access',
          detail:
            'Stairs, elevators, and limited staging dominate. Share approach photos early.',
        },
        {
          title: 'HOA windows in northern suburbs',
          detail:
            'New Castle growth communities often restrict elevator and loading hours. Get rules in writing.',
        },
      ],
    },
    tools: SHARED_TOOLS('Delaware'),
    faq: [
      {
        question: 'Do Delaware movers need a special household goods license?',
        answer:
          'Consumer sources commonly state Delaware does not require a special state household goods certificate for pure intrastate movers. Consumers should still verify insurance, written contracts, and FMCSA authority for any out-of-state leg.',
      },
      {
        question: 'How do I verify a Delaware mover for an interstate move?',
        answer:
          'Look up USDOT / MC authority on FMCSA SAFER for the legal name on your estimate. Also request certificates of insurance and written inventory estimates.',
      },
      {
        question: 'How much does a local Wilmington move cost?',
        answer:
          'Planning ranges often fall around $500–$2,300+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates.',
      },
      {
        question: 'Is a Wilmington-to-Rehoboth move interstate?',
        answer:
          'No — both ends are in Delaware. Focus on beach-season traffic, packing, and inventory-based written estimates.',
      },
      {
        question: 'When is peak moving season in Delaware?',
        answer:
          'Statewide peak is typically May–September. Sussex beach season creates additional summer demand.',
      },
      {
        question: 'Does a Wilmington-to-Philadelphia move need FMCSA authority?',
        answer:
          'Yes. Crossing into Pennsylvania is interstate even for short hops. Confirm active FMCSA operating authority.',
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
  ['new-hampshire', 'newHampshireStateResourceHub', packs['new-hampshire']],
  ['vermont', 'vermontStateResourceHub', packs.vermont],
  ['rhode-island', 'rhodeIslandStateResourceHub', packs['rhode-island']],
  ['delaware', 'delawareStateResourceHub', packs.delaware],
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

// Full registry — all 50 states
writeFileSync(
  'lib/local-movers/state-resource-hub/registry.ts',
  `import { alabamaStateResourceHub } from '@/lib/local-movers/state-resource-hub/alabama';
import { alaskaStateResourceHub } from '@/lib/local-movers/state-resource-hub/alaska';
import { arizonaStateResourceHub } from '@/lib/local-movers/state-resource-hub/arizona';
import { arkansasStateResourceHub } from '@/lib/local-movers/state-resource-hub/arkansas';
import { californiaStateResourceHub } from '@/lib/local-movers/state-resource-hub/california';
import { coloradoStateResourceHub } from '@/lib/local-movers/state-resource-hub/colorado';
import { connecticutStateResourceHub } from '@/lib/local-movers/state-resource-hub/connecticut';
import { delawareStateResourceHub } from '@/lib/local-movers/state-resource-hub/delaware';
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
import { newHampshireStateResourceHub } from '@/lib/local-movers/state-resource-hub/new-hampshire';
import { newJerseyStateResourceHub } from '@/lib/local-movers/state-resource-hub/new-jersey';
import { newMexicoStateResourceHub } from '@/lib/local-movers/state-resource-hub/new-mexico';
import { newYorkStateResourceHub } from '@/lib/local-movers/state-resource-hub/new-york';
import { northCarolinaStateResourceHub } from '@/lib/local-movers/state-resource-hub/north-carolina';
import { northDakotaStateResourceHub } from '@/lib/local-movers/state-resource-hub/north-dakota';
import { ohioStateResourceHub } from '@/lib/local-movers/state-resource-hub/ohio';
import { oklahomaStateResourceHub } from '@/lib/local-movers/state-resource-hub/oklahoma';
import { oregonStateResourceHub } from '@/lib/local-movers/state-resource-hub/oregon';
import { pennsylvaniaStateResourceHub } from '@/lib/local-movers/state-resource-hub/pennsylvania';
import { rhodeIslandStateResourceHub } from '@/lib/local-movers/state-resource-hub/rhode-island';
import { southCarolinaStateResourceHub } from '@/lib/local-movers/state-resource-hub/south-carolina';
import { southDakotaStateResourceHub } from '@/lib/local-movers/state-resource-hub/south-dakota';
import { tennesseeStateResourceHub } from '@/lib/local-movers/state-resource-hub/tennessee';
import { texasStateResourceHub } from '@/lib/local-movers/state-resource-hub/texas';
import { utahStateResourceHub } from '@/lib/local-movers/state-resource-hub/utah';
import { vermontStateResourceHub } from '@/lib/local-movers/state-resource-hub/vermont';
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
  delawareStateResourceHub,
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
  newHampshireStateResourceHub,
  newJerseyStateResourceHub,
  newMexicoStateResourceHub,
  newYorkStateResourceHub,
  northCarolinaStateResourceHub,
  northDakotaStateResourceHub,
  ohioStateResourceHub,
  oklahomaStateResourceHub,
  oregonStateResourceHub,
  pennsylvaniaStateResourceHub,
  rhodeIslandStateResourceHub,
  southCarolinaStateResourceHub,
  southDakotaStateResourceHub,
  tennesseeStateResourceHub,
  texasStateResourceHub,
  utahStateResourceHub,
  vermontStateResourceHub,
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

console.log('registry updated with Wave 10 — ALL 50 STATES');
