import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeFlTier2Pack,
  FL_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/florida/fl-tier2-shared';

/**
 * Santa Rosa County — Florida Tier 2 (Milton / Gulf Breeze — Pensacola east collar).
 * Parent: Escambia County. East-of-Pensacola growth collar —
 * NOT an Escambia rename or Pensacola core script copy.
 */
export const santaRosaCountyIntelligence: CountyIntelligencePack = finalizeFlTier2Pack({
  countySlug: 'santa-rosa',
  hubTitle: 'Santa Rosa County Moving Intelligence Hub',
  eyebrow: 'Santa Rosa · Pensacola east collar · Milton / Gulf Breeze',
  h1: 'Moving in Santa Rosa County: Pensacola East Collar — Gulf Breeze, Milton, Navarre & Pace Growth',
  heroOpener:
    'Santa Rosa County is Pensacola’s eastern growth collar — Gulf Breeze and Pensacola Beach approaches, Milton seat and central corridors, Navarre coastal product, and Pace growth tracts that freer I-10 freeflow still cannot turn into a short Escambia dock job. This is not downtown Pensacola elevators, not NAS Pensacola west multi-family, and not a renamed Escambia pack with different city labels. East-collar suburban growth, coastal/bridge access, and longer empty miles from Pensacola staging define estimates. This guide is for people actually moving in Santa Rosa as an east-of-Pensacola collar — not a recycled Escambia core pack.',
  heroCredibility:
    'Pensacola east collar · Gulf Breeze / Milton / Navarre / Pace · FDACS Ch. 507 (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-10 · US-90 · FL-87 · FL-281 · Gulf Breeze approaches',
  parentCompare: {
    parentLabel: 'Escambia County',
    parentHref: '/local-movers/florida/escambia',
    title: 'Compared with Escambia County',
    intro:
      'Santa Rosa is the east-of-Pensacola growth collar — Gulf Breeze approaches, Milton, Navarre, and Pace growth — not a drop-in template for Pensacola core elevators, west Navy multi-family, or Perdido scripts. Use Escambia as the dense western Panhandle parent contrast. Not an Escambia rename.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Escambia crews stage Pensacola core, I-110, west Navy edges, and Pensacola Beach approaches inside one county. Santa Rosa pairs ride I-10, US-90, FL-87, FL-281, and Gulf Breeze approaches — freer mid-day freeflow than Pensacola core gridlock, still peak-heavy on bridge approaches and school corridors. Gulf Breeze ↔ Pace or Milton ↔ Navarre burns portal-to-portal time; it is not a short Pensacola dock job.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Escambia mixes urban core, Navy-adjacent multi-family, and Perdido beach product. Santa Rosa’s ladder is Gulf Breeze/Pensacola Beach approach coastal product, Milton seat and mid-county stock, Navarre coastal and beach-edge housing, and Pace suburban growth — more east-collar driveway HOA work and bridge access, less Pensacola historic-core density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Escambia core needs multi-unit COI and beach-bridge windows. Santa Rosa defaults to east-collar HOA packets in Pace growth, coastal/bridge staging into Gulf Breeze and Navarre, and longer empty miles from Pensacola-based crews. Gate lists concentrate in planned growth more than county-wide towers.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Santa Rosa quotes often sit near secondary-collar rates for simple driveway access — bridge time, coastal elevators, Pace HOA soft costs, and empty miles from Pensacola staging still push prices up. Expect east-collar friction, not Pensacola core scarcity pricing alone.',
      },
      {
        title: 'Role difference',
        detail:
          'Santa Rosa is Pensacola’s eastern growth collar — Milton seat logistics, Gulf Breeze/Navarre coastal product, and Pace expansion — not Escambia’s western Navy and Perdido core. Treat it as its own market when matching crews and rate cards. Not an Escambia rename.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Santa Rosa County different',
    intro:
      'Pensacola east-collar realities — Gulf Breeze bridge approaches, Pace growth HOAs, Navarre coastal product, and I-10 freeflow — that change estimates.',
    bullets: [
      {
        title: 'Gulf Breeze / Navarre coastal and bridge access are their own product',
        detail:
          'Bridge timing, limited staging, sand protection, and coastal elevators do not match Milton inland driveway plans. Name both pockets on every estimate.',
      },
      {
        title: 'Pace growth is not Milton seat stock',
        detail:
          'Planned HOA tracts, family-volume SFH, and longer I-10 / FL-281 approaches differ from Milton older-grid and mid-county product. Share HOA packets early.',
      },
      {
        title: 'East of Pensacola is not an Escambia rename',
        detail:
          'Crews and rate cards staged for Pensacola core or west Navy multi-family understate bridge time, Pace empty miles, and Navarre coastal access. Survey the actual Santa Rosa pocket.',
      },
      {
        title: 'Gulf heat and storm season are operational',
        detail:
          'Summer heat and hurricane windows compress outdoor hours and require flexible coastal contracts. Prefer early starts; document weather reschedule policies.',
      },
      FL_TIER2_REG_BULLET,
    ],
  },
  zonesHeading:
    'Santa Rosa zones: Gulf Breeze/Pensacola Beach approaches, Milton, Navarre & Pace growth',
  zonesIntro:
    'Four sharp products — not a six-zone dump. Gulf Breeze/beach approaches, Milton, Navarre, and Pace growth price and stage differently under the same east-of-Pensacola market.',
  zones: [
    {
      id: 'gulf-breeze-approaches',
      name: 'Gulf Breeze & Pensacola Beach Approaches',
      shortName: 'Gulf Breeze / beach',
      neighborhoods: [
        'Gulf Breeze',
        'Pensacola Beach approach influence',
        'US-98 / bridge corridors',
        'Coastal multi-family and elevated stock',
        'Barrier-edge and bayfront pockets',
      ],
      housingTypes:
        'Coastal SFH, elevated homes, multi-family near water, snowbird-oriented and bridge-access product',
      challenges: [
        'Bridge / causeway timing and truck limits',
        'Elevator/COI windows and limited staging',
        'Sand protection and storm exposure',
        'Peak tourist and commute congestion on approaches',
      ],
      moverTips:
        'Confirm current bridge constraints and building rules. Reserve elevators early. Budget sand protection. Prefer non-peak loads on bridge approaches when flexible.',
      cityKeywords: [
        'gulf breeze',
        'pensacola beach approach',
        'gulf breeze fl',
        'us-98 gulf breeze',
      ],
    },
    {
      id: 'milton',
      name: 'Milton Seat & Central Corridors',
      shortName: 'Milton',
      neighborhoods: [
        'Milton',
        'Downtown / historic edges',
        'US-90 central corridors',
        'Mid-county residential stock',
        'County-seat working-community product',
      ],
      housingTypes:
        'Older SFH, modest multi-family, mid-century stock, smaller-city residential product',
      challenges: [
        'Tighter older streets and limited staging on some blocks',
        'Different access profile than Pace growth HOAs',
        'US-90 / I-10 approaches at peak',
        'Mix of elevator and non-elevator multi-unit',
      ],
      moverTips:
        'Survey curb and driveway access on older lots. Do not assume Pace HOA playbooks apply. Prefer weekday mornings; share parking constraints on denser blocks.',
      cityKeywords: [
        'milton',
        'milton fl',
        'santa rosa seat',
        'us-90 milton',
      ],
    },
    {
      id: 'navarre',
      name: 'Navarre & Coastal East Edges',
      shortName: 'Navarre',
      neighborhoods: [
        'Navarre',
        'Navarre Beach influence',
        'US-98 east coastal corridors',
        'Coastal multi-family and SFH',
        'Beach-edge and mainland Navarre stock',
      ],
      housingTypes:
        'Coastal SFH, multi-family near water, elevated product, tourism-adjacent and family coastal housing',
      challenges: [
        'US-98 coastal peak timing and limited staging',
        'Elevator/COI windows in multi-unit coastal stock',
        'Sand protection and storm exposure',
        'Longer empty miles from Milton or Pensacola staging',
      ],
      moverTips:
        'Reserve elevators early for multi-unit. Budget sand protection. Treat Navarre ↔ Pace or Milton as long-local with coastal timing. Confirm flood and building rules before dispatch.',
      cityKeywords: [
        'navarre',
        'navarre beach',
        'navarre fl',
        'us-98 navarre',
      ],
    },
    {
      id: 'pace-growth',
      name: 'Pace Growth Corridors',
      shortName: 'Pace growth',
      neighborhoods: [
        'Pace',
        'FL-281 / Avalon corridor growth',
        'Family HOA SFH tracts',
        'Newer multi-family growth',
        'I-10 Pace approach edges',
      ],
      housingTypes:
        'Suburban SFH, planned HOA villages, new-construction tracts, multi-family growth',
      challenges: [
        'HOA COI and approved hours in many tracts',
        'Cul-de-sac and truck-length constraints',
        'FL-281 / I-10 peak congestion',
        'Family-volume inventory on summer weekends',
      ],
      moverTips:
        'Send HOA packets with the estimate. Mid-week early starts beat heat and school traffic. Inventory family-volume SFH carefully. Clarify Pace ↔ Gulf Breeze or Milton drive assumptions.',
      cityKeywords: [
        'pace',
        'pace fl',
        'fl-281',
        'avalon',
        'pace growth',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Santa Rosa County',
    intro:
      'Same square footage prices differently by bridge/coastal access, Pace HOA soft costs, and whether the job stays mid-county or runs Gulf Breeze/Navarre long-local.',
    drivers: [
      {
        title: 'Bridge & coastal access premiums',
        detail:
          'Gulf Breeze and Navarre approaches add billable time, elevator soft costs, and sand-protection labor versus pure inland Milton driveway jobs.',
      },
      {
        title: 'Pace growth HOA soft costs',
        detail:
          'COI, approved hours, and gate coordination in planned tracts add paperwork and can force weekday-only windows.',
      },
      {
        title: 'I-10 / US-90 / FL-87 / FL-281 portal time',
        detail:
          'Gulf Breeze ↔ Pace or Milton ↔ Navarre pairs burn more portal-to-portal time than map miles suggest at peak — freer than Pensacola core, still billable.',
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
        note: 'Higher with elevators, bridge windows, or HOA soft costs',
      },
      {
        label: '2–3BR house / planned community',
        value: '$1,200–$3,500+',
        note: 'Pace HOA soft costs and cross-zone hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / coastal or Pace long-local)',
        value: '$2,000–$5,800+',
        note: 'Bridge access, coastal elevators, and multi-HOA jobs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, coastal & growth calendar intelligence',
    intro:
      'Santa Rosa peaks follow family growth closings, coastal tourism spillover, Gulf summer heat, and hurricane season — not Pensacola Navy PCS density alone.',
    items: [
      {
        title: 'Summer heat & family peak: roughly June – August',
        detail:
          'Plan early-morning loads and heat-safe packing. Pace growth Saturdays fill first — book 2–4 weeks ahead.',
      },
      {
        title: 'Coastal tourism-adjacent demand',
        detail:
          'Gulf Breeze and Navarre multi-family see higher seasonal turnover. Book elevators early; avoid peak beach-weekend bridge loads when flexible.',
      },
      {
        title: 'Hurricane season (June–November)',
        detail:
          'Build flexible date language for coastal and low-lying addresses. Confirm storage and reschedule policies before deposit.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start',
        detail:
          'Still plan around HOA weekday windows when applicable. Early starts beat heat and bridge peaks.',
      },
    ],
  },
  specialized: [
    {
      id: 'pensacola-east-collar',
      title: 'Pensacola east collar & Pace growth logistics',
      intro:
        'Santa Rosa’s signature volume product is east-of-Pensacola suburban growth and Milton mid-county stock — not Escambia west Navy multi-family alone.',
      bullets: [
        'Send HOA management packets, COI requirements, and gate lists with the estimate for Pace growth.',
        'Name both pockets on every estimate (e.g. Pace → Gulf Breeze); “Santa Rosa local” hides portal time.',
        'Price empty miles honestly when crews stage from Pensacola or west Escambia.',
        'Do not import Escambia core rate cards without naming both cities and access type — this is not an Escambia rename.',
      ],
    },
    {
      id: 'coastal-bridge-access',
      title: 'Coastal & bridge access logistics',
      intro:
        'Gulf Breeze approaches, Navarre coastal product, and US-98 bridge timing are a distinct product from pure inland Milton driveway jobs.',
      bullets: [
        'Confirm bridge/causeway constraints and truck limits before dispatch.',
        'Reserve elevators early; get COI naming and protection requirements in writing.',
        'Budget sand protection and limited staging plans for coastal blocks.',
        'Document weather reschedule and storage policies before deposit in hurricane season.',
      ],
    },
    {
      id: 'not-escambia-rename',
      title: 'I-10 freeflow without Escambia rename assumptions',
      intro:
        'I-10, US-90, FL-87, and FL-281 freeflow is real — but Santa Rosa is not a thinner Escambia script. Survey the actual pocket and corridor pair.',
      bullets: [
        'Price peak I-10 / FL-281 / US-98 pairs honestly — map miles understate school and bridge traffic.',
        'Clarify whether long locals toward Navarre or Pace still use a pure local rate card.',
        'Survey Milton older-grid access separately from Pace cul-de-sac HOA plans.',
        'Confirm flood maps and storm-season flexibility before deposit on waterfront parcels.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'East-of-Pensacola collar value, coastal living, and Pace growth are different bets — validate schools and healthcare by pocket, then plan for heat and bridge calendars.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Santa Rosa County School District covers most public K–12 students. Growth areas can see enrollment pressure as new tracts open. Match every listing address to the correct boundary.',
        bullets: [
          {
            title: 'Zone before marketing name',
            detail:
              'Gulf Breeze, Milton, Navarre, and Pace brands span multiple feeders. Verify with official boundary tools — not community marketing alone.',
          },
          {
            title: 'Growth-area capacity',
            detail:
              'Pace growth corridors may see school capacity and busing changes as development continues. Ask current questions when touring.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites and Florida DOE data should lead; third-party rankings are secondary. Tour campuses when possible.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'In-county and regional acute-care anchors',
            detail:
              'Santa Rosa Medical Center and Pensacola-area systems (Ascension Sacred Heart, Baptist Health Care) serve Santa Rosa residents. Map ER drive times at rush hour from Pace, Navarre, and Gulf Breeze.',
          },
          {
            title: 'Pensacola specialty spillover',
            detail:
              'Some specialties still pull residents west into Escambia campuses. Confirm insurer networks and realistic bridge/I-10 times.',
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
    title: 'Useful Santa Rosa County resources',
    intro:
      'Local official links first; directory listings are independent. Verify FDACS for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Santa Rosa County — official site',
        href: 'https://www.santarosa.fl.gov/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Milton',
        href: 'https://www.miltonfl.org/',
        external: true,
      },
      {
        label: 'City of Gulf Breeze',
        href: 'https://cityofgulfbreeze.us/',
        external: true,
      },
      {
        label: 'Santa Rosa County School District',
        href: 'https://www.santarosaschools.org/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (Gulf Breeze/beach approaches, Milton, Navarre, Pace growth) when available. Confirm HOA packets for Pace, bridge access notes, and honest I-10 drive assumptions — this is Pensacola’s east collar, not an Escambia rename.',
  lastReviewed: '2026-07-24',
});
