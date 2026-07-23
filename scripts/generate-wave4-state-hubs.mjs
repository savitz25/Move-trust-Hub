/**
 * Wave 4 State Resource Hubs: MA, MD, IN, MO, SC
 * Run: node scripts/generate-wave4-state-hubs.mjs
 * Prerequisites: scripts/tmp-wave4-regions.json (0 orphans / 0 duplicates)
 */
import { readFileSync, writeFileSync } from 'fs';

const regions = JSON.parse(readFileSync('scripts/tmp-wave4-regions.json', 'utf8'));

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
 * Research brief (Wave 4):
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

const maCount = getUniqueCountyCount('massachusetts');
const mdCount = getUniqueCountyCount('maryland');
const inCount = getUniqueCountyCount('indiana');
const moCount = getUniqueCountyCount('missouri');
const scCount = getUniqueCountyCount('south-carolina');

const packs = {
  massachusetts: {
    stateSlug: 'massachusetts',
    stateCode: 'MA',
    h1: `Massachusetts Moving Resource Hub: Costs, DPU Certificates & ${maCount} County Guides`,
    metaTitle: `Massachusetts Movers Guide 2026 — Costs, DPU Certificates & ${maCount} County Guides`,
    metaDescription:
      'Plan a move within, to, or from Massachusetts. Compare local and intrastate costs, verify DPU household goods operating certificates, browse county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for Massachusetts moves in 2026 — typical costs, DPU vs FMCSA rules, Boston-to-Berkshires regional guides, and tools to compare licensed movers without paid placements.',
    trustBar: [
      `${maCount} County Guides`,
      'Verified Movers',
      'MA DPU & FMCSA Checked',
      'Updated 2026',
    ],
    intents: intents('Massachusetts'),
    primaryCta: {
      label: 'Calculate My Massachusetts Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in Massachusetts is different',
      paragraphs: [
        'Massachusetts is not one moving market. Boston triple-deckers and street permits, Cambridge and Somerville multi-unit elevators, Route 128 suburban HOAs, Cape Cod ferry and seasonal congestion, and Berkshire mountain approaches produce different access and labor profiles under one state name.',
        'Intrastate household goods movers must hold a current Department of Public Utilities (DPU) operating certificate. Interstate jobs need FMCSA authority. Winter weather, college lease peaks, and narrow colonial streets are planning inputs — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'Massachusetts moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical Massachusetts local and intrastate patterns; they are not bids. Always compare written estimates from DPU-licensed movers for in-state work and FMCSA-authorized carriers for interstate work.',
      stats: [
        {
          label: 'Typical Boston studio / 1BR',
          value: '$700–$2,900+',
          note: 'Stairs, elevators, and street permits dominate',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$2,000–$6,500+',
          note: 'Route 128 HOAs common',
        },
        {
          label: 'Intrastate corridor (e.g. Boston ↔ Springfield)',
          value: '$2,000–$6,500+',
          note: 'Season and packing drive the spread',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'College Aug 31 / Sept 1 peaks are intense',
        },
        {
          label: 'Top outbound destinations',
          value: 'FL · NH · ME · NY · NC',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: String(maCount),
          note: 'Greater Boston emphasized',
        },
      ],
    },
    regulations: {
      mode: 'strong_state_regulator',
      title: 'Massachusetts moving regulations & consumer protection',
      intro:
        'Massachusetts requires household goods moving companies operating within the state to hold a current Department of Public Utilities (DPU) operating certificate. Match the certificate to the job before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside Massachusetts)',
        body: 'If origin or destination is outside Massachusetts, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. A Massachusetts DPU certificate alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within Massachusetts)',
        body: 'DPU’s Transportation Oversight Division regulates companies that move household goods within Massachusetts. Consumers should confirm an up-to-date DPU operating certificate number and ensure the bill of lading includes the company name, address, DPU license number, and phone.',
      },
      verifySteps: [
        'Classify the job: entirely in Massachusetts (DPU) vs any out-of-state leg (FMCSA / USDOT).',
        'Copy the exact legal name from the written estimate.',
        'Intrastate: confirm the company has a current DPU operating certificate (Mass.gov licensed movers resources).',
        'Interstate: look up USDOT / MC on FMCSA SAFER.',
        'Before signing, verify the bill of lading lists DPU license number and company contact details.',
        'Avoid large cash deposits to unverified operators.',
      ],
      protections: [
        {
          title: 'DPU operating certificate',
          detail:
            'All household moving companies in Massachusetts must be licensed by the DPU to operate in-state and are subject to state laws and Department rules.',
        },
        {
          title: 'Bill of lading requirements',
          detail:
            'State consumer guidance expects the bill of lading to include the mover’s name, address, DPU license number, and telephone number.',
        },
        {
          title: 'Tariff and insurance filings',
          detail:
            'Licensed movers file tariffs and insurance documentation as part of DPU household goods authorization — ask for written rates and coverage clarity.',
        },
      ],
      officialLinks: [
        {
          label: 'Mass.gov — Moving within Massachusetts',
          href: 'https://www.mass.gov/guides/moving-within-massachusetts',
          external: true,
        },
        {
          label: 'Mass.gov — Moving companies regulated by DPU',
          href: 'https://www.mass.gov/info-details/moving-companies-regulated-by-the-department-of-public-utilities-dpu',
          external: true,
        },
        {
          label: 'Mass.gov — Apply as a household goods mover',
          href: 'https://www.mass.gov/how-to/apply-to-be-a-household-goods-mover-in-massachusetts',
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
        'Licensing rules and directories can change. Always verify current DPU certificate status or FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('massachusetts', [
      {
        key: 'greater-boston',
        id: 'greater-boston',
        name: 'Greater Boston',
        shortName: 'Greater Boston',
        blurb:
          'Suffolk, Middlesex, Norfolk, and Essex with triple-deckers, elevators, street permits, and dense suburbs.',
        challenges: [
          'Street permits and tight staging',
          'Stairs, elevators, and co-op boards',
        ],
        ctaLabel: 'Explore Greater Boston',
      },
      {
        key: 'southeast-cape',
        id: 'southeast-cape',
        name: 'Southeast & Cape Cod',
        shortName: 'Southeast / Cape',
        blurb:
          'Plymouth, Bristol, Barnstable, Dukes, and Nantucket with seasonal congestion and island logistics.',
        challenges: [
          'Cape summer traffic and ferry timing',
          'Confirm island coverage early',
        ],
        ctaLabel: 'Explore Southeast / Cape',
      },
      {
        key: 'central-ma',
        id: 'central-ma',
        name: 'Central Massachusetts',
        shortName: 'Central MA',
        blurb:
          'Worcester County corridors with mixed urban cores and suburban HOAs between Boston and the west.',
        challenges: [
          'I-90 / I-290 congestion windows',
          'Mixed multi-unit and suburban access',
        ],
        ctaLabel: 'Explore Central Massachusetts',
      },
      {
        key: 'western-ma',
        id: 'western-ma',
        name: 'Western Massachusetts',
        shortName: 'Western MA',
        blurb:
          'Springfield metro, Pioneer Valley colleges, and Berkshire mountain approaches.',
        challenges: [
          'Hill driveways and winter weather',
          'College lease-cycle peaks',
        ],
        ctaLabel: 'Explore Western Massachusetts',
      },
    ]),
    costs: {
      title: 'Massachusetts moving costs',
      intro:
        'Massachusetts pricing reflects Boston labor markets, multi-unit access, street permits, college peaks, and winter weather. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate Massachusetts moving costs',
        lastReviewed: '2026-07-23',
        body: 'These ranges are planning estimates, not quotes. They combine typical Massachusetts local and intrastate patterns: home size, distance, stairs/elevators, parking permits, HOAs, seasonality, and regional labor. Actual bids vary. Always compare written estimates from DPU-licensed movers for in-state work and FMCSA-authorized carriers for interstate work.',
      },
      ranges: [
        {
          label: 'Boston studio / 1BR',
          value: '$700–$2,900+',
          note: 'Stairs and permits dominate',
        },
        {
          label: 'Suburban 2–3BR house',
          value: '$1,900–$5,500+',
          note: 'HOAs common outside the core',
        },
        {
          label: 'Intrastate mid-size (e.g. Boston ↔ Worcester)',
          value: '$1,900–$5,500+',
          note: 'Season matters',
        },
        {
          label: 'Intrastate long (e.g. Boston ↔ Berkshires or Cape)',
          value: '$2,400–$7,500+',
          note: 'Seasonal and island logistics push the top',
        },
        {
          label: 'Typical 2–3 person crew (Greater Boston)',
          value: '$150–$280+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'Triple-decker stairs and long carries dominate Boston jobs.',
        'Street parking permits can add time and fees.',
        'College move-in/out compresses crews in late August.',
        'Cape and island seasons constrain truck timing.',
        'Winter ice and snow force flexible dates.',
      ],
    },
    routes: {
      title: 'Popular Massachusetts moving routes',
      intro:
        'Massachusetts sees strong outbound Sun Belt flows, constant short interstate hops into New Hampshire, Maine, Rhode Island, and New York, and large Boston internal churn. Interstate jobs need FMCSA authority; in-state corridors need DPU-licensed movers.',
      migrationProfile: 'outbound_dominant',
      outbound: [
        {
          label: 'Massachusetts → Florida',
          href: '/moving-to/florida',
          origins: 'Greater Boston, Southeast MA',
          transit: 'Multi-day I-95',
          planningNote: 'Book early for winter arrivals.',
          note: 'High-volume Northeast-to-Florida corridor.',
        },
        {
          label: 'Massachusetts → New Hampshire / Maine',
          href: '/local-movers/new-hampshire',
          origins: 'Essex, Middlesex, Worcester',
          transit: 'Often same-day interstate',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Common short cross-border metro moves.',
        },
        {
          label: 'Massachusetts → Carolinas',
          href: '/local-movers/north-carolina',
          origins: 'Greater Boston',
          transit: 'Multi-day I-95',
          planningNote: 'HOAs at destination common.',
          note: 'Popular lifestyle outbound destinations.',
        },
      ],
      inbound: [
        {
          label: 'Moving to Suffolk County (Boston)',
          href: '/local-movers/massachusetts/suffolk',
          note: 'Street permits, stairs, and dense multi-unit access.',
        },
        {
          label: 'Moving to Middlesex County',
          href: '/local-movers/massachusetts/middlesex',
          note: 'Cambridge–Somerville multi-unit and suburban mix.',
        },
        {
          label: 'Moving to Norfolk County',
          href: '/local-movers/massachusetts/norfolk',
          note: 'South-of-Boston suburbs and HOA communities.',
        },
      ],
    },
    challenges: {
      title: 'Massachusetts-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real Massachusetts moves — not generic national checklist filler.',
      items: [
        {
          title: 'Triple-deckers and narrow streets',
          detail:
            'Boston-area staging often means long carries, limited truck length, and resident parking rules. Share approach photos early.',
        },
        {
          title: 'College lease peaks',
          detail:
            'Late August demand spikes around student turnovers. Book weeks earlier than a typical civilian calendar.',
        },
        {
          title: 'Cape and island logistics',
          detail:
            'Ferry reservations, bridge traffic, and seasonal bans change truck plans. Confirm coverage for Dukes and Nantucket early.',
        },
        {
          title: 'Winter weather',
          detail:
            'Ice and snow can close driveways and slow crews. Build weather buffers November–March.',
        },
        {
          title: 'DPU certificate verification',
          detail:
            'Confirm the exact legal name has a current Massachusetts DPU operating certificate before deposits on in-state work.',
        },
      ],
    },
    tools: SHARED_TOOLS('Massachusetts'),
    faq: [
      {
        question: 'Do Massachusetts movers need a state license?',
        answer:
          'Yes. Household goods movers operating within Massachusetts must be licensed by the Department of Public Utilities (DPU). Interstate moves require FMCSA authority.',
      },
      {
        question: 'How do I verify a Massachusetts mover?',
        answer:
          'Confirm a current DPU operating certificate for the legal name on your estimate using Mass.gov DPU mover resources. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER.',
      },
      {
        question: 'How much does a local Boston move cost?',
        answer:
          'Planning ranges often fall around $700–$2,900+ for a studio/1BR and more for larger homes, driven by stairs, elevators, and permits. Use the calculator, then compare written estimates.',
      },
      {
        question: 'Is a Boston-to-Worcester move intrastate?',
        answer:
          'Yes — both ends are in Massachusetts, so you generally need a DPU-licensed household goods mover.',
      },
      {
        question: 'When is peak moving season in Massachusetts?',
        answer:
          'Statewide peak is typically May–September, with especially intense demand around college move dates in late August.',
      },
      {
        question: 'Does a move from Boston to New Hampshire need FMCSA authority?',
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
          label: 'Mass.gov — Moving within Massachusetts',
          href: 'https://www.mass.gov/guides/moving-within-massachusetts',
        },
        {
          label: 'Mass.gov — DPU-regulated movers',
          href: 'https://www.mass.gov/info-details/moving-companies-regulated-by-the-department-of-public-utilities-dpu',
        },
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  },

  maryland: {
    stateSlug: 'maryland',
    stateCode: 'MD',
    h1: `Maryland Moving Resource Hub: Costs, HHG Registration & ${mdCount} County Guides`,
    metaTitle: `Maryland Movers Guide 2026 — Costs, Labor HHG Registration & ${mdCount} County Guides`,
    metaDescription:
      'Plan a move within, to, or from Maryland. Compare local and intrastate costs, understand Maryland Department of Labor household goods mover registration, browse county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for Maryland moves in 2026 — typical costs, state HHG registration vs FMCSA rules, Baltimore-to-Eastern Shore regional guides, and tools to compare registered movers without paid placements.',
    trustBar: [
      `${mdCount} County Guides`,
      'Verified Movers',
      'MD HHG & FMCSA Checked',
      'Updated 2026',
    ],
    intents: intents('Maryland'),
    primaryCta: {
      label: 'Calculate My Maryland Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in Maryland is different',
      paragraphs: [
        'Maryland is not one moving market. Baltimore row homes and alley staging, Montgomery and Prince George’s HOA suburbs, Annapolis and Anne Arundel waterfront access, Western Maryland mountain approaches, and Eastern Shore bridge logistics produce different access and labor profiles under one state name.',
        'Maryland law requires household goods movers using commercial motor vehicles to register with the Department of Labor Division of Occupational and Professional Licensing. Interstate jobs need FMCSA authority. Beltway congestion, military and federal workforce cycles, and Bay Bridge timing are planning inputs — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'Maryland moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical Maryland local and intrastate patterns; they are not bids. Always compare written estimates and confirm registration or FMCSA authority for your route.',
      stats: [
        {
          label: 'Typical Baltimore studio / 1BR',
          value: '$600–$2,500+',
          note: 'Row homes, stairs, and alley staging',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$1,900–$6,000+',
          note: 'DC-suburb HOAs common',
        },
        {
          label: 'Intrastate corridor (e.g. Montgomery ↔ Baltimore)',
          value: '$1,800–$5,500+',
          note: 'Beltway timing matters',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'Federal/lease cycles can create spikes',
        },
        {
          label: 'Top outbound destinations',
          value: 'FL · NC · VA · PA · SC',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: String(mdCount),
          note: 'DC suburbs and Baltimore emphasized',
        },
      ],
    },
    regulations: {
      mode: 'strong_state_regulator',
      title: 'Maryland moving regulations & consumer protection',
      intro:
        'Maryland requires household goods movers that provide moving services with a commercial motor vehicle to register with the Department of Labor Division of Occupational and Professional Licensing. Match registration to the job before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside Maryland)',
        body: 'If origin or destination is outside Maryland, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. Maryland household goods mover registration alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within Maryland)',
        body: 'Under Maryland’s household goods mover registration law, a person may not provide or offer household goods moving services in the state using a commercial motor vehicle (as defined in federal CMV rules) unless registered as a household goods mover with the Department of Labor. Confirm active registration and get written estimates before hiring.',
      },
      verifySteps: [
        'Classify the job: entirely in Maryland (state HHG registration) vs any out-of-state leg (FMCSA / USDOT).',
        'Copy the exact legal name from the written estimate.',
        'Intrastate: confirm Maryland Department of Labor household goods mover registration for the company.',
        'Interstate: look up USDOT / MC on FMCSA SAFER.',
        'Get written estimates, insurance/valuation clarity, and inventory details.',
        'Avoid large cash deposits to unverified operators.',
      ],
      protections: [
        {
          title: 'Household goods mover registration',
          detail:
            'Maryland Department of Labor publishes household goods movers registration requirements covering loading, packing, transporting, and related services for a fee using a commercial motor vehicle.',
        },
        {
          title: 'Commercial motor vehicle threshold',
          detail:
            'Registration applies to household goods moving services using a commercial motor vehicle as defined in federal motor carrier safety regulations — ask carriers how their vehicles and credentials map to your job.',
        },
        {
          title: 'Written estimates',
          detail:
            'Insist on written estimates and clarity on stairs, elevators, long carries, and packing before signing — especially on row-home and HOA jobs.',
        },
      ],
      officialLinks: [
        {
          label: 'MD Labor — Household Goods Movers Registration',
          href: 'https://labor.maryland.gov/license/hgm/',
          external: true,
        },
        {
          label: 'MD Labor — Registration information',
          href: 'https://labor.maryland.gov/license/hgm/hhmreginfo.shtml',
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
        'Licensing rules and enforcement dates can change. Always verify current Maryland household goods mover registration or FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('maryland', [
      {
        key: 'baltimore-central',
        id: 'baltimore-central',
        name: 'Baltimore & Central Maryland',
        shortName: 'Baltimore / Central',
        blurb:
          'Baltimore City/County, Anne Arundel, Howard, and neighbors with row homes, suburbs, and I-95 corridors.',
        challenges: [
          'Row homes, stairs, and alley staging',
          'Beltway and harbor congestion',
        ],
        ctaLabel: 'Explore Baltimore / Central',
      },
      {
        key: 'dc-suburbs',
        id: 'dc-suburbs',
        name: 'DC Suburbs & Southern Maryland',
        shortName: 'DC Suburbs',
        blurb:
          'Montgomery, Prince George’s, Charles, Calvert, and St. Mary’s with high-rises, HOAs, and federal workforce cycles.',
        challenges: [
          'Elevators, HOA windows, and security desks',
          'Capital Beltway timing',
        ],
        ctaLabel: 'Explore DC Suburbs',
      },
      {
        key: 'western-md',
        id: 'western-md',
        name: 'Western Maryland',
        shortName: 'Western MD',
        blurb:
          'Frederick, Hagerstown, and mountain counties with longer regional hauls and winter weather.',
        challenges: [
          'Mountain weather and hill access',
          'Distance from Baltimore–DC fleets',
        ],
        ctaLabel: 'Explore Western Maryland',
      },
      {
        key: 'eastern-shore',
        id: 'eastern-shore',
        name: 'Eastern Shore',
        shortName: 'Eastern Shore',
        blurb:
          'Bay Bridge approaches and Shore counties with seasonal tourism and thinner local coverage in places.',
        challenges: [
          'Bay Bridge timing and tourism peaks',
          'Confirm coverage for remote Shore addresses',
        ],
        ctaLabel: 'Explore Eastern Shore',
      },
    ]),
    costs: {
      title: 'Maryland moving costs',
      intro:
        'Maryland pricing reflects DC-suburb labor markets, Baltimore row-home access, HOAs, and Bay Bridge logistics. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate Maryland moving costs',
        lastReviewed: '2026-07-23',
        body: 'These ranges are planning estimates, not quotes. They combine typical Maryland local and intrastate patterns: home size, distance, stairs/elevators, parking, HOAs, Beltway congestion, and regional labor. Actual bids vary. Always compare written estimates from registered movers for in-state work and FMCSA-authorized carriers for interstate work.',
      },
      ranges: [
        {
          label: 'Baltimore studio / 1BR',
          value: '$600–$2,500+',
          note: 'Stairs and alley staging dominate',
        },
        {
          label: 'Suburban 2–3BR house',
          value: '$1,800–$5,500+',
          note: 'DC-suburb HOAs common',
        },
        {
          label: 'Intrastate mid-size (e.g. Montgomery ↔ Anne Arundel)',
          value: '$1,800–$5,500+',
          note: 'Beltway timing matters',
        },
        {
          label: 'Intrastate long (e.g. Montgomery ↔ Eastern Shore or Western MD)',
          value: '$2,200–$7,000+',
          note: 'Bridge and mountain logistics',
        },
        {
          label: 'Typical 2–3 person crew (DC suburbs)',
          value: '$140–$250+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'Row homes and narrow alleys add carry labor in Baltimore.',
        'HOA windows are common in Montgomery and Prince George’s.',
        'Beltway congestion changes portal-to-portal time.',
        'Bay Bridge timing affects Shore jobs.',
        'Peak May–September and federal lease cycles fill crews early.',
      ],
    },
    routes: {
      title: 'Popular Maryland moving routes',
      intro:
        'Maryland sits between Northeast origins and Sun Belt destinations, with heavy DC-metro churn and short interstate hops into Virginia, Pennsylvania, and Delaware. Interstate jobs need FMCSA authority; in-state corridors need properly registered household goods movers.',
      migrationProfile: 'balanced',
      outbound: [
        {
          label: 'Maryland → Florida',
          href: '/moving-to/florida',
          origins: 'DC suburbs, Baltimore',
          transit: 'Multi-day I-95',
          planningNote: 'Book early for winter arrivals.',
          note: 'High-volume Mid-Atlantic-to-Florida corridor.',
        },
        {
          label: 'Maryland → Carolinas',
          href: '/local-movers/north-carolina',
          origins: 'Montgomery, Prince George’s, Anne Arundel',
          transit: 'I-95 multi-day',
          planningNote: 'HOAs at destination common.',
          note: 'Popular lifestyle outbound destinations.',
        },
        {
          label: 'Maryland → Virginia / Pennsylvania',
          href: '/local-movers/virginia',
          origins: 'DC suburbs, Baltimore, Western MD',
          transit: 'Often same-day interstate',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Short cross-border metro moves are common.',
        },
      ],
      inbound: [
        {
          label: 'Moving to Montgomery County',
          href: '/local-movers/maryland/montgomery',
          note: 'HOAs, elevators, and Beltway logistics.',
        },
        {
          label: 'Moving to Baltimore County',
          href: '/local-movers/maryland/baltimore',
          note: 'Suburban mix and older multi-story stock.',
        },
        {
          label: 'Moving to Prince George’s County',
          href: '/local-movers/maryland/prince-georges',
          note: 'DC-adjacent suburbs and multi-unit access.',
        },
      ],
    },
    challenges: {
      title: 'Maryland-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real Maryland moves — not generic national checklist filler.',
      items: [
        {
          title: 'Baltimore row homes',
          detail:
            'Narrow streets and alley staging often mean long carries and limited truck length. Share approach photos early.',
        },
        {
          title: 'DC-suburb HOA windows',
          detail:
            'Montgomery and Prince George’s communities often restrict elevator and loading hours. Get rules in writing before booking.',
        },
        {
          title: 'Bay Bridge and Shore timing',
          detail:
            'Eastern Shore jobs depend on bridge congestion and tourism peaks. Avoid Friday arrivals when possible.',
        },
        {
          title: 'Short interstate hops',
          detail:
            'Moves into Virginia, DC, Pennsylvania, or Delaware are interstate. Confirm FMCSA authority even for short hauls.',
        },
        {
          title: 'Registration verification',
          detail:
            'Confirm the exact legal name holds current Maryland household goods mover registration before deposits on in-state work.',
        },
      ],
    },
    tools: SHARED_TOOLS('Maryland'),
    faq: [
      {
        question: 'Do Maryland movers need to register with the state?',
        answer:
          'Yes. Maryland generally requires household goods movers using a commercial motor vehicle to register with the Department of Labor. Interstate moves require FMCSA authority.',
      },
      {
        question: 'Is the Maryland PSC the household goods regulator?',
        answer:
          'Maryland PSC Transportation primarily oversees passenger-for-hire carriers. Household goods mover registration is handled through the Department of Labor Division of Occupational and Professional Licensing.',
      },
      {
        question: 'How much does a local Montgomery County move cost?',
        answer:
          'Planning ranges often fall around $600–$2,500+ for smaller units and more for larger suburban homes, driven by elevators, HOAs, and labor markets. Use the calculator, then compare written estimates.',
      },
      {
        question: 'Is a Baltimore-to-Ocean City move intrastate?',
        answer:
          'Yes — both ends are in Maryland, so you generally need a properly registered household goods mover for commercial CMV operations.',
      },
      {
        question: 'When is peak moving season in Maryland?',
        answer:
          'Statewide peak is typically May–September. Federal and lease cycles in the DC suburbs can create additional spikes.',
      },
      {
        question: 'Does a Bethesda-to-Arlington move need FMCSA authority?',
        answer:
          'Yes. Crossing into Virginia is interstate even if the distance is short. Confirm active FMCSA operating authority and a USDOT number.',
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
          label: 'MD Labor — Household Goods Movers Registration',
          href: 'https://labor.maryland.gov/license/hgm/',
        },
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  },

  indiana: {
    stateSlug: 'indiana',
    stateCode: 'IN',
    h1: `Indiana Moving Resource Hub: Costs, DOR Intrastate Authority & ${inCount} County Guides`,
    metaTitle: `Indiana Movers Guide 2026 — Costs, DOR HHG Authority & ${inCount} County Guides`,
    metaDescription:
      'Plan a move within, to, or from Indiana. Compare local and intrastate costs, verify Indiana DOR household goods operating authority, browse 92 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for Indiana moves in 2026 — typical costs, DOR intrastate vs FMCSA rules, Indy-to-Region regional guides, and tools to compare authorized movers without paid placements.',
    trustBar: [
      `${inCount} County Guides`,
      'Verified Movers',
      'IN DOR & FMCSA Checked',
      'Updated 2026',
    ],
    intents: intents('Indiana'),
    primaryCta: {
      label: 'Calculate My Indiana Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in Indiana is different',
      paragraphs: [
        'Indiana is not one moving market. Indianapolis multi-unit and HOA suburbs, Northwest Indiana Chicago-adjacent logistics, Fort Wayne industrial corridors, college towns, and Ohio River border hops produce different access and labor profiles under one state name.',
        'Intrastate household goods carriers need Indiana Intrastate Operating Authority through the Department of Revenue Motor Carrier Services. Interstate jobs need FMCSA authority. Winter weather, Indy 500-week congestion, and short cross-border jobs into Illinois, Ohio, Kentucky, and Michigan are planning inputs — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'Indiana moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical Indiana local and intrastate patterns; they are not bids. Always compare written estimates from DOR-authorized movers for in-state work and FMCSA-authorized carriers for interstate work.',
      stats: [
        {
          label: 'Typical Indy studio / 1BR',
          value: '$500–$2,200+',
          note: 'Stairs, elevators, and parking vary',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$1,600–$5,000+',
          note: 'Collar-county HOAs common',
        },
        {
          label: 'Intrastate corridor (e.g. Indy ↔ Fort Wayne)',
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
          value: 'FL · TX · IL · OH · KY · AZ',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: String(inCount),
          note: 'Indianapolis metro emphasized',
        },
      ],
    },
    regulations: {
      mode: 'strong_state_regulator',
      title: 'Indiana moving regulations & consumer protection',
      intro:
        'Indiana requires for-hire household goods transportation within the state to hold Intrastate Operating Authority through the Department of Revenue Motor Carrier Services. Match authority to the job before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside Indiana)',
        body: 'If origin or destination is outside Indiana, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. Indiana intrastate household goods authority alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within Indiana)',
        body: 'Moving companies that transport household goods for hire within Indiana must obtain Indiana Intrastate Operating Authority through DOR Motor Carrier Services, including household goods-related application materials, insurance filings, and tariff information as required. Consumers should verify authority before hiring.',
      },
      verifySteps: [
        'Classify the job: entirely in Indiana (DOR intrastate authority) vs any out-of-state leg (FMCSA / USDOT).',
        'Copy the exact legal name from the written estimate.',
        'Intrastate: confirm Indiana Intrastate Operating Authority for household goods with DOR Motor Carrier Services resources.',
        'Interstate: look up USDOT / MC on FMCSA SAFER.',
        'Get written estimates, insurance/valuation clarity, and inventory details.',
        'Avoid large cash deposits to unverified operators.',
      ],
      protections: [
        {
          title: 'Intrastate operating authority',
          detail:
            'Indiana DOR Motor Carrier Services licenses passenger and household goods transportation providers operating within the state.',
        },
        {
          title: 'Insurance and tariff filings',
          detail:
            'Authority applications typically require proof of insurance and rate/tariff materials — ask carriers for written proof covering your job.',
        },
        {
          title: 'Written estimates',
          detail:
            'Insist on written estimates and clarity on stairs, elevators, long carries, and packing before signing.',
        },
      ],
      officialLinks: [
        {
          label: 'IN DOR — Intrastate passenger & household goods authority',
          href: 'https://www.in.gov/dor/motor-carrier-services/usdot-and-ucr/indiana-intrastate-passenger-and-household-good-authority/',
          external: true,
        },
        {
          label: 'IN DOR — Motor Carrier Services',
          href: 'https://www.in.gov/dor/motor-carrier-services/',
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
        'Licensing rules and forms can change. Always verify current Indiana intrastate authority or FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('indiana', [
      {
        key: 'indianapolis-central',
        id: 'indianapolis-central',
        name: 'Indianapolis & Central Indiana',
        shortName: 'Indy / Central',
        blurb:
          'Marion and collar counties with multi-unit access, HOA suburbs, and I-65/I-70 logistics.',
        challenges: [
          'HOA windows in growth suburbs',
          'Event-week congestion in Indy',
        ],
        ctaLabel: 'Explore Indianapolis / Central',
      },
      {
        key: 'northwest-in',
        id: 'northwest-in',
        name: 'Northwest Indiana',
        shortName: 'Northwest IN',
        blurb:
          'Lake, Porter, and South Bend–area counties with Chicago-adjacent traffic and industrial towns.',
        challenges: [
          'Cross-metro traffic toward Chicago',
          'Short IL hops still need FMCSA authority',
        ],
        ctaLabel: 'Explore Northwest Indiana',
      },
      {
        key: 'northeast-in',
        id: 'northeast-in',
        name: 'Northeast Indiana',
        shortName: 'Northeast IN',
        blurb:
          'Fort Wayne and surrounding counties with industrial corridors and mixed suburban-rural stock.',
        challenges: [
          'Winter weather productivity loss',
          'Longer regional hauls to Indy',
        ],
        ctaLabel: 'Explore Northeast Indiana',
      },
      {
        key: 'west-central',
        id: 'west-central',
        name: 'West Central Indiana',
        shortName: 'West Central',
        blurb:
          'Lafayette, Terre Haute, and west-central counties with college towns and agricultural corridors.',
        challenges: [
          'Campus lease-cycle peaks',
          'Confirm coverage for rural addresses',
        ],
        ctaLabel: 'Explore West Central Indiana',
      },
      {
        key: 'east-central',
        id: 'east-central',
        name: 'East Central Indiana',
        shortName: 'East Central',
        blurb:
          'Muncie, Bloomington approaches, and east-central counties with college and manufacturing mix.',
        challenges: [
          'Campus and manufacturing shift timing',
          'Older multi-story stock in small cities',
        ],
        ctaLabel: 'Explore East Central Indiana',
      },
      {
        key: 'southwest-in',
        id: 'southwest-in',
        name: 'Southwest & Southern Indiana',
        shortName: 'Southwest / South',
        blurb:
          'Evansville, New Albany–Jeffersonville, and Ohio River counties with Kentucky and Ohio border hops.',
        challenges: [
          'River-city logistics and hills',
          'Short KY/OH hops need FMCSA authority',
        ],
        ctaLabel: 'Explore Southwest / South Indiana',
      },
    ]),
    costs: {
      title: 'Indiana moving costs',
      intro:
        'Indiana pricing reflects Indianapolis labor markets, collar-county HOAs, winter weather, and long cross-state hauls. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate Indiana moving costs',
        lastReviewed: '2026-07-23',
        body: 'These ranges are planning estimates, not quotes. They combine typical Indiana local and intrastate patterns: home size, distance, stairs/elevators, parking, HOAs, winter weather, and regional labor. Actual bids vary. Always compare written estimates from DOR-authorized movers for in-state work and FMCSA-authorized carriers for interstate work.',
      },
      ranges: [
        {
          label: 'Indianapolis studio / 1BR',
          value: '$500–$2,200+',
          note: 'Access varies by building',
        },
        {
          label: 'Suburban 2–3BR house',
          value: '$1,600–$4,800+',
          note: 'Collar HOAs common',
        },
        {
          label: 'Intrastate mid-size (e.g. Indy ↔ Lafayette)',
          value: '$1,700–$5,000+',
          note: 'Season matters',
        },
        {
          label: 'Intrastate long (e.g. Indy ↔ Evansville or Fort Wayne)',
          value: '$2,200–$7,000+',
          note: 'Full packing pushes the top',
        },
        {
          label: 'Typical 2–3 person crew (Indy metro)',
          value: '$120–$220+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'Collar-county HOAs add elevator and loading windows.',
        'Winter weather can erase productivity and force reschedules.',
        'Northwest Indiana jobs may include Chicago-adjacent traffic time.',
        'College towns create concentrated lease-end demand.',
        'Border hops into IL/OH/KY/MI are interstate even when short.',
      ],
    },
    routes: {
      title: 'Popular Indiana moving routes',
      intro:
        'Indiana sees strong outbound flows to Sun Belt states and constant short interstate hops into Illinois, Ohio, Kentucky, and Michigan, plus large Indianapolis internal traffic. Interstate jobs need FMCSA authority; in-state corridors need DOR-authorized movers.',
      migrationProfile: 'outbound_dominant',
      outbound: [
        {
          label: 'Indiana → Florida',
          href: '/moving-to/florida',
          origins: 'Indianapolis, Northwest IN',
          transit: 'Multi-day; snowbird seasonality',
          planningNote: 'Book early for fall/winter FL arrivals.',
          note: 'High-volume Midwest-to-Florida corridor.',
        },
        {
          label: 'Indiana → Texas / Arizona',
          href: '/local-movers/texas',
          origins: 'Indianapolis metro',
          transit: 'Multi-day interstate',
          planningNote: 'Confirm FMCSA authority end-to-end.',
          note: 'Popular job and lifestyle outbound destinations.',
        },
        {
          label: 'Indiana → Illinois / Ohio / Kentucky',
          href: '/local-movers/illinois',
          origins: 'Northwest, East, and South IN',
          transit: 'Often same-day interstate',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Short cross-border metro moves are common.',
        },
      ],
      inbound: [
        {
          label: 'Moving to Marion County (Indianapolis)',
          href: '/local-movers/indiana/marion',
          note: 'Multi-unit access and dense urban staging.',
        },
        {
          label: 'Moving to Hamilton County',
          href: '/local-movers/indiana/hamilton',
          note: 'Growth suburbs and HOA calendars.',
        },
        {
          label: 'Moving to Lake County',
          href: '/local-movers/indiana/lake',
          note: 'Chicago-adjacent logistics and industrial towns.',
        },
      ],
    },
    challenges: {
      title: 'Indiana-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real Indiana moves — not generic national checklist filler.',
      items: [
        {
          title: 'Indianapolis collar HOAs',
          detail:
            'Hamilton, Hendricks, and Johnson suburbs often restrict elevator and loading hours. Get rules in writing before booking.',
        },
        {
          title: 'Winter weather windows',
          detail:
            'Snow and ice can shut down driveway access. Build weather buffers November–March statewide.',
        },
        {
          title: 'Northwest Indiana cross-border jobs',
          detail:
            'Jobs that cross into Illinois are interstate even if short. Confirm FMCSA authority before deposits.',
        },
        {
          title: 'College lease peaks',
          detail:
            'Bloomington, West Lafayette, and other campus markets compress demand around August. Book early.',
        },
        {
          title: 'Authority verification',
          detail:
            'Confirm Indiana Intrastate Operating Authority for household goods before deposits on pure in-state work.',
        },
      ],
    },
    tools: SHARED_TOOLS('Indiana'),
    faq: [
      {
        question: 'Do Indiana movers need state authority?',
        answer:
          'Yes. For-hire household goods transportation within Indiana generally requires Intrastate Operating Authority from the Department of Revenue Motor Carrier Services. Interstate moves require FMCSA authority.',
      },
      {
        question: 'How do I verify an Indiana mover?',
        answer:
          'Confirm Intrastate Operating Authority for the legal name on your estimate via DOR Motor Carrier Services resources. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER.',
      },
      {
        question: 'How much does a local Indianapolis move cost?',
        answer:
          'Planning ranges often fall around $500–$2,200+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates.',
      },
      {
        question: 'Is an Indy-to-Fort Wayne move intrastate?',
        answer:
          'Yes — both ends are in Indiana, so you generally need a DOR-authorized household goods carrier.',
      },
      {
        question: 'When is peak moving season in Indiana?',
        answer:
          'Statewide peak is typically May–September. Winter weather can force flexible dates even outside peak.',
      },
      {
        question: 'Does a Hammond-to-Chicago move need FMCSA authority?',
        answer:
          'Yes. Crossing into Illinois is interstate even for short hops. Confirm active FMCSA operating authority.',
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
          label: 'IN DOR — Intrastate HHG authority',
          href: 'https://www.in.gov/dor/motor-carrier-services/usdot-and-ucr/indiana-intrastate-passenger-and-household-good-authority/',
        },
        {
          label: 'IN DOR — Motor Carrier Services',
          href: 'https://www.in.gov/dor/motor-carrier-services/',
        },
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  },

  missouri: {
    stateSlug: 'missouri',
    stateCode: 'MO',
    h1: `Missouri Moving Resource Hub: Costs, MoDOT HHG Authority & ${moCount} County Guides`,
    metaTitle: `Missouri Movers Guide 2026 — Costs, MoDOT HHG Authority & ${moCount} County Guides`,
    metaDescription:
      'Plan a move within, to, or from Missouri. Compare local and intrastate costs, verify MoDOT household goods operating authority, browse 115 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for Missouri moves in 2026 — typical costs, MoDOT vs FMCSA rules, St. Louis-to-Kansas City regional guides, and tools to compare authorized movers without paid placements.',
    trustBar: [
      `${moCount} County Guides`,
      'Verified Movers',
      'MoDOT & FMCSA Checked',
      'Updated 2026',
    ],
    intents: intents('Missouri'),
    primaryCta: {
      label: 'Calculate My Missouri Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in Missouri is different',
      paragraphs: [
        'Missouri is not one moving market. St. Louis brick multi-story stock, Kansas City sprawl and HOAs, Columbia college logistics, Ozarks hill access, and long I-70 east–west hauls produce different access and labor profiles under one state name.',
        'Household goods carriers must obtain operating authority from MoDOT Motor Carrier Services before operating in or between Missouri municipalities. Interstate jobs need FMCSA authority. Summer heat, ice storms, and river-city logistics are planning inputs — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'Missouri moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical Missouri local and intrastate patterns; they are not bids. Always compare written estimates from MoDOT-authorized movers for in-state work and FMCSA-authorized carriers for interstate work.',
      stats: [
        {
          label: 'Typical St. Louis / KC studio / 1BR',
          value: '$500–$2,200+',
          note: 'Stairs and multi-story stock common',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$1,600–$5,000+',
          note: 'Metro HOAs vary',
        },
        {
          label: 'Intrastate corridor (e.g. St. Louis ↔ Kansas City)',
          value: '$2,200–$7,000+',
          note: 'I-70 distance drives hours',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'Heat and storms affect productivity',
        },
        {
          label: 'Top outbound destinations',
          value: 'FL · TX · AZ · KS · IL · AR',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: String(moCount),
          note: 'St. Louis and KC emphasized',
        },
      ],
    },
    regulations: {
      mode: 'strong_state_regulator',
      title: 'Missouri moving regulations & consumer protection',
      intro:
        'Missouri requires household goods carriers to obtain operating authority from MoDOT Motor Carrier Services before operating in or between Missouri municipalities and related intrastate household goods service. Match authority to the job before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside Missouri)',
        body: 'If origin or destination is outside Missouri, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. MoDOT household goods authority alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within Missouri)',
        body: 'Household goods carriers must obtain operating authority from MoDOT Motor Carrier Services. Consumers can verify registered household goods movers through MoDOT MCS household goods resources and should get free written estimates — Missouri consumer materials emphasize free estimates and authority checks.',
      },
      verifySteps: [
        'Classify the job: entirely in Missouri (MoDOT HHG authority) vs any out-of-state leg (FMCSA / USDOT).',
        'Copy the exact legal name from the written estimate.',
        'Intrastate: verify the mover on MoDOT household goods / MCS registered mover resources.',
        'Interstate: look up USDOT / MC on FMCSA SAFER.',
        'Get more than one free written estimate and compare inventory assumptions.',
        'Avoid large cash deposits to unverified operators.',
      ],
      protections: [
        {
          title: 'MoDOT household goods authority',
          detail:
            'MoDOT states household goods carriers must obtain operating authority from Motor Carrier Services before operating in or between Missouri municipalities and related service.',
        },
        {
          title: 'Registered mover lists',
          detail:
            'Consumer guidance points to MoDOT MCS household goods resources to verify a mover has authority to transport household goods within Missouri.',
        },
        {
          title: 'Free estimates expectation',
          detail:
            'Missouri consumer materials emphasize that estimates are free — be cautious of pressure tactics around unusually low quotes.',
        },
      ],
      officialLinks: [
        {
          label: 'MoDOT — Household goods transport',
          href: 'https://www.modot.org/HHGoods',
          external: true,
        },
        {
          label: 'MoDOT — Motor Carrier Services',
          href: 'https://www.modot.org/mcs',
          external: true,
        },
        {
          label: 'MoDOT — Intrastate operating authority',
          href: 'https://www.modot.org/MOPA',
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
        'Licensing rules and directories can change. Always verify current MoDOT household goods authority or FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('missouri', [
      {
        key: 'st-louis-metro',
        id: 'st-louis-metro',
        name: 'St. Louis Metro',
        shortName: 'St. Louis Metro',
        blurb:
          'St. Louis City/County, St. Charles, and neighbors with brick multi-story stock and Illinois-border hops.',
        challenges: [
          'Stairs, alleys, and older multi-story homes',
          'Short IL hops need FMCSA authority',
        ],
        ctaLabel: 'Explore St. Louis Metro',
      },
      {
        key: 'kansas-city-metro',
        id: 'kansas-city-metro',
        name: 'Kansas City Metro',
        shortName: 'Kansas City Metro',
        blurb:
          'Jackson, Clay, Platte, and neighbors with sprawl, HOAs, and Kansas-border logistics.',
        challenges: [
          'Suburban HOA windows',
          'Short KS hops need FMCSA authority',
        ],
        ctaLabel: 'Explore Kansas City Metro',
      },
      {
        key: 'central-mo',
        id: 'central-mo',
        name: 'Central Missouri',
        shortName: 'Central MO',
        blurb:
          'Columbia, Jefferson City, and central counties along I-70 with college towns and capital logistics.',
        challenges: [
          'Campus lease-cycle peaks',
          'Long east–west hauls between metros',
        ],
        ctaLabel: 'Explore Central Missouri',
      },
      {
        key: 'southwest-mo',
        id: 'southwest-mo',
        name: 'Southwest Missouri & Ozarks',
        shortName: 'SW / Ozarks',
        blurb:
          'Springfield, Branson approaches, and Ozarks counties with hills and tourism peaks.',
        challenges: [
          'Hill driveways and narrow roads',
          'Tourism season congestion',
        ],
        ctaLabel: 'Explore Southwest / Ozarks',
      },
      {
        key: 'southeast-mo',
        id: 'southeast-mo',
        name: 'Southeast Missouri',
        shortName: 'Southeast MO',
        blurb:
          'Cape Girardeau and Bootheel counties with river logistics and longer rural approaches.',
        challenges: [
          'Confirm mover coverage for remote addresses',
          'Heat and humidity in summer',
        ],
        ctaLabel: 'Explore Southeast Missouri',
      },
      {
        key: 'northwest-mo',
        id: 'northwest-mo',
        name: 'Northwest Missouri',
        shortName: 'Northwest MO',
        blurb:
          'St. Joseph and northwest agricultural counties with thinner local mover density.',
        challenges: [
          'Longer regional hauls',
          'Winter weather on plains corridors',
        ],
        ctaLabel: 'Explore Northwest Missouri',
      },
    ]),
    costs: {
      title: 'Missouri moving costs',
      intro:
        'Missouri pricing reflects St. Louis and Kansas City labor markets, multi-story access, I-70 distance, and Ozarks terrain. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate Missouri moving costs',
        lastReviewed: '2026-07-23',
        body: 'These ranges are planning estimates, not quotes. They combine typical Missouri local and intrastate patterns: home size, distance, stairs, parking, HOAs, heat, and regional labor. Actual bids vary. Always compare written estimates from MoDOT-authorized movers for in-state work and FMCSA-authorized carriers for interstate work.',
      },
      ranges: [
        {
          label: 'St. Louis / KC studio / 1BR',
          value: '$500–$2,200+',
          note: 'Stairs and multi-story stock dominate',
        },
        {
          label: 'Suburban 2–3BR house',
          value: '$1,600–$4,800+',
          note: 'HOAs vary by suburb',
        },
        {
          label: 'Intrastate mid-size (e.g. St. Louis ↔ Columbia)',
          value: '$1,800–$5,500+',
          note: 'Season matters',
        },
        {
          label: 'Intrastate long (e.g. St. Louis ↔ Kansas City)',
          value: '$2,200–$7,000+',
          note: 'I-70 distance drives hours',
        },
        {
          label: 'Typical 2–3 person crew (major metros)',
          value: '$120–$220+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'St. Louis brick multi-story homes add stair labor.',
        'I-70 east–west hauls create long portal-to-portal days.',
        'Ozarks hills and tourism seasons affect southwest jobs.',
        'Summer heat can slow outdoor labor.',
        'Border hops into IL, KS, AR, or IA are interstate even when short.',
      ],
    },
    routes: {
      title: 'Popular Missouri moving routes',
      intro:
        'Missouri bridges Midwest and Sun Belt corridors with large St. Louis–Kansas City internal flows and short interstate hops into Illinois, Kansas, Arkansas, and Iowa. Interstate jobs need FMCSA authority; in-state corridors need MoDOT-authorized household goods carriers.',
      migrationProfile: 'outbound_dominant',
      outbound: [
        {
          label: 'Missouri → Florida',
          href: '/moving-to/florida',
          origins: 'St. Louis, Kansas City',
          transit: 'Multi-day',
          planningNote: 'Book early for winter arrivals.',
          note: 'Common Midwest-to-Florida corridor.',
        },
        {
          label: 'Missouri → Texas',
          href: '/local-movers/texas',
          origins: 'Kansas City, Springfield, St. Louis',
          transit: 'I-44 / I-35 multi-day',
          planningNote: 'Confirm FMCSA authority end-to-end.',
          note: 'Popular job and lifestyle outbound route.',
        },
        {
          label: 'Missouri → Illinois / Kansas',
          href: '/local-movers/illinois',
          origins: 'St. Louis metro, Kansas City metro',
          transit: 'Often same-day interstate',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Short cross-border metro moves are extremely common.',
        },
      ],
      inbound: [
        {
          label: 'Moving to St. Louis County',
          href: '/local-movers/missouri/st-louis',
          note: 'Multi-story stock and suburban mix.',
        },
        {
          label: 'Moving to Jackson County (Kansas City)',
          href: '/local-movers/missouri/jackson',
          note: 'Sprawl, HOAs, and river-city logistics.',
        },
        {
          label: 'Moving to Greene County (Springfield)',
          href: '/local-movers/missouri/greene',
          note: 'Ozarks approaches and growth suburbs.',
        },
      ],
    },
    challenges: {
      title: 'Missouri-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real Missouri moves — not generic national checklist filler.',
      items: [
        {
          title: 'St. Louis multi-story brick homes',
          detail:
            'Stairs, narrow streets, and limited staging are common. Share floor counts and approach photos early.',
        },
        {
          title: 'I-70 east–west distance',
          detail:
            'St. Louis–Kansas City is a full day for many crews. Confirm overnight plans and fuel time on estimates.',
        },
        {
          title: 'Ozarks access',
          detail:
            'Hill driveways and tourism congestion around Branson can change truck plans. Build schedule buffers.',
        },
        {
          title: 'Border metro hops',
          detail:
            'Moves into Illinois from St. Louis or Kansas from KC are interstate. Confirm FMCSA authority even for short hauls.',
        },
        {
          title: 'MoDOT authority verification',
          detail:
            'Confirm the exact legal name has MoDOT household goods operating authority before deposits on in-state work.',
        },
      ],
    },
    tools: SHARED_TOOLS('Missouri'),
    faq: [
      {
        question: 'Do Missouri movers need state authority?',
        answer:
          'Yes. Household goods carriers generally need operating authority from MoDOT Motor Carrier Services for in-state household goods work. Interstate moves require FMCSA authority.',
      },
      {
        question: 'How do I verify a Missouri mover?',
        answer:
          'Use MoDOT MCS household goods resources to confirm authority for the legal name on your estimate. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER.',
      },
      {
        question: 'How much does a local St. Louis or Kansas City move cost?',
        answer:
          'Planning ranges often fall around $500–$2,200+ for a studio/1BR and more for larger homes. Use the calculator, then compare free written estimates.',
      },
      {
        question: 'Is a St. Louis-to-Kansas City move intrastate?',
        answer:
          'Yes — both ends are in Missouri, so you generally need a MoDOT-authorized household goods carrier.',
      },
      {
        question: 'When is peak moving season in Missouri?',
        answer:
          'Statewide peak is typically May–September. Heat and storms can affect summer productivity.',
      },
      {
        question: 'Does a St. Louis-to-Illinois move need FMCSA authority?',
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
          label: 'MoDOT — Household goods transport',
          href: 'https://www.modot.org/HHGoods',
        },
        {
          label: 'MoDOT — Motor Carrier Services',
          href: 'https://www.modot.org/mcs',
        },
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  },

  'south-carolina': {
    stateSlug: 'south-carolina',
    stateCode: 'SC',
    h1: `South Carolina Moving Resource Hub: Costs, ORS Class E Certificates & ${scCount} County Guides`,
    metaTitle: `South Carolina Movers Guide 2026 — Costs, ORS Class E & ${scCount} County Guides`,
    metaDescription:
      'Plan a move within, to, or from South Carolina. Compare local and intrastate costs, verify ORS Class E household goods certificates, browse 46 county guides, and use free tools — independent of mover lead fees.',
    heroSubhead:
      'The independent planning hub for South Carolina moves in 2026 — typical costs, ORS Class E vs FMCSA rules, Upstate-to-Lowcountry regional guides, and tools to compare certificated movers without paid placements.',
    trustBar: [
      `${scCount} County Guides`,
      'Verified Movers',
      'SC ORS & FMCSA Checked',
      'Updated 2026',
    ],
    intents: intents('South Carolina'),
    primaryCta: {
      label: 'Calculate My South Carolina Moving Cost',
      href: '/moving-calculator',
    },
    secondaryCta: { label: 'Find & Compare Movers', href: '/companies' },
    tertiaryCta: { label: 'Explore Regions & Counties', href: '#hub-regions' },
    whyDifferent: {
      title: 'Why moving in South Carolina is different',
      paragraphs: [
        'South Carolina is not one moving market. Greenville–Spartanburg growth corridors, Columbia Midlands logistics, Charleston historic access and humidity, Grand Strand seasonal congestion, and military cycles near Beaufort produce different access and labor profiles under one state name.',
        'Intrastate household goods carriers must hold a Class E Certificate of Public Convenience and Necessity through the Office of Regulatory Staff (ORS) / PSC framework. Interstate jobs need FMCSA authority. Hurricane season, HOA coastal communities, and I-26/I-85 corridors are planning inputs — then open the region and county that match your addresses.',
      ],
    },
    snapshot: {
      title: 'South Carolina moving snapshot',
      methodology:
        'Snapshot figures are planning orientation only. Cost bands reflect typical South Carolina local and intrastate patterns; they are not bids. Always compare written estimates from Class E certificated movers for in-state work and FMCSA-authorized carriers for interstate work.',
      stats: [
        {
          label: 'Typical Charleston / Greenville studio / 1BR',
          value: '$500–$2,200+',
          note: 'Historic access and humidity matter',
        },
        {
          label: 'Typical suburban 3–4 BR',
          value: '$1,600–$5,000+',
          note: 'HOAs common in growth corridors',
        },
        {
          label: 'Intrastate corridor (e.g. Greenville ↔ Charleston)',
          value: '$1,900–$6,000+',
          note: 'I-26 distance and season matter',
        },
        {
          label: 'Peak season',
          value: 'May–September',
          note: 'Hurricane season adds date risk',
        },
        {
          label: 'Top inbound origins',
          value: 'NY · NJ · PA · OH · NC · FL',
          note: 'Interstate — confirm FMCSA authority',
        },
        {
          label: 'County guides',
          value: String(scCount),
          note: 'Upstate and Lowcountry emphasized',
        },
      ],
    },
    regulations: {
      mode: 'strong_state_regulator',
      title: 'South Carolina moving regulations & consumer protection',
      intro:
        'South Carolina requires intrastate household goods carriers to hold a Class E Certificate under the Office of Regulatory Staff (ORS) transportation framework (with PSC certificate structures). Match the certificate to the job before you pay a deposit.',
      interstate: {
        title: 'Interstate (any leg outside South Carolina)',
        body: 'If origin or destination is outside South Carolina, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. A South Carolina Class E certificate alone does not authorize interstate delivery.',
      },
      intrastate: {
        title: 'Intrastate (entirely within South Carolina)',
        body: 'Household goods carriers operating within South Carolina need Class E certification. Consumers should ask for the PSC/ORS certificate number, verify it with ORS, and confirm the number appears on vehicles. ORS Consumer Services also handles complaint history inquiries.',
      },
      verifySteps: [
        'Classify the job: entirely in South Carolina (Class E / ORS) vs any out-of-state leg (FMCSA / USDOT).',
        'Copy the exact legal name and PSC/ORS certificate number from the written estimate.',
        'Intrastate: verify the certificate with ORS transportation / consumer services channels.',
        'Interstate: look up USDOT / MC on FMCSA SAFER.',
        'Get written estimates, insurance/valuation clarity, and inventory details.',
        'Avoid large cash deposits to unverified operators; use ORS complaint channels if needed.',
      ],
      protections: [
        {
          title: 'Class E certificate requirement',
          detail:
            'Intrastate household goods carriers in South Carolina must hold Class E certification under the ORS/PSC transportation framework before operating legally.',
        },
        {
          title: 'Certificate numbers on vehicles',
          detail:
            'ORS consumer FAQs advise that certificate numbers should be located on each side of vehicles and can be verified by calling ORS.',
        },
        {
          title: 'Complaint history',
          detail:
            'Consumers can contact ORS Consumer Services about moving company complaint history before hiring.',
        },
      ],
      officialLinks: [
        {
          label: 'SC ORS — Class E (household goods)',
          href: 'https://ors.sc.gov/regulated-utilities/transportation/class-e',
          external: true,
        },
        {
          label: 'SC ORS — Transportation FAQs',
          href: 'https://ors.sc.gov/consumers/transportation/transportation-faqs',
          external: true,
        },
        {
          label: 'SC ORS — Transportation',
          href: 'https://ors.sc.gov/regulated-utilities/transportation',
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
        'Licensing rules and certificate directories can change. Always verify current Class E / ORS status or FMCSA authority for the company named on your estimate. This page is educational, not legal advice.',
    },
    regions: regionObjects('south-carolina', [
      {
        key: 'upstate',
        id: 'upstate',
        name: 'Upstate',
        shortName: 'Upstate',
        blurb:
          'Greenville, Spartanburg, Anderson, and neighbors with growth suburbs and I-85 logistics.',
        challenges: [
          'HOA windows in growth corridors',
          'I-85 congestion near metros',
        ],
        ctaLabel: 'Explore Upstate',
      },
      {
        key: 'midlands',
        id: 'midlands',
        name: 'Midlands',
        shortName: 'Midlands',
        blurb:
          'Columbia, Lexington, Aiken, and central counties with capital-city and military-adjacent mix.',
        challenges: [
          'Heat and humidity productivity loss',
          'I-20 / I-26 corridor timing',
        ],
        ctaLabel: 'Explore Midlands',
      },
      {
        key: 'lowcountry',
        id: 'lowcountry',
        name: 'Lowcountry',
        shortName: 'Lowcountry',
        blurb:
          'Charleston, Beaufort, and Lowcountry counties with historic access, humidity, and coastal HOAs.',
        challenges: [
          'Historic district access and parking',
          'Hurricane-season date risk',
        ],
        ctaLabel: 'Explore Lowcountry',
      },
      {
        key: 'pee-dee-grand-strand',
        id: 'pee-dee-grand-strand',
        name: 'Pee Dee & Grand Strand',
        shortName: 'Pee Dee / Grand Strand',
        blurb:
          'Myrtle Beach, Florence, and Pee Dee counties with tourism peaks and longer rural approaches.',
        challenges: [
          'Summer tourism congestion',
          'Confirm coverage for inland addresses',
        ],
        ctaLabel: 'Explore Pee Dee / Grand Strand',
      },
    ]),
    costs: {
      title: 'South Carolina moving costs',
      intro:
        'South Carolina pricing reflects Upstate and Charleston labor markets, coastal HOAs, humidity, and long I-26 hauls. Use ranges for planning, then inventory your home in the calculator.',
      methodology: {
        title: 'How we estimate South Carolina moving costs',
        lastReviewed: '2026-07-23',
        body: 'These ranges are planning estimates, not quotes. They combine typical South Carolina local and intrastate patterns: home size, distance, stairs, parking, HOAs, humidity, hurricane-season risk, and regional labor. Actual bids vary under Class E frameworks. Always compare written estimates from certificated movers for in-state work and FMCSA-authorized carriers for interstate work.',
      },
      ranges: [
        {
          label: 'Charleston / Greenville studio / 1BR',
          value: '$500–$2,200+',
          note: 'Historic and multi-unit access vary',
        },
        {
          label: 'Suburban 2–3BR house',
          value: '$1,600–$4,800+',
          note: 'HOAs common',
        },
        {
          label: 'Intrastate mid-size (e.g. Columbia ↔ Greenville)',
          value: '$1,700–$5,000+',
          note: 'Season matters',
        },
        {
          label: 'Intrastate long (e.g. Greenville ↔ Charleston)',
          value: '$2,000–$6,500+',
          note: 'I-26 distance drives hours',
        },
        {
          label: 'Typical 2–3 person crew (major metros)',
          value: '$115–$210+/hr',
          note: 'Portal-to-portal',
        },
      ],
      factors: [
        'Charleston historic districts constrain truck length and parking.',
        'Coastal HOAs restrict elevator and loading windows.',
        'Humidity and heat slow outdoor labor in summer.',
        'Hurricane season can force last-minute date changes.',
        'Tourism peaks on the Grand Strand congest roads and lodging for crews.',
      ],
    },
    routes: {
      title: 'Popular South Carolina moving routes',
      intro:
        'South Carolina is a major inbound Southeast destination with strong Northeast origins into Charleston, Greenville, and the Grand Strand, plus large Upstate–Lowcountry internal flows. Interstate jobs need FMCSA authority; in-state corridors need Class E certificated movers.',
      migrationProfile: 'inbound_dominant',
      outbound: [
        {
          label: 'South Carolina → Florida',
          href: '/moving-to/florida',
          origins: 'Upstate, Midlands, Lowcountry',
          transit: 'I-95 / I-26 multi-day',
          planningNote: 'Confirm FMCSA authority end-to-end.',
          note: 'Common Southeast lifestyle corridor.',
        },
        {
          label: 'South Carolina → North Carolina / Georgia',
          href: '/local-movers/north-carolina',
          origins: 'Upstate, Lowcountry',
          transit: 'Often same-day or next-day interstate',
          planningNote: 'Still interstate — confirm FMCSA authority.',
          note: 'Short cross-border metro moves are common.',
        },
        {
          label: 'South Carolina → Northeast return trips',
          href: '/local-movers/new-york',
          origins: 'Charleston, Greenville, Grand Strand',
          transit: 'Multi-day I-95',
          planningNote: 'Bi-directional traffic with strong SC inbound.',
          note: 'Often paired with inbound Northeast origin moves.',
        },
      ],
      inbound: [
        {
          label: 'Northeast → South Carolina',
          href: '/local-movers/south-carolina/charleston',
          origins: 'NY, NJ, PA, OH',
          transit: 'Multi-day I-95',
          planningNote: 'High-volume inbound into Lowcountry and Upstate.',
          note: 'Confirm interstate FMCSA authority.',
        },
        {
          label: 'Moving to Charleston County',
          href: '/local-movers/south-carolina/charleston',
          note: 'Historic access, humidity, and coastal HOAs.',
        },
        {
          label: 'Moving to Greenville County',
          href: '/local-movers/south-carolina/greenville',
          note: 'Upstate growth suburbs and I-85 logistics.',
        },
        {
          label: 'Moving to Horry County (Myrtle Beach)',
          href: '/local-movers/south-carolina/horry',
          note: 'Tourism peaks and seasonal congestion.',
        },
      ],
    },
    challenges: {
      title: 'South Carolina-specific moving challenges & tips',
      intro:
        'These issues show up constantly on real South Carolina moves — not generic national checklist filler.',
      items: [
        {
          title: 'Charleston historic access',
          detail:
            'Narrow streets, limited truck length, and parking rules are common. Share approach photos and request smaller trucks when needed.',
        },
        {
          title: 'Hurricane-season risk',
          detail:
            'June–November storms can force reschedules. Build flexible dates for coastal moves.',
        },
        {
          title: 'Coastal HOA windows',
          detail:
            'Beaufort, Charleston, and Horry communities often restrict loading hours. Get rules in writing before booking.',
        },
        {
          title: 'Grand Strand tourism peaks',
          detail:
            'Summer traffic around Myrtle Beach can double transit time. Avoid Friday arrivals when possible.',
        },
        {
          title: 'Class E certificate verification',
          detail:
            'Confirm the exact legal name and PSC/ORS Class E certificate before deposits on in-state work.',
        },
      ],
    },
    tools: SHARED_TOOLS('South Carolina'),
    faq: [
      {
        question: 'Do South Carolina movers need a Class E certificate?',
        answer:
          'Yes. Intrastate household goods carriers generally need a Class E Certificate under the ORS/PSC transportation framework. Interstate moves require FMCSA authority.',
      },
      {
        question: 'How do I verify a South Carolina mover?',
        answer:
          'Ask for the PSC/ORS certificate number and verify it with ORS. Certificate numbers should also appear on vehicles. For out-of-state legs, verify USDOT / MC on FMCSA SAFER.',
      },
      {
        question: 'How much does a local Charleston or Greenville move cost?',
        answer:
          'Planning ranges often fall around $500–$2,200+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates.',
      },
      {
        question: 'Is a Greenville-to-Charleston move intrastate?',
        answer:
          'Yes — both ends are in South Carolina, so you generally need a Class E certificated household goods carrier.',
      },
      {
        question: 'When is peak moving season in South Carolina?',
        answer:
          'Statewide peak is typically May–September. Hurricane season can add date risk for coastal moves.',
      },
      {
        question: 'Does a move from Charlotte, NC into York County need FMCSA authority?',
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
          label: 'SC ORS — Class E household goods',
          href: 'https://ors.sc.gov/regulated-utilities/transportation/class-e',
        },
        {
          label: 'SC ORS — Transportation FAQs',
          href: 'https://ors.sc.gov/consumers/transportation/transportation-faqs',
        },
        { label: 'FMCSA SAFER', href: 'https://safer.fmcsa.dot.gov/' },
        { label: 'How we score movers', href: '/about/how-we-score-movers' },
      ],
    },
    stickyNav: STICKY,
  },
};

const fileMap = [
  ['massachusetts', 'massachusettsStateResourceHub', packs.massachusetts],
  ['maryland', 'marylandStateResourceHub', packs.maryland],
  ['indiana', 'indianaStateResourceHub', packs.indiana],
  ['missouri', 'missouriStateResourceHub', packs.missouri],
  ['south-carolina', 'southCarolinaStateResourceHub', packs['south-carolina']],
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

writeFileSync(
  'lib/local-movers/state-resource-hub/registry.ts',
  `import { arizonaStateResourceHub } from '@/lib/local-movers/state-resource-hub/arizona';
import { californiaStateResourceHub } from '@/lib/local-movers/state-resource-hub/california';
import { coloradoStateResourceHub } from '@/lib/local-movers/state-resource-hub/colorado';
import { floridaStateResourceHub } from '@/lib/local-movers/state-resource-hub/florida';
import { georgiaStateResourceHub } from '@/lib/local-movers/state-resource-hub/georgia';
import { illinoisStateResourceHub } from '@/lib/local-movers/state-resource-hub/illinois';
import { indianaStateResourceHub } from '@/lib/local-movers/state-resource-hub/indiana';
import { marylandStateResourceHub } from '@/lib/local-movers/state-resource-hub/maryland';
import { massachusettsStateResourceHub } from '@/lib/local-movers/state-resource-hub/massachusetts';
import { michiganStateResourceHub } from '@/lib/local-movers/state-resource-hub/michigan';
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
import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

const PACKS: StateResourceHubPack[] = [
  arizonaStateResourceHub,
  californiaStateResourceHub,
  coloradoStateResourceHub,
  floridaStateResourceHub,
  georgiaStateResourceHub,
  illinoisStateResourceHub,
  indianaStateResourceHub,
  marylandStateResourceHub,
  massachusettsStateResourceHub,
  michiganStateResourceHub,
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

console.log('registry updated with Wave 4 (21 packs total)');
