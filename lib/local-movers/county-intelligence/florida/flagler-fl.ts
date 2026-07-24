import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeFlTier2Pack,
  FL_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/florida/fl-tier2-shared';

/**
 * Flagler County — Florida Tier 2 (Palm Coast — NE FL coastal growth between Daytona and Jax).
 * Parent contrast: Volusia / Duval Tier 1–2 density defaults —
 * planned coastal growth + I-95 freeflow, NOT a Daytona tourism or Jacksonville rename.
 */
export const flaglerCountyIntelligence: CountyIntelligencePack = finalizeFlTier2Pack({
  countySlug: 'flagler',
  hubTitle: 'Flagler County Moving Intelligence Hub',
  eyebrow: 'Flagler County · NE Florida coastal secondary · Palm Coast',
  h1: 'Moving in Flagler County: NE Florida Coastal Growth — Palm Coast, Flagler Beach & I-95 Logistics',
  heroOpener:
    'Flagler County is a NE Florida coastal secondary market centered on Palm Coast planned growth — between Daytona tourism density and Jacksonville river sprawl, not a rename of either. Palm Coast core grid and master-planned villages, Flagler Beach oceanfront edges, Bunnell and west inland stock, and coastal A1A product form their own housing ladder under I-95 freeflow with real peak windows. Compared with Volusia / Duval Tier 1–2 density defaults, you get freer mid-day freeflow than Daytona event weeks or Jax multi-bridge pairs, denser planned-community HOA paperwork than pure rural counties, and a tourism/residential mix without Speedway-scale event crush. This guide is for people moving in Flagler as a coastal growth secondary market — not recycled Volusia or Duval scripts.',
  heroCredibility:
    'NE Florida coastal secondary · Palm Coast growth · I-95 freeflow · FDACS Ch. 507 (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-95 · US-1 · FL-100 · A1A · local Palm Coast grid',
  parentCompare: {
    parentLabel: 'NE Florida coastal secondary (vs Volusia / Duval)',
    parentHref: '/local-movers/florida/volusia',
    title: 'Compared with Volusia / Duval Tier 1–2 density defaults',
    intro:
      'Flagler is Palm Coast planned coastal growth between Daytona and Jacksonville — not a drop-in template for Daytona event towers, Deltona inland sprawl, or Duval multi-bridge density. Use Volusia as the nearer coastal secondary parent contrast and Duval as high-density North Florida Tier 1 reference only.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Volusia crews fight I-4 / I-95 event weeks and coastal–inland long locals; Duval crews fight multi-bridge river sprawl. Flagler pairs ride I-95, US-1, FL-100, A1A, and the Palm Coast local grid with freer mid-day freeflow — Palm Coast core ↔ Flagler Beach or Bunnell ↔ coastal still burn portal-to-portal time at school and commute peaks. It is not a short Daytona dock job or a Jax collar hop.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Volusia mixes Daytona oceanfront towers, Port Orange HOAs, and Deltona inland SFH. Flagler’s ladder is Palm Coast planned-grid SFH and multi-family, Flagler Beach coastal product, Bunnell/west smaller-city and rural-edge stock, and A1A coastal edges — more master-planned driveway HOA work, less event-week tower density than Daytona.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Palm Coast planned villages default to HOA packets, cul-de-sac constraints, and grid-timing; coastal edges add elevators and A1A staging. Density is lower than Duval core and freer than Daytona event strip — still not open-rural freeflow on move day.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Flagler quotes often sit at secondary-coastal rates for simple planned-community driveway access — HOA soft costs, I-95 peak time, coastal elevators, and west empty miles still push prices up. Expect planned-growth friction, not Daytona event scarcity or Jax core pricing.',
      },
      {
        title: 'Role difference',
        detail:
          'Flagler is a NE Florida coastal growth secondary with its own employment and retirement/residential mix — not a Volusia beach-event rename and not a Duval bedroom collar. Treat it as its own market when matching crews and rate cards.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Flagler County different',
    intro:
      'NE Florida coastal growth realities — Palm Coast planned grid, I-95 freeflow, Flagler Beach edges, and tourism/residential mix — that change estimates.',
    bullets: [
      {
        title: 'Palm Coast planned growth is the operating system',
        detail:
          'Master-planned villages, HOA packets, cul-de-sac truck limits, and local grid timing define most volume jobs. Share gate lists and approved hours early.',
      },
      {
        title: 'Palm Coast core vs Flagler Beach vs Bunnell vs coastal edges differ',
        detail:
          'Planned SFH, oceanfront product, west inland stock, and A1A edges do not share truck access or clock time. Name both pockets on the estimate.',
      },
      {
        title: 'I-95 freeflow is not Daytona event gridlock or Jax bridges — still a line item',
        detail:
          'Cross-county pairs freer than Volusia event weeks still burn billable time at school and commute peaks. Ask whether quotes are portal-to-portal.',
      },
      {
        title: 'Tourism/residential mix without Speedway-scale crush',
        detail:
          'Flagler Beach and coastal edges see seasonal visitor demand, but calendars are quieter than Daytona major-event weeks. Still book elevators early on beach multi-unit.',
      },
      FL_TIER2_REG_BULLET,
    ],
  },
  zonesHeading:
    'Flagler zones: Palm Coast core, Flagler Beach, Bunnell/west & coastal edges',
  zonesIntro:
    'Four sharp products — not a six-zone dump. Palm Coast core, Flagler Beach, Bunnell/west, and coastal edges price and stage differently under the same NE Florida coastal market.',
  zones: [
    {
      id: 'palm-coast-core',
      name: 'Palm Coast Core & Planned Grid',
      shortName: 'Palm Coast core',
      neighborhoods: [
        'Palm Coast core villages',
        'Master-planned SFH tracts',
        'Local grid arterials',
        'Multi-family growth pockets',
        'I-95 / FL-100 approach neighborhoods',
      ],
      housingTypes:
        'Planned HOA SFH, townhomes, multi-family growth, master-planned village product',
      challenges: [
        'HOA COI, approved hours, and gate lists as default',
        'Cul-de-sac and truck-length constraints',
        'I-95 / local grid peak congestion',
        'Family and retiree-volume inventory on popular weekends',
      ],
      moverTips:
        'Send HOA packets with the estimate. Mid-week early starts beat heat and school traffic. Inventory carefully in large village layouts. Clarify core ↔ beach drive assumptions.',
      cityKeywords: [
        'palm coast',
        'palm coast fl',
        'palm coast core',
        'flagler growth',
      ],
    },
    {
      id: 'flagler-beach',
      name: 'Flagler Beach & Oceanfront Stock',
      shortName: 'Flagler Beach',
      neighborhoods: [
        'Flagler Beach',
        'Oceanfront multi-family',
        'A1A beach corridors',
        'Mainland Flagler Beach residential',
        'Coastal condo and elevated stock',
      ],
      housingTypes:
        'Beach condos, elevated coastal SFH, multi-family near water, tourism-adjacent product',
      challenges: [
        'Elevator/COI windows and limited beach staging',
        'A1A timing and tourist parking scarcity',
        'Sand protection and storm exposure',
        'Seasonal visitor turnover',
      ],
      moverTips:
        'Reserve elevators early. Budget sand protection. Prefer non-peak weekday loads on A1A when flexible. Confirm building rules before dispatch.',
      cityKeywords: [
        'flagler beach',
        'flagler beach fl',
        'a1a flagler',
        'oceanfront flagler',
      ],
    },
    {
      id: 'bunnell-west',
      name: 'Bunnell & West Inland Edges',
      shortName: 'Bunnell / west',
      neighborhoods: [
        'Bunnell',
        'West Flagler corridors',
        'US-1 / FL-100 west approaches',
        'Smaller-city and rural-edge stock',
        'Inland working-community product',
      ],
      housingTypes:
        'Smaller-city SFH, modest multi-family, rural-edge lots, working-community stock',
      challenges: [
        'Longer empty miles from Palm Coast coastal staging',
        'US-1 / FL-100 peak timing',
        'Varied access vs pure planned-village HOAs',
        'Thinner same-day crew density than Palm Coast core',
      ],
      moverTips:
        'Treat Bunnell/west pairs as long-local jobs. Share driveway and road-width photos. Prefer mid-week starts. Ask whether pure local rate cards still apply.',
      cityKeywords: [
        'bunnell',
        'bunnell fl',
        'west flagler',
        'us-1 flagler',
      ],
    },
    {
      id: 'coastal-edges',
      name: 'Coastal Edges & A1A Approaches',
      shortName: 'Coastal edges',
      neighborhoods: [
        'A1A approach corridors',
        'Intracoastal-adjacent multi-family',
        'Barrier-edge and coastal SFH pockets',
        'North/south coastal Flagler edges',
        'Elevated waterfront stock',
      ],
      housingTypes:
        'Coastal condos, elevated SFH, multi-family near water, snowbird-oriented product',
      challenges: [
        'Elevator/COI windows and limited staging',
        'A1A / bridge approach timing',
        'Sand protection and storm exposure',
        'Seasonal tourist and snowbird parking scarcity',
      ],
      moverTips:
        'Reserve elevators early. Budget sand protection. Prefer non-peak loads on A1A when flexible. Confirm flood and building rules before dispatch.',
      cityKeywords: [
        'a1a flagler',
        'coastal flagler',
        'intracoastal flagler',
        'flagler coastal',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Flagler County',
    intro:
      'Same square footage prices differently by Palm Coast HOA soft costs, coastal elevators, and whether the job stays planned-grid or runs beach/west long-local.',
    drivers: [
      {
        title: 'Palm Coast HOA soft costs',
        detail:
          'COI, approved hours, and gate coordination in planned villages add paperwork and can force weekday-only windows.',
      },
      {
        title: 'I-95 / US-1 / A1A corridor portal time',
        detail:
          'Palm Coast ↔ Flagler Beach or Bunnell ↔ coastal pairs burn more portal-to-portal time than map miles suggest at peak — freer than Volusia event weeks, still billable.',
      },
      {
        title: 'Coastal-edge access',
        detail:
          'Elevators, sand protection, and limited A1A staging add labor versus pure planned-community driveway jobs.',
      },
      {
        title: 'Heat & storm-season flexibility',
        detail:
          'Summer heat and hurricane windows compress outdoor hours and can require multi-day or contingent pricing structures.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$400–$1,150+',
        note: 'Higher with elevators, HOA soft costs, or peak corridor windows',
      },
      {
        label: '2–3BR house / planned community',
        value: '$1,200–$3,500+',
        note: 'Palm Coast HOA soft costs and I-95 hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / coastal or west edge)',
        value: '$2,000–$5,800+',
        note: 'Coastal elevators, long-local, and multi-HOA jobs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, coastal & growth calendar intelligence',
    intro:
      'Flagler peaks follow planned-community closings, milder coastal tourism than Daytona event weeks, summer heat, and hurricane season.',
    items: [
      {
        title: 'Summer heat & family/retiree peak: roughly June – August',
        detail:
          'Plan early-morning loads and heat-safe packing. Palm Coast Saturdays fill first — book 2–4 weeks ahead.',
      },
      {
        title: 'Coastal tourism-adjacent demand',
        detail:
          'Flagler Beach and A1A multi-family see higher seasonal visitor turnover — quieter than Daytona major-event weeks, but not zero. Book elevators early.',
      },
      {
        title: 'Hurricane season (June–November)',
        detail:
          'Build flexible date language for coastal and low-lying addresses. Confirm storage and reschedule policies before deposit.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start',
        detail:
          'Still plan around HOA weekday windows when applicable. Early starts beat heat and I-95 peaks.',
      },
    ],
  },
  specialized: [
    {
      id: 'planned-coastal-growth',
      title: 'Planned coastal growth & Palm Coast HOA logistics',
      intro:
        'Flagler’s signature volume product is Palm Coast master-planned grid access — not Daytona event towers or Duval river-core elevators.',
      bullets: [
        'Send HOA management packets, COI requirements, and gate lists with the estimate.',
        'Confirm approved move hours and truck-length limits before booking Saturday crews.',
        'Inventory carefully in large village layouts; share cul-de-sac and driveway constraints.',
        'Name both pockets on every estimate (e.g. Palm Coast core → Flagler Beach).',
      ],
    },
    {
      id: 'i95-freeflow-flagler',
      title: 'I-95 freeflow & NE Florida corridor timing',
      intro:
        'I-95, US-1, FL-100, A1A, and the Palm Coast local grid turn “local” Flagler pairs into corridor-timed jobs.',
      bullets: [
        'Price portal-to-portal time honestly for Palm Coast ↔ Flagler Beach and Bunnell ↔ coastal pairs.',
        'Build buffer for school and commute peaks on I-95 and US-1.',
        'Note local grid timing inside Palm Coast planned villages.',
        'Ask whether cross-zone pairs still use a pure local rate card or a long-local schedule.',
      ],
    },
    {
      id: 'tourism-residential-mix',
      title: 'Tourism/residential mix without Volusia or Duval rename assumptions',
      intro:
        'Coastal edges and A1A product are real — but Flagler is not a thinner Daytona or Jacksonville script. Survey the actual building and approach.',
      bullets: [
        'Reserve elevators and get COI naming in writing for coastal multi-unit.',
        'Budget sand protection and limited staging plans for A1A-edge blocks.',
        'Do not import Daytona event-week or Duval rate cards without naming both cities and access type.',
        'Confirm flood maps and storm-season flexibility before deposit on waterfront parcels.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'NE Florida coastal growth value, Palm Coast planned living, and beach edges are different bets — validate schools and healthcare by pocket, then plan for heat and HOA calendars.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Flagler Schools covers most public K–12 students. Growth areas can see enrollment pressure as new tracts open. Match every listing address to the correct boundary.',
        bullets: [
          {
            title: 'Zone before marketing name',
            detail:
              'Palm Coast village brands and Flagler Beach addresses span multiple feeders. Verify with official boundary tools — not community marketing alone.',
          },
          {
            title: 'Growth-area capacity',
            detail:
              'Palm Coast corridors may see school capacity and busing changes as development continues. Ask current questions when touring.',
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
            title: 'In-county acute-care anchors',
            detail:
              'AdventHealth Palm Coast and other Flagler facilities serve the county. Map ER drive times at rush hour from west Bunnell, Palm Coast villages, and Flagler Beach.',
          },
          {
            title: 'Volusia / Jacksonville specialty spillover',
            detail:
              'Some specialties still pull residents toward Daytona or Jacksonville systems. Confirm insurer networks and realistic I-95 times.',
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
    title: 'Useful Flagler County resources',
    intro:
      'Local official links first; directory listings are independent. Verify FDACS for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Flagler County — official site',
        href: 'https://www.flaglercounty.gov/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Palm Coast',
        href: 'https://www.palmcoastgov.com/',
        external: true,
      },
      {
        label: 'City of Flagler Beach',
        href: 'https://www.cityofflaglerbeach.com/',
        external: true,
      },
      {
        label: 'Flagler Schools',
        href: 'https://www.flaglerschools.com/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (Palm Coast core, Flagler Beach, Bunnell/west, Coastal edges) when available. Confirm HOA packets for planned villages, I-95 drive assumptions, and coastal access notes — this is NE Florida coastal growth between Daytona and Jax, not a Volusia or Duval rename.',
  lastReviewed: '2026-07-24',
});
