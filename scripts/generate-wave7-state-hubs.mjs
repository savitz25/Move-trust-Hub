/**
 * Wave 7 State Resource Hubs: UT, KS, MS, NV, NM
 * Run: node scripts/generate-wave7-state-hubs.mjs
 * Prerequisites: scripts/tmp-wave7-regions.json (0 orphans / 0 duplicates)
 */
import { readFileSync, writeFileSync } from 'fs';

const regions = JSON.parse(readFileSync('scripts/tmp-wave7-regions.json', 'utf8'));

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
 * Research brief (Wave 7):
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

const utCount = getUniqueCountyCount('utah');
const ksCount = getUniqueCountyCount('kansas');
const msCount = getUniqueCountyCount('mississippi');
const nvCount = getUniqueCountyCount('nevada');
const nmCount = getUniqueCountyCount('new-mexico');

const packs = {
  utah: {
    stateSlug: 'utah',
    stateCode: 'UT',
    h1: `Utah Moving Resource Hub: Costs, FMCSA Checks & ${utCount} County Guides`,
    metaTitle: `Utah Movers Guide 2026 — Costs, Insurance Checks & ${utCount} County Guides`,
    metaDescription:
      'Plan a move within, to, or from Utah. Compare local and intrastate costs, understand Utah’s limited state HHG licensing versus FMCSA interstate rules, browse 29 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for Utah moves in 2026 — typical costs, FMCSA-first verification for interstate work, Salt Lake-to-St. George regional guides, and tools to compare movers without paid placements.',
    trustBar: [
      `${utCount} County Guides`,
      'Verified Movers',
      'FMCSA-Focused Checks',
      'Updated 2026',
    ],
    intents: intents('Utah'),
    primaryCta: {
      label: 'Calculate My Utah Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in Utah is different',
      paragraphs: [
        'Utah is not one moving market. Salt Lake multi-unit elevators and inversion air quality, Utah County growth HOAs, Cache Valley college peaks, St. George desert heat, and canyon-country access produce different labor profiles under one state name.',
        'Utah does not issue a dedicated household-goods carrier license for moves contained wholly inside state lines — unlike many neighboring states. Interstate jobs still need FMCSA authority. For in-state work, insist on insurance certificates, written estimates, and clear legal names. Winter canyon closures, summer heat, and ski-town peaks are planning inputs — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'Utah moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical Utah local and intrastate patterns; they are not bids. Always compare written estimates and confirm FMCSA authority for any out-of-state leg.',
      stats: [
        {
          label: 'Typical Salt Lake studio / 1BR',
          value: '$550–$2,400+',
          note: 'Elevators, hills, and winter staging',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$1,800–$5,500+',
          note: 'Wasatch Front HOAs common',
        },
        {
          label: 'Intrastate corridor (e.g. SLC ↔ St. George)',
          value: '$2,000–$6,500+',
          note: 'I-15 distance and season matter',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'Ski-town winter peaks also exist',
        },
        {
          label: 'Top inbound origins',
          value: 'CA · TX · AZ · CO · WA',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: String(utCount),
          note: 'Wasatch Front emphasized',
        },
      ],
    },
    regulations: {
      mode: 'limited_or_none',
      title: 'Utah moving regulations & consumer protection',
      intro:
        'Utah does not maintain a dedicated household-goods permit regime comparable to Oregon ODOT or Colorado PUC. Consumer protection depends on insurance, contracts, consumer-protection rules, and — for any out-of-state leg — FMCSA authority. Verify credentials carefully before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside Utah)',
        body: 'If origin or destination is outside Utah, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. Do not treat a Utah business registration alone as interstate authority.',
      },
      intrastate: {
        title: 'Intrastate (entirely within Utah)',
        body: 'Utah generally does not issue a dedicated household-goods carrier license for pure in-state moves. Movers still must register commercial vehicles appropriately, maintain liability and cargo insurance, and follow Utah Division of Consumer Protection expectations on written estimates and claims handling. Insist on written paperwork and insurance certificates even for local jobs.',
      },
      verifySteps: [
        'Classify the job: entirely in Utah vs any out-of-state leg (FMCSA / USDOT required).',
        'Copy the exact legal name from the written estimate.',
        'Interstate or cross-border: look up USDOT / MC on FMCSA SAFER before deposits.',
        'Intrastate: request certificates of insurance, written inventory estimates, and business registration details.',
        'Confirm HOA, elevator, and street-permit needs for Wasatch Front multi-unit buildings.',
        'Avoid large cash deposits to unverified operators; document all agreements in writing.',
      ],
      protections: [
        {
          title: 'FMCSA for interstate moves',
          detail:
            'Any move that crosses a state line is generally under federal household goods rules — verify active FMCSA authority and USDOT numbers on SAFER.',
        },
        {
          title: 'Insurance and written estimates',
          detail:
            'Without a strong state HHG permit lookup, written estimates and proof of cargo/liability insurance become your primary consumer controls on local jobs.',
        },
        {
          title: 'Consumer protection expectations',
          detail:
            'Industry guidance notes Utah movers should still comply with consumer-protection expectations on written estimates and claims handling — ask for those terms in writing.',
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
          label: 'UDOT — Motor carriers',
          href: 'https://connect.udot.utah.gov/business/motor-carriers/',
          external: true,
        },
        { label: 'Move Trust Hub — Verify a USDOT', href: '/verify-dot' },
      ],
      disclaimer:
        'Regulatory frameworks can change. Always verify current FMCSA authority for interstate work and obtain insurance and written contracts for local work. This page is educational, not legal advice.',
    },
    regions: regionObjects('utah', [
      {
        key: 'wasatch-front',
        id: 'wasatch-front',
        name: 'Wasatch Front',
        shortName: 'Wasatch Front',
        blurb:
          'Salt Lake, Utah, Davis, Weber, and neighbors with multi-unit elevators, HOAs, and canyon approaches.',
        challenges: [
          'Elevators, hills, and inversion-season air quality',
          'HOA windows in growth suburbs',
        ],
        ctaLabel: 'Explore Wasatch Front',
      },
      {
        key: 'northern-ut',
        id: 'northern-ut',
        name: 'Northern Utah',
        shortName: 'Northern UT',
        blurb:
          'Cache Valley and northern counties with college peaks and agricultural corridors.',
        challenges: [
          'Campus lease-cycle peaks',
          'Winter weather on northern corridors',
        ],
        ctaLabel: 'Explore Northern Utah',
      },
      {
        key: 'central-ut',
        id: 'central-ut',
        name: 'Central Utah',
        shortName: 'Central UT',
        blurb:
          'Sanpete, Sevier, and central valleys with longer regional hauls from the Front.',
        challenges: [
          'Distance from Salt Lake fleets',
          'Confirm coverage for rural addresses',
        ],
        ctaLabel: 'Explore Central Utah',
      },
      {
        key: 'southern-ut',
        id: 'southern-ut',
        name: 'Southern Utah',
        shortName: 'Southern UT',
        blurb:
          'St. George, Cedar City, and southern desert counties with heat and tourism peaks.',
        challenges: [
          'Summer heat productivity loss',
          'Tourism-season congestion near parks',
        ],
        ctaLabel: 'Explore Southern Utah',
      },
      {
        key: 'eastern-ut',
        id: 'eastern-ut',
        name: 'Eastern Utah',
        shortName: 'Eastern UT',
        blurb:
          'Uintah Basin, Moab approaches, and eastern counties with long portal-to-portal distances.',
        challenges: [
          'Long empty miles and canyon access',
          'Confirm mover coverage early',
        ],
        ctaLabel: 'Explore Eastern Utah',
      },
    ]),
    costs: {
      title: 'Utah moving costs',
      intro:
        'Utah pricing reflects Wasatch Front labor markets, hills/elevators, canyon weather, and long I-15 hauls. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate Utah moving costs',
        lastReviewed: '2026-07-23',
        body: 'These ranges are planning estimates, not quotes. They combine typical Utah local and intrastate patterns: home size, distance, stairs/elevators, parking, HOAs, weather, and regional labor. Actual bids vary. Always compare written estimates and confirm FMCSA authority for any out-of-state leg.',
      },
      ranges: [
        {
          label: 'Salt Lake studio / 1BR',
          value: '$550–$2,400+',
          note: 'Elevators and hills dominate',
        },
        {
          label: 'Suburban 2–3BR house',
          value: '$1,700–$5,000+',
          note: 'Wasatch Front HOAs common',
        },
        {
          label: 'Intrastate mid-size (e.g. SLC ↔ Provo or Ogden)',
          value: '$1,600–$5,000+',
          note: 'Season matters',
        },
        {
          label: 'Intrastate long (e.g. SLC ↔ St. George or Moab)',
          value: '$2,200–$7,500+',
          note: 'I-15 distance and heat matter',
        },
        {
          label: 'Typical 2–3 person crew (Wasatch Front)',
          value: '$130–$240+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'Wasatch Front multi-unit buildings add elevator and stair time.',
        'Canyon and mountain weather can close access in winter.',
        'Southern Utah heat slows outdoor labor in summer.',
        'Ski-town peaks compete with statewide May–September demand.',
        'Short hops into ID, WY, NV, AZ, or CO are interstate even when nearby.',
      ],
    },
    routes: {
      title: 'Popular Utah moving routes',
      intro:
        'Utah is a major Mountain West inbound destination with strong California origins and large Salt Lake–St. George internal flows. Interstate jobs need FMCSA authority; local jobs need careful insurance and contract verification.',
      migrationProfile: 'inbound_dominant',
      outbound: [
        {
          label: 'Utah → Arizona / Nevada',
          href: '/local-movers/arizona',
          origins: 'Wasatch Front, Southern UT',
          transit: 'I-15 multi-day or same-day near border',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Common lifestyle and job corridors.',
        },
        {
          label: 'Utah → California',
          href: '/local-movers/california',
          origins: 'Salt Lake metro',
          transit: 'Multi-day I-15 / I-80',
          planningNote: 'CA second hops may need BHGS for in-CA legs.',
          note: 'Bi-directional West traffic is common.',
        },
        {
          label: 'Utah → Colorado / Idaho',
          href: '/local-movers/colorado',
          origins: 'Wasatch Front, Northern UT',
          transit: 'Mountain multi-day or short interstate',
          planningNote: 'Confirm FMCSA authority end-to-end.',
          note: 'Regional Mountain West hops.',
        },
      ],
      inbound: [
        {
          label: 'California → Utah',
          href: '/local-movers/utah/salt-lake',
          origins: 'Bay Area, LA, San Diego',
          transit: 'Multi-day',
          planningNote: 'High-volume inbound into Wasatch Front.',
          note: 'Confirm interstate FMCSA authority.',
        },
        {
          label: 'Moving to Salt Lake County',
          href: '/local-movers/utah/salt-lake',
          note: 'Multi-unit elevators and canyon logistics.',
        },
        {
          label: 'Moving to Utah County',
          href: '/local-movers/utah/utah',
          note: 'Growth suburbs and HOA calendars.',
        },
      ],
    },
    challenges: {
      title: 'Utah-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real Utah moves — not generic national checklist filler.',
      items: [
        {
          title: 'Limited state HHG permit regime',
          detail:
            'Without a dedicated state household-goods license lookup, demand insurance certificates, written estimates, and FMCSA checks for any border hop.',
        },
        {
          title: 'Wasatch Front multi-unit access',
          detail:
            'Elevators, HOAs, and limited staging dominate Salt Lake and Utah County jobs. Reserve elevators early.',
        },
        {
          title: 'Canyon and winter closures',
          detail:
            'Mountain and canyon routes can close or slow trucks. Build weather buffers November–March.',
        },
        {
          title: 'Southern Utah heat',
          detail:
            'St. George summer heat slows outdoor labor. Prefer early start times May–September.',
        },
        {
          title: 'Short interstate hops',
          detail:
            'Moves into Idaho, Wyoming, Nevada, Arizona, or Colorado are interstate even if short. Confirm FMCSA authority before deposits.',
        },
      ],
    },
    tools: SHARED_TOOLS('Utah'),
    faq: [
      {
        question: 'Do Utah movers need a special state household goods license?',
        answer:
          'Utah generally does not issue a dedicated household-goods carrier license for pure in-state moves. Consumers should still verify insurance, written contracts, and FMCSA authority for any out-of-state leg.',
      },
      {
        question: 'How do I verify a Utah mover for an interstate move?',
        answer:
          'Look up USDOT / MC authority on FMCSA SAFER for the legal name on your estimate. Also request certificates of insurance and written inventory estimates.',
      },
      {
        question: 'How much does a local Salt Lake move cost?',
        answer:
          'Planning ranges often fall around $550–$2,400+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates.',
      },
      {
        question: 'Is a Salt Lake-to-St. George move interstate?',
        answer:
          'No — both ends are in Utah. Focus on insurance, written estimates, and access logistics rather than FMCSA authority for pure in-state jobs.',
      },
      {
        question: 'When is peak moving season in Utah?',
        answer:
          'Statewide peak is typically May–September. Ski towns can also see winter peaks around holiday and season-change dates.',
      },
      {
        question: 'Does a St. George-to-Las Vegas move need FMCSA authority?',
        answer:
          'Yes. Crossing into Nevada is interstate even for relatively short hauls. Confirm active FMCSA operating authority.',
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
          label: 'UDOT — Motor carriers',
          href: 'https://connect.udot.utah.gov/business/motor-carriers/',
        },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  },

  kansas: {
    stateSlug: 'kansas',
    stateCode: 'KS',
    h1: `Kansas Moving Resource Hub: Costs, KCC Authority & ${ksCount} County Guides`,
    metaTitle: `Kansas Movers Guide 2026 — Costs, KCC Certificates & ${ksCount} County Guides`,
    metaDescription:
      'Plan a move within, to, or from Kansas. Compare local and intrastate costs, verify Kansas Corporation Commission household goods authority, browse 105 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for Kansas moves in 2026 — typical costs, KCC vs FMCSA rules, KC-to-Wichita regional guides, and tools to compare authorized movers without paid placements.',
    trustBar: [
      `${ksCount} County Guides`,
      'Verified Movers',
      'KCC & FMCSA Checked',
      'Updated 2026',
    ],
    intents: intents('Kansas'),
    primaryCta: {
      label: 'Calculate My Kansas Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in Kansas is different',
      paragraphs: [
        'Kansas is not one moving market. Kansas City metro multi-unit and HOA suburbs, Wichita industrial corridors, Topeka capital logistics, university towns, and western plains long hauls produce different access and labor profiles under one state name.',
        'Intrastate household goods carriers need a Certificate of Public Convenience and Necessity from the Kansas Corporation Commission (KCC) Transportation Division, with household goods tariff frameworks. Interstate jobs need FMCSA authority. Tornado-season weather, summer heat, and I-70 east–west distances are planning inputs — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'Kansas moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical Kansas local and intrastate patterns; they are not bids. Always compare written estimates from KCC-authorized movers for in-state work and FMCSA-authorized carriers for interstate work.',
      stats: [
        {
          label: 'Typical KC / Wichita studio / 1BR',
          value: '$450–$2,000+',
          note: 'Stairs and heat matter',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$1,500–$4,800+',
          note: 'Metro HOAs common',
        },
        {
          label: 'Intrastate corridor (e.g. KC ↔ Wichita)',
          value: '$1,700–$5,500+',
          note: 'Season and packing drive the spread',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'Storms and heat affect productivity',
        },
        {
          label: 'Top outbound destinations',
          value: 'TX · MO · CO · FL · OK · AZ',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: String(ksCount),
          note: 'KC and Wichita emphasized',
        },
      ],
    },
    regulations: {
      mode: 'strong_state_regulator',
      title: 'Kansas moving regulations & consumer protection',
      intro:
        'Kansas requires household goods movers operating within the state to obtain operating authority (Certificate of Public Convenience and Necessity) from the Kansas Corporation Commission Transportation Division. Match authority to the job before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside Kansas)',
        body: 'If origin or destination is outside Kansas, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. KCC household goods authority alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within Kansas)',
        body: 'KCC Transportation Division oversees motor carriers of household goods, including certificate frameworks and household goods tariff filings. Consumers should verify KCC operating authority for the legal name on the estimate and get written estimates before hiring.',
      },
      verifySteps: [
        'Classify the job: entirely in Kansas (KCC authority) vs any out-of-state leg (FMCSA / USDOT).',
        'Copy the exact legal name from the written estimate.',
        'Intrastate: confirm KCC household goods / motor carrier authority for the company.',
        'Interstate: look up USDOT / MC on FMCSA SAFER.',
        'Get written estimates and ask how rates map to filed household goods tariff materials.',
        'Avoid large cash deposits to unverified operators.',
      ],
      protections: [
        {
          title: 'KCC certificate of convenience and necessity',
          detail:
            'Kansas law frameworks require household goods carriers to obtain commission authority before conducting for-hire in-state household goods transportation.',
        },
        {
          title: 'Household goods tariffs',
          detail:
            'KCC publishes household goods tariff resources; carriers file rate and service terms under Transportation Division oversight.',
        },
        {
          title: 'Complaint channels',
          detail:
            'Consumers can use KCC Transportation Division complaint processes when problems arise with authorized carriers.',
        },
      ],
      officialLinks: [
        {
          label: 'KCC — Transportation',
          href: 'https://www.kcc.ks.gov/transportation',
          external: true,
        },
        {
          label: 'KCC — Household goods tariffs',
          href: 'https://www.kcc.ks.gov/transportation/transportation-quick-links/household-goods-tariffs',
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
        'Licensing rules and directories can change. Always verify current KCC authority or FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('kansas', [
      {
        key: 'kansas-city-metro',
        id: 'kansas-city-metro',
        name: 'Kansas City Metro (KS side)',
        shortName: 'KC Metro KS',
        blurb:
          'Johnson, Wyandotte, and neighbors with multi-unit access, HOAs, and Missouri-border logistics.',
        challenges: [
          'Short MO hops need FMCSA authority',
          'HOA windows in Johnson County',
        ],
        ctaLabel: 'Explore KC Metro KS',
      },
      {
        key: 'wichita-south-central',
        id: 'wichita-south-central',
        name: 'Wichita & South Central',
        shortName: 'Wichita / South Central',
        blurb:
          'Sedgwick and south-central counties with industrial corridors and mixed suburban stock.',
        challenges: [
          'Aircraft-industry shift timing',
          'Storm-season weather buffers',
        ],
        ctaLabel: 'Explore Wichita / South Central',
      },
      {
        key: 'topeka-northeast',
        id: 'topeka-northeast',
        name: 'Topeka, Manhattan & Northeast',
        shortName: 'Topeka / Northeast',
        blurb:
          'Capital city, Flint Hills approaches, and northeast university towns.',
        challenges: [
          'Campus lease-cycle peaks',
          'Mix of multi-unit and rural access',
        ],
        ctaLabel: 'Explore Topeka / Northeast',
      },
      {
        key: 'western-ks',
        id: 'western-ks',
        name: 'Western Kansas',
        shortName: 'Western KS',
        blurb:
          'Garden City, Dodge City, and western plains counties with long portal-to-portal distances.',
        challenges: [
          'Long empty miles from major metros',
          'Wind and winter weather on plains',
        ],
        ctaLabel: 'Explore Western Kansas',
      },
      {
        key: 'northwest-ks',
        id: 'northwest-ks',
        name: 'Northwest Kansas',
        shortName: 'Northwest KS',
        blurb:
          'Hays and northwest plains counties with thinner local mover density.',
        challenges: [
          'Confirm coverage for remote addresses',
          'Long regional hauls',
        ],
        ctaLabel: 'Explore Northwest Kansas',
      },
    ]),
    costs: {
      title: 'Kansas moving costs',
      intro:
        'Kansas pricing reflects KC and Wichita labor markets, storm risk, heat, and long I-70 hauls. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate Kansas moving costs',
        lastReviewed: '2026-07-23',
        body: 'These ranges are planning estimates, not quotes. They combine typical Kansas local and intrastate patterns: home size, distance, stairs, parking, HOAs, weather, and regional labor. Actual bids vary under KCC tariff frameworks for authorized carriers. Always compare written estimates from KCC-authorized movers for in-state work and FMCSA-authorized carriers for interstate work.',
      },
      ranges: [
        {
          label: 'KC / Wichita studio / 1BR',
          value: '$450–$2,000+',
          note: 'Access and season dominate',
        },
        {
          label: 'Suburban 2–3BR house',
          value: '$1,500–$4,500+',
          note: 'HOAs common',
        },
        {
          label: 'Intrastate mid-size (e.g. KC ↔ Topeka or Wichita)',
          value: '$1,600–$5,000+',
          note: 'Season matters',
        },
        {
          label: 'Intrastate long (e.g. KC ↔ Garden City)',
          value: '$2,200–$7,000+',
          note: 'I-70 distance drives hours',
        },
        {
          label: 'Typical 2–3 person crew (major metros)',
          value: '$110–$200+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'Severe storm seasons can force same-day reschedules.',
        'Summer heat slows outdoor labor — prefer early starts.',
        'Johnson County HOAs add elevator and loading windows.',
        'Western plains jobs include long empty miles.',
        'Short hops into MO, OK, NE, or CO are interstate even when nearby.',
      ],
    },
    routes: {
      title: 'Popular Kansas moving routes',
      intro:
        'Kansas sits between Midwest and Plains corridors with strong KC–Wichita internal traffic and short interstate hops into Missouri, Oklahoma, Nebraska, and Colorado. Interstate jobs need FMCSA authority; in-state corridors need KCC-authorized household goods carriers.',
      migrationProfile: 'outbound_dominant',
      outbound: [
        {
          label: 'Kansas → Texas / Oklahoma',
          href: '/local-movers/texas',
          origins: 'Wichita, KC, South Central',
          transit: 'I-35 multi-day or next-day',
          planningNote: 'Confirm FMCSA authority end-to-end.',
          note: 'High-volume southern corridor.',
        },
        {
          label: 'Kansas → Colorado / Florida',
          href: '/local-movers/colorado',
          origins: 'KC, Wichita',
          transit: 'Multi-day interstate',
          planningNote: 'Book early for seasonal peaks.',
          note: 'Popular lifestyle outbound destinations.',
        },
        {
          label: 'Kansas → Missouri',
          href: '/local-movers/missouri',
          origins: 'KC metro KS',
          transit: 'Often same-day interstate',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Extremely common short cross-border metro moves.',
        },
      ],
      inbound: [
        {
          label: 'Moving to Johnson County',
          href: '/local-movers/kansas/johnson',
          note: 'KC-side suburbs and HOA communities.',
        },
        {
          label: 'Moving to Sedgwick County (Wichita)',
          href: '/local-movers/kansas/sedgwick',
          note: 'Industrial corridors and suburban mix.',
        },
        {
          label: 'Moving to Shawnee County (Topeka)',
          href: '/local-movers/kansas/shawnee',
          note: 'Capital-city logistics and suburbs.',
        },
      ],
    },
    challenges: {
      title: 'Kansas-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real Kansas moves — not generic national checklist filler.',
      items: [
        {
          title: 'KC metro border hops',
          detail:
            'Moves from Johnson or Wyandotte County into Missouri are interstate even if short. Confirm FMCSA authority before deposits.',
        },
        {
          title: 'Severe weather windows',
          detail:
            'Spring storm and tornado seasons can cancel move days. Build weather buffers March–June.',
        },
        {
          title: 'Western plains distance',
          detail:
            'Far-west jobs create long empty miles. Confirm overnight plans and fuel time on estimates.',
        },
        {
          title: 'University lease peaks',
          detail:
            'Lawrence, Manhattan, and other campus markets compress August demand. Book early.',
        },
        {
          title: 'KCC authority verification',
          detail:
            'Confirm the exact legal name holds KCC household goods authority before deposits on pure in-state work.',
        },
      ],
    },
    tools: SHARED_TOOLS('Kansas'),
    faq: [
      {
        question: 'Do Kansas movers need KCC authority?',
        answer:
          'Yes. Household goods movers operating within Kansas generally need a Certificate of Public Convenience and Necessity from the Kansas Corporation Commission. Interstate moves require FMCSA authority.',
      },
      {
        question: 'How do I verify a Kansas mover?',
        answer:
          'Confirm KCC Transportation authority for the legal name on your estimate. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER.',
      },
      {
        question: 'How much does a local Wichita or KC-side move cost?',
        answer:
          'Planning ranges often fall around $450–$2,000+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates.',
      },
      {
        question: 'Is a Kansas City, KS-to-Wichita move intrastate?',
        answer:
          'Yes — both ends are in Kansas, so you generally need a KCC-authorized household goods carrier.',
      },
      {
        question: 'When is peak moving season in Kansas?',
        answer:
          'Statewide peak is typically May–September. Storms and heat can affect productivity.',
      },
      {
        question: 'Does an Overland Park-to-Kansas City, MO move need FMCSA authority?',
        answer:
          'Yes. Crossing into Missouri is interstate even for short hops. Confirm active FMCSA operating authority.',
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
          label: 'KCC — Transportation',
          href: 'https://www.kcc.ks.gov/transportation',
        },
        {
          label: 'KCC — Household goods tariffs',
          href: 'https://www.kcc.ks.gov/transportation/transportation-quick-links/household-goods-tariffs',
        },
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  },

  mississippi: {
    stateSlug: 'mississippi',
    stateCode: 'MS',
    h1: `Mississippi Moving Resource Hub: Costs, MDOT HHG Authority & ${msCount} County Guides`,
    metaTitle: `Mississippi Movers Guide 2026 — Costs, MDOT Authority & ${msCount} County Guides`,
    metaDescription:
      'Plan a move within, to, or from Mississippi. Compare local and intrastate costs, verify MDOT household goods carrier authority, browse 82 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for Mississippi moves in 2026 — typical costs, MDOT vs FMCSA rules, Jackson-to-Gulf Coast regional guides, and tools to compare authorized movers without paid placements.',
    trustBar: [
      `${msCount} County Guides`,
      'Verified Movers',
      'MDOT & FMCSA Checked',
      'Updated 2026',
    ],
    intents: intents('Mississippi'),
    primaryCta: {
      label: 'Calculate My Mississippi Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in Mississippi is different',
      paragraphs: [
        'Mississippi is not one moving market. Jackson capital logistics, Gulf Coast humidity and hurricane risk, DeSoto County Memphis-adjacent suburbs, Delta agricultural towns, and Pine Belt industrial corridors produce different access and labor profiles under one state name.',
        'Carriers transporting household goods within Mississippi must complete MDOT household goods and passenger carrier application frameworks (Certificate of Public Convenience and Necessity pathways). Interstate jobs need FMCSA authority. Summer heat, hurricane season, and I-55/I-10 corridors are planning inputs — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'Mississippi moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical Mississippi local and intrastate patterns; they are not bids. Always compare written estimates from MDOT-authorized movers for in-state work and FMCSA-authorized carriers for interstate work.',
      stats: [
        {
          label: 'Typical Jackson studio / 1BR',
          value: '$400–$1,900+',
          note: 'Stairs and heat matter',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$1,400–$4,500+',
          note: 'HOAs vary by suburb',
        },
        {
          label: 'Intrastate corridor (e.g. Jackson ↔ Gulfport)',
          value: '$1,600–$5,000+',
          note: 'Season and packing drive the spread',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'Heat and hurricane risk affect dates',
        },
        {
          label: 'Top outbound destinations',
          value: 'TX · FL · TN · AL · LA · GA',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: String(msCount),
          note: 'Jackson and Coast emphasized',
        },
      ],
    },
    regulations: {
      mode: 'strong_state_regulator',
      title: 'Mississippi moving regulations & consumer protection',
      intro:
        'Mississippi requires carriers desiring to transport household goods in the state to complete MDOT household goods carrier application frameworks and hold appropriate authority. Match authority to the job before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside Mississippi)',
        body: 'If origin or destination is outside Mississippi, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. Mississippi household goods authority alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within Mississippi)',
        body: 'MDOT publishes household goods and passenger carriers guidelines and application packets for carriers transporting household goods within Mississippi. Insurance documentation is part of the application process. Consumers should confirm active authority and get written estimates before hiring.',
      },
      verifySteps: [
        'Classify the job: entirely in Mississippi (MDOT HHG authority) vs any out-of-state leg (FMCSA / USDOT).',
        'Copy the exact legal name from the written estimate.',
        'Intrastate: confirm MDOT household goods carrier authority for the company.',
        'Interstate: look up USDOT / MC on FMCSA SAFER.',
        'Get written estimates, insurance/valuation clarity, and inventory details.',
        'Avoid large cash deposits to unverified operators.',
      ],
      protections: [
        {
          title: 'MDOT household goods authority',
          detail:
            'Carriers desiring to transport household goods in Mississippi must complete MDOT application packets and meet insurance documentation requirements.',
        },
        {
          title: 'Insurance filings',
          detail:
            'Application materials require proof of public liability and property damage insurance coverage appropriate to regulated operations.',
        },
        {
          title: 'Written estimates',
          detail:
            'Insist on written estimates and clarity on stairs, long carries, humidity delays, and packing before signing.',
        },
      ],
      officialLinks: [
        {
          label: 'MDOT — Household goods and passenger carriers guidelines',
          href: 'https://mdot.ms.gov/documents/Enforcement/Regulations/Household%20Goods%20and%20Passenger%20Carriers%20Guidelines.pdf',
          external: true,
        },
        {
          label: 'MDOT — Household goods application',
          href: 'https://mdot.ms.gov/documents/Enforcement/Regulations/Household%20Goods%20and%20Passenger%20Carriers%20Application.pdf',
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
        'Licensing rules and forms can change. Always verify current MDOT household goods authority or FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('mississippi', [
      {
        key: 'jackson-metro',
        id: 'jackson-metro',
        name: 'Jackson Metro',
        shortName: 'Jackson Metro',
        blurb:
          'Hinds, Rankin, Madison, and neighbors with capital-city logistics and mixed suburbs.',
        challenges: [
          'Heat and humidity productivity loss',
          'I-55 / I-20 congestion windows',
        ],
        ctaLabel: 'Explore Jackson Metro',
      },
      {
        key: 'gulf-coast',
        id: 'gulf-coast',
        name: 'Mississippi Gulf Coast',
        shortName: 'Gulf Coast',
        blurb:
          'Harrison, Hancock, Jackson, and coastal counties with humidity, casinos, and hurricane risk.',
        challenges: [
          'Hurricane-season date risk',
          'Coastal humidity and parking constraints',
        ],
        ctaLabel: 'Explore Gulf Coast',
      },
      {
        key: 'pine-belt-south',
        id: 'pine-belt-south',
        name: 'Pine Belt & South Mississippi',
        shortName: 'Pine Belt / South',
        blurb:
          'Hattiesburg, Laurel, Meridian approaches, and south-central counties with industrial mix.',
        challenges: [
          'Confirm coverage for rural addresses',
          'Summer heat slows outdoor labor',
        ],
        ctaLabel: 'Explore Pine Belt / South',
      },
      {
        key: 'delta',
        id: 'delta',
        name: 'Mississippi Delta',
        shortName: 'Delta',
        blurb:
          'Bolivar, Washington, and Delta counties with agricultural corridors and longer rural approaches.',
        challenges: [
          'Longer regional hauls',
          'Confirm mover coverage early',
        ],
        ctaLabel: 'Explore Mississippi Delta',
      },
      {
        key: 'north-ms',
        id: 'north-ms',
        name: 'North Mississippi',
        shortName: 'North MS',
        blurb:
          'DeSoto County Memphis-adjacent growth, Oxford campus peaks, and northeast industrial towns.',
        challenges: [
          'Short TN hops need FMCSA authority',
          'Campus lease-cycle peaks',
        ],
        ctaLabel: 'Explore North Mississippi',
      },
    ]),
    costs: {
      title: 'Mississippi moving costs',
      intro:
        'Mississippi pricing reflects Jackson and Coast labor markets, heat, humidity, and long north–south hauls. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate Mississippi moving costs',
        lastReviewed: '2026-07-23',
        body: 'These ranges are planning estimates, not quotes. They combine typical Mississippi local and intrastate patterns: home size, distance, stairs, parking, heat, humidity, and regional labor. Actual bids vary. Always compare written estimates from MDOT-authorized movers for in-state work and FMCSA-authorized carriers for interstate work.',
      },
      ranges: [
        {
          label: 'Jackson studio / 1BR',
          value: '$400–$1,900+',
          note: 'Heat and access dominate',
        },
        {
          label: 'Suburban 2–3BR house',
          value: '$1,400–$4,200+',
          note: 'HOAs vary',
        },
        {
          label: 'Intrastate mid-size (e.g. Jackson ↔ Hattiesburg)',
          value: '$1,500–$4,800+',
          note: 'Season matters',
        },
        {
          label: 'Intrastate long (e.g. Southaven ↔ Gulfport)',
          value: '$2,000–$6,500+',
          note: 'Distance and packing push the top',
        },
        {
          label: 'Typical 2–3 person crew (major markets)',
          value: '$100–$190+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'Summer heat and humidity slow outdoor labor.',
        'Hurricane season can force coastal reschedules.',
        'DeSoto County growth jobs often involve Tennessee border logistics.',
        'Rural Delta and Pine Belt addresses need coverage confirmation early.',
        'Short hops into LA, AL, TN, or AR are interstate even when nearby.',
      ],
    },
    routes: {
      title: 'Popular Mississippi moving routes',
      intro:
        'Mississippi sits between Southeast growth markets with strong outbound flows to Texas and Florida, Memphis-adjacent northern traffic, and large Jackson–Coast internal flows. Interstate jobs need FMCSA authority; in-state corridors need MDOT-authorized household goods carriers.',
      migrationProfile: 'outbound_dominant',
      outbound: [
        {
          label: 'Mississippi → Texas / Florida',
          href: '/local-movers/texas',
          origins: 'Jackson, Coast, North MS',
          transit: 'I-10 / I-20 / I-55 multi-day',
          planningNote: 'Confirm FMCSA authority end-to-end.',
          note: 'High-volume Sun Belt corridors.',
        },
        {
          label: 'Mississippi → Tennessee / Alabama / Louisiana',
          href: '/local-movers/tennessee',
          origins: 'North MS, East MS, Southwest MS',
          transit: 'Often same-day or next-day interstate',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Common short cross-border metro moves.',
        },
        {
          label: 'Mississippi → Georgia / Carolinas',
          href: '/local-movers/georgia',
          origins: 'Jackson, Coast',
          transit: 'Multi-day interstate',
          planningNote: 'HOAs at destination common.',
          note: 'Popular job-driven outbound routes.',
        },
      ],
      inbound: [
        {
          label: 'Moving to Hinds County (Jackson)',
          href: '/local-movers/mississippi/hinds',
          note: 'Capital-city multi-unit and suburban mix.',
        },
        {
          label: 'Moving to Harrison County (Gulfport–Biloxi)',
          href: '/local-movers/mississippi/harrison',
          note: 'Coastal humidity and hurricane-season planning.',
        },
        {
          label: 'Moving to DeSoto County',
          href: '/local-movers/mississippi/desoto',
          note: 'Memphis-adjacent growth suburbs.',
        },
      ],
    },
    challenges: {
      title: 'Mississippi-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real Mississippi moves — not generic national checklist filler.',
      items: [
        {
          title: 'Heat and humidity',
          detail:
            'Summer outdoor labor slows quickly. Prefer early start times May–September statewide.',
        },
        {
          title: 'Gulf hurricane season',
          detail:
            'Coastal jobs can reschedule with little notice June–November. Keep flexible dates.',
        },
        {
          title: 'Memphis-adjacent border hops',
          detail:
            'DeSoto County moves into Tennessee are interstate even if short. Confirm FMCSA authority before deposits.',
        },
        {
          title: 'Rural coverage gaps',
          detail:
            'Delta and rural Pine Belt addresses may have thinner mover density. Confirm coverage early.',
        },
        {
          title: 'MDOT authority verification',
          detail:
            'Confirm the exact legal name holds Mississippi household goods authority before deposits on pure in-state work.',
        },
      ],
    },
    tools: SHARED_TOOLS('Mississippi'),
    faq: [
      {
        question: 'Do Mississippi movers need state authority?',
        answer:
          'Yes. Carriers transporting household goods within Mississippi generally need MDOT household goods authority under state application frameworks. Interstate moves require FMCSA authority.',
      },
      {
        question: 'How do I verify a Mississippi mover?',
        answer:
          'Confirm MDOT household goods carrier authority for the legal name on your estimate. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER.',
      },
      {
        question: 'How much does a local Jackson move cost?',
        answer:
          'Planning ranges often fall around $400–$1,900+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates.',
      },
      {
        question: 'Is a Jackson-to-Gulfport move intrastate?',
        answer:
          'Yes — both ends are in Mississippi, so you generally need an MDOT-authorized household goods carrier.',
      },
      {
        question: 'When is peak moving season in Mississippi?',
        answer:
          'Statewide peak is typically May–September. Hurricane season can add date risk on the Coast.',
      },
      {
        question: 'Does a Southaven-to-Memphis move need FMCSA authority?',
        answer:
          'Yes. Crossing into Tennessee is interstate even for short hops. Confirm active FMCSA operating authority.',
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
          label: 'MDOT — HHG and passenger carriers guidelines',
          href: 'https://mdot.ms.gov/documents/Enforcement/Regulations/Household%20Goods%20and%20Passenger%20Carriers%20Guidelines.pdf',
        },
        {
          label: 'MDOT — HHG application',
          href: 'https://mdot.ms.gov/documents/Enforcement/Regulations/Household%20Goods%20and%20Passenger%20Carriers%20Application.pdf',
        },
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  },

  nevada: {
    stateSlug: 'nevada',
    stateCode: 'NV',
    h1: `Nevada Moving Resource Hub: Costs, NTA CPCN Certificates & ${nvCount} County Guides`,
    metaTitle: `Nevada Movers Guide 2026 — Costs, NTA Certificates & ${nvCount} County Guides`,
    metaDescription:
      'Plan a move within, to, or from Nevada. Compare local and intrastate costs, verify Nevada Transportation Authority household goods CPCN certificates, browse 17 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for Nevada moves in 2026 — typical costs, NTA vs FMCSA rules, Las Vegas-to-Reno regional guides, and tools to compare certificated movers without paid placements.',
    trustBar: [
      `${nvCount} County Guides`,
      'Verified Movers',
      'NTA & FMCSA Checked',
      'Updated 2026',
    ],
    intents: intents('Nevada'),
    primaryCta: {
      label: 'Calculate My Nevada Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in Nevada is different',
      paragraphs: [
        'Nevada is not one moving market. Las Vegas multi-unit elevators and HOA suburbs, Reno–Tahoe high-desert logistics, rural mining-corridor hauls, and extreme summer heat produce different access and labor profiles under one state name.',
        'Intrastate household goods movers must hold a Certificate of Public Convenience and Necessity (CPCN) from the Nevada Transportation Authority (NTA). Interstate jobs need FMCSA authority. Summer heat, monsoon storms, and long empty miles between Las Vegas and Reno are planning inputs — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'Nevada moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical Nevada local and intrastate patterns; they are not bids. Always compare written estimates from NTA-certificated movers for in-state work and FMCSA-authorized carriers for interstate work.',
      stats: [
        {
          label: 'Typical Las Vegas studio / 1BR',
          value: '$500–$2,200+',
          note: 'Elevators, HOAs, and heat matter',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$1,700–$5,200+',
          note: 'Clark County HOAs common',
        },
        {
          label: 'Intrastate corridor (e.g. Las Vegas ↔ Reno)',
          value: '$2,200–$7,500+',
          note: 'Long desert haul; season matters',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'Extreme heat affects productivity',
        },
        {
          label: 'Top inbound origins',
          value: 'CA · AZ · TX · UT · WA',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: String(nvCount),
          note: 'Clark and Washoe emphasized',
        },
      ],
    },
    regulations: {
      mode: 'strong_state_regulator',
      title: 'Nevada moving regulations & consumer protection',
      intro:
        'Nevada requires intrastate household goods movers to obtain a Certificate of Public Convenience and Necessity (CPCN) from the Nevada Transportation Authority. Match the certificate to the job before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside Nevada)',
        body: 'If origin or destination is outside Nevada, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. An NTA household goods CPCN alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within Nevada)',
        body: 'NTA regulates household goods movers under NRS/NAC 706. Carriers apply for CPCN authority with insurance, business registration, and proposed tariffs. Consumers can verify active certificates through NTA certificate/tariff resources. Unlicensed operation can trigger impound and significant fines.',
      },
      verifySteps: [
        'Classify the job: entirely in Nevada (NTA CPCN) vs any out-of-state leg (FMCSA / USDOT).',
        'Copy the exact legal name from the written estimate.',
        'Intrastate: confirm an active NTA household goods CPCN for the company.',
        'Interstate: look up USDOT / MC on FMCSA SAFER.',
        'Get written estimates consistent with posted tariff expectations.',
        'Avoid large cash deposits to unverified operators.',
      ],
      protections: [
        {
          title: 'NTA CPCN requirement',
          detail:
            'Intrastate household goods movers in Nevada must hold a Certificate of Public Convenience and Necessity from the Nevada Transportation Authority.',
        },
        {
          title: 'Active certificates database',
          detail:
            'NTA publishes certificate and tariff resources so consumers can verify certificated local movers before hiring.',
        },
        {
          title: 'Enforcement against unlicensed movers',
          detail:
            'Nevada law authorizes significant penalties for operating without a CPCN, including vehicle impound and fines.',
        },
      ],
      officialLinks: [
        {
          label: 'Nevada Transportation Authority',
          href: 'https://nta.nv.gov/',
          external: true,
        },
        {
          label: 'NTA — Tariffs and certificates',
          href: 'https://nta.nv.gov/Carriers/Tariffs-Certificates/',
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
        'Licensing rules and directories can change. Always verify current NTA CPCN status or FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('nevada', [
      {
        key: 'las-vegas-south',
        id: 'las-vegas-south',
        name: 'Las Vegas & Southern Nevada',
        shortName: 'Southern NV',
        blurb:
          'Clark County multi-unit elevators, HOA suburbs, and southern desert counties with extreme heat.',
        challenges: [
          'Elevators, HOAs, and summer heat',
          'Monsoon and dust-storm delays',
        ],
        ctaLabel: 'Explore Southern Nevada',
      },
      {
        key: 'reno-north',
        id: 'reno-north',
        name: 'Reno, Carson & Northern Nevada',
        shortName: 'Northern NV',
        blurb:
          'Washoe, Carson City, Douglas, and northern corridors with Tahoe approaches and high-desert winters.',
        challenges: [
          'Mountain weather and Tahoe congestion',
          'Winter ice on higher elevations',
        ],
        ctaLabel: 'Explore Northern Nevada',
      },
      {
        key: 'rural-nv',
        id: 'rural-nv',
        name: 'Rural & Eastern Nevada',
        shortName: 'Rural / Eastern NV',
        blurb:
          'Elko and rural counties with long portal-to-portal distances and thinner local coverage.',
        challenges: [
          'Long empty miles between metros',
          'Confirm mover coverage early',
        ],
        ctaLabel: 'Explore Rural / Eastern Nevada',
      },
    ]),
    costs: {
      title: 'Nevada moving costs',
      intro:
        'Nevada pricing reflects Las Vegas labor markets, heat, HOAs, and the long Las Vegas–Reno haul. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate Nevada moving costs',
        lastReviewed: '2026-07-23',
        body: 'These ranges are planning estimates, not quotes. They combine typical Nevada local and intrastate patterns: home size, distance, elevators, parking, HOAs, heat, and regional labor. Actual bids vary under NTA tariff frameworks for certificated carriers. Always compare written estimates from NTA-certificated movers for in-state work and FMCSA-authorized carriers for interstate work.',
      },
      ranges: [
        {
          label: 'Las Vegas studio / 1BR',
          value: '$500–$2,200+',
          note: 'Elevators and heat dominate',
        },
        {
          label: 'Suburban 2–3BR house',
          value: '$1,700–$5,000+',
          note: 'Clark County HOAs common',
        },
        {
          label: 'Intrastate mid-size (e.g. Las Vegas local long carry)',
          value: '$1,600–$4,800+',
          note: 'Access drives hours',
        },
        {
          label: 'Intrastate long (e.g. Las Vegas ↔ Reno)',
          value: '$2,400–$8,000+',
          note: 'Desert distance and season matter',
        },
        {
          label: 'Typical 2–3 person crew (Las Vegas)',
          value: '$125–$230+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'Extreme summer heat slows outdoor labor — prefer early starts.',
        'Clark County HOAs restrict elevator and loading windows.',
        'Las Vegas–Reno is a full-day haul for many crews.',
        'Monsoon storms can force same-day reschedules.',
        'Short hops into CA, AZ, or UT are interstate even when nearby.',
      ],
    },
    routes: {
      title: 'Popular Nevada moving routes',
      intro:
        'Nevada is a major inbound West destination with strong California origins into Las Vegas and Reno, plus large internal desert hauls. Interstate jobs need FMCSA authority; in-state corridors need NTA-certificated household goods movers.',
      migrationProfile: 'inbound_dominant',
      outbound: [
        {
          label: 'Nevada → California',
          href: '/local-movers/california',
          origins: 'Las Vegas, Reno',
          transit: 'Often same-day or next-day interstate',
          planningNote: 'Still interstate — confirm FMCSA; CA legs may need BHGS.',
          note: 'Highest-volume bi-directional corridor.',
        },
        {
          label: 'Nevada → Arizona / Utah',
          href: '/local-movers/arizona',
          origins: 'Southern NV, Northern NV',
          transit: 'I-15 multi-day or same-day near border',
          planningNote: 'Confirm FMCSA authority end-to-end.',
          note: 'Common regional Sun Belt hops.',
        },
        {
          label: 'Nevada → Texas / Colorado',
          href: '/local-movers/texas',
          origins: 'Las Vegas metro',
          transit: 'Multi-day interstate',
          planningNote: 'Book early for seasonal peaks.',
          note: 'Popular job and lifestyle outbound routes.',
        },
      ],
      inbound: [
        {
          label: 'California → Nevada',
          href: '/local-movers/nevada/clark',
          origins: 'LA, Bay Area, San Diego',
          transit: 'I-15 / I-80 multi-day or next-day',
          planningNote: 'High-volume inbound into Clark and Washoe.',
          note: 'Confirm interstate FMCSA authority.',
        },
        {
          label: 'Moving to Clark County (Las Vegas)',
          href: '/local-movers/nevada/clark',
          note: 'Multi-unit elevators, HOAs, and extreme heat.',
        },
        {
          label: 'Moving to Washoe County (Reno)',
          href: '/local-movers/nevada/washoe',
          note: 'High-desert logistics and Tahoe approaches.',
        },
      ],
    },
    challenges: {
      title: 'Nevada-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real Nevada moves — not generic national checklist filler.',
      items: [
        {
          title: 'Extreme summer heat',
          detail:
            'Las Vegas outdoor labor slows dramatically June–August. Prefer early start times and shade staging.',
        },
        {
          title: 'Clark County HOAs',
          detail:
            'Many communities restrict elevator and loading hours. Get rules in writing before booking.',
        },
        {
          title: 'Las Vegas–Reno distance',
          detail:
            'Cross-state-internal hauls are long desert days. Confirm overnight plans and fuel time on estimates.',
        },
        {
          title: 'Short interstate hops into California',
          detail:
            'Border jobs are still interstate. Confirm FMCSA authority even for a one-hour haul.',
        },
        {
          title: 'NTA CPCN verification',
          detail:
            'Confirm the exact legal name holds an active NTA household goods CPCN before deposits on pure in-state work.',
        },
      ],
    },
    tools: SHARED_TOOLS('Nevada'),
    faq: [
      {
        question: 'Do Nevada movers need an NTA certificate?',
        answer:
          'Yes. Intrastate household goods movers generally need a Certificate of Public Convenience and Necessity (CPCN) from the Nevada Transportation Authority. Interstate moves require FMCSA authority.',
      },
      {
        question: 'How do I verify a Nevada mover?',
        answer:
          'Use NTA certificate/tariff resources and match the legal name on your written estimate. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER.',
      },
      {
        question: 'How much does a local Las Vegas move cost?',
        answer:
          'Planning ranges often fall around $500–$2,200+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates.',
      },
      {
        question: 'Is a Las Vegas-to-Reno move intrastate?',
        answer:
          'Yes — both ends are in Nevada, so you generally need an NTA-certificated household goods mover.',
      },
      {
        question: 'When is peak moving season in Nevada?',
        answer:
          'Statewide peak is typically May–September. Extreme heat can affect summer productivity.',
      },
      {
        question: 'Does a Las Vegas-to-Los Angeles move need FMCSA authority?',
        answer:
          'Yes. Crossing into California is interstate. Confirm active FMCSA operating authority and a USDOT number.',
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
        { label: 'Nevada Transportation Authority', href: 'https://nta.nv.gov/' },
        {
          label: 'NTA — Tariffs and certificates',
          href: 'https://nta.nv.gov/Carriers/Tariffs-Certificates/',
        },
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  },

  'new-mexico': {
    stateSlug: 'new-mexico',
    stateCode: 'NM',
    h1: `New Mexico Moving Resource Hub: Costs, Motor Carrier Authority & ${nmCount} County Guides`,
    metaTitle: `New Mexico Movers Guide 2026 — Costs, CPCN Authority & ${nmCount} County Guides`,
    metaDescription:
      'Plan a move within, to, or from New Mexico. Compare local and intrastate costs, verify household goods Certificate of Public Convenience and Necessity authority, browse 33 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for New Mexico moves in 2026 — typical costs, state motor carrier vs FMCSA rules, Albuquerque-to-Las Cruces regional guides, and tools to compare authorized movers without paid placements.',
    trustBar: [
      `${nmCount} County Guides`,
      'Verified Movers',
      'NM Authority & FMCSA Checked',
      'Updated 2026',
    ],
    intents: intents('New Mexico'),
    primaryCta: {
      label: 'Calculate My New Mexico Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in New Mexico is different',
      paragraphs: [
        'New Mexico is not one moving market. Albuquerque multi-unit and adobe-access logistics, Santa Fe historic constraints, Las Cruces border-adjacent growth, oil-patch southeast traffic, and high-desert mountain approaches produce different access and labor profiles under one state name.',
        'Intrastate motor carriers of household goods must obtain a Certificate of Public Convenience and Necessity through New Mexico motor carrier authority frameworks (historically PRC Transportation; applications processing has been transitioning with NMDOT coordination). Interstate jobs need FMCSA authority. Altitude, summer monsoons, and long I-25/I-40 hauls are planning inputs — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'New Mexico moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical New Mexico local and intrastate patterns; they are not bids. Always compare written estimates and confirm state or FMCSA authority for your route.',
      stats: [
        {
          label: 'Typical Albuquerque studio / 1BR',
          value: '$450–$2,100+',
          note: 'Access and altitude matter',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$1,600–$5,000+',
          note: 'HOAs and long driveways vary',
        },
        {
          label: 'Intrastate corridor (e.g. Albuquerque ↔ Las Cruces)',
          value: '$1,800–$5,500+',
          note: 'I-25 distance and season matter',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'Monsoon and heat affect productivity',
        },
        {
          label: 'Top inbound origins',
          value: 'TX · CA · AZ · CO · OK',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: String(nmCount),
          note: 'Albuquerque and Santa Fe emphasized',
        },
      ],
    },
    regulations: {
      mode: 'strong_state_regulator',
      title: 'New Mexico moving regulations & consumer protection',
      intro:
        'New Mexico requires intrastate motor carriers of household goods to obtain a Certificate of Public Convenience and Necessity under state motor carrier authority frameworks. Match authority to the job before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside New Mexico)',
        body: 'If origin or destination is outside New Mexico, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. New Mexico household goods CPCN authority alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within New Mexico)',
        body: 'Intrastate motor carriers of passengers and household goods must submit applications for a Certificate of Public Convenience and Necessity. Applications processing for regulated motor carriers has historically been handled through PRC Transportation and has been coordinating transition work with NMDOT — confirm current application channels when verifying a carrier. Consumers should confirm active authority and get written estimates before hiring.',
      },
      verifySteps: [
        'Classify the job: entirely in New Mexico (state HHG CPCN) vs any out-of-state leg (FMCSA / USDOT).',
        'Copy the exact legal name from the written estimate.',
        'Intrastate: confirm Certificate of Public Convenience and Necessity authority for household goods.',
        'Interstate: look up USDOT / MC on FMCSA SAFER.',
        'Get written estimates, insurance/valuation clarity, and inventory details.',
        'Avoid large cash deposits to unverified operators.',
      ],
      protections: [
        {
          title: 'Certificate of Public Convenience and Necessity',
          detail:
            'Intrastate motor carriers of household goods must obtain CPCN authority under New Mexico motor carrier frameworks before operating for hire within the state.',
        },
        {
          title: 'Applications processing',
          detail:
            'State applications units process authorities to operate as regulated motor carriers, including household goods moving services.',
        },
        {
          title: 'Written estimates',
          detail:
            'Insist on written estimates and clarity on stairs, adobe access, long carries, and packing before signing.',
        },
      ],
      officialLinks: [
        {
          label: 'NMDOT — PRC transportation transition note',
          href: 'https://www.dot.nm.gov/blog/2024/05/21/prc-transportation-coming-soon/',
          external: true,
        },
        {
          label: 'NM MVD — CPCN for passengers and household goods',
          href: 'https://www.mvd.newmexico.gov/who-has-to-get-a-certificate-of-public-convenience-and-necessity/',
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
        'Agency responsibilities and application channels can change during administrative transitions. Always verify current New Mexico household goods authority or FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('new-mexico', [
      {
        key: 'albuquerque-metro',
        id: 'albuquerque-metro',
        name: 'Albuquerque Metro',
        shortName: 'Albuquerque Metro',
        blurb:
          'Bernalillo, Sandoval, Valencia, and neighbors with multi-unit access, HOAs, and I-25/I-40 logistics.',
        challenges: [
          'Altitude and summer monsoon delays',
          'HOA windows in growth suburbs',
        ],
        ctaLabel: 'Explore Albuquerque Metro',
      },
      {
        key: 'santa-fe-north',
        id: 'santa-fe-north',
        name: 'Santa Fe & Northern New Mexico',
        shortName: 'Santa Fe / North',
        blurb:
          'Santa Fe, Taos, and northern counties with historic access constraints and mountain approaches.',
        challenges: [
          'Historic district truck limits',
          'Mountain weather and narrow roads',
        ],
        ctaLabel: 'Explore Santa Fe / North',
      },
      {
        key: 'southern-nm',
        id: 'southern-nm',
        name: 'Southern New Mexico',
        shortName: 'Southern NM',
        blurb:
          'Las Cruces, border-adjacent growth, and southern high-desert counties.',
        challenges: [
          'Heat and monsoon timing',
          'Confirm coverage for rural addresses',
        ],
        ctaLabel: 'Explore Southern New Mexico',
      },
      {
        key: 'southeast-nm',
        id: 'southeast-nm',
        name: 'Southeast New Mexico',
        shortName: 'Southeast NM',
        blurb:
          'Roswell, Carlsbad, Hobbs, and oil-patch corridors with industrial traffic and longer hauls.',
        challenges: [
          'Industrial traffic and crew lodging demand',
          'Long portal-to-portal distances',
        ],
        ctaLabel: 'Explore Southeast New Mexico',
      },
      {
        key: 'northwest-nm',
        id: 'northwest-nm',
        name: 'Northwest New Mexico',
        shortName: 'Northwest NM',
        blurb:
          'Farmington and Gallup approaches with longer regional hauls and Four Corners logistics.',
        challenges: [
          'Distance from Albuquerque fleets',
          'Confirm mover coverage early',
        ],
        ctaLabel: 'Explore Northwest New Mexico',
      },
    ]),
    costs: {
      title: 'New Mexico moving costs',
      intro:
        'New Mexico pricing reflects Albuquerque labor markets, altitude, monsoons, historic access, and long I-25/I-40 hauls. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate New Mexico moving costs',
        lastReviewed: '2026-07-23',
        body: 'These ranges are planning estimates, not quotes. They combine typical New Mexico local and intrastate patterns: home size, distance, stairs, parking, altitude, weather, and regional labor. Actual bids vary. Always compare written estimates and confirm state or FMCSA authority for your route.',
      },
      ranges: [
        {
          label: 'Albuquerque studio / 1BR',
          value: '$450–$2,100+',
          note: 'Access and altitude dominate',
        },
        {
          label: 'Suburban 2–3BR house',
          value: '$1,500–$4,800+',
          note: 'HOAs vary',
        },
        {
          label: 'Intrastate mid-size (e.g. Albuquerque ↔ Santa Fe)',
          value: '$1,500–$4,800+',
          note: 'Season matters',
        },
        {
          label: 'Intrastate long (e.g. Albuquerque ↔ Las Cruces or Farmington)',
          value: '$2,000–$6,500+',
          note: 'Distance drives hours',
        },
        {
          label: 'Typical 2–3 person crew (Albuquerque)',
          value: '$110–$210+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'Altitude can slow labor productivity for some crews.',
        'Summer monsoons force flexible afternoon schedules.',
        'Santa Fe historic districts constrain truck length and parking.',
        'Southeast oil-patch lodging competition can raise crew costs.',
        'Short hops into TX, AZ, CO, or OK are interstate even when nearby.',
      ],
    },
    routes: {
      title: 'Popular New Mexico moving routes',
      intro:
        'New Mexico bridges Texas, Colorado, and Arizona corridors with strong Albuquerque internal traffic and large I-40/I-25 flows. Interstate jobs need FMCSA authority; in-state corridors need properly authorized household goods carriers.',
      migrationProfile: 'balanced',
      outbound: [
        {
          label: 'New Mexico → Texas',
          href: '/local-movers/texas',
          origins: 'Albuquerque, Las Cruces, Southeast NM',
          transit: 'I-40 / I-10 multi-day or same-day near border',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Highest-volume outbound corridor.',
        },
        {
          label: 'New Mexico → Arizona / Colorado',
          href: '/local-movers/arizona',
          origins: 'Albuquerque, Northwest NM, North',
          transit: 'I-40 / I-25 multi-day',
          planningNote: 'Confirm FMCSA authority end-to-end.',
          note: 'Common Mountain West hops.',
        },
        {
          label: 'New Mexico → California',
          href: '/local-movers/california',
          origins: 'Albuquerque metro',
          transit: 'Multi-day I-40',
          planningNote: 'CA second hops may need BHGS for in-CA legs.',
          note: 'Popular lifestyle outbound route.',
        },
      ],
      inbound: [
        {
          label: 'Moving to Bernalillo County (Albuquerque)',
          href: '/local-movers/new-mexico/bernalillo',
          note: 'Multi-unit access and I-25/I-40 logistics.',
        },
        {
          label: 'Moving to Santa Fe County',
          href: '/local-movers/new-mexico/santa-fe',
          note: 'Historic access and mountain approaches.',
        },
        {
          label: 'Moving to Doña Ana County (Las Cruces)',
          href: '/local-movers/new-mexico/doa-ana',
          note: 'Southern growth and border-adjacent patterns.',
        },
      ],
    },
    challenges: {
      title: 'New Mexico-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real New Mexico moves — not generic national checklist filler.',
      items: [
        {
          title: 'Santa Fe historic access',
          detail:
            'Narrow streets and historic constraints may require smaller trucks. Share approach photos early.',
        },
        {
          title: 'Monsoon afternoons',
          detail:
            'Summer storms can halt outdoor work with little notice. Prefer morning loading windows July–September.',
        },
        {
          title: 'Altitude and long hauls',
          detail:
            'Albuquerque–Las Cruces and Albuquerque–Farmington are long crew days. Confirm overnight plans on estimates.',
        },
        {
          title: 'Border hops into Texas or Arizona',
          detail:
            'Short interstate jobs still need FMCSA authority. Confirm before deposits.',
        },
        {
          title: 'Authority verification during agency transitions',
          detail:
            'Confirm the exact legal name holds current New Mexico household goods CPCN authority through the active application channel before deposits.',
        },
      ],
    },
    tools: SHARED_TOOLS('New Mexico'),
    faq: [
      {
        question: 'Do New Mexico movers need a CPCN?',
        answer:
          'Yes. Intrastate motor carriers of household goods generally need a Certificate of Public Convenience and Necessity under New Mexico motor carrier frameworks. Interstate moves require FMCSA authority.',
      },
      {
        question: 'How do I verify a New Mexico mover?',
        answer:
          'Confirm household goods CPCN authority for the legal name on your estimate through current state motor carrier application channels. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER.',
      },
      {
        question: 'How much does a local Albuquerque move cost?',
        answer:
          'Planning ranges often fall around $450–$2,100+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates.',
      },
      {
        question: 'Is an Albuquerque-to-Santa Fe move intrastate?',
        answer:
          'Yes — both ends are in New Mexico, so you generally need a properly authorized household goods carrier.',
      },
      {
        question: 'When is peak moving season in New Mexico?',
        answer:
          'Statewide peak is typically May–September. Monsoon storms can affect summer productivity.',
      },
      {
        question: 'Does an Albuquerque-to-El Paso move need FMCSA authority?',
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
          label: 'NMDOT — PRC transportation transition',
          href: 'https://www.dot.nm.gov/blog/2024/05/21/prc-transportation-coming-soon/',
        },
        {
          label: 'NM MVD — CPCN requirements',
          href: 'https://www.mvd.newmexico.gov/who-has-to-get-a-certificate-of-public-convenience-and-necessity/',
        },
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  },
};

const fileMap = [
  ['utah', 'utahStateResourceHub', packs.utah],
  ['kansas', 'kansasStateResourceHub', packs.kansas],
  ['mississippi', 'mississippiStateResourceHub', packs.mississippi],
  ['nevada', 'nevadaStateResourceHub', packs.nevada],
  ['new-mexico', 'newMexicoStateResourceHub', packs['new-mexico']],
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

// Full registry W1–W7 + CA
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
import { kansasStateResourceHub } from '@/lib/local-movers/state-resource-hub/kansas';
import { kentuckyStateResourceHub } from '@/lib/local-movers/state-resource-hub/kentucky';
import { louisianaStateResourceHub } from '@/lib/local-movers/state-resource-hub/louisiana';
import { marylandStateResourceHub } from '@/lib/local-movers/state-resource-hub/maryland';
import { massachusettsStateResourceHub } from '@/lib/local-movers/state-resource-hub/massachusetts';
import { michiganStateResourceHub } from '@/lib/local-movers/state-resource-hub/michigan';
import { minnesotaStateResourceHub } from '@/lib/local-movers/state-resource-hub/minnesota';
import { mississippiStateResourceHub } from '@/lib/local-movers/state-resource-hub/mississippi';
import { missouriStateResourceHub } from '@/lib/local-movers/state-resource-hub/missouri';
import { nevadaStateResourceHub } from '@/lib/local-movers/state-resource-hub/nevada';
import { newJerseyStateResourceHub } from '@/lib/local-movers/state-resource-hub/new-jersey';
import { newMexicoStateResourceHub } from '@/lib/local-movers/state-resource-hub/new-mexico';
import { newYorkStateResourceHub } from '@/lib/local-movers/state-resource-hub/new-york';
import { northCarolinaStateResourceHub } from '@/lib/local-movers/state-resource-hub/north-carolina';
import { ohioStateResourceHub } from '@/lib/local-movers/state-resource-hub/ohio';
import { oklahomaStateResourceHub } from '@/lib/local-movers/state-resource-hub/oklahoma';
import { oregonStateResourceHub } from '@/lib/local-movers/state-resource-hub/oregon';
import { pennsylvaniaStateResourceHub } from '@/lib/local-movers/state-resource-hub/pennsylvania';
import { southCarolinaStateResourceHub } from '@/lib/local-movers/state-resource-hub/south-carolina';
import { tennesseeStateResourceHub } from '@/lib/local-movers/state-resource-hub/tennessee';
import { texasStateResourceHub } from '@/lib/local-movers/state-resource-hub/texas';
import { utahStateResourceHub } from '@/lib/local-movers/state-resource-hub/utah';
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
  kansasStateResourceHub,
  kentuckyStateResourceHub,
  louisianaStateResourceHub,
  marylandStateResourceHub,
  massachusettsStateResourceHub,
  michiganStateResourceHub,
  minnesotaStateResourceHub,
  mississippiStateResourceHub,
  missouriStateResourceHub,
  nevadaStateResourceHub,
  newJerseyStateResourceHub,
  newMexicoStateResourceHub,
  newYorkStateResourceHub,
  northCarolinaStateResourceHub,
  ohioStateResourceHub,
  oklahomaStateResourceHub,
  oregonStateResourceHub,
  pennsylvaniaStateResourceHub,
  southCarolinaStateResourceHub,
  tennesseeStateResourceHub,
  texasStateResourceHub,
  utahStateResourceHub,
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

console.log('registry updated with Wave 7 (36 packs total)');
