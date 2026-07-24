import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeTxTier2Pack,
  TX_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/texas/tx-tier2-shared';

/**
 * Webb County — Texas Tier 2 (independent Laredo border logistics hub).
 * Secondary-market contract vs Bexar (San Antonio) Tier 1 — not an SA collar
 * clone. Trade-corridor moves, heat, and cross-border adjacency.
 */
export const webbCountyIntelligence: CountyIntelligencePack = finalizeTxTier2Pack({
  countySlug: 'webb',
  hubTitle: 'Webb County Moving Intelligence Hub',
  eyebrow: 'Webb County · Independent Laredo border logistics hub',
  h1: 'Moving in Webb County: Independent Laredo Hub, Trade-Corridor Moves & Border Heat Logistics',
  heroOpener:
    'Webb County is an independent Laredo border logistics hub — not San Antonio with freer freeways, and not a Bexar HOA growth collar. I-35 trade-corridor freight, Loop 20 growth, bridge-adjacent residential belts, and extreme South Texas heat form their own housing ladder under cross-border adjacency. Compared with Bexar County Tier 1 density defaults, I-35 / Loop 20 freeflow replaces downtown elevator grids, warehouse and multi-family trade-economy product is normal, and heat windows are first-class constraints. This guide is for people moving in Webb County as a secondary market with its own role — not recycled San Antonio scripts.',
  heroCredibility:
    'Independent Laredo border logistics hub · Trade-corridor moves · Extreme heat · TxDMV household goods (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-35 · US-59 · Loop 20 · SH-359 · local Laredo grid',
  parentCompare: {
    parentLabel: 'Bexar County (San Antonio) / independent border logistics',
    parentHref: '/local-movers/texas/bexar',
    title: 'Compared with Bexar County (San Antonio) Tier 1',
    intro:
      'Webb is a freestanding South Texas border logistics metro on the I-35 trade corridor — not a San Antonio suburb with different arterials. Use Bexar County as the high-density parent contrast — it is not a drop-in template for bridge-adjacent multi-family, Loop 20 growth, or Laredo heat-and-freight calendars.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Bexar crews fight Loop 1604 / I-10 / I-35 basin congestion and multi-pocket San Antonio pairs. Webb pairs ride I-35, US-59, Loop 20, SH-359, and the local Laredo grid with freer mid-day residential flow — north Loop ↔ bridge-adjacent south still burns portal-to-portal time at peak, and freight windows can stall even “simple” locals. It is not a Stone Oak ↔ downtown SA job.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Bexar mixes dense elevators, military multi-family, and north/northwest HOA growth. Webb’s ladder is Laredo core multi-unit and older grids, Loop 20 suburban growth SFH, bridge-adjacent and south trade-corridor residential, and sparse rural Webb edges — more logistics-economy multi-family and heat-exposed product, less SA master-planned default.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Webb stages more driveway, multi-family, and freight-adjacent arterial work than San Antonio elevator corridors. HOAs exist in growth pockets but are not the north Bexar operating system. Bridge and commercial traffic peaks replace dense curb-staging fights in SA core.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Webb quotes often sit below Bexar/SA rates for comparable square footage when access is simple — heat windows, freight-delayed portal time, multi-unit COI, and long rural edges still push prices up. Expect secondary-market labor rates with trade-corridor friction and extreme heat as the main premiums, not downtown scarcity fees.',
      },
      {
        title: 'Role difference',
        detail:
          'Laredo is an independent border logistics hub with its own employment base (trade, warehousing, transportation, government, retail, healthcare) — not a San Antonio bedroom collar. Treat it as its own market when matching crews and rate cards, even when households also touch Bexar for services.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Webb County different',
    intro:
      'Independent border-logistics realities — I-35 trade freight, extreme heat, bridge-adjacent multi-family, and freer Loop 20 corridors than Bexar parents — that change estimates.',
    bullets: [
      {
        title: 'Trade-corridor freight is an operational constraint',
        detail:
          'I-35 commercial peaks, warehouse districts, and bridge approaches can delay trucks even when residential addresses look simple. Buffer portal time on freight-heavy windows — San Antonio HOA habits do not transfer one-for-one.',
      },
      {
        title: 'Extreme South Texas heat is not a footnote',
        detail:
          'May–September afternoons regularly hit extreme temperatures. Prefer earliest morning load windows in peak summer; treat mid-afternoon starts as high risk for people and sealed goods.',
      },
      {
        title: 'Core vs Loop 20 growth vs bridge-adjacent belts',
        detail:
          'Downtown multi-unit, north Loop 20 SFH growth, and south/bridge-adjacent product are different jobs under one county label. “Laredo local” is too vague — put both pockets and access type on the estimate.',
      },
      {
        title: 'I-35 / Loop 20 freeflow is not SA basin — still a line item',
        detail:
          'Cross-town pairs freer than Bexar still burn billable time at school, commute, and freight peaks. Ask whether quotes are portal-to-portal, especially north Loop ↔ south bridge-adjacent.',
      },
      TX_TIER2_REG_BULLET,
    ],
  },
  zonesHeading:
    'Webb County zones: Laredo core, Loop 20 growth, bridge-adjacent / south & rural edges',
  zonesIntro:
    'Four sharp products — not a six-zone dump. Laredo core density, Loop 20 growth, bridge-adjacent/south trade belts, and rural Webb edges price and stage differently under the same heat and freight calendar.',
  zones: [
    {
      id: 'laredo-core',
      name: 'Laredo core',
      shortName: 'Laredo core',
      neighborhoods: [
        'Downtown Laredo',
        'Central multi-unit corridors',
        'Older mid-century grids',
        'In-town multi-family clusters',
        'Historic-grid residential edges',
      ],
      housingTypes:
        'Older SFH, multi-unit buildings, mid-century stock, denser street grids',
      challenges: [
        'Tighter street parking and multi-unit long carries',
        'Elevator/COI rules in some multi-unit buildings',
        'I-35 / local grid peaks into the core',
        'Extreme heat on asphalt staging without shade',
      ],
      moverTips:
        'Confirm building rules for multi-unit. Weekday earliest mornings beat heat and commercial peaks. Inventory stairs carefully in older multi-story stock. Share parking constraints on denser blocks.',
      cityKeywords: [
        'laredo',
        'downtown laredo',
        'laredo tx',
        'central laredo',
      ],
    },
    {
      id: 'loop-20-growth',
      name: 'Loop 20 / north growth',
      shortName: 'Loop 20 growth',
      neighborhoods: [
        'North Laredo Loop 20 tracts',
        'Newer SFH subdivisions',
        'Growth multi-family pockets',
        'Retail-corridor residential',
        'Between-Loop suburban product',
      ],
      housingTypes:
        'Newer SFH, some HOA tracts, townhomes, growth multi-family',
      challenges: [
        'Loop 20 peak congestion toward core and I-35',
        'HOA COI where planned communities apply',
        'Longer empty miles from south/bridge staging',
        'School-calendar Saturday demand',
      ],
      moverTips:
        'Collect HOA packets when applicable. Mid-week early starts beat heat and school traffic. Clarify north Loop ↔ downtown drive assumptions. Inventory family-volume SFH carefully.',
      cityKeywords: [
        'loop 20',
        'north laredo',
        'laredo growth',
        'loop 20 laredo',
      ],
    },
    {
      id: 'bridge-adjacent-south',
      name: 'Bridge-adjacent / south trade belts',
      shortName: 'Bridge-adjacent / south',
      neighborhoods: [
        'South Laredo residential belts',
        'Bridge-approach neighborhoods',
        'Trade-corridor multi-family',
        'Warehouse-adjacent residential pockets',
        'US-83 / south grid edges',
      ],
      housingTypes:
        'Multi-family, modest SFH, mid-century stock, logistics-adjacent residential',
      challenges: [
        'Bridge and freight peak delays on approach corridors',
        'Apartment elevator windows and COI',
        'Commercial traffic friction near warehouse districts',
        'Heat on open lots with limited shade',
      ],
      moverTips:
        'Buffer freight windows near bridge approaches. Collect apartment COI early. Do not price bridge-adjacent multi-unit like pure Loop 20 driveway SFH. Dawn starts are non-negotiable in peak summer.',
      cityKeywords: [
        'south laredo',
        'bridge laredo',
        'laredo border',
        'trade corridor laredo',
      ],
    },
    {
      id: 'rural-webb-edges',
      name: 'Rural Webb edges',
      shortName: 'Rural edges',
      neighborhoods: [
        'Outlying ranch and parcel edges',
        'SH-359 corridor communities',
        'Sparse north/west Webb approaches',
        'Agricultural-edge homes',
        'Long-approach rural SFH',
      ],
      housingTypes:
        'Rural SFH, larger-lot and ranch-adjacent properties, limited multi-unit',
      challenges: [
        'Very long empty miles from Laredo staging',
        'Unpaved or constrained rural driveways',
        'Lower service density than Loop 20 belt',
        'Extreme heat with minimal shade',
      ],
      moverTips:
        'Treat edge-to-metro pairs as long locals with honest portal-to-portal time. Mention sheds, shops, soft access, and water/rest plan for crews. Early starts are mandatory in summer heat.',
      cityKeywords: [
        'rural webb',
        'sh 359',
        'webb county rural',
        'outlying laredo',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Webb County',
    intro:
      'Same square footage prices differently by heat window, freight-delayed portal time, multi-unit COI, and whether the job is Loop 20 growth or bridge-adjacent multi-family.',
    drivers: [
      {
        title: 'Heat-constrained work windows',
        detail:
          'Summer heat compresses productive hours into mornings. Jobs that slip into peak afternoon heat may need more labor days or premium scheduling.',
      },
      {
        title: 'Trade-corridor / I-35 portal time',
        detail:
          'North Loop ↔ south bridge-adjacent pairs can burn more clock than map miles suggest when freight peaks stack — freer than SA basin, still billable.',
      },
      {
        title: 'Multi-unit access near trade economy',
        detail:
          'Elevators, COI, and short-notice apartment turnover add coordination soft costs common in logistics-economy housing stock.',
      },
      {
        title: 'Rural-edge empty miles',
        detail:
          'Longer approaches, outbuildings, and soft driveways add labor and vehicle risk — price them explicitly versus pure suburban driveway jobs.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$400–$1,250+',
        note: 'Higher with elevators, heat delays, or freight-delayed portal time',
      },
      {
        label: '2–3BR house / apartment',
        value: '$1,100–$3,400+',
        note: 'Cross-zone hauls and multi-unit access trend up',
      },
      {
        label: '3–4+ BR (cross-zone / rural edge)',
        value: '$1,900–$5,800+',
        note: 'Rural edges and peak freight/heat windows price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, heat & trade-corridor calendar intelligence',
    intro:
      'Webb peaks follow extreme heat, school calendars, and logistics-economy multi-family churn — not San Antonio lease density alone.',
    items: [
      {
        title: 'Extreme summer heat: roughly May – September',
        detail:
          'Plan early-morning loads, extra water, and heat-safe packing. Mid-afternoon moves in peak heat are high risk for people and property.',
      },
      {
        title: 'School & family calendars + multi-family churn',
        detail:
          'Late spring through early fall weekends fill first for family SFH moves; multi-family turnover follows employment and lease cycles. Book 2–3 weeks ahead when flexible.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start',
        detail:
          'Still plan around apartment elevator windows and freight peaks when applicable. Dawn starts win even in shoulder seasons when heat and I-35 are the real constraints.',
      },
    ],
  },
  specialized: [
    {
      id: 'trade-corridor-moves',
      title: 'Trade-corridor & I-35 logistics',
      intro:
        'Webb’s defining operational context is I-35 trade freight and dual-city-scale Laredo routing that San Antonio HOA jobs never write.',
      bullets: [
        'Buffer freight peaks on I-35 and bridge approaches even for residential-only addresses.',
        'Name both origin and destination pockets (e.g. Loop 20 → south bridge-adjacent); “Laredo local” hides portal time.',
        'Price commercial-traffic delay risk honestly on warehouse-adjacent belts.',
        'Confirm TxDMV vs FMCSA frameworks when any leg leaves Texas; in-state pairs still need honest drive-time assumptions.',
      ],
    },
    {
      id: 'extreme-heat-operations',
      title: 'Extreme heat operations',
      intro:
        'South Texas heat is a labor, quality, and scheduling constraint — not a comfort footnote.',
      bullets: [
        'Prefer earliest morning starts in peak summer; treat mid-afternoon loads as high risk.',
        'Request shaded staging and heat-safe packing for electronics, candles, and sealed goods.',
        'Plan water, rotation, and realistic crew endurance on open asphalt lots.',
        'If the job runs long, discuss split-day options rather than pushing into peak heat.',
      ],
    },
    {
      id: 'bridge-adjacent-multi-family',
      title: 'Bridge-adjacent multi-family access',
      intro:
        'South and bridge-approach multi-unit product brings elevator windows and freight-edge friction that pure Loop 20 driveway jobs never see.',
      bullets: [
        'Send building packets, COI requirements, and elevator reservations with the estimate.',
        'Confirm approved move hours before booking Saturday crews in multi-unit buildings.',
        'Share parking and long-carry constraints for denser south/core blocks.',
        'Do not price bridge-adjacent apartments like north Loop growth SFH.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Independent Laredo hub value, trade-economy housing, and extreme heat are different bets — validate schools and healthcare by pocket, then plan for South Texas summers.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Major systems include United ISD, Laredo ISD, and others serving Webb County addresses. Match every listing address to the correct boundary.',
        bullets: [
          {
            title: 'Multiple districts under one metro',
            detail:
              'United ISD and Laredo ISD cover different pockets; marketing neighborhood names can span feeders — verify with official boundary tools and TEA data.',
          },
          {
            title: 'Growth vs core feeders',
            detail:
              'Loop 20 growth and south/core product may not share the same systems or program offerings. Do not treat county averages as neighborhood truth.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites and TEA data should lead; third-party rankings are secondary. Tour campuses when possible.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Metro acute-care anchors',
            detail:
              'Laredo Medical Center, Doctors Hospital of Laredo, and other local campuses dominate regional care. Map ER drive times from rural edges and north Loop growth at peak heat and traffic.',
          },
          {
            title: 'Specialty & regional reality',
            detail:
              'Some specialties may require travel toward San Antonio or other hubs. Confirm insurer networks and realistic I-35 appointment times before relocating mid-treatment.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer pediatric and specialty care early if mid-treatment; book first appointments before peak summer move chaos.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Webb resources',
    intro:
      'Local official links first; directory listings are independent. Verify TxDMV household goods authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Webb County',
        href: 'https://www.webbcountytx.gov/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Laredo',
        href: 'https://www.cityoflaredo.com/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (Laredo core, Loop 20 growth, bridge-adjacent/south, rural edges) when available. Confirm heat-aware starts, freight-window buffers, and multi-unit packets — this is an independent Laredo border logistics hub, not a San Antonio collar clone.',
  lastReviewed: '2026-07-24',
});
