import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeNcPack } from '@/lib/local-movers/county-intelligence/north-carolina/nc-shared';

/** Cumberland County, NC — Fayetteville + Fort Liberty/Bragg PCS (Army), not Onslow Marines. */
export const cumberlandCountyNcIntelligence: CountyIntelligencePack = finalizeNcPack({
  countySlug: 'cumberland',
  hubTitle: 'Cumberland County Moving Intelligence Hub',
  eyebrow: 'Cumberland · Fayetteville, Fort Liberty/Bragg PCS & I-95 logistics',
  h1: 'Moving in Cumberland County: Fort Liberty PCS Timelines, Fayetteville Access & I-95 Logistics',
  heroOpener:
    'Cumberland County is a military-timeline market first: Fort Liberty (formerly Fort Bragg) PCS orders compress surveys, packing, and delivery windows; Fayetteville multi-family and HOA rings absorb high turnover; and I-95 / All American Freeway logistics dominate pairs that look “local” on a map. A base-adjacent apartment, a Haymount older home, a Cross Creek multi-family unit, and a western HOA two-story do not share truck access or order-driven timing. This hub is for Cumberland — not Onslow/Camp Lejeune copy with a different base name, and not a Piedmont metro page.',
  heroCredibility:
    'NCUC household goods certificate (C-#) for intrastate NC moves · FMCSA for interstate · Fort Liberty/Bragg PCS timeline awareness · Curated listings',
  majorCorridors: 'I-95 · All American Freeway · NC-24 · NC-87 · Bragg Boulevard · Raeford Road',
  whatMakesDifferent: {
    title: 'What makes moving in Cumberland County different',
    intro: 'PCS-driven calendars and base-adjacent housing turnover — Army installation logistics, not Marine Onslow or Charlotte towers.',
    bullets: [
      { title: 'PCS orders rewrite booking lead time', detail: 'Military household moves often have fixed report dates. Flexible civilian weekend windows are not the default.' },
      { title: 'High multi-family turnover near base-access corridors', detail: 'Elevators, tight parking, and lease-end clusters stack around training and permanent-change cycles.' },
      { title: 'I-95 and All American Freeway define portal time', detail: 'Cross-town and regional pairs burn clock at peak and during training-related traffic pulses.' },
      { title: 'Weight tickets, inventories, and military paperwork expectations', detail: 'Even when using civilian movers for local legs, documentation quality matters for claims and timelines.' },
      { title: 'Cumberland is not Onslow', detail: 'Fort Liberty/Bragg patterns differ from Camp Lejeune coastal-plain logistics. Do not reuse Jacksonville base copy here.' },
      { title: 'Intrastate NC rules vs interstate authority', detail: 'In-state household moves generally need NCUC C-#. Interstate PCS legs need FMCSA USDOT/MC.' },
    ],
  },
  zonesHeading: 'Cumberland access zones',
  zonesIntro: 'Plan by base-adjacent multi-family, central Fayetteville, western HOA growth, eastern approaches, and I-95 commercial edges.',
  zones: [
    {
      id: 'base-adjacent',
      name: 'Fort Liberty–adjacent multi-family & corridors',
      shortName: 'Base-adjacent',
      neighborhoods: ['Bragg Boulevard corridors', 'All American Freeway multi-family', 'Spring Lake edges', 'Base housing-adjacent rentals'],
      housingTypes: 'Multi-family, townhomes, military-workforce rentals',
      challenges: ['PCS lease-end waves', 'Gate/access timing', 'Tight guest parking'],
      moverTips: 'Confirm access rules and IDs early. Book to order dates, not only preferred Saturdays. Photo elevator and parking.',
      cityKeywords: ['fort liberty', 'fort bragg', 'bragg', 'spring lake', 'all american'],
    },
    {
      id: 'central-fayetteville',
      name: 'Central Fayetteville & Haymount',
      shortName: 'Central Fayetteville',
      neighborhoods: ['Haymount', 'Downtown Fayetteville', 'Massey Hill edges', 'Person Street corridor'],
      housingTypes: 'Older SFH, multi-story walk-ups, limited multi-family',
      challenges: ['Stairs and curb friction', 'Mixed older stock', 'Local arterial congestion'],
      moverTips: 'Photo stairs and curb. Prefer mid-week mornings. Confirm unit access type.',
      cityKeywords: ['fayetteville', 'haymount', 'downtown', 'massey hill'],
    },
    {
      id: 'west-growth',
      name: 'Western HOA growth & Raeford Road corridors',
      shortName: 'West growth',
      neighborhoods: ['Raeford Road corridor', 'Hope Mills edges', 'Western HOA villages', 'NC-87 multi-family'],
      housingTypes: 'HOA SFH, townhomes, multi-family',
      challenges: ['HOA gate lists', 'Longer empty miles from base-edge yards', 'Peak arterial congestion'],
      moverTips: 'Collect HOA packets early. Price long west-county pairs honestly.',
      cityKeywords: ['hope mills', 'raeford road', 'west fayetteville'],
    },
    {
      id: 'east-i95',
      name: 'Eastern approaches & I-95 edges',
      shortName: 'East / I-95',
      neighborhoods: ['I-95 multi-family', 'Eastern Fayetteville tracts', 'Commercial corridor edges'],
      housingTypes: 'Multi-family, tract SFH, commercial-adjacent residential',
      challenges: ['I-95 freight peaks', 'Longer regional empty miles', 'Varied driveway access'],
      moverTips: 'Build I-95 buffer. Clarify long-distance vs local leg assumptions on estimates.',
      cityKeywords: ['i-95', 'east fayetteville', 'eastover edges'],
    },
  ],
  costDrivers: {
    title: 'What drives Cumberland moving costs',
    intro: 'PCS timing pressure, multi-family access, and I-95 empty miles drive quotes.',
    drivers: [
      { title: 'Compressed PCS timelines', detail: 'Rush calendars and limited flexibility raise peak pricing risk.' },
      { title: 'Multi-family elevators and parking', detail: 'Base-adjacent apartments add labor and wait time.' },
      { title: 'I-95 / All American congestion', detail: 'Portal-to-portal spikes at peak.' },
      { title: 'Documentation and inventory rigor', detail: 'Thorough surveys reduce claims risk on military-related moves.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$400–$1,250+', note: 'Higher near base multi-family peaks' },
      { label: '2–3BR apartment or modest SFH', value: '$1,200–$3,500+', note: 'PCS rush windows trend up' },
      { label: '3–4+ BR / long local / interstate start', value: '$2,200–$7,500+', note: 'Interstate PCS legs are full household goods jobs' },
      { label: 'Typical 2-person crew rate', value: '$100–$175+/hr', note: 'Portal-to-portal for local legs' },
    ],
  },
  seasonal: {
    title: 'When to schedule a Cumberland move',
    intro: 'Military PCS seasons and family calendars stack demand more tightly than pure civilian metros.',
    items: [
      { title: 'PCS peak seasons', detail: 'Summer and other high-volume PCS windows fill crews first. Book to order dates immediately.' },
      { title: 'Best civilian windows: mid-week early mornings', detail: 'Reduce arterial pain when orders allow flexibility.' },
      { title: 'Lease-end multi-family clusters', detail: 'Month-end apartment turns near base corridors fill early.' },
      { title: 'Summer heat and storms', detail: 'Prefer early starts; confirm weather contingency for outdoor staging.' },
    ],
  },
  specialized: [
    {
      id: 'fort-liberty-pcs',
      title: 'Fort Liberty / Bragg PCS logistics module',
      intro: 'Cumberland estimates fail when military report dates and base-access rules are treated as optional.',
      bullets: [
        'Align survey, pack, and delivery to official PCS timelines — not only preferred Saturdays.',
        'Confirm IDs, gate rules, and building access for base-adjacent multi-family.',
        'Demand written inventories and valuation discussions early.',
        'Price All American Freeway and I-95 pairs portal-to-portal.',
        'Verify NCUC C-# for in-state-only legs and FMCSA for interstate PCS shipments.',
        'Do not reuse Camp Lejeune coastal-plain assumptions here.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Cumberland County?',
    intro: 'Practical fit checklist for military and civilian households — verify on official sources. No invented rankings.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          { title: 'How districts work here', detail: 'Cumberland County Schools is the primary public K–12 system. Assignment is address-based; military families should confirm zoning for off-post housing.' },
          { title: 'Turnover and capacity', detail: 'High military mobility can affect enrollment patterns. Ask schools about calendars and capacity when touring.' },
          { title: 'Research sources', detail: 'District tools, NCDPI data, and school visits beat ranking screenshots.' },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare access',
        bullets: [
          { title: 'Major systems', detail: 'Cape Fear Valley and other facilities serve Fayetteville corridors; military beneficiaries also navigate TRICARE networks. Confirm coverage.' },
          { title: 'What relocators should do', detail: 'Map drive times from base-adjacent housing to preferred campuses. Transfer records early.' },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          { title: 'Base-adjacent vs city stock', detail: 'Multi-family turnover near corridors; older SFH in central pockets; HOA growth west.' },
          { title: 'Military housing decisions', detail: 'On-post vs off-post choices change commute and move-day access rules. Read leases carefully.' },
          { title: 'Cost variation', detail: 'Prices vary by corridor. Budget for HOA dues and frequent turnover wear on rentals.' },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Cumberland areas fit whom',
        bullets: [
          { title: 'Base-adjacent convenience', detail: 'Suits short commute to installation gates with multi-family logistics on move day.' },
          { title: 'Central Fayetteville pattern', detail: 'Older neighborhoods and mixed stock with stair/curb tradeoffs.' },
          { title: 'Western HOA growth', detail: 'Newer product and space with longer portal time toward base gates.' },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute patterns',
        bullets: [
          { title: 'Employment anchors', detail: 'Military installation, healthcare, education, retail, and logistics shape local employment.' },
          { title: 'Commute realism', detail: 'Bragg Boulevard, All American Freeway, and I-95 peaks are real. Test drive peak routes.' },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          { title: 'Military-community identity', detail: 'Cumberland rhythms follow installation calendars more than banking or research metros.' },
          { title: 'Climate', detail: 'Hot humid summers and storms. Plan outdoor staging contingency.' },
          { title: 'Pace', detail: 'PCS seasons feel busier. Visit peak and off-peak when choosing housing.' },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Cumberland resources',
    intro: 'Official links first. Verify NCUC in-state and FMCSA interstate.',
    items: [
      { label: 'Cumberland County — official site', href: 'https://www.cumberlandcountync.gov/', external: true },
      { label: 'City of Fayetteville', href: 'https://www.fayettevillenc.gov/', external: true },
      { label: 'Cumberland County Schools', href: 'https://www.ccs.k12.nc.us/', external: true },
      { label: 'Fort Liberty (official Army site)', href: 'https://home.army.mil/liberty/', external: true, note: 'Installation information; confirm access rules for contractors' },
      { label: 'NCDOT traffic / 511', href: 'https://drivenc.gov/', external: true },
    ],
  },
  directoryHint:
    'Prefer PCS-fluent crews for Fort Liberty timelines; multi-family elevator experience on base-adjacent corridors; honest I-95/All American pricing. Verify NCUC C-# and FMCSA for the correct move type.',
  lastReviewed: '2026-07-23',
});
