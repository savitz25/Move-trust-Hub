import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeFlTier2Pack,
  FL_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/florida/fl-tier2-shared';

/**
 * Escambia County — Florida Tier 2 (Pensacola western Panhandle independent).
 * Secondary-market contract vs North Florida Tier 1 (Duval) density defaults —
 * military / Gulf Coast logistics, NOT a Jacksonville rename.
 */
export const escambiaCountyIntelligence: CountyIntelligencePack = finalizeFlTier2Pack({
  countySlug: 'escambia',
  hubTitle: 'Escambia County Moving Intelligence Hub',
  eyebrow: 'Escambia County · Western Panhandle independent · Pensacola',
  h1: 'Moving in Escambia County: Independent Western Panhandle — Pensacola, Navy & Gulf Coast Logistics',
  heroOpener:
    'Escambia County is an independent western Panhandle hub centered on Pensacola — not Jacksonville with freer freeways, and not a North Florida river-sprawl script with different labels. Pensacola core stock, west Pensacola and Navy-adjacent housing, Perdido and beach approaches, and Century/north rural edges form their own housing ladder under Gulf Coast heat and storm windows. Compared with Duval / North Florida Tier 1 density defaults, I-10 freeflow replaces dense Jax river-crossing gridlock, military PCS volume is first-class demand, and beach-bridge logistics are real. This guide is for people moving in Escambia as a secondary market with its own role — not recycled Duval scripts.',
  heroCredibility:
    'Independent western Panhandle · Military / Navy-adjacent · Gulf Coast logistics · FDACS Ch. 507 (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-10 · I-110 · US-98 · US-29 · Pensacola Beach approaches',
  parentCompare: {
    parentLabel: 'North Florida Tier 1 (Duval density defaults)',
    parentHref: '/local-movers/florida/duval',
    title: 'Compared with Duval County / North Florida Tier 1 defaults',
    intro:
      'Escambia is a freestanding western Panhandle metro on the Alabama border — not a Jacksonville collar and not a thinner Duval zone dump. Use Duval / North Florida Tier 1 as high-density parent contrast for licensing context and long-haul routing, not as a drop-in template for Pensacola Navy and Gulf Coast logistics.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Duval crews fight I-95 / I-10 / bridges and multi-zone river-sprawl pairs. Escambia pairs ride I-10, I-110, US-98, US-29, and Pensacola Beach approaches with freer mid-day freeflow — Pensacola core ↔ west Navy edges or beach approaches still burn portal-to-portal time at peak, but it is not a Jacksonville multi-bridge job. Isolation from Jax means long-haul deadhead across the Panhandle, not short-hop collar spillover.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Duval mixes urban core, beach towns, and vast suburban sprawl under one large county. Escambia’s ladder is Pensacola core multi-unit and mid-century stock, west Pensacola / Navy-adjacent housing, Perdido and beach product, and Century/north rural edges — more military turnover and Gulf-edge access, less Jax-scale suburban sprawl density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Escambia stages more driveway, military-adjacent multi-family, and beach-bridge work than Duval river-core elevators alone. HOAs exist in planned pockets but are not the sole operating system. Beach approaches, sand protection, and Navy gate-area traffic replace dense downtown curb-staging fights.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Escambia quotes often sit below Jacksonville metro rates for comparable square footage when access is simple — heat windows, beach-bridge time, military peak calendars, and rural north empty miles still push prices up. Expect secondary-market labor rates with military and coastal premiums — not Duval core scarcity pricing.',
      },
      {
        title: 'Role difference',
        detail:
          'Escambia is an independent western Panhandle hub with its own employment base (Navy and defense-adjacent, healthcare, tourism, education, logistics) — not a Jacksonville bedroom collar. Treat it as its own market when matching crews and rate cards. Not a Duval rename.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Escambia County different',
    intro:
      'Independent western Panhandle realities — military PCS volume, Gulf Coast beach approaches, I-10 freeflow, and inland north edges — that change estimates.',
    bullets: [
      {
        title: 'Military / Navy-adjacent cycles rewrite demand',
        detail:
          'NAS Pensacola and defense-adjacent households create PCS peaks, mid-month inventory, and multi-family turnover that pure civilian suburb calendars miss. Book early around known military windows.',
      },
      {
        title: 'Pensacola core vs west Navy vs beach vs north edges',
        detail:
          'Core multi-unit, west Pensacola military-adjacent stock, Perdido/beach product, and Century rural edges do not share truck access or clock time. Name both pockets on the estimate.',
      },
      {
        title: 'I-10 freeflow is not Jacksonville gridlock — still a line item',
        detail:
          'Cross-town pairs freer than Duval still burn billable time at school and commute peaks. Ask whether quotes are portal-to-portal, especially core ↔ beach or west ↔ north edges.',
      },
      {
        title: 'Gulf Coast heat and storm season are operational',
        detail:
          'Summer heat and hurricane windows compress outdoor hours and require flexible coastal contracts. Prefer early starts; document weather reschedule policies.',
      },
      FL_TIER2_REG_BULLET,
    ],
  },
  zonesHeading:
    'Escambia zones: Pensacola core, West Pensacola/Navy, Perdido/beach & Century/north edges',
  zonesIntro:
    'Four sharp products — not a six-zone dump. Pensacola core, west Navy-adjacent, Perdido/beach approaches, and Century/north edges price and stage differently under the same Gulf Coast calendar.',
  zones: [
    {
      id: 'pensacola-core',
      name: 'Pensacola Core & Established Grid',
      shortName: 'Pensacola core',
      neighborhoods: [
        'Downtown Pensacola edges',
        'East Hill / historic belts',
        'Central multi-family clusters',
        'I-110 / US-29 core corridors',
        'Established mid-century neighborhoods',
      ],
      housingTypes:
        'Older SFH, historic stock, multi-unit buildings, mid-century product, some redevelopment',
      challenges: [
        'Tighter street parking and multi-unit long carries',
        'Elevator/COI rules in some multi-unit buildings',
        'I-110 / arterial approaches into the core',
        'Heat on asphalt staging without shade',
      ],
      moverTips:
        'Confirm building rules for multi-unit. Weekday mornings beat heat and commute peaks. Inventory stairs carefully in older multi-story stock. Share parking constraints on denser blocks.',
      cityKeywords: [
        'pensacola',
        'downtown pensacola',
        'east hill',
        'pensacola core',
      ],
    },
    {
      id: 'west-pensacola-navy',
      name: 'West Pensacola & Navy-Adjacent',
      shortName: 'West / Navy',
      neighborhoods: [
        'West Pensacola',
        'NAS Pensacola approach corridors',
        'Military-adjacent multi-family',
        'Warrington edges',
        'US-98 west belts',
      ],
      housingTypes:
        'Military-adjacent multi-family, modest SFH, workforce rentals, some suburban tracts',
      challenges: [
        'PCS peak volume and short-notice turns',
        'Apartment COI and elevator windows',
        'Base-area traffic and security-perimeter routing',
        'Mid-month military-staff and family turnover',
      ],
      moverTips:
        'Book PCS windows as soon as orders and housing dates firm. Collect apartment COI early. Inventory carefully for partial loads common in military moves. Buffer portal time around base traffic peaks.',
      cityKeywords: [
        'west pensacola',
        'nas pensacola',
        'warrington',
        'navy pensacola',
        'military pensacola',
      ],
    },
    {
      id: 'perdido-beach',
      name: 'Perdido, Pensacola Beach & Gulf Approaches',
      shortName: 'Perdido / beach',
      neighborhoods: [
        'Pensacola Beach',
        'Perdido Key edges',
        'Gulf Breeze approach influence',
        'US-98 / beach-bridge corridors',
        'Coastal condo and elevated stock',
      ],
      housingTypes:
        'Beach condos, elevated coastal SFH, multi-family near water, snowbird-oriented product',
      challenges: [
        'Bridge / causeway timing and truck limits',
        'Elevator/COI windows and limited staging',
        'Sand protection and storm exposure',
        'Seasonal tourist and snowbird parking scarcity',
      ],
      moverTips:
        'Confirm current bridge constraints and building rules. Reserve elevators early. Budget sand protection. Prefer non-peak weekend loads on beach approaches when flexible.',
      cityKeywords: [
        'pensacola beach',
        'perdido key',
        'perdido',
        'gulf breeze',
        'beach escambia',
      ],
    },
    {
      id: 'century-north',
      name: 'Century & North Rural Edges',
      shortName: 'Century / north',
      neighborhoods: [
        'Century',
        'North Escambia rural corridors',
        'US-29 north approaches',
        'Larger-lot and small-town cores',
        'Alabama-border edge pockets',
      ],
      housingTypes:
        'Rural SFH, small-town stock, larger lots, manufactured-home communities, outbuildings',
      challenges: [
        'Long empty miles from Pensacola staging',
        'Unpaved or soft driveways after rain',
        'Lower same-day crew density than coastal core',
        'Heat on open rural approaches',
      ],
      moverTips:
        'Price distance and access explicitly. Share road-width and driveway photos. Confirm whether pure local rate cards still apply. Inventory sheds and workshops separately.',
      cityKeywords: [
        'century',
        'north escambia',
        'us-29 north',
        'rural pensacola',
        'century fl',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Escambia County',
    intro:
      'Same square footage prices differently by military peaks, beach-bridge time, multi-unit COI, and whether the job stays core or runs beach/north long-local.',
    drivers: [
      {
        title: 'Military PCS peak capacity',
        detail:
          'PCS windows tighten crews near multi-family and west Navy edges and can push rates or lead times — book early for known peaks.',
      },
      {
        title: 'Beach-bridge & coastal access',
        detail:
          'Pensacola Beach and Perdido approaches add billable time, elevator soft costs, and sand-protection labor versus pure inland driveway jobs.',
      },
      {
        title: 'I-10 / I-110 / US-98 portal time',
        detail:
          'Core ↔ beach or west ↔ north pairs can burn more clock than map miles suggest at peak — freer than Duval, still billable.',
      },
      {
        title: 'Heat & storm-season flexibility',
        detail:
          'Gulf heat and hurricane windows compress outdoor hours and can require multi-day or contingent pricing structures.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$400–$1,150+',
        note: 'Higher with elevators, PCS peaks, or beach-bridge windows',
      },
      {
        label: '2–3BR house / apartment',
        value: '$1,200–$3,500+',
        note: 'Cross-zone and multi-unit access trend up',
      },
      {
        label: '3–4+ BR (cross-zone / beach or north edge)',
        value: '$2,000–$5,800+',
        note: 'Beach elevators, military peaks, and rural empty miles price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, military & storm calendar intelligence',
    intro:
      'Escambia peaks follow military PCS cycles, Gulf summer heat, beach tourism, and hurricane season — not Jacksonville lease density alone.',
    items: [
      {
        title: 'Military PCS windows',
        detail:
          'Peak PCS seasons fill crews near west Pensacola multi-family first. Book as soon as orders and housing dates allow.',
      },
      {
        title: 'Summer heat & beach tourism: roughly May – September',
        detail:
          'Plan early-morning loads and heat-safe packing. Avoid peak beach-weekend loads on bridge approaches when flexible.',
      },
      {
        title: 'Hurricane season (June–November)',
        detail:
          'Build flexible date language for coastal and low-lying addresses. Confirm storage and reschedule policies before deposit.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start outside PCS crush',
        detail:
          'Still plan around apartment elevator windows when applicable. Dawn starts win when heat and arterials are the real constraints.',
      },
    ],
  },
  specialized: [
    {
      id: 'military-navy-adjacent',
      title: 'Military / Navy-adjacent logistics',
      intro:
        'Escambia’s defining volume problem is often NAS Pensacola PCS multi-family churn — not Jacksonville river-core elevators alone.',
      bullets: [
        'Book as soon as orders, lease, or housing dates allow; peak capacity disappears first near west multi-family.',
        'Collect apartment COI and elevator reservations before the survey is final.',
        'Inventory carefully for partial loads, storage, and short-notice PCS inventories.',
        'Buffer portal time around base-area traffic and shift peaks.',
      ],
    },
    {
      id: 'gulf-coast-logistics',
      title: 'Gulf Coast beach & bridge logistics',
      intro:
        'Pensacola Beach, Perdido, and US-98 approaches are a distinct product from inland Pensacola driveway jobs.',
      bullets: [
        'Confirm bridge/causeway constraints and truck limits before dispatch.',
        'Reserve elevators early; get COI naming and protection requirements in writing.',
        'Budget sand protection and limited staging plans for beach blocks.',
        'Document weather reschedule and storage policies before deposit in hurricane season.',
      ],
    },
    {
      id: 'i10-not-jacksonville',
      title: 'I-10 freeflow without Jacksonville rename assumptions',
      intro:
        'I-10, I-110, US-98, and US-29 freeflow is real — but Escambia is not a thinner Duval script. Survey the actual pocket and corridor pair.',
      bullets: [
        'Name both pockets on every estimate (e.g. core → Pensacola Beach); “Escambia local” hides portal time.',
        'Price peak I-10 / I-110 / US-98 pairs honestly — map miles understate school and beach traffic.',
        'Clarify whether long locals toward Century/north still use a pure local rate card.',
        'Do not import Jacksonville rate cards without naming both cities and access type — this is not a Duval rename.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Independent western Panhandle value, military living, and Gulf Coast weather are different bets — validate schools and healthcare by pocket, then plan for PCS and storm calendars.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Escambia County School District covers most public K–12 students. Military families should confirm zoning and transfer timelines early. Match every listing address to the correct boundary.',
        bullets: [
          {
            title: 'Zone before marketing name',
            detail:
              'Pensacola core, west Navy-adjacent, and beach brands span multiple feeders. Verify with official boundary tools and Florida DOE data.',
          },
          {
            title: 'Military family considerations',
            detail:
              'PCS mid-year moves are common. Coordinate school enrollment early and ask about military family support processes at the district.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites should lead; third-party rankings are secondary. Tour campuses when possible.',
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
              'Ascension Sacred Heart, Baptist Health Care campuses, and other facilities serve Escambia. Map ER drive times from west Pensacola, beach approaches, and Century/north at peak traffic.',
          },
          {
            title: 'Military & specialty reality',
            detail:
              'Military families may use base medical resources plus civilian systems. Some specialties may require travel toward larger metros — confirm insurer networks before relocating mid-treatment.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer pediatric and specialty care early if mid-treatment; book first appointments before peak PCS move chaos.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Escambia County resources',
    intro:
      'Local official links first; directory listings are independent. Verify FDACS for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Escambia County — official site',
        href: 'https://myescambia.com/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Pensacola',
        href: 'https://www.cityofpensacola.com/',
        external: true,
      },
      {
        label: 'Escambia County School District',
        href: 'https://www.escambiaschools.org/',
        external: true,
      },
      {
        label: 'NAS Pensacola (official)',
        href: 'https://www.cnic.navy.mil/regions/cnrse/installations/nas_pensacola.html',
        note: 'Base context for Navy-adjacent moves — not a mover endorsement',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (Pensacola core, West/Navy, Perdido/beach, Century/north) when available. Confirm PCS timing, beach-bridge access, and honest I-10 drive assumptions — this is an independent western Panhandle hub, not a Jacksonville rename.',
  lastReviewed: '2026-07-24',
});
