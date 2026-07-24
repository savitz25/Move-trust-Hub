import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeTxTier2Pack,
  TX_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/texas/tx-tier2-shared';

/**
 * Lubbock County — Texas Tier 2 (independent South Plains hub).
 * Secondary-market contract vs Texas Triangle Tier 1 density defaults — university +
 * regional medical, flatland wind/dust, not a Houston/DFW collar clone.
 */
export const lubbockCountyIntelligence: CountyIntelligencePack = finalizeTxTier2Pack({
  countySlug: 'lubbock',
  hubTitle: 'Lubbock County Moving Intelligence Hub',
  eyebrow: 'Lubbock County · Independent South Plains hub',
  h1: 'Moving in Lubbock County: Independent South Plains Hub — University, Medical & Flatland Logistics',
  heroOpener:
    'Lubbock County is an independent South Plains hub — not Houston or DFW with freer freeways, and not a Texas Triangle HOA growth collar. Texas Tech student and faculty churn, regional medical corridors, Lubbock core multi-unit and mid-century stock, south/southwest suburban growth, and flatland wind and dust form their own housing ladder under High Plains heat. Compared with Triangle Tier 1 density defaults, I-27 and Loop 289 freeflow replace multi-county basin gridlock, university and medical volume are first-class demand, and open-lot wind exposure is normal. This guide is for people moving in Lubbock County as a secondary market with its own role — not recycled Harris or Dallas scripts.',
  heroCredibility:
    'Independent South Plains hub · University + regional medical · Flatland wind/dust · TxDMV household goods (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-27 · US-82 · US-84 · Loop 289 · local Lubbock grid',
  parentCompare: {
    parentLabel: 'Independent South Plains hub (Texas Triangle density contrast)',
    parentHref: '/local-movers/texas/harris',
    title: 'Compared with Houston / DFW Tier 1 density defaults',
    intro:
      'Lubbock is a freestanding South Plains metro hundreds of miles from the Texas Triangle. Use Houston and DFW as high-density parent contrasts — neither is a drop-in template for Texas Tech multi-family peaks, regional medical-corridor jobs, or flatland wind-and-dust move days.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Houston and DFW crews fight multi-freeway basins (I-10/I-45/I-69 stacks; I-35/I-635/Tollway walls). Lubbock pairs ride I-27, US-82, US-84, Loop 289, and the local Lubbock grid with freer mid-day flow — core ↔ south growth still burns portal-to-portal time at peak, but it is not a Harris-County cross-basin job. Isolation means long-haul deadhead to the Triangle, not short-hop collar spillover.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Harris/Dallas mix dense elevators, master-planned HOA villages, and multi-county suburban product. Lubbock’s ladder is Tech-adjacent multi-family, core mid-century and older grids, south/southwest suburban SFH, and medical-corridor residential — more university turnover and flatland suburban product, less Triangle HOA density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Lubbock stages more driveway, apartment elevator, and open-lot work than Houston elevator corridors. HOAs exist in south growth pockets but are not the Frisco or Katy operating system. Wind, dust, and flat grid freeflow replace dense curb-staging fights.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Lubbock quotes often sit below Houston/DFW rates for comparable square footage when access is simple — heat windows, wind/dust delays, Tech peaks, and cross-town Loop 289 time still push prices up. Expect secondary-market labor rates with university seasonality and High Plains weather as the main premiums — not basin gridlock fees.',
      },
      {
        title: 'Role difference',
        detail:
          'Lubbock is an independent South Plains hub with its own employment base (Texas Tech, regional medical, education, agriculture-adjacent services, retail) — not a Triangle bedroom collar. Treat it as its own market when matching crews and rate cards.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Lubbock County different',
    intro:
      'Independent South Plains realities — university and medical volume, flatland wind/dust, High Plains heat, and freer I-27/Loop 289 corridors than Triangle parents — that change estimates.',
    bullets: [
      {
        title: 'University + regional medical cycles rewrite demand',
        detail:
          'Texas Tech semester peaks and medical-staff turnover pack multi-family and mid-month inventory. Peak academic and residency windows require earlier booking than pure civilian suburb calendars.',
      },
      {
        title: 'Wind and dust are operational constraints',
        detail:
          'High Plains wind and dust stress crews, electronics, and sealed packaging on open staging. Protect inventory from grit; inland Triangle HOA habits do not transfer one-for-one to flat open lots.',
      },
      {
        title: 'Core vs south growth vs medical corridor',
        detail:
          'Tech-adjacent apartments, Lubbock core mid-century stock, south suburban SFH, and medical-corridor residential are different jobs under one county label. “Lubbock local” is too vague — name both pockets and access type on the estimate.',
      },
      {
        title: 'I-27 / Loop 289 freeflow is not Triangle basin — still a line item',
        detail:
          'Cross-town pairs freer than Harris/Dallas still burn billable time at school and commute peaks. Ask whether quotes are portal-to-portal, especially core ↔ south growth.',
      },
      TX_TIER2_REG_BULLET,
    ],
  },
  zonesHeading:
    'Lubbock County zones: Tech-adjacent, Lubbock core, south growth & medical corridor',
  zonesIntro:
    'Four sharp products — not a six-zone dump. Texas Tech multi-family, Lubbock core density, south/southwest suburban growth, and medical-corridor product price and stage differently under the same High Plains weather calendar.',
  zones: [
    {
      id: 'tech-adjacent',
      name: 'Texas Tech-adjacent',
      shortName: 'Tech-adjacent',
      neighborhoods: [
        'Texas Tech multi-family corridors',
        'Campus-edge apartments',
        'University Avenue belts',
        'Student and faculty housing',
        'North/central multi-unit clusters',
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
        'Book Tech peak windows early. Collect apartment COI and elevator reservations before the survey is final. Inventory carefully for partial loads and storage common in student moves. Prefer non-game-day and mid-week starts near campus.',
      cityKeywords: [
        'texas tech',
        'lubbock tech',
        'university avenue lubbock',
        'tech terrace',
        'student housing lubbock',
      ],
    },
    {
      id: 'lubbock-core',
      name: 'Lubbock Core',
      shortName: 'Lubbock core',
      neighborhoods: [
        'Downtown Lubbock edges',
        'Midtown / older grid neighborhoods',
        'Central multi-family clusters',
        'Broadway and main-corridor residential',
        'Established mid-century belts',
      ],
      housingTypes:
        'Older SFH, multi-unit buildings, mid-century stock, some redevelopment product',
      challenges: [
        'Tighter street parking and multi-unit long carries',
        'Elevator/COI rules in some multi-unit buildings',
        'I-27 / Loop 289 approaches into the core',
        'Wind and heat on asphalt staging without shade',
      ],
      moverTips:
        'Confirm building rules for multi-unit. Weekday mornings beat heat, wind, and commute peaks. Inventory stairs carefully in older multi-story stock. Share parking constraints on denser blocks.',
      cityKeywords: [
        'downtown lubbock',
        'lubbock core',
        'midtown lubbock',
        'broadway lubbock',
        'central lubbock',
      ],
    },
    {
      id: 'south-southwest-growth',
      name: 'South / Southwest Growth',
      shortName: 'South growth',
      neighborhoods: [
        'South Lubbock suburban tracts',
        'Southwest growth villages',
        'Loop 289 south corridors',
        'Family HOA SFH pockets',
        'Newer multi-family growth',
      ],
      housingTypes:
        'Suburban SFH, planned HOA villages, new-construction tracts, multi-family growth',
      challenges: [
        'HOA COI and approved hours in some villages',
        'Cul-de-sac and truck-length constraints',
        'Loop 289 peak congestion',
        'Family-volume inventory on summer weekends',
      ],
      moverTips:
        'Send HOA packets when applicable. Mid-week early starts beat heat, wind, and school traffic. Inventory family-volume SFH carefully. Clarify south growth ↔ Tech multi-family drive assumptions.',
      cityKeywords: [
        'south lubbock',
        'southwest lubbock',
        'loop 289 south',
        'lubbock suburbs',
        'south plains growth',
      ],
    },
    {
      id: 'medical-corridor',
      name: 'Medical Corridor',
      shortName: 'Medical corridor',
      neighborhoods: [
        'Medical-district residential edges',
        'Hospital-adjacent multi-family',
        'US-82 / medical approach belts',
        'Healthcare workforce housing',
        'East/central medical-adjacent SFH',
      ],
      housingTypes:
        'Multi-family near hospitals, mid-century SFH, modest growth product, workforce rentals',
      challenges: [
        'Shift-change and visitor traffic near campuses',
        'Apartment COI and elevator windows',
        'Mid-month medical-staff turnover',
        'Cross-town peaks toward Tech and south growth',
      ],
      moverTips:
        'Buffer portal time around hospital shift peaks. Collect multi-unit COI early. Inventory carefully for partial loads common in residency and staff transitions. Morning starts beat heat and corridor congestion.',
      cityKeywords: [
        'lubbock medical',
        'umc lubbock',
        'covenant medical',
        'medical district lubbock',
        'hospital corridor lubbock',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Lubbock County',
    intro:
      'Same square footage prices differently by Tech peaks, wind/dust windows, multi-unit COI, and whether the job stays core or runs south growth/medical corridor.',
    drivers: [
      {
        title: 'Texas Tech & medical peak capacity',
        detail:
          'Semester and residency/staff turnover windows tighten crews near multi-family and can push rates or lead times — book early for known peaks.',
      },
      {
        title: 'Wind/dust & heat-constrained work windows',
        detail:
          'High Plains wind, dust, and heat compress productive outdoor hours. Jobs that slip into peak afternoon or high-wind windows may need more labor days or premium scheduling.',
      },
      {
        title: 'Cross-town Loop 289 / I-27 portal time',
        detail:
          'Core ↔ south growth or Tech ↔ medical pairs can burn more clock than map miles suggest at peak — freer than Triangle basins, still billable.',
      },
      {
        title: 'Multi-unit access soft costs',
        detail:
          'Elevators, COI, and curb staging in Tech and medical multi-unit add coordination costs versus pure driveway SFH.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$400–$1,250+',
        note: 'Higher with elevators, Tech peaks, or wind delays',
      },
      {
        label: '2–3BR house / apartment',
        value: '$1,100–$3,400+',
        note: 'Cross-town and multi-unit access trend up',
      },
      {
        label: '3–4+ BR (cross-zone / growth edge)',
        value: '$1,900–$5,600+',
        note: 'South growth and peak university windows price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, wind & university-calendar intelligence',
    intro:
      'Lubbock peaks follow Texas Tech cycles, High Plains heat/wind, and medical staffing calendars — not Triangle basin lease density alone.',
    items: [
      {
        title: 'Texas Tech peak windows (semester & graduation)',
        detail:
          'Move-in/move-out seasons and graduation weeks fill crews near campus multi-family. Book as soon as housing dates are firm.',
      },
      {
        title: 'Summer heat & wind: roughly May – September',
        detail:
          'Plan early-morning loads, dust protection, and heat-safe packing. Mid-afternoon and high-wind moves are high risk for people and property.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start outside Tech crush',
        detail:
          'Still plan around apartment elevator windows when applicable. Dawn starts win even in shoulder seasons when wind, heat, and arterials are the real constraints.',
      },
    ],
  },
  specialized: [
    {
      id: 'university-medical-cycles',
      title: 'University + regional medical logistics',
      intro:
        'Lubbock’s defining volume problem is often Tech multi-family churn and medical-staff turnover — not Triangle HOA paperwork alone.',
      bullets: [
        'Book as soon as lease, semester, or employment dates allow; peak capacity disappears first near Tech multi-family.',
        'Collect apartment COI and elevator reservations before the survey is final.',
        'Inventory carefully for partial loads, storage, and roommate-split inventories common in student and residency moves.',
        'Buffer time near hospital campuses during shift-change peaks.',
      ],
    },
    {
      id: 'flatland-wind-dust',
      title: 'Flatland wind, dust & High Plains weather',
      intro:
        'Lubbock’s defining climate constraint is open-lot wind, dust, and heat that coastal or Triangle rate cards often underweight.',
      bullets: [
        'Prefer morning starts; treat high-wind and mid-afternoon loads as higher risk.',
        'Request covered staging when possible and dust-safe packing for electronics, paper goods, and sealed items.',
        'Plan water, rotation, and realistic crew endurance — wind and grit are labor and quality issues, not just comfort.',
        'Build flexible language for weather delays on outdoor packing.',
      ],
    },
    {
      id: 'i27-loop289-routing',
      title: 'I-27 / Loop 289 routing logistics',
      intro:
        'Core, Tech, south growth, and medical corridors on I-27, US-82, US-84, and Loop 289 are not interchangeable with a single neighborhood move.',
      bullets: [
        'Name both pockets on every estimate (e.g. Tech → south Lubbock); “Lubbock local” hides portal time.',
        'Price peak Loop 289 / I-27 pairs honestly — map miles understate school and commute congestion.',
        'Clarify whether long locals toward county edges still use a pure local rate card.',
        'Build buffer when households also stage storage or partial loads common in semester transitions.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Independent South Plains value, university living, and High Plains weather are different bets — validate schools and healthcare by pocket, then plan for Tech and wind calendars.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Major systems include Lubbock ISD, Frenship ISD, Lubbock-Cooper ISD, and others, plus Texas Tech University for higher education. Match every K–12 listing address to the correct boundary.',
        bullets: [
          {
            title: 'Multiple districts under one county',
            detail:
              'Core, south growth, and edge addresses often fall in different systems. Marketing names and new tracts can span feeders — verify with official boundary tools and TEA data.',
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
            title: 'Regional acute-care anchors',
            detail:
              'University Medical Center, Covenant Health, and other Lubbock campuses serve the South Plains. Map ER drive times from south growth, Tech multi-family, and county edges at peak traffic.',
          },
          {
            title: 'Specialty & regional reality',
            detail:
              'Some specialties may require travel toward Dallas or other hubs. Confirm insurer networks and realistic long-drive plans before relocating mid-treatment.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer pediatric and specialty care early if mid-treatment; book first appointments before peak Tech move-in chaos.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Lubbock resources',
    intro:
      'Local official links first; directory listings are independent. Verify TxDMV household goods authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Lubbock County',
        href: 'https://www.co.lubbock.tx.us/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Lubbock',
        href: 'https://ci.lubbock.tx.us/',
        external: true,
      },
      {
        label: 'Texas Tech University',
        href: 'https://www.ttu.edu/',
        note: 'Campus calendar and housing context for Tech-affiliated moves',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (Tech-adjacent, Lubbock core, South growth, Medical corridor) when available. Confirm wind/dust protection plans, Tech peak timing, and honest Loop 289 drive assumptions — this is an independent South Plains hub, not a Triangle collar.',
  lastReviewed: '2026-07-24',
});
