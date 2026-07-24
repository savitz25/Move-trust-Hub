import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeTxTier2Pack,
  TX_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/texas/tx-tier2-shared';

/**
 * Midland County — Texas Tier 2 (independent Midland Permian energy hub).
 * Secondary-market contract vs Houston / DFW Tier 1 density defaults — pair
 * context with Ector/Odessa but unique H1/zones (office/energy HQ product).
 * Not an Odessa clone.
 */
export const midlandCountyIntelligence: CountyIntelligencePack = finalizeTxTier2Pack({
  countySlug: 'midland',
  hubTitle: 'Midland County Moving Intelligence Hub',
  eyebrow: 'Midland County · Independent Permian energy hub · Midland (pair Odessa/Ector)',
  h1: 'Moving in Midland County: Permian Energy HQ Hub, Workforce Turnover & Loop 250 Logistics',
  heroOpener:
    'Midland County is an independent Permian Basin energy hub centered on Midland — office, professional, and energy-HQ product with rapid workforce turnover — not Houston with freer freeways, and not Odessa with a different nameplate. Downtown multi-unit and professional stock, Loop 250 suburban growth, SH-349 / west industrial-adjacent edges, and desert heat form their own housing ladder. Compared with Houston / DFW Tier 1 density defaults, I-20 / Loop 250 freeflow replaces multi-county basin gridlock; compared with neighboring Ector/Odessa, Midland skews more corporate/HQ and planned suburban product than industrial-residential mix. This guide is for people moving in Midland as its own energy-metro market — pair context with Odessa, not a recycled Odessa or Triangle script.',
  heroCredibility:
    'Independent Midland Permian energy hub · Workforce turnover · Extreme heat · TxDMV household goods (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-20 · SH-349 · Loop 250 · SH-158 · local Midland grid',
  parentCompare: {
    parentLabel: 'Texas Triangle Tier 1 metros (Harris / Dallas density defaults)',
    parentHref: '/local-movers/texas/harris',
    title: 'Compared with Houston / DFW Tier 1 density defaults',
    intro:
      'Midland is a freestanding Permian energy metro far west of the Texas Triangle — with Odessa/Ector as the adjacent pair market, not a drop-in template. Use Houston and DFW as high-density parent contrasts — neither is a template for energy-workforce apartment churn, Loop 250 growth, or desert-heat industrial last-mile.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Houston and DFW crews fight multi-freeway basins. Midland pairs ride I-20, SH-349, Loop 250, SH-158, and the local Midland grid with freer mid-day flow — downtown ↔ Loop 250 still burns portal-to-portal time at peak, and Midland ↔ Odessa pair hauls are classic underquoted “locals.” Isolation from the Triangle means long-haul deadhead, not short-hop collar spillover.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Harris/Dallas mix dense elevators, master-planned HOA villages, and multi-county suburban product. Midland’s ladder is downtown/professional multi-unit, Loop 250 suburban SFH and HOA growth, west/SH-349 industrial-adjacent edges, and sparse rural Midland parcels — more energy-workforce and HQ-adjacent product than Triangle tech-HOA default. Odessa (Ector) skews more industrial-residential; do not merge the two city products.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Midland stages more driveway, growth-HOA, and energy multi-family work than Houston elevator corridors. HOAs exist on Loop 250 growth but are not the Frisco/Katy operating system. Oilfield commercial traffic and incomplete industrial-edge approaches replace dense curb-staging fights.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Midland quotes often sit below Houston/DFW rates for comparable square footage when access is simple — heat windows, workforce peak churn, Loop 250 time, and Midland ↔ Odessa empty miles still push prices up. Expect secondary-market labor rates with energy seasonality and desert heat as the main premiums, not basin gridlock fees.',
      },
      {
        title: 'Role difference',
        detail:
          'Midland is an independent Permian energy HQ metro with its own employment base (upstream energy offices, professional services, healthcare, retail, government) — not a Houston bedroom collar and not a thinner Odessa zone. Treat Midland and Odessa as a pair of distinct city products under adjacent counties.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Midland County different',
    intro:
      'Independent Permian-HQ realities — energy workforce turnover, Loop 250 growth product, desert heat, and freer I-20 corridors than Triangle parents — that change estimates (and differ from Odessa industrial-residential scripts).',
    bullets: [
      {
        title: 'Energy workforce turnover rewrites demand',
        detail:
          'Oil & gas cycle hiring, short-notice multi-family moves, and corporate/HQ apartment churn pack end-of-month crews. Peak boom windows require earlier booking than civilian-only Triangle suburb calendars.',
      },
      {
        title: 'Midland HQ/suburban product ≠ Odessa industrial mix',
        detail:
          'Loop 250 planned growth, downtown professional multi-unit, and SH-349 edges are different from Odessa’s industrial-residential ladder. “Permian local” is too vague — name Midland vs Odessa and access type on the estimate.',
      },
      {
        title: 'Desert heat is an operational constraint',
        detail:
          'May–September afternoons regularly hit extreme temperatures. Prefer earliest morning load windows; treat mid-afternoon starts as high risk — Houston humidity habits do not transfer one-for-one to open Permian staging.',
      },
      {
        title: 'I-20 / Loop 250 freeflow is not Houston basin — still a line item',
        detail:
          'Cross-town and Midland ↔ Odessa pairs freer than Harris still burn billable time at school, shift, and commute peaks. Ask whether quotes are portal-to-portal.',
      },
      TX_TIER2_REG_BULLET,
    ],
  },
  zonesHeading:
    'Midland County zones: Downtown/HQ core, Loop 250 suburban, SH-349 / west edges & rural Midland',
  zonesIntro:
    'Four sharp products — not a six-zone dump and not an Odessa zone map. Midland downtown/HQ multi-unit, Loop 250 suburban growth, SH-349/west industrial-adjacent edges, and rural Midland parcels price and stage differently under the same desert heat calendar.',
  zones: [
    {
      id: 'midland-downtown-hq',
      name: 'Downtown / energy HQ core',
      shortName: 'Downtown / HQ',
      neighborhoods: [
        'Downtown Midland',
        'Professional multi-unit corridors',
        'Energy-office adjacent apartments',
        'Older mid-century grids',
        'Central multi-family clusters',
      ],
      housingTypes:
        'Multi-unit buildings, mid-century stock, professional apartments, limited older SFH',
      challenges: [
        'Elevator/COI rules and short-notice workforce moves',
        'Tighter street parking and long carries',
        'I-20 / local grid peaks into the core',
        'Extreme heat on asphalt staging without shade',
      ],
      moverTips:
        'Collect building packets and elevator windows early — workforce turnover compresses lead times. Weekday dawn starts beat heat and office-shift peaks. Inventory carefully for partial loads common in energy transfers.',
      cityKeywords: [
        'midland',
        'downtown midland',
        'midland tx',
        'midland apartments',
      ],
    },
    {
      id: 'loop-250-suburban',
      name: 'Loop 250 suburban growth',
      shortName: 'Loop 250',
      neighborhoods: [
        'North / east Loop 250 tracts',
        'Newer HOA SFH subdivisions',
        'Family suburban growth',
        'Retail-corridor multi-family pockets',
        'Established Loop residential belts',
      ],
      housingTypes:
        'Suburban SFH, HOA planned communities, townhomes, growth multi-family',
      challenges: [
        'Loop 250 peak congestion toward core and I-20',
        'HOA COI, approved hours, and gate lists where applicable',
        'School-calendar Saturday demand for family SFH',
        'Summer heat on open cul-de-sacs',
      ],
      moverTips:
        'Send HOA packets with the estimate. Mid-week early starts beat heat and school traffic. Clarify Loop 250 ↔ downtown portal assumptions. Inventory family-volume SFH carefully — suburban loads often exceed downtown apartments.',
      cityKeywords: [
        'loop 250',
        'north midland',
        'midland suburban',
        'loop 250 midland',
      ],
    },
    {
      id: 'sh349-west-edges',
      name: 'SH-349 / west industrial-adjacent edges',
      shortName: 'SH-349 / west',
      neighborhoods: [
        'West Midland residential edges',
        'SH-349 corridor product',
        'Industrial-adjacent SFH and multi-family',
        'Oilfield-service commercial fringes',
        'Between Midland and west approaches',
      ],
      housingTypes:
        'Modest SFH, multi-family, industrial-edge residential, limited larger-lot product',
      challenges: [
        'Commercial and oilfield traffic peaks on SH-349',
        'Varied access vs pure Loop 250 HOA product',
        'Heat and dust on open staging',
        'Underquoted edges toward Odessa pair hauls',
      ],
      moverTips:
        'Buffer industrial traffic windows. Do not price SH-349 edges like Loop 250 HOA villages. Name Midland ↔ Odessa pairs explicitly when either address crosses the pair metro. Dawn starts remain mandatory in peak heat.',
      cityKeywords: [
        'sh 349',
        'west midland',
        'midland industrial',
        '349 midland',
      ],
    },
    {
      id: 'rural-midland-edges',
      name: 'Rural Midland edges',
      shortName: 'Rural edges',
      neighborhoods: [
        'Outlying Midland County parcels',
        'SH-158 corridor edges',
        'Ranch and larger-lot homes',
        'Sparse north/south approaches',
        'Agricultural / oilfield-edge residential',
      ],
      housingTypes:
        'Rural SFH, larger-lot edges, limited multi-unit, ranch-adjacent properties',
      challenges: [
        'Long empty miles from Loop 250 / core staging',
        'Unpaved or constrained rural driveways',
        'Lower service density than suburban belt',
        'Extreme heat with minimal shade',
      ],
      moverTips:
        'Treat edge-to-metro pairs as long locals. Mention sheds, shops, soft access, and crew heat plans on the survey. Prefer mid-week dawn starts; do not use pure suburban rate cards blindly.',
      cityKeywords: [
        'rural midland',
        'sh 158',
        'midland county rural',
        'outlying midland',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Midland County',
    intro:
      'Same square footage prices differently by heat window, workforce peak churn, HOA soft costs on Loop 250, and whether the job is HQ multi-unit or rural long local — and whether it crosses into Odessa/Ector.',
    drivers: [
      {
        title: 'Energy workforce peak capacity',
        detail:
          'Boom and transfer seasons tighten crews near multi-family and can push rates or lead times — book early when possible.',
      },
      {
        title: 'Loop 250 / I-20 portal time',
        detail:
          'Downtown ↔ Loop 250 or Midland ↔ Odessa pairs can burn more clock than map miles suggest at peak — freer than Triangle basins, still billable.',
      },
      {
        title: 'Heat-constrained work windows',
        detail:
          'Summer heat compresses productive hours into mornings. Jobs that slip into peak afternoon heat may need more labor or premium scheduling.',
      },
      {
        title: 'HOA soft costs on growth tracts',
        detail:
          'COI, approved hours, and gate coordination on Loop 250 villages add paperwork and can force weekday-only windows.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$400–$1,300+',
        note: 'Higher with elevators, workforce peaks, or heat delays',
      },
      {
        label: '2–3BR house / apartment',
        value: '$1,200–$3,600+',
        note: 'Loop 250 HOA and cross-zone hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / pair-metro / rural)',
        value: '$2,000–$6,000+',
        note: 'Odessa pair hauls and rural edges price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, heat & energy-workforce calendar intelligence',
    intro:
      'Midland peaks follow energy hiring cycles, school calendars, and desert heat — not Houston Energy Corridor elevators alone, and not Odessa industrial defaults alone.',
    items: [
      {
        title: 'Energy workforce churn windows',
        detail:
          'Hiring and transfer seasons (often stacked with summer) fill multi-family crews. Book as soon as start dates allow.',
      },
      {
        title: 'Extreme summer heat: roughly May – September',
        detail:
          'Plan early-morning loads, extra water, and heat-safe packing. Mid-afternoon moves in peak heat are high risk for people and property.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start outside boom crush',
        detail:
          'Still plan around apartment elevator windows and HOA weekday rules when applicable. Dawn starts win even in shoulder seasons when heat and arterials are the real constraints.',
      },
    ],
  },
  specialized: [
    {
      id: 'energy-workforce-turnover',
      title: 'Energy workforce & HQ multi-family logistics',
      intro:
        'Midland’s volume problem often sits in corporate/HQ apartments and short-notice transfers — different inventory and timing than Odessa industrial-residential defaults.',
      bullets: [
        'Book early for known transfer and hiring windows; peak capacity disappears first near downtown multi-family.',
        'Collect apartment COI and elevator reservations before the survey is final.',
        'Inventory carefully for partial loads, storage-in-transit, and corporate-relocation profiles.',
        'Share parking and long-carry constraints for denser HQ-core blocks.',
      ],
    },
    {
      id: 'loop250-hoa-growth',
      title: 'Loop 250 HOA & suburban growth',
      intro:
        'Planned Loop 250 product brings HOA soft costs and family-volume SFH that pure downtown apartment jobs never see.',
      bullets: [
        'Send HOA management packets, COI requirements, and gate lists with the estimate.',
        'Confirm approved move hours before booking Saturday crews in planned villages.',
        'Inventory family-volume SFH carefully — suburban loads often exceed downtown multi-unit.',
        'Price Loop 250 ↔ downtown portal time honestly at school and commute peaks.',
      ],
    },
    {
      id: 'heat-industrial-last-mile',
      title: 'Desert heat & industrial last-mile (SH-349 / I-20)',
      intro:
        'Permian heat plus oilfield-adjacent commercial traffic need operational plans Triangle HOA jobs never write.',
      bullets: [
        'Prefer earliest morning starts in peak summer; treat mid-afternoon loads as high risk.',
        'Buffer SH-349 and I-20 commercial peaks on industrial-adjacent edges.',
        'Request shaded staging and heat-safe packing for electronics and sealed goods.',
        'Clarify whether Midland ↔ Odessa pairs still use a pure local rate card or a long-local schedule.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Independent Midland energy-hub value, Loop 250 growth, and desert heat are different bets from Odessa industrial mix — validate schools and healthcare by pocket, then plan for workforce calendars.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Major systems include Midland ISD and others serving Midland County addresses. Match every listing address to the correct boundary.',
        bullets: [
          {
            title: 'District boundary check',
            detail:
              'Use official Midland ISD boundary tools and TEA resources. Marketing neighborhood names and new Loop 250 tracts can span feeders.',
          },
          {
            title: 'Growth vs core feeders',
            detail:
              'Loop 250 growth and downtown product may not share the same campuses or capacity stories. Do not treat county averages — or Odessa ISD patterns — as Midland truth.',
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
            title: 'Midland acute-care anchors',
            detail:
              'Midland Memorial Hospital and other Midland-area campuses dominate local care; some households also use Odessa facilities in the pair metro. Map ER drive times from rural edges and Loop 250 at peak traffic.',
          },
          {
            title: 'Specialty & regional reality',
            detail:
              'Some specialties may require travel toward larger Texas metros. Confirm insurer networks and realistic long-drive plans before relocating mid-treatment.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer pediatric and specialty care early if mid-treatment; book first appointments before peak summer heat and workforce-move chaos.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Midland resources',
    intro:
      'Local official links first; directory listings are independent. Verify TxDMV household goods authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Midland County',
        href: 'https://www.co.midland.tx.us/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Midland',
        href: 'https://www.midlandtexas.gov/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (Downtown/HQ, Loop 250, SH-349/west, rural edges) when available. Confirm workforce multi-unit packets, Loop 250 HOA rules, heat-aware starts, and honest Midland ↔ Odessa pair assumptions — this is Midland energy-HQ product, not an Odessa clone.',
  lastReviewed: '2026-07-24',
});
