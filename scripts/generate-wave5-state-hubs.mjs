/**
 * Wave 5 State Resource Hubs: MN, WI, AL, LA, KY
 * Run: node scripts/generate-wave5-state-hubs.mjs
 * Prerequisites: scripts/tmp-wave5-regions.json (0 orphans / 0 duplicates)
 */
import { readFileSync, writeFileSync } from 'fs';

const regions = JSON.parse(readFileSync('scripts/tmp-wave5-regions.json', 'utf8'));

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
 * Research brief (Wave 5):
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

const mnCount = getUniqueCountyCount('minnesota');
const wiCount = getUniqueCountyCount('wisconsin');
const alCount = getUniqueCountyCount('alabama');
const laCount = getUniqueCountyCount('louisiana');
const kyCount = getUniqueCountyCount('kentucky');

const packs = {
  minnesota: {
    stateSlug: 'minnesota',
    stateCode: 'MN',
    h1: `Minnesota Moving Resource Hub: Costs, MnDOT HHG Permits & ${mnCount} County Guides`,
    metaTitle: `Minnesota Movers Guide 2026 — Costs, MnDOT HHG Permits & ${mnCount} County Guides`,
    metaDescription:
      'Plan a move within, to, or from Minnesota. Compare local and intrastate costs, verify MnDOT household goods mover permits, browse 87 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for Minnesota moves in 2026 — typical costs, MnDOT HHG vs FMCSA rules, Twin Cities-to-North Shore regional guides, and tools to compare permitted movers without paid placements.',
    trustBar: [
      `${mnCount} County Guides`,
      'Verified Movers',
      'MnDOT & FMCSA Checked',
      'Updated 2026',
    ],
    intents: intents('Minnesota'),
    primaryCta: {
      label: 'Calculate My Minnesota Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in Minnesota is different',
      paragraphs: [
        'Minnesota is not one moving market. Twin Cities multi-unit elevators and winter street staging, Rochester medical corridors, Duluth hill access, lake-country seasonal homes, and long prairie hauls produce different access and labor profiles under one state name.',
        'For-hire household goods movers operating within Minnesota must hold a Household Goods Mover Permit from the Minnesota Department of Transportation (MnDOT) Office of Freight and Commercial Vehicle Operations. Interstate jobs need FMCSA authority. Deep freezes, lake-effect snow, and college lease peaks are planning inputs — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'Minnesota moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical Minnesota local and intrastate patterns; they are not bids. Always compare written estimates from MnDOT-permitted movers for in-state work and FMCSA-authorized carriers for interstate work.',
      stats: [
        {
          label: 'Typical Twin Cities studio / 1BR',
          value: '$550–$2,400+',
          note: 'Elevators, stairs, and winter staging',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$1,800–$5,500+',
          note: 'Metro HOAs common',
        },
        {
          label: 'Intrastate corridor (e.g. Minneapolis ↔ Duluth)',
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
          value: 'FL · AZ · TX · WI · IL · CO',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: String(mnCount),
          note: 'Twin Cities emphasized',
        },
      ],
    },
    regulations: {
      mode: 'strong_state_regulator',
      title: 'Minnesota moving regulations & consumer protection',
      intro:
        'Minnesota requires for-hire household goods movers operating within the state to obtain a Household Goods Mover Permit from MnDOT Commercial Vehicle Operations. Match the permit to the job before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside Minnesota)',
        body: 'If origin or destination is outside Minnesota, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. A Minnesota HHG permit alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within Minnesota)',
        body: 'Household goods carriers operating for hire within Minnesota need a MnDOT Household Goods Mover Permit (Minn. Stat. §221.121 framework). Permitted movers are expected to maintain insurance on file, publish rates/tariffs, and meet vehicle registration requirements. Consumers can search carriers through MnDOT OFCVO tools.',
      },
      verifySteps: [
        'Classify the job: entirely in Minnesota (MnDOT HHG permit) vs any out-of-state leg (FMCSA / USDOT).',
        'Copy the exact legal name from the written estimate.',
        'Intrastate: search MnDOT OFCVO carrier tools for an active household goods permit.',
        'Interstate: look up USDOT / MC on FMCSA SAFER.',
        'Ask for published rates/tariff materials and written inventory-based estimates.',
        'Avoid large cash deposits to unverified operators.',
      ],
      protections: [
        {
          title: 'MnDOT HHG permit requirement',
          detail:
            'For-hire household goods movers operating within Minnesota must obtain a Household Goods Mover Permit through MnDOT Commercial Vehicle Operations.',
        },
        {
          title: 'Insurance and tariff expectations',
          detail:
            'Industry and association guidance notes that Minnesota movers must carry required insurance on file and publish rates and charges in tariff form available on request.',
        },
        {
          title: 'Carrier search',
          detail:
            'MnDOT publishes carrier search tools so consumers can confirm permit status for the company named on an estimate.',
        },
      ],
      officialLinks: [
        {
          label: 'MnDOT — Household goods movers',
          href: 'https://www.dot.state.mn.us/cvo/household-goods.html',
          external: true,
        },
        {
          label: 'Minnesota eLicense — Household Goods Mover Permit',
          href: 'https://mn.gov/elicense/a-z/?id=1083-230879',
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
        'Licensing rules and lookup tools can change. Always verify current MnDOT household goods permit status or FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('minnesota', [
      {
        key: 'twin-cities',
        id: 'twin-cities',
        name: 'Twin Cities Metro',
        shortName: 'Twin Cities',
        blurb:
          'Hennepin, Ramsey, and collar counties with multi-unit elevators, winter street staging, and dense suburbs.',
        challenges: [
          'Elevators, stairs, and winter driveway access',
          'HOA windows in growth suburbs',
        ],
        ctaLabel: 'Explore Twin Cities',
      },
      {
        key: 'southeast-mn',
        id: 'southeast-mn',
        name: 'Southeast Minnesota',
        shortName: 'Southeast MN',
        blurb:
          'Rochester medical corridors, Winona bluffs, and agricultural counties with mixed multi-unit and farm access.',
        challenges: [
          'Bluff and river-city staging',
          'Medical and campus lease peaks',
        ],
        ctaLabel: 'Explore Southeast Minnesota',
      },
      {
        key: 'southwest-mn',
        id: 'southwest-mn',
        name: 'Southwest Minnesota',
        shortName: 'Southwest MN',
        blurb:
          'Prairie counties with longer driveway approaches and thinner local mover density.',
        challenges: [
          'Confirm coverage for remote addresses',
          'Wind and winter weather on plains corridors',
        ],
        ctaLabel: 'Explore Southwest Minnesota',
      },
      {
        key: 'central-mn',
        id: 'central-mn',
        name: 'Central Minnesota',
        shortName: 'Central MN',
        blurb:
          'St. Cloud, Brainerd lakes, and central counties with seasonal cabin moves and highway hauls.',
        challenges: [
          'Seasonal lake-home access',
          'Summer tourism congestion on lake roads',
        ],
        ctaLabel: 'Explore Central Minnesota',
      },
      {
        key: 'northwest-mn',
        id: 'northwest-mn',
        name: 'Northwest Minnesota',
        shortName: 'Northwest MN',
        blurb:
          'Moorhead–Fargo approaches and northwest agricultural counties with long portal-to-portal distances.',
        challenges: [
          'Distance from Twin Cities fleets',
          'Severe winter weather windows',
        ],
        ctaLabel: 'Explore Northwest Minnesota',
      },
      {
        key: 'northeast-mn',
        id: 'northeast-mn',
        name: 'Northeast Minnesota & North Shore',
        shortName: 'Northeast / North Shore',
        blurb:
          'Duluth hills, Iron Range, and North Shore counties with lake-effect weather and steep access.',
        challenges: [
          'Hill driveways and winter ice',
          'Longer regional hauls from the metro',
        ],
        ctaLabel: 'Explore Northeast / North Shore',
      },
    ]),
    costs: {
      title: 'Minnesota moving costs',
      intro:
        'Minnesota pricing reflects Twin Cities labor markets, winter weather delays, multi-unit access, and long north–south hauls. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate Minnesota moving costs',
        lastReviewed: '2026-07-23',
        body: 'These ranges are planning estimates, not quotes. They combine typical Minnesota local and intrastate patterns: home size, distance, stairs/elevators, parking, HOAs, winter weather, and regional labor. Actual bids vary under permitted mover tariff frameworks. Always compare written estimates from MnDOT-permitted movers for in-state work and FMCSA-authorized carriers for interstate work.',
      },
      ranges: [
        {
          label: 'Twin Cities studio / 1BR',
          value: '$550–$2,400+',
          note: 'Elevators and winter access dominate',
        },
        {
          label: 'Suburban 2–3BR house',
          value: '$1,700–$5,000+',
          note: 'Metro HOAs common',
        },
        {
          label: 'Intrastate mid-size (e.g. Minneapolis ↔ Rochester)',
          value: '$1,800–$5,500+',
          note: 'Season matters',
        },
        {
          label: 'Intrastate long (e.g. Minneapolis ↔ Duluth or Moorhead)',
          value: '$2,200–$7,500+',
          note: 'Weather and distance drive hours',
        },
        {
          label: 'Typical 2–3 person crew (Twin Cities)',
          value: '$125–$230+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'Winter ice and snow can erase productivity and force reschedules.',
        'Twin Cities multi-unit buildings add elevator and stair time.',
        'North Shore and Iron Range hills change truck access plans.',
        'College and medical lease cycles compress demand in Rochester and campus towns.',
        'Peak May–September fills crews early before winter risk rises.',
      ],
    },
    routes: {
      title: 'Popular Minnesota moving routes',
      intro:
        'Minnesota sees strong outbound Sun Belt flows, short interstate hops into Wisconsin, North Dakota, Iowa, and South Dakota, and large Twin Cities internal traffic. Interstate jobs need FMCSA authority; in-state corridors need MnDOT-permitted household goods movers.',
      migrationProfile: 'outbound_dominant',
      outbound: [
        {
          label: 'Minnesota → Florida',
          href: '/moving-to/florida',
          origins: 'Twin Cities, Rochester',
          transit: 'Multi-day; snowbird seasonality',
          planningNote: 'Book early for fall/winter FL arrivals.',
          note: 'High-volume Upper Midwest-to-Florida corridor.',
        },
        {
          label: 'Minnesota → Arizona / Texas',
          href: '/local-movers/arizona',
          origins: 'Twin Cities metro',
          transit: 'Multi-day interstate',
          planningNote: 'Confirm FMCSA authority end-to-end.',
          note: 'Popular job and lifestyle outbound destinations.',
        },
        {
          label: 'Minnesota → Wisconsin / Illinois',
          href: '/local-movers/wisconsin',
          origins: 'Twin Cities, Southeast MN',
          transit: 'Often same-day or next-day interstate',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Short cross-border metro moves are common.',
        },
      ],
      inbound: [
        {
          label: 'Moving to Hennepin County (Minneapolis)',
          href: '/local-movers/minnesota/hennepin',
          note: 'Multi-unit elevators and dense urban staging.',
        },
        {
          label: 'Moving to Ramsey County (St. Paul)',
          href: '/local-movers/minnesota/ramsey',
          note: 'Urban stock and winter street logistics.',
        },
        {
          label: 'Moving to Dakota County',
          href: '/local-movers/minnesota/dakota',
          note: 'South-metro suburbs and HOA communities.',
        },
      ],
    },
    challenges: {
      title: 'Minnesota-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real Minnesota moves — not generic national checklist filler.',
      items: [
        {
          title: 'Deep-freeze and ice access',
          detail:
            'Driveways and loading zones can ice over for days. Build weather buffers November–March and share photos of approaches.',
        },
        {
          title: 'Twin Cities multi-unit logistics',
          detail:
            'Elevators, loading docks, and street permits dominate Minneapolis–St. Paul jobs. Reserve elevators early.',
        },
        {
          title: 'North Shore and Duluth hills',
          detail:
            'Steep grades may require smaller trucks or shuttle strategies. Confirm access with estimators before move day.',
        },
        {
          title: 'Lake-cabin seasonal peaks',
          detail:
            'Memorial Day through Labor Day compresses cabin-country demand. Book early for Crow Wing and lake counties.',
        },
        {
          title: 'MnDOT permit verification',
          detail:
            'Confirm the exact legal name holds an active Minnesota household goods mover permit before deposits on in-state work.',
        },
      ],
    },
    tools: SHARED_TOOLS('Minnesota'),
    faq: [
      {
        question: 'Do Minnesota movers need a state permit?',
        answer:
          'Yes. For-hire household goods movers operating within Minnesota generally need a Household Goods Mover Permit from MnDOT. Interstate moves require FMCSA authority.',
      },
      {
        question: 'How do I verify a Minnesota mover?',
        answer:
          'Use MnDOT OFCVO carrier search tools and match the legal name on your written estimate. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER.',
      },
      {
        question: 'How much does a local Twin Cities move cost?',
        answer:
          'Planning ranges often fall around $550–$2,400+ for a studio/1BR and more for larger homes, driven by elevators, stairs, and season. Use the calculator, then compare written estimates.',
      },
      {
        question: 'Is a Minneapolis-to-Duluth move intrastate?',
        answer:
          'Yes — both ends are in Minnesota, so you generally need a MnDOT-permitted household goods mover.',
      },
      {
        question: 'When is peak moving season in Minnesota?',
        answer:
          'Statewide peak is typically May–September. Winter weather can force flexible dates even outside peak.',
      },
      {
        question: 'Does a Twin Cities-to-Wisconsin move need FMCSA authority?',
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
          label: 'MnDOT — Household goods movers',
          href: 'https://www.dot.state.mn.us/cvo/household-goods.html',
        },
        {
          label: 'Minnesota eLicense — HHG Mover Permit',
          href: 'https://mn.gov/elicense/a-z/?id=1083-230879',
        },
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  },

  wisconsin: {
    stateSlug: 'wisconsin',
    stateCode: 'WI',
    h1: `Wisconsin Moving Resource Hub: Costs, FMCSA Checks & ${wiCount} County Guides`,
    metaTitle: `Wisconsin Movers Guide 2026 — Costs, Interstate Authority & ${wiCount} County Guides`,
    metaDescription:
      'Plan a move within, to, or from Wisconsin. Compare local and intrastate costs, understand Wisconsin’s limited state HHG framework versus FMCSA interstate rules, browse 72 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for Wisconsin moves in 2026 — typical costs, FMCSA-first verification for interstate work, Milwaukee-to-Northwoods regional guides, and tools to compare movers without paid placements.',
    trustBar: [
      `${wiCount} County Guides`,
      'Verified Movers',
      'FMCSA-Focused Checks',
      'Updated 2026',
    ],
    intents: intents('Wisconsin'),
    primaryCta: {
      label: 'Calculate My Wisconsin Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in Wisconsin is different',
      paragraphs: [
        'Wisconsin is not one moving market. Milwaukee multi-unit and lake-effect snow, Madison campus peaks, Fox Valley industrial corridors, Door County seasonal logistics, and Northwoods cabin access produce different access and labor profiles under one state name.',
        'Unlike many states, Wisconsin does not operate a dedicated household-goods permit regime comparable to Minnesota MnDOT or Illinois ICC. Interstate jobs still need FMCSA authority. For in-state work, consumers should still insist on insurance, written estimates, and clear legal names — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'Wisconsin moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical Wisconsin local and intrastate patterns; they are not bids. Always compare written estimates and confirm FMCSA authority for any out-of-state leg.',
      stats: [
        {
          label: 'Typical Milwaukee studio / 1BR',
          value: '$500–$2,300+',
          note: 'Stairs, elevators, and winter staging',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$1,700–$5,000+',
          note: 'SE WI HOAs common',
        },
        {
          label: 'Intrastate corridor (e.g. Milwaukee ↔ Madison)',
          value: '$1,800–$5,500+',
          note: 'Season and packing drive the spread',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'Winter weather forces flexible dates',
        },
        {
          label: 'Top outbound destinations',
          value: 'FL · AZ · IL · MN · TX · CO',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: String(wiCount),
          note: 'SE Wisconsin emphasized',
        },
      ],
    },
    regulations: {
      mode: 'limited_or_none',
      title: 'Wisconsin moving regulations & consumer protection',
      intro:
        'Wisconsin does not maintain a California-style dedicated household goods state permit directory for most local movers. Consumer protection still depends on insurance, contracts, and — for any out-of-state leg — FMCSA authority. Verify credentials carefully before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside Wisconsin)',
        body: 'If origin or destination is outside Wisconsin, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. Do not treat a Wisconsin business registration alone as interstate authority.',
      },
      intrastate: {
        title: 'Intrastate (entirely within Wisconsin)',
        body: 'Wisconsin generally lacks a strong state household-goods certificate program comparable to neighboring Minnesota or Illinois. That does not mean “anything goes”: insist on written estimates, cargo and liability insurance certificates, a clear legal business name, and references. Local municipal rules (parking, street permits) still apply.',
      },
      verifySteps: [
        'Classify the job: entirely in Wisconsin vs any out-of-state leg (FMCSA / USDOT required).',
        'Copy the exact legal name from the written estimate.',
        'Interstate or cross-border: look up USDOT / MC on FMCSA SAFER before deposits.',
        'Intrastate: request certificates of insurance, written inventory estimates, and business registration details.',
        'Confirm parking and street-permit needs with your city or HOA.',
        'Avoid large cash deposits to unverified operators; document all agreements in writing.',
      ],
      protections: [
        {
          title: 'FMCSA for interstate moves',
          detail:
            'Any move that crosses a state line is generally under federal household goods rules — verify active FMCSA authority and USDOT numbers on SAFER.',
        },
        {
          title: 'Written estimates and insurance',
          detail:
            'Without a strong state HHG permit regime, written estimates and proof of cargo/liability insurance become your primary consumer controls on local jobs.',
        },
        {
          title: 'Municipal access rules',
          detail:
            'Cities and HOAs may still require parking permits, elevator certificates, and loading-window compliance even when state HHG licensing is limited.',
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
        'Regulatory frameworks can change. Always verify current FMCSA authority for interstate work and obtain insurance and written contracts for local work. This page is educational, not legal advice.',
    },
    regions: regionObjects('wisconsin', [
      {
        key: 'milwaukee-southeast',
        id: 'milwaukee-southeast',
        name: 'Milwaukee & Southeast Wisconsin',
        shortName: 'SE Wisconsin',
        blurb:
          'Milwaukee, Waukesha, Racine, Kenosha, and neighbors with multi-unit stock, suburbs, and lake-effect weather.',
        challenges: [
          'Stairs, elevators, and winter staging',
          'Lake-effect snow windows',
        ],
        ctaLabel: 'Explore SE Wisconsin',
      },
      {
        key: 'madison-south-central',
        id: 'madison-south-central',
        name: 'Madison & South Central',
        shortName: 'Madison / South Central',
        blurb:
          'Dane County campus peaks, Rock County industrial towns, and south-central agricultural corridors.',
        challenges: [
          'Campus lease-cycle peaks',
          'Mix of multi-unit and rural access',
        ],
        ctaLabel: 'Explore Madison / South Central',
      },
      {
        key: 'fox-valley-northeast',
        id: 'fox-valley-northeast',
        name: 'Fox Valley & Northeast',
        shortName: 'Fox Valley / NE',
        blurb:
          'Green Bay, Appleton, Oshkosh, and Door County approaches with industrial and seasonal tourism mix.',
        challenges: [
          'Door County seasonal congestion',
          'Industrial-shift timing in Fox cities',
        ],
        ctaLabel: 'Explore Fox Valley / Northeast',
      },
      {
        key: 'northwoods',
        id: 'northwoods',
        name: 'Northwoods & Western Wisconsin',
        shortName: 'Northwoods / West',
        blurb:
          'Wausau, Eau Claire, La Crosse, and Northwoods counties with cabin access, hills, and long hauls.',
        challenges: [
          'Seasonal cabin roads and driveways',
          'Confirm mover coverage for remote addresses',
        ],
        ctaLabel: 'Explore Northwoods / West',
      },
    ]),
    costs: {
      title: 'Wisconsin moving costs',
      intro:
        'Wisconsin pricing reflects Milwaukee and Madison labor markets, winter weather, multi-unit access, and long Northwoods hauls. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate Wisconsin moving costs',
        lastReviewed: '2026-07-23',
        body: 'These ranges are planning estimates, not quotes. They combine typical Wisconsin local and intrastate patterns: home size, distance, stairs/elevators, parking, HOAs, winter weather, and regional labor. Actual bids vary. Always compare written estimates and confirm FMCSA authority for any out-of-state leg.',
      },
      ranges: [
        {
          label: 'Milwaukee studio / 1BR',
          value: '$500–$2,300+',
          note: 'Stairs and winter access dominate',
        },
        {
          label: 'Suburban 2–3BR house',
          value: '$1,600–$4,800+',
          note: 'SE WI HOAs common',
        },
        {
          label: 'Intrastate mid-size (e.g. Milwaukee ↔ Madison)',
          value: '$1,700–$5,000+',
          note: 'Season matters',
        },
        {
          label: 'Intrastate long (e.g. Milwaukee ↔ Superior or Door County)',
          value: '$2,200–$7,000+',
          note: 'Distance and seasonality push the top',
        },
        {
          label: 'Typical 2–3 person crew (SE Wisconsin)',
          value: '$120–$220+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'Lake-effect snow belts can shut down access with little notice.',
        'Milwaukee multi-unit buildings add stair and elevator time.',
        'Madison campus calendars compress August demand.',
        'Northwoods cabin roads may need smaller trucks or shuttles.',
        'Short hops into IL or MN are interstate even when nearby.',
      ],
    },
    routes: {
      title: 'Popular Wisconsin moving routes',
      intro:
        'Wisconsin sees strong outbound Sun Belt flows and constant short interstate hops into Illinois, Minnesota, Michigan, and Iowa, plus large Milwaukee–Madison internal traffic. Interstate jobs need FMCSA authority; local jobs need careful insurance and contract verification.',
      migrationProfile: 'outbound_dominant',
      outbound: [
        {
          label: 'Wisconsin → Florida',
          href: '/moving-to/florida',
          origins: 'Milwaukee, Madison, Fox Valley',
          transit: 'Multi-day; snowbird seasonality',
          planningNote: 'Book early for fall/winter FL arrivals.',
          note: 'High-volume Upper Midwest-to-Florida corridor.',
        },
        {
          label: 'Wisconsin → Arizona / Texas',
          href: '/local-movers/arizona',
          origins: 'SE Wisconsin, Madison',
          transit: 'Multi-day interstate',
          planningNote: 'Confirm FMCSA authority end-to-end.',
          note: 'Popular lifestyle outbound destinations.',
        },
        {
          label: 'Wisconsin → Illinois / Minnesota',
          href: '/local-movers/illinois',
          origins: 'Kenosha, Milwaukee, western WI',
          transit: 'Often same-day interstate',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Short cross-border metro moves are common.',
        },
      ],
      inbound: [
        {
          label: 'Moving to Milwaukee County',
          href: '/local-movers/wisconsin/milwaukee',
          note: 'Multi-unit access and lake-effect weather.',
        },
        {
          label: 'Moving to Dane County (Madison)',
          href: '/local-movers/wisconsin/dane',
          note: 'Campus peaks and mixed suburban stock.',
        },
        {
          label: 'Moving to Waukesha County',
          href: '/local-movers/wisconsin/waukesha',
          note: 'West-metro suburbs and HOA communities.',
        },
      ],
    },
    challenges: {
      title: 'Wisconsin-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real Wisconsin moves — not generic national checklist filler.',
      items: [
        {
          title: 'Lake-effect and deep winter',
          detail:
            'Snow belts along Lake Michigan and inland freezes can cancel move days. Build buffers November–March.',
        },
        {
          title: 'Limited state HHG permit regime',
          detail:
            'Without a strong state permit lookup, demand insurance certificates, written estimates, and FMCSA checks for any border hop.',
        },
        {
          title: 'Madison campus peaks',
          detail:
            'Late August student turnovers compress crews. Book earlier than a typical civilian calendar.',
        },
        {
          title: 'Northwoods cabin access',
          detail:
            'Seasonal roads and long driveways may need shuttle trucks. Share GPS pins and photos early.',
        },
        {
          title: 'Short interstate hops',
          detail:
            'Moves into Illinois, Minnesota, or Michigan are interstate even if short. Confirm FMCSA authority before deposits.',
        },
      ],
    },
    tools: SHARED_TOOLS('Wisconsin'),
    faq: [
      {
        question: 'Do Wisconsin movers need a special state household goods license?',
        answer:
          'Wisconsin generally does not operate a dedicated household goods permit program comparable to Minnesota or Illinois. Consumers should still verify insurance, written contracts, and FMCSA authority for any out-of-state leg.',
      },
      {
        question: 'How do I verify a Wisconsin mover for an interstate move?',
        answer:
          'Look up USDOT / MC authority on FMCSA SAFER for the legal name on your estimate. Also request certificates of insurance and written inventory estimates.',
      },
      {
        question: 'How much does a local Milwaukee move cost?',
        answer:
          'Planning ranges often fall around $500–$2,300+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates.',
      },
      {
        question: 'Is a Milwaukee-to-Madison move interstate?',
        answer:
          'No — both ends are in Wisconsin. Focus on insurance, written estimates, and access logistics rather than FMCSA authority for pure in-state jobs.',
      },
      {
        question: 'When is peak moving season in Wisconsin?',
        answer:
          'Statewide peak is typically May–September. Winter weather can force flexible dates even outside peak.',
      },
      {
        question: 'Does a Kenosha-to-Chicago move need FMCSA authority?',
        answer:
          'Yes. Crossing into Illinois is interstate even for short hops. Confirm active FMCSA operating authority and a USDOT number.',
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

  alabama: {
    stateSlug: 'alabama',
    stateCode: 'AL',
    h1: `Alabama Moving Resource Hub: Costs, APSC Certificates & ${alCount} County Guides`,
    metaTitle: `Alabama Movers Guide 2026 — Costs, APSC HHG Certificates & ${alCount} County Guides`,
    metaDescription:
      'Plan a move within, to, or from Alabama. Compare local and intrastate costs, verify Alabama PSC household goods certificates, browse 67 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for Alabama moves in 2026 — typical costs, APSC vs FMCSA rules, Birmingham-to-Gulf Coast regional guides, and tools to compare certificated movers without paid placements.',
    trustBar: [
      `${alCount} County Guides`,
      'Verified Movers',
      'APSC & FMCSA Checked',
      'Updated 2026',
    ],
    intents: intents('Alabama'),
    primaryCta: {
      label: 'Calculate My Alabama Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in Alabama is different',
      paragraphs: [
        'Alabama is not one moving market. Birmingham multi-story stock and hills, Huntsville growth corridors, Montgomery capital logistics, Mobile humidity and port traffic, and Gulf Coast vacation-home peaks produce different access and labor profiles under one state name.',
        'Intrastate household goods carriers need an Alabama Public Service Commission (APSC) certificate or permit for for-hire transportation between points in Alabama. Interstate jobs need FMCSA authority. Summer heat, college lease peaks, and tornado-season weather are planning inputs — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'Alabama moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical Alabama local and intrastate patterns; they are not bids. Always compare written estimates from APSC-certificated movers for in-state work and FMCSA-authorized carriers for interstate work.',
      stats: [
        {
          label: 'Typical Birmingham studio / 1BR',
          value: '$450–$2,000+',
          note: 'Stairs and heat matter',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$1,500–$4,800+',
          note: 'HOAs in growth suburbs',
        },
        {
          label: 'Intrastate corridor (e.g. Birmingham ↔ Mobile)',
          value: '$1,800–$5,500+',
          note: 'Season and packing drive the spread',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'Heat and humidity affect productivity',
        },
        {
          label: 'Top outbound destinations',
          value: 'FL · TX · GA · TN · NC',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: String(alCount),
          note: 'Birmingham and Huntsville emphasized',
        },
      ],
    },
    regulations: {
      mode: 'strong_state_regulator',
      title: 'Alabama moving regulations & consumer protection',
      intro:
        'Alabama requires an APSC certificate or permit when household goods are transported by motor vehicle for compensation from one point in Alabama to another (unless exempted by law). Match the certificate to the job before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside Alabama)',
        body: 'If origin or destination is outside Alabama, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. An APSC household goods certificate alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within Alabama)',
        body: 'APSC regulates intrastate motor carriers of household goods. Carriers file Form 14H applications, maintain cargo insurance, and keep approved tariffs on file. Household goods carriers also file annual reports. Consumers should confirm active authority and written estimates before hiring.',
      },
      verifySteps: [
        'Classify the job: entirely in Alabama (APSC) vs any out-of-state leg (FMCSA / USDOT).',
        'Copy the exact legal name from the written estimate.',
        'Intrastate: confirm APSC household goods certificate/permit for the company.',
        'Interstate: look up USDOT / MC on FMCSA SAFER.',
        'Get written estimates and clarity on stairs, long carries, and packing.',
        'Avoid large cash deposits to unverified operators.',
      ],
      protections: [
        {
          title: 'APSC certificate or permit',
          detail:
            'An APSC certificate or permit is required for for-hire household goods transportation between points in Alabama unless exempted by law.',
        },
        {
          title: 'Cargo insurance and tariffs',
          detail:
            'Regulated household goods carriers must maintain cargo insurance and have approved tariffs on file with the Commission.',
        },
        {
          title: 'Annual reporting',
          detail:
            'Household goods carriers are required to file annual reports with APSC — a marker of ongoing regulated status.',
        },
      ],
      officialLinks: [
        {
          label: 'APSC — Motor carrier applications & forms',
          href: 'https://psc.alabama.gov/motor-carrier-applications-forms/',
          external: true,
        },
        {
          label: 'APSC — Motor Carrier Section',
          href: 'https://psc.alabama.gov/motor-carrier-section/',
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
        'Licensing rules and forms can change. Always verify current APSC authority or FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('alabama', [
      {
        key: 'birmingham-central',
        id: 'birmingham-central',
        name: 'Birmingham & Central Alabama',
        shortName: 'Birmingham / Central',
        blurb:
          'Jefferson, Shelby, and central counties with hills, multi-story stock, and growth suburbs.',
        challenges: [
          'Hill access and older multi-story homes',
          'HOA windows in Shelby growth corridors',
        ],
        ctaLabel: 'Explore Birmingham / Central',
      },
      {
        key: 'huntsville-north',
        id: 'huntsville-north',
        name: 'Huntsville & North Alabama',
        shortName: 'North Alabama',
        blurb:
          'Madison County growth, Tennessee Valley towns, and north Alabama industrial corridors.',
        challenges: [
          'Growth-suburb HOA calendars',
          'Defense and aerospace employment cycles',
        ],
        ctaLabel: 'Explore North Alabama',
      },
      {
        key: 'montgomery-river',
        id: 'montgomery-river',
        name: 'Montgomery & River Region',
        shortName: 'Montgomery / River',
        blurb:
          'Capital-city logistics and Black Belt counties with longer rural approaches.',
        challenges: [
          'Heat and humidity productivity loss',
          'Confirm coverage for rural addresses',
        ],
        ctaLabel: 'Explore Montgomery / River',
      },
      {
        key: 'mobile-south',
        id: 'mobile-south',
        name: 'Mobile, Gulf Coast & Southeast',
        shortName: 'Mobile / South',
        blurb:
          'Mobile, Baldwin, Wiregrass, and southeast counties with humidity, port traffic, and beach peaks.',
        challenges: [
          'Hurricane-season date risk',
          'Beach and port congestion windows',
        ],
        ctaLabel: 'Explore Mobile / South',
      },
      {
        key: 'tuscaloosa-west',
        id: 'tuscaloosa-west',
        name: 'Tuscaloosa & West Alabama',
        shortName: 'Tuscaloosa / West',
        blurb:
          'Tuscaloosa campus peaks and western counties with mixed urban-rural access.',
        challenges: [
          'Campus lease-cycle peaks',
          'Distance from major metro fleets',
        ],
        ctaLabel: 'Explore Tuscaloosa / West',
      },
    ]),
    costs: {
      title: 'Alabama moving costs',
      intro:
        'Alabama pricing reflects Birmingham and Huntsville labor markets, heat, hills, and long north–south hauls. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate Alabama moving costs',
        lastReviewed: '2026-07-23',
        body: 'These ranges are planning estimates, not quotes. They combine typical Alabama local and intrastate patterns: home size, distance, stairs, parking, HOAs, heat, and regional labor. Actual bids vary under APSC tariff frameworks for certificated carriers. Always compare written estimates from APSC-certificated movers for in-state work and FMCSA-authorized carriers for interstate work.',
      },
      ranges: [
        {
          label: 'Birmingham studio / 1BR',
          value: '$450–$2,000+',
          note: 'Stairs and heat dominate',
        },
        {
          label: 'Suburban 2–3BR house',
          value: '$1,500–$4,500+',
          note: 'HOAs vary by suburb',
        },
        {
          label: 'Intrastate mid-size (e.g. Birmingham ↔ Huntsville)',
          value: '$1,600–$5,000+',
          note: 'Season matters',
        },
        {
          label: 'Intrastate long (e.g. Huntsville ↔ Mobile)',
          value: '$2,000–$6,500+',
          note: 'Full packing pushes the top',
        },
        {
          label: 'Typical 2–3 person crew (major metros)',
          value: '$110–$200+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'Summer heat and humidity slow outdoor labor.',
        'Birmingham hills can require shuttle strategies.',
        'Gulf Coast hurricane season adds date risk.',
        'College towns compress August demand.',
        'Short hops into FL, GA, TN, or MS are interstate even when nearby.',
      ],
    },
    routes: {
      title: 'Popular Alabama moving routes',
      intro:
        'Alabama sits between Southeast growth markets with strong outbound flows to Florida and Texas and large Birmingham–Huntsville–Mobile internal traffic. Interstate jobs need FMCSA authority; in-state corridors need APSC-certificated household goods carriers.',
      migrationProfile: 'outbound_dominant',
      outbound: [
        {
          label: 'Alabama → Florida',
          href: '/moving-to/florida',
          origins: 'Birmingham, Huntsville, Mobile',
          transit: 'Often next-day or multi-day I-10/I-65',
          planningNote: 'Confirm FMCSA authority end-to-end.',
          note: 'High-volume Southeast corridor.',
        },
        {
          label: 'Alabama → Texas / Georgia',
          href: '/local-movers/texas',
          origins: 'Statewide metros',
          transit: 'I-20 / I-85 multi-day',
          planningNote: 'HOAs at destination common in growth metros.',
          note: 'Popular job-driven outbound routes.',
        },
        {
          label: 'Alabama → Tennessee',
          href: '/local-movers/tennessee',
          origins: 'North Alabama',
          transit: 'Often same-day or next-day interstate',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Short cross-border metro moves are common.',
        },
      ],
      inbound: [
        {
          label: 'Moving to Jefferson County (Birmingham)',
          href: '/local-movers/alabama/jefferson',
          note: 'Hills, multi-story stock, and suburban mix.',
        },
        {
          label: 'Moving to Madison County (Huntsville)',
          href: '/local-movers/alabama/madison',
          note: 'Growth suburbs and employment-driven inbound.',
        },
        {
          label: 'Moving to Mobile County',
          href: '/local-movers/alabama/mobile',
          note: 'Humidity, port traffic, and coastal access.',
        },
      ],
    },
    challenges: {
      title: 'Alabama-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real Alabama moves — not generic national checklist filler.',
      items: [
        {
          title: 'Heat and humidity',
          detail:
            'Summer outdoor labor slows quickly. Prefer early start times May–September.',
        },
        {
          title: 'Birmingham hills',
          detail:
            'Steep driveways may need smaller trucks or shuttles. Share approach photos early.',
        },
        {
          title: 'Gulf hurricane season',
          detail:
            'Coastal jobs can reschedule with little notice June–November. Keep flexible dates.',
        },
        {
          title: 'College lease peaks',
          detail:
            'Tuscaloosa and other campus markets compress August demand. Book early.',
        },
        {
          title: 'APSC certificate verification',
          detail:
            'Confirm the exact legal name holds active APSC household goods authority before deposits on in-state work.',
        },
      ],
    },
    tools: SHARED_TOOLS('Alabama'),
    faq: [
      {
        question: 'Do Alabama movers need an APSC certificate?',
        answer:
          'Yes. For-hire household goods transportation between points in Alabama generally requires an APSC certificate or permit. Interstate moves require FMCSA authority.',
      },
      {
        question: 'How do I verify an Alabama mover?',
        answer:
          'Confirm APSC household goods authority for the legal name on your estimate using Commission motor carrier resources. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER.',
      },
      {
        question: 'How much does a local Birmingham move cost?',
        answer:
          'Planning ranges often fall around $450–$2,000+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates.',
      },
      {
        question: 'Is a Birmingham-to-Mobile move intrastate?',
        answer:
          'Yes — both ends are in Alabama, so you generally need an APSC-certificated household goods carrier.',
      },
      {
        question: 'When is peak moving season in Alabama?',
        answer:
          'Statewide peak is typically May–September. Heat and humidity can affect summer productivity.',
      },
      {
        question: 'Does a Huntsville-to-Nashville move need FMCSA authority?',
        answer:
          'Yes. Crossing into Tennessee is interstate even for relatively short hauls. Confirm active FMCSA operating authority.',
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
          label: 'APSC — Motor carrier applications',
          href: 'https://psc.alabama.gov/motor-carrier-applications-forms/',
        },
        {
          label: 'APSC — Motor Carrier Section',
          href: 'https://psc.alabama.gov/motor-carrier-section/',
        },
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  },

  louisiana: {
    stateSlug: 'louisiana',
    stateCode: 'LA',
    h1: `Louisiana Moving Resource Hub: Costs, LPSC Certificates & ${laCount} Parish Guides`,
    metaTitle: `Louisiana Movers Guide 2026 — Costs, LPSC HHG Certificates & ${laCount} Parish Guides`,
    metaDescription:
      'Plan a move within, to, or from Louisiana. Compare local and intrastate costs, verify LPSC household goods carrier certificates, browse 64 parish guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for Louisiana moves in 2026 — typical costs, LPSC vs FMCSA rules, New Orleans-to-Shreveport regional guides, and tools to compare certificated movers without paid placements.',
    trustBar: [
      `${laCount} Parish Guides`,
      'Verified Movers',
      'LPSC & FMCSA Checked',
      'Updated 2026',
    ],
    intents: intents('Louisiana'),
    primaryCta: {
      label: 'Calculate My Louisiana Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Parishes', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in Louisiana is different',
      paragraphs: [
        'Louisiana is not one moving market. New Orleans shotgun houses and flood-zone access, Baton Rouge capital logistics, Lafayette Acadiana culture corridors, Lake Charles industrial traffic, and Shreveport north Louisiana patterns produce different access and labor profiles under one state name.',
        'Intrastate household goods common carriers must hold a Louisiana Public Service Commission (LPSC) certificate. Carriers must advertise LPSC certificate numbers on estimates and provide written estimates (or written waivers) before service. Interstate jobs need FMCSA authority. Hurricane season, humidity, and raised-home access are planning inputs — then open the region and parish that match your addresses.',
      ],
    },
    snapshot: {
      title: 'Louisiana moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical Louisiana local and intrastate patterns; they are not bids. Always compare written estimates from LPSC-certificated movers for in-state work and FMCSA-authorized carriers for interstate work.',
      stats: [
        {
          label: 'Typical New Orleans studio / 1BR',
          value: '$500–$2,300+',
          note: 'Narrow streets, stairs, and humidity',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$1,600–$5,000+',
          note: 'HOAs and raised homes vary',
        },
        {
          label: 'Intrastate corridor (e.g. New Orleans ↔ Baton Rouge)',
          value: '$1,700–$5,500+',
          note: 'I-10 timing and packing matter',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'Hurricane season adds date risk',
        },
        {
          label: 'Top outbound destinations',
          value: 'TX · FL · MS · AR · GA',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'Parish guides',
          value: String(laCount),
          note: 'New Orleans and Baton Rouge emphasized',
        },
      ],
    },
    regulations: {
      mode: 'strong_state_regulator',
      title: 'Louisiana moving regulations & consumer protection',
      intro:
        'Louisiana requires common carriers of household goods to obtain an LPSC certificate before operating intrastate. Match the certificate to the job before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside Louisiana)',
        body: 'If origin or destination is outside Louisiana, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. An LPSC household goods certificate alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within Louisiana)',
        body: 'No motor carrier may operate as a common carrier of household goods without an LPSC certificate under R.S. 45:164 frameworks and Commission general orders. Carriers must maintain a permanent establishment in Louisiana, include LPSC certificate numbers on advertising and written estimates, and provide written estimates before service (or a written waiver signed by both parties).',
      },
      verifySteps: [
        'Classify the job: entirely in Louisiana (LPSC) vs any out-of-state leg (FMCSA / USDOT).',
        'Copy the exact legal name and LPSC certificate number from the written estimate.',
        'Intrastate: verify LPSC household goods carrier status for the company.',
        'Interstate: look up USDOT / MC on FMCSA SAFER.',
        'Confirm you receive a written estimate (or signed written waiver) before any moving services begin.',
        'Avoid large cash deposits to unverified operators.',
      ],
      protections: [
        {
          title: 'LPSC household goods certificate',
          detail:
            'Louisiana law requires a Commission certificate for common carriers of household goods operating intrastate, with permanent establishment requirements for carriers serving Louisiana.',
        },
        {
          title: 'Certificate number on estimates and ads',
          detail:
            'LPSC general orders require household goods carriers to include legal/registered name, physical address, and LPSC certificate number in advertising, invoices, and written bids or estimates.',
        },
        {
          title: 'Written estimate requirement',
          detail:
            'Household goods carriers must provide customers a written estimate prior to conducting moving services, or obtain a written waiver signed by both parties.',
        },
      ],
      officialLinks: [
        {
          label: 'LPSC — Carrier household goods moving',
          href: 'https://www.lpsc.louisiana.gov/Carrier_HGM',
          external: true,
        },
        {
          label: 'LPSC — Motor carrier regulations & applications',
          href: 'https://lpsc.louisiana.gov/Carrier_Regs',
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
        'Licensing rules and general orders can change. Always verify current LPSC certificate status or FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('louisiana', [
      {
        key: 'new-orleans-metro',
        id: 'new-orleans-metro',
        name: 'New Orleans Metro',
        shortName: 'New Orleans Metro',
        blurb:
          'Orleans, Jefferson, St. Tammany, and neighbors with historic access, flood-zone logistics, and Northshore suburbs.',
        challenges: [
          'Narrow streets, stairs, and raised homes',
          'Hurricane-season date risk',
        ],
        ctaLabel: 'Explore New Orleans Metro',
      },
      {
        key: 'baton-rouge-capital',
        id: 'baton-rouge-capital',
        name: 'Baton Rouge & Capital Region',
        shortName: 'Baton Rouge / Capital',
        blurb:
          'East Baton Rouge and surrounding parishes with capital-city traffic and mixed suburban stock.',
        challenges: [
          'I-10 / I-12 congestion windows',
          'Heat and humidity productivity loss',
        ],
        ctaLabel: 'Explore Baton Rouge / Capital',
      },
      {
        key: 'acadiana-lafayette',
        id: 'acadiana-lafayette',
        name: 'Acadiana & Southwest',
        shortName: 'Acadiana / SW',
        blurb:
          'Lafayette, Lake Charles approaches, and Acadiana parishes with industrial cycles and coastal humidity.',
        challenges: [
          'Industrial traffic and plant-turnaround peaks',
          'Hurricane-season logistics',
        ],
        ctaLabel: 'Explore Acadiana / Southwest',
      },
      {
        key: 'cenla',
        id: 'cenla',
        name: 'Central Louisiana (Cenla)',
        shortName: 'Cenla',
        blurb:
          'Alexandria and central parishes with longer regional hauls between south and north metros.',
        challenges: [
          'Distance from major metro fleets',
          'Confirm coverage for rural addresses',
        ],
        ctaLabel: 'Explore Cenla',
      },
      {
        key: 'north-louisiana',
        id: 'north-louisiana',
        name: 'North Louisiana',
        shortName: 'North Louisiana',
        blurb:
          'Shreveport–Bossier, Monroe, and north parishes with different weather and longer I-20 corridors.',
        challenges: [
          'I-20 corridor distance',
          'Mix of urban and rural access',
        ],
        ctaLabel: 'Explore North Louisiana',
      },
    ]),
    costs: {
      title: 'Louisiana moving costs',
      intro:
        'Louisiana pricing reflects New Orleans labor markets, humidity, raised-home access, and long I-10/I-49 hauls. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate Louisiana moving costs',
        lastReviewed: '2026-07-23',
        body: 'These ranges are planning estimates, not quotes. They combine typical Louisiana local and intrastate patterns: home size, distance, stairs, parking, raised homes, humidity, hurricane-season risk, and regional labor. Actual bids vary. Always compare written estimates from LPSC-certificated movers for in-state work and FMCSA-authorized carriers for interstate work.',
      },
      ranges: [
        {
          label: 'New Orleans studio / 1BR',
          value: '$500–$2,300+',
          note: 'Narrow streets and stairs dominate',
        },
        {
          label: 'Suburban 2–3BR house',
          value: '$1,600–$4,800+',
          note: 'Raised homes and HOAs vary',
        },
        {
          label: 'Intrastate mid-size (e.g. New Orleans ↔ Baton Rouge)',
          value: '$1,700–$5,000+',
          note: 'I-10 timing matters',
        },
        {
          label: 'Intrastate long (e.g. New Orleans ↔ Shreveport)',
          value: '$2,200–$7,000+',
          note: 'Full packing pushes the top',
        },
        {
          label: 'Typical 2–3 person crew (New Orleans metro)',
          value: '$115–$210+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'Historic New Orleans streets constrain truck length and parking.',
        'Raised homes and long carries add labor time.',
        'Humidity and heat slow outdoor work in summer.',
        'Hurricane season can force last-minute reschedules.',
        'Short hops into Texas or Mississippi are interstate even when nearby.',
      ],
    },
    routes: {
      title: 'Popular Louisiana moving routes',
      intro:
        'Louisiana sees strong flows into and out of Texas, Florida, and Mississippi plus large New Orleans–Baton Rouge internal traffic. Interstate jobs need FMCSA authority; in-state corridors need LPSC-certificated household goods carriers.',
      migrationProfile: 'balanced',
      outbound: [
        {
          label: 'Louisiana → Texas',
          href: '/local-movers/texas',
          origins: 'New Orleans, Baton Rouge, Lake Charles, Shreveport',
          transit: 'I-10 / I-20 multi-day or same-day near border',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Highest-volume outbound corridor.',
        },
        {
          label: 'Louisiana → Florida',
          href: '/moving-to/florida',
          origins: 'South Louisiana metros',
          transit: 'I-10 multi-day',
          planningNote: 'Book early for winter arrivals.',
          note: 'Common lifestyle outbound route.',
        },
        {
          label: 'Louisiana → Mississippi / Arkansas',
          href: '/local-movers/mississippi',
          origins: 'North and southeast LA',
          transit: 'Often same-day interstate',
          planningNote: 'Confirm FMCSA authority even for short hops.',
          note: 'Short cross-border metro moves are common.',
        },
      ],
      inbound: [
        {
          label: 'Moving to Orleans Parish (New Orleans)',
          href: '/local-movers/louisiana/orleans',
          note: 'Historic access, stairs, and flood-zone logistics.',
        },
        {
          label: 'Moving to East Baton Rouge Parish',
          href: '/local-movers/louisiana/east-baton-rouge',
          note: 'Capital-city traffic and suburban mix.',
        },
        {
          label: 'Moving to Jefferson Parish',
          href: '/local-movers/louisiana/jefferson',
          note: 'Metro New Orleans suburbs and multi-unit stock.',
        },
      ],
    },
    challenges: {
      title: 'Louisiana-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real Louisiana moves — not generic national checklist filler.',
      items: [
        {
          title: 'New Orleans street access',
          detail:
            'Narrow streets, limited truck length, and parking rules are common. Share approach photos and request smaller trucks when needed.',
        },
        {
          title: 'Hurricane-season risk',
          detail:
            'June–November storms can force reschedules statewide, especially on the coast. Keep flexible dates.',
        },
        {
          title: 'Written estimate rules',
          detail:
            'LPSC orders emphasize written estimates (or signed waivers) before service — do not start a move on a verbal quote alone.',
        },
        {
          title: 'Raised homes and humidity',
          detail:
            'Long stair carries and summer humidity add labor hours. Plan early start times May–September.',
        },
        {
          title: 'LPSC certificate verification',
          detail:
            'Confirm the exact legal name and LPSC certificate number before deposits on in-state work.',
        },
      ],
    },
    tools: SHARED_TOOLS('Louisiana'),
    faq: [
      {
        question: 'Do Louisiana movers need an LPSC certificate?',
        answer:
          'Yes. Common carriers of household goods operating within Louisiana generally need an LPSC certificate. Interstate moves require FMCSA authority.',
      },
      {
        question: 'Must Louisiana movers put their certificate number on estimates?',
        answer:
          'LPSC general orders require household goods carriers to include their legal/registered name, physical address, and LPSC certificate number on written bids or estimates and advertising.',
      },
      {
        question: 'How much does a local New Orleans move cost?',
        answer:
          'Planning ranges often fall around $500–$2,300+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates.',
      },
      {
        question: 'Is a New Orleans-to-Baton Rouge move intrastate?',
        answer:
          'Yes — both ends are in Louisiana, so you generally need an LPSC-certificated household goods carrier.',
      },
      {
        question: 'When is peak moving season in Louisiana?',
        answer:
          'Statewide peak is typically May–September. Hurricane season can add date risk for coastal and southern parishes.',
      },
      {
        question: 'Does a Lake Charles-to-Houston move need FMCSA authority?',
        answer:
          'Yes. Crossing into Texas is interstate even for relatively short hauls. Confirm active FMCSA operating authority.',
      },
    ],
    trust: {
      byline: 'Move Trust Hub editorial research',
      lastReviewed: '2026-07-23',
      methodology:
        'Parish guides combine public registration checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.',
      independence:
        'Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.',
      sources: [
        {
          label: 'LPSC — Household goods carriers',
          href: 'https://www.lpsc.louisiana.gov/Carrier_HGM',
        },
        {
          label: 'LPSC — Motor carrier regulations',
          href: 'https://lpsc.louisiana.gov/Carrier_Regs',
        },
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  },

  kentucky: {
    stateSlug: 'kentucky',
    stateCode: 'KY',
    h1: `Kentucky Moving Resource Hub: Costs, KYTC HHG Certificates & ${kyCount} County Guides`,
    metaTitle: `Kentucky Movers Guide 2026 — Costs, KYTC DMT Authority & ${kyCount} County Guides`,
    metaDescription:
      'Plan a move within, to, or from Kentucky. Compare local and intrastate costs, verify Kentucky Transportation Cabinet household goods certificates, browse 120 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for Kentucky moves in 2026 — typical costs, KYTC vs FMCSA rules, Louisville-to-Eastern Kentucky regional guides, and tools to compare licensed movers without paid placements.',
    trustBar: [
      `${kyCount} County Guides`,
      'Verified Movers',
      'KYTC & FMCSA Checked',
      'Updated 2026',
    ],
    intents: intents('Kentucky'),
    primaryCta: {
      label: 'Calculate My Kentucky Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in Kentucky is different',
      paragraphs: [
        'Kentucky is not one moving market. Louisville multi-unit and Ohio River logistics, Northern Kentucky Cincinnati-adjacent traffic, Lexington Bluegrass suburbs, Western Kentucky river towns, and Eastern Kentucky mountain access produce different access and labor profiles under one state name.',
        'Intrastate household goods movers must be licensed by the Kentucky Transportation Cabinet, Department of Vehicle Regulation, Division of Motor Carriers (often referenced as DMT/DVR authority). Interstate jobs need FMCSA authority. Horse-country HOAs, college peaks, and mountain roads are planning inputs — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'Kentucky moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical Kentucky local and intrastate patterns; they are not bids. Always compare written estimates from KYTC-licensed movers for in-state work and FMCSA-authorized carriers for interstate work.',
      stats: [
        {
          label: 'Typical Louisville studio / 1BR',
          value: '$450–$2,100+',
          note: 'Stairs and river-city staging',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$1,500–$4,800+',
          note: 'Bluegrass and Louisville HOAs vary',
        },
        {
          label: 'Intrastate corridor (e.g. Louisville ↔ Lexington)',
          value: '$1,600–$5,000+',
          note: 'Season and packing drive the spread',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'Winter ice and summer heat both matter',
        },
        {
          label: 'Top outbound destinations',
          value: 'FL · TN · OH · IN · TX · NC',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: String(kyCount),
          note: 'Louisville and Lexington emphasized',
        },
      ],
    },
    regulations: {
      mode: 'strong_state_regulator',
      title: 'Kentucky moving regulations & consumer protection',
      intro:
        'Kentucky requires household goods movers operating within the state to be licensed by the Kentucky Transportation Cabinet Division of Motor Carriers. Match the DMT/DVR household goods certificate to the job before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside Kentucky)',
        body: 'If origin or destination is outside Kentucky, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. A Kentucky household goods certificate alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within Kentucky)',
        body: 'For moves of household goods from one location to another within Kentucky, the mover must be licensed by KYTC Department of Vehicle Regulation / Division of Motor Carriers. Consumers should look for a KY DMT (sometimes called DVR) license number, request written estimates, and understand that the Cabinet investigates consumer complaints against licensed movers.',
      },
      verifySteps: [
        'Classify the job: entirely in Kentucky (KYTC HHG certificate) vs any out-of-state leg (FMCSA / USDOT).',
        'Copy the exact legal name and KY DMT/DVR license number from the written estimate.',
        'Intrastate: confirm Kentucky household goods certificate qualification through KYTC / Drive.ky.gov motor carrier resources.',
        'Interstate: look up USDOT / MC on FMCSA SAFER.',
        'Request and obtain a written estimate before move day.',
        'Avoid large cash deposits to unverified operators.',
      ],
      protections: [
        {
          title: 'KYTC household goods licensing',
          detail:
            'Kentucky consumer guidance states in-state household goods movers must be licensed by the Transportation Cabinet Division of Motor Carriers, which sets licensing and insurance requirements.',
        },
        {
          title: 'DMT / DVR license number',
          detail:
            'Consumers are advised to confirm the mover has a Kentucky DMT (sometimes referred to as DVR) license number before hiring.',
        },
        {
          title: 'Written estimates and complaints',
          detail:
            'Request written estimates and use KYTC complaint investigation channels when licensed movers create problems.',
        },
      ],
      officialLinks: [
        {
          label: 'KY Drive — Household goods',
          href: 'https://drive.ky.gov/Motor-Carriers/Pages/Household-Goods.aspx',
          external: true,
        },
        {
          label: 'Kentucky Transportation Cabinet',
          href: 'https://transportation.ky.gov/',
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
        'Licensing rules and forms can change. Always verify current KYTC household goods authority or FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('kentucky', [
      {
        key: 'louisville-metro',
        id: 'louisville-metro',
        name: 'Louisville Metro',
        shortName: 'Louisville Metro',
        blurb:
          'Jefferson and surrounding counties with multi-unit stock, suburbs, and Ohio River logistics.',
        challenges: [
          'Stairs, elevators, and river-city staging',
          'Short IN hops need FMCSA authority',
        ],
        ctaLabel: 'Explore Louisville Metro',
      },
      {
        key: 'northern-ky',
        id: 'northern-ky',
        name: 'Northern Kentucky',
        shortName: 'Northern KY',
        blurb:
          'Kenton, Campbell, Boone, and neighbors with Cincinnati-adjacent traffic and suburban HOAs.',
        challenges: [
          'Cross-metro traffic toward Cincinnati',
          'Short OH hops need FMCSA authority',
        ],
        ctaLabel: 'Explore Northern Kentucky',
      },
      {
        key: 'lexington-bluegrass',
        id: 'lexington-bluegrass',
        name: 'Lexington & Bluegrass',
        shortName: 'Lexington / Bluegrass',
        blurb:
          'Fayette and Bluegrass counties with horse-country estates, campus peaks, and growth suburbs.',
        challenges: [
          'Campus lease-cycle peaks',
          'Long driveway and farm access',
        ],
        ctaLabel: 'Explore Lexington / Bluegrass',
      },
      {
        key: 'western-ky',
        id: 'western-ky',
        name: 'Western Kentucky',
        shortName: 'Western KY',
        blurb:
          'Paducah, Bowling Green, Owensboro, and western counties with river towns and longer regional hauls.',
        challenges: [
          'Distance from Louisville fleets',
          'Confirm coverage for rural addresses',
        ],
        ctaLabel: 'Explore Western Kentucky',
      },
      {
        key: 'eastern-ky',
        id: 'eastern-ky',
        name: 'Eastern Kentucky',
        shortName: 'Eastern KY',
        blurb:
          'Mountain counties with steep access, longer portal-to-portal distances, and thinner local coverage in places.',
        challenges: [
          'Mountain roads and steep driveways',
          'Confirm mover coverage early',
        ],
        ctaLabel: 'Explore Eastern Kentucky',
      },
    ]),
    costs: {
      title: 'Kentucky moving costs',
      intro:
        'Kentucky pricing reflects Louisville and Lexington labor markets, river-city access, mountain roads, and long east–west hauls. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate Kentucky moving costs',
        lastReviewed: '2026-07-23',
        body: 'These ranges are planning estimates, not quotes. They combine typical Kentucky local and intrastate patterns: home size, distance, stairs, parking, HOAs, hills, seasonality, and regional labor. Actual bids vary. Always compare written estimates from KYTC-licensed movers for in-state work and FMCSA-authorized carriers for interstate work.',
      },
      ranges: [
        {
          label: 'Louisville studio / 1BR',
          value: '$450–$2,100+',
          note: 'Stairs and staging dominate',
        },
        {
          label: 'Suburban 2–3BR house',
          value: '$1,500–$4,500+',
          note: 'HOAs vary by suburb',
        },
        {
          label: 'Intrastate mid-size (e.g. Louisville ↔ Lexington)',
          value: '$1,600–$5,000+',
          note: 'Season matters',
        },
        {
          label: 'Intrastate long (e.g. Louisville ↔ Paducah or Pikeville)',
          value: '$2,000–$6,500+',
          note: 'Mountain and distance logistics',
        },
        {
          label: 'Typical 2–3 person crew (Louisville / Lexington)',
          value: '$110–$200+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'Ohio River metro congestion changes portal-to-portal time.',
        'Eastern Kentucky mountain roads may need smaller trucks.',
        'Bluegrass farm and estate access adds long carries.',
        'College towns compress August demand.',
        'Short hops into OH, IN, TN, or WV are interstate even when nearby.',
      ],
    },
    routes: {
      title: 'Popular Kentucky moving routes',
      intro:
        'Kentucky bridges Midwest and Southeast corridors with strong outbound Sun Belt flows, short interstate hops into Ohio, Indiana, and Tennessee, and large Louisville–Lexington internal traffic. Interstate jobs need FMCSA authority; in-state corridors need KYTC-licensed household goods movers.',
      migrationProfile: 'outbound_dominant',
      outbound: [
        {
          label: 'Kentucky → Florida',
          href: '/moving-to/florida',
          origins: 'Louisville, Lexington, Northern KY',
          transit: 'Multi-day I-75 / I-65',
          planningNote: 'Book early for winter arrivals.',
          note: 'High-volume Midwest/South-to-Florida corridor.',
        },
        {
          label: 'Kentucky → Tennessee / Carolinas',
          href: '/local-movers/tennessee',
          origins: 'Statewide metros',
          transit: 'I-75 / I-65 corridors',
          planningNote: 'Confirm FMCSA authority end-to-end.',
          note: 'Popular job and lifestyle outbound routes.',
        },
        {
          label: 'Kentucky → Ohio / Indiana',
          href: '/local-movers/ohio',
          origins: 'Northern KY, Louisville',
          transit: 'Often same-day interstate',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Short cross-border metro moves are extremely common.',
        },
      ],
      inbound: [
        {
          label: 'Moving to Jefferson County (Louisville)',
          href: '/local-movers/kentucky/jefferson',
          note: 'Multi-unit access and river-city logistics.',
        },
        {
          label: 'Moving to Fayette County (Lexington)',
          href: '/local-movers/kentucky/fayette',
          note: 'Bluegrass suburbs and campus peaks.',
        },
        {
          label: 'Moving to Boone County',
          href: '/local-movers/kentucky/boone',
          note: 'Northern KY growth and Cincinnati-adjacent patterns.',
        },
      ],
    },
    challenges: {
      title: 'Kentucky-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real Kentucky moves — not generic national checklist filler.',
      items: [
        {
          title: 'Ohio River border hops',
          detail:
            'Moves from Louisville into Indiana or from Northern Kentucky into Ohio are interstate even if short. Confirm FMCSA authority before deposits.',
        },
        {
          title: 'Eastern Kentucky mountain access',
          detail:
            'Steep grades and narrow roads may require smaller trucks or shuttle strategies. Share GPS pins and photos early.',
        },
        {
          title: 'Bluegrass estate and farm access',
          detail:
            'Long driveways and gated properties add carry time. Confirm equipment needs on written estimates.',
        },
        {
          title: 'College lease peaks',
          detail:
            'Lexington and other campus markets compress August demand. Book early.',
        },
        {
          title: 'KYTC license verification',
          detail:
            'Confirm the exact legal name and KY DMT/DVR household goods license number before deposits on in-state work.',
        },
      ],
    },
    tools: SHARED_TOOLS('Kentucky'),
    faq: [
      {
        question: 'Do Kentucky movers need a state license?',
        answer:
          'Yes. Household goods movers operating within Kentucky must be licensed by the Kentucky Transportation Cabinet Division of Motor Carriers. Interstate moves require FMCSA authority.',
      },
      {
        question: 'What is a DMT or DVR license number?',
        answer:
          'Kentucky consumer materials advise checking for a KY DMT license number (sometimes referred to as DVR) that shows the mover holds state household goods authority.',
      },
      {
        question: 'How much does a local Louisville move cost?',
        answer:
          'Planning ranges often fall around $450–$2,100+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates.',
      },
      {
        question: 'Is a Louisville-to-Lexington move intrastate?',
        answer:
          'Yes — both ends are in Kentucky, so you generally need a KYTC-licensed household goods mover.',
      },
      {
        question: 'When is peak moving season in Kentucky?',
        answer:
          'Statewide peak is typically May–September. Winter ice and summer heat can both affect productivity.',
      },
      {
        question: 'Does a Covington-to-Cincinnati move need FMCSA authority?',
        answer:
          'Yes. Crossing into Ohio is interstate even for short hops. Confirm active FMCSA operating authority and a USDOT number.',
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
          label: 'KY Drive — Household goods',
          href: 'https://drive.ky.gov/Motor-Carriers/Pages/Household-Goods.aspx',
        },
        {
          label: 'Kentucky Transportation Cabinet',
          href: 'https://transportation.ky.gov/',
        },
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  },
};

const fileMap = [
  ['minnesota', 'minnesotaStateResourceHub', packs.minnesota],
  ['wisconsin', 'wisconsinStateResourceHub', packs.wisconsin],
  ['alabama', 'alabamaStateResourceHub', packs.alabama],
  ['louisiana', 'louisianaStateResourceHub', packs.louisiana],
  ['kentucky', 'kentuckyStateResourceHub', packs.kentucky],
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

// Full registry W1–W5 + CA
writeFileSync(
  'lib/local-movers/state-resource-hub/registry.ts',
  `import { alabamaStateResourceHub } from '@/lib/local-movers/state-resource-hub/alabama';
import { arizonaStateResourceHub } from '@/lib/local-movers/state-resource-hub/arizona';
import { californiaStateResourceHub } from '@/lib/local-movers/state-resource-hub/california';
import { coloradoStateResourceHub } from '@/lib/local-movers/state-resource-hub/colorado';
import { floridaStateResourceHub } from '@/lib/local-movers/state-resource-hub/florida';
import { georgiaStateResourceHub } from '@/lib/local-movers/state-resource-hub/georgia';
import { illinoisStateResourceHub } from '@/lib/local-movers/state-resource-hub/illinois';
import { indianaStateResourceHub } from '@/lib/local-movers/state-resource-hub/indiana';
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
  californiaStateResourceHub,
  coloradoStateResourceHub,
  floridaStateResourceHub,
  georgiaStateResourceHub,
  illinoisStateResourceHub,
  indianaStateResourceHub,
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

console.log('registry updated with Wave 5 (26 packs total)');
