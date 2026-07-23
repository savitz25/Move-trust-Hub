/**
 * Wave 8 State Resource Hubs: NE, ID, WV, HI, AK
 * Run: node scripts/generate-wave8-state-hubs.mjs
 * Prerequisites: scripts/tmp-wave8-regions.json (0 orphans / 0 duplicates)
 *
 * Note: HI (5 counties) and compact AK/WV packs follow TEMPLATE_RULES region
 * display guidance (flat / lighter modules for small curated sets).
 */
import { readFileSync, writeFileSync } from 'fs';

const regions = JSON.parse(readFileSync('scripts/tmp-wave8-regions.json', 'utf8'));

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
 * Research brief (Wave 8):
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

const neCount = getUniqueCountyCount('nebraska');
const idCount = getUniqueCountyCount('idaho');
const wvCount = getUniqueCountyCount('west-virginia');
const hiCount = getUniqueCountyCount('hawaii');
const akCount = getUniqueCountyCount('alaska');

const packs = {
  nebraska: {
    stateSlug: 'nebraska',
    stateCode: 'NE',
    h1: `Nebraska Moving Resource Hub: Costs, PSC HHG Licenses & ${neCount} County Guides`,
    metaTitle: `Nebraska Movers Guide 2026 — Costs, PSC Licenses & ${neCount} County Guides`,
    metaDescription:
      'Plan a move within, to, or from Nebraska. Compare local and intrastate costs, verify Nebraska Public Service Commission household goods licenses, browse 93 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for Nebraska moves in 2026 — typical costs, PSC vs FMCSA rules, Omaha-to-Panhandle regional guides, and tools to compare licensed movers without paid placements.',
    trustBar: [
      `${neCount} County Guides`,
      'Verified Movers',
      'NE PSC & FMCSA Checked',
      'Updated 2026',
    ],
    intents: intents('Nebraska'),
    primaryCta: {
      label: 'Calculate My Nebraska Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in Nebraska is different',
      paragraphs: [
        'Nebraska is not one moving market. Omaha multi-unit and Iowa-border logistics, Lincoln capital and campus peaks, Grand Island–Kearney I-80 corridors, and Panhandle long hauls produce different access and labor profiles under one state name.',
        'Household goods movers must apply for and hold a License from the Nebraska Public Service Commission before transporting household goods in the state. Interstate jobs need FMCSA authority. Winter plains weather, tornado season, and I-80 distances are planning inputs — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'Nebraska moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical Nebraska local and intrastate patterns; they are not bids. Always compare written estimates from PSC-licensed movers for in-state work and FMCSA-authorized carriers for interstate work.',
      stats: [
        {
          label: 'Typical Omaha studio / 1BR',
          value: '$450–$2,000+',
          note: 'Stairs and winter access matter',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$1,500–$4,800+',
          note: 'Metro HOAs common',
        },
        {
          label: 'Intrastate corridor (e.g. Omaha ↔ Lincoln or Grand Island)',
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
          value: 'CO · TX · AZ · IA · FL · KS',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: String(neCount),
          note: 'Omaha and Lincoln emphasized',
        },
      ],
    },
    regulations: {
      mode: 'strong_state_regulator',
      title: 'Nebraska moving regulations & consumer protection',
      intro:
        'Nebraska requires household goods movers to apply for and be granted a License by the Nebraska Public Service Commission before transporting household goods in the state. Match the license to the job before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside Nebraska)',
        body: 'If origin or destination is outside Nebraska, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. A Nebraska PSC household goods license alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within Nebraska)',
        body: 'Beginning under state statute frameworks, movers of household goods must apply to the Commission for a license prior to transporting household goods. Licenses are typically valid for one year and renewable. PSC publishes licensee lists and application materials. Consumers should confirm active license status and get written estimates before hiring.',
      },
      verifySteps: [
        'Classify the job: entirely in Nebraska (PSC HHG license) vs any out-of-state leg (FMCSA / USDOT).',
        'Copy the exact legal name from the written estimate.',
        'Intrastate: confirm a current Nebraska PSC household goods mover license.',
        'Interstate: look up USDOT / MC on FMCSA SAFER.',
        'Get written estimates, insurance/valuation clarity, and inventory details.',
        'Avoid large cash deposits to unverified operators.',
      ],
      protections: [
        {
          title: 'PSC household goods mover license',
          detail:
            'To operate as a household goods mover in Nebraska, an interested party must apply for and be granted a License by the Nebraska Public Service Commission.',
        },
        {
          title: 'Annual license term',
          detail:
            'Licenses are valid for one year from the effective date and may be renewed with required fees and forms.',
        },
        {
          title: 'Statewide service listings',
          detail:
            'PSC publishes household goods movers licensee information so consumers can confirm authorized operators.',
        },
      ],
      officialLinks: [
        {
          label: 'NE PSC — Household goods movers licensees',
          href: 'https://psc.nebraska.gov/household-goods-movers-licensees',
          external: true,
        },
        {
          label: 'NE PSC — Transportation',
          href: 'https://psc.nebraska.gov/transportation',
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
        'Licensing rules and directories can change. Always verify current PSC license status or FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('nebraska', [
      {
        key: 'omaha-metro',
        id: 'omaha-metro',
        name: 'Omaha Metro',
        shortName: 'Omaha Metro',
        blurb:
          'Douglas, Sarpy, and neighbors with multi-unit access, suburbs, and Iowa-border logistics.',
        challenges: [
          'Short IA hops need FMCSA authority',
          'Winter ice and HOA windows',
        ],
        ctaLabel: 'Explore Omaha Metro',
      },
      {
        key: 'lincoln-southeast',
        id: 'lincoln-southeast',
        name: 'Lincoln & Southeast',
        shortName: 'Lincoln / SE',
        blurb:
          'Lancaster capital and campus peaks with southeast agricultural counties.',
        challenges: [
          'Campus lease-cycle peaks',
          'Mix of multi-unit and rural access',
        ],
        ctaLabel: 'Explore Lincoln / Southeast',
      },
      {
        key: 'central-ne',
        id: 'central-ne',
        name: 'Central Nebraska',
        shortName: 'Central NE',
        blurb:
          'Grand Island, Kearney, and I-80 corridor counties with longer regional hauls.',
        challenges: [
          'I-80 weather and truck traffic',
          'Confirm coverage for rural addresses',
        ],
        ctaLabel: 'Explore Central Nebraska',
      },
      {
        key: 'western-ne',
        id: 'western-ne',
        name: 'Western Nebraska',
        shortName: 'Western NE',
        blurb:
          'North Platte and southwest counties with plains approaches and thinner local density.',
        challenges: [
          'Long empty miles from Omaha fleets',
          'Wind and winter weather',
        ],
        ctaLabel: 'Explore Western Nebraska',
      },
      {
        key: 'panhandle',
        id: 'panhandle',
        name: 'Nebraska Panhandle',
        shortName: 'Panhandle',
        blurb:
          'Scottsbluff and Panhandle counties with long portal-to-portal distances.',
        challenges: [
          'Confirm mover coverage early',
          'Long regional hauls and weather',
        ],
        ctaLabel: 'Explore Panhandle',
      },
    ]),
    costs: {
      title: 'Nebraska moving costs',
      intro:
        'Nebraska pricing reflects Omaha and Lincoln labor markets, winter weather, and long I-80 hauls. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate Nebraska moving costs',
        lastReviewed: '2026-07-23',
        body: 'These ranges are planning estimates, not quotes. They combine typical Nebraska local and intrastate patterns: home size, distance, stairs, parking, HOAs, winter weather, and regional labor. Actual bids vary. Always compare written estimates from PSC-licensed movers for in-state work and FMCSA-authorized carriers for interstate work.',
      },
      ranges: [
        {
          label: 'Omaha studio / 1BR',
          value: '$450–$2,000+',
          note: 'Access and season dominate',
        },
        {
          label: 'Suburban 2–3BR house',
          value: '$1,500–$4,500+',
          note: 'HOAs common',
        },
        {
          label: 'Intrastate mid-size (e.g. Omaha ↔ Lincoln)',
          value: '$1,500–$4,800+',
          note: 'Season matters',
        },
        {
          label: 'Intrastate long (e.g. Omaha ↔ Scottsbluff)',
          value: '$2,200–$7,000+',
          note: 'I-80 distance drives hours',
        },
        {
          label: 'Typical 2–3 person crew (Omaha / Lincoln)',
          value: '$110–$200+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'Winter ice and snow can force reschedules statewide.',
        'Omaha multi-unit buildings add stair and elevator time.',
        'Panhandle jobs include long empty miles.',
        'College towns compress August demand in Lincoln.',
        'Short hops into IA, KS, MO, SD, CO, or WY are interstate even when nearby.',
      ],
    },
    routes: {
      title: 'Popular Nebraska moving routes',
      intro:
        'Nebraska sits on I-80 between Midwest and Mountain West corridors with strong Omaha–Lincoln internal traffic and short interstate hops into Iowa, Kansas, and Colorado. Interstate jobs need FMCSA authority; in-state corridors need PSC-licensed movers.',
      migrationProfile: 'outbound_dominant',
      outbound: [
        {
          label: 'Nebraska → Colorado / Arizona',
          href: '/local-movers/colorado',
          origins: 'Omaha, Lincoln, Panhandle',
          transit: 'I-80 multi-day',
          planningNote: 'Confirm FMCSA authority end-to-end.',
          note: 'Popular Mountain West outbound corridors.',
        },
        {
          label: 'Nebraska → Texas / Florida',
          href: '/local-movers/texas',
          origins: 'Omaha, Lincoln',
          transit: 'Multi-day interstate',
          planningNote: 'Book early for seasonal peaks.',
          note: 'Common lifestyle outbound destinations.',
        },
        {
          label: 'Nebraska → Iowa / Kansas',
          href: '/local-movers/iowa',
          origins: 'Omaha metro, Southeast NE',
          transit: 'Often same-day interstate',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Short cross-border metro moves are common.',
        },
      ],
      inbound: [
        {
          label: 'Moving to Douglas County (Omaha)',
          href: '/local-movers/nebraska/douglas',
          note: 'Multi-unit access and dense urban staging.',
        },
        {
          label: 'Moving to Lancaster County (Lincoln)',
          href: '/local-movers/nebraska/lancaster',
          note: 'Capital and campus logistics.',
        },
        {
          label: 'Moving to Sarpy County',
          href: '/local-movers/nebraska/sarpy',
          note: 'Omaha south-metro suburbs and HOAs.',
        },
      ],
    },
    challenges: {
      title: 'Nebraska-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real Nebraska moves — not generic national checklist filler.',
      items: [
        {
          title: 'Winter plains weather',
          detail:
            'Ice, wind, and snow can shut down driveway access. Build weather buffers November–March.',
        },
        {
          title: 'Omaha border hops into Iowa',
          detail:
            'Council Bluffs–adjacent jobs are interstate even if short. Confirm FMCSA authority before deposits.',
        },
        {
          title: 'Panhandle distance',
          detail:
            'Scottsbluff and far-west jobs create long empty miles. Confirm coverage and overnight plans early.',
        },
        {
          title: 'Lincoln campus peaks',
          detail:
            'Late August demand spikes around student turnovers. Book earlier than a typical civilian calendar.',
        },
        {
          title: 'PSC license verification',
          detail:
            'Confirm the exact legal name holds a current Nebraska PSC household goods mover license before deposits on pure in-state work.',
        },
      ],
    },
    tools: SHARED_TOOLS('Nebraska'),
    faq: [
      {
        question: 'Do Nebraska movers need a PSC license?',
        answer:
          'Yes. Household goods movers must be granted a License by the Nebraska Public Service Commission before transporting household goods in the state. Interstate moves require FMCSA authority.',
      },
      {
        question: 'How do I verify a Nebraska mover?',
        answer:
          'Check PSC household goods movers licensee resources for the legal name on your estimate. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER.',
      },
      {
        question: 'How much does a local Omaha move cost?',
        answer:
          'Planning ranges often fall around $450–$2,000+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates.',
      },
      {
        question: 'Is an Omaha-to-Lincoln move intrastate?',
        answer:
          'Yes — both ends are in Nebraska, so you generally need a PSC-licensed household goods mover.',
      },
      {
        question: 'When is peak moving season in Nebraska?',
        answer:
          'Statewide peak is typically May–September. Winter weather can force flexible dates even outside peak.',
      },
      {
        question: 'Does an Omaha-to-Council Bluffs move need FMCSA authority?',
        answer:
          'Yes. Crossing into Iowa is interstate even for short hops. Confirm active FMCSA operating authority.',
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
          label: 'NE PSC — Household goods movers licensees',
          href: 'https://psc.nebraska.gov/household-goods-movers-licensees',
        },
        {
          label: 'NE PSC — Transportation',
          href: 'https://psc.nebraska.gov/transportation',
        },
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  },

  idaho: {
    stateSlug: 'idaho',
    stateCode: 'ID',
    h1: `Idaho Moving Resource Hub: Costs, ITD Registration & ${idCount} County Guides`,
    metaTitle: `Idaho Movers Guide 2026 — Costs, ITD Registration & ${idCount} County Guides`,
    metaDescription:
      'Plan a move within, to, or from Idaho. Compare local and intrastate costs, understand Idaho Transportation Department registration expectations, browse 44 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for Idaho moves in 2026 — typical costs, ITD vs FMCSA rules, Boise-to-Coeur d’Alene regional guides, and tools to compare registered movers without paid placements.',
    trustBar: [
      `${idCount} County Guides`,
      'Verified Movers',
      'ITD & FMCSA Checked',
      'Updated 2026',
    ],
    intents: intents('Idaho'),
    primaryCta: {
      label: 'Calculate My Idaho Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in Idaho is different',
      paragraphs: [
        'Idaho is not one moving market. Boise multi-unit and HOA growth corridors, Coeur d’Alene lake-country access, Idaho Falls industrial logistics, Magic Valley agricultural towns, and mountain-pass weather produce different labor profiles under one state name.',
        'Idaho does not operate a California-style dedicated household-goods consumer permit board. Intrastate movers are generally expected to register with the Idaho Transportation Department and maintain appropriate commercial credentials; interstate jobs need FMCSA authority. Winter passes, wildfire season, and long empty miles between north and south are planning inputs — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'Idaho moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical Idaho local and intrastate patterns; they are not bids. Always compare written estimates and confirm FMCSA authority for any out-of-state leg.',
      stats: [
        {
          label: 'Typical Boise studio / 1BR',
          value: '$500–$2,200+',
          note: 'Elevators, HOAs, and season matter',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$1,700–$5,200+',
          note: 'Treasure Valley HOAs common',
        },
        {
          label: 'Intrastate corridor (e.g. Boise ↔ Coeur d’Alene)',
          value: '$2,200–$7,500+',
          note: 'Long north–south haul; weather matters',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'Winter passes force flexible dates',
        },
        {
          label: 'Top inbound origins',
          value: 'CA · WA · OR · TX · AZ · UT',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: String(idCount),
          note: 'Treasure Valley emphasized',
        },
      ],
    },
    regulations: {
      mode: 'partial_state_regulation',
      title: 'Idaho moving regulations & consumer protection',
      intro:
        'Idaho generally requires intrastate movers to register with the Idaho Transportation Department rather than issuing a dedicated household-goods consumer permit comparable to Nebraska PSC or Oregon ODOT. Interstate work still requires FMCSA authority. Verify insurance and credentials carefully before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside Idaho)',
        body: 'If origin or destination is outside Idaho, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. Idaho registration alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within Idaho)',
        body: 'Industry and consumer guidance commonly states in-state movers should be registered with the Idaho Transportation Department and carry appropriate commercial insurance. Idaho does not publish a California-style dedicated HHG consumer license directory. Insist on written estimates, insurance certificates, and a clear legal business name for pure in-state jobs.',
      },
      verifySteps: [
        'Classify the job: entirely in Idaho vs any out-of-state leg (FMCSA / USDOT required).',
        'Copy the exact legal name from the written estimate.',
        'Interstate: look up USDOT / MC on FMCSA SAFER before deposits.',
        'Intrastate: request proof of ITD-related commercial registration, insurance certificates, and written inventory estimates.',
        'Confirm mountain-pass and HOA access constraints for your addresses.',
        'Avoid large cash deposits to unverified operators.',
      ],
      protections: [
        {
          title: 'ITD registration expectations',
          detail:
            'Consumer guidance commonly requires Idaho intrastate movers to register with the Idaho Transportation Department to operate legally within the state.',
        },
        {
          title: 'FMCSA for interstate moves',
          detail:
            'Any move that crosses a state line is generally under federal household goods rules — verify active FMCSA authority on SAFER.',
        },
        {
          title: 'Written estimates and insurance',
          detail:
            'Without a strong state HHG permit lookup, written estimates and cargo/liability insurance certificates are your primary consumer controls on local jobs.',
        },
      ],
      officialLinks: [
        {
          label: 'Idaho Transportation Department',
          href: 'https://www.itd.idaho.gov/',
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
        'Regulatory frameworks can change. Always verify current commercial credentials and FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('idaho', [
      {
        key: 'treasure-valley',
        id: 'treasure-valley',
        name: 'Treasure Valley',
        shortName: 'Treasure Valley',
        blurb:
          'Ada, Canyon, and neighbors with multi-unit access, HOA suburbs, and I-84 logistics.',
        challenges: [
          'HOA windows in Boise growth corridors',
          'Summer heat and winter inversions',
        ],
        ctaLabel: 'Explore Treasure Valley',
      },
      {
        key: 'eastern-id',
        id: 'eastern-id',
        name: 'Eastern Idaho',
        shortName: 'Eastern ID',
        blurb:
          'Idaho Falls, Pocatello, and eastern counties with industrial corridors and mountain approaches.',
        challenges: [
          'Winter weather and pass timing',
          'Industrial shift and plant peaks',
        ],
        ctaLabel: 'Explore Eastern Idaho',
      },
      {
        key: 'magic-valley',
        id: 'magic-valley',
        name: 'Magic Valley',
        shortName: 'Magic Valley',
        blurb:
          'Twin Falls and south-central agricultural counties with longer rural approaches.',
        challenges: [
          'Confirm coverage for rural addresses',
          'Wind and winter weather',
        ],
        ctaLabel: 'Explore Magic Valley',
      },
      {
        key: 'north-id',
        id: 'north-id',
        name: 'North Idaho',
        shortName: 'North Idaho',
        blurb:
          'Coeur d’Alene, Sandpoint, and panhandle counties with lake access and Washington-border hops.',
        challenges: [
          'Short WA hops need FMCSA authority',
          'Lake-road and winter access',
        ],
        ctaLabel: 'Explore North Idaho',
      },
      {
        key: 'central-mountain',
        id: 'central-mountain',
        name: 'Central Mountain Idaho',
        shortName: 'Central Mountain',
        blurb:
          'Custer and Lemhi high-country counties with thin coverage and long hauls.',
        challenges: [
          'Confirm mover coverage early',
          'Mountain weather windows',
        ],
        ctaLabel: 'Explore Central Mountain',
      },
    ]),
    costs: {
      title: 'Idaho moving costs',
      intro:
        'Idaho pricing reflects Boise labor markets, mountain weather, HOAs, and long north–south hauls. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate Idaho moving costs',
        lastReviewed: '2026-07-23',
        body: 'These ranges are planning estimates, not quotes. They combine typical Idaho local and intrastate patterns: home size, distance, stairs/elevators, parking, HOAs, mountain weather, and regional labor. Actual bids vary. Always compare written estimates and confirm FMCSA authority for any out-of-state leg.',
      },
      ranges: [
        {
          label: 'Boise studio / 1BR',
          value: '$500–$2,200+',
          note: 'Access and HOAs dominate',
        },
        {
          label: 'Suburban 2–3BR house',
          value: '$1,700–$5,000+',
          note: 'Treasure Valley HOAs common',
        },
        {
          label: 'Intrastate mid-size (e.g. Boise ↔ Twin Falls)',
          value: '$1,700–$5,200+',
          note: 'Season matters',
        },
        {
          label: 'Intrastate long (e.g. Boise ↔ Coeur d’Alene)',
          value: '$2,400–$8,000+',
          note: 'North–south distance and weather',
        },
        {
          label: 'Typical 2–3 person crew (Boise metro)',
          value: '$125–$230+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'Mountain passes can close or slow trucks in winter.',
        'Treasure Valley HOAs restrict elevator and loading windows.',
        'North–south hauls create long empty miles.',
        'Wildfire-season air quality can delay summer jobs.',
        'Short hops into WA, OR, MT, NV, UT, or WY are interstate even when nearby.',
      ],
    },
    routes: {
      title: 'Popular Idaho moving routes',
      intro:
        'Idaho is a major Mountain West inbound destination with strong California and Washington origins and large Boise–north Idaho internal flows. Interstate jobs need FMCSA authority; local jobs need careful insurance and registration verification.',
      migrationProfile: 'inbound_dominant',
      outbound: [
        {
          label: 'Idaho → Washington / Oregon',
          href: '/local-movers/washington',
          origins: 'North Idaho, Treasure Valley',
          transit: 'Often same-day or next-day interstate',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Common short regional hops.',
        },
        {
          label: 'Idaho → California / Arizona',
          href: '/local-movers/california',
          origins: 'Boise metro',
          transit: 'Multi-day interstate',
          planningNote: 'Confirm FMCSA authority end-to-end.',
          note: 'Bi-directional West traffic is common.',
        },
        {
          label: 'Idaho → Utah / Montana',
          href: '/local-movers/utah',
          origins: 'Eastern ID, Treasure Valley',
          transit: 'Mountain multi-day or short interstate',
          planningNote: 'Weather windows matter.',
          note: 'Popular Mountain West corridors.',
        },
      ],
      inbound: [
        {
          label: 'California → Idaho',
          href: '/local-movers/idaho/ada',
          origins: 'Bay Area, LA, San Diego',
          transit: 'Multi-day',
          planningNote: 'High-volume inbound into Treasure Valley.',
          note: 'Confirm interstate FMCSA authority.',
        },
        {
          label: 'Moving to Ada County (Boise)',
          href: '/local-movers/idaho/ada',
          note: 'Growth suburbs, multi-unit access, and HOAs.',
        },
        {
          label: 'Moving to Kootenai County',
          href: '/local-movers/idaho/kootenai',
          note: 'Lake-country access and WA-border patterns.',
        },
      ],
    },
    challenges: {
      title: 'Idaho-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real Idaho moves — not generic national checklist filler.',
      items: [
        {
          title: 'Mountain pass weather',
          detail:
            'North–south and eastbound routes can close or slow trucks. Build weather buffers November–March.',
        },
        {
          title: 'Treasure Valley HOAs',
          detail:
            'Boise-area communities often restrict elevator and loading hours. Get rules in writing before booking.',
        },
        {
          title: 'Partial state HHG framework',
          detail:
            'Without a dedicated consumer HHG license lookup, demand insurance certificates, written estimates, and FMCSA checks for any border hop.',
        },
        {
          title: 'North Idaho border hops',
          detail:
            'Moves into Washington are interstate even if short. Confirm FMCSA authority before deposits.',
        },
        {
          title: 'Wildfire-season air quality',
          detail:
            'Summer smoke can delay outdoor work. Keep a backup date for July–September jobs.',
        },
      ],
    },
    tools: SHARED_TOOLS('Idaho'),
    faq: [
      {
        question: 'Do Idaho movers need a special household goods license?',
        answer:
          'Idaho generally expects intrastate movers to register with the Idaho Transportation Department rather than issuing a dedicated household-goods consumer permit like some states. Interstate moves require FMCSA authority.',
      },
      {
        question: 'How do I verify an Idaho mover?',
        answer:
          'Request proof of commercial registration and insurance for the legal name on your estimate. For out-of-state legs, verify USDOT / MC on FMCSA SAFER.',
      },
      {
        question: 'How much does a local Boise move cost?',
        answer:
          'Planning ranges often fall around $500–$2,200+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates.',
      },
      {
        question: 'Is a Boise-to-Coeur d’Alene move intrastate?',
        answer:
          'Yes — both ends are in Idaho. Focus on insurance, written estimates, and weather logistics for the long haul.',
      },
      {
        question: 'When is peak moving season in Idaho?',
        answer:
          'Statewide peak is typically May–September. Winter passes can force flexible dates even outside peak.',
      },
      {
        question: 'Does a Coeur d’Alene-to-Spokane move need FMCSA authority?',
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
          label: 'Idaho Transportation Department',
          href: 'https://www.itd.idaho.gov/',
        },
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

  'west-virginia': {
    stateSlug: 'west-virginia',
    stateCode: 'WV',
    h1: `West Virginia Moving Resource Hub: Costs, PSC Authority & ${wvCount} County Guides`,
    metaTitle: `West Virginia Movers Guide 2026 — Costs, PSC Certificates & ${wvCount} County Guides`,
    metaDescription:
      'Plan a move within, to, or from West Virginia. Compare local and intrastate costs, understand WV Public Service Commission motor carrier certificates for household goods, browse 55 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for West Virginia moves in 2026 — typical costs, PSC vs FMCSA rules, Charleston-to-Eastern Panhandle regional guides, and tools to compare authorized movers without paid placements.',
    trustBar: [
      `${wvCount} County Guides`,
      'Verified Movers',
      'WV PSC & FMCSA Checked',
      'Updated 2026',
    ],
    intents: intents('West Virginia'),
    primaryCta: {
      label: 'Calculate My West Virginia Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in West Virginia is different',
      paragraphs: [
        'West Virginia is not one moving market. Charleston valley logistics, Eastern Panhandle DC-adjacent growth, Morgantown campus peaks, Northern Panhandle Ohio River stock, and southern coalfield mountain access produce different labor profiles under one state name.',
        'Household goods common carriers generally need Certificate of Convenience and Necessity authority through the Public Service Commission of West Virginia Motor Carrier Section. Interstate jobs need FMCSA authority. Steep driveways, narrow mountain roads, and winter ice are planning inputs — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'West Virginia moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical West Virginia local and intrastate patterns; they are not bids. Always compare written estimates from PSC-authorized movers for in-state work and FMCSA-authorized carriers for interstate work.',
      stats: [
        {
          label: 'Typical Charleston / Morgantown studio / 1BR',
          value: '$400–$1,900+',
          note: 'Stairs and hill access matter',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$1,400–$4,500+',
          note: 'Hills and long drives common',
        },
        {
          label: 'Intrastate corridor (e.g. Charleston ↔ Morgantown)',
          value: '$1,600–$5,200+',
          note: 'Mountain roads and season matter',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'Winter ice forces flexible dates',
        },
        {
          label: 'Top outbound destinations',
          value: 'OH · VA · NC · FL · PA · KY',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: String(wvCount),
          note: 'Kanawha Valley and Panhandles emphasized',
        },
      ],
    },
    regulations: {
      mode: 'strong_state_regulator',
      title: 'West Virginia moving regulations & consumer protection',
      intro:
        'West Virginia generally requires common carriers of household goods to obtain Certificate of Convenience and Necessity authority through the Public Service Commission Motor Carrier Section. Match authority to the job before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside West Virginia)',
        body: 'If origin or destination is outside West Virginia, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. A WV PSC household goods certificate alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within West Virginia)',
        body: 'PSC Motor Carrier dockets and certificates authorize transportation of household goods between points in West Virginia. Applicants file for Certificate of Convenience and Necessity authority with the Motor Carrier Section. Consumers should confirm active certificate status and get written estimates before hiring.',
      },
      verifySteps: [
        'Classify the job: entirely in West Virginia (PSC certificate) vs any out-of-state leg (FMCSA / USDOT).',
        'Copy the exact legal name from the written estimate.',
        'Intrastate: confirm PSC Motor Carrier household goods certificate authority for the company.',
        'Interstate: look up USDOT / MC on FMCSA SAFER.',
        'Get written estimates and share photos of steep or narrow access early.',
        'Avoid large cash deposits to unverified operators.',
      ],
      protections: [
        {
          title: 'PSC certificate of convenience and necessity',
          detail:
            'West Virginia PSC Motor Carrier frameworks authorize common carriers of household goods through certificate processes administered by the Commission.',
        },
        {
          title: 'Motor Carrier Section applications',
          detail:
            'Applicants complete Certificate of Convenience and Necessity applications with the Motor Carrier Section for regulated for-hire operations.',
        },
        {
          title: 'Written estimates',
          detail:
            'Insist on written estimates and clarity on hills, long carries, stairs, and packing before signing.',
        },
      ],
      officialLinks: [
        {
          label: 'Public Service Commission of West Virginia',
          href: 'http://www.psc.state.wv.us/',
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
        'Licensing rules and docket tools can change. Always verify current PSC certificate status or FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('west-virginia', [
      {
        key: 'northern-panhandle',
        id: 'northern-panhandle',
        name: 'Northern Panhandle',
        shortName: 'Northern Panhandle',
        blurb:
          'Wheeling and Ohio River counties with industrial stock and short OH/PA hops.',
        challenges: [
          'Short OH/PA hops need FMCSA authority',
          'Older multi-story stock and hills',
        ],
        ctaLabel: 'Explore Northern Panhandle',
      },
      {
        key: 'eastern-panhandle',
        id: 'eastern-panhandle',
        name: 'Eastern Panhandle',
        shortName: 'Eastern Panhandle',
        blurb:
          'Martinsburg, Charles Town, and eastern growth corridors with DC-adjacent patterns.',
        challenges: [
          'Growth-suburb HOA calendars',
          'I-81 corridor congestion',
        ],
        ctaLabel: 'Explore Eastern Panhandle',
      },
      {
        key: 'north-central',
        id: 'north-central',
        name: 'North-Central West Virginia',
        shortName: 'North-Central',
        blurb:
          'Morgantown campus peaks, Clarksburg, and north-central mountain counties.',
        challenges: [
          'Campus lease-cycle peaks',
          'Hill driveways and winter ice',
        ],
        ctaLabel: 'Explore North-Central',
      },
      {
        key: 'kanawha-valley',
        id: 'kanawha-valley',
        name: 'Kanawha Valley & Mid-Ohio Valley',
        shortName: 'Kanawha / Mid-Ohio',
        blurb:
          'Charleston, Huntington, Parkersburg approaches with river valleys and mixed suburbs.',
        challenges: [
          'Valley fog and winter ice',
          'River-city staging constraints',
        ],
        ctaLabel: 'Explore Kanawha / Mid-Ohio Valley',
      },
      {
        key: 'southern-wv',
        id: 'southern-wv',
        name: 'Southern West Virginia',
        shortName: 'Southern WV',
        blurb:
          'Beckley, Bluefield, and southern mountain counties with steep access and longer hauls.',
        challenges: [
          'Steep mountain driveways',
          'Confirm mover coverage for remote addresses',
        ],
        ctaLabel: 'Explore Southern West Virginia',
      },
    ]),
    costs: {
      title: 'West Virginia moving costs',
      intro:
        'West Virginia pricing reflects mountain access, hills, thinner rural coverage, and river-valley logistics. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate West Virginia moving costs',
        lastReviewed: '2026-07-23',
        body: 'These ranges are planning estimates, not quotes. They combine typical West Virginia local and intrastate patterns: home size, distance, hills, stairs, parking, winter weather, and regional labor. Actual bids vary. Always compare written estimates from PSC-authorized movers for in-state work and FMCSA-authorized carriers for interstate work.',
      },
      ranges: [
        {
          label: 'Charleston / Morgantown studio / 1BR',
          value: '$400–$1,900+',
          note: 'Stairs and hills dominate',
        },
        {
          label: 'Suburban 2–3BR house',
          value: '$1,400–$4,200+',
          note: 'Long driveways common',
        },
        {
          label: 'Intrastate mid-size (e.g. Charleston ↔ Huntington)',
          value: '$1,500–$4,800+',
          note: 'Season matters',
        },
        {
          label: 'Intrastate long (e.g. Martinsburg ↔ Huntington)',
          value: '$2,000–$6,500+',
          note: 'Mountain roads push hours',
        },
        {
          label: 'Typical 2–3 person crew (major markets)',
          value: '$100–$190+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'Steep driveways may require smaller trucks or shuttle strategies.',
        'Winter ice on mountain roads forces flexible dates.',
        'Rural southern and mountain counties have thinner mover density.',
        'Eastern Panhandle growth creates HOA and inbound pressure.',
        'Short hops into OH, VA, PA, KY, or MD are interstate even when nearby.',
      ],
    },
    routes: {
      title: 'Popular West Virginia moving routes',
      intro:
        'West Virginia sits between Midwest and Mid-Atlantic corridors with strong Eastern Panhandle growth and short interstate hops into Ohio, Virginia, and Pennsylvania. Interstate jobs need FMCSA authority; in-state corridors need PSC-authorized movers.',
      migrationProfile: 'outbound_dominant',
      outbound: [
        {
          label: 'West Virginia → Carolinas / Florida',
          href: '/local-movers/north-carolina',
          origins: 'Eastern Panhandle, Kanawha Valley',
          transit: 'I-81 / I-77 multi-day',
          planningNote: 'Confirm FMCSA authority end-to-end.',
          note: 'Popular lifestyle outbound corridors.',
        },
        {
          label: 'West Virginia → Ohio / Pennsylvania / Virginia',
          href: '/local-movers/ohio',
          origins: 'Northern and Eastern Panhandles',
          transit: 'Often same-day interstate',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Short cross-border metro moves are common.',
        },
        {
          label: 'West Virginia → Kentucky / Tennessee',
          href: '/local-movers/kentucky',
          origins: 'Southern and western WV',
          transit: 'Mountain multi-day or next-day',
          planningNote: 'Weather windows matter.',
          note: 'Common job-driven regional hops.',
        },
      ],
      inbound: [
        {
          label: 'Moving to Kanawha County (Charleston)',
          href: '/local-movers/west-virginia/kanawha',
          note: 'Valley logistics and mixed multi-story stock.',
        },
        {
          label: 'Moving to Berkeley County',
          href: '/local-movers/west-virginia/berkeley',
          note: 'Eastern Panhandle growth corridors.',
        },
        {
          label: 'Moving to Monongalia County (Morgantown)',
          href: '/local-movers/west-virginia/monongalia',
          note: 'Campus peaks and hill access.',
        },
      ],
    },
    challenges: {
      title: 'West Virginia-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real West Virginia moves — not generic national checklist filler.',
      items: [
        {
          title: 'Steep driveways and mountain roads',
          detail:
            'Many homes need smaller trucks or shuttle strategies. Share GPS pins and approach photos early.',
        },
        {
          title: 'Winter ice',
          detail:
            'Mountain routes can ice over for days. Build weather buffers November–March.',
        },
        {
          title: 'Short interstate panhandle hops',
          detail:
            'Jobs into Ohio, Pennsylvania, Maryland, or Virginia are interstate even if short. Confirm FMCSA authority before deposits.',
        },
        {
          title: 'Rural coverage gaps',
          detail:
            'Southern and mountain counties may have thinner mover density. Confirm coverage early.',
        },
        {
          title: 'PSC certificate verification',
          detail:
            'Confirm the exact legal name holds WV PSC household goods certificate authority before deposits on pure in-state work.',
        },
      ],
    },
    tools: SHARED_TOOLS('West Virginia'),
    faq: [
      {
        question: 'Do West Virginia movers need a PSC certificate?',
        answer:
          'Yes. Common carriers of household goods generally need Certificate of Convenience and Necessity authority through the Public Service Commission Motor Carrier Section. Interstate moves require FMCSA authority.',
      },
      {
        question: 'How do I verify a West Virginia mover?',
        answer:
          'Confirm PSC Motor Carrier household goods certificate status for the legal name on your estimate. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER.',
      },
      {
        question: 'How much does a local Charleston or Morgantown move cost?',
        answer:
          'Planning ranges often fall around $400–$1,900+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates.',
      },
      {
        question: 'Is a Charleston-to-Morgantown move intrastate?',
        answer:
          'Yes — both ends are in West Virginia, so you generally need a PSC-authorized household goods carrier.',
      },
      {
        question: 'When is peak moving season in West Virginia?',
        answer:
          'Statewide peak is typically May–September. Winter ice can force flexible dates even outside peak.',
      },
      {
        question: 'Does a Weirton-to-Steubenville move need FMCSA authority?',
        answer:
          'Yes. Crossing into Ohio is interstate even for short hops. Confirm active FMCSA operating authority.',
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
          label: 'Public Service Commission of West Virginia',
          href: 'http://www.psc.state.wv.us/',
        },
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  },

  hawaii: {
    stateSlug: 'hawaii',
    stateCode: 'HI',
    h1: `Hawaii Moving Resource Hub: Costs, PUC Motor Carrier Certificates & ${hiCount} County Guides`,
    metaTitle: `Hawaii Movers Guide 2026 — Costs, PUC Certificates & ${hiCount} Island County Guides`,
    metaDescription:
      'Plan a move within, to, or from Hawaii. Compare inter-island and local costs, verify Hawaii PUC household goods motor carrier certificates, browse 5 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for Hawaii moves in 2026 — typical costs, PUC vs FMCSA rules, Oahu-to-Neighbor Island guides, and tools to compare certificated movers without paid placements.',
    trustBar: [
      `${hiCount} County Guides`,
      'Verified Movers',
      'HI PUC & FMCSA Checked',
      'Updated 2026',
    ],
    intents: intents('Hawaii'),
    primaryCta: {
      label: 'Calculate My Hawaii Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Islands & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in Hawaii is different',
      paragraphs: [
        'Hawaii is not one moving market. Honolulu high-rises and tight streets, Maui tourism congestion, Hawaii Island long rural drives, Kauai access constraints, and inter-island barge/air logistics produce different labor profiles under one state name — with only five counties mapping to the major islands.',
        'Companies moving household goods within Hawaii must hold a Hawaii Public Utilities Commission Motor Carrier Certificate of Public Convenience and Necessity for the household goods classification. Interstate (mainland) jobs need FMCSA authority. Humidity, trade-wind rain, military cycles, and pier/air schedules are planning inputs — then open the island and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'Hawaii moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical Hawaii local and inter-island patterns; they are not bids. Always compare written estimates from PUC-certificated movers for in-state work and FMCSA-authorized carriers for mainland work.',
      stats: [
        {
          label: 'Typical Honolulu studio / 1BR',
          value: '$700–$3,200+',
          note: 'Elevators, stairs, and parking dominate',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$2,200–$7,500+',
          note: 'Access and humidity matter',
        },
        {
          label: 'Inter-island mid-size',
          value: '$2,500–$9,000+',
          note: 'Barge/air and packing drive the spread',
        },
        {
          label: 'Peak season',
          value: 'May–September + winter holidays',
          note: 'Tourism and military cycles also peak',
        },
        {
          label: 'Top mainland origins',
          value: 'CA · WA · TX · AZ · NV',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: String(hiCount),
          note: 'Oahu emphasized',
        },
      ],
    },
    regulations: {
      mode: 'strong_state_regulator',
      title: 'Hawaii moving regulations & consumer protection',
      intro:
        'Hawaii requires for-hire household goods motor carriers operating within the state to hold a Public Utilities Commission Motor Carrier Certificate of Public Convenience and Necessity covering the household goods classification. Match the certificate to the job before you pay a deposit.',
      interstate: {
        title: 'Interstate (mainland or outside Hawaii)',
        body: 'If origin or destination is outside Hawaii, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. A Hawaii PUC motor carrier certificate alone does not authorize mainland interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within Hawaii, including inter-island)',
        body: 'The Hawaii PUC regulates property motor carriers, including household goods classifications, through certification/licensing, ratemaking, and business regulation. Carriers need appropriate CPCN authority for the islands and commodity classes they serve. Consumers should confirm the PUC certificate and get written estimates before hiring.',
      },
      verifySteps: [
        'Classify the job: entirely in Hawaii / inter-island (PUC motor carrier) vs mainland leg (FMCSA / USDOT).',
        'Copy the exact legal name and PUC number from the written estimate.',
        'Intrastate: confirm Hawaii PUC household goods motor carrier certificate for the islands served.',
        'Mainland: look up USDOT / MC on FMCSA SAFER.',
        'Ask about barge/air schedules, container packing, and humidity-sensitive items early.',
        'Avoid large cash deposits to unverified operators.',
      ],
      protections: [
        {
          title: 'PUC motor carrier CPCN',
          detail:
            'Hawaii PUC regulates passenger and property motor carriers, including household goods classifications, through certification and licensing.',
        },
        {
          title: 'Ratemaking and business regulation',
          detail:
            'The Commission’s motor carrier functions include certification/licensing, ratemaking, and business regulation for regulated carriers.',
        },
        {
          title: 'Written estimates',
          detail:
            'Insist on written estimates covering stairs, elevators, long carries, packing, and any inter-island freight components before signing.',
        },
      ],
      officialLinks: [
        {
          label: 'Hawaii PUC — Motor carriers',
          href: 'https://puc.hawaii.gov/motor_carriers/',
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
        'Licensing rules and certificate directories can change. Always verify current PUC motor carrier status or FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    // Natural island groups (5 counties → flat_county_list display under TEMPLATE_RULES)
    regions: regionObjects('hawaii', [
      {
        key: 'oahu',
        id: 'oahu',
        name: 'Oahu (Honolulu County)',
        shortName: 'Oahu',
        blurb:
          'Honolulu high-rises, military housing, and dense street logistics across Oahu.',
        challenges: [
          'Elevators, tight streets, and parking',
          'Military and tourism peaks',
        ],
        ctaLabel: 'Explore Oahu',
      },
      {
        key: 'maui-county',
        id: 'maui-county',
        name: 'Maui County',
        shortName: 'Maui County',
        blurb:
          'Maui, Molokai, and Lanai approaches with tourism congestion and inter-island logistics.',
        challenges: [
          'Tourism-season road congestion',
          'Confirm inter-island packing plans',
        ],
        ctaLabel: 'Explore Maui County',
      },
      {
        key: 'hawaii-island',
        id: 'hawaii-island',
        name: 'Hawaii Island (Big Island)',
        shortName: 'Hawaii Island',
        blurb:
          'Hilo–Kona long drives, lava-zone access questions, and rural approaches.',
        challenges: [
          'Long portal-to-portal distances on-island',
          'Confirm rural driveway access',
        ],
        ctaLabel: 'Explore Hawaii Island',
      },
      {
        key: 'kauai',
        id: 'kauai',
        name: 'Kauai',
        shortName: 'Kauai',
        blurb:
          'Garden Island access with thinner local fleets and weather exposure.',
        challenges: [
          'Confirm mover coverage early',
          'Rain and narrow road access',
        ],
        ctaLabel: 'Explore Kauai',
      },
    ]),
    costs: {
      title: 'Hawaii moving costs',
      intro:
        'Hawaii pricing reflects Honolulu labor markets, elevator buildings, humidity packing, and inter-island freight components. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate Hawaii moving costs',
        lastReviewed: '2026-07-23',
        body: 'These ranges are planning estimates, not quotes. They combine typical Hawaii local and inter-island patterns: home size, elevators, parking, packing for humidity, barge/air components, and regional labor. Actual bids vary under PUC frameworks. Always compare written estimates from PUC-certificated movers for in-state work and FMCSA-authorized carriers for mainland work.',
      },
      ranges: [
        {
          label: 'Honolulu studio / 1BR',
          value: '$700–$3,200+',
          note: 'Elevators and parking dominate',
        },
        {
          label: 'Suburban 2–3BR house',
          value: '$2,000–$6,500+',
          note: 'Access and packing matter',
        },
        {
          label: 'Inter-island mid-size',
          value: '$2,500–$9,000+',
          note: 'Barge/air schedules drive timing',
        },
        {
          label: 'Mainland long-distance (planning band)',
          value: 'Highly variable',
          note: 'Confirm FMCSA authority; ocean transit time',
        },
        {
          label: 'Typical 2–3 person crew (Oahu)',
          value: '$150–$280+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'High-rise elevators and tight Honolulu streets add labor time.',
        'Inter-island moves add barge/air and container packing costs.',
        'Humidity-sensitive packing is often required.',
        'Military and tourism seasons compress available crews.',
        'Mainland moves are interstate and need FMCSA authority.',
      ],
    },
    routes: {
      title: 'Popular Hawaii moving routes',
      intro:
        'Hawaii sees strong mainland inbound flows (especially California), constant inter-island traffic, and dense Oahu internal moves. Mainland jobs need FMCSA authority; in-state and inter-island jobs need PUC-certificated household goods motor carriers.',
      migrationProfile: 'inbound_dominant',
      outbound: [
        {
          label: 'Hawaii → California / Mainland',
          href: '/local-movers/california',
          origins: 'Oahu, Maui, Hawaii Island',
          transit: 'Ocean + multi-day inland',
          planningNote: 'Confirm FMCSA authority; plan long transit times.',
          note: 'Primary mainland outbound corridor.',
        },
        {
          label: 'Inter-island (e.g. Oahu → Maui or Hawaii Island)',
          href: '/local-movers/hawaii/maui',
          origins: 'Statewide',
          transit: 'Barge/air schedules',
          planningNote: 'Still intrastate — confirm PUC certificate.',
          note: 'Common island-to-island household goods moves.',
        },
      ],
      inbound: [
        {
          label: 'Mainland → Hawaii',
          href: '/local-movers/hawaii/honolulu',
          origins: 'CA, WA, TX, AZ',
          transit: 'Ocean + local delivery',
          planningNote: 'High-volume inbound into Oahu.',
          note: 'Confirm interstate FMCSA authority.',
        },
        {
          label: 'Moving to Honolulu County (Oahu)',
          href: '/local-movers/hawaii/honolulu',
          note: 'High-rises, elevators, and tight street staging.',
        },
        {
          label: 'Moving to Maui County',
          href: '/local-movers/hawaii/maui',
          note: 'Tourism congestion and inter-island logistics.',
        },
      ],
    },
    challenges: {
      title: 'Hawaii-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real Hawaii moves — not generic national checklist filler.',
      items: [
        {
          title: 'Honolulu high-rise access',
          detail:
            'Elevator reservations, certificates of insurance, and tight loading windows are common. Start paperwork early.',
        },
        {
          title: 'Inter-island barge and air schedules',
          detail:
            'Neighbor Island moves depend on freight calendars. Build extra days into your plan.',
        },
        {
          title: 'Humidity packing',
          detail:
            'Moisture-sensitive items need better packing materials and sealed containers. Discuss packing options early.',
        },
        {
          title: 'Mainland ocean transit',
          detail:
            'Moves to/from the continental U.S. are interstate and take longer than lower-48 truck hauls. Confirm FMCSA authority and transit windows.',
        },
        {
          title: 'PUC certificate verification',
          detail:
            'Confirm the exact legal name holds a Hawaii PUC household goods motor carrier certificate before deposits on pure in-state work.',
        },
      ],
    },
    tools: SHARED_TOOLS('Hawaii'),
    faq: [
      {
        question: 'Do Hawaii movers need a PUC certificate?',
        answer:
          'Yes. For-hire household goods motor carriers operating within Hawaii generally need a Hawaii PUC Motor Carrier Certificate of Public Convenience and Necessity covering household goods. Mainland interstate moves require FMCSA authority.',
      },
      {
        question: 'Is an Oahu-to-Maui move interstate?',
        answer:
          'No — both ends are in Hawaii, so it is intrastate (inter-island). Confirm the mover’s PUC certificate covers the islands and services you need.',
      },
      {
        question: 'How much does a local Honolulu move cost?',
        answer:
          'Planning ranges often fall around $700–$3,200+ for a studio/1BR and more for larger homes, driven by elevators and parking. Use the calculator, then compare written estimates.',
      },
      {
        question: 'Does a California-to-Hawaii move need FMCSA authority?',
        answer:
          'Yes. Mainland-to-Hawaii moves are interstate. Confirm active FMCSA operating authority and a USDOT number.',
      },
      {
        question: 'When is peak moving season in Hawaii?',
        answer:
          'Demand is often high May–September and around winter holidays, with additional military and tourism-related spikes.',
      },
      {
        question: 'Why are inter-island moves more expensive?',
        answer:
          'They often include barge or air freight components, extra packing, and schedule constraints — not just truck labor hours.',
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
          label: 'Hawaii PUC — Motor carriers',
          href: 'https://puc.hawaii.gov/motor_carriers/',
        },
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  },

  alaska: {
    stateSlug: 'alaska',
    stateCode: 'AK',
    h1: `Alaska Moving Resource Hub: Costs, FMCSA Checks & ${akCount} Borough Guides`,
    metaTitle: `Alaska Movers Guide 2026 — Costs, Insurance Checks & ${akCount} Borough Guides`,
    metaDescription:
      'Plan a move within, to, or from Alaska. Compare local and long-haul costs, understand Alaska’s limited state HHG licensing versus FMCSA interstate rules, browse borough guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for Alaska moves in 2026 — typical costs, FMCSA-first verification for Outside/interstate work, Anchorage-to-Southeast regional guides, and tools to compare movers without paid placements.',
    trustBar: [
      `${akCount} Borough Guides`,
      'Verified Movers',
      'FMCSA-Focused Checks',
      'Updated 2026',
    ],
    intents: intents('Alaska'),
    primaryCta: {
      label: 'Calculate My Alaska Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Boroughs', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in Alaska is different',
      paragraphs: [
        'Alaska is not one moving market. Anchorage multi-unit winters, Mat-Su growth, Fairbanks extreme cold, Southeast ferry logistics, and Bush communities with air/barge-only access produce different labor profiles under one state name.',
        'Alaska does not require a special state-issued household-goods permit for pure intrastate movers comparable to many lower-48 states. Businesses still need an Alaska business license; interstate/Outside moves need FMCSA authority. Ferry schedules, freeze-up, and long empty miles are planning inputs — then open the region and borough that match your addresses.',
      ],
    },
    snapshot: {
      title: 'Alaska moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical Alaska local and long-haul patterns; they are not bids. Always compare written estimates and confirm FMCSA authority for Outside/interstate legs.',
      stats: [
        {
          label: 'Typical Anchorage studio / 1BR',
          value: '$600–$2,800+',
          note: 'Winter access and elevators matter',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$2,000–$7,000+',
          note: 'Season and driveway snow matter',
        },
        {
          label: 'Intrastate long (e.g. Anchorage ↔ Fairbanks)',
          value: '$2,500–$9,000+',
          note: 'Distance, weather, and packing drive spread',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'Winter forces flexible dates',
        },
        {
          label: 'Top Outside origins',
          value: 'WA · CA · TX · OR · CO',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'Borough guides',
          value: String(akCount),
          note: 'Southcentral emphasized',
        },
      ],
    },
    regulations: {
      mode: 'limited_or_none',
      title: 'Alaska moving regulations & consumer protection',
      intro:
        'Alaska does not issue a dedicated household-goods carrier license for pure intrastate movers. Consumer protection relies on business licensing, insurance, contracts, Attorney General consumer protection tools, and — for Outside/interstate legs — FMCSA authority. Verify credentials carefully before you pay a deposit.',
      interstate: {
        title: 'Interstate / Outside Alaska',
        body: 'If origin or destination is outside Alaska, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. An Alaska business license alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within Alaska)',
        body: 'Alaska does not maintain a specialized household-goods permit board like many lower-48 states. Moving companies still need a State of Alaska business license and should carry appropriate insurance. Consumers should insist on written estimates, certificates of insurance, and clear legal names. Ferry- and air-dependent communities add logistics complexity beyond licensing.',
      },
      verifySteps: [
        'Classify the job: entirely in Alaska vs any Outside/interstate leg (FMCSA / USDOT required).',
        'Copy the exact legal name from the written estimate.',
        'Outside/interstate: look up USDOT / MC on FMCSA SAFER before deposits.',
        'Intrastate: request Alaska business license details, insurance certificates, and written inventory estimates.',
        'For ferry/air communities, confirm schedule and packing requirements early.',
        'Avoid large cash deposits to unverified operators; document all agreements in writing.',
      ],
      protections: [
        {
          title: 'No dedicated HHG permit board',
          detail:
            'Consumer sources note Alaska does not require a special state-issued household-goods license for pure intrastate movers beyond general business licensing.',
        },
        {
          title: 'Business license and insurance',
          detail:
            'Businesses operating in Alaska need a state business license; consumers should still demand cargo/liability insurance certificates and written contracts.',
        },
        {
          title: 'FMCSA for Outside moves',
          detail:
            'Moves to or from the lower 48 or other states are interstate — verify active FMCSA authority on SAFER.',
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
          label: 'Alaska business licensing (DCCED)',
          href: 'https://www.commerce.alaska.gov/web/cbpl/BusinessLicensing.aspx',
          external: true,
        },
        { label: 'Move Trust Hub — Verify a USDOT', href: '/verify-dot' },
      ],
      disclaimer:
        'Regulatory frameworks can change. Always verify current business credentials and FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('alaska', [
      {
        key: 'anchorage-southcentral',
        id: 'anchorage-southcentral',
        name: 'Anchorage & Southcentral',
        shortName: 'Southcentral',
        blurb:
          'Anchorage, Mat-Su, Kenai, and southcentral communities with multi-unit winters and highway access.',
        challenges: [
          'Winter driveway and ice access',
          'Peak summer construction traffic',
        ],
        ctaLabel: 'Explore Southcentral',
      },
      {
        key: 'interior',
        id: 'interior',
        name: 'Interior Alaska',
        shortName: 'Interior',
        blurb:
          'Fairbanks and Interior communities with extreme cold and long highway hauls.',
        challenges: [
          'Extreme cold labor and equipment limits',
          'Long empty miles from Anchorage',
        ],
        ctaLabel: 'Explore Interior',
      },
      {
        key: 'southeast',
        id: 'southeast',
        name: 'Southeast Alaska',
        shortName: 'Southeast',
        blurb:
          'Juneau, Ketchikan, Sitka, and ferry-dependent communities with marine logistics.',
        challenges: [
          'Ferry schedule constraints',
          'Rain and limited staging areas',
        ],
        ctaLabel: 'Explore Southeast',
      },
      {
        key: 'southwest-bush',
        id: 'southwest-bush',
        name: 'Southwest & Bush Alaska',
        shortName: 'Southwest / Bush',
        blurb:
          'Western, Arctic, and Aleutian communities with air/barge-only access in many places.',
        challenges: [
          'Air/barge-only logistics',
          'Confirm specialized carrier coverage early',
        ],
        ctaLabel: 'Explore Southwest / Bush',
      },
    ]),
    costs: {
      title: 'Alaska moving costs',
      intro:
        'Alaska pricing reflects Anchorage labor markets, extreme seasons, ferry/air components, and long empty miles. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate Alaska moving costs',
        lastReviewed: '2026-07-23',
        body: 'These ranges are planning estimates, not quotes. They combine typical Alaska local and long-haul patterns: home size, distance, winter access, ferry/air components, packing, and regional labor. Actual bids vary widely by season and community access. Always compare written estimates and confirm FMCSA authority for Outside/interstate legs.',
      },
      ranges: [
        {
          label: 'Anchorage studio / 1BR',
          value: '$600–$2,800+',
          note: 'Winter access dominates',
        },
        {
          label: 'Suburban 2–3BR house',
          value: '$2,000–$6,500+',
          note: 'Season and driveway snow matter',
        },
        {
          label: 'Intrastate long (e.g. Anchorage ↔ Fairbanks)',
          value: '$2,500–$9,000+',
          note: 'Distance and weather drive hours',
        },
        {
          label: 'Ferry / Bush community moves',
          value: 'Highly variable',
          note: 'Air/barge components dominate',
        },
        {
          label: 'Typical 2–3 person crew (Anchorage)',
          value: '$140–$260+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'Winter ice and extreme cold can erase productivity.',
        'Ferry and air schedules drive Southeast and Bush costs.',
        'Long empty miles between hubs raise portal-to-portal time.',
        'Summer peak competes with construction and tourism demand.',
        'Outside moves are interstate and need FMCSA authority.',
      ],
    },
    routes: {
      title: 'Popular Alaska moving routes',
      intro:
        'Alaska sees strong Outside inbound flows via Seattle corridors, large Anchorage–Fairbanks internal traffic, and ferry-dependent Southeast moves. Outside jobs need FMCSA authority; pure in-state jobs need careful insurance and logistics verification.',
      migrationProfile: 'inbound_dominant',
      outbound: [
        {
          label: 'Alaska → Washington / Lower 48',
          href: '/local-movers/washington',
          origins: 'Anchorage, Fairbanks, Southeast',
          transit: 'Marine + multi-day inland',
          planningNote: 'Confirm FMCSA authority; plan long transit times.',
          note: 'Primary Outside outbound corridor via Pacific Northwest.',
        },
        {
          label: 'Anchorage ↔ Fairbanks',
          href: '/local-movers/alaska/fairbanks-north-star',
          origins: 'Southcentral / Interior',
          transit: 'Parks / Richardson highway corridors',
          planningNote: 'Weather windows matter in winter.',
          note: 'Major in-state long-haul corridor.',
        },
      ],
      inbound: [
        {
          label: 'Lower 48 → Alaska',
          href: '/local-movers/alaska/anchorage',
          origins: 'WA, CA, TX, OR',
          transit: 'Marine + local delivery',
          planningNote: 'High-volume inbound into Anchorage.',
          note: 'Confirm interstate FMCSA authority.',
        },
        {
          label: 'Moving to Anchorage Municipality',
          href: '/local-movers/alaska/anchorage',
          note: 'Multi-unit winters and dense urban staging.',
        },
        {
          label: 'Moving to Matanuska-Susitna Borough',
          href: '/local-movers/alaska/matanuska-susitna',
          note: 'Growth suburbs and long driveway access.',
        },
      ],
    },
    challenges: {
      title: 'Alaska-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real Alaska moves — not generic national checklist filler.',
      items: [
        {
          title: 'Extreme winter access',
          detail:
            'Ice, snow, and cold can shut down driveway access and slow crews. Build large weather buffers October–April.',
        },
        {
          title: 'Ferry and air logistics',
          detail:
            'Southeast and Bush communities may depend on marine or air freight. Confirm schedules before booking.',
        },
        {
          title: 'Limited state HHG permit regime',
          detail:
            'Without a dedicated HHG license lookup, demand insurance certificates, written estimates, and FMCSA checks for Outside moves.',
        },
        {
          title: 'Long empty miles',
          detail:
            'Anchorage–Fairbanks and remote community jobs create expensive empty miles. Get inventory-based written estimates.',
        },
        {
          title: 'Outside interstate authority',
          detail:
            'Moves to or from the lower 48 need active FMCSA authority even when booked with a local Alaska brand.',
        },
      ],
    },
    tools: SHARED_TOOLS('Alaska'),
    faq: [
      {
        question: 'Do Alaska movers need a special household goods license?',
        answer:
          'Alaska generally does not require a special state-issued household-goods permit for pure intrastate movers. Businesses still need an Alaska business license, and Outside/interstate moves require FMCSA authority.',
      },
      {
        question: 'How do I verify an Alaska mover?',
        answer:
          'Request business license details, insurance certificates, and written estimates. For Outside/interstate legs, verify USDOT / MC on FMCSA SAFER.',
      },
      {
        question: 'How much does a local Anchorage move cost?',
        answer:
          'Planning ranges often fall around $600–$2,800+ for a studio/1BR and more for larger homes, with season and winter access driving the spread. Use the calculator, then compare written estimates.',
      },
      {
        question: 'Is an Anchorage-to-Fairbanks move interstate?',
        answer:
          'No — both ends are in Alaska. Focus on weather windows, packing, and inventory-based written estimates for the long haul.',
      },
      {
        question: 'When is peak moving season in Alaska?',
        answer:
          'Statewide peak is typically May–September. Winter weather can force flexible dates for much of the rest of the year.',
      },
      {
        question: 'Does a Seattle-to-Anchorage move need FMCSA authority?',
        answer:
          'Yes. Moves between Alaska and the lower 48 are interstate. Confirm active FMCSA operating authority and a USDOT number.',
      },
    ],
    trust: {
      byline: 'Move Trust Hub editorial research',
      lastReviewed: '2026-07-23',
      methodology:
        'Borough guides combine public registration checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.',
      independence:
        'Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.',
      sources: [
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        {
          label: 'FMCSA — Protect Your Move',
          href: 'https://www.fmcsa.dot.gov/protect-your-move',
        },
        {
          label: 'Alaska business licensing',
          href: 'https://www.commerce.alaska.gov/web/cbpl/BusinessLicensing.aspx',
        },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  },
};

const fileMap = [
  ['nebraska', 'nebraskaStateResourceHub', packs.nebraska],
  ['idaho', 'idahoStateResourceHub', packs.idaho],
  ['west-virginia', 'westVirginiaStateResourceHub', packs['west-virginia']],
  ['hawaii', 'hawaiiStateResourceHub', packs.hawaii],
  ['alaska', 'alaskaStateResourceHub', packs.alaska],
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

// Full registry W1–W8 + CA
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
import { marylandStateResourceHub } from '@/lib/local-movers/state-resource-hub/maryland';
import { massachusettsStateResourceHub } from '@/lib/local-movers/state-resource-hub/massachusetts';
import { michiganStateResourceHub } from '@/lib/local-movers/state-resource-hub/michigan';
import { minnesotaStateResourceHub } from '@/lib/local-movers/state-resource-hub/minnesota';
import { mississippiStateResourceHub } from '@/lib/local-movers/state-resource-hub/mississippi';
import { missouriStateResourceHub } from '@/lib/local-movers/state-resource-hub/missouri';
import { nebraskaStateResourceHub } from '@/lib/local-movers/state-resource-hub/nebraska';
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
import { westVirginiaStateResourceHub } from '@/lib/local-movers/state-resource-hub/west-virginia';
import { wisconsinStateResourceHub } from '@/lib/local-movers/state-resource-hub/wisconsin';
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
  marylandStateResourceHub,
  massachusettsStateResourceHub,
  michiganStateResourceHub,
  minnesotaStateResourceHub,
  mississippiStateResourceHub,
  missouriStateResourceHub,
  nebraskaStateResourceHub,
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
  westVirginiaStateResourceHub,
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

console.log('registry updated with Wave 8 (41 packs total)');
