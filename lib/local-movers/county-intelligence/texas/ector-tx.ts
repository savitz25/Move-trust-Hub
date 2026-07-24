import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeTxTier2Pack,
  TX_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/texas/tx-tier2-shared';

/**
 * Ector County — Texas Tier 2 (Odessa / Permian pair with Midland).
 * MUST feel distinct from Midland: Odessa industrial/residential mix vs
 * Midland office/energy HQ product. Unique H1, zones, and specialized modules.
 */
export const ectorCountyIntelligence: CountyIntelligencePack = finalizeTxTier2Pack({
  countySlug: 'ector',
  hubTitle: 'Ector County Moving Intelligence Hub',
  eyebrow: 'Ector County · Odessa / Permian pair with Midland · industrial-residential',
  h1: 'Moving in Ector County: Odessa Industrial-Residential Mix, Loop 338 Logistics & Permian Pair Hauls',
  heroOpener:
    'Ector County is the Odessa side of the Permian pair — industrial-residential mix, working multi-family, and Loop 338 / US-385 product — not Midland’s energy-HQ and Loop 250 HOA script with a different nameplate. Downtown Odessa grids, east US-385 corridors, industrial-edge SFH, and desert heat form their own housing ladder under oilfield commercial traffic. Compared with Houston / DFW Tier 1 density defaults, I-20 freeflow replaces basin gridlock; compared with Midland, expect more industrial last-mile and fewer planned suburban HOA villages. This guide is for people moving in Ector/Odessa as its own energy-metro product — pair context with Midland, not a recycled Midland pack.',
  heroCredibility:
    'Odessa / Permian pair with Midland · Industrial-residential mix · Extreme heat · TxDMV household goods (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-20 · US-385 · Loop 338 · SH-191 · local Odessa grid',
  parentCompare: {
    parentLabel: 'Texas Triangle Tier 1 metros (Harris / Dallas density defaults)',
    parentHref: '/local-movers/texas/harris',
    title: 'Compared with Houston / DFW Tier 1 density defaults',
    intro:
      'Ector is a freestanding Permian energy metro centered on Odessa — with Midland as the adjacent pair market, not a drop-in template. Use Houston and DFW as high-density parent contrasts — neither is a template for Odessa industrial-residential product, Loop 338 logistics, or desert-heat workforce moves. Midland’s HQ/suburban ladder is a sibling market, not a clone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Houston and DFW crews fight multi-freeway basins. Ector pairs ride I-20, US-385, Loop 338, SH-191, and the local Odessa grid with freer mid-day flow — east Odessa ↔ west industrial edges still burn portal-to-portal time at peak, and Odessa ↔ Midland pair hauls are classic underquoted “locals.” Isolation from the Triangle means long-haul deadhead, not short-hop collar spillover.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Harris/Dallas mix dense elevators and master-planned HOA villages. Ector’s ladder is Odessa core multi-unit and older grids, Loop 338 industrial-residential belts, east US-385 working and multi-family product, and sparse rural Ector parcels — more industrial-edge and workforce SFH than Midland’s Loop 250 planned growth and downtown HQ apartments. Do not merge Odessa and Midland city products under one estimate.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Ector stages more driveway, industrial-edge, and working multi-family access than Houston elevator corridors. HOAs exist but are thinner than Midland Loop 250 planned villages. Oilfield commercial traffic, yard approaches, and incomplete industrial streets replace dense curb-staging fights.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Ector quotes often sit below Houston/DFW rates for comparable square footage when access is simple — heat windows, industrial last-mile friction, workforce peak churn, and Odessa ↔ Midland empty miles still push prices up. Expect secondary-market labor rates with industrial access and desert heat as the main premiums — not Midland HOA soft costs alone.',
      },
      {
        title: 'Role difference',
        detail:
          'Odessa is the industrial-residential side of the Permian pair metro — field services, industrial employment, and working housing stock — not Midland’s energy-HQ office product and not a Triangle bedroom collar. Treat Ector and Midland as adjacent but distinct markets when matching crews and rate cards.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Ector County different',
    intro:
      'Odessa industrial-residential realities — Loop 338 logistics, oilfield last-mile, workforce multi-family, and freer I-20 corridors than Triangle parents — that change estimates (and differ from Midland HQ/Loop 250 scripts).',
    bullets: [
      {
        title: 'Industrial-residential mix is the default product',
        detail:
          'Working SFH near service yards, multi-family near industrial corridors, and incomplete approaches are first-class jobs. Midland Loop 250 HOA habits do not transfer one-for-one to Odessa industrial edges.',
      },
      {
        title: 'Odessa ≠ Midland under one “Permian local” label',
        detail:
          'Downtown Odessa grids, Loop 338 belts, and US-385 east product differ from Midland HQ multi-unit and planned suburban growth. Name both cities and access type on every estimate — especially pair-metro hauls.',
      },
      {
        title: 'Desert heat is an operational constraint',
        detail:
          'May–September afternoons regularly hit extreme temperatures. Prefer earliest morning load windows; treat mid-afternoon starts as high risk for people and sealed goods.',
      },
      {
        title: 'I-20 / Loop 338 freeflow is not Houston basin — still a line item',
        detail:
          'Cross-town and Odessa ↔ Midland pairs freer than Harris still burn billable time at school, shift, and industrial peaks. Ask whether quotes are portal-to-portal.',
      },
      TX_TIER2_REG_BULLET,
    ],
  },
  zonesHeading:
    'Ector County zones: Odessa core, Loop 338 industrial-residential, US-385 east & rural Ector',
  zonesIntro:
    'Four sharp products — not a six-zone dump and not a Midland zone map. Odessa core density, Loop 338 industrial-residential mix, east US-385 corridors, and rural Ector edges price and stage differently under the same desert heat calendar.',
  zones: [
    {
      id: 'odessa-core',
      name: 'Odessa core',
      shortName: 'Odessa core',
      neighborhoods: [
        'Downtown Odessa',
        'Central multi-unit corridors',
        'Older mid-century grids',
        'In-town multi-family clusters',
        'Historic-grid residential edges',
      ],
      housingTypes:
        'Older SFH, multi-unit buildings, mid-century stock, working multi-family',
      challenges: [
        'Tighter street parking and multi-unit long carries',
        'Elevator/COI rules in some multi-unit buildings',
        'I-20 / local grid peaks into the core',
        'Extreme heat on asphalt staging without shade',
      ],
      moverTips:
        'Confirm building rules for multi-unit. Weekday earliest mornings beat heat and shift peaks. Inventory stairs carefully in older multi-story stock. Do not price Odessa core like Midland Loop 250 HOA villages.',
      cityKeywords: [
        'odessa',
        'downtown odessa',
        'odessa tx',
        'central odessa',
      ],
    },
    {
      id: 'loop-338-industrial-residential',
      name: 'Loop 338 industrial-residential mix',
      shortName: 'Loop 338 industrial-res',
      neighborhoods: [
        'Loop 338 residential belts',
        'Industrial-adjacent SFH',
        'Service-yard edge neighborhoods',
        'Working multi-family pockets',
        'Between-loop commercial fringes',
      ],
      housingTypes:
        'Working SFH, multi-family, industrial-edge residential, limited HOA product',
      challenges: [
        'Oilfield and commercial traffic peaks on Loop 338',
        'Yard approaches, soft shoulders, incomplete paving',
        'Dust, heat, and limited shade on open staging',
        'Access photos required — not interchangeable with Midland planned SFH',
      ],
      moverTips:
        'Require driveway and turnaround photos near industrial edges. Buffer commercial traffic windows. Price sheds, shops, and long carries explicitly. Dawn starts are non-negotiable in peak summer heat.',
      cityKeywords: [
        'loop 338',
        'odessa industrial',
        'loop 338 odessa',
        'ector industrial',
      ],
    },
    {
      id: 'us385-east',
      name: 'US-385 east corridors',
      shortName: 'US-385 east',
      neighborhoods: [
        'East Odessa residential',
        'US-385 multi-family corridors',
        'Workforce apartment belts',
        'Established east SFH tracts',
        'Toward Midland pair approaches',
      ],
      housingTypes:
        'Multi-family, modest SFH, workforce apartments, mid-century stock',
      challenges: [
        'US-385 / SH-191 peak congestion toward Midland pair',
        'Short-notice workforce multi-family churn',
        'Apartment elevator windows and COI',
        'Underquoted Odessa ↔ Midland “local” hauls',
      ],
      moverTips:
        'Name Odessa ↔ Midland pairs explicitly with honest portal time on I-20 / SH-191 / US-385. Collect apartment COI early for workforce multi-family. Prefer mid-week dawn starts over peak shift-change windows.',
      cityKeywords: [
        'us 385',
        'east odessa',
        'sh 191',
        'odessa midland',
      ],
    },
    {
      id: 'rural-ector-edges',
      name: 'Rural Ector edges',
      shortName: 'Rural edges',
      neighborhoods: [
        'Outlying Ector County parcels',
        'Oilfield-edge residential',
        'Ranch and larger-lot homes',
        'Sparse west/south approaches',
        'Long-approach rural SFH',
      ],
      housingTypes:
        'Rural SFH, larger-lot and ranch-adjacent properties, limited multi-unit',
      challenges: [
        'Very long empty miles from Odessa staging',
        'Unpaved or constrained rural driveways',
        'Lower service density than Loop 338 belt',
        'Extreme heat with minimal shade',
      ],
      moverTips:
        'Treat edge-to-metro pairs as long locals. Mention sheds, shops, soft access, and crew heat plans on the survey. Prefer mid-week dawn starts; do not use pure core multi-unit rate cards blindly.',
      cityKeywords: [
        'rural ector',
        'ector county rural',
        'outlying odessa',
        'west odessa rural',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Ector County',
    intro:
      'Same square footage prices differently by heat window, industrial last-mile friction, workforce multi-unit COI, and whether the job is Odessa core or Midland pair-metro long local — not Midland Loop 250 HOA soft costs alone.',
    drivers: [
      {
        title: 'Industrial last-mile & access risk',
        detail:
          'Yard approaches, soft shoulders, incomplete streets, and outbuildings add labor hours and vehicle risk — photos prevent underquotes.',
      },
      {
        title: 'Odessa ↔ Midland pair portal time',
        detail:
          'Pair-metro hauls on I-20 / SH-191 / US-385 can burn more clock than map miles suggest at peak — freer than Triangle basins, still billable.',
      },
      {
        title: 'Heat-constrained work windows',
        detail:
          'Summer heat compresses productive hours into mornings. Jobs that slip into peak afternoon heat may need more labor or premium scheduling.',
      },
      {
        title: 'Workforce multi-unit churn',
        detail:
          'Short-notice apartments and elevator windows add coordination soft costs common in industrial-economy housing stock.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$400–$1,300+',
        note: 'Higher with elevators, industrial access, or heat delays',
      },
      {
        label: '2–3BR house / apartment',
        value: '$1,200–$3,600+',
        note: 'Industrial edges and cross-zone hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / pair-metro / rural)',
        value: '$2,000–$6,000+',
        note: 'Midland pair hauls and rural edges price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, heat & industrial-workforce calendar intelligence',
    intro:
      'Ector peaks follow oilfield employment cycles, school calendars, and desert heat — not Midland HQ apartment defaults alone, and not Houston basin lease density.',
    items: [
      {
        title: 'Industrial workforce churn windows',
        detail:
          'Field-services and industrial hiring cycles (often stacked with summer) fill multi-family and working-SFH crews. Book as soon as start dates allow.',
      },
      {
        title: 'Extreme summer heat: roughly May – September',
        detail:
          'Plan early-morning loads, extra water, and heat-safe packing. Mid-afternoon moves in peak heat are high risk for people and property.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start outside boom crush',
        detail:
          'Still plan around apartment elevator windows when applicable. Dawn starts win even in shoulder seasons when heat, Loop 338, and pair-metro arterials are the real constraints.',
      },
    ],
  },
  specialized: [
    {
      id: 'odessa-industrial-residential',
      title: 'Odessa industrial-residential logistics',
      intro:
        'Ector’s defining product is industrial-edge housing — yards, soft approaches, and working inventory that Midland HQ/Loop 250 scripts underweight.',
      bullets: [
        'Require driveway, turnaround, and approach photos near industrial and yard edges.',
        'Price sheds, shops, and long carries explicitly versus pure suburban SFH.',
        'Buffer Loop 338 commercial and oilfield traffic peaks.',
        'Do not apply Midland planned-HOA soft-cost assumptions to Odessa industrial-residential jobs by default.',
      ],
    },
    {
      id: 'permian-pair-hauls',
      title: 'Permian pair hauls (Odessa ↔ Midland)',
      intro:
        'Adjacent-metro pairs are first-class jobs — not free “local” footnotes under either county label.',
      bullets: [
        'Name both cities on every estimate (e.g. Odessa → Midland); “Permian local” hides portal time.',
        'Price peak I-20 / SH-191 / US-385 pairs honestly — map miles understate shift and commute congestion.',
        'Clarify whether pair-metro hauls still use a pure local rate card or a long-local schedule.',
        'Inventory multi-unit COI separately from industrial-edge driveway SFH — products do not share soft costs.',
      ],
    },
    {
      id: 'heat-workforce-multi-family',
      title: 'Desert heat & workforce multi-family',
      intro:
        'Extreme heat plus short-notice industrial-economy apartments need operational plans pure civilian Triangle jobs never write.',
      bullets: [
        'Prefer earliest morning starts in peak summer; treat mid-afternoon loads as high risk.',
        'Collect apartment COI and elevator reservations before the survey is final.',
        'Request shaded staging and heat-safe packing for electronics and sealed goods.',
        'Plan water, rotation, and realistic crew endurance on open industrial-edge lots.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Odessa industrial-residential value, pair-metro Midland adjacency, and desert heat are different bets from Midland HQ growth — validate schools and healthcare by pocket, then plan for workforce calendars.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Major systems include Ector County ISD (Odessa) and others serving Ector County addresses. Match every listing address to the correct boundary.',
        bullets: [
          {
            title: 'District boundary check',
            detail:
              'Use official Ector County ISD boundary tools and TEA resources. Marketing neighborhood names and industrial-edge pockets can span feeders.',
          },
          {
            title: 'Odessa vs Midland systems',
            detail:
              'Do not assume Midland ISD patterns apply to Odessa addresses. Pair-metro households may cross districts for work — verify enrollment by parcel, not by “Permian” marketing names.',
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
            title: 'Odessa acute-care anchors',
            detail:
              'Medical Center Hospital (Odessa) and other Ector-area campuses dominate local care; some households also use Midland facilities in the pair metro. Map ER drive times from rural edges and industrial belts at peak traffic.',
          },
          {
            title: 'Specialty & pair-metro reality',
            detail:
              'Some specialties may require travel toward Midland or larger Texas metros. Confirm insurer networks and realistic I-20 / SH-191 appointment times before relocating mid-treatment.',
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
    title: 'Useful Ector resources',
    intro:
      'Local official links first; directory listings are independent. Verify TxDMV household goods authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Ector County',
        href: 'https://www.co.ector.tx.us/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Odessa',
        href: 'https://www.odessa-tx.gov/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (Odessa core, Loop 338 industrial-res, US-385 east, rural edges) when available. Confirm industrial-access photos, heat-aware starts, workforce multi-unit packets, and honest Odessa ↔ Midland pair assumptions — this is Odessa industrial-residential product, not a Midland HQ clone.',
  lastReviewed: '2026-07-24',
});
