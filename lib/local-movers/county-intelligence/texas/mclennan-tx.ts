import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeTxTier2Pack,
  TX_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/texas/tx-tier2-shared';

/**
 * McLennan County — Texas Tier 2 (independent Waco Central TX hub).
 * Secondary-market contract vs Travis / Dallas Tier 1 density defaults — I-35
 * mid-state freeflow, not an Austin or DFW collar clone.
 */
export const mclennanCountyIntelligence: CountyIntelligencePack = finalizeTxTier2Pack({
  countySlug: 'mclennan',
  hubTitle: 'McLennan County Moving Intelligence Hub',
  eyebrow: 'McLennan County · Independent Waco Central TX hub — I-35 mid-state',
  h1: 'Moving in McLennan County: Independent Waco Hub — I-35 Mid-State Logistics',
  heroOpener:
    'McLennan County is an independent Waco Central Texas hub — not Austin with freer freeways, and not a DFW HOA growth collar. Waco core multi-unit and historic grids, Baylor-adjacent student and faculty product, Hewitt / Woodway suburban stock, and I-35 mid-state freeflow form their own housing ladder under Central Texas heat. Compared with Travis or Dallas Tier 1 density defaults, I-35 and Loop 340 freeflow replace downtown elevator basins, university and mid-state logistics volume are first-class, and polycentric Waco-edge pairs are normal. This guide is for people moving in McLennan County as a secondary market with its own role — not recycled Travis or Dallas scripts.',
  heroCredibility:
    'Independent Waco Central TX hub · I-35 mid-state · TxDMV household goods (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-35 · US-84 · SH-6 · Loop 340 · local Waco grid',
  parentCompare: {
    parentLabel: 'Independent I-35 mid-state hub (Travis density contrast)',
    parentHref: '/local-movers/texas/travis',
    title: 'Compared with Travis County (Austin) Tier 1 density defaults',
    intro:
      'McLennan is a freestanding Waco metro on I-35 between Austin and DFW — not a Travis suburb and not a Dallas collar. Use Travis County as the high-density parent contrast — it is not a drop-in template for Baylor multi-family peaks, Waco historic grids, or Hewitt/Woodway suburban jobs. Dallas remains a distant north-corridor contrast only.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Travis crews fight downtown elevators, MoPac / I-35 basin congestion, and multi-pocket Austin pairs. McLennan pairs ride I-35, US-84, SH-6, Loop 340, and the local Waco grid with freer mid-day flow — Waco core ↔ Hewitt still burns portal-to-portal time at peak, but it is not a Domain ↔ South Austin job. I-35 connectivity to Austin and DFW is real; McLennan is still its own market, not a collar clone.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Travis mixes dense elevators, central multi-unit, and north/south HOA growth. McLennan’s ladder is Waco core multi-unit and historic stock, Baylor-adjacent apartments, Hewitt/Woodway suburban SFH, and rural McLennan edges — more mid-state university and suburban product, less Austin tech-HOA default.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'McLennan stages more driveway, historic-grid, and apartment elevator work than Travis tower corridors. HOAs exist in Hewitt/Woodway growth but are not the Round Rock operating system. University multi-family COI and freer I-35 approaches replace dense curb-staging fights in Austin core.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local McLennan quotes often sit below Travis/Austin rates for comparable square footage when access is simple — heat windows, Baylor peaks, and core ↔ suburb portal time still push prices up. Expect secondary-market labor rates with university seasonality and heat as the main premiums, not downtown scarcity fees.',
      },
      {
        title: 'Role difference',
        detail:
          'McLennan is an independent mid-state hub with its own employment base (Baylor, healthcare, education, manufacturing, logistics on I-35) — not an Austin or DFW bedroom collar. Treat it as its own market when matching crews and rate cards.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in McLennan County different',
    intro:
      'Independent Waco-hub realities — Baylor and mid-state volume, core vs Hewitt/Woodway split, Central Texas heat, and freer I-35 corridors than Travis parents — that change estimates.',
    bullets: [
      {
        title: 'Baylor and mid-state calendars rewrite demand',
        detail:
          'University move-in/move-out, graduation, and mid-month multi-family churn pack Waco core and Baylor-adjacent stock. Peak academic windows require earlier booking than pure civilian suburb calendars.',
      },
      {
        title: 'Waco core vs Hewitt/Woodway vs rural edges',
        detail:
          'Historic multi-unit, Baylor apartments, Hewitt/Woodway family SFH, and rural McLennan edges are different jobs under one county label. “McLennan local” is too vague — name both cities and access type on the estimate.',
      },
      {
        title: 'I-35 freeflow is not Austin basin — still a line item',
        detail:
          'Cross-zone pairs freer than Travis still burn billable time at school and commute peaks. Ask whether quotes are portal-to-portal, especially core ↔ Hewitt/Woodway or I-35-edge long locals.',
      },
      {
        title: 'Central Texas heat is an operational constraint',
        detail:
          'Summer afternoons stress crews and open staging. Prefer earliest morning load windows in peak summer — mild shoulder-season Austin habits do not cancel heat risk on asphalt lots.',
      },
      TX_TIER2_REG_BULLET,
    ],
  },
  zonesHeading:
    'McLennan County zones: Waco core, Baylor-adjacent, Hewitt/Woodway & rural edges',
  zonesIntro:
    'Four sharp products — not a six-zone dump. Waco core density, Baylor-adjacent multi-family, Hewitt/Woodway suburban stock, and rural McLennan edges price and stage differently under the same I-35 mid-state calendar.',
  zones: [
    {
      id: 'waco-core',
      name: 'Waco Core',
      shortName: 'Waco core',
      neighborhoods: [
        'Downtown Waco edges',
        'Historic grid neighborhoods',
        'Central multi-family clusters',
        'I-35 / local arterial approaches',
        'River-adjacent residential edges',
      ],
      housingTypes:
        'Older SFH, multi-unit buildings, historic stock, mid-century tracts, some redevelopment product',
      challenges: [
        'Tighter street parking and multi-unit long carries',
        'Elevator/COI rules in some multi-unit buildings',
        'I-35 / Loop 340 approaches into the core',
        'Heat on asphalt staging without shade',
      ],
      moverTips:
        'Confirm building rules for multi-unit. Weekday mornings beat heat and commute peaks. Inventory stairs carefully in older multi-story stock. Share parking constraints on denser historic blocks.',
      cityKeywords: [
        'waco',
        'downtown waco',
        'waco tx',
        'central waco',
        'waco core',
      ],
    },
    {
      id: 'baylor-adjacent',
      name: 'Baylor-adjacent',
      shortName: 'Baylor-adjacent',
      neighborhoods: [
        'Baylor University multi-family corridors',
        'Campus-edge apartments',
        'Student and faculty housing belts',
        'University Parks / campus approaches',
        'Near-campus modest SFH',
      ],
      housingTypes:
        'Apartments, townhomes, student multi-family, modest SFH near campus edges',
      challenges: [
        'Semester move-in/move-out peak volume',
        'Apartment elevator windows and COI',
        'Game-day and campus traffic peaks',
        'High turnover inventory and short notice',
      ],
      moverTips:
        'Book Baylor peak windows early. Collect apartment COI and elevator reservations before the survey is final. Inventory carefully for partial loads and storage common in student moves. Prefer non-game-day and mid-week starts near campus.',
      cityKeywords: [
        'baylor',
        'baylor university',
        'waco student housing',
        'university parks',
        'baylor apartments',
      ],
    },
    {
      id: 'hewitt-woodway',
      name: 'Hewitt / Woodway',
      shortName: 'Hewitt / Woodway',
      neighborhoods: [
        'Hewitt',
        'Woodway',
        'South/west suburban tracts',
        'Family HOA SFH pockets',
        'Loop 340 / SH-6 growth corridors',
      ],
      housingTypes:
        'Suburban SFH, planned HOA villages, mid-century tracts, multi-family growth pockets',
      challenges: [
        'HOA COI and approved hours in some villages',
        'Cul-de-sac and truck-length constraints',
        'I-35 / Loop 340 peak congestion toward core',
        'Family-volume inventory on summer weekends',
      ],
      moverTips:
        'Send HOA packets when applicable. Mid-week early starts beat heat and school traffic. Inventory family-volume SFH carefully. Clarify Hewitt/Woodway ↔ Waco core drive assumptions.',
      cityKeywords: [
        'hewitt',
        'woodway',
        'hewitt tx',
        'woodway tx',
        'south waco suburbs',
      ],
    },
    {
      id: 'rural-mclennan-edges',
      name: 'Rural McLennan Edges',
      shortName: 'Rural edges',
      neighborhoods: [
        'Robinson / Lacy Lakeview edges',
        'McGregor / west edges',
        'Acreage and ranch-edge residential',
        'US-84 / SH-6 corridor edges',
        'Open-lot rural tracts',
      ],
      housingTypes:
        'Acreage homes, manufactured and site-built mix, farm-edge SFH, limited multi-family',
      challenges: [
        'Soft driveways, gates, and long private approaches',
        'Outbuildings and mixed inventory volume',
        'Long empty miles from Waco staging',
        'Incomplete roads and truck-turn constraints',
      ],
      moverTips:
        'Treat rural edges as long-local jobs. Ask whether pure local rate cards still apply. Confirm driveway surface, gate width, and outbuilding inventory. Prefer mid-week starts over peak Saturday I-35 traffic.',
      cityKeywords: [
        'robinson tx',
        'lacy lakeview',
        'mcgregor',
        'rural mclennan',
        'waco acreage',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside McLennan County',
    intro:
      'Same square footage prices differently by Baylor peaks, multi-unit COI, heat windows, and whether the job is Waco core or Hewitt/Woodway/rural long local.',
    drivers: [
      {
        title: 'Baylor & multi-family peak capacity',
        detail:
          'Semester and graduation windows tighten crews near campus multi-family and can push rates or lead times — book early for known peaks.',
      },
      {
        title: 'Core ↔ suburb portal time (I-35 / Loop 340)',
        detail:
          'Waco ↔ Hewitt/Woodway pairs can burn more clock than map miles suggest at peak — freer than Austin basin, still billable.',
      },
      {
        title: 'Heat-constrained work windows',
        detail:
          'Summer heat compresses productive hours into mornings. Jobs that slip into peak afternoon heat may need more labor days or premium scheduling.',
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
        note: 'Higher with elevators, Baylor peaks, or long portal time',
      },
      {
        label: '2–3BR house / apartment',
        value: '$1,100–$3,400+',
        note: 'Cross-zone hauls and multi-unit access trend up',
      },
      {
        label: '3–4+ BR (cross-zone / rural edge)',
        value: '$1,900–$5,600+',
        note: 'Rural edges and peak university windows price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, heat & university-calendar intelligence',
    intro:
      'McLennan peaks follow Baylor cycles, school calendars, and Central Texas heat — not Travis downtown lease density alone.',
    items: [
      {
        title: 'Baylor peak windows (semester & graduation)',
        detail:
          'Move-in/move-out seasons and graduation weeks fill crews near campus multi-family. Book as soon as housing dates are firm.',
      },
      {
        title: 'Summer heat: roughly May – September',
        detail:
          'Plan early-morning loads, extra water, and heat-safe packing. Mid-afternoon moves in peak heat are high risk for people and property.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start outside Baylor crush',
        detail:
          'Still plan around apartment elevator windows when applicable. Dawn starts win even in shoulder seasons when heat and arterials are the real constraints.',
      },
    ],
  },
  specialized: [
    {
      id: 'baylor-university-logistics',
      title: 'Baylor & university multi-family logistics',
      intro:
        'McLennan’s volume problem is often university turnover, short notice, and apartment access — not Austin HOA paperwork alone.',
      bullets: [
        'Book as soon as lease and semester dates allow; peak capacity disappears first near Baylor multi-family corridors.',
        'Collect apartment COI and elevator reservations before the survey is final.',
        'Inventory carefully for partial loads, storage, and roommate-split inventories common in student moves.',
        'Avoid game-day and major campus-event windows for campus-edge addresses when possible.',
      ],
    },
    {
      id: 'i35-midstate-routing',
      title: 'I-35 mid-state routing logistics',
      intro:
        'Waco core, Baylor edges, Hewitt/Woodway, and rural pairs on I-35, US-84, SH-6, and Loop 340 are not interchangeable with a single Austin neighborhood move.',
      bullets: [
        'Name both cities on every estimate (e.g. Waco → Hewitt); “McLennan local” hides portal time.',
        'Price peak I-35 / Loop 340 pairs honestly — map miles understate school and commute congestion.',
        'Clarify whether long locals toward Robinson, McGregor, or rural edges still use a pure local rate card.',
        'Build buffer when households also stage storage or partial loads common in semester transitions.',
      ],
    },
    {
      id: 'heat-historic-access',
      title: 'Heat & historic/core access operations',
      intro:
        'Central Texas heat plus historic-grid and multi-unit rules need operational plans that pure suburban jobs never write.',
      bullets: [
        'Prefer earliest morning starts in peak summer; treat mid-afternoon loads as high risk.',
        'Request shaded staging and heat-safe packing for electronics and sealed goods.',
        'Confirm elevator/COI for multi-unit and parking for historic blocks before dispatch.',
        'Plan water, rotation, and realistic crew endurance on open lots and long porch carries.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Independent Waco-hub value, Baylor adjacency, and Central Texas heat are different bets — validate schools and healthcare by pocket, then plan for university calendars.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Major systems include Waco ISD, Midway ISD (Hewitt/Woodway area), and others, plus Baylor University for higher education. Match every K–12 listing address to the correct boundary.',
        bullets: [
          {
            title: 'Multiple districts under one county',
            detail:
              'Waco core, Hewitt/Woodway, and rural addresses often fall in different systems. Marketing names and new tracts can span feeders — verify with official boundary tools and TEA data.',
          },
          {
            title: 'University vs family calendars',
            detail:
              'Faculty and family households face different timing than pure student multi-family turnover. Coordinate school enrollment early when mid-year moves are required.',
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
              'Baylor Scott & White Medical Center – Hillcrest, Ascension Providence, and other Waco-area campuses serve McLennan. Map ER drive times from Hewitt/Woodway, Baylor multi-family, and rural edges at peak traffic.',
          },
          {
            title: 'Specialty & regional reality',
            detail:
              'Some specialties may require travel toward Dallas, Austin, or Temple. Confirm insurer networks and realistic I-35 appointment times before relocating mid-treatment.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer pediatric and specialty care early if mid-treatment; book first appointments before peak Baylor move-in chaos.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful McLennan resources',
    intro:
      'Local official links first; directory listings are independent. Verify TxDMV household goods authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'McLennan County',
        href: 'https://www.co.mclennan.tx.us/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Waco',
        href: 'https://www.waco-texas.com/',
        external: true,
      },
      {
        label: 'City of Hewitt',
        href: 'https://www.cityofhewitt.com/',
        external: true,
      },
      {
        label: 'City of Woodway',
        href: 'https://www.woodwaytexas.gov/',
        external: true,
      },
      {
        label: 'Baylor University',
        href: 'https://www.baylor.edu/',
        note: 'Campus calendar and housing context for Baylor-affiliated moves',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (Waco core, Baylor-adjacent, Hewitt/Woodway, Rural edges) when available. Confirm Baylor peak timing, heat-aware start times, and honest I-35 / Loop 340 drive assumptions — this is an independent mid-state hub, not a Travis or Dallas collar clone.',
  lastReviewed: '2026-07-24',
});
